const { DbConnection } = xU;
const controller = require("./controller");

module.exports = function () {
	(function () {
		let Col = DbConnection.connection.db.collection("wiki");
		Col.createIndex({
			project_id: 1
		});
	})();

	this.bindHook("add_router", function (addRouter) {
		addRouter({
			// 获取wiki信息
			controller: controller,
			method: "get",
			path: "wiki_desc/get",
			action: "getWikiDesc"
		});

		addRouter({
			// 更新wiki信息
			controller: controller,
			method: "post",
			path: "wiki_desc/up",
			action: "uplodaWikiDesc"
		});
	});

	this.bindHook("add_ws_router", function (wsRouter) {
		wsRouter({
			controller: controller,
			method: "get",
			path: "wiki_desc/solve_conflict",
			action: "wikiConflict"
		});
	});
};
