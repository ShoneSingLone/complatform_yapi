(async () => {
	let i = {},
		s = !!localStorage.isDev,
		o = s ? "/common/libs" : "/common/libs/min",
		n = /\/|\.|_|-(\w)/g,
		{
			srcRoot: e,
			appName: t,
			appEntryName: r,
			appVersion: a,
			loadingImg: l,
			appPrefix: c,
			noNprogress: u,
			appUseBabel: d
		} = (() => {
			var { src: e, dataset: n } = p("src-root");
			return {
				srcRoot: e.split("/common/libs")[0],
				appName: n.appName,
				appEntryName: n.appEntryName,
				appVersion: n.appVersion,
				loadingImg: n.loadingImg,
				appPrefix: n.appPrefix || "business_",
				noNprogress: n.noNProgress,
				appUseBabel: "true" === n.appUseBabel
			};
		})();
	function p(e) {
		return document.getElementById(e);
	}
	function w(e) {
		return document.getElementsByTagName(e);
	}
	function g(e = "") {
		return (
			(e = String(e).replace(/@/g, "")) &&
			e.replace(n, function (e, n) {
				return n ? n.toUpperCase() : "";
			})
		);
	}
	let m = (() => {
			function a(t) {
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
							o = ((n.onupgradeneeded = () => n.result.createObjectStore(r)), a(n));
						return (n, t) => o.then(e => t(e.transaction(r, n).objectStore(r)));
					})("keyval-store", "keyval"));
			}
			return {
				get: function (n, e = r()) {
					return e("readonly", e => a(e.get(n)));
				},
				set: function (n, t, e = r()) {
					return e("readwrite", e => (e.put(t, n), a(e.transaction)));
				},
				keys: function (e = r()) {
					return e("readonly", e => {
						if (e.getAllKeys) return a(e.getAllKeys());
						let n = [];
						return (
							(t = e => n.push(e.key)),
							((e = e).openCursor().onsuccess = function () {
								this.result && (t(this.result), this.result.continue());
							}),
							a(e.transaction).then(() => n)
						);
						var t;
					});
				},
				clear: function (e = r()) {
					return e("readwrite", e => (e.clear(), a(e.transaction)));
				},
				del: function (n, e = r()) {
					return e("readwrite", e => (e.delete(n), a(e.transaction)));
				}
			};
		})(),
		f = "x-loading";
	var P;
	function y(r) {
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
	function h(e, n) {
		e = E(e, n);
		return "function" == typeof e ? e : () => null;
	}
	function E(e, n, t, r = {}) {
		let o = (e = e || {}) && e._isVue,
			a = e && e.$set;
		if ("string" != typeof n) throw new Error("prop must be a string");
		let i = n.split("."),
			s = "",
			l = e;
		if (
			(void 0 !== t &&
				(() => {
					for (; (s = i.shift()); ) {
						if (0 === i.length)
							return o && a
								? a(l, s, t)
								: (window.Vue && window.Vue.set && window.Vue.set(l, s, t),
									(l[s] = t));
						l[s] || (o && a ? a(l, s, {}) : (l[s] = {})), (l = l[s]);
					}
				})((o, s, i, l)),
			null == t && r && r.delete)
		)
			return (
				(() => {
					for (; (s = i.shift()); ) {
						if (0 === i.length)
							return o ? a(l, s, t) : Array.isArray(l) ? l.splice(s, 1) : delete l[s];
						l[s] || (o ? a(l, s, {}) : (l[s] = {})), (l = l[s]);
					}
				})((o, s, i, l)),
				e
			);
		for (o, s, i, l; (s = i.shift()); ) {
			var c = l[s];
			if (!c) return l[s];
			if (0 === i.length) return c;
			l = l[s];
		}
		return l;
	}
	function A(e) {
		if (/^http/.test(e)) return e;
		let n = `/common/assets/svg/${e}.svg`;
		return (
			/^_/.test(e) && ((e = String(e).replace(/^_/, "")), (n = `@/assets/svg/${e}.svg`)), n
		);
	}
	function v(e) {
		if (/^http/.test(e)) return e;
		var n,
			t,
			r,
			o = window._;
		let a = i[e];
		if (!a) {
			a = e;
			try {
				o &&
					o.THIS_FILE_URL &&
					((n = !!(r = o.THIS_FILE_URL).length && r[r.length - 1]), (t = i[n])) &&
					((n = t.split("/")),
					/^\.\//.test(e) &&
						((n[n.length - 1] = String(e).replace("./", "")), (e = n.join("/"))),
					/^\.\.\//.test(e)) &&
					((n[n.length - 1] = String(e).replace("./", "")), (e = n.join("/")));
			} catch (e) {
				console.error(e);
			}
			/^@/.test(e) &&
				(a = String(e).replace(/^@/, SRC_ROOT_PATH + "/" + APP_PREFIX + APP_NAME)),
				/^\/common\//.test(e) && (a = "" + SRC_ROOT_PATH + e),
				(i[e] = a);
		}
		return a;
	}
	async function N(a) {
		return (
			(a = v(a)),
			new Promise(async (e, n) => {
				var t = g(a);
				let r = N.pending[t];
				if ("string" == typeof r && !s) return e(r);
				if ((r || (N.pending[t] = r = []), Array.isArray(r) && r.length))
					N.pending[t].push({ resolve: e, reject: n });
				else {
					N.pending[t] = [{ resolve: e, reject: n }];
					try {
						let n = await y(a);
						var o = N.pending[t];
						Array.isArray(o) && o.forEach(({ resolve: e }) => e(n)), (N.pending[t] = n);
					} catch (n) {
						N.pending[t].forEach(({ reject: e }) => e(n));
					}
				}
			})
		);
	}
	async function b(e) {
		var n = g(e);
		let t = await m.get(n);
		return t || ((t = await N(e)), await m.set(n, t)), t;
	}
	async function S(l) {
		return (
			console.time("框架基本依赖"),
			new Promise(async e => {
				var n,
					t,
					r,
					o = await Promise.all(
						l.map(async ([e, , n]) => ({ url: e, innerHtml: await I(e), callback: n }))
					),
					a = w("body")[0];
				for ({ url: n, innerHtml: t, callback: r } of o) {
					var i = g(n),
						s = document.createElement("script");
					(s.id = i),
						(s.innerHTML = t),
						a.appendChild(s),
						"function" == typeof r && (await r());
				}
				console.timeEnd("框架基本依赖"), e();
			})
		);
	}
	t || alert("miss APP_NAME"),
		(window.APP_PREFIX = c),
		(window.SRC_ROOT_PATH = e || ""),
		(window.APP_NAME = t || ""),
		(window.APP_ENTRY_NAME = r || "entry"),
		(window.APP_NO_NPROGRESS = !!u),
		(window.APP_VERSION = a || ""),
		(P = localStorage["X-Language"] || (w("html")[0] && w("html")[0].lang) || "zh-CN"),
		-1 === ["zh-CN", "en-US"].indexOf(P) &&
			(console.error("I18N_LANGUAGE is not valid " + P), (P = "zh-CN")),
		(localStorage["X-Language"] = P),
		(window.I18N_LANGUAGE = P),
		(f = v(A(l || "x-loading"))),
		(N.pending = {});
	let I = !localStorage.isDev && APP_VERSION ? b : N;
	var R = (() => {
		let c = () => null;
		return (R = async (a, i = 0, s = 64) => {
			let l = a.toString();
			return new Promise((n, e) => {
				let t,
					r = 0,
					o = async () => {
						var e = await a();
						c(l, ++r), e ? (clearTimeout(t), n(e)) : (t = setTimeout(o, s));
					};
				i &&
					setTimeout(() => {
						clearTimeout(t), c(l, r), e(new Error("ensure timeout"));
					}, i),
					o();
			});
		});
	})();
	async function O(t, n = "", r = !1) {
		try {
			var o,
				a = g(t);
			if (O.loaded[a]) {
				if (n) return await R(() => window[n]), window[n];
			} else O.loaded[a] = !0;
			let e = p(a);
			if (
				(e ||
					(((e = document.createElement("script")).id = a),
					r
						? await new Promise(n => {
								(e.src = v(t)),
									(e.onload = function (e) {
										console.log("event.currentTarget.id", e.currentTarget.id),
											n(e.currentTarget.id);
									}),
									w("body")[0].appendChild(e);
							})
						: ((o = await I(t)), (e.innerHTML = o), w("body")[0].appendChild(e))),
				n)
			)
				return E(window, n);
		} catch (e) {
			console.error(e);
		}
	}
	function T(e) {
		return (e = (e = e.replace(/\/common\/(assets|libs|ui-element|ui-tiny)/g, e =>
			v(e)
		)).replace(/\/@\//g, v("@/")));
	}
	async function V(n, e = "", t = {}) {
		var { useLink: t = !1 } = t,
			r = g(n);
		if (t)
			try {
				let e = p(r);
				e ||
					(((e = document.createElement("link")).id = r),
					(e.rel = "stylesheet"),
					w("head")[0].appendChild(e)),
					(e.href = v(n));
			} catch (e) {
			} finally {
				return r;
			}
		e = e || T((e = await I(n)));
		t = await (e = window._CURENT_IS_MOBILE
			? e.replace(/([-+]?[0-9]*\.?[0-9]+)px/g, (e, n) => n + "rem")
			: e);
		if (t) {
			let e = p(r);
			e || (((e = document.createElement("style")).id = r), w("body")[0].appendChild(e)),
				(e.innerHTML = t);
		}
		return r;
	}
	(O.loaded = {}),
		(async () => {
			(async () => {
				var e;
				new URLSearchParams(location.search).get("useVconsole") &&
					((e = await O("/common/libs/vconsole.min.js", "VConsole")),
					(window._vConsole = new e()));
			})();
			{
				let n = !APP_VERSION,
					t = APP_VERSION && APP_VERSION !== (await m.get("APP_VERSION"));
				(s || n || t) &&
					(await m.clear(),
					await m.set("APP_VERSION", APP_VERSION),
					(window.APP_VERSION = APP_VERSION)),
					I(`@/i18n/${I18N_LANGUAGE}.js`);
				var e = [
					[
						o + "/jquery/jquery-3.7.0.min.js",
						null,
						() => $("body").addClass("x-app-body")
					],
					[
						o + "/lodash.js",
						null,
						() => {
							if (
								((_.$$tags = w),
								(_.$$id = p),
								(_.$val = E),
								(_.$callFn = h),
								(_.$ensure = R),
								(_.$appendScript = O),
								(_.$appendStyle = V),
								(_.$resolveCssAssetsPath = T),
								(_.$idb = m),
								(_.$resolveSvgIcon = A),
								(_.$resolvePath = v),
								(_.$loadText = I),
								(_.$asyncLoadOrderAppendScrips = S),
								(_.$newI18n = async function ({ lang: e }) {
									let n = await _.$loadText(`@/i18n/${e}.js`);
									n = n.replace("window.i18n.options = ", "");
									let o = new Function(`return ${n};`)();
									return function (e, t) {
										64 < e.length && console.warn("[i18n:key too lang] " + e);
										let r = E(o, e);
										return void 0 === r
											? (console.warn("[i18n:unset] " + e), e)
											: ("object" == typeof t &&
													Object.keys(t).forEach(e => {
														var n = E(t, e);
														void 0 !== n &&
															(r = String(r).replace(`{${e}}`, n));
													}),
												r);
									};
								}),
								s || n || t)
							)
								try {
									var e =
										!!document.getElementById("preload") &&
										document.getElementById("preload").innerHTML;
									e && new Function(e)().forEach(e => N(e));
								} catch (e) {}
						}
					],
					[o + "/dayjs.js"],
					[
						o + "/vue.js",
						null,
						async () => {
							var e = await _.$newI18n({ lang: I18N_LANGUAGE });
							(window.i18n = e), (Vue.prototype.i18n = e);
						}
					],
					[o + "/common.ts"],
					[o + "/common.$.ajax.ts"]
				];
				function r() {
					var e = (16 * ($(window).width() / 375)) / 16;
					$("html").css("font-size", e + "px");
				}
				d &&
					(e.push([o + "/babel/babel.standalone.7.27.0.js"]),
					e.push([o + "/babel/babel.custom.js"])),
					await S(e),
					s && window.ONLY_USE_IN_DEV_MODEL && window.ONLY_USE_IN_DEV_MODEL(),
					(Vue.prototype._ = _),
					window._CURENT_IS_MOBILE &&
						($("meta[name='viewport'").attr(
							"content",
							"width=device-width, initial-scale=1.0, user-scalable=no"
						),
						$(window).on("resize", r).on("orientationchange", r),
						r()),
					V(
						"xLoadingStyle",
						`html, body, #app { height: 100%; width: 100%; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.spin {animation: spin 2s linear infinite;}
.x-loading { min-height: 48px; position: relative; // filter: blur(1px); overflow: hidden; pointer-events: none; }
.x-loading::before { animation: spin 2s linear infinite;pointer-events: none; content: " "; display: block; top: 0; bottom: 0; right: 0; left: 0; position: absolute; background: url(${f}) center/32px no-repeat; z-index: 9999999999; }
`
					);
			}
			await 0,
				APP_NO_NPROGRESS ||
					(_.$importVue.Nprogress = await _.$importVue("/common/libs/Nprogress.vue")),
				console.time("APP"),
				console.log("APP start"),
				(e = await _.$importVue(
					`${SRC_ROOT_PATH}/${APP_PREFIX}${APP_NAME}/${APP_ENTRY_NAME}.vue`
				)),
				console.log("APP end"),
				console.timeEnd("APP"),
				s && (window.HMR_APP = e);
		})();
})();
