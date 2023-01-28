const { configs } = require("C:/yapiConfigs");

exports.initDbAndCommon = async function () {
  global.WEBCONFIG = configs;
  require('../yapi.js');
  const { yapi } = global;
  /*  */
  require('../utils/commons').setYapiCommons();
  await require('../utils/db.js').setYapiMongooseAsync();
  return yapi;
};
