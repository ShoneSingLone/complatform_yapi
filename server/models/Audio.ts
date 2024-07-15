const ModelBase = require("server/models/base");
const { parseFile } = require("music-metadata");

class ModelAudio extends ModelBase {
	getName() {
		return "audio";
	}

	getSchema() {
		return {
			info: Object,
			/* 文件MD5 */
			md5: String,
			audioId: String
		};
	}

	save(data) {
		//关注
		let saveData = {
			info: data.info,
			md5: data.md5,
			audioId: data.audioId
		};
		let follow = new this.model(saveData);
		return follow.save();
	}
}

module.exports = ModelAudio;
