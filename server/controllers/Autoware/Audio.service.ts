const nodeID3 = require("../../utils/node-id3-0.2");
const fs = require("fs");
const { getType } = require("mime");

async function upsertInterface({ resource }) {
	const stat = await fs.promises.stat(resource.path);
	const audioMeta = nodeID3.read(resource.path);
	const audioInfo = {
		md5: resource.md5,
		audioId: resource._id,
		size: stat.size,
		type: getType(resource.path) || "audio",
		image: "",
		comment: audioMeta.comment,
		publisher: audioMeta.publisher,
		title: audioMeta.title,
		artist: audioMeta.artist,
		performerInfo: audioMeta.performerInfo,
		composer: audioMeta.composer,
		album: audioMeta.album,
		trackNumber: audioMeta.trackNumber,
		recordingTime: audioMeta.recordingTime,
		genre: audioMeta.genre
	};

	if (audioMeta?.image?.mime && audioMeta?.image?.imageBuffer) {
		audioInfo.image = `data:${audioMeta.image.mime};base64,${Buffer.from(
			audioMeta.image.imageBuffer
		).toString("base64")}`;
	}
	return await orm.Audio.save(audioInfo);
}

module.exports = {
	async getAudioDetail({ resource }) {
		let audioDetail = await orm.Audio.getByMd5(resource.md5);
		if (!audioDetail) {
			audioDetail = await upsertInterface({ resource });
		}
		return audioDetail;
	},
	insertAudio: upsertInterface
};
