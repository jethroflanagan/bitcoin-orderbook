// Very quick n dirty server to bypass cross-origin stuff

var http = require('http');
var https = require('https');
var querystring = require('querystring');
var jsonBody = require("body/json");

const PORT = 8080;
const HOST_URL = 'https://staging.mybitx.com';
const API_URL = '/api/1';

// normally would be stored securely on server, not in repo
const API_KEY_ID = '';
const API_KEY_SECRET = '';

function handleRequest(serverReq, serverRes) {
    serverRes.setHeader('Access-Control-Allow-Origin', '*');
    serverRes.setHeader('Access-Control-Request-Method', '*');
    serverRes.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    serverRes.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    if (serverRes.method === 'OPTIONS') {
        serverRes.writeHead(200);
        serverRes.end();
        return;
    }
    if (serverReq.method === 'GET') {
        https.get(HOST_URL + API_URL + serverReq.url, (res) => {
            const statusCode = res.statusCode;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`);
            }
            else if (!/^application\/json/.test(contentType)) {
                error = new Error(`Invalid content-type.\n` +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => serverRes.end(rawData) );
        }).on('error', (e) => {
            serverRes.end(`{"error": "${e.message}"}`);
        });
    }
    else if (serverReq.method === 'POST') {
        jsonBody(serverReq, serverRes, (err, body) => {
            console.log('body', body);
            post(HOST_URL, API_URL + serverReq.url, body, (data) => serverRes.end(data));
        });
    }
    else {
        serverRes.end('{"error":"Method not supported"}');
    }
}

function post (url, path, data, cb) {
    var data = querystring.stringify(data);
    var options = {
        host: url.replace(/^https\:\/\//, ''),
        path: path,
        port: 443,
        method: 'POST',
        auth: API_KEY_ID + ':' + API_KEY_SECRET,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        }
    };
    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk)
        res.on('end', () => {
            console.log(rawData);
            cb(rawData)
        });
    });

    req.write(data);
    req.end();
}

var server = http.createServer(handleRequest)


server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});
