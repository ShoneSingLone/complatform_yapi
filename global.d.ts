// const commons = require('./server/utils/commons');
const { yapi, commons } = global;

type t_yapi = typeof yapi;
type t_commons = typeof global.commons;

declare const hehe: t_commons | t_yapi;
