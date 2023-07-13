type t_WEBCONFIG = {
	port: string;
	adminAccount: string;
	db: {
		connectString?: string;
		reconnectTries?: string;
		reconnectInterval?: string;
		servername?: string;
		DATABASE?: string;
		port?: string;
		user?: string;
		pass?: string;
	};
	mail: {
		enable: boolean;
		host: string;
		port: number;
		from: string;
		auth: {
			user: string;
			pass: string;
		};
	};
};

declare global {
	var WEBCONFIG: t_WEBCONFIG;
}

export {};
