const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { yapi } = global;
function connection(model, schema) {
	if (schema instanceof mongoose.Schema === false) {
		schema = new mongoose.Schema(schema);
	}
	schema.set("autoIndex", false);
	return mongoose.model(model, schema, model);
}

async function setYapiMongooseAsync() {
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

		if (WEBCONFIG.db.user) {
			options.user = WEBCONFIG.db.user;
			options.pass = WEBCONFIG.db.pass;
		}

		if (WEBCONFIG.db.reconnectTries) {
			options.reconnectTries = WEBCONFIG.db.reconnectTries;
		}

		if (WEBCONFIG.db.reconnectInterval) {
			options.reconnectInterval = WEBCONFIG.db.reconnectInterval;
		}

		options = Object.assign({}, options, WEBCONFIG.db.options);

		var connectString = "";

		if (WEBCONFIG.db.connectString) {
			connectString = WEBCONFIG.db.connectString;
		} else {
			connectString = `mongodb://${WEBCONFIG.db.servername}:${WEBCONFIG.db.port}/${WEBCONFIG.db.DATABASE}`;
			if (WEBCONFIG.db.authSource) {
				connectString =
					connectString + `?authSource=${WEBCONFIG.db.authSource}`;
			}
		}

		console.log("🚀:", "connectString", JSON.stringify(connectString, null, 2));
		let db = mongoose.connect(connectString, options, function (err) {
			if (err) {
				xU.log(err + ", mongodb Authentication failed", "error");
				reject(err);
			}
		});
		db.then(
			function (connection) {
				xU.log("mongodb load success...");
				xU.DbConnection = connection;
				autoIncrement.initialize(connection);
				resolve(connection);
			},
			function (err) {
				xU.log(err + "mongodb connect error", "error");
				reject(err);
			}
		);
	});
}

module.exports = {
	model: connection,
	setYapiMongooseAsync
};
