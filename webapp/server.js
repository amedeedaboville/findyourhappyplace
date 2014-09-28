var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port : 3306, //port mysql
    database:'happyplace'
});

connection.connect();

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
    //connection.query("SELECT * FROM locations WHERE geolat>"+minlat + " AND geolat<maxlat AND geolng>minlng AND geolng<maxlng",
    connection.query("SELECT * FROM locations",
        function(err,rows)
        {
            if(err) { console.log("Error Selecting : %s ",err ); }
            res.send(rows);
        });
});

app.post('/insert', function(req, res){
    lat = req.latitude;
    lng = req.longitude;
    lat = req.latitute
    //mysql.insert(ltat,long, });
    });
app.use(express.static(path.join(__dirname + '/static')));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
