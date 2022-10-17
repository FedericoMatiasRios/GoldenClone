(function ($) {
	
	// Блокування декількох кліків, при розкоментуванні потрібно додати перевірку лише на потрібні дії (Класи кнопок)
	if(Drupal.Ajax){
		var oldSuccess = Drupal.Ajax.prototype.success;
		Drupal.Ajax.prototype.success = function (response, status) {
			oldSuccess.call(this, response, status);
			if (this.element && !jQuery(this.element).hasClass('not_rem')) {
				this.element.classList.remove('sended-ajax');
			}
		}
	}

	$(document).ready(function () {

		if(drupalSettings.refHash){
			$.cookie('custom_ref', drupalSettings.refHash, {
				path: '/',
				expires: 365,
				// domain: '.'+location.hostname
				domain: location.hostname
			});
		}
		var custom_ref = $.cookie('custom_ref');
		if(custom_ref){
			if($('#field_user_sponsor_code_ajax_wrapper input').length){
				if(!$('#field_user_sponsor_code_ajax_wrapper input').val()){
					$('#field_user_sponsor_code_ajax_wrapper input').val(custom_ref);

					//--Заборона змінювати спонсора при переході за реф посиланням (Ще частинка в userRegister.php)
					// $('#field_user_sponsor_code_ajax_wrapper input').attr('readonly', 'readonly');
					// $('input[name="block_sponsor_code"]').val(1);
					//---
				}
				$('#field_user_sponsor_code_ajax_wrapper input').change();
			}
		}
		
	});

})(jQuery);