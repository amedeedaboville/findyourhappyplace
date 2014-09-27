var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(testvals);
    res.end(index);
}).listen(9615);

var testvals = [
{(45.507, -73.556), weight: 3}
{(45.508, -73.556), weight: 3}
{(45.509, -73.556), weight: 2}
{(45.510, -73.556), weight: 1}
{(45.511, -73.556), weight: 2}
{(45.512, -73.556), weight: 4}
{(45.513, -73.556), weight: 2}
{(45.514, -73.513), weight: 1}
];
