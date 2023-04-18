const { yapi } = global;
const BaseController = require('server/controllers/base');
const { I18nModel } = require('server/models/I18n');
const _ = require("lodash");
const fs = require("fs");
const json5 = require("json5");

class GodController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.orm_i18n = yapi.getInst(I18nModel);
    }

    /*
     * 神说要啥就有啥
     * 
     * @param {any} ctx 
     * 
     * @memberOf GodController
     * */
    async say(ctx) {
        const { incantations } = ctx.params;
        const strategy = STRATEGY[incantations];
        if (strategy) {
            try {
                const res = await strategy.call(this, ctx);
                ctx.body = yapi.commons.resReturn(res);
            } catch (err) {
                ctx.body = yapi.commons.resReturn(null, 402, err.message);
            }
        } else {
            ctx.body = yapi.commons.resReturn(null, 404, incantations);
        }
    }
}


const STRATEGY = {
    async upsertOneI18nRecord(ctx) {
        const params = _.omit(ctx.params, ["incantations"]);
        let res;
        if (params._id) {
            res = await this.orm_i18n.up(_id, params);
        } else {
            res = await this.orm_i18n.save(params);
        }
        return { msg: res };
    },
    async i18nRecords(ctx) {
        return this.orm_i18n.list();
    },
    async i18nRecordById(ctx) {
        const _id = ctx.params._id;
        return this.orm_i18n.detail({ _id });
    },
    async importI18nJSON(ctx) {
        let path = ctx.params?.files?.file?.path;
        let msg = "";
        if (path) {
            try {
                const content = await fs.promises.readFile(path, "utf-8");



                function InnerScope(_content) {
                    try {
                        const getJSON = new Function(`return ${_content}`);
                        const i18nObj = getJSON();
                        if (typeof (i18nObj) === "object") {
                            return i18nObj;
                        }
                    } catch (error) {

                    }
                    return [];
                }
                const i18nObj = InnerScope(content);
                const newRecords = _.map(i18nObj, (valueArray, key) => {
                    return {
                        key,
                        isRectified: false,
                        desc: "",
                        valueArray: JSON.stringify(valueArray),
                    };
                });
                return this.orm_i18n.insertMany(newRecords);
            } catch (error) {
                msg = error.message;
            } finally {
                await fs.promises.unlink(path);
            }
            if (msg) {
                throw new Error(msg);
            }
        } else {
            throw new Error("upload fail");
        }
    },
};

exports.GodController = GodController;
