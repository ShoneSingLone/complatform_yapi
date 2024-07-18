const ModelBase = require("server/models/base");

class ModelAudio extends ModelBase {
	getName() {
		return "audio";
	}

	getSchema() {
		return {
			size: Number,
			type: String,
			comment: Object,
			publisher: String,
			image: String,
			title: String,
			artist: String,
			performerInfo: String,
			composer: String,
			album: String,
			trackNumber: String,
			recordingTime: String,
			genre: String,
			/* 文件MD5 */
			md5: String,
			audioId: String
		};
	}

	getByMd5(md5) {
		return this.model
			.findOne({
				md5
			})
			.exec();
	}

	async save(data) {
		const audio = await this.model
			.findOne({
				md5: data.md5
			})
			.exec();
		if (audio) {
			return audio;
		}

		let follow = new this.model(data);
		return follow.save();
	}
}

module.exports = ModelAudio;
