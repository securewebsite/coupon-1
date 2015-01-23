var dface = {
    sid: null,
    uid: null,
    session: null,
    _cors: function (_sessionId, callbackResult) {
        var url = 'http://dface.cn/wapi/user/cors?session_id=' + _sessionId + '&Access-Control-Allow-Origin=1';
        $.ajax({
            url: url,
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
                callbackResult(dface.startupResult.ok);
            },
            error: function (a, b, c) {
                callbackResult(dface.startupResult.session_expired);
            }
        });
    },
    startupResult: {
        ok: 0,
        no_uid: 1,
        no_sid: 2,
        no_session: 3,
        session_expired: 4
    },
    showMode: {
        fullscreen: 0,
        normal: 1,
        header: 2,
        bottom: 3
    },
    startup: function (showMode, callbackResult) {
        this.uid = dface.getQueryString('uid');
        this.sid = dface.getQueryString('sid');
        this.session = dface.getQueryString('session');

        if (this.uid != null && this.sid != null && this.session != null) {
            dface._cors(this.session, callbackResult);
            return;
        }

        if (dface.getQueryString('from') == 'dface') {
            $('body').append('<iframe src="dface://init?mode=' + showMode + '" style="display:none" />');
            DfaceJSBridge.callHandler('get_sessionID', null, function (response) {
                dface.sid = response;
                if (dface.sid == null) {
                    callbackResult(dface.startupResult.no_sid);
                } else {
                    DfaceJSBridge.callHandler('get_uid_sid', null, function (response) {
                        dface.uid = response.split(',')[0];
                        dface.sid = response.split(',')[1];

                        if (dface.uid == '') {
                            callbackResult(dface.startupResult.no_uid);
                            return;
                        }

                        dface._cors(session, callbackResult);
                    }, false);
                }
            }, false);
        } else if (dface.getQueryString('from') == 'weixin') {
            // 1. 调用微信第三方授权
            // 2. 跳转回当前页
        } else {
            if (this.uid == null) {
                callbackResult(dface.startupResult.no_uid);
            } else if (this.sid == null) {
                callbackResult(dface.startupResult.no_sid);
            } else if (this.session == null) {
                callbackResult(dface.startupResult.no_session);
            } else {
                dface._cors(this.session, callbackResult);
            }
        }
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getFriends: function (callbackFriends) {
        $.ajax({
            type: 'get',
            url: 'http://www.dface.cn/follow_info/good_friends?id=' + dface.uid + '&Access-Control-Allow-Origin=1',
            success: function (data) {
                callbackFriends(true, data);
            },
            error: function () {
                callbackFriends(false, null);
            }
        });
    },
    /**
     * Function : dump()
     * Arguments: The data - array,hash(associative array),object
     *    The level - OPTIONAL
     * Returns  : The textual representation of the array.
     * This function was inspired by the print_r function of PHP.
     * This will accept some data as the argument and return a
     * text that will be a more readable version of the
     * array/hash/object that is given.
     * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
     */
    dump:function(arr,level) {
        var dumped_text = "";
        if(!level) level = 0;

        //The padding given at the beginning of the line.
        var level_padding = "";
        for(var j=0;j<level+1;j++) level_padding += "    ";

        if(typeof(arr) == 'object') { //Array/Hashes/Objects
            for(var item in arr) {
                var value = arr[item];

                if(typeof(value) == 'object') { //If it is an array,
                    dumped_text += level_padding + "'" + item + "' ...\n";
                    dumped_text += dump(value,level+1);
                } else {
                    dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
                }
            }
        } else { //Stings/Chars/Numbers etc.
            dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
        }
        return dumped_text;
    }
};