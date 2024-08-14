const mongoose = require("mongoose");
const autoIncrement = require("../plugins/pluginMongooseAutoIncrement/MongooseAutoIncrement");

async function setMongooseAsync() {
	return new Promise((resolve, reject) => {
		mongoose.Promise = global.Promise;
		mongoose.set("useNewUrlParser", true);
		mongoose.set("useFindAndModify", false);
		mongoose.set("useCreateIndex", true);

		let options = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true
		};

		if (yapi_configs.db.user) {
			options.user = yapi_configs.db.user;
			options.pass = yapi_configs.db.pass;
		}

		if (yapi_configs.db.reconnectTries) {
			options.reconnectTries = yapi_configs.db.reconnectTries;
		}

		if (yapi_configs.db.reconnectInterval) {
			options.reconnectInterval = yapi_configs.db.reconnectInterval;
		}

		options = Object.assign({}, options, yapi_configs.db.options);

		var connectString = "";

		if (yapi_configs.db.connectString) {
			connectString = yapi_configs.db.connectString;
		} else {
			connectString = `mongodb://${yapi_configs.db.servername}:${yapi_configs.db.port}/${yapi_configs.db.DATABASE}`;
			if (yapi_configs.db.authSource) {
				connectString =
					connectString + `?authSource=${yapi_configs.db.authSource}`;
			}
		}

		console.log("🚀:", "connectString", JSON.stringify(connectString, null, 2));
		let db = mongoose.connect(connectString, options, function (err) {
			if (err) {
				xU.applog.error(err + ", mongodb Authentication failed");
				reject(err);
			}
		});
		db.then(
			function (connection) {
				console.log("mongodb load success...");
				xU.DbConnection = connection;
				autoIncrement.initialize(connection);
				resolve(connection);
			},
			function (err) {
				xU.applog.error(err + "mongodb connect error");
				reject(err);
			}
		);
	});
}

module.exports = setMongooseAsync;
