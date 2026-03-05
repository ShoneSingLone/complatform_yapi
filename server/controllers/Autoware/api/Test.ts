const fs = require('fs');
const path = require('path');

module.exports = {
  definitions: {},
  tag: {
    description: '测试'
  },
  paths: {
    '/test/get': {
      get: {
        summary: '测试 get',
        description: '测试 get',
        request: {
          query: {}
        },
        async handler(ctx) {
          try {
            let query = ctx.query;
            // cookie 检测
            ctx.cookies.set("_uid", 12, {
              expires: xU.expireDate(7),
              httpOnly: true
            });
            ctx.body = xU.$response(query);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/http/code': {
      get: {
        summary: '测试 code',
        description: '测试 code',
        request: {
          query: {
            code: {
              description: 'HTTP 状态码',
              type: 'string'
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.request.body;
            ctx.status = +ctx.query.code || 200;
            ctx.body = xU.$response(params);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/post': {
      post: {
        summary: '测试 post',
        description: '测试 post',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            let params = ctx.request.body;
            ctx.body = xU.$response(params);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/single/upload': {
      post: {
        summary: '测试 单文件上传',
        description: '测试 单文件上传',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            // let params = ctx.request.body;
            let req = ctx.req;

            let chunks = [],
              size = 0;
            req.on("data", function (chunk) {
              chunks.push(chunk);
              size += chunk.length;
            });

            req.on("finish", function () {
              console.log(34343);
            });

            req.on("end", function () {
              let data = new Buffer(size);
              for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
                let chunk = chunks[i];
                chunk.copy(data, pos);
                pos += chunk.length;
              }
              fs.writeFileSync(path.join(xU.var.APP_ROOT_DIR, "test.text"), data, function (err) {
                return (ctx.body = xU.$response(null, 402, "写入失败"));
              });
            });

            ctx.body = xU.$response({ res: "上传成功" });
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/files/upload': {
      post: {
        summary: '测试 文件上传',
        description: '测试 文件上传',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            let file = ctx.request.body.files.file;
            let newPath = path.join(xU.var.APP_ROOT_DIR, "test.text");
            fs.renameSync(file.path, newPath);
            ctx.body = xU.$response({ res: "上传成功" });
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/put': {
      put: {
        summary: '测试 put',
        description: '测试 put',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            let params = ctx.request.body;
            ctx.body = xU.$response(params);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/delete': {
      delete: {
        summary: '测试 delete',
        description: '测试 delete',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            let body = ctx.request.body;
            ctx.body = xU.$response(body);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/head': {
      head: {
        summary: '测试 head',
        description: '测试 head',
        request: {
          query: {}
        },
        async handler(ctx) {
          try {
            let query = ctx.query;
            ctx.body = xU.$response(query);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/options': {
      options: {
        summary: '测试 options',
        description: '测试 options',
        request: {
          query: {}
        },
        async handler(ctx) {
          try {
            let query = ctx.query;
            ctx.body = xU.$response(query);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/patch': {
      patch: {
        summary: '测试 patch',
        description: '测试 patch',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            let params = ctx.request.body;
            ctx.body = xU.$response(params);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/raw': {
      post: {
        summary: '测试 raw',
        description: '测试 raw',
        request: {
          body: {}
        },
        async handler(ctx) {
          try {
            let params = ctx.request.body;
            ctx.body = xU.$response(params);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    '/test/response': {
      get: {
        summary: '测试返回值',
        description: '测试返回值',
        request: {
          query: {}
        },
        async handler(ctx) {
          try {
            // let result = `<div><h2>12222222</h2></div>`;
            // let result = `wieieieieiieieie`
            let result = { b: "12", c: "23" };
            ctx.set("Access-Control-Allow-Origin", "*");
            ctx.set("Content-Type", "text");
            console.log(ctx.response);
            ctx.body = result;
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    }
  }
};