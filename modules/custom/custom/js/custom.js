(function ($) {
	// Блокування декількох кліків, при розкоментуванні потрібно додати перевірку лише на потрібні дії (Класи кнопок)
	if(Drupal.Ajax){
		Drupal.Ajax.prototype.eventResponseOrig = Drupal.Ajax.prototype.eventResponse;
		Drupal.Ajax.prototype.eventResponse = function(element, event){
			if ( jQuery(element).hasClass('submitted-send') ){
				event.preventDefault();
				event.stopPropagation();

				if ( !jQuery(element).hasClass('ipn-link') && !jQuery(element).parents('.resended').length ){
					return false;
				}

			}
			jQuery(element).addClass('submitted-send')
			Drupal.Ajax.prototype.eventResponseOrig.call(this, element, event);
		};
	}

	Drupal.behaviors.custom = {
		attach: function (context, settings){
			$('.views-basket--page-2 input.datepicker:not(.datepicer-processed), #operations_search_form_wrapper input.datepicker:not(.datepicer-processed), #admin_operations_search_form_wrapper input.datepicker:not(.datepicer-processed), #admin_operations_reports_form_wrapper input.datepicker:not(.datepicer-processed), #admin_matrices_settings_form_wrapper input.datepicker:not(.datepicer-processed), #support_language_statistic_search_form_wrapper input.datepicker:not(.datepicer-processed), #export_users_search_form_wrapper input.datepicker:not(.datepicer-processed)').each(function(){
				$(this).addClass('datepicer-processed').datepicker({
					dateFormat: "dd-mm-yy",
				});
			});

			$('.view-id-user_admin_people.view-display-id-page_1 input[name="created_from"]:not(.datepicer-processed), .view-id-user_admin_people.view-display-id-page_1 input[name="created_to"]:not(.datepicer-processed), input.datepicker_input:not(.datepicer-processed)').each(function(){
				var f = $(this).data('date_format');
				var options = {}
				options.dateFormat = f ? f : 'dd-mm-yy';
				if($(this).data('yearrange'))   options.yearRange   = $(this).data('yearrange');
				if($(this).data('maxdate'))     options.maxDate     = $(this).data('maxdate');
				if($(this).data('changeyear'))  options.changeYear  = !!$(this).data('changeyear');
				if($(this).data('changemonth')) options.changeMonth = !!$(this).data('changemonth');
				$(this).addClass('datepicer-processed').datepicker(options);
			});


			// $('#basket_node_basket_order_form_ajax_wrap .form-actions .form__submit').click(function(){
			// 	console.log(1);
			// 	$(this).attr('disable', 'disable');
			// });
			
			// if($('#user_diplomas_form_wrapper .form-managed-file').lehgth){
			// 	if(!$('#user_diplomas_form_wrapper .form-managed-file').hasClass('custom_processed')){
			// 		$('#user_diplomas_form_wrapper .form-managed-file')
			// 		$('#user_diplomas_form_wrapper .form-managed-file')
			// 	}
			// }

			$('.image_select:not(.image_select-processed)').each(function(){
			// $('.image_select').once('image_select').each(function() {
				var obj = $(this);

				// console.log( typeof obj.select2 );

				if(typeof obj.select2 === 'function'){
					obj.addClass('image_select-processed');
					obj.select2({
						minimumResultsForSearch: -1,
						templateSelection: function(data) {
							var image = $(data.element).data('image');
							if(image) {
								return '<span class="select-image"><img src="'+image+'" alt="" width="20px"></span>' + data.text;
							}
							return data.text;
						},
						templateResult : function(data) {
							var image = $(data.element).data('image');
							if(image) {
								return '<span class="select-image"><img src="'+image+'" alt="" width="20px"></span>' + data.text;
							}
							return data.text;
						},
						escapeMarkup: function(m) {
							return m;
						}
					});
				}
			});

			// $('#change_country_phone_form_wrapper:not(.popup-processed)').each(function(){
			// 	$(this).addClass('popup-processed');
			// 	var $this = $(this);
			// 	if(!$this.parents('.magnific-popup').length){
			// 		$this.wrap('<div class="magnific-popup mfp-with-anim change_country_phone_popup_wrapper popup_size_middle"><div class="magnific-popup__content"></div></div>');
			// 		$.magnificPopup.open({
			// 			items: {
			// 				src:  $this.parents('.magnific-popup'),
			// 				type: 'inline'
			// 			},
			// 			closeOnBgClick: false,
			// 			removalDelay: 400,
			// 			mainClass: 'mfp-zoom-in',
			// 			autoFocusLast: false,
			// 			fixedContentPos: true,
			// 			callbacks: {
			// 				// afterClose: function() {
			// 				// 	$this.closest('.magnific-popup').remove();
			// 				// }
			// 			}
			// 		});
			// 		$('.mfp-close').hide();
			//
			// 		setTimeout(function(){
			// 			Drupal.attachBehaviors();
			// 		}, 500);
			// 		Drupal.attachBehaviors();
			//
			// 	}
			// });

			$('#questionnaire_form_wrapper.lick_click_submit .question_wrapper a:not(.target-processed)').click(function(){
				$(this).addClass('target-processed');
				$(this).parents('form:first').find('.form-actions .form-submit').click();
			});

			$('.custom_user_once_popup.link_click_submit .user-once-popup a:not(.target-processed)').click(function(){
				$(this).addClass('target-processed');
				$(this).parents('.custom_user_once_popup:first').find('.user-once-popup-btn:first').click();
			});

			$('.partners_info_rank_popup_form_popup_wrapper .mfp-close:not(.target-processed)').click(function(){
				window.setCookie('infoRankPopup', 1, 1);
			});

			$('.open_questionnaire_fix_popup_wrapper .mfp-close:not(.target-processed)').click(function(){
				window.setCookie('showQuestionnaireFixPopup', 1, 1);
			});

			$('.black_label_popup .ui-dialog-titlebar-close .ui-icon-closethick:not(.target-processed)').click(function(){
				if($('.black_label_popup .reload').length){
					location.reload();
				}
			});
			
			$('.user_questionnaire_popup_wrapper .mfp-close:not(.target-processed)').click(function(){
				var t = $('.user_questionnaire_block_wrapper').data('tid');
				var d = parseInt($('.user_questionnaire_block_wrapper').data('closeday'));
				if(isNaN(d)) d = 0;
				if(t && d){
					window.setCookie('questionnaireCockie'+t, 1, d);
				}
			});

			$('.show_hidden_button:not(.time-processed)').addClass('time-processed').each(function(){
				var b = $(this);
				var s = parseInt(b.data('time'));
				if(isNaN(s)) s = 0;
				setTimeout(function(){
					// b.show();
					b.removeClass('is-hidden');
				}, (s * 1000));
			});

		}
	}


	$(document).ready(function () {

		// var questionnaireCockie = (typeof window.getCookie === 'function') ? window.getCookie('questionnaireCockie') : 0;
		// questionnaireCockie = parseInt(questionnaireCockie);
		// if(isNaN(questionnaireCockie)) questionnaireCockie = 0;


		// setTimeout(function () {
		// 	if(!$('body').hasClass('blocked_popup')){
		// 		if($('.user_questionnaire_block_wrapper').length && questionnaireCockie != $('.user_questionnaire_block_wrapper').data('tid')){

		// 			var $this = $('.user_questionnaire_block_wrapper');
		// 			if(!$this.parents('.magnific-popup').length){
		// 				$this.wrap('<div class="magnific-popup mfp-with-anim magnific-cap-questionnaire popup_size_middle"><div class="magnific-popup__content"></div></div>');
		// 				$.magnificPopup.open({
		// 					items: {
		// 						src:  $this.parents('.magnific-popup'),
		// 						type: 'inline'
		// 					},

		// 					// closeOnBgClick: false,
		// 					// closeOnBgClick: true,
		// 					closeOnBgClick: (drupalSettings.questionnaire_close ? true : false),

		// 					removalDelay: 400,
		// 					mainClass: 'mfp-zoom-in',
		// 					autoFocusLast: false,
		// 					fixedContentPos: true,
		// 					callbacks: {
		// 						afterClose: function() {
		// 							if(drupalSettings.questionnaire_close){
		// 								var t = $('.user_questionnaire_block_wrapper').data('tid');
		// 								if(t != 382 && t != 411 && t != 412 && t != 415){
		// 									window.setCookie('questionnaireCockie', $('.user_questionnaire_block_wrapper').data('tid'), 5);
		// 								}
		// 							}
		// 							$this.closest('.magnific-popup').remove();
		// 						}
		// 					}
		// 				});
		// 				if(!drupalSettings.questionnaire_close){
		// 					$('.mfp-close').hide();
		// 				}

		// 			}
		// 		}
		// 	}
		// }, 1000);

		if($('body').hasClass('page-node-commercial-landing')){
			if(window.location.search && !$.cookie('landingQuery')){
				$.cookie('landingQuery', window.location.search, {
					path: '/',
					expires: 1,
					domain: '.goldenway.world'
				});
			}
		}else{
			var landingQuery = $.cookie('landingQuery');
			if(landingQuery){
				$.cookie('landingQuery', '', {
					path: '/',
					expires: 0,
					domain: '.goldenway.world'
				});
				window.location.href = window.location.origin+window.location.pathname+landingQuery;
			}
		}
		
	});

	$(document).on('click', '.custom-copy-input-btn', function(e){
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

	$.fn.questionnaireConplit = function(questionnaire){
		console.log('Якщо не зявится, можна видалити функцію!!!');//Де зняйшли видалили.
		// if(typeof $.magnificPopup !== 'undefined'){
		// 	$.magnificPopup.close();
		// }

		// $.cookie('questionnaireCockie', questionnaire, {
		// 	path: '/',
		// 	expires: 30,
		// 	domain: '.'+location.hostname
		// });

		// var newsCockie = window.getCookie('newsCockie');

		// var time = Math.floor((new Date().getTime()) / 1000);
		// if($('.views-block-news-block-1 .views-news').length && $('.views-block-news-block-1 .views-news').data('lastupdate')){
		// 	var viewTime = parseInt($('.views-block-news-block-1 .views-news').data('lastupdate'));
		// 	if(isNaN(viewTime)) viewTime = 0;
		// 	if(newsCockie && viewTime > newsCockie){
		// 		newsCockie = '';
		// 	}
		// }

		// setTimeout(function () {
		// 	if(newsCockie == '' && $('.views-block-news-block-1').length){
		// 		newsCockie = time;
		// 		var $this = $('.views-block-news-block-1');
		// 		if(!$this.parents('.magnific-popup').length){
		// 			$this.wrap('<div class="magnific-popup mfp-with-anim magnific-cap-news popup_size_full"><div class="magnific-popup__content"></div></div>');
		// 			$.magnificPopup.open({
		// 				items: {
		// 					src:  $this.parents('.magnific-popup'),
		// 					type: 'inline'
		// 				},
		// 				removalDelay: 400,
		// 				mainClass: 'mfp-zoom-in',
		// 				autoFocusLast: false,
		// 				fixedContentPos: true,
		// 				callbacks: {
		// 					afterClose: function() {
		// 						$this.closest('.magnific-popup').remove();
		// 					}
		// 				}
		// 			});
		// 			window.setCookie('newsCockie', time, 1);
		// 		}
		// 	}
		// }, 1000);

	};



	
	window.custom_ajax_link = function(obj, ajax_url){
		// if($(obj).hasClass('sended-ajax')){
		// 	return;
		// }
		// $(obj).addClass('sended-ajax');

		if(obj.tagName == 'SELECT'){
			ajax_url += '&val='+obj.value;
		}
		if(obj.tagName == 'INPUT'){
			if(obj.type == 'checkbox'){
				ajax_url += '&val='+($(obj).is(':checked') ? 1 : 0);
			}
		}

		if($(obj).hasClass('profile_calendars_done')){
			ajax_url += '&period='+$('.profile_calendars_wrapper input[name="calendar_from"]').val()+'-'+$('.profile_calendars_wrapper input[name="calendar_to"]').val();
		}
		
		var element = obj;
		if($(obj).hasClass('ico-bell')){
			element = false;
		}

		if(!$(obj).hasClass('ajax_process')){
			Drupal.ajax({
				url: ajax_url,
				submit: {'ajax': 1},
				element: element,
				progress: {type: 'throbber'}
			}).execute();
			$(obj).addClass('ajax_process');
		}

		var t = $(obj).hasClass('no_timeout') ? 100 : 2000;
		setTimeout(function(){ 
			$(obj).removeClass('ajax_process');
		}, t);
	}

	window.custom_add_certificate_ajax_link = function(obj, ajax_url){
		if($(obj).hasClass('sended-ajax')){
			return;
		}
		$(obj).addClass('sended-ajax');
		
		var submit = {'ajax': 1};
		if($(obj).data('post')){
			submit = $(obj).data('post');
		}

		if($(obj).hasClass('custom_has_count')){
			var count = parseInt($(obj).parents('.basket_add_button_wrap:first').find('.count_input').val());
			if(isNaN(count) || count < 1) count = 1;
			submit.count = count;
		}

		if($(obj).hasClass('accessories_bay')){
			var f = $(obj).parents('form:first');
			var count = parseInt(f.find('input.count_input').val());
			if(isNaN(count)) count = 1;
			ajax_url += '&count='+count;
			f.find('.form__item input, .form__item select').each(function(){
				if($(this).attr('name')){
					ajax_url += '&'+$(this).attr('name')+'='+$(this).val();
				}
			});
		}else if($(obj).hasClass('calculator_buy')){
			var sum = parseInt($(obj).parents('.balance-calculator-row--form:first').find('input[name="sum"]').val());
			var period = parseInt($(obj).parents('.balance-calculator-row--form:first').find('select[name="period"]').val());
			if(isNaN(sum)) sum = 0;
			if(isNaN(period)) period = 0;
			ajax_url += '&sum='+sum+'&period='+period;
		}else{
			var sum = parseInt($(obj).parents('.node:first').find('input[name="params[sum]"]').val());
			var period = parseInt($(obj).parents('.node:first').find('select[name="params[period]"]').val());
			if(isNaN(sum)) sum = 0;
			if(isNaN(period)) period = 0;
			ajax_url += '&sum='+sum+'&period='+period;
		}
		Drupal.ajax({
			url: ajax_url,
			submit: submit,
			element: obj,
			progress: {type: 'throbber'}
		}).execute();
	}

	window.customDiplomasPhotoSelect = function(obj, type){
		if(type == 'change'){
			$('#user_diplomas_form_wrapper .refresh_button').click();
		}else{
			$('#user_diplomas_form_wrapper input[name="files[photo]"]').click();
		}
	}

	window.popup_form_change_payment = function(obj, type){
		var w = $(obj).parents('.select_payment_wrapper');
		w.find('.order-payment-popup-row').removeClass('active');
		$(obj).addClass('active');
		w.find('select[name="select_payment"]').val(type).change();
	}

	window.cliarHeirRow = function(obj){
		var w = $(obj).parents('.double-field-elements');
		w.find('input').val('');
	}

	$.fn.customMagnificPopup = function(type){
		if(typeof $.magnificPopup !== 'undefined'){
			$.magnificPopup.close();
		}
	}

})(jQuery);