const SSE_TYPE = {
	CHAT_ONE: "chat_one",
	CHAT_ALL: "chat_all",
	CHAT_GROUP: "chat_group",
	CHAT_PROJECT: "chat_project"
};
const SOCKET_CONNECTIONS = new Map();

const SOCKET_TYPE_HANDLERS = {
	[SSE_TYPE.CHAT_ONE](id, { payload }) {
		const socket = SOCKET_CONNECTIONS.get(id);
		if (socket) {
			/* 只给对应ID发送 */
			socket.emit("message", xU.socketMsg(SSE_TYPE.CHAT_ONE, payload));
		}
	}
};
exports.SSE_TYPE = SSE_TYPE;
exports.SOCKET_TYPE_HANDLERS = SOCKET_TYPE_HANDLERS;
exports.SOCKET_CONNECTIONS = SOCKET_CONNECTIONS;
