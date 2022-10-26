exports.initDbAndCommon = async function () {
  require('../yapi.js');
  const { yapi } = global;
  /*  */
  require('../utils/commons').setYapiCommons();
  await require('../utils/db.js').setYapiMongooseAsync();
  return yapi;
};
