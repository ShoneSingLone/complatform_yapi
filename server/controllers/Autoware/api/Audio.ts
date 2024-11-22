const { getAudioDetail } = require("./Audio.service");

module.exports = {
	definitions: {},
	tag: {
		description: "音频相关的操作"
	},
	paths: {
		/* 获取音频 */
		"/audio/detail": {
			get: {
				summary: "获取音频",
				description: "获取音频",
				request: {
					query: {
						id: {
							required: true,
							description: "音频ID",
							type: "number"
						}
					}
				},
				async handler(ctx) {
					const { id } = ctx.payload;
					try {
						const resource = await orm.Resource.getResourceById(id, this.$uid);
						if (resource) {
							const audioDetail = await getAudioDetail({
								resource,
								uid: this.$uid
							});
							ctx.body = xU.$response(audioDetail);
						} else {
							return (ctx.body = xU.$response(null, 404, "资源不存在"));
						}
					} catch (error) {
						ctx.body = xU.$response(null, 402, error.message);
					} finally {
					}
				}
			}
		}
	}
};
