const controller = require("./controller/syncController.js");

const interfaceSyncUtils = require("./interfaceSyncUtils.js");

module.exports = function () {
	xU.getInst(interfaceSyncUtils);

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
