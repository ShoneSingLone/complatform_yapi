function requestParamsToObj(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return {};
  }
  let obj = {};
  arr.forEach(item => {
    obj[item.name] = "";
  });
  return obj;
}

// 数组去重
function unique(array, compare) {
  let hash = {};
  let arr = array.reduce(function (item, next) {
    hash[next[compare]] ? "" : (hash[next[compare]] = true && item.push(next));
    // console.log('item',item.project_id)
    return item;
  }, []);
  // 输出去重以后的project_id
  return arr.map(item => {
    return item[compare];
  });
}

module.exports = {
  tag: {
    description: "接口集管理"
  },
  paths: {
    "/col/list": {
      get: {
        summary: "获取所有接口集",
        description: "获取所有接口集",
        request: {
          query: {
            project_id: {
              required: true,
              description: "项目id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let id = ctx.payload.project_id;
            let project = await orm.project.getBaseInfo(id);
            if (project.project_type === "private") {
              if ((await this.checkAuth(project._id, "project", "view")) !== true) {
                return (ctx.body = xU.$response(null, 406, "没有权限"));
              }
            }
            let result = await orm.interfaceCol.list(id);
            result = result.sort((a, b) => {
              return a.index - b.index;
            });

            for (let i = 0; i < result.length; i++) {
              result[i] = result[i].toObject();
              let caseList = await orm.interfaceCase.list(result[i]._id);

              for (let j = 0; j < caseList.length; j++) {
                let item = caseList[j].toObject();
                let interfaceData = await orm.interface.getBaseinfo(item.interface_id);
                item.path = interfaceData.path;
                caseList[j] = item;
              }

              caseList = caseList.sort((a, b) => {
                return a.index - b.index;
              });
              result[i].caseList = caseList;
            }
            ctx.body = xU.$response(result);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/add_col": {
      post: {
        summary: "增加接口集",
        description: "增加接口集",
        request: {
          body: {
            project_id: {
              required: true,
              description: "项目id",
              type: "number"
            },
            name: {
              required: true,
              description: "名称",
              type: "string"
            },
            desc: {
              description: "描述",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            params = xU.ensureParamsType(params, {
              name: "string",
              project_id: "number",
              desc: "string"
            });

            if (!params.project_id) {
              return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
            }
            if (!params.name) {
              return (ctx.body = xU.$response(null, 400, "名称不能为空"));
            }

            let auth = await this.checkAuth(params.project_id, "project", "edit");
            if (!auth) {
              return (ctx.body = xU.$response(null, 400, "没有权限"));
            }

            let result = await orm.interfaceCol.save({
              name: params.name,
              project_id: params.project_id,
              desc: params.desc,
              uid: this.getUid(),
              add_time: xU.time(),
              up_time: xU.time()
            });
            let username = this.getUsername();
            xU.save_log({
              content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了接口集 <a href="/project/${params.project_id}/interface/col/${result._id}">${params.name}</a>`,
              type: "project",
              uid: this.getUid(),
              username: username,
              typeid: params.project_id
            });
            // orm.project.up(params.project_id,{up_time: new Date().getTime()}).then();
            ctx.body = xU.$response(result);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/case_list": {
      get: {
        summary: "获取一个接口集下的所有的测试用例",
        description: "获取一个接口集下的所有的测试用例",
        request: {
          query: {
            col_id: {
              required: true,
              description: "接口集id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let id = ctx.payload.col_id;
            if (!id || id == 0) {
              return (ctx.body = xU.$response(null, 407, "col_id不能为空"));
            }

            let colData = await orm.interfaceCol.get(id);
            let project = await orm.project.getBaseInfo(colData.project_id);
            if (project.project_type === "private") {
              if ((await this.checkAuth(project._id, "project", "view")) !== true) {
                return (ctx.body = xU.$response(null, 406, "没有权限"));
              }
            }

            ctx.body = await xU.getCaseList(id);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/case_env_list": {
      get: {
        summary: "获取一个接口集下的所有的测试用例的环境变量",
        description: "获取一个接口集下的所有的测试用例的环境变量",
        request: {
          query: {
            col_id: {
              required: true,
              description: "接口集id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let id = ctx.payload.col_id;
            if (!id || id == 0) {
              return (ctx.body = xU.$response(null, 407, "col_id不能为空"));
            }

            let colData = await orm.interfaceCol.get(id);
            let project = await orm.project.getBaseInfo(colData.project_id);
            if (project.project_type === "private") {
              if ((await this.checkAuth(project._id, "project", "view")) !== true) {
                return (ctx.body = xU.$response(null, 406, "没有权限"));
              }
            }

            // 通过col_id 找到 caseList
            let projectList = await orm.interfaceCase.list(id, "project_id");
            // 对projectList 进行去重处理
            projectList = unique(projectList, "project_id");

            // 遍历projectList 找到项目和env
            let projectEnvList = [];
            for (let i = 0; i < projectList.length; i++) {
              let result = await orm.project.getBaseInfo(projectList[i], "name  env");
              projectEnvList.push(result);
            }
            ctx.body = xU.$response(projectEnvList);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/case_list_by_var_params": {
      get: {
        summary: "获取一个接口集下的所有的测试用例（带变量参数）",
        description: "获取一个接口集下的所有的测试用例（带变量参数）",
        request: {
          query: {
            col_id: {
              required: true,
              description: "接口集id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let id = ctx.payload.col_id;
            if (!id || id == 0) {
              return (ctx.body = xU.$response(null, 407, "col_id不能为空"));
            }
            let resultList = await orm.interfaceCase.list(id, "all");
            if (resultList.length === 0) {
              return (ctx.body = xU.$response([]));
            }
            let project = await orm.project.getBaseInfo(resultList[0].project_id);

            if (project.project_type === "private") {
              if ((await this.checkAuth(project._id, "project", "view")) !== true) {
                return (ctx.body = xU.$response(null, 406, "没有权限"));
              }
            }

            for (let index = 0; index < resultList.length; index++) {
              let result = resultList[index].toObject();
              let item = {},
                body,
                query,
                bodyParams,
                pathParams;
              let data = await orm.interface.get(result.interface_id);
              if (!data) {
                await orm.interfaceCase.del(result._id);
                continue;
              }
              item._id = result._id;
              item.casename = result.casename;
              body = xU.json_parse(data.res_body);
              body = typeof body === "object" ? body : {};
              if (data.res_body_is_json_schema) {
                body = xU.schemaToJson(body, {
                  alwaysFakeOptionals: true
                });
              }
              item.body = Object.assign({}, body);
              query = requestParamsToObj(data.req_query);
              pathParams = requestParamsToObj(data.req_params);
              if (data.req_body_type === "form") {
                bodyParams = requestParamsToObj(data.req_body_form);
              } else {
                bodyParams = xU.json_parse(data.req_body_other);
                if (data.req_body_is_json_schema) {
                  bodyParams = xU.schemaToJson(bodyParams, {
                    alwaysFakeOptionals: true
                  });
                }
                bodyParams = typeof bodyParams === "object" ? bodyParams : {};
              }
              item.params = Object.assign(pathParams, query, bodyParams);
              item.index = result.index;
              resultList[index] = item;
            }

            ctx.body = xU.$response(resultList);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/add_case": {
      post: {
        summary: "增加一个测试用例",
        description: "增加一个测试用例",
        request: {
          body: {
            casename: {
              required: true,
              description: "用例名称",
              type: "string"
            },
            col_id: {
              required: true,
              description: "接口集id",
              type: "number"
            },
            project_id: {
              required: true,
              description: "项目id",
              type: "number"
            },
            interface_id: {
              required: true,
              description: "接口id",
              type: "number"
            },
            case_env: {
              description: "环境",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            params = xU.ensureParamsType(params, {
              casename: "string",
              project_id: "number",
              col_id: "number",
              interface_id: "number",
              case_env: "string"
            });

            if (!params.project_id) {
              return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
            }

            if (!params.interface_id) {
              return (ctx.body = xU.$response(null, 400, "接口id不能为空"));
            }

            let auth = await this.checkAuth(params.project_id, "project", "edit");
            if (!auth) {
              return (ctx.body = xU.$response(null, 400, "没有权限"));
            }

            if (!params.col_id) {
              return (ctx.body = xU.$response(null, 400, "接口集id不能为空"));
            }

            if (!params.casename) {
              return (ctx.body = xU.$response(null, 400, "用例名称不能为空"));
            }

            params.uid = this.getUid();
            params.index = 0;
            params.add_time = xU.time();
            params.up_time = xU.time();
            let result = await orm.interfaceCase.save(params);
            let username = this.getUsername();

            orm.interfaceCol.get(params.col_id).then(col => {
              xU.save_log({
                content: `<a href="/user/profile/${this.getUid()}">${username}</a> 在接口集 <a href="/project/${params.project_id}/interface/col/${params.col_id}">${col.name}</a> 下添加了测试用例 <a href="/project/${params.project_id}/interface/case/${result._id}">${params.casename}</a>`,
                type: "project",
                uid: this.getUid(),
                username: username,
                typeid: params.project_id
              });
            });
            orm.project.up(params.project_id, { up_time: new Date().getTime() }).then();

            ctx.body = xU.$response(result);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/add_case_list": {
      post: {
        summary: "批量添加测试用例",
        description: "批量添加测试用例",
        request: {
          body: {
            project_id: {
              required: true,
              description: "项目id",
              type: "number"
            },
            col_id: {
              required: true,
              description: "接口集id",
              type: "number"
            },
            interface_list: {
              required: true,
              description: "接口列表",
              type: "array",
              items: {
                type: "number"
              }
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            params = xU.ensureParamsType(params, {
              project_id: "number",
              col_id: "number"
            });
            if (!params.interface_list || !Array.isArray(params.interface_list)) {
              return (ctx.body = xU.$response(null, 400, "interface_list 参数有误"));
            }

            if (!params.project_id) {
              return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
            }

            let auth = await this.checkAuth(params.project_id, "project", "edit");
            if (!auth) {
              return (ctx.body = xU.$response(null, 400, "没有权限"));
            }

            if (!params.col_id) {
              return (ctx.body = xU.$response(null, 400, "接口集id不能为空"));
            }

            let data = {
              uid: this.getUid(),
              index: 0,
              add_time: xU.time(),
              up_time: xU.time(),
              project_id: params.project_id,
              col_id: params.col_id
            };

            for (let i = 0; i < params.interface_list.length; i++) {
              let interfaceData = await orm.interface.get(params.interface_list[i]);
              data.interface_id = params.interface_list[i];
              data.casename = interfaceData.title;

              // 处理json schema 解析
              if (
                interfaceData.req_body_type === "json" &&
                interfaceData.req_body_other &&
                interfaceData.req_body_is_json_schema
              ) {
                let req_body_other = xU.json_parse(interfaceData.req_body_other);
                req_body_other = xU.schemaToJson(req_body_other, {
                  alwaysFakeOptionals: true
                });

                data.req_body_other = JSON.stringify(req_body_other);
              } else {
                data.req_body_other = interfaceData.req_body_other;
              }

              data.req_body_type = interfaceData.req_body_type;
              let caseResultData = await orm.interfaceCase.save(data);
              let username = this.getUsername();
              orm.interfaceCol.get(params.col_id).then(col => {
                xU.save_log({
                  content: `<a href="/user/profile/${this.getUid()}">${username}</a> 在接口集 <a href="/project/${params.project_id}/interface/col/${params.col_id}">${col.name}</a> 下导入了测试用例 <a href="/project/${params.project_id}/interface/case/${caseResultData._id}">${data.casename}</a>`,
                  type: "project",
                  uid: this.getUid(),
                  username: username,
                  typeid: params.project_id
                });
              });
            }

            orm.project.up(params.project_id, { up_time: new Date().getTime() }).then();

            ctx.body = xU.$response("ok");
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/clone_case_list": {
      post: {
        summary: "克隆测试用例列表",
        description: "克隆测试用例列表",
        request: {
          body: {
            project_id: {
              required: true,
              description: "项目id",
              type: "number"
            },
            col_id: {
              required: true,
              description: "被克隆的接口集id",
              type: "number"
            },
            new_col_id: {
              required: true,
              description: "克隆的接口集id",
              type: "number"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            params = xU.ensureParamsType(params, {
              project_id: "number",
              col_id: "number",
              new_col_id: "number"
            });

            const { project_id, col_id, new_col_id } = params;

            if (!project_id) {
              return (ctx.body = xU.$response(null, 400, "项目id不能为空"));
            }

            let auth = await this.checkAuth(params.project_id, "project", "edit");

            if (!auth) {
              return (ctx.body = xU.$response(null, 400, "没有权限"));
            }

            if (!col_id) {
              return (ctx.body = xU.$response(null, 400, "被克隆的接口集id不能为空"));
            }

            if (!new_col_id) {
              return (ctx.body = xU.$response(null, 400, "克隆的接口集id不能为空"));
            }

            let oldColCaselistData = await orm.interfaceCase.list(col_id, "all");

            oldColCaselistData = oldColCaselistData.sort((a, b) => {
              return a.index - b.index;
            });

            const newCaseList = [];
            const oldCaseObj = {};
            let obj = {};

            const handleTypeParams = (data, name) => {
              let res = data[name];
              const type = Object.prototype.toString.call(res);
              if (type === "[object Array]" && res.length) {
                res = JSON.stringify(res);
                try {
                  res = JSON.parse(handleReplaceStr(res));
                } catch (e) {
                  console.log("e ->", e);
                }
              } else if (type === "[object String]" && data[name]) {
                res = handleReplaceStr(res);
              }
              return res;
            };

            const handleReplaceStr = str => {
              if (str.indexOf("$") !== -1) {
                str = str.replace(/\$\.([0-9]+)\./g, function (match, p1) {
                  p1 = p1.toString();
                  return `$.${newCaseList[oldCaseObj[p1]]}.` || "";
                });
              }
              return str;
            };

            // 处理数据里面的$id;
            const handleParams = data => {
              data.col_id = new_col_id;
              delete data._id;
              delete data.add_time;
              delete data.up_time;
              delete data.__v;
              data.req_body_other = handleTypeParams(data, "req_body_other");
              data.req_query = handleTypeParams(data, "req_query");
              data.req_params = handleTypeParams(data, "req_params");
              data.req_body_form = handleTypeParams(data, "req_body_form");
              return data;
            };

            for (let i = 0; i < oldColCaselistData.length; i++) {
              obj = oldColCaselistData[i].toObject();
              // 将被克隆的id和位置绑定
              oldCaseObj[obj._id] = i;
              let caseData = handleParams(obj);
              let newCase = await orm.interfaceCase.save(caseData);
              newCaseList.push(newCase._id);
            }

            orm.project.up(params.project_id, { up_time: new Date().getTime() }).then();
            ctx.body = xU.$response("ok");
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/up_case": {
      post: {
        summary: "更新一个测试用例",
        description: "更新一个测试用例",
        request: {
          body: {
            id: {
              required: true,
              description: "用例id",
              type: "number"
            },
            casename: {
              description: "用例名称",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            params = xU.ensureParamsType(params, {
              id: "number",
              casename: "string"
            });

            if (!params.id) {
              return (ctx.body = xU.$response(null, 400, "用例id不能为空"));
            }

            // if (!params.casename) {
            //   return (ctx.body = xU.$response(null, 400, '用例名称不能为空'));
            // }

            let caseData = await orm.interfaceCase.get(params.id);
            let auth = await this.checkAuth(caseData.project_id, "project", "edit");
            if (!auth) {
              return (ctx.body = xU.$response(null, 400, "没有权限"));
            }

            params.uid = this.getUid();

            //不允许修改接口id和项目id
            delete params.interface_id;
            delete params.project_id;
            let result = await orm.interfaceCase.up(params.id, params);
            let username = this.getUsername();
            orm.interfaceCol.get(caseData.col_id).then(col => {
              xU.save_log({
                content: `<a href="/user/profile/${this.getUid()}">${username}</a> 在接口集 <a href="/project/${caseData.project_id}/interface/col/${caseData.col_id}">${col.name}</a> 更新了测试用例 <a href="/project/${caseData.project_id}/interface/case/${params.id}">${params.casename || caseData.casename}</a>`,
                type: "project",
                uid: this.getUid(),
                username: username,
                typeid: caseData.project_id
              });
            });

            orm.project.up(caseData.project_id, { up_time: new Date().getTime() }).then();

            ctx.body = xU.$response(result);
          } catch (e) {
            ctx.body = xU.$response(null, 402, e.message);
          }
        }
      }
    },
    "/col/case": {
      get: {
        summary: "获取一个测试用例详情",
        description: "获取一个测试用例详情",
        request: {
          query: {
            caseid: {
              required: true,
              description: "用例id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let id = ctx.payload.caseid;
            let result = await orm.interfaceCase.get(id);
            if (!result) {
              return (ctx.body = xU.$response(null, 400, "不存在的case"));
            }
            result = result.toObject();
            let data = await orm.interface.get(result.interface_id);
            if (!data) {
              return (ctx.body = xU.$response(null, 400, "找不到对应的接口，请联系管理员"));
            }
            data = data.toObject();

            let projectData = await orm.project.getBaseInfo(data.project_id);
            result.path = projectData.basepath + data.path;
            result.method = data.method;
            result.req_body_type = data.req_body_type;
            result.req_headers = xU.handleParamsValue(data.req_headers, result.req_headers);
            result.res_body = data.res_body;
            result.res_body_type = data.res_body_type;
            result.req_body_form = xU.handleParamsValue(data.req_body_form, result.req_body_form);
            result.req_query = xU.handleParamsValue(data.req_query, result.req_query);
            result.req_params = xU.handleParamsValue(data.req_params, result.req_params);
            result.interface_up_time = data.up_time;
            result.req_body_is_json_schema = data.req_body_is_json_schema;
            result.res_body_is_json_schema = data.res_body_is_json_schema;
            ctx.body = xU.$response(result);
          } catch (e) {
            ctx.body = xU.$response(null, 400, e.message);
          }
        }
      }
    },
    "/col/up_col": {
      post: {
        summary: "更新一个接口集name或描述",
        description: "更新一个接口集name或描述",
        request: {
          body: {
            col_id: {
              required: true,
              description: "接口集id",
              type: "string"
            },
            name: {
              description: "名称",
              type: "string"
            },
            desc: {
              description: "描述",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            let id = params.col_id;
            if (!id) {
              return (ctx.body = xU.$response(null, 400, "缺少 col_id 参数"));
            }
            let colData = await orm.interfaceCol.get(id);
            if (!colData) {
              return (ctx.body = xU.$response(null, 400, "不存在"));
            }
            let auth = await this.checkAuth(colData.project_id, "project", "edit");
            if (!auth) {
              return (ctx.body = xU.$response(null, 400, "没有权限"));
            }
            delete params.col_id;
            let result = await orm.interfaceCol.up(id, params);
            let username = this.getUsername();
            xU.save_log({
              content: `<a href="/user/profile/${this.getUid()}">${username}</a> 更新了测试集合 <a href="/project/${colData.project_id}/interface/col/${id}">${colData.name}</a> 的信息`,
              type: "project",
              uid: this.getUid(),
              username: username,
              typeid: colData.project_id
            });

            ctx.body = xU.$response(result);
          } catch (e) {
            ctx.body = xU.$response(null, 400, e.message);
          }
        }
      }
    },
    "/col/up_case_index": {
      post: {
        summary: "更新多个接口case index",
        description: "更新多个接口case index",
        request: {
          body: {
            id: {
              required: true,
              description: "用例id",
              type: "number"
            },
            index: {
              required: true,
              description: "索引",
              type: "number"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            if (!params || !Array.isArray(params)) {
              ctx.body = xU.$response(null, 400, "请求参数必须是数组");
            }
            params.forEach(item => {
              if (item.id) {
                orm.interfaceCase.upCaseIndex(item.id, item.index).then(
                  res => {},
                  err => {
                    xU.applog.error(err.message);
                  }
                );
              }
            });

            return (ctx.body = xU.$response("成功！"));
          } catch (e) {
            ctx.body = xU.$response(null, 400, e.message);
          }
        }
      }
    },
    "/col/up_col_index": {
      post: {
        summary: "更新多个测试集合 index",
        description: "更新多个测试集合 index",
        request: {
          body: {
            id: {
              required: true,
              description: "接口集id",
              type: "number"
            },
            index: {
              required: true,
              description: "索引",
              type: "number"
            }
          }
        },
        async handler(ctx) {
          try {
            let params = ctx.payload;
            if (!params || !Array.isArray(params)) {
              ctx.body = xU.$response(null, 400, "请求参数必须是数组");
            }
            params.forEach(item => {
              if (item.id) {
                orm.interfaceCol.upColIndex(item.id, item.index).then(
                  res => {},
                  err => {
                    xU.applog.error(err.message);
                  }
                );
              }
            });

            return (ctx.body = xU.$response("成功！"));
          } catch (e) {
            ctx.body = xU.$response(null, 400, e.message);
          }
        }
      }
    },
    "/col/del_col": {
      get: {
        summary: "删除一个接口集",
        description: "删除一个接口集",
        request: {
          query: {
            col_id: {
              required: true,
              description: "接口集id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let id = ctx.payload.col_id;
            let colData = await orm.interfaceCol.get(id);
            if (!colData) {
              ctx.body = xU.$response(null, 400, "不存在的id");
            }

            if (colData.uid !== this.getUid()) {
              let auth = await this.checkAuth(colData.project_id, "project", "danger");
              if (!auth) {
                return (ctx.body = xU.$response(null, 400, "没有权限"));
              }
            }
            let result = await orm.interfaceCol.del(id);
            await orm.interfaceCase.delByCol(id);
            let username = this.getUsername();
            xU.save_log({
              content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了接口集 ${colData.name} 及其下面的接口`,
              type: "project",
              uid: this.getUid(),
              username: username,
              typeid: colData.project_id
            });
            return (ctx.body = xU.$response(result));
          } catch (e) {
            xU.$response(null, 400, e.message);
          }
        }
      }
    },
    "/col/del_case": {
      get: {
        summary: "删除一个测试用例",
        description: "删除一个测试用例",
        request: {
          query: {
            caseid: {
              required: true,
              description: "用例id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          try {
            let caseid = ctx.payload.caseid;
            let caseData = await orm.interfaceCase.get(caseid);
            if (!caseData) {
              ctx.body = xU.$response(null, 400, "不存在的caseid");
            }

            if (caseData.uid !== this.getUid()) {
              let auth = await this.checkAuth(caseData.project_id, "project", "danger");
              if (!auth) {
                return (ctx.body = xU.$response(null, 400, "没有权限"));
              }
            }

            let result = await orm.interfaceCase.del(caseid);

            let username = this.getUsername();
            orm.interfaceCol.get(caseData.col_id).then(col => {
              xU.save_log({
                content: `<a href="/user/profile/${this.getUid()}">${username}</a> 删除了接口集 <a href="/project/${caseData.project_id}/interface/col/${caseData.col_id}">${col.name}</a> 下的接口 ${caseData.casename}`,
                type: "project",
                uid: this.getUid(),
                username: username,
                typeid: caseData.project_id
              });
            });

            orm.project.up(caseData.project_id, { up_time: new Date().getTime() }).then();
            return (ctx.body = xU.$response(result));
          } catch (e) {
            xU.$response(null, 400, e.message);
          }
        }
      }
    },
    "/col/run_case_script": {
      post: {
        summary: "运行测试用例脚本",
        description: "运行测试用例脚本",
        request: {
          body: {
            col_id: {
              description: "接口集id",
              type: "string"
            },
            interface_id: {
              description: "接口id",
              type: "string"
            }
          }
        },
        async handler(ctx) {
          let params = ctx.payload;
          ctx.body = await xU.runCaseScript(
            params,
            params.col_id,
            params.interface_id,
            this.getUid()
          );
        }
      }
    }
  }
};
