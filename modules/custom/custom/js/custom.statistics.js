(function ($, Drupal) {

  window.custom_analytics_change_view_mode = function(item){
    Drupal.ajax({
      url: '/custom_api/custom_analytics_change_view_mode',
      submit: {
        'analytics_view_mode': $(item).val(),
        'uid': $(item).attr('data-hash'),
      },
      progress: { type: 'fullscreen' },
    }).execute().done(function(){
      $.cookie('analytics_view_mode', $(item).val(), { expires : 365, path: '/' });
    });
  }

  function renderSaveLink(item) {
    if (!$(item).closest('td').find('.js-custom-analytics-button-outer-wrapper').length) {
      var $currentItem = $(item);
      var $dismiss =  $('<div class="js-custom-analytics-cancel">' + Drupal.t('Cancel') + '</div>');
      var $button = $('<div class="js-custom-analytics-save">' + Drupal.t('Save') + '</div>');
      var $wrapper = $('<div class="js-custom-analytics-button-wrapper"></div>');
      $wrapper.append($button);
      $wrapper.append($dismiss);
      var $outerWrapper = $('<div class="js-custom-analytics-button-outer-wrapper is-visible"></div>');
      $outerWrapper.append($wrapper)
      $currentItem.closest('td').append($outerWrapper);
      $outerWrapper.on('click', '.js-custom-analytics-save', function(){
        submitData($currentItem.get(0));
        $currentItem.removeClass('is-changed');
        $currentItem.removeClass('is-lost-focus');
      });
      $outerWrapper.on('click', '.js-custom-analytics-cancel', function(){
        $currentItem.removeClass('is-changed');
        $currentItem.removeClass('is-lost-focus');
        var $row = $(this).closest('td');
        $row.find('input[data-name="idea"]').val($row.find('input[data-name="idea"]').attr('data-value'));
        $row.find('input[data-name="presentation"]').val($row.find('input[data-name="presentation"]').attr('data-value'));
        $outerWrapper.remove();
      });
    }
  }

  function recalRow(item) {
    var $row = $(item).closest('tr');
    var idea = parseInt($row.find('input[data-name="idea"]').val());
    if ($row.find('input[data-name="idea"]').closest('td').find('.js-custom-analytics-button-outer-wrapper').length) {
      idea = parseInt($row.find('input[data-name="idea"]').attr('data-value'));
    }

    var presentation = parseInt($row.find('input[data-name="presentation"]').val());
    if ($row.find('input[data-name="presentation"]').closest('td').find('.js-custom-analytics-button-outer-wrapper').length) {
      presentation = parseInt($row.find('input[data-name="presentation"]').attr('data-value'));
    }

    var users = $row.find('.td_users').text();

    var oldIdea = $row.find('input[data-name="idea"]').attr('data-value');
    var oldPresentation = $row.find('input[data-name="presentation"]').attr('data-value');

    $row.find('input[data-name="idea"]').attr('data-value', idea);
    $row.find('input[data-name="presentation"]').attr('data-value', presentation);

    var ideaDiff = idea - oldIdea;
    var presentationDiff = presentation - oldPresentation;

    var totalIdea = parseInt($(item).closest('table').find('.total-row .td_idea').text()) + ideaDiff;
    var totalPresentation = parseInt($(item).closest('table').find('.total-row .td_presentation').text()) + presentationDiff;
    $(item).closest('table').find('.total-row .td_idea').text(totalIdea);
    $(item).closest('table').find('.total-row .td_presentation').text(totalPresentation);
    var totalUsers = parseInt($(item).closest('table').find('.total-row .td_users').text())

    var total_idea_presentation_ratio = totalIdea > 0 ? Math.round(totalPresentation / totalIdea * 100) + '%' : 0;
    var total_presentation_users_ratio = totalPresentation > 0 ? Math.round(totalUsers / totalPresentation * 100) + '%' : 0;
    $(item).closest('table').find('.total-row .td_idea_presentation_ratio').text(total_idea_presentation_ratio);
    $(item).closest('table').find('.total-row .td_presentation_users_ratio').text(total_presentation_users_ratio);

    var idea_presentation_ratio = idea > 0 ? Math.round(presentation / idea * 100) + '%' : 0;
    var presentation_users_ratio = presentation > 0 ? Math.round(users / presentation * 100) + '%' : 0;
    $row.find('.td_idea_presentation_ratio').text(idea_presentation_ratio);
    $row.find('.td_presentation_users_ratio').text(presentation_users_ratio);

  }

  function submitData(item) {
    var $this = $(item);
    var $fields = $this.closest('td').find('.js-analytics-field');
    var sendData = {
      'analytics': {},
    };
    $fields.each(function(i){
      var value = parseInt($(this).val());
      if (!value) {
        value = 0;
      }
      $(this).val(value);
      var name = $(this).attr('data-name');
      var time = $(this).attr('data-time');
      sendData.analytics[i] = {
        'value': value,
        'name': name,
        'time': time,
      }
    });

    if (sendData.analytics) {
      Drupal.ajax({
        url: '/custom_api/custom_analytics_change',
        submit: sendData,
        progress: { type: 'none' },
      }).execute().done(function(response){
        $this.closest('td').find('.js-custom-analytics-button-outer-wrapper').remove();
        for (item in response) {
          if (response[item].method === "NotyGenerate" && response[item].args[0] === 'error') {
            var $input = $this.closest('td').find('input')
            $input.val($input.attr('data-value'));
            return;
          }
          if (response[item].command === "data" && response[item].name === 'plan') {
            if (response[item].value === true) {
              $this.closest('tr').addClass('is-plan');
            }
            else {
              $this.closest('tr').removeClass('is-plan');
            }
          }
        }
        recalRow($this);
      });
    }
  }

  Drupal.behaviors.custom_statistics = {
    attach: function (context, settings) {
      $('.js-analytics-field').once('custom_statistics').each(function(){
        $(this).on('input', function(){
          var value = $(this).val();
          var defaultValue = $(this).attr('data-value');
          if (defaultValue !== value) {
            $(this).addClass('is-changed');
            renderSaveLink($(this));
          }
        });
        $(this).on('blur', function(){
          // $(this).closest('td').find('.js-custom-analytics-button-outer-wrapper').removeClass('is-visible');
          if ($(this).hasClass('is-changed')) {
            $(this).addClass('is-lost-focus');
          }
        });
        $(this).on('focus', function(){
          $(this).closest('table').find('.js-custom-analytics-button-outer-wrapper').removeClass('is-visible');
          $(this).closest('td').find('.js-custom-analytics-button-outer-wrapper').addClass('is-visible');
          $(this).removeClass('is-lost-focus');
        });
      });
    }
  }
})(jQuery, Drupal);
