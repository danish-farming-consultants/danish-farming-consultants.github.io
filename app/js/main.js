$(window).scroll(function () {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

$(function () {
  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  $('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
  });

  $('body').scrollspy({
    offset: 130
  });

  (function () {
    var sections = $('section');
    var currentItem = $(".nav li.active > a").attr('href');
    sections.not(currentItem).css('opacity', '1.0');
    $('.navbar').on('activate.bs.scrollspy', function () {
      var currentItem = $(".nav li.active > a").attr('href');
      sections.clearQueue();
      $(currentItem).transition({ opacity: 1.0 }, 1500);
      sections.not(currentItem).transition({ opacity: 1.0 }, 1500);
    });
  })();

  $('.img-info').each(function () {
    var width = $(this).width();
    $(this).css('margin-left', -width/2);
  });
});

$(function () {
  var seeMoreIndex = 0;
  $('#see-more').click(function () {
    var seeMoreSize = $('.news-row').length;
    seeMoreIndex++;
    $('#news-row-' + seeMoreIndex).fadeIn();
    if (seeMoreIndex + 1 >= seeMoreSize) {
      $('#see-more').hide();
    }
  });
});

new WOW().init();

$(function () {
  $.getJSON(api.getOffers, function (offers) {
    var offersTemplates = $.map(offers, function (offer) {
      return tmpl('offerTemplate', offer);
    });
    $.each(offersTemplates, function (index, offerTemplate) {
      $('#offer-' + (index + 1)).html(offerTemplate);
    });
  });

  $.getJSON(api.getNews + '?lang=' + language, function (news) {
    if (news.length <= 3) {
      $('#see-more').hide();
    }
    function splitToThreeElementsChunks(array) {
      var chunks = [];
      for (var i = 0, j = array.length; i < j; i += 3) {
        chunks.push(array.slice(i, i + 3));
      }
      return chunks;
    }
    var newsHtmlTemplates = $.map(news, function (singleNews) {
      return tmpl('newsTemplate', singleNews);
    });
    var chunks = splitToThreeElementsChunks(newsHtmlTemplates);
    var chunksHtmls = $.map(chunks, function (chunk, index) {
      var chunkHtml = chunk.join('');
      var visible = '';
      if (index > 0) visible = 'style="display: none; padding-top: 0;"';
      return '<div id="news-row-' + index + '" class="news-row row text-justify" ' + visible + '>' + chunkHtml + '</div>';
    });
    var html = chunksHtmls.join('');
    var container = '<div class="row-container">' + html + '</div>';
    $('#news-container').replaceWith(container);
  });

  $.getJSON(api.getOffersInfos, function (offersInfos) {
    var offerInfo = offersInfos[0];
    var title;
    var price;
    if (language === 'en') {
      title = offerInfo.titleEn;
      price = offerInfo.priceEn;
    } else {
      title = offerInfo.titlePl;
      price = offerInfo.pricePl;
    }
    $('#offer-info').text(title);
    $('#price-info').text(price);
  });
});

$(function () {
  initPhotoSwipeFromDOM('#gallery');
});

function raiseInputLabel() {
  var inputs = $('.js-validate');
  inputs.each(function (_, input) {
    var label = $(input).siblings('.c-form__label');

    $(input).focus(function () {
      label.addClass('c-form__label--raised');
      label.css('color', 'rgb(62, 63, 58)');
      if ($(input).is('textarea')) {
        $(input).addClass('c-form__textarea--filled');
      }
    });

    $(input).focusout(function () {
      label.css('color', 'rgb(62, 63, 58)');
      if ($(input).val().length === 0) {
        label.removeClass('c-form__label--raised');
        $(input).removeClass('c-form__textarea--filled');
      }
    });
  });
}

$(function () {
  raiseInputLabel();
});

function validateName(name) {
  var minLength = 2;
  var maxLength = 50;

  return (name.length >= minLength) && (name.length <= maxLength);
}

function validateEmail(email) {
  var reEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  return reEmail.test(email);
}

function validateMsg(msg) {
  var maxLength = 10000;

  return (msg.length <= maxLength);
}

function validateCheckbox(checkbox) {
  return checkbox.is(':checked');
}

function typeValidation(inputToValidate) {
  var validationType = $(inputToValidate).data('validation');
  var input = $(inputToValidate);
  var inputValue = input.val();
  var inputValid = false;

  switch (validationType) {
    case 'name':
      inputValid = validateName(inputValue);
      break;
    case 'email':
      inputValid = validateEmail(inputValue);
      break;
    case 'msg':
      inputValid = validateMsg(inputValue);
      break;
    case 'checkbox':
      inputValid = validateCheckbox(input);
      break;
    default:
      inputValid = false;
      break;
  }

  return inputValid;
}

function validateInput(inputToValidate) {
  if (typeValidation(inputToValidate) === true) {
    $(inputToValidate).addClass('js-valid');
    $(inputToValidate).removeClass('js-invalid');
    $(inputToValidate).siblings('.invalid-feedback').removeClass('show');
  } else {
    $(inputToValidate).removeClass('js-valid');
    $(inputToValidate).addClass('js-invalid');
    $(inputToValidate).siblings('.invalid-feedback').addClass('show');
  }
  $(inputToValidate).removeClass('js-validate');
}

function validateInputOnEvent(inputToValidate) {
  $(inputToValidate).on('keyup blur change', function () {
    validateInput(inputToValidate);
  });
}

function showMsgSentInfo(form) {
  var msgSentInfos = form.find('.js-msgSent');
  msgSentInfos.each(function (_, msgSentInfo) {
    $(msgSentInfo).addClass('show');
  });
}

function showMsgNotSentInfo(form) {
  var msgNotSentInfos = form.find('.js-msgNotSent');
  msgNotSentInfos.each(function (_, msgNotSentInfo) {
    $(msgNotSentInfo).addClass('show');
  });
}

function resetInputsValidation(form) {
  var inputElements = form.find('.js-valid');
  inputElements.each(function (_, inputElement) {
    $(inputElement).addClass('js-validate');
    $(inputElement).removeClass('js-valid');
    $(inputElement).removeClass('js-invalid');
    $(inputElement).off('keyup blur change');
    $(inputElement).val('');
    $(inputElement).removeClass('c-form__label--raised');
    $(inputElement).removeClass('c-form__textarea--filled');
  });
}

function validateForm(form) {
  var inputsToValidate = form.find('.js-validate');
  inputsToValidate.each(function (_, inputToValidate) {
    validateInput(inputToValidate);
    validateInputOnEvent(inputToValidate);
  });

  var invalidInputs = form.find('.js-invalid');
  return invalidInputs.length === 0;
}

function hideMsgSentInfo(parentForm) {
  var msgSentElements = parentForm.find('.js-msgSent');
  msgSentElements.each(function (_, msgSentElement) {
    $(msgSentElement).removeClass('show');
  });
  var msgNotSentElements = parentForm.find('.js-msgNotSent');
  msgNotSentElements.each(function (_, msgNotSentElement) {
    $(msgNotSentElement).removeClass('show');
  });
}

function sendMessage() {
  $('.js-sendMsg').each(function (_, btn) {
    $(btn).click(function () {
      var form = $(btn).parents('form');
      hideMsgSentInfo(form);

      if (validateForm(form) === true) {
        var name = $('#contact-form-name').val();
        var email = $('#contact-form-email').val();
        var msg = $('#contact-form-message').val();
        var jsonObject = {name: name, email: email, body: msg};

        $.ajax({
          type: 'POST',
          url: 'https://dfc.slask.pl/api/mail.php',
          data: JSON.stringify(jsonObject)
        }).done(function () {
          showMsgSentInfo(form);
          resetInputsValidation(form);
        }).fail(function () {
          showMsgNotSentInfo(form);
        });
      }
    });
  });
}

function hideCookieInfoOnClick() {
  //var cookieCodeloopAccepted = localStorage.getItem('cookieDfcAccepted');
  var cookieCodeloopAccepted = 'true';
  if (cookieCodeloopAccepted !== 'true') {
    $('.c-cookie-info').removeClass('hide');
    $('.js-hideCookieInfo').click(function () {
      $('.c-cookie-info').addClass('hide');
      localStorage.setItem('cookieDfcAccepted', 'true');
    });
  }
}

$(function () {
  sendMessage();
  hideCookieInfoOnClick();
});
