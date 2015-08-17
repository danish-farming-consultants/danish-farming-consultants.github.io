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

  $.getJSON('/api/getNews.php', function (news) {
    var newsTermplates = $.map(news, function (singleNews) {
      return tmpl('newsTemplate', singleNews);
    });
    var newsTermplatesHtml = newsTermplates.join('');
    $('#news-placeholder').replaceWith(newsTermplatesHtml);
    initDatepickers();
  });

  $.getJSON('/api/getOffers.php', function (offers) {
    var offersTemplates = $.map(offers, function (offer) {
      return tmpl('offerTemplate', offer);
    });
    var offersHtml = offersTemplates.join('');
    $('#offers-placeholder').replaceWith(offersHtml);
  });

});