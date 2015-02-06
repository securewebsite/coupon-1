var getDetailData =function (loc){
	var id = getUrlParam('id');
	$.ajax({
		type:'get',
		url:'http://dface.cn/wapp/coupon_downs/show?id='+ id + '&Access-Control-Allow-Origin=1',
		//url:'assets/detail.json',
		data: {"loc": loc},
		success: function(data){
			password = data.password;
			$('.loading').hide();
			var detailTemplate = Handlebars.compile($("#detail").html());
			var useBoxTemplate = Handlebars.compile($("#useBox").html());
			Handlebars.registerHelper("compare",function(v1,v2,options){
			  if(v1==v2){
				return options.fn(this);
			  }else{
				return options.inverse(this);  
			  }
			});
			$('.con').append(detailTemplate(data));
			$('#Box3').append(useBoxTemplate(data));
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$('.loading').hide();
			if(XMLHttpRequest.status == 400){
				window.location.replace("error/400.html?url="+encodeURIComponent(window.location.href));
				return;
			}else if(XMLHttpRequest.status == 401){
				window.location.replace("error/401.html?url="+encodeURIComponent(window.location.href));
				return;
			}else if(XMLHttpRequest.status == 500){
				window.location.replace("error/500.html?url="+encodeURIComponent(window.location.href));
				return;
			}else{
				window.location.replace("errorConnection.html?url="+encodeURIComponent(window.location.href));
				return;
			}
		}
	});
}
var getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
};