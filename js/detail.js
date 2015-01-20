var renderCoupon = function(item){
	var couponDetail='';
		couponDetail +='<div class="picbox" id="PicBox"> '
		couponDetail +='<h3>'+item.name+'<a class="fa fa-chevron-left" href="javascript:;"></a></h3>'
	if(item.status== "2"){
		couponDetail += '<span class="used">已使用</span>';
		couponDetail +='<img src="'+ grayscale(item.img) +'" id="Pic"/>'
		couponDetail +='<div class="bg2" id="BG2"></div>'
	}else if(item.status== "3"){
		couponDetail += '<span class="lose">已失效</span>'
		couponDetail +='<img src="'+ grayscale(item.img) +'" id="Pic"/>'
		couponDetail +='<div class="bg2" id="BG2"></div>'
	}else if(item.status== "1"){
		couponDetail += ''
		couponDetail +='<img src="'+ item.img +'" id="Pic"/>'
	}
		couponDetail +='<div class="pictitle">'
		couponDetail +='<div class="picdiv">使用期限：'
		couponDetail +='<span>'+item.expire+'</span>'
		couponDetail +='</div>'
		couponDetail +='<div class="picdiv2">编号：'
		couponDetail +='<span>'+item.number	+'</span>'		
		couponDetail +='</div>'
		couponDetail +='<span class="clear"></span> </div>'
		couponDetail +='</div>'
		couponDetail +='<div class="coninner">'
		couponDetail +='<div class="boxTop">'
	if(item.status== "2"){
		couponDetail +=''
	}else if(item.status== "3"){
		couponDetail +=''
	}else if(item.status== "1"){
		couponDetail +='<a class="btn" onclick="Open()" id="Btn2"><img src="images/sign6.png" align="bottom" />使用</a>'
		couponDetail +='<span class="word">温馨提示：不要自己点击使用按钮，入店后请服务人员操作哦</span>'
	}
		couponDetail +='<h2 class="title"><img src="images/sign7.png" class="imgs">券详情</h2>'
		couponDetail +='<div class="box">'
		couponDetail +=item.detail
		couponDetail +='</div>'
		couponDetail +='<h2 class="title"><img src="images/sign8.png" class="imgs2">商家信息</h2>'
		couponDetail +='</div>'
		couponDetail +='<div class="box mb5">'
		couponDetail +='<div class="box2title">'
		couponDetail +='<h2>'
		couponDetail +=item.shops[0].name
		couponDetail +='</h2>'
		couponDetail +='<span>'
		couponDetail +=item.shops[0].distance+'m`'
		couponDetail +='</span> </div>'
	if(item.shops[0].address==""){
		couponDetail +=''
	}else{
		couponDetail +='<p style="border-bottom:#ccc 1px solid;"><i class="fa fa-map-marker"></i>地址：'+item.shops[0].address+'</p>'
	}
	if(item.shops[0].tel==""){
		couponDetail +=''
	}else{
		couponDetail +='<p><i class="fa fa-phone"></i>电话：<a href="tel:'+item.shops[0].tel+'">'+item.shops[0].tel+'</a></p>'
	}
		//couponDetail +='<span class="clear"></span> '
		//couponDetail +='<a href="javascript:;" class="link more">More&gt;&gt;</a>'
		couponDetail +='<span class="clear"></span> </div>'
		//couponDetail +='<a class="back" href="javascript:;"><<返回</a>'
		couponDetail +='</div>'
	$(".con").append(couponDetail);	
	
	var code='';
		code += '<table class="tab" cellspacing="0" cellpadding="0">'
	if(item.password==""){
		code += '<tr>'
		code += '<td align="center" valign="middle"><a onclick="Close()"><img src="images/sign10.png" class="imgs2"/></a>'+item.name+'<span>该券使用后不能再次使用哦</span>'
		code += '<input type="text" id="Inputs" class="inputs" placeholder="输入兑换码" style="display:none"/></td>'
		
	}else{
		password = item.password;
		code += '<tr>'
		code += '<td align="center" valign="middle"><a onclick="Close()"><img src="images/sign10.png" class="imgs2"/></a>'+item.name+'<span class="textleft">该券使用后不能再次使用哦</span>'
		code += '<input type="text" id="Inputs" class="inputs" placeholder="输入兑换码" /></td>'
	}
		code += '</tr>'
		code += '</table>'
		code += '<button type="button" class="btn2" onclick="Check()">使用</button>'
	$("#Box3").append(code);	
}
function detail(loc){
	var id = getUrlParam('id');
	$.ajax({
		async : false,
		type:'get',
		url:'http://dface.cn/wapp/coupon_downs/show?id='+ id + '&Access-Control-Allow-Origin=1',
		//url:'assets/detail.json',
		data: {loc: loc},
		success: function(data){
			renderCoupon(data)
		},
		error: function(){alert('错误');}
	});
}

var getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
}
//图片处理
function grayscale(src){
  try{
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = src;
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;
    ctx.drawImage(imgObj, 0, 0);
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(var y = 0; y < imgPixels.height; y++){
      for(var x = 0; x < imgPixels.width; x++){
        var i = (y * 4) * imgPixels.width + x * 4;
        var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
      }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
  }catch(e){
    $("#BG2").show();
    return src;
  }
}

function shops(){
	$(".box.mb5").hide();
	$(".box.mb5:first").show();
	$(".back").hide();
	$(".box.mb5:first .more").click(function(){
		$("#PicBox").hide();
		$(".boxTop").hide();
		$(".box.mb5").show();
		$(".box.mb5:first").hide();
		$(".more").hide();
		$(".back").show();
	})
	
	$(".back").click(function(){
		 location.reload();	
	})
	
	$('.picbox h3 a').click(function(evt){
		//evt.preventDefault(); // 阻止默认的跳转操作
		window.history.go(-1);
	})
}