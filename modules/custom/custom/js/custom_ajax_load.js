(function ($) {

	$(document).ready(function () {

		if(drupalSettings.frontStatisticPath){
			// var r = false;
			// if($('.user-profile__info').length) r = true;
			// if($('.user-header-operations__item .dropdown-list__first').length) r = true;
			// if(r){
				Drupal.ajax({
					url: drupalSettings.frontStatisticPath,
					submit: {'ajax': 1},
					element: $('body')[0],
					progress: {type: 'throbber'}
				}).execute();
			// }
		}

	});

	$.fn.frontStatisticCalendar = function(html){
		var $this = $('.user-profile__info-filter-item-custom .user-profile__info-filter-btn');
		if(typeof $.fn.tooltipster !== 'undefined'){
			$('.user-profile__info .user-profile__info-filter-btn').removeClass('is-active');
			var tab = $('.user-profile__info .user-profile__info-filter-item-custom .user-profile__info-filter-btn');
			tab.addClass('is-active');
			if(!$this.hasClass('tooltipstered')){
				$this.tooltipster({
					content: html,
					contentAsHTML: true,
					theme: 'tooltipster-shadow',
					// animation: 'grow',
					// maxWidth: 600,
					trigger: 'custom',
					// minWidth: 100,
					interactive: true,
					delay: [0, 10000000],
					zIndex: 550,
          arrow: false,
					functionReady: function(origin, tooltip) {
						$(tooltip.tooltip).addClass('profile_calendars_tooltip');
					},
					// hideOnClick: true,
					// touchDevices: false,
				}).on('click', function(e){
					// if($('.tooltipster-show').length){
					// 	$this.tooltipster('hide');
					// } else {
						// $this.tooltipster('open');
					// }
				});
			}
			$this.tooltipster('open');
			$('.profile_calendars_wrapper .calendar_wrapper:not(.datepicer-processed)').addClass('datepicer-processed').each(function(){
				var w = $(this);
				var defaultDate = tab.data(w.attr('id'));
				if(!defaultDate) defaultDate = 'now';
				else{
					w.parents('.profile_calendars_wrapper:first').find('input[name="'+w.attr('id')+'"]').val(defaultDate);
				}
				w.datepicker({
					dateFormat: "dd.mm.yy",
					defaultDate: defaultDate,
					changeYear: 1,
					changeMonth: 1,
					onSelect: function(date) {
						tab.data(w.attr('id'), date);
						w.parents('.profile_calendars_wrapper:first').find('input[name="'+w.attr('id')+'"]').val(date);
					},
				});
			});
			$this.tooltipster('reposition');
		}
	}
	$.fn.frontStatisticInfo = function(data){
		
		if($('.user-profile__info-filter-item-custom .user-profile__info-filter-btn').hasClass('tooltipstered')){
			$('.user-profile__info-filter-item-custom .user-profile__info-filter-btn').tooltipster('hide');
		}

		for(var key in data){
			if(key != 'keyButton'){
				$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-element').css('width', data[key]['circle']+'%');
				$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-num').text(data[key]['num-first']);
				$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__num-second').text(data[key]['num-second']);
				$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-growth').text(data[key]['growth']);
				if(data[key]['growth']){
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-growth').show();
				}else{
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-growth').hide();
				}
				if(data[key]['red']){
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-growth').addClass('user-profile-info__progress-growth--invert');
				}else{
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__progress-growth').removeClass('user-profile-info__progress-growth--invert');
				}

				if(data[key]['growth-second']){
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__num-second-growth').text(data[key]['growth-second']);
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__num-second-growth').show();
				}else{
					$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__num-second-growth').hide();
				}
				
				// for(var k in data[key]){
				// 	if(k == 'circle'){
				// 		$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__'+k).data('fill', data[key][k]);
				// 	}else{
				// 		$('.user-profile__info .user-profile-info--'+key+' .user-profile-info__'+k).text(data[key][k]);
				// 	}
				// }
			}
		}

		// circle: 50
		// growth: ""
		// "num-first": "€ 2315188.09"
		// "num-second": "€ 164895489.2"

		// $('.user-profile-info__circle:not(.circle-processed)').each(function(){
		// 	$(this).addClass('circle-processed');
		// 	var $this = $(this);
		// 	$this.circleProgress({
		// 		startAngle: -Math.PI / 4 * 2,
		// 		value: $this.data('fill'),
		// 		animation: {
		// 			duration: 1500,
		// 		},
		// 		size: 98,
		// 		thickness: 5,
		// 		fill: {gradient: ['#9C761F', '#D0B56D', '#EAD797', '#D0B56D', '#DC9D54']},
		// 		emptyFill: 'transparent',
		// 		duration: 2000,
		// 	});
		// });
	}

	window.customOrderAssetsPopupChangeCalculator = function(obj, ajax_url){
		Drupal.ajax({
			url: ajax_url+'?sum='+obj.value,
			submit: {'ajax': 1},
			element: obj,
			progress: {type: 'throbber'}
		}).execute();
	}
	window.customOrderAssetsPopupBayCalculator = function(obj, ajax_url){
		Drupal.ajax({
			url: ajax_url,
			submit: {'ajax': 1},
			element: obj,
			progress: {type: 'throbber'}
		}).execute();
	}

})(jQuery);