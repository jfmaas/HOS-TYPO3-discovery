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
    $('span').each(function() {
        var that = $(this);
        that.autolink();
    });

    if ($('.field-identifierType').text() == 'URN') {
        var identifier = $('.field-identifier');
        var link = identifier.text();
        identifier.html('<a href="https://nbn-resolving.org/' + link + '">' + link + '</a>');
    }

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
            case 'tuh':
            that.prepend('<img src="' + PATH + 'tuhh.png" width=23/>');
            break;

        }


    });

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
    $('[class$="_str"]').each(function() {
        $(this).hide();
    });
    $('[class$="id"]').each(function() {
        $(this).hide();
    });
    $('[class$="score"]').each(function() {
        $(this).hide();
    });
    $('[class$="_version_"]').each(function() {
        $(this).hide();
    });
    $('[class$="titleLang"]').each(function() {
        $(this).hide();
    });
    $('[class$="date"]').each(function() {
        $(this).hide();
    });

    /* Avatar malen */
    $('.field-creatorName').each(function() {
        var that = $(this);
        var html = that.html();
        that.html('<span class="fa fa-male"></span> ' + html)
    });
    $('.field-geoLocationPoint').each(function() {
        var that = $(this);
        var latlng = that.text().split(',');
        /* adding map */
        $('.dt-geoLocationPoint').css("width", "100%");
        $('.dt-geoLocationPoint').html('<div style="height:460px;width:100%" id="geoLocationPointMap">Karte</div>');
        var map = L.map('geoLocationPointMap').setView(latlng, 15);

        L.tileLayer('https://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var creators = [];
        $('.field-creatorName').each(function() {
            var that = $(this);
            creators.push(that.text().trim());
        });

        var redMarker = L.AwesomeMarkers.icon({
            icon: 'book',
            prefix: 'fa',
            markerColor: 'red'
        });

        L.marker(latlng, {
            icon: redMarker
        }).addTo(map).bindPopup(creators.join(', ') + ':<br/>' + $('.field-title').text()).openPopup();
    });
    $('.dd-geoLocationPoint').hide();
    $('.fieldLabel[for="c-field-Suche"]').each(function() {
        var that = $(this);
        that.html('<a title="Zurück zur Suche" href="/">' + that.text() + '</a>')
    });
    // adding fancyBox container:
    $('<div id="largeheatmapcontainer" style="display: none;"><div class="largeheatmap" /></div>').appendTo('body');

    /*        $('.searchForm').prepend('<a href="/" title="Zurück zum Start der Suche" class="bel-haus" style="float-left;font-size:64px;color:white;float:left"></a>');
     */
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
    $('img, div, span').addClass('grayscale');
    $('#c3').append('<img style="cursor:pointer;position:absolute;top:0;right:0;filter:grayscale(0);" width=90 src="/typo3conf/ext/schaufenster/Resources/Public/CSS/color.jpg" id="colortoggler"/>');

    /*  Handling of coloring */
    var COLORING = 'COLORING';
    function setColoring() {
      console.log("coloring=" +$.cookie(COLORING));
      if ($.cookie(COLORING)) $('img, div, span').addClass('grayscale'); else $('img, div, span').removeClass('grayscale');
    }
    $('#colortoggler').click(function() {
        if ($.cookie(COLORING)) $.removeCookie(COLORING) else   $.cookie(COLORING, '1', { expires: 777 });
        setColoring();
    });   
    setColoring();
});
