var http = require('http');
var https = require('https');


// const _url = new URL('http://10.143.133.190:18036/vdc/api/1.0/cloudDesktop/list/1/10');
const _url = new URL('https://160.106.5.63:10012/rest/service/vm/listByPage"');
console.log(_url);

const { hostname, pathname, port } = _url;

const httpRequestOptions = {
    host: hostname,
    path: pathname,
    method: "GET"
};

if (port) {
    httpRequestOptions.port = port;
}


let ajax = http.request;
if (_url.protocol === 'https:') {
    ajax = https.request;
}

const httpRequest = ajax(
    _url,
    response => {
        const chunks = [];
        let totallength = 0;

        response.on('data', chunk => {
            chunks.push(chunk);
            totallength += chunk.length;
        });

        response.on('end', () => {
            console.log({
                // headers: response.headers,
                body: Buffer.concat(chunks, totallength).toString()
            });
        });
    });

httpRequest.on('error', (e) => {
    console.log('Error with the request:', e);
});

httpRequest.end();

