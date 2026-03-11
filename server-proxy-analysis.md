# YAPI 服务器代理过程分析

## 1. 代理整体流程

YAPI 的代理功能主要通过以下几个模块实现：

1. **中间件拦截**：`mockServer.ts` 中间件拦截所有 `/mock/` 开头的请求
2. **代理判断**：根据接口配置或请求头决定是否启用代理
3. **请求处理**：`requestProxy.ts` 处理代理请求的构建和发送
4. **响应处理**：接收并转发代理服务器的响应

### 核心流程示意图

```
客户端 → YAPI 服务器 → 代理中间件 → 目标服务器 → 响应返回
```

## 2. 代理触发条件

代理功能在以下情况被触发：

1. **接口配置**：接口设置了 `isProxy` 为 true
2. **请求头**：请求中包含 `yapi-run-test` 头

## 3. 核心代码分析

### 3.1 代理中间件 (mockServer.ts)

```typescript
// 检查是否启用代理
const isRunWithYapiProxy = (() => {
  return (
    current_request_interface_data_in_yapi_db?.isProxy || ctx.headers["yapi-run-test"]
  );
})();

if (isRunWithYapiProxy) {
  // 获取代理环境配置
  const ENV_VAR = ((/* 获取对应的代理环境 */) => {
    return xU._.find(project.env, i => {
      try {
        const id = ObjectId(i._id).toString();
        return id === current_request_interface_data_in_yapi_db.witchEnv;
      } catch (error) {
        console.log("ERROR:获取对应的代理环境", error);
      }
      return false;
    });
  })();

  // 执行代理请求
  await setResponseByRunProxy(ctx, {
    project_id: project._id,
    ENV_VAR,
    yapiRun: ctx.headers["yapi-run-test"]
  });

  // 备份成功响应
  ifSuccessfulStoreResponse({
    ctx,
    modelInterface: orm.interface,
    interfaceData: current_request_interface_data_in_yapi_db
  });

  return;
}
```

### 3.2 代理请求处理 (setResponseByRunProxy)

```typescript
async function setResponseByRunProxy(ctx, { ENV_VAR, project_id }) {
  const { domain, header: ENV_VAR_HEADER_ARRAY } = ENV_VAR || {};
  const targetURL = ctx.originalUrl.replace(`/mock/${project_id}`, "");
  
  // 构建请求头
  const headers = (() => {
    if (xU._.isEmpty(ENV_VAR_HEADER_ARRAY)) {
      return { ...ctx.headers };
    }
    return xU._.reduce(
      ENV_VAR_HEADER_ARRAY,
      (_headers, { name, value }) => {
        if (!_headers[name]) {
          _headers[name] = value;
        }
        return _headers;
      },
      { ...ctx.headers }
    );
  })();

  // 解析代理路径和配置
  const [path, proxyHOST, proxyPORT] = (() => {
    let path, proxyHOST, proxyPORT;
    if (headers["yapi-run-test"]) {
      path = headers["yapi-run-test"];
    } else {
      path = `${domain}${targetURL}`;
    }

    if (headers["yapi-proxy-host"]) {
      proxyHOST = headers["yapi-proxy-host"];
    }

    if (headers["yapi-proxy-port"]) {
      proxyPORT = headers["yapi-proxy-port"];
    }

    return [path, proxyHOST, proxyPORT];
  })();

  // 执行代理请求
  let response;
  try {
    const ResponseThroghProxyOptions = {
      ctx,
      path,
      headers,
      host: proxyHOST,
      port: proxyPORT
    };
    response = await execProxyRequest(ResponseThroghProxyOptions);
  } catch (error) {
    console.error(error);
    // 错误处理
  }

  // 处理响应
  if (response) {
    body = response.body;
    // 设置响应头
    xU._.each(response.headers, (value, prop) => {
      if (prop === "transfer-encoding" || prop === "content-length") {
        return;
      }
      ctx.set(prop, value);
    });

    // 设置响应状态码
    if (response.statusCode) {
      ctx.status = response.statusCode;
    }
  }

  ctx.body = body || {};
  return ctx.body;
}
```

### 3.3 代理请求执行 (execProxyRequest)

```typescript
exports.execProxyRequest = function ({ ctx, headers, path, host, port }) {
  host = host === "undefined" ? "" : host;
  port = port === "undefined" ? "" : port;

  return new Promise(resolve => {
    let requestBody = "";
    let bodyFields;
    let bodyFiles;
    let boundaryKey;
    let boundary;
    let endData;
    let filesLength;

    // 删除 host 头
    delete ctx.request?.header.host;

    let request_url_obj = new URL(path);
    
    // 设置请求方法和头
    setOptions("method", ctx.request.method);
    setOptions("headers", headers);

    // 处理请求体
    const hasRequestBody = JSON.stringify(ctx.request?.body) != "{}";
    const CONTENT_TYPE = String(ctx.request?.header["content-type"] || "");

    // 根据内容类型处理请求体
    ((/* set headers properties */) => {
      if (!CONTENT_TYPE) {
        upsertHeader("content-type", "application/json");
      }
      if (!hasRequestBody) {
        return;
      }
      
      // 处理 JSON 和 x-www-form-urlencoded
      const isApplication = xU._.some([URLENCODED_LABEL, APPLICATION_JSON_LABEL], label =>
        CONTENT_TYPE.includes(label)
      );

      if (isApplication) {
        requestBody = JSON.stringify(ctx.request.body);
        upsertHeader("Content-Length", Buffer.byteLength(requestBody));
        return;
      }

      // 处理 multipart/form-data (文件上传)
      const isFormData = CONTENT_TYPE.includes(FORM_DATA_LABEL);
      if (isFormData) {
        // 处理文件上传逻辑
        // ...
      }

      // 默认处理
      requestBody = JSON.stringify(ctx.request.body);
      upsertHeader("Content-Length", Buffer.byteLength(requestBody));
    })();

    // 执行 HTTP 请求
    let httpRequest = execHttpRequest({ request_url_obj });

    // 发送请求体
    if (bodyFiles) {
      /* 文件上传 */
      handleFilesUpload({ bodyFiles, httpRequest, endData, requestBody });
    } else if (requestBody) {
      httpRequest.write(requestBody);
      httpRequest.end();
    } else {
      httpRequest.write("{}");
      httpRequest.end();
    }

    // 处理响应
    function onResponse(response) {
      const chunks = [];
      let totallength = 0;
      
      response.on("data", chunk => {
        chunks.push(chunk);
        totallength += chunk.length;
      });
      
      response.on("end", () => {
        resolve({
          httpRequestOptions: request_url_obj.headers,
          headers: response.headers,
          body: Buffer.concat(chunks, totallength),
          statusCode: response.statusCode
        });
      });
    }

    // 执行 HTTP 请求
    function execHttpRequest({ request_url_obj }) {
      const { method, headers, protocol } = request_url_obj;
      const isUseOtherHostProxy = host && port;

      try {
        // 处理 content-length 为 0 的情况
        if (!Number(headers["content-length"])) {
          delete headers["content-length"];
        }

        // 基础请求配置
        options = {
          method,
          headers,
          rejectUnauthorized: false // 忽略SSL证书验证
        };

        // 使用指定的代理服务器
        if (isUseOtherHostProxy) {
          return http.request(
            {
              host,
              port,
              path,
              method,
              headers
            },
            onResponse
          );
        }

        // 使用 HTTPS
        const isUseHttps = protocol === "https:";
        if (isUseHttps) {
          return https.request(new URL(path), options, onResponse);
        }

        // 默认使用 HTTP
        return http.request(request_url_obj, onResponse);
      } catch (error) {
        console.error("代理请求出错:", error);
        throw error;
      }
    }
  });
};
```

### 3.4 文件上传处理

```typescript
function handleFilesUpload({ bodyFiles, httpRequest, endData, requestBody }) {
  let fileKeyArray = Object.keys(bodyFiles);
  let uploadConnt = 0;

  function logError(error) {
    console.log("发生错误", error);
  }
  
  xU._.each(fileKeyArray, key => {
    async function handleUploadFileOnEnd() {
      await fs.promises.unlink(bodyFiles[key].path);
      uploadConnt++;
      if (uploadConnt == fileKeyArray.length) {
        httpRequest.end(endData);
      }
    }
    
    let frs = fs.createReadStream(bodyFiles[key].path);
    frs.on("err", logError);
    frs.on("end", handleUploadFileOnEnd);

    if (requestBody) {
      httpRequest.write(requestBody);
    }
    frs.pipe(httpRequest, { end: false });
  });
}
```

## 4. 代理配置方式

### 4.1 接口级配置

1. 在 YAPI 接口编辑页面，开启「启用代理」选项
2. 选择对应的「环境」，环境中需配置正确的域名

### 4.2 请求头配置

| 请求头 | 说明 | 示例 |
|-------|------|------|
| `yapi-run-test` | 直接指定代理目标URL | `https://api.example.com/user` |
| `yapi-proxy-host` | 指定代理服务器主机 | `127.0.0.1` |
| `yapi-proxy-port` | 指定代理服务器端口 | `8888` |

## 5. 代理支持的请求类型

1. **JSON**：`application/json`
2. **表单**：`application/x-www-form-urlencoded`
3. **文件上传**：`multipart/form-data`

## 6. 特殊处理

### 6.1 SSL 证书验证

默认忽略 SSL 证书验证：

```typescript
options = {
  method,
  headers,
  rejectUnauthorized: false // 忽略SSL证书验证
};
```

### 6.2 响应备份

当代理请求成功（状态码 200 且非 HTML 响应）时，会自动备份响应数据：

```typescript
async function ifSuccessfulStoreResponse({ ctx, modelInterface, interfaceData }) {
  if (interfaceData.resBackupJson) {
    return;
  }
  if (ctx.status != 200 || ["text/html"].includes(ctx.type)) {
    return;
  }

  // 备份响应数据
  const data = {};
  try {
    let res;
    if (Object.prototype.toString.call(ctx.body) === `[object Uint8Array]`) {
      res = JSON.parse(ctx.body.toString());
    } else if (typeof ctx.body === "object") {
      res = ctx.body;
    }

    if (xU._.isPlainObject(res)) {
      data.resBackupJson = JSON.stringify(res, null, 2);
      await modelInterface.up(interfaceData._id, data);
    }
  } catch (error) {
    xU.applog.error(error);
  }
}
```

## 7. 代理流程总结

1. **请求拦截**：`mockServer.ts` 中间件拦截 `/mock/` 开头的请求
2. **代理判断**：检查接口是否启用代理或是否有代理请求头
3. **环境配置**：获取项目环境配置中的域名和请求头
4. **请求构建**：
   - 解析目标 URL
   - 构建请求头
   - 处理请求体（支持 JSON、表单、文件上传）
5. **请求发送**：
   - 支持 HTTP/HTTPS
   - 支持指定代理服务器
   - 处理文件上传流
6. **响应处理**：
   - 接收并转发响应头
   - 接收并转发响应体
   - 设置响应状态码
7. **响应备份**：自动备份成功的响应数据

## 8. 代码优化建议

1. **错误处理增强**：
   - 增加更详细的错误日志
   - 对代理失败的情况提供更友好的错误信息

2. **性能优化**：
   - 考虑使用连接池管理 HTTP 请求
   - 对大文件上传进行分块处理

3. **安全性**：
   - 增加代理目标的白名单验证
   - 对敏感头信息进行过滤

4. **代码结构**：
   - 将代理逻辑拆分为更小的函数
   - 增加更多的注释和文档

## 9. 输入输出示例

### 输入：

```bash
# 启用代理的请求
curl -X POST "http://localhost:3000/mock/123/user/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "password": "123456"}'

# 使用请求头指定代理目标
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-run-test: https://api.example.com/api"

# 使用代理服务器
curl -X GET "http://localhost:3000/mock/123/api" \
  -H "yapi-run-test: https://api.example.com/api" \
  -H "yapi-proxy-host: 127.0.0.1" \
  -H "yapi-proxy-port: 8888"
```

### 输出：

```
# 成功响应
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

# 代理错误
{
  "code": 500,
  "message": "ResponseByRunProxy=>https://api.example.com/api"
}
```

## 10. 总结

YAPI 的代理功能通过 `mockServer.ts` 和 `requestProxy.ts` 实现，支持以下特性：

- **灵活的代理配置**：支持接口级配置和请求头配置
- **多种请求类型**：支持 JSON、表单和文件上传
- **协议支持**：同时支持 HTTP 和 HTTPS
- **代理服务器**：支持指定代理服务器
- **响应备份**：自动备份成功的响应数据
- **错误处理**：完善的错误处理机制

代理功能为 YAPI 提供了强大的接口测试能力，使开发者可以轻松地在开发环境中测试真实的 API 接口。