exports.newSwaggerJSON = (customInfo = {}) => {
	return Object.assign(
		{
			tags: [],
			schemes: ["https", "http"],
			paths: {},
			definitions: {}
		},
		customInfo
	);
};
