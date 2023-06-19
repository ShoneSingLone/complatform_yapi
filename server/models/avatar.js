const { yapi } = global;
const ModelBase = require('server/models/base');

class avatarModel extends ModelBase {
  getName() {
    return 'avatar';
  }

  getSchema() {
    return {
      uid: { type: Number, required: true },
      basecode: String,
      type: String
    };
  }

  get(uid) {
    return this.model.findOne({
      uid: uid
    });
  }

  up(uid, basecode, type) {
    return this.model.update(
      {
        uid: uid
      },
      {
        type: type,
        basecode: basecode
      },
      {
        upsert: true
      }
    );
  }
}

module.exports = avatarModel;
