(function () {
	/**
	 * ajax请求
	 * @param {Object} API_OPTIONS
	 * @param {String} API_OPTIONS.type 请求类型
	 * @param {String} API_OPTIONS.url 请求地址
	 * @param {Object} API_OPTIONS.options 请求参数
	 * @param {Function} API_OPTIONS.success 请求成功回调
	 * @param {Function} API_OPTIONS.error 请求失败回调
	 */
	_.$ajax = (function () {
		function configs(API_OPTIONS) {
			let { requestInjector, responseInjector } = this;

			const normal = options => options;

			requestInjector = requestInjector || normal;
			responseInjector = responseInjector || normal;

			let { type, url, options, success: resolve, error: reject } = API_OPTIONS;

			const data = (isUseBodyParams => {
				if (isUseBodyParams) {
					if (options.query) {
						url = (() => {
							if (options.query) {
								if (_.isString(options.query)) {
									return url + "?" + options.query;
								}
								if (_.isPlainObject(options.query)) {
									return url + "?" + _.map(options.query, (value, key) => `${key}=${encodeURIComponent(value)}`).join("&");
								}
							}
						})();
					}
					return JSON.stringify(options.data || {});
				} else {
					if (_.isString(options.data)) {
						return options.data;
					}
					if (_.isPlainObject(options.data)) {
						return _.map(options.data, (value, key) => `${key}=${encodeURIComponent(value)}`).join("&");
					}
				}
			})(["POST", "PUT"].includes(_.toUpper(type)));

			const headers = _.merge({ "X-Language": localStorage["X-Language"] }, options.headers);
			const errorCodeArray = [400, 401, 402, 403, 404, 405, 500, 555];
			return requestInjector({
				headers,
				dataType: "json",
				url,
				type,
				data,
				contentType: "application/json",
				dataType: "JSON",
				success(response) {
					response = responseInjector(response);
					if (_.isPlainObject(response)) {
						/* 兼容 */
						const errcode = response?.errcode || response?.code;

						if (errcode) {
							if (errorCodeArray.includes(errcode)) {
								reject(response.body || response);
								return;
							}
						}
						if (response?.status) {
							if (errorCodeArray.includes(response.status)) {
								const { body, message } = response || {};
								reject(body || message);
								return;
							}
						}
					}
					return resolve(response);
				},
				error(response) {
					response = responseInjector(response);
					return reject(response);
				}
			});
		}

		const urlWrapper = url => {
			return `${window._URL_PREFIX_4_DEV || ""}${url}`;
		};
		const $ajax = {
			urlWrapper,
			upload: ({ method, url, formData, callback }) => {
				method = method || "post";
				callback = callback || (() => null);
				return new Promise((resolve, reject) => {
					const options = configs.call($ajax, {
						type: method,
						options: {},
						url: urlWrapper(url),
						success: resolve,
						error: reject
					});

					delete options.dateType;
					options.data = formData;
					options.processData = false;
					options.contentType = false;
					options.xhr = () => {
						// 监听 xhr
						const xhr = $.ajaxSettings.xhr();
						if (xhr.upload) {
							xhr.upload.addEventListener(
								"progress",
								event => {
									console.log("🚀 ~ xhr ~ event:", event);
									callback("onprogress", event);
								},
								false
							);
							return xhr;
						}
					};
					$.ajax(options);
				});

				// return new Promise((resolve, reject) => {
				// 	let xhr = new XMLHttpRequest();
				// 	xhr.onprogress = event => {
				// 		callback("onprogress", event);
				// 	};
				// 	// 当上传完成时调用
				// 	xhr.onload = function () {
				// 		if (xhr.status === 200) {
				// 			return resolve(file);
				// 		}
				// 	};
				// 	xhr.onerror = () => reject(file);
				// 	xhr.open(method, urlWrapper(url), true);
				// 	xhr.send(file);
				// });
			},
			post: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "POST",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			},
			get: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "GET",
							url: urlWrapper(url),
							options,
							timeout: 1000 * 60,
							success: resolve,
							error: reject
						})
					);
				});
			},
			put: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "put",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			},
			delete: (url, options = {}) => {
				return new Promise((resolve, reject) => {
					$.ajax(
						configs.call($ajax, {
							type: "delete",
							url: urlWrapper(url),
							options,
							success: resolve,
							error: reject
						})
					);
				});
			}
		};
		return $ajax;
	})();
})();
