<script lang="ts">
export default async function () {
	if (!window.WebStorageCache) {
		/*!
      web-storage-cache -- Added `expires` attribute and serialize data with `JSON.parse` for the localStorage and sessionStorage.
      Version 1.1.1
      https://github.com/WQTeam/web-storage-cache
      (c) 2013-2016 WQTeam, MIT license
    */
		!(function (a, b) {
			"function" == typeof define && define.amd
				? define(b)
				: "object" == typeof exports
					? (module.exports = b())
					: (a.WebStorageCache = b());
		})(window, function () {
			"use strict";
			function a(a, b) {
				for (var c in b) a[c] = b[c];
				return a;
			}
			function b(a) {
				var b = !1;
				if (a && a.setItem) {
					b = !0;
					var c = "__" + Math.round(1e7 * Math.random());
					try {
						a.setItem(c, c), a.removeItem(c);
					} catch (d) {
						b = !1;
					}
				}
				return b;
			}
			function c(a) {
				var b = typeof a;
				return "string" === b && window[a] instanceof Storage ? window[a] : a;
			}
			function d(a) {
				return "[object Date]" === Object.prototype.toString.call(a) && !isNaN(a.getTime());
			}
			function e(a, b) {
				if (
					((b = b || new Date()),
					"number" == typeof a
						? (a = a === 1 / 0 ? l : new Date(b.getTime() + 1e3 * a))
						: "string" == typeof a && (a = new Date(a)),
					a && !d(a))
				)
					throw new Error(
						"`expires` parameter cannot be converted to a valid Date instance"
					);
				return a;
			}
			function f(a) {
				var b = !1;
				if (a)
					if (a.code)
						switch (a.code) {
							case 22:
								b = !0;
								break;
							case 1014:
								"NS_ERROR_DOM_QUOTA_REACHED" === a.name && (b = !0);
						}
					else -2147024882 === a.number && (b = !0);
				return b;
			}
			function g(a, b) {
				(this.c = new Date().getTime()), (b = b || m);
				var c = e(b);
				(this.e = c.getTime()), (this.v = a);
			}
			function h(a) {
				return "object" != typeof a ? !1 : a && "c" in a && "e" in a && "v" in a ? !0 : !1;
			}
			function i(a) {
				var b = new Date().getTime();
				return b < a.e;
			}
			function j(a) {
				return (
					"string" != typeof a &&
						(console.warn(a + " used as a key, but it is not a string."),
						(a = String(a))),
					a
				);
			}
			function k(e) {
				var f = { storage: "localStorage", exp: 1 / 0 },
					g = a(f, e),
					h = g.exp;
				if (h && "number" != typeof h && !d(h))
					throw new Error(
						"Constructor `exp` parameter cannot be converted to a valid Date instance"
					);
				m = h;
				var i = c(g.storage),
					j = b(i);
				(this.isSupported = function () {
					return j;
				}),
					j
						? ((this.storage = i),
							(this.quotaExceedHandler = function (a, b, c) {
								if ((console.warn("Quota exceeded!"), c && c.force === !0)) {
									var d = this.deleteAllExpires();
									console.warn(
										"delete all expires CacheItem : [" +
											d +
											"] and try execute `set` method again!"
									);
									try {
										(c.force = !1), this.set(a, b, c);
									} catch (e) {
										console.warn(e);
									}
								}
							}))
						: a(this, o);
			}
			var l = new Date("Fri, 31 Dec 9999 23:59:59 UTC"),
				m = l,
				n = {
					serialize: function (a) {
						return JSON.stringify(a);
					},
					deserialize: function (a) {
						return a && JSON.parse(a);
					}
				},
				o = {
					set: function () {},
					get: function () {},
					delete: function () {},
					deleteAllExpires: function () {},
					clear: function () {},
					add: function () {},
					replace: function () {},
					touch: function () {}
				},
				p = {
					set: function (b, c, d) {
						if (
							((b = j(b)),
							"number" == typeof d && (d = { exp: d }),
							(d = a({ force: !0 }, d)),
							void 0 === c)
						)
							return this["delete"](b);
						var e = n.serialize(c),
							h = new g(e, d.exp);
						try {
							this.storage.setItem(b, n.serialize(h));
						} catch (i) {
							f(i) ? this.quotaExceedHandler(b, e, d, i) : console.error(i);
						}
						return c;
					},
					get: function (a) {
						a = j(a);
						var b = null;
						try {
							b = n.deserialize(this.storage.getItem(a));
						} catch (c) {
							return null;
						}
						if (h(b)) {
							if (i(b)) {
								var d = b.v;
								return n.deserialize(d);
							}
							this["delete"](a);
						}
						return null;
					},
					delete: function (a) {
						return (a = j(a)), this.storage.removeItem(a), a;
					},
					deleteAllExpires: function () {
						for (var a = this.storage.length, b = [], c = this, d = 0; a > d; d++) {
							var e = this.storage.key(d),
								f = null;
							try {
								f = n.deserialize(this.storage.getItem(e));
							} catch (g) {}
							if (null !== f && void 0 !== f.e) {
								var h = new Date().getTime();
								h >= f.e && b.push(e);
							}
						}
						return (
							b.forEach(function (a) {
								c["delete"](a);
							}),
							b
						);
					},
					clear: function () {
						this.storage.clear();
					},
					add: function (b, c, d) {
						(b = j(b)),
							"number" == typeof d && (d = { exp: d }),
							(d = a({ force: !0 }, d));
						try {
							var e = n.deserialize(this.storage.getItem(b));
							if (!h(e) || !i(e)) return this.set(b, c, d), !0;
						} catch (f) {
							return this.set(b, c, d), !0;
						}
						return !1;
					},
					replace: function (a, b, c) {
						a = j(a);
						var d = null;
						try {
							d = n.deserialize(this.storage.getItem(a));
						} catch (e) {
							return !1;
						}
						if (h(d)) {
							if (i(d)) return this.set(a, b, c), !0;
							this["delete"](a);
						}
						return !1;
					},
					touch: function (a, b) {
						a = j(a);
						var c = null;
						try {
							c = n.deserialize(this.storage.getItem(a));
						} catch (d) {
							return !1;
						}
						if (h(c)) {
							if (i(c)) return this.set(a, this.get(a), { exp: b }), !0;
							this["delete"](a);
						}
						return !1;
					}
				};
			return (k.prototype = p), k;
		});
	}
	return window.WebStorageCache;
}
</script>
