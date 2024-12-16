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
						friendId: this.$uid
					});

					ctx.body = xU.$response({
						list,
						total
					});
				}
			}
		},
		"/apply/addfriend": {
			post: {
				summary: "申请添加好友",
				description: "申请添加好友",
				request: {
					body: {
						friendId: {
							type: "number",
							required: true,
							desc: "好友id"
						},
						nickname: {
							type: "string",
							required: false,
							desc: "昵称"
						},
						lookme: {
							type: "number",
							required: true,
							range: {
								in: [0, 1]
							},
							desc: "看我"
						},
						lookhim: {
							type: "number",
							enum: [0, 1],
							required: true,
							desc: "看他"
						}
					}
				},
				async handler(ctx) {
					let { friendId, nickname, lookme, lookhim } = ctx.payload;
					const current_user_id = this.$uid;
					// 不能添加自己
					if (current_user_id === friendId) {
						ctx.body = xU.$response(null, 400, "不能添加自己");
					}
					// 对方是否存在
					let user = await orm.user.findById(friendId);

					if (!user) {
						ctx.body = xU.$response(null, 400, "该用户不存在或者已被禁用");
					}
					// 之前是否申请过了
					if (
						await orm.ChatApply.findOne({
							uid: current_user_id,
							friendId,
							status: {
								$in: ["pending", "agree"]
							}
						})
					) {
						ctx.body = xU.$response(null, 400, "你之前已经申请过了");
					}
					// 创建申请
					let apply = await app.model.Apply.create({
						user_id: current_user_id,
						friendId,
						lookme,
						lookhim,
						nickname
					});
					if (!apply) {
						ctx.throw(400, "申请失败");
					}
					ctx.body = xU.$response(apply);
					// 消息推送
					ctx.send(friendId, "", "updateApplyList");
				}
			}
		}
	}
};
