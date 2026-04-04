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

		if (xspace_configs.db.user) {
			options.user = xspace_configs.db.user;
			options.pass = xspace_configs.db.pass;
		}

		if (xspace_configs.db.reconnectTries) {
			options.reconnectTries = xspace_configs.db.reconnectTries;
		}

		if (xspace_configs.db.reconnectInterval) {
			options.reconnectInterval = xspace_configs.db.reconnectInterval;
		}

		options = Object.assign({}, options, xspace_configs.db.options);

		var connectString = "";

		if (xspace_configs.db.connectString) {
			connectString = xspace_configs.db.connectString;
		} else {
			connectString = `mongodb://${xspace_configs.db.servername}:${xspace_configs.db.port}/${xspace_configs.db.DATABASE}`;
			if (xspace_configs.db.authSource) {
				connectString = connectString + `?authSource=${xspace_configs.db.authSource}`;
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
