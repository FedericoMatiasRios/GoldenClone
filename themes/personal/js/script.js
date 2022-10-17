(function ($, Drupal) {

	"use strict";

	window.copyOnClick = function(elem, text, cb, err){
    var targetId  = "_HiddenCopyText_";
    var isInput   = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if(isInput){
      target = elem;
      origSelectionStart = elem.selectionStart;
      origSelectionEnd = elem.selectionEnd;
    }else{
      target = document.getElementById(targetId);
      if (!target) {
        var target = document.createElement("textarea");
        target.style.position = "absolute";
        target.style.left = "-9999px";
        target.id = targetId;
        elem.parentNode.appendChild(target);
      }
      target.textContent = text;
    }
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    var succeed;
    try{
      succeed = document.execCommand("copy");
    }catch(e){
      succeed = false;
    }
    if(currentFocus && typeof currentFocus.focus === "function"){
      currentFocus.focus();
    }
    if(isInput){
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    }else{
      target.textContent = "";
    }
    target.remove();
    elem.focus();
    if(succeed){
      // console.log('copied');
    }
    if(succeed && typeof cb == 'function'){
      cb();
    } else {
      if( typeof err == 'function'){
        err()
      }
    }
  }

	$(document).ready(function () {

		$('html').removeClass('is-loading');

		$(document).on('click', '.dropdown-list__first', function(){
			var $this = $(this);
			var $container = $this.parents('.dropdown-list:first');
			if($container.hasClass('is-open')){
				$container.removeClass('is-open');
			} else {
				$('.dropdown-list').removeClass('is-open');
				$container.addClass('is-open');
			}
		});
		
		$(document).mouseup(function (e){
			var div = $(".dropdown-list__first");
			if (!div.is(e.target) && div.has(e.target).length === 0) {
				$('.dropdown-list').removeClass('is-open');
			}
		});

		$(document).on('click', '.personal-account-menu .nav-account .menu__item--expanded > a', function(e){
			e.preventDefault();
			if($(this).parent().hasClass('show_submenu')){
				$(this).parent().parent().find('.show_submenu').removeClass('show_submenu').find('.menu').slideUp('fast');
			} else {
        if($(window).width() > 992 && $(window).width() < 1200 && !$('body').hasClass('is-visible-menu')){
          $('.js-menu-btn:first').trigger('click');
        }
				$(this).parent().parent().find('.show_submenu').removeClass('show_submenu').find('.menu').slideUp('fast');
				$(this).parent().addClass('show_submenu').find('.menu:first').slideDown('fast');
			}
		});

		$(document).on('click', '.js-menu-btn', function(){
			var $this = $(this);
			if($('body').hasClass('is-visible-menu')){
				$('html').removeClass('is-overflow');
				$('body').removeClass('is-visible-menu');
				$('.personal-account-menu .nav-account__item').css('transition-delay', '0s');
				$('body').removeClass('hide-phone-panel-bottom');
			} else {
				$('html').addClass('is-overflow');
				$('body').addClass('is-visible-menu');
				$('body').addClass('hide-phone-panel-bottom');
				var delay = 0.2;
				$('.personal-account-menu .nav-account__item').each(function(){
					$(this).css('transition-delay', delay + 's');
					delay += 0.1;
				});
			}
		});

		// var StartTouch, moveOffset, move;
		// var headerHeight = $('.site-header').innerHeight();
		// document.addEventListener('touchstart', function(event) {
    //   if($(window).width() > 992){
    //     return;
    //   }
	  //   	StartTouch = event['changedTouches'][0]['clientY'];
		// }, false);
		// document.addEventListener('touchmove', function(event) {
    //   if($(window).width() > 992){
    //     return;
    //   }
		// 	if($(window).scrollTop() > headerHeight && !$('body').hasClass('hide-phone-panel-bottom')){
		// 		move = event['changedTouches'][0]['clientY'];
		// 		moveOffset = move - StartTouch;
		// 		var marginHeader = parseInt( $('.site-header').css('margin-top') );
		// 		if(Math.abs(moveOffset) > headerHeight/2){
		// 			if(moveOffset > 0){
		// 				if(marginHeader < 0 && moveOffset < 70){
		// 					var movePosition = moveOffset - headerHeight;
		// 					$('.site-header, .sidebar-first, .m-side-section').css('margin-top', movePosition + 'px');
		// 				}
		// 			} else {
		// 				if(marginHeader > -70){
		// 					$('.site-header, .sidebar-first, .m-side-section').css('margin-top', moveOffset + 'px');
		// 				}
		// 			}
		// 		}
		// 	}
		// }, false);
		// document.addEventListener('touchend', function(event) {
    //   if($(window).width() > 992){
    //     return;
    //   }
		// 	if($(window).scrollTop() > headerHeight && !$('body').hasClass('hide-phone-panel-bottom')){
		// 		var EndTouch = event['changedTouches'][0]['clientY'];
		// 		var touchOffset = Math.abs(EndTouch - StartTouch);
		// 		if(touchOffset >= headerHeight/2){
		// 			if(EndTouch > StartTouch){
		// 				if(EndTouch - StartTouch > headerHeight/2){
		// 					$('.site-header, .sidebar-first, .m-side-section').css('margin-top', 0);
		// 				} else {
		// 					$('.site-header, .sidebar-first, .m-side-section').css('margin-top', '-' + headerHeight + 'px');
		// 				}
		// 			}
		// 			if(StartTouch > EndTouch){
		// 				if(StartTouch - EndTouch > headerHeight/2){
		// 					$('.site-header, .sidebar-first, .m-side-section').css('margin-top', '-' + headerHeight + 'px');
		// 				} else {
		// 					$('.site-header, .sidebar-first, .m-side-section').css('margin-top', 0);
		// 				}
		// 			}
		// 		}
		// 	}
		// }, false);

		$(document).on('click', '.copy-input-btn', function(e){
			e.preventDefault();
			var $this = $(this);
			var input = $(this).data('input');
			var $input = $('[name=' + input + ']');
			if($input.length){
				$input[0].select();
				$input[0].setSelectionRange(0, 99999);
				document.execCommand("copy");
				$this.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
			}
		});

		$(document).on('click', '.copy-input', function(e){
			var $this = $(this);
			$this[0].select();
			$this[0].setSelectionRange(0, 99999);
			document.execCommand("copy");
			$this.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
		});

		$(document).on('click', '.private-message-thread-messages .private-message-wrapper .message a', function(e){
			var obj = $(this);
			if(obj.attr('href').indexOf('mailto:') >= 0){
				e.preventDefault();
				window.copyOnClick(obj.get(0), obj[0].innerText, function(){
					obj.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
				});
			}
		});

		$(document).on('click', '.js-copy-text', function(e){
      e.preventDefault();

			var obj = $(this);
			window.copyOnClick(obj.get(0), obj[0].innerText, function(){
				obj.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
			});

			// var $this = $(this);
      // var copyText = $this[0].innerText;
      // if (navigator.share) {
      //   navigator.share({
      //     title: Drupal.t('Share'),
      //     text: copyText,
      //     // url: document.location.host,
      //   });
      // } else {
      //   var input = document.createElement('input');
      //   input.setAttribute('value', copyText);
      //   document.body.appendChild(input);
      //   input.style.position = "fixed";
      //   input.style.left = "-9999px";
      //   input.style.top = "0";
      //   input.select();
      //   input.focus();
      //   input.setSelectionRange(0, 99999);
      //   document.execCommand("copy");
      //   $this.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
      //   document.body.removeChild(input);
      //   $this.focus();
      // }
		});

		$(document).on('click', '.js-copy-data-text', function(e){
      e.preventDefault();

			var obj = $(this);
			window.copyOnClick(obj.get(0), obj.attr('data-copy'), function(){
				obj.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
			});

			// var $this = $(this);
      // var copyText = $this.attr('data-copy');
      // if (navigator.share) {
      //   navigator.share({
      //     title: Drupal.t('Share'),
      //     text: copyText,
      //     // url: document.location.host,
      //   });
      // } else {
      //   var input = document.createElement('input');
      //   input.setAttribute('value', copyText);
      //   input.style.position = "fixed";
      //   input.style.left = "-9999px";
      //   input.style.top = "0";
      //   document.body.appendChild(input);
      //   input.select();
      //   input.focus();
      //   input.setSelectionRange(0, 99999);
      //   document.execCommand("copy");
      //   $this.NotyGenerate('status', Drupal.t('Text copied to clipboard'));
      //   document.body.removeChild(input);
      //   $this.focus();
      // }
		});

		$(document).on('click', '.form__error-message, .form-item--error-message', function(){
			$(this).hide();
		});

		$(document).on('click', '.support-fixed__title', function(){
			$('.support-fixed__content').toggle();
		});

		$(document).on('click', '.support-fixed__close', function(){
			setCookie('supportCockie', true, 30);
			var $support = $(this).parents('.support-fixed');
			$support.find('.support-fixed__content').hide();
		});

		var supportCockie = getCookie('supportCockie');
		if(!supportCockie){
			$('.support-fixed__content').show();
		}

		$(document).on('click', '.popup-user-message .close-popup-message', function(){
			setCookie('popupFixedMessage', true, 7);
			var $support = $('.popup-user-message');
			$support.stop().slideUp('fast');
		});

		var popupFixedMessage = getCookie('popupFixedMessage');
		if(!popupFixedMessage){
			setTimeout(function(){
				$('.popup-user-message').slideDown('fast');
			}, 2000);
		}

    $(document).on('click', '.js-dark-mode-switcher-btn', function (){
      if(typeof darkMode !== 'undefined' && darkMode === 'night'){
        darkMode = 'day';
        $('html').removeClass("dark-mode");
        setCookie('darkMode', darkMode);
      } else {
        darkMode = 'night';
        $('html').addClass("dark-mode");
        setCookie('darkMode', darkMode);
      }
    });

    window.addEventListener('click', e => {
      const target = e.target
      if (!target.closest('.m-side-section-container') && !target.closest('.js-menu-btn') && !target.closest('.personal-account-menu')) {
        $('body').removeClass('is-visible-menu hide-phone-panel-bottom');
        $('html').removeClass('is-overflow');
      }
    });

    $(document).on('click', '.js-remove-this', function (e){
      e.preventDefault();
      $(this).remove();
    });







		/* Start scroll */
		var topWindow = $(window).scrollTop();
		var winHeight = $(window).height();
		$(window).scroll(function (e) {
			topWindow = $(window).scrollTop();
			if(topWindow > 100 || $('.site-page').innerHeight() <= (winHeight + 100)){
				$('.userheaderoperations').addClass('is-show');
			} else {
				$('.userheaderoperations').removeClass('is-show');
			}
		});

		/* End scroll */





		/* End Start adaptive */
		setTimeout(function(){
			$(window).resize();
			$(window).scroll();
		}, 0);



	});

	Drupal.behaviors.personal = {
		attach: function (context, settings) {

			$('.noty_type_status').once('close_poup').each(function () {
				if(typeof $.magnificPopup !== 'undefined'){
					$.magnificPopup.close();
				}
			});
			
			$('form').once('submit').each(function(){
				var form = $(this);
				form.keypress(function(e){
					if(e.keyCode == 13){
						form.find('[id^="edit-submit"]').trigger('mousedown').trigger('click');
					}
				});
			});
			
			$('.mess_status_wrap', context).once('close_comment').each(function () {
				setTimeout(function () {
					$.magnificPopup.close();
				}, 5000);
			});

			$('form .form__error-message, form-item--error-message').each(function () {
				$(this).delay(5000).fadeOut('fast');
			});

			$('.text-formatted iframe').once('text_youtube').each(function () {
				var vidId = YouTubeGetID($(this).attr('src'));
				if (typeof vidId !== 'undefined') {
					$(this).wrap('<div class="youtube-container"></div>');
					$(this).wrap('<div class="youtube-container--responsive"></div>');
				}
			});

			$('.views-exposed-form.auto-submit').once('other').each(function(){
				$(this).on('change', 'input, select', function(){
					other_auto_submit(this);
				});
			});

			// $('.sidebar-first-container').once('sticky_sidebar').each(function(){
			// 	var $this = $(this);
			// 	$this.stickySidebar({
			// 		// topSpacing: 150,
			// 		bottomSpacing: 0,
			// 		minWidth: 1200,
			// 		// innerWrapperSelector: '.region-sidebar-first',
			// 		containerSelector: '.region-sidebar-first',
			// 	});
			// });

			$('.ico-hint, .js-ico-hint').once('hint').each(function(){
				var $this = $(this);
				if(typeof $.fn.tooltipster !== 'undefined'){
					var hint_text;
					if( $this.html() != '' ){
						hint_text = $this.html();
					} else if ($this.attr('title') != '') {
						hint_text = $this.attr('title');
					}
					if( typeof hint_text !== 'undefined'){
            var cleanStyle = $this.data('clean-style');
            var tooltipOptions = {
              content: hint_text,
              contentAsHTML: true,
              theme: 'tooltipster-shadow',
              animation: 'grow',
              maxWidth: 300,
              // minWidth: 100,
              interactive: true,
              // delay: [0, 10000000],
              hideOnClick: true,
              // touchDevices: false,
              zIndex: typeof $this.data('index') !== 'undefined' ? $this.data('index') : 40,
            }
            if($this.data('position')){
              tooltipOptions.position = $this.data('position');
            }
            if(cleanStyle){
              tooltipOptions.theme = false;
              tooltipOptions.arrow = false;
              tooltipOptions.functionReady = function (origin, tooltip){
                $(tooltip.tooltip).addClass('clean-style');
              };
            }
						$this.tooltipster(tooltipOptions).on('click', function(e){
              e.stopPropagation();
              e.preventDefault();
							if($('.tooltipster-show').length){
								$this.tooltipster('hide');
							} else {
								$this.tooltipster('open');
							}
						});
					}
				}
			});

      $('.copy-input').once('input_size').each(function (){
        var $this = $(this);
        $this.attr('size', Math.ceil( ($this.val().length+1)*0.71) );
      });

      $('.user-header-operations__item--bell .ico-bell').once('bell').each(function(){
        $(this).parents('.user-header-operations__item').removeClass('user-header-operations__item--bell-hide');
      });

      $(window, context).resize(function (){
        var windwoWidth = $(window).width();

        $('.region-content .nav-account').each(function (){
          var $this = $(this);
          var innerWidth = 0;
          var $parent = $this.parents('.block-menu:first');
          $this.find('.nav-account__item').each(function(){
            innerWidth += $(this).outerWidth(true);
          });
          if(innerWidth > $this.outerWidth(true) ){
            $parent.addClass('has-scroll');
          } else {
            $parent.removeClass('has-scroll');
          }
        });

        $('.responsive_table').each(function (){
          var $this = $(this);
          var $table = $this.find('table:first');
          var hand = $('<div class="swiper-hand swiper-hand--table"></div>');
          if($table.width() > $this.width()){
            if(!$this.prevAll('.swiper-hand:first').length){
              hand.insertBefore($this);
            }
          } else {
            $this.prevAll('.swiper-hand').remove();
          }
        });

        /* Планшет */
        if(windwoWidth > 767){
          // if(!$('.region-header .userheaderoperations').length){
          //   $('.region-header').prepend( $('.userheaderoperations') );
          // }
          // if(!$('.section-user-header__container .header-ico-bell').length){
          //   $('.section-user-header__container').prepend( $('.header-ico-bell') );
          // }
          if($('.region-header .userheaderoperations')){
            $('.region-header').prepend( $('.userheaderoperations') );
          }
        } else {
          // if(!$('.m-side-section-container .userheaderoperations').length){
          //   $('.m-side-section-container').prepend( $('.userheaderoperations') );
          // }
          // if(!$('.m-side-section-container .header-ico-bell').length){
          //   $('.m-side-section-container').prepend( $('.header-ico-bell') );
          // }
          if($('.site-page > .userheaderoperations')){
            $('.site-page').append( $('.userheaderoperations') );
          }
        }

        /* Планшет альбом */
        if(windwoWidth > 992){
          if(!$('.region-header .header-soc-net').length){
            $('.region-header').append( $('.header-soc-net') );
          }
          if(!$('.region-sidebar-first .personal-account-menu').length){
            $('.region-sidebar-first').append( $('.personal-account-menu') );
          }
        } else {
          if(!$('.m-side-section-container .header-soc-net').length){
            $('.m-side-section-container').append( $('.header-soc-net') );
          }
          if(!$('.m-side-section-container .personal-account-menu').length){
            $('.m-side-section-container').append( $('.personal-account-menu') );
          }
        }
      });

			$(window).resize();

		}
	}

	window.YouTubeGetID = function(url) {
		return url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\/?\?v=|\/embed\/|\/)([^\s&]+)/)[1];
		var ID = '';
		url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
		if (url[0] !== 'undefined' && url[0] == 'https://www.youtube.com' && url[2] !== 'undefined') {
			ID = url[2].split(/[^0-9a-z_\-]/i);
			ID = ID[0];
			return ID;
		}
	}

	window.other_auto_submit = function(obj){
		if ($(obj).closest('.mfp-container').length) {
			return;
		}
		$(obj).closest('form').find('.form-submit').trigger('click');
	}

})(jQuery, Drupal);