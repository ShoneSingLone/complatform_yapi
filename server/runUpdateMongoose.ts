(async function () {
	await require("./utils/onFirstLine.ts")();
	await Promise.all(
		[
			"WikiOrder",
			"wiki",
			"VerifyCode",
			"user",
			"token",
			"storage",
			"ResourceChunk",
			"Resource",
			"project",
			"log",
			"interfaceCol",
			"interfaceCategory",
			"interfaceCase",
			"interface",
			"I18n",
			"group",
			"follow",
			"avatar",
			"Audio"
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

	process.exit(0);
})();
