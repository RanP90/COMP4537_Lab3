let http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Response's coming from server ...\n");
    res.end();
    }
).listen(8080);
console.log('listening ...');