import { t_orm, t_xU } from "../common/defineFile/customType";

declare global {
	var orm: t_orm;
	var xU: t_xU;

	var yapi_configs: {
		INSERT_RESOURCE_ENTRY_PATH: string;
		INSERT_RESOURCE_ENTRY_PATH_PARENT: string;
		RESOURCE_ASSETS_REMOTE: string;
		passsalt?: string;
		isCloseRegister?: boolean;
		/*如果有 对象属性为plugin名称 value也是一个object ，是配置信息*/
		/**
		 * isUsePlugin: {
		 * AutowareRoutes: {
		 * isUseSwagger: true
		 * }
		 *  },
		 *  */
		isUsePlugin?: {
			AutowareRoutes?: {
				isUseSwagger?: boolean;
				swaggerInfo?: {
					basePath?: string;
				};
			};
		};
		port: string;
		adminAccount: string;
		cors: {
			allow: string[];
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
		baiduTranslate: {
			appId: string;
			appKey: string;
		};
	};
}
