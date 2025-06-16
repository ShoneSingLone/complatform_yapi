_.$ajax = (() => {
	let s = e =>
			function (a = {}) {
				let { requestInjector: e, responseInjector: s } = this;
				var r = e => e;
				(e = e || r), (s = s || r);
				let { type: t, url: o, options: n, success: i, error: d } = a;
				(n = n || {}), (d = d || (() => null));
				var r = ["POST", "PUT"].includes(_.toUpper(t))
						? (n.query &&
								(o = _.isString(n.query)
									? o + "?" + n.query
									: _.isPlainObject(n.query)
										? ((r = _.map(
												n.query,
												(e, r) =>
													encodeURIComponent(r) +
													"=" +
													encodeURIComponent(e)
											).join("&")),
											o + "?" + r)
										: o),
							JSON.stringify(n.data || {}))
						: _.isString(n.data)
							? n.data
							: _.isPlainObject(n.data)
								? _.map(
										n.data,
										(e, r) =>
											encodeURIComponent(r) + "=" + encodeURIComponent(e)
									).join("&")
								: void 0,
					u = _.merge({ "X-Language": localStorage["X-Language"] }, n.headers);
				let l = [400, 401, 402, 403, 404, 405, 500, 555];
				return (
					(u = {
						headers: u,
						type: t,
						data: r,
						dataType: "json",
						contentType: "application/json",
						success: function (e, r, t) {
							if (((e = s(e, { API_OPTIONS: a })), _.isPlainObject(e))) {
								var o,
									n = e && (e.errcode || e.code);
								if (n && l.includes(n)) return void d(e.body || e);
								if (e && e.status)
									if (l.includes(e.status))
										return ({ body: n, message: o } = e || {}), void d(n || o);
							}
							return i(e, r, t);
						},
						error: function (e) {
							return (e = s(e, { API_OPTIONS: a })), d(e);
						},
						url: c(o)
					}),
					e(_.merge(u, _.omit(a, ["success", "error", "url"])))
				);
			}.call(r, e),
		c = e =>
			/^htt/.test(e)
				? e
				: _.isFunction(window._AJAX_URL_PREFIX)
					? window._AJAX_URL_PREFIX(e)
					: _.isString(window._AJAX_URL_PREFIX)
						? "" + window._AJAX_URL_PREFIX + e
						: e,
		r = {
			urlWrapper: c,
			upload: ({ method: t, url: o, formData: n, callback: a }) => (
				(t = t || "post"),
				(a = a || (() => null)),
				new Promise((e, r) => {
					e = s({ type: t, options: {}, url: o, success: e, error: r });
					delete e.dateType,
						(e.data = n),
						(e.processData = !1),
						(e.contentType = !1),
						(e.xhr = () => {
							var e = $.ajaxSettings.xhr();
							if (e.upload)
								return (
									e.upload.addEventListener(
										"progress",
										e => {
											a("onprogress", e);
										},
										!1
									),
									e
								);
						}),
						$.ajax(e);
				})
			),
			downloadOctetStream({
				url: e,
				method: t,
				beforeSend: o,
				payload: n,
				resolveResult: d,
				onProgress: a,
				fileType: u = "image/jpeg"
			}) {
				return (
					(n = n || {}),
					(t = t || "get"),
					(o = o || (() => null)),
					new Promise((i, r) => {
						$.ajax(
							s({
								url: e,
								method: t,
								type: t,
								beforeSend: o,
								xhrFields: { responseType: "blob" },
								dataType: "binary",
								data: n,
								options: n,
								error(...e) {
									return r(e);
								},
								async success(r, e, t) {
									try {
										if (_.isFunction(d)) return await d(r, e, t);
										{
											let e = t.getResponseHeader("content-disposition");
											s = (e && e.split(";")) || [];
											var o,
												n = _.reduce(
													s,
													(e, r) => {
														var [r, t] = r.split("=");
														return (e[_.toLower(r)] = t), e;
													},
													{}
												).filename,
												a =
													(t.getResponseHeader("content-type"),
													new Blob([r], { type: u }));
											"download" in document.createElement("a")
												? (((o = document.createElement("a")).download = n),
													(o.target = "_blank"),
													(o.style.display = "none"),
													(o.href = URL.createObjectURL(a)),
													document.body.appendChild(o),
													o.click(),
													URL.revokeObjectURL(o.href),
													document.body.removeChild(o))
												: window.navigator.msSaveOrOpenBlob &&
													window.navigator.msSaveOrOpenBlob(a, n);
										}
									} catch (e) {
										console.error(e);
									} finally {
										i(r);
									}
									var s;
								},
								xhr() {
									var e = new window.XMLHttpRequest();
									return (
										_.isFunction(a) &&
											e.addEventListener("progress", function (e) {
												a(e);
											}),
										e
									);
								}
							})
						);
					})
				);
			},
			post: (t, o = {}) =>
				new Promise((e, r) => {
					$.ajax(s({ type: "POST", options: o, url: t, success: e, error: r }));
				}),
			get: (t, o = {}) =>
				new Promise((e, r) => {
					$.ajax(
						s({ type: "GET", url: t, options: o, timeout: 6e4, success: e, error: r })
					);
				}),
			put: (t, o = {}) =>
				new Promise((e, r) => {
					$.ajax(s({ type: "put", url: t, options: o, success: e, error: r }));
				}),
			delete: (t, o = {}) =>
				new Promise((e, r) => {
					$.ajax(s({ type: "delete", url: t, options: o, success: e, error: r }));
				})
		};
	return r;
})();
