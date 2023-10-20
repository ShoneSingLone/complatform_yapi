/**
 * Created by gxl.gao on 2017/10/24.
 */
const ControllerBase = require("server/controllers/base");
const ModelGroup = require("server/models/group");
const { ModelProject } = require("server/models/project");
const { ModelInterface } = require("server/models/interface");
const ModelInterfaceCase = require("server/models/interfaceCase");
const ModelStatisMock = require("./statisMockModel");

const commons = require("./util");
const os = require("os");
let cpu = require("cpu-load");

class statisMockController extends ControllerBase {
	constructor(ctx) {
		super(ctx);
		this.modelStatisMock = xU.orm(ModelStatisMock);
		this.modelGroup = xU.orm(ModelGroup);
		this.modelProject = xU.orm(ModelProject);
		this.modelInterface = xU.orm(ModelInterface);
		this.modelInterfaceCase = xU.orm(ModelInterfaceCase);
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
			let groupCount = await this.modelGroup.getGroupListCount();
			let projectCount = await this.modelProject.getProjectListCount();
			let interfaceCount = await this.modelInterface.getInterfaceListCount();
			let interfaceCaseCount =
				await this.modelInterfaceCase.getInterfaceCaseListCount();

			return (ctx.body = xU.resReturn({
				groupCount,
				projectCount,
				interfaceCount,
				interfaceCaseCount
			}));
		} catch (err) {
			ctx.body = xU.resReturn(null, 400, err.message);
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
				return (ctx.body = xU.resReturn(null, 405, "没有权限"));
			}
			//  默认时间是30 天为一周期
			let dateInterval = commons.getDateRange();
			mockDateList = await this.modelStatisMock.getDayCount(dateInterval);
			return (ctx.body = xU.resReturn({ mockCount, mockDateList }));
		} catch (err) {
			ctx.body = xU.resReturn(null, 400, err.message);
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
			if (WEBCONFIG.mail && WEBCONFIG.mail.enable) {
				mail = await this.checkEmail();
				// return ctx.body = xU.resReturn(result);
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
			return (ctx.body = xU.resReturn(data));
		} catch (err) {
			ctx.body = xU.resReturn(null, 400, err.message);
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
			let groupData = await this.modelGroup.list();
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

				let projectCount = await this.modelProject.listCount(groupId);
				let projectData = await this.modelProject.list(groupId);
				let interfaceCount = 0;
				for (let j = 0; j < projectData.length; j++) {
					let project = projectData[j];
					interfaceCount += await this.modelInterface.listCount({
						project_id: project._id
					});
				}
				let mockCount = await this.modelStatisMock.countByGroupId(groupId);
				data.interface = interfaceCount;
				data.project = projectCount;
				data.mock = mockCount;
			}
			return (ctx.body = xU.resReturn(result));
		} catch (err) {
			ctx.body = xU.resReturn(null, 400, err.message);
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
