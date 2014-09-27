var express = require('express');
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
app.get('/data', function(req, res){
      res.send(testvals);
});

var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
});
