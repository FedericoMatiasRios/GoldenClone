(function ($) {
	Drupal.behaviors.drupal_noty_messages = {
		attach: function (context, settings){
			if (drupalSettings.drupal_noty_messages){
				if (drupalSettings.drupal_noty_messages.items && drupalSettings.drupal_noty_messages.items.length){
					for (i in drupalSettings.drupal_noty_messages.items) {
						if(typeof drupalSettings.drupal_noty_messages.items[i].content != '') {
							$(this).NotyGenerate(drupalSettings.drupal_noty_messages.items[i].type, drupalSettings.drupal_noty_messages.items[i].content);
						}
					}
					delete drupalSettings.drupal_noty_messages.items;
				}
			}
		},
		detach: function (context, settings){
			if (drupalSettings.drupal_noty_messages){
				if (drupalSettings.drupal_noty_messages.items && drupalSettings.drupal_noty_messages.items.length){
					for (i in drupalSettings.drupal_noty_messages.items) {
						if(typeof drupalSettings.drupal_noty_messages.items[i].content != '') {
							$(this).NotyGenerate(drupalSettings.drupal_noty_messages.items[i].type, drupalSettings.drupal_noty_messages.items[i].content);
						}
					}
					delete drupalSettings.drupal_noty_messages.items;
				}
			}
		}
	}
	$.fn.NotyGenerate = function(type, text){
	    var n = noty({
			text        : text,
			type        : type,
			dismissQueue: true,
			template	: '<div class="noty_message"><div class="noty_text"></div><div class="noty_close"></div></div>',
			layout      : drupalSettings.drupal_noty_messages.settings.position,
			closeWith   : ['button', 'click'],
			theme       : 'relax',
			killer : false,
			timeout: drupalSettings.drupal_noty_messages.settings[type],
			maxVisible  : 15,
			animation   : {
				open  : drupalSettings.drupal_noty_messages.settings.open,
				close : drupalSettings.drupal_noty_messages.settings.close,
				easing: 'swing',
				speed : 500
			}
		});
		if(drupalSettings.drupal_noty_messages.settings.close_all == 1){
			n.$bar.click(function(){
				$.noty.closeAll();
			});
		}
	};
})(jQuery);