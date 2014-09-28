var express = require('express');
var path = require('path');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
app.use(express.static(path.join(__dirname + '/static')));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.NODE_DB_PASS,
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

app.post('/insert', bodyParser.urlencoded(), function(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.send('received')
    console.log("INSERT CALLED!");
    console.log(req.body);
    var lat = req.body.lat;
    var lng = req.body.lng;
    var user_id = req.body.user_id;
    var happiness = req.body.happiness;
    var date_time = (new Date()).toLocaleFormat("%Y-%m-%d %H:%M:%S");
    var insert_query = "INSERT INTO data (user_ID, geolat, geolng, happiness, date_time) ( + [user_id, lat, lng, happiness, 0].join(", ") + ")";
    connection.query(insert_query,
        function(err,rows)
        {
            if(err) { console.log("Error performing insert query : %s ",err ); }
            res.send(rows);
        });
    });

var server = app.listen(process.env.NODE_PORT, function() {
    console.log('Listening on port %d', server.address().port);
});
