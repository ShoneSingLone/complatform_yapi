var http = require('http');
var fs = require('fs');

exports.getResponseThroghProxy = function ({ ctx, path, host, port }) {

    host = host === 'undefined' ? "" : host;
    port = port === 'undefined' ? "" : port;

    return new Promise(resolve => {
        delete ctx.request?.header.host;
        const httpRequestOptions = new URL(path);
        httpRequestOptions.method = ctx.request.method;
        httpRequestOptions.headers = ctx.request?.header;

        if (host && port) {
            httpRequestOptions.host = host;
            httpRequestOptions.port = port;
        }

        let requestBody = "", body, headers, bodyFields, bodyFiles, boundaryKey, boundary, endData, filesLength, totallength = 0;

        if (ctx.request.body && JSON.stringify(ctx.request.body) != "{}") {
            (() => {
                if (ctx.request?.header['content-type']) {
                    if (String(ctx.request.header['content-type']).includes('application/x-www-form-urlencoded')) {
                        requestBody = JSON.stringify(ctx.request.body);
                        httpRequestOptions.headers['Content-Length'] = Buffer.byteLength(requestBody);
                        return;
                    }

                    if (String(ctx.request.header['content-type']).includes('application/json')) {
                        requestBody = JSON.stringify(ctx.request.body);
                        httpRequestOptions.headers['Content-Length'] = Buffer.byteLength(requestBody);
                        return;
                    }


                    if (String(ctx.request.header['content-type']).includes('multipart/form-data')) {
                        bodyFields = ctx.request.body.fields;
                        bodyFiles = ctx.request.body.files;
                        boundaryKey = Math.random().toString(16);
                        boundary = `\r\n----${boundaryKey}\r\n`;
                        endData = `\r\n----${boundaryKey}--`;
                        filesLength = 0;

                        Object.keys(bodyFields).forEach(key => {
                            requestBody += `${boundary}Content-Disposition:form-data;name="${key}"\r\n\r\n${bodyFields[key]}`;
                        });

                        Object.keys(bodyFiles).forEach(key => {
                            requestBody += `${boundary}Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name="${key}";filename="${bodyFiles[key].name}"\r\nContent-Transfer-Encoding: binary\r\n\r\n`;
                            filesLength += Buffer.byteLength(requestBody, 'utf-8') + bodyFiles[key].size;
                        });

                        httpRequestOptions.headers['Content-Type'] = `multipart/form-data; boundary=--${boundaryKey}`;
                        httpRequestOptions.headers[`Content-Length`] = filesLength + Buffer.byteLength(endData);
                        return;
                    }
                }
                requestBody = JSON.stringify(ctx.request.body);
                httpRequestOptions.headers['Content-Length'] = Buffer.byteLength(requestBody);
            })();
        }

        const httpRequest = http.request(httpRequestOptions, response => {
            const chunks = [];
            response.on('data', chunk => {
                chunks.push(chunk);
                totallength += chunk.length;
            });

            response.on('end', () => {
                body = Buffer.concat(chunks, totallength);
                headers = response.headers;
                resolve({ headers, body: body });
            });
        });

        httpRequest.on('error', (e) => {
            console.log('Error with the request:', e);
            resolve({ headers, body: { errormsg: e.message, code: 555 } });
        });

        if (bodyFiles) {
            let fileKeyArray = Object.keys(bodyFiles);
            let uploadConnt = 0;
            fileKeyArray.forEach(key => {
                let frs = fs.createReadStream(bodyFiles[key].path);
                frs.on("err", (error) => {
                    console.log("发生错误", error);
                });
                frs.on('end', async () => {
                    await fs.promises.unlink(bodyFiles[key].path);
                    uploadConnt++;
                    if (uploadConnt == fileKeyArray.length) {
                        httpRequest.end(endData);
                    }
                });
                if (requestBody) {
                    httpRequest.write(requestBody);
                }
                frs.pipe(httpRequest, { end: false });
            });
        } else if (requestBody) {
            httpRequest.write(requestBody);
            httpRequest.end();
        } else {
            httpRequest.end();
        }
    });
};