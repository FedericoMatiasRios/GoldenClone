(function ($) {
	Drupal.behaviors.balance = {
		attach: function (context, settings){
			
		}
	}

	window.BalanceChangeCalculator = function(obj, ajax_url){
		if($(obj).hasClass('sended-ajax')){
			return;
		}
		$(obj).addClass('sended-ajax');

		var w = $(obj).parents('.balance_calculator_wrapper:first');
		ajax_url += '?period='+w.find('select[name="period"]').val()+'&sum='+w.find('input[name="sum"]').val();
		Drupal.ajax({
			url: ajax_url,
			submit: {'ajax': 1},
			element: obj,
			progress: {type: 'throbber'}
		}).execute();
	}

	window.BalanceAjaxLink = function(obj, ajax_url){
		if($(obj).hasClass('sended-ajax')){
			return;
		}
		$(obj).addClass('sended-ajax');
		console.log(1);
		Drupal.ajax({
			url: ajax_url,
			submit: {'ajax': 1},
			element: obj,
			progress: {type: 'throbber'}
		}).execute();
	}

	window.BalanceClosePopup = function(obj){
		$('.mfp-close').click();
	}

	window.BalanceExchangeSum = function(obj, Percent = 0){
		var sum = parseInt($(obj).val());
		if(isNaN(sum)) sum = 0;
		var total = sum;
		if(Percent){
			total -= sum * Percent / 100;
		}
		$(obj).val(sum ? sum : '');
		$(obj).parents('.form__item:first').find('.form__description span').text('€ '+total.toFixed(2));
	}


	// window.BalanceWithdrawSum = function(obj, Percent = 0){
	// 	var sum = parseInt($(obj).val());
	// 	if(isNaN(sum)) sum = 0;
	// 	var total = sum;
	// 	if(Percent){
	// 		total -= sum * Percent / 100;
	// 	}
	// 	$(obj).val(sum ? sum : '');
	// 	if(sum){
	// 		$(obj).parents('.form__item:first').find('.form__description .received').show();
	// 	}else{
	// 		$(obj).parents('.form__item:first').find('.form__description .received').hide();
	// 	}
	// 	$(obj).parents('.form__item:first').find('.form__description .received span').text(total.toFixed(2));
	// }

})(jQuery);