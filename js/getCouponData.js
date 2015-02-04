function getCouponData(couponUrl,couponData){
	$.ajax({
		async : false,
		type:'get',
		url:couponUrl,
		data:couponData,
		xhrFields: {
			withCredentials: true
		},
		processData: true,
		//url:'http://www.dface.cn/photos/detail_new?id='+ id +'&Access-Control-Allow-Origin=1',
		success: function(data){
			params.status = couponData.status||0;
			params.type = couponData.type||0;
			params.page += 1;
			last_page = (data.length ==20 ? false : true);
			$('.loading').hide();
			if(data.length == 0){
				var noCouponTemplate = Handlebars.compile($("#noCoupon").html());
				$('.nocoupon').append(noCouponTemplate(data));
				$('.loadMore').hide();
			}else{
				var useMoneyTemplate = Handlebars.compile($("#useMoney").html());
				var freeReceiveTemplate = Handlebars.compile($("#freeReceive").html());
				Handlebars.registerHelper("compare",function(v1,v2,options){
				  if(v1==v2){
					return options.fn(this);
				  }else{
					return options.inverse(this);  
				  }
				});
				$('.useMoney').append(useMoneyTemplate(data));
				$('.freeReceive').append(freeReceiveTemplate(data));		
			}
			
		},
		error: function(a,b,c){
			//window.location.replace("http://static.dface.cn/errorConnection.html");
			window.location.replace("errorConnection.html?url="+encodeURIComponent(window.location.href));
		}
	});
}
