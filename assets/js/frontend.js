'use strict';

(function($) {
  var wpcsa_timer = 0;

  $(document).on('keyup', '#wpcsa_search_input', function() {
    if ($('#wpcsa_search_input').val() != '') {
      if (wpcsa_timer != null) {
        clearTimeout(wpcsa_timer);
      }

      wpcsa_timer = setTimeout(wpcsa_search, 300);
      return false;
    }
  });

  $(document).
      on('click touch', '.wpcsa-choose, .wpcsa-search-close', function(e) {
        $('.wpcsa-search-wrap').toggleClass('wpcsa-search-wrap-show');
        e.preventDefault();
      });

  $(document).on('click touch', '.wpcsa-login', function(e) {
    e.preventDefault();
    var $this = $(this);
    var uid = $this.attr('data-id');

    $('.wpcsa-search-result .item-login').addClass('disabled');
    $this.html('...');

    var data = {
      action: 'wpcsa_login',
      uid: uid,
      nonce: wpcsa_vars.nonce,
    };

    $.post(wpcsa_vars.ajax_url, data, function(response) {
      location.reload();
    });
  });

  $(document).on('click touch', '.wpcsa-back', function(e) {
    e.preventDefault();
    var $this = $(this);
    var uid = $this.attr('data-id');
    var key = $this.attr('data-key');

    var data = {
      action: 'wpcsa_back',
      uid: uid,
      key: key,
      nonce: wpcsa_vars.nonce,
    };

    $.post(wpcsa_vars.ajax_url, data, function(response) {
      location.reload();
    });
  });

  function wpcsa_search() {
    $('.wpcsa-search-result').html('Searching...').addClass('wpcsa-loading');
    wpcsa_timer = null;

    var data = {
      action: 'wpcsa_search',
      keyword: $('#wpcsa_search_input').val(),
      nonce: wpcsa_vars.nonce,
    };

    $.post(wpcsa_vars.ajax_url, data, function(response) {
      $('.wpcsa-search-result').
          html(response).
          removeClass('wpcsa-loading');
    });
  }
})(jQuery);