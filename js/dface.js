var debug = true;
var sessionId = null;
var dface = {
    _copy_session:function(sessionId, callbackResult) {
        var url = 'http://www.dface.cn/wapi/user/copy_session?session_id='+sessionId+'&Access-Control-Allow-Origin=1';
	   $.ajax({
 			url: url,
 			type: 'GET',
 			success: function(data){
 			    callbackResult(0);
 			},
 			error: function(a, b, c){
 			    callbackResult(-1);
 			}
 		});
    },
    //0全屏,1标准,2头部,3底部
	startup:function(showMode, callbackResult){
	    if(debug){
	        sessionId = '62c7cada7f785a49308f97e06e71b4ac';
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
	
    GetQueryString:function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },

	getUserId:function(callbackGetUserUid){
	   var url = 'http://www.dface.cn/wapi/user/session?session_id='+sessionId+'&Access-Control-Allow-Origin=1';
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