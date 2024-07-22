const { ModelWiki } = require("server/models/wiki");
const { ModelWikiOrder } = require("server/models/WikiOrder");
const { diffText } = require("common/diff-view");

const swagger_belong_type = {
	description: "该资源所属",
	required: true,
	type: "string",
	enum: [xU.var.ALL, xU.var.GROUP, xU.var.PROJECT, xU.var.PRIVATE]
};

const swagger_belong_id = {
	description: "该资源ID，所属类型题 为【group】【project】 需要提供对应的ID",
	type: "string"
};

const postWikiUpsertOne = {
	summary: "添加或者修改wiki文档，根据有无ID",
	request: {
		body: {
			_id: {
				description: "ID",
				type: "string"
			},
			p_id: {
				description: "该资源的PARENT_ID",
				type: "string"
			},
			belong_type: swagger_belong_type,
			belong_id: swagger_belong_id,
			title: {
				description: "标题",
				required: true,
				type: "string"
			},
			markdown: {
				description: "内容 markdown格式",
				required: true,
				type: "string"
			}
		}
	},
	async handler(ctx) {
		const { payload } = ctx;
		let { belong_type, belong_id, markdown, _id } = payload;
		let res;
		if (belong_type === "private") {
			/* 当前用户的ID */
			payload.belong_id = this.$uid;
		}

		if (_id) {
			/* 修改 */
			const oldWikiArticle = await orm.wiki.detail(_id);
			const oldmarkdown = oldWikiArticle?.markdown || "";
			res = await orm.wiki.up(_id, payload);
			const result = diffText(oldmarkdown, markdown);
			if (result) {
				xU.saveLog({
					content: `<a href='/user/profile/${this.$user._id}'>${this.$user.username}</a> 修改了文档 <a href='./wiki?wiki_id=${payload._id}'>${payload._id}:${payload.title}</a>`,
					type: "wiki_doc",
					uid: this.$user._id,
					username: this.$user.username,
					typeid: payload._id,
					data: result
				});
			}
		} else {
			/* 新增 */
			res = await orm.wiki.save(payload);
			payload._id = res._id;
		}

		ctx.body = xU.$response({ msg: res });
	}
};

const getWikiMenu = {
	summary: "wiki左侧的菜单",
	description: "文件保存在服务器上",
	request: {
		query: {
			belong_type: swagger_belong_type,
			belong_id: swagger_belong_id
		}
	},
	async handler(ctx) {
		try {
			let { belong_type, belong_id } = ctx.payload || {};
			const queryConditions = { belong_type };

			if (belong_type === xU.var.PRIVATE) {
				belong_id = this.$uid;
			}

			if (belong_id && belong_id !== "BELONG_ALL") {
				queryConditions.belong_id = belong_id;
			}

			const { order } = (await orm.WikiOrder.detail(queryConditions)) || {};
			ctx.body = xU.$response({
				list: await orm.wiki.menu({ belong_type, belong_id }),
				orderArray: order || [5]
			});
		} catch (e) {
			xU.applog.error(e.message);
		}
	}
};

const getWikiDetail = {
	summary: "单个文档详情",
	request: {
		query: {
			_id: xU.swagger_id("该资源ID")
		}
	},
	async handler(ctx) {
		try {
			const { _id } = ctx.payload;

			const wiki = await orm.wiki.detail(_id);

			const { belong_type, belong_id } = wiki;
			const { $uid: currentUid, $user } = this;

			if (wiki) {
				const isReturnWiki = await (async () => {
					function isMember(members = []) {
						// if ($user.role === "admin") { return true; }
						return xU._.find(members, member =>
							xU.isSame(currentUid, member.uid)
						);
					}
					/**
					 * 定义一个处理不同访问权限的 Wiki 的处理器映射。
					 * 不同的处理器根据 belong_id 来确定当前资源的访问权限，
					 * 并基于当前用户的 uid（currentUid）来判断该用户是否有访问权限。
					 */
					const WIKI_HANDLER_MAP = {
						/**
						 * 判断私有资源是否可访问。
						 * 主要用于判断当前用户 UID 是否与资源所属的 UID 相同。
						 *
						 * @returns {Promise<boolean>} 返回一个承诺（Promise），解析为一个布尔值，
						 * 如果当前用户是资源的所有者，则返回 true，否则返回 false。
						 */
						async private() {
							return xU.isSame(currentUid, belong_id);
						},
						/**
						 * 判断项目资源是否可访问。
						 * 通过查询项目成员列表，检查当前用户是否在项目成员之中。
						 *
						 * @returns {Promise<boolean>} 返回一个承诺（Promise），解析为一个布尔值，
						 * 如果当前用户是项目成员，则返回 true，否则返回 false。
						 */
						async project() {
							const project = await orm.project.get(belong_id);
							return isMember(project.members);
						},
						/**
						 * 判断群组资源是否可访问。
						 * 通过查询群组成员列表，检查当前用户是否在群组成员之中。
						 *
						 * @returns {Promise<boolean>} 返回一个承诺（Promise），解析为一个布尔值，
						 * 如果当前用户是群组成员，则返回 true，否则返回 false。
						 */
						async group() {
							const group = await orm.group.get(belong_id);
							return isMember(group.members);
						},
						/**
						 * 所有资源均可以访问。
						 * 该处理器不进行任何访问控制，直接返回 true。
						 *
						 * @returns {Promise<boolean>} 返回一个承诺（Promise），解析为 true。
						 */
						async all() {
							return true;
						}
					};

					const handler = WIKI_HANDLER_MAP[belong_type] || (() => null);

					return handler();
				})();

				if (!!isReturnWiki) {
					ctx.body = xU.$response(wiki);
					return;
				}
			}
			return (ctx.body = xU.$response(null, 401, "无权访问该文档"));
		} catch (e) {
			xU.applog.error(e.message);
		}
	}
};

const getWikiList = {
	summary: "文档 list",
	async handler(ctx) {
		try {
			ctx.body = xU.$response({ list: await orm.wiki.menu() });
		} catch (e) {
			xU.applog.error(e.message);
		}
	}
};

const postWikiResetMenuOrder = {
	summary: "调整文档顺序，层级关系",
	request: {
		body: {
			belong_type: swagger_belong_type,
			belong_id: swagger_belong_id,
			order: {
				type: "array",
				items: xU.schema("menuOrder")
			}
		}
	},
	async handler(ctx) {
		try {
			let { belong_type, belong_id, order } = ctx.payload || {};
			if (!belong_type) {
				belong_type = "private";
			}

			if (belong_type === "private") {
				/* 当前用户的ID */
				belong_id = this.$uid;
			}

			ctx.body = xU.$response(
				await orm.WikiOrder.upsertOne({
					belong_type,
					belong_id,
					order
				})
			);
		} catch (e) {
			xU.applog.error(e.message);
		}
	}
};

const deleteWikiDelete = {
	summary: "删除wiki one",
	request: {
		query: {
			_id: xU.swagger_id("该资源ID")
		}
	},
	async handler(ctx) {
		try {
			const { _id } = ctx.payload;
			/* 标记删除 */
			await orm.wiki.delete(_id);
			ctx.body = xU.$response({});
		} catch (e) {
			xU.applog.error(e.message);
		}
	}
};

module.exports = {
	definitions: {
		menuOrder: {
			type: "string",
			description: "文档的 _id"
		}
	},
	tag: {
		description: "自定义 wiki 文档的相关操作"
	},
	paths: {
		"/wiki/menu": {
			get: getWikiMenu
		},
		"/wiki/detail": {
			get: getWikiDetail
		},
		"/wiki/list": {
			get: getWikiList
		},
		"/wiki/reset_menu_order": {
			post: postWikiResetMenuOrder
		},
		"/wiki/delete": {
			delete: deleteWikiDelete
		},
		"/wiki/upsertOne": {
			post: postWikiUpsertOne
		}
	}
};
