const controller = require("./controller");

// const mongoose = require('mongoose');
// const _ = require('lodash');

module.exports = function () {
	this.bindHook("add_router", function (addRouter) {
		addRouter({
			controller: controller,
			method: "get",
			path: "export",
			action: "exportData"
		});
	});
};
