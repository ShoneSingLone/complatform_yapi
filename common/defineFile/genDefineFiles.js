const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");
var esprima = require("esprima-next");
var { traverse, getCode } = require("esprima-ast-utils");

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
		const ormTypes = await Promise.all(
			_.map(files, async fileName => {
				const prop = path.basename(fileName).replace(/.ts$/, "");
				if ("base" === prop) {
					return "";
				}

				const doc = await fs.promises.readFile(fileName, "utf8");
				var ast = await esprima.parseScript(doc, {
					comment: false,
					jsx: false,
					loc: false,
					range: false
				});

				let subTypeArray = [];
				traverse(ast, function (node) {
					if (node.type === "ClassDeclaration") {
						_.each(node.body.body, method => {
							subTypeArray.push(`${method.key.name}:Function;`);
						});
					}
				});
				const subTypes = subTypeArray.join("\n");
				return `${prop}:{
                ${subTypes}
            };`;
			})
		);

		types.push(`export type t_orm = {
            ${ormTypes.join("\n")}
        }; `);
	})();

	const content = `import { LoDashStatic } from "lodash"
    ${types.join("\n\n")}
    `;

	await fs.promises.writeFile("./customType.ts", content, "utf-8");
	throw new Error("🚀");
})();
