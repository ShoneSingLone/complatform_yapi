(async function main() {
	await require("../../../utils/onFirstLine")();
	const { handle_each_controller_info } = require("../utils/getInterfaceInfo");
	const ControllerUseSwagger = require("server/controllers/AutowareControllerUseSwagger");
	const swaggerJSON = handle_each_controller_info({
		controller: ControllerUseSwagger,
		controllerName: "UseSwagger"
	});
	console.log("🚀:", "swaggerJSON", JSON.stringify(swaggerJSON, null, 2));
})();
