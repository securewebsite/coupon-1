var debug = true;
var sessionId = null;
var dface = {
    _copy_session:function(sessionId, callbackResult) {
        var url = 'http://dface.cn/wapi/user/copy_session?session_id='+sessionId+'&Access-Control-Allow-Origin=1';
	   $.ajax({
 			url: url,
 			type: 'GET',
	    		success: function(data){
 			    callbackResult(0);
 			},
		    xhrFields: {
                withCredentials: true
            },
 			error: function(a, b, c){
 			    callbackResult(-1);
 			}
 		});
    },
    //0全屏,1标准,2头部,3底部
	startup:function(showMode, callbackResult){
	    if(debug){
	        sessionId = '5bbe44e237995f91d61e4816b38bc6c1';
	        dface._copy_session(sessionId, callbackResult);
	    }else{
	        document.body.appendChild('<iframe src="dface://init?mode='+showMode+'" style="display:none" />');
	        
    		var sesion = null;
    		document.addEventListener('DfaceJSBridgeReady', function() {
                DfaceJSBridge.callHandler('getSessionID', null, function(response) {
                sessionId = response;
                })
            }, false);
    
    		if(sesion == null){
    			callbackResult(-2);
    		}else{
	            dface._copy_session(sessionId, callbackResult);
    		}
	    }
	},
	
    getQueryString:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },

	getUserId:function(callbackGetUserUid){
	   var url = 'http://dface.cn/wapi/user/session?session_id='+sessionId+'&Access-Control-Allow-Origin=1';
	   $.ajax({
 			url: url,
 			type: 'GET',
 			success: function(data){
 			    callbackGetUserUid(true, data.user_id);
 			},
 			error: function(data){
 			    callbackGetUserUid(false, null);
 			}
 		})
	},
	getFriends:function(){
	    
	},
	show:function(withBar){
	    
	}
};