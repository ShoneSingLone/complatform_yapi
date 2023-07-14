(async function main() {
	await require("../../../utils/onFirstLine")();
	const { autowareRoute } = require("../utils/getInterfaceInfo");
	const ControllerUseSwagger = require("server/controllers/AutowareControllerUseSwagger");
	const swaggerJSON = autowareRoute({
		controller: ControllerUseSwagger,
		controllerName: "UseSwagger"
	});
	console.log("🚀:", "swaggerJSON", JSON.stringify(swaggerJSON, null, 2));
})();
