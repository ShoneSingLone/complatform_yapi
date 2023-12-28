import { LoDashStatic } from "lodash";
export type t_xU = LoDashStatic & {
	handleBasepath: Function;
	applog: object;
	mail: object;
	$orm: Function;
	schemaToJson: Function;
	$response: Function;
	log: Function;
	fileExist: Function;
	time: Function;
	fieldSelect: Function;
	rand: Function;
	json_parse: Function;
	randStr: Function;
	getIp: Function;
	$saltIt: Function;
	expireDate: Function;
	expireDay: Function;
	sendMail: Function;
	validateSearchKeyword: Function;
	filterRes: Function;
	handleVarPath: Function;
	verifyPath: Function;
	sandbox: Function;
	trim: Function;
	ltrim: Function;
	rtrim: Function;
	ensureParamsType: Function;
	validateParams: Function;
	saveLog: Function;
	createAction: Function;
	handleParamsValue: Function;
	getCaseList: Function;
	runCaseScript: Function;
	getUserdata: Function;
	handleMockScript: Function;
	createWebAPIRequest: Function;
	storageCreator: Function;
	dayjs: Function;
	$hashCode: Function;
};

export type t_orm = {
	WikiOrder: {
		schema: object;
		name: string;
		model: Function;
	};
	wiki: {
		schema: object;
		name: string;
		model: Function;
	};
	VerifyCode: {
		schema: object;
		name: string;
		model: Function;
	};
	user: {
		schema: object;
		name: string;
		model: Function;
	};
	token: {
		schema: object;
		name: string;
		model: Function;
	};
	storage: {
		schema: object;
		name: string;
		model: Function;
	};
	Resource: {
		schema: object;
		name: string;
		model: Function;
	};
	project: {
		schema: object;
		name: string;
		model: Function;
		handleEnvNullData: Function;
	};
	log: {
		schema: object;
		name: string;
		model: Function;
	};
	interfaceCol: {
		schema: object;
		name: string;
		model: Function;
	};
	interfaceCategory: {
		schema: object;
		name: string;
		model: Function;
	};
	interfaceCase: {
		schema: object;
		name: string;
		model: Function;
	};
	interface: {
		schema: object;
		name: string;
		model: Function;
	};
	I18n: {
		schema: object;
		name: string;
		model: Function;
	};
	group: {
		schema: object;
		name: string;
		model: Function;
	};
	follow: {
		schema: object;
		name: string;
		model: Function;
	};
	base: {};
	avatar: {
		schema: object;
		name: string;
		model: Function;
	};
};
