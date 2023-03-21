const { yapi } = global;
const baseModel = require('server/models/base.js');

class WikiModel extends baseModel {
    getName() {
        return 'wiki_doc';
    }

    getSchema() {
        return {
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

    list(select = '_id p_id type title project_id username uid edit_uid add_time up_time desc markdown') {
        return this.model.find().select(select).sort({ title: 1 }).exec();
    }
    /* 无 desc markdown detail才单独加载*/
    menu(select = '_id p_id type title project_id username uid edit_uid add_time up_time') {
        return this.model.find().select(select).sort({ title: 1 }).exec();
    }

    detail(_id) {
        return this.model
            .findOne({ _id })
            .exec();
    }

    get(project_id) {
        return this.model
            .findOne({
                project_id: project_id
            })
            .exec();
    }

    up(id, data) {
        return this.model.update(
            {
                _id: id
            },
            data,
            { runValidators: true }
        );
    }

    upEditUid(id, uid) {
        return this.model.update(
            {
                _id: id
            },
            { edit_uid: uid },
            { runValidators: true }
        );
    }
}

exports.WikiModel = WikiModel;
