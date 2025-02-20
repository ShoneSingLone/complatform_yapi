/**
 * Created by gxl.gao on 2017/10/24.
 */

const { DbConnection } = xU;
const controller = require("./controller");
const statisModel = require("./statisMockModel");
const commons = require("./util");

module.exports = function () {
	(function () {
		let Col = DbConnection.connection.db.collection("statis_mock");
		Col.createIndex({
			interface_id: 1
		});
		Col.createIndex({
			project_id: 1
		});
		Col.createIndex({
			group_id: 1
		});
		Col.createIndex({
			time: 1
		});
		Col.createIndex({
			date: 1
		});
	})();

	this.bindHook("add_router", function (addRouter) {
		addRouter({
			controller: controller,
			method: "get",
			path: "statismock/count",
			action: "getStatisCount"
		});

		addRouter({
			controller: controller,
			method: "get",
			path: "statismock/get",
			action: "getMockDateList"
		});
		addRouter({
			controller: controller,
			method: "get",
			path: "statismock/get_system_status",
			action: "getSystemStatus"
		});
		addRouter({
			controller: controller,
			method: "get",
			path: "statismock/group_data_statis",
			action: "groupDataStatis"
		});
	});

	// MockServer生成mock数据后触发
	this.bindHook("mock_after", function (context) {
		let interfaceId = context.interfaceData._id;
		let projectId = context.projectData._id;
		let groupId = context.projectData.group_id;
		//let ip = context.ctx.originalUrl;
		let ip = xU.getIp(context.ctx);

		let data = {
			interface_id: interfaceId,
			project_id: projectId,
			group_id: groupId,
			time: xU.time(),
			ip: ip,
			date: commons.formatYMD(new Date())
		};
		let inst = xU.$orm(statisModel);

		try {
			inst.save(data).then();
		} catch (e) {
			xU.applog.info("mockStatisError", e);
		}
	});
};
