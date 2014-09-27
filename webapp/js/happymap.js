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
/*
var heatMapData = [
  {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
  new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
  {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
  {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
  new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

  {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
  {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
  new google.maps.LatLng(37.785, -122.443),
  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
  new google.maps.LatLng(37.785, -122.439),
  {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
  {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
];*/
console.log(JSONdata);
//console.log(heatMapData);
for (var i in JSONdata) {
  //console.log([i[0],i[1],i[2]]);
  //console.log([typeof i[0], typeof i[1], typeof i[2]]);
  //console.log([parseFloat(i[0]), parseFloat(i[1]), parseFloat(i[2])]);
  //console.log([typeof parseFloat(i[0]), typeof parseFloat(i[1]), typeof parseFloat(i[2])]);
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
  mapTypeId: google.maps.MapTypeId.TERRAIN
>>>>>>> 8c199872828a5903d842e4d069de61c88ecadba8
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatMapData
});
heatmap.setMap(map);
