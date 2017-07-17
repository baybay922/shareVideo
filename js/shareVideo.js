$(function(){ 
	var eleTop = $(".video_name").outerHeight(true)+$(".act").outerHeight(true)+$(".introduction").outerHeight(true)+$(".Origin").outerHeight(true)+$(".commentBox").outerHeight(true),
		imgH = $("#paly_btn").outerHeight(true),
		t = 0;
	myScroll = new iScroll('wrapper',{
		  onBeforeScrollStart:function(e){
		  	var target=e.target;
		  	while(target.nodeType!=1){
		  		target=target.parentNode;
		  	}
		  	 var ele=e.target.tagName.toLowerCase();
		  	 if(ele!='input' && ele!='textarea' && ele!='select' && ele!='video'){
	            e.preventDefault();
		  	 }
	    },
	    checkDOMChanges:true,
	    fadeScrollbar:true,
	    vScrollbar:false,
	    onScrollMove:function(){
            var scrollTop = (-(this.y));
        },
        onScrollEnd: function(){
        	var scrollTop = (-(this.y));
        	if(scrollTop > t){
        		$("#elookin").hide();
        		$(".headelookin").show();
        	}else{
        		$(".headelookin").hide();
        		$("#elookin").animate({
        			"opacity":"1",
        			"display":"block"
        		},300);
        	}
        },
        onScrollLimit:function(){//判断滑动最底部
        	//alert("底部")
        }
	});
	new iScroll('ReviewDetails',{
		  onBeforeScrollStart:function(e){
		  	var target=e.target;
		  	while(target.nodeType!=1){
		  		target=target.parentNode;
		  	}
		  	 var ele=e.target.tagName.toLowerCase();
		  	 if(ele!='input' && ele!='textarea' && ele!='select' && ele!='video'){
	            e.preventDefault();
		  	 }
	    },
	    checkDOMChanges:true,
	    fadeScrollbar:true,
	    vScrollbar:false,
	    onScrollLimit:function(event){//判断滑动最底部
        	//alert("底部")
        }
	});

	function VideoPlayback() {
		this.init();
	}
	VideoPlayback.prototype = {// 样式调整
	    constructor: VideoPlayback,
	    init: function(){
	    	this.obtainHeight();
	    	this.autoHide();
	    },
	   	obtainHeight: function (){
	   		var videoHeight = $("#video_container"),
	   			imgHeight = videoHeight.find("img").height();
	   			videoHeight.css({
	   				"height":imgHeight+"px"
	   			});	
	   		$(".scroll").css({
	   			"padding-bottom":imgHeight+"px"
	   		})  		
	   	},
	   	autoHide: function(){
	   		setTimeout(function(){
	   			$("#elookin").animate({
	   				"opacity":0
	   			},function(){
	   				$("#elookin").css({
	   					"display":"none"
	   				})
	   			})
	   		},3000)
	   	}

	}
	$(function () {
	   return new VideoPlayback();
	});
	var flag = true,
		showBrief = true;
	var ClickEvent = {//click事件
		_init: function(){
			$("#paly_btn").on("click",ClickEvent.clickPlay);
			$("#brief_btn").on("click",ClickEvent.indication);
			$("#comment").on("click",ClickEvent.CommentRelated);
			$("#Reply").on("click",ClickEvent.allcomment);
			$("#Stop_btn").on("click",ClickEvent.playVideo);
			$("#close").on("click",ClickEvent.closecomment);//关闭评论
			$("#unlikes").on("click",ClickEvent.likeVideo);//视频点赞
			$(".comment_unlikes").on("click",ClickEvent.likeConmmnt)//评论点赞
			$("#download").on("click",ClickEvent.jumplink)//判断安卓还是ios
			$("#relevant").on("click","dl",ClickEvent.changeVideoUrl)//相关视频播放
		},
		CommentRelated:function(){
			$(this).toggleClass("Maycomment");
			if($(this).hasClass("Maycomment")){
				$(".allcomment").show();
				$(".relevant").hide();
				$("#WriteReviews").show();
				$(".header").hide();
			}else{
				$(".allcomment").hide();
				$(".relevant").show();
				$("#WriteReviews").hide();
				$(".header").show();
			}
		},
		clickPlay: function(){
			var videoFile = document.getElementById("videoFile"),
				videourl = $(this).attr("videourl");
				videoFile.src=videourl;
			$(this).css({
				"display":"none"
			});
			videoFile.play();
			videoFile.addEventListener("click",ClickEvent.Paused);
		},
		indication: function(){
			if(showBrief){
				$(".brief_btn").css({
					"-webkit-transform":"rotate(90deg)"
				},300);
				$("#Origin").css({
					"height":"auto"
				});
				showBrief = false;
			}else{
				$(".brief_btn").css({
					"-webkit-transform":"rotate(0deg)"
				});
				$("#Origin").css({
					"height":"0"
				});
				showBrief = true;
			}			
		},
		allcomment: function(){
			$("#video_container").hide();
			$("#ReviewDetails").show();
			$("#WriteReviews").show();
		},
		Paused: function(){
			$("#Stop_btn").show();
	        videoFile.pause();	 
		},
		playVideo: function(){
			$(this).hide();
			videoFile.play();
		},
		closecomment: function(){
			$("#ReviewDetails").hide();
			
			$("#video_container").show();
		},
		likeVideo: function(){
			$(this).addClass("likes")
		},
		likeConmmnt: function(){
			$(this).addClass("comment_likes")
		},
		jumplink: function (){
			if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
			    //alert(navigator.userAgent);  
			    window.location.href ="";
			} else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
			    //alert(navigator.userAgent); 
			    window.location.href ="";
			}
		},
		changeVideoUrl: function(){  //改动部分
			var videourl = $(this).attr("videourl");
			videoFile.src=videourl;
			videoFile.play();

			var videoHeight = $("#video_container"),
				imgHeight = $('#videoFile')[0].offsetHeight;
				console.log(imgHeight)
				videoHeight.css({
					"height":imgHeight+"px"
				});
				$(".scroll").css({
		   			"padding-bottom":imgHeight+"px"
		   		})  	
			$("#paly_btn").hide();			
			$(this).find("p.in_play").show().parent().parent().siblings().find("p.in_play").hide();
		}
	}
	ClickEvent._init()
})