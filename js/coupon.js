
function getcoupon(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"1"});
	//status('assets/coupon5.json',{status:"0"});
	statusValue = 0;
}

function status(couponUrl,couponData){
	$.ajax({
		async : false,
		type:'get',
		url:couponUrl,
		data:couponData,
		xhrFields: {
            withCredentials: true
        },
		processData: true,
		success:function(data){
		    console.log(data);
		    
			params.status = couponData.status||0;
			params.type = couponData.type||0;
			params.page += 1;
			last_page = (data.length ==20 ? false : true);
			
			if(data.length == 0){
				$('#wrapper').hide();
				var noclip = '';
					noclip +='<img src="images/no.jpg" class="nopic" width="33%" /><img src="images/nolist.jpg" class="nolist" width="10%">'
					noclip +='<p class="notxt">这里空荡荡</p>'
				$('.nocoupon').append(noclip);
			}else{
				$('#wrapper').show();
				for(var i=0;i<data.length;i++){
					if(data[i].type == 1){
						var useMoney = '';
							useMoney += '<div class="ticketList1 couponList">'
							useMoney += '<div class="couponListCon">'
							useMoney += '<div class="couponListImg">'
							useMoney += '<a href="coupon-detail.html?id='+data[i].id+'">'
							useMoney += '<img class="lazy" data-original="'+data[i].img+'" src="images/grey.gif" style="display: inline;">'
						if(data[i].status== "2"){
							useMoney += '<div class="used status"><span>已使用</span></div>'
							useMoney += '<div class="bg2"></div>'
						}else if(data[i].status== "3"){
							useMoney += '<div class="losed status"><span>已失效</span></div>'
							useMoney += '<div class="bg2"></div>'
						}else if(data[i].status== "1"){
							useMoney += '<div class="status"></div>'
						}
							useMoney += '</a>'
							useMoney += '</div>'
							useMoney += '<div class="couponInfo">'
							useMoney += '<a href="coupon-detail.html?id='+data[i].id+'">'
							useMoney += '<h3>'+data[i].name+'</h3>'
							useMoney += '<span>使用期限<br>'+ data[i].expire +'</span>'
							useMoney += '<p>'+data[i].from+'</p>'
							useMoney += '</a>'
							useMoney += '</div>'
							useMoney += '<div class="clear"></div>'
							useMoney += '</div>'
							useMoney += '<div class="bot"></div>'
						if(data[i].news == 1){
							useMoney += '<div class="news"><img src="images/new.png"></div>'	
						}
							useMoney += '</div>';	
						$(".useMoney").append(useMoney);
					}else{
						var freeReceive = '';
							freeReceive += '<div class="ticketList2 couponList">'
							freeReceive += '<div class="couponListCon">'
							freeReceive += '<div class="couponListImg">'
							freeReceive += '<a href="coupon-detail.html?id='+data[i].id+'">'
							freeReceive += '<img class="lazy" data-original="'+data[i].img+'" src="images/grey.gif" style="display: inline;">'
						if(data[i].status== "2"){
							freeReceive += '<div class="bg2"></div>'
							freeReceive += '<div class="used status"><span>已使用</span></div>'
						}else if(data[i].status== "3"){
							freeReceive += '<div class="bg2"></div>'
							freeReceive += '<div class="losed status"><span>已失效</span></div>'
						}else if(data[i].status== "1"){
							freeReceive += '<div class="status"></div>'
						}
							freeReceive += '</a>'
							freeReceive += '</div>'
							freeReceive += '<div class="couponInfo">'
							freeReceive += '<a href="coupon-detail.html?id='+data[i].id+'">'
							freeReceive += '<h3>'+data[i].name+'</h3>'
							freeReceive += '<span>使用期限<br>'+ data[i].expire +'</span>'
							freeReceive += '<p>'+data[i].from+'</p>'
							freeReceive += '</a>'
							freeReceive += '</div>'
							freeReceive += '<div class="clear"></div>'
							freeReceive += '</div>'
							freeReceive += '<div class="bot"></div>'
						if(data[i].news == 1){
							freeReceive += '<div class="news"><img src="images/new.png"></div>'	
						}
							freeReceive += '</div>';	
						$(".freeReceive").append(freeReceive);
					}
				}
			}
		},
		error: function(a, b, c){
		    alert("get error " + c );
		   // window.location.replace("errorConnection.html");
		}
	}); 
}
//
//未使用
$("#unUsed").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"1"});
	//status('assets/coupon1.json',{status:"1"});
	pipEffects();
	statusValue = 1;
});

//已使用
$("#aUsed").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"2"});
	//status('assets/coupon2.json',{status:"1"});
	pipEffects();
	statusValue = 2;
});

//失效
$("#invalid").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"3"});
	pipEffects();
	statusValue = 3;
});

//所有状态
$("#allzt").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{status:"0"});
	pipEffects();
	statusValue = 0;
});
//所有类型
$("#alllx").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{type:"0"});
	pipEffects();
	typeValue = 0;
});

//花钱购
$("#myCoupon").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{type:"1"});
	pipEffects();
	typeValue = 1;
});

//免费领
$("#freeCoupon").click(function(){
	status('http://dface.cn/wapp/coupon_downs?Access-Control-Allow-Origin=1',{type:"2"});
	pipEffects();
	typeValue = 2;
});

//列表中产品图片效果
function pipEffects(){
	//图片变黑白
	$(".used,.losed").each(function(index) {
    	$(this).siblings("img").addClass("gray");
	});
	//图片延迟加载
	$('img.lazy').lazyload({effect:'fadeIn'});
}
//选项卡
function tab(){
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
		
		setTimeout(function(){myScroll.scrollTo(0, 0, 100); pullDownAction();},100);	
	});
	//点击除topNav_li外其余部分隐藏
	$(document).click(function(){$(".all_zt,.all_lx").hide();});
	//去除展开列表中最后一个的下边框
	$(".all_zt ul li:last,.all_lx ul li:last").css("border","none");
}
//loading中落下的效果


