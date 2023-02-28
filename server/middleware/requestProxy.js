var http = require('http');

exports.getResponseThroghProxy = function ({ url, method, headers, data }) {
    return new Promise((resolve, reject) => {
        var opt = {
            host: '192.168.3.118',
            port: '8899',
            method,
            path: url,
            headers
        };
        var responseBody = '';
        var req = http.request(opt, function (res) {
            res.on('data', (d) => responseBody += d).on('end', () => {
                resolve({ data: responseBody, headers: res.headers });
            });
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
            reject(e);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });

};