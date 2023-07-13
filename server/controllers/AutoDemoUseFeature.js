const BaseController = require("server/controllers/base");
const { ModelResource } = require("server/models/Resource");
const { _n } = require("@ventose/utils-node");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const mime = require("mime-types");

let TARGET_PREFIX = path.resolve(__dirname, "../../..", xU.var.RESOURCE_ASSETS);

class AutoDemoUseFeature extends BaseController {
	constructor(ctx) {
		super(ctx);
		this.orm_resource = xU.getInst(ModelResource);
	}
}

AutoDemoUseFeature[`/use/feature`] = {
	method: "get",
	request: {
		params: {},
		query: {},
		body: {}
	},
	response: {
		200: {},
		500: {}
	},
	handler(ctx) {}
};

AutoDemoUseFeature[`/use/feature`] = {
	method: "get",
	request: {
		params: {},
		query: {},
		body: {}
	},
	response: {
		200: {},
		500: {}
	},
	handler(ctx) {}
};

module.exports = AutoDemoUseFeature;
