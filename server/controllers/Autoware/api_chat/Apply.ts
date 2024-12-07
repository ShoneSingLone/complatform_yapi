const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { customCookies } = require("server/utils/customCookies");
const { PassThrough } = require("stream");

const IMAGE_BUFFER_CACHE = {};
async function makeNewUserPrivateGroup(uid) {
	var groupInst = orm.group;
	await groupInst.save({
		uid: uid,
		group_name: "User-" + uid,
		add_time: xU.time(),
		up_time: xU.time(),
		type: "private"
	});
}
let count = 0;

module.exports = {
	definitions: {
		UserAvatar: {
			type: "string",
			format: "binary"
		}
	},
	tag: {
		description: "用户信息"
	},
	paths: {
		/* 通过ID获取group */
		"/apply/list": {
			get: {
				summary: "获取好友申请列表",
				description: "获取好友申请列表",
				request: {
					query: {
						page: {
							required: true,
							description: "当前页",
							type: "number",
							default: 1
						},
						size: {
							required: true,
							description: "每页数量",
							type: "number",
							default: 10
						}
					}
				},
				async handler(ctx) {
					let { page, size } = ctx.payload;
					const { list, total } = await orm.ChatApply.paging({
						page,
						size,
						friend_id: this.$uid
					});

					ctx.body = xU.$response({
						list,
						total
					});
				}
			}
		}
	}
};
