const BaseController = require("./base.js");
const followModel = require("../models/follow");
const modelProject = require("../models/project");

class followController extends BaseController {
	constructor(ctx) {
		super(ctx);
		this.Model = xU.getInst(followModel);
		this.modelProject = xU.getInst(modelProject);
	}

	/**
	 * 获取关注项目列表
	 * @interface /follow/list
	 * @method GET
	 * @category follow
	 * @foldnumber 10
	 * @param {Number} [page] 分页页码
	 * @param {Number} [limit] 分页大小
	 * @returns {Object}
	 * @example /follow/list
	 */

	async list(ctx) {
		let uid = this.getUid();
		// 关注列表暂时不分页 page & limit 为分页配置
		// page = ctx.request.query.page || 1,
		// limit = ctx.request.query.limit || 10;

		if (!uid) {
			return (ctx.body = xU.resReturn(null, 400, "用户id不能为空"));
		}

		try {
			let result = await this.Model.list(uid);

			ctx.body = xU.resReturn({
				list: result
			});
		} catch (err) {
			ctx.body = xU.resReturn(null, 402, err.message);
		}
	}

	/**
	 * 取消关注
	 * @interface /follow/del
	 * @method POST
	 * @category follow
	 * @foldnumber 10
	 * @param {Number} projectid
	 * @returns {Object}
	 * @example /follow/del
	 */

	async del(ctx) {
		let params = ctx.request.body,
			uid = this.getUid();

		if (!params.projectid) {
			return (ctx.body = xU.resReturn(null, 400, "项目id不能为空"));
		}

		let checkRepeat = await this.Model.checkProjectRepeat(
			uid,
			params.projectid
		);

		if (checkRepeat == 0) {
			return (ctx.body = xU.resReturn(null, 401, "项目未关注"));
		}

		try {
			let result = await this.Model.del(params.projectid, this.getUid());
			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 402, e.message);
		}
	}

	/**
	 * 添加关注
	 * @interface /follow/add
	 * @method GET
	 * @category follow
	 * @foldnumber 10
	 * @param {Number} projectid 项目id
	 * @param {String} projectname 项目名
	 * @param {String} icon 项目icon
	 * @returns {Object}
	 * @example /follow/add
	 */

	async add(ctx) {
		let params = ctx.request.body;
		params = xU.handleParams(params, {
			projectid: "number"
		});

		let uid = this.getUid();

		if (!params.projectid) {
			return (ctx.body = xU.resReturn(null, 400, "项目id不能为空"));
		}

		let checkRepeat = await this.Model.checkProjectRepeat(
			uid,
			params.projectid
		);

		if (checkRepeat) {
			return (ctx.body = xU.resReturn(null, 401, "项目已关注"));
		}

		try {
			let project = await this.modelProject.get(params.projectid);
			let data = {
				uid: uid,
				projectid: params.projectid,
				projectname: project.name,
				icon: project.icon,
				color: project.color
			};
			let result = await this.Model.save(data);
			result = xU.fieldSelect(result, [
				"_id",
				"uid",
				"projectid",
				"projectname",
				"icon",
				"color"
			]);
			ctx.body = xU.resReturn(result);
		} catch (e) {
			ctx.body = xU.resReturn(null, 402, e.message);
		}
	}
}

module.exports = followController;
