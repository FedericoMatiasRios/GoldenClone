
(function($, Drupal, drupalSettings) {

  'use strict';

  Drupal.AjaxCommands.prototype.magnificPopup = function(ajax, response, status) {
    var options = {
      items: {
        src: response.html,
        type: 'inline'
      },
      mainClass: 'mfp-zoom-in',
      removalDelay: 400,
      fixedContentPos: true,
      fixedBgPos: ('ontouchstart' in window) ? false : true,
      autoFocusLast: false,
    }

    // Add custom options added on server side.
    for (var option in response.options) {
      options[option] = response.options[option]
    }

    $.magnificPopup.open(options);
    Drupal.attachBehaviors();
  };


  var mfpOpen = $.magnificPopup.instance.open;
  var mfp_checkIfClose = $.magnificPopup.instance._checkIfClose;

  $.magnificPopup.instance.open = function (data) {
    mfpOpen.apply(this, arguments);

    var mfp = $.magnificPopup.instance;
    if(mfp.bgOverlay) {
      mfp.wrap.on('mousedown.mfp', function(e) {
        if(mfp._checkIfClose(e.target, true)) {
          mfp.close();
        }
      });
    }
  }

  $.magnificPopup.instance._checkIfClose = function(target, isRun) {
    var mfp = $.magnificPopup.instance;
    if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
      return true;
    }
    if(isRun) {
      return mfp_checkIfClose.apply(this, arguments);
    }
  }

  function ajaxForms(element, form_id) {
    var langPath = drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix;

    // get entity id if we need node comment form
    var currentPath = drupalSettings.path.currentPath.split('/');
    var entity_id_attribute = element.getAttribute('entity_id');
    var entity_id = '';

    if (entity_id_attribute) {
      entity_id = '/' + entity_id_attribute;
    } else if (currentPath[0] === 'node') {
      entity_id = '/' + currentPath[1];
    }

    Drupal.ajax({
      url: langPath + 'api/ajax_forms/link/' + form_id + entity_id,
      element: element,
      progress: { type: 'fullscreen' }
    }).execute();
  }

  $.magnificPopup.instance._onFocusIn = function(e) {
    // Do nothing if target element is select2 input
    if( $(e.target).hasClass('select2-search__field') ) {
      return true;
    }
    // Else call parent method
    $.magnificPopup.proto._onFocusIn.call(this,e);
  };

  $(document).ready(function(){
    if (typeof drupalSettings.ajax_forms !== 'undefined') {
      for (var selector in drupalSettings.ajax_forms.links) {
        (function(form_id, selector){
          $('body').off('click.ajax_forms', selector).on('click.ajax_forms', selector, function(e){
            e.preventDefault();
            ajaxForms(this, form_id);
          });
        })(drupalSettings.ajax_forms.links[selector], selector);
      }
    }
  });

})(jQuery, Drupal, drupalSettings);
