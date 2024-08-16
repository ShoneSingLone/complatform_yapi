const { parse: urlParse } = require("url");

async function upsertInterface(ctx) {
	let { payload } = ctx;

	if (!this.$tokenAuth) {
		let auth = await this.checkAuth(payload.project_id, "project", "edit");

		if (!auth) {
			return (response = xU.$response(null, 40033, "没有权限"));
		}
	}
	payload.method = payload.method || "GET";

	payload.res_body_is_json_schema = payload.res_body_is_json_schema || false;
	payload.req_body_is_json_schema = payload.req_body_is_json_schema || false;

	payload.method = payload.method.toUpperCase();
	payload.req_params = payload.req_params || [];
	payload.res_body_type = payload.res_body_type
		? payload.res_body_type.toLowerCase()
		: "backup";

	let http_path = urlParse(payload.path, true);

	http_path.pathname = this.handleBasepath(http_path.pathname);
	if (!xU.verifyPath(http_path.pathname)) {
		return (response = xU.$response(
			null,
			400,
			"path第一位必需为 /, 只允许由 字母数字-/_:.! 组成"
		));
	}

	handleHeaders(payload);

	payload.query_path = {};
	payload.query_path.path = http_path.pathname;
	payload.query_path.params = [];
	xU._.each(http_path.query, (value, name) => {
		payload.query_path.params.push({
			name: name,
			value: value
		});
	});

	let count = await orm.interface.count(
		payload.project_id,
		payload.path,
		payload.method
	);

	if (count > 0) {
		return (response = xU.$response(
			null,
			40022,
			"已存在的接口:" + payload.path + "[" + payload.method + "]"
		));
	}

	let data = Object.assign(payload, {
		uid: this.getUid(),
		add_time: xU.time(),
		up_time: xU.time()
	});

	xU.handleVarPath(payload.path, payload.req_params);

	if (payload.req_params.length > 0) {
		data.type = "var";
		data.req_params = payload.req_params;
	} else {
		data.type = "static";
	}

	// 新建接口的人成为项目dev  如果不存在的话
	// 命令行导入时无法获知导入接口人的信息，其uid 为 999999
	let uid = this.getUid();

	if (this.getRole() !== "admin" && uid !== 999999) {
		let userdata = await xU.getUserdata(uid, "dev");
		// 检查一下是否有这个人
		let check = await orm.project.checkMemberRepeat(payload.project_id, uid);
		if (check === 0 && userdata) {
			await orm.project.addMember(payload.project_id, [userdata]);
		}
	}

	let result = await orm.interface.save(data);
	xU.emitHook("interface_add", result).then();
	orm.interfaceCategory.get(payload.catid).then(cate => {
		let username = this.getUsername();
		let title = `<a href="/user/profile/${this.getUid()}">${username}</a> 为分类 <a href="/project/${
			payload.project_id
		}/interface/api/cat_${payload.catid}">${
			cate.name
		}</a> 添加了接口 <a href="/project/${payload.project_id}/interface/api/${
			result._id
		}">${data.title}</a> `;

		xU.saveLog({
			content: title,
			type: "project",
			uid: this.getUid(),
			username: username,
			typeid: payload.project_id
		});
		orm.project
			.up(payload.project_id, { up_time: new Date().getTime() })
			.then();
	});

	await autoAddTag(payload);

	response = xU.$response(result);
}

async function autoAddTag(params) {
	//检查是否提交了目前不存在的tag
	let tags = params.tag;
	if (tags && Array.isArray(tags) && tags.length > 0) {
		if (!params.project_id) return;
		let projectData = await orm.project.get(params.project_id);
		let tagsInProject = projectData.tag;
		let needUpdate = false;
		if (
			tagsInProject &&
			Array.isArray(tagsInProject) &&
			tagsInProject.length > 0
		) {
			tags.forEach(tag => {
				if (
					!xU._.find(tagsInProject, item => {
						return item.name === tag;
					})
				) {
					//tag不存在
					needUpdate = true;
					tagsInProject.push({
						name: tag,
						desc: tag
					});
				}
			});
		} else {
			needUpdate = true;
			tagsInProject = [];
			tags.forEach(tag => {
				tagsInProject.push({
					name: tag,
					desc: tag
				});
			});
		}
		if (needUpdate) {
			//需要更新tag
			let data = {
				tag: tagsInProject,
				up_time: xU.time()
			};
			await orm.project.up(params.project_id, data);
		}
	}
}

function handleHeaders(values) {
	let isfile = false,
		isHaveContentType = false;
	if (values.req_body_type === "form") {
		values.req_body_form.forEach(item => {
			if (item.type === "file") {
				isfile = true;
			}
		});

		values.req_headers.map(item => {
			if (item.name === "Content-Type") {
				item.value = isfile
					? "multipart/form-data"
					: "application/x-www-form-urlencoded";
				isHaveContentType = true;
			}
		});
		if (isHaveContentType === false) {
			values.req_headers.unshift({
				name: "Content-Type",
				value: isfile
					? "multipart/form-data"
					: "application/x-www-form-urlencoded"
			});
		}
	} else if (values.req_body_type === "json") {
		values.req_headers
			? values.req_headers.map(item => {
					if (item.name === "Content-Type") {
						item.value = "application/json";
						isHaveContentType = true;
					}
			  })
			: [];
		if (isHaveContentType === false) {
			values.req_headers = values.req_headers || [];
			values.req_headers.unshift({
				name: "Content-Type",
				value: "application/json"
			});
		}
	}
}

async function interface_add_cat({ payload }) {
	let response = xU.$response(null, 404, "not found");
	try {
		if (!this.$tokenAuth) {
			let auth = await this.checkAuth(payload.project_id, "project", "edit");
			if (!auth) {
				return (response = xU.$response(null, 400, "没有权限"));
			}
		}

		if (!payload.name) {
			return (response = xU.$response(null, 400, "名称不能为空"));
		}

		const res = await orm.interfaceCategory.search({
			project_id: payload.project_id,
			name: payload.name
		});

		if (res?.length) {
			return (response = xU.$response(null, 400, "名称已存在"));
		}

		let result = await orm.interfaceCategory.save({
			name: payload.name,
			project_id: payload.project_id,
			desc: payload.desc,
			uid: this.getUid(),
			add_time: xU.time(),
			up_time: xU.time()
		});

		let username = this.getUsername();
		xU.saveLog({
			content: `<a href="/user/profile/${this.getUid()}">${username}</a> 添加了分类  <a href="/project/${
				payload.project_id
			}/interface/api/cat_${result._id}">${payload.name}</a>`,
			type: "project",
			uid: this.getUid(),
			username: username,
			typeid: payload.project_id
		});
		response = xU.$response(result);
	} catch (e) {
		response = xU.$response(null, 402, e.message);
	}
}

module.exports = {
	upsertInterface,
	autoAddTag,
	handleHeaders,
	interface_add_cat
};
