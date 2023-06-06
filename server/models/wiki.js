const { yapi } = global;
const BaseModel = require('server/models/base.js');

class WikiModel extends BaseModel {
  getName() {
    return 'wiki_doc';
  }

  getSchema() {
    return {
      belong_type: {
        type: String,
        enum: ['private', 'group', 'project', 'all'],
        default: 'private'
      },
      belong_id: { type: Number },
      del_tag: { type: Number, default: 0 },
      type: String,
      title: String,
      p_id: { type: Number, default: 0 },
      project_id: { type: Number },
      username: String,
      uid: { type: Number },
      edit_uid: { type: Number, default: 0 },
      desc: String,
      markdown: String,
      add_time: Number,
      up_time: Number
    };
  }

  save(data) {
    let m = new this.model(data);
    return m.save();
  }

  /* find  find  find  find  find  find  find  find  find  find  find  */
  /**
   *
   *     无 desc markdown
   * detail才单独加载
   *
   * @param {any} [params={}]
   * @returns
   *
   * @memberOf WikiModel
   */
  menu(params = {}) {
    const select =
      params.select ||
      '_id p_id type title project_id username uid edit_uid add_time up_time desc belong_type belong_id';
    const belong_type = params.belong_type || 'all';
    let belong_id = params.belong_id;
    const condition = { del_tag: 0, belong_type };
    if (belong_id || 0 == belong_id) {
      condition.belong_id = belong_id;
    }
    return this.model.find(condition).select(select).exec();
  }
  detail(_id) {
    return this.model.findOne({ _id, del_tag: 0 }).exec();
  }
  /* find  find  find  find  find  find  find  find  find  find  find  */

  delete(_id) {
    return this.up(_id, { del_tag: 1 });
  }

  up(_id, data) {
    return this.model.update({ _id }, data, { runValidators: true });
  }
}

exports.WikiModel = WikiModel;
