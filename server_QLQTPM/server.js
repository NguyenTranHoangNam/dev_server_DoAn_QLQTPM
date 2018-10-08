var http = require('http');
var num_port = 1742;
var port = process.env.port || num_port;
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' }); //'text/html' });
    res.end(JSON.stringify());
    console.log(req.url.split("?")[0]);
});

server.listen(port);
console.log("Running server!!!");
console.log("Link server: localhost:" + process.env.port + " and localhost:" + num_port);