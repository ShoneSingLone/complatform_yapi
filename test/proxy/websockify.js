#!/usr/bin/env node

// A WebSocket to TCP socket proxy
// Copyright 2012 Joel Martin
// Licensed under LGPL version 3 (see docs/LICENSE.LGPL-3)

// Known to work with node 0.8.9
const http = require("http");
const https = require("https");
const fs = require("fs");
const { handleSocket } = require("./handleSocket");
const { handleHttp } = require("./handleHttp");
const SocketServer = require("ws").Server;
const { SOURCE_PORT, ARGV_CERT, ARGV_KEY } = require("./common");

let webServer;
/* https */
if (ARGV_CERT && ARGV_KEY) {
	var cert = fs.readFileSync(ARGV_CERT);
	var key = fs.readFileSync(ARGV_KEY);
	webServer = https.createServer({ cert: cert, key: key }, handleHttp);
	console.log(
		"Running in encrypted HTTPS (wss://) mode using: " +
			ARGV_CERT +
			", " +
			ARGV_KEY
	);
} else {
	/* http */
	webServer = http.createServer(handleHttp);
	console.log("Running in unencrypted HTTP (ws://) mode");
}
try {
	webServer.listen(SOURCE_PORT, () => {
		const wsServer = new SocketServer({ server: webServer });
		wsServer.on("connection", handleSocket);
	});
} catch (error) {
	console.error(error);
}
