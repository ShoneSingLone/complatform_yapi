global.WEBCONFIG = require('../../../yapiConfigs.js');

/* module.exports = {
    port: "0000",
    adminAccount: "xxx@xxx.xxx",
    db: {
        servername: "xx.xx.xx.xx",
        DATABASE: "xx",
        port: "xxxx",
    },
    mail: {
        enable: true,
        host: "smtp.qq.com",
        port: xxx,
        from: "xxxxxx",
        auth: {
            user: "xxxxxxx",
            pass: "xxxxxx",
        },
    },
}; */

exports.initDbAndCommon = async function () {
    require('../yapi.js');
    require('../utils/commons').setYapiCommons();
    await require('../utils/db.js').setYapiMongooseAsync();
    return global.yapi;
};
