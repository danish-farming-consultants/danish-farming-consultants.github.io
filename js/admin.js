$(function () {

  function initDatepickers() {
    $('.datepicker').datepicker({
      format: "yyyy-mm-dd",
      todayBtn: "linked",
      language: "pl",
      autoclose: true,
      todayHighlight: true
    });

    $('#createDatepicker').datepicker('update', new Date());
  }

  function initNewsSaveButtons() {
    $('.btn-news-save').click(function () {
      var id = $(this).data('id');
      var container = $('#news-' + id);
      var news = {
        id: id,
        title: container.find('.title').val(),
        createdDate: container.find('.createdDate').val(),
        body: container.find('.body').val()
      };
      $.ajax({
        type: 'POST',
        url: api.putNews,
        data: JSON.stringify(news),
        contentType : 'application/json',
        success: function () {
          location.reload();
        }
      })
    });
  }

  function initNewsCreateButton() {
    $('#btn-news-create').click(function () {
      var container = $('#create-news-container');
      var news = {
        title: container.find('.title').val(),
        createdDate: container.find('.createdDate').val(),
        body: container.find('.body').val()
      };
      $.ajax({
        type: 'POST',
        url: api.postNews,
        data: JSON.stringify(news),
        contentType : 'application/json',
        success: function () {
          location.reload();
        }
      })
    });
  }

  function initNewsDeleteButtons() {
    $('.btn-news-delete').click(function () {
      var id = $(this).data('id');
      var news = {
        id: id
      };
      $.ajax({
        type: 'POST',
        url: api.deleteNews,
        data: JSON.stringify(news),
        contentType : 'application/json',
        success: function () {
          location.reload();
        }
      })
    });
  }

  function initOffersSaveButton() {
    function saveOffer(offer) {
      return $.ajax({
        type: 'POST',
        url: api.putOffers,
        data: JSON.stringify(offer),
        contentType : 'application/json'
      })
    }
    $('#btn-offers-save').click(function () {
      var offersPromises = $('.offer-container').map(function () {
        var container = $(this);
        var offer = {
          id: container.find('.id').val(),
          name: container.find('.name').val(),
          amount: container.find('.amount').val(),
          weightMin: container.find('.weightMin').val(),
          weightMax: container.find('.weightMax').val()
        };
        return saveOffer(offer);
      });
      $.when(offersPromises).done(function () {
        location.reload();
      });
    });

  }

  $.getJSON(api.getNews, function (news) {
    var newsTermplates = $.map(news, function (singleNews) {
      return tmpl('newsTemplate', singleNews);
    });
    var newsTermplatesHtml = newsTermplates.join('');
    $('#news-placeholder').replaceWith(newsTermplatesHtml);
    initDatepickers();
    initNewsCreateButton();
    initNewsSaveButtons();
    initNewsDeleteButtons();
    initOffersSaveButton();
  });

  $.getJSON(api.getOffers, function (offers) {
    var offersTemplates = $.map(offers, function (offer) {
      return tmpl('offerTemplate', offer);
    });
    var offersHtml = offersTemplates.join('');
    $('#offers-placeholder').replaceWith(offersHtml);
  });

});