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
			const oldWikiArticle = await xU.orm(ModelWiki).detail(_id);
			const oldmarkdown = oldWikiArticle?.markdown || "";
			res = await xU.orm(ModelWiki).up(_id, payload);
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
			res = await xU.orm(ModelWiki).save(payload);
			payload._id = res._id;
		}

		ctx.body = xU.resReturn({ msg: res });
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
			if (belong_id) {
				queryConditions.belong_id = belong_id;
			}

			const { order } =
				(await xU.orm(ModelWikiOrder).detail(queryConditions)) || {};
			ctx.body = xU.resReturn({
				list: await xU.orm(ModelWiki).menu({ belong_type, belong_id }),
				orderArray: order || []
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
			ctx.body = xU.resReturn(await xU.orm(ModelWiki).detail(_id));
		} catch (e) {
			xU.applog.error(e.message);
		}
	}
};

const getWikiList = {
	summary: "文档 list",
	async handler(ctx) {
		try {
			ctx.body = xU.resReturn({ list: await xU.orm(ModelWiki).list() });
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

			ctx.body = xU.resReturn(
				await xU.orm(ModelWikiOrder).upsertOne({
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
			await xU.orm(ModelWiki).delete(_id);
			ctx.body = xU.resReturn({});
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
