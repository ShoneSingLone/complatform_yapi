const jwt = require("jsonwebtoken");
const SortWord = require("sort-word");
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
		},
		"/friend/list": {
			get: {
				summary: "通讯录列表",
				description: "通讯录列表",
				request: {},
				async handler(ctx) {
					let current_user_id = this.$uid;
					const allFriends = await orm.ChatFriend.list_all({
						uid: current_user_id
					});

					// 获取并统计我的好友
					let list = await Promise.all(
						allFriends.map(async item => {
							const { friendId, nickname, username } = item;
							let name = nickname ? nickname : username;
							const friend = await orm.user.findById(friendId);
							return {
								...item,
								name,
								friend
							};
						})
					);

					// 排序
					if (list.length > 0) {
						allFriends.rows = new SortWord(list, "name");
					}

					ctx.body = xU.$response({
						list
					});
				}
			}
		},
		"/friend/read": {
			get: {
				summary: "查看用户资料",
				description: "查看用户资料",
				request: {
					uid: {
						description: "用户uid",
						requied: true,
						type: "string"
					}
				},
				async handler(ctx) {
					let current_user_id = this.$uid;
					const { uid } = ctx.payload;
					let user_id = uid ? parseInt(uid) : 0;
					let user = await orm.user.findById(uid);

					if (!user) {
						ctx.body = xU.$response(null, 400, "用户不存在");
					}

					let friendInfo = {
						id: user.id,
						username: user.username,
						nickname: user.nickname ? user.nickname : user.username,
						avatar: user.avatar,
						sex: user.sex,
						sign: user.sign,
						area: user.area,
						friend: false
					};

					let friend = await orm.ChatFriend.get({
						uid: Number(current_user_id),
						friendId: user_id
					});

					if (friend) {
						friendInfo.friend = true;
						if (friend.nickname) {
							friendInfo.nickname = friend.nickname;
						}
						friendInfo = {
							...friendInfo,
							lookme: friend.lookme,
							lookhim: friend.lookhim,
							star: friend.star,
							isblack: friend.isblack,
							tags: friend.tags.map(tag => tag.name),
							moments: user.moments
						};
					}

					ctx.body = xU.$response(friendInfo);
				}
			}
		}
	}
};
