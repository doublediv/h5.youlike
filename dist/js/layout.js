$(function () {
	// 解决方案
	if ($('.swiper-box').length) {
		$('.swiper-box').each(function (index) {
			var swiper = "swiperBox_" + index;
			var nextEl = ".next_" + index;
			var prevEl = ".prev_" + index;
			swiper = swiperBox($(this), 3, 20, nextEl, prevEl);
			$(this).on({
				mouseenter: function () {
					swiper.stopAutoplay();
				},
				mouseleave: function () {
					swiper.startAutoplay();
				}
			});
		});
	}
	// 关于我们
	if ($('.about-banner').length) {

		$('.about-banner').find('.content-box').eq(0).show();
		$('.about-banner').find('.tab li').eq(0).addClass('cur');
		$('.about-banner').find('.tab li').off().on("click", function () {
			if (!$(this).hasClass('cur')) {
				$(this).addClass('cur').siblings().removeClass('cur');
				$('.about-banner').find('.content-box').hide().eq($(this).index()).slideDown();
			}
		});

		// 发展历程
		$('.development').find('.development-content').eq(0).show();
		$('.development-year').find('li').eq(0).addClass('cur');
		$('.development-year').find('li').on("click", function () {
			$(this).addClass('cur').siblings().removeClass('cur');
			$('.development').find('.development-content').hide().eq($(this).index()).show();
			$('.development').find('.img-box img').attr("src", $(this).data().img)
		});
		var development_swiper = new Swiper('.swiper-container', {
			freeMode: true,
			slidesPerView: 5
		});
	}
	reCall();
});
function reCall() {
	bow = $('body').addClass('oh').outerWidth(true);
	$('body').removeClass('oh');

	if (bow < 1023) {
		// 移动端
		// 导航
		$('.menu').on("click", function () {
			if ($('.search-box').is(':visible')) {
				$('.search-box').stop(false, true).slideUp(300);
			} else {
				$('.nav-mask').stop(false, true).slideToggle(300);
			}
			$('.nav').stop(false, true).slideToggle(300);
			$(this).toggleClass('cur');
			$('.nav').find('.sub-nav').slideUp();
			$('.language,.code').toggle();
		});
		$('.search').on("click", function () {
			if ($('.nav').is(':visible')) {
				$('.nav').slideUp().find('.sub-nav').stop(false, true).slideUp(300);
				$('.language,.code').hide();
				$('.menu').removeClass('cur');
			} else {
				$('.nav-mask').stop(false, true).slideToggle(300);
			}
			$(this).find('.search-box').stop(false, true).slideToggle(300);
		});
		$('.nav').find('li').each(function () {
			if ($(this).find('.sub-nav').length > 0) {
				$(this).addClass('more').on('click', function () {
					$(this).siblings().find('.sub-nav').stop(false, true).slideUp(300);
					$(this).siblings().find('h3').removeClass('cur');
					$(this).find('h3').toggleClass('cur').siblings().stop(false, true).slideToggle(300);
				});
				$(this).find('h3 a').click(function (e) {
					if (e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					}
				});
			}
		});
		// 内页导航
		$(".inner-nav").find(".item:not(:last-child)").hide();
		$(".inner-nav .item").off().on("click", ".title", function () {
			$(this).parent().find('.nav-list').stop(false, true).slideToggle();
		});
		// 产品中心
		$(".product-type .m-title").off().on("click", function () {
			$(this).parent().find('.type-list').stop(false, true).slideToggle();
		});

	} else {
		// pc端
		// 头部导航
		$('.nav li').on({
			"mouseenter": function () {
				$(this).find('.sub-nav').stop(true, true).slideDown();
			},
			"mouseleave": function () {
				$(this).find('.sub-nav').stop(true, true).hide(0);
			}
		});
		// 侧边导航
		$(".menu").off().on('click',function(){
			$('.nav-mask, .pc-nav-box, .pc-nav-box .nav-list').addClass('cur');
		});
		$('.pc-nav-box').find('.close').off().on("click", function(){
			$('.nav-mask, .pc-nav-box, .pc-nav-box .nav-list').removeClass('cur');
		});
		$('.pc-nav-box .nav-list li h3 a').on("click", function(e){
			if($(this).parents("li").find(".sub-nav").length){
				if (e.preventDefault) {
					e.preventDefault();
				} else {
					e.returnValue = false;
				}
				
				$(this).parents("li").siblings().find(".sub-nav").stop(false,true).slideUp();
				$(this).parents("li").find(".sub-nav").stop(false,true).slideToggle();
			}
		});
		// 内页导航
		$(".inner-nav").find(".item:not(:last-child)").show();
		$(".inner-nav .item").off().on({
			"mouseenter": function () {
				$(this).find('.nav-list').stop(true, true).slideDown();
			},
			"mouseleave": function () {
				$(this).find('.nav-list').stop(true, true).hide(0);
			}
		});
		// 产品中心
		$(".product-type .m-title").off();
	}


	var product_imgs_swiper = null;
	if (bow < 998) {
		// 产品详情
		if ($('.product-imgs-m').length) {
			product_imgs_swiper = new Swiper($(".product-imgs-m"), {
				slidesPerView: 2,
				spaceBetween: 0,
				nextButton: ".next_00",
				prevButton: ".prev_00",
				breakpoints: {
					768: {
						slidesPerView: 2,
						spaceBetween: 15
					},
					568: {
						slidesPerView: 1,
						spaceBetween: 15
					}
				}
			})
		}
	} else {
		// 产品详情
		$(".product-detail .img-list").off().on("mouseenter", "a", function () {
			$(".product-img-pc img").attr("src", $(this).data().src);
		})
	}
}
// 窗口重置
$(window).resize(function () {
	$('.nav li,.nav li h3 a,.menu,.search').off();
	$('.nav li').removeClass('more');
	$('.menu,.nav h3, .nav-mask, .pc-nav-box, .pc-nav-box .nav-list').removeClass('cur');
	$('.nav,.sub-nav,.search-box,.code,.language').removeAttr('style');
	$('.nav-mask').removeAttr('style');
	reCall();
});

/** swiper 实例
 *@param Sting box    				swriper容器
 *@param Sting slidesPerView    	swriper可视个数
 *@param Sting spaceBetween    		item之间的间距
 *@param Sting nextEl    			next 按钮
 *@param Sting prevEl    			prev 按钮
 */
function swiperBox(box, slidesPerView, spaceBetween, nextButton, prevButton) {
	return new Swiper(box, {
		slidesPerView,
		spaceBetween,
		nextButton,
		prevButton,
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween
			},
			768: {
				slidesPerView: 2,
				spaceBetween: spaceBetween * 0.7
			},
			568: {
				slidesPerView: 1,
				spaceBetween: spaceBetween * 0.7
			}
		}
	});
}
// $(function () {

// 	judescreen();

// 	$(window).resize(function () {
// 		judescreen();

// 	});

// 	function judescreen() {

// 		if ($(window).width() >= 1024) { //1024
// 			$('nav ul li').off('mouseenter mouseleave').hover(function () {
// 				$(this).find('.sub-nav').stop(true, true).slideDown(300);
// 			}, function () {
// 				$('.sub-nav').hide();
// 			});

// 			//搜索页
// 			$('.search-btn').off("mouseenter mouseleave").hover(function () {
// 				$(".m-search-box").stop(true, true).slideUp();
// 				$(this).find(".m-search-box").stop(true, true).slideDown(300);
// 			}, function () {
// 				$(this).find(".m-search-box").hide();
// 			});



// 			$(".language").off("mouseenter mouseleave").hover(function () {

// 				$(this).find(".language-box").slideDown(300);
// 			}, function () {
// 				$(".language-box").slideUp(300);
// 			});

// 		} else {
// 			$('nav ul li,.weixin').off('mouseenter mouseleave');
// 			$(".footer-ul li h4").off("click").on("click", function () {
// 				if ($(this).next().is(":hidden")) {
// 					$(".footer-subnav").slideUp(300);
// 					$(".footer-nav li h4").removeClass("cur");
// 					$(this).addClass("cur");
// 					$(this).next().slideDown(300);
// 				} else {
// 					$(this).removeClass("cur");
// 					$(this).next().slideUp(300);
// 				}
// 			});

// 			//搜索
// 			$(".search-icon").off("click").on("click", function () {
// 				$(".language-box,.nav").hide();
// 				if ($(".m-search-box").is(":hidden")) {
// 					$(".m-search-box").slideDown(300);
// 				} else {
// 					$(".m-search-box").slideUp(300);
// 				}
// 			});


// 			$(".language-icon").off("click").on("click", function () {
// 				$(".m-search-box").hide();
// 				if ($(".language-box").is(":hidden")) {
// 					$(".language-box").slideDown(300);
// 				} else {
// 					$(".language-box").slideUp();
// 				}

// 			})


// 		}

// 	}

// 	//移动端展开下拉
// 	$(".mobnav-btn").off("click").on("click", function () {
// 		if ($("nav").is(":hidden")) {
// 			$(this).addClass("g_close");
// 			$("nav").slideDown(300);
// 		} else {
// 			$("nav").slideUp();
// 			$(this).removeClass("g_close");
// 		}
// 	});

// 	$('nav ul li h3').on('click', function () {
// 		if ($(this).next('.sub-nav').is(':hidden')) {
// 			$('.sub-nav').slideUp(300);
// 			$(this).parents('li').addClass('active');
// 			$(this).next('.sub-nav').stop(true, true).slideDown(300);

// 		} else {
// 			$('nav ul li').removeClass('active');
// 			$('.sub-nav').slideUp(300);
// 		}
// 	});



// 	if (typeof Swiper != 'undefined') {
// 		var indexSwiper = new Swiper('.banner-slider', {
// 			paginationClickable: true,
// 			loop: true,
// 			speed: 1200,
// 			autoplay: 6000,
// 			pagination: '.banner-slider .index-dot',
// 			autoplayDisableOnInteraction: false,
// 			simulateTouch: false,
// 			onSlideChangeEnd: function (swiper) {
// 				$(".banner-slider ul li").eq(swiper.activeIndex).addClass("active").siblings().removeClass("active");

// 			},

// 		});

// 		var proSwiper = new Swiper('.indexcase-list', {
// 			paginationClickable: true,
// 			//loop: true,
// 			speed: 1200,
// 			slidesPerView: 2,
// 			autoplayDisableOnInteraction: false,
// 			simulateTouch: false,
// 			spaceBetween: 30,
// 			pagination: '.indexcase-swiper .case-dot',
// 			prevButton: '.indexcase-swiper .case-left',
// 			nextButton: '.indexcase-swiper .case-right',
// 			breakpoints: {
// 				767: {
// 					slidesPerView: 1,

// 				}

// 			}

// 		});


// 	}




// 	if (typeof WOW != 'undefined') {
// 		var wow = new WOW({
// 			boxClass: 'wow',
// 			animateClass: 'animated',
// 			offset: 0,
// 			mobile: false,
// 			live: true
// 		});
// 		wow.init();
// 	}



// 	//返回
// 	var backtop = $(".back-up");
// 	var wint = $(window).scrollTop();
// 	$(window).on('scroll', function () {
// 		wint = $(window).scrollTop();
// 		if (wint <= 400) {
// 			backtop.fadeOut(300);
// 		};
// 		if (wint > 400) {
// 			backtop.fadeIn(300);
// 		};
// 	});

// 	backtop.on('click', function () {
// 		$("html,body").stop(false, true).animate({
// 			"scrollTop": 0
// 		}, 500);
// 		return false;
// 	});


// 	//判断二级是否存在
// 	$("nav ul li").each(function () {
// 		if (!$(this).find(".sub-nav").length > 0) {
// 			$(this).find(".arrorright-btn").remove();
// 		}
// 	});

// 	$(".footer-nav ul li").each(function () {
// 		if (!$(this).find(".footer-subnav a").length > 0) {
// 			$(this).find(".plus").remove();
// 		}
// 	});


// });

(function ($) {
    $.uaMatch = function (ua) {
        ua = ua.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };
    if (!$.browser) {
        matched = $.uaMatch(navigator.userAgent);
        browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }
        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }
        $.browser = browser;
    }
    $(document).on('click', 'a#goon', function () {
        $("#ie-alert-overlay").hide();
        $("#ie-alert-panel").hide();
    });

    function initialize($obj, support, title, text) {
        var panel = "<span>" + title + "</span>" +
            "<p>" + text + "</p>" +
            "<div class='browser'>" +
            "<ul>" +
            "<li><a class='chrome' href='https://www.google.com/chrome/' target='_blank'></a></li>" +
            "<li><a class='firefox' href='http://www.mozilla.org/en-US/firefox/new/' target='_blank'></a></li>" +
            "<li><a class='ie9' href='https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads' target='_blank'></a></li>" +
            "<li><a class='safari' href='https://support.apple.com/zh_CN/downloads/safari' target='_blank'></a></li>" +
            "<li><a class='opera' href='http://www.opera.com/download/' target='_blank'></a></li>" +
            "<ul>" +
            "</div>";
        var overlay = $("<div id='ie-alert-overlay'></div>");
        var iepanel = $("<div id='ie-alert-panel'>" + panel + "</div>");
        var docHeight = $(document).height();
        overlay.css("height", docHeight + "px");
        if (support === "ie9") { // ie9-
            if ($.browser.msie && parseInt($.browser.version, 10) < 10) {
                $obj.prepend(iepanel);
                $obj.prepend(overlay);
            }
            if ($.browser.msie && parseInt($.browser.version, 10) === 6) {
                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");
            }

        } else if (support === "ie8") { // ie8-
            if ($.browser.msie && parseInt($.browser.version, 10) < 9) {
                $obj.prepend(iepanel);
                $obj.prepend(overlay);
            }
            if ($.browser.msie && parseInt($.browser.version, 10) === 6) {
                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");
            }
        } else if (support === "ie7") { // ie7-
            if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
                $obj.prepend(iepanel);
                $obj.prepend(overlay);
            }
            if ($.browser.msie && parseInt($.browser.version, 10) === 6) {
                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");
            }
        } else if (support === "ie6") { // ie6-
            if ($.browser.msie && parseInt($.browser.version, 10) < 7) {
                $obj.prepend(iepanel);
                $obj.prepend(overlay);
                $("#ie-alert-panel").css("background-position", "-626px -116px");
                $obj.css("margin", "0");
            }
        }
    };
    $.fn.iealert = function (options) {
        var defaults = {
            support: "ie9",
            title: '\u6e29\u99a8\u63d0\u793a\uff1a\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e\uff0c\u8bf7\u5347\u7ea7\u6d4f\u89c8\u5668\uff01',
            text: "\u4e3a\u4e86\u66f4\u597d\u7684\u7f51\u7ad9\u6d4f\u89c8\u4f53\u9a8c\u002c\u6211\u4eec\u5f3a\u70c8\u5efa\u8bae\u60a8\u5347\u7ea7\u5230\u6700\u65b0\u7248\u672c\u7684\u0049\u006e\u0074\u0065\u0072\u006e\u0065\u0074\u0020\u0045\u0078\u0070\u006c\u006f\u0072\u0065\u0072\u6216\u9009\u62e9\u5176\u4ed6\u4e3b\u6d41\u6d4f\u89c8\u5668\u3002\u63a8\u8350\u4f7f\u7528\u4e0b\u5217\u4e3b\u6d41\u6d4f\u89c8\u5668\uff1a <br><br><a href='javascript:;' style='font-size:20px;' id='goon'>>>>\u7EE7\u7EED\u8BBF\u95EE</a>"
        };
        var option = $.extend(defaults, options);
        return this.each(function () {
            if ($.browser.msie) {
                var $this = $(this);
                initialize($this, option.support, option.title, option.text);
            }
        });
    };
})(jQuery);
$(document).ready(function () {
    $("body").iealert();
});