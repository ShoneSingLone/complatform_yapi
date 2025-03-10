/**
 * Created by gxl.gao on 2017/10/24.
 */
const ControllerBase = require("server/controllers/base");
const ModelStatisMock = require("./statisMockModel");

const commons = require("./util");
const os = require("os");
let cpu = require("cpu-load");

class statisMockController extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.modelStatisMock = xU.$orm(ModelStatisMock);
	}

	/**
	 * 获取所有统计总数
	 * @interface statismock/count
	 * @method get
	 * @category statistics
	 * @foldnumber 10
	 * @returns {Object}
	 */
	async getStatisCount(ctx) {
		try {
			let groupCount = await orm.group.getGroupListCount();
			let projectCount = await orm.project.getProjectListCount();
			let interfaceCount = await orm.interface.getInterfaceListCount();
			let interfaceCaseCount =
				await orm.interfaceCase.getInterfaceCaseListCount();

			return (ctx.body = xU.$response({
				groupCount,
				projectCount,
				interfaceCount,
				interfaceCaseCount
			}));
		} catch (err) {
			ctx.body = xU.$response(null, 400, err.message);
		}
	}

	/**
	 * 获取所有mock接口数据信息
	 * @interface statismock/get
	 * @method get
	 * @category statistics
	 * @foldnumber 10
	 * @returns {Object}
	 */
	async getMockDateList(ctx) {
		try {
			let mockCount = await this.modelStatisMock.getTotalCount();
			let mockDateList = [];

			if (!this.getRole() === "admin") {
				return (ctx.body = xU.$response(null, 405, "没有权限"));
			}
			//  默认时间是30 天为一周期
			let dateInterval = commons.getDateRange();
			mockDateList = await this.modelStatisMock.getDayCount(dateInterval);
			return (ctx.body = xU.$response({ mockCount, mockDateList }));
		} catch (err) {
			ctx.body = xU.$response(null, 400, err.message);
		}
	}

	/**
	 * 获取邮箱状态信息
	 * @interface statismock/getSystemStatus
	 * @method get
	 * @category statistics
	 * @foldnumber 10
	 * @returns {Object}
	 */
	async getSystemStatus(ctx) {
		try {
			let mail = "";
			if (yapi_configs.mail && yapi_configs.mail.enable) {
				mail = await this.checkEmail();
				// return ctx.body = xU.$response(result);
			} else {
				mail = "未配置";
			}

			let load = (await this.cupLoad()) * 100;

			let systemName = os.platform();
			let totalmem = commons.transformBytesToGB(os.totalmem());
			let freemem = commons.transformBytesToGB(os.freemem());
			let uptime = commons.transformSecondsToDay(os.uptime());

			let data = {
				mail,
				systemName,
				totalmem,
				freemem,
				uptime,
				load: load.toFixed(2)
			};
			return (ctx.body = xU.$response(data));
		} catch (err) {
			ctx.body = xU.$response(null, 400, err.message);
		}
	}

	checkEmail() {
		return new Promise(resolve => {
			let result = {};
			xU.mail.verify(error => {
				if (error) {
					result = "不可用";
					resolve(result);
				} else {
					result = "可用";
					resolve(result);
				}
			});
		});
	}

	async groupDataStatis(ctx) {
		try {
			let groupData = await orm.group.list();
			let result = [];
			for (let i = 0; i < groupData.length; i++) {
				let group = groupData[i];
				let groupId = group._id;
				const data = {
					name: group.group_name,
					interface: 0,
					mock: 0,
					project: 0
				};
				result.push(data);

				let projectCount = await orm.project.listCount(groupId);
				let projectData = await orm.project.list(groupId);
				let interfaceCount = 0;
				for (let j = 0; j < projectData.length; j++) {
					let project = projectData[j];
					interfaceCount += await orm.interface.listCount({
						project_id: project._id
					});
				}
				let mockCount = await this.modelStatisMock.countByGroupId(groupId);
				data.interface = interfaceCount;
				data.project = projectCount;
				data.mock = mockCount;
			}
			return (ctx.body = xU.$response(result));
		} catch (err) {
			ctx.body = xU.$response(null, 400, err.message);
		}
	}

	cupLoad() {
		return new Promise(resolve => {
			cpu(1000, function (load) {
				resolve(load);
			});
		});
	}
}

module.exports = statisMockController;
