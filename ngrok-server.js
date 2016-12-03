const http = require('http');
const fs = require('fs');
const ngrok = require('ngrok');

const port = 3000;
const url = 'http://127.0.0.1:5000';

function status(req, res) {
       http.get(url, function (response) {
            // Its Online
            res.writeHead(200, {
                'Content-Type': 'image/svg+xml'
            });
            fs.createReadStream('./badges/online.svg').pipe(res);
        }).on('error', function(e) {
            // Its Offline
            res.writeHead(200, {
                'Content-Type': 'image/svg+xml'
            });
            fs.createReadStream('./badges/offline.svg').pipe(res);            
    });
};

http.createServer(status).listen(port);

ngrok.connect(port, function (err, url) {
    console.log(url)
});