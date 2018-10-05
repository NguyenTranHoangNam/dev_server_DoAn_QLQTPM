var http = require('http');
var num_port = 1742;
var port = process.env.port || num_port;
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<title>Hello World Page</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("Xin chào");
    res.write("tôi cà ai nhỉ");
    res.write("</body>");
    res.write("</html>");
    res.end();
    console.log("day la file log");
});

server.listen(port);
console.log("Running server!!!");
console.log("Link running: localhost:" + process.env.port + " and localhost:" + num_port);