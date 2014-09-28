map_style = [
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "road"
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {},
    {
        "featureType": "road",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    }
];

/*
// AJAX to get scan line chart data
$.ajax({
    url: 'http://104.131.105.81/data',
    type: 'post',
    success: function(data) {
        console.log(data);
    },
    error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
    }
});
*/

map = new google.maps.Map(document.getElementById('map-canvas'), {
  center: Montreal,
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.TERRAIN
});


var data = "[[45.507,-73.556,3],[45.508,-73.556,3],[45.509,-73.556,2],[45.51,-73.556,1],[45.511,-73.556,2],[45.512,-73.556,4],[45.513,-73.556,2],[45.514,-73.513,1]]";

var JSONdata = $.parseJSON(data);
var outarray = [];

for (var i in JSONdata) {

  outarray.push( { location: new google.maps.LatLng(JSONdata[i][0], JSONdata[i][1]), weight: JSONdata[i][2] } );
  //outarray.push( {location: new google.maps.LatLng(parseFloat(i[0]),parseFloat(i[1])), weight: parseFloat(i[2])} );
  makeMarker(JSONdata[i]);
}

function makeMarker(x){
	var coord = new google.maps.LatLng(x[0],x[1]);
	console.log(coord);
	var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
	      '<div id="bodyContent">'+
	      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	      'sandstone rock formation in the southern part of the '+
	      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
	      'south west of the nearest large town, Alice Springs; 450&#160;km '+
	      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
	      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
	      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
	      'Aboriginal people of the area. It has many springs, waterholes, '+
	      'rock caves and ancient paintings. Uluru is listed as a World '+
	      'Heritage Site.</p>'+
	      '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
	      'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
	      '(last visited June 22, 2009).</p>'+
	      '</div>'+
	      '</div>';
	var infowindow = new google.maps.InfoWindow({
      		content: contentString
  	});
	var marker = new google.maps.Marker({
		position: coord,
      		map: map,
      		title: 'Uluru (Ayers Rock)'
  	});
	google.maps.event.addListener(marker, 'click', function() {
    		infowindow.open(map,marker);
  	});
}

console.log(outarray);

/* Data points defined as a mixture of WeightedLocation and LatLng objects */
var heatMapData = outarray;

var Montreal = new google.maps.LatLng(45.5500, -73.5500);

map = new google.maps.Map(document.getElementById('map-canvas'), {
  center: Montreal,
  zoom: 18,
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  styles: map_style
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData
});
heatmap.setMap(map);