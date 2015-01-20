//$(document).ready(function(){
//	var $topNav_li =$(".topNav li");
//	//选项卡
//	 $(".navli").click(function(e){
//			$(this).siblings().show();
//			$(this).closest("li").siblings().contents("div").hide();
//			e.stopPropagation();
//			
//        });
//	$(".secNav li a").click(function(){
//		$(".all_zt,.all_lx").hide();
//		$(this).closest("div").siblings().html($(this).html());
//		clickzt();
//		//$("#scroller").addClass("scrollheight");
//		setTimeout(function(){myScroll.scrollTo(0, 0, 100); pullDownAction();},500);	
//		
//	});
//	//点击除topNav_li外其余部分隐藏
//	$(document).click(function(){$(".all_zt,.all_lx").hide();});
//	//去除展开列表中最后一个的下边框
//	$(".all_zt ul li:last,.all_lx ul li:last").css("border","none");
//	var $statusTitle = $("#zz_title span");
//	var $typeTitle = $("#lx_title span");
//	function clickzt(){	
//		if($statusTitle.html() == "未使用"){
//			$("div.con > div").hide();
//			$(".unUsed").show();
//			if($typeTitle.html() =="全部类型" ){
//				$("div.con > div").hide();
//				$(".unUsed").show();
//			}
//			if($typeTitle.html() =="花钱购" ){
//				$("div.con > div").hide();
//				$(".ticketList1.unUsed").show();
//			}
//			if($typeTitle.html() =="免费领" ){
//				$("div.con > div").hide();
//				$(".ticketList2.unUsed").show();
//			}
//			
//		}
//		if($statusTitle.html() == "全部状态"){
//			$("div.con > div").hide();
//			$("div.con > div").show();
//			if($typeTitle.html() =="全部类型" ){
//				$("div.con > div").hide();
//				$("div.con > div").show();
//			}
//			if($typeTitle.html() =="花钱购" ){
//				$("div.con > div").hide();
//				$(".ticketList1").show();
//			}
//			if($typeTitle.html() =="免费领" ){
//				$("div.con > div").hide();
//				$(".ticketList2").show();
//			}
//		}
//		if($statusTitle.html() == "已使用"){
//			$("div.con > div").hide();
//			$(".aUsed").show();
//			if($typeTitle.html() =="全部类型" ){
//				$("div.con > div").hide();
//				$(".aUsed").show();
//			}
//			if($typeTitle.html() =="花钱购" ){
//				$("div.con > div").hide();
//				$(".ticketList1.aUsed").show();
//			}
//			if($typeTitle.html() =="免费领" ){
//				$("div.con > div").hide();
//				$(".ticketList2.aUsed").show();
//			}
//		}
//		if($statusTitle.html() == "已失效"){
//			$("div.con > div").hide();
//			$(".invalid").show();
//			if($typeTitle.html() =="全部类型" ){
//				$("div.con > div").hide();
//				$(".invalid").show();
//			}
//			if($typeTitle.html() =="花钱购" ){
//				$("div.con > div").hide();
//				$(".ticketList1.invalid").show();
//			}
//			if($typeTitle.html() =="免费领" ){
//				$("div.con > div").hide();
//				$(".ticketList2.invalid").show();
//			}
//		}
//	}
//});