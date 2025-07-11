!(function (t, e) {
	e(t);
})(window, function (thiGlobalWin, t) {
	function e(t, e) {
		return e.toUpperCase();
	}
	var n = [],
		C = thiGlobalWin.document,
		l = n.slice,
		g = n.concat,
		a = n.push,
		i = n.indexOf,
		r = {},
		o = r.toString,
		d = r.hasOwnProperty,
		m = {},
		s = "2.2.4",
		k = function (t, e) {
			return new k.fn.init(t, e);
		},
		u = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		c = /^-ms-/,
		h = /-([\da-z])/gi;
	function f(t) {
		var e = !!t && "length" in t && t.length,
			n = k.type(t);
		return (
			"function" !== n &&
			!k.isWindow(t) &&
			("array" === n || 0 === e || ("number" == typeof e && 0 < e && e - 1 in t))
		);
	}
	(k.fn = k.prototype =
		{
			jquery: s,
			constructor: k,
			selector: "",
			length: 0,
			toArray: function () {
				return l.call(this);
			},
			get: function (t) {
				return null != t ? (t < 0 ? this[t + this.length] : this[t]) : l.call(this);
			},
			pushStack: function (t) {
				t = k.merge(this.constructor(), t);
				return (t.prevObject = this), (t.context = this.context), t;
			},
			each: function (t) {
				return k.each(this, t);
			},
			map: function (n) {
				return this.pushStack(
					k.map(this, function (t, e) {
						return n.call(t, e, t);
					})
				);
			},
			slice: function () {
				return this.pushStack(l.apply(this, arguments));
			},
			first: function () {
				return this.eq(0);
			},
			last: function () {
				return this.eq(-1);
			},
			eq: function (t) {
				var e = this.length,
					t = +t + (t < 0 ? e : 0);
				return this.pushStack(0 <= t && t < e ? [this[t]] : []);
			},
			end: function () {
				return this.prevObject || this.constructor();
			},
			push: a,
			sort: n.sort,
			splice: n.splice
		}),
		(k.extend = k.fn.extend =
			function () {
				var t,
					e,
					n,
					r,
					i,
					o = arguments[0] || {},
					s = 1,
					a = arguments.length,
					u = !1;
				for (
					"boolean" == typeof o && ((u = o), (o = arguments[s] || {}), s++),
						"object" == typeof o || k.isFunction(o) || (o = {}),
						s === a && ((o = this), s--);
					s < a;
					s++
				)
					if (null != (t = arguments[s]))
						for (e in t)
							(i = o[e]),
								(n = t[e]),
								o !== n &&
									(u && n && (k.isPlainObject(n) || (r = k.isArray(n)))
										? ((i = r
												? ((r = !1), i && k.isArray(i) ? i : [])
												: i && k.isPlainObject(i)
													? i
													: {}),
											(o[e] = k.extend(u, i, n)))
										: void 0 !== n && (o[e] = n));
				return o;
			}),
		k.extend({
			expando: "jQuery" + (s + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function (t) {
				throw new Error(t);
			},
			noop: function () {},
			isFunction: function (t) {
				return "function" === k.type(t);
			},
			isArray: Array.isArray,
			isWindow: function (t) {
				return null != t && t === t.window;
			},
			isNumeric: function (t) {
				var e = t && t.toString();
				return !k.isArray(t) && 0 <= e - parseFloat(e) + 1;
			},
			isPlainObject: function (t) {
				if ("object" !== k.type(t) || t.nodeType || k.isWindow(t)) return !1;
				if (
					t.constructor &&
					!d.call(t, "constructor") &&
					!d.call(t.constructor.prototype || {}, "isPrototypeOf")
				)
					return !1;
				for (var e in t);
				return void 0 === e || d.call(t, e);
			},
			isEmptyObject: function (t) {
				for (var e in t) return !1;
				return !0;
			},
			type: function (t) {
				return null == t
					? t + ""
					: "object" == typeof t || "function" == typeof t
						? r[o.call(t)] || "object"
						: typeof t;
			},
			globalEval: function (t) {
				var e,
					n = eval;
				(t = k.trim(t)) &&
					(1 === t.indexOf("use strict")
						? (((e = C.createElement("script")).text = t),
							C.head.appendChild(e).parentNode.removeChild(e))
						: n(t));
			},
			camelCase: function (t) {
				return t.replace(c, "ms-").replace(h, e);
			},
			nodeName: function (t, e) {
				return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
			},
			each: function (t, e) {
				var n,
					r = 0;
				if (f(t)) for (n = t.length; r < n && !1 !== e.call(t[r], r, t[r]); r++);
				else for (r in t) if (!1 === e.call(t[r], r, t[r])) break;
				return t;
			},
			trim: function (t) {
				return null == t ? "" : (t + "").replace(u, "");
			},
			makeArray: function (t, e) {
				e = e || [];
				return (
					null != t &&
						(f(Object(t)) ? k.merge(e, "string" == typeof t ? [t] : t) : a.call(e, t)),
					e
				);
			},
			inArray: function (t, e, n) {
				return null == e ? -1 : i.call(e, t, n);
			},
			merge: function (t, e) {
				for (var n = +e.length, r = 0, i = t.length; r < n; r++) t[i++] = e[r];
				return (t.length = i), t;
			},
			grep: function (t, e, n) {
				for (var r = [], i = 0, o = t.length, s = !n; i < o; i++)
					!e(t[i], i) != s && r.push(t[i]);
				return r;
			},
			map: function (t, e, n) {
				var r,
					i,
					o = 0,
					s = [];
				if (f(t)) for (r = t.length; o < r; o++) null != (i = e(t[o], o, n)) && s.push(i);
				else for (o in t) (i = e(t[o], o, n)), null != i && s.push(i);
				return g.apply([], s);
			},
			guid: 1,
			proxy: function (t, e) {
				var n, r;
				return (
					"string" == typeof e && ((r = t[e]), (e = t), (t = r)),
					k.isFunction(t)
						? ((n = l.call(arguments, 2)),
							((r = function () {
								return t.apply(e || this, n.concat(l.call(arguments)));
							}).guid = t.guid =
								t.guid || k.guid++),
							r)
						: void 0
				);
			},
			now: Date.now,
			support: m
		}),
		"function" == typeof Symbol && (k.fn[Symbol.iterator] = n[Symbol.iterator]),
		k.each(
			"Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
			function (t, e) {
				r["[object " + e + "]"] = e.toLowerCase();
			}
		);
	var p = (function (n) {
		function h(t, e, n) {
			var r = "0x" + e - 65536;
			return r != r || n
				? e
				: r < 0
					? String.fromCharCode(65536 + r)
					: String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
		}
		function e() {
			x();
		}
		var t,
			d,
			w,
			o,
			r,
			g,
			f,
			m,
			_,
			u,
			c,
			x,
			C,
			i,
			k,
			v,
			s,
			a,
			y,
			S = "sizzle" + +new Date(),
			b = n.document,
			O = 0,
			l = 0,
			p = it(),
			E = it(),
			T = it(),
			A = function (t, e) {
				return t === e && (c = !0), 0;
			},
			I = {}.hasOwnProperty,
			j = [],
			P = j.pop,
			N = j.push,
			D = j.push,
			R = j.slice,
			M = function (t, e) {
				for (var n = 0, r = t.length; n < r; n++) if (t[n] === e) return n;
				return -1;
			},
			W =
				"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			L = "[\\x20\\t\\r\\n\\f]",
			F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			H =
				"\\[" +
				L +
				"*(" +
				F +
				")(?:" +
				L +
				"*([*^$|!~]?=)" +
				L +
				"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
				F +
				"))|)" +
				L +
				"*\\]",
			B =
				":(" +
				F +
				")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
				H +
				")*)|.*)\\)|)",
			q = new RegExp(L + "+", "g"),
			z = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
			U = new RegExp("^" + L + "*," + L + "*"),
			G = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
			V = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
			$ = new RegExp(B),
			X = new RegExp("^" + F + "$"),
			Y = {
				ID: new RegExp("^#(" + F + ")"),
				CLASS: new RegExp("^\\.(" + F + ")"),
				TAG: new RegExp("^(" + F + "|[*])"),
				ATTR: new RegExp("^" + H),
				PSEUDO: new RegExp("^" + B),
				CHILD: new RegExp(
					"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
						L +
						"*(even|odd|(([+-]|)(\\d*)n|)" +
						L +
						"*(?:([+-]|)" +
						L +
						"*(\\d+)|))" +
						L +
						"*\\)|)",
					"i"
				),
				bool: new RegExp("^(?:" + W + ")$", "i"),
				needsContext: new RegExp(
					"^" +
						L +
						"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
						L +
						"*((?:-\\d)?\\d*)" +
						L +
						"*\\)|)(?=[^-]|$)",
					"i"
				)
			},
			K = /^(?:input|select|textarea|button)$/i,
			Q = /^h\d$/i,
			J = /^[^{]+\{\s*\[native \w/,
			Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
			tt = /[+~]/,
			et = /'|\\/g,
			nt = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig");
		try {
			D.apply((j = R.call(b.childNodes)), b.childNodes), j[b.childNodes.length].nodeType;
		} catch (t) {
			D = {
				apply: j.length
					? function (t, e) {
							N.apply(t, R.call(e));
						}
					: function (t, e) {
							for (var n = t.length, r = 0; (t[n++] = e[r++]); );
							t.length = n - 1;
						}
			};
		}
		function rt(t, e, n, r) {
			var i,
				o,
				s,
				a,
				u,
				c,
				l,
				h,
				f = e && e.ownerDocument,
				p = e ? e.nodeType : 9;
			if (((n = n || []), "string" != typeof t || !t || (1 !== p && 9 !== p && 11 !== p)))
				return n;
			if (!r && ((e ? e.ownerDocument || e : b) !== C && x(e), (e = e || C), k)) {
				if (11 !== p && (c = Z.exec(t)))
					if ((i = c[1])) {
						if (9 === p) {
							if (!(s = e.getElementById(i))) return n;
							if (s.id === i) return n.push(s), n;
						} else if (f && (s = f.getElementById(i)) && y(e, s) && s.id === i)
							return n.push(s), n;
					} else {
						if (c[2]) return D.apply(n, e.getElementsByTagName(t)), n;
						if ((i = c[3]) && d.getElementsByClassName && e.getElementsByClassName)
							return D.apply(n, e.getElementsByClassName(i)), n;
					}
				if (d.qsa && !T[t + " "] && (!v || !v.test(t))) {
					if (1 !== p) (f = e), (h = t);
					else if ("object" !== e.nodeName.toLowerCase()) {
						for (
							(a = e.getAttribute("id"))
								? (a = a.replace(et, "\\$&"))
								: e.setAttribute("id", (a = S)),
								o = (l = g(t)).length,
								u = X.test(a) ? "#" + a : "[id='" + a + "']";
							o--;

						)
							l[o] = u + " " + ft(l[o]);
						(h = l.join(",")), (f = (tt.test(t) && lt(e.parentNode)) || e);
					}
					if (h)
						try {
							return D.apply(n, f.querySelectorAll(h)), n;
						} catch (t) {
						} finally {
							a === S && e.removeAttribute("id");
						}
				}
			}
			return m(t.replace(z, "$1"), e, n, r);
		}
		function it() {
			var n = [];
			function r(t, e) {
				return n.push(t + " ") > w.cacheLength && delete r[n.shift()], (r[t + " "] = e);
			}
			return r;
		}
		function ot(t) {
			return (t[S] = !0), t;
		}
		function st(t) {
			var e = C.createElement("div");
			try {
				return !!t(e);
			} catch (t) {
				return !1;
			} finally {
				e.parentNode && e.parentNode.removeChild(e), (e = null);
			}
		}
		function at(t, e) {
			for (var n = t.split("|"), r = n.length; r--; ) w.attrHandle[n[r]] = e;
		}
		function ut(t, e) {
			var n = e && t,
				r =
					n &&
					1 === t.nodeType &&
					1 === e.nodeType &&
					(~e.sourceIndex || 1 << 31) - (~t.sourceIndex || 1 << 31);
			if (r) return r;
			if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
			return t ? 1 : -1;
		}
		function ct(s) {
			return ot(function (o) {
				return (
					(o = +o),
					ot(function (t, e) {
						for (var n, r = s([], t.length, o), i = r.length; i--; )
							t[(n = r[i])] && (t[n] = !(e[n] = t[n]));
					})
				);
			});
		}
		function lt(t) {
			return t && void 0 !== t.getElementsByTagName && t;
		}
		for (t in ((d = rt.support = {}),
		(r = rt.isXML =
			function (t) {
				t = t && (t.ownerDocument || t).documentElement;
				return !!t && "HTML" !== t.nodeName;
			}),
		(x = rt.setDocument =
			function (t) {
				var t = t ? t.ownerDocument || t : b;
				return (
					t !== C &&
						9 === t.nodeType &&
						t.documentElement &&
						((i = (C = t).documentElement),
						(k = !r(C)),
						(t = C.defaultView) &&
							t.top !== t &&
							(t.addEventListener
								? t.addEventListener("unload", e, !1)
								: t.attachEvent && t.attachEvent("onunload", e)),
						(d.attributes = st(function (t) {
							return (t.className = "i"), !t.getAttribute("className");
						})),
						(d.getElementsByTagName = st(function (t) {
							return (
								t.appendChild(C.createComment("")),
								!t.getElementsByTagName("*").length
							);
						})),
						(d.getElementsByClassName = J.test(C.getElementsByClassName)),
						(d.getById = st(function (t) {
							return (
								(i.appendChild(t).id = S),
								!C.getElementsByName || !C.getElementsByName(S).length
							);
						})),
						d.getById
							? ((w.find.ID = function (t, e) {
									if (void 0 !== e.getElementById && k) {
										t = e.getElementById(t);
										return t ? [t] : [];
									}
								}),
								(w.filter.ID = function (t) {
									var e = t.replace(nt, h);
									return function (t) {
										return t.getAttribute("id") === e;
									};
								}))
							: (delete w.find.ID,
								(w.filter.ID = function (t) {
									var e = t.replace(nt, h);
									return function (t) {
										t =
											void 0 !== t.getAttributeNode &&
											t.getAttributeNode("id");
										return t && t.value === e;
									};
								})),
						(w.find.TAG = d.getElementsByTagName
							? function (t, e) {
									return void 0 !== e.getElementsByTagName
										? e.getElementsByTagName(t)
										: d.qsa
											? e.querySelectorAll(t)
											: void 0;
								}
							: function (t, e) {
									var n,
										r = [],
										i = 0,
										o = e.getElementsByTagName(t);
									if ("*" !== t) return o;
									for (; (n = o[i++]); ) 1 === n.nodeType && r.push(n);
									return r;
								}),
						(w.find.CLASS =
							d.getElementsByClassName &&
							function (t, e) {
								return void 0 !== e.getElementsByClassName && k
									? e.getElementsByClassName(t)
									: void 0;
							}),
						(s = []),
						(v = []),
						(d.qsa = J.test(C.querySelectorAll)) &&
							(st(function (t) {
								(i.appendChild(t).innerHTML =
									"<a id='" +
									S +
									"'></a><select id='" +
									S +
									"-\r\\' msallowcapture=''><option selected=''></option></select>"),
									t.querySelectorAll("[msallowcapture^='']").length &&
										v.push("[*^$]=" + L + "*(?:''|\"\")"),
									t.querySelectorAll("[selected]").length ||
										v.push("\\[" + L + "*(?:value|" + W + ")"),
									t.querySelectorAll("[id~=" + S + "-]").length || v.push("~="),
									t.querySelectorAll(":checked").length || v.push(":checked"),
									t.querySelectorAll("a#" + S + "+*").length ||
										v.push(".#.+[+~]");
							}),
							st(function (t) {
								var e = C.createElement("input");
								e.setAttribute("type", "hidden"),
									t.appendChild(e).setAttribute("name", "D"),
									t.querySelectorAll("[name=d]").length &&
										v.push("name" + L + "*[*^$|!~]?="),
									t.querySelectorAll(":enabled").length ||
										v.push(":enabled", ":disabled"),
									t.querySelectorAll("*,:x"),
									v.push(",.*:");
							})),
						(d.matchesSelector = J.test(
							(a =
								i.matches ||
								i.webkitMatchesSelector ||
								i.mozMatchesSelector ||
								i.oMatchesSelector ||
								i.msMatchesSelector)
						)) &&
							st(function (t) {
								(d.disconnectedMatch = a.call(t, "div")),
									a.call(t, "[s!='']:x"),
									s.push("!=", B);
							}),
						(v = v.length && new RegExp(v.join("|"))),
						(s = s.length && new RegExp(s.join("|"))),
						(t = J.test(i.compareDocumentPosition)),
						(y =
							t || J.test(i.contains)
								? function (t, e) {
										var n = 9 === t.nodeType ? t.documentElement : t,
											e = e && e.parentNode;
										return (
											t === e ||
											!(
												!e ||
												1 !== e.nodeType ||
												!(n.contains
													? n.contains(e)
													: t.compareDocumentPosition &&
														16 & t.compareDocumentPosition(e))
											)
										);
									}
								: function (t, e) {
										if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
										return !1;
									}),
						(A = t
							? function (t, e) {
									if (t === e) return (c = !0), 0;
									var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
									return (
										n ||
										(1 &
											(n =
												(t.ownerDocument || t) === (e.ownerDocument || e)
													? t.compareDocumentPosition(e)
													: 1) ||
										(!d.sortDetached && e.compareDocumentPosition(t) === n)
											? t === C || (t.ownerDocument === b && y(b, t))
												? -1
												: e === C || (e.ownerDocument === b && y(b, e))
													? 1
													: u
														? M(u, t) - M(u, e)
														: 0
											: 4 & n
												? -1
												: 1)
									);
								}
							: function (t, e) {
									if (t === e) return (c = !0), 0;
									var n,
										r = 0,
										i = t.parentNode,
										o = e.parentNode,
										s = [t],
										a = [e];
									if (!i || !o)
										return t === C
											? -1
											: e === C
												? 1
												: i
													? -1
													: o
														? 1
														: u
															? M(u, t) - M(u, e)
															: 0;
									if (i === o) return ut(t, e);
									for (n = t; (n = n.parentNode); ) s.unshift(n);
									for (n = e; (n = n.parentNode); ) a.unshift(n);
									for (; s[r] === a[r]; ) r++;
									return r
										? ut(s[r], a[r])
										: s[r] === b
											? -1
											: a[r] === b
												? 1
												: 0;
								})),
					C
				);
			}),
		(rt.matches = function (t, e) {
			return rt(t, null, null, e);
		}),
		(rt.matchesSelector = function (t, e) {
			if (
				((t.ownerDocument || t) !== C && x(t),
				(e = e.replace(V, "='$1']")),
				d.matchesSelector && k && !T[e + " "] && (!s || !s.test(e)) && (!v || !v.test(e)))
			)
				try {
					var n = a.call(t, e);
					if (n || d.disconnectedMatch || (t.document && 11 !== t.document.nodeType))
						return n;
				} catch (t) {}
			return 0 < rt(e, C, null, [t]).length;
		}),
		(rt.contains = function (t, e) {
			return (t.ownerDocument || t) !== C && x(t), y(t, e);
		}),
		(rt.attr = function (t, e) {
			(t.ownerDocument || t) !== C && x(t);
			var n = w.attrHandle[e.toLowerCase()],
				n = n && I.call(w.attrHandle, e.toLowerCase()) ? n(t, e, !k) : void 0;
			return void 0 !== n
				? n
				: d.attributes || !k
					? t.getAttribute(e)
					: (n = t.getAttributeNode(e)) && n.specified
						? n.value
						: null;
		}),
		(rt.error = function (t) {
			throw new Error("Syntax error, unrecognized expression: " + t);
		}),
		(rt.uniqueSort = function (t) {
			var e,
				n = [],
				r = 0,
				i = 0;
			if (((c = !d.detectDuplicates), (u = !d.sortStable && t.slice(0)), t.sort(A), c)) {
				for (; (e = t[i++]); ) e === t[i] && (r = n.push(i));
				for (; r--; ) t.splice(n[r], 1);
			}
			return (u = null), t;
		}),
		(o = rt.getText =
			function (t) {
				var e,
					n = "",
					r = 0,
					i = t.nodeType;
				if (i) {
					if (1 === i || 9 === i || 11 === i) {
						if ("string" == typeof t.textContent) return t.textContent;
						for (t = t.firstChild; t; t = t.nextSibling) n += o(t);
					} else if (3 === i || 4 === i) return t.nodeValue;
				} else for (; (e = t[r++]); ) n += o(e);
				return n;
			}),
		((w = rt.selectors =
			{
				cacheLength: 50,
				createPseudo: ot,
				match: Y,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": {
						dir: "parentNode"
					},
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": {
						dir: "previousSibling"
					}
				},
				preFilter: {
					ATTR: function (t) {
						return (
							(t[1] = t[1].replace(nt, h)),
							(t[3] = (t[3] || t[4] || t[5] || "").replace(nt, h)),
							"~=" === t[2] && (t[3] = " " + t[3] + " "),
							t.slice(0, 4)
						);
					},
					CHILD: function (t) {
						return (
							(t[1] = t[1].toLowerCase()),
							"nth" === t[1].slice(0, 3)
								? (t[3] || rt.error(t[0]),
									(t[4] = +(t[4]
										? t[5] + (t[6] || 1)
										: 2 * ("even" === t[3] || "odd" === t[3]))),
									(t[5] = +(t[7] + t[8] || "odd" === t[3])))
								: t[3] && rt.error(t[0]),
							t
						);
					},
					PSEUDO: function (t) {
						var e,
							n = !t[6] && t[2];
						return Y.CHILD.test(t[0])
							? null
							: (t[3]
									? (t[2] = t[4] || t[5] || "")
									: n &&
										$.test(n) &&
										(e = g(n, !0)) &&
										(e = n.indexOf(")", n.length - e) - n.length) &&
										((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
								t.slice(0, 3));
					}
				},
				filter: {
					TAG: function (t) {
						var e = t.replace(nt, h).toLowerCase();
						return "*" === t
							? function () {
									return !0;
								}
							: function (t) {
									return t.nodeName && t.nodeName.toLowerCase() === e;
								};
					},
					CLASS: function (t) {
						var e = p[t + " "];
						return (
							e ||
							((e = new RegExp("(^|" + L + ")" + t + "(" + L + "|$)")) &&
								p(t, function (t) {
									return e.test(
										("string" == typeof t.className && t.className) ||
											(void 0 !== t.getAttribute &&
												t.getAttribute("class")) ||
											""
									);
								}))
						);
					},
					ATTR: function (e, n, r) {
						return function (t) {
							t = rt.attr(t, e);
							return null == t
								? "!=" === n
								: !n ||
										((t += ""),
										"=" === n
											? t === r
											: "!=" === n
												? t !== r
												: "^=" === n
													? r && 0 === t.indexOf(r)
													: "*=" === n
														? r && -1 < t.indexOf(r)
														: "$=" === n
															? r && t.slice(-r.length) === r
															: "~=" === n
																? -1 <
																	(
																		" " +
																		t.replace(q, " ") +
																		" "
																	).indexOf(r)
																: "|=" === n &&
																	(t === r ||
																		t.slice(0, r.length + 1) ===
																			r + "-"));
						};
					},
					CHILD: function (d, t, e, g, m) {
						var v = "nth" !== d.slice(0, 3),
							y = "last" !== d.slice(-4),
							b = "of-type" === t;
						return 1 === g && 0 === m
							? function (t) {
									return !!t.parentNode;
								}
							: function (t, e, n) {
									var r,
										i,
										o,
										s,
										a,
										u,
										c = v != y ? "nextSibling" : "previousSibling",
										l = t.parentNode,
										h = b && t.nodeName.toLowerCase(),
										f = !n && !b,
										p = !1;
									if (l) {
										if (v) {
											for (; c; ) {
												for (s = t; (s = s[c]); )
													if (
														b
															? s.nodeName.toLowerCase() === h
															: 1 === s.nodeType
													)
														return !1;
												u = c = "only" === d && !u && "nextSibling";
											}
											return !0;
										}
										if (((u = [y ? l.firstChild : l.lastChild]), y && f)) {
											for (
												p =
													(a =
														(r =
															(i =
																(o = (s = l)[S] || (s[S] = {}))[
																	s.uniqueID
																] || (o[s.uniqueID] = {}))[d] ||
															[])[0] === O && r[1]) && r[2],
													s = a && l.childNodes[a];
												(s = (++a && s && s[c]) || (p = a = 0) || u.pop());

											)
												if (1 === s.nodeType && ++p && s === t) {
													i[d] = [O, a, p];
													break;
												}
										} else if (
											(f &&
												(p = a =
													(r =
														(i =
															(o = (s = t)[S] || (s[S] = {}))[
																s.uniqueID
															] || (o[s.uniqueID] = {}))[d] ||
														[])[0] === O && r[1]),
											!1 === p)
										)
											for (
												;
												(s =
													(++a && s && s[c]) || (p = a = 0) || u.pop()) &&
												((b
													? s.nodeName.toLowerCase() !== h
													: 1 !== s.nodeType) ||
													!++p ||
													(f &&
														((i =
															(o = s[S] || (s[S] = {}))[s.uniqueID] ||
															(o[s.uniqueID] = {}))[d] = [O, p]),
													s !== t));

											);
										return (p -= m) === g || (p % g == 0 && 0 <= p / g);
									}
								};
					},
					PSEUDO: function (t, o) {
						var e,
							s =
								w.pseudos[t] ||
								w.setFilters[t.toLowerCase()] ||
								rt.error("unsupported pseudo: " + t);
						return s[S]
							? s(o)
							: 1 < s.length
								? ((e = [t, t, "", o]),
									w.setFilters.hasOwnProperty(t.toLowerCase())
										? ot(function (t, e) {
												for (var n, r = s(t, o), i = r.length; i--; )
													t[(n = M(t, r[i]))] = !(e[n] = r[i]);
											})
										: function (t) {
												return s(t, 0, e);
											})
								: s;
					}
				},
				pseudos: {
					not: ot(function (t) {
						var r = [],
							i = [],
							a = f(t.replace(z, "$1"));
						return a[S]
							? ot(function (t, e, n, r) {
									for (var i, o = a(t, null, r, []), s = t.length; s--; )
										(i = o[s]) && (t[s] = !(e[s] = i));
								})
							: function (t, e, n) {
									return (r[0] = t), a(r, null, n, i), (r[0] = null), !i.pop();
								};
					}),
					has: ot(function (e) {
						return function (t) {
							return 0 < rt(e, t).length;
						};
					}),
					contains: ot(function (e) {
						return (
							(e = e.replace(nt, h)),
							function (t) {
								return -1 < (t.textContent || t.innerText || o(t)).indexOf(e);
							}
						);
					}),
					lang: ot(function (n) {
						return (
							X.test(n || "") || rt.error("unsupported lang: " + n),
							(n = n.replace(nt, h).toLowerCase()),
							function (t) {
								var e;
								do {
									if (
										(e = k
											? t.lang
											: t.getAttribute("xml:lang") || t.getAttribute("lang"))
									)
										return (
											(e = e.toLowerCase()) === n || 0 === e.indexOf(n + "-")
										);
								} while ((t = t.parentNode) && 1 === t.nodeType);
								return !1;
							}
						);
					}),
					target: function (t) {
						var e = n.location && n.location.hash;
						return e && e.slice(1) === t.id;
					},
					root: function (t) {
						return t === i;
					},
					focus: function (t) {
						return (
							t === C.activeElement &&
							(!C.hasFocus || C.hasFocus()) &&
							!!(t.type || t.href || ~t.tabIndex)
						);
					},
					enabled: function (t) {
						return !1 === t.disabled;
					},
					disabled: function (t) {
						return !0 === t.disabled;
					},
					checked: function (t) {
						var e = t.nodeName.toLowerCase();
						return ("input" === e && !!t.checked) || ("option" === e && !!t.selected);
					},
					selected: function (t) {
						return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
					},
					empty: function (t) {
						for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
						return !0;
					},
					parent: function (t) {
						return !w.pseudos.empty(t);
					},
					header: function (t) {
						return Q.test(t.nodeName);
					},
					input: function (t) {
						return K.test(t.nodeName);
					},
					button: function (t) {
						var e = t.nodeName.toLowerCase();
						return ("input" === e && "button" === t.type) || "button" === e;
					},
					text: function (t) {
						return (
							"input" === t.nodeName.toLowerCase() &&
							"text" === t.type &&
							(null == (t = t.getAttribute("type")) || "text" === t.toLowerCase())
						);
					},
					first: ct(function () {
						return [0];
					}),
					last: ct(function (t, e) {
						return [e - 1];
					}),
					eq: ct(function (t, e, n) {
						return [n < 0 ? n + e : n];
					}),
					even: ct(function (t, e) {
						for (var n = 0; n < e; n += 2) t.push(n);
						return t;
					}),
					odd: ct(function (t, e) {
						for (var n = 1; n < e; n += 2) t.push(n);
						return t;
					}),
					lt: ct(function (t, e, n) {
						for (var r = n < 0 ? n + e : n; 0 <= --r; ) t.push(r);
						return t;
					}),
					gt: ct(function (t, e, n) {
						for (var r = n < 0 ? n + e : n; ++r < e; ) t.push(r);
						return t;
					})
				}
			}).pseudos.nth = w.pseudos.eq),
		{
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		}))
			w.pseudos[t] = (function (e) {
				return function (t) {
					return "input" === t.nodeName.toLowerCase() && t.type === e;
				};
			})(t);
		for (t in {
			submit: !0,
			reset: !0
		})
			w.pseudos[t] = (function (n) {
				return function (t) {
					var e = t.nodeName.toLowerCase();
					return ("input" === e || "button" === e) && t.type === n;
				};
			})(t);
		function ht() {}
		function ft(t) {
			for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
			return r;
		}
		function pt(s, t, e) {
			var a = t.dir,
				u = e && "parentNode" === a,
				c = l++;
			return t.first
				? function (t, e, n) {
						for (; (t = t[a]); ) if (1 === t.nodeType || u) return s(t, e, n);
					}
				: function (t, e, n) {
						var r,
							i,
							o = [O, c];
						if (n) {
							for (; (t = t[a]); )
								if ((1 === t.nodeType || u) && s(t, e, n)) return !0;
						} else
							for (; (t = t[a]); )
								if (1 === t.nodeType || u) {
									if (
										(i = (r =
											(i = t[S] || (t[S] = {}))[t.uniqueID] ||
											(i[t.uniqueID] = {}))[a]) &&
										i[0] === O &&
										i[1] === c
									)
										return (o[2] = i[2]);
									if (((r[a] = o)[2] = s(t, e, n))) return !0;
								}
					};
		}
		function dt(i) {
			return 1 < i.length
				? function (t, e, n) {
						for (var r = i.length; r--; ) if (!i[r](t, e, n)) return !1;
						return !0;
					}
				: i[0];
		}
		function gt(t, e, n, r, i) {
			for (var o, s = [], a = 0, u = t.length, c = null != e; a < u; a++)
				(o = t[a]) && ((n && !n(o, r, i)) || (s.push(o), c && e.push(a)));
			return s;
		}
		function mt(p, d, g, m, v, t) {
			return (
				m && !m[S] && (m = mt(m)),
				v && !v[S] && (v = mt(v, t)),
				ot(function (t, e, n, r) {
					var i,
						o,
						s,
						a = [],
						u = [],
						c = e.length,
						l =
							t ||
							(function (t, e, n) {
								for (var r = 0, i = e.length; r < i; r++) rt(t, e[r], n);
								return n;
							})(d || "*", n.nodeType ? [n] : n, []),
						h = !p || (!t && d) ? l : gt(l, a, p, n, r),
						f = g ? (v || (t ? p : c || m) ? [] : e) : h;
					if ((g && g(h, f, n, r), m))
						for (i = gt(f, u), m(i, [], n, r), o = i.length; o--; )
							(s = i[o]) && (f[u[o]] = !(h[u[o]] = s));
					if (t) {
						if (v || p) {
							if (v) {
								for (i = [], o = f.length; o--; ) (s = f[o]) && i.push((h[o] = s));
								v(null, (f = []), i, r);
							}
							for (o = f.length; o--; )
								(s = f[o]) && -1 < (i = v ? M(t, s) : a[o]) && (t[i] = !(e[i] = s));
						}
					} else
						(f = gt(f === e ? f.splice(c, f.length) : f)),
							v ? v(null, e, f, r) : D.apply(e, f);
				})
			);
		}
		function vt(m, v) {
			function t(t, e, n, r, i) {
				var o,
					s,
					a,
					u = 0,
					c = "0",
					l = t && [],
					h = [],
					f = _,
					p = t || (b && w.find.TAG("*", i)),
					d = (O += null == f ? 1 : Math.random() || 0.1),
					g = p.length;
				for (i && (_ = e === C || e || i); c !== g && null != (o = p[c]); c++) {
					if (b && o) {
						for (s = 0, e || o.ownerDocument === C || (x(o), (n = !k)); (a = m[s++]); )
							if (a(o, e || C, n)) {
								r.push(o);
								break;
							}
						i && (O = d);
					}
					y && ((o = !a && o) && u--, t && l.push(o));
				}
				if (((u += c), y && c !== u)) {
					for (s = 0; (a = v[s++]); ) a(l, h, e, n);
					if (t) {
						if (0 < u) for (; c--; ) l[c] || h[c] || (h[c] = P.call(r));
						h = gt(h);
					}
					D.apply(r, h), i && !t && 0 < h.length && 1 < u + v.length && rt.uniqueSort(r);
				}
				return i && ((O = d), (_ = f)), l;
			}
			var y = 0 < v.length,
				b = 0 < m.length;
			return y ? ot(t) : t;
		}
		return (
			(ht.prototype = w.filters = w.pseudos),
			(w.setFilters = new ht()),
			(g = rt.tokenize =
				function (t, e) {
					var n,
						r,
						i,
						o,
						s,
						a,
						u,
						c = E[t + " "];
					if (c) return e ? 0 : c.slice(0);
					for (s = t, a = [], u = w.preFilter; s; ) {
						for (o in ((n && !(r = U.exec(s))) ||
							(r && (s = s.slice(r[0].length) || s), a.push((i = []))),
						(n = !1),
						(r = G.exec(s)) &&
							((n = r.shift()),
							i.push({
								value: n,
								type: r[0].replace(z, " ")
							}),
							(s = s.slice(n.length))),
						w.filter))
							!(r = Y[o].exec(s)) ||
								(u[o] && !(r = u[o](r))) ||
								((n = r.shift()),
								i.push({
									value: n,
									type: o,
									matches: r
								}),
								(s = s.slice(n.length)));
						if (!n) break;
					}
					return e ? s.length : s ? rt.error(t) : E(t, a).slice(0);
				}),
			(f = rt.compile =
				function (t, e) {
					var n,
						r = [],
						i = [],
						o = T[t + " "];
					if (!o) {
						for (n = (e = e || g(t)).length; n--; )
							((o = (function t(e) {
								for (
									var r,
										n,
										i,
										o = e.length,
										s = w.relative[e[0].type],
										a = s || w.relative[" "],
										u = s ? 1 : 0,
										c = pt(
											function (t) {
												return t === r;
											},
											a,
											!0
										),
										l = pt(
											function (t) {
												return -1 < M(r, t);
											},
											a,
											!0
										),
										h = [
											function (t, e, n) {
												return (
													(n =
														(!s && (n || e !== _)) ||
														((r = e).nodeType ? c : l)(t, e, n)),
													(r = null),
													n
												);
											}
										];
									u < o;
									u++
								)
									if ((n = w.relative[e[u].type])) h = [pt(dt(h), n)];
									else {
										if (
											(n = w.filter[e[u].type].apply(null, e[u].matches))[S]
										) {
											for (i = ++u; i < o && !w.relative[e[i].type]; i++);
											return mt(
												1 < u && dt(h),
												1 < u &&
													ft(
														e.slice(0, u - 1).concat({
															value: " " === e[u - 2].type ? "*" : ""
														})
													).replace(z, "$1"),
												n,
												u < i && t(e.slice(u, i)),
												i < o && t((e = e.slice(i))),
												i < o && ft(e)
											);
										}
										h.push(n);
									}
								return dt(h);
							})(e[n]))[S]
								? r
								: i
							).push(o);
						(o = T(t, vt(i, r))).selector = t;
					}
					return o;
				}),
			(m = rt.select =
				function (t, e, n, r) {
					var i,
						o,
						s,
						a,
						u,
						c = "function" == typeof t && t,
						l = !r && g((t = c.selector || t));
					if (((n = n || []), 1 === l.length)) {
						if (
							2 < (o = l[0] = l[0].slice(0)).length &&
							"ID" === (s = o[0]).type &&
							d.getById &&
							9 === e.nodeType &&
							k &&
							w.relative[o[1].type]
						) {
							if (!(e = (w.find.ID(s.matches[0].replace(nt, h), e) || [])[0]))
								return n;
							c && (e = e.parentNode), (t = t.slice(o.shift().value.length));
						}
						for (
							i = Y.needsContext.test(t) ? 0 : o.length;
							i-- && ((s = o[i]), !w.relative[(a = s.type)]);

						)
							if (
								(u = w.find[a]) &&
								(r = u(
									s.matches[0].replace(nt, h),
									(tt.test(o[0].type) && lt(e.parentNode)) || e
								))
							) {
								if ((o.splice(i, 1), !(t = r.length && ft(o))))
									return D.apply(n, r), n;
								break;
							}
					}
					return (
						(c || f(t, l))(r, e, !k, n, !e || (tt.test(t) && lt(e.parentNode)) || e), n
					);
				}),
			(d.sortStable = S.split("").sort(A).join("") === S),
			(d.detectDuplicates = !!c),
			x(),
			(d.sortDetached = st(function (t) {
				return 1 & t.compareDocumentPosition(C.createElement("div"));
			})),
			st(function (t) {
				return (
					(t.innerHTML = "<a href='#'></a>"), "#" === t.firstChild.getAttribute("href")
				);
			}) ||
				at("type|href|height|width", function (t, e, n) {
					return n ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
				}),
			(d.attributes &&
				st(function (t) {
					return (
						(t.innerHTML = "<input/>"),
						t.firstChild.setAttribute("value", ""),
						"" === t.firstChild.getAttribute("value")
					);
				})) ||
				at("value", function (t, e, n) {
					return n || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue;
				}),
			st(function (t) {
				return null == t.getAttribute("disabled");
			}) ||
				at(W, function (t, e, n) {
					return n
						? void 0
						: !0 === t[e]
							? e.toLowerCase()
							: (e = t.getAttributeNode(e)) && e.specified
								? e.value
								: null;
				}),
			rt
		);
	})(thiGlobalWin);
	(k.find = p),
		(k.expr = p.selectors),
		(k.expr[":"] = k.expr.pseudos),
		(k.uniqueSort = k.unique = p.uniqueSort),
		(k.text = p.getText),
		(k.isXMLDoc = p.isXML),
		(k.contains = p.contains);
	function v(t, e, n) {
		for (var r = [], i = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
			if (1 === t.nodeType) {
				if (i && k(t).is(n)) break;
				r.push(t);
			}
		return r;
	}
	function y(t, e) {
		for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
		return n;
	}
	var b = k.expr.match.needsContext,
		w = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
		_ = /^.[^:#\[\.,]*$/;
	function S(t, n, r) {
		if (k.isFunction(n))
			return k.grep(t, function (t, e) {
				return !!n.call(t, e, t) !== r;
			});
		if (n.nodeType)
			return k.grep(t, function (t) {
				return (t === n) !== r;
			});
		if ("string" == typeof n) {
			if (_.test(n)) return k.filter(n, t, r);
			n = k.filter(n, t);
		}
		return k.grep(t, function (t) {
			return -1 < i.call(n, t) !== r;
		});
	}
	(k.filter = function (t, e, n) {
		var r = e[0];
		return (
			n && (t = ":not(" + t + ")"),
			1 === e.length && 1 === r.nodeType
				? k.find.matchesSelector(r, t)
					? [r]
					: []
				: k.find.matches(
						t,
						k.grep(e, function (t) {
							return 1 === t.nodeType;
						})
					)
		);
	}),
		k.fn.extend({
			find: function (t) {
				var e,
					n = this.length,
					r = [],
					i = this;
				if ("string" != typeof t)
					return this.pushStack(
						k(t).filter(function () {
							for (e = 0; e < n; e++) if (k.contains(i[e], this)) return !0;
						})
					);
				for (e = 0; e < n; e++) k.find(t, i[e], r);
				return (
					((r = this.pushStack(1 < n ? k.unique(r) : r)).selector = this.selector
						? this.selector + " " + t
						: t),
					r
				);
			},
			filter: function (t) {
				return this.pushStack(S(this, t || [], !1));
			},
			not: function (t) {
				return this.pushStack(S(this, t || [], !0));
			},
			is: function (t) {
				return !!S(this, "string" == typeof t && b.test(t) ? k(t) : t || [], !1).length;
			}
		});
	var O,
		E = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
	((k.fn.init = function (t, e, n) {
		if (!t) return this;
		if (((n = n || O), "string" != typeof t))
			return t.nodeType
				? ((this.context = this[0] = t), (this.length = 1), this)
				: k.isFunction(t)
					? void 0 !== n.ready
						? n.ready(t)
						: t(k)
					: (void 0 !== t.selector &&
							((this.selector = t.selector), (this.context = t.context)),
						k.makeArray(t, this));
		if (
			!(r =
				"<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length
					? [null, t, null]
					: E.exec(t)) ||
			(!r[1] && e)
		)
			return (!e || e.jquery ? e || n : this.constructor(e)).find(t);
		if (r[1]) {
			if (
				((e = e instanceof k ? e[0] : e),
				k.merge(this, k.parseHTML(r[1], e && e.nodeType ? e.ownerDocument || e : C, !0)),
				w.test(r[1]) && k.isPlainObject(e))
			)
				for (var r in e) k.isFunction(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
			return this;
		}
		return (
			(n = C.getElementById(r[2])) && n.parentNode && ((this.length = 1), (this[0] = n)),
			(this.context = C),
			(this.selector = t),
			this
		);
	}).prototype = k.fn),
		(O = k(C));
	var T = /^(?:parents|prev(?:Until|All))/,
		A = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	function I(t, e) {
		for (; (t = t[e]) && 1 !== t.nodeType; );
		return t;
	}
	k.fn.extend({
		has: function (t) {
			var e = k(t, this),
				n = e.length;
			return this.filter(function () {
				for (var t = 0; t < n; t++) if (k.contains(this, e[t])) return !0;
			});
		},
		closest: function (t, e) {
			for (
				var n,
					r = 0,
					i = this.length,
					o = [],
					s = b.test(t) || "string" != typeof t ? k(t, e || this.context) : 0;
				r < i;
				r++
			)
				for (n = this[r]; n && n !== e; n = n.parentNode)
					if (
						n.nodeType < 11 &&
						(s ? -1 < s.index(n) : 1 === n.nodeType && k.find.matchesSelector(n, t))
					) {
						o.push(n);
						break;
					}
			return this.pushStack(1 < o.length ? k.uniqueSort(o) : o);
		},
		index: function (t) {
			return t
				? "string" == typeof t
					? i.call(k(t), this[0])
					: i.call(this, t.jquery ? t[0] : t)
				: this[0] && this[0].parentNode
					? this.first().prevAll().length
					: -1;
		},
		add: function (t, e) {
			return this.pushStack(k.uniqueSort(k.merge(this.get(), k(t, e))));
		},
		addBack: function (t) {
			return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
		}
	}),
		k.each(
			{
				parent: function (t) {
					t = t.parentNode;
					return t && 11 !== t.nodeType ? t : null;
				},
				parents: function (t) {
					return v(t, "parentNode");
				},
				parentsUntil: function (t, e, n) {
					return v(t, "parentNode", n);
				},
				next: function (t) {
					return I(t, "nextSibling");
				},
				prev: function (t) {
					return I(t, "previousSibling");
				},
				nextAll: function (t) {
					return v(t, "nextSibling");
				},
				prevAll: function (t) {
					return v(t, "previousSibling");
				},
				nextUntil: function (t, e, n) {
					return v(t, "nextSibling", n);
				},
				prevUntil: function (t, e, n) {
					return v(t, "previousSibling", n);
				},
				siblings: function (t) {
					return y((t.parentNode || {}).firstChild, t);
				},
				children: function (t) {
					return y(t.firstChild);
				},
				contents: function (t) {
					return t.contentDocument || k.merge([], t.childNodes);
				}
			},
			function (r, i) {
				k.fn[r] = function (t, e) {
					var n = k.map(this, i, t);
					return (
						"Until" !== r.slice(-5) && (e = t),
						e && "string" == typeof e && (n = k.filter(e, n)),
						1 < this.length && (A[r] || k.uniqueSort(n), T.test(r) && n.reverse()),
						this.pushStack(n)
					);
				};
			}
		);
	var j,
		P = /\S+/g;
	function N() {
		C.removeEventListener("DOMContentLoaded", N),
			thiGlobalWin.removeEventListener("load", N),
			k.ready();
	}
	(k.Callbacks = function (r) {
		var t, n;
		r =
			"string" == typeof r
				? ((t = r),
					(n = {}),
					k.each(t.match(P) || [], function (t, e) {
						n[e] = !0;
					}),
					n)
				: k.extend({}, r);
		function i() {
			for (a = r.once, s = o = !0; c.length; l = -1)
				for (e = c.shift(); ++l < u.length; )
					!1 === u[l].apply(e[0], e[1]) && r.stopOnFalse && ((l = u.length), (e = !1));
			r.memory || (e = !1), (o = !1), a && (u = e ? [] : "");
		}
		var o,
			e,
			s,
			a,
			u = [],
			c = [],
			l = -1,
			h = {
				add: function () {
					return (
						u &&
							(e && !o && ((l = u.length - 1), c.push(e)),
							(function n(t) {
								k.each(t, function (t, e) {
									k.isFunction(e)
										? (r.unique && h.has(e)) || u.push(e)
										: e && e.length && "string" !== k.type(e) && n(e);
								});
							})(arguments),
							e && !o && i()),
						this
					);
				},
				remove: function () {
					return (
						k.each(arguments, function (t, e) {
							for (var n; -1 < (n = k.inArray(e, u, n)); )
								u.splice(n, 1), n <= l && l--;
						}),
						this
					);
				},
				has: function (t) {
					return t ? -1 < k.inArray(t, u) : 0 < u.length;
				},
				empty: function () {
					return (u = u && []), this;
				},
				disable: function () {
					return (a = c = []), (u = e = ""), this;
				},
				disabled: function () {
					return !u;
				},
				lock: function () {
					return (a = c = []), e || (u = e = ""), this;
				},
				locked: function () {
					return !!a;
				},
				fireWith: function (t, e) {
					return (
						a || ((e = [t, (e = e || []).slice ? e.slice() : e]), c.push(e), o || i()),
						this
					);
				},
				fire: function () {
					return h.fireWith(this, arguments), this;
				},
				fired: function () {
					return !!s;
				}
			};
		return h;
	}),
		k.extend({
			Deferred: function (t) {
				var o = [
						["resolve", "done", k.Callbacks("once memory"), "resolved"],
						["reject", "fail", k.Callbacks("once memory"), "rejected"],
						["notify", "progress", k.Callbacks("memory")]
					],
					i = "pending",
					s = {
						state: function () {
							return i;
						},
						always: function () {
							return a.done(arguments).fail(arguments), this;
						},
						then: function () {
							var i = arguments;
							return k
								.Deferred(function (r) {
									k.each(o, function (t, e) {
										var n = k.isFunction(i[t]) && i[t];
										a[e[1]](function () {
											var t = n && n.apply(this, arguments);
											t && k.isFunction(t.promise)
												? t
														.promise()
														.progress(r.notify)
														.done(r.resolve)
														.fail(r.reject)
												: r[e[0] + "With"](
														this === s ? r.promise() : this,
														n ? [t] : arguments
													);
										});
									}),
										(i = null);
								})
								.promise();
						},
						promise: function (t) {
							return null != t ? k.extend(t, s) : s;
						}
					},
					a = {};
				return (
					(s.pipe = s.then),
					k.each(o, function (t, e) {
						var n = e[2],
							r = e[3];
						(s[e[1]] = n.add),
							r &&
								n.add(
									function () {
										i = r;
									},
									o[1 ^ t][2].disable,
									o[2][2].lock
								),
							(a[e[0]] = function () {
								return a[e[0] + "With"](this === a ? s : this, arguments), this;
							}),
							(a[e[0] + "With"] = n.fireWith);
					}),
					s.promise(a),
					t && t.call(a, a),
					a
				);
			},
			when: function (t) {
				function e(e, n, r) {
					return function (t) {
						(n[e] = this),
							(r[e] = 1 < arguments.length ? l.call(arguments) : t),
							r === i ? c.notifyWith(n, r) : --u || c.resolveWith(n, r);
					};
				}
				var i,
					n,
					r,
					o = 0,
					s = l.call(arguments),
					a = s.length,
					u = 1 !== a || (t && k.isFunction(t.promise)) ? a : 0,
					c = 1 === u ? t : k.Deferred();
				if (1 < a)
					for (i = new Array(a), n = new Array(a), r = new Array(a); o < a; o++)
						s[o] && k.isFunction(s[o].promise)
							? s[o]
									.promise()
									.progress(e(o, n, i))
									.done(e(o, r, s))
									.fail(c.reject)
							: --u;
				return u || c.resolveWith(r, s), c.promise();
			}
		}),
		(k.fn.ready = function (t) {
			return k.ready.promise().done(t), this;
		}),
		k.extend({
			isReady: !1,
			readyWait: 1,
			holdReady: function (t) {
				t ? k.readyWait++ : k.ready(!0);
			},
			ready: function (t) {
				(!0 === t ? --k.readyWait : k.isReady) ||
					((k.isReady = !0) !== t && 0 < --k.readyWait) ||
					(j.resolveWith(C, [k]),
					k.fn.triggerHandler && (k(C).triggerHandler("ready"), k(C).off("ready")));
			}
		}),
		(k.ready.promise = function (t) {
			return (
				j ||
					((j = k.Deferred()),
					"complete" === C.readyState ||
					("loading" !== C.readyState && !C.documentElement.doScroll)
						? thiGlobalWin.setTimeout(k.ready)
						: (C.addEventListener("DOMContentLoaded", N),
							thiGlobalWin.addEventListener("load", N))),
				j.promise(t)
			);
		}),
		k.ready.promise();
	function D(t) {
		return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
	}
	var R = function (t, e, n, r, i, o, s) {
		var a = 0,
			u = t.length,
			c = null == n;
		if ("object" === k.type(n)) for (a in ((i = !0), n)) R(t, e, a, n[a], !0, o, s);
		else if (
			void 0 !== r &&
			((i = !0),
			k.isFunction(r) || (s = !0),
			c &&
				(e = s
					? (e.call(t, r), null)
					: ((c = e),
						function (t, e, n) {
							return c.call(k(t), n);
						})),
			e)
		)
			for (; a < u; a++) e(t[a], n, s ? r : r.call(t[a], a, e(t[a], n)));
		return i ? t : c ? e.call(t) : u ? e(t[0], n) : o;
	};
	function M() {
		this.expando = k.expando + M.uid++;
	}
	(M.uid = 1),
		(M.prototype = {
			register: function (t, e) {
				e = e || {};
				return (
					t.nodeType
						? (t[this.expando] = e)
						: Object.defineProperty(t, this.expando, {
								value: e,
								writable: !0,
								configurable: !0
							}),
					t[this.expando]
				);
			},
			cache: function (t) {
				if (!D(t)) return {};
				var e = t[this.expando];
				return (
					e ||
						((e = {}),
						D(t) &&
							(t.nodeType
								? (t[this.expando] = e)
								: Object.defineProperty(t, this.expando, {
										value: e,
										configurable: !0
									}))),
					e
				);
			},
			set: function (t, e, n) {
				var r,
					i = this.cache(t);
				if ("string" == typeof e) i[e] = n;
				else for (r in e) i[r] = e[r];
				return i;
			},
			get: function (t, e) {
				return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][e];
			},
			access: function (t, e, n) {
				var r;
				return void 0 === e || (e && "string" == typeof e && void 0 === n)
					? void 0 !== (r = this.get(t, e))
						? r
						: this.get(t, k.camelCase(e))
					: (this.set(t, e, n), void 0 !== n ? n : e);
			},
			remove: function (t, e) {
				var n,
					r,
					i,
					o = t[this.expando];
				if (void 0 !== o) {
					if (void 0 === e) this.register(t);
					else {
						n = (r = k.isArray(e)
							? e.concat(e.map(k.camelCase))
							: ((i = k.camelCase(e)),
								e in o ? [e, i] : (r = i) in o ? [r] : r.match(P) || [])).length;
						for (; n--; ) delete o[r[n]];
					}
					(void 0 !== e && !k.isEmptyObject(o)) ||
						(t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
				}
			},
			hasData: function (t) {
				t = t[this.expando];
				return void 0 !== t && !k.isEmptyObject(t);
			}
		});
	var W = new M(),
		L = new M(),
		F = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		H = /[A-Z]/g;
	function B(t, e, n) {
		var r;
		if (void 0 === n && 1 === t.nodeType)
			if (
				((r = "data-" + e.replace(H, "-$&").toLowerCase()),
				"string" == typeof (n = t.getAttribute(r)))
			) {
				try {
					n =
						"true" === n ||
						("false" !== n &&
							("null" === n
								? null
								: +n + "" === n
									? +n
									: F.test(n)
										? k.parseJSON(n)
										: n));
				} catch (t) {}
				L.set(t, e, n);
			} else n = void 0;
		return n;
	}
	k.extend({
		hasData: function (t) {
			return L.hasData(t) || W.hasData(t);
		},
		data: function (t, e, n) {
			return L.access(t, e, n);
		},
		removeData: function (t, e) {
			L.remove(t, e);
		},
		_data: function (t, e, n) {
			return W.access(t, e, n);
		},
		_removeData: function (t, e) {
			W.remove(t, e);
		}
	}),
		k.fn.extend({
			data: function (r, t) {
				var e,
					n,
					i,
					o = this[0],
					s = o && o.attributes;
				if (void 0 !== r)
					return "object" == typeof r
						? this.each(function () {
								L.set(this, r);
							})
						: R(
								this,
								function (e) {
									var t, n;
									return o && void 0 === e
										? void 0 !==
											(t =
												L.get(o, r) ||
												L.get(o, r.replace(H, "-$&").toLowerCase()))
											? t
											: ((n = k.camelCase(r)),
												void 0 !== (t = L.get(o, n))
													? t
													: void 0 !== (t = B(o, n, void 0))
														? t
														: void 0)
										: ((n = k.camelCase(r)),
											void this.each(function () {
												var t = L.get(this, n);
												L.set(this, n, e),
													-1 < r.indexOf("-") &&
														void 0 !== t &&
														L.set(this, r, e);
											}));
								},
								null,
								t,
								1 < arguments.length,
								null,
								!0
							);
				if (
					this.length &&
					((i = L.get(o)), 1 === o.nodeType && !W.get(o, "hasDataAttrs"))
				) {
					for (e = s.length; e--; )
						s[e] &&
							0 === (n = s[e].name).indexOf("data-") &&
							((n = k.camelCase(n.slice(5))), B(o, n, i[n]));
					W.set(o, "hasDataAttrs", !0);
				}
				return i;
			},
			removeData: function (t) {
				return this.each(function () {
					L.remove(this, t);
				});
			}
		}),
		k.extend({
			queue: function (t, e, n) {
				var r;
				return t
					? ((e = (e || "fx") + "queue"),
						(r = W.get(t, e)),
						n &&
							(!r || k.isArray(n) ? (r = W.access(t, e, k.makeArray(n))) : r.push(n)),
						r || [])
					: void 0;
			},
			dequeue: function (t, e) {
				e = e || "fx";
				var n = k.queue(t, e),
					r = n.length,
					i = n.shift(),
					o = k._queueHooks(t, e);
				"inprogress" === i && ((i = n.shift()), r--),
					i &&
						("fx" === e && n.unshift("inprogress"),
						delete o.stop,
						i.call(
							t,
							function () {
								k.dequeue(t, e);
							},
							o
						)),
					!r && o && o.empty.fire();
			},
			_queueHooks: function (t, e) {
				var n = e + "queueHooks";
				return (
					W.get(t, n) ||
					W.access(t, n, {
						empty: k.Callbacks("once memory").add(function () {
							W.remove(t, [e + "queue", n]);
						})
					})
				);
			}
		}),
		k.fn.extend({
			queue: function (e, n) {
				var t = 2;
				return (
					"string" != typeof e && ((n = e), (e = "fx"), t--),
					arguments.length < t
						? k.queue(this[0], e)
						: void 0 === n
							? this
							: this.each(function () {
									var t = k.queue(this, e, n);
									k._queueHooks(this, e),
										"fx" === e && "inprogress" !== t[0] && k.dequeue(this, e);
								})
				);
			},
			dequeue: function (t) {
				return this.each(function () {
					k.dequeue(this, t);
				});
			},
			clearQueue: function (t) {
				return this.queue(t || "fx", []);
			},
			promise: function (t, e) {
				function n() {
					--i || o.resolveWith(s, [s]);
				}
				var r,
					i = 1,
					o = k.Deferred(),
					s = this,
					a = this.length;
				for ("string" != typeof t && ((e = t), (t = void 0)), t = t || "fx"; a--; )
					(r = W.get(s[a], t + "queueHooks")) && r.empty && (i++, r.empty.add(n));
				return n(), o.promise(e);
			}
		});
	function q(t, e) {
		return (t = e || t), "none" === k.css(t, "display") || !k.contains(t.ownerDocument, t);
	}
	var s = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
		z = new RegExp("^(?:([+-])=|)(" + s + ")([a-z%]*)$", "i"),
		U = ["Top", "Right", "Bottom", "Left"];
	function G(t, e, n, r) {
		var i,
			o = 1,
			s = 20,
			a = r
				? function () {
						return r.cur();
					}
				: function () {
						return k.css(t, e, "");
					},
			u = a(),
			c = (n && n[3]) || (k.cssNumber[e] ? "" : "px"),
			l = (k.cssNumber[e] || ("px" !== c && +u)) && z.exec(k.css(t, e));
		if (l && l[3] !== c)
			for (
				c = c || l[3], n = n || [], l = +u || 1;
				(o = o || ".5"),
					(l /= o),
					k.style(t, e, l + c),
					o !== (o = a() / u) && 1 !== o && --s;

			);
		return (
			n &&
				((l = +l || +u || 0),
				(i = n[1] ? l + (n[1] + 1) * n[2] : +n[2]),
				r && ((r.unit = c), (r.start = l), (r.end = i))),
			i
		);
	}
	var V = /^(?:checkbox|radio)$/i,
		$ = /<([\w:-]+)/,
		X = /^$|\/(?:java|ecma)script/i,
		Y = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			thead: [1, "<table>", "</table>"],
			col: [2, "<table><colgroup>", "</colgroup></table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: [0, "", ""]
		};
	function K(t, e) {
		var n =
			void 0 !== t.getElementsByTagName
				? t.getElementsByTagName(e || "*")
				: void 0 !== t.querySelectorAll
					? t.querySelectorAll(e || "*")
					: [];
		return void 0 === e || (e && k.nodeName(t, e)) ? k.merge([t], n) : n;
	}
	function Q(t, e) {
		for (var n = 0, r = t.length; n < r; n++)
			W.set(t[n], "globalEval", !e || W.get(e[n], "globalEval"));
	}
	(Y.optgroup = Y.option), (Y.tbody = Y.tfoot = Y.colgroup = Y.caption = Y.thead), (Y.th = Y.td);
	var J = /<|&#?\w+;/;
	function Z(t, e, n, r, i) {
		for (
			var o, s, a, u, c, l = e.createDocumentFragment(), h = [], f = 0, p = t.length;
			f < p;
			f++
		)
			if ((o = t[f]) || 0 === o)
				if ("object" === k.type(o)) k.merge(h, o.nodeType ? [o] : o);
				else if (J.test(o)) {
					for (
						s = s || l.appendChild(e.createElement("div")),
							a = ($.exec(o) || ["", ""])[1].toLowerCase(),
							a = Y[a] || Y._default,
							s.innerHTML = a[1] + k.htmlPrefilter(o) + a[2],
							c = a[0];
						c--;

					)
						s = s.lastChild;
					k.merge(h, s.childNodes), ((s = l.firstChild).textContent = "");
				} else h.push(e.createTextNode(o));
		for (l.textContent = "", f = 0; (o = h[f++]); )
			if (r && -1 < k.inArray(o, r)) i && i.push(o);
			else if (
				((u = k.contains(o.ownerDocument, o)),
				(s = K(l.appendChild(o), "script")),
				u && Q(s),
				n)
			)
				for (c = 0; (o = s[c++]); ) X.test(o.type || "") && n.push(o);
		return l;
	}
	(n = C.createDocumentFragment().appendChild(C.createElement("div"))),
		(p = C.createElement("input")).setAttribute("type", "radio"),
		p.setAttribute("checked", "checked"),
		p.setAttribute("name", "t"),
		n.appendChild(p),
		(m.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked),
		(n.innerHTML = "<textarea>x</textarea>"),
		(m.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue);
	var tt = /^key/,
		et = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		nt = /^([^.]*)(?:\.(.+)|)/;
	function rt() {
		return !0;
	}
	function it() {
		return !1;
	}
	function ot() {
		try {
			return C.activeElement;
		} catch (t) {}
	}
	function st(t, e, n, r, i, o) {
		var s, a;
		if ("object" == typeof e) {
			for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), e))
				st(t, a, n, r, e[a], o);
			return t;
		}
		if (
			(null == r && null == i
				? ((i = n), (r = n = void 0))
				: null == i &&
					("string" == typeof n
						? ((i = r), (r = void 0))
						: ((i = r), (r = n), (n = void 0))),
			!1 === i)
		)
			i = it;
		else if (!i) return t;
		return (
			1 === o &&
				((s = i),
				((i = function (t) {
					return k().off(t), s.apply(this, arguments);
				}).guid = s.guid || (s.guid = k.guid++))),
			t.each(function () {
				k.event.add(this, e, i, r, n);
			})
		);
	}
	(k.event = {
		global: {},
		add: function (e, t, n, r, i) {
			var o,
				s,
				a,
				u,
				c,
				l,
				h,
				f,
				p,
				d = W.get(e);
			if (d)
				for (
					n.handler && ((n = (o = n).handler), (i = o.selector)),
						n.guid || (n.guid = k.guid++),
						(a = d.events) || (a = d.events = {}),
						(s = d.handle) ||
							(s = d.handle =
								function (t) {
									return void 0 !== k && k.event.triggered !== t.type
										? k.event.dispatch.apply(e, arguments)
										: void 0;
								}),
						u = (t = (t || "").match(P) || [""]).length;
					u--;

				)
					(h = p = (c = nt.exec(t[u]) || [])[1]),
						(f = (c[2] || "").split(".").sort()),
						h &&
							((l = k.event.special[h] || {}),
							(h = (i ? l.delegateType : l.bindType) || h),
							(l = k.event.special[h] || {}),
							(c = k.extend(
								{
									type: h,
									origType: p,
									data: r,
									handler: n,
									guid: n.guid,
									selector: i,
									needsContext: i && k.expr.match.needsContext.test(i),
									namespace: f.join(".")
								},
								o
							)),
							(p = a[h]) ||
								(((p = a[h] = []).delegateCount = 0),
								(l.setup && !1 !== l.setup.call(e, r, f, s)) ||
									(e.addEventListener && e.addEventListener(h, s))),
							l.add &&
								(l.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)),
							i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
							(k.event.global[h] = !0));
		},
		remove: function (t, e, n, r, i) {
			var o,
				s,
				a,
				u,
				c,
				l,
				h,
				f,
				p,
				d,
				g,
				m = W.hasData(t) && W.get(t);
			if (m && (u = m.events)) {
				for (c = (e = (e || "").match(P) || [""]).length; c--; )
					if (
						((p = g = (a = nt.exec(e[c]) || [])[1]),
						(d = (a[2] || "").split(".").sort()),
						p)
					) {
						for (
							h = k.event.special[p] || {},
								f = u[(p = (r ? h.delegateType : h.bindType) || p)] || [],
								a =
									a[2] &&
									new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"),
								s = o = f.length;
							o--;

						)
							(l = f[o]),
								(!i && g !== l.origType) ||
									(n && n.guid !== l.guid) ||
									(a && !a.test(l.namespace)) ||
									(r && r !== l.selector && ("**" !== r || !l.selector)) ||
									(f.splice(o, 1),
									l.selector && f.delegateCount--,
									h.remove && h.remove.call(t, l));
						s &&
							!f.length &&
							((h.teardown && !1 !== h.teardown.call(t, d, m.handle)) ||
								k.removeEvent(t, p, m.handle),
							delete u[p]);
					} else for (p in u) k.event.remove(t, p + e[c], n, r, !0);
				k.isEmptyObject(u) && W.remove(t, "handle events");
			}
		},
		dispatch: function (t) {
			t = k.event.fix(t);
			var e,
				n,
				r,
				i,
				o,
				s = l.call(arguments),
				a = (W.get(this, "events") || {})[t.type] || [],
				u = k.event.special[t.type] || {};
			if (
				(((s[0] = t).delegateTarget = this),
				!u.preDispatch || !1 !== u.preDispatch.call(this, t))
			) {
				for (
					o = k.event.handlers.call(this, t, a), e = 0;
					(r = o[e++]) && !t.isPropagationStopped();

				)
					for (
						t.currentTarget = r.elem, n = 0;
						(i = r.handlers[n++]) && !t.isImmediatePropagationStopped();

					)
						(t.rnamespace && !t.rnamespace.test(i.namespace)) ||
							((t.handleObj = i),
							(t.data = i.data),
							void 0 !==
								(i = (
									(k.event.special[i.origType] || {}).handle || i.handler
								).apply(r.elem, s)) &&
								!1 === (t.result = i) &&
								(t.preventDefault(), t.stopPropagation()));
				return u.postDispatch && u.postDispatch.call(this, t), t.result;
			}
		},
		handlers: function (t, e) {
			var n,
				r,
				i,
				o,
				s = [],
				a = e.delegateCount,
				u = t.target;
			if (a && u.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1))
				for (; u !== this; u = u.parentNode || this)
					if (1 === u.nodeType && (!0 !== u.disabled || "click" !== t.type)) {
						for (r = [], n = 0; n < a; n++)
							void 0 === r[(i = (o = e[n]).selector + " ")] &&
								(r[i] = o.needsContext
									? -1 < k(i, this).index(u)
									: k.find(i, this, null, [u]).length),
								r[i] && r.push(o);
						r.length &&
							s.push({
								elem: u,
								handlers: r
							});
					}
			return (
				a < e.length &&
					s.push({
						elem: this,
						handlers: e.slice(a)
					}),
				s
			);
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
			" "
		),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (t, e) {
				return (
					null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
				);
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(
				" "
			),
			filter: function (t, e) {
				var n,
					r,
					i = e.button;
				return (
					null == t.pageX &&
						null != e.clientX &&
						((n = (r = t.target.ownerDocument || C).documentElement),
						(r = r.body),
						(t.pageX =
							e.clientX +
							((n && n.scrollLeft) || (r && r.scrollLeft) || 0) -
							((n && n.clientLeft) || (r && r.clientLeft) || 0)),
						(t.pageY =
							e.clientY +
							((n && n.scrollTop) || (r && r.scrollTop) || 0) -
							((n && n.clientTop) || (r && r.clientTop) || 0))),
					t.which || void 0 === i || (t.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0),
					t
				);
			}
		},
		fix: function (t) {
			if (t[k.expando]) return t;
			var e,
				n,
				r,
				i = t.type,
				o = t,
				s = this.fixHooks[i];
			for (
				s ||
					(this.fixHooks[i] = s =
						et.test(i) ? this.mouseHooks : tt.test(i) ? this.keyHooks : {}),
					r = s.props ? this.props.concat(s.props) : this.props,
					t = new k.Event(o),
					e = r.length;
				e--;

			)
				t[(n = r[e])] = o[n];
			return (
				t.target || (t.target = C),
				3 === t.target.nodeType && (t.target = t.target.parentNode),
				s.filter ? s.filter(t, o) : t
			);
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function () {
					return this !== ot() && this.focus ? (this.focus(), !1) : void 0;
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					return this === ot() && this.blur ? (this.blur(), !1) : void 0;
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function () {
					return "checkbox" === this.type && this.click && k.nodeName(this, "input")
						? (this.click(), !1)
						: void 0;
				},
				_default: function (t) {
					return k.nodeName(t.target, "a");
				}
			},
			beforeunload: {
				postDispatch: function (t) {
					void 0 !== t.result &&
						t.originalEvent &&
						(t.originalEvent.returnValue = t.result);
				}
			}
		}
	}),
		(k.removeEvent = function (t, e, n) {
			t.removeEventListener && t.removeEventListener(e, n);
		}),
		(k.Event = function (t, e) {
			return this instanceof k.Event
				? (t && t.type
						? ((this.originalEvent = t),
							(this.type = t.type),
							(this.isDefaultPrevented =
								t.defaultPrevented ||
								(void 0 === t.defaultPrevented && !1 === t.returnValue)
									? rt
									: it))
						: (this.type = t),
					e && k.extend(this, e),
					(this.timeStamp = (t && t.timeStamp) || k.now()),
					void (this[k.expando] = !0))
				: new k.Event(t, e);
		}),
		(k.Event.prototype = {
			constructor: k.Event,
			isDefaultPrevented: it,
			isPropagationStopped: it,
			isImmediatePropagationStopped: it,
			isSimulated: !1,
			preventDefault: function () {
				var t = this.originalEvent;
				(this.isDefaultPrevented = rt), t && !this.isSimulated && t.preventDefault();
			},
			stopPropagation: function () {
				var t = this.originalEvent;
				(this.isPropagationStopped = rt), t && !this.isSimulated && t.stopPropagation();
			},
			stopImmediatePropagation: function () {
				var t = this.originalEvent;
				(this.isImmediatePropagationStopped = rt),
					t && !this.isSimulated && t.stopImmediatePropagation(),
					this.stopPropagation();
			}
		}),
		k.each(
			{
				mouseenter: "mouseover",
				mouseleave: "mouseout",
				pointerenter: "pointerover",
				pointerleave: "pointerout"
			},
			function (t, i) {
				k.event.special[t] = {
					delegateType: i,
					bindType: i,
					handle: function (t) {
						var e,
							n = t.relatedTarget,
							r = t.handleObj;
						return (
							(n && (n === this || k.contains(this, n))) ||
								((t.type = r.origType),
								(e = r.handler.apply(this, arguments)),
								(t.type = i)),
							e
						);
					}
				};
			}
		),
		k.fn.extend({
			on: function (t, e, n, r) {
				return st(this, t, e, n, r);
			},
			one: function (t, e, n, r) {
				return st(this, t, e, n, r, 1);
			},
			off: function (t, e, n) {
				var r, i;
				if (t && t.preventDefault && t.handleObj)
					return (
						(r = t.handleObj),
						k(t.delegateTarget).off(
							r.namespace ? r.origType + "." + r.namespace : r.origType,
							r.selector,
							r.handler
						),
						this
					);
				if ("object" != typeof t)
					return (
						(!1 !== e && "function" != typeof e) || ((n = e), (e = void 0)),
						!1 === n && (n = it),
						this.each(function () {
							k.event.remove(this, t, n, e);
						})
					);
				for (i in t) this.off(i, e, t[i]);
				return this;
			}
		});
	var at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
		ut = /<script|<style|<link/i,
		ct = /checked\s*(?:[^=]|=\s*.checked.)/i,
		lt = /^true\/(.*)/,
		ht = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	function ft(t, e) {
		return k.nodeName(t, "table") && k.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr")
			? t.getElementsByTagName("tbody")[0] ||
					t.appendChild(t.ownerDocument.createElement("tbody"))
			: t;
	}
	function pt(t) {
		return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
	}
	function dt(t) {
		var e = lt.exec(t.type);
		return e ? (t.type = e[1]) : t.removeAttribute("type"), t;
	}
	function gt(t, e) {
		var n, r, i, o, s, a;
		if (1 === e.nodeType) {
			if (W.hasData(t) && ((o = W.access(t)), (s = W.set(e, o)), (a = o.events)))
				for (i in (delete s.handle, (s.events = {}), a))
					for (n = 0, r = a[i].length; n < r; n++) k.event.add(e, i, a[i][n]);
			L.hasData(t) && ((t = L.access(t)), (t = k.extend({}, t)), L.set(e, t));
		}
	}
	function mt(n, r, i, o) {
		r = g.apply([], r);
		var t,
			e,
			s,
			a,
			u,
			c,
			l = 0,
			h = n.length,
			f = h - 1,
			p = r[0],
			d = k.isFunction(p);
		if (d || (1 < h && "string" == typeof p && !m.checkClone && ct.test(p)))
			return n.each(function (t) {
				var e = n.eq(t);
				d && (r[0] = p.call(this, t, e.html())), mt(e, r, i, o);
			});
		if (
			h &&
			((e = (t = Z(r, n[0].ownerDocument, !1, n, o)).firstChild),
			1 === t.childNodes.length && (t = e),
			e || o)
		) {
			for (a = (s = k.map(K(t, "script"), pt)).length; l < h; l++)
				(u = t),
					l !== f && ((u = k.clone(u, !0, !0)), a && k.merge(s, K(u, "script"))),
					i.call(n[l], u, l);
			if (a)
				for (c = s[s.length - 1].ownerDocument, k.map(s, dt), l = 0; l < a; l++)
					(u = s[l]),
						X.test(u.type || "") &&
							!W.access(u, "globalEval") &&
							k.contains(c, u) &&
							(u.src
								? k._evalUrl && k._evalUrl(u.src)
								: k.globalEval(u.textContent.replace(ht, "")));
		}
		return n;
	}
	function vt(t, e, n) {
		for (var r, i = e ? k.filter(e, t) : t, o = 0; null != (r = i[o]); o++)
			n || 1 !== r.nodeType || k.cleanData(K(r)),
				r.parentNode &&
					(n && k.contains(r.ownerDocument, r) && Q(K(r, "script")),
					r.parentNode.removeChild(r));
		return t;
	}
	k.extend({
		htmlPrefilter: function (t) {
			return t.replace(at, "<$1></$2>");
		},
		clone: function (t, e, n) {
			var r,
				i,
				o,
				s,
				a,
				u,
				c,
				l = t.cloneNode(!0),
				h = k.contains(t.ownerDocument, t);
			if (!(m.noCloneChecked || (1 !== t.nodeType && 11 !== t.nodeType) || k.isXMLDoc(t)))
				for (s = K(l), r = 0, i = (o = K(t)).length; r < i; r++)
					(a = o[r]),
						(u = s[r]),
						(c = void 0),
						"input" === (c = u.nodeName.toLowerCase()) && V.test(a.type)
							? (u.checked = a.checked)
							: ("input" !== c && "textarea" !== c) ||
								(u.defaultValue = a.defaultValue);
			if (e)
				if (n)
					for (o = o || K(t), s = s || K(l), r = 0, i = o.length; r < i; r++)
						gt(o[r], s[r]);
				else gt(t, l);
			return 0 < (s = K(l, "script")).length && Q(s, !h && K(t, "script")), l;
		},
		cleanData: function (t) {
			for (var e, n, r, i = k.event.special, o = 0; void 0 !== (n = t[o]); o++)
				if (D(n)) {
					if ((e = n[W.expando])) {
						if (e.events)
							for (r in e.events)
								i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, e.handle);
						n[W.expando] = void 0;
					}
					n[L.expando] && (n[L.expando] = void 0);
				}
		}
	}),
		k.fn.extend({
			domManip: mt,
			detach: function (t) {
				return vt(this, t, !0);
			},
			remove: function (t) {
				return vt(this, t);
			},
			text: function (t) {
				return R(
					this,
					function (t) {
						return void 0 === t
							? k.text(this)
							: this.empty().each(function () {
									(1 !== this.nodeType &&
										11 !== this.nodeType &&
										9 !== this.nodeType) ||
										(this.textContent = t);
								});
					},
					null,
					t,
					arguments.length
				);
			},
			append: function () {
				return mt(this, arguments, function (t) {
					(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
						ft(this, t).appendChild(t);
				});
			},
			prepend: function () {
				return mt(this, arguments, function (t) {
					var e;
					(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) ||
						(e = ft(this, t)).insertBefore(t, e.firstChild);
				});
			},
			before: function () {
				return mt(this, arguments, function (t) {
					this.parentNode && this.parentNode.insertBefore(t, this);
				});
			},
			after: function () {
				return mt(this, arguments, function (t) {
					this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
				});
			},
			empty: function () {
				for (var t, e = 0; null != (t = this[e]); e++)
					1 === t.nodeType && (k.cleanData(K(t, !1)), (t.textContent = ""));
				return this;
			},
			clone: function (t, e) {
				return (
					(t = null != t && t),
					(e = null == e ? t : e),
					this.map(function () {
						return k.clone(this, t, e);
					})
				);
			},
			html: function (t) {
				return R(
					this,
					function (t) {
						var e = this[0] || {},
							n = 0,
							r = this.length;
						if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
						if (
							"string" == typeof t &&
							!ut.test(t) &&
							!Y[($.exec(t) || ["", ""])[1].toLowerCase()]
						) {
							t = k.htmlPrefilter(t);
							try {
								for (; n < r; n++)
									1 === (e = this[n] || {}).nodeType &&
										(k.cleanData(K(e, !1)), (e.innerHTML = t));
								e = 0;
							} catch (t) {}
						}
						e && this.empty().append(t);
					},
					null,
					t,
					arguments.length
				);
			},
			replaceWith: function () {
				var n = [];
				return mt(
					this,
					arguments,
					function (t) {
						var e = this.parentNode;
						k.inArray(this, n) < 0 &&
							(k.cleanData(K(this)), e && e.replaceChild(t, this));
					},
					n
				);
			}
		}),
		k.each(
			{
				appendTo: "append",
				prependTo: "prepend",
				insertBefore: "before",
				insertAfter: "after",
				replaceAll: "replaceWith"
			},
			function (t, s) {
				k.fn[t] = function (t) {
					for (var e, n = [], r = k(t), i = r.length - 1, o = 0; o <= i; o++)
						(e = o === i ? this : this.clone(!0)), k(r[o])[s](e), a.apply(n, e.get());
					return this.pushStack(n);
				};
			}
		);
	var yt,
		bt = {
			HTML: "block",
			BODY: "block"
		};
	function wt(t, e) {
		(t = k(e.createElement(t)).appendTo(e.body)), (e = k.css(t[0], "display"));
		return t.detach(), e;
	}
	function _t(t) {
		var e = C,
			n = bt[t];
		return (
			n ||
				(("none" !== (n = wt(t, e)) && n) ||
					((e = (yt = (
						yt || k("<iframe frameborder='0' width='0' height='0'/>")
					).appendTo(e.documentElement))[0].contentDocument).write(),
					e.close(),
					(n = wt(t, e)),
					yt.detach()),
				(bt[t] = n)),
			n
		);
	}
	function xt(t, e, n, r) {
		var i,
			o = {};
		for (i in e) (o[i] = t.style[i]), (t.style[i] = e[i]);
		for (i in ((r = n.apply(t, r || [])), e)) t.style[i] = o[i];
		return r;
	}
	var Ct,
		kt,
		St,
		Ot,
		Et,
		Tt,
		At = /^margin/,
		It = new RegExp("^(" + s + ")(?!px)[a-z%]+$", "i"),
		jt = function (t) {
			var e = t.ownerDocument.defaultView;
			return (e && e.opener) || (e = thiGlobalWin), e.getComputedStyle(t);
		},
		Pt = C.documentElement;
	function Nt() {
		(Tt.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
			(Tt.innerHTML = ""),
			Pt.appendChild(Et);
		var t = thiGlobalWin.getComputedStyle(Tt);
		(Ct = "1%" !== t.top),
			(Ot = "2px" === t.marginLeft),
			(kt = "4px" === t.width),
			(Tt.style.marginRight = "50%"),
			(St = "4px" === t.marginRight),
			Pt.removeChild(Et);
	}
	function Dt(t, e, n) {
		var r,
			i,
			o = t.style;
		return (
			("" !== (i = (n = n || jt(t)) ? n.getPropertyValue(e) || n[e] : void 0) &&
				void 0 !== i) ||
				k.contains(t.ownerDocument, t) ||
				(i = k.style(t, e)),
			n &&
				!m.pixelMarginRight() &&
				It.test(i) &&
				At.test(e) &&
				((r = o.width),
				(t = o.minWidth),
				(e = o.maxWidth),
				(o.minWidth = o.maxWidth = o.width = i),
				(i = n.width),
				(o.width = r),
				(o.minWidth = t),
				(o.maxWidth = e)),
			void 0 !== i ? i + "" : i
		);
	}
	function Rt(t, e) {
		return {
			get: function () {
				return t() ? void delete this.get : (this.get = e).apply(this, arguments);
			}
		};
	}
	(Et = C.createElement("div")),
		(Tt = C.createElement("div")).style &&
			((Tt.style.backgroundClip = "content-box"),
			(Tt.cloneNode(!0).style.backgroundClip = ""),
			(m.clearCloneStyle = "content-box" === Tt.style.backgroundClip),
			(Et.style.cssText =
				"border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
			Et.appendChild(Tt),
			k.extend(m, {
				pixelPosition: function () {
					return Nt(), Ct;
				},
				boxSizingReliable: function () {
					return null == kt && Nt(), kt;
				},
				pixelMarginRight: function () {
					return null == kt && Nt(), St;
				},
				reliableMarginLeft: function () {
					return null == kt && Nt(), Ot;
				},
				reliableMarginRight: function () {
					var t,
						e = Tt.appendChild(C.createElement("div"));
					return (
						(e.style.cssText = Tt.style.cssText =
							"-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
						(e.style.marginRight = e.style.width = "0"),
						(Tt.style.width = "1px"),
						Pt.appendChild(Et),
						(t = !parseFloat(thiGlobalWin.getComputedStyle(e).marginRight)),
						Pt.removeChild(Et),
						Tt.removeChild(e),
						t
					);
				}
			}));
	var Mt = /^(none|table(?!-c[ea]).+)/,
		Wt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Lt = {
			letterSpacing: "0",
			fontWeight: "400"
		},
		Ft = ["Webkit", "O", "Moz", "ms"],
		Ht = C.createElement("div").style;
	function Bt(t) {
		if (t in Ht) return t;
		for (var e = t[0].toUpperCase() + t.slice(1), n = Ft.length; n--; )
			if ((t = Ft[n] + e) in Ht) return t;
	}
	function qt(t, e, n) {
		var r = z.exec(e);
		return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e;
	}
	function zt(t, e, n, r, i) {
		for (
			var o = n === (r ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0;
			o < 4;
			o += 2
		)
			"margin" === n && (s += k.css(t, n + U[o], !0, i)),
				r
					? ("content" === n && (s -= k.css(t, "padding" + U[o], !0, i)),
						"margin" !== n && (s -= k.css(t, "border" + U[o] + "Width", !0, i)))
					: ((s += k.css(t, "padding" + U[o], !0, i)),
						"padding" !== n && (s += k.css(t, "border" + U[o] + "Width", !0, i)));
		return s;
	}
	function Ut(t, e, n) {
		var r = !0,
			i = "width" === e ? t.offsetWidth : t.offsetHeight,
			o = jt(t),
			s = "border-box" === k.css(t, "boxSizing", !1, o);
		if (i <= 0 || null == i) {
			if ((((i = Dt(t, e, o)) < 0 || null == i) && (i = t.style[e]), It.test(i))) return i;
			(r = s && (m.boxSizingReliable() || i === t.style[e])), (i = parseFloat(i) || 0);
		}
		return i + zt(t, e, n || (s ? "border" : "content"), r, o) + "px";
	}
	function Gt(t, e) {
		for (var n, r, i, o = [], s = 0, a = t.length; s < a; s++)
			(r = t[s]).style &&
				((o[s] = W.get(r, "olddisplay")),
				(n = r.style.display),
				e
					? (o[s] || "none" !== n || (r.style.display = ""),
						"" === r.style.display &&
							q(r) &&
							(o[s] = W.access(r, "olddisplay", _t(r.nodeName))))
					: ((i = q(r)),
						("none" === n && i) ||
							W.set(r, "olddisplay", i ? n : k.css(r, "display"))));
		for (s = 0; s < a; s++)
			(r = t[s]).style &&
				((e && "none" !== r.style.display && "" !== r.style.display) ||
					(r.style.display = e ? o[s] || "" : "none"));
		return t;
	}
	function Vt(t, e, n, r, i) {
		return new Vt.prototype.init(t, e, n, r, i);
	}
	k.extend({
		cssHooks: {
			opacity: {
				get: function (t, e) {
					if (e) {
						t = Dt(t, "opacity");
						return "" === t ? "1" : t;
					}
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: "cssFloat"
		},
		style: function (t, e, n, r) {
			if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
				var i,
					o,
					s,
					a = k.camelCase(e),
					u = t.style;
				return (
					(e = k.cssProps[a] || (k.cssProps[a] = Bt(a) || a)),
					(s = k.cssHooks[e] || k.cssHooks[a]),
					void 0 === n
						? s && "get" in s && void 0 !== (i = s.get(t, !1, r))
							? i
							: u[e]
						: ("string" === (o = typeof n) &&
								(i = z.exec(n)) &&
								i[1] &&
								((n = G(t, e, i)), (o = "number")),
							void (
								null != n &&
								n == n &&
								("number" === o &&
									(n += (i && i[3]) || (k.cssNumber[a] ? "" : "px")),
								m.clearCloneStyle ||
									"" !== n ||
									0 !== e.indexOf("background") ||
									(u[e] = "inherit"),
								(s && "set" in s && void 0 === (n = s.set(t, n, r))) || (u[e] = n))
							))
				);
			}
		},
		css: function (t, e, n, r) {
			var i,
				o = k.camelCase(e);
			return (
				(e = k.cssProps[o] || (k.cssProps[o] = Bt(o) || o)),
				(o = k.cssHooks[e] || k.cssHooks[o]) && "get" in o && (i = o.get(t, !0, n)),
				void 0 === i && (i = Dt(t, e, r)),
				"normal" === i && e in Lt && (i = Lt[e]),
				"" === n || n ? ((e = parseFloat(i)), !0 === n || isFinite(e) ? e || 0 : i) : i
			);
		}
	}),
		k.each(["height", "width"], function (t, o) {
			k.cssHooks[o] = {
				get: function (t, e, n) {
					return e
						? Mt.test(k.css(t, "display")) && 0 === t.offsetWidth
							? xt(t, Wt, function () {
									return Ut(t, o, n);
								})
							: Ut(t, o, n)
						: void 0;
				},
				set: function (t, e, n) {
					var r,
						i = n && jt(t),
						i = n && zt(t, o, n, "border-box" === k.css(t, "boxSizing", !1, i), i);
					return (
						i &&
							(r = z.exec(e)) &&
							"px" !== (r[3] || "px") &&
							((t.style[o] = e), (e = k.css(t, o))),
						qt(0, e, i)
					);
				}
			};
		}),
		(k.cssHooks.marginLeft = Rt(m.reliableMarginLeft, function (t, e) {
			return e
				? (parseFloat(Dt(t, "marginLeft")) ||
						t.getBoundingClientRect().left -
							xt(
								t,
								{
									marginLeft: 0
								},
								function () {
									return t.getBoundingClientRect().left;
								}
							)) + "px"
				: void 0;
		})),
		(k.cssHooks.marginRight = Rt(m.reliableMarginRight, function (t, e) {
			return e
				? xt(
						t,
						{
							display: "inline-block"
						},
						Dt,
						[t, "marginRight"]
					)
				: void 0;
		})),
		k.each(
			{
				margin: "",
				padding: "",
				border: "Width"
			},
			function (i, o) {
				(k.cssHooks[i + o] = {
					expand: function (t) {
						for (
							var e = 0, n = {}, r = "string" == typeof t ? t.split(" ") : [t];
							e < 4;
							e++
						)
							n[i + U[e] + o] = r[e] || r[e - 2] || r[0];
						return n;
					}
				}),
					At.test(i) || (k.cssHooks[i + o].set = qt);
			}
		),
		k.fn.extend({
			css: function (t, e) {
				return R(
					this,
					function (t, e, n) {
						var r,
							i,
							o = {},
							s = 0;
						if (k.isArray(e)) {
							for (r = jt(t), i = e.length; s < i; s++)
								o[e[s]] = k.css(t, e[s], !1, r);
							return o;
						}
						return void 0 !== n ? k.style(t, e, n) : k.css(t, e);
					},
					t,
					e,
					1 < arguments.length
				);
			},
			show: function () {
				return Gt(this, !0);
			},
			hide: function () {
				return Gt(this);
			},
			toggle: function (t) {
				return "boolean" == typeof t
					? t
						? this.show()
						: this.hide()
					: this.each(function () {
							q(this) ? k(this).show() : k(this).hide();
						});
			}
		}),
		((k.Tween = Vt).prototype = {
			constructor: Vt,
			init: function (t, e, n, r, i, o) {
				(this.elem = t),
					(this.prop = n),
					(this.easing = i || k.easing._default),
					(this.options = e),
					(this.start = this.now = this.cur()),
					(this.end = r),
					(this.unit = o || (k.cssNumber[n] ? "" : "px"));
			},
			cur: function () {
				var t = Vt.propHooks[this.prop];
				return (t && t.get ? t : Vt.propHooks._default).get(this);
			},
			run: function (t) {
				var e,
					n = Vt.propHooks[this.prop];
				return (
					this.options.duration
						? (this.pos = e =
								k.easing[this.easing](
									t,
									this.options.duration * t,
									0,
									1,
									this.options.duration
								))
						: (this.pos = e = t),
					(this.now = (this.end - this.start) * e + this.start),
					this.options.step && this.options.step.call(this.elem, this.now, this),
					(n && n.set ? n : Vt.propHooks._default).set(this),
					this
				);
			}
		}),
		(Vt.prototype.init.prototype = Vt.prototype),
		(Vt.propHooks = {
			_default: {
				get: function (t) {
					return 1 !== t.elem.nodeType ||
						(null != t.elem[t.prop] && null == t.elem.style[t.prop])
						? t.elem[t.prop]
						: (t = k.css(t.elem, t.prop, "")) && "auto" !== t
							? t
							: 0;
				},
				set: function (t) {
					k.fx.step[t.prop]
						? k.fx.step[t.prop](t)
						: 1 !== t.elem.nodeType ||
							  (null == t.elem.style[k.cssProps[t.prop]] && !k.cssHooks[t.prop])
							? (t.elem[t.prop] = t.now)
							: k.style(t.elem, t.prop, t.now + t.unit);
				}
			}
		}),
		(Vt.propHooks.scrollTop = Vt.propHooks.scrollLeft =
			{
				set: function (t) {
					t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
				}
			}),
		(k.easing = {
			linear: function (t) {
				return t;
			},
			swing: function (t) {
				return 0.5 - Math.cos(t * Math.PI) / 2;
			},
			_default: "swing"
		}),
		(k.fx = Vt.prototype.init),
		(k.fx.step = {});
	var $t,
		Xt,
		Yt = /^(?:toggle|show|hide)$/,
		Kt = /queueHooks$/;
	function Qt() {
		return (
			thiGlobalWin.setTimeout(function () {
				$t = void 0;
			}),
			($t = k.now())
		);
	}
	function Jt(t, e) {
		var n,
			r = 0,
			i = {
				height: t
			};
		for (e = e ? 1 : 0; r < 4; r += 2 - e) i["margin" + (n = U[r])] = i["padding" + n] = t;
		return e && (i.opacity = i.width = t), i;
	}
	function Zt(t, e, n) {
		for (
			var r, i = (te.tweeners[e] || []).concat(te.tweeners["*"]), o = 0, s = i.length;
			o < s;
			o++
		)
			if ((r = i[o].call(n, e, t))) return r;
	}
	function te(i, t, e) {
		var n,
			o,
			r = 0,
			s = te.prefilters.length,
			a = k.Deferred().always(function () {
				delete u.elem;
			}),
			u = function () {
				if (o) return !1;
				for (
					var t = $t || Qt(),
						t = Math.max(0, c.startTime + c.duration - t),
						e = 1 - (t / c.duration || 0),
						n = 0,
						r = c.tweens.length;
					n < r;
					n++
				)
					c.tweens[n].run(e);
				return a.notifyWith(i, [c, e, t]), e < 1 && r ? t : (a.resolveWith(i, [c]), !1);
			},
			c = a.promise({
				elem: i,
				props: k.extend({}, t),
				opts: k.extend(
					!0,
					{
						specialEasing: {},
						easing: k.easing._default
					},
					e
				),
				originalProperties: t,
				originalOptions: e,
				startTime: $t || Qt(),
				duration: e.duration,
				tweens: [],
				createTween: function (t, e) {
					t = k.Tween(i, c.opts, t, e, c.opts.specialEasing[t] || c.opts.easing);
					return c.tweens.push(t), t;
				},
				stop: function (t) {
					var e = 0,
						n = t ? c.tweens.length : 0;
					if (o) return this;
					for (o = !0; e < n; e++) c.tweens[e].run(1);
					return (
						t
							? (a.notifyWith(i, [c, 1, 0]), a.resolveWith(i, [c, t]))
							: a.rejectWith(i, [c, t]),
						this
					);
				}
			}),
			l = c.props;
		for (
			(function (t, e) {
				var n, r, i, o, s;
				for (n in t)
					if (
						((r = k.camelCase(n)),
						(i = e[r]),
						(o = t[n]),
						k.isArray(o) && ((i = o[1]), (o = t[n] = o[0])),
						n !== r && ((t[r] = o), delete t[n]),
						(s = k.cssHooks[r]),
						s && ("expand" in s))
					)
						for (n in ((o = s.expand(o)), delete t[r], o))
							(n in t) || ((t[n] = o[n]), (e[n] = i));
					else e[r] = i;
			})(l, c.opts.specialEasing);
			r < s;
			r++
		)
			if ((n = te.prefilters[r].call(c, i, l, c.opts)))
				return (
					k.isFunction(n.stop) &&
						(k._queueHooks(c.elem, c.opts.queue).stop = k.proxy(n.stop, n)),
					n
				);
		return (
			k.map(l, Zt, c),
			k.isFunction(c.opts.start) && c.opts.start.call(i, c),
			k.fx.timer(
				k.extend(u, {
					elem: i,
					anim: c,
					queue: c.opts.queue
				})
			),
			c
				.progress(c.opts.progress)
				.done(c.opts.done, c.opts.complete)
				.fail(c.opts.fail)
				.always(c.opts.always)
		);
	}
	(k.Animation = k.extend(te, {
		tweeners: {
			"*": [
				function (t, e) {
					var n = this.createTween(t, e);
					return G(n.elem, t, z.exec(e), n), n;
				}
			]
		},
		tweener: function (t, e) {
			for (
				var n, r = 0, i = (t = k.isFunction(t) ? ((e = t), ["*"]) : t.match(P)).length;
				r < i;
				r++
			)
				(n = t[r]), (te.tweeners[n] = te.tweeners[n] || []), te.tweeners[n].unshift(e);
		},
		prefilters: [
			function (e, t, n) {
				var r,
					i,
					o,
					s,
					a,
					u,
					c,
					l = this,
					h = {},
					f = e.style,
					p = e.nodeType && q(e),
					d = W.get(e, "fxshow");
				for (r in (n.queue ||
					(null == (a = k._queueHooks(e, "fx")).unqueued &&
						((a.unqueued = 0),
						(u = a.empty.fire),
						(a.empty.fire = function () {
							a.unqueued || u();
						})),
					a.unqueued++,
					l.always(function () {
						l.always(function () {
							a.unqueued--, k.queue(e, "fx").length || a.empty.fire();
						});
					})),
				1 === e.nodeType &&
					("height" in t || "width" in t) &&
					((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
					"inline" ===
						("none" === (c = k.css(e, "display"))
							? W.get(e, "olddisplay") || _t(e.nodeName)
							: c) &&
						"none" === k.css(e, "float") &&
						(f.display = "inline-block")),
				n.overflow &&
					((f.overflow = "hidden"),
					l.always(function () {
						(f.overflow = n.overflow[0]),
							(f.overflowX = n.overflow[1]),
							(f.overflowY = n.overflow[2]);
					})),
				t))
					if (((i = t[r]), Yt.exec(i))) {
						if ((delete t[r], (o = o || "toggle" === i), i === (p ? "hide" : "show"))) {
							if ("show" !== i || !d || void 0 === d[r]) continue;
							p = !0;
						}
						h[r] = (d && d[r]) || k.style(e, r);
					} else c = void 0;
				if (k.isEmptyObject(h))
					"inline" === ("none" === c ? _t(e.nodeName) : c) && (f.display = c);
				else
					for (r in (d
						? "hidden" in d && (p = d.hidden)
						: (d = W.access(e, "fxshow", {})),
					o && (d.hidden = !p),
					p
						? k(e).show()
						: l.done(function () {
								k(e).hide();
							}),
					l.done(function () {
						for (var t in (W.remove(e, "fxshow"), h)) k.style(e, t, h[t]);
					}),
					h))
						(s = Zt(p ? d[r] : 0, r, l)),
							r in d ||
								((d[r] = s.start),
								p &&
									((s.end = s.start),
									(s.start = "width" === r || "height" === r ? 1 : 0)));
			}
		],
		prefilter: function (t, e) {
			e ? te.prefilters.unshift(t) : te.prefilters.push(t);
		}
	})),
		(k.speed = function (t, e, n) {
			var r =
				t && "object" == typeof t
					? k.extend({}, t)
					: {
							complete: n || (!n && e) || (k.isFunction(t) && t),
							duration: t,
							easing: (n && e) || (e && !k.isFunction(e) && e)
						};
			return (
				(r.duration = k.fx.off
					? 0
					: "number" == typeof r.duration
						? r.duration
						: r.duration in k.fx.speeds
							? k.fx.speeds[r.duration]
							: k.fx.speeds._default),
				(null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
				(r.old = r.complete),
				(r.complete = function () {
					k.isFunction(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue);
				}),
				r
			);
		}),
		k.fn.extend({
			fadeTo: function (t, e, n, r) {
				return this.filter(q).css("opacity", 0).show().end().animate(
					{
						opacity: e
					},
					t,
					n,
					r
				);
			},
			animate: function (e, t, n, r) {
				var i = k.isEmptyObject(e),
					o = k.speed(t, n, r),
					r = function () {
						var t = te(this, k.extend({}, e), o);
						(i || W.get(this, "finish")) && t.stop(!0);
					};
				return (r.finish = r), i || !1 === o.queue ? this.each(r) : this.queue(o.queue, r);
			},
			stop: function (i, t, o) {
				function s(t) {
					var e = t.stop;
					delete t.stop, e(o);
				}
				return (
					"string" != typeof i && ((o = t), (t = i), (i = void 0)),
					t && !1 !== i && this.queue(i || "fx", []),
					this.each(function () {
						var t = !0,
							e = null != i && i + "queueHooks",
							n = k.timers,
							r = W.get(this);
						if (e) r[e] && r[e].stop && s(r[e]);
						else for (e in r) r[e] && r[e].stop && Kt.test(e) && s(r[e]);
						for (e = n.length; e--; )
							n[e].elem !== this ||
								(null != i && n[e].queue !== i) ||
								(n[e].anim.stop(o), (t = !1), n.splice(e, 1));
						(!t && o) || k.dequeue(this, i);
					})
				);
			},
			finish: function (s) {
				return (
					!1 !== s && (s = s || "fx"),
					this.each(function () {
						var t,
							e = W.get(this),
							n = e[s + "queue"],
							r = e[s + "queueHooks"],
							i = k.timers,
							o = n ? n.length : 0;
						for (
							e.finish = !0,
								k.queue(this, s, []),
								r && r.stop && r.stop.call(this, !0),
								t = i.length;
							t--;

						)
							i[t].elem === this &&
								i[t].queue === s &&
								(i[t].anim.stop(!0), i.splice(t, 1));
						for (t = 0; t < o; t++) n[t] && n[t].finish && n[t].finish.call(this);
						delete e.finish;
					})
				);
			}
		}),
		k.each(["toggle", "show", "hide"], function (t, r) {
			var i = k.fn[r];
			k.fn[r] = function (t, e, n) {
				return null == t || "boolean" == typeof t
					? i.apply(this, arguments)
					: this.animate(Jt(r, !0), t, e, n);
			};
		}),
		k.each(
			{
				slideDown: Jt("show"),
				slideUp: Jt("hide"),
				slideToggle: Jt("toggle"),
				fadeIn: {
					opacity: "show"
				},
				fadeOut: {
					opacity: "hide"
				},
				fadeToggle: {
					opacity: "toggle"
				}
			},
			function (t, r) {
				k.fn[t] = function (t, e, n) {
					return this.animate(r, t, e, n);
				};
			}
		),
		(k.timers = []),
		(k.fx.tick = function () {
			var t,
				e = 0,
				n = k.timers;
			for ($t = k.now(); e < n.length; e++) (t = n[e])() || n[e] !== t || n.splice(e--, 1);
			n.length || k.fx.stop(), ($t = void 0);
		}),
		(k.fx.timer = function (t) {
			k.timers.push(t), t() ? k.fx.start() : k.timers.pop();
		}),
		(k.fx.interval = 13),
		(k.fx.start = function () {
			Xt = Xt || thiGlobalWin.setInterval(k.fx.tick, k.fx.interval);
		}),
		(k.fx.stop = function () {
			thiGlobalWin.clearInterval(Xt), (Xt = null);
		}),
		(k.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}),
		(k.fn.delay = function (r, t) {
			return (
				(r = (k.fx && k.fx.speeds[r]) || r),
				(t = t || "fx"),
				this.queue(t, function (t, e) {
					var n = thiGlobalWin.setTimeout(t, r);
					e.stop = function () {
						thiGlobalWin.clearTimeout(n);
					};
				})
			);
		}),
		(p = C.createElement("input")),
		(n = C.createElement("select")),
		(s = n.appendChild(C.createElement("option"))),
		(p.type = "checkbox"),
		(m.checkOn = "" !== p.value),
		(m.optSelected = s.selected),
		(n.disabled = !0),
		(m.optDisabled = !s.disabled),
		((p = C.createElement("input")).value = "t"),
		(p.type = "radio"),
		(m.radioValue = "t" === p.value);
	var ee,
		ne = k.expr.attrHandle;
	k.fn.extend({
		attr: function (t, e) {
			return R(this, k.attr, t, e, 1 < arguments.length);
		},
		removeAttr: function (t) {
			return this.each(function () {
				k.removeAttr(this, t);
			});
		}
	}),
		k.extend({
			attr: function (t, e, n) {
				var r,
					i,
					o = t.nodeType;
				if (3 !== o && 8 !== o && 2 !== o)
					return void 0 === t.getAttribute
						? k.prop(t, e, n)
						: ((1 === o && k.isXMLDoc(t)) ||
								((e = e.toLowerCase()),
								(i = k.attrHooks[e] || (k.expr.match.bool.test(e) ? ee : void 0))),
							void 0 !== n
								? null === n
									? void k.removeAttr(t, e)
									: i && "set" in i && void 0 !== (r = i.set(t, n, e))
										? r
										: (t.setAttribute(e, n + ""), n)
								: i && "get" in i && null !== (r = i.get(t, e))
									? r
									: null == (r = k.find.attr(t, e))
										? void 0
										: r);
			},
			attrHooks: {
				type: {
					set: function (t, e) {
						if (!m.radioValue && "radio" === e && k.nodeName(t, "input")) {
							var n = t.value;
							return t.setAttribute("type", e), n && (t.value = n), e;
						}
					}
				}
			},
			removeAttr: function (t, e) {
				var n,
					r,
					i = 0,
					o = e && e.match(P);
				if (o && 1 === t.nodeType)
					for (; (n = o[i++]); )
						(r = k.propFix[n] || n),
							k.expr.match.bool.test(n) && (t[r] = !1),
							t.removeAttribute(n);
			}
		}),
		(ee = {
			set: function (t, e, n) {
				return !1 === e ? k.removeAttr(t, n) : t.setAttribute(n, n), n;
			}
		}),
		k.each(k.expr.match.bool.source.match(/\w+/g), function (t, e) {
			var o = ne[e] || k.find.attr;
			ne[e] = function (t, e, n) {
				var r, i;
				return (
					n ||
						((i = ne[e]),
						(ne[e] = r),
						(r = null != o(t, e, n) ? e.toLowerCase() : null),
						(ne[e] = i)),
					r
				);
			};
		});
	var re = /^(?:input|select|textarea|button)$/i,
		ie = /^(?:a|area)$/i;
	k.fn.extend({
		prop: function (t, e) {
			return R(this, k.prop, t, e, 1 < arguments.length);
		},
		removeProp: function (t) {
			return this.each(function () {
				delete this[k.propFix[t] || t];
			});
		}
	}),
		k.extend({
			prop: function (t, e, n) {
				var r,
					i,
					o = t.nodeType;
				if (3 !== o && 8 !== o && 2 !== o)
					return (
						(1 === o && k.isXMLDoc(t)) ||
							((e = k.propFix[e] || e), (i = k.propHooks[e])),
						void 0 !== n
							? i && "set" in i && void 0 !== (r = i.set(t, n, e))
								? r
								: (t[e] = n)
							: i && "get" in i && null !== (r = i.get(t, e))
								? r
								: t[e]
					);
			},
			propHooks: {
				tabIndex: {
					get: function (t) {
						var e = k.find.attr(t, "tabindex");
						return e
							? parseInt(e, 10)
							: re.test(t.nodeName) || (ie.test(t.nodeName) && t.href)
								? 0
								: -1;
					}
				}
			},
			propFix: {
				for: "htmlFor",
				class: "className"
			}
		}),
		m.optSelected ||
			(k.propHooks.selected = {
				get: function (t) {
					t = t.parentNode;
					return t && t.parentNode && t.parentNode.selectedIndex, null;
				},
				set: function (t) {
					t = t.parentNode;
					t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
				}
			}),
		k.each(
			[
				"tabIndex",
				"readOnly",
				"maxLength",
				"cellSpacing",
				"cellPadding",
				"rowSpan",
				"colSpan",
				"useMap",
				"frameBorder",
				"contentEditable"
			],
			function () {
				k.propFix[this.toLowerCase()] = this;
			}
		);
	var oe = /[\t\r\n\f]/g;
	function se(t) {
		return (t.getAttribute && t.getAttribute("class")) || "";
	}
	k.fn.extend({
		addClass: function (e) {
			var t,
				n,
				r,
				i,
				o,
				s,
				a = 0;
			if (k.isFunction(e))
				return this.each(function (t) {
					k(this).addClass(e.call(this, t, se(this)));
				});
			if ("string" == typeof e && e)
				for (t = e.match(P) || []; (n = this[a++]); )
					if (((s = se(n)), (r = 1 === n.nodeType && (" " + s + " ").replace(oe, " ")))) {
						for (o = 0; (i = t[o++]); ) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
						s !== (s = k.trim(r)) && n.setAttribute("class", s);
					}
			return this;
		},
		removeClass: function (e) {
			var t,
				n,
				r,
				i,
				o,
				s,
				a = 0;
			if (k.isFunction(e))
				return this.each(function (t) {
					k(this).removeClass(e.call(this, t, se(this)));
				});
			if (!arguments.length) return this.attr("class", "");
			if ("string" == typeof e && e)
				for (t = e.match(P) || []; (n = this[a++]); )
					if (((s = se(n)), (r = 1 === n.nodeType && (" " + s + " ").replace(oe, " ")))) {
						for (o = 0; (i = t[o++]); )
							for (; -1 < r.indexOf(" " + i + " "); )
								r = r.replace(" " + i + " ", " ");
						s !== (s = k.trim(r)) && n.setAttribute("class", s);
					}
			return this;
		},
		toggleClass: function (i, e) {
			var o = typeof i;
			return "boolean" == typeof e && "string" == o
				? e
					? this.addClass(i)
					: this.removeClass(i)
				: k.isFunction(i)
					? this.each(function (t) {
							k(this).toggleClass(i.call(this, t, se(this), e), e);
						})
					: this.each(function () {
							var t, e, n, r;
							if ("string" == o)
								for (e = 0, n = k(this), r = i.match(P) || []; (t = r[e++]); )
									n.hasClass(t) ? n.removeClass(t) : n.addClass(t);
							else
								(void 0 !== i && "boolean" != o) ||
									((t = se(this)) && W.set(this, "__className__", t),
									this.setAttribute &&
										this.setAttribute(
											"class",
											(!t && !1 !== i && W.get(this, "__className__")) || ""
										));
						});
		},
		hasClass: function (t) {
			for (var e, n = 0, r = " " + t + " "; (e = this[n++]); )
				if (1 === e.nodeType && -1 < (" " + se(e) + " ").replace(oe, " ").indexOf(r))
					return !0;
			return !1;
		}
	});
	var ae = /\r/g,
		ue = /[\x20\t\r\n\f]+/g;
	k.fn.extend({
		val: function (e) {
			var n,
				t,
				r,
				i = this[0];
			return arguments.length
				? ((r = k.isFunction(e)),
					this.each(function (t) {
						1 === this.nodeType &&
							(null == (t = r ? e.call(this, t, k(this).val()) : e)
								? (t = "")
								: "number" == typeof t
									? (t += "")
									: k.isArray(t) &&
										(t = k.map(t, function (t) {
											return null == t ? "" : t + "";
										})),
							((n =
								k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) &&
								"set" in n &&
								void 0 !== n.set(this, t, "value")) ||
								(this.value = t));
					}))
				: i
					? (n = k.valHooks[i.type] || k.valHooks[i.nodeName.toLowerCase()]) &&
						"get" in n &&
						void 0 !== (t = n.get(i, "value"))
						? t
						: "string" == typeof (t = i.value)
							? t.replace(ae, "")
							: null == t
								? ""
								: t
					: void 0;
		}
	}),
		k.extend({
			valHooks: {
				option: {
					get: function (t) {
						var e = k.find.attr(t, "value");
						return null != e ? e : k.trim(k.text(t)).replace(ue, " ");
					}
				},
				select: {
					get: function (t) {
						for (
							var e,
								n = t.options,
								r = t.selectedIndex,
								i = "select-one" === t.type || r < 0,
								o = i ? null : [],
								s = i ? r + 1 : n.length,
								a = r < 0 ? s : i ? r : 0;
							a < s;
							a++
						)
							if (
								((e = n[a]).selected || a === r) &&
								(m.optDisabled
									? !e.disabled
									: null === e.getAttribute("disabled")) &&
								(!e.parentNode.disabled || !k.nodeName(e.parentNode, "optgroup"))
							) {
								if (((e = k(e).val()), i)) return e;
								o.push(e);
							}
						return o;
					},
					set: function (t, e) {
						for (var n, r, i = t.options, o = k.makeArray(e), s = i.length; s--; )
							((r = i[s]).selected = -1 < k.inArray(k.valHooks.option.get(r), o)) &&
								(n = !0);
						return n || (t.selectedIndex = -1), o;
					}
				}
			}
		}),
		k.each(["radio", "checkbox"], function () {
			(k.valHooks[this] = {
				set: function (t, e) {
					return k.isArray(e) ? (t.checked = -1 < k.inArray(k(t).val(), e)) : void 0;
				}
			}),
				m.checkOn ||
					(k.valHooks[this].get = function (t) {
						return null === t.getAttribute("value") ? "on" : t.value;
					});
		});
	var ce = /^(?:focusinfocus|focusoutblur)$/;
	k.extend(k.event, {
		trigger: function (t, e, n, r) {
			var i,
				o,
				s,
				a,
				u,
				c,
				l = [n || C],
				h = d.call(t, "type") ? t.type : t,
				f = d.call(t, "namespace") ? t.namespace.split(".") : [],
				p = (o = n = n || C);
			if (
				3 !== n.nodeType &&
				8 !== n.nodeType &&
				!ce.test(h + k.event.triggered) &&
				(-1 < h.indexOf(".") && ((h = (f = h.split(".")).shift()), f.sort()),
				(a = h.indexOf(":") < 0 && "on" + h),
				((t = t[k.expando] ? t : new k.Event(h, "object" == typeof t && t)).isTrigger = r
					? 2
					: 3),
				(t.namespace = f.join(".")),
				(t.rnamespace = t.namespace
					? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)")
					: null),
				(t.result = void 0),
				t.target || (t.target = n),
				(e = null == e ? [t] : k.makeArray(e, [t])),
				(c = k.event.special[h] || {}),
				r || !c.trigger || !1 !== c.trigger.apply(n, e))
			) {
				if (!r && !c.noBubble && !k.isWindow(n)) {
					for (
						s = c.delegateType || h, ce.test(s + h) || (p = p.parentNode);
						p;
						p = p.parentNode
					)
						l.push(p), (o = p);
					o === (n.ownerDocument || C) &&
						l.push(o.defaultView || o.parentWindow || thiGlobalWin);
				}
				for (i = 0; (p = l[i++]) && !t.isPropagationStopped(); )
					(t.type = 1 < i ? s : c.bindType || h),
						(u = (W.get(p, "events") || {})[t.type] && W.get(p, "handle")) &&
							u.apply(p, e),
						(u = a && p[a]) &&
							u.apply &&
							D(p) &&
							((t.result = u.apply(p, e)), !1 === t.result && t.preventDefault());
				return (
					(t.type = h),
					r ||
						t.isDefaultPrevented() ||
						(c._default && !1 !== c._default.apply(l.pop(), e)) ||
						!D(n) ||
						(a &&
							k.isFunction(n[h]) &&
							!k.isWindow(n) &&
							((o = n[a]) && (n[a] = null),
							n[(k.event.triggered = h)](),
							(k.event.triggered = void 0),
							o && (n[a] = o))),
					t.result
				);
			}
		},
		simulate: function (t, e, n) {
			t = k.extend(new k.Event(), n, {
				type: t,
				isSimulated: !0
			});
			k.event.trigger(t, null, e);
		}
	}),
		k.fn.extend({
			trigger: function (t, e) {
				return this.each(function () {
					k.event.trigger(t, e, this);
				});
			},
			triggerHandler: function (t, e) {
				var n = this[0];
				return n ? k.event.trigger(t, e, n, !0) : void 0;
			}
		}),
		k.each(
			"blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
				" "
			),
			function (t, n) {
				k.fn[n] = function (t, e) {
					return 0 < arguments.length ? this.on(n, null, t, e) : this.trigger(n);
				};
			}
		),
		k.fn.extend({
			hover: function (t, e) {
				return this.mouseenter(t).mouseleave(e || t);
			}
		}),
		(m.focusin = "onfocusin" in thiGlobalWin),
		m.focusin ||
			k.each(
				{
					focus: "focusin",
					blur: "focusout"
				},
				function (n, r) {
					function i(t) {
						k.event.simulate(r, t.target, k.event.fix(t));
					}
					k.event.special[r] = {
						setup: function () {
							var t = this.ownerDocument || this,
								e = W.access(t, r);
							e || t.addEventListener(n, i, !0), W.access(t, r, (e || 0) + 1);
						},
						teardown: function () {
							var t = this.ownerDocument || this,
								e = W.access(t, r) - 1;
							e
								? W.access(t, r, e)
								: (t.removeEventListener(n, i, !0), W.remove(t, r));
						}
					};
				}
			);
	var le = thiGlobalWin.location,
		he = k.now(),
		fe = /\?/;
	(k.parseJSON = function (t) {
		return JSON.parse(t + "");
	}),
		(k.parseXML = function (t) {
			var e;
			if (!t || "string" != typeof t) return null;
			try {
				e = new thiGlobalWin.DOMParser().parseFromString(t, "text/xml");
			} catch (t) {
				e = void 0;
			}
			return (
				(e && !e.getElementsByTagName("parsererror").length) ||
					k.error("Invalid XML: " + t),
				e
			);
		});
	var pe = /#.*$/,
		de = /([?&])_=[^&]*/,
		ge = /^(.*?):[ \t]*([^\r\n]*)$/gm,
		me = /^(?:GET|HEAD)$/,
		ve = /^\/\//,
		ye = {},
		be = {},
		we = "*/".concat("*"),
		_e = C.createElement("a");
	function xe(o) {
		return function (t, e) {
			"string" != typeof t && ((e = t), (t = "*"));
			var n,
				r = 0,
				i = t.toLowerCase().match(P) || [];
			if (k.isFunction(e))
				for (; (n = i[r++]); )
					"+" === n[0]
						? ((n = n.slice(1) || "*"), (o[n] = o[n] || []).unshift(e))
						: (o[n] = o[n] || []).push(e);
		};
	}
	function Ce(e, r, i, o) {
		var s = {},
			a = e === be;
		function u(t) {
			var n;
			return (
				(s[t] = !0),
				k.each(e[t] || [], function (t, e) {
					e = e(r, i, o);
					return "string" != typeof e || a || s[e]
						? a
							? !(n = e)
							: void 0
						: (r.dataTypes.unshift(e), u(e), !1);
				}),
				n
			);
		}
		return u(r.dataTypes[0]) || (!s["*"] && u("*"));
	}
	function ke(t, e) {
		var n,
			r,
			i = k.ajaxSettings.flatOptions || {};
		for (n in e) void 0 !== e[n] && ((i[n] ? t : (r = r || {}))[n] = e[n]);
		return r && k.extend(!0, t, r), t;
	}
	(_e.href = le.href),
		k.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: le.href,
				type: "GET",
				isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
					le.protocol
				),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": we,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": k.parseJSON,
					"text xml": k.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function (t, e) {
				return e ? ke(ke(t, k.ajaxSettings), e) : ke(k.ajaxSettings, t);
			},
			ajaxPrefilter: xe(ye),
			ajaxTransport: xe(be),
			ajax: function (t, e) {
				"object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
				var u,
					c,
					l,
					n,
					h,
					r,
					f,
					i,
					p = k.ajaxSetup({}, e),
					d = p.context || p,
					g = p.context && (d.nodeType || d.jquery) ? k(d) : k.event,
					m = k.Deferred(),
					v = k.Callbacks("once memory"),
					y = p.statusCode || {},
					o = {},
					s = {},
					b = 0,
					a = "canceled",
					w = {
						readyState: 0,
						getResponseHeader: function (t) {
							var e;
							if (2 === b) {
								if (!n)
									for (n = {}; (e = ge.exec(l)); ) n[e[1].toLowerCase()] = e[2];
								e = n[t.toLowerCase()];
							}
							return null == e ? null : e;
						},
						getAllResponseHeaders: function () {
							return 2 === b ? l : null;
						},
						setRequestHeader: function (t, e) {
							var n = t.toLowerCase();
							return b || ((t = s[n] = s[n] || t), (o[t] = e)), this;
						},
						overrideMimeType: function (t) {
							return b || (p.mimeType = t), this;
						},
						statusCode: function (t) {
							if (t)
								if (b < 2) for (var e in t) y[e] = [y[e], t[e]];
								else w.always(t[w.status]);
							return this;
						},
						abort: function (t) {
							t = t || a;
							return u && u.abort(t), _(0, t), this;
						}
					};
				if (
					((m.promise(w).complete = v.add),
					(w.success = w.done),
					(w.error = w.fail),
					(p.url = ((t || p.url || le.href) + "")
						.replace(pe, "")
						.replace(ve, le.protocol + "//")),
					(p.type = e.method || e.type || p.method || p.type),
					(p.dataTypes = k
						.trim(p.dataType || "*")
						.toLowerCase()
						.match(P) || [""]),
					null == p.crossDomain)
				) {
					r = C.createElement("a");
					try {
						(r.href = p.url),
							(r.href = r.href),
							(p.crossDomain =
								_e.protocol + "//" + _e.host != r.protocol + "//" + r.host);
					} catch (t) {
						p.crossDomain = !0;
					}
				}
				if (
					(p.data &&
						p.processData &&
						"string" != typeof p.data &&
						(p.data = k.param(p.data, p.traditional)),
					Ce(ye, p, e, w),
					2 === b)
				)
					return w;
				for (i in ((f = k.event && p.global) &&
					0 == k.active++ &&
					k.event.trigger("ajaxStart"),
				(p.type = p.type.toUpperCase()),
				(p.hasContent = !me.test(p.type)),
				(c = p.url),
				p.hasContent ||
					(p.data && ((c = p.url += (fe.test(c) ? "&" : "?") + p.data), delete p.data),
					!1 === p.cache &&
						(p.url = de.test(c)
							? c.replace(de, "$1_=" + he++)
							: c + (fe.test(c) ? "&" : "?") + "_=" + he++)),
				p.ifModified &&
					(k.lastModified[c] &&
						w.setRequestHeader("If-Modified-Since", k.lastModified[c]),
					k.etag[c] && w.setRequestHeader("If-None-Match", k.etag[c])),
				((p.data && p.hasContent && !1 !== p.contentType) || e.contentType) &&
					w.setRequestHeader("Content-Type", p.contentType),
				w.setRequestHeader(
					"Accept",
					p.dataTypes[0] && p.accepts[p.dataTypes[0]]
						? p.accepts[p.dataTypes[0]] +
								("*" !== p.dataTypes[0] ? ", " + we + "; q=0.01" : "")
						: p.accepts["*"]
				),
				p.headers))
					w.setRequestHeader(i, p.headers[i]);
				if (p.beforeSend && (!1 === p.beforeSend.call(d, w, p) || 2 === b))
					return w.abort();
				for (i in ((a = "abort"),
				{
					success: 1,
					error: 1,
					complete: 1
				}))
					w[i](p[i]);
				if ((u = Ce(be, p, e, w))) {
					if (((w.readyState = 1), f && g.trigger("ajaxSend", [w, p]), 2 === b)) return w;
					p.async &&
						0 < p.timeout &&
						(h = thiGlobalWin.setTimeout(function () {
							w.abort("timeout");
						}, p.timeout));
					try {
						(b = 1), u.send(o, _);
					} catch (t) {
						if (!(b < 2)) throw t;
						_(-1, t);
					}
				} else _(-1, "No Transport");
				function _(t, e, n, r) {
					var i,
						o,
						s,
						a = e;
					2 !== b &&
						((b = 2),
						h && thiGlobalWin.clearTimeout(h),
						(u = void 0),
						(l = r || ""),
						(w.readyState = 0 < t ? 4 : 0),
						(r = (200 <= t && t < 300) || 304 === t),
						n &&
							(s = (function (t, e, n) {
								for (
									var r, i, o, s, a = t.contents, u = t.dataTypes;
									"*" === u[0];

								)
									u.shift(),
										void 0 === r &&
											(r = t.mimeType || e.getResponseHeader("Content-Type"));
								if (r)
									for (i in a)
										if (a[i] && a[i].test(r)) {
											u.unshift(i);
											break;
										}
								if (u[0] in n) o = u[0];
								else {
									for (i in n) {
										if (!u[0] || t.converters[i + " " + u[0]]) {
											o = i;
											break;
										}
										s = s || i;
									}
									o = o || s;
								}
								return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0;
							})(p, w, n)),
						(s = (function (t, e, n, r) {
							var i,
								o,
								s,
								a,
								u,
								c = {},
								l = t.dataTypes.slice();
							if (l[1]) for (s in t.converters) c[s.toLowerCase()] = t.converters[s];
							for (o = l.shift(); o; )
								if (
									(t.responseFields[o] && (n[t.responseFields[o]] = e),
									!u && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
									(u = o),
									(o = l.shift()))
								)
									if ("*" === o) o = u;
									else if ("*" !== u && u !== o) {
										if (!(s = c[u + " " + o] || c["* " + o]))
											for (i in c)
												if (
													((a = i.split(" ")),
													a[1] === o &&
														(s = c[u + " " + a[0]] || c["* " + a[0]]))
												) {
													!0 === s
														? (s = c[i])
														: !0 !== c[i] &&
															((o = a[0]), l.unshift(a[1]));
													break;
												}
										if (!0 !== s)
											if (s && t.throws) e = s(e);
											else
												try {
													e = s(e);
												} catch (t) {
													return {
														state: "parsererror",
														error: s
															? t
															: "No conversion from " + u + " to " + o
													};
												}
									}
							return {
								state: "success",
								data: e
							};
						})(p, s, w, r)),
						r
							? (p.ifModified &&
									((n = w.getResponseHeader("Last-Modified")) &&
										(k.lastModified[c] = n),
									(n = w.getResponseHeader("etag")) && (k.etag[c] = n)),
								204 === t || "HEAD" === p.type
									? (a = "nocontent")
									: 304 === t
										? (a = "notmodified")
										: ((a = s.state), (i = s.data), (r = !(o = s.error))))
							: ((o = a), (!t && a) || ((a = "error"), t < 0 && (t = 0))),
						(w.status = t),
						(w.statusText = (e || a) + ""),
						r ? m.resolveWith(d, [i, a, w]) : m.rejectWith(d, [w, a, o]),
						w.statusCode(y),
						(y = void 0),
						f && g.trigger(r ? "ajaxSuccess" : "ajaxError", [w, p, r ? i : o]),
						v.fireWith(d, [w, a]),
						f &&
							(g.trigger("ajaxComplete", [w, p]),
							--k.active || k.event.trigger("ajaxStop")));
				}
				return w;
			},
			getJSON: function (t, e, n) {
				return k.get(t, e, n, "json");
			},
			getScript: function (t, e) {
				return k.get(t, void 0, e, "script");
			}
		}),
		k.each(["get", "post"], function (t, i) {
			k[i] = function (t, e, n, r) {
				return (
					k.isFunction(e) && ((r = r || n), (n = e), (e = void 0)),
					k.ajax(
						k.extend(
							{
								url: t,
								type: i,
								dataType: r,
								data: e,
								success: n
							},
							k.isPlainObject(t) && t
						)
					)
				);
			};
		}),
		(k._evalUrl = function (t) {
			return k.ajax({
				url: t,
				type: "GET",
				dataType: "script",
				async: !1,
				global: !1,
				throws: !0
			});
		}),
		k.fn.extend({
			wrapAll: function (e) {
				var t;
				return k.isFunction(e)
					? this.each(function (t) {
							k(this).wrapAll(e.call(this, t));
						})
					: (this[0] &&
							((t = k(e, this[0].ownerDocument).eq(0).clone(!0)),
							this[0].parentNode && t.insertBefore(this[0]),
							t
								.map(function () {
									for (var t = this; t.firstElementChild; )
										t = t.firstElementChild;
									return t;
								})
								.append(this)),
						this);
			},
			wrapInner: function (n) {
				return k.isFunction(n)
					? this.each(function (t) {
							k(this).wrapInner(n.call(this, t));
						})
					: this.each(function () {
							var t = k(this),
								e = t.contents();
							e.length ? e.wrapAll(n) : t.append(n);
						});
			},
			wrap: function (e) {
				var n = k.isFunction(e);
				return this.each(function (t) {
					k(this).wrapAll(n ? e.call(this, t) : e);
				});
			},
			unwrap: function () {
				return this.parent()
					.each(function () {
						k.nodeName(this, "body") || k(this).replaceWith(this.childNodes);
					})
					.end();
			}
		}),
		(k.expr.filters.hidden = function (t) {
			return !k.expr.filters.visible(t);
		}),
		(k.expr.filters.visible = function (t) {
			return 0 < t.offsetWidth || 0 < t.offsetHeight || 0 < t.getClientRects().length;
		});
	var Se = /%20/g,
		Oe = /\[\]$/,
		Ee = /\r?\n/g,
		Te = /^(?:submit|button|image|reset|file)$/i,
		Ae = /^(?:input|select|textarea|keygen)/i;
	(k.param = function (t, e) {
		function n(t, e) {
			(e = k.isFunction(e) ? e() : null == e ? "" : e),
				(i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e));
		}
		var r,
			i = [];
		if (
			(void 0 === e && (e = k.ajaxSettings && k.ajaxSettings.traditional),
			k.isArray(t) || (t.jquery && !k.isPlainObject(t)))
		)
			k.each(t, function () {
				n(this.name, this.value);
			});
		else
			for (r in t)
				!(function n(r, t, i, o) {
					if (k.isArray(t))
						k.each(t, function (t, e) {
							i || Oe.test(r)
								? o(r, e)
								: n(
										r +
											"[" +
											("object" == typeof e && null != e ? t : "") +
											"]",
										e,
										i,
										o
									);
						});
					else if (i || "object" !== k.type(t)) o(r, t);
					else for (var e in t) n(r + "[" + e + "]", t[e], i, o);
				})(r, t[r], e, n);
		return i.join("&").replace(Se, "+");
	}),
		k.fn.extend({
			serialize: function () {
				return k.param(this.serializeArray());
			},
			serializeArray: function () {
				return this.map(function () {
					var t = k.prop(this, "elements");
					return t ? k.makeArray(t) : this;
				})
					.filter(function () {
						var t = this.type;
						return (
							this.name &&
							!k(this).is(":disabled") &&
							Ae.test(this.nodeName) &&
							!Te.test(t) &&
							(this.checked || !V.test(t))
						);
					})
					.map(function (t, e) {
						var n = k(this).val();
						return null == n
							? null
							: k.isArray(n)
								? k.map(n, function (t) {
										return {
											name: e.name,
											value: t.replace(Ee, "\r\n")
										};
									})
								: {
										name: e.name,
										value: n.replace(Ee, "\r\n")
									};
					})
					.get();
			}
		}),
		(k.ajaxSettings.xhr = function () {
			try {
				return new thiGlobalWin.XMLHttpRequest();
			} catch (t) {}
		});
	var Ie = {
			0: 200,
			1223: 204
		},
		je = k.ajaxSettings.xhr();
	(m.cors = !!je && "withCredentials" in je),
		(m.ajax = je = !!je),
		k.ajaxTransport(function (i) {
			var o, s;
			return m.cors || (je && !i.crossDomain)
				? {
						send: function (t, e) {
							var n,
								r = i.xhr();
							if (
								(r.open(i.type, i.url, i.async, i.username, i.password),
								i.xhrFields)
							)
								for (n in i.xhrFields) r[n] = i.xhrFields[n];
							for (n in (i.mimeType &&
								r.overrideMimeType &&
								r.overrideMimeType(i.mimeType),
							i.crossDomain ||
								t["X-Requested-With"] ||
								(t["X-Requested-With"] = "XMLHttpRequest"),
							t))
								r.setRequestHeader(n, t[n]);
							(o = function (t) {
								return function () {
									o &&
										((o =
											s =
											r.onload =
											r.onerror =
											r.onabort =
											r.onreadystatechange =
												null),
										"abort" === t
											? r.abort()
											: "error" === t
												? "number" != typeof r.status
													? e(0, "error")
													: e(r.status, r.statusText)
												: e(
														Ie[r.status] || r.status,
														r.statusText,
														"text" !== (r.responseType || "text") ||
															"string" != typeof r.responseText
															? {
																	binary: r.response
																}
															: {
																	text: r.responseText
																},
														r.getAllResponseHeaders()
													));
								};
							}),
								(r.onload = o()),
								(s = r.onerror = o("error")),
								void 0 !== r.onabort
									? (r.onabort = s)
									: (r.onreadystatechange = function () {
											4 === r.readyState &&
												thiGlobalWin.setTimeout(function () {
													o && s();
												});
										}),
								(o = o("abort"));
							try {
								r.send((i.hasContent && i.data) || null);
							} catch (t) {
								if (o) throw t;
							}
						},
						abort: function () {
							o && o();
						}
					}
				: void 0;
		}),
		k.ajaxSetup({
			accepts: {
				script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function (t) {
					return k.globalEval(t), t;
				}
			}
		}),
		k.ajaxPrefilter("script", function (t) {
			void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
		}),
		k.ajaxTransport("script", function (n) {
			var r, i;
			if (n.crossDomain)
				return {
					send: function (t, e) {
						(r = k("<script>")
							.prop({
								charset: n.scriptCharset,
								src: n.url
							})
							.on(
								"load error",
								(i = function (t) {
									r.remove(),
										(i = null),
										t && e("error" === t.type ? 404 : 200, t.type);
								})
							)),
							C.head.appendChild(r[0]);
					},
					abort: function () {
						i && i();
					}
				};
		});
	var Pe = [],
		Ne = /(=)\?(?=&|$)|\?\?/;
	k.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var t = Pe.pop() || k.expando + "_" + he++;
			return (this[t] = !0), t;
		}
	}),
		k.ajaxPrefilter("json jsonp", function (t, e, n) {
			var r,
				i,
				o,
				s =
					!1 !== t.jsonp &&
					(Ne.test(t.url)
						? "url"
						: "string" == typeof t.data &&
							0 ===
								(t.contentType || "").indexOf(
									"application/x-www-form-urlencoded"
								) &&
							Ne.test(t.data) &&
							"data");
			return s || "jsonp" === t.dataTypes[0]
				? ((r = t.jsonpCallback =
						k.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
					s
						? (t[s] = t[s].replace(Ne, "$1" + r))
						: !1 !== t.jsonp &&
							(t.url += (fe.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
					(t.converters["script json"] = function () {
						return o || k.error(r + " was not called"), o[0];
					}),
					(t.dataTypes[0] = "json"),
					(i = thiGlobalWin[r]),
					(thiGlobalWin[r] = function () {
						o = arguments;
					}),
					n.always(function () {
						void 0 === i ? k(thiGlobalWin).removeProp(r) : (thiGlobalWin[r] = i),
							t[r] && ((t.jsonpCallback = e.jsonpCallback), Pe.push(r)),
							o && k.isFunction(i) && i(o[0]),
							(o = i = void 0);
					}),
					"script")
				: void 0;
		}),
		(k.parseHTML = function (t, e, n) {
			if (!t || "string" != typeof t) return null;
			"boolean" == typeof e && ((n = e), (e = !1)), (e = e || C);
			var r = w.exec(t),
				n = !n && [];
			return r
				? [e.createElement(r[1])]
				: ((r = Z([t], e, n)), n && n.length && k(n).remove(), k.merge([], r.childNodes));
		});
	var De = k.fn.load;
	function Re(t) {
		return k.isWindow(t) ? t : 9 === t.nodeType && t.defaultView;
	}
	(k.fn.load = function (t, e, n) {
		if ("string" != typeof t && De) return De.apply(this, arguments);
		var r,
			i,
			o,
			s = this,
			a = t.indexOf(" ");
		return (
			-1 < a && ((r = k.trim(t.slice(a))), (t = t.slice(0, a))),
			k.isFunction(e) ? ((n = e), (e = void 0)) : e && "object" == typeof e && (i = "POST"),
			0 < s.length &&
				k
					.ajax({
						url: t,
						type: i || "GET",
						dataType: "html",
						data: e
					})
					.done(function (t) {
						(o = arguments), s.html(r ? k("<div>").append(k.parseHTML(t)).find(r) : t);
					})
					.always(
						n &&
							function (t, e) {
								s.each(function () {
									n.apply(this, o || [t.responseText, e, t]);
								});
							}
					),
			this
		);
	}),
		k.each(
			["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
			function (t, e) {
				k.fn[e] = function (t) {
					return this.on(e, t);
				};
			}
		),
		(k.expr.filters.animated = function (e) {
			return k.grep(k.timers, function (t) {
				return e === t.elem;
			}).length;
		}),
		(k.offset = {
			setOffset: function (t, e, n) {
				var r,
					i,
					o,
					s,
					a = k.css(t, "position"),
					u = k(t),
					c = {};
				"static" === a && (t.style.position = "relative"),
					(o = u.offset()),
					(r = k.css(t, "top")),
					(s = k.css(t, "left")),
					(s =
						("absolute" === a || "fixed" === a) && -1 < (r + s).indexOf("auto")
							? ((i = (a = u.position()).top), a.left)
							: ((i = parseFloat(r) || 0), parseFloat(s) || 0)),
					k.isFunction(e) && (e = e.call(t, n, k.extend({}, o))),
					null != e.top && (c.top = e.top - o.top + i),
					null != e.left && (c.left = e.left - o.left + s),
					"using" in e ? e.using.call(t, c) : u.css(c);
			}
		}),
		k.fn.extend({
			offset: function (e) {
				if (arguments.length)
					return void 0 === e
						? this
						: this.each(function (t) {
								k.offset.setOffset(this, e, t);
							});
				var t,
					n = this[0],
					r = {
						top: 0,
						left: 0
					},
					i = n && n.ownerDocument;
				return i
					? ((t = i.documentElement),
						k.contains(t, n)
							? ((r = n.getBoundingClientRect()),
								(i = Re(i)),
								{
									top: r.top + i.pageYOffset - t.clientTop,
									left: r.left + i.pageXOffset - t.clientLeft
								})
							: r)
					: void 0;
			},
			position: function () {
				if (this[0]) {
					var t,
						e,
						n = this[0],
						r = {
							top: 0,
							left: 0
						};
					return (
						"fixed" === k.css(n, "position")
							? (e = n.getBoundingClientRect())
							: ((t = this.offsetParent()),
								(e = this.offset()),
								k.nodeName(t[0], "html") || (r = t.offset()),
								(r.top += k.css(t[0], "borderTopWidth", !0)),
								(r.left += k.css(t[0], "borderLeftWidth", !0))),
						{
							top: e.top - r.top - k.css(n, "marginTop", !0),
							left: e.left - r.left - k.css(n, "marginLeft", !0)
						}
					);
				}
			},
			offsetParent: function () {
				return this.map(function () {
					for (var t = this.offsetParent; t && "static" === k.css(t, "position"); )
						t = t.offsetParent;
					return t || Pt;
				});
			}
		}),
		k.each(
			{
				scrollLeft: "pageXOffset",
				scrollTop: "pageYOffset"
			},
			function (e, i) {
				var o = "pageYOffset" === i;
				k.fn[e] = function (t) {
					return R(
						this,
						function (t, e, n) {
							var r = Re(t);
							return void 0 === n
								? r
									? r[i]
									: t[e]
								: void (r
										? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset)
										: (t[e] = n));
						},
						e,
						t,
						arguments.length
					);
				};
			}
		),
		k.each(["top", "left"], function (t, n) {
			k.cssHooks[n] = Rt(m.pixelPosition, function (t, e) {
				return e ? ((e = Dt(t, n)), It.test(e) ? k(t).position()[n] + "px" : e) : void 0;
			});
		}),
		k.each(
			{
				Height: "height",
				Width: "width"
			},
			function (o, s) {
				k.each(
					{
						padding: "inner" + o,
						content: s,
						"": "outer" + o
					},
					function (r, t) {
						k.fn[t] = function (t, e) {
							var n = arguments.length && (r || "boolean" != typeof t),
								i = r || (!0 === t || !0 === e ? "margin" : "border");
							return R(
								this,
								function (t, e, n) {
									var r;
									return k.isWindow(t)
										? t.document.documentElement["client" + o]
										: 9 === t.nodeType
											? ((r = t.documentElement),
												Math.max(
													t.body["scroll" + o],
													r["scroll" + o],
													t.body["offset" + o],
													r["offset" + o],
													r["client" + o]
												))
											: void 0 === n
												? k.css(t, e, i)
												: k.style(t, e, n, i);
								},
								s,
								n ? t : void 0,
								n,
								null
							);
						};
					}
				);
			}
		),
		k.fn.extend({
			bind: function (t, e, n) {
				return this.on(t, null, e, n);
			},
			unbind: function (t, e) {
				return this.off(t, null, e);
			},
			delegate: function (t, e, n, r) {
				return this.on(e, t, n, r);
			},
			undelegate: function (t, e, n) {
				return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n);
			},
			size: function () {
				return this.length;
			}
		}),
		(k.fn.andSelf = k.fn.addBack),
		"function" == typeof define &&
			define.amd &&
			define("jquery", [], function () {
				return k;
			});
	var Me = thiGlobalWin.jQuery,
		We = thiGlobalWin.$;
	return (
		(k.noConflict = function (t) {
			return (
				thiGlobalWin.$ === k && (thiGlobalWin.$ = We),
				t && thiGlobalWin.jQuery === k && (thiGlobalWin.jQuery = Me),
				k
			);
		}),
		t || (thiGlobalWin.jQuery = thiGlobalWin.$ = k),
		k
	);
}),
	(function (t, e) {
		"object" == typeof exports && "object" == typeof module
			? (module.exports = e())
			: "function" == typeof define && define.amd
				? define([], e)
				: "object" == typeof exports
					? (exports.clipboard = e())
					: (t.clipboard = e());
	})(this, function () {
		return (
			(i = {}),
			(r.m = n =
				[
					function (t, e, n) {
						"use strict";
						function o(t) {
							var e = new v(),
								t = function (n, t, r) {
									f("listener called"),
										(n.success = !0),
										t.forEach(function (t, e) {
											r.clipboardData.setData(e, t),
												e === g &&
													r.clipboardData.getData(e) != t &&
													(f("setting text/plain failed"),
													(n.success = !1));
										}),
										r.preventDefault();
								}.bind(this, e, t);
							document.addEventListener("copy", t);
							try {
								document.execCommand("copy");
							} finally {
								document.removeEventListener("copy", t);
							}
							return e.success;
						}
						function s(t, e) {
							a(t);
							e = o(e);
							return u(), e;
						}
						function a(t) {
							var e = document.getSelection(),
								n = document.createRange();
							n.selectNodeContents(t), e.removeAllRanges(), e.addRange(n);
						}
						function u() {
							document.getSelection().removeAllRanges();
						}
						function c() {
							return (
								"undefined" == typeof ClipboardEvent &&
								void 0 !== window.clipboardData &&
								void 0 !== window.clipboardData.setData
							);
						}
						function r() {
							return new h(function (t, e) {
								var n = window.clipboardData.getData("Text");
								"" === n
									? e(
											new Error(
												"Empty clipboard or could not read plain text from clipboard"
											)
										)
									: t(n);
							});
						}
						Object.defineProperty(e, "__esModule", {
							value: !0
						});
						var i = n(1),
							l = n(5),
							h = "undefined" == typeof Promise ? i.Promise : Promise,
							f = function (t) {},
							p = !0,
							d = function () {
								(console.warn || console.log).call(arguments);
							}.bind(console, "[clipboard-polyfill]"),
							g = "text/plain",
							i =
								((m.setDebugLog = function (t) {
									f = t;
								}),
								(m.suppressWarnings = function () {
									(p = !1), l.suppressDTWarnings();
								}),
								(m.write = function (i) {
									return (
										p &&
											!i.getData(g) &&
											d(
												"clipboard.write() was called without a `text/plain` data type. On some platforms, this may result in an empty clipboard. Call clipboard.suppressWarnings() to suppress this warning."
											),
										new h(function (t, e) {
											if (c())
												(function (t) {
													if (void 0 !== (t = t.getData(g)))
														return window.clipboardData.setData(
															"Text",
															t
														);
													throw "No `text/plain` value was specified.";
												})(i)
													? t()
													: e(
															new Error(
																"Copying failed, possibly because the user rejected it."
															)
														);
											else {
												if (o(i))
													return f("regular execCopy worked"), void t();
												if (-1 < navigator.userAgent.indexOf("Edge"))
													return (
														f('UA "Edge" => assuming success'), void t()
													);
												if (s(document.body, i))
													return (
														f("copyUsingTempSelection worked"), void t()
													);
												if (
													((r = i),
													(n =
														document.createElement("div")).setAttribute(
														"style",
														"-webkit-user-select: text !important"
													),
													(n.textContent = "temporary element"),
													document.body.appendChild(n),
													(r = s(n, r)),
													document.body.removeChild(n),
													r)
												)
													return f("copyUsingTempElem worked"), void t();
												var n,
													r = i.getData(g);
												if (
													void 0 !== r &&
													(function (t) {
														f("copyTextUsingDOM");
														var e = document.createElement("div");
														e.setAttribute(
															"style",
															"-webkit-user-select: text !important"
														);
														var n = e;
														e.attachShadow &&
															(f("Using shadow DOM."),
															(n = e.attachShadow({
																mode: "open"
															})));
														var r = document.createElement("span");
														return (
															(r.innerText = t),
															n.appendChild(r),
															document.body.appendChild(e),
															a(r),
															(r = document.execCommand("copy")),
															u(),
															document.body.removeChild(e),
															r
														);
													})(r)
												)
													return f("copyTextUsingDOM worked"), void t();
												e(new Error("Copy command failed."));
											}
										})
									);
								}),
								(m.writeText = function (t) {
									if (navigator.clipboard && navigator.clipboard.writeText)
										return navigator.clipboard.writeText(t);
									var e = new l.DT();
									return e.setData(g, t), this.write(e);
								}),
								(m.read = function () {
									return new h(function (n, t) {
										c()
											? r().then(function (t) {
													return n(
														((e = t), (t = new l.DT()).setData(g, e), t)
													);
													var e;
												}, t)
											: t("Read is not supported in your browser.");
									});
								}),
								(m.readText = function () {
									return navigator.clipboard && navigator.clipboard.readText
										? navigator.clipboard.readText()
										: c()
											? r()
											: new h(function (t, e) {
													e("Read is not supported in your browser.");
												});
								}),
								(m.DT = l.DT),
								m);
						function m() {}
						e.default = i;
						var v = function () {
							this.success = !1;
						};
						t.exports = i;
					},
					function (t, e, st) {
						(function (it, ot) {
							t.exports = (function () {
								"use strict";
								function n(t) {
									var e = typeof t;
									return null !== t && ("object" === e || "function" === e);
								}
								function c(t) {
									return "function" == typeof t;
								}
								function t(t) {
									q = t;
								}
								function e(t) {
									z = t;
								}
								function r() {
									return void 0 !== B
										? function () {
												B(o);
											}
										: i();
								}
								function i() {
									var t = setTimeout;
									return function () {
										return t(o, 1);
									};
								}
								function o() {
									for (var t = 0; t < H; t += 2)
										(0, Y[t])(Y[t + 1]), (Y[t] = void 0), (Y[t + 1] = void 0);
									H = 0;
								}
								function s(t, e) {
									var n = arguments,
										r = this,
										i = new this.constructor(u);
									void 0 === i[Q] && T(i);
									var o = r._state;
									return (
										o
											? (function () {
													var t = n[o - 1];
													z(function () {
														return S(o, i, t, r._result);
													});
												})()
											: _(r, i, t, e),
										i
									);
								}
								function a(t) {
									var e = this;
									if (t && "object" == typeof t && t.constructor === e) return t;
									var n = new e(u);
									return v(n, t), n;
								}
								function u() {}
								function l() {
									return new TypeError(
										"You cannot resolve a promise with itself"
									);
								}
								function h() {
									return new TypeError(
										"A promises callback cannot return that same promise."
									);
								}
								function f(t) {
									try {
										return t.then;
									} catch (t) {
										return (et.error = t), et;
									}
								}
								function p(t, e, n, r) {
									try {
										t.call(e, n, r);
									} catch (t) {
										return t;
									}
								}
								function d(t, r, i) {
									z(function (e) {
										var n = !1,
											t = p(
												i,
												r,
												function (t) {
													n || ((n = !0), r !== t ? v(e, t) : b(e, t));
												},
												function (t) {
													n || ((n = !0), w(e, t));
												},
												"Settle: " + (e._label || " unknown promise")
											);
										!n && t && ((n = !0), w(e, t));
									}, t);
								}
								function g(e, t) {
									t._state === Z
										? b(e, t._result)
										: t._state === tt
											? w(e, t._result)
											: _(
													t,
													void 0,
													function (t) {
														return v(e, t);
													},
													function (t) {
														return w(e, t);
													}
												);
								}
								function m(t, e, n) {
									e.constructor === t.constructor &&
									n === s &&
									e.constructor.resolve === a
										? g(t, e)
										: n === et
											? (w(t, et.error), (et.error = null))
											: void 0 === n
												? b(t, e)
												: c(n)
													? d(t, e, n)
													: b(t, e);
								}
								function v(t, e) {
									t === e ? w(t, l()) : n(e) ? m(t, e, f(e)) : b(t, e);
								}
								function y(t) {
									t._onerror && t._onerror(t._result), x(t);
								}
								function b(t, e) {
									t._state === J &&
										((t._result = e),
										(t._state = Z),
										0 !== t._subscribers.length && z(x, t));
								}
								function w(t, e) {
									t._state === J && ((t._state = tt), (t._result = e), z(y, t));
								}
								function _(t, e, n, r) {
									var i = t._subscribers,
										o = i.length;
									(t._onerror = null),
										(i[o] = e),
										(i[o + Z] = n),
										(i[o + tt] = r),
										0 === o && t._state && z(x, t);
								}
								function x(t) {
									var e = t._subscribers,
										n = t._state;
									if (0 !== e.length) {
										for (
											var r = void 0, i = void 0, o = t._result, s = 0;
											s < e.length;
											s += 3
										)
											(r = e[s]), (i = e[s + n]), r ? S(n, r, i, o) : i(o);
										t._subscribers.length = 0;
									}
								}
								function C() {
									this.error = null;
								}
								function k(t, e) {
									try {
										return t(e);
									} catch (t) {
										return (nt.error = t), nt;
									}
								}
								function S(t, e, n, r) {
									var i = c(n),
										o = void 0,
										s = void 0,
										a = void 0,
										u = void 0;
									if (i) {
										if (
											((o = k(n, r)),
											o === nt
												? ((u = !0), (s = o.error), (o.error = null))
												: (a = !0),
											e === o)
										)
											return void w(e, h());
									} else (o = r), (a = !0);
									e._state !== J ||
										(i && a
											? v(e, o)
											: u
												? w(e, s)
												: t === Z
													? b(e, o)
													: t === tt && w(e, o));
								}
								function O(e, t) {
									try {
										t(
											function (t) {
												v(e, t);
											},
											function (t) {
												w(e, t);
											}
										);
									} catch (t) {
										w(e, t);
									}
								}
								function E() {
									return rt++;
								}
								function T(t) {
									(t[Q] = rt++),
										(t._state = void 0),
										(t._result = void 0),
										(t._subscribers = []);
								}
								function A(t, e) {
									(this._instanceConstructor = t),
										(this.promise = new t(u)),
										this.promise[Q] || T(this.promise),
										F(e)
											? ((this.length = e.length),
												(this._remaining = e.length),
												(this._result = new Array(this.length)),
												0 === this.length
													? b(this.promise, this._result)
													: ((this.length = this.length || 0),
														this._enumerate(e),
														0 === this._remaining &&
															b(this.promise, this._result)))
											: w(this.promise, I());
								}
								function I() {
									return new Error("Array Methods must be provided an Array");
								}
								function j(t) {
									return new A(this, t).promise;
								}
								function P(i) {
									var o = this;
									return new o(
										F(i)
											? function (t, e) {
													for (var n = i.length, r = 0; r < n; r++)
														o.resolve(i[r]).then(t, e);
												}
											: function (t, e) {
													return e(
														new TypeError(
															"You must pass an array to race."
														)
													);
												}
									);
								}
								function N(t) {
									var e = this,
										n = new e(u);
									return w(n, t), n;
								}
								function D() {
									throw new TypeError(
										"You must pass a resolver function as the first argument to the promise constructor"
									);
								}
								function R() {
									throw new TypeError(
										"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
									);
								}
								function M(t) {
									(this[Q] = E()),
										(this._result = this._state = void 0),
										(this._subscribers = []),
										u !== t &&
											("function" != typeof t && D(),
											this instanceof M ? O(this, t) : R());
								}
								function W() {
									var t = void 0;
									if (void 0 !== ot) t = ot;
									else if ("undefined" != typeof self) t = self;
									else
										try {
											t = Function("return this")();
										} catch (t) {
											throw new Error(
												"polyfill failed because global object is unavailable in this environment"
											);
										}
									var e = t.Promise;
									if (e) {
										var n = null;
										try {
											n = Object.prototype.toString.call(e.resolve());
										} catch (t) {}
										if ("[object Promise]" === n && !e.cast) return;
									}
									t.Promise = M;
								}
								var L = void 0,
									F = (L = Array.isArray
										? Array.isArray
										: function (t) {
												return (
													"[object Array]" ===
													Object.prototype.toString.call(t)
												);
											}),
									H = 0,
									B = void 0,
									q = void 0,
									z = function (t, e) {
										(Y[H] = t),
											(Y[H + 1] = e),
											2 === (H += 2) && (q ? q(o) : K());
									},
									U = "undefined" != typeof window ? window : void 0,
									G = U || {},
									V = G.MutationObserver || G.WebKitMutationObserver,
									$ =
										"undefined" == typeof self &&
										void 0 !== it &&
										"[object process]" === {}.toString.call(it),
									X =
										"undefined" != typeof Uint8ClampedArray &&
										"undefined" != typeof importScripts &&
										"undefined" != typeof MessageChannel,
									Y = new Array(1e3),
									K = void 0;
								K = $
									? (function () {
											return function () {
												return it.nextTick(o);
											};
										})()
									: V
										? (function () {
												var t = 0,
													e = new V(o),
													n = document.createTextNode("");
												return (
													e.observe(n, {
														characterData: !0
													}),
													function () {
														n.data = t = ++t % 2;
													}
												);
											})()
										: X
											? (function () {
													var t = new MessageChannel();
													return (
														(t.port1.onmessage = o),
														function () {
															return t.port2.postMessage(0);
														}
													);
												})()
											: void 0 === U
												? (function () {
														try {
															var t = st(4);
															return (
																(B = t.runOnLoop || t.runOnContext),
																r()
															);
														} catch (t) {
															return i();
														}
													})()
												: i();
								var Q = Math.random().toString(36).substring(16),
									J = void 0,
									Z = 1,
									tt = 2,
									et = new C(),
									nt = new C(),
									rt = 0;
								return (
									(A.prototype._enumerate = function (t) {
										for (var e = 0; this._state === J && e < t.length; e++)
											this._eachEntry(t[e], e);
									}),
									(A.prototype._eachEntry = function (e, t) {
										var n = this._instanceConstructor,
											r = n.resolve;
										if (r === a) {
											var i = f(e);
											if (i === s && e._state !== J)
												this._settledAt(e._state, t, e._result);
											else if ("function" != typeof i)
												this._remaining--, (this._result[t] = e);
											else if (n === M) {
												var o = new n(u);
												m(o, e, i), this._willSettleAt(o, t);
											} else
												this._willSettleAt(
													new n(function (t) {
														return t(e);
													}),
													t
												);
										} else this._willSettleAt(r(e), t);
									}),
									(A.prototype._settledAt = function (t, e, n) {
										var r = this.promise;
										r._state === J &&
											(this._remaining--,
											t === tt ? w(r, n) : (this._result[e] = n)),
											0 === this._remaining && b(r, this._result);
									}),
									(A.prototype._willSettleAt = function (t, e) {
										var n = this;
										_(
											t,
											void 0,
											function (t) {
												return n._settledAt(Z, e, t);
											},
											function (t) {
												return n._settledAt(tt, e, t);
											}
										);
									}),
									(M.all = j),
									(M.race = P),
									(M.resolve = a),
									(M.reject = N),
									(M._setScheduler = t),
									(M._setAsap = e),
									(M._asap = z),
									(M.prototype = {
										constructor: M,
										then: s,
										catch: function (t) {
											return this.then(null, t);
										}
									}),
									(M.polyfill = W),
									(M.Promise = M)
								);
							})();
						}).call(e, st(2), st(3));
					},
					function (t, e) {
						function n() {
							throw new Error("setTimeout has not been defined");
						}
						function r() {
							throw new Error("clearTimeout has not been defined");
						}
						function i(e) {
							if (c === setTimeout) return setTimeout(e, 0);
							if ((c === n || !c) && setTimeout)
								return (c = setTimeout), setTimeout(e, 0);
							try {
								return c(e, 0);
							} catch (t) {
								try {
									return c.call(null, e, 0);
								} catch (t) {
									return c.call(this, e, 0);
								}
							}
						}
						function o() {
							p &&
								h &&
								((p = !1),
								h.length ? (f = h.concat(f)) : (d = -1),
								f.length && s());
						}
						function s() {
							if (!p) {
								var t = i(o);
								p = !0;
								for (var e = f.length; e; ) {
									for (h = f, f = []; ++d < e; ) h && h[d].run();
									(d = -1), (e = f.length);
								}
								(h = null),
									(p = !1),
									(function (e) {
										if (l === clearTimeout) return clearTimeout(e);
										if ((l === r || !l) && clearTimeout)
											return (l = clearTimeout), clearTimeout(e);
										try {
											l(e);
										} catch (t) {
											try {
												return l.call(null, e);
											} catch (t) {
												return l.call(this, e);
											}
										}
									})(t);
							}
						}
						function a(t, e) {
							(this.fun = t), (this.array = e);
						}
						function u() {}
						var c,
							l,
							t = (t.exports = {});
						!(function () {
							try {
								c = "function" == typeof setTimeout ? setTimeout : n;
							} catch (t) {
								c = n;
							}
							try {
								l = "function" == typeof clearTimeout ? clearTimeout : r;
							} catch (t) {
								l = r;
							}
						})();
						var h,
							f = [],
							p = !1,
							d = -1;
						(t.nextTick = function (t) {
							var e = new Array(arguments.length - 1);
							if (1 < arguments.length)
								for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
							f.push(new a(t, e)), 1 !== f.length || p || i(s);
						}),
							(a.prototype.run = function () {
								this.fun.apply(null, this.array);
							}),
							(t.title = "browser"),
							(t.browser = !0),
							(t.env = {}),
							(t.argv = []),
							(t.version = ""),
							(t.versions = {}),
							(t.on = u),
							(t.addListener = u),
							(t.once = u),
							(t.off = u),
							(t.removeListener = u),
							(t.removeAllListeners = u),
							(t.emit = u),
							(t.prependListener = u),
							(t.prependOnceListener = u),
							(t.listeners = function (t) {
								return [];
							}),
							(t.binding = function (t) {
								throw new Error("process.binding is not supported");
							}),
							(t.cwd = function () {
								return "/";
							}),
							(t.chdir = function (t) {
								throw new Error("process.chdir is not supported");
							}),
							(t.umask = function () {
								return 0;
							});
					},
					function (t, e) {
						var n = (function () {
							return this;
						})();
						try {
							n = n || Function("return this")() || (0, eval)("this");
						} catch (t) {
							"object" == typeof window && (n = window);
						}
						t.exports = n;
					},
					function (t, e) {},
					function (t, e, n) {
						"use strict";
						Object.defineProperty(e, "__esModule", {
							value: !0
						});
						var r = ["text/plain", "text/html"],
							i = function () {
								(console.warn || console.log).call(arguments);
							}.bind(console, "[clipboard-polyfill]"),
							o = !0;
						e.suppressDTWarnings = function () {
							o = !1;
						};
						var s =
							((a.prototype.setData = function (t, e) {
								o &&
									-1 === r.indexOf(t) &&
									i(
										"Unknown data type: " + t,
										"Call clipboard.suppressWarnings() to suppress this warning."
									),
									(this.m[t] = e);
							}),
							(a.prototype.getData = function (t) {
								return this.m[t];
							}),
							(a.prototype.forEach = function (t) {
								for (var e in this.m) t(this.m[e], e);
							}),
							a);
						function a() {
							this.m = {};
						}
						e.DT = s;
					}
				]),
			(r.c = i),
			(r.d = function (t, e, n) {
				r.o(t, e) ||
					Object.defineProperty(t, e, {
						configurable: !1,
						enumerable: !0,
						get: n
					});
			}),
			(r.n = function (t) {
				var e =
					t && t.__esModule
						? function () {
								return t.default;
							}
						: function () {
								return t;
							};
				return r.d(e, "a", e), e;
			}),
			(r.o = function (t, e) {
				return Object.prototype.hasOwnProperty.call(t, e);
			}),
			(r.p = ""),
			r((r.s = 0))
		);
		function r(t) {
			if (i[t]) return i[t].exports;
			var e = (i[t] = {
				i: t,
				l: !1,
				exports: {}
			});
			return n[t].call(e.exports, e, e.exports, r), (e.l = !0), e.exports;
		}
		var n, i;
	}),
	(function (t) {
		"use strict";
		"function" == typeof define && define.amd
			? define(["jquery"], t)
			: "object" == typeof exports && "object" == typeof module
				? (module.exports = t(require("jquery")))
				: t(jQuery);
	})(function (It, jt) {
		"use strict";
		var t,
			Pt = {
				beforeShow: n,
				move: n,
				change: n,
				show: n,
				hide: n,
				color: !1,
				flat: !1,
				showInput: !1,
				allowEmpty: !1,
				showButtons: !0,
				clickoutFiresChange: !0,
				showInitial: !1,
				showPalette: !1,
				showPaletteOnly: !1,
				hideAfterPaletteSelect: !1,
				togglePaletteOnly: !1,
				showSelectionPalette: !0,
				localStorageKey: !1,
				appendTo: "body",
				maxSelectionSize: 7,
				cancelText: "cancel",
				chooseText: "choose",
				togglePaletteMoreText: "more",
				togglePaletteLessText: "less",
				clearText: "Clear Color Selection",
				noColorSelectedText: "No Color Selected",
				preferredFormat: !1,
				className: "",
				containerClassName: "",
				replacerClassName: "",
				showAlpha: !1,
				theme: "sp-light",
				palette: [
					[
						"#ffffff",
						"#000000",
						"#ff0000",
						"#ff8000",
						"#ffff00",
						"#008000",
						"#0000ff",
						"#4b0082",
						"#9400d3"
					]
				],
				selectionPalette: [],
				disabled: !1,
				offset: null
			},
			Nt = [],
			Dt = !!/msie/i.exec(window.navigator.userAgent),
			Rt =
				(((t = document.createElement("div").style).cssText =
					"background-color:rgba(0,0,0,.5)"),
				e(t.backgroundColor, "rgba") || e(t.backgroundColor, "hsla")),
			Mt = [
				"<div class='sp-replacer'>",
				"<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
				"<div class='sp-dd'>&#9660;</div>",
				"</div>"
			].join(""),
			Wt = (function () {
				var t = "";
				if (Dt) for (var e = 1; e <= 6; e++) t += "<div class='sp-" + e + "'></div>";
				return [
					"<div class='sp-container sp-hidden'>",
					"<div class='sp-palette-container'>",
					"<div class='sp-palette sp-thumb sp-cf'></div>",
					"<div class='sp-palette-button-container sp-cf'>",
					"<button type='button' class='sp-palette-toggle'></button>",
					"</div>",
					"</div>",
					"<div class='sp-picker-container'>",
					"<div class='sp-top sp-cf'>",
					"<div class='sp-fill'></div>",
					"<div class='sp-top-inner'>",
					"<div class='sp-color'>",
					"<div class='sp-sat'>",
					"<div class='sp-val'>",
					"<div class='sp-dragger'></div>",
					"</div>",
					"</div>",
					"</div>",
					"<div class='sp-clear sp-clear-display'>",
					"</div>",
					"<div class='sp-hue'>",
					"<div class='sp-slider'></div>",
					t,
					"</div>",
					"</div>",
					"<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
					"</div>",
					"<div class='sp-input-container sp-cf'>",
					"<input class='sp-input formulaInputFocus' type='text' spellcheck='false'  />",
					"</div>",
					"<div class='sp-initial sp-thumb sp-cf'></div>",
					"<div class='sp-button-container sp-cf'>",
					"<a class='sp-cancel' href='#'></a>",
					"<button type='button' class='sp-choose'></button>",
					"</div>",
					"</div>",
					"</div>"
				].join("");
			})();
		function e(t, e) {
			return !!~("" + t).indexOf(e);
		}
		function Lt(t, e, n, r) {
			for (var i = [], o = 0; o < t.length; o++) {
				var s,
					a,
					u,
					c = t[o];
				c
					? ((a =
							(s = tinycolor(c)).toHsl().l < 0.5
								? "sp-thumb-el sp-thumb-dark"
								: "sp-thumb-el sp-thumb-light"),
						(a += tinycolor.equals(e, c) ? " sp-thumb-active" : ""),
						(u = s.toString(r.preferredFormat || "rgb")),
						(c = Rt ? "background-color:" + s.toRgbString() : "filter:" + s.toFilter()),
						i.push(
							'<span title="' +
								u +
								'" data-color="' +
								s.toRgbString() +
								'" class="' +
								a +
								'"><span class="sp-thumb-inner" style="' +
								c +
								';" /></span>'
						))
					: i.push(
							It("<div />")
								.append(
									It(
										'<span data-color="" style="background-color:transparent;" class="sp-clear-display"></span>'
									).attr("title", r.noColorSelectedText)
								)
								.html()
						);
			}
			return "<div class='sp-cf " + n + "'>" + i.join("") + "</div>";
		}
		function n() {}
		function Ft(t) {
			t.stopPropagation();
		}
		function Ht(t, e) {
			var n = Array.prototype.slice,
				r = n.call(arguments, 2);
			return function () {
				return t.apply(e, r.concat(n.call(arguments)));
			};
		}
		function Bt(r, i, e, t) {
			(i = i || function () {}), (e = e || function () {}), (t = t || function () {});
			var o = document,
				s = !1,
				a = {},
				u = 0,
				c = 0,
				l = "ontouchstart" in window,
				n = {};
			function h(t) {
				t.stopPropagation && t.stopPropagation(),
					t.preventDefault && t.preventDefault(),
					(t.returnValue = !1);
			}
			function f(t) {
				if (s) {
					if (Dt && o.documentMode < 9 && !t.button) return p();
					var e =
							t.originalEvent &&
							t.originalEvent.touches &&
							t.originalEvent.touches[0],
						n = (e && e.pageX) || t.pageX,
						e = (e && e.pageY) || t.pageY,
						n = Math.max(0, Math.min(n - a.left, c)),
						e = Math.max(0, Math.min(e - a.top, u));
					l && h(t), i.apply(r, [n, e, t]);
				}
			}
			function p() {
				s &&
					(It(o).unbind(n),
					It(o.body).removeClass("sp-dragging"),
					setTimeout(function () {
						t.apply(r, arguments);
					}, 0)),
					(s = !1);
			}
			(n.selectstart = h),
				(n.dragstart = h),
				(n["touchmove mousemove"] = f),
				(n["touchend mouseup"] = p),
				It(r).bind("touchstart mousedown", function (t) {
					(t.which ? 3 == t.which : 2 == t.button) ||
						s ||
						(!1 !== e.apply(r, arguments) &&
							((s = !0),
							(u = It(r).height()),
							(c = It(r).width()),
							(a = It(r).offset()),
							It(o).bind(n),
							It(o.body).addClass("sp-dragging"),
							f(t),
							h(t)));
				});
		}
		function qt() {
			return It.fn.spectrum.inputTypeColorSupport();
		}
		var o = "spectrum.id";
		(It.fn.spectrum = function (n, t) {
			if ("string" != typeof n)
				return this.spectrum("destroy").each(function () {
					var t = (function (t, e) {
						var n,
							r,
							i,
							a =
								((i = t),
								((e = It.extend({}, Pt, e)).callbacks = {
									move: Ht(e.move, i),
									change: Ht(e.change, i),
									show: Ht(e.show, i),
									hide: Ht(e.hide, i),
									beforeShow: Ht(e.beforeShow, i)
								}),
								e),
							u = a.flat,
							o = a.showSelectionPalette,
							s = a.localStorageKey,
							e = a.theme,
							c = a.callbacks,
							l =
								((n = Et),
								function () {
									var t = this,
										e = arguments;
									r =
										r ||
										setTimeout(function () {
											(r = null), n.apply(t, e);
										}, 10);
								}),
							h = !10,
							f = !1,
							p = 0,
							d = 0,
							g = 0,
							m = 0,
							v = 0,
							y = 0,
							b = 0,
							w = 0,
							_ = 0,
							x = 0,
							C = 1,
							k = [],
							S = [],
							O = {},
							E = a.selectionPalette.slice(0),
							T = a.maxSelectionSize,
							A = "sp-dragging",
							I = null,
							j = t.ownerDocument,
							P = (j.body, It(t)),
							N = !1,
							D = It(Wt, j).addClass(e),
							R = D.find(".sp-picker-container"),
							M = D.find(".sp-color"),
							W = D.find(".sp-dragger"),
							L = D.find(".sp-hue"),
							F = D.find(".sp-slider"),
							H = D.find(".sp-alpha-inner"),
							B = D.find(".sp-alpha"),
							q = D.find(".sp-alpha-handle"),
							z = D.find(".sp-input"),
							U = D.find(".sp-palette"),
							G = D.find(".sp-initial"),
							V = D.find(".sp-cancel"),
							$ = D.find(".sp-clear"),
							X = D.find(".sp-choose"),
							Y = D.find(".sp-palette-toggle"),
							K = P.is("input"),
							t = K && "color" === P.attr("type") && qt(),
							Q = K && !u,
							J = Q
								? It(Mt)
										.addClass(e)
										.addClass(a.className)
										.addClass(a.replacerClassName)
								: It([]),
							Z = Q ? J : P,
							tt = J.find(".sp-preview-inner"),
							et = a.color || (K && P.val()),
							nt = !1,
							rt = a.preferredFormat,
							it = !a.showButtons || a.clickoutFiresChange,
							ot = !et,
							st = a.allowEmpty && !t;
						function at() {
							if (
								(a.showPaletteOnly && (a.showPalette = !0),
								Y.text(
									a.showPaletteOnly
										? a.togglePaletteMoreText
										: a.togglePaletteLessText
								),
								a.palette)
							) {
								(k = a.palette.slice(0)),
									(S = It.isArray(k[0]) ? k : [k]),
									(O = {});
								for (var t = 0; t < S.length; t++)
									for (var e = 0; e < S[t].length; e++) {
										var n = tinycolor(S[t][e]).toRgbString();
										O[n] = !0;
									}
							}
							D.toggleClass("sp-flat", u),
								D.toggleClass("sp-input-disabled", !a.showInput),
								D.toggleClass("sp-alpha-enabled", a.showAlpha),
								D.toggleClass("sp-clear-enabled", st),
								D.toggleClass("sp-buttons-disabled", !a.showButtons),
								D.toggleClass("sp-palette-buttons-disabled", !a.togglePaletteOnly),
								D.toggleClass("sp-palette-disabled", !a.showPalette),
								D.toggleClass("sp-palette-only", a.showPaletteOnly),
								D.toggleClass("sp-initial-disabled", !a.showInitial),
								D.addClass(a.className).addClass(a.containerClassName),
								Et();
						}
						function ut() {
							if (s && window.localStorage) {
								try {
									var t = window.localStorage[s].split(",#");
									1 < t.length &&
										(delete window.localStorage[s],
										It.each(t, function (t, e) {
											ct(e);
										}));
								} catch (t) {}
								try {
									E = window.localStorage[s].split(";");
								} catch (t) {}
							}
						}
						function ct(t) {
							if (o) {
								var e = tinycolor(t).toRgbString();
								if (!O[e] && -1 === It.inArray(e, E))
									for (E.push(e); E.length > T; ) E.shift();
								if (s && window.localStorage)
									try {
										window.localStorage[s] = E.join(";");
									} catch (t) {}
							}
						}
						function lt() {
							var n = xt(),
								t = It.map(S, function (t, e) {
									return Lt(t, n, "sp-palette-row sp-palette-row-" + e, a);
								});
							ut(),
								E &&
									t.push(
										Lt(
											(function () {
												var t = [];
												if (a.showPalette)
													for (var e = 0; e < E.length; e++) {
														var n = tinycolor(E[e]).toRgbString();
														O[n] || t.push(E[e]);
													}
												return t.reverse().slice(0, a.maxSelectionSize);
											})(),
											n,
											"sp-palette-row sp-palette-row-selection",
											a
										)
									),
								U.html(t.join(""));
						}
						function ht() {
							var t, e;
							a.showInitial &&
								((t = nt),
								(e = xt()),
								G.html(Lt([t, e], e, "sp-palette-row-initial", a)));
						}
						function ft() {
							(d <= 0 || p <= 0 || m <= 0) && Et(),
								(f = !0),
								D.addClass(A),
								(I = null),
								P.trigger("dragstart.spectrum", [xt()]);
						}
						function pt() {
							(f = !1), D.removeClass(A), P.trigger("dragstop.spectrum", [xt()]);
						}
						function dt() {
							var t = z.val();
							(null !== t && "" !== t) || !st
								? (t = tinycolor(t)).isValid()
									? (_t(t), Ot(!0))
									: z.addClass("sp-validation-error")
								: (_t(null), Ot(!0));
						}
						function gt() {
							(h ? bt : mt)();
						}
						function mt() {
							var t = It.Event("beforeShow.spectrum");
							h
								? Et()
								: (P.trigger(t, [xt()]),
									!1 === c.beforeShow(xt()) ||
										t.isDefaultPrevented() ||
										((function () {
											for (var t = 0; t < Nt.length; t++)
												Nt[t] && Nt[t].hide();
										})(),
										(h = !0),
										It(j).bind("keydown.spectrum", vt),
										It(j).bind("click.spectrum", yt),
										It(window).bind("resize.spectrum", l),
										J.addClass("sp-active"),
										D.removeClass("sp-hidden"),
										Et(),
										kt(),
										(nt = xt()),
										ht(),
										c.show(nt),
										P.trigger("show.spectrum", [nt])));
						}
						function vt(t) {
							27 === t.keyCode && bt();
						}
						function yt(t) {
							2 != t.button && (f || (it ? Ot(!0) : wt(), bt()));
						}
						function bt() {
							h &&
								!u &&
								((h = !1),
								It(j).unbind("keydown.spectrum", vt),
								It(j).unbind("click.spectrum", yt),
								It(window).unbind("resize.spectrum", l),
								J.removeClass("sp-active"),
								D.addClass("sp-hidden"),
								c.hide(xt()),
								P.trigger("hide.spectrum", [xt()]));
						}
						function wt() {
							_t(nt, !0);
						}
						function _t(t, e) {
							var n;
							tinycolor.equals(t, xt())
								? kt()
								: (!t && st
										? (ot = !0)
										: ((ot = !1),
											(t = (n = tinycolor(t)).toHsv()),
											(w = (t.h % 360) / 360),
											(_ = t.s),
											(x = t.v),
											(C = t.a)),
									kt(),
									n &&
										n.isValid() &&
										!e &&
										(rt = a.preferredFormat || n.getFormat()));
						}
						function xt(t) {
							return (
								(t = t || {}),
								st && ot
									? null
									: tinycolor.fromRatio(
											{
												h: w,
												s: _,
												v: x,
												a: Math.round(100 * C) / 100
											},
											{
												format: t.format || rt
											}
										)
							);
						}
						function Ct() {
							kt(), c.move(xt()), P.trigger("move.spectrum", [xt()]);
						}
						function kt() {
							z.removeClass("sp-validation-error"), St();
							var t = tinycolor.fromRatio({
								h: w,
								s: 1,
								v: 1
							});
							M.css("background-color", t.toHexString());
							var e = rt;
							C < 1 &&
								(0 !== C || "name" !== e) &&
								(("hex" !== e && "hex3" !== e && "hex6" !== e && "name" !== e) ||
									(e = "rgb"));
							var n,
								r,
								i = xt({
									format: e
								}),
								o = "";
							tt.removeClass("sp-clear-display"),
								tt.css("background-color", "transparent"),
								!i && st
									? tt.addClass("sp-clear-display")
									: ((n = i.toHexString()),
										(r = i.toRgbString()),
										Rt || 1 === i.alpha
											? tt.css("background-color", r)
											: (tt.css("background-color", "transparent"),
												tt.css("filter", i.toFilter())),
										a.showAlpha &&
											(((t = i.toRgb()).a = 0),
											(t =
												"linear-gradient(left, " +
												(r = tinycolor(t).toRgbString()) +
												", " +
												n +
												")"),
											Dt
												? H.css(
														"filter",
														tinycolor(r).toFilter(
															{
																gradientType: 1
															},
															n
														)
													)
												: (H.css("background", "-webkit-" + t),
													H.css("background", "-moz-" + t),
													H.css("background", "-ms-" + t),
													H.css(
														"background",
														"linear-gradient(to right, " +
															r +
															", " +
															n +
															")"
													))),
										(o = i.toString(e))),
								a.showInput && z.val(o),
								a.showPalette && lt(),
								ht();
						}
						function St() {
							var t = _,
								e = x;
							st && ot
								? (q.hide(), F.hide(), W.hide())
								: (q.show(),
									F.show(),
									W.show(),
									(t = t * p),
									(e = d - e * d),
									(t = Math.max(-g, Math.min(p - g, t - g))),
									(e = Math.max(-g, Math.min(d - g, e - g))),
									W.css({
										top: e + "px",
										left: t + "px"
									}),
									(t = C * v),
									q.css({
										left: t - y / 2 + "px"
									}),
									(t = w * m),
									F.css({
										top: t - b + "px"
									}));
						}
						function Ot(t) {
							var e = xt(),
								n = "";
							e && ((n = e.toString(rt)), ct(e)),
								K && P.val(n),
								t && (c.change(e), P.trigger("change", [e]));
						}
						function Et() {
							var t, e, n, r, i, o, s;
							h &&
								((p = M.width()),
								(d = M.height()),
								(g = W.height()),
								L.width(),
								(m = L.height()),
								(b = F.height()),
								(v = B.width()),
								(y = q.width()),
								u ||
									(D.css("position", "absolute"),
									a.offset
										? D.offset(a.offset)
										: D.offset(
												((s = Z),
												(t = (i = D).outerWidth()),
												(e = i.outerHeight()),
												(n = s.outerHeight()),
												(i =
													(r = (o = i[0].ownerDocument).documentElement)
														.clientWidth + It(o).scrollLeft()),
												(o = r.clientHeight + It(o).scrollTop()),
												((s = s.offset()).top += n),
												(s.left -= Math.min(
													s.left,
													s.left + t > i && t < i
														? Math.abs(s.left + t - i)
														: 0
												)),
												(s.top -= Math.min(
													s.top,
													s.top + e > o && e < o ? Math.abs(+(e + n)) : 0
												)),
												s)
											)),
								St(),
								a.showPalette && lt(),
								P.trigger("reflow.spectrum"));
						}
						function Tt() {
							bt(), (N = !0), P.attr("disabled", !0), Z.addClass("sp-disabled");
						}
						!(function () {
							function t(t) {
								return (
									t.data && t.data.ignore
										? (_t(It(t.target).closest(".sp-thumb-el").data("color")),
											Ct())
										: (_t(It(t.target).closest(".sp-thumb-el").data("color")),
											Ct(),
											Ot(!0),
											a.hideAfterPaletteSelect && bt()),
									!1
								);
							}
							Dt && D.find("*:not(input)").attr("unselectable", "on"),
								at(),
								Q && P.after(J).hide(),
								st || $.hide(),
								u
									? P.after(D).hide()
									: (1 !==
											(e =
												"parent" === a.appendTo
													? P.parent()
													: It(a.appendTo)).length && (e = It("body")),
										e.append(D)),
								ut(),
								Z.bind("click.spectrum touchstart.spectrum", function (t) {
									N || gt(),
										t.stopPropagation(),
										It(t.target).is("input") || t.preventDefault();
								}),
								(!P.is(":disabled") && !0 !== a.disabled) || Tt(),
								D.click(Ft),
								z.change(dt),
								z.bind("paste", function () {
									setTimeout(dt, 1);
								}),
								z.keydown(function (t) {
									13 == t.keyCode && dt();
								}),
								V.text(a.cancelText),
								V.bind("click.spectrum", function (t) {
									t.stopPropagation(), t.preventDefault(), wt(), bt();
								}),
								$.attr("title", a.clearText),
								$.bind("click.spectrum", function (t) {
									t.stopPropagation(),
										t.preventDefault(),
										(ot = !0),
										Ct(),
										u && Ot(!0);
								}),
								X.text(a.chooseText),
								X.bind("click.spectrum", function (t) {
									t.stopPropagation(),
										t.preventDefault(),
										Dt && z.is(":focus") && z.trigger("change"),
										z.hasClass("sp-validation-error") || (Ot(!0), bt());
								}),
								Y.text(
									a.showPaletteOnly
										? a.togglePaletteMoreText
										: a.togglePaletteLessText
								),
								Y.bind("click.spectrum", function (t) {
									t.stopPropagation(),
										t.preventDefault(),
										(a.showPaletteOnly = !a.showPaletteOnly),
										a.showPaletteOnly ||
											u ||
											D.css("left", "-=" + (R.outerWidth(!0) + 5)),
										at();
								}),
								Bt(
									B,
									function (t, e, n) {
										(C = t / v),
											(ot = !1),
											n.shiftKey && (C = Math.round(10 * C) / 10),
											Ct();
									},
									ft,
									pt
								),
								Bt(
									L,
									function (t, e) {
										(w = parseFloat(e / m)),
											(ot = !1),
											a.showAlpha || (C = 1),
											Ct();
									},
									ft,
									pt
								),
								Bt(
									M,
									function (t, e, n) {
										n.shiftKey
											? I ||
												((n = _ * p),
												(r = d - x * d),
												(r = Math.abs(t - n) > Math.abs(e - r)),
												(I = r ? "x" : "y"))
											: (I = null);
										var r = !I || "y" === I;
										(I && "x" !== I) || (_ = parseFloat(t / p)),
											r && (x = parseFloat((d - e) / d)),
											(ot = !1),
											a.showAlpha || (C = 1),
											Ct();
									},
									ft,
									pt
								),
								et
									? (_t(et),
										kt(),
										(rt = a.preferredFormat || tinycolor(et).format),
										ct(et))
									: kt(),
								u && mt();
							var e = Dt
								? "mousedown.spectrum"
								: "click.spectrum touchstart.spectrum";
							U.delegate(".sp-thumb-el", e, t),
								G.delegate(
									".sp-thumb-el:nth-child(1)",
									e,
									{
										ignore: !0
									},
									t
								);
						})();
						var At = {
							show: mt,
							hide: bt,
							toggle: gt,
							reflow: Et,
							option: function (t, e) {
								return t === jt
									? It.extend({}, a)
									: e === jt
										? a[t]
										: ((a[t] = e),
											"preferredFormat" === t && (rt = a.preferredFormat),
											void at());
							},
							enable: function () {
								(N = !1), P.attr("disabled", !1), Z.removeClass("sp-disabled");
							},
							disable: Tt,
							offset: function (t) {
								(a.offset = t), Et();
							},
							set: function (t) {
								_t(t), Ot();
							},
							get: xt,
							destroy: function () {
								P.show(),
									Z.unbind("click.spectrum touchstart.spectrum"),
									D.remove(),
									J.remove(),
									(Nt[At.id] = null);
							},
							container: D
						};
						return (At.id = Nt.push(At) - 1), At;
					})(this, It.extend({}, n, It(this).data()));
					It(this).data(o, t.id);
				});
			var r = this,
				i = Array.prototype.slice.call(arguments, 1);
			return (
				this.each(function () {
					var t = Nt[It(this).data(o)];
					if (t) {
						var e = t[n];
						if (!e) throw new Error("Spectrum: no such method: '" + n + "'");
						"get" == n
							? (r = t.get())
							: "container" == n
								? (r = t.container)
								: "option" == n
									? (r = t.option.apply(t, i))
									: "destroy" == n
										? (t.destroy(), It(this).removeData(o))
										: e.apply(t, i);
					}
				}),
				r
			);
		}),
			(It.fn.spectrum.load = !0),
			(It.fn.spectrum.loadOpts = {}),
			(It.fn.spectrum.draggable = Bt),
			(It.fn.spectrum.defaults = Pt),
			(It.fn.spectrum.inputTypeColorSupport = function t() {
				var e;
				return (
					void 0 === t._cachedResult &&
						((e = It("<input type='color'/>")[0]),
						(t._cachedResult = "color" === e.type && "" !== e.value)),
					t._cachedResult
				);
			}),
			(It.spectrum = {}),
			(It.spectrum.localization = {}),
			(It.spectrum.palettes = {}),
			(It.fn.spectrum.processNativeColorInputs = function () {
				var t = It("input[type=color]");
				t.length &&
					!qt() &&
					t.spectrum({
						preferredFormat: "hex6"
					});
			}),
			(function () {
				var d = /^[\s,#]+/,
					g = /\s+$/,
					m = 0,
					v = Math,
					y = v.round,
					b = v.min,
					w = v.max,
					t = v.random,
					_ = function (t, e) {
						if (((e = e || {}), (t = t || "") instanceof _)) return t;
						if (!(this instanceof _)) return new _(t, e);
						var n,
							r,
							i,
							o,
							s,
							a,
							u,
							c,
							l,
							h,
							f,
							l =
								((c = {
									r: 0,
									g: 0,
									b: 0
								}),
								(f = h = !(l = 1)),
								"string" == typeof (n = t) &&
									(n = (function (t) {
										t = t.replace(d, "").replace(g, "").toLowerCase();
										var e,
											n = !1;
										if (O[t]) (t = O[t]), (n = !0);
										else if ("transparent" == t)
											return {
												r: 0,
												g: 0,
												b: 0,
												a: 0,
												format: "name"
											};
										return (e = M.rgb.exec(t))
											? {
													r: e[1],
													g: e[2],
													b: e[3]
												}
											: (e = M.rgba.exec(t))
												? {
														r: e[1],
														g: e[2],
														b: e[3],
														a: e[4]
													}
												: (e = M.hsl.exec(t))
													? {
															h: e[1],
															s: e[2],
															l: e[3]
														}
													: (e = M.hsla.exec(t))
														? {
																h: e[1],
																s: e[2],
																l: e[3],
																a: e[4]
															}
														: (e = M.hsv.exec(t))
															? {
																	h: e[1],
																	s: e[2],
																	v: e[3]
																}
															: (e = M.hsva.exec(t))
																? {
																		h: e[1],
																		s: e[2],
																		v: e[3],
																		a: e[4]
																	}
																: (e = M.hex8.exec(t))
																	? {
																			a: j(e[1]) / 255,
																			r: j(e[2]),
																			g: j(e[3]),
																			b: j(e[4]),
																			format: n
																				? "name"
																				: "hex8"
																		}
																	: (e = M.hex6.exec(t))
																		? {
																				r: j(e[1]),
																				g: j(e[2]),
																				b: j(e[3]),
																				format: n
																					? "name"
																					: "hex"
																			}
																		: !!(e =
																				M.hex3.exec(t)) && {
																				r: j(
																					e[1] + "" + e[1]
																				),
																				g: j(
																					e[2] + "" + e[2]
																				),
																				b: j(
																					e[3] + "" + e[3]
																				),
																				format: n
																					? "name"
																					: "hex"
																			};
									})(n)),
								"object" == typeof n &&
									(n.hasOwnProperty("r") &&
									n.hasOwnProperty("g") &&
									n.hasOwnProperty("b")
										? ((s = n.r),
											(a = n.g),
											(u = n.b),
											(c = {
												r: 255 * A(s, 255),
												g: 255 * A(a, 255),
												b: 255 * A(u, 255)
											}),
											(h = !0),
											(f = "%" === String(n.r).substr(-1) ? "prgb" : "rgb"))
										: n.hasOwnProperty("h") &&
											  n.hasOwnProperty("s") &&
											  n.hasOwnProperty("v")
											? ((n.s = N(n.s)),
												(n.v = N(n.v)),
												(c = (function (t, e, n) {
													(t = 6 * A(t, 360)),
														(e = A(e, 100)),
														(n = A(n, 100));
													var r = v.floor(t),
														i = t - r,
														o = n * (1 - e),
														t = n * (1 - i * e),
														e = n * (1 - (1 - i) * e),
														r = r % 6;
													return {
														r: 255 * [n, t, o, o, e, n][r],
														g: 255 * [e, n, n, t, o, o][r],
														b: 255 * [o, o, e, n, n, t][r]
													};
												})(n.h, n.s, n.v)),
												(h = !0),
												(f = "hsv"))
											: n.hasOwnProperty("h") &&
												n.hasOwnProperty("s") &&
												n.hasOwnProperty("l") &&
												((n.s = N(n.s)),
												(n.l = N(n.l)),
												(s = n.h),
												(a = n.s),
												(u = n.l),
												(s = A(s, 360)),
												(a = A(a, 100)),
												(u = A(u, 100)),
												0 === a
													? (r = i = o = u)
													: ((r = p(
															(a =
																2 * u -
																(u =
																	u < 0.5
																		? u * (1 + a)
																		: u + a - u * a)),
															u,
															s + 1 / 3
														)),
														(i = p(a, u, s)),
														(o = p(a, u, s - 1 / 3))),
												(c = {
													r: 255 * r,
													g: 255 * i,
													b: 255 * o
												}),
												(h = !0),
												(f = "hsl")),
									n.hasOwnProperty("a") && (l = n.a)),
								(l = T(l)),
								{
									ok: h,
									format: n.format || f,
									r: b(255, w(c.r, 0)),
									g: b(255, w(c.g, 0)),
									b: b(255, w(c.b, 0)),
									a: l
								});
						function p(t, e, n) {
							return (
								n < 0 && (n += 1),
								1 < n && --n,
								n < 1 / 6
									? t + 6 * (e - t) * n
									: n < 0.5
										? e
										: n < 2 / 3
											? t + (e - t) * (2 / 3 - n) * 6
											: t
							);
						}
						(this._originalInput = t),
							(this._r = l.r),
							(this._g = l.g),
							(this._b = l.b),
							(this._a = l.a),
							(this._roundA = y(100 * this._a) / 100),
							(this._format = e.format || l.format),
							(this._gradientType = e.gradientType),
							this._r < 1 && (this._r = y(this._r)),
							this._g < 1 && (this._g = y(this._g)),
							this._b < 1 && (this._b = y(this._b)),
							(this._ok = l.ok),
							(this._tc_id = m++);
					};
				function r(t, e, n) {
					(t = A(t, 255)), (e = A(e, 255)), (n = A(n, 255));
					var r,
						i = w(t, e, n),
						o = b(t, e, n),
						s = (i + o) / 2;
					if (i == o) r = u = 0;
					else {
						var a = i - o,
							u = 0.5 < s ? a / (2 - i - o) : a / (i + o);
						switch (i) {
							case t:
								r = (e - n) / a + (e < n ? 6 : 0);
								break;
							case e:
								r = (n - t) / a + 2;
								break;
							case n:
								r = (t - e) / a + 4;
						}
						r /= 6;
					}
					return {
						h: r,
						s: u,
						l: s
					};
				}
				function i(t, e, n) {
					(t = A(t, 255)), (e = A(e, 255)), (n = A(n, 255));
					var r,
						i = w(t, e, n),
						o = b(t, e, n),
						s = i,
						a = i - o,
						u = 0 === i ? 0 : a / i;
					if (i == o) r = 0;
					else {
						switch (i) {
							case t:
								r = (e - n) / a + (e < n ? 6 : 0);
								break;
							case e:
								r = (n - t) / a + 2;
								break;
							case n:
								r = (t - e) / a + 4;
						}
						r /= 6;
					}
					return {
						h: r,
						s: u,
						v: s
					};
				}
				function e(t, e, n, r) {
					n = [P(y(t).toString(16)), P(y(e).toString(16)), P(y(n).toString(16))];
					return r &&
						n[0].charAt(0) == n[0].charAt(1) &&
						n[1].charAt(0) == n[1].charAt(1) &&
						n[2].charAt(0) == n[2].charAt(1)
						? n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0)
						: n.join("");
				}
				function o(t, e, n, r) {
					return [
						P(Math.round(255 * parseFloat(r)).toString(16)),
						P(y(t).toString(16)),
						P(y(e).toString(16)),
						P(y(n).toString(16))
					].join("");
				}
				function n(t, e) {
					e = 0 === e ? 0 : e || 10;
					t = _(t).toHsl();
					return (t.s -= e / 100), (t.s = I(t.s)), _(t);
				}
				function s(t, e) {
					e = 0 === e ? 0 : e || 10;
					t = _(t).toHsl();
					return (t.s += e / 100), (t.s = I(t.s)), _(t);
				}
				function a(t) {
					return _(t).desaturate(100);
				}
				function u(t, e) {
					e = 0 === e ? 0 : e || 10;
					t = _(t).toHsl();
					return (t.l += e / 100), (t.l = I(t.l)), _(t);
				}
				function c(t, e) {
					e = 0 === e ? 0 : e || 10;
					t = _(t).toRgb();
					return (
						(t.r = w(0, b(255, t.r - y((-e / 100) * 255)))),
						(t.g = w(0, b(255, t.g - y((-e / 100) * 255)))),
						(t.b = w(0, b(255, t.b - y((-e / 100) * 255)))),
						_(t)
					);
				}
				function l(t, e) {
					e = 0 === e ? 0 : e || 10;
					t = _(t).toHsl();
					return (t.l -= e / 100), (t.l = I(t.l)), _(t);
				}
				function h(t, e) {
					(t = _(t).toHsl()), (e = (y(t.h) + e) % 360);
					return (t.h = e < 0 ? 360 + e : e), _(t);
				}
				function f(t) {
					t = _(t).toHsl();
					return (t.h = (t.h + 180) % 360), _(t);
				}
				function p(t) {
					var e = _(t).toHsl(),
						n = e.h;
					return [
						_(t),
						_({
							h: (n + 120) % 360,
							s: e.s,
							l: e.l
						}),
						_({
							h: (n + 240) % 360,
							s: e.s,
							l: e.l
						})
					];
				}
				function x(t) {
					var e = _(t).toHsl(),
						n = e.h;
					return [
						_(t),
						_({
							h: (n + 90) % 360,
							s: e.s,
							l: e.l
						}),
						_({
							h: (n + 180) % 360,
							s: e.s,
							l: e.l
						}),
						_({
							h: (n + 270) % 360,
							s: e.s,
							l: e.l
						})
					];
				}
				function C(t) {
					var e = _(t).toHsl(),
						n = e.h;
					return [
						_(t),
						_({
							h: (n + 72) % 360,
							s: e.s,
							l: e.l
						}),
						_({
							h: (n + 216) % 360,
							s: e.s,
							l: e.l
						})
					];
				}
				function k(t, e, n) {
					(e = e || 6), (n = n || 30);
					var r = _(t).toHsl(),
						i = 360 / n,
						o = [_(t)];
					for (r.h = (r.h - ((i * e) >> 1) + 720) % 360; --e; )
						(r.h = (r.h + i) % 360), o.push(_(r));
					return o;
				}
				function S(t, e) {
					e = e || 6;
					for (var t = _(t).toHsv(), n = t.h, r = t.s, i = t.v, o = [], s = 1 / e; e--; )
						o.push(
							_({
								h: n,
								s: r,
								v: i
							})
						),
							(i = (i + s) % 1);
					return o;
				}
				(_.prototype = {
					isDark: function () {
						return this.getBrightness() < 128;
					},
					isLight: function () {
						return !this.isDark();
					},
					isValid: function () {
						return this._ok;
					},
					getOriginalInput: function () {
						return this._originalInput;
					},
					getFormat: function () {
						return this._format;
					},
					getAlpha: function () {
						return this._a;
					},
					getBrightness: function () {
						var t = this.toRgb();
						return (299 * t.r + 587 * t.g + 114 * t.b) / 1e3;
					},
					setAlpha: function (t) {
						return (this._a = T(t)), (this._roundA = y(100 * this._a) / 100), this;
					},
					toHsv: function () {
						var t = i(this._r, this._g, this._b);
						return {
							h: 360 * t.h,
							s: t.s,
							v: t.v,
							a: this._a
						};
					},
					toHsvString: function () {
						var t = i(this._r, this._g, this._b),
							e = y(360 * t.h),
							n = y(100 * t.s),
							t = y(100 * t.v);
						return 1 == this._a
							? "hsv(" + e + ", " + n + "%, " + t + "%)"
							: "hsva(" + e + ", " + n + "%, " + t + "%, " + this._roundA + ")";
					},
					toHsl: function () {
						var t = r(this._r, this._g, this._b);
						return {
							h: 360 * t.h,
							s: t.s,
							l: t.l,
							a: this._a
						};
					},
					toHslString: function () {
						var t = r(this._r, this._g, this._b),
							e = y(360 * t.h),
							n = y(100 * t.s),
							t = y(100 * t.l);
						return 1 == this._a
							? "hsl(" + e + ", " + n + "%, " + t + "%)"
							: "hsla(" + e + ", " + n + "%, " + t + "%, " + this._roundA + ")";
					},
					toHex: function (t) {
						return e(this._r, this._g, this._b, t);
					},
					toHexString: function (t) {
						return "#" + this.toHex(t);
					},
					toHex8: function () {
						return o(this._r, this._g, this._b, this._a);
					},
					toHex8String: function () {
						return "#" + this.toHex8();
					},
					toRgb: function () {
						return {
							r: y(this._r),
							g: y(this._g),
							b: y(this._b),
							a: this._a
						};
					},
					toRgbString: function () {
						return 1 == this._a
							? "rgb(" + y(this._r) + ", " + y(this._g) + ", " + y(this._b) + ")"
							: "rgba(" +
									y(this._r) +
									", " +
									y(this._g) +
									", " +
									y(this._b) +
									", " +
									this._roundA +
									")";
					},
					toPercentageRgb: function () {
						return {
							r: y(100 * A(this._r, 255)) + "%",
							g: y(100 * A(this._g, 255)) + "%",
							b: y(100 * A(this._b, 255)) + "%",
							a: this._a
						};
					},
					toPercentageRgbString: function () {
						return 1 == this._a
							? "rgb(" +
									y(100 * A(this._r, 255)) +
									"%, " +
									y(100 * A(this._g, 255)) +
									"%, " +
									y(100 * A(this._b, 255)) +
									"%)"
							: "rgba(" +
									y(100 * A(this._r, 255)) +
									"%, " +
									y(100 * A(this._g, 255)) +
									"%, " +
									y(100 * A(this._b, 255)) +
									"%, " +
									this._roundA +
									")";
					},
					toName: function () {
						return 0 === this._a
							? "transparent"
							: !(this._a < 1) && (E[e(this._r, this._g, this._b, !0)] || !1);
					},
					toFilter: function (t) {
						var e = "#" + o(this._r, this._g, this._b, this._a),
							n = e,
							r = this._gradientType ? "GradientType = 1, " : "";
						return (
							t && (n = _(t).toHex8String()),
							"progid:DXImageTransform.Microsoft.gradient(" +
								r +
								"startColorstr=" +
								e +
								",endColorstr=" +
								n +
								")"
						);
					},
					toString: function (t) {
						var e = !!t;
						t = t || this._format;
						var n = !1,
							r = this._a < 1 && 0 <= this._a;
						return e ||
							!r ||
							("hex" !== t && "hex6" !== t && "hex3" !== t && "name" !== t)
							? ("rgb" === t && (n = this.toRgbString()),
								"prgb" === t && (n = this.toPercentageRgbString()),
								("hex" !== t && "hex6" !== t) || (n = this.toHexString()),
								"hex3" === t && (n = this.toHexString(!0)),
								"hex8" === t && (n = this.toHex8String()),
								"name" === t && (n = this.toName()),
								"hsl" === t && (n = this.toHslString()),
								"hsv" === t && (n = this.toHsvString()),
								n || this.toHexString())
							: "name" === t && 0 === this._a
								? this.toName()
								: this.toRgbString();
					},
					_applyModification: function (t, e) {
						e = t.apply(null, [this].concat([].slice.call(e)));
						return (
							(this._r = e._r),
							(this._g = e._g),
							(this._b = e._b),
							this.setAlpha(e._a),
							this
						);
					},
					lighten: function () {
						return this._applyModification(u, arguments);
					},
					brighten: function () {
						return this._applyModification(c, arguments);
					},
					darken: function () {
						return this._applyModification(l, arguments);
					},
					desaturate: function () {
						return this._applyModification(n, arguments);
					},
					saturate: function () {
						return this._applyModification(s, arguments);
					},
					greyscale: function () {
						return this._applyModification(a, arguments);
					},
					spin: function () {
						return this._applyModification(h, arguments);
					},
					_applyCombination: function (t, e) {
						return t.apply(null, [this].concat([].slice.call(e)));
					},
					analogous: function () {
						return this._applyCombination(k, arguments);
					},
					complement: function () {
						return this._applyCombination(f, arguments);
					},
					monochromatic: function () {
						return this._applyCombination(S, arguments);
					},
					splitcomplement: function () {
						return this._applyCombination(C, arguments);
					},
					triad: function () {
						return this._applyCombination(p, arguments);
					},
					tetrad: function () {
						return this._applyCombination(x, arguments);
					}
				}),
					(_.fromRatio = function (t, e) {
						if ("object" == typeof t) {
							var n,
								r = {};
							for (n in t) t.hasOwnProperty(n) && (r[n] = "a" === n ? t[n] : N(t[n]));
							t = r;
						}
						return _(t, e);
					}),
					(_.equals = function (t, e) {
						return !(!t || !e) && _(t).toRgbString() == _(e).toRgbString();
					}),
					(_.random = function () {
						return _.fromRatio({
							r: t(),
							g: t(),
							b: t()
						});
					}),
					(_.mix = function (t, e, n) {
						n = 0 === n ? 0 : n || 50;
						var r = _(t).toRgb(),
							i = _(e).toRgb(),
							t = n / 100,
							e = 2 * t - 1,
							n = i.a - r.a,
							n = 1 - (e = (1 + (e = e * n == -1 ? e : (e + n) / (1 + e * n))) / 2),
							t = {
								r: i.r * e + r.r * n,
								g: i.g * e + r.g * n,
								b: i.b * e + r.b * n,
								a: i.a * t + r.a * (1 - t)
							};
						return _(t);
					}),
					(_.readability = function (t, e) {
						var n = _(t),
							r = _(e),
							t = n.toRgb(),
							e = r.toRgb(),
							n = n.getBrightness(),
							r = r.getBrightness(),
							e =
								Math.max(t.r, e.r) -
								Math.min(t.r, e.r) +
								Math.max(t.g, e.g) -
								Math.min(t.g, e.g) +
								Math.max(t.b, e.b) -
								Math.min(t.b, e.b);
						return {
							brightness: Math.abs(n - r),
							color: e
						};
					}),
					(_.isReadable = function (t, e) {
						e = _.readability(t, e);
						return 125 < e.brightness && 500 < e.color;
					}),
					(_.mostReadable = function (t, e) {
						for (var n = null, r = 0, i = !1, o = 0; o < e.length; o++) {
							var s = _.readability(t, e[o]),
								a = 125 < s.brightness && 500 < s.color,
								s = (s.brightness / 125) * 3 + s.color / 500;
							((a && !i) || (a && i && r < s) || (!a && !i && r < s)) &&
								((i = a), (r = s), (n = _(e[o])));
						}
						return n;
					});
				var O = (_.names = {
						aliceblue: "f0f8ff",
						antiquewhite: "faebd7",
						aqua: "0ff",
						aquamarine: "7fffd4",
						azure: "f0ffff",
						beige: "f5f5dc",
						bisque: "ffe4c4",
						black: "000",
						blanchedalmond: "ffebcd",
						blue: "00f",
						blueviolet: "8a2be2",
						brown: "a52a2a",
						burlywood: "deb887",
						burntsienna: "ea7e5d",
						cadetblue: "5f9ea0",
						chartreuse: "7fff00",
						chocolate: "d2691e",
						coral: "ff7f50",
						cornflowerblue: "6495ed",
						cornsilk: "fff8dc",
						crimson: "dc143c",
						cyan: "0ff",
						darkblue: "00008b",
						darkcyan: "008b8b",
						darkgoldenrod: "b8860b",
						darkgray: "a9a9a9",
						darkgreen: "006400",
						darkgrey: "a9a9a9",
						darkkhaki: "bdb76b",
						darkmagenta: "8b008b",
						darkolivegreen: "556b2f",
						darkorange: "ff8c00",
						darkorchid: "9932cc",
						darkred: "8b0000",
						darksalmon: "e9967a",
						darkseagreen: "8fbc8f",
						darkslateblue: "483d8b",
						darkslategray: "2f4f4f",
						darkslategrey: "2f4f4f",
						darkturquoise: "00ced1",
						darkviolet: "9400d3",
						deeppink: "ff1493",
						deepskyblue: "00bfff",
						dimgray: "696969",
						dimgrey: "696969",
						dodgerblue: "1e90ff",
						firebrick: "b22222",
						floralwhite: "fffaf0",
						forestgreen: "228b22",
						fuchsia: "f0f",
						gainsboro: "dcdcdc",
						ghostwhite: "f8f8ff",
						gold: "ffd700",
						goldenrod: "daa520",
						gray: "808080",
						green: "008000",
						greenyellow: "adff2f",
						grey: "808080",
						honeydew: "f0fff0",
						hotpink: "ff69b4",
						indianred: "cd5c5c",
						indigo: "4b0082",
						ivory: "fffff0",
						khaki: "f0e68c",
						lavender: "e6e6fa",
						lavenderblush: "fff0f5",
						lawngreen: "7cfc00",
						lemonchiffon: "fffacd",
						lightblue: "add8e6",
						lightcoral: "f08080",
						lightcyan: "e0ffff",
						lightgoldenrodyellow: "fafad2",
						lightgray: "d3d3d3",
						lightgreen: "90ee90",
						lightgrey: "d3d3d3",
						lightpink: "ffb6c1",
						lightsalmon: "ffa07a",
						lightseagreen: "20b2aa",
						lightskyblue: "87cefa",
						lightslategray: "789",
						lightslategrey: "789",
						lightsteelblue: "b0c4de",
						lightyellow: "ffffe0",
						lime: "0f0",
						limegreen: "32cd32",
						linen: "faf0e6",
						magenta: "f0f",
						maroon: "800000",
						mediumaquamarine: "66cdaa",
						mediumblue: "0000cd",
						mediumorchid: "ba55d3",
						mediumpurple: "9370db",
						mediumseagreen: "3cb371",
						mediumslateblue: "7b68ee",
						mediumspringgreen: "00fa9a",
						mediumturquoise: "48d1cc",
						mediumvioletred: "c71585",
						midnightblue: "191970",
						mintcream: "f5fffa",
						mistyrose: "ffe4e1",
						moccasin: "ffe4b5",
						navajowhite: "ffdead",
						navy: "000080",
						oldlace: "fdf5e6",
						olive: "808000",
						olivedrab: "6b8e23",
						orange: "ffa500",
						orangered: "ff4500",
						orchid: "da70d6",
						palegoldenrod: "eee8aa",
						palegreen: "98fb98",
						paleturquoise: "afeeee",
						palevioletred: "db7093",
						papayawhip: "ffefd5",
						peachpuff: "ffdab9",
						peru: "cd853f",
						pink: "ffc0cb",
						plum: "dda0dd",
						powderblue: "b0e0e6",
						purple: "800080",
						rebeccapurple: "663399",
						red: "f00",
						rosybrown: "bc8f8f",
						royalblue: "4169e1",
						saddlebrown: "8b4513",
						salmon: "fa8072",
						sandybrown: "f4a460",
						seagreen: "2e8b57",
						seashell: "fff5ee",
						sienna: "a0522d",
						silver: "c0c0c0",
						skyblue: "87ceeb",
						slateblue: "6a5acd",
						slategray: "708090",
						slategrey: "708090",
						snow: "fffafa",
						springgreen: "00ff7f",
						steelblue: "4682b4",
						tan: "d2b48c",
						teal: "008080",
						thistle: "d8bfd8",
						tomato: "ff6347",
						turquoise: "40e0d0",
						violet: "ee82ee",
						wheat: "f5deb3",
						white: "fff",
						whitesmoke: "f5f5f5",
						yellow: "ff0",
						yellowgreen: "9acd32"
					}),
					E = (_.hexNames = (function (t) {
						var e,
							n = {};
						for (e in t) t.hasOwnProperty(e) && (n[t[e]] = e);
						return n;
					})(O));
				function T(t) {
					return (t = parseFloat(t)), (isNaN(t) || t < 0 || 1 < t) && (t = 1), t;
				}
				function A(t, e) {
					"string" == typeof (n = t) &&
						-1 != n.indexOf(".") &&
						1 === parseFloat(n) &&
						(t = "100%");
					var n = "string" == typeof t && -1 != t.indexOf("%");
					return (
						(t = b(e, w(0, parseFloat(t)))),
						n && (t = parseInt(t * e, 10) / 100),
						v.abs(t - e) < 1e-6 ? 1 : (t % e) / parseFloat(e)
					);
				}
				function I(t) {
					return b(1, w(0, t));
				}
				function j(t) {
					return parseInt(t, 16);
				}
				function P(t) {
					return 1 == t.length ? "0" + t : "" + t;
				}
				function N(t) {
					return t <= 1 && (t = 100 * t + "%"), t;
				}
				var D,
					R,
					M =
						((D =
							"[\\s|\\(]+(" +
							(R = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)") +
							")[,|\\s]+(" +
							R +
							")[,|\\s]+(" +
							R +
							")\\s*\\)?"),
						(R =
							"[\\s|\\(]+(" +
							R +
							")[,|\\s]+(" +
							R +
							")[,|\\s]+(" +
							R +
							")[,|\\s]+(" +
							R +
							")\\s*\\)?"),
						{
							rgb: new RegExp("rgb" + D),
							rgba: new RegExp("rgba" + R),
							hsl: new RegExp("hsl" + D),
							hsla: new RegExp("hsla" + R),
							hsv: new RegExp("hsv" + D),
							hsva: new RegExp("hsva" + R),
							hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
							hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
							hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
						});
				window.tinycolor = _;
			})(),
			It(function () {
				It.fn.spectrum.load && It.fn.spectrum.processNativeColorInputs();
			});
	}),
	(function () {
		var t = function (x) {
			(x.ui = x.ui || {}), (x.ui.version = "1.12.1");
			var i,
				r,
				C,
				k,
				o,
				s,
				a,
				u,
				c,
				n,
				l = 0,
				h = Array.prototype.slice;
			function S(t, e, n) {
				return [
					parseFloat(t[0]) * (c.test(t[0]) ? e / 100 : 1),
					parseFloat(t[1]) * (c.test(t[1]) ? n / 100 : 1)
				];
			}
			function O(t, e) {
				return parseInt(x.css(t, e), 10) || 0;
			}
			(x.cleanData =
				((i = x.cleanData),
				function (t) {
					for (var e, n, r = 0; null != (n = t[r]); r++)
						try {
							(e = x._data(n, "events")) && e.remove && x(n).triggerHandler("remove");
						} catch (t) {}
					i(t);
				})),
				(x.widget = function (t, n, e) {
					var r,
						i,
						o,
						s = {},
						a = t.split(".")[0],
						u = a + "-" + (t = t.split(".")[1]);
					return (
						e || ((e = n), (n = x.Widget)),
						x.isArray(e) && (e = x.extend.apply(null, [{}].concat(e))),
						(x.expr[":"][u.toLowerCase()] = function (t) {
							return !!x.data(t, u);
						}),
						(x[a] = x[a] || {}),
						(r = x[a][t]),
						(i = x[a][t] =
							function (t, e) {
								if (!this._createWidget) return new i(t, e);
								arguments.length && this._createWidget(t, e);
							}),
						x.extend(i, r, {
							version: e.version,
							_proto: x.extend({}, e),
							_childConstructors: []
						}),
						((o = new n()).options = x.widget.extend({}, o.options)),
						x.each(e, function (e, r) {
							function i() {
								return n.prototype[e].apply(this, arguments);
							}
							function o(t) {
								return n.prototype[e].apply(this, t);
							}
							x.isFunction(r)
								? (s[e] = function () {
										var t,
											e = this._super,
											n = this._superApply;
										return (
											(this._super = i),
											(this._superApply = o),
											(t = r.apply(this, arguments)),
											(this._super = e),
											(this._superApply = n),
											t
										);
									})
								: (s[e] = r);
						}),
						(i.prototype = x.widget.extend(
							o,
							{
								widgetEventPrefix: (r && o.widgetEventPrefix) || t
							},
							s,
							{
								constructor: i,
								namespace: a,
								widgetName: t,
								widgetFullName: u
							}
						)),
						r
							? (x.each(r._childConstructors, function (t, e) {
									var n = e.prototype;
									x.widget(n.namespace + "." + n.widgetName, i, e._proto);
								}),
								delete r._childConstructors)
							: n._childConstructors.push(i),
						x.widget.bridge(t, i),
						i
					);
				}),
				(x.widget.extend = function (t) {
					for (var e, n, r = h.call(arguments, 1), i = 0, o = r.length; i < o; i++)
						for (e in r[i])
							(n = r[i][e]),
								r[i].hasOwnProperty(e) &&
									void 0 !== n &&
									(x.isPlainObject(n)
										? (t[e] = x.isPlainObject(t[e])
												? x.widget.extend({}, t[e], n)
												: x.widget.extend({}, n))
										: (t[e] = n));
					return t;
				}),
				(x.widget.bridge = function (o, e) {
					var s = e.prototype.widgetFullName || o;
					x.fn[o] = function (n) {
						var t = "string" == typeof n,
							r = h.call(arguments, 1),
							i = this;
						return (
							t
								? this.length || "instance" !== n
									? this.each(function () {
											var t,
												e = x.data(this, s);
											return "instance" === n
												? ((i = e), !1)
												: e
													? x.isFunction(e[n]) && "_" !== n.charAt(0)
														? (t = e[n].apply(e, r)) !== e &&
															void 0 !== t
															? ((i =
																	t && t.jquery
																		? i.pushStack(t.get())
																		: t),
																!1)
															: void 0
														: x.error(
																"no such method '" +
																	n +
																	"' for " +
																	o +
																	" widget instance"
															)
													: x.error(
															"cannot call methods on " +
																o +
																" prior to initialization; attempted to call method '" +
																n +
																"'"
														);
										})
									: (i = void 0)
								: (r.length && (n = x.widget.extend.apply(null, [n].concat(r))),
									this.each(function () {
										var t = x.data(this, s);
										t
											? (t.option(n || {}), t._init && t._init())
											: x.data(this, s, new e(n, this));
									})),
							i
						);
					};
				}),
				(x.Widget = function () {}),
				(x.Widget._childConstructors = []),
				(x.Widget.prototype = {
					widgetName: "widget",
					widgetEventPrefix: "",
					defaultElement: "<div>",
					options: {
						classes: {},
						disabled: !1,
						create: null
					},
					_createWidget: function (t, e) {
						(e = x(e || this.defaultElement || this)[0]),
							(this.element = x(e)),
							(this.uuid = l++),
							(this.eventNamespace = "." + this.widgetName + this.uuid),
							(this.bindings = x()),
							(this.hoverable = x()),
							(this.focusable = x()),
							(this.classesElementLookup = {}),
							e !== this &&
								(x.data(e, this.widgetFullName, this),
								this._on(!0, this.element, {
									remove: function (t) {
										t.target === e && this.destroy();
									}
								}),
								(this.document = x(e.style ? e.ownerDocument : e.document || e)),
								(this.window = x(
									this.document[0].defaultView || this.document[0].parentWindow
								))),
							(this.options = x.widget.extend(
								{},
								this.options,
								this._getCreateOptions(),
								t
							)),
							this._create(),
							this.options.disabled && this._setOptionDisabled(this.options.disabled),
							this._trigger("create", null, this._getCreateEventData()),
							this._init();
					},
					_getCreateOptions: function () {
						return {};
					},
					_getCreateEventData: x.noop,
					_create: x.noop,
					_init: x.noop,
					destroy: function () {
						var n = this;
						this._destroy(),
							x.each(this.classesElementLookup, function (t, e) {
								n._removeClass(e, t);
							}),
							this.element.off(this.eventNamespace).removeData(this.widgetFullName),
							this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
							this.bindings.off(this.eventNamespace);
					},
					_destroy: x.noop,
					widget: function () {
						return this.element;
					},
					option: function (t, e) {
						var n,
							r,
							i,
							o = t;
						if (0 === arguments.length) return x.widget.extend({}, this.options);
						if ("string" == typeof t)
							if (((o = {}), (t = (n = t.split(".")).shift()), n.length)) {
								for (
									r = o[t] = x.widget.extend({}, this.options[t]), i = 0;
									i < n.length - 1;
									i++
								)
									(r[n[i]] = r[n[i]] || {}), (r = r[n[i]]);
								if (((t = n.pop()), 1 === arguments.length))
									return void 0 === r[t] ? null : r[t];
								r[t] = e;
							} else {
								if (1 === arguments.length)
									return void 0 === this.options[t] ? null : this.options[t];
								o[t] = e;
							}
						return this._setOptions(o), this;
					},
					_setOptions: function (t) {
						for (var e in t) this._setOption(e, t[e]);
						return this;
					},
					_setOption: function (t, e) {
						return (
							"classes" === t && this._setOptionClasses(e),
							(this.options[t] = e),
							"disabled" === t && this._setOptionDisabled(e),
							this
						);
					},
					_setOptionClasses: function (t) {
						var e, n, r;
						for (e in t)
							(r = this.classesElementLookup[e]),
								t[e] !== this.options.classes[e] &&
									r &&
									r.length &&
									((n = x(r.get())),
									this._removeClass(r, e),
									n.addClass(
										this._classes({
											element: n,
											keys: e,
											classes: t,
											add: !0
										})
									));
					},
					_setOptionDisabled: function (t) {
						this._toggleClass(
							this.widget(),
							this.widgetFullName + "-disabled",
							null,
							!!t
						),
							t &&
								(this._removeClass(this.hoverable, null, "ui-state-hover"),
								this._removeClass(this.focusable, null, "ui-state-focus"));
					},
					enable: function () {
						return this._setOptions({
							disabled: !1
						});
					},
					disable: function () {
						return this._setOptions({
							disabled: !0
						});
					},
					_classes: function (i) {
						var o = [],
							s = this;
						function t(t, e) {
							for (var n, r = 0; r < t.length; r++)
								(n = s.classesElementLookup[t[r]] || x()),
									(n = i.add
										? x(x.unique(n.get().concat(i.element.get())))
										: x(n.not(i.element).get())),
									(s.classesElementLookup[t[r]] = n),
									o.push(t[r]),
									e && i.classes[t[r]] && o.push(i.classes[t[r]]);
						}
						return (
							(i = x.extend(
								{
									element: this.element,
									classes: this.options.classes || {}
								},
								i
							)),
							this._on(i.element, {
								remove: "_untrackClassesElement"
							}),
							i.keys && t(i.keys.match(/\S+/g) || [], !0),
							i.extra && t(i.extra.match(/\S+/g) || []),
							o.join(" ")
						);
					},
					_untrackClassesElement: function (n) {
						var r = this;
						x.each(r.classesElementLookup, function (t, e) {
							-1 !== x.inArray(n.target, e) &&
								(r.classesElementLookup[t] = x(e.not(n.target).get()));
						});
					},
					_removeClass: function (t, e, n) {
						return this._toggleClass(t, e, n, !1);
					},
					_addClass: function (t, e, n) {
						return this._toggleClass(t, e, n, !0);
					},
					_toggleClass: function (t, e, n, r) {
						r = "boolean" == typeof r ? r : n;
						var i = "string" == typeof t || null === t,
							t = {
								extra: i ? e : n,
								keys: i ? t : e,
								element: i ? this.element : t,
								add: r
							};
						return t.element.toggleClass(this._classes(t), r), this;
					},
					_on: function (i, o, t) {
						var s,
							a = this;
						"boolean" != typeof i && ((t = o), (o = i), (i = !1)),
							t
								? ((o = s = x(o)), (this.bindings = this.bindings.add(o)))
								: ((t = o), (o = this.element), (s = this.widget())),
							x.each(t, function (t, e) {
								function n() {
									if (
										i ||
										(!0 !== a.options.disabled &&
											!x(this).hasClass("ui-state-disabled"))
									)
										return ("string" == typeof e ? a[e] : e).apply(
											a,
											arguments
										);
								}
								"string" != typeof e &&
									(n.guid = e.guid = e.guid || n.guid || x.guid++);
								var r = t.match(/^([\w:-]*)\s*(.*)$/),
									t = r[1] + a.eventNamespace,
									r = r[2];
								r ? s.on(t, r, n) : o.on(t, n);
							});
					},
					_off: function (t, e) {
						(e =
							(e || "").split(" ").join(this.eventNamespace + " ") +
							this.eventNamespace),
							t.off(e).off(e),
							(this.bindings = x(this.bindings.not(t).get())),
							(this.focusable = x(this.focusable.not(t).get())),
							(this.hoverable = x(this.hoverable.not(t).get()));
					},
					_delay: function (t, e) {
						var n = this;
						return setTimeout(function () {
							return ("string" == typeof t ? n[t] : t).apply(n, arguments);
						}, e || 0);
					},
					_hoverable: function (t) {
						(this.hoverable = this.hoverable.add(t)),
							this._on(t, {
								mouseenter: function (t) {
									this._addClass(x(t.currentTarget), null, "ui-state-hover");
								},
								mouseleave: function (t) {
									this._removeClass(x(t.currentTarget), null, "ui-state-hover");
								}
							});
					},
					_focusable: function (t) {
						(this.focusable = this.focusable.add(t)),
							this._on(t, {
								focusin: function (t) {
									this._addClass(x(t.currentTarget), null, "ui-state-focus");
								},
								focusout: function (t) {
									this._removeClass(x(t.currentTarget), null, "ui-state-focus");
								}
							});
					},
					_trigger: function (t, e, n) {
						var r,
							i,
							o = this.options[t];
						if (
							((n = n || {}),
							((e = x.Event(e)).type = (
								t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
							).toLowerCase()),
							(e.target = this.element[0]),
							(i = e.originalEvent))
						)
							for (r in i) r in e || (e[r] = i[r]);
						return (
							this.element.trigger(e, n),
							!(
								(x.isFunction(o) &&
									!1 === o.apply(this.element[0], [e].concat(n))) ||
								e.isDefaultPrevented()
							)
						);
					}
				}),
				x.each(
					{
						show: "fadeIn",
						hide: "fadeOut"
					},
					function (o, s) {
						x.Widget.prototype["_" + o] = function (e, t, n) {
							var r;
							"string" == typeof t &&
								(t = {
									effect: t
								});
							var i = t ? (!0 !== t && "number" != typeof t && t.effect) || s : o;
							"number" == typeof (t = t || {}) &&
								(t = {
									duration: t
								}),
								(r = !x.isEmptyObject(t)),
								(t.complete = n),
								t.delay && e.delay(t.delay),
								r && x.effects && x.effects.effect[i]
									? e[o](t)
									: i !== o && e[i]
										? e[i](t.duration, t.easing, n)
										: e.queue(function (t) {
												x(this)[o](), n && n.call(e[0]), t();
											});
						};
					}
				),
				x.widget,
				(C = Math.max),
				(k = Math.abs),
				(o = /left|center|right/),
				(s = /top|center|bottom/),
				(a = /[\+\-]\d+(\.[\d]+)?%?/),
				(u = /^\w+/),
				(c = /%$/),
				(n = x.fn.position),
				(x.position = {
					scrollbarWidth: function () {
						if (void 0 !== r) return r;
						var t,
							e = x(
								"<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
							),
							n = e.children()[0];
						return (
							x("body").append(e),
							(t = n.offsetWidth),
							e.css("overflow", "scroll"),
							t === (n = n.offsetWidth) && (n = e[0].clientWidth),
							e.remove(),
							(r = t - n)
						);
					},
					getScrollInfo: function (t) {
						var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
							n = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
							e =
								"scroll" === e ||
								("auto" === e && t.width < t.element[0].scrollWidth);
						return {
							width:
								"scroll" === n ||
								("auto" === n && t.height < t.element[0].scrollHeight)
									? x.position.scrollbarWidth()
									: 0,
							height: e ? x.position.scrollbarWidth() : 0
						};
					},
					getWithinInfo: function (t) {
						var e = x(t || window),
							n = x.isWindow(e[0]),
							r = !!e[0] && 9 === e[0].nodeType;
						return {
							element: e,
							isWindow: n,
							isDocument: r,
							offset:
								n || r
									? {
											left: 0,
											top: 0
										}
									: x(t).offset(),
							scrollLeft: e.scrollLeft(),
							scrollTop: e.scrollTop(),
							width: e.outerWidth(),
							height: e.outerHeight()
						};
					}
				}),
				(x.fn.position = function (h) {
					if (!h || !h.of) return n.apply(this, arguments);
					h = x.extend({}, h);
					var f,
						p,
						d,
						g,
						m,
						t,
						v = x(h.of),
						y = x.position.getWithinInfo(h.within),
						b = x.position.getScrollInfo(y),
						w = (h.collision || "flip").split(" "),
						_ = {},
						e =
							9 === (t = (e = v)[0]).nodeType
								? {
										width: e.width(),
										height: e.height(),
										offset: {
											top: 0,
											left: 0
										}
									}
								: x.isWindow(t)
									? {
											width: e.width(),
											height: e.height(),
											offset: {
												top: e.scrollTop(),
												left: e.scrollLeft()
											}
										}
									: t.preventDefault
										? {
												width: 0,
												height: 0,
												offset: {
													top: t.pageY,
													left: t.pageX
												}
											}
										: {
												width: e.outerWidth(),
												height: e.outerHeight(),
												offset: e.offset()
											};
					return (
						v[0].preventDefault && (h.at = "left top"),
						(p = e.width),
						(d = e.height),
						(g = e.offset),
						(m = x.extend({}, g)),
						x.each(["my", "at"], function () {
							var t,
								e,
								n = (h[this] || "").split(" ");
							1 === n.length &&
								(n = o.test(n[0])
									? n.concat(["center"])
									: s.test(n[0])
										? ["center"].concat(n)
										: ["center", "center"]),
								(n[0] = o.test(n[0]) ? n[0] : "center"),
								(n[1] = s.test(n[1]) ? n[1] : "center"),
								(t = a.exec(n[0])),
								(e = a.exec(n[1])),
								(_[this] = [t ? t[0] : 0, e ? e[0] : 0]),
								(h[this] = [u.exec(n[0])[0], u.exec(n[1])[0]]);
						}),
						1 === w.length && (w[1] = w[0]),
						"right" === h.at[0]
							? (m.left += p)
							: "center" === h.at[0] && (m.left += p / 2),
						"bottom" === h.at[1]
							? (m.top += d)
							: "center" === h.at[1] && (m.top += d / 2),
						(f = S(_.at, p, d)),
						(m.left += f[0]),
						(m.top += f[1]),
						this.each(function () {
							var n,
								t,
								s = x(this),
								a = s.outerWidth(),
								u = s.outerHeight(),
								e = O(this, "marginLeft"),
								r = O(this, "marginTop"),
								i = a + e + O(this, "marginRight") + b.width,
								o = u + r + O(this, "marginBottom") + b.height,
								c = x.extend({}, m),
								l = S(_.my, s.outerWidth(), s.outerHeight());
							"right" === h.my[0]
								? (c.left -= a)
								: "center" === h.my[0] && (c.left -= a / 2),
								"bottom" === h.my[1]
									? (c.top -= u)
									: "center" === h.my[1] && (c.top -= u / 2),
								(c.left += l[0]),
								(c.top += l[1]),
								(n = {
									marginLeft: e,
									marginTop: r
								}),
								x.each(["left", "top"], function (t, e) {
									x.ui.position[w[t]] &&
										x.ui.position[w[t]][e](c, {
											targetWidth: p,
											targetHeight: d,
											elemWidth: a,
											elemHeight: u,
											collisionPosition: n,
											collisionWidth: i,
											collisionHeight: o,
											offset: [f[0] + l[0], f[1] + l[1]],
											my: h.my,
											at: h.at,
											within: y,
											elem: s
										});
								}),
								h.using &&
									(t = function (t) {
										var e = g.left - c.left,
											n = e + p - a,
											r = g.top - c.top,
											i = r + d - u,
											o = {
												target: {
													element: v,
													left: g.left,
													top: g.top,
													width: p,
													height: d
												},
												element: {
													element: s,
													left: c.left,
													top: c.top,
													width: a,
													height: u
												},
												horizontal:
													n < 0 ? "left" : 0 < e ? "right" : "center",
												vertical:
													i < 0 ? "top" : 0 < r ? "bottom" : "middle"
											};
										p < a && k(e + n) < p && (o.horizontal = "center"),
											d < u && k(r + i) < d && (o.vertical = "middle"),
											C(k(e), k(n)) > C(k(r), k(i))
												? (o.important = "horizontal")
												: (o.important = "vertical"),
											h.using.call(this, t, o);
									}),
								s.offset(
									x.extend(c, {
										using: t
									})
								);
						})
					);
				}),
				(x.ui.position = {
					fit: {
						left: function (t, e) {
							var n = e.within,
								r = n.isWindow ? n.scrollLeft : n.offset.left,
								i = n.width,
								o = t.left - e.collisionPosition.marginLeft,
								s = r - o,
								a = o + e.collisionWidth - i - r;
							e.collisionWidth > i
								? 0 < s && a <= 0
									? ((n = t.left + s + e.collisionWidth - i - r),
										(t.left += s - n))
									: (t.left =
											!(0 < a && s <= 0) && a < s
												? r + i - e.collisionWidth
												: r)
								: 0 < s
									? (t.left += s)
									: 0 < a
										? (t.left -= a)
										: (t.left = C(t.left - o, t.left));
						},
						top: function (t, e) {
							var n = e.within,
								r = n.isWindow ? n.scrollTop : n.offset.top,
								i = e.within.height,
								o = t.top - e.collisionPosition.marginTop,
								s = r - o,
								a = o + e.collisionHeight - i - r;
							e.collisionHeight > i
								? 0 < s && a <= 0
									? ((n = t.top + s + e.collisionHeight - i - r),
										(t.top += s - n))
									: (t.top =
											!(0 < a && s <= 0) && a < s
												? r + i - e.collisionHeight
												: r)
								: 0 < s
									? (t.top += s)
									: 0 < a
										? (t.top -= a)
										: (t.top = C(t.top - o, t.top));
						}
					},
					flip: {
						left: function (t, e) {
							var n = e.within,
								r = n.offset.left + n.scrollLeft,
								i = n.width,
								o = n.isWindow ? n.scrollLeft : n.offset.left,
								s = t.left - e.collisionPosition.marginLeft,
								a = s - o,
								u = s + e.collisionWidth - i - o,
								c =
									"left" === e.my[0]
										? -e.elemWidth
										: "right" === e.my[0]
											? e.elemWidth
											: 0,
								n =
									"left" === e.at[0]
										? e.targetWidth
										: "right" === e.at[0]
											? -e.targetWidth
											: 0,
								s = -2 * e.offset[0];
							a < 0
								? ((r = t.left + c + n + s + e.collisionWidth - i - r) < 0 ||
										r < k(a)) &&
									(t.left += c + n + s)
								: 0 < u &&
									(0 <
										(o =
											t.left -
											e.collisionPosition.marginLeft +
											c +
											n +
											s -
											o) ||
										k(o) < u) &&
									(t.left += c + n + s);
						},
						top: function (t, e) {
							var n = e.within,
								r = n.offset.top + n.scrollTop,
								i = n.height,
								o = n.isWindow ? n.scrollTop : n.offset.top,
								s = t.top - e.collisionPosition.marginTop,
								a = s - o,
								u = s + e.collisionHeight - i - o,
								c =
									"top" === e.my[1]
										? -e.elemHeight
										: "bottom" === e.my[1]
											? e.elemHeight
											: 0,
								n =
									"top" === e.at[1]
										? e.targetHeight
										: "bottom" === e.at[1]
											? -e.targetHeight
											: 0,
								s = -2 * e.offset[1];
							a < 0
								? ((r = t.top + c + n + s + e.collisionHeight - i - r) < 0 ||
										r < k(a)) &&
									(t.top += c + n + s)
								: 0 < u &&
									(0 <
										(o =
											t.top -
											e.collisionPosition.marginTop +
											c +
											n +
											s -
											o) ||
										k(o) < u) &&
									(t.top += c + n + s);
						}
					},
					flipfit: {
						left: function () {
							x.ui.position.flip.left.apply(this, arguments),
								x.ui.position.fit.left.apply(this, arguments);
						},
						top: function () {
							x.ui.position.flip.top.apply(this, arguments),
								x.ui.position.fit.top.apply(this, arguments);
						}
					}
				}),
				x.ui.position,
				(x.fn.form = function () {
					return "string" == typeof this[0].form ? this.closest("form") : x(this[0].form);
				}),
				(x.ui.formResetMixin = {
					_formResetHandler: function () {
						var e = x(this);
						setTimeout(function () {
							var t = e.data("ui-form-reset-instances");
							x.each(t, function () {
								this.refresh();
							});
						});
					},
					_bindFormResetHandler: function () {
						var t;
						(this.form = this.element.form()),
							this.form.length &&
								((t = this.form.data("ui-form-reset-instances") || []).length ||
									this.form.on("reset.ui-form-reset", this._formResetHandler),
								t.push(this),
								this.form.data("ui-form-reset-instances", t));
					},
					_unbindFormResetHandler: function () {
						var t;
						this.form.length &&
							((t = this.form.data("ui-form-reset-instances")).splice(
								x.inArray(this, t),
								1
							),
							t.length
								? this.form.data("ui-form-reset-instances", t)
								: this.form
										.removeData("ui-form-reset-instances")
										.off("reset.ui-form-reset"));
					}
				}),
				(x.ui.keyCode = {
					BACKSPACE: 8,
					COMMA: 188,
					DELETE: 46,
					DOWN: 40,
					END: 35,
					ENTER: 13,
					ESCAPE: 27,
					HOME: 36,
					LEFT: 37,
					PAGE_DOWN: 34,
					PAGE_UP: 33,
					PERIOD: 190,
					RIGHT: 39,
					SPACE: 32,
					TAB: 9,
					UP: 38
				}),
				(x.ui.escapeSelector =
					((e = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g),
					function (t) {
						return t.replace(e, "\\$1");
					})),
				(x.fn.labels = function () {
					var t, e, n;
					return this[0].labels && this[0].labels.length
						? this.pushStack(this[0].labels)
						: ((e = this.eq(0).parents("label")),
							(t = this.attr("id")) &&
								((n = (n = this.eq(0).parents().last()).add(
									(n.length ? n : this).siblings()
								)),
								(t = "label[for='" + x.ui.escapeSelector(t) + "']"),
								(e = e.add(n.find(t).addBack(t)))),
							this.pushStack(e));
				}),
				x.fn.extend({
					uniqueId:
						((t = 0),
						function () {
							return this.each(function () {
								this.id || (this.id = "ui-id-" + ++t);
							});
						}),
					removeUniqueId: function () {
						return this.each(function () {
							/^ui-id-\d+$/.test(this.id) && x(this).removeAttr("id");
						});
					}
				});
			var e,
				t,
				f,
				p = /ui-corner-([a-z]){2,6}/g;
			x.widget("ui.controlgroup", {
				version: "1.12.1",
				defaultElement: "<div>",
				options: {
					direction: "horizontal",
					disabled: null,
					onlyVisible: !0,
					items: {
						button: "input[type=button], input[type=submit], input[type=reset], button, a",
						controlgroupLabel: ".ui-controlgroup-label",
						checkboxradio: "input[type='checkbox'], input[type='radio']",
						selectmenu: "select",
						spinner: ".ui-spinner-input"
					}
				},
				_create: function () {
					this._enhance();
				},
				_enhance: function () {
					this.element.attr("role", "toolbar"), this.refresh();
				},
				_destroy: function () {
					this._callChildMethod("destroy"),
						this.childWidgets.removeData("ui-controlgroup-data"),
						this.element.removeAttr("role"),
						this.options.items.controlgroupLabel &&
							this.element
								.find(this.options.items.controlgroupLabel)
								.find(".ui-controlgroup-label-contents")
								.contents()
								.unwrap();
				},
				_initWidgets: function () {
					var o = this,
						s = [];
					x.each(this.options.items, function (r, t) {
						var e, i;
						if (t)
							return "controlgroupLabel" === r
								? ((e = o.element.find(t)).each(function () {
										var t = x(this);
										t.children(".ui-controlgroup-label-contents").length ||
											t
												.contents()
												.wrapAll(
													"<span class='ui-controlgroup-label-contents'></span>"
												);
									}),
									o._addClass(
										e,
										null,
										"ui-widget ui-widget-content ui-state-default"
									),
									void (s = s.concat(e.get())))
								: void (
										x.fn[r] &&
										((i = o["_" + r + "Options"]
											? o["_" + r + "Options"]("middle")
											: {
													classes: {}
												}),
										o.element.find(t).each(function () {
											var t = x(this),
												e = t[r]("instance"),
												n = x.widget.extend({}, i);
											("button" === r && t.parent(".ui-spinner").length) ||
												((e = e || t[r]()[r]("instance")) &&
													(n.classes = o._resolveClassesValues(
														n.classes,
														e
													)),
												t[r](n),
												(n = t[r]("widget")),
												x.data(
													n[0],
													"ui-controlgroup-data",
													e || t[r]("instance")
												),
												s.push(n[0]));
										}))
									);
					}),
						(this.childWidgets = x(x.unique(s))),
						this._addClass(this.childWidgets, "ui-controlgroup-item");
				},
				_callChildMethod: function (e) {
					this.childWidgets.each(function () {
						var t = x(this).data("ui-controlgroup-data");
						t && t[e] && t[e]();
					});
				},
				_updateCornerClass: function (t, e) {
					e = this._buildSimpleOptions(e, "label").classes.label;
					this._removeClass(
						t,
						null,
						"ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
					),
						this._addClass(t, null, e);
				},
				_buildSimpleOptions: function (t, e) {
					var n = "vertical" === this.options.direction,
						r = {
							classes: {}
						};
					return (
						(r.classes[e] = {
							middle: "",
							first: "ui-corner-" + (n ? "top" : "left"),
							last: "ui-corner-" + (n ? "bottom" : "right"),
							only: "ui-corner-all"
						}[t]),
						r
					);
				},
				_spinnerOptions: function (t) {
					t = this._buildSimpleOptions(t, "ui-spinner");
					return (
						(t.classes["ui-spinner-up"] = ""), (t.classes["ui-spinner-down"] = ""), t
					);
				},
				_buttonOptions: function (t) {
					return this._buildSimpleOptions(t, "ui-button");
				},
				_checkboxradioOptions: function (t) {
					return this._buildSimpleOptions(t, "ui-checkboxradio-label");
				},
				_selectmenuOptions: function (t) {
					var e = "vertical" === this.options.direction;
					return {
						width: !!e && "auto",
						classes: {
							middle: {
								"ui-selectmenu-button-open": "",
								"ui-selectmenu-button-closed": ""
							},
							first: {
								"ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
								"ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
							},
							last: {
								"ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
								"ui-selectmenu-button-closed":
									"ui-corner-" + (e ? "bottom" : "right")
							},
							only: {
								"ui-selectmenu-button-open": "ui-corner-top",
								"ui-selectmenu-button-closed": "ui-corner-all"
							}
						}[t]
					};
				},
				_resolveClassesValues: function (n, r) {
					var i = {};
					return (
						x.each(n, function (t) {
							var e = r.options.classes[t] || "",
								e = x.trim(e.replace(p, ""));
							i[t] = (e + " " + n[t]).replace(/\s+/g, " ");
						}),
						i
					);
				},
				_setOption: function (t, e) {
					"direction" === t &&
						this._removeClass("ui-controlgroup-" + this.options.direction),
						this._super(t, e),
						"disabled" !== t
							? this.refresh()
							: this._callChildMethod(e ? "disable" : "enable");
				},
				refresh: function () {
					var i,
						o = this;
					this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction),
						"horizontal" === this.options.direction &&
							this._addClass(null, "ui-helper-clearfix"),
						this._initWidgets(),
						(i = this.childWidgets),
						this.options.onlyVisible && (i = i.filter(":visible")),
						i.length &&
							(x.each(["first", "last"], function (t, e) {
								var n,
									r = i[e]().data("ui-controlgroup-data");
								r && o["_" + r.widgetName + "Options"]
									? (((n = o["_" + r.widgetName + "Options"](
											1 === i.length ? "only" : e
										)).classes = o._resolveClassesValues(n.classes, r)),
										r.element[r.widgetName](n))
									: o._updateCornerClass(i[e](), e);
							}),
							this._callChildMethod("refresh"));
				}
			}),
				x.widget("ui.checkboxradio", [
					x.ui.formResetMixin,
					{
						version: "1.12.1",
						options: {
							disabled: null,
							label: null,
							icon: !0,
							classes: {
								"ui-checkboxradio-label": "ui-corner-all",
								"ui-checkboxradio-icon": "ui-corner-all"
							}
						},
						_getCreateOptions: function () {
							var t,
								e = this,
								n = this._super() || {};
							return (
								this._readType(),
								(t = this.element.labels()),
								(this.label = x(t[t.length - 1])),
								this.label.length ||
									x.error("No label found for checkboxradio widget"),
								(this.originalLabel = ""),
								this.label
									.contents()
									.not(this.element[0])
									.each(function () {
										e.originalLabel +=
											3 === this.nodeType ? x(this).text() : this.outerHTML;
									}),
								this.originalLabel && (n.label = this.originalLabel),
								null != (t = this.element[0].disabled) && (n.disabled = t),
								n
							);
						},
						_create: function () {
							var t = this.element[0].checked;
							this._bindFormResetHandler(),
								null == this.options.disabled &&
									(this.options.disabled = this.element[0].disabled),
								this._setOption("disabled", this.options.disabled),
								this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
								this._addClass(
									this.label,
									"ui-checkboxradio-label",
									"ui-button ui-widget"
								),
								"radio" === this.type &&
									this._addClass(this.label, "ui-checkboxradio-radio-label"),
								this.options.label && this.options.label !== this.originalLabel
									? this._updateLabel()
									: this.originalLabel &&
										(this.options.label = this.originalLabel),
								this._enhance(),
								t &&
									(this._addClass(
										this.label,
										"ui-checkboxradio-checked",
										"ui-state-active"
									),
									this.icon && this._addClass(this.icon, null, "ui-state-hover")),
								this._on({
									change: "_toggleClasses",
									focus: function () {
										this._addClass(
											this.label,
											null,
											"ui-state-focus ui-visual-focus"
										);
									},
									blur: function () {
										this._removeClass(
											this.label,
											null,
											"ui-state-focus ui-visual-focus"
										);
									}
								});
						},
						_readType: function () {
							var t = this.element[0].nodeName.toLowerCase();
							(this.type = this.element[0].type),
								("input" === t && /radio|checkbox/.test(this.type)) ||
									x.error(
										"Can't create checkboxradio on element.nodeName=" +
											t +
											" and element.type=" +
											this.type
									);
						},
						_enhance: function () {
							this._updateIcon(this.element[0].checked);
						},
						widget: function () {
							return this.label;
						},
						_getRadioGroup: function () {
							var t = this.element[0].name,
								e = "input[name='" + x.ui.escapeSelector(t) + "']";
							return t
								? (this.form.length
										? x(this.form[0].elements).filter(e)
										: x(e).filter(function () {
												return 0 === x(this).form().length;
											})
									).not(this.element)
								: x([]);
						},
						_toggleClasses: function () {
							var t = this.element[0].checked;
							this._toggleClass(
								this.label,
								"ui-checkboxradio-checked",
								"ui-state-active",
								t
							),
								this.options.icon &&
									"checkbox" === this.type &&
									this._toggleClass(
										this.icon,
										null,
										"ui-icon-check ui-state-checked",
										t
									)._toggleClass(this.icon, null, "ui-icon-blank", !t),
								"radio" === this.type &&
									this._getRadioGroup().each(function () {
										var t = x(this).checkboxradio("instance");
										t &&
											t._removeClass(
												t.label,
												"ui-checkboxradio-checked",
												"ui-state-active"
											);
									});
						},
						_destroy: function () {
							this._unbindFormResetHandler(),
								this.icon && (this.icon.remove(), this.iconSpace.remove());
						},
						_setOption: function (t, e) {
							if ("label" !== t || e) {
								if ((this._super(t, e), "disabled" === t))
									return (
										this._toggleClass(this.label, null, "ui-state-disabled", e),
										void (this.element[0].disabled = e)
									);
								this.refresh();
							}
						},
						_updateIcon: function (t) {
							var e = "ui-icon ui-icon-background ";
							this.options.icon
								? (this.icon ||
										((this.icon = x("<span>")),
										(this.iconSpace = x("<span> </span>")),
										this._addClass(
											this.iconSpace,
											"ui-checkboxradio-icon-space"
										)),
									"checkbox" === this.type
										? ((e += t
												? "ui-icon-check ui-state-checked"
												: "ui-icon-blank"),
											this._removeClass(
												this.icon,
												null,
												t ? "ui-icon-blank" : "ui-icon-check"
											))
										: (e += "ui-icon-blank"),
									this._addClass(this.icon, "ui-checkboxradio-icon", e),
									t ||
										this._removeClass(
											this.icon,
											null,
											"ui-icon-check ui-state-checked"
										),
									this.icon.prependTo(this.label).after(this.iconSpace))
								: void 0 !== this.icon &&
									(this.icon.remove(), this.iconSpace.remove(), delete this.icon);
						},
						_updateLabel: function () {
							var t = this.label.contents().not(this.element[0]);
							this.icon && (t = t.not(this.icon[0])),
								this.iconSpace && (t = t.not(this.iconSpace[0])),
								t.remove(),
								this.label.append(this.options.label);
						},
						refresh: function () {
							var t = this.element[0].checked,
								e = this.element[0].disabled;
							this._updateIcon(t),
								this._toggleClass(
									this.label,
									"ui-checkboxradio-checked",
									"ui-state-active",
									t
								),
								null !== this.options.label && this._updateLabel(),
								e !== this.options.disabled &&
									this._setOptions({
										disabled: e
									});
						}
					}
				]),
				x.ui.checkboxradio,
				x.widget("ui.button", {
					version: "1.12.1",
					defaultElement: "<button>",
					options: {
						classes: {
							"ui-button": "ui-corner-all"
						},
						disabled: null,
						icon: null,
						iconPosition: "beginning",
						label: null,
						showLabel: !0
					},
					_getCreateOptions: function () {
						var t,
							e = this._super() || {};
						return (
							(this.isInput = this.element.is("input")),
							null != (t = this.element[0].disabled) && (e.disabled = t),
							(this.originalLabel = this.isInput
								? this.element.val()
								: this.element.html()),
							this.originalLabel && (e.label = this.originalLabel),
							e
						);
					},
					_create: function () {
						!this.option.showLabel & !this.options.icon &&
							(this.options.showLabel = !0),
							null == this.options.disabled &&
								(this.options.disabled = this.element[0].disabled || !1),
							(this.hasTitle = !!this.element.attr("title")),
							this.options.label &&
								this.options.label !== this.originalLabel &&
								(this.isInput
									? this.element.val(this.options.label)
									: this.element.html(this.options.label)),
							this._addClass("ui-button", "ui-widget"),
							this._setOption("disabled", this.options.disabled),
							this._enhance(),
							this.element.is("a") &&
								this._on({
									keyup: function (t) {
										t.keyCode === x.ui.keyCode.SPACE &&
											(t.preventDefault(),
											this.element[0].click
												? this.element[0].click()
												: this.element.trigger("click"));
									}
								});
					},
					_enhance: function () {
						this.element.is("button") || this.element.attr("role", "button"),
							this.options.icon &&
								(this._updateIcon("icon", this.options.icon),
								this._updateTooltip());
					},
					_updateTooltip: function () {
						(this.title = this.element.attr("title")),
							this.options.showLabel ||
								this.title ||
								this.element.attr("title", this.options.label);
					},
					_updateIcon: function (t, e) {
						var n = "iconPosition" !== t,
							r = n ? this.options.iconPosition : e,
							t = "top" === r || "bottom" === r;
						this.icon
							? n && this._removeClass(this.icon, null, this.options.icon)
							: ((this.icon = x("<span>")),
								this._addClass(this.icon, "ui-button-icon", "ui-icon"),
								this.options.showLabel || this._addClass("ui-button-icon-only")),
							n && this._addClass(this.icon, null, e),
							this._attachIcon(r),
							t
								? (this._addClass(this.icon, null, "ui-widget-icon-block"),
									this.iconSpace && this.iconSpace.remove())
								: (this.iconSpace ||
										((this.iconSpace = x("<span> </span>")),
										this._addClass(this.iconSpace, "ui-button-icon-space")),
									this._removeClass(this.icon, null, "ui-wiget-icon-block"),
									this._attachIconSpace(r));
					},
					_destroy: function () {
						this.element.removeAttr("role"),
							this.icon && this.icon.remove(),
							this.iconSpace && this.iconSpace.remove(),
							this.hasTitle || this.element.removeAttr("title");
					},
					_attachIconSpace: function (t) {
						this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
					},
					_attachIcon: function (t) {
						this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
					},
					_setOptions: function (t) {
						var e = (void 0 === t.showLabel ? this.options : t).showLabel,
							n = (void 0 === t.icon ? this.options : t).icon;
						e || n || (t.showLabel = !0), this._super(t);
					},
					_setOption: function (t, e) {
						"icon" === t &&
							(e
								? this._updateIcon(t, e)
								: this.icon &&
									(this.icon.remove(),
									this.iconSpace && this.iconSpace.remove())),
							"iconPosition" === t && this._updateIcon(t, e),
							"showLabel" === t &&
								(this._toggleClass("ui-button-icon-only", null, !e),
								this._updateTooltip()),
							"label" === t &&
								(this.isInput
									? this.element.val(e)
									: (this.element.html(e),
										this.icon &&
											(this._attachIcon(this.options.iconPosition),
											this._attachIconSpace(this.options.iconPosition)))),
							this._super(t, e),
							"disabled" === t &&
								(this._toggleClass(null, "ui-state-disabled", e),
								(this.element[0].disabled = e) && this.element.blur());
					},
					refresh: function () {
						var t = this.element.is("input, button")
							? this.element[0].disabled
							: this.element.hasClass("ui-button-disabled");
						t !== this.options.disabled &&
							this._setOptions({
								disabled: t
							}),
							this._updateTooltip();
					}
				}),
				!1 !== x.uiBackCompat &&
					(x.widget("ui.button", x.ui.button, {
						options: {
							text: !0,
							icons: {
								primary: null,
								secondary: null
							}
						},
						_create: function () {
							this.options.showLabel &&
								!this.options.text &&
								(this.options.showLabel = this.options.text),
								!this.options.showLabel &&
									this.options.text &&
									(this.options.text = this.options.showLabel),
								this.options.icon ||
								(!this.options.icons.primary && !this.options.icons.secondary)
									? this.options.icon &&
										(this.options.icons.primary = this.options.icon)
									: this.options.icons.primary
										? (this.options.icon = this.options.icons.primary)
										: ((this.options.icon = this.options.icons.secondary),
											(this.options.iconPosition = "end")),
								this._super();
						},
						_setOption: function (t, e) {
							"text" !== t
								? ("showLabel" === t && (this.options.text = e),
									"icon" === t && (this.options.icons.primary = e),
									"icons" === t &&
										(e.primary
											? (this._super("icon", e.primary),
												this._super("iconPosition", "beginning"))
											: e.secondary &&
												(this._super("icon", e.secondary),
												this._super("iconPosition", "end"))),
									this._superApply(arguments))
								: this._super("showLabel", e);
						}
					}),
					(x.fn.button =
						((f = x.fn.button),
						function () {
							return !this.length ||
								(this.length && "INPUT" !== this[0].tagName) ||
								(this.length &&
									"INPUT" === this[0].tagName &&
									"checkbox" !== this.attr("type") &&
									"radio" !== this.attr("type"))
								? f.apply(this, arguments)
								: (x.ui.checkboxradio || x.error("Checkboxradio widget missing"),
									0 === arguments.length
										? this.checkboxradio({
												icon: !1
											})
										: this.checkboxradio.apply(this, arguments));
						})),
					(x.fn.buttonset = function () {
						return (
							x.ui.controlgroup || x.error("Controlgroup widget missing"),
							"option" === arguments[0] && "items" === arguments[1] && arguments[2]
								? this.controlgroup.apply(this, [
										arguments[0],
										"items.button",
										arguments[2]
									])
								: "option" === arguments[0] && "items" === arguments[1]
									? this.controlgroup.apply(this, [arguments[0], "items.button"])
									: ("object" == typeof arguments[0] &&
											arguments[0].items &&
											(arguments[0].items = {
												button: arguments[0].items
											}),
										this.controlgroup.apply(this, arguments))
						);
					})),
				x.ui.button,
				(x.ui.safeActiveElement = function (e) {
					var n;
					try {
						n = e.activeElement;
					} catch (t) {
						n = e.body;
					}
					return (n = n || e.body).nodeName || (n = e.body), n;
				}),
				x.widget("ui.menu", {
					version: "1.12.1",
					defaultElement: "<ul>",
					delay: 300,
					options: {
						icons: {
							submenu: "ui-icon-caret-1-e"
						},
						items: "> *",
						menus: "ul",
						position: {
							my: "left top",
							at: "right top"
						},
						role: "menu",
						blur: null,
						focus: null,
						select: null
					},
					_create: function () {
						(this.activeMenu = this.element),
							(this.mouseHandled = !1),
							this.element.uniqueId().attr({
								role: this.options.role,
								tabIndex: 0
							}),
							this._addClass("ui-menu", "ui-widget ui-widget-content"),
							this._on({
								"mousedown .ui-menu-item": function (t) {
									t.preventDefault();
								},
								"click .ui-menu-item": function (t) {
									var e = x(t.target),
										n = x(x.ui.safeActiveElement(this.document[0]));
									!this.mouseHandled &&
										e.not(".ui-state-disabled").length &&
										(this.select(t),
										t.isPropagationStopped() || (this.mouseHandled = !0),
										e.has(".ui-menu").length
											? this.expand(t)
											: !this.element.is(":focus") &&
												n.closest(".ui-menu").length &&
												(this.element.trigger("focus", [!0]),
												this.active &&
													1 === this.active.parents(".ui-menu").length &&
													clearTimeout(this.timer)));
								},
								"mouseenter .ui-menu-item": function (t) {
									var e, n;
									this.previousFilter ||
										((e = x(t.target).closest(".ui-menu-item")),
										(n = x(t.currentTarget)),
										e[0] === n[0] &&
											(this._removeClass(
												n.siblings().children(".ui-state-active"),
												null,
												"ui-state-active"
											),
											this.focus(t, n)));
								},
								mouseleave: "collapseAll",
								"mouseleave .ui-menu": "collapseAll",
								focus: function (t, e) {
									var n =
										this.active || this.element.find(this.options.items).eq(0);
									e || this.focus(t, n);
								},
								blur: function (t) {
									this._delay(function () {
										x.contains(
											this.element[0],
											x.ui.safeActiveElement(this.document[0])
										) || this.collapseAll(t);
									});
								},
								keydown: "_keydown"
							}),
							this.refresh(),
							this._on(this.document, {
								click: function (t) {
									this._closeOnDocumentClick(t) && this.collapseAll(t),
										(this.mouseHandled = !1);
								}
							});
					},
					_destroy: function () {
						var t = this.element
							.find(".ui-menu-item")
							.removeAttr("role aria-disabled")
							.children(".ui-menu-item-wrapper")
							.removeUniqueId()
							.removeAttr("tabIndex role aria-haspopup");
						this.element
							.removeAttr("aria-activedescendant")
							.find(".ui-menu")
							.addBack()
							.removeAttr(
								"role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex"
							)
							.removeUniqueId()
							.show(),
							t.children().each(function () {
								var t = x(this);
								t.data("ui-menu-submenu-caret") && t.remove();
							});
					},
					_keydown: function (t) {
						var e,
							n,
							r,
							i = !0;
						switch (t.keyCode) {
							case x.ui.keyCode.PAGE_UP:
								this.previousPage(t);
								break;
							case x.ui.keyCode.PAGE_DOWN:
								this.nextPage(t);
								break;
							case x.ui.keyCode.HOME:
								this._move("first", "first", t);
								break;
							case x.ui.keyCode.END:
								this._move("last", "last", t);
								break;
							case x.ui.keyCode.UP:
								this.previous(t);
								break;
							case x.ui.keyCode.DOWN:
								this.next(t);
								break;
							case x.ui.keyCode.LEFT:
								this.collapse(t);
								break;
							case x.ui.keyCode.RIGHT:
								this.active &&
									!this.active.is(".ui-state-disabled") &&
									this.expand(t);
								break;
							case x.ui.keyCode.ENTER:
							case x.ui.keyCode.SPACE:
								this._activate(t);
								break;
							case x.ui.keyCode.ESCAPE:
								this.collapse(t);
								break;
							default:
								(i = !1),
									(e = this.previousFilter || ""),
									(r = !1),
									(n =
										96 <= t.keyCode && t.keyCode <= 105
											? (t.keyCode - 96).toString()
											: String.fromCharCode(t.keyCode)),
									clearTimeout(this.filterTimer),
									n === e ? (r = !0) : (n = e + n),
									(e = this._filterMenuItems(n)),
									(e =
										r && -1 !== e.index(this.active.next())
											? this.active.nextAll(".ui-menu-item")
											: e).length ||
										((n = String.fromCharCode(t.keyCode)),
										(e = this._filterMenuItems(n))),
									e.length
										? (this.focus(t, e),
											(this.previousFilter = n),
											(this.filterTimer = this._delay(function () {
												delete this.previousFilter;
											}, 1e3)))
										: delete this.previousFilter;
						}
						i && t.preventDefault();
					},
					_activate: function (t) {
						this.active &&
							!this.active.is(".ui-state-disabled") &&
							(this.active.children("[aria-haspopup='true']").length
								? this.expand(t)
								: this.select(t));
					},
					refresh: function () {
						var t,
							e,
							r = this,
							i = this.options.icons.submenu,
							n = this.element.find(this.options.menus);
						this._toggleClass(
							"ui-menu-icons",
							null,
							!!this.element.find(".ui-icon").length
						),
							(e = n
								.filter(":not(.ui-menu)")
								.hide()
								.attr({
									role: this.options.role,
									"aria-hidden": "true",
									"aria-expanded": "false"
								})
								.each(function () {
									var t = x(this),
										e = t.prev(),
										n = x("<span>").data("ui-menu-submenu-caret", !0);
									r._addClass(n, "ui-menu-icon", "ui-icon " + i),
										e.attr("aria-haspopup", "true").prepend(n),
										t.attr("aria-labelledby", e.attr("id"));
								})),
							this._addClass(e, "ui-menu", "ui-widget ui-widget-content ui-front"),
							(t = n.add(this.element).find(this.options.items))
								.not(".ui-menu-item")
								.each(function () {
									var t = x(this);
									r._isDivider(t) &&
										r._addClass(t, "ui-menu-divider", "ui-widget-content");
								}),
							(n = (e = t.not(".ui-menu-item, .ui-menu-divider"))
								.children()
								.not(".ui-menu")
								.uniqueId()
								.attr({
									tabIndex: -1,
									role: this._itemRole()
								})),
							this._addClass(e, "ui-menu-item")._addClass(n, "ui-menu-item-wrapper"),
							t.filter(".ui-state-disabled").attr("aria-disabled", "true"),
							this.active &&
								!x.contains(this.element[0], this.active[0]) &&
								this.blur();
					},
					_itemRole: function () {
						return {
							menu: "menuitem",
							listbox: "option"
						}[this.options.role];
					},
					_setOption: function (t, e) {
						var n;
						"icons" === t &&
							((n = this.element.find(".ui-menu-icon")),
							this._removeClass(n, null, this.options.icons.submenu)._addClass(
								n,
								null,
								e.submenu
							)),
							this._super(t, e);
					},
					_setOptionDisabled: function (t) {
						this._super(t),
							this.element.attr("aria-disabled", String(t)),
							this._toggleClass(null, "ui-state-disabled", !!t);
					},
					focus: function (t, e) {
						var n;
						this.blur(t, t && "focus" === t.type),
							this._scrollIntoView(e),
							(this.active = e.first()),
							(n = this.active.children(".ui-menu-item-wrapper")),
							this._addClass(n, null, "ui-state-active"),
							this.options.role &&
								this.element.attr("aria-activedescendant", n.attr("id")),
							(n = this.active
								.parent()
								.closest(".ui-menu-item")
								.children(".ui-menu-item-wrapper")),
							this._addClass(n, null, "ui-state-active"),
							t && "keydown" === t.type
								? this._close()
								: (this.timer = this._delay(function () {
										this._close();
									}, this.delay)),
							(n = e.children(".ui-menu")).length &&
								t &&
								/^mouse/.test(t.type) &&
								this._startOpening(n),
							(this.activeMenu = e.parent()),
							this._trigger("focus", t, {
								item: e
							});
					},
					_scrollIntoView: function (t) {
						var e, n, r;
						this._hasScroll() &&
							((n = parseFloat(x.css(this.activeMenu[0], "borderTopWidth")) || 0),
							(r = parseFloat(x.css(this.activeMenu[0], "paddingTop")) || 0),
							(e = t.offset().top - this.activeMenu.offset().top - n - r),
							(n = this.activeMenu.scrollTop()),
							(r = this.activeMenu.height()),
							(t = t.outerHeight()),
							e < 0
								? this.activeMenu.scrollTop(n + e)
								: r < e + t && this.activeMenu.scrollTop(n + e - r + t));
					},
					blur: function (t, e) {
						e || clearTimeout(this.timer),
							this.active &&
								(this._removeClass(
									this.active.children(".ui-menu-item-wrapper"),
									null,
									"ui-state-active"
								),
								this._trigger("blur", t, {
									item: this.active
								}),
								(this.active = null));
					},
					_startOpening: function (t) {
						clearTimeout(this.timer),
							"true" === t.attr("aria-hidden") &&
								(this.timer = this._delay(function () {
									this._close(), this._open(t);
								}, this.delay));
					},
					_open: function (t) {
						var e = x.extend(
							{
								of: this.active
							},
							this.options.position
						);
						clearTimeout(this.timer),
							this.element
								.find(".ui-menu")
								.not(t.parents(".ui-menu"))
								.hide()
								.attr("aria-hidden", "true"),
							t
								.show()
								.removeAttr("aria-hidden")
								.attr("aria-expanded", "true")
								.position(e);
					},
					collapseAll: function (e, n) {
						clearTimeout(this.timer),
							(this.timer = this._delay(function () {
								var t = n
									? this.element
									: x(e && e.target).closest(this.element.find(".ui-menu"));
								t.length || (t = this.element),
									this._close(t),
									this.blur(e),
									this._removeClass(
										t.find(".ui-state-active"),
										null,
										"ui-state-active"
									),
									(this.activeMenu = t);
							}, this.delay));
					},
					_close: function (t) {
						(t = t || (this.active ? this.active.parent() : this.element))
							.find(".ui-menu")
							.hide()
							.attr("aria-hidden", "true")
							.attr("aria-expanded", "false");
					},
					_closeOnDocumentClick: function (t) {
						return !x(t.target).closest(".ui-menu").length;
					},
					_isDivider: function (t) {
						return !/[^\-\u2014\u2013\s]/.test(t.text());
					},
					collapse: function (t) {
						var e =
							this.active &&
							this.active.parent().closest(".ui-menu-item", this.element);
						e && e.length && (this._close(), this.focus(t, e));
					},
					expand: function (t) {
						var e =
							this.active &&
							this.active.children(".ui-menu ").find(this.options.items).first();
						e &&
							e.length &&
							(this._open(e.parent()),
							this._delay(function () {
								this.focus(t, e);
							}));
					},
					next: function (t) {
						this._move("next", "first", t);
					},
					previous: function (t) {
						this._move("prev", "last", t);
					},
					isFirstItem: function () {
						return this.active && !this.active.preval(".ui-menu-item").length;
					},
					isLastItem: function () {
						return this.active && !this.active.nextAll(".ui-menu-item").length;
					},
					_move: function (t, e, n) {
						var r;
						this.active &&
							(r =
								"first" === t || "last" === t
									? this.active["first" === t ? "prevAll" : "nextAll"](
											".ui-menu-item"
										).eq(-1)
									: this.active[t + "All"](".ui-menu-item").eq(0)),
							(r && r.length && this.active) ||
								(r = this.activeMenu.find(this.options.items)[e]()),
							this.focus(n, r);
					},
					nextPage: function (t) {
						var e, n, r;
						this.active
							? this.isLastItem() ||
								(this._hasScroll()
									? ((n = this.active.offset().top),
										(r = this.element.height()),
										this.active.nextAll(".ui-menu-item").each(function () {
											return (e = x(this)).offset().top - n - r < 0;
										}),
										this.focus(t, e))
									: this.focus(
											t,
											this.activeMenu
												.find(this.options.items)
												[this.active ? "last" : "first"]()
										))
							: this.next(t);
					},
					previousPage: function (t) {
						var e, n, r;
						this.active
							? this.isFirstItem() ||
								(this._hasScroll()
									? ((n = this.active.offset().top),
										(r = this.element.height()),
										this.active.preval(".ui-menu-item").each(function () {
											return 0 < (e = x(this)).offset().top - n + r;
										}),
										this.focus(t, e))
									: this.focus(
											t,
											this.activeMenu.find(this.options.items).first()
										))
							: this.next(t);
					},
					_hasScroll: function () {
						return this.element.outerHeight() < this.element.prop("scrollHeight");
					},
					select: function (t) {
						this.active = this.active || x(t.target).closest(".ui-menu-item");
						var e = {
							item: this.active
						};
						this.active.has(".ui-menu").length || this.collapseAll(t, !0),
							this._trigger("select", t, e);
					},
					_filterMenuItems: function (t) {
						var t = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
							e = new RegExp("^" + t, "i");
						return this.activeMenu
							.find(this.options.items)
							.filter(".ui-menu-item")
							.filter(function () {
								return e.test(
									x.trim(x(this).children(".ui-menu-item-wrapper").text())
								);
							});
					}
				}),
				(x.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
			var d = !1;
			function g(e) {
				return function () {
					var t = this.element.val();
					e.apply(this, arguments),
						this._refresh(),
						t !== this.element.val() && this._trigger("change");
				};
			}
			x(document).on("mouseup", function () {
				d = !1;
			}),
				x.widget("ui.mouse", {
					version: "1.12.1",
					options: {
						cancel: "input, textarea, button, select, option",
						distance: 1,
						delay: 0
					},
					_mouseInit: function () {
						var e = this;
						this.element
							.on("mousedown." + this.widgetName, function (t) {
								return e._mouseDown(t);
							})
							.on("click." + this.widgetName, function (t) {
								if (!0 === x.data(t.target, e.widgetName + ".preventClickEvent"))
									return (
										x.removeData(t.target, e.widgetName + ".preventClickEvent"),
										t.stopImmediatePropagation(),
										!1
									);
							}),
							(this.started = !1);
					},
					_mouseDestroy: function () {
						this.element.off("." + this.widgetName),
							this._mouseMoveDelegate &&
								this.document
									.off("mousemove." + this.widgetName, this._mouseMoveDelegate)
									.off("mouseup." + this.widgetName, this._mouseUpDelegate);
					},
					_mouseDown: function (t) {
						if (!d) {
							(this._mouseMoved = !1),
								this._mouseStarted && this._mouseUp(t),
								(this._mouseDownEvent = t);
							var e = this,
								n = 1 === t.which,
								r =
									!(
										"string" != typeof this.options.cancel || !t.target.nodeName
									) && x(t.target).closest(this.options.cancel).length;
							return (
								!(n && !r && this._mouseCapture(t)) ||
								((this.mouseDelayMet = !this.options.delay),
								this.mouseDelayMet ||
									(this._mouseDelayTimer = setTimeout(function () {
										e.mouseDelayMet = !0;
									}, this.options.delay)),
								this._mouseDistanceMet(t) &&
								this._mouseDelayMet(t) &&
								((this._mouseStarted = !1 !== this._mouseStart(t)),
								!this._mouseStarted)
									? (t.preventDefault(), !0)
									: (!0 ===
											x.data(
												t.target,
												this.widgetName + ".preventClickEvent"
											) &&
											x.removeData(
												t.target,
												this.widgetName + ".preventClickEvent"
											),
										(this._mouseMoveDelegate = function (t) {
											return e._mouseMove(t);
										}),
										(this._mouseUpDelegate = function (t) {
											return e._mouseUp(t);
										}),
										this.document
											.on(
												"mousemove." + this.widgetName,
												this._mouseMoveDelegate
											)
											.on(
												"mouseup." + this.widgetName,
												this._mouseUpDelegate
											),
										t.preventDefault(),
										(d = !0)))
							);
						}
					},
					_mouseMove: function (t) {
						if (this._mouseMoved) {
							if (
								x.ui.ie &&
								(!document.documentMode || document.documentMode < 9) &&
								!t.button
							)
								return this._mouseUp(t);
							if (!t.which)
								if (
									t.originalEvent.altKey ||
									t.originalEvent.ctrlKey ||
									t.originalEvent.metaKey ||
									t.originalEvent.shiftKey
								)
									this.ignoreMissingWhich = !0;
								else if (!this.ignoreMissingWhich) return this._mouseUp(t);
						}
						return (
							(t.which || t.button) && (this._mouseMoved = !0),
							this._mouseStarted
								? (this._mouseDrag(t), t.preventDefault())
								: (this._mouseDistanceMet(t) &&
										this._mouseDelayMet(t) &&
										((this._mouseStarted =
											!1 !== this._mouseStart(this._mouseDownEvent, t)),
										this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
									!this._mouseStarted)
						);
					},
					_mouseUp: function (t) {
						this.document
							.off("mousemove." + this.widgetName, this._mouseMoveDelegate)
							.off("mouseup." + this.widgetName, this._mouseUpDelegate),
							this._mouseStarted &&
								((this._mouseStarted = !1),
								t.target === this._mouseDownEvent.target &&
									x.data(t.target, this.widgetName + ".preventClickEvent", !0),
								this._mouseStop(t)),
							this._mouseDelayTimer &&
								(clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
							(this.ignoreMissingWhich = !1),
							(d = !1),
							t.preventDefault();
					},
					_mouseDistanceMet: function (t) {
						return (
							Math.max(
								Math.abs(this._mouseDownEvent.pageX - t.pageX),
								Math.abs(this._mouseDownEvent.pageY - t.pageY)
							) >= this.options.distance
						);
					},
					_mouseDelayMet: function () {
						return this.mouseDelayMet;
					},
					_mouseStart: function () {},
					_mouseDrag: function () {},
					_mouseStop: function () {},
					_mouseCapture: function () {
						return !0;
					}
				}),
				x.widget("ui.selectmenu", [
					x.ui.formResetMixin,
					{
						version: "1.12.1",
						defaultElement: "<select>",
						options: {
							appendTo: null,
							classes: {
								"ui-selectmenu-button-open": "ui-corner-top",
								"ui-selectmenu-button-closed": "ui-corner-all"
							},
							disabled: null,
							icons: {
								button: "ui-icon-triangle-1-s"
							},
							position: {
								my: "left top",
								at: "left bottom",
								collision: "none"
							},
							width: !1,
							change: null,
							close: null,
							focus: null,
							open: null,
							select: null
						},
						_create: function () {
							var t = this.element.uniqueId().attr("id");
							(this.ids = {
								element: t,
								button: t + "-button",
								menu: t + "-menu"
							}),
								this._drawButton(),
								this._drawMenu(),
								this._bindFormResetHandler(),
								(this._rendered = !1),
								(this.menuItems = x());
						},
						_drawButton: function () {
							var t,
								e = this,
								n = this._parseOption(
									this.element.find("option:selected"),
									this.element[0].selectedIndex
								);
							(this.labels = this.element.labels().attr("for", this.ids.button)),
								this._on(this.labels, {
									click: function (t) {
										this.button.focus(), t.preventDefault();
									}
								}),
								this.element.hide(),
								(this.button = x("<span>", {
									tabindex: this.options.disabled ? -1 : 0,
									id: this.ids.button,
									role: "combobox",
									"aria-expanded": "false",
									"aria-autocomplete": "list",
									"aria-owns": this.ids.menu,
									"aria-haspopup": "true",
									title: this.element.attr("title")
								}).insertAfter(this.element)),
								this._addClass(
									this.button,
									"ui-selectmenu-button ui-selectmenu-button-closed",
									"ui-button ui-widget"
								),
								(t = x("<span>").appendTo(this.button)),
								this._addClass(
									t,
									"ui-selectmenu-icon",
									"ui-icon " + this.options.icons.button
								),
								(this.buttonItem = this._renderButtonItem(n).appendTo(this.button)),
								!1 !== this.options.width && this._resizeButton(),
								this._on(this.button, this._buttonEvents),
								this.button.one("focusin", function () {
									e._rendered || e._refreshMenu();
								});
						},
						_drawMenu: function () {
							var n = this;
							(this.menu = x("<ul>", {
								"aria-hidden": "true",
								"aria-labelledby": this.ids.button,
								id: this.ids.menu
							})),
								(this.menuWrap = x("<div>").append(this.menu)),
								this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
								this.menuWrap.appendTo(this._appendTo()),
								(this.menuInstance = this.menu
									.menu({
										classes: {
											"ui-menu": "ui-corner-bottom"
										},
										role: "listbox",
										select: function (t, e) {
											t.preventDefault(),
												n._setSelection(),
												n._select(e.item.data("ui-selectmenu-item"), t);
										},
										focus: function (t, e) {
											e = e.item.data("ui-selectmenu-item");
											null != n.focusIndex &&
												e.index !== n.focusIndex &&
												(n._trigger("focus", t, {
													item: e
												}),
												n.isOpen || n._select(e, t)),
												(n.focusIndex = e.index),
												n.button.attr(
													"aria-activedescendant",
													n.menuItems.eq(e.index).attr("id")
												);
										}
									})
									.menu("instance")),
								this.menuInstance._off(this.menu, "mouseleave"),
								(this.menuInstance._closeOnDocumentClick = function () {
									return !1;
								}),
								(this.menuInstance._isDivider = function () {
									return !1;
								});
						},
						refresh: function () {
							this._refreshMenu(),
								this.buttonItem.replaceWith(
									(this.buttonItem = this._renderButtonItem(
										this._getSelectedItem().data("ui-selectmenu-item") || {}
									))
								),
								null === this.options.width && this._resizeButton();
						},
						_refreshMenu: function () {
							var t = this.element.find("option");
							this.menu.empty(),
								this._parseOptions(t),
								this._renderMenu(this.menu, this.items),
								this.menuInstance.refresh(),
								(this.menuItems = this.menu
									.find("li")
									.not(".ui-selectmenu-optgroup")
									.find(".ui-menu-item-wrapper")),
								(this._rendered = !0),
								t.length &&
									((t = this._getSelectedItem()),
									this.menuInstance.focus(null, t),
									this._setAria(t.data("ui-selectmenu-item")),
									this._setOption("disabled", this.element.prop("disabled")));
						},
						open: function (t) {
							this.options.disabled ||
								(this._rendered
									? (this._removeClass(
											this.menu.find(".ui-state-active"),
											null,
											"ui-state-active"
										),
										this.menuInstance.focus(null, this._getSelectedItem()))
									: this._refreshMenu(),
								this.menuItems.length &&
									((this.isOpen = !0),
									this._toggleAttr(),
									this._resizeMenu(),
									this._position(),
									this._on(this.document, this._documentClick),
									this._trigger("open", t)));
						},
						_position: function () {
							this.menuWrap.position(
								x.extend(
									{
										of: this.button
									},
									this.options.position
								)
							);
						},
						close: function (t) {
							this.isOpen &&
								((this.isOpen = !1),
								this._toggleAttr(),
								(this.range = null),
								this._off(this.document),
								this._trigger("close", t));
						},
						widget: function () {
							return this.button;
						},
						menuWidget: function () {
							return this.menu;
						},
						_renderButtonItem: function (t) {
							var e = x("<span>");
							return (
								this._setText(e, t.label),
								this._addClass(e, "ui-selectmenu-text"),
								e
							);
						},
						_renderMenu: function (r, t) {
							var i = this,
								o = "";
							x.each(t, function (t, e) {
								var n;
								e.optgroup !== o &&
									((n = x("<li>", {
										text: e.optgroup
									})),
									i._addClass(
										n,
										"ui-selectmenu-optgroup",
										"ui-menu-divider" +
											(e.element.parent("optgroup").prop("disabled")
												? " ui-state-disabled"
												: "")
									),
									n.appendTo(r),
									(o = e.optgroup)),
									i._renderItemData(r, e);
							});
						},
						_renderItemData: function (t, e) {
							return this._renderItem(t, e).data("ui-selectmenu-item", e);
						},
						_renderItem: function (t, e) {
							var n = x("<li>"),
								r = x("<div>", {
									title: e.element.attr("title")
								});
							return (
								e.disabled && this._addClass(n, null, "ui-state-disabled"),
								this._setText(r, e.label),
								n.append(r).appendTo(t)
							);
						},
						_setText: function (t, e) {
							e ? t.text(e) : t.html("&#160;");
						},
						_move: function (t, e) {
							var n,
								r = ".ui-menu-item";
							this.isOpen
								? (n = this.menuItems.eq(this.focusIndex).parent("li"))
								: ((n = this.menuItems
										.eq(this.element[0].selectedIndex)
										.parent("li")),
									(r += ":not(.ui-state-disabled)")),
								(r =
									"first" === t || "last" === t
										? n["first" === t ? "prevAll" : "nextAll"](r).eq(-1)
										: n[t + "All"](r).eq(0)).length &&
									this.menuInstance.focus(e, r);
						},
						_getSelectedItem: function () {
							return this.menuItems.eq(this.element[0].selectedIndex).parent("li");
						},
						_toggle: function (t) {
							this[this.isOpen ? "close" : "open"](t);
						},
						_setSelection: function () {
							var t;
							this.range &&
								(window.getSelection
									? ((t = window.getSelection()).removeAllRanges(),
										t.addRange(this.range))
									: this.range.select(),
								this.button.focus());
						},
						_documentClick: {
							mousedown: function (t) {
								this.isOpen &&
									(x(t.target).closest(
										".ui-selectmenu-menu, #" +
											x.ui.escapeSelector(this.ids.button)
									).length ||
										this.close(t));
							}
						},
						_buttonEvents: {
							mousedown: function () {
								var t;
								window.getSelection
									? (t = window.getSelection()).rangeCount &&
										(this.range = t.getRangeAt(0))
									: (this.range = document.selection.createRange());
							},
							click: function (t) {
								this._setSelection(), this._toggle(t);
							},
							keydown: function (t) {
								var e = !0;
								switch (t.keyCode) {
									case x.ui.keyCode.TAB:
									case x.ui.keyCode.ESCAPE:
										this.close(t), (e = !1);
										break;
									case x.ui.keyCode.ENTER:
										this.isOpen && this._selectFocusedItem(t);
										break;
									case x.ui.keyCode.UP:
										t.altKey ? this._toggle(t) : this._move("prev", t);
										break;
									case x.ui.keyCode.DOWN:
										t.altKey ? this._toggle(t) : this._move("next", t);
										break;
									case x.ui.keyCode.SPACE:
										this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
										break;
									case x.ui.keyCode.LEFT:
										this._move("prev", t);
										break;
									case x.ui.keyCode.RIGHT:
										this._move("next", t);
										break;
									case x.ui.keyCode.HOME:
									case x.ui.keyCode.PAGE_UP:
										this._move("first", t);
										break;
									case x.ui.keyCode.END:
									case x.ui.keyCode.PAGE_DOWN:
										this._move("last", t);
										break;
									default:
										this.menu.trigger(t), (e = !1);
								}
								e && t.preventDefault();
							}
						},
						_selectFocusedItem: function (t) {
							var e = this.menuItems.eq(this.focusIndex).parent("li");
							e.hasClass("ui-state-disabled") ||
								this._select(e.data("ui-selectmenu-item"), t);
						},
						_select: function (t, e) {
							var n = this.element[0].selectedIndex;
							(this.element[0].selectedIndex = t.index),
								this.buttonItem.replaceWith(
									(this.buttonItem = this._renderButtonItem(t))
								),
								this._setAria(t),
								this._trigger("select", e, {
									item: t
								}),
								t.index !== n &&
									this._trigger("change", e, {
										item: t
									}),
								this.close(e);
						},
						_setAria: function (t) {
							t = this.menuItems.eq(t.index).attr("id");
							this.button.attr({
								"aria-labelledby": t,
								"aria-activedescendant": t
							}),
								this.menu.attr("aria-activedescendant", t);
						},
						_setOption: function (t, e) {
							var n;
							"icons" === t &&
								((n = this.button.find("span.ui-icon")),
								this._removeClass(n, null, this.options.icons.button)._addClass(
									n,
									null,
									e.button
								)),
								this._super(t, e),
								"appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
								"width" === t && this._resizeButton();
						},
						_setOptionDisabled: function (t) {
							this._super(t),
								this.menuInstance.option("disabled", t),
								this.button.attr("aria-disabled", t),
								this._toggleClass(this.button, null, "ui-state-disabled", t),
								this.element.prop("disabled", t),
								t
									? (this.button.attr("tabindex", -1), this.close())
									: this.button.attr("tabindex", 0);
						},
						_appendTo: function () {
							var t = this.options.appendTo;
							return (
								((t =
									t &&
									(t.jquery || t.nodeType
										? x(t)
										: this.document.find(t).eq(0))) &&
									t[0]) ||
									(t = this.element.closest(".ui-front, dialog")),
								t.length || (t = this.document[0].body),
								t
							);
						},
						_toggleAttr: function () {
							this.button.attr("aria-expanded", this.isOpen),
								this._removeClass(
									this.button,
									"ui-selectmenu-button-" + (this.isOpen ? "closed" : "open")
								)
									._addClass(
										this.button,
										"ui-selectmenu-button-" + (this.isOpen ? "open" : "closed")
									)
									._toggleClass(
										this.menuWrap,
										"ui-selectmenu-open",
										null,
										this.isOpen
									),
								this.menu.attr("aria-hidden", !this.isOpen);
						},
						_resizeButton: function () {
							var t = this.options.width;
							!1 !== t
								? (null === t &&
										((t = this.element.show().outerWidth()),
										this.element.hide()),
									this.button.outerWidth(t))
								: this.button.css("width", "");
						},
						_resizeMenu: function () {
							this.menu.outerWidth(
								Math.max(
									this.button.outerWidth(),
									this.menu.width("").outerWidth() + 1
								)
							);
						},
						_getCreateOptions: function () {
							var t = this._super();
							return (t.disabled = this.element.prop("disabled")), t;
						},
						_parseOptions: function (t) {
							var n = this,
								r = [];
							t.each(function (t, e) {
								r.push(n._parseOption(x(e), t));
							}),
								(this.items = r);
						},
						_parseOption: function (t, e) {
							var n = t.parent("optgroup");
							return {
								element: t,
								index: e,
								value: t.val(),
								label: t.text(),
								optgroup: n.attr("label") || "",
								disabled: n.prop("disabled") || t.prop("disabled")
							};
						},
						_destroy: function () {
							this._unbindFormResetHandler(),
								this.menuWrap.remove(),
								this.button.remove(),
								this.element.show(),
								this.element.removeUniqueId(),
								this.labels.attr("for", this.ids.element);
						}
					}
				]),
				x.widget("ui.slider", x.ui.mouse, {
					version: "1.12.1",
					widgetEventPrefix: "slide",
					options: {
						animate: !1,
						classes: {
							"ui-slider": "ui-corner-all",
							"ui-slider-handle": "ui-corner-all",
							"ui-slider-range": "ui-corner-all ui-widget-header"
						},
						distance: 0,
						max: 100,
						min: 0,
						orientation: "horizontal",
						range: !1,
						step: 1,
						value: 0,
						values: null,
						change: null,
						slide: null,
						start: null,
						stop: null
					},
					numPages: 5,
					_create: function () {
						(this._keySliding = !1),
							(this._mouseSliding = !1),
							(this._animateOff = !0),
							(this._handleIndex = null),
							this._detectOrientation(),
							this._mouseInit(),
							this._calculateNewMax(),
							this._addClass(
								"ui-slider ui-slider-" + this.orientation,
								"ui-widget ui-widget-content"
							),
							this._refresh(),
							(this._animateOff = !1);
					},
					_refresh: function () {
						this._createRange(),
							this._createHandles(),
							this._setupEvents(),
							this._refreshValue();
					},
					_createHandles: function () {
						var t,
							e = this.options,
							n = this.element.find(".ui-slider-handle"),
							r = [],
							i = (e.values && e.values.length) || 1;
						for (
							n.length > i && (n.slice(i).remove(), (n = n.slice(0, i))),
								t = n.length;
							t < i;
							t++
						)
							r.push("<span tabindex='0'></span>");
						(this.handles = n.add(x(r.join("")).appendTo(this.element))),
							this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
							(this.handle = this.handles.eq(0)),
							this.handles.each(function (t) {
								x(this).data("ui-slider-handle-index", t).attr("tabIndex", 0);
							});
					},
					_createRange: function () {
						var t = this.options;
						t.range
							? (!0 === t.range &&
									(t.values
										? t.values.length && 2 !== t.values.length
											? (t.values = [t.values[0], t.values[0]])
											: x.isArray(t.values) && (t.values = t.values.slice(0))
										: (t.values = [this._valueMin(), this._valueMin()])),
								this.range && this.range.length
									? (this._removeClass(
											this.range,
											"ui-slider-range-min ui-slider-range-max"
										),
										this.range.css({
											left: "",
											bottom: ""
										}))
									: ((this.range = x("<div>").appendTo(this.element)),
										this._addClass(this.range, "ui-slider-range")),
								("min" !== t.range && "max" !== t.range) ||
									this._addClass(this.range, "ui-slider-range-" + t.range))
							: (this.range && this.range.remove(), (this.range = null));
					},
					_setupEvents: function () {
						this._off(this.handles),
							this._on(this.handles, this._handleEvents),
							this._hoverable(this.handles),
							this._focusable(this.handles);
					},
					_destroy: function () {
						this.handles.remove(),
							this.range && this.range.remove(),
							this._mouseDestroy();
					},
					_mouseCapture: function (t) {
						var n,
							r,
							i,
							o,
							e,
							s,
							a = this,
							u = this.options;
						return (
							!u.disabled &&
							((this.elementSize = {
								width: this.element.outerWidth(),
								height: this.element.outerHeight()
							}),
							(this.elementOffset = this.element.offset()),
							(s = {
								x: t.pageX,
								y: t.pageY
							}),
							(n = this._normValueFromMouse(s)),
							(r = this._valueMax() - this._valueMin() + 1),
							this.handles.each(function (t) {
								var e = Math.abs(n - a.values(t));
								(e < r ||
									(r === e &&
										(t === a._lastChangedValue || a.values(t) === u.min))) &&
									((r = e), (i = x(this)), (o = t));
							}),
							!1 !== this._start(t, o) &&
								((this._mouseSliding = !0),
								(this._handleIndex = o),
								this._addClass(i, null, "ui-state-active"),
								i.trigger("focus"),
								(e = i.offset()),
								(s = !x(t.target).parents().addBack().is(".ui-slider-handle")),
								(this._clickOffset = s
									? {
											left: 0,
											top: 0
										}
									: {
											left: t.pageX - e.left,
											top:
												t.pageY -
												e.top -
												i.height() / 2 -
												(parseInt(i.css("borderTopWidth"), 10) || 0) -
												(parseInt(i.css("borderBottomWidth"), 10) || 0) +
												(parseInt(i.css("marginTop"), 10) || 0)
										}),
								(this._animateOff = !0)))
						);
					},
					_mouseStart: function () {
						return !0;
					},
					_mouseDrag: function (t) {
						var e = {
								x: t.pageX,
								y: t.pageY
							},
							e = this._normValueFromMouse(e);
						return this._slide(t, this._handleIndex, e), !1;
					},
					_mouseStop: function (t) {
						return (
							this._removeClass(this.handles, null, "ui-state-active"),
							(this._mouseSliding = !1),
							this._stop(t, this._handleIndex),
							this._change(t, this._handleIndex),
							(this._handleIndex = null),
							(this._clickOffset = null),
							(this._animateOff = !1)
						);
					},
					_detectOrientation: function () {
						this.orientation =
							"vertical" === this.options.orientation ? "vertical" : "horizontal";
					},
					_normValueFromMouse: function (t) {
						var e,
							t =
								"horizontal" === this.orientation
									? ((e = this.elementSize.width),
										t.x -
											this.elementOffset.left -
											(this._clickOffset ? this._clickOffset.left : 0))
									: ((e = this.elementSize.height),
										t.y -
											this.elementOffset.top -
											(this._clickOffset ? this._clickOffset.top : 0));
						return (
							1 < (t = t / e) && (t = 1),
							t < 0 && (t = 0),
							"vertical" === this.orientation && (t = 1 - t),
							(e = this._valueMax() - this._valueMin()),
							(e = this._valueMin() + t * e),
							this._trimAlignValue(e)
						);
					},
					_uiHash: function (t, e, n) {
						var r = {
							handle: this.handles[t],
							handleIndex: t,
							value: void 0 !== e ? e : this.value()
						};
						return (
							this._hasMultipleValues() &&
								((r.value = void 0 !== e ? e : this.values(t)),
								(r.values = n || this.values())),
							r
						);
					},
					_hasMultipleValues: function () {
						return this.options.values && this.options.values.length;
					},
					_start: function (t, e) {
						return this._trigger("start", t, this._uiHash(e));
					},
					_slide: function (t, e, n) {
						var r,
							i = this.value(),
							o = this.values();
						this._hasMultipleValues() &&
							((r = this.values(e ? 0 : 1)),
							(i = this.values(e)),
							2 === this.options.values.length &&
								!0 === this.options.range &&
								(n = 0 === e ? Math.min(r, n) : Math.max(r, n)),
							(o[e] = n)),
							n !== i &&
								!1 !== this._trigger("slide", t, this._uiHash(e, n, o)) &&
								(this._hasMultipleValues() ? this.values(e, n) : this.value(n));
					},
					_stop: function (t, e) {
						this._trigger("stop", t, this._uiHash(e));
					},
					_change: function (t, e) {
						this._keySliding ||
							this._mouseSliding ||
							((this._lastChangedValue = e),
							this._trigger("change", t, this._uiHash(e)));
					},
					value: function (t) {
						return arguments.length
							? ((this.options.value = this._trimAlignValue(t)),
								this._refreshValue(),
								void this._change(null, 0))
							: this._value();
					},
					values: function (t, e) {
						var n, r, i;
						if (1 < arguments.length)
							return (
								(this.options.values[t] = this._trimAlignValue(e)),
								this._refreshValue(),
								void this._change(null, t)
							);
						if (!arguments.length) return this._values();
						if (!x.isArray(t))
							return this._hasMultipleValues() ? this._values(t) : this.value();
						for (n = this.options.values, r = t, i = 0; i < n.length; i += 1)
							(n[i] = this._trimAlignValue(r[i])), this._change(null, i);
						this._refreshValue();
					},
					_setOption: function (t, e) {
						var n,
							r = 0;
						switch (
							("range" === t &&
								!0 === this.options.range &&
								("min" === e
									? ((this.options.value = this._values(0)),
										(this.options.values = null))
									: "max" === e &&
										((this.options.value = this._values(
											this.options.values.length - 1
										)),
										(this.options.values = null))),
							x.isArray(this.options.values) && (r = this.options.values.length),
							this._super(t, e),
							t)
						) {
							case "orientation":
								this._detectOrientation(),
									this._removeClass(
										"ui-slider-horizontal ui-slider-vertical"
									)._addClass("ui-slider-" + this.orientation),
									this._refreshValue(),
									this.options.range && this._refreshRange(e),
									this.handles.css("horizontal" === e ? "bottom" : "left", "");
								break;
							case "value":
								(this._animateOff = !0),
									this._refreshValue(),
									this._change(null, 0),
									(this._animateOff = !1);
								break;
							case "values":
								for (
									this._animateOff = !0, this._refreshValue(), n = r - 1;
									0 <= n;
									n--
								)
									this._change(null, n);
								this._animateOff = !1;
								break;
							case "step":
							case "min":
							case "max":
								(this._animateOff = !0),
									this._calculateNewMax(),
									this._refreshValue(),
									(this._animateOff = !1);
								break;
							case "range":
								(this._animateOff = !0), this._refresh(), (this._animateOff = !1);
						}
					},
					_setOptionDisabled: function (t) {
						this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
					},
					_value: function () {
						var t = this.options.value;
						return this._trimAlignValue(t);
					},
					_values: function (t) {
						var e, n, r;
						if (arguments.length)
							return (e = this.options.values[t]), this._trimAlignValue(e);
						if (this._hasMultipleValues()) {
							for (n = this.options.values.slice(), r = 0; r < n.length; r += 1)
								n[r] = this._trimAlignValue(n[r]);
							return n;
						}
						return [];
					},
					_trimAlignValue: function (t) {
						if (t <= this._valueMin()) return this._valueMin();
						if (t >= this._valueMax()) return this._valueMax();
						var e = 0 < this.options.step ? this.options.step : 1,
							n = (t - this._valueMin()) % e,
							t = t - n;
						return (
							2 * Math.abs(n) >= e && (t += 0 < n ? e : -e), parseFloat(t.toFixed(5))
						);
					},
					_calculateNewMax: function () {
						var t = this.options.max,
							e = this._valueMin(),
							n = this.options.step;
						(t = Math.round((t - e) / n) * n + e) > this.options.max && (t -= n),
							(this.max = parseFloat(t.toFixed(this._precision())));
					},
					_precision: function () {
						var t = this._precisionOf(this.options.step);
						return (
							null !== this.options.min &&
								(t = Math.max(t, this._precisionOf(this.options.min))),
							t
						);
					},
					_precisionOf: function (t) {
						var e = t.toString(),
							t = e.indexOf(".");
						return -1 === t ? 0 : e.length - t - 1;
					},
					_valueMin: function () {
						return this.options.min;
					},
					_valueMax: function () {
						return this.max;
					},
					_refreshRange: function (t) {
						"vertical" === t &&
							this.range.css({
								width: "",
								left: ""
							}),
							"horizontal" === t &&
								this.range.css({
									height: "",
									bottom: ""
								});
					},
					_refreshValue: function () {
						var e,
							n,
							t,
							r,
							i,
							o = this.options.range,
							s = this.options,
							a = this,
							u = !this._animateOff && s.animate,
							c = {};
						this._hasMultipleValues()
							? this.handles.each(function (t) {
									(n =
										((a.values(t) - a._valueMin()) /
											(a._valueMax() - a._valueMin())) *
										100),
										(c["horizontal" === a.orientation ? "left" : "bottom"] =
											n + "%"),
										x(this).stop(1, 1)[u ? "animate" : "css"](c, s.animate),
										!0 === a.options.range &&
											("horizontal" === a.orientation
												? (0 === t &&
														a.range.stop(1, 1)[u ? "animate" : "css"](
															{
																left: n + "%"
															},
															s.animate
														),
													1 === t &&
														a.range[u ? "animate" : "css"](
															{
																width: n - e + "%"
															},
															{
																queue: !1,
																duration: s.animate
															}
														))
												: (0 === t &&
														a.range.stop(1, 1)[u ? "animate" : "css"](
															{
																bottom: n + "%"
															},
															s.animate
														),
													1 === t &&
														a.range[u ? "animate" : "css"](
															{
																height: n - e + "%"
															},
															{
																queue: !1,
																duration: s.animate
															}
														))),
										(e = n);
								})
							: ((t = this.value()),
								(r = this._valueMin()),
								(i = this._valueMax()),
								(n = i !== r ? ((t - r) / (i - r)) * 100 : 0),
								(c["horizontal" === this.orientation ? "left" : "bottom"] =
									n + "%"),
								this.handle.stop(1, 1)[u ? "animate" : "css"](c, s.animate),
								"min" === o &&
									"horizontal" === this.orientation &&
									this.range.stop(1, 1)[u ? "animate" : "css"](
										{
											width: n + "%"
										},
										s.animate
									),
								"max" === o &&
									"horizontal" === this.orientation &&
									this.range.stop(1, 1)[u ? "animate" : "css"](
										{
											width: 100 - n + "%"
										},
										s.animate
									),
								"min" === o &&
									"vertical" === this.orientation &&
									this.range.stop(1, 1)[u ? "animate" : "css"](
										{
											height: n + "%"
										},
										s.animate
									),
								"max" === o &&
									"vertical" === this.orientation &&
									this.range.stop(1, 1)[u ? "animate" : "css"](
										{
											height: 100 - n + "%"
										},
										s.animate
									));
					},
					_handleEvents: {
						keydown: function (t) {
							var e,
								n,
								r,
								i = x(t.target).data("ui-slider-handle-index");
							switch (t.keyCode) {
								case x.ui.keyCode.HOME:
								case x.ui.keyCode.END:
								case x.ui.keyCode.PAGE_UP:
								case x.ui.keyCode.PAGE_DOWN:
								case x.ui.keyCode.UP:
								case x.ui.keyCode.RIGHT:
								case x.ui.keyCode.DOWN:
								case x.ui.keyCode.LEFT:
									if (
										(t.preventDefault(),
										!this._keySliding &&
											((this._keySliding = !0),
											this._addClass(x(t.target), null, "ui-state-active"),
											!1 === this._start(t, i)))
									)
										return;
							}
							switch (
								((r = this.options.step),
								(e = n = this._hasMultipleValues() ? this.values(i) : this.value()),
								t.keyCode)
							) {
								case x.ui.keyCode.HOME:
									n = this._valueMin();
									break;
								case x.ui.keyCode.END:
									n = this._valueMax();
									break;
								case x.ui.keyCode.PAGE_UP:
									n = this._trimAlignValue(
										e + (this._valueMax() - this._valueMin()) / this.numPages
									);
									break;
								case x.ui.keyCode.PAGE_DOWN:
									n = this._trimAlignValue(
										e - (this._valueMax() - this._valueMin()) / this.numPages
									);
									break;
								case x.ui.keyCode.UP:
								case x.ui.keyCode.RIGHT:
									if (e === this._valueMax()) return;
									n = this._trimAlignValue(e + r);
									break;
								case x.ui.keyCode.DOWN:
								case x.ui.keyCode.LEFT:
									if (e === this._valueMin()) return;
									n = this._trimAlignValue(e - r);
							}
							this._slide(t, i, n);
						},
						keyup: function (t) {
							var e = x(t.target).data("ui-slider-handle-index");
							this._keySliding &&
								((this._keySliding = !1),
								this._stop(t, e),
								this._change(t, e),
								this._removeClass(x(t.target), null, "ui-state-active"));
						}
					}
				}),
				x.widget("ui.spinner", {
					version: "1.12.1",
					defaultElement: "<input>",
					widgetEventPrefix: "spin",
					options: {
						classes: {
							"ui-spinner": "ui-corner-all",
							"ui-spinner-down": "ui-corner-br",
							"ui-spinner-up": "ui-corner-tr"
						},
						culture: null,
						icons: {
							down: "ui-icon-triangle-1-s",
							up: "ui-icon-triangle-1-n"
						},
						incremental: !0,
						max: null,
						min: null,
						numberFormat: null,
						page: 10,
						step: 1,
						change: null,
						spin: null,
						start: null,
						stop: null
					},
					_create: function () {
						this._setOption("max", this.options.max),
							this._setOption("min", this.options.min),
							this._setOption("step", this.options.step),
							"" !== this.value() && this._value(this.element.val(), !0),
							this._draw(),
							this._on(this._events),
							this._refresh(),
							this._on(this.window, {
								beforeunload: function () {
									this.element.removeAttr("autocomplete");
								}
							});
					},
					_getCreateOptions: function () {
						var r = this._super(),
							i = this.element;
						return (
							x.each(["min", "max", "step"], function (t, e) {
								var n = i.attr(e);
								null != n && n.length && (r[e] = n);
							}),
							r
						);
					},
					_events: {
						keydown: function (t) {
							this._start(t) && this._keydown(t) && t.preventDefault();
						},
						keyup: "_stop",
						focus: function () {
							this.previous = this.element.val();
						},
						blur: function (t) {
							this.cancelBlur
								? delete this.cancelBlur
								: (this._stop(),
									this._refresh(),
									this.previous !== this.element.val() &&
										this._trigger("change", t));
						},
						mousewheel: function (t, e) {
							if (e) {
								if (!this.spinning && !this._start(t)) return !1;
								this._spin((0 < e ? 1 : -1) * this.options.step, t),
									clearTimeout(this.mousewheelTimer),
									(this.mousewheelTimer = this._delay(function () {
										this.spinning && this._stop(t);
									}, 100)),
									t.preventDefault();
							}
						},
						"mousedown .ui-spinner-button": function (t) {
							var e;
							function n() {
								this.element[0] === x.ui.safeActiveElement(this.document[0]) ||
									(this.element.trigger("focus"),
									(this.previous = e),
									this._delay(function () {
										this.previous = e;
									}));
							}
							(e =
								this.element[0] === x.ui.safeActiveElement(this.document[0])
									? this.previous
									: this.element.val()),
								t.preventDefault(),
								n.call(this),
								(this.cancelBlur = !0),
								this._delay(function () {
									delete this.cancelBlur, n.call(this);
								}),
								!1 !== this._start(t) &&
									this._repeat(
										null,
										x(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
										t
									);
						},
						"mouseup .ui-spinner-button": "_stop",
						"mouseenter .ui-spinner-button": function (t) {
							if (x(t.currentTarget).hasClass("ui-state-active"))
								return (
									!1 !== this._start(t) &&
									void this._repeat(
										null,
										x(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
										t
									)
								);
						},
						"mouseleave .ui-spinner-button": "_stop"
					},
					_enhance: function () {
						this.uiSpinner = this.element
							.attr("autocomplete", "off")
							.wrap("<span>")
							.parent()
							.append("<a></a><a></a>");
					},
					_draw: function () {
						this._enhance(),
							this._addClass(
								this.uiSpinner,
								"ui-spinner",
								"ui-widget ui-widget-content"
							),
							this._addClass("ui-spinner-input"),
							this.element.attr("role", "spinbutton"),
							(this.buttons = this.uiSpinner
								.children("a")
								.attr("tabIndex", -1)
								.attr("aria-hidden", !0)
								.button({
									classes: {
										"ui-button": ""
									}
								})),
							this._removeClass(this.buttons, "ui-corner-all"),
							this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"),
							this._addClass(
								this.buttons.last(),
								"ui-spinner-button ui-spinner-down"
							),
							this.buttons.first().button({
								icon: this.options.icons.up,
								showLabel: !1
							}),
							this.buttons.last().button({
								icon: this.options.icons.down,
								showLabel: !1
							}),
							this.buttons.height() > Math.ceil(0.5 * this.uiSpinner.height()) &&
								0 < this.uiSpinner.height() &&
								this.uiSpinner.height(this.uiSpinner.height());
					},
					_keydown: function (t) {
						var e = this.options,
							n = x.ui.keyCode;
						switch (t.keyCode) {
							case n.UP:
								return this._repeat(null, 1, t), !0;
							case n.DOWN:
								return this._repeat(null, -1, t), !0;
							case n.PAGE_UP:
								return this._repeat(null, e.page, t), !0;
							case n.PAGE_DOWN:
								return this._repeat(null, -e.page, t), !0;
						}
						return !1;
					},
					_start: function (t) {
						return (
							!(!this.spinning && !1 === this._trigger("start", t)) &&
							(this.counter || (this.counter = 1), (this.spinning = !0))
						);
					},
					_repeat: function (t, e, n) {
						(t = t || 500),
							clearTimeout(this.timer),
							(this.timer = this._delay(function () {
								this._repeat(40, e, n);
							}, t)),
							this._spin(e * this.options.step, n);
					},
					_spin: function (t, e) {
						var n = this.value() || 0;
						this.counter || (this.counter = 1),
							(n = this._adjustValue(n + t * this._increment(this.counter))),
							(this.spinning &&
								!1 ===
									this._trigger("spin", e, {
										value: n
									})) ||
								(this._value(n), this.counter++);
					},
					_increment: function (t) {
						var e = this.options.incremental;
						return e
							? x.isFunction(e)
								? e(t)
								: Math.floor((t * t * t) / 5e4 - (t * t) / 500 + (17 * t) / 200 + 1)
							: 1;
					},
					_precision: function () {
						var t = this._precisionOf(this.options.step);
						return (
							null !== this.options.min &&
								(t = Math.max(t, this._precisionOf(this.options.min))),
							t
						);
					},
					_precisionOf: function (t) {
						var e = t.toString(),
							t = e.indexOf(".");
						return -1 === t ? 0 : e.length - t - 1;
					},
					_adjustValue: function (t) {
						var e,
							n = this.options,
							r = t - (e = null !== n.min ? n.min : 0);
						return (
							(t = e + Math.round(r / n.step) * n.step),
							(t = parseFloat(t.toFixed(this._precision()))),
							null !== n.max && t > n.max
								? n.max
								: null !== n.min && t < n.min
									? n.min
									: t
						);
					},
					_stop: function (t) {
						this.spinning &&
							(clearTimeout(this.timer),
							clearTimeout(this.mousewheelTimer),
							(this.counter = 0),
							(this.spinning = !1),
							this._trigger("stop", t));
					},
					_setOption: function (t, e) {
						var n;
						if ("culture" === t || "numberFormat" === t)
							return (
								(n = this._parse(this.element.val())),
								(this.options[t] = e),
								void this.element.val(this._format(n))
							);
						("max" !== t && "min" !== t && "step" !== t) ||
							("string" == typeof e && (e = this._parse(e))),
							"icons" === t &&
								((n = this.buttons.first().find(".ui-icon")),
								this._removeClass(n, null, this.options.icons.up),
								this._addClass(n, null, e.up),
								(n = this.buttons.last().find(".ui-icon")),
								this._removeClass(n, null, this.options.icons.down),
								this._addClass(n, null, e.down)),
							this._super(t, e);
					},
					_setOptionDisabled: function (t) {
						this._super(t),
							this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t),
							this.element.prop("disabled", !!t),
							this.buttons.button(t ? "disable" : "enable");
					},
					_setOptions: g(function (t) {
						this._super(t);
					}),
					_parse: function (t) {
						return (
							"string" == typeof t &&
								"" !== t &&
								(t =
									window.Globalize && this.options.numberFormat
										? Globalize.parseFloat(t, 10, this.options.culture)
										: +t),
							"" === t || isNaN(t) ? null : t
						);
					},
					_format: function (t) {
						return "" === t
							? ""
							: window.Globalize && this.options.numberFormat
								? Globalize.format(
										t,
										this.options.numberFormat,
										this.options.culture
									)
								: t;
					},
					_refresh: function () {
						this.element.attr({
							"aria-valuemin": this.options.min,
							"aria-valuemax": this.options.max,
							"aria-valuenow": this._parse(this.element.val())
						});
					},
					isValid: function () {
						var t = this.value();
						return null !== t && t === this._adjustValue(t);
					},
					_value: function (t, e) {
						var n;
						"" !== t &&
							null !== (n = this._parse(t)) &&
							(e || (n = this._adjustValue(n)), (t = this._format(n))),
							this.element.val(t),
							this._refresh();
					},
					_destroy: function () {
						this.element
							.prop("disabled", !1)
							.removeAttr(
								"autocomplete role aria-valuemin aria-valuemax aria-valuenow"
							),
							this.uiSpinner.replaceWith(this.element);
					},
					stepUp: g(function (t) {
						this._stepUp(t);
					}),
					_stepUp: function (t) {
						this._start() && (this._spin((t || 1) * this.options.step), this._stop());
					},
					stepDown: g(function (t) {
						this._stepDown(t);
					}),
					_stepDown: function (t) {
						this._start() && (this._spin((t || 1) * -this.options.step), this._stop());
					},
					pageUp: g(function (t) {
						this._stepUp((t || 1) * this.options.page);
					}),
					pageDown: g(function (t) {
						this._stepDown((t || 1) * this.options.page);
					}),
					value: function (t) {
						if (!arguments.length) return this._parse(this.element.val());
						g(this._value).call(this, t);
					},
					widget: function () {
						return this.uiSpinner;
					}
				}),
				!1 !== x.uiBackCompat &&
					x.widget("ui.spinner", x.ui.spinner, {
						_enhance: function () {
							this.uiSpinner = this.element
								.attr("autocomplete", "off")
								.wrap(this._uiSpinnerHtml())
								.parent()
								.append(this._buttonHtml());
						},
						_uiSpinnerHtml: function () {
							return "<span>";
						},
						_buttonHtml: function () {
							return "<a></a><a></a>";
						}
					}),
				x.ui.spinner;
		};
		"function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
	})(),
	(function (t) {
		"function" == typeof define && define.amd
			? define(["jquery"], t)
			: "object" == typeof exports
				? (module.exports = t)
				: t(jQuery);
	})(function (l) {
		function e(t) {
			var e,
				n = t || window.event,
				r = g.call(arguments, 1),
				i = 0,
				o = 0,
				s = 0,
				a = 0,
				u = 0,
				c = 0;
			if (
				(((t = l.event.fix(n)).type = "mousewheel"),
				"detail" in n && (s = -1 * n.detail),
				"wheelDelta" in n && (s = n.wheelDelta),
				"wheelDeltaY" in n && (s = n.wheelDeltaY),
				"wheelDeltaX" in n && (o = -1 * n.wheelDeltaX),
				"axis" in n && n.axis === n.HORIZONTAL_AXIS && ((o = -1 * s), (s = 0)),
				(i = 0 === s ? o : s),
				"deltaY" in n && (i = s = -1 * n.deltaY),
				"deltaX" in n && ((o = n.deltaX), 0 === s && (i = -1 * o)),
				0 !== s || 0 !== o)
			) {
				1 === n.deltaMode
					? ((i *= e = l.data(this, "mousewheel-line-height")), (s *= e), (o *= e))
					: 2 === n.deltaMode &&
						((i *= e = l.data(this, "mousewheel-page-height")), (s *= e), (o *= e));
				var a = Math.max(Math.abs(s), Math.abs(o));
				return (
					(d && !(a < d)) || (f(n, (d = a)) && (d /= 40)),
					f(n, a) && ((i /= 40), (o /= 40), (s /= 40)),
					(i = Math[1 <= i ? "floor" : "ceil"](i / d)),
					(o = Math[1 <= o ? "floor" : "ceil"](o / d)),
					(s = Math[1 <= s ? "floor" : "ceil"](s / d)),
					m.settings.normalizeOffset &&
						this.getBoundingClientRect &&
						((a = this.getBoundingClientRect()),
						(u = t.clientX - a.left),
						(c = t.clientY - a.top)),
					(t.deltaX = o),
					(t.deltaY = s),
					(t.deltaFactor = d),
					(t.offsetX = u),
					(t.offsetY = c),
					(t.deltaMode = 0),
					r.unshift(t, i, o, s),
					p && clearTimeout(p),
					(p = setTimeout(h, 200)),
					(l.event.dispatch || l.event.handle).apply(this, r)
				);
			}
		}
		function h() {
			d = null;
		}
		function f(t, e) {
			return m.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0;
		}
		var p,
			d,
			t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
			n =
				"onwheel" in document || 9 <= document.documentMode
					? ["wheel"]
					: ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
			g = Array.prototype.slice;
		if (l.event.fixHooks)
			for (var r = t.length; r; ) l.event.fixHooks[t[--r]] = l.event.mouseHooks;
		var m = (l.event.special.mousewheel = {
			version: "3.1.12",
			setup: function () {
				if (this.addEventListener)
					for (var t = n.length; t; ) this.addEventListener(n[--t], e, !1);
				else this.onmousewheel = e;
				l.data(this, "mousewheel-line-height", m.getLineHeight(this)),
					l.data(this, "mousewheel-page-height", m.getPageHeight(this));
			},
			teardown: function () {
				if (this.removeEventListener)
					for (var t = n.length; t; ) this.removeEventListener(n[--t], e, !1);
				else this.onmousewheel = null;
				l.removeData(this, "mousewheel-line-height"),
					l.removeData(this, "mousewheel-page-height");
			},
			getLineHeight: function (t) {
				var e = l(t),
					t = e["offsetParent" in l.fn ? "offsetParent" : "parent"]();
				return (
					t.length || (t = l("body")),
					parseInt(t.css("fontSize"), 10) || parseInt(e.css("fontSize"), 10) || 16
				);
			},
			getPageHeight: function (t) {
				return l(t).height();
			},
			settings: {
				adjustOldDeltas: !0,
				normalizeOffset: !0
			}
		});
		l.fn.extend({
			mousewheel: function (t) {
				return t ? this.bind("mousewheel", t) : this.trigger("mousewheel");
			},
			unmousewheel: function (t) {
				return this.unbind("mousewheel", t);
			}
		});
	}),
	(function (t) {
		var e;
		"object" == typeof exports && "undefined" != typeof module
			? (module.exports = t())
			: "function" == typeof define && define.amd
				? define([], t)
				: ("undefined" != typeof window
						? (e = window)
						: "undefined" != typeof global
							? (e = global)
							: "undefined" != typeof self && (e = self),
					(e.html2canvas = t()));
	})(function () {
		return (function r(i, o, s) {
			function a(n, t) {
				if (!o[n]) {
					if (!i[n]) {
						var e = "function" == typeof require && require;
						if (!t && e) return e(n, !0);
						if (u) return u(n, !0);
						e = new Error("Cannot find module '" + n + "'");
						throw ((e.code = "MODULE_NOT_FOUND"), e);
					}
					e = o[n] = {
						exports: {}
					};
					i[n][0].call(
						e.exports,
						function (t) {
							var e = i[n][1][t];
							return a(e || t);
						},
						e,
						e.exports,
						r,
						i,
						o,
						s
					);
				}
				return o[n].exports;
			}
			for (var u = "function" == typeof require && require, t = 0; t < s.length; t++) a(s[t]);
			return a;
		})(
			{
				1: [
					function (t, P, N) {
						(function (j) {
							!(function (t) {
								function v(t) {
									throw RangeError(g[t]);
								}
								function n(t, e) {
									for (var n = t.length; n--; ) t[n] = e(t[n]);
									return t;
								}
								function e(t, e) {
									return n(t.split(p), e).join(".");
								}
								function y(t) {
									for (var e, n, r = [], i = 0, o = t.length; i < o; )
										55296 <= (e = t.charCodeAt(i++)) && e <= 56319 && i < o
											? 56320 == (64512 & (n = t.charCodeAt(i++)))
												? r.push(((1023 & e) << 10) + (1023 & n) + 65536)
												: (r.push(e), i--)
											: r.push(e);
									return r;
								}
								function d(t) {
									return n(t, function (t) {
										var e = "";
										return (
											65535 < t &&
												((e += A((((t -= 65536) >>> 10) & 1023) | 55296)),
												(t = 56320 | (1023 & t))),
											e + A(t)
										);
									}).join("");
								}
								function b(t, e) {
									return t + 22 + 75 * (t < 26) - ((0 != e) << 5);
								}
								function w(t, e, n) {
									var r = 0;
									for (
										t = n ? T(t / l) : t >> 1, t += T(t / e);
										(m * k) >> 1 < t;
										r += x
									)
										t = T(t / m);
									return T(r + ((m + 1) * t) / (t + c));
								}
								function r(t) {
									var e,
										n,
										r,
										i,
										o,
										s,
										a,
										u = [],
										c = t.length,
										l = 0,
										h = O,
										f = S,
										p = t.lastIndexOf(E);
									for (p < 0 && (p = 0), n = 0; n < p; ++n)
										128 <= t.charCodeAt(n) && v("not-basic"),
											u.push(t.charCodeAt(n));
									for (r = 0 < p ? p + 1 : 0; r < c; ) {
										for (
											i = l, o = 1, s = x;
											c <= r && v("invalid-input"),
												(a = t.charCodeAt(r++)),
												(x <=
													(a =
														a - 48 < 10
															? a - 22
															: a - 65 < 26
																? a - 65
																: a - 97 < 26
																	? a - 97
																	: x) ||
													a > T((_ - l) / o)) &&
													v("overflow"),
												(l += a * o),
												!(a < (a = s <= f ? C : f + k <= s ? k : s - f));
											s += x
										)
											o > T(_ / (a = x - a)) && v("overflow"), (o *= a);
										(f = w(l - i, (e = u.length + 1), 0 == i)),
											T(l / e) > _ - h && v("overflow"),
											(h += T(l / e)),
											(l %= e),
											u.splice(l++, 0, h);
									}
									return d(u);
								}
								function i(t) {
									for (
										var e,
											n,
											r,
											i,
											o,
											s,
											a,
											u,
											c,
											l,
											h,
											f = [],
											p = (t = y(t)).length,
											d = O,
											g = S,
											m = (e = 0);
										m < p;
										++m
									)
										(u = t[m]) < 128 && f.push(A(u));
									for (n = r = f.length, r && f.push(E); n < p; ) {
										for (i = _, m = 0; m < p; ++m)
											d <= (u = t[m]) && u < i && (i = u);
										for (
											i - d > T((_ - e) / (c = n + 1)) && v("overflow"),
												e += (i - d) * c,
												d = i,
												m = 0;
											m < p;
											++m
										)
											if (
												((u = t[m]) < d && ++e > _ && v("overflow"), u == d)
											) {
												for (
													o = e, s = x;
													!(
														o <
														(a = s <= g ? C : g + k <= s ? k : s - g)
													);
													s += x
												)
													(h = o - a),
														(l = x - a),
														f.push(A(b(a + (h % l), 0))),
														(o = T(h / l));
												f.push(A(b(o, 0))),
													(g = w(e, c, n == r)),
													(e = 0),
													++n;
											}
										++e, ++d;
									}
									return f.join("");
								}
								var o = "object" == typeof N && N,
									s = "object" == typeof P && P && P.exports == o && P,
									a = "object" == typeof j && j;
								(a.global !== a && a.window !== a) || (t = a);
								var u,
									_ = 2147483647,
									x = 36,
									C = 1,
									k = 26,
									c = 38,
									l = 700,
									S = 72,
									O = 128,
									E = "-",
									h = /^xn--/,
									f = /[^ -~]/,
									p = /\x2E|\u3002|\uFF0E|\uFF61/g,
									g = {
										overflow: "Overflow: input needs wider integers to process",
										"not-basic":
											"Illegal input >= 0x80 (not a basic code point)",
										"invalid-input": "Invalid input"
									},
									m = x - C,
									T = Math.floor,
									A = String.fromCharCode,
									I = {
										version: "1.2.4",
										ucs2: {
											decode: y,
											encode: d
										},
										decode: r,
										encode: i,
										toASCII: function (t) {
											return e(t, function (t) {
												return f.test(t) ? "xn--" + i(t) : t;
											});
										},
										toUnicode: function (t) {
											return e(t, function (t) {
												return h.test(t) ? r(t.slice(4).toLowerCase()) : t;
											});
										}
									};
								if ((0, o && !o.nodeType))
									if (s) s.exports = I;
									else for (u in I) I.hasOwnProperty(u) && (o[u] = I[u]);
								else t.punycode = I;
							})(this);
						}).call(
							this,
							"undefined" != typeof global
								? global
								: "undefined" != typeof self
									? self
									: "undefined" != typeof window
										? window
										: {}
						);
					},
					{}
				],
				2: [
					function (t, e) {
						function i(t, e) {
							for (
								var n =
										3 === t.nodeType
											? document.createTextNode(t.nodeValue)
											: t.cloneNode(!1),
									r = t.firstChild;
								r;

							)
								(!0 !== e && 1 === r.nodeType && "SCRIPT" === r.nodeName) ||
									n.appendChild(i(r, e)),
									(r = r.nextSibling);
							return (
								1 === t.nodeType &&
									((n._scrollTop = t.scrollTop),
									(n._scrollLeft = t.scrollLeft),
									"CANVAS" === t.nodeName
										? (function (e, t) {
												try {
													t &&
														((t.width = e.width),
														(t.height = e.height),
														t
															.getContext("2d")
															.putImageData(
																e
																	.getContext("2d")
																	.getImageData(
																		0,
																		0,
																		e.width,
																		e.height
																	),
																0,
																0
															));
												} catch (t) {
													o("Unable to copy canvas content from", e, t);
												}
											})(t, n)
										: ("TEXTAREA" !== t.nodeName && "SELECT" !== t.nodeName) ||
											(n.value = t.value)),
								n
							);
						}
						var o = t("./log");
						e.exports = function (o, t, e, n, s, a, u) {
							var c = i(o.documentElement, s.javascriptEnabled),
								l = t.createElement("iframe");
							return (
								(l.className = "html2canvas-container"),
								(l.style.visibility = "hidden"),
								(l.style.position = "fixed"),
								(l.style.left = "-10000px"),
								(l.style.top = "0px"),
								(l.style.border = "0"),
								(l.width = e),
								(l.height = n),
								(l.scrolling = "no"),
								t.body.appendChild(l),
								new Promise(function (e) {
									var t,
										n,
										r,
										i = l.contentWindow.document;
									(l.contentWindow.onload = l.onload =
										function () {
											var t = setInterval(function () {
												0 < i.body.childNodes.length &&
													((function t(e) {
														if (1 === e.nodeType) {
															(e.scrollTop = e._scrollTop),
																(e.scrollLeft = e._scrollLeft);
															for (var n = e.firstChild; n; )
																t(n), (n = n.nextSibling);
														}
													})(i.documentElement),
													clearInterval(t),
													"view" === s.type &&
														(l.contentWindow.scrollTo(a, u),
														!/(iPad|iPhone|iPod)/g.test(
															navigator.userAgent
														) ||
															(l.contentWindow.scrollY === u &&
																l.contentWindow.scrollX === a) ||
															((i.documentElement.style.top =
																-u + "px"),
															(i.documentElement.style.left =
																-a + "px"),
															(i.documentElement.style.position =
																"absolute"))),
													e(l));
											}, 50);
										}),
										i.open(),
										i.write("<!DOCTYPE html><html></html>"),
										(n = a),
										(r = u),
										!(t = o).defaultView ||
											(n === t.defaultView.pageXOffset &&
												r === t.defaultView.pageYOffset) ||
											t.defaultView.scrollTo(n, r),
										i.replaceChild(i.adoptNode(c), i.documentElement),
										i.close();
								})
							);
						};
					},
					{
						"./log": 13
					}
				],
				3: [
					function (t, e) {
						function n(t) {
							(this.r = 0),
								(this.g = 0),
								(this.b = 0),
								(this.a = null),
								this.fromArray(t) ||
									this.namedColor(t) ||
									this.rgb(t) ||
									this.rgba(t) ||
									this.hex6(t) ||
									this.hex3(t);
						}
						(n.prototype.darken = function (t) {
							t = 1 - t;
							return new n([
								Math.round(this.r * t),
								Math.round(this.g * t),
								Math.round(this.b * t),
								this.a
							]);
						}),
							(n.prototype.isTransparent = function () {
								return 0 === this.a;
							}),
							(n.prototype.isBlack = function () {
								return 0 === this.r && 0 === this.g && 0 === this.b;
							}),
							(n.prototype.fromArray = function (t) {
								return (
									Array.isArray(t) &&
										((this.r = Math.min(t[0], 255)),
										(this.g = Math.min(t[1], 255)),
										(this.b = Math.min(t[2], 255)),
										3 < t.length && (this.a = t[3])),
									Array.isArray(t)
								);
							});
						var r = /^#([a-f0-9]{3})$/i;
						n.prototype.hex3 = function (t) {
							var e;
							return (
								null !== (e = t.match(r)) &&
									((this.r = parseInt(e[1][0] + e[1][0], 16)),
									(this.g = parseInt(e[1][1] + e[1][1], 16)),
									(this.b = parseInt(e[1][2] + e[1][2], 16))),
								null !== e
							);
						};
						var i = /^#([a-f0-9]{6})$/i;
						n.prototype.hex6 = function (t) {
							var e = null;
							return (
								null !== (e = t.match(i)) &&
									((this.r = parseInt(e[1].substring(0, 2), 16)),
									(this.g = parseInt(e[1].substring(2, 4), 16)),
									(this.b = parseInt(e[1].substring(4, 6), 16))),
								null !== e
							);
						};
						var o = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
						n.prototype.rgb = function (t) {
							var e;
							return (
								null !== (e = t.match(o)) &&
									((this.r = Number(e[1])),
									(this.g = Number(e[2])),
									(this.b = Number(e[3]))),
								null !== e
							);
						};
						var s =
							/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/;
						(n.prototype.rgba = function (t) {
							var e;
							return (
								null !== (e = t.match(s)) &&
									((this.r = Number(e[1])),
									(this.g = Number(e[2])),
									(this.b = Number(e[3])),
									(this.a = Number(e[4]))),
								null !== e
							);
						}),
							(n.prototype.toString = function () {
								return null !== this.a && 1 !== this.a
									? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")"
									: "rgb(" + [this.r, this.g, this.b].join(",") + ")";
							}),
							(n.prototype.namedColor = function (t) {
								t = t.toLowerCase();
								var e = a[t];
								if (e) (this.r = e[0]), (this.g = e[1]), (this.b = e[2]);
								else if ("transparent" === t)
									return !(this.r = this.g = this.b = this.a = 0);
								return !!e;
							}),
							(n.prototype.isColor = !0);
						var a = {
							aliceblue: [240, 248, 255],
							antiquewhite: [250, 235, 215],
							aqua: [0, 255, 255],
							aquamarine: [127, 255, 212],
							azure: [240, 255, 255],
							beige: [245, 245, 220],
							bisque: [255, 228, 196],
							black: [0, 0, 0],
							blanchedalmond: [255, 235, 205],
							blue: [0, 0, 255],
							blueviolet: [138, 43, 226],
							brown: [165, 42, 42],
							burlywood: [222, 184, 135],
							cadetblue: [95, 158, 160],
							chartreuse: [127, 255, 0],
							chocolate: [210, 105, 30],
							coral: [255, 127, 80],
							cornflowerblue: [100, 149, 237],
							cornsilk: [255, 248, 220],
							crimson: [220, 20, 60],
							cyan: [0, 255, 255],
							darkblue: [0, 0, 139],
							darkcyan: [0, 139, 139],
							darkgoldenrod: [184, 134, 11],
							darkgray: [169, 169, 169],
							darkgreen: [0, 100, 0],
							darkgrey: [169, 169, 169],
							darkkhaki: [189, 183, 107],
							darkmagenta: [139, 0, 139],
							darkolivegreen: [85, 107, 47],
							darkorange: [255, 140, 0],
							darkorchid: [153, 50, 204],
							darkred: [139, 0, 0],
							darksalmon: [233, 150, 122],
							darkseagreen: [143, 188, 143],
							darkslateblue: [72, 61, 139],
							darkslategray: [47, 79, 79],
							darkslategrey: [47, 79, 79],
							darkturquoise: [0, 206, 209],
							darkviolet: [148, 0, 211],
							deeppink: [255, 20, 147],
							deepskyblue: [0, 191, 255],
							dimgray: [105, 105, 105],
							dimgrey: [105, 105, 105],
							dodgerblue: [30, 144, 255],
							firebrick: [178, 34, 34],
							floralwhite: [255, 250, 240],
							forestgreen: [34, 139, 34],
							fuchsia: [255, 0, 255],
							gainsboro: [220, 220, 220],
							ghostwhite: [248, 248, 255],
							gold: [255, 215, 0],
							goldenrod: [218, 165, 32],
							gray: [128, 128, 128],
							green: [0, 128, 0],
							greenyellow: [173, 255, 47],
							grey: [128, 128, 128],
							honeydew: [240, 255, 240],
							hotpink: [255, 105, 180],
							indianred: [205, 92, 92],
							indigo: [75, 0, 130],
							ivory: [255, 255, 240],
							khaki: [240, 230, 140],
							lavender: [230, 230, 250],
							lavenderblush: [255, 240, 245],
							lawngreen: [124, 252, 0],
							lemonchiffon: [255, 250, 205],
							lightblue: [173, 216, 230],
							lightcoral: [240, 128, 128],
							lightcyan: [224, 255, 255],
							lightgoldenrodyellow: [250, 250, 210],
							lightgray: [211, 211, 211],
							lightgreen: [144, 238, 144],
							lightgrey: [211, 211, 211],
							lightpink: [255, 182, 193],
							lightsalmon: [255, 160, 122],
							lightseagreen: [32, 178, 170],
							lightskyblue: [135, 206, 250],
							lightslategray: [119, 136, 153],
							lightslategrey: [119, 136, 153],
							lightsteelblue: [176, 196, 222],
							lightyellow: [255, 255, 224],
							lime: [0, 255, 0],
							limegreen: [50, 205, 50],
							linen: [250, 240, 230],
							magenta: [255, 0, 255],
							maroon: [128, 0, 0],
							mediumaquamarine: [102, 205, 170],
							mediumblue: [0, 0, 205],
							mediumorchid: [186, 85, 211],
							mediumpurple: [147, 112, 219],
							mediumseagreen: [60, 179, 113],
							mediumslateblue: [123, 104, 238],
							mediumspringgreen: [0, 250, 154],
							mediumturquoise: [72, 209, 204],
							mediumvioletred: [199, 21, 133],
							midnightblue: [25, 25, 112],
							mintcream: [245, 255, 250],
							mistyrose: [255, 228, 225],
							moccasin: [255, 228, 181],
							navajowhite: [255, 222, 173],
							navy: [0, 0, 128],
							oldlace: [253, 245, 230],
							olive: [128, 128, 0],
							olivedrab: [107, 142, 35],
							orange: [255, 165, 0],
							orangered: [255, 69, 0],
							orchid: [218, 112, 214],
							palegoldenrod: [238, 232, 170],
							palegreen: [152, 251, 152],
							paleturquoise: [175, 238, 238],
							palevioletred: [219, 112, 147],
							papayawhip: [255, 239, 213],
							peachpuff: [255, 218, 185],
							peru: [205, 133, 63],
							pink: [255, 192, 203],
							plum: [221, 160, 221],
							powderblue: [176, 224, 230],
							purple: [128, 0, 128],
							rebeccapurple: [102, 51, 153],
							red: [255, 0, 0],
							rosybrown: [188, 143, 143],
							royalblue: [65, 105, 225],
							saddlebrown: [139, 69, 19],
							salmon: [250, 128, 114],
							sandybrown: [244, 164, 96],
							seagreen: [46, 139, 87],
							seashell: [255, 245, 238],
							sienna: [160, 82, 45],
							silver: [192, 192, 192],
							skyblue: [135, 206, 235],
							slateblue: [106, 90, 205],
							slategray: [112, 128, 144],
							slategrey: [112, 128, 144],
							snow: [255, 250, 250],
							springgreen: [0, 255, 127],
							steelblue: [70, 130, 180],
							tan: [210, 180, 140],
							teal: [0, 128, 128],
							thistle: [216, 191, 216],
							tomato: [255, 99, 71],
							turquoise: [64, 224, 208],
							violet: [238, 130, 238],
							wheat: [245, 222, 179],
							white: [255, 255, 255],
							whitesmoke: [245, 245, 245],
							yellow: [255, 255, 0],
							yellowgreen: [154, 205, 50]
						};
						e.exports = n;
					},
					{}
				],
				4: [
					function (t, e) {
						function n(t, e) {
							var n,
								r,
								i = C++;
							if (
								((e = e || {}).logging &&
									((y.options.logging = !0), (y.options.start = Date.now())),
								(e.async = void 0 === e.async || e.async),
								(e.allowTaint = void 0 !== e.allowTaint && e.allowTaint),
								(e.removeContainer =
									void 0 === e.removeContainer || e.removeContainer),
								(e.javascriptEnabled =
									void 0 !== e.javascriptEnabled && e.javascriptEnabled),
								(e.imageTimeout = void 0 === e.imageTimeout ? 1e4 : e.imageTimeout),
								(e.renderer = "function" == typeof e.renderer ? e.renderer : g),
								(e.strict = !!e.strict),
								"string" == typeof t)
							) {
								if ("string" != typeof e.proxy)
									return Promise.reject("Proxy must be used when rendering url");
								var o = null != e.width ? e.width : window.innerWidth,
									s = null != e.height ? e.height : window.innerHeight;
								return w(
									((n = t),
									((r = document.createElement("a")).href = n),
									(r.href = r.href),
									r),
									e.proxy,
									document,
									o,
									s,
									e
								).then(function (t) {
									return f(t.contentWindow.document.documentElement, t, e, o, s);
								});
							}
							var a,
								u,
								c,
								l,
								h,
								t = (
									void 0 === t ? [document.documentElement] : t.length ? t : [t]
								)[0];
							return (
								t.setAttribute(x + i, i),
								(a = t.ownerDocument),
								(u = e),
								(c = t.ownerDocument.defaultView.innerWidth),
								(l = t.ownerDocument.defaultView.innerHeight),
								(h = i),
								b(
									a,
									a,
									c,
									l,
									u,
									a.defaultView.pageXOffset,
									a.defaultView.pageYOffset
								)
									.then(function (t) {
										y("Document cloned");
										var e = x + h,
											n = "[" + e + "='" + h + "']";
										a.querySelector(n).removeAttribute(e);
										var e = t.contentWindow,
											r = e.document.querySelector(n);
										return Promise.resolve(
											"function" != typeof u.onclone || u.onclone(e.document)
										).then(function () {
											return f(r, t, u, c, l);
										});
									})
									.then(function (t) {
										return (
											"function" == typeof e.onrendered &&
												(y(
													"options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"
												),
												e.onrendered(t)),
											t
										);
									})
							);
						}
						function f(n, r, i, t, e) {
							var o,
								s,
								a = r.contentWindow,
								u = new d(a.document),
								c = new m(i, u),
								l = _(n),
								s =
									"view" === i.type
										? t
										: ((s = a.document),
											Math.max(
												Math.max(
													s.body.scrollWidth,
													s.documentElement.scrollWidth
												),
												Math.max(
													s.body.offsetWidth,
													s.documentElement.offsetWidth
												),
												Math.max(
													s.body.clientWidth,
													s.documentElement.clientWidth
												)
											)),
								o =
									"view" === i.type
										? e
										: ((o = a.document),
											Math.max(
												Math.max(
													o.body.scrollHeight,
													o.documentElement.scrollHeight
												),
												Math.max(
													o.body.offsetHeight,
													o.documentElement.offsetHeight
												),
												Math.max(
													o.body.clientHeight,
													o.documentElement.clientHeight
												)
											)),
								h = new i.renderer(s, o, c, i, document);
							return new v(n, h, u, c, i).ready.then(function () {
								var t, e;
								return (
									y("Finished rendering"),
									(t =
										"view" === i.type
											? p(h.canvas, {
													width: h.canvas.width,
													height: h.canvas.height,
													top: 0,
													left: 0,
													x: 0,
													y: 0
												})
											: n === a.document.body ||
												  n === a.document.documentElement ||
												  null != i.canvas
												? h.canvas
												: p(h.canvas, {
														width: (null != i.width ? i : l).width,
														height: (null != i.height ? i : l).height,
														top: l.top,
														left: l.left,
														x: 0,
														y: 0
													})),
									(e = r),
									i.removeContainer &&
										(e.parentNode.removeChild(e), y("Cleaned up container")),
									t
								);
							});
						}
						function p(t, e) {
							var n = document.createElement("canvas"),
								r = Math.min(t.width - 1, Math.max(0, e.left)),
								i = Math.min(t.width, Math.max(1, e.left + e.width)),
								o = Math.min(t.height - 1, Math.max(0, e.top)),
								s = Math.min(t.height, Math.max(1, e.top + e.height));
							(n.width = e.width), (n.height = e.height);
							(i -= r), (s -= o);
							return (
								y(
									"Cropping canvas at:",
									"left:",
									e.left,
									"top:",
									e.top,
									"width:",
									i,
									"height:",
									s
								),
								y(
									"Resulting crop with width",
									e.width,
									"and height",
									e.height,
									"with x",
									r,
									"and y",
									o
								),
								n.getContext("2d").drawImage(t, r, o, i, s, e.x, e.y, i, s),
								n
							);
						}
						var d = t("./support"),
							g = t("./renderers/canvas"),
							m = t("./imageloader"),
							v = t("./nodeparser"),
							r = t("./nodecontainer"),
							y = t("./log"),
							i = t("./utils"),
							b = t("./clone"),
							w = t("./proxy").loadUrlDocument,
							_ = i.getBounds,
							x = "data-html2canvas-node",
							C = 0;
						(n.CanvasRenderer = g), (n.NodeContainer = r), (n.log = y), (n.utils = i);
						i =
							"undefined" == typeof document ||
							"function" != typeof Object.create ||
							"function" != typeof document.createElement("canvas").getContext
								? function () {
										return Promise.reject("No canvas support");
									}
								: n;
						e.exports = i;
					},
					{
						"./clone": 2,
						"./imageloader": 11,
						"./log": 13,
						"./nodecontainer": 14,
						"./nodeparser": 15,
						"./proxy": 16,
						"./renderers/canvas": 20,
						"./support": 22,
						"./utils": 26
					}
				],
				5: [
					function (t, e) {
						function r(t) {
							var n;
							(this.src = t),
								i("DummyImageContainer for", t),
								(this.promise && this.image) ||
									(i("Initiating DummyImageContainer"),
									(r.prototype.image = new Image()),
									(n = this.image),
									(r.prototype.promise = new Promise(function (t, e) {
										(n.onload = t),
											(n.onerror = e),
											(n.src = o()),
											!0 === n.complete && t(n);
									})));
						}
						var i = t("./log"),
							o = t("./utils").smallImage;
						e.exports = r;
					},
					{
						"./log": 13,
						"./utils": 26
					}
				],
				6: [
					function (t, e) {
						var s = t("./utils").smallImage;
						e.exports = function (t, e) {
							var n = document.createElement("div"),
								r = document.createElement("img"),
								i = document.createElement("span"),
								o = "Hidden Text";
							(n.style.visibility = "hidden"),
								(n.style.fontFamily = t),
								(n.style.fontSize = e),
								(n.style.margin = 0),
								(n.style.padding = 0),
								document.body.appendChild(n),
								(r.src = s()),
								(r.width = 1),
								(r.height = 1),
								(r.style.margin = 0),
								(r.style.padding = 0),
								(r.style.verticalAlign = "baseline"),
								(i.style.fontFamily = t),
								(i.style.fontSize = e),
								(i.style.margin = 0),
								(i.style.padding = 0),
								i.appendChild(document.createTextNode(o)),
								n.appendChild(i),
								n.appendChild(r),
								(e = r.offsetTop - i.offsetTop + 1),
								n.removeChild(i),
								n.appendChild(document.createTextNode(o)),
								(n.style.lineHeight = "normal"),
								(r.style.verticalAlign = "super"),
								(r = r.offsetTop - n.offsetTop + 1),
								document.body.removeChild(n),
								(this.baseline = e),
								(this.lineWidth = 1),
								(this.middle = r);
						};
					},
					{
						"./utils": 26
					}
				],
				7: [
					function (t, e) {
						function n() {
							this.data = {};
						}
						var r = t("./font");
						(n.prototype.getMetrics = function (t, e) {
							return (
								void 0 === this.data[t + "-" + e] &&
									(this.data[t + "-" + e] = new r(t, e)),
								this.data[t + "-" + e]
							);
						}),
							(e.exports = n);
					},
					{
						"./font": 6
					}
				],
				8: [
					function (o, t) {
						function e(e, t, n) {
							(this.image = null), (this.src = e);
							var r = this,
								i = s(e);
							this.promise = (
								t
									? new Promise(function (t) {
											"about:blank" === e.contentWindow.document.URL ||
											null == e.contentWindow.document.documentElement
												? (e.contentWindow.onload = e.onload =
														function () {
															t(e);
														})
												: t(e);
										})
									: this.proxyLoad(n.proxy, i, n)
							)
								.then(function (t) {
									return o("./core")(t.contentWindow.document.documentElement, {
										type: "view",
										width: t.width,
										height: t.height,
										proxy: n.proxy,
										javascriptEnabled: n.javascriptEnabled,
										removeContainer: n.removeContainer,
										allowTaint: n.allowTaint,
										imageTimeout: n.imageTimeout / 2
									});
								})
								.then(function (t) {
									return (r.image = t);
								});
						}
						var s = o("./utils").getBounds,
							i = o("./proxy").loadUrlDocument;
						(e.prototype.proxyLoad = function (t, e, n) {
							var r = this.src;
							return i(r.src, t, r.ownerDocument, e.width, e.height, n);
						}),
							(t.exports = e);
					},
					{
						"./core": 4,
						"./proxy": 16,
						"./utils": 26
					}
				],
				9: [
					function (t, e) {
						function n(t) {
							(this.src = t.value),
								(this.colorStops = []),
								(this.type = null),
								(this.x0 = 0.5),
								(this.y0 = 0.5),
								(this.x1 = 0.5),
								(this.y1 = 0.5),
								(this.promise = Promise.resolve(!0));
						}
						(n.TYPES = {
							LINEAR: 1,
							RADIAL: 2
						}),
							(n.REGEXP_COLORSTOP =
								/^\s*(rgba?\(\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}(?:,\s*[0-9\.]+)?\s*\)|[a-z]{3,20}|#[a-f0-9]{3,6})(?:\s+(\d{1,3}(?:\.\d+)?)(%|px)?)?(?:\s|$)/i),
							(e.exports = n);
					},
					{}
				],
				10: [
					function (t, e) {
						e.exports = function (n, r) {
							(this.src = n), (this.image = new Image());
							var i = this;
							(this.tainted = null),
								(this.promise = new Promise(function (t, e) {
									(i.image.onload = t),
										(i.image.onerror = e),
										r && (i.image.crossOrigin = "anonymous"),
										(i.image.src = n),
										!0 === i.image.complete && t(i.image);
								}));
						};
					},
					{}
				],
				11: [
					function (t, e) {
						function n(t, e) {
							(this.link = null),
								(this.options = t),
								(this.support = e),
								(this.origin = this.getOrigin(window.location.href));
						}
						var o = t("./log"),
							r = t("./imagecontainer"),
							i = t("./dummyimagecontainer"),
							s = t("./proxyimagecontainer"),
							a = t("./framecontainer"),
							u = t("./svgcontainer"),
							c = t("./svgnodecontainer"),
							l = t("./lineargradientcontainer"),
							h = t("./webkitgradientcontainer"),
							f = t("./utils").bind;
						(n.prototype.findImages = function (t) {
							var e = [];
							return (
								t
									.reduce(function (t, e) {
										switch (e.node.nodeName) {
											case "IMG":
												return t.concat([
													{
														args: [e.node.src],
														method: "url"
													}
												]);
											case "svg":
											case "IFRAME":
												return t.concat([
													{
														args: [e.node],
														method: e.node.nodeName
													}
												]);
										}
										return t;
									}, [])
									.forEach(this.addImage(e, this.loadImage), this),
								e
							);
						}),
							(n.prototype.findBackgroundImage = function (t, e) {
								return (
									e
										.parseBackgroundImages()
										.filter(this.hasImageBackground)
										.forEach(this.addImage(t, this.loadImage), this),
									t
								);
							}),
							(n.prototype.addImage = function (n, r) {
								return function (e) {
									e.args.forEach(function (t) {
										this.imageExists(n, t) ||
											(n.splice(0, 0, r.call(this, e)),
											o(
												"Added image #" + n.length,
												"string" == typeof t ? t.substring(0, 100) : t
											));
									}, this);
								};
							}),
							(n.prototype.hasImageBackground = function (t) {
								return "none" !== t.method;
							}),
							(n.prototype.loadImage = function (t) {
								if ("url" !== t.method)
									return "linear-gradient" === t.method
										? new l(t)
										: "gradient" === t.method
											? new h(t)
											: "svg" === t.method
												? new c(t.args[0], this.support.svg)
												: "IFRAME" === t.method
													? new a(
															t.args[0],
															this.isSameOrigin(t.args[0].src),
															this.options
														)
													: new i(t);
								t = t.args[0];
								return !this.isSVG(t) || this.support.svg || this.options.allowTaint
									? t.match(/data:image\/.*;base64,/i)
										? new r(t.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1)
										: this.isSameOrigin(t) ||
											  !0 === this.options.allowTaint ||
											  this.isSVG(t)
											? new r(t, !1)
											: this.support.cors &&
												  !this.options.allowTaint &&
												  this.options.useCORS
												? new r(t, !0)
												: this.options.proxy
													? new s(t, this.options.proxy)
													: new i(t)
									: new u(t);
							}),
							(n.prototype.isSVG = function (t) {
								return (
									"svg" === t.substring(t.length - 3).toLowerCase() ||
									u.prototype.isInline(t)
								);
							}),
							(n.prototype.imageExists = function (t, e) {
								return t.some(function (t) {
									return t.src === e;
								});
							}),
							(n.prototype.isSameOrigin = function (t) {
								return this.getOrigin(t) === this.origin;
							}),
							(n.prototype.getOrigin = function (t) {
								var e = this.link || (this.link = document.createElement("a"));
								return (
									(e.href = t),
									(e.href = e.href),
									e.protocol + e.hostname + e.port
								);
							}),
							(n.prototype.getPromise = function (e) {
								return this.timeout(e, this.options.imageTimeout).catch(
									function () {
										return new i(e.src).promise.then(function (t) {
											e.image = t;
										});
									}
								);
							}),
							(n.prototype.get = function (e) {
								var n = null;
								return this.images.some(function (t) {
									return (n = t).src === e;
								})
									? n
									: null;
							}),
							(n.prototype.fetch = function (t) {
								return (
									(this.images = t.reduce(
										f(this.findBackgroundImage, this),
										this.findImages(t)
									)),
									this.images.forEach(function (e, n) {
										e.promise.then(
											function () {
												o("Succesfully loaded image #" + (n + 1), e);
											},
											function (t) {
												o("Failed loading image #" + (n + 1), e, t);
											}
										);
									}),
									(this.ready = Promise.all(
										this.images.map(this.getPromise, this)
									)),
									o("Finished searching images"),
									this
								);
							}),
							(n.prototype.timeout = function (n, r) {
								var i,
									t = Promise.race([
										n.promise,
										new Promise(function (t, e) {
											i = setTimeout(function () {
												o("Timed out loading image", n), e(n);
											}, r);
										})
									]).then(function (t) {
										return clearTimeout(i), t;
									});
								return (
									t.catch(function () {
										clearTimeout(i);
									}),
									t
								);
							}),
							(e.exports = n);
					},
					{
						"./dummyimagecontainer": 5,
						"./framecontainer": 8,
						"./imagecontainer": 10,
						"./lineargradientcontainer": 12,
						"./log": 13,
						"./proxyimagecontainer": 17,
						"./svgcontainer": 23,
						"./svgnodecontainer": 24,
						"./utils": 26,
						"./webkitgradientcontainer": 27
					}
				],
				12: [
					function (t, e) {
						function n(t) {
							r.apply(this, arguments), (this.type = r.TYPES.LINEAR);
							var e =
								n.REGEXP_DIRECTION.test(t.args[0]) ||
								!r.REGEXP_COLORSTOP.test(t.args[0]);
							e
								? t.args[0]
										.split(/\s+/)
										.reverse()
										.forEach(function (t, e) {
											switch (t) {
												case "left":
													(this.x0 = 0), (this.x1 = 1);
													break;
												case "top":
													(this.y0 = 0), (this.y1 = 1);
													break;
												case "right":
													(this.x0 = 1), (this.x1 = 0);
													break;
												case "bottom":
													(this.y0 = 1), (this.y1 = 0);
													break;
												case "to":
													var n = this.y0,
														r = this.x0;
													(this.y0 = this.y1),
														(this.x0 = this.x1),
														(this.x1 = r),
														(this.y1 = n);
													break;
												case "center":
													break;
												default:
													n = 0.01 * parseFloat(t, 10);
													if (isNaN(n)) break;
													0 === e
														? ((this.y0 = n), (this.y1 = 1 - this.y0))
														: ((this.x0 = n), (this.x1 = 1 - this.x0));
											}
										}, this)
								: ((this.y0 = 0), (this.y1 = 1)),
								(this.colorStops = t.args.slice(e ? 1 : 0).map(function (t) {
									var e = t.match(r.REGEXP_COLORSTOP),
										n = +e[2],
										t = 0 == n ? "%" : e[3];
									return {
										color: new i(e[1]),
										stop: "%" === t ? n / 100 : null
									};
								})),
								null === this.colorStops[0].stop && (this.colorStops[0].stop = 0),
								null === this.colorStops[this.colorStops.length - 1].stop &&
									(this.colorStops[this.colorStops.length - 1].stop = 1),
								this.colorStops.forEach(function (n, r) {
									null === n.stop &&
										this.colorStops.slice(r).some(function (t, e) {
											return (
												null !== t.stop &&
												((n.stop =
													(t.stop - this.colorStops[r - 1].stop) /
														(e + 1) +
													this.colorStops[r - 1].stop),
												!0)
											);
										}, this);
								}, this);
						}
						var r = t("./gradientcontainer"),
							i = t("./color");
						(n.prototype = Object.create(r.prototype)),
							(n.REGEXP_DIRECTION =
								/^\s*(?:to|left|right|top|bottom|center|\d{1,3}(?:\.\d+)?%?)(?:\s|$)/i),
							(e.exports = n);
					},
					{
						"./color": 3,
						"./gradientcontainer": 9
					}
				],
				13: [
					function (t, e) {
						var n = function () {
							n.options.logging &&
								window.console &&
								window.console.log &&
								Function.prototype.bind
									.call(window.console.log, window.console)
									.apply(
										window.console,
										[
											Date.now() - n.options.start + "ms",
											"html2canvas:"
										].concat([].slice.call(arguments, 0))
									);
						};
						(n.options = {
							logging: !1
						}),
							(e.exports = n);
					},
					{}
				],
				14: [
					function (t, e) {
						function n(t, e) {
							(this.node = t),
								(this.parent = e),
								(this.stack = null),
								(this.bounds = null),
								(this.borders = null),
								(this.clip = []),
								(this.backgroundClip = []),
								(this.offsetBounds = null),
								(this.visible = null),
								(this.computedStyles = null),
								(this.colors = {}),
								(this.styles = {}),
								(this.backgroundImages = null),
								(this.transformData = null),
								(this.transformMatrix = null),
								(this.isPseudoElement = !1),
								(this.opacity = null);
						}
						function s(t) {
							return -1 !== t.toString().indexOf("%");
						}
						function r(t) {
							return t.replace("px", "");
						}
						function i(t) {
							return parseFloat(t);
						}
						var o = t("./color"),
							t = t("./utils"),
							a = t.getBounds,
							u = t.parseBackgrounds,
							c = t.offsetBounds;
						(n.prototype.cloneTo = function (t) {
							(t.visible = this.visible),
								(t.borders = this.borders),
								(t.bounds = this.bounds),
								(t.clip = this.clip),
								(t.backgroundClip = this.backgroundClip),
								(t.computedStyles = this.computedStyles),
								(t.styles = this.styles),
								(t.backgroundImages = this.backgroundImages),
								(t.opacity = this.opacity);
						}),
							(n.prototype.getOpacity = function () {
								return null === this.opacity
									? (this.opacity = this.cssFloat("opacity"))
									: this.opacity;
							}),
							(n.prototype.assignStack = function (t) {
								(this.stack = t).children.push(this);
							}),
							(n.prototype.isElementVisible = function () {
								return this.node.nodeType === Node.TEXT_NODE
									? this.parent.visible
									: "none" !== this.css("display") &&
											"hidden" !== this.css("visibility") &&
											!this.node.hasAttribute("data-html2canvas-ignore") &&
											("INPUT" !== this.node.nodeName ||
												"hidden" !== this.node.getAttribute("type"));
							}),
							(n.prototype.css = function (t) {
								return (
									this.computedStyles ||
										(this.computedStyles = this.isPseudoElement
											? this.parent.computedStyle(
													this.before ? ":before" : ":after"
												)
											: this.computedStyle(null)),
									this.styles[t] || (this.styles[t] = this.computedStyles[t])
								);
							}),
							(n.prototype.prefixedCss = function (e) {
								var n = this.css(e);
								return (
									void 0 === n &&
										["webkit", "moz", "ms", "o"].some(function (t) {
											return (
												void 0 !==
												(n = this.css(
													t + e.substr(0, 1).toUpperCase() + e.substr(1)
												))
											);
										}, this),
									void 0 === n ? null : n
								);
							}),
							(n.prototype.computedStyle = function (t) {
								return this.node.ownerDocument.defaultView.getComputedStyle(
									this.node,
									t
								);
							}),
							(n.prototype.cssInt = function (t) {
								t = parseInt(this.css(t), 10);
								return isNaN(t) ? 0 : t;
							}),
							(n.prototype.color = function (t) {
								return this.colors[t] || (this.colors[t] = new o(this.css(t)));
							}),
							(n.prototype.cssFloat = function (t) {
								t = parseFloat(this.css(t));
								return isNaN(t) ? 0 : t;
							}),
							(n.prototype.fontWeight = function () {
								var t = this.css("fontWeight");
								switch (parseInt(t, 10)) {
									case 401:
										t = "bold";
										break;
									case 400:
										t = "normal";
								}
								return t;
							}),
							(n.prototype.parseClip = function () {
								var t = this.css("clip").match(this.CLIP);
								return t
									? {
											top: parseInt(t[1], 10),
											right: parseInt(t[2], 10),
											bottom: parseInt(t[3], 10),
											left: parseInt(t[4], 10)
										}
									: null;
							}),
							(n.prototype.parseBackgroundImages = function () {
								return (
									this.backgroundImages ||
									(this.backgroundImages = u(this.css("backgroundImage")))
								);
							}),
							(n.prototype.cssList = function (t, e) {
								t = (this.css(t) || "").split(",");
								return (
									1 ===
										(t = (t = t[e || 0] || t[0] || "auto").trim().split(" "))
											.length && (t = [t[0], s(t[0]) ? "auto" : t[0]]),
									t
								);
							}),
							(n.prototype.parseBackgroundSize = function (t, e, n) {
								var r,
									i = this.cssList("backgroundSize", n);
								if (s(i[0])) r = (t.width * parseFloat(i[0])) / 100;
								else {
									if (/contain|cover/.test(i[0])) {
										var o = t.width / t.height,
											n = e.width / e.height;
										return (o < n) ^ ("contain" === i[0])
											? {
													width: t.height * n,
													height: t.height
												}
											: {
													width: t.width,
													height: t.width / n
												};
									}
									r = parseInt(i[0], 10);
								}
								return (
									(t =
										"auto" === i[0] && "auto" === i[1]
											? e.height
											: "auto" === i[1]
												? (r / e.width) * e.height
												: s(i[1])
													? (t.height * parseFloat(i[1])) / 100
													: parseInt(i[1], 10)),
									"auto" === i[0] && (r = (t / e.height) * e.width),
									{
										width: r,
										height: t
									}
								);
							}),
							(n.prototype.parseBackgroundPosition = function (t, e, n, r) {
								var i = this.cssList("backgroundPosition", n),
									n = s(i[0])
										? (t.width - (r || e).width) * (parseFloat(i[0]) / 100)
										: parseInt(i[0], 10),
									r =
										"auto" === i[1]
											? (n / e.width) * e.height
											: s(i[1])
												? ((t.height - (r || e).height) *
														parseFloat(i[1])) /
													100
												: parseInt(i[1], 10);
								return (
									"auto" === i[0] && (n = (r / e.height) * e.width),
									{
										left: n,
										top: r
									}
								);
							}),
							(n.prototype.parseBackgroundRepeat = function (t) {
								return this.cssList("backgroundRepeat", t)[0];
							}),
							(n.prototype.parseTextShadows = function () {
								var t = this.css("textShadow"),
									e = [];
								if (t && "none" !== t)
									for (
										var n = t.match(this.TEXT_SHADOW_PROPERTY), r = 0;
										n && r < n.length;
										r++
									) {
										var i = n[r].match(this.TEXT_SHADOW_VALUES);
										e.push({
											color: new o(i[0]),
											offsetX: i[1] ? parseFloat(i[1].replace("px", "")) : 0,
											offsetY: i[2] ? parseFloat(i[2].replace("px", "")) : 0,
											blur: i[3] ? i[3].replace("px", "") : 0
										});
									}
								return e;
							}),
							(n.prototype.parseTransform = function () {
								var t, e;
								return (
									this.transformData ||
										(this.hasTransform()
											? ((t = this.parseBounds()),
												((e = this.prefixedCss("transformOrigin")
													.split(" ")
													.map(r)
													.map(i))[0] += t.left),
												(e[1] += t.top),
												(this.transformData = {
													origin: e,
													matrix: this.parseTransformMatrix()
												}))
											: (this.transformData = {
													origin: [0, 0],
													matrix: [1, 0, 0, 1, 0, 0]
												})),
									this.transformData
								);
							}),
							(n.prototype.parseTransformMatrix = function () {
								var t;
								return (
									this.transformMatrix ||
										((t = (t = this.prefixedCss("transform"))
											? (function (t) {
													if (t && "matrix" === t[1])
														return t[2].split(",").map(function (t) {
															return parseFloat(t.trim());
														});
													if (t && "matrix3d" === t[1]) {
														t = t[2].split(",").map(function (t) {
															return parseFloat(t.trim());
														});
														return [
															t[0],
															t[1],
															t[4],
															t[5],
															t[12],
															t[13]
														];
													}
												})(t.match(this.MATRIX_PROPERTY))
											: null),
										(this.transformMatrix = t || [1, 0, 0, 1, 0, 0])),
									this.transformMatrix
								);
							}),
							(n.prototype.parseBounds = function () {
								return (
									this.bounds ||
									(this.bounds = (this.hasTransform() ? c : a)(this.node))
								);
							}),
							(n.prototype.hasTransform = function () {
								return (
									"1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") ||
									(this.parent && this.parent.hasTransform())
								);
							}),
							(n.prototype.getValue = function () {
								var t,
									e = this.node.value || "";
								return (
									"SELECT" === this.node.tagName
										? (e =
												((t = (t = this.node).options[
													t.selectedIndex || 0
												]) &&
													t.text) ||
												"")
										: "password" === this.node.type &&
											(e = Array(e.length + 1).join("•")),
									0 === e.length ? this.node.placeholder || "" : e
								);
							}),
							(n.prototype.MATRIX_PROPERTY = /(matrix|matrix3d)\((.+)\)/),
							(n.prototype.TEXT_SHADOW_PROPERTY =
								/((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g),
							(n.prototype.TEXT_SHADOW_VALUES =
								/(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g),
							(n.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/),
							(e.exports = n);
					},
					{
						"./color": 3,
						"./utils": 26
					}
				],
				15: [
					function (t, e) {
						function n(t, e, n, r, i) {
							T("Starting NodeParser"),
								(this.renderer = e),
								(this.options = i),
								(this.range = null),
								(this.support = n),
								(this.renderQueue = []),
								(this.stack = new R(!0, 1, t.ownerDocument, null));
							var o = new I(t, null);
							i.background &&
								e.rectangle(0, 0, e.width, e.height, new D(i.background)),
								t === t.ownerDocument.documentElement &&
									((n = new I(
										o.color("backgroundColor").isTransparent()
											? t.ownerDocument.body
											: t.ownerDocument.documentElement,
										null
									)),
									e.rectangle(
										0,
										0,
										e.width,
										e.height,
										n.color("backgroundColor")
									)),
								(o.visibile = o.isElementVisible()),
								this.createPseudoHideStyles(t.ownerDocument),
								this.disableAnimations(t.ownerDocument),
								(this.nodes = E(
									[o]
										.concat(this.getChildren(o))
										.filter(function (t) {
											return (t.visible = t.isElementVisible());
										})
										.map(this.getPseudoElements, this)
								)),
								(this.fontMetrics = new N()),
								T("Fetched nodes, total:", this.nodes.length),
								T("Calculate overflow clips"),
								this.calculateOverflowClips(),
								T("Start fetching images"),
								(this.images = r.fetch(this.nodes.filter(x))),
								(this.ready = this.images.ready.then(
									M(function () {
										return (
											T("Images loaded, starting parsing"),
											T("Creating stacking contexts"),
											this.createStackingContexts(),
											T("Sorting stacking contexts"),
											this.sortStackingContexts(this.stack),
											this.parse(this.stack),
											T(
												"Render queue created with " +
													this.renderQueue.length +
													" items"
											),
											new Promise(
												M(function (t) {
													i.async
														? "function" == typeof i.async
															? i.async.call(
																	this,
																	this.renderQueue,
																	t
																)
															: 0 < this.renderQueue.length
																? ((this.renderIndex = 0),
																	this.asyncRenderer(
																		this.renderQueue,
																		t
																	))
																: t()
														: (this.renderQueue.forEach(
																this.paint,
																this
															),
															t());
												}, this)
											)
										);
									}, this)
								));
						}
						function r(t) {
							return t.parent && t.parent.clip.length;
						}
						function a() {}
						function u(s, a, u, c) {
							return s.map(function (t, e) {
								if (0 < t.width) {
									var n = a.left,
										r = a.top,
										i = a.width,
										o = a.height - s[2].width;
									switch (e) {
										case 0:
											(o = s[0].width),
												(t.args = h(
													{
														c1: [n, r],
														c2: [n + i, r],
														c3: [n + i - s[1].width, r + o],
														c4: [n + s[3].width, r + o]
													},
													c[0],
													c[1],
													u.topLeftOuter,
													u.topLeftInner,
													u.topRightOuter,
													u.topRightInner
												));
											break;
										case 1:
											(n = a.left + a.width - s[1].width),
												(i = s[1].width),
												(t.args = h(
													{
														c1: [n + i, r],
														c2: [n + i, r + o + s[2].width],
														c3: [n, r + o],
														c4: [n, r + s[0].width]
													},
													c[1],
													c[2],
													u.topRightOuter,
													u.topRightInner,
													u.bottomRightOuter,
													u.bottomRightInner
												));
											break;
										case 2:
											(r = r + a.height - s[2].width),
												(o = s[2].width),
												(t.args = h(
													{
														c1: [n + i, r + o],
														c2: [n, r + o],
														c3: [n + s[3].width, r],
														c4: [n + i - s[3].width, r]
													},
													c[2],
													c[3],
													u.bottomRightOuter,
													u.bottomRightInner,
													u.bottomLeftOuter,
													u.bottomLeftInner
												));
											break;
										case 3:
											(i = s[3].width),
												(t.args = h(
													{
														c1: [n, r + o + s[2].width],
														c2: [n, r],
														c3: [n + i, r + s[0].width],
														c4: [n + i, r + o]
													},
													c[3],
													c[0],
													u.bottomLeftOuter,
													u.bottomLeftInner,
													u.topLeftOuter,
													u.topLeftInner
												));
									}
								}
								return t;
							});
						}
						function v(t, e, n, r) {
							var i = ((Math.sqrt(2) - 1) / 3) * 4,
								o = n * i,
								i = r * i,
								n = t + n,
								r = e + r;
							return {
								topLeft: l(
									{
										x: t,
										y: r
									},
									{
										x: t,
										y: r - i
									},
									{
										x: n - o,
										y: e
									},
									{
										x: n,
										y: e
									}
								),
								topRight: l(
									{
										x: t,
										y: e
									},
									{
										x: t + o,
										y: e
									},
									{
										x: n,
										y: r - i
									},
									{
										x: n,
										y: r
									}
								),
								bottomRight: l(
									{
										x: n,
										y: e
									},
									{
										x: n,
										y: e + i
									},
									{
										x: t + o,
										y: r
									},
									{
										x: t,
										y: r
									}
								),
								bottomLeft: l(
									{
										x: n,
										y: r
									},
									{
										x: n - o,
										y: r
									},
									{
										x: t,
										y: e + i
									},
									{
										x: t,
										y: e
									}
								)
							};
						}
						function c(t, e, n) {
							var r = t.left,
								i = t.top,
								o = t.width,
								s = t.height,
								a = e[0][0] < o / 2 ? e[0][0] : o / 2,
								u = e[0][1] < s / 2 ? e[0][1] : s / 2,
								c = e[1][0] < o / 2 ? e[1][0] : o / 2,
								l = e[1][1] < s / 2 ? e[1][1] : s / 2,
								h = e[2][0] < o / 2 ? e[2][0] : o / 2,
								f = e[2][1] < s / 2 ? e[2][1] : s / 2,
								p = e[3][0] < o / 2 ? e[3][0] : o / 2,
								d = e[3][1] < s / 2 ? e[3][1] : s / 2,
								g = o - c,
								m = s - f,
								t = o - h,
								e = s - d;
							return {
								topLeftOuter: v(r, i, a, u).topLeft.subdivide(0.5),
								topLeftInner: v(
									r + n[3].width,
									i + n[0].width,
									Math.max(0, a - n[3].width),
									Math.max(0, u - n[0].width)
								).topLeft.subdivide(0.5),
								topRightOuter: v(r + g, i, c, l).topRight.subdivide(0.5),
								topRightInner: v(
									r + Math.min(g, o + n[3].width),
									i + n[0].width,
									g > o + n[3].width ? 0 : c - n[3].width,
									l - n[0].width
								).topRight.subdivide(0.5),
								bottomRightOuter: v(r + t, i + m, h, f).bottomRight.subdivide(0.5),
								bottomRightInner: v(
									r + Math.min(t, o - n[3].width),
									i + Math.min(m, s + n[0].width),
									Math.max(0, h - n[1].width),
									f - n[2].width
								).bottomRight.subdivide(0.5),
								bottomLeftOuter: v(r, i + e, p, d).bottomLeft.subdivide(0.5),
								bottomLeftInner: v(
									r + n[3].width,
									i + e,
									Math.max(0, p - n[3].width),
									d - n[2].width
								).bottomLeft.subdivide(0.5)
							};
						}
						function l(o, s, a, u) {
							function c(t, e, n) {
								return {
									x: t.x + (e.x - t.x) * n,
									y: t.y + (e.y - t.y) * n
								};
							}
							return {
								start: o,
								startControl: s,
								endControl: a,
								end: u,
								subdivide: function (t) {
									var e = c(o, s, t),
										n = c(s, a, t),
										r = c(a, u, t),
										i = c(e, n, t),
										n = c(n, r, t),
										t = c(i, n, t);
									return [l(o, e, i, t), l(t, n, r, u)];
								},
								curveTo: function (t) {
									t.push(["bezierCurve", s.x, s.y, a.x, a.y, u.x, u.y]);
								},
								curveToReversed: function (t) {
									t.push(["bezierCurve", a.x, a.y, s.x, s.y, o.x, o.y]);
								}
							};
						}
						function h(t, e, n, r, i, o, s) {
							var a = [];
							return (
								0 < e[0] || 0 < e[1]
									? (a.push(["line", r[1].start.x, r[1].start.y]),
										r[1].curveTo(a))
									: a.push(["line", t.c1[0], t.c1[1]]),
								0 < n[0] || 0 < n[1]
									? (a.push(["line", o[0].start.x, o[0].start.y]),
										o[0].curveTo(a),
										a.push(["line", s[0].end.x, s[0].end.y]),
										s[0].curveToReversed(a))
									: (a.push(["line", t.c2[0], t.c2[1]]),
										a.push(["line", t.c3[0], t.c3[1]])),
								0 < e[0] || 0 < e[1]
									? (a.push(["line", i[1].end.x, i[1].end.y]),
										i[1].curveToReversed(a))
									: a.push(["line", t.c4[0], t.c4[1]]),
								a
							);
						}
						function s(t, e, n, r, i, o, s) {
							0 < e[0] || 0 < e[1]
								? (t.push(["line", r[0].start.x, r[0].start.y]),
									r[0].curveTo(t),
									r[1].curveTo(t))
								: t.push(["line", o, s]),
								(0 < n[0] || 0 < n[1]) &&
									t.push(["line", i[0].start.x, i[0].start.y]);
						}
						function f(t) {
							return t.cssInt("zIndex") < 0;
						}
						function p(t) {
							return 0 < t.cssInt("zIndex");
						}
						function d(t) {
							return 0 === t.cssInt("zIndex");
						}
						function g(t) {
							return (
								-1 !==
								["inline", "inline-block", "inline-table"].indexOf(t.css("display"))
							);
						}
						function m(t) {
							return t instanceof R;
						}
						function y(t) {
							return 0 < t.node.data.trim().length;
						}
						function i(t) {
							return (
								t.nodeType === Node.TEXT_NODE || t.nodeType === Node.ELEMENT_NODE
							);
						}
						function b(t) {
							return "static" !== t.css("position");
						}
						function w(t) {
							return "none" !== t.css("float");
						}
						function _(t) {
							var e = this;
							return function () {
								return !t.apply(e, arguments);
							};
						}
						function x(t) {
							return t.node.nodeType === Node.ELEMENT_NODE;
						}
						function o(t) {
							return !0 === t.isPseudoElement;
						}
						function C(t) {
							return t.node.nodeType === Node.TEXT_NODE;
						}
						function k(t) {
							return parseInt(t, 10);
						}
						function S(t) {
							return t.width;
						}
						function O(t) {
							return (
								t.node.nodeType !== Node.ELEMENT_NODE ||
								-1 ===
									["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(
										t.node.nodeName
									)
							);
						}
						function E(t) {
							return [].concat.apply([], t);
						}
						var T = t("./log"),
							A = t("punycode"),
							I = t("./nodecontainer"),
							j = t("./textcontainer"),
							P = t("./pseudoelementcontainer"),
							N = t("./fontmetrics"),
							D = t("./color"),
							R = t("./stackingcontext"),
							t = t("./utils"),
							M = t.bind,
							W = t.getBounds,
							L = t.parseBackgrounds,
							F = t.offsetBounds;
						(n.prototype.calculateOverflowClips = function () {
							this.nodes.forEach(function (t) {
								var e, n;
								x(t)
									? (o(t) && t.appendToDOM(),
										(t.borders = this.parseBorders(t)),
										(e =
											"hidden" === t.css("overflow") ? [t.borders.clip] : []),
										(n = t.parseClip()) &&
											-1 !==
												["absolute", "fixed"].indexOf(t.css("position")) &&
											e.push([
												[
													"rect",
													t.bounds.left + n.left,
													t.bounds.top + n.top,
													n.right - n.left,
													n.bottom - n.top
												]
											]),
										(t.clip = r(t) ? t.parent.clip.concat(e) : e),
										(t.backgroundClip =
											"hidden" !== t.css("overflow")
												? t.clip.concat([t.borders.clip])
												: t.clip),
										o(t) && t.cleanDOM())
									: C(t) && (t.clip = r(t) ? t.parent.clip : []),
									o(t) || (t.bounds = null);
							}, this);
						}),
							(n.prototype.asyncRenderer = function (t, e, n) {
								(n = n || Date.now()),
									this.paint(t[this.renderIndex++]),
									t.length === this.renderIndex
										? e()
										: n + 20 > Date.now()
											? this.asyncRenderer(t, e, n)
											: setTimeout(
													M(function () {
														this.asyncRenderer(t, e);
													}, this),
													0
												);
							}),
							(n.prototype.createPseudoHideStyles = function (t) {
								this.createStyles(
									t,
									"." +
										P.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE +
										':before { content: "" !important; display: none !important; }.' +
										P.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER +
										':after { content: "" !important; display: none !important; }'
								);
							}),
							(n.prototype.disableAnimations = function (t) {
								this.createStyles(
									t,
									"* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}"
								);
							}),
							(n.prototype.createStyles = function (t, e) {
								var n = t.createElement("style");
								(n.innerHTML = e), t.body.appendChild(n);
							}),
							(n.prototype.getPseudoElements = function (t) {
								var e,
									n = [[t]];
								return (
									t.node.nodeType === Node.ELEMENT_NODE &&
										((e = this.getPseudoElement(t, ":before")),
										(t = this.getPseudoElement(t, ":after")),
										e && n.push(e),
										t && n.push(t)),
									E(n)
								);
							}),
							(n.prototype.getPseudoElement = function (t, e) {
								var n = t.computedStyle(e);
								if (
									!n ||
									!n.content ||
									"none" === n.content ||
									"-moz-alt-content" === n.content ||
									"none" === n.display
								)
									return null;
								for (
									var r,
										i =
											((r = n.content),
											(i = r.substr(0, 1)) === r.substr(r.length - 1) &&
											i.match(/'|"/)
												? r.substr(1, r.length - 2)
												: r),
										r = "url" === i.substr(0, 3),
										o = document.createElement(
											r ? "img" : "html2canvaspseudoelement"
										),
										e = new P(o, t, e),
										s = n.length - 1;
									0 <= s;
									s--
								) {
									var a = n.item(s).replace(/(\-[a-z])/g, function (t) {
										return t.toUpperCase().replace("-", "");
									});
									o.style[a] = n[a];
								}
								if (
									((o.className =
										P.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE +
										" " +
										P.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER),
									r)
								)
									return (o.src = L(i)[0].args[0]), [e];
								var i = document.createTextNode(i);
								return o.appendChild(i), [e, new j(i, e)];
							}),
							(n.prototype.getChildren = function (n) {
								return E(
									[].filter.call(n.node.childNodes, i).map(function (t) {
										var e = [
											new (t.nodeType === Node.TEXT_NODE ? j : I)(t, n)
										].filter(O);
										return t.nodeType === Node.ELEMENT_NODE &&
											e.length &&
											"TEXTAREA" !== t.tagName
											? e[0].isElementVisible()
												? e.concat(this.getChildren(e[0]))
												: []
											: e;
									}, this)
								);
							}),
							(n.prototype.newStackingContext = function (t, e) {
								var n = new R(e, t.getOpacity(), t.node, t.parent);
								t.cloneTo(n),
									(e ? n.getParentStack(this) : n.parent.stack).contexts.push(n),
									(t.stack = n);
							}),
							(n.prototype.createStackingContexts = function () {
								this.nodes.forEach(function (t) {
									var e, n;
									x(t) &&
									(this.isRootElement(t) ||
										t.getOpacity() < 1 ||
										((n = (e = t).css("position")),
										"auto" !==
											(-1 !== ["absolute", "relative", "fixed"].indexOf(n)
												? e.css("zIndex")
												: "auto")) ||
										this.isBodyWithTransparentRoot(t) ||
										t.hasTransform())
										? this.newStackingContext(t, !0)
										: x(t) &&
											  ((b(t) && d(t)) ||
													-1 !==
														["inline-block", "inline-table"].indexOf(
															t.css("display")
														) ||
													w(t))
											? this.newStackingContext(t, !1)
											: t.assignStack(t.parent.stack);
								}, this);
							}),
							(n.prototype.isBodyWithTransparentRoot = function (t) {
								return (
									"BODY" === t.node.nodeName &&
									t.parent.color("backgroundColor").isTransparent()
								);
							}),
							(n.prototype.isRootElement = function (t) {
								return null === t.parent;
							}),
							(n.prototype.sortStackingContexts = function (t) {
								var n;
								t.contexts.sort(
									((n = t.contexts.slice(0)),
									function (t, e) {
										return (
											t.cssInt("zIndex") +
											n.indexOf(t) / n.length -
											(e.cssInt("zIndex") + n.indexOf(e) / n.length)
										);
									})
								),
									t.contexts.forEach(this.sortStackingContexts, this);
							}),
							(n.prototype.parseTextBounds = function (i) {
								return function (t, e, n) {
									if (
										"none" !== i.parent.css("textDecoration").substr(0, 4) ||
										0 !== t.trim().length
									) {
										if (this.support.rangeBounds && !i.parent.hasTransform()) {
											var r = n.slice(0, e).join("").length;
											return this.getRangeBounds(i.node, r, t.length);
										}
										if (i.node && "string" == typeof i.node.data) {
											(e = i.node.splitText(t.length)),
												(r = this.getWrapperBounds(
													i.node,
													i.parent.hasTransform()
												));
											return (i.node = e), r;
										}
									} else
										(this.support.rangeBounds && !i.parent.hasTransform()) ||
											(i.node = i.node.splitText(t.length));
									return {};
								};
							}),
							(n.prototype.getWrapperBounds = function (t, e) {
								var n = t.ownerDocument.createElement("html2canvaswrapper"),
									r = t.parentNode,
									i = t.cloneNode(!0);
								n.appendChild(t.cloneNode(!0)), r.replaceChild(n, t);
								e = (e ? F : W)(n);
								return r.replaceChild(i, n), e;
							}),
							(n.prototype.getRangeBounds = function (t, e, n) {
								var r = this.range || (this.range = t.ownerDocument.createRange());
								return (
									r.setStart(t, e), r.setEnd(t, e + n), r.getBoundingClientRect()
								);
							}),
							(n.prototype.parse = function (t) {
								var e = t.contexts.filter(f),
									n = t.children.filter(x),
									r = n.filter(_(w)),
									i = r.filter(_(b)).filter(_(g)),
									o = n.filter(_(b)).filter(w),
									s = r.filter(_(b)).filter(g),
									n = t.contexts.concat(r.filter(b)).filter(d),
									r = t.children.filter(C).filter(y),
									t = t.contexts.filter(p);
								e.concat(i)
									.concat(o)
									.concat(s)
									.concat(n)
									.concat(r)
									.concat(t)
									.forEach(function (t) {
										this.renderQueue.push(t),
											m(t) && (this.parse(t), this.renderQueue.push(new a()));
									}, this);
							}),
							(n.prototype.paint = function (t) {
								try {
									t instanceof a
										? this.renderer.ctx.restore()
										: C(t)
											? (o(t.parent) && t.parent.appendToDOM(),
												this.paintText(t),
												o(t.parent) && t.parent.cleanDOM())
											: this.paintNode(t);
								} catch (t) {
									if ((T(t), this.options.strict)) throw t;
								}
							}),
							(n.prototype.paintNode = function (t) {
								m(t) &&
									(this.renderer.setOpacity(t.opacity),
									this.renderer.ctx.save(),
									t.hasTransform() &&
										this.renderer.setTransform(t.parseTransform())),
									"INPUT" === t.node.nodeName && "checkbox" === t.node.type
										? this.paintCheckbox(t)
										: "INPUT" === t.node.nodeName && "radio" === t.node.type
											? this.paintRadio(t)
											: this.paintElement(t);
							}),
							(n.prototype.paintElement = function (e) {
								var n = e.parseBounds();
								this.renderer.clip(
									e.backgroundClip,
									function () {
										this.renderer.renderBackground(
											e,
											n,
											e.borders.borders.map(S)
										);
									},
									this
								),
									this.renderer.clip(
										e.clip,
										function () {
											this.renderer.renderBorders(e.borders.borders);
										},
										this
									),
									this.renderer.clip(
										e.backgroundClip,
										function () {
											switch (e.node.nodeName) {
												case "svg":
												case "IFRAME":
													var t = this.images.get(e.node);
													t
														? this.renderer.renderImage(
																e,
																n,
																e.borders,
																t
															)
														: T(
																"Error loading <" +
																	e.node.nodeName +
																	">",
																e.node
															);
													break;
												case "IMG":
													t = this.images.get(e.node.src);
													t
														? this.renderer.renderImage(
																e,
																n,
																e.borders,
																t
															)
														: T("Error loading <img>", e.node.src);
													break;
												case "CANVAS":
													this.renderer.renderImage(e, n, e.borders, {
														image: e.node
													});
													break;
												case "SELECT":
												case "INPUT":
												case "TEXTAREA":
													this.paintFormValue(e);
											}
										},
										this
									);
							}),
							(n.prototype.paintCheckbox = function (t) {
								var e = t.parseBounds(),
									n = Math.min(e.width, e.height),
									r = {
										width: n - 1,
										height: n - 1,
										top: e.top,
										left: e.left
									},
									e = [3, 3],
									i = [e, e, e, e],
									o = [1, 1, 1, 1].map(function (t) {
										return {
											color: new D("#A5A5A5"),
											width: t
										};
									}),
									s = c(r, i, o);
								this.renderer.clip(
									t.backgroundClip,
									function () {
										this.renderer.rectangle(
											r.left + 1,
											r.top + 1,
											r.width - 2,
											r.height - 2,
											new D("#DEDEDE")
										),
											this.renderer.renderBorders(u(o, r, s, i)),
											t.node.checked &&
												(this.renderer.font(
													new D("#424242"),
													"normal",
													"normal",
													"bold",
													n - 3 + "px",
													"arial"
												),
												this.renderer.text(
													"✔",
													r.left + n / 6,
													r.top + n - 1
												));
									},
									this
								);
							}),
							(n.prototype.paintRadio = function (t) {
								var e = t.parseBounds(),
									n = Math.min(e.width, e.height) - 2;
								this.renderer.clip(
									t.backgroundClip,
									function () {
										this.renderer.circleStroke(
											e.left + 1,
											e.top + 1,
											n,
											new D("#DEDEDE"),
											1,
											new D("#A5A5A5")
										),
											t.node.checked &&
												this.renderer.circle(
													Math.ceil(e.left + n / 4) + 1,
													Math.ceil(e.top + n / 4) + 1,
													Math.floor(n / 2),
													new D("#424242")
												);
									},
									this
								);
							}),
							(n.prototype.paintFormValue = function (e) {
								var t,
									n,
									r,
									i = e.getValue();
								0 < i.length &&
									((t = e.node.ownerDocument),
									(n = t.createElement("html2canvaswrapper")),
									[
										"lineHeight",
										"textAlign",
										"fontFamily",
										"fontWeight",
										"fontSize",
										"color",
										"paddingLeft",
										"paddingTop",
										"paddingRight",
										"paddingBottom",
										"width",
										"height",
										"borderLeftStyle",
										"borderTopStyle",
										"borderLeftWidth",
										"borderTopWidth",
										"boxSizing",
										"whiteSpace",
										"wordWrap"
									].forEach(function (t) {
										try {
											n.style[t] = e.css(t);
										} catch (t) {
											T(
												"html2canvas: Parse: Exception caught in renderFormValue: " +
													t.message
											);
										}
									}),
									(r = e.parseBounds()),
									(n.style.position = "fixed"),
									(n.style.left = r.left + "px"),
									(n.style.top = r.top + "px"),
									(n.textContent = i),
									t.body.appendChild(n),
									this.paintText(new j(n.firstChild, e)),
									t.body.removeChild(n));
							}),
							(n.prototype.paintText = function (n) {
								n.applyTextTransform();
								var t = A.ucs2.decode(n.node.data),
									r =
										(this.options.letterRendering &&
											!/^(normal|none|0px)$/.test(
												n.parent.css("letterSpacing")
											)) ||
										/[^\u0000-\u00ff]/.test(n.node.data)
											? t.map(function (t) {
													return A.ucs2.encode([t]);
												})
											: (function (t) {
													for (var e, n = [], r = 0, i = !1; t.length; )
														(-1 !==
															[32, 13, 10, 9, 45].indexOf(t[r])) ===
														i
															? ((e = t.splice(0, r)).length &&
																	n.push(A.ucs2.encode(e)),
																(i = !i),
																(r = 0))
															: r++,
															r >= t.length &&
																(e = t.splice(0, r)).length &&
																n.push(A.ucs2.encode(e));
													return n;
												})(t),
									e = n.parent.fontWeight(),
									i = n.parent.css("fontSize"),
									o = n.parent.css("fontFamily"),
									t = n.parent.parseTextShadows();
								this.renderer.font(
									n.parent.color("color"),
									n.parent.css("fontStyle"),
									n.parent.css("fontVariant"),
									e,
									i,
									o
								),
									t.length
										? this.renderer.fontShadow(
												t[0].color,
												t[0].offsetX,
												t[0].offsetY,
												t[0].blur
											)
										: this.renderer.clearShadow(),
									this.renderer.clip(
										n.parent.clip,
										function () {
											r.map(this.parseTextBounds(n), this).forEach(function (
												t,
												e
											) {
												t &&
													(this.renderer.text(r[e], t.left, t.bottom),
													this.renderTextDecoration(
														n.parent,
														t,
														this.fontMetrics.getMetrics(o, i)
													));
											}, this);
										},
										this
									);
							}),
							(n.prototype.renderTextDecoration = function (t, e, n) {
								switch (t.css("textDecoration").split(" ")[0]) {
									case "underline":
										this.renderer.rectangle(
											e.left,
											Math.round(e.top + n.baseline + n.lineWidth),
											e.width,
											1,
											t.color("color")
										);
										break;
									case "overline":
										this.renderer.rectangle(
											e.left,
											Math.round(e.top),
											e.width,
											1,
											t.color("color")
										);
										break;
									case "line-through":
										this.renderer.rectangle(
											e.left,
											Math.ceil(e.top + n.middle + n.lineWidth),
											e.width,
											1,
											t.color("color")
										);
								}
							});
						var H = {
							inset: [
								["darken", 0.6],
								["darken", 0.1],
								["darken", 0.1],
								["darken", 0.6]
							]
						};
						(n.prototype.parseBorders = function (i) {
							var e,
								t = i.parseBounds(),
								n =
									((e = i),
									["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(
										function (t) {
											t = e.css("border" + t + "Radius").split(" ");
											return t.length <= 1 && (t[1] = t[0]), t.map(k);
										}
									)),
								r = ["Top", "Right", "Bottom", "Left"].map(function (t, e) {
									var n = i.css("border" + t + "Style"),
										r = i.color("border" + t + "Color");
									"inset" === n &&
										r.isBlack() &&
										(r = new D([255, 255, 255, r.a]));
									e = H[n] ? H[n][e] : null;
									return {
										width: i.cssInt("border" + t + "Width"),
										color: e ? r[e[0]](e[1]) : r,
										args: null
									};
								}),
								o = c(t, n, r);
							return {
								clip: this.parseBackgroundClip(i, o, r, n, t),
								borders: u(r, t, o, n)
							};
						}),
							(n.prototype.parseBackgroundClip = function (t, e, n, r, i) {
								var o = [];
								switch (t.css("backgroundClip")) {
									case "content-box":
									case "padding-box":
										s(
											o,
											r[0],
											r[1],
											e.topLeftInner,
											e.topRightInner,
											i.left + n[3].width,
											i.top + n[0].width
										),
											s(
												o,
												r[1],
												r[2],
												e.topRightInner,
												e.bottomRightInner,
												i.left + i.width - n[1].width,
												i.top + n[0].width
											),
											s(
												o,
												r[2],
												r[3],
												e.bottomRightInner,
												e.bottomLeftInner,
												i.left + i.width - n[1].width,
												i.top + i.height - n[2].width
											),
											s(
												o,
												r[3],
												r[0],
												e.bottomLeftInner,
												e.topLeftInner,
												i.left + n[3].width,
												i.top + i.height - n[2].width
											);
										break;
									default:
										s(
											o,
											r[0],
											r[1],
											e.topLeftOuter,
											e.topRightOuter,
											i.left,
											i.top
										),
											s(
												o,
												r[1],
												r[2],
												e.topRightOuter,
												e.bottomRightOuter,
												i.left + i.width,
												i.top
											),
											s(
												o,
												r[2],
												r[3],
												e.bottomRightOuter,
												e.bottomLeftOuter,
												i.left + i.width,
												i.top + i.height
											),
											s(
												o,
												r[3],
												r[0],
												e.bottomLeftOuter,
												e.topLeftOuter,
												i.left,
												i.top + i.height
											);
								}
								return o;
							}),
							(e.exports = n);
					},
					{
						"./color": 3,
						"./fontmetrics": 7,
						"./log": 13,
						"./nodecontainer": 14,
						"./pseudoelementcontainer": 18,
						"./stackingcontext": 21,
						"./textcontainer": 25,
						"./utils": 26,
						punycode: 1
					}
				],
				16: [
					function (t, e, n) {
						function a(t, e, n) {
							var r = "withCredentials" in new XMLHttpRequest();
							if (!e) return Promise.reject("No proxy configured");
							var i = s(r),
								t = u(e, t, i);
							return r
								? c(t)
								: o(n, t, i).then(function (t) {
										return f(t.content);
									});
						}
						function o(i, o, s) {
							return new Promise(function (e, n) {
								function r() {
									delete window.html2canvas.proxy[s], i.body.removeChild(t);
								}
								var t = i.createElement("script");
								(window.html2canvas.proxy[s] = function (t) {
									r(), e(t);
								}),
									(t.src = o),
									(t.onerror = function (t) {
										r(), n(t);
									}),
									i.body.appendChild(t);
							});
						}
						function s(t) {
							return t
								? ""
								: "html2canvas_" +
										Date.now() +
										"_" +
										++i +
										"_" +
										Math.round(1e5 * Math.random());
						}
						function u(t, e, n) {
							return (
								t +
								"?url=" +
								encodeURIComponent(e) +
								(n.length ? "&callback=html2canvas.proxy." + n : "")
							);
						}
						var c = t("./xhr"),
							r = t("./utils"),
							l = t("./log"),
							h = t("./clone"),
							f = r.decode64,
							i = 0;
						(n.Proxy = a),
							(n.ProxyURL = function (t, e, n) {
								var r = "crossOrigin" in new Image(),
									i = s(r),
									t = u(e, t, i);
								return r
									? Promise.resolve(t)
									: o(n, t, i).then(function (t) {
											return "data:" + t.type + ";base64," + t.content;
										});
							}),
							(n.loadUrlDocument = function (t, e, n, r, i, o) {
								return new a(t, e, window.document)
									.then(
										((s = t),
										function (e) {
											var n,
												t = new DOMParser();
											try {
												n = t.parseFromString(e, "text/html");
											} catch (t) {
												l(
													"DOMParser not supported, falling back to createHTMLDocument"
												),
													(n =
														document.implementation.createHTMLDocument(
															""
														));
												try {
													n.open(), n.write(e), n.close();
												} catch (t) {
													l(
														"createHTMLDocument write not supported, falling back to document.body.innerHTML"
													),
														(n.body.innerHTML = e);
												}
											}
											var r = n.querySelector("base");
											return (
												(r && r.href.host) ||
													(((r = n.createElement("base")).href = s),
													n.head.insertBefore(r, n.head.firstChild)),
												n
											);
										})
									)
									.then(function (t) {
										return h(t, n, r, i, o, 0, 0);
									});
								var s;
							});
					},
					{
						"./clone": 2,
						"./log": 13,
						"./utils": 26,
						"./xhr": 28
					}
				],
				17: [
					function (t, e) {
						var o = t("./proxy").ProxyURL;
						e.exports = function (n, r) {
							var t = document.createElement("a");
							(t.href = n), (n = t.href), (this.src = n), (this.image = new Image());
							var i = this;
							this.promise = new Promise(function (t, e) {
								(i.image.crossOrigin = "Anonymous"),
									(i.image.onload = t),
									(i.image.onerror = e),
									new o(n, r, document)
										.then(function (t) {
											i.image.src = t;
										})
										.catch(e);
							});
						};
					},
					{
						"./proxy": 16
					}
				],
				18: [
					function (t, e) {
						function n(t, e, n) {
							r.call(this, t, e),
								(this.isPseudoElement = !0),
								(this.before = ":before" === n);
						}
						var r = t("./nodecontainer");
						(n.prototype.cloneTo = function (t) {
							n.prototype.cloneTo.call(this, t),
								(t.isPseudoElement = !0),
								(t.before = this.before);
						}),
							((n.prototype = Object.create(r.prototype)).appendToDOM = function () {
								this.before
									? this.parent.node.insertBefore(
											this.node,
											this.parent.node.firstChild
										)
									: this.parent.node.appendChild(this.node),
									(this.parent.node.className += " " + this.getHideClass());
							}),
							(n.prototype.cleanDOM = function () {
								this.node.parentNode.removeChild(this.node),
									(this.parent.node.className =
										this.parent.node.className.replace(
											this.getHideClass(),
											""
										));
							}),
							(n.prototype.getHideClass = function () {
								return this[
									"PSEUDO_HIDE_ELEMENT_CLASS_" +
										(this.before ? "BEFORE" : "AFTER")
								];
							}),
							(n.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE =
								"___html2canvas___pseudoelement_before"),
							(n.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER =
								"___html2canvas___pseudoelement_after"),
							(e.exports = n);
					},
					{
						"./nodecontainer": 14
					}
				],
				19: [
					function (t, e) {
						function n(t, e, n, r, i) {
							(this.width = t),
								(this.height = e),
								(this.images = n),
								(this.options = r),
								(this.document = i);
						}
						var a = t("./log");
						(n.prototype.renderImage = function (t, e, n, r) {
							var i = t.cssInt("paddingLeft"),
								o = t.cssInt("paddingTop"),
								s = t.cssInt("paddingRight"),
								t = t.cssInt("paddingBottom"),
								n = n.borders,
								s = e.width - (n[1].width + n[3].width + i + s),
								t = e.height - (n[0].width + n[2].width + o + t);
							this.drawImage(
								r,
								0,
								0,
								r.image.width || s,
								r.image.height || t,
								e.left + i + n[3].width,
								e.top + o + n[0].width,
								s,
								t
							);
						}),
							(n.prototype.renderBackground = function (t, e, n) {
								0 < e.height &&
									0 < e.width &&
									(this.renderBackgroundColor(t, e),
									this.renderBackgroundImage(t, e, n));
							}),
							(n.prototype.renderBackgroundColor = function (t, e) {
								t = t.color("backgroundColor");
								t.isTransparent() ||
									this.rectangle(e.left, e.top, e.width, e.height, t);
							}),
							(n.prototype.renderBorders = function (t) {
								t.forEach(this.renderBorder, this);
							}),
							(n.prototype.renderBorder = function (t) {
								t.color.isTransparent() ||
									null === t.args ||
									this.drawShape(t.args, t.color);
							}),
							(n.prototype.renderBackgroundImage = function (i, o, s) {
								i.parseBackgroundImages()
									.reverse()
									.forEach(function (t, e, n) {
										switch (t.method) {
											case "url":
												var r = this.images.get(t.args[0]);
												r
													? this.renderBackgroundRepeating(
															i,
															o,
															r,
															n.length - (e + 1),
															s
														)
													: a(
															"Error loading background-image",
															t.args[0]
														);
												break;
											case "linear-gradient":
											case "gradient":
												r = this.images.get(t.value);
												r
													? this.renderBackgroundGradient(r, o, s)
													: a(
															"Error loading background-image",
															t.args[0]
														);
												break;
											case "none":
												break;
											default:
												a("Unknown background-image type", t.args[0]);
										}
									}, this);
							}),
							(n.prototype.renderBackgroundRepeating = function (t, e, n, r, i) {
								var o = t.parseBackgroundSize(e, n.image, r),
									s = t.parseBackgroundPosition(e, n.image, r, o);
								switch (t.parseBackgroundRepeat(r)) {
									case "repeat-x":
									case "repeat no-repeat":
										this.backgroundRepeatShape(
											n,
											s,
											o,
											e,
											e.left + i[3],
											e.top + s.top + i[0],
											99999,
											o.height,
											i
										);
										break;
									case "repeat-y":
									case "no-repeat repeat":
										this.backgroundRepeatShape(
											n,
											s,
											o,
											e,
											e.left + s.left + i[3],
											e.top + i[0],
											o.width,
											99999,
											i
										);
										break;
									case "no-repeat":
										this.backgroundRepeatShape(
											n,
											s,
											o,
											e,
											e.left + s.left + i[3],
											e.top + s.top + i[0],
											o.width,
											o.height,
											i
										);
										break;
									default:
										this.renderBackgroundRepeat(
											n,
											s,
											o,
											{
												top: e.top,
												left: e.left
											},
											i[3],
											i[0]
										);
								}
							}),
							(e.exports = n);
					},
					{
						"./log": 13
					}
				],
				20: [
					function (t, e) {
						function n(t, e) {
							i.apply(this, arguments),
								(this.canvas =
									this.options.canvas || this.document.createElement("canvas")),
								this.options.canvas ||
									((this.canvas.width = t), (this.canvas.height = e)),
								(this.ctx = this.canvas.getContext("2d")),
								(this.taintCtx = this.document
									.createElement("canvas")
									.getContext("2d")),
								(this.ctx.textBaseline = "bottom"),
								(this.variables = {}),
								s("Initialized CanvasRenderer with size", t, "x", e);
						}
						function r(t) {
							return 0 < t.length;
						}
						var i = t("../renderer"),
							o = t("../lineargradientcontainer"),
							s = t("../log");
						((n.prototype = Object.create(i.prototype)).setFillStyle = function (t) {
							return (
								(this.ctx.fillStyle =
									"object" == typeof t && t.isColor ? t.toString() : t),
								this.ctx
							);
						}),
							(n.prototype.rectangle = function (t, e, n, r, i) {
								this.setFillStyle(i).fillRect(t, e, n, r);
							}),
							(n.prototype.circle = function (t, e, n, r) {
								this.setFillStyle(r),
									this.ctx.beginPath(),
									this.ctx.arc(t + n / 2, e + n / 2, n / 2, 0, 2 * Math.PI, !0),
									this.ctx.closePath(),
									this.ctx.fill();
							}),
							(n.prototype.circleStroke = function (t, e, n, r, i, o) {
								this.circle(t, e, n, r),
									(this.ctx.strokeStyle = o.toString()),
									this.ctx.stroke();
							}),
							(n.prototype.drawShape = function (t, e) {
								this.shape(t), this.setFillStyle(e).fill();
							}),
							(n.prototype.taints = function (e) {
								if (null === e.tainted) {
									this.taintCtx.drawImage(e.image, 0, 0);
									try {
										this.taintCtx.getImageData(0, 0, 1, 1), (e.tainted = !1);
									} catch (t) {
										(this.taintCtx = document
											.createElement("canvas")
											.getContext("2d")),
											(e.tainted = !0);
									}
								}
								return e.tainted;
							}),
							(n.prototype.drawImage = function (t, e, n, r, i, o, s, a, u) {
								(this.taints(t) && !this.options.allowTaint) ||
									this.ctx.drawImage(t.image, e, n, r, i, o, s, a, u);
							}),
							(n.prototype.clip = function (t, e, n) {
								this.ctx.save(),
									t.filter(r).forEach(function (t) {
										this.shape(t).clip();
									}, this),
									e.call(n),
									this.ctx.restore();
							}),
							(n.prototype.shape = function (t) {
								return (
									this.ctx.beginPath(),
									t.forEach(function (t, e) {
										("rect" === t[0]
											? this.ctx.rect
											: this.ctx[0 === e ? "moveTo" : t[0] + "To"]
										).apply(this.ctx, t.slice(1));
									}, this),
									this.ctx.closePath(),
									this.ctx
								);
							}),
							(n.prototype.font = function (t, e, n, r, i, o) {
								this.setFillStyle(t).font = [e, n, r, i, o].join(" ").split(",")[0];
							}),
							(n.prototype.fontShadow = function (t, e, n, r) {
								this.setVariable("shadowColor", t.toString())
									.setVariable("shadowOffsetY", e)
									.setVariable("shadowOffsetX", n)
									.setVariable("shadowBlur", r);
							}),
							(n.prototype.clearShadow = function () {
								this.setVariable("shadowColor", "rgba(0,0,0,0)");
							}),
							(n.prototype.setOpacity = function (t) {
								this.ctx.globalAlpha = t;
							}),
							(n.prototype.setTransform = function (t) {
								this.ctx.translate(t.origin[0], t.origin[1]),
									this.ctx.transform.apply(this.ctx, t.matrix),
									this.ctx.translate(-t.origin[0], -t.origin[1]);
							}),
							(n.prototype.setVariable = function (t, e) {
								return (
									this.variables[t] !== e &&
										(this.variables[t] = this.ctx[t] = e),
									this
								);
							}),
							(n.prototype.text = function (t, e, n) {
								this.ctx.fillText(t, e, n);
							}),
							(n.prototype.backgroundRepeatShape = function (
								t,
								e,
								n,
								r,
								i,
								o,
								s,
								a,
								u
							) {
								o = [
									["line", Math.round(i), Math.round(o)],
									["line", Math.round(i + s), Math.round(o)],
									["line", Math.round(i + s), Math.round(a + o)],
									["line", Math.round(i), Math.round(a + o)]
								];
								this.clip(
									[o],
									function () {
										this.renderBackgroundRepeat(t, e, n, r, u[3], u[0]);
									},
									this
								);
							}),
							(n.prototype.renderBackgroundRepeat = function (t, e, n, r, i, o) {
								(i = Math.round(r.left + e.left + i)),
									(o = Math.round(r.top + e.top + o));
								this.setFillStyle(
									this.ctx.createPattern(this.resizeImage(t, n), "repeat")
								),
									this.ctx.translate(i, o),
									this.ctx.fill(),
									this.ctx.translate(-i, -o);
							}),
							(n.prototype.renderBackgroundGradient = function (t, e) {
								var n;
								t instanceof o &&
									((n = this.ctx.createLinearGradient(
										e.left + e.width * t.x0,
										e.top + e.height * t.y0,
										e.left + e.width * t.x1,
										e.top + e.height * t.y1
									)),
									t.colorStops.forEach(function (t) {
										n.addColorStop(t.stop, t.color.toString());
									}),
									this.rectangle(e.left, e.top, e.width, e.height, n));
							}),
							(n.prototype.resizeImage = function (t, e) {
								var n = t.image;
								if (n.width === e.width && n.height === e.height) return n;
								t = document.createElement("canvas");
								return (
									(t.width = e.width),
									(t.height = e.height),
									t
										.getContext("2d")
										.drawImage(
											n,
											0,
											0,
											n.width,
											n.height,
											0,
											0,
											e.width,
											e.height
										),
									t
								);
							}),
							(e.exports = n);
					},
					{
						"../lineargradientcontainer": 12,
						"../log": 13,
						"../renderer": 19
					}
				],
				21: [
					function (t, e) {
						function n(t, e, n, r) {
							i.call(this, n, r),
								(this.ownStacking = t),
								(this.contexts = []),
								(this.children = []),
								(this.opacity = (this.parent ? this.parent.stack.opacity : 1) * e);
						}
						var i = t("./nodecontainer");
						((n.prototype = Object.create(i.prototype)).getParentStack = function (t) {
							var e = this.parent ? this.parent.stack : null;
							return e ? (e.ownStacking ? e : e.getParentStack(t)) : t.stack;
						}),
							(e.exports = n);
					},
					{
						"./nodecontainer": 14
					}
				],
				22: [
					function (t, e) {
						function n(t) {
							(this.rangeBounds = this.testRangeBounds(t)),
								(this.cors = this.testCORS()),
								(this.svg = this.testSVG());
						}
						(n.prototype.testRangeBounds = function (t) {
							var e,
								n,
								r = !1;
							return (
								t.createRange &&
									(e = t.createRange()).getBoundingClientRect &&
									(((n = t.createElement("boundtest")).style.height = "123px"),
									(n.style.display = "block"),
									t.body.appendChild(n),
									e.selectNode(n),
									123 === e.getBoundingClientRect().height && (r = !0),
									t.body.removeChild(n)),
								r
							);
						}),
							(n.prototype.testCORS = function () {
								return void 0 !== new Image().crossOrigin;
							}),
							(n.prototype.testSVG = function () {
								var t = new Image(),
									e = document.createElement("canvas"),
									n = e.getContext("2d");
								t.src =
									"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
								try {
									n.drawImage(t, 0, 0), e.toDataURL();
								} catch (t) {
									return !1;
								}
								return !0;
							}),
							(e.exports = n);
					},
					{}
				],
				23: [
					function (t, e) {
						function n(t) {
							(this.src = t), (this.image = null);
							var n = this;
							this.promise = this.hasFabric()
								.then(function () {
									return n.isInline(t)
										? Promise.resolve(n.inlineFormatting(t))
										: r(t);
								})
								.then(function (e) {
									return new Promise(function (t) {
										window.html2canvas.svg.fabric.loadSVGFromString(
											e,
											n.createCanvas.call(n, t)
										);
									});
								});
						}
						var r = t("./xhr"),
							i = t("./utils").decode64;
						(n.prototype.hasFabric = function () {
							return window.html2canvas.svg && window.html2canvas.svg.fabric
								? Promise.resolve()
								: Promise.reject(
										new Error(
											"html2canvas.svg.js is not loaded, cannot render svg"
										)
									);
						}),
							(n.prototype.inlineFormatting = function (t) {
								return /^data:image\/svg\+xml;base64,/.test(t)
									? this.decode64(this.removeContentType(t))
									: this.removeContentType(t);
							}),
							(n.prototype.removeContentType = function (t) {
								return t.replace(/^data:image\/svg\+xml(;base64)?,/, "");
							}),
							(n.prototype.isInline = function (t) {
								return /^data:image\/svg\+xml/i.test(t);
							}),
							(n.prototype.createCanvas = function (r) {
								var i = this;
								return function (t, e) {
									var n = new window.html2canvas.svg.fabric.StaticCanvas("c");
									(i.image = n.lowerCanvasEl),
										n
											.setWidth(e.width)
											.setHeight(e.height)
											.add(
												window.html2canvas.svg.fabric.util.groupSVGElements(
													t,
													e
												)
											)
											.renderAll(),
										r(n.lowerCanvasEl);
								};
							}),
							(n.prototype.decode64 = function (t) {
								return "function" == typeof window.atob ? window.atob(t) : i(t);
							}),
							(e.exports = n);
					},
					{
						"./utils": 26,
						"./xhr": 28
					}
				],
				24: [
					function (t, e) {
						function n(n, t) {
							(this.src = n), (this.image = null);
							var r = this;
							this.promise = t
								? new Promise(function (t, e) {
										(r.image = new Image()),
											(r.image.onload = t),
											(r.image.onerror = e),
											(r.image.src =
												"data:image/svg+xml," +
												new XMLSerializer().serializeToString(n)),
											!0 === r.image.complete && t(r.image);
									})
								: this.hasFabric().then(function () {
										return new Promise(function (t) {
											window.html2canvas.svg.fabric.parseSVGDocument(
												n,
												r.createCanvas.call(r, t)
											);
										});
									});
						}
						t = t("./svgcontainer");
						(n.prototype = Object.create(t.prototype)), (e.exports = n);
					},
					{
						"./svgcontainer": 23
					}
				],
				25: [
					function (t, e) {
						function n(t, e) {
							i.call(this, t, e);
						}
						function r(t, e, n) {
							return 0 < t.length ? e + n.toUpperCase() : void 0;
						}
						var i = t("./nodecontainer");
						((n.prototype = Object.create(i.prototype)).applyTextTransform =
							function () {
								this.node.data = this.transform(this.parent.css("textTransform"));
							}),
							(n.prototype.transform = function (t) {
								var e = this.node.data;
								switch (t) {
									case "lowercase":
										return e.toLowerCase();
									case "capitalize":
										return e.replace(/(^|\s|:|-|\(|\))([a-z])/g, r);
									case "uppercase":
										return e.toUpperCase();
									default:
										return e;
								}
							}),
							(e.exports = n);
					},
					{
						"./nodecontainer": 14
					}
				],
				26: [
					function (t, e, n) {
						(n.smallImage = function () {
							return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
						}),
							(n.bind = function (t, e) {
								return function () {
									return t.apply(e, arguments);
								};
							}),
							(n.decode64 = function (t) {
								for (
									var e,
										n,
										r,
										i,
										o,
										s =
											"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
										a = t.length,
										u = "",
										c = 0;
									c < a;
									c += 4
								)
									(r = (s.indexOf(t[c]) << 2) | ((o = s.indexOf(t[c + 1])) >> 4)),
										(i = ((15 & o) << 4) | ((e = s.indexOf(t[c + 2])) >> 2)),
										(o = ((3 & e) << 6) | (n = s.indexOf(t[c + 3]))),
										(u +=
											64 === e
												? String.fromCharCode(r)
												: 64 === n || -1 === n
													? String.fromCharCode(r, i)
													: String.fromCharCode(r, i, o));
								return u;
							}),
							(n.getBounds = function (t) {
								if (t.getBoundingClientRect) {
									var e = t.getBoundingClientRect(),
										n = null == t.offsetWidth ? e.width : t.offsetWidth;
									return {
										top: e.top,
										bottom: e.bottom || e.top + e.height,
										right: e.left + n,
										left: e.left,
										width: n,
										height: null == t.offsetHeight ? e.height : t.offsetHeight
									};
								}
								return {};
							}),
							(n.offsetBounds = function (t) {
								var e = t.offsetParent
									? n.offsetBounds(t.offsetParent)
									: {
											top: 0,
											left: 0
										};
								return {
									top: t.offsetTop + e.top,
									bottom: t.offsetTop + t.offsetHeight + e.top,
									right: t.offsetLeft + e.left + t.offsetWidth,
									left: t.offsetLeft + e.left,
									width: t.offsetWidth,
									height: t.offsetHeight
								};
							}),
							(n.parseBackgrounds = function (t) {
								function e() {
									h &&
										('"' === n.substr(0, 1) && (n = n.substr(1, n.length - 2)),
										n && l.push(n),
										"-" === h.substr(0, 1) &&
											0 < (i = h.indexOf("-", 1) + 1) &&
											((r = h.substr(0, i)), (h = h.substr(i))),
										a.push({
											prefix: r,
											method: h.toLowerCase(),
											value: o,
											args: l,
											image: null
										})),
										(l = []),
										(h = r = n = o = "");
								}
								var n,
									r,
									i,
									o,
									s,
									a = [],
									u = 0,
									c = 0,
									l = [],
									h = (r = n = o = "");
								return (
									t.split("").forEach(function (t) {
										if (!(0 === u && -1 < " \r\n\t".indexOf(t))) {
											switch (t) {
												case '"':
													s ? s === t && (s = null) : (s = t);
													break;
												case "(":
													if (s) break;
													if (0 === u) return (u = 1), void (o += t);
													c++;
													break;
												case ")":
													if (s) break;
													if (1 === u) {
														if (0 === c)
															return (u = 0), (o += t), void e();
														c--;
													}
													break;
												case ",":
													if (s) break;
													if (0 === u) return void e();
													if (1 === u && 0 === c && !h.match(/^url$/i))
														return l.push(n), (n = ""), void (o += t);
											}
											(o += t), 0 === u ? (h += t) : (n += t);
										}
									}),
									e(),
									a
								);
							});
					},
					{}
				],
				27: [
					function (t, e) {
						function n(t) {
							r.apply(this, arguments),
								(this.type =
									"linear" === t.args[0] ? r.TYPES.LINEAR : r.TYPES.RADIAL);
						}
						var r = t("./gradientcontainer");
						(n.prototype = Object.create(r.prototype)), (e.exports = n);
					},
					{
						"./gradientcontainer": 9
					}
				],
				28: [
					function (t, e) {
						e.exports = function (r) {
							return new Promise(function (t, e) {
								var n = new XMLHttpRequest();
								n.open("GET", r),
									(n.onload = function () {
										200 === n.status
											? t(n.responseText)
											: e(new Error(n.statusText));
									}),
									(n.onerror = function () {
										e(new Error("Network Error"));
									}),
									n.send();
							});
						};
					},
					{}
				]
			},
			{},
			[4]
		)(4);
	}),
	(function (t) {
		"object" == typeof exports && "undefined" != typeof module
			? (module.exports = t())
			: "function" == typeof define && define.amd
				? define([], t)
				: (("undefined" != typeof window
						? window
						: "undefined" != typeof global
							? global
							: "undefined" != typeof self
								? self
								: this
					).localforage = t());
	})(function () {
		return (function r(i, o, s) {
			function a(e, t) {
				if (!o[e]) {
					if (!i[e]) {
						var n = "function" == typeof require && require;
						if (!t && n) return n(e, !0);
						if (u) return u(e, !0);
						n = new Error("Cannot find module '" + e + "'");
						throw ((n.code = "MODULE_NOT_FOUND"), n);
					}
					n = o[e] = {
						exports: {}
					};
					i[e][0].call(
						n.exports,
						function (t) {
							return a(i[e][1][t] || t);
						},
						n,
						n.exports,
						r,
						i,
						o,
						s
					);
				}
				return o[e].exports;
			}
			for (var u = "function" == typeof require && require, t = 0; t < s.length; t++) a(s[t]);
			return a;
		})(
			{
				1: [
					function (t, c, e) {
						(function (e) {
							"use strict";
							function n() {
								o = !0;
								for (var t, e, n = u.length; n; ) {
									for (e = u, u = [], t = -1; ++t < n; ) e[t]();
									n = u.length;
								}
								o = !1;
							}
							var t,
								r,
								i,
								o,
								s = e.MutationObserver || e.WebKitMutationObserver,
								a = s
									? ((t = 0),
										(s = new s(n)),
										(r = e.document.createTextNode("")),
										s.observe(r, {
											characterData: !0
										}),
										function () {
											r.data = t = ++t % 2;
										})
									: e.setImmediate || void 0 === e.MessageChannel
										? "document" in e &&
											"onreadystatechange" in
												e.document.createElement("script")
											? function () {
													var t = e.document.createElement("script");
													(t.onreadystatechange = function () {
														n(),
															(t.onreadystatechange = null),
															t.parentNode.removeChild(t),
															(t = null);
													}),
														e.document.documentElement.appendChild(t);
												}
											: function () {
													setTimeout(n, 0);
												}
										: (((i = new e.MessageChannel()).port1.onmessage = n),
											function () {
												i.port2.postMessage(0);
											}),
								u = [];
							c.exports = function (t) {
								1 !== u.push(t) || o || a();
							};
						}).call(
							this,
							"undefined" != typeof global
								? global
								: "undefined" != typeof self
									? self
									: "undefined" != typeof window
										? window
										: {}
						);
					},
					{}
				],
				2: [
					function (t, e, n) {
						"use strict";
						function u() {}
						function r(t) {
							if ("function" != typeof t)
								throw new TypeError("resolver must be a function");
							(this.state = d),
								(this.queue = []),
								(this.outcome = void 0),
								t !== u && a(this, t);
						}
						function i(t, e, n) {
							(this.promise = t),
								"function" == typeof e &&
									((this.onFulfilled = e),
									(this.callFulfilled = this.otherCallFulfilled)),
								"function" == typeof n &&
									((this.onRejected = n),
									(this.callRejected = this.otherCallRejected));
						}
						function o(e, n, r) {
							l(function () {
								var t;
								try {
									t = n(r);
								} catch (t) {
									return h.reject(e, t);
								}
								t === e
									? h.reject(
											e,
											new TypeError("Cannot resolve promise with itself")
										)
									: h.resolve(e, t);
							});
						}
						function s(t) {
							var e = t && t.then;
							if (
								t &&
								("object" == typeof t || "function" == typeof t) &&
								"function" == typeof e
							)
								return function () {
									e.apply(t, arguments);
								};
						}
						function a(e, t) {
							function n(t) {
								i || ((i = !0), h.reject(e, t));
							}
							function r(t) {
								i || ((i = !0), h.resolve(e, t));
							}
							var i = !1,
								o = c(function () {
									t(r, n);
								});
							"error" === o.status && n(o.value);
						}
						function c(t, e) {
							var n = {};
							try {
								(n.value = t(e)), (n.status = "success");
							} catch (t) {
								(n.status = "error"), (n.value = t);
							}
							return n;
						}
						var l = t(1),
							h = {},
							f = ["REJECTED"],
							p = ["FULFILLED"],
							d = ["PENDING"];
						((e.exports = r).prototype.catch = function (t) {
							return this.then(null, t);
						}),
							(r.prototype.then = function (t, e) {
								if (
									("function" != typeof t && this.state === p) ||
									("function" != typeof e && this.state === f)
								)
									return this;
								var n = new this.constructor(u);
								return (
									this.state !== d
										? o(n, this.state === p ? t : e, this.outcome)
										: this.queue.push(new i(n, t, e)),
									n
								);
							}),
							(i.prototype.callFulfilled = function (t) {
								h.resolve(this.promise, t);
							}),
							(i.prototype.otherCallFulfilled = function (t) {
								o(this.promise, this.onFulfilled, t);
							}),
							(i.prototype.callRejected = function (t) {
								h.reject(this.promise, t);
							}),
							(i.prototype.otherCallRejected = function (t) {
								o(this.promise, this.onRejected, t);
							}),
							(h.resolve = function (t, e) {
								var n = c(s, e);
								if ("error" === n.status) return h.reject(t, n.value);
								n = n.value;
								if (n) a(t, n);
								else {
									(t.state = p), (t.outcome = e);
									for (var r = -1, i = t.queue.length; ++r < i; )
										t.queue[r].callFulfilled(e);
								}
								return t;
							}),
							(h.reject = function (t, e) {
								(t.state = f), (t.outcome = e);
								for (var n = -1, r = t.queue.length; ++n < r; )
									t.queue[n].callRejected(e);
								return t;
							}),
							(r.resolve = function (t) {
								return t instanceof this ? t : h.resolve(new this(u), t);
							}),
							(r.reject = function (t) {
								var e = new this(u);
								return h.reject(e, t);
							}),
							(r.all = function (t) {
								var n = this;
								if ("[object Array]" !== Object.prototype.toString.call(t))
									return this.reject(new TypeError("must be an array"));
								var r = t.length,
									i = !1;
								if (!r) return this.resolve([]);
								for (
									var o = new Array(r), s = 0, e = -1, a = new this(u);
									++e < r;

								)
									!(function (t, e) {
										n.resolve(t).then(
											function (t) {
												(o[e] = t),
													++s !== r || i || ((i = !0), h.resolve(a, o));
											},
											function (t) {
												i || ((i = !0), h.reject(a, t));
											}
										);
									})(t[e], e);
								return a;
							}),
							(r.race = function (t) {
								var e = this;
								if ("[object Array]" !== Object.prototype.toString.call(t))
									return this.reject(new TypeError("must be an array"));
								var n = t.length,
									r = !1;
								if (!n) return this.resolve([]);
								for (var i, o = -1, s = new this(u); ++o < n; )
									(i = t[o]),
										e.resolve(i).then(
											function (t) {
												r || ((r = !0), h.resolve(s, t));
											},
											function (t) {
												r || ((r = !0), h.reject(s, t));
											}
										);
								return s;
							});
					},
					{
						1: 1
					}
				],
				3: [
					function (e, t, n) {
						(function (t) {
							"use strict";
							"function" != typeof t.Promise && (t.Promise = e(2));
						}).call(
							this,
							"undefined" != typeof global
								? global
								: "undefined" != typeof self
									? self
									: "undefined" != typeof window
										? window
										: {}
						);
					},
					{
						2: 2
					}
				],
				4: [
					function (t, e, n) {
						"use strict";
						function o(e, n) {
							(e = e || []), (n = n || {});
							try {
								return new Blob(e, n);
							} catch (t) {
								if ("TypeError" !== t.name) throw t;
								for (
									var r = new (
											"undefined" != typeof BlobBuilder
												? BlobBuilder
												: "undefined" != typeof MSBlobBuilder
													? MSBlobBuilder
													: "undefined" != typeof MozBlobBuilder
														? MozBlobBuilder
														: WebKitBlobBuilder
										)(),
										i = 0;
									i < e.length;
									i += 1
								)
									r.append(e[i]);
								return r.getBlob(n.type);
							}
						}
						function l(t, e) {
							e &&
								t.then(
									function (t) {
										e(null, t);
									},
									function (t) {
										e(t);
									}
								);
						}
						function u(t, e, n) {
							"function" == typeof e && t.then(e),
								"function" == typeof n && t.catch(n);
						}
						function h(t) {
							return "string" != typeof t && (t = String(t)), t;
						}
						function a() {
							if (
								arguments.length &&
								"function" == typeof arguments[arguments.length - 1]
							)
								return arguments[arguments.length - 1];
						}
						function r(t) {
							return "boolean" == typeof D
								? P.resolve(D)
								: ((r = t),
									new P(function (n) {
										var t = r.transaction(N, L),
											e = o([""]);
										t.objectStore(N).put(e, "key"),
											(t.onabort = function (t) {
												t.preventDefault(), t.stopPropagation(), n(!1);
											}),
											(t.oncomplete = function () {
												var t = navigator.userAgent.match(/Chrome\/(\d+)/),
													e = navigator.userAgent.match(/Edge\//);
												n(e || !t || 43 <= parseInt(t[1], 10));
											});
									})
										.catch(function () {
											return !1;
										})
										.then(function (t) {
											return (D = t);
										}));
							var r;
						}
						function c(t) {
							var t = R[t.name],
								n = {};
							(n.promise = new P(function (t, e) {
								(n.resolve = t), (n.reject = e);
							})),
								t.deferredOperations.push(n),
								t.dbReady
									? (t.dbReady = t.dbReady.then(function () {
											return n.promise;
										}))
									: (t.dbReady = n.promise);
						}
						function f(t) {
							t = R[t.name].deferredOperations.pop();
							return t && (t.resolve(), t.promise);
						}
						function p(t, e) {
							t = R[t.name].deferredOperations.pop();
							if (t) return t.reject(e), t.promise;
						}
						function i(i, o) {
							return new P(function (t, e) {
								if (((R[i.name] = R[i.name] || _()), i.db)) {
									if (!o) return t(i.db);
									c(i), i.db.close();
								}
								var n = [i.name];
								o && n.push(i.version);
								var r = I.open.apply(I, n);
								o &&
									(r.onupgradeneeded = function (t) {
										var e = r.result;
										try {
											e.createObjectStore(i.storeName),
												t.oldVersion <= 1 && e.createObjectStore(N);
										} catch (e) {
											if ("ConstraintError" !== e.name) throw e;
										}
									}),
									(r.onerror = function (t) {
										t.preventDefault(), e(r.error);
									}),
									(r.onsuccess = function () {
										t(r.result), f(i);
									});
							});
						}
						function d(t) {
							return i(t, !1);
						}
						function g(t) {
							return i(t, !0);
						}
						function m(t) {
							if (!t.db) return 1;
							var e = !t.db.objectStoreNames.contains(t.storeName),
								n = t.version < t.db.version,
								r = t.version > t.db.version;
							return (
								n && (t.version, (t.version = t.db.version)),
								(r || e) &&
									(!e || ((e = t.db.version + 1) > t.version && (t.version = e)),
									1)
							);
						}
						function v(t) {
							return o(
								[
									(function (t) {
										for (
											var e = t.length,
												n = new ArrayBuffer(e),
												r = new Uint8Array(n),
												i = 0;
											i < e;
											i++
										)
											r[i] = t.charCodeAt(i);
										return n;
									})(atob(t.data))
								],
								{
									type: t.type
								}
							);
						}
						function y(t) {
							return t && t.__local_forage_encoded_blob;
						}
						function b(t) {
							var e = this,
								n = e._initReady().then(function () {
									var t = R[e._dbInfo.name];
									if (t && t.dbReady) return t.dbReady;
								});
							return u(n, t, t), n;
						}
						function w(t, e, n, r) {
							void 0 === r && (r = 1);
							try {
								var i = t.db.transaction(t.storeName, e);
								n(null, i);
							} catch (i) {
								if (
									0 < r &&
									(!t.db ||
										"InvalidStateError" === i.name ||
										"NotFoundError" === i.name)
								)
									return P.resolve()
										.then(function () {
											if (
												!t.db ||
												("NotFoundError" === i.name &&
													!t.db.objectStoreNames.contains(t.storeName) &&
													t.version <= t.db.version)
											)
												return t.db && (t.version = t.db.version + 1), g(t);
										})
										.then(function () {
											return (function (n) {
												c(n);
												for (
													var r = R[n.name], i = r.forages, t = 0;
													t < i.length;
													t++
												) {
													var e = i[t];
													e._dbInfo.db &&
														(e._dbInfo.db.close(),
														(e._dbInfo.db = null));
												}
												return (
													(n.db = null),
													d(n)
														.then(function (t) {
															return (n.db = t), m(n) ? g(n) : t;
														})
														.then(function (t) {
															n.db = r.db = t;
															for (var e = 0; e < i.length; e++)
																i[e]._dbInfo.db = t;
														})
														.catch(function (t) {
															throw (p(n, t), t);
														})
												);
											})(t).then(function () {
												w(t, e, n, r - 1);
											});
										})
										.catch(n);
								n(i);
							}
						}
						function _() {
							return {
								forages: [],
								db: null,
								dbReady: null,
								deferredOperations: []
							};
						}
						function s(t) {
							var e,
								n,
								r,
								i,
								o = 0.75 * t.length,
								s = t.length,
								a = 0;
							"=" === t[t.length - 1] && (o--, "=" === t[t.length - 2] && o--);
							for (
								var o = new ArrayBuffer(o), u = new Uint8Array(o), c = 0;
								c < s;
								c += 4
							)
								(e = H.indexOf(t[c])),
									(n = H.indexOf(t[c + 1])),
									(r = H.indexOf(t[c + 2])),
									(i = H.indexOf(t[c + 3])),
									(u[a++] = (e << 2) | (n >> 4)),
									(u[a++] = ((15 & n) << 4) | (r >> 2)),
									(u[a++] = ((3 & r) << 6) | (63 & i));
							return o;
						}
						function x(t) {
							for (var e = new Uint8Array(t), n = "", r = 0; r < e.length; r += 3)
								(n += H[e[r] >> 2]),
									(n += H[((3 & e[r]) << 4) | (e[r + 1] >> 4)]),
									(n += H[((15 & e[r + 1]) << 2) | (e[r + 2] >> 6)]),
									(n += H[63 & e[r + 2]]);
							return (
								e.length % 3 == 2
									? (n = n.substring(0, n.length - 1) + "=")
									: e.length % 3 == 1 &&
										(n = n.substring(0, n.length - 2) + "=="),
								n
							);
						}
						function C(t, e, n, r) {
							t.executeSql(
								"CREATE TABLE IF NOT EXISTS " +
									e.storeName +
									" (id INTEGER PRIMARY KEY, key unique, value)",
								[],
								n,
								r
							);
						}
						function k(t, r, i, o, s, a) {
							t.executeSql(
								i,
								o,
								s,
								function (t, n) {
									n.code === n.SYNTAX_ERR
										? t.executeSql(
												"SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
												[name],
												function (t, e) {
													e.rows.length
														? a(t, n)
														: C(
																t,
																r,
																function () {
																	t.executeSql(i, o, s, a);
																},
																a
															);
												},
												a
											)
										: a(t, n);
								},
								a
							);
						}
						function S(s, t, a, u) {
							var c = this;
							s = h(s);
							var e = new P(function (i, o) {
								c.ready()
									.then(function () {
										void 0 === t && (t = null);
										var n = t,
											r = c._dbInfo;
										r.serializer.serialize(t, function (e, t) {
											t
												? o(t)
												: r.db.transaction(
														function (t) {
															k(
																t,
																r,
																"INSERT OR REPLACE INTO " +
																	r.storeName +
																	" (key, value) VALUES (?, ?)",
																[s, e],
																function () {
																	i(n);
																},
																function (t, e) {
																	o(e);
																}
															);
														},
														function (t) {
															t.code === t.QUOTA_ERR &&
																(0 < u
																	? i(
																			S.apply(c, [
																				s,
																				n,
																				a,
																				u - 1
																			])
																		)
																	: o(t));
														}
													);
										});
									})
									.catch(o);
							});
							return l(e, a), e;
						}
						function O(t, e) {
							var n = t.name + "/";
							return t.storeName !== e.storeName && (n += t.storeName + "/"), n;
						}
						function E() {
							return (
								!(function () {
									var t = "_localforage_support_test";
									try {
										return (
											localStorage.setItem(t, !0),
											localStorage.removeItem(t),
											0
										);
									} catch (t) {
										return 1;
									}
								})() || 0 < localStorage.length
							);
						}
						function T(t) {
							for (var e = 1; e < arguments.length; e++) {
								var n = arguments[e];
								if (n)
									for (var r in n)
										n.hasOwnProperty(r) &&
											(X(n[r]) ? (t[r] = n[r].slice()) : (t[r] = n[r]));
							}
							return t;
						}
						var A =
								"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
									? function (t) {
											return typeof t;
										}
									: function (t) {
											return t &&
												"function" == typeof Symbol &&
												t.constructor === Symbol &&
												t !== Symbol.prototype
												? "symbol"
												: typeof t;
										},
							I = (function () {
								try {
									if ("undefined" != typeof indexedDB) return indexedDB;
									if ("undefined" != typeof webkitIndexedDB)
										return webkitIndexedDB;
									if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
									if ("undefined" != typeof OIndexedDB) return OIndexedDB;
									if ("undefined" != typeof msIndexedDB) return msIndexedDB;
								} catch (t) {
									return;
								}
							})();
						"undefined" == typeof Promise && t(3);
						function j(t, e) {
							for (var n, r, i = t.length, o = 0; o < i; ) {
								if (
									(n = t[o]) === (r = e) ||
									("number" == typeof n &&
										"number" == typeof r &&
										isNaN(n) &&
										isNaN(r))
								)
									return 1;
								o++;
							}
						}
						var P = Promise,
							N = "local-forage-detect-blob-support",
							D = void 0,
							R = {},
							M = Object.prototype.toString,
							W = "readonly",
							L = "readwrite",
							F = {
								_driver: "asyncStorage",
								_initStorage: function (t) {
									function e() {
										return P.resolve();
									}
									var r = this,
										i = {
											db: null
										};
									if (t) for (var n in t) i[n] = t[n];
									var o = R[i.name];
									o || ((o = _()), (R[i.name] = o)),
										o.forages.push(r),
										r._initReady || ((r._initReady = r.ready), (r.ready = b));
									for (var s = [], a = 0; a < o.forages.length; a++) {
										var u = o.forages[a];
										u !== r && s.push(u._initReady().catch(e));
									}
									var c = o.forages.slice(0);
									return P.all(s)
										.then(function () {
											return (i.db = o.db), d(i);
										})
										.then(function (t) {
											return (
												(i.db = t),
												m(i, r._defaultConfig.version) ? g(i) : t
											);
										})
										.then(function (t) {
											(i.db = o.db = t), (r._dbInfo = i);
											for (var e = 0; e < c.length; e++) {
												var n = c[e];
												n !== r &&
													((n._dbInfo.db = i.db),
													(n._dbInfo.version = i.version));
											}
										});
								},
								_support: (function () {
									try {
										if (!I) return !1;
										var t =
												"undefined" != typeof openDatabase &&
												/(Safari|iPhone|iPad|iPod)/.test(
													navigator.userAgent
												) &&
												!/Chrome/.test(navigator.userAgent) &&
												!/BlackBerry/.test(navigator.platform),
											e =
												"function" == typeof fetch &&
												-1 !== fetch.toString().indexOf("[native code");
										return (
											(!t || e) &&
											"undefined" != typeof indexedDB &&
											"undefined" != typeof IDBKeyRange
										);
									} catch (t) {
										return !1;
									}
								})(),
								iterate: function (s, t) {
									var a = this,
										e = new P(function (i, o) {
											a.ready()
												.then(function () {
													w(a._dbInfo, W, function (t, e) {
														if (t) return o(t);
														try {
															var n = e
																	.objectStore(
																		a._dbInfo.storeName
																	)
																	.openCursor(),
																r = 1;
															(n.onsuccess = function () {
																var t,
																	e = n.result;
																e
																	? (y((t = e.value)) &&
																			(t = v(t)),
																		void 0 !==
																		(t = s(t, e.key, r++))
																			? i(t)
																			: e.continue())
																	: i();
															}),
																(n.onerror = function () {
																	o(n.error);
																});
														} catch (t) {
															o(t);
														}
													});
												})
												.catch(o);
										});
									return l(e, t), e;
								},
								getItem: function (o, t) {
									var s = this;
									o = h(o);
									var e = new P(function (r, i) {
										s.ready()
											.then(function () {
												w(s._dbInfo, W, function (t, e) {
													if (t) return i(t);
													try {
														var n = e
															.objectStore(s._dbInfo.storeName)
															.get(o);
														(n.onsuccess = function () {
															var t = n.result;
															void 0 === t && (t = null),
																y(t) && (t = v(t)),
																r(t);
														}),
															(n.onerror = function () {
																i(n.error);
															});
													} catch (t) {
														i(t);
													}
												});
											})
											.catch(i);
									});
									return l(e, t), e;
								},
								setItem: function (a, e, t) {
									var u = this;
									a = h(a);
									var n = new P(function (o, s) {
										var t;
										u.ready()
											.then(function () {
												return (
													(t = u._dbInfo),
													"[object Blob]" === M.call(e)
														? r(t.db).then(function (t) {
																return t
																	? e
																	: ((r = e),
																		new P(function (e, t) {
																			var n =
																				new FileReader();
																			(n.onerror = t),
																				(n.onloadend =
																					function (t) {
																						t = btoa(
																							t.target
																								.result ||
																								""
																						);
																						e({
																							__local_forage_encoded_blob:
																								!0,
																							data: t,
																							type: r.type
																						});
																					}),
																				n.readAsBinaryString(
																					r
																				);
																		}));
																var r;
															})
														: e
												);
											})
											.then(function (i) {
												w(u._dbInfo, L, function (t, e) {
													if (t) return s(t);
													try {
														var n = e.objectStore(u._dbInfo.storeName);
														null === i && (i = void 0);
														var r = n.put(i, a);
														(e.oncomplete = function () {
															void 0 === i && (i = null), o(i);
														}),
															(e.onabort = e.onerror =
																function () {
																	var t =
																		r.error ||
																		r.transaction.error;
																	s(t);
																});
													} catch (t) {
														s(t);
													}
												});
											})
											.catch(s);
									});
									return l(n, t), n;
								},
								removeItem: function (o, t) {
									var s = this;
									o = h(o);
									var e = new P(function (r, i) {
										s.ready()
											.then(function () {
												w(s._dbInfo, L, function (t, e) {
													if (t) return i(t);
													try {
														var n = e
															.objectStore(s._dbInfo.storeName)
															.delete(o);
														(e.oncomplete = function () {
															r();
														}),
															(e.onerror = function () {
																i(n.error);
															}),
															(e.onabort = function () {
																var t =
																	n.error || n.transaction.error;
																i(t);
															});
													} catch (t) {
														i(t);
													}
												});
											})
											.catch(i);
									});
									return l(e, t), e;
								},
								clear: function (t) {
									var o = this,
										e = new P(function (r, i) {
											o.ready()
												.then(function () {
													w(o._dbInfo, L, function (t, e) {
														if (t) return i(t);
														try {
															var n = e
																.objectStore(o._dbInfo.storeName)
																.clear();
															(e.oncomplete = function () {
																r();
															}),
																(e.onabort = e.onerror =
																	function () {
																		var t =
																			n.error ||
																			n.transaction.error;
																		i(t);
																	});
														} catch (t) {
															i(t);
														}
													});
												})
												.catch(i);
										});
									return l(e, t), e;
								},
								length: function (t) {
									var o = this,
										e = new P(function (r, i) {
											o.ready()
												.then(function () {
													w(o._dbInfo, W, function (t, e) {
														if (t) return i(t);
														try {
															var n = e
																.objectStore(o._dbInfo.storeName)
																.count();
															(n.onsuccess = function () {
																r(n.result);
															}),
																(n.onerror = function () {
																	i(n.error);
																});
														} catch (t) {
															i(t);
														}
													});
												})
												.catch(i);
										});
									return l(e, t), e;
								},
								key: function (a, t) {
									var u = this,
										e = new P(function (o, s) {
											a < 0
												? o(null)
												: u
														.ready()
														.then(function () {
															w(u._dbInfo, W, function (t, e) {
																if (t) return s(t);
																try {
																	var n = e.objectStore(
																			u._dbInfo.storeName
																		),
																		r = !1,
																		i = n.openCursor();
																	(i.onsuccess = function () {
																		var t = i.result;
																		t
																			? 0 === a || r
																				? o(t.key)
																				: ((r = !0),
																					t.advance(a))
																			: o(null);
																	}),
																		(i.onerror = function () {
																			s(i.error);
																		});
																} catch (t) {
																	s(t);
																}
															});
														})
														.catch(s);
										});
									return l(e, t), e;
								},
								keys: function (t) {
									var s = this,
										e = new P(function (i, o) {
											s.ready()
												.then(function () {
													w(s._dbInfo, W, function (t, e) {
														if (t) return o(t);
														try {
															var n = e
																	.objectStore(
																		s._dbInfo.storeName
																	)
																	.openCursor(),
																r = [];
															(n.onsuccess = function () {
																var t = n.result;
																t
																	? (r.push(t.key), t.continue())
																	: i(r);
															}),
																(n.onerror = function () {
																	o(n.error);
																});
														} catch (t) {
															o(t);
														}
													});
												})
												.catch(o);
										});
									return l(e, t), e;
								},
								dropInstance: function (s, t) {
									t = a.apply(this, arguments);
									var e,
										n = this.config();
									return (
										(s = ("function" != typeof s && s) || {}).name ||
											((s.name = s.name || n.name),
											(s.storeName = s.storeName || n.storeName)),
										l(
											(e = s.name
												? ((e =
														s.name === n.name && this._dbInfo.db
															? P.resolve(this._dbInfo.db)
															: d(s).then(function (t) {
																	var e = R[s.name],
																		n = e.forages;
																	e.db = t;
																	for (
																		var r = 0;
																		r < n.length;
																		r++
																	)
																		n[r]._dbInfo.db = t;
																	return t;
																})),
													s.storeName
														? e.then(function (t) {
																if (
																	t.objectStoreNames.contains(
																		s.storeName
																	)
																) {
																	var i = t.version + 1;
																	c(s);
																	var r = R[s.name],
																		o = r.forages;
																	t.close();
																	for (
																		var e = 0;
																		e < o.length;
																		e++
																	) {
																		var n = o[e];
																		(n._dbInfo.db = null),
																			(n._dbInfo.version = i);
																	}
																	return new P(function (e, n) {
																		var r = I.open(s.name, i);
																		(r.onerror = function (t) {
																			r.result.close(), n(t);
																		}),
																			(r.onupgradeneeded =
																				function () {
																					r.result.deleteObjectStore(
																						s.storeName
																					);
																				}),
																			(r.onsuccess =
																				function () {
																					var t =
																						r.result;
																					t.close(), e(t);
																				});
																	})
																		.then(function (t) {
																			r.db = t;
																			for (
																				var e = 0;
																				e < o.length;
																				e++
																			) {
																				var n = o[e];
																				(n._dbInfo.db = t),
																					f(n._dbInfo);
																			}
																		})
																		.catch(function (t) {
																			throw (
																				((
																					p(s, t) ||
																					P.resolve()
																				).catch(
																					function () {}
																				),
																				t)
																			);
																		});
																}
															})
														: e.then(function (t) {
																c(s);
																var n = R[s.name],
																	r = n.forages;
																t.close();
																for (var e = 0; e < r.length; e++)
																	r[e]._dbInfo.db = null;
																return new P(function (e, n) {
																	var r = I.deleteDatabase(
																		s.name
																	);
																	(r.onerror = r.onblocked =
																		function (t) {
																			var e = r.result;
																			e && e.close(), n(t);
																		}),
																		(r.onsuccess = function () {
																			var t = r.result;
																			t && t.close(), e(t);
																		});
																})
																	.then(function (t) {
																		n.db = t;
																		for (
																			var e = 0;
																			e < r.length;
																			e++
																		)
																			f(r[e]._dbInfo);
																	})
																	.catch(function (t) {
																		throw (
																			((
																				p(s, t) ||
																				P.resolve()
																			).catch(function () {}),
																			t)
																		);
																	});
															}))
												: P.reject("Invalid arguments")),
											t
										),
										e
									);
								}
							},
							H = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
							B = /^~~local_forage_type~([^~]+)~/,
							q = "__lfsc__:",
							z = q.length,
							U = z + "arbf".length,
							G = Object.prototype.toString,
							V = {
								serialize: function (e, n) {
									var t = "";
									if (
										(e && (t = G.call(e)),
										e &&
											("[object ArrayBuffer]" === t ||
												(e.buffer &&
													"[object ArrayBuffer]" === G.call(e.buffer))))
									) {
										var r = q;
										e instanceof ArrayBuffer
											? ((i = e), (r += "arbf"))
											: ((i = e.buffer),
												"[object Int8Array]" === t
													? (r += "si08")
													: "[object Uint8Array]" === t
														? (r += "ui08")
														: "[object Uint8ClampedArray]" === t
															? (r += "uic8")
															: "[object Int16Array]" === t
																? (r += "si16")
																: "[object Uint16Array]" === t
																	? (r += "ur16")
																	: "[object Int32Array]" === t
																		? (r += "si32")
																		: "[object Uint32Array]" ===
																			  t
																			? (r += "ui32")
																			: "[object Float32Array]" ===
																				  t
																				? (r += "fl32")
																				: "[object Float64Array]" ===
																					  t
																					? (r += "fl64")
																					: n(
																							new Error(
																								"Failed to get type for BinaryArray"
																							)
																						)),
											n(r + x(i));
									} else if ("[object Blob]" === t) {
										var i = new FileReader();
										(i.onload = function () {
											var t =
												"~~local_forage_type~" +
												e.type +
												"~" +
												x(this.result);
											n(q + "blob" + t);
										}),
											i.readAsArrayBuffer(e);
									} else
										try {
											n(JSON.stringify(e));
										} catch (t) {
											n(null, t);
										}
								},
								deserialize: function (t) {
									if (t.substring(0, z) !== q) return JSON.parse(t);
									var e,
										n = t.substring(U),
										r = t.substring(z, U);
									"blob" === r &&
										B.test(n) &&
										((e = (t = n.match(B))[1]), (n = n.substring(t[0].length)));
									var i = s(n);
									switch (r) {
										case "arbf":
											return i;
										case "blob":
											return o([i], {
												type: e
											});
										case "si08":
											return new Int8Array(i);
										case "ui08":
											return new Uint8Array(i);
										case "uic8":
											return new Uint8ClampedArray(i);
										case "si16":
											return new Int16Array(i);
										case "ur16":
											return new Uint16Array(i);
										case "si32":
											return new Int32Array(i);
										case "ui32":
											return new Uint32Array(i);
										case "fl32":
											return new Float32Array(i);
										case "fl64":
											return new Float64Array(i);
										default:
											throw new Error("Unkown type: " + r);
									}
								},
								stringToBuffer: s,
								bufferToString: x
							},
							$ = {
								_driver: "webSQLStorage",
								_initStorage: function (t) {
									var r = this,
										i = {
											db: null
										};
									if (t)
										for (var e in t)
											i[e] = "string" != typeof t[e] ? t[e].toString() : t[e];
									var n = new P(function (e, n) {
										try {
											i.db = openDatabase(
												i.name,
												String(i.version),
												i.description,
												i.size
											);
										} catch (e) {
											return n(e);
										}
										i.db.transaction(function (t) {
											C(
												t,
												i,
												function () {
													(r._dbInfo = i), e();
												},
												function (t, e) {
													n(e);
												}
											);
										}, n);
									});
									return (i.serializer = V), n;
								},
								_support: "function" == typeof openDatabase,
								iterate: function (c, t) {
									var e = this,
										n = new P(function (u, n) {
											e.ready()
												.then(function () {
													var a = e._dbInfo;
													a.db.transaction(function (t) {
														k(
															t,
															a,
															"SELECT * FROM " + a.storeName,
															[],
															function (t, e) {
																for (
																	var n = e.rows,
																		r = n.length,
																		i = 0;
																	i < r;
																	i++
																) {
																	var o = n.item(i),
																		s =
																			(s = o.value) &&
																			a.serializer.deserialize(
																				s
																			);
																	if (
																		void 0 !==
																		(s = c(s, o.key, i + 1))
																	)
																		return void u(s);
																}
																u();
															},
															function (t, e) {
																n(e);
															}
														);
													});
												})
												.catch(n);
										});
									return l(n, t), n;
								},
								getItem: function (e, t) {
									var o = this;
									e = h(e);
									var n = new P(function (r, i) {
										o.ready()
											.then(function () {
												var n = o._dbInfo;
												n.db.transaction(function (t) {
													k(
														t,
														n,
														"SELECT * FROM " +
															n.storeName +
															" WHERE key = ? LIMIT 1",
														[e],
														function (t, e) {
															e =
																(e = e.rows.length
																	? e.rows.item(0).value
																	: null) &&
																n.serializer.deserialize(e);
															r(e);
														},
														function (t, e) {
															i(e);
														}
													);
												});
											})
											.catch(i);
									});
									return l(n, t), n;
								},
								setItem: function (t, e, n) {
									return S.apply(this, [t, e, n, 1]);
								},
								removeItem: function (i, t) {
									var o = this;
									i = h(i);
									var e = new P(function (n, r) {
										o.ready()
											.then(function () {
												var e = o._dbInfo;
												e.db.transaction(function (t) {
													k(
														t,
														e,
														"DELETE FROM " +
															e.storeName +
															" WHERE key = ?",
														[i],
														function () {
															n();
														},
														function (t, e) {
															r(e);
														}
													);
												});
											})
											.catch(r);
									});
									return l(e, t), e;
								},
								clear: function (t) {
									var i = this,
										e = new P(function (n, r) {
											i.ready()
												.then(function () {
													var e = i._dbInfo;
													e.db.transaction(function (t) {
														k(
															t,
															e,
															"DELETE FROM " + e.storeName,
															[],
															function () {
																n();
															},
															function (t, e) {
																r(e);
															}
														);
													});
												})
												.catch(r);
										});
									return l(e, t), e;
								},
								length: function (t) {
									var i = this,
										e = new P(function (n, r) {
											i.ready()
												.then(function () {
													var e = i._dbInfo;
													e.db.transaction(function (t) {
														k(
															t,
															e,
															"SELECT COUNT(key) as c FROM " +
																e.storeName,
															[],
															function (t, e) {
																e = e.rows.item(0).c;
																n(e);
															},
															function (t, e) {
																r(e);
															}
														);
													});
												})
												.catch(r);
										});
									return l(e, t), e;
								},
								key: function (i, t) {
									var o = this,
										e = new P(function (n, r) {
											o.ready()
												.then(function () {
													var e = o._dbInfo;
													e.db.transaction(function (t) {
														k(
															t,
															e,
															"SELECT key FROM " +
																e.storeName +
																" WHERE id = ? LIMIT 1",
															[i + 1],
															function (t, e) {
																e = e.rows.length
																	? e.rows.item(0).key
																	: null;
																n(e);
															},
															function (t, e) {
																r(e);
															}
														);
													});
												})
												.catch(r);
										});
									return l(e, t), e;
								},
								keys: function (t) {
									var r = this,
										e = new P(function (i, n) {
											r.ready()
												.then(function () {
													var e = r._dbInfo;
													e.db.transaction(function (t) {
														k(
															t,
															e,
															"SELECT key FROM " + e.storeName,
															[],
															function (t, e) {
																for (
																	var n = [], r = 0;
																	r < e.rows.length;
																	r++
																)
																	n.push(e.rows.item(r).key);
																i(n);
															},
															function (t, e) {
																n(e);
															}
														);
													});
												})
												.catch(n);
										});
									return l(e, t), e;
								},
								dropInstance: function (n, t) {
									t = a.apply(this, arguments);
									var r = this.config();
									(n = ("function" != typeof n && n) || {}).name ||
										((n.name = n.name || r.name),
										(n.storeName = n.storeName || r.storeName));
									var i = this,
										e = n.name
											? new P(function (t) {
													var o,
														e =
															n.name === r.name
																? i._dbInfo.db
																: openDatabase(n.name, "", "", 0);
													t(
														n.storeName
															? {
																	db: e,
																	storeNames: [n.storeName]
																}
															: ((o = e),
																new P(function (i, n) {
																	o.transaction(
																		function (t) {
																			t.executeSql(
																				"SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
																				[],
																				function (t, e) {
																					for (
																						var n = [],
																							r = 0;
																						r <
																						e.rows
																							.length;
																						r++
																					)
																						n.push(
																							e.rows.item(
																								r
																							).name
																						);
																					i({
																						db: o,
																						storeNames:
																							n
																					});
																				},
																				function (t, e) {
																					n(e);
																				}
																			);
																		},
																		function (t) {
																			n(t);
																		}
																	);
																}))
													);
												}).then(function (s) {
													return new P(function (i, o) {
														s.db.transaction(
															function (r) {
																for (
																	var t = [],
																		e = 0,
																		n = s.storeNames.length;
																	e < n;
																	e++
																)
																	t.push(
																		(function (e) {
																			return new P(function (
																				t,
																				n
																			) {
																				r.executeSql(
																					"DROP TABLE IF EXISTS " +
																						e,
																					[],
																					function () {
																						t();
																					},
																					function (
																						t,
																						e
																					) {
																						n(e);
																					}
																				);
																			});
																		})(s.storeNames[e])
																	);
																P.all(t)
																	.then(function () {
																		i();
																	})
																	.catch(function (t) {
																		o(t);
																	});
															},
															function (t) {
																o(t);
															}
														);
													});
												})
											: P.reject("Invalid arguments");
									return l(e, t), e;
								}
							},
							t = {
								_driver: "localStorageWrapper",
								_initStorage: function (t) {
									var e = {};
									if (t) for (var n in t) e[n] = t[n];
									return (
										(e.keyPrefix = O(t, this._defaultConfig)),
										E()
											? (((this._dbInfo = e).serializer = V), P.resolve())
											: P.reject()
									);
								},
								_support: (function () {
									try {
										return (
											"undefined" != typeof localStorage &&
											"setItem" in localStorage &&
											!!localStorage.setItem
										);
									} catch (t) {
										return !1;
									}
								})(),
								iterate: function (u, t) {
									var c = this,
										e = c.ready().then(function () {
											for (
												var t = c._dbInfo,
													e = t.keyPrefix,
													n = e.length,
													r = localStorage.length,
													i = 1,
													o = 0;
												o < r;
												o++
											) {
												var s = localStorage.key(o);
												if (0 === s.indexOf(e)) {
													var a =
														(a = localStorage.getItem(s)) &&
														t.serializer.deserialize(a);
													if (void 0 !== (a = u(a, s.substring(n), i++)))
														return a;
												}
											}
										});
									return l(e, t), e;
								},
								getItem: function (n, t) {
									var r = this;
									n = h(n);
									var e = r.ready().then(function () {
										var t = r._dbInfo,
											e = localStorage.getItem(t.keyPrefix + n);
										return (e = e && t.serializer.deserialize(e));
									});
									return l(e, t), e;
								},
								setItem: function (s, t, e) {
									var a = this;
									s = h(s);
									var n = a.ready().then(function () {
										void 0 === t && (t = null);
										var o = t;
										return new P(function (n, r) {
											var i = a._dbInfo;
											i.serializer.serialize(t, function (t, e) {
												if (e) r(e);
												else
													try {
														localStorage.setItem(i.keyPrefix + s, t),
															n(o);
													} catch (t) {
														("QuotaExceededError" !== t.name &&
															"NS_ERROR_DOM_QUOTA_REACHED" !==
																t.name) ||
															r(t),
															r(t);
													}
											});
										});
									});
									return l(n, e), n;
								},
								removeItem: function (e, t) {
									var n = this;
									e = h(e);
									var r = n.ready().then(function () {
										var t = n._dbInfo;
										localStorage.removeItem(t.keyPrefix + e);
									});
									return l(r, t), r;
								},
								clear: function (t) {
									var r = this,
										e = r.ready().then(function () {
											for (
												var t = r._dbInfo.keyPrefix,
													e = localStorage.length - 1;
												0 <= e;
												e--
											) {
												var n = localStorage.key(e);
												0 === n.indexOf(t) && localStorage.removeItem(n);
											}
										});
									return l(e, t), e;
								},
								length: function (t) {
									var e = this.keys().then(function (t) {
										return t.length;
									});
									return l(e, t), e;
								},
								key: function (n, t) {
									var r = this,
										e = r.ready().then(function () {
											var e,
												t = r._dbInfo;
											try {
												e = localStorage.key(n);
											} catch (t) {
												e = null;
											}
											return (e = e && e.substring(t.keyPrefix.length));
										});
									return l(e, t), e;
								},
								keys: function (t) {
									var o = this,
										e = o.ready().then(function () {
											for (
												var t = o._dbInfo,
													e = localStorage.length,
													n = [],
													r = 0;
												r < e;
												r++
											) {
												var i = localStorage.key(r);
												0 === i.indexOf(t.keyPrefix) &&
													n.push(i.substring(t.keyPrefix.length));
											}
											return n;
										});
									return l(e, t), e;
								},
								dropInstance: function (e, t) {
									(t = a.apply(this, arguments)),
										(e = ("function" != typeof e && e) || {}).name ||
											((r = this.config()),
											(e.name = e.name || r.name),
											(e.storeName = e.storeName || r.storeName));
									var n = this,
										r = e.name
											? new P(function (t) {
													t(
														e.storeName
															? O(e, n._defaultConfig)
															: e.name + "/"
													);
												}).then(function (t) {
													for (
														var e = localStorage.length - 1;
														0 <= e;
														e--
													) {
														var n = localStorage.key(e);
														0 === n.indexOf(t) &&
															localStorage.removeItem(n);
													}
												})
											: P.reject("Invalid arguments");
									return l(r, t), r;
								}
							},
							X =
								Array.isArray ||
								function (t) {
									return "[object Array]" === Object.prototype.toString.call(t);
								},
							Y = {},
							K = {},
							Q = {
								INDEXEDDB: F,
								WEBSQL: $,
								LOCALSTORAGE: t
							},
							t = [Q.INDEXEDDB._driver, Q.WEBSQL._driver, Q.LOCALSTORAGE._driver],
							J = ["dropInstance"],
							Z = [
								"clear",
								"getItem",
								"iterate",
								"key",
								"keys",
								"length",
								"removeItem",
								"setItem"
							].concat(J),
							tt = {
								description: "",
								driver: t.slice(),
								name: "localforage",
								size: 4980736,
								storeName: "keyvaluepairs",
								version: 1
							},
							t = new ((et.prototype.config = function (t) {
								if ("object" !== (void 0 === t ? "undefined" : A(t)))
									return "string" == typeof t ? this._config[t] : this._config;
								if (this._ready)
									return new Error(
										"Can't call config() after localforage has been used."
									);
								for (var e in t) {
									if (
										("storeName" === e && (t[e] = t[e].replace(/\W/g, "_")),
										"version" === e && "number" != typeof t[e])
									)
										return new Error("Database version must be a number.");
									this._config[e] = t[e];
								}
								return (
									!("driver" in t && t.driver) ||
									this.setDriver(this._config.driver)
								);
							}),
							(et.prototype.defineDriver = function (c, t, e) {
								var n = new P(function (e, n) {
									try {
										var r = c._driver,
											t = new Error(
												"Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"
											);
										if (!c._driver) return void n(t);
										for (
											var i = Z.concat("_initStorage"), o = 0, s = i.length;
											o < s;
											o++
										) {
											var a = i[o];
											if ((!j(J, a) || c[a]) && "function" != typeof c[a])
												return void n(t);
										}
										!(function () {
											for (var t = 0, e = J.length; t < e; t++) {
												var n = J[t];
												c[n] ||
													(c[n] = (function (e) {
														return function () {
															var t = new Error(
																	"Method " +
																		e +
																		" is not implemented by the current driver"
																),
																t = P.reject(t);
															return (
																l(
																	t,
																	arguments[arguments.length - 1]
																),
																t
															);
														};
													})(n));
											}
										})();
										var u = function (t) {
											Y[r], (Y[r] = c), (K[r] = t), e();
										};
										"_support" in c
											? c._support && "function" == typeof c._support
												? c._support().then(u, n)
												: u(!!c._support)
											: u(!0);
									} catch (t) {
										n(t);
									}
								});
								return u(n, t, e), n;
							}),
							(et.prototype.driver = function () {
								return this._driver || null;
							}),
							(et.prototype.getDriver = function (t, e, n) {
								t = Y[t]
									? P.resolve(Y[t])
									: P.reject(new Error("Driver not found."));
								return u(t, e, n), t;
							}),
							(et.prototype.getSerializer = function (t) {
								var e = P.resolve(V);
								return u(e, t), e;
							}),
							(et.prototype.ready = function (t) {
								var e = this,
									n = e._driverSet.then(function () {
										return (
											null === e._ready && (e._ready = e._initDriver()),
											e._ready
										);
									});
								return u(n, t, t), n;
							}),
							(et.prototype.setDriver = function (t, e, n) {
								function o() {
									a._config.driver = a.driver();
								}
								function s(t) {
									return (
										a._extend(t),
										o(),
										(a._ready = a._initStorage(a._config)),
										a._ready
									);
								}
								function r(i) {
									return function () {
										var r = 0;
										return (function t() {
											for (; r < i.length; ) {
												var e = i[r];
												return (
													r++,
													(a._dbInfo = null),
													(a._ready = null),
													a.getDriver(e).then(s).catch(t)
												);
											}
											o();
											var n = new Error("No available storage method found.");
											return (a._driverSet = P.reject(n)), a._driverSet;
										})();
									};
								}
								var a = this;
								X(t) || (t = [t]);
								var i = this._getSupportedDrivers(t),
									t =
										null !== this._driverSet
											? this._driverSet.catch(function () {
													return P.resolve();
												})
											: P.resolve();
								return (
									(this._driverSet = t
										.then(function () {
											var t = i[0];
											return (
												(a._dbInfo = null),
												(a._ready = null),
												a.getDriver(t).then(function (t) {
													(a._driver = t._driver),
														o(),
														a._wrapLibraryMethodsWithReady(),
														(a._initDriver = r(i));
												})
											);
										})
										.catch(function () {
											o();
											var t = new Error("No available storage method found.");
											return (a._driverSet = P.reject(t)), a._driverSet;
										})),
									u(this._driverSet, e, n),
									this._driverSet
								);
							}),
							(et.prototype.supports = function (t) {
								return !!K[t];
							}),
							(et.prototype._extend = function (t) {
								T(this, t);
							}),
							(et.prototype._getSupportedDrivers = function (t) {
								for (var e = [], n = 0, r = t.length; n < r; n++) {
									var i = t[n];
									this.supports(i) && e.push(i);
								}
								return e;
							}),
							(et.prototype._wrapLibraryMethodsWithReady = function () {
								for (var t = 0, e = Z.length; t < e; t++)
									!(function (e, n) {
										e[n] = function () {
											var t = arguments;
											return e.ready().then(function () {
												return e[n].apply(e, t);
											});
										};
									})(this, Z[t]);
							}),
							(et.prototype.createInstance = function (t) {
								return new et(t);
							}),
							et)();
						function et(t) {
							for (var e in (!(function (t, e) {
								if (!(t instanceof e))
									throw new TypeError("Cannot call a class as a function");
							})(this, et),
							Q)) {
								var n, r;
								Q.hasOwnProperty(e) &&
									((r = (n = Q[e])._driver),
									(this[e] = r),
									Y[r] || this.defineDriver(n));
							}
							(this._defaultConfig = T({}, tt)),
								(this._config = T({}, this._defaultConfig, t)),
								(this._driverSet = null),
								(this._initDriver = null),
								(this._ready = !1),
								(this._dbInfo = null),
								this._wrapLibraryMethodsWithReady(),
								this.setDriver(this._config.driver).catch(function () {});
						}
						e.exports = t;
					},
					{
						3: 3
					}
				]
			},
			{},
			[4]
		)(4);
	}),
	function () {
		function Bo(t, e) {
			return t.set(e[0], e[1]), t;
		}
		function qo(t, e) {
			return t.add(e), t;
		}
		function zo(t, e, n) {
			switch (n.length) {
				case 0:
					return t.call(e);
				case 1:
					return t.call(e, n[0]);
				case 2:
					return t.call(e, n[0], n[1]);
				case 3:
					return t.call(e, n[0], n[1], n[2]);
			}
			return t.apply(e, n);
		}
		function Uo(t, e, n, r) {
			for (var i = -1, o = null == t ? 0 : t.length; ++i < o; ) {
				var s = t[i];
				e(r, s, n(s), t);
			}
			return r;
		}
		function Go(t, e) {
			for (var n = -1, r = null == t ? 0 : t.length; ++n < r && !1 !== e(t[n], n, t); );
			return t;
		}
		function Vo(t, e) {
			for (var n = null == t ? 0 : t.length; n-- && !1 !== e(t[n], n, t); );
			return t;
		}
		function $o(t, e) {
			for (var n = -1, r = null == t ? 0 : t.length; ++n < r; ) if (!e(t[n], n, t)) return !1;
			return !0;
		}
		function Xo(t, e) {
			for (var n = -1, r = null == t ? 0 : t.length, i = 0, o = []; ++n < r; ) {
				var s = t[n];
				e(s, n, t) && (o[i++] = s);
			}
			return o;
		}
		function Yo(t, e) {
			return !!(null == t ? 0 : t.length) && -1 < is(t, e, 0);
		}
		function Ko(t, e, n) {
			for (var r = -1, i = null == t ? 0 : t.length; ++r < i; ) if (n(e, t[r])) return !0;
			return !1;
		}
		function Qo(t, e) {
			for (var n = -1, r = null == t ? 0 : t.length, i = Array(r); ++n < r; )
				i[n] = e(t[n], n, t);
			return i;
		}
		function Jo(t, e) {
			for (var n = -1, r = e.length, i = t.length; ++n < r; ) t[i + n] = e[n];
			return t;
		}
		function Zo(t, e, n, r) {
			var i = -1,
				o = null == t ? 0 : t.length;
			for (r && o && (n = t[++i]); ++i < o; ) n = e(n, t[i], i, t);
			return n;
		}
		function ts(t, e, n, r) {
			var i = null == t ? 0 : t.length;
			for (r && i && (n = t[--i]); i--; ) n = e(n, t[i], i, t);
			return n;
		}
		function es(t, e) {
			for (var n = -1, r = null == t ? 0 : t.length; ++n < r; ) if (e(t[n], n, t)) return !0;
			return !1;
		}
		function ns(t, r, e) {
			var i;
			return (
				e(t, function (t, e, n) {
					if (r(t, e, n)) return (i = e), !1;
				}),
				i
			);
		}
		function rs(t, e, n, r) {
			for (var i = t.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
				if (e(t[o], o, t)) return o;
			return -1;
		}
		function is(t, e, n) {
			return e == e
				? (function (t, e, n) {
						for (var r = n - 1, i = t.length; ++r < i; ) if (t[r] === e) return r;
						return -1;
					})(t, e, n)
				: rs(t, ss, n);
		}
		function os(t, e, n, r) {
			for (var i = n - 1, o = t.length; ++i < o; ) if (r(t[i], e)) return i;
			return -1;
		}
		function ss(t) {
			return t != t;
		}
		function as(t, e) {
			var n = null == t ? 0 : t.length;
			return n ? ls(t, e) / n : Is;
		}
		function us(e) {
			return function (t) {
				return null == t ? Ss : t[e];
			};
		}
		function t(e) {
			return function (t) {
				return null == e ? Ss : e[t];
			};
		}
		function cs(t, r, i, o, e) {
			return (
				e(t, function (t, e, n) {
					i = o ? ((o = !1), t) : r(i, t, e, n);
				}),
				i
			);
		}
		function ls(t, e) {
			for (var n, r = -1, i = t.length; ++r < i; ) {
				var o = e(t[r]);
				o !== Ss && (n = n === Ss ? o : n + o);
			}
			return n;
		}
		function hs(t, e) {
			for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
			return r;
		}
		function fs(e) {
			return function (t) {
				return e(t);
			};
		}
		function ps(e, t) {
			return Qo(t, function (t) {
				return e[t];
			});
		}
		function ds(t, e) {
			return t.has(e);
		}
		function gs(t, e) {
			for (var n = -1, r = t.length; ++n < r && -1 < is(e, t[n], 0); );
			return n;
		}
		function ms(t, e) {
			for (var n = t.length; n-- && -1 < is(e, t[n], 0); );
			return n;
		}
		function vs(t) {
			return "\\" + C[t];
		}
		function ys(t) {
			return x.test(t);
		}
		function bs(t) {
			var n = -1,
				r = Array(t.size);
			return (
				t.forEach(function (t, e) {
					r[++n] = [e, t];
				}),
				r
			);
		}
		function ws(e, n) {
			return function (t) {
				return e(n(t));
			};
		}
		function _s(t, e) {
			for (var n = -1, r = t.length, i = 0, o = []; ++n < r; ) {
				var s = t[n];
				(s !== e && s !== Ts) || ((t[n] = Ts), (o[i++] = n));
			}
			return o;
		}
		function xs(t) {
			var e = -1,
				n = Array(t.size);
			return (
				t.forEach(function (t) {
					n[++e] = t;
				}),
				n
			);
		}
		function Cs(t) {
			return (
				ys(t)
					? function (t) {
							for (var e = (_.lastIndex = 0); _.test(t); ) ++e;
							return e;
						}
					: S
			)(t);
		}
		function ks(t) {
			return ys(t) ? t.match(_) || [] : t.split("");
		}
		var Ss,
			Os = "Expected a function",
			Es = "__lodash_hash_undefined__",
			Ts = "__lodash_placeholder__",
			As = 9007199254740991,
			Is = NaN,
			js = 4294967295,
			Ps = [
				["ary", 128],
				["bind", 1],
				["bindKey", 2],
				["curry", 8],
				["curryRight", 16],
				["flip", 512],
				["partial", 32],
				["partialRight", 64],
				["rearg", 256]
			],
			Ns = "[object Arguments]",
			Ds = "[object Array]",
			Rs = "[object Boolean]",
			Ms = "[object Date]",
			Ws = "[object Error]",
			Ls = "[object Function]",
			Fs = "[object GeneratorFunction]",
			Hs = "[object Map]",
			Bs = "[object Number]",
			qs = "[object Object]",
			zs = "[object Promise]",
			Us = "[object RegExp]",
			Gs = "[object Set]",
			Vs = "[object String]",
			$s = "[object Symbol]",
			Xs = "[object WeakMap]",
			Ys = "[object ArrayBuffer]",
			Ks = "[object DataView]",
			Qs = "[object Float32Array]",
			Js = "[object Float64Array]",
			Zs = "[object Int8Array]",
			ta = "[object Int16Array]",
			ea = "[object Int32Array]",
			na = "[object Uint8Array]",
			ra = "[object Uint8ClampedArray]",
			ia = "[object Uint16Array]",
			oa = "[object Uint32Array]",
			sa = /\b__p \+= '';/g,
			aa = /\b(__p \+=) '' \+/g,
			ua = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
			ca = /&(?:amp|lt|gt|quot|#39);/g,
			la = /[&<>"']/g,
			ha = RegExp(ca.source),
			fa = RegExp(la.source),
			pa = /<%-([\s\S]+?)%>/g,
			da = /<%([\s\S]+?)%>/g,
			ga = /<%=([\s\S]+?)%>/g,
			ma = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
			va = /^\w*$/,
			ya = /^\./,
			ba =
				/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
			wa = /[\\^$.*+?()[\]{}|]/g,
			_a = RegExp(wa.source),
			xa = /^\s+|\s+$/g,
			Ca = /^\s+/,
			ka = /\s+$/,
			Sa = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
			Oa = /\{\n\/\* \[wrapped with (.+)\] \*/,
			Ea = /,? & /,
			Ta = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
			Aa = /\\(\\)?/g,
			Ia = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
			ja = /\w*$/,
			Pa = /^[-+]0x[0-9a-f]+$/i,
			Na = /^0b[01]+$/i,
			Da = /^\[object .+?Constructor\]$/,
			Ra = /^0o[0-7]+$/i,
			Ma = /^(?:0|[1-9]\d*)$/,
			Wa = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
			La = /($^)/,
			Fa = /['\n\r\u2028\u2029\\]/g,
			e = "\\ud800-\\udfff",
			n = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
			r = "\\u2700-\\u27bf",
			i = "a-z\\xdf-\\xf6\\xf8-\\xff",
			o = "A-Z\\xc0-\\xd6\\xd8-\\xde",
			s = "\\ufe0e\\ufe0f",
			a =
				"\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
			u = "[" + e + "]",
			c = "[" + a + "]",
			l = "[" + n + "]",
			h = "\\d+",
			f = "[" + r + "]",
			p = "[" + i + "]",
			d = "[^" + e + a + h + r + i + o + "]",
			g = "\\ud83c[\\udffb-\\udfff]",
			m = "[^" + e + "]",
			v = "(?:\\ud83c[\\udde6-\\uddff]){2}",
			y = "[\\ud800-\\udbff][\\udc00-\\udfff]",
			b = "[" + o + "]",
			w = "(?:" + p + "|" + d + ")",
			a = "(?:" + b + "|" + d + ")",
			r = "(?:['’](?:d|ll|m|re|s|t|ve))?",
			i = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
			o = "(?:" + l + "|" + g + ")" + "?",
			d = "[" + s + "]?",
			o = d + o + ("(?:\\u200d(?:" + [m, v, y].join("|") + ")" + d + o + ")*"),
			f = "(?:" + [f, v, y].join("|") + ")" + o,
			u = "(?:" + [m + l + "?", l, v, y, u].join("|") + ")",
			Ha = RegExp("['’]", "g"),
			Ba = RegExp(l, "g"),
			_ = RegExp(g + "(?=" + g + ")|" + u + o, "g"),
			qa = RegExp(
				[
					b + "?" + p + "+" + r + "(?=" + [c, b, "$"].join("|") + ")",
					a + "+" + i + "(?=" + [c, b + w, "$"].join("|") + ")",
					b + "?" + w + "+" + r,
					b + "+" + i,
					"\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)",
					"\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)",
					h,
					f
				].join("|"),
				"g"
			),
			x = RegExp("[\\u200d" + e + n + s + "]"),
			za = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
			Ua = [
				"Array",
				"Buffer",
				"DataView",
				"Date",
				"Error",
				"Float32Array",
				"Float64Array",
				"Function",
				"Int8Array",
				"Int16Array",
				"Int32Array",
				"Map",
				"Math",
				"Object",
				"Promise",
				"RegExp",
				"Set",
				"String",
				"Symbol",
				"TypeError",
				"Uint8Array",
				"Uint8ClampedArray",
				"Uint16Array",
				"Uint32Array",
				"WeakMap",
				"_",
				"clearTimeout",
				"isFinite",
				"parseInt",
				"setTimeout"
			],
			Ga = -1,
			Va = {};
		(Va[Qs] = Va[Js] = Va[Zs] = Va[ta] = Va[ea] = Va[na] = Va[ra] = Va[ia] = Va[oa] = !0),
			(Va[Ns] =
				Va[Ds] =
				Va[Ys] =
				Va[Rs] =
				Va[Ks] =
				Va[Ms] =
				Va[Ws] =
				Va[Ls] =
				Va[Hs] =
				Va[Bs] =
				Va[qs] =
				Va[Us] =
				Va[Gs] =
				Va[Vs] =
				Va[Xs] =
					!1);
		var $a = {};
		($a[Ns] =
			$a[Ds] =
			$a[Ys] =
			$a[Ks] =
			$a[Rs] =
			$a[Ms] =
			$a[Qs] =
			$a[Js] =
			$a[Zs] =
			$a[ta] =
			$a[ea] =
			$a[Hs] =
			$a[Bs] =
			$a[qs] =
			$a[Us] =
			$a[Gs] =
			$a[Vs] =
			$a[$s] =
			$a[na] =
			$a[ra] =
			$a[ia] =
			$a[oa] =
				!0),
			($a[Ws] = $a[Ls] = $a[Xs] = !1);
		var C = {
				"\\": "\\",
				"'": "'",
				"\n": "n",
				"\r": "r",
				"\u2028": "u2028",
				"\u2029": "u2029"
			},
			Xa = parseFloat,
			Ya = parseInt,
			e = "object" == typeof global && global && global.Object === Object && global,
			n = "object" == typeof self && self && self.Object === Object && self,
			Ka = e || n || Function("return this")(),
			s = "object" == typeof exports && exports && !exports.nodeType && exports,
			n = s && "object" == typeof module && module && !module.nodeType && module,
			Qa = n && n.exports === s,
			k = Qa && e.process,
			e = (function () {
				try {
					return k && k.binding && k.binding("util");
				} catch (t) {}
			})(),
			Ja = e && e.isArrayBuffer,
			Za = e && e.isDate,
			tu = e && e.isMap,
			eu = e && e.isRegExp,
			nu = e && e.isSet,
			ru = e && e.isTypedArray,
			S = us("length"),
			iu = t({
				À: "A",
				Á: "A",
				Â: "A",
				Ã: "A",
				Ä: "A",
				Å: "A",
				à: "a",
				á: "a",
				â: "a",
				ã: "a",
				ä: "a",
				å: "a",
				Ç: "C",
				ç: "c",
				Ð: "D",
				ð: "d",
				È: "E",
				É: "E",
				Ê: "E",
				Ë: "E",
				è: "e",
				é: "e",
				ê: "e",
				ë: "e",
				Ì: "I",
				Í: "I",
				Î: "I",
				Ï: "I",
				ì: "i",
				í: "i",
				î: "i",
				ï: "i",
				Ñ: "N",
				ñ: "n",
				Ò: "O",
				Ó: "O",
				Ô: "O",
				Õ: "O",
				Ö: "O",
				Ø: "O",
				ò: "o",
				ó: "o",
				ô: "o",
				õ: "o",
				ö: "o",
				ø: "o",
				Ù: "U",
				Ú: "U",
				Û: "U",
				Ü: "U",
				ù: "u",
				ú: "u",
				û: "u",
				ü: "u",
				Ý: "Y",
				ý: "y",
				ÿ: "y",
				Æ: "Ae",
				æ: "ae",
				Þ: "Th",
				þ: "th",
				ß: "ss",
				Ā: "A",
				Ă: "A",
				Ą: "A",
				ā: "a",
				ă: "a",
				ą: "a",
				Ć: "C",
				Ĉ: "C",
				Ċ: "C",
				Č: "C",
				ć: "c",
				ĉ: "c",
				ċ: "c",
				č: "c",
				Ď: "D",
				Đ: "D",
				ď: "d",
				đ: "d",
				Ē: "E",
				Ĕ: "E",
				Ė: "E",
				Ę: "E",
				Ě: "E",
				ē: "e",
				ĕ: "e",
				ė: "e",
				ę: "e",
				ě: "e",
				Ĝ: "G",
				Ğ: "G",
				Ġ: "G",
				Ģ: "G",
				ĝ: "g",
				ğ: "g",
				ġ: "g",
				ģ: "g",
				Ĥ: "H",
				Ħ: "H",
				ĥ: "h",
				ħ: "h",
				Ĩ: "I",
				Ī: "I",
				Ĭ: "I",
				Į: "I",
				İ: "I",
				ĩ: "i",
				ī: "i",
				ĭ: "i",
				į: "i",
				ı: "i",
				Ĵ: "J",
				ĵ: "j",
				Ķ: "K",
				ķ: "k",
				ĸ: "k",
				Ĺ: "L",
				Ļ: "L",
				Ľ: "L",
				Ŀ: "L",
				Ł: "L",
				ĺ: "l",
				ļ: "l",
				ľ: "l",
				ŀ: "l",
				ł: "l",
				Ń: "N",
				Ņ: "N",
				Ň: "N",
				Ŋ: "N",
				ń: "n",
				ņ: "n",
				ň: "n",
				ŋ: "n",
				Ō: "O",
				Ŏ: "O",
				Ő: "O",
				ō: "o",
				ŏ: "o",
				ő: "o",
				Ŕ: "R",
				Ŗ: "R",
				Ř: "R",
				ŕ: "r",
				ŗ: "r",
				ř: "r",
				Ś: "S",
				Ŝ: "S",
				Ş: "S",
				Š: "S",
				ś: "s",
				ŝ: "s",
				ş: "s",
				š: "s",
				Ţ: "T",
				Ť: "T",
				Ŧ: "T",
				ţ: "t",
				ť: "t",
				ŧ: "t",
				Ũ: "U",
				Ū: "U",
				Ŭ: "U",
				Ů: "U",
				Ű: "U",
				Ų: "U",
				ũ: "u",
				ū: "u",
				ŭ: "u",
				ů: "u",
				ű: "u",
				ų: "u",
				Ŵ: "W",
				ŵ: "w",
				Ŷ: "Y",
				ŷ: "y",
				Ÿ: "Y",
				Ź: "Z",
				Ż: "Z",
				Ž: "Z",
				ź: "z",
				ż: "z",
				ž: "z",
				Ĳ: "IJ",
				ĳ: "ij",
				Œ: "Oe",
				œ: "oe",
				ŉ: "'n",
				ſ: "s"
			}),
			ou = t({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': "&quot;",
				"'": "&#39;"
			}),
			su = t({
				"&amp;": "&",
				"&lt;": "<",
				"&gt;": ">",
				"&quot;": '"',
				"&#39;": "'"
			}),
			au = (function t(e) {
				function thisLikeLodash(t) {
					if (hn(t) && !io(t) && !(t instanceof m)) {
						if (t instanceof g) return t;
						if (tr.call(t, "__wrapped__")) return Me(t);
					}
					return new g(t);
				}
				function o() {}
				function g(t, e) {
					(this.__wrapped__ = t),
						(this.__actions__ = []),
						(this.__chain__ = !!e),
						(this.__index__ = 0),
						(this.__values__ = Ss);
				}
				function m(t) {
					(this.__wrapped__ = t),
						(this.__actions__ = []),
						(this.__dir__ = 1),
						(this.__filtered__ = !1),
						(this.__iteratees__ = []),
						(this.__takeCount__ = js),
						(this.__views__ = []);
				}
				function n(t) {
					var e = -1,
						n = null == t ? 0 : t.length;
					for (this.clear(); ++e < n; ) {
						var r = t[e];
						this.set(r[0], r[1]);
					}
				}
				function i(t) {
					var e = -1,
						n = null == t ? 0 : t.length;
					for (this.clear(); ++e < n; ) {
						var r = t[e];
						this.set(r[0], r[1]);
					}
				}
				function s(t) {
					var e = -1,
						n = null == t ? 0 : t.length;
					for (this.clear(); ++e < n; ) {
						var r = t[e];
						this.set(r[0], r[1]);
					}
				}
				function v(t) {
					var e = -1,
						n = null == t ? 0 : t.length;
					for (this.__data__ = new s(); ++e < n; ) this.add(t[e]);
				}
				function y(t) {
					t = this.__data__ = new i(t);
					this.size = t.size;
				}
				function r(t, e) {
					var n,
						r = io(t),
						i = !r && ro(t),
						o = !r && !i && so(t),
						s = !r && !i && !o && ho(t),
						a = r || i || o || s,
						u = a ? hs(t.length, $n) : [],
						c = u.length;
					for (n in t)
						(!e && !tr.call(t, n)) ||
							(a &&
								("length" == n ||
									(o && ("offset" == n || "parent" == n)) ||
									(s &&
										("buffer" == n ||
											"byteLength" == n ||
											"byteOffset" == n)) ||
									xe(n, c))) ||
							u.push(n);
					return u;
				}
				function a(t) {
					var e = t.length;
					return e ? t[ot(0, e - 1)] : Ss;
				}
				function u(t, e) {
					return Ne(Mt(t), x(e, 0, t.length));
				}
				function c(t) {
					return Ne(Mt(t));
				}
				function p(t, e, n) {
					((n === Ss || nn(t[e], n)) && (n !== Ss || e in t)) || f(t, e, n);
				}
				function b(t, e, n) {
					var r = t[e];
					(tr.call(t, e) && nn(r, n) && (n !== Ss || e in t)) || f(t, e, n);
				}
				function l(t, e) {
					for (var n = t.length; n--; ) if (nn(t[n][0], e)) return n;
					return -1;
				}
				function h(t, r, i, o) {
					return (
						Zr(t, function (t, e, n) {
							r(o, t, i(t), n);
						}),
						o
					);
				}
				function w(t, e) {
					return t && Wt(e, Sn(e), t);
				}
				function f(t, e, n) {
					"__proto__" == e && yr
						? yr(t, e, {
								configurable: !0,
								enumerable: !0,
								value: n,
								writable: !0
							})
						: (t[e] = n);
				}
				function _(t, e) {
					for (var n = -1, r = e.length, i = Hn(r), o = null == t; ++n < r; )
						i[n] = o ? Ss : Cn(t, e[n]);
					return i;
				}
				function x(t, e, n) {
					return (
						t == t &&
							(n !== Ss && (t = t <= n ? t : n), e !== Ss && (t = e <= t ? t : e)),
						t
					);
				}
				function C(n, r, i, t, e, o) {
					var s,
						a = 1 & r,
						u = 2 & r,
						c = 4 & r;
					if ((i && (s = e ? i(n, t, e, o) : i(n)), s !== Ss)) return s;
					if (!ln(n)) return n;
					var l,
						h,
						f = io(n);
					if (f) {
						if (
							((t = (p = n).length),
							(d = p.constructor(t)),
							t &&
								"string" == typeof p[0] &&
								tr.call(p, "index") &&
								((d.index = p.index), (d.input = p.input)),
							(s = d),
							!a)
						)
							return Mt(n, s);
					} else {
						var p = hi(n),
							d = p == Ls || p == Fs;
						if (so(n)) return It(n, a);
						if (p == qs || p == Ns || (d && !e)) {
							if (((s = u || d ? {} : we(n)), !a))
								return u
									? ((d = l = n),
										(h = (h = s) && Wt(d, On(d), h)),
										Wt(l, li(l), h))
									: ((h = w(s, (l = n))), Wt(l, ci(l), h));
						} else {
							if (!$a[p]) return e ? n : {};
							s = (function (t, e, n, r) {
								var i = t.constructor;
								switch (e) {
									case Ys:
										return jt(t);
									case Rs:
									case Ms:
										return new i(+t);
									case Ks:
										return (function (t, e) {
											e = e ? jt(t.buffer) : t.buffer;
											return new t.constructor(e, t.byteOffset, t.byteLength);
										})(t, r);
									case Qs:
									case Js:
									case Zs:
									case ta:
									case ea:
									case na:
									case ra:
									case ia:
									case oa:
										return Pt(t, r);
									case Hs:
										return (function (t, e, n) {
											return Zo(
												e ? n(bs(t), 1) : bs(t),
												Bo,
												new t.constructor()
											);
										})(t, r, n);
									case Bs:
									case Vs:
										return new i(t);
									case Us:
										return (function (t) {
											var e = new t.constructor(t.source, ja.exec(t));
											return (e.lastIndex = t.lastIndex), e;
										})(t);
									case Gs:
										return (function (t, e, n) {
											return Zo(
												e ? n(xs(t), 1) : xs(t),
												qo,
												new t.constructor()
											);
										})(t, r, n);
									case $s:
										return (function (t) {
											return Yr ? Gn(Yr.call(t)) : {};
										})(t);
								}
							})(n, p, C, a);
						}
					}
					a = (o = o || new y()).get(n);
					if (a) return a;
					o.set(n, s);
					var g = f ? Ss : (c ? (u ? fe : he) : u ? On : Sn)(n);
					return (
						Go(g || n, function (t, e) {
							g && (t = n[(e = t)]), b(s, e, C(t, r, i, e, n, o));
						}),
						s
					);
				}
				function k(t, e, n) {
					var r = n.length;
					if (null == t) return !r;
					for (t = Gn(t); r--; ) {
						var i = n[r],
							o = e[i],
							s = t[i];
						if ((s === Ss && !(i in t)) || !o(s)) return !1;
					}
					return !0;
				}
				function S(t, e, n) {
					if ("function" != typeof t) throw new Xn(Os);
					return mi(function () {
						t.apply(Ss, n);
					}, e);
				}
				function O(t, e, n, r) {
					var i = -1,
						o = Yo,
						s = !0,
						a = t.length,
						u = [],
						c = e.length;
					if (!a) return u;
					n && (e = Qo(e, fs(n))),
						r
							? ((o = Ko), (s = !1))
							: 200 <= e.length && ((o = ds), (s = !1), (e = new v(e)));
					t: for (; ++i < a; ) {
						var l = t[i],
							h = null == n ? l : n(l),
							l = r || 0 !== l ? l : 0;
						if (s && h == h) {
							for (var f = c; f--; ) if (e[f] === h) continue t;
							u.push(l);
						} else o(e, h, r) || u.push(l);
					}
					return u;
				}
				function E(t, r) {
					var i = !0;
					return (
						Zr(t, function (t, e, n) {
							return (i = !!r(t, e, n));
						}),
						i
					);
				}
				function T(t, e, n) {
					for (var r = -1, i = t.length; ++r < i; ) {
						var o,
							s,
							a = t[r],
							u = e(a);
						null != u && (o === Ss ? u == u && !gn(u) : n(u, o)) && ((o = u), (s = a));
					}
					return s;
				}
				function A(t, r) {
					var i = [];
					return (
						Zr(t, function (t, e, n) {
							r(t, e, n) && i.push(t);
						}),
						i
					);
				}
				function I(t, e, n, r, i) {
					var o = -1,
						s = t.length;
					for (n = n || _e, i = i || []; ++o < s; ) {
						var a = t[o];
						0 < e && n(a)
							? 1 < e
								? I(a, e - 1, n, r, i)
								: Jo(i, a)
							: r || (i[i.length] = a);
					}
					return i;
				}
				function j(t, e) {
					return t && ei(t, e, Sn);
				}
				function P(t, e) {
					return t && ni(t, e, Sn);
				}
				function N(e, t) {
					return Xo(t, function (t) {
						return an(e[t]);
					});
				}
				function D(t, e) {
					for (var n = 0, r = (e = Tt(e, t)).length; null != t && n < r; )
						t = t[De(e[n++])];
					return n && n == r ? t : Ss;
				}
				function R(t, e, n) {
					e = e(t);
					return io(t) ? e : Jo(e, n(t));
				}
				function M(t) {
					return null == t
						? t === Ss
							? "[object Undefined]"
							: "[object Null]"
						: vr && vr in Gn(t)
							? (function (t) {
									var e = tr.call(t, vr),
										n = t[vr];
									try {
										t[vr] = Ss;
										var r = !0;
									} catch (t) {}
									var i = rr.call(t);
									return r && (e ? (t[vr] = n) : delete t[vr]), i;
								})(t)
							: ((t = t), rr.call(t));
				}
				function W(t, e) {
					return e < t;
				}
				function L(t, e) {
					return null != t && tr.call(t, e);
				}
				function F(t, e) {
					return null != t && e in Gn(t);
				}
				function H(t, e, n) {
					for (
						var r = n ? Ko : Yo,
							i = t[0].length,
							o = t.length,
							s = o,
							a = Hn(o),
							u = 1 / 0,
							c = [];
						s--;

					) {
						var l = t[s];
						s && e && (l = Qo(l, fs(e))),
							(u = Ir(l.length, u)),
							(a[s] =
								!n && (e || (120 <= i && 120 <= l.length)) ? new v(s && l) : Ss);
					}
					l = t[0];
					var h = -1,
						f = a[0];
					t: for (; ++h < i && c.length < u; ) {
						var p = l[h],
							d = e ? e(p) : p,
							p = n || 0 !== p ? p : 0;
						if (!(f ? ds(f, d) : r(c, d, n))) {
							for (s = o; --s; ) {
								var g = a[s];
								if (!(g ? ds(g, d) : r(t[s], d, n))) continue t;
							}
							f && f.push(d), c.push(p);
						}
					}
					return c;
				}
				function B(t, e, n) {
					e = null == (t = Ie(t, (e = Tt(e, t)))) ? t : t[De(Be(e))];
					return null == e ? Ss : zo(e, t, n);
				}
				function q(t) {
					return hn(t) && M(t) == Ns;
				}
				function z(t, e, n, r, i) {
					return (
						t === e ||
						(null == t || null == e || (!hn(t) && !hn(e))
							? t != t && e != e
							: (function (t, e, n, r, i, o) {
									var s = io(t),
										a = io(e),
										u = s ? Ds : hi(t),
										c = a ? Ds : hi(e),
										l = (u = u == Ns ? qs : u) == qs,
										a = (c = c == Ns ? qs : c) == qs,
										c = u == c;
									if (c && so(t)) {
										if (!so(e)) return !1;
										l = !(s = !0);
									}
									if (c && !l)
										return (
											(o = o || new y()),
											s || ho(t)
												? ce(t, e, n, r, i, o)
												: (function (t, e, n, r, i, o, s) {
														switch (n) {
															case Ks:
																if (
																	t.byteLength != e.byteLength ||
																	t.byteOffset != e.byteOffset
																)
																	return !1;
																(t = t.buffer), (e = e.buffer);
															case Ys:
																return !(
																	t.byteLength != e.byteLength ||
																	!o(new cr(t), new cr(e))
																);
															case Rs:
															case Ms:
															case Bs:
																return nn(+t, +e);
															case Ws:
																return (
																	t.name == e.name &&
																	t.message == e.message
																);
															case Us:
															case Vs:
																return t == e + "";
															case Hs:
																var a = bs;
															case Gs:
																var u = 1 & r;
																if (
																	((a = a || xs),
																	t.size != e.size && !u)
																)
																	return !1;
																u = s.get(t);
																if (u) return u == e;
																(r |= 2), s.set(t, e);
																a = ce(a(t), a(e), r, i, o, s);
																return s.delete(t), a;
															case $s:
																if (Yr)
																	return Yr.call(t) == Yr.call(e);
														}
														return !1;
													})(t, e, u, n, r, i, o)
										);
									if (!(1 & n)) {
										(l = l && tr.call(t, "__wrapped__")),
											(a = a && tr.call(e, "__wrapped__"));
										if (l || a) {
											(l = l ? t.value() : t), (a = a ? e.value() : e);
											return (o = o || new y()), i(l, a, n, r, o);
										}
									}
									return (
										!!c &&
										((o = o || new y()),
										(function (t, e, n, r, i, o) {
											var s = 1 & n,
												a = he(t),
												u = a.length,
												c = he(e).length;
											if (u != c && !s) return !1;
											for (var l = u; l--; ) {
												var h = a[l];
												if (!(s ? h in e : tr.call(e, h))) return !1;
											}
											var f = o.get(t);
											if (f && o.get(e)) return f == e;
											var p = !0;
											o.set(t, e), o.set(e, t);
											for (var d = s; ++l < u; ) {
												h = a[l];
												var g,
													m = t[h],
													v = e[h];
												if (
													(r &&
														(g = s
															? r(v, m, h, e, t, o)
															: r(m, v, h, t, e, o)),
													!(g === Ss ? m === v || i(m, v, n, r, o) : g))
												) {
													p = !1;
													break;
												}
												d = d || "constructor" == h;
											}
											p &&
												!d &&
												((c = t.constructor),
												(f = e.constructor),
												c != f &&
													"constructor" in t &&
													"constructor" in e &&
													!(
														"function" == typeof c &&
														c instanceof c &&
														"function" == typeof f &&
														f instanceof f
													) &&
													(p = !1));
											return o.delete(t), o.delete(e), p;
										})(t, e, n, r, i, o))
									);
								})(t, e, n, r, z, i))
					);
				}
				function U(t, e, n, r) {
					var i = n.length,
						o = i,
						s = !r;
					if (null == t) return !o;
					for (t = Gn(t); i--; ) {
						var a = n[i];
						if (s && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return !1;
					}
					for (; ++i < o; ) {
						var u = (a = n[i])[0],
							c = t[u],
							l = a[1];
						if (s && a[2]) {
							if (c === Ss && !(u in t)) return !1;
						} else {
							var h,
								f = new y();
							if (
								(r && (h = r(c, l, u, t, e, f)), !(h === Ss ? z(l, c, 3, r, f) : h))
							)
								return !1;
						}
					}
					return !0;
				}
				function G(t) {
					return !(!ln(t) || ((e = t), nr && nr in e)) && (an(t) ? sr : Da).test(Re(t));
					var e;
				}
				function V(t) {
					return "function" == typeof t
						? t
						: null == t
							? Nn
							: "object" == typeof t
								? io(t)
									? J(t[0], t[1])
									: Q(t)
								: Wn(t);
				}
				function $(t) {
					if (!Oe(t)) return Tr(t);
					var e,
						n = [];
					for (e in Gn(t)) tr.call(t, e) && "constructor" != e && n.push(e);
					return n;
				}
				function X(t) {
					if (!ln(t))
						return (function (t) {
							var e = [];
							if (null != t) for (var n in Gn(t)) e.push(n);
							return e;
						})(t);
					var e,
						n = Oe(t),
						r = [];
					for (e in t) ("constructor" != e || (!n && tr.call(t, e))) && r.push(e);
					return r;
				}
				function Y(t, e) {
					return t < e;
				}
				function K(t, r) {
					var i = -1,
						o = rn(t) ? Hn(t.length) : [];
					return (
						Zr(t, function (t, e, n) {
							o[++i] = r(t, e, n);
						}),
						o
					);
				}
				function Q(e) {
					var n = ve(e);
					return 1 == n.length && n[0][2]
						? Te(n[0][0], n[0][1])
						: function (t) {
								return t === e || U(t, e, n);
							};
				}
				function J(n, r) {
					return ke(n) && Ee(r)
						? Te(De(n), r)
						: function (t) {
								var e = Cn(t, n);
								return e === Ss && e === r ? kn(t, n) : z(r, e, 3);
							};
				}
				function Z(r, i, o, s, a) {
					r !== i &&
						ei(
							i,
							function (t, e) {
								var n;
								ln(t)
									? ((a = a || new y()),
										(function (t, e, n, r, i, o, s) {
											var a = t[n],
												u = e[n],
												c = s.get(u);
											if (c) return p(t, n, c);
											var l = o ? o(a, u, n + "", t, e, s) : Ss,
												h = l === Ss;
											{
												var f;
												h &&
													((f = io(u)),
													(c = !f && so(u)),
													(e = !f && !c && ho(u)),
													(l = u),
													f || c || e
														? (l = io(a)
																? a
																: on(a)
																	? Mt(a)
																	: c
																		? It(u, !(h = !1))
																		: e
																			? Pt(u, !(h = !1))
																			: [])
														: pn(u) || ro(u)
															? ro((l = a))
																? (l = _n(a))
																: (!ln(a) || (r && an(a))) &&
																	(l = we(u))
															: (h = !1));
											}
											h && (s.set(u, l), i(l, u, r, o, s), s.delete(u)),
												p(t, n, l);
										})(r, i, e, o, Z, s, a))
									: ((n = s ? s(r[e], t, e + "", r, i, a) : Ss) === Ss && (n = t),
										p(r, e, n));
							},
							On
						);
				}
				function tt(t, e) {
					var n = t.length;
					if (n) return xe((e += e < 0 ? n : 0), n) ? t[e] : Ss;
				}
				function et(t, r, n) {
					var i = -1;
					return (
						(r = Qo(r.length ? r : [Nn], fs(ge()))),
						(function (t, e) {
							var n = t.length;
							for (t.sort(e); n--; ) t[n] = t[n].value;
							return t;
						})(
							K(t, function (e, t, n) {
								return {
									criteria: Qo(r, function (t) {
										return t(e);
									}),
									index: ++i,
									value: e
								};
							}),
							function (t, e) {
								return (function (t, e, n) {
									for (
										var r = -1,
											i = t.criteria,
											o = e.criteria,
											s = i.length,
											a = n.length;
										++r < s;

									) {
										var u = Nt(i[r], o[r]);
										if (u) {
											if (a <= r) return u;
											var c = n[r];
											return u * ("desc" == c ? -1 : 1);
										}
									}
									return t.index - e.index;
								})(t, e, n);
							}
						)
					);
				}
				function nt(t, e, n) {
					for (var r = -1, i = e.length, o = {}; ++r < i; ) {
						var s = e[r],
							a = D(t, s);
						n(a, s) && lt(o, Tt(s, t), a);
					}
					return o;
				}
				function rt(t, e, n, r) {
					var i = r ? os : is,
						o = -1,
						s = e.length,
						a = t;
					for (t === e && (e = Mt(e)), n && (a = Qo(t, fs(n))); ++o < s; )
						for (var u = 0, c = e[o], l = n ? n(c) : c; -1 < (u = i(a, l, u, r)); )
							a !== t && dr.call(a, u, 1), dr.call(t, u, 1);
					return t;
				}
				function it(t, e) {
					for (var n = t ? e.length : 0, r = n - 1; n--; ) {
						var i,
							o = e[n];
						(n != r && o === i) || (xe((i = o)) ? dr.call(t, o, 1) : wt(t, o));
					}
					return t;
				}
				function ot(t, e) {
					return t + Cr(Nr() * (e - t + 1));
				}
				function st(t, e) {
					var n = "";
					if (!t || e < 1 || As < e) return n;
					for (; e % 2 && (n += t), (e = Cr(e / 2)), e && (t += t), e; );
					return n;
				}
				function at(t, e) {
					return vi(Ae(t, e, Nn), t + "");
				}
				function ut(t) {
					return a(Tn(t));
				}
				function ct(t, e) {
					t = Tn(t);
					return Ne(t, x(e, 0, t.length));
				}
				function lt(t, e, n, r) {
					if (!ln(t)) return t;
					for (
						var i = -1, o = (e = Tt(e, t)).length, s = o - 1, a = t;
						null != a && ++i < o;

					) {
						var u,
							c = De(e[i]),
							l = n;
						i != s &&
							((u = a[c]),
							(l = r ? r(u, c, a) : Ss) === Ss &&
								(l = ln(u) ? u : xe(e[i + 1]) ? [] : {})),
							b(a, c, l),
							(a = a[c]);
					}
					return t;
				}
				function ht(t) {
					return Ne(Tn(t));
				}
				function ft(t, e, n) {
					var r = -1,
						i = t.length;
					e < 0 && (e = i < -e ? 0 : i + e),
						(n = i < n ? i : n) < 0 && (n += i),
						(i = n < e ? 0 : (n - e) >>> 0),
						(e >>>= 0);
					for (var o = Hn(i); ++r < i; ) o[r] = t[r + e];
					return o;
				}
				function pt(t, r) {
					var i;
					return (
						Zr(t, function (t, e, n) {
							return !(i = r(t, e, n));
						}),
						!!i
					);
				}
				function dt(t, e, n) {
					var r = 0,
						i = null == t ? r : t.length;
					if ("number" == typeof e && e == e && i <= 2147483647) {
						for (; r < i; ) {
							var o = (r + i) >>> 1,
								s = t[o];
							null !== s && !gn(s) && (n ? s <= e : s < e) ? (r = 1 + o) : (i = o);
						}
						return i;
					}
					return gt(t, e, Nn, n);
				}
				function gt(t, e, n, r) {
					e = n(e);
					for (
						var i = 0,
							o = null == t ? 0 : t.length,
							s = e != e,
							a = null === e,
							u = gn(e),
							c = e === Ss;
						i < o;

					) {
						var l = Cr((i + o) / 2),
							h = n(t[l]),
							f = h !== Ss,
							p = null === h,
							d = h == h,
							g = gn(h),
							h = s
								? r || d
								: c
									? d && (r || f)
									: a
										? d && f && (r || !p)
										: u
											? d && f && !p && (r || !g)
											: !p && !g && (r ? h <= e : h < e);
						h ? (i = l + 1) : (o = l);
					}
					return Ir(o, 4294967294);
				}
				function mt(t, e) {
					for (var n = -1, r = t.length, i = 0, o = []; ++n < r; ) {
						var s,
							a = t[n],
							u = e ? e(a) : a;
						(n && nn(u, s)) || ((s = u), (o[i++] = 0 === a ? 0 : a));
					}
					return o;
				}
				function vt(t) {
					return "number" == typeof t ? t : gn(t) ? Is : +t;
				}
				function yt(t) {
					if ("string" == typeof t) return t;
					if (io(t)) return Qo(t, yt) + "";
					if (gn(t)) return Kr ? Kr.call(t) : "";
					var e = t + "";
					return "0" == e && 1 / t == -1 / 0 ? "-0" : e;
				}
				function bt(t, e, n) {
					var r = -1,
						i = Yo,
						o = t.length,
						s = !0,
						a = [],
						u = a;
					if (n) (s = !1), (i = Ko);
					else if (200 <= o) {
						var c = e ? null : ai(t);
						if (c) return xs(c);
						(s = !1), (i = ds), (u = new v());
					} else u = e ? [] : a;
					t: for (; ++r < o; ) {
						var l = t[r],
							h = e ? e(l) : l,
							l = n || 0 !== l ? l : 0;
						if (s && h == h) {
							for (var f = u.length; f--; ) if (u[f] === h) continue t;
							e && u.push(h), a.push(l);
						} else i(u, h, n) || (u !== a && u.push(h), a.push(l));
					}
					return a;
				}
				function wt(t, e) {
					return null == (t = Ie(t, (e = Tt(e, t)))) || delete t[De(Be(e))];
				}
				function _t(t, e, n, r) {
					return lt(t, e, n(D(t, e)), r);
				}
				function xt(t, e, n, r) {
					for (var i = t.length, o = r ? i : -1; (r ? o-- : ++o < i) && e(t[o], o, t); );
					return n ? ft(t, r ? 0 : o, r ? o + 1 : i) : ft(t, r ? o + 1 : 0, r ? i : o);
				}
				function Ct(t, e) {
					return (
						t instanceof m && (t = t.value()),
						Zo(
							e,
							function (t, e) {
								return e.func.apply(e.thisArg, Jo([t], e.args));
							},
							t
						)
					);
				}
				function kt(t, e, n) {
					var r = t.length;
					if (r < 2) return r ? bt(t[0]) : [];
					for (var i = -1, o = Hn(r); ++i < r; )
						for (var s = t[i], a = -1; ++a < r; )
							a != i && (o[i] = O(o[i] || s, t[a], e, n));
					return bt(I(o, 1), e, n);
				}
				function St(t, e, n) {
					for (var r = -1, i = t.length, o = e.length, s = {}; ++r < i; ) {
						var a = r < o ? e[r] : Ss;
						n(s, t[r], a);
					}
					return s;
				}
				function Ot(t) {
					return on(t) ? t : [];
				}
				function Et(t) {
					return "function" == typeof t ? t : Nn;
				}
				function Tt(t, e) {
					return io(t) ? t : ke(t, e) ? [t] : yi(xn(t));
				}
				function At(t, e, n) {
					var r = t.length;
					return (n = n === Ss ? r : n), !e && r <= n ? t : ft(t, e, n);
				}
				function It(t, e) {
					if (e) return t.slice();
					(e = t.length), (e = lr ? lr(e) : new t.constructor(e));
					return t.copy(e), e;
				}
				function jt(t) {
					var e = new t.constructor(t.byteLength);
					return new cr(e).set(new cr(t)), e;
				}
				function Pt(t, e) {
					e = e ? jt(t.buffer) : t.buffer;
					return new t.constructor(e, t.byteOffset, t.length);
				}
				function Nt(t, e) {
					if (t !== e) {
						var n = t !== Ss,
							r = null === t,
							i = t == t,
							o = gn(t),
							s = e !== Ss,
							a = null === e,
							u = e == e,
							c = gn(e);
						if (
							(!a && !c && !o && e < t) ||
							(o && s && u && !a && !c) ||
							(r && s && u) ||
							(!n && u) ||
							!i
						)
							return 1;
						if (
							(!r && !o && !c && t < e) ||
							(c && n && i && !r && !o) ||
							(a && n && i) ||
							(!s && i) ||
							!u
						)
							return -1;
					}
					return 0;
				}
				function Dt(t, e, n, r) {
					for (
						var i = -1,
							o = t.length,
							s = n.length,
							a = -1,
							u = e.length,
							c = Ar(o - s, 0),
							l = Hn(u + c),
							h = !r;
						++a < u;

					)
						l[a] = e[a];
					for (; ++i < s; ) (h || i < o) && (l[n[i]] = t[i]);
					for (; c--; ) l[a++] = t[i++];
					return l;
				}
				function Rt(t, e, n, r) {
					for (
						var i = -1,
							o = t.length,
							s = -1,
							a = n.length,
							u = -1,
							c = e.length,
							l = Ar(o - a, 0),
							h = Hn(l + c),
							f = !r;
						++i < l;

					)
						h[i] = t[i];
					for (var p = i; ++u < c; ) h[p + u] = e[u];
					for (; ++s < a; ) (f || i < o) && (h[p + n[s]] = t[i++]);
					return h;
				}
				function Mt(t, e) {
					var n = -1,
						r = t.length;
					for (e = e || Hn(r); ++n < r; ) e[n] = t[n];
					return e;
				}
				function Wt(t, e, n, r) {
					var i = !n;
					n = n || {};
					for (var o = -1, s = e.length; ++o < s; ) {
						var a = e[o],
							u = r ? r(n[a], t[a], a, n, t) : Ss;
						u === Ss && (u = t[a]), (i ? f : b)(n, a, u);
					}
					return n;
				}
				function Lt(i, o) {
					return function (t, e) {
						var n = io(t) ? Uo : h,
							r = o ? o() : {};
						return n(t, i, ge(e, 2), r);
					};
				}
				function Ft(a) {
					return at(function (t, e) {
						var n = -1,
							r = e.length,
							i = 1 < r ? e[r - 1] : Ss,
							o = 2 < r ? e[2] : Ss,
							i = 3 < a.length && "function" == typeof i ? (r--, i) : Ss;
						for (
							o && Ce(e[0], e[1], o) && ((i = r < 3 ? Ss : i), (r = 1)), t = Gn(t);
							++n < r;

						) {
							var s = e[n];
							s && a(t, s, n, i);
						}
						return t;
					});
				}
				function Ht(o, s) {
					return function (t, e) {
						if (null == t) return t;
						if (!rn(t)) return o(t, e);
						for (
							var n = t.length, r = s ? n : -1, i = Gn(t);
							(s ? r-- : ++r < n) && !1 !== e(i[r], r, i);

						);
						return t;
					};
				}
				function Bt(u) {
					return function (t, e, n) {
						for (var r = -1, i = Gn(t), o = n(t), s = o.length; s--; ) {
							var a = o[u ? s : ++r];
							if (!1 === e(i[a], a, i)) break;
						}
						return t;
					};
				}
				function qt(r) {
					return function (t) {
						var e = ys((t = xn(t))) ? ks(t) : Ss,
							n = e ? e[0] : t.charAt(0),
							t = e ? At(e, 1).join("") : t.slice(1);
						return n[r]() + t;
					};
				}
				function zt(e) {
					return function (t) {
						return Zo(jn(In(t).replace(Ha, "")), e, "");
					};
				}
				function Ut(r) {
					return function () {
						var t = arguments;
						switch (t.length) {
							case 0:
								return new r();
							case 1:
								return new r(t[0]);
							case 2:
								return new r(t[0], t[1]);
							case 3:
								return new r(t[0], t[1], t[2]);
							case 4:
								return new r(t[0], t[1], t[2], t[3]);
							case 5:
								return new r(t[0], t[1], t[2], t[3], t[4]);
							case 6:
								return new r(t[0], t[1], t[2], t[3], t[4], t[5]);
							case 7:
								return new r(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
						}
						var e = Qr(r.prototype),
							n = r.apply(e, t);
						return ln(n) ? n : e;
					};
				}
				function Gt(o, s, a) {
					var u = Ut(o);
					return function t() {
						for (var e = arguments.length, n = Hn(e), r = e, i = de(t); r--; )
							n[r] = arguments[r];
						i = e < 3 && n[0] !== i && n[e - 1] !== i ? [] : _s(n, i);
						return (e -= i.length) < a
							? ne(o, s, Xt, t.placeholder, Ss, n, i, Ss, Ss, a - e)
							: zo(this && this !== Ka && this instanceof t ? u : o, this, n);
					};
				}
				function Vt(o) {
					return function (t, e, n) {
						var r,
							i = Gn(t);
						rn(t) ||
							((r = ge(e, 3)),
							(t = Sn(t)),
							(e = function (t) {
								return r(i[t], t, i);
							}));
						n = o(t, e, n);
						return -1 < n ? i[r ? t[n] : n] : Ss;
					};
				}
				function $t(u) {
					return le(function (i) {
						var o = i.length,
							t = o,
							e = g.prototype.thru;
						for (u && i.reverse(); t--; ) {
							var n = i[t];
							if ("function" != typeof n) throw new Xn(Os);
							e && !a && "wrapper" == pe(n) && (a = new g([], !0));
						}
						for (t = a ? t : o; ++t < o; )
							var r = pe((n = i[t])),
								s = "wrapper" == r ? ui(n) : Ss,
								a =
									s && Se(s[0]) && 424 == s[1] && !s[4].length && 1 == s[9]
										? a[pe(s[0])].apply(a, s[3])
										: 1 == n.length && Se(n)
											? a[r]()
											: a.thru(n);
						return function () {
							var t = arguments,
								e = t[0];
							if (a && 1 == t.length && io(e)) return a.plant(e).value();
							for (var n = 0, r = o ? i[n].apply(this, t) : e; ++n < o; )
								r = i[n].call(this, r);
							return r;
						};
					});
				}
				function Xt(a, u, c, l, h, f, p, d, g, m) {
					var v = 128 & u,
						y = 1 & u,
						b = 2 & u,
						w = 24 & u,
						_ = 512 & u,
						x = b ? Ss : Ut(a);
					return function t() {
						for (var e, n = Hn((s = arguments.length)), r = s; r--; )
							n[r] = arguments[r];
						if (
							(w &&
								(e = (function (t, e) {
									for (var n = t.length, r = 0; n--; ) t[n] === e && ++r;
									return r;
								})(n, (o = de(t)))),
							l && (n = Dt(n, l, h, w)),
							f && (n = Rt(n, f, p, w)),
							(s -= e),
							w && s < m)
						) {
							var i = _s(n, o);
							return ne(a, u, Xt, t.placeholder, c, n, i, d, g, m - s);
						}
						var o = y ? c : this,
							i = b ? o[a] : a,
							s = n.length;
						return (
							d
								? (n = (function (t, e) {
										for (
											var n = t.length, r = Ir(e.length, n), i = Mt(t);
											r--;

										) {
											var o = e[r];
											t[r] = xe(o, n) ? i[o] : Ss;
										}
										return t;
									})(n, d))
								: _ && 1 < s && n.reverse(),
							v && g < s && (n.length = g),
							this && this !== Ka && this instanceof t && (i = x || Ut(i)),
							i.apply(o, n)
						);
					};
				}
				function Yt(n, s) {
					return function (t, e) {
						return (
							(t = t),
							(r = n),
							(i = s(e)),
							(o = {}),
							j(t, function (t, e, n) {
								r(o, i(t), e, n);
							}),
							o
						);
						var r, i, o;
					};
				}
				function Kt(r, i) {
					return function (t, e) {
						var n;
						if (t === Ss && e === Ss) return i;
						if ((t !== Ss && (n = t), e !== Ss)) {
							if (n === Ss) return e;
							(e =
								"string" == typeof t || "string" == typeof e
									? ((t = yt(t)), yt(e))
									: ((t = vt(t)), vt(e))),
								(n = r(t, e));
						}
						return n;
					};
				}
				function Qt(r) {
					return le(function (t) {
						return (
							(t = Qo(t, fs(ge()))),
							at(function (e) {
								var n = this;
								return r(t, function (t) {
									return zo(t, n, e);
								});
							})
						);
					});
				}
				function Jt(t, e) {
					var n = (e = e === Ss ? " " : yt(e)).length;
					if (n < 2) return n ? st(e, t) : e;
					n = st(e, xr(t / Cs(e)));
					return ys(e) ? At(ks(n), 0, t).join("") : n.slice(0, t);
				}
				function Zt(a, t, u, c) {
					var l = 1 & t,
						h = Ut(a);
					return function t() {
						for (
							var e = -1,
								n = arguments.length,
								r = -1,
								i = c.length,
								o = Hn(i + n),
								s = this && this !== Ka && this instanceof t ? h : a;
							++r < i;

						)
							o[r] = c[r];
						for (; n--; ) o[r++] = arguments[++e];
						return zo(s, l ? u : this, o);
					};
				}
				function te(r) {
					return function (t, e, n) {
						return (
							n && "number" != typeof n && Ce(t, e, n) && (e = n = Ss),
							(t = vn(t)),
							e === Ss ? ((e = t), (t = 0)) : (e = vn(e)),
							(function (t, e, n, r) {
								for (
									var i = -1, o = Ar(xr((e - t) / (n || 1)), 0), s = Hn(o);
									o--;

								)
									(s[r ? o : ++i] = t), (t += n);
								return s;
							})(t, e, (n = n === Ss ? (t < e ? 1 : -1) : vn(n)), r)
						);
					};
				}
				function ee(n) {
					return function (t, e) {
						return (
							("string" == typeof t && "string" == typeof e) ||
								((t = wn(t)), (e = wn(e))),
							n(t, e)
						);
					};
				}
				function ne(t, e, n, r, i, o, s, a, u, c) {
					var l = 8 & e;
					(e |= l ? 32 : 64), 4 & (e &= ~(l ? 64 : 32)) || (e &= -4);
					(c = [t, e, i, l ? o : Ss, l ? s : Ss, l ? Ss : o, l ? Ss : s, a, u, c]),
						(n = n.apply(Ss, c));
					return Se(t) && gi(n, c), (n.placeholder = r), je(n, t, e);
				}
				function re(t) {
					var r = Un[t];
					return function (t, e) {
						if (((t = wn(t)), (e = null == e ? 0 : Ir(yn(e), 292)))) {
							var n = (xn(t) + "e").split("e");
							return +(
								(n = (xn(r(n[0] + "e" + (+n[1] + e))) + "e").split("e"))[0] +
								"e" +
								(+n[1] - e)
							);
						}
						return r(t);
					};
				}
				function ie(o) {
					return function (t) {
						var e,
							n,
							r,
							i = hi(t);
						return i == Hs
							? bs(t)
							: i == Gs
								? ((i = t),
									(n = -1),
									(r = Array(i.size)),
									i.forEach(function (t) {
										r[++n] = [t, t];
									}),
									r)
								: Qo(o((e = t)), function (t) {
										return [t, e[t]];
									});
					};
				}
				function oe(t, e, n, r, i, o, s, a) {
					var u = 2 & e;
					if (!u && "function" != typeof t) throw new Xn(Os);
					var c,
						l,
						h = r ? r.length : 0;
					h || ((e &= -97), (r = i = Ss)),
						(s = s === Ss ? s : Ar(yn(s), 0)),
						(a = a === Ss ? a : yn(a)),
						(h -= i ? i.length : 0),
						64 & e && ((c = r), (l = i), (r = i = Ss));
					var f,
						p,
						d,
						g,
						m = u ? Ss : ui(t),
						s = [t, e, n, r, i, c, l, o, s, a];
					return (
						m &&
							(function (t, e) {
								var n = t[1],
									r = e[1],
									i = n | r,
									o = i < 131,
									s =
										(128 == r && 8 == n) ||
										(128 == r && 256 == n && t[7].length <= e[8]) ||
										(384 == r && e[7].length <= e[8] && 8 == n);
								if (!o && !s) return;
								1 & r && ((t[2] = e[2]), (i |= 1 & n ? 0 : 4));
								n = e[3];
								{
									var a;
									n &&
										((a = t[3]),
										(t[3] = a ? Dt(a, n, e[4]) : n),
										(t[4] = a ? _s(t[3], Ts) : e[4]));
								}
								(n = e[5]) &&
									((a = t[5]),
									(t[5] = a ? Rt(a, n, e[6]) : n),
									(t[6] = a ? _s(t[5], Ts) : e[6])),
									(n = e[7]) && (t[7] = n),
									128 & r && (t[8] = null == t[8] ? e[8] : Ir(t[8], e[8])),
									null == t[9] && (t[9] = e[9]),
									(t[0] = e[0]),
									(t[1] = i);
							})(s, m),
						(t = s[0]),
						(e = s[1]),
						(n = s[2]),
						(r = s[3]),
						(i = s[4]),
						!(a = s[9] = s[9] === Ss ? (u ? 0 : t.length) : Ar(s[9] - h, 0)) &&
							24 & e &&
							(e &= -25),
						(n =
							e && 1 != e
								? 8 == e || 16 == e
									? Gt(t, e, a)
									: (32 != e && 33 != e) || i.length
										? Xt.apply(Ss, s)
										: Zt(t, e, n, r)
								: ((p = n),
									(d = 1 & e),
									(g = Ut((f = t))),
									function t() {
										return (
											this && this !== Ka && this instanceof t ? g : f
										).apply(d ? p : this, arguments);
									})),
						je((m ? ri : gi)(n, s), t, e)
					);
				}
				function se(t, e, n, r) {
					return t === Ss || (nn(t, Qn[n]) && !tr.call(r, n)) ? e : t;
				}
				function ae(t, e, n, r, i, o) {
					return ln(t) && ln(e) && (o.set(e, t), Z(t, e, Ss, ae, o), o.delete(e)), t;
				}
				function ue(t) {
					return pn(t) ? Ss : t;
				}
				function ce(t, e, n, r, i, o) {
					var s = 1 & n,
						a = t.length,
						u = e.length;
					if (a != u && !(s && a < u)) return !1;
					u = o.get(t);
					if (u && o.get(e)) return u == e;
					var c = -1,
						l = !0,
						h = 2 & n ? new v() : Ss;
					for (o.set(t, e), o.set(e, t); ++c < a; ) {
						var f,
							p = t[c],
							d = e[c];
						if ((r && (f = s ? r(d, p, c, e, t, o) : r(p, d, c, t, e, o)), f !== Ss)) {
							if (f) continue;
							l = !1;
							break;
						}
						if (h) {
							if (
								!es(e, function (t, e) {
									return !ds(h, e) && (p === t || i(p, t, n, r, o)) && h.push(e);
								})
							) {
								l = !1;
								break;
							}
						} else if (p !== d && !i(p, d, n, r, o)) {
							l = !1;
							break;
						}
					}
					return o.delete(t), o.delete(e), l;
				}
				function le(t) {
					return vi(Ae(t, Ss, Fe), t + "");
				}
				function he(t) {
					return R(t, Sn, ci);
				}
				function fe(t) {
					return R(t, On, li);
				}
				function pe(t) {
					for (var e = t.name + "", n = qr[e], r = tr.call(qr, e) ? n.length : 0; r--; ) {
						var i = n[r],
							o = i.func;
						if (null == o || o == t) return i.name;
					}
					return e;
				}
				function de(t) {
					return (tr.call(thisLikeLodash, "placeholder") ? thisLikeLodash : t)
						.placeholder;
				}
				function ge() {
					var t = (t = thisLikeLodash.iteratee || Dn) === Dn ? V : t;
					return arguments.length ? t(arguments[0], arguments[1]) : t;
				}
				function me(t, e) {
					var n,
						r = t.__data__;
					return (
						"string" == (t = typeof (n = e)) ||
						"number" == t ||
						"symbol" == t ||
						"boolean" == t
							? "__proto__" !== n
							: null === n
					)
						? r["string" == typeof e ? "string" : "hash"]
						: r.map;
				}
				function ve(t) {
					for (var e = Sn(t), n = e.length; n--; ) {
						var r = e[n],
							i = t[r];
						e[n] = [r, i, Ee(i)];
					}
					return e;
				}
				function ye(t, e) {
					(e = e), (e = null == (t = t) ? Ss : t[e]);
					return G(e) ? e : Ss;
				}
				function be(t, e, n) {
					for (var r = -1, i = (e = Tt(e, t)).length, o = !1; ++r < i; ) {
						var s = De(e[r]);
						if (!(o = null != t && n(t, s))) break;
						t = t[s];
					}
					return o || ++r != i
						? o
						: !!(i = null == t ? 0 : t.length) && cn(i) && xe(s, i) && (io(t) || ro(t));
				}
				function we(t) {
					return "function" != typeof t.constructor || Oe(t) ? {} : Qr(hr(t));
				}
				function _e(t) {
					return io(t) || ro(t) || !!(gr && t && t[gr]);
				}
				function xe(t, e) {
					return (
						!!(e = null == e ? As : e) &&
						("number" == typeof t || Ma.test(t)) &&
						-1 < t &&
						t % 1 == 0 &&
						t < e
					);
				}
				function Ce(t, e, n) {
					if (ln(n)) {
						var r = typeof e;
						return (
							("number" == r ? rn(n) && xe(e, n.length) : "string" == r && e in n) &&
							nn(n[e], t)
						);
					}
				}
				function ke(t, e) {
					if (!io(t)) {
						var n = typeof t;
						return (
							"number" == n ||
							"symbol" == n ||
							"boolean" == n ||
							null == t ||
							gn(t) ||
							va.test(t) ||
							!ma.test(t) ||
							(null != e && t in Gn(e))
						);
					}
				}
				function Se(t) {
					var e = pe(t),
						n = thisLikeLodash[e];
					if ("function" == typeof n && e in m.prototype) {
						if (t === n) return 1;
						n = ui(n);
						return n && t === n[0];
					}
				}
				function Oe(t) {
					var e = t && t.constructor;
					return t === (("function" == typeof e && e.prototype) || Qn);
				}
				function Ee(t) {
					return t == t && !ln(t);
				}
				function Te(e, n) {
					return function (t) {
						return null != t && t[e] === n && (n !== Ss || e in Gn(t));
					};
				}
				function Ae(o, s, a) {
					return (
						(s = Ar(s === Ss ? o.length - 1 : s, 0)),
						function () {
							for (
								var t = arguments, e = -1, n = Ar(t.length - s, 0), r = Hn(n);
								++e < n;

							)
								r[e] = t[s + e];
							e = -1;
							for (var i = Hn(s + 1); ++e < s; ) i[e] = t[e];
							return (i[s] = a(r)), zo(o, this, i);
						}
					);
				}
				function Ie(t, e) {
					return e.length < 2 ? t : D(t, ft(e, 0, -1));
				}
				function je(t, e, n) {
					var r,
						i,
						e = e + "";
					return vi(
						t,
						(function (t, e) {
							var n = e.length;
							if (!n) return t;
							var r = n - 1;
							return (
								(e[r] = (1 < n ? "& " : "") + e[r]),
								(e = e.join(2 < n ? ", " : " ")),
								t.replace(Sa, "{\n/* [wrapped with " + e + "] */\n")
							);
						})(
							e,
							((r = (e = (e = e).match(Oa)) ? e[1].split(Ea) : []),
							(i = n),
							Go(Ps, function (t) {
								var e = "_." + t[0];
								i & t[1] && !Yo(r, e) && r.push(e);
							}),
							r.sort())
						)
					);
				}
				function Pe(n) {
					var r = 0,
						i = 0;
					return function () {
						var t = jr(),
							e = 16 - (t - i);
						if (((i = t), 0 < e)) {
							if (800 <= ++r) return arguments[0];
						} else r = 0;
						return n.apply(Ss, arguments);
					};
				}
				function Ne(t, e) {
					var n = -1,
						r = t.length,
						i = r - 1;
					for (e = e === Ss ? r : e; ++n < e; ) {
						var o = ot(n, i),
							s = t[o];
						(t[o] = t[n]), (t[n] = s);
					}
					return (t.length = e), t;
				}
				function De(t) {
					if ("string" == typeof t || gn(t)) return t;
					var e = t + "";
					return "0" == e && 1 / t == -1 / 0 ? "-0" : e;
				}
				function Re(t) {
					if (null != t) {
						try {
							return Zn.call(t);
						} catch (t) {}
						try {
							return t + "";
						} catch (t) {}
					}
					return "";
				}
				function Me(t) {
					if (t instanceof m) return t.clone();
					var e = new g(t.__wrapped__, t.__chain__);
					return (
						(e.__actions__ = Mt(t.__actions__)),
						(e.__index__ = t.__index__),
						(e.__values__ = t.__values__),
						e
					);
				}
				function We(t, e, n) {
					var r = null == t ? 0 : t.length;
					if (!r) return -1;
					n = null == n ? 0 : yn(n);
					return n < 0 && (n = Ar(r + n, 0)), rs(t, ge(e, 3), n);
				}
				function Le(t, e, n) {
					var r = null == t ? 0 : t.length;
					if (!r) return -1;
					var i = r - 1;
					return (
						n !== Ss && ((i = yn(n)), (i = n < 0 ? Ar(r + i, 0) : Ir(i, r - 1))),
						rs(t, ge(e, 3), i, !0)
					);
				}
				function Fe(t) {
					return (null == t ? 0 : t.length) ? I(t, 1) : [];
				}
				function He(t) {
					return t && t.length ? t[0] : Ss;
				}
				function Be(t) {
					var e = null == t ? 0 : t.length;
					return e ? t[e - 1] : Ss;
				}
				function qe(t, e) {
					return t && t.length && e && e.length ? rt(t, e) : t;
				}
				function ze(t) {
					return null == t ? t : Dr.call(t);
				}
				function Ue(e) {
					if (!e || !e.length) return [];
					var n = 0;
					return (
						(e = Xo(e, function (t) {
							return on(t) && ((n = Ar(t.length, n)), 1);
						})),
						hs(n, function (t) {
							return Qo(e, us(t));
						})
					);
				}
				function Ge(t, e) {
					if (!t || !t.length) return [];
					t = Ue(t);
					return null == e
						? t
						: Qo(t, function (t) {
								return zo(e, Ss, t);
							});
				}
				function Ve(t) {
					t = thisLikeLodash(t);
					return (t.__chain__ = !0), t;
				}
				function $e(t, e) {
					return e(t);
				}
				function Xe(t, e) {
					return (io(t) ? Go : Zr)(t, ge(e, 3));
				}
				function Ye(t, e) {
					return (io(t) ? Vo : ti)(t, ge(e, 3));
				}
				function Ke(t, e) {
					return (io(t) ? Qo : K)(t, ge(e, 3));
				}
				function Qe(t, e, n) {
					return (
						(e = n ? Ss : e),
						(e = t && null == e ? t.length : e),
						oe(t, 128, Ss, Ss, Ss, Ss, e)
					);
				}
				function Je(t, e) {
					var n;
					if ("function" != typeof e) throw new Xn(Os);
					return (
						(t = yn(t)),
						function () {
							return 0 < --t && (n = e.apply(this, arguments)), t <= 1 && (e = Ss), n;
						}
					);
				}
				function Ze(r, n, t) {
					function i(t) {
						var e = u,
							n = c;
						return (u = c = Ss), (d = t), (h = r.apply(n, e));
					}
					function o(t) {
						var e = t - p;
						return p === Ss || n <= e || e < 0 || (m && l <= t - d);
					}
					function s() {
						var t,
							e = Gi();
						return o(e)
							? a(e)
							: void (f = mi(
									s,
									((e = n - ((t = e) - p)), m ? Ir(e, l - (t - d)) : e)
								));
					}
					function a(t) {
						return (f = Ss), v && u ? i(t) : ((u = c = Ss), h);
					}
					function e() {
						var t = Gi(),
							e = o(t);
						if (((u = arguments), (c = this), (p = t), e)) {
							if (f === Ss) return (d = e = p), (f = mi(s, n)), g ? i(e) : h;
							if (m) return (f = mi(s, n)), i(p);
						}
						return f === Ss && (f = mi(s, n)), h;
					}
					var u,
						c,
						l,
						h,
						f,
						p,
						d = 0,
						g = !1,
						m = !1,
						v = !0;
					if ("function" != typeof r) throw new Xn(Os);
					return (
						(n = wn(n) || 0),
						ln(t) &&
							((g = !!t.leading),
							(m = "maxWait" in t),
							(l = m ? Ar(wn(t.maxWait) || 0, n) : l),
							(v = "trailing" in t ? !!t.trailing : v)),
						(e.cancel = function () {
							f !== Ss && si(f), (d = 0), (u = p = c = f = Ss);
						}),
						(e.flush = function () {
							return f === Ss ? h : a(Gi());
						}),
						e
					);
				}
				function tn(r, i) {
					if ("function" != typeof r || (null != i && "function" != typeof i))
						throw new Xn(Os);
					var o = function () {
						var t = arguments,
							e = i ? i.apply(this, t) : t[0],
							n = o.cache;
						if (n.has(e)) return n.get(e);
						t = r.apply(this, t);
						return (o.cache = n.set(e, t) || n), t;
					};
					return (o.cache = new (tn.Cache || s)()), o;
				}
				function en(e) {
					if ("function" != typeof e) throw new Xn(Os);
					return function () {
						var t = arguments;
						switch (t.length) {
							case 0:
								return !e.call(this);
							case 1:
								return !e.call(this, t[0]);
							case 2:
								return !e.call(this, t[0], t[1]);
							case 3:
								return !e.call(this, t[0], t[1], t[2]);
						}
						return !e.apply(this, t);
					};
				}
				function nn(t, e) {
					return t === e || (t != t && e != e);
				}
				function rn(t) {
					return null != t && cn(t.length) && !an(t);
				}
				function on(t) {
					return hn(t) && rn(t);
				}
				function sn(t) {
					if (!hn(t)) return !1;
					var e = M(t);
					return (
						e == Ws ||
						"[object DOMException]" == e ||
						("string" == typeof t.message && "string" == typeof t.name && !pn(t))
					);
				}
				function an(t) {
					if (!ln(t)) return !1;
					t = M(t);
					return (
						t == Ls || t == Fs || "[object AsyncFunction]" == t || "[object Proxy]" == t
					);
				}
				function un(t) {
					return "number" == typeof t && t == yn(t);
				}
				function cn(t) {
					return "number" == typeof t && -1 < t && t % 1 == 0 && t <= As;
				}
				function ln(t) {
					var e = typeof t;
					return null != t && ("object" == e || "function" == e);
				}
				function hn(t) {
					return null != t && "object" == typeof t;
				}
				function fn(t) {
					return "number" == typeof t || (hn(t) && M(t) == Bs);
				}
				function pn(t) {
					if (!hn(t) || M(t) != qs) return !1;
					t = hr(t);
					if (null === t) return !0;
					t = tr.call(t, "constructor") && t.constructor;
					return "function" == typeof t && t instanceof t && Zn.call(t) == ir;
				}
				function dn(t) {
					return "string" == typeof t || (!io(t) && hn(t) && M(t) == Vs);
				}
				function gn(t) {
					return "symbol" == typeof t || (hn(t) && M(t) == $s);
				}
				function mn(t) {
					if (!t) return [];
					if (rn(t)) return (dn(t) ? ks : Mt)(t);
					if (mr && t[mr])
						return (function (t) {
							for (var e, n = []; !(e = t.next()).done; ) n.push(e.value);
							return n;
						})(t[mr]());
					var e = hi(t);
					return (e == Hs ? bs : e == Gs ? xs : Tn)(t);
				}
				function vn(t) {
					return t
						? (t = wn(t)) !== 1 / 0 && t !== -1 / 0
							? t == t
								? t
								: 0
							: 17976931348623157e292 * (t < 0 ? -1 : 1)
						: 0 === t
							? t
							: 0;
				}
				function yn(t) {
					var e = vn(t),
						t = e % 1;
					return e == e ? (t ? e - t : e) : 0;
				}
				function bn(t) {
					return t ? x(yn(t), 0, js) : 0;
				}
				function wn(t) {
					if ("number" == typeof t) return t;
					if (gn(t)) return Is;
					if (
						(ln(t) &&
							(t = ln((e = "function" == typeof t.valueOf ? t.valueOf() : t))
								? e + ""
								: e),
						"string" != typeof t)
					)
						return 0 === t ? t : +t;
					t = t.replace(xa, "");
					var e = Na.test(t);
					return e || Ra.test(t) ? Ya(t.slice(2), e ? 2 : 8) : Pa.test(t) ? Is : +t;
				}
				function _n(t) {
					return Wt(t, On(t));
				}
				function xn(t) {
					return null == t ? "" : yt(t);
				}
				function Cn(t, e, n) {
					e = null == t ? Ss : D(t, e);
					return e === Ss ? n : e;
				}
				function kn(t, e) {
					return null != t && be(t, e, F);
				}
				function Sn(t) {
					return (rn(t) ? r : $)(t);
				}
				function On(t) {
					return rn(t) ? r(t, !0) : X(t);
				}
				function En(t, n) {
					if (null == t) return {};
					var e = Qo(fe(t), function (t) {
						return [t];
					});
					return (
						(n = ge(n)),
						nt(t, e, function (t, e) {
							return n(t, e[0]);
						})
					);
				}
				function Tn(t) {
					return null == t ? [] : ps(t, Sn(t));
				}
				function An(t) {
					return Lo(xn(t).toLowerCase());
				}
				function In(t) {
					return (t = xn(t)) && t.replace(Wa, iu).replace(Ba, "");
				}
				function jn(t, e, n) {
					return (
						(t = xn(t)),
						(e = n ? Ss : e) === Ss
							? ((n = t), za.test(n) ? t.match(qa) || [] : t.match(Ta) || [])
							: t.match(e) || []
					);
				}
				function Pn(t) {
					return function () {
						return t;
					};
				}
				function Nn(t) {
					return t;
				}
				function Dn(t) {
					return V("function" == typeof t ? t : C(t, 1));
				}
				function Rn(r, e, t) {
					var n = Sn(e),
						i = N(e, n);
					null != t ||
						(ln(e) && (i.length || !n.length)) ||
						((t = e), (e = r), (r = this), (i = N(e, Sn(e))));
					var o = !(ln(t) && "chain" in t && !t.chain),
						s = an(r);
					return (
						Go(i, function (t) {
							var n = e[t];
							(r[t] = n),
								s &&
									(r.prototype[t] = function () {
										var t = this.__chain__;
										if (o || t) {
											var e = r(this.__wrapped__);
											return (
												(e.__actions__ = Mt(this.__actions__)).push({
													func: n,
													args: arguments,
													thisArg: r
												}),
												(e.__chain__ = t),
												e
											);
										}
										return n.apply(r, Jo([this.value()], arguments));
									});
						}),
						r
					);
				}
				function Mn() {}
				function Wn(t) {
					return ke(t)
						? us(De(t))
						: ((e = t),
							function (t) {
								return D(t, e);
							});
					var e;
				}
				function Ln() {
					return [];
				}
				function Fn() {
					return !1;
				}
				var Hn = (e = null == e ? Ka : au.defaults(Ka.Object(), e, au.pick(Ka, Ua))).Array,
					Bn = e.Date,
					qn = e.Error,
					zn = e.Function,
					Un = e.Math,
					Gn = e.Object,
					Vn = e.RegExp,
					$n = e.String,
					Xn = e.TypeError,
					Yn = Hn.prototype,
					Kn = zn.prototype,
					Qn = Gn.prototype,
					Jn = e["__core-js_shared__"],
					Zn = Kn.toString,
					tr = Qn.hasOwnProperty,
					er = 0,
					nr = (Ho = /[^.]+$/.exec((Jn && Jn.keys && Jn.keys.IE_PROTO) || ""))
						? "Symbol(src)_1." + Ho
						: "",
					rr = Qn.toString,
					ir = Zn.call(Gn),
					holdWinLodash = Ka._,
					sr = Vn(
						"^" +
							Zn.call(tr)
								.replace(wa, "\\$&")
								.replace(
									/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
									"$1.*?"
								) +
							"$"
					),
					ar = Qa ? e.Buffer : Ss,
					ur = e.Symbol,
					cr = e.Uint8Array,
					lr = ar ? ar.allocUnsafe : Ss,
					hr = ws(Gn.getPrototypeOf, Gn),
					fr = Gn.create,
					pr = Qn.propertyIsEnumerable,
					dr = Yn.splice,
					gr = ur ? ur.isConcatSpreadable : Ss,
					mr = ur ? ur.iterator : Ss,
					vr = ur ? ur.toStringTag : Ss,
					yr = (function () {
						try {
							var t = ye(Gn, "defineProperty");
							return t({}, "", {}), t;
						} catch (t) {}
					})(),
					br = e.clearTimeout !== Ka.clearTimeout && e.clearTimeout,
					wr = Bn && Bn.now !== Ka.Date.now && Bn.now,
					_r = e.setTimeout !== Ka.setTimeout && e.setTimeout,
					xr = Un.ceil,
					Cr = Un.floor,
					kr = Gn.getOwnPropertySymbols,
					Sr = ar ? ar.isBuffer : Ss,
					Or = e.isFinite,
					Er = Yn.join,
					Tr = ws(Gn.keys, Gn),
					Ar = Un.max,
					Ir = Un.min,
					jr = Bn.now,
					Pr = e.parseInt,
					Nr = Un.random,
					Dr = Yn.reverse,
					Rr = ye(e, "DataView"),
					Mr = ye(e, "Map"),
					Wr = ye(e, "Promise"),
					Lr = ye(e, "Set"),
					Fr = ye(e, "WeakMap"),
					Hr = ye(Gn, "create"),
					Br = Fr && new Fr(),
					qr = {},
					zr = Re(Rr),
					Ur = Re(Mr),
					Gr = Re(Wr),
					Vr = Re(Lr),
					$r = Re(Fr),
					Xr = ur ? ur.prototype : Ss,
					Yr = Xr ? Xr.valueOf : Ss,
					Kr = Xr ? Xr.toString : Ss,
					Qr = function (t) {
						if (!ln(t)) return {};
						if (fr) return fr(t);
						Jr.prototype = t;
						t = new Jr();
						return (Jr.prototype = Ss), t;
					};
				function Jr() {}
				(thisLikeLodash.templateSettings = {
					escape: pa,
					evaluate: da,
					interpolate: ga,
					variable: "",
					imports: {
						_: thisLikeLodash
					}
				}),
					((thisLikeLodash.prototype = o.prototype).constructor = thisLikeLodash),
					((g.prototype = Qr(o.prototype)).constructor = g),
					((m.prototype = Qr(o.prototype)).constructor = m),
					(n.prototype.clear = function () {
						(this.__data__ = Hr ? Hr(null) : {}), (this.size = 0);
					}),
					(n.prototype.delete = function (t) {
						return (
							(t = this.has(t) && delete this.__data__[t]),
							(this.size -= t ? 1 : 0),
							t
						);
					}),
					(n.prototype.get = function (t) {
						var e = this.__data__;
						if (Hr) {
							var n = e[t];
							return n === Es ? Ss : n;
						}
						return tr.call(e, t) ? e[t] : Ss;
					}),
					(n.prototype.has = function (t) {
						var e = this.__data__;
						return Hr ? e[t] !== Ss : tr.call(e, t);
					}),
					(n.prototype.set = function (t, e) {
						var n = this.__data__;
						return (
							(this.size += this.has(t) ? 0 : 1),
							(n[t] = Hr && e === Ss ? Es : e),
							this
						);
					}),
					(i.prototype.clear = function () {
						(this.__data__ = []), (this.size = 0);
					}),
					(i.prototype.delete = function (t) {
						var e = this.__data__;
						return (
							!((t = l(e, t)) < 0) &&
							(t == e.length - 1 ? e.pop() : dr.call(e, t, 1), --this.size, !0)
						);
					}),
					(i.prototype.get = function (t) {
						var e = this.__data__;
						return (t = l(e, t)) < 0 ? Ss : e[t][1];
					}),
					(i.prototype.has = function (t) {
						return -1 < l(this.__data__, t);
					}),
					(i.prototype.set = function (t, e) {
						var n = this.__data__,
							r = l(n, t);
						return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
					}),
					(s.prototype.clear = function () {
						(this.size = 0),
							(this.__data__ = {
								hash: new n(),
								map: new (Mr || i)(),
								string: new n()
							});
					}),
					(s.prototype.delete = function (t) {
						return (t = me(this, t).delete(t)), (this.size -= t ? 1 : 0), t;
					}),
					(s.prototype.get = function (t) {
						return me(this, t).get(t);
					}),
					(s.prototype.has = function (t) {
						return me(this, t).has(t);
					}),
					(s.prototype.set = function (t, e) {
						var n = me(this, t),
							r = n.size;
						return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
					}),
					(v.prototype.add = v.prototype.push =
						function (t) {
							return this.__data__.set(t, Es), this;
						}),
					(v.prototype.has = function (t) {
						return this.__data__.has(t);
					}),
					(y.prototype.clear = function () {
						(this.__data__ = new i()), (this.size = 0);
					}),
					(y.prototype.delete = function (t) {
						var e = this.__data__,
							t = e.delete(t);
						return (this.size = e.size), t;
					}),
					(y.prototype.get = function (t) {
						return this.__data__.get(t);
					}),
					(y.prototype.has = function (t) {
						return this.__data__.has(t);
					}),
					(y.prototype.set = function (t, e) {
						var n = this.__data__;
						if (n instanceof i) {
							var r = n.__data__;
							if (!Mr || r.length < 199)
								return r.push([t, e]), (this.size = ++n.size), this;
							n = this.__data__ = new s(r);
						}
						return n.set(t, e), (this.size = n.size), this;
					});
				var Zr = Ht(j),
					ti = Ht(P, !0),
					ei = Bt(),
					ni = Bt(!0),
					ri = Br
						? function (t, e) {
								return Br.set(t, e), t;
							}
						: Nn,
					ii = yr
						? function (t, e) {
								return yr(t, "toString", {
									configurable: !0,
									enumerable: !1,
									value: Pn(e),
									writable: !0
								});
							}
						: Nn,
					oi = at,
					si =
						br ||
						function (t) {
							return Ka.clearTimeout(t);
						},
					ai =
						Lr && 1 / xs(new Lr([, -0]))[1] == 1 / 0
							? function (t) {
									return new Lr(t);
								}
							: Mn,
					ui = Br
						? function (t) {
								return Br.get(t);
							}
						: Mn,
					ci = kr
						? function (e) {
								return null == e
									? []
									: ((e = Gn(e)),
										Xo(kr(e), function (t) {
											return pr.call(e, t);
										}));
							}
						: Ln,
					li = kr
						? function (t) {
								for (var e = []; t; ) Jo(e, ci(t)), (t = hr(t));
								return e;
							}
						: Ln,
					hi = M;
				((Rr && hi(new Rr(new ArrayBuffer(1))) != Ks) ||
					(Mr && hi(new Mr()) != Hs) ||
					(Wr && hi(Wr.resolve()) != zs) ||
					(Lr && hi(new Lr()) != Gs) ||
					(Fr && hi(new Fr()) != Xs)) &&
					(hi = function (t) {
						var e = M(t),
							t = e == qs ? t.constructor : Ss,
							t = t ? Re(t) : "";
						if (t)
							switch (t) {
								case zr:
									return Ks;
								case Ur:
									return Hs;
								case Gr:
									return zs;
								case Vr:
									return Gs;
								case $r:
									return Xs;
							}
						return e;
					});
				var fi,
					pi,
					di = Jn ? an : Fn,
					gi = Pe(ri),
					mi =
						_r ||
						function (t, e) {
							return Ka.setTimeout(t, e);
						},
					vi = Pe(ii),
					yi =
						((pi = (fi = tn(
							(fi = function (t) {
								var i = [];
								return (
									ya.test(t) && i.push(""),
									t.replace(ba, function (t, e, n, r) {
										i.push(n ? r.replace(Aa, "$1") : e || t);
									}),
									i
								);
							}),
							function (t) {
								return 500 === pi.size && pi.clear(), t;
							}
						)).cache),
						fi),
					bi = at(function (t, e) {
						return on(t) ? O(t, I(e, 1, on, !0)) : [];
					}),
					wi = at(function (t, e) {
						var n = Be(e);
						return on(n) && (n = Ss), on(t) ? O(t, I(e, 1, on, !0), ge(n, 2)) : [];
					}),
					_i = at(function (t, e) {
						var n = Be(e);
						return on(n) && (n = Ss), on(t) ? O(t, I(e, 1, on, !0), Ss, n) : [];
					}),
					xi = at(function (t) {
						var e = Qo(t, Ot);
						return e.length && e[0] === t[0] ? H(e) : [];
					}),
					Ci = at(function (t) {
						var e = Be(t),
							n = Qo(t, Ot);
						return (
							e === Be(n) ? (e = Ss) : n.pop(),
							n.length && n[0] === t[0] ? H(n, ge(e, 2)) : []
						);
					}),
					ki = at(function (t) {
						var e = Be(t),
							n = Qo(t, Ot);
						return (
							(e = "function" == typeof e ? e : Ss) && n.pop(),
							n.length && n[0] === t[0] ? H(n, Ss, e) : []
						);
					}),
					Si = at(qe),
					Oi = le(function (t, e) {
						var n = null == t ? 0 : t.length,
							r = _(t, e);
						return (
							it(
								t,
								Qo(e, function (t) {
									return xe(t, n) ? +t : t;
								}).sort(Nt)
							),
							r
						);
					}),
					Ei = at(function (t) {
						return bt(I(t, 1, on, !0));
					}),
					Ti = at(function (t) {
						var e = Be(t);
						return on(e) && (e = Ss), bt(I(t, 1, on, !0), ge(e, 2));
					}),
					Ai = at(function (t) {
						var e = "function" == typeof (e = Be(t)) ? e : Ss;
						return bt(I(t, 1, on, !0), Ss, e);
					}),
					Ii = at(function (t, e) {
						return on(t) ? O(t, e) : [];
					}),
					ji = at(function (t) {
						return kt(Xo(t, on));
					}),
					Pi = at(function (t) {
						var e = Be(t);
						return on(e) && (e = Ss), kt(Xo(t, on), ge(e, 2));
					}),
					Ni = at(function (t) {
						var e = "function" == typeof (e = Be(t)) ? e : Ss;
						return kt(Xo(t, on), Ss, e);
					}),
					Di = at(Ue),
					Ri = at(function (t) {
						var e = t.length,
							e =
								"function" == typeof (e = 1 < e ? t[e - 1] : Ss)
									? (t.pop(), e)
									: Ss;
						return Ge(t, e);
					}),
					Mi = le(function (e) {
						function t(t) {
							return _(t, e);
						}
						var n = e.length,
							r = n ? e[0] : 0,
							i = this.__wrapped__;
						return !(1 < n || this.__actions__.length) && i instanceof m && xe(r)
							? ((i = i.slice(r, +r + (n ? 1 : 0))).__actions__.push({
									func: $e,
									args: [t],
									thisArg: Ss
								}),
								new g(i, this.__chain__).thru(function (t) {
									return n && !t.length && t.push(Ss), t;
								}))
							: this.thru(t);
					}),
					Wi = Lt(function (t, e, n) {
						tr.call(t, n) ? ++t[n] : f(t, n, 1);
					}),
					Li = Vt(We),
					Fi = Vt(Le),
					Hi = Lt(function (t, e, n) {
						tr.call(t, n) ? t[n].push(e) : f(t, n, [e]);
					}),
					Bi = at(function (t, e, n) {
						var r = -1,
							i = "function" == typeof e,
							o = rn(t) ? Hn(t.length) : [];
						return (
							Zr(t, function (t) {
								o[++r] = i ? zo(e, t, n) : B(t, e, n);
							}),
							o
						);
					}),
					qi = Lt(function (t, e, n) {
						f(t, n, e);
					}),
					zi = Lt(
						function (t, e, n) {
							t[n ? 0 : 1].push(e);
						},
						function () {
							return [[], []];
						}
					),
					Ui = at(function (t, e) {
						if (null == t) return [];
						var n = e.length;
						return (
							1 < n && Ce(t, e[0], e[1])
								? (e = [])
								: 2 < n && Ce(e[0], e[1], e[2]) && (e = [e[0]]),
							et(t, I(e, 1), [])
						);
					}),
					Gi =
						wr ||
						function () {
							return Ka.Date.now();
						},
					Vi = at(function (t, e, n) {
						var r,
							i = 1;
						return n.length && ((r = _s(n, de(Vi))), (i |= 32)), oe(t, i, e, n, r);
					}),
					$i = at(function (t, e, n) {
						var r,
							i = 3;
						return n.length && ((r = _s(n, de($i))), (i |= 32)), oe(e, i, t, n, r);
					}),
					Xi = at(function (t, e) {
						return S(t, 1, e);
					}),
					Yi = at(function (t, e, n) {
						return S(t, wn(e) || 0, n);
					});
				tn.Cache = s;
				var Ki,
					Qi = oi(function (r, i) {
						var o = (i =
							1 == i.length && io(i[0]) ? Qo(i[0], fs(ge())) : Qo(I(i, 1), fs(ge())))
							.length;
						return at(function (t) {
							for (var e = -1, n = Ir(t.length, o); ++e < n; )
								t[e] = i[e].call(this, t[e]);
							return zo(r, this, t);
						});
					}),
					Ji = at(function (t, e) {
						var n = _s(e, de(Ji));
						return oe(t, 32, Ss, e, n);
					}),
					Zi = at(function (t, e) {
						var n = _s(e, de(Zi));
						return oe(t, 64, Ss, e, n);
					}),
					to = le(function (t, e) {
						return oe(t, 256, Ss, Ss, Ss, e);
					}),
					eo = ee(W),
					no = ee(function (t, e) {
						return e <= t;
					}),
					ro = q(
						(function () {
							return arguments;
						})()
					)
						? q
						: function (t) {
								return hn(t) && tr.call(t, "callee") && !pr.call(t, "callee");
							},
					io = Hn.isArray,
					oo = Ja
						? fs(Ja)
						: function (t) {
								return hn(t) && M(t) == Ys;
							},
					so = Sr || Fn,
					ao = Za
						? fs(Za)
						: function (t) {
								return hn(t) && M(t) == Ms;
							},
					uo = tu
						? fs(tu)
						: function (t) {
								return hn(t) && hi(t) == Hs;
							},
					co = eu
						? fs(eu)
						: function (t) {
								return hn(t) && M(t) == Us;
							},
					lo = nu
						? fs(nu)
						: function (t) {
								return hn(t) && hi(t) == Gs;
							},
					ho = ru
						? fs(ru)
						: function (t) {
								return hn(t) && cn(t.length) && !!Va[M(t)];
							},
					fo = ee(Y),
					po = ee(function (t, e) {
						return t <= e;
					}),
					go = Ft(function (t, e) {
						if (Oe(e) || rn(e)) Wt(e, Sn(e), t);
						else for (var n in e) tr.call(e, n) && b(t, n, e[n]);
					}),
					mo = Ft(function (t, e) {
						Wt(e, On(e), t);
					}),
					vo = Ft(function (t, e, n, r) {
						Wt(e, On(e), t, r);
					}),
					yo = Ft(function (t, e, n, r) {
						Wt(e, Sn(e), t, r);
					}),
					bo = le(_),
					wo = at(function (t) {
						return t.push(Ss, se), zo(vo, Ss, t);
					}),
					_o = at(function (t) {
						return t.push(Ss, ae), zo(Oo, Ss, t);
					}),
					xo = Yt(function (t, e, n) {
						t[e] = n;
					}, Pn(Nn)),
					Co = Yt(function (t, e, n) {
						tr.call(t, e) ? t[e].push(n) : (t[e] = [n]);
					}, ge),
					ko = at(B),
					So = Ft(function (t, e, n) {
						Z(t, e, n);
					}),
					Oo = Ft(function (t, e, n, r) {
						Z(t, e, n, r);
					}),
					Eo = le(function (e, t) {
						var n = {};
						if (null == e) return n;
						var r = !1;
						(t = Qo(t, function (t) {
							return (t = Tt(t, e)), (r = r || 1 < t.length), t;
						})),
							Wt(e, fe(e), n),
							r && (n = C(n, 7, ue));
						for (var i = t.length; i--; ) wt(n, t[i]);
						return n;
					}),
					To = le(function (t, e) {
						return null == t
							? {}
							: nt((n = t), e, function (t, e) {
									return kn(n, e);
								});
						var n;
					}),
					Ao = ie(Sn),
					Io = ie(On),
					jo = zt(function (t, e, n) {
						return (e = e.toLowerCase()), t + (n ? An(e) : e);
					}),
					Po = zt(function (t, e, n) {
						return t + (n ? "-" : "") + e.toLowerCase();
					}),
					No = zt(function (t, e, n) {
						return t + (n ? " " : "") + e.toLowerCase();
					}),
					Do = qt("toLowerCase"),
					Ro = zt(function (t, e, n) {
						return t + (n ? "_" : "") + e.toLowerCase();
					}),
					Mo = zt(function (t, e, n) {
						return t + (n ? " " : "") + Lo(e);
					}),
					Wo = zt(function (t, e, n) {
						return t + (n ? " " : "") + e.toUpperCase();
					}),
					Lo = qt("toUpperCase"),
					Fo = at(function (t, e) {
						try {
							return zo(t, Ss, e);
						} catch (t) {
							return sn(t) ? t : new qn(t);
						}
					}),
					Kn = le(function (e, t) {
						return (
							Go(t, function (t) {
								(t = De(t)), f(e, t, Vi(e[t], e));
							}),
							e
						);
					}),
					Ho = $t(),
					ar = $t(!0),
					Bn = at(function (e, n) {
						return function (t) {
							return B(t, e, n);
						};
					}),
					e = at(function (e, n) {
						return function (t) {
							return B(e, t, n);
						};
					}),
					ur = Qt(Qo),
					Xr = Qt($o),
					br = Qt(es),
					Rr = te(),
					Wr = te(!0),
					Fr = Kt(function (t, e) {
						return t + e;
					}, 0),
					Jn = re("ceil"),
					_r = Kt(function (t, e) {
						return t / e;
					}, 1),
					ii = re("floor"),
					wr = Kt(function (t, e) {
						return t * e;
					}, 1),
					oi = re("round"),
					Sr = Kt(function (t, e) {
						return t - e;
					}, 0);
				return (
					(thisLikeLodash.after = function (t, e) {
						if ("function" != typeof e) throw new Xn(Os);
						return (
							(t = yn(t)),
							function () {
								if (--t < 1) return e.apply(this, arguments);
							}
						);
					}),
					(thisLikeLodash.ary = Qe),
					(thisLikeLodash.assign = go),
					(thisLikeLodash.assignIn = mo),
					(thisLikeLodash.assignInWith = vo),
					(thisLikeLodash.assignWith = yo),
					(thisLikeLodash.at = bo),
					(thisLikeLodash.before = Je),
					(thisLikeLodash.bind = Vi),
					(thisLikeLodash.bindAll = Kn),
					(thisLikeLodash.bindKey = $i),
					(thisLikeLodash.castArray = function () {
						if (!arguments.length) return [];
						var t = arguments[0];
						return io(t) ? t : [t];
					}),
					(thisLikeLodash.chain = Ve),
					(thisLikeLodash.chunk = function (t, e, n) {
						e = (n ? Ce(t, e, n) : e === Ss) ? 1 : Ar(yn(e), 0);
						var r = null == t ? 0 : t.length;
						if (!r || e < 1) return [];
						for (var i = 0, o = 0, s = Hn(xr(r / e)); i < r; )
							s[o++] = ft(t, i, (i += e));
						return s;
					}),
					(thisLikeLodash.compact = function (t) {
						for (var e = -1, n = null == t ? 0 : t.length, r = 0, i = []; ++e < n; ) {
							var o = t[e];
							o && (i[r++] = o);
						}
						return i;
					}),
					(thisLikeLodash.concat = function () {
						var t = arguments.length;
						if (!t) return [];
						for (var e = Hn(t - 1), n = arguments[0], r = t; r--; )
							e[r - 1] = arguments[r];
						return Jo(io(n) ? Mt(n) : [n], I(e, 1));
					}),
					(thisLikeLodash.cond = function (r) {
						var i = null == r ? 0 : r.length,
							e = ge();
						return (
							(r = i
								? Qo(r, function (t) {
										if ("function" != typeof t[1]) throw new Xn(Os);
										return [e(t[0]), t[1]];
									})
								: []),
							at(function (t) {
								for (var e = -1; ++e < i; ) {
									var n = r[e];
									if (zo(n[0], this, t)) return zo(n[1], this, t);
								}
							})
						);
					}),
					(thisLikeLodash.conforms = function (t) {
						return (
							(e = C(t, 1)),
							(n = Sn(e)),
							function (t) {
								return k(t, e, n);
							}
						);
						var e, n;
					}),
					(thisLikeLodash.constant = Pn),
					(thisLikeLodash.countBy = Wi),
					(thisLikeLodash.create = function (t, e) {
						return (t = Qr(t)), null == e ? t : w(t, e);
					}),
					(thisLikeLodash.curry = function t(e, n, r) {
						n = oe(e, 8, Ss, Ss, Ss, Ss, Ss, (n = r ? Ss : n));
						return (n.placeholder = t.placeholder), n;
					}),
					(thisLikeLodash.curryRight = function t(e, n, r) {
						n = oe(e, 16, Ss, Ss, Ss, Ss, Ss, (n = r ? Ss : n));
						return (n.placeholder = t.placeholder), n;
					}),
					(thisLikeLodash.debounce = Ze),
					(thisLikeLodash.defaults = wo),
					(thisLikeLodash.defaultsDeep = _o),
					(thisLikeLodash.defer = Xi),
					(thisLikeLodash.delay = Yi),
					(thisLikeLodash.difference = bi),
					(thisLikeLodash.differenceBy = wi),
					(thisLikeLodash.differenceWith = _i),
					(thisLikeLodash.drop = function (t, e, n) {
						var r = null == t ? 0 : t.length;
						return r ? ft(t, (e = n || e === Ss ? 1 : yn(e)) < 0 ? 0 : e, r) : [];
					}),
					(thisLikeLodash.dropRight = function (t, e, n) {
						var r = null == t ? 0 : t.length;
						return r
							? ft(t, 0, (e = r - (e = n || e === Ss ? 1 : yn(e))) < 0 ? 0 : e)
							: [];
					}),
					(thisLikeLodash.dropRightWhile = function (t, e) {
						return t && t.length ? xt(t, ge(e, 3), !0, !0) : [];
					}),
					(thisLikeLodash.dropWhile = function (t, e) {
						return t && t.length ? xt(t, ge(e, 3), !0) : [];
					}),
					(thisLikeLodash.fill = function (t, e, n, r) {
						var i = null == t ? 0 : t.length;
						return i
							? (n && "number" != typeof n && Ce(t, e, n) && ((n = 0), (r = i)),
								(function (t, e, n, r) {
									var i = t.length;
									for (
										(n = yn(n)) < 0 && (n = i < -n ? 0 : i + n),
											(r = r === Ss || i < r ? i : yn(r)) < 0 && (r += i),
											r = r < n ? 0 : bn(r);
										n < r;

									)
										t[n++] = e;
									return t;
								})(t, e, n, r))
							: [];
					}),
					(thisLikeLodash.filter = function (t, e) {
						return (io(t) ? Xo : A)(t, ge(e, 3));
					}),
					(thisLikeLodash.flatMap = function (t, e) {
						return I(Ke(t, e), 1);
					}),
					(thisLikeLodash.flatMapDeep = function (t, e) {
						return I(Ke(t, e), 1 / 0);
					}),
					(thisLikeLodash.flatMapDepth = function (t, e, n) {
						return (n = n === Ss ? 1 : yn(n)), I(Ke(t, e), n);
					}),
					(thisLikeLodash.flatten = Fe),
					(thisLikeLodash.flattenDeep = function (t) {
						return (null == t ? 0 : t.length) ? I(t, 1 / 0) : [];
					}),
					(thisLikeLodash.flattenDepth = function (t, e) {
						return (null == t ? 0 : t.length) ? I(t, (e = e === Ss ? 1 : yn(e))) : [];
					}),
					(thisLikeLodash.flip = function (t) {
						return oe(t, 512);
					}),
					(thisLikeLodash.flow = Ho),
					(thisLikeLodash.flowRight = ar),
					(thisLikeLodash.fromPairs = function (t) {
						for (var e = -1, n = null == t ? 0 : t.length, r = {}; ++e < n; ) {
							var i = t[e];
							r[i[0]] = i[1];
						}
						return r;
					}),
					(thisLikeLodash.functions = function (t) {
						return null == t ? [] : N(t, Sn(t));
					}),
					(thisLikeLodash.functionsIn = function (t) {
						return null == t ? [] : N(t, On(t));
					}),
					(thisLikeLodash.groupBy = Hi),
					(thisLikeLodash.initial = function (t) {
						return (null == t ? 0 : t.length) ? ft(t, 0, -1) : [];
					}),
					(thisLikeLodash.intersection = xi),
					(thisLikeLodash.intersectionBy = Ci),
					(thisLikeLodash.intersectionWith = ki),
					(thisLikeLodash.invert = xo),
					(thisLikeLodash.invertBy = Co),
					(thisLikeLodash.invokeMap = Bi),
					(thisLikeLodash.iteratee = Dn),
					(thisLikeLodash.keyBy = qi),
					(thisLikeLodash.keys = Sn),
					(thisLikeLodash.keysIn = On),
					(thisLikeLodash.map = Ke),
					(thisLikeLodash.mapKeys = function (t, r) {
						var i = {};
						return (
							(r = ge(r, 3)),
							j(t, function (t, e, n) {
								f(i, r(t, e, n), t);
							}),
							i
						);
					}),
					(thisLikeLodash.mapValues = function (t, r) {
						var i = {};
						return (
							(r = ge(r, 3)),
							j(t, function (t, e, n) {
								f(i, e, r(t, e, n));
							}),
							i
						);
					}),
					(thisLikeLodash.matches = function (t) {
						return Q(C(t, 1));
					}),
					(thisLikeLodash.matchesProperty = function (t, e) {
						return J(t, C(e, 1));
					}),
					(thisLikeLodash.memoize = tn),
					(thisLikeLodash.merge = So),
					(thisLikeLodash.mergeWith = Oo),
					(thisLikeLodash.method = Bn),
					(thisLikeLodash.methodOf = e),
					(thisLikeLodash.mixin = Rn),
					(thisLikeLodash.negate = en),
					(thisLikeLodash.nthArg = function (e) {
						return (
							(e = yn(e)),
							at(function (t) {
								return tt(t, e);
							})
						);
					}),
					(thisLikeLodash.omit = Eo),
					(thisLikeLodash.omitBy = function (t, e) {
						return En(t, en(ge(e)));
					}),
					(thisLikeLodash.once = function (t) {
						return Je(2, t);
					}),
					(thisLikeLodash.orderBy = function (t, e, n, r) {
						return null == t
							? []
							: (io(e) || (e = null == e ? [] : [e]),
								io((n = r ? Ss : n)) || (n = null == n ? [] : [n]),
								et(t, e, n));
					}),
					(thisLikeLodash.over = ur),
					(thisLikeLodash.overArgs = Qi),
					(thisLikeLodash.overEvery = Xr),
					(thisLikeLodash.overSome = br),
					(thisLikeLodash.partial = Ji),
					(thisLikeLodash.partialRight = Zi),
					(thisLikeLodash.partition = zi),
					(thisLikeLodash.pick = To),
					(thisLikeLodash.pickBy = En),
					(thisLikeLodash.property = Wn),
					(thisLikeLodash.propertyOf = function (e) {
						return function (t) {
							return null == e ? Ss : D(e, t);
						};
					}),
					(thisLikeLodash.pull = Si),
					(thisLikeLodash.pullAll = qe),
					(thisLikeLodash.pullAllBy = function (t, e, n) {
						return t && t.length && e && e.length ? rt(t, e, ge(n, 2)) : t;
					}),
					(thisLikeLodash.pullAllWith = function (t, e, n) {
						return t && t.length && e && e.length ? rt(t, e, Ss, n) : t;
					}),
					(thisLikeLodash.pullAt = Oi),
					(thisLikeLodash.range = Rr),
					(thisLikeLodash.rangeRight = Wr),
					(thisLikeLodash.rearg = to),
					(thisLikeLodash.reject = function (t, e) {
						return (io(t) ? Xo : A)(t, en(ge(e, 3)));
					}),
					(thisLikeLodash.remove = function (t, e) {
						var n = [];
						if (!t || !t.length) return n;
						var r = -1,
							i = [],
							o = t.length;
						for (e = ge(e, 3); ++r < o; ) {
							var s = t[r];
							e(s, r, t) && (n.push(s), i.push(r));
						}
						return it(t, i), n;
					}),
					(thisLikeLodash.rest = function (t, e) {
						if ("function" != typeof t) throw new Xn(Os);
						return at(t, (e = e === Ss ? e : yn(e)));
					}),
					(thisLikeLodash.reverse = ze),
					(thisLikeLodash.sampleSize = function (t, e, n) {
						return (
							(e = (n ? Ce(t, e, n) : e === Ss) ? 1 : yn(e)), (io(t) ? u : ct)(t, e)
						);
					}),
					(thisLikeLodash.set = function (t, e, n) {
						return null == t ? t : lt(t, e, n);
					}),
					(thisLikeLodash.setWith = function (t, e, n, r) {
						return (
							(r = "function" == typeof r ? r : Ss), null == t ? t : lt(t, e, n, r)
						);
					}),
					(thisLikeLodash.shuffle = function (t) {
						return (io(t) ? c : ht)(t);
					}),
					(thisLikeLodash.slice = function (t, e, n) {
						var r = null == t ? 0 : t.length;
						return r
							? ((n =
									n && "number" != typeof n && Ce(t, e, n)
										? ((e = 0), r)
										: ((e = null == e ? 0 : yn(e)), n === Ss ? r : yn(n))),
								ft(t, e, n))
							: [];
					}),
					(thisLikeLodash.sortBy = Ui),
					(thisLikeLodash.sortedUniq = function (t) {
						return t && t.length ? mt(t) : [];
					}),
					(thisLikeLodash.sortedUniqBy = function (t, e) {
						return t && t.length ? mt(t, ge(e, 2)) : [];
					}),
					(thisLikeLodash.split = function (t, e, n) {
						return (
							n && "number" != typeof n && Ce(t, e, n) && (e = n = Ss),
							(n = n === Ss ? js : n >>> 0)
								? (t = xn(t)) &&
									("string" == typeof e || (null != e && !co(e))) &&
									!(e = yt(e)) &&
									ys(t)
									? At(ks(t), 0, n)
									: t.split(e, n)
								: []
						);
					}),
					(thisLikeLodash.spread = function (n, r) {
						if ("function" != typeof n) throw new Xn(Os);
						return (
							(r = null == r ? 0 : Ar(yn(r), 0)),
							at(function (t) {
								var e = t[r],
									t = At(t, 0, r);
								return e && Jo(t, e), zo(n, this, t);
							})
						);
					}),
					(thisLikeLodash.tail = function (t) {
						var e = null == t ? 0 : t.length;
						return e ? ft(t, 1, e) : [];
					}),
					(thisLikeLodash.take = function (t, e, n) {
						return t && t.length
							? ft(t, 0, (e = n || e === Ss ? 1 : yn(e)) < 0 ? 0 : e)
							: [];
					}),
					(thisLikeLodash.takeRight = function (t, e, n) {
						var r = null == t ? 0 : t.length;
						return r
							? ft(t, (e = r - (e = n || e === Ss ? 1 : yn(e))) < 0 ? 0 : e, r)
							: [];
					}),
					(thisLikeLodash.takeRightWhile = function (t, e) {
						return t && t.length ? xt(t, ge(e, 3), !1, !0) : [];
					}),
					(thisLikeLodash.takeWhile = function (t, e) {
						return t && t.length ? xt(t, ge(e, 3)) : [];
					}),
					(thisLikeLodash.tap = function (t, e) {
						return e(t), t;
					}),
					(thisLikeLodash.throttle = function (t, e, n) {
						var r = !0,
							i = !0;
						if ("function" != typeof t) throw new Xn(Os);
						return (
							ln(n) &&
								((r = "leading" in n ? !!n.leading : r),
								(i = "trailing" in n ? !!n.trailing : i)),
							Ze(t, e, {
								leading: r,
								maxWait: e,
								trailing: i
							})
						);
					}),
					(thisLikeLodash.thru = $e),
					(thisLikeLodash.toArray = mn),
					(thisLikeLodash.toPairs = Ao),
					(thisLikeLodash.toPairsIn = Io),
					(thisLikeLodash.toPath = function (t) {
						return io(t) ? Qo(t, De) : gn(t) ? [t] : Mt(yi(xn(t)));
					}),
					(thisLikeLodash.toPlainObject = _n),
					(thisLikeLodash.transform = function (t, r, i) {
						var e,
							n = io(t),
							o = n || so(t) || ho(t);
						return (
							(r = ge(r, 4)),
							null == i &&
								((e = t && t.constructor),
								(i = o ? (n ? new e() : []) : ln(t) && an(e) ? Qr(hr(t)) : {})),
							(o ? Go : j)(t, function (t, e, n) {
								return r(i, t, e, n);
							}),
							i
						);
					}),
					(thisLikeLodash.unary = function (t) {
						return Qe(t, 1);
					}),
					(thisLikeLodash.union = Ei),
					(thisLikeLodash.unionBy = Ti),
					(thisLikeLodash.unionWith = Ai),
					(thisLikeLodash.uniq = function (t) {
						return t && t.length ? bt(t) : [];
					}),
					(thisLikeLodash.uniqBy = function (t, e) {
						return t && t.length ? bt(t, ge(e, 2)) : [];
					}),
					(thisLikeLodash.uniqWith = function (t, e) {
						return (
							(e = "function" == typeof e ? e : Ss), t && t.length ? bt(t, Ss, e) : []
						);
					}),
					(thisLikeLodash.unset = function (t, e) {
						return null == t || wt(t, e);
					}),
					(thisLikeLodash.unzip = Ue),
					(thisLikeLodash.unzipWith = Ge),
					(thisLikeLodash.update = function (t, e, n) {
						return null == t ? t : _t(t, e, Et(n));
					}),
					(thisLikeLodash.updateWith = function (t, e, n, r) {
						return (
							(r = "function" == typeof r ? r : Ss),
							null == t ? t : _t(t, e, Et(n), r)
						);
					}),
					(thisLikeLodash.values = Tn),
					(thisLikeLodash.valuesIn = function (t) {
						return null == t ? [] : ps(t, On(t));
					}),
					(thisLikeLodash.without = Ii),
					(thisLikeLodash.words = jn),
					(thisLikeLodash.wrap = function (t, e) {
						return Ji(Et(e), t);
					}),
					(thisLikeLodash.xor = ji),
					(thisLikeLodash.xorBy = Pi),
					(thisLikeLodash.xorWith = Ni),
					(thisLikeLodash.zip = Di),
					(thisLikeLodash.zipObject = function (t, e) {
						return St(t || [], e || [], b);
					}),
					(thisLikeLodash.zipObjectDeep = function (t, e) {
						return St(t || [], e || [], lt);
					}),
					(thisLikeLodash.zipWith = Ri),
					(thisLikeLodash.entries = Ao),
					(thisLikeLodash.entriesIn = Io),
					(thisLikeLodash.extend = mo),
					(thisLikeLodash.extendWith = vo),
					Rn(thisLikeLodash, thisLikeLodash),
					(thisLikeLodash.add = Fr),
					(thisLikeLodash.attempt = Fo),
					(thisLikeLodash.camelCase = jo),
					(thisLikeLodash.capitalize = An),
					(thisLikeLodash.ceil = Jn),
					(thisLikeLodash.clamp = function (t, e, n) {
						return (
							n === Ss && ((n = e), (e = Ss)),
							n !== Ss && (n = (n = wn(n)) == n ? n : 0),
							e !== Ss && (e = (e = wn(e)) == e ? e : 0),
							x(wn(t), e, n)
						);
					}),
					(thisLikeLodash.clone = function (t) {
						return C(t, 4);
					}),
					(thisLikeLodash.cloneDeep = function (t) {
						return C(t, 5);
					}),
					(thisLikeLodash.cloneDeepWith = function (t, e) {
						return C(t, 5, (e = "function" == typeof e ? e : Ss));
					}),
					(thisLikeLodash.cloneWith = function (t, e) {
						return C(t, 4, (e = "function" == typeof e ? e : Ss));
					}),
					(thisLikeLodash.conformsTo = function (t, e) {
						return null == e || k(t, e, Sn(e));
					}),
					(thisLikeLodash.deburr = In),
					(thisLikeLodash.defaultTo = function (t, e) {
						return null == t || t != t ? e : t;
					}),
					(thisLikeLodash.divide = _r),
					(thisLikeLodash.endsWith = function (t, e, n) {
						(t = xn(t)), (e = yt(e));
						var r = t.length,
							r = (n = n === Ss ? r : x(yn(n), 0, r));
						return 0 <= (n -= e.length) && t.slice(n, r) == e;
					}),
					(thisLikeLodash.eq = nn),
					(thisLikeLodash.escape = function (t) {
						return (t = xn(t)) && fa.test(t) ? t.replace(la, ou) : t;
					}),
					(thisLikeLodash.escapeRegExp = function (t) {
						return (t = xn(t)) && _a.test(t) ? t.replace(wa, "\\$&") : t;
					}),
					(thisLikeLodash.every = function (t, e, n) {
						var r = io(t) ? $o : E;
						return n && Ce(t, e, n) && (e = Ss), r(t, ge(e, 3));
					}),
					(thisLikeLodash.find = Li),
					(thisLikeLodash.findIndex = We),
					(thisLikeLodash.findKey = function (t, e) {
						return ns(t, ge(e, 3), j);
					}),
					(thisLikeLodash.findLast = Fi),
					(thisLikeLodash.findLastIndex = Le),
					(thisLikeLodash.findLastKey = function (t, e) {
						return ns(t, ge(e, 3), P);
					}),
					(thisLikeLodash.floor = ii),
					(thisLikeLodash.forEach = Xe),
					(thisLikeLodash.forEachRight = Ye),
					(thisLikeLodash.forIn = function (t, e) {
						return null == t ? t : ei(t, ge(e, 3), On);
					}),
					(thisLikeLodash.forInRight = function (t, e) {
						return null == t ? t : ni(t, ge(e, 3), On);
					}),
					(thisLikeLodash.forOwn = function (t, e) {
						return t && j(t, ge(e, 3));
					}),
					(thisLikeLodash.forOwnRight = function (t, e) {
						return t && P(t, ge(e, 3));
					}),
					(thisLikeLodash.get = Cn),
					(thisLikeLodash.gt = eo),
					(thisLikeLodash.gte = no),
					(thisLikeLodash.has = function (t, e) {
						return null != t && be(t, e, L);
					}),
					(thisLikeLodash.hasIn = kn),
					(thisLikeLodash.head = He),
					(thisLikeLodash.identity = Nn),
					(thisLikeLodash.includes = function (t, e, n, r) {
						return (
							(t = rn(t) ? t : Tn(t)),
							(n = n && !r ? yn(n) : 0),
							(r = t.length),
							n < 0 && (n = Ar(r + n, 0)),
							dn(t) ? n <= r && -1 < t.indexOf(e, n) : !!r && -1 < is(t, e, n)
						);
					}),
					(thisLikeLodash.indexOf = function (t, e, n) {
						var r = null == t ? 0 : t.length;
						return r
							? ((n = null == n ? 0 : yn(n)) < 0 && (n = Ar(r + n, 0)), is(t, e, n))
							: -1;
					}),
					(thisLikeLodash.inRange = function (t, e, n) {
						return (
							(e = vn(e)),
							n === Ss ? ((n = e), (e = 0)) : (n = vn(n)),
							(t = t = wn(t)) >= Ir((e = e), (n = n)) && t < Ar(e, n)
						);
					}),
					(thisLikeLodash.invoke = ko),
					(thisLikeLodash.isArguments = ro),
					(thisLikeLodash.isArray = io),
					(thisLikeLodash.isArrayBuffer = oo),
					(thisLikeLodash.isArrayLike = rn),
					(thisLikeLodash.isArrayLikeObject = on),
					(thisLikeLodash.isBoolean = function (t) {
						return !0 === t || !1 === t || (hn(t) && M(t) == Rs);
					}),
					(thisLikeLodash.isBuffer = so),
					(thisLikeLodash.isDate = ao),
					(thisLikeLodash.isElement = function (t) {
						return hn(t) && 1 === t.nodeType && !pn(t);
					}),
					(thisLikeLodash.isEmpty = function (t) {
						if (null == t) return !0;
						if (
							rn(t) &&
							(io(t) ||
								"string" == typeof t ||
								"function" == typeof t.splice ||
								so(t) ||
								ho(t) ||
								ro(t))
						)
							return !t.length;
						var e,
							n = hi(t);
						if (n == Hs || n == Gs) return !t.size;
						if (Oe(t)) return !$(t).length;
						for (e in t) if (tr.call(t, e)) return !1;
						return !0;
					}),
					(thisLikeLodash.isEqual = function (t, e) {
						return z(t, e);
					}),
					(thisLikeLodash.isEqualWith = function (t, e, n) {
						var r = (n = "function" == typeof n ? n : Ss) ? n(t, e) : Ss;
						return r === Ss ? z(t, e, Ss, n) : !!r;
					}),
					(thisLikeLodash.isError = sn),
					(thisLikeLodash.isFinite = function (t) {
						return "number" == typeof t && Or(t);
					}),
					(thisLikeLodash.isFunction = an),
					(thisLikeLodash.isInteger = un),
					(thisLikeLodash.isLength = cn),
					(thisLikeLodash.isMap = uo),
					(thisLikeLodash.isMatch = function (t, e) {
						return t === e || U(t, e, ve(e));
					}),
					(thisLikeLodash.isMatchWith = function (t, e, n) {
						return (n = "function" == typeof n ? n : Ss), U(t, e, ve(e), n);
					}),
					(thisLikeLodash.isNaN = function (t) {
						return fn(t) && t != +t;
					}),
					(thisLikeLodash.isNative = function (t) {
						if (di(t))
							throw new qn(
								"Unsupported core-js use. Try https://npms.io/search?q=ponyfill."
							);
						return G(t);
					}),
					(thisLikeLodash.isNil = function (t) {
						return null == t;
					}),
					(thisLikeLodash.isNull = function (t) {
						return null === t;
					}),
					(thisLikeLodash.isNumber = fn),
					(thisLikeLodash.isObject = ln),
					(thisLikeLodash.isObjectLike = hn),
					(thisLikeLodash.isPlainObject = pn),
					(thisLikeLodash.isRegExp = co),
					(thisLikeLodash.isSafeInteger = function (t) {
						return un(t) && -As <= t && t <= As;
					}),
					(thisLikeLodash.isSet = lo),
					(thisLikeLodash.isString = dn),
					(thisLikeLodash.isSymbol = gn),
					(thisLikeLodash.isTypedArray = ho),
					(thisLikeLodash.isUndefined = function (t) {
						return t === Ss;
					}),
					(thisLikeLodash.isWeakMap = function (t) {
						return hn(t) && hi(t) == Xs;
					}),
					(thisLikeLodash.isWeakSet = function (t) {
						return hn(t) && "[object WeakSet]" == M(t);
					}),
					(thisLikeLodash.join = function (t, e) {
						return null == t ? "" : Er.call(t, e);
					}),
					(thisLikeLodash.kebabCase = Po),
					(thisLikeLodash.last = Be),
					(thisLikeLodash.lastIndexOf = function (t, e, n) {
						var r = null == t ? 0 : t.length;
						if (!r) return -1;
						var i = r;
						return (
							n !== Ss && (i = (i = yn(n)) < 0 ? Ar(r + i, 0) : Ir(i, r - 1)),
							e == e
								? (function (t, e, n) {
										for (var r = n + 1; r--; ) if (t[r] === e) return r;
										return r;
									})(t, e, i)
								: rs(t, ss, i, !0)
						);
					}),
					(thisLikeLodash.lowerCase = No),
					(thisLikeLodash.lowerFirst = Do),
					(thisLikeLodash.lt = fo),
					(thisLikeLodash.lte = po),
					(thisLikeLodash.max = function (t) {
						return t && t.length ? T(t, Nn, W) : Ss;
					}),
					(thisLikeLodash.maxBy = function (t, e) {
						return t && t.length ? T(t, ge(e, 2), W) : Ss;
					}),
					(thisLikeLodash.mean = function (t) {
						return as(t, Nn);
					}),
					(thisLikeLodash.meanBy = function (t, e) {
						return as(t, ge(e, 2));
					}),
					(thisLikeLodash.min = function (t) {
						return t && t.length ? T(t, Nn, Y) : Ss;
					}),
					(thisLikeLodash.minBy = function (t, e) {
						return t && t.length ? T(t, ge(e, 2), Y) : Ss;
					}),
					(thisLikeLodash.stubArray = Ln),
					(thisLikeLodash.stubFalse = Fn),
					(thisLikeLodash.stubObject = function () {
						return {};
					}),
					(thisLikeLodash.stubString = function () {
						return "";
					}),
					(thisLikeLodash.stubTrue = function () {
						return !0;
					}),
					(thisLikeLodash.multiply = wr),
					(thisLikeLodash.nth = function (t, e) {
						return t && t.length ? tt(t, yn(e)) : Ss;
					}),
					(thisLikeLodash.noConflict = function () {
						return Ka._ === this && (Ka._ = holdWinLodash), this;
					}),
					(thisLikeLodash.noop = Mn),
					(thisLikeLodash.now = Gi),
					(thisLikeLodash.pad = function (t, e, n) {
						t = xn(t);
						var r = (e = yn(e)) ? Cs(t) : 0;
						return !e || e <= r ? t : Jt(Cr((r = (e - r) / 2)), n) + t + Jt(xr(r), n);
					}),
					(thisLikeLodash.padEnd = function (t, e, n) {
						t = xn(t);
						var r = (e = yn(e)) ? Cs(t) : 0;
						return e && r < e ? t + Jt(e - r, n) : t;
					}),
					(thisLikeLodash.padStart = function (t, e, n) {
						t = xn(t);
						var r = (e = yn(e)) ? Cs(t) : 0;
						return e && r < e ? Jt(e - r, n) + t : t;
					}),
					(thisLikeLodash.parseInt = function (t, e, n) {
						return (
							(e = n || null == e ? 0 : e && +e), Pr(xn(t).replace(Ca, ""), e || 0)
						);
					}),
					(thisLikeLodash.random = function (t, e, n) {
						var r;
						if (
							(n && "boolean" != typeof n && Ce(t, e, n) && (e = n = Ss),
							n === Ss &&
								("boolean" == typeof e
									? ((n = e), (e = Ss))
									: "boolean" == typeof t && ((n = t), (t = Ss))),
							t === Ss && e === Ss
								? ((t = 0), (e = 1))
								: ((t = vn(t)), e === Ss ? ((e = t), (t = 0)) : (e = vn(e))),
							e < t && ((r = t), (t = e), (e = r)),
							n || t % 1 || e % 1)
						) {
							n = Nr();
							return Ir(t + n * (e - t + Xa("1e-" + ((n + "").length - 1))), e);
						}
						return ot(t, e);
					}),
					(thisLikeLodash.reduce = function (t, e, n) {
						var r = io(t) ? Zo : cs,
							i = arguments.length < 3;
						return r(t, ge(e, 4), n, i, Zr);
					}),
					(thisLikeLodash.reduceRight = function (t, e, n) {
						var r = io(t) ? ts : cs,
							i = arguments.length < 3;
						return r(t, ge(e, 4), n, i, ti);
					}),
					(thisLikeLodash.repeat = function (t, e, n) {
						return (e = (n ? Ce(t, e, n) : e === Ss) ? 1 : yn(e)), st(xn(t), e);
					}),
					(thisLikeLodash.replace = function () {
						var t = arguments,
							e = xn(t[0]);
						return t.length < 3 ? e : e.replace(t[1], t[2]);
					}),
					(thisLikeLodash.result = function (t, e, n) {
						var r = -1,
							i = (e = Tt(e, t)).length;
						for (i || ((i = 1), (t = Ss)); ++r < i; ) {
							var o = null == t ? Ss : t[De(e[r])];
							o === Ss && ((r = i), (o = n)), (t = an(o) ? o.call(t) : o);
						}
						return t;
					}),
					(thisLikeLodash.round = oi),
					(thisLikeLodash.runInContext = t),
					(thisLikeLodash.sample = function (t) {
						return (io(t) ? a : ut)(t);
					}),
					(thisLikeLodash.size = function (t) {
						if (null == t) return 0;
						if (rn(t)) return dn(t) ? Cs(t) : t.length;
						var e = hi(t);
						return e == Hs || e == Gs ? t.size : $(t).length;
					}),
					(thisLikeLodash.snakeCase = Ro),
					(thisLikeLodash.some = function (t, e, n) {
						var r = io(t) ? es : pt;
						return n && Ce(t, e, n) && (e = Ss), r(t, ge(e, 3));
					}),
					(thisLikeLodash.sortedIndex = function (t, e) {
						return dt(t, e);
					}),
					(thisLikeLodash.sortedIndexBy = function (t, e, n) {
						return gt(t, e, ge(n, 2));
					}),
					(thisLikeLodash.sortedIndexOf = function (t, e) {
						var n = null == t ? 0 : t.length;
						if (n) {
							var r = dt(t, e);
							if (r < n && nn(t[r], e)) return r;
						}
						return -1;
					}),
					(thisLikeLodash.sortedLastIndex = function (t, e) {
						return dt(t, e, !0);
					}),
					(thisLikeLodash.sortedLastIndexBy = function (t, e, n) {
						return gt(t, e, ge(n, 2), !0);
					}),
					(thisLikeLodash.sortedLastIndexOf = function (t, e) {
						if (null == t ? 0 : t.length) {
							var n = dt(t, e, !0) - 1;
							if (nn(t[n], e)) return n;
						}
						return -1;
					}),
					(thisLikeLodash.startCase = Mo),
					(thisLikeLodash.startsWith = function (t, e, n) {
						return (
							(t = xn(t)),
							(n = null == n ? 0 : x(yn(n), 0, t.length)),
							(e = yt(e)),
							t.slice(n, n + e.length) == e
						);
					}),
					(thisLikeLodash.subtract = Sr),
					(thisLikeLodash.sum = function (t) {
						return t && t.length ? ls(t, Nn) : 0;
					}),
					(thisLikeLodash.sumBy = function (t, e) {
						return t && t.length ? ls(t, ge(e, 2)) : 0;
					}),
					(thisLikeLodash.template = function (s, t, e) {
						var n = thisLikeLodash.templateSettings;
						e && Ce(s, t, e) && (t = Ss), (s = xn(s)), (t = vo({}, t, n, se));
						var a,
							u,
							r = Sn((n = vo({}, t.imports, n.imports, se))),
							i = ps(n, r),
							c = 0,
							n = t.interpolate || La,
							l = "__p += '",
							n = Vn(
								(t.escape || La).source +
									"|" +
									n.source +
									"|" +
									(n === ga ? Ia : La).source +
									"|" +
									(t.evaluate || La).source +
									"|$",
								"g"
							),
							o =
								"//# sourceURL=" +
								("sourceURL" in t
									? t.sourceURL
									: "lodash.templateSources[" + ++Ga + "]") +
								"\n";
						if (
							(s.replace(n, function (t, e, n, r, i, o) {
								return (
									(n = n || r),
									(l += s.slice(c, o).replace(Fa, vs)),
									e && ((a = !0), (l += "' +\n__e(" + e + ") +\n'")),
									i && ((u = !0), (l += "';\n" + i + ";\n__p += '")),
									n &&
										(l += "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"),
									(c = o + t.length),
									t
								);
							}),
							(l += "';\n"),
							(t = t.variable) || (l = "with (obj) {\n" + l + "\n}\n"),
							(l = (u ? l.replace(sa, "") : l).replace(aa, "$1").replace(ua, "$1;")),
							(l =
								"function(" +
								(t || "obj") +
								") {\n" +
								(t ? "" : "obj || (obj = {});\n") +
								"var __t, __p = ''" +
								(a ? ", __e = _.escape" : "") +
								(u
									? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
									: ";\n") +
								l +
								"return __p\n}"),
							((t = Fo(function () {
								return zn(r, o + "return " + l).apply(Ss, i);
							})).source = l),
							sn(t))
						)
							throw t;
						return t;
					}),
					(thisLikeLodash.times = function (t, e) {
						if ((t = yn(t)) < 1 || As < t) return [];
						var n = js,
							r = Ir(t, js);
						for (e = ge(e), t -= js, r = hs(r, e); ++n < t; ) e(n);
						return r;
					}),
					(thisLikeLodash.toFinite = vn),
					(thisLikeLodash.toInteger = yn),
					(thisLikeLodash.toLength = bn),
					(thisLikeLodash.toLower = function (t) {
						return xn(t).toLowerCase();
					}),
					(thisLikeLodash.toNumber = wn),
					(thisLikeLodash.toSafeInteger = function (t) {
						return t ? x(yn(t), -As, As) : 0 === t ? t : 0;
					}),
					(thisLikeLodash.toString = xn),
					(thisLikeLodash.toUpper = function (t) {
						return xn(t).toUpperCase();
					}),
					(thisLikeLodash.trim = function (t, e, n) {
						return (t = xn(t)) && (n || e === Ss)
							? t.replace(xa, "")
							: t && (e = yt(e))
								? ((t = ks(t)), (e = ks(e)), At(t, gs(t, e), ms(t, e) + 1).join(""))
								: t;
					}),
					(thisLikeLodash.trimEnd = function (t, e, n) {
						return (t = xn(t)) && (n || e === Ss)
							? t.replace(ka, "")
							: t && (e = yt(e))
								? At((t = ks(t)), 0, ms(t, ks(e)) + 1).join("")
								: t;
					}),
					(thisLikeLodash.trimStart = function (t, e, n) {
						return (t = xn(t)) && (n || e === Ss)
							? t.replace(Ca, "")
							: t && (e = yt(e))
								? At((t = ks(t)), gs(t, ks(e))).join("")
								: t;
					}),
					(thisLikeLodash.truncate = function (t, e) {
						var n,
							r = 30,
							i = "...";
						ln(e) &&
							((n = "separator" in e ? e.separator : n),
							(r = "length" in e ? yn(e.length) : r),
							(i = "omission" in e ? yt(e.omission) : i));
						var o,
							e = (t = xn(t)).length;
						if ((ys(t) && (e = (o = ks(t)).length), e <= r)) return t;
						if ((e = r - Cs(i)) < 1) return i;
						if (((r = o ? At(o, 0, e).join("") : t.slice(0, e)), n === Ss))
							return r + i;
						if ((o && (e += r.length - e), co(n))) {
							if (t.slice(e).search(n)) {
								var s,
									a = r;
								for (
									n.global || (n = Vn(n.source, xn(ja.exec(n)) + "g")),
										n.lastIndex = 0;
									(s = n.exec(a));

								)
									var u = s.index;
								r = r.slice(0, u === Ss ? e : u);
							}
						} else
							t.indexOf(yt(n), e) == e ||
								(-1 < (e = r.lastIndexOf(n)) && (r = r.slice(0, e)));
						return r + i;
					}),
					(thisLikeLodash.unescape = function (t) {
						return (t = xn(t)) && ha.test(t) ? t.replace(ca, su) : t;
					}),
					(thisLikeLodash.uniqueId = function (t) {
						var e = ++er;
						return xn(t) + e;
					}),
					(thisLikeLodash.upperCase = Wo),
					(thisLikeLodash.upperFirst = Lo),
					(thisLikeLodash.each = Xe),
					(thisLikeLodash.eachRight = Ye),
					(thisLikeLodash.first = He),
					Rn(
						thisLikeLodash,
						((Ki = {}),
						j(thisLikeLodash, function (t, e) {
							tr.call(thisLikeLodash.prototype, e) || (Ki[e] = t);
						}),
						Ki),
						{
							chain: !1
						}
					),
					(thisLikeLodash.VERSION = "4.17.4"),
					Go(
						["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"],
						function (t) {
							thisLikeLodash[t].placeholder = thisLikeLodash;
						}
					),
					Go(["drop", "take"], function (n, r) {
						(m.prototype[n] = function (t) {
							t = t === Ss ? 1 : Ar(yn(t), 0);
							var e = this.__filtered__ && !r ? new m(this) : this.clone();
							return (
								e.__filtered__
									? (e.__takeCount__ = Ir(t, e.__takeCount__))
									: e.__views__.push({
											size: Ir(t, js),
											type: n + (e.__dir__ < 0 ? "Right" : "")
										}),
								e
							);
						}),
							(m.prototype[n + "Right"] = function (t) {
								return this.reverse()[n](t).reverse();
							});
					}),
					Go(["filter", "map", "takeWhile"], function (t, e) {
						var n = e + 1,
							r = 1 == n || 3 == n;
						m.prototype[t] = function (t) {
							var e = this.clone();
							return (
								e.__iteratees__.push({
									iteratee: ge(t, 3),
									type: n
								}),
								(e.__filtered__ = e.__filtered__ || r),
								e
							);
						};
					}),
					Go(["head", "last"], function (t, e) {
						var n = "take" + (e ? "Right" : "");
						m.prototype[t] = function () {
							return this[n](1).value()[0];
						};
					}),
					Go(["initial", "tail"], function (t, e) {
						var n = "drop" + (e ? "" : "Right");
						m.prototype[t] = function () {
							return this.__filtered__ ? new m(this) : this[n](1);
						};
					}),
					(m.prototype.compact = function () {
						return this.filter(Nn);
					}),
					(m.prototype.find = function (t) {
						return this.filter(t).head();
					}),
					(m.prototype.findLast = function (t) {
						return this.reverse().find(t);
					}),
					(m.prototype.invokeMap = at(function (e, n) {
						return "function" == typeof e
							? new m(this)
							: this.map(function (t) {
									return B(t, e, n);
								});
					})),
					(m.prototype.reject = function (t) {
						return this.filter(en(ge(t)));
					}),
					(m.prototype.slice = function (t, e) {
						t = yn(t);
						var n = this;
						return n.__filtered__ && (0 < t || e < 0)
							? new m(n)
							: (t < 0 ? (n = n.takeRight(-t)) : t && (n = n.drop(t)),
								e !== Ss && (n = (e = yn(e)) < 0 ? n.dropRight(-e) : n.take(e - t)),
								n);
					}),
					(m.prototype.takeRightWhile = function (t) {
						return this.reverse().takeWhile(t).reverse();
					}),
					(m.prototype.toArray = function () {
						return this.take(js);
					}),
					j(m.prototype, function (c, t) {
						var l = /^(?:filter|find|map|reject)|While$/.test(t),
							h = /^(?:head|last)$/.test(t),
							f = thisLikeLodash[h ? "take" + ("last" == t ? "Right" : "") : t],
							p = h || /^find/.test(t);
						f &&
							(thisLikeLodash.prototype[t] = function () {
								function t(t) {
									return (
										(t = f.apply(thisLikeLodash, Jo([t], n))), h && s ? t[0] : t
									);
								}
								var e = this.__wrapped__,
									n = h ? [1] : arguments,
									r = e instanceof m,
									i = n[0],
									o = r || io(e);
								o && l && "function" == typeof i && 1 != i.length && (r = o = !1);
								var s = this.__chain__,
									a = !!this.__actions__.length,
									i = p && !s,
									a = r && !a;
								if (p || !o)
									return i && a
										? c.apply(this, n)
										: ((u = this.thru(t)),
											i ? (h ? u.value()[0] : u.value()) : u);
								e = a ? e : new m(this);
								var u = c.apply(e, n);
								return (
									u.__actions__.push({
										func: $e,
										args: [t],
										thisArg: Ss
									}),
									new g(u, s)
								);
							});
					}),
					Go(["pop", "push", "shift", "sort", "splice", "unshift"], function (t) {
						var n = Yn[t],
							r = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
							i = /^(?:pop|shift)$/.test(t);
						thisLikeLodash.prototype[t] = function () {
							var e = arguments;
							if (!i || this.__chain__)
								return this[r](function (t) {
									return n.apply(io(t) ? t : [], e);
								});
							var t = this.value();
							return n.apply(io(t) ? t : [], e);
						};
					}),
					j(m.prototype, function (t, e) {
						var n,
							r = thisLikeLodash[e];
						r &&
							((n = r.name + ""),
							(qr[n] || (qr[n] = [])).push({
								name: e,
								func: r
							}));
					}),
					(qr[Xt(Ss, 2).name] = [
						{
							name: "wrapper",
							func: Ss
						}
					]),
					(m.prototype.clone = function () {
						var t = new m(this.__wrapped__);
						return (
							(t.__actions__ = Mt(this.__actions__)),
							(t.__dir__ = this.__dir__),
							(t.__filtered__ = this.__filtered__),
							(t.__iteratees__ = Mt(this.__iteratees__)),
							(t.__takeCount__ = this.__takeCount__),
							(t.__views__ = Mt(this.__views__)),
							t
						);
					}),
					(m.prototype.reverse = function () {
						var t;
						return (
							this.__filtered__
								? (((t = new m(this)).__dir__ = -1), (t.__filtered__ = !0))
								: ((t = this.clone()).__dir__ *= -1),
							t
						);
					}),
					(m.prototype.value = function () {
						var t = this.__wrapped__.value(),
							e = this.__dir__,
							n = io(t),
							r = e < 0,
							i = n ? t.length : 0,
							o = (function (t, e, n) {
								for (var r = -1, i = n.length; ++r < i; ) {
									var o = n[r],
										s = o.size;
									switch (o.type) {
										case "drop":
											t += s;
											break;
										case "dropRight":
											e -= s;
											break;
										case "take":
											e = Ir(e, t + s);
											break;
										case "takeRight":
											t = Ar(t, e - s);
									}
								}
								return {
									start: t,
									end: e
								};
							})(0, i, this.__views__),
							s = o.start,
							a = (o = o.end) - s,
							u = r ? o : s - 1,
							c = this.__iteratees__,
							l = c.length,
							h = 0,
							f = Ir(a, this.__takeCount__);
						if (!n || (!r && i == a && f == a)) return Ct(t, this.__actions__);
						var p = [];
						t: for (; a-- && h < f; ) {
							for (var d = -1, g = t[(u += e)]; ++d < l; ) {
								var m = c[d],
									v = m.iteratee,
									m = m.type,
									v = v(g);
								if (2 == m) g = v;
								else if (!v) {
									if (1 == m) continue t;
									break t;
								}
							}
							p[h++] = g;
						}
						return p;
					}),
					(thisLikeLodash.prototype.at = Mi),
					(thisLikeLodash.prototype.chain = function () {
						return Ve(this);
					}),
					(thisLikeLodash.prototype.commit = function () {
						return new g(this.value(), this.__chain__);
					}),
					(thisLikeLodash.prototype.next = function () {
						this.__values__ === Ss && (this.__values__ = mn(this.value()));
						var t = this.__index__ >= this.__values__.length;
						return {
							done: t,
							value: t ? Ss : this.__values__[this.__index__++]
						};
					}),
					(thisLikeLodash.prototype.plant = function (t) {
						for (var e, n = this; n instanceof o; ) {
							var r = Me(n);
							(r.__index__ = 0),
								(r.__values__ = Ss),
								e ? (i.__wrapped__ = r) : (e = r);
							var i = r,
								n = n.__wrapped__;
						}
						return (i.__wrapped__ = t), e;
					}),
					(thisLikeLodash.prototype.reverse = function () {
						var t = this.__wrapped__;
						if (t instanceof m) {
							t = t;
							return (
								this.__actions__.length && (t = new m(this)),
								(t = t.reverse()).__actions__.push({
									func: $e,
									args: [ze],
									thisArg: Ss
								}),
								new g(t, this.__chain__)
							);
						}
						return this.thru(ze);
					}),
					(thisLikeLodash.prototype.toJSON =
						thisLikeLodash.prototype.valueOf =
						thisLikeLodash.prototype.value =
							function () {
								return Ct(this.__wrapped__, this.__actions__);
							}),
					(thisLikeLodash.prototype.first = thisLikeLodash.prototype.head),
					mr &&
						(thisLikeLodash.prototype[mr] = function () {
							return this;
						}),
					thisLikeLodash
				);
			})();
		"function" == typeof define && "object" == typeof define.amd && define.amd
			? ((Ka._ = au),
				define(function () {
					return au;
				}))
			: n
				? (((n.exports = au)._ = au), (s._ = au))
				: (Ka._ = au);
	}.call(this),
	(function (t, e) {
		"object" == typeof exports
			? (module.exports = e())
			: "function" == typeof define && define.amd
				? define(e)
				: (t.jStat = e());
	})(this, function () {
		var p,
			d,
			_,
			x,
			m,
			g,
			a,
			u,
			i,
			e,
			c,
			l,
			h,
			s,
			n,
			f = (function (a, u) {
				var e = Array.prototype.concat,
					t = Array.prototype.slice,
					n = Object.prototype.toString;
				function c(t, e) {
					e = e < t ? t : e;
					return a.pow(10, 17 - ~~(a.log(0 < e ? e : -e) * a.LOG10E));
				}
				var l =
					Array.isArray ||
					function (t) {
						return "[object Array]" === n.call(t);
					};
				function h(t) {
					return "[object Function]" === n.call(t);
				}
				function f(t) {
					return "number" == typeof t && t - t == 0;
				}
				function p() {
					return new p._init(arguments);
				}
				function r() {
					return 0;
				}
				function i() {
					return 1;
				}
				function o(t, e) {
					return t === e ? 1 : 0;
				}
				function s(t, e, n, r) {
					var i,
						o = [],
						s = t.length;
					if (e === u && n === u && r === u) return p.copy(t);
					if (
						((r = r || 1),
						(e = 0 <= (e = e || 0) ? e : s + e) ===
							(n = 0 <= (n = n || t.length) ? n : s + n) || 0 === r)
					)
						return [];
					if (e < n && r < 0) return [];
					if (n < e && 0 < r) return [];
					if (0 < r) for (i = e; i < n; i += r) o.push(t[i]);
					else for (i = e; n < i; i += r) o.push(t[i]);
					return o;
				}
				(p.fn = p.prototype),
					(p._init = function (t) {
						if (l(t[0]))
							if (l(t[0][0])) {
								h(t[1]) && (t[0] = p.map(t[0], t[1]));
								for (var e = 0; e < t[0].length; e++) this[e] = t[0][e];
								this.length = t[0].length;
							} else
								(this[0] = h(t[1]) ? p.map(t[0], t[1]) : t[0]), (this.length = 1);
						else if (f(t[0])) (this[0] = p.seq.apply(null, t)), (this.length = 1);
						else {
							if (t[0] instanceof p) return p(t[0].toArray());
							(this[0] = []), (this.length = 1);
						}
						return this;
					}),
					(p._init.prototype = p.prototype),
					((p._init.constructor = p).utils = {
						calcRdx: c,
						isArray: l,
						isFunction: h,
						isNumber: f,
						toVector: function (t) {
							return e.apply([], t);
						}
					}),
					(p._random_fn = a.random),
					(p.setRandom = function (t) {
						if ("function" != typeof t) throw new TypeError("fn is not a function");
						p._random_fn = t;
					}),
					(p.extend = function (t) {
						var e, n;
						if (1 === arguments.length) {
							for (n in t) p[n] = t[n];
							return this;
						}
						for (e = 1; e < arguments.length; e++)
							for (n in arguments[e]) t[n] = arguments[e][n];
						return t;
					}),
					(p.rows = function (t) {
						return t.length || 1;
					}),
					(p.cols = function (t) {
						return t[0].length || 1;
					}),
					(p.dimensions = function (t) {
						return {
							rows: p.rows(t),
							cols: p.cols(t)
						};
					}),
					(p.row = function (e, t) {
						return l(t)
							? t.map(function (t) {
									return p.row(e, t);
								})
							: e[t];
					}),
					(p.rowa = function (t, e) {
						return p.row(t, e);
					}),
					(p.col = function (r, t) {
						if (l(t)) {
							var i = p.arange(r.length).map(function () {
								return new Array(t.length);
							});
							return (
								t.forEach(function (e, n) {
									p.arange(r.length).forEach(function (t) {
										i[t][n] = r[t][e];
									});
								}),
								i
							);
						}
						for (var e = new Array(r.length), n = 0; n < r.length; n++)
							e[n] = [r[n][t]];
						return e;
					}),
					(p.cola = function (t, e) {
						return p.col(t, e).map(function (t) {
							return t[0];
						});
					}),
					(p.diag = function (t) {
						for (var e = p.rows(t), n = new Array(e), r = 0; r < e; r++)
							n[r] = [t[r][r]];
						return n;
					}),
					(p.antidiag = function (t) {
						for (var e = p.rows(t) - 1, n = new Array(e), r = 0; 0 <= e; e--, r++)
							n[r] = [t[r][e]];
						return n;
					}),
					(p.transpose = function (t) {
						var e,
							n,
							r,
							i,
							o,
							s = [];
						for (
							l(t[0]) || (t = [t]), n = t.length, r = t[0].length, o = 0;
							o < r;
							o++
						) {
							for (e = new Array(n), i = 0; i < n; i++) e[i] = t[i][o];
							s.push(e);
						}
						return 1 === s.length ? s[0] : s;
					}),
					(p.map = function (t, e, n) {
						var r, i, o, s, a;
						for (
							l(t[0]) || (t = [t]),
								i = t.length,
								o = t[0].length,
								s = n ? t : new Array(i),
								r = 0;
							r < i;
							r++
						)
							for (s[r] || (s[r] = new Array(o)), a = 0; a < o; a++)
								s[r][a] = e(t[r][a], r, a);
						return 1 === s.length ? s[0] : s;
					}),
					(p.cumreduce = function (t, e, n) {
						var r, i, o, s, a;
						for (
							l(t[0]) || (t = [t]),
								i = t.length,
								o = t[0].length,
								s = n ? t : new Array(i),
								r = 0;
							r < i;
							r++
						)
							for (
								s[r] || (s[r] = new Array(o)), 0 < o && (s[r][0] = t[r][0]), a = 1;
								a < o;
								a++
							)
								s[r][a] = e(s[r][a - 1], t[r][a]);
						return 1 === s.length ? s[0] : s;
					}),
					(p.alter = function (t, e) {
						return p.map(t, e, !0);
					}),
					(p.create = function (t, e, n) {
						var r,
							i,
							o = new Array(t);
						for (h(e) && ((n = e), (e = t)), r = 0; r < t; r++)
							for (o[r] = new Array(e), i = 0; i < e; i++) o[r][i] = n(r, i);
						return o;
					}),
					(p.zeros = function (t, e) {
						return f(e) || (e = t), p.create(t, e, r);
					}),
					(p.ones = function (t, e) {
						return f(e) || (e = t), p.create(t, e, i);
					}),
					(p.rand = function (t, e) {
						return f(e) || (e = t), p.create(t, e, p._random_fn);
					}),
					(p.identity = function (t, e) {
						return f(e) || (e = t), p.create(t, e, o);
					}),
					(p.symmetric = function (t) {
						var e,
							n,
							r = t.length;
						if (t.length !== t[0].length) return !1;
						for (e = 0; e < r; e++)
							for (n = 0; n < r; n++) if (t[n][e] !== t[e][n]) return !1;
						return !0;
					}),
					(p.clear = function (t) {
						return p.alter(t, r);
					}),
					(p.seq = function (t, e, n, r) {
						h(r) || (r = !1);
						for (
							var i = [],
								o = c(t, e),
								s = (e * o - t * o) / ((n - 1) * o),
								a = t,
								u = 0;
							a <= e && u < n;
							a = (t * o + s * o * ++u) / o
						)
							i.push(r ? r(a, u) : a);
						return i;
					}),
					(p.arange = function (t, e, n) {
						var r,
							i = [];
						if (((n = n || 1), e === u && ((e = t), (t = 0)), t === e || 0 === n))
							return [];
						if (t < e && n < 0) return [];
						if (e < t && 0 < n) return [];
						if (0 < n) for (r = t; r < e; r += n) i.push(r);
						else for (r = t; e < r; r += n) i.push(r);
						return i;
					}),
					(p.slice = function (t, e) {
						var n, r;
						return f((e = e || {}).row)
							? f(e.col)
								? t[e.row][e.col]
								: s(p.rowa(t, e.row), (n = e.col || {}).start, n.end, n.step)
							: f(e.col)
								? s(p.cola(t, e.col), (r = e.row || {}).start, r.end, r.step)
								: ((r = e.row || {}),
									(n = e.col || {}),
									s(t, r.start, r.end, r.step).map(function (t) {
										return s(t, n.start, n.end, n.step);
									}));
					}),
					(p.sliceAssign = function (i, t, o) {
						var e, n;
						if (f(t.row)) {
							if (f(t.col)) return (i[t.row][t.col] = o);
							(t.col = t.col || {}),
								(t.col.start = t.col.start || 0),
								(t.col.end = t.col.end || i[0].length),
								(t.col.step = t.col.step || 1),
								(e = p.arange(t.col.start, a.min(i.length, t.col.end), t.col.step));
							var r = t.row;
							return (
								e.forEach(function (t, e) {
									i[r][t] = o[e];
								}),
								i
							);
						}
						if (f(t.col)) {
							(t.row = t.row || {}),
								(t.row.start = t.row.start || 0),
								(t.row.end = t.row.end || i.length),
								(t.row.step = t.row.step || 1),
								(n = p.arange(
									t.row.start,
									a.min(i[0].length, t.row.end),
									t.row.step
								));
							var s = t.col;
							return (
								n.forEach(function (t, e) {
									i[t][s] = o[e];
								}),
								i
							);
						}
						return (
							o[0].length === u && (o = [o]),
							(t.row.start = t.row.start || 0),
							(t.row.end = t.row.end || i.length),
							(t.row.step = t.row.step || 1),
							(t.col.start = t.col.start || 0),
							(t.col.end = t.col.end || i[0].length),
							(t.col.step = t.col.step || 1),
							(n = p.arange(t.row.start, a.min(i.length, t.row.end), t.row.step)),
							(e = p.arange(t.col.start, a.min(i[0].length, t.col.end), t.col.step)),
							n.forEach(function (n, r) {
								e.forEach(function (t, e) {
									i[n][t] = o[r][e];
								});
							}),
							i
						);
					}),
					(p.diagonal = function (t) {
						var n = p.zeros(t.length, t.length);
						return (
							t.forEach(function (t, e) {
								n[e][e] = t;
							}),
							n
						);
					}),
					(p.copy = function (t) {
						return t.map(function (t) {
							return f(t)
								? t
								: t.map(function (t) {
										return t;
									});
						});
					});
				var d = p.prototype;
				return (
					(d.length = 0),
					(d.push = Array.prototype.push),
					(d.sort = Array.prototype.sort),
					(d.splice = Array.prototype.splice),
					(d.slice = Array.prototype.slice),
					(d.toArray = function () {
						return 1 < this.length ? t.call(this) : t.call(this)[0];
					}),
					(d.map = function (t, e) {
						return p(p.map(this, t, e));
					}),
					(d.cumreduce = function (t, e) {
						return p(p.cumreduce(this, t, e));
					}),
					(d.alter = function (t) {
						return p.alter(this, t), this;
					}),
					(function (t) {
						for (var e = 0; e < t.length; e++)
							!(function (r) {
								d[r] = function (t) {
									var e,
										n = this;
									return t
										? (setTimeout(function () {
												t.call(n, d[r].call(n));
											}),
											this)
										: ((e = p[r](this)), l(e) ? p(e) : e);
								};
							})(t[e]);
					})("transpose clear symmetric rows cols dimensions diag antidiag".split(" ")),
					(function (t) {
						for (var e = 0; e < t.length; e++)
							!(function (r) {
								d[r] = function (t, e) {
									var n = this;
									return e
										? (setTimeout(function () {
												e.call(n, d[r].call(n, t));
											}),
											this)
										: p(p[r](this, t));
								};
							})(t[e]);
					})("row col".split(" ")),
					(function (t) {
						for (var e = 0; e < t.length; e++)
							!(function (t) {
								d[t] = function () {
									return p(p[t].apply(null, arguments));
								};
							})(t[e]);
					})("create zeros ones rand identity".split(" ")),
					p
				);
			})(Math);
		function o(t, e, n, r) {
			for (var i, o = 0, s = 1, a = 1, u = 1, c = 0, l = 0; x.abs((a - l) / a) > r; )
				(s = u + (i = (-(e + c) * (e + n + c) * t) / (e + 2 * c) / (e + 2 * c + 1)) * s),
					(a =
						(o = (l = a) + i * o) +
						(i = ((c += 1) * (n - c) * t) / (e + 2 * c - 1) / (e + 2 * c)) * a),
					(o /= u = s + i * u),
					(s /= u),
					(a /= u),
					(u = 1);
			return a / e;
		}
		function v(t, e, n) {
			var r = [
					0.9815606342467192, 0.9041172563704749, 0.7699026741943047, 0.5873179542866175,
					0.3678314989981802, 0.1252334085114689
				],
				i = [
					0.04717533638651183, 0.10693932599531843, 0.16007832854334622,
					0.20316742672306592, 0.2334925365383548, 0.24914704581340277
				],
				o = 0.5 * t;
			if (8 <= o) return 1;
			for (
				var s =
						(s = 2 * _.normal.cdf(o, 0, 1, 1, 0) - 1) >= x.exp(-50 / n)
							? x.pow(s, n)
							: 0,
					a = 3 < t ? 2 : 3,
					u = o,
					c = (8 - o) / a,
					l = u + c,
					h = 0,
					f = n - 1,
					p = 1;
				p <= a;
				p++
			) {
				for (var d = 0, g = 0.5 * (l + u), m = 0.5 * (l - u), v = 1; v <= 12; v++) {
					var y,
						b = 6 < v ? r[(y = 12 - v + 1) - 1] : -r[(y = v) - 1],
						w = g + m * b,
						b = w * w;
					if (60 < b) break;
					w =
						0.5 * (2 * _.normal.cdf(w, 0, 1, 1, 0)) -
						0.5 * (2 * _.normal.cdf(w, t, 1, 1, 0));
					w >= x.exp(-30 / f) && (d += i[y - 1] * x.exp(-0.5 * b) * x.pow(w, f));
				}
				(h += d *= (2 * m * n) / x.sqrt(2 * x.PI)), (u = l), (l += c);
			}
			return (s += h) <= x.exp(-30 / e) ? 0 : 1 <= (s = x.pow(s, e)) ? 1 : s;
		}
		function y(t) {
			return e(t) || t instanceof m;
		}
		function b(t, e, n, r) {
			if (1 < t || 1 < n || t <= 0 || n <= 0)
				throw new Error("Proportions should be greater than 0 and less than 1");
			var i = (t * e + n * r) / (e + r);
			return (t - n) / l.sqrt(i * (1 - i) * (1 / e + 1 / r));
		}
		function w(t, e) {
			var n = t.length,
				r = e[0].length - 1,
				i = n - r - 1,
				o = f.lstsq(e, t),
				s = f
					.multiply(
						e,
						o.map(function (t) {
							return [t];
						})
					)
					.map(function (t) {
						return t[0];
					}),
				a = f.subtract(t, s),
				u = f.mean(t),
				c = f.sum(
					s.map(function (t) {
						return Math.pow(t - u, 2);
					})
				),
				l = f.sum(
					t.map(function (t, e) {
						return Math.pow(t - s[e], 2);
					})
				),
				h = c + l;
			return {
				exog: e,
				endog: t,
				nobs: n,
				df_model: r,
				df_resid: i,
				coef: o,
				predict: s,
				resid: a,
				ybar: u,
				SST: h,
				SSE: c,
				SSR: l,
				R2: c / h
			};
		}
		function C(e) {
			var n,
				r,
				t =
					((n = e.exog),
					(r = n[0].length),
					f.arange(r).map(function (e) {
						var t = f.arange(r).filter(function (t) {
							return t !== e;
						});
						return w(
							f.col(n, e).map(function (t) {
								return t[0];
							}),
							f.col(n, t)
						);
					})),
				i = Math.sqrt(e.SSR / e.df_resid),
				o = t.map(function (t) {
					var e = t.SST,
						t = t.R2;
					return i / Math.sqrt(e * (1 - t));
				}),
				s = e.coef.map(function (t, e) {
					return +t / o[e];
				}),
				a = s.map(function (t) {
					t = f.studentt.cdf(t, e.df_resid);
					return 2 * (0.5 < t ? 1 - t : t);
				}),
				u = f.studentt.inv(0.975, e.df_resid),
				t = e.coef.map(function (t, e) {
					e = u * o[e];
					return [t - e, t + e];
				});
			return {
				se: o,
				t: s,
				p: a,
				sigmaHat: i,
				interval95: t
			};
		}
		return (
			(function (u, l) {
				var c = u.utils.isFunction;
				function h(t, e) {
					return t - e;
				}
				function f(t, e, n) {
					return l.max(e, l.min(t, n));
				}
				(u.sum = function (t) {
					for (var e = 0, n = t.length; 0 <= --n; ) e += t[n];
					return e;
				}),
					(u.sumsqrd = function (t) {
						for (var e = 0, n = t.length; 0 <= --n; ) e += t[n] * t[n];
						return e;
					}),
					(u.sumsqerr = function (t) {
						for (var e, n = u.mean(t), r = 0, i = t.length; 0 <= --i; )
							r += (e = t[i] - n) * e;
						return r;
					}),
					(u.sumrow = function (t) {
						for (var e = 0, n = t.length; 0 <= --n; ) e += t[n];
						return e;
					}),
					(u.product = function (t) {
						for (var e = 1, n = t.length; 0 <= --n; ) e *= t[n];
						return e;
					}),
					(u.min = function (t) {
						for (var e = t[0], n = 0; ++n < t.length; ) t[n] < e && (e = t[n]);
						return e;
					}),
					(u.max = function (t) {
						for (var e = t[0], n = 0; ++n < t.length; ) t[n] > e && (e = t[n]);
						return e;
					}),
					(u.unique = function (t) {
						for (var e = {}, n = [], r = 0; r < t.length; r++)
							e[t[r]] || ((e[t[r]] = !0), n.push(t[r]));
						return n;
					}),
					(u.mean = function (t) {
						return u.sum(t) / t.length;
					}),
					(u.meansqerr = function (t) {
						return u.sumsqerr(t) / t.length;
					}),
					(u.geomean = function (t) {
						return l.pow(u.product(t), 1 / t.length);
					}),
					(u.median = function (t) {
						var e = t.length,
							t = t.slice().sort(h);
						return 1 & e ? t[(e / 2) | 0] : (t[e / 2 - 1] + t[e / 2]) / 2;
					}),
					(u.cumsum = function (t) {
						return u.cumreduce(t, function (t, e) {
							return t + e;
						});
					}),
					(u.cumprod = function (t) {
						return u.cumreduce(t, function (t, e) {
							return t * e;
						});
					}),
					(u.diff = function (t) {
						for (var e = [], n = t.length, r = 1; r < n; r++) e.push(t[r] - t[r - 1]);
						return e;
					}),
					(u.rank = function (t) {
						for (var e = [], n = {}, r = 0; r < t.length; r++)
							n[(a = t[r])] ? n[a]++ : ((n[a] = 1), e.push(a));
						var i = e.sort(h),
							o = {},
							s = 1;
						for (r = 0; r < i.length; r++) {
							var a,
								u = n[(a = i[r])],
								c = (s + (s + u - 1)) / 2;
							(o[a] = c), (s += u);
						}
						return t.map(function (t) {
							return o[t];
						});
					}),
					(u.mode = function (t) {
						for (
							var e = t.length,
								n = t.slice().sort(h),
								r = 1,
								i = 0,
								o = 0,
								s = [],
								a = 0;
							a < e;
							a++
						)
							n[a] === n[a + 1]
								? r++
								: (i < r
										? ((s = [n[a]]), (i = r), (o = 0))
										: r === i && (s.push(n[a]), o++),
									(r = 1));
						return 0 === o ? s[0] : s;
					}),
					(u.range = function (t) {
						return u.max(t) - u.min(t);
					}),
					(u.variance = function (t, e) {
						return u.sumsqerr(t) / (t.length - (e ? 1 : 0));
					}),
					(u.pooledvariance = function (t) {
						return (
							t.reduce(function (t, e) {
								return t + u.sumsqerr(e);
							}, 0) /
							(t.reduce(function (t, e) {
								return t + e.length;
							}, 0) -
								t.length)
						);
					}),
					(u.deviation = function (t) {
						for (var e = u.mean(t), n = t.length, r = new Array(n), i = 0; i < n; i++)
							r[i] = t[i] - e;
						return r;
					}),
					(u.stdev = function (t, e) {
						return l.sqrt(u.variance(t, e));
					}),
					(u.pooledstdev = function (t) {
						return l.sqrt(u.pooledvariance(t));
					}),
					(u.meandev = function (t) {
						for (var e = u.mean(t), n = [], r = t.length - 1; 0 <= r; r--)
							n.push(l.abs(t[r] - e));
						return u.mean(n);
					}),
					(u.meddev = function (t) {
						for (var e = u.median(t), n = [], r = t.length - 1; 0 <= r; r--)
							n.push(l.abs(t[r] - e));
						return u.median(n);
					}),
					(u.coeffvar = function (t) {
						return u.stdev(t) / u.mean(t);
					}),
					(u.quartiles = function (t) {
						var e = t.length,
							t = t.slice().sort(h);
						return [
							t[l.round(e / 4) - 1],
							t[l.round(e / 2) - 1],
							t[l.round((3 * e) / 4) - 1]
						];
					}),
					(u.quantiles = function (t, e, n, r) {
						var i,
							o,
							s,
							a = t.slice().sort(h),
							u = [e.length],
							c = t.length;
						for (
							void 0 === n && (n = 3 / 8), void 0 === r && (r = 3 / 8), i = 0;
							i < e.length;
							i++
						)
							(s = c * (o = e[i]) + (n + o * (1 - n - r))),
								(o = l.floor(f(s, 1, c - 1))),
								(s = f(s - o, 0, 1)),
								(u[i] = (1 - s) * a[o - 1] + s * a[o]);
						return u;
					}),
					(u.percentile = function (t, e, n) {
						(t = t.slice().sort(h)),
							(e = e * (t.length + (n ? 1 : -1)) + (n ? 0 : 1)),
							(n = parseInt(e)),
							(e -= n);
						return n + 1 < t.length ? t[n - 1] + e * (t[n] - t[n - 1]) : t[n - 1];
					}),
					(u.percentileOfScore = function (t, e, n) {
						for (
							var r, i = 0, o = t.length, s = "strict" === n ? !0 : !1, a = 0;
							a < o;
							a++
						)
							(r = t[a]), ((s && r < e) || (!s && r <= e)) && i++;
						return i / o;
					}),
					(u.histogram = function (t, e) {
						e = e || 4;
						for (
							var n = u.min(t), r = (u.max(t) - n) / e, i = t.length, o = [], s = 0;
							s < e;
							s++
						)
							o[s] = 0;
						for (s = 0; s < i; s++) o[l.min(l.floor((t[s] - n) / r), e - 1)] += 1;
						return o;
					}),
					(u.covariance = function (t, e) {
						for (
							var n = u.mean(t), r = u.mean(e), i = t.length, o = new Array(i), s = 0;
							s < i;
							s++
						)
							o[s] = (t[s] - n) * (e[s] - r);
						return u.sum(o) / (i - 1);
					}),
					(u.corrcoeff = function (t, e) {
						return u.covariance(t, e) / u.stdev(t, 1) / u.stdev(e, 1);
					}),
					(u.spearmancoeff = function (t, e) {
						return (t = u.rank(t)), (e = u.rank(e)), u.corrcoeff(t, e);
					}),
					(u.stanMoment = function (t, e) {
						for (
							var n = u.mean(t), r = u.stdev(t), i = t.length, o = 0, s = 0;
							s < i;
							s++
						)
							o += l.pow((t[s] - n) / r, e);
						return o / t.length;
					}),
					(u.skewness = function (t) {
						return u.stanMoment(t, 3);
					}),
					(u.kurtosis = function (t) {
						return u.stanMoment(t, 4) - 3;
					});
				var p = u.prototype;
				!(function (t) {
					for (var e = 0; e < t.length; e++)
						!(function (o) {
							p[o] = function (t, e) {
								var n = [],
									r = 0,
									i = this;
								if ((c(t) && ((e = t), (t = !1)), e))
									return (
										setTimeout(function () {
											e.call(i, p[o].call(i, t));
										}),
										this
									);
								if (1 < this.length) {
									for (i = !0 === t ? this : this.transpose(); r < i.length; r++)
										n[r] = u[o](i[r]);
									return n;
								}
								return u[o](this[0], t);
							};
						})(t[e]);
				})("cumsum cumprod".split(" ")),
					(function (t) {
						for (var e = 0; e < t.length; e++)
							!(function (o) {
								p[o] = function (t, e) {
									var n = [],
										r = 0,
										i = this;
									if ((c(t) && ((e = t), (t = !1)), e))
										return (
											setTimeout(function () {
												e.call(i, p[o].call(i, t));
											}),
											this
										);
									if (1 < this.length) {
										for (
											"sumrow" !== o &&
											(i = !0 === t ? this : this.transpose());
											r < i.length;
											r++
										)
											n[r] = u[o](i[r]);
										return !0 === t ? u[o](u.utils.toVector(n)) : n;
									}
									return u[o](this[0], t);
								};
							})(t[e]);
					})(
						"sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr geomean median diff rank mode range variance deviation stdev meandev meddev coeffvar quartiles histogram skewness kurtosis".split(
							" "
						)
					),
					(function (t) {
						for (var e = 0; e < t.length; e++)
							!(function (a) {
								p[a] = function () {
									var t,
										e = [],
										n = 0,
										r = this,
										i = Array.prototype.slice.call(arguments);
									if (c(i[i.length - 1])) {
										t = i[i.length - 1];
										var o = i.slice(0, i.length - 1);
										return (
											setTimeout(function () {
												t.call(r, p[a].apply(r, o));
											}),
											this
										);
									}
									t = void 0;
									var s = function (t) {
										return u[a].apply(r, [t].concat(i));
									};
									if (1 < this.length) {
										for (r = r.transpose(); n < r.length; n++) e[n] = s(r[n]);
										return e;
									}
									return s(this[0]);
								};
							})(t[e]);
					})("quantiles percentileOfScore".split(" "));
			})(f, Math),
			(p = f),
			(d = Math),
			(p.gammaln = function (t) {
				var e,
					n,
					r = 0,
					i = [
						76.18009172947146, -86.50532032941678, 24.01409824083091,
						-1.231739572450155, 0.001208650973866179, -5395239384953e-18
					],
					o = 1.000000000190015,
					t = (n = e = t) + 5.5;
				for (t -= (e + 0.5) * d.log(t); r < 6; r++) o += i[r] / ++n;
				return d.log((2.5066282746310007 * o) / e) - t;
			}),
			(p.loggam = function (t) {
				var e,
					n,
					r,
					i,
					o,
					s = [
						0.08333333333333333, -0.002777777777777778, 0.0007936507936507937,
						-0.0005952380952380952, 0.0008417508417508418, -0.001917526917526918,
						0.00641025641025641, -0.02955065359477124, 0.1796443723688307,
						-1.3924322169059
					],
					a = t,
					u = 0;
				if (1 == t || 2 == t) return 0;
				for (
					t <= 7 && (a = t + (u = d.floor(7 - t))),
						e = 1 / (a * a),
						n = 2 * d.PI,
						i = s[9],
						o = 8;
					0 <= o;
					o--
				)
					(i *= e), (i += s[o]);
				if (((r = i / a + 0.5 * d.log(n) + (a - 0.5) * d.log(a) - a), t <= 7))
					for (o = 1; o <= u; o++) (r -= d.log(a - 1)), --a;
				return r;
			}),
			(p.gammafn = function (t) {
				var e,
					n,
					r,
					i = [
						-1.716185138865495, 24.76565080557592, -379.80425647094563,
						629.3311553128184, 866.9662027904133, -31451.272968848367,
						-36144.413418691176, 66456.14382024054
					],
					o = [
						-30.8402300119739, 315.35062697960416, -1015.1563674902192,
						-3107.771671572311, 22538.11842098015, 4755.846277527881,
						-134659.9598649693, -115132.2596755535
					],
					s = !1,
					a = 0,
					u = 0,
					c = 0,
					l = t;
				if (171.6243769536076 < t) return 1 / 0;
				if (l <= 0) {
					if (!(r = (l % 1) + 36e-17)) return 1 / 0;
					(s = ((1 & l ? -1 : 1) * d.PI) / d.sin(d.PI * r)), (l = 1 - l);
				}
				for (n = (t = l) < 1 ? l++ : (l -= a = (0 | l) - 1) - 1, e = 0; e < 8; ++e)
					(c = (c + i[e]) * n), (u = u * n + o[e]);
				if (((r = c / u + 1), t < l)) r /= t;
				else if (l < t) for (e = 0; e < a; ++e) (r *= l), l++;
				return s && (r = s / r), r;
			}),
			(p.gammap = function (t, e) {
				return p.lowRegGamma(t, e) * p.gammafn(t);
			}),
			(p.lowRegGamma = function (t, e) {
				var n,
					r = p.gammaln(t),
					i = t,
					o = 1 / t,
					s = o,
					a = e + 1 - t,
					u = 1 / 1e-30,
					c = 1 / a,
					l = c,
					h = 1,
					f = -~(8.5 * d.log(1 <= t ? t : 1 / t) + 0.4 * t + 17);
				if (e < 0 || t <= 0) return NaN;
				if (e < t + 1) {
					for (; h <= f; h++) o += s *= e / ++i;
					return o * d.exp(-e + t * d.log(e) - r);
				}
				for (; h <= f; h++)
					l *= (c = 1 / (c = (n = -h * (h - t)) * c + (a += 2))) * (u = a + n / u);
				return 1 - l * d.exp(-e + t * d.log(e) - r);
			}),
			(p.factorialln = function (t) {
				return t < 0 ? NaN : p.gammaln(t + 1);
			}),
			(p.factorial = function (t) {
				return t < 0 ? NaN : p.gammafn(t + 1);
			}),
			(p.combination = function (t, e) {
				return 170 < t || 170 < e
					? d.exp(p.combinationln(t, e))
					: p.factorial(t) / p.factorial(e) / p.factorial(t - e);
			}),
			(p.combinationln = function (t, e) {
				return p.factorialln(t) - p.factorialln(e) - p.factorialln(t - e);
			}),
			(p.permutation = function (t, e) {
				return p.factorial(t) / p.factorial(t - e);
			}),
			(p.betafn = function (t, e) {
				if (!(t <= 0 || e <= 0))
					return 170 < t + e
						? d.exp(p.betaln(t, e))
						: (p.gammafn(t) * p.gammafn(e)) / p.gammafn(t + e);
			}),
			(p.betaln = function (t, e) {
				return p.gammaln(t) + p.gammaln(e) - p.gammaln(t + e);
			}),
			(p.betacf = function (t, e, n) {
				var r,
					i,
					o,
					s = 1e-30,
					a = 1,
					u = e + n,
					c = e + 1,
					l = e - 1,
					h = 1,
					f = 1 - (u * t) / c;
				for (
					d.abs(f) < s && (f = s), o = f = 1 / f;
					a <= 100 &&
					((f = 1 + (i = (a * (n - a) * t) / ((l + (r = 2 * a)) * (e + r))) * f),
					d.abs(f) < s && (f = s),
					(h = 1 + i / h),
					d.abs(h) < s && (h = s),
					(o *= (f = 1 / f) * h),
					(f = 1 + (i = (-(e + a) * (u + a) * t) / ((e + r) * (c + r))) * f),
					d.abs(f) < s && (f = s),
					(h = 1 + i / h),
					d.abs(h) < s && (h = s),
					(o *= i = (f = 1 / f) * h),
					!(d.abs(i - 1) < 3e-7));
					a++
				);
				return o;
			}),
			(p.gammapinv = function (t, e) {
				var n,
					r,
					i,
					o,
					s,
					a,
					u = 0,
					c = e - 1,
					l = p.gammaln(e);
				if (1 <= t) return d.max(100, e + 100 * d.sqrt(e));
				if (t <= 0) return 0;
				for (
					n =
						1 < e
							? ((s = d.log(c)),
								(a = d.exp(c * (s - 1) - l)),
								(o = t < 0.5 ? t : 1 - t),
								(n =
									(2.30753 + 0.27061 * (r = d.sqrt(-2 * d.log(o)))) /
										(1 + r * (0.99229 + 0.04481 * r)) -
									r),
								t < 0.5 && (n = -n),
								d.max(0.001, e * d.pow(1 - 1 / (9 * e) - n / (3 * d.sqrt(e)), 3)))
							: t < (r = 1 - e * (0.253 + 0.12 * e))
								? d.pow(t / r, 1 / e)
								: 1 - d.log(1 - (t - r) / (1 - r));
					u < 12;
					u++
				) {
					if (n <= 0) return 0;
					if (
						((n -= r =
							(i =
								(p.lowRegGamma(e, n) - t) /
								(r =
									1 < e
										? a * d.exp(-(n - c) + c * (d.log(n) - s))
										: d.exp(-n + c * d.log(n) - l))) /
							(1 - 0.5 * d.min(1, i * ((e - 1) / n - 1)))) <= 0 &&
							(n = 0.5 * (n + r)),
						d.abs(r) < 1e-8 * n)
					)
						break;
				}
				return n;
			}),
			(p.erf = function (t) {
				var e,
					n,
					r,
					i = [
						-1.3026537197817094, 0.6419697923564902, 0.019476473204185836,
						-0.00956151478680863, -0.000946595344482036, 0.000366839497852761,
						42523324806907e-18, -20278578112534e-18, -1624290004647e-18,
						130365583558e-17, 1.5626441722e-8, -8.5238095915e-8, 6.529054439e-9,
						5.059343495e-9, -9.91364156e-10, -2.27365122e-10, 96467911e-18, 2394038e-18,
						-6886027e-18, 894487e-18, 313092e-18, -112708e-18, 381e-18, 7106e-18,
						-1523e-18, -94e-18, 121e-18, -28e-18
					],
					o = i.length - 1,
					s = !1,
					a = 0,
					u = 0;
				for (t < 0 && ((t = -t), (s = !0)), n = 4 * (e = 2 / (2 + t)) - 2; 0 < o; o--)
					(a = n * (r = a) - u + i[o]), (u = r);
				return (t = e * d.exp(-t * t + 0.5 * (i[0] + n * a) - u)), s ? t - 1 : 1 - t;
			}),
			(p.erfc = function (t) {
				return 1 - p.erf(t);
			}),
			(p.erfcinv = function (t) {
				var e,
					n,
					r,
					i,
					o = 0;
				if (2 <= t) return -100;
				if (t <= 0) return 100;
				for (
					i = t < 1 ? t : 2 - t,
						e =
							-0.70711 *
							((2.30753 + 0.27061 * (r = d.sqrt(-2 * d.log(i / 2)))) /
								(1 + r * (0.99229 + 0.04481 * r)) -
								r);
					o < 2;
					o++
				)
					e += (n = p.erfc(e) - i) / (1.1283791670955126 * d.exp(-e * e) - e * n);
				return t < 1 ? e : -e;
			}),
			(p.ibetainv = function (t, e, n) {
				var r,
					i,
					o,
					s,
					a,
					u,
					c,
					l = e - 1,
					h = n - 1,
					f = 0;
				if (t <= 0) return 0;
				if (1 <= t) return 1;
				for (
					o =
						1 <= e && 1 <= n
							? ((u = t < 0.5 ? t : 1 - t),
								(o =
									(2.30753 + 0.27061 * (r = d.sqrt(-2 * d.log(u)))) /
										(1 + r * (0.99229 + 0.04481 * r)) -
									r),
								t < 0.5 && (o = -o),
								(s = (o * o - 3) / 6),
								(a = 2 / (1 / (2 * e - 1) + 1 / (2 * n - 1))),
								(u =
									(o * d.sqrt(s + a)) / a -
									(1 / (2 * n - 1) - 1 / (2 * e - 1)) *
										(s + 5 / 6 - 2 / (3 * a))),
								e / (e + n * d.exp(2 * u)))
							: ((s = d.log(e / (e + n))),
								(a = d.log(n / (e + n))),
								t < (r = d.exp(e * s) / e) / (u = r + (i = d.exp(n * a) / n))
									? d.pow(e * u * t, 1 / e)
									: 1 - d.pow(n * u * (1 - t), 1 / n)),
						c = -p.gammaln(e) - p.gammaln(n) + p.gammaln(e + n);
					f < 10;
					f++
				) {
					if (0 === o || 1 === o) return o;
					if (
						((o -= r =
							(i =
								(p.ibeta(o, e, n) - t) /
								(r = d.exp(l * d.log(o) + h * d.log(1 - o) + c))) /
							(1 - 0.5 * d.min(1, i * (l / o - h / (1 - o))))) <= 0 &&
							(o = 0.5 * (o + r)),
						1 <= o && (o = 0.5 * (o + r + 1)),
						d.abs(r) < 1e-8 * o && 0 < f)
					)
						break;
				}
				return o;
			}),
			(p.ibeta = function (t, e, n) {
				var r =
					0 === t || 1 === t
						? 0
						: d.exp(
								p.gammaln(e + n) -
									p.gammaln(e) -
									p.gammaln(n) +
									e * d.log(t) +
									n * d.log(1 - t)
							);
				return (
					!(t < 0 || 1 < t) &&
					(t < (e + 1) / (e + n + 2)
						? (r * p.betacf(t, e, n)) / e
						: 1 - (r * p.betacf(1 - t, n, e)) / n)
				);
			}),
			(p.randn = function (t, e) {
				var n, r, i, o;
				if (((e = e || t), t))
					return p.create(t, e, function () {
						return p.randn();
					});
				for (
					;
					(n = p._random_fn()),
						(r = 1.7156 * (p._random_fn() - 0.5)),
						(o =
							(o = n - 0.449871) * o +
							(i = d.abs(r) + 0.386595) * (0.196 * i - 0.25472 * o)),
						0.27597 < o && (0.27846 < o || r * r > -4 * d.log(n) * n * n);

				);
				return r / n;
			}),
			(p.randg = function (t, e, n) {
				var r,
					i,
					o,
					s,
					a,
					u = t;
				if (((n = n || e), (t = t || 1), e))
					return (
						(n = p.zeros(e, n)).alter(function () {
							return p.randg(t);
						}),
						n
					);
				t < 1 && (t += 1), (r = t - 1 / 3), (i = 1 / d.sqrt(9 * r));
				do {
					for (; (s = 1 + i * (a = p.randn())), s <= 0; );
				} while (
					((s *= s * s),
					(o = p._random_fn()) > 1 - 0.331 * d.pow(a, 4) &&
						d.log(o) > 0.5 * a * a + r * (1 - s + d.log(s)))
				);
				if (t == u) return r * s;
				for (; (o = p._random_fn()), 0 === o; );
				return d.pow(o, 1 / u) * r * s;
			}),
			(function (t) {
				for (var e = 0; e < t.length; e++)
					!(function (e) {
						p.fn[e] = function () {
							return p(
								p.map(this, function (t) {
									return p[e](t);
								})
							);
						};
					})(t[e]);
			})("gammaln gammafn factorial factorialln".split(" ")),
			(function (t) {
				for (var e = 0; e < t.length; e++)
					!(function (t) {
						p.fn[t] = function () {
							return p(p[t].apply(null, arguments));
						};
					})(t[e]);
			})("randn".split(" ")),
			(_ = f),
			(x = Math),
			(function (t) {
				for (var e = 0; e < t.length; e++)
					!(function (o) {
						(_[o] = function (t, e, n) {
							return this instanceof arguments.callee
								? ((this._a = t), (this._b = e), (this._c = n), this)
								: new arguments.callee(t, e, n);
						}),
							(_.fn[o] = function (t, e, n) {
								n = _[o](t, e, n);
								return (n.data = this), n;
							}),
							(_[o].prototype.sample = function (t) {
								var e = this._a,
									n = this._b,
									r = this._c;
								return t
									? _.alter(t, function () {
											return _[o].sample(e, n, r);
										})
									: _[o].sample(e, n, r);
							}),
							(function (t) {
								for (var e = 0; e < t.length; e++)
									!(function (i) {
										_[o].prototype[i] = function (t) {
											var e = this._a,
												n = this._b,
												r = this._c;
											return (
												t || 0 === t || (t = this.data),
												"number" != typeof t
													? _.fn.map.call(t, function (t) {
															return _[o][i](t, e, n, r);
														})
													: _[o][i](t, e, n, r)
											);
										};
									})(t[e]);
							})("pdf cdf inv".split(" ")),
							(function (t) {
								for (var e = 0; e < t.length; e++)
									!(function (t) {
										_[o].prototype[t] = function () {
											return _[o][t](this._a, this._b, this._c);
										};
									})(t[e]);
							})("mean median mode variance".split(" "));
					})(t[e]);
			})(
				"beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy laplace lognormal noncentralt normal pareto studentt weibull uniform binomial negbin hypgeom poisson triangular tukey arcsine".split(
					" "
				)
			),
			_.extend(_.beta, {
				pdf: function (t, e, n) {
					return 1 < t || t < 0
						? 0
						: 1 == e && 1 == n
							? 1
							: e < 512 && n < 512
								? (x.pow(t, e - 1) * x.pow(1 - t, n - 1)) / _.betafn(e, n)
								: x.exp(
										(e - 1) * x.log(t) + (n - 1) * x.log(1 - t) - _.betaln(e, n)
									);
				},
				cdf: function (t, e, n) {
					return 1 < t || t < 0 ? +(1 < t) : _.ibeta(t, e, n);
				},
				inv: function (t, e, n) {
					return _.ibetainv(t, e, n);
				},
				mean: function (t, e) {
					return t / (t + e);
				},
				median: function (t, e) {
					return _.ibetainv(0.5, t, e);
				},
				mode: function (t, e) {
					return (t - 1) / (t + e - 2);
				},
				sample: function (t, e) {
					t = _.randg(t);
					return t / (t + _.randg(e));
				},
				variance: function (t, e) {
					return (t * e) / (x.pow(t + e, 2) * (t + e + 1));
				}
			}),
			_.extend(_.centralF, {
				pdf: function (t, e, n) {
					var r;
					return t < 0
						? 0
						: e <= 2
							? 0 === t && e < 2
								? 1 / 0
								: 0 === t && 2 === e
									? 1
									: (1 / _.betafn(e / 2, n / 2)) *
										x.pow(e / n, e / 2) *
										x.pow(t, e / 2 - 1) *
										x.pow(1 + (e / n) * t, -(e + n) / 2)
							: ((r = (e * t) / (n + t * e)),
								((e * (n / (n + t * e))) / 2) *
									_.binomial.pdf((e - 2) / 2, (e + n - 2) / 2, r));
				},
				cdf: function (t, e, n) {
					return t < 0 ? 0 : _.ibeta((e * t) / (e * t + n), e / 2, n / 2);
				},
				inv: function (t, e, n) {
					return n / (e * (1 / _.ibetainv(t, e / 2, n / 2) - 1));
				},
				mean: function (t, e) {
					return 2 < e ? e / (e - 2) : void 0;
				},
				mode: function (t, e) {
					return 2 < t ? (e * (t - 2)) / (t * (e + 2)) : void 0;
				},
				sample: function (t, e) {
					return (2 * _.randg(t / 2)) / t / ((2 * _.randg(e / 2)) / e);
				},
				variance: function (t, e) {
					if (!(e <= 4))
						return (2 * e * e * (t + e - 2)) / (t * (e - 2) * (e - 2) * (e - 4));
				}
			}),
			_.extend(_.cauchy, {
				pdf: function (t, e, n) {
					return n < 0 ? 0 : n / (x.pow(t - e, 2) + x.pow(n, 2)) / x.PI;
				},
				cdf: function (t, e, n) {
					return x.atan((t - e) / n) / x.PI + 0.5;
				},
				inv: function (t, e, n) {
					return e + n * x.tan(x.PI * (t - 0.5));
				},
				median: function (t) {
					return t;
				},
				mode: function (t) {
					return t;
				},
				sample: function (t, e) {
					return _.randn() * x.sqrt(1 / (2 * _.randg(0.5))) * e + t;
				}
			}),
			_.extend(_.chisquare, {
				pdf: function (t, e) {
					return t < 0
						? 0
						: 0 === t && 2 === e
							? 0.5
							: x.exp(
									(e / 2 - 1) * x.log(t) -
										t / 2 -
										(e / 2) * x.log(2) -
										_.gammaln(e / 2)
								);
				},
				cdf: function (t, e) {
					return t < 0 ? 0 : _.lowRegGamma(e / 2, t / 2);
				},
				inv: function (t, e) {
					return 2 * _.gammapinv(t, 0.5 * e);
				},
				mean: function (t) {
					return t;
				},
				median: function (t) {
					return t * x.pow(1 - 2 / (9 * t), 3);
				},
				mode: function (t) {
					return 0 < t - 2 ? t - 2 : 0;
				},
				sample: function (t) {
					return 2 * _.randg(t / 2);
				},
				variance: function (t) {
					return 2 * t;
				}
			}),
			_.extend(_.exponential, {
				pdf: function (t, e) {
					return t < 0 ? 0 : e * x.exp(-e * t);
				},
				cdf: function (t, e) {
					return t < 0 ? 0 : 1 - x.exp(-e * t);
				},
				inv: function (t, e) {
					return -x.log(1 - t) / e;
				},
				mean: function (t) {
					return 1 / t;
				},
				median: function (t) {
					return (1 / t) * x.log(2);
				},
				mode: function () {
					return 0;
				},
				sample: function (t) {
					return (-1 / t) * x.log(_._random_fn());
				},
				variance: function (t) {
					return x.pow(t, -2);
				}
			}),
			_.extend(_.gamma, {
				pdf: function (t, e, n) {
					return t < 0
						? 0
						: 0 === t && 1 === e
							? 1 / n
							: x.exp((e - 1) * x.log(t) - t / n - _.gammaln(e) - e * x.log(n));
				},
				cdf: function (t, e, n) {
					return t < 0 ? 0 : _.lowRegGamma(e, t / n);
				},
				inv: function (t, e, n) {
					return _.gammapinv(t, e) * n;
				},
				mean: function (t, e) {
					return t * e;
				},
				mode: function (t, e) {
					if (1 < t) return (t - 1) * e;
				},
				sample: function (t, e) {
					return _.randg(t) * e;
				},
				variance: function (t, e) {
					return t * e * e;
				}
			}),
			_.extend(_.invgamma, {
				pdf: function (t, e, n) {
					return t <= 0
						? 0
						: x.exp(-(e + 1) * x.log(t) - n / t - _.gammaln(e) + e * x.log(n));
				},
				cdf: function (t, e, n) {
					return t <= 0 ? 0 : 1 - _.lowRegGamma(e, n / t);
				},
				inv: function (t, e, n) {
					return n / _.gammapinv(1 - t, e);
				},
				mean: function (t, e) {
					return 1 < t ? e / (t - 1) : void 0;
				},
				mode: function (t, e) {
					return e / (t + 1);
				},
				sample: function (t, e) {
					return e / _.randg(t);
				},
				variance: function (t, e) {
					if (!(t <= 2)) return (e * e) / ((t - 1) * (t - 1) * (t - 2));
				}
			}),
			_.extend(_.kumaraswamy, {
				pdf: function (t, e, n) {
					return 0 === t && 1 === e
						? n
						: 1 === t && 1 === n
							? e
							: x.exp(
									x.log(e) +
										x.log(n) +
										(e - 1) * x.log(t) +
										(n - 1) * x.log(1 - x.pow(t, e))
								);
				},
				cdf: function (t, e, n) {
					return t < 0 ? 0 : 1 < t ? 1 : 1 - x.pow(1 - x.pow(t, e), n);
				},
				inv: function (t, e, n) {
					return x.pow(1 - x.pow(1 - t, 1 / n), 1 / e);
				},
				mean: function (t, e) {
					return (e * _.gammafn(1 + 1 / t) * _.gammafn(e)) / _.gammafn(1 + 1 / t + e);
				},
				median: function (t, e) {
					return x.pow(1 - x.pow(2, -1 / e), 1 / t);
				},
				mode: function (t, e) {
					if (1 <= t && 1 <= e && 1 !== t && 1 !== e)
						return x.pow((t - 1) / (t * e - 1), 1 / t);
				},
				variance: function () {
					throw new Error("variance not yet implemented");
				}
			}),
			_.extend(_.lognormal, {
				pdf: function (t, e, n) {
					return t <= 0
						? 0
						: x.exp(
								-x.log(t) -
									0.5 * x.log(2 * x.PI) -
									x.log(n) -
									x.pow(x.log(t) - e, 2) / (2 * n * n)
							);
				},
				cdf: function (t, e, n) {
					return t < 0 ? 0 : 0.5 + 0.5 * _.erf((x.log(t) - e) / x.sqrt(2 * n * n));
				},
				inv: function (t, e, n) {
					return x.exp(-1.4142135623730951 * n * _.erfcinv(2 * t) + e);
				},
				mean: function (t, e) {
					return x.exp(t + (e * e) / 2);
				},
				median: function (t) {
					return x.exp(t);
				},
				mode: function (t, e) {
					return x.exp(t - e * e);
				},
				sample: function (t, e) {
					return x.exp(_.randn() * e + t);
				},
				variance: function (t, e) {
					return (x.exp(e * e) - 1) * x.exp(2 * t + e * e);
				}
			}),
			_.extend(_.noncentralt, {
				pdf: function (t, e, n) {
					return x.abs(n) < 1e-14
						? _.studentt.pdf(t, e)
						: x.abs(t) < 1e-14
							? x.exp(
									_.gammaln((e + 1) / 2) -
										(n * n) / 2 -
										0.5 * x.log(x.PI * e) -
										_.gammaln(e / 2)
								)
							: (e / t) *
								(_.noncentralt.cdf(t * x.sqrt(1 + 2 / e), e + 2, n) -
									_.noncentralt.cdf(t, e, n));
				},
				cdf: function (t, e, n) {
					if (x.abs(n) < 1e-14) return _.studentt.cdf(t, e);
					var r = !1;
					t < 0 && ((r = !0), (n = -n));
					for (
						var i = _.normal.cdf(-n, 0, 1),
							o = 1e-14 + 1,
							s = o,
							a = (t * t) / (t * t + e),
							u = 0,
							c = x.exp((-n * n) / 2),
							l = x.exp((-n * n) / 2 - 0.5 * x.log(2) - _.gammaln(1.5)) * n;
						u < 200 || 1e-14 < s || 1e-14 < o;

					)
						(s = o),
							0 < u && ((c *= (n * n) / (2 * u)), (l *= (n * n) / (2 * (u + 0.5)))),
							(i +=
								0.5 *
								(o =
									c * _.beta.cdf(a, u + 0.5, e / 2) +
									l * _.beta.cdf(a, u + 1, e / 2))),
							u++;
					return r ? 1 - i : i;
				}
			}),
			_.extend(_.normal, {
				pdf: function (t, e, n) {
					return x.exp(-0.5 * x.log(2 * x.PI) - x.log(n) - x.pow(t - e, 2) / (2 * n * n));
				},
				cdf: function (t, e, n) {
					return 0.5 * (1 + _.erf((t - e) / x.sqrt(2 * n * n)));
				},
				inv: function (t, e, n) {
					return -1.4142135623730951 * n * _.erfcinv(2 * t) + e;
				},
				mean: function (t) {
					return t;
				},
				median: function (t) {
					return t;
				},
				mode: function (t) {
					return t;
				},
				sample: function (t, e) {
					return _.randn() * e + t;
				},
				variance: function (t, e) {
					return e * e;
				}
			}),
			_.extend(_.pareto, {
				pdf: function (t, e, n) {
					return t < e ? 0 : (n * x.pow(e, n)) / x.pow(t, n + 1);
				},
				cdf: function (t, e, n) {
					return t < e ? 0 : 1 - x.pow(e / t, n);
				},
				inv: function (t, e, n) {
					return e / x.pow(1 - t, 1 / n);
				},
				mean: function (t, e) {
					if (!(e <= 1)) return (e * x.pow(t, e)) / (e - 1);
				},
				median: function (t, e) {
					return t * (e * x.SQRT2);
				},
				mode: function (t) {
					return t;
				},
				variance: function (t, e) {
					if (!(e <= 2)) return (t * t * e) / (x.pow(e - 1, 2) * (e - 2));
				}
			}),
			_.extend(_.studentt, {
				pdf: function (t, e) {
					return (
						(e = 1e100 < e ? 1e100 : e),
						(1 / (x.sqrt(e) * _.betafn(0.5, e / 2))) *
							x.pow(1 + (t * t) / e, -(e + 1) / 2)
					);
				},
				cdf: function (t, e) {
					var n = e / 2;
					return _.ibeta((t + x.sqrt(t * t + e)) / (2 * x.sqrt(t * t + e)), n, n);
				},
				inv: function (t, e) {
					var n = _.ibetainv(2 * x.min(t, 1 - t), 0.5 * e, 0.5),
						n = x.sqrt((e * (1 - n)) / n);
					return 0.5 < t ? n : -n;
				},
				mean: function (t) {
					return 1 < t ? 0 : void 0;
				},
				median: function () {
					return 0;
				},
				mode: function () {
					return 0;
				},
				sample: function (t) {
					return _.randn() * x.sqrt(t / (2 * _.randg(t / 2)));
				},
				variance: function (t) {
					return 2 < t ? t / (t - 2) : 1 < t ? 1 / 0 : void 0;
				}
			}),
			_.extend(_.weibull, {
				pdf: function (t, e, n) {
					return t < 0 || e < 0 || n < 0
						? 0
						: (n / e) * x.pow(t / e, n - 1) * x.exp(-x.pow(t / e, n));
				},
				cdf: function (t, e, n) {
					return t < 0 ? 0 : 1 - x.exp(-x.pow(t / e, n));
				},
				inv: function (t, e, n) {
					return e * x.pow(-x.log(1 - t), 1 / n);
				},
				mean: function (t, e) {
					return t * _.gammafn(1 + 1 / e);
				},
				median: function (t, e) {
					return t * x.pow(x.log(2), 1 / e);
				},
				mode: function (t, e) {
					return e <= 1 ? 0 : t * x.pow((e - 1) / e, 1 / e);
				},
				sample: function (t, e) {
					return t * x.pow(-x.log(_._random_fn()), 1 / e);
				},
				variance: function (t, e) {
					return t * t * _.gammafn(1 + 2 / e) - x.pow(_.weibull.mean(t, e), 2);
				}
			}),
			_.extend(_.uniform, {
				pdf: function (t, e, n) {
					return t < e || n < t ? 0 : 1 / (n - e);
				},
				cdf: function (t, e, n) {
					return t < e ? 0 : t < n ? (t - e) / (n - e) : 1;
				},
				inv: function (t, e, n) {
					return e + t * (n - e);
				},
				mean: function (t, e) {
					return 0.5 * (t + e);
				},
				median: function (t, e) {
					return _.mean(t, e);
				},
				mode: function () {
					throw new Error("mode is not yet implemented");
				},
				sample: function (t, e) {
					return t / 2 + e / 2 + (e / 2 - t / 2) * (2 * _._random_fn() - 1);
				},
				variance: function (t, e) {
					return x.pow(e - t, 2) / 12;
				}
			}),
			_.extend(_.binomial, {
				pdf: function (t, e, n) {
					return 0 === n || 1 === n
						? e * n === t
							? 1
							: 0
						: _.combination(e, t) * x.pow(n, t) * x.pow(1 - n, e - t);
				},
				cdf: function (t, e, n) {
					if (t < 0) return 0;
					if (e <= t) return 1;
					if (n < 0 || 1 < n || e <= 0) return NaN;
					var r = n,
						i = (t = x.floor(t)) + 1,
						n = e - t,
						e = i + n,
						t = x.exp(
							_.gammaln(e) -
								_.gammaln(n) -
								_.gammaln(i) +
								i * x.log(r) +
								n * x.log(1 - r)
						),
						i =
							r < (i + 1) / (e + 2)
								? t * o(r, i, n, 1e-10)
								: 1 - t * o(1 - r, n, i, 1e-10);
					return x.round(1e10 * (1 - i)) / 1e10;
				}
			}),
			_.extend(_.negbin, {
				pdf: function (t, e, n) {
					return (
						t === t >>> 0 &&
						(t < 0
							? 0
							: _.combination(t + e - 1, e - 1) * x.pow(1 - n, t) * x.pow(n, e))
					);
				},
				cdf: function (t, e, n) {
					var r = 0,
						i = 0;
					if (t < 0) return 0;
					for (; i <= t; i++) r += _.negbin.pdf(i, e, n);
					return r;
				}
			}),
			_.extend(_.hypgeom, {
				pdf: function (t, e, n, r) {
					if ((t != t) | 0) return !1;
					if (t < 0 || t < n - (e - r)) return 0;
					if (r < t || n < t) return 0;
					if (e < 2 * n)
						return e < 2 * r
							? _.hypgeom.pdf(e - n - r + t, e, e - n, e - r)
							: _.hypgeom.pdf(r - t, e, e - n, r);
					if (e < 2 * r) return _.hypgeom.pdf(n - t, e, n, e - r);
					if (n < r) return _.hypgeom.pdf(t, e, r, n);
					for (var i = 1, o = 0, s = 0; s < t; s++) {
						for (; 1 < i && o < r; ) (i *= 1 - n / (e - o)), o++;
						i *= ((r - s) * (n - s)) / ((s + 1) * (e - n - r + s + 1));
					}
					for (; o < r; o++) i *= 1 - n / (e - o);
					return x.min(1, x.max(0, i));
				},
				cdf: function (t, e, n, r) {
					if (t < 0 || t < n - (e - r)) return 0;
					if (r <= t || n <= t) return 1;
					if (e < 2 * n)
						return e < 2 * r
							? _.hypgeom.cdf(e - n - r + t, e, e - n, e - r)
							: 1 - _.hypgeom.cdf(r - t - 1, e, e - n, r);
					if (e < 2 * r) return 1 - _.hypgeom.cdf(n - t - 1, e, n, e - r);
					if (n < r) return _.hypgeom.cdf(t, e, r, n);
					for (var i = 1, o = 1, s = 0, a = 0; a < t; a++) {
						for (; 1 < i && s < r; ) {
							var u = 1 - n / (e - s);
							(o *= u), (i *= u), s++;
						}
						i += o *= ((r - a) * (n - a)) / ((a + 1) * (e - n - r + a + 1));
					}
					for (; s < r; s++) i *= 1 - n / (e - s);
					return x.min(1, x.max(0, i));
				}
			}),
			_.extend(_.poisson, {
				pdf: function (t, e) {
					return e < 0 || t % 1 != 0 || t < 0
						? 0
						: (x.pow(e, t) * x.exp(-e)) / _.factorial(t);
				},
				cdf: function (t, e) {
					var n = [],
						r = 0;
					if (t < 0) return 0;
					for (; r <= t; r++) n.push(_.poisson.pdf(r, e));
					return _.sum(n);
				},
				mean: function (t) {
					return t;
				},
				variance: function (t) {
					return t;
				},
				sampleSmall: function (t) {
					for (var e = 1, n = 0, r = x.exp(-t); n++, (e *= _._random_fn()), r < e; );
					return n - 1;
				},
				sampleLarge: function (t) {
					for (
						var e,
							n,
							r,
							i = t,
							t = x.sqrt(i),
							o = x.log(i),
							s = 0.931 + 2.53 * t,
							a = 0.02483 * s - 0.059,
							u = 1.1239 + 1.1328 / (s - 3.4),
							c = 0.9277 - 3.6224 / (s - 2);
						;

					) {
						if (
							((e = x.random() - 0.5),
							(n = x.random()),
							(r = 0.5 - x.abs(e)),
							(e = x.floor(((2 * a) / r + s) * e + i + 0.43)),
							0.07 <= r && n <= c)
						)
							return e;
						if (
							!(e < 0 || (r < 0.013 && r < n)) &&
							x.log(n) + x.log(u) - x.log(a / (r * r) + s) <=
								e * o - i - _.loggam(e + 1)
						)
							return e;
					}
				},
				sample: function (t) {
					return t < 10 ? this.sampleSmall(t) : this.sampleLarge(t);
				}
			}),
			_.extend(_.triangular, {
				pdf: function (t, e, n, r) {
					return n <= e || r < e || n < r
						? NaN
						: t < e || n < t
							? 0
							: t < r
								? (2 * (t - e)) / ((n - e) * (r - e))
								: t === r
									? 2 / (n - e)
									: (2 * (n - t)) / ((n - e) * (n - r));
				},
				cdf: function (t, e, n, r) {
					return n <= e || r < e || n < r
						? NaN
						: t <= e
							? 0
							: n <= t
								? 1
								: t <= r
									? x.pow(t - e, 2) / ((n - e) * (r - e))
									: 1 - x.pow(n - t, 2) / ((n - e) * (n - r));
				},
				inv: function (t, e, n, r) {
					return n <= e || r < e || n < r
						? NaN
						: t <= (r - e) / (n - e)
							? e + (n - e) * x.sqrt(t * ((r - e) / (n - e)))
							: e + (n - e) * (1 - x.sqrt((1 - t) * (1 - (r - e) / (n - e))));
				},
				mean: function (t, e, n) {
					return (t + e + n) / 3;
				},
				median: function (t, e, n) {
					return n <= (t + e) / 2
						? e - x.sqrt((e - t) * (e - n)) / x.sqrt(2)
						: (t + e) / 2 < n
							? t + x.sqrt((e - t) * (n - t)) / x.sqrt(2)
							: void 0;
				},
				mode: function (t, e, n) {
					return n;
				},
				sample: function (t, e, n) {
					var r = _._random_fn();
					return r < (n - t) / (e - t)
						? t + x.sqrt(r * (e - t) * (n - t))
						: e - x.sqrt((1 - r) * (e - t) * (e - n));
				},
				variance: function (t, e, n) {
					return (t * t + e * e + n * n - t * e - t * n - e * n) / 18;
				}
			}),
			_.extend(_.arcsine, {
				pdf: function (t, e, n) {
					return n <= e
						? NaN
						: t <= e || n <= t
							? 0
							: (2 / x.PI) * x.pow(x.pow(n - e, 2) - x.pow(2 * t - e - n, 2), -0.5);
				},
				cdf: function (t, e, n) {
					return t < e ? 0 : t < n ? (2 / x.PI) * x.asin(x.sqrt((t - e) / (n - e))) : 1;
				},
				inv: function (t, e, n) {
					return e + (0.5 - 0.5 * x.cos(x.PI * t)) * (n - e);
				},
				mean: function (t, e) {
					return e <= t ? NaN : (t + e) / 2;
				},
				median: function (t, e) {
					return e <= t ? NaN : (t + e) / 2;
				},
				mode: function () {
					throw new Error("mode is not yet implemented");
				},
				sample: function (t, e) {
					return (t + e) / 2 + ((e - t) / 2) * x.sin(2 * x.PI * _.uniform.sample(0, 1));
				},
				variance: function (t, e) {
					return e <= t ? NaN : x.pow(e - t, 2) / 8;
				}
			}),
			_.extend(_.laplace, {
				pdf: function (t, e, n) {
					return n <= 0 ? 0 : x.exp(-x.abs(t - e) / n) / (2 * n);
				},
				cdf: function (t, e, n) {
					return n <= 0
						? 0
						: t < e
							? 0.5 * x.exp((t - e) / n)
							: 1 - 0.5 * x.exp(-(t - e) / n);
				},
				mean: function (t) {
					return t;
				},
				median: function (t) {
					return t;
				},
				mode: function (t) {
					return t;
				},
				variance: function (t, e) {
					return 2 * e * e;
				},
				sample: function (t, e) {
					var n = _._random_fn() - 0.5;
					return t - e * ((e = n) / x.abs(e)) * x.log(1 - 2 * x.abs(n));
				}
			}),
			_.extend(_.tukey, {
				cdf: function (t, e, n) {
					var r = e,
						i = [
							0.9894009349916499, 0.9445750230732326, 0.8656312023878318,
							0.755404408355003, 0.6178762444026438, 0.45801677765722737,
							0.2816035507792589, 0.09501250983763744
						],
						o = [
							0.027152459411754096, 0.062253523938647894, 0.09515851168249279,
							0.12462897125553388, 0.14959598881657674, 0.16915651939500254,
							0.18260341504492358, 0.1894506104550685
						];
					if (t <= 0) return 0;
					if (n < 2 || r < 2) return NaN;
					if (!Number.isFinite(t)) return 1;
					if (25e3 < n) return v(t, 1, r);
					var e = 0.5 * n,
						s = e * x.log(n) - n * x.log(2) - _.gammaln(e),
						a = e - 1,
						u = 0.25 * n,
						c = n <= 100 ? 1 : n <= 800 ? 0.5 : n <= 5e3 ? 0.25 : 0.125;
					s += x.log(c);
					for (var l = 0, h = 1; h <= 50; h++) {
						for (var f = 0, p = (2 * h - 1) * c, d = 1; d <= 16; d++) {
							var g,
								m =
									8 < d
										? ((g = d - 8 - 1),
											s + a * x.log(p + i[g] * c) - (i[g] * c + p) * u)
										: ((g = d - 1),
											s + a * x.log(p - i[g] * c) + (i[g] * c - p) * u);
							-30 <= m &&
								(f +=
									v(
										8 < d
											? t * x.sqrt(0.5 * (i[g] * c + p))
											: t * x.sqrt(0.5 * (-i[g] * c + p)),
										1,
										r
									) *
									o[g] *
									x.exp(m));
						}
						if (1 <= h * c && f <= 1e-14) break;
						l += f;
					}
					if (1e-14 < f) throw new Error("tukey.cdf failed to converge");
					return 1 < l && (l = 1), l;
				},
				inv: function (t, e, n) {
					if (n < 2 || e < 2) return NaN;
					if (t < 0 || 1 < t) return NaN;
					if (0 === t) return 0;
					if (1 === t) return 1 / 0;
					for (
						var r,
							i,
							o,
							s,
							a =
								((i = e),
								(o = n),
								(s = 0.5 - 0.5 * (r = t)),
								(s =
									(r = x.sqrt(x.log(1 / (s * s)))) +
									((((-453642210148e-16 * r - 0.204231210125) * r -
										0.342242088547) *
										r -
										1) *
										r +
										0.322232421088) /
										((((0.0038560700634 * r + 0.10353775285) * r +
											0.531103462366) *
											r +
											0.588581570495) *
											r +
											0.099348462606)),
								o < 120 && (s += (s * s * s + s) / o / 4),
								(r = 0.8832 - 0.2368 * s),
								o < 120 && (r += -1.214 / o + (1.208 * s) / o),
								s * (r * x.log(i - 1) + 1.4142)),
							u = 0 < (f = _.tukey.cdf(a, e, n) - t) ? x.max(0, a - 1) : a + 1,
							c = _.tukey.cdf(u, e, n) - t,
							l = 1;
						l < 50;
						l++
					) {
						var h = u - (c * (u - a)) / (c - f),
							f = c,
							a = u;
						if (
							(h < 0 && ((h = 0), (c = -t)),
							(c = _.tukey.cdf(h, e, n) - t),
							(u = h),
							x.abs(u - a) < 1e-4)
						)
							return h;
					}
					throw new Error("tukey.inv failed to converge");
				}
			}),
			(m = f),
			(g = Math),
			(i = Array.prototype.push),
			(e = m.utils.isArray),
			m.extend({
				add: function (t, r) {
					return y(r)
						? (y(r[0]) || (r = [r]),
							m.map(t, function (t, e, n) {
								return t + r[e][n];
							}))
						: m.map(t, function (t) {
								return t + r;
							});
				},
				subtract: function (t, r) {
					return y(r)
						? (y(r[0]) || (r = [r]),
							m.map(t, function (t, e, n) {
								return t - r[e][n] || 0;
							}))
						: m.map(t, function (t) {
								return t - r;
							});
				},
				divide: function (t, e) {
					return y(e)
						? (y(e[0]) || (e = [e]), m.multiply(t, m.inv(e)))
						: m.map(t, function (t) {
								return t / e;
							});
				},
				multiply: function (t, e) {
					var n, r, i, o, s, a, u, c;
					if (void 0 === t.length && void 0 === e.length) return t * e;
					if (
						((s = t.length),
						(a = t[0].length),
						(u = m.zeros(s, (i = y(e) ? e[0].length : a))),
						(c = 0),
						y(e))
					) {
						for (; c < i; c++)
							for (n = 0; n < s; n++) {
								for (r = o = 0; r < a; r++) o += t[n][r] * e[r][c];
								u[n][c] = o;
							}
						return 1 === s && 1 === c ? u[0][0] : u;
					}
					return m.map(t, function (t) {
						return t * e;
					});
				},
				outer: function (t, e) {
					return m.multiply(
						t.map(function (t) {
							return [t];
						}),
						[e]
					);
				},
				dot: function (t, e) {
					y(t[0]) || (t = [t]), y(e[0]) || (e = [e]);
					for (
						var n,
							r,
							i = 1 === t[0].length && 1 !== t.length ? m.transpose(t) : t,
							o = 1 === e[0].length && 1 !== e.length ? m.transpose(e) : e,
							s = [],
							a = 0,
							u = i.length,
							c = i[0].length;
						a < u;
						a++
					) {
						for (s[a] = [], r = n = 0; r < c; r++) n += i[a][r] * o[a][r];
						s[a] = n;
					}
					return 1 === s.length ? s[0] : s;
				},
				pow: function (t, e) {
					return m.map(t, function (t) {
						return g.pow(t, e);
					});
				},
				exp: function (t) {
					return m.map(t, function (t) {
						return g.exp(t);
					});
				},
				log: function (t) {
					return m.map(t, function (t) {
						return g.log(t);
					});
				},
				abs: function (t) {
					return m.map(t, function (t) {
						return g.abs(t);
					});
				},
				norm: function (t, e) {
					var n = 0,
						r = 0;
					for (isNaN(e) && (e = 2), y(t[0]) && (t = t[0]); r < t.length; r++)
						n += g.pow(g.abs(t[r]), e);
					return g.pow(n, 1 / e);
				},
				angle: function (t, e) {
					return g.acos(m.dot(t, e) / (m.norm(t) * m.norm(e)));
				},
				aug: function (t, e) {
					for (var n = [], r = 0; r < t.length; r++) n.push(t[r].slice());
					for (r = 0; r < n.length; r++) i.apply(n[r], e[r]);
					return n;
				},
				inv: function (t) {
					for (
						var e,
							n = t.length,
							r = t[0].length,
							i = m.identity(n, r),
							o = m.gauss_jordan(t, i),
							s = [],
							a = 0;
						a < n;
						a++
					)
						for (s[a] = [], e = r; e < o[0].length; e++) s[a][e - r] = o[a][e];
					return s;
				},
				det: function (t) {
					var e,
						n = t.length,
						r = 2 * n,
						i = new Array(r),
						o = n - 1,
						s = r - 1,
						a = o - n + 1,
						u = s,
						c = 0,
						l = 0;
					if (2 === n) return t[0][0] * t[1][1] - t[0][1] * t[1][0];
					for (; c < r; c++) i[c] = 1;
					for (c = 0; c < n; c++) {
						for (e = 0; e < n; e++)
							(i[a < 0 ? a + n : a] *= t[c][e]),
								(i[u < n ? u + n : u] *= t[c][e]),
								a++,
								u--;
						(a = --o - n + 1), (u = --s);
					}
					for (c = 0; c < n; c++) l += i[c];
					for (; c < r; c++) l -= i[c];
					return l;
				},
				gauss_elimination: function (t, e) {
					for (
						var n,
							r,
							i,
							o,
							s = 0,
							a = 0,
							u = t.length,
							c = t[0].length,
							l = 0,
							h = [],
							f = (t = m.aug(t, e))[0].length,
							s = 0;
						s < u;
						s++
					) {
						for (r = t[s][s], o = (a = s) + 1; o < c; o++)
							r < g.abs(t[o][s]) && ((r = t[o][s]), (a = o));
						if (a != s)
							for (o = 0; o < f; o++)
								(i = t[s][o]), (t[s][o] = t[a][o]), (t[a][o] = i);
						for (a = s + 1; a < u; a++)
							for (n = t[a][s] / t[s][s], o = s; o < f; o++)
								t[a][o] = t[a][o] - n * t[s][o];
					}
					for (s = u - 1; 0 <= s; s--) {
						for (l = 0, a = s + 1; a <= u - 1; a++) l += h[a] * t[s][a];
						h[s] = (t[s][f - 1] - l) / t[s][s];
					}
					return h;
				},
				gauss_jordan: function (t, e) {
					for (
						var n, r = m.aug(t, e), i = r.length, o = r[0].length, s = 0, a = 0;
						a < i;
						a++
					) {
						for (var u = a, c = a + 1; c < i; c++)
							g.abs(r[c][a]) > g.abs(r[u][a]) && (u = c);
						var l = r[a];
						for (r[a] = r[u], r[u] = l, c = a + 1; c < i; c++)
							for (s = r[c][a] / r[a][a], n = a; n < o; n++) r[c][n] -= r[a][n] * s;
					}
					for (a = i - 1; 0 <= a; a--) {
						for (s = r[a][a], c = 0; c < a; c++)
							for (n = o - 1; a - 1 < n; n--) r[c][n] -= (r[a][n] * r[c][a]) / s;
						for (r[a][a] /= s, n = i; n < o; n++) r[a][n] /= s;
					}
					return r;
				},
				triaUpSolve: function (n, t) {
					var r,
						i = n[0].length,
						o = m.zeros(1, i)[0],
						e = !1;
					return (
						null != t[0].length &&
							((t = t.map(function (t) {
								return t[0];
							})),
							(e = !0)),
						m.arange(i - 1, -1, -1).forEach(function (e) {
							(r = m.arange(e + 1, i).map(function (t) {
								return o[t] * n[e][t];
							})),
								(o[e] = (t[e] - m.sum(r)) / n[e][e]);
						}),
						e
							? o.map(function (t) {
									return [t];
								})
							: o
					);
				},
				triaLowSolve: function (n, t) {
					var r,
						e = n[0].length,
						i = m.zeros(1, e)[0],
						o = !1;
					return (
						null != t[0].length &&
							((t = t.map(function (t) {
								return t[0];
							})),
							(o = !0)),
						m.arange(e).forEach(function (e) {
							(r = m.arange(e).map(function (t) {
								return n[e][t] * i[t];
							})),
								(i[e] = (t[e] - m.sum(r)) / n[e][e]);
						}),
						o
							? i.map(function (t) {
									return [t];
								})
							: i
					);
				},
				lu: function (r) {
					var t,
						e = r.length,
						i = m.identity(e),
						o = m.zeros(r.length, r[0].length);
					return (
						m.arange(e).forEach(function (t) {
							o[0][t] = r[0][t];
						}),
						m.arange(1, e).forEach(function (n) {
							m.arange(n).forEach(function (e) {
								(t = m.arange(e).map(function (t) {
									return i[n][t] * o[t][e];
								})),
									(i[n][e] = (r[n][e] - m.sum(t)) / o[e][e]);
							}),
								m.arange(n, e).forEach(function (e) {
									(t = m.arange(n).map(function (t) {
										return i[n][t] * o[t][e];
									})),
										(o[n][e] = r[t.length][e] - m.sum(t));
								});
						}),
						[i, o]
					);
				},
				cholesky: function (t) {
					var r,
						e = t.length,
						i = m.zeros(t.length, t[0].length);
					return (
						m.arange(e).forEach(function (n) {
							(r = m.arange(n).map(function (t) {
								return g.pow(i[n][t], 2);
							})),
								(i[n][n] = g.sqrt(t[n][n] - m.sum(r))),
								m.arange(n + 1, e).forEach(function (e) {
									(r = m.arange(n).map(function (t) {
										return i[n][t] * i[e][t];
									})),
										(i[e][n] = (t[n][e] - m.sum(r)) / i[n][n]);
								});
						}),
						i
					);
				},
				gauss_jacobi: function (t, e, n, r) {
					for (
						var i, o, s, a, u = 0, c = 0, l = t.length, h = [], f = [], p = [];
						u < l;
						u++
					)
						for (h[u] = [], f[u] = [], p[u] = [], c = 0; c < l; c++)
							c < u
								? ((h[u][c] = t[u][c]), (f[u][c] = p[u][c] = 0))
								: u < c
									? ((f[u][c] = t[u][c]), (h[u][c] = p[u][c] = 0))
									: ((p[u][c] = t[u][c]), (h[u][c] = f[u][c] = 0));
					for (
						s = m.multiply(m.multiply(m.inv(p), m.add(h, f)), -1),
							o = m.multiply(m.inv(p), e),
							i = n,
							a = m.add(m.multiply(s, n), o),
							u = 2;
						g.abs(m.norm(m.subtract(a, i))) > r;

					)
						(i = a), (a = m.add(m.multiply(s, i), o)), u++;
					return a;
				},
				gauss_seidel: function (t, e, n, r) {
					for (var i, o, s, a, u, c = 0, l = t.length, h = [], f = [], p = []; c < l; c++)
						for (h[c] = [], f[c] = [], p[c] = [], i = 0; i < l; i++)
							i < c
								? ((h[c][i] = t[c][i]), (f[c][i] = p[c][i] = 0))
								: c < i
									? ((f[c][i] = t[c][i]), (h[c][i] = p[c][i] = 0))
									: ((p[c][i] = t[c][i]), (h[c][i] = f[c][i] = 0));
					for (
						a = m.multiply(m.multiply(m.inv(m.add(p, h)), f), -1),
							s = m.multiply(m.inv(m.add(p, h)), e),
							o = n,
							u = m.add(m.multiply(a, n), s),
							c = 2;
						g.abs(m.norm(m.subtract(u, o))) > r;

					)
						(o = u), (u = m.add(m.multiply(a, o), s)), (c += 1);
					return u;
				},
				SOR: function (t, e, n, r, i) {
					for (var o, s, a, u, c, l = 0, h = t.length, f = [], p = [], d = []; l < h; l++)
						for (f[l] = [], p[l] = [], d[l] = [], o = 0; o < h; o++)
							o < l
								? ((f[l][o] = t[l][o]), (p[l][o] = d[l][o] = 0))
								: l < o
									? ((p[l][o] = t[l][o]), (f[l][o] = d[l][o] = 0))
									: ((d[l][o] = t[l][o]), (f[l][o] = p[l][o] = 0));
					for (
						u = m.multiply(
							m.inv(m.add(d, m.multiply(f, i))),
							m.subtract(m.multiply(d, 1 - i), m.multiply(p, i))
						),
							a = m.multiply(m.multiply(m.inv(m.add(d, m.multiply(f, i))), e), i),
							s = n,
							c = m.add(m.multiply(u, n), a),
							l = 2;
						g.abs(m.norm(m.subtract(c, s))) > r;

					)
						(s = c), (c = m.add(m.multiply(u, s), a)), l++;
					return c;
				},
				householder: function (t) {
					for (
						var e, n, r, i, o, s = t.length, a = t[0].length, u = 0, c = [];
						u < s - 1;
						u++
					) {
						for (n = 0, o = u + 1; o < a; o++) n += t[o][u] * t[o][u];
						for (
							n = (0 < t[u + 1][u] ? -1 : 1) * g.sqrt(n),
								r = g.sqrt((n * n - t[u + 1][u] * n) / 2),
								(c = m.zeros(s, 1))[u + 1][0] = (t[u + 1][u] - n) / (2 * r),
								i = u + 2;
							i < s;
							i++
						)
							c[i][0] = t[i][u] / (2 * r);
						(e = m.subtract(
							m.identity(s, a),
							m.multiply(m.multiply(c, m.transpose(c)), 2)
						)),
							(t = m.multiply(e, m.multiply(t, e)));
					}
					return t;
				},
				QR:
					((a = m.sum),
					(u = m.arange),
					function (e) {
						var t,
							n,
							r,
							i = e.length,
							o = e[0].length,
							s = m.zeros(o, o);
						for (e = m.copy(e), n = 0; n < o; n++) {
							for (
								s[n][n] = g.sqrt(
									a(
										u(i).map(function (t) {
											return e[t][n] * e[t][n];
										})
									)
								),
									t = 0;
								t < i;
								t++
							)
								e[t][n] = e[t][n] / s[n][n];
							for (r = n + 1; r < o; r++)
								for (
									s[n][r] = a(
										u(i).map(function (t) {
											return e[t][n] * e[t][r];
										})
									),
										t = 0;
									t < i;
									t++
								)
									e[t][r] = e[t][r] - e[t][n] * s[n][r];
						}
						return [e, s];
					}),
				lstsq: function (t, e) {
					var n = !1;
					void 0 === e[0].length &&
						((e = e.map(function (t) {
							return [t];
						})),
						(n = !0));
					var o,
						s,
						r = (i = m.QR(t))[0],
						i = i[1],
						t = t[0].length,
						r = m.slice(r, {
							col: {
								end: t
							}
						}),
						t = m.slice(i, {
							row: {
								end: t
							}
						}),
						t =
							((o = t),
							(t = (o = m.copy(o)).length),
							(s = m.identity(t)),
							m.arange(t - 1, -1, -1).forEach(function (i) {
								m.sliceAssign(
									s,
									{
										row: i
									},
									m.divide(
										m.slice(s, {
											row: i
										}),
										o[i][i]
									)
								),
									m.sliceAssign(
										o,
										{
											row: i
										},
										m.divide(
											m.slice(o, {
												row: i
											}),
											o[i][i]
										)
									),
									m.arange(i).forEach(function (t) {
										var e = m.multiply(o[t][i], -1),
											n = m.slice(o, {
												row: t
											}),
											r = m.multiply(
												m.slice(o, {
													row: i
												}),
												e
											);
										m.sliceAssign(
											o,
											{
												row: t
											},
											m.add(n, r)
										);
										(r = m.slice(s, {
											row: t
										})),
											(e = m.multiply(
												m.slice(s, {
													row: i
												}),
												e
											));
										m.sliceAssign(
											s,
											{
												row: t
											},
											m.add(r, e)
										);
									});
							}),
							s);
					return (
						void 0 === (r = m.transpose(r))[0].length && (r = [r]),
						void 0 === (e = m.multiply(m.multiply(t, r), e)).length && (e = [[e]]),
						n
							? e.map(function (t) {
									return t[0];
								})
							: e
					);
				},
				jacobi: function (t) {
					for (
						var e, n, r, i, o, s, a, u = 1, c = t.length, l = m.identity(c, c), h = [];
						1 === u;

					) {
						for (o = t[0][1], i = 1, e = r = 0; e < c; e++)
							for (n = 0; n < c; n++)
								e != n &&
									o < g.abs(t[e][n]) &&
									((o = g.abs(t[e][n])), (r = e), (i = n));
						for (
							s =
								t[r][r] === t[i][i]
									? 0 < t[r][i]
										? g.PI / 4
										: -g.PI / 4
									: g.atan((2 * t[r][i]) / (t[r][r] - t[i][i])) / 2,
								(a = m.identity(c, c))[r][r] = g.cos(s),
								a[r][i] = -g.sin(s),
								a[i][r] = g.sin(s),
								a[i][i] = g.cos(s),
								l = m.multiply(l, a),
								t = m.multiply(m.multiply(m.inv(a), t), a),
								u = 0,
								e = 1;
							e < c;
							e++
						)
							for (n = 1; n < c; n++) e != n && 0.001 < g.abs(t[e][n]) && (u = 1);
					}
					for (e = 0; e < c; e++) h.push(t[e][e]);
					return [l, h];
				},
				rungekutta: function (t, e, n, r, i, o) {
					var s, a, u;
					if (2 === o)
						for (; r <= n; )
							(i = i + ((s = e * t(r, i)) + (a = e * t(r + e, i + s))) / 2), (r += e);
					if (4 === o)
						for (; r <= n; )
							(i =
								i +
								((s = e * t(r, i)) +
									2 * (a = e * t(r + e / 2, i + s / 2)) +
									2 * (u = e * t(r + e / 2, i + a / 2)) +
									e * t(r + e, i + u)) /
									6),
								(r += e);
					return i;
				},
				romberg: function (t, e, n, r) {
					for (
						var i, o, s, a, u, c = 0, l = (n - e) / 2, h = [], f = [], p = [];
						c < r / 2;

					) {
						for (u = t(e), s = e, a = 0; s <= n; s += l, a++) h[a] = s;
						for (i = h.length, s = 1; s < i - 1; s++)
							u += (s % 2 != 0 ? 4 : 2) * t(h[s]);
						(u = (l / 3) * (u + t(n))), (p[c] = u), (l /= 2), c++;
					}
					for (o = p.length, i = 1; 1 !== o; ) {
						for (s = 0; s < o - 1; s++)
							f[s] = (g.pow(4, i) * p[s + 1] - p[s]) / (g.pow(4, i) - 1);
						(o = f.length), (p = f), (f = []), i++;
					}
					return p;
				},
				richardson: function (t, e, n, r) {
					function i(t, e) {
						for (var n, r = 0, i = t.length; r < i; r++) t[r] === e && (n = r);
						return n;
					}
					for (
						var o, s, a, u, c, l = g.abs(n - t[i(t, n) + 1]), h = 0, f = [], p = [];
						l <= r;

					)
						(o = i(t, n + r)),
							(s = i(t, n)),
							(f[h] = (e[o] - 2 * e[s] + e[2 * s - o]) / (r * r)),
							(r /= 2),
							h++;
					for (u = f.length, a = 1; 1 != u; ) {
						for (c = 0; c < u - 1; c++)
							p[c] = (g.pow(4, a) * f[c + 1] - f[c]) / (g.pow(4, a) - 1);
						(u = p.length), (f = p), (p = []), a++;
					}
					return f;
				},
				simpson: function (t, e, n, r) {
					for (
						var i, o = (n - e) / r, s = t(e), a = [], u = e, c = 0, l = 1;
						u <= n;
						u += o, c++
					)
						a[c] = u;
					for (i = a.length; l < i - 1; l++) s += (l % 2 != 0 ? 4 : 2) * t(a[l]);
					return (o / 3) * (s + t(n));
				},
				hermite: function (t, e, n, r) {
					for (
						var i, o = t.length, s = 0, a = 0, u = [], c = [], l = [], h = [];
						a < o;
						a++
					) {
						for (u[a] = 1, i = 0; i < o; i++)
							a != i && (u[a] *= (r - t[i]) / (t[a] - t[i]));
						for (i = c[a] = 0; i < o; i++) a != i && (c[a] += 1 / (t[a] - t[i]));
						(l[a] = (1 - 2 * (r - t[a]) * c[a]) * (u[a] * u[a])),
							(h[a] = (r - t[a]) * (u[a] * u[a])),
							(s += l[a] * e[a] + h[a] * n[a]);
					}
					return s;
				},
				lagrange: function (t, e, n) {
					for (var r, i, o = 0, s = 0, a = t.length; s < a; s++) {
						for (i = e[s], r = 0; r < a; r++)
							s != r && (i *= (n - t[r]) / (t[s] - t[r]));
						o += i;
					}
					return o;
				},
				cubic_spline: function (t, e, n) {
					for (
						var r,
							i,
							o = t.length,
							s = 0,
							a = [],
							u = [],
							c = [],
							l = [],
							h = [],
							f = [];
						s < o - 1;
						s++
					)
						l[s] = t[s + 1] - t[s];
					for (c[0] = 0, s = 1; s < o - 1; s++)
						c[s] = (3 / l[s]) * (e[s + 1] - e[s]) - (3 / l[s - 1]) * (e[s] - e[s - 1]);
					for (s = 1; s < o - 1; s++)
						(a[s] = []),
							(u[s] = []),
							(a[s][s - 1] = l[s - 1]),
							(a[s][s] = 2 * (l[s - 1] + l[s])),
							(a[s][s + 1] = l[s]),
							(u[s][0] = c[s]);
					for (i = m.multiply(m.inv(a), u), r = 0; r < o - 1; r++)
						(h[r] =
							(e[r + 1] - e[r]) / l[r] - (l[r] * (i[r + 1][0] + 2 * i[r][0])) / 3),
							(f[r] = (i[r + 1][0] - i[r][0]) / (3 * l[r]));
					for (r = 0; r < o && !(t[r] > n); r++);
					return (
						e[--r] +
						(n - t[r]) * h[r] +
						m.sq(n - t[r]) * i[r] +
						(n - t[r]) * m.sq(n - t[r]) * f[r]
					);
				},
				gauss_quadrature: function () {
					throw new Error("gauss_quadrature not yet implemented");
				},
				PCA: function (t) {
					for (
						var e,
							n,
							r,
							i,
							o,
							s,
							a = t.length,
							u = t[0].length,
							c = 0,
							l = [],
							h = [],
							f = [],
							p = [],
							d = [],
							g = [],
							c = 0;
						c < a;
						c++
					)
						l[c] = m.sum(t[c]) / u;
					for (c = 0; c < u; c++)
						for (p[c] = [], e = 0; e < a; e++) p[c][e] = t[e][c] - l[e];
					for (p = m.transpose(p), c = 0; c < a; c++)
						for (d[c] = [], e = 0; e < a; e++)
							d[c][e] = m.dot([p[c]], [p[e]]) / (u - 1);
					for (
						s = (r = m.jacobi(d))[0], h = r[1], g = m.transpose(s), c = 0;
						c < h.length;
						c++
					)
						for (e = c; e < h.length; e++)
							h[c] < h[e] &&
								((n = h[c]),
								(h[c] = h[e]),
								(h[e] = n),
								(i = g[c]),
								(g[c] = g[e]),
								(g[e] = i));
					for (o = m.transpose(p), c = 0; c < a; c++)
						for (f[c] = [], e = 0; e < o.length; e++) f[c][e] = m.dot([g[c]], [o[e]]);
					return [t, h, g, f];
				}
			}),
			(function (t) {
				for (var e = 0; e < t.length; e++)
					!(function (r) {
						m.fn[r] = function (t, e) {
							var n = this;
							return e
								? (setTimeout(function () {
										e.call(n, m.fn[r].call(n, t));
									}, 15),
									this)
								: "number" == typeof m[r](this, t)
									? m[r](this, t)
									: m(m[r](this, t));
						};
					})(t[e]);
			})("add divide multiply subtract dot pow exp log abs norm angle".split(" ")),
			(c = f),
			(l = Math),
			(h = [].slice),
			(s = c.utils.isNumber),
			(n = c.utils.isArray),
			c.extend({
				zscore: function () {
					var t = h.call(arguments);
					return s(t[1])
						? (t[0] - t[1]) / t[2]
						: (t[0] - c.mean(t[1])) / c.stdev(t[1], t[2]);
				},
				ztest: function () {
					var t,
						e = h.call(arguments);
					return n(e[1])
						? ((t = c.zscore(e[0], e[1], e[3])),
							1 === e[2]
								? c.normal.cdf(-l.abs(t), 0, 1)
								: 2 * c.normal.cdf(-l.abs(t), 0, 1))
						: 2 < e.length
							? ((t = c.zscore(e[0], e[1], e[2])),
								1 === e[3]
									? c.normal.cdf(-l.abs(t), 0, 1)
									: 2 * c.normal.cdf(-l.abs(t), 0, 1))
							: ((t = e[0]),
								1 === e[1]
									? c.normal.cdf(-l.abs(t), 0, 1)
									: 2 * c.normal.cdf(-l.abs(t), 0, 1));
				}
			}),
			c.extend(c.fn, {
				zscore: function (t, e) {
					return (t - this.mean()) / this.stdev(e);
				},
				ztest: function (t, e, n) {
					n = l.abs(this.zscore(t, n));
					return 1 === e ? c.normal.cdf(-n, 0, 1) : 2 * c.normal.cdf(-n, 0, 1);
				}
			}),
			c.extend({
				tscore: function () {
					var t = h.call(arguments);
					return 4 === t.length
						? (t[0] - t[1]) / (t[2] / l.sqrt(t[3]))
						: (t[0] - c.mean(t[1])) / (c.stdev(t[1], !0) / l.sqrt(t[1].length));
				},
				ttest: function () {
					var t,
						e = h.call(arguments);
					return 5 === e.length
						? ((t = l.abs(c.tscore(e[0], e[1], e[2], e[3]))),
							1 === e[4]
								? c.studentt.cdf(-t, e[3] - 1)
								: 2 * c.studentt.cdf(-t, e[3] - 1))
						: s(e[1])
							? ((t = l.abs(e[0])),
								1 == e[2]
									? c.studentt.cdf(-t, e[1] - 1)
									: 2 * c.studentt.cdf(-t, e[1] - 1))
							: ((t = l.abs(c.tscore(e[0], e[1]))),
								1 == e[2]
									? c.studentt.cdf(-t, e[1].length - 1)
									: 2 * c.studentt.cdf(-t, e[1].length - 1));
				}
			}),
			c.extend(c.fn, {
				tscore: function (t) {
					return (t - this.mean()) / (this.stdev(!0) / l.sqrt(this.cols()));
				},
				ttest: function (t, e) {
					return 1 === e
						? 1 - c.studentt.cdf(l.abs(this.tscore(t)), this.cols() - 1)
						: 2 * c.studentt.cdf(-l.abs(this.tscore(t)), this.cols() - 1);
				}
			}),
			c.extend({
				anovafscore: function () {
					var t,
						e,
						n,
						r,
						i,
						o,
						s,
						a,
						u = h.call(arguments);
					if (1 === u.length) {
						for (i = new Array(u[0].length), s = 0; s < u[0].length; s++)
							i[s] = u[0][s];
						u = i;
					}
					for (e = new Array(), s = 0; s < u.length; s++) e = e.concat(u[s]);
					for (n = c.mean(e), s = t = 0; s < u.length; s++)
						t += u[s].length * l.pow(c.mean(u[s]) - n, 2);
					for (t /= u.length - 1, s = o = 0; s < u.length; s++)
						for (r = c.mean(u[s]), a = 0; a < u[s].length; a++)
							o += l.pow(u[s][a] - r, 2);
					return t / (o /= e.length - u.length);
				},
				anovaftest: function () {
					var t,
						e = h.call(arguments);
					if (s(e[0])) return 1 - c.centralF.cdf(e[0], e[1], e[2]);
					for (
						var n = c.anovafscore(e), r = e.length - 1, i = 0, o = 0;
						o < e.length;
						o++
					)
						i += e[o].length;
					return (t = i - r - 1), 1 - c.centralF.cdf(n, r, t);
				},
				ftest: function (t, e, n) {
					return 1 - c.centralF.cdf(t, e, n);
				}
			}),
			c.extend(c.fn, {
				anovafscore: function () {
					return c.anovafscore(this.toArray());
				},
				anovaftes: function () {
					for (var t = 0, e = 0; e < this.length; e++) t += this[e].length;
					return c.ftest(this.anovafscore(), this.length - 1, t - this.length);
				}
			}),
			c.extend({
				qscore: function () {
					var t,
						e,
						n,
						r,
						i = h.call(arguments),
						i = s(i[0])
							? ((t = i[0]), (e = i[1]), (n = i[2]), (r = i[3]), i[4])
							: ((t = c.mean(i[0])),
								(e = c.mean(i[1])),
								(n = i[0].length),
								(r = i[1].length),
								i[2]);
					return l.abs(t - e) / (i * l.sqrt((1 / n + 1 / r) / 2));
				},
				qtest: function () {
					var t,
						e = h.call(arguments),
						n = (e =
							3 === e.length
								? ((t = e[0]), e.slice(1))
								: 7 === e.length
									? ((t = c.qscore(e[0], e[1], e[2], e[3], e[4])), e.slice(5))
									: ((t = c.qscore(e[0], e[1], e[2])), e.slice(3)))[0],
						e = e[1];
					return 1 - c.tukey.cdf(t, e, n - e);
				},
				tukeyhsd: function (t) {
					for (
						var e = c.pooledstdev(t),
							n = t.map(function (t) {
								return c.mean(t);
							}),
							r = t.reduce(function (t, e) {
								return t + e.length;
							}, 0),
							i = [],
							o = 0;
						o < t.length;
						++o
					)
						for (var s = o + 1; s < t.length; ++s) {
							var a = c.qtest(n[o], n[s], t[o].length, t[s].length, e, r, t.length);
							i.push([[o, s], a]);
						}
					return i;
				}
			}),
			c.extend({
				normalci: function () {
					var t = h.call(arguments),
						e = new Array(2),
						n =
							4 === t.length
								? l.abs((c.normal.inv(t[1] / 2, 0, 1) * t[2]) / l.sqrt(t[3]))
								: l.abs(
										(c.normal.inv(t[1] / 2, 0, 1) * c.stdev(t[2])) /
											l.sqrt(t[2].length)
									);
					return (e[0] = t[0] - n), (e[1] = t[0] + n), e;
				},
				tci: function () {
					var t = h.call(arguments),
						e = new Array(2),
						n =
							4 === t.length
								? l.abs((c.studentt.inv(t[1] / 2, t[3] - 1) * t[2]) / l.sqrt(t[3]))
								: l.abs(
										(c.studentt.inv(t[1] / 2, t[2].length - 1) *
											c.stdev(t[2], !0)) /
											l.sqrt(t[2].length)
									);
					return (e[0] = t[0] - n), (e[1] = t[0] + n), e;
				},
				significant: function (t, e) {
					return t < e;
				}
			}),
			c.extend(c.fn, {
				normalci: function (t, e) {
					return c.normalci(t, e, this.toArray());
				},
				tci: function (t, e) {
					return c.tci(t, e, this.toArray());
				}
			}),
			c.extend(c.fn, {
				oneSidedDifferenceOfProportions: function (t, e, n, r) {
					r = b(t, e, n, r);
					return c.ztest(r, 1);
				},
				twoSidedDifferenceOfProportions: function (t, e, n, r) {
					r = b(t, e, n, r);
					return c.ztest(r, 2);
				}
			}),
			(f.models = {
				ols: function (t, e) {
					var n = w(t, e),
						r = C(n),
						t = {
							F_statistic: (t = (i = n).R2 / i.df_model / ((1 - i.R2) / i.df_resid)),
							pvalue:
								1 -
								((e = t),
								(t = i.df_model),
								(i = i.df_resid),
								f.beta.cdf(e / (i / t + e), t / 2, i / 2))
						},
						i = 1 - (1 - n.R2) * ((n.nobs - 1) / n.df_resid);
					return (n.t = r), (n.f = t), (n.adjust_R2 = i), n;
				}
			}),
			f.extend({
				buildxmatrix: function () {
					for (var t = new Array(arguments.length), e = 0; e < arguments.length; e++)
						t[e] = [1].concat(arguments[e]);
					return f(t);
				},
				builddxmatrix: function (t) {
					for (var e = new Array(t.length), n = 0; n < t.length; n++)
						e[n] = [1].concat(t[n]);
					return f(e);
				},
				buildjxmatrix: function (t) {
					for (var e = new Array(t.length), n = 0; n < t.length; n++) e[n] = t[n];
					return f.builddxmatrix(e);
				},
				buildymatrix: function (t) {
					return f(t).transpose();
				},
				buildjymatrix: function (t) {
					return t.transpose();
				},
				matrixmult: function (t, e) {
					var n, r, i, o, s;
					if (t.cols() == e.rows()) {
						if (1 < e.rows()) {
							for (o = [], n = 0; n < t.rows(); n++)
								for (o[n] = [], r = 0; r < e.cols(); r++) {
									for (i = s = 0; i < t.cols(); i++)
										s += t.toArray()[n][i] * e.toArray()[i][r];
									o[n][r] = s;
								}
							return f(o);
						}
						for (o = [], n = 0; n < t.rows(); n++)
							for (o[n] = [], r = 0; r < e.cols(); r++) {
								for (i = s = 0; i < t.cols(); i++)
									s += t.toArray()[n][i] * e.toArray()[r];
								o[n][r] = s;
							}
						return f(o);
					}
				},
				regress: function (t, e) {
					var n = f.xtranspxinv(t),
						t = t.transpose(),
						t = f.matrixmult(f(n), t);
					return f.matrixmult(t, e);
				},
				regresst: function (t, e, n) {
					var r = f.regress(t, e),
						i = {
							anova: {}
						},
						o = f.jMatYBar(t, r);
					i.yBar = o;
					var s = e.mean();
					(i.anova.residuals = f.residuals(e, o)),
						(i.anova.ssr = f.ssr(o, s)),
						(i.anova.msr = i.anova.ssr / (t[0].length - 1)),
						(i.anova.sse = f.sse(e, o)),
						(i.anova.mse = i.anova.sse / (e.length - (t[0].length - 1) - 1)),
						(i.anova.sst = f.sst(e, s)),
						(i.anova.mst = i.anova.sst / (e.length - 1)),
						(i.anova.r2 = 1 - i.anova.sse / i.anova.sst),
						i.anova.r2 < 0 && (i.anova.r2 = 0),
						(i.anova.fratio = i.anova.msr / i.anova.mse),
						(i.anova.pvalue = f.anovaftest(
							i.anova.fratio,
							t[0].length - 1,
							e.length - (t[0].length - 1) - 1
						)),
						(i.anova.rmse = Math.sqrt(i.anova.mse)),
						(i.anova.r2adj = 1 - i.anova.mse / i.anova.mst),
						i.anova.r2adj < 0 && (i.anova.r2adj = 0),
						(i.stats = new Array(t[0].length));
					for (var a, u, c, l = f.xtranspxinv(t), h = 0; h < r.length; h++)
						(a = Math.sqrt(i.anova.mse * Math.abs(l[h][h]))),
							(u = Math.abs(r[h] / a)),
							(c = f.ttest(u, e.length - t[0].length - 1, n)),
							(i.stats[h] = [r[h], a, u, c]);
					return (i.regress = r), i;
				},
				xtranspx: function (t) {
					return f.matrixmult(t.transpose(), t);
				},
				xtranspxinv: function (t) {
					t = f.matrixmult(t.transpose(), t);
					return f.inv(t);
				},
				jMatYBar: function (t, e) {
					e = f.matrixmult(t, e);
					return new f(e);
				},
				residuals: function (t, e) {
					return f.matrixsubtract(t, e);
				},
				ssr: function (t, e) {
					for (var n = 0, r = 0; r < t.length; r++) n += Math.pow(t[r] - e, 2);
					return n;
				},
				sse: function (t, e) {
					for (var n = 0, r = 0; r < t.length; r++) n += Math.pow(t[r] - e[r], 2);
					return n;
				},
				sst: function (t, e) {
					for (var n = 0, r = 0; r < t.length; r++) n += Math.pow(t[r] - e, 2);
					return n;
				},
				matrixsubtract: function (t, e) {
					for (var n = new Array(t.length), r = 0; r < t.length; r++) {
						n[r] = new Array(t[r].length);
						for (var i = 0; i < t[r].length; i++) n[r][i] = t[r][i] - e[r][i];
					}
					return f(n);
				}
			}),
			(f.jStat = f)
		);
	});
var CryptoApi = (function (n) {
	var r = {};
	function i(t) {
		if (r[t]) return r[t].exports;
		var e = (r[t] = {
			i: t,
			l: !1,
			exports: {}
		});
		return n[t].call(e.exports, e, e.exports, i), (e.l = !0), e.exports;
	}
	return (
		(i.m = n),
		(i.c = r),
		(i.d = function (t, e, n) {
			i.o(t, e) ||
				Object.defineProperty(t, e, {
					enumerable: !0,
					get: n
				});
		}),
		(i.r = function (t) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, {
					value: "Module"
				}),
				Object.defineProperty(t, "__esModule", {
					value: !0
				});
		}),
		(i.t = function (e, t) {
			if ((1 & t && (e = i(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var n = Object.create(null);
			if (
				(i.r(n),
				Object.defineProperty(n, "default", {
					enumerable: !0,
					value: e
				}),
				2 & t && "string" != typeof e)
			)
				for (var r in e)
					i.d(
						n,
						r,
						function (t) {
							return e[t];
						}.bind(null, r)
					);
			return n;
		}),
		(i.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
						}
					: function () {
							return t;
						};
			return i.d(e, "a", e), e;
		}),
		(i.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(i.p = ""),
		i((i.s = 29))
	);
})([
	function (t, e, n) {
		"use strict";
		function r(t, e) {
			return (t << e) | (t >>> (32 - e)) | 0;
		}
		function i(t, e) {
			return (t >>> e) | (t << (32 - e)) | 0;
		}
		function o(t, e, n) {
			return 32 === n
				? e
				: 32 < n
					? o(e, t, n - 32)
					: 4294967295 & ((t >>> n) | (e << (32 - n)));
		}
		function s(t, e, n) {
			return 32 === n
				? t
				: 32 < n
					? s(e, t, n - 32)
					: 4294967295 & ((e >>> n) | (t << (32 - n)));
		}
		n.d(e, "a", function () {
			return r;
		}),
			n.d(e, "b", function () {
				return i;
			}),
			n.d(e, "d", function () {
				return s;
			}),
			n.d(e, "c", function () {
				return o;
			});
	},
	function (t, e, n) {
		"use strict";
		function r(t) {
			for (var e = "", n = 0, r = t.length; n < r; n++) {
				var i = t.charCodeAt(n);
				i < 128
					? (e += String.fromCharCode(i))
					: (i < 2048
							? (e += String.fromCharCode(192 | (i >> 6)))
							: (i < 55296 || 57344 <= i
									? (e += String.fromCharCode(224 | (i >> 12)))
									: (n++,
										(i =
											65536 +
											(((1023 & i) << 10) | (1023 & t.charCodeAt(n)))),
										(e += String.fromCharCode(240 | (i >> 18))),
										(e += String.fromCharCode(128 | ((i >> 12) & 63)))),
								(e += String.fromCharCode(128 | ((i >> 6) & 63)))),
						(e += String.fromCharCode(128 | (63 & i))));
			}
			return e;
		}
		n.d(e, "a", function () {
			return r;
		});
	},
	function (t, e, n) {
		"use strict";
		function r(t) {
			for (var e = "", n = 0, r = t.length; n < r; n++)
				e += (t.charCodeAt(n) < 16 ? "0" : "") + t.charCodeAt(n).toString(16);
			return e;
		}
		n.d(e, "a", function () {
			return r;
		});
	},
	function (t, e, n) {
		"use strict";
		function r(t) {
			return (r =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function i(t) {
			return (i = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function o(t, e) {
			return (o =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			})),
				e && o(t, e);
		})(s, n(4).a),
			(function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(s.prototype, [
				{
					key: "process",
					value: function () {
						for (; this.state.message.length >= this.blockSizeInBytes; ) {
							this.blockUnits = [];
							for (var t = 0; t < this.blockSizeInBytes; t += 4)
								this.blockUnits.push(
									(this.state.message.charCodeAt(t) << 24) |
										(this.state.message.charCodeAt(t + 1) << 16) |
										(this.state.message.charCodeAt(t + 2) << 8) |
										this.state.message.charCodeAt(t + 3)
								);
							(this.state.message = this.state.message.substr(this.blockSizeInBytes)),
								this.processBlock(this.blockUnits);
						}
					}
				},
				{
					key: "processBlock",
					value: function (t) {}
				},
				{
					key: "getStateHash",
					value: function (t) {
						t = t || this.state.hash.length;
						for (var e = "", n = 0; n < t; n++)
							e +=
								String.fromCharCode((this.state.hash[n] >> 24) & 255) +
								String.fromCharCode((this.state.hash[n] >> 16) & 255) +
								String.fromCharCode((this.state.hash[n] >> 8) & 255) +
								String.fromCharCode(255 & this.state.hash[n]);
						return e;
					}
				},
				{
					key: "addLengthBits",
					value: function () {
						this.state.message +=
							"\0\0\0" +
							String.fromCharCode((this.state.length >> 29) & 255) +
							String.fromCharCode((this.state.length >> 21) & 255) +
							String.fromCharCode((this.state.length >> 13) & 255) +
							String.fromCharCode((this.state.length >> 5) & 255) +
							String.fromCharCode((this.state.length << 3) & 255);
					}
				}
			]),
			(n = s);
		function s(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = i(s).call(this, t)) || ("object" !== r(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).unitOrder = 1),
				(t.blockUnits = []),
				t
			);
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		var r =
			((function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(i.prototype, [
				{
					key: "reset",
					value: function () {
						(this.state = {}), (this.state.message = ""), (this.state.length = 0);
					}
				},
				{
					key: "getState",
					value: function () {
						return JSON.parse(JSON.stringify(this.state));
					}
				},
				{
					key: "setState",
					value: function (t) {
						this.state = t;
					}
				},
				{
					key: "update",
					value: function (t) {
						(this.state.message += t), (this.state.length += t.length), this.process();
					}
				},
				{
					key: "process",
					value: function () {}
				},
				{
					key: "finalize",
					value: function () {
						return "";
					}
				},
				{
					key: "getStateHash",
					value: function (t) {
						return "";
					}
				},
				{
					key: "addPaddingPKCS7",
					value: function (t) {
						this.state.message += new Array(t + 1).join(String.fromCharCode(t));
					}
				},
				{
					key: "addPaddingISO7816",
					value: function (t) {
						this.state.message += "" + new Array(t).join("\0");
					}
				},
				{
					key: "addPaddingZero",
					value: function (t) {
						this.state.message += new Array(t + 1).join("\0");
					}
				}
			]),
			i);
		function i(t) {
			!(function (t) {
				if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
			})(this),
				(this.unitSize = 4),
				(this.unitOrder = 0),
				(this.blockSize = 16),
				(this.blockSizeInBytes = this.blockSize * this.unitSize),
				(this.options = t || {}),
				this.reset();
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		function r(t) {
			return (r =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function i(t) {
			return (i = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function o(t, e) {
			return (o =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			})),
				e && o(t, e);
		})(s, n(4).a),
			(function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(s.prototype, [
				{
					key: "process",
					value: function () {
						for (; this.state.message.length >= this.blockSizeInBytes; ) {
							this.blockUnits = [];
							for (var t = 0; t < this.blockSizeInBytes; t += 4)
								this.blockUnits.push(
									this.state.message.charCodeAt(t) |
										(this.state.message.charCodeAt(t + 1) << 8) |
										(this.state.message.charCodeAt(t + 2) << 16) |
										(this.state.message.charCodeAt(t + 3) << 24)
								);
							(this.state.message = this.state.message.substr(this.blockSizeInBytes)),
								this.processBlock(this.blockUnits);
						}
					}
				},
				{
					key: "processBlock",
					value: function (t) {}
				},
				{
					key: "getStateHash",
					value: function (t) {
						t = t || this.state.hash.length;
						for (var e = "", n = 0; n < t; n++)
							e +=
								String.fromCharCode(255 & this.state.hash[n]) +
								String.fromCharCode((this.state.hash[n] >> 8) & 255) +
								String.fromCharCode((this.state.hash[n] >> 16) & 255) +
								String.fromCharCode((this.state.hash[n] >> 24) & 255);
						return e;
					}
				},
				{
					key: "addLengthBits",
					value: function () {
						this.state.message +=
							String.fromCharCode((this.state.length << 3) & 255) +
							String.fromCharCode((this.state.length >> 5) & 255) +
							String.fromCharCode((this.state.length >> 13) & 255) +
							String.fromCharCode((this.state.length >> 21) & 255) +
							String.fromCharCode((this.state.length >> 29) & 255) +
							"\0\0\0";
					}
				}
			]),
			(n = s);
		function s(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = i(s).call(this, t)) || ("object" !== r(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).blockUnits = []),
				t
			);
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		var r = n(3),
			E = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e, n) {
			return (o =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = s(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function s(t) {
			return (s = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function a(t, e) {
			return (a =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var T = [
				1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573,
				2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579,
				2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278,
				1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113,
				2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
				944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
				1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882,
				3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956,
				3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
				168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485,
				1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350,
				1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273,
				3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804,
				1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752,
				506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571,
				3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899,
				1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424,
				442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
				3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606,
				3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270,
				289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971,
				1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158,
				1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591
			],
			r =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && a(t, e);
				})(u, r.a),
				(r = [
					{
						key: "reset",
						value: function () {
							switch (
								(o(s(u.prototype), "reset", this).call(this), this.options.length)
							) {
								case 384:
									this.state.hash = [
										-876896931, -1056596264, 1654270250, 914150663, -1856437926,
										812702999, 355462360, -150054599, 1731405415, -4191439,
										-1900787065, 1750603025, -619958771, 1694076839, 1203062813,
										-1090891868
									];
									break;
								case 512:
									this.state.hash = [
										1779033703, -205731576, -1150833019, -2067093701,
										1013904242, -23791573, -1521486534, 1595750129, 1359893119,
										-1377402159, -1694144372, 725511199, 528734635, -79577749,
										1541459225, 327033209
									];
									break;
								default:
									for (var t = new u(), e = 0; e < 16; e++)
										t.state.hash[e] = 2779096485 ^ t.state.hash[e];
									t.update("SHA-512/" + this.options.length);
									var n = t.finalize();
									this.state.hash = [];
									for (var r = 0; r < 64; r += 4)
										this.state.hash.push(
											(n.charCodeAt(r) << 24) |
												(n.charCodeAt(r + 1) << 16) |
												(n.charCodeAt(r + 2) << 8) |
												n.charCodeAt(r + 3)
										);
							}
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							for (
								var e,
									n,
									r,
									i,
									o = this.state.hash[0],
									s = this.state.hash[1],
									a = this.state.hash[2],
									u = this.state.hash[3],
									c = this.state.hash[4],
									l = this.state.hash[5],
									h = this.state.hash[6],
									f = this.state.hash[7],
									p = this.state.hash[8],
									d = this.state.hash[9],
									g = this.state.hash[10],
									m = this.state.hash[11],
									v = this.state.hash[12],
									y = this.state.hash[13],
									b = this.state.hash[14],
									w = this.state.hash[15],
									_ = 0;
								_ < this.options.rounds;
								_ += 2
							) {
								_ < 32
									? ((this.W[_] = t[_]), (this.W[_ + 1] = t[_ + 1]))
									: ((e =
											Object(E.c)(this.W[_ - 30], this.W[_ - 29], 1) ^
											Object(E.c)(this.W[_ - 30], this.W[_ - 29], 8) ^
											(this.W[_ - 30] >>> 7)),
										(n =
											Object(E.d)(this.W[_ - 30], this.W[_ - 29], 1) ^
											Object(E.d)(this.W[_ - 30], this.W[_ - 29], 8) ^
											((this.W[_ - 29] >>> 7) | (this.W[_ - 30] << 25))),
										(r =
											Object(E.c)(this.W[_ - 4], this.W[_ - 3], 19) ^
											Object(E.c)(this.W[_ - 4], this.W[_ - 3], 61) ^
											(this.W[_ - 4] >>> 6)),
										(i =
											Object(E.d)(this.W[_ - 4], this.W[_ - 3], 19) ^
											Object(E.d)(this.W[_ - 4], this.W[_ - 3], 61) ^
											((this.W[_ - 3] >>> 6) | (this.W[_ - 4] << 26))),
										(S =
											((65535 & this.W[_ - 13]) +
												(65535 & this.W[_ - 31]) +
												(65535 & n) +
												(65535 & i)) |
											0),
										(O =
											((this.W[_ - 13] >>> 16) +
												(this.W[_ - 31] >>> 16) +
												(n >>> 16) +
												(i >>> 16) +
												(S >>> 16)) |
											0),
										(k =
											((65535 & this.W[_ - 14]) +
												(65535 & this.W[_ - 32]) +
												(65535 & e) +
												(65535 & r) +
												(O >>> 16)) |
											0),
										(C =
											((this.W[_ - 14] >>> 16) +
												(this.W[_ - 32] >>> 16) +
												(e >>> 16) +
												(r >>> 16) +
												(k >>> 16)) |
											0),
										(this.W[_] = 4294967295 & ((C << 16) | (65535 & k))),
										(this.W[_ + 1] = 4294967295 & ((O << 16) | (65535 & S)))),
									(e =
										Object(E.c)(o, s, 28) ^
										Object(E.c)(o, s, 34) ^
										Object(E.c)(o, s, 39)),
									(n =
										Object(E.d)(o, s, 28) ^
										Object(E.d)(o, s, 34) ^
										Object(E.d)(o, s, 39));
								var x = (d & m) ^ (~d & y),
									C = (o & a) ^ (o & c) ^ (a & c),
									k = (s & u) ^ (s & l) ^ (u & l),
									S =
										((S =
											((S =
												(b +
													(r =
														Object(E.c)(p, d, 14) ^
														Object(E.c)(p, d, 18) ^
														Object(E.c)(p, d, 41)) +
													((O =
														(w +
															(i =
																Object(E.d)(p, d, 14) ^
																Object(E.d)(p, d, 18) ^
																Object(E.d)(p, d, 41))) |
														0) >>>
														0 <
													w >>> 0
														? 1
														: 0)) |
												0) +
												((p & g) ^ (~p & v)) +
												((O = (O + x) | 0) >>> 0 < x >>> 0 ? 1 : 0)) |
											0) +
											T[_] +
											((O = (O + T[_ + 1]) | 0) >>> 0 < T[_ + 1] >>> 0
												? 1
												: 0)) |
										0,
									O = (O + this.W[_ + 1]) | 0,
									k = (n + k) | 0,
									b = v,
									w = y,
									v = g,
									y = m,
									g = p,
									m = d,
									p =
										(h +
											(S =
												(S +
													this.W[_] +
													(O >>> 0 < this.W[_ + 1] >>> 0 ? 1 : 0)) |
												0) +
											((d = (f + O) | 0) >>> 0 < f >>> 0 ? 1 : 0)) |
										0,
									h = c,
									f = l,
									c = a,
									l = u,
									a = o,
									u = s,
									o =
										(S +
											((e + C + (k >>> 0 < n >>> 0 ? 1 : 0)) | 0) +
											((s = (O + k) | 0) >>> 0 < O >>> 0 ? 1 : 0)) |
										0;
							}
							(this.state.hash[1] = (this.state.hash[1] + s) | 0),
								(this.state.hash[0] =
									(this.state.hash[0] +
										o +
										(this.state.hash[1] >>> 0 < s >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[3] = (this.state.hash[3] + u) | 0),
								(this.state.hash[2] =
									(this.state.hash[2] +
										a +
										(this.state.hash[3] >>> 0 < u >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[5] = (this.state.hash[5] + l) | 0),
								(this.state.hash[4] =
									(this.state.hash[4] +
										c +
										(this.state.hash[5] >>> 0 < l >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[7] = (this.state.hash[7] + f) | 0),
								(this.state.hash[6] =
									(this.state.hash[6] +
										h +
										(this.state.hash[7] >>> 0 < f >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[9] = (this.state.hash[9] + d) | 0),
								(this.state.hash[8] =
									(this.state.hash[8] +
										p +
										(this.state.hash[9] >>> 0 < d >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[11] = (this.state.hash[11] + m) | 0),
								(this.state.hash[10] =
									(this.state.hash[10] +
										g +
										(this.state.hash[11] >>> 0 < m >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[13] = (this.state.hash[13] + y) | 0),
								(this.state.hash[12] =
									(this.state.hash[12] +
										v +
										(this.state.hash[13] >>> 0 < y >>> 0 ? 1 : 0)) |
									0),
								(this.state.hash[15] = (this.state.hash[15] + w) | 0),
								(this.state.hash[14] =
									(this.state.hash[14] +
										b +
										(this.state.hash[15] >>> 0 < w >>> 0 ? 1 : 0)) |
									0);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 112
										? (112 - this.state.message.length) | 0
										: (240 - this.state.message.length) | 0
								),
								(this.state.message += "\0\0\0\0\0\0\0\0"),
								this.addLengthBits(),
								this.process(),
								this.getStateHash((this.options.length / 32) | 0)
							);
						}
					}
				]),
				(function (t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
							Object.defineProperty(t, r.key, r);
					}
				})(u.prototype, r),
				u);
		function u(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof u)) throw new TypeError("Cannot call a class as a function");
				})(this),
				((t = t || {}).length = t.length || 512),
				(t.rounds = t.rounds || 160),
				(e = this),
				((t =
					!(t = s(u).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).blockSize = 32),
				(t.blockSizeInBytes = t.blockSize * t.unitSize),
				(t.W = new Array(160)),
				t
			);
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		var r = n(3),
			f = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e, n) {
			return (o =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = s(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function s(t) {
			return (s = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function a(t, e) {
			return (a =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var p = [
				1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748,
				2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206,
				2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
				1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
				3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372,
				1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
				3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734,
				506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
				1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479,
				3329325298
			],
			r =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && a(t, e);
				})(u, r.a),
				(function (t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
							Object.defineProperty(t, r.key, r);
					}
				})(u.prototype, [
					{
						key: "reset",
						value: function () {
							224 ===
							(o(s(u.prototype), "reset", this).call(this), this.options.length)
								? (this.state.hash = [
										-1056596264, 914150663, 812702999, -150054599, -4191439,
										1750603025, 1694076839, -1090891868
									])
								: (this.state.hash = [
										1779033703, -1150833019, 1013904242, -1521486534,
										1359893119, -1694144372, 528734635, 1541459225
									]);
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = 0 | this.state.hash[5],
									a = 0 | this.state.hash[6],
									u = 0 | this.state.hash[7],
									c = 0;
								c < this.options.rounds;
								c++
							) {
								this.W[c] =
									c < 16
										? 0 | t[c]
										: (this.W[c - 16] +
												(Object(f.b)(this.W[c - 15], 7) ^
													Object(f.b)(this.W[c - 15], 18) ^
													(this.W[c - 15] >>> 3)) +
												this.W[c - 7] +
												(Object(f.b)(this.W[c - 2], 17) ^
													Object(f.b)(this.W[c - 2], 19) ^
													(this.W[c - 2] >>> 10))) |
											0;
								var l =
										(u +
											(Object(f.b)(o, 6) ^
												Object(f.b)(o, 11) ^
												Object(f.b)(o, 25)) +
											((o & s) ^ (~o & a)) +
											p[c] +
											this.W[c]) |
										0,
									h =
										((Object(f.b)(e, 2) ^
											Object(f.b)(e, 13) ^
											Object(f.b)(e, 22)) +
											((e & n) ^ (e & r) ^ (n & r))) |
										0,
									u = a,
									a = s,
									s = o,
									o = (i + l) | 0,
									i = r,
									r = n,
									n = e,
									e = (l + h) | 0;
							}
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
								(this.state.hash[1] = (this.state.hash[1] + n) | 0),
								(this.state.hash[2] = (this.state.hash[2] + r) | 0),
								(this.state.hash[3] = (this.state.hash[3] + i) | 0),
								(this.state.hash[4] = (this.state.hash[4] + o) | 0),
								(this.state.hash[5] = (this.state.hash[5] + s) | 0),
								(this.state.hash[6] = (this.state.hash[6] + a) | 0),
								(this.state.hash[7] = (this.state.hash[7] + u) | 0);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 56
										? (56 - this.state.message.length) | 0
										: (120 - this.state.message.length) | 0
								),
								this.addLengthBits(),
								this.process(),
								this.getStateHash((this.options.length / 32) | 0)
							);
						}
					}
				]),
				u);
		function u(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof u)) throw new TypeError("Cannot call a class as a function");
				})(this),
				((t = t || {}).length = t.length || 256),
				(t.rounds = t.rounds || 64),
				(e = this),
				((t =
					!(t = s(u).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).W = new Array(64)),
				t
			);
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		var r = n(5),
			d = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				(r.enumerable = r.enumerable || !1),
					(r.configurable = !0),
					"value" in r && (r.writable = !0),
					Object.defineProperty(t, r.key, r);
			}
		}
		function s(t, e, n) {
			return (s =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = a(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function a(t) {
			return (a = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function u(t, e) {
			return (u =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var g = [
				0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12,
				0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9,
				11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3,
				8, 11, 6, 15, 13
			],
			m = [
				5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14,
				15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6,
				4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13,
				14, 0, 3, 9, 11
			],
			v = [
				11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15,
				7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
				11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12,
				5, 12, 13, 14, 11, 8, 5, 6
			],
			y = [
				8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11,
				7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
				15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6,
				8, 13, 6, 5, 15, 13, 11, 11
			],
			n =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && u(t, e);
				})(b, r.a),
				(n = [
					{
						key: "F",
						value: function (t, e, n) {
							return t ^ e ^ n;
						}
					},
					{
						key: "G",
						value: function (t, e, n) {
							return (t & e) | (~t & n);
						}
					},
					{
						key: "H",
						value: function (t, e, n) {
							return (t | ~e) ^ n;
						}
					},
					{
						key: "I",
						value: function (t, e, n) {
							return (t & n) | (e & ~n);
						}
					},
					{
						key: "J",
						value: function (t, e, n) {
							return t ^ (e | ~n);
						}
					},
					{
						key: "T",
						value: function (t, e, n, r) {
							return t < 16
								? this.F(e, n, r)
								: t < 32
									? (this.G(e, n, r) + 1518500249) | 0
									: t < 48
										? (this.H(e, n, r) + 1859775393) | 0
										: t < 64
											? (this.I(e, n, r) + 2400959708) | 0
											: (this.J(e, n, r) + 2840853838) | 0;
						}
					},
					{
						key: "T64",
						value: function (t, e, n, r) {
							return t < 16
								? (this.I(e, n, r) + 1352829926) | 0
								: t < 32
									? (this.H(e, n, r) + 1548603684) | 0
									: t < 48
										? (this.G(e, n, r) + 1836072691) | 0
										: this.F(e, n, r);
						}
					},
					{
						key: "T80",
						value: function (t, e, n, r) {
							return t < 16
								? (this.J(e, n, r) + 1352829926) | 0
								: t < 32
									? (this.I(e, n, r) + 1548603684) | 0
									: t < 48
										? (this.H(e, n, r) + 1836072691) | 0
										: t < 64
											? (this.G(e, n, r) + 2053994217) | 0
											: this.F(e, n, r);
						}
					}
				]),
				o((r = b).prototype, [
					{
						key: "reset",
						value: function () {
							switch (
								(s(a(b.prototype), "reset", this).call(this), this.options.length)
							) {
								case 128:
									(this.state.hash = [
										1732584193, 4023233417, 2562383102, 271733878
									]),
										(this.processBlock = this.processBlock128);
									break;
								case 256:
									(this.state.hash = [
										1732584193, 4023233417, 2562383102, 271733878, 1985229328,
										4275878552, 2309737967, 19088743
									]),
										(this.processBlock = this.processBlock256);
									break;
								case 320:
									(this.state.hash = [
										1732584193, 4023233417, 2562383102, 271733878, 3285377520,
										1985229328, 4275878552, 2309737967, 19088743, 1009589775
									]),
										(this.processBlock = this.processBlock320);
									break;
								default:
									(this.state.hash = [
										1732584193, 4023233417, 2562383102, 271733878, 3285377520
									]),
										(this.processBlock = this.processBlock160);
							}
						}
					},
					{
						key: "processBlock128",
						value: function (t) {
							for (
								var e = (a = 0 | this.state.hash[0]),
									n = (l = 0 | this.state.hash[1]),
									r = (c = 0 | this.state.hash[2]),
									i = (u = 0 | this.state.hash[3]),
									o = 0;
								o < 64;
								o++
							) {
								var s = ((s = (a + t[g[o]]) | 0) + b.T(o, l, c, u)) | 0,
									a = u,
									u = c,
									c = l,
									l = (s = Object(d.a)(s, v[o]));
								(s = ((s = (e + t[m[o]]) | 0) + b.T64(o, n, r, i)) | 0),
									(e = i),
									(i = r),
									(r = n),
									(n = s = Object(d.a)(s, y[o]));
							}
							var h = (this.state.hash[1] + c + i) | 0;
							(this.state.hash[1] = (this.state.hash[2] + u + e) | 0),
								(this.state.hash[2] = (this.state.hash[3] + a + n) | 0),
								(this.state.hash[3] = (this.state.hash[0] + l + r) | 0),
								(this.state.hash[0] = h);
						}
					},
					{
						key: "processBlock160",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = e,
									a = n,
									u = r,
									c = i,
									l = o,
									h = 0;
								h < 80;
								h++
							) {
								var f = ((f = (e + t[g[h]]) | 0) + b.T(h, n, r, i)) | 0;
								(f = ((f = Object(d.a)(f, v[h])) + o) | 0),
									(e = o),
									(o = i),
									(i = Object(d.a)(r, 10)),
									(r = n),
									(n = f),
									(f = ((f = (s + t[m[h]]) | 0) + b.T80(h, a, u, c)) | 0),
									(f = ((f = Object(d.a)(f, y[h])) + l) | 0),
									(s = l),
									(l = c),
									(c = Object(d.a)(u, 10)),
									(u = a),
									(a = f);
							}
							var p = (this.state.hash[1] + r + c) | 0;
							(this.state.hash[1] = (this.state.hash[2] + i + l) | 0),
								(this.state.hash[2] = (this.state.hash[3] + o + s) | 0),
								(this.state.hash[3] = (this.state.hash[4] + e + a) | 0),
								(this.state.hash[4] = (this.state.hash[0] + n + u) | 0),
								(this.state.hash[0] = p);
						}
					},
					{
						key: "processBlock256",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = 0 | this.state.hash[5],
									a = 0 | this.state.hash[6],
									u = 0 | this.state.hash[7],
									c = 0;
								c < 64;
								c += 1
							) {
								var l = ((l = (e + t[g[c]]) | 0) + b.T(c, n, r, i)) | 0,
									e = i,
									i = r,
									r = n,
									n = (l = Object(d.a)(l, v[c]));
								switch (
									((l = ((l = (o + t[m[c]]) | 0) + b.T64(c, s, a, u)) | 0),
									(o = u),
									(u = a),
									(a = s),
									(s = l = Object(d.a)(l, y[c])),
									c)
								) {
									case 15:
										(l = e), (e = o), (o = l);
										break;
									case 31:
										(l = n), (n = s), (s = l);
										break;
									case 47:
										(l = r), (r = a), (a = l);
										break;
									case 63:
										(l = i), (i = u), (u = l);
								}
							}
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
								(this.state.hash[1] = (this.state.hash[1] + n) | 0),
								(this.state.hash[2] = (this.state.hash[2] + r) | 0),
								(this.state.hash[3] = (this.state.hash[3] + i) | 0),
								(this.state.hash[4] = (this.state.hash[4] + o) | 0),
								(this.state.hash[5] = (this.state.hash[5] + s) | 0),
								(this.state.hash[6] = (this.state.hash[6] + a) | 0),
								(this.state.hash[7] = (this.state.hash[7] + u) | 0);
						}
					},
					{
						key: "processBlock320",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = 0 | this.state.hash[5],
									a = 0 | this.state.hash[6],
									u = 0 | this.state.hash[7],
									c = 0 | this.state.hash[8],
									l = 0 | this.state.hash[9],
									h = 0;
								h < 80;
								h += 1
							) {
								var f = ((f = (e + t[g[h]]) | 0) + b.T(h, n, r, i)) | 0;
								switch (
									((f = ((f = Object(d.a)(f, v[h])) + o) | 0),
									(e = o),
									(o = i),
									(i = Object(d.a)(r, 10)),
									(r = n),
									(n = f),
									(f = ((f = (s + t[m[h]]) | 0) + b.T80(h, a, u, c)) | 0),
									(f = ((f = Object(d.a)(f, y[h])) + l) | 0),
									(s = l),
									(l = c),
									(c = Object(d.a)(u, 10)),
									(u = a),
									(a = f),
									h)
								) {
									case 15:
										(f = n), (n = a), (a = f);
										break;
									case 31:
										(f = i), (i = c), (c = f);
										break;
									case 47:
										(f = e), (e = s), (s = f);
										break;
									case 63:
										(f = r), (r = u), (u = f);
										break;
									case 79:
										(f = o), (o = l), (l = f);
								}
							}
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
								(this.state.hash[1] = (this.state.hash[1] + n) | 0),
								(this.state.hash[2] = (this.state.hash[2] + r) | 0),
								(this.state.hash[3] = (this.state.hash[3] + i) | 0),
								(this.state.hash[4] = (this.state.hash[4] + o) | 0),
								(this.state.hash[5] = (this.state.hash[5] + s) | 0),
								(this.state.hash[6] = (this.state.hash[6] + a) | 0),
								(this.state.hash[7] = (this.state.hash[7] + u) | 0),
								(this.state.hash[8] = (this.state.hash[8] + c) | 0),
								(this.state.hash[9] = (this.state.hash[9] + l) | 0);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 56
										? (56 - this.state.message.length) | 0
										: (120 - this.state.message.length) | 0
								),
								this.addLengthBits(),
								this.process(),
								this.getStateHash()
							);
						}
					}
				]),
				o(r, n),
				b);
		function b(t) {
			return (
				(function (t) {
					if (!(t instanceof b)) throw new TypeError("Cannot call a class as a function");
				})(this),
				((t = t || {}).length = t.length || 160),
				(e = this),
				!(t = a(b).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
					? (function () {
							if (void 0 !== e) return e;
							throw new ReferenceError(
								"this hasn't been initialised - super() hasn't been called"
							);
						})()
					: t
			);
			var e;
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		var r = n(3),
			c = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e, n) {
			return (o =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = s(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function s(t) {
			return (s = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function a(t, e) {
			return (a =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var u = [
				10097, 32533, 76520, 13586, 34673, 54876, 80959, 9117, 39292, 74945, 37542, 4805,
				64894, 74296, 24805, 24037, 20636, 10402, 822, 91665, 8422, 68953, 19645, 9303,
				23209, 2560, 15953, 34764, 35080, 33606, 99019, 2529, 9376, 70715, 38311, 31165,
				88676, 74397, 4436, 27659, 12807, 99970, 80157, 36147, 64032, 36653, 98951, 16877,
				12171, 76833, 66065, 74717, 34072, 76850, 36697, 36170, 65813, 39885, 11199, 29170,
				31060, 10805, 45571, 82406, 35303, 42614, 86799, 7439, 23403, 9732, 85269, 77602,
				2051, 65692, 68665, 74818, 73053, 85247, 18623, 88579, 63573, 32135, 5325, 47048,
				90553, 57548, 28468, 28709, 83491, 25624, 73796, 45753, 3529, 64778, 35808, 34282,
				60935, 20344, 35273, 88435, 98520, 17767, 14905, 68607, 22109, 40558, 60970, 93433,
				50500, 73998, 11805, 5431, 39808, 27732, 50725, 68248, 29405, 24201, 52775, 67851,
				83452, 99634, 6288, 98083, 13746, 70078, 18475, 40610, 68711, 77817, 88685, 40200,
				86507, 58401, 36766, 67951, 90364, 76493, 29609, 11062, 99594, 67348, 87517, 64969,
				91826, 8928, 93785, 61368, 23478, 34113, 65481, 17674, 17468, 50950, 58047, 76974,
				73039, 57186, 40218, 16544, 80124, 35635, 17727, 8015, 45318, 22374, 21115, 78253,
				14385, 53763, 74350, 99817, 77402, 77214, 43236, 210, 45521, 64237, 96286, 2655,
				69916, 26803, 66252, 29148, 36936, 87203, 76621, 13990, 94400, 56418, 9893, 20505,
				14225, 68514, 46427, 56788, 96297, 78822, 54382, 14598, 91499, 14523, 68479, 27686,
				46162, 83554, 94750, 89923, 37089, 20048, 80336, 94598, 26940, 36858, 70297, 34135,
				53140, 33340, 42050, 82341, 44104, 81949, 85157, 47954, 32979, 26575, 57600, 40881,
				22222, 6413, 12550, 73742, 11100, 2040, 12860, 74697, 96644, 89439, 28707, 25815,
				63606, 49329, 16505, 34484, 40219, 52563, 43651, 77082, 7207, 31790, 61196, 90446,
				26457, 47774, 51924, 33729, 65394, 59593, 42582, 60527, 15474, 45266, 95270, 79953,
				59367, 83848, 82396, 10118, 33211, 59466, 94557, 28573, 67897, 54387, 54622, 44431,
				91190, 42592, 92927, 45973, 42481, 16213, 97344, 8721, 16868, 48767, 3071, 12059,
				25701, 46670, 23523, 78317, 73208, 89837, 68935, 91416, 26252, 29663, 5522, 82562,
				4493, 52494, 75246, 33824, 45862, 51025, 61962, 79335, 65337, 12472, 549, 97654,
				64051, 88159, 96119, 63896, 54692, 82391, 23287, 29529, 35963, 15307, 26898, 9354,
				33351, 35462, 77974, 50024, 90103, 39333, 59808, 8391, 45427, 26842, 83609, 49700,
				13021, 24892, 78565, 20106, 46058, 85236, 1390, 92286, 77281, 44077, 93910, 83647,
				70617, 42941, 32179, 597, 87379, 25241, 5567, 7007, 86743, 17157, 85394, 11838,
				69234, 61406, 20117, 45204, 15956, 6e4, 18743, 92423, 97118, 96338, 19565, 41430,
				1758, 75379, 40419, 21585, 66674, 36806, 84962, 85207, 45155, 14938, 19476, 7246,
				43667, 94543, 59047, 90033, 20826, 69541, 94864, 31994, 36168, 10851, 34888, 81553,
				1540, 35456, 5014, 51176, 98086, 24826, 45240, 28404, 44999, 8896, 39094, 73407,
				35441, 31880, 33185, 16232, 41941, 50949, 89435, 48581, 88695, 41994, 37548, 73043,
				80951, 406, 96382, 70774, 20151, 23387, 25016, 25298, 94624, 61171, 79752, 49140,
				71961, 28296, 69861, 2591, 74852, 20539, 387, 59579, 18633, 32537, 98145, 6571,
				31010, 24674, 5455, 61427, 77938, 91936, 74029, 43902, 77557, 32270, 97790, 17119,
				52527, 58021, 80814, 51748, 54178, 45611, 80993, 37143, 5335, 12969, 56127, 19255,
				36040, 90324, 11664, 49883, 52079, 84827, 59381, 71539, 9973, 33440, 88461, 23356,
				48324, 77928, 31249, 64710, 2295, 36870, 32307, 57546, 15020, 9994, 69074, 94138,
				87637, 91976, 35584, 4401, 10518, 21615, 1848, 76938, 9188, 20097, 32825, 39527,
				4220, 86304, 83389, 87374, 64278, 58044, 90045, 85497, 51981, 50654, 94938, 81997,
				91870, 76150, 68476, 64659, 73189, 50207, 47677, 26269, 62290, 64464, 27124, 67018,
				41361, 82760, 75768, 76490, 20971, 87749, 90429, 12272, 95375, 5871, 93823, 43178,
				54016, 44056, 66281, 31003, 682, 27398, 20714, 53295, 7706, 17813, 8358, 69910,
				78542, 42785, 13661, 58873, 4618, 97553, 31223, 8420, 28306, 3264, 81333, 10591,
				40510, 7893, 32604, 60475, 94119, 1840, 53840, 86233, 81594, 13628, 51215, 90290,
				28466, 68795, 77762, 20791, 91757, 53741, 61613, 62269, 50263, 90212, 55781, 76514,
				83483, 47055, 89415, 92694, 397, 58391, 12607, 17646, 48949, 72306, 94541, 37408,
				77513, 3820, 86864, 29901, 68414, 82774, 51908, 13980, 72893, 55507, 19502, 37174,
				69979, 20288, 55210, 29773, 74287, 75251, 65344, 67415, 21818, 59313, 93278, 81757,
				5686, 73156, 7082, 85046, 31853, 38452, 51474, 66499, 68107, 23621, 94049, 91345,
				42836, 9191, 8007, 45449, 99559, 68331, 62535, 24170, 69777, 12830, 74819, 78142,
				43860, 72834, 33713, 48007, 93584, 72869, 51926, 64721, 58303, 29822, 93174, 93972,
				85274, 86893, 11303, 22970, 28834, 34137, 73515, 90400, 71148, 43643, 84133, 89640,
				44035, 52166, 73852, 70091, 61222, 60561, 62327, 18423, 56732, 16234, 17395, 96131,
				10123, 91622, 85496, 57560, 81604, 18880, 65138, 56806, 87648, 85261, 34313, 65861,
				45875, 21069, 85644, 47277, 38001, 2176, 81719, 11711, 71602, 92937, 74219, 64049,
				65584, 49698, 37402, 96397, 1304, 77586, 56271, 10086, 47324, 62605, 40030, 37438,
				97125, 40348, 87083, 31417, 21815, 39250, 75237, 62047, 15501, 29578, 21826, 41134,
				47143, 34072, 64638, 85902, 49139, 6441, 3856, 54552, 73135, 42742, 95719, 9035,
				85794, 74296, 8789, 88156, 64691, 19202, 7638, 77929, 3061, 18072, 96207, 44156,
				23821, 99538, 4713, 66994, 60528, 83441, 7954, 19814, 59175, 20695, 5533, 52139,
				61212, 6455, 83596, 35655, 6958, 92983, 5128, 9719, 77433, 53783, 92301, 50498,
				10850, 62746, 99599, 10507, 13499, 6319, 53075, 71839, 6410, 19362, 39820, 98952,
				43622, 63147, 64421, 80814, 43800, 9351, 31024, 73167, 59580, 6478, 75569, 78800,
				88835, 54486, 23768, 6156, 4111, 8408, 38508, 7341, 23793, 48763, 90822, 97022,
				17719, 4207, 95954, 49953, 30692, 70668, 94688, 16127, 56196, 80091, 82067, 63400,
				5462, 69200, 65443, 95659, 18288, 27437, 49632, 24041, 8337, 65676, 96299, 90836,
				27267, 50264, 13192, 72294, 7477, 44606, 17985, 48911, 97341, 30358, 91307, 6991,
				19072, 24210, 36699, 53728, 28825, 35793, 28976, 66252, 68434, 94688, 84473, 13622,
				62126, 98408, 12843, 82590, 9815, 93146, 48908, 15877, 54745, 24591, 35700, 4754,
				83824, 52692, 54130, 55160, 6913, 45197, 42672, 78601, 11883, 9528, 63011, 98901,
				14974, 40344, 10455, 16019, 14210, 33712, 91342, 37821, 88325, 80851, 43667, 70883,
				12883, 97343, 65027, 61184, 4285, 1392, 17974, 15077, 90712, 26769, 21778, 30976,
				38807, 36961, 31649, 42096, 63281, 2023, 8816, 47449, 19523, 59515, 65122, 59659,
				86283, 68258, 69572, 13798, 16435, 91529, 67245, 52670, 35583, 16563, 79246, 86686,
				76463, 34222, 26655, 90802, 60584, 47377, 7500, 37992, 45134, 26529, 26760, 83637,
				41326, 44344, 53853, 41377, 36066, 94850, 58838, 73859, 49364, 73331, 96240, 43642,
				24637, 38736, 74384, 89342, 52623, 7992, 12369, 18601, 3742, 83873, 83080, 12451,
				38992, 22815, 7759, 51777, 97377, 27585, 51972, 37867, 16444, 24334, 36151, 99073,
				27493, 70939, 85130, 32552, 54846, 54759, 60790, 18157, 57178, 65762, 11161, 78576,
				45819, 52979, 65130, 4860, 3991, 10461, 93716, 16894, 66083, 24653, 84609, 58232,
				88618, 19161, 38555, 95554, 32886, 59780, 8355, 60860, 29735, 47762, 71299, 23853,
				17546, 73704, 92052, 46215, 55121, 29281, 59076, 7936, 27954, 58909, 32643, 52861,
				95819, 6831, 911, 98936, 76355, 93779, 80863, 514, 69572, 68777, 39510, 35905,
				14060, 40619, 29549, 69616, 33564, 60780, 24122, 66591, 27699, 6494, 14845, 46672,
				61958, 77100, 90899, 75754, 61196, 30231, 92962, 61773, 41839, 55382, 17267, 70943,
				78038, 70267, 30532, 21704, 10274, 12202, 39685, 23309, 10061, 68829, 55986, 66485,
				3788, 97599, 75867, 20717, 74416, 53166, 35208, 33374, 87539, 8823, 48228, 63379,
				85783, 47619, 53152, 67433, 35663, 52972, 16818, 60311, 60365, 94653, 35075, 33949,
				42614, 29297, 1918, 28316, 98953, 73231, 83799, 42402, 56623, 34442, 34994, 41374,
				70071, 14736, 9958, 18065, 32960, 7405, 36409, 83232, 99385, 41600, 11133, 7586,
				15917, 6253, 19322, 53845, 57620, 52606, 66497, 68646, 78138, 66559, 19640, 99413,
				11220, 94747, 7399, 37408, 48509, 23929, 27482, 45476, 85244, 35159, 31751, 57260,
				68980, 5339, 15470, 48355, 88651, 22596, 3152, 19121, 88492, 99382, 14454, 4504,
				20094, 98977, 74843, 93413, 22109, 78508, 30934, 47744, 7481, 83828, 73788, 6533,
				28597, 20405, 94205, 20380, 22888, 48893, 27499, 98748, 60530, 45128, 74022, 84617,
				82037, 10268, 78212, 16993, 35902, 91386, 44372, 15486, 65741, 14014, 87481, 37220,
				41849, 84547, 46850, 52326, 34677, 58300, 74910, 64345, 19325, 81549, 46352, 33049,
				69248, 93460, 45305, 7521, 61318, 31855, 14413, 70951, 11087, 96294, 14013, 31792,
				59747, 67277, 76503, 34513, 39663, 77544, 52701, 8337, 56303, 87315, 16520, 69676,
				11654, 99893, 2181, 68161, 57275, 36898, 81304, 48585, 68652, 27376, 92852, 55866,
				88448, 3584, 20857, 73156, 70284, 24326, 79375, 95220, 1159, 63267, 10622, 48391,
				15633, 84924, 90415, 93614, 33521, 26665, 55823, 47641, 86225, 31704, 92694, 48297,
				39904, 2115, 59589, 49067, 66821, 41575, 49767, 4037, 77613, 19019, 88152, 80,
				20554, 91409, 96277, 48257, 50816, 97616, 38688, 32486, 45134, 63545, 59404, 72059,
				43947, 51680, 43852, 59693, 25163, 1889, 70014, 15021, 41290, 67312, 71857, 15957,
				68971, 11403, 65251, 7629, 37239, 33295, 5870, 1119, 92784, 26340, 18477, 65622,
				36815, 43625, 18637, 37509, 82444, 99005, 4921, 73701, 14707, 93997, 64397, 11692,
				5327, 82162, 20247, 81759, 45197, 25332, 83745, 22567, 4515, 25624, 95096, 67946,
				48460, 85558, 15191, 18782, 16930, 33361, 83761, 60873, 43253, 84145, 60833, 25983,
				1291, 41349, 20368, 7126, 14387, 6345, 80854, 9279, 43529, 6318, 38384, 74761,
				41196, 37480, 51321, 92246, 80088, 77074, 88722, 56736, 66164, 49431, 66919, 31678,
				72472, 8, 80890, 18002, 94813, 31900, 54155, 83436, 35352, 54131, 5466, 55306,
				93128, 18464, 74457, 90561, 72848, 11834, 79982, 68416, 39528, 72484, 82474, 25593,
				48545, 35247, 18619, 13674, 18611, 19241, 81616, 18711, 53342, 44276, 75122, 11724,
				74627, 73707, 58319, 15997, 7586, 16120, 82641, 22820, 92904, 13141, 32392, 19763,
				61199, 67940, 90767, 4235, 13574, 17200, 69902, 63742, 78464, 22501, 18627, 90872,
				40188, 28193, 29593, 88627, 94972, 11598, 62095, 36787, 441, 58997, 34414, 82157,
				86887, 55087, 19152, 23, 12302, 80783, 32624, 68691, 63439, 75363, 44989, 16822,
				36024, 867, 76378, 41605, 65961, 73488, 67049, 9070, 93399, 45547, 94458, 74284,
				5041, 49807, 20288, 34060, 79495, 4146, 52162, 90286, 54158, 34243, 46978, 35482,
				59362, 95938, 91704, 30552, 4737, 21031, 75051, 93029, 47665, 64382, 99782, 93478,
				94015, 46874, 32444, 48277, 59820, 96163, 64654, 25843, 41145, 42820, 74108, 88222,
				88570, 74015, 25704, 91035, 1755, 14750, 48968, 38603, 62880, 87873, 95160, 59221,
				22304, 90314, 72877, 17334, 39283, 4149, 11748, 12102, 80580, 41867, 17710, 59621,
				6554, 7850, 73950, 79552, 17944, 5600, 60478, 3343, 25852, 58905, 57216, 39618,
				49856, 99326, 66067, 42792, 95043, 52680, 46780, 56487, 9971, 59481, 37006, 22186,
				54244, 91030, 45547, 70818, 59849, 96169, 61459, 21647, 87417, 17198, 30945, 57589,
				31732, 57260, 47670, 7654, 46376, 25366, 94746, 49580, 69170, 37403, 86995, 90307,
				94304, 71803, 26825, 5511, 12459, 91314, 8345, 88975, 35841, 85771, 8105, 59987,
				87112, 21476, 14713, 71181, 27767, 43584, 85301, 88977, 29490, 69714, 73035, 41207,
				74699, 9310, 13025, 14338, 54066, 15243, 47724, 66733, 47431, 43905, 31048, 56699,
				80217, 36292, 98525, 24335, 24432, 24896, 43277, 58874, 11466, 16082, 10875, 62004,
				90391, 61105, 57411, 6368, 53856, 30743, 8670, 84741, 54127, 57326, 26629, 19087,
				24472, 88779, 30540, 27886, 61732, 75454, 60311, 42824, 37301, 42678, 45990, 43242,
				17374, 52003, 70707, 70214, 49739, 71484, 92003, 98086, 76668, 73209, 59202, 11973,
				2902, 33250, 78626, 51594, 16453, 94614, 39014, 97066, 83012, 9832, 25571, 77628,
				66692, 13986, 99837, 582, 81232, 44987, 9504, 96412, 90193, 79568, 44071, 28091,
				7362, 97703, 76447, 42537, 98524, 97831, 65704, 9514, 41468, 85149, 49554, 17994,
				14924, 39650, 95294, 556, 70481, 6905, 94559, 37559, 49678, 53119, 70312, 5682,
				66986, 34099, 74474, 20740, 41615, 70360, 64114, 58660, 90850, 64618, 80620, 51790,
				11436, 38072, 50273, 93113, 41794, 86861, 24781, 89683, 55411, 85667, 77535, 99892,
				41396, 80504, 90670, 8289, 40902, 5069, 95083, 6783, 28102, 57816, 25807, 24260,
				71529, 78920, 72682, 7385, 90726, 57166, 98884, 8583, 6170, 97965, 88302, 98041,
				21443, 41808, 68984, 83620, 89747, 98882, 60808, 54444, 74412, 81105, 1176, 28838,
				36421, 16489, 18059, 51061, 80940, 44893, 10408, 36222, 80582, 71944, 92638, 40333,
				67054, 16067, 19516, 90120, 46759, 71643, 13177, 55292, 21036, 82808, 77501, 97427,
				49386, 54480, 23604, 23554, 21785, 41101, 91178, 10174, 29420, 90438, 6312, 88940,
				15995, 69321, 47458, 64809, 98189, 81851, 29651, 84215, 60942, 307, 11897, 92674,
				40405, 68032, 96717, 54244, 10701, 41393, 92329, 98932, 78284, 46347, 71209, 92061,
				39448, 93136, 25722, 8564, 77936, 63574, 31384, 51924, 85561, 29671, 58137, 17820,
				22751, 36518, 38101, 77756, 11657, 13897, 95889, 57067, 47648, 13885, 70669, 93406,
				39641, 69457, 91339, 22502, 92613, 89719, 11947, 56203, 19324, 20504, 84054, 40455,
				99396, 63680, 67667, 60631, 69181, 96845, 38525, 11600, 47468, 3577, 57649, 63266,
				24700, 71594, 14004, 23153, 69249, 5747, 43321, 31370, 28977, 23896, 76479, 68562,
				62342, 7589, 8899, 5985, 64281, 61826, 18555, 64937, 13173, 33365, 78851, 16499,
				87064, 13075, 66847, 70495, 32350, 2985, 86716, 38746, 26313, 77463, 55387, 72681,
				72461, 33230, 21529, 53424, 92581, 2262, 78438, 66276, 18396, 73538, 21032, 91050,
				13058, 16218, 12470, 56500, 15292, 76139, 59526, 52113, 95362, 67011, 6651, 16136,
				1016, 857, 55018, 56374, 35824, 71708, 49712, 97380, 10404, 55452, 34030, 60726,
				75211, 10271, 36633, 68424, 58275, 61764, 97586, 54716, 50259, 46345, 87195, 46092,
				26787, 60939, 89514, 11788, 68224, 23417, 73959, 76145, 30342, 40277, 11049, 72049,
				15472, 50669, 48139, 36732, 46874, 37088, 73465, 9819, 58869, 35220, 12120, 86124,
				51247, 44302, 60883, 52109, 21437, 36786, 49226, 77837, 19612, 78430, 11661, 94770,
				77603, 65669, 86868, 12665, 30012, 75989, 39141, 77400, 28e3, 64238, 73258, 71794,
				31340, 26256, 66453, 37016, 64756, 80457, 8747, 12836, 3469, 50678, 3274, 43423,
				66677, 82556, 92901, 51878, 56441, 22998, 29718, 38447, 6453, 25311, 7565, 53771,
				3551, 90070, 9483, 94050, 45938, 18135, 36908, 43321, 11073, 51803, 98884, 66209,
				6830, 53656, 14663, 56346, 71430, 4909, 19818, 5707, 27369, 86882, 53473, 7541,
				53633, 70863, 3748, 12822, 19360, 49088, 59066, 75974, 63335, 20483, 43514, 37481,
				58278, 26967, 49325, 43951, 91647, 93783, 64169, 49022, 98588, 9495, 49829, 59068,
				38831, 4838, 83605, 92419, 39542, 7772, 71568, 75673, 35185, 89759, 44901, 74291,
				24895, 88530, 70774, 35439, 46758, 70472, 70207, 92675, 91623, 61275, 35720, 26556,
				95596, 20094, 73750, 85788, 34264, 1703, 46833, 65248, 14141, 53410, 38649, 6343,
				57256, 61342, 72709, 75318, 90379, 37562, 27416, 75670, 92176, 72535, 93119, 56077,
				6886, 18244, 92344, 31374, 82071, 7429, 81007, 47749, 40744, 56974, 23336, 88821,
				53841, 10536, 21445, 82793, 24831, 93241, 14199, 76268, 70883, 68002, 3829, 17443,
				72513, 76400, 52225, 92348, 62308, 98481, 29744, 33165, 33141, 61020, 71479, 45027,
				76160, 57411, 13780, 13632, 52308, 77762, 88874, 33697, 83210, 51466, 9088, 50395,
				26743, 5306, 21706, 70001, 99439, 80767, 68749, 95148, 94897, 78636, 96750, 9024,
				94538, 91143, 96693, 61886, 5184, 75763, 47075, 88158, 5313, 53439, 14908, 8830,
				60096, 21551, 13651, 62546, 96892, 25240, 47511, 58483, 87342, 78818, 7855, 39269,
				566, 21220, 292, 24069, 25072, 29519, 52548, 54091, 21282, 21296, 50958, 17695,
				58072, 68990, 60329, 95955, 71586, 63417, 35947, 67807, 57621, 64547, 46850, 37981,
				38527, 9037, 64756, 3324, 4986, 83666, 9282, 25844, 79139, 78435, 35428, 43561,
				69799, 63314, 12991, 93516, 23394, 94206, 93432, 37836, 94919, 26846, 2555, 74410,
				94915, 48199, 5280, 37470, 93622, 4345, 15092, 19510, 18094, 16613, 78234, 50001,
				95491, 97976, 38306, 32192, 82639, 54624, 72434, 92606, 23191, 74693, 78521, 104,
				18248, 75583, 90326, 50785, 54034, 66251, 35774, 14692, 96345, 44579, 85932, 44053,
				75704, 20840, 86583, 83944, 52456, 73766, 77963, 31151, 32364, 91691, 47357, 40338,
				23435, 24065, 8458, 95366, 7520, 11294, 23238, 1748, 41690, 67328, 54814, 37777,
				10057, 42332, 38423, 2309, 70703, 85736, 46148, 14258, 29236, 12152, 5088, 65825,
				2463, 65533, 21199, 60555, 33928, 1817, 7396, 89215, 30722, 22102, 15880, 92261,
				17292, 88190, 61781, 48898, 92525, 21283, 88581, 60098, 71926, 819, 59144, 224,
				30570, 90194, 18329, 6999, 26857, 19238, 64425, 28108, 16554, 16016, 42, 83229,
				10333, 36168, 65617, 94834, 79782, 23924, 49440, 30432, 81077, 31543, 95216, 64865,
				13658, 51081, 35337, 74538, 44553, 64672, 90960, 41849, 93865, 44608, 93176, 34851,
				5249, 29329, 19715, 94082, 14738, 86667, 43708, 66354, 93692, 25527, 56463, 99380,
				38793, 85774, 19056, 13939, 46062, 27647, 66146, 63210, 96296, 33121, 54196, 34108,
				75814, 85986, 71171, 15102, 28992, 63165, 98380, 36269, 60014, 7201, 62448, 46385,
				42175, 88350, 46182, 49126, 52567, 64350, 16315, 53969, 80395, 81114, 54358, 64578,
				47269, 15747, 78498, 90830, 25955, 99236, 43286, 91064, 99969, 95144, 64424, 77377,
				49553, 24241, 8150, 89535, 8703, 91041, 77323, 81079, 45127, 93686, 32151, 7075,
				83155, 10252, 73100, 88618, 23891, 87418, 45417, 20268, 11314, 50363, 26860, 27799,
				49416, 83534, 19187, 8059, 76677, 2110, 12364, 71210, 87052, 50241, 90785, 97889,
				81399, 58130, 64439, 5614, 59467, 58309, 87834, 57213, 37510, 33689, 1259, 62486,
				56320, 46265, 73452, 17619, 56421, 40725, 23439, 41701, 93223, 41682, 45026, 47505,
				27635, 56293, 91700, 4391, 67317, 89604, 73020, 69853, 61517, 51207, 86040, 2596,
				1655, 9918, 45161, 222, 54577, 74821, 47335, 8582, 52403, 94255, 26351, 46527,
				68224, 90183, 85057, 72310, 34963, 83462, 49465, 46581, 61499, 4844, 94626, 2963,
				41482, 83879, 44942, 63915, 94365, 92560, 12363, 30246, 2086, 75036, 88620, 91088,
				67691, 67762, 34261, 8769, 91830, 23313, 18256, 28850, 37639, 92748, 57791, 71328,
				37110, 66538, 39318, 15626, 44324, 82827, 8782, 65960, 58167, 1305, 83950, 45424,
				72453, 19444, 68219, 64733, 94088, 62006, 89985, 36936, 61630, 97966, 76537, 46467,
				30942, 7479, 67971, 14558, 22458, 35148, 1929, 17165, 12037, 74558, 16250, 71750,
				55546, 29693, 94984, 37782, 41659, 39098, 23982, 29899, 71594, 77979, 54477, 13764,
				17315, 72893, 32031, 39608, 75992, 73445, 1317, 50525, 87313, 45191, 30214, 19769,
				90043, 93478, 58044, 6949, 31176, 88370, 50274, 83987, 45316, 38551, 79418, 14322,
				91065, 7841, 36130, 86602, 10659, 40859, 964, 71577, 85447, 61079, 96910, 72906,
				7361, 84338, 34114, 52096, 66715, 51091, 86219, 81115, 49625, 48799, 89485, 24855,
				13684, 68433, 70595, 70102, 71712, 88559, 92476, 32903, 68009, 58417, 87962, 11787,
				16644, 72964, 29776, 63075, 13270, 84758, 49560, 10317, 28778, 23006, 31036, 84906,
				81488, 17340, 74154, 42801, 27917, 89792, 62604, 62234, 13124, 76471, 51667, 37589,
				87147, 24743, 48023, 6325, 79794, 35889, 13255, 4925, 99004, 70322, 60832, 76636,
				56907, 56534, 72615, 46288, 36788, 93196, 68656, 66492, 35933, 52293, 47953, 95495,
				95304, 50009, 83464, 28608, 38074, 74083, 9337, 7965, 65047, 36871, 59015, 21769,
				30398, 44855, 1020, 80680, 59328, 8712, 48190, 45332, 27284, 31287, 66011, 9376,
				86379, 74508, 33579, 77114, 92955, 23085, 92824, 3054, 25242, 16322, 48498, 9938,
				44420, 13484, 52319, 58875, 2012, 88591, 52500, 95795, 41800, 95363, 54142, 17482,
				32705, 60564, 12505, 40954, 46174, 64130, 63026, 96712, 79883, 39225, 52653, 69549,
				36693, 59822, 22684, 31661, 88298, 15489, 16030, 42480, 15372, 38781, 71995, 77438,
				91161, 10192, 7839, 62735, 99218, 25624, 2547, 27445, 69187, 55749, 32322, 15504,
				73298, 51108, 48717, 92926, 75705, 89787, 96114, 99902, 37749, 96305, 12829, 70474,
				838, 50385, 91711, 80370, 56504, 56857, 80906, 9018, 76569, 61072, 48568, 36491,
				22587, 44363, 39592, 61546, 90181, 37348, 41665, 41339, 62106, 44203, 6732, 76111,
				79840, 67999, 32231, 76869, 58652, 49983, 1669, 27464, 79553, 52855, 25988, 18087,
				38052, 17529, 13607, 657, 76173, 43357, 77334, 24140, 53860, 2906, 89863, 44651,
				55715, 26203, 65933, 51087, 98234, 40625, 45545, 63563, 89148, 82581, 4110, 66683,
				99001, 9796, 47349, 65003, 66524, 81970, 71262, 14479, 31300, 8681, 58068, 44115,
				40064, 77879, 23965, 69019, 73985, 19453, 26225, 97543, 37044, 7494, 85778, 35345,
				61115, 92498, 49737, 64599, 7158, 82763, 25072, 38478, 57782, 75291, 62155, 52056,
				4786, 11585, 71251, 25572, 79771, 93328, 66927, 54069, 58752, 26624, 50463, 77361,
				29991, 96526, 2820, 91659, 12818, 96356, 49499, 1507, 40223, 9171, 83642, 21057,
				2677, 9367, 38097, 16100, 19355, 6120, 15378, 56559, 69167, 30235, 6767, 66323,
				78294, 14916, 19124, 88044, 16673, 66102, 86018, 29406, 75415, 22038, 27056, 26906,
				25867, 14751, 92380, 30434, 44114, 6026, 79553, 55091, 95385, 41212, 37882, 46864,
				54717, 97038, 53805, 64150, 70915, 63127, 63695, 41288, 38192, 72437, 75075, 18570,
				52065, 8853, 30104, 79937, 66913, 53200, 84570, 78079, 28970, 53859, 37632, 80274,
				35240, 32960, 74859, 7359, 55176, 3930, 38984, 35151, 82576, 82805, 94031, 12779,
				90879, 24109, 25367, 77861, 9541, 85739, 69023, 64971, 99321, 7521, 95909, 43897,
				71724, 92581, 5471, 64337, 98949, 3606, 78236, 78985, 29212, 57369, 34857, 67757,
				58019, 58872, 96526, 28749, 56592, 37871, 72905, 70198, 57319, 54116, 47014, 18285,
				33692, 72111, 60958, 96848, 17893, 40993, 50445, 14186, 76877, 87867, 50335, 9513,
				44346, 26439, 55293, 6449, 44301, 63740, 40158, 72703, 88321, 85062, 57345, 66231,
				15409, 3451, 95261, 43561, 15673, 28956, 90303, 62469, 82517, 43035, 36850, 15592,
				64098, 59022, 31752, 4370, 50486, 11885, 23085, 41712, 80692, 48492, 16495, 99721,
				36912, 28267, 27882, 16269, 64483, 11273, 2680, 1616, 46138, 54606, 14761, 5134,
				45144, 63213, 49666, 27441, 86989, 29884, 54334, 6740, 8368, 80051, 81020, 17882,
				74973, 74531, 94994, 24927, 64894, 22667, 20466, 82948, 66831, 47427, 76033, 31197,
				59817, 20064, 61135, 28556, 29695, 80179, 74058, 18293, 9963, 35278, 13062, 83094,
				23373, 90287, 33477, 48865, 30348, 70174, 11468, 25994, 25343, 22317, 1587, 30682,
				1, 67814, 59557, 23362, 13746, 82244, 42093, 24671, 79458, 93730, 45488, 60234,
				67098, 9899, 25775, 332, 36636, 57594, 19958, 85564, 58977, 12247, 60774, 66371,
				69442, 20385, 14486, 91330, 50332, 46023, 75768, 59877, 60081, 92936, 72302, 75064,
				85727, 52987, 5750, 19384, 33684, 78859, 80458, 69902, 34870, 88684, 49762, 40801,
				86291, 18194, 90366, 82639, 53844, 96326, 65728, 48563, 26027, 52692, 62406, 76294,
				41848, 63010, 69841, 29451, 36170, 21529, 16525, 64326, 22086, 24469, 57407, 96033,
				37771, 31002, 18311, 93285, 31948, 14331, 58335, 15977, 80336, 81667, 27286, 24361,
				61638, 57580, 95270, 46180, 76990, 53031, 94366, 2727, 49944, 19278, 5756, 51875,
				53445, 33342, 1965, 7937, 10054, 97712, 87693, 58124, 46064, 39133, 77385, 9605,
				65359, 70113, 90563, 86637, 94282, 12025, 31926, 24541, 23854, 58407, 32131, 92845,
				20714, 27898, 26917, 50326, 35145, 50859, 72119, 95094, 29441, 42301, 62460, 75252,
				94267, 38422, 73047, 24200, 85349, 72049, 91723, 97802, 98496, 12734, 73432, 10371,
				57213, 53300, 80847, 46229, 7099, 72961, 13767, 65654, 31102, 82119, 96946, 65919,
				81083, 3819, 57888, 57908, 16849, 77111, 41429, 92261, 45263, 1172, 55926, 78835,
				27697, 48420, 58865, 41207, 21406, 8582, 10785, 36233, 12237, 7866, 13706, 92551,
				11021, 63813, 71512, 65206, 37768, 94325, 14721, 20990, 54235, 71986, 5345, 56239,
				52028, 1419, 7215, 55067, 11669, 21738, 66605, 69621, 69827, 8537, 18638, 60982,
				28151, 98885, 76431, 25566, 3085, 23639, 30849, 63986, 73287, 26201, 36174, 14106,
				54102, 57041, 16141, 64174, 3591, 90024, 73332, 31254, 17288, 59809, 25061, 51612,
				47951, 16570, 43330, 79213, 11354, 55585, 19646, 99246, 37564, 32660, 20632, 21124,
				60597, 69315, 31312, 57741, 85108, 21615, 24365, 27684, 16124, 33888, 14966, 35303,
				69921, 15795, 4020, 67672, 86816, 63027, 84470, 45605, 44887, 26222, 79888, 58982,
				22466, 98844, 48353, 60666, 58256, 31140, 93507, 69561, 6256, 88526, 18655, 865,
				75247, 264, 65957, 98261, 72706, 36396, 46065, 85700, 32121, 99975, 73627, 78812,
				89638, 86602, 96758, 65099, 52777, 46792, 13790, 55240, 52002, 10313, 91933, 71231,
				10053, 78416, 54563, 96004, 42215, 30094, 45958, 48437, 49591, 50483, 13422, 69108,
				59952, 27896, 40450, 79327, 31962, 46456, 39260, 51479, 61882, 48181, 50691, 64709,
				32902, 10676, 12083, 35771, 79656, 56667, 76783, 3937, 99859, 10362, 57411, 40986,
				35045, 2838, 29255, 64230, 84418, 34988, 77644, 39892, 77327, 74129, 53444, 35487,
				95803, 38640, 20383, 55402, 25793, 14213, 87082, 42837, 95030, 97198, 61608, 97723,
				79390, 35290, 34683, 81419, 87133, 70447, 53127, 97146, 28299, 56763, 12868, 1145,
				12147, 58158, 92124, 60934, 18414, 97510, 7056, 54488, 20719, 53743, 91037, 44797,
				52110, 8512, 18991, 20129, 31441, 51449, 14661, 71126, 23180, 68124, 18807, 70997,
				21913, 19594, 70355, 73637, 68266, 60775, 43164, 52643, 96363, 77989, 79332, 39890,
				65379, 20405, 52935, 43816, 92740, 95319, 4538, 60660, 28982, 15328, 80475, 34690,
				2293, 19646, 46524, 96627, 33159, 42081, 8816, 74931, 20674, 8697, 66169, 46460,
				46326, 39923, 60625, 28386, 22919, 19415, 75766, 43668, 31626, 70301, 67053, 3949,
				70082, 2303, 48642, 38429, 94053, 38770, 68137, 68441, 52928, 70244, 91954, 17401,
				92693, 98342, 21451, 84988, 80487, 33807, 73797, 49494, 41878, 76635, 83227, 76618,
				11946, 13451, 87591, 78381, 21407, 90038, 72638, 69692, 51599, 86413, 32019, 64856,
				74730, 41531, 11064, 1790, 58817, 86400, 66213, 92599, 70905, 78324, 54326, 43659,
				34206, 63132, 38837, 40210, 96346, 16967, 81619, 96503, 14881, 89405, 32205, 49508,
				98425, 2451, 35423, 56072, 36810, 30332, 85998, 49358, 92748, 84147, 79835, 94867,
				41224, 61794, 35066, 82220, 66684, 20096, 2754, 41731, 37068, 32753, 91059, 13407,
				5607, 69384, 53329, 95909, 44968, 11397, 92973, 50014, 92997, 80968, 93761, 57598,
				74703, 7768, 37978, 73873, 33475, 9720, 97852, 98449, 48722, 84977, 11271, 11728,
				68318, 22312, 78792, 87508, 88466, 72976, 47099, 84126, 38595, 85124, 64405, 90020,
				7492, 52413, 95111, 34455, 86311, 68892, 1074, 60274, 28136, 19328, 38161, 57475,
				13771, 63562, 84207, 94121, 18901, 52768, 33801, 82087, 86091, 59969, 90398, 56870,
				55756, 78841, 98450, 54165, 55106, 50343, 70519, 14567, 36780, 55450, 19606, 83749,
				67562, 64765, 38543, 16585, 86841, 73742, 8766, 39252, 75678, 75379, 78760, 37279,
				15280, 13558, 95916, 89759, 76686, 76467, 67147, 63110, 94008, 8037, 35263, 53710,
				16667, 79008, 11231, 29397, 67136, 18601, 64502, 90228, 89109, 72849, 22711, 65547,
				34542, 26686, 81678, 87765, 77654, 23664, 96352, 14106, 32938, 28083, 18633, 80286,
				65507, 46197, 52722, 75476, 77816, 47204, 34876, 45963, 79262, 90181, 84041, 3745,
				90041, 30780, 27226, 92847, 85572, 15308, 80688, 5761, 82638, 13464, 23683, 81015,
				54214, 64175, 43701, 86845, 15569, 50687, 52679, 87696, 8285, 97444, 47599, 94472,
				64150, 87753, 68652, 60726, 26213, 17320, 64553, 81285, 98126, 12158, 52095, 64833,
				492, 35817, 55571, 91300, 97812, 37507, 4209, 53515, 64342, 21223, 16662, 43265,
				68219, 3529, 43636, 68417, 53640, 95326, 93381, 37113, 80751, 76469, 96677, 43054,
				22937, 31954, 13266, 34140, 27253, 2734, 99070, 60077, 57988, 93211, 92795, 83795,
				57477, 3941, 39007, 14619, 38320, 93449, 31336, 25279, 97030, 26245, 47394, 39475,
				90621, 23820, 29344, 94859, 91604, 14033, 41868, 14816, 4075, 66644, 87803, 97815,
				99552, 78666, 3942, 8175, 22345, 19983, 76783, 99044, 20851, 84981, 59052, 77178,
				72109, 76475, 21619, 73017, 6812, 56633, 50612, 55289, 4671, 84419, 94072, 94446,
				80603, 32188, 93415, 23464, 43947, 43728, 74284, 67177, 57105, 31059, 10642, 13803,
				69602, 46961, 66567, 19359, 84676, 63918, 40650, 12923, 15974, 79732, 20225, 92525,
				71179, 4859, 91208, 60430, 5239, 61458, 24089, 68852, 60171, 29603, 42535, 86365,
				93905, 28237, 45317, 60718, 82001, 41679, 20679, 56304, 70043, 87568, 21386, 59049,
				78353, 48696, 77379, 55309, 23780, 28391, 5940, 55583, 81256, 59418, 97521, 32846,
				70761, 90115, 45325, 5490, 65974, 11186, 15357, 3568, 450, 96644, 58976, 36211,
				88240, 92457, 89200, 94696, 11370, 91157, 48487, 59501, 56983, 89795, 42789, 69758,
				79701, 29511, 55968, 41472, 89474, 84344, 80517, 7485, 97523, 17264, 82840, 59556,
				37119, 30985, 48866, 60605, 95719, 70417, 59083, 95137, 76538, 44155, 67286, 57897,
				28262, 4052, 919, 86207, 79932, 44236, 10089, 44373, 65670, 44285, 6903, 20834,
				49701, 95735, 21149, 3425, 17594, 31427, 14262, 32252, 68540, 39427, 44026, 47257,
				45055, 95091, 8367, 28381, 57375, 41562, 83883, 27715, 10122, 67745, 46497, 28626,
				87297, 36568, 39483, 11385, 63292, 92305, 78683, 6146, 81905, 15038, 38338, 51206,
				65749, 34119, 71516, 74068, 51094, 6665, 91884, 66762, 11428, 70908, 21506, 480,
				94183, 78484, 66507, 75901, 25728, 52539, 86806, 69944, 65036, 27882, 2530, 4918,
				74351, 65737, 89178, 8791, 39342, 94963, 22581, 56917, 17541, 83578, 75376, 65202,
				30935, 79270, 91986, 99286, 45236, 44720, 81915, 70881, 45886, 43213, 49789, 97081,
				16075, 20517, 69980, 25310, 91953, 1759, 67635, 88933, 54558, 18395, 73375, 62251,
				58871, 9870, 70538, 48936, 7757, 90374, 56631, 88862, 30487, 38794, 36079, 32712,
				11130, 55451, 25137, 38785, 83558, 31960, 69473, 45950, 18225, 9871, 88502, 75179,
				11551, 75664, 74321, 67351, 27703, 83717, 18913, 42470, 8816, 37627, 14288, 62831,
				44047, 67612, 72738, 26995, 50933, 63758, 50003, 43693, 52661, 55852, 52372, 59042,
				37595, 4931, 73622, 68387, 86478, 40997, 5245, 75300, 24902, 59609, 35653, 15970,
				37681, 69365, 22236, 86374, 65550, 343, 98377, 35354, 65770, 15365, 41422, 71356,
				16630, 40044, 19290, 66449, 53629, 79452, 71674, 30260, 97303, 6487, 62789, 13005,
				70152, 22501, 49867, 89294, 59232, 31776, 54919, 99851, 5438, 1096, 72269, 50486,
				16719, 6144, 82041, 38332, 64452, 31840, 99287, 59928, 25503, 8407, 46970, 45907,
				99238, 74547, 19704, 72035, 26542, 54600, 79172, 58779, 35747, 78956, 11478, 41195,
				58135, 63856, 33037, 45753, 60159, 25193, 71838, 7526, 7985, 60714, 88627, 75790,
				38454, 96110, 39237, 19792, 34534, 70169, 24805, 63215, 38175, 38784, 38855, 24826,
				50917, 25147, 17082, 26997, 32295, 10894, 21805, 65245, 85407, 37926, 69214, 38579,
				84721, 23544, 88548, 65626, 75517, 69737, 55626, 52175, 21697, 19453, 16908, 82841,
				24060, 40285, 19195, 80281, 89322, 15232, 70043, 60691, 86370, 91949, 19017, 83846,
				77869, 14321, 95102, 87073, 71467, 31305, 64677, 80358, 52629, 79419, 22359, 87867,
				48296, 50141, 46807, 82184, 95812, 84665, 74511, 59914, 4146, 90417, 58508, 62875,
				17630, 21868, 9199, 30322, 33352, 43374, 25473, 4119, 63086, 14147, 14863, 38020,
				44757, 98628, 57916, 22199, 11865, 42911, 62651, 78290, 9392, 77294, 63168, 21043,
				17409, 13786, 27475, 75979, 89668, 43596, 74316, 84489, 54941, 95992, 45445, 41059,
				55142, 15214, 42903, 16799, 88254, 95984, 48575, 77822, 21067, 57238, 35352, 96779,
				89564, 23797, 99937, 46379, 27119, 16060, 30302, 95327, 12849, 38111, 97090, 7598,
				78473, 63079, 18570, 72803, 70040, 91385, 96436, 96263, 17368, 56188, 85999, 50026,
				36050, 73736, 13351, 48321, 28357, 51718, 65636, 72903, 21584, 21060, 39829, 15564,
				4716, 14594, 22363, 97639, 65937, 17802, 31535, 42767, 98761, 30987, 57657, 33398,
				63053, 25926, 20944, 19306, 81727, 2695, 97479, 79172, 72764, 66446, 78864, 12698,
				15812, 97209, 38827, 91016, 91281, 57875, 45228, 49211, 69755, 99224, 43999, 62879,
				8879, 80015, 74396, 57146, 64665, 31159, 6980, 79069, 37409, 75037, 69977, 85919,
				42826, 6974, 61063, 97640, 13433, 92528, 91311, 8440, 38840, 22362, 93929, 1836,
				36590, 75052, 89475, 15437, 65648, 99012, 70236, 12307, 83585, 414, 62851, 48787,
				28447, 21702, 57033, 29633, 44760, 34165, 27548, 37516, 24343, 63046, 2081, 20378,
				19510, 42226, 97134, 68739, 32982, 56455, 53129, 77693, 25022, 55534, 99375, 30086,
				98001, 7432, 67126, 76656, 29347, 28492, 43108, 64736, 32278, 84816, 80440, 30461,
				818, 9136, 1952, 48442, 91058, 92590, 10443, 5195, 34009, 32141, 62209, 43740,
				54102, 76895, 98172, 31583, 4155, 66492, 58981, 16591, 11331, 6838, 3818, 77063,
				12523, 45570, 68970, 70055, 77751, 73743, 71732, 4704, 61384, 57343, 66682, 44500,
				89745, 10436, 67202, 36455, 42467, 88801, 91280, 1056, 27534, 81619, 79004, 25824,
				66362, 33280, 20706, 31929, 57422, 18730, 96197, 22101, 47592, 2180, 18287, 82310,
				60430, 59627, 26471, 7794, 60475, 76713, 45427, 89654, 14370, 81674, 41246, 98416,
				8669, 48883, 77154, 9806, 94015, 60347, 20027, 8405, 33150, 27368, 53375, 70171,
				59431, 14534, 34018, 85665, 77797, 17944, 49602, 74391, 48830, 55029, 10371, 94261,
				16658, 68400, 44148, 28150, 40364, 90913, 73151, 64463, 50058, 78191, 84439, 82478,
				62398, 3113, 17578, 12830, 6571, 95934, 9132, 25287, 78731, 80683, 67207, 76597,
				42096, 34934, 76609, 52553, 47508, 71561, 8038, 83011, 72577, 95790, 40076, 20292,
				32138, 61197, 95476, 23123, 26648, 13611, 48452, 39963, 85857, 4855, 27029, 1542,
				72443, 53688, 82635, 56264, 7977, 23090, 93553, 65434, 12124, 91087, 87800, 95675,
				99419, 44659, 30382, 55263, 82514, 86800, 16781, 65977, 65946, 13033, 93895, 4056,
				75895, 47878, 91309, 51233, 81409, 46773, 69135, 56906, 84493, 34530, 84534, 38312,
				54574, 92933, 77341, 20839, 36126, 1143, 35356, 35459, 7959, 98335, 53266, 36146,
				78047, 50607, 22486, 63308, 8996, 96056, 39085, 26567, 6779, 62663, 30523, 47881,
				41279, 49864, 82248, 78333, 29466, 48151, 41957, 93235, 53308, 22682, 90722, 54478,
				7235, 34306, 15827, 20121, 96837, 6283, 80172, 66109, 92592, 48238, 76428, 94546,
				45430, 16288, 74839, 740, 25553, 83767, 35900, 5998, 7493, 46755, 11449, 88824,
				44906, 33143, 7454, 56652, 34755, 63992, 59674, 65131, 46358, 12799, 96988, 51158,
				73176, 1184, 49925, 63519, 11785, 29073, 72850, 47997, 75172, 55187, 15313, 40725,
				33225, 56643, 10465, 38583, 86440, 97967, 26401, 17078, 38765, 33454, 19136, 57712,
				48446, 98790, 27315, 71074, 10157, 57946, 35582, 49383, 61324, 26572, 84503, 3496,
				60449, 17962, 26017, 65651, 40400, 83246, 80056, 75306, 75147, 41863, 25581, 87530,
				33193, 43294, 5065, 99644, 62771, 75986, 79005, 44924, 18703, 40889, 4403, 5862,
				2571, 82500, 74200, 36170, 46836, 74642, 65471, 26815, 30937, 64946, 10160, 15544,
				31962, 54015, 28853, 66533, 14573, 79398, 47391, 73165, 47805, 77589, 16881, 13423,
				89452, 76992, 62509, 9796, 57540, 13486, 48855, 25546, 47589, 21012, 47388, 78428,
				70196, 84413, 81026, 87597, 22445, 83769, 85937, 38321, 85485, 87359, 9839, 67228,
				71179, 94372, 4446, 62801, 50775, 96179, 40646, 44272, 12417, 47199, 39701, 30665,
				32775, 66525, 53558, 78882, 31939, 67209, 38906, 34533, 99914, 27719, 216, 99225,
				96537, 3843, 90564, 91110, 51838, 30300, 9559, 37795, 94880, 11325, 44979, 89696,
				28129, 29931, 89971, 46292, 92710, 11036, 74760, 75307, 12291, 49618, 16293, 92408,
				67928, 80823, 32872, 25460, 66819, 35374, 4035, 99087, 61129, 11341, 39118, 10891,
				37217, 63638, 75477, 30068, 42334, 57570, 6890, 59353, 89939, 37692, 15232, 20033,
				32202, 22348, 2766, 96791, 58448, 92248, 5769, 96684, 67885, 99295, 47271, 38655,
				59513, 96960, 31718, 8974, 16122, 20535, 52380, 29769, 70660, 57425, 50891, 75044,
				84257, 73315, 38181, 28673, 93140, 26307, 82265, 78382, 19681, 56585, 8975, 76764,
				39956, 83450, 84663, 89963, 71584, 57696, 30829, 60527, 64947, 34899, 28805, 28397,
				91830, 51842, 99838, 39839, 66971, 67177, 74219, 35637, 35634, 93581, 81746, 29991,
				81096, 94279, 2968, 62561, 2479, 82126, 25702, 67953, 88088, 50293, 83423, 86206,
				39935, 23253, 43041, 48941, 85787, 8388, 6671, 43574, 84908, 67295, 33623, 55060,
				28174, 48415, 2529, 22009, 24524, 5283, 30460, 32399, 80423, 56929, 40852, 69969,
				88541, 5979, 91496, 64730, 57198, 83145, 39750, 3568, 54669, 98679, 4297, 51047,
				31492, 47734, 31343, 31180, 232, 19707, 24823, 75079, 73943, 17997, 8446, 91252,
				39879, 58682, 82972, 18417, 39203, 36681, 42895, 8459, 15618, 17941, 52594, 43277,
				16530, 40052, 91100, 87422, 47230, 95699, 49794, 50492, 87439, 86354, 4546, 65333,
				11057, 77727, 19748, 38722, 91821, 18107, 42125, 89239, 28847, 54623, 38783, 47803,
				31414, 38450, 3697, 89186, 30579, 44188, 26532, 8420, 80723, 48100, 60748, 76330,
				45832, 8311, 16051, 4475, 13400, 48527, 46073, 17439, 56498, 94632, 9021, 16871,
				83366, 14896, 4219, 38375, 87890, 90217, 42370, 61028, 85101, 76771, 83715, 94737,
				69973, 74187, 1958, 59691, 86712, 86570, 60984, 76342, 13648, 85250, 28323, 48379,
				45141, 36277, 51845, 29039, 3553, 5128, 59866, 51281, 68124, 17007, 24729, 29710,
				41439, 40574, 11774, 86746, 89698, 56020, 37810, 88972, 11361, 95583, 70786, 589,
				74473, 87513, 17690, 61427, 72914, 32517, 1804, 97910, 6327, 30246, 33049, 2622,
				41026, 80875, 41293, 16752, 84225, 84414, 37137, 68956, 8095, 64981, 28180, 38629,
				76962, 23840, 17477, 75268, 48297, 70340, 57888, 13938, 38554, 86836, 2195, 30270,
				55484, 53364, 54705, 41380, 56316, 37723, 234, 21424, 26664, 63804, 75139, 36534,
				18579, 9833, 98849, 72762, 59767, 52497, 24227, 83152, 71794, 21398, 99456, 89215,
				51632, 54799, 27973, 68568, 68465, 98500, 28681, 18369, 24279, 96335, 12874, 82160,
				67202, 85199, 27908, 67022, 49810, 77929, 96212, 81153, 77884, 7032, 1671, 53362,
				28119, 56786, 30883, 28540, 76029, 3774, 64611, 19736, 25589, 46569, 45206, 48215,
				69523, 17423, 91807, 90039, 30393, 58319, 85098, 66519, 57571, 24541, 3562, 14400,
				62731, 82534, 61477, 89731, 18421, 29861, 52829, 838, 78040, 43350, 74323, 82892,
				84746, 28302, 13264, 7595, 134, 12933, 46831, 24864, 47275, 20527, 9110, 28485,
				30326, 99826, 64005, 99308, 65779, 42760, 90066, 3974, 38688, 39968, 32604, 11694,
				46262, 73262, 45405, 43923, 67397, 88228, 56405, 17839, 92073, 57622, 93328, 15442,
				50186, 7570, 58001, 31e3, 8915, 11467, 14793, 82691, 51238, 12485, 51745, 18192,
				5985, 36826, 89434, 38669, 91592, 88799, 65621, 67237, 59541, 19657, 93402, 58705,
				73553, 78280, 69125, 95591, 81168, 91927, 25976, 89077, 71690, 19404, 64603, 59752,
				74698, 44233, 67602, 38615, 31303, 28650, 53700, 89819, 7783, 4351, 77451, 47350,
				21234, 16016, 41532, 76508, 23063, 44993, 43983, 33356, 61715, 96485, 22121, 78004,
				6316, 87896, 99289, 93981, 37850, 66128, 92735, 45064, 50924, 24204, 58816, 65290,
				34392, 55567, 66416, 72353, 45775, 68590, 85685, 72683, 60090, 37149, 85347, 57414,
				72336, 12979, 5720, 92754, 76911, 96883, 74420, 5220, 85815, 23557, 80567, 44365,
				70254, 50864, 36619, 51479, 23281, 76428, 18580, 34240, 59289, 49076, 18439, 29522,
				42541, 4024, 84446, 92434, 90407, 77241, 19690, 78143, 65919, 13699, 91844, 91241,
				38361, 67171, 90551, 5709, 3474, 76025, 97043, 33834, 44638, 54040, 82797, 545,
				38159, 16089, 35870, 89158, 55864, 98078, 50563, 36492, 10994, 85909, 9018, 19252,
				73887, 67928, 60045, 70782, 11937, 4074, 53814, 46621, 52577, 94853, 45968, 73667,
				65062, 73306, 76045, 78649, 91654, 53958, 96537, 95542, 67622, 54579, 17279, 67440,
				56441, 20681, 64011, 52226, 96618, 32831, 60664, 67547, 39523, 2043, 59748, 1887,
				69229, 94653, 99271, 98164, 62155, 9234, 47367, 13047, 6364, 35064, 10073, 6793,
				80248, 29009, 44969, 11129, 17139, 79630, 89772, 26921, 56949, 23465, 30036, 17173,
				82459, 96218, 60768, 76417, 24405, 18710, 68887, 82394, 69729, 82503, 40873, 41590,
				67255, 30757, 9657, 91881, 34578, 9511, 5417, 58953, 18532, 10721, 22029, 48524,
				47778, 881, 83489, 3464, 57462, 97459, 86689, 39755, 39547, 740, 36666, 7993, 31671,
				86304, 12970, 73402, 52849, 31652, 79655, 11250, 18463, 57518, 20306, 25301, 1374,
				51208, 33298, 87662, 61849, 60923, 68685, 69411, 39266, 80320, 34844, 89416, 81569,
				83651, 35795, 40168, 33501, 1042, 58931, 3892, 85188, 74740, 85476, 23790, 33842,
				89565, 53359, 25579, 59049, 62394, 72435, 12457, 21904, 18370, 97035, 57905, 9581,
				91227, 92754, 37760, 1411, 7440, 87175, 88318, 63242, 85960, 56690, 12618, 30493,
				11569, 73723, 7448, 58830, 157, 65814, 21118, 22140, 73793, 57855, 81830, 6795,
				13183, 12625, 30635, 56429, 73216, 12342, 36722, 83886, 96828, 82870, 90954, 97614,
				2370, 42160, 73370, 11944, 49067, 59452, 80495, 43911, 46712, 17033, 68037, 41963,
				3874, 44856, 82985, 57453, 84358, 16120, 4454, 76624, 405, 62369, 55080, 61880,
				51270, 87807, 10653, 36894, 70850, 35660, 234, 14705, 93418, 94084, 82856, 25384,
				71555, 56754, 78315, 18291, 91656, 98079, 52384, 43306, 65205, 75903, 58701, 99496,
				50048, 33557, 87793, 90857, 10143, 46726, 84284, 43635, 41213, 83845, 70986, 91408,
				80220, 5728, 68890, 46577, 21152, 43759, 43301, 93661, 97252, 50106, 10099, 13722,
				18572, 44024, 351, 18173, 23717, 85114, 85998, 57782, 63951, 53723, 86853, 63851,
				79430, 49181, 46386, 69666, 55743, 76162, 71724, 40028, 94786, 34457, 16906, 90040,
				30789, 40281, 94697, 96584, 81907, 4055, 53990, 66397, 80579, 42517, 78181, 39251,
				9467, 67097, 95523, 66568, 63632, 71048, 15581, 39904, 75774, 77495, 75994, 29911,
				65690, 41178, 47712, 70355, 16998, 56025, 5230, 10093, 71495, 34784, 70950, 54680,
				57811, 53782, 39145, 36829, 85342, 40406, 35883, 45668, 3459, 29870, 78252, 70088,
				70621, 67153, 5737, 40933, 91075, 93335, 86853, 15860, 81167, 91259, 16118, 52401,
				83593, 84474, 2423, 75608, 39646, 90871, 70284, 82100, 96032, 5115, 63678, 2225,
				88087, 58581, 44364, 57468, 21539, 13042, 64150, 63754, 5210, 87644, 54114, 64013,
				63562, 41388, 32397, 74152, 23982, 71982, 71700, 33026, 66477, 47838, 46712, 39848,
				35083, 65927, 97868, 11067, 76771, 71799, 43836, 41014, 97025, 93225, 8511, 63096,
				26628, 73012, 12543, 76269, 99708, 2629, 49845, 73677, 19193, 14924, 57236, 95564,
				15010, 59667, 73773, 78515, 2624, 99744, 13585, 33746, 58771, 94785, 62628, 99585,
				11363, 80832, 59979, 9444, 78700, 2596, 85984, 69438, 16913, 96475, 93283, 18625,
				77086, 45911, 39746, 64722, 39938, 43930, 54619, 302, 50384, 2738, 75714, 75249,
				95439, 80714, 52555, 47266, 96190, 78750, 94973, 83669, 16479, 53163, 48071, 28e3,
				45011, 26733, 67132, 83362, 84162, 43028, 8415, 27236, 52651, 89059, 64844, 80910,
				1676, 91752, 57815, 26264, 3415, 57532, 29981, 61200, 96036, 62600, 20068, 56530,
				38487, 8432, 89514, 26883, 69165, 97237, 22361, 55276, 39902, 95927, 82190, 49269,
				27212, 46095, 37106, 64254, 27460, 49572, 51700, 27679, 12574, 33891, 3867, 9925,
				6476, 82018, 45094, 59014, 67113, 44192, 75, 23318, 79895, 70550, 81717, 28833,
				30271, 15821, 14999, 88174, 62617, 57517, 55256, 50281, 51583, 96879, 5225, 42272,
				5339, 20483, 57596, 41011, 75937, 22767, 50120, 95938, 49753, 63882, 99616, 69083,
				38721, 73889, 80236, 99531, 23053, 71237, 48861, 59046, 76283, 60538, 19732, 93877,
				30345, 64882, 66660, 17026, 70364, 45676, 8039, 96228, 89936, 59141, 95585, 89552,
				97247, 59325, 27848, 80058, 15950, 61481, 90906, 40998, 44137, 16144, 66300, 44091,
				50018, 81364, 18211, 60294, 76559, 20279, 27414, 10589, 39860, 23e3, 31767, 95618,
				56738, 50332, 16936, 70342, 92481, 30702, 76264, 62619, 68678, 62284, 83112, 93032,
				55203, 52614, 36950, 41796, 45403, 79262, 2887, 53596, 61308, 20738, 34811, 27099,
				90956, 65448, 3080, 75795, 29753, 97699, 80872, 23830, 85882, 74427, 99523, 74904,
				28017, 45898, 57232, 48525, 7086, 26805, 74533, 92470, 18840, 76011, 93109, 14344,
				55614, 50284, 15865, 19458, 35856, 13464, 53679, 64603, 51571, 56124, 79107, 29596,
				89572, 78198, 57121, 73649, 8804, 87977, 87959, 70859, 40909, 77295, 87877, 75158,
				62810, 92074, 23244, 59516, 50552, 31602, 41899, 6347, 27821, 68370, 48596, 88577,
				30231, 25267, 84622, 31449, 12086, 56461, 22962, 78213, 62483, 93966, 60437, 52239,
				58113, 32526, 38708, 81607, 57016, 1695, 90110, 4649, 59990, 23979, 3855, 10297,
				46516, 96092, 82305, 30760, 78756, 4967, 82876, 4773, 86651, 16648, 53133, 82439,
				78851, 49766, 24553, 15273, 36417, 1901, 33386, 76979, 25920, 33372, 2695, 11982,
				40911, 6230, 91696, 43907, 17827, 30332, 89203, 32215, 91806, 23080, 49102, 9174,
				11548, 54590, 75803, 66108, 73882, 62324, 26017, 72716, 33887, 1285, 31604, 71039,
				24337, 53514, 58964, 89901, 22040, 92751, 12617, 37007, 5523, 61672, 62557, 98540,
				26094, 60284, 19621, 96230, 38044, 6545, 9458, 42988, 2913, 86345, 67936, 90174,
				40840, 44991, 24256, 34989, 74086, 13652, 68706, 1363, 4294, 88008, 78693, 83068,
				94746, 221, 89299, 53186, 5930, 61889, 51341, 45412, 58860, 72568, 11381, 59785,
				36887, 10690, 31347, 93326, 96267, 86987, 57565, 86836, 49071, 90331, 41248, 34629,
				30240, 27270, 3864, 84308, 3035, 61369, 36902, 51017, 44409, 17120, 23823, 36460,
				63359, 8333, 63173, 19134, 6493, 303, 18550, 26191, 19051, 81502, 66343, 6737,
				90430, 65478, 58982, 82484, 16483, 47704, 44640, 68322, 44548, 72787, 2335, 28749,
				39320, 5436, 98146, 56596, 812, 51445, 35533, 35478, 47573, 38414, 25542, 38032,
				13442, 42983, 97207, 77854, 57806, 81616, 52828, 79429, 47389, 96795, 57764, 19605,
				24767, 63253, 18809, 65093, 44449, 22952, 76872, 30983, 38948, 9310, 48336, 87651,
				27110, 84427, 76209, 56412, 12760, 16747, 14551, 82626, 31224, 98636, 75100, 84882,
				79479, 83420, 5347, 6803, 90063, 4617, 40257, 79183, 41766, 71873, 25242, 12275,
				336, 40798, 42055, 74066, 69128, 32547, 76508, 32530, 42359, 89207, 49758, 58984,
				92732, 15779, 7234, 28884, 28226, 50011, 35883, 99606, 45423, 76224, 75427, 85747,
				33879, 97978, 57441, 927, 19164, 74716, 40702, 19715, 70917, 60344, 40236, 9019,
				50577, 15598, 53136, 57285, 20536, 7539, 74832, 89184, 41501, 39447, 97422, 97041,
				21913, 40581, 76081, 13089, 28776, 54164, 55736, 36263, 71841, 34488, 74988, 55467,
				43322, 9214, 36746, 67981, 71877, 81683, 32461, 84091, 19422, 88366, 62054, 85664,
				13409, 8003, 88276, 6989, 16607, 33633, 85349, 5784, 25950, 97998, 74110, 16699,
				60184, 92818, 79705, 10381, 1474, 18656, 50434, 18232, 92132, 66537, 70141, 42854,
				25120, 39581, 28249, 14215, 34810, 19767, 3409, 11807, 6566, 66138, 42997, 41999,
				67504, 87117, 28961, 5e3, 29673, 77726, 73225, 54753, 69712, 71576, 92337, 17713,
				63185, 87923, 91889, 68351, 17712, 75532, 93849, 48280, 62219, 317, 25290, 29209,
				90927, 92929, 92762, 60413, 2018, 31793, 76290, 73373, 80777, 60819, 77375, 57886,
				47291, 99670, 32605, 29064, 99476, 80999, 31217, 35, 91300, 14892, 73653, 26593,
				25305, 56797, 12837, 39560, 27582, 37253, 38531, 76489, 49946, 69108, 58687, 43092,
				73807, 96282, 6648, 67431, 87124, 57694, 21660, 64002, 6, 33600, 30245, 60636,
				80164, 9285, 61426, 4658, 54130, 14710, 76553, 1904, 93668, 63110, 98618, 5601,
				32199, 74923, 98049, 49717, 55539, 35940, 58545, 43295, 35810, 45451, 38735, 42065,
				66769, 69825, 45461, 83881, 67372, 67351, 90612, 79502, 69460, 23108, 74421, 82990,
				46821, 40683, 71603, 55267, 48192, 50242, 79738, 96417, 6664, 19929, 23644, 41116,
				51056, 219, 45086, 32747, 49492, 15399, 24874, 80825, 95928, 61457, 45813, 59037,
				16136, 3953, 83583, 5910, 12654, 53630, 92997, 22168, 93491, 71897, 74579, 24022,
				6278, 24049, 71670, 43044, 8474, 38572, 77402, 35800, 7455, 96177, 41653, 74493,
				20802, 65843, 73050, 73349, 2638, 65813, 96209, 49196, 45007, 32207, 14097, 66059,
				46681, 7534, 71263, 20582, 10171, 51514, 52142, 60961, 57951, 25637, 37860, 21683,
				86190, 90434, 94481, 85697, 95344, 2606, 74095, 61133, 7472, 64777, 94050, 41482,
				975, 23471, 76052, 82021, 87676, 91345, 20196, 2612, 86299, 44996, 40312, 65712,
				46079, 88514, 8610, 3685, 63197, 9073, 53105, 86824, 28112, 99306, 40706, 66840,
				83003, 51590, 52755, 32285, 68454, 85058, 13645, 23073, 24724, 52989, 71880, 21952,
				44144, 74975, 76715, 7844, 46447, 86643, 75579, 29276, 10864, 83179, 36721, 19300,
				35066, 29383, 47478, 56644, 33354, 31414, 17643, 92374, 85085, 88458, 87191, 85248,
				34963, 76278, 53230, 13953, 76985, 70959, 36663, 5293, 32658, 56767, 56997, 76736,
				6558, 64248, 11907, 29123, 78458, 17678, 63805, 89973, 5076, 39263, 54404, 4355,
				64957, 74407, 99838, 18836, 78098, 6490, 74888, 73719, 80675, 86178, 56283, 33591,
				96957, 38382, 18772, 74773, 71229, 2603, 52673, 44609, 14843, 58418, 18060, 95459,
				626, 30914, 13550, 42195, 44863, 8871, 89182, 64446, 78422, 41140, 15312, 98274,
				48168, 95651, 35562, 85386, 56252, 72136, 85088, 68761, 78434, 98143, 61330, 2446,
				64409, 49406, 99127, 98626, 55095, 44808, 13594, 87370, 89472, 12833, 98932, 68064,
				58193, 20225, 5192, 28425, 23978, 24542, 80845, 55858, 4015, 21454, 37346, 51007,
				17202, 10242, 12682, 55933, 96922, 22280, 75597, 50227, 70712, 44236, 20470, 36320,
				49339, 60536, 80083, 38880, 93327, 49522, 93585, 9918, 55268, 4671, 57526, 11457,
				48424, 54610, 7211, 78610, 9473, 72923, 27347, 30057, 76968, 26177, 59367, 46172,
				88951, 40229, 34921, 60405, 88959, 16779, 29547, 92231, 61997, 36002, 21080, 39795,
				77221, 10012, 49748, 76900, 15964, 3803, 40260, 92351, 92844, 10288, 57483, 10881,
				70408, 75688, 16610, 1638, 93082, 44282, 66849, 75702, 69428, 34047, 84968, 71281,
				72328, 73143, 88672, 49802, 50639, 18129, 93659, 58389, 49095, 45971, 34196, 84609,
				59222, 19332, 17777, 41004, 47057, 30688, 16039, 20906, 41477, 42915, 60877, 33864,
				75195, 62294, 3371, 11672, 1370, 2486, 35553, 17907, 90621, 45136, 9722, 67635,
				12114, 63055, 16004, 21625, 24321, 20491, 26881, 66259, 94287, 54751, 36242, 36557,
				5842, 30687, 65418, 94608, 24741, 45887, 78800, 86912, 42076, 50287, 9284, 68891,
				76368, 83094, 96302, 35997, 30761, 97081, 9501, 68887, 32876, 1705, 34260, 95065,
				45528, 88241, 30402, 12318, 52430, 40139, 96986, 84900, 72408, 42027, 31676, 54382,
				73370, 26184, 14024, 57444, 57660, 52173, 30274, 93448, 63273, 77681, 74946, 2099,
				69091, 19372, 66961, 14595, 58642, 75760, 52253, 53148, 26074, 52293, 65359, 63971,
				4833, 86492, 1227, 54505, 19515, 89889, 46933, 13364, 33883, 83389, 36952, 52505,
				67513, 40071, 31001, 3105, 87912, 29610, 75108, 37363, 28479, 43546, 89992, 19550,
				54863, 82633, 19209, 21548, 35022, 21960, 57961, 11815, 95867, 559, 26428, 69386,
				57453, 70147, 73538, 49562, 46806, 64550, 36653, 25718, 68792, 31113, 7607, 48037,
				71020, 22666, 65957, 11141, 39227, 7990, 19849, 65972, 74528, 40888, 55386, 95918,
				92088, 91125, 53648, 66122, 138, 79933, 71058, 34826, 97725, 69513, 22915, 18246,
				52244, 91161, 40861, 40374, 13239, 56162, 4703, 95851, 22824, 41271, 28202, 62852,
				84238, 46625, 20031, 8524, 20077, 65817, 21174, 29279, 57712, 22401, 67500, 30980,
				74485, 26480, 21343, 30031, 61921, 35744, 57308, 71196, 1865, 49234, 62616, 54021,
				29008, 83672, 85839, 96836, 45077, 80900, 66906, 63526, 93824, 71820, 11033, 20183,
				85704, 4683, 63512, 39144, 56880, 64424, 95979, 17709, 94849, 31771, 5737, 84286,
				16757, 46256, 24478, 73180, 59978, 8254, 78963, 95437, 86351, 33824, 32540, 18357,
				2668, 99260, 21284, 81351, 70961, 10255, 6911, 47394, 72408, 23827, 59865, 96395,
				30665, 43699, 3593, 29165, 23388, 26628, 92402, 16731, 86740, 29493, 9069, 78653,
				90094, 42735, 33682, 95041, 89887, 92369, 57949, 81585, 50593, 14698, 4737, 72551,
				57271, 59433, 156, 33966, 58773, 59108, 49578, 18100, 59836, 73221, 21110, 1650,
				11058, 47770, 66141, 84576, 58388, 40915, 94507, 32209, 17272, 65674, 95552, 25685,
				5345, 36995, 36302, 7971, 67001, 62062, 75939, 36005, 26739, 56484, 46885, 66348,
				87666, 78055, 44485, 82955, 85936, 9219, 1847, 92687, 72579, 45457, 78252, 98239,
				4e4, 75563, 92408, 17175, 78845, 32638, 26959, 35406, 59553, 57852, 7506, 9, 93172,
				77713, 93880, 40981, 27924, 9678, 24538, 52426, 84852, 83781, 23712, 82490, 77890,
				22482, 66668, 55850, 25644, 44972, 62275, 78089, 28894, 98685, 32998, 98766, 89119,
				34355, 75127, 69797, 71419, 62067, 57990, 96514, 50603, 79807, 26135, 29207, 43632,
				32905, 38513, 18924, 88872, 20758, 70232, 60425, 1116, 24077, 21369, 93541, 75329,
				78656, 44251, 42014, 98154, 42552, 14575, 30765, 348, 1134, 71581, 68420, 78141,
				21105, 63305, 9718, 54851, 65867, 8595, 47390, 39182, 51174, 41478, 64433, 59628,
				31945, 87322, 78667, 95282, 5622, 26224, 19972, 97269, 98376, 14779, 51138, 49658,
				45345, 4972, 52794, 15737, 496, 48939, 63485, 42780, 16061, 59631, 37171, 13483,
				56058, 51093, 62290, 88227, 17400, 88433, 67363, 89507, 26482, 85964, 71336, 67799,
				28342, 37747, 61722, 27180, 78755, 18603, 42953, 6606, 23875, 56766, 1932, 36113,
				62807, 84012, 21103, 9685, 69662, 76755, 13701, 95168, 13169, 44726, 15284, 16702,
				89617, 54397, 52052, 12835, 37741, 86434, 22400, 37947, 95763, 86337, 35189, 22756,
				47473, 16618, 42479, 47405, 14055, 64262, 66670, 89692, 54032, 94591, 44149, 29854,
				76691, 33263, 62048, 25116, 88598, 16119, 62116, 54517, 31883, 86707, 18895, 81790,
				71294, 2684, 15292, 48107, 14341, 91416, 75609, 92564, 39987, 2283, 89970, 95855,
				80970, 5432, 89860, 90293, 99851, 94648, 5598, 32171, 28793, 92305, 64244, 8277,
				93391, 96717, 34464, 29838, 10664, 28050, 60122, 77934, 10758, 84922, 92220, 45071,
				97697, 36368, 17792, 84792, 76594, 67319, 51886, 5665, 45201, 11348, 9254, 7510,
				51039, 91683, 84500, 85338, 5555, 19633, 3870, 39576, 41486, 58524, 54508, 20707,
				58504, 39642, 22454, 80069, 83455, 31043, 90794, 51934, 3295, 26582, 16300, 74990,
				22197, 83310, 69642, 81113, 58558, 84833, 17105, 46659, 25003, 85749, 44829, 4103,
				67516, 76458, 52392, 53546, 70291, 98846, 67315, 30686, 18555, 29755, 5923, 22732,
				19501, 56181, 85351, 5023, 4808, 56911, 16793, 75336, 49712, 27723, 96974, 34321,
				5454, 12862, 71924, 45928, 95697, 68664, 58183, 78104, 42483, 71204, 99628, 40642,
				56410, 17350, 13396, 76724, 87509, 9158, 83708, 27298, 92651, 95086, 38851, 63558,
				89810, 1580, 32518, 35795, 26514, 56322, 78635, 63731, 91428, 7247, 66460, 38671,
				26799, 22549, 47991, 46064, 80467, 40083, 17141, 39152, 99872, 27561, 75389, 74778,
				94893, 82935, 99076, 93419, 10474, 84436, 47536, 16719, 60136, 80566, 28404, 74525,
				74212, 3704, 65516, 98197, 34210, 64140, 22238, 49939, 99542, 27481, 21992, 78181,
				90060, 71365, 66935, 29578, 14961, 8569, 9454, 43308, 66753, 45972, 93572, 16382,
				87320, 37183, 25478, 38164, 31997, 69856, 60898, 63968, 62264, 4799, 17591, 89937,
				73905, 55890, 88285, 2448, 40398, 54180, 65869, 45155, 43407, 39105, 339, 51619,
				20203, 21189, 68245, 76912, 1222, 76411, 82679, 7, 66047, 32043, 42627, 16638,
				27019, 15248, 66444, 8249, 18790, 82150, 54084, 84469, 3426, 50226, 99868, 88894,
				43769, 66384, 8593, 41414, 2976, 60053, 51866, 87904, 74135, 53842, 59520, 67482,
				16995, 32328, 29555, 49067, 2799, 68851, 41049, 97190, 53984, 99755, 46412, 45885,
				64e3, 21962, 36438, 71742, 57223, 66599, 86071, 31436, 32667, 98099, 38399, 47377,
				5171, 2742, 48803, 17823, 22093, 9866, 691, 5514, 25546, 2114, 5919, 56181, 96052,
				67211, 61712, 25995, 3188, 23833, 38549, 44775, 55355, 61548, 55988, 47309, 23749,
				30667, 70732, 33299, 16127, 30842, 78961, 41072, 9876, 18903, 30292, 25275, 61881,
				15939, 72573, 84502, 92654, 97226, 53434, 77025, 63892, 12421, 33644, 39445, 30933,
				84218, 13757, 37719, 84450, 2697, 60309, 22402, 80310, 92771, 45205, 72792, 95776,
				85945, 74651, 216, 50842, 47854, 21916, 61588, 75405, 10495, 83083, 60427, 78495,
				99809, 47890, 22993, 21508, 9459, 26845, 98130, 1184, 46438, 27698, 40652, 65654,
				98517, 1096, 6998, 49133, 57041, 77983, 58708, 42176, 67356, 324, 70063, 10597,
				65205, 25622, 34336, 16640, 27896, 26907, 86760, 48244, 89650, 44997, 51609, 28934,
				9171, 97859, 97213, 19859, 41037, 64081, 94781, 27683, 41521, 52871, 86935, 26486,
				38744, 25943, 60617, 6414, 42292, 46204, 53262, 30201, 38776, 88831, 97253, 67282,
				72860, 18452, 60927, 81504, 57713, 30296, 10896, 39900, 67135, 42772, 4631, 55283,
				39253, 25264, 1809, 12874, 88035, 88421, 90491, 83290, 6884, 15444, 90113, 20406,
				20796, 40239, 34431, 15018, 45600, 17241, 26611, 9551, 89126, 65673, 31708, 91252,
				39647, 63011, 24193, 58932, 89326, 33491, 53217, 27976, 70151, 37531, 53576, 23931,
				11789, 73073, 52171, 89301, 51718, 15385, 79487, 66436, 35771, 34163, 86540, 42665,
				80748, 77622, 14679, 40185, 25030, 42622, 13162, 17048, 24243, 59985, 59807, 60562,
				3595, 10135, 29199, 69784, 59796, 38194, 58432, 50943, 40422, 63035, 3208, 81440,
				90749, 88046, 32218, 88092, 22224, 2627, 91576, 16781, 43948, 57795, 71073, 27817,
				87077, 82717, 24473, 42096, 76920, 88864, 90537, 14715, 42551, 45066, 24316, 37361,
				38582, 21871, 14672, 93362, 21727, 57021, 94313, 39562, 64985, 94028, 46094, 43845,
				91838, 79574, 7597, 3153, 56783, 18817, 74711, 6883, 91061, 31674, 73729, 99315,
				66183, 57647, 74484, 68077, 33224, 397, 56753, 53158, 71872, 68153, 9298, 20961,
				49656, 33407, 95683, 14328, 44708, 72952, 27048, 67887, 28741, 46752, 88177, 95894,
				40086, 88534, 87112, 68614, 83073, 88794, 96799, 67588, 75049, 84603, 83140, 97347,
				87316, 73087, 77135, 71883, 98643, 3808, 8848, 14133, 60447, 1366, 72976, 1868,
				51667, 63279, 60040, 88264, 79152, 3474, 61366, 20523, 21584, 93712, 83654, 89761,
				90154, 96345, 37539, 32556, 74254, 70603, 97122, 44978, 78028, 8943, 13778, 11080,
				34271, 68276, 85372, 48410, 94516, 15427, 75323, 71685, 70774, 50342, 33771, 3678,
				42321, 69788, 41758, 55004, 30992, 17402, 63523, 42328, 87171, 24751, 15084, 33884,
				83655, 88345, 69602, 52606, 57886, 18034, 3381, 75796, 35901, 77480, 28683, 68324,
				66035, 7223, 14926, 16128, 13645, 90370, 31949, 11057, 98849, 29499, 21565, 30786,
				83292, 92392, 37104, 36899, 49906, 79368, 43710, 80365, 88735, 75275, 21664, 57965,
				19002, 301, 12658, 94385, 1717, 96191, 50404, 80166, 93965, 24688, 27839, 10812,
				31715, 92127, 42588, 93307, 80834, 11317, 26583, 25769, 98227, 14884, 58462, 29148,
				68662, 26872, 72927, 79021, 51622, 29521, 33355, 45701, 45996, 33782, 93424, 16530,
				96086, 17329, 74020, 11501, 46660, 5583, 22277, 77653, 55430, 84644, 448, 86828,
				58855, 67451, 95264, 67386, 82424, 52611, 60012, 88620, 72894, 94716, 22262, 99813,
				69592, 63464, 33163, 91857, 47904, 22209, 78590, 68615, 52952, 31441, 41313, 18550,
				72685, 68825, 4795, 53971, 14592, 39634, 23682, 76630, 2731, 81481, 86542, 23727,
				54291, 56045, 61635, 32186, 9355, 73416, 63532, 24340, 18886, 84832, 30654, 48543,
				18339, 65024, 91197, 64624, 74648, 9660, 27897, 49771, 11123, 8732, 49393, 12911,
				72416, 17834, 18878, 62754, 85072, 23727, 56577, 51257, 83291, 12329, 16203, 91681,
				68137, 79959, 43609, 58987, 2026, 42969, 59144, 84349, 75214, 76972, 22633, 64104,
				53799, 16851, 99197, 70476, 77113, 46320, 88693, 37711, 96536, 68156, 7119, 2104,
				49435, 77706, 18924, 24957, 92406, 87148, 70482, 36491, 42605, 54440, 7893, 31618,
				35707, 65130, 30007, 75706, 77266, 37100, 9601, 87681, 42543, 69847, 81848, 32034,
				49429, 99434, 62209, 17125, 55227, 61634, 52574, 83649, 28725, 70119, 62467, 80676,
				21192, 99584, 21310, 25292, 72781, 17186, 10393, 98390, 19789, 92931, 36234, 62627,
				23437, 3885, 58822, 82941, 43806, 8172, 23790, 72295, 36196, 98200, 2889, 87619,
				13846, 56197, 27151, 21238, 48794, 81100, 62643, 40001, 39243, 33213, 78416, 194,
				91369, 79342, 36404, 52308, 13741, 24442, 88610, 12659, 11574, 70052, 93039, 79367,
				41792, 61816, 35435, 47192, 97596, 28330, 41145, 16918, 62865, 9576, 45857, 68737,
				90124, 16703, 7071, 48433, 57222, 34435, 800, 72496, 16449, 68187, 28739, 97672,
				86818, 50768, 40807, 88681, 64340, 2224, 19703, 59245, 90905, 31239, 84216, 93942,
				97371, 16842, 92168, 52692, 16064, 84686, 89444, 27938, 98406, 41365, 4515, 20494,
				18813, 16242, 10634, 61566, 18592, 78057, 8720, 33739, 78345, 87693, 30242, 70545,
				55521, 23687, 9160, 8655, 38811, 61768, 7228, 5567, 5561, 82071, 85, 50145, 23113,
				97761, 88441, 14891, 72188, 85166, 37189, 75671, 81377, 92470, 73645, 93258, 6610,
				12185, 43065, 26704, 47922, 56650, 7527, 18006, 56948, 51675, 16658, 66402, 1047,
				81624, 77395, 62310, 73262, 66050, 57275, 32936, 87641, 51528, 58183, 21952, 84098,
				28913, 28622, 18140, 89796, 41317, 93954, 67690, 64667, 57092, 21315, 4731, 76115,
				77291, 11204, 8634, 93034, 27411, 27149, 13843, 9817, 9407, 84492, 28444, 59901,
				14592, 89654, 66207, 66232, 80293, 74502, 36925, 55515, 10121, 16768, 4720, 71502,
				40500, 21406, 571, 87320, 81683, 42788, 86367, 44686, 22159, 67015, 35892, 49668,
				83991, 72088, 30210, 74009, 86370, 97956, 2132, 93512, 54819, 26094, 51409, 21485,
				94764, 85806, 13393, 48543, 7042, 76538, 64224, 47909, 9994, 23750, 17351, 52141,
				30486, 60380, 86546, 66606, 36913, 58173, 45709, 83679, 82617, 23381, 9603, 61107,
				566, 6572, 64745, 10614, 86371, 43244, 97154, 10397, 50975, 68006, 20045, 16942,
				25536, 74031, 31807, 70133, 78790, 40341, 68730, 39635, 39013, 66841, 44043, 96215,
				21270, 59427, 25034, 40645, 84741, 52083, 54503, 36861, 27659, 95463, 53847, 40921,
				70116, 61536, 56756, 8967, 31079, 20097, 76014, 99818, 16606, 19713, 66904, 27106,
				24874, 96701, 73287, 76772, 6073, 57343, 51428, 91171, 28299, 17520, 64903, 4177,
				36071, 94952, 59008, 28543, 11576, 74547, 13260, 20688, 41261, 2780, 6633, 37536,
				8844, 95774, 49323, 30448, 14154, 83379, 71259, 23302, 68402, 43750, 88505, 15575,
				44927, 6584, 29867, 21541, 65763, 12154, 86616, 79877, 73259, 68626, 98962, 68548,
				86576, 48046, 51755, 64995, 3661, 64585, 81550, 46798, 49319, 50206, 22024, 5175,
				12923, 23427, 55915, 91723, 55831, 83784, 81034, 86779, 34622, 84570, 18960, 48798,
				42970, 95789, 39465, 82353, 68905, 44234, 18244, 54345, 5592, 89361, 14644, 67924,
				66415, 89349, 88530, 72096, 44459, 5258, 48317, 48866, 56886, 90458, 75889, 4514,
				37227, 11302, 4667, 2129, 80414, 86289, 15887, 87380, 50749, 83220, 50529, 20619,
				11606, 36531, 23409, 78122, 19566, 76564, 33045, 66703, 30017, 35347, 35038, 12952,
				13971, 3922, 98702, 11786, 38388, 69556, 76728, 60535, 59961, 23634, 42211, 98387,
				34880, 27755, 93182, 99040, 96390, 65989, 38375, 3652, 59657, 57431, 24666, 11061,
				64713, 85185, 72849, 58611, 31220, 26657, 77056, 24553, 24993, 5210, 89024, 32054,
				46997, 92652, 28363, 98992, 22593, 97710, 47766, 37646, 93573, 95502, 33790, 92973,
				27766, 62671, 89698, 10877, 73893, 41004, 96035, 18795, 48080, 59666, 30241, 35233,
				87353, 43647, 13404, 41982, 19264, 29229, 61369, 8309, 39383, 42305, 25944, 13577,
				51545, 68990, 69801, 37145, 79189, 55897, 57793, 66816, 21930, 56771, 79296, 73793,
				21632, 42301, 23696, 72641, 56310, 85576, 3004, 25669, 69221, 32996, 23040, 65782,
				23712, 13414, 10758, 15590, 97298, 74246, 51511, 46900, 36795, 38292, 3852, 6384,
				84421, 3446, 91670, 45312, 27609, 87034, 6683, 83891, 88991, 16533, 9197, 34427,
				60384, 48525, 90978, 46107, 21693, 12956, 21804, 46558, 37682, 81207, 85840, 53238,
				35026, 4835, 53264, 41376, 17783, 64756, 39278, 25403, 33042, 20954, 31193, 24247,
				45911, 92453, 25370, 86602, 48574, 57865, 26436, 16122, 76614, 17028, 21262, 59718,
				77821, 14036, 31033, 90563, 45410, 15158, 90209, 84089, 38053, 60780, 54166, 14255,
				33120, 27171, 71798, 91214, 80040, 56699, 12475, 40193, 59415, 4769, 75920, 1036,
				2692, 75862, 16612, 73670, 61182, 3305, 90334, 187, 91659, 28063, 75684, 50017,
				82643, 9282, 77376, 85469, 8164, 5584, 36623, 82597, 83859, 3435, 98460, 70095,
				80257, 4381, 6501, 8924, 35514, 14297, 54373, 71369, 5172, 15955, 82441, 4636,
				48215, 6821, 3385, 17663, 40107, 55679, 30366, 42390, 95895, 16083, 58499, 17176,
				55993, 51034, 49296, 4010, 78974, 35930, 2019, 96226, 27167, 68245, 53109, 59037,
				37843, 79243, 10262, 58797, 61490, 82590, 52411, 54783, 29447, 94551, 30026, 97959,
				93939, 73217, 82573, 62154, 78291, 33728, 39102, 11484, 86210, 43794, 73553, 87435,
				1110, 77108, 56521, 78610, 8254, 1842, 43068, 70415, 79195, 26136, 49786, 47279,
				38471, 20379, 54704, 86614, 91138, 51595, 50818, 80186, 73087, 17262, 94735, 4952,
				27935, 4928, 74862, 51392, 62388, 9570, 38485, 30594, 56278, 47395, 72762, 94597,
				72279, 16010, 34697, 54475, 67874, 78014, 88381, 4045, 41494, 55178, 46054, 24373,
				1824, 55333, 7525, 97908, 61178, 84635, 2199, 35361, 4803, 21907, 79414, 66083,
				54782, 58692, 28332, 41851, 28198, 55819, 37313, 67046, 16147, 90478, 71230, 34141,
				85002, 44332, 35906, 429, 39744, 773, 22909, 19536, 98986, 90945, 45209, 85439,
				92265, 25291, 22775, 60611, 49159, 95701, 36113, 53923, 60824, 84935, 29656, 50007,
				86624, 61691, 76150, 32187, 42765, 60660, 13859, 10792, 88210, 29374, 29563, 45188,
				28811, 19739, 67649, 73775, 99247, 48414, 91067, 68253, 9452, 90116, 91737, 73979,
				62370, 69112, 58791, 20349, 71480, 56852, 36919, 87977, 77609, 68738, 85159, 4918,
				70076, 46473, 4122, 57713, 1426, 50987, 77910, 66211, 62546, 77749, 96462, 34304,
				77441, 12104, 91805, 10287, 60943, 49632, 83116, 25716, 23113, 22707, 77770, 31176,
				6759, 46130, 4739, 55554, 3843, 31653, 70834, 72877, 41561, 36903, 23010, 6663,
				2266, 16360, 70118, 91936, 17098, 77278, 4880, 23484, 94970, 41826, 46733, 93484,
				68350, 38861, 18134, 32936, 241, 24803, 13876, 93278, 5039, 35873, 44418, 5305,
				28510, 36115, 46717, 15238, 78607, 23464, 68635, 55712, 55007, 92411, 65739, 4858,
				67537, 37041, 67453, 89801, 45963, 14800, 14225, 65655, 80463, 9716, 77255, 65136,
				11230, 76323, 81433, 36445, 86523, 61058, 59560, 19380, 40791, 48073, 29626, 36661,
				87907, 57369, 41623, 13705, 3880, 45088, 55444, 41003, 27754, 1450, 75312, 71801,
				99600, 60719, 54182, 29245, 63315, 73758, 42973, 32702, 10855, 56363, 14638, 84424,
				27178, 78195, 3133, 70865, 48019, 26117, 7151, 52107, 85562, 41347, 50486, 69457,
				86961, 95482, 11857, 93587, 45680, 42145, 13029, 10043, 5142, 49213, 54525, 85761,
				42707, 70754, 33768, 87671, 85038, 58900, 88438, 20004, 63390, 14815, 38875, 73417,
				82875, 89481, 55517, 944, 15773, 61814, 32915, 27868, 5510, 21916, 28426, 89881,
				16680, 88850, 11056, 51991, 4230, 39107, 49216, 40065, 4523, 75848, 95349, 56034,
				10724, 9885, 88232, 42478, 65702, 95696, 39746, 66032, 88082, 86905, 30007, 75068,
				66629, 7358, 26706, 90511, 72843, 67857, 20061, 98581, 69682, 38e3, 14186, 70, 2290,
				17269, 30909, 69449, 19997, 13275, 2444, 84985, 51290, 97641, 15092, 69650, 21920,
				19617, 7418, 49725, 91090, 20805, 28627, 80665, 67192, 34697, 57667, 99323, 50101,
				40587, 35081, 14037, 34414, 19898, 60779, 83267, 87499, 29596, 41852, 15813, 32419,
				72232, 8322, 39184, 46525, 13833, 65743, 94595, 37363, 4711, 35386, 96413, 10627,
				62625, 56555, 12919, 93218, 25191, 98380, 51923, 66181, 5788, 73491, 1452, 487,
				12277, 45415, 11884, 61300, 94528, 9181, 26616, 11455, 31514, 63290, 45035, 42759,
				33804, 85721, 80979, 46010, 50975, 72482, 31231, 3086, 58941, 46102, 25773, 89742,
				29788, 96741, 88523, 14922, 88262, 76305, 57676, 93259, 2396, 69145, 26074, 30056,
				3853, 75317, 56639, 66203, 38923, 48939, 22813, 91864, 10934, 6714, 84099, 25631,
				73223, 95630, 97552, 45950, 22197, 42886, 33764, 1263, 41856, 82057, 62349, 94091,
				78028, 62651, 18911, 5693, 92561, 97821, 41994, 92343, 76785, 22216, 4203, 5038,
				86151, 23596, 24338, 77181, 51761, 97693, 10955, 98159, 37568, 58932, 72128, 27303,
				99608, 31688, 57557, 91022, 43036, 93927, 32869, 53653, 55205, 33139, 47271, 31224,
				51650, 36422, 86857, 73799, 22068, 43376, 84760, 44898, 65776, 42451, 71480, 38509,
				41673, 44141, 75918, 95652, 68981, 83001, 48815, 98086, 67950, 27986, 33175, 43624,
				55274, 71051, 61124, 51550, 64967, 31570, 15748, 19159, 38174, 51078, 79811, 39183,
				57527, 96550, 85168, 28824, 47466, 56993, 13151, 96664, 29735, 70251, 1079, 4314,
				77714, 11507, 1440, 48415, 31984, 99915, 20282, 26524, 18057, 4992, 40521, 98108,
				84045, 91961, 79256, 72244, 25788, 5487, 23595, 73302, 14205, 8925, 27625, 64343,
				28821, 37992, 67156, 83320, 31106, 10884, 30735, 15067, 51091, 15668, 48777, 50770,
				19169, 76504, 41165, 29749, 92812, 8065, 66782, 26841, 1411, 95461, 61134, 18699,
				52261, 60469, 81373, 44825, 11448, 73320, 30151, 56991, 31372, 6655, 36472, 86292,
				30247, 30931, 21029, 53410, 9859, 37267, 47514, 3492, 49008, 94727, 25234, 40546,
				53417, 36492, 25723, 76227, 58456, 15979, 34876, 9574, 34392, 3751, 36933, 83921,
				65108, 63135, 67572, 40184, 21098
			],
			l = new Array(16),
			h = [16, 8, 16, 24],
			f = 4,
			p = 0;
		!(function () {
			for (var t = 0; t < 16; t++) {
				l[t] = new Array(256);
				for (var e = 0; e < 256; e++) l[t][e] = e | (e << 8) | (e << 16) | (e << 24) | 0;
				for (var n = 3; 0 <= n; n--)
					for (var r = 0; r < 255; r++) {
						var i = 255 << (n << 3),
							o = 0 | l[t][r],
							s = (function (t, e) {
								var n = e - t + 1,
									r = 0,
									i = 1;
								do {
									for (r = 0, i = 1; i < n; i *= 10)
										r =
											10 * r +
											(f < 0 && ((f = 4), p++),
											((u[p] % Math.pow(10, f + 1)) / Math.pow(10, f--)) | 0);
								} while (((i / n) | 0) * n <= r);
								return (t + (r % n)) | 0;
							})(r, 255);
						(l[t][r] = (l[t][r] & ~i) | (l[t][s] & i) | 0),
							(l[t][s] = (l[t][s] & ~i) | (o & i) | 0);
					}
			}
		})();
		(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			})),
				e && a(t, e);
		})(d, r.a),
			(function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(d.prototype, [
				{
					key: "reset",
					value: function () {
						o(s(d.prototype), "reset", this).call(this),
							(this.state.hash = new Array((this.options.length / 32) | 0));
						for (var t = 0; t < this.state.hash.length; t++) this.state.hash[t] = 0;
					}
				},
				{
					key: "processBlock",
					value: function (t) {
						for (var e = 0; e < this.state.hash.length; e++)
							this.W[e] = 0 | this.state.hash[e];
						for (var n = this.state.hash.length; n < 16; n++)
							this.W[n] = 0 | t[n - this.state.hash.length];
						for (var r = 0; r < this.options.rounds << 1; r += 2)
							for (var i = 0; i < 4; i++) {
								for (var o = 0; o < 16; o++) {
									var s = 0 | l[r + (((o / 2) | 0) % 2)][255 & this.W[o]];
									(this.W[((o - 1) >>> 0) & 15] ^= s),
										(this.W[(o + 1) & 15] ^= s);
								}
								for (var a = 0; a < 16; a++)
									this.W[a] = Object(c.b)(this.W[a], h[i]);
							}
						for (var u = 0; u < this.state.hash.length; u++)
							this.state.hash[u] = (this.state.hash[u] ^ this.W[15 - u]) | 0;
					}
				},
				{
					key: "finalize",
					value: function () {
						return (
							0 < this.state.message.length &&
								this.addPaddingZero(
									(this.blockSizeInBytes - this.state.message.length) | 0
								),
							this.addPaddingZero((this.blockSizeInBytes - 8) | 0),
							this.addLengthBits(),
							this.process(),
							this.getStateHash()
						);
					}
				}
			]),
			(r = d);
		function d(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof d)) throw new TypeError("Cannot call a class as a function");
				})(this),
				((t = t || {}).length = t.length || 128),
				(t.rounds = t.rounds || 8),
				(e = this),
				((t =
					!(t = s(d).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).blockSize = 16 - t.state.hash.length),
				(t.blockSizeInBytes = t.blockSize * t.unitSize),
				(t.W = new Array(16)),
				t
			);
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		var r = n(5),
			u = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				(r.enumerable = r.enumerable || !1),
					(r.configurable = !0),
					"value" in r && (r.writable = !0),
					Object.defineProperty(t, r.key, r);
			}
		}
		function s(t, e, n) {
			return (s =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = a(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function a(t) {
			return (a = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function c(t, e) {
			return (c =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		for (
			var l = [
					[7, 12, 17, 22],
					[5, 9, 14, 20],
					[4, 11, 16, 23],
					[6, 10, 15, 21]
				],
				h = new Array(64),
				f = 0;
			f < 64;
			f++
		)
			h[f] = (4294967296 * Math.abs(Math.sin(f + 1))) | 0;
		(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			})),
				e && c(t, e);
		})(p, r.a),
			(n = [
				{
					key: "FF",
					value: function (t, e, n) {
						return (t & e) | (~t & n);
					}
				},
				{
					key: "GG",
					value: function (t, e, n) {
						return (t & n) | (e & ~n);
					}
				},
				{
					key: "HH",
					value: function (t, e, n) {
						return t ^ e ^ n;
					}
				},
				{
					key: "II",
					value: function (t, e, n) {
						return e ^ (t | ~n);
					}
				},
				{
					key: "CC",
					value: function (t, e, n, r, i, o, s, a) {
						return (Object(u.a)(n + t(r, i, o) + s + e, a) + r) | 0;
					}
				}
			]),
			o((r = p).prototype, [
				{
					key: "reset",
					value: function () {
						s(a(p.prototype), "reset", this).call(this),
							(this.state.hash = [1732584193, -271733879, -1732584194, 271733878]);
					}
				},
				{
					key: "processBlock",
					value: function (t) {
						var e = 0 | this.state.hash[0],
							n = 0 | this.state.hash[1],
							r = 0 | this.state.hash[2],
							i = 0 | this.state.hash[3],
							e = p.CC(p.FF, h[0], e, n, r, i, t[0], l[0][0]),
							i = p.CC(p.FF, h[1], i, e, n, r, t[1], l[0][1]),
							r = p.CC(p.FF, h[2], r, i, e, n, t[2], l[0][2]),
							n = p.CC(p.FF, h[3], n, r, i, e, t[3], l[0][3]);
						(e = p.CC(p.FF, h[4], e, n, r, i, t[4], l[0][0])),
							(i = p.CC(p.FF, h[5], i, e, n, r, t[5], l[0][1])),
							(r = p.CC(p.FF, h[6], r, i, e, n, t[6], l[0][2])),
							(n = p.CC(p.FF, h[7], n, r, i, e, t[7], l[0][3])),
							(e = p.CC(p.FF, h[8], e, n, r, i, t[8], l[0][0])),
							(i = p.CC(p.FF, h[9], i, e, n, r, t[9], l[0][1])),
							(r = p.CC(p.FF, h[10], r, i, e, n, t[10], l[0][2])),
							(n = p.CC(p.FF, h[11], n, r, i, e, t[11], l[0][3])),
							(e = p.CC(p.FF, h[12], e, n, r, i, t[12], l[0][0])),
							(i = p.CC(p.FF, h[13], i, e, n, r, t[13], l[0][1])),
							(r = p.CC(p.FF, h[14], r, i, e, n, t[14], l[0][2])),
							(n = p.CC(p.FF, h[15], n, r, i, e, t[15], l[0][3])),
							(e = p.CC(p.GG, h[16], e, n, r, i, t[1], l[1][0])),
							(i = p.CC(p.GG, h[17], i, e, n, r, t[6], l[1][1])),
							(r = p.CC(p.GG, h[18], r, i, e, n, t[11], l[1][2])),
							(n = p.CC(p.GG, h[19], n, r, i, e, t[0], l[1][3])),
							(e = p.CC(p.GG, h[20], e, n, r, i, t[5], l[1][0])),
							(i = p.CC(p.GG, h[21], i, e, n, r, t[10], l[1][1])),
							(r = p.CC(p.GG, h[22], r, i, e, n, t[15], l[1][2])),
							(n = p.CC(p.GG, h[23], n, r, i, e, t[4], l[1][3])),
							(e = p.CC(p.GG, h[24], e, n, r, i, t[9], l[1][0])),
							(i = p.CC(p.GG, h[25], i, e, n, r, t[14], l[1][1])),
							(r = p.CC(p.GG, h[26], r, i, e, n, t[3], l[1][2])),
							(n = p.CC(p.GG, h[27], n, r, i, e, t[8], l[1][3])),
							(e = p.CC(p.GG, h[28], e, n, r, i, t[13], l[1][0])),
							(i = p.CC(p.GG, h[29], i, e, n, r, t[2], l[1][1])),
							(r = p.CC(p.GG, h[30], r, i, e, n, t[7], l[1][2])),
							(n = p.CC(p.GG, h[31], n, r, i, e, t[12], l[1][3])),
							(e = p.CC(p.HH, h[32], e, n, r, i, t[5], l[2][0])),
							(i = p.CC(p.HH, h[33], i, e, n, r, t[8], l[2][1])),
							(r = p.CC(p.HH, h[34], r, i, e, n, t[11], l[2][2])),
							(n = p.CC(p.HH, h[35], n, r, i, e, t[14], l[2][3])),
							(e = p.CC(p.HH, h[36], e, n, r, i, t[1], l[2][0])),
							(i = p.CC(p.HH, h[37], i, e, n, r, t[4], l[2][1])),
							(r = p.CC(p.HH, h[38], r, i, e, n, t[7], l[2][2])),
							(n = p.CC(p.HH, h[39], n, r, i, e, t[10], l[2][3])),
							(e = p.CC(p.HH, h[40], e, n, r, i, t[13], l[2][0])),
							(i = p.CC(p.HH, h[41], i, e, n, r, t[0], l[2][1])),
							(r = p.CC(p.HH, h[42], r, i, e, n, t[3], l[2][2])),
							(n = p.CC(p.HH, h[43], n, r, i, e, t[6], l[2][3])),
							(e = p.CC(p.HH, h[44], e, n, r, i, t[9], l[2][0])),
							(i = p.CC(p.HH, h[45], i, e, n, r, t[12], l[2][1])),
							(r = p.CC(p.HH, h[46], r, i, e, n, t[15], l[2][2])),
							(n = p.CC(p.HH, h[47], n, r, i, e, t[2], l[2][3])),
							(e = p.CC(p.II, h[48], e, n, r, i, t[0], l[3][0])),
							(i = p.CC(p.II, h[49], i, e, n, r, t[7], l[3][1])),
							(r = p.CC(p.II, h[50], r, i, e, n, t[14], l[3][2])),
							(n = p.CC(p.II, h[51], n, r, i, e, t[5], l[3][3])),
							(e = p.CC(p.II, h[52], e, n, r, i, t[12], l[3][0])),
							(i = p.CC(p.II, h[53], i, e, n, r, t[3], l[3][1])),
							(r = p.CC(p.II, h[54], r, i, e, n, t[10], l[3][2])),
							(n = p.CC(p.II, h[55], n, r, i, e, t[1], l[3][3])),
							(e = p.CC(p.II, h[56], e, n, r, i, t[8], l[3][0])),
							(i = p.CC(p.II, h[57], i, e, n, r, t[15], l[3][1])),
							(r = p.CC(p.II, h[58], r, i, e, n, t[6], l[3][2])),
							(n = p.CC(p.II, h[59], n, r, i, e, t[13], l[3][3])),
							(e = p.CC(p.II, h[60], e, n, r, i, t[4], l[3][0])),
							(i = p.CC(p.II, h[61], i, e, n, r, t[11], l[3][1])),
							(r = p.CC(p.II, h[62], r, i, e, n, t[2], l[3][2])),
							(n = p.CC(p.II, h[63], n, r, i, e, t[9], l[3][3])),
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
							(this.state.hash[1] = (this.state.hash[1] + n) | 0),
							(this.state.hash[2] = (this.state.hash[2] + r) | 0),
							(this.state.hash[3] = (this.state.hash[3] + i) | 0);
					}
				},
				{
					key: "finalize",
					value: function () {
						return (
							this.addPaddingISO7816(
								this.state.message.length < 56
									? (56 - this.state.message.length) | 0
									: (120 - this.state.message.length) | 0
							),
							this.addLengthBits(),
							this.process(),
							this.getStateHash()
						);
					}
				}
			]),
			o(r, n),
			(n = p);
		function p() {
			return (
				(function (t) {
					if (!(t instanceof p)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(t = this),
				!(e = a(p).apply(this, arguments)) || ("object" !== i(e) && "function" != typeof e)
					? (function () {
							if (void 0 !== t) return t;
							throw new ReferenceError(
								"this hasn't been initialised - super() hasn't been called"
							);
						})()
					: e
			);
			var t, e;
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		var r = n(3),
			u = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e, n) {
			return (o =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = s(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function s(t) {
			return (s = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function a(t, e) {
			return (a =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var c = [1518500249, 1859775393, 2400959708, 3395469782],
			r =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && a(t, e);
				})(l, r.a),
				(function (t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
							Object.defineProperty(t, r.key, r);
					}
				})(l.prototype, [
					{
						key: "reset",
						value: function () {
							o(s(l.prototype), "reset", this).call(this),
								(this.state.hash = [
									1732584193, -271733879, -1732584194, 271733878, -1009589776
								]);
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = 0;
								s < this.options.rounds;
								s++
							) {
								this.W[s] =
									s < 16
										? 0 | t[s]
										: 0 |
											Object(u.a)(
												this.W[s - 3] ^
													this.W[s - 8] ^
													this.W[s - 14] ^
													this.W[s - 16],
												1
											);
								var a = (Object(u.a)(e, 5) + o + this.W[s] + c[(s / 20) >> 0]) | 0,
									a =
										s < 20
											? (a + ((n & r) | (~n & i))) | 0
											: !(s < 40) && s < 60
												? (a + ((n & r) | (n & i) | (r & i))) | 0
												: (a + (n ^ r ^ i)) | 0,
									o = i,
									i = r,
									r = 0 | Object(u.a)(n, 30),
									n = e,
									e = a;
							}
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
								(this.state.hash[1] = (this.state.hash[1] + n) | 0),
								(this.state.hash[2] = (this.state.hash[2] + r) | 0),
								(this.state.hash[3] = (this.state.hash[3] + i) | 0),
								(this.state.hash[4] = (this.state.hash[4] + o) | 0);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 56
										? (56 - this.state.message.length) | 0
										: (120 - this.state.message.length) | 0
								),
								this.addLengthBits(),
								this.process(),
								this.getStateHash()
							);
						}
					}
				]),
				l);
		function l(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof l)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = s(l).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).options.rounds = t.options.rounds || 80),
				(t.W = new Array(80)),
				t
			);
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		var c = n(0),
			n = n(3);
		function r(t) {
			return (r =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function i(t, e, n) {
			return (i =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = o(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function o(t) {
			return (o = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function s(t, e) {
			return (s =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var a = new Array(256),
			u = [
				104, 208, 235, 43, 72, 157, 106, 228, 227, 163, 86, 129, 125, 241, 133, 158, 44,
				142, 120, 202, 23, 169, 97, 213, 93, 11, 140, 60, 119, 81, 34, 66, 63, 84, 65, 128,
				204, 134, 179, 24, 46, 87, 6, 98, 244, 54, 209, 107, 27, 101, 117, 16, 218, 73, 38,
				249, 203, 102, 231, 186, 174, 80, 82, 171, 5, 240, 13, 115, 59, 4, 32, 254, 221,
				245, 180, 95, 10, 181, 192, 160, 113, 165, 45, 96, 114, 147, 57, 8, 131, 33, 92,
				135, 177, 224, 0, 195, 18, 145, 138, 2, 28, 230, 69, 194, 196, 253, 191, 68, 161,
				76, 51, 197, 132, 35, 124, 176, 37, 21, 53, 105, 255, 148, 77, 112, 162, 175, 205,
				214, 108, 183, 248, 9, 243, 103, 164, 234, 236, 182, 212, 210, 20, 30, 225, 36, 56,
				198, 219, 75, 122, 58, 222, 94, 223, 149, 252, 170, 215, 206, 7, 15, 61, 88, 154,
				152, 156, 242, 167, 17, 126, 139, 67, 3, 226, 220, 229, 178, 78, 199, 109, 233, 39,
				64, 216, 55, 146, 143, 1, 29, 83, 62, 89, 193, 79, 50, 22, 250, 116, 251, 99, 159,
				52, 26, 42, 90, 141, 201, 207, 246, 144, 40, 136, 155, 49, 14, 189, 74, 232, 150,
				166, 12, 200, 121, 188, 190, 239, 110, 70, 151, 91, 237, 25, 217, 172, 153, 168, 41,
				100, 31, 173, 85, 19, 187, 247, 111, 185, 71, 47, 238, 184, 123, 137, 48, 211, 127,
				118, 130
			],
			l = [1, 11, 9, 12, 13, 6, 15, 3, 14, 8, 7, 4, 10, 2, 5, 0],
			h = [7, 12, 11, 13, 14, 4, 9, 15, 6, 3, 8, 10, 2, 5, 1, 0],
			f = new Array(16),
			p = [1, 1, 4, 1, 8, 5, 2, 9],
			d = [1, 1, 3, 1, 5, 8, 9, 5],
			g = new Array(512),
			m = new Array(22),
			v = new Array(512),
			y = new Array(22),
			b = new Array(512),
			w = new Array(22);
		function _(t, e) {
			for (var n = new Array(512), r = new Array(22), i = 0; i < 8; i++) n[i] = [];
			for (var o = 0; o < 256; o++) {
				var s = new Array(10);
				(s[1] = t[o]),
					(s[2] = s[1] << 1),
					256 <= s[2] && (s[2] ^= 285),
					(s[3] = s[2] ^ s[1]),
					(s[4] = s[2] << 1),
					256 <= s[4] && (s[4] ^= 285),
					(s[5] = s[4] ^ s[1]),
					(s[8] = s[4] << 1),
					256 <= s[8] && (s[8] ^= 285),
					(s[9] = s[8] ^ s[1]),
					(n[0][2 * o] = (s[e[0]] << 24) | (s[e[1]] << 16) | (s[e[2]] << 8) | s[e[3]]),
					(n[0][2 * o + 1] =
						(s[e[4]] << 24) | (s[e[5]] << 16) | (s[e[6]] << 8) | s[e[7]]);
				for (var a = 1; a < 8; a++)
					(n[a][2 * o] = Object(c.d)(n[0][2 * o + 1], n[0][2 * o], a << 3)),
						(n[a][2 * o + 1] = Object(c.c)(n[0][2 * o + 1], n[0][2 * o], a << 3));
			}
			(r[0] = 0), (r[1] = 0);
			for (var u = 1; u <= 10; u++)
				(r[2 * u] =
					(4278190080 & n[0][16 * u - 16]) ^
					(16711680 & n[1][16 * u - 14]) ^
					(65280 & n[2][16 * u - 12]) ^
					(255 & n[3][16 * u - 10])),
					(r[2 * u + 1] =
						(4278190080 & n[4][16 * u - 7]) ^
						(16711680 & n[5][16 * u - 5]) ^
						(65280 & n[6][16 * u - 3]) ^
						(255 & n[7][16 * u - 1]));
			return [n, r];
		}
		!(function () {
			!(function () {
				for (var t = 0; t < 16; t++) f[l[t]] = 0 | t;
				for (var e = 0; e < 256; e++) {
					var n = l[e >> 4],
						r = f[15 & e],
						i = h[n ^ r];
					a[e] = (l[n ^ i] << 4) | f[r ^ i];
				}
			})();
			var t = _(u, d);
			(v = t[0]),
				(y = t[1]),
				(t = _(a, d)),
				(b = t[0]),
				(w = t[1]),
				(t = _(a, p)),
				(g = t[0]),
				(m = t[1]);
		})();
		(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			})),
				e && s(t, e);
		})(x, n.a),
			(function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(x.prototype, [
				{
					key: "reset",
					value: function () {
						i(o(x.prototype), "reset", this).call(this),
							(this.state.hash = new Array(16));
						for (var t = 0; t < 16; t++) this.state.hash[t] = 0;
					}
				},
				{
					key: "processBlock",
					value: function (t) {
						for (var e = new Array(16), n = [], r = 0; r < 16; r++)
							n[r] = (t[r] ^ (e[r] = this.state.hash[r])) | 0;
						for (var i = [], o = 1; o <= this.options.rounds; o++) {
							for (var s = 0; s < 8; s++) {
								i[2 * s] = 0;
								for (
									var a = (i[2 * s + 1] = 0), u = 56, c = 0;
									a < 8;
									a++, c = (u -= 8) < 32 ? 1 : 0
								)
									(i[2 * s] ^=
										this.C[a][
											2 * ((e[2 * ((s - a) & 7) + c] >>> u % 32) & 255)
										]),
										(i[2 * s + 1] ^=
											this.C[a][
												2 * ((e[2 * ((s - a) & 7) + c] >>> u % 32) & 255) +
													1
											]);
							}
							for (var l = 0; l < 16; l++) e[l] = i[l];
							(e[0] ^= this.RC[2 * o]), (e[1] ^= this.RC[2 * o + 1]);
							for (var h = 0; h < 8; h++) {
								(i[2 * h] = e[2 * h]), (i[2 * h + 1] = e[2 * h + 1]);
								for (
									var f = 0, p = 56, d = 0;
									f < 8;
									f++, d = (p -= 8) < 32 ? 1 : 0
								)
									(i[2 * h] ^=
										this.C[f][
											2 * ((n[2 * ((h - f) & 7) + d] >>> p % 32) & 255)
										]),
										(i[2 * h + 1] ^=
											this.C[f][
												2 * ((n[2 * ((h - f) & 7) + d] >>> p % 32) & 255) +
													1
											]);
							}
							for (var g = 0; g < 16; g++) n[g] = i[g];
						}
						for (var m = 0; m < 16; m++) this.state.hash[m] ^= n[m] ^ t[m];
					}
				},
				{
					key: "finalize",
					value: function () {
						return (
							this.addPaddingISO7816(
								this.state.message.length < 32
									? (56 - this.state.message.length) | 0
									: (120 - this.state.message.length) | 0
							),
							this.addLengthBits(),
							this.process(),
							this.getStateHash()
						);
					}
				}
			]),
			(n = x);
		function x(t) {
			var e, n;
			switch (
				((function (t) {
					if (!(t instanceof x)) throw new TypeError("Cannot call a class as a function");
				})(this),
				((t = t || {}).type = t.type || ""),
				(t.rounds = t.rounds || 10),
				(n = this),
				(e =
					!(t = o(x).call(this, t)) || ("object" !== r(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== n) return n;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).options.type)
			) {
				case "0":
				case 0:
					(e.C = v), (e.RC = y);
					break;
				case "t":
					(e.C = b), (e.RC = w);
					break;
				default:
					(e.C = g), (e.RC = m);
			}
			return e;
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		function r(t) {
			return (r =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function i(t) {
			return (i = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function o(t, e) {
			return (o =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		(function (t, e) {
			if ("function" != typeof e && null !== e)
				throw new TypeError("Super expression must either be null or a function");
			(t.prototype = Object.create(e && e.prototype, {
				constructor: {
					value: t,
					writable: !0,
					configurable: !0
				}
			})),
				e && o(t, e);
		})(s, n(4).a),
			(function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(s.prototype, [
				{
					key: "process",
					value: function () {
						for (; this.state.message.length >= this.blockSizeInBytes; ) {
							this.blockUnits = new Array(this.blockSizeInBytes);
							for (var t = 0; t < this.blockSizeInBytes; t++)
								this.blockUnits[t] = 0 | this.state.message.charCodeAt(t);
							(this.state.message = this.state.message.substr(this.blockSizeInBytes)),
								this.processBlock(this.blockUnits);
						}
					}
				},
				{
					key: "processBlock",
					value: function (t) {}
				},
				{
					key: "getStateHash",
					value: function (t) {
						t = t || this.state.hash.length;
						for (var e = "", n = 0; n < t; n++)
							e += String.fromCharCode(255 & this.state.hash[n]);
						return e;
					}
				}
			]),
			(n = s);
		function s(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = i(s).call(this, t)) || ("object" !== r(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).unitSize = 1),
				(t.blockSizeInBytes = t.blockSize * t.unitSize),
				(t.blockUnits = []),
				t
			);
		}
		function a(t) {
			return (a =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function u(t, e, n) {
			return (u =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = c(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function c(t) {
			return (c = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function l(t, e) {
			return (l =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var h = [
				41, 46, 67, 201, 162, 216, 124, 1, 61, 54, 84, 161, 236, 240, 6, 19, 98, 167, 5,
				243, 192, 199, 115, 140, 152, 147, 43, 217, 188, 76, 130, 202, 30, 155, 87, 60, 253,
				212, 224, 22, 103, 66, 111, 24, 138, 23, 229, 18, 190, 78, 196, 214, 218, 158, 222,
				73, 160, 251, 245, 142, 187, 47, 238, 122, 169, 104, 121, 145, 21, 178, 7, 63, 148,
				194, 16, 137, 11, 34, 95, 33, 128, 127, 93, 154, 90, 144, 50, 39, 53, 62, 204, 231,
				191, 247, 151, 3, 255, 25, 48, 179, 72, 165, 181, 209, 215, 94, 146, 42, 172, 86,
				170, 198, 79, 184, 56, 210, 150, 164, 125, 182, 118, 252, 107, 226, 156, 116, 4,
				241, 69, 157, 112, 89, 100, 113, 135, 32, 134, 91, 207, 101, 230, 45, 168, 2, 27,
				96, 37, 173, 174, 176, 185, 246, 28, 70, 97, 105, 52, 64, 126, 15, 85, 71, 163, 35,
				221, 81, 175, 58, 195, 92, 249, 206, 186, 197, 234, 38, 44, 83, 13, 110, 133, 40,
				132, 9, 211, 223, 205, 244, 65, 129, 77, 82, 106, 220, 55, 200, 108, 193, 171, 250,
				36, 225, 123, 8, 12, 189, 177, 74, 120, 136, 149, 139, 227, 99, 232, 109, 233, 203,
				213, 254, 59, 0, 29, 57, 242, 239, 183, 14, 102, 88, 208, 228, 166, 119, 114, 248,
				235, 117, 75, 10, 49, 68, 80, 180, 143, 237, 31, 26, 219, 153, 141, 51, 159, 17,
				131, 20
			],
			n =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						l(t, e);
				})(f, n),
				(function (t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
							Object.defineProperty(t, r.key, r);
					}
				})(f.prototype, [
					{
						key: "reset",
						value: function () {
							u(c(f.prototype), "reset", this).call(this),
								(this.state.hash = new Array(48)),
								(this.state.checksum = new Array(16));
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							for (var e = 0; e < 16; e++)
								(this.state.hash[16 + e] = 0 | t[e]),
									(this.state.hash[32 + e] = t[e] ^ this.state.hash[e]);
							for (var n = 0, r = 0; r < this.options.rounds; r++) {
								for (var i = 0; i < 48; i++) n = this.state.hash[i] ^= h[n];
								n = (n + r) & 255;
							}
							n = 255 & this.state.checksum[15];
							for (var o = 0; o < 16; o++) n = this.state.checksum[o] ^= h[t[o] ^ n];
						}
					},
					{
						key: "finalize",
						value: function () {
							this.addPaddingPKCS7((16 - (15 & this.state.message.length)) | 0),
								this.process();
							for (var t = 0; t < 16; t++)
								this.state.message += String.fromCharCode(this.state.checksum[t]);
							return this.process(), this.getStateHash(16);
						}
					}
				]),
				f);
		function f(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof f)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = c(f).call(this, t)) || ("object" !== a(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).options.rounds = t.options.rounds || 18),
				t
			);
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		var r = n(5),
			c = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e, n) {
			return (o =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = s(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function s(t) {
			return (s = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function a(t, e) {
			return (a =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var l = [0, 1518500249, 1859775393, 2400959708],
			h = [5, 11, 7, 15, 6, 13, 8, 14, 7, 12, 9, 11, 8, 15, 6, 12, 9, 14, 5, 13],
			f = [10, 17, 25, 30],
			p = [
				18, 0, 1, 2, 3, 19, 4, 5, 6, 7, 16, 8, 9, 10, 11, 17, 12, 13, 14, 15, 22, 3, 6, 9,
				12, 23, 15, 2, 5, 8, 20, 11, 14, 1, 4, 21, 7, 10, 13, 0, 26, 12, 5, 14, 7, 27, 0, 9,
				2, 11, 24, 4, 13, 6, 15, 25, 8, 1, 10, 3, 30, 7, 2, 13, 8, 31, 3, 14, 9, 4, 28, 15,
				10, 5, 0, 29, 11, 6, 1, 12
			],
			r =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && a(t, e);
				})(u, r.a),
				(function (t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
							Object.defineProperty(t, r.key, r);
					}
				})(u.prototype, [
					{
						key: "reset",
						value: function () {
							o(s(u.prototype), "reset", this).call(this),
								(this.state.hash = [
									1732584193, 4023233417, 2562383102, 271733878, 3285377520
								]);
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = 0;
								s < 16;
								s++
							)
								this.W[s] = 0 | t[s];
							(this.W[16] = (this.W[0] ^ this.W[1] ^ this.W[2] ^ this.W[3]) | 0),
								(this.W[17] = (this.W[4] ^ this.W[5] ^ this.W[6] ^ this.W[7]) | 0),
								(this.W[18] =
									(this.W[8] ^ this.W[9] ^ this.W[10] ^ this.W[11]) | 0),
								(this.W[19] =
									(this.W[12] ^ this.W[13] ^ this.W[14] ^ this.W[15]) | 0),
								(this.W[20] = (this.W[3] ^ this.W[6] ^ this.W[9] ^ this.W[12]) | 0),
								(this.W[21] = (this.W[2] ^ this.W[5] ^ this.W[8] ^ this.W[15]) | 0),
								(this.W[22] =
									(this.W[1] ^ this.W[4] ^ this.W[11] ^ this.W[14]) | 0),
								(this.W[23] =
									(this.W[0] ^ this.W[7] ^ this.W[10] ^ this.W[13]) | 0),
								(this.W[24] =
									(this.W[5] ^ this.W[7] ^ this.W[12] ^ this.W[14]) | 0),
								(this.W[25] = (this.W[0] ^ this.W[2] ^ this.W[9] ^ this.W[11]) | 0),
								(this.W[26] =
									(this.W[4] ^ this.W[6] ^ this.W[13] ^ this.W[15]) | 0),
								(this.W[27] = (this.W[1] ^ this.W[3] ^ this.W[8] ^ this.W[10]) | 0),
								(this.W[28] = (this.W[2] ^ this.W[7] ^ this.W[8] ^ this.W[13]) | 0),
								(this.W[29] = (this.W[3] ^ this.W[4] ^ this.W[9] ^ this.W[14]) | 0),
								(this.W[30] =
									(this.W[0] ^ this.W[5] ^ this.W[10] ^ this.W[15]) | 0),
								(this.W[31] =
									(this.W[1] ^ this.W[6] ^ this.W[11] ^ this.W[12]) | 0);
							for (var a = 0; a < this.options.rounds; a++)
								var u =
										(Object(c.a)(e, h[a % 20]) +
											o +
											this.W[p[a]] +
											l[(a / 20) >> 0]) |
										0,
									u =
										a < 20
											? (u + ((n & r) | (~n & i))) | 0
											: !(a < 40) && a < 60
												? (u + (r ^ (n | ~i))) | 0
												: (u + (n ^ r ^ i)) | 0,
									o = i,
									i = r,
									r = 0 | Object(c.a)(n, f[(a / 20) >> 0]),
									n = e,
									e = u;
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
								(this.state.hash[1] = (this.state.hash[1] + n) | 0),
								(this.state.hash[2] = (this.state.hash[2] + r) | 0),
								(this.state.hash[3] = (this.state.hash[3] + i) | 0),
								(this.state.hash[4] = (this.state.hash[4] + o) | 0);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 56
										? (56 - this.state.message.length) | 0
										: (120 - this.state.message.length) | 0
								),
								this.addLengthBits(),
								this.process(),
								this.getStateHash()
							);
						}
					}
				]),
				u);
		function u(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof u)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = s(u).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).options.rounds = t.options.rounds || 80),
				(t.W = new Array(32)),
				t
			);
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		n.d(e, "a", function () {
			return r;
		});
		var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		function r(t) {
			for (var e = "", n = (t.length - (t.length % 3)) | 0, r = 0, i = 0; i < n; i += 3)
				(r = (t.charCodeAt(i) << 16) | (t.charCodeAt(i + 1) << 8) | t.charCodeAt(i + 2)),
					(e +=
						o.charAt(r >> 18) +
						o.charAt((r >> 12) & 63) +
						o.charAt((r >> 6) & 63) +
						o.charAt(63 & r));
			return (
				t.length - n == 2
					? ((r = (t.charCodeAt(n) << 16) | (t.charCodeAt(1 + n) << 8)),
						(e +=
							o.charAt(r >> 18) +
							o.charAt((r >> 12) & 63) +
							o.charAt((r >> 6) & 63) +
							"="))
					: t.length - n == 1 &&
						((r = t.charCodeAt(n) << 16),
						(e += o.charAt(r >> 18) + o.charAt((r >> 12) & 63) + "==")),
				e
			);
		}
	},
	function (t, e, n) {
		"use strict";
		var r = n(5),
			u = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				(r.enumerable = r.enumerable || !1),
					(r.configurable = !0),
					"value" in r && (r.writable = !0),
					Object.defineProperty(t, r.key, r);
			}
		}
		function s(t, e, n) {
			return (s =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = a(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function a(t) {
			return (a = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function c(t, e) {
			return (c =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var l = [
				[3, 7, 11, 19],
				[3, 5, 9, 13],
				[3, 9, 11, 15]
			],
			h = 1518500249,
			f = 1859775393,
			n =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && c(t, e);
				})(p, r.a),
				(n = [
					{
						key: "FF",
						value: function (t, e, n) {
							return (t & e) | (~t & n);
						}
					},
					{
						key: "GG",
						value: function (t, e, n) {
							return (t & e) | (t & n) | (e & n);
						}
					},
					{
						key: "HH",
						value: function (t, e, n) {
							return t ^ e ^ n;
						}
					},
					{
						key: "CC",
						value: function (t, e, n, r, i, o, s, a) {
							return 0 | Object(u.a)(n + t(r, i, o) + s + e, a);
						}
					}
				]),
				o((r = p).prototype, [
					{
						key: "reset",
						value: function () {
							s(a(p.prototype), "reset", this).call(this),
								(this.state.hash = [
									1732584193, -271733879, -1732584194, 271733878
								]);
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							var e = 0 | this.state.hash[0],
								n = 0 | this.state.hash[1],
								r = 0 | this.state.hash[2],
								i = 0 | this.state.hash[3],
								e = p.CC(p.FF, 0, e, n, r, i, t[0], l[0][0]),
								i = p.CC(p.FF, 0, i, e, n, r, t[1], l[0][1]),
								r = p.CC(p.FF, 0, r, i, e, n, t[2], l[0][2]),
								n = p.CC(p.FF, 0, n, r, i, e, t[3], l[0][3]);
							(e = p.CC(p.FF, 0, e, n, r, i, t[4], l[0][0])),
								(i = p.CC(p.FF, 0, i, e, n, r, t[5], l[0][1])),
								(r = p.CC(p.FF, 0, r, i, e, n, t[6], l[0][2])),
								(n = p.CC(p.FF, 0, n, r, i, e, t[7], l[0][3])),
								(e = p.CC(p.FF, 0, e, n, r, i, t[8], l[0][0])),
								(i = p.CC(p.FF, 0, i, e, n, r, t[9], l[0][1])),
								(r = p.CC(p.FF, 0, r, i, e, n, t[10], l[0][2])),
								(n = p.CC(p.FF, 0, n, r, i, e, t[11], l[0][3])),
								(e = p.CC(p.FF, 0, e, n, r, i, t[12], l[0][0])),
								(i = p.CC(p.FF, 0, i, e, n, r, t[13], l[0][1])),
								(r = p.CC(p.FF, 0, r, i, e, n, t[14], l[0][2])),
								(n = p.CC(p.FF, 0, n, r, i, e, t[15], l[0][3])),
								(e = p.CC(p.GG, h, e, n, r, i, t[0], l[1][0])),
								(i = p.CC(p.GG, h, i, e, n, r, t[4], l[1][1])),
								(r = p.CC(p.GG, h, r, i, e, n, t[8], l[1][2])),
								(n = p.CC(p.GG, h, n, r, i, e, t[12], l[1][3])),
								(e = p.CC(p.GG, h, e, n, r, i, t[1], l[1][0])),
								(i = p.CC(p.GG, h, i, e, n, r, t[5], l[1][1])),
								(r = p.CC(p.GG, h, r, i, e, n, t[9], l[1][2])),
								(n = p.CC(p.GG, h, n, r, i, e, t[13], l[1][3])),
								(e = p.CC(p.GG, h, e, n, r, i, t[2], l[1][0])),
								(i = p.CC(p.GG, h, i, e, n, r, t[6], l[1][1])),
								(r = p.CC(p.GG, h, r, i, e, n, t[10], l[1][2])),
								(n = p.CC(p.GG, h, n, r, i, e, t[14], l[1][3])),
								(e = p.CC(p.GG, h, e, n, r, i, t[3], l[1][0])),
								(i = p.CC(p.GG, h, i, e, n, r, t[7], l[1][1])),
								(r = p.CC(p.GG, h, r, i, e, n, t[11], l[1][2])),
								(n = p.CC(p.GG, h, n, r, i, e, t[15], l[1][3])),
								(e = p.CC(p.HH, f, e, n, r, i, t[0], l[2][0])),
								(i = p.CC(p.HH, f, i, e, n, r, t[8], l[2][1])),
								(r = p.CC(p.HH, f, r, i, e, n, t[4], l[2][2])),
								(n = p.CC(p.HH, f, n, r, i, e, t[12], l[2][3])),
								(e = p.CC(p.HH, f, e, n, r, i, t[2], l[2][0])),
								(i = p.CC(p.HH, f, i, e, n, r, t[10], l[2][1])),
								(r = p.CC(p.HH, f, r, i, e, n, t[6], l[2][2])),
								(n = p.CC(p.HH, f, n, r, i, e, t[14], l[2][3])),
								(e = p.CC(p.HH, f, e, n, r, i, t[1], l[2][0])),
								(i = p.CC(p.HH, f, i, e, n, r, t[9], l[2][1])),
								(r = p.CC(p.HH, f, r, i, e, n, t[5], l[2][2])),
								(n = p.CC(p.HH, f, n, r, i, e, t[13], l[2][3])),
								(e = p.CC(p.HH, f, e, n, r, i, t[3], l[2][0])),
								(i = p.CC(p.HH, f, i, e, n, r, t[11], l[2][1])),
								(r = p.CC(p.HH, f, r, i, e, n, t[7], l[2][2])),
								(n = p.CC(p.HH, f, n, r, i, e, t[15], l[2][3])),
								(this.state.hash = [
									(this.state.hash[0] + e) | 0,
									(this.state.hash[1] + n) | 0,
									(this.state.hash[2] + r) | 0,
									(this.state.hash[3] + i) | 0
								]);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 56
										? (56 - this.state.message.length) | 0
										: (120 - this.state.message.length) | 0
								),
								this.addLengthBits(),
								this.process(),
								this.getStateHash()
							);
						}
					}
				]),
				o(r, n),
				p);
		function p() {
			return (
				(function (t) {
					if (!(t instanceof p)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(t = this),
				!(e = a(p).apply(this, arguments)) || ("object" !== i(e) && "function" != typeof e)
					? (function () {
							if (void 0 !== t) return t;
							throw new ReferenceError(
								"this hasn't been initialised - super() hasn't been called"
							);
						})()
					: e
			);
			var t, e;
		}
		e.a = n;
	},
	function (t, e, n) {
		"use strict";
		var r = n(3),
			u = n(0);
		function i(t) {
			return (i =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
						}
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
						})(t);
		}
		function o(t, e, n) {
			return (o =
				"undefined" != typeof Reflect && Reflect.get
					? Reflect.get
					: function (t, e, n) {
							t = (function (t, e) {
								for (
									;
									!Object.prototype.hasOwnProperty.call(t, e) &&
									null !== (t = s(t));

								);
								return t;
							})(t, e);
							if (t) {
								e = Object.getOwnPropertyDescriptor(t, e);
								return e.get ? e.get.call(n) : e.value;
							}
						})(t, e, n || t);
		}
		function s(t) {
			return (s = Object.setPrototypeOf
				? Object.getPrototypeOf
				: function (t) {
						return t.__proto__ || Object.getPrototypeOf(t);
					})(t);
		}
		function a(t, e) {
			return (a =
				Object.setPrototypeOf ||
				function (t, e) {
					return (t.__proto__ = e), t;
				})(t, e);
		}
		var c = [1518500249, 1859775393, 2400959708, 3395469782],
			r =
				((function (t, e) {
					if ("function" != typeof e && null !== e)
						throw new TypeError("Super expression must either be null or a function");
					(t.prototype = Object.create(e && e.prototype, {
						constructor: {
							value: t,
							writable: !0,
							configurable: !0
						}
					})),
						e && a(t, e);
				})(l, r.a),
				(function (t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						(r.enumerable = r.enumerable || !1),
							(r.configurable = !0),
							"value" in r && (r.writable = !0),
							Object.defineProperty(t, r.key, r);
					}
				})(l.prototype, [
					{
						key: "reset",
						value: function () {
							o(s(l.prototype), "reset", this).call(this),
								(this.state.hash = [
									1732584193, -271733879, -1732584194, 271733878, -1009589776
								]);
						}
					},
					{
						key: "processBlock",
						value: function (t) {
							for (
								var e = 0 | this.state.hash[0],
									n = 0 | this.state.hash[1],
									r = 0 | this.state.hash[2],
									i = 0 | this.state.hash[3],
									o = 0 | this.state.hash[4],
									s = 0;
								s < this.options.rounds;
								s++
							) {
								this.W[s] =
									s < 16
										? 0 | t[s]
										: (this.W[s - 3] ^
												this.W[s - 8] ^
												this.W[s - 14] ^
												this.W[s - 16]) |
											0;
								var a = (Object(u.a)(e, 5) + o + this.W[s] + c[(s / 20) >> 0]) | 0,
									a =
										s < 20
											? (a + ((n & r) | (~n & i))) | 0
											: !(s < 40) && s < 60
												? (a + ((n & r) | (n & i) | (r & i))) | 0
												: (a + (n ^ r ^ i)) | 0,
									o = i,
									i = r,
									r = 0 | Object(u.a)(n, 30),
									n = e,
									e = a;
							}
							(this.state.hash[0] = (this.state.hash[0] + e) | 0),
								(this.state.hash[1] = (this.state.hash[1] + n) | 0),
								(this.state.hash[2] = (this.state.hash[2] + r) | 0),
								(this.state.hash[3] = (this.state.hash[3] + i) | 0),
								(this.state.hash[4] = (this.state.hash[4] + o) | 0);
						}
					},
					{
						key: "finalize",
						value: function () {
							return (
								this.addPaddingISO7816(
									this.state.message.length < 56
										? (56 - this.state.message.length) | 0
										: (120 - this.state.message.length) | 0
								),
								this.addLengthBits(),
								this.process(),
								this.getStateHash()
							);
						}
					}
				]),
				l);
		function l(t) {
			var e;
			return (
				(function (t) {
					if (!(t instanceof l)) throw new TypeError("Cannot call a class as a function");
				})(this),
				(e = this),
				((t =
					!(t = s(l).call(this, t)) || ("object" !== i(t) && "function" != typeof t)
						? (function () {
								if (void 0 !== e) return e;
								throw new ReferenceError(
									"this hasn't been initialised - super() hasn't been called"
								);
							})()
						: t).options.rounds = t.options.rounds || 80),
				(t.W = new Array(80)),
				t
			);
		}
		e.a = r;
	},
	function (t, e, n) {
		"use strict";
		function r(t) {
			for (var e = "", n = new Uint8Array(t), r = 0; r < n.length; r++)
				e += String.fromCharCode(n[r]);
			return e;
		}
		n.d(e, "a", function () {
			return r;
		});
	},
	,
	function (t, e, n) {
		"use strict";
		var r =
			((function (t, e) {
				for (var n = 0; n < e.length; n++) {
					var r = e[n];
					(r.enumerable = r.enumerable || !1),
						(r.configurable = !0),
						"value" in r && (r.writable = !0),
						Object.defineProperty(t, r.key, r);
				}
			})(i.prototype, [
				{
					key: "update",
					value: function (t) {
						this.hasher.update(t);
					}
				},
				{
					key: "finalize",
					value: function () {
						var t = this.hasher.finalize();
						return (
							this.hasher.reset(),
							this.hasher.update(this.oPad),
							this.hasher.update(t),
							this.hasher.finalize()
						);
					}
				}
			]),
			i);
		function i(t, e) {
			!(function (t) {
				if (!(t instanceof i)) throw new TypeError("Cannot call a class as a function");
			})(this),
				t.length > e.blockSizeInBytes && (e.update(t), (t = e.finalize()), e.reset());
			for (var n = t.length; n < e.blockSizeInBytes; n++) t += "\0";
			this.oPad = "";
			for (var r = 0; r < t.length; r++)
				e.update(String.fromCharCode(54 ^ t.charCodeAt(r))),
					(this.oPad += String.fromCharCode(92 ^ t.charCodeAt(r)));
			this.hasher = e;
		}
		e.a = r;
	},
	,
	,
	,
	,
	,
	,
	,
	,
	function (t, e, n) {
		"use strict";
		n.r(e);
		var r = n(14),
			i = n(13),
			o = n(16),
			s = n(10),
			a = n(8),
			u = n(17),
			c = n(11),
			l = n(7),
			h = n(6),
			f = n(9),
			p = n(12),
			d = n(1),
			g = n(18),
			m = n(2),
			v = n(15),
			y = n(20);
		(function (t, e) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				(r.enumerable = r.enumerable || !1),
					(r.configurable = !0),
					"value" in r && (r.writable = !0),
					Object.defineProperty(t, r.key, r);
			}
		})(b.prototype, [
			{
				key: "getHasher",
				value: function (t, e) {
					switch (((e = e || {}), t)) {
						case "has160":
							return new r.a(e);
						case "md2":
							return new i.a(e);
						case "md4":
							return new o.a(e);
						case "md5":
							return new s.a(e);
						case "ripemd128":
							return (
								(e = Object.assign(
									{},
									{
										length: 128
									},
									e
								)),
								new a.a(e)
							);
						case "ripemd":
						case "ripemd160":
							return (
								(e = Object.assign(
									{},
									{
										length: 160
									},
									e
								)),
								new a.a(e)
							);
						case "ripemd256":
							return (
								(e = Object.assign(
									{},
									{
										length: 256
									},
									e
								)),
								new a.a(e)
							);
						case "ripemd320":
							return (
								(e = Object.assign(
									{},
									{
										length: 320
									},
									e
								)),
								new a.a(e)
							);
						case "sha0":
							return new u.a(e);
						case "sha1":
							return new c.a(e);
						case "sha224":
							return (
								(e = Object.assign(
									{},
									{
										length: 224
									},
									e
								)),
								new l.a(e)
							);
						case "sha256":
							return (
								(e = Object.assign(
									{},
									{
										length: 256
									},
									e
								)),
								new l.a(e)
							);
						case "sha384":
							return (
								(e = Object.assign(
									{},
									{
										length: 384
									},
									e
								)),
								new h.a(e)
							);
						case "sha512":
							return (
								(e = Object.assign(
									{},
									{
										length: 512
									},
									e
								)),
								new h.a(e)
							);
						case "sha512/224":
							return (
								(e = Object.assign(
									{},
									{
										length: 224
									},
									e
								)),
								new h.a(e)
							);
						case "sha512/256":
							return (
								(e = Object.assign(
									{},
									{
										length: 256
									},
									e
								)),
								new h.a(e)
							);
						case "snefru":
						case "snefru128":
						case "snefru128/8":
							return (
								(e = Object.assign(
									{},
									{
										length: 128
									},
									e
								)),
								new f.a(e)
							);
						case "snefru256":
						case "snefru256/8":
							return (
								(e = Object.assign(
									{},
									{
										length: 256
									},
									e
								)),
								new f.a(e)
							);
						case "snefru128/2":
							return (
								(e = Object.assign(
									{},
									{
										length: 128,
										rounds: 2
									},
									e
								)),
								new f.a(e)
							);
						case "snefru256/4":
							return (
								(e = Object.assign(
									{},
									{
										length: 256,
										rounds: 4
									},
									e
								)),
								new f.a(e)
							);
						case "whirlpool":
							return new p.a(e);
						case "whirlpool-0":
							return (
								(e = Object.assign(
									{},
									{
										type: "0"
									},
									e
								)),
								new p.a(e)
							);
						case "whirlpool-t":
							return (
								(e = Object.assign(
									{},
									{
										type: "t"
									},
									e
								)),
								new p.a(e)
							);
					}
				}
			},
			{
				key: "hash",
				value: function (t, e, n) {
					n = n || {};
					n = this.getHasher(t, n);
					return n.update(Object(d.a)(e)), Object(m.a)(n.finalize());
				}
			},
			{
				key: "getHmac",
				value: function (t, e) {
					return new y.a(t, e);
				}
			},
			{
				key: "hmac",
				value: function (t, e, n) {
					n = this.getHmac(Object(d.a)(t), n);
					return n.update(Object(d.a)(e)), Object(m.a)(n.finalize());
				}
			}
		]),
			(n = b);
		function b() {
			!(function (t) {
				if (!(t instanceof b)) throw new TypeError("Cannot call a class as a function");
			})(this),
				(this.encoder = {}),
				(this.encoder.fromUtf = d.a),
				(this.encoder.fromArrayBuffer = g.a),
				(this.encoder.toHex = m.a),
				(this.encoder.toBase64 = v.a);
		}
		(n = new n()), (e.default = n);
	}
]).default;
!(function (s) {
	"use strict";
	var n = {
		page: 1,
		pageSize: 200,
		total: 0,
		showTotal: !1,
		totalTxt: "共{total}条",
		noData: !1,
		showSkip: !1,
		showPN: !0,
		prevPage: "上一页",
		nextPage: "下一页",
		fastForward: 0,
		selectOption: [],
		backFun: function (t) {}
	};
	function e(t, e) {
		(this.element = s(t)),
			(this.settings = s.extend({}, n, e)),
			(this.pageNum = 1),
			(this.pageList = []),
			(this.pageTatol = 0),
			this.init();
	}
	s.extend(e.prototype, {
		init: function () {
			this.element.empty(), this.viewHtml(), this.clickBtn();
		},
		creatHtml: function (t) {
			t == this.settings.page
				? this.pageList.push(
						'<button class="active" data-page=' + t + ">" + t + "</button>"
					)
				: this.pageList.push("<button data-page=" + t + ">" + t + "</button>");
		},
		viewHtml: function () {
			var t = this.settings,
				e = 0,
				n = [];
			if (0 < t.total) e = Math.ceil(t.total / t.pageSize);
			else {
				if (!t.noData) return;
				(e = 1), (t.page = 1), (t.total = 0);
			}
			if (
				((this.pageTatol = e),
				(this.pageNum = t.page),
				t.showTotal &&
					n.push(
						'<div class="spage-total">' +
							t.totalTxt.replace(/\{(\w+)\}/gi, t.total) +
							"</div>"
					),
				n.push('<div class="spage-number">'),
				(this.pageList = []),
				t.showPN &&
					(1 == t.page
						? this.pageList.push(
								'<button class="button-disabled" data-page="prev"><i class="prevBtn"></i></button>'
							)
						: this.pageList.push(
								'<button data-page="prev"><i class="prevBtn"></i></button>'
							)),
				e <= 6)
			)
				for (var r = 1; r < e + 1; r++) this.creatHtml(r);
			else if (t.page < 3) {
				for (r = 1; r <= 3; r++) this.creatHtml(r);
				this.pageList.push(
					'<button data-page="after" class="spage-after">...</button><button data-page=' +
						e +
						">" +
						e +
						"</button>"
				);
			} else if (t.page > e - 3) {
				this.pageList.push(
					'<button data-page="1">1</button><button data-page="before" class="spage-before">...</button>'
				);
				for (r = e - 3; r <= e; r++) this.creatHtml(r);
			} else {
				this.pageList.push('<button data-page="1">1</button>'),
					3 < t.page &&
						this.pageList.push(
							'<button data-page="before" class="spage-before">...</button>'
						);
				for (r = t.page - 1; r <= Number(t.page) + 1; r++) this.creatHtml(r);
				t.page <= e - 3 &&
					this.pageList.push(
						'<button data-page="after" class="spage-after">...</button>'
					),
					this.pageList.push("<button data-page=" + e + ">" + e + "</button>");
			}
			if (
				(t.showPN &&
					(t.page == e
						? this.pageList.push(
								'<button class="button-disabled" data-page="next"><i class="nextBtn"></i></button>'
							)
						: this.pageList.push(
								'<button data-page="next"><i class="nextBtn"></i></button>'
							)),
				n.push(this.pageList.join("")),
				n.push("</div>"),
				0 < t.selectOption.length)
			) {
				for (
					var i = '<select class="selectNum" id="selectNum">', o = 0;
					o <= t.selectOption.length - 1;
					o++
				)
					(i += "<option value=" + t.selectOption[o] + " "),
						t.pageSize === t.selectOption[o]
							? (i += "selected>" + t.selectOption[o] + "行/页</option>")
							: (i += ">" + t.selectOption[o] + "行/页</option>");
				(i += "</select>"), n.push(i);
			}
			t.showSkip &&
				n.push(
					'<div class="spage-skip">跳至&nbsp;<input type="text" class="luckysheet-mousedown-cancel" value="' +
						t.page +
						'"/>&nbsp;页&nbsp;&nbsp;</div>'
				),
				this.element.html(n.join(""));
		},
		clickBtn: function () {
			var n = this,
				r = this.settings,
				i = this.element,
				o = this.pageTatol;
			this.element.on("change", "select", function (t) {
				var e = parseInt(document.getElementById("selectNum").value);
				(r.pageSize = e), (r.page = 1), n.element.empty(), n.viewHtml(), r.backFun(r);
			}),
				this.element.off("click", "button"),
				this.element.on("click", "button", function () {
					var t = s(this).data("page");
					switch (t) {
						case "prev":
							(r.page = 1 <= r.page - 1 ? r.page - 1 : 1), (t = r.page);
							break;
						case "next":
							(r.page = Number(r.page) + 1 <= o ? Number(r.page) + 1 : o),
								(t = r.page);
							break;
						case "before":
							(r.page = 1 <= r.page - r.fastForward ? r.page - r.fastForward : 1),
								(t = r.page);
							break;
						case "after":
							(r.page =
								Number(r.page) + Number(r.fastForward) <= o
									? Number(r.page) + Number(r.fastForward)
									: o),
								(t = r.page);
							break;
						case "go":
							var e = parseInt(i.find("input").val());
							if (!(/^[0-9]*$/.test(e) && 1 <= e && e <= o)) return;
							t = r.page = e;
							break;
						default:
							r.page = t;
					}
					t != n.pageNum && ((n.pageNum = r.page), n.viewHtml(), r.backFun(r));
				}),
				this.element.off("keyup", "input"),
				this.element.on("keyup", "input", function (t) {
					13 == t.keyCode &&
						((t = parseInt(i.find("input").val())),
						/^[0-9]*$/.test(t) &&
							1 <= t &&
							t <= o &&
							t != n.pageNum &&
							((r.page = t), (n.pageNum = t), n.viewHtml(), r.backFun(r)));
				}),
				0 < r.fastForward &&
					(i.find(".spage-after").hover(
						function () {
							s(this).html("&raquo;");
						},
						function () {
							s(this).html("...");
						}
					),
					i.find(".spage-before").hover(
						function () {
							s(this).html("&laquo;");
						},
						function () {
							s(this).html("...");
						}
					));
		}
	}),
		(s.fn.sPage = function (t) {
			return this.each(function () {
				new e(this, t);
			});
		});
})(jQuery, (window, document));
