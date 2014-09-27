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

var data = "[[45.507,-73.556,3],[45.508,-73.556,3],[45.509,-73.556,2],[45.51,-73.556,1],[45.511,-73.556,2],[45.512,-73.556,4],[45.513,-73.556,2],[45.514,-73.513,1]]";

var JSONdata = $.parseJSON(data);
var outarray = [];

for (var i in JSONdata) {

  outarray.push( { location: new google.maps.LatLng(JSONdata[i][0], JSONdata[i][1]), weight: JSONdata[i][2] } );
  //outarray.push( {location: new google.maps.LatLng(parseFloat(i[0]),parseFloat(i[1])), weight: parseFloat(i[2])} );
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
