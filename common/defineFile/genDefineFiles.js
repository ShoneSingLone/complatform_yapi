const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");

(async function () {
	await require("../../server/utils/onFirstLine.ts")();
	const _ = require("lodash");

	const types = [];

	(function () {
		/* xU */
		const xU = require("../../server/utils/xU.ts");
		const subTypes = _.map(xU, (fn, prop) => {
			let type = typeof fn;
			if (type === "function") {
				type = `Function`;
			}
			return `${prop}:${type};`;
		}).join("\n");

		types.push(`export type t_xU = LoDashStatic & {
            ${subTypes}
        };`);
	})();

	await (async function () {
		/* orm */
		const [, files] = await _n.asyncAllDirAndFile([
			path.resolve(__dirname, "../../server/models")
		]);
		const ormTypes = _.map(files, fileName => {
			const prop = path.basename(fileName).replace(/.ts$/, "");
			if ("base" === prop) {
				return "";
			}
			const CurrentModel = require(fileName);
			let currentModel = new CurrentModel();
			let subTypeArray = [];
			for (let prop in currentModel) {
				const fn = currentModel[prop];
				let type = typeof fn;
				if (type === "function") {
					type = `Function`;
				}
				subTypeArray.push(`${prop}:${type};`);
			}

			for (let prop in Object.getOwnPropertyNames(currentModel.__proto__)) {
				console.log(prop);
				// const fn = currentModel[prop];
				// let type = typeof fn;
				// if (type === "function") {
				// 	type = `Function`;
				// }
				// subTypeArray.push(`${prop}:${type};`);
			}
			const subTypes = subTypeArray.join("\n");

			return `${prop}:{
                ${subTypes}
            };`;
		});
		types.push(`export type t_orm = {
            ${ormTypes.join("\n")}
        }; `);
	})();

	const content = `import { LoDashStatic } from "lodash"
    ${types.join("\n\n")}
    `;

	// await fs.promises.writeFile("./customType.ts", content, "utf-8");
	throw new Error("🚀");
})();
