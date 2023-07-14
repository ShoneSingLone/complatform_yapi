const controller = require("./controller/syncController");

const interfaceSyncUtils = require("./interfaceSyncUtils");

module.exports = function () {
	xU.orm(interfaceSyncUtils);
	this.bindHook("add_router", function (addRouter) {
		addRouter({
			controller: controller,
			method: "get",
			path: "autoSync/get",
			action: "getSync"
		});
		addRouter({
			controller: controller,
			method: "post",
			path: "autoSync/save",
			action: "upSync"
		});
	});
};
