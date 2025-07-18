function arrUnique(arr1, arr2) {
	let arr = arr1.concat(arr2);
	let res = arr.filter(function (item, index, arr) {
		return arr.indexOf(item) === index;
	});
	return res;
}

const noticeObj = {
	mail: {
		title: "邮件",
		hander: (emails, title, content) => {
			xU.sendMail({
				to: emails,
				contents: content,
				subject: title
			});
		}
	}
};

xU.emitHook("addNotice", noticeObj);

xU.sendNotice = async function (project_id, data) {
	const followInst = orm.follow;
	const userInst = orm.user;
	const list = await followInst.listByProjectId(project_id);
	const starUsers = list.map(item => item.uid);
	const projectList = await orm.project.get(project_id);
	const projectMenbers = projectList.members
		.filter(item => item.email_notice)
		.map(item => item.uid);

	const users = arrUnique(projectMenbers, starUsers);
	const usersInfo = await userInst.findByUids(users);
	const emails = usersInfo.map(item => item.email).join(",");

	try {
		Object.keys(noticeObj).forEach(key => {
			let noticeItem = noticeObj[key];
			try {
				noticeItem.hander(emails, data.title, data.content);
			} catch (err) {
				xU.applog.error(
					"发送" + (noticeItem.title || key) + "失败" + err.message
				);
			}
		});
	} catch (e) {
		xU.applog.error("发送失败：" + e);
	}
};
