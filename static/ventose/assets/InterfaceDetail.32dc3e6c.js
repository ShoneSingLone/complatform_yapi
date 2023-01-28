import { d as defineComponent, g as _State_App, x as xU, e as createVNode, r as resolveComponent, y as withDirectives, z as resolveDirective, F as FormRules, n as Fragment, b as API, M as Methods_App, U as UI, h as createTextVNode, a as defItem, p as pickValueFrom, H as diff, s as setValueTo, v as validateForm, A as AllWasWell, I as ITEM_OPTIONS, J as defXVirTableConfigs, K as defCol, L as ITEM_OPTIONS_VDOM, N as inject, O as h, Q as components, q as markRaw, $, R as lib, B as compositionAPI, T as MonacoEditor, V as HTTP_REQUEST_HEADER, W as compileVNode, X as QUERY, Y as GET, Z as HTTP_METHOD, a0 as BODY, S as State_UI, a1 as defineAsyncComponent, k as isVNode, j as State_Project, a2 as VNodeCollection, a3 as _$handlePath, C as Cpt_url, m as Methods_Project, a4 as defDataGridOption, a5 as copyToClipboard, a6 as makeAhref, a7 as InfoCard } from "./index.3878cc77.js";
function makeKeyValueObj(i) {
  return {
    key: i.name,
    value: i.value
  };
}
function makeNameValueObj(i) {
  return {
    name: i.key,
    value: i.value
  };
}
function orderAsc(a, b) {
  return a - b < 0 ? -1 : 1;
}
const InputKeyValue = defineComponent({
  props: [
    "items",
    "genItem",
    "fnCheck"
  ],
  emits: ["update:items"],
  setup() {
    return {
      State_App: _State_App
    };
  },
  data() {
    return {
      privateItems: {},
      isLoading: true
    };
  },
  watch: {
    formData() {
      this.isLoading = true;
      this.checkFormDataDebounce();
    }
  },
  mounted() {
    this.setPrivateItems();
  },
  computed: {
    formData() {
      const formData = xU.reduce(this.privateItems, (formData2, privateTag, prop) => {
        formData2[prop] = {
          key: privateTag.keyConfigs.value,
          value: privateTag.valueConfigs.value
        };
        return formData2;
      }, {});
      return formData;
    },
    vDomItems() {
      const vDomItems = xU.map(this.privateItems, ({
        valueConfigs,
        keyConfigs,
        _id
      }, index) => {
        return createVNode("div", {
          "class": "flex mt10 baseline",
          "key": index
        }, [createVNode(resolveComponent("xItem"), {
          "configs": keyConfigs
        }, null), createVNode(resolveComponent("xGap"), {
          "l": "10"
        }, null), createVNode("span", {
          "class": "flex middle"
        }, [createVNode(resolveComponent("xItem"), {
          "configs": valueConfigs
        }, null), createVNode(resolveComponent("xGap"), {
          "l": "10"
        }, null), withDirectives(createVNode(resolveComponent("xIcon"), {
          "icon": "delete",
          "onClick": () => this.deleteItem(index),
          "style": "color:red;",
          "class": "pointer"
        }, null), [[resolveDirective("loading"), this.isLoading]])])]);
      });
      return vDomItems;
    }
  },
  methods: {
    setPrivateItems() {
      const {
        items
      } = this;
      if (xU.isArrayFill(items)) {
        let index = 1;
        this.privateItems = xU.reduce(items, (_items, tag) => {
          _items[index] = this.genItem({
            ...tag,
            index
          });
          ++index;
          return _items;
        }, {});
      } else {
        this.privateItems = {
          0: this.genItem({
            index: 0
          })
        };
      }
    },
    checkFormDataDebounce: xU.debounce(function() {
      if (this.isFormDataOk()) {
        const keys = Object.keys(this.formData).map(Number).sort(orderAsc);
        const value = xU.reduce(keys, (_value, prop) => {
          const item = this.formData[prop];
          if (xU.isInput(item.key)) {
            _value.push(item);
          }
          return _value;
        }, []);
        this.$emit("update:items", value);
      }
      this.isLoading = false;
    }, 1e3),
    isFormDataOk() {
      const res = xU.map(this.formData, ({
        key
      }, prop) => {
        if (xU.some(this.formData, ({
          key: _key
        }, _index) => {
          if (_index == prop) {
            return false;
          } else {
            return _key === key;
          }
        })) {
          this.privateItems[prop].keyConfigs.itemTips = {
            type: "error",
            msg: `${key} \u4E0E\u5DF2\u6709\u6807\u8BC6\u91CD\u590D`
          };
          return FormRules.FAIL;
        } else {
          if (this.fnCheck) {
            const isFail = this.fnCheck(this.privateItems[prop]);
            if (isFail == FormRules.FAIL) {
              return FormRules.FAIL;
            }
          }
          this.privateItems[prop].keyConfigs.itemTips = {
            type: "",
            msg: ""
          };
          return FormRules.SUCCESS;
        }
      });
      return !xU.some(res, (i) => i === FormRules.FAIL);
    },
    deleteItem(index) {
      const keys = Object.keys(this.privateItems);
      if (keys.length === 1) {
        const prop = keys[0];
        this.privateItems[prop].keyConfigs.value = "";
        this.privateItems[prop].valueConfigs.value = "";
      } else {
        delete this.privateItems[index];
      }
    },
    addItem() {
      const keys = Object.keys(this.privateItems).map(Number).sort(orderAsc);
      const nextIndex = Number(xU.last(keys)) + 1;
      this.privateItems[nextIndex] = this.genItem({
        index: nextIndex
      });
    }
  },
  render() {
    const vm = this;
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "ml10 mr10"
    }, [this.vDomItems]), withDirectives(createVNode(resolveComponent("xIcon"), {
      "icon": "add",
      "style": "color:#1890ff;",
      "onClick": this.addItem,
      "class": "pointer mt10 ml10 mb10"
    }, null), [[resolveDirective("loading"), vm.isLoading]])]);
  }
});
function genTag(name, desc, index) {
  return {
    nameConfigs: defItem.item({
      prop: "name" + index,
      placeholder: "tag\u540D\u79F0",
      value: name
    }),
    descConfigs: defItem.item({
      prop: "desc" + index,
      placeholder: "tag\u63CF\u8FF0\u4FE1\u606F",
      value: desc
    })
  };
}
const DialogUpsertTags = defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  setup() {
    return {
      State_App: _State_App
    };
  },
  data() {
    return {
      privateTags: {}
    };
  },
  watch: {
    formData() {
      this.checkFormDataDebounce();
    },
    "State_App.currProject.tag": {
      immediate: true,
      handler(tags) {
        tags = xU.cloneDeep(tags);
        if (xU.isArrayFill(tags)) {
          let index = 0;
          this.privateTags = xU.reduce(tags, (tags2, tag) => {
            tags2[index] = genTag(tag.name, tag.desc, index);
            ++index;
            return tags2;
          }, {});
        } else {
          this.privateTags = {
            0: genTag("", "", 0)
          };
        }
      }
    }
  },
  computed: {
    propProjectId() {
      if (this.State_App.currProject._id) {
        return this.State_App.currProject._id;
      } else {
        alert("miss projectId");
      }
    },
    formData() {
      const formData = xU.reduce(this.privateTags, (formData2, privateTag, index) => {
        formData2[index] = {
          name: privateTag.nameConfigs.value,
          desc: privateTag.descConfigs.value
        };
        console.log(formData2, privateTag, index);
        return formData2;
      }, {});
      return formData;
    }
  },
  methods: {
    checkFormDataDebounce: xU.debounce(function() {
      this.isFormDataOk();
    }, 1e3),
    isFormDataOk() {
      const res = xU.map(this.formData, ({
        name
      }, index) => {
        if (xU.some(this.formData, ({
          name: _name
        }, _index) => {
          if (_index == index) {
            return false;
          } else {
            return _name === name;
          }
        })) {
          this.privateTags[index].nameConfigs.itemTips = {
            type: "error",
            msg: `${name} \u4E0E\u5DF2\u6709\u6807\u8BC6\u91CD\u590D`
          };
          return FormRules.FAIL;
        } else {
          this.privateTags[index].nameConfigs.itemTips = {
            type: "",
            msg: ""
          };
          return FormRules.SUCCESS;
        }
      });
      return !xU.some(res, (i) => i === FormRules.FAIL);
    },
    deleteTag(index) {
      const keys = Object.keys(this.privateTags);
      if (keys.length === 1) {
        this.privateTags = {
          0: genTag("", "", 0)
        };
      } else {
        delete this.privateTags[index];
      }
    },
    addTag() {
      const keys = Object.keys(this.privateTags).map(Number).sort(orderAsc);
      const nextIndex = xU.last(keys) + 1;
      this.privateTags[nextIndex] = genTag("", "", nextIndex);
    },
    async onOk() {
      if (this.isFormDataOk()) {
        const data = {
          id: this.propProjectId,
          tag: xU.map(this.formData, (item) => item)
        };
        await API.project.updateTags(data);
        await Methods_App.setCurrProject(this.propProjectId, {
          isEnforce: true
        });
        UI.message.success("Tag\u4FEE\u6539\u6210\u529F");
        this.propDialogOptions.closeDialog();
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex1",
      "style": "max-height:500px;overflow:auto;"
    }, [xU.map(this.privateTags, (data, index) => {
      const {
        descConfigs,
        nameConfigs
      } = data || {};
      return createVNode("div", {
        "class": "flex baseline mt10 margin10 ",
        "key": index
      }, [createVNode(resolveComponent("xItem"), {
        "configs": nameConfigs
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode("span", {
        "class": "flex middle"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": descConfigs
      }, null), createVNode(resolveComponent("xGap"), {
        "l": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "onClick": () => this.deleteTag(index),
        "class": "flex middle"
      }, {
        default: () => [createVNode(resolveComponent("xIcon"), {
          "icon": "delete"
        }, null)]
      })])]);
    })]), createVNode(resolveComponent("xDialogFooter"), null, {
      default: () => [createVNode(resolveComponent("xButton"), {
        "onClick": this.addTag,
        "class": "flex middle"
      }, {
        default: () => [createVNode(resolveComponent("xIcon"), {
          "icon": "add"
        }, null), createTextVNode(" \u6DFB\u52A0\u65B0\u7684Tag")]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "cancel",
          onClick: this.propDialogOptions.closeDialog
        }
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "save",
          onClick: this.onOk
        }
      }, null)]
    })]);
  }
});
const DialogUpsertProxyEnv = defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  setup() {
    return {
      State_App: _State_App
    };
  },
  data() {
    const vm = this;
    return {
      isLoading: true,
      privateEnv: {},
      currentSelected: "",
      configsForm: {
        ...defItem({
          label: "\u73AF\u5883\u540D\u79F0",
          prop: "name"
        }),
        ...defItem({
          label: "\u73AF\u5883\u57DF\u540D",
          prop: "domain",
          slots: {
            addonBefore: () => createVNode(resolveComponent("xItem"), {
              "configs": vm.configsForm.protocol
            }, null)
          },
          rules: [FormRules.custom({
            validator(value, {
              rule
            }) {
              if (value.length === 0) {
                rule.msg = "\u8BF7\u8F93\u5165\u73AF\u5883\u57DF\u540D!";
                return FormRules.FAIL;
              } else if (/\s/.test(value)) {
                rule.msg = "\u73AF\u5883\u57DF\u540D\u4E0D\u5141\u8BB8\u51FA\u73B0\u7A7A\u683C!";
                return FormRules.FAIL;
              } else {
                rule.msg = "";
                return FormRules.SUCCESS;
              }
            }
          })]
        }),
        ...defItem({
          prop: "protocol",
          itemType: "Select",
          options: ITEM_OPTIONS.httpProtocol,
          style: "width:100px;"
        }),
        ...defItem({
          value: [],
          label: "Header",
          prop: "header",
          itemType: KeyValuePanel,
          fnCheck(configs) {
            if (configs.keyConfigs.value === "Cookie") {
              configs.keyConfigs.itemTips = {
                type: "error",
                msg: `key \u4E0D\u80FD\u4E3A Cookie`
              };
              return FormRules.FAIL;
            } else {
              return FormRules.SUCCESS;
            }
          },
          genItem(args) {
            const {
              index,
              key,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem.item({
                prop: "key" + index,
                placeholder: "Header\u540D\u79F0",
                value: key || ""
              }),
              valueConfigs: defItem.item({
                prop: "value" + index,
                placeholder: "Header\u503C",
                value: value || ""
              })
            };
          }
        }),
        ...defItem({
          value: [],
          label: "Cookie",
          prop: "cookie",
          itemType: KeyValuePanel,
          genItem(args) {
            const {
              index,
              key,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem.item({
                prop: "key" + index,
                placeholder: "Cookie\u540D\u79F0",
                value: key || ""
              }),
              valueConfigs: defItem.item({
                prop: "value" + index,
                placeholder: "Cookie\u503C",
                value: value || ""
              })
            };
          }
        }),
        ...defItem({
          value: [],
          label: "global",
          prop: "global",
          itemType: KeyValuePanel,
          genItem(args) {
            const {
              index,
              key,
              value
            } = args;
            return {
              _id: index,
              keyConfigs: defItem.item({
                prop: "key" + index,
                placeholder: "global\u540D\u79F0",
                value: key || ""
              }),
              valueConfigs: defItem.item({
                prop: "value" + index,
                placeholder: "global\u503C",
                value: value || ""
              })
            };
          }
        })
      }
    };
  },
  watch: {
    "State_App.currProject.env": {
      immediate: true,
      handler(env) {
        if (!env) {
          return;
        }
        this.privateEnv = xU.cloneDeep(env);
        let currentSelected = false;
        if (this.raw$EnvId) {
          currentSelected = xU.find(this.privateEnv, {
            _id: this.raw$EnvId
          });
          this.raw$EnvId = false;
        }
        if (!currentSelected) {
          currentSelected = xU.first(this.privateEnv);
        }
        if (currentSelected) {
          this.switchEvn(currentSelected, {
            isEnforce: true
          });
        }
      }
    },
    currentSelected: {
      immediate: true,
      handler() {
        this.isLoading = true;
        this.setFormValues();
      }
    }
  },
  computed: {
    propProjectId() {
      if (this.State_App.currProject._id) {
        return this.State_App.currProject._id;
      } else {
        alert("miss projectId");
      }
    },
    vDomLeftSide() {
      return createVNode("div", {
        "class": "env-list flex vertical flex1 width100 overflow-auto height100 "
      }, [xU.map(this.privateEnv, (i) => {
        const className = i._id === this.currentSelected._id ? "delete-env-btn active" : "delete-env-btn";
        const fnDelete = (() => {
          if (/^new_env/.test(i._id)) {
            return async () => {
              try {
                await UI.dialog.confirm({
                  content: `\u5220\u9664\u73AF\u5883\u53D8\u91CF${i.name}?`
                });
                const envIndex = xU.findIndex(this.privateEnv, {
                  _id: i._id
                });
                this.privateEnv.splice(envIndex, 1);
              } catch (error) {
              }
            };
          }
          return async () => this.deleteEnv(i);
        })();
        return createVNode(resolveComponent("aButton"), {
          "type": "text",
          "onClick": () => this.switchEvn(i),
          "class": className
        }, {
          default: () => [createVNode("div", {
            "class": "flex middle"
          }, [withDirectives(createVNode("div", {
            "class": "flex1 ellipsis",
            "style": "text-align:left;"
          }, [i.name]), [[resolveDirective("uiPopover"), {
            onlyEllipsis: true,
            placement: "left"
          }]]), createVNode(resolveComponent("xIcon"), {
            "icon": "delete",
            "class": "delete-env-icon",
            "onClick": fnDelete
          }, null)])]
        });
      })]);
    },
    xDomSaveButton() {
      return createVNode(resolveComponent("xButton"), {
        "configs": {
          preset: "save",
          onClick: this.onOk
        },
        "class": "ml10"
      }, null);
    },
    vdomEnvconfigs() {
      const vDomContent = (() => {
        if (this.isLoading) {
          return createVNode(resolveComponent("aSpin"), {
            "spinning": true,
            "class": "ant-spin ant-spin-spinning flex middle center height100 width100"
          }, null);
        }
        return createVNode(resolveComponent("xForm"), {
          "labelStyle": {
            "text-align": "left",
            width: "80px",
            padding: "0 8px"
          }
        }, {
          default: () => [createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.name
          }, {
            afterControll: this.xDomSaveButton
          }), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.domain
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.global
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.header
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null), createVNode(resolveComponent("xItem"), {
            "configs": this.configsForm.cookie
          }, null), createVNode(resolveComponent("xGap"), {
            "t": "10"
          }, null)]
        });
      })();
      return createVNode("div", {
        "class": "env-configs flex1 padding10 ant-card ant-card-bordered overflow-auto"
      }, [vDomContent]);
    }
  },
  methods: {
    async switchEvn(envItem, options = {}) {
      const continu = () => {
        this.currentSelected = envItem;
        this.raw$EnvId = envItem._id;
      };
      const isEnforce = options.isEnforce || false;
      if (isEnforce) {
        continu();
        return;
      }
      const rightData = pickValueFrom(this.configsForm);
      var delta = diff(this.leftData, rightData);
      const keys = Object.keys(delta || {});
      if (keys.length > 0) {
        try {
          await UI.dialog.confirm({
            content: "\u6709\u672A\u4FDD\u5B58\u7684\u4FEE\u6539\uFF0C\u5207\u6362\u4E4B\u540E\u5C06\u88AB\u653E\u5F03"
          });
          continu();
        } catch (e) {
        }
      } else {
        continu();
      }
    },
    setFormValues() {
      const item = xU.cloneDeep(this.currentSelected || []);
      item.name = item.name || "";
      item.protocol = (() => item.domain ? item.domain.split("//")[0] + "//" : "http://")();
      item.domain = (() => item.domain ? item.domain.split("//")[1] : "")();
      const cookieIndex = xU.findIndex(item.header, {
        name: "Cookie"
      });
      if (~cookieIndex) {
        const cookieString = item.header.splice(cookieIndex, 1)[0].value;
        if (cookieString.length > 2) {
          item.cookie = cookieString.split(";").map((i) => {
            if (i) {
              const [key, value] = i.split("=");
              return {
                key,
                value
              };
            }
          });
        }
      } else {
        item.cookie = [];
      }
      item.header = xU.map(item.header || [], makeKeyValueObj);
      item.global = xU.map(item.global || [], makeKeyValueObj);
      setValueTo(this.configsForm, item);
      this.leftData = pickValueFrom(this.configsForm);
      setTimeout(() => {
        this.isLoading = false;
      }, 64);
    },
    async onOk() {
      const validateResults = await validateForm(this.configsForm);
      if (!AllWasWell(validateResults)) {
        return;
      }
      let {
        name,
        domain,
        protocol,
        header,
        cookie,
        global
      } = pickValueFrom(this.configsForm);
      header = xU.map(header, makeNameValueObj);
      cookie = xU.map(cookie, makeNameValueObj);
      global = xU.map(global, makeNameValueObj);
      if (cookie.length > 0) {
        header.push({
          name: "Cookie",
          value: cookie.map((item) => item.name + "=" + item.value).join(";")
        });
      }
      const env = {
        _id: this.currentSelected._id,
        name,
        domain: protocol + domain,
        header,
        global
      };
      const envIndex = xU.findIndex(this.privateEnv, {
        _id: env._id
      });
      if (/^new_env/.test(this.currentSelected._id)) {
        delete env._id;
      }
      const envArray = xU.cloneDeep(this.privateEnv);
      if (~envIndex) {
        envArray.splice(envIndex, 1, env);
      } else {
        envArray.push(env);
      }
      await API.project.updateProxyEnv({
        id: this.propProjectId,
        env: envArray
      });
      UI.message.success(this.$t("\u73AF\u5883\u8BBE\u7F6E\u6210\u529F").label);
      Methods_App.setCurrProject(this.propProjectId, {
        isEnforce: true
      });
    },
    async addEnv() {
      const newItem = {
        header: [],
        global: [],
        _id: xU.genId("new_env"),
        name: xU.genId("env_name"),
        domain: "http://"
      };
      this.privateEnv.unshift(newItem);
      this.switchEvn(newItem, {
        isEnforce: true
      });
    },
    async deleteEnv(item) {
      const id = item._id;
      try {
        await UI.dialog.confirm({
          content: `\u5220\u9664\u73AF\u5883\u53D8\u91CF${item.name}?`
        });
        const envIndex = xU.findIndex(this.privateEnv, {
          _id: id
        });
        const envArray = xU.cloneDeep(this.privateEnv);
        envArray.splice(envIndex, 1);
        await API.project.updateProxyEnv({
          id: this.propProjectId,
          env: envArray
        });
        UI.message.success(this.$t("\u73AF\u5883\u8BBE\u7F6E\u6210\u529F").label);
        Methods_App.setCurrProject(this.propProjectId, {
          isEnforce: true
        });
      } catch (error) {
      }
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "DialogUpsertProxyEnv flex1 flex horizon padding10",
      "style": "overflow:auto;"
    }, [createVNode("div", {
      "class": "env-list-wrapper flex vertical"
    }, [createVNode("div", {
      "class": "flex center mb10"
    }, [withDirectives(createVNode(resolveComponent("xIcon"), {
      "icon": "add",
      "onClick": this.addEnv,
      "class": "flex middle color-primary pointer"
    }, null), [[resolveDirective("uiPopover"), {
      content: "\u6DFB\u52A0\u65B0\u73AF\u5883",
      delay: 1e3
    }]])]), this.vDomLeftSide]), createVNode("div", {
      "class": "env-configs-wrapper flex1 flex"
    }, [this.vdomEnvconfigs])])]);
  }
});
const KeyValuePanel = (args) => {
  const {
    properties,
    listeners
  } = args;
  properties.value = properties.value || [];
  properties.fnCheck = properties.fnCheck || false;
  const fnUpdate = (val) => {
    listeners["onUpdate:value"](val);
  };
  return createVNode("div", {
    "class": "ant-card ant-card-bordered"
  }, [createVNode(InputKeyValue, {
    "items": properties.value,
    "onUpdate:items": fnUpdate,
    "genItem": properties.genItem,
    "fnCheck": properties.fnCheck
  }, null)]);
};
function newFormData$2() {
  return {
    _id: xU.genId("body_params"),
    name: "",
    type: "text",
    required: "1",
    desc: "",
    example: ""
  };
}
const BodyParamsForm = defineComponent({
  props: ["reqBodyForm"],
  watch: {
    reqBodyForm: {
      immediate: true,
      handler(reqBodyForm) {
        this.resetDataForm(reqBodyForm);
      }
    }
  },
  methods: {
    addRow() {
      this.configs_table.dataSource.unshift(newFormData$2());
    },
    deleteRow(_id) {
      const index = xU.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.configs_table.dataSource.splice(index, 1);
      }
    },
    resetDataForm(newFormDataArray) {
      this.configs_table.dataSource = newFormDataArray;
    }
  },
  data(vm) {
    return {
      configs_table: defXVirTableConfigs({
        rowHeight: 36,
        dataSource: [],
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=td] .ant-tag{margin:auto;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        columns: {
          ...defCol({
            label: vm.$t("\u540D\u79F0").label,
            prop: "name",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.name,
              "onUpdate:value": ($event) => record.name = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u7C7B\u578B").label,
            prop: "type",
            width: "110px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.interfaceBodyFormType(record.type),
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aSelect"), {
              "options": ITEM_OPTIONS.interfaceBodyFormType,
              "value": record.type,
              "onUpdate:value": ($event) => record.type = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u5FC5\u9700").label,
            prop: "required",
            width: "110px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.required(record.required),
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aSelect"), {
              "options": ITEM_OPTIONS.required,
              "value": record.required,
              "onUpdate:value": ($event) => record.required = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u793A\u4F8B").label,
            prop: "example",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.example,
              "onUpdate:value": ($event) => record.example = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u5907\u6CE8").label,
            prop: "desc",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.desc,
              "onUpdate:value": ($event) => record.desc = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => createVNode(resolveComponent("xIcon"), {
              "icon": "delete",
              "class": "pointer",
              "onClick": () => vm.deleteRow(record._id)
            }, null)
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode(resolveComponent("aButton"), {
      "class": "width100 mb10",
      "type": "dashed",
      "onClick": this.addRow
    }, {
      default: () => [createVNode(resolveComponent("xIcon"), {
        "icon": "add"
      }, null)]
    }), createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(resolveComponent("xVirTable"), {
      "configs": this.configs_table,
      "class": "flex1 width100 "
    }, null)])]);
  }
});
const JsonSchemaMonaco$1 = "";
const objectNeedProps = ["maxProperties", "minProperties"];
const SubformObject = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minProperties,
      "modelValue": vm.data.minProperties,
      "onUpdate:modelValue": ($event) => vm.data.minProperties = $event,
      "class": "flex1"
    }, null), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maxProperties,
      "modelValue": vm.data.maxProperties,
      "onUpdate:modelValue": ($event) => vm.data.maxProperties = $event,
      "class": "flex1"
    }, null)])]);
  }
});
const stringNeedProps = ["default", "minLength", "maxLength", "pattern", "enum", "isUseEnum", "enumDesc", "format"];
const SubformString = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.default,
      "modelValue": vm.data.default,
      "onUpdate:modelValue": ($event) => vm.data.default = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minLength,
      "modelValue": vm.data.minLength,
      "onUpdate:modelValue": ($event) => vm.data.minLength = $event,
      "class": "flex1"
    }, null), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maxLength,
      "modelValue": vm.data.maxLength,
      "onUpdate:modelValue": ($event) => vm.data.maxLength = $event,
      "class": "flex1"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.pattern,
      "modelValue": vm.data.pattern,
      "onUpdate:modelValue": ($event) => vm.data.pattern = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enum,
      "modelValue": vm.data.enum,
      "onUpdate:modelValue": ($event) => vm.data.enum = $event
    }, {
      afterControll: () => createVNode(resolveComponent("aCheckbox"), {
        "class": "ml10",
        "checked": !!vm.data.isUseEnum,
        "onUpdate:checked": (val) => {
          vm.configs.enum.disabled = !val;
          vm.data.isUseEnum = val;
        }
      }, null)
    }), vm.data.isUseEnum ? createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enumDesc,
      "modelValue": vm.data.enumDesc,
      "onUpdate:modelValue": ($event) => vm.data.enumDesc = $event
    }, null)]) : null, createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.format,
      "modelValue": vm.data.format,
      "onUpdate:modelValue": ($event) => vm.data.format = $event
    }, null)]);
  }
});
const numberNeedProps = ["default", "maximum", "minimum", "exclusiveMaximum", "exclusiveMinimum", "enum", "default", "isUseEnum"];
const SubformNumber = defineComponent({
  props: ["configs", "data", "integer"],
  methods: {
    parserNum(val) {
      if (this.integer) {
        return parseInt(Number(val));
      }
      return val;
    }
  },
  render(vm) {
    xU(vm.integer);
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.default,
      "modelValue": vm.data.default,
      "onUpdate:modelValue": ($event) => vm.data.default = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode("div", {
      "class": " ant-form-item ant-form-item-with-help x-item flex "
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minimum,
      "modelValue": vm.data.minimum,
      "onUpdate:modelValue": ($event) => vm.data.minimum = $event,
      "class": "flex1",
      "parser": (val) => vm.parserNum(val)
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.exclusiveMinimum,
      "modelValue": vm.data.exclusiveMinimum,
      "onUpdate:modelValue": ($event) => vm.data.exclusiveMinimum = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "r": "16"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode("div", {
      "class": " ant-form-item ant-form-item-with-help x-item flex "
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maximum,
      "modelValue": vm.data.maximum,
      "onUpdate:modelValue": ($event) => vm.data.maximum = $event,
      "class": "flex1",
      "parser": (val) => vm.parserNum(val)
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.exclusiveMaximum,
      "modelValue": vm.data.exclusiveMaximum,
      "onUpdate:modelValue": ($event) => vm.data.exclusiveMaximum = $event
    }, null), createVNode(resolveComponent("xGap"), {
      "r": "16"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enum,
      "modelValue": vm.data.enum,
      "onUpdate:modelValue": ($event) => vm.data.enum = $event
    }, {
      afterControll: () => createVNode(resolveComponent("aCheckbox"), {
        "class": "ml10",
        "checked": !!vm.data.isUseEnum,
        "onUpdate:checked": (val) => {
          vm.configs.enum.disabled = !val;
          vm.data.isUseEnum = val;
        }
      }, null)
    }), vm.data.isUseEnum ? createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.enumDesc,
      "modelValue": vm.data.enumDesc,
      "onUpdate:modelValue": ($event) => vm.data.enumDesc = $event
    }, null)]) : null]);
  }
});
const arrayNeedProps = ["maxItems", "minItems", "uniqueItems"];
const SubformArray = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode("div", {
      "className": "flex middle"
    }, [createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.minItems,
      "modelValue": vm.data.minItems,
      "onUpdate:modelValue": ($event) => vm.data.minItems = $event,
      "class": "flex1"
    }, null), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.maxItems,
      "modelValue": vm.data.maxItems,
      "onUpdate:modelValue": ($event) => vm.data.maxItems = $event,
      "class": "flex1"
    }, null)]), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.uniqueItems,
      "modelValue": vm.data.uniqueItems,
      "onUpdate:modelValue": ($event) => vm.data.uniqueItems = $event
    }, null)]);
  }
});
const booleanNeedProps = ["booleanDefault"];
const SubformBoolean = defineComponent({
  props: ["configs", "data"],
  render(vm) {
    return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null), createVNode(resolveComponent("xItem"), {
      "configs": vm.configs.booleanDefault,
      "modelValue": vm.data.booleanDefault,
      "onUpdate:modelValue": ($event) => vm.data.booleanDefault = $event
    }, null)]);
  }
});
const {
  xIcon
} = components;
const SPE = ".properties.";
const ICON_STRATEGE = {
  object: () => h(xIcon, {
    icon: "type_object"
  }),
  array: () => h(xIcon, {
    icon: "type_array"
  }),
  string: () => h(xIcon, {
    icon: "type_string"
  }),
  number: () => h(xIcon, {
    icon: "type_number"
  }),
  boolean: () => h(xIcon, {
    icon: "type_boolean"
  }),
  integer: () => h(xIcon, {
    icon: "type_int"
  })
};
const SchemaEditor = defineComponent({
  emits: ["nodeSync"],
  setup() {
    const jsmVM = inject("jsmVM");
    return {
      jsmVM
    };
  },
  data(vm) {
    return {
      dataXItem: {
        ...defItem({
          defaultValue: "",
          prop: "key",
          label: vm.$t("\u5BF9\u8C61\u8BBF\u95EE\u8DEF\u5F84").label,
          readonly: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "title",
          label: vm.$t("\u5B57\u6BB5\u540D").label,
          rules: [FormRules.required()]
        }),
        ...defItem({
          defaultValue: "",
          prop: "description",
          label: vm.$t("\u63CF\u8FF0").label,
          isTextarea: true
        }),
        ...defItem({
          defaultValue: "0",
          prop: "required",
          label: vm.$t("\u662F\u5426\u5FC5\u987B").label,
          itemType: "RadioGroup",
          options: ITEM_OPTIONS.required
        }),
        ...defItem({
          value: "object",
          prop: "type",
          label: vm.$t("\u7C7B\u578B").label,
          itemType: "RadioGroup",
          options: ["object", "string", "number", "array", "boolean", "integer"].map((type) => ({
            label: createVNode("span", {
              "class": "mr10",
              "title": type
            }, [ICON_STRATEGE[type]()]),
            value: type
          }))
        }),
        ...defItem({
          defaultValue: "",
          prop: "enum",
          label: vm.$t("\u679A\u4E3E").label,
          isTextarea: true,
          placeholder: vm.$t("\u4E00\u884C\u4E00\u4E2A\u503C\uFF0C\u4E0D\u9700\u8981\u7B26\u53F7\u5206\u9694").label,
          disabled: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "enumDesc",
          isTextarea: true,
          label: vm.$t("\u679A\u4E3E\u63CF\u8FF0").label
        }),
        ...defItem({
          defaultValue: "",
          prop: "minProperties",
          label: vm.$t("\u6700\u5C0F\u5143\u7D20\u4E2A\u6570").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "maxProperties",
          label: vm.$t("\u6700\u5927\u5143\u7D20\u4E2A\u6570").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "default",
          label: vm.$t("\u9ED8\u8BA4\u503C").label
        }),
        ...defItem({
          defaultValue: "",
          prop: "minLength",
          label: vm.$t("\u6700\u5C0F\u5B57\u7B26\u6570").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "maxLength",
          label: vm.$t("\u6700\u5927\u5B57\u7B26\u6570").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "pattern",
          placeholder: vm.$t("new RegExp(xxxxxxx)\u9002\u7528").label,
          label: vm.$t("\u6B63\u5219\u8868\u8FBE\u5F0F").label
        }),
        ...defItem({
          defaultValue: "",
          prop: "format",
          label: vm.$t("\u683C\u5F0F").label,
          itemType: "Select",
          options: ["date", "date-time", "email", "hostname", "ipv4", "ipv6", "uri"].map((label) => ({
            label,
            value: label
          })),
          allowClear: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "minimum",
          label: vm.$t("\u6700\u5C0F\u503C").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "maximum",
          label: vm.$t("\u6700\u5927\u503C").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: false,
          itemType: "Checkbox",
          prop: "exclusiveMinimum",
          label: vm.$t("\u4E0D\u5305\u542B\u6700\u5C0F\u503C").label
        }),
        ...defItem({
          defaultValue: false,
          itemType: "Checkbox",
          prop: "exclusiveMaximum",
          label: vm.$t("\u4E0D\u5305\u542B\u6700\u5927\u503C").label
        }),
        ...defItem({
          defaultValue: "",
          prop: "minItems",
          label: vm.$t("\u6700\u5C0F\u5143\u7D20\u4E2A\u6570").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: "",
          prop: "maxItems",
          label: vm.$t("\u6700\u5927\u5143\u7D20\u4E2A\u6570").label,
          isNumber: true
        }),
        ...defItem({
          defaultValue: false,
          itemType: "Checkbox",
          prop: "uniqueItems",
          label: vm.$t("\u5143\u7D20\u4E0D\u53EF\u91CD\u590D").label
        }),
        ...defItem({
          defaultValue: "",
          itemType: "Select",
          allowClear: true,
          prop: "booleanDefault",
          label: vm.$t("\u9ED8\u8BA4\u503C").label,
          options: ITEM_OPTIONS.YesOrNo
        })
      }
    };
  },
  methods: {
    async syncToJsonTree() {
      const baseProps = ["key", "title", "description", "required", "type"];
      const SUB_PROPS_STRATEGY = {
        object: objectNeedProps,
        string: stringNeedProps,
        number: numberNeedProps,
        array: arrayNeedProps,
        boolean: booleanNeedProps,
        integer: numberNeedProps
      };
      const {
        type,
        title
      } = this.currentNode;
      const currentTypeNeedProps = baseProps.concat(SUB_PROPS_STRATEGY[type]);
      const targetValues = xU.pick(this.currentNode, currentTypeNeedProps);
      const validateResults = await validateForm(this.dataXItem, targetValues);
      if (AllWasWell(validateResults)) {
        const oldkey = String(this.currentNode.key);
        const newKey = (() => {
          const array = oldkey.split(SPE);
          array[array.length - 1] = title;
          return array.join(SPE);
        })();
        if (type === "object") {
          delete targetValues.children;
        }
        this.$emit("nodeSync", oldkey, {
          ...targetValues,
          key: newKey
        });
      }
    }
  },
  computed: {
    currentNode: {
      get() {
        return this.jsmVM.currentNode;
      },
      set(currentNode) {
        if (currentNode.key !== this.jsmVM.currentNode.key) {
          return;
        } else {
          this.jsmVM.currentNode = xU.merge({}, this.jsmVM.currentNode, currentNode);
        }
      }
    }
  },
  render(vm) {
    if (!vm.currentNode) {
      return null;
    }
    return createVNode("div", {
      "className": "SchemaEditor flex vertical flex1"
    }, [createVNode("div", {
      "class": "SchemaEditor_button "
    }, [createVNode(resolveComponent("aButton"), {
      "onClick": vm.syncToJsonTree,
      "type": "primary"
    }, {
      default: () => [vm.$t("\u540C\u6B65\u5230 JSON \u6811").label]
    })]), createVNode(resolveComponent("xForm"), {
      "class": "flex vertical flex1 overflow-auto",
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.key,
        "modelValue": vm.currentNode.key,
        "onUpdate:modelValue": ($event) => vm.currentNode.key = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.title,
        "modelValue": vm.currentNode.title,
        "onUpdate:modelValue": ($event) => vm.currentNode.title = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.description,
        "modelValue": vm.currentNode.description,
        "onUpdate:modelValue": ($event) => vm.currentNode.description = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.required,
        "modelValue": vm.currentNode.required,
        "onUpdate:modelValue": ($event) => vm.currentNode.required = $event
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.type,
        "modelValue": vm.currentNode.type,
        "onUpdate:modelValue": ($event) => vm.currentNode.type = $event
      }, null), vm.currentNode.type === "object" && createVNode(SubformObject, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "string" && createVNode(SubformString, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "number" && createVNode(SubformNumber, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "array" && createVNode(SubformArray, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "boolean" && createVNode(SubformBoolean, {
        "configs": this.dataXItem,
        "data": vm.currentNode
      }, null), vm.currentNode.type === "integer" && createVNode(SubformNumber, {
        "configs": this.dataXItem,
        "data": vm.currentNode,
        "integer": true
      }, null)]
    })]);
  }
});
var src = {};
var typeOfIs = { exports: {} };
(function(module, exports) {
  (function(factory) {
    {
      module.exports = factory();
    }
  })(function() {
    var isBuiltIn = function() {
      var built_ins = [
        Object,
        Function,
        Array,
        String,
        Boolean,
        Number,
        Date,
        RegExp,
        Error
      ];
      var built_ins_length = built_ins.length;
      return function(_constructor) {
        for (var i = 0; i < built_ins_length; i++) {
          if (built_ins[i] === _constructor) {
            return true;
          }
        }
        return false;
      };
    }();
    var stringType = function() {
      var _toString = {}.toString;
      return function(obj) {
        var stype = _toString.call(obj).slice(8, -1);
        if (obj === null || obj === void 0) {
          return stype.toLowerCase();
        }
        var ctype = of(obj);
        if (ctype && !isBuiltIn(ctype)) {
          return ctype.name;
        } else {
          return stype;
        }
      };
    }();
    function of(obj) {
      if (obj === null || obj === void 0) {
        return obj;
      } else {
        return obj.constructor;
      }
    }
    function is(obj, test) {
      var typer = of(test) === String ? stringType : of;
      return typer(obj) === test;
    }
    function instance(obj, test) {
      return obj instanceof test;
    }
    function extension(_Extension, _Base) {
      return instance(_Extension.prototype, _Base);
    }
    function any(obj, tests) {
      if (!is(tests, Array)) {
        throw "Second argument to .any() should be array";
      }
      for (var i = 0; i < tests.length; i++) {
        var test = tests[i];
        if (is(obj, test)) {
          return true;
        }
      }
      return false;
    }
    var exports2 = function(obj, type) {
      if (arguments.length == 1) {
        return of(obj);
      } else {
        if (is(type, Array)) {
          return any(obj, type);
        } else {
          return is(obj, type);
        }
      }
    };
    exports2.instance = instance;
    exports2.string = stringType;
    exports2.of = of;
    exports2.is = is;
    exports2.any = any;
    exports2.extension = extension;
    return exports2;
  });
})(typeOfIs);
var utils$1 = {};
var DATE_REGEXP = /\d{4}-\d{2}-\d{2}/;
utils$1.isNumber = function(value) {
  return typeof value === "number" || Object.prototype.toString.call(value) === "[object Number]";
};
utils$1.isDate = function(date) {
  return new Date(date).toString() !== "Invalid Date" && !isNaN(new Date(date));
};
utils$1.isTimestamp = function(string) {
  return string.length > 18 && !isNaN(new Date(string).getTime());
};
utils$1.isDateString = function(string) {
  return string.match(DATE_REGEXP);
};
utils$1.arrayLastItem = function(arr) {
  return arr[arr.length - 1];
};
var Type$4 = typeOfIs.exports;
var Utils$3 = utils$1;
var generic = function Process(object, output) {
  output = output || {};
  for (var key in object) {
    var value = object[key];
    var type = Type$4.string(value).toLowerCase();
    if (type === "undefined") {
      type = "null";
    }
    if (type === "string" && Utils$3.isDate(value)) {
      type = "date";
    }
    if (type !== "object") {
      output[key] = {
        type
      };
    } else {
      output[key] = Process(object[key]);
      output[key].type = type;
    }
  }
  return output;
};
var Type$3 = typeOfIs.exports;
var Utils$2 = utils$1;
function getNativeType(string) {
  switch (string) {
    case "array":
      return "Array";
    case "buffer":
      return "Buffer";
    case "boolean":
      return "Boolean";
    case "date":
      return "Date";
    case "number":
      return "Number";
    case "string":
      return "String";
    case "objectid":
      return "ObjectId";
    case "null":
    case "undefined":
    case "regexp":
    default:
      return "Mixed";
  }
}
var mongoose = function Process2(object, output) {
  var output = output || {};
  for (var key in object) {
    var value = object[key];
    var originalType = null;
    var elementType = null;
    var type = null;
    if (value instanceof Buffer) {
      type = "buffer";
    }
    if (value != null && typeof value.toString !== "undefined" && value.toString().match(/^[0-9a-fA-F]{24}$/)) {
      type = "objectid";
    }
    if (!type) {
      type = Type$3.string(value).toLowerCase();
    }
    if (type === "string" && Utils$2.isDate(value)) {
      type = "date";
    }
    if (type === "object") {
      output[key] = Process2(object[key]);
    } else {
      if (type === "undefined") {
        type = "null";
      }
      if (type === "array" && value.length) {
        originalType = type;
        type = void 0;
        for (var index = 0, length = value.length; index < length; index++) {
          elementType = Type$3.string(value[index]).toLowerCase();
          if (type && elementType !== type) {
            type = "mixed";
            break;
          } else {
            type = elementType;
          }
        }
      }
      if (originalType && originalType === "array") {
        output[key] = { type: [getNativeType(type)] };
      } else {
        output[key] = { type: getNativeType(type) };
      }
    }
  }
  return output;
};
var utils = utils$1;
function getPropertyMode(value) {
  return Array.isArray(value) ? "REPEATED" : "NULLABLE";
}
function getPropertyType$1(value) {
  if (Array.isArray(value)) {
    return getPropertyType$1(value[0]);
  }
  if (value instanceof Date)
    return "TIMESTAMP";
  if (typeof value === "object")
    return "RECORD";
  if (typeof value === "boolean")
    return "BOOLEAN";
  if (typeof value === "string") {
    if (utils.isDateString(value))
      return "DATE";
    if (utils.isTimestamp(value))
      return "TIMESTAMP";
  }
  if (!isNaN(value)) {
    return Number.isInteger(parseFloat(value)) ? "INTEGER" : "FLOAT";
  }
  return "STRING";
}
function processFields(data) {
  return Object.keys(data).map(function(key) {
    var value = data[key];
    var entry = {
      name: key,
      type: getPropertyType$1(data[key]),
      mode: getPropertyMode(data[key])
    };
    if (entry.type === "RECORD") {
      entry.fields = processFields(entry.mode === "REPEATED" ? value[0] : value);
    }
    return entry;
  });
}
var bigquery = function Process3(data) {
  return processFields(data);
};
var Type$2 = typeOfIs.exports;
var Utils$1 = utils$1;
var types$1 = {
  boolean: "BOOLEAN",
  string: "TEXT",
  number: "INT",
  date: "DATE",
  timestamp: "TIMESTAMP",
  "regexp": "TEXT",
  "undefined": "TEXT",
  "null": "TEXT"
};
var lang$1 = {
  create: function(name) {
    return ["CREATE TABLE ", name, " ("].join("");
  },
  close: function() {
    return ");";
  },
  id: function(name, value) {
    return ["  ", name, "_id ", value, ","].join("");
  },
  property: function(name, value) {
    return ["  ", name, " ", value, ","].join("");
  },
  primary: function(id) {
    return ["  PRIMARY KEY (", id, "),"].join("");
  },
  foreign: function(key1, table, key2) {
    return ["  FOREIGN KEY (", key1, ") REFERENCES ", table, "(", key2, "),"].join("");
  }
};
function processObject$2(obj, options) {
  var name = options.tableName;
  var parent = options.parentTableName;
  var parentId = options.parentTableId;
  var parentIdType = options.parentTableIdType;
  var keys = Object.keys(obj);
  var output = [];
  var tables = [];
  var id = null;
  var idType = "string";
  output.push(lang$1.create(name));
  if (parent) {
    output.push(lang$1.property(parent + "_" + parentId, types$1[parentIdType]));
  }
  var nkey;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === "id" || keys[i].toLowerCase().indexOf("_id") > -1) {
      nkey = keys[i];
      obj[nkey] = obj[keys[i]];
      keys[i] = nkey;
      id = keys[i];
      idType = typeof obj[keys[i]];
    }
  }
  if (!id) {
    id = "id";
    idType = parentIdType || idType;
    output.push(lang$1.property(id, types$1[idType]));
  }
  var key, value, type;
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    value = obj[key];
    type = value instanceof Date ? "date" : Type$2.string(value).toLowerCase();
    if (type !== "undefined") {
      type = Utils$1.isTimestamp(value) ? "timestamp" : type;
    }
    if (type === "function") {
      continue;
    }
    if (type === "object" && !value.length) {
      tables.push("");
      tables.push(processObject$2(value, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key
      }).join("\n"));
      continue;
    }
    if (type === "object" || type === "array") {
      if (typeof value[0] === "object") {
        tables.push("");
        tables.push(processObject$2(value[0], {
          parentTableName: name,
          parentTableId: id,
          parentTableIdType: idType,
          tableName: name + "_" + key
        }).join("\n"));
        continue;
      }
      tables.push("");
      tables.push(processObject$2({
        value: typeof value[0]
      }, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key
      }).join("\n"));
      continue;
    }
    output.push(lang$1.property(key, types$1[type]));
  }
  output.push(lang$1.primary(id));
  if (parent) {
    output.push(lang$1.foreign(parent + "_id", parent, parentId));
  }
  output[output.length - 1] = Utils$1.arrayLastItem(output).substr(0, Utils$1.arrayLastItem(output).length - 1);
  output.push(lang$1.close());
  return output.concat(tables);
}
var mysql = function Process4(tableName, object) {
  if (typeof tableName !== "string") {
    object = tableName;
    tableName = "generic";
  }
  return processObject$2(object, {
    tableName
  }).join("\n");
};
var Type$1 = typeOfIs.exports;
var DRAFT = "http://json-schema.org/draft-04/schema#";
function getPropertyFormat(value) {
  var type = Type$1.string(value).toLowerCase();
  if (type === "date")
    return "date-time";
  return null;
}
function getPropertyType(value) {
  var type = Type$1.string(value).toLowerCase();
  if (type === "date")
    return "string";
  if (type === "regexp")
    return "string";
  if (type === "function")
    return "string";
  return type;
}
function getUniqueKeys(a, b, c) {
  a = Object.keys(a);
  b = Object.keys(b);
  c = c || [];
  var value;
  var cIndex;
  var aIndex;
  for (var keyIndex = 0, keyLength = b.length; keyIndex < keyLength; keyIndex++) {
    value = b[keyIndex];
    aIndex = a.indexOf(value);
    cIndex = c.indexOf(value);
    if (aIndex === -1) {
      if (cIndex !== -1) {
        c.splice(cIndex, 1);
      }
    } else if (cIndex === -1) {
      c.push(value);
    }
  }
  return c;
}
function processArray(array, output, nested) {
  var format;
  var oneOf;
  var type;
  if (nested && output) {
    output = { items: output };
  } else {
    output = output || {};
    output.type = getPropertyType(array);
    output.items = output.items || {};
    type = output.items.type || null;
  }
  for (var arrIndex = 0, arrLength = array.length; arrIndex < arrLength; arrIndex++) {
    var elementType = getPropertyType(array[arrIndex]);
    var elementFormat = getPropertyFormat(array[arrIndex]);
    if (type && elementType !== type) {
      output.items.oneOf = [];
      oneOf = true;
      break;
    } else {
      type = elementType;
      format = elementFormat;
    }
  }
  if (!oneOf && type) {
    output.items.type = type;
    if (format) {
      output.items.format = format;
    }
  } else if (oneOf && type !== "object") {
    output.items = {
      oneOf: [{ type }],
      required: output.items.required
    };
  }
  if (typeof output.items.oneOf !== "undefined" || type === "object") {
    for (var itemIndex = 0, itemLength = array.length; itemIndex < itemLength; itemIndex++) {
      var value = array[itemIndex];
      var itemType = getPropertyType(value);
      var itemFormat = getPropertyFormat(value);
      var arrayItem;
      if (itemType === "object") {
        if (output.items.properties) {
          output.items.required = getUniqueKeys(output.items.properties, value, output.items.required);
        }
        arrayItem = processObject$1(value, oneOf ? {} : output.items.properties, true);
      } else if (itemType === "array") {
        arrayItem = processArray(value, oneOf ? {} : output.items.properties, true);
      } else {
        arrayItem = {};
        arrayItem.type = itemType;
        if (itemFormat) {
          arrayItem.format = itemFormat;
        }
      }
      if (oneOf) {
        var childType = Type$1.string(value).toLowerCase();
        var tempObj = {};
        if (!arrayItem.type && childType === "object") {
          tempObj.properties = arrayItem;
          tempObj.type = "object";
          arrayItem = tempObj;
        }
        output.items.oneOf.push(arrayItem);
      } else {
        if (output.items.type !== "object") {
          continue;
        }
        output.items.properties = arrayItem;
      }
    }
  }
  return nested ? output.items : output;
}
function processObject$1(object, output, nested) {
  if (nested && output) {
    output = { properties: output };
  } else {
    output = output || {};
    output.type = getPropertyType(object);
    output.properties = output.properties || {};
  }
  for (var key in object) {
    var value = object[key];
    var type = getPropertyType(value);
    var format = getPropertyFormat(value);
    type = type === "undefined" ? "null" : type;
    if (type === "object") {
      output.properties[key] = processObject$1(value, output.properties[key]);
      continue;
    }
    if (type === "array") {
      output.properties[key] = processArray(value, output.properties[key]);
      continue;
    }
    if (output.properties[key]) {
      var entry = output.properties[key];
      var hasTypeArray = Array.isArray(entry.type);
      if (hasTypeArray && entry.type.indexOf(type) < 0) {
        entry.type.push(type);
      }
      if (!hasTypeArray && entry.type !== type) {
        entry.type = [entry.type, type];
      }
      continue;
    }
    output.properties[key] = {};
    output.properties[key].type = type;
    if (format) {
      output.properties[key].format = format;
    }
  }
  return nested ? output.properties : output;
}
var json = function Process5(title, object) {
  var processOutput;
  var output = {
    $schema: DRAFT
  };
  if (typeof title !== "string") {
    object = title;
    title = void 0;
  } else {
    output.title = title;
  }
  output.type = Type$1.string(object).toLowerCase();
  if (output.type === "object") {
    processOutput = processObject$1(object);
    output.type = processOutput.type;
    output.properties = processOutput.properties;
  }
  if (output.type === "array") {
    processOutput = processArray(object);
    output.type = processOutput.type;
    output.items = processOutput.items;
    if (output.title) {
      output.items.title = output.title;
      output.title += " Set";
    }
  }
  return output;
};
var Type = typeOfIs.exports;
var Utils = utils$1;
var types = {
  boolean: "String",
  string: "String",
  number: "Int32",
  date: "Date",
  timestamp: "DateTime",
  object: "Nested",
  "regexp": "String",
  "undefined": "String",
  "null": "String"
};
var lang = {
  create: function(name) {
    return ["CREATE TABLE ", name, " ("].join("");
  },
  close: function(id, dateField) {
    if (!dateField)
      return [") ENGINE = Memory;"].join("");
    else
      return [") ENGINE = MergeTree(", dateField, ", (", id, ", ", dateField, "), 8192);"].join("");
  },
  id: function(name, value) {
    return ["  ", name, "_id ", value, ","].join("");
  },
  property: function(name, value) {
    return ["  ", name, " ", value, ","].join("");
  }
};
function processObject(obj, options, dateField) {
  var name = options.tableName;
  var parent = options.parentTableName;
  var parentId = options.parentTableId;
  var parentIdType = options.parentTableIdType;
  var keys = Object.keys(obj);
  var output = [];
  var tables = [];
  var id = null;
  var idType = "string";
  output.push(lang.create(name));
  if (parent) {
    output.push(lang.property(parent + "_" + parentId, types[parentIdType]));
  }
  var nkey;
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].toLowerCase() === "id" || keys[i].toLowerCase().indexOf("_id") > -1) {
      nkey = keys[i];
      obj[nkey] = obj[keys[i]];
      keys[i] = nkey;
      id = keys[i];
      idType = typeof obj[keys[i]];
    }
  }
  if (!id) {
    id = "id";
    idType = parentIdType || idType;
    output.push(lang.property(id, types[idType]));
  }
  var key, value, type;
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    value = obj[key];
    type = value instanceof Date ? "date" : Type.string(value).toLowerCase();
    if (type == "date" && !dateField) {
      var dateField = key;
    }
    if (type !== "undefined") {
      type = Utils.isTimestamp(value) ? "timestamp" : type;
    }
    if (type === "function") {
      continue;
    }
    if (type === "object" && !value.length) {
      tables.push("");
      tables.push(processObject(value, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key
      }).join(""));
      continue;
    }
    if (type === "object" || type === "array") {
      if (typeof value[0] === "object") {
        tables.push("");
        tables.push(processObject(value[0], {
          parentTableName: name,
          parentTableId: id,
          parentTableIdType: idType,
          tableName: name + "_" + key
        }).join(""));
        continue;
      }
      tables.push("");
      tables.push(processObject({
        value: typeof value[0]
      }, {
        parentTableName: name,
        parentTableId: id,
        parentTableIdType: idType,
        tableName: name + "_" + key
      }).join(""));
      continue;
    }
    output.push(lang.property(key, types[type]));
  }
  output[output.length - 1] = Utils.arrayLastItem(output).substr(0, Utils.arrayLastItem(output).length - 1);
  output.push(lang.close(id, dateField));
  return output.concat(tables);
}
var clickhouse = function Process6(tableName, object, dateField) {
  if (typeof tableName !== "string") {
    object = tableName;
    tableName = "generic";
  }
  if (!dateField)
    dateField = null;
  return processObject(object, {
    tableName
  }, dateField).join("");
};
src.generic = generic;
src.mongoose = mongoose;
src.bigquery = bigquery;
src.mysql = mysql;
src.json = json;
src.clickhouse = clickhouse;
const {
  usefnObserveDomResize
} = compositionAPI;
function makeProps(pre, prop) {
  return [pre, prop].join(SPE);
}
function transJsonTree(item, prop, key) {
  if (prop === 0) {
    return {
      ...item,
      key,
      title: "root",
      children: xU.map(item.properties, (item2, prop2) => transJsonTree(item2, prop2, makeProps(key, prop2)))
    };
  } else {
    return {
      ...item,
      key,
      title: prop,
      children: xU.map(item.properties, (item2, prop2) => transJsonTree(item2, prop2, makeProps(key, prop2)))
    };
  }
}
const PopoverContent = defineComponent(markRaw({
  template: `<ul>
		<li>1. Tree  <xIcon icon="arrow_right"/> Lowcode  <xIcon icon="arrow_right"/> JSON </li>
		<li>2. <aTag color="green"><xIcon icon="arrow_right"/> </aTag>{{$t("\u5DE6\u4FA7\u7684\u7F16\u8F91\u4F1A\u76F4\u63A5\u4F5C\u7528\u4E8E\u53F3\u4FA7").label}}</li>
		<li>3. <aTag color="red"><xIcon icon="arrow_left"/> </aTag>{{$t("\u53F3\u4FA7\u7684\u7F16\u8F91\u9700\u8981\u624B\u5DE5\u540C\u6B65\u5230\u5DE6\u4FA7").label}}\uFF0C{{$t("\u4F9D\u6B21\u70B9\u51FB").label}}<aButton type="primary">{{$t("\u540C\u6B65\u5230\u5DE6\u4FA7").label}}</aButton></li>
		<li>4. {{$t("\u7F16\u8F91\u4E2D\u4F1A\u6709\u5197\u4F59\u4FE1\u606F\uFF0C\u540C\u6B65\u5230\u5DE6\u4FA7\u7684JSON Tree \u4E4B\u540E\u4F1ATree Shaking").label}} </li>
		<li>5. {{$t("\u70B9\u51FB").label}} <aTag color="green">root</aTag>{{$t("\u67E5\u770B\u5168\u90E8JSON\u5185\u5BB9,\u5E76\u4E14\u53EF\u4EE5\u5168\u91CF\u4FEE\u6539").label}}</li>
		<li>6. {{$t("\u666E\u901AJSON\u5BF9\u8C61\u53EF\u4EE5\u8F6C\u4E3Aschema\u683C\u5F0F").label}} <aButton type="primary">{{$t("JSON \u8F6C schema").label}}</aButton></li>
	  </ul>`
}));
const JsonSchemaMonaco = defineComponent({
  props: ["schemaString", "readOnly"],
  emits: ["update:schemaString"],
  setup() {
    const {
      fnObserveDomResize,
      fnUnobserveDomResize
    } = usefnObserveDomResize();
    return {
      State_App: _State_App,
      fnObserveDomResize,
      fnUnobserveDomResize
    };
  },
  computed: {
    syncLabel() {
      if (this.currentNode) {
        return this.$t("\u540C\u6B65\u5230\u7F16\u8F91\u5668").label;
      } else {
        return this.$t("\u540C\u6B65\u5230 JSON \u6811").label;
      }
    },
    isShowSchemaEditor() {
      if (this.currentNode) {
        if (this.onlyOneEditor) {
          return this.currentEditor === "SchemaEditor";
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    isShowMonacoEditor() {
      if (!this.currentNode) {
        return true;
      }
      if (this.onlyOneEditor) {
        return this.currentEditor === "MonacoEditor";
      } else {
        return true;
      }
    }
  },
  watch: {
    currentNode: {
      deep: true,
      async handler() {
        await xU.ensureValueDone(() => this.setSchemaStringDebounce);
        this.setSchemaStringDebounce();
      }
    },
    schemaString: {
      immediate: true,
      handler(schemaString) {
        this.updateSchemaJsonBy(schemaString);
      }
    },
    schemaJson: {
      immediate: true,
      handler() {
        this.updateTree();
      }
    }
  },
  mounted() {
    this.init();
    this.fnObserveDomResize(this.$refs.JsonSchemaMonaco, () => {
      const width = $(this.$refs.JsonSchemaMonaco).width();
      const onlyOneEditor = width < 800;
      if (onlyOneEditor !== this.onlyOneEditor) {
        this.onlyOneEditor = onlyOneEditor;
      }
    });
  },
  beforeUnmount() {
    this.fnUnobserveDomResize(this.$refs.JsonSchemaMonaco);
  },
  methods: {
    renderReadOnly(vm) {
      return createVNode("div", {
        "class": "JsonSchemaMonaco flex x-card",
        "ref": "JsonSchemaMonaco"
      }, [createVNode("div", {
        "class": "left-json-tree_readonly",
        "style": "width:100%"
      }, [this.isTreeLoading ? createVNode(resolveComponent("aSpin"), {
        "spinning": true,
        "class": "flex middle height100 width100"
      }, null) : createVNode("div", {
        "class": "flex middle height100 vertical"
      }, [createVNode(resolveComponent("aTree"), {
        "class": "JsonSchemaMonaco-json-tree flex1 overflow-auto width100",
        "show-line": true,
        "defaultExpandAll": true,
        "treeData": vm.jsonTree
      }, {
        title({
          dataRef
        }) {
          const {
            title,
            type,
            key,
            description
          } = dataRef;
          const vDomIcon = ICON_STRATEGE[type] && ICON_STRATEGE[type]();
          let labelType = createVNode("div", {
            "class": "mr10 cell-width"
          }, [vDomIcon, createVNode("span", {
            "class": "mr10"
          }, [type])]);
          let labelDescription = createVNode("div", {
            "class": "mr10 cell-width"
          }, [createVNode("span", {
            "class": "mr10"
          }, [description])]);
          if (title == "root") {
            labelType = createVNode("div", {
              "class": "mr10 cell-width"
            }, [vm.$t("\u7C7B\u578B").label]);
            labelDescription = createVNode("div", {
              "class": "mr10 cell-width"
            }, [vm.$t("\u5907\u6CE8").label]);
          }
          return createVNode("div", {
            "class": "flex middle  title-wrapper"
          }, [withDirectives(createVNode("div", {
            "class": "title ellipsis pointer flex1 flex middle ",
            "onClick": () => vm.handleTreeClick(dataRef)
          }, [createVNode("span", null, [title]), createVNode(resolveComponent("xGap"), {
            "f": "1"
          }, null), labelType, labelDescription]), [[resolveDirective("uiPopover"), {
            onlyEllipsis: true
          }]]), createVNode(resolveComponent("xGap"), {
            "r": "10"
          }, null)]);
        }
      })])])]);
    },
    toggleEditor() {
      if (this.currentEditor === "SchemaEditor") {
        this.currentEditor = "MonacoEditor";
      } else {
        this.currentEditor = "SchemaEditor";
      }
    },
    setSchemaString() {
      let jsonSchemaString = JSON.stringify(this.schemaJson, null, 2);
      if (this.currentNode) {
        jsonSchemaString = JSON.stringify(this.currentNode, null, 2);
      }
      if (this.jsonSchemaString !== jsonSchemaString) {
        this.jsonSchemaString = jsonSchemaString;
      }
    },
    init() {
      const vm = this;
      vm.raw$Node4Diff = {};
      vm.setSchemaStringDebounce = xU.debounce(function() {
        const node = xU.cloneDeep(vm.currentNode);
        if (node) {
          const isDifferent = diff(vm.raw$Node4Diff, node);
          if (isDifferent) {
            vm.raw$Node4Diff = node;
            vm.setSchemaString(node);
          }
        } else {
          vm.setSchemaString();
        }
      }, 600);
      vm.setSchemaStringDebounce();
      vm.updateTreeDebounce = xU.debounce(function() {
        vm.jsonTree = xU.map([vm.schemaJson], (item, prop) => {
          return transJsonTree(item, prop, "");
        });
        vm.isTreeLoading = false;
      }, 32);
    },
    updateSchemaJsonBy(schemaString) {
      let schemaJson = this.schemaJson;
      try {
        schemaJson = JSON.parse(schemaString);
        this.$emit("update:schemaString", schemaString);
      } catch (error) {
        console.error(error);
        UI.message.error(this.$t("\u6570\u636E\u6709\u8BEF").label);
      } finally {
        this.schemaJson = schemaJson;
      }
    },
    async updateTree() {
      xU("updateTree");
      this.isTreeLoading = true;
      await xU.ensureValueDone(() => this.updateTreeDebounce);
      this.updateTreeDebounce();
    },
    handleTreeClick(item) {
      this.isMockPreview = false;
      if (item && item.title !== "root") {
        this.setCurrentNode(item);
      } else {
        this.setCurrentNode(false);
      }
    },
    handleNodeSync(oldKey, node) {
      if (!node.key || !oldKey) {
        return;
      }
      xU.MutatingProps(this.schemaJson, oldKey, "never", true);
      xU.MutatingProps(this.schemaJson, node.key, node);
      this.$emit("update:schemaString", JSON.stringify(this.schemaJson));
      this.updateTree();
      this.handleTreeClick(node);
    },
    addProp(item) {
      this.handleTreeClick({
        key: [item.key, ""].join(SPE),
        title: "",
        type: "object"
      });
    },
    deleteProp(item) {
      xU.MutatingProps(this.schemaJson, item.key, "never", true);
      this.handleTreeClick();
    },
    syncMonacoString() {
      if (this.currentNode) {
        try {
          const node = JSON.parse(this.jsonSchemaString);
          this.setCurrentNode(node);
        } catch (error) {
          UI.message.error(this.$t("\u540C\u6B65\u5931\u8D25").label);
        }
      } else {
        this.updateSchemaJsonBy(this.jsonSchemaString);
      }
    },
    setCurrentNode(node) {
      if (node) {
        const currentNode = xU.cloneDeep(node);
        delete currentNode.children;
        this.currentNode = currentNode;
      } else {
        this.currentNode = false;
      }
      this.setSchemaStringDebounce();
    },
    monacoJsonToSchema() {
      try {
        const res = src.json(lib.parse(this.jsonSchemaString));
        this.jsonSchemaString = JSON.stringify(res, null, 2);
      } catch (error) {
        UI.message.error(this.$t("JSON \u8F6C schema \u89E3\u6790\u51FA\u9519").label);
      }
    },
    async previewMock() {
      try {
        let schema = JSON.parse(this.jsonSchemaString);
        const {
          data
        } = await API.project.interfaceSchema2json({
          schema: schema.properties
        });
        if (data) {
          this.jsonSchemaString = JSON.stringify(data, null, 2);
        } else {
          throw new Error();
        }
      } catch (error) {
        UI.message.error(this.$t("\u9884\u89C8 Mock \u7ED3\u679C\u51FA\u9519").label);
      }
    }
  },
  provide() {
    const vm = this;
    return {
      jsmVM: vm
    };
  },
  data(vm) {
    return {
      currentEditor: "MonacoEditor",
      onlyOneEditor: false,
      isMockPreview: false,
      currentNode: false,
      helpTips: {
        content: PopoverContent,
        width: "500px"
      },
      isShowRaw: false,
      schemaJson: {},
      jsonSchemaString: "",
      expandedKeys: [],
      selectedKeys: [],
      jsonTree: [],
      isTreeLoading: false,
      configsPreviewMock: {
        itemType: "Checkbox",
        slots: {
          default() {
            return vm.$t("Mock\u9884\u89C8").label;
          }
        }
      }
    };
  },
  render(vm) {
    if (this.readOnly) {
      return this.renderReadOnly(vm);
    }
    return createVNode("div", {
      "class": "JsonSchemaMonaco flex x-card",
      "ref": "JsonSchemaMonaco"
    }, [createVNode("div", {
      "class": "left-json-tree"
    }, [this.isTreeLoading ? createVNode(resolveComponent("aSpin"), {
      "spinning": true,
      "class": "flex middle height100 width100"
    }, null) : createVNode("div", {
      "class": "flex middle height100 vertical"
    }, [createVNode("div", {
      "class": "padding10 flex middle width100"
    }, [this.onlyOneEditor ? createVNode(Fragment, null, [createVNode(resolveComponent("aButton"), {
      "type": this.currentEditor === "SchemaEditor" ? "primary" : "text",
      "onClick": vm.toggleEditor
    }, {
      default: () => [createVNode(resolveComponent("xIcon"), {
        "icon": "column2"
      }, null)]
    }), createVNode(resolveComponent("aButton"), {
      "type": this.currentEditor === "MonacoEditor" ? "primary" : "text",
      "onClick": vm.toggleEditor
    }, {
      default: () => [createVNode(resolveComponent("xIcon"), {
        "icon": "column3"
      }, null)]
    })]) : null, createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), withDirectives(createVNode("span", {
      "class": "flex middle pointer"
    }, [createVNode(resolveComponent("xIcon"), {
      "icon": "question"
    }, null), createVNode("span", {
      "className": "ml10"
    }, [vm.$t("\u8BF4\u660E").label])]), [[resolveDirective("uiPopover"), vm.helpTips]])]), createVNode(resolveComponent("aTree"), {
      "class": "JsonSchemaMonaco-json-tree flex1 overflow-auto width100",
      "show-line": true,
      "defaultExpandAll": true,
      "treeData": vm.jsonTree
    }, {
      title({
        dataRef
      }) {
        const {
          title,
          type,
          key
        } = dataRef;
        const isShowAdd = !type || type === "object";
        const isShowDelete = !!key;
        const vDomIcon = ICON_STRATEGE[type] && ICON_STRATEGE[type]();
        return createVNode("div", {
          "class": "flex middle  title-wrapper"
        }, [withDirectives(createVNode("div", {
          "class": "title ellipsis pointer flex1 flex middle ",
          "onClick": () => vm.handleTreeClick(dataRef)
        }, [createVNode("span", {
          "class": "mr10"
        }, [vDomIcon]), createVNode("span", null, [title]), createVNode(resolveComponent("xGap"), {
          "f": "1"
        }, null)]), [[resolveDirective("uiPopover"), {
          onlyEllipsis: true
        }]]), isShowAdd ? createVNode(resolveComponent("xIcon"), {
          "icon": "add",
          "onClick": () => vm.addProp(dataRef)
        }, null) : null, isShowDelete ? createVNode(resolveComponent("xIcon"), {
          "icon": "delete",
          "onClick": () => vm.deleteProp(dataRef)
        }, null) : null, createVNode(resolveComponent("xGap"), {
          "r": "10"
        }, null)]);
      }
    })])]), this.isShowSchemaEditor ? createVNode(SchemaEditor, {
      "onNodeSync": this.handleNodeSync
    }, null) : null, this.isShowMonacoEditor ? createVNode("div", {
      "class": "JsonSchemaMonaco-monaco-panel flex1 flex vertical",
      "style": {
        width: "1px"
      }
    }, [createVNode("div", {
      "class": "JsonSchemaMonaco-monaco-panel_button flex middle"
    }, [createVNode(resolveComponent("aButton"), {
      "onClick": this.syncMonacoString,
      "type": "primary",
      "disabled": this.isMockPreview
    }, {
      default: () => [this.syncLabel]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), !this.currentNode && createVNode(resolveComponent("aButton"), {
      "onClick": this.monacoJsonToSchema,
      "type": "primary",
      "disabled": this.isMockPreview
    }, {
      default: () => [this.$t("JSON \u8F6C schema").label]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), !this.currentNode && createVNode(resolveComponent("xItem"), {
      "configs": vm.configsPreviewMock,
      "modelValue": this.isMockPreview,
      "onUpdate:modelValue": (val) => {
        if (vm.isMockPreview === val) {
          return;
        }
        vm.isMockPreview = val;
        if (val) {
          vm.previewMock();
        } else {
          vm.setSchemaStringDebounce();
        }
      }
    }, null)]), createVNode(resolveComponent("MonacoEditor"), {
      "class": "flex1",
      "code": this.jsonSchemaString,
      "onUpdate:code": ($event) => this.jsonSchemaString = $event,
      "language": "json"
    }, null)]) : null]);
  }
});
const BodyParamsJson = defineComponent({
  props: ["reqBodyOther", "reqBodyIsJsonSchema"],
  emits: ["update:reqBodyOther"],
  setup() {
    return {
      State_App: _State_App
    };
  },
  watch: {},
  computed: {
    schemaString: {
      get() {
        return this.reqBodyOther;
      },
      set(val) {
        this.$emit("update:reqBodyOther", val);
      }
    }
  },
  methods: {},
  data(vm) {
    return {
      isReqBodyUseSchema: false,
      jsonData: {}
    };
  },
  render() {
    return createVNode("div", {
      "style": "height:300px",
      "class": "flex vertical"
    }, [createVNode(JsonSchemaMonaco, {
      "schemaString": this.schemaString,
      "onUpdate:schemaString": ($event) => this.schemaString = $event
    }, null)]);
  }
});
const STRATEGY_CELL_ITEM_CONFIGS$2 = {
  name: {},
  type: {
    itemType: "Select",
    options: ITEM_OPTIONS.interfaceBodyFormType
  },
  required: {
    itemType: "Select",
    options: ITEM_OPTIONS.required
  },
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY$2 = Object.keys(STRATEGY_CELL_ITEM_CONFIGS$2);
[...BODY_PARAM_PROP_ARRAY$2, "ID_OPERATIONS"].map(xU.genId);
const BodyParamsRaw = defineComponent({
  props: ["reqBodyOther"],
  watch: {
    reqBodyOther: {
      immediate: true,
      handler(bodyText) {
        this.resetDataForm(bodyText);
      }
    }
  },
  methods: {
    resetDataForm(bodyText) {
      this.bodyText = bodyText;
    }
  },
  data(vm) {
    return {
      bodyText: ""
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(MonacoEditor, {
      "code": this.bodyText,
      "onUpdate:code": ($event) => this.bodyText = $event,
      "language": "json"
    }, null)])]);
  }
});
const DialogBulkValues = defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  data() {
    return {
      formItems: {
        ...defItem({
          isTextarea: true,
          prop: "bulkValue",
          value: "",
          placeholder: "key:value\nkey:value\nkey:value",
          rules: [FormRules.required()],
          style: "width:500px"
        })
      }
    };
  },
  watch: {
    "propDialogOptions.formValues": {
      immediate: true,
      handler() {
      }
    }
  },
  mounted() {
    this.formItems.bulkValue.value = xU.map(this.propDialogOptions.formValues, (item) => {
      return `${item.key || ""}:${item.value || ""}`;
    }).join("\n");
  },
  computed: {
    styleBody() {
      return "min-height:500px:width:500px";
    },
    onOk() {
      var _a, _b;
      if (!xU.isFunction((_a = this.propDialogOptions) == null ? void 0 : _a.onOk)) {
        alert("miss onOk function");
        return xU.doNothing;
      }
      return (_b = this.propDialogOptions) == null ? void 0 : _b.onOk;
    },
    configsFooter() {
      return {
        onCancel: this.propDialogOptions.closeDialog,
        onOk: async () => {
          const validateResults = await validateForm(this.formItems);
          if (AllWasWell(validateResults)) {
            const {
              bulkValue
            } = pickValueFrom(this.formItems);
            const bulkValueArray = bulkValue.split("\n");
            const formArray = xU.map(bulkValueArray, (str) => str.split(":"));
            this.onOk(formArray);
            this.propDialogOptions.closeDialog();
          }
        }
      };
    },
    vDomFormItems() {
      return xU.map(this.formItems, (item, prop) => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": item
        }, null)]);
      });
    }
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex flex1 vertical padding10"
    }, [createVNode(resolveComponent("aAlert"), {
      "message": `\u578B\u5982key:value\u4E00\u884C\u4E00\u4E2A \u6362\u884C\u5373\u53EF\uFF0C\u4E0D\u8981\u4F7F\u7528\u9017\u53F7\u3001\u5206\u53F7\u5206\u9694`
    }, null), createVNode("div", {
      "style": "height:340px;width:500px"
    }, [createVNode(MonacoEditor, {
      "code": this.formItems.bulkValue.value,
      "onUpdate:code": ($event) => this.formItems.bulkValue.value = $event,
      "language": "text"
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), {
      "configs": this.configsFooter
    }, null)]);
  }
});
const BodyParamsPanel = defineComponent({
  props: ["params"],
  data(vm) {
    return {
      configsBodyType: defItem.item({
        prop: "configsBodyType",
        itemType: "RadioGroup",
        options: ITEM_OPTIONS.interfaceBodyType
      })
    };
  },
  methods: {
    openBulkValuesDialog() {
      UI.dialog.component({
        title: this.$t("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570").label,
        component: DialogBulkValues,
        formValues: this.params.req_body_form,
        onOk: (req_body_form) => {
          this.params.req_body_form = req_body_form;
        }
      });
    }
  },
  computed: {
    bodyType: {
      get() {
        return this.params.req_body_type;
      },
      set(type) {
        this.params.req_body_type = type;
      }
    }
  },
  render() {
    return createVNode(resolveComponent("aCard"), null, {
      extra: () => {
        var _a;
        if ((_a = xU.find(ITEM_OPTIONS.interfaceBodyType, {
          value: this.params.req_body_type
        })) == null ? void 0 : _a.isForm) {
          return createVNode("a", {
            "onClick": this.openBulkValuesDialog
          }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")]);
        }
        return null;
      },
      title: () => {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xItem"), {
          "modelValue": this.params.req_body_type,
          "onUpdate:modelValue": ($event) => this.params.req_body_type = $event,
          "configs": this.configsBodyType
        }, null)]);
      },
      default: () => {
        return createVNode(Fragment, null, [this.params.req_body_type == "form" ? createVNode(BodyParamsForm, {
          "reqBodyForm": this.params.req_body_form
        }, null) : null, this.params.req_body_type == "json" ? createVNode(BodyParamsJson, {
          "reqBodyIsJsonSchema": this.params.req_body_is_json_schema,
          "reqBodyOther": this.params.req_body_other,
          "onUpdate:reqBodyOther": ($event) => this.params.req_body_other = $event
        }, null) : null, this.params.req_body_type == "file" ? "\u5F00\u53D1\u4E2D......" : null, this.params.req_body_type == "raw" ? createVNode(BodyParamsRaw, {
          "reqBodyOther": this.params.req_body_other,
          "onUpdate:reqBodyOther": ($event) => this.params.req_body_other = $event
        }, null) : null]);
      }
    });
  }
});
function newFormData$1([name, value] = ["", ""]) {
  return {
    _id: xU.genId("req_header_item"),
    name,
    value,
    example: "",
    required: "1",
    desc: ""
  };
}
const STRATEGY_CELL_ITEM_CONFIGS$1 = {
  name: {},
  value: {},
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY$1 = Object.keys(STRATEGY_CELL_ITEM_CONFIGS$1);
[...BODY_PARAM_PROP_ARRAY$1, "ID_OPERATIONS"].map(xU.genId);
const HeaderParamsForm = defineComponent({
  props: ["reqHeaders"],
  watch: {
    reqHeaders: {
      immediate: true,
      handler(formDataArray) {
        this.resetDataForm(formDataArray);
      }
    }
  },
  methods: {
    openBulkValuesDialog() {
      UI.dialog.component({
        title: this.$t("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570").label,
        component: DialogBulkValues,
        formValues: xU.map(this.configs_table.dataSource, (i) => {
          return {
            key: i.name,
            value: i.value
          };
        }),
        onOk: (formDataArray) => {
          this.configs_table.dataSource = xU.map(formDataArray, newFormData$1);
        }
      });
    },
    addRow() {
      this.configs_table.dataSource.unshift(newFormData$1());
    },
    deleteRow(_id) {
      const index = xU.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.configs_table.dataSource.splice(index, 1);
      }
    },
    resetDataForm(newFormDataArray) {
      this.configs_table.dataSource = newFormDataArray;
    }
  },
  data(vm) {
    return {
      configs_table: defXVirTableConfigs({
        rowHeight: 36,
        dataSource: [],
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        columns: {
          ...defCol({
            label: vm.$t("\u540D\u79F0").label,
            prop: "name",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aAutoComplete"), {
              "options": HTTP_REQUEST_HEADER.map((label) => ({
                label,
                value: label
              })),
              "value": record.name,
              "onUpdate:value": ($event) => record.name = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u53C2\u6570\u503C").label,
            prop: "value",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.value,
              "onUpdate:value": ($event) => record.value = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u793A\u4F8B").label,
            prop: "example",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.example,
              "onUpdate:value": ($event) => record.example = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u5907\u6CE8").label,
            prop: "desc",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.desc,
              "onUpdate:value": ($event) => record.desc = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => createVNode(resolveComponent("xIcon"), {
              "icon": "delete",
              "class": "pointer",
              "onClick": () => vm.deleteRow(record._id)
            }, null)
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("aButton"), {
      "class": "mb10",
      "onClick": this.addRow
    }, {
      default: () => [createTextVNode("\u6DFB\u52A0\u4E00\u884C")]
    }), createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), createVNode("a", {
      "class": "mb10 mr10",
      "onClick": this.openBulkValuesDialog
    }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")])]), createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(resolveComponent("xVirTable"), {
      "configs": this.configs_table,
      "class": "flex1 width100 "
    }, null)])]);
  }
});
const HeaderParamsPanel = defineComponent({
  props: {
    reqHeaders: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ["update:reqHeaders"],
  data(vm) {
    return {};
  },
  render(vm) {
    return createVNode(resolveComponent("aCard"), null, {
      default: () => [createVNode(HeaderParamsForm, {
        "reqHeaders": this.reqHeaders
      }, null)]
    });
  }
});
function newFormData([name, value] = ["", ""]) {
  return {
    _id: xU.genId("query_params"),
    name: "",
    required: "1",
    example: "",
    desc: ""
  };
}
const STRATEGY_CELL_ITEM_CONFIGS = {
  name: {},
  required: {
    itemType: "Select",
    options: ITEM_OPTIONS.required
  },
  example: {},
  desc: {}
};
const BODY_PARAM_PROP_ARRAY = Object.keys(STRATEGY_CELL_ITEM_CONFIGS);
[...BODY_PARAM_PROP_ARRAY, "ID_OPERATIONS"].map(xU.genId);
const QueryParamsForm = defineComponent({
  props: ["reqQuery"],
  emits: ["update:reqQuery"],
  watch: {
    reqQuery: {
      immediate: true,
      handler(formDataArray) {
        this.resetDataForm(formDataArray);
      }
    }
  },
  methods: {
    openBulkValuesDialog() {
      UI.dialog.component({
        title: this.$t("\u6279\u91CF\u6DFB\u52A0\u53C2\u6570").label,
        component: DialogBulkValues,
        formValues: xU.map(this.configs_table.dataSource, (i) => {
          return {
            key: i.name,
            value: i.value
          };
        }),
        onOk: (formDataArray) => {
          this.configs_table.dataSource = xU.map(formDataArray, newFormData);
        }
      });
    },
    addRow() {
      console.log("addRow");
      this.configs_table.dataSource.unshift(newFormData());
    },
    deleteRow(_id) {
      const index = xU.findIndex(this.configs_table.dataSource, {
        _id
      });
      if (~index) {
        this.configs_table.dataSource.splice(index, 1);
      }
    },
    resetDataForm(newFormDataArray) {
      this.configs_table.dataSource = newFormDataArray;
    }
  },
  data(vm) {
    return {
      configs_table: defXVirTableConfigs({
        rowHeight: 48,
        dataSource: [],
        customClass: (tableId) => [`#${tableId} .input-width100{width:100%;}`, `#${tableId} div[role=td] .ant-tag{margin:auto;}`, `#${tableId} div[role=tr] div[role=th][data-prop=operations]{justify-content:center;}`, `#${tableId} div[role=tr] div[role=td][data-prop=operations]{justify-content:center;color:red;}`].join("\n"),
        columns: {
          ...defCol({
            label: vm.$t("\u540D\u79F0").label,
            prop: "name",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.name,
              "onUpdate:value": ($event) => record.name = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u5FC5\u9700").label,
            prop: "required",
            width: "110px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.required(record.required),
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aSelect"), {
              "options": ITEM_OPTIONS.required,
              "value": record.required,
              "onUpdate:value": ($event) => record.required = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u793A\u4F8B").label,
            prop: "example",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.example,
              "onUpdate:value": ($event) => record.example = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u5907\u6CE8").label,
            prop: "desc",
            renderEditor: ({
              record
            }) => createVNode(resolveComponent("aInput"), {
              "value": record.desc,
              "onUpdate:value": ($event) => record.desc = $event
            }, null)
          }),
          ...defCol({
            label: vm.$t("\u64CD\u4F5C").label,
            prop: "operations",
            width: "40px",
            renderHeader: () => null,
            renderCell: ({
              record
            }) => {
              return compileVNode(`<xIcon icon="delete" class="pointer" @Click="deleteRow(record._id)" />`, {
                record,
                deleteRow: vm.deleteRow
              });
            }
          })
        }
      })
    };
  },
  render() {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "flex middle"
    }, [createVNode(resolveComponent("aButton"), {
      "class": "mb10",
      "onClick": this.addRow
    }, {
      default: () => [createTextVNode("\u6DFB\u52A0\u4E00\u884C")]
    }), createVNode(resolveComponent("xGap"), {
      "f": "1"
    }, null), createVNode("a", {
      "class": "mb10 mr10",
      "onClick": this.openBulkValuesDialog
    }, [createTextVNode("\u6279\u91CF\u6DFB\u52A0")])]), createVNode("div", {
      "style": {
        height: "300px"
      }
    }, [createVNode(resolveComponent("xVirTable"), {
      "configs": this.configs_table,
      "class": "flex1 width100 ",
      "uniqBy": "_id"
    }, null)])]);
  }
});
const QueryParamsPanel = defineComponent({
  props: {
    reqQuery: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  emits: ["update:reqQuery"],
  data(vm) {
    return {};
  },
  render(vm) {
    return createVNode(resolveComponent("aCard"), null, {
      default: () => [createVNode(QueryParamsForm, {
        "reqQuery": this.reqQuery
      }, null)]
    });
  }
});
const RequestArgsPanel = defineComponent({
  __v_skip: true,
  props: ["params", "apiMethod"],
  emits: ["update:params"],
  data() {
    return {
      collapseActive: QUERY,
      privateHttpMethod: GET,
      privateParams: {}
    };
  },
  watch: {
    privateParams(privateParams) {
      this.$emit("update:params", privateParams);
    },
    params() {
      this.privateParams = xU.cloneDeep(this.params);
    },
    apiMethod: {
      immediate: true,
      handler(apiMethod) {
        this.privateHttpMethod = apiMethod || GET;
        this.collapseActive = HTTP_METHOD[this.privateHttpMethod].default_tab;
      }
    }
  },
  computed: {
    bodyCollapsible() {
      return HTTP_METHOD[this.privateHttpMethod].request_body ? "" : "disabled";
    }
  },
  render() {
    if (!this.privateParams.req_headers) {
      return createVNode(resolveComponent("aSpin"), {
        "spinning": true,
        "class": "flex middle height100 width100"
      }, null);
    }
    const bodyHeader = (() => {
      if (this.privateParams.req_body_type == "form") {
        return `${BODY} ${this.privateParams.req_body_type} ${this.privateParams.req_body_form.length}`;
      }
      return `${BODY} ${this.privateParams.req_body_type}`;
    })();
    return createVNode(resolveComponent("aCollapse"), {
      "activeKey": this.collapseActive,
      "onUpdate:activeKey": ($event) => this.collapseActive = $event
    }, {
      default: () => [createVNode(resolveComponent("aCollapsePanel"), {
        "key": "header",
        "header": `header ${this.privateParams.req_headers.length}`
      }, {
        default: () => [createVNode(HeaderParamsPanel, {
          "reqHeaders": this.privateParams.req_headers,
          "onUpdate:reqHeaders": ($event) => this.privateParams.req_headers = $event
        }, null)]
      }), createVNode(resolveComponent("aCollapsePanel"), {
        "key": QUERY,
        "header": `${QUERY} ${this.privateParams.req_query.length}`
      }, {
        default: () => [createVNode(QueryParamsPanel, {
          "reqQuery": this.privateParams.req_query,
          "onUpdate:reqQuery": ($event) => this.privateParams.req_query = $event
        }, null)]
      }), createVNode(resolveComponent("aCollapsePanel"), {
        "key": BODY,
        "header": bodyHeader,
        "collapsible": this.bodyCollapsible
      }, {
        default: () => [createVNode(BodyParamsPanel, {
          "params": this.privateParams,
          "onUpdate:params": ($event) => this.privateParams = $event
        }, null)]
      })]
    });
  }
});
const ResponsePanel = defineComponent({
  props: ["body"],
  emits: ["update:body"],
  data() {
    return {};
  },
  computed: {
    resBody: {
      get() {
        return this.body || `{}`;
      },
      set(val) {
        this.$emit("update:body", val);
      }
    }
  },
  render() {
    return createVNode("div", {
      "style": "height:400px;"
    }, [createVNode(JsonSchemaMonaco, {
      "schemaString": this.resBody,
      "onUpdate:schemaString": ($event) => this.resBody = $event
    }, null)]);
  }
});
const asyncGetTuiEditor = async () => {
  if (window.TuiEditor) {
    return window.TuiEditor;
  }
  xU.asyncLoadStyle(`${State_UI.bashPath}tui-editor/style.css`);
  return await xU.asyncGlobalJS(
    "TuiEditor",
    `${State_UI.bashPath}tui-editor/tui.js`
  );
};
const TuiEditor = defineAsyncComponent(() => new Promise(async (resolve) => {
  const TuiEditor2 = await asyncGetTuiEditor();
  resolve(defineComponent({
    props: ["modelValue"],
    emits: ["update:modelValue"],
    data() {
      return {
        isLoading: false,
        id: xU.genId("TuiEditor"),
        raw$md: ""
      };
    },
    mounted() {
      this.once();
    },
    watch: {
      "modelValue.md": {
        immediate: true,
        async handler(mdString) {
          await xU.ensureValueDone(() => this.raw$editor);
          if (this.raw$md !== mdString) {
            this.raw$editor.setMarkdown(mdString);
          }
        }
      }
    },
    methods: {
      async sync() {
        await xU.ensureValueDone(() => this.syncDebounce);
        $(this.raw$selector).show().addClass("flash infinite");
        this.syncDebounce();
      },
      async once() {
        let vm = this;
        (() => {
          vm.raw$editor = new TuiEditor2({
            el: vm.$refs.container,
            initialEditType: "wysiwyg",
            previewStyle: "vertical",
            height: "auto",
            initialValue: vm.raw$md || "",
            hooks: {
              change: vm.sync,
              addImageBlobHook: (blob, callback) => {
                vm.isLoading = true;
                var reader = new FileReader();
                reader.onload = function(_a) {
                  var target2 = _a.target;
                  vm.isLoading = false;
                  return callback(target2.result);
                };
                reader.readAsDataURL(blob);
              }
            }
          });
          const className = `sync_${vm._.uid}`;
          vm.raw$selector = `.${className}`;
          vm.raw$editor.insertToolbarItem({
            groupIndex: 4,
            itemIndex: 2
          }, {
            name: "sync",
            text: "Sync...",
            id: "toastuiEditorToolbarIconsSync",
            className: `toastui-editor-toolbar-icons animated ${className}`,
            style: {
              backgroundImage: "none"
            }
          });
        })();
        (() => {
          vm.syncDebounce = xU.debounce(async function() {
            const mdString = vm.raw$editor.getMarkdown();
            if (vm.modelValue.md !== mdString) {
              vm.$emit("update:modelValue", {
                md: mdString,
                html: vm.raw$editor.getHTML()
              });
              vm.raw$md = mdString;
            }
            $(this.raw$selector).removeClass("flash infinite").hide();
          }, 1e3);
        })();
      }
    },
    render(vm) {
      if (vm.$attrs.readonly) {
        return createVNode("div", {
          "innerHTML": vm.modelValue.html,
          "class": "toastui-editor-contents"
        }, null);
      }
      return withDirectives(createVNode("div", null, [createVNode("div", {
        "id": vm.id,
        "ref": "container",
        "class": "flex1",
        "style": "height:300px;width:100%;"
      }, null)]), [[resolveDirective("loading"), vm.isLoading]]);
    }
  }));
}));
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
async function openProxyEnvDialog() {
  const {
    _layerKey
  } = await UI.dialog.component({
    title: State_UI.$t("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3\u8F6C\u53D1\u73AF\u5883").label,
    component: DialogUpsertProxyEnv
  });
  $(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}
async function openUpsertTagDialog() {
  const {
    _layerKey
  } = await UI.dialog.component({
    title: State_UI.$t("\u7BA1\u7406\u9879\u76EE\u63A5\u53E3Tags").label,
    component: DialogUpsertTags
  });
  $(`#layui-layer-shade${_layerKey}`).css("z-index", 1);
}
const InpterfacePathParams = defineComponent({
  __v_skip: true,
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  methods: {
    fnUpdate(prop, value, index) {
      this.properties.value[index][prop] = value;
      this.listeners["onUpdate:value"](this.properties.value);
    }
  },
  render(vm) {
    return xU.map(vm.properties.value, (data, index) => {
      return createVNode("div", {
        "class": "flex middel mt10 width100"
      }, [createVNode(resolveComponent("aTag"), {
        "class": "mr10 flex middle",
        "style": "min-width:100px"
      }, {
        default: () => [data.name]
      }), createVNode("span", {
        "class": "mr10 flex1"
      }, [createVNode(resolveComponent("aInput"), {
        "value": data.example,
        "onUpdate:value": (val) => {
          this.fnUpdate("example", val, index);
        }
      }, null)]), createVNode("span", {
        "class": "flex1"
      }, [createVNode(resolveComponent("aInput"), {
        "value": data.desc,
        "onUpdate:value": (val) => {
          this.fnUpdate("desc", val, index);
        }
      }, null)])]);
    });
  }
});
const EnvSelectRender = defineComponent({
  __v_skip: true,
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  render(vm) {
    vm.properties.value = vm.properties.value || [];
    const options = vm.properties.options || [];
    const fnUpdate = (val) => {
      vm.listeners["onUpdate:value"](val);
    };
    const vDomOptions = xU.map(options, (item) => {
      return createVNode(resolveComponent("aSelectOption"), {
        "value": item.value,
        "key": item.value
      }, {
        default: () => [item.label]
      });
    });
    return createVNode("div", {
      "class": "flex overflow-auto"
    }, [createVNode(resolveComponent("aSelect"), {
      "placeholder": "\u8BF7\u9009\u62E9\u8F6C\u53D1\u73AF\u5883",
      "onChange": fnUpdate,
      "value": vm.properties.value
    }, _isSlot(vDomOptions) ? vDomOptions : {
      default: () => [vDomOptions]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": {
        text: State_UI.$t("\u8F6C\u53D1\u73AF\u5883\u8BBE\u7F6E").label,
        onClick: openProxyEnvDialog
      },
      "class": "ml10",
      "type": "primary"
    }, null)]);
  }
});
const TagSelectRender = defineComponent({
  __v_skip: true,
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  computed: {
    selected: {
      get() {
        var _a, _b;
        if (xU.isArrayFill((_a = this.properties) == null ? void 0 : _a.value)) {
          return (_b = this.properties) == null ? void 0 : _b.value;
        } else {
          return [];
        }
      },
      set(val) {
        var _a;
        if (((_a = this.properties) == null ? void 0 : _a.value) !== val) {
          this.listeners["onUpdate:value"](val);
        }
      }
    },
    vDomOptions() {
      const options = this.properties.options || [];
      const vDomOptions = xU.map(options, (item) => {
        return createVNode(resolveComponent("aSelectOption"), {
          "value": item.name,
          "key": item.name
        }, {
          default: () => [withDirectives(createVNode("span", null, [item.name]), [[resolveDirective("uiPopover"), {
            content: item.desc
          }]])]
        });
      });
      return vDomOptions;
    }
  },
  render(vm) {
    return createVNode("div", {
      "class": "flex overflow-auto"
    }, [createVNode(resolveComponent("aSelect"), {
      "placeholder": "\u8BF7\u9009\u62E9 tag",
      "mode": "multiple",
      "value": vm.selected,
      "onUpdate:value": ($event) => vm.selected = $event
    }, {
      default: () => [this.vDomOptions]
    }), createVNode(resolveComponent("xGap"), {
      "l": "10"
    }, null), createVNode(resolveComponent("xButton"), {
      "configs": {
        text: vm.$t("Tag\u8BBE\u7F6E").label,
        onClick: openUpsertTagDialog
      },
      "class": "ml10",
      "type": "primary"
    }, null)]);
  }
});
const RequestArgsRender = defineComponent({
  __v_skip: true,
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  render() {
    var _a, _b, _c;
    return createVNode(RequestArgsPanel, {
      "params": (_a = this.properties) == null ? void 0 : _a.value,
      "apiMethod": (_c = (_b = this.properties) == null ? void 0 : _b.deepWatch) == null ? void 0 : _c.apiMethod,
      "onUpdate:params": this.listeners["onUpdate:value"]
    }, null);
  }
});
const MarkdownRender = defineComponent({
  __v_skip: true,
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  components: {
    TuiEditor
  },
  computed: {
    modelValue: {
      get() {
        var _a;
        return ((_a = this.properties) == null ? void 0 : _a.value) || {
          md: "",
          html: ""
        };
      },
      set(modelValue) {
        this.listeners["onUpdate:value"](modelValue);
      }
    }
  },
  render(vm) {
    return createVNode(TuiEditor, {
      "modelValue": vm.modelValue,
      "onUpdate:modelValue": ($event) => vm.modelValue = $event
    }, null);
  }
});
const ResponseRender = defineComponent({
  __v_skip: true,
  props: ["properties", "slots", "listeners", "propsWillDeleteFromConfigs"],
  computed: {
    body: {
      get() {
        var _a, _b;
        return ((_b = (_a = this.properties) == null ? void 0 : _a.value) == null ? void 0 : _b.res_body) || "";
      },
      set(res_body) {
        this.listeners["onUpdate:value"]({
          ...this.properties.value,
          res_body
        });
      }
    }
  },
  render(vm) {
    return createVNode(ResponsePanel, {
      "body": vm.body,
      "onUpdate:body": ($event) => vm.body = $event
    }, null);
  }
});
const DialogModifyInterface = defineComponent({
  props: {
    propDialogOptions: {
      type: Object,
      default() {
        return {
          __elId: false
        };
      }
    }
  },
  setup() {
    return {
      State_App: _State_App,
      State_Project
    };
  },
  computed: {
    vDomXItemPathparams() {
      if (xU.isArrayFill(this.dataXItem.pathParams.value)) {
        return createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("xItem"), {
          "configs": this.dataXItem.pathParams
        }, null)]);
      } else {
        return null;
      }
    },
    interfaceId() {
      return this.propDialogOptions.oldInterface._id;
    },
    configsDialogFooter() {
      return {
        cancel: {
          preset: "cancel",
          onClick: async () => {
            this.propDialogOptions.closeDialog();
          }
        },
        save: {
          preset: "save",
          onClick: this.submit
        }
      };
    }
  },
  data() {
    const vm = this;
    return {
      reqArgs: "1",
      detailInfo: {},
      activeKey: "1",
      dataXItem: {
        ...defItem({
          value: "",
          itemType: "Select",
          prop: "catid",
          label: vm.$t("\u63A5\u53E3\u5206\u7C7B").label,
          placeholder: "\u5206\u7C7B\u540D\u79F0",
          options: [],
          rules: [FormRules.required()],
          setOptions(allCategory) {
            var _a;
            this.options = allCategory;
            if (vm.propDialogOptions.categoryId) {
              this.value = vm.propDialogOptions.categoryId;
            } else {
              this.value = ((_a = xU.first(this.options)) == null ? void 0 : _a.value) || "";
            }
          }
        }),
        ...defItem({
          value: "",
          prop: "title",
          label: vm.$t("\u63A5\u53E3\u540D\u79F0").label,
          placeholder: vm.$t("\u63A5\u53E3\u540D\u79F0").label,
          rules: [FormRules.required(), FormRules.nameLength({
            label: vm.$t("\u63A5\u53E3").label
          })]
        }),
        ...defItem({
          value: vm.State_App.currProject.basepath,
          prop: "basepath",
          label: vm.$t("\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84").label,
          labelVNodeRender: VNodeCollection.labelTips(`\u63A5\u53E3\u57FA\u672C\u8DEF\u5F84\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539`),
          disabled: true
        }),
        ...defItem({
          value: "",
          itemType: "Select",
          prop: "apiMethod",
          options: ITEM_OPTIONS.httpMethod,
          onChange(val) {
            vm.dataXItem.requestArgs.deepWatch.apiMethod = val;
          },
          rules: [FormRules.required()],
          style: {
            width: "120px"
          }
        }),
        ...defItem({
          value: "",
          prop: "path",
          label: vm.$t("\u63A5\u53E3\u8DEF\u5F84").label,
          labelVNodeRender: VNodeCollection.labelTips(createVNode("ul", null, [createVNode("li", null, [createTextVNode("1.\u63A5\u53E3\u8DEF\u5F84\u652F\u6301\u8DEF\u7531\u53C2\u6570\uFF0C\u4F8B\u5982:/api/v1/project"), createVNode("b", null, [createTextVNode("/"), "{projectId}"]), createTextVNode("\u3002")]), createVNode("li", null, [createTextVNode("2.Query\u53C2\u6570\uFF0C\u4F8B\u5982/api/v1/project"), createVNode("b", null, [createTextVNode("?projectId=0001")]), createTextVNode("\u3002\u8BF7\u5B9A\u4E49\u5230"), createVNode("b", null, [createTextVNode("Request\u8BBE\u7F6E->Query")])])])),
          placeholder: "/path",
          rules: [FormRules.required(), FormRules.apiPath()],
          once() {
            const vDomApiMethodsSelector = createVNode(resolveComponent("xItem"), {
              "configs": vm.dataXItem.apiMethod
            }, null);
            this.slots = markRaw({
              addonBefore: () => vDomApiMethodsSelector
            });
          },
          onAfterValueEmit: xU.debounce(function(newPatnValue) {
            newPatnValue = _$handlePath(newPatnValue);
            let queue = [];
            setValueTo(vm.dataXItem, {
              path: newPatnValue
            });
            const {
              pathParams
            } = pickValueFrom(vm.dataXItem);
            let insertParams = (name) => {
              let findExist = xU.find(pathParams, {
                name
              });
              if (findExist) {
                queue.push(findExist);
              } else {
                queue.push({
                  name,
                  desc: ""
                });
              }
            };
            if (newPatnValue && newPatnValue.indexOf(":") !== -1) {
              let paths = newPatnValue.split("/"), name, i;
              for (i = 1; i < paths.length; i++) {
                if (paths[i][0] === ":") {
                  name = paths[i].substr(1);
                  insertParams(name);
                }
              }
            }
            if (newPatnValue && newPatnValue.length > 3) {
              newPatnValue.replace(/\{(.+?)\}/g, function(str, match) {
                insertParams(match);
              });
            }
            setValueTo(vm.dataXItem, {
              pathParams: xU.map(xU.uniqBy(queue, "name"), (newValue) => {
                return xU.merge({
                  name: "",
                  desc: "",
                  example: ""
                }, newValue);
              })
            });
          }, 800)
        }),
        ...defItem({
          prop: "pathParams",
          label: vm.$t("\u63A5\u53E3\u8DEF\u5F84\u53C2\u6570").label,
          value: [],
          itemType: markRaw(InpterfacePathParams)
        }),
        ...defItem({
          prop: "tag",
          label: "Tag",
          value: [],
          options: [],
          async setOptions(tagArray) {
            this.options = tagArray;
          },
          itemType: markRaw(TagSelectRender)
        }),
        ...defItem({
          prop: "isProxy",
          value: false,
          label: vm.$t("\u662F\u5426\u5F00\u542F\u8F6C\u53D1").label,
          options: ITEM_OPTIONS.trueOrFalse,
          itemType: "Switch"
        }),
        ...defItem({
          isShow() {
            return vm.dataXItem.isProxy.value;
          },
          prop: "witchEnv",
          label: vm.$t("\u8F6C\u53D1\u73AF\u5883").label,
          value: "",
          options: [],
          setOptions(envArray) {
            this.options = xU.map(envArray, (i) => {
              return {
                value: i._id,
                label: `${i.name} ${i.domain}`
              };
            });
          },
          itemType: markRaw(EnvSelectRender)
        }),
        ...defItem({
          prop: "requestArgs",
          label: vm.$t("\u8BF7\u6C42\u53C2\u6570\u8BBE\u7F6E").label,
          value: [],
          activeKey: "1",
          deepWatch: {
            apiMethod: ""
          },
          itemType: markRaw(RequestArgsRender)
        }),
        ...defItem({
          prop: "responseArgs",
          label: vm.$t("\u54CD\u5E94\u53C2\u6570\u8BBE\u7F6E").label,
          value: {},
          activeKey: "1",
          apiMethod: "",
          itemType: markRaw(ResponseRender)
        }),
        ...defItem({
          prop: "remark",
          label: vm.$t("\u5907\u6CE8").label,
          value: {
            html: "",
            md: ""
          },
          itemType: markRaw(MarkdownRender)
        }),
        ...defItem({
          prop: "noticed",
          label: vm.$t("\u6D88\u606F\u901A\u77E5").label,
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [vm.$t("\u5F00\u542F\u6D88\u606F\u901A\u77E5\uFF0C\u53EF\u5728 \u9879\u76EE\u8BBE\u7F6E \u91CC\u4FEE\u6539").label])),
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: true,
          itemType: "Switch"
        }),
        ...defItem({
          prop: "api_opened",
          label: vm.$t("\u5F00\u653E\u63A5\u53E3").label,
          labelVNodeRender: VNodeCollection.labelTips(createVNode("div", null, [vm.$t("\u7528\u6237\u53EF\u4EE5\u5728 \u6570\u636E\u5BFC\u51FA \u65F6\u9009\u62E9\u53EA\u5BFC\u51FA\u516C\u5F00\u63A5\u53E3").label])),
          checkedChildren: vm.$t("\u5F00").label,
          unCheckedChildren: vm.$t("\u5173").label,
          value: false,
          itemType: "Switch"
        })
      }
    };
  },
  mounted() {
    this.setFormDataValues();
  },
  watch: {
    "State_App.currProject": {
      immediate: true,
      deep: true,
      handler(currProject) {
        const {
          env: envArray,
          tag: tagArray,
          cat: category
        } = currProject;
        this.dataXItem.catid.setOptions(xU.map(category, (i) => ({
          ...i,
          label: i.name,
          value: i._id
        })));
        this.dataXItem.witchEnv.setOptions(envArray);
        this.dataXItem.tag.setOptions(tagArray);
      }
    }
  },
  methods: {
    async setFormDataValues() {
      const {
        data
      } = await API.project.fetchInterfaceDetail(this.propDialogOptions.interfaceId);
      this.detailInfo = this.initState(data);
      xU.doNothing(JSON.stringify(this.detailInfo, null, 2));
      const {
        api_opened,
        catid,
        title,
        path,
        req_params,
        tag,
        isProxy,
        witchEnv,
        method,
        req_headers,
        req_body_type,
        req_query,
        req_body_form,
        req_body_other,
        req_body_is_json_schema,
        res_body,
        res_body_type,
        res_body_mock,
        res_body_is_json_schema,
        desc,
        markdown
      } = this.detailInfo;
      setValueTo(this.dataXItem, {
        witchEnv,
        catid,
        title,
        apiMethod: method,
        path,
        remark: {
          md: markdown,
          html: desc
        },
        pathParams: req_params,
        tag: String(tag).split(",").filter(xU.isInput),
        isProxy,
        requestArgs: {
          req_headers,
          req_body_type,
          req_query,
          req_body_form,
          req_body_other,
          req_body_is_json_schema
        },
        responseArgs: {
          res_body_is_json_schema,
          res_body,
          res_body_type,
          res_body_mock
        },
        api_opened,
        noticed: this.State_App.currProject.switch_notice
      });
    },
    initState(detailInfo) {
      if (detailInfo.req_body_form) {
        detailInfo.req_body_form = detailInfo.req_body_form.map((item) => {
          item.type = item.type === "text" ? "text" : "file";
          return item;
        });
      }
      return detailInfo;
    },
    getFormData() {
      const {
        catid,
        title,
        apiMethod,
        path,
        tag,
        isProxy,
        witchEnv,
        remark,
        requestArgs,
        responseArgs,
        pathParams,
        api_opened,
        noticed
      } = pickValueFrom(this.dataXItem);
      const {
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form
      } = requestArgs;
      const {
        res_body_type,
        res_body
      } = responseArgs;
      const {
        html: desc,
        md: markdown
      } = remark;
      const _formData = {
        id: this.detailInfo._id,
        catid,
        title,
        method: apiMethod,
        path,
        isProxy,
        witchEnv,
        req_params: pathParams,
        tag,
        req_body_type,
        req_body_other,
        req_query,
        req_headers,
        req_body_form,
        req_body_is_json_schema: true,
        res_body_type,
        res_body,
        res_body_is_json_schema: true,
        desc,
        markdown,
        api_opened,
        switch_notice: noticed
      };
      let isFile = false;
      let haveContentType = false;
      if (_formData.req_body_type === "form") {
        xU.each(_formData.req_body_form, (item) => {
          delete item._id;
          if (item.type === "file") {
            isFile = true;
          }
        });
        xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = isFile ? "multipart/form-data" : "application/x-www-form-urlencoded";
            haveContentType = true;
          }
        });
        if (haveContentType === false) {
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: isFile ? "multipart/form-data" : "application/x-www-form-urlencoded"
          });
        }
      } else if (_formData.req_body_type === "json") {
        _formData.req_headers ? xU.each(_formData.req_headers, (item) => {
          delete item._id;
          if (item.name === "Content-Type") {
            item.value = "application/json";
            haveContentType = true;
          }
        }) : [];
        if (haveContentType === false) {
          _formData.req_headers = _formData.req_headers || [];
          _formData.req_headers.unshift({
            name: "Content-Type",
            value: "application/json"
          });
        }
      }
      const itemFill = (item) => item.name !== "";
      _formData.req_headers = _formData.req_headers ? _formData.req_headers.filter(itemFill) : [];
      _formData.req_body_form = _formData.req_body_form ? _formData.req_body_form.filter(itemFill) : [];
      _formData.req_params = _formData.req_params ? _formData.req_params.filter(itemFill) : [];
      _formData.req_query = xU.filter(_formData.req_query, itemFill).map((i) => {
        delete i._id;
        return i;
      });
      if (HTTP_METHOD[_formData.method].request_body !== true) {
        _formData.req_body_form = [];
      }
      if (_formData.req_body_is_json_schema && _formData.req_body_other && _formData.req_body_type === "json") {
        if (!_formData.req_body_other) {
          throw new Error(this.$t("\u8BF7\u6C42\u53C2\u6570 json-schema \u683C\u5F0F\u6709\u8BEF").label);
        }
      }
      if (_formData.res_body_is_json_schema && _formData.res_body && _formData.res_body_type === "json") {
        if (!_formData.res_body) {
          throw new Error(this.$t("\u8FD4\u56DE\u6570\u636E json-schema \u683C\u5F0F\u6709\u8BEF").label);
        }
      }
      return _formData;
    },
    async submit() {
      const validateResults = await validateForm(this.dataXItem);
      if (AllWasWell(validateResults)) {
        try {
          const formData = this.getFormData();
          const {
            data
          } = await API.project.updateInterface(formData);
          if (data) {
            await (async () => {
              Cpt_url.value.query.category_id = formData.catid;
              await Methods_Project.updateInterfaceMenuList();
              Methods_Project.setExpand();
              if (this.propDialogOptions.updateInterfaceInfo) {
                await this.propDialogOptions.updateInterfaceInfo();
              }
              setTimeout(() => {
                this.propDialogOptions.closeDialog();
              }, 1e3);
            })();
            UI.message.success(this.$t("\u4FEE\u6539\u6210\u529F").label);
          }
        } catch (error) {
          UI.message.error(this.$t("\u4FEE\u6539\u5931\u8D25").label);
        }
      }
    }
  },
  render(vm) {
    return createVNode(Fragment, null, [createVNode("div", {
      "class": "dialog-modify-interface g-row flex1 flex horizon height100 width100 overflow-auto"
    }, [createVNode("div", {
      "class": "flex1"
    }, [createVNode(resolveComponent("xForm"), {
      "labelStyle": {
        "min-width": "120px",
        width: "unset"
      }
    }, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.catid
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.title
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.basepath
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.path
      }, null), this.vDomXItemPathparams, createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.tag
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.isProxy
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.witchEnv,
        "class": "flex1"
      }, null)]), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.requestArgs
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.responseArgs
      }, null), createVNode(resolveComponent("xLogObject"), {
        "obj": this.dataXItem.remark,
        "hide": true
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.remark
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "10"
      }, null), createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.api_opened
      }, null)]
    }), createVNode(resolveComponent("xGap"), {
      "t": "10"
    }, null)])]), createVNode(resolveComponent("xDialogFooter"), null, {
      default: () => [createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null), createVNode("div", {
        "style": "min-width:120px;"
      }, [createVNode(resolveComponent("xItem"), {
        "configs": this.dataXItem.noticed
      }, null)]), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsDialogFooter.cancel
      }, null), createVNode(resolveComponent("xGap"), {
        "r": "10"
      }, null), createVNode(resolveComponent("xButton"), {
        "configs": this.configsDialogFooter.save
      }, null)]
    })]);
  }
});
const colParamsName = defCol({
  prop: "name",
  label: State_UI.$t("\u53C2\u6570\u540D\u79F0").label,
  width: "120px"
});
const colRemark = defCol({
  prop: "desc",
  label: State_UI.$t("\u5907\u6CE8").label
});
const colRequired = defCol({
  prop: "required",
  label: State_UI.$t("\u662F\u5426\u5FC5\u987B").label,
  width: "100px",
  renderCell: ({
    record
  }) => ITEM_OPTIONS_VDOM.required(record.required)
});
const colExample = defCol({
  prop: "example",
  label: State_UI.$t("\u793A\u4F8B").label
});
const InterfaceDetail = defineComponent({
  setup() {
    return {
      State_Project,
      Cpt_url
    };
  },
  data(vm) {
    return {
      State_App: _State_App,
      detailInfo: false,
      configs_table_path_params: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colParamsName,
          ...defCol({
            prop: "example",
            label: vm.$t("\u793A\u4F8B").label
          }),
          ...colRemark
        }
      }),
      configs_table_headers: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired,
          ...colParamsName,
          ...defCol({
            prop: "value",
            label: vm.$t("\u53C2\u6570\u503C").label
          }),
          ...colExample,
          ...colRemark
        }
      }),
      configs_table_query: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired,
          ...colParamsName,
          ...colExample,
          ...colRemark
        }
      }),
      configs_table_body_form: defDataGridOption({
        isHidePagination: true,
        dataSource: [],
        columns: {
          ...colRequired,
          ...colParamsName,
          ...defCol({
            prop: "type",
            label: vm.$t("\u53C2\u6570\u7C7B\u578B").label,
            width: "100px",
            renderCell: ({
              record
            }) => ITEM_OPTIONS_VDOM.interfaceBodyFormType(record.type)
          }),
          ...colExample,
          ...colRemark
        }
      })
    };
  },
  watch: {
    "Cpt_url.query.interface_id": {
      immediate: true,
      async handler(interface_id) {
        if (!interface_id) {
          return;
        }
        this.updateInterfaceInfo();
      }
    }
  },
  async mounted() {
    await asyncGetTuiEditor();
  },
  methods: {
    async updateInterfaceInfo() {
      const {
        data
      } = await API.project.fetchInterfaceDetail(this.Cpt_url.query.interface_id);
      this.detailInfo = data;
      xU(data);
      this.configs_table_headers.dataSource = xU.orderBy(data.req_headers, ["required"], ["desc"]);
      this.configs_table_path_params.dataSource = xU.orderBy(data.req_params, ["required"], ["desc"]);
      this.configs_table_query.dataSource = xU.orderBy(data.req_query, ["required", "type"], ["desc", "asc"]);
      this.configs_table_body_form.dataSource = xU.orderBy(data.req_body_form, ["required", "type"], ["desc", "asc"]);
    },
    copyUrl(url) {
      copyToClipboard(url);
      UI.message.success("\u5DF2\u7ECF\u6210\u529F\u590D\u5236\u5230\u526A\u5207\u677F");
    },
    flagMsg(mock, strice) {
      if (mock && strice) {
        return createVNode("span", null, [createTextVNode("( \u5168\u5C40mock & \u4E25\u683C\u6A21\u5F0F )")]);
      } else if (!mock && strice) {
        return createVNode("span", null, [createTextVNode("( \u4E25\u683C\u6A21\u5F0F )")]);
      } else if (mock && !strice) {
        return createVNode("span", null, [createTextVNode("( \u5168\u5C40mock )")]);
      } else {
        return;
      }
    },
    closeWS() {
      this.WebSocket && this.WebSocket.close();
      delete this.WebSocket;
    },
    async showModifyInterfaceDialog() {
      const vm = this;
      await xU.ensureValueDone(() => this.detailInfo);
      const item = this.detailInfo;
      const $dialogModifyInterface = $(`.dialog-modify-interface`);
      if ($dialogModifyInterface.length > 0) {
        UI.message.warn(this.$t("\u5DF2\u5B58\u5728\u4FEE\u6539\u9762\u677F").label);
        return;
      }
      const {
        status,
        curdata,
        message
      } = await this.checkConflict(item);
      if (status == 2) {
        try {
          await UI.dialog.confirm({
            content: createVNode("div", {
              "class": "flex middle"
            }, [createVNode("a", {
              "href": makeAhref(`/user/profile/${curdata.uid}`)
            }, [curdata.username]), createVNode("div", null, [createTextVNode("\u6B63\u5728\u7F16\u8F91\u8BE5\u63A5\u53E3\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5...")])])
          });
        } catch (error) {
        } finally {
          this.closeWS();
        }
        return;
      }
      if (message) {
        UI.message.warn(message);
      }
      UI.dialog.component({
        title: this.$t("\u4FEE\u6539\u63A5\u53E3").label + `-${item.title}`,
        fullscreen: true,
        component: DialogModifyInterface,
        interfaceId: item._id,
        maxmin: true,
        updateInterfaceInfo: vm.updateInterfaceInfo,
        onBeforeClose: vm.closeWS()
      });
    },
    async checkConflict(item) {
      const vm = this;
      const {
        hostname,
        port,
        protocol
      } = location;
      let domain = hostname + (port !== "" ? ":" + port : "");
      let wsProtocol = protocol === "https:" ? "wss" : "ws";
      return new Promise((resolve, reject) => {
        try {
          const sockei = new WebSocket(`${wsProtocol}://${domain}/api/interface/solve_conflict?id=${item._id}`);
          sockei.onopen = () => {
            vm.WebSocket = sockei;
          };
          sockei.onmessage = (e) => {
            let result = JSON.parse(e.data);
            if (result.errno === 0) {
              resolve({
                curdata: result.data,
                status: 1
              });
            } else {
              resolve({
                curdata: result.data,
                status: 2
              });
            }
          };
          sockei.onerror = () => {
            resolve({
              curdata: item,
              status: 1,
              message: "websocket \u8FDE\u63A5\u5931\u8D25\uFF0C\u5C06\u5BFC\u81F4\u591A\u4EBA\u7F16\u8F91\u540C\u4E00\u4E2A\u63A5\u53E3\u51B2\u7A81\u3002"
            });
          };
        } catch (e) {
          resolve({
            curdata: item,
            status: 1,
            message: "websocket \u8FDE\u63A5\u5931\u8D25\uFF0C\u5C06\u5BFC\u81F4\u591A\u4EBA\u7F16\u8F91\u540C\u4E00\u4E2A\u63A5\u53E3\u51B2\u7A81\u3002"
          });
        }
      });
    }
  },
  computed: {
    status() {
      var _a;
      let status = {
        undone: "\u672A\u5B8C\u6210",
        done: "\u5DF2\u5B8C\u6210"
      };
      return status[(_a = this.detailInfo) == null ? void 0 : _a.status];
    },
    labelProxyEnv() {
      if (!this.detailInfo.isProxy) {
        return "Y-api Mock \u6570\u636E";
      }
      const envId = this.detailInfo.witchEnv;
      if (!envId) {
        return "\u4EFB\u610F";
      }
      if (envId) {
        const envArray = this.State_App.currProject.env;
        let env = xU.find(envArray, {
          _id: envId
        });
        if (env) {
          return createVNode("div", null, [createVNode(resolveComponent("aTag"), {
            "color": "cyan"
          }, {
            default: () => [env.name]
          }), createVNode("span", null, [env.domain])]);
        }
      } else {
        return "--";
      }
    },
    vDomCopyAjaxCodePanel() {
      const {
        tag,
        up_time,
        title,
        uid,
        username,
        path,
        method
      } = this.detailInfo;
      const ajaxCode = `/**
*  ${title}
*  ${window.location.href}
*/
async ${xU.camelCase(path)}({params,data}) {
	return await ajax({
		method: "${method}",
		url: \`${path}\`,
		params:params||{},
		data:data||{}
	});
}`;
      return createVNode("div", {
        "style": "position:relative;overflow:auto;height:100%;"
      }, [createVNode(resolveComponent("aButton"), {
        "onClick": () => this.copyUrl(ajaxCode),
        "style": {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1
        }
      }, {
        default: () => [createTextVNode("\u590D\u5236\u4EE3\u7801")]
      }), createVNode(resolveComponent("MonacoEditor"), {
        "code": ajaxCode,
        "style": {
          minHeight: 180
        },
        "readOnly": true
      }, null)]);
    },
    vDomMockHref() {
      const {
        protocol,
        hostname,
        port
      } = location;
      return `${protocol}//${hostname}${port ? `:${port}` : ""}/mock/${this.State_App.currProject._id}${this.State_App.currProject.basepath}${this.detailInfo.path}`;
    },
    descriptions() {
      var _a, _b, _c, _d;
      const vm = this;
      const {
        tag,
        up_time,
        title,
        uid,
        username,
        status,
        path,
        method,
        isProxy,
        custom_field_value,
        desc
      } = this.detailInfo || {};
      const rowArray = [{
        colArray: [{
          label: "\u63A5\u53E3\u540D\u79F0",
          col: 3,
          value: (_a = this.detailInfo) == null ? void 0 : _a.title
        }]
      }, {
        colArray: [{
          label: "\u7EF4\u62A4\u4EBA",
          value: createVNode(Fragment, null, [createVNode(resolveComponent("aAvatar"), {
            "src": "/api/user/avatar?uid=" + uid,
            "class": "mr8",
            "style": "height:24px;width:24px;"
          }, null), createVNode("a", null, [username])])
        }, {
          label: "\u72B6\u6001",
          value: ITEM_OPTIONS_VDOM.status(status)
        }, {
          label: "\u66F4\u65B0\u65F6\u95F4",
          value: xU.dateFormat(up_time)
        }]
      }, {
        colArray: [{
          label: "\u63A5\u53E3\u8DEF\u5F84",
          col: 3,
          value: createVNode(resolveComponent("CopyContent"), {
            "class": "flex middle"
          }, {
            default: () => [ITEM_OPTIONS_VDOM.httpMethod(method), this.State_App.currProject.basepath, createTextVNode(" "), path]
          })
        }]
      }, {
        colArray: [{
          label: "Tag",
          col: 3,
          value: ITEM_OPTIONS_VDOM.tags(tag)
        }]
      }, {
        colArray: [{
          label: "\u662F\u5426\u5F00\u542F\u8F6C\u53D1",
          col: 1,
          value: (_b = xU.find(ITEM_OPTIONS.trueOrFalse, {
            value: isProxy
          })) == null ? void 0 : _b.label
        }, {
          label: "\u8F6C\u53D1\u73AF\u5883",
          col: 2,
          value: this.labelProxyEnv,
          isHide: !isProxy
        }]
      }, {
        colArray: [{
          label: createVNode("div", {
            "class": "flex middle"
          }, [createVNode("span", {
            "class": "mr10"
          }, [createTextVNode("Mock\u5730\u5740")]), createVNode(resolveComponent("aButton"), {
            "type": "primary"
          }, {
            default: () => [vm.$t("\u6D4B\u8BD5").label]
          })]),
          col: 3,
          value: createVNode("div", {
            "class": "flex middle width100"
          }, [this.flagMsg(this.State_App.currProject.is_mock_open, this.State_App.currProject.strice), createVNode(resolveComponent("CopyContent"), null, {
            default: () => [createVNode("span", {
              "class": "href"
            }, [this.vDomMockHref])]
          }), createVNode(resolveComponent("xGap"), {
            "f": "1"
          }, null)])
        }]
      }, {
        style: `height:200px;`,
        colArray: [{
          label: "ajax\u4EE3\u7801",
          col: 3,
          value: this.vDomCopyAjaxCodePanel
        }]
      }];
      if (custom_field_value && ((_d = (_c = this.State_App.currGroup) == null ? void 0 : _c.custom_field) == null ? void 0 : _d.enable)) {
        rowArray.push([{
          label: this.State_App.currGroup.custom_field.enable,
          col: 3,
          value: custom_field_value
        }]);
      }
      return {
        rowArray,
        colLabelWidth: "220px"
      };
    }
  },
  render(vm) {
    if (!vm.detailInfo || !vm.State_App.currProject) {
      return createVNode(resolveComponent("aSpin"), {
        "spinning": true,
        "class": "flex middle center flex1"
      }, null);
    }
    console.log(vm.State_App.currGroup, vm.State_App.currProject, vm.detailInfo);
    return createVNode(resolveComponent("xView"), {
      "style": "overflow:hidden;"
    }, {
      default: () => [createVNode("div", {
        "class": "flex"
      }, [createVNode(resolveComponent("xButton"), {
        "onClick": vm.showModifyInterfaceDialog
      }, {
        default: () => [createTextVNode("\u4FEE\u6539")]
      }), createVNode(resolveComponent("xGap"), {
        "f": "1"
      }, null)]), createVNode("div", {
        "class": "flex1 overflow-auto mt10"
      }, [createVNode(InfoCard, {
        "title": createVNode("span", null, [createTextVNode("\u57FA\u672C\u4FE1\u606F")]),
        "info": vm.descriptions
      }, null), createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), vm.detailInfo.desc && createVNode(InfoCard, {
        "title": vm.$t("\u5907\u6CE8").label
      }, {
        default: () => [createVNode(TuiEditor, {
          "modelValue": {
            html: vm.detailInfo.desc
          },
          "readonly": true
        }, null)]
      }), createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), createVNode(InfoCard, {
        "title": "\u8BF7\u6C42\u53C2\u6570"
      }, {
        default: () => [vm.configs_table_path_params.dataSource.length > 0 && createVNode(resolveComponent("aCard"), {
          "title": vm.$t("\u8DEF\u5F84\u53C2\u6570").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_path_params
          }, null)]
        }), vm.configs_table_headers.dataSource.length > 0 && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Headers").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_headers
          }, null)]
        })]), vm.configs_table_query.dataSource.length > 0 && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Query").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_query
          }, null)]
        })]), vm.detailInfo.req_body_type == "form" && vm.configs_table_body_form.dataSource.length > 0 && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Body").label
        }, {
          default: () => [createVNode(resolveComponent("xDataGrid"), {
            "configs": vm.configs_table_body_form
          }, null)]
        })]), vm.detailInfo.req_body_type == "json" && vm.detailInfo.req_body_other && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Body").label
        }, {
          default: () => [createVNode("div", {
            "style": "height:300px;width:90%"
          }, [createVNode(JsonSchemaMonaco, {
            "schemaString": vm.detailInfo.req_body_other,
            "onUpdate:schemaString": ($event) => vm.detailInfo.req_body_other = $event,
            "readOnly": true
          }, null)])]
        })]), vm.detailInfo.req_body_type == "raw" && vm.detailInfo.req_body_other && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
          "t": "10"
        }, null), createVNode(resolveComponent("aCard"), {
          "title": vm.$t("Body").label
        }, {
          default: () => [createVNode("div", {
            "style": "height:300px;width:90%"
          }, [createVNode(resolveComponent("MonacoEditor"), {
            "language": "json",
            "code": vm.detailInfo.req_body_other,
            "readOnly": true
          }, null)])]
        })])]
      }), vm.detailInfo.res_body && createVNode(Fragment, null, [createVNode(resolveComponent("xGap"), {
        "t": "20"
      }, null), createVNode(InfoCard, {
        "title": "\u8FD4\u56DE\u4FE1\u606F"
      }, {
        default: () => [createVNode("div", {
          "style": "height:300px;width:90%"
        }, [createVNode(JsonSchemaMonaco, {
          "schemaString": vm.detailInfo.res_body,
          "onUpdate:schemaString": ($event) => vm.detailInfo.res_body = $event,
          "readOnly": true
        }, null)])]
      })])])]
    });
  }
});
export {
  InterfaceDetail
};
//# sourceMappingURL=InterfaceDetail.32dc3e6c.js.map
