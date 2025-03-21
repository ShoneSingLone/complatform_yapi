var VueRouter = ((e, N) => {
	let M = "undefined" != typeof window;
	function u(e) {
		return e.__esModule || "Module" === e[Symbol.toStringTag];
	}
	let U = Object.assign;
	function D(e, t) {
		var r,
			n = {};
		for (r in t) {
			var a = t[r];
			n[r] = B(a) ? a.map(e) : e(a);
		}
		return n;
	}
	let V = () => {},
		B = Array.isArray;
	function W(e) {
		var t = Array.from(arguments).slice(1);
		console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
	}
	let i = /\/$/,
		l = e => e.replace(i, "");
	function q(e, t, r = "/") {
		let n,
			a = {},
			o = "",
			i = "";
		var l = t.indexOf("#");
		let s = t.indexOf("?");
		return (
			-1 < (s = l < s && 0 <= l ? -1 : s) &&
				((n = t.slice(0, s)), (o = t.slice(s + 1, -1 < l ? l : t.length)), (a = e(o))),
			-1 < l && ((n = n || t.slice(0, l)), (i = t.slice(l, t.length))),
			{
				fullPath:
					(n = ((e, t) => {
						if (e.startsWith("/")) return e;
						if (!t.startsWith("/"))
							return (
								W(
									`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`
								),
								e
							);
						if (!e) return t;
						var t = t.split("/"),
							r = e.split("/");
						(".." !== (e = r[r.length - 1]) && "." !== e) || r.push("");
						let n = t.length - 1,
							a,
							o;
						for (a = 0; a < r.length; a++)
							if ("." !== (o = r[a])) {
								if (".." !== o) break;
								1 < n && n--;
							}
						return (
							t.slice(0, n).join("/") +
							"/" +
							r.slice(a - (a === r.length ? 1 : 0)).join("/")
						);
					})(null != n ? n : t, r)) +
					(o && "?") +
					o +
					i,
				path: n,
				query: a,
				hash: i
			}
		);
	}
	function s(e, t) {
		return t && e.toLowerCase().startsWith(t.toLowerCase()) ? e.slice(t.length) || "/" : e;
	}
	function ie(e, t, r) {
		var n = t.matched.length - 1,
			a = r.matched.length - 1;
		return (
			-1 < n &&
			n == a &&
			G(t.matched[n], r.matched[a]) &&
			v(t.params, r.params) &&
			e(t.query) === e(r.query) &&
			t.hash === r.hash
		);
	}
	function G(e, t) {
		return (e.aliasOf || e) === (t.aliasOf || t);
	}
	function v(e, t) {
		if (Object.keys(e).length !== Object.keys(t).length) return !1;
		for (var r in e)
			if (((n = e[r]), (r = t[r]), !(B(n) ? m(n, r) : B(r) ? m(r, n) : n === r))) return !1;
		var n;
		return !0;
	}
	function m(e, r) {
		return B(r)
			? e.length === r.length && e.every((e, t) => e === r[t])
			: 1 === e.length && e[0] === r;
	}
	var F, d, t;
	function g(e) {
		var t;
		return (
			"/" !==
				(e =
					e ||
					(M
						? (e =
								((t = document.querySelector("base")) && t.getAttribute("href")) ||
								"/").replace(/^\w+:\/\/[^\/]+/, "")
						: "/"))[0] &&
				"#" !== e[0] &&
				(e = "/" + e),
			l(e)
		);
	}
	((t = F = F || {}).pop = "pop"),
		(t.push = "push"),
		((t = d = d || {}).back = "back"),
		(t.forward = "forward"),
		(t.unknown = "");
	let y = /^[^#]+#/;
	function b(e, t) {
		return e.replace(y, "#") + t;
	}
	let K = () => ({ left: window.pageXOffset, top: window.pageYOffset });
	function le(t) {
		let e;
		if ("el" in t) {
			var r = t.el,
				n = "string" == typeof r && r.startsWith("#");
			if (!("string" != typeof t.el || (n && document.getElementById(t.el.slice(1)))))
				try {
					var a = document.querySelector(t.el);
					if (n && a)
						return void W(
							`The selector "${t.el}" should be passed as "el: document.querySelector('${t.el}')" because it starts with "#".`
						);
				} catch (e) {
					return void W(
						`The selector "${t.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`
					);
				}
			a =
				"string" == typeof r
					? n
						? document.getElementById(r.slice(1))
						: document.querySelector(r)
					: r;
			if (!a)
				return void W(
					`Couldn't find element using selector "${t.el}" returned by scrollBehavior.`
				);
			e =
				((n = a),
				(r = t),
				(a = document.documentElement.getBoundingClientRect()),
				(n = n.getBoundingClientRect()),
				{
					behavior: r.behavior,
					left: n.left - a.left - (r.left || 0),
					top: n.top - a.top - (r.top || 0)
				});
		} else e = t;
		"scrollBehavior" in document.documentElement.style
			? window.scrollTo(e)
			: window.scrollTo(
					null != e.left ? e.left : window.pageXOffset,
					null != e.top ? e.top : window.pageYOffset
				);
	}
	function se(e, t) {
		return (history.state ? history.state.position - t : -1) + e;
	}
	let Q = new Map(),
		w = () => location.protocol + "//" + location.host;
	function _(t, e) {
		var { pathname: e, search: r, hash: n } = e,
			a = t.indexOf("#");
		if (-1 < a) {
			a = n.includes(t.slice(a)) ? t.slice(a).length : 1;
			let e = n.slice(a);
			return s((e = "/" !== e[0] ? "/" + e : e), "");
		}
		return s(e, t) + r + n;
	}
	function E(o, i, l, s) {
		let u = [],
			r = [],
			c = null,
			t = ({ state: e }) => {
				var t = _(o, location);
				let r = l.value;
				var n = i.value;
				let a = 0;
				if (e) {
					if (((l.value = t), (i.value = e), c && c === r)) return void (c = null);
					a = n ? e.position - n.position : 0;
				} else s(t);
				u.forEach(e => {
					e(l.value, r, {
						delta: a,
						type: F.pop,
						direction: a ? (0 < a ? d.forward : d.back) : d.unknown
					});
				});
			};
		function n() {
			var e = window.history;
			e.state && e.replaceState(U({}, e.state, { scroll: K() }), "");
		}
		return (
			window.addEventListener("popstate", t),
			window.addEventListener("beforeunload", n, { passive: !0 }),
			{
				pauseListeners: function () {
					c = l.value;
				},
				listen: function (t) {
					u.push(t);
					var e = () => {
						var e = u.indexOf(t);
						-1 < e && u.splice(e, 1);
					};
					return r.push(e), e;
				},
				destroy: function () {
					for (var e of r) e();
					(r = []),
						window.removeEventListener("popstate", t),
						window.removeEventListener("beforeunload", n);
				}
			}
		);
	}
	function $(e, t, r, n = !1, a = !1) {
		return {
			back: e,
			current: t,
			forward: r,
			replaced: n,
			position: window.history.length,
			scroll: a ? K() : null
		};
	}
	function C(a) {
		let { history: o, location: i } = window,
			n = { value: _(a, i) },
			l = { value: o.state };
		function s(e, t, r) {
			var n = a.indexOf("#"),
				n =
					-1 < n
						? (i.host && document.querySelector("base") ? a : a.slice(n)) + e
						: w() + a + e;
			try {
				o[r ? "replaceState" : "pushState"](t, "", n), (l.value = t);
			} catch (e) {
				W("Error with push/replace State", e), i[r ? "replace" : "assign"](n);
			}
		}
		return (
			l.value ||
				s(
					n.value,
					{
						back: null,
						current: n.value,
						forward: null,
						position: o.length - 1,
						replaced: !0,
						scroll: null
					},
					!0
				),
			{
				location: n,
				state: l,
				push: function (e, t) {
					var r = U({}, l.value, o.state, { forward: e, scroll: K() }),
						r =
							(o.state ||
								W(
									"history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\nhistory.replaceState(history.state, '', url)\n\nYou can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state."
								),
							s(r.current, r, !0),
							U({}, $(n.value, e, null), { position: r.position + 1 }, t));
					s(e, r, !1), (n.value = e);
				},
				replace: function (e, t) {
					s(
						e,
						U({}, o.state, $(l.value.back, e, l.value.forward, !0), t, {
							position: l.value.position
						}),
						!0
					),
						(n.value = e);
				}
			}
		);
	}
	function O(e) {
		let t = C((e = g(e))),
			r = E(e, t.state, t.location, t.replace);
		e = U(
			{
				location: "",
				base: e,
				go: function (e, t = !0) {
					t || r.pauseListeners(), history.go(e);
				},
				createHref: b.bind(null, e)
			},
			t,
			r
		);
		return (
			Object.defineProperty(e, "location", { enumerable: !0, get: () => t.location.value }),
			Object.defineProperty(e, "state", { enumerable: !0, get: () => t.state.value }),
			e
		);
	}
	function ue(e) {
		return "string" == typeof e || "symbol" == typeof e;
	}
	let H = {
			path: "/",
			name: void 0,
			params: {},
			query: {},
			hash: "",
			fullPath: "/",
			matched: [],
			meta: {},
			redirectedFrom: void 0
		},
		R = Symbol("navigation failure"),
		x =
			((e.NavigationFailureType = void 0),
			((t = e.NavigationFailureType || (e.NavigationFailureType = {}))[(t.aborted = 4)] =
				"aborted"),
			(t[(t.cancelled = 8)] = "cancelled"),
			(t[(t.duplicated = 16)] = "duplicated"),
			{
				[1]({ location: e, currentLocation: t }) {
					return (
						`No match for
 ` +
						JSON.stringify(e) +
						(t ? "\nwhile being at\n" + JSON.stringify(t) : "")
					);
				},
				2({ from: e, to: t }) {
					return `Redirected from "${e.fullPath}" to "${(e => {
						if ("string" == typeof e) return e;
						if ("path" in e) return e.path;
						var t,
							r = {};
						for (t of P) t in e && (r[t] = e[t]);
						return JSON.stringify(r, null, 2);
					})(t)}" via a navigation guard.`;
				},
				4({ from: e, to: t }) {
					return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
				},
				8({ from: e, to: t }) {
					return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
				},
				16({ from: e }) {
					return `Avoided redundant navigation to current location: "${e.fullPath}".`;
				}
			});
	function z(e, t) {
		return U(new Error(x[e](t)), { type: e, [R]: !0 }, t);
	}
	function J(e, t) {
		return e instanceof Error && R in e && (null == t || !!(e.type & t));
	}
	let P = ["params", "query", "hash"],
		S = "[^/]+?",
		j = { sensitive: !1, strict: !1, start: !0, end: !0 },
		A = /[.+*?^${}()[\]/\\]/g;
	function I(s, e) {
		var a,
			t = U({}, j, e),
			r = [];
		let o = t.start ? "^" : "",
			i = [];
		for (a of s) {
			var l = a.length ? [] : [90];
			t.strict && !a.length && (o += "/");
			for (let n = 0; n < a.length; n++) {
				var u = a[n];
				let r = 40 + (t.sensitive ? 0.25 : 0);
				if (0 === u.type) n || (o += "/"), (o += u.value.replace(A, "\\$&")), (r += 40);
				else if (1 === u.type) {
					var { value: u, repeatable: c, optional: d, regexp: h } = u;
					i.push({ name: u, repeatable: c, optional: d });
					let t = h || S;
					if (t !== S) {
						r += 10;
						try {
							new RegExp(`(${t})`);
						} catch (e) {
							throw new Error(
								`Invalid custom RegExp for param "${u}" (${t}): ` + e.message
							);
						}
					}
					let e = c ? `((?:${t})(?:/(?:${t}))*)` : `(${t})`;
					n || (e = d && a.length < 2 ? `(?:/${e})` : "/" + e),
						d && (e += "?"),
						(o += e),
						(r += 20),
						d && (r += -8),
						c && (r += -20),
						".*" === t && (r += -50);
				}
				l.push(r);
			}
			r.push(l);
		}
		t.strict && t.end && (r[(e = r.length - 1)][r[e].length - 1] += 0.7000000000000001),
			t.strict || (o += "/?"),
			t.end ? (o += "$") : t.strict && (o += "(?:/|$)");
		let p = new RegExp(o, t.sensitive ? "" : "i");
		return {
			re: p,
			score: r,
			keys: i,
			parse: function (e) {
				var t = e.match(p),
					r = {};
				if (!t) return null;
				for (let e = 1; e < t.length; e++) {
					var n = t[e] || "",
						a = i[e - 1];
					r[a.name] = n && a.repeatable ? n.split("/") : n;
				}
				return r;
			},
			stringify: function (e) {
				let t = "",
					r = !1;
				for (var n of s) {
					(r && t.endsWith("/")) || (t += "/"), (r = !1);
					for (var a of n)
						if (0 === a.type) t += a.value;
						else if (1 === a.type) {
							var { value: a, repeatable: o, optional: i } = a,
								l = a in e ? e[a] : "";
							if (B(l) && !o)
								throw new Error(
									`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`
								);
							o = B(l) ? l.join("/") : l;
							if (!o) {
								if (!i) throw new Error(`Missing required param "${a}"`);
								n.length < 2 && (t.endsWith("/") ? (t = t.slice(0, -1)) : (r = !0));
							}
							t += o;
						}
				}
				return t || "/";
			}
		};
	}
	function T(e, t) {
		let r = 0;
		for (var n = e.score, a = t.score; r < n.length && r < a.length; ) {
			var o = ((e, t) => {
				let r = 0;
				for (; r < e.length && r < t.length; ) {
					var n = t[r] - e[r];
					if (n) return n;
					r++;
				}
				return e.length < t.length
					? 1 === e.length && 80 === e[0]
						? -1
						: 1
					: e.length > t.length
						? 1 === t.length && 80 === t[0]
							? 1
							: -1
						: 0;
			})(n[r], a[r]);
			if (o) return o;
			r++;
		}
		if (1 === Math.abs(a.length - n.length)) {
			if (L(n)) return 1;
			if (L(a)) return -1;
		}
		return a.length - n.length;
	}
	function L(e) {
		var t = e[e.length - 1];
		return 0 < e.length && t[t.length - 1] < 0;
	}
	let ce = { type: 0, value: "" },
		de = /[a-zA-Z0-9_]/;
	function he(e, t, r) {
		var n,
			r = I(
				(e => {
					if (!e) return [[]];
					if ("/" === e) return [[ce]];
					if (!e.startsWith("/"))
						throw new Error(
							`Route paths should start with a "/": "${e}" should be "/${e}".`
						);
					function t(e) {
						throw new Error(`ERR (${r})/"${u}": ` + e);
					}
					let r = 0,
						n = r,
						a = [],
						o;
					function i() {
						o && a.push(o), (o = []);
					}
					let l = 0,
						s,
						u = "",
						c = "";
					function d() {
						u &&
							(0 === r
								? o.push({ type: 0, value: u })
								: 1 === r || 2 === r || 3 === r
									? (1 < o.length &&
											("*" === s || "+" === s) &&
											t(
												`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
											),
										o.push({
											type: 1,
											value: u,
											regexp: c,
											repeatable: "*" === s || "+" === s,
											optional: "*" === s || "?" === s
										}))
									: t("Invalid state to consume buffer"),
							(u = ""));
					}
					function h() {
						u += s;
					}
					for (; l < e.length; )
						if ("\\" === (s = e[l++]) && 2 !== r) (n = r), (r = 4);
						else
							switch (r) {
								case 0:
									"/" === s ? (u && d(), i()) : ":" === s ? (d(), (r = 1)) : h();
									break;
								case 4:
									h(), (r = n);
									break;
								case 1:
									"(" === s
										? (r = 2)
										: de.test(s)
											? h()
											: (d(),
												(r = 0),
												"*" !== s && "?" !== s && "+" !== s && l--);
									break;
								case 2:
									")" === s
										? "\\" == c[c.length - 1]
											? (c = c.slice(0, -1) + s)
											: (r = 3)
										: (c += s);
									break;
								case 3:
									d(),
										(r = 0),
										"*" !== s && "?" !== s && "+" !== s && l--,
										(c = "");
									break;
								default:
									t("Unknown state");
							}
					return 2 === r && t(`Unfinished custom RegExp for param "${u}"`), d(), i(), a;
				})(e.path),
				r
			),
			a = new Set();
		for (n of r.keys)
			a.has(n.name) &&
				W(
					`Found duplicated params with name "${n.name}" for path "${e.path}". Only the last one will be available on "$route.params".`
				),
				a.add(n.name);
		r = U(r, { record: e, parent: t, children: [], alias: [] });
		return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
	}
	function pe(e, g) {
		let y = [],
			b = new Map();
		function w(e, t, r) {
			var n,
				a,
				o,
				i,
				l,
				s = !r,
				u = {
					path: (n = e).path,
					redirect: n.redirect,
					name: n.name,
					meta: n.meta || {},
					aliasOf: void 0,
					beforeEnter: n.beforeEnter,
					props: (e => {
						var t = {},
							r = e.props || !1;
						if ("component" in e) t.default = r;
						else for (var n in e.components) t[n] = "object" == typeof r ? r[n] : r;
						return t;
					})(n),
					children: n.children || [],
					instances: {},
					leaveGuards: new Set(),
					updateGuards: new Set(),
					enterCallbacks: {},
					components:
						"components" in n
							? n.components || null
							: n.component && { default: n.component }
				},
				c =
					((n = u),
					(a = t) &&
						a.record.name &&
						!n.name &&
						!n.path &&
						W(
							`The route named "${String(a.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`
						),
					(u.aliasOf = r && r.record),
					me(g, e)),
				d = [u];
			if ("alias" in e)
				for (o of "string" == typeof e.alias ? [e.alias] : e.alias)
					d.push(
						U({}, u, {
							components: (r ? r.record : u).components,
							path: o,
							aliasOf: r ? r.record : u
						})
					);
			let h;
			for (l of d) {
				var p,
					f = l.path;
				if (
					(t &&
						"/" !== f[0] &&
						((p = "/" === (p = t.record.path)[p.length - 1] ? "" : "/"),
						(l.path = t.record.path + (f && p + f))),
					"*" === l.path)
				)
					throw new Error(
						'Catch all routes ("*") must now be defined using a param with a custom regexp.\nSee more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.'
					);
				if (
					((i = he(l, t, c)),
					t &&
						"/" === f[0] &&
						((e, t) => {
							for (var r of t.keys)
								if (!e.keys.find(k.bind(null, r)))
									return W(
										`Absolute path "${e.record.path}" must have the exact same param named "${r.name}" as its parent "${t.record.path}".`
									);
						})(i, t),
					r
						? (r.alias.push(i),
							((e, t) => {
								for (var r of e.keys)
									if (!r.optional && !t.keys.find(k.bind(null, r)))
										return W(
											`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${r.name}"`
										);
								for (var n of t.keys)
									if (!n.optional && !e.keys.find(k.bind(null, n)))
										return W(
											`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`
										);
							})(r, i))
						: ((h = h || i) !== i && h.alias.push(i),
							s && e.name && !ve(i) && _(e.name)),
					u.children)
				) {
					var v = u.children;
					for (let e = 0; e < v.length; e++) w(v[e], i, r && r.children[e]);
				}
				if (
					((r = r || i),
					(i.record.components && Object.keys(i.record.components).length) ||
						i.record.name ||
						i.record.redirect)
				) {
					m = void 0;
					var m = i;
					let e = 0;
					for (
						;
						e < y.length &&
						0 <= T(m, y[e]) &&
						(m.record.path !== y[e].record.path ||
							!(function t(r, e) {
								return e.children.some(e => e === r || t(r, e));
							})(m, y[e]));

					)
						e++;
					y.splice(e, 0, m), m.record.name && !ve(m) && b.set(m.record.name, m);
				}
			}
			return h
				? () => {
						_(h);
					}
				: V;
		}
		function _(e) {
			var t;
			ue(e)
				? (t = b.get(e)) &&
					(b.delete(e),
					y.splice(y.indexOf(t), 1),
					t.children.forEach(_),
					t.alias.forEach(_))
				: -1 < (t = y.indexOf(e)) &&
					(y.splice(t, 1),
					e.record.name && b.delete(e.record.name),
					e.children.forEach(_),
					e.alias.forEach(_));
		}
		return (
			(g = me({ strict: !1, end: !0, sensitive: !1 }, g)),
			e.forEach(e => w(e)),
			{
				addRoute: w,
				resolve: function (e, t) {
					let r,
						n = {},
						a,
						o;
					if ("name" in e && e.name) {
						if (!(r = b.get(e.name))) throw z(1, { location: e });
						var i = Object.keys(e.params || {}).filter(
							t => !r.keys.find(e => e.name === t)
						);
						i.length &&
							W(
								`Discarded invalid param(s) "${i.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`
							),
							(o = r.record.name),
							(n = U(
								fe(
									t.params,
									r.keys.filter(e => !e.optional).map(e => e.name)
								),
								e.params &&
									fe(
										e.params,
										r.keys.map(e => e.name)
									)
							)),
							(a = r.stringify(n));
					} else if ("path" in e)
						(a = e.path).startsWith("/") ||
							W(
								`The Matcher cannot resolve relative paths but received "${a}". Unless you directly called \`matcher.resolve("${a}")\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.`
							),
							(r = y.find(e => e.re.test(a))) &&
								((n = r.parse(a)), (o = r.record.name));
					else {
						if (!(r = t.name ? b.get(t.name) : y.find(e => e.re.test(t.path))))
							throw z(1, { location: e, currentLocation: t });
						(o = r.record.name), (n = U({}, t.params, e.params)), (a = r.stringify(n));
					}
					var l = [];
					let s = r;
					for (; s; ) l.unshift(s.record), (s = s.parent);
					return {
						name: o,
						path: a,
						params: n,
						matched: l,
						meta: l.reduce((e, t) => U(e, t.meta), {})
					};
				},
				removeRoute: _,
				getRoutes: function () {
					return y;
				},
				getRecordMatcher: function (e) {
					return b.get(e);
				}
			}
		);
	}
	function fe(e, t) {
		var r,
			n = {};
		for (r of t) r in e && (n[r] = e[r]);
		return n;
	}
	function ve(e) {
		for (; e; ) {
			if (e.record.aliasOf) return 1;
			e = e.parent;
		}
	}
	function me(e, t) {
		var r,
			n = {};
		for (r in e) n[r] = (r in t ? t : e)[r];
		return n;
	}
	function k(e, t) {
		return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
	}
	let ge = /#/g,
		ye = /&/g,
		be = /\//g,
		we = /=/g,
		_e = /\?/g,
		ke = /\+/g,
		Ee = /%5B/g,
		$e = /%5D/g,
		Ce = /%5E/g,
		Oe = /%60/g,
		Re = /%7B/g,
		xe = /%7C/g,
		Pe = /%7D/g,
		Se = /%20/g;
	function Y(e) {
		return encodeURI("" + e)
			.replace(xe, "|")
			.replace(Ee, "[")
			.replace($e, "]");
	}
	function a(e) {
		return Y(e)
			.replace(ke, "%2B")
			.replace(Se, "+")
			.replace(ge, "%23")
			.replace(ye, "%26")
			.replace(Oe, "`")
			.replace(Re, "{")
			.replace(Pe, "}")
			.replace(Ce, "^");
	}
	function je(e) {
		return null == e ? "" : Y(e).replace(ge, "%23").replace(_e, "%3F").replace(be, "%2F");
	}
	function X(t) {
		try {
			return decodeURIComponent("" + t);
		} catch (e) {
			W(`Error decoding "${t}". Using original value`);
		}
		return "" + t;
	}
	function Ae(e) {
		var t = {};
		if ("" !== e && "?" !== e) {
			var r = ("?" === e[0] ? e.slice(1) : e).split("&");
			for (let e = 0; e < r.length; ++e) {
				var n = r[e].replace(ke, " "),
					a = n.indexOf("="),
					o = X(a < 0 ? n : n.slice(0, a)),
					n = a < 0 ? null : X(n.slice(a + 1));
				if (o in t) {
					let e = t[o];
					(e = B(e) ? e : (t[o] = [e])).push(n);
				} else t[o] = n;
			}
		}
		return t;
	}
	function Z(e) {
		let r = "";
		for (let t in e) {
			var n = e[t];
			(t = a(t).replace(we, "%3D")),
				null == n
					? void 0 !== n && (r += (r.length ? "&" : "") + t)
					: (B(n) ? n.map(e => e && a(e)) : [n && a(n)]).forEach(e => {
							void 0 !== e &&
								((r += (r.length ? "&" : "") + t), null != e) &&
								(r += "=" + e);
						});
		}
		return r;
	}
	let h = Symbol("router view location matched"),
		p = Symbol("router view depth"),
		ee = Symbol("router"),
		te = Symbol("route location"),
		re = Symbol("router view location");
	function ne() {
		let r = [];
		return {
			add: function (t) {
				return (
					r.push(t),
					() => {
						var e = r.indexOf(t);
						-1 < e && r.splice(e, 1);
					}
				);
			},
			list: () => r.slice(),
			reset: function () {
				r = [];
			}
		};
	}
	function Ie(e, t, r) {
		var n = () => {
			e[t].delete(r);
		};
		N.onUnmounted(n),
			N.onDeactivated(n),
			N.onActivated(() => {
				e[t].add(r);
			}),
			e[t].add(r);
	}
	function ae(i, l, s, u, c) {
		let d = u && (u.enterCallbacks[c] = u.enterCallbacks[c] || []);
		return () =>
			new Promise((r, n) => {
				let a = e => {
					var t;
					!1 === e
						? n(z(4, { from: s, to: l }))
						: e instanceof Error
							? n(e)
							: "string" == typeof (t = e) || (t && "object" == typeof t)
								? n(z(2, { from: l, to: e }))
								: (d &&
										u.enterCallbacks[c] === d &&
										"function" == typeof e &&
										d.push(e),
									r());
				};
				var e = i.call(
					u && u.instances[c],
					l,
					s,
					((e, t, r) => {
						let n = 0;
						return function () {
							1 == n++ &&
								W(
									`The "next" callback was called more than once in one navigation guard when going from "${r.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`
								),
								(e._called = !0),
								1 === n && e.apply(null, arguments);
						};
					})(a, l, s)
				);
				let o = Promise.resolve(e);
				if ((i.length < 3 && (o = o.then(a)), 2 < i.length)) {
					let t = `The "next" callback was never called inside of ${i.name ? '"' + i.name + '"' : ""}:
${i.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
					if ("object" == typeof e && "then" in e)
						o = o.then(e =>
							a._called
								? e
								: (W(t), Promise.reject(new Error("Invalid navigation guard")))
						);
					else if (void 0 !== e && !a._called)
						return W(t), void n(new Error("Invalid navigation guard"));
				}
				o.catch(e => n(e));
			});
	}
	function oe(e, a, o, i) {
		var l = [];
		for (let n of e) {
			n.components ||
				n.children.length ||
				W(
					`Record with path "${n.path}" is either missing a "component(s)"` +
						' or "children" property.'
				);
			for (let r in n.components) {
				let t = n.components[r];
				if (!t || ("object" != typeof t && "function" != typeof t))
					throw (
						(W(
							`Component "${r}" in record with path "${n.path}" is not` +
								` a valid component. Received "${String(t)}".`
						),
						new Error("Invalid route component"))
					);
				if ("then" in t) {
					W(
						`Component "${r}" in record with path "${n.path}" is a ` +
							"Promise instead of a function that returns a Promise. Did you " +
							`write "import('./MyPage.vue')" instead of ` +
							`"() => import('./MyPage.vue')" ? This will break in ` +
							"production if not fixed."
					);
					let e = t;
					t = () => e;
				} else
					t.__asyncLoader &&
						!t.__warnedDefineAsync &&
						((t.__warnedDefineAsync = !0),
						W(
							`Component "${r}" in record with path "${n.path}" is defined ` +
								'using "defineAsyncComponent()". ' +
								`Write "() => import('./MyPage.vue')" instead of ` +
								`"defineAsyncComponent(() => import('./MyPage.vue'))".`
						));
				if ("beforeRouteEnter" === a || n.instances[r])
					if (
						"object" == typeof (s = t) ||
						"displayName" in s ||
						"props" in s ||
						"__vccOpts" in s
					) {
						var s = (t.__vccOpts || t)[a];
						s && l.push(ae(s, o, i, n, r));
					} else {
						let e = t();
						"catch" in e ||
							(W(
								`Component "${r}" in record with path "${n.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`
							),
							(e = Promise.resolve(e))),
							l.push(() =>
								e.then(e =>
									e
										? ((e = u(e) ? e.default : e),
											(e = ((n.components[r] = e).__vccOpts || e)[a]) &&
												ae(e, o, i, n, r)())
										: Promise.reject(
												new Error(
													`Couldn't resolve component "${r}" at "${n.path}"`
												)
											)
								)
							);
					}
			}
		}
		return l;
	}
	function o(t) {
		let r = N.inject(ee),
			i = N.inject(te),
			l = N.computed(() => r.resolve(N.unref(t.to))),
			e = N.computed(() => {
				var e,
					t,
					r = l.value.matched,
					n = r.length,
					a = r[n - 1],
					o = i.matched;
				return a && o.length
					? !(-1 < (e = o.findIndex(G.bind(null, a)))) &&
						((t = Le(r[n - 2])), 1 < n) &&
						Le(a) === t &&
						o[o.length - 1].path !== t
						? o.findIndex(G.bind(null, r[n - 2]))
						: e
					: -1;
			}),
			n = N.computed(
				() =>
					-1 < e.value &&
					((e, t) => {
						for (var n in t) {
							var a = t[n];
							let r = e[n];
							if ("string" == typeof a) {
								if (a !== r) return !1;
							} else if (
								!B(r) ||
								r.length !== a.length ||
								a.some((e, t) => e !== r[t])
							)
								return !1;
						}
						return !0;
					})(i.params, l.value.params)
			),
			a = N.computed(
				() =>
					-1 < e.value && e.value === i.matched.length - 1 && v(i.params, l.value.params)
			);
		if (M) {
			var o = N.getCurrentInstance();
			if (o) {
				let e = { route: l.value, isActive: n.value, isExactActive: a.value };
				(o.__vrl_devtools = o.__vrl_devtools || []),
					o.__vrl_devtools.push(e),
					N.watchEffect(
						() => {
							(e.route = l.value),
								(e.isActive = n.value),
								(e.isExactActive = a.value);
						},
						{ flush: "post" }
					);
			}
		}
		return {
			route: l,
			href: N.computed(() => l.value.href),
			isActive: n,
			isExactActive: a,
			navigate: function (e = {}) {
				return (e => {
					if (
						!(
							e.metaKey ||
							e.altKey ||
							e.ctrlKey ||
							e.shiftKey ||
							e.defaultPrevented ||
							(void 0 !== e.button && 0 !== e.button)
						)
					) {
						if (e.currentTarget && e.currentTarget.getAttribute) {
							var t = e.currentTarget.getAttribute("target");
							if (/\b_blank\b/i.test(t)) return;
						}
						return e.preventDefault && e.preventDefault(), 1;
					}
				})(e)
					? r[N.unref(t.replace) ? "replace" : "push"](N.unref(t.to)).catch(V)
					: Promise.resolve();
			}
		};
	}
	let Te = N.defineComponent({
		name: "RouterLink",
		compatConfig: { MODE: 3 },
		props: {
			to: { type: [String, Object], required: !0 },
			replace: Boolean,
			activeClass: String,
			exactActiveClass: String,
			custom: Boolean,
			ariaCurrentValue: { type: String, default: "page" }
		},
		useLink: o,
		setup(t, { slots: r }) {
			let n = N.reactive(o(t)),
				e = N.inject(ee).options,
				a = N.computed(() => ({
					[Ne(t.activeClass, e.linkActiveClass, "router-link-active")]: n.isActive,
					[Ne(t.exactActiveClass, e.linkExactActiveClass, "router-link-exact-active")]:
						n.isExactActive
				}));
			return () => {
				var e = r.default && r.default(n);
				return t.custom
					? e
					: N.h(
							"a",
							{
								"aria-current": n.isExactActive ? t.ariaCurrentValue : null,
								href: n.href,
								onClick: n.navigate,
								class: a.value
							},
							e
						);
			};
		}
	});
	function Le(e) {
		return e ? (e.aliasOf || e).path : "";
	}
	let Ne = (e, t, r) => (null != e ? e : null != t ? t : r);
	function Me(e, t) {
		return e ? (1 === (e = e(t)).length ? e[0] : e) : null;
	}
	let Ue = N.defineComponent({
		name: "RouterView",
		inheritAttrs: !1,
		props: { name: { type: String, default: "default" }, route: Object },
		compatConfig: { MODE: 3 },
		setup(o, { attrs: i, slots: l }) {
			var e, t;
			(e = N.getCurrentInstance()),
				(t = e.parent && e.parent.type.name),
				(e = e.parent && e.parent.subTree && e.parent.subTree.type),
				t &&
					("KeepAlive" === t || t.includes("Transition")) &&
					"object" == typeof e &&
					"RouterView" === e.name &&
					W(
						'<router-view> can no longer be used directly inside <transition> or <keep-alive>.\nUse slot props instead:\n\n<router-view v-slot="{ Component }">\n' +
							`  <${(e = "KeepAlive" === t ? "keep-alive" : "transition")}>
` +
							`    <component :is="Component" />
` +
							`  </${e}>
` +
							"</router-view>"
					);
			let r = N.inject(re),
				s = N.computed(() => o.route || r.value),
				n = N.inject(p, 0),
				u = N.computed(() => {
					let e = N.unref(n);
					for (var t, r = s.value.matched; (t = r[e]) && !t.components; ) e++;
					return e;
				}),
				c = N.computed(() => s.value.matched[u.value]),
				d =
					(N.provide(
						p,
						N.computed(() => u.value + 1)
					),
					N.provide(h, c),
					N.provide(re, s),
					N.ref());
			return (
				N.watch(
					() => [d.value, c.value, o.name],
					([t, e, r], [n, a]) => {
						e &&
							((e.instances[r] = t), a) &&
							a !== e &&
							t &&
							t === n &&
							(e.leaveGuards.size || (e.leaveGuards = a.leaveGuards),
							e.updateGuards.size || (e.updateGuards = a.updateGuards)),
							!t ||
								!e ||
								(a && G(e, a) && n) ||
								(e.enterCallbacks[r] || []).forEach(e => e(t));
					},
					{ flush: "post" }
				),
				() => {
					var e = s.value;
					let t = o.name,
						r = c.value;
					var n = r && r.components[t];
					if (!n) return Me(l.default, { Component: n, route: e });
					var a = r.props[t],
						a = a ? (!0 === a ? e.params : "function" == typeof a ? a(e) : a) : null,
						n = N.h(
							n,
							U({}, a, i, {
								onVnodeUnmounted: e => {
									e.component.isUnmounted && (r.instances[t] = null);
								},
								ref: d
							})
						);
					if (M && n.ref) {
						let t = { depth: u.value, name: r.name, path: r.path, meta: r.meta };
						(B(n.ref) ? n.ref.map(e => e.i) : [n.ref.i]).forEach(e => {
							e.__vrv_devtools = t;
						});
					}
					return Me(l.default, { Component: n, route: e }) || n;
				}
			);
		}
	});
	function De() {
		return "undefined" != typeof navigator && "undefined" != typeof window
			? window
			: "undefined" != typeof global
				? global
				: {};
	}
	let Ve = "function" == typeof Proxy,
		Be = "devtools-plugin:setup",
		r,
		n;
	function We() {
		return (
			void 0 === r &&
				("undefined" != typeof window && window.performance
					? ((r = !0), (n = window.performance))
					: "undefined" != typeof global &&
						  null != (e = global.perf_hooks) &&
						  e.performance
						? ((r = !0), (n = global.perf_hooks.performance))
						: (r = !1)),
			(r ? n : Date).now()
		);
		var e;
	}
	class qe {
		constructor(e, t) {
			(this.target = null),
				(this.targetQueue = []),
				(this.onQueue = []),
				(this.plugin = e),
				(this.hook = t);
			var r = {};
			if (e.settings)
				for (var n in e.settings) {
					var a = e.settings[n];
					r[n] = a.defaultValue;
				}
			let o = "__vue-devtools-plugin-settings__" + e.id,
				i = Object.assign({}, r);
			try {
				var l = localStorage.getItem(o),
					s = JSON.parse(l);
				Object.assign(i, s);
			} catch (e) {}
			(this.fallbacks = {
				getSettings() {
					return i;
				},
				setSettings(e) {
					try {
						localStorage.setItem(o, JSON.stringify(e));
					} catch (e) {}
					i = e;
				},
				now() {
					return We();
				}
			}),
				t &&
					t.on("plugin:settings:set", (e, t) => {
						e === this.plugin.id && this.fallbacks.setSettings(t);
					}),
				(this.proxiedOn = new Proxy(
					{},
					{
						get: (e, t) =>
							this.target
								? this.target.on[t]
								: (...e) => {
										this.onQueue.push({ method: t, args: e });
									}
					}
				)),
				(this.proxiedTarget = new Proxy(
					{},
					{
						get: (e, r) =>
							this.target
								? this.target[r]
								: "on" === r
									? this.proxiedOn
									: Object.keys(this.fallbacks).includes(r)
										? (...e) => (
												this.targetQueue.push({
													method: r,
													args: e,
													resolve: () => {}
												}),
												this.fallbacks[r](...e)
											)
										: (...t) =>
												new Promise(e => {
													this.targetQueue.push({
														method: r,
														args: t,
														resolve: e
													});
												})
					}
				));
		}
		async setRealTarget(e) {
			this.target = e;
			for (var t of this.onQueue) this.target.on[t.method](...t.args);
			for (var r of this.targetQueue) r.resolve(await this.target[r.method](...r.args));
		}
	}
	function Ge(e, t) {
		var r = e,
			n = De(),
			a = De().__VUE_DEVTOOLS_GLOBAL_HOOK__,
			o = Ve && r.enableEarlyProxy;
		!a || (!n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ && o)
			? ((o = o ? new qe(r, a) : null),
				(n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
					pluginDescriptor: r,
					setupFn: t,
					proxy: o
				}),
				o && t(o.proxiedTarget))
			: a.emit(Be, e, t);
	}
	function c(e, t) {
		var r = U({}, e, {
			matched: e.matched.map(e => {
				var t,
					r = e,
					n = ["instances", "children", "aliasOf"],
					a = {};
				for (t in r) n.includes(t) || (a[t] = r[t]);
				return a;
			})
		});
		return { _custom: { type: null, readOnly: !0, display: e.fullPath, tooltip: t, value: r } };
	}
	function f(e) {
		return { _custom: { display: e } };
	}
	let Fe = 0;
	function Ke(l, s, u) {
		if (!s.__hasDevtools) {
			s.__hasDevtools = !0;
			let e = Fe++;
			Ge(
				{
					id: "org.vuejs.router" + (e ? "." + e : ""),
					label: "Vue Router",
					packageName: "vue-router",
					homepage: "https://router.vuejs.org",
					logo: "https://router.vuejs.org/logo.png",
					componentStateTypes: ["Routing"],
					app: l
				},
				a => {
					"function" != typeof a.now &&
						console.warn(
							"[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."
						),
						a.on.inspectComponent((e, t) => {
							e.instanceData &&
								e.instanceData.state.push({
									type: "Routing",
									key: "$route",
									editable: !1,
									value: c(s.currentRoute.value, "Current Route")
								});
						}),
						a.on.visitComponentTree(({ treeNode: n, componentInstance: e }) => {
							var t;
							e.__vrv_devtools &&
								((t = e.__vrv_devtools),
								n.tags.push({
									label: (t.name ? t.name.toString() + ": " : "") + t.path,
									textColor: 0,
									tooltip: "This component is rendered by &lt;router-view&gt;",
									backgroundColor: Qe
								})),
								B(e.__vrl_devtools) &&
									((e.__devtoolsApi = a),
									e.__vrl_devtools.forEach(e => {
										let t = Ye,
											r = "";
										e.isExactActive
											? ((t = ze), (r = "This is exactly active"))
											: e.isActive && ((t = He), (r = "This link is active")),
											n.tags.push({
												label: e.route.path,
												textColor: 0,
												tooltip: r,
												backgroundColor: t
											});
									}));
						}),
						N.watch(s.currentRoute, () => {
							t(),
								a.notifyComponentUpdate(),
								a.sendInspectorTree(n),
								a.sendInspectorState(n);
						});
					let o = "router:navigations:" + e,
						r =
							(a.addTimelineLayer({
								id: o,
								label: `Router${e ? " " + e : ""} Navigations`,
								color: 4237508
							}),
							s.onError((e, t) => {
								a.addTimelineEvent({
									layerId: o,
									event: {
										title: "Error during Navigation",
										subtitle: t.fullPath,
										logType: "error",
										time: a.now(),
										data: { error: e },
										groupId: t.meta.__navigationId
									}
								});
							}),
							0),
						n =
							(s.beforeEach((e, t) => {
								t = {
									guard: f("beforeEach"),
									from: c(t, "Current Location during this navigation"),
									to: c(e, "Target location")
								};
								Object.defineProperty(e.meta, "__navigationId", { value: r++ }),
									a.addTimelineEvent({
										layerId: o,
										event: {
											time: a.now(),
											title: "Start of navigation",
											subtitle: e.fullPath,
											data: t,
											groupId: e.meta.__navigationId
										}
									});
							}),
							s.afterEach((e, t, r) => {
								var n = { guard: f("afterEach") };
								r
									? ((n.failure = {
											_custom: {
												type: Error,
												readOnly: !0,
												display: r ? r.message : "",
												tooltip: "Navigation Failure",
												value: r
											}
										}),
										(n.status = f("❌")))
									: (n.status = f("✅")),
									(n.from = c(t, "Current Location during this navigation")),
									(n.to = c(e, "Target location")),
									a.addTimelineEvent({
										layerId: o,
										event: {
											title: "End of navigation",
											subtitle: e.fullPath,
											time: a.now(),
											data: n,
											logType: r ? "warning" : "default",
											groupId: e.meta.__navigationId
										}
									});
							}),
							"router-inspector:" + e);
					function t() {
						if (i) {
							let t = i,
								e = u
									.getRoutes()
									.filter(e => !e.parent || !e.parent.record.components);
							e.forEach(rt),
								(e = t.filter
									? e.filter(e =>
											(function t(e, r) {
												let n = String(e.re).match(tt);
												e.__vd_match = !1;
												if (!n || n.length < 3) return !1;
												let a = new RegExp(n[1].replace(/\$$/, ""), n[2]);
												if (a.test(r))
													return (
														e.children.forEach(e => t(e, r)),
														("/" !== e.record.path || "/" === r) &&
															((e.__vd_match = e.re.test(r)), !0)
													);
												let o = e.record.path.toLowerCase();
												let i = X(o);
												if (
													!r.startsWith("/") &&
													(i.includes(r) || o.includes(r))
												)
													return !0;
												if (i.startsWith(r) || o.startsWith(r)) return !0;
												if (
													e.record.name &&
													String(e.record.name).includes(r)
												)
													return !0;
												return e.children.some(e => t(e, r));
											})(e, t.filter.toLowerCase())
										)
									: e).forEach(e =>
									(function t(r, n) {
										let e =
											n.matched.length &&
											G(n.matched[n.matched.length - 1], r.record);
										r.__vd_exactActive = r.__vd_active = e;
										e || (r.__vd_active = n.matched.some(e => G(e, r.record)));
										r.children.forEach(e => t(e, n));
									})(e, s.currentRoute.value)
								),
								(t.rootNodes = e.map(Ze));
						}
					}
					a.addInspector({
						id: n,
						label: "Routes" + (e ? " " + e : ""),
						icon: "book",
						treeFilterPlaceholder: "Search routes"
					});
					let i;
					a.on.getInspectorTree(e => {
						(i = e).app === l && e.inspectorId === n && t();
					}),
						a.on.getInspectorState(t => {
							var e;
							t.app === l &&
								t.inspectorId === n &&
								(e = u.getRoutes().find(e => e.record.__vd_id === t.nodeId)) &&
								(t.state = {
									options: (e => {
										var t = e.record,
											r = [{ editable: !1, key: "path", value: t.path }];
										return (
											null != t.name &&
												r.push({
													editable: !1,
													key: "name",
													value: t.name
												}),
											r.push({ editable: !1, key: "regexp", value: e.re }),
											e.keys.length &&
												r.push({
													editable: !1,
													key: "keys",
													value: {
														_custom: {
															type: null,
															readOnly: !0,
															display: e.keys
																.map(
																	e =>
																		"" +
																		e.name +
																		((e = e).optional
																			? e.repeatable
																				? "*"
																				: "?"
																			: e.repeatable
																				? "+"
																				: "")
																)
																.join(" "),
															tooltip: "Param keys",
															value: e.keys
														}
													}
												}),
											null != t.redirect &&
												r.push({
													editable: !1,
													key: "redirect",
													value: t.redirect
												}),
											e.alias.length &&
												r.push({
													editable: !1,
													key: "aliases",
													value: e.alias.map(e => e.record.path)
												}),
											Object.keys(e.record.meta).length &&
												r.push({
													editable: !1,
													key: "meta",
													value: e.record.meta
												}),
											r.push({
												key: "score",
												editable: !1,
												value: {
													_custom: {
														type: null,
														readOnly: !0,
														display: e.score
															.map(e => e.join(", "))
															.join(" | "),
														tooltip: "Score used to sort routes",
														value: e.score
													}
												}
											}),
											r
										);
									})(e)
								});
						}),
						a.sendInspectorTree(n),
						a.sendInspectorState(n);
				}
			);
		}
	}
	let Qe = 15485081,
		He = 2450411,
		ze = 8702998,
		Je = 2282478,
		Ye = 16486972,
		Xe = 6710886;
	function Ze(e) {
		var t = [],
			r = e.record;
		null != r.name && t.push({ label: String(r.name), textColor: 0, backgroundColor: Je }),
			r.aliasOf && t.push({ label: "alias", textColor: 0, backgroundColor: Ye }),
			e.__vd_match && t.push({ label: "matches", textColor: 0, backgroundColor: Qe }),
			e.__vd_exactActive && t.push({ label: "exact", textColor: 0, backgroundColor: ze }),
			e.__vd_active && t.push({ label: "active", textColor: 0, backgroundColor: He }),
			r.redirect &&
				t.push({
					label: "string" == typeof r.redirect ? "redirect: " + r.redirect : "redirects",
					textColor: 16777215,
					backgroundColor: Xe
				});
		let n = r.__vd_id;
		return (
			null == n && ((n = String(et++)), (r.__vd_id = n)),
			{ id: n, label: r.path, tags: t, children: e.children.map(Ze) }
		);
	}
	let et = 0,
		tt = /^\/(.*)\/([a-z]*)$/;
	function rt(e) {
		(e.__vd_match = !1), e.children.forEach(rt);
	}
	return (
		(e.RouterLink = Te),
		(e.RouterView = Ue),
		(e.START_LOCATION = H),
		(e.createMemoryHistory = function (e = "") {
			let s = [],
				u = [""],
				c = 0;
			function r(e) {
				++c !== u.length && u.splice(c), u.push(e);
			}
			return (
				(e = {
					location: "",
					state: {},
					base: (e = g(e)),
					createHref: b.bind(null, e),
					replace(e) {
						u.splice(c--, 1), r(e);
					},
					push(e, t) {
						r(e);
					},
					listen(t) {
						return (
							s.push(t),
							() => {
								var e = s.indexOf(t);
								-1 < e && s.splice(e, 1);
							}
						);
					},
					destroy() {
						(s = []), (u = [""]), (c = 0);
					},
					go(e, t = !0) {
						var r = this.location,
							n = e < 0 ? d.back : d.forward;
						if (((c = Math.max(0, Math.min(c + e, u.length - 1))), t)) {
							var a,
								[o, i, { direction: t, delta: r }] = [
									this.location,
									r,
									{ direction: n, delta: e }
								],
								l = { direction: t, delta: r, type: F.pop };
							for (a of s) a(o, i, l);
						}
					}
				}),
				Object.defineProperty(e, "location", { enumerable: !0, get: () => u[c] }),
				e
			);
		}),
		(e.createRouter = function (s) {
			let u = pe(s.routes, s),
				c = s.parseQuery || Ae,
				d = s.stringifyQuery || Z,
				h = s.history;
			if (!h)
				throw new Error(
					'Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.'
				);
			let p = ne(),
				f = ne(),
				e = ne(),
				v = N.shallowRef(H),
				m = H,
				g =
					(M &&
						s.scrollBehavior &&
						"scrollRestoration" in history &&
						(history.scrollRestoration = "manual"),
					D.bind(null, e => "" + e)),
				y = D.bind(null, je),
				b = D.bind(null, X);
			function w(r, n) {
				if (((n = U({}, n || v.value)), "string" == typeof r)) {
					var a = q(c, r, n.path);
					let e = u.resolve({ path: a.path }, n),
						t = h.createHref(a.fullPath);
					return (
						t.startsWith("//")
							? W(
									`Location "${r}" resolved to "${t}". A resolved location cannot start with multiple slashes.`
								)
							: e.matched.length || W(`No match found for location with path "${r}"`),
						U(a, e, {
							params: b(e.params),
							hash: X(a.hash),
							redirectedFrom: void 0,
							href: t
						})
					);
				}
				let e;
				if ("path" in r)
					"params" in r &&
						!("name" in r) &&
						Object.keys(r.params).length &&
						W(
							`Path "${r.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`
						),
						(e = U({}, r, { path: q(c, r.path, n.path).path }));
				else {
					var t,
						o = U({}, r.params);
					for (t in o) null == o[t] && delete o[t];
					(e = U({}, r, { params: y(o) })), (n.params = y(n.params));
				}
				let i = u.resolve(e, n);
				var l,
					a = r.hash || "",
					n =
						(a &&
							!a.startsWith("#") &&
							W(
								`A \`hash\` should always start with the character "#". Replace "${a}" with "#${a}".`
							),
						(i.params = g(b(i.params))),
						(n = d),
						(l = U({}, r, {
							hash: Y(a).replace(Re, "{").replace(Pe, "}").replace(Ce, "^"),
							path: i.path
						})),
						(n = l.query ? n(l.query) : ""),
						l.path + (n && "?") + n + (l.hash || ""));
				let s = h.createHref(n);
				return (
					s.startsWith("//")
						? W(
								`Location "${r}" resolved to "${s}". A resolved location cannot start with multiple slashes.`
							)
						: i.matched.length ||
							W(
								`No match found for location with path "${"path" in r ? r.path : r}"`
							),
					U(
						{
							fullPath: n,
							hash: a,
							query:
								d === Z
									? (e => {
											var t,
												r = {};
											for (t in e) {
												var n = e[t];
												void 0 !== n &&
													(r[t] = B(n)
														? n.map(e => (null == e ? null : "" + e))
														: null == n
															? n
															: "" + n);
											}
											return r;
										})(r.query)
									: r.query || {}
						},
						i,
						{ redirectedFrom: void 0, href: s }
					)
				);
			}
			function _(e) {
				return "string" == typeof e ? q(c, e, v.value.path) : U({}, e);
			}
			function k(e, t) {
				if (m !== e) return z(8, { from: t, to: e });
			}
			function n(e) {
				return $(e);
			}
			function E(t) {
				var r = t.matched[t.matched.length - 1];
				if (r && r.redirect) {
					r = r.redirect;
					let e = "function" == typeof r ? r(t) : r;
					if (
						("string" == typeof e &&
							((e =
								e.includes("?") || e.includes("#")
									? (e = _(e))
									: { path: e }).params = {}),
						"path" in e || "name" in e)
					)
						return U(
							{ query: t.query, hash: t.hash, params: "path" in e ? {} : t.params },
							e
						);
					throw (
						(W(`Invalid redirect found:
${JSON.stringify(e, null, 2)}
 when navigating to "${t.fullPath}". A redirect must contain a name or path. This will break in production.`),
						new Error("Invalid redirect"))
					);
				}
			}
			function $(e, t) {
				var r = (m = w(e));
				let n = v.value,
					a = e.state,
					o = e.force,
					i = !0 === e.replace;
				e = E(r);
				if (e)
					return $(
						U(_(e), {
							state: "object" == typeof e ? U({}, a, e.state) : a,
							force: o,
							replace: i
						}),
						t || r
					);
				let l = r;
				l.redirectedFrom = t;
				let s;
				return (
					!o && ie(d, n, r) && ((s = z(16, { to: l, from: n })), j(n, n, !0, !1)),
					(s ? Promise.resolve(s) : C(l, n))
						.catch(e => (J(e) ? (J(e, 2) ? e : S(e)) : P(e, l, n)))
						.then(e => {
							if (e) {
								if (J(e, 2))
									return ie(d, w(e.to), l) &&
										t &&
										30 < (t._count = t._count ? t._count + 1 : 1)
										? (W(`Detected a possibly infinite redirection in a navigation guard when going from "${n.fullPath}" to "${l.fullPath}". Aborting to avoid a Stack Overflow.
 Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.`),
											Promise.reject(
												new Error("Infinite redirect in navigation guard")
											))
										: $(
												U({ replace: i }, _(e.to), {
													state:
														"object" == typeof e.to
															? U({}, a, e.to.state)
															: a,
													force: o
												}),
												t || l
											);
							} else e = R(l, n, !0, i, a);
							return O(l, n, e), e;
						})
				);
			}
			function a(e) {
				var t = I.values().next().value;
				return t && "function" == typeof t.runWithContext ? t.runWithContext(e) : e();
			}
			function C(r, n) {
				let a,
					[e, t, o] = ((n, a) => {
						var o = [],
							i = [],
							l = [],
							t = Math.max(a.matched.length, n.matched.length);
						for (let e = 0; e < t; e++) {
							let t = a.matched[e],
								r =
									(t && (n.matched.find(e => G(e, t)) ? i : o).push(t),
									n.matched[e]);
							!r || a.matched.find(e => G(e, r)) || l.push(r);
						}
						return [o, i, l];
					})(r, n);
				a = oe(e.reverse(), "beforeRouteLeave", r, n);
				for (var i of e)
					i.leaveGuards.forEach(e => {
						a.push(ae(e, r, n));
					});
				let l = function (e, t) {
					return (e = k(e, t)) ? Promise.reject(e) : Promise.resolve();
				}.bind(null, r, n);
				return (
					a.push(l),
					L(a)
						.then(() => {
							a = [];
							for (var e of p.list()) a.push(ae(e, r, n));
							return a.push(l), L(a);
						})
						.then(() => {
							a = oe(t, "beforeRouteUpdate", r, n);
							for (var e of t)
								e.updateGuards.forEach(e => {
									a.push(ae(e, r, n));
								});
							return a.push(l), L(a);
						})
						.then(() => {
							a = [];
							for (var e of o)
								if (e.beforeEnter)
									if (B(e.beforeEnter))
										for (var t of e.beforeEnter) a.push(ae(t, r, n));
									else a.push(ae(e.beforeEnter, r, n));
							return a.push(l), L(a);
						})
						.then(
							() => (
								r.matched.forEach(e => (e.enterCallbacks = {})),
								(a = oe(o, "beforeRouteEnter", r, n)).push(l),
								L(a)
							)
						)
						.then(() => {
							a = [];
							for (var e of f.list()) a.push(ae(e, r, n));
							return a.push(l), L(a);
						})
						.catch(e => (J(e, 8) ? e : Promise.reject(e)))
				);
			}
			function O(t, r, n) {
				e.list().forEach(e => a(() => e(t, r, n)));
			}
			function R(e, t, r, n, a) {
				var o = k(e, t);
				if (o) return o;
				var o = t === H,
					i = M ? history.state : {};
				r &&
					(n || o
						? h.replace(e.fullPath, U({ scroll: o && i && i.scroll }, a))
						: h.push(e.fullPath, a)),
					j((v.value = e), t, r, o),
					S();
			}
			let o;
			function t() {
				o =
					o ||
					h.listen((e, t, n) => {
						if (T.listening) {
							let r = w(e);
							var a,
								e = E(r);
							if (e) $(U(e, { replace: !0 }), r).catch(V);
							else {
								m = r;
								let t = v.value;
								M && ((e = se(t.fullPath, n.delta)), (a = K()), Q.set(e, a)),
									C(r, t)
										.catch(e =>
											J(e, 12)
												? e
												: J(e, 2)
													? ($(e.to, r)
															.then(e => {
																J(e, 20) &&
																	!n.delta &&
																	n.type === F.pop &&
																	h.go(-1, !1);
															})
															.catch(V),
														Promise.reject())
													: (n.delta && h.go(-n.delta, !1), P(e, r, t))
										)
										.then(e => {
											(e = e || R(r, t, !1)) &&
												(n.delta && !J(e, 8)
													? h.go(-n.delta, !1)
													: n.type === F.pop && J(e, 20) && h.go(-1, !1)),
												O(r, t, e);
										})
										.catch(V);
							}
						}
					});
			}
			let i = ne(),
				l = ne(),
				x;
			function P(t, r, n) {
				S(t);
				var e = l.list();
				return (
					e.length
						? e.forEach(e => e(t, r, n))
						: (W("uncaught error during route navigation:"), console.error(t)),
					Promise.reject(t)
				);
			}
			function S(r) {
				return (
					x || ((x = !r), t(), i.list().forEach(([e, t]) => (r ? t(r) : e())), i.reset()),
					r
				);
			}
			function j(t, r, e, n) {
				let a = s.scrollBehavior;
				if (!M || !a) return Promise.resolve();
				let o =
					(!e && ((i = se(t.fullPath, 0)), (l = Q.get(i)), Q.delete(i), l)) ||
					((n || !e) && history.state && history.state.scroll) ||
					null;
				var i, l;
				N.nextTick()
					.then(() => a(t, r, o))
					.then(e => e && le(e))
					.catch(e => P(e, t, r));
			}
			let r = e => h.go(e),
				A,
				I = new Set(),
				T = {
					currentRoute: v,
					listening: !0,
					addRoute: function (e, t) {
						let r, n;
						return (n = ue(e) ? ((r = u.getRecordMatcher(e)), t) : e), u.addRoute(n, r);
					},
					removeRoute: function (e) {
						var t = u.getRecordMatcher(e);
						t ? u.removeRoute(t) : W(`Cannot remove non-existent route "${String(e)}"`);
					},
					hasRoute: function (e) {
						return !!u.getRecordMatcher(e);
					},
					getRoutes: function () {
						return u.getRoutes().map(e => e.record);
					},
					resolve: w,
					options: s,
					push: n,
					replace: function (e) {
						return n(U(_(e), { replace: !0 }));
					},
					go: r,
					back: () => r(-1),
					forward: () => r(1),
					beforeEach: p.add,
					beforeResolve: f.add,
					afterEach: e.add,
					onError: l.add,
					isReady: function () {
						return x && v.value !== H
							? Promise.resolve()
							: new Promise((e, t) => {
									i.add([e, t]);
								});
					},
					install(e) {
						e.component("RouterLink", Te),
							e.component("RouterView", Ue),
							(e.config.globalProperties.$router = this),
							Object.defineProperty(e.config.globalProperties, "$route", {
								enumerable: !0,
								get: () => N.unref(v)
							}),
							M &&
								!A &&
								v.value === H &&
								((A = !0),
								n(h.location).catch(e => {
									W("Unexpected error when starting the router:", e);
								}));
						var t = {};
						for (let e in H)
							Object.defineProperty(t, e, { get: () => v.value[e], enumerable: !0 });
						e.provide(ee, this), e.provide(te, N.shallowReactive(t)), e.provide(re, v);
						let r = e.unmount;
						I.add(e),
							(e.unmount = function () {
								I.delete(e),
									I.size < 1 &&
										((m = H),
										o && o(),
										(o = null),
										(v.value = H),
										(A = !1),
										(x = !1)),
									r();
							}),
							M && Ke(e, this, u);
					}
				};
			function L(e) {
				return e.reduce((e, t) => e.then(() => a(t)), Promise.resolve());
			}
			return T;
		}),
		(e.createRouterMatcher = pe),
		(e.createWebHashHistory = function (e) {
			return (
				(e = location.host ? e || location.pathname + location.search : "").includes("#") ||
					(e += "#"),
				e.endsWith("#/") ||
					e.endsWith("#") ||
					W(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`),
				O(e)
			);
		}),
		(e.createWebHistory = O),
		(e.isNavigationFailure = J),
		(e.loadRouteLocation = function (e) {
			return e.matched.every(e => e.redirect)
				? Promise.reject(new Error("Cannot load a route that redirects."))
				: Promise.all(
						e.matched.map(
							n =>
								n.components &&
								Promise.all(
									Object.keys(n.components).reduce((e, t) => {
										var r = n.components[t];
										return (
											"function" != typeof r ||
												"displayName" in r ||
												e.push(
													r().then(e => {
														if (!e)
															return Promise.reject(
																new Error(
																	`Couldn't resolve component "${t}" at "${n.path}". Ensure you passed a function that returns a promise.`
																)
															);
														e = u(e) ? e.default : e;
														n.components[t] = e;
													})
												),
											e
										);
									}, [])
								)
						)
					).then(() => e);
		}),
		(e.matchedRouteKey = h),
		(e.onBeforeRouteLeave = function (e) {
			var t;
			N.getCurrentInstance()
				? (t = N.inject(h, {}).value)
					? Ie(t, "leaveGuards", e)
					: W(
							"No active route record was found when calling `onBeforeRouteLeave()`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?"
						)
				: W(
						"getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function"
					);
		}),
		(e.onBeforeRouteUpdate = function (e) {
			var t;
			N.getCurrentInstance()
				? (t = N.inject(h, {}).value)
					? Ie(t, "updateGuards", e)
					: W(
							"No active route record was found when calling `onBeforeRouteUpdate()`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?"
						)
				: W(
						"getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function"
					);
		}),
		(e.parseQuery = Ae),
		(e.routeLocationKey = te),
		(e.routerKey = ee),
		(e.routerViewLocationKey = re),
		(e.stringifyQuery = Z),
		(e.useLink = o),
		(e.useRoute = function () {
			return N.inject(te);
		}),
		(e.useRouter = function () {
			return N.inject(ee);
		}),
		(e.viewDepthKey = p),
		e
	);
})({}, Vue);
