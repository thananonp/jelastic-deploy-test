require('dotenv').config();
const https = require('https');
const http = require('http');
const fs = require('fs');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
    key: sslkey,
    cert: sslcert
};

const httpsRedirect = (req, res) => {
    res.writeHead(301, {
        Location: `https://localhost:${process.env.PORT_HTTPS}` + req.url,
    });
    res.end();
};

const localhost = (app, httpsPort, httpPort) => {
    console.log("Development Environment")
    console.log(`Access the website here => https://localhost:${process.env.PORT_HTTPS}`)
    https.createServer(options, app).listen(httpsPort);
    http.createServer(httpsRedirect).listen(httpPort);
};

module.exports = localhost;
