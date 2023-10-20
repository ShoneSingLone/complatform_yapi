const URL = require("url");
const net = require("net");
const path = require("path");
const fs = require("fs");
const Buffer = require("buffer").Buffer;
const { ARGV_RECORD } = require("./common");

function decodeBuffer(buf) {
	var returnString = "";
	for (var i = 0; i < buf.length; i++) {
		if (buf[i] >= 48 && buf[i] <= 90) {
			returnString += String.fromCharCode(buf[i]);
		} else if (buf[i] === 95) {
			returnString += String.fromCharCode(buf[i]);
		} else if (buf[i] >= 97 && buf[i] <= 122) {
			returnString += String.fromCharCode(buf[i]);
		} else {
			var charToConvert = buf[i].toString(16);
			if (charToConvert.length === 0) {
				returnString += "\\x00";
			} else if (charToConvert.length === 1) {
				returnString += "\\x0" + charToConvert;
			} else {
				returnString += "\\x" + charToConvert;
			}
		}
	}
	return returnString;
}

exports.handleSocket = function handleSocket(client, request) {
	try {
		const currentURL = URL.parse(request.url);
		const searchParams = new URLSearchParams(currentURL.search);
		const token = searchParams.get("token");

		if (!token) {
			throw "illegal port";
		}

		const { vnc_ip: TARGET_HOST, vnc_por: TARGET_PORT } = require(path.resolve(
			__dirname,
			"authInfo",
			token
		));

		console.log("WebSocket settings: ");
		console.log("proxying to " + TARGET_HOST + ":" + TARGET_PORT);

		var remoteAddress = client._socket.remoteAddress;
		var start_time = new Date().getTime();
		console.log(request ? request.url : client.upgradeReq.url);

		function log(msg) {
			console.log(" " + remoteAddress + ": " + msg);
		}

		log("WebSocket connection");
		log(
			"Version " + client.protocolVersion + ", subprotocol: " + client.protocol
		);

		if (ARGV_RECORD) {
			var rs = fs.createWriteStream(
				ARGV_RECORD + "/" + new Date().toISOString().replace(/:/g, "_")
			);
			rs.write("var VNC_frame_data = [\n");
		} else {
			var rs = null;
		}

		var target = net.createConnection(TARGET_PORT, TARGET_HOST, function () {
			log("connected to target");
		});
		target.on("data", function (data) {
			log("sending message:");
			if (rs) {
				var tdelta = Math.floor(new Date().getTime()) - start_time;
				// var rsdata = `'{${tdelta}{${decodeBuffer(data)}',\n`;
				var rsdata = "'{" + tdelta + "{" + decodeBuffer(data) + "',\n";
				rs.write(rsdata);
			}
			try {
				client.send(data);
			} catch (e) {
				log("Client closed, cleaning up target");
				target.end();
			}
		});
		target.on("end", function () {
			log("target disconnected");
			client.close();
			if (rs) {
				rs.end("'EOF'];\n");
			}
		});
		target.on("error", function () {
			log("target connection error");
			target.end();
			client.close();
			if (rs) {
				rs.end("'EOF'];\n");
			}
		});

		client.on("message", function (msg) {
			//log('got message: ' + msg);
			if (rs) {
				var rdelta = Math.floor(new Date().getTime()) - start_time;
				var rsdata = "'}" + rdelta + "}" + decodeBuffer(msg) + "',\n";
				rs.write(rsdata);
			}

			target.write(msg);
		});
		client.on("close", function (code, reason) {
			log("WebSocket client disconnected: " + code + " [" + reason + "]");
			target.end();
		});
		client.on("error", function (a) {
			log("WebSocket client error: " + a);
			target.end();
		});
	} catch (error) {
		console.error(error);
		client.send(error.code);
		client.close();
	}
};
