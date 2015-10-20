$(function () {
  function success(msg) {
    $.notify(msg, {type: 'success', delay: 1000, placement: {from: 'bottom', align: 'center'}});
  }

  function error(msg) {
    $.notify(msg, {type: 'danger', delay: 3000, placement: {from: 'bottom', align: 'center'}});
  }

  function initOffersSaveButton() {
    function saveOffer(offer) {
      return $.ajax({
        type: 'PUT',
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
          weightMax: container.find('.weightMax').val(),
          price: container.find('.price').val()
        };
        return saveOffer(offer);
      });
      var offerInfoPromise = $.ajax({
        type: 'PUT',
        url: api.putOffersInfos,
        data: JSON.stringify({id: $('#offer-info-id').val(), title: $('#offer-info-title').val() }),
        contentType : 'application/json'
      });
      offersPromises.push(offerInfoPromise);
      $.when.apply($, offersPromises).done(() => success('Dane zostały zapisane!'));
      $.when.apply($, offersPromises).fail(() => error('Bład podczas zapisu!'));
    });
  }

  $.getJSON(api.getOffers, function (offers) {
    var offersTemplates = $.map(offers, function (offer) {
      return tmpl('offerTemplate', offer);
    });
    var offersHtml = offersTemplates.join('');
    $('#offers-placeholder').replaceWith(offersHtml);
  });

  $.getJSON(api.getOffersInfos, function (offersInfos) {
    var offerInfo = offersInfos[0];
    $('#offer-info-id').val(offerInfo.id);
    $('#offer-info-title').val(offerInfo.title);
  });

  initOffersSaveButton();
});