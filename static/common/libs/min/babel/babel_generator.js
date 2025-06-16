(e => {
	e(window);
})(function (M) {
	var B = {},
		F = {},
		e = { exports: {} },
		R = { exports: {} };
	function K(e, t) {
		return e._indexes[t];
	}
	((Y = R.exports).SetArray = class {
		constructor() {
			(this._indexes = { __proto__: null }), (this.array = []);
		}
	}),
		(Y.get = K),
		(Y.pop = function (e) {
			var { array: e, _indexes: t } = e;
			0 !== e.length && (t[e.pop()] = void 0);
		}),
		(Y.put = function (e, t) {
			var n = K(e, t);
			return void 0 !== n
				? n
				: (({ array: n, _indexes: e } = e), (n = n.push(t)), (e[t] = n - 1));
		}),
		(Y.remove = function (e, t) {
			var n = K(e, t);
			if (void 0 !== n) {
				var { array: r, _indexes: i } = e;
				for (let e = n + 1; e < r.length; e++) {
					var a = r[e];
					i[(r[e - 1] = a)]--;
				}
				(i[t] = void 0), r.pop();
			}
		}),
		Object.defineProperty(Y, "__esModule", { value: !0 });
	var Y = { exports: {} },
		n = Y.exports;
	{
		let m = ",".charCodeAt(0),
			p = ";".charCodeAt(0),
			t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			i = new Uint8Array(64),
			o = new Uint8Array(128);
		for (let e = 0; e < t.length; e++) {
			var V = t.charCodeAt(e);
			(i[e] = V), (o[V] = e);
		}
		function g(e, t) {
			let n = 0,
				r = 0;
			do {
				var i = e.next(),
					i = o[i];
			} while (((n |= (31 & i) << r), (r += 5), 32 & i));
			var a = 1 & n;
			return (n >>>= 1), t + (n = a ? -2147483648 | -n : n);
		}
		function T(t, e, n) {
			let r = e - n;
			r = r < 0 ? (-r << 1) | 1 : r << 1;
			do {
				let e = 31 & r;
				0 < (r >>>= 5) && (e |= 32), t.write(i[e]);
			} while (0 < r);
			return e;
		}
		function J(e, t) {
			return !(e.pos >= t) && e.peek() !== m;
		}
		let r =
			"undefined" != typeof TextDecoder
				? new TextDecoder()
				: "undefined" != typeof Buffer
					? {
							decode(e) {
								return Buffer.from(e.buffer, e.byteOffset, e.byteLength).toString();
							}
						}
					: {
							decode(t) {
								let n = "";
								for (let e = 0; e < t.length; e++) n += String.fromCharCode(t[e]);
								return n;
							}
						};
		class Jl {
			constructor() {
				(this.pos = 0), (this.out = ""), (this.buffer = new Uint8Array(16384));
			}
			write(e) {
				var t = this.buffer;
				(t[this.pos++] = e),
					16384 === this.pos && ((this.out += r.decode(t)), (this.pos = 0));
			}
			flush() {
				var { buffer: e, out: t, pos: n } = this;
				return 0 < n ? t + r.decode(e.subarray(0, n)) : t;
			}
		}
		class Xl {
			constructor(e) {
				(this.pos = 0), (this.buffer = e);
			}
			next() {
				return this.buffer.charCodeAt(this.pos++);
			}
			peek() {
				return this.buffer.charCodeAt(this.pos);
			}
			indexOf(e) {
				var { buffer: t, pos: n } = this,
					e = t.indexOf(e, n);
				return -1 === e ? t.length : e;
			}
		}
		let v = [];
		function X(e, t, n) {
			for (; e.write(p), ++t < n; );
		}
		function q(e, t) {
			return e[0] - t[0];
		}
		(n.decode = function (e) {
			var t = e.length,
				r = new Xl(e),
				i = [];
			let a = 0,
				o = 0,
				s = 0,
				l = 0,
				p = 0;
			do {
				var u = r.indexOf(";"),
					c = [];
				let t = !0,
					n = 0;
				for (a = 0; r.pos < u; ) {
					let e;
					(a = g(r, a)) < n && (t = !1),
						(n = a),
						(e = J(r, u)
							? ((o = g(r, o)),
								(s = g(r, s)),
								(l = g(r, l)),
								J(r, u) ? ((p = g(r, p)), [a, o, s, l, p]) : [a, o, s, l])
							: [a]),
						c.push(e),
						r.pos++;
				}
				t || c.sort(q), i.push(c), (r.pos = u + 1);
			} while (r.pos <= t);
			return i;
		}),
			(n.decodeGeneratedRanges = function (e) {
				var t = e.length,
					i = new Xl(e),
					a = [],
					o = [];
				let s = 0,
					l = 0,
					p = 0,
					u = 0,
					c = 0,
					d = 0,
					f = 0,
					y = 0;
				do {
					var m = i.indexOf(";");
					let r = 0;
					for (; i.pos < m; i.pos++)
						if (((r = g(i, r)), J(i, m))) {
							var T = g(i, 0),
								h = 1 & T,
								S = 2 & T,
								T = 4 & T;
							let e = null,
								n = v,
								t;
							if (
								(((t = h
									? ((h = g(i, l)),
										(p = g(i, l === h ? p : 0)),
										(l = h),
										[s, r, 0, 0, h, p])
									: [s, r, 0, 0]).isScope = !!T),
								S &&
									((h = u),
									(T = c),
									(S = h === (u = g(i, u))),
									(c = g(i, S ? c : 0)),
									(d = g(i, S && T === c ? d : 0)),
									(e = [u, c, d])),
								(t.callsite = e),
								J(i, m))
							) {
								n = [];
								do {
									(f = s), (y = r);
									var b = g(i, 0);
									let t;
									if (b < -1) {
										t = [[g(i, 0)]];
										for (let e = -1; e > b; e--) {
											var E = f,
												E =
													((f = g(i, f)),
													(y = g(i, f === E ? y : 0)),
													g(i, 0));
											t.push([E, f, y]);
										}
									} else t = [[b]];
									n.push(t);
								} while (J(i, m));
							}
							(t.bindings = n), a.push(t), o.push(t);
						} else {
							h = o.pop();
							(h[2] = s), (h[3] = r);
						}
					s++, (i.pos = m + 1);
				} while (i.pos < t);
				return a;
			}),
			(n.decodeOriginalScopes = function (e) {
				var t = e.length,
					n = new Xl(e),
					r = [],
					i = [];
				let a = 0;
				for (; n.pos < t; n.pos++) {
					a = g(n, a);
					var o = g(n, 0);
					if (J(n, t)) {
						var s = g(n, 0),
							s = 1 & g(n, 0) ? [a, o, 0, 0, s, g(n, 0)] : [a, o, 0, 0, s];
						let e = v;
						if (J(n, t)) {
							e = [];
							do {
								var l = g(n, 0);
								e.push(l);
							} while (J(n, t));
						}
						(s.vars = e), r.push(s), i.push(s);
					} else {
						s = i.pop();
						(s[2] = a), (s[3] = o);
					}
				}
				return r;
			}),
			(n.encode = function (t) {
				var n = new Jl();
				let r = 0,
					i = 0,
					a = 0,
					o = 0;
				for (let e = 0; e < t.length; e++) {
					var s = t[e];
					if ((0 < e && n.write(p), 0 !== s.length)) {
						let t = 0;
						for (let e = 0; e < s.length; e++) {
							var l = s[e];
							0 < e && n.write(m),
								(t = T(n, l[0], t)),
								1 !== l.length &&
									((r = T(n, l[1], r)),
									(i = T(n, l[2], i)),
									(a = T(n, l[3], a)),
									4 !== l.length) &&
									(o = T(n, l[4], o));
						}
					}
				}
				return n.flush();
			}),
			(n.encodeGeneratedRanges = function (t) {
				if (0 === t.length) return "";
				var n = new Jl();
				for (let e = 0; e < t.length; )
					e = (function r(i, a, o, s) {
						let l = i[a];
						let { 0: t, 1: p, 2: u, 3: c, isScope: e, callsite: n, bindings: d } = l;
						s[0] < t ? (X(o, s[0], t), (s[0] = t), (s[1] = 0)) : 0 < a && o.write(m);
						s[1] = T(o, l[1], s[1]);
						let f = (6 === l.length ? 1 : 0) | (n ? 2 : 0) | (e ? 4 : 0);
						T(o, f, 0);
						if (6 === l.length) {
							let { 4: e, 5: t } = l;
							e !== s[2] && (s[3] = 0),
								(s[2] = T(o, e, s[2])),
								(s[3] = T(o, t, s[3]));
						}
						if (n) {
							let { 0: e, 1: t, 2: n } = l.callsite;
							e !== s[4] ? ((s[5] = 0), (s[6] = 0)) : t !== s[5] && (s[6] = 0),
								(s[4] = T(o, e, s[4])),
								(s[5] = T(o, t, s[5])),
								(s[6] = T(o, n, s[6]));
						}
						if (d)
							for (var y of d) {
								1 < y.length && T(o, -y.length, 0);
								let e = y[0][0],
									n = (T(o, e, 0), t),
									r = p;
								for (let t = 1; t < y.length; t++) {
									let e = y[t];
									(n = T(o, e[1], n)), (r = T(o, e[2], r)), T(o, e[0], 0);
								}
							}
						for (a++; a < i.length; ) {
							let e = i[a],
								{ 0: t, 1: n } = e;
							if (t > u || (t === u && n >= c)) break;
							a = r(i, a, o, s);
						}
						s[0] < u ? (X(o, s[0], u), (s[0] = u), (s[1] = 0)) : o.write(m);
						s[1] = T(o, c, s[1]);
						return a;
					})(t, e, n, [0, 0, 0, 0, 0, 0, 0]);
				return n.flush();
			}),
			(n.encodeOriginalScopes = function (t) {
				var n = new Jl();
				for (let e = 0; e < t.length; )
					e = (function r(i, a, o, s) {
						let e = i[a];
						let { 0: t, 1: n, 2: l, 3: p, 4: u, vars: c } = e;
						0 < a && o.write(m);
						s[0] = T(o, t, s[0]);
						T(o, n, 0);
						T(o, u, 0);
						let d = 6 === e.length ? 1 : 0;
						T(o, d, 0);
						6 === e.length && T(o, e[5], 0);
						for (var f of c) T(o, f, 0);
						for (a++; a < i.length; ) {
							let e = i[a],
								{ 0: t, 1: n } = e;
							if (t > l || (t === l && n >= p)) break;
							a = r(i, a, o, s);
						}
						o.write(m);
						s[0] = T(o, l, s[0]);
						T(o, p, 0);
						return a;
					})(t, e, n, [0]);
				return n.flush();
			}),
			Object.defineProperty(n, "__esModule", { value: !0 });
	}
	var n = { exports: {} },
		t = { exports: {} },
		i =
			((t.exports = (() => {
				let i = /^[\w+.-]+:\/\//,
					t = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/,
					a = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;
				function o(e) {
					return e.startsWith("/");
				}
				function c(e) {
					return /^[.?#]/.test(e);
				}
				function s(e) {
					e = t.exec(e);
					return l(
						e[1],
						e[2] || "",
						e[3],
						e[4] || "",
						e[5] || "/",
						e[6] || "",
						e[7] || ""
					);
				}
				function l(e, t, n, r, i, a, o) {
					return {
						scheme: e,
						user: t,
						host: n,
						port: r,
						path: i,
						query: a,
						hash: o,
						type: 7
					};
				}
				function d(e) {
					var t, n, r;
					return e.startsWith("//")
						? (((t = s("http:" + e)).scheme = ""), (t.type = 6), t)
						: o(e)
							? (((t = s("http://foo.com" + e)).scheme = ""),
								(t.host = ""),
								(t.type = 5),
								t)
							: e.startsWith("file:")
								? ((t = e),
									(n = (t = a.exec(t))[2]),
									l(
										"file:",
										"",
										t[1] || "",
										"",
										o(n) ? n : "/" + n,
										t[3] || "",
										t[4] || ""
									))
								: ((n = e),
									i.test(n)
										? s(e)
										: (((r = s("http://foo.com/" + e)).scheme = ""),
											(r.host = ""),
											(r.type = e
												? e.startsWith("?")
													? 3
													: e.startsWith("#")
														? 2
														: 4
												: 1),
											r));
				}
				function f(e, t) {
					var n = t <= 4,
						r = e.path.split("/");
					let i = 1,
						a = 0,
						o = !1;
					for (let e = 1; e < r.length; e++) {
						var s = r[e];
						s
							? ((o = !1),
								"." !== s &&
									(".." === s
										? a
											? ((o = !0), a--, i--)
											: n && (r[i++] = s)
										: ((r[i++] = s), a++)))
							: (o = !0);
					}
					let l = "";
					for (let e = 1; e < i; e++) l += "/" + r[e];
					(l && (!o || l.endsWith("/.."))) || (l += "/"), (e.path = l);
				}
				return function (e, t) {
					if (!e && !t) return "";
					var n,
						r,
						i,
						a = d(e);
					let o = a.type;
					if (t && 7 !== o) {
						var s = d(t),
							l = s.type;
						switch (o) {
							case 1:
								a.hash = s.hash;
							case 2:
								a.query = s.query;
							case 3:
							case 4:
								(n = a),
									f((r = s), r.type),
									"/" === n.path
										? (n.path = r.path)
										: (n.path =
												((r = r.path).endsWith("/..")
													? r
													: ((i = r.lastIndexOf("/")),
														r.slice(0, i + 1))) + n.path);
							case 5:
								(a.user = s.user), (a.host = s.host), (a.port = s.port);
							case 6:
								a.scheme = s.scheme;
						}
						l > o && (o = l);
					}
					f(a, o);
					var p = a.query + a.hash;
					switch (o) {
						case 2:
						case 3:
							return p;
						case 4:
							var u = a.path.slice(1);
							return u ? (c(t || e) && !c(u) ? "./" + u + p : u + p) : p || ".";
						case 5:
							return a.path + p;
						default:
							return a.scheme + "//" + a.user + a.host + a.port + a.path + p;
					}
				};
			})()),
			n.exports);
	{
		var U = Y.exports,
			W = t.exports;
		function G(e, t) {
			return t && !t.endsWith("/") && (t += "/"), W(e, t);
		}
		let A = 0,
			O = 1,
			_ = 2,
			I = 3,
			C = 4,
			f = 1,
			y = 2;
		function z(t, n) {
			var r = H(t, 0);
			if (r !== t.length) {
				n || (t = t.slice());
				for (let e = r; e < t.length; e = H(t, e + 1))
					t[e] = ((e, t) => (e = t ? e : e.slice()).sort($))(t[e], n);
			}
			return t;
		}
		function H(t, n) {
			for (let e = n; e < t.length; e++)
				if (
					!(t => {
						for (let e = 1; e < t.length; e++) if (t[e][A] < t[e - 1][A]) return;
						return 1;
					})(t[e])
				)
					return e;
			return t.length;
		}
		function $(e, t) {
			return e[A] - t[A];
		}
		let m = !1;
		function Q(t, n, r) {
			for (let e = r + 1; e < t.length && t[e][A] === n; r = e++);
			return r;
		}
		function Z(t, n, r) {
			for (let e = r - 1; 0 <= e && t[e][A] === n; r = e--);
			return r;
		}
		function ee() {
			return { lastKey: -1, lastNeedle: -1, lastIndex: -1 };
		}
		function te(e, t, n, r) {
			var { lastKey: i, lastNeedle: a, lastIndex: o } = n;
			let s = 0,
				l = e.length - 1;
			if (r === i) {
				if (t === a) return (m = -1 !== o && e[o][A] === t), o;
				a <= t ? (s = -1 === o ? 0 : o) : (l = o);
			}
			return (
				(n.lastKey = r),
				(n.lastNeedle = t),
				(n.lastIndex = ((e, t, n, r) => {
					for (; n <= r; ) {
						var i = n + ((r - n) >> 1),
							a = e[i][A] - t;
						if (0 == a) return (m = !0), i;
						a < 0 ? (n = i + 1) : (r = i - 1);
					}
					return (m = !1), n - 1;
				})(e, t, s, l))
			);
		}
		function ne() {
			return { __proto__: null };
		}
		function re(e) {
			return "string" == typeof e ? JSON.parse(e) : e;
		}
		function ie(e, r, i, a, o, s, l, p, u, c, d) {
			var f = e.sections;
			for (let n = 0; n < f.length; n++) {
				var y,
					{ map: m, offset: T } = f[n];
				let e = c,
					t = d;
				n + 1 < f.length &&
					((y = f[n + 1].offset),
					(e = Math.min(c, p + y.line)) === c
						? (t = Math.min(d, u + y.column))
						: e < c && (t = u + y.column)),
					!(function (e, t, n, r, i, a, o, s, l, p, u) {
						e = re(e);
						if ("sections" in e) return ie(...arguments);
						var e = new ql(e, t),
							c = r.length,
							d = a.length,
							f = se(e),
							{ resolvedSources: y, sourcesContent: t, ignoreList: m } = e;
						if ((ae(r, y), ae(a, e.names), t)) ae(i, t);
						else for (let e = 0; e < y.length; e++) i.push(null);
						if (m) for (let e = 0; e < m.length; e++) o.push(m[e] + c);
						for (let e = 0; e < f.length; e++) {
							var T = s + e;
							if (p < T) return;
							var h = ((t, n) => {
									for (let e = t.length; e <= n; e++) t[e] = [];
									return t[n];
								})(n, T),
								S = 0 === e ? l : 0,
								b = f[e];
							for (let e = 0; e < b.length; e++) {
								var E,
									v,
									g,
									P = b[e],
									x = S + P[A];
								if (T === p && u <= x) return;
								1 === P.length
									? h.push([x])
									: ((E = c + P[O]),
										(v = P[_]),
										(g = P[I]),
										h.push(
											4 === P.length ? [x, E, v, g] : [x, E, v, g, d + P[C]]
										));
							}
						}
					})(m, r, i, a, o, s, l, p + T.line, u + T.column, e, t);
			}
		}
		function ae(t, n) {
			for (let e = 0; e < n.length; e++) t.push(n[e]);
		}
		let T = "`line` must be greater than 0 (lines start at line 1)",
			h = "`column` must be greater than or equal to 0 (columns start at column 0)",
			S = -1,
			b = 1;
		class ql {
			constructor(e, t) {
				var n = "string" == typeof e;
				if (!n && e._decodedMemo) return e;
				var e = n ? JSON.parse(e) : e,
					{
						version: r,
						file: i,
						names: a,
						sourceRoot: o,
						sources: s,
						sourcesContent: l
					} = e;
				(this.version = r),
					(this.file = i),
					(this.names = a || []),
					(this.sourceRoot = o),
					(this.sources = s),
					(this.sourcesContent = l),
					(this.ignoreList = e.ignoreList || e.x_google_ignoreList || void 0);
				let p = G(o || "", (r = t) ? ((i = r.lastIndexOf("/")), r.slice(0, i + 1)) : "");
				this.resolvedSources = s.map(e => G(e || "", p));
				a = e.mappings;
				"string" == typeof a
					? ((this._encoded = a), (this._decoded = void 0))
					: ((this._encoded = void 0), (this._decoded = z(a, n))),
					(this._decodedMemo = ee()),
					(this._bySources = void 0),
					(this._bySourceMemos = void 0);
			}
		}
		function oe(e) {
			var t;
			return null != (t = e._encoded) ? t : (e._encoded = U.encode(e._decoded));
		}
		function se(e) {
			return e._decoded || (e._decoded = U.decode(e._encoded));
		}
		function le(e, t) {
			var { sources: e, resolvedSources: n } = e;
			let r = e.indexOf(t);
			return (r = -1 === r ? n.indexOf(t) : r);
		}
		function pe(e, t) {
			t = new ql(ue(e, []), t);
			return (t._decoded = e.mappings), t;
		}
		function ue(e, t) {
			return {
				version: e.version,
				file: e.file,
				names: e.names,
				sourceRoot: e.sourceRoot,
				sources: e.sources,
				sourcesContent: e.sourcesContent,
				mappings: t,
				ignoreList: e.ignoreList || e.x_google_ignoreList
			};
		}
		function ce(e, t, n, r) {
			return { source: e, line: t, column: n, name: r };
		}
		function de(e, t) {
			return { line: e, column: t };
		}
		function fe(e, t, n, r, i) {
			let a = te(e, r, t, n);
			return (
				m ? (a = (i === S ? Q : Z)(e, r, a)) : i === S && a++,
				-1 === a || a === e.length ? -1 : a
			);
		}
		function ye(t, n, r, i, a, o) {
			if (--r < 0) throw new Error(T);
			if (i < 0) throw new Error(h);
			var { sources: s, resolvedSources: l } = t;
			let e = s.indexOf(n);
			if (-1 === (e = -1 === e ? l.indexOf(n) : e)) return o ? [] : de(null, null);
			l = (t._bySources ||
				(t._bySources = ((e, n) => {
					var r = n.map(ne);
					for (let t = 0; t < e.length; t++) {
						var i = e[t];
						for (let e = 0; e < i.length; e++) {
							var a = i[e];
							if (1 !== a.length) {
								var o = a[O],
									s = a[_],
									l = a[I],
									p = r[o],
									p = p[s] || (p[s] = []),
									o = n[o],
									s = Q(p, l, te(p, l, o, s)),
									u = ((o.lastIndex = ++s), (o = c = u = void 0), p),
									c = s,
									o = [l, t, a[A]];
								for (let e = u.length; e > c; e--) u[e] = u[e - 1];
								u[c] = o;
							}
						}
					}
					return r;
				})(se(t), (t._bySourceMemos = s.map(ee)))))[e][r];
			if (null == l) return o ? [] : de(null, null);
			n = t._bySourceMemos[e];
			if (o) {
				var p = l,
					s = i,
					t = a;
				let e = fe(p, (o = n), r, s, b);
				if ((m || t !== S || e++, -1 === e || e === p.length)) return [];
				for (
					var o = m ? s : p[e][A], u = Q(p, o, (e = m ? e : Z(p, o, e))), c = [];
					e <= u;
					e++
				) {
					var d = p[e];
					c.push(de(d[f] + 1, d[y]));
				}
				return c;
			}
			return -1 === (t = fe(l, n, r, i, a)) ? de(null, null) : de((s = l[t])[f] + 1, s[y]);
		}
		(i.AnyMap = function (e, t) {
			var n,
				r,
				i,
				a,
				o,
				e = re(e);
			return "sections" in e
				? (ie(e, t, (n = []), (r = []), (i = []), (a = []), (o = []), 0, 0, 1 / 0, 1 / 0),
					pe({
						version: 3,
						file: e.file,
						names: a,
						sources: r,
						sourcesContent: i,
						mappings: n,
						ignoreList: o
					}))
				: new ql(e, t);
		}),
			(i.GREATEST_LOWER_BOUND = b),
			(i.LEAST_UPPER_BOUND = S),
			(i.TraceMap = ql),
			(i.allGeneratedPositionsFor = function (e, t) {
				var { source: t, line: n, column: r, bias: i } = t;
				return ye(e, t, n, r, i || S, !0);
			}),
			(i.decodedMap = function (e) {
				return ue(e, se(e));
			}),
			(i.decodedMappings = se),
			(i.eachMapping = function (e, o) {
				var t = se(e),
					{ names: s, resolvedSources: l } = e;
				for (let a = 0; a < t.length; a++) {
					var p = t[a];
					for (let i = 0; i < p.length; i++) {
						var u = p[i],
							c = a + 1,
							d = u[0];
						let e = null,
							t = null,
							n = null,
							r = null;
						1 !== u.length && ((e = l[u[1]]), (t = u[2] + 1), (n = u[3])),
							5 === u.length && (r = s[u[4]]),
							o({
								generatedLine: c,
								generatedColumn: d,
								source: e,
								originalLine: t,
								originalColumn: n,
								name: r
							});
					}
				}
			}),
			(i.encodedMap = function (e) {
				return ue(e, oe(e));
			}),
			(i.encodedMappings = oe),
			(i.generatedPositionFor = function (e, t) {
				var { source: t, line: n, column: r, bias: i } = t;
				return ye(e, t, n, r, i || b, !1);
			}),
			(i.isIgnored = function (e, t) {
				var n = e.ignoreList;
				return null != n && -1 !== (e = le(e, t)) && n.includes(e);
			}),
			(i.originalPositionFor = function (e, t) {
				var { line: t, column: n, bias: r } = t;
				if (--t < 0) throw new Error(T);
				if (n < 0) throw new Error(h);
				var i = se(e);
				return t >= i.length ||
					-1 === (t = fe((i = i[t]), e._decodedMemo, t, n, r || b)) ||
					1 === (n = i[t]).length
					? ce(null, null, null, null)
					: (({ names: r, resolvedSources: i } = e),
						ce(i[n[O]], n[_] + 1, n[I], 5 === n.length ? r[n[C]] : null));
			}),
			(i.presortedDecodedMap = pe),
			(i.sourceContentFor = function (e, t) {
				var n = e.sourcesContent;
				return null == n || -1 === (e = le(e, t)) ? null : n[e];
			}),
			(i.traceSegment = function (e, t, n) {
				var r = se(e);
				return t >= r.length || -1 === (e = fe((r = r[t]), e._decodedMemo, t, n, b))
					? null
					: r[e];
			});
	}
	t = e.exports;
	{
		var me = R.exports,
			Te = Y.exports,
			he = n.exports;
		let d = 0,
			f = 1,
			y = 2,
			m = 3,
			T = 4,
			h = -1;
		class Ul {
			constructor({ file: e, sourceRoot: t } = {}) {
				(this._names = new me.SetArray()),
					(this._sources = new me.SetArray()),
					(this._sourcesContent = []),
					(this._mappings = []),
					(this.file = e),
					(this.sourceRoot = t),
					(this._ignoreList = new me.SetArray());
			}
		}
		(i = (e, t, n, r, i, a, o, s) => be(!0, e, t, n, r, i, a, o, s)),
			(R = (e, t) => ge(!0, e, t));
		function Se(e) {
			var { _mappings: n, _sources: t, _sourcesContent: r, _names: i, _ignoreList: a } = e;
			{
				var o = n;
				let e = o.length,
					t = e;
				for (let e = t - 1; 0 <= e && !(0 < o[e].length); t = e, e--);
				t < e && (o.length = t);
			}
			return {
				version: 3,
				file: e.file || void 0,
				names: i.array,
				sourceRoot: e.sourceRoot || void 0,
				sources: t.array,
				sourcesContent: r,
				mappings: n,
				ignoreList: a.array
			};
		}
		function be(e, t, n, r, i, a, o, s, l) {
			var { _mappings: t, _sources: p, _sourcesContent: u, _names: c } = t,
				t = ((t, n) => {
					for (let e = t.length; e <= n; e++) t[e] = [];
					return t[n];
				})(t, n),
				n = ((t, n) => {
					let r = t.length;
					for (let e = r - 1; 0 <= e; r = e--) {
						var i = t[e];
						if (n >= i[d]) break;
					}
					return r;
				})(t, r);
			return i
				? ((p = me.put(p, i)),
					(i = s ? me.put(c, s) : h),
					p === u.length && (u[p] = null != l ? l : null),
					e &&
					((e, t, n, r, i, a) =>
						0 !== t &&
						1 !== (e = e[t - 1]).length &&
						n === e[f] &&
						r === e[y] &&
						i === e[m] &&
						a === (5 === e.length ? e[T] : h))(t, n, p, a, o, i)
						? void 0
						: Ee(t, n, s ? [r, p, a, o, i] : [r, p, a, o]))
				: e && ((e, t) => 0 === t || 1 === (e = e[t - 1]).length)(t, n)
					? void 0
					: Ee(t, n, [r]);
		}
		function Ee(t, n, e) {
			for (let e = t.length; e > n; e--) t[e] = t[e - 1];
			t[n] = e;
		}
		function ve(t, n) {
			for (let e = 0; e < n.length; e++) me.put(t, n[e]);
		}
		function ge(e, t, n) {
			var { generated: n, source: r, original: i, name: a, content: o } = n;
			return r
				? be(e, t, n.line - 1, n.column, r, i.line - 1, i.column, a, o)
				: be(e, t, n.line - 1, n.column, null, null, null, null, null);
		}
		(t.GenMapping = Ul),
			(t.addMapping = function (e, t) {
				return ge(!1, e, t);
			}),
			(t.addSegment = function (e, t, n, r, i, a, o, s) {
				return be(!1, e, t, n, r, i, a, o, s);
			}),
			(t.allMappings = function (e) {
				var a = [],
					{ _mappings: t, _sources: o, _names: s } = e;
				for (let i = 0; i < t.length; i++) {
					var l = t[i];
					for (let r = 0; r < l.length; r++) {
						var p = l[r],
							u = { line: i + 1, column: p[d] };
						let e = void 0,
							t = void 0,
							n = void 0;
						1 !== p.length &&
							((e = o.array[p[f]]),
							(t = { line: p[y] + 1, column: p[m] }),
							5 === p.length) &&
							(n = s.array[p[T]]),
							a.push({ generated: u, source: e, original: t, name: n });
					}
				}
				return a;
			}),
			(t.fromMap = function (e) {
				var e = new he.TraceMap(e),
					t = new Ul({ file: e.file, sourceRoot: e.sourceRoot });
				return (
					ve(t._names, e.names),
					ve(t._sources, e.sources),
					(t._sourcesContent = e.sourcesContent || e.sources.map(() => null)),
					(t._mappings = he.decodedMappings(e)),
					e.ignoreList && ve(t._ignoreList, e.ignoreList),
					t
				);
			}),
			(t.maybeAddMapping = R),
			(t.maybeAddSegment = i),
			(t.setIgnore = function (e, t, n = !0) {
				var { _sources: e, _sourcesContent: r, _ignoreList: i } = e;
				(e = me.put(e, t)) === r.length && (r[e] = null),
					n ? me.put(i, e) : me.remove(i, e);
			}),
			(t.setSourceContent = function (e, t, n) {
				var { _sources: e, _sourcesContent: r } = e;
				r[me.put(e, t)] = n;
			}),
			(t.toDecodedMap = Se),
			(t.toEncodedMap = function (e) {
				return (
					(e = Se(e)),
					Object.assign(Object.assign({}, e), { mappings: Te.encode(e.mappings) })
				);
			}),
			Object.defineProperty(t, "__esModule", { value: !0 });
	}
	Object.defineProperty(F, "__esModule", { value: !0 }), (F.default = void 0);
	var Pe = e.exports,
		xe = n.exports;
	F.default = class {
		constructor(e, t) {
			(this._map = void 0),
				(this._rawMappings = void 0),
				(this._sourceFileName = void 0),
				(this._lastGenLine = 0),
				(this._lastSourceLine = 0),
				(this._lastSourceColumn = 0),
				(this._inputMap = void 0);
			var n,
				r = (this._map = new Pe.GenMapping({ sourceRoot: e.sourceRoot }));
			if (
				((this._sourceFileName =
					null == (n = e.sourceFileName) ? void 0 : n.replace(/\\/g, "/")),
				(this._rawMappings = void 0),
				e.inputSourceMap)
			) {
				this._inputMap = new xe.TraceMap(e.inputSourceMap);
				var i,
					a = this._inputMap.resolvedSources;
				if (a.length)
					for (let e = 0; e < a.length; e++)
						(0, Pe.setSourceContent)(
							r,
							a[e],
							null == (i = this._inputMap.sourcesContent) ? void 0 : i[e]
						);
			}
			if ("string" != typeof t || e.inputSourceMap) {
				if ("object" == typeof t)
					for (var o of Object.keys(t))
						(0, Pe.setSourceContent)(r, o.replace(/\\/g, "/"), t[o]);
			} else (0, Pe.setSourceContent)(r, this._sourceFileName, t);
		}
		get() {
			return (0, Pe.toEncodedMap)(this._map);
		}
		getDecoded() {
			return (0, Pe.toDecodedMap)(this._map);
		}
		getRawMappings() {
			return this._rawMappings || (this._rawMappings = (0, Pe.allMappings)(this._map));
		}
		mark(e, t, n, r, i, a) {
			this._rawMappings = void 0;
			let o;
			null != t &&
				(this._inputMap
					? !(o = (0, xe.originalPositionFor)(this._inputMap, { line: t, column: n }))
							.name &&
						i &&
						(i = (0, xe.originalPositionFor)(this._inputMap, i)).name &&
						(r = i.name)
					: (o = {
							source:
								(null == a ? void 0 : a.replace(/\\/g, "/")) ||
								this._sourceFileName,
							line: t,
							column: n
						})),
				(0, Pe.maybeAddMapping)(this._map, {
					name: r,
					generated: e,
					source: null == (i = o) ? void 0 : i.source,
					original: o
				});
		}
	};
	(Y = {}), (R = {});
	Object.defineProperty(R, "__esModule", { value: !0 }), (R.default = void 0);
	R.default = class {
		constructor(e, t) {
			(this._map = null),
				(this._buf = ""),
				(this._str = ""),
				(this._appendCount = 0),
				(this._last = 0),
				(this._queue = []),
				(this._queueCursor = 0),
				(this._canMarkIdName = !0),
				(this._indentChar = ""),
				(this._fastIndentations = []),
				(this._position = { line: 1, column: 0 }),
				(this._sourcePosition = {
					identifierName: void 0,
					identifierNamePos: void 0,
					line: void 0,
					column: void 0,
					filename: void 0
				}),
				(this._map = e),
				(this._indentChar = t);
			for (let e = 0; e < 64; e++) this._fastIndentations.push(t.repeat(e));
			this._allocQueue();
		}
		_allocQueue() {
			var t = this._queue;
			for (let e = 0; e < 16; e++)
				t.push({
					char: 0,
					repeat: 1,
					line: void 0,
					column: void 0,
					identifierName: void 0,
					identifierNamePos: void 0,
					filename: ""
				});
		}
		_pushQueue(e, t, n, r, i) {
			var a = this._queueCursor,
				a = (a === this._queue.length && this._allocQueue(), this._queue[a]);
			(a.char = e),
				(a.repeat = t),
				(a.line = n),
				(a.column = r),
				(a.filename = i),
				this._queueCursor++;
		}
		_popQueue() {
			if (0 === this._queueCursor) throw new Error("Cannot pop from empty queue");
			return this._queue[--this._queueCursor];
		}
		get() {
			this._flush();
			let t = this._map,
				n = {
					code: (this._buf + this._str).trimRight(),
					decodedMap: null == t ? void 0 : t.getDecoded(),
					get __mergedMap() {
						return this.map;
					},
					get map() {
						var e = t ? t.get() : null;
						return (n.map = e);
					},
					set map(e) {
						Object.defineProperty(n, "map", { value: e, writable: !0 });
					},
					get rawMappings() {
						var e = null == t ? void 0 : t.getRawMappings();
						return (n.rawMappings = e);
					},
					set rawMappings(e) {
						Object.defineProperty(n, "rawMappings", { value: e, writable: !0 });
					}
				};
			return n;
		}
		append(e, t) {
			this._flush(), this._append(e, this._sourcePosition, t);
		}
		appendChar(e) {
			this._flush(), this._appendChar(e, 1, this._sourcePosition);
		}
		queue(e) {
			if (10 === e)
				for (; 0 !== this._queueCursor; ) {
					var t = this._queue[this._queueCursor - 1].char;
					if (32 !== t && 9 !== t) break;
					this._queueCursor--;
				}
			var n = this._sourcePosition;
			this._pushQueue(e, 1, n.line, n.column, n.filename);
		}
		queueIndentation(e) {
			0 !== e && this._pushQueue(-1, e, void 0, void 0, void 0);
		}
		_flush() {
			var t = this._queueCursor,
				n = this._queue;
			for (let e = 0; e < t; e++) {
				var r = n[e];
				this._appendChar(r.char, r.repeat, r);
			}
			this._queueCursor = 0;
		}
		_appendChar(e, t, n) {
			var r;
			-1 === (this._last = e)
				? ((r = this._fastIndentations[t]),
					(this._str +=
						void 0 !== r ? r : 1 < t ? this._indentChar.repeat(t) : this._indentChar))
				: (this._str += 1 < t ? String.fromCharCode(e).repeat(t) : String.fromCharCode(e)),
				10 !== e
					? (this._mark(
							n.line,
							n.column,
							n.identifierName,
							n.identifierNamePos,
							n.filename
						),
						(this._position.column += t))
					: (this._position.line++, (this._position.column = 0)),
				this._canMarkIdName &&
					((n.identifierName = void 0), (n.identifierNamePos = void 0));
		}
		_append(r, i, a) {
			var o = r.length,
				s = this._position;
			if (
				((this._last = r.charCodeAt(o - 1)),
				4096 < ++this._appendCount
					? (this._str,
						(this._buf += this._str),
						(this._str = r),
						(this._appendCount = 0))
					: (this._str += r),
				a || this._map)
			) {
				var { column: a, identifierName: l, identifierNamePos: p, filename: u } = i;
				let e = i.line,
					t =
						((null == l && null == p) ||
							!this._canMarkIdName ||
							((i.identifierName = void 0), (i.identifierNamePos = void 0)),
						r.indexOf("\n")),
					n = 0;
				for (0 !== t && this._mark(e, a, l, p, u); -1 !== t; )
					s.line++,
						(s.column = 0),
						(n = t + 1) < o && void 0 !== e && this._mark(++e, 0, null, null, u),
						(t = r.indexOf("\n", n));
				s.column += o - n;
			} else s.column += o;
		}
		_mark(e, t, n, r, i) {
			var a;
			null != (a = this._map) && a.mark(this._position, e, t, n, r, i);
		}
		removeTrailingNewline() {
			var e = this._queueCursor;
			0 !== e && 10 === this._queue[e - 1].char && this._queueCursor--;
		}
		removeLastSemicolon() {
			var e = this._queueCursor;
			0 !== e && 59 === this._queue[e - 1].char && this._queueCursor--;
		}
		getLastChar() {
			var e = this._queueCursor;
			return 0 !== e ? this._queue[e - 1].char : this._last;
		}
		getNewlineCount() {
			var t = this._queueCursor;
			let n = 0;
			if (0 === t) return 10 === this._last ? 1 : 0;
			for (let e = t - 1; 0 <= e && 10 === this._queue[e].char; e--) n++;
			return n === t && 10 === this._last ? n + 1 : n;
		}
		endsWithCharAndNewline() {
			var e = this._queue,
				t = this._queueCursor;
			if (0 !== t) {
				var n = e[t - 1].char;
				if (10 === n) return 1 < t ? e[t - 2].char : this._last;
			}
		}
		hasContent() {
			return 0 !== this._queueCursor || !!this._last;
		}
		exactSource(e, t) {
			var n, r;
			this._map
				? (this.source("start", e),
					(n = e.identifierName),
					(r = this._sourcePosition),
					n && ((this._canMarkIdName = !1), (r.identifierName = n)),
					t(),
					n &&
						((this._canMarkIdName = !0),
						(r.identifierName = void 0),
						(r.identifierNamePos = void 0)),
					this.source("end", e))
				: t();
		}
		source(e, t) {
			this._map && this._normalizePosition(e, t, 0);
		}
		sourceWithOffset(e, t, n) {
			this._map && this._normalizePosition(e, t, n);
		}
		_normalizePosition(e, t, n) {
			var e = t[e],
				r = this._sourcePosition;
			e &&
				((r.line = e.line),
				(r.column = Math.max(e.column + n, 0)),
				(r.filename = t.filename));
		}
		getCurrentColumn() {
			var t = this._queue,
				n = this._queueCursor;
			let r = -1,
				i = 0;
			for (let e = 0; e < n; e++) {
				var a = t[e];
				10 === a.char && (r = i), (i += a.repeat);
			}
			return -1 === r ? this._position.column + i : i - 1 - r;
		}
		getCurrentLine() {
			let t = 0;
			var n = this._queue;
			for (let e = 0; e < this._queueCursor; e++) 10 === n[e].char && t++;
			return this._position.line + t;
		}
	};
	var i = {},
		t = {},
		e = {},
		n = {},
		Ae = {},
		Oe = {},
		r = {},
		_e = {};
	Object.defineProperty(_e, "__esModule", { value: !0 }),
		(_e.default = function (e, t) {
			var n = Object.keys(t);
			for (var r of n) if (e[r] !== t[r]) return !1;
			return !0;
		});
	var Ie = {};
	Object.defineProperty(Ie, "__esModule", { value: !0 }),
		(Ie.default = function (e, t, n = "") {
			var r, i;
			Ce.has(e) ||
				(Ce.add(e),
				({ internal: r, trace: i } = ((e, t) => {
					let { stackTraceLimit: n, prepareStackTrace: r } = Error,
						i;
					return (
						(Error.stackTraceLimit = 1 + e + t),
						(Error.prepareStackTrace = function (e, t) {
							i = t;
						}),
						new Error().stack,
						(Error.stackTraceLimit = n),
						(Error.prepareStackTrace = r),
						i
							? ((e = i.slice(1 + e, 1 + e + t)),
								{
									internal: /[\\/]@babel[\\/]/.test(e[1].getFileName()),
									trace: e.map(e => "    at " + e).join("\n")
								})
							: { internal: !1, trace: "" }
					);
				})(1, 2)),
				r) ||
				console.warn(
					n +
						`\`${e}\` has been deprecated, please migrate to \`${t}\`
` +
						i
				);
		});
	let Ce = new Set();
	Object.defineProperty(r, "__esModule", { value: !0 }),
		(r.isAccessor = function (e, t) {
			if (!e) return !1;
			if ("ClassAccessorProperty" !== e.type) return !1;
			return null == t || (0, a.default)(e, t);
		}),
		(r.isAnyTypeAnnotation = function (e, t) {
			return !!e && "AnyTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isArgumentPlaceholder = function (e, t) {
			return !!e && "ArgumentPlaceholder" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isArrayExpression = function (e, t) {
			return !!e && "ArrayExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isArrayPattern = function (e, t) {
			return !!e && "ArrayPattern" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isArrayTypeAnnotation = function (e, t) {
			return !!e && "ArrayTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isArrowFunctionExpression = function (e, t) {
			return (
				!!e && "ArrowFunctionExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isAssignmentExpression = function (e, t) {
			return !!e && "AssignmentExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isAssignmentPattern = function (e, t) {
			return !!e && "AssignmentPattern" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isAwaitExpression = function (e, t) {
			return !!e && "AwaitExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBigIntLiteral = function (e, t) {
			return !!e && "BigIntLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBinary = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BinaryExpression":
				case "LogicalExpression":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isBinaryExpression = function (e, t) {
			return !!e && "BinaryExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBindExpression = function (e, t) {
			return !!e && "BindExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBlock = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BlockStatement":
				case "Program":
				case "TSModuleBlock":
					break;
				case "Placeholder":
					if ("BlockStatement" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isBlockParent = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BlockStatement":
				case "CatchClause":
				case "DoWhileStatement":
				case "ForInStatement":
				case "ForStatement":
				case "FunctionDeclaration":
				case "FunctionExpression":
				case "Program":
				case "ObjectMethod":
				case "SwitchStatement":
				case "WhileStatement":
				case "ArrowFunctionExpression":
				case "ForOfStatement":
				case "ClassMethod":
				case "ClassPrivateMethod":
				case "StaticBlock":
				case "TSModuleBlock":
					break;
				case "Placeholder":
					if ("BlockStatement" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isBlockStatement = function (e, t) {
			return !!e && "BlockStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBooleanLiteral = function (e, t) {
			return !!e && "BooleanLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBooleanLiteralTypeAnnotation = function (e, t) {
			return (
				!!e &&
				"BooleanLiteralTypeAnnotation" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isBooleanTypeAnnotation = function (e, t) {
			return !!e && "BooleanTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isBreakStatement = function (e, t) {
			return !!e && "BreakStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isCallExpression = function (e, t) {
			return !!e && "CallExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isCatchClause = function (e, t) {
			return !!e && "CatchClause" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClass = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ClassExpression":
				case "ClassDeclaration":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isClassAccessorProperty = function (e, t) {
			return !!e && "ClassAccessorProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassBody = function (e, t) {
			return !!e && "ClassBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassDeclaration = function (e, t) {
			return !!e && "ClassDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassExpression = function (e, t) {
			return !!e && "ClassExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassImplements = function (e, t) {
			return !!e && "ClassImplements" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassMethod = function (e, t) {
			return !!e && "ClassMethod" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassPrivateMethod = function (e, t) {
			return !!e && "ClassPrivateMethod" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassPrivateProperty = function (e, t) {
			return !!e && "ClassPrivateProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isClassProperty = function (e, t) {
			return !!e && "ClassProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isCompletionStatement = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BreakStatement":
				case "ContinueStatement":
				case "ReturnStatement":
				case "ThrowStatement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isConditional = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ConditionalExpression":
				case "IfStatement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isConditionalExpression = function (e, t) {
			return !!e && "ConditionalExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isContinueStatement = function (e, t) {
			return !!e && "ContinueStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDebuggerStatement = function (e, t) {
			return !!e && "DebuggerStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDecimalLiteral = function (e, t) {
			return !!e && "DecimalLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclaration = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "FunctionDeclaration":
				case "VariableDeclaration":
				case "ClassDeclaration":
				case "ExportAllDeclaration":
				case "ExportDefaultDeclaration":
				case "ExportNamedDeclaration":
				case "ImportDeclaration":
				case "DeclareClass":
				case "DeclareFunction":
				case "DeclareInterface":
				case "DeclareModule":
				case "DeclareModuleExports":
				case "DeclareTypeAlias":
				case "DeclareOpaqueType":
				case "DeclareVariable":
				case "DeclareExportDeclaration":
				case "DeclareExportAllDeclaration":
				case "InterfaceDeclaration":
				case "OpaqueType":
				case "TypeAlias":
				case "EnumDeclaration":
				case "TSDeclareFunction":
				case "TSInterfaceDeclaration":
				case "TSTypeAliasDeclaration":
				case "TSEnumDeclaration":
				case "TSModuleDeclaration":
				case "TSImportEqualsDeclaration":
					break;
				case "Placeholder":
					if ("Declaration" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isDeclareClass = function (e, t) {
			return !!e && "DeclareClass" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareExportAllDeclaration = function (e, t) {
			return (
				!!e &&
				"DeclareExportAllDeclaration" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isDeclareExportDeclaration = function (e, t) {
			return (
				!!e && "DeclareExportDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isDeclareFunction = function (e, t) {
			return !!e && "DeclareFunction" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareInterface = function (e, t) {
			return !!e && "DeclareInterface" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareModule = function (e, t) {
			return !!e && "DeclareModule" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareModuleExports = function (e, t) {
			return !!e && "DeclareModuleExports" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareOpaqueType = function (e, t) {
			return !!e && "DeclareOpaqueType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareTypeAlias = function (e, t) {
			return !!e && "DeclareTypeAlias" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclareVariable = function (e, t) {
			return !!e && "DeclareVariable" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDeclaredPredicate = function (e, t) {
			return !!e && "DeclaredPredicate" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDecorator = function (e, t) {
			return !!e && "Decorator" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDirective = function (e, t) {
			return !!e && "Directive" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDirectiveLiteral = function (e, t) {
			return !!e && "DirectiveLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDoExpression = function (e, t) {
			return !!e && "DoExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isDoWhileStatement = function (e, t) {
			return !!e && "DoWhileStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEmptyStatement = function (e, t) {
			return !!e && "EmptyStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEmptyTypeAnnotation = function (e, t) {
			return !!e && "EmptyTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumBody = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "EnumBooleanBody":
				case "EnumNumberBody":
				case "EnumStringBody":
				case "EnumSymbolBody":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isEnumBooleanBody = function (e, t) {
			return !!e && "EnumBooleanBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumBooleanMember = function (e, t) {
			return !!e && "EnumBooleanMember" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumDeclaration = function (e, t) {
			return !!e && "EnumDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumDefaultedMember = function (e, t) {
			return !!e && "EnumDefaultedMember" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumMember = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "EnumBooleanMember":
				case "EnumNumberMember":
				case "EnumStringMember":
				case "EnumDefaultedMember":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isEnumNumberBody = function (e, t) {
			return !!e && "EnumNumberBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumNumberMember = function (e, t) {
			return !!e && "EnumNumberMember" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumStringBody = function (e, t) {
			return !!e && "EnumStringBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumStringMember = function (e, t) {
			return !!e && "EnumStringMember" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isEnumSymbolBody = function (e, t) {
			return !!e && "EnumSymbolBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isExistsTypeAnnotation = function (e, t) {
			return !!e && "ExistsTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isExportAllDeclaration = function (e, t) {
			return !!e && "ExportAllDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isExportDeclaration = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ExportAllDeclaration":
				case "ExportDefaultDeclaration":
				case "ExportNamedDeclaration":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isExportDefaultDeclaration = function (e, t) {
			return (
				!!e && "ExportDefaultDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isExportDefaultSpecifier = function (e, t) {
			return (
				!!e && "ExportDefaultSpecifier" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isExportNamedDeclaration = function (e, t) {
			return (
				!!e && "ExportNamedDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isExportNamespaceSpecifier = function (e, t) {
			return (
				!!e && "ExportNamespaceSpecifier" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isExportSpecifier = function (e, t) {
			return !!e && "ExportSpecifier" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isExpression = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ArrayExpression":
				case "AssignmentExpression":
				case "BinaryExpression":
				case "CallExpression":
				case "ConditionalExpression":
				case "FunctionExpression":
				case "Identifier":
				case "StringLiteral":
				case "NumericLiteral":
				case "NullLiteral":
				case "BooleanLiteral":
				case "RegExpLiteral":
				case "LogicalExpression":
				case "MemberExpression":
				case "NewExpression":
				case "ObjectExpression":
				case "SequenceExpression":
				case "ParenthesizedExpression":
				case "ThisExpression":
				case "UnaryExpression":
				case "UpdateExpression":
				case "ArrowFunctionExpression":
				case "ClassExpression":
				case "ImportExpression":
				case "MetaProperty":
				case "Super":
				case "TaggedTemplateExpression":
				case "TemplateLiteral":
				case "YieldExpression":
				case "AwaitExpression":
				case "Import":
				case "BigIntLiteral":
				case "OptionalMemberExpression":
				case "OptionalCallExpression":
				case "TypeCastExpression":
				case "JSXElement":
				case "JSXFragment":
				case "BindExpression":
				case "DoExpression":
				case "RecordExpression":
				case "TupleExpression":
				case "DecimalLiteral":
				case "ModuleExpression":
				case "TopicReference":
				case "PipelineTopicExpression":
				case "PipelineBareFunction":
				case "PipelinePrimaryTopicReference":
				case "TSInstantiationExpression":
				case "TSAsExpression":
				case "TSSatisfiesExpression":
				case "TSTypeAssertion":
				case "TSNonNullExpression":
					break;
				case "Placeholder":
					switch (e.expectedNode) {
						case "Expression":
						case "Identifier":
						case "StringLiteral":
							break;
						default:
							return !1;
					}
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isExpressionStatement = function (e, t) {
			return !!e && "ExpressionStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isExpressionWrapper = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ExpressionStatement":
				case "ParenthesizedExpression":
				case "TypeCastExpression":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFile = function (e, t) {
			return !!e && "File" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isFlow = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "AnyTypeAnnotation":
				case "ArrayTypeAnnotation":
				case "BooleanTypeAnnotation":
				case "BooleanLiteralTypeAnnotation":
				case "NullLiteralTypeAnnotation":
				case "ClassImplements":
				case "DeclareClass":
				case "DeclareFunction":
				case "DeclareInterface":
				case "DeclareModule":
				case "DeclareModuleExports":
				case "DeclareTypeAlias":
				case "DeclareOpaqueType":
				case "DeclareVariable":
				case "DeclareExportDeclaration":
				case "DeclareExportAllDeclaration":
				case "DeclaredPredicate":
				case "ExistsTypeAnnotation":
				case "FunctionTypeAnnotation":
				case "FunctionTypeParam":
				case "GenericTypeAnnotation":
				case "InferredPredicate":
				case "InterfaceExtends":
				case "InterfaceDeclaration":
				case "InterfaceTypeAnnotation":
				case "IntersectionTypeAnnotation":
				case "MixedTypeAnnotation":
				case "EmptyTypeAnnotation":
				case "NullableTypeAnnotation":
				case "NumberLiteralTypeAnnotation":
				case "NumberTypeAnnotation":
				case "ObjectTypeAnnotation":
				case "ObjectTypeInternalSlot":
				case "ObjectTypeCallProperty":
				case "ObjectTypeIndexer":
				case "ObjectTypeProperty":
				case "ObjectTypeSpreadProperty":
				case "OpaqueType":
				case "QualifiedTypeIdentifier":
				case "StringLiteralTypeAnnotation":
				case "StringTypeAnnotation":
				case "SymbolTypeAnnotation":
				case "ThisTypeAnnotation":
				case "TupleTypeAnnotation":
				case "TypeofTypeAnnotation":
				case "TypeAlias":
				case "TypeAnnotation":
				case "TypeCastExpression":
				case "TypeParameter":
				case "TypeParameterDeclaration":
				case "TypeParameterInstantiation":
				case "UnionTypeAnnotation":
				case "Variance":
				case "VoidTypeAnnotation":
				case "EnumDeclaration":
				case "EnumBooleanBody":
				case "EnumNumberBody":
				case "EnumStringBody":
				case "EnumSymbolBody":
				case "EnumBooleanMember":
				case "EnumNumberMember":
				case "EnumStringMember":
				case "EnumDefaultedMember":
				case "IndexedAccessType":
				case "OptionalIndexedAccessType":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFlowBaseAnnotation = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "AnyTypeAnnotation":
				case "BooleanTypeAnnotation":
				case "NullLiteralTypeAnnotation":
				case "MixedTypeAnnotation":
				case "EmptyTypeAnnotation":
				case "NumberTypeAnnotation":
				case "StringTypeAnnotation":
				case "SymbolTypeAnnotation":
				case "ThisTypeAnnotation":
				case "VoidTypeAnnotation":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFlowDeclaration = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "DeclareClass":
				case "DeclareFunction":
				case "DeclareInterface":
				case "DeclareModule":
				case "DeclareModuleExports":
				case "DeclareTypeAlias":
				case "DeclareOpaqueType":
				case "DeclareVariable":
				case "DeclareExportDeclaration":
				case "DeclareExportAllDeclaration":
				case "InterfaceDeclaration":
				case "OpaqueType":
				case "TypeAlias":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFlowPredicate = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "DeclaredPredicate":
				case "InferredPredicate":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFlowType = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "AnyTypeAnnotation":
				case "ArrayTypeAnnotation":
				case "BooleanTypeAnnotation":
				case "BooleanLiteralTypeAnnotation":
				case "NullLiteralTypeAnnotation":
				case "ExistsTypeAnnotation":
				case "FunctionTypeAnnotation":
				case "GenericTypeAnnotation":
				case "InterfaceTypeAnnotation":
				case "IntersectionTypeAnnotation":
				case "MixedTypeAnnotation":
				case "EmptyTypeAnnotation":
				case "NullableTypeAnnotation":
				case "NumberLiteralTypeAnnotation":
				case "NumberTypeAnnotation":
				case "ObjectTypeAnnotation":
				case "StringLiteralTypeAnnotation":
				case "StringTypeAnnotation":
				case "SymbolTypeAnnotation":
				case "ThisTypeAnnotation":
				case "TupleTypeAnnotation":
				case "TypeofTypeAnnotation":
				case "UnionTypeAnnotation":
				case "VoidTypeAnnotation":
				case "IndexedAccessType":
				case "OptionalIndexedAccessType":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFor = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ForInStatement":
				case "ForStatement":
				case "ForOfStatement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isForInStatement = function (e, t) {
			return !!e && "ForInStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isForOfStatement = function (e, t) {
			return !!e && "ForOfStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isForStatement = function (e, t) {
			return !!e && "ForStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isForXStatement = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ForInStatement":
				case "ForOfStatement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFunction = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "FunctionDeclaration":
				case "FunctionExpression":
				case "ObjectMethod":
				case "ArrowFunctionExpression":
				case "ClassMethod":
				case "ClassPrivateMethod":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFunctionDeclaration = function (e, t) {
			return !!e && "FunctionDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isFunctionExpression = function (e, t) {
			return !!e && "FunctionExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isFunctionParent = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "FunctionDeclaration":
				case "FunctionExpression":
				case "ObjectMethod":
				case "ArrowFunctionExpression":
				case "ClassMethod":
				case "ClassPrivateMethod":
				case "StaticBlock":
				case "TSModuleBlock":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isFunctionTypeAnnotation = function (e, t) {
			return (
				!!e && "FunctionTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isFunctionTypeParam = function (e, t) {
			return !!e && "FunctionTypeParam" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isGenericTypeAnnotation = function (e, t) {
			return !!e && "GenericTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isIdentifier = function (e, t) {
			return !!e && "Identifier" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isIfStatement = function (e, t) {
			return !!e && "IfStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isImmutable = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "StringLiteral":
				case "NumericLiteral":
				case "NullLiteral":
				case "BooleanLiteral":
				case "BigIntLiteral":
				case "JSXAttribute":
				case "JSXClosingElement":
				case "JSXElement":
				case "JSXExpressionContainer":
				case "JSXSpreadChild":
				case "JSXOpeningElement":
				case "JSXText":
				case "JSXFragment":
				case "JSXOpeningFragment":
				case "JSXClosingFragment":
				case "DecimalLiteral":
					break;
				case "Placeholder":
					if ("StringLiteral" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isImport = function (e, t) {
			return !!e && "Import" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isImportAttribute = function (e, t) {
			return !!e && "ImportAttribute" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isImportDeclaration = function (e, t) {
			return !!e && "ImportDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isImportDefaultSpecifier = function (e, t) {
			return (
				!!e && "ImportDefaultSpecifier" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isImportExpression = function (e, t) {
			return !!e && "ImportExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isImportNamespaceSpecifier = function (e, t) {
			return (
				!!e && "ImportNamespaceSpecifier" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isImportOrExportDeclaration = Ne),
		(r.isImportSpecifier = function (e, t) {
			return !!e && "ImportSpecifier" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isIndexedAccessType = function (e, t) {
			return !!e && "IndexedAccessType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isInferredPredicate = function (e, t) {
			return !!e && "InferredPredicate" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isInterfaceDeclaration = function (e, t) {
			return !!e && "InterfaceDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isInterfaceExtends = function (e, t) {
			return !!e && "InterfaceExtends" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isInterfaceTypeAnnotation = function (e, t) {
			return (
				!!e && "InterfaceTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isInterpreterDirective = function (e, t) {
			return !!e && "InterpreterDirective" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isIntersectionTypeAnnotation = function (e, t) {
			return (
				!!e &&
				"IntersectionTypeAnnotation" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isJSX = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "JSXAttribute":
				case "JSXClosingElement":
				case "JSXElement":
				case "JSXEmptyExpression":
				case "JSXExpressionContainer":
				case "JSXSpreadChild":
				case "JSXIdentifier":
				case "JSXMemberExpression":
				case "JSXNamespacedName":
				case "JSXOpeningElement":
				case "JSXSpreadAttribute":
				case "JSXText":
				case "JSXFragment":
				case "JSXOpeningFragment":
				case "JSXClosingFragment":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isJSXAttribute = function (e, t) {
			return !!e && "JSXAttribute" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXClosingElement = function (e, t) {
			return !!e && "JSXClosingElement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXClosingFragment = function (e, t) {
			return !!e && "JSXClosingFragment" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXElement = function (e, t) {
			return !!e && "JSXElement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXEmptyExpression = function (e, t) {
			return !!e && "JSXEmptyExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXExpressionContainer = function (e, t) {
			return (
				!!e && "JSXExpressionContainer" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isJSXFragment = function (e, t) {
			return !!e && "JSXFragment" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXIdentifier = function (e, t) {
			return !!e && "JSXIdentifier" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXMemberExpression = function (e, t) {
			return !!e && "JSXMemberExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXNamespacedName = function (e, t) {
			return !!e && "JSXNamespacedName" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXOpeningElement = function (e, t) {
			return !!e && "JSXOpeningElement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXOpeningFragment = function (e, t) {
			return !!e && "JSXOpeningFragment" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXSpreadAttribute = function (e, t) {
			return !!e && "JSXSpreadAttribute" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXSpreadChild = function (e, t) {
			return !!e && "JSXSpreadChild" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isJSXText = function (e, t) {
			return !!e && "JSXText" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isLVal = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "Identifier":
				case "MemberExpression":
				case "RestElement":
				case "AssignmentPattern":
				case "ArrayPattern":
				case "ObjectPattern":
				case "TSParameterProperty":
				case "TSAsExpression":
				case "TSSatisfiesExpression":
				case "TSTypeAssertion":
				case "TSNonNullExpression":
					break;
				case "Placeholder":
					switch (e.expectedNode) {
						case "Pattern":
						case "Identifier":
							break;
						default:
							return !1;
					}
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isLabeledStatement = function (e, t) {
			return !!e && "LabeledStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isLiteral = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "StringLiteral":
				case "NumericLiteral":
				case "NullLiteral":
				case "BooleanLiteral":
				case "RegExpLiteral":
				case "TemplateLiteral":
				case "BigIntLiteral":
				case "DecimalLiteral":
					break;
				case "Placeholder":
					if ("StringLiteral" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isLogicalExpression = function (e, t) {
			return !!e && "LogicalExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isLoop = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "DoWhileStatement":
				case "ForInStatement":
				case "ForStatement":
				case "WhileStatement":
				case "ForOfStatement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isMemberExpression = function (e, t) {
			return !!e && "MemberExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isMetaProperty = function (e, t) {
			return !!e && "MetaProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isMethod = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ObjectMethod":
				case "ClassMethod":
				case "ClassPrivateMethod":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isMiscellaneous = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "Noop":
				case "Placeholder":
				case "V8IntrinsicIdentifier":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isMixedTypeAnnotation = function (e, t) {
			return !!e && "MixedTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isModuleDeclaration = function (e, t) {
			return (0, De.default)("isModuleDeclaration", "isImportOrExportDeclaration"), Ne(e, t);
		}),
		(r.isModuleExpression = function (e, t) {
			return !!e && "ModuleExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isModuleSpecifier = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ExportSpecifier":
				case "ImportDefaultSpecifier":
				case "ImportNamespaceSpecifier":
				case "ImportSpecifier":
				case "ExportNamespaceSpecifier":
				case "ExportDefaultSpecifier":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isNewExpression = function (e, t) {
			return !!e && "NewExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isNoop = function (e, t) {
			return !!e && "Noop" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isNullLiteral = function (e, t) {
			return !!e && "NullLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isNullLiteralTypeAnnotation = function (e, t) {
			return (
				!!e && "NullLiteralTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isNullableTypeAnnotation = function (e, t) {
			return (
				!!e && "NullableTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isNumberLiteral = function (e, t) {
			return (
				(0, De.default)("isNumberLiteral", "isNumericLiteral"),
				!!e && "NumberLiteral" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isNumberLiteralTypeAnnotation = function (e, t) {
			return (
				!!e &&
				"NumberLiteralTypeAnnotation" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isNumberTypeAnnotation = function (e, t) {
			return !!e && "NumberTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isNumericLiteral = function (e, t) {
			return !!e && "NumericLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectExpression = function (e, t) {
			return !!e && "ObjectExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectMember = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ObjectMethod":
				case "ObjectProperty":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isObjectMethod = function (e, t) {
			return !!e && "ObjectMethod" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectPattern = function (e, t) {
			return !!e && "ObjectPattern" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectProperty = function (e, t) {
			return !!e && "ObjectProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectTypeAnnotation = function (e, t) {
			return !!e && "ObjectTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectTypeCallProperty = function (e, t) {
			return (
				!!e && "ObjectTypeCallProperty" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isObjectTypeIndexer = function (e, t) {
			return !!e && "ObjectTypeIndexer" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectTypeInternalSlot = function (e, t) {
			return (
				!!e && "ObjectTypeInternalSlot" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isObjectTypeProperty = function (e, t) {
			return !!e && "ObjectTypeProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isObjectTypeSpreadProperty = function (e, t) {
			return (
				!!e && "ObjectTypeSpreadProperty" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isOpaqueType = function (e, t) {
			return !!e && "OpaqueType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isOptionalCallExpression = function (e, t) {
			return (
				!!e && "OptionalCallExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isOptionalIndexedAccessType = function (e, t) {
			return (
				!!e && "OptionalIndexedAccessType" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isOptionalMemberExpression = function (e, t) {
			return (
				!!e && "OptionalMemberExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isParenthesizedExpression = function (e, t) {
			return (
				!!e && "ParenthesizedExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isPattern = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "AssignmentPattern":
				case "ArrayPattern":
				case "ObjectPattern":
					break;
				case "Placeholder":
					if ("Pattern" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isPatternLike = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "Identifier":
				case "RestElement":
				case "AssignmentPattern":
				case "ArrayPattern":
				case "ObjectPattern":
				case "TSAsExpression":
				case "TSSatisfiesExpression":
				case "TSTypeAssertion":
				case "TSNonNullExpression":
					break;
				case "Placeholder":
					switch (e.expectedNode) {
						case "Pattern":
						case "Identifier":
							break;
						default:
							return !1;
					}
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isPipelineBareFunction = function (e, t) {
			return !!e && "PipelineBareFunction" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isPipelinePrimaryTopicReference = function (e, t) {
			return (
				!!e &&
				"PipelinePrimaryTopicReference" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isPipelineTopicExpression = function (e, t) {
			return (
				!!e && "PipelineTopicExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isPlaceholder = function (e, t) {
			return !!e && "Placeholder" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isPrivate = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ClassPrivateProperty":
				case "ClassPrivateMethod":
				case "PrivateName":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isPrivateName = function (e, t) {
			return !!e && "PrivateName" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isProgram = function (e, t) {
			return !!e && "Program" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isProperty = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ObjectProperty":
				case "ClassProperty":
				case "ClassAccessorProperty":
				case "ClassPrivateProperty":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isPureish = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "FunctionDeclaration":
				case "FunctionExpression":
				case "StringLiteral":
				case "NumericLiteral":
				case "NullLiteral":
				case "BooleanLiteral":
				case "RegExpLiteral":
				case "ArrowFunctionExpression":
				case "BigIntLiteral":
				case "DecimalLiteral":
					break;
				case "Placeholder":
					if ("StringLiteral" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isQualifiedTypeIdentifier = function (e, t) {
			return (
				!!e && "QualifiedTypeIdentifier" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isRecordExpression = function (e, t) {
			return !!e && "RecordExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isRegExpLiteral = function (e, t) {
			return !!e && "RegExpLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isRegexLiteral = function (e, t) {
			return (
				(0, De.default)("isRegexLiteral", "isRegExpLiteral"),
				!!e && "RegexLiteral" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isRestElement = function (e, t) {
			return !!e && "RestElement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isRestProperty = function (e, t) {
			return (
				(0, De.default)("isRestProperty", "isRestElement"),
				!!e && "RestProperty" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isReturnStatement = function (e, t) {
			return !!e && "ReturnStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isScopable = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BlockStatement":
				case "CatchClause":
				case "DoWhileStatement":
				case "ForInStatement":
				case "ForStatement":
				case "FunctionDeclaration":
				case "FunctionExpression":
				case "Program":
				case "ObjectMethod":
				case "SwitchStatement":
				case "WhileStatement":
				case "ArrowFunctionExpression":
				case "ClassExpression":
				case "ClassDeclaration":
				case "ForOfStatement":
				case "ClassMethod":
				case "ClassPrivateMethod":
				case "StaticBlock":
				case "TSModuleBlock":
					break;
				case "Placeholder":
					if ("BlockStatement" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isSequenceExpression = function (e, t) {
			return !!e && "SequenceExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isSpreadElement = function (e, t) {
			return !!e && "SpreadElement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isSpreadProperty = function (e, t) {
			return (
				(0, De.default)("isSpreadProperty", "isSpreadElement"),
				!!e && "SpreadProperty" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isStandardized = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ArrayExpression":
				case "AssignmentExpression":
				case "BinaryExpression":
				case "InterpreterDirective":
				case "Directive":
				case "DirectiveLiteral":
				case "BlockStatement":
				case "BreakStatement":
				case "CallExpression":
				case "CatchClause":
				case "ConditionalExpression":
				case "ContinueStatement":
				case "DebuggerStatement":
				case "DoWhileStatement":
				case "EmptyStatement":
				case "ExpressionStatement":
				case "File":
				case "ForInStatement":
				case "ForStatement":
				case "FunctionDeclaration":
				case "FunctionExpression":
				case "Identifier":
				case "IfStatement":
				case "LabeledStatement":
				case "StringLiteral":
				case "NumericLiteral":
				case "NullLiteral":
				case "BooleanLiteral":
				case "RegExpLiteral":
				case "LogicalExpression":
				case "MemberExpression":
				case "NewExpression":
				case "Program":
				case "ObjectExpression":
				case "ObjectMethod":
				case "ObjectProperty":
				case "RestElement":
				case "ReturnStatement":
				case "SequenceExpression":
				case "ParenthesizedExpression":
				case "SwitchCase":
				case "SwitchStatement":
				case "ThisExpression":
				case "ThrowStatement":
				case "TryStatement":
				case "UnaryExpression":
				case "UpdateExpression":
				case "VariableDeclaration":
				case "VariableDeclarator":
				case "WhileStatement":
				case "WithStatement":
				case "AssignmentPattern":
				case "ArrayPattern":
				case "ArrowFunctionExpression":
				case "ClassBody":
				case "ClassExpression":
				case "ClassDeclaration":
				case "ExportAllDeclaration":
				case "ExportDefaultDeclaration":
				case "ExportNamedDeclaration":
				case "ExportSpecifier":
				case "ForOfStatement":
				case "ImportDeclaration":
				case "ImportDefaultSpecifier":
				case "ImportNamespaceSpecifier":
				case "ImportSpecifier":
				case "ImportExpression":
				case "MetaProperty":
				case "ClassMethod":
				case "ObjectPattern":
				case "SpreadElement":
				case "Super":
				case "TaggedTemplateExpression":
				case "TemplateElement":
				case "TemplateLiteral":
				case "YieldExpression":
				case "AwaitExpression":
				case "Import":
				case "BigIntLiteral":
				case "ExportNamespaceSpecifier":
				case "OptionalMemberExpression":
				case "OptionalCallExpression":
				case "ClassProperty":
				case "ClassAccessorProperty":
				case "ClassPrivateProperty":
				case "ClassPrivateMethod":
				case "PrivateName":
				case "StaticBlock":
					break;
				case "Placeholder":
					switch (e.expectedNode) {
						case "Identifier":
						case "StringLiteral":
						case "BlockStatement":
						case "ClassBody":
							break;
						default:
							return !1;
					}
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isStatement = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BlockStatement":
				case "BreakStatement":
				case "ContinueStatement":
				case "DebuggerStatement":
				case "DoWhileStatement":
				case "EmptyStatement":
				case "ExpressionStatement":
				case "ForInStatement":
				case "ForStatement":
				case "FunctionDeclaration":
				case "IfStatement":
				case "LabeledStatement":
				case "ReturnStatement":
				case "SwitchStatement":
				case "ThrowStatement":
				case "TryStatement":
				case "VariableDeclaration":
				case "WhileStatement":
				case "WithStatement":
				case "ClassDeclaration":
				case "ExportAllDeclaration":
				case "ExportDefaultDeclaration":
				case "ExportNamedDeclaration":
				case "ForOfStatement":
				case "ImportDeclaration":
				case "DeclareClass":
				case "DeclareFunction":
				case "DeclareInterface":
				case "DeclareModule":
				case "DeclareModuleExports":
				case "DeclareTypeAlias":
				case "DeclareOpaqueType":
				case "DeclareVariable":
				case "DeclareExportDeclaration":
				case "DeclareExportAllDeclaration":
				case "InterfaceDeclaration":
				case "OpaqueType":
				case "TypeAlias":
				case "EnumDeclaration":
				case "TSDeclareFunction":
				case "TSInterfaceDeclaration":
				case "TSTypeAliasDeclaration":
				case "TSEnumDeclaration":
				case "TSModuleDeclaration":
				case "TSImportEqualsDeclaration":
				case "TSExportAssignment":
				case "TSNamespaceExportDeclaration":
					break;
				case "Placeholder":
					switch (e.expectedNode) {
						case "Statement":
						case "Declaration":
						case "BlockStatement":
							break;
						default:
							return !1;
					}
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isStaticBlock = function (e, t) {
			return !!e && "StaticBlock" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isStringLiteral = function (e, t) {
			return !!e && "StringLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isStringLiteralTypeAnnotation = function (e, t) {
			return (
				!!e &&
				"StringLiteralTypeAnnotation" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isStringTypeAnnotation = function (e, t) {
			return !!e && "StringTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isSuper = function (e, t) {
			return !!e && "Super" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isSwitchCase = function (e, t) {
			return !!e && "SwitchCase" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isSwitchStatement = function (e, t) {
			return !!e && "SwitchStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isSymbolTypeAnnotation = function (e, t) {
			return !!e && "SymbolTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSAnyKeyword = function (e, t) {
			return !!e && "TSAnyKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSArrayType = function (e, t) {
			return !!e && "TSArrayType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSAsExpression = function (e, t) {
			return !!e && "TSAsExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSBaseType = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "TSAnyKeyword":
				case "TSBooleanKeyword":
				case "TSBigIntKeyword":
				case "TSIntrinsicKeyword":
				case "TSNeverKeyword":
				case "TSNullKeyword":
				case "TSNumberKeyword":
				case "TSObjectKeyword":
				case "TSStringKeyword":
				case "TSSymbolKeyword":
				case "TSUndefinedKeyword":
				case "TSUnknownKeyword":
				case "TSVoidKeyword":
				case "TSThisType":
				case "TSTemplateLiteralType":
				case "TSLiteralType":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isTSBigIntKeyword = function (e, t) {
			return !!e && "TSBigIntKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSBooleanKeyword = function (e, t) {
			return !!e && "TSBooleanKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSCallSignatureDeclaration = function (e, t) {
			return (
				!!e &&
				"TSCallSignatureDeclaration" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSConditionalType = function (e, t) {
			return !!e && "TSConditionalType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSConstructSignatureDeclaration = function (e, t) {
			return (
				!!e &&
				"TSConstructSignatureDeclaration" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSConstructorType = function (e, t) {
			return !!e && "TSConstructorType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSDeclareFunction = function (e, t) {
			return !!e && "TSDeclareFunction" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSDeclareMethod = function (e, t) {
			return !!e && "TSDeclareMethod" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSEntityName = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "Identifier":
				case "TSQualifiedName":
					break;
				case "Placeholder":
					if ("Identifier" === e.expectedNode) break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isTSEnumBody = function (e, t) {
			return !!e && "TSEnumBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSEnumDeclaration = function (e, t) {
			return !!e && "TSEnumDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSEnumMember = function (e, t) {
			return !!e && "TSEnumMember" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSExportAssignment = function (e, t) {
			return !!e && "TSExportAssignment" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSExpressionWithTypeArguments = function (e, t) {
			return (
				!!e &&
				"TSExpressionWithTypeArguments" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSExternalModuleReference = function (e, t) {
			return (
				!!e && "TSExternalModuleReference" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSFunctionType = function (e, t) {
			return !!e && "TSFunctionType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSImportEqualsDeclaration = function (e, t) {
			return (
				!!e && "TSImportEqualsDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSImportType = function (e, t) {
			return !!e && "TSImportType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSIndexSignature = function (e, t) {
			return !!e && "TSIndexSignature" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSIndexedAccessType = function (e, t) {
			return !!e && "TSIndexedAccessType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSInferType = function (e, t) {
			return !!e && "TSInferType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSInstantiationExpression = function (e, t) {
			return (
				!!e && "TSInstantiationExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSInterfaceBody = function (e, t) {
			return !!e && "TSInterfaceBody" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSInterfaceDeclaration = function (e, t) {
			return (
				!!e && "TSInterfaceDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSIntersectionType = function (e, t) {
			return !!e && "TSIntersectionType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSIntrinsicKeyword = function (e, t) {
			return !!e && "TSIntrinsicKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSLiteralType = function (e, t) {
			return !!e && "TSLiteralType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSMappedType = function (e, t) {
			return !!e && "TSMappedType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSMethodSignature = function (e, t) {
			return !!e && "TSMethodSignature" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSModuleBlock = function (e, t) {
			return !!e && "TSModuleBlock" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSModuleDeclaration = function (e, t) {
			return !!e && "TSModuleDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSNamedTupleMember = function (e, t) {
			return !!e && "TSNamedTupleMember" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSNamespaceExportDeclaration = function (e, t) {
			return (
				!!e &&
				"TSNamespaceExportDeclaration" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSNeverKeyword = function (e, t) {
			return !!e && "TSNeverKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSNonNullExpression = function (e, t) {
			return !!e && "TSNonNullExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSNullKeyword = function (e, t) {
			return !!e && "TSNullKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSNumberKeyword = function (e, t) {
			return !!e && "TSNumberKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSObjectKeyword = function (e, t) {
			return !!e && "TSObjectKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSOptionalType = function (e, t) {
			return !!e && "TSOptionalType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSParameterProperty = function (e, t) {
			return !!e && "TSParameterProperty" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSParenthesizedType = function (e, t) {
			return !!e && "TSParenthesizedType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSPropertySignature = function (e, t) {
			return !!e && "TSPropertySignature" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSQualifiedName = function (e, t) {
			return !!e && "TSQualifiedName" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSRestType = function (e, t) {
			return !!e && "TSRestType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSSatisfiesExpression = function (e, t) {
			return !!e && "TSSatisfiesExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSStringKeyword = function (e, t) {
			return !!e && "TSStringKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSSymbolKeyword = function (e, t) {
			return !!e && "TSSymbolKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTemplateLiteralType = function (e, t) {
			return !!e && "TSTemplateLiteralType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSThisType = function (e, t) {
			return !!e && "TSThisType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTupleType = function (e, t) {
			return !!e && "TSTupleType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSType = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "TSAnyKeyword":
				case "TSBooleanKeyword":
				case "TSBigIntKeyword":
				case "TSIntrinsicKeyword":
				case "TSNeverKeyword":
				case "TSNullKeyword":
				case "TSNumberKeyword":
				case "TSObjectKeyword":
				case "TSStringKeyword":
				case "TSSymbolKeyword":
				case "TSUndefinedKeyword":
				case "TSUnknownKeyword":
				case "TSVoidKeyword":
				case "TSThisType":
				case "TSFunctionType":
				case "TSConstructorType":
				case "TSTypeReference":
				case "TSTypePredicate":
				case "TSTypeQuery":
				case "TSTypeLiteral":
				case "TSArrayType":
				case "TSTupleType":
				case "TSOptionalType":
				case "TSRestType":
				case "TSUnionType":
				case "TSIntersectionType":
				case "TSConditionalType":
				case "TSInferType":
				case "TSParenthesizedType":
				case "TSTypeOperator":
				case "TSIndexedAccessType":
				case "TSMappedType":
				case "TSTemplateLiteralType":
				case "TSLiteralType":
				case "TSExpressionWithTypeArguments":
				case "TSImportType":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isTSTypeAliasDeclaration = function (e, t) {
			return (
				!!e && "TSTypeAliasDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSTypeAnnotation = function (e, t) {
			return !!e && "TSTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeAssertion = function (e, t) {
			return !!e && "TSTypeAssertion" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeElement = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "TSCallSignatureDeclaration":
				case "TSConstructSignatureDeclaration":
				case "TSPropertySignature":
				case "TSMethodSignature":
				case "TSIndexSignature":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isTSTypeLiteral = function (e, t) {
			return !!e && "TSTypeLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeOperator = function (e, t) {
			return !!e && "TSTypeOperator" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeParameter = function (e, t) {
			return !!e && "TSTypeParameter" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeParameterDeclaration = function (e, t) {
			return (
				!!e &&
				"TSTypeParameterDeclaration" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSTypeParameterInstantiation = function (e, t) {
			return (
				!!e &&
				"TSTypeParameterInstantiation" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTSTypePredicate = function (e, t) {
			return !!e && "TSTypePredicate" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeQuery = function (e, t) {
			return !!e && "TSTypeQuery" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSTypeReference = function (e, t) {
			return !!e && "TSTypeReference" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSUndefinedKeyword = function (e, t) {
			return !!e && "TSUndefinedKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSUnionType = function (e, t) {
			return !!e && "TSUnionType" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSUnknownKeyword = function (e, t) {
			return !!e && "TSUnknownKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTSVoidKeyword = function (e, t) {
			return !!e && "TSVoidKeyword" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTaggedTemplateExpression = function (e, t) {
			return (
				!!e && "TaggedTemplateExpression" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTemplateElement = function (e, t) {
			return !!e && "TemplateElement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTemplateLiteral = function (e, t) {
			return !!e && "TemplateLiteral" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTerminatorless = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "BreakStatement":
				case "ContinueStatement":
				case "ReturnStatement":
				case "ThrowStatement":
				case "YieldExpression":
				case "AwaitExpression":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isThisExpression = function (e, t) {
			return !!e && "ThisExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isThisTypeAnnotation = function (e, t) {
			return !!e && "ThisTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isThrowStatement = function (e, t) {
			return !!e && "ThrowStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTopicReference = function (e, t) {
			return !!e && "TopicReference" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTryStatement = function (e, t) {
			return !!e && "TryStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTupleExpression = function (e, t) {
			return !!e && "TupleExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTupleTypeAnnotation = function (e, t) {
			return !!e && "TupleTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTypeAlias = function (e, t) {
			return !!e && "TypeAlias" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTypeAnnotation = function (e, t) {
			return !!e && "TypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTypeCastExpression = function (e, t) {
			return !!e && "TypeCastExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTypeParameter = function (e, t) {
			return !!e && "TypeParameter" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isTypeParameterDeclaration = function (e, t) {
			return (
				!!e && "TypeParameterDeclaration" === e.type && (null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTypeParameterInstantiation = function (e, t) {
			return (
				!!e &&
				"TypeParameterInstantiation" === e.type &&
				(null == t || (0, a.default)(e, t))
			);
		}),
		(r.isTypeScript = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "TSParameterProperty":
				case "TSDeclareFunction":
				case "TSDeclareMethod":
				case "TSQualifiedName":
				case "TSCallSignatureDeclaration":
				case "TSConstructSignatureDeclaration":
				case "TSPropertySignature":
				case "TSMethodSignature":
				case "TSIndexSignature":
				case "TSAnyKeyword":
				case "TSBooleanKeyword":
				case "TSBigIntKeyword":
				case "TSIntrinsicKeyword":
				case "TSNeverKeyword":
				case "TSNullKeyword":
				case "TSNumberKeyword":
				case "TSObjectKeyword":
				case "TSStringKeyword":
				case "TSSymbolKeyword":
				case "TSUndefinedKeyword":
				case "TSUnknownKeyword":
				case "TSVoidKeyword":
				case "TSThisType":
				case "TSFunctionType":
				case "TSConstructorType":
				case "TSTypeReference":
				case "TSTypePredicate":
				case "TSTypeQuery":
				case "TSTypeLiteral":
				case "TSArrayType":
				case "TSTupleType":
				case "TSOptionalType":
				case "TSRestType":
				case "TSNamedTupleMember":
				case "TSUnionType":
				case "TSIntersectionType":
				case "TSConditionalType":
				case "TSInferType":
				case "TSParenthesizedType":
				case "TSTypeOperator":
				case "TSIndexedAccessType":
				case "TSMappedType":
				case "TSTemplateLiteralType":
				case "TSLiteralType":
				case "TSExpressionWithTypeArguments":
				case "TSInterfaceDeclaration":
				case "TSInterfaceBody":
				case "TSTypeAliasDeclaration":
				case "TSInstantiationExpression":
				case "TSAsExpression":
				case "TSSatisfiesExpression":
				case "TSTypeAssertion":
				case "TSEnumBody":
				case "TSEnumDeclaration":
				case "TSEnumMember":
				case "TSModuleDeclaration":
				case "TSModuleBlock":
				case "TSImportType":
				case "TSImportEqualsDeclaration":
				case "TSExternalModuleReference":
				case "TSNonNullExpression":
				case "TSExportAssignment":
				case "TSNamespaceExportDeclaration":
				case "TSTypeAnnotation":
				case "TSTypeParameterInstantiation":
				case "TSTypeParameterDeclaration":
				case "TSTypeParameter":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isTypeofTypeAnnotation = function (e, t) {
			return !!e && "TypeofTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isUnaryExpression = function (e, t) {
			return !!e && "UnaryExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isUnaryLike = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "UnaryExpression":
				case "SpreadElement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isUnionTypeAnnotation = function (e, t) {
			return !!e && "UnionTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isUpdateExpression = function (e, t) {
			return !!e && "UpdateExpression" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isUserWhitespacable = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "ObjectMethod":
				case "ObjectProperty":
				case "ObjectTypeInternalSlot":
				case "ObjectTypeCallProperty":
				case "ObjectTypeIndexer":
				case "ObjectTypeProperty":
				case "ObjectTypeSpreadProperty":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isV8IntrinsicIdentifier = function (e, t) {
			return !!e && "V8IntrinsicIdentifier" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isVariableDeclaration = function (e, t) {
			return !!e && "VariableDeclaration" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isVariableDeclarator = function (e, t) {
			return !!e && "VariableDeclarator" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isVariance = function (e, t) {
			return !!e && "Variance" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isVoidTypeAnnotation = function (e, t) {
			return !!e && "VoidTypeAnnotation" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isWhile = function (e, t) {
			if (!e) return !1;
			switch (e.type) {
				case "DoWhileStatement":
				case "WhileStatement":
					break;
				default:
					return !1;
			}
			return null == t || (0, a.default)(e, t);
		}),
		(r.isWhileStatement = function (e, t) {
			return !!e && "WhileStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isWithStatement = function (e, t) {
			return !!e && "WithStatement" === e.type && (null == t || (0, a.default)(e, t));
		}),
		(r.isYieldExpression = function (e, t) {
			return !!e && "YieldExpression" === e.type && (null == t || (0, a.default)(e, t));
		});
	var a = _e,
		De = Ie;
	function Ne(e, t) {
		if (!e) return !1;
		switch (e.type) {
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ImportDeclaration":
				break;
			default:
				return !1;
		}
		return null == t || (0, a.default)(e, t);
	}
	Object.defineProperty(Oe, "__esModule", { value: !0 }),
		(Oe.default = function (e, t, n) {
			if (!(0, we.isMemberExpression)(e)) return !1;
			let r = Array.isArray(t) ? t : t.split("."),
				i = [],
				a;
			for (a = e; (0, we.isMemberExpression)(a); a = a.object) i.push(a.property);
			if ((i.push(a), i.length < r.length)) return !1;
			if (!n && i.length > r.length) return !1;
			for (let t = 0, n = i.length - 1; t < r.length; t++, n--) {
				var o = i[n];
				let e;
				if ((0, we.isIdentifier)(o)) e = o.name;
				else if ((0, we.isStringLiteral)(o)) e = o.value;
				else {
					if (!(0, we.isThisExpression)(o)) return !1;
					e = "this";
				}
				if (r[t] !== e) return !1;
			}
			return !0;
		});
	var we = r;
	Object.defineProperty(Ae, "__esModule", { value: !0 }),
		(Ae.default = function (e, t) {
			let n = e.split(".");
			return e => (0, je.default)(e, n, t);
		});
	var je = Oe;
	Object.defineProperty(n, "__esModule", { value: !0 });
	var ke = ((n.default = void 0), Ae.default)("React.Component"),
		ke = ((n.default = ke), {});
	Object.defineProperty(ke, "__esModule", { value: !0 }),
		(ke.default = function (e) {
			return !!e && /^[a-z]/.test(e);
		});
	var Le = {},
		o = {},
		s = {},
		l = {},
		Me = {},
		Be = {},
		p = {},
		Fe = {},
		Re = {},
		Ke =
			(Object.defineProperty(Re, "__esModule", { value: !0 }),
			(Re.default = function (e, t) {
				if (e === t) return !0;
				if (null != e && !Ke.ALIAS_KEYS[t]) {
					t = Ke.FLIPPED_ALIAS_KEYS[t];
					if (t) {
						if (t[0] === e) return !0;
						for (var n of t) if (e === n) return !0;
					}
				}
				return !1;
			}),
			Be);
	var Ye = {},
		Ve =
			(Object.defineProperty(Ye, "__esModule", { value: !0 }),
			(Ye.default = function (e, t) {
				if (e === t) return !0;
				e = Ve.PLACEHOLDERS_ALIAS[e];
				if (e) for (var n of e) if (t === n) return !0;
				return !1;
			}),
			Be);
	Object.defineProperty(Fe, "__esModule", { value: !0 }),
		(Fe.default = function (e, t, n) {
			if (!t) return !1;
			var r = (0, Xe.default)(t.type, e);
			if (!r)
				return (
					!n &&
					"Placeholder" === t.type &&
					e in Ue.FLIPPED_ALIAS_KEYS &&
					(0, qe.default)(t.expectedNode, e)
				);
			return void 0 === n || (0, Je.default)(t, n);
		});
	var Je = _e,
		Xe = Re,
		qe = Ye,
		Ue = Be;
	var We = {},
		Ge = {},
		u = {},
		c =
			(Object.defineProperty(u, "__esModule", { value: !0 }),
			(u.isIdentifierChar = tt),
			(u.isIdentifierName = function (n) {
				let r = !0;
				for (let t = 0; t < n.length; t++) {
					let e = n.charCodeAt(t);
					var i;
					if (
						(55296 == (64512 & e) &&
							t + 1 < n.length &&
							56320 == (64512 & (i = n.charCodeAt(++t))) &&
							(e = 65536 + ((1023 & e) << 10) + (1023 & i)),
						r)
					) {
						if (((r = !1), !et(e))) return !1;
					} else if (!tt(e)) return !1;
				}
				return !r;
			}),
			(u.isIdentifierStart = et),
			"ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ");
	let ze = new RegExp("[" + c + "]"),
		He = new RegExp(
			"[" +
				c +
				"·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･]"
		),
		$e =
			((c = null),
			[
				0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31,
				14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13,
				10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25,
				5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1,
				11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2,
				27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22,
				251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1,
				3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0,
				36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2,
				6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45,
				52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0,
				72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7,
				3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32,
				8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328,
				18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18,
				5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32,
				20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237,
				42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6,
				12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64,
				2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24,
				2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44,
				11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2,
				196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0,
				5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3,
				2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7,
				221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191
			]),
		Qe = [
			509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9,
			7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10,
			8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0,
			3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2,
			0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28,
			1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3,
			2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9,
			54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2,
			4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9,
			87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178,
			9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9,
			0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0,
			62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239
		];
	function Ze(n, r) {
		let i = 65536;
		for (let e = 0, t = r.length; e < t; e += 2) {
			if ((i += r[e]) > n) return !1;
			if ((i += r[e + 1]) >= n) return !0;
		}
		return !1;
	}
	function et(e) {
		return e < 65
			? 36 === e
			: e <= 90 ||
					(e < 97
						? 95 === e
						: e <= 122 ||
							(e <= 65535 ? 170 <= e && ze.test(String.fromCharCode(e)) : Ze(e, $e)));
	}
	function tt(e) {
		return e < 48
			? 36 === e
			: e < 58 ||
					(!(e < 65) &&
						(e <= 90 ||
							(e < 97
								? 95 === e
								: e <= 122 ||
									(e <= 65535
										? 170 <= e && He.test(String.fromCharCode(e))
										: Ze(e, $e) || Ze(e, Qe)))));
	}
	var nt,
		rt,
		c = {};
	Object.defineProperty(c, "__esModule", { value: !0 }),
		(c.isKeyword = function (e) {
			return st.has(e);
		}),
		(c.isReservedWord = ut),
		(c.isStrictBindOnlyReservedWord = dt),
		(c.isStrictBindReservedWord = function (e, t) {
			return ct(e, t) || dt(e);
		}),
		(c.isStrictReservedWord = ct);
	const it = [
			"break",
			"case",
			"catch",
			"continue",
			"debugger",
			"default",
			"do",
			"else",
			"finally",
			"for",
			"function",
			"if",
			"return",
			"switch",
			"throw",
			"try",
			"var",
			"const",
			"while",
			"with",
			"new",
			"this",
			"super",
			"class",
			"extends",
			"export",
			"import",
			"null",
			"true",
			"false",
			"in",
			"instanceof",
			"typeof",
			"void",
			"delete"
		],
		at = [
			"implements",
			"interface",
			"let",
			"package",
			"private",
			"protected",
			"public",
			"static",
			"yield"
		],
		ot = ["eval", "arguments"];
	let st = new Set(it),
		lt = new Set(at),
		pt = new Set(ot);
	function ut(e, t) {
		return (t && "await" === e) || "enum" === e;
	}
	function ct(e, t) {
		return ut(e, t) || lt.has(e);
	}
	function dt(e) {
		return pt.has(e);
	}
	(d = Ge),
		Object.defineProperty(d, "__esModule", { value: !0 }),
		Object.defineProperty(d, "isIdentifierChar", {
			enumerable: !0,
			get: function () {
				return nt.isIdentifierChar;
			}
		}),
		Object.defineProperty(d, "isIdentifierName", {
			enumerable: !0,
			get: function () {
				return nt.isIdentifierName;
			}
		}),
		Object.defineProperty(d, "isIdentifierStart", {
			enumerable: !0,
			get: function () {
				return nt.isIdentifierStart;
			}
		}),
		Object.defineProperty(d, "isKeyword", {
			enumerable: !0,
			get: function () {
				return rt.isKeyword;
			}
		}),
		Object.defineProperty(d, "isReservedWord", {
			enumerable: !0,
			get: function () {
				return rt.isReservedWord;
			}
		}),
		Object.defineProperty(d, "isStrictBindOnlyReservedWord", {
			enumerable: !0,
			get: function () {
				return rt.isStrictBindOnlyReservedWord;
			}
		}),
		Object.defineProperty(d, "isStrictBindReservedWord", {
			enumerable: !0,
			get: function () {
				return rt.isStrictBindReservedWord;
			}
		}),
		Object.defineProperty(d, "isStrictReservedWord", {
			enumerable: !0,
			get: function () {
				return rt.isStrictReservedWord;
			}
		}),
		(nt = u),
		(rt = c),
		Object.defineProperty(We, "__esModule", { value: !0 }),
		(We.default = function (e, t = !0) {
			if ("string" != typeof e) return !1;
			if (t && ((0, ft.isKeyword)(e) || (0, ft.isStrictReservedWord)(e, !0))) return !1;
			return (0, ft.isIdentifierName)(e);
		});
	var ft = Ge;
	var d = {},
		yt =
			(Object.defineProperty(d, "__esModule", { value: !0 }),
			(d.readCodePoint = bt),
			(d.readInt = St),
			(d.readStringContents = function (e, t, n, r, i, a) {
				let o = n,
					s = r,
					l = i,
					p = "",
					u = null,
					c = n,
					d = t.length;
				for (;;) {
					if (n >= d) {
						a.unterminated(o, s, l), (p += t.slice(c, n));
						break;
					}
					var f,
						y = t.charCodeAt(n);
					if (
						((e, t, n, r) =>
							"template" !== e
								? t === ("double" === e ? 34 : 39)
								: 96 === t || (36 === t && 123 === n.charCodeAt(r + 1)))(e, y, t, n)
					) {
						p += t.slice(c, n);
						break;
					}
					92 === y
						? ((p += t.slice(c, n)),
							null !==
								(f = ((n, r, i, a, o, s) => {
									var e,
										t = !o,
										l =
											(r++,
											e => ({ pos: r, ch: e, lineStart: i, curLine: a })),
										p = n.charCodeAt(r++);
									switch (p) {
										case 110:
											return l("\n");
										case 114:
											return l("\r");
										case 120:
											return (
												({ code: e, pos: r } = ht(n, r, i, a, 2, !1, t, s)),
												l(null === e ? null : String.fromCharCode(e))
											);
										case 117:
											return (
												({ code: e, pos: r } = bt(n, r, i, a, t, s)),
												l(null === e ? null : String.fromCodePoint(e))
											);
										case 116:
											return l("\t");
										case 98:
											return l("\b");
										case 118:
											return l("\v");
										case 102:
											return l("\f");
										case 13:
											10 === n.charCodeAt(r) && ++r;
										case 10:
											(i = r), ++a;
										case 8232:
										case 8233:
											return l("");
										case 56:
										case 57:
											if (o) return l(null);
											s.strictNumericEscape(r - 1, i, a);
										default:
											if (48 <= p && p <= 55) {
												var u = r - 1;
												let e = /^[0-7]+/.exec(n.slice(u, r + 2))[0],
													t = parseInt(e, 8);
												255 < t &&
													((e = e.slice(0, -1)), (t = parseInt(e, 8))),
													(r += e.length - 1);
												var c = n.charCodeAt(r);
												if ("0" !== e || 56 === c || 57 === c) {
													if (o) return l(null);
													s.strictNumericEscape(u, i, a);
												}
												return l(String.fromCharCode(t));
											}
											return l(String.fromCharCode(p));
									}
								})(t, n, r, i, "template" === e, a)).ch || u
								? (p += f.ch)
								: (u = { pos: n, lineStart: r, curLine: i }),
							({ pos: n, lineStart: r, curLine: i } = f),
							(c = n))
						: 8232 === y || 8233 === y
							? (++i, (r = ++n))
							: 10 === y || 13 === y
								? "template" === e
									? ((p += t.slice(c, n) + "\n"),
										++n,
										13 === y && 10 === t.charCodeAt(n) && ++n,
										++i,
										(c = r = n))
									: a.unterminated(o, s, l)
								: ++n;
				}
				return {
					pos: n,
					str: p,
					firstInvalidLoc: u,
					lineStart: r,
					curLine: i,
					containsInvalid: !!u
				};
			}),
			function (e) {
				return 48 <= e && e <= 57;
			});
	let mt = {
			decBinOct: new Set([46, 66, 69, 79, 95, 98, 101, 111]),
			hex: new Set([46, 88, 95, 120])
		},
		Tt = {
			bin: e => 48 === e || 49 === e,
			oct: e => 48 <= e && e <= 55,
			dec: e => 48 <= e && e <= 57,
			hex: e => (48 <= e && e <= 57) || (65 <= e && e <= 70) || (97 <= e && e <= 102)
		};
	function ht(e, t, n, r, i, a, o, s) {
		var l = t;
		return (
			({ n: e, pos: t } = St(e, t, n, r, 16, i, a, !1, s, !o)),
			null === e && (o ? s.invalidEscapeSequence(l, n, r) : (t = l - 1)),
			{ code: e, pos: t }
		);
	}
	function St(n, r, i, a, o, s, l, p, u, c) {
		var e = r,
			d = 16 === o ? mt.hex : mt.decBinOct,
			f = 16 === o ? Tt.hex : 10 === o ? Tt.dec : 8 === o ? Tt.oct : Tt.bin;
		let y = !1,
			m = 0;
		for (let e = 0, t = null == s ? 1 / 0 : s; e < t; ++e) {
			var T = n.charCodeAt(r);
			let e;
			if (95 === T && "bail" !== p) {
				var h = n.charCodeAt(r - 1),
					S = n.charCodeAt(r + 1);
				if (p) {
					if (Number.isNaN(S) || !f(S) || d.has(h) || d.has(S)) {
						if (c) return { n: null, pos: r };
						u.unexpectedNumericSeparator(r, i, a);
					}
				} else {
					if (c) return { n: null, pos: r };
					u.numericSeparatorInEscapeSequence(r, i, a);
				}
				++r;
			} else {
				if (
					(e = 97 <= T ? T - 97 + 10 : 65 <= T ? T - 65 + 10 : yt(T) ? T - 48 : 1 / 0) >=
					o
				) {
					if (e <= 9 && c) return { n: null, pos: r };
					if (e <= 9 && u.invalidDigit(r, i, a, o)) e = 0;
					else {
						if (!l) break;
						(e = 0), (y = !0);
					}
				}
				++r, (m = m * o + e);
			}
		}
		return r === e || (null != s && r - e !== s) || y ? { n: null, pos: r } : { n: m, pos: r };
	}
	function bt(e, t, n, r, i, a) {
		let o;
		if (123 === e.charCodeAt(t)) {
			if (
				(++t,
				({ code: o, pos: t } = ht(e, t, n, r, e.indexOf("}", t) - t, !0, i, a)),
				++t,
				null !== o && 1114111 < o)
			) {
				if (!i) return { code: null, pos: t };
				a.invalidCodePoint(t, n, r);
			}
		} else ({ code: o, pos: t } = ht(e, t, n, r, 4, !1, i, a));
		return { code: o, pos: t };
	}
	var u = {},
		c =
			(Object.defineProperty(u, "__esModule", { value: !0 }),
			(u.UPDATE_OPERATORS =
				u.UNARY_OPERATORS =
				u.STRING_UNARY_OPERATORS =
				u.STATEMENT_OR_BLOCK_KEYS =
				u.NUMBER_UNARY_OPERATORS =
				u.NUMBER_BINARY_OPERATORS =
				u.NOT_LOCAL_BINDING =
				u.LOGICAL_OPERATORS =
				u.INHERIT_KEYS =
				u.FOR_INIT_KEYS =
				u.FLATTENABLE_KEYS =
				u.EQUALITY_BINARY_OPERATORS =
				u.COMPARISON_BINARY_OPERATORS =
				u.COMMENT_KEYS =
				u.BOOLEAN_UNARY_OPERATORS =
				u.BOOLEAN_NUMBER_BINARY_OPERATORS =
				u.BOOLEAN_BINARY_OPERATORS =
				u.BLOCK_SCOPED_SYMBOL =
				u.BINARY_OPERATORS =
				u.ASSIGNMENT_OPERATORS =
					void 0),
			(u.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"]),
			(u.FLATTENABLE_KEYS = ["body", "expressions"]),
			(u.FOR_INIT_KEYS = ["left", "init"]),
			(u.COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"]),
			(u.LOGICAL_OPERATORS = ["||", "&&", "??"])),
		f =
			((u.UPDATE_OPERATORS = ["++", "--"]),
			(u.BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="])),
		y = (u.EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="]),
		y = (u.COMPARISON_BINARY_OPERATORS = [...y, "in", "instanceof"]),
		y = (u.BOOLEAN_BINARY_OPERATORS = [...y, ...f]),
		f = (u.NUMBER_BINARY_OPERATORS = [
			"-",
			"/",
			"%",
			"*",
			"**",
			"&",
			"|",
			">>",
			">>>",
			"<<",
			"^"
		]),
		y =
			((u.BINARY_OPERATORS = ["+", ...f, ...y, "|>"]),
			(u.ASSIGNMENT_OPERATORS = ["=", "+=", ...f.map(e => e + "="), ...c.map(e => e + "=")]),
			(u.BOOLEAN_UNARY_OPERATORS = ["delete", "!"])),
		f = (u.NUMBER_UNARY_OPERATORS = ["+", "-", "~"]),
		c = (u.STRING_UNARY_OPERATORS = ["typeof"]),
		y =
			((u.UNARY_OPERATORS = ["void", "throw", ...y, ...f, ...c]),
			(u.INHERIT_KEYS = {
				optional: ["typeAnnotation", "typeParameters", "returnType"],
				force: ["start", "loc", "end"]
			}),
			(u.BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped")),
			(u.NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding")),
			{}),
		Et =
			(Object.defineProperty(y, "__esModule", { value: !0 }),
			(y.VISITOR_KEYS =
				y.NODE_PARENT_VALIDATIONS =
				y.NODE_FIELDS =
				y.FLIPPED_ALIAS_KEYS =
				y.DEPRECATED_KEYS =
				y.BUILDER_KEYS =
				y.ALIAS_KEYS =
					void 0),
			(y.arrayOf = Nt),
			(y.arrayOfType = wt),
			(y.assertEach = jt),
			(y.assertNodeOrValueType = function (...i) {
				function e(e, t, n) {
					for (var r of i)
						if (Ct(n) === r || (0, Et.default)(r, n))
							return void (0, vt.validateChild)(e, t, n);
					throw new TypeError(
						`Property ${t} of ${e.type} expected node to be of a type ${JSON.stringify(i)} but instead got ` +
							JSON.stringify(null == n ? void 0 : n.type)
					);
				}
				return (e.oneOfNodeOrValueTypes = i), e;
			}),
			(y.assertNodeType = kt),
			(y.assertOneOf = function (...r) {
				function e(e, t, n) {
					if (!r.includes(n))
						throw new TypeError(
							`Property ${t} expected value to be one of ${JSON.stringify(r)} but got ` +
								JSON.stringify(n)
						);
				}
				return (e.oneOf = r), e;
			}),
			(y.assertOptionalChainStart = function () {
				return function (e) {
					let t,
						n = e;
					for (; e; ) {
						var r = n.type;
						if ("OptionalCallExpression" === r) {
							if (n.optional) return;
							n = n.callee;
						} else {
							if ("OptionalMemberExpression" !== r) break;
							if (n.optional) return;
							n = n.object;
						}
					}
					throw new TypeError(
						`Non-optional ${e.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ` +
							(null == (t = n) ? void 0 : t.type)
					);
				};
			}),
			(y.assertShape = function (a) {
				function e(e, t, n) {
					var r,
						i = [];
					for (r of Object.keys(a))
						try {
							(0, vt.validateField)(e, r, n[r], a[r]);
						} catch (e) {
							if (!(e instanceof TypeError)) throw e;
							i.push(e.message);
						}
					if (i.length)
						throw new TypeError(
							`Property ${t} of ${e.type} expected to have the following:
` + i.join("\n")
						);
				}
				return (e.shapeOf = a), e;
			}),
			(y.assertValueType = Lt),
			(y.chain = Mt),
			(y.default = Kt),
			(y.defineAliasedType = function (...a) {
				return (e, t = {}) => {
					let n = t.aliases,
						r;
					n ||
						(null !=
						(n = t.inherits
							? null == (r = Rt[t.inherits].aliases)
								? void 0
								: r.slice()
							: n)
							? n
							: (n = []),
						(t.aliases = n));
					var i = a.filter(e => !n.includes(e));
					n.unshift(...i), Kt(e, t);
				};
			}),
			(y.validate = Dt),
			(y.validateArrayOfType = function (...e) {
				return Dt(wt(...e));
			}),
			(y.validateOptional = function (e) {
				return { validate: e, optional: !0 };
			}),
			(y.validateOptionalType = function (...e) {
				return { validate: kt(...e), optional: !0 };
			}),
			(y.validateType = function (...e) {
				return Dt(kt(...e));
			}),
			Fe),
		vt = Me;
	let gt = (y.VISITOR_KEYS = {}),
		Pt = (y.ALIAS_KEYS = {}),
		xt = (y.FLIPPED_ALIAS_KEYS = {}),
		At = (y.NODE_FIELDS = {}),
		Ot = (y.BUILDER_KEYS = {}),
		_t = (y.DEPRECATED_KEYS = {}),
		It = (y.NODE_PARENT_VALIDATIONS = {});
	function Ct(e) {
		return Array.isArray(e) ? "array" : null === e ? "null" : typeof e;
	}
	function Dt(e) {
		return { validate: e };
	}
	function Nt(e) {
		return Mt(Lt("array"), jt(e));
	}
	function wt(...e) {
		return Nt(kt(...e));
	}
	function jt(o) {
		let s = {}.BABEL_TYPES_8_BREAKING ? vt.validateChild : () => {};
		function e(t, n, r) {
			if (Array.isArray(r))
				for (let e = 0; e < r.length; e++) {
					var i = `${n}[${e}]`,
						a = r[e];
					o(t, i, a), s(t, i, a);
				}
		}
		return (e.each = o), e;
	}
	function kt(...i) {
		function e(e, t, n) {
			for (var r of i) if ((0, Et.default)(r, n)) return void (0, vt.validateChild)(e, t, n);
			throw new TypeError(
				`Property ${t} of ${e.type} expected node to be of a type ${JSON.stringify(i)} but instead got ` +
					JSON.stringify(null == n ? void 0 : n.type)
			);
		}
		return (e.oneOfNodeTypes = i), e;
	}
	function Lt(r) {
		function e(e, t, n) {
			if (!(Ct(n) === r))
				throw new TypeError(`Property ${t} expected type of ${r} but got ` + Ct(n));
		}
		return (e.type = r), e;
	}
	function Mt(...n) {
		function e(...e) {
			for (var t of n) t(...e);
		}
		if (
			2 <= (e.chainOf = n).length &&
			"type" in n[0] &&
			"array" === n[0].type &&
			!("each" in n[1])
		)
			throw new Error(
				'An assertValueType("array") validator can only be followed by an assertEach(...) validator.'
			);
		return e;
	}
	let Bt = new Set([
			"aliases",
			"builder",
			"deprecatedAlias",
			"fields",
			"inherits",
			"visitor",
			"validate"
		]),
		Ft = new Set(["default", "optional", "deprecated", "validate"]),
		Rt = {};
	function Kt(t, e = {}) {
		var n,
			r = (e.inherits && Rt[e.inherits]) || {};
		let i = e.fields;
		if (!i && ((i = {}), r.fields))
			for (n of Object.getOwnPropertyNames(r.fields)) {
				var a = r.fields[n],
					o = a.default;
				if (Array.isArray(o) ? 0 < o.length : o && "object" == typeof o)
					throw new Error(
						"field defaults can only be primitives or empty arrays currently"
					);
				i[n] = {
					default: Array.isArray(o) ? [] : o,
					optional: a.optional,
					deprecated: a.deprecated,
					validate: a.validate
				};
			}
		var s,
			l,
			p,
			u = e.visitor || r.visitor || [],
			c = e.aliases || r.aliases || [],
			d = e.builder || r.builder || e.visitor || [];
		for (s of Object.keys(e))
			if (!Bt.has(s)) throw new Error(`Unknown type option "${s}" on ` + t);
		e.deprecatedAlias && (_t[e.deprecatedAlias] = t);
		for (l of u.concat(d)) i[l] = i[l] || {};
		for (p of Object.keys(i)) {
			var f,
				y = i[p];
			void 0 === y.default || d.includes(p) || (y.optional = !0),
				void 0 === y.default
					? (y.default = null)
					: y.validate || null == y.default || (y.validate = Lt(Ct(y.default)));
			for (f of Object.keys(y))
				if (!Ft.has(f)) throw new Error(`Unknown field key "${f}" on ${t}.` + p);
		}
		(gt[t] = e.visitor = u),
			(Ot[t] = e.builder = d),
			(At[t] = e.fields = i),
			(Pt[t] = e.aliases = c).forEach(e => {
				(xt[e] = xt[e] || []), xt[e].push(t);
			}),
			e.validate && (It[t] = e.validate),
			(Rt[t] = e);
	}
	Object.defineProperty(p, "__esModule", { value: !0 }),
		(p.patternLikeCommon =
			p.importAttributes =
			p.functionTypeAnnotationCommon =
			p.functionDeclarationCommon =
			p.functionCommon =
			p.classMethodOrPropertyCommon =
			p.classMethodOrDeclareMethodCommon =
				void 0);
	var Yt = Fe,
		Vt = We,
		Jt = Ge,
		Xt = d,
		qt = u,
		m = y,
		f = (0, m.defineAliasedType)("Standardized");
	f("ArrayExpression", {
		fields: {
			elements: {
				validate: (0, m.arrayOf)(
					(0, m.assertNodeOrValueType)("null", "Expression", "SpreadElement")
				),
				default: {}.BABEL_TYPES_8_BREAKING ? void 0 : []
			}
		},
		visitor: ["elements"],
		aliases: ["Expression"]
	}),
		f("AssignmentExpression", {
			fields: {
				operator: {
					validate: {}.BABEL_TYPES_8_BREAKING
						? Object.assign(
								(() => {
									let r = (0, m.assertOneOf)(...qt.ASSIGNMENT_OPERATORS),
										i = (0, m.assertOneOf)("=");
									return function (e, t, n) {
										((0, Yt.default)("Pattern", e.left) ? i : r)(e, t, n);
									};
								})(),
								{ type: "string" }
							)
						: (0, m.assertValueType)("string")
				},
				left: {
					validate: {}.BABEL_TYPES_8_BREAKING
						? (0, m.assertNodeType)(
								"Identifier",
								"MemberExpression",
								"OptionalMemberExpression",
								"ArrayPattern",
								"ObjectPattern",
								"TSAsExpression",
								"TSSatisfiesExpression",
								"TSTypeAssertion",
								"TSNonNullExpression"
							)
						: (0, m.assertNodeType)("LVal", "OptionalMemberExpression")
				},
				right: { validate: (0, m.assertNodeType)("Expression") }
			},
			builder: ["operator", "left", "right"],
			visitor: ["left", "right"],
			aliases: ["Expression"]
		}),
		f("BinaryExpression", {
			builder: ["operator", "left", "right"],
			fields: {
				operator: { validate: (0, m.assertOneOf)(...qt.BINARY_OPERATORS) },
				left: {
					validate: (() => {
						let r = (0, m.assertNodeType)("Expression"),
							i = (0, m.assertNodeType)("Expression", "PrivateName");
						return Object.assign(
							function (e, t, n) {
								("in" === e.operator ? i : r)(e, t, n);
							},
							{ oneOfNodeTypes: ["Expression", "PrivateName"] }
						);
					})()
				},
				right: { validate: (0, m.assertNodeType)("Expression") }
			},
			visitor: ["left", "right"],
			aliases: ["Binary", "Expression"]
		}),
		f("InterpreterDirective", {
			builder: ["value"],
			fields: { value: { validate: (0, m.assertValueType)("string") } }
		}),
		f("Directive", {
			visitor: ["value"],
			fields: { value: { validate: (0, m.assertNodeType)("DirectiveLiteral") } }
		}),
		f("DirectiveLiteral", {
			builder: ["value"],
			fields: { value: { validate: (0, m.assertValueType)("string") } }
		}),
		f("BlockStatement", {
			builder: ["body", "directives"],
			visitor: ["directives", "body"],
			fields: {
				directives: { validate: (0, m.arrayOfType)("Directive"), default: [] },
				body: (0, m.validateArrayOfType)("Statement")
			},
			aliases: ["Scopable", "BlockParent", "Block", "Statement"]
		}),
		f("BreakStatement", {
			visitor: ["label"],
			fields: { label: { validate: (0, m.assertNodeType)("Identifier"), optional: !0 } },
			aliases: ["Statement", "Terminatorless", "CompletionStatement"]
		}),
		f("CallExpression", {
			visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
			builder: ["callee", "arguments"],
			aliases: ["Expression"],
			fields: Object.assign(
				{
					callee: {
						validate: (0, m.assertNodeType)(
							"Expression",
							"Super",
							"V8IntrinsicIdentifier"
						)
					},
					arguments: (0, m.validateArrayOfType)(
						"Expression",
						"SpreadElement",
						"ArgumentPlaceholder"
					),
					typeArguments: {
						validate: (0, m.assertNodeType)("TypeParameterInstantiation"),
						optional: !0
					}
				},
				{
					optional: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					typeParameters: {
						validate: (0, m.assertNodeType)("TSTypeParameterInstantiation"),
						optional: !0
					}
				},
				{}.BABEL_TYPES_8_BREAKING
					? {}
					: { optional: { validate: (0, m.assertValueType)("boolean"), optional: !0 } }
			)
		}),
		f("CatchClause", {
			visitor: ["param", "body"],
			fields: {
				param: {
					validate: (0, m.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
					optional: !0
				},
				body: { validate: (0, m.assertNodeType)("BlockStatement") }
			},
			aliases: ["Scopable", "BlockParent"]
		}),
		f("ConditionalExpression", {
			visitor: ["test", "consequent", "alternate"],
			fields: {
				test: { validate: (0, m.assertNodeType)("Expression") },
				consequent: { validate: (0, m.assertNodeType)("Expression") },
				alternate: { validate: (0, m.assertNodeType)("Expression") }
			},
			aliases: ["Expression", "Conditional"]
		}),
		f("ContinueStatement", {
			visitor: ["label"],
			fields: { label: { validate: (0, m.assertNodeType)("Identifier"), optional: !0 } },
			aliases: ["Statement", "Terminatorless", "CompletionStatement"]
		}),
		f("DebuggerStatement", { aliases: ["Statement"] }),
		f("DoWhileStatement", {
			builder: ["test", "body"],
			visitor: ["body", "test"],
			fields: {
				test: { validate: (0, m.assertNodeType)("Expression") },
				body: { validate: (0, m.assertNodeType)("Statement") }
			},
			aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
		}),
		f("EmptyStatement", { aliases: ["Statement"] }),
		f("ExpressionStatement", {
			visitor: ["expression"],
			fields: { expression: { validate: (0, m.assertNodeType)("Expression") } },
			aliases: ["Statement", "ExpressionWrapper"]
		}),
		f("File", {
			builder: ["program", "comments", "tokens"],
			visitor: ["program"],
			fields: {
				program: { validate: (0, m.assertNodeType)("Program") },
				comments: {
					validate: {}.BABEL_TYPES_8_BREAKING
						? (0, m.assertEach)((0, m.assertNodeType)("CommentBlock", "CommentLine"))
						: Object.assign(() => {}, {
								each: { oneOfNodeTypes: ["CommentBlock", "CommentLine"] }
							}),
					optional: !0
				},
				tokens: {
					validate: (0, m.assertEach)(Object.assign(() => {}, { type: "any" })),
					optional: !0
				}
			}
		}),
		f("ForInStatement", {
			visitor: ["left", "right", "body"],
			aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
			fields: {
				left: {
					validate: {}.BABEL_TYPES_8_BREAKING
						? (0, m.assertNodeType)(
								"VariableDeclaration",
								"Identifier",
								"MemberExpression",
								"ArrayPattern",
								"ObjectPattern",
								"TSAsExpression",
								"TSSatisfiesExpression",
								"TSTypeAssertion",
								"TSNonNullExpression"
							)
						: (0, m.assertNodeType)("VariableDeclaration", "LVal")
				},
				right: { validate: (0, m.assertNodeType)("Expression") },
				body: { validate: (0, m.assertNodeType)("Statement") }
			}
		}),
		f("ForStatement", {
			visitor: ["init", "test", "update", "body"],
			aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
			fields: {
				init: {
					validate: (0, m.assertNodeType)("VariableDeclaration", "Expression"),
					optional: !0
				},
				test: { validate: (0, m.assertNodeType)("Expression"), optional: !0 },
				update: { validate: (0, m.assertNodeType)("Expression"), optional: !0 },
				body: { validate: (0, m.assertNodeType)("Statement") }
			}
		});
	let Ut = () => ({
		params: (0, m.validateArrayOfType)("Identifier", "Pattern", "RestElement"),
		generator: { default: !1 },
		async: { default: !1 }
	});
	p.functionCommon = Ut;
	var c = () => ({
			returnType: {
				validate: (0, m.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
				optional: !0
			},
			typeParameters: {
				validate: (0, m.assertNodeType)(
					"TypeParameterDeclaration",
					"TSTypeParameterDeclaration",
					"Noop"
				),
				optional: !0
			}
		}),
		d =
			((p.functionTypeAnnotationCommon = c),
			() =>
				Object.assign({}, Ut(), {
					declare: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					id: { validate: (0, m.assertNodeType)("Identifier"), optional: !0 }
				})),
		d =
			((p.functionDeclarationCommon = d),
			f("FunctionDeclaration", {
				builder: ["id", "params", "body", "generator", "async"],
				visitor: ["id", "typeParameters", "params", "predicate", "returnType", "body"],
				fields: Object.assign({}, d(), c(), {
					body: { validate: (0, m.assertNodeType)("BlockStatement") },
					predicate: {
						validate: (0, m.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
						optional: !0
					}
				}),
				aliases: [
					"Scopable",
					"Function",
					"BlockParent",
					"FunctionParent",
					"Statement",
					"Pureish",
					"Declaration"
				],
				validate: {}.BABEL_TYPES_8_BREAKING
					? (() => {
							let r = (0, m.assertNodeType)("Identifier");
							return function (e, t, n) {
								(0, Yt.default)("ExportDefaultDeclaration", e) || r(n, "id", n.id);
							};
						})()
					: void 0
			}),
			f("FunctionExpression", {
				inherits: "FunctionDeclaration",
				aliases: [
					"Scopable",
					"Function",
					"BlockParent",
					"FunctionParent",
					"Expression",
					"Pureish"
				],
				fields: Object.assign({}, Ut(), c(), {
					id: { validate: (0, m.assertNodeType)("Identifier"), optional: !0 },
					body: { validate: (0, m.assertNodeType)("BlockStatement") },
					predicate: {
						validate: (0, m.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
						optional: !0
					}
				})
			}),
			() => ({
				typeAnnotation: {
					validate: (0, m.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
					optional: !0
				},
				optional: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
				decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 }
			})),
		h =
			((p.patternLikeCommon = d),
			f("Identifier", {
				builder: ["name"],
				visitor: ["typeAnnotation", "decorators"],
				aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
				fields: Object.assign({}, d(), {
					name: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertValueType)("string"),
									Object.assign(
										function (e, t, n) {
											if (!(0, Vt.default)(n, !1))
												throw new TypeError(
													`"${n}" is not a valid identifier name`
												);
										},
										{ type: "string" }
									)
								)
							: (0, m.assertValueType)("string")
					}
				}),
				validate: {}.BABEL_TYPES_8_BREAKING
					? function (e, t, n) {
							t = /\.(\w+)$/.exec(t);
							if (t) {
								var [, t] = t,
									r = { computed: !1 };
								if ("property" === t) {
									if ((0, Yt.default)("MemberExpression", e, r)) return;
									if ((0, Yt.default)("OptionalMemberExpression", e, r)) return;
								} else if ("key" === t) {
									if ((0, Yt.default)("Property", e, r)) return;
									if ((0, Yt.default)("Method", e, r)) return;
								} else if ("exported" === t) {
									if ((0, Yt.default)("ExportSpecifier", e)) return;
								} else if ("imported" === t) {
									if ((0, Yt.default)("ImportSpecifier", e, { imported: n }))
										return;
								} else if (
									"meta" === t &&
									(0, Yt.default)("MetaProperty", e, { meta: n })
								)
									return;
								if (
									((0, Jt.isKeyword)(n.name) ||
										(0, Jt.isReservedWord)(n.name, !1)) &&
									"this" !== n.name
								)
									throw new TypeError(`"${n.name}" is not a valid identifier`);
							}
						}
					: void 0
			}),
			f("IfStatement", {
				visitor: ["test", "consequent", "alternate"],
				aliases: ["Statement", "Conditional"],
				fields: {
					test: { validate: (0, m.assertNodeType)("Expression") },
					consequent: { validate: (0, m.assertNodeType)("Statement") },
					alternate: { optional: !0, validate: (0, m.assertNodeType)("Statement") }
				}
			}),
			f("LabeledStatement", {
				visitor: ["label", "body"],
				aliases: ["Statement"],
				fields: {
					label: { validate: (0, m.assertNodeType)("Identifier") },
					body: { validate: (0, m.assertNodeType)("Statement") }
				}
			}),
			f("StringLiteral", {
				builder: ["value"],
				fields: { value: { validate: (0, m.assertValueType)("string") } },
				aliases: ["Expression", "Pureish", "Literal", "Immutable"]
			}),
			f("NumericLiteral", {
				builder: ["value"],
				deprecatedAlias: "NumberLiteral",
				fields: {
					value: {
						validate: (0, m.chain)(
							(0, m.assertValueType)("number"),
							Object.assign(function (e, t, n) {}, { type: "number" })
						)
					}
				},
				aliases: ["Expression", "Pureish", "Literal", "Immutable"]
			}),
			f("NullLiteral", { aliases: ["Expression", "Pureish", "Literal", "Immutable"] }),
			f("BooleanLiteral", {
				builder: ["value"],
				fields: { value: { validate: (0, m.assertValueType)("boolean") } },
				aliases: ["Expression", "Pureish", "Literal", "Immutable"]
			}),
			f("RegExpLiteral", {
				builder: ["pattern", "flags"],
				deprecatedAlias: "RegexLiteral",
				aliases: ["Expression", "Pureish", "Literal"],
				fields: {
					pattern: { validate: (0, m.assertValueType)("string") },
					flags: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertValueType)("string"),
									Object.assign(
										function (e, t, n) {
											n = /[^gimsuy]/.exec(n);
											if (n)
												throw new TypeError(
													`"${n[0]}" is not a valid RegExp flag`
												);
										},
										{ type: "string" }
									)
								)
							: (0, m.assertValueType)("string"),
						default: ""
					}
				}
			}),
			f("LogicalExpression", {
				builder: ["operator", "left", "right"],
				visitor: ["left", "right"],
				aliases: ["Binary", "Expression"],
				fields: {
					operator: { validate: (0, m.assertOneOf)(...qt.LOGICAL_OPERATORS) },
					left: { validate: (0, m.assertNodeType)("Expression") },
					right: { validate: (0, m.assertNodeType)("Expression") }
				}
			}),
			f("MemberExpression", {
				builder: [
					"object",
					"property",
					"computed",
					...({}.BABEL_TYPES_8_BREAKING ? [] : ["optional"])
				],
				visitor: ["object", "property"],
				aliases: ["Expression", "LVal"],
				fields: Object.assign(
					{
						object: { validate: (0, m.assertNodeType)("Expression", "Super") },
						property: {
							validate: (() => {
								let r = (0, m.assertNodeType)("Identifier", "PrivateName"),
									i = (0, m.assertNodeType)("Expression");
								function e(e, t, n) {
									(e.computed ? i : r)(e, t, n);
								}
								return (
									(e.oneOfNodeTypes = [
										"Expression",
										"Identifier",
										"PrivateName"
									]),
									e
								);
							})()
						},
						computed: { default: !1 }
					},
					{}.BABEL_TYPES_8_BREAKING
						? {}
						: {
								optional: {
									validate: (0, m.assertValueType)("boolean"),
									optional: !0
								}
							}
				)
			}),
			f("NewExpression", { inherits: "CallExpression" }),
			f("Program", {
				visitor: ["directives", "body"],
				builder: ["body", "directives", "sourceType", "interpreter"],
				fields: {
					sourceType: {
						validate: (0, m.assertOneOf)("script", "module"),
						default: "script"
					},
					interpreter: {
						validate: (0, m.assertNodeType)("InterpreterDirective"),
						default: null,
						optional: !0
					},
					directives: { validate: (0, m.arrayOfType)("Directive"), default: [] },
					body: (0, m.validateArrayOfType)("Statement")
				},
				aliases: ["Scopable", "BlockParent", "Block"]
			}),
			f("ObjectExpression", {
				visitor: ["properties"],
				aliases: ["Expression"],
				fields: {
					properties: (0, m.validateArrayOfType)(
						"ObjectMethod",
						"ObjectProperty",
						"SpreadElement"
					)
				}
			}),
			f("ObjectMethod", {
				builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
				visitor: ["decorators", "key", "typeParameters", "params", "returnType", "body"],
				fields: Object.assign({}, Ut(), c(), {
					kind: Object.assign(
						{ validate: (0, m.assertOneOf)("method", "get", "set") },
						{}.BABEL_TYPES_8_BREAKING ? {} : { default: "method" }
					),
					computed: { default: !1 },
					key: {
						validate: (() => {
							let r = (0, m.assertNodeType)(
									"Identifier",
									"StringLiteral",
									"NumericLiteral",
									"BigIntLiteral"
								),
								i = (0, m.assertNodeType)("Expression");
							function e(e, t, n) {
								(e.computed ? i : r)(e, t, n);
							}
							return (
								(e.oneOfNodeTypes = [
									"Expression",
									"Identifier",
									"StringLiteral",
									"NumericLiteral",
									"BigIntLiteral"
								]),
								e
							);
						})()
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 },
					body: { validate: (0, m.assertNodeType)("BlockStatement") }
				}),
				aliases: [
					"UserWhitespacable",
					"Function",
					"Scopable",
					"BlockParent",
					"FunctionParent",
					"Method",
					"ObjectMember"
				]
			}),
			f("ObjectProperty", {
				builder: [
					"key",
					"value",
					"computed",
					"shorthand",
					...({}.BABEL_TYPES_8_BREAKING ? [] : ["decorators"])
				],
				fields: {
					computed: { default: !1 },
					key: {
						validate: (() => {
							let r = (0, m.assertNodeType)(
									"Identifier",
									"StringLiteral",
									"NumericLiteral",
									"BigIntLiteral",
									"DecimalLiteral",
									"PrivateName"
								),
								i = (0, m.assertNodeType)("Expression");
							return Object.assign(
								function (e, t, n) {
									(e.computed ? i : r)(e, t, n);
								},
								{
									oneOfNodeTypes: [
										"Expression",
										"Identifier",
										"StringLiteral",
										"NumericLiteral",
										"BigIntLiteral",
										"DecimalLiteral",
										"PrivateName"
									]
								}
							);
						})()
					},
					value: { validate: (0, m.assertNodeType)("Expression", "PatternLike") },
					shorthand: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertValueType)("boolean"),
									Object.assign(
										function (e, t, n) {
											if (n) {
												if (e.computed)
													throw new TypeError(
														"Property shorthand of ObjectProperty cannot be true if computed is true"
													);
												if (!(0, Yt.default)("Identifier", e.key))
													throw new TypeError(
														"Property shorthand of ObjectProperty cannot be true if key is not an Identifier"
													);
											}
										},
										{ type: "boolean" }
									)
								)
							: (0, m.assertValueType)("boolean"),
						default: !1
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 }
				},
				visitor: ["key", "value", "decorators"],
				aliases: ["UserWhitespacable", "Property", "ObjectMember"],
				validate: {}.BABEL_TYPES_8_BREAKING
					? (() => {
							let r = (0, m.assertNodeType)(
									"Identifier",
									"Pattern",
									"TSAsExpression",
									"TSSatisfiesExpression",
									"TSNonNullExpression",
									"TSTypeAssertion"
								),
								i = (0, m.assertNodeType)("Expression");
							return function (e, t, n) {
								((0, Yt.default)("ObjectPattern", e) ? r : i)(n, "value", n.value);
							};
						})()
					: void 0
			}),
			f("RestElement", {
				visitor: ["argument", "typeAnnotation"],
				builder: ["argument"],
				aliases: ["LVal", "PatternLike"],
				deprecatedAlias: "RestProperty",
				fields: Object.assign({}, d(), {
					argument: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.assertNodeType)(
									"Identifier",
									"ArrayPattern",
									"ObjectPattern",
									"MemberExpression",
									"TSAsExpression",
									"TSSatisfiesExpression",
									"TSTypeAssertion",
									"TSNonNullExpression"
								)
							: (0, m.assertNodeType)("LVal")
					}
				}),
				validate: {}.BABEL_TYPES_8_BREAKING
					? function (e, t) {
							t = /(\w+)\[(\d+)\]/.exec(t);
							if (!t) throw new Error("Internal Babel error: malformed key.");
							var [, t, n] = t;
							if (e[t].length > +n + 1)
								throw new TypeError("RestElement must be last element of " + t);
						}
					: void 0
			}),
			f("ReturnStatement", {
				visitor: ["argument"],
				aliases: ["Statement", "Terminatorless", "CompletionStatement"],
				fields: {
					argument: { validate: (0, m.assertNodeType)("Expression"), optional: !0 }
				}
			}),
			f("SequenceExpression", {
				visitor: ["expressions"],
				fields: { expressions: (0, m.validateArrayOfType)("Expression") },
				aliases: ["Expression"]
			}),
			f("ParenthesizedExpression", {
				visitor: ["expression"],
				aliases: ["Expression", "ExpressionWrapper"],
				fields: { expression: { validate: (0, m.assertNodeType)("Expression") } }
			}),
			f("SwitchCase", {
				visitor: ["test", "consequent"],
				fields: {
					test: { validate: (0, m.assertNodeType)("Expression"), optional: !0 },
					consequent: (0, m.validateArrayOfType)("Statement")
				}
			}),
			f("SwitchStatement", {
				visitor: ["discriminant", "cases"],
				aliases: ["Statement", "BlockParent", "Scopable"],
				fields: {
					discriminant: { validate: (0, m.assertNodeType)("Expression") },
					cases: (0, m.validateArrayOfType)("SwitchCase")
				}
			}),
			f("ThisExpression", { aliases: ["Expression"] }),
			f("ThrowStatement", {
				visitor: ["argument"],
				aliases: ["Statement", "Terminatorless", "CompletionStatement"],
				fields: { argument: { validate: (0, m.assertNodeType)("Expression") } }
			}),
			f("TryStatement", {
				visitor: ["block", "handler", "finalizer"],
				aliases: ["Statement"],
				fields: {
					block: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertNodeType)("BlockStatement"),
									Object.assign(
										function (e) {
											if (!e.handler && !e.finalizer)
												throw new TypeError(
													"TryStatement expects either a handler or finalizer, or both"
												);
										},
										{ oneOfNodeTypes: ["BlockStatement"] }
									)
								)
							: (0, m.assertNodeType)("BlockStatement")
					},
					handler: { optional: !0, validate: (0, m.assertNodeType)("CatchClause") },
					finalizer: { optional: !0, validate: (0, m.assertNodeType)("BlockStatement") }
				}
			}),
			f("UnaryExpression", {
				builder: ["operator", "argument", "prefix"],
				fields: {
					prefix: { default: !0 },
					argument: { validate: (0, m.assertNodeType)("Expression") },
					operator: { validate: (0, m.assertOneOf)(...qt.UNARY_OPERATORS) }
				},
				visitor: ["argument"],
				aliases: ["UnaryLike", "Expression"]
			}),
			f("UpdateExpression", {
				builder: ["operator", "argument", "prefix"],
				fields: {
					prefix: { default: !1 },
					argument: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.assertNodeType)("Identifier", "MemberExpression")
							: (0, m.assertNodeType)("Expression")
					},
					operator: { validate: (0, m.assertOneOf)(...qt.UPDATE_OPERATORS) }
				},
				visitor: ["argument"],
				aliases: ["Expression"]
			}),
			f("VariableDeclaration", {
				builder: ["kind", "declarations"],
				visitor: ["declarations"],
				aliases: ["Statement", "Declaration"],
				fields: {
					declare: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					kind: {
						validate: (0, m.assertOneOf)("var", "let", "const", "using", "await using")
					},
					declarations: (0, m.validateArrayOfType)("VariableDeclarator")
				},
				validate: {}.BABEL_TYPES_8_BREAKING
					? (() => {
							let r = (0, m.assertNodeType)("Identifier");
							return function (e, t, n) {
								if ((0, Yt.default)("ForXStatement", e, { left: n })) {
									if (1 !== n.declarations.length)
										throw new TypeError(
											"Exactly one VariableDeclarator is required in the VariableDeclaration of a " +
												e.type
										);
								} else
									n.declarations.forEach(e => {
										e.init || r(e, "id", e.id);
									});
							};
						})()
					: void 0
			}),
			f("VariableDeclarator", {
				visitor: ["id", "init"],
				fields: {
					id: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern")
							: (0, m.assertNodeType)("LVal")
					},
					definite: { optional: !0, validate: (0, m.assertValueType)("boolean") },
					init: { optional: !0, validate: (0, m.assertNodeType)("Expression") }
				}
			}),
			f("WhileStatement", {
				visitor: ["test", "body"],
				aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
				fields: {
					test: { validate: (0, m.assertNodeType)("Expression") },
					body: { validate: (0, m.assertNodeType)("Statement") }
				}
			}),
			f("WithStatement", {
				visitor: ["object", "body"],
				aliases: ["Statement"],
				fields: {
					object: { validate: (0, m.assertNodeType)("Expression") },
					body: { validate: (0, m.assertNodeType)("Statement") }
				}
			}),
			f("AssignmentPattern", {
				visitor: ["left", "right", "decorators"],
				builder: ["left", "right"],
				aliases: ["Pattern", "PatternLike", "LVal"],
				fields: Object.assign({}, d(), {
					left: {
						validate: (0, m.assertNodeType)(
							"Identifier",
							"ObjectPattern",
							"ArrayPattern",
							"MemberExpression",
							"TSAsExpression",
							"TSSatisfiesExpression",
							"TSTypeAssertion",
							"TSNonNullExpression"
						)
					},
					right: { validate: (0, m.assertNodeType)("Expression") },
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 }
				})
			}),
			f("ArrayPattern", {
				visitor: ["elements", "typeAnnotation"],
				builder: ["elements"],
				aliases: ["Pattern", "PatternLike", "LVal"],
				fields: Object.assign({}, d(), {
					elements: {
						validate: (0, m.chain)(
							(0, m.assertValueType)("array"),
							(0, m.assertEach)(
								(0, m.assertNodeOrValueType)("null", "PatternLike", "LVal")
							)
						)
					}
				})
			}),
			f("ArrowFunctionExpression", {
				builder: ["params", "body", "async"],
				visitor: ["typeParameters", "params", "predicate", "returnType", "body"],
				aliases: [
					"Scopable",
					"Function",
					"BlockParent",
					"FunctionParent",
					"Expression",
					"Pureish"
				],
				fields: Object.assign({}, Ut(), c(), {
					expression: { validate: (0, m.assertValueType)("boolean") },
					body: { validate: (0, m.assertNodeType)("BlockStatement", "Expression") },
					predicate: {
						validate: (0, m.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
						optional: !0
					}
				})
			}),
			f("ClassBody", {
				visitor: ["body"],
				fields: {
					body: (0, m.validateArrayOfType)(
						"ClassMethod",
						"ClassPrivateMethod",
						"ClassProperty",
						"ClassPrivateProperty",
						"ClassAccessorProperty",
						"TSDeclareMethod",
						"TSIndexSignature",
						"StaticBlock"
					)
				}
			}),
			f("ClassExpression", {
				builder: ["id", "superClass", "body", "decorators"],
				visitor: [
					"decorators",
					"id",
					"typeParameters",
					"superClass",
					"superTypeParameters",
					"mixins",
					"implements",
					"body"
				],
				aliases: ["Scopable", "Class", "Expression"],
				fields: {
					id: { validate: (0, m.assertNodeType)("Identifier"), optional: !0 },
					typeParameters: {
						validate: (0, m.assertNodeType)(
							"TypeParameterDeclaration",
							"TSTypeParameterDeclaration",
							"Noop"
						),
						optional: !0
					},
					body: { validate: (0, m.assertNodeType)("ClassBody") },
					superClass: { optional: !0, validate: (0, m.assertNodeType)("Expression") },
					superTypeParameters: {
						validate: (0, m.assertNodeType)(
							"TypeParameterInstantiation",
							"TSTypeParameterInstantiation"
						),
						optional: !0
					},
					implements: {
						validate: (0, m.arrayOfType)(
							"TSExpressionWithTypeArguments",
							"ClassImplements"
						),
						optional: !0
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 },
					mixins: { validate: (0, m.assertNodeType)("InterfaceExtends"), optional: !0 }
				}
			}),
			f("ClassDeclaration", {
				inherits: "ClassExpression",
				aliases: ["Scopable", "Class", "Statement", "Declaration"],
				fields: {
					id: { validate: (0, m.assertNodeType)("Identifier"), optional: !0 },
					typeParameters: {
						validate: (0, m.assertNodeType)(
							"TypeParameterDeclaration",
							"TSTypeParameterDeclaration",
							"Noop"
						),
						optional: !0
					},
					body: { validate: (0, m.assertNodeType)("ClassBody") },
					superClass: { optional: !0, validate: (0, m.assertNodeType)("Expression") },
					superTypeParameters: {
						validate: (0, m.assertNodeType)(
							"TypeParameterInstantiation",
							"TSTypeParameterInstantiation"
						),
						optional: !0
					},
					implements: {
						validate: (0, m.arrayOfType)(
							"TSExpressionWithTypeArguments",
							"ClassImplements"
						),
						optional: !0
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 },
					mixins: { validate: (0, m.assertNodeType)("InterfaceExtends"), optional: !0 },
					declare: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					abstract: { validate: (0, m.assertValueType)("boolean"), optional: !0 }
				},
				validate: {}.BABEL_TYPES_8_BREAKING
					? (() => {
							let r = (0, m.assertNodeType)("Identifier");
							return function (e, t, n) {
								(0, Yt.default)("ExportDefaultDeclaration", e) || r(n, "id", n.id);
							};
						})()
					: void 0
			}),
			(p.importAttributes = {
				attributes: { optional: !0, validate: (0, m.arrayOfType)("ImportAttribute") },
				assertions: {
					deprecated: !0,
					optional: !0,
					validate: (0, m.arrayOfType)("ImportAttribute")
				}
			}));
	f("ExportAllDeclaration", {
		builder: ["source"],
		visitor: ["source", "attributes", "assertions"],
		aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
		fields: Object.assign(
			{
				source: { validate: (0, m.assertNodeType)("StringLiteral") },
				exportKind: (0, m.validateOptional)((0, m.assertOneOf)("type", "value"))
			},
			h
		)
	}),
		f("ExportDefaultDeclaration", {
			visitor: ["declaration"],
			aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
			fields: {
				declaration: (0, m.validateType)(
					"TSDeclareFunction",
					"FunctionDeclaration",
					"ClassDeclaration",
					"Expression"
				),
				exportKind: (0, m.validateOptional)((0, m.assertOneOf)("value"))
			}
		}),
		f("ExportNamedDeclaration", {
			builder: ["declaration", "specifiers", "source"],
			visitor: ["declaration", "specifiers", "source", "attributes", "assertions"],
			aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
			fields: Object.assign(
				{
					declaration: {
						optional: !0,
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertNodeType)("Declaration"),
									Object.assign(
										function (e, t, n) {
											if (n && e.specifiers.length)
												throw new TypeError(
													"Only declaration or specifiers is allowed on ExportNamedDeclaration"
												);
											if (n && e.source)
												throw new TypeError(
													"Cannot export a declaration from a source"
												);
										},
										{ oneOfNodeTypes: ["Declaration"] }
									)
								)
							: (0, m.assertNodeType)("Declaration")
					}
				},
				h,
				{
					specifiers: {
						default: [],
						validate: (0, m.arrayOf)(
							(() => {
								let r = (0, m.assertNodeType)(
										"ExportSpecifier",
										"ExportDefaultSpecifier",
										"ExportNamespaceSpecifier"
									),
									i = (0, m.assertNodeType)("ExportSpecifier");
								return {}.BABEL_TYPES_8_BREAKING
									? Object.assign(
											function (e, t, n) {
												(e.source ? r : i)(e, t, n);
											},
											{
												oneOfNodeTypes: [
													"ExportSpecifier",
													"ExportDefaultSpecifier",
													"ExportNamespaceSpecifier"
												]
											}
										)
									: r;
							})()
						)
					},
					source: { validate: (0, m.assertNodeType)("StringLiteral"), optional: !0 },
					exportKind: (0, m.validateOptional)((0, m.assertOneOf)("type", "value"))
				}
			)
		}),
		f("ExportSpecifier", {
			visitor: ["local", "exported"],
			aliases: ["ModuleSpecifier"],
			fields: {
				local: { validate: (0, m.assertNodeType)("Identifier") },
				exported: { validate: (0, m.assertNodeType)("Identifier", "StringLiteral") },
				exportKind: { validate: (0, m.assertOneOf)("type", "value"), optional: !0 }
			}
		}),
		f("ForOfStatement", {
			visitor: ["left", "right", "body"],
			builder: ["left", "right", "body", "await"],
			aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
			fields: {
				left: {
					validate: (() => {
						if (!{}.BABEL_TYPES_8_BREAKING)
							return (0, m.assertNodeType)("VariableDeclaration", "LVal");
						let r = (0, m.assertNodeType)("VariableDeclaration"),
							i = (0, m.assertNodeType)(
								"Identifier",
								"MemberExpression",
								"ArrayPattern",
								"ObjectPattern",
								"TSAsExpression",
								"TSSatisfiesExpression",
								"TSTypeAssertion",
								"TSNonNullExpression"
							);
						return Object.assign(
							function (e, t, n) {
								((0, Yt.default)("VariableDeclaration", n) ? r : i)(e, t, n);
							},
							{
								oneOfNodeTypes: [
									"VariableDeclaration",
									"Identifier",
									"MemberExpression",
									"ArrayPattern",
									"ObjectPattern",
									"TSAsExpression",
									"TSSatisfiesExpression",
									"TSTypeAssertion",
									"TSNonNullExpression"
								]
							}
						);
					})()
				},
				right: { validate: (0, m.assertNodeType)("Expression") },
				body: { validate: (0, m.assertNodeType)("Statement") },
				await: { default: !1 }
			}
		}),
		f("ImportDeclaration", {
			builder: ["specifiers", "source"],
			visitor: ["specifiers", "source", "attributes", "assertions"],
			aliases: ["Statement", "Declaration", "ImportOrExportDeclaration"],
			fields: Object.assign({}, h, {
				module: { optional: !0, validate: (0, m.assertValueType)("boolean") },
				phase: { default: null, validate: (0, m.assertOneOf)("source", "defer") },
				specifiers: (0, m.validateArrayOfType)(
					"ImportSpecifier",
					"ImportDefaultSpecifier",
					"ImportNamespaceSpecifier"
				),
				source: { validate: (0, m.assertNodeType)("StringLiteral") },
				importKind: {
					validate: (0, m.assertOneOf)("type", "typeof", "value"),
					optional: !0
				}
			})
		}),
		f("ImportDefaultSpecifier", {
			visitor: ["local"],
			aliases: ["ModuleSpecifier"],
			fields: { local: { validate: (0, m.assertNodeType)("Identifier") } }
		}),
		f("ImportNamespaceSpecifier", {
			visitor: ["local"],
			aliases: ["ModuleSpecifier"],
			fields: { local: { validate: (0, m.assertNodeType)("Identifier") } }
		}),
		f("ImportSpecifier", {
			visitor: ["imported", "local"],
			builder: ["local", "imported"],
			aliases: ["ModuleSpecifier"],
			fields: {
				local: { validate: (0, m.assertNodeType)("Identifier") },
				imported: { validate: (0, m.assertNodeType)("Identifier", "StringLiteral") },
				importKind: {
					validate: (0, m.assertOneOf)("type", "typeof", "value"),
					optional: !0
				}
			}
		}),
		f("ImportExpression", {
			visitor: ["source", "options"],
			aliases: ["Expression"],
			fields: {
				phase: { default: null, validate: (0, m.assertOneOf)("source", "defer") },
				source: { validate: (0, m.assertNodeType)("Expression") },
				options: { validate: (0, m.assertNodeType)("Expression"), optional: !0 }
			}
		}),
		f("MetaProperty", {
			visitor: ["meta", "property"],
			aliases: ["Expression"],
			fields: {
				meta: {
					validate: {}.BABEL_TYPES_8_BREAKING
						? (0, m.chain)(
								(0, m.assertNodeType)("Identifier"),
								Object.assign(
									function (e, t, n) {
										let r;
										switch (n.name) {
											case "function":
												r = "sent";
												break;
											case "new":
												r = "target";
												break;
											case "import":
												r = "meta";
										}
										if (!(0, Yt.default)("Identifier", e.property, { name: r }))
											throw new TypeError("Unrecognised MetaProperty");
									},
									{ oneOfNodeTypes: ["Identifier"] }
								)
							)
						: (0, m.assertNodeType)("Identifier")
				},
				property: { validate: (0, m.assertNodeType)("Identifier") }
			}
		});
	let Wt = () => ({
		abstract: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
		accessibility: {
			validate: (0, m.assertOneOf)("public", "private", "protected"),
			optional: !0
		},
		static: { default: !1 },
		override: { default: !1 },
		computed: { default: !1 },
		optional: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
		key: {
			validate: (0, m.chain)(
				(() => {
					let r = (0, m.assertNodeType)(
							"Identifier",
							"StringLiteral",
							"NumericLiteral",
							"BigIntLiteral"
						),
						i = (0, m.assertNodeType)("Expression");
					return function (e, t, n) {
						(e.computed ? i : r)(e, t, n);
					};
				})(),
				(0, m.assertNodeType)(
					"Identifier",
					"StringLiteral",
					"NumericLiteral",
					"BigIntLiteral",
					"Expression"
				)
			)
		}
	});
	p.classMethodOrPropertyCommon = Wt;
	var h = () =>
			Object.assign({}, Ut(), Wt(), {
				params: (0, m.validateArrayOfType)(
					"Identifier",
					"Pattern",
					"RestElement",
					"TSParameterProperty"
				),
				kind: {
					validate: (0, m.assertOneOf)("get", "set", "method", "constructor"),
					default: "method"
				},
				access: {
					validate: (0, m.chain)(
						(0, m.assertValueType)("string"),
						(0, m.assertOneOf)("public", "private", "protected")
					),
					optional: !0
				},
				decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 }
			}),
		d =
			((p.classMethodOrDeclareMethodCommon = h),
			f("ClassMethod", {
				aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
				builder: [
					"kind",
					"key",
					"params",
					"body",
					"computed",
					"static",
					"generator",
					"async"
				],
				visitor: ["decorators", "key", "typeParameters", "params", "returnType", "body"],
				fields: Object.assign({}, h(), c(), {
					body: { validate: (0, m.assertNodeType)("BlockStatement") }
				})
			}),
			f("ObjectPattern", {
				visitor: ["properties", "typeAnnotation", "decorators"],
				builder: ["properties"],
				aliases: ["Pattern", "PatternLike", "LVal"],
				fields: Object.assign({}, d(), {
					properties: (0, m.validateArrayOfType)("RestElement", "ObjectProperty")
				})
			}),
			f("SpreadElement", {
				visitor: ["argument"],
				aliases: ["UnaryLike"],
				deprecatedAlias: "SpreadProperty",
				fields: { argument: { validate: (0, m.assertNodeType)("Expression") } }
			}),
			f("Super", { aliases: ["Expression"] }),
			f("TaggedTemplateExpression", {
				visitor: ["tag", "typeParameters", "quasi"],
				builder: ["tag", "quasi"],
				aliases: ["Expression"],
				fields: {
					tag: { validate: (0, m.assertNodeType)("Expression") },
					quasi: { validate: (0, m.assertNodeType)("TemplateLiteral") },
					typeParameters: {
						validate: (0, m.assertNodeType)(
							"TypeParameterInstantiation",
							"TSTypeParameterInstantiation"
						),
						optional: !0
					}
				}
			}),
			f("TemplateElement", {
				builder: ["value", "tail"],
				fields: {
					value: {
						validate: (0, m.chain)(
							(0, m.assertShape)({
								raw: { validate: (0, m.assertValueType)("string") },
								cooked: { validate: (0, m.assertValueType)("string"), optional: !0 }
							}),
							function (e) {
								var t = e.value.raw;
								let n = !1;
								var r = () => {
										throw new Error("Internal @babel/types error.");
									},
									{ str: t, firstInvalidLoc: r } = (0, Xt.readStringContents)(
										"template",
										t,
										0,
										0,
										0,
										{
											unterminated() {
												n = !0;
											},
											strictNumericEscape: r,
											invalidEscapeSequence: r,
											numericSeparatorInEscapeSequence: r,
											unexpectedNumericSeparator: r,
											invalidDigit: r,
											invalidCodePoint: r
										}
									);
								if (!n) throw new Error("Invalid raw");
								e.value.cooked = r ? null : t;
							}
						)
					},
					tail: { default: !1 }
				}
			}),
			f("TemplateLiteral", {
				visitor: ["quasis", "expressions"],
				aliases: ["Expression", "Literal"],
				fields: {
					quasis: (0, m.validateArrayOfType)("TemplateElement"),
					expressions: {
						validate: (0, m.chain)(
							(0, m.assertValueType)("array"),
							(0, m.assertEach)((0, m.assertNodeType)("Expression", "TSType")),
							function (e, t, n) {
								if (e.quasis.length !== n.length + 1)
									throw new TypeError(
										`Number of ${e.type} quasis should be exactly one more than the number of expressions.
Expected ${n.length + 1} quasis but got ` + e.quasis.length
									);
							}
						)
					}
				}
			}),
			f("YieldExpression", {
				builder: ["argument", "delegate"],
				visitor: ["argument"],
				aliases: ["Expression", "Terminatorless"],
				fields: {
					delegate: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertValueType)("boolean"),
									Object.assign(
										function (e, t, n) {
											if (n && !e.argument)
												throw new TypeError(
													"Property delegate of YieldExpression cannot be true if there is no argument"
												);
										},
										{ type: "boolean" }
									)
								)
							: (0, m.assertValueType)("boolean"),
						default: !1
					},
					argument: { optional: !0, validate: (0, m.assertNodeType)("Expression") }
				}
			}),
			f("AwaitExpression", {
				builder: ["argument"],
				visitor: ["argument"],
				aliases: ["Expression", "Terminatorless"],
				fields: { argument: { validate: (0, m.assertNodeType)("Expression") } }
			}),
			f("Import", { aliases: ["Expression"] }),
			f("BigIntLiteral", {
				builder: ["value"],
				fields: { value: { validate: (0, m.assertValueType)("string") } },
				aliases: ["Expression", "Pureish", "Literal", "Immutable"]
			}),
			f("ExportNamespaceSpecifier", {
				visitor: ["exported"],
				aliases: ["ModuleSpecifier"],
				fields: { exported: { validate: (0, m.assertNodeType)("Identifier") } }
			}),
			f("OptionalMemberExpression", {
				builder: ["object", "property", "computed", "optional"],
				visitor: ["object", "property"],
				aliases: ["Expression"],
				fields: {
					object: { validate: (0, m.assertNodeType)("Expression") },
					property: {
						validate: (() => {
							let r = (0, m.assertNodeType)("Identifier"),
								i = (0, m.assertNodeType)("Expression");
							return Object.assign(
								function (e, t, n) {
									(e.computed ? i : r)(e, t, n);
								},
								{ oneOfNodeTypes: ["Expression", "Identifier"] }
							);
						})()
					},
					computed: { default: !1 },
					optional: {
						validate: {}.BABEL_TYPES_8_BREAKING
							? (0, m.chain)(
									(0, m.assertValueType)("boolean"),
									(0, m.assertOptionalChainStart)()
								)
							: (0, m.assertValueType)("boolean")
					}
				}
			}),
			f("OptionalCallExpression", {
				visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
				builder: ["callee", "arguments", "optional"],
				aliases: ["Expression"],
				fields: Object.assign(
					{
						callee: { validate: (0, m.assertNodeType)("Expression") },
						arguments: (0, m.validateArrayOfType)(
							"Expression",
							"SpreadElement",
							"ArgumentPlaceholder"
						),
						optional: {
							validate: {}.BABEL_TYPES_8_BREAKING
								? (0, m.chain)(
										(0, m.assertValueType)("boolean"),
										(0, m.assertOptionalChainStart)()
									)
								: (0, m.assertValueType)("boolean")
						},
						typeArguments: {
							validate: (0, m.assertNodeType)("TypeParameterInstantiation"),
							optional: !0
						}
					},
					{
						typeParameters: {
							validate: (0, m.assertNodeType)("TSTypeParameterInstantiation"),
							optional: !0
						}
					}
				)
			}),
			f("ClassProperty", {
				visitor: ["decorators", "variance", "key", "typeAnnotation", "value"],
				builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
				aliases: ["Property"],
				fields: Object.assign({}, Wt(), {
					value: { validate: (0, m.assertNodeType)("Expression"), optional: !0 },
					definite: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					typeAnnotation: {
						validate: (0, m.assertNodeType)(
							"TypeAnnotation",
							"TSTypeAnnotation",
							"Noop"
						),
						optional: !0
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 },
					readonly: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					declare: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					variance: { validate: (0, m.assertNodeType)("Variance"), optional: !0 }
				})
			}),
			f("ClassAccessorProperty", {
				visitor: ["decorators", "key", "typeAnnotation", "value"],
				builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
				aliases: ["Property", "Accessor"],
				fields: Object.assign({}, Wt(), {
					key: {
						validate: (0, m.chain)(
							(() => {
								let r = (0, m.assertNodeType)(
										"Identifier",
										"StringLiteral",
										"NumericLiteral",
										"BigIntLiteral",
										"PrivateName"
									),
									i = (0, m.assertNodeType)("Expression");
								return function (e, t, n) {
									(e.computed ? i : r)(e, t, n);
								};
							})(),
							(0, m.assertNodeType)(
								"Identifier",
								"StringLiteral",
								"NumericLiteral",
								"BigIntLiteral",
								"Expression",
								"PrivateName"
							)
						)
					},
					value: { validate: (0, m.assertNodeType)("Expression"), optional: !0 },
					definite: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					typeAnnotation: {
						validate: (0, m.assertNodeType)(
							"TypeAnnotation",
							"TSTypeAnnotation",
							"Noop"
						),
						optional: !0
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 },
					readonly: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					declare: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					variance: { validate: (0, m.assertNodeType)("Variance"), optional: !0 }
				})
			}),
			f("ClassPrivateProperty", {
				visitor: ["decorators", "variance", "key", "typeAnnotation", "value"],
				builder: ["key", "value", "decorators", "static"],
				aliases: ["Property", "Private"],
				fields: {
					key: { validate: (0, m.assertNodeType)("PrivateName") },
					value: { validate: (0, m.assertNodeType)("Expression"), optional: !0 },
					typeAnnotation: {
						validate: (0, m.assertNodeType)(
							"TypeAnnotation",
							"TSTypeAnnotation",
							"Noop"
						),
						optional: !0
					},
					decorators: { validate: (0, m.arrayOfType)("Decorator"), optional: !0 },
					static: { validate: (0, m.assertValueType)("boolean"), default: !1 },
					readonly: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					optional: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					definite: { validate: (0, m.assertValueType)("boolean"), optional: !0 },
					variance: { validate: (0, m.assertNodeType)("Variance"), optional: !0 }
				}
			}),
			f("ClassPrivateMethod", {
				builder: ["kind", "key", "params", "body", "static"],
				visitor: ["decorators", "key", "typeParameters", "params", "returnType", "body"],
				aliases: [
					"Function",
					"Scopable",
					"BlockParent",
					"FunctionParent",
					"Method",
					"Private"
				],
				fields: Object.assign({}, h(), c(), {
					kind: {
						validate: (0, m.assertOneOf)("get", "set", "method"),
						default: "method"
					},
					key: { validate: (0, m.assertNodeType)("PrivateName") },
					body: { validate: (0, m.assertNodeType)("BlockStatement") }
				})
			}),
			f("PrivateName", {
				visitor: ["id"],
				aliases: ["Private"],
				fields: { id: { validate: (0, m.assertNodeType)("Identifier") } }
			}),
			f("StaticBlock", {
				visitor: ["body"],
				fields: { body: (0, m.validateArrayOfType)("Statement") },
				aliases: ["Scopable", "BlockParent", "FunctionParent"]
			}),
			p),
		S = y;
	let b = (0, S.defineAliasedType)("Flow");
	var Gt,
		h = e => {
			var t = "DeclareClass" === e;
			b(e, {
				builder: ["id", "typeParameters", "extends", "body"],
				visitor: [
					"id",
					"typeParameters",
					"extends",
					...(t ? ["mixins", "implements"] : []),
					"body"
				],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: Object.assign(
					{
						id: (0, S.validateType)("Identifier"),
						typeParameters: (0, S.validateOptionalType)("TypeParameterDeclaration"),
						extends: (0, S.validateOptional)((0, S.arrayOfType)("InterfaceExtends"))
					},
					t
						? {
								mixins: (0, S.validateOptional)(
									(0, S.arrayOfType)("InterfaceExtends")
								),
								implements: (0, S.validateOptional)(
									(0, S.arrayOfType)("ClassImplements")
								)
							}
						: {},
					{ body: (0, S.validateType)("ObjectTypeAnnotation") }
				)
			});
		},
		c =
			(b("AnyTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("ArrayTypeAnnotation", {
				visitor: ["elementType"],
				aliases: ["FlowType"],
				fields: { elementType: (0, S.validateType)("FlowType") }
			}),
			b("BooleanTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("BooleanLiteralTypeAnnotation", {
				builder: ["value"],
				aliases: ["FlowType"],
				fields: { value: (0, S.validate)((0, S.assertValueType)("boolean")) }
			}),
			b("NullLiteralTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("ClassImplements", {
				visitor: ["id", "typeParameters"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterInstantiation")
				}
			}),
			h("DeclareClass"),
			b("DeclareFunction", {
				builder: ["id"],
				visitor: ["id", "predicate"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					predicate: (0, S.validateOptionalType)("DeclaredPredicate")
				}
			}),
			h("DeclareInterface"),
			b("DeclareModule", {
				builder: ["id", "body", "kind"],
				visitor: ["id", "body"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: {
					id: (0, S.validateType)("Identifier", "StringLiteral"),
					body: (0, S.validateType)("BlockStatement"),
					kind: (0, S.validateOptional)((0, S.assertOneOf)("CommonJS", "ES"))
				}
			}),
			b("DeclareModuleExports", {
				visitor: ["typeAnnotation"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: { typeAnnotation: (0, S.validateType)("TypeAnnotation") }
			}),
			b("DeclareTypeAlias", {
				visitor: ["id", "typeParameters", "right"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterDeclaration"),
					right: (0, S.validateType)("FlowType")
				}
			}),
			b("DeclareOpaqueType", {
				visitor: ["id", "typeParameters", "supertype"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterDeclaration"),
					supertype: (0, S.validateOptionalType)("FlowType"),
					impltype: (0, S.validateOptionalType)("FlowType")
				}
			}),
			b("DeclareVariable", {
				visitor: ["id"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: { id: (0, S.validateType)("Identifier") }
			}),
			b("DeclareExportDeclaration", {
				visitor: ["declaration", "specifiers", "source", "attributes"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: Object.assign(
					{
						declaration: (0, S.validateOptionalType)("Flow"),
						specifiers: (0, S.validateOptional)(
							(0, S.arrayOfType)("ExportSpecifier", "ExportNamespaceSpecifier")
						),
						source: (0, S.validateOptionalType)("StringLiteral"),
						default: (0, S.validateOptional)((0, S.assertValueType)("boolean"))
					},
					d.importAttributes
				)
			}),
			b("DeclareExportAllDeclaration", {
				visitor: ["source", "attributes"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: Object.assign(
					{
						source: (0, S.validateType)("StringLiteral"),
						exportKind: (0, S.validateOptional)((0, S.assertOneOf)("type", "value"))
					},
					d.importAttributes
				)
			}),
			b("DeclaredPredicate", {
				visitor: ["value"],
				aliases: ["FlowPredicate"],
				fields: { value: (0, S.validateType)("Flow") }
			}),
			b("ExistsTypeAnnotation", { aliases: ["FlowType"] }),
			b("FunctionTypeAnnotation", {
				builder: ["typeParameters", "params", "rest", "returnType"],
				visitor: ["typeParameters", "this", "params", "rest", "returnType"],
				aliases: ["FlowType"],
				fields: {
					typeParameters: (0, S.validateOptionalType)("TypeParameterDeclaration"),
					params: (0, S.validateArrayOfType)("FunctionTypeParam"),
					rest: (0, S.validateOptionalType)("FunctionTypeParam"),
					this: (0, S.validateOptionalType)("FunctionTypeParam"),
					returnType: (0, S.validateType)("FlowType")
				}
			}),
			b("FunctionTypeParam", {
				visitor: ["name", "typeAnnotation"],
				fields: {
					name: (0, S.validateOptionalType)("Identifier"),
					typeAnnotation: (0, S.validateType)("FlowType"),
					optional: (0, S.validateOptional)((0, S.assertValueType)("boolean"))
				}
			}),
			b("GenericTypeAnnotation", {
				visitor: ["id", "typeParameters"],
				aliases: ["FlowType"],
				fields: {
					id: (0, S.validateType)("Identifier", "QualifiedTypeIdentifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterInstantiation")
				}
			}),
			b("InferredPredicate", { aliases: ["FlowPredicate"] }),
			b("InterfaceExtends", {
				visitor: ["id", "typeParameters"],
				fields: {
					id: (0, S.validateType)("Identifier", "QualifiedTypeIdentifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterInstantiation")
				}
			}),
			h("InterfaceDeclaration"),
			b("InterfaceTypeAnnotation", {
				visitor: ["extends", "body"],
				aliases: ["FlowType"],
				fields: {
					extends: (0, S.validateOptional)((0, S.arrayOfType)("InterfaceExtends")),
					body: (0, S.validateType)("ObjectTypeAnnotation")
				}
			}),
			b("IntersectionTypeAnnotation", {
				visitor: ["types"],
				aliases: ["FlowType"],
				fields: { types: (0, S.validate)((0, S.arrayOfType)("FlowType")) }
			}),
			b("MixedTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("EmptyTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("NullableTypeAnnotation", {
				visitor: ["typeAnnotation"],
				aliases: ["FlowType"],
				fields: { typeAnnotation: (0, S.validateType)("FlowType") }
			}),
			b("NumberLiteralTypeAnnotation", {
				builder: ["value"],
				aliases: ["FlowType"],
				fields: { value: (0, S.validate)((0, S.assertValueType)("number")) }
			}),
			b("NumberTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("ObjectTypeAnnotation", {
				visitor: ["properties", "indexers", "callProperties", "internalSlots"],
				aliases: ["FlowType"],
				builder: ["properties", "indexers", "callProperties", "internalSlots", "exact"],
				fields: {
					properties: (0, S.validate)(
						(0, S.arrayOfType)("ObjectTypeProperty", "ObjectTypeSpreadProperty")
					),
					indexers: {
						validate: (0, S.arrayOfType)("ObjectTypeIndexer"),
						optional: !0,
						default: []
					},
					callProperties: {
						validate: (0, S.arrayOfType)("ObjectTypeCallProperty"),
						optional: !0,
						default: []
					},
					internalSlots: {
						validate: (0, S.arrayOfType)("ObjectTypeInternalSlot"),
						optional: !0,
						default: []
					},
					exact: { validate: (0, S.assertValueType)("boolean"), default: !1 },
					inexact: (0, S.validateOptional)((0, S.assertValueType)("boolean"))
				}
			}),
			b("ObjectTypeInternalSlot", {
				visitor: ["id", "value"],
				builder: ["id", "value", "optional", "static", "method"],
				aliases: ["UserWhitespacable"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					value: (0, S.validateType)("FlowType"),
					optional: (0, S.validate)((0, S.assertValueType)("boolean")),
					static: (0, S.validate)((0, S.assertValueType)("boolean")),
					method: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("ObjectTypeCallProperty", {
				visitor: ["value"],
				aliases: ["UserWhitespacable"],
				fields: {
					value: (0, S.validateType)("FlowType"),
					static: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("ObjectTypeIndexer", {
				visitor: ["variance", "id", "key", "value"],
				builder: ["id", "key", "value", "variance"],
				aliases: ["UserWhitespacable"],
				fields: {
					id: (0, S.validateOptionalType)("Identifier"),
					key: (0, S.validateType)("FlowType"),
					value: (0, S.validateType)("FlowType"),
					static: (0, S.validate)((0, S.assertValueType)("boolean")),
					variance: (0, S.validateOptionalType)("Variance")
				}
			}),
			b("ObjectTypeProperty", {
				visitor: ["key", "value", "variance"],
				aliases: ["UserWhitespacable"],
				fields: {
					key: (0, S.validateType)("Identifier", "StringLiteral"),
					value: (0, S.validateType)("FlowType"),
					kind: (0, S.validate)((0, S.assertOneOf)("init", "get", "set")),
					static: (0, S.validate)((0, S.assertValueType)("boolean")),
					proto: (0, S.validate)((0, S.assertValueType)("boolean")),
					optional: (0, S.validate)((0, S.assertValueType)("boolean")),
					variance: (0, S.validateOptionalType)("Variance"),
					method: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("ObjectTypeSpreadProperty", {
				visitor: ["argument"],
				aliases: ["UserWhitespacable"],
				fields: { argument: (0, S.validateType)("FlowType") }
			}),
			b("OpaqueType", {
				visitor: ["id", "typeParameters", "supertype", "impltype"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterDeclaration"),
					supertype: (0, S.validateOptionalType)("FlowType"),
					impltype: (0, S.validateType)("FlowType")
				}
			}),
			b("QualifiedTypeIdentifier", {
				visitor: ["qualification", "id"],
				builder: ["id", "qualification"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					qualification: (0, S.validateType)("Identifier", "QualifiedTypeIdentifier")
				}
			}),
			b("StringLiteralTypeAnnotation", {
				builder: ["value"],
				aliases: ["FlowType"],
				fields: { value: (0, S.validate)((0, S.assertValueType)("string")) }
			}),
			b("StringTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("SymbolTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("ThisTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("TupleTypeAnnotation", {
				visitor: ["types"],
				aliases: ["FlowType"],
				fields: { types: (0, S.validate)((0, S.arrayOfType)("FlowType")) }
			}),
			b("TypeofTypeAnnotation", {
				visitor: ["argument"],
				aliases: ["FlowType"],
				fields: { argument: (0, S.validateType)("FlowType") }
			}),
			b("TypeAlias", {
				visitor: ["id", "typeParameters", "right"],
				aliases: ["FlowDeclaration", "Statement", "Declaration"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					typeParameters: (0, S.validateOptionalType)("TypeParameterDeclaration"),
					right: (0, S.validateType)("FlowType")
				}
			}),
			b("TypeAnnotation", {
				visitor: ["typeAnnotation"],
				fields: { typeAnnotation: (0, S.validateType)("FlowType") }
			}),
			b("TypeCastExpression", {
				visitor: ["expression", "typeAnnotation"],
				aliases: ["ExpressionWrapper", "Expression"],
				fields: {
					expression: (0, S.validateType)("Expression"),
					typeAnnotation: (0, S.validateType)("TypeAnnotation")
				}
			}),
			b("TypeParameter", {
				visitor: ["bound", "default", "variance"],
				fields: {
					name: (0, S.validate)((0, S.assertValueType)("string")),
					bound: (0, S.validateOptionalType)("TypeAnnotation"),
					default: (0, S.validateOptionalType)("FlowType"),
					variance: (0, S.validateOptionalType)("Variance")
				}
			}),
			b("TypeParameterDeclaration", {
				visitor: ["params"],
				fields: { params: (0, S.validate)((0, S.arrayOfType)("TypeParameter")) }
			}),
			b("TypeParameterInstantiation", {
				visitor: ["params"],
				fields: { params: (0, S.validate)((0, S.arrayOfType)("FlowType")) }
			}),
			b("UnionTypeAnnotation", {
				visitor: ["types"],
				aliases: ["FlowType"],
				fields: { types: (0, S.validate)((0, S.arrayOfType)("FlowType")) }
			}),
			b("Variance", {
				builder: ["kind"],
				fields: { kind: (0, S.validate)((0, S.assertOneOf)("minus", "plus")) }
			}),
			b("VoidTypeAnnotation", { aliases: ["FlowType", "FlowBaseAnnotation"] }),
			b("EnumDeclaration", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "body"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					body: (0, S.validateType)(
						"EnumBooleanBody",
						"EnumNumberBody",
						"EnumStringBody",
						"EnumSymbolBody"
					)
				}
			}),
			b("EnumBooleanBody", {
				aliases: ["EnumBody"],
				visitor: ["members"],
				fields: {
					explicitType: (0, S.validate)((0, S.assertValueType)("boolean")),
					members: (0, S.validateArrayOfType)("EnumBooleanMember"),
					hasUnknownMembers: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("EnumNumberBody", {
				aliases: ["EnumBody"],
				visitor: ["members"],
				fields: {
					explicitType: (0, S.validate)((0, S.assertValueType)("boolean")),
					members: (0, S.validateArrayOfType)("EnumNumberMember"),
					hasUnknownMembers: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("EnumStringBody", {
				aliases: ["EnumBody"],
				visitor: ["members"],
				fields: {
					explicitType: (0, S.validate)((0, S.assertValueType)("boolean")),
					members: (0, S.validateArrayOfType)("EnumStringMember", "EnumDefaultedMember"),
					hasUnknownMembers: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("EnumSymbolBody", {
				aliases: ["EnumBody"],
				visitor: ["members"],
				fields: {
					members: (0, S.validateArrayOfType)("EnumDefaultedMember"),
					hasUnknownMembers: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			b("EnumBooleanMember", {
				aliases: ["EnumMember"],
				builder: ["id"],
				visitor: ["id", "init"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					init: (0, S.validateType)("BooleanLiteral")
				}
			}),
			b("EnumNumberMember", {
				aliases: ["EnumMember"],
				visitor: ["id", "init"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					init: (0, S.validateType)("NumericLiteral")
				}
			}),
			b("EnumStringMember", {
				aliases: ["EnumMember"],
				visitor: ["id", "init"],
				fields: {
					id: (0, S.validateType)("Identifier"),
					init: (0, S.validateType)("StringLiteral")
				}
			}),
			b("EnumDefaultedMember", {
				aliases: ["EnumMember"],
				visitor: ["id"],
				fields: { id: (0, S.validateType)("Identifier") }
			}),
			b("IndexedAccessType", {
				visitor: ["objectType", "indexType"],
				aliases: ["FlowType"],
				fields: {
					objectType: (0, S.validateType)("FlowType"),
					indexType: (0, S.validateType)("FlowType")
				}
			}),
			b("OptionalIndexedAccessType", {
				visitor: ["objectType", "indexType"],
				aliases: ["FlowType"],
				fields: {
					objectType: (0, S.validateType)("FlowType"),
					indexType: (0, S.validateType)("FlowType"),
					optional: (0, S.validate)((0, S.assertValueType)("boolean"))
				}
			}),
			y),
		f = (0, c.defineAliasedType)("JSX"),
		d =
			(f("JSXAttribute", {
				visitor: ["name", "value"],
				aliases: ["Immutable"],
				fields: {
					name: { validate: (0, c.assertNodeType)("JSXIdentifier", "JSXNamespacedName") },
					value: {
						optional: !0,
						validate: (0, c.assertNodeType)(
							"JSXElement",
							"JSXFragment",
							"StringLiteral",
							"JSXExpressionContainer"
						)
					}
				}
			}),
			f("JSXClosingElement", {
				visitor: ["name"],
				aliases: ["Immutable"],
				fields: {
					name: {
						validate: (0, c.assertNodeType)(
							"JSXIdentifier",
							"JSXMemberExpression",
							"JSXNamespacedName"
						)
					}
				}
			}),
			f("JSXElement", {
				builder: ["openingElement", "closingElement", "children", "selfClosing"],
				visitor: ["openingElement", "children", "closingElement"],
				aliases: ["Immutable", "Expression"],
				fields: Object.assign(
					{
						openingElement: { validate: (0, c.assertNodeType)("JSXOpeningElement") },
						closingElement: {
							optional: !0,
							validate: (0, c.assertNodeType)("JSXClosingElement")
						},
						children: (0, c.validateArrayOfType)(
							"JSXText",
							"JSXExpressionContainer",
							"JSXSpreadChild",
							"JSXElement",
							"JSXFragment"
						)
					},
					{ selfClosing: { validate: (0, c.assertValueType)("boolean"), optional: !0 } }
				)
			}),
			f("JSXEmptyExpression", {}),
			f("JSXExpressionContainer", {
				visitor: ["expression"],
				aliases: ["Immutable"],
				fields: {
					expression: {
						validate: (0, c.assertNodeType)("Expression", "JSXEmptyExpression")
					}
				}
			}),
			f("JSXSpreadChild", {
				visitor: ["expression"],
				aliases: ["Immutable"],
				fields: { expression: { validate: (0, c.assertNodeType)("Expression") } }
			}),
			f("JSXIdentifier", {
				builder: ["name"],
				fields: { name: { validate: (0, c.assertValueType)("string") } }
			}),
			f("JSXMemberExpression", {
				visitor: ["object", "property"],
				fields: {
					object: {
						validate: (0, c.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
					},
					property: { validate: (0, c.assertNodeType)("JSXIdentifier") }
				}
			}),
			f("JSXNamespacedName", {
				visitor: ["namespace", "name"],
				fields: {
					namespace: { validate: (0, c.assertNodeType)("JSXIdentifier") },
					name: { validate: (0, c.assertNodeType)("JSXIdentifier") }
				}
			}),
			f("JSXOpeningElement", {
				builder: ["name", "attributes", "selfClosing"],
				visitor: ["name", "typeParameters", "typeArguments", "attributes"],
				aliases: ["Immutable"],
				fields: Object.assign(
					{
						name: {
							validate: (0, c.assertNodeType)(
								"JSXIdentifier",
								"JSXMemberExpression",
								"JSXNamespacedName"
							)
						},
						selfClosing: { default: !1 },
						attributes: (0, c.validateArrayOfType)(
							"JSXAttribute",
							"JSXSpreadAttribute"
						),
						typeArguments: {
							validate: (0, c.assertNodeType)("TypeParameterInstantiation"),
							optional: !0
						}
					},
					{
						typeParameters: {
							validate: (0, c.assertNodeType)("TSTypeParameterInstantiation"),
							optional: !0
						}
					}
				)
			}),
			f("JSXSpreadAttribute", {
				visitor: ["argument"],
				fields: { argument: { validate: (0, c.assertNodeType)("Expression") } }
			}),
			f("JSXText", {
				aliases: ["Immutable"],
				builder: ["value"],
				fields: { value: { validate: (0, c.assertValueType)("string") } }
			}),
			f("JSXFragment", {
				builder: ["openingFragment", "closingFragment", "children"],
				visitor: ["openingFragment", "children", "closingFragment"],
				aliases: ["Immutable", "Expression"],
				fields: {
					openingFragment: { validate: (0, c.assertNodeType)("JSXOpeningFragment") },
					closingFragment: { validate: (0, c.assertNodeType)("JSXClosingFragment") },
					children: (0, c.validateArrayOfType)(
						"JSXText",
						"JSXExpressionContainer",
						"JSXSpreadChild",
						"JSXElement",
						"JSXFragment"
					)
				}
			}),
			f("JSXOpeningFragment", { aliases: ["Immutable"] }),
			f("JSXClosingFragment", { aliases: ["Immutable"] }),
			{}),
		zt =
			(Object.defineProperty(d, "__esModule", { value: !0 }),
			(d.PLACEHOLDERS_FLIPPED_ALIAS = d.PLACEHOLDERS_ALIAS = d.PLACEHOLDERS = void 0),
			y),
		h = (d.PLACEHOLDERS = [
			"Identifier",
			"StringLiteral",
			"Expression",
			"Statement",
			"Declaration",
			"BlockStatement",
			"ClassBody",
			"Pattern"
		]);
	let Ht = (d.PLACEHOLDERS_ALIAS = {
		Declaration: ["Statement"],
		Pattern: ["PatternLike", "LVal"]
	});
	for (Gt of h) {
		var $t = zt.ALIAS_KEYS[Gt];
		null != $t && $t.length && (Ht[Gt] = $t);
	}
	let Qt = (d.PLACEHOLDERS_FLIPPED_ALIAS = {});
	Object.keys(Ht).forEach(t => {
		Ht[t].forEach(e => {
			hasOwnProperty.call(Qt, e) || (Qt[e] = []), Qt[e].push(t);
		});
	});
	var c = y,
		f = d,
		h = p,
		E = (0, c.defineAliasedType)("Miscellaneous"),
		f =
			(E("Noop", { visitor: [] }),
			E("Placeholder", {
				visitor: [],
				builder: ["expectedNode", "name"],
				fields: Object.assign(
					{
						name: { validate: (0, c.assertNodeType)("Identifier") },
						expectedNode: { validate: (0, c.assertOneOf)(...f.PLACEHOLDERS) }
					},
					(0, h.patternLikeCommon)()
				)
			}),
			E("V8IntrinsicIdentifier", {
				builder: ["name"],
				fields: { name: { validate: (0, c.assertValueType)("string") } }
			}),
			y),
		v =
			((0, f.default)("ArgumentPlaceholder", {}),
			(0, f.default)("BindExpression", {
				visitor: ["object", "callee"],
				aliases: ["Expression"],
				fields: {}.BABEL_TYPES_8_BREAKING
					? {
							object: { validate: (0, f.assertNodeType)("Expression") },
							callee: { validate: (0, f.assertNodeType)("Expression") }
						}
					: {
							object: {
								validate: Object.assign(() => {}, {
									oneOfNodeTypes: ["Expression"]
								})
							},
							callee: {
								validate: Object.assign(() => {}, {
									oneOfNodeTypes: ["Expression"]
								})
							}
						}
			}),
			(0, f.default)("ImportAttribute", {
				visitor: ["key", "value"],
				fields: {
					key: { validate: (0, f.assertNodeType)("Identifier", "StringLiteral") },
					value: { validate: (0, f.assertNodeType)("StringLiteral") }
				}
			}),
			(0, f.default)("Decorator", {
				visitor: ["expression"],
				fields: { expression: { validate: (0, f.assertNodeType)("Expression") } }
			}),
			(0, f.default)("DoExpression", {
				visitor: ["body"],
				builder: ["body", "async"],
				aliases: ["Expression"],
				fields: {
					body: { validate: (0, f.assertNodeType)("BlockStatement") },
					async: { validate: (0, f.assertValueType)("boolean"), default: !1 }
				}
			}),
			(0, f.default)("ExportDefaultSpecifier", {
				visitor: ["exported"],
				aliases: ["ModuleSpecifier"],
				fields: { exported: { validate: (0, f.assertNodeType)("Identifier") } }
			}),
			(0, f.default)("RecordExpression", {
				visitor: ["properties"],
				aliases: ["Expression"],
				fields: {
					properties: (0, f.validateArrayOfType)("ObjectProperty", "SpreadElement")
				}
			}),
			(0, f.default)("TupleExpression", {
				fields: {
					elements: {
						validate: (0, f.arrayOfType)("Expression", "SpreadElement"),
						default: []
					}
				},
				visitor: ["elements"],
				aliases: ["Expression"]
			}),
			(0, f.default)("DecimalLiteral", {
				builder: ["value"],
				fields: { value: { validate: (0, f.assertValueType)("string") } },
				aliases: ["Expression", "Pureish", "Literal", "Immutable"]
			}),
			(0, f.default)("ModuleExpression", {
				visitor: ["body"],
				fields: { body: { validate: (0, f.assertNodeType)("Program") } },
				aliases: ["Expression"]
			}),
			(0, f.default)("TopicReference", { aliases: ["Expression"] }),
			(0, f.default)("PipelineTopicExpression", {
				builder: ["expression"],
				visitor: ["expression"],
				fields: { expression: { validate: (0, f.assertNodeType)("Expression") } },
				aliases: ["Expression"]
			}),
			(0, f.default)("PipelineBareFunction", {
				builder: ["callee"],
				visitor: ["callee"],
				fields: { callee: { validate: (0, f.assertNodeType)("Expression") } },
				aliases: ["Expression"]
			}),
			(0, f.default)("PipelinePrimaryTopicReference", { aliases: ["Expression"] }),
			y),
		h = p,
		Zt = Fe,
		P = (0, v.defineAliasedType)("TypeScript");
	let en = (0, v.assertValueType)("boolean");
	var tn,
		E = () => ({
			returnType: {
				validate: (0, v.assertNodeType)("TSTypeAnnotation", "Noop"),
				optional: !0
			},
			typeParameters: {
				validate: (0, v.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
				optional: !0
			}
		}),
		c =
			(P("TSParameterProperty", {
				aliases: ["LVal"],
				visitor: ["parameter"],
				fields: {
					accessibility: {
						validate: (0, v.assertOneOf)("public", "private", "protected"),
						optional: !0
					},
					readonly: { validate: (0, v.assertValueType)("boolean"), optional: !0 },
					parameter: {
						validate: (0, v.assertNodeType)("Identifier", "AssignmentPattern")
					},
					override: { validate: (0, v.assertValueType)("boolean"), optional: !0 },
					decorators: { validate: (0, v.arrayOfType)("Decorator"), optional: !0 }
				}
			}),
			P("TSDeclareFunction", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "typeParameters", "params", "returnType"],
				fields: Object.assign({}, (0, h.functionDeclarationCommon)(), E())
			}),
			P("TSDeclareMethod", {
				visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
				fields: Object.assign({}, (0, h.classMethodOrDeclareMethodCommon)(), E())
			}),
			P("TSQualifiedName", {
				aliases: ["TSEntityName"],
				visitor: ["left", "right"],
				fields: {
					left: (0, v.validateType)("TSEntityName"),
					right: (0, v.validateType)("Identifier")
				}
			}),
			() => ({
				typeParameters: (0, v.validateOptionalType)("TSTypeParameterDeclaration"),
				parameters: (0, v.validateArrayOfType)(
					"ArrayPattern",
					"Identifier",
					"ObjectPattern",
					"RestElement"
				),
				typeAnnotation: (0, v.validateOptionalType)("TSTypeAnnotation")
			})),
		f = {
			aliases: ["TSTypeElement"],
			visitor: ["typeParameters", "parameters", "typeAnnotation"],
			fields: c()
		},
		p =
			(P("TSCallSignatureDeclaration", f),
			P("TSConstructSignatureDeclaration", f),
			() => ({
				key: (0, v.validateType)("Expression"),
				computed: { default: !1 },
				optional: (0, v.validateOptional)(en)
			}));
	P("TSPropertySignature", {
		aliases: ["TSTypeElement"],
		visitor: ["key", "typeAnnotation"],
		fields: Object.assign({}, p(), {
			readonly: (0, v.validateOptional)(en),
			typeAnnotation: (0, v.validateOptionalType)("TSTypeAnnotation"),
			kind: { optional: !0, validate: (0, v.assertOneOf)("get", "set") }
		})
	}),
		P("TSMethodSignature", {
			aliases: ["TSTypeElement"],
			visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
			fields: Object.assign({}, c(), p(), {
				kind: { validate: (0, v.assertOneOf)("method", "get", "set") }
			})
		}),
		P("TSIndexSignature", {
			aliases: ["TSTypeElement"],
			visitor: ["parameters", "typeAnnotation"],
			fields: {
				readonly: (0, v.validateOptional)(en),
				static: (0, v.validateOptional)(en),
				parameters: (0, v.validateArrayOfType)("Identifier"),
				typeAnnotation: (0, v.validateOptionalType)("TSTypeAnnotation")
			}
		});
	for (tn of [
		"TSAnyKeyword",
		"TSBooleanKeyword",
		"TSBigIntKeyword",
		"TSIntrinsicKeyword",
		"TSNeverKeyword",
		"TSNullKeyword",
		"TSNumberKeyword",
		"TSObjectKeyword",
		"TSStringKeyword",
		"TSSymbolKeyword",
		"TSUndefinedKeyword",
		"TSUnknownKeyword",
		"TSVoidKeyword"
	])
		P(tn, { aliases: ["TSType", "TSBaseType"], visitor: [], fields: {} });
	P("TSThisType", { aliases: ["TSType", "TSBaseType"], visitor: [], fields: {} });
	var nn,
		rn,
		an,
		h = { aliases: ["TSType"], visitor: ["typeParameters", "parameters", "typeAnnotation"] },
		E =
			(P("TSFunctionType", Object.assign({}, h, { fields: c() })),
			P(
				"TSConstructorType",
				Object.assign({}, h, {
					fields: Object.assign({}, c(), { abstract: (0, v.validateOptional)(en) })
				})
			),
			P("TSTypeReference", {
				aliases: ["TSType"],
				visitor: ["typeName", "typeParameters"],
				fields: {
					typeName: (0, v.validateType)("TSEntityName"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterInstantiation")
				}
			}),
			P("TSTypePredicate", {
				aliases: ["TSType"],
				visitor: ["parameterName", "typeAnnotation"],
				builder: ["parameterName", "typeAnnotation", "asserts"],
				fields: {
					parameterName: (0, v.validateType)("Identifier", "TSThisType"),
					typeAnnotation: (0, v.validateOptionalType)("TSTypeAnnotation"),
					asserts: (0, v.validateOptional)(en)
				}
			}),
			P("TSTypeQuery", {
				aliases: ["TSType"],
				visitor: ["exprName", "typeParameters"],
				fields: {
					exprName: (0, v.validateType)("TSEntityName", "TSImportType"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterInstantiation")
				}
			}),
			P("TSTypeLiteral", {
				aliases: ["TSType"],
				visitor: ["members"],
				fields: { members: (0, v.validateArrayOfType)("TSTypeElement") }
			}),
			P("TSArrayType", {
				aliases: ["TSType"],
				visitor: ["elementType"],
				fields: { elementType: (0, v.validateType)("TSType") }
			}),
			P("TSTupleType", {
				aliases: ["TSType"],
				visitor: ["elementTypes"],
				fields: { elementTypes: (0, v.validateArrayOfType)("TSType", "TSNamedTupleMember") }
			}),
			P("TSOptionalType", {
				aliases: ["TSType"],
				visitor: ["typeAnnotation"],
				fields: { typeAnnotation: (0, v.validateType)("TSType") }
			}),
			P("TSRestType", {
				aliases: ["TSType"],
				visitor: ["typeAnnotation"],
				fields: { typeAnnotation: (0, v.validateType)("TSType") }
			}),
			P("TSNamedTupleMember", {
				visitor: ["label", "elementType"],
				builder: ["label", "elementType", "optional"],
				fields: {
					label: (0, v.validateType)("Identifier"),
					optional: { validate: en, default: !1 },
					elementType: (0, v.validateType)("TSType")
				}
			}),
			{
				aliases: ["TSType"],
				visitor: ["types"],
				fields: { types: (0, v.validateArrayOfType)("TSType") }
			}),
		f =
			(P("TSUnionType", E),
			P("TSIntersectionType", E),
			P("TSConditionalType", {
				aliases: ["TSType"],
				visitor: ["checkType", "extendsType", "trueType", "falseType"],
				fields: {
					checkType: (0, v.validateType)("TSType"),
					extendsType: (0, v.validateType)("TSType"),
					trueType: (0, v.validateType)("TSType"),
					falseType: (0, v.validateType)("TSType")
				}
			}),
			P("TSInferType", {
				aliases: ["TSType"],
				visitor: ["typeParameter"],
				fields: { typeParameter: (0, v.validateType)("TSTypeParameter") }
			}),
			P("TSParenthesizedType", {
				aliases: ["TSType"],
				visitor: ["typeAnnotation"],
				fields: { typeAnnotation: (0, v.validateType)("TSType") }
			}),
			P("TSTypeOperator", {
				aliases: ["TSType"],
				visitor: ["typeAnnotation"],
				fields: {
					operator: (0, v.validate)((0, v.assertValueType)("string")),
					typeAnnotation: (0, v.validateType)("TSType")
				}
			}),
			P("TSIndexedAccessType", {
				aliases: ["TSType"],
				visitor: ["objectType", "indexType"],
				fields: {
					objectType: (0, v.validateType)("TSType"),
					indexType: (0, v.validateType)("TSType")
				}
			}),
			P("TSMappedType", {
				aliases: ["TSType"],
				visitor: ["typeParameter", "nameType", "typeAnnotation"],
				builder: ["typeParameter", "typeAnnotation", "nameType"],
				fields: Object.assign(
					{},
					{ typeParameter: (0, v.validateType)("TSTypeParameter") },
					{
						readonly: (0, v.validateOptional)((0, v.assertOneOf)(!0, !1, "+", "-")),
						optional: (0, v.validateOptional)((0, v.assertOneOf)(!0, !1, "+", "-")),
						typeAnnotation: (0, v.validateOptionalType)("TSType"),
						nameType: (0, v.validateOptionalType)("TSType")
					}
				)
			}),
			P("TSTemplateLiteralType", {
				aliases: ["TSType", "TSBaseType"],
				visitor: ["quasis", "types"],
				fields: {
					quasis: (0, v.validateArrayOfType)("TemplateElement"),
					types: {
						validate: (0, v.chain)(
							(0, v.assertValueType)("array"),
							(0, v.assertEach)((0, v.assertNodeType)("TSType")),
							function (e, t, n) {
								if (e.quasis.length !== n.length + 1)
									throw new TypeError(
										`Number of ${e.type} quasis should be exactly one more than the number of types.
Expected ${n.length + 1} quasis but got ` + e.quasis.length
									);
							}
						)
					}
				}
			}),
			P("TSLiteralType", {
				aliases: ["TSType", "TSBaseType"],
				visitor: ["literal"],
				fields: {
					literal: {
						validate: (() => {
							let r = (0, v.assertNodeType)("NumericLiteral", "BigIntLiteral"),
								i = (0, v.assertOneOf)("-"),
								a = (0, v.assertNodeType)(
									"NumericLiteral",
									"StringLiteral",
									"BooleanLiteral",
									"BigIntLiteral",
									"TemplateLiteral"
								);
							function e(e, t, n) {
								(0, Zt.default)("UnaryExpression", n)
									? (i(n, "operator", n.operator), r(n, "argument", n.argument))
									: a(e, t, n);
							}
							return (
								(e.oneOfNodeTypes = [
									"NumericLiteral",
									"StringLiteral",
									"BooleanLiteral",
									"BigIntLiteral",
									"TemplateLiteral",
									"UnaryExpression"
								]),
								e
							);
						})()
					}
				}
			}),
			P("TSExpressionWithTypeArguments", {
				aliases: ["TSType"],
				visitor: ["expression", "typeParameters"],
				fields: {
					expression: (0, v.validateType)("TSEntityName"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterInstantiation")
				}
			}),
			P("TSInterfaceDeclaration", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "typeParameters", "extends", "body"],
				fields: {
					declare: (0, v.validateOptional)(en),
					id: (0, v.validateType)("Identifier"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterDeclaration"),
					extends: (0, v.validateOptional)(
						(0, v.arrayOfType)("TSExpressionWithTypeArguments")
					),
					body: (0, v.validateType)("TSInterfaceBody")
				}
			}),
			P("TSInterfaceBody", {
				visitor: ["body"],
				fields: { body: (0, v.validateArrayOfType)("TSTypeElement") }
			}),
			P("TSTypeAliasDeclaration", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "typeParameters", "typeAnnotation"],
				fields: {
					declare: (0, v.validateOptional)(en),
					id: (0, v.validateType)("Identifier"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterDeclaration"),
					typeAnnotation: (0, v.validateType)("TSType")
				}
			}),
			P("TSInstantiationExpression", {
				aliases: ["Expression"],
				visitor: ["expression", "typeParameters"],
				fields: {
					expression: (0, v.validateType)("Expression"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterInstantiation")
				}
			}),
			{
				aliases: ["Expression", "LVal", "PatternLike"],
				visitor: ["expression", "typeAnnotation"],
				fields: {
					expression: (0, v.validateType)("Expression"),
					typeAnnotation: (0, v.validateType)("TSType")
				}
			}),
		p =
			(P("TSAsExpression", f),
			P("TSSatisfiesExpression", f),
			P("TSTypeAssertion", {
				aliases: ["Expression", "LVal", "PatternLike"],
				visitor: ["typeAnnotation", "expression"],
				fields: {
					typeAnnotation: (0, v.validateType)("TSType"),
					expression: (0, v.validateType)("Expression")
				}
			}),
			P("TSEnumBody", {
				visitor: ["members"],
				fields: { members: (0, v.validateArrayOfType)("TSEnumMember") }
			}),
			P("TSEnumDeclaration", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "members"],
				fields: {
					declare: (0, v.validateOptional)(en),
					const: (0, v.validateOptional)(en),
					id: (0, v.validateType)("Identifier"),
					members: (0, v.validateArrayOfType)("TSEnumMember"),
					initializer: (0, v.validateOptionalType)("Expression"),
					body: (0, v.validateOptionalType)("TSEnumBody")
				}
			}),
			P("TSEnumMember", {
				visitor: ["id", "initializer"],
				fields: {
					id: (0, v.validateType)("Identifier", "StringLiteral"),
					initializer: (0, v.validateOptionalType)("Expression")
				}
			}),
			P("TSModuleDeclaration", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "body"],
				fields: Object.assign(
					{
						kind: { validate: (0, v.assertOneOf)("global", "module", "namespace") },
						declare: (0, v.validateOptional)(en)
					},
					{ global: (0, v.validateOptional)(en) },
					{
						id: (0, v.validateType)("Identifier", "StringLiteral"),
						body: (0, v.validateType)("TSModuleBlock", "TSModuleDeclaration")
					}
				)
			}),
			P("TSModuleBlock", {
				aliases: ["Scopable", "Block", "BlockParent", "FunctionParent"],
				visitor: ["body"],
				fields: { body: (0, v.validateArrayOfType)("Statement") }
			}),
			P("TSImportType", {
				aliases: ["TSType"],
				builder: ["argument", "qualifier", "typeParameters"],
				visitor: ["argument", "options", "qualifier", "typeParameters"],
				fields: {
					argument: (0, v.validateType)("StringLiteral"),
					qualifier: (0, v.validateOptionalType)("TSEntityName"),
					typeParameters: (0, v.validateOptionalType)("TSTypeParameterInstantiation"),
					options: { validate: (0, v.assertNodeType)("Expression"), optional: !0 }
				}
			}),
			P("TSImportEqualsDeclaration", {
				aliases: ["Statement", "Declaration"],
				visitor: ["id", "moduleReference"],
				fields: Object.assign(
					{},
					{ isExport: (0, v.validate)(en) },
					{
						id: (0, v.validateType)("Identifier"),
						moduleReference: (0, v.validateType)(
							"TSEntityName",
							"TSExternalModuleReference"
						),
						importKind: { validate: (0, v.assertOneOf)("type", "value"), optional: !0 }
					}
				)
			}),
			P("TSExternalModuleReference", {
				visitor: ["expression"],
				fields: { expression: (0, v.validateType)("StringLiteral") }
			}),
			P("TSNonNullExpression", {
				aliases: ["Expression", "LVal", "PatternLike"],
				visitor: ["expression"],
				fields: { expression: (0, v.validateType)("Expression") }
			}),
			P("TSExportAssignment", {
				aliases: ["Statement"],
				visitor: ["expression"],
				fields: { expression: (0, v.validateType)("Expression") }
			}),
			P("TSNamespaceExportDeclaration", {
				aliases: ["Statement"],
				visitor: ["id"],
				fields: { id: (0, v.validateType)("Identifier") }
			}),
			P("TSTypeAnnotation", {
				visitor: ["typeAnnotation"],
				fields: { typeAnnotation: { validate: (0, v.assertNodeType)("TSType") } }
			}),
			P("TSTypeParameterInstantiation", {
				visitor: ["params"],
				fields: { params: (0, v.validateArrayOfType)("TSType") }
			}),
			P("TSTypeParameterDeclaration", {
				visitor: ["params"],
				fields: { params: (0, v.validateArrayOfType)("TSTypeParameter") }
			}),
			P("TSTypeParameter", {
				builder: ["constraint", "default", "name"],
				visitor: ["constraint", "default"],
				fields: {
					name: { validate: (0, v.assertValueType)("string") },
					in: { validate: (0, v.assertValueType)("boolean"), optional: !0 },
					out: { validate: (0, v.assertValueType)("boolean"), optional: !0 },
					const: { validate: (0, v.assertValueType)("boolean"), optional: !0 },
					constraint: { validate: (0, v.assertNodeType)("TSType"), optional: !0 },
					default: { validate: (0, v.assertNodeType)("TSType"), optional: !0 }
				}
			}),
			{}),
		on =
			(Object.defineProperty(p, "__esModule", { value: !0 }),
			(p.DEPRECATED_ALIASES = void 0),
			(p.DEPRECATED_ALIASES = { ModuleDeclaration: "ImportOrExportDeclaration" }),
			(h = Be),
			Object.defineProperty(h, "__esModule", { value: !0 }),
			Object.defineProperty(h, "ALIAS_KEYS", {
				enumerable: !0,
				get: function () {
					return nn.ALIAS_KEYS;
				}
			}),
			Object.defineProperty(h, "BUILDER_KEYS", {
				enumerable: !0,
				get: function () {
					return nn.BUILDER_KEYS;
				}
			}),
			Object.defineProperty(h, "DEPRECATED_ALIASES", {
				enumerable: !0,
				get: function () {
					return an.DEPRECATED_ALIASES;
				}
			}),
			Object.defineProperty(h, "DEPRECATED_KEYS", {
				enumerable: !0,
				get: function () {
					return nn.DEPRECATED_KEYS;
				}
			}),
			Object.defineProperty(h, "FLIPPED_ALIAS_KEYS", {
				enumerable: !0,
				get: function () {
					return nn.FLIPPED_ALIAS_KEYS;
				}
			}),
			Object.defineProperty(h, "NODE_FIELDS", {
				enumerable: !0,
				get: function () {
					return nn.NODE_FIELDS;
				}
			}),
			Object.defineProperty(h, "NODE_PARENT_VALIDATIONS", {
				enumerable: !0,
				get: function () {
					return nn.NODE_PARENT_VALIDATIONS;
				}
			}),
			Object.defineProperty(h, "PLACEHOLDERS", {
				enumerable: !0,
				get: function () {
					return rn.PLACEHOLDERS;
				}
			}),
			Object.defineProperty(h, "PLACEHOLDERS_ALIAS", {
				enumerable: !0,
				get: function () {
					return rn.PLACEHOLDERS_ALIAS;
				}
			}),
			Object.defineProperty(h, "PLACEHOLDERS_FLIPPED_ALIAS", {
				enumerable: !0,
				get: function () {
					return rn.PLACEHOLDERS_FLIPPED_ALIAS;
				}
			}),
			(h.TYPES = void 0),
			Object.defineProperty(h, "VISITOR_KEYS", {
				enumerable: !0,
				get: function () {
					return nn.VISITOR_KEYS;
				}
			}),
			(nn = y),
			(rn = d),
			(an = p),
			Object.keys(an.DEPRECATED_ALIASES).forEach(e => {
				nn.FLIPPED_ALIAS_KEYS[e] = nn.FLIPPED_ALIAS_KEYS[an.DEPRECATED_ALIASES[e]];
			}),
			(h.TYPES = [].concat(
				Object.keys(nn.VISITOR_KEYS),
				Object.keys(nn.FLIPPED_ALIAS_KEYS),
				Object.keys(nn.DEPRECATED_KEYS)
			)),
			Object.defineProperty(Me, "__esModule", { value: !0 }),
			(Me.default = function (e, t, n) {
				var r;
				e && (r = on.NODE_FIELDS[e.type]) && ((r = r[t]), sn(e, t, n, r), ln(e, t, n));
			}),
			(Me.validateChild = ln),
			(Me.validateField = sn),
			(Me.validateInternal = function (e, t, n, r, i) {
				null == e ||
					!e.validate ||
					(e.optional && null == r) ||
					(e.validate(t, n, r),
					i &&
						null != (e = r.type) &&
						null != (i = on.NODE_PARENT_VALIDATIONS[e]) &&
						i.call(on.NODE_PARENT_VALIDATIONS, t, n, r));
			}),
			Be);
	function sn(e, t, n, r) {
		null == r || !r.validate || (r.optional && null == n) || r.validate(e, t, n);
	}
	function ln(e, t, n) {
		var r = null == n ? void 0 : n.type;
		null != r &&
			null != (r = on.NODE_PARENT_VALIDATIONS[r]) &&
			r.call(on.NODE_PARENT_VALIDATIONS, e, t, n);
	}
	Object.defineProperty(l, "__esModule", { value: !0 }),
		(l.anyTypeAnnotation = function () {
			return { type: "AnyTypeAnnotation" };
		}),
		(l.argumentPlaceholder = function () {
			return { type: "ArgumentPlaceholder" };
		}),
		(l.arrayExpression = function (e = []) {
			var t = { type: "ArrayExpression", elements: e },
				n = A.ArrayExpression;
			return x(n.elements, t, "elements", e, 1), t;
		}),
		(l.arrayPattern = function (e) {
			var t = { type: "ArrayPattern", elements: e },
				n = A.ArrayPattern;
			return x(n.elements, t, "elements", e, 1), t;
		}),
		(l.arrayTypeAnnotation = function (e) {
			var t = { type: "ArrayTypeAnnotation", elementType: e },
				n = A.ArrayTypeAnnotation;
			return x(n.elementType, t, "elementType", e, 1), t;
		}),
		(l.arrowFunctionExpression = function (e, t, n = !1) {
			var r = {
					type: "ArrowFunctionExpression",
					params: e,
					body: t,
					async: n,
					expression: null
				},
				i = A.ArrowFunctionExpression;
			return (
				x(i.params, r, "params", e, 1),
				x(i.body, r, "body", t, 1),
				x(i.async, r, "async", n),
				r
			);
		}),
		(l.assignmentExpression = function (e, t, n) {
			var r = { type: "AssignmentExpression", operator: e, left: t, right: n },
				i = A.AssignmentExpression;
			return (
				x(i.operator, r, "operator", e),
				x(i.left, r, "left", t, 1),
				x(i.right, r, "right", n, 1),
				r
			);
		}),
		(l.assignmentPattern = function (e, t) {
			var n = { type: "AssignmentPattern", left: e, right: t },
				r = A.AssignmentPattern;
			return x(r.left, n, "left", e, 1), x(r.right, n, "right", t, 1), n;
		}),
		(l.awaitExpression = function (e) {
			var t = { type: "AwaitExpression", argument: e },
				n = A.AwaitExpression;
			return x(n.argument, t, "argument", e, 1), t;
		}),
		(l.bigIntLiteral = function (e) {
			var t = { type: "BigIntLiteral", value: e },
				n = A.BigIntLiteral;
			return x(n.value, t, "value", e), t;
		}),
		(l.binaryExpression = function (e, t, n) {
			var r = { type: "BinaryExpression", operator: e, left: t, right: n },
				i = A.BinaryExpression;
			return (
				x(i.operator, r, "operator", e),
				x(i.left, r, "left", t, 1),
				x(i.right, r, "right", n, 1),
				r
			);
		}),
		(l.bindExpression = function (e, t) {
			var n = { type: "BindExpression", object: e, callee: t },
				r = A.BindExpression;
			return x(r.object, n, "object", e, 1), x(r.callee, n, "callee", t, 1), n;
		}),
		(l.blockStatement = function (e, t = []) {
			var n = { type: "BlockStatement", body: e, directives: t },
				r = A.BlockStatement;
			return x(r.body, n, "body", e, 1), x(r.directives, n, "directives", t, 1), n;
		}),
		(l.booleanLiteral = function (e) {
			var t = { type: "BooleanLiteral", value: e },
				n = A.BooleanLiteral;
			return x(n.value, t, "value", e), t;
		}),
		(l.booleanLiteralTypeAnnotation = function (e) {
			var t = { type: "BooleanLiteralTypeAnnotation", value: e },
				n = A.BooleanLiteralTypeAnnotation;
			return x(n.value, t, "value", e), t;
		}),
		(l.booleanTypeAnnotation = function () {
			return { type: "BooleanTypeAnnotation" };
		}),
		(l.breakStatement = function (e = null) {
			var t = { type: "BreakStatement", label: e },
				n = A.BreakStatement;
			return x(n.label, t, "label", e, 1), t;
		}),
		(l.callExpression = function (e, t) {
			var n = { type: "CallExpression", callee: e, arguments: t },
				r = A.CallExpression;
			return x(r.callee, n, "callee", e, 1), x(r.arguments, n, "arguments", t, 1), n;
		}),
		(l.catchClause = function (e = null, t) {
			var n = { type: "CatchClause", param: e, body: t },
				r = A.CatchClause;
			return x(r.param, n, "param", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.classAccessorProperty = function (e, t = null, n = null, r = null, i = !1, a = !1) {
			var o = {
					type: "ClassAccessorProperty",
					key: e,
					value: t,
					typeAnnotation: n,
					decorators: r,
					computed: i,
					static: a
				},
				s = A.ClassAccessorProperty;
			return (
				x(s.key, o, "key", e, 1),
				x(s.value, o, "value", t, 1),
				x(s.typeAnnotation, o, "typeAnnotation", n, 1),
				x(s.decorators, o, "decorators", r, 1),
				x(s.computed, o, "computed", i),
				x(s.static, o, "static", a),
				o
			);
		}),
		(l.classBody = function (e) {
			var t = { type: "ClassBody", body: e },
				n = A.ClassBody;
			return x(n.body, t, "body", e, 1), t;
		}),
		(l.classDeclaration = function (e = null, t = null, n, r = null) {
			var i = { type: "ClassDeclaration", id: e, superClass: t, body: n, decorators: r },
				a = A.ClassDeclaration;
			return (
				x(a.id, i, "id", e, 1),
				x(a.superClass, i, "superClass", t, 1),
				x(a.body, i, "body", n, 1),
				x(a.decorators, i, "decorators", r, 1),
				i
			);
		}),
		(l.classExpression = function (e = null, t = null, n, r = null) {
			var i = { type: "ClassExpression", id: e, superClass: t, body: n, decorators: r },
				a = A.ClassExpression;
			return (
				x(a.id, i, "id", e, 1),
				x(a.superClass, i, "superClass", t, 1),
				x(a.body, i, "body", n, 1),
				x(a.decorators, i, "decorators", r, 1),
				i
			);
		}),
		(l.classImplements = function (e, t = null) {
			var n = { type: "ClassImplements", id: e, typeParameters: t },
				r = A.ClassImplements;
			return x(r.id, n, "id", e, 1), x(r.typeParameters, n, "typeParameters", t, 1), n;
		}),
		(l.classMethod = function (e = "method", t, n, r, i = !1, a = !1, o = !1, s = !1) {
			var l = {
					type: "ClassMethod",
					kind: e,
					key: t,
					params: n,
					body: r,
					computed: i,
					static: a,
					generator: o,
					async: s
				},
				p = A.ClassMethod;
			return (
				x(p.kind, l, "kind", e),
				x(p.key, l, "key", t, 1),
				x(p.params, l, "params", n, 1),
				x(p.body, l, "body", r, 1),
				x(p.computed, l, "computed", i),
				x(p.static, l, "static", a),
				x(p.generator, l, "generator", o),
				x(p.async, l, "async", s),
				l
			);
		}),
		(l.classPrivateMethod = function (e = "method", t, n, r, i = !1) {
			var a = { type: "ClassPrivateMethod", kind: e, key: t, params: n, body: r, static: i },
				o = A.ClassPrivateMethod;
			return (
				x(o.kind, a, "kind", e),
				x(o.key, a, "key", t, 1),
				x(o.params, a, "params", n, 1),
				x(o.body, a, "body", r, 1),
				x(o.static, a, "static", i),
				a
			);
		}),
		(l.classPrivateProperty = function (e, t = null, n = null, r = !1) {
			var i = { type: "ClassPrivateProperty", key: e, value: t, decorators: n, static: r },
				a = A.ClassPrivateProperty;
			return (
				x(a.key, i, "key", e, 1),
				x(a.value, i, "value", t, 1),
				x(a.decorators, i, "decorators", n, 1),
				x(a.static, i, "static", r),
				i
			);
		}),
		(l.classProperty = function (e, t = null, n = null, r = null, i = !1, a = !1) {
			var o = {
					type: "ClassProperty",
					key: e,
					value: t,
					typeAnnotation: n,
					decorators: r,
					computed: i,
					static: a
				},
				s = A.ClassProperty;
			return (
				x(s.key, o, "key", e, 1),
				x(s.value, o, "value", t, 1),
				x(s.typeAnnotation, o, "typeAnnotation", n, 1),
				x(s.decorators, o, "decorators", r, 1),
				x(s.computed, o, "computed", i),
				x(s.static, o, "static", a),
				o
			);
		}),
		(l.conditionalExpression = function (e, t, n) {
			var r = { type: "ConditionalExpression", test: e, consequent: t, alternate: n },
				i = A.ConditionalExpression;
			return (
				x(i.test, r, "test", e, 1),
				x(i.consequent, r, "consequent", t, 1),
				x(i.alternate, r, "alternate", n, 1),
				r
			);
		}),
		(l.continueStatement = function (e = null) {
			var t = { type: "ContinueStatement", label: e },
				n = A.ContinueStatement;
			return x(n.label, t, "label", e, 1), t;
		}),
		(l.debuggerStatement = function () {
			return { type: "DebuggerStatement" };
		}),
		(l.decimalLiteral = function (e) {
			var t = { type: "DecimalLiteral", value: e },
				n = A.DecimalLiteral;
			return x(n.value, t, "value", e), t;
		}),
		(l.declareClass = function (e, t = null, n = null, r) {
			var i = { type: "DeclareClass", id: e, typeParameters: t, extends: n, body: r },
				a = A.DeclareClass;
			return (
				x(a.id, i, "id", e, 1),
				x(a.typeParameters, i, "typeParameters", t, 1),
				x(a.extends, i, "extends", n, 1),
				x(a.body, i, "body", r, 1),
				i
			);
		}),
		(l.declareExportAllDeclaration = function (e, t = null) {
			var n = { type: "DeclareExportAllDeclaration", source: e, attributes: t },
				r = A.DeclareExportAllDeclaration;
			return x(r.source, n, "source", e, 1), x(r.attributes, n, "attributes", t, 1), n;
		}),
		(l.declareExportDeclaration = function (e = null, t = null, n = null, r = null) {
			var i = {
					type: "DeclareExportDeclaration",
					declaration: e,
					specifiers: t,
					source: n,
					attributes: r
				},
				a = A.DeclareExportDeclaration;
			return (
				x(a.declaration, i, "declaration", e, 1),
				x(a.specifiers, i, "specifiers", t, 1),
				x(a.source, i, "source", n, 1),
				x(a.attributes, i, "attributes", r, 1),
				i
			);
		}),
		(l.declareFunction = function (e) {
			var t = { type: "DeclareFunction", id: e },
				n = A.DeclareFunction;
			return x(n.id, t, "id", e, 1), t;
		}),
		(l.declareInterface = function (e, t = null, n = null, r) {
			var i = { type: "DeclareInterface", id: e, typeParameters: t, extends: n, body: r },
				a = A.DeclareInterface;
			return (
				x(a.id, i, "id", e, 1),
				x(a.typeParameters, i, "typeParameters", t, 1),
				x(a.extends, i, "extends", n, 1),
				x(a.body, i, "body", r, 1),
				i
			);
		}),
		(l.declareModule = function (e, t, n = null) {
			var r = { type: "DeclareModule", id: e, body: t, kind: n },
				i = A.DeclareModule;
			return x(i.id, r, "id", e, 1), x(i.body, r, "body", t, 1), x(i.kind, r, "kind", n), r;
		}),
		(l.declareModuleExports = function (e) {
			var t = { type: "DeclareModuleExports", typeAnnotation: e },
				n = A.DeclareModuleExports;
			return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
		}),
		(l.declareOpaqueType = function (e, t = null, n = null) {
			var r = { type: "DeclareOpaqueType", id: e, typeParameters: t, supertype: n },
				i = A.DeclareOpaqueType;
			return (
				x(i.id, r, "id", e, 1),
				x(i.typeParameters, r, "typeParameters", t, 1),
				x(i.supertype, r, "supertype", n, 1),
				r
			);
		}),
		(l.declareTypeAlias = function (e, t = null, n) {
			var r = { type: "DeclareTypeAlias", id: e, typeParameters: t, right: n },
				i = A.DeclareTypeAlias;
			return (
				x(i.id, r, "id", e, 1),
				x(i.typeParameters, r, "typeParameters", t, 1),
				x(i.right, r, "right", n, 1),
				r
			);
		}),
		(l.declareVariable = function (e) {
			var t = { type: "DeclareVariable", id: e },
				n = A.DeclareVariable;
			return x(n.id, t, "id", e, 1), t;
		}),
		(l.declaredPredicate = function (e) {
			var t = { type: "DeclaredPredicate", value: e },
				n = A.DeclaredPredicate;
			return x(n.value, t, "value", e, 1), t;
		}),
		(l.decorator = function (e) {
			var t = { type: "Decorator", expression: e },
				n = A.Decorator;
			return x(n.expression, t, "expression", e, 1), t;
		}),
		(l.directive = function (e) {
			var t = { type: "Directive", value: e },
				n = A.Directive;
			return x(n.value, t, "value", e, 1), t;
		}),
		(l.directiveLiteral = function (e) {
			var t = { type: "DirectiveLiteral", value: e },
				n = A.DirectiveLiteral;
			return x(n.value, t, "value", e), t;
		}),
		(l.doExpression = function (e, t = !1) {
			var n = { type: "DoExpression", body: e, async: t },
				r = A.DoExpression;
			return x(r.body, n, "body", e, 1), x(r.async, n, "async", t), n;
		}),
		(l.doWhileStatement = function (e, t) {
			var n = { type: "DoWhileStatement", test: e, body: t },
				r = A.DoWhileStatement;
			return x(r.test, n, "test", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.emptyStatement = function () {
			return { type: "EmptyStatement" };
		}),
		(l.emptyTypeAnnotation = function () {
			return { type: "EmptyTypeAnnotation" };
		}),
		(l.enumBooleanBody = function (e) {
			var t = {
					type: "EnumBooleanBody",
					members: e,
					explicitType: null,
					hasUnknownMembers: null
				},
				n = A.EnumBooleanBody;
			return x(n.members, t, "members", e, 1), t;
		}),
		(l.enumBooleanMember = function (e) {
			var t = { type: "EnumBooleanMember", id: e, init: null },
				n = A.EnumBooleanMember;
			return x(n.id, t, "id", e, 1), t;
		}),
		(l.enumDeclaration = function (e, t) {
			var n = { type: "EnumDeclaration", id: e, body: t },
				r = A.EnumDeclaration;
			return x(r.id, n, "id", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.enumDefaultedMember = function (e) {
			var t = { type: "EnumDefaultedMember", id: e },
				n = A.EnumDefaultedMember;
			return x(n.id, t, "id", e, 1), t;
		}),
		(l.enumNumberBody = function (e) {
			var t = {
					type: "EnumNumberBody",
					members: e,
					explicitType: null,
					hasUnknownMembers: null
				},
				n = A.EnumNumberBody;
			return x(n.members, t, "members", e, 1), t;
		}),
		(l.enumNumberMember = function (e, t) {
			var n = { type: "EnumNumberMember", id: e, init: t },
				r = A.EnumNumberMember;
			return x(r.id, n, "id", e, 1), x(r.init, n, "init", t, 1), n;
		}),
		(l.enumStringBody = function (e) {
			var t = {
					type: "EnumStringBody",
					members: e,
					explicitType: null,
					hasUnknownMembers: null
				},
				n = A.EnumStringBody;
			return x(n.members, t, "members", e, 1), t;
		}),
		(l.enumStringMember = function (e, t) {
			var n = { type: "EnumStringMember", id: e, init: t },
				r = A.EnumStringMember;
			return x(r.id, n, "id", e, 1), x(r.init, n, "init", t, 1), n;
		}),
		(l.enumSymbolBody = function (e) {
			var t = { type: "EnumSymbolBody", members: e, hasUnknownMembers: null },
				n = A.EnumSymbolBody;
			return x(n.members, t, "members", e, 1), t;
		}),
		(l.existsTypeAnnotation = function () {
			return { type: "ExistsTypeAnnotation" };
		}),
		(l.exportAllDeclaration = function (e) {
			var t = { type: "ExportAllDeclaration", source: e },
				n = A.ExportAllDeclaration;
			return x(n.source, t, "source", e, 1), t;
		}),
		(l.exportDefaultDeclaration = function (e) {
			var t = { type: "ExportDefaultDeclaration", declaration: e },
				n = A.ExportDefaultDeclaration;
			return x(n.declaration, t, "declaration", e, 1), t;
		}),
		(l.exportDefaultSpecifier = function (e) {
			var t = { type: "ExportDefaultSpecifier", exported: e },
				n = A.ExportDefaultSpecifier;
			return x(n.exported, t, "exported", e, 1), t;
		}),
		(l.exportNamedDeclaration = function (e = null, t = [], n = null) {
			var r = { type: "ExportNamedDeclaration", declaration: e, specifiers: t, source: n },
				i = A.ExportNamedDeclaration;
			return (
				x(i.declaration, r, "declaration", e, 1),
				x(i.specifiers, r, "specifiers", t, 1),
				x(i.source, r, "source", n, 1),
				r
			);
		}),
		(l.exportNamespaceSpecifier = function (e) {
			var t = { type: "ExportNamespaceSpecifier", exported: e },
				n = A.ExportNamespaceSpecifier;
			return x(n.exported, t, "exported", e, 1), t;
		}),
		(l.exportSpecifier = function (e, t) {
			var n = { type: "ExportSpecifier", local: e, exported: t },
				r = A.ExportSpecifier;
			return x(r.local, n, "local", e, 1), x(r.exported, n, "exported", t, 1), n;
		}),
		(l.expressionStatement = function (e) {
			var t = { type: "ExpressionStatement", expression: e },
				n = A.ExpressionStatement;
			return x(n.expression, t, "expression", e, 1), t;
		}),
		(l.file = function (e, t = null, n = null) {
			var r = { type: "File", program: e, comments: t, tokens: n },
				i = A.File;
			return (
				x(i.program, r, "program", e, 1),
				x(i.comments, r, "comments", t, 1),
				x(i.tokens, r, "tokens", n),
				r
			);
		}),
		(l.forInStatement = function (e, t, n) {
			var r = { type: "ForInStatement", left: e, right: t, body: n },
				i = A.ForInStatement;
			return (
				x(i.left, r, "left", e, 1),
				x(i.right, r, "right", t, 1),
				x(i.body, r, "body", n, 1),
				r
			);
		}),
		(l.forOfStatement = function (e, t, n, r = !1) {
			var i = { type: "ForOfStatement", left: e, right: t, body: n, await: r },
				a = A.ForOfStatement;
			return (
				x(a.left, i, "left", e, 1),
				x(a.right, i, "right", t, 1),
				x(a.body, i, "body", n, 1),
				x(a.await, i, "await", r),
				i
			);
		}),
		(l.forStatement = function (e = null, t = null, n = null, r) {
			var i = { type: "ForStatement", init: e, test: t, update: n, body: r },
				a = A.ForStatement;
			return (
				x(a.init, i, "init", e, 1),
				x(a.test, i, "test", t, 1),
				x(a.update, i, "update", n, 1),
				x(a.body, i, "body", r, 1),
				i
			);
		}),
		(l.functionDeclaration = function (e = null, t, n, r = !1, i = !1) {
			var a = {
					type: "FunctionDeclaration",
					id: e,
					params: t,
					body: n,
					generator: r,
					async: i
				},
				o = A.FunctionDeclaration;
			return (
				x(o.id, a, "id", e, 1),
				x(o.params, a, "params", t, 1),
				x(o.body, a, "body", n, 1),
				x(o.generator, a, "generator", r),
				x(o.async, a, "async", i),
				a
			);
		}),
		(l.functionExpression = function (e = null, t, n, r = !1, i = !1) {
			var a = {
					type: "FunctionExpression",
					id: e,
					params: t,
					body: n,
					generator: r,
					async: i
				},
				o = A.FunctionExpression;
			return (
				x(o.id, a, "id", e, 1),
				x(o.params, a, "params", t, 1),
				x(o.body, a, "body", n, 1),
				x(o.generator, a, "generator", r),
				x(o.async, a, "async", i),
				a
			);
		}),
		(l.functionTypeAnnotation = function (e = null, t, n = null, r) {
			var i = {
					type: "FunctionTypeAnnotation",
					typeParameters: e,
					params: t,
					rest: n,
					returnType: r
				},
				a = A.FunctionTypeAnnotation;
			return (
				x(a.typeParameters, i, "typeParameters", e, 1),
				x(a.params, i, "params", t, 1),
				x(a.rest, i, "rest", n, 1),
				x(a.returnType, i, "returnType", r, 1),
				i
			);
		}),
		(l.functionTypeParam = function (e = null, t) {
			var n = { type: "FunctionTypeParam", name: e, typeAnnotation: t },
				r = A.FunctionTypeParam;
			return x(r.name, n, "name", e, 1), x(r.typeAnnotation, n, "typeAnnotation", t, 1), n;
		}),
		(l.genericTypeAnnotation = function (e, t = null) {
			var n = { type: "GenericTypeAnnotation", id: e, typeParameters: t },
				r = A.GenericTypeAnnotation;
			return x(r.id, n, "id", e, 1), x(r.typeParameters, n, "typeParameters", t, 1), n;
		}),
		(l.identifier = function (e) {
			var t = { type: "Identifier", name: e },
				n = A.Identifier;
			return x(n.name, t, "name", e), t;
		}),
		(l.ifStatement = function (e, t, n = null) {
			var r = { type: "IfStatement", test: e, consequent: t, alternate: n },
				i = A.IfStatement;
			return (
				x(i.test, r, "test", e, 1),
				x(i.consequent, r, "consequent", t, 1),
				x(i.alternate, r, "alternate", n, 1),
				r
			);
		}),
		(l.import = function () {
			return { type: "Import" };
		}),
		(l.importAttribute = function (e, t) {
			var n = { type: "ImportAttribute", key: e, value: t },
				r = A.ImportAttribute;
			return x(r.key, n, "key", e, 1), x(r.value, n, "value", t, 1), n;
		}),
		(l.importDeclaration = function (e, t) {
			var n = { type: "ImportDeclaration", specifiers: e, source: t },
				r = A.ImportDeclaration;
			return x(r.specifiers, n, "specifiers", e, 1), x(r.source, n, "source", t, 1), n;
		}),
		(l.importDefaultSpecifier = function (e) {
			var t = { type: "ImportDefaultSpecifier", local: e },
				n = A.ImportDefaultSpecifier;
			return x(n.local, t, "local", e, 1), t;
		}),
		(l.importExpression = function (e, t = null) {
			var n = { type: "ImportExpression", source: e, options: t },
				r = A.ImportExpression;
			return x(r.source, n, "source", e, 1), x(r.options, n, "options", t, 1), n;
		}),
		(l.importNamespaceSpecifier = function (e) {
			var t = { type: "ImportNamespaceSpecifier", local: e },
				n = A.ImportNamespaceSpecifier;
			return x(n.local, t, "local", e, 1), t;
		}),
		(l.importSpecifier = function (e, t) {
			var n = { type: "ImportSpecifier", local: e, imported: t },
				r = A.ImportSpecifier;
			return x(r.local, n, "local", e, 1), x(r.imported, n, "imported", t, 1), n;
		}),
		(l.indexedAccessType = function (e, t) {
			var n = { type: "IndexedAccessType", objectType: e, indexType: t },
				r = A.IndexedAccessType;
			return x(r.objectType, n, "objectType", e, 1), x(r.indexType, n, "indexType", t, 1), n;
		}),
		(l.inferredPredicate = function () {
			return { type: "InferredPredicate" };
		}),
		(l.interfaceDeclaration = function (e, t = null, n = null, r) {
			var i = { type: "InterfaceDeclaration", id: e, typeParameters: t, extends: n, body: r },
				a = A.InterfaceDeclaration;
			return (
				x(a.id, i, "id", e, 1),
				x(a.typeParameters, i, "typeParameters", t, 1),
				x(a.extends, i, "extends", n, 1),
				x(a.body, i, "body", r, 1),
				i
			);
		}),
		(l.interfaceExtends = function (e, t = null) {
			var n = { type: "InterfaceExtends", id: e, typeParameters: t },
				r = A.InterfaceExtends;
			return x(r.id, n, "id", e, 1), x(r.typeParameters, n, "typeParameters", t, 1), n;
		}),
		(l.interfaceTypeAnnotation = function (e = null, t) {
			var n = { type: "InterfaceTypeAnnotation", extends: e, body: t },
				r = A.InterfaceTypeAnnotation;
			return x(r.extends, n, "extends", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.interpreterDirective = function (e) {
			var t = { type: "InterpreterDirective", value: e },
				n = A.InterpreterDirective;
			return x(n.value, t, "value", e), t;
		}),
		(l.intersectionTypeAnnotation = function (e) {
			var t = { type: "IntersectionTypeAnnotation", types: e },
				n = A.IntersectionTypeAnnotation;
			return x(n.types, t, "types", e, 1), t;
		}),
		(l.jSXAttribute = l.jsxAttribute =
			function (e, t = null) {
				var n = { type: "JSXAttribute", name: e, value: t },
					r = A.JSXAttribute;
				return x(r.name, n, "name", e, 1), x(r.value, n, "value", t, 1), n;
			}),
		(l.jSXClosingElement = l.jsxClosingElement =
			function (e) {
				var t = { type: "JSXClosingElement", name: e },
					n = A.JSXClosingElement;
				return x(n.name, t, "name", e, 1), t;
			}),
		(l.jSXClosingFragment = l.jsxClosingFragment =
			function () {
				return { type: "JSXClosingFragment" };
			}),
		(l.jSXElement = l.jsxElement =
			function (e, t = null, n, r = null) {
				var i = {
						type: "JSXElement",
						openingElement: e,
						closingElement: t,
						children: n,
						selfClosing: r
					},
					a = A.JSXElement;
				return (
					x(a.openingElement, i, "openingElement", e, 1),
					x(a.closingElement, i, "closingElement", t, 1),
					x(a.children, i, "children", n, 1),
					x(a.selfClosing, i, "selfClosing", r),
					i
				);
			}),
		(l.jSXEmptyExpression = l.jsxEmptyExpression =
			function () {
				return { type: "JSXEmptyExpression" };
			}),
		(l.jSXExpressionContainer = l.jsxExpressionContainer =
			function (e) {
				var t = { type: "JSXExpressionContainer", expression: e },
					n = A.JSXExpressionContainer;
				return x(n.expression, t, "expression", e, 1), t;
			}),
		(l.jSXFragment = l.jsxFragment =
			function (e, t, n) {
				var r = {
						type: "JSXFragment",
						openingFragment: e,
						closingFragment: t,
						children: n
					},
					i = A.JSXFragment;
				return (
					x(i.openingFragment, r, "openingFragment", e, 1),
					x(i.closingFragment, r, "closingFragment", t, 1),
					x(i.children, r, "children", n, 1),
					r
				);
			}),
		(l.jSXIdentifier = l.jsxIdentifier =
			function (e) {
				var t = { type: "JSXIdentifier", name: e },
					n = A.JSXIdentifier;
				return x(n.name, t, "name", e), t;
			}),
		(l.jSXMemberExpression = l.jsxMemberExpression =
			function (e, t) {
				var n = { type: "JSXMemberExpression", object: e, property: t },
					r = A.JSXMemberExpression;
				return x(r.object, n, "object", e, 1), x(r.property, n, "property", t, 1), n;
			}),
		(l.jSXNamespacedName = l.jsxNamespacedName =
			function (e, t) {
				var n = { type: "JSXNamespacedName", namespace: e, name: t },
					r = A.JSXNamespacedName;
				return x(r.namespace, n, "namespace", e, 1), x(r.name, n, "name", t, 1), n;
			}),
		(l.jSXOpeningElement = l.jsxOpeningElement =
			function (e, t, n = !1) {
				var r = { type: "JSXOpeningElement", name: e, attributes: t, selfClosing: n },
					i = A.JSXOpeningElement;
				return (
					x(i.name, r, "name", e, 1),
					x(i.attributes, r, "attributes", t, 1),
					x(i.selfClosing, r, "selfClosing", n),
					r
				);
			}),
		(l.jSXOpeningFragment = l.jsxOpeningFragment =
			function () {
				return { type: "JSXOpeningFragment" };
			}),
		(l.jSXSpreadAttribute = l.jsxSpreadAttribute =
			function (e) {
				var t = { type: "JSXSpreadAttribute", argument: e },
					n = A.JSXSpreadAttribute;
				return x(n.argument, t, "argument", e, 1), t;
			}),
		(l.jSXSpreadChild = l.jsxSpreadChild =
			function (e) {
				var t = { type: "JSXSpreadChild", expression: e },
					n = A.JSXSpreadChild;
				return x(n.expression, t, "expression", e, 1), t;
			}),
		(l.jSXText = l.jsxText =
			function (e) {
				var t = { type: "JSXText", value: e },
					n = A.JSXText;
				return x(n.value, t, "value", e), t;
			}),
		(l.labeledStatement = function (e, t) {
			var n = { type: "LabeledStatement", label: e, body: t },
				r = A.LabeledStatement;
			return x(r.label, n, "label", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.logicalExpression = function (e, t, n) {
			var r = { type: "LogicalExpression", operator: e, left: t, right: n },
				i = A.LogicalExpression;
			return (
				x(i.operator, r, "operator", e),
				x(i.left, r, "left", t, 1),
				x(i.right, r, "right", n, 1),
				r
			);
		}),
		(l.memberExpression = function (e, t, n = !1, r = null) {
			var i = { type: "MemberExpression", object: e, property: t, computed: n, optional: r },
				a = A.MemberExpression;
			return (
				x(a.object, i, "object", e, 1),
				x(a.property, i, "property", t, 1),
				x(a.computed, i, "computed", n),
				x(a.optional, i, "optional", r),
				i
			);
		}),
		(l.metaProperty = function (e, t) {
			var n = { type: "MetaProperty", meta: e, property: t },
				r = A.MetaProperty;
			return x(r.meta, n, "meta", e, 1), x(r.property, n, "property", t, 1), n;
		}),
		(l.mixedTypeAnnotation = function () {
			return { type: "MixedTypeAnnotation" };
		}),
		(l.moduleExpression = function (e) {
			var t = { type: "ModuleExpression", body: e },
				n = A.ModuleExpression;
			return x(n.body, t, "body", e, 1), t;
		}),
		(l.newExpression = function (e, t) {
			var n = { type: "NewExpression", callee: e, arguments: t },
				r = A.NewExpression;
			return x(r.callee, n, "callee", e, 1), x(r.arguments, n, "arguments", t, 1), n;
		}),
		(l.noop = function () {
			return { type: "Noop" };
		}),
		(l.nullLiteral = function () {
			return { type: "NullLiteral" };
		}),
		(l.nullLiteralTypeAnnotation = function () {
			return { type: "NullLiteralTypeAnnotation" };
		}),
		(l.nullableTypeAnnotation = function (e) {
			var t = { type: "NullableTypeAnnotation", typeAnnotation: e },
				n = A.NullableTypeAnnotation;
			return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
		}),
		(l.numberLiteral = function (e) {
			return (0, pn.default)("NumberLiteral", "NumericLiteral", "The node type "), un(e);
		}),
		(l.numberLiteralTypeAnnotation = function (e) {
			var t = { type: "NumberLiteralTypeAnnotation", value: e },
				n = A.NumberLiteralTypeAnnotation;
			return x(n.value, t, "value", e), t;
		}),
		(l.numberTypeAnnotation = function () {
			return { type: "NumberTypeAnnotation" };
		}),
		(l.numericLiteral = un),
		(l.objectExpression = function (e) {
			var t = { type: "ObjectExpression", properties: e },
				n = A.ObjectExpression;
			return x(n.properties, t, "properties", e, 1), t;
		}),
		(l.objectMethod = function (e = "method", t, n, r, i = !1, a = !1, o = !1) {
			var s = {
					type: "ObjectMethod",
					kind: e,
					key: t,
					params: n,
					body: r,
					computed: i,
					generator: a,
					async: o
				},
				l = A.ObjectMethod;
			return (
				x(l.kind, s, "kind", e),
				x(l.key, s, "key", t, 1),
				x(l.params, s, "params", n, 1),
				x(l.body, s, "body", r, 1),
				x(l.computed, s, "computed", i),
				x(l.generator, s, "generator", a),
				x(l.async, s, "async", o),
				s
			);
		}),
		(l.objectPattern = function (e) {
			var t = { type: "ObjectPattern", properties: e },
				n = A.ObjectPattern;
			return x(n.properties, t, "properties", e, 1), t;
		}),
		(l.objectProperty = function (e, t, n = !1, r = !1, i = null) {
			var a = {
					type: "ObjectProperty",
					key: e,
					value: t,
					computed: n,
					shorthand: r,
					decorators: i
				},
				o = A.ObjectProperty;
			return (
				x(o.key, a, "key", e, 1),
				x(o.value, a, "value", t, 1),
				x(o.computed, a, "computed", n),
				x(o.shorthand, a, "shorthand", r),
				x(o.decorators, a, "decorators", i, 1),
				a
			);
		}),
		(l.objectTypeAnnotation = function (e, t = [], n = [], r = [], i = !1) {
			var a = {
					type: "ObjectTypeAnnotation",
					properties: e,
					indexers: t,
					callProperties: n,
					internalSlots: r,
					exact: i
				},
				o = A.ObjectTypeAnnotation;
			return (
				x(o.properties, a, "properties", e, 1),
				x(o.indexers, a, "indexers", t, 1),
				x(o.callProperties, a, "callProperties", n, 1),
				x(o.internalSlots, a, "internalSlots", r, 1),
				x(o.exact, a, "exact", i),
				a
			);
		}),
		(l.objectTypeCallProperty = function (e) {
			var t = { type: "ObjectTypeCallProperty", value: e, static: null },
				n = A.ObjectTypeCallProperty;
			return x(n.value, t, "value", e, 1), t;
		}),
		(l.objectTypeIndexer = function (e = null, t, n, r = null) {
			var i = {
					type: "ObjectTypeIndexer",
					id: e,
					key: t,
					value: n,
					variance: r,
					static: null
				},
				a = A.ObjectTypeIndexer;
			return (
				x(a.id, i, "id", e, 1),
				x(a.key, i, "key", t, 1),
				x(a.value, i, "value", n, 1),
				x(a.variance, i, "variance", r, 1),
				i
			);
		}),
		(l.objectTypeInternalSlot = function (e, t, n, r, i) {
			var a = {
					type: "ObjectTypeInternalSlot",
					id: e,
					value: t,
					optional: n,
					static: r,
					method: i
				},
				o = A.ObjectTypeInternalSlot;
			return (
				x(o.id, a, "id", e, 1),
				x(o.value, a, "value", t, 1),
				x(o.optional, a, "optional", n),
				x(o.static, a, "static", r),
				x(o.method, a, "method", i),
				a
			);
		}),
		(l.objectTypeProperty = function (e, t, n = null) {
			var r = {
					type: "ObjectTypeProperty",
					key: e,
					value: t,
					variance: n,
					kind: null,
					method: null,
					optional: null,
					proto: null,
					static: null
				},
				i = A.ObjectTypeProperty;
			return (
				x(i.key, r, "key", e, 1),
				x(i.value, r, "value", t, 1),
				x(i.variance, r, "variance", n, 1),
				r
			);
		}),
		(l.objectTypeSpreadProperty = function (e) {
			var t = { type: "ObjectTypeSpreadProperty", argument: e },
				n = A.ObjectTypeSpreadProperty;
			return x(n.argument, t, "argument", e, 1), t;
		}),
		(l.opaqueType = function (e, t = null, n = null, r) {
			var i = { type: "OpaqueType", id: e, typeParameters: t, supertype: n, impltype: r },
				a = A.OpaqueType;
			return (
				x(a.id, i, "id", e, 1),
				x(a.typeParameters, i, "typeParameters", t, 1),
				x(a.supertype, i, "supertype", n, 1),
				x(a.impltype, i, "impltype", r, 1),
				i
			);
		}),
		(l.optionalCallExpression = function (e, t, n) {
			var r = { type: "OptionalCallExpression", callee: e, arguments: t, optional: n },
				i = A.OptionalCallExpression;
			return (
				x(i.callee, r, "callee", e, 1),
				x(i.arguments, r, "arguments", t, 1),
				x(i.optional, r, "optional", n),
				r
			);
		}),
		(l.optionalIndexedAccessType = function (e, t) {
			var n = {
					type: "OptionalIndexedAccessType",
					objectType: e,
					indexType: t,
					optional: null
				},
				r = A.OptionalIndexedAccessType;
			return x(r.objectType, n, "objectType", e, 1), x(r.indexType, n, "indexType", t, 1), n;
		}),
		(l.optionalMemberExpression = function (e, t, n = !1, r) {
			var i = {
					type: "OptionalMemberExpression",
					object: e,
					property: t,
					computed: n,
					optional: r
				},
				a = A.OptionalMemberExpression;
			return (
				x(a.object, i, "object", e, 1),
				x(a.property, i, "property", t, 1),
				x(a.computed, i, "computed", n),
				x(a.optional, i, "optional", r),
				i
			);
		}),
		(l.parenthesizedExpression = function (e) {
			var t = { type: "ParenthesizedExpression", expression: e },
				n = A.ParenthesizedExpression;
			return x(n.expression, t, "expression", e, 1), t;
		}),
		(l.pipelineBareFunction = function (e) {
			var t = { type: "PipelineBareFunction", callee: e },
				n = A.PipelineBareFunction;
			return x(n.callee, t, "callee", e, 1), t;
		}),
		(l.pipelinePrimaryTopicReference = function () {
			return { type: "PipelinePrimaryTopicReference" };
		}),
		(l.pipelineTopicExpression = function (e) {
			var t = { type: "PipelineTopicExpression", expression: e },
				n = A.PipelineTopicExpression;
			return x(n.expression, t, "expression", e, 1), t;
		}),
		(l.placeholder = function (e, t) {
			var n = { type: "Placeholder", expectedNode: e, name: t },
				r = A.Placeholder;
			return x(r.expectedNode, n, "expectedNode", e), x(r.name, n, "name", t, 1), n;
		}),
		(l.privateName = function (e) {
			var t = { type: "PrivateName", id: e },
				n = A.PrivateName;
			return x(n.id, t, "id", e, 1), t;
		}),
		(l.program = function (e, t = [], n = "script", r = null) {
			var i = { type: "Program", body: e, directives: t, sourceType: n, interpreter: r },
				a = A.Program;
			return (
				x(a.body, i, "body", e, 1),
				x(a.directives, i, "directives", t, 1),
				x(a.sourceType, i, "sourceType", n),
				x(a.interpreter, i, "interpreter", r, 1),
				i
			);
		}),
		(l.qualifiedTypeIdentifier = function (e, t) {
			var n = { type: "QualifiedTypeIdentifier", id: e, qualification: t },
				r = A.QualifiedTypeIdentifier;
			return x(r.id, n, "id", e, 1), x(r.qualification, n, "qualification", t, 1), n;
		}),
		(l.recordExpression = function (e) {
			var t = { type: "RecordExpression", properties: e },
				n = A.RecordExpression;
			return x(n.properties, t, "properties", e, 1), t;
		}),
		(l.regExpLiteral = cn),
		(l.regexLiteral = function (e, t = "") {
			return (0, pn.default)("RegexLiteral", "RegExpLiteral", "The node type "), cn(e, t);
		}),
		(l.restElement = dn),
		(l.restProperty = function (e) {
			return (0, pn.default)("RestProperty", "RestElement", "The node type "), dn(e);
		}),
		(l.returnStatement = function (e = null) {
			var t = { type: "ReturnStatement", argument: e },
				n = A.ReturnStatement;
			return x(n.argument, t, "argument", e, 1), t;
		}),
		(l.sequenceExpression = function (e) {
			var t = { type: "SequenceExpression", expressions: e },
				n = A.SequenceExpression;
			return x(n.expressions, t, "expressions", e, 1), t;
		}),
		(l.spreadElement = fn),
		(l.spreadProperty = function (e) {
			return (0, pn.default)("SpreadProperty", "SpreadElement", "The node type "), fn(e);
		}),
		(l.staticBlock = function (e) {
			var t = { type: "StaticBlock", body: e },
				n = A.StaticBlock;
			return x(n.body, t, "body", e, 1), t;
		}),
		(l.stringLiteral = function (e) {
			var t = { type: "StringLiteral", value: e },
				n = A.StringLiteral;
			return x(n.value, t, "value", e), t;
		}),
		(l.stringLiteralTypeAnnotation = function (e) {
			var t = { type: "StringLiteralTypeAnnotation", value: e },
				n = A.StringLiteralTypeAnnotation;
			return x(n.value, t, "value", e), t;
		}),
		(l.stringTypeAnnotation = function () {
			return { type: "StringTypeAnnotation" };
		}),
		(l.super = function () {
			return { type: "Super" };
		}),
		(l.switchCase = function (e = null, t) {
			var n = { type: "SwitchCase", test: e, consequent: t },
				r = A.SwitchCase;
			return x(r.test, n, "test", e, 1), x(r.consequent, n, "consequent", t, 1), n;
		}),
		(l.switchStatement = function (e, t) {
			var n = { type: "SwitchStatement", discriminant: e, cases: t },
				r = A.SwitchStatement;
			return x(r.discriminant, n, "discriminant", e, 1), x(r.cases, n, "cases", t, 1), n;
		}),
		(l.symbolTypeAnnotation = function () {
			return { type: "SymbolTypeAnnotation" };
		}),
		(l.taggedTemplateExpression = function (e, t) {
			var n = { type: "TaggedTemplateExpression", tag: e, quasi: t },
				r = A.TaggedTemplateExpression;
			return x(r.tag, n, "tag", e, 1), x(r.quasi, n, "quasi", t, 1), n;
		}),
		(l.templateElement = function (e, t = !1) {
			var n = { type: "TemplateElement", value: e, tail: t },
				r = A.TemplateElement;
			return x(r.value, n, "value", e), x(r.tail, n, "tail", t), n;
		}),
		(l.templateLiteral = function (e, t) {
			var n = { type: "TemplateLiteral", quasis: e, expressions: t },
				r = A.TemplateLiteral;
			return x(r.quasis, n, "quasis", e, 1), x(r.expressions, n, "expressions", t, 1), n;
		}),
		(l.thisExpression = function () {
			return { type: "ThisExpression" };
		}),
		(l.thisTypeAnnotation = function () {
			return { type: "ThisTypeAnnotation" };
		}),
		(l.throwStatement = function (e) {
			var t = { type: "ThrowStatement", argument: e },
				n = A.ThrowStatement;
			return x(n.argument, t, "argument", e, 1), t;
		}),
		(l.topicReference = function () {
			return { type: "TopicReference" };
		}),
		(l.tryStatement = function (e, t = null, n = null) {
			var r = { type: "TryStatement", block: e, handler: t, finalizer: n },
				i = A.TryStatement;
			return (
				x(i.block, r, "block", e, 1),
				x(i.handler, r, "handler", t, 1),
				x(i.finalizer, r, "finalizer", n, 1),
				r
			);
		}),
		(l.tSAnyKeyword = l.tsAnyKeyword =
			function () {
				return { type: "TSAnyKeyword" };
			}),
		(l.tSArrayType = l.tsArrayType =
			function (e) {
				var t = { type: "TSArrayType", elementType: e },
					n = A.TSArrayType;
				return x(n.elementType, t, "elementType", e, 1), t;
			}),
		(l.tSAsExpression = l.tsAsExpression =
			function (e, t) {
				var n = { type: "TSAsExpression", expression: e, typeAnnotation: t },
					r = A.TSAsExpression;
				return (
					x(r.expression, n, "expression", e, 1),
					x(r.typeAnnotation, n, "typeAnnotation", t, 1),
					n
				);
			}),
		(l.tSBigIntKeyword = l.tsBigIntKeyword =
			function () {
				return { type: "TSBigIntKeyword" };
			}),
		(l.tSBooleanKeyword = l.tsBooleanKeyword =
			function () {
				return { type: "TSBooleanKeyword" };
			}),
		(l.tSCallSignatureDeclaration = l.tsCallSignatureDeclaration =
			function (e = null, t, n = null) {
				var r = {
						type: "TSCallSignatureDeclaration",
						typeParameters: e,
						parameters: t,
						typeAnnotation: n
					},
					i = A.TSCallSignatureDeclaration;
				return (
					x(i.typeParameters, r, "typeParameters", e, 1),
					x(i.parameters, r, "parameters", t, 1),
					x(i.typeAnnotation, r, "typeAnnotation", n, 1),
					r
				);
			}),
		(l.tSConditionalType = l.tsConditionalType =
			function (e, t, n, r) {
				var i = {
						type: "TSConditionalType",
						checkType: e,
						extendsType: t,
						trueType: n,
						falseType: r
					},
					a = A.TSConditionalType;
				return (
					x(a.checkType, i, "checkType", e, 1),
					x(a.extendsType, i, "extendsType", t, 1),
					x(a.trueType, i, "trueType", n, 1),
					x(a.falseType, i, "falseType", r, 1),
					i
				);
			}),
		(l.tSConstructSignatureDeclaration = l.tsConstructSignatureDeclaration =
			function (e = null, t, n = null) {
				var r = {
						type: "TSConstructSignatureDeclaration",
						typeParameters: e,
						parameters: t,
						typeAnnotation: n
					},
					i = A.TSConstructSignatureDeclaration;
				return (
					x(i.typeParameters, r, "typeParameters", e, 1),
					x(i.parameters, r, "parameters", t, 1),
					x(i.typeAnnotation, r, "typeAnnotation", n, 1),
					r
				);
			}),
		(l.tSConstructorType = l.tsConstructorType =
			function (e = null, t, n = null) {
				var r = {
						type: "TSConstructorType",
						typeParameters: e,
						parameters: t,
						typeAnnotation: n
					},
					i = A.TSConstructorType;
				return (
					x(i.typeParameters, r, "typeParameters", e, 1),
					x(i.parameters, r, "parameters", t, 1),
					x(i.typeAnnotation, r, "typeAnnotation", n, 1),
					r
				);
			}),
		(l.tSDeclareFunction = l.tsDeclareFunction =
			function (e = null, t = null, n, r = null) {
				var i = {
						type: "TSDeclareFunction",
						id: e,
						typeParameters: t,
						params: n,
						returnType: r
					},
					a = A.TSDeclareFunction;
				return (
					x(a.id, i, "id", e, 1),
					x(a.typeParameters, i, "typeParameters", t, 1),
					x(a.params, i, "params", n, 1),
					x(a.returnType, i, "returnType", r, 1),
					i
				);
			}),
		(l.tSDeclareMethod = l.tsDeclareMethod =
			function (e = null, t, n = null, r, i = null) {
				var a = {
						type: "TSDeclareMethod",
						decorators: e,
						key: t,
						typeParameters: n,
						params: r,
						returnType: i
					},
					o = A.TSDeclareMethod;
				return (
					x(o.decorators, a, "decorators", e, 1),
					x(o.key, a, "key", t, 1),
					x(o.typeParameters, a, "typeParameters", n, 1),
					x(o.params, a, "params", r, 1),
					x(o.returnType, a, "returnType", i, 1),
					a
				);
			}),
		(l.tSEnumBody = l.tsEnumBody =
			function (e) {
				var t = { type: "TSEnumBody", members: e },
					n = A.TSEnumBody;
				return x(n.members, t, "members", e, 1), t;
			}),
		(l.tSEnumDeclaration = l.tsEnumDeclaration =
			function (e, t) {
				var n = { type: "TSEnumDeclaration", id: e, members: t },
					r = A.TSEnumDeclaration;
				return x(r.id, n, "id", e, 1), x(r.members, n, "members", t, 1), n;
			}),
		(l.tSEnumMember = l.tsEnumMember =
			function (e, t = null) {
				var n = { type: "TSEnumMember", id: e, initializer: t },
					r = A.TSEnumMember;
				return x(r.id, n, "id", e, 1), x(r.initializer, n, "initializer", t, 1), n;
			}),
		(l.tSExportAssignment = l.tsExportAssignment =
			function (e) {
				var t = { type: "TSExportAssignment", expression: e },
					n = A.TSExportAssignment;
				return x(n.expression, t, "expression", e, 1), t;
			}),
		(l.tSExpressionWithTypeArguments = l.tsExpressionWithTypeArguments =
			function (e, t = null) {
				var n = { type: "TSExpressionWithTypeArguments", expression: e, typeParameters: t },
					r = A.TSExpressionWithTypeArguments;
				return (
					x(r.expression, n, "expression", e, 1),
					x(r.typeParameters, n, "typeParameters", t, 1),
					n
				);
			}),
		(l.tSExternalModuleReference = l.tsExternalModuleReference =
			function (e) {
				var t = { type: "TSExternalModuleReference", expression: e },
					n = A.TSExternalModuleReference;
				return x(n.expression, t, "expression", e, 1), t;
			}),
		(l.tSFunctionType = l.tsFunctionType =
			function (e = null, t, n = null) {
				var r = {
						type: "TSFunctionType",
						typeParameters: e,
						parameters: t,
						typeAnnotation: n
					},
					i = A.TSFunctionType;
				return (
					x(i.typeParameters, r, "typeParameters", e, 1),
					x(i.parameters, r, "parameters", t, 1),
					x(i.typeAnnotation, r, "typeAnnotation", n, 1),
					r
				);
			}),
		(l.tSImportEqualsDeclaration = l.tsImportEqualsDeclaration =
			function (e, t) {
				var n = {
						type: "TSImportEqualsDeclaration",
						id: e,
						moduleReference: t,
						isExport: null
					},
					r = A.TSImportEqualsDeclaration;
				return x(r.id, n, "id", e, 1), x(r.moduleReference, n, "moduleReference", t, 1), n;
			}),
		(l.tSImportType = l.tsImportType =
			function (e, t = null, n = null) {
				var r = { type: "TSImportType", argument: e, qualifier: t, typeParameters: n },
					i = A.TSImportType;
				return (
					x(i.argument, r, "argument", e, 1),
					x(i.qualifier, r, "qualifier", t, 1),
					x(i.typeParameters, r, "typeParameters", n, 1),
					r
				);
			}),
		(l.tSIndexSignature = l.tsIndexSignature =
			function (e, t = null) {
				var n = { type: "TSIndexSignature", parameters: e, typeAnnotation: t },
					r = A.TSIndexSignature;
				return (
					x(r.parameters, n, "parameters", e, 1),
					x(r.typeAnnotation, n, "typeAnnotation", t, 1),
					n
				);
			}),
		(l.tSIndexedAccessType = l.tsIndexedAccessType =
			function (e, t) {
				var n = { type: "TSIndexedAccessType", objectType: e, indexType: t },
					r = A.TSIndexedAccessType;
				return (
					x(r.objectType, n, "objectType", e, 1), x(r.indexType, n, "indexType", t, 1), n
				);
			}),
		(l.tSInferType = l.tsInferType =
			function (e) {
				var t = { type: "TSInferType", typeParameter: e },
					n = A.TSInferType;
				return x(n.typeParameter, t, "typeParameter", e, 1), t;
			}),
		(l.tSInstantiationExpression = l.tsInstantiationExpression =
			function (e, t = null) {
				var n = { type: "TSInstantiationExpression", expression: e, typeParameters: t },
					r = A.TSInstantiationExpression;
				return (
					x(r.expression, n, "expression", e, 1),
					x(r.typeParameters, n, "typeParameters", t, 1),
					n
				);
			}),
		(l.tSInterfaceBody = l.tsInterfaceBody =
			function (e) {
				var t = { type: "TSInterfaceBody", body: e },
					n = A.TSInterfaceBody;
				return x(n.body, t, "body", e, 1), t;
			}),
		(l.tSInterfaceDeclaration = l.tsInterfaceDeclaration =
			function (e, t = null, n = null, r) {
				var i = {
						type: "TSInterfaceDeclaration",
						id: e,
						typeParameters: t,
						extends: n,
						body: r
					},
					a = A.TSInterfaceDeclaration;
				return (
					x(a.id, i, "id", e, 1),
					x(a.typeParameters, i, "typeParameters", t, 1),
					x(a.extends, i, "extends", n, 1),
					x(a.body, i, "body", r, 1),
					i
				);
			}),
		(l.tSIntersectionType = l.tsIntersectionType =
			function (e) {
				var t = { type: "TSIntersectionType", types: e },
					n = A.TSIntersectionType;
				return x(n.types, t, "types", e, 1), t;
			}),
		(l.tSIntrinsicKeyword = l.tsIntrinsicKeyword =
			function () {
				return { type: "TSIntrinsicKeyword" };
			}),
		(l.tSLiteralType = l.tsLiteralType =
			function (e) {
				var t = { type: "TSLiteralType", literal: e },
					n = A.TSLiteralType;
				return x(n.literal, t, "literal", e, 1), t;
			}),
		(l.tSMappedType = l.tsMappedType =
			function (e, t = null, n = null) {
				var r = { type: "TSMappedType", typeParameter: e, typeAnnotation: t, nameType: n },
					i = A.TSMappedType;
				return (
					x(i.typeParameter, r, "typeParameter", e, 1),
					x(i.typeAnnotation, r, "typeAnnotation", t, 1),
					x(i.nameType, r, "nameType", n, 1),
					r
				);
			}),
		(l.tSMethodSignature = l.tsMethodSignature =
			function (e, t = null, n, r = null) {
				var i = {
						type: "TSMethodSignature",
						key: e,
						typeParameters: t,
						parameters: n,
						typeAnnotation: r,
						kind: null
					},
					a = A.TSMethodSignature;
				return (
					x(a.key, i, "key", e, 1),
					x(a.typeParameters, i, "typeParameters", t, 1),
					x(a.parameters, i, "parameters", n, 1),
					x(a.typeAnnotation, i, "typeAnnotation", r, 1),
					i
				);
			}),
		(l.tSModuleBlock = l.tsModuleBlock =
			function (e) {
				var t = { type: "TSModuleBlock", body: e },
					n = A.TSModuleBlock;
				return x(n.body, t, "body", e, 1), t;
			}),
		(l.tSModuleDeclaration = l.tsModuleDeclaration =
			function (e, t) {
				var n = { type: "TSModuleDeclaration", id: e, body: t, kind: null },
					r = A.TSModuleDeclaration;
				return x(r.id, n, "id", e, 1), x(r.body, n, "body", t, 1), n;
			}),
		(l.tSNamedTupleMember = l.tsNamedTupleMember =
			function (e, t, n = !1) {
				var r = { type: "TSNamedTupleMember", label: e, elementType: t, optional: n },
					i = A.TSNamedTupleMember;
				return (
					x(i.label, r, "label", e, 1),
					x(i.elementType, r, "elementType", t, 1),
					x(i.optional, r, "optional", n),
					r
				);
			}),
		(l.tSNamespaceExportDeclaration = l.tsNamespaceExportDeclaration =
			function (e) {
				var t = { type: "TSNamespaceExportDeclaration", id: e },
					n = A.TSNamespaceExportDeclaration;
				return x(n.id, t, "id", e, 1), t;
			}),
		(l.tSNeverKeyword = l.tsNeverKeyword =
			function () {
				return { type: "TSNeverKeyword" };
			}),
		(l.tSNonNullExpression = l.tsNonNullExpression =
			function (e) {
				var t = { type: "TSNonNullExpression", expression: e },
					n = A.TSNonNullExpression;
				return x(n.expression, t, "expression", e, 1), t;
			}),
		(l.tSNullKeyword = l.tsNullKeyword =
			function () {
				return { type: "TSNullKeyword" };
			}),
		(l.tSNumberKeyword = l.tsNumberKeyword =
			function () {
				return { type: "TSNumberKeyword" };
			}),
		(l.tSObjectKeyword = l.tsObjectKeyword =
			function () {
				return { type: "TSObjectKeyword" };
			}),
		(l.tSOptionalType = l.tsOptionalType =
			function (e) {
				var t = { type: "TSOptionalType", typeAnnotation: e },
					n = A.TSOptionalType;
				return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
			}),
		(l.tSParameterProperty = l.tsParameterProperty =
			function (e) {
				var t = { type: "TSParameterProperty", parameter: e },
					n = A.TSParameterProperty;
				return x(n.parameter, t, "parameter", e, 1), t;
			}),
		(l.tSParenthesizedType = l.tsParenthesizedType =
			function (e) {
				var t = { type: "TSParenthesizedType", typeAnnotation: e },
					n = A.TSParenthesizedType;
				return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
			}),
		(l.tSPropertySignature = l.tsPropertySignature =
			function (e, t = null) {
				var n = { type: "TSPropertySignature", key: e, typeAnnotation: t },
					r = A.TSPropertySignature;
				return x(r.key, n, "key", e, 1), x(r.typeAnnotation, n, "typeAnnotation", t, 1), n;
			}),
		(l.tSQualifiedName = l.tsQualifiedName =
			function (e, t) {
				var n = { type: "TSQualifiedName", left: e, right: t },
					r = A.TSQualifiedName;
				return x(r.left, n, "left", e, 1), x(r.right, n, "right", t, 1), n;
			}),
		(l.tSRestType = l.tsRestType =
			function (e) {
				var t = { type: "TSRestType", typeAnnotation: e },
					n = A.TSRestType;
				return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
			}),
		(l.tSSatisfiesExpression = l.tsSatisfiesExpression =
			function (e, t) {
				var n = { type: "TSSatisfiesExpression", expression: e, typeAnnotation: t },
					r = A.TSSatisfiesExpression;
				return (
					x(r.expression, n, "expression", e, 1),
					x(r.typeAnnotation, n, "typeAnnotation", t, 1),
					n
				);
			}),
		(l.tSStringKeyword = l.tsStringKeyword =
			function () {
				return { type: "TSStringKeyword" };
			}),
		(l.tSSymbolKeyword = l.tsSymbolKeyword =
			function () {
				return { type: "TSSymbolKeyword" };
			}),
		(l.tSTemplateLiteralType = l.tsTemplateLiteralType =
			function (e, t) {
				var n = { type: "TSTemplateLiteralType", quasis: e, types: t },
					r = A.TSTemplateLiteralType;
				return x(r.quasis, n, "quasis", e, 1), x(r.types, n, "types", t, 1), n;
			}),
		(l.tSThisType = l.tsThisType =
			function () {
				return { type: "TSThisType" };
			}),
		(l.tSTupleType = l.tsTupleType =
			function (e) {
				var t = { type: "TSTupleType", elementTypes: e },
					n = A.TSTupleType;
				return x(n.elementTypes, t, "elementTypes", e, 1), t;
			}),
		(l.tSTypeAliasDeclaration = l.tsTypeAliasDeclaration =
			function (e, t = null, n) {
				var r = {
						type: "TSTypeAliasDeclaration",
						id: e,
						typeParameters: t,
						typeAnnotation: n
					},
					i = A.TSTypeAliasDeclaration;
				return (
					x(i.id, r, "id", e, 1),
					x(i.typeParameters, r, "typeParameters", t, 1),
					x(i.typeAnnotation, r, "typeAnnotation", n, 1),
					r
				);
			}),
		(l.tSTypeAnnotation = l.tsTypeAnnotation =
			function (e) {
				var t = { type: "TSTypeAnnotation", typeAnnotation: e },
					n = A.TSTypeAnnotation;
				return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
			}),
		(l.tSTypeAssertion = l.tsTypeAssertion =
			function (e, t) {
				var n = { type: "TSTypeAssertion", typeAnnotation: e, expression: t },
					r = A.TSTypeAssertion;
				return (
					x(r.typeAnnotation, n, "typeAnnotation", e, 1),
					x(r.expression, n, "expression", t, 1),
					n
				);
			}),
		(l.tSTypeLiteral = l.tsTypeLiteral =
			function (e) {
				var t = { type: "TSTypeLiteral", members: e },
					n = A.TSTypeLiteral;
				return x(n.members, t, "members", e, 1), t;
			}),
		(l.tSTypeOperator = l.tsTypeOperator =
			function (e) {
				var t = { type: "TSTypeOperator", typeAnnotation: e, operator: null },
					n = A.TSTypeOperator;
				return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
			}),
		(l.tSTypeParameter = l.tsTypeParameter =
			function (e = null, t = null, n) {
				var r = { type: "TSTypeParameter", constraint: e, default: t, name: n },
					i = A.TSTypeParameter;
				return (
					x(i.constraint, r, "constraint", e, 1),
					x(i.default, r, "default", t, 1),
					x(i.name, r, "name", n),
					r
				);
			}),
		(l.tSTypeParameterDeclaration = l.tsTypeParameterDeclaration =
			function (e) {
				var t = { type: "TSTypeParameterDeclaration", params: e },
					n = A.TSTypeParameterDeclaration;
				return x(n.params, t, "params", e, 1), t;
			}),
		(l.tSTypeParameterInstantiation = l.tsTypeParameterInstantiation =
			function (e) {
				var t = { type: "TSTypeParameterInstantiation", params: e },
					n = A.TSTypeParameterInstantiation;
				return x(n.params, t, "params", e, 1), t;
			}),
		(l.tSTypePredicate = l.tsTypePredicate =
			function (e, t = null, n = null) {
				var r = {
						type: "TSTypePredicate",
						parameterName: e,
						typeAnnotation: t,
						asserts: n
					},
					i = A.TSTypePredicate;
				return (
					x(i.parameterName, r, "parameterName", e, 1),
					x(i.typeAnnotation, r, "typeAnnotation", t, 1),
					x(i.asserts, r, "asserts", n),
					r
				);
			}),
		(l.tSTypeQuery = l.tsTypeQuery =
			function (e, t = null) {
				var n = { type: "TSTypeQuery", exprName: e, typeParameters: t },
					r = A.TSTypeQuery;
				return (
					x(r.exprName, n, "exprName", e, 1),
					x(r.typeParameters, n, "typeParameters", t, 1),
					n
				);
			}),
		(l.tSTypeReference = l.tsTypeReference =
			function (e, t = null) {
				var n = { type: "TSTypeReference", typeName: e, typeParameters: t },
					r = A.TSTypeReference;
				return (
					x(r.typeName, n, "typeName", e, 1),
					x(r.typeParameters, n, "typeParameters", t, 1),
					n
				);
			}),
		(l.tSUndefinedKeyword = l.tsUndefinedKeyword =
			function () {
				return { type: "TSUndefinedKeyword" };
			}),
		(l.tSUnionType = l.tsUnionType =
			function (e) {
				var t = { type: "TSUnionType", types: e },
					n = A.TSUnionType;
				return x(n.types, t, "types", e, 1), t;
			}),
		(l.tSUnknownKeyword = l.tsUnknownKeyword =
			function () {
				return { type: "TSUnknownKeyword" };
			}),
		(l.tSVoidKeyword = l.tsVoidKeyword =
			function () {
				return { type: "TSVoidKeyword" };
			}),
		(l.tupleExpression = function (e = []) {
			var t = { type: "TupleExpression", elements: e },
				n = A.TupleExpression;
			return x(n.elements, t, "elements", e, 1), t;
		}),
		(l.tupleTypeAnnotation = function (e) {
			var t = { type: "TupleTypeAnnotation", types: e },
				n = A.TupleTypeAnnotation;
			return x(n.types, t, "types", e, 1), t;
		}),
		(l.typeAlias = function (e, t = null, n) {
			var r = { type: "TypeAlias", id: e, typeParameters: t, right: n },
				i = A.TypeAlias;
			return (
				x(i.id, r, "id", e, 1),
				x(i.typeParameters, r, "typeParameters", t, 1),
				x(i.right, r, "right", n, 1),
				r
			);
		}),
		(l.typeAnnotation = function (e) {
			var t = { type: "TypeAnnotation", typeAnnotation: e },
				n = A.TypeAnnotation;
			return x(n.typeAnnotation, t, "typeAnnotation", e, 1), t;
		}),
		(l.typeCastExpression = function (e, t) {
			var n = { type: "TypeCastExpression", expression: e, typeAnnotation: t },
				r = A.TypeCastExpression;
			return (
				x(r.expression, n, "expression", e, 1),
				x(r.typeAnnotation, n, "typeAnnotation", t, 1),
				n
			);
		}),
		(l.typeParameter = function (e = null, t = null, n = null) {
			var r = { type: "TypeParameter", bound: e, default: t, variance: n, name: null },
				i = A.TypeParameter;
			return (
				x(i.bound, r, "bound", e, 1),
				x(i.default, r, "default", t, 1),
				x(i.variance, r, "variance", n, 1),
				r
			);
		}),
		(l.typeParameterDeclaration = function (e) {
			var t = { type: "TypeParameterDeclaration", params: e },
				n = A.TypeParameterDeclaration;
			return x(n.params, t, "params", e, 1), t;
		}),
		(l.typeParameterInstantiation = function (e) {
			var t = { type: "TypeParameterInstantiation", params: e },
				n = A.TypeParameterInstantiation;
			return x(n.params, t, "params", e, 1), t;
		}),
		(l.typeofTypeAnnotation = function (e) {
			var t = { type: "TypeofTypeAnnotation", argument: e },
				n = A.TypeofTypeAnnotation;
			return x(n.argument, t, "argument", e, 1), t;
		}),
		(l.unaryExpression = function (e, t, n = !0) {
			var r = { type: "UnaryExpression", operator: e, argument: t, prefix: n },
				i = A.UnaryExpression;
			return (
				x(i.operator, r, "operator", e),
				x(i.argument, r, "argument", t, 1),
				x(i.prefix, r, "prefix", n),
				r
			);
		}),
		(l.unionTypeAnnotation = function (e) {
			var t = { type: "UnionTypeAnnotation", types: e },
				n = A.UnionTypeAnnotation;
			return x(n.types, t, "types", e, 1), t;
		}),
		(l.updateExpression = function (e, t, n = !1) {
			var r = { type: "UpdateExpression", operator: e, argument: t, prefix: n },
				i = A.UpdateExpression;
			return (
				x(i.operator, r, "operator", e),
				x(i.argument, r, "argument", t, 1),
				x(i.prefix, r, "prefix", n),
				r
			);
		}),
		(l.v8IntrinsicIdentifier = function (e) {
			var t = { type: "V8IntrinsicIdentifier", name: e },
				n = A.V8IntrinsicIdentifier;
			return x(n.name, t, "name", e), t;
		}),
		(l.variableDeclaration = function (e, t) {
			var n = { type: "VariableDeclaration", kind: e, declarations: t },
				r = A.VariableDeclaration;
			return x(r.kind, n, "kind", e), x(r.declarations, n, "declarations", t, 1), n;
		}),
		(l.variableDeclarator = function (e, t = null) {
			var n = { type: "VariableDeclarator", id: e, init: t },
				r = A.VariableDeclarator;
			return x(r.id, n, "id", e, 1), x(r.init, n, "init", t, 1), n;
		}),
		(l.variance = function (e) {
			var t = { type: "Variance", kind: e },
				n = A.Variance;
			return x(n.kind, t, "kind", e), t;
		}),
		(l.voidTypeAnnotation = function () {
			return { type: "VoidTypeAnnotation" };
		}),
		(l.whileStatement = function (e, t) {
			var n = { type: "WhileStatement", test: e, body: t },
				r = A.WhileStatement;
			return x(r.test, n, "test", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.withStatement = function (e, t) {
			var n = { type: "WithStatement", object: e, body: t },
				r = A.WithStatement;
			return x(r.object, n, "object", e, 1), x(r.body, n, "body", t, 1), n;
		}),
		(l.yieldExpression = function (e = null, t = !1) {
			var n = { type: "YieldExpression", argument: e, delegate: t },
				r = A.YieldExpression;
			return x(r.argument, n, "argument", e, 1), x(r.delegate, n, "delegate", t), n;
		});
	var pn = Ie;
	let x = Me.validateInternal,
		A = y.NODE_FIELDS;
	function un(e) {
		var t = { type: "NumericLiteral", value: e },
			n = A.NumericLiteral;
		return x(n.value, t, "value", e), t;
	}
	function cn(e, t = "") {
		var n = { type: "RegExpLiteral", pattern: e, flags: t },
			r = A.RegExpLiteral;
		return x(r.pattern, n, "pattern", e), x(r.flags, n, "flags", t), n;
	}
	function dn(e) {
		var t = { type: "RestElement", argument: e },
			n = A.RestElement;
		return x(n.argument, t, "argument", e, 1), t;
	}
	function fn(e) {
		var t = { type: "SpreadElement", argument: e },
			n = A.SpreadElement;
		return x(n.argument, t, "argument", e, 1), t;
	}
	var O,
		yn,
		mn,
		Tn,
		c = {},
		hn =
			((E = c),
			Object.defineProperty(E, "__esModule", { value: !0 }),
			Object.defineProperty(E, "AnyTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.anyTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "ArgumentPlaceholder", {
				enumerable: !0,
				get: function () {
					return O.argumentPlaceholder;
				}
			}),
			Object.defineProperty(E, "ArrayExpression", {
				enumerable: !0,
				get: function () {
					return O.arrayExpression;
				}
			}),
			Object.defineProperty(E, "ArrayPattern", {
				enumerable: !0,
				get: function () {
					return O.arrayPattern;
				}
			}),
			Object.defineProperty(E, "ArrayTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.arrayTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "ArrowFunctionExpression", {
				enumerable: !0,
				get: function () {
					return O.arrowFunctionExpression;
				}
			}),
			Object.defineProperty(E, "AssignmentExpression", {
				enumerable: !0,
				get: function () {
					return O.assignmentExpression;
				}
			}),
			Object.defineProperty(E, "AssignmentPattern", {
				enumerable: !0,
				get: function () {
					return O.assignmentPattern;
				}
			}),
			Object.defineProperty(E, "AwaitExpression", {
				enumerable: !0,
				get: function () {
					return O.awaitExpression;
				}
			}),
			Object.defineProperty(E, "BigIntLiteral", {
				enumerable: !0,
				get: function () {
					return O.bigIntLiteral;
				}
			}),
			Object.defineProperty(E, "BinaryExpression", {
				enumerable: !0,
				get: function () {
					return O.binaryExpression;
				}
			}),
			Object.defineProperty(E, "BindExpression", {
				enumerable: !0,
				get: function () {
					return O.bindExpression;
				}
			}),
			Object.defineProperty(E, "BlockStatement", {
				enumerable: !0,
				get: function () {
					return O.blockStatement;
				}
			}),
			Object.defineProperty(E, "BooleanLiteral", {
				enumerable: !0,
				get: function () {
					return O.booleanLiteral;
				}
			}),
			Object.defineProperty(E, "BooleanLiteralTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.booleanLiteralTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "BooleanTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.booleanTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "BreakStatement", {
				enumerable: !0,
				get: function () {
					return O.breakStatement;
				}
			}),
			Object.defineProperty(E, "CallExpression", {
				enumerable: !0,
				get: function () {
					return O.callExpression;
				}
			}),
			Object.defineProperty(E, "CatchClause", {
				enumerable: !0,
				get: function () {
					return O.catchClause;
				}
			}),
			Object.defineProperty(E, "ClassAccessorProperty", {
				enumerable: !0,
				get: function () {
					return O.classAccessorProperty;
				}
			}),
			Object.defineProperty(E, "ClassBody", {
				enumerable: !0,
				get: function () {
					return O.classBody;
				}
			}),
			Object.defineProperty(E, "ClassDeclaration", {
				enumerable: !0,
				get: function () {
					return O.classDeclaration;
				}
			}),
			Object.defineProperty(E, "ClassExpression", {
				enumerable: !0,
				get: function () {
					return O.classExpression;
				}
			}),
			Object.defineProperty(E, "ClassImplements", {
				enumerable: !0,
				get: function () {
					return O.classImplements;
				}
			}),
			Object.defineProperty(E, "ClassMethod", {
				enumerable: !0,
				get: function () {
					return O.classMethod;
				}
			}),
			Object.defineProperty(E, "ClassPrivateMethod", {
				enumerable: !0,
				get: function () {
					return O.classPrivateMethod;
				}
			}),
			Object.defineProperty(E, "ClassPrivateProperty", {
				enumerable: !0,
				get: function () {
					return O.classPrivateProperty;
				}
			}),
			Object.defineProperty(E, "ClassProperty", {
				enumerable: !0,
				get: function () {
					return O.classProperty;
				}
			}),
			Object.defineProperty(E, "ConditionalExpression", {
				enumerable: !0,
				get: function () {
					return O.conditionalExpression;
				}
			}),
			Object.defineProperty(E, "ContinueStatement", {
				enumerable: !0,
				get: function () {
					return O.continueStatement;
				}
			}),
			Object.defineProperty(E, "DebuggerStatement", {
				enumerable: !0,
				get: function () {
					return O.debuggerStatement;
				}
			}),
			Object.defineProperty(E, "DecimalLiteral", {
				enumerable: !0,
				get: function () {
					return O.decimalLiteral;
				}
			}),
			Object.defineProperty(E, "DeclareClass", {
				enumerable: !0,
				get: function () {
					return O.declareClass;
				}
			}),
			Object.defineProperty(E, "DeclareExportAllDeclaration", {
				enumerable: !0,
				get: function () {
					return O.declareExportAllDeclaration;
				}
			}),
			Object.defineProperty(E, "DeclareExportDeclaration", {
				enumerable: !0,
				get: function () {
					return O.declareExportDeclaration;
				}
			}),
			Object.defineProperty(E, "DeclareFunction", {
				enumerable: !0,
				get: function () {
					return O.declareFunction;
				}
			}),
			Object.defineProperty(E, "DeclareInterface", {
				enumerable: !0,
				get: function () {
					return O.declareInterface;
				}
			}),
			Object.defineProperty(E, "DeclareModule", {
				enumerable: !0,
				get: function () {
					return O.declareModule;
				}
			}),
			Object.defineProperty(E, "DeclareModuleExports", {
				enumerable: !0,
				get: function () {
					return O.declareModuleExports;
				}
			}),
			Object.defineProperty(E, "DeclareOpaqueType", {
				enumerable: !0,
				get: function () {
					return O.declareOpaqueType;
				}
			}),
			Object.defineProperty(E, "DeclareTypeAlias", {
				enumerable: !0,
				get: function () {
					return O.declareTypeAlias;
				}
			}),
			Object.defineProperty(E, "DeclareVariable", {
				enumerable: !0,
				get: function () {
					return O.declareVariable;
				}
			}),
			Object.defineProperty(E, "DeclaredPredicate", {
				enumerable: !0,
				get: function () {
					return O.declaredPredicate;
				}
			}),
			Object.defineProperty(E, "Decorator", {
				enumerable: !0,
				get: function () {
					return O.decorator;
				}
			}),
			Object.defineProperty(E, "Directive", {
				enumerable: !0,
				get: function () {
					return O.directive;
				}
			}),
			Object.defineProperty(E, "DirectiveLiteral", {
				enumerable: !0,
				get: function () {
					return O.directiveLiteral;
				}
			}),
			Object.defineProperty(E, "DoExpression", {
				enumerable: !0,
				get: function () {
					return O.doExpression;
				}
			}),
			Object.defineProperty(E, "DoWhileStatement", {
				enumerable: !0,
				get: function () {
					return O.doWhileStatement;
				}
			}),
			Object.defineProperty(E, "EmptyStatement", {
				enumerable: !0,
				get: function () {
					return O.emptyStatement;
				}
			}),
			Object.defineProperty(E, "EmptyTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.emptyTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "EnumBooleanBody", {
				enumerable: !0,
				get: function () {
					return O.enumBooleanBody;
				}
			}),
			Object.defineProperty(E, "EnumBooleanMember", {
				enumerable: !0,
				get: function () {
					return O.enumBooleanMember;
				}
			}),
			Object.defineProperty(E, "EnumDeclaration", {
				enumerable: !0,
				get: function () {
					return O.enumDeclaration;
				}
			}),
			Object.defineProperty(E, "EnumDefaultedMember", {
				enumerable: !0,
				get: function () {
					return O.enumDefaultedMember;
				}
			}),
			Object.defineProperty(E, "EnumNumberBody", {
				enumerable: !0,
				get: function () {
					return O.enumNumberBody;
				}
			}),
			Object.defineProperty(E, "EnumNumberMember", {
				enumerable: !0,
				get: function () {
					return O.enumNumberMember;
				}
			}),
			Object.defineProperty(E, "EnumStringBody", {
				enumerable: !0,
				get: function () {
					return O.enumStringBody;
				}
			}),
			Object.defineProperty(E, "EnumStringMember", {
				enumerable: !0,
				get: function () {
					return O.enumStringMember;
				}
			}),
			Object.defineProperty(E, "EnumSymbolBody", {
				enumerable: !0,
				get: function () {
					return O.enumSymbolBody;
				}
			}),
			Object.defineProperty(E, "ExistsTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.existsTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "ExportAllDeclaration", {
				enumerable: !0,
				get: function () {
					return O.exportAllDeclaration;
				}
			}),
			Object.defineProperty(E, "ExportDefaultDeclaration", {
				enumerable: !0,
				get: function () {
					return O.exportDefaultDeclaration;
				}
			}),
			Object.defineProperty(E, "ExportDefaultSpecifier", {
				enumerable: !0,
				get: function () {
					return O.exportDefaultSpecifier;
				}
			}),
			Object.defineProperty(E, "ExportNamedDeclaration", {
				enumerable: !0,
				get: function () {
					return O.exportNamedDeclaration;
				}
			}),
			Object.defineProperty(E, "ExportNamespaceSpecifier", {
				enumerable: !0,
				get: function () {
					return O.exportNamespaceSpecifier;
				}
			}),
			Object.defineProperty(E, "ExportSpecifier", {
				enumerable: !0,
				get: function () {
					return O.exportSpecifier;
				}
			}),
			Object.defineProperty(E, "ExpressionStatement", {
				enumerable: !0,
				get: function () {
					return O.expressionStatement;
				}
			}),
			Object.defineProperty(E, "File", {
				enumerable: !0,
				get: function () {
					return O.file;
				}
			}),
			Object.defineProperty(E, "ForInStatement", {
				enumerable: !0,
				get: function () {
					return O.forInStatement;
				}
			}),
			Object.defineProperty(E, "ForOfStatement", {
				enumerable: !0,
				get: function () {
					return O.forOfStatement;
				}
			}),
			Object.defineProperty(E, "ForStatement", {
				enumerable: !0,
				get: function () {
					return O.forStatement;
				}
			}),
			Object.defineProperty(E, "FunctionDeclaration", {
				enumerable: !0,
				get: function () {
					return O.functionDeclaration;
				}
			}),
			Object.defineProperty(E, "FunctionExpression", {
				enumerable: !0,
				get: function () {
					return O.functionExpression;
				}
			}),
			Object.defineProperty(E, "FunctionTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.functionTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "FunctionTypeParam", {
				enumerable: !0,
				get: function () {
					return O.functionTypeParam;
				}
			}),
			Object.defineProperty(E, "GenericTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.genericTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "Identifier", {
				enumerable: !0,
				get: function () {
					return O.identifier;
				}
			}),
			Object.defineProperty(E, "IfStatement", {
				enumerable: !0,
				get: function () {
					return O.ifStatement;
				}
			}),
			Object.defineProperty(E, "Import", {
				enumerable: !0,
				get: function () {
					return O.import;
				}
			}),
			Object.defineProperty(E, "ImportAttribute", {
				enumerable: !0,
				get: function () {
					return O.importAttribute;
				}
			}),
			Object.defineProperty(E, "ImportDeclaration", {
				enumerable: !0,
				get: function () {
					return O.importDeclaration;
				}
			}),
			Object.defineProperty(E, "ImportDefaultSpecifier", {
				enumerable: !0,
				get: function () {
					return O.importDefaultSpecifier;
				}
			}),
			Object.defineProperty(E, "ImportExpression", {
				enumerable: !0,
				get: function () {
					return O.importExpression;
				}
			}),
			Object.defineProperty(E, "ImportNamespaceSpecifier", {
				enumerable: !0,
				get: function () {
					return O.importNamespaceSpecifier;
				}
			}),
			Object.defineProperty(E, "ImportSpecifier", {
				enumerable: !0,
				get: function () {
					return O.importSpecifier;
				}
			}),
			Object.defineProperty(E, "IndexedAccessType", {
				enumerable: !0,
				get: function () {
					return O.indexedAccessType;
				}
			}),
			Object.defineProperty(E, "InferredPredicate", {
				enumerable: !0,
				get: function () {
					return O.inferredPredicate;
				}
			}),
			Object.defineProperty(E, "InterfaceDeclaration", {
				enumerable: !0,
				get: function () {
					return O.interfaceDeclaration;
				}
			}),
			Object.defineProperty(E, "InterfaceExtends", {
				enumerable: !0,
				get: function () {
					return O.interfaceExtends;
				}
			}),
			Object.defineProperty(E, "InterfaceTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.interfaceTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "InterpreterDirective", {
				enumerable: !0,
				get: function () {
					return O.interpreterDirective;
				}
			}),
			Object.defineProperty(E, "IntersectionTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.intersectionTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "JSXAttribute", {
				enumerable: !0,
				get: function () {
					return O.jsxAttribute;
				}
			}),
			Object.defineProperty(E, "JSXClosingElement", {
				enumerable: !0,
				get: function () {
					return O.jsxClosingElement;
				}
			}),
			Object.defineProperty(E, "JSXClosingFragment", {
				enumerable: !0,
				get: function () {
					return O.jsxClosingFragment;
				}
			}),
			Object.defineProperty(E, "JSXElement", {
				enumerable: !0,
				get: function () {
					return O.jsxElement;
				}
			}),
			Object.defineProperty(E, "JSXEmptyExpression", {
				enumerable: !0,
				get: function () {
					return O.jsxEmptyExpression;
				}
			}),
			Object.defineProperty(E, "JSXExpressionContainer", {
				enumerable: !0,
				get: function () {
					return O.jsxExpressionContainer;
				}
			}),
			Object.defineProperty(E, "JSXFragment", {
				enumerable: !0,
				get: function () {
					return O.jsxFragment;
				}
			}),
			Object.defineProperty(E, "JSXIdentifier", {
				enumerable: !0,
				get: function () {
					return O.jsxIdentifier;
				}
			}),
			Object.defineProperty(E, "JSXMemberExpression", {
				enumerable: !0,
				get: function () {
					return O.jsxMemberExpression;
				}
			}),
			Object.defineProperty(E, "JSXNamespacedName", {
				enumerable: !0,
				get: function () {
					return O.jsxNamespacedName;
				}
			}),
			Object.defineProperty(E, "JSXOpeningElement", {
				enumerable: !0,
				get: function () {
					return O.jsxOpeningElement;
				}
			}),
			Object.defineProperty(E, "JSXOpeningFragment", {
				enumerable: !0,
				get: function () {
					return O.jsxOpeningFragment;
				}
			}),
			Object.defineProperty(E, "JSXSpreadAttribute", {
				enumerable: !0,
				get: function () {
					return O.jsxSpreadAttribute;
				}
			}),
			Object.defineProperty(E, "JSXSpreadChild", {
				enumerable: !0,
				get: function () {
					return O.jsxSpreadChild;
				}
			}),
			Object.defineProperty(E, "JSXText", {
				enumerable: !0,
				get: function () {
					return O.jsxText;
				}
			}),
			Object.defineProperty(E, "LabeledStatement", {
				enumerable: !0,
				get: function () {
					return O.labeledStatement;
				}
			}),
			Object.defineProperty(E, "LogicalExpression", {
				enumerable: !0,
				get: function () {
					return O.logicalExpression;
				}
			}),
			Object.defineProperty(E, "MemberExpression", {
				enumerable: !0,
				get: function () {
					return O.memberExpression;
				}
			}),
			Object.defineProperty(E, "MetaProperty", {
				enumerable: !0,
				get: function () {
					return O.metaProperty;
				}
			}),
			Object.defineProperty(E, "MixedTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.mixedTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "ModuleExpression", {
				enumerable: !0,
				get: function () {
					return O.moduleExpression;
				}
			}),
			Object.defineProperty(E, "NewExpression", {
				enumerable: !0,
				get: function () {
					return O.newExpression;
				}
			}),
			Object.defineProperty(E, "Noop", {
				enumerable: !0,
				get: function () {
					return O.noop;
				}
			}),
			Object.defineProperty(E, "NullLiteral", {
				enumerable: !0,
				get: function () {
					return O.nullLiteral;
				}
			}),
			Object.defineProperty(E, "NullLiteralTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.nullLiteralTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "NullableTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.nullableTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "NumberLiteral", {
				enumerable: !0,
				get: function () {
					return O.numberLiteral;
				}
			}),
			Object.defineProperty(E, "NumberLiteralTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.numberLiteralTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "NumberTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.numberTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "NumericLiteral", {
				enumerable: !0,
				get: function () {
					return O.numericLiteral;
				}
			}),
			Object.defineProperty(E, "ObjectExpression", {
				enumerable: !0,
				get: function () {
					return O.objectExpression;
				}
			}),
			Object.defineProperty(E, "ObjectMethod", {
				enumerable: !0,
				get: function () {
					return O.objectMethod;
				}
			}),
			Object.defineProperty(E, "ObjectPattern", {
				enumerable: !0,
				get: function () {
					return O.objectPattern;
				}
			}),
			Object.defineProperty(E, "ObjectProperty", {
				enumerable: !0,
				get: function () {
					return O.objectProperty;
				}
			}),
			Object.defineProperty(E, "ObjectTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.objectTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "ObjectTypeCallProperty", {
				enumerable: !0,
				get: function () {
					return O.objectTypeCallProperty;
				}
			}),
			Object.defineProperty(E, "ObjectTypeIndexer", {
				enumerable: !0,
				get: function () {
					return O.objectTypeIndexer;
				}
			}),
			Object.defineProperty(E, "ObjectTypeInternalSlot", {
				enumerable: !0,
				get: function () {
					return O.objectTypeInternalSlot;
				}
			}),
			Object.defineProperty(E, "ObjectTypeProperty", {
				enumerable: !0,
				get: function () {
					return O.objectTypeProperty;
				}
			}),
			Object.defineProperty(E, "ObjectTypeSpreadProperty", {
				enumerable: !0,
				get: function () {
					return O.objectTypeSpreadProperty;
				}
			}),
			Object.defineProperty(E, "OpaqueType", {
				enumerable: !0,
				get: function () {
					return O.opaqueType;
				}
			}),
			Object.defineProperty(E, "OptionalCallExpression", {
				enumerable: !0,
				get: function () {
					return O.optionalCallExpression;
				}
			}),
			Object.defineProperty(E, "OptionalIndexedAccessType", {
				enumerable: !0,
				get: function () {
					return O.optionalIndexedAccessType;
				}
			}),
			Object.defineProperty(E, "OptionalMemberExpression", {
				enumerable: !0,
				get: function () {
					return O.optionalMemberExpression;
				}
			}),
			Object.defineProperty(E, "ParenthesizedExpression", {
				enumerable: !0,
				get: function () {
					return O.parenthesizedExpression;
				}
			}),
			Object.defineProperty(E, "PipelineBareFunction", {
				enumerable: !0,
				get: function () {
					return O.pipelineBareFunction;
				}
			}),
			Object.defineProperty(E, "PipelinePrimaryTopicReference", {
				enumerable: !0,
				get: function () {
					return O.pipelinePrimaryTopicReference;
				}
			}),
			Object.defineProperty(E, "PipelineTopicExpression", {
				enumerable: !0,
				get: function () {
					return O.pipelineTopicExpression;
				}
			}),
			Object.defineProperty(E, "Placeholder", {
				enumerable: !0,
				get: function () {
					return O.placeholder;
				}
			}),
			Object.defineProperty(E, "PrivateName", {
				enumerable: !0,
				get: function () {
					return O.privateName;
				}
			}),
			Object.defineProperty(E, "Program", {
				enumerable: !0,
				get: function () {
					return O.program;
				}
			}),
			Object.defineProperty(E, "QualifiedTypeIdentifier", {
				enumerable: !0,
				get: function () {
					return O.qualifiedTypeIdentifier;
				}
			}),
			Object.defineProperty(E, "RecordExpression", {
				enumerable: !0,
				get: function () {
					return O.recordExpression;
				}
			}),
			Object.defineProperty(E, "RegExpLiteral", {
				enumerable: !0,
				get: function () {
					return O.regExpLiteral;
				}
			}),
			Object.defineProperty(E, "RegexLiteral", {
				enumerable: !0,
				get: function () {
					return O.regexLiteral;
				}
			}),
			Object.defineProperty(E, "RestElement", {
				enumerable: !0,
				get: function () {
					return O.restElement;
				}
			}),
			Object.defineProperty(E, "RestProperty", {
				enumerable: !0,
				get: function () {
					return O.restProperty;
				}
			}),
			Object.defineProperty(E, "ReturnStatement", {
				enumerable: !0,
				get: function () {
					return O.returnStatement;
				}
			}),
			Object.defineProperty(E, "SequenceExpression", {
				enumerable: !0,
				get: function () {
					return O.sequenceExpression;
				}
			}),
			Object.defineProperty(E, "SpreadElement", {
				enumerable: !0,
				get: function () {
					return O.spreadElement;
				}
			}),
			Object.defineProperty(E, "SpreadProperty", {
				enumerable: !0,
				get: function () {
					return O.spreadProperty;
				}
			}),
			Object.defineProperty(E, "StaticBlock", {
				enumerable: !0,
				get: function () {
					return O.staticBlock;
				}
			}),
			Object.defineProperty(E, "StringLiteral", {
				enumerable: !0,
				get: function () {
					return O.stringLiteral;
				}
			}),
			Object.defineProperty(E, "StringLiteralTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.stringLiteralTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "StringTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.stringTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "Super", {
				enumerable: !0,
				get: function () {
					return O.super;
				}
			}),
			Object.defineProperty(E, "SwitchCase", {
				enumerable: !0,
				get: function () {
					return O.switchCase;
				}
			}),
			Object.defineProperty(E, "SwitchStatement", {
				enumerable: !0,
				get: function () {
					return O.switchStatement;
				}
			}),
			Object.defineProperty(E, "SymbolTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.symbolTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "TSAnyKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsAnyKeyword;
				}
			}),
			Object.defineProperty(E, "TSArrayType", {
				enumerable: !0,
				get: function () {
					return O.tsArrayType;
				}
			}),
			Object.defineProperty(E, "TSAsExpression", {
				enumerable: !0,
				get: function () {
					return O.tsAsExpression;
				}
			}),
			Object.defineProperty(E, "TSBigIntKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsBigIntKeyword;
				}
			}),
			Object.defineProperty(E, "TSBooleanKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsBooleanKeyword;
				}
			}),
			Object.defineProperty(E, "TSCallSignatureDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsCallSignatureDeclaration;
				}
			}),
			Object.defineProperty(E, "TSConditionalType", {
				enumerable: !0,
				get: function () {
					return O.tsConditionalType;
				}
			}),
			Object.defineProperty(E, "TSConstructSignatureDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsConstructSignatureDeclaration;
				}
			}),
			Object.defineProperty(E, "TSConstructorType", {
				enumerable: !0,
				get: function () {
					return O.tsConstructorType;
				}
			}),
			Object.defineProperty(E, "TSDeclareFunction", {
				enumerable: !0,
				get: function () {
					return O.tsDeclareFunction;
				}
			}),
			Object.defineProperty(E, "TSDeclareMethod", {
				enumerable: !0,
				get: function () {
					return O.tsDeclareMethod;
				}
			}),
			Object.defineProperty(E, "TSEnumBody", {
				enumerable: !0,
				get: function () {
					return O.tsEnumBody;
				}
			}),
			Object.defineProperty(E, "TSEnumDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsEnumDeclaration;
				}
			}),
			Object.defineProperty(E, "TSEnumMember", {
				enumerable: !0,
				get: function () {
					return O.tsEnumMember;
				}
			}),
			Object.defineProperty(E, "TSExportAssignment", {
				enumerable: !0,
				get: function () {
					return O.tsExportAssignment;
				}
			}),
			Object.defineProperty(E, "TSExpressionWithTypeArguments", {
				enumerable: !0,
				get: function () {
					return O.tsExpressionWithTypeArguments;
				}
			}),
			Object.defineProperty(E, "TSExternalModuleReference", {
				enumerable: !0,
				get: function () {
					return O.tsExternalModuleReference;
				}
			}),
			Object.defineProperty(E, "TSFunctionType", {
				enumerable: !0,
				get: function () {
					return O.tsFunctionType;
				}
			}),
			Object.defineProperty(E, "TSImportEqualsDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsImportEqualsDeclaration;
				}
			}),
			Object.defineProperty(E, "TSImportType", {
				enumerable: !0,
				get: function () {
					return O.tsImportType;
				}
			}),
			Object.defineProperty(E, "TSIndexSignature", {
				enumerable: !0,
				get: function () {
					return O.tsIndexSignature;
				}
			}),
			Object.defineProperty(E, "TSIndexedAccessType", {
				enumerable: !0,
				get: function () {
					return O.tsIndexedAccessType;
				}
			}),
			Object.defineProperty(E, "TSInferType", {
				enumerable: !0,
				get: function () {
					return O.tsInferType;
				}
			}),
			Object.defineProperty(E, "TSInstantiationExpression", {
				enumerable: !0,
				get: function () {
					return O.tsInstantiationExpression;
				}
			}),
			Object.defineProperty(E, "TSInterfaceBody", {
				enumerable: !0,
				get: function () {
					return O.tsInterfaceBody;
				}
			}),
			Object.defineProperty(E, "TSInterfaceDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsInterfaceDeclaration;
				}
			}),
			Object.defineProperty(E, "TSIntersectionType", {
				enumerable: !0,
				get: function () {
					return O.tsIntersectionType;
				}
			}),
			Object.defineProperty(E, "TSIntrinsicKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsIntrinsicKeyword;
				}
			}),
			Object.defineProperty(E, "TSLiteralType", {
				enumerable: !0,
				get: function () {
					return O.tsLiteralType;
				}
			}),
			Object.defineProperty(E, "TSMappedType", {
				enumerable: !0,
				get: function () {
					return O.tsMappedType;
				}
			}),
			Object.defineProperty(E, "TSMethodSignature", {
				enumerable: !0,
				get: function () {
					return O.tsMethodSignature;
				}
			}),
			Object.defineProperty(E, "TSModuleBlock", {
				enumerable: !0,
				get: function () {
					return O.tsModuleBlock;
				}
			}),
			Object.defineProperty(E, "TSModuleDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsModuleDeclaration;
				}
			}),
			Object.defineProperty(E, "TSNamedTupleMember", {
				enumerable: !0,
				get: function () {
					return O.tsNamedTupleMember;
				}
			}),
			Object.defineProperty(E, "TSNamespaceExportDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsNamespaceExportDeclaration;
				}
			}),
			Object.defineProperty(E, "TSNeverKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsNeverKeyword;
				}
			}),
			Object.defineProperty(E, "TSNonNullExpression", {
				enumerable: !0,
				get: function () {
					return O.tsNonNullExpression;
				}
			}),
			Object.defineProperty(E, "TSNullKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsNullKeyword;
				}
			}),
			Object.defineProperty(E, "TSNumberKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsNumberKeyword;
				}
			}),
			Object.defineProperty(E, "TSObjectKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsObjectKeyword;
				}
			}),
			Object.defineProperty(E, "TSOptionalType", {
				enumerable: !0,
				get: function () {
					return O.tsOptionalType;
				}
			}),
			Object.defineProperty(E, "TSParameterProperty", {
				enumerable: !0,
				get: function () {
					return O.tsParameterProperty;
				}
			}),
			Object.defineProperty(E, "TSParenthesizedType", {
				enumerable: !0,
				get: function () {
					return O.tsParenthesizedType;
				}
			}),
			Object.defineProperty(E, "TSPropertySignature", {
				enumerable: !0,
				get: function () {
					return O.tsPropertySignature;
				}
			}),
			Object.defineProperty(E, "TSQualifiedName", {
				enumerable: !0,
				get: function () {
					return O.tsQualifiedName;
				}
			}),
			Object.defineProperty(E, "TSRestType", {
				enumerable: !0,
				get: function () {
					return O.tsRestType;
				}
			}),
			Object.defineProperty(E, "TSSatisfiesExpression", {
				enumerable: !0,
				get: function () {
					return O.tsSatisfiesExpression;
				}
			}),
			Object.defineProperty(E, "TSStringKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsStringKeyword;
				}
			}),
			Object.defineProperty(E, "TSSymbolKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsSymbolKeyword;
				}
			}),
			Object.defineProperty(E, "TSTemplateLiteralType", {
				enumerable: !0,
				get: function () {
					return O.tsTemplateLiteralType;
				}
			}),
			Object.defineProperty(E, "TSThisType", {
				enumerable: !0,
				get: function () {
					return O.tsThisType;
				}
			}),
			Object.defineProperty(E, "TSTupleType", {
				enumerable: !0,
				get: function () {
					return O.tsTupleType;
				}
			}),
			Object.defineProperty(E, "TSTypeAliasDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsTypeAliasDeclaration;
				}
			}),
			Object.defineProperty(E, "TSTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.tsTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "TSTypeAssertion", {
				enumerable: !0,
				get: function () {
					return O.tsTypeAssertion;
				}
			}),
			Object.defineProperty(E, "TSTypeLiteral", {
				enumerable: !0,
				get: function () {
					return O.tsTypeLiteral;
				}
			}),
			Object.defineProperty(E, "TSTypeOperator", {
				enumerable: !0,
				get: function () {
					return O.tsTypeOperator;
				}
			}),
			Object.defineProperty(E, "TSTypeParameter", {
				enumerable: !0,
				get: function () {
					return O.tsTypeParameter;
				}
			}),
			Object.defineProperty(E, "TSTypeParameterDeclaration", {
				enumerable: !0,
				get: function () {
					return O.tsTypeParameterDeclaration;
				}
			}),
			Object.defineProperty(E, "TSTypeParameterInstantiation", {
				enumerable: !0,
				get: function () {
					return O.tsTypeParameterInstantiation;
				}
			}),
			Object.defineProperty(E, "TSTypePredicate", {
				enumerable: !0,
				get: function () {
					return O.tsTypePredicate;
				}
			}),
			Object.defineProperty(E, "TSTypeQuery", {
				enumerable: !0,
				get: function () {
					return O.tsTypeQuery;
				}
			}),
			Object.defineProperty(E, "TSTypeReference", {
				enumerable: !0,
				get: function () {
					return O.tsTypeReference;
				}
			}),
			Object.defineProperty(E, "TSUndefinedKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsUndefinedKeyword;
				}
			}),
			Object.defineProperty(E, "TSUnionType", {
				enumerable: !0,
				get: function () {
					return O.tsUnionType;
				}
			}),
			Object.defineProperty(E, "TSUnknownKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsUnknownKeyword;
				}
			}),
			Object.defineProperty(E, "TSVoidKeyword", {
				enumerable: !0,
				get: function () {
					return O.tsVoidKeyword;
				}
			}),
			Object.defineProperty(E, "TaggedTemplateExpression", {
				enumerable: !0,
				get: function () {
					return O.taggedTemplateExpression;
				}
			}),
			Object.defineProperty(E, "TemplateElement", {
				enumerable: !0,
				get: function () {
					return O.templateElement;
				}
			}),
			Object.defineProperty(E, "TemplateLiteral", {
				enumerable: !0,
				get: function () {
					return O.templateLiteral;
				}
			}),
			Object.defineProperty(E, "ThisExpression", {
				enumerable: !0,
				get: function () {
					return O.thisExpression;
				}
			}),
			Object.defineProperty(E, "ThisTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.thisTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "ThrowStatement", {
				enumerable: !0,
				get: function () {
					return O.throwStatement;
				}
			}),
			Object.defineProperty(E, "TopicReference", {
				enumerable: !0,
				get: function () {
					return O.topicReference;
				}
			}),
			Object.defineProperty(E, "TryStatement", {
				enumerable: !0,
				get: function () {
					return O.tryStatement;
				}
			}),
			Object.defineProperty(E, "TupleExpression", {
				enumerable: !0,
				get: function () {
					return O.tupleExpression;
				}
			}),
			Object.defineProperty(E, "TupleTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.tupleTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "TypeAlias", {
				enumerable: !0,
				get: function () {
					return O.typeAlias;
				}
			}),
			Object.defineProperty(E, "TypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.typeAnnotation;
				}
			}),
			Object.defineProperty(E, "TypeCastExpression", {
				enumerable: !0,
				get: function () {
					return O.typeCastExpression;
				}
			}),
			Object.defineProperty(E, "TypeParameter", {
				enumerable: !0,
				get: function () {
					return O.typeParameter;
				}
			}),
			Object.defineProperty(E, "TypeParameterDeclaration", {
				enumerable: !0,
				get: function () {
					return O.typeParameterDeclaration;
				}
			}),
			Object.defineProperty(E, "TypeParameterInstantiation", {
				enumerable: !0,
				get: function () {
					return O.typeParameterInstantiation;
				}
			}),
			Object.defineProperty(E, "TypeofTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.typeofTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "UnaryExpression", {
				enumerable: !0,
				get: function () {
					return O.unaryExpression;
				}
			}),
			Object.defineProperty(E, "UnionTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.unionTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "UpdateExpression", {
				enumerable: !0,
				get: function () {
					return O.updateExpression;
				}
			}),
			Object.defineProperty(E, "V8IntrinsicIdentifier", {
				enumerable: !0,
				get: function () {
					return O.v8IntrinsicIdentifier;
				}
			}),
			Object.defineProperty(E, "VariableDeclaration", {
				enumerable: !0,
				get: function () {
					return O.variableDeclaration;
				}
			}),
			Object.defineProperty(E, "VariableDeclarator", {
				enumerable: !0,
				get: function () {
					return O.variableDeclarator;
				}
			}),
			Object.defineProperty(E, "Variance", {
				enumerable: !0,
				get: function () {
					return O.variance;
				}
			}),
			Object.defineProperty(E, "VoidTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return O.voidTypeAnnotation;
				}
			}),
			Object.defineProperty(E, "WhileStatement", {
				enumerable: !0,
				get: function () {
					return O.whileStatement;
				}
			}),
			Object.defineProperty(E, "WithStatement", {
				enumerable: !0,
				get: function () {
					return O.withStatement;
				}
			}),
			Object.defineProperty(E, "YieldExpression", {
				enumerable: !0,
				get: function () {
					return O.yieldExpression;
				}
			}),
			(O = l),
			(yn = s),
			Object.defineProperty(yn, "__esModule", { value: !0 }),
			(mn = l),
			Object.keys(mn).forEach(function (e) {
				"default" === e ||
					"__esModule" === e ||
					(e in yn && yn[e] === mn[e]) ||
					Object.defineProperty(yn, e, {
						enumerable: !0,
						get: function () {
							return mn[e];
						}
					});
			}),
			(Tn = c),
			Object.keys(Tn).forEach(function (e) {
				"default" === e ||
					"__esModule" === e ||
					(e in yn && yn[e] === Tn[e]) ||
					Object.defineProperty(yn, e, {
						enumerable: !0,
						get: function () {
							return Tn[e];
						}
					});
			}),
			Object.defineProperty(o, "__esModule", { value: !0 }),
			(o.default = function (e, t) {
				let n = e.value.split(/\r\n|\n|\r/),
					r = 0;
				for (let e = 0; e < n.length; e++) /[^ \t]/.exec(n[e]) && (r = e);
				let i = "";
				for (let t = 0; t < n.length; t++) {
					var a = n[t],
						o = 0 === t,
						s = t === n.length - 1,
						l = t === r;
					let e = a.replace(/\t/g, " ");
					o || (e = e.replace(/^ +/, "")),
						(e = s ? e : e.replace(/ +$/, "")) && (l || (e += " "), (i += e));
				}
				i && t.push((0, Sn.inherits)((0, hn.stringLiteral)(i), e));
			}),
			s),
		Sn = e;
	Object.defineProperty(Le, "__esModule", { value: !0 }),
		(Le.default = function (n) {
			var r = [];
			for (let t = 0; t < n.children.length; t++) {
				let e = n.children[t];
				(0, bn.isJSXText)(e)
					? (0, En.default)(e, r)
					: ((0, bn.isJSXExpressionContainer)(e) && (e = e.expression),
						(0, bn.isJSXEmptyExpression)(e) || r.push(e));
			}
			return r;
		});
	var bn = r,
		En = o;
	var f = {},
		d = {},
		vn =
			(Object.defineProperty(d, "__esModule", { value: !0 }),
			(d.default = function (e) {
				return !(!e || !vn.VISITOR_KEYS[e.type]);
			}),
			Be);
	Object.defineProperty(f, "__esModule", { value: !0 }),
		(f.default = function (e) {
			{
				var t;
				if (!(0, gn.default)(e))
					throw (
						((t = null != (t = null == e ? void 0 : e.type) ? t : JSON.stringify(e)),
						new TypeError(`Not a valid node of type "${t}"`))
					);
			}
		});
	var gn = d;
	var p = {},
		Pn =
			(Object.defineProperty(p, "__esModule", { value: !0 }),
			(p.assertAccessor = function (e, t) {
				_("Accessor", e, t);
			}),
			(p.assertAnyTypeAnnotation = function (e, t) {
				_("AnyTypeAnnotation", e, t);
			}),
			(p.assertArgumentPlaceholder = function (e, t) {
				_("ArgumentPlaceholder", e, t);
			}),
			(p.assertArrayExpression = function (e, t) {
				_("ArrayExpression", e, t);
			}),
			(p.assertArrayPattern = function (e, t) {
				_("ArrayPattern", e, t);
			}),
			(p.assertArrayTypeAnnotation = function (e, t) {
				_("ArrayTypeAnnotation", e, t);
			}),
			(p.assertArrowFunctionExpression = function (e, t) {
				_("ArrowFunctionExpression", e, t);
			}),
			(p.assertAssignmentExpression = function (e, t) {
				_("AssignmentExpression", e, t);
			}),
			(p.assertAssignmentPattern = function (e, t) {
				_("AssignmentPattern", e, t);
			}),
			(p.assertAwaitExpression = function (e, t) {
				_("AwaitExpression", e, t);
			}),
			(p.assertBigIntLiteral = function (e, t) {
				_("BigIntLiteral", e, t);
			}),
			(p.assertBinary = function (e, t) {
				_("Binary", e, t);
			}),
			(p.assertBinaryExpression = function (e, t) {
				_("BinaryExpression", e, t);
			}),
			(p.assertBindExpression = function (e, t) {
				_("BindExpression", e, t);
			}),
			(p.assertBlock = function (e, t) {
				_("Block", e, t);
			}),
			(p.assertBlockParent = function (e, t) {
				_("BlockParent", e, t);
			}),
			(p.assertBlockStatement = function (e, t) {
				_("BlockStatement", e, t);
			}),
			(p.assertBooleanLiteral = function (e, t) {
				_("BooleanLiteral", e, t);
			}),
			(p.assertBooleanLiteralTypeAnnotation = function (e, t) {
				_("BooleanLiteralTypeAnnotation", e, t);
			}),
			(p.assertBooleanTypeAnnotation = function (e, t) {
				_("BooleanTypeAnnotation", e, t);
			}),
			(p.assertBreakStatement = function (e, t) {
				_("BreakStatement", e, t);
			}),
			(p.assertCallExpression = function (e, t) {
				_("CallExpression", e, t);
			}),
			(p.assertCatchClause = function (e, t) {
				_("CatchClause", e, t);
			}),
			(p.assertClass = function (e, t) {
				_("Class", e, t);
			}),
			(p.assertClassAccessorProperty = function (e, t) {
				_("ClassAccessorProperty", e, t);
			}),
			(p.assertClassBody = function (e, t) {
				_("ClassBody", e, t);
			}),
			(p.assertClassDeclaration = function (e, t) {
				_("ClassDeclaration", e, t);
			}),
			(p.assertClassExpression = function (e, t) {
				_("ClassExpression", e, t);
			}),
			(p.assertClassImplements = function (e, t) {
				_("ClassImplements", e, t);
			}),
			(p.assertClassMethod = function (e, t) {
				_("ClassMethod", e, t);
			}),
			(p.assertClassPrivateMethod = function (e, t) {
				_("ClassPrivateMethod", e, t);
			}),
			(p.assertClassPrivateProperty = function (e, t) {
				_("ClassPrivateProperty", e, t);
			}),
			(p.assertClassProperty = function (e, t) {
				_("ClassProperty", e, t);
			}),
			(p.assertCompletionStatement = function (e, t) {
				_("CompletionStatement", e, t);
			}),
			(p.assertConditional = function (e, t) {
				_("Conditional", e, t);
			}),
			(p.assertConditionalExpression = function (e, t) {
				_("ConditionalExpression", e, t);
			}),
			(p.assertContinueStatement = function (e, t) {
				_("ContinueStatement", e, t);
			}),
			(p.assertDebuggerStatement = function (e, t) {
				_("DebuggerStatement", e, t);
			}),
			(p.assertDecimalLiteral = function (e, t) {
				_("DecimalLiteral", e, t);
			}),
			(p.assertDeclaration = function (e, t) {
				_("Declaration", e, t);
			}),
			(p.assertDeclareClass = function (e, t) {
				_("DeclareClass", e, t);
			}),
			(p.assertDeclareExportAllDeclaration = function (e, t) {
				_("DeclareExportAllDeclaration", e, t);
			}),
			(p.assertDeclareExportDeclaration = function (e, t) {
				_("DeclareExportDeclaration", e, t);
			}),
			(p.assertDeclareFunction = function (e, t) {
				_("DeclareFunction", e, t);
			}),
			(p.assertDeclareInterface = function (e, t) {
				_("DeclareInterface", e, t);
			}),
			(p.assertDeclareModule = function (e, t) {
				_("DeclareModule", e, t);
			}),
			(p.assertDeclareModuleExports = function (e, t) {
				_("DeclareModuleExports", e, t);
			}),
			(p.assertDeclareOpaqueType = function (e, t) {
				_("DeclareOpaqueType", e, t);
			}),
			(p.assertDeclareTypeAlias = function (e, t) {
				_("DeclareTypeAlias", e, t);
			}),
			(p.assertDeclareVariable = function (e, t) {
				_("DeclareVariable", e, t);
			}),
			(p.assertDeclaredPredicate = function (e, t) {
				_("DeclaredPredicate", e, t);
			}),
			(p.assertDecorator = function (e, t) {
				_("Decorator", e, t);
			}),
			(p.assertDirective = function (e, t) {
				_("Directive", e, t);
			}),
			(p.assertDirectiveLiteral = function (e, t) {
				_("DirectiveLiteral", e, t);
			}),
			(p.assertDoExpression = function (e, t) {
				_("DoExpression", e, t);
			}),
			(p.assertDoWhileStatement = function (e, t) {
				_("DoWhileStatement", e, t);
			}),
			(p.assertEmptyStatement = function (e, t) {
				_("EmptyStatement", e, t);
			}),
			(p.assertEmptyTypeAnnotation = function (e, t) {
				_("EmptyTypeAnnotation", e, t);
			}),
			(p.assertEnumBody = function (e, t) {
				_("EnumBody", e, t);
			}),
			(p.assertEnumBooleanBody = function (e, t) {
				_("EnumBooleanBody", e, t);
			}),
			(p.assertEnumBooleanMember = function (e, t) {
				_("EnumBooleanMember", e, t);
			}),
			(p.assertEnumDeclaration = function (e, t) {
				_("EnumDeclaration", e, t);
			}),
			(p.assertEnumDefaultedMember = function (e, t) {
				_("EnumDefaultedMember", e, t);
			}),
			(p.assertEnumMember = function (e, t) {
				_("EnumMember", e, t);
			}),
			(p.assertEnumNumberBody = function (e, t) {
				_("EnumNumberBody", e, t);
			}),
			(p.assertEnumNumberMember = function (e, t) {
				_("EnumNumberMember", e, t);
			}),
			(p.assertEnumStringBody = function (e, t) {
				_("EnumStringBody", e, t);
			}),
			(p.assertEnumStringMember = function (e, t) {
				_("EnumStringMember", e, t);
			}),
			(p.assertEnumSymbolBody = function (e, t) {
				_("EnumSymbolBody", e, t);
			}),
			(p.assertExistsTypeAnnotation = function (e, t) {
				_("ExistsTypeAnnotation", e, t);
			}),
			(p.assertExportAllDeclaration = function (e, t) {
				_("ExportAllDeclaration", e, t);
			}),
			(p.assertExportDeclaration = function (e, t) {
				_("ExportDeclaration", e, t);
			}),
			(p.assertExportDefaultDeclaration = function (e, t) {
				_("ExportDefaultDeclaration", e, t);
			}),
			(p.assertExportDefaultSpecifier = function (e, t) {
				_("ExportDefaultSpecifier", e, t);
			}),
			(p.assertExportNamedDeclaration = function (e, t) {
				_("ExportNamedDeclaration", e, t);
			}),
			(p.assertExportNamespaceSpecifier = function (e, t) {
				_("ExportNamespaceSpecifier", e, t);
			}),
			(p.assertExportSpecifier = function (e, t) {
				_("ExportSpecifier", e, t);
			}),
			(p.assertExpression = function (e, t) {
				_("Expression", e, t);
			}),
			(p.assertExpressionStatement = function (e, t) {
				_("ExpressionStatement", e, t);
			}),
			(p.assertExpressionWrapper = function (e, t) {
				_("ExpressionWrapper", e, t);
			}),
			(p.assertFile = function (e, t) {
				_("File", e, t);
			}),
			(p.assertFlow = function (e, t) {
				_("Flow", e, t);
			}),
			(p.assertFlowBaseAnnotation = function (e, t) {
				_("FlowBaseAnnotation", e, t);
			}),
			(p.assertFlowDeclaration = function (e, t) {
				_("FlowDeclaration", e, t);
			}),
			(p.assertFlowPredicate = function (e, t) {
				_("FlowPredicate", e, t);
			}),
			(p.assertFlowType = function (e, t) {
				_("FlowType", e, t);
			}),
			(p.assertFor = function (e, t) {
				_("For", e, t);
			}),
			(p.assertForInStatement = function (e, t) {
				_("ForInStatement", e, t);
			}),
			(p.assertForOfStatement = function (e, t) {
				_("ForOfStatement", e, t);
			}),
			(p.assertForStatement = function (e, t) {
				_("ForStatement", e, t);
			}),
			(p.assertForXStatement = function (e, t) {
				_("ForXStatement", e, t);
			}),
			(p.assertFunction = function (e, t) {
				_("Function", e, t);
			}),
			(p.assertFunctionDeclaration = function (e, t) {
				_("FunctionDeclaration", e, t);
			}),
			(p.assertFunctionExpression = function (e, t) {
				_("FunctionExpression", e, t);
			}),
			(p.assertFunctionParent = function (e, t) {
				_("FunctionParent", e, t);
			}),
			(p.assertFunctionTypeAnnotation = function (e, t) {
				_("FunctionTypeAnnotation", e, t);
			}),
			(p.assertFunctionTypeParam = function (e, t) {
				_("FunctionTypeParam", e, t);
			}),
			(p.assertGenericTypeAnnotation = function (e, t) {
				_("GenericTypeAnnotation", e, t);
			}),
			(p.assertIdentifier = function (e, t) {
				_("Identifier", e, t);
			}),
			(p.assertIfStatement = function (e, t) {
				_("IfStatement", e, t);
			}),
			(p.assertImmutable = function (e, t) {
				_("Immutable", e, t);
			}),
			(p.assertImport = function (e, t) {
				_("Import", e, t);
			}),
			(p.assertImportAttribute = function (e, t) {
				_("ImportAttribute", e, t);
			}),
			(p.assertImportDeclaration = function (e, t) {
				_("ImportDeclaration", e, t);
			}),
			(p.assertImportDefaultSpecifier = function (e, t) {
				_("ImportDefaultSpecifier", e, t);
			}),
			(p.assertImportExpression = function (e, t) {
				_("ImportExpression", e, t);
			}),
			(p.assertImportNamespaceSpecifier = function (e, t) {
				_("ImportNamespaceSpecifier", e, t);
			}),
			(p.assertImportOrExportDeclaration = function (e, t) {
				_("ImportOrExportDeclaration", e, t);
			}),
			(p.assertImportSpecifier = function (e, t) {
				_("ImportSpecifier", e, t);
			}),
			(p.assertIndexedAccessType = function (e, t) {
				_("IndexedAccessType", e, t);
			}),
			(p.assertInferredPredicate = function (e, t) {
				_("InferredPredicate", e, t);
			}),
			(p.assertInterfaceDeclaration = function (e, t) {
				_("InterfaceDeclaration", e, t);
			}),
			(p.assertInterfaceExtends = function (e, t) {
				_("InterfaceExtends", e, t);
			}),
			(p.assertInterfaceTypeAnnotation = function (e, t) {
				_("InterfaceTypeAnnotation", e, t);
			}),
			(p.assertInterpreterDirective = function (e, t) {
				_("InterpreterDirective", e, t);
			}),
			(p.assertIntersectionTypeAnnotation = function (e, t) {
				_("IntersectionTypeAnnotation", e, t);
			}),
			(p.assertJSX = function (e, t) {
				_("JSX", e, t);
			}),
			(p.assertJSXAttribute = function (e, t) {
				_("JSXAttribute", e, t);
			}),
			(p.assertJSXClosingElement = function (e, t) {
				_("JSXClosingElement", e, t);
			}),
			(p.assertJSXClosingFragment = function (e, t) {
				_("JSXClosingFragment", e, t);
			}),
			(p.assertJSXElement = function (e, t) {
				_("JSXElement", e, t);
			}),
			(p.assertJSXEmptyExpression = function (e, t) {
				_("JSXEmptyExpression", e, t);
			}),
			(p.assertJSXExpressionContainer = function (e, t) {
				_("JSXExpressionContainer", e, t);
			}),
			(p.assertJSXFragment = function (e, t) {
				_("JSXFragment", e, t);
			}),
			(p.assertJSXIdentifier = function (e, t) {
				_("JSXIdentifier", e, t);
			}),
			(p.assertJSXMemberExpression = function (e, t) {
				_("JSXMemberExpression", e, t);
			}),
			(p.assertJSXNamespacedName = function (e, t) {
				_("JSXNamespacedName", e, t);
			}),
			(p.assertJSXOpeningElement = function (e, t) {
				_("JSXOpeningElement", e, t);
			}),
			(p.assertJSXOpeningFragment = function (e, t) {
				_("JSXOpeningFragment", e, t);
			}),
			(p.assertJSXSpreadAttribute = function (e, t) {
				_("JSXSpreadAttribute", e, t);
			}),
			(p.assertJSXSpreadChild = function (e, t) {
				_("JSXSpreadChild", e, t);
			}),
			(p.assertJSXText = function (e, t) {
				_("JSXText", e, t);
			}),
			(p.assertLVal = function (e, t) {
				_("LVal", e, t);
			}),
			(p.assertLabeledStatement = function (e, t) {
				_("LabeledStatement", e, t);
			}),
			(p.assertLiteral = function (e, t) {
				_("Literal", e, t);
			}),
			(p.assertLogicalExpression = function (e, t) {
				_("LogicalExpression", e, t);
			}),
			(p.assertLoop = function (e, t) {
				_("Loop", e, t);
			}),
			(p.assertMemberExpression = function (e, t) {
				_("MemberExpression", e, t);
			}),
			(p.assertMetaProperty = function (e, t) {
				_("MetaProperty", e, t);
			}),
			(p.assertMethod = function (e, t) {
				_("Method", e, t);
			}),
			(p.assertMiscellaneous = function (e, t) {
				_("Miscellaneous", e, t);
			}),
			(p.assertMixedTypeAnnotation = function (e, t) {
				_("MixedTypeAnnotation", e, t);
			}),
			(p.assertModuleDeclaration = function (e, t) {
				(0, xn.default)("assertModuleDeclaration", "assertImportOrExportDeclaration"),
					_("ModuleDeclaration", e, t);
			}),
			(p.assertModuleExpression = function (e, t) {
				_("ModuleExpression", e, t);
			}),
			(p.assertModuleSpecifier = function (e, t) {
				_("ModuleSpecifier", e, t);
			}),
			(p.assertNewExpression = function (e, t) {
				_("NewExpression", e, t);
			}),
			(p.assertNoop = function (e, t) {
				_("Noop", e, t);
			}),
			(p.assertNullLiteral = function (e, t) {
				_("NullLiteral", e, t);
			}),
			(p.assertNullLiteralTypeAnnotation = function (e, t) {
				_("NullLiteralTypeAnnotation", e, t);
			}),
			(p.assertNullableTypeAnnotation = function (e, t) {
				_("NullableTypeAnnotation", e, t);
			}),
			(p.assertNumberLiteral = function (e, t) {
				(0, xn.default)("assertNumberLiteral", "assertNumericLiteral"),
					_("NumberLiteral", e, t);
			}),
			(p.assertNumberLiteralTypeAnnotation = function (e, t) {
				_("NumberLiteralTypeAnnotation", e, t);
			}),
			(p.assertNumberTypeAnnotation = function (e, t) {
				_("NumberTypeAnnotation", e, t);
			}),
			(p.assertNumericLiteral = function (e, t) {
				_("NumericLiteral", e, t);
			}),
			(p.assertObjectExpression = function (e, t) {
				_("ObjectExpression", e, t);
			}),
			(p.assertObjectMember = function (e, t) {
				_("ObjectMember", e, t);
			}),
			(p.assertObjectMethod = function (e, t) {
				_("ObjectMethod", e, t);
			}),
			(p.assertObjectPattern = function (e, t) {
				_("ObjectPattern", e, t);
			}),
			(p.assertObjectProperty = function (e, t) {
				_("ObjectProperty", e, t);
			}),
			(p.assertObjectTypeAnnotation = function (e, t) {
				_("ObjectTypeAnnotation", e, t);
			}),
			(p.assertObjectTypeCallProperty = function (e, t) {
				_("ObjectTypeCallProperty", e, t);
			}),
			(p.assertObjectTypeIndexer = function (e, t) {
				_("ObjectTypeIndexer", e, t);
			}),
			(p.assertObjectTypeInternalSlot = function (e, t) {
				_("ObjectTypeInternalSlot", e, t);
			}),
			(p.assertObjectTypeProperty = function (e, t) {
				_("ObjectTypeProperty", e, t);
			}),
			(p.assertObjectTypeSpreadProperty = function (e, t) {
				_("ObjectTypeSpreadProperty", e, t);
			}),
			(p.assertOpaqueType = function (e, t) {
				_("OpaqueType", e, t);
			}),
			(p.assertOptionalCallExpression = function (e, t) {
				_("OptionalCallExpression", e, t);
			}),
			(p.assertOptionalIndexedAccessType = function (e, t) {
				_("OptionalIndexedAccessType", e, t);
			}),
			(p.assertOptionalMemberExpression = function (e, t) {
				_("OptionalMemberExpression", e, t);
			}),
			(p.assertParenthesizedExpression = function (e, t) {
				_("ParenthesizedExpression", e, t);
			}),
			(p.assertPattern = function (e, t) {
				_("Pattern", e, t);
			}),
			(p.assertPatternLike = function (e, t) {
				_("PatternLike", e, t);
			}),
			(p.assertPipelineBareFunction = function (e, t) {
				_("PipelineBareFunction", e, t);
			}),
			(p.assertPipelinePrimaryTopicReference = function (e, t) {
				_("PipelinePrimaryTopicReference", e, t);
			}),
			(p.assertPipelineTopicExpression = function (e, t) {
				_("PipelineTopicExpression", e, t);
			}),
			(p.assertPlaceholder = function (e, t) {
				_("Placeholder", e, t);
			}),
			(p.assertPrivate = function (e, t) {
				_("Private", e, t);
			}),
			(p.assertPrivateName = function (e, t) {
				_("PrivateName", e, t);
			}),
			(p.assertProgram = function (e, t) {
				_("Program", e, t);
			}),
			(p.assertProperty = function (e, t) {
				_("Property", e, t);
			}),
			(p.assertPureish = function (e, t) {
				_("Pureish", e, t);
			}),
			(p.assertQualifiedTypeIdentifier = function (e, t) {
				_("QualifiedTypeIdentifier", e, t);
			}),
			(p.assertRecordExpression = function (e, t) {
				_("RecordExpression", e, t);
			}),
			(p.assertRegExpLiteral = function (e, t) {
				_("RegExpLiteral", e, t);
			}),
			(p.assertRegexLiteral = function (e, t) {
				(0, xn.default)("assertRegexLiteral", "assertRegExpLiteral"),
					_("RegexLiteral", e, t);
			}),
			(p.assertRestElement = function (e, t) {
				_("RestElement", e, t);
			}),
			(p.assertRestProperty = function (e, t) {
				(0, xn.default)("assertRestProperty", "assertRestElement"), _("RestProperty", e, t);
			}),
			(p.assertReturnStatement = function (e, t) {
				_("ReturnStatement", e, t);
			}),
			(p.assertScopable = function (e, t) {
				_("Scopable", e, t);
			}),
			(p.assertSequenceExpression = function (e, t) {
				_("SequenceExpression", e, t);
			}),
			(p.assertSpreadElement = function (e, t) {
				_("SpreadElement", e, t);
			}),
			(p.assertSpreadProperty = function (e, t) {
				(0, xn.default)("assertSpreadProperty", "assertSpreadElement"),
					_("SpreadProperty", e, t);
			}),
			(p.assertStandardized = function (e, t) {
				_("Standardized", e, t);
			}),
			(p.assertStatement = function (e, t) {
				_("Statement", e, t);
			}),
			(p.assertStaticBlock = function (e, t) {
				_("StaticBlock", e, t);
			}),
			(p.assertStringLiteral = function (e, t) {
				_("StringLiteral", e, t);
			}),
			(p.assertStringLiteralTypeAnnotation = function (e, t) {
				_("StringLiteralTypeAnnotation", e, t);
			}),
			(p.assertStringTypeAnnotation = function (e, t) {
				_("StringTypeAnnotation", e, t);
			}),
			(p.assertSuper = function (e, t) {
				_("Super", e, t);
			}),
			(p.assertSwitchCase = function (e, t) {
				_("SwitchCase", e, t);
			}),
			(p.assertSwitchStatement = function (e, t) {
				_("SwitchStatement", e, t);
			}),
			(p.assertSymbolTypeAnnotation = function (e, t) {
				_("SymbolTypeAnnotation", e, t);
			}),
			(p.assertTSAnyKeyword = function (e, t) {
				_("TSAnyKeyword", e, t);
			}),
			(p.assertTSArrayType = function (e, t) {
				_("TSArrayType", e, t);
			}),
			(p.assertTSAsExpression = function (e, t) {
				_("TSAsExpression", e, t);
			}),
			(p.assertTSBaseType = function (e, t) {
				_("TSBaseType", e, t);
			}),
			(p.assertTSBigIntKeyword = function (e, t) {
				_("TSBigIntKeyword", e, t);
			}),
			(p.assertTSBooleanKeyword = function (e, t) {
				_("TSBooleanKeyword", e, t);
			}),
			(p.assertTSCallSignatureDeclaration = function (e, t) {
				_("TSCallSignatureDeclaration", e, t);
			}),
			(p.assertTSConditionalType = function (e, t) {
				_("TSConditionalType", e, t);
			}),
			(p.assertTSConstructSignatureDeclaration = function (e, t) {
				_("TSConstructSignatureDeclaration", e, t);
			}),
			(p.assertTSConstructorType = function (e, t) {
				_("TSConstructorType", e, t);
			}),
			(p.assertTSDeclareFunction = function (e, t) {
				_("TSDeclareFunction", e, t);
			}),
			(p.assertTSDeclareMethod = function (e, t) {
				_("TSDeclareMethod", e, t);
			}),
			(p.assertTSEntityName = function (e, t) {
				_("TSEntityName", e, t);
			}),
			(p.assertTSEnumBody = function (e, t) {
				_("TSEnumBody", e, t);
			}),
			(p.assertTSEnumDeclaration = function (e, t) {
				_("TSEnumDeclaration", e, t);
			}),
			(p.assertTSEnumMember = function (e, t) {
				_("TSEnumMember", e, t);
			}),
			(p.assertTSExportAssignment = function (e, t) {
				_("TSExportAssignment", e, t);
			}),
			(p.assertTSExpressionWithTypeArguments = function (e, t) {
				_("TSExpressionWithTypeArguments", e, t);
			}),
			(p.assertTSExternalModuleReference = function (e, t) {
				_("TSExternalModuleReference", e, t);
			}),
			(p.assertTSFunctionType = function (e, t) {
				_("TSFunctionType", e, t);
			}),
			(p.assertTSImportEqualsDeclaration = function (e, t) {
				_("TSImportEqualsDeclaration", e, t);
			}),
			(p.assertTSImportType = function (e, t) {
				_("TSImportType", e, t);
			}),
			(p.assertTSIndexSignature = function (e, t) {
				_("TSIndexSignature", e, t);
			}),
			(p.assertTSIndexedAccessType = function (e, t) {
				_("TSIndexedAccessType", e, t);
			}),
			(p.assertTSInferType = function (e, t) {
				_("TSInferType", e, t);
			}),
			(p.assertTSInstantiationExpression = function (e, t) {
				_("TSInstantiationExpression", e, t);
			}),
			(p.assertTSInterfaceBody = function (e, t) {
				_("TSInterfaceBody", e, t);
			}),
			(p.assertTSInterfaceDeclaration = function (e, t) {
				_("TSInterfaceDeclaration", e, t);
			}),
			(p.assertTSIntersectionType = function (e, t) {
				_("TSIntersectionType", e, t);
			}),
			(p.assertTSIntrinsicKeyword = function (e, t) {
				_("TSIntrinsicKeyword", e, t);
			}),
			(p.assertTSLiteralType = function (e, t) {
				_("TSLiteralType", e, t);
			}),
			(p.assertTSMappedType = function (e, t) {
				_("TSMappedType", e, t);
			}),
			(p.assertTSMethodSignature = function (e, t) {
				_("TSMethodSignature", e, t);
			}),
			(p.assertTSModuleBlock = function (e, t) {
				_("TSModuleBlock", e, t);
			}),
			(p.assertTSModuleDeclaration = function (e, t) {
				_("TSModuleDeclaration", e, t);
			}),
			(p.assertTSNamedTupleMember = function (e, t) {
				_("TSNamedTupleMember", e, t);
			}),
			(p.assertTSNamespaceExportDeclaration = function (e, t) {
				_("TSNamespaceExportDeclaration", e, t);
			}),
			(p.assertTSNeverKeyword = function (e, t) {
				_("TSNeverKeyword", e, t);
			}),
			(p.assertTSNonNullExpression = function (e, t) {
				_("TSNonNullExpression", e, t);
			}),
			(p.assertTSNullKeyword = function (e, t) {
				_("TSNullKeyword", e, t);
			}),
			(p.assertTSNumberKeyword = function (e, t) {
				_("TSNumberKeyword", e, t);
			}),
			(p.assertTSObjectKeyword = function (e, t) {
				_("TSObjectKeyword", e, t);
			}),
			(p.assertTSOptionalType = function (e, t) {
				_("TSOptionalType", e, t);
			}),
			(p.assertTSParameterProperty = function (e, t) {
				_("TSParameterProperty", e, t);
			}),
			(p.assertTSParenthesizedType = function (e, t) {
				_("TSParenthesizedType", e, t);
			}),
			(p.assertTSPropertySignature = function (e, t) {
				_("TSPropertySignature", e, t);
			}),
			(p.assertTSQualifiedName = function (e, t) {
				_("TSQualifiedName", e, t);
			}),
			(p.assertTSRestType = function (e, t) {
				_("TSRestType", e, t);
			}),
			(p.assertTSSatisfiesExpression = function (e, t) {
				_("TSSatisfiesExpression", e, t);
			}),
			(p.assertTSStringKeyword = function (e, t) {
				_("TSStringKeyword", e, t);
			}),
			(p.assertTSSymbolKeyword = function (e, t) {
				_("TSSymbolKeyword", e, t);
			}),
			(p.assertTSTemplateLiteralType = function (e, t) {
				_("TSTemplateLiteralType", e, t);
			}),
			(p.assertTSThisType = function (e, t) {
				_("TSThisType", e, t);
			}),
			(p.assertTSTupleType = function (e, t) {
				_("TSTupleType", e, t);
			}),
			(p.assertTSType = function (e, t) {
				_("TSType", e, t);
			}),
			(p.assertTSTypeAliasDeclaration = function (e, t) {
				_("TSTypeAliasDeclaration", e, t);
			}),
			(p.assertTSTypeAnnotation = function (e, t) {
				_("TSTypeAnnotation", e, t);
			}),
			(p.assertTSTypeAssertion = function (e, t) {
				_("TSTypeAssertion", e, t);
			}),
			(p.assertTSTypeElement = function (e, t) {
				_("TSTypeElement", e, t);
			}),
			(p.assertTSTypeLiteral = function (e, t) {
				_("TSTypeLiteral", e, t);
			}),
			(p.assertTSTypeOperator = function (e, t) {
				_("TSTypeOperator", e, t);
			}),
			(p.assertTSTypeParameter = function (e, t) {
				_("TSTypeParameter", e, t);
			}),
			(p.assertTSTypeParameterDeclaration = function (e, t) {
				_("TSTypeParameterDeclaration", e, t);
			}),
			(p.assertTSTypeParameterInstantiation = function (e, t) {
				_("TSTypeParameterInstantiation", e, t);
			}),
			(p.assertTSTypePredicate = function (e, t) {
				_("TSTypePredicate", e, t);
			}),
			(p.assertTSTypeQuery = function (e, t) {
				_("TSTypeQuery", e, t);
			}),
			(p.assertTSTypeReference = function (e, t) {
				_("TSTypeReference", e, t);
			}),
			(p.assertTSUndefinedKeyword = function (e, t) {
				_("TSUndefinedKeyword", e, t);
			}),
			(p.assertTSUnionType = function (e, t) {
				_("TSUnionType", e, t);
			}),
			(p.assertTSUnknownKeyword = function (e, t) {
				_("TSUnknownKeyword", e, t);
			}),
			(p.assertTSVoidKeyword = function (e, t) {
				_("TSVoidKeyword", e, t);
			}),
			(p.assertTaggedTemplateExpression = function (e, t) {
				_("TaggedTemplateExpression", e, t);
			}),
			(p.assertTemplateElement = function (e, t) {
				_("TemplateElement", e, t);
			}),
			(p.assertTemplateLiteral = function (e, t) {
				_("TemplateLiteral", e, t);
			}),
			(p.assertTerminatorless = function (e, t) {
				_("Terminatorless", e, t);
			}),
			(p.assertThisExpression = function (e, t) {
				_("ThisExpression", e, t);
			}),
			(p.assertThisTypeAnnotation = function (e, t) {
				_("ThisTypeAnnotation", e, t);
			}),
			(p.assertThrowStatement = function (e, t) {
				_("ThrowStatement", e, t);
			}),
			(p.assertTopicReference = function (e, t) {
				_("TopicReference", e, t);
			}),
			(p.assertTryStatement = function (e, t) {
				_("TryStatement", e, t);
			}),
			(p.assertTupleExpression = function (e, t) {
				_("TupleExpression", e, t);
			}),
			(p.assertTupleTypeAnnotation = function (e, t) {
				_("TupleTypeAnnotation", e, t);
			}),
			(p.assertTypeAlias = function (e, t) {
				_("TypeAlias", e, t);
			}),
			(p.assertTypeAnnotation = function (e, t) {
				_("TypeAnnotation", e, t);
			}),
			(p.assertTypeCastExpression = function (e, t) {
				_("TypeCastExpression", e, t);
			}),
			(p.assertTypeParameter = function (e, t) {
				_("TypeParameter", e, t);
			}),
			(p.assertTypeParameterDeclaration = function (e, t) {
				_("TypeParameterDeclaration", e, t);
			}),
			(p.assertTypeParameterInstantiation = function (e, t) {
				_("TypeParameterInstantiation", e, t);
			}),
			(p.assertTypeScript = function (e, t) {
				_("TypeScript", e, t);
			}),
			(p.assertTypeofTypeAnnotation = function (e, t) {
				_("TypeofTypeAnnotation", e, t);
			}),
			(p.assertUnaryExpression = function (e, t) {
				_("UnaryExpression", e, t);
			}),
			(p.assertUnaryLike = function (e, t) {
				_("UnaryLike", e, t);
			}),
			(p.assertUnionTypeAnnotation = function (e, t) {
				_("UnionTypeAnnotation", e, t);
			}),
			(p.assertUpdateExpression = function (e, t) {
				_("UpdateExpression", e, t);
			}),
			(p.assertUserWhitespacable = function (e, t) {
				_("UserWhitespacable", e, t);
			}),
			(p.assertV8IntrinsicIdentifier = function (e, t) {
				_("V8IntrinsicIdentifier", e, t);
			}),
			(p.assertVariableDeclaration = function (e, t) {
				_("VariableDeclaration", e, t);
			}),
			(p.assertVariableDeclarator = function (e, t) {
				_("VariableDeclarator", e, t);
			}),
			(p.assertVariance = function (e, t) {
				_("Variance", e, t);
			}),
			(p.assertVoidTypeAnnotation = function (e, t) {
				_("VoidTypeAnnotation", e, t);
			}),
			(p.assertWhile = function (e, t) {
				_("While", e, t);
			}),
			(p.assertWhileStatement = function (e, t) {
				_("WhileStatement", e, t);
			}),
			(p.assertWithStatement = function (e, t) {
				_("WithStatement", e, t);
			}),
			(p.assertYieldExpression = function (e, t) {
				_("YieldExpression", e, t);
			}),
			Fe),
		xn = Ie;
	function _(e, t, n) {
		if (!(0, Pn.default)(e, t, n))
			throw new Error(
				`Expected type "${e}" with option ${JSON.stringify(n)}, but instead got "${t.type}".`
			);
	}
	var h = {},
		An = (Object.defineProperty(h, "__esModule", { value: !0 }), (h.default = void 0), s);
	h.default = function (e) {
		switch (e) {
			case "string":
				return (0, An.stringTypeAnnotation)();
			case "number":
				return (0, An.numberTypeAnnotation)();
			case "undefined":
				return (0, An.voidTypeAnnotation)();
			case "boolean":
				return (0, An.booleanTypeAnnotation)();
			case "function":
				return (0, An.genericTypeAnnotation)((0, An.identifier)("Function"));
			case "object":
				return (0, An.genericTypeAnnotation)((0, An.identifier)("Object"));
			case "symbol":
				return (0, An.genericTypeAnnotation)((0, An.identifier)("Symbol"));
			case "bigint":
				return (0, An.anyTypeAnnotation)();
		}
		throw new Error("Invalid typeof value: " + e);
	};
	var y = {},
		E = {},
		On =
			(Object.defineProperty(E, "__esModule", { value: !0 }),
			(E.default = function r(e) {
				let t = Array.from(e);
				let i = new Map();
				let a = new Map();
				let o = new Set();
				let s = [];
				for (let e = 0; e < t.length; e++) {
					let n = t[e];
					if (n && !s.includes(n)) {
						if ((0, On.isAnyTypeAnnotation)(n)) return [n];
						if ((0, On.isFlowBaseAnnotation)(n)) a.set(n.type, n);
						else if ((0, On.isUnionTypeAnnotation)(n))
							o.has(n.types) || (t.push(...n.types), o.add(n.types));
						else if ((0, On.isGenericTypeAnnotation)(n)) {
							let t = _n(n.id);
							if (i.has(t)) {
								let e = i.get(t);
								e.typeParameters
									? n.typeParameters &&
										(e.typeParameters.params.push(...n.typeParameters.params),
										(e.typeParameters.params = r(e.typeParameters.params)))
									: (e = n.typeParameters);
							} else i.set(t, n);
						} else s.push(n);
					}
				}
				for (var [, n] of a) s.push(n);
				for (var [, l] of i) s.push(l);
				return s;
			}),
			r);
	function _n(e) {
		return (0, On.isIdentifier)(e) ? e.name : e.id.name + "." + _n(e.qualification);
	}
	Object.defineProperty(y, "__esModule", { value: !0 }),
		(y.default = function (e) {
			e = (0, Cn.default)(e);
			return 1 === e.length ? e[0] : (0, In.unionTypeAnnotation)(e);
		});
	var In = s,
		Cn = E;
	var l = {},
		c = {},
		Dn =
			(Object.defineProperty(c, "__esModule", { value: !0 }),
			(c.default = function a(e) {
				let n = Array.from(e);
				let o = new Map();
				let r = new Map();
				let i = new Set();
				let s = [];
				for (let t = 0; t < n.length; t++) {
					let e = n[t];
					if (e && !s.includes(e)) {
						if ((0, Dn.isTSAnyKeyword)(e)) return [e];
						if ((0, Dn.isTSBaseType)(e)) r.set(e.type, e);
						else if ((0, Dn.isTSUnionType)(e))
							i.has(e.types) || (n.push(...e.types), i.add(e.types));
						else {
							let i = "typeParameters";
							if ((0, Dn.isTSTypeReference)(e) && e[i]) {
								let n = e[i],
									r = Nn(e.typeName);
								if (o.has(r)) {
									let e = o.get(r),
										t = e[i];
									t
										? (t.params.push(...n.params), (t.params = a(t.params)))
										: (e = n);
								} else o.set(r, e);
							} else s.push(e);
						}
					}
				}
				for (var [, t] of r) s.push(t);
				for (var [, l] of o) s.push(l);
				return s;
			}),
			r);
	function Nn(e) {
		return (0, Dn.isIdentifier)(e)
			? e.name
			: (0, Dn.isThisExpression)(e)
				? "this"
				: e.right.name + "." + Nn(e.left);
	}
	Object.defineProperty(l, "__esModule", { value: !0 }),
		(l.default = function (e) {
			(e = e.map(e => ((0, kn.isTSTypeAnnotation)(e) ? e.typeAnnotation : e))),
				(e = (0, jn.default)(e));
			return 1 === e.length ? e[0] : (0, wn.tsUnionType)(e);
		});
	var wn = s,
		jn = c,
		kn = r;
	var o = {},
		Ln =
			(Object.defineProperty(o, "__esModule", { value: !0 }),
			(o.buildUndefinedNode = function () {
				return (0, Ln.unaryExpression)("void", (0, Ln.numericLiteral)(0), !0);
			}),
			s);
	var c = {},
		Mn =
			(Object.defineProperty(c, "__esModule", { value: !0 }),
			(c.default = function (e, t = !0, n = !1) {
				return Yn(e, t, n, new Map());
			}),
			Be),
		Bn = r;
	let Fn = { hasOwn: Function.call.bind(Object.prototype.hasOwnProperty) }.hasOwn;
	function Rn(e, t, n, r) {
		return e && "string" == typeof e.type ? Yn(e, t, n, r) : e;
	}
	function Kn(e, t, n, r) {
		return Array.isArray(e) ? e.map(e => Rn(e, t, n, r)) : Rn(e, t, n, r);
	}
	function Yn(e, t = !0, n = !1, r) {
		if (!e) return e;
		var i = e.type,
			a = { type: e.type };
		if ((0, Bn.isIdentifier)(e))
			(a.name = e.name),
				Fn(e, "optional") && "boolean" == typeof e.optional && (a.optional = e.optional),
				Fn(e, "typeAnnotation") &&
					(a.typeAnnotation = t ? Kn(e.typeAnnotation, !0, n, r) : e.typeAnnotation),
				Fn(e, "decorators") &&
					(a.decorators = t ? Kn(e.decorators, !0, n, r) : e.decorators);
		else {
			if (!Fn(Mn.NODE_FIELDS, i)) throw new Error(`Unknown node type: "${i}"`);
			for (var o of Object.keys(Mn.NODE_FIELDS[i]))
				Fn(e, o) &&
					(a[o] = t
						? (0, Bn.isFile)(e) && "comments" === o
							? Vn(e.comments, t, n, r)
							: Kn(e[o], !0, n, r)
						: e[o]);
		}
		return (
			Fn(e, "loc") && (a.loc = n ? null : e.loc),
			Fn(e, "leadingComments") && (a.leadingComments = Vn(e.leadingComments, t, n, r)),
			Fn(e, "innerComments") && (a.innerComments = Vn(e.innerComments, t, n, r)),
			Fn(e, "trailingComments") && (a.trailingComments = Vn(e.trailingComments, t, n, r)),
			Fn(e, "extra") && (a.extra = Object.assign({}, e.extra)),
			a
		);
	}
	function Vn(e, t, i, a) {
		return e && t
			? e.map(e => {
					var t,
						n,
						r = a.get(e);
					return (
						r ||
						(({ type: r, value: t, loc: n } = e),
						(r = { type: r, value: t, loc: n }),
						i && (r.loc = null),
						a.set(e, r),
						r)
					);
				})
			: e;
	}
	var I = {},
		Jn =
			(Object.defineProperty(I, "__esModule", { value: !0 }),
			(I.default = function (e) {
				return (0, Jn.default)(e, !1);
			}),
			c);
	var Xn = {},
		qn =
			(Object.defineProperty(Xn, "__esModule", { value: !0 }),
			(Xn.default = function (e) {
				return (0, qn.default)(e);
			}),
			c);
	var Un = {},
		Wn =
			(Object.defineProperty(Un, "__esModule", { value: !0 }),
			(Un.default = function (e) {
				return (0, Wn.default)(e, !0, !0);
			}),
			c);
	var Gn = {},
		zn =
			(Object.defineProperty(Gn, "__esModule", { value: !0 }),
			(Gn.default = function (e) {
				return (0, zn.default)(e, !1, !0);
			}),
			c);
	var C = {},
		Hn = {};
	Object.defineProperty(Hn, "__esModule", { value: !0 }),
		(Hn.default = function (e, t, n) {
			var r;
			return (
				n &&
					e &&
					(e[(r = t + "Comments")]
						? "leading" === t
							? (e[r] = n.concat(e[r]))
							: e[r].push(...n)
						: (e[r] = n)),
				e
			);
		}),
		Object.defineProperty(C, "__esModule", { value: !0 }),
		(C.default = function (e, t, n, r) {
			return (0, $n.default)(e, t, [{ type: r ? "CommentLine" : "CommentBlock", value: n }]);
		});
	var $n = Hn;
	var D = {},
		Qn = {};
	Object.defineProperty(Qn, "__esModule", { value: !0 }),
		(Qn.default = function (e, t, n) {
			t && n && (t[e] = Array.from(new Set([].concat(t[e], n[e]).filter(Boolean))));
		}),
		Object.defineProperty(D, "__esModule", { value: !0 }),
		(D.default = function (e, t) {
			(0, Zn.default)("innerComments", e, t);
		});
	var Zn = Qn;
	var N = {},
		er =
			(Object.defineProperty(N, "__esModule", { value: !0 }),
			(N.default = function (e, t) {
				(0, er.default)("leadingComments", e, t);
			}),
			Qn);
	var tr = {},
		nr = {},
		rr =
			(Object.defineProperty(nr, "__esModule", { value: !0 }),
			(nr.default = function (e, t) {
				(0, rr.default)("trailingComments", e, t);
			}),
			Qn);
	Object.defineProperty(tr, "__esModule", { value: !0 }),
		(tr.default = function (e, t) {
			return (0, ir.default)(e, t), (0, ar.default)(e, t), (0, or.default)(e, t), e;
		});
	var ir = nr,
		ar = N,
		or = D;
	var Qn = {},
		sr =
			(Object.defineProperty(Qn, "__esModule", { value: !0 }),
			(Qn.default = function (t) {
				return (
					sr.COMMENT_KEYS.forEach(e => {
						t[e] = null;
					}),
					t
				);
			}),
			u);
	var w = {},
		j =
			(Object.defineProperty(w, "__esModule", { value: !0 }),
			(w.WHILE_TYPES =
				w.USERWHITESPACABLE_TYPES =
				w.UNARYLIKE_TYPES =
				w.TYPESCRIPT_TYPES =
				w.TSTYPE_TYPES =
				w.TSTYPEELEMENT_TYPES =
				w.TSENTITYNAME_TYPES =
				w.TSBASETYPE_TYPES =
				w.TERMINATORLESS_TYPES =
				w.STATEMENT_TYPES =
				w.STANDARDIZED_TYPES =
				w.SCOPABLE_TYPES =
				w.PUREISH_TYPES =
				w.PROPERTY_TYPES =
				w.PRIVATE_TYPES =
				w.PATTERN_TYPES =
				w.PATTERNLIKE_TYPES =
				w.OBJECTMEMBER_TYPES =
				w.MODULESPECIFIER_TYPES =
				w.MODULEDECLARATION_TYPES =
				w.MISCELLANEOUS_TYPES =
				w.METHOD_TYPES =
				w.LVAL_TYPES =
				w.LOOP_TYPES =
				w.LITERAL_TYPES =
				w.JSX_TYPES =
				w.IMPORTOREXPORTDECLARATION_TYPES =
				w.IMMUTABLE_TYPES =
				w.FUNCTION_TYPES =
				w.FUNCTIONPARENT_TYPES =
				w.FOR_TYPES =
				w.FORXSTATEMENT_TYPES =
				w.FLOW_TYPES =
				w.FLOWTYPE_TYPES =
				w.FLOWPREDICATE_TYPES =
				w.FLOWDECLARATION_TYPES =
				w.FLOWBASEANNOTATION_TYPES =
				w.EXPRESSION_TYPES =
				w.EXPRESSIONWRAPPER_TYPES =
				w.EXPORTDECLARATION_TYPES =
				w.ENUMMEMBER_TYPES =
				w.ENUMBODY_TYPES =
				w.DECLARATION_TYPES =
				w.CONDITIONAL_TYPES =
				w.COMPLETIONSTATEMENT_TYPES =
				w.CLASS_TYPES =
				w.BLOCK_TYPES =
				w.BLOCKPARENT_TYPES =
				w.BINARY_TYPES =
				w.ACCESSOR_TYPES =
					void 0),
			Be),
		lr =
			((w.STANDARDIZED_TYPES = j.FLIPPED_ALIAS_KEYS.Standardized),
			(w.EXPRESSION_TYPES = j.FLIPPED_ALIAS_KEYS.Expression),
			(w.BINARY_TYPES = j.FLIPPED_ALIAS_KEYS.Binary),
			(w.SCOPABLE_TYPES = j.FLIPPED_ALIAS_KEYS.Scopable),
			(w.BLOCKPARENT_TYPES = j.FLIPPED_ALIAS_KEYS.BlockParent),
			(w.BLOCK_TYPES = j.FLIPPED_ALIAS_KEYS.Block),
			(w.STATEMENT_TYPES = j.FLIPPED_ALIAS_KEYS.Statement),
			(w.TERMINATORLESS_TYPES = j.FLIPPED_ALIAS_KEYS.Terminatorless),
			(w.COMPLETIONSTATEMENT_TYPES = j.FLIPPED_ALIAS_KEYS.CompletionStatement),
			(w.CONDITIONAL_TYPES = j.FLIPPED_ALIAS_KEYS.Conditional),
			(w.LOOP_TYPES = j.FLIPPED_ALIAS_KEYS.Loop),
			(w.WHILE_TYPES = j.FLIPPED_ALIAS_KEYS.While),
			(w.EXPRESSIONWRAPPER_TYPES = j.FLIPPED_ALIAS_KEYS.ExpressionWrapper),
			(w.FOR_TYPES = j.FLIPPED_ALIAS_KEYS.For),
			(w.FORXSTATEMENT_TYPES = j.FLIPPED_ALIAS_KEYS.ForXStatement),
			(w.FUNCTION_TYPES = j.FLIPPED_ALIAS_KEYS.Function),
			(w.FUNCTIONPARENT_TYPES = j.FLIPPED_ALIAS_KEYS.FunctionParent),
			(w.PUREISH_TYPES = j.FLIPPED_ALIAS_KEYS.Pureish),
			(w.DECLARATION_TYPES = j.FLIPPED_ALIAS_KEYS.Declaration),
			(w.PATTERNLIKE_TYPES = j.FLIPPED_ALIAS_KEYS.PatternLike),
			(w.LVAL_TYPES = j.FLIPPED_ALIAS_KEYS.LVal),
			(w.TSENTITYNAME_TYPES = j.FLIPPED_ALIAS_KEYS.TSEntityName),
			(w.LITERAL_TYPES = j.FLIPPED_ALIAS_KEYS.Literal),
			(w.IMMUTABLE_TYPES = j.FLIPPED_ALIAS_KEYS.Immutable),
			(w.USERWHITESPACABLE_TYPES = j.FLIPPED_ALIAS_KEYS.UserWhitespacable),
			(w.METHOD_TYPES = j.FLIPPED_ALIAS_KEYS.Method),
			(w.OBJECTMEMBER_TYPES = j.FLIPPED_ALIAS_KEYS.ObjectMember),
			(w.PROPERTY_TYPES = j.FLIPPED_ALIAS_KEYS.Property),
			(w.UNARYLIKE_TYPES = j.FLIPPED_ALIAS_KEYS.UnaryLike),
			(w.PATTERN_TYPES = j.FLIPPED_ALIAS_KEYS.Pattern),
			(w.CLASS_TYPES = j.FLIPPED_ALIAS_KEYS.Class),
			(w.IMPORTOREXPORTDECLARATION_TYPES = j.FLIPPED_ALIAS_KEYS.ImportOrExportDeclaration)),
		j =
			((w.EXPORTDECLARATION_TYPES = j.FLIPPED_ALIAS_KEYS.ExportDeclaration),
			(w.MODULESPECIFIER_TYPES = j.FLIPPED_ALIAS_KEYS.ModuleSpecifier),
			(w.ACCESSOR_TYPES = j.FLIPPED_ALIAS_KEYS.Accessor),
			(w.PRIVATE_TYPES = j.FLIPPED_ALIAS_KEYS.Private),
			(w.FLOW_TYPES = j.FLIPPED_ALIAS_KEYS.Flow),
			(w.FLOWTYPE_TYPES = j.FLIPPED_ALIAS_KEYS.FlowType),
			(w.FLOWBASEANNOTATION_TYPES = j.FLIPPED_ALIAS_KEYS.FlowBaseAnnotation),
			(w.FLOWDECLARATION_TYPES = j.FLIPPED_ALIAS_KEYS.FlowDeclaration),
			(w.FLOWPREDICATE_TYPES = j.FLIPPED_ALIAS_KEYS.FlowPredicate),
			(w.ENUMBODY_TYPES = j.FLIPPED_ALIAS_KEYS.EnumBody),
			(w.ENUMMEMBER_TYPES = j.FLIPPED_ALIAS_KEYS.EnumMember),
			(w.JSX_TYPES = j.FLIPPED_ALIAS_KEYS.JSX),
			(w.MISCELLANEOUS_TYPES = j.FLIPPED_ALIAS_KEYS.Miscellaneous),
			(w.TYPESCRIPT_TYPES = j.FLIPPED_ALIAS_KEYS.TypeScript),
			(w.TSTYPEELEMENT_TYPES = j.FLIPPED_ALIAS_KEYS.TSTypeElement),
			(w.TSTYPE_TYPES = j.FLIPPED_ALIAS_KEYS.TSType),
			(w.TSBASETYPE_TYPES = j.FLIPPED_ALIAS_KEYS.TSBaseType),
			(w.MODULEDECLARATION_TYPES = lr),
			{}),
		lr = {},
		pr =
			(Object.defineProperty(lr, "__esModule", { value: !0 }),
			(lr.default = function (e, t) {
				if ((0, pr.isBlockStatement)(e)) return e;
				let n = [];
				n = (0, pr.isEmptyStatement)(e)
					? []
					: ((0, pr.isStatement)(e) ||
							(e = (
								(0, pr.isFunction)(t)
									? (0, ur.returnStatement)
									: (0, ur.expressionStatement)
							)(e)),
						[e]);
				return (0, ur.blockStatement)(n);
			}),
			r),
		ur = s;
	Object.defineProperty(j, "__esModule", { value: !0 }),
		(j.default = function (e, t = "body") {
			var n = (0, cr.default)(e[t], e);
			return (e[t] = n);
		});
	var cr = lr;
	var dr = {},
		fr = {},
		yr =
			(Object.defineProperty(fr, "__esModule", { value: !0 }),
			(fr.default = function (e) {
				let t = "";
				for (var n of (e += "")) t += (0, mr.isIdentifierChar)(n.codePointAt(0)) ? n : "-";
				(t = (t = t.replace(/^[-0-9]+/, "")).replace(/[-\s]+(.)?/g, function (e, t) {
					return t ? t.toUpperCase() : "";
				})),
					(0, yr.default)(t) || (t = "_" + t);
				return t || "_";
			}),
			We),
		mr = Ge;
	Object.defineProperty(dr, "__esModule", { value: !0 }),
		(dr.default = function (e) {
			("eval" !== (e = (0, Tr.default)(e)) && "arguments" !== e) || (e = "_" + e);
			return e;
		});
	var Tr = fr;
	var Ge = {},
		hr =
			(Object.defineProperty(Ge, "__esModule", { value: !0 }),
			(Ge.default = function (e, t = e.key || e.property) {
				!e.computed && (0, hr.isIdentifier)(t) && (t = (0, Sr.stringLiteral)(t.name));
				return t;
			}),
			r),
		Sr = s;
	var br = {},
		Er = (Object.defineProperty(br, "__esModule", { value: !0 }), (br.default = void 0), r);
	br.default = function (e) {
		(0, Er.isExpressionStatement)(e) && (e = e.expression);
		if ((0, Er.isExpression)(e)) return e;
		(0, Er.isClass)(e)
			? (e.type = "ClassExpression")
			: (0, Er.isFunction)(e) && (e.type = "FunctionExpression");
		if ((0, Er.isExpression)(e)) return e;
		throw new Error(`cannot turn ${e.type} to an expression`);
	};
	var vr = {},
		gr = {},
		Pr = {},
		xr =
			(Object.defineProperty(Pr, "__esModule", { value: !0 }),
			(Pr.default = function t(n, r, i) {
				if (!n) return;
				let e = xr.VISITOR_KEYS[n.type];
				if (!e) return;
				i = i || {};
				r(n, i);
				for (var a of e) {
					let e = n[a];
					if (Array.isArray(e)) for (var o of e) t(o, r, i);
					else t(e, r, i);
				}
			}),
			Be);
	var Ar = {};
	Object.defineProperty(Ar, "__esModule", { value: !0 }),
		(Ar.default = function (e, t = {}) {
			t = t.preserveComments ? Or : _r;
			for (var n of t) null != e[n] && (e[n] = void 0);
			for (var r of Object.keys(e)) "_" === r[0] && null != e[r] && (e[r] = void 0);
			t = Object.getOwnPropertySymbols(e);
			for (var i of t) e[i] = null;
		});
	let Or = ["tokens", "start", "end", "loc", "raw", "rawValue"],
		_r = [...u.COMMENT_KEYS, "comments", ...Or];
	Object.defineProperty(gr, "__esModule", { value: !0 }),
		(gr.default = function (e, t) {
			return (0, Ir.default)(e, Cr.default, t), e;
		});
	var Ir = Pr,
		Cr = Ar;
	Object.defineProperty(vr, "__esModule", { value: !0 }), (vr.default = jr);
	var Dr = r,
		Nr = c,
		wr = gr;
	function jr(e, t = e.key) {
		let n;
		return "method" === e.kind
			? jr.increment() + ""
			: ((n = (0, Dr.isIdentifier)(t)
					? t.name
					: (0, Dr.isStringLiteral)(t)
						? JSON.stringify(t.value)
						: JSON.stringify((0, wr.default)((0, Nr.default)(t)))),
				e.computed && (n = `[${n}]`),
				(n = e.static ? "static:" + n : n));
	}
	(jr.uid = 0),
		(jr.increment = function () {
			return jr.uid >= Number.MAX_SAFE_INTEGER ? (jr.uid = 0) : jr.uid++;
		});
	var kr = {},
		Lr = (Object.defineProperty(kr, "__esModule", { value: !0 }), (kr.default = void 0), r),
		Mr = s;
	kr.default = function (n, r) {
		if (!(0, Lr.isStatement)(n)) {
			let e = !1,
				t;
			if ((0, Lr.isClass)(n)) (e = !0), (t = "ClassDeclaration");
			else if ((0, Lr.isFunction)(n)) (e = !0), (t = "FunctionDeclaration");
			else if ((0, Lr.isAssignmentExpression)(n)) return (0, Mr.expressionStatement)(n);
			if (!(t = e && !n.id ? !1 : t)) {
				if (r) return !1;
				throw new Error(`cannot turn ${n.type} to a statement`);
			}
			n.type = t;
		}
		return n;
	};
	var Br = {},
		Fr = (Object.defineProperty(Br, "__esModule", { value: !0 }), (Br.default = void 0), We),
		Rr = s;
	Br.default = function n(r) {
		if (void 0 === r) return (0, Rr.identifier)("undefined");
		if (!0 === r || !1 === r) return (0, Rr.booleanLiteral)(r);
		if (null === r) return (0, Rr.nullLiteral)();
		if ("string" == typeof r) return (0, Rr.stringLiteral)(r);
		if ("number" == typeof r) {
			let t;
			if (Number.isFinite(r)) t = (0, Rr.numericLiteral)(Math.abs(r));
			else {
				let e;
				(e = Number.isNaN(r) ? (0, Rr.numericLiteral)(0) : (0, Rr.numericLiteral)(1)),
					(t = (0, Rr.binaryExpression)("/", e, (0, Rr.numericLiteral)(0)));
			}
			return (t = r < 0 || Object.is(r, -0) ? (0, Rr.unaryExpression)("-", t) : t);
		}
		if (Yr(r)) {
			let e = r.source,
				t = /\/([a-z]*)$/.exec(r.toString())[1];
			return (0, Rr.regExpLiteral)(e, t);
		}
		if (Array.isArray(r)) return (0, Rr.arrayExpression)(r.map(n));
		if (Vr(r)) {
			let t = [];
			for (var i of Object.keys(r)) {
				let e;
				(e = ((0, Fr.default)(i) ? (0, Rr.identifier) : (0, Rr.stringLiteral))(i)),
					t.push((0, Rr.objectProperty)(e, n(r[i])));
			}
			return (0, Rr.objectExpression)(t);
		}
		throw new Error("don't know how to turn this value into a node");
	};
	let Kr = Function.call.bind(Object.prototype.toString);
	function Yr(e) {
		return "[object RegExp]" === Kr(e);
	}
	function Vr(e) {
		return (
			"object" == typeof e &&
			null !== e &&
			"[object Object]" === Object.prototype.toString.call(e) &&
			(null === (e = Object.getPrototypeOf(e)) || null === Object.getPrototypeOf(e))
		);
	}
	var Jr = {},
		Xr =
			(Object.defineProperty(Jr, "__esModule", { value: !0 }),
			(Jr.default = function (e, t, n = !1) {
				return (
					(e.object = (0, Xr.memberExpression)(e.object, e.property, e.computed)),
					(e.property = t),
					(e.computed = !!n),
					e
				);
			}),
			s);
	var qr = {},
		Ur =
			(Object.defineProperty(qr, "__esModule", { value: !0 }),
			(qr.default = function (e, t) {
				if (e && t) {
					for (var n of Ur.INHERIT_KEYS.optional) null == e[n] && (e[n] = t[n]);
					for (var r of Object.keys(t)) "_" === r[0] && "__clone" !== r && (e[r] = t[r]);
					for (var i of Ur.INHERIT_KEYS.force) e[i] = t[i];
					(0, Wr.default)(e, t);
				}
				return e;
			}),
			u),
		Wr = tr;
	var Gr = {},
		zr =
			(Object.defineProperty(Gr, "__esModule", { value: !0 }),
			(Gr.default = function (e, t) {
				if ((0, Hr.isSuper)(e.object))
					throw new Error("Cannot prepend node to super property access (`super.foo`).");
				return (e.object = (0, zr.memberExpression)(t, e.object)), e;
			}),
			s),
		Hr = e;
	var $r = {};
	Object.defineProperty($r, "__esModule", { value: !0 }),
		($r.default = function (e) {
			var t = [].concat(e),
				n = Object.create(null);
			for (; t.length; ) {
				var r = t.pop();
				if (r)
					switch (r.type) {
						case "ArrayPattern":
							t.push(...r.elements);
							break;
						case "AssignmentExpression":
						case "AssignmentPattern":
						case "ForInStatement":
						case "ForOfStatement":
							t.push(r.left);
							break;
						case "ObjectPattern":
							t.push(...r.properties);
							break;
						case "ObjectProperty":
							t.push(r.value);
							break;
						case "RestElement":
						case "UpdateExpression":
							t.push(r.argument);
							break;
						case "UnaryExpression":
							"delete" === r.operator && t.push(r.argument);
							break;
						case "Identifier":
							n[r.name] = r;
					}
			}
			return n;
		});
	var Qr = {},
		Zr = (Object.defineProperty(Qr, "__esModule", { value: !0 }), (Qr.default = ei), r);
	function ei(e, t, n, r) {
		for (var i = [].concat(e), a = Object.create(null); i.length; ) {
			var o = i.shift();
			if (o)
				if (
					!r ||
					!(
						(0, Zr.isAssignmentExpression)(o) ||
						(0, Zr.isUnaryExpression)(o) ||
						(0, Zr.isUpdateExpression)(o)
					)
				)
					if ((0, Zr.isIdentifier)(o))
						t ? (a[o.name] = a[o.name] || []).push(o) : (a[o.name] = o);
					else if ((0, Zr.isExportDeclaration)(o) && !(0, Zr.isExportAllDeclaration)(o))
						(0, Zr.isDeclaration)(o.declaration) && i.push(o.declaration);
					else {
						if (n) {
							if ((0, Zr.isFunctionDeclaration)(o)) {
								i.push(o.id);
								continue;
							}
							if ((0, Zr.isFunctionExpression)(o)) continue;
						}
						var s = ei.keys[o.type];
						if (s)
							for (let e = 0; e < s.length; e++) {
								var l = o[s[e]];
								l && (Array.isArray(l) ? i.push(...l) : i.push(l));
							}
					}
		}
		return a;
	}
	ei.keys = {
		DeclareClass: ["id"],
		DeclareFunction: ["id"],
		DeclareModule: ["id"],
		DeclareVariable: ["id"],
		DeclareInterface: ["id"],
		DeclareTypeAlias: ["id"],
		DeclareOpaqueType: ["id"],
		InterfaceDeclaration: ["id"],
		TypeAlias: ["id"],
		OpaqueType: ["id"],
		CatchClause: ["param"],
		LabeledStatement: ["label"],
		UnaryExpression: ["argument"],
		AssignmentExpression: ["left"],
		ImportSpecifier: ["local"],
		ImportNamespaceSpecifier: ["local"],
		ImportDefaultSpecifier: ["local"],
		ImportDeclaration: ["specifiers"],
		TSImportEqualsDeclaration: ["id"],
		ExportSpecifier: ["exported"],
		ExportNamespaceSpecifier: ["exported"],
		ExportDefaultSpecifier: ["exported"],
		FunctionDeclaration: ["id", "params"],
		FunctionExpression: ["id", "params"],
		ArrowFunctionExpression: ["params"],
		ObjectMethod: ["params"],
		ClassMethod: ["params"],
		ClassPrivateMethod: ["params"],
		ForInStatement: ["left"],
		ForOfStatement: ["left"],
		ClassDeclaration: ["id"],
		ClassExpression: ["id"],
		RestElement: ["argument"],
		UpdateExpression: ["argument"],
		ObjectProperty: ["value"],
		AssignmentPattern: ["left"],
		ArrayPattern: ["elements"],
		ObjectPattern: ["properties"],
		VariableDeclaration: ["declarations"],
		VariableDeclarator: ["id"]
	};
	var ti = {},
		ni = (Object.defineProperty(ti, "__esModule", { value: !0 }), (ti.default = void 0), Qr);
	ti.default = function (e, t) {
		return (0, ni.default)(e, t, !0);
	};
	var ri = {},
		ii =
			(Object.defineProperty(ri, "__esModule", { value: !0 }),
			(ri.default = function (e, t) {
				if ("id" in e && e.id) return { name: e.id.name, originalNode: e.id };
				let n = "",
					r;
				(0, ii.isObjectProperty)(t, { value: e })
					? (r = ai(t))
					: (0, ii.isObjectMethod)(e) || (0, ii.isClassMethod)(e)
						? ((r = ai(e)),
							"get" === e.kind ? (n = "get ") : "set" === e.kind && (n = "set "))
						: (0, ii.isVariableDeclarator)(t, { init: e })
							? (r = t.id)
							: (0, ii.isAssignmentExpression)(t, { operator: "=", right: e }) &&
								(r = t.left);
				if (!r) return null;
				e = (0, ii.isLiteral)(r)
					? (e =>
							(0, ii.isNullLiteral)(e)
								? "null"
								: (0, ii.isRegExpLiteral)(e)
									? `/${e.pattern}/` + e.flags
									: (0, ii.isTemplateLiteral)(e)
										? e.quasis.map(e => e.value.raw).join("")
										: void 0 === e.value
											? null
											: String(e.value))(r)
					: (0, ii.isIdentifier)(r)
						? r.name
						: (0, ii.isPrivateName)(r)
							? r.id.name
							: null;
				return null == e ? null : { name: n + e, originalNode: r };
			}),
			r);
	function ai(e) {
		if (!e.computed || (0, ii.isLiteral)(e.key)) return e.key;
	}
	var oi = {},
		si =
			(Object.defineProperty(oi, "__esModule", { value: !0 }),
			(oi.default = function (e, t, n) {
				"function" == typeof t && (t = { enter: t });
				var { enter: t, exit: r } = t;
				!(function r(i, a, o, s, l) {
					let e = si.VISITOR_KEYS[i.type];
					if (!e) return;
					a && a(i, l, s);
					for (var p of e) {
						let n = i[p];
						if (Array.isArray(n))
							for (let t = 0; t < n.length; t++) {
								let e = n[t];
								e &&
									(l.push({ node: i, key: p, index: t }),
									r(e, a, o, s, l),
									l.pop());
							}
						else n && (l.push({ node: i, key: p }), r(n, a, o, s, l), l.pop());
					}
					o && o(i, l, s);
				})(e, t, r, n, []);
			}),
			Be);
	var li = {},
		pi =
			(Object.defineProperty(li, "__esModule", { value: !0 }),
			(li.default = function (t, n, e) {
				if (
					!e ||
					"Identifier" !== t.type ||
					"ObjectProperty" !== n.type ||
					"ObjectExpression" !== e.type
				) {
					var r = pi.default.keys[n.type];
					if (r)
						for (let e = 0; e < r.length; e++) {
							var i = r[e],
								i = n[i];
							if (Array.isArray(i)) {
								if (i.includes(t)) return !0;
							} else if (i === t) return !0;
						}
				}
				return !1;
			}),
			Qr);
	var ui = {},
		ci = {},
		di =
			(Object.defineProperty(ci, "__esModule", { value: !0 }),
			(ci.default = function (e) {
				return (
					(0, di.isVariableDeclaration)(e) &&
					("var" !== e.kind || e[fi.BLOCK_SCOPED_SYMBOL])
				);
			}),
			r),
		fi = u;
	Object.defineProperty(ui, "__esModule", { value: !0 }),
		(ui.default = function (e) {
			return (
				(0, yi.isFunctionDeclaration)(e) ||
				(0, yi.isClassDeclaration)(e) ||
				(0, mi.default)(e)
			);
		});
	var yi = r,
		mi = ci;
	var Ti = {},
		hi =
			(Object.defineProperty(Ti, "__esModule", { value: !0 }),
			(Ti.default = function (e) {
				if ((0, hi.default)(e.type, "Immutable")) return !0;
				if ((0, Si.isIdentifier)(e) && "undefined" === e.name) return !0;
				return !1;
			}),
			Re),
		Si = r;
	var bi = {},
		Ei =
			(Object.defineProperty(bi, "__esModule", { value: !0 }),
			(bi.default = function r(e, i) {
				if ("object" != typeof e || "object" != typeof i || null == e || null == i)
					return e === i;
				if (e.type !== i.type) return !1;
				let t = Object.keys(Ei.NODE_FIELDS[e.type] || e.type);
				let a = Ei.VISITOR_KEYS[e.type];
				for (var o of t) {
					let t = e[o],
						n = i[o];
					if (typeof t != typeof n) return !1;
					if (null != t || null != n) {
						if (null == t || null == n) return !1;
						if (Array.isArray(t)) {
							if (!Array.isArray(n)) return !1;
							if (t.length !== n.length) return !1;
							for (let e = 0; e < t.length; e++) if (!r(t[e], n[e])) return !1;
						} else if ("object" != typeof t || (null != a && a.includes(o))) {
							if (!r(t, n)) return !1;
						} else for (var s of Object.keys(t)) if (t[s] !== n[s]) return !1;
					}
				}
				return !0;
			}),
			Be);
	var vi = {};
	Object.defineProperty(vi, "__esModule", { value: !0 }),
		(vi.default = function (e, t, n) {
			switch (t.type) {
				case "MemberExpression":
				case "OptionalMemberExpression":
					return t.property === e ? !!t.computed : t.object === e;
				case "JSXMemberExpression":
					return t.object === e;
				case "VariableDeclarator":
					return t.init === e;
				case "ArrowFunctionExpression":
					return t.body === e;
				case "PrivateName":
					return !1;
				case "ClassMethod":
				case "ClassPrivateMethod":
				case "ObjectMethod":
					return t.key === e ? !!t.computed : !1;
				case "ObjectProperty":
					return t.key === e ? !!t.computed : !n || "ObjectPattern" !== n.type;
				case "ClassProperty":
				case "ClassAccessorProperty":
					return t.key === e ? !!t.computed : !0;
				case "ClassPrivateProperty":
					return t.key !== e;
				case "ClassDeclaration":
				case "ClassExpression":
					return t.superClass === e;
				case "AssignmentExpression":
				case "AssignmentPattern":
					return t.right === e;
				case "LabeledStatement":
				case "CatchClause":
				case "RestElement":
					return !1;
				case "BreakStatement":
				case "ContinueStatement":
					return !1;
				case "FunctionDeclaration":
				case "FunctionExpression":
					return !1;
				case "ExportNamespaceSpecifier":
				case "ExportDefaultSpecifier":
					return !1;
				case "ExportSpecifier":
					return null != n && n.source ? !1 : t.local === e;
				case "ImportDefaultSpecifier":
				case "ImportNamespaceSpecifier":
				case "ImportSpecifier":
				case "ImportAttribute":
				case "JSXAttribute":
					return !1;
				case "ObjectPattern":
				case "ArrayPattern":
				case "MetaProperty":
					return !1;
				case "ObjectTypeProperty":
					return t.key !== e;
				case "TSEnumMember":
					return t.id !== e;
				case "TSPropertySignature":
					return t.key === e ? !!t.computed : !0;
			}
			return !0;
		});
	var gi = {},
		Pi =
			(Object.defineProperty(gi, "__esModule", { value: !0 }),
			(gi.default = function (e, t) {
				if (
					(0, Pi.isBlockStatement)(e) &&
					((0, Pi.isFunction)(t) || (0, Pi.isCatchClause)(t))
				)
					return !1;
				if ((0, Pi.isPattern)(e) && ((0, Pi.isFunction)(t) || (0, Pi.isCatchClause)(t)))
					return !0;
				return (0, Pi.isScopable)(e);
			}),
			r);
	var xi = {},
		Ai =
			(Object.defineProperty(xi, "__esModule", { value: !0 }),
			(xi.default = function (e) {
				return (
					(0, Ai.isImportDefaultSpecifier)(e) ||
					(0, Ai.isIdentifier)(e.imported || e.exported, { name: "default" })
				);
			}),
			r);
	var Oi = {},
		_i =
			(Object.defineProperty(Oi, "__esModule", { value: !0 }),
			(Oi.default = function (e) {
				return (0, _i.default)(e) && !Ii.has(e);
			}),
			We);
	let Ii = new Set([
		"abstract",
		"boolean",
		"byte",
		"char",
		"double",
		"enum",
		"final",
		"float",
		"goto",
		"implements",
		"int",
		"interface",
		"long",
		"native",
		"package",
		"private",
		"protected",
		"public",
		"short",
		"static",
		"synchronized",
		"throws",
		"transient",
		"volatile"
	]);
	var Ci = {},
		Di =
			(Object.defineProperty(Ci, "__esModule", { value: !0 }),
			(Ci.default = function (e) {
				return (
					(0, Di.isVariableDeclaration)(e, { kind: "var" }) && !e[Ni.BLOCK_SCOPED_SYMBOL]
				);
			}),
			r),
		Ni = u;
	var wi = {},
		ji = {},
		ki =
			(Object.defineProperty(ji, "__esModule", { value: !0 }),
			(ji.default = function n(e, r) {
				let i = [];
				let t = !0;
				for (var a of e)
					if (((0, Li.isEmptyStatement)(a) || (t = !1), (0, Li.isExpression)(a)))
						i.push(a);
					else if ((0, Li.isExpressionStatement)(a)) i.push(a.expression);
					else if ((0, Li.isVariableDeclaration)(a)) {
						if ("var" !== a.kind) return;
						for (var o of a.declarations) {
							let e = (0, ki.default)(o);
							for (var s of Object.keys(e))
								r.push({ kind: a.kind, id: (0, Fi.default)(e[s]) });
							o.init && i.push((0, Mi.assignmentExpression)("=", o.id, o.init));
						}
						t = !0;
					} else if ((0, Li.isIfStatement)(a)) {
						let e = a.consequent ? n([a.consequent], r) : (0, Bi.buildUndefinedNode)(),
							t = a.alternate ? n([a.alternate], r) : (0, Bi.buildUndefinedNode)();
						if (!e || !t) return;
						i.push((0, Mi.conditionalExpression)(a.test, e, t));
					} else if ((0, Li.isBlockStatement)(a)) {
						let e = n(a.body, r);
						if (!e) return;
						i.push(e);
					} else {
						if (!(0, Li.isEmptyStatement)(a)) return;
						0 === e.indexOf(a) && (t = !0);
					}
				t && i.push((0, Bi.buildUndefinedNode)());
				return 1 === i.length ? i[0] : (0, Mi.sequenceExpression)(i);
			}),
			Qr),
		Li = r,
		Mi = s,
		Bi = o,
		Fi = c;
	Object.defineProperty(wi, "__esModule", { value: !0 }),
		(wi.default = function (e, t) {
			if (null != e && e.length) {
				var n = [],
					e = (0, Ha.default)(e, n);
				if (e) {
					for (var r of n) t.push(r);
					return e;
				}
			}
		});
	var k,
		Ri,
		Ki,
		Yi,
		Vi,
		Ji,
		Xi,
		qi,
		Ui,
		Wi,
		Gi,
		zi,
		Hi,
		$i,
		Qi,
		Zi,
		ea,
		ta,
		na,
		ra,
		ia,
		aa,
		oa,
		sa,
		la,
		pa,
		ua,
		ca,
		da,
		fa,
		ya,
		ma,
		Ta,
		ha,
		Sa,
		ba,
		Ea,
		va,
		ga,
		Pa,
		xa,
		Aa,
		Oa,
		_a,
		Ia,
		Ca,
		Da,
		Na,
		wa,
		ja,
		ka,
		La,
		Ma,
		Ba,
		Fa,
		Ra,
		Ka,
		Ya,
		Va,
		Ja,
		Xa,
		qa,
		Ua,
		Wa,
		Ga,
		za,
		Ha = ji;
	(k = e),
		Object.defineProperty(k, "__esModule", { value: !0 }),
		(Ri = {
			react: !0,
			assertNode: !0,
			createTypeAnnotationBasedOnTypeof: !0,
			createUnionTypeAnnotation: !0,
			createFlowUnionType: !0,
			createTSUnionType: !0,
			cloneNode: !0,
			clone: !0,
			cloneDeep: !0,
			cloneDeepWithoutLoc: !0,
			cloneWithoutLoc: !0,
			addComment: !0,
			addComments: !0,
			inheritInnerComments: !0,
			inheritLeadingComments: !0,
			inheritsComments: !0,
			inheritTrailingComments: !0,
			removeComments: !0,
			ensureBlock: !0,
			toBindingIdentifierName: !0,
			toBlock: !0,
			toComputedKey: !0,
			toExpression: !0,
			toIdentifier: !0,
			toKeyAlias: !0,
			toStatement: !0,
			valueToNode: !0,
			appendToMemberExpression: !0,
			inherits: !0,
			prependToMemberExpression: !0,
			removeProperties: !0,
			removePropertiesDeep: !0,
			removeTypeDuplicates: !0,
			getAssignmentIdentifiers: !0,
			getBindingIdentifiers: !0,
			getOuterBindingIdentifiers: !0,
			getFunctionName: !0,
			traverse: !0,
			traverseFast: !0,
			shallowEqual: !0,
			is: !0,
			isBinding: !0,
			isBlockScoped: !0,
			isImmutable: !0,
			isLet: !0,
			isNode: !0,
			isNodesEquivalent: !0,
			isPlaceholderType: !0,
			isReferenced: !0,
			isScope: !0,
			isSpecifierDefault: !0,
			isType: !0,
			isValidES3Identifier: !0,
			isValidIdentifier: !0,
			isVar: !0,
			matchesPattern: !0,
			validate: !0,
			buildMatchMemberExpression: !0,
			__internal__deprecationWarning: !0
		}),
		Object.defineProperty(k, "__internal__deprecationWarning", {
			enumerable: !0,
			get: function () {
				return za.default;
			}
		}),
		Object.defineProperty(k, "addComment", {
			enumerable: !0,
			get: function () {
				return Qi.default;
			}
		}),
		Object.defineProperty(k, "addComments", {
			enumerable: !0,
			get: function () {
				return Zi.default;
			}
		}),
		Object.defineProperty(k, "appendToMemberExpression", {
			enumerable: !0,
			get: function () {
				return ha.default;
			}
		}),
		Object.defineProperty(k, "assertNode", {
			enumerable: !0,
			get: function () {
				return Ki.default;
			}
		}),
		Object.defineProperty(k, "buildMatchMemberExpression", {
			enumerable: !0,
			get: function () {
				return Wa.default;
			}
		}),
		Object.defineProperty(k, "clone", {
			enumerable: !0,
			get: function () {
				return Gi.default;
			}
		}),
		Object.defineProperty(k, "cloneDeep", {
			enumerable: !0,
			get: function () {
				return zi.default;
			}
		}),
		Object.defineProperty(k, "cloneDeepWithoutLoc", {
			enumerable: !0,
			get: function () {
				return Hi.default;
			}
		}),
		Object.defineProperty(k, "cloneNode", {
			enumerable: !0,
			get: function () {
				return Wi.default;
			}
		}),
		Object.defineProperty(k, "cloneWithoutLoc", {
			enumerable: !0,
			get: function () {
				return $i.default;
			}
		}),
		Object.defineProperty(k, "createFlowUnionType", {
			enumerable: !0,
			get: function () {
				return Ji.default;
			}
		}),
		Object.defineProperty(k, "createTSUnionType", {
			enumerable: !0,
			get: function () {
				return Xi.default;
			}
		}),
		Object.defineProperty(k, "createTypeAnnotationBasedOnTypeof", {
			enumerable: !0,
			get: function () {
				return Vi.default;
			}
		}),
		Object.defineProperty(k, "createUnionTypeAnnotation", {
			enumerable: !0,
			get: function () {
				return Ji.default;
			}
		}),
		Object.defineProperty(k, "ensureBlock", {
			enumerable: !0,
			get: function () {
				return sa.default;
			}
		}),
		Object.defineProperty(k, "getAssignmentIdentifiers", {
			enumerable: !0,
			get: function () {
				return Pa.default;
			}
		}),
		Object.defineProperty(k, "getBindingIdentifiers", {
			enumerable: !0,
			get: function () {
				return xa.default;
			}
		}),
		Object.defineProperty(k, "getFunctionName", {
			enumerable: !0,
			get: function () {
				return Oa.default;
			}
		}),
		Object.defineProperty(k, "getOuterBindingIdentifiers", {
			enumerable: !0,
			get: function () {
				return Aa.default;
			}
		}),
		Object.defineProperty(k, "inheritInnerComments", {
			enumerable: !0,
			get: function () {
				return ea.default;
			}
		}),
		Object.defineProperty(k, "inheritLeadingComments", {
			enumerable: !0,
			get: function () {
				return ta.default;
			}
		}),
		Object.defineProperty(k, "inheritTrailingComments", {
			enumerable: !0,
			get: function () {
				return ra.default;
			}
		}),
		Object.defineProperty(k, "inherits", {
			enumerable: !0,
			get: function () {
				return Sa.default;
			}
		}),
		Object.defineProperty(k, "inheritsComments", {
			enumerable: !0,
			get: function () {
				return na.default;
			}
		}),
		Object.defineProperty(k, "is", {
			enumerable: !0,
			get: function () {
				return Da.default;
			}
		}),
		Object.defineProperty(k, "isBinding", {
			enumerable: !0,
			get: function () {
				return Na.default;
			}
		}),
		Object.defineProperty(k, "isBlockScoped", {
			enumerable: !0,
			get: function () {
				return wa.default;
			}
		}),
		Object.defineProperty(k, "isImmutable", {
			enumerable: !0,
			get: function () {
				return ja.default;
			}
		}),
		Object.defineProperty(k, "isLet", {
			enumerable: !0,
			get: function () {
				return ka.default;
			}
		}),
		Object.defineProperty(k, "isNode", {
			enumerable: !0,
			get: function () {
				return La.default;
			}
		}),
		Object.defineProperty(k, "isNodesEquivalent", {
			enumerable: !0,
			get: function () {
				return Ma.default;
			}
		}),
		Object.defineProperty(k, "isPlaceholderType", {
			enumerable: !0,
			get: function () {
				return Ba.default;
			}
		}),
		Object.defineProperty(k, "isReferenced", {
			enumerable: !0,
			get: function () {
				return Fa.default;
			}
		}),
		Object.defineProperty(k, "isScope", {
			enumerable: !0,
			get: function () {
				return Ra.default;
			}
		}),
		Object.defineProperty(k, "isSpecifierDefault", {
			enumerable: !0,
			get: function () {
				return Ka.default;
			}
		}),
		Object.defineProperty(k, "isType", {
			enumerable: !0,
			get: function () {
				return Ya.default;
			}
		}),
		Object.defineProperty(k, "isValidES3Identifier", {
			enumerable: !0,
			get: function () {
				return Va.default;
			}
		}),
		Object.defineProperty(k, "isValidIdentifier", {
			enumerable: !0,
			get: function () {
				return Ja.default;
			}
		}),
		Object.defineProperty(k, "isVar", {
			enumerable: !0,
			get: function () {
				return Xa.default;
			}
		}),
		Object.defineProperty(k, "matchesPattern", {
			enumerable: !0,
			get: function () {
				return qa.default;
			}
		}),
		Object.defineProperty(k, "prependToMemberExpression", {
			enumerable: !0,
			get: function () {
				return ba.default;
			}
		}),
		(k.react = void 0),
		Object.defineProperty(k, "removeComments", {
			enumerable: !0,
			get: function () {
				return ia.default;
			}
		}),
		Object.defineProperty(k, "removeProperties", {
			enumerable: !0,
			get: function () {
				return Ea.default;
			}
		}),
		Object.defineProperty(k, "removePropertiesDeep", {
			enumerable: !0,
			get: function () {
				return va.default;
			}
		}),
		Object.defineProperty(k, "removeTypeDuplicates", {
			enumerable: !0,
			get: function () {
				return ga.default;
			}
		}),
		Object.defineProperty(k, "shallowEqual", {
			enumerable: !0,
			get: function () {
				return Ca.default;
			}
		}),
		Object.defineProperty(k, "toBindingIdentifierName", {
			enumerable: !0,
			get: function () {
				return la.default;
			}
		}),
		Object.defineProperty(k, "toBlock", {
			enumerable: !0,
			get: function () {
				return pa.default;
			}
		}),
		Object.defineProperty(k, "toComputedKey", {
			enumerable: !0,
			get: function () {
				return ua.default;
			}
		}),
		Object.defineProperty(k, "toExpression", {
			enumerable: !0,
			get: function () {
				return ca.default;
			}
		}),
		Object.defineProperty(k, "toIdentifier", {
			enumerable: !0,
			get: function () {
				return da.default;
			}
		}),
		Object.defineProperty(k, "toKeyAlias", {
			enumerable: !0,
			get: function () {
				return fa.default;
			}
		}),
		Object.defineProperty(k, "toStatement", {
			enumerable: !0,
			get: function () {
				return ya.default;
			}
		}),
		Object.defineProperty(k, "traverse", {
			enumerable: !0,
			get: function () {
				return _a.default;
			}
		}),
		Object.defineProperty(k, "traverseFast", {
			enumerable: !0,
			get: function () {
				return Ia.default;
			}
		}),
		Object.defineProperty(k, "validate", {
			enumerable: !0,
			get: function () {
				return Ua.default;
			}
		}),
		Object.defineProperty(k, "valueToNode", {
			enumerable: !0,
			get: function () {
				return ma.default;
			}
		}),
		(ji = n),
		(n = ke),
		(ke = Le),
		(Ki = f),
		(Yi = p),
		Object.keys(Yi).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === Yi[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return Yi[e];
					}
				});
		}),
		(Vi = h),
		(Ji = y),
		(Xi = l),
		(qi = o),
		Object.keys(qi).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === qi[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return qi[e];
					}
				});
		}),
		(Ui = s),
		Object.keys(Ui).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === Ui[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return Ui[e];
					}
				});
		}),
		(Wi = c),
		(Gi = I),
		(zi = Xn),
		(Hi = Un),
		($i = Gn),
		(Qi = C),
		(Zi = Hn),
		(ea = D),
		(ta = N),
		(na = tr),
		(ra = nr),
		(ia = Qn),
		(aa = w),
		Object.keys(aa).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === aa[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return aa[e];
					}
				});
		}),
		(oa = u),
		Object.keys(oa).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === oa[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return oa[e];
					}
				});
		}),
		(sa = j),
		(la = dr),
		(pa = lr),
		(ua = Ge),
		(ca = br),
		(da = fr),
		(fa = vr),
		(ya = kr),
		(ma = Br),
		(Ta = Be),
		Object.keys(Ta).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === Ta[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return Ta[e];
					}
				});
		}),
		(ha = Jr),
		(Sa = qr),
		(ba = Gr),
		(Ea = Ar),
		(va = gr),
		(ga = E),
		(Pa = $r),
		(xa = Qr),
		(Aa = ti),
		(Oa = ri),
		(_a = oi),
		Object.keys(_a).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === _a[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return _a[e];
					}
				});
		}),
		(Ia = Pr),
		(Ca = _e),
		(Da = Fe),
		(Na = li),
		(wa = ui),
		(ja = Ti),
		(ka = ci),
		(La = d),
		(Ma = bi),
		(Ba = Ye),
		(Fa = vi),
		(Ra = gi),
		(Ka = xi),
		(Ya = Re),
		(Va = Oi),
		(Ja = We),
		(Xa = Ci),
		(qa = Oe),
		(Ua = Me),
		(Wa = Ae),
		(Ga = r),
		Object.keys(Ga).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				Object.prototype.hasOwnProperty.call(Ri, e) ||
				(e in k && k[e] === Ga[e]) ||
				Object.defineProperty(k, e, {
					enumerable: !0,
					get: function () {
						return Ga[e];
					}
				});
		}),
		(za = Ie),
		(Le = wi),
		(k.react = {
			isReactComponent: ji.default,
			isCompatTag: n.default,
			buildChildren: ke.default
		}),
		(k.toSequenceExpression = Le.default),
		{}.BABEL_TYPES_8_BREAKING &&
			console.warn(
				"BABEL_TYPES_8_BREAKING is not supported anymore. Use the latest Babel 8.0.0 pre-release instead!"
			),
		Object.defineProperty(t, "__esModule", { value: !0 }),
		(t.nodes = void 0);
	let $a = e,
		{
			FLIPPED_ALIAS_KEYS: Qa,
			isArrayExpression: Za,
			isAssignmentExpression: eo,
			isBinary: to,
			isBlockStatement: no,
			isCallExpression: ro,
			isFunction: io,
			isIdentifier: ao,
			isLiteral: oo,
			isMemberExpression: so,
			isObjectExpression: lo,
			isOptionalCallExpression: po,
			isOptionalMemberExpression: uo,
			isStringLiteral: co
		} = $a;
	function fo(e) {
		return (function e(t, n) {
			return (
				t &&
					(so(t) || uo(t)
						? (e(t.object, n), t.computed && e(t.property, n))
						: to(t) || eo(t)
							? (e(t.left, n), e(t.right, n))
							: ro(t) || po(t)
								? ((n.hasCall = !0), e(t.callee, n))
								: io(t)
									? (n.hasFunction = !0)
									: ao(t) &&
										(n.hasHelper = n.hasHelper || (t.callee && yo(t.callee)))),
				n
			);
		})(e, { hasCall: !1, hasFunction: !1, hasHelper: !1 });
	}
	function yo(e) {
		return (
			!!e &&
			(so(e)
				? yo(e.object) || yo(e.property)
				: ao(e)
					? "require" === e.name || 95 === e.name.charCodeAt(0)
					: ro(e)
						? yo(e.callee)
						: !(!to(e) && !eo(e)) && ((ao(e.left) && yo(e.left)) || yo(e.right)))
		);
	}
	let mo = (t.nodes = {
		AssignmentExpression(e) {
			e = fo(e.right);
			if ((e.hasCall && e.hasHelper) || e.hasFunction) return e.hasFunction ? 3 : 2;
		},
		SwitchCase(e, t) {
			return (
				(e.consequent.length || t.cases[0] === e ? 1 : 0) |
				(e.consequent.length || t.cases[t.cases.length - 1] !== e ? 0 : 2)
			);
		},
		LogicalExpression(e) {
			if (io(e.left) || io(e.right)) return 2;
		},
		Literal(e) {
			if (co(e) && "use strict" === e.value) return 2;
		},
		CallExpression(e) {
			if (io(e.callee) || yo(e)) return 3;
		},
		OptionalCallExpression(e) {
			if (io(e.callee)) return 3;
		},
		VariableDeclaration(n) {
			for (let t = 0; t < n.declarations.length; t++) {
				var r = n.declarations[t];
				let e = yo(r.id) && ((i = r.init), !(oo(i) || lo(i) || Za(i) || ao(i) || so(i)));
				if (
					(!e &&
						r.init &&
						((i = fo(r.init)), (e = (yo(r.init) && i.hasCall) || i.hasFunction)),
					e)
				)
					return 3;
			}
			var i;
		},
		IfStatement(e) {
			if (no(e.consequent)) return 3;
		}
	});
	(mo.ObjectProperty =
		mo.ObjectTypeProperty =
		mo.ObjectMethod =
			function (e, t) {
				if (t.properties[0] === e) return 1;
			}),
		(mo.ObjectTypeCallProperty = function (e, t) {
			if (t.callProperties[0] === e && (null == (e = t.properties) || !e.length)) return 1;
		}),
		(mo.ObjectTypeIndexer = function (e, t) {
			if (
				!(
					t.indexers[0] !== e ||
					(null != (e = t.properties) && e.length) ||
					(null != (e = t.callProperties) && e.length)
				)
			)
				return 1;
		}),
		(mo.ObjectTypeInternalSlot = function (e, t) {
			if (
				!(
					t.internalSlots[0] !== e ||
					(null != (e = t.properties) && e.length) ||
					(null != (e = t.callProperties) && e.length) ||
					(null != (e = t.indexers) && e.length)
				)
			)
				return 1;
		}),
		[
			["Function", !0],
			["Class", !0],
			["Loop", !0],
			["LabeledStatement", !0],
			["SwitchStatement", !0],
			["TryStatement", !0]
		].forEach(function ([e, n]) {
			[e].concat(Qa[e] || []).forEach(function (e) {
				let t = n ? 3 : 0;
				mo[e] = () => t;
			});
		});
	f = {};
	Object.defineProperty(f, "__esModule", { value: !0 }),
		(f.AssignmentExpression = function (e, t, n) {
			return !(!wo(n) || !Po(e.left)) || Lo(e, t);
		}),
		(f.Binary = jo),
		(f.BinaryExpression = function (e, t, n, r) {
			return "in" === e.operator && r;
		}),
		(f.ClassExpression = function (e, t, n) {
			return Boolean(
				n & (To.TokenContext.expressionStatement | To.TokenContext.exportDefault)
			);
		}),
		(f.ArrowFunctionExpression = f.ConditionalExpression = Lo),
		(f.DoExpression = function (e, t, n) {
			return !e.async && Boolean(n & To.TokenContext.expressionStatement);
		}),
		(f.FunctionExpression = function (e, t, n) {
			return Boolean(
				n & (To.TokenContext.expressionStatement | To.TokenContext.exportDefault)
			);
		}),
		(f.FunctionTypeAnnotation = function (e, t, n) {
			t = t.type;
			return (
				"UnionTypeAnnotation" === t ||
				"IntersectionTypeAnnotation" === t ||
				"ArrayTypeAnnotation" === t ||
				Boolean(n & To.TokenContext.arrowFlowReturnType)
			);
		}),
		(f.Identifier = function (e, t, n, r, i) {
			var a = t.type;
			if (
				null != (o = e.extra) &&
				o.parenthesized &&
				"AssignmentExpression" === a &&
				t.left === e
			) {
				var o = t.right.type;
				if (("FunctionExpression" === o || "ClassExpression" === o) && null == t.right.id)
					return !0;
			}
			if (i && i(e) !== e.name) return !1;
			if ("let" !== e.name) return "async" === e.name && Eo(t, { left: e, await: !1 });
			return (
				!!(
					(go(t, { object: e, computed: !0 }) ||
						xo(t, { object: e, computed: !0, optional: !1 })) &&
					n &
						(To.TokenContext.expressionStatement |
							To.TokenContext.forHead |
							To.TokenContext.forInHead)
				) || Boolean(n & To.TokenContext.forOfHead)
			);
		}),
		(f.LogicalExpression = function (e, t) {
			var n = t.type;
			if (Co(n)) return !0;
			if ("LogicalExpression" !== n) return !1;
			switch (e.operator) {
				case "||":
					return "??" === t.operator || "&&" === t.operator;
				case "&&":
					return "??" === t.operator;
				case "??":
					return "??" !== t.operator;
			}
		}),
		(f.NullableTypeAnnotation = function (e, t) {
			return ho(t);
		}),
		(f.ObjectExpression = function (e, t, n) {
			return wo(n);
		}),
		(f.OptionalIndexedAccessType = function (e, t) {
			return vo(t) && t.objectType === e;
		}),
		(f.OptionalCallExpression = f.OptionalMemberExpression =
			function (e, t) {
				return (bo(t) && t.callee === e) || (go(t) && t.object === e);
			}),
		(f.SequenceExpression = function (e, t) {
			var n = t.type;
			if (
				"SequenceExpression" === n ||
				"ParenthesizedExpression" === n ||
				("MemberExpression" === n && t.property === e) ||
				("OptionalMemberExpression" === n && t.property === e) ||
				"TemplateLiteral" === n
			)
				return !1;
			return (
				"ClassDeclaration" === n ||
				("ForOfStatement" !== n
					? "ExportDefaultDeclaration" === n || !Oo(t)
					: t.right === e)
			);
		}),
		(f.TSSatisfiesExpression = f.TSAsExpression =
			function (e, t) {
				return (
					(("AssignmentExpression" === t.type || "AssignmentPattern" === t.type) &&
						t.left === e) ||
					("BinaryExpression" === t.type &&
						("|" === t.operator || "&" === t.operator) &&
						e === t.left) ||
					jo(e, t)
				);
			}),
		(f.TSConditionalType = function (e, t) {
			var n = t.type;
			if (
				"TSArrayType" === n ||
				("TSIndexedAccessType" === n && t.objectType === e) ||
				"TSOptionalType" === n ||
				"TSTypeOperator" === n ||
				"TSTypeParameter" === n
			)
				return !0;
			return (
				(("TSIntersectionType" === n || "TSUnionType" === n) && t.types[0] === e) ||
				("TSConditionalType" === n && (t.checkType === e || t.extendsType === e))
			);
		}),
		(f.TSConstructorType = f.TSFunctionType =
			function (e, t) {
				var n = t.type;
				return (
					"TSIntersectionType" === n ||
					"TSUnionType" === n ||
					"TSTypeOperator" === n ||
					"TSOptionalType" === n ||
					"TSArrayType" === n ||
					("TSIndexedAccessType" === n && t.objectType === e) ||
					("TSConditionalType" === n && (t.checkType === e || t.extendsType === e))
				);
			}),
		(f.TSInferType = function (e, t) {
			var n = t.type;
			if (
				"TSArrayType" === n ||
				("TSIndexedAccessType" === n && t.objectType === e) ||
				"TSOptionalType" === n
			)
				return !0;
			if (
				e.typeParameter.constraint &&
				("TSIntersectionType" === n || "TSUnionType" === n) &&
				t.types[0] === e
			)
				return !0;
			return !1;
		}),
		(f.TSInstantiationExpression = function (e, t) {
			var n = t.type;
			return (
				("CallExpression" === n ||
					"OptionalCallExpression" === n ||
					"NewExpression" === n ||
					"TSInstantiationExpression" === n) &&
				!!t.typeParameters
			);
		}),
		(f.TSIntersectionType = function (e, t) {
			var n = t.type;
			return (
				"TSTypeOperator" === n ||
				"TSArrayType" === n ||
				("TSIndexedAccessType" === n && t.objectType === e) ||
				"TSOptionalType" === n
			);
		}),
		(f.UnaryLike = f.TSTypeAssertion = ko),
		(f.TSTypeOperator = function (e, t) {
			var n = t.type;
			return (
				"TSArrayType" === n ||
				("TSIndexedAccessType" === n && t.objectType === e) ||
				"TSOptionalType" === n
			);
		}),
		(f.TSUnionType = function (e, t) {
			var n = t.type;
			return (
				"TSIntersectionType" === n ||
				"TSTypeOperator" === n ||
				"TSArrayType" === n ||
				("TSIndexedAccessType" === n && t.objectType === e) ||
				"TSOptionalType" === n
			);
		}),
		(f.IntersectionTypeAnnotation = f.UnionTypeAnnotation =
			function (e, t) {
				t = t.type;
				return (
					"ArrayTypeAnnotation" === t ||
					"NullableTypeAnnotation" === t ||
					"IntersectionTypeAnnotation" === t ||
					"UnionTypeAnnotation" === t
				);
			}),
		(f.UpdateExpression = function (e, t) {
			return No(e, t) || Do(e, t);
		}),
		(f.AwaitExpression = f.YieldExpression =
			function (e, t) {
				var n = t.type;
				return (
					"BinaryExpression" === n ||
					"LogicalExpression" === n ||
					"UnaryExpression" === n ||
					"SpreadElement" === n ||
					No(e, t) ||
					("AwaitExpression" === n && Ao(e)) ||
					("ConditionalExpression" === n && e === t.test) ||
					Do(e, t) ||
					Co(n)
				);
			});
	var To = i;
	let {
			isArrayTypeAnnotation: ho,
			isBinaryExpression: So,
			isCallExpression: bo,
			isForOfStatement: Eo,
			isIndexedAccessType: vo,
			isMemberExpression: go,
			isObjectPattern: Po,
			isOptionalMemberExpression: xo,
			isYieldExpression: Ao,
			isStatement: Oo
		} = e,
		_o = new Map([
			["||", 0],
			["??", 0],
			["|>", 0],
			["&&", 1],
			["|", 2],
			["^", 3],
			["&", 4],
			["==", 5],
			["===", 5],
			["!=", 5],
			["!==", 5],
			["<", 6],
			[">", 6],
			["<=", 6],
			[">=", 6],
			["in", 6],
			["instanceof", 6],
			[">>", 7],
			["<<", 7],
			[">>>", 7],
			["+", 8],
			["-", 8],
			["*", 9],
			["/", 9],
			["%", 9],
			["**", 10]
		]);
	function Io(e, t) {
		return "BinaryExpression" === t || "LogicalExpression" === t
			? _o.get(e.operator)
			: "TSAsExpression" === t || "TSSatisfiesExpression" === t
				? _o.get("in")
				: void 0;
	}
	function Co(e) {
		return "TSAsExpression" === e || "TSSatisfiesExpression" === e || "TSTypeAssertion" === e;
	}
	let Do = (e, t) => {
			var n = t.type;
			return ("ClassDeclaration" === n || "ClassExpression" === n) && t.superClass === e;
		},
		No = (e, t) => {
			var n = t.type;
			return (
				(("MemberExpression" === n || "OptionalMemberExpression" === n) &&
					t.object === e) ||
				(("CallExpression" === n ||
					"OptionalCallExpression" === n ||
					"NewExpression" === n) &&
					t.callee === e) ||
				("TaggedTemplateExpression" === n && t.tag === e) ||
				"TSNonNullExpression" === n
			);
		};
	function wo(e) {
		return Boolean(e & (To.TokenContext.expressionStatement | To.TokenContext.arrowBody));
	}
	function jo(e, t) {
		var n = t.type;
		if (
			"BinaryExpression" === e.type &&
			"**" === e.operator &&
			"BinaryExpression" === n &&
			"**" === t.operator
		)
			return t.left === e;
		if (Do(e, t)) return !0;
		if (No(e, t) || "UnaryExpression" === n || "SpreadElement" === n || "AwaitExpression" === n)
			return !0;
		var r = Io(t, n);
		if (null != r) {
			var i = Io(e, e.type);
			if ((r === i && "BinaryExpression" === n && t.right === e) || i < r) return !0;
		}
	}
	function ko(e, t) {
		return No(e, t) || (So(t) && "**" === t.operator && t.left === e) || Do(e, t);
	}
	function Lo(e, t) {
		var n = t.type;
		return (
			!!(
				"UnaryExpression" === n ||
				"SpreadElement" === n ||
				"BinaryExpression" === n ||
				"LogicalExpression" === n ||
				("ConditionalExpression" === n && t.test === e) ||
				"AwaitExpression" === n ||
				Co(n)
			) || ko(e, t)
		);
	}
	Object.defineProperty(i, "__esModule", { value: !0 }),
		(i.TokenContext = void 0),
		(i.isLastChild = function (t, n) {
			var r = Ko[t.type];
			for (let e = r.length - 1; 0 <= e; e--) {
				var i = t[r[e]];
				if (i === n) return !0;
				if (Array.isArray(i)) {
					let e = i.length - 1;
					for (; 0 <= e && null === i[e]; ) e--;
					return 0 <= e && i[e] === n;
				}
				if (i) return !1;
			}
			return !1;
		}),
		(i.needsParens = function (e, t, n, r, i) {
			var a;
			if (!t) return !1;
			if (
				qo(t) &&
				t.callee === e &&
				(function e(t) {
					if (Yo(t)) return !0;
					return Xo(t) && e(t.object);
				})(e)
			)
				return !0;
			if (Vo(t)) return !($o(e) || (Yo(e) && $o(e.callee)) || Uo(e));
			return null == (a = Go.get(e.type)) ? void 0 : a(e, t, n, r, i);
		}),
		(i.needsWhitespace = Ho),
		(i.needsWhitespaceAfter = function (e, t) {
			return Ho(e, t, 2);
		}),
		(i.needsWhitespaceBefore = function (e, t) {
			return Ho(e, t, 1);
		});
	let Mo = t,
		Bo = f,
		Fo = e,
		{
			FLIPPED_ALIAS_KEYS: Ro,
			VISITOR_KEYS: Ko,
			isCallExpression: Yo,
			isDecorator: Vo,
			isExpressionStatement: Jo,
			isMemberExpression: Xo,
			isNewExpression: qo,
			isParenthesizedExpression: Uo
		} = Fo;
	function Wo(e) {
		let t = new Map();
		function n(e, o) {
			let s = t.get(e);
			t.set(
				e,
				s
					? function (e, t, n, r, i) {
							var a;
							return null != (a = s(e, t, n, r, i)) ? a : o(e, t, n, r, i);
						}
					: o
			);
		}
		for (var r of Object.keys(e)) {
			var i = Ro[r];
			if (i) for (var a of i) n(a, e[r]);
			else n(r, e[r]);
		}
		return t;
	}
	i.TokenContext = {
		expressionStatement: 1,
		arrowBody: 2,
		exportDefault: 4,
		forHead: 8,
		forInHead: 16,
		forOfHead: 32,
		arrowFlowReturnType: 64
	};
	let Go = Wo(Bo),
		zo = Wo(Mo.nodes);
	function Ho(e, t, n) {
		if (!e) return !1;
		Jo(e) && (e = e.expression);
		var r = null == (r = zo.get(e.type)) ? void 0 : r(e, t);
		return "number" == typeof r && 0 != (r & n);
	}
	function $o(e) {
		switch (e.type) {
			case "Identifier":
				return !0;
			case "MemberExpression":
				return !e.computed && "Identifier" === e.property.type && $o(e.object);
			default:
				return !1;
		}
	}
	let Qo = {},
		Zo = (Object.defineProperty(Qo, "__esModule", { value: !0 }), (Qo.TokenMap = void 0), e),
		{ traverseFast: es, VISITOR_KEYS: ts } = Zo;
	class ns {
		constructor(e, t, n) {
			(this._tokens = void 0),
				(this._source = void 0),
				(this._nodesToTokenIndexes = new Map()),
				(this._nodesOccurrencesCountCache = new Map()),
				(this._tokensCache = new Map()),
				(this._tokens = t),
				(this._source = n),
				es(e, e => {
					var t = this._getTokensIndexesOfNode(e);
					0 < t.length && this._nodesToTokenIndexes.set(e, t);
				}),
				(this._tokensCache = null);
		}
		has(e) {
			return this._nodesToTokenIndexes.has(e);
		}
		getIndexes(e) {
			return this._nodesToTokenIndexes.get(e);
		}
		find(e, t) {
			var n = this._nodesToTokenIndexes.get(e);
			if (n)
				for (let e = 0; e < n.length; e++) {
					var r = n[e],
						i = this._tokens[r];
					if (t(i, r)) return i;
				}
			return null;
		}
		findLastIndex(e, t) {
			var n = this._nodesToTokenIndexes.get(e);
			if (n)
				for (let e = n.length - 1; 0 <= e; e--) {
					var r = n[e];
					if (t(this._tokens[r], r)) return r;
				}
			return -1;
		}
		findMatching(t, n, r = 0) {
			var i = this._nodesToTokenIndexes.get(t);
			if (i) {
				let e = 0;
				var a,
					o = r;
				for (
					1 < o &&
					(a = this._nodesOccurrencesCountCache.get(t)) &&
					a.test === n &&
					a.count < o &&
					((e = a.i + 1), (r -= a.count + 1));
					e < i.length;
					e++
				) {
					var s = this._tokens[i[e]];
					if (this.matchesOriginal(s, n)) {
						if (0 === r)
							return (
								0 < o &&
									this._nodesOccurrencesCountCache.set(t, {
										test: n,
										count: o,
										i: e
									}),
								s
							);
						r--;
					}
				}
			}
			return null;
		}
		matchesOriginal(e, t) {
			return (
				e.end - e.start === t.length &&
				(null != e.value ? e.value === t : this._source.startsWith(t, e.start))
			);
		}
		startMatches(e, t) {
			var n = this._nodesToTokenIndexes.get(e);
			return !!n && (n = this._tokens[n[0]]).start === e.start && this.matchesOriginal(n, t);
		}
		endMatches(e, t) {
			var n = this._nodesToTokenIndexes.get(e);
			return (
				!!n &&
				(n = this._tokens[n[n.length - 1]]).end === e.end &&
				this.matchesOriginal(n, t)
			);
		}
		_getTokensIndexesOfNode(e) {
			if (null == e.start || null == e.end) return [];
			var { first: t, last: n } = this._findTokensOfNode(e, 0, this._tokens.length - 1);
			let r = t;
			var i,
				t = (function* (t) {
					if ("TemplateLiteral" === t.type) {
						yield t.quasis[0];
						for (let e = 1; e < t.quasis.length; e++)
							yield t.expressions[e - 1], yield t.quasis[e];
					} else {
						var e;
						for (e of ts[t.type]) {
							var n = t[e];
							n && (Array.isArray(n) ? yield* n : yield n);
						}
					}
				})(e),
				a =
					(("ExportNamedDeclaration" !== e.type &&
						"ExportDefaultDeclaration" !== e.type) ||
						!e.declaration ||
						"ClassDeclaration" !== e.declaration.type ||
						t.next(),
					[]);
			for (i of t)
				if (null != i && null != i.start && null != i.end) {
					var o = this._findTokensOfNode(i, r, n),
						s = o.first;
					for (let e = r; e < s; e++) a.push(e);
					r = o.last + 1;
				}
			for (let e = r; e <= n; e++) a.push(e);
			return a;
		}
		_findTokensOfNode(e, t, n) {
			var r = this._tokensCache.get(e);
			return (
				r ||
				((r = this._findFirstTokenOfNode(e.start, t, n)),
				(t = this._findLastTokenOfNode(e.end, r, n)),
				this._tokensCache.set(e, { first: r, last: t }),
				{ first: r, last: t })
			);
		}
		_findFirstTokenOfNode(e, t, n) {
			for (; t <= n; ) {
				var r = (n + t) >> 1;
				if (e < this._tokens[r].start) n = r - 1;
				else {
					if (!(e > this._tokens[r].start)) return r;
					t = 1 + r;
				}
			}
			return t;
		}
		_findLastTokenOfNode(e, t, n) {
			for (; t <= n; ) {
				var r = (n + t) >> 1;
				if (e < this._tokens[r].end) n = r - 1;
				else {
					if (!(e > this._tokens[r].end)) return r;
					t = 1 + r;
				}
			}
			return n;
		}
	}
	Qo.TokenMap = ns;
	(p = {}), (h = {});
	Object.defineProperty(h, "__esModule", { value: !0 }),
		(h.TaggedTemplateExpression = function (e) {
			this.print(e.tag), this.print(e.typeParameters), this.print(e.quasi);
		}),
		(h.TemplateElement = function () {
			throw new Error("TemplateElement printing is handled in TemplateLiteral");
		}),
		(h.TemplateLiteral = function (e) {
			this._printTemplate(e, e.expressions);
		}),
		(h._printTemplate = function (t, n) {
			let r = t.quasis,
				i = "`";
			for (let e = 0; e < r.length - 1; e++) {
				var a;
				(i += r[e].value.raw),
					this.token(i + "${", !0),
					this.print(n[e]),
					(i = "}"),
					this.tokenMap &&
						(a = this.tokenMap.findMatching(t, "}", e)) &&
						this._catchUpTo(a.loc.start);
			}
			(i += r[r.length - 1].value.raw), this.token(i + "`", !0);
		});
	y = {};
	Object.defineProperty(y, "__esModule", { value: !0 }),
		(y.LogicalExpression =
			y.BinaryExpression =
			y.AssignmentExpression =
				function (e) {
					this.print(e.left),
						this.space(),
						"in" === e.operator || "instanceof" === e.operator
							? this.word(e.operator)
							: (this.token(e.operator), (this._endsWithDiv = "/" === e.operator));
					this.space(), this.print(e.right);
				}),
		(y.AssignmentPattern = function (e) {
			this.print(e.left),
				("Identifier" !== e.left.type && !ls(e.left)) ||
					(e.left.optional && this.tokenChar(63), this.print(e.left.typeAnnotation));
			this.space(), this.tokenChar(61), this.space(), this.print(e.right);
		}),
		(y.AwaitExpression = function (e) {
			this.word("await"), e.argument && (this.space(), this.printTerminatorless(e.argument));
		}),
		(y.BindExpression = function (e) {
			this.print(e.object), this.token("::"), this.print(e.callee);
		}),
		(y.CallExpression = function (e) {
			this.print(e.callee),
				this.print(e.typeArguments),
				this.print(e.typeParameters),
				this.tokenChar(40);
			var t = this.enterDelimited();
			this.printList(e.arguments, this.shouldPrintTrailingComma(")")),
				t(),
				this.rightParens(e);
		}),
		(y.ConditionalExpression = function (e) {
			this.print(e.test),
				this.space(),
				this.tokenChar(63),
				this.space(),
				this.print(e.consequent),
				this.space(),
				this.tokenChar(58),
				this.space(),
				this.print(e.alternate);
		}),
		(y.Decorator = function (e) {
			this.tokenChar(64), this.print(e.expression), this.newline();
		}),
		(y.DoExpression = function (e) {
			e.async && (this.word("async", !0), this.space());
			this.word("do"), this.space(), this.print(e.body);
		}),
		(y.EmptyStatement = function () {
			this.semicolon(!0);
		}),
		(y.ExpressionStatement = function (e) {
			(this.tokenContext |= rs.TokenContext.expressionStatement),
				this.print(e.expression),
				this.semicolon();
		}),
		(y.Import = function () {
			this.word("import");
		}),
		(y.MemberExpression = function (e) {
			if ((this.print(e.object), !e.computed && os(e.property)))
				throw new TypeError("Got a MemberExpression for MemberExpression property");
			let t = e.computed;
			as(e.property) && "number" == typeof e.property.value && (t = !0);
			{
				var n;
				t
					? ((n = this.enterDelimited()),
						this.tokenChar(91),
						this.print(e.property),
						this.tokenChar(93),
						n())
					: (this.tokenChar(46), this.print(e.property));
			}
		}),
		(y.MetaProperty = function (e) {
			this.print(e.meta), this.tokenChar(46), this.print(e.property);
		}),
		(y.ModuleExpression = function (e) {
			this.word("module", !0), this.space(), this.tokenChar(123), this.indent();
			var t = e.body;
			(t.body.length || t.directives.length) && this.newline();
			this.print(t), this.dedent(), this.rightBrace(e);
		}),
		(y.NewExpression = function (e, t) {
			this.word("new"),
				this.space(),
				this.print(e.callee),
				(!this.format.minified ||
					0 !== e.arguments.length ||
					e.optional ||
					is(t, { callee: e }) ||
					os(t) ||
					ss(t)) &&
					(this.print(e.typeArguments),
					this.print(e.typeParameters),
					e.optional && this.token("?."),
					(0 === e.arguments.length &&
						this.tokenMap &&
						!this.tokenMap.endMatches(e, ")")) ||
						(this.tokenChar(40),
						(t = this.enterDelimited()),
						this.printList(e.arguments, this.shouldPrintTrailingComma(")")),
						t(),
						this.rightParens(e)));
		}),
		(y.OptionalCallExpression = function (e) {
			this.print(e.callee), this.print(e.typeParameters), e.optional && this.token("?.");
			this.print(e.typeArguments), this.tokenChar(40);
			var t = this.enterDelimited();
			this.printList(e.arguments), t(), this.rightParens(e);
		}),
		(y.OptionalMemberExpression = function (e) {
			let t = e.computed,
				{ optional: n, property: r } = e;
			if ((this.print(e.object), !t && os(r)))
				throw new TypeError("Got a MemberExpression for MemberExpression property");
			as(r) && "number" == typeof r.value && (t = !0);
			n && this.token("?.");
			t
				? (this.tokenChar(91), this.print(r), this.tokenChar(93))
				: (n || this.tokenChar(46), this.print(r));
		}),
		(y.ParenthesizedExpression = function (e) {
			this.tokenChar(40);
			var t = this.enterDelimited();
			this.print(e.expression), t(), this.rightParens(e);
		}),
		(y.PrivateName = function (e) {
			this.tokenChar(35), this.print(e.id);
		}),
		(y.SequenceExpression = function (e) {
			this.printList(e.expressions);
		}),
		(y.Super = function () {
			this.word("super");
		}),
		(y.ThisExpression = function () {
			this.word("this");
		}),
		(y.UnaryExpression = function (e) {
			var t = e.operator;
			"void" === t || "delete" === t || "typeof" === t || "throw" === t
				? (this.word(t), this.space())
				: this.token(t);
			this.print(e.argument);
		}),
		(y.UpdateExpression = function (e) {
			e.prefix
				? (this.token(e.operator), this.print(e.argument))
				: (this.print(e.argument, !0), this.token(e.operator));
		}),
		(y.V8IntrinsicIdentifier = function (e) {
			this.tokenChar(37), this.word(e.name);
		}),
		(y.YieldExpression = function (e) {
			this.word("yield", !0),
				e.delegate
					? (this.tokenChar(42), e.argument && (this.space(), this.print(e.argument)))
					: e.argument && (this.space(), this.printTerminatorless(e.argument));
		}),
		(y._shouldPrintDecoratorsBeforeExport = function (e) {
			return "boolean" != typeof this.format.decoratorsBeforeExport
				? "number" == typeof e.start && e.start === e.declaration.start
				: this.format.decoratorsBeforeExport;
		});
	var rs = i;
	let {
		isCallExpression: is,
		isLiteral: as,
		isMemberExpression: os,
		isNewExpression: ss,
		isPattern: ls
	} = e;
	l = {};
	Object.defineProperty(l, "__esModule", { value: !0 }),
		(l.BreakStatement = function (e) {
			this.word("break"), ms(this, e.label);
		}),
		(l.CatchClause = function (e) {
			this.word("catch"),
				this.space(),
				e.param &&
					(this.tokenChar(40),
					this.print(e.param),
					this.print(e.param.typeAnnotation),
					this.tokenChar(41),
					this.space());
			this.print(e.body);
		}),
		(l.ContinueStatement = function (e) {
			this.word("continue"), ms(this, e.label);
		}),
		(l.DebuggerStatement = function () {
			this.word("debugger"), this.semicolon();
		}),
		(l.DoWhileStatement = function (e) {
			this.word("do"),
				this.space(),
				this.print(e.body),
				this.space(),
				this.word("while"),
				this.space(),
				this.tokenChar(40),
				this.print(e.test),
				this.tokenChar(41),
				this.semicolon();
		}),
		(l.ForOfStatement = l.ForInStatement = void 0),
		(l.ForStatement = function (e) {
			this.word("for"), this.space(), this.tokenChar(40);
			{
				var t = this.enterForStatementInit();
				(this.tokenContext |= ps.TokenContext.forHead), this.print(e.init), t();
			}
			this.tokenChar(59), e.test && (this.space(), this.print(e.test));
			this.token(";", !1, 1), e.update && (this.space(), this.print(e.update));
			this.tokenChar(41), this.printBlock(e);
		}),
		(l.IfStatement = function (e) {
			this.word("if"),
				this.space(),
				this.tokenChar(40),
				this.print(e.test),
				this.tokenChar(41),
				this.space();
			var t =
				e.alternate &&
				ds(
					(function e(t) {
						let n = t.body;
						if (!1 === fs(n)) return t;
						return e(n);
					})(e.consequent)
				);
			t && (this.tokenChar(123), this.newline(), this.indent());
			this.printAndIndentOnComments(e.consequent),
				t && (this.dedent(), this.newline(), this.tokenChar(125));
			e.alternate &&
				(this.endsWith(125) && this.space(),
				this.word("else"),
				this.space(),
				this.printAndIndentOnComments(e.alternate));
		}),
		(l.LabeledStatement = function (e) {
			this.print(e.label), this.tokenChar(58), this.space(), this.print(e.body);
		}),
		(l.ReturnStatement = function (e) {
			this.word("return"), ms(this, e.argument);
		}),
		(l.SwitchCase = function (e) {
			e.test ? (this.word("case"), this.space(), this.print(e.test)) : this.word("default"),
				this.tokenChar(58);
			e.consequent.length && (this.newline(), this.printSequence(e.consequent, !0));
		}),
		(l.SwitchStatement = function (n) {
			this.word("switch"),
				this.space(),
				this.tokenChar(40),
				this.print(n.discriminant),
				this.tokenChar(41),
				this.space(),
				this.tokenChar(123),
				this.printSequence(n.cases, !0, void 0, function (e, t) {
					if (!e && n.cases[n.cases.length - 1] === t) return -1;
				}),
				this.rightBrace(n);
		}),
		(l.ThrowStatement = function (e) {
			this.word("throw"), ms(this, e.argument);
		}),
		(l.TryStatement = function (e) {
			this.word("try"),
				this.space(),
				this.print(e.block),
				this.space(),
				e.handlers ? this.print(e.handlers[0]) : this.print(e.handler);
			e.finalizer &&
				(this.space(), this.word("finally"), this.space(), this.print(e.finalizer));
		}),
		(l.VariableDeclaration = function (e, t) {
			e.declare && (this.word("declare"), this.space());
			var n = e.kind;
			"await using" === n
				? (this.word("await"), this.space(), this.word("using", !0))
				: this.word(n, "using" === n);
			this.space();
			let r = !1;
			if (!us(t)) for (var i of e.declarations) i.init && (r = !0);
			if (
				(this.printList(
					e.declarations,
					void 0,
					void 0,
					1 < e.declarations.length,
					r
						? function (e) {
								this.token(",", !1, e), this.newline();
							}
						: void 0
				),
				us(t))
			)
				if (cs(t)) {
					if (t.init === e) return;
				} else if (t.left === e) return;
			this.semicolon();
		}),
		(l.VariableDeclarator = function (e) {
			this.print(e.id), e.definite && this.tokenChar(33);
			this.print(e.id.typeAnnotation),
				e.init && (this.space(), this.tokenChar(61), this.space(), this.print(e.init));
		}),
		(l.WhileStatement = function (e) {
			this.word("while"),
				this.space(),
				this.tokenChar(40),
				this.print(e.test),
				this.tokenChar(41),
				this.printBlock(e);
		}),
		(l.WithStatement = function (e) {
			this.word("with"),
				this.space(),
				this.tokenChar(40),
				this.print(e.object),
				this.tokenChar(41),
				this.printBlock(e);
		});
	var ps = i;
	let { isFor: us, isForStatement: cs, isIfStatement: ds, isStatement: fs } = e;
	function ys(e) {
		this.word("for"), this.space();
		var t = "ForOfStatement" === e.type,
			n =
				(t && e.await && (this.word("await"), this.space()),
				this.noIndentInnerCommentsHere(),
				this.tokenChar(40),
				t ? null : this.enterForStatementInit());
		(this.tokenContext |= t ? ps.TokenContext.forOfHead : ps.TokenContext.forInHead),
			this.print(e.left),
			null != n && n(),
			this.space(),
			this.word(t ? "of" : "in"),
			this.space(),
			this.print(e.right),
			this.tokenChar(41),
			this.printBlock(e);
	}
	function ms(e, t) {
		t && (e.space(), e.printTerminatorless(t)), e.semicolon();
	}
	(l.ForInStatement = ys), (l.ForOfStatement = ys);
	o = {};
	Object.defineProperty(o, "__esModule", { value: !0 }),
		(o.ClassAccessorProperty = function (e) {
			this.printJoin(e.decorators);
			var t = null == (t = e.key.loc) || null == (t = t.end) ? void 0 : t.line;
			t && this.catchUp(t);
			this.tsPrintClassMemberModifiers(e),
				this.word("accessor", !0),
				this.space(),
				e.computed
					? (this.tokenChar(91), this.print(e.key), this.tokenChar(93))
					: (this._variance(e), this.print(e.key));
			e.optional && this.tokenChar(63);
			e.definite && this.tokenChar(33);
			this.print(e.typeAnnotation),
				e.value && (this.space(), this.tokenChar(61), this.space(), this.print(e.value));
			this.semicolon();
		}),
		(o.ClassBody = function (e) {
			{
				var t, n;
				this.tokenChar(123),
					0 === e.body.length
						? this.tokenChar(125)
						: (this.newline(),
							(t = ((r, i) => {
								if (!r.tokenMap || null == i.start || null == i.end) return null;
								let a = r.tokenMap.getIndexes(i);
								if (!a) return null;
								let o = 1,
									s = 0,
									l = 0,
									p = () => {
										for (; l < i.body.length && null == i.body[l].start; ) l++;
									};
								return (
									p(),
									e => {
										l <= e && ((l = e + 1), p());
										var t = l === i.body.length ? i.end : i.body[l].start;
										let n;
										for (
											;
											o < a.length &&
											r.tokenMap.matchesOriginal(
												(n = r._tokens[a[o]]),
												";"
											) &&
											n.start < t;

										)
											r.token(";", void 0, s++), o++;
									}
								);
							})(this, e)),
							null != t && t(-1),
							(n = this.enterDelimited()),
							this.printJoin(e.body, !0, !0, t, !0),
							n(),
							this.endsWith(10) || this.newline(),
							this.rightBrace(e));
			}
		}),
		(o.ClassExpression = o.ClassDeclaration =
			function (e, t) {
				var n = Ts(t) || hs(t);
				(n && this._shouldPrintDecoratorsBeforeExport(t)) || this.printJoin(e.decorators);
				e.declare && (this.word("declare"), this.space());
				e.abstract && (this.word("abstract"), this.space());
				this.word("class"), e.id && (this.space(), this.print(e.id));
				this.print(e.typeParameters),
					e.superClass &&
						(this.space(),
						this.word("extends"),
						this.space(),
						this.print(e.superClass),
						this.print(e.superTypeParameters));
				e.implements &&
					(this.space(),
					this.word("implements"),
					this.space(),
					this.printList(e.implements));
				this.space(), this.print(e.body);
			}),
		(o.ClassMethod = function (e) {
			this._classMethodHead(e), this.space(), this.print(e.body);
		}),
		(o.ClassPrivateMethod = function (e) {
			this._classMethodHead(e), this.space(), this.print(e.body);
		}),
		(o.ClassPrivateProperty = function (e) {
			this.printJoin(e.decorators),
				this.tsPrintClassMemberModifiers(e),
				this.print(e.key),
				e.optional && this.tokenChar(63);
			e.definite && this.tokenChar(33);
			this.print(e.typeAnnotation),
				e.value && (this.space(), this.tokenChar(61), this.space(), this.print(e.value));
			this.semicolon();
		}),
		(o.ClassProperty = function (e) {
			{
				var t;
				this.printJoin(e.decorators),
					e.static ||
						this.format.preserveFormat ||
						((t = null == (t = e.key.loc) || null == (t = t.end) ? void 0 : t.line) &&
							this.catchUp(t));
			}
			this.tsPrintClassMemberModifiers(e),
				e.computed
					? (this.tokenChar(91), this.print(e.key), this.tokenChar(93))
					: (this._variance(e), this.print(e.key));
			e.optional && this.tokenChar(63);
			e.definite && this.tokenChar(33);
			this.print(e.typeAnnotation),
				e.value && (this.space(), this.tokenChar(61), this.space(), this.print(e.value));
			this.semicolon();
		}),
		(o.StaticBlock = function (e) {
			this.word("static"),
				this.space(),
				this.tokenChar(123),
				0 === e.body.length
					? this.tokenChar(125)
					: (this.newline(), this.printSequence(e.body, !0), this.rightBrace(e));
		}),
		(o._classMethodHead = function (e) {
			{
				var t;
				this.printJoin(e.decorators),
					this.format.preserveFormat ||
						((t = null == (t = e.key.loc) || null == (t = t.end) ? void 0 : t.line) &&
							this.catchUp(t));
			}
			this.tsPrintClassMemberModifiers(e), this._methodHead(e);
		});
	let { isExportDefaultDeclaration: Ts, isExportNamedDeclaration: hs } = e;
	s = {};
	Object.defineProperty(s, "__esModule", { value: !0 }),
		(s.ArrowFunctionExpression = function (e, t) {
			e.async && (this.word("async", !0), this.space());
			this._shouldPrintArrowParamsParens(e)
				? this._params(e, void 0, t)
				: this.print(e.params[0], !0);
			this._predicate(e, !0),
				this.space(),
				this.printInnerComments(),
				this.token("=>"),
				this.space(),
				(this.tokenContext |= Ss.TokenContext.arrowBody),
				this.print(e.body);
		}),
		(s.FunctionDeclaration = s.FunctionExpression =
			function (e, t) {
				this._functionHead(e, t), this.space(), this.print(e.body);
			}),
		(s._functionHead = function (e, t) {
			e.async &&
				(this.word("async"),
				this.format.preserveFormat || (this._endsWithInnerRaw = !1),
				this.space());
			this.word("function"),
				e.generator &&
					(this.format.preserveFormat || (this._endsWithInnerRaw = !1),
					this.tokenChar(42));
			this.space(), e.id && this.print(e.id);
			this._params(e, e.id, t), "TSDeclareFunction" !== e.type && this._predicate(e);
		}),
		(s._methodHead = function (e) {
			var t = e.kind,
				n = e.key;
			("get" !== t && "set" !== t) || (this.word(t), this.space());
			e.async && (this.word("async", !0), this.space());
			("method" !== t && "init" !== t) || (e.generator && this.tokenChar(42));
			e.computed ? (this.tokenChar(91), this.print(n), this.tokenChar(93)) : this.print(n);
			e.optional && this.tokenChar(63);
			this._params(e, e.computed && "StringLiteral" !== e.key.type ? void 0 : e.key, void 0);
		}),
		(s._param = function (e) {
			this.printJoin(e.decorators), this.print(e), e.optional && this.tokenChar(63);
			this.print(e.typeAnnotation);
		}),
		(s._parameters = function (t, e) {
			var n = this.enterDelimited(),
				r = this.shouldPrintTrailingComma(e),
				i = t.length;
			for (let e = 0; e < i; e++)
				this._param(t[e]), (r || e < i - 1) && (this.token(",", null, e), this.space());
			this.token(e), n();
		}),
		(s._params = function (e, t, n) {
			this.print(e.typeParameters);
			t = function (e, t) {
				let a = e;
				!a &&
					t &&
					("VariableDeclarator" === (e = t.type)
						? (a = t.id)
						: "AssignmentExpression" === e || "AssignmentPattern" === e
							? (a = t.left)
							: "ObjectProperty" === e || "ClassProperty" === e
								? (t.computed && "StringLiteral" !== t.key.type) || (a = t.key)
								: ("ClassPrivateProperty" !== e && "ClassAccessorProperty" !== e) ||
									(a = t.key));
				if (a) {
					let e, t, n, r, i;
					return (
						"Identifier" === a.type
							? (e = {
									pos: null == (t = a.loc) ? void 0 : t.start,
									name:
										(null == (n = a.loc) ? void 0 : n.identifierName) || a.name
								})
							: "PrivateName" === a.type
								? (e = {
										pos: null == (r = a.loc) ? void 0 : r.start,
										name: "#" + a.id.name
									})
								: "StringLiteral" === a.type &&
									(e = {
										pos: null == (i = a.loc) ? void 0 : i.start,
										name: a.value
									}),
						e
					);
				}
			}.call(this, t, n);
			t && this.sourceIdentifierName(t.name, t.pos);
			this.tokenChar(40), this._parameters(e.params, ")");
			n = "ArrowFunctionExpression" === e.type;
			this.print(e.returnType, n), (this._noLineTerminator = n);
		}),
		(s._predicate = function (e, t) {
			e.predicate &&
				(e.returnType || this.tokenChar(58), this.space(), this.print(e.predicate, t));
		}),
		(s._shouldPrintArrowParamsParens = function (e) {
			var t;
			if (1 !== e.params.length) return !0;
			if (e.typeParameters || e.returnType || e.predicate) return !0;
			var n = e.params[0];
			if (
				!bs(n) ||
				n.typeAnnotation ||
				n.optional ||
				(null != (t = n.leadingComments) && t.length) ||
				(null != (t = n.trailingComments) && t.length)
			)
				return !0;
			if (this.tokenMap)
				return (
					null == e.loc ||
					null !== this.tokenMap.findMatching(e, "(") ||
					null == (null == (n = this.tokenMap.findMatching(e, "=>")) ? void 0 : n.loc) ||
					n.loc.start.line !== e.loc.start.line
				);
			return !!this.format.retainLines;
		});
	var Ss = i;
	let bs = e.isIdentifier;
	c = {};
	Object.defineProperty(c, "__esModule", { value: !0 }),
		(c.ExportAllDeclaration = function (e) {
			var t;
			this.word("export"),
				this.space(),
				"type" === e.exportKind && (this.word("type"), this.space());
			this.tokenChar(42),
				this.space(),
				this.word("from"),
				this.space(),
				(null != (t = e.attributes) && t.length) || (null != (t = e.assertions) && t.length)
					? (this.print(e.source, !0), this.space(), this._printAttributes(e, !1))
					: this.print(e.source);
			this.semicolon();
		}),
		(c.ExportDefaultDeclaration = function (e) {
			Is(this, e),
				this.word("export"),
				this.noIndentInnerCommentsHere(),
				this.space(),
				this.word("default"),
				this.space(),
				(this.tokenContext |= Es.TokenContext.exportDefault);
			e = e.declaration;
			this.print(e), Os(e) || this.semicolon();
		}),
		(c.ExportDefaultSpecifier = function (e) {
			this.print(e.exported);
		}),
		(c.ExportNamedDeclaration = function (i) {
			if ((Is(this, i), this.word("export"), this.space(), i.declaration)) {
				var e = i.declaration;
				this.print(e), Os(e) || this.semicolon();
			} else {
				"type" === i.exportKind && (this.word("type"), this.space());
				var a = i.specifiers.slice(0);
				let e = !1;
				for (;;) {
					var o = a[0];
					if (!gs(o) && !Ps(o)) break;
					(e = !0), this.print(a.shift()), a.length && (this.tokenChar(44), this.space());
				}
				let t = !1,
					n,
					r;
				(!a.length && (a.length, e)) ||
					((t = !0),
					this.tokenChar(123),
					a.length &&
						(this.space(),
						this.printList(a, this.shouldPrintTrailingComma("}")),
						this.space()),
					this.tokenChar(125)),
					i.source &&
						(this.space(),
						this.word("from"),
						this.space(),
						(null != (n = i.attributes) && n.length) ||
						(null != (r = i.assertions) && r.length)
							? (this.print(i.source, !0), this.space(), this._printAttributes(i, t))
							: this.print(i.source)),
					this.semicolon();
			}
		}),
		(c.ExportNamespaceSpecifier = function (e) {
			this.tokenChar(42), this.space(), this.word("as"), this.space(), this.print(e.exported);
		}),
		(c.ExportSpecifier = function (e) {
			"type" === e.exportKind && (this.word("type"), this.space());
			this.print(e.local),
				e.exported &&
					e.local.name !== e.exported.name &&
					(this.space(), this.word("as"), this.space(), this.print(e.exported));
		}),
		(c.ImportAttribute = function (e) {
			this.print(e.key), this.tokenChar(58), this.space(), this.print(e.value);
		}),
		(c.ImportDeclaration = function (e) {
			this.word("import"), this.space();
			var t = "type" === e.importKind || "typeof" === e.importKind;
			t
				? (this.noIndentInnerCommentsHere(), this.word(e.importKind), this.space())
				: e.module
					? (this.noIndentInnerCommentsHere(), this.word("module"), this.space())
					: e.phase &&
						(this.noIndentInnerCommentsHere(), this.word(e.phase), this.space());
			var n = e.specifiers.slice(0),
				r = !!n.length;
			for (; r; ) {
				var i = n[0];
				if (!xs(i) && !As(i)) break;
				this.print(n.shift()), n.length && (this.tokenChar(44), this.space());
			}
			let a = !1;
			n.length
				? ((a = !0),
					this.tokenChar(123),
					this.space(),
					this.printList(n, this.shouldPrintTrailingComma("}")),
					this.space(),
					this.tokenChar(125))
				: t && !r && ((a = !0), this.tokenChar(123), this.tokenChar(125));
			(r || t) && (this.space(), this.word("from"), this.space());
			(null != (t = e.attributes) && t.length) || (null != (t = e.assertions) && t.length)
				? (this.print(e.source, !0), this.space(), this._printAttributes(e, a))
				: this.print(e.source);
			this.semicolon();
		}),
		(c.ImportDefaultSpecifier = function (e) {
			this.print(e.local);
		}),
		(c.ImportExpression = function (e) {
			this.word("import"), e.phase && (this.tokenChar(46), this.word(e.phase));
			this.tokenChar(40),
				this.print(e.source),
				null != e.options && (this.tokenChar(44), this.space(), this.print(e.options));
			this.tokenChar(41);
		}),
		(c.ImportNamespaceSpecifier = function (e) {
			this.tokenChar(42), this.space(), this.word("as"), this.space(), this.print(e.local);
		}),
		(c.ImportSpecifier = function (e) {
			("type" !== e.importKind && "typeof" !== e.importKind) ||
				(this.word(e.importKind), this.space());
			this.print(e.imported),
				e.local &&
					e.local.name !== e.imported.name &&
					(this.space(), this.word("as"), this.space(), this.print(e.local));
		}),
		(c._printAttributes = function (e, t) {
			var n = this.format.importAttributesKeyword,
				{ attributes: e, assertions: r } = e;
			!e ||
				n ||
				_s ||
				((_s = !0),
				console.warn(
					'You are using import attributes, without specifying the desired output syntax.\nPlease specify the "importAttributesKeyword" generator option, whose value can be one of:\n - "with"        : `import { a } from "b" with { type: "json" };`\n - "assert"      : `import { a } from "b" assert { type: "json" };`\n - "with-legacy" : `import { a } from "b" with type: "json";`\n'
				));
			var i = "assert" === n || (!n && r);
			this.word(i ? "assert" : "with"),
				this.space(),
				i || "with" === n
					? (this.token("{", null, (i = t ? 1 : 0)),
						this.space(),
						this.printList(e || r, this.shouldPrintTrailingComma("}")),
						this.space(),
						this.token("}", null, i))
					: this.printList(e || r);
		});
	var Es = i;
	let {
		isClassDeclaration: vs,
		isExportDefaultSpecifier: gs,
		isExportNamespaceSpecifier: Ps,
		isImportDefaultSpecifier: xs,
		isImportNamespaceSpecifier: As,
		isStatement: Os
	} = e;
	let _s = !1;
	function Is(e, t) {
		vs(t.declaration) &&
			e._shouldPrintDecoratorsBeforeExport(t) &&
			e.printJoin(t.declaration.decorators);
	}
	(I = {}), (Xn = {});
	let Cs = Xn.hasOwnProperty,
		Ds = (e, t) => {
			for (var n in e) Cs.call(e, n) && t(n, e[n]);
		},
		Ns = e => "\\u" + ("0000" + e).slice(-4),
		ws = (e, t) => {
			e = e.toString(16);
			return t ? e : e.toUpperCase();
		},
		js = Xn.toString,
		ks = Array.isArray,
		Ls = e => "bigint" == typeof e,
		Ms = { "\\": "\\\\", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t" },
		Bs = /[\\\b\f\n\r\t]/,
		Fs = /[0-9]/,
		Rs = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
		Ks = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g,
		Ys = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g,
		Vs = (n, l) => {
			var r,
				e = () => {
					(o = a), ++l.indentLevel, (a = l.indent.repeat(l.indentLevel));
				},
				t = {
					escapeEverything: !1,
					minimal: !1,
					isScriptContext: !1,
					quotes: "single",
					wrap: !1,
					es6: !1,
					json: !1,
					compact: !0,
					lowercaseHex: !1,
					numbers: "decimal",
					indent: "\t",
					indentLevel: 0,
					__inline1__: !1,
					__inline2__: !1
				};
			let p = l && l.json,
				u =
					(p && ((t.quotes = "double"), (t.wrap = !0)),
					(r = t),
					(t = l) &&
						Ds(t, (e, t) => {
							r[e] = t;
						}),
					"single" != (l = r).quotes &&
						"double" != l.quotes &&
						"backtick" != l.quotes &&
						(l.quotes = "single"),
					"double" == l.quotes ? '"' : "backtick" == l.quotes ? "`" : "'"),
				i = l.compact,
				c = l.lowercaseHex,
				a = l.indent.repeat(l.indentLevel),
				o = "";
			t = l.__inline1__;
			let s = l.__inline2__;
			var d = i ? "" : "\n";
			let f,
				y = !0;
			var m = "binary" == l.numbers,
				T = "octal" == l.numbers,
				h = "decimal" == l.numbers,
				S = "hexadecimal" == l.numbers;
			if (
				(p && n && "function" == typeof n.toJSON && (n = n.toJSON()),
				"string" != typeof (b = n) && "[object String]" != js.call(b))
			) {
				if (((b = n), "[object Map]" == js.call(b)))
					return 0 == n.size
						? "new Map()"
						: (i || ((l.__inline1__ = !0), (l.__inline2__ = !1)),
							"new Map(" + Vs(Array.from(n), l) + ")");
				if (((b = n), "[object Set]" == js.call(b)))
					return 0 == n.size ? "new Set()" : "new Set(" + Vs(Array.from(n), l) + ")";
				if (((b = n), "function" == typeof Buffer && Buffer.isBuffer(b)))
					return 0 == n.length
						? "Buffer.from([])"
						: "Buffer.from(" + Vs(Array.from(n), l) + ")";
				if (ks(n))
					return (
						(f = []),
						(l.wrap = !0),
						t && ((l.__inline1__ = !1), (l.__inline2__ = !0)),
						s || e(),
						((e, t) => {
							var n = e.length;
							let r = -1;
							for (; ++r < n; ) t(e[r]);
						})(n, e => {
							(y = !1),
								s && (l.__inline2__ = !1),
								f.push((i || s ? "" : a) + Vs(e, l));
						}),
						y
							? "[]"
							: s
								? "[" + f.join(", ") + "]"
								: "[" + d + f.join("," + d) + d + (i ? "" : o) + "]"
					);
				if ("number" == typeof (b = n) || "[object Number]" == js.call(b) || Ls(n)) {
					if (p) return JSON.stringify(Number(n));
					let t;
					if (h) t = String(n);
					else if (S) {
						let e = n.toString(16);
						c || (e = e.toUpperCase()), (t = "0x" + e);
					} else m ? (t = "0b" + n.toString(2)) : T && (t = "0o" + n.toString(8));
					return Ls(n) ? t + "n" : t;
				}
				return Ls(n)
					? p
						? JSON.stringify(Number(n))
						: n + "n"
					: ((t = n),
						"[object Object]" != js.call(t)
							? p
								? JSON.stringify(n) || "null"
								: String(n)
							: ((f = []),
								(l.wrap = !0),
								e(),
								Ds(n, (e, t) => {
									(y = !1),
										f.push(
											(i ? "" : a) +
												Vs(e, l) +
												":" +
												(i ? "" : " ") +
												Vs(t, l)
										);
								}),
								y ? "{}" : "{" + d + f.join("," + d) + d + (i ? "" : o) + "}"));
			}
			var b = l.escapeEverything ? Ks : Ys;
			return (
				(f = n.replace(b, (e, t, n, r, i, a) => {
					var o, s;
					return t
						? l.minimal
							? t
							: ((o = t.charCodeAt(0)),
								(t = t.charCodeAt(1)),
								l.es6
									? ((s = 1024 * (o - 55296) + t - 56320 + 65536),
										"\\u{" + ws(s, c) + "}")
									: Ns(ws(o, c)) + Ns(ws(t, c)))
						: n
							? Ns(ws(n.charCodeAt(0), c))
							: "\0" != e || p || Fs.test(a.charAt(i + 1))
								? r
									? r == u || l.escapeEverything
										? "\\" + r
										: r
									: Bs.test(e)
										? Ms[e]
										: l.minimal && !Rs.test(e)
											? e
											: ((s = ws(e.charCodeAt(0), c)),
												p || 2 < s.length
													? Ns(s)
													: "\\x" + ("00" + s).slice(-2))
								: "\\0";
				})),
				"`" == u && (f = f.replace(/\$\{/g, "\\${")),
				l.isScriptContext &&
					(f = f
						.replace(/<\/(script|style)/gi, "<\\/$1")
						.replace(/<!--/g, p ? "\\u003C!--" : "\\x3C!--")),
				(f = l.wrap ? u + f + u : f)
			);
		};
	Vs.version = "3.0.2";
	Un = Vs;
	Object.defineProperty(I, "__esModule", { value: !0 }),
		(I.ArgumentPlaceholder = function () {
			this.tokenChar(63);
		}),
		(I.ArrayPattern = I.ArrayExpression =
			function (e) {
				var t = e.elements,
					n = t.length,
					e = (this.tokenChar(91), this.enterDelimited());
				for (let e = 0; e < t.length; e++) {
					var r = t[e];
					(!r ||
						(0 < e && this.space(), this.print(r), e < n - 1) ||
						this.shouldPrintTrailingComma("]")) &&
						this.token(",", !1, e);
				}
				e(), this.tokenChar(93);
			}),
		(I.BigIntLiteral = function (e) {
			var t = this.getPossibleRaw(e);
			this.format.minified || void 0 === t ? this.word(e.value + "n") : this.word(t);
		}),
		(I.BooleanLiteral = function (e) {
			this.word(e.value ? "true" : "false");
		}),
		(I.Identifier = function (e) {
			var t;
			this.sourceIdentifierName((null == (t = e.loc) ? void 0 : t.identifierName) || e.name),
				this.word(this.tokenMap ? this._getRawIdentifier(e) : e.name);
		}),
		(I.NullLiteral = function () {
			this.word("null");
		}),
		(I.NumericLiteral = function (e) {
			var t = this.getPossibleRaw(e),
				n = this.format.jsescOption,
				e = e.value,
				r = e + "";
			n.numbers
				? this.number(Js(e, n), e)
				: null == t
					? this.number(r, e)
					: this.format.minified
						? this.number(t.length < r.length ? t : r, e)
						: this.number(t, e);
		}),
		(I.ObjectPattern = I.ObjectExpression =
			function (e) {
				var t = e.properties;
				{
					var n;
					this.tokenChar(123),
						t.length &&
							((n = this.enterDelimited()),
							this.space(),
							this.printList(t, this.shouldPrintTrailingComma("}"), !0, !0),
							this.space(),
							n());
				}
				this.sourceWithOffset("end", e.loc, -1), this.tokenChar(125);
			}),
		(I.ObjectMethod = function (e) {
			this.printJoin(e.decorators), this._methodHead(e), this.space(), this.print(e.body);
		}),
		(I.ObjectProperty = function (e) {
			if ((this.printJoin(e.decorators), e.computed))
				this.tokenChar(91), this.print(e.key), this.tokenChar(93);
			else {
				if (Xs(e.value) && qs(e.key) && e.key.name === e.value.left.name)
					return void this.print(e.value);
				if (
					(this.print(e.key),
					e.shorthand && qs(e.key) && qs(e.value) && e.key.name === e.value.name)
				)
					return;
			}
			this.tokenChar(58), this.space(), this.print(e.value);
		}),
		(I.PipelineBareFunction = function (e) {
			this.print(e.callee);
		}),
		(I.PipelinePrimaryTopicReference = function () {
			this.tokenChar(35);
		}),
		(I.PipelineTopicExpression = function (e) {
			this.print(e.expression);
		}),
		(I.RecordExpression = function (e) {
			let t = e.properties,
				n,
				r;
			if ("bar" === this.format.recordAndTupleSyntaxType) (n = "{|"), (r = "|}");
			else {
				if (
					"hash" !== this.format.recordAndTupleSyntaxType &&
					null != this.format.recordAndTupleSyntaxType
				)
					throw new Error(
						`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`
					);
				(n = "#{"), (r = "}");
			}
			this.token(n),
				t.length &&
					(this.space(),
					this.printList(t, this.shouldPrintTrailingComma(r), !0, !0),
					this.space());
			this.token(r);
		}),
		(I.RegExpLiteral = function (e) {
			this.word(`/${e.pattern}/` + e.flags);
		}),
		(I.SpreadElement = I.RestElement =
			function (e) {
				this.token("..."), this.print(e.argument);
			}),
		(I.StringLiteral = function (e) {
			var t = this.getPossibleRaw(e);
			this.format.minified || void 0 === t
				? ((e = Js(e.value, this.format.jsescOption)), this.token(e))
				: this.token(t);
		}),
		(I.TopicReference = function () {
			var e = this.format.topicToken;
			{
				var t, n;
				if (!Gs.has(e))
					throw (
						((t = JSON.stringify(e)),
						(n = Array.from(Gs, e => JSON.stringify(e))),
						new Error(
							`The "topicToken" generator option must be one of ${n.join(", ")} (${t} received instead).`
						))
					);
				this.token(e);
			}
		}),
		(I.TupleExpression = function (e) {
			let t = e.elements,
				n = t.length,
				r,
				i;
			if ("bar" === this.format.recordAndTupleSyntaxType) (r = "[|"), (i = "|]");
			else {
				if ("hash" !== this.format.recordAndTupleSyntaxType)
					throw new Error(
						this.format.recordAndTupleSyntaxType +
							" is not a valid recordAndTuple syntax type"
					);
				(r = "#["), (i = "]");
			}
			this.token(r);
			for (let e = 0; e < t.length; e++) {
				var a = t[e];
				a &&
					(0 < e && this.space(),
					this.print(a),
					e < n - 1 || this.shouldPrintTrailingComma(i)) &&
					this.token(",", !1, e);
			}
			this.token(i);
		}),
		(I._getRawIdentifier = function (e) {
			if (e === Us) return Ws;
			let t = (Us = e).name,
				n = this.tokenMap.find(e, e => e.value === t);
			if (n) return (Ws = this._originalCode.slice(n.start, n.end));
			return (Ws = e.name);
		});
	var Js = Un;
	let { isAssignmentPattern: Xs, isIdentifier: qs } = e,
		Us = null,
		Ws = "";
	let Gs = new Set(["^^", "@@", "^", "%", "#"]);
	Gn = {};
	{
		(C = Gn),
			Object.defineProperty(C, "__esModule", { value: !0 }),
			(C.AnyTypeAnnotation = function () {
				this.word("any");
			}),
			(C.ArrayTypeAnnotation = function (e) {
				this.print(e.elementType, !0), this.tokenChar(91), this.tokenChar(93);
			}),
			(C.BooleanLiteralTypeAnnotation = function (e) {
				this.word(e.value ? "true" : "false");
			}),
			(C.BooleanTypeAnnotation = function () {
				this.word("boolean");
			}),
			(C.DeclareClass = function (e, t) {
				n(t) || (this.word("declare"), this.space());
				this.word("class"), this.space(), this._interfaceish(e);
			}),
			(C.DeclareExportAllDeclaration = function (e) {
				this.word("declare"), this.space(), zs.ExportAllDeclaration.call(this, e);
			}),
			(C.DeclareExportDeclaration = function (e) {
				this.word("declare"),
					this.space(),
					this.word("export"),
					this.space(),
					e.default && (this.word("default"), this.space());
				!function (e) {
					{
						var t;
						e.declaration
							? ((t = e.declaration), this.print(t), r(t) || this.semicolon())
							: (this.tokenChar(123),
								e.specifiers.length &&
									(this.space(), this.printList(e.specifiers), this.space()),
								this.tokenChar(125),
								e.source &&
									(this.space(),
									this.word("from"),
									this.space(),
									this.print(e.source)),
								this.semicolon());
					}
				}.call(this, e);
			}),
			(C.DeclareFunction = function (e, t) {
				n(t) || (this.word("declare"), this.space());
				this.word("function"),
					this.space(),
					this.print(e.id),
					this.print(e.id.typeAnnotation.typeAnnotation),
					e.predicate && (this.space(), this.print(e.predicate));
				this.semicolon();
			}),
			(C.DeclareInterface = function (e) {
				this.word("declare"), this.space(), this.InterfaceDeclaration(e);
			}),
			(C.DeclareModule = function (e) {
				this.word("declare"),
					this.space(),
					this.word("module"),
					this.space(),
					this.print(e.id),
					this.space(),
					this.print(e.body);
			}),
			(C.DeclareModuleExports = function (e) {
				this.word("declare"),
					this.space(),
					this.word("module"),
					this.tokenChar(46),
					this.word("exports"),
					this.print(e.typeAnnotation);
			}),
			(C.DeclareOpaqueType = function (e, t) {
				n(t) || (this.word("declare"), this.space());
				this.OpaqueType(e);
			}),
			(C.DeclareTypeAlias = function (e) {
				this.word("declare"), this.space(), this.TypeAlias(e);
			}),
			(C.DeclareVariable = function (e, t) {
				n(t) || (this.word("declare"), this.space());
				this.word("var"),
					this.space(),
					this.print(e.id),
					this.print(e.id.typeAnnotation),
					this.semicolon();
			}),
			(C.DeclaredPredicate = function (e) {
				this.tokenChar(37),
					this.word("checks"),
					this.tokenChar(40),
					this.print(e.value),
					this.tokenChar(41);
			}),
			(C.EmptyTypeAnnotation = function () {
				this.word("empty");
			}),
			(C.EnumBooleanBody = function (e) {
				var t = e.explicitType;
				Qs(this, "boolean", t), Zs(this, e);
			}),
			(C.EnumBooleanMember = function (e) {
				el(this, e);
			}),
			(C.EnumDeclaration = function (e) {
				var { id: e, body: t } = e;
				this.word("enum"), this.space(), this.print(e), this.print(t);
			}),
			(C.EnumDefaultedMember = function (e) {
				e = e.id;
				this.print(e), this.tokenChar(44);
			}),
			(C.EnumNumberBody = function (e) {
				var t = e.explicitType;
				Qs(this, "number", t), Zs(this, e);
			}),
			(C.EnumNumberMember = function (e) {
				el(this, e);
			}),
			(C.EnumStringBody = function (e) {
				var t = e.explicitType;
				Qs(this, "string", t), Zs(this, e);
			}),
			(C.EnumStringMember = function (e) {
				el(this, e);
			}),
			(C.EnumSymbolBody = function (e) {
				Qs(this, "symbol", !0), Zs(this, e);
			}),
			(C.ExistsTypeAnnotation = function () {
				this.tokenChar(42);
			}),
			(C.FunctionTypeAnnotation = function (e, t) {
				this.print(e.typeParameters),
					this.tokenChar(40),
					e.this &&
						(this.word("this"),
						this.tokenChar(58),
						this.space(),
						this.print(e.this.typeAnnotation),
						e.params.length || e.rest) &&
						(this.tokenChar(44), this.space());
				this.printList(e.params),
					e.rest &&
						(e.params.length && (this.tokenChar(44), this.space()),
						this.token("..."),
						this.print(e.rest));
				this.tokenChar(41);
				var n = null == t ? void 0 : t.type;
				null != n &&
				("ObjectTypeCallProperty" === n ||
					"ObjectTypeInternalSlot" === n ||
					"DeclareFunction" === n ||
					("ObjectTypeProperty" === n && t.method))
					? this.tokenChar(58)
					: (this.space(), this.token("=>"));
				this.space(), this.print(e.returnType);
			}),
			(C.FunctionTypeParam = function (e) {
				this.print(e.name), e.optional && this.tokenChar(63);
				e.name && (this.tokenChar(58), this.space());
				this.print(e.typeAnnotation);
			}),
			(C.IndexedAccessType = function (e) {
				this.print(e.objectType, !0),
					this.tokenChar(91),
					this.print(e.indexType),
					this.tokenChar(93);
			}),
			(C.InferredPredicate = function () {
				this.tokenChar(37), this.word("checks");
			}),
			(C.InterfaceDeclaration = function (e) {
				this.word("interface"), this.space(), this._interfaceish(e);
			}),
			(C.GenericTypeAnnotation =
				C.ClassImplements =
				C.InterfaceExtends =
					function (e) {
						this.print(e.id), this.print(e.typeParameters, !0);
					}),
			(C.InterfaceTypeAnnotation = function (e) {
				var t;
				this.word("interface"),
					null != (t = e.extends) &&
						t.length &&
						(this.space(),
						this.word("extends"),
						this.space(),
						this.printList(e.extends));
				this.space(), this.print(e.body);
			}),
			(C.IntersectionTypeAnnotation = function (e) {
				this.printJoin(e.types, void 0, void 0, tl);
			}),
			(C.MixedTypeAnnotation = function () {
				this.word("mixed");
			}),
			(C.NullLiteralTypeAnnotation = function () {
				this.word("null");
			}),
			(C.NullableTypeAnnotation = function (e) {
				this.tokenChar(63), this.print(e.typeAnnotation);
			}),
			Object.defineProperty(C, "NumberLiteralTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return $s.NumericLiteral;
				}
			}),
			(C.NumberTypeAnnotation = function () {
				this.word("number");
			}),
			(C.ObjectTypeAnnotation = function (e) {
				e.exact ? this.token("{|") : this.tokenChar(123);
				let t = [
					...e.properties,
					...(e.callProperties || []),
					...(e.indexers || []),
					...(e.internalSlots || [])
				];
				t.length &&
					(this.newline(),
					this.space(),
					this.printJoin(
						t,
						!0,
						!0,
						void 0,
						void 0,
						function (e) {
							if (e && !t[0]) return 1;
						},
						() => {
							(1 === t.length && !e.inexact) || (this.tokenChar(44), this.space());
						}
					),
					this.space());
				e.inexact &&
					(this.indent(), this.token("..."), t.length && this.newline(), this.dedent());
				e.exact ? this.token("|}") : this.tokenChar(125);
			}),
			(C.ObjectTypeCallProperty = function (e) {
				e.static && (this.word("static"), this.space());
				this.print(e.value);
			}),
			(C.ObjectTypeIndexer = function (e) {
				e.static && (this.word("static"), this.space());
				this._variance(e),
					this.tokenChar(91),
					e.id && (this.print(e.id), this.tokenChar(58), this.space());
				this.print(e.key),
					this.tokenChar(93),
					this.tokenChar(58),
					this.space(),
					this.print(e.value);
			}),
			(C.ObjectTypeInternalSlot = function (e) {
				e.static && (this.word("static"), this.space());
				this.tokenChar(91),
					this.tokenChar(91),
					this.print(e.id),
					this.tokenChar(93),
					this.tokenChar(93),
					e.optional && this.tokenChar(63);
				e.method || (this.tokenChar(58), this.space());
				this.print(e.value);
			}),
			(C.ObjectTypeProperty = function (e) {
				e.proto && (this.word("proto"), this.space());
				e.static && (this.word("static"), this.space());
				("get" !== e.kind && "set" !== e.kind) || (this.word(e.kind), this.space());
				this._variance(e), this.print(e.key), e.optional && this.tokenChar(63);
				e.method || (this.tokenChar(58), this.space());
				this.print(e.value);
			}),
			(C.ObjectTypeSpreadProperty = function (e) {
				this.token("..."), this.print(e.argument);
			}),
			(C.OpaqueType = function (e) {
				this.word("opaque"),
					this.space(),
					this.word("type"),
					this.space(),
					this.print(e.id),
					this.print(e.typeParameters),
					e.supertype && (this.tokenChar(58), this.space(), this.print(e.supertype));
				e.impltype &&
					(this.space(), this.tokenChar(61), this.space(), this.print(e.impltype));
				this.semicolon();
			}),
			(C.OptionalIndexedAccessType = function (e) {
				this.print(e.objectType), e.optional && this.token("?.");
				this.tokenChar(91), this.print(e.indexType), this.tokenChar(93);
			}),
			(C.QualifiedTypeIdentifier = function (e) {
				this.print(e.qualification), this.tokenChar(46), this.print(e.id);
			}),
			Object.defineProperty(C, "StringLiteralTypeAnnotation", {
				enumerable: !0,
				get: function () {
					return $s.StringLiteral;
				}
			}),
			(C.StringTypeAnnotation = function () {
				this.word("string");
			}),
			(C.SymbolTypeAnnotation = function () {
				this.word("symbol");
			}),
			(C.ThisTypeAnnotation = function () {
				this.word("this");
			}),
			(C.TupleTypeAnnotation = function (e) {
				this.tokenChar(91), this.printList(e.types), this.tokenChar(93);
			}),
			(C.TypeAlias = function (e) {
				this.word("type"),
					this.space(),
					this.print(e.id),
					this.print(e.typeParameters),
					this.space(),
					this.tokenChar(61),
					this.space(),
					this.print(e.right),
					this.semicolon();
			}),
			(C.TypeAnnotation = function (e, t) {
				this.tokenChar(58),
					this.space(),
					"ArrowFunctionExpression" === t.type
						? (this.tokenContext |= Hs.TokenContext.arrowFlowReturnType)
						: e.optional && this.tokenChar(63);
				this.print(e.typeAnnotation);
			}),
			(C.TypeCastExpression = function (e) {
				this.tokenChar(40),
					this.print(e.expression),
					this.print(e.typeAnnotation),
					this.tokenChar(41);
			}),
			(C.TypeParameter = function (e) {
				this._variance(e), this.word(e.name), e.bound && this.print(e.bound);
				e.default &&
					(this.space(), this.tokenChar(61), this.space(), this.print(e.default));
			}),
			(C.TypeParameterDeclaration = C.TypeParameterInstantiation =
				function (e) {
					this.tokenChar(60), this.printList(e.params), this.tokenChar(62);
				}),
			(C.TypeofTypeAnnotation = function (e) {
				this.word("typeof"), this.space(), this.print(e.argument);
			}),
			(C.UnionTypeAnnotation = function (e) {
				this.printJoin(e.types, void 0, void 0, nl);
			}),
			(C.Variance = function (e) {
				"plus" === e.kind ? this.tokenChar(43) : this.tokenChar(45);
			}),
			(C.VoidTypeAnnotation = function () {
				this.word("void");
			}),
			(C._interfaceish = function (e) {
				var t;
				this.print(e.id),
					this.print(e.typeParameters),
					null != (t = e.extends) &&
						t.length &&
						(this.space(),
						this.word("extends"),
						this.space(),
						this.printList(e.extends));
				"DeclareClass" === e.type &&
					(null != (t = e.mixins) &&
						t.length &&
						(this.space(), this.word("mixins"), this.space(), this.printList(e.mixins)),
					null != (t = e.implements)) &&
					t.length &&
					(this.space(),
					this.word("implements"),
					this.space(),
					this.printList(e.implements));
				this.space(), this.print(e.body);
			}),
			(C._variance = function (e) {
				e = null == (e = e.variance) ? void 0 : e.kind;
				null != e &&
					("plus" === e ? this.tokenChar(43) : "minus" === e && this.tokenChar(45));
			});
		var zs = c,
			Hs = i,
			$s = I;
		let { isDeclareExportDeclaration: n, isStatement: r } = e;
		function Qs(e, t, n) {
			n && (e.space(), e.word("of"), e.space(), e.word(t)), e.space();
		}
		function Zs(e, t) {
			var n,
				r = t.members;
			e.token("{"), e.indent(), e.newline();
			for (n of r) e.print(n), e.newline();
			t.hasUnknownMembers && (e.token("..."), e.newline()), e.dedent(), e.token("}");
		}
		function el(e, t) {
			e.print(t.id), e.space(), e.token("="), e.space(), e.print(t.init), e.token(",");
		}
		function tl(e) {
			this.space(), this.token("&", !1, e), this.space();
		}
		function nl(e) {
			this.space(), this.token("|", !1, e), this.space();
		}
	}
	Hn = {};
	Object.defineProperty(Hn, "__esModule", { value: !0 }),
		(Hn.BlockStatement = function (e) {
			this.tokenChar(123);
			var t = this.enterDelimited(),
				n = null == (n = e.directives) ? void 0 : n.length;
			{
				var r;
				n &&
					((r = e.body.length ? 2 : 1),
					this.printSequence(e.directives, !0, r),
					(null != (n = e.directives[n - 1].trailingComments) && n.length) ||
						this.newline(r));
			}
			this.printSequence(e.body, !0), t(), this.rightBrace(e);
		}),
		(Hn.Directive = function (e) {
			this.print(e.value), this.semicolon();
		}),
		(Hn.DirectiveLiteral = function (e) {
			var t = this.getPossibleRaw(e);
			if (this.format.minified || void 0 === t) {
				e = e.value;
				if (il.test(e)) {
					if (rl.test(e))
						throw new Error(
							"Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes."
						);
					this.token(`'${e}'`);
				} else this.token(`"${e}"`);
			} else this.token(t);
		}),
		(Hn.File = function (e) {
			e.program && this.print(e.program.interpreter);
			this.print(e.program);
		}),
		(Hn.InterpreterDirective = function (e) {
			this.token("#!" + e.value), this.newline(1, !0);
		}),
		(Hn.Placeholder = function (e) {
			this.token("%%"),
				this.print(e.name),
				this.token("%%"),
				"Statement" === e.expectedNode && this.semicolon();
		}),
		(Hn.Program = function (e) {
			this.noIndentInnerCommentsHere(), this.printInnerComments();
			var t = null == (t = e.directives) ? void 0 : t.length;
			{
				var n;
				t &&
					((n = e.body.length ? 2 : 1),
					this.printSequence(e.directives, void 0, n),
					(null != (t = e.directives[t - 1].trailingComments) && t.length) ||
						this.newline(n));
			}
			this.printSequence(e.body);
		});
	let rl = /(?:^|[^\\])(?:\\\\)*'/,
		il = /(?:^|[^\\])(?:\\\\)*"/;
	D = {};
	function al() {
		this.space();
	}
	Object.defineProperty(D, "__esModule", { value: !0 }),
		(D.JSXAttribute = function (e) {
			this.print(e.name), e.value && (this.tokenChar(61), this.print(e.value));
		}),
		(D.JSXClosingElement = function (e) {
			this.tokenChar(60), this.tokenChar(47), this.print(e.name), this.tokenChar(62);
		}),
		(D.JSXClosingFragment = function () {
			this.token("</"), this.tokenChar(62);
		}),
		(D.JSXElement = function (e) {
			var t = e.openingElement;
			if ((this.print(t), !t.selfClosing)) {
				this.indent();
				for (var n of e.children) this.print(n);
				this.dedent(), this.print(e.closingElement);
			}
		}),
		(D.JSXEmptyExpression = function () {
			this.printInnerComments();
		}),
		(D.JSXExpressionContainer = function (e) {
			this.tokenChar(123), this.print(e.expression), this.rightBrace(e);
		}),
		(D.JSXFragment = function (e) {
			this.print(e.openingFragment), this.indent();
			for (var t of e.children) this.print(t);
			this.dedent(), this.print(e.closingFragment);
		}),
		(D.JSXIdentifier = function (e) {
			this.word(e.name);
		}),
		(D.JSXMemberExpression = function (e) {
			this.print(e.object), this.tokenChar(46), this.print(e.property);
		}),
		(D.JSXNamespacedName = function (e) {
			this.print(e.namespace), this.tokenChar(58), this.print(e.name);
		}),
		(D.JSXOpeningElement = function (e) {
			this.tokenChar(60), this.print(e.name), e.typeArguments && this.print(e.typeArguments);
			this.print(e.typeParameters),
				0 < e.attributes.length &&
					(this.space(), this.printJoin(e.attributes, void 0, void 0, al));
			e.selfClosing && (this.space(), this.tokenChar(47));
			this.tokenChar(62);
		}),
		(D.JSXOpeningFragment = function () {
			this.tokenChar(60), this.tokenChar(62);
		}),
		(D.JSXSpreadAttribute = function (e) {
			this.tokenChar(123), this.token("..."), this.print(e.argument), this.rightBrace(e);
		}),
		(D.JSXSpreadChild = function (e) {
			this.tokenChar(123), this.token("..."), this.print(e.expression), this.rightBrace(e);
		}),
		(D.JSXText = function (e) {
			var t = this.getPossibleRaw(e);
			void 0 !== t ? this.token(t, !0) : this.token(e.value, !0);
		});
	var L,
		ol,
		sl,
		ll,
		pl,
		ul,
		cl,
		dl,
		fl,
		yl,
		ml,
		Tl,
		N = {};
	function hl(e, t) {
		e.tokenMap && t.start && t.end
			? e.tokenMap.endMatches(t, ",")
				? e.token(",")
				: e.tokenMap.endMatches(t, ";") && e.semicolon()
			: e.semicolon();
	}
	function Sl(e, t, n) {
		let r,
			i = 0;
		null != (r = e.tokenMap) && r.startMatches(t, n) && ((i = 1), e.token(n)),
			e.printJoin(t.types, void 0, void 0, function (e) {
				this.space(), this.token(n, null, e + i), this.space();
			});
	}
	function bl(e, t) {
		!0 !== t && e.token(t);
	}
	function El(t) {
		vl(this, t, () => {
			var e;
			return this.printList(
				t.members,
				null == (e = this.shouldPrintTrailingComma("}")) || e,
				!0,
				!0
			);
		});
	}
	function vl(e, t, n) {
		e.token("{");
		var r = e.enterDelimited();
		n(), r(), e.rightBrace(t);
	}
	function gl(t, e, n) {
		let r,
			i = new Set();
		for (var a of n) a && i.add(a);
		null != (r = t.tokenMap) &&
			r.find(e, e => {
				if (i.has(e.value))
					return t.token(e.value), t.space(), i.delete(e.value), 0 === i.size;
			});
		for (var o of i) t.word(o), t.space();
	}
	Object.defineProperty(N, "__esModule", { value: !0 }),
		(N.TSAnyKeyword = function () {
			this.word("any");
		}),
		(N.TSArrayType = function (e) {
			this.print(e.elementType, !0), this.tokenChar(91), this.tokenChar(93);
		}),
		(N.TSSatisfiesExpression = N.TSAsExpression =
			function (e) {
				var { type: e, expression: t, typeAnnotation: n } = e;
				this.print(t, !0),
					this.space(),
					this.word("TSAsExpression" === e ? "as" : "satisfies"),
					this.space(),
					this.print(n);
			}),
		(N.TSBigIntKeyword = function () {
			this.word("bigint");
		}),
		(N.TSBooleanKeyword = function () {
			this.word("boolean");
		}),
		(N.TSCallSignatureDeclaration = function (e) {
			this.tsPrintSignatureDeclarationBase(e), hl(this, e);
		}),
		(N.TSInterfaceHeritage = N.TSClassImplements =
			function (e) {
				this.print(e.expression), this.print(e.typeArguments);
			}),
		(N.TSConditionalType = function (e) {
			this.print(e.checkType),
				this.space(),
				this.word("extends"),
				this.space(),
				this.print(e.extendsType),
				this.space(),
				this.tokenChar(63),
				this.space(),
				this.print(e.trueType),
				this.space(),
				this.tokenChar(58),
				this.space(),
				this.print(e.falseType);
		}),
		(N.TSConstructSignatureDeclaration = function (e) {
			this.word("new"), this.space(), this.tsPrintSignatureDeclarationBase(e), hl(this, e);
		}),
		(N.TSConstructorType = function (e) {
			e.abstract && (this.word("abstract"), this.space());
			this.word("new"), this.space(), this.tsPrintFunctionOrConstructorType(e);
		}),
		(N.TSDeclareFunction = function (e, t) {
			e.declare && (this.word("declare"), this.space());
			this._functionHead(e, t), this.semicolon();
		}),
		(N.TSDeclareMethod = function (e) {
			this._classMethodHead(e), this.semicolon();
		}),
		(N.TSEnumBody = El),
		(N.TSEnumDeclaration = function (e) {
			var { declare: t, const: n, id: r } = e;
			t && (this.word("declare"), this.space());
			n && (this.word("const"), this.space());
			this.word("enum"), this.space(), this.print(r), this.space(), El.call(this, e);
		}),
		(N.TSEnumMember = function (e) {
			var { id: e, initializer: t } = e;
			this.print(e), t && (this.space(), this.tokenChar(61), this.space(), this.print(t));
		}),
		(N.TSExportAssignment = function (e) {
			this.word("export"),
				this.space(),
				this.tokenChar(61),
				this.space(),
				this.print(e.expression),
				this.semicolon();
		}),
		(N.TSExternalModuleReference = function (e) {
			this.token("require("), this.print(e.expression), this.tokenChar(41);
		}),
		(N.TSFunctionType = function (e) {
			this.tsPrintFunctionOrConstructorType(e);
		}),
		(N.TSImportEqualsDeclaration = function (e) {
			var { id: t, moduleReference: n } = e;
			e.isExport && (this.word("export"), this.space());
			this.word("import"),
				this.space(),
				this.print(t),
				this.space(),
				this.tokenChar(61),
				this.space(),
				this.print(n),
				this.semicolon();
		}),
		(N.TSImportType = function (e) {
			var { argument: t, qualifier: n, options: r } = e;
			this.word("import"),
				this.tokenChar(40),
				this.print(t),
				r && (this.tokenChar(44), this.print(r));
			this.tokenChar(41), n && (this.tokenChar(46), this.print(n));
			t = e.typeParameters;
			t && this.print(t);
		}),
		(N.TSIndexSignature = function (e) {
			var { readonly: t, static: n } = e;
			n && (this.word("static"), this.space());
			t && (this.word("readonly"), this.space());
			this.tokenChar(91),
				this._parameters(e.parameters, "]"),
				this.print(e.typeAnnotation),
				hl(this, e);
		}),
		(N.TSIndexedAccessType = function (e) {
			this.print(e.objectType, !0),
				this.tokenChar(91),
				this.print(e.indexType),
				this.tokenChar(93);
		}),
		(N.TSInferType = function (e) {
			this.word("infer"), this.print(e.typeParameter);
		}),
		(N.TSInstantiationExpression = function (e) {
			this.print(e.expression), this.print(e.typeParameters);
		}),
		(N.TSInterfaceBody = function (e) {
			vl(this, e, () => this.printJoin(e.body, !0, !0));
		}),
		(N.TSInterfaceDeclaration = function (e) {
			var { declare: e, id: t, typeParameters: n, extends: r, body: i } = e;
			e && (this.word("declare"), this.space());
			this.word("interface"),
				this.space(),
				this.print(t),
				this.print(n),
				null != r &&
					r.length &&
					(this.space(), this.word("extends"), this.space(), this.printList(r));
			this.space(), this.print(i);
		}),
		(N.TSIntersectionType = function (e) {
			Sl(this, e, "&");
		}),
		(N.TSIntrinsicKeyword = function () {
			this.word("intrinsic");
		}),
		(N.TSLiteralType = function (e) {
			this.print(e.literal);
		}),
		(N.TSMappedType = function (e) {
			var { nameType: t, optional: n, readonly: r, typeAnnotation: i } = e,
				a = (this.tokenChar(123), this.enterDelimited());
			this.space(), r && (bl(this, r), this.word("readonly"), this.space());
			this.tokenChar(91),
				this.word(e.typeParameter.name),
				this.space(),
				this.word("in"),
				this.space(),
				this.print(e.typeParameter.constraint),
				t && (this.space(), this.word("as"), this.space(), this.print(t));
			this.tokenChar(93), n && (bl(this, n), this.tokenChar(63));
			i && (this.tokenChar(58), this.space(), this.print(i));
			this.space(), a(), this.tokenChar(125);
		}),
		(N.TSMethodSignature = function (e) {
			var t = e.kind;
			("set" !== t && "get" !== t) || (this.word(t), this.space());
			this.tsPrintPropertyOrMethodName(e),
				this.tsPrintSignatureDeclarationBase(e),
				hl(this, e);
		}),
		(N.TSModuleBlock = function (e) {
			vl(this, e, () => this.printSequence(e.body, !0));
		}),
		(N.TSModuleDeclaration = function (t) {
			var { declare: e, id: n, kind: r } = t;
			e && (this.word("declare"), this.space());
			if (
				(t.global ||
					(this.word(null != r ? r : "Identifier" === n.type ? "namespace" : "module"),
					this.space()),
				this.print(n),
				t.body)
			) {
				let e = t.body;
				for (; "TSModuleDeclaration" === e.type; )
					this.tokenChar(46), this.print(e.id), (e = e.body);
				this.space(), this.print(e);
			} else this.semicolon();
		}),
		(N.TSNamedTupleMember = function (e) {
			this.print(e.label), e.optional && this.tokenChar(63);
			this.tokenChar(58), this.space(), this.print(e.elementType);
		}),
		(N.TSNamespaceExportDeclaration = function (e) {
			this.word("export"),
				this.space(),
				this.word("as"),
				this.space(),
				this.word("namespace"),
				this.space(),
				this.print(e.id),
				this.semicolon();
		}),
		(N.TSNeverKeyword = function () {
			this.word("never");
		}),
		(N.TSNonNullExpression = function (e) {
			this.print(e.expression), this.tokenChar(33);
		}),
		(N.TSNullKeyword = function () {
			this.word("null");
		}),
		(N.TSNumberKeyword = function () {
			this.word("number");
		}),
		(N.TSObjectKeyword = function () {
			this.word("object");
		}),
		(N.TSOptionalType = function (e) {
			this.print(e.typeAnnotation), this.tokenChar(63);
		}),
		(N.TSParameterProperty = function (e) {
			e.accessibility && (this.word(e.accessibility), this.space());
			e.readonly && (this.word("readonly"), this.space());
			this._param(e.parameter);
		}),
		(N.TSParenthesizedType = function (e) {
			this.tokenChar(40), this.print(e.typeAnnotation), this.tokenChar(41);
		}),
		(N.TSPropertySignature = function (e) {
			var t = e.readonly;
			t && (this.word("readonly"), this.space());
			this.tsPrintPropertyOrMethodName(e), this.print(e.typeAnnotation), hl(this, e);
		}),
		(N.TSQualifiedName = function (e) {
			this.print(e.left), this.tokenChar(46), this.print(e.right);
		}),
		(N.TSRestType = function (e) {
			this.token("..."), this.print(e.typeAnnotation);
		}),
		(N.TSStringKeyword = function () {
			this.word("string");
		}),
		(N.TSSymbolKeyword = function () {
			this.word("symbol");
		}),
		(N.TSTemplateLiteralType = function (e) {
			this._printTemplate(e, e.types);
		}),
		(N.TSThisType = function () {
			this.word("this");
		}),
		(N.TSTupleType = function (e) {
			this.tokenChar(91),
				this.printList(e.elementTypes, this.shouldPrintTrailingComma("]")),
				this.tokenChar(93);
		}),
		(N.TSTypeAliasDeclaration = function (e) {
			var { declare: e, id: t, typeParameters: n, typeAnnotation: r } = e;
			e && (this.word("declare"), this.space());
			this.word("type"),
				this.space(),
				this.print(t),
				this.print(n),
				this.space(),
				this.tokenChar(61),
				this.space(),
				this.print(r),
				this.semicolon();
		}),
		(N.TSTypeAnnotation = function (e, t) {
			this.token(
				("TSFunctionType" !== t.type && "TSConstructorType" !== t.type) ||
					t.typeAnnotation !== e
					? ":"
					: "=>"
			),
				this.space(),
				e.optional && this.tokenChar(63);
			this.print(e.typeAnnotation);
		}),
		(N.TSTypeAssertion = function (e) {
			var { typeAnnotation: e, expression: t } = e;
			this.tokenChar(60), this.print(e), this.tokenChar(62), this.space(), this.print(t);
		}),
		(N.TSTypeLiteral = function (e) {
			vl(this, e, () => this.printJoin(e.members, !0, !0));
		}),
		(N.TSTypeOperator = function (e) {
			this.word(e.operator), this.space(), this.print(e.typeAnnotation);
		}),
		(N.TSTypeParameter = function (e) {
			e.in && (this.word("in"), this.space());
			e.out && (this.word("out"), this.space());
			this.word(e.name),
				e.constraint &&
					(this.space(), this.word("extends"), this.space(), this.print(e.constraint));
			e.default && (this.space(), this.tokenChar(61), this.space(), this.print(e.default));
		}),
		(N.TSTypeParameterDeclaration = N.TSTypeParameterInstantiation =
			function (e, t) {
				this.tokenChar(60);
				let n = "ArrowFunctionExpression" === t.type && 1 === e.params.length;
				this.tokenMap &&
					null != e.start &&
					null != e.end &&
					(n =
						(n =
							n &&
							!!this.tokenMap.find(e, e => this.tokenMap.matchesOriginal(e, ","))) ||
						this.shouldPrintTrailingComma(">"));
				this.printList(e.params, n), this.tokenChar(62);
			}),
		(N.TSTypePredicate = function (e) {
			e.asserts && (this.word("asserts"), this.space());
			this.print(e.parameterName),
				e.typeAnnotation &&
					(this.space(),
					this.word("is"),
					this.space(),
					this.print(e.typeAnnotation.typeAnnotation));
		}),
		(N.TSTypeQuery = function (e) {
			this.word("typeof"), this.space(), this.print(e.exprName);
			e = e.typeParameters;
			e && this.print(e);
		}),
		(N.TSTypeReference = function (e) {
			var t = e.typeParameters;
			this.print(e.typeName, !!t), this.print(t);
		}),
		(N.TSUndefinedKeyword = function () {
			this.word("undefined");
		}),
		(N.TSUnionType = function (e) {
			Sl(this, e, "|");
		}),
		(N.TSUnknownKeyword = function () {
			this.word("unknown");
		}),
		(N.TSVoidKeyword = function () {
			this.word("void");
		}),
		(N.tsPrintClassMemberModifiers = function (e) {
			var t = "ClassPrivateProperty" === e.type,
				n = "ClassAccessorProperty" === e.type || "ClassProperty" === e.type;
			gl(this, e, [n && e.declare && "declare", !t && e.accessibility]),
				e.static && (this.word("static"), this.space());
			gl(this, e, [
				!t && e.abstract && "abstract",
				!t && e.override && "override",
				(n || t) && e.readonly && "readonly"
			]);
		}),
		(N.tsPrintFunctionOrConstructorType = function (e) {
			var t = e.typeParameters,
				n = e.parameters,
				t =
					(this.print(t),
					this.tokenChar(40),
					this._parameters(n, ")"),
					this.space(),
					e.typeAnnotation);
			this.print(t);
		}),
		(N.tsPrintPropertyOrMethodName = function (e) {
			e.computed && this.tokenChar(91);
			this.print(e.key), e.computed && this.tokenChar(93);
			e.optional && this.tokenChar(63);
		}),
		(N.tsPrintSignatureDeclarationBase = function (e) {
			var t = e.typeParameters,
				n = e.parameters,
				t = (this.print(t), this.tokenChar(40), this._parameters(n, ")"), e.typeAnnotation);
			this.print(t);
		}),
		(L = p),
		Object.defineProperty(L, "__esModule", { value: !0 }),
		(ol = h),
		Object.keys(ol).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === ol[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return ol[e];
					}
				});
		}),
		(sl = y),
		Object.keys(sl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === sl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return sl[e];
					}
				});
		}),
		(ll = l),
		Object.keys(ll).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === ll[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return ll[e];
					}
				});
		}),
		(pl = o),
		Object.keys(pl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === pl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return pl[e];
					}
				});
		}),
		(ul = s),
		Object.keys(ul).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === ul[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return ul[e];
					}
				});
		}),
		(cl = c),
		Object.keys(cl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === cl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return cl[e];
					}
				});
		}),
		(dl = I),
		Object.keys(dl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === dl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return dl[e];
					}
				});
		}),
		(fl = Gn),
		Object.keys(fl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === fl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return fl[e];
					}
				});
		}),
		(yl = Hn),
		Object.keys(yl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === yl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return yl[e];
					}
				});
		}),
		(ml = D),
		Object.keys(ml).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === ml[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return ml[e];
					}
				});
		}),
		(Tl = N),
		Object.keys(Tl).forEach(function (e) {
			"default" === e ||
				"__esModule" === e ||
				(e in L && L[e] === Tl[e]) ||
				Object.defineProperty(L, e, {
					enumerable: !0,
					get: function () {
						return Tl[e];
					}
				});
		});
	tr = {};
	Object.defineProperty(tr, "__esModule", { value: !0 }),
		(tr.addDeprecatedGenerators = function (e) {
			Object.assign(e.prototype, {
				Noop() {},
				TSExpressionWithTypeArguments(e) {
					this.print(e.expression), this.print(e.typeParameters);
				},
				DecimalLiteral(e) {
					var t = this.getPossibleRaw(e);
					this.format.minified || void 0 === t ? this.word(e.value + "m") : this.word(t);
				}
			});
		}),
		Object.defineProperty(Y, "__esModule", { value: !0 }),
		(Y.default = void 0);
	var Pl = R,
		xl = i,
		Al = Qo,
		nr = tr;
	let {
			isExpression: Ol,
			isFunction: _l,
			isStatement: Il,
			isClassBody: Cl,
			isTSInterfaceBody: Dl,
			isTSEnumMember: Nl
		} = e,
		wl = /e/i,
		jl = /\.0+$/,
		kl = /[\n\r\u2028\u2029]/,
		Ll = /[\n\r\u2028\u2029]|\*\//;
	function Ml(e) {
		return "CommentLine" === e.type || kl.test(e.value);
	}
	let Bl = xl.needsParens;
	class Fl {
		constructor(e, t, n, r) {
			(this.inForStatementInit = !1),
				(this.tokenContext = 0),
				(this._tokens = null),
				(this._originalCode = null),
				(this._currentNode = null),
				(this._indent = 0),
				(this._indentRepeat = 0),
				(this._insideAux = !1),
				(this._noLineTerminator = !1),
				(this._noLineTerminatorAfterNode = null),
				(this._printAuxAfterOnNextUserNode = !1),
				(this._printedComments = new Set()),
				(this._endsWithInteger = !1),
				(this._endsWithWord = !1),
				(this._endsWithDiv = !1),
				(this._lastCommentLine = 0),
				(this._endsWithInnerRaw = !1),
				(this._indentInnerComments = !0),
				(this.tokenMap = null),
				(this._boundGetRawIdentifier = this._getRawIdentifier.bind(this)),
				(this._printSemicolonBeforeNextNode = -1),
				(this._printSemicolonBeforeNextToken = -1),
				(this.format = e),
				(this._tokens = n),
				(this._originalCode = r),
				(this._indentRepeat = e.indent.style.length),
				(this._inputMap = null == t ? void 0 : t._inputMap),
				(this._buf = new Pl.default(t, e.indent.style[0]));
		}
		enterForStatementInit() {
			return this.inForStatementInit
				? () => {}
				: ((this.inForStatementInit = !0),
					() => {
						this.inForStatementInit = !1;
					});
		}
		enterDelimited() {
			let e = this.inForStatementInit,
				t = this._noLineTerminatorAfterNode;
			return !1 === e && null === t
				? () => {}
				: ((this.inForStatementInit = !1),
					(this._noLineTerminatorAfterNode = null),
					() => {
						(this.inForStatementInit = e), (this._noLineTerminatorAfterNode = t);
					});
		}
		generate(e) {
			return (
				this.format.preserveFormat &&
					(this.tokenMap = new Al.TokenMap(e, this._tokens, this._originalCode)),
				this.print(e),
				this._maybeAddAuxComment(),
				this._buf.get()
			);
		}
		indent() {
			var e = this.format;
			e.preserveFormat || e.compact || e.concise || this._indent++;
		}
		dedent() {
			var e = this.format;
			e.preserveFormat || e.compact || e.concise || this._indent--;
		}
		semicolon(e = !1) {
			if ((this._maybeAddAuxComment(), e)) this._appendChar(59);
			else {
				if (this.tokenMap) {
					e = this._currentNode;
					if (null != e.start && null != e.end) {
						if (!this.tokenMap.endMatches(e, ";"))
							return void (this._printSemicolonBeforeNextNode =
								this._buf.getCurrentLine());
						e = this.tokenMap.getIndexes(this._currentNode);
						this._catchUpTo(this._tokens[e[e.length - 1]].loc.start);
					}
				}
				this._queue(59);
			}
			this._noLineTerminator = !1;
		}
		rightBrace(e) {
			this.format.minified && this._buf.removeLastSemicolon(),
				this.sourceWithOffset("end", e.loc, -1),
				this.tokenChar(125);
		}
		rightParens(e) {
			this.sourceWithOffset("end", e.loc, -1), this.tokenChar(41);
		}
		space(e = !1) {
			var t = this.format;
			t.compact ||
				t.preserveFormat ||
				((e || (this._buf.hasContent() && 32 !== (t = this.getLastChar()) && 10 !== t)) &&
					this._space());
		}
		word(e, t = !1) {
			(this.tokenContext = 0),
				this._maybePrintInnerComments(e),
				this._maybeAddAuxComment(),
				this.tokenMap && this._catchUpToCurrentToken(e),
				(this._endsWithWord || (this._endsWithDiv && 47 === e.charCodeAt(0))) &&
					this._space(),
				this._append(e, !1),
				(this._endsWithWord = !0),
				(this._noLineTerminator = t);
		}
		number(e, t) {
			this.word(e),
				(this._endsWithInteger =
					Number.isInteger(t) &&
					!(e =>
						2 < e.length &&
						48 === e.charCodeAt(0) &&
						(98 === (e = e.charCodeAt(1)) || 111 === e || 120 === e))(e) &&
					!wl.test(e) &&
					!jl.test(e) &&
					46 !== e.charCodeAt(e.length - 1));
		}
		token(e, t = !1, n = 0) {
			(this.tokenContext = 0),
				this._maybePrintInnerComments(e, n),
				this._maybeAddAuxComment(),
				this.tokenMap && this._catchUpToCurrentToken(e, n);
			var n = this.getLastChar(),
				r = e.charCodeAt(0);
			((33 === n && ("--" === e || 61 === r)) ||
				(43 === r && 43 === n) ||
				(45 === r && 45 === n) ||
				(46 === r && this._endsWithInteger)) &&
				this._space(),
				this._append(e, t),
				(this._noLineTerminator = !1);
		}
		tokenChar(e) {
			this.tokenContext = 0;
			var t = String.fromCharCode(e),
				t =
					(this._maybePrintInnerComments(t),
					this._maybeAddAuxComment(),
					this.tokenMap && this._catchUpToCurrentToken(t),
					this.getLastChar());
			((43 === e && 43 === t) ||
				(45 === e && 45 === t) ||
				(46 === e && this._endsWithInteger)) &&
				this._space(),
				this._appendChar(e),
				(this._noLineTerminator = !1);
		}
		newline(t = 1, e) {
			if (!(t <= 0)) {
				if (!e) {
					if (this.format.retainLines || this.format.compact) return;
					if (this.format.concise) return void this.space();
				}
				2 < t && (t = 2), (t -= this._buf.getNewlineCount());
				for (let e = 0; e < t; e++) this._newline();
			}
		}
		endsWith(e) {
			return this.getLastChar() === e;
		}
		getLastChar() {
			return this._buf.getLastChar();
		}
		endsWithCharAndNewline() {
			return this._buf.endsWithCharAndNewline();
		}
		removeTrailingNewline() {
			this._buf.removeTrailingNewline();
		}
		exactSource(e, t) {
			e ? (this._catchUp("start", e), this._buf.exactSource(e, t)) : t();
		}
		source(e, t) {
			t && (this._catchUp(e, t), this._buf.source(e, t));
		}
		sourceWithOffset(e, t, n) {
			t &&
				!this.format.preserveFormat &&
				(this._catchUp(e, t), this._buf.sourceWithOffset(e, t, n));
		}
		sourceIdentifierName(e, t) {
			var n;
			this._buf._canMarkIdName &&
				(((n = this._buf._sourcePosition).identifierNamePos = t), (n.identifierName = e));
		}
		_space() {
			this._queue(32);
		}
		_newline() {
			this._queue(10);
		}
		_catchUpToCurrentToken(e, t = 0) {
			e = this.tokenMap.findMatching(this._currentNode, e, t);
			e && this._catchUpTo(e.loc.start),
				-1 !== this._printSemicolonBeforeNextToken &&
					this._printSemicolonBeforeNextToken === this._buf.getCurrentLine() &&
					(this._buf.appendChar(59),
					(this._endsWithWord = !1),
					(this._endsWithInteger = !1),
					(this._endsWithDiv = !1)),
				(this._printSemicolonBeforeNextToken = -1),
				(this._printSemicolonBeforeNextNode = -1);
		}
		_append(e, t) {
			this._maybeIndent(e.charCodeAt(0)),
				this._buf.append(e, t),
				(this._endsWithWord = !1),
				(this._endsWithInteger = !1),
				(this._endsWithDiv = !1);
		}
		_appendChar(e) {
			this._maybeIndent(e),
				this._buf.appendChar(e),
				(this._endsWithWord = !1),
				(this._endsWithInteger = !1),
				(this._endsWithDiv = !1);
		}
		_queue(e) {
			this._maybeIndent(e),
				this._buf.queue(e),
				(this._endsWithWord = !1),
				(this._endsWithInteger = !1);
		}
		_maybeIndent(e) {
			this._indent &&
				10 !== e &&
				this.endsWith(10) &&
				this._buf.queueIndentation(this._getIndent());
		}
		_shouldIndent(e) {
			if (this._indent && 10 !== e && this.endsWith(10)) return !0;
		}
		catchUp(e) {
			if (this.format.retainLines) {
				var t = e - this._buf.getCurrentLine();
				for (let e = 0; e < t; e++) this._newline();
			}
		}
		_catchUp(e, t) {
			var n,
				r = this.format;
			r.preserveFormat
				? null != (n = null == t ? void 0 : t[e]) && this._catchUpTo(n)
				: r.retainLines && null != t && t[e] && this.catchUp(t[e].line);
		}
		_catchUpTo({ line: e, column: t, index: n }) {
			var r = e - this._buf.getCurrentLine();
			if (!(0 < r && this._noLineTerminator)) {
				for (let e = 0; e < r; e++) this._newline();
				e = 0 < r ? t : t - this._buf.getCurrentColumn();
				0 < e &&
					((t = this._originalCode
						? this._originalCode
								.slice(n - e, n)
								.replace(
									/[^\t\x0B\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF]/gu,
									" "
								)
						: " ".repeat(e)),
					this._append(t, !1));
			}
		}
		_getIndent() {
			return this._indentRepeat * this._indent;
		}
		printTerminatorless(e) {
			(this._noLineTerminator = !0), this.print(e);
		}
		print(a, o, s) {
			if (a) {
				this._endsWithInnerRaw = !1;
				var l = a.type,
					p = this.format,
					u = p.concise,
					c = (a._compact && (p.concise = !0), this[l]);
				if (void 0 === c)
					throw new ReferenceError(
						`unknown node of type ${JSON.stringify(l)} with constructor ` +
							JSON.stringify(a.constructor.name)
					);
				var d = this._currentNode,
					f =
						((this._currentNode = a),
						this.tokenMap &&
							(this._printSemicolonBeforeNextToken =
								this._printSemicolonBeforeNextNode),
						this._insideAux),
					y =
						((this._insideAux = null == a.loc),
						this._maybeAddAuxComment(this._insideAux && !f),
						null == (y = a.extra) ? void 0 : y.parenthesized);
				let e =
					(y && p.preserveFormat) ||
					(y && p.retainFunctionParens && "FunctionExpression" === l) ||
					Bl(
						a,
						d,
						this.tokenContext,
						this.inForStatementInit,
						p.preserveFormat ? this._boundGetRawIdentifier : void 0
					);
				if (
					!e &&
					y &&
					null != (y = a.leadingComments) &&
					y.length &&
					"CommentBlock" === a.leadingComments[0].type
				)
					switch (null == d ? void 0 : d.type) {
						case "ExpressionStatement":
						case "VariableDeclarator":
						case "AssignmentExpression":
						case "ReturnStatement":
							break;
						case "CallExpression":
						case "OptionalCallExpression":
						case "NewExpression":
							if (d.callee !== a) break;
						default:
							e = !0;
					}
				let t = !1;
				!e &&
					this._noLineTerminator &&
					((null != (y = a.leadingComments) && y.some(Ml)) ||
						(this.format.retainLines &&
							a.loc &&
							a.loc.start.line > this._buf.getCurrentLine())) &&
					((e = !0), (t = !0));
				let n, r, i;
				e ||
					((o =
						o ||
						(d && this._noLineTerminatorAfterNode === d && xl.isLastChild(d, a))) &&
						(null != (i = a.trailingComments) && i.some(Ml)
							? Ol(a) && (e = !0)
							: ((n = this._noLineTerminatorAfterNode),
								(this._noLineTerminatorAfterNode = a)))),
					e &&
						(this.tokenChar(40),
						t && this.indent(),
						(this._endsWithInnerRaw = !1),
						this.inForStatementInit && ((r = !0), (this.inForStatementInit = !1)),
						(n = this._noLineTerminatorAfterNode),
						(this._noLineTerminatorAfterNode = null)),
					(this._lastCommentLine = 0),
					this._printLeadingComments(a, d);
				y = "Program" === l || "File" === l ? null : a.loc;
				this.exactSource(y, c.bind(this, a, d)),
					e
						? (this._printTrailingComments(a, d),
							t && (this.dedent(), this.newline()),
							this.tokenChar(41),
							(this._noLineTerminator = o),
							r && (this.inForStatementInit = !0))
						: o && !this._noLineTerminator
							? ((this._noLineTerminator = !0), this._printTrailingComments(a, d))
							: this._printTrailingComments(a, d, s),
					(this._currentNode = d),
					(p.concise = u),
					(this._insideAux = f),
					void 0 !== n && (this._noLineTerminatorAfterNode = n),
					(this._endsWithInnerRaw = !1);
			}
		}
		_maybeAddAuxComment(e) {
			e && this._printAuxBeforeComment(), this._insideAux || this._printAuxAfterComment();
		}
		_printAuxBeforeComment() {
			var e;
			!this._printAuxAfterOnNextUserNode &&
				((this._printAuxAfterOnNextUserNode = !0),
				(e = this.format.auxiliaryCommentBefore)) &&
				this._printComment({ type: "CommentBlock", value: e }, 0);
		}
		_printAuxAfterComment() {
			var e;
			this._printAuxAfterOnNextUserNode &&
				((this._printAuxAfterOnNextUserNode = !1),
				(e = this.format.auxiliaryCommentAfter)) &&
				this._printComment({ type: "CommentBlock", value: e }, 0);
		}
		getPossibleRaw(e) {
			var t = e.extra;
			if (
				null != (null == t ? void 0 : t.raw) &&
				null != t.rawValue &&
				e.value === t.rawValue
			)
				return t.raw;
		}
		printJoin(t, n, e, r, i, a, o, s) {
			if (null != t && t.length) {
				(e =
					null == e &&
					this.format.retainLines &&
					null != (l = null == (l = t[0].loc) ? void 0 : l.start.line) &&
					l !== this._buf.getCurrentLine()
						? !0
						: e) && this.indent();
				var l,
					p = { addNewlines: a, nextNodeStartLine: 0 },
					u = null == r ? void 0 : r.bind(this),
					c = t.length;
				for (let e = 0; e < c; e++) {
					var d = t[e];
					d &&
						(n && this._printNewline(0 === e, p),
						this.print(d, void 0, s || 0),
						null != o && o(d, e),
						null != u && (e < c - 1 ? u(e, !1) : i && u(e, !0)),
						n) &&
						((null != (d = d.trailingComments) && d.length) ||
							(this._lastCommentLine = 0),
						e + 1 === c
							? this.newline(1)
							: ((d = t[e + 1]),
								(p.nextNodeStartLine =
									(null == (d = d.loc) ? void 0 : d.start.line) || 0),
								this._printNewline(!0, p)));
				}
				e && this.dedent();
			}
		}
		printAndIndentOnComments(e) {
			var t = e.leadingComments && 0 < e.leadingComments.length;
			t && this.indent(), this.print(e), t && this.dedent();
		}
		printBlock(e) {
			e = e.body;
			"EmptyStatement" !== e.type && this.space(), this.print(e);
		}
		_printTrailingComments(e, t, n) {
			var { innerComments: r, trailingComments: i } = e;
			null != r && r.length && this._printComments(2, r, e, t, n),
				null != i && i.length && this._printComments(2, i, e, t, n);
		}
		_printLeadingComments(e, t) {
			var n = e.leadingComments;
			null != n && n.length && this._printComments(0, n, e, t);
		}
		_maybePrintInnerComments(e, t) {
			var n;
			this._endsWithInnerRaw &&
				this.printInnerComments(
					null == (n = this.tokenMap) ? void 0 : n.findMatching(this._currentNode, e, t)
				),
				(this._endsWithInnerRaw = !0),
				(this._indentInnerComments = !0);
		}
		printInnerComments(e) {
			var t,
				n,
				r,
				i = this._currentNode,
				a = i.innerComments;
			null != a &&
				a.length &&
				((t = this.endsWith(32)),
				(n = this._indentInnerComments),
				(r = this._printedComments.size),
				n && this.indent(),
				this._printComments(1, a, i, void 0, void 0, e),
				t && r !== this._printedComments.size && this.space(),
				n) &&
				this.dedent();
		}
		noIndentInnerCommentsHere() {
			this._indentInnerComments = !1;
		}
		printSequence(e, t, n, r) {
			this.printJoin(e, !0, null != t && t, void 0, void 0, r, void 0, n);
		}
		printList(e, t, n, r, i, a) {
			this.printJoin(e, n, r, null != i ? i : Rl, t, void 0, a);
		}
		shouldPrintTrailingComma(t) {
			var e;
			return !this.tokenMap ||
				(e = this.tokenMap.findLastIndex(this._currentNode, e =>
					this.tokenMap.matchesOriginal(e, t)
				)) <= 0
				? null
				: this.tokenMap.matchesOriginal(this._tokens[e - 1], ",");
		}
		_printNewline(e, t) {
			var n = this.format;
			if (!n.retainLines && !n.compact)
				if (n.concise) this.space();
				else if (e) {
					(n = t.nextNodeStartLine), (e = this._lastCommentLine);
					if (0 < n && 0 < e) {
						t = n - e;
						if (0 <= t) return void this.newline(t || 1);
					}
					this._buf.hasContent() && this.newline(1);
				}
		}
		_shouldPrintComment(t, e) {
			if (t.ignore) return 0;
			if (this._printedComments.has(t)) return 0;
			if (this._noLineTerminator && Ll.test(t.value)) return 2;
			if (e && this.tokenMap) {
				var n = this.tokenMap.find(this._currentNode, e => e.value === t.value);
				if (n && n.start > e.start) return 2;
			}
			return this._printedComments.add(t), this.format.shouldPrintComment(t.value) ? 1 : 0;
		}
		_printComment(e, t) {
			var n,
				r = this._noLineTerminator,
				i = "CommentBlock" === e.type,
				a = i && 1 !== t && !this._noLineTerminator,
				o = (a && this._buf.hasContent() && 2 !== t && this.newline(1), this.getLastChar());
			91 !== o && 123 !== o && 40 !== o && this.space();
			let s;
			if (i) {
				if (((s = `/*${e.value}*/`), this.format.indent.adjustMultilineComment)) {
					var o = null == (o = e.loc) ? void 0 : o.start.column;
					if (
						(o &&
							((o = new RegExp("\\n\\s{1," + o + "}", "g")),
							(s = s.replace(o, "\n"))),
						this.format.concise)
					)
						s = s.replace(
							/\n(?!$)/g,
							`
`
						);
					else {
						let e = this.format.retainLines ? 0 : this._buf.getCurrentColumn();
						(this._shouldIndent(47) || this.format.retainLines) &&
							(e += this._getIndent()),
							(s = s.replace(
								/\n(?!$)/g,
								`
` + " ".repeat(e)
							));
					}
				}
			} else s = r ? `/*${e.value}*/` : "//" + e.value;
			this._endsWithDiv && this._space(),
				this.tokenMap
					? (({ _printSemicolonBeforeNextToken: o, _printSemicolonBeforeNextNode: n } =
							this),
						(this._printSemicolonBeforeNextToken = -1),
						(this._printSemicolonBeforeNextNode = -1),
						this.source("start", e.loc),
						this._append(s, i),
						(this._printSemicolonBeforeNextNode = n),
						(this._printSemicolonBeforeNextToken = o))
					: (this.source("start", e.loc), this._append(s, i)),
				i || r || this.newline(1, !0),
				a && 3 !== t && this.newline(1);
		}
		_printComments(e, n, r, i, a = 0, o) {
			var t = r.loc,
				s = n.length;
			let l = !!t;
			var p = l ? t.start.line : 0,
				u = l ? t.end.line : 0;
			let c = 0,
				d = 0;
			var f = this._noLineTerminator ? function () {} : this.newline.bind(this);
			for (let t = 0; t < s; t++) {
				var y = n[t],
					m = this._shouldPrintComment(y, o);
				if (2 === m) {
					l = !1;
					break;
				}
				if (l && y.loc && 1 === m) {
					var T,
						h = y.loc.start.line,
						S = y.loc.end.line;
					if (0 === e) {
						let e = 0;
						0 === t
							? !this._buf.hasContent() ||
								("CommentLine" !== y.type && h === S) ||
								(e = d = 1)
							: (e = h - c),
							(c = S),
							f(e),
							this._printComment(y, 1),
							t + 1 === s && (f(Math.max(p - c, d)), (c = p));
					} else
						1 === e
							? ((T = h - (0 === t ? p : c)),
								(c = S),
								f(T),
								this._printComment(y, 1),
								t + 1 === s && (f(Math.min(1, u - c)), (c = u)))
							: ((T = h - (0 === t ? u - a : c)),
								(c = S),
								f(T),
								this._printComment(y, 1));
				} else
					(l = !1),
						1 === m &&
							(1 === s
								? ((S =
										(h = y.loc
											? y.loc.start.line === y.loc.end.line
											: !kl.test(y.value)) &&
										!Il(r) &&
										!Cl(i) &&
										!Dl(i) &&
										!Nl(r)),
									0 === e
										? this._printComment(
												y,
												(S && "ObjectExpression" !== r.type) ||
													(h && _l(i, { body: r }))
													? 1
													: 0
											)
										: S && 2 === e
											? this._printComment(y, 1)
											: this._printComment(y, 0))
								: 1 !== e ||
									  ("ObjectExpression" === r.type && 1 < r.properties.length) ||
									  "ClassBody" === r.type ||
									  "TSInterfaceBody" === r.type
									? this._printComment(y, 0)
									: this._printComment(y, 0 === t ? 2 : t === s - 1 ? 3 : 0));
			}
			2 === e && l && c && (this._lastCommentLine = c);
		}
	}
	function Rl(e, t) {
		this.token(",", !1, e), t || this.space();
	}
	Object.assign(Fl.prototype, p),
		(0, nr.addDeprecatedGenerators)(Fl),
		(Y.default = Fl),
		Object.defineProperty(B, "__esModule", { value: !0 });
	var Qn = (B.default = function (e, t = {}, n) {
			var r = Vl(n, t, e),
				t = t.sourceMaps ? new Kl.default(t, n) : null,
				r = new Yl.default(r, t, e.tokens, "string" == typeof n ? n : null);
			return r.generate(e);
		}),
		Kl = F,
		Yl = Y;
	function Vl(e, t, n) {
		if (t.experimental_preserveFormat) {
			if ("string" != typeof e)
				throw new Error(
					"`experimental_preserveFormat` requires the original `code` to be passed to @babel/generator as a string"
				);
			if (!t.retainLines)
				throw new Error(
					"`experimental_preserveFormat` requires `retainLines` to be set to `true`"
				);
			if (t.compact && "auto" !== t.compact)
				throw new Error(
					"`experimental_preserveFormat` is not compatible with the `compact` option"
				);
			if (t.minified)
				throw new Error(
					"`experimental_preserveFormat` is not compatible with the `minified` option"
				);
			if (t.jsescOption)
				throw new Error(
					"`experimental_preserveFormat` is not compatible with the `jsescOption` option"
				);
			if (!Array.isArray(n.tokens))
				throw new Error(
					"`experimental_preserveFormat` requires the AST to have attatched the token of the input code. Make sure to enable the `tokens: true` parser option."
				);
		}
		let r = {
				auxiliaryCommentBefore: t.auxiliaryCommentBefore,
				auxiliaryCommentAfter: t.auxiliaryCommentAfter,
				shouldPrintComment: t.shouldPrintComment,
				preserveFormat: t.experimental_preserveFormat,
				retainLines: t.retainLines,
				retainFunctionParens: t.retainFunctionParens,
				comments: null == t.comments || t.comments,
				compact: t.compact,
				minified: t.minified,
				concise: t.concise,
				indent: { adjustMultilineComment: !0, style: "  " },
				jsescOption: Object.assign(
					{ quotes: "double", wrap: !0, minimal: !1 },
					t.jsescOption
				),
				topicToken: t.topicToken,
				importAttributesKeyword: t.importAttributesKeyword
			},
			i;
		(r.decoratorsBeforeExport = t.decoratorsBeforeExport),
			(r.jsescOption.json = t.jsonCompatibleStrings),
			(r.recordAndTupleSyntaxType = null != (i = t.recordAndTupleSyntaxType) ? i : "hash"),
			r.minified
				? ((r.compact = !0),
					(r.shouldPrintComment = r.shouldPrintComment || (() => r.comments)))
				: (r.shouldPrintComment =
						r.shouldPrintComment ||
						(e => r.comments || e.includes("@license") || e.includes("@preserve"))),
			"auto" === r.compact &&
				((r.compact = "string" == typeof e && 5e5 < e.length), r.compact) &&
				console.error(
					`[BABEL] Note: The code generator has deoptimised the styling of ${t.filename} as it exceeds the max of 500KB.`
				),
			(r.compact || r.preserveFormat) && (r.indent.adjustMultilineComment = !1);
		var { auxiliaryCommentBefore: n, auxiliaryCommentAfter: e, shouldPrintComment: t } = r;
		return (
			n && !t(n) && (r.auxiliaryCommentBefore = void 0),
			e && !t(e) && (r.auxiliaryCommentAfter = void 0),
			r
		);
	}
	(B.CodeGenerator = class {
		constructor(e, t = {}, n) {
			(this._ast = void 0),
				(this._format = void 0),
				(this._map = void 0),
				(this._ast = e),
				(this._format = Vl(n, t, e)),
				(this._map = t.sourceMaps ? new Kl.default(t, n) : null);
		}
		generate() {
			return new Yl.default(this._format, this._map).generate(this._ast);
		}
	}),
		(M.Babel.generator = Qn);
});
