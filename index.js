const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');

const sslOptions = {
    key: fs.readFileSync('key.pem', 'utf8'),
    cert: fs.readFileSync('cert.pem', 'utf8'),
    passphrase: 'shiva'
  };
  
const server = https.createServer(sslOptions, app)

app.use(express.static(__dirname + '/public')); 

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

server.listen(8080);
