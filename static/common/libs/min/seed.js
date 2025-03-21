(async () => {
	let a = {},
		s = !!localStorage.isDev,
		r = s ? "/common/libs" : "/common/libs/min",
		n = /\/|\.|_|-(\w)/g;
	function l(e) {
		return document.getElementById(e);
	}
	function c(e) {
		return document.getElementsByTagName(e);
	}
	function u(e = "") {
		return (
			(e = String(e).replace(/@/g, "")) &&
			e.replace(n, function (e, n) {
				return n ? n.toUpperCase() : "";
			})
		);
	}
	let o = (() => {
			function i(t) {
				return new Promise((e, n) => {
					(t.oncomplete = t.onsuccess = () => e(t.result)),
						(t.onabort = t.onerror = () => n(t.error));
				});
			}
			let e;
			function r() {
				return (e =
					e ||
					((e, r) => {
						let n = indexedDB.open(e),
							o = ((n.onupgradeneeded = () => n.result.createObjectStore(r)), i(n));
						return (n, t) => o.then(e => t(e.transaction(r, n).objectStore(r)));
					})("keyval-store", "keyval"));
			}
			return {
				get: function (n, e = r()) {
					return e("readonly", e => i(e.get(n)));
				},
				set: function (n, t, e = r()) {
					return e("readwrite", e => (e.put(t, n), i(e.transaction)));
				},
				keys: function (e = r()) {
					return e("readonly", e => {
						if (e.getAllKeys) return i(e.getAllKeys());
						let n = [];
						return (
							(t = e => n.push(e.key)),
							((e = e).openCursor().onsuccess = function () {
								this.result && (t(this.result), this.result.continue());
							}),
							i(e.transaction).then(() => n)
						);
						var t;
					});
				},
				clear: function (e = r()) {
					return e("readwrite", e => (e.clear(), i(e.transaction)));
				},
				del: function (n, e = r()) {
					return e("readwrite", e => (e.delete(n), i(e.transaction)));
				}
			};
		})(),
		i = "x-loading";
	var e, t, d, p, w, g, m;
	function f(r) {
		return new Promise(function (n, t) {
			try {
				var e = new XMLHttpRequest();
				(e.onprogress = function (e) {
					e.lengthComputable && e.total;
				}),
					(e.onload = function (e) {
						e = e.currentTarget || e.target;
						404 === e.status ? t(404) : n(e.responseText);
					}),
					(e.onerror = function (e) {
						console.log("An error occurred while transferring the file.");
					}),
					(e.onabort = function (e) {
						console.log("The transfer has been canceled by the user.");
					}),
					e.open("GET", r + "?_t=" + Date.now()),
					e.send();
			} catch (e) {
				console.error(e), t(e);
			}
		});
	}
	function P(e, n, t, r = {}) {
		let o = (e = e || {}) && e._isVue,
			i = e && e.$set;
		if ("string" != typeof n) throw new Error("prop must be a string");
		let a = n.split("."),
			s = "",
			l = e;
		return (
			void 0 !== t &&
				(() => {
					for (; (s = a.shift()); ) {
						if (0 === a.length)
							return o && i
								? i(l, s, t)
								: (window.Vue && window.Vue.set && window.Vue.set(l, s, t),
									(l[s] = t));
						l[s] || (o && i ? i(l, s, {}) : (l[s] = {})), (l = l[s]);
					}
				})((o, s, a, l)),
			null == t && r && r.delete
				? ((() => {
						for (; (s = a.shift()); ) {
							if (0 === a.length)
								return o
									? i(l, s, t)
									: Array.isArray(l)
										? l.splice(s, 1)
										: delete l[s];
							l[s] || (o ? i(l, s, {}) : (l[s] = {})), (l = l[s]);
						}
					})((o, s, a, l)),
					e)
				: (() => {
						for (; (s = a.shift()); ) {
							var e = l[s];
							if (!e) return l[s];
							if (0 === a.length) return e;
							l = l[s];
						}
						return l;
					})((o, s, a, l))
		);
	}
	function h(e, n) {
		e = P(e, n);
		return "function" == typeof e ? e : () => null;
	}
	function y(e) {
		if (/^http/.test(e)) return e;
		let n = `/common/assets/svg/${e}.svg`;
		return (
			/^_/.test(e) && ((e = String(e).replace(/^_/, "")), (n = `@/assets/svg/${e}.svg`)), n
		);
	}
	function E(e) {
		if (/^http/.test(e)) return e;
		var n,
			t,
			r,
			o = window._;
		let i = a[e];
		if (!i) {
			i = e;
			try {
				o &&
					o.THIS_FILE_URL &&
					((n = !!(r = o.THIS_FILE_URL).length && r[r.length - 1]), (t = a[n])) &&
					((n = t.split("/")),
					/^\.\//.test(e) &&
						((n[n.length - 1] = String(e).replace("./", "")), (e = n.join("/"))),
					/^\.\.\//.test(e)) &&
					((n[n.length - 1] = String(e).replace("./", "")), (e = n.join("/")));
			} catch (e) {
				console.error(e);
			}
			/^@/.test(e) &&
				(i = String(e).replace(/^@/, SRC_ROOT_PATH + "/" + APP_PREFIX + APP_NAME)),
				/^\/common\//.test(e) && (i = "" + SRC_ROOT_PATH + e),
				(a[e] = i);
		}
		return i;
	}
	async function A(i) {
		return (
			(i = E(i)),
			new Promise(async (e, n) => {
				var t = u(i);
				let r = A.pending[t];
				if ("string" == typeof r && !s) return e(r);
				if ((r || (A.pending[t] = r = []), Array.isArray(r) && r.length))
					A.pending[t].push({ resolve: e, reject: n });
				else {
					A.pending[t] = [{ resolve: e, reject: n }];
					try {
						let n = await f(i);
						var o = A.pending[t];
						Array.isArray(o) && o.forEach(({ resolve: e }) => e(n)), (A.pending[t] = n);
					} catch (n) {
						A.pending[t].forEach(({ reject: e }) => e(n));
					}
				}
			})
		);
	}
	async function v(e) {
		var n = u(e);
		let t = await o.get(n);
		return t || ((t = await A(e)), await o.set(n, t)), t;
	}
	async function S(l) {
		return (
			console.time("框架基本依赖"),
			new Promise(async e => {
				var n,
					t,
					r,
					o = await Promise.all(
						l.map(async ([e, , n]) => ({ url: e, innerHtml: await N(e), callback: n }))
					),
					i = c("body")[0];
				for ({ url: n, innerHtml: t, callback: r } of o) {
					var a = u(n),
						s = document.createElement("script");
					(s.id = a),
						(s.innerHTML = t),
						i.appendChild(s),
						"function" == typeof r && (await r());
				}
				console.timeEnd("框架基本依赖"), e();
			})
		);
	}
	(e = l("src-root")),
		(t = e.src.split("/common/libs")[0]),
		(e = e.dataset),
		(d = e.appName),
		(p = e.appEntryName),
		(w = e.appVersion),
		(g = e.loadingImg),
		(m = e.appPrefix || "business_"),
		(e = e.noNProgress),
		d || alert("miss APP_NAME"),
		(window.APP_PREFIX = m),
		(window.SRC_ROOT_PATH = t || ""),
		(window.APP_NAME = d || ""),
		(window.APP_ENTRY_NAME = p || "entry"),
		(window.APP_NO_NPROGRESS = !!e),
		(window.APP_VERSION = w || ""),
		(m = localStorage["X-Language"] || (c("html")[0] && c("html")[0].lang) || "zh-CN"),
		-1 === ["zh-CN", "en-US"].indexOf(m) &&
			(console.error("I18N_LANGUAGE is not valid " + m), (m = "zh-CN")),
		(localStorage["X-Language"] = m),
		(window.I18N_LANGUAGE = m),
		(i = E(y(g || "x-loading"))),
		(A.pending = {});
	let N = !localStorage.isDev && APP_VERSION ? v : A;
	var I = (() => {
		let c = () => null;
		return (I = async (i, a = 0, s = 64) => {
			let l = i.toString();
			return new Promise((n, e) => {
				let t,
					r = 0,
					o = async () => {
						var e = await i();
						c(l, ++r), e ? (clearTimeout(t), n(e)) : (t = setTimeout(o, s));
					};
				a &&
					setTimeout(() => {
						clearTimeout(t), c(l, r), e(new Error("ensure timeout"));
					}, a),
					o();
			});
		});
	})();
	async function R(t, n = "", r = !1) {
		try {
			var o,
				i = u(t);
			if (R.loaded[i]) {
				if (n) return await I(() => window[n]), window[n];
			} else R.loaded[i] = !0;
			let e = l(i);
			if (
				(e ||
					(((e = document.createElement("script")).id = i),
					r
						? await new Promise(n => {
								(e.src = E(t)),
									(e.onload = function (e) {
										console.log("event.currentTarget.id", e.currentTarget.id),
											n(e.currentTarget.id);
									}),
									c("body")[0].appendChild(e);
							})
						: ((o = await N(t)), (e.innerHTML = o), c("body")[0].appendChild(e))),
				n)
			)
				return P(window, n);
		} catch (e) {
			console.error(e);
		}
	}
	function b(e) {
		return (e = (e = e.replace(/\/common\/(assets|libs|ui-element|ui-tiny)/g, e =>
			E(e)
		)).replace(/\/@\//g, E("@/")));
	}
	async function O(n, e = "", t = {}) {
		var { useLink: t = !1 } = t,
			r = u(n);
		if (t)
			try {
				let e = l(r);
				e ||
					(((e = document.createElement("link")).id = r),
					(e.rel = "stylesheet"),
					c("head")[0].appendChild(e)),
					(e.href = E(n));
			} catch (e) {
			} finally {
				return r;
			}
		e = e || b((e = await N(n)));
		t = await (e = window._CURENT_IS_MOBILE
			? e.replace(/([-+]?[0-9]*\.?[0-9]+)px/g, (e, n) => n + "rem")
			: e);
		if (t) {
			let e = l(r);
			e || (((e = document.createElement("style")).id = r), c("body")[0].appendChild(e)),
				(e.innerHTML = t);
		}
		return r;
	}
	(R.loaded = {}),
		(async () => {
			(async () => {
				var e;
				new URLSearchParams(location.search).get("useVconsole") &&
					((e = await R("/common/libs/vconsole.min.js", "VConsole")),
					(window._vConsole = new e()));
			})();
			{
				let n = !APP_VERSION,
					t = APP_VERSION && APP_VERSION !== (await o.get("APP_VERSION"));
				function e() {
					var e = (16 * ($(window).width() / 375)) / 16;
					$("html").css("font-size", e + "px");
				}
				(s || n || t) &&
					(await o.clear(),
					await o.set("APP_VERSION", APP_VERSION),
					(window.APP_VERSION = APP_VERSION)),
					N(`@/i18n/${I18N_LANGUAGE}.js`),
					await S([
						[
							r + "/jquery/jquery-3.7.0.min.js",
							null,
							() => $("body").addClass("x-app-body")
						],
						[
							r + "/lodash.js",
							null,
							() => {
								if (
									((_.$$tags = c),
									(_.$$id = l),
									(_.$val = P),
									(_.$callFn = h),
									(_.$ensure = I),
									(_.$appendScript = R),
									(_.$appendStyle = O),
									(_.$resolveCssAssetsPath = b),
									(_.$idb = o),
									(_.$resolveSvgIcon = y),
									(_.$resolvePath = E),
									(_.$loadText = N),
									(_.$asyncLoadOrderAppendScrips = S),
									(_.$newI18n = async function ({ lang: e }) {
										let n = await _.$loadText(`@/i18n/${e}.js`);
										n = n.replace("window.i18n.options = ", "");
										let r = new Function(`return ${n};`)();
										function t(e, n) {
											64 < e.length &&
												alert(
													`i18n key: 【${e}】 长度超过64，过长，建议重命名`
												),
												(_.templateSettings.interpolate = /{([\s\S]+?)}/g);
											var t = P(r, e);
											return _.isString(t) ? _.template(t)(n) : e;
										}
										return (t.langOptions = r), t;
									}),
									s || n || t)
								)
									try {
										var e =
											!!document.getElementById("preload") &&
											document.getElementById("preload").innerHTML;
										e && new Function(e)().forEach(e => A(e));
									} catch (e) {}
							}
						],
						[r + "/dayjs.js"],
						[
							r + "/vue.js",
							null,
							async () => {
								var e = await _.$newI18n({ lang: I18N_LANGUAGE });
								(window.i18n = e), (Vue.prototype.i18n = e);
							}
						],
						[r + "/common.ts"],
						[r + "/common.$.ajax.ts"]
					]),
					s && window.ONLY_USE_IN_DEV_MODEL && window.ONLY_USE_IN_DEV_MODEL(),
					(Vue.prototype._ = _),
					window._CURENT_IS_MOBILE &&
						($("meta[name='viewport'").attr(
							"content",
							"width=device-width, initial-scale=1.0, user-scalable=no"
						),
						$(window).on("resize", e).on("orientationchange", e),
						e()),
					O(
						"xLoadingStyle",
						`html, body, #app { height: 100%; width: 100%; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.spin {animation: spin 2s linear infinite;}
.x-loading { min-height: 48px; position: relative; // filter: blur(1px); overflow: hidden; pointer-events: none; }
.x-loading::before { animation: spin 2s linear infinite;pointer-events: none; content: " "; display: block; top: 0; bottom: 0; right: 0; left: 0; position: absolute; background: url(${i}) center/32px no-repeat; z-index: 9999999999; }
`
					);
			}
			await 0,
				APP_NO_NPROGRESS ||
					(_.$importVue.Nprogress = await _.$importVue("/common/libs/Nprogress.vue")),
				console.time("APP"),
				console.log("APP start");
			var n = await _.$importVue(
				`${SRC_ROOT_PATH}/${APP_PREFIX}${APP_NAME}/${APP_ENTRY_NAME}.vue`
			);
			console.log("APP end"), console.timeEnd("APP"), s && (window.HMR_APP = n);
		})();
})();
