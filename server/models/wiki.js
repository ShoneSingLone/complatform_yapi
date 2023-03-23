const { yapi } = global;
const baseModel = require('server/models/base.js');

class WikiModel extends baseModel {
    getName() {
        return 'wiki_doc';
    }

    getSchema() {
        return {
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
