const fs = require("fs");
const path = require("path");
const { _n } = require("@ventose/utils-node");
const traverse = require("@babel/traverse").default;
const BABEL_PARSER = require("@babel/parser");

(async function () {
	await require("../../server/utils/onFirstLine.ts")();
	const _ = require("lodash");

	const types = [];

	await (async function () {
		/* xU */
		const doc = await fs.promises.readFile(
			path.resolve(__dirname, "../../server/utils/xU.ts"),
			"utf8"
		);
		var ast = await BABEL_PARSER.parse(doc, {
			// 指定代码类型，可以是 'script' 或 'module'
			sourceType: "script"
		});
		// await fs.promises.writeFile("./ast.json", JSON.stringify(ast, null, 2));
		traverse(ast, {
			Identifier(path) {
				if (("找到变量", path.node.name === "handleBasepath")) {
					console.log("找到变量", path.node.name === "handleBasepath");
				}
			}
			// NewExpression: NewExpressionPath => {
			// 	const { scope, parentPath, state, node, parent } = NewExpressionPath;
			// 	if (node?.callee?.name == "Proxy") {
			// 		if (parent?.id?.name === 'xU') {
			// 			debugger;
			// 			console.log("🚀 ~  scope, parentPath, state, node :", scope, parentPath, state, node);
			// 		}
			// 	} else {
			// 		console.log("parent?.left?.object?.name", parent?.left?.object?.name);
			// 	}
			// 	// console.log("🚀 ~ ClassDeclaration:", AssignmentExpressionPath);
			// 	// 对找到的 ClassDeclaration 进行单独的遍历
			// }
			// AssignmentExpression: AssignmentExpressionPath => {
			// 	const { scope, parentPath, state, node } = AssignmentExpressionPath;
			// 	console.log("AssignmentExpressionPath.node.left.object.name", AssignmentExpressionPath?.node?.left?.object?.name || JSON.stringify(node, null, 2));
			// 	// console.log("🚀 ~ ClassDeclaration:", AssignmentExpressionPath);
			// 	// 对找到的 ClassDeclaration 进行单独的遍历
			// }
		});

		const subTypes = _.map(Object.keys(xU), prop => {
			const fn = xU[prop];
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
				var ast = await BABEL_PARSER.parse(doc, {
					// 指定代码类型，可以是 'script' 或 'module'
					sourceType: "script"
				});
				let subTypeArray = [];
				traverse(ast, {
					// Identifier(path) { console.log('找到变量', path.node.name); },
					ClassDeclaration: classPath => {
						const { scope, parentPath, state, node } = classPath;
						console.log("🚀 ~ ClassDeclaration:", node.id.name);
						// 对找到的 ClassDeclaration 进行单独的遍历
						traverse(
							classPath.node,
							{
								ClassMethod(methodPath) {
									let bodyDeclare = "(...args:any)=> Promise<any>";
									const { key, leadingComments } = methodPath.node;
									subTypeArray.push(`
								${_.map(leadingComments, ({ value: comment }) => {
									if (String(comment).includes("@typescriptDeclare")) {
										bodyDeclare = comment.replace("@typescriptDeclare", "");
										return "";
									}
									return `/*${comment}\n*/`;
								}).join("\n")}
								${key.name}:${bodyDeclare};
								`);
								}
							},
							scope,
							parentPath,
							state
						);
					}
				});
				const subTypes = subTypeArray.join("\n");
				return `${prop}:{ ${subTypes} };`;
			})
		);

		types.push(`export type t_orm = {
            ${ormTypes.join("\n")}
        }; `);
	})();

	const content = `import { LoDashStatic } from "lodash"
    ${types.join("\n\n")}
    `;

	await fs.promises.writeFile(path.resolve(__dirname, "customType.ts"), content, "utf-8");
	throw new Error("🚀");
})();
