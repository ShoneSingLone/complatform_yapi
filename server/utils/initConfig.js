global.WEBCONFIG = require('../../../yapiConfigs.js');

exports.initDbAndCommon = async function () {
  require('../yapi.js');
  require('../utils/commons').setYapiCommons();
  await require('../utils/db.js').setYapiMongooseAsync();
  return global.yapi;
};
