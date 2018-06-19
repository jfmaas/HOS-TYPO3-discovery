$(function() {
    $('.field-geoLocationPoint').each(function() {
        var that = $(this);
        // extracting value:
        $('.dt-geoLocationPoint').hide();
        $('.dd-geoLocationPoint').hide();
        createMapView(that.text().split(','));
    });


});

function createMapView(latlng) {
  /* creating map */
  const id = 'leafletmapfordetailpage';
  var mapView = $('<div style="height:260px;width:100%" id="'+id+'"></div>');
  mapView.appendTo('article');
  console.log(mapView);
  var map = L.map(id).setView(latlng, 15);

  L.tileLayer('/Stamen/{z}/{x}/{y}.png', {
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
}

/* DOM
<dt class="dt-geoLocationPoint">geoLocationPoint</dt>
<dd class="dd-geoLocationPoint">
			<ul class="field-geoLocationPoint-group">
				<li><span class="field-geoLocationPoint">53.567894,9.978141</span></li>
			</ul>
</dd>
*/
