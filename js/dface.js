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
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    startupResult: {
        ok: 0,
        no_session: 1,
        session_expired: 2
    },
    initMode: {
        fullscreen: 0,
        normal: 1,
        header: 2,
        bottom: 3,
        fullscreenNew: 4
    },
    cors: function (callbackResult) {
        this.uid = dface.getQueryString('uid');
        if(this.uid == null){
            this.uid = dface.getQueryString('user_id');
        }
        this.sid = dface.getQueryString('sid');
        if(this.sid == null){
            this.sid = dface.getQueryString('shop_id');
        }

        this.session = dface.getQueryString('session');
        if (this.session != null && dface.getQueryString('from') != null) {
            dface._cors(this.session, callbackResult);
            return;
        }

        if (dface.getQueryString('from') == 'dface') {
            document.addEventListener('DfaceJSBridgeReady', function() {
                    DfaceJSBridge.callHandler('getSessionID', null, function (response) {
                        dface.session = response;

                        DfaceJSBridge.callHandler('getUidSid', null, function (response) {
                            dface.uid = response.split(',')[0];
                            dface.sid = response.split(',')[1];

                            if (dface.session == null) {
                                callbackResult(dface.startupResult.no_session);
                            } else {
                                dface._cors(dface.session, callbackResult);
                            }
                        }, false);
             
                    }, false);
            });
        } else if (dface.getQueryString('from') == 'weixin') {
            // 1. 调用微信第三方授权
            // 2. 跳转回当前页
        } else {
            if (this.session == null) {
                callbackResult(dface.startupResult.no_session);
            } else {
                dface._cors(this.session, callbackResult);
            }
        }
    },
    showMode: function(mode){
        if (dface.getQueryString('from') == 'dface') {
            $('.close').attr('href', 'dface://close');
            $('body').append('<iframe src="dface://init?mode=' + mode + '" style="display:none" />');
        }
    },
    getUserInfo: function(uid,callbackUserInfo){
        $.ajax({
            type:'get',
            url: 'http://www.dface.cn/user_info/basic?id='+uid+'&Access-Control-Allow-Origin=1',
            success: function(data){
                callbackUserInfo(true, data);
            },
            error: function(){
                callbackUserInfo(false, null);
            }
        })
    },
    getFriends: function (uid,callbackFriends) {
        $.ajax({
            type: 'get',
            url: 'http://www.dface.cn/follow_info/good_friends?id='+uid+'&Access-Control-Allow-Origin=1',
            success: function (data) {
                var dataLen = data.length;
                if(dataLen != '0'){
                    callbackFriends(true, data);
                }else{
                    alert("没有获取用户ID~");
                }
            },
            error: function () {
                callbackFriends(false, null);
            }
        });
    }
};