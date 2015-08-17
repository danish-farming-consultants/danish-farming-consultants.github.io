$(window).scroll(function () {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("top-nav-collapse");
  } else {
    $(".navbar-fixed-top").removeClass("top-nav-collapse");
  }
});

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
    var offersHtml = offersTemplates.join('<div class="column-margin"></div>');
    $('#offers-placeholder').replaceWith(offersHtml);
  });

  $.getJSON(api.getNews, function (news) {
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
      var emptyNews = '<div class="col-md-4 with-border" style="visibility: hidden"></div>';
      if (chunk.length == 1) {
        chunk.push(emptyNews);
        chunk.push(emptyNews);
      }
      if (chunk.length == 2) {
        chunk.push(emptyNews);
      }
      var chunkHtml = chunk.join('<div class="column-margin"></div>');
      var visible = '';
      if (index > 0) visible = 'style="display: none; padding-top: 0;"';
      return '<div id="news-row-' + index + '" class="news-row col-eq-height row text-justify" ' + visible + '>' + chunkHtml + '</div>';
    });
    var html = chunksHtmls.join('');
    $('#news-container').replaceWith(html);
  });
});
