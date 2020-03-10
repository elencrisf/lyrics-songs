//server.js

var express = require('express');

var app = express();

var path = require('path');

var PORT = 3000;





app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});





// var http = require('http');

// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.end("Hello world\n");
// });

// server.listen(3000, function() {
//     console.log('Server is running at 3000')
// });
