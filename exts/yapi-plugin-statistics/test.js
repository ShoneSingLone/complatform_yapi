const fs = require("fs-extra");
const dbModule = require("../../server/utils/db");
const { ModelUser } = require("../../server/models/user");
const mongoose = require("mongoose");

xU.mongoose = dbModule.connect();

const convert2Decimal = num => (num > 9 ? num : `0${num}`);
const formatYMD = (val, joinStr = "-") => {
	let date = val;
	if (typeof val !== "object") {
		val = val * 1000;
		date = new Date(val);
	}
	return `${[
		date.getFullYear(),
		convert2Decimal(date.getMonth() + 1),
		convert2Decimal(date.getDate())
	].join(joinStr)}`;
};

function run() {
	let time = xU.time() - 10000000;
	let data = i => {
		time = time - xU.rand(10000, 1000000);
		return {
			interface_id: 94,
			project_id: 25,
			group_id: 19,
			time: time,
			ip: "1.1.1.1",
			date: formatYMD(time)
		};
	};

	xU.mongoose
		.then(function () {
			let logCol = mongoose.connection.db.collection("statis_mock");
			let arr = [];
			for (let i = 0; i < 11; i++) {
				if (arr.length >= 5) {
					logCol.insert(arr);
					arr = [];
				}
				arr.push(data(i));
			}
		})
		.catch(function (err) {
			throw new Error(err.message);
		});
}

run();
