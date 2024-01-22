(async function () {
	await require("./utils/onFirstLine.ts")();
	const path = require("path");
	const mongoose = require("mongoose");
	const fs = require("fs-extra");
	const ModelUser = require("server/models/user");

	let TARGET_PREFIX = path.join(
		xU.var.APP_ROOT_SERVER_DIR,
		xU.var.UPLOADS,
		xU.var.RESOURCE_ASSETS
	);
	function install() {
		const fileExistURL = path.join(xU.var.APP_ROOT_DIR, "..", "yapi.installed");
		let isExist = xU.fileExist(fileExistURL);
		if (isExist) {
			throw new Error(
				`${fileExistURL} 存在，代表已安装。如果需要重新安装，请删掉yapi.installed文件`
			);
		}

		setupSql();
	}

	function setupSql() {
		let userInst = orm.user;
		let passsalt = xU.randStr();
		let result = userInst.save({
			username: yapi_configs.adminAccount.substr(
				0,
				yapi_configs.adminAccount.indexOf("@")
			),
			email: yapi_configs.adminAccount,
			password: xU.$saltIt(yapi_configs.adminPwd, passsalt),
			passsalt: passsalt,
			role: "admin",
			add_time: xU.time(),
			up_time: xU.time()
		});

		(function () {
			let resourceInst = orm.resource;
			var bitmap = fs.readFileSync(
				path.resolve(__dirname, "./uploads/RESOURCE_ASSETS/common/404.png")
			);
			resourceInst.save({
				name: `SYSTEM_404`,
				useFor: "all",
				type: "image/png",
				path: `${TARGET_PREFIX}/common/404.webp`,
				basecode: new Buffer(bitmap).toString("base64"),
				add_time: Date.now()
			});
		})();

		(function () {
			let storageCol = mongoose.connection.db.collection("storage");
			storageCol.createIndex(
				{
					key: 1
				},
				{
					unique: true
				}
			);

			let userCol = mongoose.connection.db.collection("user");
			userCol.createIndex({
				username: 1
			});
			userCol.createIndex(
				{
					email: 1
				},
				{
					unique: true
				}
			);

			let projectCol = mongoose.connection.db.collection("project");
			projectCol.createIndex({
				uid: 1
			});
			projectCol.createIndex({
				name: 1
			});
			projectCol.createIndex({
				group_id: 1
			});

			let logCol = mongoose.connection.db.collection("log");
			logCol.createIndex({
				uid: 1
			});

			logCol.createIndex({
				typeid: 1,
				type: 1
			});

			let interfaceColCol = mongoose.connection.db.collection("interface_col");
			interfaceColCol.createIndex({
				uid: 1
			});
			interfaceColCol.createIndex({
				project_id: 1
			});

			let interfaceCatCol = mongoose.connection.db.collection("interface_cat");
			interfaceCatCol.createIndex({
				uid: 1
			});
			interfaceCatCol.createIndex({
				project_id: 1
			});

			let interfaceCaseCol =
				mongoose.connection.db.collection("interface_case");
			interfaceCaseCol.createIndex({
				uid: 1
			});
			interfaceCaseCol.createIndex({
				col_id: 1
			});
			interfaceCaseCol.createIndex({
				project_id: 1
			});

			let interfaceCol = mongoose.connection.db.collection("interface");
			interfaceCol.createIndex({
				uid: 1
			});
			interfaceCol.createIndex({
				path: 1,
				method: 1
			});
			interfaceCol.createIndex({
				project_id: 1
			});

			let groupCol = mongoose.connection.db.collection("group");
			groupCol.createIndex({
				uid: 1
			});
			groupCol.createIndex({
				group_name: 1
			});

			let avatarCol = mongoose.connection.db.collection("avatar");
			avatarCol.createIndex({
				uid: 1
			});

			let tokenCol = mongoose.connection.db.collection("token");
			tokenCol.createIndex({
				project_id: 1
			});

			let followCol = mongoose.connection.db.collection("follow");
			followCol.createIndex({
				uid: 1
			});
			followCol.createIndex({ project_id: 1 });

			result.then(
				function () {
					fs.ensureFileSync(path.join(xU.var.APP_ROOT_DIR, "yapi.installed"));
					console.log(
						`初始化管理员账号成功,账号名："${yapi_configs.adminAccount}"，密码："${yapi_configs.adminPwd}"`
					);

					process.exit(0);
				},
				function (err) {
					throw new Error(
						`初始化管理员账号 "${yapi_configs.adminAccount}" 失败, ${err.message}`
					);
				}
			);
		})();
	}

	install();
})();
