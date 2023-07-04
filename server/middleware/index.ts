const { useGzipWhenPrd } = require("./prdGzip");
const { useMockServer } = require("./mockServer");
const { useCORS } = require("./cors");
const { useHistoryMode } = require("./historyMode");
const { useYapiDevHeaderInfo } = require("./yapiDevHeaderInfo");

module.exports = {
	useGzipWhenPrd,
	useMockServer,
	useCORS,
	useHistoryMode,
	useYapiDevHeaderInfo
};
