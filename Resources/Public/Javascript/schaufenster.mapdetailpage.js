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
  var mapView = $('<div style="height:360px;width:100%" id="'+id+'"></div>');
  mapView.appendTo('article');
  var map = L.map(id).setView(latlng, 15);
  L.tileLayer('/Stamen/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  var creators = [];
  $('.field-creatorName').each(function() {
      var that = $(this);
      creators.push(that.text().trim());
  });
  var preview = "";

  $('.field-url a').each(function() {
      var that = $(this);
      $.ajax({
                  url: '/typo3conf/ext/schaufenster/Resources/Public/screencapture.php' ,
                  type: 'POST',
                  data: { url :  that.attr('href')} ,
                  error : function() {
                      console.log('error');
                  },
                  success: function(data) {
                      console.log(data)
                      $('#previewScreen').attr('src',data);

                  }
             });





  });
  var redMarker = L.AwesomeMarkers.icon({
      icon: 'book',
      prefix: 'fa',
      markerColor: 'red'
  });
  $('.field-title').each(function() {

    var popupContent = creators.join(', ') + '<hr/>' + $(this).text() + '<br/><img width="220" height="220" id="previewScreen"/>';
     L.marker(latlng, {
         icon: redMarker
     }).addTo(map).bindPopup(popupContent).openPopup();
  });


  // control that shows state info on hover
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {

    };

    info.addTo(map);
    info.getContainer().addEventListener('mouseover', function () {
          map.dragging.disable();
      });

      // Re-enable dragging when user's cursor leaves the element
      info.getContainer().addEventListener('mouseout', function () {
          map.dragging.enable();
      });


}

/* DOM
<dt class="dt-geoLocationPoint">geoLocationPoint</dt>
<dd class="dd-geoLocationPoint">
			<ul class="field-geoLocationPoint-group">
				<li><span class="field-geoLocationPoint">53.567894,9.978141</span></li>
			</ul>
</dd>
*/
