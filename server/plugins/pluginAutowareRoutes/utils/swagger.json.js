exports.newSwaggerJSON = (customInfo = {}) => {
	return Object.assign(
		{
			tags: [],
			schemes: ["http"],
			paths: {},
			definitions: {}
		},
		customInfo
	);
};
