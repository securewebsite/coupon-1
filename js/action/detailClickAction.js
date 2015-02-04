function Close(){//关闭
	$('#BG').hide();
	$('.box2').hide();
}
function Check(){ //兑换码验证提交按钮

	var val=$('#Inputs').val();
	if(password || val!=password){
		$('#Box2').show();
		$('#Box3').hide();
		$('#Word').empty().append('确认码输入错误，请重新输入');
		return false;
	}
	$.ajax({
		async : false,
		url: 'http://dface.cn/wapp/coupon_downs/use?Access-Control-Allow-Origin=1',
		//url: "assets/use.json",
		data: {id: getUrlParam('id')},
		type:'get',
		xhrFields: {
            withCredentials: true
        },
		success: function(data){
			if(data.succ){
				
				$('#BG').hide();
				$('#Btn2').hide();
				$('.word').hide();
				$('.bg2').show();
				$('.picbox').append('<span class="used">已使用</span>');
			}else{
				if(data.error==1){
					$('#Box2').show();
					$('#Box3').hide();
					$('#Word').empty().append('已使用/已失效');
				}else{
					$('#Box2').show();
					$('#Box3').hide();
					$('#Word').empty().append('使用失败');
				}
			}
		},
		error: function(data){
			$('#Box2').show();
			$('#Box3').hide();
			$('#Word').empty().append('网络连接错误，请重试');
		}
	})
}

function Open(){//使用按钮
  document.getElementById("BG").style.display="block";
  var documentHeight=document.body.scrollHeight;
  var windowHeight=document.documentElement.clientHeight;
  if(documentHeight>windowHeight){
    document.getElementById("BG").style.height=documentHeight+"px";
  }else{
    document.getElementById("BG").style.height=windowHeight+"px";
  }

  document.getElementById("Box3").style.display="block";
}
function Black(){//返回按钮
  document.getElementById("Box2").style.display="none";
  document.getElementById("Box3").style.display="block";
  document.getElementById("Inputs").value="";
}