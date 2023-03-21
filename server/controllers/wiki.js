const { yapi } = global;
const baseController = require('./base.js');
const { WikiModel } = require('server/models/wiki');

class wikiController extends baseController {
  constructor(ctx) {
    super(ctx);
    this.wiki_orm = yapi.getInst(WikiModel);
  }

  /*
   * 
   * 
   * @param {any} ctx 
   * 
   * @memberOf wikiController
   * */
  async action(ctx) {
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
  async detail(ctx) {
    const { _id } = ctx.params;
    return await this.wiki_orm.detail(_id);
  },
  async list(ctx) {
    return { list: await this.wiki_orm.list() };
  },
  async menu(ctx) {
    return { list: await this.wiki_orm.menu() };
  },
  async upsertOne(ctx) {
    const { data } = ctx.params;
    const { _id } = data;
    let res;
    if (_id) {
      res = await this.wiki_orm.up(_id, data);
    } else {
      res = await this.wiki_orm.save(data);
    }
    return { msg: res };
  }
};



exports.wikiController = wikiController;
