var http = require('http');
var fs = require('fs');

exports.getResponseThroghProxy = function ({ ctx, path, host, port }) {
    return new Promise(resolve => {
        delete ctx.request?.header.host;
        const options = {
            path,
            method: ctx.request.method,
            headers: ctx.request?.header
        };

        debugger;
        if (host && port && host != 'undefined' && port != 'undefined') {
            options.host = host;
            options.port = port;
        }

        let requestBody = ctx.request.body,
            body,
            headers,
            chunks = [],
            fileFields,
            files,
            boundaryKey,
            boundary,
            endData,
            filesLength,
            totallength = 0;

        if (requestBody) {
            (() => {
                if (ctx.request?.header['content-type']) {
                    if (ctx.request.header['content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
                        requestBody = JSON.stringify(ctx.request.body);
                        options.headers['Content-Length'] = Buffer.byteLength(requestBody);
                        return;
                    }

                    if (ctx.request.header['content-type'].indexOf('application/json') > -1) {
                        requestBody = JSON.stringify(ctx.request.body);
                        options.headers['Content-Length'] = Buffer.byteLength(requestBody);
                        return;
                    }


                    if (ctx.request.header['content-type'].indexOf('multipart/form-data') > -1) {
                        fileFields = ctx.request.body.fields;
                        files = ctx.request.body.files;
                        boundaryKey = Math.random().toString(16);
                        boundary = `\r\n----${boundaryKey}\r\n`;
                        endData = `\r\n----${boundaryKey}--`;
                        filesLength = 0;

                        Object.keys(fileFields).forEach(key => {
                            requestBody += `${boundary}Content-Disposition:form-data;name="${key}"\r\n\r\n${fileFields[key]}`;
                        });

                        Object.keys(files).forEach(key => {
                            requestBody += `${boundary}Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name="${key}";filename="${files[key].name}"\r\nContent-Transfer-Encoding: binary\r\n\r\n`;
                            filesLength += Buffer.byteLength(requestBody, 'utf-8') + files[key].size;
                        });

                        options.headers['Content-Type'] = `multipart/form-data; boundary=--${boundaryKey}`;
                        options.headers[`Content-Length`] = filesLength + Buffer.byteLength(endData);
                        return;
                    }
                }
                requestBody = JSON.stringify(ctx.request.body);
                options.headers['Content-Length'] = Buffer.byteLength(requestBody);
            })();
        }

        const req = http.request(options, res => {
            res.on('data', chunk => {
                chunks.push(chunk);
                totallength += chunk.length;
            });

            res.on('end', () => {
                body = Buffer.concat(chunks, totallength);
                headers = res.headers;
                resolve({ headers, body: body });
            });
        });

        if (requestBody) {
            req.write(requestBody);
        }

        if (fileFields) {
            let fileKeyArray = Object.keys(files);
            let uploadConnt = 0;
            fileKeyArray.forEach(key => {
                let fileStream = fs.createReadStream(files[key].path);
                fileStream.on('end', async () => {
                    await fs.promises.unlink(files[key].path);
                    uploadConnt++;
                    if (uploadConnt == fileKeyArray.length) {
                        req.end(endData);
                    }
                });
                fileStream.pipe(req, { end: false });
            });
        } else {
            req.end();
        }
    });
};