import { LoDashStatic } from 'lodash';

type t_xU = {
  schema?: (schemaName: string) => object;
  orm?: <T>(model: T) => T;
};

type t_all_lodash_and_mine = LoDashStatic & typeof global.xU & t_xU;

t_WEBCONFIG = {
  /*如果有 对象属性为plugin名称 value也是一个object ，是配置信息*/
  /*
  *isUsePlugin: {
    AutowareRoutes: {
      isUseSwagger: true
    }
  },
  * */
  isUsePlugin? : object;
  port: string;
  adminAccount: string;
  db: {
    connectString? : string;
    reconnectTries? : string;
    reconnectInterval? : string;
    servername? : string;
    DATABASE? : string;
    port? : string;
    user? : string;
    pass? : string;
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
  var WEBCONFIG: t_WEBCONFIG;
  var xU: t_all_lodash_and_mine;
}
