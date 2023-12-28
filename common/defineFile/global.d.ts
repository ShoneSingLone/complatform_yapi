import { t_orm, t_xU } from "./customType";

declare global {
	var yapi_configs: {
		/*如果有 对象属性为plugin名称 value也是一个object ，是配置信息*/
		/* *isUsePlugin: {
		AutowareRoutes: {
		  isUseSwagger: true
		}
	  },
	  * */
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
	};

	var orm: t_orm;
	var xU: t_xU;
}
