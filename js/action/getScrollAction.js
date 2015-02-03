function getScrollTop() { 
	var scrollTop = 0; 
	if (document.documentElement && document.documentElement.scrollTop) { 
		scrollTop = document.documentElement.scrollTop; 
	}else if (document.body) { 
		scrollTop = document.body.scrollTop; 
	} 
	return scrollTop; 
} 
//获取当前可是范围的高度 
function getClientHeight() { 
	var clientHeight = 0; 
	if (document.body.clientHeight && document.documentElement.clientHeight) { 
		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
	} else { 
		clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
	} 
	return clientHeight; 
} 
//获取文档完整的高度 
function getScrollHeight() { 
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
} 

function onscroll(){
	$(window).scroll(function () { 
		$(".all_zt,.all_lx").hide();
		if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
			if(!last_page){
				getCouponData('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1', params);
			}else{
				$('.loadMore').html('没有更多优惠券');
			} 
		} 
		if($(window).scrollTop()>100){
			console.log('隐藏')
			$(".top").slideUp('fast')
		}else if(100>$(window).scrollTop()>0){
			console.log('显示');
			$(".top").slideDown('fast')
		}
	});	
}