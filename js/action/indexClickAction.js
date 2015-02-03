var indexAction = {
	tab: function(){
		var $topNav_li =$(".topNav li");
		//选项卡
		 $(".navli").click(function(e){
				$(this).siblings().toggle();
				$(this).closest("li").siblings().contents("div").hide();
				e.stopPropagation();
			});
		$(".secNav li a").click(function(){
			$(".all_zt,.all_lx").hide();
			params.page = 1;
			$(".useMoney,.freeReceive,.nocoupon").empty(); 
			$('.nowifi').hide();
			
			for(i=0;i<$(".secNav li").length;i++){
				$(this).closest("div").siblings().html($(this).html());	
			}
		});
		//点击除topNav_li外其余部分隐藏
		$(document).click(function(){$(".all_zt,.all_lx").hide();});
		//去除展开列表中最后一个的下边框
		$(".all_zt ul li:last,.all_lx ul li:last").css("border","none");
	}
}
//未使用
$("#unUsed").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"1"});
	//getCouponData('assets/coupon1.json',{status:"1"});
	statusValue = 1;
});

//已使用
$("#aUsed").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"2"});
	//getCouponData('assets/coupon2.json',{status:"1"});
	statusValue = 2;
});

//失效
$("#invalid").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"3"});
	statusValue = 3;
});

//所有状态
$("#allzt").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"0"});
	statusValue = 0;
});
//所有类型
$("#alllx").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{type:"0"});
	typeValue = 0;
});

//花钱购
$("#myCoupon").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{type:"1"});
	typeValue = 1;
});

//免费领
$("#freeCoupon").click(function(){
	getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{type:"2"});
	typeValue = 2;
});