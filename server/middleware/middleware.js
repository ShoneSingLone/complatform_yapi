const { useGzipWhenPrd } = require("./prdGzip");
const { useMockServer } = require("./mockServer");
const { useCORS } = require("./cors");
const { useHistoryMode } = require("./historyMode");
const { useYapiDevHeaderInfo } = require("./yapiDevHeaderInfo");

exports.useGzipWhenPrd = useGzipWhenPrd;
exports.useMockServer = useMockServer;
exports.useCORS = useCORS;
exports.useHistoryMode = useHistoryMode;
exports.useYapiDevHeaderInfo = useYapiDevHeaderInfo;
