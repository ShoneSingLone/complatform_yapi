const qs = require("qs");
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

exports.customCookies = (ctx, key, value, options) => {
	const isSet = value !== undefined;
	if (isSet) {
		ctx.cookies.set(key, value, options);
	} else {
		let val = ctx.cookies.get(key);
		if (val) {
			return val;
		}
		return ctx.query[key];
	}
};
