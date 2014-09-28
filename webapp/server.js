var express = require('express');
var path = require('path');
var app = express();

var testvals = [
        [45.507, -73.556, 3],
        [45.508, -73.556, 3],
        [45.509, -73.556, 2],
        [45.510, -73.556, 1],
        [45.511, -73.556, 2],
        [45.512, -73.556, 4],
        [45.513, -73.556, 2],
        [45.514, -73.513, 1]
];
app.get('/', function(req, res){
      res.sendfile('./index.html');
});
app.get('/data', function(req, res){
      res.send(testvals);
});

//app.post('/insert', function(req, res){
//      for (field in req) {
//          latitue
//
//
//      }
//      mysql.insert(ltat,long, 
//});
app.use(express.static(path.join(__dirname + '/static')));

var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
});
