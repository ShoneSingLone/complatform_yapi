const SSE_TYPE = {
	CHAT_ONE: "chat_one",
	CHAT_ALL: "chat_all",
	CHAT_GROUP: "chat_group",
	CHAT_PROJECT: "chat_project",
	CHAT_NEW_APPLY: "CHAT_NEW_APPLY",
	/* USER_LOGOUT */
	USER_LOGOUT: "USER_LOGOUT"
};

const SOCKET_TYPE_HANDLERS = {
	[SSE_TYPE.CHAT_ONE](id, { payload }) {
		const socket = global._app_socket_yapi_connections.get(id);
		if (Array.isArray(socket) && socket.length > 0) {
			/* 只给对应ID发送 */
			socket.forEach(s => {
				s.emit("message", xU.socketMsg(SSE_TYPE.CHAT_ONE, payload));
			});
		}
	},
	[SSE_TYPE.CHAT_NEW_APPLY](id, { payload }) {
		const socket = global._app_socket_yapi_connections.get(id);
		if (socket) {
			/* 只给对应ID发送 */
			if (Array.isArray(socket) && socket.length > 0) {
				/* 只给对应ID发送 */
				socket.forEach(s => {
					s.emit("message", xU.socketMsg(SSE_TYPE.CHAT_ONE, payload));
				});
			}
		}
	}
};
exports.SSE_TYPE = SSE_TYPE;
exports.SOCKET_TYPE_HANDLERS = SOCKET_TYPE_HANDLERS;
