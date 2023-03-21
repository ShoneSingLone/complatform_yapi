const { useGzipWhenPrd } = require('./prdGzip.js');
const { useMockServer } = require('./mockServer.js');
const { useCORS } = require('./cors');
const { useHistoryMode } = require('./historyMode');
const { useYapiDevHeaderInfo } = require('./yapiDevHeaderInfo');

module.exports = {
    useGzipWhenPrd,
    useMockServer,
    useCORS,
    useHistoryMode,
    useYapiDevHeaderInfo
};
