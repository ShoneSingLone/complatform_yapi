const { execCmd } = require("../common/utils");
execCmd("npm run redeploy", {
	log(data) {
		console.log("execCmd", data);
	}
});
