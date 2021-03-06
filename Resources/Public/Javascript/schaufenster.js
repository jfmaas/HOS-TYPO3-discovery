function getResIcon(resourceType) {
    var RESOURCE_TYPES = {
        "Dissertation": "bel-zertifikat",
        "Report": "bel-buch",
        "Article": "bel-artikel",
        "Working Paper": "bel-artikel",
        "Proceedings Part": "bel-artikel",
        "Periodical Part": "bel-artikel",
        "Preprint": "bel-schreiben",
        "Book": "bel-buch",
        "Book Part": "bel-artikel",
        "Conference Object": "bel-leer",
        "Master Thesis": "bel-zertifikat",
        "Bachelor Thesis": "bel-zertifikat",
        "Other": "bel-leer",
        "Habilitation": "bel-zertifikat",
        "Course Material": "bel-schreiben",
        "Lecture": "bel-mkombo07",
        "Study Thesis": "bel-zertifikat"
    }
    return RESOURCE_TYPES[resourceType] || "bel-leer";
}


$(function() {
    $('body').show();

    /* Localisation of Labels */
    $.getJSON('typo3conf/ext/schaufenster/Resources/Private/Language/locallang-facets.json', function(data) {
        $('article.detail dl dt').each(function() {
            var that = $(this);
            var label = that.text().trim();
            if (data.de['facet.' + label]) {
                var i18n = data.de['facet.' + label];
                that.text(i18n);
            }
        });
        $('article.facet h1').each(function() {
            var that = $(this);
            var label = that.text().trim();
            if (data.de['facet.' + label]) {
                var i18n = data.de['facet.' + label];
                that.text(i18n);
            }
        });


    });
    /* Removing all whitespaces around spans */
    $('dd span').each(function() {
        var that = $(this);
        that.text(that.text().trim());
    });
    // autolinking URLs:
    $('span').each(function() {
        var that = $(this);
        that.autolink();
    });

    // URNung:
    if ($('.field-identifierType').text() == 'URN') {
        var identifier = $('.field-identifier');
        var link = identifier.text();
        identifier.html('<a href="https://nbn-resolving.org/' + link + '">' + link + '</a>');
    }

    // iconen vor die Sammlungen:
    $('.facet-id-Collection a').each(function() {
        var PATH = '/typo3conf/ext/schaufenster/Resources/Public/CSS/';
        var that = $(this);
        var txt = that.contents().text().trim().substr(0, 3);
        switch (txt) {
            case 'E-D':
                that.prepend('<img src="' + PATH + 'uhh.png" width=23/>');
                break;
            case 'Tub':
                that.prepend('<img src="' + PATH + 'tuhh.png" width=23/>');
                break;
            case 'TU ':
            that.prepend('<img src="' + PATH + 'tuhh.png" width=23/>');
            break;

        }
    });

    // Auto verlinkung
    $('.field-subject').each(function() {
        var that = $(this);
        var prop = that.text();
        var link = '<a href="/index.php?id=1&tx_find_find%5Bfacet%5D%5BSubjects%5D%5B###NEEDLE###%5D=1&tx_find_find%5Bcontroller%5D=Search#tx_find">' + prop + '</a>';
        that.html(link.replace('###NEEDLE###', encodeURI(prop)));
    });

    $('.field-creatorName').each(function() {
        var that = $(this);
        var prop = that.text().trim();
        var link = '<a href="index.php?id=1&tx_find_find[controller]=Search&tx_find_find[facet][Author][###NEEDLE###]=1#tx_find">' + prop + '</a>';
        that.html(link.replace('###NEEDLE###', encodeURI(prop)));
    });
    $('.field-geoLocationPoint').each(function() {
        var that = $(this);
        var prop = that.text();
        var link = '<a href="https://www.google.de/maps/@###NEEDLE###">' + prop + '</a>';
        that.html(link.replace('###NEEDLE###', encodeURI(prop)));
    });
    $('.field-publisher').each(function() {
        var that = $(this);
        var prop = that.text();
        var link = '<a href="index.php?id=1&tx_find_find[facet][publisher][###NEEDLE###]=1&tx_find_find[controller]=Search#tx_find">' + prop + '</a>';
        that.html(link.replace('###NEEDLE###', encodeURI(prop)));
    });


    $('.field-subject_ddc').each(function() {
        var that = $(this);
        var ddc = that.text();
        var ddctext = ddc_de[ddc.substr(0, 3)];
        var link = '<a href="/index.php?id=1&tx_find_find%5Bfacet%5D%5BFachgebiet%5D%5B###NEEDLE###%5D=1&tx_find_find%5Bcontroller%5D=Search#tx_find">DDC: ' + ddc + '</a>';
        that.html(link.replace('###NEEDLE###', encodeURI(ddc)) + ' (' + ddctext + ')');
    });

    /* Hiding Solr internal keys */
    $('[class$="date"],[class$="dateType"],[class$="collector"],[class$="_str"],[class$="id"],[class$="score"],[class$="_version_"],[class$="titleLang"]').each(function() {
        $(this).hide();
    });

    /* Avatar malen */
    $('.field-creatorName').each(function() {
        var that = $(this);
        var html = that.html();
        that.html('<span class="fa fa-male"></span> ' + html)
    });

    $('.fieldLabel[for="c-field-Suche"]').each(function() {
        var that = $(this);
        that.html('<a title="Zurück zur Suche" href="/">' + that.text() + '</a>')
    });
    // adding fancyBox container:
    $('<div id="largeheatmapcontainer" style="display: none;"><div class="largeheatmap" /></div>').appendTo('body');

    $('.resultList li').each(function() {
        var that = $(this);
        var type = that.find('.field-resourceType').text().trim();;
        that.prepend('<span style="font-size:70px;margin-left:-.8em;display:inline"  class="' + getResIcon(type) + '"></span>');
    });
    $('.facet-id-resourceType li').each(function() {
        var that = $(this);
        that.css('display', 'block');
        that.addClass(getResIcon(that.attr('value')));
    });
    //$('#c3').append('<img style="cursor:pointer;position:absolute;top:0;right:0;filter:grayscale(0);" width=90 src="/typo3conf/ext/schaufenster/Resources/Public/CSS/color.jpg" id="colortoggler"/>');

    (function(){   /*  Handling of coloring/graying */
      var COLORING = 'COLORINGFLAG';
      function setColoring() {
         (!!$.cookie(COLORING))
            ? $('body').addClass('grayscale')
            : $('body').removeClass('grayscale');
      }
      $('#colortoggler').click(function() {
          (!!$.cookie(COLORING))
            ? $.removeCookie(COLORING)
            : $.cookie(COLORING, '1', { expires: 777 });
          setColoring();
      });
      setColoring();
    })();
});
