var placeId = [];
var baseAPIUrl = 'https://maps.googleapis.com/maps/api/directions/json?';
var directionsDisplay;
var displayPath;

function initMap() {
  var origin_place_id = null;
  var destination_place_id = null;
  var travel_mode = 'WALKING';
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {
      lat: 42.331447,
      lng: -83.047632
    },
    mapTypeId: 'satellite',
    zoom: 13
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });

  heatmap.setMap(map);
  var gradient = [
    'rgba(255, 0, 0, 0)',
    'rgba(255, 0, 0, 1)',
    'rgba(255, 0, 128, 1)',
    'rgba(255, 0, 100, 1)',
    'rgba(255, 0, 50, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(223, 0, 0, 1)',
    'rgba(200, 0, 0, 1)',
    'rgba(200, 0, 0, 1)',
    'rgba(210, 0, 0, 1)',
    'rgba(220, 0, 0, 1)',
    'rgba(230, 0, 0, 1)',
    'rgba(240, 0, 0, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  heatmap.set('radius', heatmap.get('radius') ? null : 5);
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.8);

  displayPath = [];

  var directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  var origin_input = document.getElementById('origin-input');
  var destination_input = document.getElementById('destination-input');
  var modes = document.getElementById('mode-selector');

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(origin_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(destination_input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(modes);
  var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
  origin_autocomplete.bindTo('bounds', map);
  var destination_autocomplete =
    new google.maps.places.Autocomplete(destination_input);
  destination_autocomplete.bindTo('bounds', map);
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function expandViewportToFitPlace(map, place) {
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  }
  origin_autocomplete.addListener('place_changed', function() {
    var place = origin_autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);
    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    origin_place_id = place.place_id;
    placeId.push(origin_place_id);

    route(origin_place_id, destination_place_id, travel_mode,
      directionsService, directionsDisplay, displayPath);
  });

  destination_autocomplete.addListener('place_changed', function() {
    var place = destination_autocomplete.getPlace();
    var result;
    
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    expandViewportToFitPlace(map, place);
    // If the place has a geometry, store its place ID and route if we have
    // the other place ID
    destination_place_id = place.place_id;
    placeId.push(destination_place_id);
    if($('#panel').length) return false;
    else {
      $('header').after($("<div id='panel'></div>"));
      $('#panel').animateCss('fadeIn');
    }
    function please(){
      var n = $(this).index();
      console.log('works');
      directionsDisplay.setDirections(displayPath[n]);
    }

      $.ajax({
        url: baseAPIUrl += "origin=place_id:" + placeId[0] + "&destination=place_id:" + placeId[1] + "&language=en&mode=walking&alternatives=true&key=AIzaSyAE6o3bNueg57_Ij5oK3oTqd40R0nac5No",
        type: "GET",
        dataType: "json",
        success: function(data) {
          $.ajax({
            url: '/danger',
            type: "POST",
            data: {data: JSON.stringify(data)},
            dataType: "json",
            success: function(data) {
              var total = 0;
              for(var i=0; i<data.data.length; i++) {
                total += data.data[i];
              }
              $('.way-wrapper').each(function(i) {
                $(this).append($('<div class="danger"><h1 class="hehe">Danger</h1><span class="dangerRate">'+Math.floor(data.data[i]/total*100)+'%</span></div>'));
                var num = $('.dangerRate').text().replace("%", "");
                if(parseInt(num) >= 70) {
                  if(i == 0) $('.dangerRate').first().addClass('red');
                  else if(i == 1) $('.dangerRate').last().addClass('red');
                }
              })
              $('.dangerRate').addClass('red');
            }
          })
            var via = [];
            var dur = [];

            for(var i=0; i<data.routes.length; i++){
              via.push(data.routes[i].summary);
              dur.push(data.routes[i].legs[0].duration.text);
              $('#panel').append($('<div class="way-wrapper" onclick="please($(this).index())"><div class="way_info"><h1 class="way_via">via '+via[i]+'</h1>'+'<h1 class="way_min">'+dur[i]+'</h1></div></div>'));
            }
        }
      })

    route(origin_place_id, destination_place_id, travel_mode,
      directionsService, directionsDisplay, displayPath);
      })
}

function route(origin_place_id, destination_place_id, travel_mode,
  directionsService, directionsDisplay, displayPath) {
  if (!origin_place_id || !destination_place_id) {
    return;
  }
  directionsService.route({
    origin: {
      'placeId': origin_place_id
    },
    destination: {
      'placeId': destination_place_id
    },
    travelMode: travel_mode,
    provideRouteAlternatives: true
  }, function(response, status) {
    /*if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });*/
    displayPath = [];
    if (status == "OK") {
        //var changedResponse;
            for (var i = 0, len = response.routes.length; i < len; i++) {
                //directionsDisplay.routeIndex = i;
                //directionsDisplay.directions = response;
                /*
                console.log(directionsDisplay = new google.maps.DirectionsRenderer({
                    setMap: map,
                    directions: response,
                    routeIndex: i
                }); */
                var changedResponse = jQuery.extend(true, {}, response);
                changedResponse.routes[0] = response.routes[i];
                //console.log(changedResponse.routes[0], response.routes[i])
                displayPath.push(changedResponse);
                console.log(displayPath);
                //tempDirection.setDirections(response);
            }
            directionsDisplay.setDirections(displayPath[0]);
            $('document').on('click', '.way-wrapper', function(e) {
              var n = $(this).index();
              console.log('a');
              directionsDisplay.setDirections(displayPath[n]);
              e.preventDefault();
            })
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    }
  );
}
function please(n){
  directionsDisplay.setDirections(displayPath[n+1]);
}
