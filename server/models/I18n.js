const { yapi } = global;
const _ = require("lodash");
const { diff } = require('jsondiffpatch');
const BaseModel = require('server/models/base.js');

class I18nModel extends BaseModel {
    getName() {
        return 'i18n';
    }
    getSchema() {
        return {
            key: { type: String, unique: true },
            isRectified: { type: Boolean, default: false },
            desc: { type: String },
            valueArray: { type: String },
        };
    }
    save(data) {
        let m = new this.model(data);
        return m.save();
    }
    up(_id, data) {
        return this.model.update({ _id }, data, { runValidators: true });
    }
    list(condition = {}) {
        return this.model.find(condition).sort({ key: -1 }).select("_id key upperKey desc").exec();
    }
    detail(_id) {
        return this.model.findOne({ _id }).exec();
    }
    detailByKey(key) {
        return this.model.findOne({ key }).exec();
    }
    async insertMany(dataArray) {
        const start = Date.now();
        // await this.model.insertMany(dataArray);
        const insert = [];
        const existed = [];
        const different = [];
        await Promise.all(dataArray.map(async record => {
            const existedRecord = await this.detailByKey(record?.key);
            if (existedRecord?._id) {
                const diffRes = diff(record, _.pick(existedRecord, [
                    "key",
                    "isRectified",
                    "desc",
                    "valueArray"]));
                if (diffRes) {
                    different.push({ existedRecord, diffRes });
                } else {
                    existed.push(existedRecord);
                }
            } else {
                const insertResult = await this.save(record);
                insert.push(insertResult);
            }
        }));

        return {
            insert,
            existed,
            different,
            time: Date.now() - start
        };

    }
}

exports.I18nModel = I18nModel;
