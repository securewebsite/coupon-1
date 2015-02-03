function getDetailData(loc){
	var id = getUrlParam('id');
	$.ajax({
		type:'get',
		url:'http://dface.cn/wapp/coupon_downs/show?id='+ id + '&Access-Control-Allow-Origin=1',
		//url:'assets/detail.json',
		data: {loc: loc},
		success: function(data){
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
		error: function(){alert('错误');}
	});
}
var getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
};