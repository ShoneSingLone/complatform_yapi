const HttpsProxyAgent = require("https-proxy-agent"),
    axios = require("axios");

const httpsAgent = new HttpsProxyAgent({ host: "proxyhost", port: "proxyport", auth: "username:password" });

//use axios as you normally would, but specify httpsAgent in the config
axios = axios.create({ httpsAgent });