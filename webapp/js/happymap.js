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

for (var i in JSONdata) {
  console.log(JSONdata[i]);
  {}
}

/* Data points defined as a mixture of WeightedLocation and LatLng objects */
//var heatMapData = 

/*
var Montreal = new google.maps.LatLng(45.5500, -73.5500);

map = new google.maps.Map(document.getElementById('map-canvas'), {
  center: sanFrancisco,
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.SATELLITE
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData
});
heatmap.setMap(map);*/
