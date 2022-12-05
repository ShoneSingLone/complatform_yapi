const { WEBCONFIG } = require('../../../privateConfigs.js');

exports.initDbAndCommon = async function () {
  global.WEBCONFIG = WEBCONFIG;
  require('../yapi.js');
  const { yapi } = global;
  /*  */
  require('../utils/commons').setYapiCommons();
  await require('../utils/db.js').setYapiMongooseAsync();
  return yapi;
};
