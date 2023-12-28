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
            if (type === 'function') {
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
            const currModel = require(fileName);
            const model = new currModel();
            console.log("🚀 ~ file: genDefineFiles.js:36 ~ ormTypes ~ model:", Object.entries(Object.getPrototypeOf(model)));
            const subTypes = _.map(model, (fn, prop) => {
                let type = typeof fn;
                if (type === 'function') {
                    type = `Function`;
                }
                return `${prop}:${type};`;
            }).join("\n");
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

    await fs.promises.writeFile("./customType.ts", content, "utf-8");
    throw new Error("🚀: genDefineFiles.js");
})();