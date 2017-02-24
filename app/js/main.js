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
    sections.not(currentItem).css('opacity', '0.6');
    $('.navbar').on('activate.bs.scrollspy', function () {
      var currentItem = $(".nav li.active > a").attr('href');
      sections.clearQueue();
      $(currentItem).transition({ opacity: 1.0 }, 1500);
      sections.not(currentItem).transition({ opacity: 0.6 }, 1500);
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
