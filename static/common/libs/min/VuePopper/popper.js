((t, e) => {
	"function" == typeof define && define.amd
		? define(e)
		: "object" == typeof module && module.exports
			? (module.exports = e())
			: (t.Popper = e());
})(this, function () {
	var p = window,
		r = {
			placement: "bottom",
			gpuAcceleration: !0,
			offset: 0,
			boundariesElement: "viewport",
			boundariesPadding: 5,
			preventOverflowOrder: ["left", "right", "top", "bottom"],
			flipBehavior: "flip",
			arrowElement: "[x-arrow]",
			arrowOffset: 0,
			modifiers: [
				"shift",
				"offset",
				"preventOverflow",
				"keepTogether",
				"arrow",
				"flip",
				"applyStyle"
			],
			modifiersIgnored: [],
			forceAbsolute: !1
		};
	function t(t, e, o) {
		(this._reference = t.jquery ? t[0] : t), (this.state = {});
		var t = null == e,
			i = e && "[object Object]" === Object.prototype.toString.call(e);
		return (
			(this._popper = t || i ? this.parse(i ? e : {}) : e.jquery ? e[0] : e),
			(this._options = Object.assign({}, r, o)),
			(this._options.modifiers = this._options.modifiers.map(
				function (t) {
					if (-1 === this._options.modifiersIgnored.indexOf(t))
						return (
							"applyStyle" === t &&
								this._popper.setAttribute("x-placement", this._options.placement),
							this.modifiers[t] || t
						);
				}.bind(this)
			)),
			(this.state.position = this._getPosition(this._popper, this._reference)),
			n(this._popper, { position: this.state.position, top: 0 }),
			this.update(),
			this._setupEventListeners(),
			this
		);
	}
	function h(t) {
		var e = t.style.display,
			o = t.style.visibility,
			i =
				((t.style.display = "block"),
				(t.style.visibility = "hidden"),
				p.getComputedStyle(t)),
			r = parseFloat(i.marginTop) + parseFloat(i.marginBottom),
			i = parseFloat(i.marginLeft) + parseFloat(i.marginRight),
			i = { width: t.offsetWidth + i, height: t.offsetHeight + r };
		return (t.style.display = e), (t.style.visibility = o), i;
	}
	function f(t) {
		var e = { left: "right", right: "left", bottom: "top", top: "bottom" };
		return t.replace(/left|right|bottom|top/g, function (t) {
			return e[t];
		});
	}
	function d(t) {
		t = Object.assign({}, t);
		return (t.right = t.left + t.width), (t.bottom = t.top + t.height), t;
	}
	function i(t, e) {
		var o,
			i = 0;
		for (o in t) {
			if (t[o] === e) return i;
			i++;
		}
		return null;
	}
	function o(t, e) {
		return p.getComputedStyle(t, null)[e];
	}
	function l(t) {
		t = t.offsetParent;
		return t !== p.document.body && t ? t : p.document.documentElement;
	}
	function a(t) {
		var e = t.parentNode;
		return e
			? e === p.document
				? p.document.body.scrollTop || p.document.body.scrollLeft
					? p.document.body
					: p.document.documentElement
				: -1 !== ["scroll", "auto"].indexOf(o(e, "overflow")) ||
					  -1 !== ["scroll", "auto"].indexOf(o(e, "overflow-x")) ||
					  -1 !== ["scroll", "auto"].indexOf(o(e, "overflow-y"))
					? e
					: a(t.parentNode)
			: t;
	}
	function n(i, r) {
		Object.keys(r).forEach(function (t) {
			var e,
				o = "";
			-1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(t) &&
				"" !== (e = r[t]) &&
				!isNaN(parseFloat(e)) &&
				isFinite(e) &&
				(o = "px"),
				(i.style[t] = r[t] + o);
		});
	}
	function c(t) {
		t = { width: t.offsetWidth, height: t.offsetHeight, left: t.offsetLeft, top: t.offsetTop };
		return (t.right = t.left + t.width), (t.bottom = t.top + t.height), t;
	}
	function s(t) {
		var e = t.getBoundingClientRect(),
			t =
				-1 != navigator.userAgent.indexOf("MSIE") && "HTML" === t.tagName
					? -t.scrollTop
					: e.top;
		return {
			left: e.left,
			top: t,
			right: e.right,
			bottom: e.bottom,
			width: e.right - e.left,
			height: e.bottom - t
		};
	}
	function u(t) {
		for (var e = ["", "ms", "webkit", "moz", "o"], o = 0; o < e.length; o++) {
			var i = e[o] ? e[o] + t.charAt(0).toUpperCase() + t.slice(1) : t;
			if (void 0 !== p.document.body.style[i]) return i;
		}
		return null;
	}
	return (
		(t.prototype.destroy = function () {
			return (
				this._popper.removeAttribute("x-placement"),
				(this._popper.style.left = ""),
				(this._popper.style.position = ""),
				(this._popper.style.top = ""),
				(this._popper.style[u("transform")] = ""),
				this._removeEventListeners(),
				this._options.removeOnDestroy && this._popper.remove(),
				this
			);
		}),
		(t.prototype.update = function () {
			var t = { instance: this, styles: {} };
			(t.placement = this._options.placement),
				(t._originalPlacement = this._options.placement),
				(t.offsets = this._getOffsets(this._popper, this._reference, t.placement)),
				(t.boundaries = this._getBoundaries(
					t,
					this._options.boundariesPadding,
					this._options.boundariesElement
				)),
				(t = this.runModifiers(t, this._options.modifiers)),
				"function" == typeof this.state.updateCallback && this.state.updateCallback(t);
		}),
		(t.prototype.onCreate = function (t) {
			return t(this), this;
		}),
		(t.prototype.onUpdate = function (t) {
			return (this.state.updateCallback = t), this;
		}),
		(t.prototype.parse = function (t) {
			var e = {
					tagName: "div",
					classNames: ["popper"],
					attributes: [],
					parent: p.document.body,
					content: "",
					contentType: "text",
					arrowTagName: "div",
					arrowClassNames: ["popper__arrow"],
					arrowAttributes: ["x-arrow"]
				},
				e = ((t = Object.assign({}, e, t)), p.document),
				o = e.createElement(t.tagName),
				i =
					(r(o, t.classNames),
					n(o, t.attributes),
					"node" === t.contentType
						? o.appendChild(t.content.jquery ? t.content[0] : t.content)
						: "html" === t.contentType
							? (o.innerHTML = t.content)
							: (o.textContent = t.content),
					t.arrowTagName &&
						(r((i = e.createElement(t.arrowTagName)), t.arrowClassNames),
						n(i, t.arrowAttributes),
						o.appendChild(i)),
					t.parent.jquery ? t.parent[0] : t.parent);
			if ("string" == typeof i) {
				if (
					(1 < (i = e.querySelectorAll(t.parent)).length &&
						console.warn(
							"WARNING: the given `parent` query(" +
								t.parent +
								") matched more than one element, the first one will be used"
						),
					0 === i.length)
				)
					throw "ERROR: the given `parent` doesn't exists!";
				i = i[0];
			}
			return (
				1 < i.length &&
					i instanceof Element == !1 &&
					(console.warn(
						"WARNING: you have passed as parent a list of elements, the first one will be used"
					),
					(i = i[0])),
				i.appendChild(o),
				o
			);
			function r(e, t) {
				t.forEach(function (t) {
					e.classList.add(t);
				});
			}
			function n(e, t) {
				t.forEach(function (t) {
					e.setAttribute(t.split(":")[0], t.split(":")[1] || "");
				});
			}
		}),
		(t.prototype._getPosition = function (t, e) {
			l(e);
			return !this._options.forceAbsolute &&
				(function t(e) {
					if (e === p.document.body) return !1;
					if ("fixed" === o(e, "position")) return !0;
					return e.parentNode ? t(e.parentNode) : e;
				})(e)
				? "fixed"
				: "absolute";
		}),
		(t.prototype._getOffsets = function (t, e, o) {
			o = o.split("-")[0];
			var i = {},
				r = ((i.position = this.state.position), "fixed" === i.position),
				e = ((t, e, o) => {
					var t = s(t),
						i = s(e);
					return (
						o &&
							((o = a(e)),
							(i.top += o.scrollTop),
							(i.bottom += o.scrollTop),
							(i.left += o.scrollLeft),
							(i.right += o.scrollLeft)),
						{
							top: t.top - i.top,
							left: t.left - i.left,
							bottom: t.top - i.top + t.height,
							right: t.left - i.left + t.width,
							width: t.width,
							height: t.height
						}
					);
				})(e, l(t), r),
				r = h(t);
			return (
				-1 !== ["right", "left"].indexOf(o)
					? ((i.top = e.top + e.height / 2 - r.height / 2),
						(i.left = "left" === o ? e.left - r.width : e.right))
					: ((i.left = e.left + e.width / 2 - r.width / 2),
						(i.top = "top" === o ? e.top - r.height : e.bottom)),
				(i.width = r.width),
				(i.height = r.height),
				{ popper: i, reference: e }
			);
		}),
		(t.prototype._setupEventListeners = function () {
			var t;
			(this.state.updateBound = this.update.bind(this)),
				p.addEventListener("resize", this.state.updateBound),
				"window" !== this._options.boundariesElement &&
					((t =
						(t = a(this._reference)) !== p.document.body &&
						t !== p.document.documentElement
							? t
							: p).addEventListener("scroll", this.state.updateBound),
					(this.state.scrollTarget = t));
		}),
		(t.prototype._removeEventListeners = function () {
			p.removeEventListener("resize", this.state.updateBound),
				"window" !== this._options.boundariesElement &&
					this.state.scrollTarget &&
					(this.state.scrollTarget.removeEventListener("scroll", this.state.updateBound),
					(this.state.scrollTarget = null)),
				(this.state.updateBound = null);
		}),
		(t.prototype._getBoundaries = function (t, e, o) {
			var i,
				r,
				n,
				s = {};
			return (
				((s =
					"window" === o
						? ((n = p.document.body),
							(r = p.document.documentElement),
							(i = Math.max(
								n.scrollHeight,
								n.offsetHeight,
								r.clientHeight,
								r.scrollHeight,
								r.offsetHeight
							)),
							{
								top: 0,
								right: Math.max(
									n.scrollWidth,
									n.offsetWidth,
									r.clientWidth,
									r.scrollWidth,
									r.offsetWidth
								),
								bottom: i,
								left: 0
							})
						: "viewport" === o
							? ((n = l(this._popper)),
								(r = a(this._popper)),
								(i = c(n)),
								(n =
									"fixed" === t.offsets.popper.position
										? 0
										: (n = r) == document.body
											? Math.max(
													document.documentElement.scrollTop,
													document.body.scrollTop
												)
											: n.scrollTop),
								(r =
									"fixed" === t.offsets.popper.position
										? 0
										: (t = r) == document.body
											? Math.max(
													document.documentElement.scrollLeft,
													document.body.scrollLeft
												)
											: t.scrollLeft),
								{
									top: 0 - (i.top - n),
									right: p.document.documentElement.clientWidth - (i.left - r),
									bottom: p.document.documentElement.clientHeight - (i.top - n),
									left: 0 - (i.left - r)
								})
							: l(this._popper) === o
								? { top: 0, left: 0, right: o.clientWidth, bottom: o.clientHeight }
								: c(o)).left += e),
				(s.right -= e),
				(s.top = s.top + e),
				(s.bottom = s.bottom - e),
				s
			);
		}),
		(t.prototype.runModifiers = function (o, t, e) {
			t = t.slice();
			return (
				(t =
					void 0 !== e
						? this._options.modifiers.slice(0, i(this._options.modifiers, e))
						: t).forEach(
					function (t) {
						var e;
						(e = t) &&
							"[object Function]" === {}.toString.call(e) &&
							(o = t.call(this, o));
					}.bind(this)
				),
				o
			);
		}),
		(t.prototype.isModifierRequired = function (t, e) {
			t = i(this._options.modifiers, t);
			return !!this._options.modifiers.slice(0, t).filter(function (t) {
				return t === e;
			}).length;
		}),
		((t.prototype.modifiers = {}).applyStyle = function (t) {
			var e,
				o = { position: t.offsets.popper.position },
				i = Math.round(t.offsets.popper.left),
				r = Math.round(t.offsets.popper.top);
			return (
				this._options.gpuAcceleration && (e = u("transform"))
					? ((o[e] = "translate3d(" + i + "px, " + r + "px, 0)"),
						(o.top = 0),
						(o.left = 0))
					: ((o.left = i), (o.top = r)),
				Object.assign(o, t.styles),
				n(this._popper, o),
				this._popper.setAttribute("x-placement", t.placement),
				this.isModifierRequired(this.modifiers.applyStyle, this.modifiers.arrow) &&
					t.offsets.arrow &&
					n(t.arrowElement, t.offsets.arrow),
				t
			);
		}),
		(t.prototype.modifiers.shift = function (t) {
			var e,
				o,
				i = t.placement,
				r = i.split("-")[0],
				i = i.split("-")[1];
			return (
				i &&
					((o = t.offsets.reference),
					(e = d(t.offsets.popper)),
					(o = {
						y: { start: { top: o.top }, end: { top: o.top + o.height - e.height } },
						x: { start: { left: o.left }, end: { left: o.left + o.width - e.width } }
					}),
					(r = -1 !== ["bottom", "top"].indexOf(r) ? "x" : "y"),
					(t.offsets.popper = Object.assign(e, o[r][i]))),
				t
			);
		}),
		(t.prototype.modifiers.preventOverflow = function (e) {
			var t = this._options.preventOverflowOrder,
				o = d(e.offsets.popper),
				i = {
					left: function () {
						var t = o.left;
						return {
							left: (t =
								o.left < e.boundaries.left
									? Math.max(o.left, e.boundaries.left)
									: t)
						};
					},
					right: function () {
						var t = o.left;
						return {
							left: (t =
								o.right > e.boundaries.right
									? Math.min(o.left, e.boundaries.right - o.width)
									: t)
						};
					},
					top: function () {
						var t = o.top;
						return {
							top: (t =
								o.top < e.boundaries.top ? Math.max(o.top, e.boundaries.top) : t)
						};
					},
					bottom: function () {
						var t = o.top;
						return {
							top: (t =
								o.bottom > e.boundaries.bottom
									? Math.min(o.top, e.boundaries.bottom - o.height)
									: t)
						};
					}
				};
			return (
				t.forEach(function (t) {
					e.offsets.popper = Object.assign(o, i[t]());
				}),
				e
			);
		}),
		(t.prototype.modifiers.keepTogether = function (t) {
			var e = d(t.offsets.popper),
				o = t.offsets.reference,
				i = Math.floor;
			return (
				e.right < i(o.left) && (t.offsets.popper.left = i(o.left) - e.width),
				e.left > i(o.right) && (t.offsets.popper.left = i(o.right)),
				e.bottom < i(o.top) && (t.offsets.popper.top = i(o.top) - e.height),
				e.top > i(o.bottom) && (t.offsets.popper.top = i(o.bottom)),
				t
			);
		}),
		(t.prototype.modifiers.flip = function (i) {
			var r, n, s, p;
			return (
				this.isModifierRequired(this.modifiers.flip, this.modifiers.preventOverflow)
					? (i.flipped && i.placement === i._originalPlacement) ||
						((r = i.placement.split("-")[0]),
						(n = f(r)),
						(s = i.placement.split("-")[1] || ""),
						(p = []),
						(p =
							"flip" === this._options.flipBehavior
								? [r, n]
								: this._options.flipBehavior).forEach(
							function (t, e) {
								var o;
								r === t &&
									p.length !== e + 1 &&
									((r = i.placement.split("-")[0]),
									(n = f(r)),
									(t = d(i.offsets.popper)),
									((o = -1 !== ["right", "bottom"].indexOf(r)) &&
										Math.floor(i.offsets.reference[r]) > Math.floor(t[n])) ||
										(!o &&
											Math.floor(i.offsets.reference[r]) <
												Math.floor(t[n]))) &&
									((i.flipped = !0),
									(i.placement = p[e + 1]),
									s && (i.placement += "-" + s),
									(i.offsets.popper = this._getOffsets(
										this._popper,
										this._reference,
										i.placement
									).popper),
									(i = this.runModifiers(
										i,
										this._options.modifiers,
										this._flip
									)));
							}.bind(this)
						))
					: console.warn(
							"WARNING: preventOverflow modifier is required by flip modifier in order to work, be sure to include it before flip!"
						),
				i
			);
		}),
		(t.prototype.modifiers.offset = function (t) {
			var e = this._options.offset,
				o = t.offsets.popper;
			return (
				-1 !== t.placement.indexOf("left")
					? (o.top -= e)
					: -1 !== t.placement.indexOf("right")
						? (o.top += e)
						: -1 !== t.placement.indexOf("top")
							? (o.left -= e)
							: -1 !== t.placement.indexOf("bottom") && (o.left += e),
				t
			);
		}),
		(t.prototype.modifiers.arrow = function (t) {
			var e,
				o,
				i,
				r,
				n,
				s,
				p,
				f,
				l = this._options.arrowElement,
				a = this._options.arrowOffset;
			return (
				(l = "string" == typeof l ? this._popper.querySelector(l) : l) &&
					(this._popper.contains(l)
						? this.isModifierRequired(this.modifiers.arrow, this.modifiers.keepTogether)
							? ((e = {}),
								(f = t.placement.split("-")[0]),
								(o = d(t.offsets.popper)),
								(i = t.offsets.reference),
								(r = (f = -1 !== ["left", "right"].indexOf(f))
									? "height"
									: "width"),
								(n = f ? "top" : "left"),
								(s = f ? "left" : "top"),
								(f = f ? "bottom" : "right"),
								(p = h(l)[r]),
								i[f] - p < o[n] && (t.offsets.popper[n] -= o[n] - (i[f] - p)),
								i[n] + p > o[f] && (t.offsets.popper[n] += i[n] + p - o[f]),
								(f = i[n] + (a || i[r] / 2 - p / 2) - o[n]),
								(f = Math.max(Math.min(o[r] - p - 8, f), 8)),
								(e[n] = f),
								(e[s] = ""),
								(t.offsets.arrow = e),
								(t.arrowElement = l))
							: console.warn(
									"WARNING: keepTogether modifier is required by arrow modifier in order to work, be sure to include it before arrow!"
								)
						: console.warn(
								"WARNING: `arrowElement` must be child of its popper element!"
							)),
				t
			);
		}),
		Object.assign ||
			Object.defineProperty(Object, "assign", {
				enumerable: !1,
				configurable: !0,
				writable: !0,
				value: function (t) {
					if (null == t) throw new TypeError("Cannot convert first argument to object");
					for (var e = Object(t), o = 1; o < arguments.length; o++) {
						var i = arguments[o];
						if (null != i)
							for (
								var i = Object(i), r = Object.keys(i), n = 0, s = r.length;
								n < s;
								n++
							) {
								var p = r[n],
									f = Object.getOwnPropertyDescriptor(i, p);
								void 0 !== f && f.enumerable && (e[p] = i[p]);
							}
					}
					return e;
				}
			}),
		t
	);
});
