(async function () {
	await require("./utils/onFirstLine.ts")();
	const mongoose = require("mongoose");
	async function update() {
		await Promise.all(
			[
				"Audio",
				"avatar",
				"base",
				"ChatApply",
				"ChatFriend",
				"CiCd",
				"CiCdTask",
				"follow",
				"GitRepo",
				"group",
				"I18n",
				"interface",
				"interfaceCase",
				"interfaceCategory",
				"interfaceCol",
				"log",
				"project",
				"Redis",
				"Resource",
				"ResourceChunk",
				"storage",
				"token",
				"user",
				"VerifyCode",
				"wiki",
				"WikiOrder"
			].map(async prop => {
				const { model } = orm[prop];
				try {
					const res = await model.updateMany(
						{
							_id: {
								$ne: null
							}
						},
						[
							{
								$set: {
									_id: {
										$toString: "$_id"
									}
								}
							}
						]
					);
					console.log("🚀 ~ insert_files ~ res:", prop, res);
					return;
				} catch (error) {
					console.log("🚀 ~ insert_files ~ error:", error);
				}
			})
		);
	}

	async function rename() {
		await Promise.all(
			[
				"Audio",
				"avatar",
				"base",
				"ChatApply",
				"ChatFriend",
				"CiCd",
				"CiCdTask",
				"follow",
				"GitRepo",
				"group",
				"I18n",
				"interface",
				"interfaceCase",
				"interfaceCategory",
				"interfaceCol",
				"log",
				"project",
				"Redis",
				"Resource",
				"ResourceChunk",
				"storage",
				"token",
				"user",
				"VerifyCode",
				"wiki",
				"WikiOrder"
			].map(async prop => {
				const { model } = orm[prop];
				try {
					const res = await model.updateMany(
						{ interfaceId: { $exists: true } },
						{ $rename: { interfaceId: "interface_id" } }
					);
					console.log("🚀 ~ insert_files ~ res:", prop, res);
					return;
				} catch (error) {
					console.log("🚀 ~ insert_files ~ error:", error);
				}
			})
		);

		await mongoose.disconnect();
	}
	rename();
})();
