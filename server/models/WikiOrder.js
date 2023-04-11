const { yapi } = global;
const BaseModel = require('server/models/base');

class WikiModel extends BaseModel {
    getName() {
        return 'wiki_order';
    }

    getSchema() {
        return {
            belong_type: { type: String, enum: ["private", "group", "project", "all"], default: 'private' },
        };
    }

    save(data) {
        let m = new this.model(data);
        return m.save();
    }
    /* find  find  find  find  find  find  find  find  find  find  find  */
    list(select = '_id p_id type title project_id username uid edit_uid add_time up_time desc markdown') {
        return this.model.find({ del_tag: 0 }).select(select).exec();
    }
    /* 无 desc markdown detail才单独加载*/
    menu(select = '_id p_id type title project_id username uid edit_uid add_time up_time') {
        return this.model.find({ del_tag: 0 }).select(select).exec();
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
