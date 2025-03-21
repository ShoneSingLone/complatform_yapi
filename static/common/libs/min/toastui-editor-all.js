((e, t) => {
	(e.toastui = e.toastui || {}), (e.toastui.Editor = t());
})(window, function () {
	var n = {
			368: function (e) {
				e.exports = (() => {
					var r = Object.hasOwnProperty,
						i = Object.setPrototypeOf,
						s = Object.isFrozen,
						o = Object.getPrototypeOf,
						a = Object.getOwnPropertyDescriptor,
						Ie = Object.freeze,
						e = Object.seal,
						l = Object.create,
						t = "undefined" != typeof Reflect && Reflect,
						c = t.apply,
						u = t.construct,
						Re =
							((c =
								c ||
								function (e, t, n) {
									return e.apply(t, n);
								}),
							(Ie =
								Ie ||
								function (e) {
									return e;
								}),
							(e =
								e ||
								function (e) {
									return e;
								}),
							(u =
								u ||
								function (e, t) {
									return new (Function.prototype.bind.apply(
										e,
										[null].concat(
											(e => {
												if (Array.isArray(e)) {
													for (
														var t = 0, n = Array(e.length);
														t < e.length;
														t++
													)
														n[t] = e[t];
													return n;
												}
												return Array.from(e);
											})(t)
										)
									))();
								}),
							d(Array.prototype.forEach)),
						Pe = d(Array.prototype.pop),
						Be = d(Array.prototype.push),
						Fe = d(String.prototype.toLowerCase),
						He = d(String.prototype.match),
						ze = d(String.prototype.replace),
						qe = d(String.prototype.indexOf),
						Ve = d(String.prototype.trim),
						je = d(RegExp.prototype.test),
						$e = (r =>
							function () {
								for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
									t[n] = arguments[n];
								return u(r, t);
							})(TypeError);
					function d(o) {
						return function (e) {
							for (
								var t = arguments.length, n = Array(1 < t ? t - 1 : 0), r = 1;
								r < t;
								r++
							)
								n[r - 1] = arguments[r];
							return c(o, e, n);
						};
					}
					function _e(e, t) {
						i && i(e, null);
						for (var n = t.length; n--; ) {
							var r,
								o = t[n];
							"string" == typeof o &&
								(r = Fe(o)) !== o &&
								(s(t) || (t[n] = r), (o = r)),
								(e[o] = !0);
						}
						return e;
					}
					function Ue(e) {
						var t = l(null),
							n = void 0;
						for (n in e) c(r, e, [n]) && (t[n] = e[n]);
						return t;
					}
					function We(e, t) {
						for (; null !== e; ) {
							var n = a(e, t);
							if (n) {
								if (n.get) return d(n.get);
								if ("function" == typeof n.value) return d(n.value);
							}
							e = o(e);
						}
						return function (e) {
							return console.warn("fallback value for", e), null;
						};
					}
					var Je = Ie([
							"a",
							"abbr",
							"acronym",
							"address",
							"area",
							"article",
							"aside",
							"audio",
							"b",
							"bdi",
							"bdo",
							"big",
							"blink",
							"blockquote",
							"body",
							"br",
							"button",
							"canvas",
							"caption",
							"center",
							"cite",
							"code",
							"col",
							"colgroup",
							"content",
							"data",
							"datalist",
							"dd",
							"decorator",
							"del",
							"details",
							"dfn",
							"dialog",
							"dir",
							"div",
							"dl",
							"dt",
							"element",
							"em",
							"fieldset",
							"figcaption",
							"figure",
							"font",
							"footer",
							"form",
							"h1",
							"h2",
							"h3",
							"h4",
							"h5",
							"h6",
							"head",
							"header",
							"hgroup",
							"hr",
							"html",
							"i",
							"img",
							"input",
							"ins",
							"kbd",
							"label",
							"legend",
							"li",
							"main",
							"map",
							"mark",
							"marquee",
							"menu",
							"menuitem",
							"meter",
							"nav",
							"nobr",
							"ol",
							"optgroup",
							"option",
							"output",
							"p",
							"picture",
							"pre",
							"progress",
							"q",
							"rp",
							"rt",
							"ruby",
							"s",
							"samp",
							"section",
							"select",
							"shadow",
							"small",
							"source",
							"spacer",
							"span",
							"strike",
							"strong",
							"style",
							"sub",
							"summary",
							"sup",
							"table",
							"tbody",
							"td",
							"template",
							"textarea",
							"tfoot",
							"th",
							"thead",
							"time",
							"tr",
							"track",
							"tt",
							"u",
							"ul",
							"var",
							"video",
							"wbr"
						]),
						Ge = Ie([
							"svg",
							"a",
							"altglyph",
							"altglyphdef",
							"altglyphitem",
							"animatecolor",
							"animatemotion",
							"animatetransform",
							"circle",
							"clippath",
							"defs",
							"desc",
							"ellipse",
							"filter",
							"font",
							"g",
							"glyph",
							"glyphref",
							"hkern",
							"image",
							"line",
							"lineargradient",
							"marker",
							"mask",
							"metadata",
							"mpath",
							"path",
							"pattern",
							"polygon",
							"polyline",
							"radialgradient",
							"rect",
							"stop",
							"style",
							"switch",
							"symbol",
							"text",
							"textpath",
							"title",
							"tref",
							"tspan",
							"view",
							"vkern"
						]),
						Ke = Ie([
							"feBlend",
							"feColorMatrix",
							"feComponentTransfer",
							"feComposite",
							"feConvolveMatrix",
							"feDiffuseLighting",
							"feDisplacementMap",
							"feDistantLight",
							"feFlood",
							"feFuncA",
							"feFuncB",
							"feFuncG",
							"feFuncR",
							"feGaussianBlur",
							"feMerge",
							"feMergeNode",
							"feMorphology",
							"feOffset",
							"fePointLight",
							"feSpecularLighting",
							"feSpotLight",
							"feTile",
							"feTurbulence"
						]),
						ot = Ie([
							"animate",
							"color-profile",
							"cursor",
							"discard",
							"fedropshadow",
							"feimage",
							"font-face",
							"font-face-format",
							"font-face-name",
							"font-face-src",
							"font-face-uri",
							"foreignobject",
							"hatch",
							"hatchpath",
							"mesh",
							"meshgradient",
							"meshpatch",
							"meshrow",
							"missing-glyph",
							"script",
							"set",
							"solidcolor",
							"unknown",
							"use"
						]),
						Ze = Ie([
							"math",
							"menclose",
							"merror",
							"mfenced",
							"mfrac",
							"mglyph",
							"mi",
							"mlabeledtr",
							"mmultiscripts",
							"mn",
							"mo",
							"mover",
							"mpadded",
							"mphantom",
							"mroot",
							"mrow",
							"ms",
							"mspace",
							"msqrt",
							"mstyle",
							"msub",
							"msup",
							"msubsup",
							"mtable",
							"mtd",
							"mtext",
							"mtr",
							"munder",
							"munderover"
						]),
						it = Ie([
							"maction",
							"maligngroup",
							"malignmark",
							"mlongdiv",
							"mscarries",
							"mscarry",
							"msgroup",
							"mstack",
							"msline",
							"msrow",
							"semantics",
							"annotation",
							"annotation-xml",
							"mprescripts",
							"none"
						]),
						Xe = Ie(["#text"]),
						Qe = Ie([
							"accept",
							"action",
							"align",
							"alt",
							"autocapitalize",
							"autocomplete",
							"autopictureinpicture",
							"autoplay",
							"background",
							"bgcolor",
							"border",
							"capture",
							"cellpadding",
							"cellspacing",
							"checked",
							"cite",
							"class",
							"clear",
							"color",
							"cols",
							"colspan",
							"controls",
							"controlslist",
							"coords",
							"crossorigin",
							"datetime",
							"decoding",
							"default",
							"dir",
							"disabled",
							"disablepictureinpicture",
							"disableremoteplayback",
							"download",
							"draggable",
							"enctype",
							"enterkeyhint",
							"face",
							"for",
							"headers",
							"height",
							"hidden",
							"high",
							"href",
							"hreflang",
							"id",
							"inputmode",
							"integrity",
							"ismap",
							"kind",
							"label",
							"lang",
							"list",
							"loading",
							"loop",
							"low",
							"max",
							"maxlength",
							"media",
							"method",
							"min",
							"minlength",
							"multiple",
							"muted",
							"name",
							"noshade",
							"novalidate",
							"nowrap",
							"open",
							"optimum",
							"pattern",
							"placeholder",
							"playsinline",
							"poster",
							"preload",
							"pubdate",
							"radiogroup",
							"readonly",
							"rel",
							"required",
							"rev",
							"reversed",
							"role",
							"rows",
							"rowspan",
							"spellcheck",
							"scope",
							"selected",
							"shape",
							"size",
							"sizes",
							"span",
							"srclang",
							"start",
							"src",
							"srcset",
							"step",
							"style",
							"summary",
							"tabindex",
							"title",
							"translate",
							"type",
							"usemap",
							"valign",
							"value",
							"width",
							"xmlns",
							"slot"
						]),
						Ye = Ie([
							"accent-height",
							"accumulate",
							"additive",
							"alignment-baseline",
							"ascent",
							"attributename",
							"attributetype",
							"azimuth",
							"basefrequency",
							"baseline-shift",
							"begin",
							"bias",
							"by",
							"class",
							"clip",
							"clippathunits",
							"clip-path",
							"clip-rule",
							"color",
							"color-interpolation",
							"color-interpolation-filters",
							"color-profile",
							"color-rendering",
							"cx",
							"cy",
							"d",
							"dx",
							"dy",
							"diffuseconstant",
							"direction",
							"display",
							"divisor",
							"dur",
							"edgemode",
							"elevation",
							"end",
							"fill",
							"fill-opacity",
							"fill-rule",
							"filter",
							"filterunits",
							"flood-color",
							"flood-opacity",
							"font-family",
							"font-size",
							"font-size-adjust",
							"font-stretch",
							"font-style",
							"font-variant",
							"font-weight",
							"fx",
							"fy",
							"g1",
							"g2",
							"glyph-name",
							"glyphref",
							"gradientunits",
							"gradienttransform",
							"height",
							"href",
							"id",
							"image-rendering",
							"in",
							"in2",
							"k",
							"k1",
							"k2",
							"k3",
							"k4",
							"kerning",
							"keypoints",
							"keysplines",
							"keytimes",
							"lang",
							"lengthadjust",
							"letter-spacing",
							"kernelmatrix",
							"kernelunitlength",
							"lighting-color",
							"local",
							"marker-end",
							"marker-mid",
							"marker-start",
							"markerheight",
							"markerunits",
							"markerwidth",
							"maskcontentunits",
							"maskunits",
							"max",
							"mask",
							"media",
							"method",
							"mode",
							"min",
							"name",
							"numoctaves",
							"offset",
							"operator",
							"opacity",
							"order",
							"orient",
							"orientation",
							"origin",
							"overflow",
							"paint-order",
							"path",
							"pathlength",
							"patterncontentunits",
							"patterntransform",
							"patternunits",
							"points",
							"preservealpha",
							"preserveaspectratio",
							"primitiveunits",
							"r",
							"rx",
							"ry",
							"radius",
							"refx",
							"refy",
							"repeatcount",
							"repeatdur",
							"restart",
							"result",
							"rotate",
							"scale",
							"seed",
							"shape-rendering",
							"specularconstant",
							"specularexponent",
							"spreadmethod",
							"startoffset",
							"stddeviation",
							"stitchtiles",
							"stop-color",
							"stop-opacity",
							"stroke-dasharray",
							"stroke-dashoffset",
							"stroke-linecap",
							"stroke-linejoin",
							"stroke-miterlimit",
							"stroke-opacity",
							"stroke",
							"stroke-width",
							"style",
							"surfacescale",
							"systemlanguage",
							"tabindex",
							"targetx",
							"targety",
							"transform",
							"text-anchor",
							"text-decoration",
							"text-rendering",
							"textlength",
							"type",
							"u1",
							"u2",
							"unicode",
							"values",
							"viewbox",
							"visibility",
							"version",
							"vert-adv-y",
							"vert-origin-x",
							"vert-origin-y",
							"width",
							"word-spacing",
							"wrap",
							"writing-mode",
							"xchannelselector",
							"ychannelselector",
							"x",
							"x1",
							"x2",
							"xmlns",
							"y",
							"y1",
							"y2",
							"z",
							"zoomandpan"
						]),
						et = Ie([
							"accent",
							"accentunder",
							"align",
							"bevelled",
							"close",
							"columnsalign",
							"columnlines",
							"columnspan",
							"denomalign",
							"depth",
							"dir",
							"display",
							"displaystyle",
							"encoding",
							"fence",
							"frame",
							"height",
							"href",
							"id",
							"largeop",
							"length",
							"linethickness",
							"lspace",
							"lquote",
							"mathbackground",
							"mathcolor",
							"mathsize",
							"mathvariant",
							"maxsize",
							"minsize",
							"movablelimits",
							"notation",
							"numalign",
							"open",
							"rowalign",
							"rowlines",
							"rowspacing",
							"rowspan",
							"rspace",
							"rquote",
							"scriptlevel",
							"scriptminsize",
							"scriptsizemultiplier",
							"selection",
							"separator",
							"separators",
							"stretchy",
							"subscriptshift",
							"supscriptshift",
							"symmetric",
							"voffset",
							"width",
							"xmlns"
						]),
						tt = Ie([
							"xlink:href",
							"xml:id",
							"xlink:title",
							"xml:space",
							"xmlns:xlink"
						]),
						st = e(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
						at = e(/<%[\s\S]*|[\s\S]*%>/gm),
						lt = e(/^data-[\-\w.\u00B7-\uFFFF]/),
						ct = e(/^aria-[\-\w]+$/),
						ut = e(
							/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
						),
						dt = e(/^(?:\w+script|data):/i),
						pt = e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
						nt =
							"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
								? function (e) {
										return typeof e;
									}
								: function (e) {
										return e &&
											"function" == typeof Symbol &&
											e.constructor === Symbol &&
											e !== Symbol.prototype
											? "symbol"
											: typeof e;
									};
					function rt(e) {
						if (Array.isArray(e)) {
							for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
							return n;
						}
						return Array.from(e);
					}
					return (function B(e) {
						var a =
								0 < arguments.length && void 0 !== e
									? e
									: "undefined" == typeof window
										? null
										: window,
							c = function (e) {
								return B(e);
							};
						if (
							((c.version = "2.3.3"),
							(c.removed = []),
							a && a.document && 9 === a.document.nodeType)
						) {
							var l = a.document,
								o = a.document,
								F = a.DocumentFragment,
								e = a.HTMLTemplateElement,
								u = a.Node,
								H = a.Element,
								t = a.NodeFilter,
								z =
									void 0 === (n = a.NamedNodeMap)
										? a.NamedNodeMap || a.MozNamedAttrMap
										: n,
								q = a.Text,
								V = a.Comment,
								j = a.DOMParser,
								n = a.trustedTypes,
								$ = We((r = H.prototype), "cloneNode"),
								_ = We(r, "nextSibling"),
								U = We(r, "childNodes"),
								d = We(r, "parentNode"),
								p =
									("function" == typeof e &&
										(r = o.createElement("template")).content &&
										r.content.ownerDocument &&
										(o = r.content.ownerDocument),
									((e, t) => {
										if (
											"object" !== (void 0 === e ? "undefined" : nt(e)) ||
											"function" != typeof e.createPolicy
										)
											return null;
										var n = null,
											r = "data-tt-policy-suffix",
											t =
												"dompurify" +
												((n =
													t.currentScript &&
													t.currentScript.hasAttribute(r)
														? t.currentScript.getAttribute(r)
														: n)
													? "#" + n
													: "");
										try {
											return e.createPolicy(t, {
												createHTML: function (e) {
													return e;
												}
											});
										} catch (e) {
											return (
												console.warn(
													"TrustedTypes policy " +
														t +
														" could not be created."
												),
												null
											);
										}
									})(n, l)),
								W = p && C ? p.createHTML("") : "",
								e = o,
								i = e.implementation,
								J = e.createNodeIterator,
								G = e.createDocumentFragment,
								K = e.getElementsByTagName,
								Z = l.importNode,
								r = {};
							try {
								r = Ue(o).documentMode ? o.documentMode : {};
							} catch (e) {}
							var X,
								s = {},
								h =
									((c.isSupported =
										"function" == typeof d &&
										i &&
										void 0 !== i.createHTMLDocument &&
										9 !== r),
									st),
								f = at,
								Q = lt,
								Y = ct,
								ee = dt,
								te = pt,
								m = ut,
								g = null,
								ne = _e({}, [].concat(rt(Je), rt(Ge), rt(Ke), rt(Ze), rt(Xe))),
								v = null,
								re = _e({}, [].concat(rt(Qe), rt(Ye), rt(et), rt(tt))),
								y = null,
								oe = null,
								ie = !0,
								se = !0,
								ae = !1,
								b = !1,
								w = !1,
								le = !1,
								ce = !1,
								k = !1,
								x = !1,
								ue = !0,
								C = !1,
								de = !0,
								pe = !0,
								T = !1,
								M = {},
								S = null,
								he = _e({}, [
									"annotation-xml",
									"audio",
									"colgroup",
									"desc",
									"foreignobject",
									"head",
									"iframe",
									"math",
									"mi",
									"mn",
									"mo",
									"ms",
									"mtext",
									"noembed",
									"noframes",
									"noscript",
									"plaintext",
									"script",
									"style",
									"svg",
									"template",
									"thead",
									"title",
									"video",
									"xmp"
								]),
								fe = null,
								me = _e({}, ["audio", "video", "img", "source", "image", "track"]),
								ge = null,
								ve = _e({}, [
									"alt",
									"class",
									"for",
									"id",
									"label",
									"name",
									"pattern",
									"placeholder",
									"role",
									"summary",
									"title",
									"value",
									"style",
									"xmlns"
								]),
								ye = "http://www.w3.org/1998/Math/MathML",
								be = "http://www.w3.org/2000/svg",
								E = "http://www.w3.org/1999/xhtml",
								N = E,
								O = void 0,
								we = ["application/xhtml+xml", "text/html"],
								D = void 0,
								A = null,
								ke = o.createElement("form"),
								xe = function (e) {
									(A && A === e) ||
										((e = Ue(
											(e =
												e &&
												"object" === (void 0 === e ? "undefined" : nt(e))
													? e
													: {})
										)),
										(g = "ALLOWED_TAGS" in e ? _e({}, e.ALLOWED_TAGS) : ne),
										(v = "ALLOWED_ATTR" in e ? _e({}, e.ALLOWED_ATTR) : re),
										(ge =
											"ADD_URI_SAFE_ATTR" in e
												? _e(Ue(ve), e.ADD_URI_SAFE_ATTR)
												: ve),
										(fe =
											"ADD_DATA_URI_TAGS" in e
												? _e(Ue(me), e.ADD_DATA_URI_TAGS)
												: me),
										(S =
											"FORBID_CONTENTS" in e
												? _e({}, e.FORBID_CONTENTS)
												: he),
										(y = "FORBID_TAGS" in e ? _e({}, e.FORBID_TAGS) : {}),
										(oe = "FORBID_ATTR" in e ? _e({}, e.FORBID_ATTR) : {}),
										(M = "USE_PROFILES" in e && e.USE_PROFILES),
										(ie = !1 !== e.ALLOW_ARIA_ATTR),
										(se = !1 !== e.ALLOW_DATA_ATTR),
										(ae = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
										(b = e.SAFE_FOR_TEMPLATES || !1),
										(w = e.WHOLE_DOCUMENT || !1),
										(k = e.RETURN_DOM || !1),
										(x = e.RETURN_DOM_FRAGMENT || !1),
										(ue = !1 !== e.RETURN_DOM_IMPORT),
										(C = e.RETURN_TRUSTED_TYPE || !1),
										(ce = e.FORCE_BODY || !1),
										(de = !1 !== e.SANITIZE_DOM),
										(pe = !1 !== e.KEEP_CONTENT),
										(T = e.IN_PLACE || !1),
										(m = e.ALLOWED_URI_REGEXP || m),
										(N = e.NAMESPACE || E),
										(O = O =
											-1 === we.indexOf(e.PARSER_MEDIA_TYPE)
												? "text/html"
												: e.PARSER_MEDIA_TYPE),
										(D =
											"application/xhtml+xml" === O
												? function (e) {
														return e;
													}
												: Fe),
										b && (se = !1),
										x && (k = !0),
										M &&
											((g = _e({}, [].concat(rt(Xe)))),
											(v = []),
											!0 === M.html && (_e(g, Je), _e(v, Qe)),
											!0 === M.svg && (_e(g, Ge), _e(v, Ye), _e(v, tt)),
											!0 === M.svgFilters &&
												(_e(g, Ke), _e(v, Ye), _e(v, tt)),
											!0 === M.mathMl) &&
											(_e(g, Ze), _e(v, et), _e(v, tt)),
										e.ADD_TAGS && _e((g = g === ne ? Ue(g) : g), e.ADD_TAGS),
										e.ADD_ATTR && _e((v = v === re ? Ue(v) : v), e.ADD_ATTR),
										e.ADD_URI_SAFE_ATTR && _e(ge, e.ADD_URI_SAFE_ATTR),
										e.FORBID_CONTENTS &&
											_e((S = S === he ? Ue(S) : S), e.FORBID_CONTENTS),
										pe && (g["#text"] = !0),
										w && _e(g, ["html", "head", "body"]),
										g.table && (_e(g, ["tbody"]), delete y.tbody),
										Ie && Ie(e),
										(A = e));
								},
								Ce = _e({}, ["mi", "mo", "mn", "ms", "mtext"]),
								Te = _e({}, ["foreignobject", "desc", "title", "annotation-xml"]),
								L = _e({}, Ge),
								Me = (_e(L, Ke), _e(L, ot), _e({}, Ze)),
								I =
									(_e(Me, it),
									function (t) {
										Be(c.removed, { element: t });
										try {
											t.parentNode.removeChild(t);
										} catch (e) {
											try {
												t.outerHTML = W;
											} catch (e) {
												t.remove();
											}
										}
									}),
								Se = function (e, t) {
									try {
										Be(c.removed, {
											attribute: t.getAttributeNode(e),
											from: t
										});
									} catch (e) {
										Be(c.removed, { attribute: null, from: t });
									}
									if ((t.removeAttribute(e), "is" === e && !v[e]))
										if (k || x)
											try {
												I(t);
											} catch (e) {}
										else
											try {
												t.setAttribute(e, "");
											} catch (e) {}
								},
								Ee = function (e) {
									var t = void 0,
										n = void 0,
										r =
											(ce
												? (e = "<remove></remove>" + e)
												: (n = (r = He(e, /^[\r\n\t ]+/)) && r[0]),
											"application/xhtml+xml" === O &&
												(e =
													'<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
													e +
													"</body></html>"),
											p ? p.createHTML(e) : e);
									if (N === E)
										try {
											t = new j().parseFromString(r, O);
										} catch (e) {}
									if (!t || !t.documentElement) {
										t = i.createDocument(N, "template", null);
										try {
											t.documentElement.innerHTML = X ? "" : r;
										} catch (e) {}
									}
									return (
										(r = t.body || t.documentElement),
										e &&
											n &&
											r.insertBefore(
												o.createTextNode(n),
												r.childNodes[0] || null
											),
										N === E
											? K.call(t, w ? "html" : "body")[0]
											: w
												? t.documentElement
												: r
									);
								},
								Ne = function (e) {
									return J.call(
										e.ownerDocument || e,
										e,
										t.SHOW_ELEMENT | t.SHOW_COMMENT | t.SHOW_TEXT,
										null,
										!1
									);
								},
								R = function (e) {
									return "object" === (void 0 === u ? "undefined" : nt(u))
										? e instanceof u
										: e &&
												"object" === (void 0 === e ? "undefined" : nt(e)) &&
												"number" == typeof e.nodeType &&
												"string" == typeof e.nodeName;
								},
								P = function (e, t, n) {
									s[e] &&
										Re(s[e], function (e) {
											e.call(c, t, n, A);
										});
								},
								Oe = function (e) {
									if (
										(P("beforeSanitizeElements", e, null),
										((i = e) instanceof q ||
											i instanceof V ||
											("string" == typeof i.nodeName &&
												"string" == typeof i.textContent &&
												"function" == typeof i.removeChild &&
												i.attributes instanceof z &&
												"function" == typeof i.removeAttribute &&
												"function" == typeof i.setAttribute &&
												"string" == typeof i.namespaceURI &&
												"function" == typeof i.insertBefore)) &&
											!He(e.nodeName, /[\u0080-\uFFFF]/))
									) {
										var t,
											n,
											r,
											o,
											i = D(e.nodeName);
										if (
											(P("uponSanitizeElement", e, {
												tagName: i,
												allowedTags: g
											}),
											(R(e.firstElementChild) ||
												(R(e.content) && R(e.content.firstElementChild)) ||
												!je(/<[/\w]/g, e.innerHTML) ||
												!je(/<[/\w]/g, e.textContent)) &&
												("select" !== i || !je(/<template/i, e.innerHTML)))
										) {
											if (g[i] && !y[i])
												return (e instanceof H &&
													(((n = d((t = e))) && n.tagName) ||
														(n = {
															namespaceURI: E,
															tagName: "template"
														}),
													(r = Fe(t.tagName)),
													(o = Fe(n.tagName)),
													t.namespaceURI === be
														? n.namespaceURI === E
															? "svg" !== r
															: n.namespaceURI === ye
																? "svg" !== r ||
																	("annotation-xml" !== o &&
																		!Ce[o])
																: !Boolean(L[r])
														: t.namespaceURI === ye
															? n.namespaceURI === E
																? "math" !== r
																: n.namespaceURI === be
																	? "math" !== r || !Te[o]
																	: !Boolean(Me[r])
															: t.namespaceURI !== E ||
																(n.namespaceURI === be && !Te[o]) ||
																(n.namespaceURI === ye && !Ce[o]) ||
																((n = _e({}, [
																	"title",
																	"style",
																	"font",
																	"a",
																	"script"
																])),
																Me[r]) ||
																(!n[r] && L[r]))) ||
													(("noscript" === i || "noembed" === i) &&
														je(/<\/no(script|embed)/i, e.innerHTML))
													? (I(e), !0)
													: (b &&
															3 === e.nodeType &&
															((t = e.textContent),
															(t = ze(t, h, " ")),
															(t = ze(t, f, " ")),
															e.textContent !== t) &&
															(Be(c.removed, {
																element: e.cloneNode()
															}),
															(e.textContent = t)),
														P("afterSanitizeElements", e, null),
														!1);
											if (pe && !S[i]) {
												var s = d(e) || e.parentNode,
													a = U(e) || e.childNodes;
												if (a && s)
													for (var l = a.length - 1; 0 <= l; --l)
														s.insertBefore($(a[l], !0), _(e));
											}
										}
									}
									return I(e), !0;
								},
								De = function (e, t, n) {
									if (de && ("id" === t || "name" === t) && (n in o || n in ke))
										return !1;
									if ((!se || oe[t] || !je(Q, t)) && (!ie || !je(Y, t))) {
										if (!v[t] || oe[t]) return !1;
										if (
											!ge[t] &&
											!je(m, ze(n, te, "")) &&
											(("src" !== t && "xlink:href" !== t && "href" !== t) ||
												"script" === e ||
												0 !== qe(n, "data:") ||
												!fe[e]) &&
											(!ae || je(ee, ze(n, te, ""))) &&
											n
										)
											return !1;
									}
									return !0;
								},
								Ae = function (e) {
									var t = void 0,
										n = void 0,
										r = (P("beforeSanitizeAttributes", e, null), e.attributes);
									if (r) {
										for (
											var o = {
													attrName: "",
													attrValue: "",
													keepAttr: !0,
													allowedAttributes: v
												},
												n = r.length;
											n--;

										) {
											var i = (a = r[n]).name,
												s = a.namespaceURI,
												t = Ve(a.value),
												a = D(i);
											if (
												((o.attrName = a),
												(o.attrValue = t),
												(o.keepAttr = !0),
												(o.forceKeepAttr = void 0),
												P("uponSanitizeAttribute", e, o),
												(t = o.attrValue),
												!o.forceKeepAttr && (Se(i, e), o.keepAttr))
											)
												if (je(/\/>/i, t)) Se(i, e);
												else {
													b && ((t = ze(t, h, " ")), (t = ze(t, f, " ")));
													var l = D(e.nodeName);
													if (De(l, a, t))
														try {
															s
																? e.setAttributeNS(s, i, t)
																: e.setAttribute(i, t),
																Pe(c.removed);
														} catch (e) {}
												}
										}
										P("afterSanitizeAttributes", e, null);
									}
								},
								Le = function e(t) {
									var n,
										r = Ne(t);
									for (
										P("beforeSanitizeShadowDOM", t, null);
										(n = r.nextNode());

									)
										P("uponSanitizeShadowNode", n, null),
											Oe(n) ||
												(n.content instanceof F && e(n.content), Ae(n));
									P("afterSanitizeShadowDOM", t, null);
								};
							(c.sanitize = function (e, t) {
								var n,
									r = void 0,
									o = void 0,
									i = void 0;
								if (
									"string" != typeof (e = (X = !e) ? "\x3c!--\x3e" : e) &&
									!R(e)
								) {
									if ("function" != typeof e.toString)
										throw $e("toString is not a function");
									if ("string" != typeof (e = e.toString()))
										throw $e("dirty is not a string, aborting");
								}
								if (!c.isSupported) {
									if (
										"object" === nt(a.toStaticHTML) ||
										"function" == typeof a.toStaticHTML
									) {
										if ("string" == typeof e) return a.toStaticHTML(e);
										if (R(e)) return a.toStaticHTML(e.outerHTML);
									}
									return e;
								}
								if (
									(le || xe(t),
									(c.removed = []),
									!(T = "string" != typeof e && T))
								)
									if (e instanceof u)
										(1 ===
											(t = (r = Ee("\x3c!----\x3e")).ownerDocument.importNode(
												e,
												!0
											)).nodeType &&
											"BODY" === t.nodeName) ||
										"HTML" === t.nodeName
											? (r = t)
											: r.appendChild(t);
									else {
										if (!k && !b && !w && -1 === e.indexOf("<"))
											return p && C ? p.createHTML(e) : e;
										if (!(r = Ee(e))) return k ? null : W;
									}
								r && ce && I(r.firstChild);
								for (var s = Ne(T ? e : r); (n = s.nextNode()); )
									(3 === n.nodeType && n === o) ||
										Oe(n) ||
										(n.content instanceof F && Le(n.content), Ae(n), (o = n));
								if (((o = null), T)) return e;
								if (k) {
									if (x)
										for (i = G.call(r.ownerDocument); r.firstChild; )
											i.appendChild(r.firstChild);
									else i = r;
									return (i = ue ? Z.call(l, i, !0) : i);
								}
								return (
									(t = w ? r.outerHTML : r.innerHTML),
									b && ((t = ze(t, h, " ")), (t = ze(t, f, " "))),
									p && C ? p.createHTML(t) : t
								);
							}),
								(c.setConfig = function (e) {
									xe(e), (le = !0);
								}),
								(c.clearConfig = function () {
									(A = null), (le = !1);
								}),
								(c.isValidAttribute = function (e, t, n) {
									return A || xe({}), (e = D(e)), (t = D(t)), De(e, t, n);
								}),
								(c.addHook = function (e, t) {
									"function" == typeof t && ((s[e] = s[e] || []), Be(s[e], t));
								}),
								(c.removeHook = function (e) {
									s[e] && Pe(s[e]);
								}),
								(c.removeHooks = function (e) {
									s[e] && (s[e] = []);
								}),
								(c.removeAllHooks = function () {
									s = {};
								});
						} else c.isSupported = !1;
						return c;
					})();
				})();
			},
			928: function (e, t, n) {
				var i = n(322);
				e.exports = function (e, t, n) {
					var r, o;
					if (((n = n || 0), i(t))) {
						if (Array.prototype.indexOf) return Array.prototype.indexOf.call(t, e, n);
						for (o = t.length, r = n; 0 <= n && r < o; r += 1) if (t[r] === e) return r;
					}
					return -1;
				};
			},
			690: function (e, t, n) {
				var r = n(322),
					o = n(893),
					i = n(956);
				e.exports = function (e, t, n) {
					(r(e) ? o : i)(e, t, n);
				};
			},
			893: function (e) {
				e.exports = function (e, t, n) {
					var r = 0,
						o = e.length;
					for (n = n || null; r < o && !1 !== t.call(n, e[r], r, e); r += 1);
				};
			},
			956: function (e) {
				e.exports = function (e, t, n) {
					for (var r in ((n = n || null), e))
						if (e.hasOwnProperty(r) && !1 === t.call(n, e[r], r, e)) break;
				};
			},
			354: function (e, t, n) {
				var r = n(893);
				e.exports = function (t) {
					var n;
					try {
						n = Array.prototype.slice.call(t);
					} catch (e) {
						(n = []),
							r(t, function (e) {
								n.push(e);
							});
					}
					return n;
				};
			},
			755: function (e) {
				var r = "_feEventKey";
				e.exports = function (e, t) {
					var n = e[r];
					return (e = (e = (n = n || (e[r] = {}))[t]) || (n[t] = []));
				};
			},
			349: function (e, t, n) {
				var r = n(758),
					s = n(690),
					a = n(755);
				function o(n, r, o) {
					var i,
						e = a(n, r);
					o
						? (s(e, function (e, t) {
								return o !== e.handler || (l(n, r, e.wrappedHandler), (i = t), !1);
							}),
							e.splice(i, 1))
						: (s(e, function (e) {
								l(n, r, e.wrappedHandler);
							}),
							e.splice(0, e.length));
				}
				function l(e, t, n) {
					"removeEventListener" in e
						? e.removeEventListener(t, n)
						: "detachEvent" in e && e.detachEvent("on" + t, n);
				}
				e.exports = function (n, e, t) {
					r(e)
						? s(e.split(/\s+/g), function (e) {
								o(n, e, t);
							})
						: s(e, function (e, t) {
								o(n, t, e);
							});
				};
			},
			348: function (e, t, n) {
				var o = n(758),
					c = n(690),
					u = n(755);
				function i(t, e, n, r) {
					function o(e) {
						n.call(r || t, e || window.event);
					}
					var i, s, a, l;
					"addEventListener" in t
						? t.addEventListener(e, o)
						: "attachEvent" in t && t.attachEvent("on" + e, o),
						(s = n),
						(a = o),
						(i = u((i = t), e)),
						(l = !1),
						c(i, function (e) {
							return e.handler !== s || !(l = !0);
						}),
						l || i.push({ handler: s, wrappedHandler: a });
				}
				e.exports = function (n, e, r, t) {
					o(e)
						? c(e.split(/\s+/g), function (e) {
								i(n, e, r, t);
							})
						: c(e, function (e, t) {
								i(n, t, e, r);
							});
				};
			},
			24: function (e, t, n) {
				var r = n(322),
					o = n(929);
				e.exports = function (e, t) {
					(t = (t = r(t) ? t.join(" ") : t).replace(
						/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
						""
					)),
						o(e.className.baseVal) ? (e.className = t) : (e.className.baseVal = t);
				};
			},
			204: function (e, t, n) {
				var o = n(690),
					i = n(928),
					s = n(902),
					a = n(24);
				e.exports = function (t) {
					var e = Array.prototype.slice.call(arguments, 1),
						n = t.classList,
						r = [];
					n
						? o(e, function (e) {
								t.classList.add(e);
							})
						: ((n = s(t)) && (e = [].concat(n.split(/\s+/), e)),
							o(e, function (e) {
								i(e, r) < 0 && r.push(e);
							}),
							a(t, r));
				};
			},
			522: function (e, t, n) {
				var o = n(758),
					i = n(690);
				e.exports = function (e, t, n) {
					var r = e.style;
					o(t)
						? (r[t] = n)
						: i(t, function (e, t) {
								r[t] = e;
							});
				};
			},
			902: function (e, t, n) {
				var r = n(929);
				e.exports = function (e) {
					return e && e.className
						? r(e.className.baseVal)
							? e.className
							: e.className.baseVal
						: "";
				};
			},
			714: function (e, t, n) {
				var r = n(928),
					o = n(902);
				e.exports = function (e, t) {
					return e.classList
						? e.classList.contains(t)
						: ((e = o(e).split(/\s+/)), -1 < r(t, e));
				};
			},
			471: function (e, t, n) {
				var r = n(928),
					o = n(354),
					n = Element.prototype,
					i =
						n.matches ||
						n.webkitMatchesSelector ||
						n.mozMatchesSelector ||
						n.msMatchesSelector ||
						function (e) {
							var t = this.document || this.ownerDocument;
							return -1 < r(this, o(t.querySelectorAll(e)));
						};
				e.exports = function (e, t) {
					return i.call(e, t);
				};
			},
			462: function (e, t, n) {
				var i = n(893),
					s = n(928),
					a = n(902),
					l = n(24);
				e.exports = function (e) {
					var t,
						n,
						r = Array.prototype.slice.call(arguments, 1),
						o = e.classList;
					o
						? i(r, function (e) {
								o.remove(e);
							})
						: ((t = a(e).split(/\s+/)),
							(n = []),
							i(t, function (e) {
								s(e, r) < 0 && n.push(e);
							}),
							l(e, n));
				};
			},
			969: function (e) {
				e.exports = function (e, t) {
					for (
						var n, r, o = Object.prototype.hasOwnProperty, i = 1, s = arguments.length;
						i < s;
						i += 1
					)
						for (r in (n = arguments[i])) o.call(n, r) && (e[r] = n[r]);
					return e;
				};
			},
			254: function (e, t, n) {
				var o = n(956);
				e.exports = function (e, t) {
					var n = document.createElement("img"),
						r = "";
					return (
						o(t, function (e, t) {
							r += "&" + t + "=" + e;
						}),
						(r = r.substring(1)),
						(n.src = e + "?" + r),
						(n.style.display = "none"),
						document.body.appendChild(n),
						document.body.removeChild(n),
						n
					);
				};
			},
			391: function (e, t, n) {
				var s = n(929),
					a = n(254),
					l = 6048e5;
				e.exports = function (e, t) {
					var n,
						r = location.hostname,
						o = "TOAST UI " + e + " for " + r + ": Statistics",
						i = window.localStorage.getItem(o);
					(!s(window.tui) && !1 === window.tui.usageStatistics) ||
						(i && ((i = i), (n = new Date().getTime()), !(l < n - i))) ||
						(window.localStorage.setItem(o, new Date().getTime()),
						setTimeout(function () {
							("interactive" !== document.readyState &&
								"complete" !== document.readyState) ||
								a("https://www.google-analytics.com/collect", {
									v: 1,
									t: "event",
									tid: t,
									cid: r,
									dp: r,
									dh: e,
									el: e,
									ec: "use"
								});
						}, 1e3));
				};
			},
			516: function (e) {
				e.exports = function (e, t) {
					var n, r;
					return (
						(t = t || 0),
						function () {
							(r = Array.prototype.slice.call(arguments)),
								window.clearTimeout(n),
								(n = window.setTimeout(function () {
									e.apply(null, r);
								}, t));
						}
					);
				};
			},
			423: function (e, t, n) {
				var c = n(516);
				e.exports = function (t, e) {
					function n(e) {
						t.apply(null, e), (r = null);
					}
					var r,
						o,
						i,
						s,
						a = !0;
					function l() {
						(s = Array.prototype.slice.call(arguments)),
							a
								? (n(s), (a = !1))
								: ((i = Number(new Date())),
									(r = r || i),
									o(s),
									e <= i - r && n(s));
					}
					return (
						(o = c(n, (e = e || 0))),
						(l.reset = function () {
							(a = !0), (r = null);
						}),
						l
					);
				};
			},
			322: function (e) {
				e.exports = function (e) {
					return e instanceof Array;
				};
			},
			326: function (e) {
				e.exports = function (e) {
					return "boolean" == typeof e || e instanceof Boolean;
				};
			},
			65: function (e, t, n) {
				var r = n(929),
					o = n(934);
				e.exports = function (e) {
					return !r(e) && !o(e);
				};
			},
			404: function (e, t, n) {
				var r = n(790);
				e.exports = function (e) {
					return !r(e);
				};
			},
			294: function (e) {
				e.exports = function (e) {
					return e instanceof Function;
				};
			},
			934: function (e) {
				e.exports = function (e) {
					return null === e;
				};
			},
			321: function (e) {
				e.exports = function (e) {
					return "number" == typeof e || e instanceof Number;
				};
			},
			73: function (e) {
				e.exports = function (e) {
					return e === Object(e);
				};
			},
			758: function (e) {
				e.exports = function (e) {
					return "string" == typeof e || e instanceof String;
				};
			},
			790: function (e, t, n) {
				var r = n(65);
				e.exports = function (e) {
					return r(e) && !1 !== e;
				};
			},
			929: function (e) {
				e.exports = function (e) {
					return void 0 === e;
				};
			}
		},
		r = {};
	function ye(e) {
		var t = r[e];
		return (
			void 0 !== t || ((t = r[e] = { exports: {} }), n[e].call(t.exports, t, t.exports, ye)),
			t.exports
		);
	}
	(ye.n = function (e) {
		var t =
			e && e.__esModule
				? function () {
						return e.default;
					}
				: function () {
						return e;
					};
		return ye.d(t, { a: t }), t;
	}),
		(ye.d = function (e, t) {
			for (var n in t)
				ye.o(t, n) &&
					!ye.o(e, n) &&
					Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
		}),
		(ye.g = (function () {
			if ("object" == typeof globalThis) return globalThis;
			try {
				return this || new Function("return this")();
			} catch (e) {
				if ("object" == typeof window) return window;
			}
		})()),
		(ye.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		});
	var et = {};
	{
		ye.d(et, {
			default: function () {
				return Hy;
			}
		});
		var tt = function (e, t) {
			return (tt =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array
					? function (e, t) {
							e.__proto__ = t;
						}
					: function (e, t) {
							for (var n in t)
								Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
						}))(e, t);
		};
		function be(e, t) {
			if ("function" != typeof t && null !== t)
				throw new TypeError(
					"Class extends value " + String(t) + " is not a constructor or null"
				);
			function n() {
				this.constructor = e;
			}
			tt(e, t),
				(e.prototype =
					null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
		}
		var we = function () {
			return (we =
				Object.assign ||
				function (e) {
					for (var t, n = 1, r = arguments.length; n < r; n++)
						for (var o in (t = arguments[n]))
							Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
					return e;
				}).apply(this, arguments);
		};
		function nt(e, t, n) {
			if (n || 2 === arguments.length)
				for (var r, o = 0, i = t.length; o < i; o++)
					(!r && o in t) || ((r = r || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
			return e.concat(r || Array.prototype.slice.call(t));
		}
		function ke(e, t) {
			return (
				Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : (e.raw = t),
				e
			);
		}
		function rt(e) {
			this.content = e;
		}
		Object.create,
			(rt.prototype = {
				constructor: rt,
				find: function (e) {
					for (var t = 0; t < this.content.length; t += 2)
						if (this.content[t] === e) return t;
					return -1;
				},
				get: function (e) {
					e = this.find(e);
					return -1 == e ? void 0 : this.content[e + 1];
				},
				update: function (e, t, n) {
					var r = n && n != e ? this.remove(n) : this,
						o = r.find(e),
						r = r.content.slice();
					return (
						-1 == o ? r.push(n || e, t) : ((r[o + 1] = t), n && (r[o] = n)), new rt(r)
					);
				},
				remove: function (e) {
					var t,
						e = this.find(e);
					return -1 == e ? this : ((t = this.content.slice()).splice(e, 2), new rt(t));
				},
				addToStart: function (e, t) {
					return new rt([e, t].concat(this.remove(e).content));
				},
				addToEnd: function (e, t) {
					var n = this.remove(e).content.slice();
					return n.push(e, t), new rt(n);
				},
				addBefore: function (e, t, n) {
					var r = this.remove(t),
						o = r.content.slice(),
						r = r.find(e);
					return o.splice(-1 == r ? o.length : r, 0, t, n), new rt(o);
				},
				forEach: function (e) {
					for (var t = 0; t < this.content.length; t += 2)
						e(this.content[t], this.content[t + 1]);
				},
				prepend: function (e) {
					return (e = rt.from(e)).size
						? new rt(e.content.concat(this.subtract(e).content))
						: this;
				},
				append: function (e) {
					return (e = rt.from(e)).size
						? new rt(this.subtract(e).content.concat(e.content))
						: this;
				},
				subtract: function (e) {
					var t = this;
					e = rt.from(e);
					for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
					return t;
				},
				get size() {
					return this.content.length >> 1;
				}
			}),
			(rt.from = function (e) {
				if (e instanceof rt) return e;
				var t = [];
				if (e) for (var n in e) t.push(n, e[n]);
				return new rt(t);
			});
		var ot = rt;
		class Je {
			constructor(t, e) {
				if (((this.content = t), (this.size = e || 0), null == e))
					for (let e = 0; e < t.length; e++) this.size += t[e].nodeSize;
			}
			nodesBetween(n, r, o, i = 0, s) {
				for (let e = 0, t = 0; t < r; e++) {
					var a,
						l = this.content[e],
						c = t + l.nodeSize;
					n < c &&
						!1 !== o(l, i + t, s || null, e) &&
						l.content.size &&
						((a = t + 1),
						l.nodesBetween(
							Math.max(0, n - a),
							Math.min(l.content.size, r - a),
							o,
							i + a
						)),
						(t = c);
				}
			}
			descendants(e) {
				this.nodesBetween(0, this.size, e);
			}
			textBetween(n, r, o, i) {
				let s = "",
					a = !0;
				return (
					this.nodesBetween(
						n,
						r,
						(e, t) => {
							e.isText
								? ((s += e.text.slice(Math.max(n, t) - t, r - t)), (a = !o))
								: e.isLeaf
									? (i
											? (s += "function" == typeof i ? i(e) : i)
											: e.type.spec.leafText &&
												(s += e.type.spec.leafText(e)),
										(a = !o))
									: !a && e.isBlock && ((s += o), (a = !0));
						},
						0
					),
					s
				);
			}
			append(e) {
				if (!e.size) return this;
				if (!this.size) return e;
				let t = this.lastChild,
					n = e.firstChild,
					r = this.content.slice(),
					o = 0;
				for (
					t.isText &&
					t.sameMarkup(n) &&
					((r[r.length - 1] = t.withText(t.text + n.text)), (o = 1));
					o < e.content.length;
					o++
				)
					r.push(e.content[o]);
				return new Je(r, this.size + e.size);
			}
			cut(o, i = this.size) {
				if (0 == o && i == this.size) return this;
				let s = [],
					a = 0;
				if (o < i)
					for (let n = 0, r = 0; r < i; n++) {
						let e = this.content[n],
							t = r + e.nodeSize;
						o < t &&
							((r < o || i < t) &&
								(e = e.isText
									? e.cut(Math.max(0, o - r), Math.min(e.text.length, i - r))
									: e.cut(
											Math.max(0, o - r - 1),
											Math.min(e.content.size, i - r - 1)
										)),
							s.push(e),
							(a += e.nodeSize)),
							(r = t);
					}
				return new Je(s, a);
			}
			cutByIndex(e, t) {
				return e == t
					? Je.empty
					: 0 == e && t == this.content.length
						? this
						: new Je(this.content.slice(e, t));
			}
			replaceChild(e, t) {
				var n,
					r = this.content[e];
				return r == t
					? this
					: ((n = this.content.slice()),
						(r = this.size + t.nodeSize - r.nodeSize),
						(n[e] = t),
						new Je(n, r));
			}
			addToStart(e) {
				return new Je([e].concat(this.content), this.size + e.nodeSize);
			}
			addToEnd(e) {
				return new Je(this.content.concat(e), this.size + e.nodeSize);
			}
			eq(t) {
				if (this.content.length != t.content.length) return !1;
				for (let e = 0; e < this.content.length; e++)
					if (!this.content[e].eq(t.content[e])) return !1;
				return !0;
			}
			get firstChild() {
				return this.content.length ? this.content[0] : null;
			}
			get lastChild() {
				return this.content.length ? this.content[this.content.length - 1] : null;
			}
			get childCount() {
				return this.content.length;
			}
			child(e) {
				var t = this.content[e];
				if (t) return t;
				throw new RangeError("Index " + e + " out of range for " + this);
			}
			maybeChild(e) {
				return this.content[e] || null;
			}
			forEach(n) {
				for (let e = 0, t = 0; e < this.content.length; e++) {
					var r = this.content[e];
					n(r, t, e), (t += r.nodeSize);
				}
			}
			findDiffStart(e, t = 0) {
				return (function t(n, r, o) {
					for (let e = 0; ; e++) {
						if (e == n.childCount || e == r.childCount)
							return n.childCount == r.childCount ? null : o;
						var i = n.child(e),
							s = r.child(e);
						if (i != s) {
							if (!i.sameMarkup(s)) return o;
							if (i.isText && i.text != s.text) {
								for (let e = 0; i.text[e] == s.text[e]; e++) o++;
								return o;
							}
							if (i.content.size || s.content.size) {
								var a = t(i.content, s.content, o + 1);
								if (null != a) return a;
							}
						}
						o += i.nodeSize;
					}
				})(this, e, t);
			}
			findDiffEnd(e, t = this.size, n = e.size) {
				return (function n(r, o, i, s) {
					for (let e = r.childCount, t = o.childCount; ; ) {
						if (0 == e || 0 == t) return e == t ? null : { a: i, b: s };
						var a = r.child(--e),
							l = o.child(--t),
							c = a.nodeSize;
						if (a != l) {
							if (!a.sameMarkup(l)) return { a: i, b: s };
							if (a.isText && a.text != l.text) {
								let e = 0,
									t = Math.min(a.text.length, l.text.length);
								for (
									;
									e < t &&
									a.text[a.text.length - e - 1] == l.text[l.text.length - e - 1];

								)
									e++, i--, s--;
								return { a: i, b: s };
							}
							if (a.content.size || l.content.size) {
								var u = n(a.content, l.content, i - 1, s - 1);
								if (u) return u;
							}
						}
						(i -= c), (s -= c);
					}
				})(this, e, t, n);
			}
			findIndex(n, r = -1) {
				if (0 == n) return it(0, n);
				if (n == this.size) return it(this.content.length, n);
				if (n > this.size || n < 0)
					throw new RangeError(`Position ${n} outside of fragment (${this})`);
				for (let e = 0, t = 0; ; e++) {
					var o = this.child(e),
						o = t + o.nodeSize;
					if (n <= o) return o == n || 0 < r ? it(e + 1, o) : it(e, t);
					t = o;
				}
			}
			toString() {
				return "<" + this.toStringInner() + ">";
			}
			toStringInner() {
				return this.content.join(", ");
			}
			toJSON() {
				return this.content.length ? this.content.map(e => e.toJSON()) : null;
			}
			static fromJSON(e, t) {
				if (!t) return Je.empty;
				if (Array.isArray(t)) return new Je(t.map(e.nodeFromJSON));
				throw new RangeError("Invalid input for Fragment.fromJSON");
			}
			static fromArray(t) {
				if (!t.length) return Je.empty;
				let n,
					r = 0;
				for (let e = 0; e < t.length; e++) {
					var o = t[e];
					(r += o.nodeSize),
						e && o.isText && t[e - 1].sameMarkup(o)
							? ((n = n || t.slice(0, e))[n.length - 1] = o.withText(
									n[n.length - 1].text + o.text
								))
							: n && n.push(o);
				}
				return new Je(n || t, r);
			}
			static from(e) {
				if (!e) return Je.empty;
				if (e instanceof Je) return e;
				if (Array.isArray(e)) return this.fromArray(e);
				if (e.attrs) return new Je([e], e.nodeSize);
				throw new RangeError(
					"Can not convert " +
						e +
						" to a Fragment" +
						(e.nodesBetween
							? " (looks like multiple versions of prosemirror-model were loaded)"
							: "")
				);
			}
		}
		Je.empty = new Je([], 0);
		let n = { index: 0, offset: 0 };
		function it(e, t) {
			return (n.index = e), (n.offset = t), n;
		}
		function st(t, n) {
			if (t !== n) {
				if (!t || "object" != typeof t || !n || "object" != typeof n) return !1;
				var e = Array.isArray(t);
				if (Array.isArray(n) != e) return !1;
				if (e) {
					if (t.length != n.length) return !1;
					for (let e = 0; e < t.length; e++) if (!st(t[e], n[e])) return !1;
				} else {
					for (var r in t) if (!(r in n && st(t[r], n[r]))) return !1;
					for (var o in n) if (!(o in t)) return !1;
				}
			}
			return !0;
		}
		class Ge {
			constructor(e, t) {
				(this.type = e), (this.attrs = t);
			}
			addToSet(t) {
				let n,
					r = !1;
				for (let e = 0; e < t.length; e++) {
					var o = t[e];
					if (this.eq(o)) return t;
					if (this.type.excludes(o.type)) n = n || t.slice(0, e);
					else {
						if (o.type.excludes(this.type)) return t;
						!r &&
							o.type.rank > this.type.rank &&
							((n = n || t.slice(0, e)).push(this), (r = !0)),
							n && n.push(o);
					}
				}
				return (n = n || t.slice()), r || n.push(this), n;
			}
			removeFromSet(t) {
				for (let e = 0; e < t.length; e++)
					if (this.eq(t[e])) return t.slice(0, e).concat(t.slice(e + 1));
				return t;
			}
			isInSet(t) {
				for (let e = 0; e < t.length; e++) if (this.eq(t[e])) return !0;
				return !1;
			}
			eq(e) {
				return this == e || (this.type == e.type && st(this.attrs, e.attrs));
			}
			toJSON() {
				var e,
					t = { type: this.type.name };
				for (e in this.attrs) {
					t.attrs = this.attrs;
					break;
				}
				return t;
			}
			static fromJSON(e, t) {
				if (!t) throw new RangeError("Invalid input for Mark.fromJSON");
				e = e.marks[t.type];
				if (e) return e.create(t.attrs);
				throw new RangeError(`There is no mark type ${t.type} in this schema`);
			}
			static sameSet(t, n) {
				if (t != n) {
					if (t.length != n.length) return !1;
					for (let e = 0; e < t.length; e++) if (!t[e].eq(n[e])) return !1;
				}
				return !0;
			}
			static setFrom(e) {
				return !e || (Array.isArray(e) && 0 == e.length)
					? Ge.none
					: e instanceof Ge
						? [e]
						: ((e = e.slice()).sort((e, t) => e.type.rank - t.type.rank), e);
			}
		}
		Ge.none = [];
		class zy extends Error {}
		class Ke {
			constructor(e, t, n) {
				(this.content = e), (this.openStart = t), (this.openEnd = n);
			}
			get size() {
				return this.content.size - this.openStart - this.openEnd;
			}
			insertAt(e, t) {
				e = (function e(t, n, r, o) {
					let { index: i, offset: s } = t.findIndex(n),
						a = t.maybeChild(i);
					if (s == n || a.isText)
						return o && !o.canReplace(i, i, r)
							? null
							: t.cut(0, n).append(r).append(t.cut(n));
					let l = e(a.content, n - s - 1, r);
					return l && t.replaceChild(i, a.copy(l));
				})(this.content, e + this.openStart, t);
				return e && new Ke(e, this.openStart, this.openEnd);
			}
			removeBetween(e, t) {
				return new Ke(
					(function e(t, n, r) {
						let { index: o, offset: i } = t.findIndex(n),
							s = t.maybeChild(o);
						let { index: a, offset: l } = t.findIndex(r);
						if (i == n || s.isText) {
							if (l == r || t.child(a).isText) return t.cut(0, n).append(t.cut(r));
							throw new RangeError("Removing non-flat range");
						}
						if (o != a) throw new RangeError("Removing non-flat range");
						return t.replaceChild(o, s.copy(e(s.content, n - i - 1, r - i - 1)));
					})(this.content, e + this.openStart, t + this.openStart),
					this.openStart,
					this.openEnd
				);
			}
			eq(e) {
				return (
					this.content.eq(e.content) &&
					this.openStart == e.openStart &&
					this.openEnd == e.openEnd
				);
			}
			toString() {
				return this.content + "(" + this.openStart + "," + this.openEnd + ")";
			}
			toJSON() {
				var e;
				return this.content.size
					? ((e = { content: this.content.toJSON() }),
						0 < this.openStart && (e.openStart = this.openStart),
						0 < this.openEnd && (e.openEnd = this.openEnd),
						e)
					: null;
			}
			static fromJSON(e, t) {
				if (!t) return Ke.empty;
				var n = t.openStart || 0,
					r = t.openEnd || 0;
				if ("number" != typeof n || "number" != typeof r)
					throw new RangeError("Invalid input for Slice.fromJSON");
				return new Ke(Je.fromJSON(e, t.content), n, r);
			}
			static maxOpen(t, n = !0) {
				let r = 0,
					o = 0;
				for (
					let e = t.firstChild;
					e && !e.isLeaf && (n || !e.type.spec.isolating);
					e = e.firstChild
				)
					r++;
				for (
					let e = t.lastChild;
					e && !e.isLeaf && (n || !e.type.spec.isolating);
					e = e.lastChild
				)
					o++;
				return new Ke(t, r, o);
			}
		}
		function at(e, t, n) {
			if (n.openStart > e.depth)
				throw new zy("Inserted content deeper than insertion position");
			if (e.depth - n.openStart != t.depth - n.openEnd)
				throw new zy("Inconsistent open depths");
			return (function t(n, r, o, i) {
				let s = n.index(i),
					a = n.node(i);
				{
					if (s == r.index(i) && i < n.depth - o.openStart) {
						let e = t(n, r, o, i + 1);
						return a.copy(a.content.replaceChild(s, e));
					}
					if (o.content.size) {
						if (o.openStart || o.openEnd || n.depth != i || r.depth != i) {
							let { start: e, end: t } = mt(o, n);
							return pt(a, ht(n, e, t, r, i));
						}
						{
							let e = n.parent,
								t = e.content;
							return pt(
								e,
								t
									.cut(0, n.parentOffset)
									.append(o.content)
									.append(t.cut(r.parentOffset))
							);
						}
					}
					return pt(a, ft(n, r, i));
				}
			})(e, t, n, 0);
		}
		function lt(e, t) {
			if (!t.type.compatibleContent(e.type))
				throw new zy("Cannot join " + t.type.name + " onto " + e.type.name);
		}
		function ct(e, t, n) {
			e = e.node(n);
			return lt(e, t.node(n)), e;
		}
		function ut(e, t) {
			var n = t.length - 1;
			0 <= n && e.isText && e.sameMarkup(t[n])
				? (t[n] = e.withText(t[n].text + e.text))
				: t.push(e);
		}
		function dt(e, t, n, r) {
			var o = (t || e).node(n);
			let i = 0,
				s = t ? t.index(n) : o.childCount;
			e && ((i = e.index(n)), e.depth > n ? i++ : e.textOffset && (ut(e.nodeAfter, r), i++));
			for (let e = i; e < s; e++) ut(o.child(e), r);
			t && t.depth == n && t.textOffset && ut(t.nodeBefore, r);
		}
		function pt(e, t) {
			if (e.type.validContent(t)) return e.copy(t);
			throw new zy("Invalid content for node " + e.type.name);
		}
		function ht(e, t, n, r, o) {
			var i = e.depth > o && ct(e, t, o + 1),
				s = r.depth > o && ct(n, r, o + 1),
				a = [];
			return (
				dt(null, e, o, a),
				i && s && t.index(o) == n.index(o)
					? (lt(i, s), ut(pt(i, ht(e, t, n, r, o + 1)), a))
					: (i && ut(pt(i, ft(e, t, o + 1)), a),
						dt(t, n, o, a),
						s && ut(pt(s, ft(n, r, o + 1)), a)),
				dt(r, null, o, a),
				new Je(a)
			);
		}
		function ft(e, t, n) {
			var r = [];
			return (
				dt(null, e, n, r),
				e.depth > n && ut(pt(ct(e, t, n + 1), ft(e, t, n + 1)), r),
				dt(t, null, n, r),
				new Je(r)
			);
		}
		function mt(e, t) {
			var n = t.depth - e.openStart;
			let r = t.node(n).copy(e.content);
			for (let e = n - 1; 0 <= e; e--) r = t.node(e).copy(Je.from(r));
			return {
				start: r.resolveNoCache(e.openStart + n),
				end: r.resolveNoCache(r.content.size - e.openEnd - n)
			};
		}
		Ke.empty = new Ke(Je.empty, 0, 0);
		class qy {
			constructor(e, t, n) {
				(this.pos = e),
					(this.path = t),
					(this.parentOffset = n),
					(this.depth = t.length / 3 - 1);
			}
			resolveDepth(e) {
				return null == e ? this.depth : e < 0 ? this.depth + e : e;
			}
			get parent() {
				return this.node(this.depth);
			}
			get doc() {
				return this.node(0);
			}
			node(e) {
				return this.path[3 * this.resolveDepth(e)];
			}
			index(e) {
				return this.path[3 * this.resolveDepth(e) + 1];
			}
			indexAfter(e) {
				return (
					(e = this.resolveDepth(e)),
					this.index(e) + (e != this.depth || this.textOffset ? 1 : 0)
				);
			}
			start(e) {
				return 0 == (e = this.resolveDepth(e)) ? 0 : this.path[3 * e - 1] + 1;
			}
			end(e) {
				return (e = this.resolveDepth(e)), this.start(e) + this.node(e).content.size;
			}
			before(e) {
				if ((e = this.resolveDepth(e)))
					return e == this.depth + 1 ? this.pos : this.path[3 * e - 1];
				throw new RangeError("There is no position before the top-level node");
			}
			after(e) {
				if ((e = this.resolveDepth(e)))
					return e == this.depth + 1
						? this.pos
						: this.path[3 * e - 1] + this.path[3 * e].nodeSize;
				throw new RangeError("There is no position after the top-level node");
			}
			get textOffset() {
				return this.pos - this.path[this.path.length - 1];
			}
			get nodeAfter() {
				var e,
					t,
					n = this.parent,
					r = this.index(this.depth);
				return r == n.childCount
					? null
					: ((e = this.pos - this.path[this.path.length - 1]),
						(t = n.child(r)),
						e ? n.child(r).cut(e) : t);
			}
			get nodeBefore() {
				var e = this.index(this.depth),
					t = this.pos - this.path[this.path.length - 1];
				return t
					? this.parent.child(e).cut(0, t)
					: 0 == e
						? null
						: this.parent.child(e - 1);
			}
			posAtIndex(t, e) {
				e = this.resolveDepth(e);
				let n = this.path[3 * e],
					r = 0 == e ? 0 : this.path[3 * e - 1] + 1;
				for (let e = 0; e < t; e++) r += n.child(e).nodeSize;
				return r;
			}
			marks() {
				var e = this.parent,
					t = this.index();
				if (0 == e.content.size) return Ge.none;
				if (this.textOffset) return e.child(t).marks;
				let n = e.maybeChild(t - 1),
					r = e.maybeChild(t),
					o = (n || ((e = n), (n = r), (r = e)), n.marks);
				for (var i = 0; i < o.length; i++)
					!1 !== o[i].type.spec.inclusive ||
						(r && o[i].isInSet(r.marks)) ||
						(o = o[i--].removeFromSet(o));
				return o;
			}
			marksAcross(e) {
				var t = this.parent.maybeChild(this.index());
				if (!t || !t.isInline) return null;
				let n = t.marks,
					r = e.parent.maybeChild(e.index());
				for (var o = 0; o < n.length; o++)
					!1 !== n[o].type.spec.inclusive ||
						(r && n[o].isInSet(r.marks)) ||
						(n = n[o--].removeFromSet(n));
				return n;
			}
			sharedDepth(t) {
				for (let e = this.depth; 0 < e; e--)
					if (this.start(e) <= t && this.end(e) >= t) return e;
				return 0;
			}
			blockRange(t = this, n) {
				if (t.pos < this.pos) return t.blockRange(this);
				for (
					let e = this.depth - (this.parent.inlineContent || this.pos == t.pos ? 1 : 0);
					0 <= e;
					e--
				)
					if (t.pos <= this.end(e) && (!n || n(this.node(e)))) return new Vy(this, t, e);
				return null;
			}
			sameParent(e) {
				return this.pos - this.parentOffset == e.pos - e.parentOffset;
			}
			max(e) {
				return e.pos > this.pos ? e : this;
			}
			min(e) {
				return e.pos < this.pos ? e : this;
			}
			toString() {
				let t = "";
				for (let e = 1; e <= this.depth; e++)
					t += (t ? "/" : "") + this.node(e).type.name + "_" + this.index(e - 1);
				return t + ":" + this.parentOffset;
			}
			static resolve(t, e) {
				if (!(0 <= e && e <= t.content.size))
					throw new RangeError("Position " + e + " out of range");
				var n = [];
				let r = 0,
					o = e;
				for (let e = t; ; ) {
					var { index: i, offset: s } = e.content.findIndex(o),
						a = o - s;
					if ((n.push(e, i, r + s), !a)) break;
					if ((e = e.child(i)).isText) break;
					(o = a - 1), (r += s + 1);
				}
				return new qy(e, n, o);
			}
			static resolveCached(t, n) {
				for (let e = 0; e < o.length; e++) {
					var r = o[e];
					if (r.pos == n && r.doc == t) return r;
				}
				var e = (o[i] = qy.resolve(t, n));
				return (i = (i + 1) % B), e;
			}
		}
		let o = [],
			i = 0,
			B = 12;
		class Vy {
			constructor(e, t, n) {
				(this.$from = e), (this.$to = t), (this.depth = n);
			}
			get start() {
				return this.$from.before(this.depth + 1);
			}
			get end() {
				return this.$to.after(this.depth + 1);
			}
			get parent() {
				return this.$from.node(this.depth);
			}
			get startIndex() {
				return this.$from.index(this.depth);
			}
			get endIndex() {
				return this.$to.indexAfter(this.depth);
			}
		}
		let F = Object.create(null);
		class jy {
			constructor(e, t, n, r = Ge.none) {
				(this.type = e), (this.attrs = t), (this.marks = r), (this.content = n || Je.empty);
			}
			get nodeSize() {
				return this.isLeaf ? 1 : 2 + this.content.size;
			}
			get childCount() {
				return this.content.childCount;
			}
			child(e) {
				return this.content.child(e);
			}
			maybeChild(e) {
				return this.content.maybeChild(e);
			}
			forEach(e) {
				this.content.forEach(e);
			}
			nodesBetween(e, t, n, r = 0) {
				this.content.nodesBetween(e, t, n, r, this);
			}
			descendants(e) {
				this.nodesBetween(0, this.content.size, e);
			}
			get textContent() {
				return this.isLeaf && this.type.spec.leafText
					? this.type.spec.leafText(this)
					: this.textBetween(0, this.content.size, "");
			}
			textBetween(e, t, n, r) {
				return this.content.textBetween(e, t, n, r);
			}
			get firstChild() {
				return this.content.firstChild;
			}
			get lastChild() {
				return this.content.lastChild;
			}
			eq(e) {
				return this == e || (this.sameMarkup(e) && this.content.eq(e.content));
			}
			sameMarkup(e) {
				return this.hasMarkup(e.type, e.attrs, e.marks);
			}
			hasMarkup(e, t, n) {
				return (
					this.type == e &&
					st(this.attrs, t || e.defaultAttrs || F) &&
					Ge.sameSet(this.marks, n || Ge.none)
				);
			}
			copy(e = null) {
				return e == this.content ? this : new jy(this.type, this.attrs, e, this.marks);
			}
			mark(e) {
				return e == this.marks ? this : new jy(this.type, this.attrs, this.content, e);
			}
			cut(e, t = this.content.size) {
				return 0 == e && t == this.content.size ? this : this.copy(this.content.cut(e, t));
			}
			slice(e, t = this.content.size, n = !1) {
				var r;
				return e == t
					? Ke.empty
					: ((e = this.resolve(e)),
						(r = this.resolve(t)),
						(n = n ? 0 : e.sharedDepth(t)),
						(t = e.start(n)),
						(t = e.node(n).content.cut(e.pos - t, r.pos - t)),
						new Ke(t, e.depth - n, r.depth - n));
			}
			replace(e, t, n) {
				return at(this.resolve(e), this.resolve(t), n);
			}
			nodeAt(t) {
				for (let e = this; ; ) {
					var { index: n, offset: r } = e.content.findIndex(t);
					if (!(e = e.maybeChild(n))) return null;
					if (r == t || e.isText) return e;
					t -= r + 1;
				}
			}
			childAfter(e) {
				var { index: e, offset: t } = this.content.findIndex(e);
				return { node: this.content.maybeChild(e), index: e, offset: t };
			}
			childBefore(e) {
				var t, n;
				return 0 == e
					? { node: null, index: 0, offset: 0 }
					: (({ index: t, offset: n } = this.content.findIndex(e)),
						n < e
							? { node: this.content.child(t), index: t, offset: n }
							: {
									node: (e = this.content.child(t - 1)),
									index: t - 1,
									offset: n - e.nodeSize
								});
			}
			resolve(e) {
				return qy.resolveCached(this, e);
			}
			resolveNoCache(e) {
				return qy.resolve(this, e);
			}
			rangeHasMark(e, t, n) {
				let r = !1;
				return e < t && this.nodesBetween(e, t, e => !(r = n.isInSet(e.marks) ? !0 : r)), r;
			}
			get isBlock() {
				return this.type.isBlock;
			}
			get isTextblock() {
				return this.type.isTextblock;
			}
			get inlineContent() {
				return this.type.inlineContent;
			}
			get isInline() {
				return this.type.isInline;
			}
			get isText() {
				return this.type.isText;
			}
			get isLeaf() {
				return this.type.isLeaf;
			}
			get isAtom() {
				return this.type.isAtom;
			}
			toString() {
				if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
				let e = this.type.name;
				return (
					this.content.size && (e += "(" + this.content.toStringInner() + ")"),
					gt(this.marks, e)
				);
			}
			contentMatchAt(e) {
				e = this.type.contentMatch.matchFragment(this.content, 0, e);
				if (e) return e;
				throw new Error("Called contentMatchAt on a node with invalid content");
			}
			canReplace(e, t, n = Je.empty, r = 0, o = n.childCount) {
				(e = this.contentMatchAt(e).matchFragment(n, r, o)),
					(e = e && e.matchFragment(this.content, t));
				if (!e || !e.validEnd) return !1;
				for (let e = r; e < o; e++) if (!this.type.allowsMarks(n.child(e).marks)) return !1;
				return !0;
			}
			canReplaceWith(e, t, n, r) {
				return (
					!(
						(r && !this.type.allowsMarks(r)) ||
						!(e =
							(r = this.contentMatchAt(e).matchType(n)) &&
							r.matchFragment(this.content, t))
					) && e.validEnd
				);
			}
			canAppend(e) {
				return e.content.size
					? this.canReplace(this.childCount, this.childCount, e.content)
					: this.type.compatibleContent(e.type);
			}
			check() {
				if (!this.type.validContent(this.content))
					throw new RangeError(
						`Invalid content for node ${this.type.name}: ` +
							this.content.toString().slice(0, 50)
					);
				let t = Ge.none;
				for (let e = 0; e < this.marks.length; e++) t = this.marks[e].addToSet(t);
				if (!Ge.sameSet(t, this.marks))
					throw new RangeError(
						`Invalid collection of marks for node ${this.type.name}: ` +
							this.marks.map(e => e.type.name)
					);
				this.content.forEach(e => e.check());
			}
			toJSON() {
				var e,
					t = { type: this.type.name };
				for (e in this.attrs) {
					t.attrs = this.attrs;
					break;
				}
				return (
					this.content.size && (t.content = this.content.toJSON()),
					this.marks.length && (t.marks = this.marks.map(e => e.toJSON())),
					t
				);
			}
			static fromJSON(e, t) {
				if (!t) throw new RangeError("Invalid input for Node.fromJSON");
				let n = null;
				if (t.marks) {
					if (!Array.isArray(t.marks))
						throw new RangeError("Invalid mark data for Node.fromJSON");
					n = t.marks.map(e.markFromJSON);
				}
				if ("text" == t.type) {
					if ("string" != typeof t.text)
						throw new RangeError("Invalid text node in JSON");
					return e.text(t.text, n);
				}
				var r = Je.fromJSON(e, t.content);
				return e.nodeType(t.type).create(t.attrs, r, n);
			}
		}
		jy.prototype.text = void 0;
		class $y extends jy {
			constructor(e, t, n, r) {
				if ((super(e, t, null, r), !n))
					throw new RangeError("Empty text nodes are not allowed");
				this.text = n;
			}
			toString() {
				return this.type.spec.toDebugString
					? this.type.spec.toDebugString(this)
					: gt(this.marks, JSON.stringify(this.text));
			}
			get textContent() {
				return this.text;
			}
			textBetween(e, t) {
				return this.text.slice(e, t);
			}
			get nodeSize() {
				return this.text.length;
			}
			mark(e) {
				return e == this.marks ? this : new $y(this.type, this.attrs, this.text, e);
			}
			withText(e) {
				return e == this.text ? this : new $y(this.type, this.attrs, e, this.marks);
			}
			cut(e = 0, t = this.text.length) {
				return 0 == e && t == this.text.length
					? this
					: this.withText(this.text.slice(e, t));
			}
			eq(e) {
				return this.sameMarkup(e) && this.text == e.text;
			}
			toJSON() {
				var e = super.toJSON();
				return (e.text = this.text), e;
			}
		}
		function gt(t, n) {
			for (let e = t.length - 1; 0 <= e; e--) n = t[e].type.name + "(" + n + ")";
			return n;
		}
		class _y {
			constructor(e) {
				(this.validEnd = e), (this.next = []), (this.wrapCache = []);
			}
			static parse(e, t) {
				e = new Uy(e, t);
				if (null == e.next) return _y.empty;
				var t = vt(e),
					t =
						(e.next && e.err("Unexpected trailing text"),
						(i => {
							let s = Object.create(null);
							return (function n(e) {
								let r = [];
								e.forEach(e => {
									i[e].forEach(({ term: n, to: e }) => {
										if (n) {
											let t;
											for (let e = 0; e < r.length; e++)
												r[e][0] == n && (t = r[e][1]);
											wt(i, e).forEach(e => {
												t || r.push([n, (t = [])]),
													-1 == t.indexOf(e) && t.push(e);
											});
										}
									});
								});
								let o = (s[e.join(",")] = new _y(-1 < e.indexOf(i.length - 1)));
								for (let t = 0; t < r.length; t++) {
									let e = r[t][1].sort(bt);
									o.next.push({ type: r[t][0], next: s[e.join(",")] || n(e) });
								}
								return o;
							})(wt(i, 0));
						})(
							(e => {
								let r = [[]];
								return (
									a(
										(function n(r, o) {
											{
												if ("choice" == r.type)
													return r.exprs.reduce(
														(e, t) => e.concat(n(t, o)),
														[]
													);
												if ("seq" != r.type) {
													if ("star" == r.type) {
														let e = i();
														return s(o, e), a(n(r.expr, e), e), [s(e)];
													}
													if ("plus" == r.type) {
														let e = i();
														return (
															a(n(r.expr, o), e),
															a(n(r.expr, e), e),
															[s(e)]
														);
													}
													if ("opt" == r.type)
														return [s(o)].concat(n(r.expr, o));
													if ("range" == r.type) {
														let t = o;
														for (let e = 0; e < r.min; e++) {
															let e = i();
															a(n(r.expr, t), e), (t = e);
														}
														if (-1 == r.max) a(n(r.expr, t), t);
														else
															for (let e = r.min; e < r.max; e++) {
																let e = i();
																s(t, e),
																	a(n(r.expr, t), e),
																	(t = e);
															}
														return [s(t)];
													}
													if ("name" == r.type)
														return [s(o, void 0, r.value)];
													throw new Error("Unknown expr type");
												}
												for (let t = 0; ; t++) {
													let e = n(r.exprs[t], o);
													if (t == r.exprs.length - 1) return e;
													a(e, (o = i()));
												}
											}
										})(e, 0),
										i()
									),
									r
								);
								function i() {
									return r.push([]) - 1;
								}
								function s(e, t, n) {
									n = { term: n, to: t };
									return r[e].push(n), n;
								}
								function a(e, t) {
									e.forEach(e => (e.to = t));
								}
							})(t)
						)),
					i = e;
				for (let e = 0, o = [t]; e < o.length; e++) {
					let t = o[e],
						n = !t.validEnd,
						r = [];
					for (let e = 0; e < t.next.length; e++) {
						var { type: s, next: a } = t.next[e];
						r.push(s.name),
							!n || s.isText || s.hasRequiredAttrs() || (n = !1),
							-1 == o.indexOf(a) && o.push(a);
					}
					n &&
						i.err(
							"Only non-generatable nodes (" +
								r.join(", ") +
								") in a required position (see https://prosemirror.net/docs/guide/#generatable)"
						);
				}
				return t;
			}
			matchType(t) {
				for (let e = 0; e < this.next.length; e++)
					if (this.next[e].type == t) return this.next[e].next;
				return null;
			}
			matchFragment(t, n = 0, r = t.childCount) {
				let o = this;
				for (let e = n; o && e < r; e++) o = o.matchType(t.child(e).type);
				return o;
			}
			get inlineContent() {
				return this.next.length && this.next[0].type.isInline;
			}
			get defaultType() {
				for (let e = 0; e < this.next.length; e++) {
					var t = this.next[e].type;
					if (!t.isText && !t.hasRequiredAttrs()) return t;
				}
				return null;
			}
			compatible(n) {
				for (let t = 0; t < this.next.length; t++)
					for (let e = 0; e < n.next.length; e++)
						if (this.next[t].type == n.next[e].type) return !0;
				return !1;
			}
			fillBefore(s, a = !1, l = 0) {
				let c = [this];
				return (function t(n, r) {
					var e = n.matchFragment(s, l);
					if (e && (!a || e.validEnd)) return Je.from(r.map(e => e.createAndFill()));
					for (let e = 0; e < n.next.length; e++) {
						var { type: o, next: i } = n.next[e];
						if (
							!o.isText &&
							!o.hasRequiredAttrs() &&
							-1 == c.indexOf(i) &&
							(c.push(i), (i = t(i, r.concat(o))))
						)
							return i;
					}
					return null;
				})(this, []);
			}
			findWrapping(t) {
				for (let e = 0; e < this.wrapCache.length; e += 2)
					if (this.wrapCache[e] == t) return this.wrapCache[e + 1];
				var e = this.computeWrapping(t);
				return this.wrapCache.push(t, e), e;
			}
			computeWrapping(e) {
				for (
					var t = Object.create(null), n = [{ match: this, type: null, via: null }];
					n.length;

				) {
					var r = n.shift(),
						o = r.match;
					if (o.matchType(e)) {
						var i = [];
						for (let e = r; e.type; e = e.via) i.push(e.type);
						return i.reverse();
					}
					for (let e = 0; e < o.next.length; e++) {
						var { type: s, next: a } = o.next[e];
						s.isLeaf ||
							s.hasRequiredAttrs() ||
							s.name in t ||
							(r.type && !a.validEnd) ||
							(n.push({ match: s.contentMatch, type: s, via: r }), (t[s.name] = !0));
					}
				}
				return null;
			}
			get edgeCount() {
				return this.next.length;
			}
			edge(e) {
				if (e >= this.next.length)
					throw new RangeError(`There's no ${e}th edge in this content match`);
				return this.next[e];
			}
			toString() {
				let r = [];
				return (
					(function t(n) {
						r.push(n);
						for (let e = 0; e < n.next.length; e++)
							-1 == r.indexOf(n.next[e].next) && t(n.next[e].next);
					})(this),
					r
						.map((t, e) => {
							let n = e + (t.validEnd ? "*" : " ") + " ";
							for (let e = 0; e < t.next.length; e++)
								n +=
									(e ? ", " : "") +
									t.next[e].type.name +
									"->" +
									r.indexOf(t.next[e].next);
							return n;
						})
						.join("\n")
				);
			}
		}
		_y.empty = new _y(!0);
		class Uy {
			constructor(e, t) {
				(this.string = e),
					(this.nodeTypes = t),
					(this.inline = null),
					(this.pos = 0),
					(this.tokens = e.split(/\s*(?=\b|\W|$)/)),
					"" == this.tokens[this.tokens.length - 1] && this.tokens.pop(),
					"" == this.tokens[0] && this.tokens.shift();
			}
			get next() {
				return this.tokens[this.pos];
			}
			eat(e) {
				return this.next == e && (this.pos++ || !0);
			}
			err(e) {
				throw new SyntaxError(e + " (in content expression '" + this.string + "')");
			}
		}
		function vt(e) {
			for (
				var t = [];
				t.push(
					(e => {
						for (
							var t = [];
							t.push(
								(e => {
									let t = (t => {
										var e;
										return t.eat("(")
											? ((e = vt(t)),
												t.eat(")") || t.err("Missing closing paren"),
												e)
											: /\W/.test(t.next)
												? void t.err("Unexpected token '" + t.next + "'")
												: ((e = ((e, t) => {
														var n = e.nodeTypes,
															r = n[t];
														if (r) return [r];
														var o,
															i = [];
														for (o in n) {
															o = n[o];
															-1 < o.groups.indexOf(t) && i.push(o);
														}
														return (
															0 == i.length &&
																e.err(
																	"No node type or group '" +
																		t +
																		"' found"
																),
															i
														);
													})(t, t.next).map(
														e => (
															null == t.inline
																? (t.inline = e.isInline)
																: t.inline != e.isInline &&
																	t.err(
																		"Mixing inline and block content"
																	),
															{ type: "name", value: e }
														)
													)),
													t.pos++,
													1 == e.length
														? e[0]
														: { type: "choice", exprs: e });
									})(e);
									for (;;)
										if (e.eat("+")) t = { type: "plus", expr: t };
										else if (e.eat("*")) t = { type: "star", expr: t };
										else if (e.eat("?")) t = { type: "opt", expr: t };
										else {
											if (!e.eat("{")) break;
											t = ((e, t) => {
												let n = yt(e),
													r = n;
												return (
													e.eat(",") && (r = "}" != e.next ? yt(e) : -1),
													e.eat("}") || e.err("Unclosed braced range"),
													{ type: "range", min: n, max: r, expr: t }
												);
											})(e, t);
										}
									return t;
								})(e)
							),
								e.next && ")" != e.next && "|" != e.next;

						);
						return 1 == t.length ? t[0] : { type: "seq", exprs: t };
					})(e)
				),
					e.eat("|");

			);
			return 1 == t.length ? t[0] : { type: "choice", exprs: t };
		}
		function yt(e) {
			/\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
			var t = Number(e.next);
			return e.pos++, t;
		}
		function bt(e, t) {
			return t - e;
		}
		function wt(t, e) {
			let i = [];
			return (
				(function r(e) {
					let o = t[e];
					if (1 == o.length && !o[0].term) return r(o[0].to);
					i.push(e);
					for (let n = 0; n < o.length; n++) {
						let { term: e, to: t } = o[n];
						e || -1 != i.indexOf(t) || r(t);
					}
				})(e),
				i.sort(bt)
			);
		}
		function kt(e) {
			var t,
				n = Object.create(null);
			for (t in e) {
				var r = e[t];
				if (!r.hasDefault) return null;
				n[t] = r.default;
			}
			return n;
		}
		function xt(t, n) {
			var r,
				o = Object.create(null);
			for (r in t) {
				let e = n && n[r];
				if (void 0 === e) {
					var i = t[r];
					if (!i.hasDefault) throw new RangeError("No value supplied for attribute " + r);
					e = i.default;
				}
				o[r] = e;
			}
			return o;
		}
		function Ct(e) {
			var t = Object.create(null);
			if (e) for (var n in e) t[n] = new Jy(e[n]);
			return t;
		}
		class Wy {
			constructor(e, t, n) {
				(this.name = e),
					(this.schema = t),
					(this.spec = n),
					(this.markSet = null),
					(this.groups = n.group ? n.group.split(" ") : []),
					(this.attrs = Ct(n.attrs)),
					(this.defaultAttrs = kt(this.attrs)),
					(this.contentMatch = null),
					(this.inlineContent = null),
					(this.isBlock = !(n.inline || "text" == e)),
					(this.isText = "text" == e);
			}
			get isInline() {
				return !this.isBlock;
			}
			get isTextblock() {
				return this.isBlock && this.inlineContent;
			}
			get isLeaf() {
				return this.contentMatch == _y.empty;
			}
			get isAtom() {
				return this.isLeaf || !!this.spec.atom;
			}
			get whitespace() {
				return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
			}
			hasRequiredAttrs() {
				for (var e in this.attrs) if (this.attrs[e].isRequired) return !0;
				return !1;
			}
			compatibleContent(e) {
				return this == e || this.contentMatch.compatible(e.contentMatch);
			}
			computeAttrs(e) {
				return !e && this.defaultAttrs ? this.defaultAttrs : xt(this.attrs, e);
			}
			create(e = null, t, n) {
				if (this.isText) throw new Error("NodeType.create can't construct text nodes");
				return new jy(this, this.computeAttrs(e), Je.from(t), Ge.setFrom(n));
			}
			createChecked(e = null, t, n) {
				if (((t = Je.from(t)), this.validContent(t)))
					return new jy(this, this.computeAttrs(e), t, Ge.setFrom(n));
				throw new RangeError("Invalid content for node " + this.name);
			}
			createAndFill(e = null, t, n) {
				if (((e = this.computeAttrs(e)), (t = Je.from(t)).size)) {
					var r = this.contentMatch.fillBefore(t);
					if (!r) return null;
					t = r.append(t);
				}
				(r = this.contentMatch.matchFragment(t)), (r = r && r.fillBefore(Je.empty, !0));
				return r ? new jy(this, e, t.append(r), Ge.setFrom(n)) : null;
			}
			validContent(t) {
				var e = this.contentMatch.matchFragment(t);
				if (!e || !e.validEnd) return !1;
				for (let e = 0; e < t.childCount; e++)
					if (!this.allowsMarks(t.child(e).marks)) return !1;
				return !0;
			}
			allowsMarkType(e) {
				return null == this.markSet || -1 < this.markSet.indexOf(e);
			}
			allowsMarks(t) {
				if (null != this.markSet)
					for (let e = 0; e < t.length; e++)
						if (!this.allowsMarkType(t[e].type)) return !1;
				return !0;
			}
			allowedMarks(t) {
				if (null == this.markSet) return t;
				let n;
				for (let e = 0; e < t.length; e++)
					this.allowsMarkType(t[e].type) ? n && n.push(t[e]) : (n = n || t.slice(0, e));
				return n ? (n.length ? n : Ge.none) : t;
			}
			static compile(e, n) {
				let r = Object.create(null);
				e.forEach((e, t) => (r[e] = new Wy(e, n, t)));
				var t,
					e = n.spec.topNode || "doc";
				if (!r[e])
					throw new RangeError("Schema is missing its top node type ('" + e + "')");
				if (!r.text) throw new RangeError("Every schema needs a 'text' type");
				for (t in r.text.attrs)
					throw new RangeError("The text node type should not have attributes");
				return r;
			}
		}
		class Jy {
			constructor(e) {
				(this.hasDefault = Object.prototype.hasOwnProperty.call(e, "default")),
					(this.default = e.default);
			}
			get isRequired() {
				return !this.hasDefault;
			}
		}
		class Gy {
			constructor(e, t, n, r) {
				(this.name = e),
					(this.rank = t),
					(this.schema = n),
					(this.spec = r),
					(this.attrs = Ct(r.attrs)),
					(this.excluded = null);
				e = kt(this.attrs);
				this.instance = e ? new Ge(this, e) : null;
			}
			create(e = null) {
				return !e && this.instance ? this.instance : new Ge(this, xt(this.attrs, e));
			}
			static compile(e, n) {
				let r = Object.create(null),
					o = 0;
				return e.forEach((e, t) => (r[e] = new Gy(e, o++, n, t))), r;
			}
			removeFromSet(e) {
				for (var t = 0; t < e.length; t++)
					e[t].type == this && ((e = e.slice(0, t).concat(e.slice(t + 1))), t--);
				return e;
			}
			isInSet(t) {
				for (let e = 0; e < t.length; e++) if (t[e].type == this) return t[e];
			}
			excludes(e) {
				return -1 < this.excluded.indexOf(e);
			}
		}
		class Ky {
			constructor(e) {
				(this.cached = Object.create(null)),
					(this.spec = {
						nodes: ot.from(e.nodes),
						marks: ot.from(e.marks || {}),
						topNode: e.topNode
					}),
					(this.nodes = Wy.compile(this.spec.nodes, this)),
					(this.marks = Gy.compile(this.spec.marks, this));
				var t,
					n,
					r = Object.create(null);
				for (t in this.nodes) {
					if (t in this.marks)
						throw new RangeError(t + " can not be both a node and a mark");
					var o = this.nodes[t],
						i = o.spec.content || "",
						s = o.spec.marks;
					(o.contentMatch = r[i] || (r[i] = _y.parse(i, this.nodes))),
						(o.inlineContent = o.contentMatch.inlineContent),
						(o.markSet =
							"_" == s
								? null
								: s
									? Tt(this, s.split(" "))
									: "" != s && o.inlineContent
										? null
										: []);
				}
				for (n in this.marks) {
					var a = this.marks[n],
						l = a.spec.excludes;
					a.excluded = null == l ? [a] : "" == l ? [] : Tt(this, l.split(" "));
				}
				(this.nodeFromJSON = this.nodeFromJSON.bind(this)),
					(this.markFromJSON = this.markFromJSON.bind(this)),
					(this.topNodeType = this.nodes[this.spec.topNode || "doc"]),
					(this.cached.wrappings = Object.create(null));
			}
			node(e, t = null, n, r) {
				if ("string" == typeof e) e = this.nodeType(e);
				else {
					if (!(e instanceof Wy)) throw new RangeError("Invalid node type: " + e);
					if (e.schema != this)
						throw new RangeError(
							"Node type from different schema used (" + e.name + ")"
						);
				}
				return e.createChecked(t, n, r);
			}
			text(e, t) {
				var n = this.nodes.text;
				return new $y(n, n.defaultAttrs, e, Ge.setFrom(t));
			}
			mark(e, t) {
				return (e = "string" == typeof e ? this.marks[e] : e).create(t);
			}
			nodeFromJSON(e) {
				return jy.fromJSON(this, e);
			}
			markFromJSON(e) {
				return Ge.fromJSON(this, e);
			}
			nodeType(e) {
				var t = this.nodes[e];
				if (t) return t;
				throw new RangeError("Unknown node type: " + e);
			}
		}
		function Tt(o, i) {
			var s = [];
			for (let r = 0; r < i.length; r++) {
				let e = i[r],
					t = o.marks[e],
					n = t;
				if (t) s.push(t);
				else
					for (var a in o.marks) {
						a = o.marks[a];
						("_" == e || (a.spec.group && -1 < a.spec.group.split(" ").indexOf(e))) &&
							s.push((n = a));
					}
				if (!n) throw new SyntaxError("Unknown mark type: '" + i[r] + "'");
			}
			return s;
		}
		class Zy {
			constructor(t, e) {
				(this.schema = t),
					(this.rules = e),
					(this.tags = []),
					(this.styles = []),
					e.forEach(e => {
						e.tag ? this.tags.push(e) : e.style && this.styles.push(e);
					}),
					(this.normalizeLists = !this.tags.some(
						e =>
							!(!/^(ul|ol)\b/.test(e.tag) || !e.node) &&
							(e = t.nodes[e.node]).contentMatch.matchType(e)
					));
			}
			parse(e, t = {}) {
				var n = new Qy(this, t, !1);
				return n.addAll(e, t.from, t.to), n.finish();
			}
			parseSlice(e, t = {}) {
				var n = new Qy(this, t, !0);
				return n.addAll(e, t.from, t.to), Ke.maxOpen(n.finish());
			}
			matchTag(t, n, r) {
				for (let e = r ? this.tags.indexOf(r) + 1 : 0; e < this.tags.length; e++) {
					var o = this.tags[e];
					if (
						((i = t),
						(s = o.tag),
						(
							i.matches ||
							i.msMatchesSelector ||
							i.webkitMatchesSelector ||
							i.mozMatchesSelector
						).call(i, s) &&
							(void 0 === o.namespace || t.namespaceURI == o.namespace) &&
							(!o.context || n.matchesContext(o.context)))
					) {
						if (o.getAttrs) {
							i = o.getAttrs(t);
							if (!1 === i) continue;
							o.attrs = i || void 0;
						}
						return o;
					}
				}
				var i, s;
			}
			matchStyle(t, n, r, o) {
				for (let e = o ? this.styles.indexOf(o) + 1 : 0; e < this.styles.length; e++) {
					var i = this.styles[e],
						s = i.style;
					if (
						!(
							0 != s.indexOf(t) ||
							(i.context && !r.matchesContext(i.context)) ||
							(s.length > t.length &&
								(61 != s.charCodeAt(t.length) || s.slice(t.length + 1) != n))
						)
					) {
						if (i.getAttrs) {
							s = i.getAttrs(n);
							if (!1 === s) continue;
							i.attrs = s || void 0;
						}
						return i;
					}
				}
			}
			static schemaRules(e) {
				let o = [];
				function n(e) {
					let t = null == e.priority ? 50 : e.priority,
						n = 0;
					for (; n < o.length; n++) {
						var r = o[n];
						if ((null == r.priority ? 50 : r.priority) < t) break;
					}
					o.splice(n, 0, e);
				}
				for (let t in e.marks) {
					var r = e.marks[t].spec.parseDOM;
					r &&
						r.forEach(e => {
							n((e = St(e))), (e.mark = t);
						});
				}
				for (let t in e.nodes) {
					var i = e.nodes[t].spec.parseDOM;
					i &&
						i.forEach(e => {
							n((e = St(e))), (e.node = t);
						});
				}
				return o;
			}
			static fromSchema(e) {
				return e.cached.domParser || (e.cached.domParser = new Zy(e, Zy.schemaRules(e)));
			}
		}
		let s = {
				address: !0,
				article: !0,
				aside: !0,
				blockquote: !0,
				canvas: !0,
				dd: !0,
				div: !0,
				dl: !0,
				fieldset: !0,
				figcaption: !0,
				figure: !0,
				footer: !0,
				form: !0,
				h1: !0,
				h2: !0,
				h3: !0,
				h4: !0,
				h5: !0,
				h6: !0,
				header: !0,
				hgroup: !0,
				hr: !0,
				li: !0,
				noscript: !0,
				ol: !0,
				output: !0,
				p: !0,
				pre: !0,
				section: !0,
				table: !0,
				tfoot: !0,
				ul: !0
			},
			H = { head: !0, noscript: !0, object: !0, script: !0, style: !0, title: !0 },
			z = { ol: !0, ul: !0 };
		function Mt(e, t, n) {
			return null != t
				? (t ? 1 : 0) | ("full" === t ? 2 : 0)
				: e && "pre" == e.whitespace
					? 3
					: -5 & n;
		}
		class Xy {
			constructor(e, t, n, r, o, i, s) {
				(this.type = e),
					(this.attrs = t),
					(this.marks = n),
					(this.pendingMarks = r),
					(this.solid = o),
					(this.options = s),
					(this.content = []),
					(this.activeMarks = Ge.none),
					(this.stashMarks = []),
					(this.match = i || (4 & s ? null : e.contentMatch));
			}
			findWrapping(e) {
				if (!this.match) {
					if (!this.type) return [];
					var t,
						n,
						r = this.type.contentMatch.fillBefore(Je.from(e));
					if (!r)
						return (n = (t = this.type.contentMatch).findWrapping(e.type))
							? ((this.match = t), n)
							: null;
					this.match = this.type.contentMatch.matchFragment(r);
				}
				return this.match.findWrapping(e.type);
			}
			finish(e) {
				if (!(1 & this.options)) {
					let e = this.content[this.content.length - 1],
						t;
					var n;
					e &&
						e.isText &&
						(t = /[ \t\r\n\u000c]+$/.exec(e.text)) &&
						((n = e).text.length == t[0].length
							? this.content.pop()
							: (this.content[this.content.length - 1] = n.withText(
									n.text.slice(0, n.text.length - t[0].length)
								)));
				}
				let t = Je.from(this.content);
				return (
					!e && this.match && (t = t.append(this.match.fillBefore(Je.empty, !0))),
					this.type ? this.type.create(this.attrs, t, this.marks) : t
				);
			}
			popFromStashMark(t) {
				for (let e = this.stashMarks.length - 1; 0 <= e; e--)
					if (t.eq(this.stashMarks[e])) return this.stashMarks.splice(e, 1)[0];
			}
			applyPending(n) {
				for (let e = 0, t = this.pendingMarks; e < t.length; e++) {
					var r = t[e];
					(this.type
						? this.type.allowsMarkType(r.type)
						: ((e, s) => {
								var t,
									n = s.schema.nodes;
								for (t in n) {
									t = n[t];
									if (t.allowsMarkType(e)) {
										let o = [],
											i = t => {
												o.push(t);
												for (let e = 0; e < t.edgeCount; e++) {
													var { type: n, next: r } = t.edge(e);
													if (n == s) return !0;
													if (o.indexOf(r) < 0 && i(r)) return !0;
												}
											};
										if (i(t.contentMatch)) return 1;
									}
								}
							})(r.type, n)) &&
						!r.isInSet(this.activeMarks) &&
						((this.activeMarks = r.addToSet(this.activeMarks)),
						(this.pendingMarks = r.removeFromSet(this.pendingMarks)));
				}
			}
			inlineContext(e) {
				return this.type
					? this.type.inlineContent
					: this.content.length
						? this.content[0].isInline
						: e.parentNode && !s.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
			}
		}
		class Qy {
			constructor(e, t, n) {
				(this.parser = e), (this.options = t), (this.isOpen = n), (this.open = 0);
				let r = t.topNode,
					o;
				var i = Mt(null, t.preserveWhitespace, 0) | (n ? 4 : 0);
				(o = r
					? new Xy(
							r.type,
							r.attrs,
							Ge.none,
							Ge.none,
							!0,
							t.topMatch || r.type.contentMatch,
							i
						)
					: n
						? new Xy(null, null, Ge.none, Ge.none, !0, null, i)
						: new Xy(e.schema.topNodeType, null, Ge.none, Ge.none, !0, null, i)),
					(this.nodes = [o]),
					(this.find = t.findPositions),
					(this.needsBlock = !1);
			}
			get top() {
				return this.nodes[this.open];
			}
			addDOM(e) {
				if (3 == e.nodeType) this.addTextNode(e);
				else if (1 == e.nodeType) {
					var t = e.getAttribute("style"),
						n = t
							? this.readStyles(
									(e => {
										for (
											var t, n = /\s*([\w-]+)\s*:\s*([^;]+)/g, r = [];
											(t = n.exec(e));

										)
											r.push(t[1], t[2].trim());
										return r;
									})(t)
								)
							: null,
						r = this.top;
					if (null != n) for (let e = 0; e < n.length; e++) this.addPendingMark(n[e]);
					if ((this.addElement(e), null != n))
						for (let e = 0; e < n.length; e++) this.removePendingMark(n[e], r);
				}
			}
			addTextNode(e) {
				let t = e.nodeValue;
				var n,
					r = this.top;
				2 & r.options || r.inlineContext(e) || /[^ \t\r\n\u000c]/.test(t)
					? (1 & r.options
							? (t =
									2 & r.options
										? t.replace(/\r\n?/g, "\n")
										: t.replace(/\r?\n|\r/g, " "))
							: ((t = t.replace(/[ \t\r\n\u000c]+/g, " ")),
								/^[ \t\r\n\u000c]/.test(t) &&
									this.open == this.nodes.length - 1 &&
									((r = r.content[r.content.length - 1]),
									(n = e.previousSibling),
									!r ||
										(n && "BR" == n.nodeName) ||
										(r.isText && /[ \t\r\n\u000c]$/.test(r.text))) &&
									(t = t.slice(1))),
						t && this.insertNode(this.parser.schema.text(t)),
						this.findInText(e))
					: this.findInside(e);
			}
			addElement(r, o) {
				let i = r.nodeName.toLowerCase(),
					e;
				if (z.hasOwnProperty(i) && this.parser.normalizeLists)
					for (let e = r.firstChild, t = null; e; e = e.nextSibling) {
						var n = 1 == e.nodeType ? e.nodeName.toLowerCase() : null;
						n && z.hasOwnProperty(n) && t
							? (t.appendChild(e), (e = t))
							: "li" == n
								? (t = e)
								: n && (t = null);
					}
				o =
					(this.options.ruleFromNode && this.options.ruleFromNode(r)) ||
					(e = this.parser.matchTag(r, this, o));
				if (o ? o.ignore : H.hasOwnProperty(i)) this.findInside(r), this.ignoreFallback(r);
				else if (!o || o.skip || o.closeParent) {
					o && o.closeParent
						? (this.open = Math.max(0, this.open - 1))
						: o && o.skip.nodeType && (r = o.skip);
					let e,
						t = this.top,
						n = this.needsBlock;
					if (s.hasOwnProperty(i)) (e = !0), t.type || (this.needsBlock = !0);
					else if (!r.firstChild) return void this.leafFallback(r);
					this.addAll(r), e && this.sync(t), (this.needsBlock = n);
				} else this.addElementByRule(r, o, !1 === o.consuming ? e : void 0);
			}
			leafFallback(e) {
				"BR" == e.nodeName &&
					this.top.type &&
					this.top.type.inlineContent &&
					this.addTextNode(e.ownerDocument.createTextNode("\n"));
			}
			ignoreFallback(e) {
				"BR" != e.nodeName ||
					(this.top.type && this.top.type.inlineContent) ||
					this.findPlace(this.parser.schema.text("-"));
			}
			readStyles(n) {
				let r = Ge.none;
				e: for (let t = 0; t < n.length; t += 2)
					for (let e = void 0; ; ) {
						var o = this.parser.matchStyle(n[t], n[t + 1], this, e);
						if (!o) continue e;
						if (o.ignore) return null;
						if (
							((r = this.parser.schema.marks[o.mark].create(o.attrs).addToSet(r)),
							!1 !== o.consuming)
						)
							break;
						e = o;
					}
				return r;
			}
			addElementByRule(t, n, e) {
				let r, o, i;
				n.node
					? (o = this.parser.schema.nodes[n.node]).isLeaf
						? this.insertNode(o.create(n.attrs)) || this.leafFallback(t)
						: (r = this.enter(o, n.attrs || null, n.preserveWhitespace))
					: ((s = this.parser.schema.marks[n.mark]),
						(i = s.create(n.attrs)),
						this.addPendingMark(i));
				var s = this.top;
				if (o && o.isLeaf) this.findInside(t);
				else if (e) this.addElement(t, e);
				else if (n.getContent)
					this.findInside(t),
						n.getContent(t, this.parser.schema).forEach(e => this.insertNode(e));
				else {
					let e = t;
					"string" == typeof n.contentElement
						? (e = t.querySelector(n.contentElement))
						: "function" == typeof n.contentElement
							? (e = n.contentElement(t))
							: n.contentElement && (e = n.contentElement),
						this.findAround(t, e, !0),
						this.addAll(e);
				}
				r && this.sync(s) && this.open--, i && this.removePendingMark(i, s);
			}
			addAll(n, r, o) {
				let i = r || 0;
				for (
					let e = r ? n.childNodes[r] : n.firstChild,
						t = null == o ? null : n.childNodes[o];
					e != t;
					e = e.nextSibling, ++i
				)
					this.findAtPoint(n, i), this.addDOM(e);
				this.findAtPoint(n, i);
			}
			findPlace(t) {
				let n, r;
				for (let e = this.open; 0 <= e; e--) {
					var o = this.nodes[e],
						i = o.findWrapping(t);
					if (i && (!n || n.length > i.length) && ((n = i), (r = o), !i.length)) break;
					if (o.solid) break;
				}
				if (!n) return !1;
				this.sync(r);
				for (let e = 0; e < n.length; e++) this.enterInner(n[e], null, !1);
				return !0;
			}
			insertNode(n) {
				var e;
				if (
					(n.isInline &&
						this.needsBlock &&
						!this.top.type &&
						(e = this.textblockFromContext()) &&
						this.enterInner(e),
					this.findPlace(n))
				) {
					this.closeExtra();
					var r = this.top;
					r.applyPending(n.type), r.match && (r.match = r.match.matchType(n.type));
					let t = r.activeMarks;
					for (let e = 0; e < n.marks.length; e++)
						(r.type && !r.type.allowsMarkType(n.marks[e].type)) ||
							(t = n.marks[e].addToSet(t));
					return r.content.push(n.mark(t)), !0;
				}
				return !1;
			}
			enter(e, t, n) {
				var r = this.findPlace(e.create(t));
				return r && this.enterInner(e, t, !0, n), r;
			}
			enterInner(e, t = null, n = !1, r) {
				this.closeExtra();
				var o = this.top;
				o.applyPending(e), (o.match = o.match && o.match.matchType(e));
				let i = Mt(e, r, o.options);
				4 & o.options && 0 == o.content.length && (i |= 4),
					this.nodes.push(new Xy(e, t, o.activeMarks, o.pendingMarks, n, null, i)),
					this.open++;
			}
			closeExtra(e = !1) {
				let t = this.nodes.length - 1;
				if (t > this.open) {
					for (; t > this.open; t--)
						this.nodes[t - 1].content.push(this.nodes[t].finish(e));
					this.nodes.length = this.open + 1;
				}
			}
			finish() {
				return (
					(this.open = 0),
					this.closeExtra(this.isOpen),
					this.nodes[0].finish(this.isOpen || this.options.topOpen)
				);
			}
			sync(t) {
				for (let e = this.open; 0 <= e; e--)
					if (this.nodes[e] == t) return (this.open = e), !0;
				return !1;
			}
			get currentPos() {
				this.closeExtra();
				let t = 0;
				for (let e = this.open; 0 <= e; e--) {
					var n = this.nodes[e].content;
					for (let e = n.length - 1; 0 <= e; e--) t += n[e].nodeSize;
					e && t++;
				}
				return t;
			}
			findAtPoint(t, n) {
				if (this.find)
					for (let e = 0; e < this.find.length; e++)
						this.find[e].node == t &&
							this.find[e].offset == n &&
							(this.find[e].pos = this.currentPos);
			}
			findInside(t) {
				if (this.find)
					for (let e = 0; e < this.find.length; e++)
						null == this.find[e].pos &&
							1 == t.nodeType &&
							t.contains(this.find[e].node) &&
							(this.find[e].pos = this.currentPos);
			}
			findAround(t, n, r) {
				if (t != n && this.find)
					for (let e = 0; e < this.find.length; e++)
						null == this.find[e].pos &&
							1 == t.nodeType &&
							t.contains(this.find[e].node) &&
							n.compareDocumentPosition(this.find[e].node) & (r ? 2 : 4) &&
							(this.find[e].pos = this.currentPos);
			}
			findInText(t) {
				if (this.find)
					for (let e = 0; e < this.find.length; e++)
						this.find[e].node == t &&
							(this.find[e].pos =
								this.currentPos - (t.nodeValue.length - this.find[e].offset));
			}
			matchesContext(e) {
				if (-1 < e.indexOf("|")) return e.split(/\s*\|\s*/).some(this.matchesContext, this);
				let o = e.split("/"),
					i = this.options.context,
					s = !(this.isOpen || (i && i.parent.type != this.nodes[0].type)),
					a = -(i ? i.depth + 1 : 0) + (s ? 0 : 1),
					l = (e, t) => {
						for (; 0 <= e; e--) {
							var n = o[e];
							if ("" == n) {
								if (e != o.length - 1 && 0 != e) {
									for (; t >= a; t--) if (l(e - 1, t)) return !0;
									return !1;
								}
							} else {
								var r =
									0 < t || (0 == t && s)
										? this.nodes[t].type
										: i && t >= a
											? i.node(t - a).type
											: null;
								if (!r || (r.name != n && -1 == r.groups.indexOf(n))) return !1;
								t--;
							}
						}
						return !0;
					};
				return l(o.length - 1, this.open);
			}
			textblockFromContext() {
				var e,
					t = this.options.context;
				if (t)
					for (let e = t.depth; 0 <= e; e--) {
						var n = t.node(e).contentMatchAt(t.indexAfter(e)).defaultType;
						if (n && n.isTextblock && n.defaultAttrs) return n;
					}
				for (e in this.parser.schema.nodes) {
					var r = this.parser.schema.nodes[e];
					if (r.isTextblock && r.defaultAttrs) return r;
				}
			}
			addPendingMark(e) {
				var t = ((t, n) => {
					for (let e = 0; e < n.length; e++) if (t.eq(n[e])) return n[e];
				})(e, this.top.pendingMarks);
				t && this.top.stashMarks.push(t),
					(this.top.pendingMarks = e.addToSet(this.top.pendingMarks));
			}
			removePendingMark(t, n) {
				for (let e = this.open; 0 <= e; e--) {
					var r,
						o = this.nodes[e];
					if (
						(-1 < o.pendingMarks.lastIndexOf(t)
							? (o.pendingMarks = t.removeFromSet(o.pendingMarks))
							: ((o.activeMarks = t.removeFromSet(o.activeMarks)),
								(r = o.popFromStashMark(t)) &&
									o.type &&
									o.type.allowsMarkType(r.type) &&
									(o.activeMarks = r.addToSet(o.activeMarks))),
						o == n)
					)
						break;
				}
			}
		}
		function St(e) {
			var t,
				n = {};
			for (t in e) n[t] = e[t];
			return n;
		}
		class Yy {
			constructor(e, t) {
				(this.nodes = e), (this.marks = t);
			}
			serializeFragment(e, s = {}, t) {
				let a = (t = t || Nt(s).createDocumentFragment()),
					l = [];
				return (
					e.forEach(n => {
						if (l.length || n.marks.length) {
							let e = 0,
								t = 0;
							for (; e < l.length && t < n.marks.length; ) {
								var r = n.marks[t];
								if (this.marks[r.type.name]) {
									if (!r.eq(l[e][0]) || !1 === r.type.spec.spanning) break;
									e++;
								}
								t++;
							}
							for (; e < l.length; ) a = l.pop()[1];
							for (; t < n.marks.length; ) {
								var o = n.marks[t++],
									i = this.serializeMark(o, n.isInline, s);
								i &&
									(l.push([o, a]),
									a.appendChild(i.dom),
									(a = i.contentDOM || i.dom));
							}
						}
						a.appendChild(this.serializeNodeInner(n, s));
					}),
					t
				);
			}
			serializeNodeInner(e, t) {
				var { dom: n, contentDOM: r } = Yy.renderSpec(Nt(t), this.nodes[e.type.name](e));
				if (r) {
					if (e.isLeaf)
						throw new RangeError("Content hole not allowed in a leaf node spec");
					this.serializeFragment(e.content, t, r);
				}
				return n;
			}
			serializeNode(t, n = {}) {
				let r = this.serializeNodeInner(t, n);
				for (let e = t.marks.length - 1; 0 <= e; e--) {
					var o = this.serializeMark(t.marks[e], t.isInline, n);
					o && ((o.contentDOM || o.dom).appendChild(r), (r = o.dom));
				}
				return r;
			}
			serializeMark(e, t, n = {}) {
				var r = this.marks[e.type.name];
				return r && Yy.renderSpec(Nt(n), r(e, t));
			}
			static renderSpec(t, n, r = null) {
				if ("string" == typeof n) return { dom: t.createTextNode(n) };
				if (null != n.nodeType) return { dom: n };
				if (n.dom && null != n.dom.nodeType) return n;
				let e = n[0],
					o = e.indexOf(" ");
				0 < o && ((r = e.slice(0, o)), (e = e.slice(o + 1)));
				let i;
				var s,
					a = r ? t.createElementNS(r, e) : t.createElement(e);
				let l = n[1],
					c = 1;
				if (l && "object" == typeof l && null == l.nodeType && !Array.isArray(l))
					for (var u in ((c = 2), l))
						null != l[u] &&
							(0 < (s = u.indexOf(" "))
								? a.setAttributeNS(u.slice(0, s), u.slice(s + 1), l[u])
								: a.setAttribute(u, l[u]));
				for (let e = c; e < n.length; e++) {
					var d = n[e];
					if (0 === d) {
						if (e < n.length - 1 || e > c)
							throw new RangeError(
								"Content hole must be the only child of its parent node"
							);
						return { dom: a, contentDOM: a };
					}
					var { dom: d, contentDOM: p } = Yy.renderSpec(t, d, r);
					if ((a.appendChild(d), p)) {
						if (i) throw new RangeError("Multiple content holes");
						i = p;
					}
				}
				return { dom: a, contentDOM: i };
			}
			static fromSchema(e) {
				return (
					e.cached.domSerializer ||
					(e.cached.domSerializer = new Yy(
						this.nodesFromSchema(e),
						this.marksFromSchema(e)
					))
				);
			}
			static nodesFromSchema(e) {
				e = Et(e.nodes);
				return e.text || (e.text = e => e.text), e;
			}
			static marksFromSchema(e) {
				return Et(e.marks);
			}
		}
		function Et(e) {
			var t,
				n = {};
			for (t in e) {
				var r = e[t].spec.toDOM;
				r && (n[t] = r);
			}
			return n;
		}
		function Nt(e) {
			return e.document || window.document;
		}
		var xe = ye(956),
			Ot = ye.n(xe),
			xe = ye(969),
			Dt = ye.n(xe),
			xe = ye(522),
			At = ye.n(xe),
			xe = ye(204),
			Lt = ye.n(xe),
			xe = ye(462),
			It = ye.n(xe),
			xe = ye(758),
			Rt = ye.n(xe),
			xe = ye(321),
			Pt = ye.n(xe),
			xe = ye(929),
			Bt = ye.n(xe),
			xe = ye(934),
			Ft = ye.n(xe),
			xe = ye(391),
			Ht = ye.n(xe),
			zt = (/Mac/.test(navigator.platform), /[\u0020]+/g),
			qt = /[>(){}[\]+-.!#|]/g,
			Vt =
				/<([a-zA-Z_][a-zA-Z0-9\-._]*)(\s|[^\\>])*\/?>|<(\/)([a-zA-Z_][a-zA-Z0-9\-._]*)\s*\/?>|<!--[^-]+-->|<([a-zA-Z_][a-zA-Z0-9\-.:/]*)>/g,
			jt = /\\[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\\]/g,
			$t = /[*_~`]/g,
			_t = /!\[.*\]\(.*\)/g,
			Ut = /[[\]]/g,
			Wt = /(?:^|[^\\])\\(?!\\)/g,
			Jt = new RegExp('[&<>"]', "g");
		function Gt(e) {
			switch (e) {
				case "&":
					return "&amp;";
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case '"':
					return "&quot;";
				default:
					return e;
			}
		}
		function Kt(e) {
			return Jt.test(e) ? e.replace(Jt, Gt) : e;
		}
		function Zt(e, t) {
			return -1 !== e.indexOf(t);
		}
		var Xt = ["rel", "target", "hreflang", "type"],
			Qt = {
				codeblock: /(^ {4}[^\n]+\n*)+/,
				thematicBreak: /^ *((\* *){3,}|(- *){3,} *|(_ *){3,}) */,
				atxHeading: /^(#{1,6}) +[\s\S]+/,
				seTextheading: /^([^\n]+)\n *(=|-){2,} */,
				blockquote: /^( *>[^\n]+.*)+/,
				list: /^ *(\*+|-+|\d+\.) [\s\S]+/,
				def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? */,
				link: /!?\[.*\]\(.*\)/,
				reflink: /!?\[.*\]\s*\[([^\]]*)\]/,
				verticalBar: /\u007C/,
				fencedCodeblock: /^((`|~){3,})/
			};
		function Yt(t) {
			var n;
			return t
				? ((n = {}),
					Xt.forEach(function (e) {
						Bt()(t[e]) || (n[e] = t[e]);
					}),
					n)
				: null;
		}
		function en(e, t) {
			for (var n = "", r = 0; r < t; r += 1) n += e;
			return n;
		}
		function tn(e) {
			for (var n = [], t = _t.exec(e); t; )
				n.push([t.index, t.index + t[0].length]), (t = _t.exec(e));
			return e.replace(Ut, function (e, t) {
				return n.some(function (e) {
					return t > e[0] && t < e[1];
				})
					? e
					: "\\" + e;
			});
		}
		function nn(e) {
			function t(e) {
				return "\\" + e;
			}
			var n,
				r,
				e = e.replace(zt, " ");
			return (
				jt.test(e) && (e = e.replace(jt, t)),
				(e = (e = Wt.test(e)
					? e.replace(Wt, function (e) {
							return e + "\\";
						})
					: e).replace($t, t)),
				Vt.test(e) && (e = e.replace(Vt, t)),
				(n = e),
				(r = !1),
				Ot()(Qt, function (e) {
					return !(r = e.test(n) ? !0 : r);
				}),
				(e = r ? e.replace(qt, t) : e)
			);
		}
		function rn(e) {
			return Ft()(e) || Bt()(e);
		}
		function on(e, t) {
			if (null !== e || e !== t) {
				if ("object" != typeof e || "object" != typeof t || rn(e) || rn(t)) return e === t;
				for (var n in e) if (e[n] !== t[n]) return;
				for (var n in t) if (!(n in e)) return;
			}
			return 1;
		}
		function sn(e) {
			return e[e.length - 1];
		}
		function an(e) {
			return "object" == typeof e && null !== e;
		}
		function ln(e, t) {
			var n = we({}, e);
			return (
				e &&
					t &&
					Object.keys(t).forEach(function (e) {
						an(n[e])
							? Array.isArray(t[e])
								? (n[e] = cn(t[e]))
								: n.hasOwnProperty(e)
									? (n[e] = ln(n[e], t[e]))
									: (n[e] = un(t[e]))
							: (n[e] = t[e]);
					}),
				n
			);
		}
		function cn(e) {
			return e.map(function (e) {
				return an(e) ? (Array.isArray(e) ? cn : un)(e) : e;
			});
		}
		function un(n) {
			var e = Object.keys(n);
			return e.length
				? e.reduce(function (e, t) {
						return (
							an(n[t])
								? (e[t] = (Array.isArray(n[t]) ? cn : un)(n[t]))
								: (e[t] = n[t]),
							e
						);
					}, {})
				: n;
		}
		function dn(t, n) {
			return (
				void 0 === n && (n = {}),
				Object.keys(n).forEach(function (e) {
					!t.hasOwnProperty(e) || "object" != typeof t[e] || Array.isArray(n[e])
						? (t[e] = n[e])
						: dn(t[e], n[e]);
				}),
				t
			);
		}
		function pn(e, t) {
			return t < e ? [t, e] : [e, t];
		}
		let q = Math.pow(2, 16);
		function hn(e) {
			return 65535 & e;
		}
		class e0 {
			constructor(e, t, n) {
				(this.pos = e), (this.delInfo = t), (this.recover = n);
			}
			get deleted() {
				return 0 < (8 & this.delInfo);
			}
			get deletedBefore() {
				return 0 < (5 & this.delInfo);
			}
			get deletedAfter() {
				return 0 < (6 & this.delInfo);
			}
			get deletedAcross() {
				return 0 < (4 & this.delInfo);
			}
		}
		class t0 {
			constructor(e, t = !1) {
				if (((this.ranges = e), (this.inverted = t), !e.length && t0.empty))
					return t0.empty;
			}
			recover(e) {
				let t = 0,
					n = hn(e);
				if (!this.inverted)
					for (let e = 0; e < n; e++)
						t += this.ranges[3 * e + 2] - this.ranges[3 * e + 1];
				return this.ranges[3 * n] + t + (e - (65535 & e)) / q;
			}
			mapResult(e, t = 1) {
				return this._map(e, t, !1);
			}
			map(e, t = 1) {
				return this._map(e, t, !0);
			}
			_map(n, r, o) {
				let i = 0,
					e = this.inverted ? 2 : 1,
					s = this.inverted ? 1 : 2;
				for (let t = 0; t < this.ranges.length; t += 3) {
					var a = this.ranges[t] - (this.inverted ? i : 0);
					if (n < a) break;
					var l = this.ranges[t + e],
						c = this.ranges[t + s],
						u = a + l;
					if (n <= u) {
						var d = a + i + ((l ? (n == a ? -1 : n == u ? 1 : r) : r) < 0 ? 0 : c);
						if (o) return d;
						var p = n == (r < 0 ? a : u) ? null : t / 3 + (n - a) * q;
						let e = n == a ? 2 : n == u ? 1 : 4;
						return (r < 0 ? n != a : n != u) && (e |= 8), new e0(d, e, p);
					}
					i += c - l;
				}
				return o ? n + i : new e0(n + i, 0, null);
			}
			touches(t, e) {
				let n = 0,
					r = hn(e);
				var o = this.inverted ? 2 : 1,
					i = this.inverted ? 1 : 2;
				for (let e = 0; e < this.ranges.length; e += 3) {
					var s = this.ranges[e] - (this.inverted ? n : 0);
					if (t < s) break;
					var a = this.ranges[e + o];
					if (t <= s + a && e == 3 * r) return !0;
					n += this.ranges[e + i] - a;
				}
				return !1;
			}
			forEach(n) {
				var r = this.inverted ? 2 : 1,
					o = this.inverted ? 1 : 2;
				for (let e = 0, t = 0; e < this.ranges.length; e += 3) {
					var i = this.ranges[e],
						s = i - (this.inverted ? t : 0),
						i = i + (this.inverted ? 0 : t),
						a = this.ranges[e + r],
						l = this.ranges[e + o];
					n(s, s + a, i, i + l), (t += l - a);
				}
			}
			invert() {
				return new t0(this.ranges, !this.inverted);
			}
			toString() {
				return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
			}
			static offset(e) {
				return 0 == e ? t0.empty : new t0(e < 0 ? [0, -e, 0] : [0, 0, e]);
			}
		}
		t0.empty = new t0([]);
		class n0 {
			constructor(e = [], t, n = 0, r = e.length) {
				(this.maps = e), (this.mirror = t), (this.from = n), (this.to = r);
			}
			slice(e = 0, t = this.maps.length) {
				return new n0(this.maps, this.mirror, e, t);
			}
			copy() {
				return new n0(
					this.maps.slice(),
					this.mirror && this.mirror.slice(),
					this.from,
					this.to
				);
			}
			appendMap(e, t) {
				(this.to = this.maps.push(e)), null != t && this.setMirror(this.maps.length - 1, t);
			}
			appendMapping(n) {
				for (let e = 0, t = this.maps.length; e < n.maps.length; e++) {
					var r = n.getMirror(e);
					this.appendMap(n.maps[e], null != r && r < e ? t + r : void 0);
				}
			}
			getMirror(t) {
				if (this.mirror)
					for (let e = 0; e < this.mirror.length; e++)
						if (this.mirror[e] == t) return this.mirror[e + (e % 2 ? -1 : 1)];
			}
			setMirror(e, t) {
				this.mirror || (this.mirror = []), this.mirror.push(e, t);
			}
			appendMappingInverted(n) {
				for (let e = n.maps.length - 1, t = this.maps.length + n.maps.length; 0 <= e; e--) {
					var r = n.getMirror(e);
					this.appendMap(n.maps[e].invert(), null != r && r > e ? t - r - 1 : void 0);
				}
			}
			invert() {
				var e = new n0();
				return e.appendMappingInverted(this), e;
			}
			map(t, n = 1) {
				if (this.mirror) return this._map(t, n, !0);
				for (let e = this.from; e < this.to; e++) t = this.maps[e].map(t, n);
				return t;
			}
			mapResult(e, t = 1) {
				return this._map(e, t, !1);
			}
			_map(t, n, e) {
				let r = 0;
				for (let e = this.from; e < this.to; e++) {
					var o = this.maps[e].mapResult(t, n);
					if (null != o.recover) {
						var i = this.getMirror(e);
						if (null != i && i > e && i < this.to) {
							(e = i), (t = this.maps[i].recover(o.recover));
							continue;
						}
					}
					(r |= o.delInfo), (t = o.pos);
				}
				return e ? t : new e0(t, r, null);
			}
		}
		let r = Object.create(null);
		class r0 {
			getMap() {
				return t0.empty;
			}
			merge(e) {
				return null;
			}
			static fromJSON(e, t) {
				if (!t || !t.stepType) throw new RangeError("Invalid input for Step.fromJSON");
				var n = r[t.stepType];
				if (n) return n.fromJSON(e, t);
				throw new RangeError(`No step type ${t.stepType} defined`);
			}
			static jsonID(e, t) {
				if (e in r) throw new RangeError("Duplicate use of step JSON ID " + e);
				return ((r[e] = t).prototype.jsonID = e), t;
			}
		}
		class o0 {
			constructor(e, t) {
				(this.doc = e), (this.failed = t);
			}
			static ok(e) {
				return new o0(e, null);
			}
			static fail(e) {
				return new o0(null, e);
			}
			static fromReplace(e, t, n, r) {
				try {
					return o0.ok(e.replace(t, n, r));
				} catch (e) {
					if (e instanceof zy) return o0.fail(e.message);
					throw e;
				}
			}
		}
		function fn(n, r, o) {
			var i = [];
			for (let t = 0; t < n.childCount; t++) {
				let e = n.child(t);
				(e = e.content.size ? e.copy(fn(e.content, r, e)) : e).isInline && (e = r(e, o, t)),
					i.push(e);
			}
			return Je.fromArray(i);
		}
		class i0 extends r0 {
			constructor(e, t, n) {
				super(), (this.from = e), (this.to = t), (this.mark = n);
			}
			apply(e) {
				var t = e.slice(this.from, this.to),
					n = e.resolve(this.from),
					n = n.node(n.sharedDepth(this.to)),
					n = new Ke(
						fn(
							t.content,
							(e, t) =>
								e.isAtom && t.type.allowsMarkType(this.mark.type)
									? e.mark(this.mark.addToSet(e.marks))
									: e,
							n
						),
						t.openStart,
						t.openEnd
					);
				return o0.fromReplace(e, this.from, this.to, n);
			}
			invert() {
				return new s0(this.from, this.to, this.mark);
			}
			map(e) {
				var t = e.mapResult(this.from, 1),
					e = e.mapResult(this.to, -1);
				return (t.deleted && e.deleted) || t.pos >= e.pos
					? null
					: new i0(t.pos, e.pos, this.mark);
			}
			merge(e) {
				return e instanceof i0 &&
					e.mark.eq(this.mark) &&
					this.from <= e.to &&
					this.to >= e.from
					? new i0(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark)
					: null;
			}
			toJSON() {
				return {
					stepType: "addMark",
					mark: this.mark.toJSON(),
					from: this.from,
					to: this.to
				};
			}
			static fromJSON(e, t) {
				if ("number" != typeof t.from || "number" != typeof t.to)
					throw new RangeError("Invalid input for AddMarkStep.fromJSON");
				return new i0(t.from, t.to, e.markFromJSON(t.mark));
			}
		}
		r0.jsonID("addMark", i0);
		class s0 extends r0 {
			constructor(e, t, n) {
				super(), (this.from = e), (this.to = t), (this.mark = n);
			}
			apply(e) {
				var t = e.slice(this.from, this.to),
					t = new Ke(
						fn(t.content, e => e.mark(this.mark.removeFromSet(e.marks)), e),
						t.openStart,
						t.openEnd
					);
				return o0.fromReplace(e, this.from, this.to, t);
			}
			invert() {
				return new i0(this.from, this.to, this.mark);
			}
			map(e) {
				var t = e.mapResult(this.from, 1),
					e = e.mapResult(this.to, -1);
				return (t.deleted && e.deleted) || t.pos >= e.pos
					? null
					: new s0(t.pos, e.pos, this.mark);
			}
			merge(e) {
				return e instanceof s0 &&
					e.mark.eq(this.mark) &&
					this.from <= e.to &&
					this.to >= e.from
					? new s0(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark)
					: null;
			}
			toJSON() {
				return {
					stepType: "removeMark",
					mark: this.mark.toJSON(),
					from: this.from,
					to: this.to
				};
			}
			static fromJSON(e, t) {
				if ("number" != typeof t.from || "number" != typeof t.to)
					throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
				return new s0(t.from, t.to, e.markFromJSON(t.mark));
			}
		}
		r0.jsonID("removeMark", s0);
		class a0 extends r0 {
			constructor(e, t, n, r = !1) {
				super(), (this.from = e), (this.to = t), (this.slice = n), (this.structure = r);
			}
			apply(e) {
				return this.structure && mn(e, this.from, this.to)
					? o0.fail("Structure replace would overwrite content")
					: o0.fromReplace(e, this.from, this.to, this.slice);
			}
			getMap() {
				return new t0([this.from, this.to - this.from, this.slice.size]);
			}
			invert(e) {
				return new a0(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
			}
			map(e) {
				var t = e.mapResult(this.from, 1),
					e = e.mapResult(this.to, -1);
				return t.deletedAcross && e.deletedAcross
					? null
					: new a0(t.pos, Math.max(t.pos, e.pos), this.slice);
			}
			merge(e) {
				var t;
				return e instanceof a0 && !e.structure && !this.structure
					? this.from + this.slice.size != e.from ||
						this.slice.openEnd ||
						e.slice.openStart
						? e.to != this.from || this.slice.openStart || e.slice.openEnd
							? null
							: ((t =
									this.slice.size + e.slice.size == 0
										? Ke.empty
										: new Ke(
												e.slice.content.append(this.slice.content),
												e.slice.openStart,
												this.slice.openEnd
											)),
								new a0(e.from, this.to, t, this.structure))
						: ((t =
								this.slice.size + e.slice.size == 0
									? Ke.empty
									: new Ke(
											this.slice.content.append(e.slice.content),
											this.slice.openStart,
											e.slice.openEnd
										)),
							new a0(this.from, this.to + (e.to - e.from), t, this.structure))
					: null;
			}
			toJSON() {
				var e = { stepType: "replace", from: this.from, to: this.to };
				return (
					this.slice.size && (e.slice = this.slice.toJSON()),
					this.structure && (e.structure = !0),
					e
				);
			}
			static fromJSON(e, t) {
				if ("number" != typeof t.from || "number" != typeof t.to)
					throw new RangeError("Invalid input for ReplaceStep.fromJSON");
				return new a0(t.from, t.to, Ke.fromJSON(e, t.slice), !!t.structure);
			}
		}
		r0.jsonID("replace", a0);
		class l0 extends r0 {
			constructor(e, t, n, r, o, i, s = !1) {
				super(),
					(this.from = e),
					(this.to = t),
					(this.gapFrom = n),
					(this.gapTo = r),
					(this.slice = o),
					(this.insert = i),
					(this.structure = s);
			}
			apply(e) {
				var t;
				return this.structure &&
					(mn(e, this.from, this.gapFrom) || mn(e, this.gapTo, this.to))
					? o0.fail("Structure gap-replace would overwrite content")
					: (t = e.slice(this.gapFrom, this.gapTo)).openStart || t.openEnd
						? o0.fail("Gap is not a flat range")
						: (t = this.slice.insertAt(this.insert, t.content))
							? o0.fromReplace(e, this.from, this.to, t)
							: o0.fail("Content does not fit in gap");
			}
			getMap() {
				return new t0([
					this.from,
					this.gapFrom - this.from,
					this.insert,
					this.gapTo,
					this.to - this.gapTo,
					this.slice.size - this.insert
				]);
			}
			invert(e) {
				var t = this.gapTo - this.gapFrom;
				return new l0(
					this.from,
					this.from + this.slice.size + t,
					this.from + this.insert,
					this.from + this.insert + t,
					e
						.slice(this.from, this.to)
						.removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
					this.gapFrom - this.from,
					this.structure
				);
			}
			map(e) {
				var t = e.mapResult(this.from, 1),
					n = e.mapResult(this.to, -1),
					r = e.map(this.gapFrom, -1),
					e = e.map(this.gapTo, 1);
				return (t.deletedAcross && n.deletedAcross) || r < t.pos || e > n.pos
					? null
					: new l0(t.pos, n.pos, r, e, this.slice, this.insert, this.structure);
			}
			toJSON() {
				var e = {
					stepType: "replaceAround",
					from: this.from,
					to: this.to,
					gapFrom: this.gapFrom,
					gapTo: this.gapTo,
					insert: this.insert
				};
				return (
					this.slice.size && (e.slice = this.slice.toJSON()),
					this.structure && (e.structure = !0),
					e
				);
			}
			static fromJSON(e, t) {
				if (
					"number" != typeof t.from ||
					"number" != typeof t.to ||
					"number" != typeof t.gapFrom ||
					"number" != typeof t.gapTo ||
					"number" != typeof t.insert
				)
					throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
				return new l0(
					t.from,
					t.to,
					t.gapFrom,
					t.gapTo,
					Ke.fromJSON(e, t.slice),
					t.insert,
					!!t.structure
				);
			}
		}
		function mn(e, t, n) {
			let r = e.resolve(t),
				o = n - t,
				i = r.depth;
			for (; 0 < o && 0 < i && r.indexAfter(i) == r.node(i).childCount; ) i--, o--;
			if (0 < o) {
				let e = r.node(i).maybeChild(r.indexAfter(i));
				for (; 0 < o; ) {
					if (!e || e.isLeaf) return 1;
					(e = e.firstChild), o--;
				}
			}
		}
		function gn(t, e, n, r = n.contentMatch) {
			var o = t.doc.nodeAt(e);
			let i = [],
				s = e + 1;
			for (let e = 0; e < o.childCount; e++) {
				var a = o.child(e),
					l = s + a.nodeSize,
					c = r.matchType(a.type);
				if (c) {
					r = c;
					for (let e = 0; e < a.marks.length; e++)
						n.allowsMarkType(a.marks[e].type) || t.step(new s0(s, l, a.marks[e]));
				} else i.push(new a0(s, l, Ke.empty));
				s = l;
			}
			r.validEnd || ((e = r.fillBefore(Je.empty, !0)), t.replace(s, s, new Ke(e, 0, 0)));
			for (let e = i.length - 1; 0 <= e; e--) t.step(i[e]);
		}
		function vn(t) {
			var n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
			for (let e = t.depth; ; --e) {
				var r = t.$from.node(e),
					o = t.$from.index(e),
					i = t.$to.indexAfter(e);
				if (e < t.depth && r.canReplace(o, i, n)) return e;
				if (
					0 == e ||
					r.type.spec.isolating ||
					((r = r), (i = i), 0 != (o = o) && !r.canReplace(o, r.childCount)) ||
					(i != r.childCount && !r.canReplace(0, i))
				)
					break;
			}
			return null;
		}
		function yn(e, t, n = null, r = e) {
			var o = ((e, t) => {
					var { parent: e, startIndex: n, endIndex: r } = e,
						o = e.contentMatchAt(n).findWrapping(t);
					return o && ((t = o.length ? o[0] : t), e.canReplaceWith(n, r, t)) ? o : null;
				})(e, t),
				r =
					o &&
					((t, e) => {
						var { parent: n, startIndex: t, endIndex: r } = t,
							o = n.child(t);
						if (!(o = e.contentMatch.findWrapping(o.type))) return null;
						let i = o.length ? o[o.length - 1] : e,
							s = i.contentMatch;
						for (let e = t; s && e < r; e++) s = s.matchType(n.child(e).type);
						return s && s.validEnd ? o : null;
					})(r, t);
			return r ? o.map(bn).concat({ type: t, attrs: n }).concat(r.map(bn)) : null;
		}
		function bn(e) {
			return { type: e, attrs: null };
		}
		function wn(o, e, t, i, s) {
			if (!i.isTextblock)
				throw new RangeError("Type given to setBlockType should be a textblock");
			let a = o.steps.length;
			o.doc.nodesBetween(e, t, (e, t) => {
				var n, r;
				if (
					e.isTextblock &&
					!e.hasMarkup(i, s) &&
					((e, t, n) => (
						(e = e.resolve(t)), (t = e.index()), e.parent.canReplaceWith(t, t + 1, n)
					))(o.doc, o.mapping.slice(a).map(t), i)
				)
					return (
						o.clearIncompatible(o.mapping.slice(a).map(t, 1), i),
						(n = (r = o.mapping.slice(a)).map(t, 1)),
						(r = r.map(t + e.nodeSize, 1)),
						o.step(
							new l0(
								n,
								r,
								n + 1,
								r - 1,
								new Ke(Je.from(i.create(s, null, e.marks)), 0, 0),
								1,
								!0
							)
						),
						!1
					);
			});
		}
		function kn(e, t, r = 1, o) {
			var i = e.resolve(t),
				s = i.depth - r,
				e = (o && o[o.length - 1]) || i.parent;
			if (
				s < 0 ||
				i.parent.type.spec.isolating ||
				!i.parent.canReplace(i.index(), i.parent.childCount) ||
				!e.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount))
			)
				return !1;
			for (let t = i.depth - 1, n = r - 2; t > s; t--, n--) {
				var a = i.node(t),
					l = i.index(t);
				if (a.type.spec.isolating) return !1;
				let e = a.content.cutByIndex(l, a.childCount);
				var c = (o && o[n]) || a;
				if (
					(c != a && (e = e.replaceChild(0, c.type.create(c.attrs))),
					!a.canReplace(l + 1, a.childCount) || !c.type.validContent(e))
				)
					return !1;
			}
			(t = i.indexAfter(s)), (e = o && o[0]);
			return i.node(s).canReplaceWith(t, t, (e || i.node(1 + s)).type);
		}
		function xn(e, t) {
			(e = e.resolve(t)), (t = e.index());
			return Cn(e.nodeBefore, e.nodeAfter) && e.parent.canReplace(t, t + 1);
		}
		function Cn(e, t) {
			return !(!e || !t || e.isLeaf || !e.canAppend(t));
		}
		function Tn(e, t, n = t, r = Ke.empty) {
			var o;
			return t != n || r.size
				? Mn((o = e.resolve(t)), (e = e.resolve(n)), r)
					? new a0(t, n, r)
					: new c0(o, e, r).fit()
				: null;
		}
		function Mn(e, t, n) {
			return (
				!n.openStart &&
				!n.openEnd &&
				e.start() == t.start() &&
				e.parent.canReplace(e.index(), t.index(), n.content)
			);
		}
		r0.jsonID("replaceAround", l0);
		class c0 {
			constructor(t, e, n) {
				(this.$from = t),
					(this.$to = e),
					(this.unplaced = n),
					(this.frontier = []),
					(this.placed = Je.empty);
				for (let e = 0; e <= t.depth; e++) {
					var r = t.node(e);
					this.frontier.push({ type: r.type, match: r.contentMatchAt(t.indexAfter(e)) });
				}
				for (let e = t.depth; 0 < e; e--)
					this.placed = Je.from(t.node(e).copy(this.placed));
			}
			get depth() {
				return this.frontier.length - 1;
			}
			fit() {
				for (; this.unplaced.size; ) {
					var e = this.findFittable();
					e ? this.placeNodes(e) : this.openMore() || this.dropNode();
				}
				var t = this.mustMoveInline(),
					n = this.placed.size - this.depth - this.$from.depth,
					r = this.$from,
					o = this.close(t < 0 ? this.$to : r.doc.resolve(t));
				if (!o) return null;
				let i = this.placed,
					s = r.depth,
					a = o.depth;
				for (; s && a && 1 == i.childCount; ) (i = i.firstChild.content), s--, a--;
				var l = new Ke(i, s, a);
				return -1 < t
					? new l0(r.pos, t, this.$to.pos, this.$to.end(), l, n)
					: l.size || r.pos != this.$to.pos
						? new a0(r.pos, o.pos, l)
						: null;
			}
			findFittable() {
				for (let a = 1; a <= 2; a++)
					for (let s = this.unplaced.openStart; 0 <= s; s--) {
						let e,
							i = null;
						var l = (e = (
							s ? (i = Nn(this.unplaced.content, s - 1).firstChild) : this.unplaced
						).content).firstChild;
						for (let o = this.depth; 0 <= o; o--) {
							let { type: e, match: t } = this.frontier[o],
								n,
								r = null;
							if (
								1 == a &&
								(l
									? t.matchType(l.type) || (r = t.fillBefore(Je.from(l), !1))
									: i && e.compatibleContent(i.type))
							)
								return { sliceDepth: s, frontierDepth: o, parent: i, inject: r };
							if (2 == a && l && (n = t.findWrapping(l.type)))
								return { sliceDepth: s, frontierDepth: o, parent: i, wrap: n };
							if (i && t.matchType(i.type)) break;
						}
					}
			}
			openMore() {
				var { content: e, openStart: t, openEnd: n } = this.unplaced,
					r = Nn(e, t);
				return !(
					!r.childCount ||
					r.firstChild.isLeaf ||
					((this.unplaced = new Ke(
						e,
						t + 1,
						Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)
					)),
					0)
				);
			}
			dropNode() {
				var { content: e, openStart: t, openEnd: n } = this.unplaced,
					r = Nn(e, t);
				r.childCount <= 1 && 0 < t
					? ((r = e.size - t <= t + r.size),
						(this.unplaced = new Ke(Sn(e, t - 1, 1), t - 1, r ? t - 1 : n)))
					: (this.unplaced = new Ke(Sn(e, t, 1), t, n));
			}
			placeNodes({ sliceDepth: e, frontierDepth: t, parent: n, inject: r, wrap: o }) {
				for (; this.depth > t; ) this.closeFrontierNode();
				if (o) for (let e = 0; e < o.length; e++) this.openFrontierNode(o[e]);
				var i = this.unplaced,
					s = (n || i).content,
					a = i.openStart - e;
				let l = 0,
					c = [],
					{ match: u, type: d } = this.frontier[t];
				if (r) {
					for (let e = 0; e < r.childCount; e++) c.push(r.child(e));
					u = u.matchFragment(r);
				}
				let p = s.size + e - (i.content.size - i.openEnd);
				for (; l < s.childCount; ) {
					var h = s.child(l),
						f = u.matchType(h.type);
					if (!f) break;
					(1 < ++l || 0 == a || h.content.size) &&
						((u = f),
						c.push(
							(function e(t, n, r) {
								if (n <= 0) return t;
								let o = t.content;
								1 < n &&
									(o = o.replaceChild(
										0,
										e(o.firstChild, n - 1, 1 == o.childCount ? r - 1 : 0)
									));
								0 < n &&
									((o = t.type.contentMatch.fillBefore(o).append(o)), r <= 0) &&
									(o = o.append(
										t.type.contentMatch
											.matchFragment(o)
											.fillBefore(Je.empty, !0)
									));
								return t.copy(o);
							})(
								h.mark(d.allowedMarks(h.marks)),
								1 == l ? a : 0,
								l == s.childCount ? p : -1
							)
						));
				}
				var m = l == s.childCount;
				m || (p = -1),
					(this.placed = En(this.placed, t, Je.from(c))),
					(this.frontier[t].match = u),
					m &&
						p < 0 &&
						n &&
						n.type == this.frontier[this.depth].type &&
						1 < this.frontier.length &&
						this.closeFrontierNode();
				for (let e = 0, t = s; e < p; e++) {
					var g = t.lastChild;
					this.frontier.push({ type: g.type, match: g.contentMatchAt(g.childCount) }),
						(t = g.content);
				}
				this.unplaced = m
					? 0 == e
						? Ke.empty
						: new Ke(Sn(i.content, e - 1, 1), e - 1, p < 0 ? i.openEnd : e - 1)
					: new Ke(Sn(i.content, e, l), i.openStart, i.openEnd);
			}
			mustMoveInline() {
				if (!this.$to.parent.isTextblock) return -1;
				let e = this.frontier[this.depth],
					t;
				if (
					!e.type.isTextblock ||
					!On(this.$to, this.$to.depth, e.type, e.match, !1) ||
					(this.$to.depth == this.depth &&
						(t = this.findCloseLevel(this.$to)) &&
						t.depth == this.depth)
				)
					return -1;
				let n = this.$to.depth,
					r = this.$to.after(n);
				for (; 1 < n && r == this.$to.end(--n); ) ++r;
				return r;
			}
			findCloseLevel(n) {
				e: for (let t = Math.min(this.depth, n.depth); 0 <= t; t--) {
					var { match: e, type: r } = this.frontier[t],
						o = t < n.depth && n.end(t + 1) == n.pos + (n.depth - (t + 1)),
						r = On(n, t, r, e, o);
					if (r) {
						for (let e = t - 1; 0 <= e; e--) {
							var { match: i, type: s } = this.frontier[e],
								s = On(n, e, s, i, !0);
							if (!s || s.childCount) continue e;
						}
						return { depth: t, fit: r, move: o ? n.doc.resolve(n.after(t + 1)) : n };
					}
				}
			}
			close(t) {
				var n = this.findCloseLevel(t);
				if (!n) return null;
				for (; this.depth > n.depth; ) this.closeFrontierNode();
				n.fit.childCount && (this.placed = En(this.placed, n.depth, n.fit)), (t = n.move);
				for (let e = n.depth + 1; e <= t.depth; e++) {
					var r = t.node(e),
						o = r.type.contentMatch.fillBefore(r.content, !0, t.index(e));
					this.openFrontierNode(r.type, r.attrs, o);
				}
				return t;
			}
			openFrontierNode(e, t = null, n) {
				var r = this.frontier[this.depth];
				(r.match = r.match.matchType(e)),
					(this.placed = En(this.placed, this.depth, Je.from(e.create(t, n)))),
					this.frontier.push({ type: e, match: e.contentMatch });
			}
			closeFrontierNode() {
				var e = this.frontier.pop().match.fillBefore(Je.empty, !0);
				e.childCount && (this.placed = En(this.placed, this.frontier.length, e));
			}
		}
		function Sn(e, t, n) {
			return 0 == t
				? e.cutByIndex(n, e.childCount)
				: e.replaceChild(0, e.firstChild.copy(Sn(e.firstChild.content, t - 1, n)));
		}
		function En(e, t, n) {
			return 0 == t
				? e.append(n)
				: e.replaceChild(
						e.childCount - 1,
						e.lastChild.copy(En(e.lastChild.content, t - 1, n))
					);
		}
		function Nn(t, n) {
			for (let e = 0; e < n; e++) t = t.firstChild.content;
			return t;
		}
		function On(e, t, n, r, o) {
			var i = e.node(t),
				o = o ? e.indexAfter(t) : e.index(t);
			return (o != i.childCount || n.compatibleContent(i.type)) &&
				(e = r.fillBefore(i.content, !0, o)) &&
				!((t, n, r) => {
					for (let e = r; e < n.childCount; e++)
						if (!t.allowsMarks(n.child(e).marks)) return 1;
				})(n, i.content, o)
				? e
				: null;
		}
		function Dn(r, t, o, i) {
			if (!i.size) return r.deleteRange(t, o);
			var s = r.doc.resolve(t),
				a = r.doc.resolve(o);
			if (Mn(s, a, i)) return r.step(new a0(t, o, i));
			var l = Ln(s, r.doc.resolve(o));
			0 == l[l.length - 1] && l.pop();
			let n = -(s.depth + 1);
			l.unshift(n);
			for (let e = s.depth, t = s.pos - 1; 0 < e; e--, t--) {
				var c = s.node(e).type.spec;
				if (c.defining || c.definingAsContext || c.isolating) break;
				-1 < l.indexOf(e) ? (n = e) : s.before(e) == t && l.splice(1, 0, -e);
			}
			var u = l.indexOf(n);
			let d = [],
				p = i.openStart;
			for (let e = i.content, t = 0; ; t++) {
				var h = e.firstChild;
				if ((d.push(h), t == i.openStart)) break;
				e = h.content;
			}
			for (let e = p - 1; 0 <= e; e--) {
				var f = d[e].type,
					m = (m = f).spec.defining || m.spec.definingForContent;
				if (m && s.node(u).type != f) p = e;
				else if (m || !f.isTextblock) break;
			}
			for (let e = i.openStart; 0 <= e; e--) {
				var g = (e + p + 1) % (i.openStart + 1),
					v = d[g];
				if (v)
					for (let n = 0; n < l.length; n++) {
						let e = l[(n + u) % l.length],
							t = !0;
						e < 0 && ((t = !1), (e = -e));
						var y = s.node(e - 1),
							b = s.index(e - 1);
						if (y.canReplaceWith(b, b, v.type, v.marks))
							return r.replace(
								s.before(e),
								t ? a.after(e) : o,
								new Ke(
									(function t(n, r, o, i, s) {
										if (r < o) {
											let e = n.firstChild;
											n = n.replaceChild(
												0,
												e.copy(t(e.content, r + 1, o, i, e))
											);
										}
										if (i < r) {
											let e = s.contentMatchAt(0),
												t = e.fillBefore(n).append(n);
											n = t.append(
												e.matchFragment(t).fillBefore(Je.empty, !0)
											);
										}
										return n;
									})(i.content, 0, i.openStart, g),
									g,
									i.openEnd
								)
							);
					}
			}
			var w = r.steps.length;
			for (let e = l.length - 1; 0 <= e && (r.replace(t, o, i), !(r.steps.length > w)); e--) {
				var k = l[e];
				k < 0 || ((t = s.before(k)), (o = a.after(k)));
			}
		}
		function An(e, t, n, r) {
			var o;
			!r.isInline &&
				t == n &&
				e.doc.resolve(t).parent.content.size &&
				null !=
					(o = ((e, t, n) => {
						var r = e.resolve(t);
						if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
						if (0 == r.parentOffset)
							for (let e = r.depth - 1; 0 <= e; e--) {
								var o = r.index(e);
								if (r.node(e).canReplaceWith(o, o, n)) return r.before(e + 1);
								if (0 < o) return null;
							}
						if (r.parentOffset == r.parent.content.size)
							for (let e = r.depth - 1; 0 <= e; e--) {
								var i = r.indexAfter(e);
								if (r.node(e).canReplaceWith(i, i, n)) return r.after(e + 1);
								if (i < r.node(e).childCount) return null;
							}
						return null;
					})(e.doc, t, r.type)) &&
				(t = n = o),
				e.replaceRange(t, n, new Ke(Je.from(r), 0, 0));
		}
		function Ln(t, n) {
			var r = [];
			for (let e = Math.min(t.depth, n.depth); 0 <= e; e--) {
				var o = t.start(e);
				if (
					o < t.pos - (t.depth - e) ||
					n.end(e) > n.pos + (n.depth - e) ||
					t.node(e).type.spec.isolating ||
					n.node(e).type.spec.isolating
				)
					break;
				(o == n.start(e) ||
					(e == t.depth &&
						e == n.depth &&
						t.parent.inlineContent &&
						n.parent.inlineContent &&
						e &&
						n.start(e - 1) == o - 1)) &&
					r.push(e);
			}
			return r;
		}
		(class extends Error {});
		let t;
		((t = function e(t) {
			t = Error.call(this, t);
			return (t.__proto__ = e.prototype), t;
		}).prototype = Object.create(Error.prototype)),
			((t.prototype.constructor = t).prototype.name = "TransformError");
		class u0 {
			constructor(e) {
				(this.doc = e), (this.steps = []), (this.docs = []), (this.mapping = new n0());
			}
			get before() {
				return this.docs.length ? this.docs[0] : this.doc;
			}
			step(e) {
				e = this.maybeStep(e);
				if (e.failed) throw new t(e.failed);
				return this;
			}
			maybeStep(e) {
				var t = e.apply(this.doc);
				return t.failed || this.addStep(e, t.doc), t;
			}
			get docChanged() {
				return 0 < this.steps.length;
			}
			addStep(e, t) {
				this.docs.push(this.doc),
					this.steps.push(e),
					this.mapping.appendMap(e.getMap()),
					(this.doc = t);
			}
			replace(e, t = e, n = Ke.empty) {
				t = Tn(this.doc, e, t, n);
				return t && this.step(t), this;
			}
			replaceWith(e, t, n) {
				return this.replace(e, t, new Ke(Je.from(n), 0, 0));
			}
			delete(e, t) {
				return this.replace(e, t, Ke.empty);
			}
			insert(e, t) {
				return this.replaceWith(e, e, t);
			}
			replaceRange(e, t, n) {
				return Dn(this, e, t, n), this;
			}
			replaceRangeWith(e, t, n) {
				return An(this, e, t, n), this;
			}
			deleteRange(e, t) {
				return (
					((t, n, r) => {
						var o = t.doc.resolve(n),
							i = t.doc.resolve(r),
							s = Ln(o, i);
						for (let e = 0; e < s.length; e++) {
							var a = s[e],
								l = e == s.length - 1;
							if ((l && 0 == a) || o.node(a).type.contentMatch.validEnd)
								return t.delete(o.start(a), i.end(a));
							if (
								0 < a &&
								(l || o.node(a - 1).canReplace(o.index(a - 1), i.indexAfter(a - 1)))
							)
								return t.delete(o.before(a), i.after(a));
						}
						for (let e = 1; e <= o.depth && e <= i.depth; e++)
							if (
								n - o.start(e) == o.depth - e &&
								r > o.end(e) &&
								i.end(e) - r != i.depth - e
							)
								return t.delete(o.before(e), r);
						t.delete(n, r);
					})(this, e, t),
					this
				);
			}
			lift(l, e) {
				{
					var t = this,
						c = e,
						{ $from: u, $to: d, depth: l } = l,
						e = u.before(l + 1),
						p = d.after(l + 1);
					let n = e,
						r = p,
						o = Je.empty,
						i = 0;
					for (let e = l, t = !1; e > c; e--)
						t || 0 < u.index(e)
							? ((t = !0), (o = Je.from(u.node(e).copy(o))), i++)
							: n--;
					let s = Je.empty,
						a = 0;
					for (let e = l, t = !1; e > c; e--)
						t || d.after(e + 1) < d.end(e)
							? ((t = !0), (s = Je.from(d.node(e).copy(s))), a++)
							: r++;
					t.step(new l0(n, r, e, p, new Ke(o.append(s), i, a), o.size - i, !0));
				}
				return this;
			}
			join(e, t = 1) {
				var n;
				return (
					(n = this),
					(e = e),
					(t = t),
					(e = new a0(e - t, e + t, Ke.empty, !0)),
					n.step(e),
					this
				);
			}
			wrap(e, n) {
				{
					var r = this,
						o = n;
					let t = Je.empty;
					for (let e = o.length - 1; 0 <= e; e--) {
						if (t.size) {
							var i = o[e].type.contentMatch.matchFragment(t);
							if (!i || !i.validEnd)
								throw new RangeError(
									"Wrapper type given to Transform.wrap does not form valid content of its parent wrapper"
								);
						}
						t = Je.from(o[e].type.create(o[e].attrs, t));
					}
					(n = e.start),
						(e = e.end),
						r.step(new l0(n, e, n, e, new Ke(t, 0, 0), o.length, !0));
				}
				return this;
			}
			setBlockType(e, t = e, n, r = null) {
				return wn(this, e, t, n, r), this;
			}
			setNodeMarkup(e, t, n = null, r = []) {
				return (
					((e, t, n, r, o) => {
						var i = e.doc.nodeAt(t);
						if (!i) throw new RangeError("No node at given position");
						if (((r = (n = n || i.type).create(r, null, o || i.marks)), i.isLeaf))
							return e.replaceWith(t, t + i.nodeSize, r);
						if (!n.validContent(i.content))
							throw new RangeError("Invalid content for node type " + n.name);
						e.step(
							new l0(
								t,
								t + i.nodeSize,
								t + 1,
								t + i.nodeSize - 1,
								new Ke(Je.from(r), 0, 0),
								1,
								!0
							)
						);
					})(this, e, t, n, r),
					this
				);
			}
			split(e, t = 1, s) {
				{
					var [e, t, s = 1, a] = [this, e, t, s];
					let r = e.doc.resolve(t),
						o = Je.empty,
						i = Je.empty;
					for (let e = r.depth, t = r.depth - s, n = s - 1; e > t; e--, n--) {
						o = Je.from(r.node(e).copy(o));
						var l = a && a[n];
						i = Je.from(l ? l.type.create(l.attrs, i) : r.node(e).copy(i));
					}
					e.step(new a0(t, t, new Ke(o.append(i), s, s), !0));
				}
				return this;
			}
			addMark(e, t, n) {
				{
					var r = this,
						d = e,
						p = t,
						h = n;
					let a = [],
						l = [],
						c,
						u;
					r.doc.nodesBetween(d, p, (e, t, n) => {
						if (e.isInline) {
							var r = e.marks;
							if (!h.isInSet(r) && n.type.allowsMarkType(h.type)) {
								var o = Math.max(t, d),
									i = Math.min(t + e.nodeSize, p),
									s = h.addToSet(r);
								for (let e = 0; e < r.length; e++)
									r[e].isInSet(s) ||
										(c && c.to == o && c.mark.eq(r[e])
											? (c.to = i)
											: a.push((c = new s0(o, i, r[e]))));
								u && u.to == o ? (u.to = i) : l.push((u = new i0(o, i, h)));
							}
						}
					}),
						a.forEach(e => r.step(e)),
						l.forEach(e => r.step(e));
				}
				return this;
			}
			removeMark(e, t, n) {
				{
					var r = this,
						c = e,
						u = t,
						d = n;
					let a = [],
						l = 0;
					r.doc.nodesBetween(c, u, (n, o) => {
						if (n.isInline) {
							l++;
							let r = null;
							if (d instanceof Gy) {
								let e = n.marks,
									t;
								for (; (t = d.isInSet(e)); )
									(r = r || []).push(t), (e = t.removeFromSet(e));
							} else d ? d.isInSet(n.marks) && (r = [d]) : (r = n.marks);
							if (r && r.length) {
								var i = Math.min(o + n.nodeSize, u);
								for (let e = 0; e < r.length; e++) {
									let t = r[e],
										n;
									for (let e = 0; e < a.length; e++) {
										var s = a[e];
										s.step == l - 1 && t.eq(a[e].style) && (n = s);
									}
									n
										? ((n.to = i), (n.step = l))
										: a.push({
												style: t,
												from: Math.max(o, c),
												to: i,
												step: l
											});
								}
							}
						}
					}),
						a.forEach(e => r.step(new s0(e.from, e.to, e.style)));
				}
				return this;
			}
			clearIncompatible(e, t, n) {
				return gn(this, e, t, n), this;
			}
		}
		let a = Object.create(null);
		class Ze {
			constructor(e, t, n) {
				(this.$anchor = e),
					(this.$head = t),
					(this.ranges = n || [new d0(e.min(t), e.max(t))]);
			}
			get anchor() {
				return this.$anchor.pos;
			}
			get head() {
				return this.$head.pos;
			}
			get from() {
				return this.$from.pos;
			}
			get to() {
				return this.$to.pos;
			}
			get $from() {
				return this.ranges[0].$from;
			}
			get $to() {
				return this.ranges[0].$to;
			}
			get empty() {
				var t = this.ranges;
				for (let e = 0; e < t.length; e++) if (t[e].$from.pos != t[e].$to.pos) return !1;
				return !0;
			}
			content() {
				return this.$from.doc.slice(this.from, this.to, !0);
			}
			replace(t, n = Ke.empty) {
				let r = n.content.lastChild,
					o = null;
				for (let e = 0; e < n.openEnd; e++) r = (o = r).lastChild;
				var i = t.steps.length,
					s = this.ranges;
				for (let e = 0; e < s.length; e++) {
					var { $from: a, $to: l } = s[e],
						c = t.mapping.slice(i);
					t.replaceRange(c.map(a.pos), c.map(l.pos), e ? Ke.empty : n),
						0 == e && Pn(t, i, (r ? r.isInline : o && o.isTextblock) ? -1 : 1);
				}
			}
			replaceWith(t, n) {
				var r = t.steps.length,
					o = this.ranges;
				for (let e = 0; e < o.length; e++) {
					var { $from: i, $to: s } = o[e],
						a = t.mapping.slice(r),
						i = a.map(i.pos),
						a = a.map(s.pos);
					e
						? t.deleteRange(i, a)
						: (t.replaceRangeWith(i, a, n), Pn(t, r, n.isInline ? -1 : 1));
				}
			}
			static findFrom(t, n, r = !1) {
				var e = t.parent.inlineContent
					? new Xe(t)
					: Rn(t.node(0), t.parent, t.pos, t.index(), n, r);
				if (e) return e;
				for (let e = t.depth - 1; 0 <= e; e--) {
					var o =
						n < 0
							? Rn(t.node(0), t.node(e), t.before(e + 1), t.index(e), n, r)
							: Rn(t.node(0), t.node(e), t.after(e + 1), t.index(e) + 1, n, r);
					if (o) return o;
				}
				return null;
			}
			static near(e, t = 1) {
				return this.findFrom(e, t) || this.findFrom(e, -t) || new f0(e.node(0));
			}
			static atStart(e) {
				return Rn(e, e, 0, 0, 1) || new f0(e);
			}
			static atEnd(e) {
				return Rn(e, e, e.content.size, e.childCount, -1) || new f0(e);
			}
			static fromJSON(e, t) {
				if (!t || !t.type) throw new RangeError("Invalid input for Selection.fromJSON");
				var n = a[t.type];
				if (n) return n.fromJSON(e, t);
				throw new RangeError(`No selection type ${t.type} defined`);
			}
			static jsonID(e, t) {
				if (e in a) throw new RangeError("Duplicate use of selection JSON ID " + e);
				return ((a[e] = t).prototype.jsonID = e), t;
			}
			getBookmark() {
				return Xe.between(this.$anchor, this.$head).getBookmark();
			}
		}
		class d0 {
			constructor(e, t) {
				(this.$from = e), (this.$to = t);
			}
		}
		let V = !(Ze.prototype.visible = !0);
		function In(e) {
			V ||
				e.parent.inlineContent ||
				((V = !0),
				console.warn(
					"TextSelection endpoint not pointing into a node with inline content (" +
						e.parent.type.name +
						")"
				));
		}
		class Xe extends Ze {
			constructor(e, t = e) {
				In(e), In(t), super(e, t);
			}
			get $cursor() {
				return this.$anchor.pos == this.$head.pos ? this.$head : null;
			}
			map(e, t) {
				var n = e.resolve(t.map(this.head));
				return n.parent.inlineContent
					? ((e = e.resolve(t.map(this.anchor))),
						new Xe(e.parent.inlineContent ? e : n, n))
					: Ze.near(n);
			}
			replace(e, t = Ke.empty) {
				super.replace(e, t),
					t == Ke.empty && (t = this.$from.marksAcross(this.$to)) && e.ensureMarks(t);
			}
			eq(e) {
				return e instanceof Xe && e.anchor == this.anchor && e.head == this.head;
			}
			getBookmark() {
				return new p0(this.anchor, this.head);
			}
			toJSON() {
				return { type: "text", anchor: this.anchor, head: this.head };
			}
			static fromJSON(e, t) {
				if ("number" != typeof t.anchor || "number" != typeof t.head)
					throw new RangeError("Invalid input for TextSelection.fromJSON");
				return new Xe(e.resolve(t.anchor), e.resolve(t.head));
			}
			static create(e, t, n = t) {
				var r = e.resolve(t);
				return new this(r, n == t ? r : e.resolve(n));
			}
			static between(e, t, n) {
				var r = e.pos - t.pos;
				if (((n && !r) || (n = 0 <= r ? 1 : -1), !t.parent.inlineContent)) {
					var o = Ze.findFrom(t, n, !0) || Ze.findFrom(t, -n, !0);
					if (!o) return Ze.near(t, n);
					t = o.$head;
				}
				return (
					e.parent.inlineContent ||
						(0 != r &&
							(e = (Ze.findFrom(e, -n, !0) || Ze.findFrom(e, n, !0)).$anchor).pos <
								t.pos ==
								r < 0) ||
						(e = t),
					new Xe(e, t)
				);
			}
		}
		Ze.jsonID("text", Xe);
		class p0 {
			constructor(e, t) {
				(this.anchor = e), (this.head = t);
			}
			map(e) {
				return new p0(e.map(this.anchor), e.map(this.head));
			}
			resolve(e) {
				return Xe.between(e.resolve(this.anchor), e.resolve(this.head));
			}
		}
		class Qe extends Ze {
			constructor(e) {
				var t = e.nodeAfter,
					n = e.node(0).resolve(e.pos + t.nodeSize);
				super(e, n), (this.node = t);
			}
			map(e, t) {
				var { deleted: t, pos: n } = t.mapResult(this.anchor),
					e = e.resolve(n);
				return t ? Ze.near(e) : new Qe(e);
			}
			content() {
				return new Ke(Je.from(this.node), 0, 0);
			}
			eq(e) {
				return e instanceof Qe && e.anchor == this.anchor;
			}
			toJSON() {
				return { type: "node", anchor: this.anchor };
			}
			getBookmark() {
				return new h0(this.anchor);
			}
			static fromJSON(e, t) {
				if ("number" != typeof t.anchor)
					throw new RangeError("Invalid input for NodeSelection.fromJSON");
				return new Qe(e.resolve(t.anchor));
			}
			static create(e, t) {
				return new Qe(e.resolve(t));
			}
			static isSelectable(e) {
				return !e.isText && !1 !== e.type.spec.selectable;
			}
		}
		(Qe.prototype.visible = !1), Ze.jsonID("node", Qe);
		class h0 {
			constructor(e) {
				this.anchor = e;
			}
			map(e) {
				var { deleted: e, pos: t } = e.mapResult(this.anchor);
				return e ? new p0(t, t) : new h0(t);
			}
			resolve(e) {
				var e = e.resolve(this.anchor),
					t = e.nodeAfter;
				return t && Qe.isSelectable(t) ? new Qe(e) : Ze.near(e);
			}
		}
		class f0 extends Ze {
			constructor(e) {
				super(e.resolve(0), e.resolve(e.content.size));
			}
			replace(e, t = Ke.empty) {
				var n;
				t == Ke.empty
					? (e.delete(0, e.doc.content.size),
						(n = Ze.atStart(e.doc)).eq(e.selection) || e.setSelection(n))
					: super.replace(e, t);
			}
			toJSON() {
				return { type: "all" };
			}
			static fromJSON(e) {
				return new f0(e);
			}
			map(e) {
				return new f0(e);
			}
			eq(e) {
				return e instanceof f0;
			}
			getBookmark() {
				return j;
			}
		}
		Ze.jsonID("all", f0);
		let j = {
			map() {
				return this;
			},
			resolve(e) {
				return new f0(e);
			}
		};
		function Rn(t, n, r, o, i, s = !1) {
			if (n.inlineContent) return Xe.create(t, r);
			for (let e = o - (0 < i ? 0 : 1); 0 < i ? e < n.childCount : 0 <= e; e += i) {
				var a = n.child(e);
				if (a.isAtom) {
					if (!s && Qe.isSelectable(a)) return Qe.create(t, r - (i < 0 ? a.nodeSize : 0));
				} else {
					var l = Rn(t, a, r + i, i < 0 ? a.childCount : 0, i, s);
					if (l) return l;
				}
				r += a.nodeSize * i;
			}
			return null;
		}
		function Pn(t, e, n) {
			var r = t.steps.length - 1;
			if (!(r < e)) {
				e = t.steps[r];
				if (e instanceof a0 || e instanceof l0) {
					let e = t.mapping.maps[r],
						o;
					e.forEach((e, t, n, r) => {
						null == o && (o = r);
					}),
						t.setSelection(Ze.near(t.doc.resolve(o), n));
				}
			}
		}
		class m0 extends u0 {
			constructor(e) {
				super(e.doc),
					(this.curSelectionFor = 0),
					(this.updated = 0),
					(this.meta = Object.create(null)),
					(this.time = Date.now()),
					(this.curSelection = e.selection),
					(this.storedMarks = e.storedMarks);
			}
			get selection() {
				return (
					this.curSelectionFor < this.steps.length &&
						((this.curSelection = this.curSelection.map(
							this.doc,
							this.mapping.slice(this.curSelectionFor)
						)),
						(this.curSelectionFor = this.steps.length)),
					this.curSelection
				);
			}
			setSelection(e) {
				if (e.$from.doc != this.doc)
					throw new RangeError(
						"Selection passed to setSelection must point at the current document"
					);
				return (
					(this.curSelection = e),
					(this.curSelectionFor = this.steps.length),
					(this.updated = -3 & (1 | this.updated)),
					(this.storedMarks = null),
					this
				);
			}
			get selectionSet() {
				return 0 < (1 & this.updated);
			}
			setStoredMarks(e) {
				return (this.storedMarks = e), (this.updated |= 2), this;
			}
			ensureMarks(e) {
				return (
					Ge.sameSet(this.storedMarks || this.selection.$from.marks(), e) ||
						this.setStoredMarks(e),
					this
				);
			}
			addStoredMark(e) {
				return this.ensureMarks(
					e.addToSet(this.storedMarks || this.selection.$head.marks())
				);
			}
			removeStoredMark(e) {
				return this.ensureMarks(
					e.removeFromSet(this.storedMarks || this.selection.$head.marks())
				);
			}
			get storedMarksSet() {
				return 0 < (2 & this.updated);
			}
			addStep(e, t) {
				super.addStep(e, t), (this.updated = -3 & this.updated), (this.storedMarks = null);
			}
			setTime(e) {
				return (this.time = e), this;
			}
			replaceSelection(e) {
				return this.selection.replace(this, e), this;
			}
			replaceSelectionWith(e, t = !0) {
				var n = this.selection;
				return (
					t &&
						(e = e.mark(
							this.storedMarks ||
								(n.empty ? n.$from.marks() : n.$from.marksAcross(n.$to) || Ge.none)
						)),
					n.replaceWith(this, e),
					this
				);
			}
			deleteSelection() {
				return this.selection.replace(this), this;
			}
			insertText(t, n, r) {
				var o,
					i = this.doc.type.schema;
				if (null == n)
					return t ? this.replaceSelectionWith(i.text(t), !0) : this.deleteSelection();
				{
					if (((r = null == (r = null == r ? n : r) ? n : r), !t))
						return this.deleteRange(n, r);
					let e = this.storedMarks;
					return (
						e ||
							((o = this.doc.resolve(n)),
							(e = r == n ? o.marks() : o.marksAcross(this.doc.resolve(r)))),
						this.replaceRangeWith(n, r, i.text(t, e)),
						this.selection.empty || this.setSelection(Ze.near(this.selection.$to)),
						this
					);
				}
			}
			setMeta(e, t) {
				return (this.meta["string" == typeof e ? e : e.key] = t), this;
			}
			getMeta(e) {
				return this.meta["string" == typeof e ? e : e.key];
			}
			get isGeneric() {
				for (var e in this.meta) return !1;
				return !0;
			}
			scrollIntoView() {
				return (this.updated |= 4), this;
			}
			get scrolledIntoView() {
				return 0 < (4 & this.updated);
			}
		}
		function Bn(e, t) {
			return t && e ? e.bind(t) : e;
		}
		class g0 {
			constructor(e, t, n) {
				(this.name = e), (this.init = Bn(t.init, n)), (this.apply = Bn(t.apply, n));
			}
		}
		let $ = [
			new g0("doc", {
				init(e) {
					return e.doc || e.schema.topNodeType.createAndFill();
				},
				apply(e) {
					return e.doc;
				}
			}),
			new g0("selection", {
				init(e, t) {
					return e.selection || Ze.atStart(t.doc);
				},
				apply(e) {
					return e.selection;
				}
			}),
			new g0("storedMarks", {
				init(e) {
					return e.storedMarks || null;
				},
				apply(e, t, n, r) {
					return r.selection.$cursor ? e.storedMarks : null;
				}
			}),
			new g0("scrollToSelection", {
				init() {
					return 0;
				},
				apply(e, t) {
					return e.scrolledIntoView ? t + 1 : t;
				}
			})
		];
		class v0 {
			constructor(e, t) {
				(this.schema = e),
					(this.plugins = []),
					(this.pluginsByKey = Object.create(null)),
					(this.fields = $.slice()),
					t &&
						t.forEach(e => {
							if (this.pluginsByKey[e.key])
								throw new RangeError(
									"Adding different instances of a keyed plugin (" + e.key + ")"
								);
							this.plugins.push(e),
								(this.pluginsByKey[e.key] = e).spec.state &&
									this.fields.push(new g0(e.key, e.spec.state, e));
						});
			}
		}
		class y0 {
			constructor(e) {
				this.config = e;
			}
			get schema() {
				return this.config.schema;
			}
			get plugins() {
				return this.config.plugins;
			}
			apply(e) {
				return this.applyTransaction(e).state;
			}
			filterTransaction(t, n = -1) {
				for (let e = 0; e < this.config.plugins.length; e++)
					if (e != n) {
						var r = this.config.plugins[e];
						if (r.spec.filterTransaction && !r.spec.filterTransaction.call(r, t, this))
							return !1;
					}
				return !0;
			}
			applyTransaction(n) {
				if (!this.filterTransaction(n)) return { state: this, transactions: [] };
				let r = [n],
					o = this.applyInner(n),
					i = null;
				for (;;) {
					let e = !1;
					for (let t = 0; t < this.config.plugins.length; t++) {
						var s = this.config.plugins[t];
						if (s.spec.appendTransaction) {
							var a = i ? i[t].n : 0,
								l = i ? i[t].state : this,
								s =
									a < r.length &&
									s.spec.appendTransaction.call(s, a ? r.slice(a) : r, l, o);
							if (s && o.filterTransaction(s, t)) {
								if ((s.setMeta("appendedTransaction", n), !i)) {
									i = [];
									for (let e = 0; e < this.config.plugins.length; e++)
										i.push(
											e < t
												? { state: o, n: r.length }
												: { state: this, n: 0 }
										);
								}
								r.push(s), (o = o.applyInner(s)), (e = !0);
							}
							i && (i[t] = { state: o, n: r.length });
						}
					}
					if (!e) return { state: o, transactions: r };
				}
			}
			applyInner(t) {
				if (!t.before.eq(this.doc))
					throw new RangeError("Applying a mismatched transaction");
				var n = new y0(this.config),
					r = this.config.fields;
				for (let e = 0; e < r.length; e++) {
					var o = r[e];
					n[o.name] = o.apply(t, this[o.name], this, n);
				}
				return n;
			}
			get tr() {
				return new m0(this);
			}
			static create(t) {
				var n = new v0((t.doc ? t.doc.type : t).schema, t.plugins),
					r = new y0(n);
				for (let e = 0; e < n.fields.length; e++)
					r[n.fields[e].name] = n.fields[e].init(t, r);
				return r;
			}
			reconfigure(t) {
				var e = new v0(this.schema, t.plugins),
					n = e.fields,
					r = new y0(e);
				for (let e = 0; e < n.length; e++) {
					var o = n[e].name;
					r[o] = this.hasOwnProperty(o) ? this[o] : n[e].init(t, r);
				}
				return r;
			}
			toJSON(e) {
				var t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
				if (
					(this.storedMarks && (t.storedMarks = this.storedMarks.map(e => e.toJSON())),
					e && "object" == typeof e)
				)
					for (var n in e) {
						if ("doc" == n || "selection" == n)
							throw new RangeError(
								"The JSON fields `doc` and `selection` are reserved"
							);
						var r = e[n],
							o = r.spec.state;
						o && o.toJSON && (t[n] = o.toJSON.call(r, this[r.key]));
					}
				return t;
			}
			static fromJSON(o, i, s) {
				if (!i) throw new RangeError("Invalid input for EditorState.fromJSON");
				if (!o.schema) throw new RangeError("Required config field 'schema' missing");
				var e = new v0(o.schema, o.plugins);
				let a = new y0(e);
				return (
					e.fields.forEach(e => {
						if ("doc" == e.name) a.doc = jy.fromJSON(o.schema, i.doc);
						else if ("selection" == e.name)
							a.selection = Ze.fromJSON(a.doc, i.selection);
						else if ("storedMarks" == e.name)
							i.storedMarks &&
								(a.storedMarks = i.storedMarks.map(o.schema.markFromJSON));
						else {
							if (s)
								for (var t in s) {
									var n = s[t],
										r = n.spec.state;
									if (
										n.key == e.name &&
										r &&
										r.fromJSON &&
										Object.prototype.hasOwnProperty.call(i, t)
									)
										return void (a[e.name] = r.fromJSON.call(n, o, i[t], a));
								}
							a[e.name] = e.init(o, a);
						}
					}),
					a
				);
			}
		}
		class b0 {
			constructor(e) {
				(this.spec = e),
					(this.props = {}),
					e.props &&
						(function t(n, r, o) {
							for (var i in n) {
								let e = n[i];
								e instanceof Function
									? (e = e.bind(r))
									: "handleDOMEvents" == i && (e = t(e, r, {})),
									(o[i] = e);
							}
							return o;
						})(e.props, this, this.props),
					(this.key = e.key ? e.key.key : Fn("plugin"));
			}
			getState(e) {
				return e[this.key];
			}
		}
		let l = Object.create(null);
		function Fn(e) {
			return e in l ? e + "$" + ++l[e] : ((l[e] = 0), e + "$");
		}
		class w0 {
			constructor(e = "key") {
				this.key = Fn(e);
			}
			get(e) {
				return e.config.pluginsByKey[this.key];
			}
			getState(e) {
				return e[this.key];
			}
		}
		var xe = "undefined" != typeof navigator ? navigator : null,
			Hn = "undefined" != typeof document ? document : null,
			zn = (xe && xe.userAgent) || "",
			Ce = /Edge\/(\d+)/.exec(zn),
			Te = /MSIE \d/.exec(zn),
			Me = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(zn);
		let f = !!(Te || Me || Ce),
			m = Te ? document.documentMode : Me ? +Me[1] : Ce ? +Ce[1] : 0,
			g = !f && /gecko\/(\d+)/i.test(zn),
			v =
				(g && (/Firefox\/(\d+)/.exec(zn) || [0, 0])[1],
				!!(Te = !f && /Chrome\/(\d+)/.exec(zn))),
			y = ((Me = Te ? +Te[1] : 0), !f && !!xe && /Apple Computer/.test(xe.vendor)),
			b = y && (/Mobile\/\w+/.test(zn) || (!!xe && 2 < xe.maxTouchPoints)),
			c = b || (!!xe && /Mac/.test(xe.platform)),
			w = /Android \d/.test(zn),
			k = !!Hn && "webkitFontSmoothing" in Hn.documentElement.style;
		var qn,
			Ce = k ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
		function Vn(e, t, n, r) {
			return n && (jn(e, t, n, r, -1) || jn(e, t, n, r, 1));
		}
		let x = function (e) {
				for (var t = 0; ; t++) if (!(e = e.previousSibling)) return t;
			},
			h = function (e) {
				e = e.assignedSlot || e.parentNode;
				return e && 11 == e.nodeType ? e.host : e;
			},
			_ = null,
			C = function (e, t, n) {
				var r = (_ = _ || document.createRange());
				return r.setEnd(e, null == n ? e.nodeValue.length : n), r.setStart(e, t || 0), r;
			},
			U = /^(img|br|input|textarea|hr)$/i;
		function jn(e, t, n, r, o) {
			for (;;) {
				if (e == n && t == r) return !0;
				if (t == (o < 0 ? 0 : $n(e))) {
					var i = e.parentNode;
					if (
						!i ||
						1 != i.nodeType ||
						(t => {
							let n;
							for (let e = t; e && !(n = e.pmViewDesc); e = e.parentNode);
							return (
								n && n.node && n.node.isBlock && (n.dom == t || n.contentDOM == t)
							);
						})(e) ||
						U.test(e.nodeName) ||
						"false" == e.contentEditable
					)
						return !1;
					(t = x(e) + (o < 0 ? 0 : 1)), (e = i);
				} else {
					if (1 != e.nodeType) return !1;
					if ("false" == (e = e.childNodes[t + (o < 0 ? -1 : 0)]).contentEditable)
						return !1;
					t = o < 0 ? $n(e) : 0;
				}
			}
		}
		function $n(e) {
			return (3 == e.nodeType ? e.nodeValue : e.childNodes).length;
		}
		let T = function (e) {
			let t = e.isCollapsed;
			return (t = t && v && e.rangeCount && !e.getRangeAt(0).collapsed ? !1 : t);
		};
		function _n(e, t) {
			var n = document.createEvent("Event");
			return n.initEvent("keydown", !0, !0), (n.keyCode = e), (n.key = n.code = t), n;
		}
		function Un(e, t) {
			return "number" == typeof e ? e : e[t];
		}
		function Wn(e, r, t) {
			var o = e.someProp("scrollThreshold") || 0,
				i = e.someProp("scrollMargin") || 5,
				s = e.dom.ownerDocument;
			for (let n = t || e.dom; n; n = h(n))
				if (1 == n.nodeType) {
					var a,
						l,
						c,
						u = n,
						d = u == s.body,
						p = d
							? {
									left: 0,
									right: s.documentElement.clientWidth,
									top: 0,
									bottom: s.documentElement.clientHeight
								}
							: ((p = a = void 0),
								(a = (l = u).getBoundingClientRect()),
								(p = a.width / l.offsetWidth || 1),
								{
									left: a.left,
									right: a.left + l.clientWidth * p,
									top: a.top,
									bottom:
										a.top + l.clientHeight * (a.height / l.offsetHeight || 1)
								});
					let e = 0,
						t = 0;
					if (
						(r.top < p.top + Un(o, "top")
							? (t = -(p.top - r.top + Un(i, "top")))
							: r.bottom > p.bottom - Un(o, "bottom") &&
								(t = r.bottom - p.bottom + Un(i, "bottom")),
						r.left < p.left + Un(o, "left")
							? (e = -(p.left - r.left + Un(i, "left")))
							: r.right > p.right - Un(o, "right") &&
								(e = r.right - p.right + Un(i, "right")),
						(e || t) &&
							(d
								? s.defaultView.scrollBy(e, t)
								: ((a = u.scrollLeft),
									(l = u.scrollTop),
									t && (u.scrollTop += t),
									e && (u.scrollLeft += e),
									(c = u.scrollLeft - a),
									(u = u.scrollTop - l),
									(r = {
										left: r.left - c,
										top: r.top - u,
										right: r.right - c,
										bottom: r.bottom - u
									}))),
						d)
					)
						break;
				}
		}
		function Jn(t) {
			var n = [],
				r = t.ownerDocument;
			for (
				let e = t;
				e && (n.push({ dom: e, top: e.scrollTop, left: e.scrollLeft }), t != r);
				e = h(e)
			);
			return n;
		}
		function Gn(t, n) {
			for (let e = 0; e < t.length; e++) {
				var { dom: r, top: o, left: i } = t[e];
				r.scrollTop != o + n && (r.scrollTop = o + n),
					r.scrollLeft != i && (r.scrollLeft = i);
			}
		}
		let u = null;
		function Kn(e, o) {
			let i,
				s = 2e8,
				a,
				l = 0,
				c = o.top,
				u = o.top;
			for (let n = e.firstChild, r = 0; n; n = n.nextSibling, r++) {
				let t;
				if (1 == n.nodeType) t = n.getClientRects();
				else {
					if (3 != n.nodeType) continue;
					t = C(n).getClientRects();
				}
				for (let e = 0; e < t.length; e++) {
					var d = t[e];
					if (d.top <= c && d.bottom >= u) {
						(c = Math.max(d.bottom, c)), (u = Math.min(d.top, u));
						var p =
							d.left > o.left
								? d.left - o.left
								: d.right < o.left
									? o.left - d.right
									: 0;
						if (p < s) {
							(i = n),
								(s = p),
								(a =
									p && 3 == i.nodeType
										? { left: d.right < o.left ? d.right : d.left, top: o.top }
										: o),
								1 == n.nodeType &&
									p &&
									(l = r + (o.left >= (d.left + d.right) / 2 ? 1 : 0));
							continue;
						}
					}
					!i &&
						((o.left >= d.right && o.top >= d.top) ||
							(o.left >= d.left && o.top >= d.bottom)) &&
						(l = r + 1);
				}
			}
			if (i && 3 == i.nodeType) {
				var t = i,
					n = a,
					r = t.nodeValue.length,
					h = document.createRange();
				for (let e = 0; e < r; e++) {
					h.setEnd(t, e + 1), h.setStart(t, e);
					var f = Qn(h, 1);
					if (f.top != f.bottom && Zn(n, f))
						return { node: t, offset: e + (n.left >= (f.left + f.right) / 2 ? 1 : 0) };
				}
				return { node: t, offset: 0 };
			}
			return !i || (s && 1 == i.nodeType) ? { node: e, offset: l } : Kn(i, a);
		}
		function Zn(e, t) {
			return (
				e.left >= t.left - 1 &&
				e.left <= t.right + 1 &&
				e.top >= t.top - 1 &&
				e.top <= t.bottom + 1
			);
		}
		function Xn(e, n) {
			let t = e.dom.ownerDocument,
				r,
				o = 0;
			if (t.caretPositionFromPoint)
				try {
					var i = t.caretPositionFromPoint(n.left, n.top);
					i && ({ offsetNode: r, offset: o } = i);
				} catch (e) {}
			var s;
			!r &&
				t.caretRangeFromPoint &&
				(i = t.caretRangeFromPoint(n.left, n.top)) &&
				({ startContainer: r, startOffset: o } = i);
			let a = (e.root.elementFromPoint ? e.root : t).elementFromPoint(n.left, n.top),
				l;
			if (!a || !e.dom.contains(1 != a.nodeType ? a.parentNode : a)) {
				var i = e.dom.getBoundingClientRect();
				if (!Zn(n, i)) return null;
				if (
					!(a = (function n(r, o, i) {
						var s = r.childNodes.length;
						if (s && i.top < i.bottom)
							for (
								let e = Math.max(
										0,
										Math.min(
											s - 1,
											Math.floor((s * (o.top - i.top)) / (i.bottom - i.top)) -
												2
										)
									),
									t = e;
								;

							) {
								var a = r.childNodes[t];
								if (1 == a.nodeType) {
									var l = a.getClientRects();
									for (let e = 0; e < l.length; e++) {
										var c = l[e];
										if (Zn(o, c)) return n(a, o, c);
									}
								}
								if ((t = (t + 1) % s) == e) break;
							}
						return r;
					})(e.dom, n, i))
				)
					return null;
			}
			if (y) for (let e = a; r && e; e = h(e)) e.draggable && (r = void 0);
			if (
				((a =
					((i = a),
					(c = n),
					(s = i.parentNode) &&
					/^li$/i.test(s.nodeName) &&
					c.left < i.getBoundingClientRect().left
						? s
						: i)),
				r)
			) {
				if (
					g &&
					1 == r.nodeType &&
					(o = Math.min(o, r.childNodes.length)) < r.childNodes.length
				) {
					let e = r.childNodes[o],
						t;
					"IMG" == e.nodeName &&
						(t = e.getBoundingClientRect()).right <= n.left &&
						t.bottom > n.top &&
						o++;
				}
				r == e.dom &&
				o == r.childNodes.length - 1 &&
				1 == r.lastChild.nodeType &&
				n.top > r.lastChild.getBoundingClientRect().bottom
					? (l = e.state.doc.content.size)
					: (0 != o && 1 == r.nodeType && "BR" == r.childNodes[o - 1].nodeName) ||
						(l = ((t, n, e, r) => {
							let o = -1;
							for (let e = n; e != t.dom; ) {
								var i = t.docView.nearestDesc(e, !0);
								if (!i) return null;
								if (i.node.isBlock && i.parent) {
									var s = i.dom.getBoundingClientRect();
									if (s.left > r.left || s.top > r.top) o = i.posBefore;
									else {
										if (!(s.right < r.left || s.bottom < r.top)) break;
										o = i.posAfter;
									}
								}
								e = i.dom.parentNode;
							}
							return -1 < o ? o : t.docView.posFromDOM(n, e, 1);
						})(e, r, o, n));
			}
			null == l &&
				(l = ((e, t, n) => {
					let { node: r, offset: o } = Kn(t, n),
						i = -1;
					return (
						1 != r.nodeType ||
							r.firstChild ||
							((t = r.getBoundingClientRect()),
							(i = t.left != t.right && n.left > (t.left + t.right) / 2 ? 1 : -1)),
						e.docView.posFromDOM(r, o, i)
					);
				})(e, a, n));
			var c = e.docView.nearestDesc(a, !0);
			return { pos: l, inside: c ? c.posAtStart - c.border : -1 };
		}
		function Qn(e, t) {
			var n = e.getClientRects();
			return n.length ? n[t < 0 ? 0 : n.length - 1] : e.getBoundingClientRect();
		}
		let W = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
		function Yn(e, t, r) {
			var { node: o, offset: i, atom: n } = e.docView.domFromPos(t, r < 0 ? -1 : 1),
				s = k || g;
			if (3 == o.nodeType) {
				if (!s || (!W.test(o.nodeValue) && (r < 0 ? i : i != o.nodeValue.length))) {
					let e = i,
						t = i,
						n = r < 0 ? 1 : -1;
					return (
						r < 0 && !i
							? (t++, (n = -1))
							: 0 <= r && i == o.nodeValue.length
								? (e--, (n = 1))
								: r < 0
									? e--
									: t++,
						er(Qn(C(o, e, t), n), n < 0)
					);
				}
				var a = Qn(C(o, i, i), r);
				if (g && i && /\s/.test(o.nodeValue[i - 1]) && i < o.nodeValue.length) {
					var l = Qn(C(o, i - 1, i - 1), -1);
					if (l.top == a.top) {
						var c = Qn(C(o, i, i + 1), -1);
						if (c.top != a.top) return er(c, c.left < l.left);
					}
				}
				return a;
			}
			if (!e.state.doc.resolve(t - (n || 0)).parent.inlineContent) {
				if (null == n && i && (r < 0 || i == $n(o))) {
					c = o.childNodes[i - 1];
					if (1 == c.nodeType) return tr(c.getBoundingClientRect(), !1);
				}
				if (null == n && i < $n(o)) {
					l = o.childNodes[i];
					if (1 == l.nodeType) return tr(l.getBoundingClientRect(), !0);
				}
				return tr(o.getBoundingClientRect(), 0 <= r);
			}
			if (null == n && i && (r < 0 || i == $n(o))) {
				(a = o.childNodes[i - 1]),
					(e =
						3 == a.nodeType
							? C(a, $n(a) - (s ? 0 : 1))
							: 1 != a.nodeType || ("BR" == a.nodeName && a.nextSibling)
								? null
								: a);
				if (e) return er(Qn(e, 1), !1);
			}
			if (null == n && i < $n(o)) {
				let e = o.childNodes[i];
				for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords; ) e = e.nextSibling;
				t = e ? (3 == e.nodeType ? C(e, 0, s ? 0 : 1) : 1 == e.nodeType ? e : null) : null;
				if (t) return er(Qn(t, -1), !0);
			}
			return er(Qn(3 == o.nodeType ? C(o) : o, -r), 0 <= r);
		}
		function er(e, t) {
			return 0 == e.width
				? e
				: ((t = t ? e.left : e.right), { top: e.top, bottom: e.bottom, left: t, right: t });
		}
		function tr(e, t) {
			return 0 == e.height
				? e
				: { top: (t = t ? e.top : e.bottom), bottom: t, left: e.left, right: e.right };
		}
		function nr(e, t, n) {
			var r = e.state,
				o = e.root.activeElement;
			r != t && e.updateState(t), o != e.dom && e.focus();
			try {
				return n();
			} finally {
				r != t && e.updateState(r), o != e.dom && o && o.focus();
			}
		}
		let J = /[\u0590-\u08ac]/,
			G = null,
			K = null,
			Z = !1;
		function rr(e, t, n) {
			return G == t && K == n
				? Z
				: ((G = t),
					(K = n),
					(Z = (
						"up" == n || "down" == n
							? (o, e, i) => {
									var t = e.selection;
									let s = "up" == i ? t.$from : t.$to;
									return nr(o, e, () => {
										let t = o.docView.domFromPos(
											s.pos,
											"up" == i ? -1 : 1
										).node;
										for (;;) {
											var e = o.docView.nearestDesc(t, !0);
											if (!e) break;
											if (e.node.isBlock) {
												t = e.dom;
												break;
											}
											t = e.dom.parentNode;
										}
										var n = Yn(o, s.pos, 1);
										for (let e = t.firstChild; e; e = e.nextSibling) {
											let t;
											if (1 == e.nodeType) t = e.getClientRects();
											else {
												if (3 != e.nodeType) continue;
												t = C(e, 0, e.nodeValue.length).getClientRects();
											}
											for (let e = 0; e < t.length; e++) {
												var r = t[e];
												if (
													r.bottom > r.top + 1 &&
													("up" == i
														? n.top - r.top > 2 * (r.bottom - n.top)
														: r.bottom - n.bottom >
															2 * (n.bottom - r.top))
												)
													return !1;
											}
										}
										return !0;
									});
								}
							: (o, e, i) => {
									let s = e.selection.$head;
									if (!s.parent.isTextblock) return !1;
									var t = !(n = s.parentOffset),
										n = n == s.parent.content.size;
									let a = o.domSelection();
									return J.test(s.parent.textContent) && a.modify
										? nr(o, e, () => {
												var e = a.getRangeAt(0),
													t = a.focusNode,
													n = a.focusOffset,
													r = a.caretBidiLevel;
												a.modify("move", i, "character");
												t =
													!(
														s.depth
															? o.docView.domAfterPos(s.before())
															: o.dom
													).contains(
														1 == a.focusNode.nodeType
															? a.focusNode
															: a.focusNode.parentNode
													) ||
													(t == a.focusNode && n == a.focusOffset);
												return (
													a.removeAllRanges(),
													a.addRange(e),
													null != r && (a.caretBidiLevel = r),
													t
												);
											})
										: "left" == i || "backward" == i
											? t
											: n;
								}
					)(e, t, n)));
		}
		class k0 {
			constructor(e, t, n, r) {
				(this.parent = e),
					(this.children = t),
					(this.dom = n),
					(this.contentDOM = r),
					(this.dirty = 0),
					(n.pmViewDesc = this);
			}
			matchesWidget(e) {
				return !1;
			}
			matchesMark(e) {
				return !1;
			}
			matchesNode(e, t, n) {
				return !1;
			}
			matchesHack(e) {
				return !1;
			}
			parseRule() {
				return null;
			}
			stopEvent(e) {
				return !1;
			}
			get size() {
				let t = 0;
				for (let e = 0; e < this.children.length; e++) t += this.children[e].size;
				return t;
			}
			get border() {
				return 0;
			}
			destroy() {
				(this.parent = void 0),
					this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
				for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
			}
			posBeforeChild(n) {
				for (let e = 0, t = this.posAtStart; ; e++) {
					var r = this.children[e];
					if (r == n) return t;
					t += r.size;
				}
			}
			get posBefore() {
				return this.parent.posBeforeChild(this);
			}
			get posAtStart() {
				return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
			}
			get posAfter() {
				return this.posBefore + this.size;
			}
			get posAtEnd() {
				return this.posAtStart + this.size - 2 * this.border;
			}
			localPosFromDOM(n, r, e) {
				if (
					this.contentDOM &&
					this.contentDOM.contains(1 == n.nodeType ? n : n.parentNode)
				) {
					if (e < 0) {
						let e, t;
						if (n == this.contentDOM) e = n.childNodes[r - 1];
						else {
							for (; n.parentNode != this.contentDOM; ) n = n.parentNode;
							e = n.previousSibling;
						}
						for (; e && (!(t = e.pmViewDesc) || t.parent != this); )
							e = e.previousSibling;
						return e ? this.posBeforeChild(t) + t.size : this.posAtStart;
					}
					{
						let e, t;
						if (n == this.contentDOM) e = n.childNodes[r];
						else {
							for (; n.parentNode != this.contentDOM; ) n = n.parentNode;
							e = n.nextSibling;
						}
						for (; e && (!(t = e.pmViewDesc) || t.parent != this); ) e = e.nextSibling;
						return e ? this.posBeforeChild(t) : this.posAtEnd;
					}
				}
				let t;
				if (n == this.dom && this.contentDOM) t = r > x(this.contentDOM);
				else if (
					this.contentDOM &&
					this.contentDOM != this.dom &&
					this.dom.contains(this.contentDOM)
				)
					t = 2 & n.compareDocumentPosition(this.contentDOM);
				else if (this.dom.firstChild) {
					if (0 == r)
						for (let e = n; ; e = e.parentNode) {
							if (e == this.dom) {
								t = !1;
								break;
							}
							if (e.previousSibling) break;
						}
					if (null == t && r == n.childNodes.length)
						for (let e = n; ; e = e.parentNode) {
							if (e == this.dom) {
								t = !0;
								break;
							}
							if (e.nextSibling) break;
						}
				}
				return (null == t ? 0 < e : t) ? this.posAtEnd : this.posAtStart;
			}
			nearestDesc(o, i = !1) {
				for (let n = !0, r = o; r; r = r.parentNode) {
					let e = this.getDesc(r),
						t;
					if (e && (!i || e.node)) {
						if (
							!n ||
							!(t = e.nodeDOM) ||
							(1 == t.nodeType
								? t.contains(1 == o.nodeType ? o : o.parentNode)
								: t == o)
						)
							return e;
						n = !1;
					}
				}
			}
			getDesc(e) {
				var t = e.pmViewDesc;
				for (let e = t; e; e = e.parent) if (e == this) return t;
			}
			posFromDOM(t, n, r) {
				for (let e = t; e; e = e.parentNode) {
					var o = this.getDesc(e);
					if (o) return o.localPosFromDOM(t, n, r);
				}
				return -1;
			}
			descAt(o) {
				for (let n = 0, r = 0; n < this.children.length; n++) {
					let e = this.children[n],
						t = r + e.size;
					if (r == o && t != r) {
						for (; !e.border && e.children.length; ) e = e.children[0];
						return e;
					}
					if (o < t) return e.descAt(o - r - e.border);
					r = t;
				}
			}
			domFromPos(t, n) {
				if (!this.contentDOM) return { node: this.dom, offset: 0, atom: t + 1 };
				let r = 0,
					o = 0;
				for (let e = 0; r < this.children.length; r++) {
					var i = this.children[r],
						s = e + i.size;
					if (t < s || i instanceof E0) {
						o = t - e;
						break;
					}
					e = s;
				}
				if (o) return this.children[r].domFromPos(o - this.children[r].border, n);
				for (
					let e;
					r && !(e = this.children[r - 1]).size && e instanceof x0 && 0 <= e.side;
					r--
				);
				if (n <= 0) {
					let e,
						t = !0;
					for (
						;
						(e = r ? this.children[r - 1] : null) &&
						e.dom.parentNode != this.contentDOM;
						r--, t = !1
					);
					return e && n && t && !e.border && !e.domAtom
						? e.domFromPos(e.size, n)
						: { node: this.contentDOM, offset: e ? x(e.dom) + 1 : 0 };
				}
				{
					let e,
						t = !0;
					for (
						;
						(e = r < this.children.length ? this.children[r] : null) &&
						e.dom.parentNode != this.contentDOM;
						r++, t = !1
					);
					return e && t && !e.border && !e.domAtom
						? e.domFromPos(0, n)
						: {
								node: this.contentDOM,
								offset: e ? x(e.dom) : this.contentDOM.childNodes.length
							};
				}
			}
			parseRange(n, r, o = 0) {
				if (0 == this.children.length)
					return {
						node: this.contentDOM,
						from: n,
						to: r,
						fromOffset: 0,
						toOffset: this.contentDOM.childNodes.length
					};
				let i = -1,
					s = -1;
				for (let e = o, t = 0; ; t++) {
					var a = this.children[t],
						l = e + a.size;
					if (-1 == i && n <= l) {
						var c = e + a.border;
						if (
							c <= n &&
							r <= l - a.border &&
							a.node &&
							a.contentDOM &&
							this.contentDOM.contains(a.contentDOM)
						)
							return a.parseRange(n, r, c);
						n = e;
						for (let e = t; 0 < e; e--) {
							var u = this.children[e - 1];
							if (
								u.size &&
								u.dom.parentNode == this.contentDOM &&
								!u.emptyChildAt(1)
							) {
								i = x(u.dom) + 1;
								break;
							}
							n -= u.size;
						}
						-1 == i && (i = 0);
					}
					if (-1 < i && (r < l || t == this.children.length - 1)) {
						r = l;
						for (let e = t + 1; e < this.children.length; e++) {
							var d = this.children[e];
							if (
								d.size &&
								d.dom.parentNode == this.contentDOM &&
								!d.emptyChildAt(-1)
							) {
								s = x(d.dom);
								break;
							}
							r += d.size;
						}
						-1 == s && (s = this.contentDOM.childNodes.length);
						break;
					}
					e = l;
				}
				return { node: this.contentDOM, from: n, to: r, fromOffset: i, toOffset: s };
			}
			emptyChildAt(e) {
				var t;
				return (
					!(this.border || !this.contentDOM || !this.children.length) &&
					(0 == (t = this.children[e < 0 ? 0 : this.children.length - 1]).size ||
						t.emptyChildAt(e))
				);
			}
			domAfterPos(e) {
				var { node: t, offset: n } = this.domFromPos(e, 0);
				if (1 != t.nodeType || n == t.childNodes.length)
					throw new RangeError("No node after pos " + e);
				return t.childNodes[n];
			}
			setSelection(n, r, o, i = !1) {
				var s = Math.min(n, r),
					a = Math.max(n, r);
				for (let e = 0, t = 0; e < this.children.length; e++) {
					var l = this.children[e],
						c = t + l.size;
					if (s > t && a < c)
						return l.setSelection(n - t - l.border, r - t - l.border, o, i);
					t = c;
				}
				let u = this.domFromPos(n, n ? -1 : 1),
					d = r == n ? u : this.domFromPos(r, r ? -1 : 1);
				var t = o.getSelection();
				let p = !1;
				if ((g || y) && n == r) {
					var { node: h, offset: f } = u;
					if (3 == h.nodeType) {
						if ((p = !(!f || "\n" != h.nodeValue[f - 1])) && f == h.nodeValue.length)
							for (let e = h, t; e; e = e.parentNode) {
								if ((t = e.nextSibling)) {
									"BR" == t.nodeName &&
										(u = d = { node: t.parentNode, offset: x(t) + 1 });
									break;
								}
								var m = e.pmViewDesc;
								if (m && m.node && m.node.isBlock) break;
							}
					} else {
						var h = h.childNodes[f - 1];
						p = h && ("BR" == h.nodeName || "false" == h.contentEditable);
					}
				}
				if (
					(i =
						g &&
						t.focusNode &&
						t.focusNode != d.node &&
						1 == t.focusNode.nodeType &&
						(f = t.focusNode.childNodes[t.focusOffset]) &&
						"false" == f.contentEditable
							? !0
							: i) ||
					(p && y) ||
					!Vn(u.node, u.offset, t.anchorNode, t.anchorOffset) ||
					!Vn(d.node, d.offset, t.focusNode, t.focusOffset)
				) {
					let e = !1;
					if ((t.extend || n == r) && !p) {
						t.collapse(u.node, u.offset);
						try {
							n != r && t.extend(d.node, d.offset), (e = !0);
						} catch (e) {
							if (!(e instanceof DOMException)) throw e;
						}
					}
					e ||
						(r < n && ((h = u), (u = d), (d = h)),
						(f = document.createRange()).setEnd(d.node, d.offset),
						f.setStart(u.node, u.offset),
						t.removeAllRanges(),
						t.addRange(f));
				}
			}
			ignoreMutation(e) {
				return !this.contentDOM && "selection" != e.type;
			}
			get contentLost() {
				return (
					this.contentDOM &&
					this.contentDOM != this.dom &&
					!this.dom.contains(this.contentDOM)
				);
			}
			markDirty(n, r) {
				for (let e = 0, t = 0; t < this.children.length; t++) {
					var o = this.children[t],
						i = e + o.size;
					if (e == i ? n <= i && r >= e : n < i && r > e) {
						var s = e + o.border,
							a = i - o.border;
						if (s <= n && r <= a)
							return (
								(this.dirty = n == e || r == i ? 2 : 1),
								void (n != s ||
								r != a ||
								(!o.contentLost && o.dom.parentNode == this.contentDOM)
									? o.markDirty(n - s, r - s)
									: (o.dirty = 3))
							);
						o.dirty =
							o.dom != o.contentDOM ||
							o.dom.parentNode != this.contentDOM ||
							o.children.length
								? 3
								: 2;
					}
					e = i;
				}
				this.dirty = 2;
			}
			markParentsDirty() {
				let t = 1;
				for (let e = this.parent; e; e = e.parent, t++) {
					var n = 1 == t ? 2 : 1;
					e.dirty < n && (e.dirty = n);
				}
			}
			get domAtom() {
				return !1;
			}
			get ignoreForCoords() {
				return !1;
			}
		}
		class x0 extends k0 {
			constructor(e, t, n, r) {
				let o,
					i = t.type.toDOM;
				"function" == typeof i &&
					(i = i(n, () => (o ? (o.parent ? o.parent.posBeforeChild(o) : void 0) : r))),
					t.type.spec.raw ||
						(1 != i.nodeType &&
							((n = document.createElement("span")).appendChild(i), (i = n)),
						(i.contentEditable = "false"),
						i.classList.add("ProseMirror-widget")),
					super(e, [], i, null),
					(this.widget = t),
					(this.widget = t),
					(o = this);
			}
			matchesWidget(e) {
				return 0 == this.dirty && e.type.eq(this.widget.type);
			}
			parseRule() {
				return { ignore: !0 };
			}
			stopEvent(e) {
				var t = this.widget.spec.stopEvent;
				return !!t && t(e);
			}
			ignoreMutation(e) {
				return "selection" != e.type || this.widget.spec.ignoreSelection;
			}
			destroy() {
				this.widget.type.destroy(this.dom), super.destroy();
			}
			get domAtom() {
				return !0;
			}
			get side() {
				return this.widget.type.side;
			}
		}
		class C0 extends k0 {
			constructor(e, t, n, r) {
				super(e, [], t, null), (this.textDOM = n), (this.text = r);
			}
			get size() {
				return this.text.length;
			}
			localPosFromDOM(e, t) {
				return e != this.textDOM
					? this.posAtStart + (t ? this.size : 0)
					: this.posAtStart + t;
			}
			domFromPos(e) {
				return { node: this.textDOM, offset: e };
			}
			ignoreMutation(e) {
				return "characterData" === e.type && e.target.nodeValue == e.oldValue;
			}
		}
		class T0 extends k0 {
			constructor(e, t, n, r) {
				super(e, [], n, r), (this.mark = t);
			}
			static create(e, t, n, r) {
				var o = r.nodeViews[t.type.name];
				let i = o && o(t, r, n);
				return (
					(i && i.dom) || (i = Yy.renderSpec(document, t.type.spec.toDOM(t, n))),
					new T0(e, t, i.dom, i.contentDOM || i.dom)
				);
			}
			parseRule() {
				return 3 & this.dirty || this.mark.type.spec.reparseInView
					? null
					: {
							mark: this.mark.type.name,
							attrs: this.mark.attrs,
							contentElement: this.contentDOM || void 0
						};
			}
			matchesMark(e) {
				return 3 != this.dirty && this.mark.eq(e);
			}
			markDirty(e, t) {
				if ((super.markDirty(e, t), 0 != this.dirty)) {
					let e = this.parent;
					for (; !e.node; ) e = e.parent;
					e.dirty < this.dirty && (e.dirty = this.dirty), (this.dirty = 0);
				}
			}
			slice(e, t, n) {
				var r = T0.create(this.parent, this.mark, !0, n);
				let o = this.children,
					i = this.size;
				t < i && (o = dr(o, t, i, n)), 0 < e && (o = dr(o, 0, e, n));
				for (let e = 0; e < o.length; e++) o[e].parent = r;
				return (r.children = o), r;
			}
		}
		class M0 extends k0 {
			constructor(e, t, n, r, o, i, s, a, l) {
				super(e, [], o, i),
					(this.node = t),
					(this.outerDeco = n),
					(this.innerDeco = r),
					(this.nodeDOM = s),
					i && this.updateChildren(a, l);
			}
			static create(e, t, n, r, o, i) {
				let s = o.nodeViews[t.type.name],
					a;
				var l =
					s &&
					s(t, o, () => (a ? (a.parent ? a.parent.posBeforeChild(a) : void 0) : i), n, r);
				let c = l && l.dom,
					u = l && l.contentDOM;
				if (t.isText)
					if (c) {
						if (3 != c.nodeType)
							throw new RangeError("Text must be rendered as a DOM text node");
					} else c = document.createTextNode(t.text);
				else
					c ||
						({ dom: c, contentDOM: u } = Yy.renderSpec(document, t.type.spec.toDOM(t)));
				u ||
					t.isText ||
					"BR" == c.nodeName ||
					(c.hasAttribute("contenteditable") || (c.contentEditable = "false"),
					t.type.spec.draggable && (c.draggable = !0));
				var d = c;
				return (
					(c = ar(c, n, t)),
					l
						? (a = new N0(e, t, n, r, c, u || null, d, l, o, i + 1))
						: t.isText
							? new S0(e, t, n, r, c, d, o)
							: new M0(e, t, n, r, c, u || null, d, o, i + 1)
				);
			}
			parseRule() {
				if (this.node.type.spec.reparseInView) return null;
				var t = { node: this.node.type.name, attrs: this.node.attrs };
				if (
					("pre" == this.node.type.whitespace && (t.preserveWhitespace = "full"),
					this.contentDOM)
				)
					if (this.contentLost) {
						for (let e = this.children.length - 1; 0 <= e; e--) {
							var n = this.children[e];
							if (this.dom.contains(n.dom.parentNode)) {
								t.contentElement = n.dom.parentNode;
								break;
							}
						}
						t.contentElement || (t.getContent = () => Je.empty);
					} else t.contentElement = this.contentDOM;
				else t.getContent = () => this.node.content;
				return t;
			}
			matchesNode(e, t, n) {
				return (
					0 == this.dirty &&
					e.eq(this.node) &&
					lr(t, this.outerDeco) &&
					n.eq(this.innerDeco)
				);
			}
			get size() {
				return this.node.nodeSize;
			}
			get border() {
				return this.node.isLeaf ? 0 : 1;
			}
			updateChildren(i, e) {
				let s = this.node.inlineContent,
					a = e,
					u = i.composing ? this.localCompositionInfo(i, e) : null;
				var t,
					e = u && -1 < u.pos ? u : null;
				let d = u && u.pos < 0,
					p = new O0(this, e && e.node);
				{
					var h = this.node,
						f = this.innerDeco,
						m = (e, t, n) => {
							e.spec.marks
								? p.syncToMarks(e.spec.marks, s, i)
								: 0 <= e.type.side &&
									!n &&
									p.syncToMarks(
										t == this.node.childCount
											? Ge.none
											: this.node.child(t).marks,
										s,
										i
									),
								p.placeWidget(e, i, a);
						},
						g = (e, t, n, r) => {
							p.syncToMarks(e.marks, s, i);
							let o;
							p.findNodeMatch(e, t, n, r) ||
								(d &&
									i.state.selection.from > a &&
									i.state.selection.to < a + e.nodeSize &&
									-1 < (o = p.findIndexWithChild(u.node)) &&
									p.updateNodeAt(e, t, n, o, i)) ||
								p.updateNextNode(e, t, n, i, r) ||
								p.addNode(e, t, n, i, a),
								(a += e.nodeSize);
						};
					let l = f.locals(h),
						c = 0;
					if (0 == l.length)
						for (let e = 0; e < h.childCount; e++) {
							var n = h.child(e);
							g(n, l, f.forChild(c, n), e), (c += n.nodeSize);
						}
					else {
						let i = 0,
							s = [],
							a = null;
						for (let o = 0; ; ) {
							if (i < l.length && l[i].to == c) {
								let e = l[i++],
									t;
								for (; i < l.length && l[i].to == c; ) (t = t || [e]).push(l[i++]);
								if (t) {
									t.sort(ur);
									for (let e = 0; e < t.length; e++) m(t[e], o, !!a);
								} else m(e, o, !!a);
							}
							let e, n;
							if (a) (n = -1), (e = a), (a = null);
							else {
								if (!(o < h.childCount)) break;
								(n = o), (e = h.child(o++));
							}
							for (let e = 0; e < s.length; e++) s[e].to <= c && s.splice(e--, 1);
							for (; i < l.length && l[i].from <= c && l[i].to > c; ) s.push(l[i++]);
							let r = c + e.nodeSize;
							if (e.isText) {
								let t = r;
								i < l.length && l[i].from < t && (t = l[i].from);
								for (let e = 0; e < s.length; e++) s[e].to < t && (t = s[e].to);
								t < r &&
									((a = e.cut(t - c)), (e = e.cut(0, t - c)), (r = t), (n = -1));
							}
							var v = e.isInline && !e.isLeaf ? s.filter(e => !e.inline) : s.slice();
							g(e, v, f.forChild(c, e), n), (c = r);
						}
					}
				}
				p.syncToMarks([], s, i),
					this.node.isTextblock && p.addTextblockHacks(),
					p.destroyRest(),
					(!p.changed && 2 != this.dirty) ||
						(e && this.protectLocalComposition(i, e),
						(function r(o, i, s) {
							let a = o.firstChild,
								l = !1;
							for (let n = 0; n < i.length; n++) {
								let t = i[n],
									e = t.dom;
								if (e.parentNode == o) {
									for (; e != a; ) (a = cr(a)), (l = !0);
									a = a.nextSibling;
								} else (l = !0), o.insertBefore(e, a);
								if (t instanceof T0) {
									let e = a ? a.previousSibling : o.lastChild;
									r(t.contentDOM, t.children, s),
										(a = e ? e.nextSibling : o.firstChild);
								}
							}
							for (; a; ) (a = cr(a)), (l = !0);
							l && s.trackWrites == o && (s.trackWrites = null);
						})(this.contentDOM, this.children, i),
						!b) ||
						("UL" != (e = this.dom).nodeName && "OL" != e.nodeName) ||
						((t = e.style.cssText),
						(e.style.cssText = t + "; list-style: square !important"),
						window.getComputedStyle(e).listStyle,
						(e.style.cssText = t));
			}
			localCompositionInfo(e, t) {
				var n,
					{ from: r, to: o } = e.state.selection;
				return !(
					!(e.state.selection instanceof Xe) ||
					r < t ||
					o > t + this.node.content.size
				) &&
					(e = ((e, t) => {
						for (;;) {
							if (3 == e.nodeType) return e;
							if (1 == e.nodeType && 0 < t) {
								if (e.childNodes.length > t && 3 == e.childNodes[t].nodeType)
									return e.childNodes[t];
								(e = e.childNodes[t - 1]), (t = $n(e));
							} else {
								if (!(1 == e.nodeType && t < e.childNodes.length)) return null;
								(e = e.childNodes[t]), (t = 0);
							}
						}
					})((e = e.domSelection()).focusNode, e.focusOffset)) &&
					this.dom.contains(e.parentNode)
					? this.node.inlineContent
						? ((n = e.nodeValue),
							(r = ((r, o, i, s) => {
								for (let t = 0, n = 0; t < r.childCount && n <= s; ) {
									var a = r.child(t++),
										l = n;
									if (((n += a.nodeSize), a.isText)) {
										let e = a.text;
										for (; t < r.childCount; ) {
											var c = r.child(t++);
											if (((n += c.nodeSize), !c.isText)) break;
											e += c.text;
										}
										if (n >= i) {
											a = l < s ? e.lastIndexOf(o, s - l - 1) : -1;
											if (0 <= a && a + o.length + l >= i) return l + a;
											if (
												i == s &&
												e.length >= s + o.length - l &&
												e.slice(s - l, s - l + o.length) == o
											)
												return s;
										}
									}
								}
								return -1;
							})(this.node.content, n, r - t, o - t)) < 0
								? null
								: { node: e, pos: r, text: n })
						: { node: e, pos: -1, text: "" }
					: null;
			}
			protectLocalComposition(t, { node: n, pos: r, text: o }) {
				if (!this.getDesc(n)) {
					let e = n;
					for (; e.parentNode != this.contentDOM; e = e.parentNode) {
						for (; e.previousSibling; ) e.parentNode.removeChild(e.previousSibling);
						for (; e.nextSibling; ) e.parentNode.removeChild(e.nextSibling);
						e.pmViewDesc && (e.pmViewDesc = void 0);
					}
					n = new C0(this, e, n, o);
					t.input.compositionNodes.push(n),
						(this.children = dr(this.children, r, r + o.length, t, n));
				}
			}
			update(e, t, n, r) {
				return !(
					3 == this.dirty ||
					!e.sameMarkup(this.node) ||
					(this.updateInner(e, t, n, r), 0)
				);
			}
			updateInner(e, t, n, r) {
				this.updateOuterDeco(t),
					(this.node = e),
					(this.innerDeco = n),
					this.contentDOM && this.updateChildren(r, this.posAtStart),
					(this.dirty = 0);
			}
			updateOuterDeco(e) {
				var t, n;
				lr(e, this.outerDeco) ||
					((t = 1 != this.nodeDOM.nodeType),
					(n = this.dom),
					(this.dom = sr(
						this.dom,
						this.nodeDOM,
						ir(this.outerDeco, this.node, t),
						ir(e, this.node, t)
					)),
					this.dom != n && ((n.pmViewDesc = void 0), (this.dom.pmViewDesc = this)),
					(this.outerDeco = e));
			}
			selectNode() {
				1 == this.nodeDOM.nodeType &&
					this.nodeDOM.classList.add("ProseMirror-selectednode"),
					(!this.contentDOM && this.node.type.spec.draggable) ||
						(this.dom.draggable = !0);
			}
			deselectNode() {
				1 == this.nodeDOM.nodeType &&
					this.nodeDOM.classList.remove("ProseMirror-selectednode"),
					(!this.contentDOM && this.node.type.spec.draggable) ||
						this.dom.removeAttribute("draggable");
			}
			get domAtom() {
				return this.node.isAtom;
			}
		}
		function or(e, t, n, r, o) {
			return ar(r, t, e), new M0(void 0, e, t, n, r, r, r, o, 0);
		}
		class S0 extends M0 {
			constructor(e, t, n, r, o, i, s) {
				super(e, t, n, r, o, null, i, s, 0);
			}
			parseRule() {
				let e = this.nodeDOM.parentNode;
				for (; e && e != this.dom && !e.pmIsDeco; ) e = e.parentNode;
				return { skip: e || !0 };
			}
			update(e, t, n, r) {
				return !(
					3 == this.dirty ||
					(0 != this.dirty && !this.inParent()) ||
					!e.sameMarkup(this.node) ||
					(this.updateOuterDeco(t),
					(0 == this.dirty && e.text == this.node.text) ||
						e.text == this.nodeDOM.nodeValue ||
						((this.nodeDOM.nodeValue = e.text),
						r.trackWrites == this.nodeDOM && (r.trackWrites = null)),
					(this.node = e),
					(this.dirty = 0))
				);
			}
			inParent() {
				var t = this.parent.contentDOM;
				for (let e = this.nodeDOM; e; e = e.parentNode) if (e == t) return !0;
				return !1;
			}
			domFromPos(e) {
				return { node: this.nodeDOM, offset: e };
			}
			localPosFromDOM(e, t, n) {
				return e == this.nodeDOM
					? this.posAtStart + Math.min(t, this.node.text.length)
					: super.localPosFromDOM(e, t, n);
			}
			ignoreMutation(e) {
				return "characterData" != e.type && "selection" != e.type;
			}
			slice(e, t, n) {
				(e = this.node.cut(e, t)), (t = document.createTextNode(e.text));
				return new S0(this.parent, e, this.outerDeco, this.innerDeco, t, t, n);
			}
			markDirty(e, t) {
				super.markDirty(e, t),
					this.dom == this.nodeDOM ||
						(0 != e && t != this.nodeDOM.nodeValue.length) ||
						(this.dirty = 3);
			}
			get domAtom() {
				return !1;
			}
		}
		class E0 extends k0 {
			parseRule() {
				return { ignore: !0 };
			}
			matchesHack(e) {
				return 0 == this.dirty && this.dom.nodeName == e;
			}
			get domAtom() {
				return !0;
			}
			get ignoreForCoords() {
				return "IMG" == this.dom.nodeName;
			}
		}
		class N0 extends M0 {
			constructor(e, t, n, r, o, i, s, a, l, c) {
				super(e, t, n, r, o, i, s, l, c), (this.spec = a);
			}
			update(e, t, n, r) {
				var o;
				return (
					3 != this.dirty &&
					(this.spec.update
						? ((o = this.spec.update(e, t, n)) && this.updateInner(e, t, n, r), o)
						: !(!this.contentDOM && !e.isLeaf) && super.update(e, t, n, r))
				);
			}
			selectNode() {
				this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
			}
			deselectNode() {
				this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
			}
			setSelection(e, t, n, r) {
				this.spec.setSelection
					? this.spec.setSelection(e, t, n)
					: super.setSelection(e, t, n, r);
			}
			destroy() {
				this.spec.destroy && this.spec.destroy(), super.destroy();
			}
			stopEvent(e) {
				return !!this.spec.stopEvent && this.spec.stopEvent(e);
			}
			ignoreMutation(e) {
				return this.spec.ignoreMutation
					? this.spec.ignoreMutation(e)
					: super.ignoreMutation(e);
			}
		}
		let d = function (e) {
				e && (this.nodeName = e);
			},
			M = ((d.prototype = Object.create(null)), [new d()]);
		function ir(t, n, r) {
			if (0 == t.length) return M;
			let o = r ? M[0] : new d(),
				i = [o];
			for (let e = 0; e < t.length; e++) {
				var s = t[e].type.attrs;
				if (s)
					for (var a in (s.nodeName && i.push((o = new d(s.nodeName))), s)) {
						var l = s[a];
						null != l &&
							(r && 1 == i.length && i.push((o = new d(n.isInline ? "span" : "div"))),
							"class" == a
								? (o.class = (o.class ? o.class + " " : "") + l)
								: "style" == a
									? (o.style = (o.style ? o.style + ";" : "") + l)
									: "nodeName" != a && (o[a] = l));
					}
			}
			return i;
		}
		function sr(r, e, o, i) {
			if (o == M && i == M) return e;
			let s = e;
			for (let e = 0; e < i.length; e++) {
				let t = i[e],
					n = o[e];
				if (e) {
					let e;
					s =
						((n &&
							n.nodeName == t.nodeName &&
							s != r &&
							(e = s.parentNode) &&
							e.nodeName.toLowerCase() == t.nodeName) ||
							(((e = document.createElement(t.nodeName)).pmIsDeco = !0),
							e.appendChild(s),
							(n = M[0])),
						e);
				}
				f = m = h = p = l = a = d = u = c = void 0;
				var a,
					l,
					c = s,
					u = n || M[0],
					d = t;
				for (a in u)
					"class" == a ||
						"style" == a ||
						"nodeName" == a ||
						a in d ||
						c.removeAttribute(a);
				for (l in d)
					"class" != l &&
						"style" != l &&
						"nodeName" != l &&
						d[l] != u[l] &&
						c.setAttribute(l, d[l]);
				if (u.class != d.class) {
					var p = u.class ? u.class.split(" ").filter(Boolean) : [],
						h = d.class ? d.class.split(" ").filter(Boolean) : [];
					for (let e = 0; e < p.length; e++)
						-1 == h.indexOf(p[e]) && c.classList.remove(p[e]);
					for (let e = 0; e < h.length; e++)
						-1 == p.indexOf(h[e]) && c.classList.add(h[e]);
					0 == c.classList.length && c.removeAttribute("class");
				}
				if (u.style != d.style) {
					if (u.style)
						for (
							var f,
								m =
									/\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;
							(f = m.exec(u.style));

						)
							c.style.removeProperty(f[1]);
					d.style && (c.style.cssText += d.style);
				}
			}
			return s;
		}
		function ar(e, t, n) {
			return sr(e, e, M, ir(t, n, 1 != e.nodeType));
		}
		function lr(t, n) {
			if (t.length != n.length) return !1;
			for (let e = 0; e < t.length; e++) if (!t[e].type.eq(n[e].type)) return !1;
			return !0;
		}
		function cr(e) {
			var t = e.nextSibling;
			return e.parentNode.removeChild(e), t;
		}
		class O0 {
			constructor(e, t) {
				(this.lock = t),
					(this.index = 0),
					(this.stack = []),
					(this.changed = !1),
					(this.top = e),
					(this.preMatch = ((t, n) => {
						let r = n,
							o = r.children.length,
							i = t.childCount,
							s = new Map(),
							a = [];
						e: for (; 0 < i; ) {
							let e;
							for (;;)
								if (o) {
									var l = r.children[o - 1];
									if (!(l instanceof T0)) {
										(e = l), o--;
										break;
									}
									(r = l), (o = l.children.length);
								} else {
									if (r == n) break e;
									(o = r.parent.children.indexOf(r)), (r = r.parent);
								}
							var c = e.node;
							if (c) {
								if (c != t.child(i - 1)) break;
								--i, s.set(e, i), a.push(e);
							}
						}
						return { index: i, matched: s, matches: a.reverse() };
					})(e.node.content, e));
			}
			destroyBetween(t, n) {
				if (t != n) {
					for (let e = t; e < n; e++) this.top.children[e].destroy();
					this.top.children.splice(t, n - t), (this.changed = !0);
				}
			}
			destroyRest() {
				this.destroyBetween(this.index, this.top.children.length);
			}
			syncToMarks(n, e, r) {
				let t = 0,
					o = this.stack.length >> 1;
				for (
					var i, s = Math.min(o, n.length);
					t < s &&
					(t == o - 1 ? this.top : this.stack[(t + 1) << 1]).matchesMark(n[t]) &&
					!1 !== n[t].type.spec.spanning;

				)
					t++;
				for (; t < o; )
					this.destroyRest(),
						(this.top.dirty = 0),
						(this.index = this.stack.pop()),
						(this.top = this.stack.pop()),
						o--;
				for (; o < n.length; ) {
					this.stack.push(this.top, this.index + 1);
					let t = -1;
					for (
						let e = this.index;
						e < Math.min(this.index + 3, this.top.children.length);
						e++
					)
						if (this.top.children[e].matchesMark(n[o])) {
							t = e;
							break;
						}
					-1 < t
						? (t > this.index &&
								((this.changed = !0), this.destroyBetween(this.index, t)),
							(this.top = this.top.children[this.index]))
						: ((i = T0.create(this.top, n[o], e, r)),
							this.top.children.splice(this.index, 0, i),
							(this.top = i),
							(this.changed = !0)),
						(this.index = 0),
						o++;
				}
			}
			findNodeMatch(n, r, o, e) {
				let i = -1,
					t;
				if (
					e >= this.preMatch.index &&
					(t = this.preMatch.matches[e - this.preMatch.index]).parent == this.top &&
					t.matchesNode(n, r, o)
				)
					i = this.top.children.indexOf(t, this.index);
				else
					for (
						let e = this.index, t = Math.min(this.top.children.length, e + 5);
						e < t;
						e++
					) {
						var s = this.top.children[e];
						if (s.matchesNode(n, r, o) && !this.preMatch.matched.has(s)) {
							i = e;
							break;
						}
					}
				return !(i < 0 || (this.destroyBetween(this.index, i), this.index++, 0));
			}
			updateNodeAt(e, t, n, r, o) {
				var i = this.top.children[r];
				return (
					3 == i.dirty && i.dom == i.contentDOM && (i.dirty = 2),
					!!i.update(e, t, n, o) && (this.destroyBetween(this.index, r), this.index++, !0)
				);
			}
			findIndexWithChild(e) {
				for (;;) {
					var t = e.parentNode;
					if (!t) return -1;
					if (t == this.top.contentDOM) {
						var n = e.pmViewDesc;
						if (n)
							for (let e = this.index; e < this.top.children.length; e++)
								if (this.top.children[e] == n) return e;
						return -1;
					}
					e = t;
				}
			}
			updateNextNode(t, n, r, o, i) {
				for (let e = this.index; e < this.top.children.length; e++) {
					var s = this.top.children[e];
					if (s instanceof M0) {
						var a = this.preMatch.matched.get(s);
						if (null != a && a != i) return !1;
						a = s.dom;
						if (
							(this.lock &&
								(a == this.lock ||
									(1 == a.nodeType && a.contains(this.lock.parentNode))) &&
								!(
									t.isText &&
									s.node &&
									s.node.isText &&
									s.nodeDOM.nodeValue == t.text &&
									3 != s.dirty &&
									lr(n, s.outerDeco)
								)) ||
							!s.update(t, n, r, o)
						)
							break;
						return (
							this.destroyBetween(this.index, e),
							s.dom != a && (this.changed = !0),
							this.index++,
							!0
						);
					}
				}
				return !1;
			}
			addNode(e, t, n, r, o) {
				this.top.children.splice(this.index++, 0, M0.create(this.top, e, t, n, r, o)),
					(this.changed = !0);
			}
			placeWidget(e, t, n) {
				var r =
					this.index < this.top.children.length ? this.top.children[this.index] : null;
				!r || !r.matchesWidget(e) || (e != r.widget && r.widget.type.toDOM.parentNode)
					? ((r = new x0(this.top, e, t, n)),
						this.top.children.splice(this.index++, 0, r),
						(this.changed = !0))
					: this.index++;
			}
			addTextblockHacks() {
				let e = this.top.children[this.index - 1],
					t = this.top;
				for (; e instanceof T0; ) e = (t = e).children[t.children.length - 1];
				(e && e instanceof S0 && !/\n$/.test(e.node.text)) ||
					((y || v) &&
						e &&
						"false" == e.dom.contentEditable &&
						this.addHackNode("IMG", t),
					this.addHackNode("BR", this.top));
			}
			addHackNode(e, t) {
				var n;
				t == this.top &&
				this.index < t.children.length &&
				t.children[this.index].matchesHack(e)
					? this.index++
					: ((n = document.createElement(e)),
						"IMG" == e && ((n.className = "ProseMirror-separator"), (n.alt = "")),
						"BR" == e && (n.className = "ProseMirror-trailingBreak"),
						(e = new E0(this.top, [], n, null)),
						t != this.top ? t.children.push(e) : t.children.splice(this.index++, 0, e),
						(this.changed = !0));
			}
		}
		function ur(e, t) {
			return e.type.side - t.type.side;
		}
		function dr(n, r, o, i, s) {
			var a = [];
			for (let e = 0, t = 0; e < n.length; e++) {
				var l = n[e],
					c = t,
					u = (t += l.size);
				o <= c || u <= r
					? a.push(l)
					: (c < r && a.push(l.slice(0, r - c, i)),
						s && (a.push(s), (s = void 0)),
						o < u && a.push(l.slice(o - c, l.size, i)));
			}
			return a;
		}
		function pr(e, t = null) {
			var n = e.domSelection(),
				r = e.state.doc;
			if (!n.focusNode) return null;
			let o = e.docView.nearestDesc(n.focusNode),
				i = o && 0 == o.size;
			var s = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
			if (s < 0) return null;
			let a = r.resolve(s),
				l,
				c;
			if (T(n)) {
				for (l = a; o && !o.node; ) o = o.parent;
				var u = o.node;
				!(o && u.isAtom && Qe.isSelectable(u) && o.parent) ||
					(u.isInline &&
						((n, r, o) => {
							for (let e = 0 == r, t = r == $n(n); e || t; ) {
								if (n == o) return 1;
								var i = x(n);
								if (!(n = n.parentNode)) return;
								(e = e && 0 == i), (t = t && i == $n(n));
							}
						})(n.focusNode, n.focusOffset, o.dom)) ||
					((u = o.posBefore), (c = new Qe(s == u ? a : r.resolve(u))));
			} else {
				s = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
				if (s < 0) return null;
				l = r.resolve(s);
			}
			return (
				c ||
					((u = "pointer" == t || (e.state.selection.head < a.pos && !i) ? 1 : -1),
					(c = wr(e, l, a, u))),
				c
			);
		}
		function hr(e) {
			return e.editable
				? e.hasFocus()
				: xr(e) && document.activeElement && document.activeElement.contains(e.dom);
		}
		function fr(o, i = !1) {
			var s = o.state.selection;
			if ((yr(o, s), hr(o))) {
				if (!i && o.input.mouseDown && o.input.mouseDown.allowDefault && v) {
					var e = o.domSelection(),
						t = o.domObserver.currentSelection;
					if (
						e.anchorNode &&
						t.anchorNode &&
						Vn(e.anchorNode, e.anchorOffset, t.anchorNode, t.anchorOffset)
					)
						return (
							(o.input.mouseDown.delayedSelectionSync = !0),
							void o.domObserver.setCurSelection()
						);
				}
				if ((o.domObserver.disconnectSelection(), o.cursorWrapper)) {
					var e = o,
						t = e.domSelection(),
						n = document.createRange(),
						r = e.cursorWrapper.dom,
						a = "IMG" == r.nodeName;
					a ? n.setEnd(r.parentNode, x(r) + 1) : n.setEnd(r, 0),
						n.collapse(!1),
						t.removeAllRanges(),
						t.addRange(n),
						!a &&
							!e.state.selection.visible &&
							f &&
							m <= 11 &&
							((r.disabled = !0), (r.disabled = !1));
				} else {
					let { anchor: e, head: t } = s,
						n,
						r;
					if (
						(!X ||
							s instanceof Xe ||
							(s.$from.parent.inlineContent || (n = mr(o, s.from)), s.empty) ||
							s.$from.parent.inlineContent ||
							(r = mr(o, s.to)),
						o.docView.setSelection(e, t, o.root, i),
						X && (n && vr(n), r) && vr(r),
						s.visible)
					)
						o.dom.classList.remove("ProseMirror-hideselection");
					else if (
						(o.dom.classList.add("ProseMirror-hideselection"),
						"onselectionchange" in document)
					) {
						var l = o;
						let e = l.dom.ownerDocument,
							t =
								(e.removeEventListener(
									"selectionchange",
									l.input.hideSelectionGuard
								),
								l.domSelection()),
							n = t.anchorNode,
							r = t.anchorOffset;
						e.addEventListener(
							"selectionchange",
							(l.input.hideSelectionGuard = () => {
								(t.anchorNode == n && t.anchorOffset == r) ||
									(e.removeEventListener(
										"selectionchange",
										l.input.hideSelectionGuard
									),
									setTimeout(() => {
										(hr(l) && !l.state.selection.visible) ||
											l.dom.classList.remove("ProseMirror-hideselection");
									}, 20));
							})
						);
					}
				}
				o.domObserver.setCurSelection(), o.domObserver.connectSelection();
			}
		}
		let X = y || (v && Me < 63);
		function mr(e, t) {
			var { node: e, offset: t } = e.docView.domFromPos(t, 0),
				n = t < e.childNodes.length ? e.childNodes[t] : null,
				e = t ? e.childNodes[t - 1] : null;
			return y && n && "false" == n.contentEditable
				? gr(n)
				: (n && "false" != n.contentEditable) || (e && "false" != e.contentEditable)
					? void 0
					: n
						? gr(n)
						: e
							? gr(e)
							: void 0;
		}
		function gr(e) {
			return (
				(e.contentEditable = "true"),
				y && e.draggable && ((e.draggable = !1), (e.wasDraggable = !0)),
				e
			);
		}
		function vr(e) {
			(e.contentEditable = "false"),
				e.wasDraggable && ((e.draggable = !0), (e.wasDraggable = null));
		}
		function yr(e, t) {
			t instanceof Qe
				? (t = e.docView.descAt(t.from)) != e.lastSelectedViewDesc &&
					(br(e), t && t.selectNode(), (e.lastSelectedViewDesc = t))
				: br(e);
		}
		function br(e) {
			e.lastSelectedViewDesc &&
				(e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(),
				(e.lastSelectedViewDesc = void 0));
		}
		function wr(t, n, r, e) {
			return t.someProp("createSelectionBetween", e => e(t, n, r)) || Xe.between(n, r, e);
		}
		function kr(e) {
			return (!e.editable || e.root.activeElement == e.dom) && xr(e);
		}
		function xr(e) {
			var t = e.domSelection();
			if (!t.anchorNode) return !1;
			try {
				return (
					e.dom.contains(
						3 == t.anchorNode.nodeType ? t.anchorNode.parentNode : t.anchorNode
					) &&
					(e.editable ||
						e.dom.contains(
							3 == t.focusNode.nodeType ? t.focusNode.parentNode : t.focusNode
						))
				);
			} catch (e) {
				return !1;
			}
		}
		function Cr(e, t) {
			var { $anchor: n, $head: r } = e.selection,
				n = 0 < t ? n.max(r) : n.min(r),
				r = n.parent.inlineContent
					? n.depth
						? e.doc.resolve(0 < t ? n.after() : n.before())
						: null
					: n;
			return r && Ze.findFrom(r, t);
		}
		function Tr(e, t) {
			return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
		}
		function Mr(e, t, n) {
			var r,
				o,
				i,
				s = e.state.selection;
			return s instanceof Xe
				? !(!s.empty || -1 < n.indexOf("s")) &&
						(e.endOfTextblock(0 < t ? "right" : "left")
							? !!((r = Cr(e.state, t)) && r instanceof Qe) && Tr(e, r)
							: c && -1 < n.indexOf("m")
								? void 0
								: !(
										!(n = (r = s.$head).textOffset
											? null
											: t < 0
												? r.nodeBefore
												: r.nodeAfter) ||
										n.isText ||
										((o = t < 0 ? r.pos - n.nodeSize : r.pos),
										!(n.isAtom || ((i = e.docView.descAt(o)) && !i.contentDOM)))
									) &&
									(Qe.isSelectable(n)
										? Tr(
												e,
												new Qe(
													t < 0
														? e.state.doc.resolve(r.pos - n.nodeSize)
														: r
												)
											)
										: !!k &&
											Tr(
												e,
												new Xe(
													e.state.doc.resolve(t < 0 ? o : o + n.nodeSize)
												)
											)))
				: s instanceof Qe && s.node.isInline
					? Tr(e, new Xe(0 < t ? s.$to : s.$from))
					: !!(i = Cr(e.state, t)) && Tr(e, i);
		}
		function Sr(e) {
			return (3 == e.nodeType ? e.nodeValue : e.childNodes).length;
		}
		function Er(e) {
			var t = e.pmViewDesc;
			return t && 0 == t.size && (e.nextSibling || "BR" != e.nodeName);
		}
		function Nr(r) {
			var o = r.domSelection();
			let i = o.focusNode,
				s = o.focusOffset;
			if (i) {
				let t,
					n,
					e = !1;
				for (g && 1 == i.nodeType && s < Sr(i) && Er(i.childNodes[s]) && (e = !0); ; )
					if (0 < s) {
						if (1 != i.nodeType) break;
						var a = i.childNodes[s - 1];
						if (Er(a)) (t = i), (n = --s);
						else {
							if (3 != a.nodeType) break;
							(i = a), (s = i.nodeValue.length);
						}
					} else {
						if (Dr(i)) break;
						{
							let e = i.previousSibling;
							for (; e && Er(e); )
								(t = i.parentNode), (n = x(e)), (e = e.previousSibling);
							if (e) (i = e), (s = Sr(i));
							else {
								if ((i = i.parentNode) == r.dom) break;
								s = 0;
							}
						}
					}
				e ? Ar(r, o, i, s) : t && Ar(r, o, t, n);
			}
		}
		function Or(o) {
			var e = o.domSelection();
			let i = e.focusNode,
				s = e.focusOffset;
			if (i) {
				let t = Sr(i),
					n,
					r;
				for (;;)
					if (s < t) {
						if (1 != i.nodeType) break;
						if (!Er(i.childNodes[s])) break;
						(n = i), (r = ++s);
					} else {
						if (Dr(i)) break;
						{
							let e = i.nextSibling;
							for (; e && Er(e); )
								(n = e.parentNode), (r = x(e) + 1), (e = e.nextSibling);
							if (e) (i = e), (s = 0), (t = Sr(i));
							else {
								if ((i = i.parentNode) == o.dom) break;
								s = t = 0;
							}
						}
					}
				n && Ar(o, e, n, r);
			}
		}
		function Dr(e) {
			e = e.pmViewDesc;
			return e && e.node && e.node.isBlock;
		}
		function Ar(e, t, n, r) {
			var o;
			T(t)
				? ((o = document.createRange()).setEnd(n, r),
					o.setStart(n, r),
					t.removeAllRanges(),
					t.addRange(o))
				: t.extend && t.extend(n, r),
				e.domObserver.setCurSelection();
			let i = e.state;
			setTimeout(() => {
				e.state == i && fr(e);
			}, 50);
		}
		function Lr(e, t, n) {
			var r = e.state.selection;
			if ((r instanceof Xe && !r.empty) || -1 < n.indexOf("s")) return !1;
			if (c && -1 < n.indexOf("m")) return !1;
			var { $from: n, $to: o } = r;
			if (!n.parent.inlineContent || e.endOfTextblock(t < 0 ? "up" : "down")) {
				var i = Cr(e.state, t);
				if (i && i instanceof Qe) return Tr(e, i);
			}
			return (
				!n.parent.inlineContent &&
				((i = t < 0 ? n : o),
				!!(n = r instanceof f0 ? Ze.near(i, t) : Ze.findFrom(i, t))) &&
				Tr(e, n)
			);
		}
		function Ir(e, t) {
			var n, r, o;
			return !(
				e.state.selection instanceof Xe &&
				(({ $head: n, $anchor: r, empty: o } = e.state.selection), n.sameParent(r)) &&
				(!o ||
					(!e.endOfTextblock(0 < t ? "forward" : "backward") &&
						(!(r = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter)) ||
							r.isText ||
							((o = e.state.tr),
							t < 0
								? o.delete(n.pos - r.nodeSize, n.pos)
								: o.delete(n.pos, n.pos + r.nodeSize),
							e.dispatch(o),
							0))))
			);
		}
		function Rr(e, t, n) {
			e.domObserver.stop(), (t.contentEditable = n), e.domObserver.start();
		}
		function Pr(e, t) {
			var n = t.keyCode,
				t = (e => {
					let t = "";
					return (
						e.ctrlKey && (t += "c"),
						e.metaKey && (t += "m"),
						e.altKey && (t += "a"),
						e.shiftKey && (t += "s"),
						t
					);
				})(t);
			if (8 == n || (c && 72 == n && "c" == t)) return Ir(e, -1) || Nr(e);
			if (46 == n || (c && 68 == n && "c" == t)) return Ir(e, 1) || Or(e);
			if (13 == n || 27 == n) return 1;
			if (37 == n || (c && 66 == n && "c" == t)) return Mr(e, -1, t) || Nr(e);
			if (39 == n || (c && 70 == n && "c" == t)) return Mr(e, 1, t) || Or(e);
			if (38 == n || (c && 80 == n && "c" == t)) return Lr(e, -1, t) || Nr(e);
			if (40 == n || (c && 78 == n && "c" == t)) {
				var r = e;
				if (y && !(0 < r.state.selection.$head.parentOffset)) {
					var { focusNode: o, focusOffset: i } = r.domSelection();
					if (
						o &&
						1 == o.nodeType &&
						0 == i &&
						o.firstChild &&
						"false" == o.firstChild.contentEditable
					) {
						let e = o.firstChild;
						Rr(r, e, "true"), setTimeout(() => Rr(r, e, "false"), 20);
					}
				}
				return Lr(e, 1, t) || Or(e);
			}
			return t == (c ? "m" : "c") && (66 == n || 73 == n || 89 == n || 90 == n);
		}
		function Br(e, t) {
			let n = [],
				{ content: r, openStart: o, openEnd: i } = t;
			for (; 1 < o && 1 < i && 1 == r.childCount && 1 == r.firstChild.childCount; ) {
				o--, i--;
				var s = r.firstChild;
				n.push(s.type.name, s.attrs != s.type.defaultAttrs ? s.attrs : null),
					(r = s.content);
			}
			var a = e.someProp("clipboardSerializer") || Yy.fromSchema(e.state.schema),
				l = Vr(),
				c = l.createElement("div");
			c.appendChild(a.serializeFragment(r, { document: l }));
			let u = c.firstChild,
				d,
				p = 0;
			for (; u && 1 == u.nodeType && (d = Y[u.nodeName.toLowerCase()]); ) {
				for (let e = d.length - 1; 0 <= e; e--) {
					for (var h = l.createElement(d[e]); c.firstChild; ) h.appendChild(c.firstChild);
					c.appendChild(h), p++;
				}
				u = c.firstChild;
			}
			return (
				u &&
					1 == u.nodeType &&
					u.setAttribute(
						"data-pm-slice",
						`${o} ${i}${p ? " -" + p : ""} ` + JSON.stringify(n)
					),
				{
					dom: c,
					text:
						e.someProp("clipboardTextSerializer", e => e(t)) ||
						t.content.textBetween(0, t.content.size, "\n\n")
				}
			);
		}
		function Fr(e, t, n, r, i) {
			let o = i.parent.type.spec.code,
				s,
				a;
			if (!n && !t) return null;
			var l = t && (r || o || !n);
			if (l) {
				if (
					(e.someProp("transformPastedText", e => {
						t = e(t, o || r);
					}),
					o)
				)
					return t
						? new Ke(Je.from(e.state.schema.text(t.replace(/\r\n?/g, "\n"))), 0, 0)
						: Ke.empty;
				var c = e.someProp("clipboardTextParser", e => e(t, i, r));
				if (c) a = c;
				else {
					let n = i.marks(),
						r = e.state.schema,
						o = Yy.fromSchema(r);
					(s = document.createElement("div")),
						t.split(/(?:\r\n?|\n)+/).forEach(e => {
							var t = s.appendChild(document.createElement("p"));
							e && t.appendChild(o.serializeNode(r.text(e, n)));
						});
				}
			} else if (
				(e.someProp("transformPastedHTML", e => {
					n = e(n);
				}),
				(s = (e => {
					var t = /^(\s*<meta [^>]*>)*/.exec(e);
					t && (e = e.slice(t[0].length));
					let n = Vr().createElement("div"),
						r = /<([a-z][^>\s]+)/i.exec(e),
						o;
					if (
						((o = r && Y[r[1].toLowerCase()]) &&
							(e =
								o.map(e => "<" + e + ">").join("") +
								e +
								o
									.map(e => "</" + e + ">")
									.reverse()
									.join("")),
						(n.innerHTML = e),
						o)
					)
						for (let e = 0; e < o.length; e++) n = n.querySelector(o[e]) || n;
					return n;
				})(n)),
				k)
			) {
				var u = s,
					d = u.querySelectorAll(
						v ? "span:not([class]):not([style])" : "span.Apple-converted-space"
					);
				for (let e = 0; e < d.length; e++) {
					var p = d[e];
					1 == p.childNodes.length &&
						" " == p.textContent &&
						p.parentNode &&
						p.parentNode.replaceChild(u.ownerDocument.createTextNode(" "), p);
				}
			}
			var h,
				c = s && s.querySelector("[data-pm-slice]"),
				c =
					c &&
					/^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
			if (c && c[3]) for (let e = +c[3]; 0 < e && s.firstChild; e--) s = s.firstChild;
			if (
				(a ||
					((h =
						e.someProp("clipboardParser") ||
						e.someProp("domParser") ||
						Zy.fromSchema(e.state.schema)),
					(a = h.parseSlice(s, {
						preserveWhitespace: !(!l && !c),
						context: i,
						ruleFromNode(e) {
							return "BR" != e.nodeName ||
								e.nextSibling ||
								!e.parentNode ||
								Q.test(e.parentNode.nodeName)
								? null
								: { ignore: !0 };
						}
					}))),
				c)
			)
				a = ((t, e) => {
					if (!t.size) return t;
					let n = t.content.firstChild.type.schema,
						r;
					try {
						r = JSON.parse(e);
					} catch (e) {
						return t;
					}
					let { content: o, openStart: i, openEnd: s } = t;
					for (let e = r.length - 2; 0 <= e; e -= 2) {
						var a = n.nodes[r[e]];
						if (!a || a.hasRequiredAttrs()) break;
						(o = Je.from(a.create(r[e + 1], o))), i++, s++;
					}
					return new Ke(o, i, s);
				})(qr(a, +c[1], +c[2]), c[4]);
			else if (
				(a = Ke.maxOpen(
					((t, n) => {
						if (!(t.childCount < 2))
							for (let e = n.depth; 0 <= e; e--) {
								let r = n.node(e).contentMatchAt(n.index(e)),
									o,
									i = [];
								if (
									(t.forEach(e => {
										var t, n;
										if (i)
											return (t = r.findWrapping(e.type))
												? void ((n =
														i.length &&
														o.length &&
														(function n(r, o, i, s, a) {
															if (
																a < r.length &&
																a < o.length &&
																r[a] == o[a]
															) {
																let e = n(
																	r,
																	o,
																	i,
																	s.lastChild,
																	a + 1
																);
																if (e)
																	return s.copy(
																		s.content.replaceChild(
																			s.childCount - 1,
																			e
																		)
																	);
																let t = s.contentMatchAt(
																	s.childCount
																);
																return t.matchType(
																	a == r.length - 1
																		? i.type
																		: r[a + 1]
																)
																	? s.copy(
																			s.content.append(
																				Je.from(
																					Hr(i, r, a + 1)
																				)
																			)
																		)
																	: void 0;
															}
														})(t, o, e, i[i.length - 1], 0))
														? (i[i.length - 1] = n)
														: (i.length &&
																(i[i.length - 1] = (function e(
																	t,
																	n
																) {
																	if (0 == n) return t;
																	let r = t.content.replaceChild(
																		t.childCount - 1,
																		e(t.lastChild, n - 1)
																	);
																	let o = t
																		.contentMatchAt(
																			t.childCount
																		)
																		.fillBefore(Je.empty, !0);
																	return t.copy(r.append(o));
																})(i[i.length - 1], o.length)),
															(n = Hr(e, t)),
															i.push(n),
															(r = r.matchType(n.type)),
															(o = t)))
												: (i = null);
									}),
									i)
								)
									return Je.from(i);
							}
						return t;
					})(a.content, i),
					!0
				)).openStart ||
				a.openEnd
			) {
				let t = 0,
					n = 0;
				for (
					let e = a.content.firstChild;
					t < a.openStart && !e.type.spec.isolating;
					t++, e = e.firstChild
				);
				for (
					let e = a.content.lastChild;
					n < a.openEnd && !e.type.spec.isolating;
					n++, e = e.lastChild
				);
				a = qr(a, t, n);
			}
			return (
				e.someProp("transformPasted", e => {
					a = e(a);
				}),
				a
			);
		}
		let Q =
			/^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
		function Hr(t, n, r = 0) {
			for (let e = n.length - 1; e >= r; e--) t = n[e].create(null, Je.from(t));
			return t;
		}
		function zr(e, t, n, r, o, i) {
			let s = t < 0 ? e.firstChild : e.lastChild,
				a = s.content;
			return (
				o < r - 1 && (a = zr(a, t, n, r, o + 1, i)),
				n <= o &&
					(a =
						t < 0
							? s
									.contentMatchAt(0)
									.fillBefore(a, 1 < e.childCount || i <= o)
									.append(a)
							: a.append(s.contentMatchAt(s.childCount).fillBefore(Je.empty, !0))),
				e.replaceChild(t < 0 ? 0 : e.childCount - 1, s.copy(a))
			);
		}
		function qr(e, t, n) {
			return (e =
				n <
				(e =
					t < e.openStart
						? new Ke(zr(e.content, -1, t, e.openStart, 0, e.openEnd), t, e.openEnd)
						: e).openEnd
					? new Ke(zr(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)
					: e);
		}
		let Y = {
				thead: ["table"],
				tbody: ["table"],
				tfoot: ["table"],
				caption: ["table"],
				colgroup: ["table"],
				col: ["table", "colgroup"],
				tr: ["table", "tbody"],
				td: ["table", "tbody", "tr"],
				th: ["table", "tbody", "tr"]
			},
			ee = null;
		function Vr() {
			return (ee = ee || document.implementation.createHTMLDocument("title"));
		}
		let p = {},
			S = {};
		class D0 {
			constructor() {
				(this.shiftKey = !1),
					(this.mouseDown = null),
					(this.lastKeyCode = null),
					(this.lastKeyCodeTime = 0),
					(this.lastClick = { time: 0, x: 0, y: 0, type: "" }),
					(this.lastSelectionOrigin = null),
					(this.lastSelectionTime = 0),
					(this.lastIOSEnter = 0),
					(this.lastIOSEnterFallbackTimeout = -1),
					(this.lastAndroidDelete = 0),
					(this.composing = !1),
					(this.composingTimeout = -1),
					(this.compositionNodes = []),
					(this.compositionEndedAt = -2e8),
					(this.domChangeCount = 0),
					(this.eventHandlers = Object.create(null)),
					(this.hideSelectionGuard = null);
			}
		}
		function jr(n) {
			for (var e in p) {
				let t = p[e];
				n.dom.addEventListener(
					e,
					(n.input.eventHandlers[e] = e => {
						!((t, n) => {
							if (n.bubbles) {
								if (n.defaultPrevented) return;
								for (let e = n.target; e != t.dom; e = e.parentNode)
									if (
										!e ||
										11 == e.nodeType ||
										(e.pmViewDesc && e.pmViewDesc.stopEvent(n))
									)
										return;
							}
							return 1;
						})(n, e) ||
							Ur(n, e) ||
							(!n.editable && e.type in S) ||
							t(n, e);
					})
				);
			}
			y && n.dom.addEventListener("input", () => null), _r(n);
		}
		function $r(e, t) {
			(e.input.lastSelectionOrigin = t), (e.input.lastSelectionTime = Date.now());
		}
		function _r(n) {
			n.someProp("handleDOMEvents", e => {
				for (var t in e)
					n.input.eventHandlers[t] ||
						n.dom.addEventListener(t, (n.input.eventHandlers[t] = e => Ur(n, e)));
			});
		}
		function Ur(t, n) {
			return t.someProp("handleDOMEvents", e => {
				e = e[n.type];
				return !!e && (e(t, n) || n.defaultPrevented);
			});
		}
		function Wr(e) {
			return { left: e.clientX, top: e.clientY };
		}
		function Jr(r, e, o, t, i) {
			if (-1 != t) {
				let n = r.state.doc.resolve(t);
				for (let t = n.depth + 1; 0 < t; t--)
					if (
						r.someProp(e, e =>
							t > n.depth
								? e(r, o, n.nodeAfter, n.before(t), i, !0)
								: e(r, o, n.node(t), n.before(t), i, !1)
						)
					)
						return !0;
			}
			return !1;
		}
		function Gr(e, t, n) {
			e.focused || e.focus();
			t = e.state.tr.setSelection(t);
			"pointer" == n && t.setMeta("pointer", !0), e.dispatch(t);
		}
		function Kr(t, n, e, r, o) {
			return (
				Jr(t, "handleClickOn", n, e, r) ||
				t.someProp("handleClick", e => e(t, n, r)) ||
				(o
					? ((e, o) => {
							if (-1 != o) {
								let t = e.state.selection,
									n,
									r;
								t instanceof Qe && (n = t.node);
								var i = e.state.doc.resolve(o);
								for (let e = i.depth + 1; 0 < e; e--) {
									var s = e > i.depth ? i.nodeAfter : i.node(e);
									if (Qe.isSelectable(s)) {
										r =
											n &&
											0 < t.$from.depth &&
											e >= t.$from.depth &&
											i.before(t.$from.depth + 1) == t.$from.pos
												? i.before(t.$from.depth)
												: i.before(e);
										break;
									}
								}
								return (
									null != r && (Gr(e, Qe.create(e.state.doc, r), "pointer"), !0)
								);
							}
						})(t, e)
					: ((o = t),
						-1 != (e = e) &&
							!!(
								(i = (e = o.state.doc.resolve(e)).nodeAfter) &&
								i.isAtom &&
								Qe.isSelectable(i)
							) &&
							(Gr(o, new Qe(e), "pointer"), !0)))
			);
			var i;
		}
		function Zr(t, n, e, r) {
			return (
				Jr(t, "handleTripleClickOn", n, e, r) ||
				t.someProp("handleTripleClick", e => e(t, n, r)) ||
				((t, e, n) => {
					if (0 == n.button) {
						var r = t.state.doc;
						if (-1 == e)
							return (
								r.inlineContent &&
								(Gr(t, Xe.create(r, 0, r.content.size), "pointer"), 1)
							);
						var o = r.resolve(e);
						for (let e = o.depth + 1; 0 < e; e--) {
							var i = e > o.depth ? o.nodeAfter : o.node(e),
								s = o.before(e);
							if (i.inlineContent)
								Gr(t, Xe.create(r, s + 1, s + 1 + i.content.size), "pointer");
							else {
								if (!Qe.isSelectable(i)) continue;
								Gr(t, Qe.create(r, s), "pointer");
							}
							return 1;
						}
					}
				})(t, e, r)
			);
		}
		function Xr(e) {
			return to(e);
		}
		(S.keydown = (t, e) => {
			let n = e;
			if (
				((t.input.shiftKey = 16 == n.keyCode || n.shiftKey),
				!Qr(t, n) &&
					((t.input.lastKeyCode = n.keyCode),
					(t.input.lastKeyCodeTime = Date.now()),
					!w || !v || 13 != n.keyCode))
			)
				if (
					(229 != n.keyCode && t.domObserver.forceFlush(),
					!b || 13 != n.keyCode || n.ctrlKey || n.altKey || n.metaKey)
				)
					t.someProp("handleKeyDown", e => e(t, n)) || Pr(t, n)
						? n.preventDefault()
						: $r(t, "key");
				else {
					let e = Date.now();
					(t.input.lastIOSEnter = e),
						(t.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
							t.input.lastIOSEnter == e &&
								(t.someProp("handleKeyDown", e => e(t, _n(13, "Enter"))),
								(t.input.lastIOSEnter = 0));
						}, 200));
				}
		}),
			(S.keyup = (e, t) => {
				16 == t.keyCode && (e.input.shiftKey = !1);
			}),
			(S.keypress = (r, e) => {
				let o = e;
				if (!(Qr(r, o) || !o.charCode || (o.ctrlKey && !o.altKey) || (c && o.metaKey)))
					if (r.someProp("handleKeyPress", e => e(r, o))) o.preventDefault();
					else {
						let n = r.state.selection;
						if (!(n instanceof Xe && n.$from.sameParent(n.$to))) {
							let t = String.fromCharCode(o.charCode);
							r.someProp("handleTextInput", e => e(r, n.$from.pos, n.$to.pos, t)) ||
								r.dispatch(r.state.tr.insertText(t).scrollIntoView()),
								o.preventDefault();
						}
					}
			});
		let te = c ? "metaKey" : "ctrlKey";
		p.mousedown = (e, t) => {
			e.input.shiftKey = t.shiftKey;
			var n,
				r = Xr(e);
			let o = Date.now(),
				i = "singleClick";
			o - e.input.lastClick.time < 500 &&
				((n = e.input.lastClick),
				(s = n.x - t.clientX) * s + (n = n.y - t.clientY) * n < 100) &&
				!t[te] &&
				("singleClick" == e.input.lastClick.type
					? (i = "doubleClick")
					: "doubleClick" == e.input.lastClick.type && (i = "tripleClick")),
				(e.input.lastClick = { time: o, x: t.clientX, y: t.clientY, type: i });
			var s = e.posAtCoords(Wr(t));
			s &&
				("singleClick" == i
					? (e.input.mouseDown && e.input.mouseDown.done(),
						(e.input.mouseDown = new A0(e, s, t, !!r)))
					: ("doubleClick" == i
								? function (t, n, e, r) {
										return (
											Jr(t, "handleDoubleClickOn", n, e, r) ||
											t.someProp("handleDoubleClick", e => e(t, n, r))
										);
									}
								: Zr)(e, s.pos, s.inside, t)
						? t.preventDefault()
						: $r(e, "pointer"));
		};
		class A0 {
			constructor(e, t, n, r) {
				(this.view = e),
					(this.pos = t),
					(this.event = n),
					(this.flushed = r),
					(this.delayedSelectionSync = !1),
					(this.mightDrag = null),
					(this.startDoc = e.state.doc),
					(this.selectNode = !!n[te]),
					(this.allowDefault = n.shiftKey);
				let o, i;
				i =
					-1 < t.inside
						? ((o = e.state.doc.nodeAt(t.inside)), t.inside)
						: ((t = e.state.doc.resolve(t.pos)),
							(o = t.parent),
							t.depth ? t.before() : 0);
				(t = r ? null : n.target),
					(r = t ? e.docView.nearestDesc(t, !0) : null),
					(this.target = r ? r.dom : null),
					(t = e.state.selection);
				((0 == n.button && o.type.spec.draggable && !1 !== o.type.spec.selectable) ||
					(t instanceof Qe && t.from <= i && t.to > i)) &&
					(this.mightDrag = {
						node: o,
						pos: i,
						addAttr: !(!this.target || this.target.draggable),
						setUneditable: !(
							!this.target ||
							!g ||
							this.target.hasAttribute("contentEditable")
						)
					}),
					this.target &&
						this.mightDrag &&
						(this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
						(this.view.domObserver.stop(),
						this.mightDrag.addAttr && (this.target.draggable = !0),
						this.mightDrag.setUneditable &&
							setTimeout(() => {
								this.view.input.mouseDown == this &&
									this.target.setAttribute("contentEditable", "false");
							}, 20),
						this.view.domObserver.start()),
					e.root.addEventListener("mouseup", (this.up = this.up.bind(this))),
					e.root.addEventListener("mousemove", (this.move = this.move.bind(this))),
					$r(e, "pointer");
			}
			done() {
				this.view.root.removeEventListener("mouseup", this.up),
					this.view.root.removeEventListener("mousemove", this.move),
					this.mightDrag &&
						this.target &&
						(this.view.domObserver.stop(),
						this.mightDrag.addAttr && this.target.removeAttribute("draggable"),
						this.mightDrag.setUneditable &&
							this.target.removeAttribute("contentEditable"),
						this.view.domObserver.start()),
					this.delayedSelectionSync && setTimeout(() => fr(this.view)),
					(this.view.input.mouseDown = null);
			}
			up(t) {
				if ((this.done(), this.view.dom.contains(t.target))) {
					let e = this.pos;
					this.view.state.doc != this.startDoc && (e = this.view.posAtCoords(Wr(t))),
						this.allowDefault || !e
							? $r(this.view, "pointer")
							: Kr(this.view, e.pos, e.inside, t, this.selectNode)
								? t.preventDefault()
								: 0 == t.button &&
									  (this.flushed ||
											(y && this.mightDrag && !this.mightDrag.node.isAtom) ||
											(v &&
												!(this.view.state.selection instanceof Xe) &&
												Math.min(
													Math.abs(
														e.pos - this.view.state.selection.from
													),
													Math.abs(e.pos - this.view.state.selection.to)
												) <= 2))
									? (Gr(
											this.view,
											Ze.near(this.view.state.doc.resolve(e.pos)),
											"pointer"
										),
										t.preventDefault())
									: $r(this.view, "pointer");
				}
			}
			move(e) {
				!this.allowDefault &&
					(4 < Math.abs(this.event.x - e.clientX) ||
						4 < Math.abs(this.event.y - e.clientY)) &&
					(this.allowDefault = !0),
					$r(this.view, "pointer"),
					0 == e.buttons && this.done();
			}
		}
		function Qr(e, t) {
			return (
				e.composing ||
				(y &&
					Math.abs(t.timeStamp - e.input.compositionEndedAt) < 500 &&
					(e.input.compositionEndedAt = -2e8))
			);
		}
		(p.touchdown = e => {
			Xr(e), $r(e, "pointer");
		}),
			(p.contextmenu = e => Xr(e));
		let ne = w ? 5e3 : -1;
		function Yr(e, t) {
			clearTimeout(e.input.composingTimeout),
				-1 < t && (e.input.composingTimeout = setTimeout(() => to(e), t));
		}
		function eo(e) {
			var t;
			for (
				e.composing &&
				((e.input.composing = !1),
				(e.input.compositionEndedAt =
					((t = document.createEvent("Event")).initEvent("event", !0, !0), t.timeStamp)));
				0 < e.input.compositionNodes.length;

			)
				e.input.compositionNodes.pop().markParentsDirty();
		}
		function to(e, t = !1) {
			if (!(w && 0 <= e.domObserver.flushingSoon))
				return (
					e.domObserver.forceFlush(),
					eo(e),
					!!(t || (e.docView && e.docView.dirty)) &&
						((t = pr(e)) && !t.eq(e.state.selection)
							? e.dispatch(e.state.tr.setSelection(t))
							: e.updateState(e.state),
						!0)
				);
		}
		(S.compositionstart = S.compositionupdate =
			e => {
				if (!e.composing) {
					e.domObserver.flush();
					var t = e.state,
						n = t.selection.$from;
					if (
						t.selection.empty &&
						(t.storedMarks ||
							(!n.textOffset &&
								n.parentOffset &&
								n.nodeBefore.marks.some(e => !1 === e.type.spec.inclusive)))
					)
						(e.markCursor = e.state.storedMarks || n.marks()),
							to(e, !0),
							(e.markCursor = null);
					else if (
						(to(e),
						g &&
							t.selection.empty &&
							n.parentOffset &&
							!n.textOffset &&
							n.nodeBefore.marks.length)
					) {
						var r = e.domSelection();
						for (
							let e = r.focusNode, t = r.focusOffset;
							e && 1 == e.nodeType && 0 != t;

						) {
							var o = t < 0 ? e.lastChild : e.childNodes[t - 1];
							if (!o) break;
							if (3 == o.nodeType) {
								r.collapse(o, o.nodeValue.length);
								break;
							}
							(e = o), (t = -1);
						}
					}
					e.input.composing = !0;
				}
				Yr(e, ne);
			}),
			(S.compositionend = (e, t) => {
				e.composing &&
					((e.input.composing = !1),
					(e.input.compositionEndedAt = t.timeStamp),
					Yr(e, 20));
			});
		let E = (f && m < 15) || (b && Ce < 604);
		function no(t, e, n, r) {
			let o = Fr(t, e, n, t.input.shiftKey, t.state.selection.$from);
			return (
				t.someProp("handlePaste", e => e(t, r, o || Ke.empty)) ||
				(o
					? ((e = (n =
							0 == (e = o).openStart && 0 == e.openEnd && 1 == e.content.childCount
								? e.content.firstChild
								: null)
							? t.state.tr.replaceSelectionWith(n, t.input.shiftKey)
							: t.state.tr.replaceSelection(o)),
						t.dispatch(
							e.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")
						),
						1)
					: void 0)
			);
		}
		(p.copy = S.cut =
			(e, t) => {
				var n = e.state.selection,
					r = "cut" == t.type;
				if (!n.empty) {
					var o = E ? null : t.clipboardData,
						{ dom: n, text: i } = Br(e, n.content());
					if (o)
						t.preventDefault(),
							o.clearData(),
							o.setData("text/html", n.innerHTML),
							o.setData("text/plain", i);
					else {
						var s = e,
							t = n;
						if (s.dom.parentNode) {
							let e = s.dom.parentNode.appendChild(document.createElement("div"));
							e.appendChild(t),
								(e.style.cssText = "position: fixed; left: -10000px; top: 10px");
							(o = getSelection()), (i = document.createRange());
							i.selectNodeContents(t),
								s.dom.blur(),
								o.removeAllRanges(),
								o.addRange(i),
								setTimeout(() => {
									e.parentNode && e.parentNode.removeChild(e), s.focus();
								}, 50);
						}
					}
					r &&
						e.dispatch(
							e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut")
						);
				}
			}),
			(S.paste = (e, t) => {
				if (!e.composing || w) {
					var n = E ? null : t.clipboardData;
					if (n && no(e, n.getData("text/plain"), n.getData("text/html"), t))
						t.preventDefault();
					else {
						var r = e,
							o = t;
						if (r.dom.parentNode) {
							let e =
									r.input.shiftKey ||
									r.state.selection.$from.parent.type.spec.code,
								t = r.dom.parentNode.appendChild(
									document.createElement(e ? "textarea" : "div")
								);
							e || (t.contentEditable = "true"),
								(t.style.cssText = "position: fixed; left: -10000px; top: 10px"),
								t.focus(),
								setTimeout(() => {
									r.focus(),
										t.parentNode && t.parentNode.removeChild(t),
										e
											? no(r, t.value, null, o)
											: no(r, t.textContent, t.innerHTML, o);
								}, 50);
						}
					}
				}
			});
		class L0 {
			constructor(e, t) {
				(this.slice = e), (this.move = t);
			}
		}
		let re = c ? "altKey" : "ctrlKey";
		for (qn in ((p.dragstart = (e, t) => {
			var n,
				r,
				o = e.input.mouseDown;
			o && o.done(),
				t.dataTransfer &&
					(((r = (n = e.state.selection).empty ? null : e.posAtCoords(Wr(t))) &&
						r.pos >= n.from &&
						r.pos <= (n instanceof Qe ? n.to - 1 : n.to)) ||
						(o && o.mightDrag
							? e.dispatch(
									e.state.tr.setSelection(Qe.create(e.state.doc, o.mightDrag.pos))
								)
							: t.target &&
								1 == t.target.nodeType &&
								(r = e.docView.nearestDesc(t.target, !0)) &&
								r.node.type.spec.draggable &&
								r != e.docView &&
								e.dispatch(
									e.state.tr.setSelection(Qe.create(e.state.doc, r.posBefore))
								)),
					(n = e.state.selection.content()),
					({ dom: o, text: r } = Br(e, n)),
					t.dataTransfer.clearData(),
					t.dataTransfer.setData(E ? "Text" : "text/html", o.innerHTML),
					(t.dataTransfer.effectAllowed = "copyMove"),
					E || t.dataTransfer.setData("text/plain", r),
					(e.dragging = new L0(n, !t[re])));
		}),
		(p.dragend = e => {
			let t = e.dragging;
			window.setTimeout(() => {
				e.dragging == t && (e.dragging = null);
			}, 50);
		}),
		(S.dragover = S.dragenter = (e, t) => t.preventDefault()),
		(S.drop = (r, i) => {
			let o = i;
			i = r.dragging;
			if (((r.dragging = null), o.dataTransfer)) {
				var s = r.posAtCoords(Wr(o));
				if (s) {
					s = r.state.doc.resolve(s.pos);
					if (s) {
						let t = i && i.slice,
							n =
								(t
									? r.someProp("transformPasted", e => {
											t = e(t);
										})
									: (t = Fr(
											r,
											o.dataTransfer.getData(E ? "Text" : "text/plain"),
											E ? null : o.dataTransfer.getData("text/html"),
											!1,
											s
										)),
								!(!i || o[re]));
						if (r.someProp("handleDrop", e => e(r, o, t || Ke.empty, n)))
							o.preventDefault();
						else if (t) {
							o.preventDefault();
							let e = t
								? ((e, t, n) => {
										var o = e.resolve(t);
										if (!n.content.size) return t;
										let i = n.content;
										for (let e = 0; e < n.openStart; e++)
											i = i.firstChild.content;
										for (
											let r = 1;
											r <= (0 == n.openStart && n.size ? 2 : 1);
											r++
										)
											for (let n = o.depth; 0 <= n; n--) {
												var s,
													a =
														n == o.depth
															? 0
															: o.pos <=
																  (o.start(n + 1) + o.end(n + 1)) /
																		2
																? -1
																: 1,
													l = o.index(n) + (0 < a ? 1 : 0);
												let e = o.node(n),
													t = !1;
												if (
													(t =
														1 == r
															? e.canReplace(l, l, i)
															: (s = e
																	.contentMatchAt(l)
																	.findWrapping(
																		i.firstChild.type
																	)) &&
																e.canReplaceWith(l, l, s[0]))
												)
													return 0 == a
														? o.pos
														: a < 0
															? o.before(n + 1)
															: o.after(n + 1);
											}
										return null;
									})(r.state.doc, s.pos, t)
								: s.pos;
							null == e && (e = s.pos);
							var i = r.state.tr,
								s = (n && i.deleteSelection(), i.mapping.map(e)),
								a = 0 == t.openStart && 0 == t.openEnd && 1 == t.content.childCount,
								l = i.doc;
							if (
								(a
									? i.replaceRangeWith(s, s, t.content.firstChild)
									: i.replaceRange(s, s, t),
								!i.doc.eq(l))
							) {
								l = i.doc.resolve(s);
								if (
									a &&
									Qe.isSelectable(t.content.firstChild) &&
									l.nodeAfter &&
									l.nodeAfter.sameMarkup(t.content.firstChild)
								)
									i.setSelection(new Qe(l));
								else {
									let o = i.mapping.map(e);
									i.mapping.maps[i.mapping.maps.length - 1].forEach(
										(e, t, n, r) => (o = r)
									),
										i.setSelection(wr(r, l, i.doc.resolve(o)));
								}
								r.focus(), r.dispatch(i.setMeta("uiEvent", "drop"));
							}
						}
					}
				}
			}
		}),
		(p.focus = e => {
			e.focused ||
				(e.domObserver.stop(),
				e.dom.classList.add("ProseMirror-focused"),
				e.domObserver.start(),
				(e.focused = !0),
				setTimeout(() => {
					e.docView &&
						e.hasFocus() &&
						!e.domObserver.currentSelection.eq(e.domSelection()) &&
						fr(e);
				}, 20));
		}),
		(p.blur = (e, t) => {
			e.focused &&
				(e.domObserver.stop(),
				e.dom.classList.remove("ProseMirror-focused"),
				e.domObserver.start(),
				t.relatedTarget &&
					e.dom.contains(t.relatedTarget) &&
					e.domObserver.currentSelection.clear(),
				(e.focused = !1));
		}),
		(p.beforeinput = (n, e) => {
			if (v && w && "deleteContentBackward" == e.inputType) {
				n.domObserver.flushSoon();
				let t = n.input.domChangeCount;
				setTimeout(() => {
					var e;
					n.input.domChangeCount != t ||
						(n.dom.blur(),
						n.focus(),
						n.someProp("handleKeyDown", e => e(n, _n(8, "Backspace")))) ||
						((e = n.state.selection.$cursor),
						e &&
							0 < e.pos &&
							n.dispatch(n.state.tr.delete(e.pos - 1, e.pos).scrollIntoView()));
				}, 50);
			}
		}),
		S))
			p[qn] = S[qn];
		function ro(e, t) {
			if (e != t) {
				for (var n in e) if (e[n] !== t[n]) return !1;
				for (var r in t) if (!(r in e)) return !1;
			}
			return !0;
		}
		class I0 {
			constructor(e, t) {
				(this.toDOM = e), (this.spec = t || O), (this.side = this.spec.side || 0);
			}
			map(e, t, n, r) {
				var { pos: e, deleted: t } = e.mapResult(t.from + r, this.side < 0 ? -1 : 1);
				return t ? null : new B0(e - n, e - n, this);
			}
			valid() {
				return !0;
			}
			eq(e) {
				return (
					this == e ||
					(e instanceof I0 &&
						((this.spec.key && this.spec.key == e.spec.key) ||
							(this.toDOM == e.toDOM && ro(this.spec, e.spec))))
				);
			}
			destroy(e) {
				this.spec.destroy && this.spec.destroy(e);
			}
		}
		class R0 {
			constructor(e, t) {
				(this.attrs = e), (this.spec = t || O);
			}
			map(e, t, n, r) {
				var o = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
					e = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
				return e <= o ? null : new B0(o, e, this);
			}
			valid(e, t) {
				return t.from < t.to;
			}
			eq(e) {
				return (
					this == e ||
					(e instanceof R0 && ro(this.attrs, e.attrs) && ro(this.spec, e.spec))
				);
			}
			static is(e) {
				return e.type instanceof R0;
			}
			destroy() {}
		}
		class P0 {
			constructor(e, t) {
				(this.attrs = e), (this.spec = t || O);
			}
			map(e, t, n, r) {
				var o = e.mapResult(t.from + r, 1);
				return o.deleted || (e = e.mapResult(t.to + r, -1)).deleted || e.pos <= o.pos
					? null
					: new B0(o.pos - n, e.pos - n, this);
			}
			valid(e, t) {
				let { index: n, offset: r } = e.content.findIndex(t.from),
					o;
				return r == t.from && !(o = e.child(n)).isText && r + o.nodeSize == t.to;
			}
			eq(e) {
				return (
					this == e ||
					(e instanceof P0 && ro(this.attrs, e.attrs) && ro(this.spec, e.spec))
				);
			}
			destroy() {}
		}
		class B0 {
			constructor(e, t, n) {
				(this.from = e), (this.to = t), (this.type = n);
			}
			copy(e, t) {
				return new B0(e, t, this.type);
			}
			eq(e, t = 0) {
				return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
			}
			map(e, t, n) {
				return this.type.map(e, this, t, n);
			}
			static widget(e, t, n) {
				return new B0(e, e, new I0(t, n));
			}
			static inline(e, t, n, r) {
				return new B0(e, t, new R0(n, r));
			}
			static node(e, t, n, r) {
				return new B0(e, t, new P0(n, r));
			}
			get spec() {
				return this.type.spec;
			}
			get inline() {
				return this.type instanceof R0;
			}
		}
		let N = [],
			O = {};
		class Ye {
			constructor(e, t) {
				(this.local = e.length ? e : N), (this.children = t.length ? t : N);
			}
			static create(e, t) {
				return t.length ? ao(t, e, 0, O) : D;
			}
			find(e, t, n) {
				var r = [];
				return this.findInner(null == e ? 0 : e, null == t ? 1e9 : t, r, 0, n), r;
			}
			findInner(t, n, r, o, i) {
				for (let e = 0; e < this.local.length; e++) {
					var s = this.local[e];
					s.from <= n &&
						s.to >= t &&
						(!i || i(s.spec)) &&
						r.push(s.copy(s.from + o, s.to + o));
				}
				for (let e = 0; e < this.children.length; e += 3) {
					var a;
					this.children[e] < n &&
						this.children[e + 1] > t &&
						((a = this.children[e] + 1),
						this.children[e + 2].findInner(t - a, n - a, r, o + a, i));
				}
			}
			map(e, t, n) {
				return this == D || 0 == e.maps.length ? this : this.mapInner(e, t, 0, 0, n || O);
			}
			mapInner(r, o, i, s, a) {
				let c;
				for (let e = 0; e < this.local.length; e++) {
					var t = this.local[e].map(r, i, s);
					t && t.type.valid(o, t)
						? (c = c || []).push(t)
						: a.onRemove && a.onRemove(this.local[e].spec);
				}
				if (this.children.length) {
					var u = this.children,
						e = c || [],
						d = r,
						p = o,
						h = i,
						f = s,
						m = a;
					let l = u.slice(),
						t = (r, o, i, s) => {
							for (let n = 0; n < l.length; n += 3) {
								let e = l[n + 1],
									t;
								var a;
								e < 0 ||
									e + f < r ||
									((a = l[n] + f) <= o
										? (l[n + 1] = r <= a ? -2 : -1)
										: h <= i &&
											(t = s - i - (o - r)) &&
											((l[n] += t), (l[n + 1] += t)));
							}
						};
					for (let e = 0; e < d.maps.length; e++) d.maps[e].forEach(t);
					let n = !1;
					for (let e = 0; e < l.length; e += 3)
						if (l[e + 1] < 0) {
							if (-2 == l[e + 1]) {
								(n = !0), (l[e + 1] = -1);
								continue;
							}
							var g = d.map(u[e] + f),
								v = g - h;
							if (v < 0 || v >= p.content.size) {
								n = !0;
								continue;
							}
							var y = d.map(u[e + 1] + f, -1) - h,
								{ index: b, offset: w } = p.content.findIndex(v),
								b = p.maybeChild(b);
							b && w == v && w + b.nodeSize == y
								? (w = l[e + 2].mapInner(d, b, g + 1, u[e] + f + 1, m)) != D
									? ((l[e] = v), (l[e + 1] = y), (l[e + 2] = w))
									: ((l[e + 1] = -2), (n = !0))
								: (n = !0);
						}
					if (n) {
						var k = ao(
							((t, n, i, s, a, r, l) => {
								for (let e = 0; e < t.length; e += 3)
									-1 == t[e + 1] &&
										!(function t(n, r) {
											for (let e = 0; e < n.local.length; e++) {
												var o = n.local[e].map(s, a, r);
												o
													? i.push(o)
													: l.onRemove && l.onRemove(n.local[e].spec);
											}
											for (let e = 0; e < n.children.length; e += 3)
												t(n.children[e + 2], n.children[e] + r + 1);
										})(t[e + 2], n[e] + r + 1);
								return i;
							})(l, u, e, d, h, f, m),
							p,
							0,
							m
						);
						e = k.local;
						for (let e = 0; e < l.length; e += 3)
							l[e + 1] < 0 && (l.splice(e, 3), (e -= 3));
						for (let e = 0, t = 0; e < k.children.length; e += 3) {
							for (var x = k.children[e]; t < l.length && l[t] < x; ) t += 3;
							l.splice(t, 0, k.children[e], k.children[e + 1], k.children[e + 2]);
						}
					}
					return new Ye(e.sort(lo), l);
				}
				return c ? new Ye(c.sort(lo), N) : D;
			}
			add(e, t) {
				return t.length ? (this == D ? Ye.create(e, t) : this.addInner(e, t, 0)) : this;
			}
			addInner(t, o, i) {
				let s,
					a = 0;
				t.forEach((e, t) => {
					var n,
						r = t + i;
					if ((n = io(o, e, r))) {
						for (s = s || this.children.slice(); a < s.length && s[a] < t; ) a += 3;
						s[a] == t
							? (s[a + 2] = s[a + 2].addInner(e, n, r + 1))
							: s.splice(a, 0, t, t + e.nodeSize, ao(n, e, r + 1, O)),
							(a += 3);
					}
				});
				var n = oo(a ? so(o) : o, -i);
				for (let e = 0; e < n.length; e++) n[e].type.valid(t, n[e]) || n.splice(e--, 1);
				return new Ye(
					n.length ? this.local.concat(n).sort(lo) : this.local,
					s || this.children
				);
			}
			remove(e) {
				return 0 == e.length || this == D ? this : this.removeInner(e, 0);
			}
			removeInner(r, o) {
				let t = this.children,
					n = this.local;
				for (let e = 0; e < t.length; e += 3) {
					let n;
					var i,
						s = t[e] + o,
						a = t[e + 1] + o;
					for (let e = 0, t; e < r.length; e++)
						(t = r[e]) &&
							t.from > s &&
							t.to < a &&
							((r[e] = null), (n = n || []).push(t));
					n &&
						((i = (t = t == this.children ? this.children.slice() : t)[
							e + 2
						].removeInner(n, s + 1)) != D
							? (t[e + 2] = i)
							: (t.splice(e, 3), (e -= 3)));
				}
				if (n.length)
					for (let e = 0, t; e < r.length; e++)
						if ((t = r[e]))
							for (let e = 0; e < n.length; e++)
								n[e].eq(t, o) &&
									(n = n == this.local ? this.local.slice() : n).splice(e--, 1);
				return t == this.children && n == this.local
					? this
					: n.length || t.length
						? new Ye(n, t)
						: D;
			}
			forChild(t, e) {
				if (this == D) return this;
				if (e.isLeaf) return Ye.empty;
				let n, r;
				for (let e = 0; e < this.children.length; e += 3)
					if (this.children[e] >= t) {
						this.children[e] == t && (n = this.children[e + 2]);
						break;
					}
				var o = t + 1,
					i = o + e.content.size;
				for (let e = 0; e < this.local.length; e++) {
					var s,
						a,
						l = this.local[e];
					l.from < i &&
						l.to > o &&
						l.type instanceof R0 &&
						(s = Math.max(o, l.from) - o) < (a = Math.min(i, l.to) - o) &&
						(r = r || []).push(l.copy(s, a));
				}
				return r ? ((e = new Ye(r.sort(lo), N)), n ? new F0([e, n]) : e) : n || D;
			}
			eq(t) {
				if (this != t) {
					if (
						!(t instanceof Ye) ||
						this.local.length != t.local.length ||
						this.children.length != t.children.length
					)
						return !1;
					for (let e = 0; e < this.local.length; e++)
						if (!this.local[e].eq(t.local[e])) return !1;
					for (let e = 0; e < this.children.length; e += 3)
						if (
							this.children[e] != t.children[e] ||
							this.children[e + 1] != t.children[e + 1] ||
							!this.children[e + 2].eq(t.children[e + 2])
						)
							return !1;
				}
				return !0;
			}
			locals(e) {
				return co(this.localsInner(e));
			}
			localsInner(e) {
				if (this == D) return N;
				if (e.inlineContent || !this.local.some(R0.is)) return this.local;
				var t = [];
				for (let e = 0; e < this.local.length; e++)
					this.local[e].type instanceof R0 || t.push(this.local[e]);
				return t;
			}
		}
		(Ye.empty = new Ye([], [])), (Ye.removeOverlap = co);
		let D = Ye.empty;
		class F0 {
			constructor(e) {
				this.members = e;
			}
			map(t, n) {
				var e = this.members.map(e => e.map(t, n, O));
				return F0.from(e);
			}
			forChild(t, n) {
				if (n.isLeaf) return Ye.empty;
				let r = [];
				for (let e = 0; e < this.members.length; e++) {
					var o = this.members[e].forChild(t, n);
					o != D && (o instanceof F0 ? (r = r.concat(o.members)) : r.push(o));
				}
				return F0.from(r);
			}
			eq(t) {
				if (!(t instanceof F0) || t.members.length != this.members.length) return !1;
				for (let e = 0; e < this.members.length; e++)
					if (!this.members[e].eq(t.members[e])) return !1;
				return !0;
			}
			locals(t) {
				let n,
					r = !0;
				for (let e = 0; e < this.members.length; e++) {
					var o = this.members[e].localsInner(t);
					if (o.length)
						if (n) {
							r && ((n = n.slice()), (r = !1));
							for (let e = 0; e < o.length; e++) n.push(o[e]);
						} else n = o;
				}
				return n ? co(r ? n : n.sort(lo)) : N;
			}
			static from(e) {
				switch (e.length) {
					case 0:
						return D;
					case 1:
						return e[0];
					default:
						return new F0(e);
				}
			}
		}
		function oo(t, n) {
			if (!n || !t.length) return t;
			var r = [];
			for (let e = 0; e < t.length; e++) {
				var o = t[e];
				r.push(new B0(o.from + n, o.to + n, o.type));
			}
			return r;
		}
		function io(n, e, r) {
			if (e.isLeaf) return null;
			let o = r + e.nodeSize,
				i = null;
			for (let e = 0, t; e < n.length; e++)
				(t = n[e]) && t.from > r && t.to < o && ((i = i || []).push(t), (n[e] = null));
			return i;
		}
		function so(t) {
			var n = [];
			for (let e = 0; e < t.length; e++) null != t[e] && n.push(t[e]);
			return n;
		}
		function ao(r, t, o, i) {
			let s = [],
				a = !1;
			t.forEach((e, t) => {
				var n = io(r, e, t + o);
				n && ((a = !0), (n = ao(n, e, o + t + 1, i)) != D) && s.push(t, t + e.nodeSize, n);
			});
			var n = oo(a ? so(r) : r, -o).sort(lo);
			for (let e = 0; e < n.length; e++)
				n[e].type.valid(t, n[e]) || (i.onRemove && i.onRemove(n[e].spec), n.splice(e--, 1));
			return n.length || s.length ? new Ye(n, s) : D;
		}
		function lo(e, t) {
			return e.from - t.from || e.to - t.to;
		}
		function co(n) {
			let r = n;
			for (let t = 0; t < r.length - 1; t++) {
				var o = r[t];
				if (o.from != o.to)
					for (let e = t + 1; e < r.length; e++) {
						var i = r[e];
						if (i.from != o.from) {
							i.from < o.to &&
								(((r = r == n ? n.slice() : r)[t] = o.copy(o.from, i.from)),
								uo(r, e, o.copy(i.from, o.to)));
							break;
						}
						i.to != o.to &&
							(((r = r == n ? n.slice() : r)[e] = i.copy(i.from, o.to)),
							uo(r, e + 1, i.copy(o.to, i.to)));
					}
			}
			return r;
		}
		function uo(e, t, n) {
			for (; t < e.length && 0 < lo(n, e[t]); ) t++;
			e.splice(t, 0, n);
		}
		function po(t) {
			let n = [];
			return (
				t.someProp("decorations", e => {
					e = e(t.state);
					e && e != D && n.push(e);
				}),
				t.cursorWrapper && n.push(Ye.create(t.state.doc, [t.cursorWrapper.deco])),
				F0.from(n)
			);
		}
		let oe = {
				childList: !0,
				characterData: !0,
				characterDataOldValue: !0,
				attributes: !0,
				attributeOldValue: !0,
				subtree: !0
			},
			ie = f && m <= 11;
		class H0 {
			constructor() {
				(this.anchorNode = null),
					(this.anchorOffset = 0),
					(this.focusNode = null),
					(this.focusOffset = 0);
			}
			set(e) {
				(this.anchorNode = e.anchorNode),
					(this.anchorOffset = e.anchorOffset),
					(this.focusNode = e.focusNode),
					(this.focusOffset = e.focusOffset);
			}
			clear() {
				this.anchorNode = this.focusNode = null;
			}
			eq(e) {
				return (
					e.anchorNode == this.anchorNode &&
					e.anchorOffset == this.anchorOffset &&
					e.focusNode == this.focusNode &&
					e.focusOffset == this.focusOffset
				);
			}
		}
		class z0 {
			constructor(e, t) {
				(this.view = e),
					(this.handleDOMChange = t),
					(this.queue = []),
					(this.flushingSoon = -1),
					(this.observer = null),
					(this.currentSelection = new H0()),
					(this.onCharData = null),
					(this.suppressingSelectionUpdates = !1),
					(this.observer =
						window.MutationObserver &&
						new window.MutationObserver(t => {
							for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
							f &&
							m <= 11 &&
							t.some(
								e =>
									("childList" == e.type && e.removedNodes.length) ||
									("characterData" == e.type &&
										e.oldValue.length > e.target.nodeValue.length)
							)
								? this.flushSoon()
								: this.flush();
						})),
					ie &&
						(this.onCharData = e => {
							this.queue.push({
								target: e.target,
								type: "characterData",
								oldValue: e.prevValue
							}),
								this.flushSoon();
						}),
					(this.onSelectionChange = this.onSelectionChange.bind(this));
			}
			flushSoon() {
				this.flushingSoon < 0 &&
					(this.flushingSoon = window.setTimeout(() => {
						(this.flushingSoon = -1), this.flush();
					}, 20));
			}
			forceFlush() {
				-1 < this.flushingSoon &&
					(window.clearTimeout(this.flushingSoon),
					(this.flushingSoon = -1),
					this.flush());
			}
			start() {
				this.observer &&
					(this.observer.takeRecords(), this.observer.observe(this.view.dom, oe)),
					this.onCharData &&
						this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData),
					this.connectSelection();
			}
			stop() {
				if (this.observer) {
					var t = this.observer.takeRecords();
					if (t.length) {
						for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
						window.setTimeout(() => this.flush(), 20);
					}
					this.observer.disconnect();
				}
				this.onCharData &&
					this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData),
					this.disconnectSelection();
			}
			connectSelection() {
				this.view.dom.ownerDocument.addEventListener(
					"selectionchange",
					this.onSelectionChange
				);
			}
			disconnectSelection() {
				this.view.dom.ownerDocument.removeEventListener(
					"selectionchange",
					this.onSelectionChange
				);
			}
			suppressSelectionUpdates() {
				(this.suppressingSelectionUpdates = !0),
					setTimeout(() => (this.suppressingSelectionUpdates = !1), 50);
			}
			onSelectionChange() {
				if (kr(this.view)) {
					if (this.suppressingSelectionUpdates) return fr(this.view);
					if (f && m <= 11 && !this.view.state.selection.empty) {
						var e = this.view.domSelection();
						if (
							e.focusNode &&
							Vn(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset)
						)
							return this.flushSoon();
					}
					this.flush();
				}
			}
			setCurSelection() {
				this.currentSelection.set(this.view.domSelection());
			}
			ignoreSelectionChange(e) {
				var t;
				return (
					0 == e.rangeCount ||
					((e = e.getRangeAt(0).commonAncestorContainer),
					(t = this.view.docView.nearestDesc(e)) &&
					t.ignoreMutation({
						type: "selection",
						target: 3 == e.nodeType ? e.parentNode : e
					})
						? (this.setCurSelection(), !0)
						: void 0)
				);
			}
			flush() {
				if (this.view.docView && !(-1 < this.flushingSoon)) {
					let t = this.observer ? this.observer.takeRecords() : [];
					this.queue.length && ((t = this.queue.concat(t)), (this.queue.length = 0));
					var e,
						s,
						a = this.view.domSelection(),
						l =
							!this.suppressingSelectionUpdates &&
							!this.currentSelection.eq(a) &&
							kr(this.view) &&
							!this.ignoreSelectionChange(a);
					let n = -1,
						r = -1,
						o = !1,
						i = [];
					if (this.view.editable)
						for (let e = 0; e < t.length; e++) {
							var c = this.registerMutation(t[e], i);
							c &&
								((n = n < 0 ? c.from : Math.min(c.from, n)),
								(r = r < 0 ? c.to : Math.max(c.to, r)),
								c.typeOver) &&
								(o = !0);
						}
					g &&
						1 < i.length &&
						2 == (s = i.filter(e => "BR" == e.nodeName)).length &&
						((e = s[0]),
						(s = s[1]),
						(e.parentNode && e.parentNode.parentNode == s.parentNode ? s : e).remove()),
						(-1 < n || l) &&
							(-1 < n &&
								(this.view.docView.markDirty(n, r),
								(s = this.view),
								se ||
									((se = !0),
									"normal" == getComputedStyle(s.dom).whiteSpace &&
										console.warn(
											"ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."
										))),
							this.handleDOMChange(n, r, o, i),
							this.view.docView && this.view.docView.dirty
								? this.view.updateState(this.view.state)
								: this.currentSelection.eq(a) || fr(this.view),
							this.currentSelection.set(a));
				}
			}
			registerMutation(r, o) {
				if (-1 < o.indexOf(r.target)) return null;
				var e = this.view.docView.nearestDesc(r.target);
				if (
					"attributes" == r.type &&
					(e == this.view.docView ||
						"contenteditable" == r.attributeName ||
						("style" == r.attributeName &&
							!r.oldValue &&
							!r.target.getAttribute("style")))
				)
					return null;
				if (!e || e.ignoreMutation(r)) return null;
				if ("childList" != r.type)
					return "attributes" == r.type
						? { from: e.posAtStart - e.border, to: e.posAtEnd + e.border }
						: {
								from: e.posAtStart,
								to: e.posAtEnd,
								typeOver: r.target.nodeValue == r.oldValue
							};
				{
					for (let e = 0; e < r.addedNodes.length; e++) o.push(r.addedNodes[e]);
					if (e.contentDOM && e.contentDOM != e.dom && !e.contentDOM.contains(r.target))
						return { from: e.posBefore, to: e.posAfter };
					let t = r.previousSibling,
						n = r.nextSibling;
					if (f && m <= 11 && r.addedNodes.length)
						for (let e = 0; e < r.addedNodes.length; e++) {
							var { previousSibling: i, nextSibling: s } = r.addedNodes[e];
							(!i || Array.prototype.indexOf.call(r.addedNodes, i) < 0) && (t = i),
								(!s || Array.prototype.indexOf.call(r.addedNodes, s) < 0) &&
									(n = s);
						}
					var a = t && t.parentNode == r.target ? x(t) + 1 : 0,
						a = e.localPosFromDOM(r.target, a, -1),
						l = n && n.parentNode == r.target ? x(n) : r.target.childNodes.length;
					return { from: a, to: e.localPosFromDOM(r.target, l, 1) };
				}
			}
		}
		let se = !1;
		function ho(e) {
			var t = e.pmViewDesc;
			if (t) return t.parseRule();
			if ("BR" == e.nodeName && e.parentNode) {
				if (y && /^(ul|ol)$/i.test(e.parentNode.nodeName))
					return (
						(t = document.createElement("div")).appendChild(
							document.createElement("li")
						),
						{ skip: t }
					);
				if (
					e.parentNode.lastChild == e ||
					(y && /^(tr|table)$/i.test(e.parentNode.nodeName))
				)
					return { ignore: !0 };
			} else if ("IMG" == e.nodeName && e.getAttribute("mark-placeholder"))
				return { ignore: !0 };
			return null;
		}
		function fo(a, l, c, u, d) {
			if (l < 0)
				(p =
					a.input.lastSelectionTime > Date.now() - 50
						? a.input.lastSelectionOrigin
						: null),
					(h = pr(a, p)) &&
						!a.state.selection.eq(h) &&
						((h = a.state.tr.setSelection(h)),
						"pointer" == p
							? h.setMeta("pointer", !0)
							: "key" == p && h.scrollIntoView(),
						a.dispatch(h));
			else {
				var p = a.state.doc.resolve(l),
					h = p.sharedDepth(c),
					p =
						((l = p.before(h + 1)),
						(c = a.state.doc.resolve(c).after(h + 1)),
						a.state.selection),
					h = ((e, t, n) => {
						let {
							node: r,
							fromOffset: o,
							toOffset: i,
							from: s,
							to: a
						} = e.docView.parseRange(t, n);
						t = e.domSelection();
						let l;
						if (
							((n = t.anchorNode) &&
								e.dom.contains(1 == n.nodeType ? n : n.parentNode) &&
								((l = [{ node: n, offset: t.anchorOffset }]),
								T(t) || l.push({ node: t.focusNode, offset: t.focusOffset })),
							v && 8 === e.input.lastKeyCode)
						)
							for (let e = i; e > o; e--) {
								var c = r.childNodes[e - 1],
									u = c.pmViewDesc;
								if ("BR" == c.nodeName && !u) {
									i = e;
									break;
								}
								if (!u || u.size) break;
							}
						(n = e.state.doc),
							(t = e.someProp("domParser") || Zy.fromSchema(e.state.schema)),
							(e = n.resolve(s));
						let d = null,
							p = t.parse(r, {
								topNode: e.parent,
								topMatch: e.parent.contentMatchAt(e.index()),
								topOpen: !0,
								from: o,
								to: i,
								preserveWhitespace: "pre" != e.parent.type.whitespace || "full",
								findPositions: l,
								ruleFromNode: ho,
								context: e
							});
						if (l && null != l[0].pos) {
							let e = l[0].pos,
								t = l[1] && l[1].pos;
							null == t && (t = e), (d = { anchor: e + s, head: t + s });
						}
						return { doc: p, sel: d, from: s, to: a };
					})(a, l, c),
					l =
						(v &&
							a.cursorWrapper &&
							h.sel &&
							h.sel.anchor == a.cursorWrapper.deco.from &&
							h.sel.head == h.sel.anchor &&
							((c =
								(l = a.cursorWrapper.deco.type.toDOM.nextSibling) && l.nodeValue
									? l.nodeValue.length
									: 1),
							(h.sel = { anchor: h.sel.anchor + c, head: h.sel.anchor + c })),
						a.state.doc),
					c = l.slice(h.from, h.to);
				let e,
					t,
					s =
						((t =
							8 === a.input.lastKeyCode && Date.now() - 100 < a.input.lastKeyCodeTime
								? ((e = a.state.selection.to), "end")
								: ((e = a.state.selection.from), "start")),
						(a.input.lastKeyCode = null),
						((e, t, n, r, o) => {
							let i = e.findDiffStart(t, n);
							if (null == i) return null;
							let { a: s, b: a } = e.findDiffEnd(t, n + e.size, n + t.size);
							return (
								"end" == o &&
									((n = Math.max(0, i - Math.min(s, a))), (r -= s + n - i)),
								s < i && e.size < t.size
									? ((o = r <= i && r >= s ? i - r : 0),
										(i -= o),
										(a = i + (a - s)),
										(s = i))
									: a < i &&
										((n = r <= i && r >= a ? i - r : 0),
										(i -= n),
										(s = i + (s - a)),
										(a = i)),
								{ start: i, endA: s, endB: a }
							);
						})(c.content, h.doc.content, h.from, e, t));
				if (
					((b && a.input.lastIOSEnter > Date.now() - 225) || w) &&
					d.some(e => "DIV" == e.nodeName || "P" == e.nodeName) &&
					(!s || s.endA >= s.endB) &&
					a.someProp("handleKeyDown", e => e(a, _n(13, "Enter")))
				)
					a.input.lastIOSEnter = 0;
				else {
					if (!s) {
						if (
							!(u && p instanceof Xe && !p.empty && p.$head.sameParent(p.$anchor)) ||
							a.composing ||
							(h.sel && h.sel.anchor != h.sel.head)
						)
							return void (
								h.sel &&
								(c = mo(a, a.state.doc, h.sel)) &&
								!c.eq(a.state.selection) &&
								a.dispatch(a.state.tr.setSelection(c))
							);
						s = { start: p.from, endA: p.to, endB: p.to };
					}
					a.input.domChangeCount++,
						a.state.selection.from < a.state.selection.to &&
							s.start == s.endB &&
							a.state.selection instanceof Xe &&
							(s.start > a.state.selection.from &&
							s.start <= a.state.selection.from + 2 &&
							a.state.selection.from >= h.from
								? (s.start = a.state.selection.from)
								: s.endA < a.state.selection.to &&
									s.endA >= a.state.selection.to - 2 &&
									a.state.selection.to <= h.to &&
									((s.endB += a.state.selection.to - s.endA),
									(s.endA = a.state.selection.to))),
						f &&
							m <= 11 &&
							s.endB == s.start + 1 &&
							s.endA == s.start &&
							s.start > h.from &&
							"  " == h.doc.textBetween(s.start - h.from - 1, s.start - h.from + 1) &&
							(s.start--, s.endA--, s.endB--);
					u = h.doc.resolveNoCache(s.start - h.from);
					let i = h.doc.resolveNoCache(s.endB - h.from);
					(c = l.resolve(s.start)),
						(p = u.sameParent(i) && u.parent.inlineContent && c.end() >= s.endA);
					let e;
					if (
						((b &&
							a.input.lastIOSEnter > Date.now() - 225 &&
							(!p || d.some(e => "DIV" == e.nodeName || "P" == e.nodeName))) ||
							(!p &&
								u.pos < h.doc.content.size &&
								(e = Ze.findFrom(h.doc.resolve(u.pos + 1), 1, !0)) &&
								e.head == i.pos)) &&
						a.someProp("handleKeyDown", e => e(a, _n(13, "Enter")))
					)
						a.input.lastIOSEnter = 0;
					else if (
						a.state.selection.anchor > s.start &&
						((e, t, n, r, o) =>
							!(
								!r.parent.isTextblock ||
								n - t <= o.pos - r.pos ||
								go(r, !0, !1) < o.pos
							) &&
							!((o = e.resolve(t)).parentOffset < o.parent.content.size) &&
							o.parent.isTextblock &&
							!(
								!(t = e.resolve(go(o, !0, !0))).parent.isTextblock ||
								t.pos > n ||
								go(t, !0, !1) < n
							) &&
							r.parent.content.cut(r.parentOffset).eq(t.parent.content))(
							l,
							s.start,
							s.endA,
							u,
							i
						) &&
						a.someProp("handleKeyDown", e => e(a, _n(8, "Backspace")))
					)
						w && v && a.domObserver.suppressSelectionUpdates();
					else {
						v && w && s.endB == s.start && (a.input.lastAndroidDelete = Date.now()),
							w &&
								!p &&
								u.start() != i.start() &&
								0 == i.parentOffset &&
								u.depth == i.depth &&
								h.sel &&
								h.sel.anchor == h.sel.head &&
								h.sel.head == s.endA &&
								((s.endB -= 2),
								(i = h.doc.resolveNoCache(s.endB - h.from)),
								setTimeout(() => {
									a.someProp("handleKeyDown", function (e) {
										return e(a, _n(13, "Enter"));
									});
								}, 20));
						let n = s.start,
							r = s.endA,
							e,
							t,
							o;
						if (p)
							if (u.pos == i.pos)
								f &&
									m <= 11 &&
									0 == u.parentOffset &&
									(a.domObserver.suppressSelectionUpdates(),
									setTimeout(() => fr(a), 20)),
									(e = a.state.tr.delete(n, r)),
									(t = l.resolve(s.start).marksAcross(l.resolve(s.endA)));
							else if (
								s.endA == s.endB &&
								(o = ((e, t) => {
									let n = e.firstChild.marks,
										r = t.firstChild.marks,
										o = n,
										i = r,
										s,
										a,
										l;
									for (let e = 0; e < r.length; e++) o = r[e].removeFromSet(o);
									for (let e = 0; e < n.length; e++) i = n[e].removeFromSet(i);
									if (1 == o.length && 0 == i.length)
										(a = o[0]),
											(s = "add"),
											(l = e => e.mark(a.addToSet(e.marks)));
									else {
										if (0 != o.length || 1 != i.length) return null;
										(a = i[0]),
											(s = "remove"),
											(l = e => e.mark(a.removeFromSet(e.marks)));
									}
									var c = [];
									for (let e = 0; e < t.childCount; e++) c.push(l(t.child(e)));
									if (Je.from(c).eq(e)) return { mark: a, type: s };
								})(
									u.parent.content.cut(u.parentOffset, i.parentOffset),
									c.parent.content.cut(c.parentOffset, s.endA - c.start())
								))
							)
								(e = a.state.tr),
									"add" == o.type
										? e.addMark(n, r, o.mark)
										: e.removeMark(n, r, o.mark);
							else if (
								u.parent.child(u.index()).isText &&
								u.index() == i.index() - (i.textOffset ? 0 : 1)
							) {
								let t = u.parent.textBetween(u.parentOffset, i.parentOffset);
								if (a.someProp("handleTextInput", e => e(a, n, r, t))) return;
								e = a.state.tr.insertText(t, n, r);
							}
						(e =
							e ||
							a.state.tr.replace(
								n,
								r,
								h.doc.slice(s.start - h.from, s.endB - h.from)
							)),
							h.sel &&
								(d = mo(a, e.doc, h.sel)) &&
								!(
									(v &&
										w &&
										a.composing &&
										d.empty &&
										(s.start != s.endB ||
											a.input.lastAndroidDelete < Date.now() - 100) &&
										(d.head == n || d.head == e.mapping.map(r) - 1)) ||
									(f && d.empty && d.head == n)
								) &&
								e.setSelection(d),
							t && e.ensureMarks(t),
							a.dispatch(e.scrollIntoView());
					}
				}
			}
		}
		function mo(e, t, n) {
			return Math.max(n.anchor, n.head) > t.content.size
				? null
				: wr(e, t.resolve(n.anchor), t.resolve(n.head));
		}
		function go(t, e, n) {
			let r = t.depth,
				o = e ? t.end() : t.pos;
			for (; 0 < r && (e || t.indexAfter(r) == t.node(r).childCount); ) r--, o++, (e = !1);
			if (n) {
				let e = t.node(r).maybeChild(t.indexAfter(r));
				for (; e && !e.isLeaf; ) (e = e.firstChild), o++;
			}
			return o;
		}
		class q0 {
			constructor(e, t) {
				(this._root = null),
					(this.focused = !1),
					(this.trackWrites = null),
					(this.mounted = !1),
					(this.markCursor = null),
					(this.cursorWrapper = null),
					(this.lastSelectedViewDesc = void 0),
					(this.input = new D0()),
					(this.prevDirectPlugins = []),
					(this.pluginViews = []),
					(this.dragging = null),
					(this._props = t),
					(this.state = t.state),
					(this.directPlugins = t.plugins || []),
					this.directPlugins.forEach(ko),
					(this.dispatch = this.dispatch.bind(this)),
					(this.dom = (e && e.mount) || document.createElement("div")),
					e &&
						(e.appendChild
							? e.appendChild(this.dom)
							: "function" == typeof e
								? e(this.dom)
								: e.mount && (this.mounted = !0)),
					(this.editable = bo(this)),
					yo(this),
					(this.nodeViews = wo(this)),
					(this.docView = or(this.state.doc, vo(this), po(this), this.dom, this)),
					(this.domObserver = new z0(this, (e, t, n, r) => fo(this, e, t, n, r))),
					this.domObserver.start(),
					jr(this),
					this.updatePluginViews();
			}
			get composing() {
				return this.input.composing;
			}
			get props() {
				if (this._props.state != this.state) {
					var e,
						t = this._props;
					for (e in ((this._props = {}), t)) this._props[e] = t[e];
					this._props.state = this.state;
				}
				return this._props;
			}
			update(e) {
				e.handleDOMEvents != this._props.handleDOMEvents && _r(this),
					(this._props = e).plugins &&
						(e.plugins.forEach(ko), (this.directPlugins = e.plugins)),
					this.updateStateInner(e.state, !0);
			}
			setProps(e) {
				var t,
					n,
					r = {};
				for (t in this._props) r[t] = this._props[t];
				for (n in ((r.state = this.state), e)) r[n] = e[n];
				this.update(r);
			}
			updateState(e) {
				this.updateStateInner(e, this.state.plugins != e.plugins);
			}
			updateStateInner(t, e) {
				let n = this.state,
					r = !1,
					o = !1;
				t.storedMarks && this.composing && (eo(this), (o = !0)),
					(this.state = t),
					e &&
						(((e, t) => {
							let n = 0,
								r = 0;
							for (var o in e) {
								if (e[o] != t[o]) return 1;
								n++;
							}
							for (var i in t) r++;
							return n != r;
						})((l = wo(this)), this.nodeViews) && ((this.nodeViews = l), (r = !0)),
						_r(this)),
					(this.editable = bo(this)),
					yo(this);
				var i,
					s,
					a,
					l = po(this),
					c = vo(this),
					e = e
						? "reset"
						: t.scrollToSelection > n.scrollToSelection
							? "to selection"
							: "preserve",
					u = r || !this.docView.matchesNode(t.doc, c, l),
					d =
						((!u && t.selection.eq(n.selection)) || (o = !0),
						"preserve" == e &&
							o &&
							null == this.dom.style.overflowAnchor &&
							(n => {
								var r = n.dom.getBoundingClientRect(),
									o = Math.max(0, r.top);
								let i, s;
								for (
									let e = (r.left + r.right) / 2, t = o + 1;
									t < Math.min(innerHeight, r.bottom);
									t += 5
								) {
									var a = n.root.elementFromPoint(e, t);
									if (a && a != n.dom && n.dom.contains(a)) {
										var l = a.getBoundingClientRect();
										if (l.top >= o - 20) {
											(i = a), (s = l.top);
											break;
										}
									}
								}
								return { refDOM: i, refTop: s, stack: Jn(n.dom) };
							})(this));
				if (o) {
					this.domObserver.stop();
					let e =
						u &&
						(f || v) &&
						!this.composing &&
						!n.selection.empty &&
						!t.selection.empty &&
						((i = n.selection),
						(s = t.selection),
						(a = Math.min(
							i.$anchor.sharedDepth(i.head),
							s.$anchor.sharedDepth(s.head)
						)),
						i.$anchor.start(a) != s.$anchor.start(a));
					(e =
						u &&
						((i = v ? (this.trackWrites = this.domSelection().focusNode) : null),
						(!r && this.docView.update(t.doc, c, l, this)) ||
							(this.docView.updateOuterDeco([]),
							this.docView.destroy(),
							(this.docView = or(t.doc, c, l, this.dom, this))),
						i) &&
						!this.trackWrites
							? !0
							: e) ||
					!(
						this.input.mouseDown &&
						this.domObserver.currentSelection.eq(this.domSelection()) &&
						((a = (s = this).docView.domFromPos(s.state.selection.anchor, 0)),
						(s = s.domSelection()),
						Vn(a.node, a.offset, s.anchorNode, s.anchorOffset))
					)
						? fr(this, e)
						: (yr(this, t.selection), this.domObserver.setCurSelection()),
						this.domObserver.start();
				}
				this.updatePluginViews(n),
					"reset" == e
						? (this.dom.scrollTop = 0)
						: "to selection" == e
							? ((u = this.domSelection().focusNode),
								this.someProp("handleScrollToSelection", e => e(this)) ||
									(t.selection instanceof Qe
										? 1 ==
												(c = this.docView.domAfterPos(t.selection.from))
													.nodeType &&
											Wn(this, c.getBoundingClientRect(), u)
										: Wn(this, this.coordsAtPos(t.selection.head, 1), u)))
							: d &&
								(({ refDOM: l, refTop: e, stack: c } = [d][0]),
								(l = l ? l.getBoundingClientRect().top : 0),
								Gn(c, 0 == l ? 0 : l - e));
			}
			destroyPluginViews() {
				for (var e; (e = this.pluginViews.pop()); ) e.destroy && e.destroy();
			}
			updatePluginViews(t) {
				if (
					t &&
					t.plugins == this.state.plugins &&
					this.directPlugins == this.prevDirectPlugins
				)
					for (let e = 0; e < this.pluginViews.length; e++) {
						var n = this.pluginViews[e];
						n.update && n.update(this, t);
					}
				else {
					(this.prevDirectPlugins = this.directPlugins), this.destroyPluginViews();
					for (let e = 0; e < this.directPlugins.length; e++) {
						var r = this.directPlugins[e];
						r.spec.view && this.pluginViews.push(r.spec.view(this));
					}
					for (let e = 0; e < this.state.plugins.length; e++) {
						var o = this.state.plugins[e];
						o.spec.view && this.pluginViews.push(o.spec.view(this));
					}
				}
			}
			someProp(t, n) {
				let e = this._props && this._props[t],
					r;
				if (null != e && (r = n ? n(e) : e)) return r;
				for (let e = 0; e < this.directPlugins.length; e++) {
					var o = this.directPlugins[e].props[t];
					if (null != o && (r = n ? n(o) : o)) return r;
				}
				var i = this.state.plugins;
				if (i)
					for (let e = 0; e < i.length; e++) {
						var s = i[e].props[t];
						if (null != s && (r = n ? n(s) : s)) return r;
					}
			}
			hasFocus() {
				return this.root.activeElement == this.dom;
			}
			focus() {
				var e, t;
				this.domObserver.stop(),
					this.editable &&
						((e = this.dom).setActive
							? e.setActive()
							: u
								? e.focus(u)
								: ((t = Jn(e)),
									e.focus(
										null == u
											? {
													get preventScroll() {
														return (u = { preventScroll: !0 }), !0;
													}
												}
											: void 0
									),
									u || ((u = !1), Gn(t, 0)))),
					fr(this),
					this.domObserver.start();
			}
			get root() {
				var e = this._root;
				if (null == e)
					for (let e = this.dom.parentNode; e; e = e.parentNode)
						if (9 == e.nodeType || (11 == e.nodeType && e.host))
							return (
								e.getSelection ||
									(Object.getPrototypeOf(e).getSelection = () =>
										e.ownerDocument.getSelection()),
								(this._root = e)
							);
				return e || document;
			}
			posAtCoords(e) {
				return Xn(this, e);
			}
			coordsAtPos(e, t = 1) {
				return Yn(this, e, t);
			}
			domAtPos(e, t = 0) {
				return this.docView.domFromPos(e, t);
			}
			nodeDOM(e) {
				e = this.docView.descAt(e);
				return e ? e.nodeDOM : null;
			}
			posAtDOM(e, t, n = -1) {
				e = this.docView.posFromDOM(e, t, n);
				if (null == e) throw new RangeError("DOM position not inside the editor");
				return e;
			}
			endOfTextblock(e, t) {
				return rr(this, t || this.state, e);
			}
			destroy() {
				if (this.docView) {
					var e,
						t = this;
					for (e in (t.domObserver.stop(), t.input.eventHandlers))
						t.dom.removeEventListener(e, t.input.eventHandlers[e]);
					clearTimeout(t.input.composingTimeout),
						clearTimeout(t.input.lastIOSEnterFallbackTimeout),
						this.destroyPluginViews(),
						this.mounted
							? (this.docView.update(this.state.doc, [], po(this), this),
								(this.dom.textContent = ""))
							: this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
						this.docView.destroy(),
						(this.docView = null);
				}
			}
			get isDestroyed() {
				return null == this.docView;
			}
			dispatchEvent(e) {
				var t;
				Ur((t = this), (e = e)) ||
					!p[e.type] ||
					(!t.editable && e.type in S) ||
					p[e.type](t, e);
			}
			dispatch(e) {
				var t = this._props.dispatchTransaction;
				t ? t.call(this, e) : this.updateState(this.state.apply(e));
			}
			domSelection() {
				return this.root.getSelection();
			}
		}
		function vo(n) {
			let r = Object.create(null);
			return (
				(r.class = "ProseMirror"),
				(r.contenteditable = String(n.editable)),
				(r.translate = "no"),
				n.someProp("attributes", e => {
					if ((e = "function" == typeof e ? e(n.state) : e))
						for (var t in e)
							"class" == t && (r.class += " " + e[t]),
								"style" == t
									? (r.style = (r.style ? r.style + ";" : "") + e[t])
									: r[t] ||
										"contenteditable" == t ||
										"nodeName" == t ||
										(r[t] = String(e[t]));
				}),
				[B0.node(0, n.state.doc.content.size, r)]
			);
		}
		function yo(e) {
			var t;
			e.markCursor
				? (((t = document.createElement("img")).className = "ProseMirror-separator"),
					t.setAttribute("mark-placeholder", "true"),
					t.setAttribute("alt", ""),
					(e.cursorWrapper = {
						dom: t,
						deco: B0.widget(e.state.selection.head, t, { raw: !0, marks: e.markCursor })
					}))
				: (e.cursorWrapper = null);
		}
		function bo(t) {
			return !t.someProp("editable", e => !1 === e(t.state));
		}
		function wo(e) {
			let n = Object.create(null);
			function t(e) {
				for (var t in e) Object.prototype.hasOwnProperty.call(n, t) || (n[t] = e[t]);
			}
			return e.someProp("nodeViews", t), e.someProp("markViews", t), n;
		}
		function ko(e) {
			if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction)
				throw new RangeError(
					"Plugins passed directly to the view must not have a state component"
				);
		}
		for (
			var Te = ye(354),
				xo = ye.n(Te),
				Co = {
					8: "Backspace",
					9: "Tab",
					10: "Enter",
					12: "NumLock",
					13: "Enter",
					16: "Shift",
					17: "Control",
					18: "Alt",
					20: "CapsLock",
					27: "Escape",
					32: " ",
					33: "PageUp",
					34: "PageDown",
					35: "End",
					36: "Home",
					37: "ArrowLeft",
					38: "ArrowUp",
					39: "ArrowRight",
					40: "ArrowDown",
					44: "PrintScreen",
					45: "Insert",
					46: "Delete",
					59: ";",
					61: "=",
					91: "Meta",
					92: "Meta",
					106: "*",
					107: "+",
					108: ",",
					109: "-",
					110: ".",
					111: "/",
					144: "NumLock",
					145: "ScrollLock",
					160: "Shift",
					161: "Shift",
					162: "Control",
					163: "Control",
					164: "Alt",
					165: "Alt",
					173: "-",
					186: ";",
					187: "=",
					188: ",",
					189: "-",
					190: ".",
					191: "/",
					192: "`",
					219: "[",
					220: "\\",
					221: "]",
					222: "'",
					229: "q"
				},
				To = {
					48: ")",
					49: "!",
					50: "@",
					51: "#",
					52: "$",
					53: "%",
					54: "^",
					55: "&",
					56: "*",
					57: "(",
					59: ":",
					61: "+",
					173: "_",
					186: ":",
					187: "+",
					188: "<",
					189: "_",
					190: ">",
					191: "?",
					192: "~",
					219: "{",
					220: "|",
					221: "}",
					222: '"',
					229: "Q"
				},
				xe = "undefined" != typeof navigator && /Chrome\/(\d+)/.exec(navigator.userAgent),
				Mo = "undefined" != typeof navigator && /Apple Computer/.test(navigator.vendor),
				zn = "undefined" != typeof navigator && /Gecko\/\d+/.test(navigator.userAgent),
				Hn = "undefined" != typeof navigator && /Mac/.test(navigator.platform),
				So =
					"undefined" != typeof navigator &&
					/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
				Eo = (xe && (Hn || +xe[1] < 57)) || (zn && Hn),
				No = 0;
			No < 10;
			No++
		)
			Co[48 + No] = Co[96 + No] = String(No);
		for (No = 1; No <= 24; No++) Co[No + 111] = "F" + No;
		for (var Oo, No = 65; No <= 90; No++)
			(Co[No] = String.fromCharCode(No + 32)), (To[No] = String.fromCharCode(No));
		for (Oo in Co) To.hasOwnProperty(Oo) || (To[Oo] = Co[Oo]);
		let ae = "undefined" != typeof navigator && /Mac|iP(hone|[oa]d)/.test(navigator.platform);
		function Do(e) {
			var t,
				n = Object.create(null);
			for (t in e)
				n[
					(e => {
						let t = e.split(/-(?!$)/),
							n = t[t.length - 1];
						"Space" == n && (n = " ");
						let r, o, i, s;
						for (let e = 0; e < t.length - 1; e++) {
							var a = t[e];
							if (/^(cmd|meta|m)$/i.test(a)) s = !0;
							else if (/^a(lt)?$/i.test(a)) r = !0;
							else if (/^(c|ctrl|control)$/i.test(a)) o = !0;
							else if (/^s(hift)?$/i.test(a)) i = !0;
							else {
								if (!/^mod$/i.test(a))
									throw new Error("Unrecognized modifier name: " + a);
								ae ? (s = !0) : (o = !0);
							}
						}
						return (
							r && (n = "Alt-" + n),
							o && (n = "Ctrl-" + n),
							s && (n = "Meta-" + n),
							(n = i ? "Shift-" + n : n)
						);
					})(t)
				] = e[t];
			return n;
		}
		function Ao(e, t, n) {
			return (
				t.altKey && (e = "Alt-" + e),
				t.ctrlKey && (e = "Ctrl-" + e),
				t.metaKey && (e = "Meta-" + e),
				(e = !1 !== n && t.shiftKey ? "Shift-" + e : e)
			);
		}
		function Lo(e) {
			return new b0({
				props: {
					handleKeyDown: (e => {
						let s = Do(e);
						return function (e, t) {
							i = t;
							let n = (i =
									"Down" ==
									(i =
										"Right" ==
										(i =
											"Up" ==
											(i =
												"Left" ==
												(i =
													"Del" ==
													(i =
														"Esc" ==
														(i =
															(!(
																(Eo &&
																	(i.ctrlKey ||
																		i.altKey ||
																		i.metaKey)) ||
																((Mo || So) &&
																	i.shiftKey &&
																	i.key &&
																	1 == i.key.length)
															) &&
																i.key) ||
															(i.shiftKey ? To : Co)[i.keyCode] ||
															i.key ||
															"Unidentified")
															? "Escape"
															: i)
														? "Delete"
														: i)
													? "ArrowLeft"
													: i)
												? "ArrowUp"
												: i)
											? "ArrowRight"
											: i)
										? "ArrowDown"
										: i),
								r = 1 == n.length && " " != n,
								o;
							var i = s[Ao(n, t, !r)];
							if (i && i(e.state, e.dispatch, e)) return !0;
							if (
								r &&
								(t.shiftKey || t.altKey || t.metaKey || 127 < n.charCodeAt(0)) &&
								(o = Co[t.keyCode]) &&
								o != n
							) {
								i = s[Ao(o, t, !0)];
								if (i && i(e.state, e.dispatch, e)) return !0;
							} else if (r && t.shiftKey) {
								i = s[Ao(n, t, !0)];
								if (i && i(e.state, e.dispatch, e)) return !0;
							}
							return !1;
						};
					})(e)
				}
			});
		}
		let e = (e, t) =>
			!e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
		function Io(t, n, r = !1) {
			for (let e = t; e; e = "start" == n ? e.firstChild : e.lastChild) {
				if (e.isTextblock) return 1;
				if (r && 1 != e.childCount) return;
			}
		}
		function Ro(t) {
			if (!t.parent.type.spec.isolating)
				for (let e = t.depth - 1; 0 <= e; e--) {
					if (0 < t.index(e)) return t.doc.resolve(t.before(e + 1));
					if (t.node(e).type.spec.isolating) break;
				}
			return null;
		}
		let le = (e, t, n) => {
			var r = e.selection.$cursor;
			if (
				!r ||
				(n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size)
			)
				return !1;
			n = Po(r);
			if (!n) return !1;
			var o = n.nodeAfter;
			if (Fo(e, n, t)) return !0;
			if (0 == r.parent.content.size && (Io(o, "start") || Qe.isSelectable(o))) {
				var i = Tn(e.doc, r.before(), r.after(), Ke.empty);
				if (i && i.slice.size < i.to - i.from)
					return (
						t &&
							((i = e.tr.step(i)).setSelection(
								Io(o, "start")
									? Ze.findFrom(i.doc.resolve(i.mapping.map(n.pos)), 1)
									: Qe.create(i.doc, i.mapping.map(n.pos))
							),
							t(i.scrollIntoView())),
						!0
					);
			}
			return !(
				!o.isAtom ||
				n.depth != r.depth - 1 ||
				(t && t(e.tr.delete(n.pos, n.pos + o.nodeSize).scrollIntoView()), 0)
			);
		};
		function Po(t) {
			if (!t.parent.type.spec.isolating)
				for (let e = t.depth - 1; 0 <= e; e--) {
					var n = t.node(e);
					if (t.index(e) + 1 < n.childCount) return t.doc.resolve(t.after(e + 1));
					if (n.type.spec.isolating) break;
				}
			return null;
		}
		let ce = (e, t) => {
			var { $head: n, $anchor: r } = e.selection;
			return !(
				!n.parent.type.spec.code ||
				!n.sameParent(r) ||
				(t && t(e.tr.insertText("\n").scrollIntoView()), 0)
			);
		};
		function Bo(t) {
			for (let e = 0; e < t.edgeCount; e++) {
				var n = t.edge(e).type;
				if (n.isTextblock && !n.hasRequiredAttrs()) return n;
			}
			return null;
		}
		let A = (e, t) => {
				var n,
					r,
					{ $head: o, $anchor: i } = e.selection;
				return !(
					!o.parent.type.spec.code ||
					!o.sameParent(i) ||
					((i = o.node(-1)), (r = o.indexAfter(-1)), !(n = Bo(i.contentMatchAt(r)))) ||
					!i.canReplaceWith(r, r, n) ||
					(t &&
						((i = o.after()),
						(r = e.tr.replaceWith(i, i, n.createAndFill())).setSelection(
							Ze.near(r.doc.resolve(i), 1)
						),
						t(r.scrollIntoView())),
					0)
				);
			},
			ue = (n, r) => {
				var { $from: o, $to: i } = n.selection;
				if (n.selection instanceof Qe && n.selection.node.isBlock)
					return !(
						!o.parentOffset ||
						!kn(n.doc, o.pos) ||
						(r && r(n.tr.split(o.pos).scrollIntoView()), 0)
					);
				if (!o.parent.isBlock) return !1;
				if (r) {
					var i = i.parentOffset == i.parent.content.size,
						s = n.tr,
						n =
							((n.selection instanceof Xe || n.selection instanceof f0) &&
								s.deleteSelection(),
							0 == o.depth ? null : Bo(o.node(-1).contentMatchAt(o.indexAfter(-1))));
					let e = i && n ? [{ type: n }] : void 0,
						t = kn(s.doc, s.mapping.map(o.pos), 1, e);
					e ||
						t ||
						!kn(s.doc, s.mapping.map(o.pos), 1, n ? [{ type: n }] : void 0) ||
						(n && (e = [{ type: n }]), (t = !0)),
						t &&
							(s.split(s.mapping.map(o.pos), 1, e),
							i ||
								o.parentOffset ||
								o.parent.type == n ||
								((i = s.mapping.map(o.before())),
								(i = s.doc.resolve(i)),
								n &&
									o.node(-1).canReplaceWith(i.index(), i.index() + 1, n) &&
									s.setNodeMarkup(s.mapping.map(o.before()), n))),
						r(s.scrollIntoView());
				}
				return !0;
			},
			de = (e, t) => (t && t(e.tr.setSelection(new f0(e.doc))), !0);
		function Fo(o, i, s) {
			let a = i.nodeBefore,
				l = i.nodeAfter,
				n,
				e;
			if (!a.type.spec.isolating && !l.type.spec.isolating) {
				if (
					((u = o),
					(c = s),
					(d = (p = i).nodeBefore),
					(r = p.nodeAfter),
					(t = p.index()),
					d &&
						r &&
						d.type.compatibleContent(r.type) &&
						(!d.content.size && p.parent.canReplace(t - 1, t)
							? (c && c(u.tr.delete(p.pos - d.nodeSize, p.pos).scrollIntoView()), 1)
							: p.parent.canReplace(t, t + 1) &&
								(r.isTextblock || xn(u.doc, p.pos)) &&
								(c &&
									c(
										u.tr
											.clearIncompatible(
												p.pos,
												d.type,
												d.contentMatchAt(d.childCount)
											)
											.join(p.pos)
											.scrollIntoView()
									),
								1)))
				)
					return 1;
				var t = i.parent.canReplace(i.index(), i.index() + 1);
				if (
					t &&
					(n = (e = a.contentMatchAt(a.childCount)).findWrapping(l.type)) &&
					e.matchType(n[0] || l.type).validEnd
				) {
					if (s) {
						let e = i.pos + l.nodeSize,
							t = Je.empty;
						for (let e = n.length - 1; 0 <= e; e--) t = Je.from(n[e].create(null, t));
						t = Je.from(a.copy(t));
						var r = o.tr.step(
								new l0(i.pos - 1, e, i.pos, e, new Ke(t, 1, 0), n.length, !0)
							),
							c = e + 2 * n.length;
						xn(r.doc, c) && r.join(c), s(r.scrollIntoView());
					}
					return 1;
				}
				var u = Ze.findFrom(i, 1),
					d = u && u.$from.blockRange(u.$to),
					p = d && vn(d);
				if (null != p && p >= i.depth) return s && s(o.tr.lift(d, p).scrollIntoView()), 1;
				if (t && Io(l, "start", !0) && Io(a, "end")) {
					let e = a,
						n = [];
					for (; n.push(e), !e.isTextblock; ) e = e.lastChild;
					let t = l,
						r = 1;
					for (; !t.isTextblock; t = t.firstChild) r++;
					if (e.canReplace(e.childCount, e.childCount, t.content)) {
						if (s) {
							let t = Je.empty;
							for (let e = n.length - 1; 0 <= e; e--) t = Je.from(n[e].copy(t));
							s(
								o.tr
									.step(
										new l0(
											i.pos - n.length,
											i.pos + l.nodeSize,
											i.pos + r,
											i.pos + l.nodeSize - r,
											new Ke(t, n.length, 0),
											0,
											!0
										)
									)
									.scrollIntoView()
							);
						}
						return 1;
					}
				}
			}
		}
		function Ho(i) {
			return function (e, t) {
				var n = e.selection,
					r = i < 0 ? n.$from : n.$to;
				let o = r.depth;
				for (; r.node(o).isInline; ) {
					if (!o) return !1;
					o--;
				}
				return (
					!!r.node(o).isTextblock &&
					(t && t(e.tr.setSelection(Xe.create(e.doc, i < 0 ? r.start(o) : r.end(o)))), !0)
				);
			};
		}
		function zo(i, s = null) {
			return function (n, e) {
				var { from: t, to: r } = n.selection;
				let o = !1;
				return (
					n.doc.nodesBetween(t, r, (e, t) => {
						if (o) return !1;
						e.isTextblock &&
							!e.hasMarkup(i, s) &&
							(o =
								e.type == i ||
								((t = (e = n.doc.resolve(t)).index()),
								e.parent.canReplaceWith(t, t + 1, i)));
					}),
					!!o && (e && e(n.tr.setBlockType(t, r, i, s).scrollIntoView()), !0)
				);
			};
		}
		function qo(u, d = null) {
			return function (n, e) {
				var { empty: t, $cursor: r, ranges: i } = n.selection;
				if (
					(t && !r) ||
					!((n, r, o) => {
						for (let e = 0; e < r.length; e++) {
							var { $from: i, $to: s } = r[e];
							let t = 0 == i.depth && n.type.allowsMarkType(o);
							if (
								(n.nodesBetween(i.pos, s.pos, e => {
									if (t) return !1;
									t = e.inlineContent && e.type.allowsMarkType(o);
								}),
								t)
							)
								return 1;
						}
					})(n.doc, i, u)
				)
					return !1;
				if (e)
					if (r)
						u.isInSet(n.storedMarks || r.marks())
							? e(n.tr.removeStoredMark(u))
							: e(n.tr.addStoredMark(u.create(d)));
					else {
						let t = !1,
							o = n.tr;
						for (let e = 0; !t && e < i.length; e++) {
							var { $from: s, $to: a } = i[e];
							t = n.doc.rangeHasMark(s.pos, a.pos, u);
						}
						for (let e = 0; e < i.length; e++) {
							var { $from: l, $to: c } = i[e];
							if (t) o.removeMark(l.pos, c.pos, u);
							else {
								let e = l.pos,
									t = c.pos,
									n = l.nodeAfter,
									r = c.nodeBefore;
								(l = n && n.isText ? /^\s*/.exec(n.text)[0].length : 0),
									(c = r && r.isText ? /\s*$/.exec(r.text)[0].length : 0);
								e + l < t && ((e += l), (t -= c)), o.addMark(e, t, u.create(d));
							}
						}
						e(o.scrollIntoView());
					}
				return !0;
			};
		}
		function Vo(...o) {
			return function (t, n, r) {
				for (let e = 0; e < o.length; e++) if (o[e](t, n, r)) return !0;
				return !1;
			};
		}
		(Me = Ho(-1)), (Ce = Ho(1));
		var jo,
			Te = Vo(
				e,
				(e, t, n) => {
					var r = e.selection.$cursor;
					if (!r || (n ? !n.endOfTextblock("backward", e) : 0 < r.parentOffset))
						return !1;
					n = Ro(r);
					if (!n)
						return (
							null != (i = (o = r.blockRange()) && vn(o)) &&
							(t && t(e.tr.lift(o, i).scrollIntoView()), !0)
						);
					var o = n.nodeBefore;
					if (!o.type.spec.isolating && Fo(e, n, t)) return !0;
					if (0 == r.parent.content.size && (Io(o, "end") || Qe.isSelectable(o))) {
						var i = Tn(e.doc, r.before(), r.after(), Ke.empty);
						if (i && i.slice.size < i.to - i.from)
							return (
								t &&
									((i = e.tr.step(i)).setSelection(
										Io(o, "end")
											? Ze.findFrom(
													i.doc.resolve(i.mapping.map(n.pos, -1)),
													-1
												)
											: Qe.create(i.doc, n.pos - o.nodeSize)
									),
									t(i.scrollIntoView())),
								!0
							);
					}
					return !(
						!o.isAtom ||
						n.depth != r.depth - 1 ||
						(t && t(e.tr.delete(n.pos - o.nodeSize, n.pos).scrollIntoView()), 0)
					);
				},
				(e, t, n) => {
					let { $head: r, empty: o } = e.selection,
						i = r;
					if (!o) return !1;
					if (r.parent.isTextblock) {
						if (n ? !n.endOfTextblock("backward", e) : 0 < r.parentOffset) return !1;
						i = Ro(r);
					}
					n = i && i.nodeBefore;
					return !(
						!n ||
						!Qe.isSelectable(n) ||
						(t &&
							t(
								e.tr
									.setSelection(Qe.create(e.doc, i.pos - n.nodeSize))
									.scrollIntoView()
							),
						0)
					);
				}
			),
			xe = Vo(e, le, (e, t, n) => {
				let { $head: r, empty: o } = e.selection,
					i = r;
				if (!o) return !1;
				if (r.parent.isTextblock) {
					if (
						n ? !n.endOfTextblock("forward", e) : r.parentOffset < r.parent.content.size
					)
						return !1;
					i = Po(r);
				}
				n = i && i.nodeAfter;
				return !(
					!n ||
					!Qe.isSelectable(n) ||
					(t && t(e.tr.setSelection(Qe.create(e.doc, i.pos)).scrollIntoView()), 0)
				);
			}),
			$o = {
				Enter: Vo(
					ce,
					(e, t) => {
						var n = e.selection,
							{ $from: r, $to: o } = n;
						return !(
							n instanceof f0 ||
							r.parent.inlineContent ||
							o.parent.inlineContent ||
							!(n = Bo(o.parent.contentMatchAt(o.indexAfter()))) ||
							!n.isTextblock ||
							(t &&
								((r = (!r.parentOffset && o.index() < o.parent.childCount ? r : o)
									.pos),
								(o = e.tr.insert(r, n.createAndFill())).setSelection(
									Xe.create(o.doc, r + 1)
								),
								t(o.scrollIntoView())),
							0)
						);
					},
					(e, t) => {
						var n = e.selection.$cursor;
						if (!n || n.parent.content.size) return !1;
						if (1 < n.depth && n.after() != n.end(-1)) {
							var r = n.before();
							if (kn(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
						}
						(r = n.blockRange()), (n = r && vn(r));
						return null != n && (t && t(e.tr.lift(r, n).scrollIntoView()), !0);
					},
					ue
				),
				"Mod-Enter": A,
				Backspace: Te,
				"Mod-Backspace": Te,
				"Shift-Backspace": Te,
				Delete: xe,
				"Mod-Delete": xe,
				"Mod-a": de
			},
			_o = {
				"Ctrl-h": $o.Backspace,
				"Alt-Backspace": $o["Mod-Backspace"],
				"Ctrl-d": $o.Delete,
				"Ctrl-Alt-Backspace": $o["Mod-Delete"],
				"Alt-Delete": $o["Mod-Delete"],
				"Alt-d": $o["Mod-Delete"],
				"Ctrl-a": Me,
				"Ctrl-e": Ce
			};
		for (jo in $o) _o[jo] = $o[jo];
		let pe = (
			"undefined" != typeof navigator
				? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
				: !("undefined" == typeof os || !os.platform) && "darwin" == os.platform()
		)
			? _o
			: $o;
		class V0 {
			constructor(e, t) {
				var a;
				(this.match = e),
					(this.match = e),
					(this.handler =
						"string" == typeof t
							? ((a = t),
								function (e, t, n, r) {
									let o = a;
									var i, s;
									return (
										t[1] &&
											((i = t[0].lastIndexOf(t[1])),
											(o += t[0].slice(i + t[1].length)),
											0 < (s = (n += i) - r)) &&
											((o = t[0].slice(i - s, i) + o), (n = r)),
										e.tr.insertText(o, n, r)
									);
								})
							: t);
			}
		}
		let he = 500;
		function Uo({ rules: o }) {
			let i = new b0({
				state: {
					init() {
						return null;
					},
					apply(e, t) {
						var n = e.getMeta(this);
						return n || (e.selectionSet || e.docChanged ? null : t);
					}
				},
				props: {
					handleTextInput(e, t, n, r) {
						return Wo(e, t, n, r, o, i);
					},
					handleDOMEvents: {
						compositionend: t => {
							setTimeout(() => {
								var e = t.state.selection.$cursor;
								e && Wo(t, e.pos, e.pos, "", o, i);
							});
						}
					}
				},
				isInputRules: !0
			});
			return i;
		}
		function Wo(t, n, r, o, i, s) {
			if (!t.composing) {
				var a = t.state,
					e = a.doc.resolve(n);
				if (!e.parent.type.spec.code) {
					var l =
						e.parent.textBetween(
							Math.max(0, e.parentOffset - he),
							e.parentOffset,
							null,
							"￼"
						) + o;
					for (let e = 0; e < i.length; e++) {
						var c = i[e].match.exec(l),
							c = c && i[e].handler(a, c, n - (c[0].length - o.length), r);
						if (c)
							return (
								t.dispatch(c.setMeta(s, { transform: c, from: n, to: r, text: o })),
								!0
							);
					}
				}
			}
			return !1;
		}
		let fe = (r, o) => {
			var i = r.plugins;
			for (let n = 0; n < i.length; n++) {
				let e = i[n],
					t;
				if (e.spec.isInputRules && (t = e.getState(r))) {
					if (o) {
						var s,
							a = r.tr,
							l = t.transform;
						for (let e = l.steps.length - 1; 0 <= e; e--)
							a.step(l.steps[e].invert(l.docs[e]));
						t.text
							? ((s = a.doc.resolve(t.from).marks()),
								a.replaceWith(t.from, t.to, r.schema.text(t.text, s)))
							: a.delete(t.from, t.to),
							o(a);
					}
					return !0;
				}
			}
			return !1;
		};
		function Jo() {}
		new V0(/--$/, "—"),
			new V0(/\.\.\.$/, "…"),
			new V0(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, "“"),
			new V0(/"$/, "”"),
			new V0(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, "‘"),
			new V0(/'$/, "’"),
			(Jo.prototype.append = function (e) {
				return e.length
					? ((e = Jo.from(e)),
						(!this.length && e) ||
							(e.length < 200 && this.leafAppend(e)) ||
							(this.length < 200 && e.leafPrepend(this)) ||
							this.appendInner(e))
					: this;
			}),
			(Jo.prototype.prepend = function (e) {
				return e.length ? Jo.from(e).append(this) : this;
			}),
			(Jo.prototype.appendInner = function (e) {
				return new Ko(this, e);
			}),
			(Jo.prototype.slice = function (e, t) {
				return (t = void 0 === t ? this.length : t) <= (e = void 0 === e ? 0 : e)
					? Jo.empty
					: this.sliceInner(Math.max(0, e), Math.min(this.length, t));
			}),
			(Jo.prototype.get = function (e) {
				if (!(e < 0 || e >= this.length)) return this.getInner(e);
			}),
			(Jo.prototype.forEach = function (e, t, n) {
				(t = void 0 === t ? 0 : t) <= (n = void 0 === n ? this.length : n)
					? this.forEachInner(e, t, n, 0)
					: this.forEachInvertedInner(e, t, n, 0);
			}),
			(Jo.prototype.map = function (n, e, t) {
				void 0 === t && (t = this.length);
				var r = [];
				return (
					this.forEach(
						function (e, t) {
							return r.push(n(e, t));
						},
						(e = void 0 === e ? 0 : e),
						t
					),
					r
				);
			}),
			(Jo.from = function (e) {
				return e instanceof Jo ? e : e && e.length ? new Go(e) : Jo.empty;
			});
		var Go = (t => {
				function n(e) {
					t.call(this), (this.values = e);
				}
				t && (n.__proto__ = t);
				var e = { length: { configurable: !0 }, depth: { configurable: !0 } };
				return (
					(((n.prototype = Object.create(t && t.prototype)).constructor =
						n).prototype.flatten = function () {
						return this.values;
					}),
					(n.prototype.sliceInner = function (e, t) {
						return 0 == e && t == this.length ? this : new n(this.values.slice(e, t));
					}),
					(n.prototype.getInner = function (e) {
						return this.values[e];
					}),
					(n.prototype.forEachInner = function (e, t, n, r) {
						for (var o = t; o < n; o++) if (!1 === e(this.values[o], r + o)) return !1;
					}),
					(n.prototype.forEachInvertedInner = function (e, t, n, r) {
						for (var o = t - 1; n <= o; o--)
							if (!1 === e(this.values[o], r + o)) return !1;
					}),
					(n.prototype.leafAppend = function (e) {
						if (this.length + e.length <= 200)
							return new n(this.values.concat(e.flatten()));
					}),
					(n.prototype.leafPrepend = function (e) {
						if (this.length + e.length <= 200)
							return new n(e.flatten().concat(this.values));
					}),
					(e.length.get = function () {
						return this.values.length;
					}),
					(e.depth.get = function () {
						return 0;
					}),
					Object.defineProperties(n.prototype, e),
					n
				);
			})(Jo),
			Ko =
				((Jo.empty = new Go([])),
				(n => {
					function t(e, t) {
						n.call(this),
							(this.left = e),
							(this.right = t),
							(this.length = e.length + t.length),
							(this.depth = Math.max(e.depth, t.depth) + 1);
					}
					return (
						n && (t.__proto__ = n),
						(((t.prototype = Object.create(n && n.prototype)).constructor =
							t).prototype.flatten = function () {
							return this.left.flatten().concat(this.right.flatten());
						}),
						(t.prototype.getInner = function (e) {
							return e < this.left.length
								? this.left.get(e)
								: this.right.get(e - this.left.length);
						}),
						(t.prototype.forEachInner = function (e, t, n, r) {
							var o = this.left.length;
							return (
								!(
									(t < o &&
										!1 === this.left.forEachInner(e, t, Math.min(n, o), r)) ||
									(o < n &&
										!1 ===
											this.right.forEachInner(
												e,
												Math.max(t - o, 0),
												Math.min(this.length, n) - o,
												r + o
											))
								) && void 0
							);
						}),
						(t.prototype.forEachInvertedInner = function (e, t, n, r) {
							var o = this.left.length;
							return (
								!(
									(o < t &&
										!1 ===
											this.right.forEachInvertedInner(
												e,
												t - o,
												Math.max(n, o) - o,
												r + o
											)) ||
									(n < o &&
										!1 ===
											this.left.forEachInvertedInner(e, Math.min(t, o), n, r))
								) && void 0
							);
						}),
						(t.prototype.sliceInner = function (e, t) {
							var n;
							return 0 == e && t == this.length
								? this
								: t <= (n = this.left.length)
									? this.left.slice(e, t)
									: n <= e
										? this.right.slice(e - n, t - n)
										: this.left.slice(e, n).append(this.right.slice(0, t - n));
						}),
						(t.prototype.leafAppend = function (e) {
							e = this.right.leafAppend(e);
							if (e) return new t(this.left, e);
						}),
						(t.prototype.leafPrepend = function (e) {
							e = this.left.leafPrepend(e);
							if (e) return new t(e, this.right);
						}),
						(t.prototype.appendInner = function (e) {
							return this.left.depth >= Math.max(this.right.depth, e.depth) + 1
								? new t(this.left, new t(this.right, e))
								: new t(this, e);
						}),
						t
					);
				})(Jo)),
			Zo = Jo;
		class j0 {
			constructor(e, t) {
				(this.items = e), (this.eventCount = t);
			}
			popEvent(e, t) {
				if (0 == this.eventCount) return null;
				let r = this.items.length;
				for (; ; r--)
					if (this.items.get(r - 1).selection) {
						--r;
						break;
					}
				let o,
					i,
					s =
						(t && ((o = this.remapping(r, this.items.length)), (i = o.maps.length)),
						e.tr),
					a,
					l,
					c = [],
					u = [];
				return (
					this.items.forEach(
						(n, e) => {
							if (n.step) {
								if (o) {
									u.push(new $0(n.map));
									let e = n.step.map(o.slice(i)),
										t;
									e &&
										s.maybeStep(e).doc &&
										((t = s.mapping.maps[s.mapping.maps.length - 1]),
										c.push(new $0(t, void 0, void 0, c.length + u.length))),
										i--,
										t && o.appendMap(t, i);
								} else s.maybeStep(n.step);
								return n.selection
									? ((a = o ? n.selection.map(o.slice(i)) : n.selection),
										(l = new j0(
											this.items.slice(0, r).append(u.reverse().concat(c)),
											this.eventCount - 1
										)),
										!1)
									: void 0;
							}
							o || ((o = this.remapping(r, e + 1)), (i = o.maps.length)),
								i--,
								u.push(n);
						},
						this.items.length,
						0
					),
					{ remaining: l, transform: s, selection: a }
				);
			}
			addTransform(r, o, e, i) {
				let s = [],
					a = this.eventCount,
					l = this.items,
					c = !i && l.length ? l.get(l.length - 1) : null;
				for (let n = 0; n < r.steps.length; n++) {
					var u = r.steps[n].invert(r.docs[n]);
					let e = new $0(r.mapping.maps[n], u, o),
						t;
					(t = c && c.merge(e)) &&
						((e = t), n ? s.pop() : (l = l.slice(0, l.length - 1))),
						s.push(e),
						o && (a++, (o = void 0)),
						i || (c = e);
				}
				e = a - e.depth;
				return (
					e > me &&
						((l = ((e, n) => {
							let r;
							return (
								e.forEach((e, t) => {
									if (e.selection && 0 == n--) return (r = t), !1;
								}),
								e.slice(r)
							);
						})(l, e)),
						(a -= e)),
					new j0(l.append(s), a)
				);
			}
			remapping(n, e) {
				let r = new n0();
				return (
					this.items.forEach(
						(e, t) => {
							t =
								null != e.mirrorOffset && t - e.mirrorOffset >= n
									? r.maps.length - e.mirrorOffset
									: void 0;
							r.appendMap(e.map, t);
						},
						n,
						e
					),
					r
				);
			}
			addMaps(e) {
				return 0 == this.eventCount
					? this
					: new j0(this.items.append(e.map(e => new $0(e))), this.eventCount);
			}
			rebased(o, t) {
				if (!this.eventCount) return this;
				let i = [],
					e = Math.max(0, this.items.length - t),
					s = o.mapping,
					a = o.steps.length,
					l = this.eventCount,
					c =
						(this.items.forEach(e => {
							e.selection && l--;
						}, e),
						t);
				this.items.forEach(e => {
					var t,
						n,
						r = s.getMirror(--c);
					null != r &&
						((a = Math.min(a, r)),
						(t = s.maps[r]),
						e.step
							? ((n = o.steps[r].invert(o.docs[r])),
								(e = e.selection && e.selection.map(s.slice(c + 1, r))) && l++,
								i.push(new $0(t, n, e)))
							: i.push(new $0(t)));
				}, e);
				var n = [];
				for (let e = t; e < a; e++) n.push(new $0(s.maps[e]));
				t = this.items.slice(0, e).append(n).append(i);
				let r = new j0(t, l);
				return (r =
					500 < r.emptyItemCount() ? r.compress(this.items.length - i.length) : r);
			}
			emptyItemCount() {
				let t = 0;
				return (
					this.items.forEach(e => {
						e.step || t++;
					}),
					t
				);
			}
			compress(o = this.items.length) {
				let i = this.remapping(0, o),
					s = i.maps.length,
					a = [],
					l = 0;
				return (
					this.items.forEach(
						(e, t) => {
							var n, r;
							o <= t
								? (a.push(e), e.selection && l++)
								: e.step
									? ((n = (t = e.step.map(i.slice(s))) && t.getMap()),
										s--,
										n && i.appendMap(n, s),
										t &&
											((r = e.selection && e.selection.map(i.slice(s))) &&
												l++,
											(n = new $0(n.invert(), t, r)),
											(t = a.length - 1),
											(r = a.length && a[t].merge(n))
												? (a[t] = r)
												: a.push(n)))
									: e.map && s--;
						},
						this.items.length,
						0
					),
					new j0(Zo.from(a.reverse()), l)
				);
			}
		}
		j0.empty = new j0(Zo.empty, 0);
		class $0 {
			constructor(e, t, n, r) {
				(this.map = e), (this.step = t), (this.selection = n), (this.mirrorOffset = r);
			}
			merge(e) {
				if (this.step && e.step && !e.selection) {
					e = e.step.merge(this.step);
					if (e) return new $0(e.getMap().invert(), e, this.selection);
				}
			}
		}
		class _0 {
			constructor(e, t, n, r) {
				(this.done = e), (this.undone = t), (this.prevRanges = n), (this.prevTime = r);
			}
		}
		let me = 20;
		function Xo(e, t, n, r) {
			var o = n.getMeta(I);
			if (o) return o.historyState;
			n.getMeta(ve) && (e = new _0(e.done, e.undone, null, 0));
			var i,
				o = n.getMeta("appendedTransaction");
			return 0 == n.steps.length
				? e
				: o && o.getMeta(I)
					? o.getMeta(I).redo
						? new _0(
								e.done.addTransform(n, void 0, r, ti(t)),
								e.undone,
								Qo(n.mapping.maps[n.steps.length - 1]),
								e.prevTime
							)
						: new _0(
								e.done,
								e.undone.addTransform(n, void 0, r, ti(t)),
								null,
								e.prevTime
							)
					: !1 === n.getMeta("addToHistory") || (o && !1 === o.getMeta("addToHistory"))
						? (i = n.getMeta("rebased"))
							? new _0(
									e.done.rebased(n, i),
									e.undone.rebased(n, i),
									Yo(e.prevRanges, n.mapping),
									e.prevTime
								)
							: new _0(
									e.done.addMaps(n.mapping.maps),
									e.undone.addMaps(n.mapping.maps),
									Yo(e.prevRanges, n.mapping),
									e.prevTime
								)
						: ((i =
								0 == e.prevTime ||
								(!o &&
									(e.prevTime < (n.time || 0) - r.newGroupDelay ||
										!((e, o) => {
											if (o) {
												if (!e.docChanged) return 1;
												let r = !1;
												return (
													e.mapping.maps[0].forEach((t, n) => {
														for (let e = 0; e < o.length; e += 2)
															t <= o[e + 1] && n >= o[e] && (r = !0);
													}),
													r
												);
											}
										})(n, e.prevRanges)))),
							(o = o
								? Yo(e.prevRanges, n.mapping)
								: Qo(n.mapping.maps[n.steps.length - 1])),
							new _0(
								e.done.addTransform(
									n,
									i ? t.selection.getBookmark() : void 0,
									r,
									ti(t)
								),
								j0.empty,
								o,
								n.time
							));
		}
		function Qo(e) {
			let o = [];
			return e.forEach((e, t, n, r) => o.push(n, r)), o;
		}
		function Yo(t, n) {
			if (!t) return null;
			var r = [];
			for (let e = 0; e < t.length; e += 2) {
				var o = n.map(t[e], 1),
					i = n.map(t[e + 1], -1);
				o <= i && r.push(o, i);
			}
			return r;
		}
		function ei(e, t, n, r) {
			var o,
				i = ti(t),
				s = I.get(t).spec.config,
				a = (r ? e.undone : e.done).popEvent(t, i);
			a &&
				((o = a.selection.resolve(a.transform.doc)),
				(e = (r ? e.done : e.undone).addTransform(
					a.transform,
					t.selection.getBookmark(),
					s,
					i
				)),
				(t = new _0(r ? e : a.remaining, r ? a.remaining : e, null, 0)),
				n(
					a.transform
						.setSelection(o)
						.setMeta(I, { redo: r, historyState: t })
						.scrollIntoView()
				));
		}
		let L = !1,
			ge = null;
		function ti(e) {
			var t = e.plugins;
			if (ge != t) {
				(L = !1), (ge = t);
				for (let e = 0; e < t.length; e++)
					if (t[e].spec.historyPreserveItems) {
						L = !0;
						break;
					}
			}
			return L;
		}
		let I = new w0("history"),
			ve = new w0("closeHistory");
		function ni(r = {}) {
			return (
				(r = { depth: r.depth || 100, newGroupDelay: r.newGroupDelay || 500 }),
				new b0({
					key: I,
					state: {
						init() {
							return new _0(j0.empty, j0.empty, null, 0);
						},
						apply(e, t, n) {
							return Xo(t, n, e, r);
						}
					},
					config: r,
					props: {
						handleDOMEvents: {
							beforeinput(e, t) {
								var n = t.inputType,
									n = "historyUndo" == n ? R : "historyRedo" == n ? P : null;
								return !!n && (t.preventDefault(), n(e.state, e.dispatch));
							}
						}
					}
				})
			);
		}
		let R = (e, t) => {
				var n = I.getState(e);
				return !(!n || 0 == n.done.eventCount || (t && ei(n, e, t, !1), 0));
			},
			P = (e, t) => {
				var n = I.getState(e);
				return !(!n || 0 == n.undone.eventCount || (t && ei(n, e, t, !0), 0));
			};
		function ri(e, t) {
			var n = e.nodes.paragraph;
			return t ? n.create(null, Rt()(t) ? e.text(t) : t) : n.createAndFill();
		}
		function oi(e, t, n) {
			return e.text(t, n);
		}
		function Se(e, t, n) {
			void 0 === n && (n = t);
			var r = e.doc.content.size,
				r = 0 < r ? r - 1 : 1;
			return Xe.create(e.doc, Math.min(t, r), Math.min(n, r));
		}
		function ii(e, t, n) {
			t = t.pos;
			return e.replaceWith(t, t, ri(n)), e.setSelection(Se(e, t + 1));
		}
		function si(e) {
			for (
				var t = e.state,
					n = e.from,
					r = e.endIndex,
					o = e.createText,
					i = t.tr,
					s = t.doc,
					a = t.schema,
					l = e.startIndex;
				l <= r;
				l += 1
			) {
				var c = s.child(l),
					u = c.nodeSize,
					d = c.content,
					c = o(c.textContent),
					c = c ? oi(a, c) : Je.empty,
					p = i.mapping.map(n),
					d = p + d.size;
				i.replaceWith(p, d, c), (n += u);
			}
			return i;
		}
		function ai(e, t, n, r) {
			n = n.length;
			e.split(t)
				.delete(t - n, t)
				.insert(e.mapping.map(t), r)
				.setSelection(Se(e, e.mapping.map(t) - n));
		}
		function li(e) {
			return e.sourcepos[0][0];
		}
		function ci(e) {
			return e.sourcepos[1][0];
		}
		function ui(e) {
			return e.sourcepos[0][1];
		}
		function di(e) {
			return e.sourcepos[1][1];
		}
		function pi(e) {
			return e && ("item" === e.type || "list" === e.type);
		}
		function hi(e) {
			return pi(e) && "ordered" === e.listData.type;
		}
		function fi(e) {
			return e && ("tableCell" === e.type || "tableDelimCell" === e.type);
		}
		function mi(e, t, n) {
			for (e = (n = void 0 === n ? !0 : n) ? e : e.parent; e && "document" !== e.type; ) {
				if (t(e)) return e;
				e = e.parent;
			}
			return null;
		}
		function Ee(e, t) {
			return [e[0], e[1] + t];
		}
		function gi(e, t) {
			return [e[0], t];
		}
		function vi(e) {
			for (var t = [], n = e.walker(); (r = n.next()); ) {
				var r = r.node;
				"text" === r.type && t.push(r.literal);
			}
			return t.join("");
		}
		var yi = [],
			bi = {},
			wi = /\$\$widget\d+\s/;
		function ki(e) {
			var t,
				n = e.search(wi);
			return (
				-1 !== n &&
					((t = e.substring(n).replace(wi, "").replace("$$", "")),
					(e = e.substring(0, n)),
					(e += ki(t))),
				e
			);
		}
		function xi(e, t) {
			return "$$" + e + " " + t + "$$";
		}
		function Ci(e, t) {
			var e = bi[e],
				n = e.rule,
				e = e.toDOM,
				n = ki(t).match(n);
			return e((t = n ? n[0] : t));
		}
		function Ti(e, t, n, r) {
			return e.concat(Mi(t, n, r));
		}
		function Mi(e, t, n) {
			var r = [],
				o = (yi[(n = void 0 === n ? 0 : n)] || {}).rule,
				i = n + 1;
			if (((e = ki(e)), o && o.test(e))) {
				for (; -1 !== (a = e.search(o)); ) {
					var s = e.substring(0, a),
						s = (s && (r = Ti(r, s, t, i)), (e = e.substring(a)).match(o)[0]),
						a = "widget" + n;
					r.push(t.nodes.widget.create({ info: a }, t.text(xi(a, s)))),
						(e = e.substring(s.length));
				}
				e && (r = Ti(r, e, t, i));
			} else e && (r = n < yi.length - 1 ? Ti(r, e, t, i) : [t.text(e)]);
			return r;
		}
		function Si(e) {
			for (var t, n = "", r = e.walker(); (t = r.next()); ) {
				var o = t.node;
				t.entering &&
					(o !== e && "text" !== o.type
						? ((n += (e => {
								var t = e.firstChild.literal;
								switch (e.type) {
									case "emph":
										return "*" + t + "*";
									case "strong":
										return "**" + t + "**";
									case "strike":
										return "~~" + t + "~~";
									case "code":
										return "`" + t + "`";
									case "link":
									case "image":
										var n = e.destination,
											r = e.title;
										return (
											("link" === e.type ? "" : "!") +
											"[" +
											t +
											"](" +
											n +
											(r ? ' "' + r + '"' : "") +
											")"
										);
									default:
										return null;
								}
							})(o)),
							r.resumeAt(e, !1),
							r.next())
						: "text" === o.type && (n += o.literal));
			}
			return n;
		}
		function Ei() {
			return {
				deleteSelection: function () {
					return e;
				},
				selectAll: function () {
					return de;
				},
				undo: function () {
					return R;
				},
				redo: function () {
					return P;
				}
			};
		}
		var zn = ye(322),
			Ni = ye.n(zn),
			Hn = ye(714),
			Oi = ye.n(Hn),
			Te = ye(471),
			Di = ye.n(Te),
			Ai =
				"(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)",
			Li = "<(" + (xe = "[A-Za-z][A-Za-z0-9-]*") + ")(" + Ai + ")*\\s*/?>",
			Ii = "(?:" + Li + "|</([A-Za-z][A-Za-z0-9-]*)\\s*[>])",
			Ri = new RegExp("^" + Ii, "i"),
			Pi = /<br\s*\/*>/i,
			Bi = /<! ---->|<!--(?:-?[^>-])(?:-?[^-])*-->/,
			Fi = "</p><p>";
		function Hi(e, t, n) {
			var r = parseInt(e.left, 10),
				o = parseInt(e.top, 10),
				i =
					parseInt(e.width, 10) +
					parseInt(e.paddingLeft, 10) +
					parseInt(e.paddingRight, 10),
				e =
					parseInt(e.height, 10) +
					parseInt(e.paddingTop, 10) +
					parseInt(e.paddingBottom, 10);
			return r <= t && t <= r + i && o <= n && n <= o + e;
		}
		var zi = "toastui-editor-";
		function Ne() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			for (var n = [], r = 0, o = e; r < o.length; r++) {
				var i = o[r],
					s = void 0;
				(s = Array.isArray(i) ? (i[0] ? i[1] : null) : i) && n.push("" + zi + s);
			}
			return n.join(" ");
		}
		function Oe() {
			for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
			return e
				.map(function (e) {
					return zi + "md-" + e;
				})
				.join(" ");
		}
		function qi(e) {
			return e && e.nodeType === Node.ELEMENT_NODE;
		}
		function Vi(e) {
			e.parentNode && e.parentNode.removeChild(e);
		}
		function ji(e, t, n) {
			((n = Bt()(n) ? !Oi()(e, t) : n) ? Lt : It)()(e, t);
		}
		function $i(e, t) {
			var n = document.createElement("div"),
				e = (Rt()(e) ? (n.innerHTML = e) : n.appendChild(e), n.firstChild);
			return t && t.appendChild(e), e;
		}
		function _i(e) {
			var n = window.getComputedStyle(e);
			return (
				["margin-left", "margin-right"].reduce(function (e, t) {
					return e + parseInt(n.getPropertyValue(t), 10);
				}, 0) + e.offsetWidth
			);
		}
		function Ui(e, t) {
			for (
				var n = Rt()(t)
					? function (e) {
							return Di()(e, t);
						}
					: function (e) {
							return e === t;
						};
				e && e !== document;

			) {
				if (qi(e) && n(e)) return e;
				e = e.parentNode;
			}
			return null;
		}
		function Wi(e, t) {
			for (
				var n = 0, r = 0;
				e &&
				e !== t &&
				((n += e.offsetTop), (r += e.offsetLeft), e.offsetParent !== t.offsetParent);

			)
				e = e.offsetParent;
			return { offsetTop: n, offsetLeft: r };
		}
		function Ji(t, n) {
			Object.keys(t).forEach(function (e) {
				rn(t[e]) ? n.removeAttribute(e) : n.setAttribute(e, t[e]);
			});
		}
		function Gi(e) {
			return e
				.replace(/<img class="ProseMirror-separator" alt="">/g, "")
				.replace(/ class="ProseMirror-trailingBreak"/g, "");
		}
		var Ki = new w0("widget"),
			Zi =
				((Xi.prototype.update = function (e) {
					var t,
						n,
						r,
						o,
						i,
						s = Ki.getState(e.state);
					this.removeWidget(),
						s &&
							((t = s.node),
							(n = s.style),
							(o = (s = e.coordsAtPos(s.pos)).top),
							(r = s.left),
							(s = s.bottom - o),
							(i = o - (o = this.rootEl.getBoundingClientRect()).top),
							At()(t, { opacity: "0" }),
							this.rootEl.appendChild(t),
							At()(t, {
								position: "absolute",
								left: r - o.left + 5 + "px",
								top: ("bottom" === n ? i + s - 5 : i - s) + "px",
								opacity: "1"
							}),
							(this.popup = t),
							e.focus());
				}),
				(Xi.prototype.destroy = function () {
					this.eventEmitter.removeEventHandler("blur", this.removeWidget);
				}),
				Xi);
		function Xi(e, t) {
			var n = this;
			(this.popup = null),
				(this.removeWidget = function () {
					n.popup && (n.rootEl.removeChild(n.popup), (n.popup = null));
				}),
				(this.rootEl = e.dom.parentElement),
				(this.eventEmitter = t),
				this.eventEmitter.listen("blur", this.removeWidget),
				this.eventEmitter.listen("loadUI", function () {
					n.rootEl = Ui(e.dom.parentElement, "." + Ne("defaultUI"));
				}),
				this.eventEmitter.listen("removePopupWidget", this.removeWidget);
		}
		var Me = ye(893),
			Qi = ye.n(Me);
		function Yi(n, r, e) {
			n.emit(
				"addImageBlobHook",
				r,
				function (e, t) {
					n.emit("command", "addImage", { imageUrl: e, altText: t || r.name || "image" });
				},
				e
			);
		}
		function es(e) {
			e = xo()(e).filter(function (e) {
				return -1 !== e.type.indexOf("image");
			});
			if (1 === e.length) {
				e = e[0];
				if (e) return e.getAsFile();
			}
			return null;
		}
		function ts() {}
		function ns(e) {
			var t = document.createElement("span"),
				e = Ci(e.attrs.info, e.textContent);
			return (t.className = "tui-widget"), t.appendChild(e), { dom: t };
		}
		function rs(e) {
			return "widget" === e.type.name;
		}
		Object.defineProperty(ts.prototype, "type", {
			get: function () {
				return "node";
			},
			enumerable: !1,
			configurable: !0
		}),
			(ts.prototype.setContext = function (e) {
				this.context = e;
			}),
			be(as, (is = Ce = ts)),
			Object.defineProperty(as.prototype, "name", {
				get: function () {
					return "widget";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(as.prototype, "schema", {
				get: function () {
					return {
						attrs: { info: { default: null } },
						group: "inline",
						inline: !0,
						content: "text*",
						selectable: !1,
						atom: !0,
						toDOM: function () {
							return ["span", { class: "tui-widget" }, 0];
						},
						parseDOM: [
							{
								tag: "span.tui-widget",
								getAttrs: function (e) {
									return { info: e.textContent.match(/\$\$(widget\d+)/)[1] };
								}
							}
						]
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var is,
			ss = as;
		function as() {
			return (null !== is && is.apply(this, arguments)) || this;
		}
		function De(e) {
			(this.timer = null),
				(this.el = document.createElement("div")),
				(this.el.className = "toastui-editor"),
				(this.eventEmitter = e),
				(this.placeholder = { text: "" });
		}
		(De.prototype.createState = function () {
			return y0.create({ schema: this.schema, plugins: this.createPlugins() });
		}),
			(De.prototype.initEvent = function () {
				var e = this.eventEmitter,
					t = this.view,
					n = this.editorType;
				t.dom.addEventListener("focus", function () {
					return e.emit("focus", n);
				}),
					t.dom.addEventListener("blur", function () {
						return e.emit("blur", n);
					});
			}),
			(De.prototype.emitChangeEvent = function (e) {
				this.eventEmitter.emit("caretChange", this.editorType),
					e.docChanged && this.eventEmitter.emit("change", this.editorType);
			}),
			Object.defineProperty(De.prototype, "defaultPlugins", {
				get: function () {
					var r,
						t,
						n,
						e = this.createInputRules(),
						o = nt(nt([], this.keymaps), [
							Lo(we({ "Shift-Enter": pe.Enter }, pe)),
							ni(),
							((n = this.placeholder),
							new b0({
								props: {
									decorations: function (e) {
										var t,
											e = e.doc;
										return n.text &&
											1 === e.childCount &&
											e.firstChild.isTextblock &&
											0 === e.firstChild.content.size
											? ((t = document.createElement("span")),
												Lt()(t, "placeholder"),
												n.className && Lt()(t, n.className),
												(t.textContent = n.text),
												Ye.create(e, [B0.widget(1, t)]))
											: null;
									}
								}
							})),
							((t = this.eventEmitter),
							new b0({
								key: Ki,
								state: {
									init: function () {
										return null;
									},
									apply: function (e) {
										return e.getMeta("widget");
									}
								},
								view: function (e) {
									return new Zi(e, t);
								}
							})),
							((o = this.context),
							(r = o.eventEmitter),
							new b0({
								props: {
									handleDOMEvents: {
										drop: function (e, t) {
											var n = null == (n = t.dataTransfer) ? void 0 : n.files;
											return (
												n &&
													Qi()(n, function (e) {
														return (
															-1 === e.type.indexOf("image") ||
															(t.preventDefault(),
															t.stopPropagation(),
															Yi(r, e, t.type),
															!1)
														);
													}),
												!0
											);
										}
									}
								}
							}))
						]);
					return e ? o.concat(e) : o;
				},
				enumerable: !1,
				configurable: !0
			}),
			(De.prototype.createInputRules = function () {
				var e = yi.map(function (e) {
					var a = e.rule;
					return new V0(a, function (e, t, n, r) {
						var o = e.schema,
							i = e.tr,
							e = e.doc,
							t = t.input.match(new RegExp(a, "g")),
							e = e.resolve(n),
							n = e.parent,
							s = 0;
						return (
							(n = rs(n) ? e.node(e.depth - 1) : n).forEach(function (e) {
								return rs(e) && (s += 1);
							}),
							t.length > s
								? ((n = Mi((e = sn(t)), o)), i.replaceWith(r - e.length + 1, r, n))
								: null
						);
					});
				});
				return e.length ? Uo({ rules: e }) : null;
			}),
			(De.prototype.clearTimer = function () {
				this.timer && (clearTimeout(this.timer), (this.timer = null));
			}),
			(De.prototype.createSchema = function () {
				return new Ky({ nodes: this.specs.nodes, marks: this.specs.marks });
			}),
			(De.prototype.createKeymaps = function (e) {
				var t = Ei(),
					n = t.undo,
					t = t.redo,
					r = this.specs.keymaps(e),
					n = { "Mod-z": n(), "Shift-Mod-z": t() };
				return e ? r.concat(Lo(n)) : r;
			}),
			(De.prototype.createCommands = function () {
				return this.specs.commands(this.view);
			}),
			(De.prototype.createPluginProps = function () {
				var t = this;
				return this.extraPlugins.map(function (e) {
					return e(t.eventEmitter);
				});
			}),
			(De.prototype.focus = function () {
				var e = this;
				this.clearTimer(),
					(this.timer = setTimeout(function () {
						e.view.focus(), e.view.dispatch(e.view.state.tr.scrollIntoView());
					}));
			}),
			(De.prototype.blur = function () {
				this.view.dom.blur();
			}),
			(De.prototype.destroy = function () {
				var t = this;
				this.clearTimer(),
					this.view.destroy(),
					Object.keys(this).forEach(function (e) {
						delete t[e];
					});
			}),
			(De.prototype.moveCursorToStart = function (e) {
				var t = this.view.state.tr;
				this.view.dispatch(t.setSelection(Se(t, 1)).scrollIntoView()), e && this.focus();
			}),
			(De.prototype.moveCursorToEnd = function (e) {
				var t = this.view.state.tr;
				this.view.dispatch(t.setSelection(Se(t, t.doc.content.size - 1)).scrollIntoView()),
					e && this.focus();
			}),
			(De.prototype.setScrollTop = function (e) {
				this.view.dom.scrollTop = e;
			}),
			(De.prototype.getScrollTop = function () {
				return this.view.dom.scrollTop;
			}),
			(De.prototype.setPlaceholder = function (e) {
				(this.placeholder.text = e),
					this.view.dispatch(this.view.state.tr.scrollIntoView());
			}),
			(De.prototype.setHeight = function (e) {
				At()(this.el, { height: e + "px" });
			}),
			(De.prototype.setMinHeight = function (e) {
				At()(this.el, { minHeight: e + "px" });
			}),
			(De.prototype.getElement = function () {
				return this.el;
			});
		var zn = De,
			Hn = ye(294),
			ls = ye.n(Hn),
			cs = [
				"Enter",
				"Shift-Enter",
				"Mod-Enter",
				"Tab",
				"Shift-Tab",
				"Delete",
				"Backspace",
				"Mod-Delete",
				"Mod-Backspace",
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"Mod-d",
				"Mod-D",
				"Alt-ArrowUp",
				"Alt-ArrowDown"
			];
		function us(e, t, n) {
			return e.focus(), t(n)(e.state, e.dispatch, e);
		}
		function ds(e) {
			this.specs = e;
		}
		Object.defineProperty(ds.prototype, "nodes", {
			get: function () {
				return this.specs
					.filter(function (e) {
						return "node" === e.type;
					})
					.reduce(function (e, t) {
						var n = t.name,
							t = t.schema;
						return we(we({}, e), (((e = {})[n] = t), e));
					}, {});
			},
			enumerable: !1,
			configurable: !0
		}),
			Object.defineProperty(ds.prototype, "marks", {
				get: function () {
					return this.specs
						.filter(function (e) {
							return "mark" === e.type;
						})
						.reduce(function (e, t) {
							var n = t.name,
								t = t.schema;
							return we(we({}, e), (((e = {})[n] = t), e));
						}, {});
				},
				enumerable: !1,
				configurable: !0
			}),
			(ds.prototype.commands = function (o, n) {
				var e = this.specs
						.filter(function (e) {
							return e.commands;
						})
						.reduce(function (e, t) {
							var n = {},
								r = t.commands();
							return (
								ls()(r)
									? (n[t.name] = function (e) {
											return us(o, r, e);
										})
									: Object.keys(r).forEach(function (t) {
											n[t] = function (e) {
												return us(o, r[t], e);
											};
										}),
								we(we({}, e), n)
							);
						}, {}),
					r = Ei();
				return (
					Object.keys(r).forEach(function (t) {
						e[t] = function (e) {
							return us(o, r[t], e);
						};
					}),
					n &&
						Object.keys(n).forEach(function (t) {
							e[t] = function (e) {
								return us(o, n[t], e);
							};
						}),
					e
				);
			}),
			(ds.prototype.keymaps = function (e) {
				return this.specs
					.filter(function (e) {
						return e.keymaps;
					})
					.map(function (e) {
						return e.keymaps();
					})
					.map(function (t) {
						return (
							e ||
								Object.keys(t).forEach(function (e) {
									Zt(cs, e) || delete t[e];
								}),
							Lo(t)
						);
					});
			}),
			(ds.prototype.setContext = function (t) {
				this.specs.forEach(function (e) {
					e.setContext(t);
				});
			});
		var ps = ds;
		function hs(e) {
			var t = e.from,
				n = e.to;
			return e instanceof f0 ? [t + 1, n - 1] : [t, n];
		}
		function fs(e) {
			return e.index(0) + 1;
		}
		function ms(e, n, r) {
			void 0 === r && (r = 1);
			var o = 0;
			return (
				e.forEach(function (e, t) {
					rs(e) && t + 2 < n && (o += 2 * r);
				}),
				o
			);
		}
		function gs(e, t, n) {
			var r = t === (n = void 0 === n ? t : n),
				o = e.resolve(t),
				i = fs(o),
				s = i,
				o = o.start(1),
				a = o,
				r =
					(r ||
						((a = (r = e.resolve(n === e.content.size ? n - 1 : n)).start(1)),
						(s = fs(r)),
						r.pos === e.content.size && (n = e.content.size - 2)),
					Math.max(t - o + 1, 1)),
				t = Math.max(n - a + 1, 1);
			return [
				[i, r + ms(e.child(i - 1), r, -1)],
				[s, t + ms(e.child(s - 1), t, -1)]
			];
		}
		function vs(e, t) {
			for (var n = [], r = 0, o = 0; r < t; r += 1) {
				var i = e.child(r);
				(n[r] = o), (o += i.nodeSize);
			}
			return n;
		}
		function ys(e, t, n) {
			var r = vs(e, n[0]),
				o = t[0] - 1,
				i = n[0] - 1,
				s = e.child(o),
				a = e.child(i),
				o = r[o],
				r = r[i];
			return (
				(o += t[1] + ms(s, t[1] - 1)),
				(r += n[1] + ms(a, n[1] - 1)),
				[o, Math.min(r, e.content.size)]
			);
		}
		function Ae(e) {
			var t = e.$from,
				n = e.$to,
				r = e.from,
				o = e.to,
				i = t.doc;
			return (
				e instanceof f0 && ((t = i.resolve(r + 1)), (n = i.resolve(o - 1))),
				0 === t.depth && (n = t = i.resolve(r - 1)),
				{
					startFromOffset: t.start(1),
					endFromOffset: n.start(1),
					startToOffset: t.end(1),
					endToOffset: n.end(1),
					startIndex: t.index(0),
					endIndex: n.index(0),
					from: t.pos,
					to: n.pos
				}
			);
		}
		function bs(e, t) {
			for (var n = 1, r = 1, o = 0, i = 0; o < e.childCount; o += 1) {
				var s = e.child(o).nodeSize,
					n = i + 1,
					r = i + s - 1;
				if (o === t) break;
				i += s;
			}
			return { startOffset: n, endOffset: r };
		}
		var ws = "heading",
			ks = "listItem",
			xs = "link",
			Cs = "code",
			Ts = "meta",
			Ms = "delimiter",
			Ss = "markedText",
			Es = { strong: 2, emph: 1, strike: 2 };
		function Le(e, t, n, r) {
			return { start: e, end: t, spec: { type: n, attrs: r } };
		}
		function Ns(e, t, n) {
			var e = e.type,
				r = Ee(t, Es[e]),
				o = Ee(n, -Es[e]);
			return [Le(r, o, e), Le(t, r, Ms), Le(o, n, Ms)];
		}
		function Os(e, t, n, r) {
			return [
				Le(e, t, xs),
				Le(gi(e, n[1] + 1), gi(t, r), xs, { desc: !0 }),
				Le(gi(t, r + 2), Ee(t, -1), xs, { url: !0 })
			];
		}
		function Ds(e, t, n, r) {
			var o = {
				start: t,
				end: n,
				spec: {
					attrs: { className: r + "-line-background", codeStart: t[0], codeEnd: n[0] }
				},
				lineBackground: !0
			};
			return "item" !== e.type && "blockQuote" !== e.type
				? [
						we(we({}, o), {
							end: t,
							spec: { attrs: { className: r + "-line-background start" } }
						}),
						we(we({}, o), { start: [Math.min(t[0] + 1, n[0]), t[1]] })
					]
				: null;
		}
		function As(e, t) {
			for (var n = []; e; ) {
				var r = e.type;
				("paragraph" !== r && "codeBlock" !== r) ||
					n.push(Le([li(e), ui(e) - 1], [ci(e), di(e) + 1], t)),
					(e = e.next);
			}
			return n;
		}
		var Ls = {
				heading: function (e, t, n) {
					var r = e.level,
						o = [Le(t, n, ws, { level: r })];
					return (
						o.push(
							"atx" === e.headingType
								? Le(t, Ee(t, r), Ms)
								: Le(gi(n, 0), n, ws, { seText: !0 })
						),
						o
					);
				},
				strong: Ns,
				emph: Ns,
				strike: Ns,
				link: function (e, t, n) {
					var r = (r = e.lastChild) ? di(r) + 1 : 2;
					return e.extendedAutolink ? [Le(t, n, xs, { desc: !0 })] : Os(t, n, t, r);
				},
				image: function (e, t, n) {
					var e = (e = e.lastChild) ? di(e) + 1 : 3,
						r = Ee(t, 1);
					return nt([Le(t, r, Ts)], Os(t, n, r, e));
				},
				code: function (e, t, n) {
					var e = e.tickCount,
						r = Ee(t, e),
						e = Ee(n, -e);
					return [
						Le(t, n, Cs),
						Le(t, r, Cs, { start: !0 }),
						Le(r, e, Cs, { marked: !0 }),
						Le(e, n, Cs, { end: !0 })
					];
				},
				codeBlock: function (e, t, n, r) {
					var o = e.fenceOffset,
						i = e.fenceLength,
						s = e.fenceChar,
						a = e.info,
						l = e.infoPadding,
						e = e.parent,
						c = [Le(gi(t, 1), n, "codeBlock")];
					return (
						s && c.push(Le(t, Ee(t, o + i), Ms)),
						a && c.push(Le(Ee(t, i), Ee(t, i + l + a.length), Ts)),
						new RegExp("^(\\s{0,4})(" + s + "{" + i + ",})").test(r) &&
							c.push(Le(gi(n, 1), n, Ms)),
						(o = Ds(e, t, n, "code-block")) ? c.concat(o) : c
					);
				},
				blockQuote: function (e, t, n) {
					return (
						(t =
							e.parent && "blockQuote" !== e.parent.type
								? [Le(t, n, "blockQuote")]
								: []),
						e.firstChild &&
							((n = []),
							"paragraph" === e.firstChild.type
								? (n = (e => {
										for (var t = []; e; )
											t.push(Le([li(e), ui(e)], [ci(e), di(e) + 1], Ss)),
												(e = e.next);
										return t;
									})(e.firstChild.firstChild))
								: "list" === e.firstChild.type && (n = As(e.firstChild, Ss)),
							(t = nt(nt([], t), n))),
						t
					);
				},
				item: function (e, t) {
					var n = (r = e.listData).padding,
						r = r.task,
						o = (e => {
							for (var t = 0; e.parent.parent && "item" === e.parent.parent.type; )
								(e = e.parent.parent), (t += 1);
							return [
								ks,
								we(we({}, [{ odd: !0 }, { even: !0 }][t % 2]), { listStyle: !0 })
							];
						})(e),
						o = [Le.apply(void 0, nt([t, Ee(t, n)], o))];
					return (
						r &&
							(o.push(Le(Ee(t, n), Ee(t, n + 3), "taskDelimiter")),
							o.push(Le(Ee(t, n + 1), Ee(t, n + 2), Ts))),
						o.concat(As(e.firstChild, Ss))
					);
				},
				customBlock: function (e, t, n) {
					var r = e.offset,
						o = e.syntaxLength,
						i = e.info,
						e = e.parent,
						r = r + o,
						s = [Le(gi(t, 1), n, "customBlock")];
					return (
						s.push(Le(t, Ee(t, r), Ms)),
						i && s.push(Le(Ee(t, r), Ee(t, o + i.length), Ts)),
						s.push(Le(gi(n, 1), n, Ms)),
						(r = Ds(e, t, n, "custom-block")) ? s.concat(r) : s
					);
				}
			},
			Is = {
				thematicBreak: "thematicBreak",
				table: "table",
				tableCell: "tableCell",
				htmlInline: "html"
			},
			Rs = {};
		function Ps(e) {
			var r = e.schema,
				x = e.toastMark;
			return new b0({
				appendTransaction: function (e, t, n) {
					var y,
						o,
						i,
						s,
						m,
						g,
						v,
						b,
						w,
						e = e[0],
						k = n.tr;
					return (
						e.docChanged &&
							((y = []),
							e.getMeta("editResult").forEach(function (e) {
								var t,
									n,
									r,
									o,
									i = e.nodes,
									e = e.removedNodeRange;
								if (i.length) {
									y = y.concat(
										((h = i),
										(d = (d = k).doc),
										(p = h[0].sourcepos[0]),
										(h = sn(h).sourcepos[1]),
										(f = [p[0], p[1]]),
										(m = [h[0], h[1] + 1]),
										(o = []),
										((e, t, n) => {
											var r = [];
											Rs = {};
											for (var o = t[0] - 1; o < n[0]; o += 1) {
												var i = e.child(o),
													s = i.attrs.codeEnd,
													i = i.attrs.codeStart;
												if (i && s && !Zt(r, i)) {
													r.push(i), (s = Math.min(s, e.childCount));
													for (
														var s = i - 1, a = n[0], l = s;
														l < a;
														l += 1
													)
														Rs[l] = !0;
												}
											}
										})(d, p, h),
										o.push({ start: f, end: m }),
										o)
									);
									for (var s = 0, a = i; s < a.length; s++)
										for (var l = a[s].walker(), c = l.next(); c; ) {
											var u = c.node;
											c.entering &&
												(y = y.concat(
													((u = u),
													(r = n = void 0),
													(t = (t = x).getLineTexts()),
													(n = [li(u), ui(u)]),
													(r = [ci(u), di(u) + 1]),
													null !=
													(u = ((e, t, n, r) => {
														var o = e.type;
														return ls()(Ls[o])
															? Ls[o](e, t, n, r)
															: Is[o]
																? [Le(t, n, Is[o])]
																: null;
													})(u, n, r, t[r[0] - 1]))
														? u
														: [])
												)),
												(c = l.next());
										}
								} else if (e)
									for (
										var d = k.doc.childCount - 1,
											p = e.line,
											h = p[0],
											f = p[1],
											m = Math.min(h, d),
											g = Math.min(f, d),
											v = m;
										v <= g;
										v += 1
									)
										Rs[v] = !0;
							}),
							(g = r),
							(n = y),
							(v = (m = k).doc),
							(b = g.nodes.paragraph),
							(w = vs(v, v.childCount)),
							n.forEach(function (e) {
								var t = e.start,
									n = e.end,
									r = e.spec,
									e = e.lineBackground,
									o = Math.min(t[0], v.childCount) - 1,
									i = Math.min(n[0], v.childCount) - 1,
									s = v.child(o),
									a = v.child(i),
									l = w[o],
									c = w[i];
								if (
									((l += t[1] + ms(s, t[1] - 1)),
									(c += n[1] + ms(a, n[1] - 1)),
									r)
								)
									if (e) {
										var s = m,
											u = v,
											t = b,
											a = { from: l, to: c, startIndex: o, endIndex: i },
											d = r.attrs;
										void 0 === d && (d = {});
										for (
											var n = a.startIndex,
												p = a.endIndex,
												e = a.from,
												a = a.to,
												h = !1,
												f = n;
											f <= p;
											f += 1
										)
											delete Rs[f],
												(h = ((t, n, r) =>
													Object.keys(r).some(function (e) {
														return r[e] !== t.child(n).attrs[e];
													}))(u, f, d));
										h && s.setBlockType(e, a, t, d);
									} else m.addMark(l, c, g.mark(r.type, r.attrs));
								else m.removeMark(l, c);
							}),
							(o = m),
							(i = w),
							(s = b),
							Object.keys(Rs).forEach(function (e) {
								var t = Number(e),
									e = Math.min(Number(e) + 1, o.doc.childCount - 1),
									n = i[t],
									r = i[e] - 1;
								t === e && (r += 2), o.setBlockType(n, r, s);
							})),
						k.setMeta("widget", e.getMeta("widget"))
					);
				}
			});
		}
		var Bs = [
			"taskList",
			"orderedList",
			"bulletList",
			"table",
			"strong",
			"emph",
			"strike",
			"heading",
			"thematicBreak",
			"blockQuote",
			"code",
			"codeBlock",
			"indent",
			"outdent"
		];
		function Fs(e) {
			var n = { indent: { active: !1, disabled: !0 }, outdent: { active: !1, disabled: !0 } },
				r = !0,
				t = e,
				o = function (e) {
					t = (e = e).type;
					var t,
						e = pi(e)
							? e.listData.task
								? "taskList"
								: "ordered" === e.listData.type
									? "orderedList"
									: "bulletList"
							: -1 !== t.indexOf("table")
								? "table"
								: Zt(Bs, t)
									? t
									: null;
					e &&
						("bulletList" === e || "orderedList" === e
							? r &&
								((n[e] = { active: !0 }),
								(n.indent.disabled = !1),
								(n.outdent.disabled = !1),
								(r = !1))
							: (n[e] = { active: !0 }));
				},
				e = void 0;
			for (t = (e = void 0 === e ? !0 : e) ? t : t.parent; t && "document" !== t.type; )
				o(t), (t = t.parent);
			return n;
		}
		be(qs, (Hs = Ce)),
			Object.defineProperty(qs.prototype, "name", {
				get: function () {
					return "doc";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(qs.prototype, "schema", {
				get: function () {
					return { content: "block+" };
				},
				enumerable: !1,
				configurable: !0
			});
		var Hs,
			zs = qs;
		function qs() {
			return (null !== Hs && Hs.apply(this, arguments)) || this;
		}
		function Vs() {}
		function js(e, t) {
			return $s(e, t - 1);
		}
		function $s(e, t) {
			return e.child(t).textContent;
		}
		Object.defineProperty(Vs.prototype, "type", {
			get: function () {
				return "mark";
			},
			enumerable: !1,
			configurable: !0
		}),
			(Vs.prototype.setContext = function (e) {
				this.context = e;
			});
		var _s,
			Us = /^\s*> ?/,
			Ws =
				(be(Js, (_s = Te = Vs)),
				Object.defineProperty(Js.prototype, "name", {
					get: function () {
						return "blockQuote";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Js.prototype, "schema", {
					get: function () {
						return {
							toDOM: function () {
								return ["span", { class: Oe("block-quote") }, 0];
							}
						};
					},
					enumerable: !1,
					configurable: !0
				}),
				(Js.prototype.createBlockQuoteText = function (e, t) {
					return t ? e.replace(Us, "").trim() : "> " + e.trim();
				}),
				(Js.prototype.extendBlockQuote = function () {
					var c = this;
					return function (e, t) {
						var n = e.selection,
							r = e.doc,
							o = e.tr,
							e = e.schema,
							i = Ae(n),
							s = i.endFromOffset,
							a = i.endToOffset,
							l = i.to,
							r = $s(r, i.endIndex);
						return (
							!!(Us.test(r) && s < l && n.empty) &&
							(!r.replace(Us, "").trim()
								? o.deleteRange(s, a).split(o.mapping.map(a))
								: ai(
										o,
										a,
										(i = r.slice(l - s).trim()),
										oi(e, c.createBlockQuoteText(i))
									),
							t(o),
							!0)
						);
					};
				}),
				(Js.prototype.commands = function () {
					var l = this;
					return function () {
						return function (e, t) {
							var n = e.selection,
								r = e.doc,
								n = Ae(n),
								o = n.startFromOffset,
								i = n.endToOffset,
								s = n.startIndex,
								n = n.endIndex,
								a = Us.test($s(r, s)),
								r = si({
									state: e,
									startIndex: s,
									endIndex: n,
									from: o,
									createText: function (e) {
										return l.createBlockQuoteText(e, a);
									}
								});
							return t(r.setSelection(Se(r, r.mapping.map(i)))), !0;
						};
					};
				}),
				(Js.prototype.keymaps = function () {
					var e = this.commands()();
					return { "alt-q": e, "alt-Q": e, Enter: this.extendBlockQuote() };
				}),
				Js);
		function Js() {
			return (null !== _s && _s.apply(this, arguments)) || this;
		}
		var Gs = /(^\s*)([-*+] |[\d]+\. )/,
			Ks = /(^\s*)([\d])+\.( \[[ xX]])? /,
			Zs = /^(\s*)((\d+)([.)]\s(?:\[(?:x|\s)\]\s)?))(.*)/,
			Xs = /(^\s*)([-*+]|[\d]+\.)( \[[ xX]])? /,
			Qs = /^(\s*)([-*+]+(\s(?:\[(?:x|\s)\]\s)?))(.*)/,
			Ys = /(^\s*)([-*+] |[\d]+\. )(\[[ xX]] )/,
			ea = /(^\s*)([-*+])( \[[ xX]]) /;
		function ta(e) {
			return Ks.test(e) ? "ordered" : "bullet";
		}
		function na(e) {
			for (var t = 0; e && "document" !== e.type; )
				"list" === e.type && (t += 1), (e = e.parent);
			return t;
		}
		function ra(e, t, n, r) {
			for (var o = e.getLineTexts().length, i = [], s = t; r ? s < o : 1 < s; ) {
				var s = r ? s + 1 : s - 1,
					a = e.findFirstNodeAtLine(s),
					l = na(a);
				if (l === n) i.push({ line: s, depth: n, mdNode: a });
				else if (l < n) break;
			}
			return i;
		}
		function oa(i, e, s, a) {
			void 0 === a && (a = 0);
			var l = Number.MAX_VALUE,
				c = 0;
			return {
				changedResults: e.map(function (e, t) {
					var n,
						r,
						e = e.line,
						o = ((l = Math.min(e - 1, l)), (c = Math.max(e - 1, c)), js(i, e));
					return {
						text:
							"bullet" === s
								? ((n = o),
									Gs.test(n)
										? ("bullet" === (r = ta(n)) && Xs.test(n)
												? (n = n.replace(ea, "$1$2 "))
												: "ordered" === r && (n = n.replace(Ks, "$1* ")),
											n)
										: "* " + n)
								: ((r = o),
									(n = t + 1 + a),
									Gs.test(r)
										? ("bullet" === (o = ta(r)) ||
											("ordered" === o && Xs.test(r))
												? (r = r.replace(Xs, "$1" + n + ". "))
												: "ordered" === o &&
													((o = Zs.exec(r)[3]), Number(o) !== n) &&
													(r = r.replace(Ks, "$1" + n + ". ")),
											r)
										: n + ". " + r),
						line: e
					};
				}),
				firstIndex: l,
				lastIndex: c
			};
		}
		function ia(e, t) {
			(r = (n = t).toastMark),
				(o = n.mdNode),
				(n = n.line),
				(i = na(o)),
				(s = ra(r, n, i, !1).reverse()),
				(r = ra(r, n, i, !0));
			var n,
				r,
				o,
				i,
				s = s.concat([{ line: n, depth: i, mdNode: o }]).concat(r);
			return oa(t.doc, s, e);
		}
		var sa = {
				bullet: function (e) {
					return ia("bullet", e);
				},
				ordered: function (e) {
					return ia("ordered", e);
				},
				task: function (e) {
					var t = e.mdNode,
						n = e.line,
						e = js(e.doc, n);
					return (
						t.listData.task
							? (e = e.replace(Ys, "$1$2"))
							: pi(t) && (e = e.replace(Gs, "$1$2[ ] ")),
						{ changedResults: [{ text: e, line: n }] }
					);
				}
			},
			aa = {
				bullet: function (e) {
					var t = e.doc,
						e = e.line;
					return { changedResults: [{ text: "* " + js(t, e), line: e }] };
				},
				ordered: function (e) {
					for (
						var t = e.toastMark,
							n = e.doc,
							r = e.line,
							e = e.startLine,
							o = js(n, r),
							i = 1,
							s = e,
							a = 0,
							l = e - 1;
						0 < l;
						--l
					) {
						var c = t.findFirstNodeAtLine(l),
							c = js(n, l) && !!mi(c, pi),
							u = Zs.exec(js(n, l));
						if (!u && !c) break;
						if (!u && c) a += 1;
						else if (!u[1]) {
							(i = Number(u[3])), (s = l);
							break;
						}
					}
					return { changedResults: [{ text: i + r - s - a + ". " + o, line: r }] };
				},
				task: function (e) {
					var t = e.doc,
						e = e.line;
					return { changedResults: [{ text: "* [ ] " + js(t, e), line: e }] };
				}
			},
			la = {
				bullet: function (e) {
					var t = e.line,
						e = js(e.doc, t),
						t = Qs.exec(e);
					return { listSyntax: "" + t[1] + t[2] };
				},
				ordered: function (e) {
					var t = e.toastMark,
						n = e.line,
						r = e.doc,
						e = na(e.mdNode),
						o = js(r, n),
						o = Zs.exec(o),
						i = o[1],
						s = o[4],
						o = Number(o[3]) + 1,
						s = "" + i + o + s,
						t = ra(t, n, e, !0).filter(function (e) {
							var t = Zs.exec(js(r, e.line));
							return t && t[1].length === i.length && !!mi(e.mdNode, hi);
						});
					return we({ listSyntax: s }, oa(r, t, "ordered", o));
				}
			},
			ca = /(^\s{1,4})(.*)/;
		function ua(e, t, n) {
			return e < t || Gs.test(n) || Us.test(n);
		}
		function da(e, t, n) {
			var n = n.$from,
				e = (n = 0 === n.depth ? e.resolve(n.pos - 1) : n).node(1),
				r = n.start(1),
				o = e.content.size;
			return e.rangeHasMark(0, o, t.marks.table) && n.pos - r !== o && n.pos !== r;
		}
		function pa(e, t) {
			var n = t.from,
				r = t.to;
			if ("indent" === t.type) (n += 4), (r += 4 * (t.lineLen + 1));
			else {
				var o = t.spaceLenList;
				n -= o[0];
				for (var i = 0; i < o.length; i += 1) r -= o[i];
			}
			return Se(e, n, r);
		}
		be(ma, (ha = Ce)),
			Object.defineProperty(ma.prototype, "name", {
				get: function () {
					return "paragraph";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(ma.prototype, "schema", {
				get: function () {
					return {
						content: "inline*",
						attrs: {
							className: { default: null },
							codeStart: { default: null },
							codeEnd: { default: null }
						},
						selectable: !1,
						group: "block",
						parseDOM: [{ tag: "div" }],
						toDOM: function (e) {
							e = e.attrs;
							return e.className
								? ["div", { class: Oe(e.className) }, 0]
								: ["div", 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(ma.prototype.reorderList = function (e, t) {
				for (
					var n,
						r = this.context,
						o = r.view,
						i = r.toastMark,
						r = r.schema,
						s = o.state,
						a = s.tr,
						l = s.selection,
						c = s.doc,
						u = i.findFirstNodeAtLine(e),
						d = u;
					u &&
					(!pi((n = u)) || "ordered" === n.listData.type) &&
					"document" !== u.parent.type;

				)
					if (hi((u = u.parent))) {
						d = u;
						break;
					}
				d && (e = d.sourcepos[0][0]);
				for (
					var s = Zs.exec(js(c, e)),
						i = s[1].length,
						r = (function e(t, n, r, o, i) {
							for (var s = [], a = js(t, r), l = Zs.exec(a); l; ) {
								var c = l[1],
									u = l[4],
									d = l[5],
									p = c.length;
								if (
									(p === i
										? (s.push(oi(n, "" + c + o + u + d)), (o += 1), (r += 1))
										: i < p &&
											((r = (c = e(t, n, r, 1, p)).line),
											(s = s.concat(c.nodes))),
									p < i || r > t.childCount)
								)
									break;
								(a = js(t, r)), (l = Zs.exec(a));
							}
							return { nodes: s, line: r };
						})(c, r, e, Number(s[3]), i),
						s = r.line,
						p = r.nodes,
						h = ((t = Math.max(t, s - 1)), bs(c, e - 1).startOffset),
						f = e - 1;
					f <= t - 1;
					f += 1
				) {
					var m = c.child(f),
						g = m.nodeSize,
						m = m.content,
						v = a.mapping.map(h),
						m = v + m.size;
					a.replaceWith(v, m, p[f - e + 1]), (h += g);
				}
				i = Se(a, l.from, l.to);
				o.dispatch(a.setSelection(i));
			}),
			(ma.prototype.indent = function (u) {
				var d = this;
				return (
					void 0 === u && (u = !1),
					function () {
						return function (e, t) {
							var n = e.schema,
								r = e.selection,
								o = e.doc,
								i = Ae(r),
								s = i.from,
								a = i.to,
								l = i.startFromOffset,
								c = i.startIndex,
								i = i.endIndex;
							return !(
								(u && da(o, n, r)) ||
								((r = $s(o, c)),
								(u && ua(s, a, r)) || (!u && Gs.test(r))
									? (t(
											(o = si({
												state: e,
												from: l,
												startIndex: c,
												endIndex: i,
												createText: function (e) {
													return "    " + e;
												}
											})).setSelection(
												pa(o, {
													type: "indent",
													from: s,
													to: a,
													lineLen: i - c
												})
											)
										),
										Zs.test(r) && d.reorderList(c + 1, i + 1))
									: u && t(e.tr.insert(a, oi(n, "    "))),
								0)
							);
						};
					}
				);
			}),
			(ma.prototype.outdent = function (d) {
				var p = this;
				return (
					void 0 === d && (d = !1),
					function () {
						return function (e, t) {
							var n,
								r = e.selection,
								o = e.doc,
								i = e.schema,
								s = Ae(r),
								a = s.from,
								l = s.to,
								c = s.startFromOffset,
								u = s.startIndex,
								s = s.endIndex;
							return !(
								(d && da(o, i, r)) ||
								((i = $s(o, u)),
								(d && ua(a, l, i)) || (!d && Gs.test(i))
									? ((n = []),
										t(
											(r = si({
												state: e,
												from: c,
												startIndex: u,
												endIndex: s,
												createText: function (e) {
													var t = ca.exec(e);
													return (
														n.push(t ? t[1].length : 0),
														e.replace(ca, "$2")
													);
												}
											})).setSelection(
												pa(r, {
													type: "outdent",
													from: a,
													to: l,
													spaceLenList: n
												})
											)
										),
										Zs.test(i) && p.reorderList(u + 1, s + 1))
									: d &&
										((r = (o = i.slice(0, l - c)).replace(/\s{1,4}$/, "")),
										(a = l - (o.length - r.length)),
										t(e.tr.delete(a, l))),
								0)
							);
						};
					}
				);
			}),
			(ma.prototype.deleteLines = function () {
				var s = this;
				return function (e, t) {
					var n = s.context.view,
						r = Ae(e.selection),
						o = r.startFromOffset,
						i = r.endToOffset;
					return Vo(function () {
						return t(e.tr.deleteRange(o, i)), !0;
					}, le)(e, t, n);
				};
			}),
			(ma.prototype.moveDown = function () {
				return function (e, t) {
					var n = e.doc,
						r = e.tr,
						o = e.schema,
						e = Ae(e.selection),
						i = e.startFromOffset,
						s = e.endToOffset,
						e = e.endIndex;
					return (
						e < n.content.childCount - 1 &&
						((e = (n = n.child(e + 1)).nodeSize),
						(n = n.textContent),
						r
							.delete(s, s + e)
							.split(i)
							.insert(r.mapping.map(i) - 2, oi(o, n)),
						t(r),
						!0)
					);
				};
			}),
			(ma.prototype.moveUp = function () {
				return function (e, t) {
					var n = e.tr,
						r = e.doc,
						o = e.schema,
						e = Ae(e.selection),
						i = e.startFromOffset,
						s = e.endToOffset,
						e = e.startIndex;
					return (
						0 < e &&
						((e = (r = r.child(e - 1)).nodeSize),
						(r = r.textContent),
						n
							.delete(i - e, i)
							.split(n.mapping.map(s))
							.insert(n.mapping.map(s), oi(o, r)),
						t(n),
						!0)
					);
				};
			}),
			(ma.prototype.commands = function () {
				return { indent: this.indent(), outdent: this.outdent() };
			}),
			(ma.prototype.keymaps = function () {
				return {
					Tab: this.indent(!0)(),
					"Shift-Tab": this.outdent(!0)(),
					"Mod-d": this.deleteLines(),
					"Mod-D": this.deleteLines(),
					"Alt-ArrowUp": this.moveUp(),
					"Alt-ArrowDown": this.moveDown()
				};
			});
		var ha,
			fa = ma;
		function ma() {
			return (null !== ha && ha.apply(this, arguments)) || this;
		}
		be(ya, (ga = Ce)),
			Object.defineProperty(ya.prototype, "name", {
				get: function () {
					return "text";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(ya.prototype, "schema", {
				get: function () {
					return { group: "inline" };
				},
				enumerable: !1,
				configurable: !0
			});
		var ga,
			va = ya;
		function ya() {
			return (null !== ga && ga.apply(this, arguments)) || this;
		}
		var ba,
			wa = /^#{1,6}\s/,
			ka =
				(be(xa, (ba = Te)),
				Object.defineProperty(xa.prototype, "name", {
					get: function () {
						return "heading";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(xa.prototype, "schema", {
					get: function () {
						return {
							attrs: { level: { default: 1 }, seText: { default: !1 } },
							toDOM: function (e) {
								var e = e.attrs,
									t = "heading|heading" + e.level;
								return (
									e.seText && (t += "|delimiter|setext"),
									["span", { class: Oe.apply(void 0, t.split("|")) }, 0]
								);
							}
						};
					},
					enumerable: !1,
					configurable: !0
				}),
				(xa.prototype.createHeadingText = function (e, t, n) {
					for (var t = t.replace(n, "").trim(), r = ""; 0 < e; ) (r += "#"), --e;
					return r + " " + t;
				}),
				(xa.prototype.commands = function () {
					var a = this;
					return function (s) {
						return function (e, t) {
							var n = s.level,
								r = Ae(e.selection),
								o = r.startFromOffset,
								i = r.endToOffset,
								e = si({
									state: e,
									from: o,
									startIndex: r.startIndex,
									endIndex: r.endIndex,
									createText: function (e) {
										var t = e.match(wa),
											t = t ? t[0] : "";
										return a.createHeadingText(n, e, t);
									}
								});
							return t(e.setSelection(Se(e, e.mapping.map(i)))), !0;
						};
					};
				}),
				xa);
		function xa() {
			return (null !== ba && ba.apply(this, arguments)) || this;
		}
		be(Ma, (Ca = Te)),
			Object.defineProperty(Ma.prototype, "name", {
				get: function () {
					return "codeBlock";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Ma.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("code-block") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Ma.prototype.commands = function () {
				return function () {
					return function (e, t) {
						var n = e.selection,
							r = e.schema,
							e = e.tr,
							n = Ae(n),
							o = n.startFromOffset,
							n = n.endToOffset,
							r = oi(r, "```");
						return (
							e.insert(o, r).split(o + "```".length),
							e.split(e.mapping.map(n)).insert(e.mapping.map(n), r),
							t(e.setSelection(Se(e, e.mapping.map(n) - ("```".length + 2)))),
							!0
						);
					};
				};
			}),
			(Ma.prototype.keepIndentation = function () {
				var u = this;
				return function (e, t) {
					var n = e.selection,
						r = e.tr,
						o = e.doc,
						e = e.schema,
						i = u.context.toastMark,
						n = Ae(n),
						s = n.startFromOffset,
						a = n.endToOffset,
						l = n.endIndex,
						c = n.from,
						n = n.to,
						o = $s(o, l);
					if (c === n && o.trim()) {
						var c = o.match(/^\s+/),
							i = i.findFirstNodeAtLine(l + 1);
						if ((l = i) && "codeBlock" === l.type && c)
							return (
								(i = c[0]), ai(r, a, (l = o.slice(n - s)), oi(e, i + l)), t(r), !0
							);
					}
					return !1;
				};
			}),
			(Ma.prototype.keymaps = function () {
				var e = this.commands()();
				return { "Shift-Mod-p": e, "Shift-Mod-P": e, Enter: this.keepIndentation() };
			});
		var Ca,
			Ta = Ma;
		function Ma() {
			return (null !== Ca && Ca.apply(this, arguments)) || this;
		}
		var Sa = /\||\s/g;
		function Ea(e, t) {
			for (var n = "|", r = 0; r < e; r += 1) n += t ? " --- |" : "  |";
			return n;
		}
		be(Da, (Na = Te)),
			Object.defineProperty(Da.prototype, "name", {
				get: function () {
					return "table";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Da.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("table") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Da.prototype.extendTable = function () {
				var l = this;
				return function (e, t) {
					var n,
						r,
						o,
						i = e.selection,
						s = e.doc,
						a = e.tr,
						e = e.schema;
					return (
						!!i.empty &&
						((n = (i = Ae(i)).endFromOffset),
						(r = i.endToOffset),
						(o = i.to),
						(i = $s(s, (s = i.endIndex))),
						!!(s = mi(
							l.context.toastMark.findNodeAtPosition([s + 1, o - n + 1]),
							function (e) {
								return (
									fi(e) &&
									("tableDelimRow" === e.parent.type ||
										"tableBody" === e.parent.parent.type)
								);
							}
						))) &&
						((o = !i.replace(Sa, "").trim()),
						(i = Ea(s.parent.parent.parent.columns.length)),
						o
							? a.deleteRange(n, r).split(a.mapping.map(r))
							: a
									.split(r)
									.insert(a.mapping.map(r), oi(e, i))
									.setSelection(Se(a, a.mapping.map(r) - 2)),
						t(a),
						!0)
					);
				};
			}),
			(Da.prototype.moveTableCell = function (c) {
				var u = this;
				return function (e, t) {
					var n,
						r,
						o,
						i,
						s,
						a = e.selection,
						e = e.tr,
						a = Ae(a),
						l = a.endFromOffset,
						a = mi(
							u.context.toastMark.findNodeAtPosition([a.endIndex + 1, a.to - l]),
							fi
						);
					return (
						!!a &&
						((n = a.parent),
						(i = (r = c
							? { type: "next", parentType: "tableHead", childType: "firstChild" }
							: { type: "prev", parentType: "tableBody", childType: "lastChild" })
							.childType),
						(s = di(a)),
						a[(o = r.type)]
							? (s = di(a[o]) - 1)
							: ((a = n[o] || n.parent.type !== r.parentType ? n[o] : n.parent[o][i]),
								"next" === o
									? (s += (a ? di(a[i]) : 0) + 2)
									: "prev" === o && (s = a ? -4 : 0)),
						t(e.setSelection(Se(e, l + s))),
						!0)
					);
				};
			}),
			(Da.prototype.addTable = function () {
				return function (a) {
					return function (e, t) {
						var n = e.selection,
							r = e.tr,
							o = e.schema,
							e = a.columnCount,
							i = a.rowCount,
							s = Ae(n).endToOffset,
							n = [Ea((n = e)), Ea(n, !0)],
							e = ((e, t) => {
								for (var n = [], r = 0; r < t; r += 1) n.push(Ea(e));
								return n;
							})(e, i - 1);
						return (
							nt(nt([], n), e).forEach(function (e) {
								r.split(r.mapping.map(s)).insert(r.mapping.map(s), oi(o, e));
							}),
							t(r.setSelection(Se(r, s + 4))),
							!0
						);
					};
				};
			}),
			(Da.prototype.commands = function () {
				return { addTable: this.addTable() };
			}),
			(Da.prototype.keymaps = function () {
				return {
					Enter: this.extendTable(),
					Tab: this.moveTableCell(!0),
					"Shift-Tab": this.moveTableCell(!1)
				};
			});
		var Na,
			Oa = Da;
		function Da() {
			return (null !== Na && Na.apply(this, arguments)) || this;
		}
		be(Ia, (Aa = Te)),
			Object.defineProperty(Ia.prototype, "name", {
				get: function () {
					return "thematicBreak";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Ia.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("thematic-break") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Ia.prototype.hr = function () {
				return function () {
					return function (e, t) {
						var n = e.selection,
							r = e.schema,
							e = e.tr,
							n = Ae(n),
							o = n.from,
							i = n.to,
							n = n.endToOffset,
							r = oi(r, "***");
						return (
							e
								.split(o)
								.replaceWith(e.mapping.map(o), e.mapping.map(i), r)
								.split(e.mapping.map(i))
								.setSelection(Se(e, e.mapping.map(n))),
							t(e),
							!0
						);
					};
				};
			}),
			(Ia.prototype.commands = function () {
				return { hr: this.hr() };
			}),
			(Ia.prototype.keymaps = function () {
				var e = this.hr()();
				return { "Mod-l": e, "Mod-L": e };
			});
		var Aa,
			La = Ia;
		function Ia() {
			return (null !== Aa && Aa.apply(this, arguments)) || this;
		}
		be(Ba, (Ra = Te)),
			Object.defineProperty(Ba.prototype, "name", {
				get: function () {
					return "listItem";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Ba.prototype, "schema", {
				get: function () {
					return {
						attrs: {
							odd: { default: !1 },
							even: { default: !1 },
							listStyle: { default: !1 }
						},
						toDOM: function (e) {
							var e = e.attrs,
								t = e.odd,
								n = "list-item";
							return (
								e.listStyle && (n += "|list-item-style"),
								t && (n += "|list-item-odd"),
								e.even && (n += "|list-item-even"),
								["span", { class: Oe.apply(void 0, n.split("|")) }, 0]
							);
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Ba.prototype.extendList = function () {
				var p = this;
				return function (e, t) {
					var n = e.selection,
						r = e.doc,
						o = e.schema,
						e = e.tr,
						i = p.context.toastMark,
						s = Ae(n),
						a = s.to,
						l = s.startFromOffset,
						c = s.endFromOffset,
						u = s.endIndex,
						s = s.endToOffset,
						d = $s(r, u);
					return !(
						!Gs.test(d) ||
						n.from === l ||
						!n.empty ||
						(!d.replace(Xs, "").trim()
							? e.deleteRange(c, s).split(e.mapping.map(s))
							: ((l = ta(d)),
								(n = i.findFirstNodeAtLine(u + 1)),
								(d = d.slice(a - c)),
								(l = (c = la[l]({ toastMark: i, mdNode: n, doc: r, line: u + 1 }))
									.listSyntax),
								null != (i = c.changedResults) && i.length
									? (e.split(a),
										i.unshift({ text: l + d, line: u + 1 }),
										p.changeToListPerLine(e, i, {
											from: a,
											startLine: i[0].line,
											endLine: sn(i).line
										}),
										(n = e.mapping.map(s) - d.length),
										e.setSelection(Se(e, n)))
									: ai(e, s, d, oi(o, l + d))),
						t(e),
						0)
					);
				};
			}),
			(Ba.prototype.toList = function (h) {
				var f = this;
				return function () {
					return function (e, t) {
						for (
							var n = e.doc,
								r = e.tr,
								o = f.context.toastMark,
								e = Ae(e.selection),
								i = e.startIndex + 1,
								s = e.endIndex + 1,
								a = e.endToOffset,
								l = [],
								c = i;
							c <= s;
							c += 1
						) {
							var u,
								d,
								p = o.findFirstNodeAtLine(c);
							if (
								p &&
								((u = c), (d = void 0), (d = p.type), u <= p.sourcepos[0][0]) &&
								("codeBlock" === d || "heading" === d || d.match("table"))
							)
								break;
							-1 === l.indexOf(c) &&
								((u = (pi(p) ? sa : aa)[h]({
									toastMark: o,
									mdNode: p,
									doc: n,
									line: c,
									startLine: i
								}).changedResults),
								(d = f.changeToListPerLine(r, u, {
									from: bs(n, u[0].line - 1).startOffset,
									startLine: u[0].line,
									endLine: sn(u).line,
									indexDiff: 1
								})),
								(a = Math.max(d, a)),
								u) &&
								(l = l.concat(
									u.map(function (e) {
										return e.line;
									})
								));
						}
						return t(r.setSelection(Se(r, r.mapping.map(a)))), !0;
					};
				};
			}),
			(Ba.prototype.changeToListPerLine = function (s, a, e) {
				for (
					var l = e.from,
						t = e.endLine,
						n = e.indexDiff,
						c = void 0 === n ? 0 : n,
						u = 0,
						d = this,
						r = e.startLine - c;
					r <= t - c;
					r += 1
				)
					(t => {
						var e = (n = s.doc.child(t)).nodeSize,
							n = n.content,
							r = s.mapping.map(l),
							o = r + n.size,
							i = a.filter(function (e) {
								return e.line - c === t;
							})[0];
						i &&
							(s.replaceWith(r, o, oi(d.context.schema, i.text)),
							(u = Math.max(u, l + n.size))),
							(l += e);
					})(r);
				return u;
			}),
			(Ba.prototype.toggleTask = function () {
				var f = this;
				return function (e, t) {
					for (
						var n = e.selection,
							r = e.tr,
							o = e.doc,
							i = e.schema,
							s = f.context.toastMark,
							e = Ae(n),
							n = e.startIndex,
							a = e.endIndex,
							l = null,
							c = n;
						c <= a;
						c += 1
					) {
						var u,
							d,
							p,
							h = s.findFirstNodeAtLine(c + 1);
						pi(h) &&
							h.listData.task &&
							((d = (u = h.listData).checked),
							(u = u.padding),
							(d = d ? " " : "x"),
							(p = bs(o, (h = h.sourcepos[0])[0] - 1).startOffset),
							(p += h[1] + u),
							(l = r.replaceWith(p, p + 1, i.text(d))));
					}
					return !!l && (t(l), !0);
				};
			}),
			(Ba.prototype.commands = function () {
				return {
					bulletList: this.toList("bullet"),
					orderedList: this.toList("ordered"),
					taskList: this.toList("task")
				};
			}),
			(Ba.prototype.keymaps = function () {
				var e = this.toList("bullet")(),
					t = this.toList("ordered")(),
					n = this.toList("task")(),
					r = this.toggleTask();
				return {
					"Mod-u": e,
					"Mod-U": e,
					"Mod-o": t,
					"Mod-O": t,
					"alt-t": n,
					"alt-T": n,
					"Shift-Ctrl-x": r,
					"Shift-Ctrl-X": r,
					Enter: this.extendList()
				};
			});
		var Ra,
			Pa = Ba;
		function Ba() {
			return (null !== Ra && Ra.apply(this, arguments)) || this;
		}
		function Fa(p, h) {
			return function () {
				return function (e, t) {
					var n = e.tr,
						e = e.selection,
						r = ls()(p)
							? p
							: function (e) {
									return p.test(e);
								},
						o = h.length,
						i = n.doc,
						s = hs(e),
						a = s[0],
						s = s[1],
						l = Math.max(a - o, 1),
						c = Math.min(s + o, i.content.size - 1),
						u = e.content(),
						u = u.content.textBetween(0, u.content.size, "\n"),
						d = i.textBetween(l, a, "\n"),
						i = i.textBetween(s, c, "\n"),
						u = "" + d + u + i;
					return (
						d && i && r(u)
							? n.delete(c - o, c).delete(l, l + o)
							: (n.insertText(h, s).insertText(h, a),
								(d = e.empty ? Se(n, a + o) : Se(n, a + o, s + o)),
								n.setSelection(d)),
						t(n),
						!0
					);
				};
			};
		}
		var Ha,
			za = /^(\*{2}|_{2}).*([\s\S]*)\1$/m,
			qa =
				(be(Va, (Ha = Te)),
				Object.defineProperty(Va.prototype, "name", {
					get: function () {
						return "strong";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Va.prototype, "schema", {
					get: function () {
						return {
							toDOM: function () {
								return ["span", { class: Oe("strong") }, 0];
							}
						};
					},
					enumerable: !1,
					configurable: !0
				}),
				(Va.prototype.bold = function () {
					return Fa(za, "**");
				}),
				(Va.prototype.commands = function () {
					return { bold: this.bold() };
				}),
				(Va.prototype.keymaps = function () {
					var e = this.bold()();
					return { "Mod-b": e, "Mod-B": e };
				}),
				Va);
		function Va() {
			return (null !== Ha && Ha.apply(this, arguments)) || this;
		}
		var ja,
			$a = /^(~{2}).*([\s\S]*)\1$/m,
			_a =
				(be(Ua, (ja = Te)),
				Object.defineProperty(Ua.prototype, "name", {
					get: function () {
						return "strike";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Ua.prototype, "schema", {
					get: function () {
						return {
							toDOM: function () {
								return ["span", { class: Oe("strike") }, 0];
							}
						};
					},
					enumerable: !1,
					configurable: !0
				}),
				(Ua.prototype.commands = function () {
					return Fa($a, "~~");
				}),
				(Ua.prototype.keymaps = function () {
					var e = this.commands()();
					return { "Mod-s": e, "Mod-S": e };
				}),
				Ua);
		function Ua() {
			return (null !== ja && ja.apply(this, arguments)) || this;
		}
		var Wa,
			Ja = /^(\*|_).*([\s\S]*)\1$/m,
			Ga =
				(be(Ka, (Wa = Te)),
				Object.defineProperty(Ka.prototype, "name", {
					get: function () {
						return "emph";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Ka.prototype, "schema", {
					get: function () {
						return {
							toDOM: function () {
								return ["span", { class: Oe("emph") }, 0];
							}
						};
					},
					enumerable: !1,
					configurable: !0
				}),
				(Ka.prototype.italic = function () {
					return Fa(Ja, "*");
				}),
				(Ka.prototype.commands = function () {
					return { italic: this.italic() };
				}),
				(Ka.prototype.keymaps = function () {
					var e = this.italic()();
					return { "Mod-i": e, "Mod-I": e };
				}),
				Ka);
		function Ka() {
			return (null !== Wa && Wa.apply(this, arguments)) || this;
		}
		var Za,
			Xa = /^(`).*([\s\S]*)\1$/m,
			Qa =
				(be(Ya, (Za = Te)),
				Object.defineProperty(Ya.prototype, "name", {
					get: function () {
						return "code";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Ya.prototype, "schema", {
					get: function () {
						return {
							attrs: {
								start: { default: !1 },
								end: { default: !1 },
								marked: { default: !1 }
							},
							toDOM: function (e) {
								var e = e.attrs,
									t = "code";
								return (
									e.start && (t += "|delimiter|start"),
									e.end && (t += "|delimiter|end"),
									e.marked && (t += "|marked-text"),
									["span", { class: Oe.apply(void 0, t.split("|")) }, 0]
								);
							}
						};
					},
					enumerable: !1,
					configurable: !0
				}),
				(Ya.prototype.commands = function () {
					return Fa(Xa, "`");
				}),
				(Ya.prototype.keymaps = function () {
					var e = this.commands()();
					return { "Shift-Mod-c": e, "Shift-Mod-C": e };
				}),
				Ya);
		function Ya() {
			return (null !== Za && Za.apply(this, arguments)) || this;
		}
		be(nl, (el = Te)),
			Object.defineProperty(nl.prototype, "name", {
				get: function () {
					return "link";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(nl.prototype, "schema", {
				get: function () {
					return {
						attrs: { url: { default: !1 }, desc: { default: !1 } },
						toDOM: function (e) {
							var e = e.attrs,
								t = "link";
							return (
								e.url && (t += "|link-url|marked-text"),
								e.desc && (t += "|link-desc|marked-text"),
								["span", { class: Oe.apply(void 0, t.split("|")) }, 0]
							);
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(nl.prototype.addLinkOrImage = function (c) {
				return function (l) {
					return function (e, t) {
						var n = e.selection,
							r = e.tr,
							e = e.schema,
							n = hs(n),
							o = n[0],
							n = n[1],
							i = l.linkText,
							s = l.linkUrl,
							a = "";
						return (
							"image" === c && ((i = l.altText), (s = l.imageUrl), (a = "!")),
							(i = tn(i)),
							t(r.replaceWith(o, n, oi(e, (a += "[" + i + "](" + s + ")")))),
							!0
						);
					};
				};
			}),
			(nl.prototype.commands = function () {
				return {
					addImage: this.addLinkOrImage("image"),
					addLink: this.addLinkOrImage("link")
				};
			});
		var el,
			tl = nl;
		function nl() {
			return (null !== el && el.apply(this, arguments)) || this;
		}
		be(il, (rl = Te)),
			Object.defineProperty(il.prototype, "name", {
				get: function () {
					return "taskDelimiter";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(il.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("delimiter", "list-item") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var rl,
			ol = il;
		function il() {
			return (null !== rl && rl.apply(this, arguments)) || this;
		}
		be(ll, (sl = Te)),
			Object.defineProperty(ll.prototype, "name", {
				get: function () {
					return "delimiter";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(ll.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("delimiter") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var sl,
			al = ll;
		function ll() {
			return (null !== sl && sl.apply(this, arguments)) || this;
		}
		be(dl, (cl = Te)),
			Object.defineProperty(dl.prototype, "name", {
				get: function () {
					return "meta";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(dl.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("meta") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var cl,
			ul = dl;
		function dl() {
			return (null !== cl && cl.apply(this, arguments)) || this;
		}
		be(fl, (pl = Te)),
			Object.defineProperty(fl.prototype, "name", {
				get: function () {
					return "markedText";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(fl.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("marked-text") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var pl,
			hl = fl;
		function fl() {
			return (null !== pl && pl.apply(this, arguments)) || this;
		}
		be(vl, (ml = Te)),
			Object.defineProperty(vl.prototype, "name", {
				get: function () {
					return "tableCell";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(vl.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("table-cell") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var ml,
			gl = vl;
		function vl() {
			return (null !== ml && ml.apply(this, arguments)) || this;
		}
		be(wl, (yl = Te)),
			Object.defineProperty(wl.prototype, "name", {
				get: function () {
					return "html";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(wl.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("html") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var yl,
			bl = wl;
		function wl() {
			return (null !== yl && yl.apply(this, arguments)) || this;
		}
		be(Cl, (kl = Te)),
			Object.defineProperty(Cl.prototype, "name", {
				get: function () {
					return "customBlock";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Cl.prototype, "schema", {
				get: function () {
					return {
						toDOM: function () {
							return ["span", { class: Oe("custom-block") }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Cl.prototype.commands = function () {
				return function (a) {
					return function (e, t) {
						var n,
							r,
							o = e.selection,
							i = e.schema,
							e = e.tr,
							o = Ae(o),
							s = o.startFromOffset,
							o = o.endToOffset;
						return !(
							null == a ||
							!a.info ||
							((r = oi(i, (n = "$$" + a.info))),
							(i = oi(i, "$$")),
							e.insert(s, r).split(s + n.length),
							e.split(e.mapping.map(o)).insert(e.mapping.map(o), i),
							t(e.setSelection(Se(e, e.mapping.map(o) - ("$$".length + 2)))),
							0)
						);
					};
				};
			});
		var kl,
			xl = Cl;
		function Cl() {
			return (null !== kl && kl.apply(this, arguments)) || this;
		}
		var Tl,
			Ml = /x|backspace/i,
			Sl = /^\[(\s*)(x?)(\s*)\](?:\s+)/i,
			El = /\r\n|\n|\r/;
		function Ie(e, t) {
			var n = Tl.call(this, e) || this,
				e = t.toastMark,
				r = t.useCommandShortcut,
				r = void 0 === r || r,
				t = t.mdPlugins,
				t = void 0 === t ? [] : t;
			return (
				(n.editorType = "markdown"),
				n.el.classList.add("md-mode"),
				(n.toastMark = e),
				(n.extraPlugins = t),
				(n.specs = n.createSpecs()),
				(n.schema = n.createSchema()),
				(n.context = n.createContext()),
				(n.keymaps = n.createKeymaps(r)),
				(n.view = n.createView()),
				(n.commands = n.createCommands()),
				n.specs.setContext(we(we({}, n.context), { view: n.view })),
				n.createClipboard(),
				n.eventEmitter.listen("changePreviewTabWrite", function (e) {
					return n.toggleActive(!0, e);
				}),
				n.eventEmitter.listen("changePreviewTabPreview", function () {
					return n.toggleActive(!1);
				}),
				n.initEvent(),
				n
			);
		}
		be(Ie, (Tl = zn)),
			(Ie.prototype.toggleActive = function (e, t) {
				ji(this.el, "active", e), e ? t || this.focus() : this.blur();
			}),
			(Ie.prototype.createClipboard = function () {
				var n = this;
				(this.clipboard = document.createElement("textarea")),
					(this.clipboard.className = Ne("pseudo-clipboard")),
					this.clipboard.addEventListener("paste", function (e) {
						var t = e.clipboardData || window.clipboardData,
							t = t && t.items;
						t &&
							!xo()(t).some(function (e) {
								return "string" === e.kind && "text/rtf" === e.type;
							}) &&
							(t = es(t)) &&
							(e.preventDefault(), Yi(n.eventEmitter, t, e.type));
					}),
					this.clipboard.addEventListener("input", function (e) {
						var t = e.target.value;
						n.replaceSelection(t), e.preventDefault(), (e.target.value = "");
					}),
					this.el.insertBefore(this.clipboard, this.view.dom);
			}),
			(Ie.prototype.createContext = function () {
				return {
					toastMark: this.toastMark,
					schema: this.schema,
					eventEmitter: this.eventEmitter
				};
			}),
			(Ie.prototype.createSpecs = function () {
				return new ps([
					new zs(),
					new fa(),
					new ss(),
					new va(),
					new ka(),
					new Ws(),
					new Ta(),
					new xl(),
					new Oa(),
					new gl(),
					new La(),
					new Pa(),
					new qa(),
					new _a(),
					new Ga(),
					new Qa(),
					new tl(),
					new al(),
					new ol(),
					new hl(),
					new ul(),
					new bl()
				]);
			}),
			(Ie.prototype.createPlugins = function () {
				return nt(
					[
						Ps(this.context),
						((e = this.context),
						(o = e.toastMark),
						(i = e.eventEmitter),
						new b0({
							view: function () {
								return {
									update: function (e, t) {
										var e = e.state,
											n = e.doc,
											r = e.selection;
										(t && t.doc.eq(n) && t.selection.eq(r)) ||
											((r = (n = r.from) - (t = e.doc.resolve(n).start())),
											n === t && (r += 1),
											(t = [e.doc.content.findIndex(n).index + 1, r]),
											(n = Fs((e = o.findNodeAtPosition(t)))),
											i.emit("changeToolbarState", {
												cursorPos: t,
												mdNode: e,
												toolbarState: n
											}),
											i.emit("setFocusedNode", e));
									}
								};
							}
						})),
						((e = this.context),
						(a = e.schema),
						(l = e.toastMark),
						new b0({
							props: {
								handleDOMEvents: {
									keyup: function (e, t) {
										var n,
											r,
											o = e.state,
											i = o.doc,
											s = o.tr,
											o = o.selection;
										return (
											o.empty &&
												Ml.test(t.key) &&
												((o = (t = Ae(o)).startIndex),
												null !=
													(t =
														null ==
														(o = mi(
															l.findNodeAtPosition([
																o + 1,
																t.from - t.startFromOffset + 1
															]),
															function (e) {
																return (
																	"paragraph" === e.type &&
																	"item" ===
																		(null == (e = e.parent)
																			? void 0
																			: e.type)
																);
															}
														))
															? void 0
															: o.firstChild)) &&
												t.literal &&
												(o = (t = o.firstChild).literal.match(Sl)) &&
												((t = t.sourcepos[0]),
												(r = o[1]),
												(n = o[2]),
												(o = o[3]),
												(r = r.length + o.length),
												(o = bs(i, t[0] - 1).startOffset),
												(i = t[1] + o),
												n
													? (s.replaceWith(
															i,
															(r ? r + 1 : 0) + i,
															a.text(n)
														),
														e.dispatch(s))
													: r || (s.insertText(" ", i), e.dispatch(s))),
											!1
										);
									}
								}
							}
						}))
					],
					this.createPluginProps()
				).concat(this.defaultPlugins);
				var a, l, e, o, i;
			}),
			(Ie.prototype.createView = function () {
				var n = this;
				return new q0(this.el, {
					state: this.createState(),
					dispatchTransaction: function (e) {
						n.updateMarkdown(e);
						var t = n.view.state.applyTransaction(e).state;
						n.view.updateState(t), n.emitChangeEvent(e);
					},
					handleKeyDown: function (e, t) {
						return (
							(t.metaKey || t.ctrlKey) &&
								"V" === t.key.toUpperCase() &&
								n.clipboard.focus(),
							n.eventEmitter.emit("keydown", n.editorType, t),
							!1
						);
					},
					handleDOMEvents: {
						copy: function (e, t) {
							return n.captureCopy(t);
						},
						cut: function (e, t) {
							return n.captureCopy(t, "cut");
						},
						scroll: function () {
							return n.eventEmitter.emit("scroll", "editor"), !0;
						},
						keyup: function (e, t) {
							return n.eventEmitter.emit("keyup", n.editorType, t), !1;
						}
					},
					nodeViews: { widget: ns }
				});
			}),
			(Ie.prototype.createCommands = function () {
				return this.specs.commands(this.view);
			}),
			(Ie.prototype.captureCopy = function (e, t) {
				e.preventDefault();
				var n = this.view.state,
					r = n.selection,
					n = n.tr;
				return (
					r.empty ||
						((r = this.getChanged(r.content())),
						e.clipboardData
							? e.clipboardData.setData("text/plain", r)
							: window.clipboardData.setData("Text", r),
						"cut" === t &&
							this.view.dispatch(
								n.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut")
							)),
					!0
				);
			}),
			(Ie.prototype.updateMarkdown = function (r) {
				var o = this;
				r.docChanged &&
					r.steps.forEach(function (e, t) {
						var n;
						!e.slice ||
							e instanceof l0 ||
							((n = (t = gs(r.docs[t], (t = [e.from, e.to])[0], t[1]))[0]),
							(t = t[1]),
							(e = o.getChanged(e.slice)),
							n[0] === t[0] && n[1] === t[1] && "" === e && (e = "\n"),
							(n = o.toastMark.editMarkdown(n, t, e)),
							o.eventEmitter.emit("updatePreview", n),
							r.setMeta("editResult", n).scrollIntoView());
					});
			}),
			(Ie.prototype.getChanged = function (e) {
				var n = "",
					r = e.content.size;
				return (
					e.content.nodesBetween(0, r, function (e, t) {
						e.isText
							? (n += e.text.slice(Math.max(0, t) - t, r - t))
							: e.isBlock && 0 < t && (n += "\n");
					}),
					n
				);
			}),
			(Ie.prototype.setSelection = function (e, t) {
				var n = this.view.state.tr,
					e = ys(n.doc, e, (t = void 0 === t ? e : t)),
					t = e[0];
				this.view.dispatch(n.setSelection(Se(n, t, e[1])).scrollIntoView());
			}),
			(Ie.prototype.replaceSelection = function (e, t, n) {
				var r = this.view.state,
					o = r.tr,
					i = r.schema,
					r = r.doc,
					e = e.split(El).map(function (e) {
						return ri(i, Mi(e, i));
					}),
					e = new Ke(Je.from(e), 1, 1);
				this.focus(),
					(n =
						t && n
							? ((t = (r = ys(r, t, n))[0]), o.replaceRange(t, r[1], e))
							: o.replaceSelection(e)),
					this.view.dispatch(n.scrollIntoView());
			}),
			(Ie.prototype.deleteSelection = function (e, t) {
				var n = this.view.state,
					r = n.tr;
				(t =
					e && t
						? ((e = (n = ys(n.doc, e, t))[0]), r.deleteRange(e, n[1]))
						: r.deleteSelection()),
					this.view.dispatch(t.scrollIntoView());
			}),
			(Ie.prototype.getSelectedText = function (e, t) {
				var n = this.view.state,
					r = n.doc,
					n = n.selection,
					o = n.from,
					n = n.to;
				return (
					e && t && ((o = (e = ys(r, e, t))[0]), (n = e[1])), r.textBetween(o, n, "\n")
				);
			}),
			(Ie.prototype.getSelection = function () {
				var e = this.view.state.selection,
					t = e.from;
				return gs(this.view.state.tr.doc, t, e.to);
			}),
			(Ie.prototype.setMarkdown = function (e, t) {
				void 0 === t && (t = !0);
				var e = e.split(El),
					n = this.view.state,
					r = n.tr,
					o = n.doc,
					i = n.schema,
					n = e.map(function (e) {
						return ri(i, Mi(e, i));
					});
				this.view.dispatch(r.replaceWith(0, o.content.size, n)),
					t && this.moveCursorToEnd(!0);
			}),
			(Ie.prototype.addWidget = function (e, t, n) {
				var r = this.view.state,
					o = r.tr,
					i = r.selection,
					r = n ? ys(r.doc, n, n)[0] : i.to;
				this.view.dispatch(o.setMeta("widget", { pos: r, node: e, style: t }));
			}),
			(Ie.prototype.replaceWithWidget = function (e, t, n) {
				var r = this.view.state,
					o = r.tr,
					i = r.schema,
					r = ys(r.doc, e, t),
					e = Mi(n, i);
				this.view.dispatch(o.replaceWith(r[0], r[1], e));
			}),
			(Ie.prototype.getRangeInfoOfNode = function (e) {
				var t = this.view.state,
					n = t.doc,
					e = e || gs(n, t.selection.from)[0],
					n = this.toastMark.findNodeAtPosition(e);
				return (
					((n =
						"text" === n.type && "paragraph" !== n.parent.type
							? n.parent
							: n).sourcepos[1][1] += 1),
					{ range: n.sourcepos, type: n.type }
				);
			}),
			(Ie.prototype.getMarkdown = function () {
				return this.toastMark.getLineTexts().map(ki).join("\n");
			}),
			(Ie.prototype.getToastMark = function () {
				return this.toastMark;
			});
		var Nl = Ie,
			xe = ye(349),
			Ol = ye.n(xe),
			Me = ye(348),
			Dl = ye.n(Me),
			Al = function (e, t) {
				return (Al =
					Object.setPrototypeOf ||
					({ __proto__: [] } instanceof Array
						? function (e, t) {
								e.__proto__ = t;
							}
						: function (e, t) {
								for (var n in t)
									Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
							}))(e, t);
			};
		function Ll(e, t) {
			if ("function" != typeof t && null !== t)
				throw new TypeError(
					"Class extends value " + String(t) + " is not a constructor or null"
				);
			function n() {
				this.constructor = e;
			}
			Al(e, t),
				(e.prototype =
					null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
		}
		var Il = function () {
			return (Il =
				Object.assign ||
				function (e) {
					for (var t, n = 1, r = arguments.length; n < r; n++)
						for (var o in (t = arguments[n]))
							Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
					return e;
				}).apply(this, arguments);
		};
		function Rl(e, t, n) {
			if (n || 2 === arguments.length)
				for (var r, o = 0, i = t.length; o < i; o++)
					(!r && o in t) || ((r = r || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
			return e.concat(r || Array.prototype.slice.call(t));
		}
		var Hn =
				"undefined" != typeof globalThis
					? globalThis
					: "undefined" != typeof window
						? window
						: void 0 !== ye.g
							? ye.g
							: "undefined" != typeof self
								? self
								: {},
			Pl = {};
		function Bl(e, t, n) {
			var r,
				o,
				i,
				s,
				a = "";
			for (
				"string" != typeof t && ((n = t), (t = Bl.defaultChars)),
					void 0 === n && (n = !0),
					s = (e => {
						var t,
							n,
							r = Pl[e];
						if (!r) {
							for (r = Pl[e] = [], t = 0; t < 128; t++)
								(n = String.fromCharCode(t)),
									/^[0-9a-z]$/i.test(n)
										? r.push(n)
										: r.push(
												"%" + ("0" + t.toString(16).toUpperCase()).slice(-2)
											);
							for (t = 0; t < e.length; t++) r[e.charCodeAt(t)] = e[t];
						}
						return r;
					})(t),
					r = 0,
					o = e.length;
				r < o;
				r++
			)
				(i = e.charCodeAt(r)),
					n && 37 === i && r + 2 < o && /^[0-9a-f]{2}$/i.test(e.slice(r + 1, r + 3))
						? ((a += e.slice(r, r + 3)), (r += 2))
						: i < 128
							? (a += s[i])
							: 55296 <= i && i <= 57343
								? 55296 <= i &&
									i <= 56319 &&
									r + 1 < o &&
									56320 <= (i = e.charCodeAt(r + 1)) &&
									i <= 57343
									? ((a += encodeURIComponent(e[r] + e[r + 1])), r++)
									: (a += "%EF%BF%BD")
								: (a += encodeURIComponent(e[r]));
			return a;
		}
		(Bl.defaultChars = ";/?:@&=+$,-_.!~*'()#"), (Bl.componentChars = "-_.!~*'()");
		var Fl = Bl,
			Hl = {},
			xe = {},
			Me = {
				Aacute: "Á",
				aacute: "á",
				Abreve: "Ă",
				abreve: "ă",
				ac: "∾",
				acd: "∿",
				acE: "∾̳",
				Acirc: "Â",
				acirc: "â",
				acute: "´",
				Acy: "А",
				acy: "а",
				AElig: "Æ",
				aelig: "æ",
				af: "⁡",
				Afr: "𝔄",
				afr: "𝔞",
				Agrave: "À",
				agrave: "à",
				alefsym: "ℵ",
				aleph: "ℵ",
				Alpha: "Α",
				alpha: "α",
				Amacr: "Ā",
				amacr: "ā",
				amalg: "⨿",
				amp: "&",
				AMP: "&",
				andand: "⩕",
				And: "⩓",
				and: "∧",
				andd: "⩜",
				andslope: "⩘",
				andv: "⩚",
				ang: "∠",
				ange: "⦤",
				angle: "∠",
				angmsdaa: "⦨",
				angmsdab: "⦩",
				angmsdac: "⦪",
				angmsdad: "⦫",
				angmsdae: "⦬",
				angmsdaf: "⦭",
				angmsdag: "⦮",
				angmsdah: "⦯",
				angmsd: "∡",
				angrt: "∟",
				angrtvb: "⊾",
				angrtvbd: "⦝",
				angsph: "∢",
				angst: "Å",
				angzarr: "⍼",
				Aogon: "Ą",
				aogon: "ą",
				Aopf: "𝔸",
				aopf: "𝕒",
				apacir: "⩯",
				ap: "≈",
				apE: "⩰",
				ape: "≊",
				apid: "≋",
				apos: "'",
				ApplyFunction: "⁡",
				approx: "≈",
				approxeq: "≊",
				Aring: "Å",
				aring: "å",
				Ascr: "𝒜",
				ascr: "𝒶",
				Assign: "≔",
				ast: "*",
				asymp: "≈",
				asympeq: "≍",
				Atilde: "Ã",
				atilde: "ã",
				Auml: "Ä",
				auml: "ä",
				awconint: "∳",
				awint: "⨑",
				backcong: "≌",
				backepsilon: "϶",
				backprime: "‵",
				backsim: "∽",
				backsimeq: "⋍",
				Backslash: "∖",
				Barv: "⫧",
				barvee: "⊽",
				barwed: "⌅",
				Barwed: "⌆",
				barwedge: "⌅",
				bbrk: "⎵",
				bbrktbrk: "⎶",
				bcong: "≌",
				Bcy: "Б",
				bcy: "б",
				bdquo: "„",
				becaus: "∵",
				because: "∵",
				Because: "∵",
				bemptyv: "⦰",
				bepsi: "϶",
				bernou: "ℬ",
				Bernoullis: "ℬ",
				Beta: "Β",
				beta: "β",
				beth: "ℶ",
				between: "≬",
				Bfr: "𝔅",
				bfr: "𝔟",
				bigcap: "⋂",
				bigcirc: "◯",
				bigcup: "⋃",
				bigodot: "⨀",
				bigoplus: "⨁",
				bigotimes: "⨂",
				bigsqcup: "⨆",
				bigstar: "★",
				bigtriangledown: "▽",
				bigtriangleup: "△",
				biguplus: "⨄",
				bigvee: "⋁",
				bigwedge: "⋀",
				bkarow: "⤍",
				blacklozenge: "⧫",
				blacksquare: "▪",
				blacktriangle: "▴",
				blacktriangledown: "▾",
				blacktriangleleft: "◂",
				blacktriangleright: "▸",
				blank: "␣",
				blk12: "▒",
				blk14: "░",
				blk34: "▓",
				block: "█",
				bne: "=⃥",
				bnequiv: "≡⃥",
				bNot: "⫭",
				bnot: "⌐",
				Bopf: "𝔹",
				bopf: "𝕓",
				bot: "⊥",
				bottom: "⊥",
				bowtie: "⋈",
				boxbox: "⧉",
				boxdl: "┐",
				boxdL: "╕",
				boxDl: "╖",
				boxDL: "╗",
				boxdr: "┌",
				boxdR: "╒",
				boxDr: "╓",
				boxDR: "╔",
				boxh: "─",
				boxH: "═",
				boxhd: "┬",
				boxHd: "╤",
				boxhD: "╥",
				boxHD: "╦",
				boxhu: "┴",
				boxHu: "╧",
				boxhU: "╨",
				boxHU: "╩",
				boxminus: "⊟",
				boxplus: "⊞",
				boxtimes: "⊠",
				boxul: "┘",
				boxuL: "╛",
				boxUl: "╜",
				boxUL: "╝",
				boxur: "└",
				boxuR: "╘",
				boxUr: "╙",
				boxUR: "╚",
				boxv: "│",
				boxV: "║",
				boxvh: "┼",
				boxvH: "╪",
				boxVh: "╫",
				boxVH: "╬",
				boxvl: "┤",
				boxvL: "╡",
				boxVl: "╢",
				boxVL: "╣",
				boxvr: "├",
				boxvR: "╞",
				boxVr: "╟",
				boxVR: "╠",
				bprime: "‵",
				breve: "˘",
				Breve: "˘",
				brvbar: "¦",
				bscr: "𝒷",
				Bscr: "ℬ",
				bsemi: "⁏",
				bsim: "∽",
				bsime: "⋍",
				bsolb: "⧅",
				bsol: "\\",
				bsolhsub: "⟈",
				bull: "•",
				bullet: "•",
				bump: "≎",
				bumpE: "⪮",
				bumpe: "≏",
				Bumpeq: "≎",
				bumpeq: "≏",
				Cacute: "Ć",
				cacute: "ć",
				capand: "⩄",
				capbrcup: "⩉",
				capcap: "⩋",
				cap: "∩",
				Cap: "⋒",
				capcup: "⩇",
				capdot: "⩀",
				CapitalDifferentialD: "ⅅ",
				caps: "∩︀",
				caret: "⁁",
				caron: "ˇ",
				Cayleys: "ℭ",
				ccaps: "⩍",
				Ccaron: "Č",
				ccaron: "č",
				Ccedil: "Ç",
				ccedil: "ç",
				Ccirc: "Ĉ",
				ccirc: "ĉ",
				Cconint: "∰",
				ccups: "⩌",
				ccupssm: "⩐",
				Cdot: "Ċ",
				cdot: "ċ",
				cedil: "¸",
				Cedilla: "¸",
				cemptyv: "⦲",
				cent: "¢",
				centerdot: "·",
				CenterDot: "·",
				cfr: "𝔠",
				Cfr: "ℭ",
				CHcy: "Ч",
				chcy: "ч",
				check: "✓",
				checkmark: "✓",
				Chi: "Χ",
				chi: "χ",
				circ: "ˆ",
				circeq: "≗",
				circlearrowleft: "↺",
				circlearrowright: "↻",
				circledast: "⊛",
				circledcirc: "⊚",
				circleddash: "⊝",
				CircleDot: "⊙",
				circledR: "®",
				circledS: "Ⓢ",
				CircleMinus: "⊖",
				CirclePlus: "⊕",
				CircleTimes: "⊗",
				cir: "○",
				cirE: "⧃",
				cire: "≗",
				cirfnint: "⨐",
				cirmid: "⫯",
				cirscir: "⧂",
				ClockwiseContourIntegral: "∲",
				CloseCurlyDoubleQuote: "”",
				CloseCurlyQuote: "’",
				clubs: "♣",
				clubsuit: "♣",
				colon: ":",
				Colon: "∷",
				Colone: "⩴",
				colone: "≔",
				coloneq: "≔",
				comma: ",",
				commat: "@",
				comp: "∁",
				compfn: "∘",
				complement: "∁",
				complexes: "ℂ",
				cong: "≅",
				congdot: "⩭",
				Congruent: "≡",
				conint: "∮",
				Conint: "∯",
				ContourIntegral: "∮",
				copf: "𝕔",
				Copf: "ℂ",
				coprod: "∐",
				Coproduct: "∐",
				copy: "©",
				COPY: "©",
				copysr: "℗",
				CounterClockwiseContourIntegral: "∳",
				crarr: "↵",
				cross: "✗",
				Cross: "⨯",
				Cscr: "𝒞",
				cscr: "𝒸",
				csub: "⫏",
				csube: "⫑",
				csup: "⫐",
				csupe: "⫒",
				ctdot: "⋯",
				cudarrl: "⤸",
				cudarrr: "⤵",
				cuepr: "⋞",
				cuesc: "⋟",
				cularr: "↶",
				cularrp: "⤽",
				cupbrcap: "⩈",
				cupcap: "⩆",
				CupCap: "≍",
				cup: "∪",
				Cup: "⋓",
				cupcup: "⩊",
				cupdot: "⊍",
				cupor: "⩅",
				cups: "∪︀",
				curarr: "↷",
				curarrm: "⤼",
				curlyeqprec: "⋞",
				curlyeqsucc: "⋟",
				curlyvee: "⋎",
				curlywedge: "⋏",
				curren: "¤",
				curvearrowleft: "↶",
				curvearrowright: "↷",
				cuvee: "⋎",
				cuwed: "⋏",
				cwconint: "∲",
				cwint: "∱",
				cylcty: "⌭",
				dagger: "†",
				Dagger: "‡",
				daleth: "ℸ",
				darr: "↓",
				Darr: "↡",
				dArr: "⇓",
				dash: "‐",
				Dashv: "⫤",
				dashv: "⊣",
				dbkarow: "⤏",
				dblac: "˝",
				Dcaron: "Ď",
				dcaron: "ď",
				Dcy: "Д",
				dcy: "д",
				ddagger: "‡",
				ddarr: "⇊",
				DD: "ⅅ",
				dd: "ⅆ",
				DDotrahd: "⤑",
				ddotseq: "⩷",
				deg: "°",
				Del: "∇",
				Delta: "Δ",
				delta: "δ",
				demptyv: "⦱",
				dfisht: "⥿",
				Dfr: "𝔇",
				dfr: "𝔡",
				dHar: "⥥",
				dharl: "⇃",
				dharr: "⇂",
				DiacriticalAcute: "´",
				DiacriticalDot: "˙",
				DiacriticalDoubleAcute: "˝",
				DiacriticalGrave: "`",
				DiacriticalTilde: "˜",
				diam: "⋄",
				diamond: "⋄",
				Diamond: "⋄",
				diamondsuit: "♦",
				diams: "♦",
				die: "¨",
				DifferentialD: "ⅆ",
				digamma: "ϝ",
				disin: "⋲",
				div: "÷",
				divide: "÷",
				divideontimes: "⋇",
				divonx: "⋇",
				DJcy: "Ђ",
				djcy: "ђ",
				dlcorn: "⌞",
				dlcrop: "⌍",
				dollar: "$",
				Dopf: "𝔻",
				dopf: "𝕕",
				Dot: "¨",
				dot: "˙",
				DotDot: "⃜",
				doteq: "≐",
				doteqdot: "≑",
				DotEqual: "≐",
				dotminus: "∸",
				dotplus: "∔",
				dotsquare: "⊡",
				doublebarwedge: "⌆",
				DoubleContourIntegral: "∯",
				DoubleDot: "¨",
				DoubleDownArrow: "⇓",
				DoubleLeftArrow: "⇐",
				DoubleLeftRightArrow: "⇔",
				DoubleLeftTee: "⫤",
				DoubleLongLeftArrow: "⟸",
				DoubleLongLeftRightArrow: "⟺",
				DoubleLongRightArrow: "⟹",
				DoubleRightArrow: "⇒",
				DoubleRightTee: "⊨",
				DoubleUpArrow: "⇑",
				DoubleUpDownArrow: "⇕",
				DoubleVerticalBar: "∥",
				DownArrowBar: "⤓",
				downarrow: "↓",
				DownArrow: "↓",
				Downarrow: "⇓",
				DownArrowUpArrow: "⇵",
				DownBreve: "̑",
				downdownarrows: "⇊",
				downharpoonleft: "⇃",
				downharpoonright: "⇂",
				DownLeftRightVector: "⥐",
				DownLeftTeeVector: "⥞",
				DownLeftVectorBar: "⥖",
				DownLeftVector: "↽",
				DownRightTeeVector: "⥟",
				DownRightVectorBar: "⥗",
				DownRightVector: "⇁",
				DownTeeArrow: "↧",
				DownTee: "⊤",
				drbkarow: "⤐",
				drcorn: "⌟",
				drcrop: "⌌",
				Dscr: "𝒟",
				dscr: "𝒹",
				DScy: "Ѕ",
				dscy: "ѕ",
				dsol: "⧶",
				Dstrok: "Đ",
				dstrok: "đ",
				dtdot: "⋱",
				dtri: "▿",
				dtrif: "▾",
				duarr: "⇵",
				duhar: "⥯",
				dwangle: "⦦",
				DZcy: "Џ",
				dzcy: "џ",
				dzigrarr: "⟿",
				Eacute: "É",
				eacute: "é",
				easter: "⩮",
				Ecaron: "Ě",
				ecaron: "ě",
				Ecirc: "Ê",
				ecirc: "ê",
				ecir: "≖",
				ecolon: "≕",
				Ecy: "Э",
				ecy: "э",
				eDDot: "⩷",
				Edot: "Ė",
				edot: "ė",
				eDot: "≑",
				ee: "ⅇ",
				efDot: "≒",
				Efr: "𝔈",
				efr: "𝔢",
				eg: "⪚",
				Egrave: "È",
				egrave: "è",
				egs: "⪖",
				egsdot: "⪘",
				el: "⪙",
				Element: "∈",
				elinters: "⏧",
				ell: "ℓ",
				els: "⪕",
				elsdot: "⪗",
				Emacr: "Ē",
				emacr: "ē",
				empty: "∅",
				emptyset: "∅",
				EmptySmallSquare: "◻",
				emptyv: "∅",
				EmptyVerySmallSquare: "▫",
				emsp13: " ",
				emsp14: " ",
				emsp: " ",
				ENG: "Ŋ",
				eng: "ŋ",
				ensp: " ",
				Eogon: "Ę",
				eogon: "ę",
				Eopf: "𝔼",
				eopf: "𝕖",
				epar: "⋕",
				eparsl: "⧣",
				eplus: "⩱",
				epsi: "ε",
				Epsilon: "Ε",
				epsilon: "ε",
				epsiv: "ϵ",
				eqcirc: "≖",
				eqcolon: "≕",
				eqsim: "≂",
				eqslantgtr: "⪖",
				eqslantless: "⪕",
				Equal: "⩵",
				equals: "=",
				EqualTilde: "≂",
				equest: "≟",
				Equilibrium: "⇌",
				equiv: "≡",
				equivDD: "⩸",
				eqvparsl: "⧥",
				erarr: "⥱",
				erDot: "≓",
				escr: "ℯ",
				Escr: "ℰ",
				esdot: "≐",
				Esim: "⩳",
				esim: "≂",
				Eta: "Η",
				eta: "η",
				ETH: "Ð",
				eth: "ð",
				Euml: "Ë",
				euml: "ë",
				euro: "€",
				excl: "!",
				exist: "∃",
				Exists: "∃",
				expectation: "ℰ",
				exponentiale: "ⅇ",
				ExponentialE: "ⅇ",
				fallingdotseq: "≒",
				Fcy: "Ф",
				fcy: "ф",
				female: "♀",
				ffilig: "ﬃ",
				fflig: "ﬀ",
				ffllig: "ﬄ",
				Ffr: "𝔉",
				ffr: "𝔣",
				filig: "ﬁ",
				FilledSmallSquare: "◼",
				FilledVerySmallSquare: "▪",
				fjlig: "fj",
				flat: "♭",
				fllig: "ﬂ",
				fltns: "▱",
				fnof: "ƒ",
				Fopf: "𝔽",
				fopf: "𝕗",
				forall: "∀",
				ForAll: "∀",
				fork: "⋔",
				forkv: "⫙",
				Fouriertrf: "ℱ",
				fpartint: "⨍",
				frac12: "½",
				frac13: "⅓",
				frac14: "¼",
				frac15: "⅕",
				frac16: "⅙",
				frac18: "⅛",
				frac23: "⅔",
				frac25: "⅖",
				frac34: "¾",
				frac35: "⅗",
				frac38: "⅜",
				frac45: "⅘",
				frac56: "⅚",
				frac58: "⅝",
				frac78: "⅞",
				frasl: "⁄",
				frown: "⌢",
				fscr: "𝒻",
				Fscr: "ℱ",
				gacute: "ǵ",
				Gamma: "Γ",
				gamma: "γ",
				Gammad: "Ϝ",
				gammad: "ϝ",
				gap: "⪆",
				Gbreve: "Ğ",
				gbreve: "ğ",
				Gcedil: "Ģ",
				Gcirc: "Ĝ",
				gcirc: "ĝ",
				Gcy: "Г",
				gcy: "г",
				Gdot: "Ġ",
				gdot: "ġ",
				ge: "≥",
				gE: "≧",
				gEl: "⪌",
				gel: "⋛",
				geq: "≥",
				geqq: "≧",
				geqslant: "⩾",
				gescc: "⪩",
				ges: "⩾",
				gesdot: "⪀",
				gesdoto: "⪂",
				gesdotol: "⪄",
				gesl: "⋛︀",
				gesles: "⪔",
				Gfr: "𝔊",
				gfr: "𝔤",
				gg: "≫",
				Gg: "⋙",
				ggg: "⋙",
				gimel: "ℷ",
				GJcy: "Ѓ",
				gjcy: "ѓ",
				gla: "⪥",
				gl: "≷",
				glE: "⪒",
				glj: "⪤",
				gnap: "⪊",
				gnapprox: "⪊",
				gne: "⪈",
				gnE: "≩",
				gneq: "⪈",
				gneqq: "≩",
				gnsim: "⋧",
				Gopf: "𝔾",
				gopf: "𝕘",
				grave: "`",
				GreaterEqual: "≥",
				GreaterEqualLess: "⋛",
				GreaterFullEqual: "≧",
				GreaterGreater: "⪢",
				GreaterLess: "≷",
				GreaterSlantEqual: "⩾",
				GreaterTilde: "≳",
				Gscr: "𝒢",
				gscr: "ℊ",
				gsim: "≳",
				gsime: "⪎",
				gsiml: "⪐",
				gtcc: "⪧",
				gtcir: "⩺",
				gt: ">",
				GT: ">",
				Gt: "≫",
				gtdot: "⋗",
				gtlPar: "⦕",
				gtquest: "⩼",
				gtrapprox: "⪆",
				gtrarr: "⥸",
				gtrdot: "⋗",
				gtreqless: "⋛",
				gtreqqless: "⪌",
				gtrless: "≷",
				gtrsim: "≳",
				gvertneqq: "≩︀",
				gvnE: "≩︀",
				Hacek: "ˇ",
				hairsp: " ",
				half: "½",
				hamilt: "ℋ",
				HARDcy: "Ъ",
				hardcy: "ъ",
				harrcir: "⥈",
				harr: "↔",
				hArr: "⇔",
				harrw: "↭",
				Hat: "^",
				hbar: "ℏ",
				Hcirc: "Ĥ",
				hcirc: "ĥ",
				hearts: "♥",
				heartsuit: "♥",
				hellip: "…",
				hercon: "⊹",
				hfr: "𝔥",
				Hfr: "ℌ",
				HilbertSpace: "ℋ",
				hksearow: "⤥",
				hkswarow: "⤦",
				hoarr: "⇿",
				homtht: "∻",
				hookleftarrow: "↩",
				hookrightarrow: "↪",
				hopf: "𝕙",
				Hopf: "ℍ",
				horbar: "―",
				HorizontalLine: "─",
				hscr: "𝒽",
				Hscr: "ℋ",
				hslash: "ℏ",
				Hstrok: "Ħ",
				hstrok: "ħ",
				HumpDownHump: "≎",
				HumpEqual: "≏",
				hybull: "⁃",
				hyphen: "‐",
				Iacute: "Í",
				iacute: "í",
				ic: "⁣",
				Icirc: "Î",
				icirc: "î",
				Icy: "И",
				icy: "и",
				Idot: "İ",
				IEcy: "Е",
				iecy: "е",
				iexcl: "¡",
				iff: "⇔",
				ifr: "𝔦",
				Ifr: "ℑ",
				Igrave: "Ì",
				igrave: "ì",
				ii: "ⅈ",
				iiiint: "⨌",
				iiint: "∭",
				iinfin: "⧜",
				iiota: "℩",
				IJlig: "Ĳ",
				ijlig: "ĳ",
				Imacr: "Ī",
				imacr: "ī",
				image: "ℑ",
				ImaginaryI: "ⅈ",
				imagline: "ℐ",
				imagpart: "ℑ",
				imath: "ı",
				Im: "ℑ",
				imof: "⊷",
				imped: "Ƶ",
				Implies: "⇒",
				incare: "℅",
				in: "∈",
				infin: "∞",
				infintie: "⧝",
				inodot: "ı",
				intcal: "⊺",
				int: "∫",
				Int: "∬",
				integers: "ℤ",
				Integral: "∫",
				intercal: "⊺",
				Intersection: "⋂",
				intlarhk: "⨗",
				intprod: "⨼",
				InvisibleComma: "⁣",
				InvisibleTimes: "⁢",
				IOcy: "Ё",
				iocy: "ё",
				Iogon: "Į",
				iogon: "į",
				Iopf: "𝕀",
				iopf: "𝕚",
				Iota: "Ι",
				iota: "ι",
				iprod: "⨼",
				iquest: "¿",
				iscr: "𝒾",
				Iscr: "ℐ",
				isin: "∈",
				isindot: "⋵",
				isinE: "⋹",
				isins: "⋴",
				isinsv: "⋳",
				isinv: "∈",
				it: "⁢",
				Itilde: "Ĩ",
				itilde: "ĩ",
				Iukcy: "І",
				iukcy: "і",
				Iuml: "Ï",
				iuml: "ï",
				Jcirc: "Ĵ",
				jcirc: "ĵ",
				Jcy: "Й",
				jcy: "й",
				Jfr: "𝔍",
				jfr: "𝔧",
				jmath: "ȷ",
				Jopf: "𝕁",
				jopf: "𝕛",
				Jscr: "𝒥",
				jscr: "𝒿",
				Jsercy: "Ј",
				jsercy: "ј",
				Jukcy: "Є",
				jukcy: "є",
				Kappa: "Κ",
				kappa: "κ",
				kappav: "ϰ",
				Kcedil: "Ķ",
				kcedil: "ķ",
				Kcy: "К",
				kcy: "к",
				Kfr: "𝔎",
				kfr: "𝔨",
				kgreen: "ĸ",
				KHcy: "Х",
				khcy: "х",
				KJcy: "Ќ",
				kjcy: "ќ",
				Kopf: "𝕂",
				kopf: "𝕜",
				Kscr: "𝒦",
				kscr: "𝓀",
				lAarr: "⇚",
				Lacute: "Ĺ",
				lacute: "ĺ",
				laemptyv: "⦴",
				lagran: "ℒ",
				Lambda: "Λ",
				lambda: "λ",
				lang: "⟨",
				Lang: "⟪",
				langd: "⦑",
				langle: "⟨",
				lap: "⪅",
				Laplacetrf: "ℒ",
				laquo: "«",
				larrb: "⇤",
				larrbfs: "⤟",
				larr: "←",
				Larr: "↞",
				lArr: "⇐",
				larrfs: "⤝",
				larrhk: "↩",
				larrlp: "↫",
				larrpl: "⤹",
				larrsim: "⥳",
				larrtl: "↢",
				latail: "⤙",
				lAtail: "⤛",
				lat: "⪫",
				late: "⪭",
				lates: "⪭︀",
				lbarr: "⤌",
				lBarr: "⤎",
				lbbrk: "❲",
				lbrace: "{",
				lbrack: "[",
				lbrke: "⦋",
				lbrksld: "⦏",
				lbrkslu: "⦍",
				Lcaron: "Ľ",
				lcaron: "ľ",
				Lcedil: "Ļ",
				lcedil: "ļ",
				lceil: "⌈",
				lcub: "{",
				Lcy: "Л",
				lcy: "л",
				ldca: "⤶",
				ldquo: "“",
				ldquor: "„",
				ldrdhar: "⥧",
				ldrushar: "⥋",
				ldsh: "↲",
				le: "≤",
				lE: "≦",
				LeftAngleBracket: "⟨",
				LeftArrowBar: "⇤",
				leftarrow: "←",
				LeftArrow: "←",
				Leftarrow: "⇐",
				LeftArrowRightArrow: "⇆",
				leftarrowtail: "↢",
				LeftCeiling: "⌈",
				LeftDoubleBracket: "⟦",
				LeftDownTeeVector: "⥡",
				LeftDownVectorBar: "⥙",
				LeftDownVector: "⇃",
				LeftFloor: "⌊",
				leftharpoondown: "↽",
				leftharpoonup: "↼",
				leftleftarrows: "⇇",
				leftrightarrow: "↔",
				LeftRightArrow: "↔",
				Leftrightarrow: "⇔",
				leftrightarrows: "⇆",
				leftrightharpoons: "⇋",
				leftrightsquigarrow: "↭",
				LeftRightVector: "⥎",
				LeftTeeArrow: "↤",
				LeftTee: "⊣",
				LeftTeeVector: "⥚",
				leftthreetimes: "⋋",
				LeftTriangleBar: "⧏",
				LeftTriangle: "⊲",
				LeftTriangleEqual: "⊴",
				LeftUpDownVector: "⥑",
				LeftUpTeeVector: "⥠",
				LeftUpVectorBar: "⥘",
				LeftUpVector: "↿",
				LeftVectorBar: "⥒",
				LeftVector: "↼",
				lEg: "⪋",
				leg: "⋚",
				leq: "≤",
				leqq: "≦",
				leqslant: "⩽",
				lescc: "⪨",
				les: "⩽",
				lesdot: "⩿",
				lesdoto: "⪁",
				lesdotor: "⪃",
				lesg: "⋚︀",
				lesges: "⪓",
				lessapprox: "⪅",
				lessdot: "⋖",
				lesseqgtr: "⋚",
				lesseqqgtr: "⪋",
				LessEqualGreater: "⋚",
				LessFullEqual: "≦",
				LessGreater: "≶",
				lessgtr: "≶",
				LessLess: "⪡",
				lesssim: "≲",
				LessSlantEqual: "⩽",
				LessTilde: "≲",
				lfisht: "⥼",
				lfloor: "⌊",
				Lfr: "𝔏",
				lfr: "𝔩",
				lg: "≶",
				lgE: "⪑",
				lHar: "⥢",
				lhard: "↽",
				lharu: "↼",
				lharul: "⥪",
				lhblk: "▄",
				LJcy: "Љ",
				ljcy: "љ",
				llarr: "⇇",
				ll: "≪",
				Ll: "⋘",
				llcorner: "⌞",
				Lleftarrow: "⇚",
				llhard: "⥫",
				lltri: "◺",
				Lmidot: "Ŀ",
				lmidot: "ŀ",
				lmoustache: "⎰",
				lmoust: "⎰",
				lnap: "⪉",
				lnapprox: "⪉",
				lne: "⪇",
				lnE: "≨",
				lneq: "⪇",
				lneqq: "≨",
				lnsim: "⋦",
				loang: "⟬",
				loarr: "⇽",
				lobrk: "⟦",
				longleftarrow: "⟵",
				LongLeftArrow: "⟵",
				Longleftarrow: "⟸",
				longleftrightarrow: "⟷",
				LongLeftRightArrow: "⟷",
				Longleftrightarrow: "⟺",
				longmapsto: "⟼",
				longrightarrow: "⟶",
				LongRightArrow: "⟶",
				Longrightarrow: "⟹",
				looparrowleft: "↫",
				looparrowright: "↬",
				lopar: "⦅",
				Lopf: "𝕃",
				lopf: "𝕝",
				loplus: "⨭",
				lotimes: "⨴",
				lowast: "∗",
				lowbar: "_",
				LowerLeftArrow: "↙",
				LowerRightArrow: "↘",
				loz: "◊",
				lozenge: "◊",
				lozf: "⧫",
				lpar: "(",
				lparlt: "⦓",
				lrarr: "⇆",
				lrcorner: "⌟",
				lrhar: "⇋",
				lrhard: "⥭",
				lrm: "‎",
				lrtri: "⊿",
				lsaquo: "‹",
				lscr: "𝓁",
				Lscr: "ℒ",
				lsh: "↰",
				Lsh: "↰",
				lsim: "≲",
				lsime: "⪍",
				lsimg: "⪏",
				lsqb: "[",
				lsquo: "‘",
				lsquor: "‚",
				Lstrok: "Ł",
				lstrok: "ł",
				ltcc: "⪦",
				ltcir: "⩹",
				lt: "<",
				LT: "<",
				Lt: "≪",
				ltdot: "⋖",
				lthree: "⋋",
				ltimes: "⋉",
				ltlarr: "⥶",
				ltquest: "⩻",
				ltri: "◃",
				ltrie: "⊴",
				ltrif: "◂",
				ltrPar: "⦖",
				lurdshar: "⥊",
				luruhar: "⥦",
				lvertneqq: "≨︀",
				lvnE: "≨︀",
				macr: "¯",
				male: "♂",
				malt: "✠",
				maltese: "✠",
				Map: "⤅",
				map: "↦",
				mapsto: "↦",
				mapstodown: "↧",
				mapstoleft: "↤",
				mapstoup: "↥",
				marker: "▮",
				mcomma: "⨩",
				Mcy: "М",
				mcy: "м",
				mdash: "—",
				mDDot: "∺",
				measuredangle: "∡",
				MediumSpace: " ",
				Mellintrf: "ℳ",
				Mfr: "𝔐",
				mfr: "𝔪",
				mho: "℧",
				micro: "µ",
				midast: "*",
				midcir: "⫰",
				mid: "∣",
				middot: "·",
				minusb: "⊟",
				minus: "−",
				minusd: "∸",
				minusdu: "⨪",
				MinusPlus: "∓",
				mlcp: "⫛",
				mldr: "…",
				mnplus: "∓",
				models: "⊧",
				Mopf: "𝕄",
				mopf: "𝕞",
				mp: "∓",
				mscr: "𝓂",
				Mscr: "ℳ",
				mstpos: "∾",
				Mu: "Μ",
				mu: "μ",
				multimap: "⊸",
				mumap: "⊸",
				nabla: "∇",
				Nacute: "Ń",
				nacute: "ń",
				nang: "∠⃒",
				nap: "≉",
				napE: "⩰̸",
				napid: "≋̸",
				napos: "ŉ",
				napprox: "≉",
				natural: "♮",
				naturals: "ℕ",
				natur: "♮",
				nbsp: " ",
				nbump: "≎̸",
				nbumpe: "≏̸",
				ncap: "⩃",
				Ncaron: "Ň",
				ncaron: "ň",
				Ncedil: "Ņ",
				ncedil: "ņ",
				ncong: "≇",
				ncongdot: "⩭̸",
				ncup: "⩂",
				Ncy: "Н",
				ncy: "н",
				ndash: "–",
				nearhk: "⤤",
				nearr: "↗",
				neArr: "⇗",
				nearrow: "↗",
				ne: "≠",
				nedot: "≐̸",
				NegativeMediumSpace: "​",
				NegativeThickSpace: "​",
				NegativeThinSpace: "​",
				NegativeVeryThinSpace: "​",
				nequiv: "≢",
				nesear: "⤨",
				nesim: "≂̸",
				NestedGreaterGreater: "≫",
				NestedLessLess: "≪",
				NewLine: "\n",
				nexist: "∄",
				nexists: "∄",
				Nfr: "𝔑",
				nfr: "𝔫",
				ngE: "≧̸",
				nge: "≱",
				ngeq: "≱",
				ngeqq: "≧̸",
				ngeqslant: "⩾̸",
				nges: "⩾̸",
				nGg: "⋙̸",
				ngsim: "≵",
				nGt: "≫⃒",
				ngt: "≯",
				ngtr: "≯",
				nGtv: "≫̸",
				nharr: "↮",
				nhArr: "⇎",
				nhpar: "⫲",
				ni: "∋",
				nis: "⋼",
				nisd: "⋺",
				niv: "∋",
				NJcy: "Њ",
				njcy: "њ",
				nlarr: "↚",
				nlArr: "⇍",
				nldr: "‥",
				nlE: "≦̸",
				nle: "≰",
				nleftarrow: "↚",
				nLeftarrow: "⇍",
				nleftrightarrow: "↮",
				nLeftrightarrow: "⇎",
				nleq: "≰",
				nleqq: "≦̸",
				nleqslant: "⩽̸",
				nles: "⩽̸",
				nless: "≮",
				nLl: "⋘̸",
				nlsim: "≴",
				nLt: "≪⃒",
				nlt: "≮",
				nltri: "⋪",
				nltrie: "⋬",
				nLtv: "≪̸",
				nmid: "∤",
				NoBreak: "⁠",
				NonBreakingSpace: " ",
				nopf: "𝕟",
				Nopf: "ℕ",
				Not: "⫬",
				not: "¬",
				NotCongruent: "≢",
				NotCupCap: "≭",
				NotDoubleVerticalBar: "∦",
				NotElement: "∉",
				NotEqual: "≠",
				NotEqualTilde: "≂̸",
				NotExists: "∄",
				NotGreater: "≯",
				NotGreaterEqual: "≱",
				NotGreaterFullEqual: "≧̸",
				NotGreaterGreater: "≫̸",
				NotGreaterLess: "≹",
				NotGreaterSlantEqual: "⩾̸",
				NotGreaterTilde: "≵",
				NotHumpDownHump: "≎̸",
				NotHumpEqual: "≏̸",
				notin: "∉",
				notindot: "⋵̸",
				notinE: "⋹̸",
				notinva: "∉",
				notinvb: "⋷",
				notinvc: "⋶",
				NotLeftTriangleBar: "⧏̸",
				NotLeftTriangle: "⋪",
				NotLeftTriangleEqual: "⋬",
				NotLess: "≮",
				NotLessEqual: "≰",
				NotLessGreater: "≸",
				NotLessLess: "≪̸",
				NotLessSlantEqual: "⩽̸",
				NotLessTilde: "≴",
				NotNestedGreaterGreater: "⪢̸",
				NotNestedLessLess: "⪡̸",
				notni: "∌",
				notniva: "∌",
				notnivb: "⋾",
				notnivc: "⋽",
				NotPrecedes: "⊀",
				NotPrecedesEqual: "⪯̸",
				NotPrecedesSlantEqual: "⋠",
				NotReverseElement: "∌",
				NotRightTriangleBar: "⧐̸",
				NotRightTriangle: "⋫",
				NotRightTriangleEqual: "⋭",
				NotSquareSubset: "⊏̸",
				NotSquareSubsetEqual: "⋢",
				NotSquareSuperset: "⊐̸",
				NotSquareSupersetEqual: "⋣",
				NotSubset: "⊂⃒",
				NotSubsetEqual: "⊈",
				NotSucceeds: "⊁",
				NotSucceedsEqual: "⪰̸",
				NotSucceedsSlantEqual: "⋡",
				NotSucceedsTilde: "≿̸",
				NotSuperset: "⊃⃒",
				NotSupersetEqual: "⊉",
				NotTilde: "≁",
				NotTildeEqual: "≄",
				NotTildeFullEqual: "≇",
				NotTildeTilde: "≉",
				NotVerticalBar: "∤",
				nparallel: "∦",
				npar: "∦",
				nparsl: "⫽⃥",
				npart: "∂̸",
				npolint: "⨔",
				npr: "⊀",
				nprcue: "⋠",
				nprec: "⊀",
				npreceq: "⪯̸",
				npre: "⪯̸",
				nrarrc: "⤳̸",
				nrarr: "↛",
				nrArr: "⇏",
				nrarrw: "↝̸",
				nrightarrow: "↛",
				nRightarrow: "⇏",
				nrtri: "⋫",
				nrtrie: "⋭",
				nsc: "⊁",
				nsccue: "⋡",
				nsce: "⪰̸",
				Nscr: "𝒩",
				nscr: "𝓃",
				nshortmid: "∤",
				nshortparallel: "∦",
				nsim: "≁",
				nsime: "≄",
				nsimeq: "≄",
				nsmid: "∤",
				nspar: "∦",
				nsqsube: "⋢",
				nsqsupe: "⋣",
				nsub: "⊄",
				nsubE: "⫅̸",
				nsube: "⊈",
				nsubset: "⊂⃒",
				nsubseteq: "⊈",
				nsubseteqq: "⫅̸",
				nsucc: "⊁",
				nsucceq: "⪰̸",
				nsup: "⊅",
				nsupE: "⫆̸",
				nsupe: "⊉",
				nsupset: "⊃⃒",
				nsupseteq: "⊉",
				nsupseteqq: "⫆̸",
				ntgl: "≹",
				Ntilde: "Ñ",
				ntilde: "ñ",
				ntlg: "≸",
				ntriangleleft: "⋪",
				ntrianglelefteq: "⋬",
				ntriangleright: "⋫",
				ntrianglerighteq: "⋭",
				Nu: "Ν",
				nu: "ν",
				num: "#",
				numero: "№",
				numsp: " ",
				nvap: "≍⃒",
				nvdash: "⊬",
				nvDash: "⊭",
				nVdash: "⊮",
				nVDash: "⊯",
				nvge: "≥⃒",
				nvgt: ">⃒",
				nvHarr: "⤄",
				nvinfin: "⧞",
				nvlArr: "⤂",
				nvle: "≤⃒",
				nvlt: "<⃒",
				nvltrie: "⊴⃒",
				nvrArr: "⤃",
				nvrtrie: "⊵⃒",
				nvsim: "∼⃒",
				nwarhk: "⤣",
				nwarr: "↖",
				nwArr: "⇖",
				nwarrow: "↖",
				nwnear: "⤧",
				Oacute: "Ó",
				oacute: "ó",
				oast: "⊛",
				Ocirc: "Ô",
				ocirc: "ô",
				ocir: "⊚",
				Ocy: "О",
				ocy: "о",
				odash: "⊝",
				Odblac: "Ő",
				odblac: "ő",
				odiv: "⨸",
				odot: "⊙",
				odsold: "⦼",
				OElig: "Œ",
				oelig: "œ",
				ofcir: "⦿",
				Ofr: "𝔒",
				ofr: "𝔬",
				ogon: "˛",
				Ograve: "Ò",
				ograve: "ò",
				ogt: "⧁",
				ohbar: "⦵",
				ohm: "Ω",
				oint: "∮",
				olarr: "↺",
				olcir: "⦾",
				olcross: "⦻",
				oline: "‾",
				olt: "⧀",
				Omacr: "Ō",
				omacr: "ō",
				Omega: "Ω",
				omega: "ω",
				Omicron: "Ο",
				omicron: "ο",
				omid: "⦶",
				ominus: "⊖",
				Oopf: "𝕆",
				oopf: "𝕠",
				opar: "⦷",
				OpenCurlyDoubleQuote: "“",
				OpenCurlyQuote: "‘",
				operp: "⦹",
				oplus: "⊕",
				orarr: "↻",
				Or: "⩔",
				or: "∨",
				ord: "⩝",
				order: "ℴ",
				orderof: "ℴ",
				ordf: "ª",
				ordm: "º",
				origof: "⊶",
				oror: "⩖",
				orslope: "⩗",
				orv: "⩛",
				oS: "Ⓢ",
				Oscr: "𝒪",
				oscr: "ℴ",
				Oslash: "Ø",
				oslash: "ø",
				osol: "⊘",
				Otilde: "Õ",
				otilde: "õ",
				otimesas: "⨶",
				Otimes: "⨷",
				otimes: "⊗",
				Ouml: "Ö",
				ouml: "ö",
				ovbar: "⌽",
				OverBar: "‾",
				OverBrace: "⏞",
				OverBracket: "⎴",
				OverParenthesis: "⏜",
				para: "¶",
				parallel: "∥",
				par: "∥",
				parsim: "⫳",
				parsl: "⫽",
				part: "∂",
				PartialD: "∂",
				Pcy: "П",
				pcy: "п",
				percnt: "%",
				period: ".",
				permil: "‰",
				perp: "⊥",
				pertenk: "‱",
				Pfr: "𝔓",
				pfr: "𝔭",
				Phi: "Φ",
				phi: "φ",
				phiv: "ϕ",
				phmmat: "ℳ",
				phone: "☎",
				Pi: "Π",
				pi: "π",
				pitchfork: "⋔",
				piv: "ϖ",
				planck: "ℏ",
				planckh: "ℎ",
				plankv: "ℏ",
				plusacir: "⨣",
				plusb: "⊞",
				pluscir: "⨢",
				plus: "+",
				plusdo: "∔",
				plusdu: "⨥",
				pluse: "⩲",
				PlusMinus: "±",
				plusmn: "±",
				plussim: "⨦",
				plustwo: "⨧",
				pm: "±",
				Poincareplane: "ℌ",
				pointint: "⨕",
				popf: "𝕡",
				Popf: "ℙ",
				pound: "£",
				prap: "⪷",
				Pr: "⪻",
				pr: "≺",
				prcue: "≼",
				precapprox: "⪷",
				prec: "≺",
				preccurlyeq: "≼",
				Precedes: "≺",
				PrecedesEqual: "⪯",
				PrecedesSlantEqual: "≼",
				PrecedesTilde: "≾",
				preceq: "⪯",
				precnapprox: "⪹",
				precneqq: "⪵",
				precnsim: "⋨",
				pre: "⪯",
				prE: "⪳",
				precsim: "≾",
				prime: "′",
				Prime: "″",
				primes: "ℙ",
				prnap: "⪹",
				prnE: "⪵",
				prnsim: "⋨",
				prod: "∏",
				Product: "∏",
				profalar: "⌮",
				profline: "⌒",
				profsurf: "⌓",
				prop: "∝",
				Proportional: "∝",
				Proportion: "∷",
				propto: "∝",
				prsim: "≾",
				prurel: "⊰",
				Pscr: "𝒫",
				pscr: "𝓅",
				Psi: "Ψ",
				psi: "ψ",
				puncsp: " ",
				Qfr: "𝔔",
				qfr: "𝔮",
				qint: "⨌",
				qopf: "𝕢",
				Qopf: "ℚ",
				qprime: "⁗",
				Qscr: "𝒬",
				qscr: "𝓆",
				quaternions: "ℍ",
				quatint: "⨖",
				quest: "?",
				questeq: "≟",
				quot: '"',
				QUOT: '"',
				rAarr: "⇛",
				race: "∽̱",
				Racute: "Ŕ",
				racute: "ŕ",
				radic: "√",
				raemptyv: "⦳",
				rang: "⟩",
				Rang: "⟫",
				rangd: "⦒",
				range: "⦥",
				rangle: "⟩",
				raquo: "»",
				rarrap: "⥵",
				rarrb: "⇥",
				rarrbfs: "⤠",
				rarrc: "⤳",
				rarr: "→",
				Rarr: "↠",
				rArr: "⇒",
				rarrfs: "⤞",
				rarrhk: "↪",
				rarrlp: "↬",
				rarrpl: "⥅",
				rarrsim: "⥴",
				Rarrtl: "⤖",
				rarrtl: "↣",
				rarrw: "↝",
				ratail: "⤚",
				rAtail: "⤜",
				ratio: "∶",
				rationals: "ℚ",
				rbarr: "⤍",
				rBarr: "⤏",
				RBarr: "⤐",
				rbbrk: "❳",
				rbrace: "}",
				rbrack: "]",
				rbrke: "⦌",
				rbrksld: "⦎",
				rbrkslu: "⦐",
				Rcaron: "Ř",
				rcaron: "ř",
				Rcedil: "Ŗ",
				rcedil: "ŗ",
				rceil: "⌉",
				rcub: "}",
				Rcy: "Р",
				rcy: "р",
				rdca: "⤷",
				rdldhar: "⥩",
				rdquo: "”",
				rdquor: "”",
				rdsh: "↳",
				real: "ℜ",
				realine: "ℛ",
				realpart: "ℜ",
				reals: "ℝ",
				Re: "ℜ",
				rect: "▭",
				reg: "®",
				REG: "®",
				ReverseElement: "∋",
				ReverseEquilibrium: "⇋",
				ReverseUpEquilibrium: "⥯",
				rfisht: "⥽",
				rfloor: "⌋",
				rfr: "𝔯",
				Rfr: "ℜ",
				rHar: "⥤",
				rhard: "⇁",
				rharu: "⇀",
				rharul: "⥬",
				Rho: "Ρ",
				rho: "ρ",
				rhov: "ϱ",
				RightAngleBracket: "⟩",
				RightArrowBar: "⇥",
				rightarrow: "→",
				RightArrow: "→",
				Rightarrow: "⇒",
				RightArrowLeftArrow: "⇄",
				rightarrowtail: "↣",
				RightCeiling: "⌉",
				RightDoubleBracket: "⟧",
				RightDownTeeVector: "⥝",
				RightDownVectorBar: "⥕",
				RightDownVector: "⇂",
				RightFloor: "⌋",
				rightharpoondown: "⇁",
				rightharpoonup: "⇀",
				rightleftarrows: "⇄",
				rightleftharpoons: "⇌",
				rightrightarrows: "⇉",
				rightsquigarrow: "↝",
				RightTeeArrow: "↦",
				RightTee: "⊢",
				RightTeeVector: "⥛",
				rightthreetimes: "⋌",
				RightTriangleBar: "⧐",
				RightTriangle: "⊳",
				RightTriangleEqual: "⊵",
				RightUpDownVector: "⥏",
				RightUpTeeVector: "⥜",
				RightUpVectorBar: "⥔",
				RightUpVector: "↾",
				RightVectorBar: "⥓",
				RightVector: "⇀",
				ring: "˚",
				risingdotseq: "≓",
				rlarr: "⇄",
				rlhar: "⇌",
				rlm: "‏",
				rmoustache: "⎱",
				rmoust: "⎱",
				rnmid: "⫮",
				roang: "⟭",
				roarr: "⇾",
				robrk: "⟧",
				ropar: "⦆",
				ropf: "𝕣",
				Ropf: "ℝ",
				roplus: "⨮",
				rotimes: "⨵",
				RoundImplies: "⥰",
				rpar: ")",
				rpargt: "⦔",
				rppolint: "⨒",
				rrarr: "⇉",
				Rrightarrow: "⇛",
				rsaquo: "›",
				rscr: "𝓇",
				Rscr: "ℛ",
				rsh: "↱",
				Rsh: "↱",
				rsqb: "]",
				rsquo: "’",
				rsquor: "’",
				rthree: "⋌",
				rtimes: "⋊",
				rtri: "▹",
				rtrie: "⊵",
				rtrif: "▸",
				rtriltri: "⧎",
				RuleDelayed: "⧴",
				ruluhar: "⥨",
				rx: "℞",
				Sacute: "Ś",
				sacute: "ś",
				sbquo: "‚",
				scap: "⪸",
				Scaron: "Š",
				scaron: "š",
				Sc: "⪼",
				sc: "≻",
				sccue: "≽",
				sce: "⪰",
				scE: "⪴",
				Scedil: "Ş",
				scedil: "ş",
				Scirc: "Ŝ",
				scirc: "ŝ",
				scnap: "⪺",
				scnE: "⪶",
				scnsim: "⋩",
				scpolint: "⨓",
				scsim: "≿",
				Scy: "С",
				scy: "с",
				sdotb: "⊡",
				sdot: "⋅",
				sdote: "⩦",
				searhk: "⤥",
				searr: "↘",
				seArr: "⇘",
				searrow: "↘",
				sect: "§",
				semi: ";",
				seswar: "⤩",
				setminus: "∖",
				setmn: "∖",
				sext: "✶",
				Sfr: "𝔖",
				sfr: "𝔰",
				sfrown: "⌢",
				sharp: "♯",
				SHCHcy: "Щ",
				shchcy: "щ",
				SHcy: "Ш",
				shcy: "ш",
				ShortDownArrow: "↓",
				ShortLeftArrow: "←",
				shortmid: "∣",
				shortparallel: "∥",
				ShortRightArrow: "→",
				ShortUpArrow: "↑",
				shy: "­",
				Sigma: "Σ",
				sigma: "σ",
				sigmaf: "ς",
				sigmav: "ς",
				sim: "∼",
				simdot: "⩪",
				sime: "≃",
				simeq: "≃",
				simg: "⪞",
				simgE: "⪠",
				siml: "⪝",
				simlE: "⪟",
				simne: "≆",
				simplus: "⨤",
				simrarr: "⥲",
				slarr: "←",
				SmallCircle: "∘",
				smallsetminus: "∖",
				smashp: "⨳",
				smeparsl: "⧤",
				smid: "∣",
				smile: "⌣",
				smt: "⪪",
				smte: "⪬",
				smtes: "⪬︀",
				SOFTcy: "Ь",
				softcy: "ь",
				solbar: "⌿",
				solb: "⧄",
				sol: "/",
				Sopf: "𝕊",
				sopf: "𝕤",
				spades: "♠",
				spadesuit: "♠",
				spar: "∥",
				sqcap: "⊓",
				sqcaps: "⊓︀",
				sqcup: "⊔",
				sqcups: "⊔︀",
				Sqrt: "√",
				sqsub: "⊏",
				sqsube: "⊑",
				sqsubset: "⊏",
				sqsubseteq: "⊑",
				sqsup: "⊐",
				sqsupe: "⊒",
				sqsupset: "⊐",
				sqsupseteq: "⊒",
				square: "□",
				Square: "□",
				SquareIntersection: "⊓",
				SquareSubset: "⊏",
				SquareSubsetEqual: "⊑",
				SquareSuperset: "⊐",
				SquareSupersetEqual: "⊒",
				SquareUnion: "⊔",
				squarf: "▪",
				squ: "□",
				squf: "▪",
				srarr: "→",
				Sscr: "𝒮",
				sscr: "𝓈",
				ssetmn: "∖",
				ssmile: "⌣",
				sstarf: "⋆",
				Star: "⋆",
				star: "☆",
				starf: "★",
				straightepsilon: "ϵ",
				straightphi: "ϕ",
				strns: "¯",
				sub: "⊂",
				Sub: "⋐",
				subdot: "⪽",
				subE: "⫅",
				sube: "⊆",
				subedot: "⫃",
				submult: "⫁",
				subnE: "⫋",
				subne: "⊊",
				subplus: "⪿",
				subrarr: "⥹",
				subset: "⊂",
				Subset: "⋐",
				subseteq: "⊆",
				subseteqq: "⫅",
				SubsetEqual: "⊆",
				subsetneq: "⊊",
				subsetneqq: "⫋",
				subsim: "⫇",
				subsub: "⫕",
				subsup: "⫓",
				succapprox: "⪸",
				succ: "≻",
				succcurlyeq: "≽",
				Succeeds: "≻",
				SucceedsEqual: "⪰",
				SucceedsSlantEqual: "≽",
				SucceedsTilde: "≿",
				succeq: "⪰",
				succnapprox: "⪺",
				succneqq: "⪶",
				succnsim: "⋩",
				succsim: "≿",
				SuchThat: "∋",
				sum: "∑",
				Sum: "∑",
				sung: "♪",
				sup1: "¹",
				sup2: "²",
				sup3: "³",
				sup: "⊃",
				Sup: "⋑",
				supdot: "⪾",
				supdsub: "⫘",
				supE: "⫆",
				supe: "⊇",
				supedot: "⫄",
				Superset: "⊃",
				SupersetEqual: "⊇",
				suphsol: "⟉",
				suphsub: "⫗",
				suplarr: "⥻",
				supmult: "⫂",
				supnE: "⫌",
				supne: "⊋",
				supplus: "⫀",
				supset: "⊃",
				Supset: "⋑",
				supseteq: "⊇",
				supseteqq: "⫆",
				supsetneq: "⊋",
				supsetneqq: "⫌",
				supsim: "⫈",
				supsub: "⫔",
				supsup: "⫖",
				swarhk: "⤦",
				swarr: "↙",
				swArr: "⇙",
				swarrow: "↙",
				swnwar: "⤪",
				szlig: "ß",
				Tab: "\t",
				target: "⌖",
				Tau: "Τ",
				tau: "τ",
				tbrk: "⎴",
				Tcaron: "Ť",
				tcaron: "ť",
				Tcedil: "Ţ",
				tcedil: "ţ",
				Tcy: "Т",
				tcy: "т",
				tdot: "⃛",
				telrec: "⌕",
				Tfr: "𝔗",
				tfr: "𝔱",
				there4: "∴",
				therefore: "∴",
				Therefore: "∴",
				Theta: "Θ",
				theta: "θ",
				thetasym: "ϑ",
				thetav: "ϑ",
				thickapprox: "≈",
				thicksim: "∼",
				ThickSpace: "  ",
				ThinSpace: " ",
				thinsp: " ",
				thkap: "≈",
				thksim: "∼",
				THORN: "Þ",
				thorn: "þ",
				tilde: "˜",
				Tilde: "∼",
				TildeEqual: "≃",
				TildeFullEqual: "≅",
				TildeTilde: "≈",
				timesbar: "⨱",
				timesb: "⊠",
				times: "×",
				timesd: "⨰",
				tint: "∭",
				toea: "⤨",
				topbot: "⌶",
				topcir: "⫱",
				top: "⊤",
				Topf: "𝕋",
				topf: "𝕥",
				topfork: "⫚",
				tosa: "⤩",
				tprime: "‴",
				trade: "™",
				TRADE: "™",
				triangle: "▵",
				triangledown: "▿",
				triangleleft: "◃",
				trianglelefteq: "⊴",
				triangleq: "≜",
				triangleright: "▹",
				trianglerighteq: "⊵",
				tridot: "◬",
				trie: "≜",
				triminus: "⨺",
				TripleDot: "⃛",
				triplus: "⨹",
				trisb: "⧍",
				tritime: "⨻",
				trpezium: "⏢",
				Tscr: "𝒯",
				tscr: "𝓉",
				TScy: "Ц",
				tscy: "ц",
				TSHcy: "Ћ",
				tshcy: "ћ",
				Tstrok: "Ŧ",
				tstrok: "ŧ",
				twixt: "≬",
				twoheadleftarrow: "↞",
				twoheadrightarrow: "↠",
				Uacute: "Ú",
				uacute: "ú",
				uarr: "↑",
				Uarr: "↟",
				uArr: "⇑",
				Uarrocir: "⥉",
				Ubrcy: "Ў",
				ubrcy: "ў",
				Ubreve: "Ŭ",
				ubreve: "ŭ",
				Ucirc: "Û",
				ucirc: "û",
				Ucy: "У",
				ucy: "у",
				udarr: "⇅",
				Udblac: "Ű",
				udblac: "ű",
				udhar: "⥮",
				ufisht: "⥾",
				Ufr: "𝔘",
				ufr: "𝔲",
				Ugrave: "Ù",
				ugrave: "ù",
				uHar: "⥣",
				uharl: "↿",
				uharr: "↾",
				uhblk: "▀",
				ulcorn: "⌜",
				ulcorner: "⌜",
				ulcrop: "⌏",
				ultri: "◸",
				Umacr: "Ū",
				umacr: "ū",
				uml: "¨",
				UnderBar: "_",
				UnderBrace: "⏟",
				UnderBracket: "⎵",
				UnderParenthesis: "⏝",
				Union: "⋃",
				UnionPlus: "⊎",
				Uogon: "Ų",
				uogon: "ų",
				Uopf: "𝕌",
				uopf: "𝕦",
				UpArrowBar: "⤒",
				uparrow: "↑",
				UpArrow: "↑",
				Uparrow: "⇑",
				UpArrowDownArrow: "⇅",
				updownarrow: "↕",
				UpDownArrow: "↕",
				Updownarrow: "⇕",
				UpEquilibrium: "⥮",
				upharpoonleft: "↿",
				upharpoonright: "↾",
				uplus: "⊎",
				UpperLeftArrow: "↖",
				UpperRightArrow: "↗",
				upsi: "υ",
				Upsi: "ϒ",
				upsih: "ϒ",
				Upsilon: "Υ",
				upsilon: "υ",
				UpTeeArrow: "↥",
				UpTee: "⊥",
				upuparrows: "⇈",
				urcorn: "⌝",
				urcorner: "⌝",
				urcrop: "⌎",
				Uring: "Ů",
				uring: "ů",
				urtri: "◹",
				Uscr: "𝒰",
				uscr: "𝓊",
				utdot: "⋰",
				Utilde: "Ũ",
				utilde: "ũ",
				utri: "▵",
				utrif: "▴",
				uuarr: "⇈",
				Uuml: "Ü",
				uuml: "ü",
				uwangle: "⦧",
				vangrt: "⦜",
				varepsilon: "ϵ",
				varkappa: "ϰ",
				varnothing: "∅",
				varphi: "ϕ",
				varpi: "ϖ",
				varpropto: "∝",
				varr: "↕",
				vArr: "⇕",
				varrho: "ϱ",
				varsigma: "ς",
				varsubsetneq: "⊊︀",
				varsubsetneqq: "⫋︀",
				varsupsetneq: "⊋︀",
				varsupsetneqq: "⫌︀",
				vartheta: "ϑ",
				vartriangleleft: "⊲",
				vartriangleright: "⊳",
				vBar: "⫨",
				Vbar: "⫫",
				vBarv: "⫩",
				Vcy: "В",
				vcy: "в",
				vdash: "⊢",
				vDash: "⊨",
				Vdash: "⊩",
				VDash: "⊫",
				Vdashl: "⫦",
				veebar: "⊻",
				vee: "∨",
				Vee: "⋁",
				veeeq: "≚",
				vellip: "⋮",
				verbar: "|",
				Verbar: "‖",
				vert: "|",
				Vert: "‖",
				VerticalBar: "∣",
				VerticalLine: "|",
				VerticalSeparator: "❘",
				VerticalTilde: "≀",
				VeryThinSpace: " ",
				Vfr: "𝔙",
				vfr: "𝔳",
				vltri: "⊲",
				vnsub: "⊂⃒",
				vnsup: "⊃⃒",
				Vopf: "𝕍",
				vopf: "𝕧",
				vprop: "∝",
				vrtri: "⊳",
				Vscr: "𝒱",
				vscr: "𝓋",
				vsubnE: "⫋︀",
				vsubne: "⊊︀",
				vsupnE: "⫌︀",
				vsupne: "⊋︀",
				Vvdash: "⊪",
				vzigzag: "⦚",
				Wcirc: "Ŵ",
				wcirc: "ŵ",
				wedbar: "⩟",
				wedge: "∧",
				Wedge: "⋀",
				wedgeq: "≙",
				weierp: "℘",
				Wfr: "𝔚",
				wfr: "𝔴",
				Wopf: "𝕎",
				wopf: "𝕨",
				wp: "℘",
				wr: "≀",
				wreath: "≀",
				Wscr: "𝒲",
				wscr: "𝓌",
				xcap: "⋂",
				xcirc: "◯",
				xcup: "⋃",
				xdtri: "▽",
				Xfr: "𝔛",
				xfr: "𝔵",
				xharr: "⟷",
				xhArr: "⟺",
				Xi: "Ξ",
				xi: "ξ",
				xlarr: "⟵",
				xlArr: "⟸",
				xmap: "⟼",
				xnis: "⋻",
				xodot: "⨀",
				Xopf: "𝕏",
				xopf: "𝕩",
				xoplus: "⨁",
				xotime: "⨂",
				xrarr: "⟶",
				xrArr: "⟹",
				Xscr: "𝒳",
				xscr: "𝓍",
				xsqcup: "⨆",
				xuplus: "⨄",
				xutri: "△",
				xvee: "⋁",
				xwedge: "⋀",
				Yacute: "Ý",
				yacute: "ý",
				YAcy: "Я",
				yacy: "я",
				Ycirc: "Ŷ",
				ycirc: "ŷ",
				Ycy: "Ы",
				ycy: "ы",
				yen: "¥",
				Yfr: "𝔜",
				yfr: "𝔶",
				YIcy: "Ї",
				yicy: "ї",
				Yopf: "𝕐",
				yopf: "𝕪",
				Yscr: "𝒴",
				yscr: "𝓎",
				YUcy: "Ю",
				yucy: "ю",
				yuml: "ÿ",
				Yuml: "Ÿ",
				Zacute: "Ź",
				zacute: "ź",
				Zcaron: "Ž",
				zcaron: "ž",
				Zcy: "З",
				zcy: "з",
				Zdot: "Ż",
				zdot: "ż",
				zeetrf: "ℨ",
				ZeroWidthSpace: "​",
				Zeta: "Ζ",
				zeta: "ζ",
				zfr: "𝔷",
				Zfr: "ℨ",
				ZHcy: "Ж",
				zhcy: "ж",
				zigrarr: "⇝",
				zopf: "𝕫",
				Zopf: "ℤ",
				Zscr: "𝒵",
				zscr: "𝓏",
				zwj: "‍",
				zwnj: "‌"
			},
			Re = {
				Aacute: "Á",
				aacute: "á",
				Acirc: "Â",
				acirc: "â",
				acute: "´",
				AElig: "Æ",
				aelig: "æ",
				Agrave: "À",
				agrave: "à",
				amp: "&",
				AMP: "&",
				Aring: "Å",
				aring: "å",
				Atilde: "Ã",
				atilde: "ã",
				Auml: "Ä",
				auml: "ä",
				brvbar: "¦",
				Ccedil: "Ç",
				ccedil: "ç",
				cedil: "¸",
				cent: "¢",
				copy: "©",
				COPY: "©",
				curren: "¤",
				deg: "°",
				divide: "÷",
				Eacute: "É",
				eacute: "é",
				Ecirc: "Ê",
				ecirc: "ê",
				Egrave: "È",
				egrave: "è",
				ETH: "Ð",
				eth: "ð",
				Euml: "Ë",
				euml: "ë",
				frac12: "½",
				frac14: "¼",
				frac34: "¾",
				gt: ">",
				GT: ">",
				Iacute: "Í",
				iacute: "í",
				Icirc: "Î",
				icirc: "î",
				iexcl: "¡",
				Igrave: "Ì",
				igrave: "ì",
				iquest: "¿",
				Iuml: "Ï",
				iuml: "ï",
				laquo: "«",
				lt: "<",
				LT: "<",
				macr: "¯",
				micro: "µ",
				middot: "·",
				nbsp: " ",
				not: "¬",
				Ntilde: "Ñ",
				ntilde: "ñ",
				Oacute: "Ó",
				oacute: "ó",
				Ocirc: "Ô",
				ocirc: "ô",
				Ograve: "Ò",
				ograve: "ò",
				ordf: "ª",
				ordm: "º",
				Oslash: "Ø",
				oslash: "ø",
				Otilde: "Õ",
				otilde: "õ",
				Ouml: "Ö",
				ouml: "ö",
				para: "¶",
				plusmn: "±",
				pound: "£",
				quot: '"',
				QUOT: '"',
				raquo: "»",
				reg: "®",
				REG: "®",
				sect: "§",
				shy: "­",
				sup1: "¹",
				sup2: "²",
				sup3: "³",
				szlig: "ß",
				THORN: "Þ",
				thorn: "þ",
				times: "×",
				Uacute: "Ú",
				uacute: "ú",
				Ucirc: "Û",
				ucirc: "û",
				Ugrave: "Ù",
				ugrave: "ù",
				uml: "¨",
				Uuml: "Ü",
				uuml: "ü",
				Yacute: "Ý",
				yacute: "ý",
				yen: "¥",
				yuml: "ÿ"
			},
			zl = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' },
			ql = {},
			Pe =
				(Hn && Hn.__importDefault) ||
				function (e) {
					return e && e.__esModule ? e : { default: e };
				},
			Vl =
				(Object.defineProperty(ql, "__esModule", { value: !0 }),
				Pe({
					0: 65533,
					128: 8364,
					130: 8218,
					131: 402,
					132: 8222,
					133: 8230,
					134: 8224,
					135: 8225,
					136: 710,
					137: 8240,
					138: 352,
					139: 8249,
					140: 338,
					142: 381,
					145: 8216,
					146: 8217,
					147: 8220,
					148: 8221,
					149: 8226,
					150: 8211,
					151: 8212,
					152: 732,
					153: 8482,
					154: 353,
					155: 8250,
					156: 339,
					158: 382,
					159: 376
				})),
			jl =
				String.fromCodePoint ||
				function (e) {
					var t = "";
					return (
						65535 < e &&
							((e -= 65536),
							(t += String.fromCharCode(((e >>> 10) & 1023) | 55296)),
							(e = 56320 | (1023 & e))),
						(t += String.fromCharCode(e))
					);
				},
			Pe =
				((ql.default = function (e) {
					return (55296 <= e && e <= 57343) || 1114111 < e
						? "�"
						: (e in Vl.default && (e = Vl.default[e]), jl(e));
				}),
				(Hn && Hn.__importDefault) ||
					function (e) {
						return e && e.__esModule ? e : { default: e };
					}),
			$l =
				(Object.defineProperty(xe, "__esModule", { value: !0 }),
				(xe.decodeHTML = xe.decodeHTMLStrict = xe.decodeXML = void 0),
				Pe(Me)),
			_l = Pe(Re),
			Re = Pe(zl),
			Ul = Pe(ql),
			Wl = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
		function Jl(e) {
			var t = Kl(e);
			return function (e) {
				return String(e).replace(Wl, t);
			};
		}
		function Gl(e, t) {
			return e < t ? 1 : -1;
		}
		function Kl(n) {
			return function (e) {
				var t;
				return "#" === e.charAt(1)
					? "X" === (t = e.charAt(2)) || "x" === t
						? Ul.default(parseInt(e.substr(3), 16))
						: Ul.default(parseInt(e.substr(2), 10))
					: n[e.slice(1, -1)] || e;
			};
		}
		(xe.decodeXML = Jl(Re.default)),
			(xe.decodeHTMLStrict = Jl($l.default)),
			(xe.decodeHTML = (() => {
				for (
					var e = Object.keys(_l.default).sort(Gl),
						t = Object.keys($l.default).sort(Gl),
						n = 0,
						r = 0;
					n < t.length;
					n++
				)
					e[r] === t[n] ? ((t[n] += ";?"), r++) : (t[n] += ";");
				var o = new RegExp("&(?:" + t.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
					i = Kl($l.default);
				function s(e) {
					return ";" !== e.substr(-1) && (e += ";"), i(e);
				}
				return function (e) {
					return String(e).replace(o, s);
				};
			})()),
			(Pe = {}),
			(ql =
				(Hn && Hn.__importDefault) ||
				function (e) {
					return e && e.__esModule ? e : { default: e };
				}),
			Object.defineProperty(Pe, "__esModule", { value: !0 }),
			(Pe.escapeUTF8 =
				Pe.escape =
				Pe.encodeNonAsciiHTML =
				Pe.encodeHTML =
				Pe.encodeXML =
					void 0);
		var Zl = ec((Re = Yl(ql(zl).default)));
		Pe.encodeXML = cc(Re);
		var Xl,
			Ql,
			zl = ec((Hn = Yl(ql(Me).default)));
		function Yl(n) {
			return Object.keys(n)
				.sort()
				.reduce(function (e, t) {
					return (e[n[t]] = "&" + t + ";"), e;
				}, {});
		}
		function ec(e) {
			for (var t = [], n = [], r = 0, o = Object.keys(e); r < o.length; r++) {
				var i = o[r];
				1 === i.length ? t.push("\\" + i) : n.push(i);
			}
			t.sort();
			for (var s = 0; s < t.length - 1; s++) {
				for (
					var a = s;
					a < t.length - 1 && t[a].charCodeAt(1) + 1 === t[a + 1].charCodeAt(1);

				)
					a += 1;
				var l = 1 + a - s;
				l < 3 || t.splice(s, l, t[s] + "-" + t[a]);
			}
			return n.unshift("[" + t.join("") + "]"), new RegExp(n.join("|"), "g");
		}
		(Pe.encodeHTML =
			((Xl = Hn),
			(Ql = zl),
			function (e) {
				return e
					.replace(Ql, function (e) {
						return Xl[e];
					})
					.replace(tc, rc);
			})),
			(Pe.encodeNonAsciiHTML = cc(Hn));
		var tc =
				/(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
			nc =
				null != String.prototype.codePointAt
					? function (e) {
							return e.codePointAt(0);
						}
					: function (e) {
							return (
								1024 * (e.charCodeAt(0) - 55296) + e.charCodeAt(1) - 56320 + 65536
							);
						};
		function rc(e) {
			return (
				"&#x" + (1 < e.length ? nc(e) : e.charCodeAt(0)).toString(16).toUpperCase() + ";"
			);
		}
		var oc,
			ic,
			sc,
			ac,
			lc = new RegExp(Zl.source + "|" + tc.source, "g");
		function cc(t) {
			return function (e) {
				return e.replace(lc, function (e) {
					return t[e] || rc(e);
				});
			};
		}
		function uc(e) {
			return e.charCodeAt(0) === dc ? e.charAt(1) : Hl.decodeHTML(e);
		}
		(Pe.escape = function (e) {
			return e.replace(lc, rc);
		}),
			(Pe.escapeUTF8 = function (e) {
				return e.replace(Zl, rc);
			}),
			(Re = Hl),
			Object.defineProperty(Re, "__esModule", { value: !0 }),
			(Re.decodeXMLStrict =
				Re.decodeHTML5Strict =
				Re.decodeHTML4Strict =
				Re.decodeHTML5 =
				Re.decodeHTML4 =
				Re.decodeHTMLStrict =
				Re.decodeHTML =
				Re.decodeXML =
				Re.encodeHTML5 =
				Re.encodeHTML4 =
				Re.escapeUTF8 =
				Re.escape =
				Re.encodeNonAsciiHTML =
				Re.encodeHTML =
				Re.encodeXML =
				Re.encode =
				Re.decodeStrict =
				Re.decode =
					void 0),
			(oc = xe),
			(ic = Pe),
			(Re.decode = function (e, t) {
				return (!t || t <= 0 ? oc.decodeXML : oc.decodeHTML)(e);
			}),
			(Re.decodeStrict = function (e, t) {
				return (!t || t <= 0 ? oc.decodeXML : oc.decodeHTMLStrict)(e);
			}),
			(Re.encode = function (e, t) {
				return (!t || t <= 0 ? ic.encodeXML : ic.encodeHTML)(e);
			}),
			(sc = Pe),
			Object.defineProperty(Re, "encodeXML", {
				enumerable: !0,
				get: function () {
					return sc.encodeXML;
				}
			}),
			Object.defineProperty(Re, "encodeHTML", {
				enumerable: !0,
				get: function () {
					return sc.encodeHTML;
				}
			}),
			Object.defineProperty(Re, "encodeNonAsciiHTML", {
				enumerable: !0,
				get: function () {
					return sc.encodeNonAsciiHTML;
				}
			}),
			Object.defineProperty(Re, "escape", {
				enumerable: !0,
				get: function () {
					return sc.escape;
				}
			}),
			Object.defineProperty(Re, "escapeUTF8", {
				enumerable: !0,
				get: function () {
					return sc.escapeUTF8;
				}
			}),
			Object.defineProperty(Re, "encodeHTML4", {
				enumerable: !0,
				get: function () {
					return sc.encodeHTML;
				}
			}),
			Object.defineProperty(Re, "encodeHTML5", {
				enumerable: !0,
				get: function () {
					return sc.encodeHTML;
				}
			}),
			(ac = xe),
			Object.defineProperty(Re, "decodeXML", {
				enumerable: !0,
				get: function () {
					return ac.decodeXML;
				}
			}),
			Object.defineProperty(Re, "decodeHTML", {
				enumerable: !0,
				get: function () {
					return ac.decodeHTML;
				}
			}),
			Object.defineProperty(Re, "decodeHTMLStrict", {
				enumerable: !0,
				get: function () {
					return ac.decodeHTMLStrict;
				}
			}),
			Object.defineProperty(Re, "decodeHTML4", {
				enumerable: !0,
				get: function () {
					return ac.decodeHTML;
				}
			}),
			Object.defineProperty(Re, "decodeHTML5", {
				enumerable: !0,
				get: function () {
					return ac.decodeHTML;
				}
			}),
			Object.defineProperty(Re, "decodeHTML4Strict", {
				enumerable: !0,
				get: function () {
					return ac.decodeHTMLStrict;
				}
			}),
			Object.defineProperty(Re, "decodeHTML5Strict", {
				enumerable: !0,
				get: function () {
					return ac.decodeHTMLStrict;
				}
			}),
			Object.defineProperty(Re, "decodeXMLStrict", {
				enumerable: !0,
				get: function () {
					return ac.decodeXML;
				}
			});
		var ql = "&(?:#x[a-f0-9]{1,6}|#[0-9]{1,7}|[a-z][a-z0-9]{1,31});",
			dc = 92,
			pc = /[\\&]/,
			Me = "[!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]",
			hc = new RegExp("\\\\" + Me + "|" + ql, "gi"),
			fc = new RegExp('[&<>"]', "g");
		function mc(e) {
			return pc.test(e) ? e.replace(hc, uc) : e;
		}
		function gc(t) {
			try {
				return Fl(t);
			} catch (e) {
				return t;
			}
		}
		function vc(e) {
			switch (e) {
				case "&":
					return "&amp;";
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case '"':
					return "&quot;";
				default:
					return e;
			}
		}
		function yc(e) {
			return fc.test(e) ? e.replace(fc, vc) : e;
		}
		function bc(e, t) {
			for (var n = [], r = 0; r < t; r++) n.push(e);
			return n.join("");
		}
		function wc(e) {
			return !e || !/[^ \t]+/.test(e);
		}
		(xc.prototype.next = function () {
			var e,
				t = this.current,
				n = this.entering;
			return null === t
				? null
				: ((e = Cc(t)),
					n && e
						? t.firstChild
							? ((this.current = t.firstChild), (this.entering = !0))
							: (this.entering = !1)
						: t === this.root
							? (this.current = null)
							: null === t.next
								? ((this.current = t.parent), (this.entering = !1))
								: ((this.current = t.next), (this.entering = !0)),
					{ entering: n, node: t });
		}),
			(xc.prototype.resumeAt = function (e, t) {
				(this.current = e), (this.entering = !0 === t);
			});
		var kc = xc;
		function xc(e) {
			(this.current = e), (this.root = e), (this.entering = !0);
		}
		function Cc(e) {
			switch (e.type) {
				case "document":
				case "blockQuote":
				case "list":
				case "item":
				case "paragraph":
				case "heading":
				case "emph":
				case "strong":
				case "strike":
				case "link":
				case "image":
				case "table":
				case "tableHead":
				case "tableBody":
				case "tableRow":
				case "tableCell":
				case "tableDelimRow":
				case "customInline":
					return !0;
				default:
					return !1;
			}
		}
		var Tc = 1,
			Mc = {};
		function Sc(e) {
			delete Mc[e];
		}
		(Nc.prototype.isContainer = function () {
			return Cc(this);
		}),
			(Nc.prototype.unlink = function () {
				this.prev
					? (this.prev.next = this.next)
					: this.parent && (this.parent.firstChild = this.next),
					this.next
						? (this.next.prev = this.prev)
						: this.parent && (this.parent.lastChild = this.prev),
					(this.parent = null),
					(this.next = null),
					(this.prev = null);
			}),
			(Nc.prototype.replaceWith = function (e) {
				this.insertBefore(e), this.unlink();
			}),
			(Nc.prototype.insertAfter = function (e) {
				e.unlink(),
					(e.next = this.next),
					e.next && (e.next.prev = e),
					((e.prev = this).next = e),
					this.parent && ((e.parent = this.parent), e.next || (e.parent.lastChild = e));
			}),
			(Nc.prototype.insertBefore = function (e) {
				e.unlink(),
					(e.prev = this.prev),
					e.prev && (e.prev.next = e),
					(((e.next = this).prev = e).parent = this.parent),
					e.prev || (e.parent.firstChild = e);
			}),
			(Nc.prototype.appendChild = function (e) {
				e.unlink(),
					(e.parent = this).lastChild
						? ((this.lastChild.next = e).prev = this.lastChild)
						: (this.firstChild = e),
					(this.lastChild = e);
			}),
			(Nc.prototype.prependChild = function (e) {
				e.unlink(),
					(e.parent = this).firstChild
						? (((this.firstChild.prev = e).next = this.firstChild),
							(this.firstChild = e))
						: ((this.firstChild = e), (this.lastChild = e));
			}),
			(Nc.prototype.walker = function () {
				return new kc(this);
			});
		var Ec = Nc;
		function Nc(e, t) {
			(this.parent = null),
				(this.prev = null),
				(this.next = null),
				(this.firstChild = null),
				(this.lastChild = null),
				(this.literal = null),
				(this.id = "document" === e ? -1 : Tc++),
				(this.type = e),
				(this.sourcepos = t),
				(Mc[this.id] = this);
		}
		Ll(Ac, (Oc = Ec));
		var Oc,
			Dc = Ac;
		function Ac(e, t) {
			t = Oc.call(this, e, t) || this;
			return (
				(t.open = !0),
				(t.lineOffsets = null),
				(t.stringContent = null),
				(t.lastLineBlank = !1),
				(t.lastLineChecked = !1),
				(t.type = e),
				t
			);
		}
		Ll(Rc, (Lc = Dc));
		var Lc,
			Ic = Rc;
		function Rc() {
			var e = (null !== Lc && Lc.apply(this, arguments)) || this;
			return (e.listData = null), e;
		}
		Ll(Fc, (Pc = Dc));
		var Pc,
			Bc = Fc;
		function Fc() {
			var e = (null !== Pc && Pc.apply(this, arguments)) || this;
			return (e.level = 0), (e.headingType = "atx"), e;
		}
		Ll(qc, (Hc = Dc));
		var Hc,
			zc = qc;
		function qc() {
			var e = (null !== Hc && Hc.apply(this, arguments)) || this;
			return (
				(e.isFenced = !1),
				(e.fenceChar = null),
				(e.fenceLength = 0),
				(e.fenceOffset = -1),
				(e.info = null),
				(e.infoPadding = 0),
				e
			);
		}
		Ll($c, (Vc = Dc));
		var Vc,
			jc = $c;
		function $c() {
			var e = (null !== Vc && Vc.apply(this, arguments)) || this;
			return (e.columns = []), e;
		}
		Ll(Wc, (_c = Dc));
		var _c,
			Uc = Wc;
		function Wc() {
			var e = (null !== _c && _c.apply(this, arguments)) || this;
			return (
				(e.startIdx = 0),
				(e.endIdx = 0),
				(e.paddingLeft = 0),
				(e.paddingRight = 0),
				(e.ignored = !1),
				e
			);
		}
		Ll(Kc, (Jc = Dc));
		var Jc,
			Gc = Kc;
		function Kc() {
			var e = (null !== Jc && Jc.apply(this, arguments)) || this;
			return (e.title = ""), (e.dest = ""), (e.label = ""), e;
		}
		Ll(Qc, (Zc = Dc));
		var Zc,
			Xc = Qc;
		function Qc() {
			var e = (null !== Zc && Zc.apply(this, arguments)) || this;
			return (e.syntaxLength = 0), (e.offset = -1), (e.info = ""), e;
		}
		Ll(tu, (Yc = Dc));
		var Yc,
			eu = tu;
		function tu() {
			var e = (null !== Yc && Yc.apply(this, arguments)) || this;
			return (e.htmlBlockType = -1), e;
		}
		Ll(ou, (nu = Ec));
		var nu,
			ru = ou;
		function ou() {
			var e = (null !== nu && nu.apply(this, arguments)) || this;
			return (e.destination = null), (e.title = null), (e.extendedAutolink = !1), e;
		}
		Ll(au, (iu = Ec));
		var iu,
			su = au;
		function au() {
			var e = (null !== iu && iu.apply(this, arguments)) || this;
			return (e.tickCount = 0), e;
		}
		Ll(uu, (lu = Ec));
		var lu,
			cu = uu;
		function uu() {
			var e = (null !== lu && lu.apply(this, arguments)) || this;
			return (e.info = ""), e;
		}
		function Be(e, t) {
			switch (e) {
				case "heading":
					return new Bc(e, t);
				case "list":
				case "item":
					return new Ic(e, t);
				case "link":
				case "image":
					return new ru(e, t);
				case "codeBlock":
					return new zc(e, t);
				case "htmlBlock":
					return new eu(e, t);
				case "table":
					return new jc(e, t);
				case "tableCell":
					return new Uc(e, t);
				case "document":
				case "paragraph":
				case "blockQuote":
				case "thematicBreak":
				case "tableRow":
				case "tableBody":
				case "tableHead":
				case "frontMatter":
					return new Dc(e, t);
				case "code":
					return new su(e, t);
				case "refDef":
					return new Gc(e, t);
				case "customBlock":
					return new Xc(e, t);
				case "customInline":
					return new cu(e, t);
				default:
					return new Ec(e, t);
			}
		}
		function du(e) {
			return "codeBlock" === e.type;
		}
		function pu(e) {
			return "list" === e.type;
		}
		function hu(e) {
			return "refDef" === e.type;
		}
		function fu(e) {
			return "customBlock" === e.type;
		}
		function Fe(e, t) {
			t = Be("text", t);
			return (t.literal = e), t;
		}
		var mu,
			gu,
			Hn =
				"<" +
				(zl = "[A-Za-z][A-Za-z0-9-]*") +
				"(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*/?>",
			Pe = "</" + zl + "\\s*[>]",
			vu = new RegExp(
				"^(?:<[A-Za-z][A-Za-z0-9-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*/?>|</[A-Za-z][A-Za-z0-9-]*\\s*[>]|\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e|[<][?].*?[?][>]|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)",
				"i"
			),
			yu = String.fromCodePoint
				? function (e) {
						try {
							return String.fromCodePoint(e);
						} catch (e) {
							if (e instanceof RangeError) return String.fromCharCode(65533);
							throw e;
						}
					}
				: ((mu = String.fromCharCode),
					(gu = Math.floor),
					function () {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						var n = [],
							r = -1,
							o = e.length;
						if (!o) return "";
						for (var i = ""; ++r < o; ) {
							var s = Number(e[r]);
							if (!isFinite(s) || s < 0 || 1114111 < s || gu(s) !== s)
								return String.fromCharCode(65533);
							s <= 65535
								? n.push(s)
								: n.push(55296 + ((s -= 65536) >> 10), (s % 1024) + 56320),
								(r + 1 === o || 16384 < n.length) &&
									((i += mu.apply(void 0, n)), (n.length = 0));
						}
						return i;
					}),
			bu = "(?:[w-]+.)*[A-Za-z0-9-]+.[A-Za-z0-9-]+",
			wu = "[^<\\s]*[^<?!.,:*_?~\\s]",
			ku = "[\\w.+-]+@(?:[\\w-]+\\.)+[\\w-]+";
		function xu(e) {
			for (
				var t, n = new RegExp("(www|https?://)." + bu + wu, "g"), r = [];
				(t = n.exec(e));

			) {
				var o = (e => {
					var t = /\)+$/.exec(e);
					if (t) {
						for (var n = 0, r = 0, o = e; r < o.length; r++) {
							var i = o[r];
							"(" === i ? (n < 0 ? (n = 1) : (n += 1)) : ")" === i && --n;
						}
						if (n < 0)
							return (t = Math.min(-n, t[0].length)), e.substring(0, e.length - t);
					}
					return e;
				})(t[0]).replace(/&[A-Za-z0-9]+;$/, "");
				r.push({
					text: o,
					range: [t.index, t.index + o.length - 1],
					url: ("www" === t[1] ? "http://" : "") + o
				});
			}
			return r;
		}
		function Cu(e) {
			return Rl(
				Rl([], xu(e)),
				(e => {
					for (var t, n = new RegExp(ku, "g"), r = []; (t = n.exec(e)); ) {
						var o = t[0];
						/[_-]+$/.test(o) ||
							r.push({
								text: o,
								range: [t.index, t.index + o.length - 1],
								url: "mailto:" + o
							});
					}
					return r;
				})(e)
			).sort(function (e, t) {
				return e.range[0] - t.range[0];
			});
		}
		function Tu(e, v) {
			var y;
			for ("boolean" == typeof v && (v = Cu); (y = e.next()); )
				(() => {
					var e = y.entering,
						t = y.node;
					if (e && "text" === t.type && "link" !== t.parent.type) {
						var n = t.literal,
							e = v(n);
						if (!e || !e.length) return;
						for (
							var r = 0,
								o = t.sourcepos[0],
								i = o[0],
								s = o[1],
								a = function (e, t) {
									return [
										[i, s + e],
										[i, s + t]
									];
								},
								l = [],
								c = 0,
								u = e;
							c < u.length;
							c++
						) {
							var d = u[c],
								p = d.range,
								h = d.url,
								d = d.text,
								f =
									(p[0] > r && l.push(Fe(n.substring(r, p[0]), a(r, p[0] - 1))),
									Be("link", a.apply(void 0, p)));
							f.appendChild(Fe(d, a.apply(void 0, p))),
								(f.destination = h),
								(f.extendedAutolink = !0),
								l.push(f),
								(r = p[1] + 1);
						}
						r < n.length && l.push(Fe(n.substring(r), a(r, n.length - 1)));
						for (var m = 0, g = l; m < g.length; m++) t.insertBefore(g[m]);
						t.unlink();
					}
				})();
		}
		function Mu(e) {
			return e[e.length - 1];
		}
		function Su(e) {
			return e
				.slice(1, e.length - 1)
				.trim()
				.replace(/[ \t\r\n]+/, " ")
				.toLowerCase()
				.toUpperCase();
		}
		function Eu(t, n) {
			Object.keys(t).forEach(function (e) {
				n(e, t[e]);
			});
		}
		function Nu(e) {
			return !Object.keys(e).length;
		}
		var xe = "\\\\" + Me,
			Ou = new RegExp(
				/[!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/
			),
			Du = new RegExp(
				'^(?:"(' +
					xe +
					'|[^"\\x00])*"|\'(' +
					xe +
					"|[^'\\x00])*'|\\((" +
					xe +
					"|[^()\\x00])*\\))"
			),
			Au = /^(?:<(?:[^<>\n\\\x00]|\\.)*>)/,
			Lu = new RegExp("^" + Me),
			Iu = new RegExp("^" + ql, "i"),
			Ru = /`+/,
			Pu = /^`+/,
			Bu = /\.\.\./g,
			Fu = /--+/g,
			Hu =
				/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
			zu = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i,
			qu = /^ *(?:\n *)?/,
			Vu = /^[ \t\n\x0b\x0c\x0d]/,
			ju = /^\s/,
			$u = / *$/,
			_u = /^ */,
			Uu = /^ *(?:\n|$)/,
			Wu = /^\[(?:[^\\\[\]]|\\.){0,1000}\]/,
			Ju = /^[^\n`\[\]\\!<&*_'"~$]+/m,
			Gu =
				((He.prototype.sourcepos = function (e, t) {
					var n = this.linePosOffset + this.lineOffsets[this.lineIdx],
						r = this.lineStartNum + this.lineIdx,
						e = [r, e + n];
					return "number" == typeof t ? [e, [r, t + n]] : e;
				}),
				(He.prototype.nextLine = function () {
					(this.lineIdx += 1), (this.linePosOffset = -this.pos);
				}),
				(He.prototype.match = function (e) {
					e = e.exec(this.subject.slice(this.pos));
					return null === e ? null : ((this.pos += e.index + e[0].length), e[0]);
				}),
				(He.prototype.peek = function () {
					return this.pos < this.subject.length ? this.subject.charCodeAt(this.pos) : -1;
				}),
				(He.prototype.spnl = function () {
					return this.match(qu), !0;
				}),
				(He.prototype.parseBackticks = function (e) {
					var t = this.pos + 1,
						n = this.match(Pu);
					if (null === n) return !1;
					for (var r, o, i, s, a = this.pos; null !== (r = this.match(Ru)); )
						if (r === n)
							return (
								(r = this.subject.slice(a, this.pos - n.length)),
								(o = this.sourcepos(t, this.pos)),
								1 < (i = r.split("\n")).length &&
									((s = Mu(i)),
									(this.lineIdx += i.length - 1),
									(this.linePosOffset = -(this.pos - s.length - n.length)),
									(o[1] = this.sourcepos(this.pos)),
									(r = i.join(" "))),
								(s = Be("code", o)),
								0 < r.length &&
								null !== r.match(/[^ ]/) &&
								" " == r[0] &&
								" " == r[r.length - 1]
									? (s.literal = r.slice(1, r.length - 1))
									: (s.literal = r),
								(s.tickCount = n.length),
								e.appendChild(s),
								!0
							);
					return (
						(this.pos = a), e.appendChild(Fe(n, this.sourcepos(t, this.pos - 1))), !0
					);
				}),
				(He.prototype.parseBackslash = function (e) {
					var t,
						n = this.subject,
						r = ((this.pos += 1), this.pos);
					return (
						10 === this.peek()
							? ((this.pos += 1),
								(t = Be("linebreak", this.sourcepos(this.pos - 1, this.pos))),
								e.appendChild(t),
								this.nextLine())
							: Lu.test(n.charAt(this.pos))
								? (e.appendChild(
										Fe(n.charAt(this.pos), this.sourcepos(r, this.pos))
									),
									(this.pos += 1))
								: e.appendChild(Fe("\\", this.sourcepos(r, r))),
						!0
					);
				}),
				(He.prototype.parseAutolink = function (e) {
					var t,
						n,
						r,
						o = this.pos + 1;
					return (t = this.match(Hu))
						? ((n = t.slice(1, t.length - 1)),
							((r = Be("link", this.sourcepos(o, this.pos))).destination = gc(
								"mailto:" + n
							)),
							(r.title = ""),
							r.appendChild(Fe(n, this.sourcepos(o + 1, this.pos - 1))),
							e.appendChild(r),
							!0)
						: !!(t = this.match(zu)) &&
								((n = t.slice(1, t.length - 1)),
								((r = Be("link", this.sourcepos(o, this.pos))).destination = gc(n)),
								(r.title = ""),
								r.appendChild(Fe(n, this.sourcepos(o + 1, this.pos - 1))),
								e.appendChild(r),
								!0);
				}),
				(He.prototype.parseHtmlTag = function (e) {
					var t = this.pos + 1,
						n = this.match(vu);
					return (
						null !== n &&
						(((t = Be("htmlInline", this.sourcepos(t, this.pos))).literal = n),
						e.appendChild(t),
						!0)
					);
				}),
				(He.prototype.scanDelims = function (e) {
					var t,
						n,
						r,
						o,
						i,
						s,
						a,
						l = 0,
						c = this.pos;
					if (39 === e || 34 === e) l++, this.pos++;
					else for (; this.peek() === e; ) l++, this.pos++;
					return 0 === l || (l < 2 && (126 === e || 36 === e))
						? ((this.pos = c), null)
						: ((a = 0 === c ? "\n" : this.subject.charAt(c - 1)),
							(n = -1 === (n = this.peek()) ? "\n" : yu(n)),
							(t = ju.test(n)),
							(n = Ou.test(n)),
							(r = ju.test(a)),
							(a = Ou.test(a)),
							(o = !t && (!n || r || a)),
							(i = !r && (!a || t || n)),
							(a =
								95 === e
									? ((s = o && (!i || a)), i && (!o || n))
									: 39 === e || 34 === e
										? ((s = o && !i), i)
										: 36 === e
											? ((s = !t), !r)
											: ((s = o), i)),
							(this.pos = c),
							{ numdelims: l, canOpen: s, canClose: a });
				}),
				(He.prototype.handleDelim = function (e, t) {
					var n,
						r,
						o = this.scanDelims(e);
					return (
						!!o &&
						((n = o.numdelims),
						(r = this.pos + 1),
						(this.pos += n),
						(r = Fe(
							39 === e ? "’" : 34 === e ? "“" : this.subject.slice(r - 1, this.pos),
							this.sourcepos(r, this.pos)
						)),
						t.appendChild(r),
						(o.canOpen || o.canClose) &&
							(this.options.smart || (39 !== e && 34 !== e)) &&
							((this.delimiters = {
								cc: e,
								numdelims: n,
								origdelims: n,
								node: r,
								previous: this.delimiters,
								next: null,
								canOpen: o.canOpen,
								canClose: o.canClose
							}),
							this.delimiters.previous) &&
							(this.delimiters.previous.next = this.delimiters),
						!0)
					);
				}),
				(He.prototype.removeDelimiter = function (e) {
					null !== e.previous && (e.previous.next = e.next),
						null === e.next
							? (this.delimiters = e.previous)
							: (e.next.previous = e.previous);
				}),
				(He.prototype.removeDelimitersBetween = function (e, t) {
					e.next !== t && ((e.next = t).previous = e);
				}),
				(He.prototype.processEmphasis = function (e) {
					((t = {})[95] = [e, e, e]),
						(t[42] = [e, e, e]),
						(t[39] = [e]),
						(t[34] = [e]),
						(t[126] = [e]),
						(t[36] = [e]);
					for (
						var t, n, r, o, i, s = t, a = this.delimiters;
						null !== a && a.previous !== e;

					)
						a = a.previous;
					for (; null !== a; ) {
						var l = a.cc,
							c = 95 === l || 42 === l;
						if (a.canClose) {
							for (
								n = a.previous, o = !1;
								null !== n && n !== e && n !== s[l][c ? a.origdelims % 3 : 0];

							) {
								if (
									((i =
										c &&
										(a.canOpen || n.canClose) &&
										a.origdelims % 3 != 0 &&
										(n.origdelims + a.origdelims) % 3 == 0),
									n.cc === a.cc && n.canOpen && !i)
								) {
									o = !0;
									break;
								}
								n = n.previous;
							}
							if (((r = a), c || 126 === l || 36 === l))
								if (o) {
									if (n) {
										for (
											var u,
												d = 2 <= a.numdelims && 2 <= n.numdelims ? 2 : 1,
												p = c ? 0 : 1,
												h = n.node,
												f = a.node,
												m = c ? (1 == d ? "emph" : "strong") : "strike",
												g = Be((m = 36 === l ? "customInline" : m)),
												m = h.sourcepos[1],
												v = f.sourcepos[0],
												y =
													((g.sourcepos = [
														[m[0], m[1] - d + 1],
														[v[0], v[1] + d - 1]
													]),
													(h.sourcepos[1][1] -= d),
													(f.sourcepos[0][1] += d),
													(h.literal = h.literal.slice(d)),
													(f.literal = f.literal.slice(d)),
													(n.numdelims -= d),
													(a.numdelims -= d),
													h.next);
											y && y !== f;

										)
											(u = y.next), y.unlink(), g.appendChild(y), (y = u);
										36 === l &&
											((d = (v = (m = g.firstChild).literal || "").split(
												/\s/
											)[0]),
											(g.info = d),
											v.length <= d.length
												? m.unlink()
												: ((m.sourcepos[0][1] += d.length),
													(m.literal = v.replace(d + " ", "")))),
											h.insertAfter(g),
											this.removeDelimitersBetween(n, a),
											n.numdelims <= p &&
												(0 === n.numdelims && h.unlink(),
												this.removeDelimiter(n)),
											a.numdelims <= p &&
												(0 === a.numdelims && f.unlink(),
												(m = a.next),
												this.removeDelimiter(a),
												(a = m));
									}
								} else a = a.next;
							else
								39 === l
									? ((a.node.literal = "’"),
										o && (n.node.literal = "‘"),
										(a = a.next))
									: 34 === l &&
										((a.node.literal = "”"),
										o && (n.node.literal = "“"),
										(a = a.next));
							o ||
								((s[l][c ? r.origdelims % 3 : 0] = r.previous), r.canOpen) ||
								this.removeDelimiter(r);
						} else a = a.next;
					}
					for (; null !== this.delimiters && this.delimiters !== e; )
						this.removeDelimiter(this.delimiters);
				}),
				(He.prototype.parseLinkTitle = function () {
					var e = this.match(Du);
					return null === e ? null : mc(e.substr(1, e.length - 2));
				}),
				(He.prototype.parseLinkDestination = function () {
					var e = this.match(Au);
					if (null !== e) return gc(mc(e.substr(1, e.length - 2)));
					if (60 === this.peek()) return null;
					for (var t = this.pos, n = 0, r = void 0; -1 !== (r = this.peek()); )
						if (92 === r && Lu.test(this.subject.charAt(this.pos + 1)))
							(this.pos += 1), -1 !== this.peek() && (this.pos += 1);
						else if (40 === r) (this.pos += 1), (n += 1);
						else if (41 === r) {
							if (n < 1) break;
							(this.pos += 1), --n;
						} else {
							if (null !== Vu.exec(yu(r))) break;
							this.pos += 1;
						}
					return (this.pos === t && 41 !== r) || 0 !== n
						? null
						: gc(mc((e = this.subject.substr(t, this.pos - t))));
				}),
				(He.prototype.parseLinkLabel = function () {
					var e = this.match(Wu);
					return null === e || 1001 < e.length ? 0 : e.length;
				}),
				(He.prototype.parseOpenBracket = function (e) {
					var t = this.pos,
						n = ((this.pos += 1), Fe("[", this.sourcepos(this.pos, this.pos)));
					return e.appendChild(n), this.addBracket(n, t, !1), !0;
				}),
				(He.prototype.parseBang = function (e) {
					var t,
						n = this.pos;
					return (
						(this.pos += 1),
						91 === this.peek()
							? ((this.pos += 1),
								(t = Fe("![", this.sourcepos(this.pos - 1, this.pos))),
								e.appendChild(t),
								this.addBracket(t, n + 1, !0))
							: ((t = Fe("!", this.sourcepos(this.pos, this.pos))), e.appendChild(t)),
						!0
					);
				}),
				(He.prototype.parseCloseBracket = function (e) {
					var t = null,
						n = null,
						r = !1,
						o = ((this.pos += 1), this.pos),
						i = this.brackets;
					if (null === i) e.appendChild(Fe("]", this.sourcepos(o, o)));
					else if (i.active) {
						var s,
							a,
							l = i.image,
							c = this.pos,
							u =
								(40 === this.peek() &&
									(this.pos++,
									this.spnl() &&
									null !== (t = this.parseLinkDestination()) &&
									this.spnl() &&
									(Vu.test(this.subject.charAt(this.pos - 1)) &&
										(n = this.parseLinkTitle()),
									1) &&
									this.spnl() &&
									41 === this.peek()
										? ((this.pos += 1), (r = !0))
										: (this.pos = c)),
								"");
						if (
							(r ||
								((a = this.pos),
								2 < (s = this.parseLinkLabel())
									? (u = this.subject.slice(a, a + s))
									: i.bracketAfter || (u = this.subject.slice(i.index, o)),
								0 === s && (this.pos = c),
								u &&
									((u = Su(u)), (a = this.refMap[u])) &&
									((t = a.destination), (n = a.title), (r = !0))),
							r)
						) {
							for (
								var d,
									p = Be(l ? "image" : "link"),
									h =
										((p.destination = t),
										(p.title = n || ""),
										(p.sourcepos = [i.startpos, this.sourcepos(this.pos)]),
										i.node.next);
								h;

							)
								(d = h.next), h.unlink(), p.appendChild(h), (h = d);
							if (
								(e.appendChild(p),
								this.processEmphasis(i.previousDelimiter),
								this.removeBracket(),
								i.node.unlink(),
								!l)
							)
								for (i = this.brackets; null !== i; )
									i.image || (i.active = !1), (i = i.previous);
						} else
							this.removeBracket(),
								(this.pos = o),
								e.appendChild(Fe("]", this.sourcepos(o, o)));
						this.options.referenceDefinition &&
							(this.refLinkCandidateMap[e.id] = { node: e, refLabel: u });
					} else e.appendChild(Fe("]", this.sourcepos(o, o))), this.removeBracket();
					return !0;
				}),
				(He.prototype.addBracket = function (e, t, n) {
					null !== this.brackets && (this.brackets.bracketAfter = !0),
						(this.brackets = {
							node: e,
							startpos: this.sourcepos(t + (n ? 0 : 1)),
							previous: this.brackets,
							previousDelimiter: this.delimiters,
							index: t,
							image: n,
							active: !0
						});
				}),
				(He.prototype.removeBracket = function () {
					this.brackets && (this.brackets = this.brackets.previous);
				}),
				(He.prototype.parseEntity = function (e) {
					var t,
						n = this.pos + 1;
					return (
						!!(t = this.match(Iu)) &&
						(e.appendChild(Fe(Hl.decodeHTML(t), this.sourcepos(n, this.pos))), !0)
					);
				}),
				(He.prototype.parseString = function (e) {
					var t,
						n,
						r = this.pos + 1;
					return (
						!!(t = this.match(Ju)) &&
						(this.options.smart
							? ((n = t.replace(Bu, "…").replace(Fu, function (e) {
									var t = 0,
										n = 0;
									return (
										e.length % 3 == 0
											? (n = e.length / 3)
											: e.length % 2 == 0
												? (t = e.length / 2)
												: (n =
														e.length % 3 == 2
															? ((t = 1), (e.length - 2) / 3)
															: ((t = 2), (e.length - 4) / 3)),
										bc("—", n) + bc("–", t)
									);
								})),
								e.appendChild(Fe(n, this.sourcepos(r, this.pos))))
							: ((n = Fe(t, this.sourcepos(r, this.pos))), e.appendChild(n)),
						!0)
					);
				}),
				(He.prototype.parseNewline = function (e) {
					this.pos += 1;
					var t,
						n,
						r = e.lastChild;
					return (
						r && "text" === r.type && " " === r.literal[r.literal.length - 1]
							? ((t = " " === r.literal[r.literal.length - 2]),
								(n = r.literal.length),
								(r.literal = r.literal.replace($u, "")),
								(n = n - r.literal.length),
								(r.sourcepos[1][1] -= n),
								e.appendChild(
									Be(
										t ? "linebreak" : "softbreak",
										this.sourcepos(this.pos - n, this.pos)
									)
								))
							: e.appendChild(Be("softbreak", this.sourcepos(this.pos, this.pos))),
						this.nextLine(),
						this.match(_u),
						!0
					);
				}),
				(He.prototype.parseReference = function (e, t) {
					if (!this.options.referenceDefinition) return 0;
					(this.subject = e.stringContent), (this.pos = 0);
					var n = null,
						r = this.pos,
						o = this.parseLinkLabel();
					if (0 === o) return 0;
					o = this.subject.substr(0, o);
					if (58 !== this.peek()) return (this.pos = r), 0;
					this.pos++, this.spnl();
					var i,
						s,
						a = this.parseLinkDestination();
					return null === a ||
						((i = this.pos),
						this.spnl(),
						null === (n = this.pos !== i ? this.parseLinkTitle() : n) &&
							((n = ""), (this.pos = i)),
						(s = !0),
						!(s =
							null === this.match(Uu)
								? "" !== n && ((n = ""), (this.pos = i), null !== this.match(Uu))
								: s)) ||
						"" === (i = Su(o))
						? ((this.pos = r), 0)
						: ((s = this.getReferenceDefSourcepos(e)),
							(e.sourcepos[0][0] = s[1][0] + 1),
							((o = Be("refDef", s)).title = n),
							(o.dest = a),
							(o.label = i),
							e.insertBefore(o),
							t[i] ? (this.refDefCandidateMap[o.id] = o) : (t[i] = zd(o)),
							this.pos - r);
				}),
				(He.prototype.mergeTextNodes = function (e) {
					for (var t = []; (r = e.next()); ) {
						var n = r.entering,
							r = r.node;
						if (n && "text" === r.type) t.push(r);
						else if (1 === t.length) t = [];
						else if (1 < t.length) {
							var o = t[0],
								n = t[t.length - 1];
							o.sourcepos && n.sourcepos && (o.sourcepos[1] = n.sourcepos[1]),
								(o.next = n.next),
								o.next && (o.next.prev = o);
							for (var i = 1; i < t.length; i += 1)
								(o.literal += t[i].literal), t[i].unlink();
							t = [];
						}
					}
				}),
				(He.prototype.getReferenceDefSourcepos = function (e) {
					for (
						var t = e.stringContent.split(/\n|\r\n/),
							n = !1,
							r = 0,
							o = { line: 0, ch: 0 },
							i = 0;
						i < t.length;
						i += 1
					) {
						var s = t[i];
						if (Vu.test(s)) break;
						if (/\:/.test(s) && 0 === r) {
							if (n) break;
							var a = s.indexOf(":") === s.length - 1 ? i + 1 : i,
								o = { line: a, ch: t[a].length },
								n = !0;
						}
						a = s.match(/'|"/g);
						if ((a && (r += a.length), 2 === r)) {
							o = { line: i, ch: s.length };
							break;
						}
					}
					return [
						[e.sourcepos[0][0], e.sourcepos[0][1]],
						[e.sourcepos[0][0] + o.line, o.ch]
					];
				}),
				(He.prototype.parseInline = function (e) {
					var t,
						n = !1,
						r = this.peek();
					if (-1 === r) return !1;
					switch (r) {
						case 10:
							n = this.parseNewline(e);
							break;
						case 92:
							n = this.parseBackslash(e);
							break;
						case 96:
							n = this.parseBackticks(e);
							break;
						case 42:
						case 95:
						case 126:
						case 36:
							n = this.handleDelim(r, e);
							break;
						case 39:
						case 34:
							n = !(null == (t = this.options) || !t.smart) && this.handleDelim(r, e);
							break;
						case 91:
							n = this.parseOpenBracket(e);
							break;
						case 33:
							n = this.parseBang(e);
							break;
						case 93:
							n = this.parseCloseBracket(e);
							break;
						case 60:
							n = this.parseAutolink(e) || this.parseHtmlTag(e);
							break;
						case 38:
							e.disabledEntityParse || (n = this.parseEntity(e));
							break;
						default:
							n = this.parseString(e);
					}
					return (
						n ||
							((this.pos += 1),
							e.appendChild(Fe(yu(r), this.sourcepos(this.pos, this.pos + 1)))),
						!0
					);
				}),
				(He.prototype.parse = function (e) {
					for (
						this.subject = e.stringContent.trim(),
							this.pos = 0,
							this.delimiters = null,
							this.brackets = null,
							this.lineOffsets = e.lineOffsets || [0],
							this.lineIdx = 0,
							this.linePosOffset = 0,
							this.lineStartNum = e.sourcepos[0][0],
							"heading" === e.type && (this.lineOffsets[0] += e.level + 1);
						this.parseInline(e);

					);
					this.processEmphasis((e.stringContent = null)), this.mergeTextNodes(e.walker());
					var t = this.options,
						n = t.extendedAutolinks,
						r = t.customParser;
					if ((n && Tu(e.walker(), n), r && e.firstChild))
						for (var o, i = e.firstChild.walker(); (o = i.next()); ) {
							var s = o.node;
							r[s.type] &&
								r[s.type](s, { entering: o.entering, options: this.options });
						}
				}),
				He);
		function He(e) {
			(this.subject = ""),
				(this.delimiters = null),
				(this.brackets = null),
				(this.pos = 0),
				(this.lineStartNum = 0),
				(this.lineIdx = 0),
				(this.lineOffsets = [0]),
				(this.linePosOffset = 0),
				(this.refMap = {}),
				(this.refLinkCandidateMap = {}),
				(this.refDefCandidateMap = {}),
				(this.options = e);
		}
		var Ku = /^\[([ \txX])\][ \t]+/,
			Zu = 9,
			Xu = 32,
			Qu = /[^ \t\f\v\r\n]/,
			Yu = /^(?:`{3,}|~{3,})(?= *$)/;
		function ed(e) {
			for (var t = e; t; ) {
				if (t.lastLineBlank) return 1;
				var n = t.type;
				if (t.lastLineChecked || ("list" !== n && "item" !== n)) {
					t.lastLineChecked = !0;
					break;
				}
				(t.lastLineChecked = !0), (t = t.lastChild);
			}
		}
		function td(e, t) {
			return t < e.length ? e.charCodeAt(t) : -1;
		}
		function nd(e) {
			return !Qu.test(e);
		}
		function rd(e) {
			return e === Xu || e === Zu;
		}
		var od = /^\$\$$/,
			id = {
				document: {
					continue: function () {
						return 0;
					},
					finalize: function () {},
					canContain: function (e) {
						return "item" !== e;
					},
					acceptsLines: !1
				},
				list: {
					continue: function () {
						return 0;
					},
					finalize: function (e, t) {
						for (var n = t.firstChild; n; ) {
							if (ed(n) && n.next) {
								t.listData.tight = !1;
								break;
							}
							for (var r = n.firstChild; r; ) {
								if (ed(r) && (n.next || r.next)) {
									t.listData.tight = !1;
									break;
								}
								r = r.next;
							}
							n = n.next;
						}
					},
					canContain: function (e) {
						return "item" === e;
					},
					acceptsLines: !1
				},
				blockQuote: {
					continue: function (e) {
						var t = e.currentLine;
						return e.indented || 62 !== td(t, e.nextNonspace)
							? 1
							: (e.advanceNextNonspace(),
								e.advanceOffset(1, !1),
								rd(td(t, e.offset)) && e.advanceOffset(1, !0),
								0);
					},
					finalize: function () {},
					canContain: function (e) {
						return "item" !== e;
					},
					acceptsLines: !1
				},
				item: {
					continue: function (e, t) {
						if (e.blank) {
							if (null === t.firstChild) return 1;
							e.advanceNextNonspace();
						} else {
							if (!(e.indent >= t.listData.markerOffset + t.listData.padding))
								return 1;
							e.advanceOffset(t.listData.markerOffset + t.listData.padding, !0);
						}
						return 0;
					},
					finalize: function (e, t) {
						var n, r, o;
						t.firstChild &&
							"paragraph" === t.firstChild.type &&
							(r = (n = t.firstChild).stringContent.match(Ku)) &&
							((o = r[0].length),
							(n.stringContent = n.stringContent.substring(o - 1)),
							(n.sourcepos[0][1] += o),
							(n.lineOffsets[0] += o),
							(t.listData.task = !0),
							(t.listData.checked = /[xX]/.test(r[1])));
					},
					canContain: function (e) {
						return "item" !== e;
					},
					acceptsLines: !1
				},
				heading: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function () {
						return !1;
					},
					acceptsLines: !1
				},
				thematicBreak: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function () {
						return !1;
					},
					acceptsLines: !1
				},
				codeBlock: {
					continue: function (e, t) {
						var n = e.currentLine,
							r = e.indent;
						if (t.isFenced) {
							var o =
								r <= 3 &&
								n.charAt(e.nextNonspace) === t.fenceChar &&
								n.slice(e.nextNonspace).match(Yu);
							if (o && o[0].length >= t.fenceLength)
								return (
									(e.lastLineLength = e.offset + r + o[0].length),
									e.finalize(t, e.lineNumber),
									2
								);
							for (var i = t.fenceOffset; 0 < i && rd(td(n, e.offset)); )
								e.advanceOffset(1, !0), i--;
						} else if (4 <= r) e.advanceOffset(4, !0);
						else {
							if (!e.blank) return 1;
							e.advanceNextNonspace();
						}
						return 0;
					},
					finalize: function (e, t) {
						var n, r, o;
						null !== t.stringContent &&
							(t.isFenced
								? ((o = (r = t.stringContent).indexOf("\n")),
									(n = r.slice(0, o)),
									(r = r.slice(o + 1)),
									(o = n.match(/^(\s*)(.*)/)),
									(t.infoPadding = o[1].length),
									(t.info = mc(o[2].trim())),
									(t.literal = r))
								: (t.literal =
										null == (n = t.stringContent)
											? void 0
											: n.replace(/(\n *)+$/, "\n")),
							(t.stringContent = null));
					},
					canContain: function () {
						return !1;
					},
					acceptsLines: !0
				},
				htmlBlock: {
					continue: function (e, t) {
						return !e.blank || (6 !== t.htmlBlockType && 7 !== t.htmlBlockType) ? 0 : 1;
					},
					finalize: function (e, t) {
						var n;
						(t.literal =
							(null == (n = t.stringContent) ? void 0 : n.replace(/(\n *)+$/, "")) ||
							null),
							(t.stringContent = null);
					},
					canContain: function () {
						return !1;
					},
					acceptsLines: !0
				},
				paragraph: {
					continue: function (e) {
						return e.blank ? 1 : 0;
					},
					finalize: function (e, t) {
						if (null !== t.stringContent) {
							for (
								var n, r = !1;
								91 === td(t.stringContent, 0) &&
								(n = e.inlineParser.parseReference(t, e.refMap));

							)
								(t.stringContent = t.stringContent.slice(n)), (r = !0);
							r && nd(t.stringContent) && t.unlink();
						}
					},
					canContain: function () {
						return !1;
					},
					acceptsLines: !0
				},
				table: {
					continue: function () {
						return 0;
					},
					finalize: function () {},
					canContain: function (e) {
						return "tableHead" === e || "tableBody" === e;
					},
					acceptsLines: !1
				},
				tableBody: {
					continue: function () {
						return 0;
					},
					finalize: function () {},
					canContain: function (e) {
						return "tableRow" === e;
					},
					acceptsLines: !1
				},
				tableHead: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function (e) {
						return "tableRow" === e || "tableDelimRow" === e;
					},
					acceptsLines: !1
				},
				tableRow: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function (e) {
						return "tableCell" === e;
					},
					acceptsLines: !1
				},
				tableCell: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function () {
						return !1;
					},
					acceptsLines: !1
				},
				tableDelimRow: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function (e) {
						return "tableDelimCell" === e;
					},
					acceptsLines: !1
				},
				tableDelimCell: {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function () {
						return !1;
					},
					acceptsLines: !1
				},
				refDef: (Re = {
					continue: function () {
						return 1;
					},
					finalize: function () {},
					canContain: function () {
						return !1;
					},
					acceptsLines: !0
				}),
				customBlock: {
					continue: function (e, t) {
						var n = e.currentLine,
							r = n.match(od);
						if (r)
							return (e.lastLineLength = r[0].length), e.finalize(t, e.lineNumber), 2;
						for (var o = t.offset; 0 < o && rd(td(n, e.offset)); )
							e.advanceOffset(1, !0), o--;
						return 0;
					},
					finalize: function (e, t) {
						var n, r, o;
						null !== t.stringContent &&
							((o = (r = t.stringContent).indexOf("\n")),
							(n = r.slice(0, o)),
							(r = r.slice(o + 1)),
							(o = n.match(/^(\s*)(.*)/)),
							(t.info = mc(o[2].trim())),
							(t.literal = r),
							(t.stringContent = null));
					},
					canContain: function () {
						return !1;
					},
					acceptsLines: !0
				},
				frontMatter: Re
			};
		function sd(e) {
			for (var t, n = 0, r = 0, o = [], i = 0; i < e.length; i += 1)
				"|" === e[i] &&
					"\\" !== e[i - 1] &&
					((t = e.substring(n, i)),
					0 === n && wc(t) ? (r = i + 1) : o.push(t),
					(n = i + 1));
			return n < e.length && (wc((t = e.substring(n, e.length))) || o.push(t)), [r, o];
		}
		function ad(e, t, n, r) {
			for (var o = [], i = 0, s = t; i < s.length; i++) {
				var a = s[i],
					l = a.match(/^[ \t]+/),
					l = l ? l[0].length : 0,
					c = void 0,
					u = void 0,
					d =
						((u =
							l === a.length
								? ((c = l = 0), "")
								: ((c = (d = a.match(/[ \t]+$/)) ? d[0].length : 0),
									a.slice(l, a.length - c))),
						r + l),
					p = Be(e, [
						[n, r],
						[n, r + a.length - 1]
					]);
				(p.stringContent = u.replace(/\\\|/g, "|")),
					(p.startIdx = o.length),
					(p.endIdx = o.length),
					(p.lineOffsets = [d - 1]),
					(p.paddingLeft = l),
					(p.paddingRight = c),
					o.push(p),
					(r += a.length + 1);
			}
			return o;
		}
		function ld(e) {
			var t = null,
				e = e.stringContent,
				n = e[0];
			return (
				":" === e[e.length - 1]
					? (t = ":" === n ? "center" : "right")
					: ":" === n && (t = "left"),
				{ align: t }
			);
		}
		var cd = /^(\$\$)(\s*[a-zA-Z])+/,
			ud = /^(\$\$)(\s*[a-zA-Z])+.*(\$\$)/,
			dd = /^`{3,}(?!.*`)|^~{3,}/,
			pd = [
				/./,
				/^<(?:script|pre|style)(?:\s|>|$)/i,
				/^<!--/,
				/^<[?]/,
				/^<![A-Z]/,
				/^<!\[CDATA\[/,
				/^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
				new RegExp("^(?:" + Hn + "|" + Pe + ")\\s*$", "i")
			],
			hd = /^(?:=+|-+)[ \t]*$/,
			fd = /^#{1,6}(?:[ \t]+|$)/,
			md = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/,
			gd = /^[*+-]/,
			vd = /^(\d{1,9})([.)])/;
		function yd(e, t) {
			return e.options.disallowDeepHeading && ("blockQuote" === t.type || "item" === t.type);
		}
		function bd(e, t) {
			var n = e.currentLine;
			return 1 === e.lineNumber && !e.indented && "document" === t.type && kd.test(n)
				? (e.closeUnmatchedBlocks(),
					(e.addChild("frontMatter", e.nextNonspace).stringContent = n),
					e.advanceNextNonspace(),
					e.advanceOffset(n.length, !1),
					2)
				: 0;
		}
		var wd = [
				function (e) {
					return e.indented || 62 !== td(e.currentLine, e.nextNonspace)
						? 0
						: (e.advanceNextNonspace(),
							e.advanceOffset(1, !1),
							rd(td(e.currentLine, e.offset)) && e.advanceOffset(1, !0),
							e.closeUnmatchedBlocks(),
							e.addChild("blockQuote", e.nextNonspace),
							1);
				},
				function (e, t) {
					var n;
					return e.indented ||
						yd(e, t) ||
						!(t = e.currentLine.slice(e.nextNonspace).match(fd))
						? 0
						: (e.advanceNextNonspace(),
							e.advanceOffset(t[0].length, !1),
							e.closeUnmatchedBlocks(),
							((n = e.addChild("heading", e.nextNonspace)).level =
								t[0].trim().length),
							(n.headingType = "atx"),
							(n.stringContent = e.currentLine
								.slice(e.offset)
								.replace(/^[ \t]*#+[ \t]*$/, "")
								.replace(/[ \t]+#+[ \t]*$/, "")),
							e.advanceOffset(e.currentLine.length - e.offset),
							2);
				},
				function (e) {
					var t, n, r;
					return !e.indented && (t = e.currentLine.slice(e.nextNonspace).match(dd))
						? ((n = t[0].length),
							e.closeUnmatchedBlocks(),
							((r = e.addChild("codeBlock", e.nextNonspace)).isFenced = !0),
							(r.fenceLength = n),
							(r.fenceChar = t[0][0]),
							(r.fenceOffset = e.indent),
							e.advanceNextNonspace(),
							e.advanceOffset(n, !1),
							2)
						: 0;
				},
				function (e, t) {
					if (!e.indented && 60 === td(e.currentLine, e.nextNonspace))
						for (
							var n = e.currentLine.slice(e.nextNonspace),
								r = e.options.disallowedHtmlBlockTags,
								o = void 0,
								o = 1;
							o <= 7;
							o++
						) {
							var i = n.match(pd[o]);
							if (i) {
								if (7 === o) {
									if ("paragraph" === t.type) return 0;
									if (0 < r.length)
										if (
											new RegExp("</?(?:" + r.join("|") + ")", "i").test(i[0])
										)
											return 0;
								}
								return (
									e.closeUnmatchedBlocks(),
									(e.addChild("htmlBlock", e.offset).htmlBlockType = o),
									2
								);
							}
						}
					return 0;
				},
				function (e, t) {
					var n;
					if (
						null === t.stringContent ||
						e.indented ||
						"paragraph" !== t.type ||
						yd(e, t.parent) ||
						!(n = e.currentLine.slice(e.nextNonspace).match(hd))
					)
						return 0;
					e.closeUnmatchedBlocks();
					for (
						var r, o = void 0;
						91 === td(t.stringContent, 0) &&
						(o = e.inlineParser.parseReference(t, e.refMap));

					)
						t.stringContent = t.stringContent.slice(o);
					return 0 < t.stringContent.length
						? (((r = Be("heading", t.sourcepos)).level = "=" === n[0][0] ? 1 : 2),
							(r.headingType = "setext"),
							(r.stringContent = t.stringContent),
							t.insertAfter(r),
							t.unlink(),
							(e.tip = r),
							e.advanceOffset(e.currentLine.length - e.offset, !1),
							2)
						: 0;
				},
				function (e) {
					return !e.indented && md.test(e.currentLine.slice(e.nextNonspace))
						? (e.closeUnmatchedBlocks(),
							e.addChild("thematicBreak", e.nextNonspace),
							e.advanceOffset(e.currentLine.length - e.offset, !1),
							2)
						: 0;
				},
				function (e, t) {
					var n,
						r,
						o = t;
					return (e.indented && "list" !== t.type) ||
						!(t = ((e, t) => {
							var n,
								r,
								o = e.currentLine.slice(e.nextNonspace),
								i = {
									type: "bullet",
									tight: !0,
									bulletChar: "",
									start: 0,
									delimiter: "",
									padding: 0,
									markerOffset: e.indent,
									task: !1,
									checked: !1
								};
							if (4 <= e.indent) return null;
							if ((n = o.match(gd))) (i.type = "bullet"), (i.bulletChar = n[0][0]);
							else {
								if (!(n = o.match(vd)) || ("paragraph" === t.type && "1" !== n[1]))
									return null;
								(i.type = "ordered"),
									(i.start = parseInt(n[1], 10)),
									(i.delimiter = n[2]);
							}
							if (
								-1 !== (r = td(e.currentLine, e.nextNonspace + n[0].length)) &&
								r !== Zu &&
								r !== Xu
							)
								return null;
							if (
								"paragraph" === t.type &&
								!e.currentLine.slice(e.nextNonspace + n[0].length).match(Qu)
							)
								return null;
							e.advanceNextNonspace(), e.advanceOffset(n[0].length, !0);
							for (
								var s = e.column, o = e.offset;
								e.advanceOffset(1, !0),
									(r = td(e.currentLine, e.offset)),
									e.column - s < 5 && rd(r);

							);
							var t = -1 === td(e.currentLine, e.offset),
								a = e.column - s;
							return (
								5 <= a || a < 1 || t
									? ((i.padding = n[0].length + 1),
										(e.column = s),
										(e.offset = o),
										rd(td(e.currentLine, e.offset)) && e.advanceOffset(1, !0))
									: (i.padding = n[0].length + a),
								i
							);
						})(e, o))
						? 0
						: (e.closeUnmatchedBlocks(),
							("list" === e.tip.type &&
								((n = o.listData), (r = t), n.type === r.type) &&
								n.delimiter === r.delimiter &&
								n.bulletChar === r.bulletChar) ||
								((o = e.addChild("list", e.nextNonspace)).listData = t),
							((o = e.addChild("item", e.nextNonspace)).listData = t),
							1);
				},
				function (e) {
					return e.indented && "paragraph" !== e.tip.type && !e.blank
						? (e.advanceOffset(4, !0),
							e.closeUnmatchedBlocks(),
							e.addChild("codeBlock", e.offset),
							2)
						: 0;
				},
				function (e, t) {
					var n,
						r,
						o,
						i,
						s,
						a,
						l,
						c,
						u,
						d,
						p,
						h,
						f,
						m = t.stringContent;
					return "paragraph" !== t.type ||
						e.indented ||
						e.blank ||
						((n = m.length - 1),
						(f = m.lastIndexOf("\n", n - 1) + 1),
						(n = m.slice(f, n)),
						(d = e.currentLine.slice(e.nextNonspace)),
						(r = (o = sd(n))[0]),
						(o = o[1]),
						(i = (s = sd(d))[0]),
						(s = s[1]),
						(a = /^[ \t]*:?-+:?[ \t]*$/),
						!o.length) ||
						!s.length ||
						s.some(function (e) {
							return !a.test(e);
						}) ||
						(1 === s.length && 0 !== d.indexOf("|"))
						? 0
						: ((d = t.lineOffsets),
							((u = Be("table", [
								[(l = e.lineNumber - 1), (c = Mu(d) + 1)],
								[e.lineNumber, e.offset]
							])).columns = s.map(function () {
								return { align: null };
							})),
							t.insertAfter(u),
							1 === d.length
								? t.unlink()
								: ((t.stringContent = m.slice(0, f)),
									(m = m.lastIndexOf("\n", f - 2) + 1),
									(e.lastLineLength = d[d.length - 2] + (f - m - 1)),
									e.finalize(t, l - 1)),
							e.advanceOffset(e.currentLine.length - e.offset, !1),
							(d = Be("tableHead", [
								[l, c],
								[e.lineNumber, e.offset]
							])),
							u.appendChild(d),
							(p = Be("tableRow", [
								[l, c],
								[l, c + n.length - 1]
							])),
							(h = Be("tableDelimRow", [
								[e.lineNumber, e.nextNonspace + 1],
								[e.lineNumber, e.offset]
							])),
							d.appendChild(p),
							d.appendChild(h),
							ad("tableCell", o, l, c + r).forEach(function (e) {
								p.appendChild(e);
							}),
							(f = ad(
								"tableDelimCell",
								s,
								e.lineNumber,
								e.nextNonspace + 1 + i
							)).forEach(function (e) {
								h.appendChild(e);
							}),
							(u.columns = f.map(ld)),
							(e.tip = u),
							2);
				},
				function (e, t) {
					var n, r, o;
					return ("table" !== t.type && "tableBody" !== t.type) ||
						(!e.blank && -1 === e.currentLine.indexOf("|"))
						? 0
						: (e.advanceOffset(e.currentLine.length - e.offset, !1),
							e.blank
								? ("tableBody" === (o = t).type &&
										((o = t.parent), e.finalize(t, e.lineNumber - 1)),
									e.finalize(o, e.lineNumber - 1),
									0)
								: ("table" === (o = t).type &&
										((o = e.addChild(
											"tableBody",
											e.nextNonspace
										)).stringContent = null),
									(n = Be("tableRow", [
										[e.lineNumber, e.nextNonspace + 1],
										[e.lineNumber, e.currentLine.length]
									])),
									o.appendChild(n),
									(r = o.parent),
									(o = (t = sd(e.currentLine.slice(e.nextNonspace)))[0]),
									ad(
										"tableCell",
										t[1],
										e.lineNumber,
										e.nextNonspace + 1 + o
									).forEach(function (e, t) {
										t >= r.columns.length && (e.ignored = !0), n.appendChild(e);
									}),
									2));
				},
				function (e) {
					var t, n;
					return e.indented || ud.test(e.currentLine) || !(t = e.currentLine.match(cd))
						? 0
						: ((t = t[1].length),
							e.closeUnmatchedBlocks(),
							((n = e.addChild("customBlock", e.nextNonspace)).syntaxLength = t),
							(n.offset = e.indent),
							e.advanceNextNonspace(),
							e.advanceOffset(t, !1),
							2);
				}
			],
			kd = /^(-{3}|\+{3}|;{3})$/,
			xd = {
				continue: function (e, t) {
					var n = e.currentLine,
						r = n.match(kd);
					return "frontMatter" === t.type && r
						? ((t.stringContent += n),
							(e.lastLineLength = r[0].length),
							e.finalize(t, e.lineNumber),
							2)
						: 0;
				},
				finalize: function (e, t) {
					null !== t.stringContent &&
						((t.literal = t.stringContent), (t.stringContent = null));
				},
				canContain: function () {
					return !1;
				},
				acceptsLines: !0
			},
			Cd = [/./, /<\/(?:script|pre|style)>/i, /-->/, /\?>/, />/, /\]\]>/],
			Td = /^[#`~*+_=<>0-9-;$]/,
			Md = /\r\n|\n|\r/;
		function Sd() {
			return Be("document", [
				[1, 1],
				[0, 0]
			]);
		}
		var Ed = {
				smart: !1,
				tagFilter: !1,
				extendedAutolinks: !1,
				disallowedHtmlBlockTags: [],
				referenceDefinition: !1,
				disallowDeepHeading: !1,
				customParser: null,
				frontMatter: !1
			},
			Nd =
				((Od.prototype.advanceOffset = function (e, t) {
					void 0 === t && (t = !1);
					for (var n, r, o, i = this.currentLine; 0 < e && (o = i[this.offset]); )
						"\t" === o
							? ((n = 4 - (this.column % 4)),
								t
									? ((this.partiallyConsumedTab = e < n),
										(this.column += r = e < n ? e : n),
										(this.offset += this.partiallyConsumedTab ? 0 : 1),
										(e -= r))
									: ((this.partiallyConsumedTab = !1),
										(this.column += n),
										(this.offset += 1),
										--e))
							: ((this.partiallyConsumedTab = !1),
								(this.offset += 1),
								(this.column += 1),
								--e);
				}),
				(Od.prototype.advanceNextNonspace = function () {
					(this.offset = this.nextNonspace),
						(this.column = this.nextNonspaceColumn),
						(this.partiallyConsumedTab = !1);
				}),
				(Od.prototype.findNextNonspace = function () {
					for (
						var e, t = this.currentLine, n = this.offset, r = this.column;
						"" !== (e = t.charAt(n));

					)
						if (" " === e) n++, r++;
						else {
							if ("\t" !== e) break;
							n++, (r += 4 - (r % 4));
						}
					(this.blank = "\n" === e || "\r" === e || "" === e),
						(this.nextNonspace = n),
						(this.nextNonspaceColumn = r),
						(this.indent = this.nextNonspaceColumn - this.column),
						(this.indented = 4 <= this.indent);
				}),
				(Od.prototype.addLine = function () {
					var e;
					this.partiallyConsumedTab &&
						((this.offset += 1),
						(e = 4 - (this.column % 4)),
						(this.tip.stringContent += bc(" ", e))),
						this.tip.lineOffsets
							? this.tip.lineOffsets.push(this.offset)
							: (this.tip.lineOffsets = [this.offset]),
						(this.tip.stringContent += this.currentLine.slice(this.offset) + "\n");
				}),
				(Od.prototype.addChild = function (e, t) {
					for (; !id[this.tip.type].canContain(e); )
						this.finalize(this.tip, this.lineNumber - 1);
					t = Be(e, [
						[this.lineNumber, t + 1],
						[0, 0]
					]);
					return (t.stringContent = ""), this.tip.appendChild(t), (this.tip = t);
				}),
				(Od.prototype.closeUnmatchedBlocks = function () {
					if (!this.allClosed) {
						for (; this.oldtip !== this.lastMatchedContainer; ) {
							var e = this.oldtip.parent;
							this.finalize(this.oldtip, this.lineNumber - 1), (this.oldtip = e);
						}
						this.allClosed = !0;
					}
				}),
				(Od.prototype.finalize = function (e, t) {
					var n = e.parent;
					(e.open = !1),
						(e.sourcepos[1] = [t, this.lastLineLength]),
						id[e.type].finalize(this, e),
						(this.tip = n);
				}),
				(Od.prototype.processInlines = function (e) {
					var t = this.options.customParser,
						n = e.walker();
					for (
						this.inlineParser.refMap = this.refMap,
							this.inlineParser.refLinkCandidateMap = this.refLinkCandidateMap,
							this.inlineParser.refDefCandidateMap = this.refDefCandidateMap,
							this.inlineParser.options = this.options;
						(o = n.next());

					) {
						var r = o.node,
							o = o.entering,
							i = r.type;
						t && t[i] && t[i](r, { entering: o, options: this.options }),
							o ||
								("paragraph" !== i &&
									"heading" !== i &&
									("tableCell" !== i || r.ignored)) ||
								this.inlineParser.parse(r);
					}
				}),
				(Od.prototype.incorporateLine = function (e) {
					for (
						var t,
							n = this.doc,
							r =
								((this.oldtip = this.tip),
								(this.offset = 0),
								(this.column = 0),
								(this.blank = !1),
								(this.partiallyConsumedTab = !1),
								(this.lineNumber += 1),
								-1 !== e.indexOf("\0") && (e = e.replace(/\0/g, "�")),
								(this.currentLine = e),
								!0);
						(t = n.lastChild) && t.open;

					) {
						switch (((n = t), this.findNextNonspace(), id[n.type].continue(this, n))) {
							case 0:
								break;
							case 1:
								r = !1;
								break;
							case 2:
								return void (this.lastLineLength = e.length);
							default:
								throw new Error(
									"continue returned illegal value, must be 0, 1, or 2"
								);
						}
						if (!r) {
							n = n.parent;
							break;
						}
					}
					this.allClosed = n === this.oldtip;
					for (
						var o =
								"paragraph" !== (this.lastMatchedContainer = n).type &&
								id[n.type].acceptsLines,
							i = wd.length;
						!o;

					) {
						if (
							(this.findNextNonspace(),
							"table" !== n.type &&
								"tableBody" !== n.type &&
								"paragraph" !== n.type &&
								!this.indented &&
								!Td.test(e.slice(this.nextNonspace)))
						) {
							this.advanceNextNonspace();
							break;
						}
						for (var s = 0; s < i; ) {
							var a = wd[s](this, n);
							if (1 === a) {
								n = this.tip;
								break;
							}
							if (2 === a) {
								(n = this.tip), (o = !0);
								break;
							}
							s++;
						}
						if (s === i) {
							this.advanceNextNonspace();
							break;
						}
					}
					if (this.allClosed || this.blank || "paragraph" !== this.tip.type) {
						this.closeUnmatchedBlocks(),
							this.blank && n.lastChild && (n.lastChild.lastLineBlank = !0);
						for (
							var l = n.type,
								c =
									this.blank &&
									!(
										"blockQuote" === l ||
										(du(n) && n.isFenced) ||
										("item" === l &&
											!n.firstChild &&
											n.sourcepos[0][0] === this.lineNumber)
									),
								u = n;
							u;

						)
							(u.lastLineBlank = c), (u = u.parent);
						id[l].acceptsLines
							? (this.addLine(),
								"htmlBlock" === n.type &&
									1 <= n.htmlBlockType &&
									n.htmlBlockType <= 5 &&
									Cd[n.htmlBlockType].test(this.currentLine.slice(this.offset)) &&
									((this.lastLineLength = e.length),
									this.finalize(n, this.lineNumber)))
							: this.offset < e.length &&
								!this.blank &&
								((n = this.addChild("paragraph", this.offset)),
								this.advanceNextNonspace(),
								this.addLine());
					} else this.addLine();
					this.lastLineLength = e.length;
				}),
				(Od.prototype.parse = function (e, t) {
					(this.doc = Sd()),
						(this.tip = this.doc),
						(this.lineNumber = 0),
						(this.lastLineLength = 0),
						(this.offset = 0),
						(this.column = 0),
						(this.lastMatchedContainer = this.doc),
						(this.currentLine = "");
					var n = e.split(Md),
						r = n.length;
					(this.lines = t || n),
						this.options.referenceDefinition && this.clearRefMaps(),
						10 === e.charCodeAt(e.length - 1) && --r;
					for (var o = 0; o < r; o++) this.incorporateLine(n[o]);
					for (; this.tip; ) this.finalize(this.tip, r);
					return this.processInlines(this.doc), this.doc;
				}),
				(Od.prototype.partialParseStart = function (e, t) {
					(this.doc = Sd()),
						(this.tip = this.doc),
						(this.lineNumber = e - 1),
						(this.lastLineLength = 0),
						(this.offset = 0),
						(this.column = 0),
						(this.lastMatchedContainer = this.doc),
						(this.currentLine = "");
					for (var n = t.length, r = 0; r < n; r++) this.incorporateLine(t[r]);
					return this.doc;
				}),
				(Od.prototype.partialParseExtends = function (e) {
					for (var t = 0; t < e.length; t++) this.incorporateLine(e[t]);
				}),
				(Od.prototype.partialParseFinish = function () {
					for (; this.tip; ) this.finalize(this.tip, this.lineNumber);
					this.processInlines(this.doc);
				}),
				(Od.prototype.setRefMaps = function (e, t, n) {
					(this.refMap = e),
						(this.refLinkCandidateMap = t),
						(this.refDefCandidateMap = n);
				}),
				(Od.prototype.clearRefMaps = function () {
					[this.refMap, this.refLinkCandidateMap, this.refDefCandidateMap].forEach(
						function (e) {
							var t;
							(t = e),
								Object.keys(t).forEach(function (e) {
									delete t[e];
								});
						}
					);
				}),
				Od);
		function Od(e) {
			(this.options = Il(Il({}, Ed), e)),
				(this.doc = Sd()),
				(this.tip = this.doc),
				(this.oldtip = this.doc),
				(this.lineNumber = 0),
				(this.offset = 0),
				(this.column = 0),
				(this.nextNonspace = 0),
				(this.nextNonspaceColumn = 0),
				(this.indent = 0),
				(this.currentLine = ""),
				(this.indented = !1),
				(this.blank = !1),
				(this.partiallyConsumedTab = !1),
				(this.allClosed = !0),
				(this.lastMatchedContainer = this.doc),
				(this.refMap = {}),
				(this.refLinkCandidateMap = {}),
				(this.refDefCandidateMap = {}),
				(this.lastLineLength = 0),
				(this.lines = []),
				this.options.frontMatter && ((id.frontMatter = xd), wd.unshift(bd)),
				(this.inlineParser = new Gu(this.options));
		}
		function Dd(e, t) {
			return e[0] < t[0] ? 1 : t[0] < e[0] ? -1 : e[1] < t[1] ? 1 : t[1] < e[1] ? -1 : 0;
		}
		function Ad(e, t) {
			for (var n = 0, r = t; n < r.length; n++) {
				var o = r[n];
				e.insertBefore(o);
			}
		}
		function Ld(e, t) {
			var n = e[0];
			return e[1][0] < t ? 1 : n[0] > t ? -1 : 0;
		}
		function Id(e, t) {
			for (var n = e.firstChild; n; ) {
				var r = Ld(n.sourcepos, t);
				if (0 === r) return n;
				if (-1 === r) return n.prev || n;
				n = n.next;
			}
			return e.lastChild;
		}
		function Rd(e, t) {
			for (var n = e.firstChild, r = null; n; ) {
				var o = Ld(n.sourcepos, t);
				if (0 === o) {
					if (n.sourcepos[0][0] === t || !n.firstChild) return n;
					n = (r = n).firstChild;
				} else {
					if (-1 === o) break;
					n = (r = n).next;
				}
			}
			if (r) {
				for (
					var i = (e => {
						for (; e.lastChild; ) e = e.lastChild;
						return e;
					})(r);
					i.parent &&
					"document" !== i.parent.type &&
					i.parent.sourcepos[0][0] === i.sourcepos[0][0];

				)
					i = i.parent;
				return i;
			}
			return null;
		}
		function Pd(e, t) {
			for (var n, r, o = e, i = null; o; ) {
				(s = o.sourcepos), (n = t), (r = void 0), (r = s[0]);
				var s = 1 === Dd(s[1], n) ? 1 : -1 === Dd(r, n) ? -1 : 0;
				if (0 == s) {
					if (!o.firstChild) return o;
					o = (i = o).firstChild;
				} else {
					if (-1 == s) return i;
					if (!o.next) return i;
					o = o.next;
				}
			}
			return o;
		}
		function Bd(e) {
			return Mc[e] || null;
		}
		function Fd(e, t, n) {
			if ((void 0 === n && (n = null), t))
				for (var r = t.walker(); t && t !== n; ) {
					e(t);
					var o = r.next();
					if (!o) break;
					t = o.node;
				}
		}
		var Hd = /\r\n|\n|\r/;
		function zd(e) {
			return {
				id: e.id,
				title: e.title,
				sourcepos: e.sourcepos,
				unlinked: !1,
				destination: e.dest
			};
		}
		(ze.prototype.updateLineTexts = function (e, t, n) {
			var r = e[0],
				e = e[1],
				o = t[0],
				t = t[1],
				n = n.split(Hd),
				i = n.length,
				s = this.lineTexts[r - 1],
				a = this.lineTexts[o - 1],
				s =
					((n[0] = s.slice(0, e - 1) + n[0]),
					(n[i - 1] = n[i - 1] + a.slice(t - 1)),
					o - r + 1);
			return (e = this.lineTexts).splice.apply(e, Rl([r - 1, s], n)), i - s;
		}),
			(ze.prototype.updateRootNodeState = function () {
				if (1 === this.lineTexts.length && "" === this.lineTexts[0])
					(this.root.lastLineBlank = !0),
						(this.root.sourcepos = [
							[1, 1],
							[1, 0]
						]);
				else {
					this.root.lastChild &&
						(this.root.lastLineBlank = this.root.lastChild.lastLineBlank);
					for (var e = this.lineTexts, t = e.length - 1; "" === e[t]; ) --t;
					t < e.length - 2 && (t += 1), (this.root.sourcepos[1] = [t + 1, e[t].length]);
				}
			}),
			(ze.prototype.replaceRangeNodes = function (e, t, n) {
				if (e) {
					Ad(e, n);
					var r = e,
						o = t;
					if (r.parent === o.parent && r !== o) {
						for (var i = r.next; i && i !== o; ) {
							for (
								var s = i.next, a = 0, l = ["parent", "prev", "next"];
								a < l.length;
								a++
							) {
								var c = l[a];
								i[c] && (Sc(i[c].id), (i[c] = null));
							}
							i = s;
						}
						(r.next = o.next), o.next ? (o.next.prev = r) : (r.parent.lastChild = r);
					}
					[e.id, t.id].forEach(Sc), e.unlink();
				} else if (t) Ad(t, n), Sc(t.id), t.unlink();
				else
					for (var u = this.root, d = n, p = d.length - 1; 0 <= p; --p)
						u.prependChild(d[p]);
			}),
			(ze.prototype.getNodeRange = function (e, t) {
				var e = Id(this.root, e[0]),
					n = Id(this.root, t[0]);
				return [e, (n = n && n.next && t[0] + 1 === n.next.sourcepos[0][0] ? n.next : n)];
			}),
			(ze.prototype.trigger = function (e, t) {
				this.eventHandlerMap[e].forEach(function (e) {
					e(t);
				});
			}),
			(ze.prototype.extendEndLine = function (e) {
				for (; "" === this.lineTexts[e]; ) e += 1;
				return e;
			}),
			(ze.prototype.parseRange = function (e, t, n, r) {
				e &&
					e.prev &&
					((pu(e.prev) &&
						((o = this.lineTexts[n - 1]),
						((i = o.match(/^[ \t]+/)) && (2 <= i[0].length || /\t/.test(i[0]))) ||
							((i = i ? o.slice(i.length) : o), gd.test(i)) ||
							vd.test(i))) ||
						("table" === e.prev.type &&
							!nd((o = this.lineTexts[n - 1])) &&
							-1 !== o.indexOf("|"))) &&
					(n = (e = e.prev).sourcepos[0][0]);
				for (
					var o,
						i = this.lineTexts.slice(n - 1, r),
						n = this.parser.partialParseStart(n, i),
						s = t ? t.next : this.root.firstChild,
						a = n.lastChild,
						l = a && du(a) && a.open,
						c = a && fu(a) && a.open,
						u = a && pu(a);
					((l || c) && s) || (u && s && ("list" === s.type || 2 <= s.sourcepos[0][1]));

				) {
					var d = this.extendEndLine(s.sourcepos[1][0]);
					this.parser.partialParseExtends(this.lineTexts.slice(r, d)),
						(e = e || t),
						(r = d),
						(s = (t = s).next);
				}
				return (
					this.parser.partialParseFinish(),
					{
						newNodes: (e => {
							for (var t = [], n = e.firstChild; n; ) t.push(n), (n = n.next);
							return t;
						})(n),
						extStartNode: e,
						extEndNode: t
					}
				);
			}),
			(ze.prototype.getRemovedNodeRange = function (e, t) {
				return !e || hu(e) || (t && hu(t))
					? null
					: { id: [e.id, t.id], line: [e.sourcepos[0][0] - 1, t.sourcepos[1][0] - 1] };
			}),
			(ze.prototype.markDeletedRefMap = function (e, t) {
				var n,
					r = this;
				Nu(this.refMap) ||
					((n = function (e) {
						var t;
						hu(e) && (t = r.refMap[e.label]) && e.id === t.id && (t.unlinked = !0);
					}),
					e && Fd(n, e.parent, t),
					t && Fd(n, t));
			}),
			(ze.prototype.replaceWithNewRefDefState = function (e) {
				var t,
					r = this;
				Nu(this.refMap) ||
					((t = function (e) {
						var t, n;
						hu(e) &&
							((t = e.label),
							((n = r.refMap[t]) && !n.unlinked) || (r.refMap[t] = zd(e)));
					}),
					e.forEach(function (e) {
						Fd(t, e);
					}));
			}),
			(ze.prototype.replaceWithRefDefCandidate = function () {
				var o = this;
				Nu(this.refDefCandidateMap) ||
					Eu(this.refDefCandidateMap, function (e, t) {
						var n = t.label,
							r = o.refMap[n];
						(!r || r.unlinked || r.sourcepos[0][0] > t.sourcepos[0][0]) &&
							(o.refMap[n] = zd(t));
					});
			}),
			(ze.prototype.getRangeWithRefDef = function (e, t, n, r, o) {
				var i, s;
				return (
					this.referenceDefinition &&
						!Nu(this.refMap) &&
						((i = Id(this.root, e - 1)),
						(s = Id(this.root, t + 1)),
						i && hu(i) && i !== n && i !== r && (e = (n = i).sourcepos[0][0]),
						s) &&
						hu(s) &&
						s !== n &&
						s !== r &&
						(t = this.extendEndLine((r = s).sourcepos[1][0] + o)),
					[n, r, e, t]
				);
			}),
			(ze.prototype.parse = function (e, t, n) {
				void 0 === n && (n = 0);
				var r = this.getNodeRange(e, t),
					o = r[0],
					r = r[1],
					e = o ? Math.min(o.sourcepos[0][0], e[0]) : e[0],
					t = this.extendEndLine((r ? Math.max(r.sourcepos[1][0], t[0]) : t[0]) + n),
					e = this.parseRange.apply(this, this.getRangeWithRefDef(e, t, o, r, n)),
					t = e.newNodes,
					o = e.extStartNode,
					r = e.extEndNode,
					n = this.getRemovedNodeRange(o, r),
					e = r ? r.next : this.root.firstChild;
				return (
					this.referenceDefinition
						? (this.markDeletedRefMap(o, r),
							this.replaceRangeNodes(o, r, t),
							this.replaceWithNewRefDefState(t))
						: this.replaceRangeNodes(o, r, t),
					{ nodes: t, removedNodeRange: n, nextNode: e }
				);
			}),
			(ze.prototype.parseRefLink = function () {
				var o = this,
					i = [];
				return (
					Nu(this.refMap) ||
						Eu(this.refMap, function (r, e) {
							e.unlinked && delete o.refMap[r],
								Eu(o.refLinkCandidateMap, function (e, t) {
									var n = t.node;
									t.refLabel === r &&
										i.push(o.parse(n.sourcepos[0], n.sourcepos[1]));
								});
						}),
					i
				);
			}),
			(ze.prototype.removeUnlinkedCandidate = function () {
				Nu(this.refDefCandidateMap) ||
					[this.refLinkCandidateMap, this.refDefCandidateMap].forEach(function (t) {
						Eu(t, function (e) {
							(e => {
								var t = Bd(e);
								if (!t) return 1;
								for (; t && "document" !== t.type; ) {
									if (!t.parent && !t.prev && !t.next) return 1;
									t = t.parent;
								}
							})(e) && delete t[e];
						});
					});
			}),
			(ze.prototype.editMarkdown = function (e, t, n) {
				var n = this.updateLineTexts(e, t, n),
					e = this.parse(e, t, n),
					t = (function (e) {
						for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
						var r = Il({}, e);
						return (
							t.forEach(function (e) {
								delete r[e];
							}),
							r
						);
					})(e, "nextNode"),
					e = e.nextNode,
					r = n;
				if (e && e.parent && 0 !== r) {
					var o,
						i = e.parent.walker();
					for (i.resumeAt(e, !0); (o = i.next()); ) {
						var s = o.node;
						o.entering && ((s.sourcepos[0][0] += r), (s.sourcepos[1][0] += r));
					}
				}
				this.updateRootNodeState();
				n = [t];
				return (
					this.referenceDefinition &&
						(this.removeUnlinkedCandidate(),
						this.replaceWithRefDefCandidate(),
						(n = n.concat(this.parseRefLink()))),
					this.trigger("change", n),
					n
				);
			}),
			(ze.prototype.getLineTexts = function () {
				return this.lineTexts;
			}),
			(ze.prototype.getRootNode = function () {
				return this.root;
			}),
			(ze.prototype.findNodeAtPosition = function (e) {
				e = Pd(this.root, e);
				return e && e !== this.root ? e : null;
			}),
			(ze.prototype.findFirstNodeAtLine = function (e) {
				return Rd(this.root, e);
			}),
			(ze.prototype.on = function (e, t) {
				this.eventHandlerMap[e].push(t);
			}),
			(ze.prototype.off = function (e, t) {
				(e = this.eventHandlerMap[e]), (t = e.indexOf(t));
				e.splice(t, 1);
			}),
			(ze.prototype.findNodeById = Bd),
			(ze.prototype.removeAllNode = function () {
				Mc = {};
			});
		var qd = ze;
		function ze(e, t) {
			(this.refMap = {}),
				(this.refLinkCandidateMap = {}),
				(this.refDefCandidateMap = {}),
				(this.referenceDefinition = !(null == t || !t.referenceDefinition)),
				(this.parser = new Nd(t)),
				this.parser.setRefMaps(
					this.refMap,
					this.refLinkCandidateMap,
					this.refDefCandidateMap
				),
				(this.eventHandlerMap = { change: [] }),
				(this.lineTexts = (e = e || "").split(Hd)),
				(this.root = this.parser.parse(e, this.lineTexts));
		}
		var Vd = new RegExp(
			"<(/?(?:" +
				[
					"title",
					"textarea",
					"style",
					"xmp",
					"iframe",
					"noembed",
					"noframes",
					"script",
					"plaintext"
				].join("|") +
				")[^>]*>)",
			"ig"
		);
		function jd(e) {
			return Vd.test(e)
				? e.replace(Vd, function (e, t) {
						return "&lt;" + t;
					})
				: e;
		}
		var $d = {
				heading: function (e, t) {
					return {
						type: t.entering ? "openTag" : "closeTag",
						tagName: "h" + e.level,
						outerNewLine: !0
					};
				},
				text: function (e) {
					return { type: "text", content: e.literal };
				},
				softbreak: function (e, t) {
					return { type: "html", content: t.options.softbreak };
				},
				linebreak: function () {
					return { type: "html", content: "<br />\n" };
				},
				emph: function (e, t) {
					return { type: t.entering ? "openTag" : "closeTag", tagName: "em" };
				},
				strong: function (e, t) {
					return { type: t.entering ? "openTag" : "closeTag", tagName: "strong" };
				},
				paragraph: function (e, t) {
					(t = t.entering), (e = null == (e = e.parent) ? void 0 : e.parent);
					return e && "list" === e.type && e.listData.tight
						? null
						: { type: t ? "openTag" : "closeTag", tagName: "p", outerNewLine: !0 };
				},
				thematicBreak: function () {
					return { type: "openTag", tagName: "hr", outerNewLine: !0, selfClose: !0 };
				},
				blockQuote: function (e, t) {
					return {
						type: t.entering ? "openTag" : "closeTag",
						tagName: "blockquote",
						outerNewLine: !0,
						innerNewLine: !0
					};
				},
				list: function (e, t) {
					var t = t.entering,
						e = e.listData,
						n = e.type,
						e = e.start,
						n = "bullet" === n ? "ul" : "ol",
						r = {};
					return (
						"ol" == n && null !== e && 1 !== e && (r.start = e.toString()),
						{
							type: t ? "openTag" : "closeTag",
							tagName: n,
							attributes: r,
							outerNewLine: !0
						}
					);
				},
				item: function (e, t) {
					return {
						type: t.entering ? "openTag" : "closeTag",
						tagName: "li",
						outerNewLine: !0
					};
				},
				htmlInline: function (e, t) {
					return {
						type: "html",
						content: t.options.tagFilter ? jd(e.literal) : e.literal
					};
				},
				htmlBlock: function (e, t) {
					(t = t.options), (e = t.tagFilter ? jd(e.literal) : e.literal);
					return t.nodeId
						? [
								{ type: "openTag", tagName: "div", outerNewLine: !0 },
								{ type: "html", content: e },
								{ type: "closeTag", tagName: "div", outerNewLine: !0 }
							]
						: { type: "html", content: e, outerNewLine: !0 };
				},
				code: function (e) {
					return [
						{ type: "openTag", tagName: "code" },
						{ type: "text", content: e.literal },
						{ type: "closeTag", tagName: "code" }
					];
				},
				codeBlock: function (e) {
					var t = e.info,
						t = t ? t.split(/\s+/) : [],
						n = [];
					return (
						0 < t.length && 0 < t[0].length && n.push("language-" + yc(t[0])),
						[
							{ type: "openTag", tagName: "pre", outerNewLine: !0 },
							{ type: "openTag", tagName: "code", classNames: n },
							{ type: "text", content: e.literal },
							{ type: "closeTag", tagName: "code" },
							{ type: "closeTag", tagName: "pre", outerNewLine: !0 }
						]
					);
				},
				link: function (e, t) {
					return t.entering
						? ((t = e.title),
							{
								type: "openTag",
								tagName: "a",
								attributes: Il({ href: yc(e.destination) }, t && { title: yc(t) })
							})
						: { type: "closeTag", tagName: "a" };
				},
				image: function (e, t) {
					var n = t.getChildrenText,
						t = t.skipChildren,
						r = e.title,
						o = e.destination;
					return (
						t(),
						{
							type: "openTag",
							tagName: "img",
							selfClose: !0,
							attributes: Il({ src: yc(o), alt: n(e) }, r && { title: yc(r) })
						}
					);
				},
				customBlock: function (e, t, n) {
					var r = e.info.trim().toLowerCase(),
						n = n[r];
					if (n)
						try {
							return n(e, t);
						} catch (e) {
							console.warn(
								"[@toast-ui/editor] - The error occurred when " +
									r +
									" block node was parsed in markdown renderer: " +
									e
							);
						}
					return [
						{ type: "openTag", tagName: "div", outerNewLine: !0 },
						{ type: "text", content: e.literal },
						{ type: "closeTag", tagName: "div", outerNewLine: !0 }
					];
				},
				frontMatter: function (e) {
					return [
						{
							type: "openTag",
							tagName: "div",
							outerNewLine: !0,
							attributes: { style: "white-space: pre; display: none;" }
						},
						{ type: "text", content: e.literal },
						{ type: "closeTag", tagName: "div", outerNewLine: !0 }
					];
				},
				customInline: function (e, t, n) {
					var r = e.info,
						o = e.firstChild,
						i = r.trim().toLowerCase(),
						n = n[i],
						s = t.entering;
					if (n)
						try {
							return n(e, t);
						} catch (e) {
							console.warn(
								"[@toast-ui/editor] - The error occurred when " +
									i +
									" inline node was parsed in markdown renderer: " +
									e
							);
						}
					return s
						? [
								{ type: "openTag", tagName: "span" },
								{ type: "text", content: "$$" + r + (o ? " " : "") }
							]
						: [
								{ type: "text", content: "$$" },
								{ type: "closeTag", tagName: "span" }
							];
				}
			},
			_d = {
				strike: function (e, t) {
					return { type: t.entering ? "openTag" : "closeTag", tagName: "del" };
				},
				item: function (e, t) {
					var t = t.entering,
						e = e.listData,
						n = e.checked;
					return t
						? ((t = { type: "openTag", tagName: "li", outerNewLine: !0 }),
							e.task
								? [
										t,
										{
											type: "openTag",
											tagName: "input",
											selfClose: !0,
											attributes: Il(Il({}, n && { checked: "" }), {
												disabled: "",
												type: "checkbox"
											})
										},
										{ type: "text", content: " " }
									]
								: t)
						: { type: "closeTag", tagName: "li", outerNewLine: !0 };
				},
				table: function (e, t) {
					return {
						type: t.entering ? "openTag" : "closeTag",
						tagName: "table",
						outerNewLine: !0
					};
				},
				tableHead: function (e, t) {
					return {
						type: t.entering ? "openTag" : "closeTag",
						tagName: "thead",
						outerNewLine: !0
					};
				},
				tableBody: function (e, t) {
					return {
						type: t.entering ? "openTag" : "closeTag",
						tagName: "tbody",
						outerNewLine: !0
					};
				},
				tableRow: function (e, t) {
					if (t.entering) return { type: "openTag", tagName: "tr", outerNewLine: !0 };
					var n = [];
					if (e.lastChild)
						for (
							var r = e.parent.parent.columns.length, o = e.lastChild.endIdx + 1;
							o < r;
							o += 1
						)
							n.push(
								{ type: "openTag", tagName: "td", outerNewLine: !0 },
								{ type: "closeTag", tagName: "td", outerNewLine: !0 }
							);
					return n.push({ type: "closeTag", tagName: "tr", outerNewLine: !0 }), n;
				},
				tableCell: function (e, t) {
					var n,
						r,
						t = t.entering;
					return e.ignored
						? { type: "text", content: "" }
						: ((n = "tableHead" === (r = e.parent.parent).type ? "th" : "td"),
							(e =
								null != (r = r.parent.columns[e.startIdx]) && r.align
									? { align: r.align }
									: null),
							t
								? Il(
										{ type: "openTag", tagName: n, outerNewLine: !0 },
										e && { attributes: e }
									)
								: { type: "closeTag", tagName: n, outerNewLine: !0 });
				}
			},
			Ud = { softbreak: "\n", gfm: !1, tagFilter: !1, nodeId: !1 };
		function Wd(e) {
			for (var t = [], n = e.walker(); (r = n.next()); ) {
				var r = r.node;
				"text" === r.type && t.push(r.literal);
			}
			return t.join("");
		}
		(Gd.prototype.createConvertors = function () {
			var t,
				e,
				n,
				i = Il({}, $d);
			return (
				this.options.gfm && (i = Il(Il({}, i), _d)),
				this.options.convertors &&
					((t = this.options.convertors),
					(e = Object.keys(t)),
					(n = Il(Il({}, $d), _d)),
					e.forEach(function (e) {
						var r = i[e],
							o = t[e],
							e = -1 === Object.keys(n).indexOf(e) ? e.toLowerCase() : e;
						i[e] = r
							? function (e, t, n) {
									return (
										(t.origin = function () {
											return r(e, t, n);
										}),
										o(e, t)
									);
								}
							: o;
					})),
				i
			);
		}),
			(Gd.prototype.getConvertors = function () {
				return this.convertors;
			}),
			(Gd.prototype.getOptions = function () {
				return this.options;
			}),
			(Gd.prototype.render = function (e) {
				for (
					var o = this, i = ((this.buffer = []), e.walker()), s = null, a = this;
					(s = i.next());

				)
					(() => {
						var n = s.node,
							e = s.entering,
							t = a.convertors[n.type];
						if (!t) return;
						var r = !1,
							e = {
								entering: e,
								leaf: !Cc(n),
								options: a.options,
								getChildrenText: Wd,
								skipChildren: function () {
									r = !0;
								}
							};
						(t =
							fu(n) || "customInline" === n.type ? t(n, e, a.convertors) : t(n, e)) &&
							((Array.isArray(t) ? t : [t]).forEach(function (e, t) {
								"openTag" === e.type &&
									o.options.nodeId &&
									0 === t &&
									(e.attributes || (e.attributes = {}),
									(e.attributes["data-nodeid"] = String(n.id))),
									o.renderHTMLNode(e);
							}),
							r) &&
							(i.resumeAt(n, !1), i.next());
					})();
				return this.addNewLine(), this.buffer.join("");
			}),
			(Gd.prototype.renderHTMLNode = function (e) {
				switch (e.type) {
					case "openTag":
					case "closeTag":
						this.renderElementNode(e);
						break;
					case "text":
						this.renderTextNode(e);
						break;
					case "html":
						this.renderRawHtmlNode(e);
				}
			}),
			(Gd.prototype.generateOpenTagString = function (e) {
				var n = this,
					t = e.tagName,
					r = e.classNames,
					o = e.attributes;
				this.buffer.push("<" + t),
					r && 0 < r.length && this.buffer.push(' class="' + r.join(" ") + '"'),
					o &&
						Object.keys(o).forEach(function (e) {
							var t = o[e];
							n.buffer.push(" " + e + '="' + t + '"');
						}),
					e.selfClose && this.buffer.push(" /"),
					this.buffer.push(">");
			}),
			(Gd.prototype.generateCloseTagString = function (e) {
				e = e.tagName;
				this.buffer.push("</" + e + ">");
			}),
			(Gd.prototype.addNewLine = function () {
				this.buffer.length && "\n" !== Mu(Mu(this.buffer)) && this.buffer.push("\n");
			}),
			(Gd.prototype.addOuterNewLine = function (e) {
				e.outerNewLine && this.addNewLine();
			}),
			(Gd.prototype.addInnerNewLine = function (e) {
				e.innerNewLine && this.addNewLine();
			}),
			(Gd.prototype.renderTextNode = function (e) {
				this.buffer.push(yc(e.content));
			}),
			(Gd.prototype.renderRawHtmlNode = function (e) {
				this.addOuterNewLine(e), this.buffer.push(e.content), this.addOuterNewLine(e);
			}),
			(Gd.prototype.renderElementNode = function (e) {
				"openTag" === e.type
					? (this.addOuterNewLine(e),
						this.generateOpenTagString(e),
						e.selfClose ? this.addOuterNewLine(e) : this.addInnerNewLine(e))
					: (this.addInnerNewLine(e),
						this.generateCloseTagString(e),
						this.addOuterNewLine(e));
			});
		var Jd = Gd;
		function Gd(e) {
			(this.buffer = []),
				(this.options = Il(Il({}, Ud), e)),
				(this.convertors = this.createConvertors()),
				delete this.options.convertors;
		}
		var zl = ye(368),
			Kd = ye.n(zl),
			Zd = ["iframe", "embed"],
			Xd = [];
		function Qd(e) {
			Zt(Zd, e) && Xd.push(e.toLowerCase());
		}
		function Yd(e, t) {
			return Kd().sanitize(
				e,
				we(
					{
						ADD_TAGS: Xd,
						ADD_ATTR: ["rel", "target", "hreflang", "type"],
						FORBID_TAGS: [
							"input",
							"script",
							"textarea",
							"form",
							"button",
							"select",
							"meta",
							"style",
							"link",
							"title",
							"object",
							"base"
						]
					},
					t
				)
			);
		}
		function ep(e, t) {
			return e.literal
				.replace(new RegExp("(<\\s*" + t + "[^>]*>)|(</" + t + "\\s*[>])", "ig"), "")
				.trim();
		}
		function tp(e) {
			e = (e = e.match(Ri)[0]).match(new RegExp(Ai, "g"));
			return e
				? e.reduce(function (e, t) {
						var t = t.trim().split("="),
							n = t[0],
							t = t.slice(1);
						return t.length && (e[n] = t.join("=").replace(/'|"/g, "").trim()), e;
					}, {})
				: {};
		}
		function np(e) {
			return xo()(e.attributes).reduce(function (e, t) {
				return (e[t.nodeName] = t.nodeValue), e;
			}, {});
		}
		function rp(e, t, n, r) {
			(n = n(r.getToDOMNode(t)(e).outerHTML)),
				(r = document.createElement("div")),
				(r.innerHTML = n),
				(e = np((t = r.firstChild)));
			return { dom: t, htmlAttrs: e };
		}
		var op = {
				htmlBlock: function (n, r, o) {
					return {
						atom: !0,
						content: "block+",
						group: "block",
						attrs: {
							htmlAttrs: { default: {} },
							childrenHTML: { default: "" },
							htmlBlock: { default: !0 }
						},
						parseDOM: [
							{
								tag: n,
								getAttrs: function (e) {
									return { htmlAttrs: np(e), childrenHTML: e.innerHTML };
								}
							}
						],
						toDOM: function (e) {
							var e = rp(e, n, r, o),
								t = e.dom,
								e = e.htmlAttrs;
							return (
								(e.class = e.class ? e.class + " html-block" : "html-block"),
								nt([n, e], xo()(t.childNodes))
							);
						}
					};
				},
				htmlInline: function (t, n, r) {
					return {
						attrs: { htmlAttrs: { default: {} }, htmlInline: { default: !0 } },
						parseDOM: [
							{
								tag: t,
								getAttrs: function (e) {
									return { htmlAttrs: np(e) };
								}
							}
						],
						toDOM: function (e) {
							e = rp(e, t, n, r).htmlAttrs;
							return [t, e, 0];
						}
					};
				}
			},
			ip = /^\s*<\s*\//,
			sp = {
				paragraph: function (e, t) {
					var n = t.entering,
						r = t.origin;
					return t.options.nodeId
						? { type: n ? "openTag" : "closeTag", outerNewLine: !0, tagName: "p" }
						: r();
				},
				softbreak: function (e) {
					return {
						type: "html",
						content:
							e.prev &&
							"htmlInline" === e.prev.type &&
							/<br ?\/?>/.test(e.prev.literal)
								? "\n"
								: "<br>\n"
					};
				},
				item: function (e, t) {
					var n;
					return t.entering
						? ((t = {}),
							(n = []),
							e.listData.task &&
								((t["data-task"] = ""),
								n.push("task-list-item"),
								e.listData.checked) &&
								(n.push("checked"), (t["data-task-checked"] = "")),
							{
								type: "openTag",
								tagName: "li",
								classNames: n,
								attributes: t,
								outerNewLine: !0
							})
						: { type: "closeTag", tagName: "li", outerNewLine: !0 };
				},
				code: function (e) {
					return [
						{
							type: "openTag",
							tagName: "code",
							attributes: { "data-backticks": String(e.tickCount) }
						},
						{ type: "text", content: e.literal },
						{ type: "closeTag", tagName: "code" }
					];
				},
				codeBlock: function (e) {
					var t = e.fenceLength,
						n = e.info,
						n = n ? n.split(/\s+/) : [],
						r = [],
						o = {};
					return (
						3 < t && (o["data-backticks"] = t),
						0 < n.length &&
							0 < n[0].length &&
							((t = n[0]), r.push("lang-" + t), (o["data-language"] = t)),
						[
							{ type: "openTag", tagName: "pre", classNames: r },
							{ type: "openTag", tagName: "code", attributes: o },
							{ type: "text", content: e.literal },
							{ type: "closeTag", tagName: "code" },
							{ type: "closeTag", tagName: "pre" }
						]
					);
				},
				customInline: function (e, t) {
					var n = t.origin,
						r = t.entering,
						t = t.skipChildren,
						o = e.info;
					return -1 !== o.indexOf("widget") && r
						? (t(),
							[
								{ type: "openTag", tagName: "span", classNames: ["tui-widget"] },
								{ type: "html", content: Ci(o, Si(e)).outerHTML },
								{ type: "closeTag", tagName: "span" }
							])
						: n();
				}
			};
		function ap(r, t) {
			var n = we({}, sp);
			return (
				r &&
					(n.link = function (e, t) {
						var n = t.entering,
							t = (0, t.origin)();
						return n && (t.attributes = we(we({}, t.attributes), r)), t;
					}),
				t &&
					Object.keys(t).forEach(function (e) {
						var r = n[e],
							a = t[e];
						r && ls()(a)
							? (n[e] = function (e, t) {
									var n = we({}, t);
									return (
										(n.origin = function () {
											return r(e, t);
										}),
										a(e, n)
									);
								})
							: Zt(["htmlBlock", "htmlInline"], e) && !ls()(a)
								? (n[e] = function (e, t) {
										var n = e.literal.match(Ri);
										if (n) {
											var r,
												o = n[0],
												i = n[1],
												n = n[3],
												i = (i || n).toLowerCase(),
												n = a[i],
												s = ep(e, i);
											if (n)
												return (
													((r = we({}, e)).attrs = tp(o)),
													(r.childrenHTML = s),
													(r.type = i),
													(t.entering = !ip.test(e.literal)),
													n(r, t)
												);
										}
										return t.origin();
									})
								: (n[e] = a);
					}),
				n
			);
		}
		var lp = ["list", "item", "blockQuote"],
			cp = ["UL", "OL", "BLOCKQUOTE"];
		function up(e, t, n) {
			var r = li(t) - 1,
				t = ci(t) - 1,
				o = n[r].getBoundingClientRect(),
				i = n[t].offsetTop - n[r].offsetTop + n[t].clientHeight;
			return {
				height:
					i <= 0
						? n[r].clientHeight
						: i +
							((e, t, n) => {
								for (
									var r = e.childCount - 1, o = 0;
									n <= r &&
									((e, t) =>
										!(e = e.child(t)).childCount ||
										(1 === e.childCount &&
											(null == (t = e.firstChild.text) || !t.trim())))(e, n);

								)
									(o += t[n].clientHeight), (n += 1);
								return o;
							})(e, n, Math.min(1 + t, e.childCount - 1)),
				rect: o
			};
		}
		function dp(e, t) {
			for (
				var n = 0;
				e &&
				e !== t &&
				(Zt(cp, e.tagName) || (n += e.offsetTop), e.offsetParent !== t.offsetParent);

			)
				e = e.parentElement;
			return n;
		}
		function pp(e, t) {
			for (var n = t, r = null; n; ) {
				var o = n.firstElementChild;
				if (!o) break;
				(r = n),
					(n = (function e(t, n, r) {
						if (t && n > r + t.offsetTop) return e(t.nextElementSibling, n, r) || t;
						return null;
					})(o, e, dp(n, t)));
			}
			var i = n || r;
			return i === t ? null : i;
		}
		function hp(e, t) {
			for (
				var n, r = e.querySelector('[data-nodeid="' + t.id + '"]');
				!r ||
				"strike" === (n = (n = t).type) ||
				"strong" === n ||
				"emph" === n ||
				"code" === n ||
				"link" === n ||
				"image" === n;

			)
				(t = t.parent), (r = e.querySelector('[data-nodeid="' + t.id + '"]'));
			for (
				var o = { mdNode: t, el: r }, i = o.mdNode, s = o.el;
				(Zt(lp, i.type) || "table" === i.type) && i.firstChild;

			)
				(i = i.firstChild), (s = s.firstElementChild);
			return { mdNode: i, el: s };
		}
		var fp = {};
		function mp(e) {
			e &&
				(delete fp[Number(e.getAttribute("data-nodeid"))],
				xo()(e.children).forEach(function (e) {
					mp(e);
				}));
		}
		function gp(e, t, n) {
			var r = fp[(r = n)] && fp[r].height,
				o = fp[(o = n)] && fp[o].offsetTop,
				i = r || e.clientHeight,
				t = o || dp(e, t) || e.offsetTop;
			return (
				r || ((e = i), (fp[(r = n)] = fp[r] || {}), (fp[r].height = e)),
				o || ((r = t), (fp[(e = n)] = fp[e] || {}), (fp[e].offsetTop = r)),
				{ nodeHeight: i, offsetTop: t }
			);
		}
		var vp = Ne("md-preview-highlight");
		function yp(e, t) {
			var n = document.createElement("div"),
				n =
					((this.el = n),
					(this.eventEmitter = e),
					(this.isViewer = !!t.isViewer),
					(this.el.className = Ne("md-preview")),
					t.linkAttributes),
				e = t.sanitizer,
				r = t.highlight,
				r = void 0 !== r && r;
			(this.renderer = new Jd({
				gfm: !0,
				nodeId: !0,
				convertors: ap(n, t.customHTMLRenderer)
			})),
				(this.cursorNodeId = null),
				(this.sanitizer = e),
				this.initEvent(r),
				this.initContentSection(),
				this.isViewer && (this.previewContent.style.overflowWrap = "break-word");
		}
		(yp.prototype.initContentSection = function () {
			(this.previewContent = $i('<div class="' + Ne("contents") + '"></div>')),
				this.isViewer || this.el.appendChild(this.previewContent);
		}),
			(yp.prototype.toggleActive = function (e) {
				ji(this.el, "active", e);
			}),
			(yp.prototype.initEvent = function (e) {
				var n = this;
				this.eventEmitter.listen("updatePreview", this.update.bind(this)),
					this.isViewer ||
						(e &&
							(this.eventEmitter.listen("changeToolbarState", function (e) {
								var t = e.mdNode;
								n.updateCursorNode(t, e.cursorPos);
							}),
							this.eventEmitter.listen("blur", function () {
								n.removeHighlight();
							})),
						Dl()(this.el, "scroll", function (e) {
							n.eventEmitter.emit(
								"scroll",
								"preview",
								pp(e.target.scrollTop, n.previewContent)
							);
						}),
						this.eventEmitter.listen("changePreviewTabPreview", function () {
							return n.toggleActive(!0);
						}),
						this.eventEmitter.listen("changePreviewTabWrite", function () {
							return n.toggleActive(!1);
						}));
			}),
			(yp.prototype.removeHighlight = function () {
				var e;
				this.cursorNodeId &&
					(e = this.getElementByNodeId(this.cursorNodeId)) &&
					It()(e, vp);
			}),
			(yp.prototype.updateCursorNode = function (e, t) {
				e &&
					("tableRow" ===
					(e = mi(e, function (e) {
						switch (e.type) {
							case "code":
							case "text":
							case "emph":
							case "strong":
							case "strike":
							case "link":
							case "image":
							case "htmlInline":
							case "linebreak":
							case "softbreak":
							case "customInline":
								return !1;
							default:
								return !void 0;
						}
						return !0;
					})).type
						? (e = ((e, t) => {
								for (var n = e.firstChild; n && n.next && !(ui(n.next) > t + 1); )
									n = n.next;
								return n;
							})(e, t[1]))
						: "tableBody" === e.type && (e = null));
				var n,
					t = e ? e.id : null;
				this.cursorNodeId !== t &&
					((e = this.getElementByNodeId(this.cursorNodeId)),
					(n = this.getElementByNodeId(t)),
					e && It()(e, vp),
					n && Lt()(n, vp),
					(this.cursorNodeId = t));
			}),
			(yp.prototype.getElementByNodeId = function (e) {
				return e ? this.previewContent.querySelector('[data-nodeid="' + e + '"]') : null;
			}),
			(yp.prototype.update = function (e) {
				var t = this;
				e.forEach(function (e) {
					return t.replaceRangeNodes(e);
				}),
					this.eventEmitter.emit("afterPreviewRender", this);
			}),
			(yp.prototype.replaceRangeNodes = function (e) {
				var t = this,
					n = e.nodes,
					e = e.removedNodeRange,
					r = this.previewContent,
					n = this.eventEmitter.emitReduce(
						"beforePreviewRender",
						this.sanitizer(
							n
								.map(function (e) {
									return t.renderer.render(e);
								})
								.join("")
						)
					);
				if (e) {
					var e = e.id,
						o = e[0],
						e = e[1],
						o = this.getElementByNodeId(o),
						i = this.getElementByNodeId(e);
					if (o) {
						o.insertAdjacentHTML("beforebegin", n);
						for (var s = o; s && s !== i; ) {
							var a = s.nextElementSibling;
							Vi(s), mp(s), (s = a);
						}
						null != s && s.parentNode && (Vi(s), mp(s));
					}
				} else r.insertAdjacentHTML("afterbegin", n);
			}),
			(yp.prototype.getRenderer = function () {
				return this.renderer;
			}),
			(yp.prototype.destroy = function () {
				Ol()(this.el, "scroll"), (this.el = null);
			}),
			(yp.prototype.getElement = function () {
				return this.el;
			}),
			(yp.prototype.getHTML = function () {
				return Gi(this.previewContent.innerHTML);
			}),
			(yp.prototype.setHTML = function (e) {
				this.previewContent.innerHTML = e;
			}),
			(yp.prototype.setHeight = function (e) {
				At()(this.el, { height: e + "px" });
			}),
			(yp.prototype.setMinHeight = function (e) {
				At()(this.el, { minHeight: e + "px" });
			});
		var bp = yp;
		function wp(e, t) {
			for (var n = e.depth; n; ) {
				var r = e.node(n);
				if (t(r, n)) return { node: r, depth: n, offset: 0 < n ? e.before(n) : 0 };
				--n;
			}
			return null;
		}
		function kp(e) {
			return wp(e, function (e) {
				e = e.type;
				return "listItem" === e.name || "bulletList" === e.name || "orderedList" === e.name;
			});
		}
		function xp(e) {
			return !!wp(e, function (e) {
				e = e.type;
				return "tableHeadCell" === e.name || "tableBodyCell" === e.name;
			});
		}
		function Cp(e) {
			return wp(e, function (e) {
				return "listItem" === e.type.name;
			});
		}
		function Tp(e) {
			return {
				tag: e,
				getAttrs: function (e) {
					e = e.getAttribute("data-raw-html");
					return we({}, e && { rawHTML: e });
				}
			};
		}
		function Mp(n) {
			return Object.keys(n).reduce(function (e, t) {
				return (
					"rawHTML" !== t && n[t] && (e[(t = "className" === t ? "class" : t)] = n[t]), e
				);
			}, {});
		}
		function Sp(e) {
			return {
				tag: e,
				getAttrs: function (r) {
					return ["rawHTML", "colspan", "rowspan", "extended"].reduce(function (e, t) {
						var n = r.getAttribute("rawHTML" === t ? "data-raw-html" : t);
						return n && (e[t] = Zt(["rawHTML", "extended"], t) ? n : Number(n)), e;
					}, {});
				}
			};
		}
		function Ep() {
			return { htmlAttrs: { default: null }, classNames: { default: null } };
		}
		function qe(e) {
			var t = e.htmlAttrs,
				e = e.classNames;
			return we(we({}, t), { class: e ? e.join(" ") : null });
		}
		function Np(e, t, n, r) {
			(i = n), (s = (o = e).parent), (a = e.startIndex), (o = e.endIndex);
			var o,
				i,
				s =
					(e = s.contentMatchAt(a).findWrapping(i)) &&
					((i = e.length ? e[0] : i), s.canReplaceWith(a, o, i))
						? e
						: null,
				a = ((e, t) => {
					var n = e.parent,
						r = e.startIndex,
						o = e.endIndex,
						e = n.child(r);
					if ((e = t.contentMatch.findWrapping(e.type))) {
						for (
							var i = (e.length ? e[e.length - 1] : t).contentMatch, s = r;
							i && s < o;
							s += 1
						)
							i = i.matchType(n.child(s).type);
						if (i && i.validEnd) return e;
					}
					return null;
				})(t, n);
			return s && a
				? ((o = s.map(function (e) {
						return { type: e };
					})),
					(i = a.map(function (e) {
						return { type: e, attrs: r };
					})),
					o.concat({ type: n }).concat(i))
				: null;
		}
		function Op(e, t, n, r) {
			var o = t.$from,
				i = t.$to,
				s = t.depth,
				a = t,
				l = !1,
				c =
					(2 <= s &&
						o.node(s - 1).type.compatibleContent(n) &&
						0 === t.startIndex &&
						o.index(s - 1) &&
						((c = e.doc.resolve(t.start - 2)),
						(a = new Vy(c, c, s)),
						t.endIndex < t.parent.childCount &&
							(t = new Vy(o, e.doc.resolve(i.end(s)), s)),
						(l = !0)),
					Np(a, t, n, r));
			if (c) {
				for (
					var u = e,
						o = t,
						d = c,
						i = l,
						p = n,
						s = o.start,
						a = o.end,
						h = o.startIndex,
						r = o.endIndex,
						f = o.parent,
						m = Je.empty,
						g = d.length - 1;
					0 <= g;
					--g
				)
					m = Je.from(d[g].type.create(d[g].attrs, m));
				u.step(new l0(s - (i ? 2 : 0), a, s, a, new Ke(m, 0, 0), d.length, !0));
				for (var v = 0, g = 0; g < d.length; g += 1)
					if (d[g].type === p) {
						v = g + 1;
						break;
					}
				for (
					var y = d.length - v, b = s + d.length - (i ? 2 : 0), g = h, w = r;
					g < w;
					g += 1
				)
					g !== h && kn(u.doc, b, y) && (u.split(b, y), (b += 2 * y)),
						(b += f.child(g).nodeSize);
				return u;
			}
			return e;
		}
		function Dp(e, t) {
			for (var n = e.resolve(t); "paragraph" !== n.node().type.name; )
				n = e.resolve((t -= 2));
			return Cp(n);
		}
		function Ap(o) {
			return function (e, t) {
				var n = e.selection,
					e = e.tr,
					r = n.$from,
					n = r.blockRange(n.$to);
				return (
					!!n &&
					(t(
						(kp(r)
							? (e, t, n) => {
									var r = t.$from,
										t = t.$to,
										o = Cp(r),
										i = Cp(t);
									if (o && i)
										for (; i; ) {
											var s = i.offset,
												a = i.node,
												l = i.depth,
												a =
													(a.attrs.task &&
														e.setNodeMarkup(s, null, {
															task: !1,
															checked: !1
														}),
													e.doc.resolve(s));
											if (
												(a.parent.type !== n &&
													((a = a.before(l - 1)), e.setNodeMarkup(a, n)),
												s === o.offset)
											)
												break;
											i = Dp(e.doc, s);
										}
									return e;
								}
							: Op)(e, n, o)
					),
					!0)
				);
			};
		}
		function Lp() {
			return function (e, t) {
				var n = e.selection,
					r = e.tr,
					e = e.schema,
					o = n.$from,
					n = o.blockRange(n.$to);
				return (
					!!n &&
					(t(
						kp(o)
							? ((e, t) => {
									var n = t.$from,
										t = t.$to,
										r = Cp(n),
										o = Cp(t);
									if (r && o)
										for (; o; ) {
											var i = o.offset,
												s = { task: !o.node.attrs.task, checked: !1 };
											if ((e.setNodeMarkup(i, null, s), i === r.offset))
												break;
											o = Dp(e.doc, i);
										}
									return e;
								})(r, n)
							: Op(r, n, e.nodes.bulletList, { task: !0 })
					),
					!0)
				);
			};
		}
		function Ip(u) {
			return function (e, t) {
				var n,
					r,
					o,
					i,
					s,
					a,
					l = e.tr,
					e = e.selection,
					c = e.$from,
					e = c.blockRange(e.$to, function (e) {
						return !!e.childCount && e.firstChild.type === u;
					});
				return (
					!!e &&
					(t(
						c.node(e.depth - 1).type === u
							? ((t = l),
								(c = u),
								(r = (n = e).$from),
								(i = n.end),
								(s = n.depth),
								(a = n.parent),
								(o = (o = n.$to).end(s)),
								i < o &&
									(t.step(
										new l0(
											i - 1,
											o,
											i,
											o,
											new Ke(Je.from(c.create(null, a.copy())), 1, 0),
											1,
											!0
										)
									),
									(n = new Vy(t.doc.resolve(r.pos), t.doc.resolve(o), s))),
								t.lift(n, vn(n)),
								t)
							: ((e, t) => {
									for (
										var n = t.parent,
											r = t.end,
											o = t.endIndex - 1,
											i = t.startIndex;
										i < o;
										--o
									)
										(r -= n.child(o).nodeSize), e.delete(r - 1, r + 1);
									var s = e.doc.resolve(t.start),
										a = s.nodeAfter,
										l = 0 === t.startIndex,
										t = t.endIndex === n.childCount,
										c = s.node(-1),
										u = s.index(-1),
										c = c.canReplace(
											u + (l ? 0 : 1),
											u + 1,
											null == a
												? void 0
												: a.content.append(t ? Je.empty : Je.from(n))
										);
									return (
										a &&
											c &&
											((c = (u = s.pos) + a.nodeSize),
											e.step(
												new l0(
													u - (l ? 1 : 0),
													c + (t ? 1 : 0),
													u + 1,
													c - 1,
													new Ke(
														(l
															? Je.empty
															: Je.from(n.copy(Je.empty))
														).append(
															t ? Je.empty : Je.from(n.copy(Je.empty))
														),
														l ? 0 : 1,
														t ? 0 : 1
													),
													l ? 0 : 1
												)
											)),
										e
									);
								})(l, e)
					),
					!0)
				);
			};
		}
		function Rp() {
			return function () {
				return function (e, t) {
					var n,
						r,
						o = e.selection,
						i = e.schema,
						s = o.$from;
					return !(
						!s.blockRange(o.$to) ||
						!kp(s) ||
						((r = i.nodes.listItem),
						(o = t),
						(i = (s = e).tr),
						!(
							(s = (s = s.selection).$from.blockRange(s.$to, function (e) {
								return !!e.childCount && e.firstChild.type === r;
							})) && 0 < s.startIndex
						)) ||
						(e = (t = s.parent).child(s.startIndex - 1)).type !== r ||
						((n = (e = e.lastChild && e.lastChild.type === t.type)
							? Je.from(r.create())
							: null),
						(t = new Ke(
							Je.from(r.create(null, Je.from(t.type.create(null, n)))),
							e ? 3 : 1,
							0
						)),
						(n = s.start),
						(s = s.end),
						i.step(new l0(n - (e ? 3 : 1), s, n, s, t, 1, !0)),
						o(i),
						0)
					);
				};
			};
		}
		function Pp() {
			return {
				indent: Rp(),
				outdent: function () {
					return function (e, t) {
						var n = e.selection,
							r = e.schema,
							o = n.$from;
						return !(!o.blockRange(n.$to) || !kp(o)) && Ip(r.nodes.listItem)(e, t);
					};
				}
			};
		}
		var Bp = new Map(),
			Fp =
				((Ve.create = function (e) {
					var t,
						n,
						r,
						o,
						i,
						s = wp(e, function (e) {
							return "table" === e.type.name;
						});
					return s
						? ((t = s.node),
							(r = s.depth),
							(s = s.offset),
							(null == (i = Bp.get(t)) ? void 0 : i.tableStartPos) === s + 1
								? i
								: ((n = []),
									(s = e.start(r)),
									(i = t.child(0)),
									(e = t.child(1)),
									(r = zp(i, s)),
									(o = zp(e, s + i.nodeSize)),
									i.forEach(function (e) {
										return n.push(e);
									}),
									e.forEach(function (e) {
										return n.push(e);
									}),
									(i = new Ve(t, n, s, r.concat(o))),
									Bp.set(t, i),
									i))
						: null;
				}),
				Object.defineProperty(Ve.prototype, "totalRowCount", {
					get: function () {
						return this.rowInfo.length;
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Ve.prototype, "totalColumnCount", {
					get: function () {
						return this.rowInfo[0].length;
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Ve.prototype, "tableStartOffset", {
					get: function () {
						return this.tableStartPos;
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Ve.prototype, "tableEndOffset", {
					get: function () {
						return this.tableStartPos + this.table.nodeSize - 1;
					},
					enumerable: !1,
					configurable: !0
				}),
				(Ve.prototype.getCellInfo = function (e, t) {
					return this.rowInfo[e][t];
				}),
				(Ve.prototype.posAt = function (e, t) {
					for (var n = 0, r = this.tableStartPos; ; n += 1) {
						var o = r + this.tableRows[n].nodeSize;
						if (n === e) {
							for (
								var i = t;
								i < this.totalColumnCount && this.rowInfo[n][i].offset < r;

							)
								i += 1;
							return i === this.totalColumnCount ? o : this.rowInfo[n][i].offset;
						}
						r = o;
					}
				}),
				(Ve.prototype.getNodeAndPos = function (e, t) {
					e = this.rowInfo[e][t];
					return {
						node: this.table.nodeAt(e.offset - this.tableStartOffset),
						pos: e.offset
					};
				}),
				(Ve.prototype.extendedRowspan = function (e, t) {
					return !1;
				}),
				(Ve.prototype.extendedColspan = function (e, t) {
					return !1;
				}),
				(Ve.prototype.getRowspanCount = function (e, t) {
					return 0;
				}),
				(Ve.prototype.getColspanCount = function (e, t) {
					return 0;
				}),
				(Ve.prototype.decreaseColspanCount = function (e, t) {
					return 0;
				}),
				(Ve.prototype.decreaseRowspanCount = function (e, t) {
					return 0;
				}),
				(Ve.prototype.getColspanStartInfo = function (e, t) {
					return null;
				}),
				(Ve.prototype.getRowspanStartInfo = function (e, t) {
					return null;
				}),
				(Ve.prototype.getCellStartOffset = function (e, t) {
					var n = this.rowInfo[e][t].offset;
					return this.extendedRowspan(e, t) ? this.posAt(e, t) : n;
				}),
				(Ve.prototype.getCellEndOffset = function (e, t) {
					var n = this.rowInfo[e][t],
						r = n.offset,
						n = n.nodeSize;
					return this.extendedRowspan(e, t) ? this.posAt(e, t) : r + n;
				}),
				(Ve.prototype.getCellIndex = function (e) {
					for (var t = 0; t < this.totalRowCount; t += 1)
						for (var n = this.rowInfo[t], r = 0; r < this.totalColumnCount; r += 1)
							if (n[r].offset + 1 > e.pos) return [t, r];
					return [0, 0];
				}),
				(Ve.prototype.getRectOffsets = function (e, t) {
					void 0 === t && (t = e), e.pos > t.pos && ((e = (n = [t, e])[0]), (t = n[1]));
					var n = this.getCellIndex(e),
						e = n[0],
						n = n[1],
						t = this.getCellIndex(t),
						r = pn(e, t[0]),
						e = r[0],
						t = pn(n, t[1]),
						n = t[0];
					return this.getSpannedOffsets({
						startRowIdx: e,
						startColIdx: n,
						endRowIdx: r[1],
						endColIdx: t[1]
					});
				}),
				(Ve.prototype.getSpannedOffsets = function (e) {
					return e;
				}),
				Ve);
		function Ve(e, t, n, r) {
			(this.table = e), (this.tableRows = t), (this.tableStartPos = n), (this.rowInfo = r);
		}
		var Hp,
			zp = function (e, i) {
				var t = [];
				return (
					e.forEach(function (e, r) {
						var o = { rowspanMap: {}, colspanMap: {}, length: 0 };
						e.forEach(function (e, t) {
							for (var e = e.nodeSize, n = 0; o[n]; ) n += 1;
							(o[n] = { offset: i + r + t + 2, nodeSize: e }), (o.length += 1);
						}),
							t.push(o);
					}),
					t
				);
			};
		function qp(e, t) {
			return dn(Fp.prototype, e), (zp = t), Fp;
		}
		function Vp(e, t) {
			void 0 === t && (t = e);
			var n = this,
				r = e.node(0),
				o = Fp.create(e),
				i = o.getRectOffsets(e, t),
				r = ((e, t, n) => {
					for (
						var r = n.startRowIdx,
							o = n.startColIdx,
							i = n.endRowIdx,
							s = n.endColIdx,
							a = [],
							l = r;
						l <= i;
						l += 1
					)
						for (var c = o; c <= s; c += 1) {
							var u = t.getCellInfo(l, c),
								d = u.offset,
								u = u.nodeSize;
							a.push(new d0(e.resolve(d + 1), e.resolve(d + u - 1)));
						}
					return a;
				})(r, o, i);
			return (
				((n = Hp.call(this, r[0].$from, r[0].$to, r) || this).startCell = e),
				(n.endCell = t),
				(n.offsetMap = o),
				(n.isCellSelection = !0),
				(n.visible = !1),
				n
			);
		}
		be(Vp, (Hp = Ze)),
			(Vp.prototype.map = function (e, t) {
				var n = this.startCell.pos,
					r = this.endCell.pos,
					n = e.resolve(t.map(n)),
					t = e.resolve(t.map(r)),
					r = Fp.create(n);
				return this.offsetMap.totalColumnCount > r.totalColumnCount ||
					this.offsetMap.totalRowCount > r.totalRowCount
					? ((r = { tableBody: 1, tableRow: 2, tableCell: 3, paragraph: 4 }[
							t.parent.type.name
						]),
						(r = t.end(t.depth - r)),
						(r = Math.min(r - 4, t.pos)),
						Xe.create(e, r))
					: new Vp(n, t);
			}),
			(Vp.prototype.eq = function (e) {
				return (
					e instanceof Vp &&
					e.startCell.pos === this.startCell.pos &&
					e.endCell.pos === this.endCell.pos
				);
			}),
			(Vp.prototype.content = function () {
				for (
					var e,
						t = this.startCell.node(-2),
						n = this.startCell.start(-2),
						r = t.child(1).firstChild,
						o = t.child(0).type.create(),
						i = t.child(1).type.create(),
						s = Fp.create(this.startCell),
						a = s.getRectOffsets(this.startCell, this.endCell),
						l = a.startRowIdx,
						c = a.startColIdx,
						u = a.endRowIdx,
						d = a.endColIdx,
						p = !1,
						h = l;
					h <= u;
					h += 1
				) {
					for (var f = [], m = c; m <= d; m += 1) {
						var g = s.getCellInfo(h, m).offset,
							g = t.nodeAt(g - n);
						g &&
							((p = "tableHeadCell" === g.type.name),
							s.extendedRowspan(h, m) || s.extendedColspan(h, m)
								? f.push(g.type.create({ extended: !0 }))
								: f.push(g.copy(g.content)));
					}
					var v = r.copy(Je.from(f)),
						y = p ? o : i;
					y.content = y.content.append(Je.from(v));
				}
				return new Ke(
					((a = i),
					(l = []),
					(e = o).childCount && l.push(e),
					a.childCount && l.push(a),
					Je.from(l)),
					1,
					1
				);
			}),
			(Vp.prototype.toJSON = function () {
				return JSON.stringify(this);
			});
		var jp = Vp;
		function $p(e, t, n, r) {
			for (
				var o = n.nodes,
					i = o.tableRow,
					s = o.tableBodyCell,
					a = o.paragraph,
					l = [],
					c = 0;
				c < e;
				c += 1
			) {
				for (var u = [], d = 0; d < t; d += 1) {
					var p = r && r[c * t + d],
						p = a.create(null, p ? n.text(p) : []);
					u.push(s.create(null, p));
				}
				l.push(i.create(null, u));
			}
			return l;
		}
		function _p(e, t, n, r) {
			void 0 === r && (r = null);
			for (
				var n = n.nodes,
					o = n.tableHeadCell,
					i = n.paragraph,
					s = 0 === t ? o : n.tableBodyCell,
					a = [],
					l = 0;
				l < e;
				l += 1
			)
				a.push(s.create(r, i.create()));
			return a;
		}
		function Up(e, t) {
			for (; e && e !== t; ) {
				if ("TD" === e.nodeName || "TH" === e.nodeName) return e;
				e = e.parentNode;
			}
			return null;
		}
		function Wp(e) {
			return wp(e, function (e) {
				e = e.type;
				return "tableHeadCell" === e.name || "tableBodyCell" === e.name;
			});
		}
		function Jp(e) {
			if (e instanceof Xe) {
				var t = e.$anchor,
					n = Wp(t);
				if (n) return { anchor: (t = t.node(0).resolve(t.before(n.depth))), head: t };
			}
			return { anchor: e.startCell, head: e.endCell };
		}
		function Gp(e) {
			var t;
			if (e.size) {
				var n = e.content,
					r = e.openStart,
					o = e.openEnd;
				if (1 !== n.childCount) return null;
				for (
					;
					1 === n.childCount &&
					((0 < r && 0 < o) ||
						"table" === (null == (t = n.firstChild) ? void 0 : t.type.name));

				)
					--r, --o, (n = n.firstChild.content);
				if (
					"tableHead" === n.firstChild.type.name ||
					"tableBody" === n.firstChild.type.name
				)
					return n;
			}
			return null;
		}
		function Kp(e) {
			var t = e.startRowIdx;
			return { rowCount: e.endRowIdx - t + 1, columnCount: e.endColIdx - e.startColIdx + 1 };
		}
		var Zp = new w0("cellSelection");
		function Xp(e) {
			(this.view = e),
				(this.handlers = {
					mousedown: this.handleMousedown.bind(this),
					mousemove: this.handleMousemove.bind(this),
					mouseup: this.handleMouseup.bind(this)
				}),
				(this.startCellPos = null),
				this.init();
		}
		(Xp.prototype.init = function () {
			this.view.dom.addEventListener("mousedown", this.handlers.mousedown);
		}),
			(Xp.prototype.handleMousedown = function (e) {
				var t = Up(e.target, this.view.dom);
				2 === e.button
					? e.preventDefault()
					: t && ((t = this.getCellPos(e)) && (this.startCellPos = t), this.bindEvent());
			}),
			(Xp.prototype.handleMousemove = function (e) {
				var t,
					n = Zp.getState(this.view.state),
					e = this.getCellPos(e),
					r = this.startCellPos;
				n ? (t = this.view.state.doc.resolve(n)) : r !== e && (t = r),
					t && r && e && this.setCellSelection(r, e);
			}),
			(Xp.prototype.handleMouseup = function () {
				(this.startCellPos = null),
					this.unbindEvent(),
					null !== Zp.getState(this.view.state) &&
						this.view.dispatch(this.view.state.tr.setMeta(Zp, -1));
			}),
			(Xp.prototype.bindEvent = function () {
				var e = this.view.dom;
				e.addEventListener("mousemove", this.handlers.mousemove),
					e.addEventListener("mouseup", this.handlers.mouseup);
			}),
			(Xp.prototype.unbindEvent = function () {
				var e = this.view.dom;
				e.removeEventListener("mousemove", this.handlers.mousemove),
					e.removeEventListener("mouseup", this.handlers.mouseup);
			}),
			(Xp.prototype.getCellPos = function (e) {
				var t = e.clientX,
					t = this.view.posAtCoords({ left: t, top: e.clientY });
				if (t) {
					var e = this.view.state.doc,
						t = e.resolve(t.pos),
						n = Wp(t);
					if (n) return (t = t.before(n.depth)), e.resolve(t);
				}
				return null;
			}),
			(Xp.prototype.setCellSelection = function (e, t) {
				var n = this.view.state,
					r = n.selection,
					n = n.tr,
					o = null === Zp.getState(this.view.state),
					e = new jp(e, t);
				(!o && r.eq(e)) ||
					((r = n.setSelection(e)), o && r.setMeta(Zp, t.pos), this.view.dispatch(r));
			}),
			(Xp.prototype.destroy = function () {
				this.view.dom.removeEventListener("mousedown", this.handlers.mousedown);
			});
		var Qp = Xp,
			Yp = Ne("cell-selected");
		function eh(e) {
			var n,
				t = e.selection,
				e = e.doc;
			return t instanceof jp
				? ((n = []),
					t.ranges.forEach(function (e) {
						var t = e.$from,
							e = e.$to;
						n.push(B0.node(t.pos - 1, e.pos + 1, { class: Yp }));
					}),
					Ye.create(e, n))
				: null;
		}
		var xe = ye(928),
			th = ye.n(xe);
		function nh() {
			(this.keys = []), (this.values = []);
		}
		(nh.prototype.getKeyIndex = function (e) {
			return th()(e, this.keys);
		}),
			(nh.prototype.get = function (e) {
				return this.values[this.getKeyIndex(e)];
			}),
			(nh.prototype.set = function (e, t) {
				var n = this.getKeyIndex(e);
				return (
					-1 < n ? (this.values[n] = t) : (this.keys.push(e), this.values.push(t)), this
				);
			}),
			(nh.prototype.has = function (e) {
				return -1 < this.getKeyIndex(e);
			}),
			(nh.prototype.delete = function (e) {
				e = this.getKeyIndex(e);
				return -1 < e && (this.keys.splice(e, 1), this.values.splice(e, 1), !0);
			}),
			(nh.prototype.forEach = function (n, r) {
				var o = this;
				void 0 === r && (r = this),
					this.values.forEach(function (e, t) {
						e && o.keys[t] && n.call(r, e, o.keys[t], o);
					});
			}),
			(nh.prototype.clear = function () {
				(this.keys = []), (this.values = []);
			});
		var rh = nh;
		function oh() {
			(this.code = "en-US"), (this.langs = new rh());
		}
		(oh.prototype.setCode = function (e) {
			this.code = e || "en-US";
		}),
			(oh.prototype.setLanguage = function (e, n) {
				var r = this;
				(e = [].concat(e)).forEach(function (e) {
					var t;
					r.langs.has(e)
						? ((t = r.langs.get(e)), r.langs.set(e, Dt()(t, n)))
						: r.langs.set(e, n);
				});
			}),
			(oh.prototype.get = function (e, t) {
				t = t || this.code;
				var n = (this.langs.get(t) || this.langs.get("en-US"))[e];
				if (n) return n;
				throw new Error('There is no text key "' + e + '" in ' + t);
			});
		var je = new oh(),
			ih = [
				[
					{
						action: "Add row to up",
						command: "addRowToUp",
						disableInThead: !0,
						className: "add-row-up"
					},
					{
						action: "Add row to down",
						command: "addRowToDown",
						disableInThead: !0,
						className: "add-row-down"
					},
					{
						action: "Remove row",
						command: "removeRow",
						disableInThead: !0,
						className: "remove-row"
					}
				],
				[
					{
						action: "Add column to left",
						command: "addColumnToLeft",
						className: "add-column-left"
					},
					{
						action: "Add column to right",
						command: "addColumnToRight",
						className: "add-column-right"
					},
					{ action: "Remove column", command: "removeColumn", className: "remove-column" }
				],
				[
					{
						action: "Align column to left",
						command: "alignColumn",
						payload: { align: "left" },
						className: "align-column-left"
					},
					{
						action: "Align column to center",
						command: "alignColumn",
						payload: { align: "center" },
						className: "align-column-center"
					},
					{
						action: "Align column to right",
						command: "alignColumn",
						payload: { align: "right" },
						className: "align-column-right"
					}
				],
				[{ action: "Remove table", command: "removeTable", className: "remove-table" }]
			];
		function sh(l) {
			return new b0({
				props: {
					handleDOMEvents: {
						contextmenu: function (e, t) {
							var n,
								r,
								o,
								i,
								s,
								a = Up(t.target, e.dom);
							return (
								!!a &&
								(t.preventDefault(),
								(n = t.clientX),
								(t = t.clientY),
								(r = (e = e.dom.parentNode.getBoundingClientRect()).left),
								(o = "TH" === a.nodeName),
								l.emit("contextmenu", {
									pos: { left: n - r + 10 + "px", top: t - e.top + 30 + "px" },
									menuGroups:
										((i = l),
										(s = o),
										ih
											.map(function (e) {
												return e.map(function (e) {
													var t = e.action,
														n = e.command,
														r = e.payload,
														o = e.disableInThead,
														e = e.className;
													return {
														label: je.get(t),
														onClick: function () {
															i.emit("command", n, r);
														},
														disabled: s && !!o,
														className: e
													};
												});
											})
											.concat()),
									tableCell: a
								}),
								!0)
							);
						}
					}
				}
			});
		}
		var ah = ["image", "link", "customBlock", "frontMatter"],
			lh = ["strong", "strike", "emph", "code"],
			ch = ["bulletList", "orderedList", "taskList"];
		function uh(e, t, u) {
			var d = e.$from,
				p = e.$to,
				h = { indent: { active: !1, disabled: !0 }, outdent: { active: !1, disabled: !0 } };
			return (
				t.nodesBetween(e.from, e.to, function (e, t, n) {
					n = n;
					var r,
						o,
						i,
						s,
						a,
						l,
						c,
						e =
							"listItem" === (r = (e = e).type.name)
								? e.attrs.task
									? "taskList"
									: n.type.name
								: -1 !== r.indexOf("table")
									? "table"
									: r;
					Zt(ah, e) ||
						(Zt(ch, e)
							? (((c = h)[(l = e)] = { active: !0 }),
								ch
									.filter(function (e) {
										return e !== l;
									})
									.forEach(function (e) {
										c[e] && delete c[e];
									}),
								(h.indent.disabled = !1),
								(h.outdent.disabled = !1))
							: "paragraph" === e || "text" === e
								? ((o = d),
									(i = p),
									(s = u),
									(a = h),
									lh.forEach(function (e) {
										var t = s.marks[e],
											n = o.marksAcross(i) || [];
										!t.isInSet(n) || (a[e] = { active: !0 });
									}))
								: (h[e] = { active: !0 }));
				}),
				h
			);
		}
		(ph.prototype.renderToolArea = function () {
			var e = this,
				t = document.createElement("div"),
				n = document.createElement("span"),
				r = document.createElement("button");
			(t.className = "tool"),
				(n.textContent = this.node.attrs.info),
				(n.className = "info"),
				(r.type = "button"),
				r.addEventListener("click", function () {
					return e.openEditor();
				}),
				t.appendChild(n),
				t.appendChild(r),
				this.wrapper.appendChild(t);
		}),
			(ph.prototype.renderCustomBlock = function () {
				var e = this.toDOMAdaptor.getToDOMNode(this.node.attrs.info);
				if (e) {
					for (e = e(this.node); this.wrapper.hasChildNodes(); )
						this.wrapper.removeChild(this.wrapper.lastChild);
					e && this.wrapper.appendChild(e), this.renderToolArea();
				}
			}),
			(ph.prototype.createInnerViewContainer = function () {
				(this.innerViewContainer = document.createElement("div")),
					(this.innerViewContainer.className = Ne("custom-block-editor")),
					(this.innerViewContainer.style.display = "none");
			}),
			(ph.prototype.closeEditor = function () {
				this.innerEditorView &&
					(this.innerEditorView.destroy(),
					(this.innerEditorView = null),
					(this.innerViewContainer.style.display = "none")),
					(this.wrapper.style.display = "block");
			}),
			(ph.prototype.saveAndFinishEditing = function () {
				var e = this.editorView.state.selection.to,
					t = this.editorView.state;
				this.editorView.dispatch(t.tr.setSelection(Se(t.tr, e))),
					this.editorView.focus(),
					this.renderCustomBlock(),
					this.closeEditor();
			}),
			(ph.prototype.cancelEditing = function () {
				t = this.innerEditorView.state;
				var e = (t = I.getState(t)) ? t.done.eventCount : 0;
				for (this.canceled = !0; e--; )
					R(this.innerEditorView.state, this.innerEditorView.dispatch),
						R(this.editorView.state, this.editorView.dispatch);
				this.canceled = !1;
				var t = this.editorView.state.selection.to,
					n = this.editorView.state;
				this.editorView.dispatch(n.tr.setSelection(Xe.create(n.doc, t))),
					this.editorView.focus(),
					this.closeEditor();
			}),
			(ph.prototype.dispatchInner = function (e) {
				var e = this.innerEditorView.state.applyTransaction(e),
					t = e.state,
					n = e.transactions;
				if ((this.innerEditorView.updateState(t), !this.canceled && ls()(this.getPos))) {
					for (
						var r = this.editorView.state.tr, o = t0.offset(this.getPos() + 1), i = 0;
						i < n.length;
						i += 1
					)
						for (var s = n[i].steps, a = 0; a < s.length; a += 1) r.step(s[a].map(o));
					r.docChanged && this.editorView.dispatch(r);
				}
			}),
			(ph.prototype.update = function (e) {
				return (
					!!e.sameMarkup(this.node) &&
					((this.node = e), this.innerEditorView || this.renderCustomBlock(), !0)
				);
			}),
			(ph.prototype.stopEvent = function (e) {
				return (
					!!this.innerEditorView &&
					!!e.target &&
					this.innerEditorView.dom.contains(e.target)
				);
			}),
			(ph.prototype.ignoreMutation = function () {
				return !0;
			}),
			(ph.prototype.destroy = function () {
				this.dom.removeEventListener("dblclick", this.openEditor), this.closeEditor();
			});
		var dh = ph;
		function ph(e, t, n, r) {
			var o = this;
			(this.openEditor = function () {
				if (o.innerEditorView) throw new Error("The editor is already opened.");
				(o.dom.draggable = !1),
					(o.wrapper.style.display = "none"),
					(o.innerViewContainer.style.display = "block"),
					(o.innerEditorView = new q0(o.innerViewContainer, {
						state: y0.create({
							doc: o.node,
							plugins: [
								Lo({
									"Mod-z": function () {
										return R(
											o.innerEditorView.state,
											o.innerEditorView.dispatch
										);
									},
									"Shift-Mod-z": function () {
										return P(
											o.innerEditorView.state,
											o.innerEditorView.dispatch
										);
									},
									Tab: function (e, t) {
										return t(e.tr.insertText("\t")), !0;
									},
									Enter: ce,
									Escape: function () {
										return o.cancelEditing(), !0;
									},
									"Ctrl-Enter": function () {
										return o.saveAndFinishEditing(), !0;
									}
								}),
								ni()
							]
						}),
						dispatchTransaction: function (e) {
							return o.dispatchInner(e);
						},
						handleDOMEvents: {
							mousedown: function () {
								return o.editorView.hasFocus() && o.innerEditorView.focus(), !0;
							},
							blur: function () {
								return o.saveAndFinishEditing(), !0;
							}
						}
					})),
					o.innerEditorView.focus();
			}),
				(this.node = e),
				(this.editorView = t),
				(this.getPos = n),
				(this.toDOMAdaptor = r),
				(this.innerEditorView = null),
				(this.canceled = !1),
				(this.dom = document.createElement("div")),
				(this.dom.className = Ne("custom-block")),
				(this.wrapper = document.createElement("div")),
				(this.wrapper.className = Ne("custom-block-view")),
				this.createInnerViewContainer(),
				this.renderCustomBlock(),
				this.dom.appendChild(this.innerViewContainer),
				this.dom.appendChild(this.wrapper);
		}
		var hh = "image-link",
			fh =
				((mh.prototype.createElement = function () {
					var e,
						t = this.createImageElement(this.node);
					return this.imageLink
						? (((e = document.createElement("span")).className = hh),
							e.appendChild(t),
							e)
						: t;
				}),
				(mh.prototype.createImageElement = function (e) {
					var t = document.createElement("img"),
						n = e.attrs,
						r = n.imageUrl,
						n = n.altText,
						e = qe(e.attrs),
						r = (() => {
							var [, e] = String(r).match(/^_id:(\d+)/) || [];
							return e
								? Vue._common_utils.appendToken(
										`${window._AJAX_URL_PREFIX || ""}/api/resource/get?id=` + e
									)
								: r;
						})();
					return (t.src = r), n && (t.alt = n), Ji(e, t), t;
				}),
				(mh.prototype.bindEvent = function () {
					this.imageLink && this.dom.addEventListener("mousedown", this.handleMousedown);
				}),
				(mh.prototype.stopEvent = function () {
					return !0;
				}),
				(mh.prototype.destroy = function () {
					this.imageLink &&
						this.dom.removeEventListener("mousedown", this.handleMousedown);
				}),
				mh);
		function mh(e, t, n, r) {
			var o = this;
			(this.handleMousedown = function (e) {
				e.preventDefault();
				var t = e.target,
					n = e.offsetX,
					r = e.offsetY;
				o.imageLink &&
					ls()(o.getPos) &&
					Oi()(t, hh) &&
					((t = getComputedStyle(t, ":before")), e.stopPropagation(), Hi(t, n, r)) &&
					((e = o.view.state.tr),
					(t = o.getPos()),
					e.setSelection(Se(e, t, t + 1)),
					o.view.dispatch(e),
					o.eventEmitter.emit("openPopup", "link", o.imageLink.attrs));
			}),
				(this.node = e),
				(this.view = t),
				(this.getPos = n),
				(this.eventEmitter = r),
				(this.imageLink =
					null !=
					(t = e.marks.filter(function (e) {
						return "link" === e.type.name;
					})[0])
						? t
						: null),
				(this.dom = this.createElement()),
				this.bindEvent();
		}
		(vh.prototype.createElement = function () {
			var e = this.node.attrs.language,
				t = document.createElement("div"),
				e =
					(t.setAttribute("data-language", e || "text"),
					(t.className = "toastui-editor-ww-code-block"),
					this.createCodeBlockElement()),
				n = e.firstChild;
			t.appendChild(e), (this.dom = t), (this.contentDOM = n);
		}),
			(vh.prototype.createCodeBlockElement = function () {
				var e = document.createElement("pre"),
					t = document.createElement("code"),
					n = this.node.attrs.language,
					r = qe(this.node.attrs);
				return n && t.setAttribute("data-language", n), Ji(r, e), e.appendChild(t), e;
			}),
			(vh.prototype.createLanguageEditor = function (e) {
				var t = this,
					n = e.top,
					e = e.right,
					r = document.createElement("span"),
					o =
						((r.className = "toastui-editor-ww-code-block-language"),
						document.createElement("input")),
					i =
						((o.type = "text"),
						(o.value = this.node.attrs.language),
						r.appendChild(o),
						this.view.dom.parentElement.appendChild(r),
						r.clientWidth);
				At()(r, { top: n + 10 + "px", left: e - i - 10 + "px", width: i + "px" }),
					(this.input = o),
					this.input.addEventListener("blur", function () {
						return t.changeLanguage();
					}),
					this.input.addEventListener("keydown", this.handleKeydown),
					this.clearTimer(),
					(this.timer = setTimeout(function () {
						t.input.focus();
					}));
			}),
			(vh.prototype.bindDOMEvent = function () {
				this.dom && this.dom.addEventListener("click", this.handleMousedown);
			}),
			(vh.prototype.bindEvent = function () {
				var e = this;
				this.eventEmitter.listen("scroll", function () {
					e.input && e.reset();
				});
			}),
			(vh.prototype.changeLanguage = function () {
				var e, t, n;
				this.input &&
					ls()(this.getPos) &&
					((e = this.input.value),
					this.reset(),
					(t = this.getPos()),
					(n = this.view.state.tr).setNodeMarkup(t, null, { language: e }),
					this.view.dispatch(n));
			}),
			(vh.prototype.reset = function () {
				var e;
				null != (e = this.input) &&
					e.parentElement &&
					((e = this.input.parentElement), (this.input = null), Vi(e));
			}),
			(vh.prototype.clearTimer = function () {
				this.timer && (clearTimeout(this.timer), (this.timer = null));
			}),
			(vh.prototype.stopEvent = function () {
				return !0;
			}),
			(vh.prototype.update = function (e) {
				return !!e.sameMarkup(this.node) && ((this.node = e), !0);
			}),
			(vh.prototype.destroy = function () {
				this.reset(),
					this.clearTimer(),
					this.dom && this.dom.removeEventListener("click", this.handleMousedown);
			});
		var gh = vh;
		function vh(e, t, n, r) {
			var o = this;
			(this.contentDOM = null),
				(this.input = null),
				(this.timer = null),
				(this.handleMousedown = function (e) {
					var t,
						e = e.target;
					"none" !== getComputedStyle(e, ":after").backgroundImage &&
						ls()(o.getPos) &&
						((t = (e = o.view.coordsAtPos(o.getPos())).top),
						o.createLanguageEditor({ top: t, right: e.right }));
				}),
				(this.handleKeydown = function (e) {
					"Enter" === e.key && o.input && (e.preventDefault(), o.changeLanguage());
				}),
				(this.node = e),
				(this.view = t),
				(this.getPos = n),
				(this.eventEmitter = r),
				this.createElement(),
				this.bindDOMEvent(),
				this.bindEvent();
		}
		var yh = /MsoListParagraph/,
			bh = /style=(.|\n)*mso-/,
			wh = /mso-list:(.*)/,
			kh = /O:P/,
			xh = /^(n|u|l)/,
			Ch = "p.MsoListParagraph";
		function Th(e) {
			for (var t = [], n = document.createTreeWalker(e, 1, null, !1); n.nextNode(); ) {
				var r,
					o,
					i,
					s = n.currentNode;
				qi(s) &&
					((i = s.outerHTML),
					(r = s.textContent),
					(o = bh.test(i)),
					(i = wh.test(i)),
					o && !i && r
						? t.push([s, !0])
						: (kh.test(s.nodeName) || (o && !r) || i) && t.push([s, !1]));
			}
			return (
				t.forEach(function (e) {
					var t = e[0];
					if (e[1]) {
						for (var n = t, r = []; n.firstChild; )
							r.push(n.firstChild),
								n.parentNode && n.parentNode.insertBefore(n.firstChild, n);
						Vi(n);
					} else Vi(t);
				}),
				e.innerHTML.trim()
			);
		}
		function Mh(e) {
			var s = [];
			return (
				e.forEach(function (e, t) {
					var n,
						r = s[t - 1],
						t =
							((t = t),
							(n = (e = e).getAttribute("style"))
								? ((n = n.match(wh)[1].trim().split(" ")[1]),
									{
										id: t,
										level: parseInt(n.replace("level", ""), 10),
										prev: null,
										parent: null,
										children: [],
										unordered: xh.test(e.textContent || ""),
										contents: Th(e)
									})
								: null);
					if (t) {
						if (r) {
							var o = t,
								i = r;
							if (i.level < o.level) i.children.push(o), (o.parent = i);
							else {
								for (; i && i.level !== o.level; ) i = i.parent;
								i &&
									((o.prev = i), (o.parent = i.parent), o.parent) &&
									o.parent.children.push(o);
							}
						}
						s.push(t);
					}
				}),
				s
			);
		}
		function Sh(e) {
			return (function r(e) {
				var t = e[0].unordered ? "ul" : "ol",
					o = document.createElement(t);
				return (
					e.forEach(function (e) {
						var t = e.children,
							e = e.contents,
							n = document.createElement("li");
						(n.innerHTML = e), o.appendChild(n), t.length && o.appendChild(r(t));
					}),
					o
				);
			})(
				Mh(e).filter(function (e) {
					return !e.parent;
				})
			);
		}
		function Eh(e) {
			var i = document.createElement("div"),
				s = ((i.innerHTML = e), []),
				t = ((e = i), (t = Ch), (e = xo()(e.querySelectorAll(t))).length ? e : []);
			return (
				t.forEach(function (e) {
					var t,
						n,
						r,
						o = (e => {
							for (; e && !qi(e); ) e = e.nextSibling;
							return !e || !yh.test(e.className);
						})(e.nextSibling);
					s.push(e),
						o &&
							((o = Sh(s)),
							(r = e.nextSibling)
								? ((n = o), (r = r).parentNode && r.parentNode.insertBefore(n, r))
								: ((t = i),
									(n = o),
									(n = Ni()(n) ? xo()(n) : [n]).forEach(function (e) {
										t.appendChild(e);
									})),
							(s = [])),
						Vi(e);
				}),
				(t.length ? "<p></p>" : "") + i.innerHTML
			);
		}
		var Nh = "\x3c!--StartFragment--\x3e",
			Oh = "\x3c!--EndFragment--\x3e";
		function Dh(e) {
			var t, n, r;
			return (
				(n = (t = e).indexOf(Nh)),
				(r = t.lastIndexOf(Oh)),
				(e = (t = -1 < n && -1 < r ? t.slice(n + Nh.length, r) : t).replace(
					/<br[^>]*>/g,
					Fi
				)),
				(n = e),
				/<\/td>((?!<\/tr>)[\s\S])*$/i.test(n) && (n = "<tr>" + n + "</tr>"),
				(e = n = /<\/tr>((?!<\/table>)[\s\S])*$/i.test(n) ? "<table>" + n + "</table>" : n),
				(r = e),
				(e = bh.test(r) ? Eh(e) : e)
			);
		}
		function Ah(e, t, n) {
			for (var r, o = [], i = e.childCount, s = 0; s < i; s += 1)
				e.child(s).attrs.extended ||
					((r =
						s < i ? n.create(e.child(s).attrs, e.child(s).content) : n.createAndFill()),
					o.push(r));
			return o;
		}
		function Lh(e, t, n) {
			var n = n.nodes,
				r = n.tableRow,
				e = Ah(e, 0, n.tableHeadCell);
			return r.create(null, e);
		}
		function Ih(e, t, n) {
			var n = n.nodes,
				r = n.tableRow,
				e = Ah(e, 0, n.tableBodyCell);
			return r.create(null, e);
		}
		function Rh(e) {
			var t = [],
				n = [];
			return (
				"tableHead" === e.firstChild.type.name &&
					e.firstChild.forEach(function (e) {
						return t.push(e);
					}),
				"tableBody" === e.lastChild.type.name &&
					e.lastChild.forEach(function (e) {
						return n.push(e);
					}),
				nt(nt([], t), n)
			);
		}
		function Ph(e, t, n) {
			var r = e.map(function (e) {
				return Ih(e, 0, n);
			});
			return (
				e.length ||
					((e = ((e, t) => {
						for (
							var n = (t = t.nodes).tableRow, r = t.tableBodyCell, o = [], i = 0;
							i < e;
							i += 1
						) {
							var s = r.createAndFill();
							o.push(s);
						}
						return n.create({ dummyRowForPasting: !0 }, o);
					})(t, n)),
					r.push(e)),
				n.nodes.tableBody.create(null, r)
			);
		}
		function Bh(e, t, n, r) {
			var o = e.reduce(function (e, t) {
				return e.childCount > t.childCount ? e : t;
			}).childCount;
			return n && r
				? t.nodes.table.create(null, [Ph(e, o, t)])
				: ((n = e[0]),
					(r = e.slice(1)),
					(n = [((e = Lh((e = n), 0, (n = t))), n.nodes.tableHead.create(null, e))]),
					r.length && n.push(Ph(r, o, t)),
					t.nodes.table.create(null, n));
		}
		var Fh = 4,
			Hh = 2;
		function zh(e) {
			return e * Fh;
		}
		function qh(e, t, n) {
			for (
				var r = t.startRowIdx, t = t.startColIdx, o = n.length, i = 0, s = 0;
				s < o;
				s += 1
			)
				(e => {
					var t = n[e].childCount;
					n[e].forEach(function (e) {
						e = e.attrs.colspan;
						1 < e && (t += e - 1);
					}),
						(i = Math.max(i, t));
				})(s);
			var a = r + o - 1,
				l = t + i - 1;
			return {
				startRowIdx: r,
				startColIdx: t,
				endRowIdx: a,
				endColIdx: l,
				addedRowCount: Math.max(1 + a - e.totalRowCount, 0),
				addedColumnCount: Math.max(1 + l - e.totalColumnCount, 0)
			};
		}
		function Vh(e, t) {
			var s,
				a,
				l,
				c,
				n,
				r,
				o = e.state,
				i = o.selection,
				u = o.schema,
				o = o.tr,
				i = Jp(i),
				d = i.anchor,
				i = i.head;
			if (d && i) {
				var t = Gp(t);
				if (!t) return !1;
				var p = Fp.create(d),
					d = p.getRectOffsets(d, i),
					i =
						((i = d),
						(n = u),
						(r = []),
						(t = Rh((t = t)))[0].childCount,
						(i = 0 === i.startRowIdx),
						(t = t.slice(0, t.length)),
						i && (i = t.shift()) && ((i = Lh(i, 0, n).content), r.push(i)),
						t.forEach(function (e) {
							e.attrs.dummyRowForPasting || ((e = Ih(e, 0, n).content), r.push(e));
						}),
						r),
					t = qh(p, d, i),
					d = [];
				if (
					((N = t),
					(k = Kp((k = p).getSpannedOffsets(N))),
					(h = k.rowCount),
					(k = k.columnCount),
					(N = Kp(N)),
					(m = N.rowCount),
					(N = N.columnCount),
					h === m && k === N)
				) {
					for (
						var h = t,
							f = d,
							m = h.startRowIdx,
							g = h.startColIdx,
							v = h.endRowIdx,
							B = h.endColIdx,
							F = h.addedRowCount,
							H = h.addedColumnCount,
							y = m;
						y <= v - F;
						y += 1
					)
						f.push({ rowIdx: y, startColIdx: g, endColIdx: B - H });
					if (t.addedColumnCount)
						for (
							var b = o,
								z = u,
								w = p,
								k = t,
								q = d,
								V = k.startRowIdx,
								j = k.startColIdx,
								$ = k.endRowIdx,
								x = k.endColIdx,
								_ = k.addedRowCount,
								C = k.addedColumnCount,
								U = w.totalRowCount,
								T = 0,
								M = 0;
							M < U;
							M += 1
						) {
							var S = w.getCellInfo(M, x - C),
								E = S.offset,
								E = b.mapping.map(E + S.nodeSize),
								S = _p(C, M, z);
							b.insert(E, S),
								V <= M &&
									M <= $ - _ &&
									((S = w.getCellInfo(M, x - C)),
									(S = b.mapping.map(S.offset)),
									(q[T] = {
										rowIdx: M,
										startColIdx: j,
										endColIdx: x,
										dummyOffsets: [S, E + C * Fh]
									}),
									(T += 1));
						}
					if (t.addedRowCount) {
						var N = o,
							h = u,
							O = p,
							W = d,
							D = (m = t).addedRowCount,
							A = m.addedColumnCount,
							L = m.startColIdx,
							I = m.endColIdx,
							m = N.mapping.maps.length,
							k = O.tableEndOffset - 2,
							h = $p(D, O.totalColumnCount + A, h),
							R = k;
						N.insert(N.mapping.slice(m).map(R), h);
						for (var P = 0; P < D; P += 1) {
							var J = R + zh(I + 1) + 1,
								G = R + zh(O.totalColumnCount + A) + Hh;
							W.push({
								rowIdx: P + O.totalRowCount,
								startColIdx: L,
								endColIdx: I,
								dummyOffsets: [R + L * Fh + 1, J]
							}),
								(R = G);
						}
					}
					(a = i),
						(l = p),
						(c = (s = o).mapping.maps.length),
						d.forEach(function (e, t) {
							var n = e.rowIdx,
								r = e.startColIdx,
								o = e.endColIdx,
								e = e.dummyOffsets,
								i = s.mapping.slice(c),
								t = new Ke(a[t], 0, 0),
								r = e ? e[0] : l.getCellStartOffset(n, r),
								e = e ? e[1] : l.getCellEndOffset(n, o);
							s.replace(i.map(r), i.map(e), t);
						}),
						e.dispatch(o),
						(u = e),
						(t = d),
						(k = p.getCellInfo(0, 0).offset),
						(N = u.state),
						(m = N.tr),
						(N = N.doc),
						(k = Fp.create(N.resolve(k))),
						(h = t[0]),
						(i = h.rowIdx),
						(h = h.startColIdx),
						(t = sn(t)),
						(o = t.rowIdx),
						(t = t.endColIdx),
						(i = k.getCellInfo(i, h).offset),
						(h = k.getCellInfo(o, t).offset),
						u.dispatch(m.setSelection(new jp(N.resolve(i), N.resolve(h))));
				}
				return !0;
			}
			return !1;
		}
		be(_h, (jh = Ce)),
			Object.defineProperty(_h.prototype, "name", {
				get: function () {
					return "doc";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(_h.prototype, "schema", {
				get: function () {
					return { content: "block+" };
				},
				enumerable: !1,
				configurable: !0
			});
		var jh,
			$h = _h;
		function _h() {
			return (null !== jh && jh.apply(this, arguments)) || this;
		}
		be(Jh, (Uh = Ce)),
			Object.defineProperty(Jh.prototype, "name", {
				get: function () {
					return "paragraph";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Jh.prototype, "schema", {
				get: function () {
					return {
						content: "inline*",
						group: "block",
						attrs: we({}, Ep()),
						parseDOM: [{ tag: "p" }],
						toDOM: function (e) {
							return ["p", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var Uh,
			Wh = Jh;
		function Jh() {
			return (null !== Uh && Uh.apply(this, arguments)) || this;
		}
		var Gh,
			Kh = /\s{1,4}$/,
			Zh =
				(be(Xh, (Gh = Ce)),
				Object.defineProperty(Xh.prototype, "name", {
					get: function () {
						return "text";
					},
					enumerable: !1,
					configurable: !0
				}),
				Object.defineProperty(Xh.prototype, "schema", {
					get: function () {
						return { group: "inline" };
					},
					enumerable: !1,
					configurable: !0
				}),
				(Xh.prototype.addSpaces = function () {
					return function (e, t) {
						var n = e.selection,
							e = e.tr,
							r = n.$from,
							n = n.$to;
						return !(
							!r.blockRange(n) ||
							kp(r) ||
							xp(r) ||
							(t(e.insertText("    ", r.pos, n.pos)), 0)
						);
					};
				}),
				(Xh.prototype.removeSpaces = function () {
					return function (e, t) {
						var n = e.selection,
							e = e.tr,
							r = n.$from,
							o = n.from;
						if (r.blockRange(n.$to) && !kp(r) && !xp(r)) {
							var n = r.nodeBefore;
							if (n && n.isText)
								return (
									(n = (r = n.text).replace(Kh, "")),
									(r = r.length - n.length),
									t(e.delete(o - r, o)),
									!0
								);
						}
						return !1;
					};
				}),
				(Xh.prototype.keymaps = function () {
					return { Tab: this.addSpaces(), "Shift-Tab": this.removeSpaces() };
				}),
				Xh);
		function Xh() {
			return (null !== Gh && Gh.apply(this, arguments)) || this;
		}
		be(ef, (Qh = Ce)),
			Object.defineProperty(ef.prototype, "name", {
				get: function () {
					return "heading";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(ef.prototype, "levels", {
				get: function () {
					return [1, 2, 3, 4, 5, 6];
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(ef.prototype, "schema", {
				get: function () {
					var e = this.levels.map(function (t) {
						return {
							tag: "h" + t,
							getAttrs: function (e) {
								e = e.getAttribute("data-raw-html");
								return we({ level: t }, e && { rawHTML: e });
							}
						};
					});
					return {
						attrs: we(
							{
								level: { default: 1 },
								headingType: { default: "atx" },
								rawHTML: { default: null }
							},
							Ep()
						),
						content: "inline*",
						group: "block",
						defining: !0,
						parseDOM: e,
						toDOM: function (e) {
							e = e.attrs;
							return ["h" + e.level, qe(e), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(ef.prototype.commands = function () {
				return function (n) {
					return function (e, t) {
						return zo(e.schema.nodes[n.level ? "heading" : "paragraph"], n)(e, t);
					};
				};
			});
		var Qh,
			Yh = ef;
		function ef() {
			return (null !== Qh && Qh.apply(this, arguments)) || this;
		}
		be(rf, (tf = Ce)),
			Object.defineProperty(rf.prototype, "name", {
				get: function () {
					return "codeBlock";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(rf.prototype, "schema", {
				get: function () {
					return {
						content: "text*",
						group: "block",
						attrs: we(
							{ language: { default: null }, rawHTML: { default: null } },
							Ep()
						),
						code: !0,
						defining: !0,
						marks: "",
						parseDOM: [
							{
								tag: "pre",
								preserveWhitespace: "full",
								getAttrs: function (e) {
									var t = e.getAttribute("data-raw-html"),
										e = e.firstElementChild;
									return we(
										{
											language:
												(null == e
													? void 0
													: e.getAttribute("data-language")) || null
										},
										t && { rawHTML: t }
									);
								}
							}
						],
						toDOM: function (e) {
							e = e.attrs;
							return [
								e.rawHTML || "pre",
								["code", we({ "data-language": e.language }, qe(e)), 0]
							];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(rf.prototype.commands = function () {
				return function () {
					return function (e, t) {
						return zo(e.schema.nodes.codeBlock)(e, t);
					};
				};
			}),
			(rf.prototype.moveCursor = function (l) {
				var c = this;
				return function (e, t) {
					var n,
						r = e.tr,
						o = e.doc,
						i = e.schema,
						e = e.selection.$from;
					if (c.context.view.endOfTextblock(l) && "codeBlock" === e.node().type.name) {
						var s = e.parent.textContent.split("\n"),
							a = "up" === l ? e.start() : e.end(),
							s = "up" === l ? [a, s[0].length + a] : [a - sn(s).length, a],
							a = o.resolve("up" === l ? e.before() : e.after()),
							o = "up" === l ? a.nodeBefore : a.nodeAfter;
						if (((e = e.pos), (n = s[1]), s[0] <= e && e <= n && !o)) {
							s = ii(r, a, i);
							if (s) return t(s), !0;
						}
					}
					return !1;
				};
			}),
			(rf.prototype.keymaps = function () {
				var e = this.commands()();
				return {
					"Shift-Mod-p": e,
					"Shift-Mod-P": e,
					ArrowUp: this.moveCursor("up"),
					ArrowDown: this.moveCursor("down")
				};
			});
		var tf,
			nf = rf;
		function rf() {
			return (null !== tf && tf.apply(this, arguments)) || this;
		}
		be(af, (of = Ce)),
			Object.defineProperty(af.prototype, "name", {
				get: function () {
					return "bulletList";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(af.prototype, "schema", {
				get: function () {
					return {
						content: "listItem+",
						group: "block",
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: [Tp("ul")],
						toDOM: function (e) {
							return ["ul", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(af.prototype.changeList = function () {
				return function (e, t) {
					return Ap(e.schema.nodes.bulletList)(e, t);
				};
			}),
			(af.prototype.commands = function () {
				return { bulletList: this.changeList, taskList: Lp };
			}),
			(af.prototype.keymaps = function () {
				var e = this.changeList(),
					t = Pp(),
					n = t.indent,
					t = t.outdent;
				return { "Mod-u": e, "Mod-U": e, Tab: n(), "Shift-Tab": t() };
			});
		var of,
			sf = af;
		function af() {
			return (null !== of && of.apply(this, arguments)) || this;
		}
		be(uf, (lf = Ce)),
			Object.defineProperty(uf.prototype, "name", {
				get: function () {
					return "orderedList";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(uf.prototype, "schema", {
				get: function () {
					return {
						content: "listItem+",
						group: "block",
						attrs: we({ order: { default: 1 }, rawHTML: { default: null } }, Ep()),
						parseDOM: [
							{
								tag: "ol",
								getAttrs: function (e) {
									var t = e.getAttribute("start"),
										n = e.getAttribute("data-raw-html");
									return we(
										{ order: e.hasAttribute("start") ? Number(t) : 1 },
										n && { rawHTML: n }
									);
								}
							}
						],
						toDOM: function (e) {
							e = e.attrs;
							return [
								e.rawHTML || "ol",
								we({ start: 1 === e.order ? null : e.order }, qe(e)),
								0
							];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(uf.prototype.commands = function () {
				return function () {
					return function (e, t) {
						return Ap(e.schema.nodes.orderedList)(e, t);
					};
				};
			}),
			(uf.prototype.keymaps = function () {
				var e = this.commands()(),
					t = Pp(),
					n = t.indent,
					t = t.outdent;
				return { "Mod-o": e, "Mod-O": e, Tab: n(), "Shift-Tab": t() };
			});
		var lf,
			cf = uf;
		function uf() {
			return (null !== lf && lf.apply(this, arguments)) || this;
		}
		be(hf, (df = Ce)),
			Object.defineProperty(hf.prototype, "name", {
				get: function () {
					return "listItem";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(hf.prototype, "schema", {
				get: function () {
					return {
						content: "paragraph block*",
						selectable: !1,
						attrs: {
							task: { default: !1 },
							checked: { default: !1 },
							rawHTML: { default: null }
						},
						defining: !0,
						parseDOM: [
							{
								tag: "li",
								getAttrs: function (e) {
									var t = e.getAttribute("data-raw-html");
									return we(
										{
											task: e.hasAttribute("data-task"),
											checked: e.hasAttribute("data-task-checked")
										},
										t && { rawHTML: t }
									);
								}
							}
						],
						toDOM: function (e) {
							var t,
								e = e.attrs,
								n = e.task,
								r = e.checked;
							return n
								? ((t = ["task-list-item"]),
									r && t.push("checked"),
									[
										e.rawHTML || "li",
										we(
											{ class: t.join(" "), "data-task": n },
											r && { "data-task-checked": r }
										),
										0
									])
								: [e.rawHTML || "li", 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(hf.prototype.liftToPrevListItem = function () {
				return function (e, t) {
					var n = e.selection,
						r = e.tr,
						o = n.$from,
						n = n.empty,
						e = e.schema.nodes.listItem,
						i = o.parent,
						s = o.node(-1);
					if (n && !i.childCount && s.type === e) {
						if (1 <= o.index(-2)) return r.delete(o.start(-1) - 1, o.end(-1)), t(r), !0;
						if (o.node(-3).type === e)
							return r.delete(o.start(-2) - 1, o.end(-1)), t(r), !0;
					}
					return !1;
				};
			}),
			(hf.prototype.keymaps = function () {
				return {
					Backspace: this.liftToPrevListItem(),
					Enter: function (e, t) {
						i = e.schema.nodes.listItem;
						var n = (e = e).tr,
							r = (e = e.selection).$from,
							e = e.$to;
						if (r.depth < 2 || !r.sameParent(e)) return !1;
						var o = r.node(-1);
						if (o.type !== i) return !1;
						if (
							0 !== r.parent.content.size ||
							r.node(-1).childCount !== r.indexAfter(-1)
						)
							return (
								(o = (s =
									e.pos === r.end() ? o.contentMatchAt(0).defaultType : null) && [
									null,
									{ type: s }
								]),
								n.delete(r.pos, e.pos),
								!!kn(n.doc, r.pos, 2, o) && (n.split(r.pos, 2, o), t(n), !0)
							);
						if (
							2 === r.depth ||
							r.node(-3).type !== i ||
							r.index(-2) !== r.node(-2).childCount - 1
						)
							return !1;
						for (
							var i, s = 0 < r.index(-1), a = Je.empty, l = r.depth - (s ? 1 : 2);
							l >= r.depth - 3;
							--l
						)
							a = Je.from(r.node(l).copy(a));
						return (
							(a = a.append(Je.from(i.createAndFill()))),
							n.replace(
								s ? r.before() : r.before(-1),
								r.after(-3),
								new Ke(a, s ? 3 : 2, 2)
							),
							n.setSelection(Ze.near(n.doc.resolve(r.pos + (s ? 3 : 2)))),
							t(n),
							!0
						);
					}
				};
			});
		var df,
			pf = hf;
		function hf() {
			return (null !== df && df.apply(this, arguments)) || this;
		}
		be(gf, (ff = Ce)),
			Object.defineProperty(gf.prototype, "name", {
				get: function () {
					return "blockQuote";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(gf.prototype, "schema", {
				get: function () {
					return {
						attrs: we({ rawHTML: { default: null } }, Ep()),
						content: "block+",
						group: "block",
						parseDOM: [Tp("blockquote")],
						toDOM: function (e) {
							return ["blockquote", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(gf.prototype.commands = function () {
				return function () {
					return function (e, t) {
						(n = e.schema.nodes.blockQuote), (r = null);
						var n,
							r,
							{ $from: o, $to: i } = e.selection,
							o = o.blockRange(i);
						return (
							!!(i = o && yn(o, n, r)) &&
							(t && t(e.tr.wrap(o, i).scrollIntoView()), !0)
						);
					};
				};
			}),
			(gf.prototype.keymaps = function () {
				var e = this.commands()();
				return { "Alt-q": e, "Alt-Q": e };
			});
		var ff,
			mf = gf;
		function gf() {
			return (null !== ff && ff.apply(this, arguments)) || this;
		}
		var $e,
			vf = {
				left: function (e, t) {
					var n = e[0],
						e = e[1],
						r = t.totalColumnCount,
						o = 0 === e;
					if (n === 0 && o) return null;
					--e, o && (--n, (e = r - 1));
					o = t.getCellInfo(n, e);
					return o.offset + o.nodeSize - 2;
				},
				right: function (e, t) {
					var n = e[0],
						e = e[1],
						r = t.totalRowCount,
						o = t.totalColumnCount,
						i = e === o - 1;
					if (n === r - 1 && i) return null;
					(r = e + 1), (e = t.getColspanStartInfo(n, e));
					1 < (null == e ? void 0 : e.count) && (r += e.count - 1);
					(!i && r !== o) || ((n += 1), (r = 0));
					return t.getCellInfo(n, r).offset + 2;
				},
				up: function (e, t) {
					var n = e[0],
						e = e[1];
					if (0 < n) return (t = t.getCellInfo(n - 1, e)).offset + t.nodeSize - 2;
					return null;
				},
				down: function (e, t) {
					var n = e[0],
						e = e[1],
						r = t.totalRowCount;
					if (n < r - 1)
						return (
							(r = n + 1),
							1 < (null == (n = t.getRowspanStartInfo(n, e)) ? void 0 : n.count) &&
								(r += n.count - 1),
							t.getCellInfo(r, e).offset + 2
						);
					return null;
				}
			};
		function yf(e, t, n, r, o) {
			if (e === $e.RIGHT || e === $e.DOWN) {
				if (
					o &&
					!(e => {
						for (
							var t, n, r, o = e.depth;
							o && "tableBodyCell" !== (t = e.node(o)).type.name;

						) {
							if ("listItem" === t.type.name)
								return (
									(n = e.node(o - 1).lastChild === t),
									(r =
										"paragraph" !==
										(null == (r = t.lastChild) ? void 0 : r.type.name)),
									n ? !r : void 0
								);
							--o;
						}
					})(n)
				)
					return !1;
				e = n.after(t);
				if (r.resolve(e).nodeAfter) return !1;
			}
			return !0;
		}
		function bf(e, t, n, r) {
			var o = t[0],
				t = t[1],
				i = o + 3,
				s = i <= t,
				o = s ? o + 1 : t,
				t = ((e, t, n, r, o) => {
					var i = t[0],
						s = t[2];
					if (e === $e.LEFT || e === $e.UP) {
						if (
							o &&
							((o = (e = [i, t[1]])[0]),
							(e = e[1]),
							(i = (i = r).resolve(n.before(o - 1))),
							e !== o || i.nodeBefore)
						)
							return !1;
						t = n.before(s);
						if (r.resolve(t).nodeBefore) return !1;
					}
					return !0;
				})(e, [t, i, o], n, r, s),
				i = yf(e, o, n, r, s);
			return t && i;
		}
		function wf(e, t, n) {
			var r = n[0],
				n = t.getRowspanStartInfo(r, n[1]),
				o = e === $e.UP && 0 === r,
				e =
					e === $e.DOWN &&
					(1 < (null == n ? void 0 : n.count) ? r + n.count - 1 : r) ===
						t.totalRowCount - 1;
			return o || e;
		}
		function kf(e, t, n, r) {
			void 0 === r && (r = !1);
			t = e.doc.resolve(t.tableEndOffset);
			return r || !t.nodeAfter ? ii(e, t, n) : e.setSelection(Ze.near(t, 1));
		}
		function xf(e, t, n, r) {
			n = (0, vf[e])(n, r);
			return n
				? ((r = e === $e.RIGHT || e === $e.DOWN ? 1 : -1),
					t.setSelection(Ze.near(t.doc.resolve(n), r)))
				: null;
		}
		((Me = $e = $e || {}).LEFT = "left"),
			(Me.RIGHT = "right"),
			(Me.UP = "up"),
			(Me.DOWN = "down"),
			be(Mf, (Cf = Ce)),
			Object.defineProperty(Mf.prototype, "name", {
				get: function () {
					return "table";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Mf.prototype, "schema", {
				get: function () {
					return {
						content: "tableHead{1} tableBody{1}",
						group: "block",
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: [Tp("table")],
						toDOM: function (e) {
							return ["table", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Mf.prototype.addTable = function () {
				return function (c) {
					return (
						void 0 === c && (c = { rowCount: 2, columnCount: 1, data: [] }),
						function (e, t) {
							var n,
								r,
								o = c.rowCount,
								i = c.columnCount,
								s = c.data,
								a = e.schema,
								l = e.selection,
								e = e.tr;
							return (
								l.from === l.to &&
								!xp(l.$from) &&
								((n = (l = a.nodes).tableHead),
								(l = l.tableBody),
								(r = null == s ? void 0 : s.slice(0, i)),
								(s = null == s ? void 0 : s.slice(i, s.length)),
								(r = ((e, t, n) => {
									for (
										var r = t.nodes,
											o = r.tableRow,
											i = r.tableHeadCell,
											s = r.paragraph,
											a = [],
											l = 0;
										l < e;
										l += 1
									) {
										var c = n && n[l],
											c = s.create(null, c ? t.text(c) : []);
										a.push(i.create(null, c));
									}
									return [o.create(null, a)];
								})(i, a, r)),
								(o = $p(o - 1, i, a, s)),
								(i = a.nodes.table.create(null, [
									n.create(null, r),
									l.create(null, o)
								])),
								t(e.replaceSelectionWith(i)),
								!0)
							);
						}
					);
				};
			}),
			(Mf.prototype.removeTable = function () {
				return function () {
					return function (e, t) {
						var n,
							r = e.selection,
							e = e.tr,
							r = Fp.create(r.$anchor);
						return (
							!!r &&
							((n = r.tableStartOffset),
							(r = r.tableEndOffset),
							(r = Se(e.delete((n = n - 1), r), n)),
							t(e.setSelection(r)),
							!0)
						);
					};
				};
			}),
			(Mf.prototype.addColumn = function (d) {
				return function () {
					return function (e, t) {
						var n = e.selection,
							r = e.tr,
							o = e.schema,
							e = Jp(n),
							n = e.anchor,
							e = e.head;
						if (n && e) {
							for (
								var i = Fp.create(n),
									n = i.getRectOffsets(n, e),
									s = d === $e.LEFT ? n.startColIdx : n.endColIdx + 1,
									a = Kp(n).columnCount,
									l = i.totalRowCount,
									c = 0;
								c < l;
								c += 1
							) {
								var u = _p(a, c, o);
								r.insert(r.mapping.map(i.posAt(c, s)), u);
							}
							return t(r), !0;
						}
						return !1;
					};
				};
			}),
			(Mf.prototype.removeColumn = function () {
				return function () {
					return function (e, t) {
						var n = e.selection,
							r = e.tr,
							e = Jp(n),
							n = e.anchor,
							e = e.head;
						if (n && e) {
							var o = Fp.create(n),
								n = o.getRectOffsets(n, e),
								e = o.totalColumnCount,
								i = o.totalRowCount;
							if (Kp(n).columnCount === e) return !1;
							for (
								var s = n.startColIdx,
									a = n.endColIdx,
									l = r.mapping.maps.length,
									c = 0;
								c < i;
								c += 1
							)
								for (var u = a; s <= u; --u) {
									var d = o.getCellInfo(c, u),
										p = d.offset,
										d = d.nodeSize,
										p = r.mapping.slice(l).map(p);
									r.delete(p, p + d);
								}
							return t(r), !0;
						}
						return !1;
					};
				};
			}),
			(Mf.prototype.addRow = function (g) {
				return function () {
					return function (e, t) {
						var n,
							r,
							o = e.selection,
							i = e.schema,
							e = e.tr,
							o = Jp(o),
							s = o.anchor,
							o = o.head;
						if (s && o) {
							var a = Fp.create(s),
								l = a.totalColumnCount,
								s = a.getRectOffsets(s, o),
								c = Kp(s).rowCount,
								s =
									((o = a),
									(s = s),
									(n =
										(n = g) === $e.UP
											? ((p = s.startRowIdx), (r = 0), -1)
											: ((p = s.endRowIdx),
												(r = o.totalColumnCount - 1),
												o.getCellInfo(p, r).nodeSize + 1)),
									{ targetRowIdx: p, insertColIdx: r, nodeSize: n }),
								u = s.targetRowIdx,
								o = s.nodeSize;
							if (!(0 === u)) {
								for (
									var d = [],
										p = e.mapping.map(a.posAt(u, s.insertColIdx)) + o,
										h = [],
										f = 0;
									f < l;
									f += 1
								)
									h = h.concat(_p(1, u, i));
								for (var m = 0; m < c; m += 1)
									d.push(i.nodes.tableRow.create(null, h));
								return t(e.insert(p, d)), !0;
							}
						}
						return !1;
					};
				};
			}),
			(Mf.prototype.removeRow = function () {
				return function () {
					return function (e, t) {
						var n,
							r,
							o,
							i = e.selection,
							s = e.tr,
							e = Jp(i),
							i = e.anchor,
							e = e.head;
						if (i && e) {
							var a = Fp.create(i),
								l = a.totalRowCount,
								c = a.totalColumnCount,
								i = a.getRectOffsets(i, e),
								e = Kp(i).rowCount,
								u = i.startRowIdx;
							if (e === l - 1 || 0 === u) return !1;
							for (var d = i.endRowIdx; u <= d; --d) {
								(p = d),
									(r = c),
									(o = void 0),
									(o = (n = a).getCellInfo(p, 0).offset),
									(n = n.getCellInfo(p, r - 1));
								var p = { from: o, to: n.offset + n.nodeSize };
								s.delete(p.from - 1, p.to + 1);
							}
							return t(s), !0;
						}
						return !1;
					};
				};
			}),
			(Mf.prototype.alignColumn = function () {
				return function (f) {
					return (
						void 0 === f && (f = { align: "center" }),
						function (e, t) {
							var n,
								r = f.align,
								o = e.selection,
								i = e.tr,
								e = Jp(o),
								o = e.anchor,
								e = e.head;
							if (o && e) {
								for (
									var s = Fp.create(o),
										a = s.totalRowCount,
										o = s.getRectOffsets(o, e),
										l = o.startColIdx,
										c = o.endColIdx,
										u = 0;
									u < a;
									u += 1
								)
									for (var d, p, h = l; h <= c; h += 1)
										s.extendedRowspan(u, h) ||
											s.extendedColspan(u, h) ||
											((d = s.getNodeAndPos(u, h)),
											(p = d.node),
											(d = d.pos),
											(n = { align: r }),
											(p = we(we({}, p.attrs), n)),
											i.setNodeMarkup(d, null, p));
								return t(i), !0;
							}
							return !1;
						}
					);
				};
			}),
			(Mf.prototype.moveToCell = function (s) {
				return function (e, t) {
					var n = e.selection,
						r = e.tr,
						e = e.schema,
						n = Jp(n),
						o = n.anchor;
					if (o && n.head) {
						var n = Fp.create(o),
							o = n.getCellIndex(o),
							i = void 0;
						if ((i = wf(s, n, o) ? kf(r, n, e) : xf(s, r, o, n))) return t(i), !0;
					}
					return !1;
				};
			}),
			(Mf.prototype.moveInCell = function (u) {
				var d = this;
				return function (e, t) {
					var n = e.selection,
						r = e.tr,
						o = e.doc,
						e = e.schema,
						i = n.$from;
					if (d.context.view.endOfTextblock(u)) {
						var s,
							a,
							l = wp(i, function (e) {
								e = e.type;
								return "tableHeadCell" === e.name || "tableBodyCell" === e.name;
							});
						if (l) {
							var c = wp(i, function (e) {
									return "paragraph" === e.type.name;
								}),
								l = l.depth;
							if (c && bf(u, [l, c.depth], i, o)) {
								(c = Jp(n).anchor),
									(o = Fp.create(c)),
									(n = o.getCellIndex(c)),
									(c = void 0);
								if (
									(((e, t, n) => {
										var r,
											o,
											i = n[0],
											n = n[1];
										return (
											e !== $e.UP &&
											e !== $e.DOWN &&
											((r = t.tableStartOffset),
											(o = t.tableEndOffset),
											(i = (t = t.getCellInfo(i, n)).offset),
											(e === $e.LEFT ? r : o) ===
												(e === $e.LEFT ? i - 2 : i + t.nodeSize + 3))
										);
									})(u, o, n)
										? ((a = i),
											(a = (s = r).doc.resolve(i.before(l - 3))),
											(c = s.setSelection(new Qe(a))))
										: wf(u, o, n)
											? u === $e.UP
												? ((i = o),
													(l = e),
													(c = (i = (s = r).doc.resolve(
														i.tableStartOffset - 1
													)).nodeBefore
														? s.setSelection(Ze.near(i, -1))
														: ii(s, i, l)))
												: u === $e.DOWN && (c = kf(r, o, e))
											: (c = xf(u, r, n, o)),
									c)
								)
									return t(c), !0;
							}
						}
					}
					return !1;
				};
			}),
			(Mf.prototype.deleteCells = function () {
				return function (e, t) {
					var n = e.schema,
						r = e.selection,
						o = e.tr,
						e = Jp(r),
						i = e.anchor,
						e = e.head,
						r = r instanceof Xe;
					if (i && e && !r) {
						for (
							var s = Fp.create(i),
								r = s.getRectOffsets(i, e),
								i = r.startRowIdx,
								a = r.startColIdx,
								l = r.endRowIdx,
								c = r.endColIdx,
								u = i;
							u <= l;
							u += 1
						)
							for (var d, p, h, f = a; f <= c; f += 1)
								s.extendedRowspan(u, f) ||
									s.extendedColspan(u, f) ||
									((d = (p = s.getNodeAndPos(u, f)).node),
									(p = p.pos),
									(h = _p(1, u, n, d.attrs)),
									o.replaceWith(
										o.mapping.map(p),
										o.mapping.map(p + d.nodeSize),
										h
									));
						return t(o), !0;
					}
					return !1;
				};
			}),
			(Mf.prototype.exitTable = function () {
				return function (e, t) {
					var n = e.selection,
						r = e.tr,
						e = e.schema,
						o = n.$from,
						i = wp(o, function (e) {
							e = e.type;
							return "tableHeadCell" === e.name || "tableBodyCell" === e.name;
						});
					if (
						i &&
						wp(o, function (e) {
							return "paragraph" === e.type.name;
						})
					)
						return (i = Jp(n).anchor), t(kf(r, Fp.create(i), e, !0)), !0;
					return !1;
				};
			}),
			(Mf.prototype.commands = function () {
				return {
					addTable: this.addTable(),
					removeTable: this.removeTable(),
					addColumnToLeft: this.addColumn($e.LEFT),
					addColumnToRight: this.addColumn($e.RIGHT),
					removeColumn: this.removeColumn(),
					addRowToUp: this.addRow($e.UP),
					addRowToDown: this.addRow($e.DOWN),
					removeRow: this.removeRow(),
					alignColumn: this.alignColumn()
				};
			}),
			(Mf.prototype.keymaps = function () {
				var e = this.deleteCells();
				return {
					Tab: this.moveToCell($e.RIGHT),
					"Shift-Tab": this.moveToCell($e.LEFT),
					ArrowUp: this.moveInCell($e.UP),
					ArrowDown: this.moveInCell($e.DOWN),
					ArrowLeft: this.moveInCell($e.LEFT),
					ArrowRight: this.moveInCell($e.RIGHT),
					Backspace: e,
					"Mod-Backspace": e,
					Delete: e,
					"Mod-Delete": e,
					"Mod-Enter": this.exitTable()
				};
			});
		var Cf,
			Tf = Mf;
		function Mf() {
			return (null !== Cf && Cf.apply(this, arguments)) || this;
		}
		be(Nf, (Sf = Ce)),
			Object.defineProperty(Nf.prototype, "name", {
				get: function () {
					return "tableHead";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Nf.prototype, "schema", {
				get: function () {
					return {
						content: "tableRow{1}",
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: [Tp("thead")],
						toDOM: function (e) {
							return ["thead", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var Sf,
			Ef = Nf;
		function Nf() {
			return (null !== Sf && Sf.apply(this, arguments)) || this;
		}
		be(Af, (Of = Ce)),
			Object.defineProperty(Af.prototype, "name", {
				get: function () {
					return "tableBody";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Af.prototype, "schema", {
				get: function () {
					return {
						content: "tableRow+",
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: [
							{
								tag: "tbody",
								getAttrs: function (e) {
									var t = e.querySelectorAll("tr")[0].children.length,
										e = e.getAttribute("data-raw-html");
									return !!t && we({}, e && { rawHTML: e });
								}
							}
						],
						toDOM: function (e) {
							return ["tbody", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var Of,
			Df = Af;
		function Af() {
			return (null !== Of && Of.apply(this, arguments)) || this;
		}
		be(Rf, (Lf = Ce)),
			Object.defineProperty(Rf.prototype, "name", {
				get: function () {
					return "tableRow";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Rf.prototype, "schema", {
				get: function () {
					return {
						content: "(tableHeadCell | tableBodyCell)*",
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: [
							{
								tag: "tr",
								getAttrs: function (e) {
									var t = e.children.length,
										e = e.getAttribute("data-raw-html");
									return !!t && we({}, e && { rawHTML: e });
								}
							}
						],
						toDOM: function (e) {
							return ["tr", qe(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var Lf,
			If = Rf;
		function Rf() {
			return (null !== Lf && Lf.apply(this, arguments)) || this;
		}
		be(Ff, (Pf = Ce)),
			Object.defineProperty(Ff.prototype, "name", {
				get: function () {
					return "tableHeadCell";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Ff.prototype, "schema", {
				get: function () {
					return {
						content: "paragraph+",
						attrs: we(
							{
								align: { default: null },
								className: { default: null },
								rawHTML: { default: null },
								colspan: { default: null },
								extended: { default: null }
							},
							Ep()
						),
						isolating: !0,
						parseDOM: [Sp("th")],
						toDOM: function (e) {
							var e = e.attrs,
								t = Mp(e);
							return ["th", we(we({}, t), qe(e)), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var Pf,
			Bf = Ff;
		function Ff() {
			return (null !== Pf && Pf.apply(this, arguments)) || this;
		}
		be(qf, (Hf = Ce)),
			Object.defineProperty(qf.prototype, "name", {
				get: function () {
					return "tableBodyCell";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(qf.prototype, "schema", {
				get: function () {
					return {
						content: "(paragraph | bulletList | orderedList)+",
						attrs: {
							align: { default: null },
							className: { default: null },
							rawHTML: { default: null },
							colspan: { default: null },
							rowspan: { default: null },
							extended: { default: null }
						},
						isolating: !0,
						parseDOM: [Sp("td")],
						toDOM: function (e) {
							return ["td", Mp(e.attrs), 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			});
		var Hf,
			zf = qf;
		function qf() {
			return (null !== Hf && Hf.apply(this, arguments)) || this;
		}
		be($f, (Vf = Ce)),
			Object.defineProperty($f.prototype, "name", {
				get: function () {
					return "image";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty($f.prototype, "schema", {
				get: function () {
					return {
						inline: !0,
						attrs: we(
							{
								imageUrl: { default: "" },
								altText: { default: null },
								rawHTML: { default: null }
							},
							Ep()
						),
						group: "inline",
						selectable: !1,
						parseDOM: [
							{
								tag: "img[src]",
								getAttrs: function (e) {
									var e = Yd(e, { RETURN_DOM_FRAGMENT: !0 }).firstChild,
										t = e.getAttribute("src") || "",
										n = e.getAttribute("data-raw-html"),
										e = e.getAttribute("alt");
									return we({ imageUrl: t, altText: e }, n && { rawHTML: n });
								}
							}
						],
						toDOM: function (e) {
							e = e.attrs;
							return [
								e.rawHTML || "img",
								we(
									we({ src: Kt(e.imageUrl) }, e.altText && { alt: e.altText }),
									qe(e)
								)
							];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			($f.prototype.addImage = function () {
				return function (i) {
					return function (e, t) {
						var n = e.schema,
							e = e.tr,
							r = i.imageUrl,
							o = i.altText;
						return (
							!!r &&
							((n = n.nodes.image.createAndFill(
								we({ imageUrl: r }, o && { altText: o })
							)),
							t(e.replaceSelectionWith(n).scrollIntoView()),
							!0)
						);
					};
				};
			}),
			($f.prototype.commands = function () {
				return { addImage: this.addImage() };
			});
		var Vf,
			jf = $f;
		function $f() {
			return (null !== Vf && Vf.apply(this, arguments)) || this;
		}
		be(Wf, (_f = Ce)),
			Object.defineProperty(Wf.prototype, "name", {
				get: function () {
					return "thematicBreak";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Wf.prototype, "schema", {
				get: function () {
					return {
						attrs: we({ rawHTML: { default: null } }, Ep()),
						group: "block",
						parseDOM: [{ tag: "hr" }],
						selectable: !1,
						toDOM: function (e) {
							e = e.attrs;
							return ["div", qe(e), [e.rawHTML || "hr"]];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Wf.prototype.hr = function () {
				var a = this;
				return function () {
					return function (e, t) {
						var n,
							r,
							o,
							i = e.selection,
							s = i.$from;
						return (
							s === i.$to &&
							((i = e.doc),
							(r = (n = e.schema.nodes).thematicBreak),
							(n = n.paragraph),
							(r = [r.create()]),
							(o = s.node(1)),
							(o = i.child(i.childCount - 1) === o),
							(i = i.resolve(s.after(1))),
							(s = (null == (s = s.nodeAfter) ? void 0 : s.type.name) === a.name),
							(o || s) && r.push(n.create()),
							t(e.tr.insert(i.pos, r).scrollIntoView()),
							!0)
						);
					};
				};
			}),
			(Wf.prototype.commands = function () {
				return { hr: this.hr() };
			}),
			(Wf.prototype.keymaps = function () {
				var e = this.hr()();
				return { "Mod-l": e, "Mod-L": e };
			});
		var _f,
			Uf = Wf;
		function Wf() {
			return (null !== _f && _f.apply(this, arguments)) || this;
		}
		be(Kf, (Jf = Te)),
			Object.defineProperty(Kf.prototype, "name", {
				get: function () {
					return "strong";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Kf.prototype, "schema", {
				get: function () {
					var e = ["b", "strong"].map(function (e) {
						return {
							tag: e,
							getAttrs: function (e) {
								e = e.getAttribute("data-raw-html");
								return we({}, e && { rawHTML: e });
							}
						};
					});
					return {
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: e,
						toDOM: function (e) {
							e = e.attrs;
							return [e.rawHTML || "strong", qe(e)];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Kf.prototype.bold = function () {
				return function () {
					return function (e, t) {
						return qo(e.schema.marks.strong)(e, t);
					};
				};
			}),
			(Kf.prototype.commands = function () {
				return { bold: this.bold() };
			}),
			(Kf.prototype.keymaps = function () {
				var e = this.bold()();
				return { "Mod-b": e, "Mod-B": e };
			});
		var Jf,
			Gf = Kf;
		function Kf() {
			return (null !== Jf && Jf.apply(this, arguments)) || this;
		}
		be(Qf, (Zf = Te)),
			Object.defineProperty(Qf.prototype, "name", {
				get: function () {
					return "emph";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(Qf.prototype, "schema", {
				get: function () {
					var e = ["i", "em"].map(function (e) {
						return {
							tag: e,
							getAttrs: function (e) {
								e = e.getAttribute("data-raw-html");
								return we({}, e && { rawHTML: e });
							}
						};
					});
					return {
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: e,
						toDOM: function (e) {
							e = e.attrs;
							return [e.rawHTML || "em", qe(e)];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(Qf.prototype.italic = function () {
				return function () {
					return function (e, t) {
						return qo(e.schema.marks.emph)(e, t);
					};
				};
			}),
			(Qf.prototype.commands = function () {
				return { italic: this.italic() };
			}),
			(Qf.prototype.keymaps = function () {
				var e = this.italic()();
				return { "Mod-i": e, "Mod-I": e };
			});
		var Zf,
			Xf = Qf;
		function Qf() {
			return (null !== Zf && Zf.apply(this, arguments)) || this;
		}
		be(tm, (Yf = Te)),
			Object.defineProperty(tm.prototype, "name", {
				get: function () {
					return "strike";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(tm.prototype, "schema", {
				get: function () {
					var e = ["s", "del"].map(function (e) {
						return {
							tag: e,
							getAttrs: function (e) {
								e = e.getAttribute("data-raw-html");
								return we({}, e && { rawHTML: e });
							}
						};
					});
					return {
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: e,
						toDOM: function (e) {
							e = e.attrs;
							return [e.rawHTML || "del", qe(e)];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(tm.prototype.commands = function () {
				return function () {
					return function (e, t) {
						return qo(e.schema.marks.strike)(e, t);
					};
				};
			}),
			(tm.prototype.keymaps = function () {
				var e = this.commands()();
				return { "Mod-s": e, "Mod-S": e };
			});
		var Yf,
			em = tm;
		function tm() {
			return (null !== Yf && Yf.apply(this, arguments)) || this;
		}
		be(om, (nm = Te)),
			Object.defineProperty(om.prototype, "name", {
				get: function () {
					return "link";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(om.prototype, "schema", {
				get: function () {
					var t = this;
					return {
						attrs: we(
							{
								linkUrl: { default: "" },
								title: { default: null },
								rawHTML: { default: null }
							},
							Ep()
						),
						inclusive: !1,
						parseDOM: [
							{
								tag: "a[href]",
								getAttrs: function (e) {
									var e = Yd(e, { RETURN_DOM_FRAGMENT: !0 }).firstChild,
										t = e.getAttribute("href") || "",
										n = e.getAttribute("title") || "",
										e = e.getAttribute("data-raw-html");
									return we({ linkUrl: t, title: n }, e && { rawHTML: e });
								}
							}
						],
						toDOM: function (e) {
							e = e.attrs;
							return [
								e.rawHTML || "a",
								we(we({ href: Kt(e.linkUrl) }, t.linkAttributes), qe(e))
							];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(om.prototype.addLink = function () {
				return function (l) {
					return function (e, t) {
						var n = l.linkUrl,
							r = l.linkText,
							r = void 0 === r ? "" : r,
							o = e.schema,
							i = e.tr,
							e = e.selection,
							s = e.empty,
							a = e.from,
							e = e.to;
						return (
							!!(a && e && n) &&
							((n = o.mark("link", { linkUrl: n })),
							s && r
								? ((s = oi(o, r, n)), i.replaceRangeWith(a, e, s))
								: i.addMark(a, e, n),
							t(i.scrollIntoView()),
							!0)
						);
					};
				};
			}),
			(om.prototype.toggleLink = function () {
				return function (n) {
					return function (e, t) {
						return qo(e.schema.marks.link, n)(e, t);
					};
				};
			}),
			(om.prototype.commands = function () {
				return { addLink: this.addLink(), toggleLink: this.toggleLink() };
			});
		var nm,
			rm = om;
		function om(e) {
			var t = nm.call(this) || this;
			return (t.linkAttributes = e), t;
		}
		be(am, (im = Te)),
			Object.defineProperty(am.prototype, "name", {
				get: function () {
					return "code";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(am.prototype, "schema", {
				get: function () {
					return {
						attrs: we({ rawHTML: { default: null } }, Ep()),
						parseDOM: [
							{
								tag: "code",
								getAttrs: function (e) {
									e = e.getAttribute("data-raw-html");
									return we({}, e && { rawHTML: e });
								}
							}
						],
						toDOM: function (e) {
							e = e.attrs;
							return [e.rawHTML || "code", qe(e)];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(am.prototype.commands = function () {
				return function () {
					return function (e, t) {
						return qo(e.schema.marks.code)(e, t);
					};
				};
			}),
			(am.prototype.keymaps = function () {
				var e = this.commands()();
				return { "Shift-Mod-c": e, "Shift-Mod-C": e };
			});
		var im,
			sm = am;
		function am() {
			return (null !== im && im.apply(this, arguments)) || this;
		}
		be(um, (lm = Ce)),
			Object.defineProperty(um.prototype, "name", {
				get: function () {
					return "customBlock";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(um.prototype, "schema", {
				get: function () {
					return {
						content: "text*",
						group: "block",
						attrs: { info: { default: null } },
						atom: !0,
						code: !0,
						defining: !0,
						parseDOM: [
							{
								tag: "div[data-custom-info]",
								getAttrs: function (e) {
									return { info: e.getAttribute("data-custom-info") };
								}
							}
						],
						toDOM: function (e) {
							return ["div", { "data-custom-info": e.attrs.info || null }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(um.prototype.commands = function () {
				return function (n) {
					return function (e, t) {
						return !(null == n || !n.info) && zo(e.schema.nodes.customBlock, n)(e, t);
					};
				};
			});
		var lm,
			cm = um;
		function um() {
			return (null !== lm && lm.apply(this, arguments)) || this;
		}
		be(hm, (dm = Ce)),
			Object.defineProperty(hm.prototype, "name", {
				get: function () {
					return "frontMatter";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(hm.prototype, "schema", {
				get: function () {
					return {
						content: "text*",
						group: "block",
						code: !0,
						defining: !0,
						parseDOM: [{ preserveWhitespace: "full", tag: "div[data-front-matter]" }],
						toDOM: function () {
							return ["div", { "data-front-matter": "true" }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(hm.prototype.commands = function () {
				return function () {
					return function (e, t, n) {
						var r = e.selection.$from;
						return (
							!(!n.endOfTextblock("down") || "frontMatter" !== r.node().type.name) &&
							A(e, t)
						);
					};
				};
			}),
			(hm.prototype.keymaps = function () {
				return { Enter: this.commands()() };
			});
		var dm,
			pm = hm;
		function hm() {
			return (null !== dm && dm.apply(this, arguments)) || this;
		}
		be(gm, (fm = Ce)),
			Object.defineProperty(gm.prototype, "name", {
				get: function () {
					return "htmlComment";
				},
				enumerable: !1,
				configurable: !0
			}),
			Object.defineProperty(gm.prototype, "schema", {
				get: function () {
					return {
						content: "text*",
						group: "block",
						code: !0,
						defining: !0,
						parseDOM: [{ preserveWhitespace: "full", tag: "div[data-html-comment]" }],
						toDOM: function () {
							return ["div", { "data-html-comment": "true" }, 0];
						}
					};
				},
				enumerable: !1,
				configurable: !0
			}),
			(gm.prototype.commands = function () {
				return function () {
					return function (e, t, n) {
						var r = e.selection.$from;
						return (
							!(!n.endOfTextblock("down") || "htmlComment" !== r.node().type.name) &&
							A(e, t)
						);
					};
				};
			}),
			(gm.prototype.keymaps = function () {
				return { Enter: this.commands()() };
			});
		var fm,
			mm = gm;
		function gm() {
			return (null !== fm && fm.apply(this, arguments)) || this;
		}
		var vm,
			ym = Ne("contents");
		function _e(e, t) {
			var e = vm.call(this, e) || this,
				n = t.toDOMAdaptor,
				r = t.htmlSchemaMap,
				r = void 0 === r ? {} : r,
				o = t.linkAttributes,
				o = void 0 === o ? {} : o,
				i = t.useCommandShortcut,
				i = void 0 === i || i,
				s = t.wwPlugins,
				s = void 0 === s ? [] : s,
				t = t.wwNodeViews,
				t = void 0 === t ? {} : t;
			return (
				(e.editorType = "wysiwyg"),
				e.el.classList.add("ww-mode"),
				(e.toDOMAdaptor = n),
				(e.linkAttributes = o),
				(e.extraPlugins = s),
				(e.pluginNodeViews = t),
				(e.specs = e.createSpecs()),
				(e.schema = e.createSchema(r)),
				(e.context = e.createContext()),
				(e.keymaps = e.createKeymaps(i)),
				(e.view = e.createView()),
				(e.commands = e.createCommands()),
				e.specs.setContext(we(we({}, e.context), { view: e.view })),
				e.initEvent(),
				e
			);
		}
		be(_e, (vm = zn)),
			(_e.prototype.createSpecs = function () {
				return (
					(e = this.linkAttributes),
					new ps([
						new $h(),
						new Wh(),
						new Zh(),
						new Yh(),
						new nf(),
						new sf(),
						new cf(),
						new pf(),
						new mf(),
						new Tf(),
						new Ef(),
						new Df(),
						new If(),
						new Bf(),
						new zf(),
						new jf(),
						new Uf(),
						new Gf(),
						new Xf(),
						new em(),
						new rm(e),
						new sm(),
						new cm(),
						new pm(),
						new ss(),
						new mm()
					])
				);
				var e;
			}),
			(_e.prototype.createContext = function () {
				return { schema: this.schema, eventEmitter: this.eventEmitter };
			}),
			(_e.prototype.createSchema = function (e) {
				return new Ky({
					nodes: we(we({}, this.specs.nodes), e.nodes),
					marks: we(we({}, this.specs.marks), e.marks)
				});
			}),
			(_e.prototype.createPlugins = function () {
				return nt(
					[
						new b0({
							key: Zp,
							state: {
								init: function () {
									return null;
								},
								apply: function (e, t) {
									var n = e.getMeta(Zp);
									return n
										? -1 === n
											? null
											: n
										: Ft()(t) || !e.docChanged
											? t
											: (n = e.mapping.mapResult(t)).deleted
												? null
												: n.pos;
								}
							},
							props: {
								decorations: eh,
								createSelectionBetween: function (e) {
									e = e.state;
									return Ft()(Zp.getState(e)) ? null : e.selection;
								}
							},
							view: function (e) {
								return new Qp(e);
							}
						}),
						sh(this.eventEmitter),
						new b0({
							props: {
								handleDOMEvents: {
									mousedown: function (e, t) {
										var n = t.clientX,
											n = e.posAtCoords({ left: n, top: t.clientY });
										if (n) {
											var r = e.state,
												o = r.doc,
												r = r.tr,
												o = o.resolve(n.pos),
												n = Cp(o),
												i = t.target,
												i = getComputedStyle(i, ":before"),
												s = t.offsetX;
											if (!n || !Hi(i, s, t.offsetY)) return !1;
											t.preventDefault();
											(i = o.before(n.depth)), (s = n.node.attrs);
											return (
												r.setNodeMarkup(
													i,
													null,
													we(we({}, s), { checked: !s.checked })
												),
												e.dispatch(r),
												!0
											);
										}
										return !1;
									}
								}
							}
						}),
						((n = this.eventEmitter),
						new b0({
							view: function () {
								return {
									update: function (e) {
										var e = e.state,
											t = e.selection;
										n.emit("changeToolbarState", {
											toolbarState: uh(t, e.doc, e.schema)
										});
									}
								};
							}
						}))
					],
					this.createPluginProps()
				).concat(this.defaultPlugins);
				var n;
			}),
			(_e.prototype.createPluginNodeViews = function () {
				var o = this.eventEmitter,
					i = this.pluginNodeViews,
					e = {};
				return (
					i &&
						Object.keys(i).forEach(function (r) {
							e[r] = function (e, t, n) {
								return i[r](e, t, n, o);
							};
						}),
					e
				);
			}),
			(_e.prototype.createView = function () {
				var s = this,
					r = this.toDOMAdaptor,
					o = this.eventEmitter;
				return new q0(this.el, {
					state: this.createState(),
					attributes: { class: ym },
					nodeViews: we(
						{
							customBlock: function (e, t, n) {
								return new dh(e, t, n, r);
							},
							image: function (e, t, n) {
								return new fh(e, t, n, o);
							},
							codeBlock: function (e, t, n) {
								return new gh(e, t, n, o);
							},
							widget: ns
						},
						this.createPluginNodeViews()
					),
					dispatchTransaction: function (e) {
						var t = s.view.state.applyTransaction(e).state;
						s.view.updateState(t),
							s.emitChangeEvent(e.scrollIntoView()),
							s.eventEmitter.emit("setFocusedNode", t.selection.$from.node(1));
					},
					transformPastedHTML: Dh,
					transformPasted: function (e) {
						return (
							(e = e),
							(r = s.schema),
							(o = xp(s.view.state.selection.$from)),
							(i = []),
							(t = e.content),
							(n = e.openStart),
							(e = e.openEnd),
							t.forEach(function (e) {
								var t, n;
								"table" === e.type.name
									? (t = Gp(new Ke(Je.from(e), 0, 0))) &&
										((n = Rh(t)),
										(t = "tableBody" === t.firstChild.type.name),
										(n = Bh(n, r, t, o)),
										i.push(n))
									: i.push(e);
							}),
							new Ke(Je.from(i), n, e)
						);
						var r, o, i, t, n;
					},
					handlePaste: function (e, t, n) {
						return Vh(e, n);
					},
					handleKeyDown: function (e, t) {
						return s.eventEmitter.emit("keydown", s.editorType, t), !1;
					},
					handleDOMEvents: {
						paste: function (e, t) {
							var n = t.clipboardData || window.clipboardData,
								n = null == n ? void 0 : n.items;
							return (
								n &&
									!xo()(n).some(function (e) {
										return "string" === e.kind && "text/rtf" === e.type;
									}) &&
									(n = es(n)) &&
									(t.preventDefault(), Yi(s.eventEmitter, n, t.type)),
								!1
							);
						},
						keyup: function (e, t) {
							return s.eventEmitter.emit("keyup", s.editorType, t), !1;
						},
						scroll: function () {
							return s.eventEmitter.emit("scroll", "editor"), !0;
						}
					}
				});
			}),
			(_e.prototype.createCommands = function () {
				return this.specs.commands(this.view, Pp());
			}),
			(_e.prototype.getHTML = function () {
				return Gi(this.view.dom.innerHTML);
			}),
			(_e.prototype.getModel = function () {
				return this.view.state.doc;
			}),
			(_e.prototype.getSelection = function () {
				var e = this.view.state.selection;
				return [e.from, e.to];
			}),
			(_e.prototype.getSchema = function () {
				return this.view.state.schema;
			}),
			(_e.prototype.replaceSelection = function (e, t, n) {
				var r = this.view.state,
					o = r.schema,
					r = r.tr,
					e = e.split("\n").map(function (e) {
						return ri(o, Mi(e, o));
					}),
					e = new Ke(Je.from(e), 1, 1),
					t = Pt()(t) && Pt()(n) ? r.replaceRange(t, n, e) : r.replaceSelection(e);
				this.view.dispatch(t), this.focus();
			}),
			(_e.prototype.deleteSelection = function (e, t) {
				var n = this.view.state.tr,
					e = Pt()(e) && Pt()(t) ? n.deleteRange(e, t) : n.deleteSelection();
				this.view.dispatch(e.scrollIntoView());
			}),
			(_e.prototype.getSelectedText = function (e, t) {
				var n = this.view.state,
					r = n.doc,
					n = n.selection,
					o = n.from,
					n = n.to;
				return Pt()(e) && Pt()(t) && ((o = e), (n = t)), r.textBetween(o, n, "\n");
			}),
			(_e.prototype.setModel = function (e, t) {
				void 0 === t && (t = !1);
				var n = this.view.state,
					r = n.tr;
				this.view.dispatch(r.replaceWith(0, n.doc.content.size, e)),
					t && this.moveCursorToEnd(!0);
			}),
			(_e.prototype.setSelection = function (e, t) {
				var n = this.view.state.tr,
					e = Se(n, e, (t = void 0 === t ? e : t));
				this.view.dispatch(n.setSelection(e).scrollIntoView());
			}),
			(_e.prototype.addWidget = function (e, t, n) {
				var r = this.view,
					o = r.dispatch,
					r = r.state;
				o(
					r.tr.setMeta("widget", {
						pos: null != n ? n : r.selection.to,
						node: e,
						style: t
					})
				);
			}),
			(_e.prototype.replaceWithWidget = function (e, t, n) {
				var r = this.view.state,
					o = r.tr,
					n = Mi(n, r.schema);
				this.view.dispatch(o.replaceWith(e, t, n));
			}),
			(_e.prototype.getRangeInfoOfNode = function (e) {
				var i,
					t = this.view.state,
					n = t.doc,
					t = t.selection,
					s = e ? n.resolve(e) : t.$from,
					n = s.marks(),
					e = s.node(),
					a = s.start(),
					l = s.end(),
					t = e.type.name;
				return (
					(!n.length && "paragraph" !== t) ||
						((i = n[n.length - 1]),
						(t = i ? i.type.name : "text"),
						e.forEach(function (e, t) {
							var n = e.isText,
								r = e.nodeSize,
								o = s.pos - a;
							n &&
								t <= o &&
								o <= t + r &&
								(!(n = e.marks).length || Zt(n, i)) &&
								(l = (a += t) + r);
						})),
					{ range: [a, l], type: t }
				);
			});
		var bm = _e,
			ql = ye(404),
			wm = ye.n(ql),
			km = [
				"afterPreviewRender",
				"updatePreview",
				"changeMode",
				"needChangeMode",
				"command",
				"changePreviewStyle",
				"changePreviewTabPreview",
				"changePreviewTabWrite",
				"scroll",
				"contextmenu",
				"show",
				"hide",
				"changeLanguage",
				"changeToolbarState",
				"toggleScrollSync",
				"mixinTableOffsetMapPrototype",
				"setFocusedNode",
				"removePopupWidget",
				"query",
				"openPopup",
				"closePopup",
				"addImageBlobHook",
				"beforePreviewRender",
				"beforeConvertWysiwygToMarkdown",
				"load",
				"loadUI",
				"change",
				"caretChange",
				"destroy",
				"focus",
				"blur",
				"keydown",
				"keyup"
			];
		function xm() {
			var t = this;
			(this.events = new rh()),
				(this.eventTypes = km.reduce(function (e, t) {
					return we(we({}, e), { type: t });
				}, {})),
				(this.hold = !1),
				km.forEach(function (e) {
					t.addEventType(e);
				});
		}
		(xm.prototype.listen = function (e, t) {
			var e = this.getTypeInfo(e),
				n = this.events.get(e.type) || [];
			if (!this.hasEventType(e.type)) throw new Error("There is no event type " + e.type);
			e.namespace && (t.namespace = e.namespace), n.push(t), this.events.set(e.type, n);
		}),
			(xm.prototype.emit = function (e) {
				for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				var e = this.getTypeInfo(e),
					e = this.events.get(e.type),
					r = [];
				return (
					!this.hold &&
						e &&
						e.forEach(function (e) {
							e = e.apply(void 0, t);
							Bt()(e) || r.push(e);
						}),
					r
				);
			}),
			(xm.prototype.emitReduce = function (e, t) {
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				e = this.events.get(e);
				return (
					!this.hold &&
						e &&
						e.forEach(function (e) {
							e = e.apply(void 0, nt([t], n));
							wm()(e) || (t = e);
						}),
					t
				);
			}),
			(xm.prototype.getTypeInfo = function (e) {
				e = e.split(".");
				return { type: e[0], namespace: e[1] };
			}),
			(xm.prototype.hasEventType = function (e) {
				return !Bt()(this.eventTypes[this.getTypeInfo(e).type]);
			}),
			(xm.prototype.addEventType = function (e) {
				if (this.hasEventType(e)) throw new Error("There is already have event type " + e);
				this.eventTypes[e] = e;
			}),
			(xm.prototype.removeEventHandler = function (e, t) {
				var n = this,
					e = this.getTypeInfo(e),
					r = e.type,
					o = e.namespace;
				r && t
					? this.removeEventHandlerWithHandler(r, t)
					: r && !o
						? this.events.delete(r)
						: !r && o
							? this.events.forEach(function (e, t) {
									n.removeEventHandlerWithTypeInfo(t, o);
								})
							: r && o && this.removeEventHandlerWithTypeInfo(r, o);
			}),
			(xm.prototype.removeEventHandlerWithHandler = function (e, t) {
				var n,
					e = this.events.get(e);
				e && ((n = e.indexOf(t)), 0 <= e.indexOf(t)) && e.splice(n, 1);
			}),
			(xm.prototype.removeEventHandlerWithTypeInfo = function (e, t) {
				var n = [],
					r = this.events.get(e);
				r &&
					(r.map(function (e) {
						return e.namespace !== t && n.push(e), null;
					}),
					this.events.set(e, n));
			}),
			(xm.prototype.getEvents = function () {
				return this.events;
			}),
			(xm.prototype.holdEventInvoke = function (e) {
				(this.hold = !0), e(), (this.hold = !1);
			});
		var Cm = xm;
		function Tm(e, t, n, r) {
			(this.eventEmitter = e),
				(this.mdCommands = t),
				(this.wwCommands = n),
				(this.getEditorType = r),
				this.initEvent();
		}
		(Tm.prototype.initEvent = function () {
			var n = this;
			this.eventEmitter.listen("command", function (e, t) {
				n.exec(e, t);
			});
		}),
			(Tm.prototype.addCommand = function (e, t, n) {
				"markdown" === e ? (this.mdCommands[t] = n) : (this.wwCommands[t] = n);
			}),
			(Tm.prototype.deleteCommand = function (e, t) {
				"markdown" === e ? delete this.mdCommands[t] : delete this.wwCommands[t];
			}),
			(Tm.prototype.exec = function (e, t) {
				("markdown" === this.getEditorType() ? this.mdCommands : this.wwCommands)[e](t);
			});
		var Mm = Tm;
		function Sm(e) {
			return "\n" === e[e.length - 1] ? e.slice(0, e.length - 1) : e;
		}
		function Em(e, t) {
			var n,
				e = e.schema,
				r = t.literal.match(Ri);
			return !(
				!r ||
				((n = r[1]), (r = r[3]), (n = (n || r).toLowerCase()), "htmlInline" !== t.type) ||
				(!e.marks[n] && !e.nodes[n])
			);
		}
		function Nm(e) {
			return Zt(["text", "strong", "emph", "strike", "image", "link", "code"], e.type);
		}
		function Om(e) {
			return "softbreak" === (null == e ? void 0 : e.type);
		}
		function Dm(e) {
			e = "htmlInline" === e.type && e.literal.match(Ri);
			if (e) {
				var t = e[1],
					e = e[3],
					t = t || e;
				if (t) return Zt(["ul", "ol", "li"], t.toLowerCase());
			}
		}
		function Am(e) {
			for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
			var r = document.createElement("div"),
				o = ((r.innerHTML = Yd(e)), r.firstChild);
			return t.map(function (e) {
				return o.getAttribute(e) || "";
			});
		}
		(Lm = {
			"b, strong": function (e, t, n) {
				var r = e.schema.marks.strong;
				n ? e.openMark(r.create({ rawHTML: n })) : e.closeMark(r);
			},
			"i, em": function (e, t, n) {
				var r = e.schema.marks.emph;
				n ? e.openMark(r.create({ rawHTML: n })) : e.closeMark(r);
			},
			"s, del": function (e, t, n) {
				var r = e.schema.marks.strike;
				n ? e.openMark(r.create({ rawHTML: n })) : e.closeMark(r);
			},
			code: function (e, t, n) {
				var r = e.schema.marks.code;
				n ? e.openMark(r.create({ rawHTML: n })) : e.closeMark(r);
			},
			a: function (e, t, n) {
				var t = t.literal,
					r = e.schema.marks.link;
				n
					? ((t = Am(t, "href")[0]), e.openMark(r.create({ linkUrl: t, rawHTML: n })))
					: e.closeMark(r);
			},
			img: function (e, t, n) {
				var r,
					o,
					t = t.literal;
				n &&
					((r = (t = Am(t, "src", "alt"))[0]),
					(o = e.schema.nodes.image),
					e.addNode(o, we({ rawHTML: n, imageUrl: r }, (e = t[1]) && { altText: e })));
			},
			hr: function (e, t, n) {
				e.addNode(e.schema.nodes.thematicBreak, { rawHTML: n });
			},
			br: function (e, t) {
				var n = e.schema.nodes.paragraph,
					r = t.parent,
					o = t.prev,
					t = t.next;
				"paragraph" === (null == r ? void 0 : r.type)
					? (Om(o) && e.openNode(n),
						Om(t) ? e.closeNode() : t && (e.closeNode(), e.openNode(n)))
					: "tableCell" === (null == r ? void 0 : r.type) &&
						(o && (Nm(o) || Em(e, o)) && e.closeNode(), t) &&
						(Nm(t) || Em(e, t)) &&
						e.openNode(n);
			},
			pre: function (e, t, n) {
				var r = document.createElement("div"),
					t =
						((r.innerHTML = t.literal),
						null == (r = null == (t = r.firstChild) ? void 0 : t.firstChild)
							? void 0
							: r.textContent);
				e.openNode(e.schema.nodes.codeBlock, { rawHTML: n }),
					e.addText(Sm(t)),
					e.closeNode();
			},
			"ul, ol": function (e, t, n) {
				var r, o, i;
				"tableCell" === t.parent.type &&
					((i = (r = e.schema.nodes).bulletList),
					(o = r.paragraph),
					(i = "ul" === n ? i : r.orderedList),
					n
						? (t.prev && !Dm(t.prev) && e.closeNode(), e.openNode(i, { rawHTML: n }))
						: (e.closeNode(), t.next && !Dm(t.next) && e.openNode(o)));
			},
			li: function (e, t, n) {
				var r, o, i;
				"tableCell" === (null == (o = t.parent) ? void 0 : o.type) &&
					((r = (o = e.schema.nodes).listItem),
					(o = o.paragraph),
					n
						? ((i = (i = t).literal),
							(i = {
								task: /data-task/.test(i),
								checked: /data-task-checked/.test(i)
							}),
							t.prev && !Dm(t.prev) && e.closeNode(),
							e.openNode(r, we({ rawHTML: n }, i)),
							t.next && !Dm(t.next) && e.openNode(o))
						: (t.prev && !Dm(t.prev) && e.closeNode(), e.closeNode()));
			}
		}),
			(Im = {}),
			Object.keys(Lm).forEach(function (t) {
				t.split(", ").forEach(function (e) {
					e = e.toLowerCase();
					Im[e] = Lm[t];
				});
			});
		var Lm,
			Im,
			Rm = Im;
		function Pm(e) {
			return "htmlInline" === e.type && Pi.test(e.literal);
		}
		var Bm = {
			text: function (e, t) {
				e.addText(t.literal || "");
			},
			paragraph: function (e, t, n, r) {
				n.entering
					? ((n = e.schema.nodes.paragraph),
						"paragraph" === (null == (t = t.prev) ? void 0 : t.type) &&
							(e.openNode(n, r), e.closeNode()),
						e.openNode(n, r))
					: e.closeNode();
			},
			heading: function (e, t, n, r) {
				n.entering
					? ((n = t.level),
						e.openNode(
							e.schema.nodes.heading,
							we({ level: n, headingType: t.headingType }, r)
						))
					: e.closeNode();
			},
			codeBlock: function (e, t, n) {
				var r = e.schema.nodes.codeBlock,
					o = t.info,
					t = t.literal;
				e.openNode(r, we({ language: o }, n)), e.addText(Sm(t || "")), e.closeNode();
			},
			list: function (e, t, n, r) {
				var o, i;
				n.entering
					? ((o = (n = e.schema.nodes).bulletList),
						(n = n.orderedList),
						(i = (t = t.listData).type),
						(t = t.start),
						"bullet" === i ? e.openNode(o, r) : e.openNode(n, we({ order: t }, r)))
					: e.closeNode();
			},
			item: function (e, t, n, r) {
				var n = n.entering,
					o = e.schema.nodes.listItem,
					t = t.listData,
					i = t.task,
					t = t.checked;
				n
					? ((n = we(we(we({}, i && { task: i }), t && { checked: t }), r)),
						e.openNode(o, n))
					: e.closeNode();
			},
			blockQuote: function (e, t, n, r) {
				n.entering ? e.openNode(e.schema.nodes.blockQuote, r) : e.closeNode();
			},
			image: function (e, t, n, r) {
				var o = n.entering,
					n = n.skipChildren,
					i = e.schema.nodes.image,
					s = t.destination,
					t = t.firstChild;
				o && n && n(),
					e.addNode(i, we(we({ imageUrl: s }, t && { altText: t.literal }), r));
			},
			thematicBreak: function (e, t, n, r) {
				e.addNode(e.schema.nodes.thematicBreak, r);
			},
			strong: function (e, t, n, r) {
				var n = n.entering,
					o = e.schema.marks.strong;
				n ? e.openMark(o.create(r)) : e.closeMark(o);
			},
			emph: function (e, t, n, r) {
				var n = n.entering,
					o = e.schema.marks.emph;
				n ? e.openMark(o.create(r)) : e.closeMark(o);
			},
			link: function (e, t, n, r) {
				var n = n.entering,
					o = e.schema.marks.link,
					i = t.destination;
				n
					? ((n = we({ linkUrl: i, title: t.title }, r)), e.openMark(o.create(n)))
					: e.closeMark(o);
			},
			softbreak: function (e, t) {
				var n;
				"paragraph" === t.parent.type &&
					((n = t.prev), (t = t.next), n && !Pm(n) && e.closeNode(), t) &&
					!Pm(t) &&
					e.openNode(e.schema.nodes.paragraph);
			},
			table: function (e, t, n, r) {
				n.entering ? e.openNode(e.schema.nodes.table, r) : e.closeNode();
			},
			tableHead: function (e, t, n, r) {
				n.entering ? e.openNode(e.schema.nodes.tableHead, r) : e.closeNode();
			},
			tableBody: function (e, t, n, r) {
				n.entering ? e.openNode(e.schema.nodes.tableBody, r) : e.closeNode();
			},
			tableRow: function (e, t, n, r) {
				n.entering ? e.openNode(e.schema.nodes.tableRow, r) : e.closeNode();
			},
			tableCell: function (t, e, n) {
				var r,
					o,
					i,
					s,
					n = n.entering;
				e.ignored ||
					((r = function (e) {
						return e && (Nm(e) || Em(t, e));
					}),
					n
						? ((i = (n = t.schema.nodes).tableHeadCell),
							(o = n.paragraph),
							(i = "tableHead" === (s = e.parent.parent).type ? i : n.tableBodyCell),
							(n = (s.parent.columns[e.startIdx] || {}).align),
							(s = we({}, e.attrs)),
							n && (s.align = n),
							t.openNode(i, s),
							r(e.firstChild) && t.openNode(o))
						: (r(e.lastChild) && t.closeNode(), t.closeNode()));
			},
			strike: function (e, t, n, r) {
				var n = n.entering,
					o = e.schema.marks.strike;
				n ? e.openMark(o.create(r)) : e.closeMark(o);
			},
			code: function (e, t, n, r) {
				var o = e.schema.marks.code;
				e.openMark(o.create(r)), e.addText(Sm(t.literal || "")), e.closeMark(o);
			},
			customBlock: function (e, t) {
				var n = e.schema.nodes,
					r = n.customBlock,
					n = n.paragraph,
					o = t.info,
					i = t.literal;
				e.openNode(r, { info: o }),
					e.addText(Sm(i || "")),
					e.closeNode(),
					t.next || (e.openNode(n), e.closeNode());
			},
			frontMatter: function (e, t) {
				e.openNode(e.schema.nodes.frontMatter), e.addText(t.literal), e.closeNode();
			},
			htmlInline: function (e, t) {
				var n = t.literal,
					r = n.match(Ri),
					o = r[1],
					r = (o || r[3]).toLowerCase(),
					i = e.schema.marks[r],
					n = Yd(n);
				null != i && i.spec.attrs.htmlInline
					? o
						? ((n = tp(n)), e.openMark(i.create({ htmlAttrs: n })))
						: e.closeMark(i)
					: (n = Rm[r]) && n(e, t, o);
			},
			htmlBlock: function (e, t) {
				var n,
					r,
					o,
					i = t.literal,
					s = document.createElement("div");
				Bi.test(i)
					? (e.openNode(e.schema.nodes.htmlComment), e.addText(t.literal), e.closeNode())
					: ((n = ((n = i.match(Ri))[1] || n[3]).toLowerCase()),
						(r = e.schema.nodes[n]),
						(i = Yd(i)),
						null != r && r.spec.attrs.htmlBlock
							? ((o = tp(i)),
								(t = ep(t, n)),
								e.addNode(r, { htmlAttrs: o, childrenHTML: t }))
							: ((s.innerHTML = i),
								(function n(e) {
									xo()(e.childNodes).forEach(function (e) {
										var t;
										qi(e) &&
											((t = e.nodeName.toLowerCase()),
											e.setAttribute("data-raw-html", t),
											e.childNodes) &&
											n(e);
									});
								})(s),
								e.convertByDOMParser(s)));
			},
			customInline: function (e, t, n) {
				var r = n.entering,
					n = n.skipChildren,
					o = t.info,
					i = t.firstChild,
					s = e.schema;
				-1 !== o.indexOf("widget") && r
					? ((t = Si(t)), n(), e.addNode(s.nodes.widget, { info: o }, [s.text(xi(o, t))]))
					: ((n = "$$"), r && (n += i ? o + " " : o), e.addText(n));
			}
		};
		function Fm(e, t) {
			(this.schema = e),
				(this.convertors = t),
				(this.stack = [{ type: this.schema.topNodeType, attrs: null, content: [] }]),
				(this.marks = Ge.none);
		}
		(Fm.prototype.top = function () {
			return sn(this.stack);
		}),
			(Fm.prototype.push = function (e) {
				this.stack.length && this.top().content.push(e);
			}),
			(Fm.prototype.addText = function (e) {
				var t, n, r;
				e &&
					((n = sn((t = this.top().content))),
					(e = this.schema.text(e, this.marks)),
					(n =
						n &&
						((r = e), !!((n = n).isText && r.isText && Ge.sameSet(n.marks, r.marks))) &&
						n.withText(n.text + r.text))
						? (t[t.length - 1] = n)
						: t.push(e));
			}),
			(Fm.prototype.openMark = function (e) {
				this.marks = e.addToSet(this.marks);
			}),
			(Fm.prototype.closeMark = function (e) {
				this.marks = e.removeFromSet(this.marks);
			}),
			(Fm.prototype.addNode = function (e, t, n) {
				e = e.createAndFill(t, n, this.marks);
				return e ? (this.push(e), e) : null;
			}),
			(Fm.prototype.openNode = function (e, t) {
				this.stack.push({ type: e, attrs: t, content: [] });
			}),
			(Fm.prototype.closeNode = function () {
				this.marks.length && (this.marks = Ge.none);
				var e = this.stack.pop(),
					t = e.type;
				return this.addNode(t, e.attrs, e.content);
			}),
			(Fm.prototype.convertByDOMParser = function (e) {
				var t = this;
				Zy.fromSchema(this.schema)
					.parse(e)
					.content.forEach(function (e) {
						return t.push(e);
					});
			}),
			(Fm.prototype.closeUnmatchedHTMLInline = function (e, t) {
				var n;
				if (!t && "htmlInline" !== e.type)
					for (var r = this.stack.length - 1; 0 <= r; --r) {
						var o = this.stack[r];
						if (null == (n = o.attrs) || !n.rawHTML) break;
						o.content.length ? this.closeNode() : this.stack.pop();
					}
			}),
			(Fm.prototype.convert = function (e, i) {
				for (
					var s = e.walker(),
						a = s.next(),
						t = function () {
							var e,
								t = a.node,
								n = a.entering,
								r = l.convertors[t.type],
								o = !1;
							r &&
								((e = {
									entering: n,
									leaf: !(e => {
										switch (e.type) {
											case "document":
											case "blockQuote":
											case "list":
											case "item":
											case "paragraph":
											case "heading":
											case "emph":
											case "strong":
											case "strike":
											case "link":
											case "image":
											case "table":
											case "tableHead":
											case "tableBody":
											case "tableRow":
											case "tableCell":
											case "tableDelimRow":
											case "customInline":
												return 1;
											default:
												return;
										}
									})(t),
									getChildrenText: vi,
									options: {
										gfm: !0,
										nodeId: !1,
										tagFilter: !1,
										softbreak: "\n"
									},
									skipChildren: function () {
										o = !0;
									}
								}),
								l.closeUnmatchedHTMLInline(t, n),
								r(l, t, e),
								(null == i ? void 0 : i.node) === t) &&
								((n =
									l.stack.reduce(function (e, t) {
										return (
											e +
											t.content.reduce(function (e, t) {
												return e + t.nodeSize;
											}, 0)
										);
									}, 0) + 1),
								i.setMappedPos(n)),
								o && (s.resumeAt(t, !1), s.next()),
								(a = s.next());
						},
						l = this;
					a;

				)
					t();
			}),
			(Fm.prototype.convertNode = function (e, t) {
				return this.convert(e, t), this.stack.length ? this.closeNode() : null;
			});
		var Hm = Fm,
			zm = {
				text: function (e, t) {
					var t = t.node,
						n = null != (n = t.text) ? n : "";
					(t.marks || []).some(function (e) {
						return "link" === e.type.name;
					})
						? e.text(tn(n), !1)
						: e.text(n);
				},
				paragraph: function (e, t) {
					var n,
						r,
						o,
						i = t.node,
						s = t.parent,
						t = t.index,
						t = void 0 === t ? 0 : t;
					e.stopNewline
						? e.convertInline(i)
						: ((r = (r = !(n = 0 === t) && s.child(t - 1)) && 0 === r.childCount),
							(t =
								(t = t < s.childCount - 1 && s.child(t + 1)) &&
								"paragraph" === t.type.name),
							(o = 0 === i.childCount) && r
								? e.write("<br>\n")
								: !o || r || n
									? (e.convertInline(i), t ? e.write("\n") : e.closeBlock(i))
									: ("listItem" === (null == s ? void 0 : s.type.name) &&
											((o = e.getDelim()),
											e.setDelim(""),
											e.write("<br>"),
											e.setDelim(o)),
										e.write("\n")));
				},
				heading: function (e, t, n) {
					(t = t.node), (n = n.delim);
					"atx" === t.attrs.headingType
						? (e.write(n + " "), e.convertInline(t))
						: (e.convertInline(t), e.ensureNewLine(), e.write(n)),
						e.closeBlock(t);
				},
				codeBlock: function (e, t, n) {
					var t = t.node,
						r = n.delim,
						n = n.text,
						o = r[0],
						r = r[1];
					e.write(o),
						e.ensureNewLine(),
						e.text(n, !1),
						e.ensureNewLine(),
						e.write(r),
						e.closeBlock(t);
				},
				blockQuote: function (e, t, n) {
					var r = t.node,
						t = t.parent,
						n = n.delim;
					(null == t ? void 0 : t.type.name) === r.type.name && e.flushClose(1),
						e.wrapBlock(n, null, r, function () {
							return e.convertNode(r);
						});
				},
				bulletList: function (e, t, n) {
					var t = t.node,
						r = n.delim;
					e.convertList(t, en(" ", 4), function () {
						return r + " ";
					});
				},
				orderedList: function (e, t) {
					var t = t.node,
						n = t.attrs.order || 1;
					e.convertList(t, en(" ", 4), function (e) {
						return String(n + e) + ". ";
					});
				},
				listItem: function (e, t) {
					var t = t.node,
						n = t.attrs;
					n.task && e.write("[" + (n.checked ? "x" : " ") + "] "), e.convertNode(t);
				},
				image: function (e, t, n) {
					n = n.attrs;
					e.write(
						"![" +
							(null == n ? void 0 : n.altText) +
							"](" +
							(null == n ? void 0 : n.imageUrl) +
							")"
					);
				},
				thematicBreak: function (e, t, n) {
					(t = t.node), (n = n.delim);
					e.write(n), e.closeBlock(t);
				},
				table: function (e, t) {
					t = t.node;
					e.convertNode(t), e.closeBlock(t);
				},
				tableHead: function (e, t, n) {
					var t = t.node,
						n = n.delim,
						r = t.firstChild,
						o = (e.convertNode(t), null != n ? n : "");
					!n &&
						r &&
						r.forEach(function (e) {
							var t,
								n,
								r = e.textContent,
								e =
									((r = r),
									(e = e.attrs.align),
									(r = r.length),
									(n = t = ""),
									"left" === e
										? ((t = ":"), --r)
										: "right" === e
											? ((n = ":"), --r)
											: "center" === e && ((n = t = ":"), (r -= 2)),
									"" + t + en("-", Math.max(r, 3)) + n);
							o += "| " + e + " ";
						}),
						e.write(o + "|"),
						e.ensureNewLine();
				},
				tableBody: function (e, t) {
					t = t.node;
					e.convertNode(t);
				},
				tableRow: function (e, t) {
					t = t.node;
					e.convertNode(t), e.write("|"), e.ensureNewLine();
				},
				tableHeadCell: function (e, t, n) {
					(t = t.node), (n = n.delim);
					e.write(void 0 === n ? "| " : n), e.convertTableCell(t), e.write(" ");
				},
				tableBodyCell: function (e, t, n) {
					(t = t.node), (n = n.delim);
					e.write(void 0 === n ? "| " : n), e.convertTableCell(t), e.write(" ");
				},
				customBlock: function (e, t, n) {
					var t = t.node,
						r = n.delim,
						n = n.text,
						o = r[0],
						r = r[1];
					e.write(o),
						e.ensureNewLine(),
						e.text(n, !1),
						e.ensureNewLine(),
						e.write(r),
						e.closeBlock(t);
				},
				frontMatter: function (e, t, n) {
					(t = t.node), (n = n.text);
					e.text(n, !1), e.closeBlock(t);
				},
				widget: function (e, t, n) {
					n = n.text;
					e.write(n);
				},
				html: function (e, t, n) {
					(t = t.node), (n = n.text);
					e.write(n), t.attrs.htmlBlock && e.closeBlock(t);
				},
				htmlComment: function (e, t, n) {
					(t = t.node), (n = n.text);
					e.write(n), e.closeBlock(t);
				}
			};
		function qm(e, t) {
			var n = e.text,
				r = /`+/g,
				o = 0;
			if (e.isText && n)
				for (var i = r.exec(n); i; ) (o = Math.max(o, i[0].length)), (i = r.exec(n));
			for (var s = 0 < o && 0 < t ? " `" : "`", a = 0; a < o; a += 1) s += "`";
			return 0 < o && t < 0 && (s += " "), s;
		}
		function Vm(e) {
			return e ? ["<" + e + ">", "</" + e + ">"] : null;
		}
		function jm(e) {
			return e ? "<" + e + ">" : null;
		}
		function $m(e) {
			return e ? "</" + e + ">" : null;
		}
		var _m = {
				heading: function (e) {
					var e = e.node.attrs,
						t = e.level,
						n = en("#", t);
					return {
						delim: (n = "setext" === e.headingType ? (1 === t ? "===" : "---") : n),
						rawHTML: Vm(e.rawHTML)
					};
				},
				codeBlock: function (e) {
					var e = e.node,
						t = e.attrs;
					return {
						delim: ["```" + (t.language || ""), "```"],
						rawHTML: Vm(t.rawHTML),
						text: e.textContent
					};
				},
				blockQuote: function (e) {
					return { delim: "> ", rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				bulletList: function (e, t) {
					(e = e.node), (t = t.inTable), (e = e.attrs.rawHTML);
					return { delim: "*", rawHTML: Vm((e = t ? e || "ul" : e)) };
				},
				orderedList: function (e, t) {
					(e = e.node), (t = t.inTable), (e = e.attrs.rawHTML);
					return { rawHTML: Vm((e = t ? e || "ol" : e)) };
				},
				listItem: function (e, t) {
					var e = e.node,
						t = t.inTable,
						n = e.attrs,
						r = n.task,
						n = n.checked,
						e = e.attrs.rawHTML;
					return {
						rawHTML: (e = t ? e || "li" : e)
							? [
									"<" +
										e +
										(r
											? ' class="task-list-item' + (n ? " checked" : "") + '"'
											: "") +
										(r ? " data-task" + (n ? " data-task-checked" : "") : "") +
										">",
									"</" + e + ">"
								]
							: null
					};
				},
				table: function (e) {
					return { rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				tableHead: function (e) {
					return { rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				tableBody: function (e) {
					return { rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				tableRow: function (e) {
					return { rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				tableHeadCell: function (e) {
					return { rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				tableBodyCell: function (e) {
					return { rawHTML: Vm(e.node.attrs.rawHTML) };
				},
				image: function (e) {
					var e = e.node.attrs,
						t = e.rawHTML,
						n = e.altText,
						e = e.imageUrl.replace(/&amp;/g, "&"),
						r = n ? ' alt="' + Kt(n) + '"' : "";
					return {
						rawHTML: t ? "<" + t + ' src="' + Kt(e) + '"' + r + ">" : null,
						attrs: { altText: tn(n || ""), imageUrl: e }
					};
				},
				thematicBreak: function (e) {
					return { delim: "***", rawHTML: jm(e.node.attrs.rawHTML) };
				},
				customBlock: function (e) {
					e = e.node;
					return { delim: ["$$" + e.attrs.info, "$$"], text: e.textContent };
				},
				frontMatter: function (e) {
					return { text: e.node.textContent };
				},
				widget: function (e) {
					return { text: e.node.textContent };
				},
				strong: function (e, t) {
					(e = e.node), (t = t.entering), (e = e.attrs.rawHTML);
					return { delim: "**", rawHTML: (t ? jm : $m)(e) };
				},
				emph: function (e, t) {
					(e = e.node), (t = t.entering), (e = e.attrs.rawHTML);
					return { delim: "*", rawHTML: (t ? jm : $m)(e) };
				},
				strike: function (e, t) {
					(e = e.node), (t = t.entering), (e = e.attrs.rawHTML);
					return { delim: "~~", rawHTML: (t ? jm : $m)(e) };
				},
				link: function (e, t) {
					var e = e.node,
						t = t.entering,
						e = e.attrs,
						n = e.title,
						r = e.rawHTML,
						e = e.linkUrl.replace(/&amp;/g, "&"),
						o = n ? ' title="' + Kt(n) + '"' : "";
					return t
						? {
								delim: "[",
								rawHTML: r ? "<" + r + ' href="' + Kt(e) + '"' + o + ">" : null
							}
						: {
								delim:
									"](" +
									e +
									(n
										? " " +
											((t = tn(n)),
											(o =
												-1 === t.indexOf('"')
													? '""'
													: -1 === t.indexOf("'")
														? "''"
														: "()")[0] +
												t +
												o[1])
										: "") +
									")",
								rawHTML: $m(r)
							};
				},
				code: function (e, t) {
					var n = e.node,
						r = e.parent,
						e = e.index,
						e = void 0 === e ? 0 : e,
						t = t.entering;
					return {
						delim: t ? qm(r.child(e), -1) : qm(r.child(e - 1), 1),
						rawHTML: (t ? jm : $m)(n.attrs.rawHTML)
					};
				},
				htmlComment: function (e) {
					return { text: e.node.textContent };
				},
				html: function (e, t) {
					var e = e.node,
						t = t.entering,
						n = e.type.name,
						r = e.attrs.htmlAttrs,
						o = "<" + n,
						n = "</" + n + ">";
					return (
						Object.keys(r).forEach(function (e) {
							o += " " + e + '="' + r[e].replace(/"/g, "'") + '"';
						}),
						(o += ">"),
						e.attrs.htmlInline
							? { rawHTML: t ? o : n }
							: { text: "" + o + e.attrs.childrenHTML + n }
					);
				}
			},
			Um = {
				strong: { mixable: !0, removedEnclosingWhitespace: !0 },
				emph: { mixable: !0, removedEnclosingWhitespace: !0 },
				strike: { mixable: !0, removedEnclosingWhitespace: !0 },
				code: { escape: !1 },
				link: null,
				html: null
			};
		function Wm(d) {
			var e = {};
			return (
				Object.keys(zm).forEach(function (u) {
					e[u] = function (e, t) {
						var n, r, o, i, s, a, l, c;
						zm[u] &&
							((l = d[u]),
							(l = l ? l(t, { inTable: e.inTable }) : {}),
							(n = u),
							(t = (e = { state: e, nodeInfo: t, params: l }).state),
							(l = e.nodeInfo),
							(c = (e = e.params).rawHTML)
								? -1 < th()(n, ["heading", "codeBlock"])
									? ((o = t),
										(i = l.node),
										(a = (s = c)[0]),
										(s = c[1]),
										o.write(a),
										o.convertInline(i),
										o.write(s))
									: -1 < th()(n, ["image", "thematicBreak"])
										? t.write(c)
										: ((a = t),
											(i = c),
											(s = (o = l).node),
											(o = o.parent),
											(r = c[0]),
											(i = c[1]),
											(a.stopNewline = !0),
											a.write(r),
											a.convertNode(s),
											a.write(i),
											"doc" === (null == o ? void 0 : o.type.name) &&
												(a.closeBlock(s), (a.stopNewline = !1)))
								: zm[n](t, l, e));
					};
				}),
				e
			);
		}
		function Jm(t) {
			Object.keys(t).forEach(function (e) {
				var n = _m[e],
					r = t[e];
				(_m[e] = n
					? function (e, t) {
							return (
								(t.origin = function () {
									return n(e, t);
								}),
								r(e, t)
							);
						}
					: r),
					delete t[e];
			});
			var i,
				e,
				n = Wm(_m);
			return (
				(i = _m),
				(e = {}),
				Object.keys(Um).forEach(function (o) {
					e[o] = function (e, t) {
						var n = Um[o],
							r = i[o],
							r = r && e && !Bt()(t) ? r(e, { entering: t }) : {};
						return we(we({}, r), n);
					};
				}),
				{ nodeTypeConvertors: n, markTypeConvertors: e }
			);
		}
		function Gm(e) {
			var t = e.nodeTypeConvertors,
				e = e.markTypeConvertors;
			(this.nodeTypeConvertors = t),
				(this.markTypeConvertors = e),
				(this.delim = ""),
				(this.result = ""),
				(this.closed = !1),
				(this.tightList = !1),
				(this.stopNewline = !1),
				(this.inTable = !1);
		}
		(Gm.prototype.getMarkConvertor = function (e) {
			e = e.attrs.htmlInline ? "html" : e.type.name;
			return this.markTypeConvertors[e];
		}),
			(Gm.prototype.isInBlank = function () {
				return /(^|\n)$/.test(this.result);
			}),
			(Gm.prototype.markText = function (e, t, n, r) {
				var o = this.getMarkConvertor(e);
				return o
					? ((e = (o = o({ node: e, parent: n, index: r }, t)).delim), o.rawHTML || e)
					: "";
			}),
			(Gm.prototype.setDelim = function (e) {
				this.delim = e;
			}),
			(Gm.prototype.getDelim = function () {
				return this.delim;
			}),
			(Gm.prototype.flushClose = function (e) {
				if (!this.stopNewline && this.closed) {
					if ((this.isInBlank() || (this.result += "\n"), 1 < (e = e || 2))) {
						var t = this.delim,
							n = /\s+$/.exec(t);
						n && (t = t.slice(0, t.length - n[0].length));
						for (var r = 1; r < e; r += 1) this.result += t + "\n";
					}
					this.closed = !1;
				}
			}),
			(Gm.prototype.wrapBlock = function (e, t, n, r) {
				var o = this.getDelim();
				this.write(t || e),
					this.setDelim(this.getDelim() + e),
					r(),
					this.setDelim(o),
					this.closeBlock(n);
			}),
			(Gm.prototype.ensureNewLine = function () {
				this.isInBlank() || (this.result += "\n");
			}),
			(Gm.prototype.write = function (e) {
				void 0 === e && (e = ""),
					this.flushClose(),
					this.delim && this.isInBlank() && (this.result += this.delim),
					e && (this.result += e);
			}),
			(Gm.prototype.closeBlock = function (e) {
				this.closed = e;
			}),
			(Gm.prototype.text = function (e, t) {
				void 0 === t && (t = !0);
				for (var n = e.split("\n"), r = 0; r < n.length; r += 1)
					this.write(),
						(this.result += t ? nn(n[r]) : n[r]),
						r !== n.length - 1 && (this.result += "\n");
			}),
			(Gm.prototype.convertBlock = function (e, t, n) {
				var r = e.type.name,
					r = this.nodeTypeConvertors[r],
					t = { node: e, parent: t, index: n };
				e.attrs.htmlBlock ? this.nodeTypeConvertors.html(this, t) : r && r(this, t);
			}),
			(Gm.prototype.convertInline = function (m) {
				function e(e, t, n) {
					var r = e ? e.marks : [],
						o = y;
					(y = ""),
						e &&
							e.isText &&
							r.some(function (e) {
								(e = g.getMarkConvertor(e)), (e = e && e());
								return e && e.removedEnclosingWhitespace;
							}) &&
							e &&
							e.text &&
							((i = (a = /^(\s*)(.*?)(\s*)$/m.exec(e.text))[1]),
							(u = a[2]),
							(o += i),
							(y = a = a[3]),
							(!i && !a) || (e = u ? e.withText(u) : null) || (r = v));
					for (
						var i = r.length && sn(r),
							s = (a = i && g.getMarkConvertor(i)) && a(),
							a = s && !1 === s.escape,
							l = r.length - (a ? 1 : 0),
							c = 0;
						c < l;
						c += 1
					) {
						var u = r[c];
						if (s && !s.mixable) break;
						for (var d = 0; d < v.length; d += 1) {
							var p = v[d];
							if (s && !s.mixable) break;
							if (u.eq(p)) {
								d < c
									? (r = r
											.slice(0, d)
											.concat(u)
											.concat(r.slice(d, c))
											.concat(r.slice(c + 1, l)))
									: c < d &&
										(r = r
											.slice(0, c)
											.concat(r.slice(c + 1, d))
											.concat(u)
											.concat(r.slice(d, l)));
								break;
							}
						}
					}
					for (var h = 0; h < Math.min(v.length, l) && r[h].eq(v[h]); ) h += 1;
					for (; h < v.length; ) {
						var f = v.pop();
						f && g.text(g.markText(f, !1, m, n), !1);
					}
					if ((o && g.text(o), e)) {
						for (; v.length < l; ) {
							u = r[v.length];
							v.push(u), g.text(g.markText(u, !0, m, n), !1);
						}
						a && e.isText
							? g.text(
									g.markText(i, !0, m, n) + e.text + g.markText(i, !1, m, n + 1),
									!1
								)
							: g.convertBlock(e, m, n);
					}
				}
				var g = this,
					v = [],
					y = "";
				m.forEach(e), e(null, 0, m.childCount);
			}),
			(Gm.prototype.convertList = function (r, o, i) {
				var s = this,
					a =
						(this.closed && this.closed.type === r.type
							? this.flushClose(3)
							: this.tightList && this.flushClose(1),
						null == (e = r.attrs.tight) || e),
					e = this.tightList;
				(this.tightList = a),
					r.forEach(function (e, t, n) {
						n && a && s.flushClose(1),
							s.wrapBlock(o, i(n), r, function () {
								return s.convertBlock(e, r, n);
							});
					}),
					(this.tightList = e);
			}),
			(Gm.prototype.convertTableCell = function (r) {
				var o = this;
				(this.stopNewline = !0),
					(this.inTable = !0),
					r.forEach(function (e, t, n) {
						Zt(["bulletList", "orderedList"], e.type.name)
							? (o.convertBlock(e, r, n), (o.closed = !1))
							: (o.convertInline(e),
								n < r.childCount - 1 &&
									"paragraph" === r.child(n + 1).type.name &&
									o.write("<br>"));
					}),
					(this.stopNewline = !1),
					(this.inTable = !1);
			}),
			(Gm.prototype.convertNode = function (r, o) {
				var i = this;
				return (
					r.forEach(function (e, t, n) {
						i.convertBlock(e, r, n),
							(null == o ? void 0 : o.node) === e &&
								((n = i.result.split("\n")),
								o.setMappedPos([n.length, sn(n).length + 1]));
					}),
					this.result
				);
			});
		var Km = Gm;
		function Zm(e, t, n, r) {
			var a,
				o,
				l,
				i = this;
			(this.setMappedPos = function (e) {
				i.mappedPosWhenConverting = e;
			}),
				(this.schema = e),
				(this.eventEmitter = r),
				(this.focusedNode = null),
				(this.mappedPosWhenConverting = null),
				(this.toWwConvertors =
					((a = n),
					(e = Object.keys(a)),
					(o = we({}, Bm)),
					(l = new Jd({ gfm: !0, nodeId: !0, convertors: a }).getConvertors()),
					e.forEach(function (i) {
						var s = Bm[i];
						s &&
							!Zt(["htmlBlock", "htmlInline"], i) &&
							(o[i] = function (e, t, n) {
								n.origin = function () {
									return l[i](t, n, l);
								};
								var r,
									o = a[i](t, n);
								o &&
									(r = {
										htmlAttrs: (o = Array.isArray(o) ? o[0] : o).attributes,
										classNames: o.classNames
									}),
									s(e, t, n, r);
							});
					}),
					o)),
				(this.toMdConvertors = Jm(t || {})),
				this.eventEmitter.listen("setFocusedNode", function (e) {
					return (i.focusedNode = e);
				});
		}
		(Zm.prototype.getMappedPos = function () {
			return this.mappedPosWhenConverting;
		}),
			(Zm.prototype.getInfoForPosSync = function () {
				return { node: this.focusedNode, setMappedPos: this.setMappedPos };
			}),
			(Zm.prototype.toWysiwygModel = function (e) {
				return new Hm(this.schema, this.toWwConvertors).convertNode(
					e,
					this.getInfoForPosSync()
				);
			}),
			(Zm.prototype.toMarkdownText = function (e) {
				e = new Km(this.toMdConvertors).convertNode(e, this.getInfoForPosSync());
				return this.eventEmitter.emitReduce("beforeConvertWysiwygToMarkdown", e);
			});
		var Xm = Zm;
		function Qm(e) {
			var t = e.plugins,
				d = e.eventEmitter,
				p = e.usageStatistics,
				h = e.instance;
			return (
				d.listen("mixinTableOffsetMapPrototype", qp),
				(null != t ? t : []).reduce(
					function (e, t) {
						(n = (t = { plugin: t, eventEmitter: d, usageStatistics: p, instance: h })
							.plugin),
							(t = {
								eventEmitter: t.eventEmitter,
								usageStatistics: t.usageStatistics,
								instance: t.instance,
								pmState: {
									Plugin: b0,
									PluginKey: w0,
									Selection: Ze,
									TextSelection: Xe
								},
								pmView: { Decoration: B0, DecorationSet: Ye },
								pmModel: { Fragment: Je },
								pmRules: { InputRule: V0, inputRules: Uo, undoInputRule: fe },
								pmKeymap: { keymap: Lo },
								i18n: je
							});
						var n,
							r,
							o,
							i,
							s,
							a,
							l,
							c,
							u = Ni()(n) ? (0, n[0])(t, void 0 === (u = n[1]) ? {} : u) : n(t);
						if (u)
							return (
								(n = u.markdownParsers),
								(t = u.toMarkdownRenderers),
								(o = u.markdownPlugins),
								(i = u.wysiwygPlugins),
								(s = u.wysiwygNodeViews),
								(a = u.markdownCommands),
								(l = u.wysiwygCommands),
								(c = u.toolbarItems),
								(r = u.toHTMLRenderers) &&
									(e.toHTMLRenderers = ln(e.toHTMLRenderers, r)),
								t && (e.toMarkdownRenderers = ln(e.toMarkdownRenderers, t)),
								o && (e.mdPlugins = e.mdPlugins.concat(o)),
								i && (e.wwPlugins = e.wwPlugins.concat(i)),
								s && (e.wwNodeViews = we(we({}, e.wwNodeViews), s)),
								a && (e.mdCommands = we(we({}, e.mdCommands), a)),
								l && (e.wwCommands = we(we({}, e.wwCommands), l)),
								c && (e.toolbarItems = e.toolbarItems.concat(c)),
								n && (e.markdownParsers = we(we({}, e.markdownParsers), n)),
								e
							);
						throw new Error("The return value of the executed plugin is empty.");
					},
					{
						toHTMLRenderers: {},
						toMarkdownRenderers: {},
						mdPlugins: [],
						wwPlugins: [],
						wwNodeViews: {},
						mdCommands: {},
						wwCommands: {},
						toolbarItems: [],
						markdownParsers: {}
					}
				)
			);
		}
		function Ym(e) {
			var t,
				n = this,
				e =
					((this.options = Dt()(
						{
							linkAttributes: null,
							extendedAutolinks: !1,
							customHTMLRenderer: null,
							referenceDefinition: !1,
							customHTMLSanitizer: null,
							frontMatter: !1,
							usageStatistics: !0,
							theme: "light"
						},
						e
					)),
					(this.eventEmitter = new Cm()),
					Yt(this.options.linkAttributes)),
				r =
					Qm({
						plugins: this.options.plugins,
						eventEmitter: this.eventEmitter,
						usageStatistics: this.options.usageStatistics,
						instance: this
					}) || {},
				o = r.toHTMLRenderers,
				r = r.markdownParsers,
				i = this.options,
				s = i.customHTMLRenderer,
				a = i.extendedAutolinks,
				l = i.referenceDefinition,
				c = i.frontMatter,
				i = i.customHTMLSanitizer,
				e = {
					linkAttributes: e,
					customHTMLRenderer: we(we({}, o), s),
					extendedAutolinks: a,
					referenceDefinition: l,
					frontMatter: c,
					sanitizer: i || Yd
				},
				o =
					((t = e.customHTMLRenderer),
					["htmlBlock", "htmlInline"].forEach(function (e) {
						t[e] && Object.keys(t[e]).forEach(Qd);
					}),
					this.options.events &&
						Ot()(this.options.events, function (e, t) {
							n.on(t, e);
						}),
					this.options),
				s = o.el,
				i = o.initialValue,
				o = o.theme,
				u = s.innerHTML;
			"light" !== o && s.classList.add(Ne(o)),
				(this.toastMark = new qd((s.innerHTML = ""), {
					disallowedHtmlBlockTags: ["br", "img"],
					extendedAutolinks: a,
					referenceDefinition: l,
					disallowDeepHeading: !0,
					frontMatter: c,
					customParser: r
				})),
				(this.preview = new bp(this.eventEmitter, we(we({}, e), { isViewer: !0 }))),
				Dl()(this.preview.previewContent, "mousedown", this.toggleTask.bind(this)),
				i ? this.setMarkdown(i) : u && this.preview.setHTML(u),
				s.appendChild(this.preview.previewContent),
				this.eventEmitter.emit("load", this);
		}
		(Ym.prototype.toggleTask = function (e) {
			var t = e.target,
				n = getComputedStyle(t, ":before");
			!t.hasAttribute("data-task-disabled") &&
				t.hasAttribute("data-task") &&
				Hi(n, e.offsetX, e.offsetY) &&
				(ji(t, "checked"), this.eventEmitter.emit("change", { source: "viewer", date: e }));
		}),
			(Ym.prototype.setMarkdown = function (e) {
				var t = this.toastMark.getLineTexts(),
					t = [t.length, sn(t).length + 1],
					t = this.toastMark.editMarkdown([1, 1], t, e || "");
				this.eventEmitter.emit("updatePreview", t);
			}),
			(Ym.prototype.on = function (e, t) {
				this.eventEmitter.listen(e, t);
			}),
			(Ym.prototype.off = function (e) {
				this.eventEmitter.removeEventHandler(e);
			}),
			(Ym.prototype.addHook = function (e, t) {
				this.eventEmitter.removeEventHandler(e), this.eventEmitter.listen(e, t);
			}),
			(Ym.prototype.destroy = function () {
				Ol()(this.preview.el, "mousedown", this.toggleTask.bind(this)),
					this.preview.destroy(),
					this.eventEmitter.emit("destroy");
			}),
			(Ym.prototype.isViewer = function () {
				return !0;
			}),
			(Ym.prototype.isMarkdownMode = function () {
				return !1;
			}),
			(Ym.prototype.isWysiwygMode = function () {
				return !1;
			});
		var eg = Ym;
		function tg(e) {
			return e instanceof jy;
		}
		function ng(e) {
			return Zt(
				[
					"document",
					"blockQuote",
					"bulletList",
					"orderedList",
					"listItem",
					"paragraph",
					"heading",
					"emph",
					"strong",
					"strike",
					"link",
					"image",
					"table",
					"tableHead",
					"tableBody",
					"tableRow",
					"tableHeadCell",
					"tableBodyCell"
				],
				e
			);
		}
		var rg = {
				openTag: function (e, t) {
					var n = e.tagName,
						r = e.classNames,
						e = e.attributes,
						n = document.createElement(n),
						o = {};
					r && (n.className = r.join(" ")),
						Ji((o = e ? we(we({}, o), e) : o), n),
						t.push(n);
				},
				closeTag: function (e, t) {
					var n;
					1 < t.length && ((n = t.pop()), sn(t).appendChild(n));
				},
				html: function (e, t) {
					sn(t).insertAdjacentHTML("beforeend", e.content);
				},
				text: function (e, t) {
					e = document.createTextNode(e.content);
					sn(t).appendChild(e);
				}
			},
			og =
				((ig.prototype.generateTokens = function (e) {
					(n = (r = e).attrs),
						(t = {
							type: (o = r.type.name),
							wysiwygNode: !0,
							literal: !ng(o) && tg(r) ? r.textContent : null
						}),
						(n = {
							heading: { level: n.level },
							link: { destination: n.linkUrl, title: n.title },
							image: { destination: n.imageUrl },
							codeBlock: { info: n.language },
							bulletList: { type: "list", listData: { type: "bullet" } },
							orderedList: {
								type: "list",
								listData: { type: "ordered", start: n.order }
							},
							listItem: {
								type: "item",
								listData: { task: n.task, checked: n.checked }
							},
							tableHeadCell: { type: "tableCell", cellType: "head", align: n.align },
							tableBodyCell: { type: "tableCell", cellType: "body", align: n.align },
							customBlock: { info: n.info }
						}[o]),
						(o = we(we({}, t), n)),
						(n = (t = r.attrs).htmlAttrs),
						(r = t.childrenHTML);
					var t = n ? we(we({}, o), { attrs: n, childrenHTML: r }) : o,
						n = {
							entering: !0,
							leaf: !!tg(e) && e.isLeaf,
							options: this.renderer.getOptions(),
							getChildrenText: function () {
								return tg(e) ? e.textContent : "";
							},
							skipChildren: function () {
								return !1;
							}
						},
						r = this.convertors[e.type.name],
						o = r(t, n, this.convertors),
						o = Ni()(o) ? o : [o];
					return (
						(ng(e.type.name) || e.attrs.htmlInline) &&
							((n.entering = !1),
							o.push({ type: "text", content: tg(e) ? e.textContent : "" }),
							(o = o.concat(r(t, n, this.convertors)))),
						o
					);
				}),
				(ig.prototype.toDOMNode = function (e) {
					var e = this.generateTokens(e),
						t = [];
					return (
						e.forEach(function (e) {
							return rg[e.type](e, t);
						}),
						t[0]
					);
				}),
				(ig.prototype.getToDOMNode = function (e) {
					return Zt(this.customConvertorKeys, e) ? this.toDOMNode.bind(this) : null;
				}),
				ig);
		function ig(e, t) {
			var e = ap(e, t),
				n = we(we({}, t.htmlBlock), t.htmlInline);
			(this.customConvertorKeys = Object.keys(t).concat(Object.keys(n))),
				(this.renderer = new Jd({ gfm: !0, convertors: we(we({}, e), n) })),
				(this.convertors = this.renderer.getConvertors());
		}
		var sg = 15,
			ag = null,
			lg = null;
		function cg(e, t) {
			var n = t.syncScrollTop,
				r = t.releaseEventBlock;
			lg && clearTimeout(lg),
				n(e),
				(lg = setTimeout(function () {
					r();
				}, sg));
		}
		function ug(t, n, r) {
			function o() {
				var e = (Date.now() - s) / 100;
				ag && clearTimeout(ag),
					(ag =
						e < 1
							? ((e = t + i * Math.cos(((1 - e) * Math.PI) / 2)),
								cg(Math.ceil(e), r),
								setTimeout(o, 1))
							: (cg(n, r), null));
			}
			var i = n - t,
				s = Date.now();
			o();
		}
		(pg.prototype.addScrollSyncEvent = function () {
			var n = this;
			this.eventEmitter.listen("afterPreviewRender", function () {
				n.clearTimer(),
					(n.timer = setTimeout(function () {
						n.syncPreviewScrollTop(!0);
					}, 200));
			}),
				this.eventEmitter.listen("scroll", function (e, t) {
					n.active &&
						("editor" === e && "editor" !== n.blockedScroll
							? n.syncPreviewScrollTop()
							: "preview" === e &&
								"preview" !== n.blockedScroll &&
								n.syncEditorScrollTop(t));
				}),
				this.eventEmitter.listen("toggleScrollSync", function (e) {
					n.active = e;
				});
		}),
			(pg.prototype.getMdNodeAtPos = function (e, t) {
				e = e.content.findIndex(t.pos).index;
				return this.toastMark.findFirstNodeAtLine(e + 1);
			}),
			(pg.prototype.getScrollTopByCaretPos = function () {
				var e = this.mdEditor.getSelection(),
					e = this.toastMark.findFirstNodeAtLine(e[0][0]),
					t = this.previewEl.clientHeight,
					e = hp(this.previewRoot, e).el,
					n = (dp(e, this.previewRoot) || e.offsetTop) + e.clientHeight - 0.5 * t;
				return (
					(this.latestEditorScrollTop = null),
					e.getBoundingClientRect().top - this.previewEl.getBoundingClientRect().top < t
						? null
						: n
				);
			}),
			(pg.prototype.syncPreviewScrollTop = function (e) {
				void 0 === e && (e = !1);
				var t = this.editorView,
					n = this.previewEl,
					r = this.previewRoot,
					o = t.dom.getBoundingClientRect(),
					i = o.left,
					o = o.top,
					i = t.posAtCoords({ left: i, top: o }),
					s = t.state.doc,
					i = this.getMdNodeAtPos(s, i);
				if (i && "htmlBlock" !== (a = (a = i).type) && "htmlInline" !== a) {
					var a = n.scrollTop,
						t = t.dom,
						l = t.scrollTop,
						c = t.children,
						t = t.scrollHeight - l <= t.clientHeight + 18,
						n = t ? n.scrollHeight : 0;
					if (l && !t) {
						if (e) {
							t = this.getScrollTopByCaretPos();
							if (!t) return;
							n = t;
						} else
							(e = hp(this.previewRoot, i)),
								(t = e.el),
								(i = up(s, e.mdNode, c)),
								(s = i.height),
								(e = i.rect),
								(n =
									(dp(t, r) || t.offsetTop) +
									t.clientHeight *
										(o > e.top ? Math.min((o - e.top) / s, 1) : 0));
						(n = this.getResolvedScrollTop("editor", l, n, a)),
							(this.latestEditorScrollTop = l);
					}
					n !== a && this.run("editor", n, a);
				}
			}),
			(pg.prototype.syncEditorScrollTop = function (e) {
				var t = this.toastMark,
					n = this.editorView,
					r = this.previewRoot,
					o = this.previewEl,
					i = n.dom,
					n = n.state,
					s = o.scrollTop,
					o = o.scrollHeight - s <= o.clientHeight,
					a = i.scrollTop,
					l = o ? i.scrollHeight : 0;
				if (s && e && !o) {
					if (
						!(e = ((e, t) => {
							for (; !e.getAttribute("data-nodeid") && e.parentElement !== t; )
								e = e.parentElement;
							return e;
						})(e, r)).getAttribute("data-nodeid")
					)
						return;
					var o = i.children,
						i = Number(e.getAttribute("data-nodeid")),
						e = hp(this.previewRoot, t.findNodeById(i)),
						t = e.mdNode,
						e = e.el,
						l = o[li(t) - 1].offsetTop,
						n = up(n.doc, t, o).height,
						t = gp(e, r, i),
						o = t.nodeHeight;
					(l += ((e = n), Math.min((s - t.offsetTop) / o, 1) * e)),
						(l = this.getResolvedScrollTop("preview", s, l, a)),
						(this.latestPreviewScrollTop = s);
				}
				l !== a && this.run("preview", l, a);
			}),
			(pg.prototype.getResolvedScrollTop = function (e, t, n, r) {
				e = "editor" === e ? this.latestEditorScrollTop : this.latestPreviewScrollTop;
				return null === e ? n : e < t ? Math.max(n, r) : Math.min(n, r);
			}),
			(pg.prototype.run = function (e, t, n) {
				var r,
					o = this;
				"editor" === e
					? ((r = this.previewEl), (this.blockedScroll = "preview"))
					: ((r = this.editorView.dom), (this.blockedScroll = "editor")),
					ug(n, t, {
						syncScrollTop: function (e) {
							return (r.scrollTop = e);
						},
						releaseEventBlock: function () {
							return (o.blockedScroll = null);
						}
					});
			}),
			(pg.prototype.clearTimer = function () {
				this.timer && (clearTimeout(this.timer), (this.timer = null));
			}),
			(pg.prototype.destroy = function () {
				this.clearTimer(),
					this.eventEmitter.removeEventHandler("scroll"),
					this.eventEmitter.removeEventHandler("afterPreviewRender");
			});
		var dg = pg;
		function pg(e, t, n) {
			(this.latestEditorScrollTop = null),
				(this.latestPreviewScrollTop = null),
				(this.blockedScroll = null),
				(this.active = !0),
				(this.timer = null);
			var r = t.previewContent,
				t = t.el;
			(this.previewRoot = r),
				(this.previewEl = t),
				(this.mdEditor = e),
				(this.editorView = e.view),
				(this.toastMark = e.getToastMark()),
				(this.eventEmitter = n),
				this.addScrollSyncEvent();
		}
		var hg = {
			getPopupInitialValues: function (e, t) {
				return "link" === t.popupName ? { linkText: e.getSelectedText() } : {};
			}
		};
		function Ue(e) {
			var t,
				r,
				o,
				i,
				n,
				s = this,
				e =
					((this.initialHTML = e.el.innerHTML),
					(e.el.innerHTML = ""),
					(this.options = Dt()(
						{
							previewStyle: "tab",
							previewHighlight: !0,
							initialEditType: "markdown",
							height: "300px",
							minHeight: "200px",
							language: "en-US",
							useCommandShortcut: !0,
							usageStatistics: !0,
							toolbarItems: [
								["heading", "bold", "italic", "strike"],
								["hr", "quote"],
								["ul", "ol", "task", "indent", "outdent"],
								["table", "image", "link"],
								["code", "codeblock"],
								["scrollSync"]
							],
							hideModeSwitch: !1,
							linkAttributes: null,
							extendedAutolinks: !1,
							customHTMLRenderer: null,
							customMarkdownRenderer: null,
							referenceDefinition: !1,
							customHTMLSanitizer: null,
							frontMatter: !1,
							widgetRules: [],
							theme: "light",
							autofocus: !0
						},
						e
					)),
					this.options),
				a = e.customHTMLRenderer,
				l = e.extendedAutolinks,
				c = e.referenceDefinition,
				u = e.frontMatter,
				d = e.customMarkdownRenderer,
				p = e.useCommandShortcut,
				h = e.widgetRules,
				f = e.customHTMLSanitizer,
				e =
					((this.mode = e.initialEditType || "markdown"),
					(this.mdPreviewStyle = this.options.previewStyle),
					(this.i18n = je),
					this.i18n.setCode(this.options.language),
					(this.eventEmitter = new Cm()),
					(yi = h).forEach(function (e, t) {
						bi["widget" + t] = e;
					}),
					Yt(this.options.linkAttributes)),
				h =
					((this.pluginInfo = Qm({
						plugins: this.options.plugins,
						eventEmitter: this.eventEmitter,
						usageStatistics: this.options.usageStatistics,
						instance: this
					})),
					this.pluginInfo),
				m = h.toHTMLRenderers,
				g = h.toMarkdownRenderers,
				v = h.mdPlugins,
				y = h.wwPlugins,
				b = h.wwNodeViews,
				w = h.mdCommands,
				k = h.wwCommands,
				h = h.markdownParsers,
				m = {
					linkAttributes: e,
					customHTMLRenderer: ln(m, a),
					extendedAutolinks: l,
					referenceDefinition: c,
					frontMatter: u,
					sanitizer: f || Yd
				},
				a = new og(e, m.customHTMLRenderer),
				f =
					((t = m.customHTMLRenderer),
					(r = m.sanitizer),
					(o = a),
					(i = { nodes: {}, marks: {} }),
					["htmlBlock", "htmlInline"].forEach(function (n) {
						t[n] &&
							Object.keys(t[n]).forEach(function (e) {
								var t = "htmlBlock" === n ? "nodes" : "marks";
								Qd(e), (i[t][e] = op[n](e, r, o));
							});
					}),
					i);
			(this.toastMark = new qd("", {
				disallowedHtmlBlockTags: ["br", "img"],
				extendedAutolinks: l,
				referenceDefinition: c,
				disallowDeepHeading: !0,
				frontMatter: u,
				customParser: h
			})),
				(this.mdEditor = new Nl(this.eventEmitter, {
					toastMark: this.toastMark,
					useCommandShortcut: p,
					mdPlugins: v
				})),
				(this.preview = new bp(
					this.eventEmitter,
					we(we({}, m), { isViewer: !1, highlight: this.options.previewHighlight })
				)),
				(this.wwEditor = new bm(this.eventEmitter, {
					toDOMAdaptor: a,
					useCommandShortcut: p,
					htmlSchemaMap: f,
					linkAttributes: e,
					wwPlugins: y,
					wwNodeViews: b
				})),
				(this.convertor = new Xm(
					this.wwEditor.getSchema(),
					we(we({}, g), d),
					ap(e, m.customHTMLRenderer),
					this.eventEmitter
				)),
				this.setMinHeight(this.options.minHeight),
				this.setHeight(this.options.height),
				this.setMarkdown(this.options.initialValue, !1),
				this.options.placeholder && this.setPlaceholder(this.options.placeholder),
				this.options.initialValue || this.setHTML(this.initialHTML, !1),
				(this.commandManager = new Mm(
					this.eventEmitter,
					this.mdEditor.commands,
					this.wwEditor.commands,
					function () {
						return s.mode;
					}
				)),
				this.options.usageStatistics && Ht()("editor", "UA-129966929-1"),
				(this.scrollSync = new dg(this.mdEditor, this.preview, this.eventEmitter)),
				this.addInitEvent(),
				this.addInitCommand(w, k),
				(n = this).eventEmitter.listen("query", function (e, t) {
					return hg[e](n, t);
				}),
				this.options.hooks &&
					Ot()(this.options.hooks, function (e, t) {
						return s.addHook(t, e);
					}),
				this.options.events &&
					Ot()(this.options.events, function (e, t) {
						return s.on(t, e);
					}),
				this.eventEmitter.emit("load", this),
				this.moveCursorToStart(this.options.autofocus);
		}
		(Ue.prototype.addInitEvent = function () {
			var t = this;
			this.on("needChangeMode", this.changeMode.bind(this)),
				this.on("loadUI", function () {
					var e;
					"auto" !== t.height &&
						((e =
							Math.min(parseInt(t.minHeight, 10), parseInt(t.height, 10) - 75) +
							"px"),
						t.setMinHeight(e));
				}),
				this.eventEmitter.listen("addImageBlobHook", function (e, t) {
					var n = new FileReader();
					(n.onload = function (e) {
						e = e.target;
						return t(e.result);
					}),
						n.readAsDataURL(e);
				});
		}),
			(Ue.prototype.addInitCommand = function (e, t) {
				function n(t, n) {
					Object.keys(n).forEach(function (e) {
						r.addCommand(t, e, n[e]);
					});
				}
				var r = this;
				this.addCommand("markdown", "toggleScrollSync", function (e) {
					return r.eventEmitter.emit("toggleScrollSync", e.active), !0;
				}),
					n("markdown", e),
					n("wysiwyg", t);
			}),
			(Ue.prototype.getCurrentModeEditor = function () {
				return this.isMarkdownMode() ? this.mdEditor : this.wwEditor;
			}),
			(Ue.factory = function (e) {
				return new (e.viewer ? eg : Ue)(e);
			}),
			(Ue.setLanguage = function (e, t) {
				je.setLanguage(e, t);
			}),
			(Ue.prototype.changePreviewStyle = function (e) {
				this.mdPreviewStyle !== e &&
					((this.mdPreviewStyle = e), this.eventEmitter.emit("changePreviewStyle", e));
			}),
			(Ue.prototype.exec = function (e, t) {
				this.commandManager.exec(e, t);
			}),
			(Ue.prototype.addCommand = function (n, e, r) {
				var o = this;
				this.commandManager.addCommand(n, e, function (e) {
					var t = ("markdown" === n ? o.mdEditor : o.wwEditor).view;
					r((e = void 0 === e ? {} : e), t.state, t.dispatch, t);
				});
			}),
			(Ue.prototype.on = function (e, t) {
				this.eventEmitter.listen(e, t);
			}),
			(Ue.prototype.off = function (e) {
				this.eventEmitter.removeEventHandler(e);
			}),
			(Ue.prototype.addHook = function (e, t) {
				this.eventEmitter.removeEventHandler(e), this.eventEmitter.listen(e, t);
			}),
			(Ue.prototype.removeHook = function (e) {
				this.eventEmitter.removeEventHandler(e);
			}),
			(Ue.prototype.focus = function () {
				this.getCurrentModeEditor().focus();
			}),
			(Ue.prototype.blur = function () {
				this.getCurrentModeEditor().blur();
			}),
			(Ue.prototype.moveCursorToEnd = function (e) {
				void 0 === e && (e = !0), this.getCurrentModeEditor().moveCursorToEnd(e);
			}),
			(Ue.prototype.moveCursorToStart = function (e) {
				void 0 === e && (e = !0), this.getCurrentModeEditor().moveCursorToStart(e);
			}),
			(Ue.prototype.setMarkdown = function (e, t) {
				this.mdEditor.setMarkdown((e = void 0 === e ? "" : e), (t = void 0 === t ? !0 : t)),
					this.isWysiwygMode() &&
						((e = this.toastMark.getRootNode()),
						(e = this.convertor.toWysiwygModel(e)),
						this.wwEditor.setModel(e, t));
			}),
			(Ue.prototype.setHTML = function (e, t) {
				void 0 === e && (e = ""), void 0 === t && (t = !0);
				var n,
					r,
					o = document.createElement("div"),
					e =
						((o.innerHTML =
							((n = (e = e).replace(/<p><br\s*\/*><\/p>/gi, "<p></p>")),
							(e = new RegExp(Ii, "ig")),
							null != (r = n.match(e)) &&
								r.forEach(function (e, t) {
									Pi.test(e) &&
										((e = Fi),
										t &&
											(t = r[t - 1].match(Li)) &&
											!/br/i.test(t[1]) &&
											(e = "</" + (t = t[1]) + "><" + t + ">"),
										(n = n.replace(Pi, e)));
								}),
							n)),
						Zy.fromSchema(this.wwEditor.schema).parse(o));
				this.isMarkdownMode()
					? this.mdEditor.setMarkdown(this.convertor.toMarkdownText(e), t)
					: this.wwEditor.setModel(e, t);
			}),
			(Ue.prototype.getMarkdown = function () {
				return this.isMarkdownMode()
					? this.mdEditor.getMarkdown()
					: this.convertor.toMarkdownText(this.wwEditor.getModel());
			}),
			(Ue.prototype.getHTML = function () {
				var e,
					t = this,
					n =
						(this.eventEmitter.holdEventInvoke(function () {
							var e;
							t.isMarkdownMode() &&
								((e = t.toastMark.getRootNode()),
								(e = t.convertor.toWysiwygModel(e)),
								t.wwEditor.setModel(e));
						}),
						Gi(this.wwEditor.view.dom.innerHTML));
				return this.placeholder
					? ((e = new RegExp(
							'<span class="placeholder[^>]+>' + this.placeholder + "</span>",
							"i"
						)),
						n.replace(e, ""))
					: n;
			}),
			(Ue.prototype.insertText = function (e) {
				this.getCurrentModeEditor().replaceSelection(e);
			}),
			(Ue.prototype.setSelection = function (e, t) {
				this.getCurrentModeEditor().setSelection(e, t);
			}),
			(Ue.prototype.replaceSelection = function (e, t, n) {
				this.getCurrentModeEditor().replaceSelection(e, t, n);
			}),
			(Ue.prototype.deleteSelection = function (e, t) {
				this.getCurrentModeEditor().deleteSelection(e, t);
			}),
			(Ue.prototype.getSelectedText = function (e, t) {
				return this.getCurrentModeEditor().getSelectedText(e, t);
			}),
			(Ue.prototype.getRangeInfoOfNode = function (e) {
				return this.getCurrentModeEditor().getRangeInfoOfNode(e);
			}),
			(Ue.prototype.addWidget = function (e, t, n) {
				this.getCurrentModeEditor().addWidget(e, t, n);
			}),
			(Ue.prototype.replaceWithWidget = function (e, t, n) {
				this.getCurrentModeEditor().replaceWithWidget(e, t, n);
			}),
			(Ue.prototype.setHeight = function (e) {
				var t = this.options.el;
				Rt()(e) &&
					(("auto" === e ? Lt : It)()(t, "auto-height"),
					this.setMinHeight(this.getMinHeight())),
					At()(t, { height: e }),
					(this.height = e);
			}),
			(Ue.prototype.getHeight = function () {
				return this.height;
			}),
			(Ue.prototype.setMinHeight = function (e) {
				var t;
				e !== this.minHeight &&
					("auto" !== (t = this.height || this.options.height) &&
						this.options.el.querySelector("." + Ne("main")) &&
						(e = Math.min(parseInt(e, 10), parseInt(t, 10) - 75) + "px"),
					(t = parseInt(e, 10)),
					(this.minHeight = e),
					this.wwEditor.setMinHeight(t),
					this.mdEditor.setMinHeight(t),
					this.preview.setMinHeight(t));
			}),
			(Ue.prototype.getMinHeight = function () {
				return this.minHeight;
			}),
			(Ue.prototype.isMarkdownMode = function () {
				return "markdown" === this.mode;
			}),
			(Ue.prototype.isWysiwygMode = function () {
				return "wysiwyg" === this.mode;
			}),
			(Ue.prototype.isViewer = function () {
				return !1;
			}),
			(Ue.prototype.getCurrentPreviewStyle = function () {
				return this.mdPreviewStyle;
			}),
			(Ue.prototype.changeMode = function (e, t) {
				var n;
				this.mode === e ||
					((this.mode = e),
					this.isWysiwygMode()
						? ((n = this.toastMark.getRootNode()),
							(n = this.convertor.toWysiwygModel(n)),
							this.wwEditor.setModel(n))
						: ((n = this.wwEditor.getModel()),
							this.mdEditor.setMarkdown(this.convertor.toMarkdownText(n), !t)),
					this.eventEmitter.emit("removePopupWidget"),
					this.eventEmitter.emit("changeMode", e),
					t) ||
					((n = this.convertor.getMappedPos()),
					this.focus(),
					this.isWysiwygMode() && Pt()(n)
						? this.wwEditor.setSelection(n)
						: Array.isArray(n) && this.mdEditor.setSelection(n));
			}),
			(Ue.prototype.destroy = function () {
				var n = this;
				this.wwEditor.destroy(),
					this.mdEditor.destroy(),
					this.preview.destroy(),
					this.scrollSync.destroy(),
					this.eventEmitter.emit("destroy"),
					this.eventEmitter.getEvents().forEach(function (e, t) {
						return n.off(t);
					});
			}),
			(Ue.prototype.hide = function () {
				this.eventEmitter.emit("hide");
			}),
			(Ue.prototype.show = function () {
				this.eventEmitter.emit("show");
			}),
			(Ue.prototype.setScrollTop = function (e) {
				this.getCurrentModeEditor().setScrollTop(e);
			}),
			(Ue.prototype.getScrollTop = function () {
				return this.getCurrentModeEditor().getScrollTop();
			}),
			(Ue.prototype.reset = function () {
				this.wwEditor.setModel([]), this.mdEditor.setMarkdown("");
			}),
			(Ue.prototype.getSelection = function () {
				return this.getCurrentModeEditor().getSelection();
			}),
			(Ue.prototype.setPlaceholder = function (e) {
				(this.placeholder = e),
					this.mdEditor.setPlaceholder(e),
					this.wwEditor.setPlaceholder(e);
			}),
			(Ue.prototype.getEditorElements = function () {
				return {
					mdEditor: this.mdEditor.getElement(),
					mdPreview: this.preview.getElement(),
					wwEditor: this.wwEditor.getElement()
				};
			}),
			(Ue.prototype.convertPosToMatchEditorMode = function (e, t, n) {
				void 0 === t && (t = e), void 0 === n && (n = this.mode);
				var r = this.mdEditor.view.state.doc,
					o = Array.isArray(e),
					i = Array.isArray(t),
					s = e,
					a = t;
				if (o !== i) throw new Error("Types of arguments must be same");
				return (
					"markdown" !== n || o || i
						? "wysiwyg" === n && o && i && ((s = (n = ys(r, e, t))[0]), (a = n[1]))
						: ((s = (o = gs(r, e, t))[0]), (a = o[1])),
					[s, a]
				);
			}),
			(Re = Ue);
		var Hn = ye(326),
			fg = ye.n(Hn),
			mg =
				((gg.prototype.walk = function () {
					var e = this.entering,
						t = this.current;
					return t
						? (e
								? t.firstChild
									? ((this.current = t.firstChild), (this.entering = !0))
									: (this.entering = !1)
								: t === this.root
									? (this.current = null)
									: t.next
										? ((this.current = t.next), (this.entering = !0))
										: ((this.current = t.parent), (this.entering = !1)),
							{ vnode: t, entering: e })
						: null;
				}),
				gg);
		function gg(e) {
			(this.current = e), (this.root = e), (this.entering = !0);
		}
		(yg.prototype.walker = function () {
			return new mg(this);
		}),
			(yg.removalNodes = []);
		var vg = yg;
		function yg(e, t, n) {
			(this.parent = null),
				(this.old = null),
				(this.firstChild = null),
				(this.next = null),
				(this.skip = !1),
				(this.type = e),
				(this.props = t),
				(this.children = n),
				(this.props.children = n),
				t.ref && ((this.ref = t.ref), delete t.ref),
				t.key && ((this.key = t.key), delete t.key);
		}
		function bg(e, t) {
			var n = e;
			fg()(e) || null == e
				? (n = null)
				: (Rt()(e) || Pt()(e)) &&
					((e = String(e)), (n = new vg("TEXT_NODE", { nodeValue: e }, []))),
				n && t.push(n);
		}
		var We = function (e) {
				for (
					var t,
						n,
						r = arguments,
						o = 1,
						i = "",
						s = "",
						a = [0],
						l = function (e) {
							1 === o && (e || (i = i.replace(/^\s*\n\s*|\s*\n\s*$/g, "")))
								? a.push(e ? r[e] : i)
								: 3 === o && (e || i)
									? ((a[1] = e ? r[e] : i), (o = 2))
									: 2 === o && "..." === i && e
										? (a[2] = dn(a[2] || {}, r[e]))
										: 2 === o && i && !e
											? ((a[2] = a[2] || {})[i] = !0)
											: 5 <= o &&
												(5 === o
													? (((a[2] = a[2] || {})[n] = e
															? i
																? i + r[e]
																: r[e]
															: i),
														(o = 6))
													: (e || i) && (a[2][n] += e ? i + r[e] : i)),
								(i = "");
						},
						c = 0;
					c < e.length;
					c++
				) {
					c && (1 === o && l(), l(c));
					for (var u = 0; u < e[c].length; u++)
						(t = e[c][u]),
							1 === o
								? "<" === t
									? (l(), (a = [a, "", null]), (o = 3))
									: (i += t)
								: 4 === o
									? (i = "--" === i && ">" === t ? ((o = 1), "") : t + i[0])
									: s
										? t === s
											? (s = "")
											: (i += t)
										: '"' === t || "'" === t
											? (s = t)
											: ">" === t
												? (l(), (o = 1))
												: o &&
													("=" === t
														? ((o = 5), (n = i), (i = ""))
														: "/" === t &&
															  (o < 5 || ">" === e[c][u + 1])
															? (l(),
																3 === o && (a = a[0]),
																(a = (o = a)[0]).push(
																	this.apply(null, o.slice(1))
																),
																(o = 0))
															: " " === t ||
																  "\t" === t ||
																  "\n" === t ||
																  "\r" === t
																? (l(), (o = 2))
																: (i += t)),
							3 === o && "!--" === i && ((o = 4), (a = a[0]));
				}
				return l(), 2 < a.length ? a.slice(1) : a[1];
			}.bind(function (e, t) {
				for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
				var o = [];
				return (
					n.forEach(function (e) {
						Array.isArray(e)
							? e.forEach(function (e) {
									bg(e, o);
								})
							: bg(e, o);
					}),
					new vg(e, t || {}, o)
				);
			}),
			Pe = ye(73),
			wg = ye.n(Pe);
		function kg(n, r, o) {
			Object.keys(r).forEach(function (e) {
				var t;
				/^on/.test(e)
					? (o[e] && r[e] === o[e]) ||
						((t = e.slice(2).toLowerCase()), n.removeEventListener(t, r[e]))
					: "children" === e ||
						o[e] ||
						(null == (t = n) ? void 0 : t.nodeType) === Node.TEXT_NODE ||
						n.removeAttribute(e);
			}),
				Cg(n, r, o, function (e) {
					return !on(r[e], o[e]);
				});
		}
		var xg = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
		function Cg(o, i, s, a) {
			Object.keys(s).forEach(function (e) {
				var n, t, r;
				(a && !a(e)) ||
					(/^on/.test(e)
						? ((t = e.slice(2).toLowerCase()), o.addEventListener(t, s[e]))
						: "nodeValue" === e
							? (o[e] = s[e])
							: "style" === e && wg()(s[e])
								? ((n = o),
									(t = i[e]),
									(r = s[e]),
									t &&
										Object.keys(t).forEach(function (e) {
											n.style[e] = "";
										}),
									Object.keys(r).forEach(function (e) {
										var t = r[e];
										n.style[e] = Pt()(t) && !xg.test(e) ? t + "px" : t;
									}))
								: "children" !== e &&
									(!1 === s[e] ? o.removeAttribute(e) : o.setAttribute(e, s[e])));
			});
		}
		function Tg(e) {
			if ((vg.removalNodes.forEach(Sg), e))
				for (var t, n, r = e.walker(); (t = r.walk()); )
					(e = t.vnode),
						t.entering
							? Sg(e)
							: ls()(e.type) &&
								((t = e.component), !e.old && t.mounted && t.mounted(), e.old) &&
								t.updated &&
								((n = t.prevProps || {}), t.updated(n));
		}
		function Mg(e) {
			for (var t = e.parent; !t.node; ) t = t.parent;
			return t.node;
		}
		function Sg(e) {
			if (e && e.parent) {
				if (
					(e.node &&
						((n = Mg(e)),
						"A" === e.effect
							? n.appendChild(e.node)
							: "U" === e.effect && kg(e.node, e.old.props, e.props)),
					"D" === e.effect)
				)
					for (var t, n, r = e.walker(); (t = r.walk()); )
						(e = t.vnode),
							t.entering ||
								(ls()(e.type)
									? (t = e.component).beforeDestroy && t.beforeDestroy()
									: (function e(t, n) {
											t.node ? n.removeChild(t.node) : e(t.firstChild, n);
										})(e, (n = Mg(e))));
				e.ref && (e.component ? e.ref(e.component) : e.node && e.ref(e.node));
			}
		}
		function Eg(e) {
			for (var t, n, r, o, i = e; e && !e.skip; )
				if (
					(ls()(e.type)
						? ((t = e.type),
							(o = r = void 0),
							(r = (n = e).props),
							(((n = (o = n.component)
								? ((o.prevProps = o.props), (o.props = n.props), o)
								: new t(r)).vnode = e).component = n),
							(e.props.children = e.children = [n.render()]))
						: e.node ||
							(e.node =
								((o = void 0),
								"TEXT_NODE" === (t = e).type
									? (o = document.createTextNode(t.props.nodeValue))
									: Cg((o = document.createElement(t.type)), {}, t.props),
								o)),
					Ng(e),
					e.firstChild)
				)
					e = e.firstChild;
				else {
					for (; e && e.parent && !e.next && (e = e.parent) !== i; );
					e = e.next;
				}
		}
		function Ng(o) {
			var e = o.children,
				i = o.old ? o.old.firstChild : null,
				s = null,
				t =
					(e.forEach(function (e, t) {
						r = e;
						var n,
							r = (n = i) && r && r.type === n.type && (!r.key || r.key === n.key);
						r &&
							((e.old = i),
							(e.parent = o),
							(e.node = i.node),
							(e.component = i.component),
							(e.effect = "U")),
							e &&
								!r &&
								((e.old = null), (e.parent = o), (e.node = null), (e.effect = "A")),
							i && !r && (vg.removalNodes.push(i), (i.effect = "D")),
							(i = i && i.next),
							0 === t ? (o.firstChild = e) : e && (s.next = e),
							(s = e);
					}),
					sn(e));
			if (!e.length) for (; i; ) vg.removalNodes.push(i), (i.effect = "D"), (i = i.next);
			for (; i && t; )
				i && t.old !== i && (vg.removalNodes.push(i), (i.effect = "D"), (i = i.next));
		}
		function Og(e, t) {
			var n = new vg(e.tagName.toLowerCase(), {}, [t]);
			return (
				(n.node = e),
				(vg.removalNodes = []),
				Eg(n),
				Tg(n),
				function () {
					var e;
					((e = n.firstChild).effect = "D"),
						(vg.removalNodes = [e]),
						Tg(),
						(vg.removalNodes = []);
				}
			);
		}
		Ag.prototype.setState = function (e) {
			var e = we(we({}, this.state), e);
			on(this.state, e) ||
				((this.state = e),
				((e = (e = this).vnode).effect = "U"),
				(e.old = e).next && (e.next.skip = !0),
				(vg.removalNodes = []),
				Eg(e),
				Tg(e),
				e.next && (e.next.skip = !1));
		};
		var Dg = Ag;
		function Ag(e) {
			(this.props = e), (this.state = {}), (this.refs = {});
		}
		be(Pg, (Lg = Dg)),
			(Pg.prototype.show = function () {
				this.setState({ hide: !1 });
			}),
			(Pg.prototype.hide = function () {
				this.setState({ hide: !0 });
			}),
			(Pg.prototype.render = function () {
				var e = this.props,
					t = e.editorType,
					n = e.eventEmitter;
				return We(
					(Ig =
						Ig ||
						ke(
							[
								'\n      <div class="',
								'" style="display: ',
								'">\n        <div\n          class="tab-item',
								'"\n          onClick=',
								"\n        >\n          ",
								'\n        </div>\n        <div\n          class="tab-item',
								'"\n          onClick=',
								"\n        >\n          ",
								"\n        </div>\n      </div>\n    "
							],
							[
								'\n      <div class="',
								'" style="display: ',
								'">\n        <div\n          class="tab-item',
								'"\n          onClick=',
								"\n        >\n          ",
								'\n        </div>\n        <div\n          class="tab-item',
								'"\n          onClick=',
								"\n        >\n          ",
								"\n        </div>\n      </div>\n    "
							]
						)),
					Ne("mode-switch"),
					this.state.hide ? "none" : "block",
					"markdown" === t ? " active" : "",
					function () {
						n.emit("needChangeMode", "markdown");
					},
					je.get("Markdown"),
					"wysiwyg" === t ? " active" : "",
					function () {
						n.emit("needChangeMode", "wysiwyg");
					},
					je.get("WYSIWYG")
				);
			});
		var Lg,
			Ig,
			Rg = Pg;
		function Pg(e) {
			e = Lg.call(this, e) || this;
			return (e.state = { hide: !1 }), e;
		}
		var zl = ye(423),
			Bg = ye.n(zl),
			Fg =
				"undefined" != typeof Map
					? Map
					: (Object.defineProperty(Hg.prototype, "size", {
							get: function () {
								return this.__entries__.length;
							},
							enumerable: !0,
							configurable: !0
						}),
						(Hg.prototype.get = function (e) {
							(e = zg(this.__entries__, e)), (e = this.__entries__[e]);
							return e && e[1];
						}),
						(Hg.prototype.set = function (e, t) {
							var n = zg(this.__entries__, e);
							~n ? (this.__entries__[n][1] = t) : this.__entries__.push([e, t]);
						}),
						(Hg.prototype.delete = function (e) {
							var t = this.__entries__,
								e = zg(t, e);
							~e && t.splice(e, 1);
						}),
						(Hg.prototype.has = function (e) {
							return !!~zg(this.__entries__, e);
						}),
						(Hg.prototype.clear = function () {
							this.__entries__.splice(0);
						}),
						(Hg.prototype.forEach = function (e, t) {
							void 0 === t && (t = null);
							for (var n = 0, r = this.__entries__; n < r.length; n++) {
								var o = r[n];
								e.call(t, o[1], o[0]);
							}
						}),
						Hg);
		function Hg() {
			this.__entries__ = [];
		}
		function zg(e, n) {
			var r = -1;
			return (
				e.some(function (e, t) {
					return e[0] === n && ((r = t), !0);
				}),
				r
			);
		}
		var qg =
				"undefined" != typeof window &&
				"undefined" != typeof document &&
				window.document === document,
			Vg =
				void 0 !== ye.g && ye.g.Math === Math
					? ye.g
					: "undefined" != typeof self && self.Math === Math
						? self
						: "undefined" != typeof window && window.Math === Math
							? window
							: Function("return this")(),
			jg =
				"function" == typeof requestAnimationFrame
					? requestAnimationFrame.bind(Vg)
					: function (e) {
							return setTimeout(function () {
								return e(Date.now());
							}, 1e3 / 60);
						},
			$g = 2,
			_g = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
			Ug = "undefined" != typeof MutationObserver,
			Wg =
				((Jg.prototype.addObserver = function (e) {
					~this.observers_.indexOf(e) || this.observers_.push(e),
						this.connected_ || this.connect_();
				}),
				(Jg.prototype.removeObserver = function (e) {
					var t = this.observers_,
						e = t.indexOf(e);
					~e && t.splice(e, 1), !t.length && this.connected_ && this.disconnect_();
				}),
				(Jg.prototype.refresh = function () {
					this.updateObservers_() && this.refresh();
				}),
				(Jg.prototype.updateObservers_ = function () {
					var e = this.observers_.filter(function (e) {
						return e.gatherActive(), e.hasActive();
					});
					return (
						e.forEach(function (e) {
							return e.broadcastActive();
						}),
						0 < e.length
					);
				}),
				(Jg.prototype.connect_ = function () {
					qg &&
						!this.connected_ &&
						(document.addEventListener("transitionend", this.onTransitionEnd_),
						window.addEventListener("resize", this.refresh),
						Ug
							? ((this.mutationsObserver_ = new MutationObserver(this.refresh)),
								this.mutationsObserver_.observe(document, {
									attributes: !0,
									childList: !0,
									characterData: !0,
									subtree: !0
								}))
							: (document.addEventListener("DOMSubtreeModified", this.refresh),
								(this.mutationEventsAdded_ = !0)),
						(this.connected_ = !0));
				}),
				(Jg.prototype.disconnect_ = function () {
					qg &&
						this.connected_ &&
						(document.removeEventListener("transitionend", this.onTransitionEnd_),
						window.removeEventListener("resize", this.refresh),
						this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
						this.mutationEventsAdded_ &&
							document.removeEventListener("DOMSubtreeModified", this.refresh),
						(this.mutationsObserver_ = null),
						(this.mutationEventsAdded_ = !1),
						(this.connected_ = !1));
				}),
				(Jg.prototype.onTransitionEnd_ = function (e) {
					var e = e.propertyName,
						t = void 0 === e ? "" : e;
					_g.some(function (e) {
						return !!~t.indexOf(e);
					}) && this.refresh();
				}),
				(Jg.getInstance = function () {
					return this.instance_ || (this.instance_ = new Jg()), this.instance_;
				}),
				(Jg.instance_ = null),
				Jg);
		function Jg() {
			function e() {
				i && ((i = !1), r()), s && n();
			}
			function t() {
				jg(e);
			}
			function n() {
				var e = Date.now();
				if (i) {
					if (e - a < $g) return;
					s = !0;
				} else (s = !(i = !0)), setTimeout(t, o);
				a = e;
			}
			var r, o, i, s, a;
			(this.connected_ = !1),
				(this.mutationEventsAdded_ = !1),
				(this.mutationsObserver_ = null),
				(this.observers_ = []),
				(this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
				(this.refresh = ((r = this.refresh.bind(this)), (s = i = !(o = 20)), (a = 0), n));
		}
		var Gg = function (e, t) {
				for (var n = 0, r = Object.keys(t); n < r.length; n++) {
					var o = r[n];
					Object.defineProperty(e, o, {
						value: t[o],
						enumerable: !1,
						writable: !1,
						configurable: !0
					});
				}
				return e;
			},
			Kg = function (e) {
				return (e && e.ownerDocument && e.ownerDocument.defaultView) || Vg;
			},
			Zg = nv(0, 0, 0, 0);
		function Xg(e) {
			return parseFloat(e) || 0;
		}
		function Qg(n) {
			for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
			return e.reduce(function (e, t) {
				return e + Xg(n["border-" + t + "-width"]);
			}, 0);
		}
		function Yg(e) {
			var t,
				n,
				r,
				o,
				i,
				s,
				a = e.clientWidth,
				l = e.clientHeight;
			return a || l
				? ((n =
						(t = (e => {
							for (
								var t = {}, n = 0, r = ["top", "right", "bottom", "left"];
								n < r.length;
								n++
							) {
								var o = r[n],
									i = e["padding-" + o];
								t[o] = Xg(i);
							}
							return t;
						})((s = Kg(e).getComputedStyle(e)))).left + t.right),
					(r = t.top + t.bottom),
					(o = Xg(s.width)),
					(i = Xg(s.height)),
					"border-box" === s.boxSizing &&
						(Math.round(o + n) !== a && (o -= Qg(s, "left", "right") + n),
						Math.round(i + r) !== l) &&
						(i -= Qg(s, "top", "bottom") + r),
					e !== Kg(e).document.documentElement &&
						((s = Math.round(o + n) - a),
						(e = Math.round(i + r) - l),
						1 !== Math.abs(s) && (o -= s),
						1 !== Math.abs(e)) &&
						(i -= e),
					nv(t.left, t.top, o, i))
				: Zg;
		}
		var ev =
			"undefined" != typeof SVGGraphicsElement
				? function (e) {
						return e instanceof Kg(e).SVGGraphicsElement;
					}
				: function (e) {
						return e instanceof Kg(e).SVGElement && "function" == typeof e.getBBox;
					};
		function tv(e) {
			var t;
			return qg ? (ev(e) ? nv(0, 0, (t = (t = e).getBBox()).width, t.height) : Yg(e)) : Zg;
		}
		function nv(e, t, n, r) {
			return { x: e, y: t, width: n, height: r };
		}
		(ov.prototype.isActive = function () {
			var e = tv(this.target);
			return (
				(this.contentRect_ = e).width !== this.broadcastWidth ||
				e.height !== this.broadcastHeight
			);
		}),
			(ov.prototype.broadcastRect = function () {
				var e = this.contentRect_;
				return (this.broadcastWidth = e.width), (this.broadcastHeight = e.height), e;
			});
		var rv = ov;
		function ov(e) {
			(this.broadcastWidth = 0),
				(this.broadcastHeight = 0),
				(this.contentRect_ = nv(0, 0, 0, 0)),
				(this.target = e);
		}
		var iv = function (e, t) {
				(n = (t = t).x),
					(r = t.y),
					(i = t.width),
					(t = t.height),
					(o = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object),
					(o = Object.create(o.prototype)),
					Gg(o, {
						x: n,
						y: r,
						width: i,
						height: t,
						top: r,
						right: n + i,
						bottom: t + r,
						left: n
					});
				var n,
					r,
					o,
					i = o;
				Gg(this, { target: e, contentRect: i });
			},
			sv =
				((av.prototype.observe = function (e) {
					if (!arguments.length)
						throw new TypeError("1 argument required, but only 0 present.");
					if ("undefined" != typeof Element && Element instanceof Object) {
						if (!(e instanceof Kg(e).Element))
							throw new TypeError('parameter 1 is not of type "Element".');
						var t = this.observations_;
						t.has(e) ||
							(t.set(e, new rv(e)),
							this.controller_.addObserver(this),
							this.controller_.refresh());
					}
				}),
				(av.prototype.unobserve = function (e) {
					if (!arguments.length)
						throw new TypeError("1 argument required, but only 0 present.");
					if ("undefined" != typeof Element && Element instanceof Object) {
						if (!(e instanceof Kg(e).Element))
							throw new TypeError('parameter 1 is not of type "Element".');
						var t = this.observations_;
						t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this));
					}
				}),
				(av.prototype.disconnect = function () {
					this.clearActive(),
						this.observations_.clear(),
						this.controller_.removeObserver(this);
				}),
				(av.prototype.gatherActive = function () {
					var t = this;
					this.clearActive(),
						this.observations_.forEach(function (e) {
							e.isActive() && t.activeObservations_.push(e);
						});
				}),
				(av.prototype.broadcastActive = function () {
					var e, t;
					this.hasActive() &&
						((e = this.callbackCtx_),
						(t = this.activeObservations_.map(function (e) {
							return new iv(e.target, e.broadcastRect());
						})),
						this.callback_.call(e, t, e),
						this.clearActive());
				}),
				(av.prototype.clearActive = function () {
					this.activeObservations_.splice(0);
				}),
				(av.prototype.hasActive = function () {
					return 0 < this.activeObservations_.length;
				}),
				av);
		function av(e, t, n) {
			if (
				((this.activeObservations_ = []),
				(this.observations_ = new Fg()),
				"function" != typeof e)
			)
				throw new TypeError("The callback provided as parameter 1 is not a function.");
			(this.callback_ = e), (this.controller_ = t), (this.callbackCtx_ = n);
		}
		var lv = new ("undefined" != typeof WeakMap ? WeakMap : Fg)(),
			cv = function e(t) {
				if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
				if (!arguments.length)
					throw new TypeError("1 argument required, but only 0 present.");
				var n = Wg.getInstance(),
					t = new sv(t, n, this);
				lv.set(this, t);
			};
		["observe", "unobserve", "disconnect"].forEach(function (t) {
			cv.prototype[t] = function () {
				var e;
				return (e = lv.get(this))[t].apply(e, arguments);
			};
		});
		var uv,
			dv,
			pv,
			hv = void 0 !== Vg.ResizeObserver ? Vg.ResizeObserver : cv,
			fv =
				(be(mv, (uv = Dg)),
				(mv.prototype.execCommand = function (e) {
					e = Ui(e.target, "li");
					this.props.execCommand("heading", {
						level: Number(e.getAttribute("data-level"))
					});
				}),
				(mv.prototype.render = function () {
					var t = this;
					return We(
						(pv =
							pv ||
							ke(
								[
									"\n      <ul\n        onClick=",
									'\n        aria-role="menu"\n        aria-label="',
									'"\n      >\n        ',
									'\n        <li data-type="Paragraph" aria-role="menuitem">\n          <div>',
									"</div>\n        </li>\n      </ul>\n    "
								],
								[
									"\n      <ul\n        onClick=",
									'\n        aria-role="menu"\n        aria-label="',
									'"\n      >\n        ',
									'\n        <li data-type="Paragraph" aria-role="menuitem">\n          <div>',
									"</div>\n        </li>\n      </ul>\n    "
								]
							)),
						function (e) {
							return t.execCommand(e);
						},
						je.get("Headings"),
						[1, 2, 3, 4, 5, 6].map(function (e) {
							return We(
								(dv =
									dv ||
									ke(
										[
											'\n              <li data-level="',
											'" data-type="Heading" aria-role="menuitem">\n                <',
											">",
											" ",
											"</$>\n              </li>\n            "
										],
										[
											'\n              <li data-level="',
											'" data-type="Heading" aria-role="menuitem">\n                <',
											">",
											" ",
											"</$>\n              </li>\n            "
										]
									)),
								e,
								"h" + e,
								je.get("Heading"),
								e
							);
						}),
						je.get("Paragraph")
					);
				}),
				mv);
		function mv() {
			return (null !== uv && uv.apply(this, arguments)) || this;
		}
		be(wv, (gv = Dg)),
			(wv.prototype.toggleTab = function (e, t) {
				this.props.onClick(e, t);
			}),
			(wv.prototype.render = function () {
				var r = this;
				return We(
					(yv =
						yv ||
						ke(
							[
								'\n      <div class="',
								'" aria-role="tabpanel">\n        ',
								"\n      </div>\n    "
							],
							[
								'\n      <div class="',
								'" aria-role="tabpanel">\n        ',
								"\n      </div>\n    "
							]
						)),
					Ne("tabs"),
					this.props.tabs.map(function (e) {
						var t = e.name,
							e = e.text,
							n = r.props.activeTab === t;
						return We(
							(vv =
								vv ||
								ke(
									[
										'\n            <div\n              class="tab-item',
										'"\n              onClick=',
										'\n              aria-role="tab"\n              aria-label="',
										'"\n              aria-selected="',
										'"\n              tabindex="',
										'"\n            >\n              ',
										"\n            </div>\n          "
									],
									[
										'\n            <div\n              class="tab-item',
										'"\n              onClick=',
										'\n              aria-role="tab"\n              aria-label="',
										'"\n              aria-selected="',
										'"\n              tabindex="',
										'"\n            >\n              ',
										"\n            </div>\n          "
									]
								)),
							n ? " active" : "",
							function (e) {
								return r.toggleTab(e, t);
							},
							je.get(e),
							n ? "true" : "false",
							n ? "0" : "-1",
							je.get(e)
						);
					})
				);
			});
		var gv,
			vv,
			yv,
			bv = wv;
		function wv() {
			return (null !== gv && gv.apply(this, arguments)) || this;
		}
		be(Tv, (kv = Dg)),
			(Tv.prototype.emitAddImageBlob = function () {
				var n = this,
					e = this.refs.file.files,
					r = this.refs.altText,
					t = " wrong";
				null != e &&
					e.length &&
					((t = ""),
					(e = e.item(0)),
					this.props.eventEmitter.emit(
						"addImageBlobHook",
						e,
						function (e, t) {
							return n.props.execCommand("addImage", {
								imageUrl: e,
								altText: t || r.value
							});
						},
						"ui"
					)),
					this.setState({ fileNameElClassName: t });
			}),
			(Tv.prototype.emitAddImage = function () {
				var e = this.refs.url,
					t = this.refs.altText,
					n = e.value,
					t = t.value || "image";
				It()(e, "wrong"),
					n.length
						? n && this.props.execCommand("addImage", { imageUrl: n, altText: t })
						: Lt()(e, "wrong");
			}),
			(Tv.prototype.preventSelectStart = function (e) {
				e.preventDefault();
			}),
			(Tv.prototype.updated = function () {
				this.props.show || this.initialize();
			}),
			(Tv.prototype.render = function () {
				var t = this,
					e = this.state,
					n = e.activeTab,
					r = e.file,
					e = e.fileNameElClassName;
				return We(
					(xv =
						xv ||
						ke(
							[
								'\n      <div aria-label="',
								'">\n        <',
								" tabs=",
								" activeTab=",
								" onClick=",
								' />\n        <div style="display:',
								'">\n          <label for="toastuiImageUrlInput">',
								'</label>\n          <input\n            id="toastuiImageUrlInput"\n            type="text"\n            ref=',
								'\n          />\n        </div>\n        <div style="display:',
								';position: relative;">\n          <label for="toastuiImageFileInput">',
								'</label>\n          <span\n            class="',
								"",
								'"\n            onClick=',
								"\n            onSelectstart=",
								"\n          >\n            ",
								'\n          </span>\n          <button\n            type="button"\n            class="',
								'"\n            onClick=',
								"\n          >\n            ",
								'\n          </button>\n          <input\n            id="toastuiImageFileInput"\n            type="file"\n            accept="image/*"\n            onChange=',
								"\n            ref=",
								'\n          />\n        </div>\n        <label for="toastuiAltTextInput">',
								'</label>\n        <input\n          id="toastuiAltTextInput"\n          type="text"\n          ref=',
								'\n        />\n        <div class="',
								'">\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								'\n          </button>\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								"\n          </button>\n        </div>\n      </div>\n    "
							],
							[
								'\n      <div aria-label="',
								'">\n        <',
								" tabs=",
								" activeTab=",
								" onClick=",
								' />\n        <div style="display:',
								'">\n          <label for="toastuiImageUrlInput">',
								'</label>\n          <input\n            id="toastuiImageUrlInput"\n            type="text"\n            ref=',
								'\n          />\n        </div>\n        <div style="display:',
								';position: relative;">\n          <label for="toastuiImageFileInput">',
								'</label>\n          <span\n            class="',
								"",
								'"\n            onClick=',
								"\n            onSelectstart=",
								"\n          >\n            ",
								'\n          </span>\n          <button\n            type="button"\n            class="',
								'"\n            onClick=',
								"\n          >\n            ",
								'\n          </button>\n          <input\n            id="toastuiImageFileInput"\n            type="file"\n            accept="image/*"\n            onChange=',
								"\n            ref=",
								'\n          />\n        </div>\n        <label for="toastuiAltTextInput">',
								'</label>\n        <input\n          id="toastuiAltTextInput"\n          type="text"\n          ref=',
								'\n        />\n        <div class="',
								'">\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								'\n          </button>\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								"\n          </button>\n        </div>\n      </div>\n    "
							]
						)),
					je.get("Insert image"),
					bv,
					this.tabs,
					n,
					this.toggleTab,
					"url" === n ? "block" : "none",
					je.get("Image URL"),
					function (e) {
						return (t.refs.url = e);
					},
					"file" === n ? "block" : "none",
					je.get("Select image file"),
					Ne("file-name"),
					r ? " has-file" : e,
					this.showFileSelectBox,
					this.preventSelectStart,
					r ? r.name : je.get("No file"),
					Ne("file-select-button"),
					this.showFileSelectBox,
					je.get("Choose a file"),
					this.changeFile,
					function (e) {
						return (t.refs.file = e);
					},
					je.get("Description"),
					function (e) {
						return (t.refs.altText = e);
					},
					Ne("button-container"),
					Ne("close-button"),
					this.props.hidePopup,
					je.get("Cancel"),
					Ne("ok-button"),
					this.execCommand,
					je.get("OK")
				);
			});
		var kv,
			xv,
			Cv = Tv;
		function Tv(e) {
			var n = kv.call(this, e) || this;
			return (
				(n.initialize = function (e) {
					void 0 === e && (e = "file");
					var t = n.refs.url;
					(t.value = ""),
						(n.refs.altText.value = ""),
						(n.refs.file.value = ""),
						It()(t, "wrong"),
						n.setState({ activeTab: e, file: null, fileNameElClassName: "" });
				}),
				(n.execCommand = function () {
					"file" === n.state.activeTab ? n.emitAddImageBlob() : n.emitAddImage();
				}),
				(n.toggleTab = function (e, t) {
					t !== n.state.activeTab && n.initialize(t);
				}),
				(n.showFileSelectBox = function () {
					n.refs.file.click();
				}),
				(n.changeFile = function (e) {
					e = e.target.files;
					null != e && e.length && n.setState({ file: e[0] });
				}),
				(n.state = { activeTab: "file", file: null, fileNameElClassName: "" }),
				(n.tabs = [
					{ name: "file", text: "File" },
					{ name: "url", text: "URL" }
				]),
				n
			);
		}
		be(Nv, (Mv = Dg)),
			(Nv.prototype.initialize = function () {
				var e = this.props.initialValues,
					t = e.linkUrl,
					e = e.linkText,
					n = this.refs.url,
					r = this.refs.text;
				It()(n, "wrong"),
					It()(r, "wrong", "disabled"),
					r.removeAttribute("disabled"),
					t && (Lt()(r, "disabled"), r.setAttribute("disabled", "disabled")),
					(n.value = t || ""),
					(r.value = e || "");
			}),
			(Nv.prototype.mounted = function () {
				this.initialize();
			}),
			(Nv.prototype.updated = function (e) {
				!e.show && this.props.show && this.initialize();
			}),
			(Nv.prototype.render = function () {
				var t = this;
				return We(
					(Sv =
						Sv ||
						ke(
							[
								'\n      <div aria-label="',
								'">\n        <label for="toastuiLinkUrlInput">',
								'</label>\n        <input\n          id="toastuiLinkUrlInput"\n          type="text"\n          ref=',
								'\n        />\n        <label for="toastuiLinkTextInput">',
								'</label>\n        <input\n          id="toastuiLinkTextInput"\n          type="text"\n          ref=',
								'\n        />\n        <div class="',
								'">\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								'\n          </button>\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								"\n          </button>\n        </div>\n      </div>\n    "
							],
							[
								'\n      <div aria-label="',
								'">\n        <label for="toastuiLinkUrlInput">',
								'</label>\n        <input\n          id="toastuiLinkUrlInput"\n          type="text"\n          ref=',
								'\n        />\n        <label for="toastuiLinkTextInput">',
								'</label>\n        <input\n          id="toastuiLinkTextInput"\n          type="text"\n          ref=',
								'\n        />\n        <div class="',
								'">\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								'\n          </button>\n          <button type="button" class="',
								'" onClick=',
								">\n            ",
								"\n          </button>\n        </div>\n      </div>\n    "
							]
						)),
					je.get("Insert link"),
					je.get("URL"),
					function (e) {
						return (t.refs.url = e);
					},
					je.get("Link text"),
					function (e) {
						return (t.refs.text = e);
					},
					Ne("button-container"),
					Ne("close-button"),
					this.props.hidePopup,
					je.get("Cancel"),
					Ne("ok-button"),
					this.execCommand,
					je.get("OK")
				);
			});
		var Mv,
			Sv,
			Ev = Nv;
		function Nv() {
			var n = (null !== Mv && Mv.apply(this, arguments)) || this;
			return (
				(n.execCommand = function () {
					var e = n.refs.url,
						t = n.refs.text;
					It()(e, "wrong"),
						It()(t, "wrong"),
						e.value.length < 1
							? Lt()(e, "wrong")
							: Bt()(n.props.initialValues.linkUrl) && t.value.length < 1
								? Lt()(t, "wrong")
								: n.props.execCommand("addLink", {
										linkUrl: e.value,
										linkText: t.value
									});
				}),
				n
			);
		}
		be(Pv, (Ov = Dg)),
			(Pv.prototype.getDescription = function () {
				return -1 === this.state.colIdx
					? ""
					: this.state.colIdx + 1 + " x " + (this.state.rowIdx + 1);
			}),
			(Pv.prototype.getBoundByRange = function (e, t) {
				return { width: 20 * (e + 1), height: 20 * (t + 1) };
			}),
			(Pv.prototype.getRangeByOffset = function (e, t) {
				return { colIdx: Math.floor(e / 20), rowIdx: Math.floor(t / 20) };
			}),
			(Pv.prototype.getTableRange = function () {
				var e = this.state,
					t = e.colIdx,
					e = e.rowIdx,
					n = Math.max(t, 5),
					r = Math.max(e, 5);
				return (
					5 <= t && n < 9 && (n += 1),
					5 <= e && r < 14 && (r += 1),
					{ colIdx: n + 1, rowIdx: r + 1 }
				);
			}),
			(Pv.prototype.getSelectionAreaBound = function () {
				var e = this.getBoundByRange(this.state.colIdx, this.state.rowIdx),
					t = e.width,
					e = e.height;
				return t || e
					? { width: t - 1, height: e - 1, display: "block" }
					: { display: "none" };
			}),
			(Pv.prototype.getSelectionRangeByOffset = function (e, t) {
				e = this.getRangeByOffset(e, t);
				return (
					(e.rowIdx = Math.min(Math.max(e.rowIdx, 1), 14)),
					(e.colIdx = Math.min(Math.max(e.colIdx, 1), 9)),
					e
				);
			}),
			(Pv.prototype.updated = function () {
				var e, t;
				this.props.show
					? -1 === this.state.colIdx &&
						-1 === this.state.rowIdx &&
						((t = (e = this.refs.tableEl.getBoundingClientRect()).left),
						(this.offsetRect = {
							left: window.pageXOffset + t,
							top: window.pageYOffset + e.top
						}))
					: this.setState({ colIdx: -1, rowIdx: -1 });
			}),
			(Pv.prototype.createTableArea = function (e) {
				for (var t = e.colIdx, n = e.rowIdx, r = [], o = 0; o < n; o += 1) {
					for (var i = [], s = 0; s < t; s += 1) {
						var a = Ne("table-cell") + (0 < o ? "" : " header");
						i.push(
							We(
								(Dv =
									Dv ||
									ke(['<div class="', '"></div>'], ['<div class="', '"></div>'])),
								a
							)
						);
					}
					r.push(
						We(
							(Av =
								Av ||
								ke(
									['<div class="', '">', "</div>"],
									['<div class="', '">', "</div>"]
								)),
							Ne("table-row"),
							i
						)
					);
				}
				return We(
					(Lv =
						Lv ||
						ke(['<div class="', '">', "</div>"], ['<div class="', '">', "</div>"])),
					Ne("table"),
					r
				);
			}),
			(Pv.prototype.render = function () {
				var t = this,
					e = this.getTableRange(),
					n = this.getSelectionAreaBound();
				return We(
					(Iv =
						Iv ||
						ke(
							[
								'\n      <div aria-label="',
								'">\n        <div\n          class="',
								'"\n          ref=',
								"\n          onMousemove=",
								"\n          onClick=",
								"\n        >\n          ",
								'\n          <div class="',
								'" style=',
								'></div>\n        </div>\n        <p class="',
								'">',
								"</p>\n      </div>\n    "
							],
							[
								'\n      <div aria-label="',
								'">\n        <div\n          class="',
								'"\n          ref=',
								"\n          onMousemove=",
								"\n          onClick=",
								"\n        >\n          ",
								'\n          <div class="',
								'" style=',
								'></div>\n        </div>\n        <p class="',
								'">',
								"</p>\n      </div>\n    "
							]
						)),
					je.get("Insert table"),
					Ne("table-selection"),
					function (e) {
						return (t.refs.tableEl = e);
					},
					this.extendSelectionRange,
					this.execCommand,
					this.createTableArea(e),
					Ne("table-selection-layer"),
					n,
					Ne("table-description"),
					this.getDescription()
				);
			});
		var Ov,
			Dv,
			Av,
			Lv,
			Iv,
			Rv = Pv;
		function Pv(e) {
			var n = Ov.call(this, e) || this;
			return (
				(n.extendSelectionRange = function (e) {
					var t = e.pageX - n.offsetRect.left,
						e = e.pageY - n.offsetRect.top,
						t = n.getSelectionRangeByOffset(t, e);
					n.setState(we({}, t));
				}),
				(n.execCommand = function () {
					n.props.execCommand("addTable", {
						rowCount: n.state.rowIdx + 1,
						columnCount: n.state.colIdx + 1
					});
				}),
				(n.state = { rowIdx: -1, colIdx: -1 }),
				n
			);
		}
		be(_v, (Bv = Dg)),
			(_v.prototype.mounted = function () {
				this.refs.el.appendChild(this.props.body);
			}),
			(_v.prototype.updated = function (e) {
				this.refs.el.replaceChild(this.props.body, e.body);
			}),
			(_v.prototype.render = function () {
				var t = this;
				return We(
					(Fv = Fv || ke(["<div ref=", "></div>"], ["<div ref=", "></div>"])),
					function (e) {
						return (t.refs.el = e);
					}
				);
			});
		var Bv,
			Fv,
			Hv,
			zv,
			qv,
			Vv,
			jv,
			$v = _v;
		function _v() {
			return (null !== Bv && Bv.apply(this, arguments)) || this;
		}
		function Uv(e) {
			if (Rt()(e)) {
				var t;
				switch (e) {
					case "heading":
						t = {
							name: "heading",
							className: "heading",
							tooltip: je.get("Headings"),
							state: "heading"
						};
						break;
					case "bold":
						t = {
							name: "bold",
							className: "bold",
							command: "bold",
							tooltip: je.get("Bold"),
							state: "strong"
						};
						break;
					case "italic":
						t = {
							name: "italic",
							className: "italic",
							command: "italic",
							tooltip: je.get("Italic"),
							state: "emph"
						};
						break;
					case "strike":
						t = {
							name: "strike",
							className: "strike",
							command: "strike",
							tooltip: je.get("Strike"),
							state: "strike"
						};
						break;
					case "hr":
						t = {
							name: "hr",
							className: "hrline",
							command: "hr",
							tooltip: je.get("Line"),
							state: "thematicBreak"
						};
						break;
					case "quote":
						t = {
							name: "quote",
							className: "quote",
							command: "blockQuote",
							tooltip: je.get("Blockquote"),
							state: "blockQuote"
						};
						break;
					case "ul":
						t = {
							name: "ul",
							className: "bullet-list",
							command: "bulletList",
							tooltip: je.get("Unordered list"),
							state: "bulletList"
						};
						break;
					case "ol":
						t = {
							name: "ol",
							className: "ordered-list",
							command: "orderedList",
							tooltip: je.get("Ordered list"),
							state: "orderedList"
						};
						break;
					case "task":
						t = {
							name: "task",
							className: "task-list",
							command: "taskList",
							tooltip: je.get("Task"),
							state: "taskList"
						};
						break;
					case "table":
						t = {
							name: "table",
							className: "table",
							tooltip: je.get("Insert table"),
							state: "table"
						};
						break;
					case "image":
						t = { name: "image", className: "image", tooltip: je.get("Insert image") };
						break;
					case "link":
						t = { name: "link", className: "link", tooltip: je.get("Insert link") };
						break;
					case "code":
						t = {
							name: "code",
							className: "code",
							command: "code",
							tooltip: je.get("Code"),
							state: "code"
						};
						break;
					case "codeblock":
						t = {
							name: "codeblock",
							className: "codeblock",
							command: "codeBlock",
							tooltip: je.get("Insert CodeBlock"),
							state: "codeBlock"
						};
						break;
					case "indent":
						t = {
							name: "indent",
							className: "indent",
							command: "indent",
							tooltip: je.get("Indent"),
							state: "indent"
						};
						break;
					case "outdent":
						t = {
							name: "outdent",
							className: "outdent",
							command: "outdent",
							tooltip: je.get("Outdent"),
							state: "outdent"
						};
						break;
					case "scrollSync":
						t = (() => {
							var n = document.createElement("label"),
								e = document.createElement("input"),
								t = document.createElement("span");
							return (
								(n.className = "scroll-sync active"),
								(e.type = "checkbox"),
								(e.checked = !0),
								(t.className = "switch"),
								n.appendChild(e),
								n.appendChild(t),
								{
									name: "scrollSync",
									el: n,
									onMounted: function (t) {
										return e.addEventListener("change", function (e) {
											e = e.target.checked;
											(e ? Lt : It)()(n, "active"),
												t("toggleScrollSync", { active: e });
										});
									}
								}
							);
						})();
						break;
					case "more":
						t = { name: "more", className: "more", tooltip: je.get("More") };
				}
				return "scrollSync" !== t.name && (t.className += " " + Ne("toolbar-icons")), t;
			}
			return e;
		}
		function Wv(e, t) {
			var n = t.el,
				r = t.pos,
				o = t.popup,
				i = t.initialValues;
			switch (e) {
				case "heading":
					return {
						render: function (e) {
							return We(
								(Hv = Hv || ke(["<", " ...", " />"], ["<", " ...", " />"])),
								fv,
								e
							);
						},
						className: Ne("popup-add-heading"),
						fromEl: n,
						pos: r
					};
				case "link":
					return {
						render: function (e) {
							return We(
								(zv = zv || ke(["<", " ...", " />"], ["<", " ...", " />"])),
								Ev,
								e
							);
						},
						className: Ne("popup-add-link"),
						fromEl: n,
						pos: r,
						initialValues: i
					};
				case "image":
					return {
						render: function (e) {
							return We(
								(qv = qv || ke(["<", " ...", " />"], ["<", " ...", " />"])),
								Cv,
								e
							);
						},
						className: Ne("popup-add-image"),
						fromEl: n,
						pos: r
					};
				case "table":
					return {
						render: function (e) {
							return We(
								(Vv = Vv || ke(["<", " ...", " />"], ["<", " ...", " />"])),
								Rv,
								e
							);
						},
						className: Ne("popup-add-table"),
						fromEl: n,
						pos: r
					};
				case "customPopupBody":
					return o
						? we(
								{
									render: function (e) {
										return We(
											(jv =
												jv ||
												ke(
													["<", " ...", " body=", " />"],
													["<", " ...", " body=", " />"]
												)),
											$v,
											e,
											o.body
										);
									},
									fromEl: n,
									pos: r
								},
								o
							)
						: null;
				default:
					return null;
			}
		}
		function Jv(e) {
			e.hidden =
				e.length ===
				e.filter(function (e) {
					return e.hidden;
				}).length;
		}
		function Gv(e, n) {
			return e.reduce(function (e, t) {
				e.push(
					t.map(function (e) {
						return ((e = Uv(e)).hidden = "scrollSync" === e.name && n), e;
					})
				);
				t = e[(e.length || 1) - 1];
				return t && Jv(t), e;
			}, []);
		}
		be(ey, (Kv = Dg)),
			(ey.prototype.mounted = function () {
				document.addEventListener("mousedown", this.handleMousedown),
					this.props.eventEmitter.listen("closePopup", this.props.hidePopup);
			}),
			(ey.prototype.beforeDestroy = function () {
				document.removeEventListener("mousedown", this.handleMousedown);
			}),
			(ey.prototype.updated = function (e) {
				var t = this.props,
					n = t.show,
					t = t.info;
				n &&
					t.pos &&
					e.show !== n &&
					((e = we({}, t.pos)),
					(n = this.refs.el.offsetWidth),
					(t = Ui(this.refs.el, "." + Ne("toolbar")).offsetWidth),
					e.left + n >= t && (e.left = t - n - 20),
					on(this.state.popupPos, e) || this.setState({ popupPos: e }));
			}),
			(ey.prototype.render = function () {
				var t = this,
					e = this.props,
					n = e.info,
					r = e.show,
					o = e.hidePopup,
					i = e.eventEmitter,
					e = e.execCommand,
					n = n || {},
					s = n.className,
					s = void 0 === s ? "" : s,
					a = n.render,
					l = n.initialValues,
					l = void 0 === l ? {} : l,
					n = we(we({ display: r ? "block" : "none" }, n.style), this.state.popupPos);
				return We(
					(Zv =
						Zv ||
						ke(
							[
								'\n      <div\n        class="',
								" ",
								'"\n        style=',
								"\n        ref=",
								'\n        aria-role="dialog"\n      >\n        <div class="',
								'">\n          ',
								"\n        </div>\n      </div>\n    "
							],
							[
								'\n      <div\n        class="',
								" ",
								'"\n        style=',
								"\n        ref=",
								'\n        aria-role="dialog"\n      >\n        <div class="',
								'">\n          ',
								"\n        </div>\n      </div>\n    "
							]
						)),
					Ne("popup"),
					s,
					n,
					function (e) {
						return (t.refs.el = e);
					},
					Ne("popup-body"),
					a &&
						a({
							eventEmitter: i,
							show: r,
							hidePopup: o,
							execCommand: e,
							initialValues: l
						})
				);
			});
		var Kv,
			Zv,
			Xv,
			Qv,
			Yv = ey;
		function ey() {
			var t = (null !== Kv && Kv.apply(this, arguments)) || this;
			return (
				(t.handleMousedown = function (e) {
					Ui(e.target, "." + Ne("popup")) ||
						Ui(e.target, t.props.info.fromEl) ||
						t.props.hidePopup();
				}),
				t
			);
		}
		function ty(e) {
			return (
				be(t, (n = Dg)),
				(t.prototype.addEvent = function () {
					var n = this,
						e = this.props,
						r = e.item,
						e = e.eventEmitter;
					r.state &&
						e.listen("changeToolbarState", function (e) {
							var e = null != (e = e.toolbarState[r.state]) ? e : {},
								t = e.active,
								e = e.disabled;
							n.setState({ active: !!t, disabled: null != e ? e : n.props.disabled });
						});
				}),
				(t.prototype.getBound = function (e) {
					var t = Wi(e, Ui(e, "." + Ne("toolbar")));
					return { left: t.offsetLeft, top: e.offsetHeight + t.offsetTop };
				}),
				(t.prototype.render = function () {
					return We(
						(Xv =
							Xv ||
							ke(
								[
									"\n        <",
									"\n          ...",
									"\n          active=",
									"\n          showTooltip=",
									"\n          hideTooltip=",
									"\n          getBound=",
									"\n          disabled=",
									"\n        />\n      "
								],
								[
									"\n        <",
									"\n          ...",
									"\n          active=",
									"\n          showTooltip=",
									"\n          hideTooltip=",
									"\n          getBound=",
									"\n          disabled=",
									"\n        />\n      "
								]
							)),
						e,
						this.props,
						this.state.active,
						this.showTooltip,
						this.hideTooltip,
						this.getBound,
						this.state.disabled || this.props.disabled
					);
				}),
				t
			);
			function t(e) {
				var r = n.call(this, e) || this;
				return (
					(r.showTooltip = function (e) {
						var t,
							n = r.props.item.tooltip;
						!r.props.disabled &&
							n &&
							((t = (e = r.getBound(e)).left + 6 + "px"),
							(e = e.top + 6 + "px"),
							At()(r.props.tooltipRef.current, { display: "block", left: t, top: e }),
							(r.props.tooltipRef.current.querySelector(".text").textContent = n));
					}),
					(r.hideTooltip = function () {
						At()(r.props.tooltipRef.current, "display", "none");
					}),
					(r.state = { active: !1, disabled: e.disabled }),
					r.addEvent(),
					r
				);
			}
			var n;
		}
		function ny() {
			var a = (null !== Qv && Qv.apply(this, arguments)) || this;
			return (
				(a.showTooltip = function () {
					a.props.showTooltip(a.refs.el);
				}),
				(a.execCommand = function () {
					var e = a.props,
						t = e.item,
						n = e.execCommand,
						r = e.setPopupInfo,
						o = e.getBound,
						e = e.eventEmitter,
						i = t.command,
						s = t.name,
						t = t.popup;
					i
						? n(i)
						: ((i = e.emit("query", "getPopupInitialValues", {
								popupName: (n = t ? "customPopupBody" : s)
							})[0]),
							(e = Wv(n, {
								el: a.refs.el,
								pos: o(a.refs.el),
								popup: t,
								initialValues: i
							})) && r(e));
				}),
				a
			);
		}
		be(ny, (Qv = Dg)),
			(ny.prototype.mounted = function () {
				this.setItemWidth();
			}),
			(ny.prototype.updated = function (e) {
				e.item.name !== this.props.item.name && this.setItemWidth();
			}),
			(ny.prototype.setItemWidth = function () {
				var e = this.props,
					t = e.setItemWidth,
					e = e.item;
				t && t(e.name, _i(this.refs.el) + (e.hidden ? 80 : 0));
			}),
			(ny.prototype.render = function () {
				var t = this,
					e = this.props,
					n = e.hideTooltip,
					r = e.disabled,
					o = e.item,
					e = e.active,
					i = we({ display: o.hidden ? "none" : null }, o.style),
					e = (o.className || "") + (e ? " active" : "");
				return We(
					(ry =
						ry ||
						ke(
							[
								"\n      <button\n        ref=",
								'\n        type="button"\n        style=',
								"\n        class=",
								"\n        onClick=",
								"\n        onMouseover=",
								"\n        onMouseout=",
								"\n        disabled=",
								"\n        aria-label=",
								"\n      >\n        ",
								"\n      </button>\n    "
							],
							[
								"\n      <button\n        ref=",
								'\n        type="button"\n        style=',
								"\n        class=",
								"\n        onClick=",
								"\n        onMouseover=",
								"\n        onMouseout=",
								"\n        disabled=",
								"\n        aria-label=",
								"\n      >\n        ",
								"\n      </button>\n    "
							]
						)),
					function (e) {
						return (t.refs.el = e);
					},
					i,
					e,
					this.execCommand,
					this.showTooltip,
					n,
					!!r,
					o.text || o.tooltip || "",
					o.text || ""
				);
			});
		var ry,
			oy,
			iy = ty(ny);
		function sy() {
			var t = (null !== oy && oy.apply(this, arguments)) || this;
			return (
				(t.showTooltip = function () {
					t.props.showTooltip(t.refs.el);
				}),
				(t.showPopup = function () {
					var e = Wv("customPopupBody", {
						el: t.refs.el,
						pos: t.props.getBound(t.refs.el),
						popup: t.props.item.popup
					});
					e && t.props.setPopupInfo(e);
				}),
				t
			);
		}
		be(sy, (oy = Dg)),
			(sy.prototype.mounted = function () {
				var e = this.props,
					t = e.setItemWidth,
					e = e.item;
				this.refs.el.appendChild(e.el),
					t && t(e.name, _i(this.refs.el)),
					e.onMounted && e.onMounted(this.props.execCommand);
			}),
			(sy.prototype.updated = function (e) {
				var t = this.props,
					n = t.item,
					r = t.active,
					t = t.disabled;
				(e.active === r && e.disabled === t) ||
					(null != (e = n.onUpdated) && e.call(n, { active: r, disabled: t }));
			}),
			(sy.prototype.render = function () {
				function e(e) {
					return r ? null : e;
				}
				var t = this,
					n = this.props,
					r = n.disabled,
					n = { display: n.item.hidden ? "none" : "inline-block" };
				return We(
					(ay =
						ay ||
						ke(
							[
								"\n      <div\n        ref=",
								"\n        style=",
								"\n        class=",
								"\n        onClick=",
								"\n        onMouseover=",
								"\n        onMouseout=",
								"\n      ></div>\n    "
							],
							[
								"\n      <div\n        ref=",
								"\n        style=",
								"\n        class=",
								"\n        onClick=",
								"\n        onMouseover=",
								"\n        onMouseout=",
								"\n      ></div>\n    "
							]
						)),
					function (e) {
						return (t.refs.el = e);
					},
					n,
					Ne("toolbar-item-wrapper"),
					e(this.showPopup),
					e(this.showTooltip),
					e(this.props.hideTooltip)
				);
			});
		var ay,
			ly,
			cy,
			uy,
			dy,
			py = ty(sy),
			hy =
				(be(fy, (ly = Dg)),
				(fy.prototype.render = function () {
					var n = this,
						e = this.props,
						t = e.group,
						r = t.hidden ? { display: "none" } : null,
						e = e.hiddenDivider ? { display: "none" } : null;
					return We(
						(uy =
							uy ||
							ke(
								[
									'\n      <div class="',
									'" style=',
									">\n        ",
									'\n        <div class="',
									'" style=',
									"></div>\n      </div>\n    "
								],
								[
									'\n      <div class="',
									'" style=',
									">\n        ",
									'\n        <div class="',
									'" style=',
									"></div>\n      </div>\n    "
								]
							)),
						Ne("toolbar-group"),
						r,
						t.map(function (e) {
							var t = e.el ? py : iy;
							return We(
								(cy =
									cy ||
									ke(
										["<", " key=", " ...", " item=", " />"],
										["<", " key=", " ...", " item=", " />"]
									)),
								t,
								e.name,
								n.props,
								e
							);
						}),
						Ne("toolbar-divider"),
						e
					);
				}),
				fy);
		function fy() {
			return (null !== ly && ly.apply(this, arguments)) || this;
		}
		function my(e) {
			var t = dy.call(this, e) || this;
			return (
				(t.handleClickDocument = function (e) {
					e = e.target;
					Ui(e, "." + Ne("dropdown-toolbar")) ||
						Ui(e, ".more") ||
						t.setState({ showDropdown: !1, dropdownPos: null });
				}),
				(t.showTooltip = function () {
					t.props.showTooltip(t.refs.el);
				}),
				(t.state = { showDropdown: !1, dropdownPos: null }),
				t
			);
		}
		be(my, (dy = Dg)),
			(my.prototype.getBound = function () {
				var e = this.props.getBound(this.refs.el);
				return (e.top += 4), we(we({}, e), { left: null, right: 10 });
			}),
			(my.prototype.mounted = function () {
				document.addEventListener("click", this.handleClickDocument);
			}),
			(my.prototype.updated = function () {
				this.state.showDropdown &&
					!this.state.dropdownPos &&
					this.setState({ dropdownPos: this.getBound() });
			}),
			(my.prototype.beforeDestroy = function () {
				document.removeEventListener("click", this.handleClickDocument);
			}),
			(my.prototype.render = function () {
				var n = this,
					e = this.state,
					t = e.showDropdown,
					e = e.dropdownPos,
					r = this.props,
					o = r.disabled,
					i = r.item,
					s = r.items,
					r = r.hideTooltip,
					a = s.filter(function (e) {
						return !e.hidden;
					}),
					s = a.length ? null : { display: "none" },
					t = t ? null : { display: "none" };
				return We(
					(vy =
						vy ||
						ke(
							[
								'\n      <div class="',
								'" style=',
								">\n        <button\n          ref=",
								'\n          type="button"\n          class=',
								"\n          onClick=",
								"\n          onMouseover=",
								"\n          onMouseout=",
								"\n          disabled=",
								'\n        ></button>\n        <div\n          class="',
								'"\n          style=',
								"\n          ref=",
								"\n        >\n          ",
								"\n        </div>\n      </div>\n    "
							],
							[
								'\n      <div class="',
								'" style=',
								">\n        <button\n          ref=",
								'\n          type="button"\n          class=',
								"\n          onClick=",
								"\n          onMouseover=",
								"\n          onMouseout=",
								"\n          disabled=",
								'\n        ></button>\n        <div\n          class="',
								'"\n          style=',
								"\n          ref=",
								"\n        >\n          ",
								"\n        </div>\n      </div>\n    "
							]
						)),
					Ne("toolbar-group"),
					s,
					function (e) {
						return (n.refs.el = e);
					},
					i.className,
					function () {
						return n.setState({ showDropdown: !0 });
					},
					this.showTooltip,
					r,
					o,
					Ne("dropdown-toolbar"),
					we(we({}, t), e),
					function (e) {
						return (n.refs.dropdownEl = e);
					},
					a.length
						? a.map(function (e, t) {
								return We(
									(gy =
										gy ||
										ke(
											[
												"\n                  <",
												"\n                    group=",
												"\n                    hiddenDivider=",
												"\n                    ...",
												"\n                  />\n                "
											],
											[
												"\n                  <",
												"\n                    group=",
												"\n                    hiddenDivider=",
												"\n                    ...",
												"\n                  />\n                "
											]
										)),
									hy,
									e,
									t === a.length - 1 ||
										(null == (e = a[t + 1]) ? void 0 : e.hidden),
									n.props
								);
							})
						: null
				);
			});
		var gy,
			vy,
			yy,
			by,
			wy,
			ky = ty(my),
			xy =
				(be(Cy, (yy = Dg)),
				(Cy.prototype.insertToolbarItem = function (e, t) {
					var n = e.groupIndex,
						e = e.itemIndex,
						n = this.initialItems[n];
					(t = Uv(t)),
						n ? n.splice(e, 0, t) : this.initialItems.push([t]),
						this.setState(this.classifyToolbarItems());
				}),
				(Cy.prototype.removeToolbarItem = function (o) {
					var i = this;
					Qi()(this.initialItems, function (n) {
						var r = !1;
						return (
							Qi()(n, function (e, t) {
								return (
									e.name !== o ||
									((r = !0),
									n.splice(t, 1),
									i.setState(i.classifyToolbarItems()),
									!1)
								);
							}),
							!r
						);
					});
				}),
				(Cy.prototype.addEvent = function () {
					var e = this,
						t = this.props.eventEmitter;
					(this.handleResize = Bg()(function () {
						e.setState({ items: e.initialItems, dropdownItems: [] }),
							e.setState(e.classifyToolbarItems());
					}, 200)),
						t.listen("openPopup", this.openPopup);
				}),
				(Cy.prototype.appendTooltipToRoot = function () {
					var e =
						'<div class="' +
						Ne("tooltip") +
						'" style="display:none">\n        <div class="arrow"></div>\n        <span class="text"></span>\n      </div>';
					this.tooltipRef.current = $i(e, this.refs.el);
				}),
				(Cy.prototype.hiddenScrollSync = function () {
					return "wysiwyg" === this.props.editorType || "tab" === this.props.previewStyle;
				}),
				(Cy.prototype.movePrevItemToDropdownToolbar = function (e, t, n, r) {
					function o(e) {
						(e = e.pop()) && r.push(e);
					}
					1 < e ? o(n) : (e = sn(t)) && o(e);
				}),
				(Cy.prototype.classifyToolbarItems = function () {
					var o = this,
						i = 0,
						s = this.refs.el.clientWidth,
						e = this.refs.el.querySelector("." + Ne("toolbar-divider")),
						a = e ? _i(e) : 0,
						l = [],
						c = [],
						u = !1;
					return (
						this.initialItems.forEach(function (e, t) {
							var n = [],
								r = [];
							e.forEach(function (e, t) {
								e.hidden ||
									((i += o.itemWidthMap[e.name]),
									(s - 50 < i
										? (u ||
												(o.movePrevItemToDropdownToolbar(t, l, n, r),
												(u = !0)),
											r)
										: n
									).push(e));
							}),
								n.length && (Jv(n), l.push(n)),
								r.length && (Jv(r), c.push(r)),
								t < o.state.items.length - 1 && (i += a);
						}),
						{ items: l, dropdownItems: c }
					);
				}),
				(Cy.prototype.mounted = function () {
					"tab" === this.props.previewStyle &&
						this.props.eventEmitter.emit("changePreviewTabWrite", !0),
						this.setState(this.classifyToolbarItems()),
						this.appendTooltipToRoot(),
						this.resizeObserver.observe(this.refs.el);
				}),
				(Cy.prototype.updated = function (e) {
					var t,
						n = this.props,
						r = n.editorType,
						o = n.previewStyle,
						n = n.eventEmitter,
						i = o !== e.previewStyle;
					(!i && r === e.editorType) ||
						((e = this.initialItems),
						(t = this.hiddenScrollSync()),
						e.forEach(function (e) {
							e.forEach(function (e) {
								return (e.hidden = "scrollSync" === e.name && t);
							}),
								Jv(e);
						}),
						(e = this.classifyToolbarItems()),
						(i || ("tab" === o && "markdown" === r)) &&
							(n.emit("changePreviewTabWrite"), (e.activeTab = "write")),
						this.setState(e));
				}),
				(Cy.prototype.beforeDestroy = function () {
					window.removeEventListener("resize", this.handleResize),
						this.resizeObserver.disconnect(),
						Vi(this.tooltipRef.current);
				}),
				(Cy.prototype.render = function () {
					var n = this,
						e = this.props,
						t = e.previewStyle,
						r = e.eventEmitter,
						e = e.editorType,
						o = this.state,
						i = o.popupInfo,
						s = o.showPopup,
						a = o.activeTab,
						l = o.items,
						o = o.dropdownItems,
						c = {
							eventEmitter: r,
							tooltipRef: this.tooltipRef,
							disabled: "markdown" === e && "tab" === t && "preview" === a,
							execCommand: this.execCommand,
							setPopupInfo: this.setPopupInfo
						},
						u = "tab" === t ? { borderTopLeftRadius: 0 } : null;
					return We(
						(wy =
							wy ||
							ke(
								[
									'\n      <div class="',
									'">\n        <div\n          class="',
									'"\n          style="display: ',
									'"\n        >\n          <',
									" tabs=",
									" activeTab=",
									" onClick=",
									' />\n        </div>\n        <div\n          class="',
									'"\n          ref=',
									"\n          style=",
									"\n        >\n          ",
									"\n          <",
									"\n            item=",
									"\n            items=",
									"\n            ...",
									"\n          />\n        </div>\n        <",
									"\n          info=",
									"\n          show=",
									"\n          eventEmitter=",
									"\n          hidePopup=",
									"\n          execCommand=",
									"\n        />\n      </div>\n    "
								],
								[
									'\n      <div class="',
									'">\n        <div\n          class="',
									'"\n          style="display: ',
									'"\n        >\n          <',
									" tabs=",
									" activeTab=",
									" onClick=",
									' />\n        </div>\n        <div\n          class="',
									'"\n          ref=',
									"\n          style=",
									"\n        >\n          ",
									"\n          <",
									"\n            item=",
									"\n            items=",
									"\n            ...",
									"\n          />\n        </div>\n        <",
									"\n          info=",
									"\n          show=",
									"\n          eventEmitter=",
									"\n          hidePopup=",
									"\n          execCommand=",
									"\n        />\n      </div>\n    "
								]
							)),
						Ne("toolbar"),
						Ne("md-tab-container"),
						"wysiwyg" === e || "vertical" === t ? "none" : "block",
						bv,
						this.tabs,
						a,
						this.toggleTab,
						Ne("defaultUI-toolbar"),
						function (e) {
							return (n.refs.el = e);
						},
						u,
						l.map(function (e, t) {
							return We(
								(by =
									by ||
									ke(
										[
											"\n              <",
											"\n                group=",
											"\n                hiddenDivider=",
											"\n                setItemWidth=",
											"\n                ...",
											"\n              />\n            "
										],
										[
											"\n              <",
											"\n                group=",
											"\n                hiddenDivider=",
											"\n                setItemWidth=",
											"\n                ...",
											"\n              />\n            "
										]
									)),
								hy,
								e,
								t === l.length - 1 || (null == (e = l[t + 1]) ? void 0 : e.hidden),
								n.setItemWidth,
								c
							);
						}),
						ky,
						Uv("more"),
						o,
						c,
						Yv,
						i,
						s,
						r,
						this.hidePopup,
						this.execCommand
					);
				}),
				Cy);
		function Cy(e) {
			var r = yy.call(this, e) || this;
			return (
				(r.toggleTab = function (e, t) {
					var n = r.props.eventEmitter;
					r.state.activeTab !== t &&
						(n.emit(
							"write" === t ? "changePreviewTabWrite" : "changePreviewTabPreview"
						),
						r.setState({ activeTab: t }));
				}),
				(r.setItemWidth = function (e, t) {
					r.itemWidthMap[e] = t;
				}),
				(r.setPopupInfo = function (e) {
					r.setState({ showPopup: !0, popupInfo: e });
				}),
				(r.openPopup = function (e, t) {
					void 0 === t && (t = {});
					var n = r.refs.el.querySelector("." + Ne("toolbar-group") + " ." + e);
					n &&
						(n = Wv(e, {
							el: n,
							pos: {
								left: (e = Wi(n, Ui(n, "." + Ne("toolbar")))).offsetLeft,
								top: n.offsetHeight + e.offsetTop
							},
							initialValues: t
						})) &&
						r.setPopupInfo(n);
				}),
				(r.hidePopup = function () {
					r.state.showPopup && r.setState({ showPopup: !1 });
				}),
				(r.execCommand = function (e, t) {
					r.props.eventEmitter.emit("command", e, t), r.hidePopup();
				}),
				(r.tabs = [
					{ name: "write", text: "Write" },
					{ name: "preview", text: "Preview" }
				]),
				(r.itemWidthMap = {}),
				(r.initialItems = Gv(e.toolbarItems || [], r.hiddenScrollSync())),
				(r.state = {
					items: r.initialItems,
					dropdownItems: [],
					showPopup: !1,
					popupInfo: {},
					activeTab: "write"
				}),
				(r.tooltipRef = { current: null }),
				(r.resizeObserver = new hv(function () {
					return r.handleResize();
				})),
				r.addEvent(),
				r
			);
		}
		be(Oy, (Ty = Dg)),
			(Oy.prototype.addEvent = function () {
				var n = this;
				this.props.eventEmitter.listen("contextmenu", function (e) {
					var t = e.pos;
					n.setState({ pos: t, menuGroups: e.menuGroups });
				});
			}),
			(Oy.prototype.mounted = function () {
				document.addEventListener("click", this.handleClickDocument);
			}),
			(Oy.prototype.beforeDestroy = function () {
				document.removeEventListener("click", this.handleClickDocument);
			}),
			(Oy.prototype.getMenuGroupElements = function () {
				var s = this,
					e = this.state;
				return e.pos
					? e.menuGroups.reduce(function (e, t) {
							var i = [];
							return (
								t.forEach(function (e) {
									var t = e.label,
										n = e.className,
										n = void 0 !== n && n,
										r = e.disabled,
										o = e.onClick;
									i.push(
										We(
											(My =
												My ||
												ke(
													[
														"\n                <li\n                  onClick=",
														'\n                  class="menu-item',
														'"\n                  aria-role="menuitem"\n                >\n                  <span class="',
														'">',
														"</span>\n                </li>\n              "
													],
													[
														"\n                <li\n                  onClick=",
														'\n                  class="menu-item',
														'"\n                  aria-role="menuitem"\n                >\n                  <span class="',
														'">',
														"</span>\n                </li>\n              "
													]
												)),
											function () {
												r || (o(), s.setState({ pos: null }));
											},
											r ? " disabled" : "",
											n,
											t
										)
									);
								}),
								e.push(
									We(
										(Sy =
											Sy ||
											ke(
												[
													'<ul class="menu-group">\n              ',
													"\n            </ul>"
												],
												[
													'<ul class="menu-group">\n              ',
													"\n            </ul>"
												]
											)),
										i
									)
								),
								e
							);
						}, [])
					: [];
			}),
			(Oy.prototype.render = function () {
				var e = we({ display: this.state.pos ? "block" : "none" }, this.state.pos);
				return We(
					(Ey =
						Ey ||
						ke(
							[
								'<div class="',
								'" style=',
								' aria-role="menu">\n      ',
								"\n    </div>"
							],
							[
								'<div class="',
								'" style=',
								' aria-role="menu">\n      ',
								"\n    </div>"
							]
						)),
					Ne("context-menu"),
					e,
					this.getMenuGroupElements()
				);
			});
		var Ty,
			My,
			Sy,
			Ey,
			Ny = Oy;
		function Oy(e) {
			var t = Ty.call(this, e) || this;
			return (
				(t.handleClickDocument = function (e) {
					Ui(e.target, "." + Ne("context-menu")) || t.setState({ pos: null });
				}),
				(t.state = { pos: null, menuGroups: [] }),
				t.addEvent(),
				t
			);
		}
		be(Py, (Dy = Dg)),
			(Py.prototype.mounted = function () {
				var e = this.props.slots,
					t = e.wwEditor,
					n = e.mdEditor,
					e = e.mdPreview;
				this.refs.wwContainer.appendChild(t),
					this.refs.mdContainer.insertAdjacentElement("afterbegin", n),
					this.refs.mdContainer.appendChild(e);
			}),
			(Py.prototype.insertToolbarItem = function (e, t) {
				this.toolbar.insertToolbarItem(e, t);
			}),
			(Py.prototype.removeToolbarItem = function (e) {
				this.toolbar.removeToolbarItem(e);
			}),
			(Py.prototype.render = function () {
				var t = this,
					e = this.props,
					n = e.eventEmitter,
					r = e.hideModeSwitch,
					o = e.toolbarItems,
					e = e.theme,
					i = this.state,
					s = i.hide,
					a = i.previewStyle,
					i = i.editorType,
					s = s ? " hidden" : "",
					l = Ne("markdown" === i ? "md-mode" : "ww-mode"),
					c = Ne("md") + "-" + a + "-style",
					e = Ne(["light" !== e, e + " "]);
				return We(
					(Ly =
						Ly ||
						ke(
							[
								'\n      <div\n        class="',
								"",
								"",
								'"\n        ref=',
								"\n      >\n        <",
								"\n          ref=",
								"\n          eventEmitter=",
								"\n          previewStyle=",
								"\n          toolbarItems=",
								"\n          editorType=",
								'\n        />\n        <div\n          class="',
								" ",
								'"\n          ref=',
								'\n        >\n          <div class="',
								'">\n            <div\n              class="',
								" ",
								'"\n              ref=',
								'\n            >\n              <div class="',
								'"></div>\n            </div>\n            <div\n              class="',
								'"\n              ref=',
								"\n            />\n          </div>\n        </div>\n        ",
								"\n        <",
								" eventEmitter=",
								" />\n      </div>\n    "
							],
							[
								'\n      <div\n        class="',
								"",
								"",
								'"\n        ref=',
								"\n      >\n        <",
								"\n          ref=",
								"\n          eventEmitter=",
								"\n          previewStyle=",
								"\n          toolbarItems=",
								"\n          editorType=",
								'\n        />\n        <div\n          class="',
								" ",
								'"\n          ref=',
								'\n        >\n          <div class="',
								'">\n            <div\n              class="',
								" ",
								'"\n              ref=',
								'\n            >\n              <div class="',
								'"></div>\n            </div>\n            <div\n              class="',
								'"\n              ref=',
								"\n            />\n          </div>\n        </div>\n        ",
								"\n        <",
								" eventEmitter=",
								" />\n      </div>\n    "
							]
						)),
					e,
					Ne("defaultUI"),
					s,
					function (e) {
						return (t.refs.el = e);
					},
					xy,
					function (e) {
						return (t.toolbar = e);
					},
					n,
					a,
					o,
					i,
					Ne("main"),
					l,
					function (e) {
						return (t.refs.editorSection = e);
					},
					Ne("main-container"),
					Ne("md-container"),
					c,
					function (e) {
						return (t.refs.mdContainer = e);
					},
					Ne("md-splitter"),
					Ne("ww-container"),
					function (e) {
						return (t.refs.wwContainer = e);
					},
					!r &&
						We(
							(Ay =
								Ay ||
								ke(
									["<", " eventEmitter=", " editorType=", " />"],
									["<", " eventEmitter=", " editorType=", " />"]
								)),
							Rg,
							n,
							i
						),
					Ny,
					n
				);
			}),
			(Py.prototype.addEvent = function () {
				var e = this.props.eventEmitter;
				e.listen("hide", this.hide),
					e.listen("show", this.show),
					e.listen("changeMode", this.changeMode),
					e.listen("changePreviewStyle", this.changePreviewStyle);
			});
		var Dy,
			Ay,
			Ly,
			Iy,
			Ry = Py;
		function Py(e) {
			var t = Dy.call(this, e) || this,
				n =
					((t.changeMode = function (e) {
						e !== t.state.editorType && t.setState({ editorType: e });
					}),
					(t.changePreviewStyle = function (e) {
						e !== t.state.previewStyle && t.setState({ previewStyle: e });
					}),
					(t.hide = function () {
						t.setState({ hide: !0 });
					}),
					(t.show = function () {
						t.setState({ hide: !1 });
					}),
					e.editorType);
			return (
				(t.state = { editorType: n, previewStyle: e.previewStyle, hide: !1 }),
				t.addEvent(),
				t
			);
		}
		function By(e) {
			var t,
				n = Iy.call(this, e) || this,
				e = Og(
					n.options.el,
					We(
						(Fy =
							Fy ||
							ke(
								[
									"\n        <",
									"\n          ref=",
									"\n          eventEmitter=",
									"\n          slots=",
									"\n          hideModeSwitch=",
									"\n          toolbarItems=",
									"\n          previewStyle=",
									"\n          editorType=",
									"\n          theme=",
									"\n        />\n      "
								],
								[
									"\n        <",
									"\n          ref=",
									"\n          eventEmitter=",
									"\n          slots=",
									"\n          hideModeSwitch=",
									"\n          toolbarItems=",
									"\n          previewStyle=",
									"\n          editorType=",
									"\n          theme=",
									"\n        />\n      "
								]
							)),
						Ry,
						function (e) {
							return (t = e);
						},
						n.eventEmitter,
						n.getEditorElements(),
						n.options.hideModeSwitch,
						n.options.toolbarItems,
						n.options.previewStyle,
						n.options.initialEditType,
						n.options.theme
					)
				);
			return (
				n.setMinHeight(n.options.minHeight),
				n.setHeight(n.options.height),
				(n.defaultUI = {
					insertToolbarItem: t.insertToolbarItem.bind(t),
					removeToolbarItem: t.removeToolbarItem.bind(t),
					destroy: e
				}),
				null != (e = n.pluginInfo.toolbarItems) &&
					e.forEach(function (e) {
						var t = e.groupIndex;
						n.defaultUI.insertToolbarItem(
							{ groupIndex: t, itemIndex: e.itemIndex },
							e.item
						);
					}),
				n.eventEmitter.emit("loadUI", n),
				n
			);
		}
		be(By, (Iy = Re)),
			(By.factory = function (e) {
				return new (e.viewer ? eg : By)(e);
			}),
			(By.prototype.insertToolbarItem = function (e, t) {
				this.defaultUI.insertToolbarItem(e, t);
			}),
			(By.prototype.removeToolbarItem = function (e) {
				this.defaultUI.removeToolbarItem(e);
			}),
			(By.prototype.destroy = function () {
				Iy.prototype.destroy.call(this), this.defaultUI.destroy();
			});
		var Fy,
			xe = By,
			Hy =
				(Re.setLanguage(["en", "en-US"], {
					Markdown: "Markdown",
					WYSIWYG: "WYSIWYG",
					Write: "Write",
					Preview: "Preview",
					Headings: "Headings",
					Paragraph: "Paragraph",
					Bold: "Bold",
					Italic: "Italic",
					Strike: "Strike",
					Code: "Inline code",
					Line: "Line",
					Blockquote: "Blockquote",
					"Unordered list": "Unordered list",
					"Ordered list": "Ordered list",
					Task: "Task",
					Indent: "Indent",
					Outdent: "Outdent",
					"Insert link": "Insert link",
					"Insert CodeBlock": "Insert codeBlock",
					"Insert table": "Insert table",
					"Insert image": "Insert image",
					Heading: "Heading",
					"Image URL": "Image URL",
					"Select image file": "Select image file",
					"Choose a file": "Choose a file",
					"No file": "No file",
					Description: "Description",
					OK: "OK",
					More: "More",
					Cancel: "Cancel",
					File: "File",
					URL: "URL",
					"Link text": "Link text",
					"Add row to up": "Add row to up",
					"Add row to down": "Add row to down",
					"Add column to left": "Add column to left",
					"Add column to right": "Add column to right",
					"Remove row": "Remove row",
					"Remove column": "Remove column",
					"Align column to left": "Align column to left",
					"Align column to center": "Align column to center",
					"Align column to right": "Align column to right",
					"Remove table": "Remove table",
					"Would you like to paste as table?": "Would you like to paste as table?",
					"Text color": "Text color",
					"Auto scroll enabled": "Auto scroll enabled",
					"Auto scroll disabled": "Auto scroll disabled",
					"Choose language": "Choose language"
				}),
				xe);
	}
	return et.default;
});
