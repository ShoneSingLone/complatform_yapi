import { LoDashStatic } from "lodash";

type t_xU = {
	schema?: (schemaName: string) => object;
	orm?: <T>(model: T) => T;
};

type t_all_lodash_and_mine = LoDashStatic & typeof global.xU & t_xU;

type t_yapi_configs = {
	/*如果有 对象属性为plugin名称 value也是一个object ，是配置信息*/
	/*
  *isUsePlugin: {
    AutowareRoutes: {
      isUseSwagger: true
    }
  },
  * */
	isUsePlugin?: object;
	port: string;
	adminAccount: string;
	cors: {
		allow: strig[];
	};
	db: {
		connectString?: string;
		reconnectTries?: string;
		reconnectInterval?: string;
		servername?: string;
		DATABASE?: string;
		port?: string;
		user?: string;
		pass?: string;
	};
	mail: {
		enable: boolean;
		host: string;
		port: number;
		from: string;
		auth: {
			user: string;
			pass: string;
		};
	};
};

declare global {
	var yapi_configs: t_yapi_configs;
	var xU: t_all_lodash_and_mine;
	var orm: {
		project: Object;
	};
}
