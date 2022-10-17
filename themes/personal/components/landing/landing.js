(function ($, Drupal) {

	"use strict";

	function clickMenu(){
		var $header = $('.site-header-lp');
		var elements = [
			'.landing-page-menu ul li',
			'.page-landing .language-switcher',
			'.landing-page-header-link'
		];
		if($header.hasClass('is-open-menu')){
			$header.removeClass('is-open-menu');
			$('body').removeClass('is-overflow');
			$(elements.join(',')).each(function(){
				$(this).css('transition-delay', '0s');
			});
		} else {
			$header.addClass('is-open-menu');
			$('body').addClass('is-overflow');
			var elDelay = 0.2;
			$(elements.join(',')).each(function(){
				$(this).css('transition-delay', elDelay+'s');
				elDelay += 0.1;
			});
		}
	}

	$(document).ready(function () {

		$(document).on('click', '.landing-page-menu-btn, .landing-page-fixed-bg', function(){
			clickMenu();
		});

		$(document).on('click', '.type-lp-presentation .field-block-youtube a, .type-lp-presentation .field-block-text', function(e){
			// var $youtube = $(this).parents('.type-lp-presentation').find('.field-block-youtube a');
      var videoUrl = $(this).data('youtube');
			var YouTubeUrl = YouTubeGetID(videoUrl);
			if(typeof YouTubeUrl !== 'undefined'){
				e.preventDefault();
				// var html = '<div class="youtube-container--responsive"><iframe src="https://www.youtube.com/embed/' + YouTubeUrl + '?autoplay=1" allow="autoplay"></iframe></div>';
				// $youtube.replaceWith(html);
        $.magnificPopup.open({
          items: {
            src: videoUrl
          },
          type: 'iframe',
          iframe: {
            patterns: {
              youtube: {
                index: 'youtu',
                id: function (url){
                  return YouTubeUrl;
                },
                src: '//www.youtube.com/embed/%id%?autoplay=1&mute=1'
              },
            }
          }
        }, 0);
			}
		});

    $(document).on('click', '.type-lp-about .field-block-youtube a, .type-lp-about .field-block-img a, .type-gallery-img .field-block-youtube a, .type-gallery-img .field-block-img a', function(e){
      var $this = $(this);
      var videoUrl = $this.attr('href');
      var YouTubeUrl = YouTubeGetID(videoUrl);
      if(typeof YouTubeUrl !== 'undefined'){
        e.preventDefault();
        var html = '<div class="youtube-container--responsive"><iframe src="https://www.youtube.com/embed/' + YouTubeUrl + '?autoplay=1" allow="autoplay"></iframe></div>';
        $this.replaceWith(html);
      }
    });

		$(window).scroll(function(){
			var topWindow = $(window).scrollTop();
			if(topWindow > 300){
				$('.site-header-lp').addClass('is-fixed');
			} else {
				$('.site-header-lp').removeClass('is-fixed');
			}
		});

	});

	Drupal.behaviors.personal_landing = {
		attach: function (context, settings) {

      $('.animate-arrow-element').once('arrow_animate').each(function(){
        var $this = $(this);
        anime.timeline({
          loop: true
        })
        .add({
          targets: '.animate-arrow-element-item',
          translateX: [-40,0],
          translateZ: 0,
          opacity: [0,1],
          easing: "easeOutExpo",
          duration: 1500,
          delay: (el, i) => 500 + 30 * i
        }).add({
          targets: '.animate-arrow-element-item',
          translateX: [0,30],
          opacity: [1,0],
          easing: "easeInExpo",
          duration: 1500,
          delay: (el, i) => 100 + 30 * i
        });
      });

      $('.logo-letter-circle-text').once('circle').each(function(){
        var $this = $(this);
        var text = $this[0].innerText;
        $this.text('');
        for (var i = 0; i < text.length; i++) {
          var letter = text[i];
          var span = document.createElement('span');
          var node = document.createTextNode(letter);
          var r = (360/text.length)*(i);
          var x = (Math.PI/text.length).toFixed(0) * (i);
          var y = (Math.PI/text.length).toFixed(0) * (i);
          span.appendChild(node);
          span.style.transform = 'rotateZ('+r+'deg) translate3d('+x+'px,'+y+'px,0)';
          this.appendChild(span);
        }
      });

			$('.type-lp-main').once('figure').each(function(){
				var $this = $(this);
				// var pathes = [
				// 	'M0 0H100V100H0V0Z',
				// 	'M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z',
				// 	'M50 0L100 87H0L50 0Z',
				// ];
				// var maxPosition = pathes.length - 1;
				//
				// var figures = [
				// 	'<svg class="figure-main figure-main--1" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="" fill="#F8E32E"/></svg>',
				// 	'<svg class="figure-main figure-main--2" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="" fill="#DFCD9B"/></svg>',
				// 	'<svg class="figure-main figure-main--3" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="" fill="#ECECED"/></svg>',
				// 	'<svg class="figure-main figure-main--4" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="" fill="#FCF9F1"/></svg>',
				// ];
        //
				// $.each(figures, function(i, figure){
				// 	$this.prepend(figure);
				// });
				// var thisHeight = $(this).innerHeight();
				// $this.find('.figure-main').each(function(){
				// 	var svg = $(this);
				// 	var timeDelay = anime.random(0, 1000*20);
				// 	setTimeout(function(){
				// 		anime({
				// 			targets: svg[0],
				// 			translateX: ['-10vw', '100vw'],
				// 			translateY: [anime.random(0, thisHeight), anime.random(0, thisHeight)],
				// 			scale: [anime.random(0.1, 1), anime.random(0.1, 1)],
				// 			easing: 'linear',
				// 			duration: anime.random(1000*50, 1000*100),
				// 			loop: true,
				// 			begin: function(anim) {
				// 				anime({
				// 					targets: svg.find('path')[0],
				// 					d: pathes[anime.random(0, maxPosition)],
				// 					easing: 'linear',
				// 					duration: 0,
				// 				});
				// 			},
				// 		});
				// 	}, timeDelay);
				// });

        // var $el = $this.find('.field-block-title');
        // var FSize = parseInt($el.css('font-size'));
        //
        // var options = {
        //   size: FSize,         // Font size, defined by the height of the letters (pixels)
        //   weight: 10,         // Font weight (pixels)
        //   rounded: false,    // Rounded letter endings
        //   color: '#fff',  // Font color
        //   duration: 1,       // Duration of the animation of each letter (seconds)
        //   delay: [0, 0.05],  // Delay animation among letters (seconds)
        //   fade: 0.5,         // Fade effect duration (seconds)
        //   easing: d3_ease.easeCubicInOut.ease,   // Easing function
        //   individualDelays: false,               // If false (default), every letter delay increase gradually, showing letters from left to right always. If you want to show letters in a disorderly way, set it to true, and define different delays for the desired letters.
        // };
        //
        // var myText = new Letters($el[0], options);
        // myText.show();

				$this.find('.field-block-title, .field-block-subtitle, .field-block-description, .register-link a, .field-block-text').each(function(){
					var text = $(this)[0].innerText;
					$(this).html(text).lettering('words').find('span').each(function(){
						$(this).addClass('word').lettering().find('span').addClass('letter');
					});
				});

        var delayLetter = 100;
        var animates = [];
        $this.find('.letter').each(function(e){
          animates[e] = anime({
            targets: $(this)[0],
            translateX: [40,0],
            translateZ: 0,
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 600,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+10;
            }
          });
        });

				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				
				$this.scrollSpy();
				
			});

      $('.type-lp-main .field-block-img-multi').once('slider').each(function(){
        var $this = $(this);
        var duration = 3000;
        var count = $this.find('.field-block-img-multi__item').length;
        $this.find('.field-block-img-multi__item').each(function(i){
          var $slide = $(this);
          // var animation = anime({
          //   targets: $slide[0],
          //   duration: duration,
          //   // easing: 'linear',
          //   loop: true,
          //   autoplay: false,
          //   keyframes: [
          //     {
          //       translateX: '-75%',
          //       translateY: '-10%',
          //       opacity: 0.5,
          //     },
          //     {
          //       translateX: 0,
          //       translateY: '-20%',
          //       opacity: 0.3,
          //     },
          //     {
          //       translateX: '75%',
          //       translateY: '-10%',
          //       opacity: 0.5,
          //     },
          //     {
          //       translateX: 0,
          //       translateY: 0,
          //       opacity: 1,
          //     },
          //   ],
          // });

          // var progress = animation.duration/count*i;
          // animation.seek( progress );
          // animation.play();

          var tl = anime.timeline({
            targets: $slide[0],
            duration: duration,
            // easing: 'linear',
            loop: true,
            autoplay: false,
            update: function(anim) {
              // var progress = tl.progress;
              // if( progress > 0 && progress < 15 ){
              //   $slide.addClass('is-active');
              //   $slide.addClass('is-active-main');
              // } else if (progress >= 15 && progress < 25) {
              //   $slide.addClass('is-active');
              //   $slide.removeClass('is-active-main');
              // } else if (progress >= 25 && progress < 75) {
              //   $slide.removeClass('is-active');
              //   $slide.removeClass('is-active-main');
              // } else if (progress >= 75 && progress < 85) {
              //   $slide.removeClass('is-active');
              //   $slide.addClass('is-active-main');
              // } else if (progress >= 85) {
              //   $slide.addClass('is-active');
              //   $slide.addClass('is-active-main');
              // }
            },
            begin: function (){
              $slide.addClass('is-active-main');
              $slide.removeClass('is-shadow');
            },
          }).add({
            translateX: '-85%',
            translateY: '-25%',
            opacity: 0.5,
            scale: 0.85,
            changeBegin: function (){
              $slide.removeClass('is-active-main');
              $slide.removeClass('is-shadow');
            },
          }).add({
            translateX: 0,
            translateY: '-50%',
            opacity: 0.3,
            scale: 0.68,
          }).add({
            translateX: '85%',
            translateY: '-25%',
            opacity: 0.5,
            scale: 0.85,
          }).add({
            translateX: 0,
            translateY: 0,
            opacity: 1,
            scale: 1,
            changeBegin: function (){
              $slide.addClass('is-shadow');
              $slide.addClass('is-active-main');
            },
          });

          var progress = tl.duration/count*i;
          tl.seek( progress );
          tl.play();

        });

        return;

        var $slider = $this.find('.swiper');
        const swiper = new Swiper($slider[0], {
          speed: 5000,
          autoplay: {
            delay: 0,
          },
          loop: true,
          // loopedSlides: ($this.find('.swiper-slide').length + 2),
          // cssMode: true,
          // slidesPerView: 4,
          // centerInsufficientSlides: true,
          // centeredSlides: true,
          // centeredSlidesBounds: true,
          // effect: 'cards',
          effect: 'creative',
          creativeEffect: {
            // limitProgress: 2,
            prev: {
              translate: ['-75%', '-20%', -100],
              opacity: 0.5,
              // scale: '0.8',
            },
            next: {
              translate: ['75%', '-20%', -100],
              opacity: 0.5,
              // scale: '0.8',
            },
          },
          on: {
            progress: function (swiper, progress) {
              console.log(swiper);
              console.log(progress);
            },
          },
        });
      });

			$('.type-lp-presentation').once('presentation').each(function(){
				var $this = $(this);

        var animates = [];
        var delayLetter = 100;
        var i = 0;
        $this.find('.group-first .field').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [-100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
        $this.find('.field-block-youtube').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [200,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });

				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.balancecalculator').once('calculator').each(function(){
				var $this = $(this);

        var i = 0;
        var animates = [];
        $this.find('.balance-calculator__item:even').each(function(){
          var $el = $(this);
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [-200,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: 100,
            autoplay: false,
            complete: function (){
              $el.removeAttr("style");
            },
          });
          i++;
        });
        $this.find('.balance-calculator__item:odd').each(function(){
          var $el = $(this);
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [200,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            delay: 100,
            autoplay: false,
            complete: function (){
              $el.removeAttr("style");
            },
          });
          i++;
        });

				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});

				$this.scrollSpy();

			});

			$('.type-lp-about').once('about').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var i = 0;
        var animates = [];
        $this.find('.group-first .field').each(function(){
          if($(this).hasClass('field-block-img-multi')){
            return;
          }
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [-100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
        $this.find('.field-block-img-multi__item').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
        $this.find('.group-second .field').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });

				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.type-ico-desc').once('about').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.field-block-paragraphs__item').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            scale: [0.5,1],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.type-lp-products').once('products').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.field-block-subtitle, .field-block-title, .field-block-description').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateY: [100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
        $this.find('.field-block-paragraphs__item').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            scale: [0,1],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.type-lp-start').once('start').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.field-block-subtitle, .field-block-title').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [-100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
        $this.find('.logo-letter-circle, .field-block-paragraphs__item, .field-block-img-multi__item, .field-block-link a').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            scale: [0,1],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            },
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');

            $(animates).each(function (i, el){
              el.play();
            });

            setTimeout(function (){
              $this.find('.field-block-img-multi__item').each(function(){
                $(this).attr('data-depth', anime.random(1, 10)/10 );
              });
              var parallaxInstance = new Parallax($this[0], {
                selector: '.field-block-img-multi__item',
                relativeInput: false,
                pointerEvents: true,
                hoverOnly: false,
              });
            }, delayLetter);

					}
				});
				$this.scrollSpy();
			});

			$('.type-lp-start .paragraph-element-video-title .field-paragraphs-text a').once('mpf_youtube').each(function(){
				var $this = $(this);
				var videoId = YouTubeGetID($this.attr('href'));
				$this.magnificPopup({
					type: 'iframe',
					iframe: {
						patterns: {
							youtube: {
								index: 'youtu',
								id: function(url) {
									return YouTubeGetID(url);
								},
								src: '//www.youtube.com/embed/%id%?autoplay=1'
							},
						},
					}
				});
			});

			$('.type-lp-benefits').once('benefits').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.group-text .field').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [-100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
        $this.find('.field-block-paragraphs').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateX: [100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.type-lp-benefits .field-block-paragraphs').once('lp_benefits').each(function(){
				var $this = $(this);
				var $container = $this.find('.swiper-container');
				var maxHeight = 0;
				$this.find('.paragraph-element-vertical-slide').each(function(){
					if($(this).innerHeight() > maxHeight){
						maxHeight = $(this).innerHeight();
					}
				});
				maxHeight += 80;
				$container.height(maxHeight);
				new Swiper($container[0], {
					// height: maxHeight,
					slidesPerView: 3,
					// loopedSlides: 3,
					direction: 'vertical',
					centeredSlides: true,
					loop: true,
					// autoHeight: true,
					watchOverflow: true,
					speed: 500,
					watchSlidesVisibility: true,
					effect: 'coverflow',
					centeredSlidesBounds: true,
					slideToClickedSlide: true,
					coverflowEffect: {
						rotate: 0,
						// stretch: 400,
						depth: 400,
						// modifier: 1,
						slideShadows: false,
					},
				});
			});

			$('.type-lp-slogan-bottom').once('slogan').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.field').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            translateY: [100,0],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.type-statistics-numbers').once('slogan').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.field').each(function(){
          if($(this).hasClass('field-block-paragraphs')){
            return;
          }
          animates[i] = anime({
            targets: $(this)[0],
            scale: [0,1],
            opacity: [0,1],
            easing: "easeOutExpo",
            duration: 500,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();

			});

			$('.type-lp-text-img').once('slogan').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.group-media .logo-letter-circle, .group-media .field-block-img-multi__item').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            opacity: [0,1],
            translateY: ['50%', 0],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
        $this.find('.group-text .field').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            opacity: [0,1],
            translateX: ['50%', 0],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');

            $(animates).each(function (i, el){
              el.play();
            });

            setTimeout(function (){
              $this.find('.field-block-img-multi__item').each(function(){
                $(this).attr('data-depth', anime.random(1, 10)/10 );
              });
              var parallaxInstance = new Parallax($this[0], {
                selector: '.field-block-img-multi__item',
                relativeInput: false,
                pointerEvents: true,
                hoverOnly: false,
              });
            }, delayLetter);

					}
				});
				$this.scrollSpy();
			});

			$('.landing-user-info').once('slogan').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.landing-user-info-slogan, .landing-user-info-slogan-sub').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            opacity: [0,1],
            translateY: ['100%', 0],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
        $this.find('.landing-user-info__info').each(function(){
          animates[i] = anime({
            targets: $(this)[0],
            opacity: [0,1],
            translateX: ['50%', 0],
            easing: "easeOutExpo",
            duration: 1000,
            autoplay: false,
            delay: function(){
              return delayLetter = delayLetter+200;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();
			});

			$('.type-gallery-img').once('slogan').each(function(){
				var $this = $(this);
        var delayLetter = 100;
        var animates = [];
        var i = 0;
        $this.find('.field, .logo-letter-circle, .field-block-img-multi__item').each(function(){
          if($(this).hasClass('field-block-img-multi')){
            return;
          }
          animates[i] = anime({
            targets: $(this)[0],
            opacity: [0,1],
            scale: [0, 1],
            easing: "easeOutExpo",
            duration: 750,
            delay: function(){
              return delayLetter = delayLetter+100;
            }
          });
          i++;
        });
				$this.on('scrollSpy:enter', function(e) {
					if(!$this.hasClass('is-ready')){
						$this.addClass('is-ready');
            $(animates).each(function (i, el){
              el.play();
            });
					}
				});
				$this.scrollSpy();
			});

			$('.landing-page-menu ul').once('onepagenav').each(function(){
				var $this = $(this);
				$this.onePageNav({
					currentClass: 'current',
					changeHash: true,
					scrollSpeed: 750,
					scrollOffset: 100,
					scrollThreshold: 0.5,
					filter: '',
					easing: 'swing',
					begin: function() {
						// I get fired when the animation is starting
						if($(window).width() < 1200){
							$('.landing-page-menu-btn').trigger('click');
						}
					},
					end: function() {
						//I get fired when the animation is ending
					},
					scrollChange: function($currentListItem) {
						//I get fired when you enter a section and I pass the list item of the section
					}
				});
			});

      /*
       Добавляем перемещение элементов при изменении устройства
        */
      $(window).resize(function(){
        var windowWidth = $(window).width();
        if(windowWidth < 1200){
          if(!$('.landing-page-fixed .header-soc-net').length){
            $('.landing-page-fixed').prepend( $('.header-soc-net') );
          }
          if(!$('.site-header-lp__container > .language-switcher').length){
            $('.site-header-lp__container').append( $('.language-switcher') );
          }
        } else {
          if(!$('.site-header-lp__container > .header-soc-net').length){
            $('.site-header-lp__container').prepend( $('.header-soc-net') );
          }
          if(!$('.landing-page-fixed .language-switcher').length){
            $('.landing-page-fixed').append( $('.language-switcher') );
          }
        }
      });

		}
	}

})(jQuery, Drupal);