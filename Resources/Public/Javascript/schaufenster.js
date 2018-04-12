var tx_schaufenster_facetHeatmap = {
	initHeatmap : function(props) {
		var useragent = navigator.userAgent;
		var container = $(props.container);
		var facetData = props.facetData;
		container.css("width", "100%");
		container.css("height", 150);
		var map = new L.Map(props.container, {
			center : new L.LatLng(53.58, 9.96),
			zoom : 9,
			zoomControl : false
		});
		var stamenLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution : ''
		});
		map.addLayer(stamenLayer);
		var cfg = {
			"radius" : 0.008,
			"maxOpacity" : .8,
			"scaleRadius" : true,
			"useLocalExtrema" : false,
			latField : 'lat',
			lngField : 'lng',
			valueField : 'count'
		};

		var data = Object.keys(facetData).map(function(latlng) {
			return {
				lat : latlng.split(",")[0],
				lng : latlng.split(',')[1],
				count : Math.sqrt(facetData[latlng])
			};
		});
		var heatmapLayer = new HeatmapOverlay(cfg);
		map.addLayer(heatmapLayer);
		heatmapLayer.setData({
			max : 8,
			data : data
		});
	}
}

$(document).ready(function() {
	/* Localisation of Labels */
	$.getJSON('typo3conf/ext/schaufenster/Resources/Private/Language/locallang-facets.json?x',function(data){
		console.log(data),
		$('article.detail dl dt').each(function() {
			var that=$(this);
			var label = that.text().trim();
			if (data.de['facet.'+ label]) {
				var i18n = data.de['facet.'+ label]; 
				that.text(i18n);
			}
		});

	});
	/* Removing all whitespaces around spans */
	$('dd span').each(function(){
		var that = $(this);
		that.text(that.text().trim());
	});
	$('span').each(function(){
	   var that = $(this);
	   that.autolink();
	});   
	
	if ($('.field-identifierType').text()=='URN') {
		var identifier = $('.field-identifier');
		var link = identifier.text();
		identifier.html('<a href="https://nbn-resolving.org/'+ link+'">'+link + '</a>');
	}
	$('.field-subject').each(function(){
		var that = $(this);
		var prop= that.text();
		var link ='<a href="/index.php?id=1&tx_find_find%5Bfacet%5D%5BFachgebiet%5D%5B###NEEDLE###%5D=1&tx_find_find%5Bcontroller%5D=Search#tx_find">'+prop+'</a>';
		that.html(link.replace('###NEEDLE###',encodeURI(prop)));
	});
	
	$('.field-creatorName').each(function(){
		var that = $(this);
		var prop= that.text().trim();
		var link ='<a href="index.php?id=1&tx_find_find[controller]=Search&tx_find_find[facet][Schöpfer][###NEEDLE###]=1#tx_find">'+prop+'</a>';
		that.html(link.replace('###NEEDLE###',encodeURI(prop)));
	});
	$('.field-geoLocationPoint').each(function(){
		var that = $(this);
		var prop= that.text();
		var link ='<a href="https://www.google.de/maps/@###NEEDLE###">'+prop+'</a>';
		that.html(link.replace('###NEEDLE###',encodeURI(prop)));
	});
	$('.field-publisher').each(function(){
		var that = $(this);
		var prop= that.text();
		var link ='<a href="index.php?id=1&tx_find_find[facet][publisher][###NEEDLE###]=1&tx_find_find[controller]=Search#tx_find">'+prop+'</a>';
		that.html(link.replace('###NEEDLE###',encodeURI(prop)));
	});


	$('.field-subject_ddc').each(function(){
		var that = $(this);
		var ddc= that.text();
		var ddctext = ddc_de[ddc.substr(0,3)];
		var link ='<a href="/index.php?id=1&tx_find_find%5Bfacet%5D%5BDDC%5D%5B###NEEDLE###%5D=1&tx_find_find%5Bcontroller%5D=Search#tx_find">DDC: '+ddc+'</a>';
		that.html(link.replace('###NEEDLE###',encodeURI(ddc))+ ' ('+ ddctext + ')');
	});




		/* Hiding Solr internal keys */ 		
	$('[class$="_str"]').each(function(){$(this).hide();});	
	$('[class$="id"]').each(function(){$(this).hide();});	
	$('[class$="score"]').each(function(){$(this).hide();});	
	$('[class$="_version_"]').each(function(){$(this).hide();});	
	$('article.facet-id-DDC a').each(function(){
		var that=$(this);
		var ddc=that.text().trim().split(/\s/)[0].substring(0,3);
		if (ddc<1000) {
		that.attr('title',ddc_de[ddc]);
		that.balloon({position:"top left"
		});
		}
	});
	$('.field-creatorName').each(function(){
		var that=$(this);
		var html = that.html();
	        that.html('<span class="fa fa-male"></span> '+html)			
	});
	$('.field-geoLocationPoint').each(function(){
		var that = $(this);
		var latlng = that.text().split(',');
		/* adding map */
		$('.dt-geoLocationPoint').css("width","100%");
		$('.dt-geoLocationPoint').html('<div style="height:460px;width:100%" id="geoLocationPointMap">Karte</div>');
		var map = L.map('geoLocationPointMap').setView(latlng, 15);

		L.tileLayer('https://stamen-tiles-a.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		var creators=[];
		$('.field-creatorName').each(function(){
			var that = $(this);
			creators.push(that.text().trim());
		 });

 		 var redMarker = L.AwesomeMarkers.icon({
			icon: 'book',
			prefix: 'fa',
			markerColor: 'red'
		 });
      
		 L.marker(latlng, {icon: redMarker}).addTo(map).bindPopup(creators.join(', ')+ ':<br/>'+ $('.field-title').text()).openPopup();
	});
	$('.dd-geoLocationPoint').hide();

});