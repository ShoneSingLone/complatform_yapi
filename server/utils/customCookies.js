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

function Cookies(ctx) {
    if (ctx.xCookies) {
        return ctx.xCookies;
    } else {
        ctx.xCookies = {};
        try {
            let _cookies = JSON.parse(ctx.header['x-cookies']);
            if (_cookies) {
                ctx.xCookies = _cookies;
            }
        } catch (error) {

        }
        return ctx.xCookies;
    }
}


exports.customCookies = (ctx, key, value) => {
    let xCookies = Cookies(ctx);
    const isSet = value !== undefined;
    if (isSet) {
        ctx.cookies.set(key, value);
        xCookies[key] = value;
        ctx.set('x-cookies', JSON.stringify(xCookies));
    } else {
        value = ctx.cookies.get(key);
        if (!value) {
            value = xCookies[key];
        }
        return value;
    }
};