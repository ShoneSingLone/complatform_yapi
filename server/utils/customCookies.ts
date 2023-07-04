/*  if (cookieJsonStr) {
	   // 将cookie字符串分割成单个cookie
	   var cookieArr = cookieJsonStr.split(';');
	   // 遍历所有cookie并解析它们
	   cookieArr.forEach(function (cookie) {
		   var parts = cookie.split('=');
		   var name = parts[0].trim();
		   var value = parts[1].trim();
		   cookies[name] = value;
	   });
   } */

function getCookiesFromCtx(ctx) {
	let _cookies = false;
	try {
		_cookies = JSON.parse(ctx.header["x-cookies"]);
	} catch (error) {}

	/* ws可能无法从header里获取x-cookies */
	if (!_cookies) {
		try {
			/* 如果跨域的ws */
			_cookies = JSON.parse(ctx.query["x-cookies"]);
		} catch (error) {}
	}

	if (_cookies) {
		ctx.xCookies = _cookies;
	}

	return ctx.xCookies || {};
}

exports.customCookies = (ctx, key, value, options) => {
	let xCookies = getCookiesFromCtx(ctx);
	const isSet = value !== undefined;
	if (isSet) {
		ctx.cookies.set(key, value, options);
		xCookies[key] = value;
		const xCookiesString = JSON.stringify(xCookies);
		ctx.set("x-cookies", xCookiesString);
	} else {
		return xCookies[key];
	}
};
