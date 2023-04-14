const { yapi } = global;
const BaseController = require('server/controllers/base');
const { WikiModel } = require('server/models/wiki');
const { WikiOrderModel } = require('server/models/WikiOrder');
const { diffText } = require('common/diff-view.js');

class GodController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.orm_i18n = yapi.getInst(WikiModel);
        this.orm_wiki = yapi.getInst(WikiModel);
        this.orm_wiki_order = yapi.getInst(WikiOrderModel);
    }

    /*
     * 神说要啥就有啥
     * 
     * @param {any} ctx 
     * 
     * @memberOf GodController
     * */
    async say(ctx) {
        const { action } = ctx.params;
        const strategy = STRATEGY[action];
        if (strategy) {
            try {
                const res = await strategy.call(this, ctx);
                ctx.body = yapi.commons.resReturn(res);
            } catch (err) {
                ctx.body = yapi.commons.resReturn(null, 402, err.message);
            }
        }
    }
}


const STRATEGY = {
    async delete(ctx) {
        const { _id } = ctx.params;
        /* 标记删除 */
        return await this.orm_wiki.delete(_id);
    },
    async detail(ctx) {
        const { _id } = ctx.params;
        return await this.orm_wiki.detail(_id);
    },
    async list(ctx) {
        return { list: await this.orm_wiki.list() };
    },
    async menu(ctx) {
        const { payload } = ctx.params || {};
        let { belong_type, belong_id } = payload || {};
        const { order } = (await this.orm_wiki_order.detail({ belong_type, belong_id })) || {};
        const orderArray = order || [];

        const res = {
            list: await this.orm_wiki.menu({ belong_type, belong_id }),
            orderArray
        };
        return res;
    },
    async resetMenuOrder(ctx) {
        const { payload } = ctx.params || {};
        let { belong_type, belong_id, order } = payload || {};

        if (!belong_type) {
            belong_type = 'private';
            /* 当前用户的ID */
            belong_id = this.$user._id;
        }

        return await this.orm_wiki_order.upsertOne({ belong_type, belong_id, order });
    },
    async upsertOneI18nRecord(ctx) {
        const { data } = ctx.params;
        const { id, pId, valueArray, tag } = data;
        let res;

        if (!belong_type) {
            data.belong_type = 'private';
            /* 当前用户的ID */
            data.belong_id = this.$user._id;
        }

        const oldWikiArticle = await this.orm_wiki.detail(_id);
        const oldmarkdown = oldWikiArticle?.markdown || "";
        const newMarkdown = data?.markdown || "";

        if (_id) {
            res = await this.orm_wiki.up(_id, data);
        } else {
            res = await this.orm_wiki.save(data);
            data._id = res._id;
        }
        const result = diffText(oldmarkdown, newMarkdown);
        if (result) {
            yapi.commons.saveLog({
                content: `<a href="/user/profile/${this.$user._id}">${this.$user.username}</a> 修改了文档 <a href="./wiki?wiki_id=${data._id}">${data._id}:${data.title}</a>`,
                type: 'wiki_doc',
                uid: this.$user._id,
                username: this.$user.username,
                typeid: data._id,
                data: result
            });
        }
        return { msg: res };
    }
};

exports.GodController = GodController;
