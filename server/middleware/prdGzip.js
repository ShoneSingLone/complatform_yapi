exports.useGzipWhenPrd = (yapi) => async (ctx, next) => {
    if (/\/prd/.test(ctx.path)) {
        ctx.set('Cache-Control', 'max-age=8640000000');
        if (yapi.commons.fileExist(path.join(yapi.WEBROOT, 'static', ctx.path + '.gz'))) {
            ctx.set('Content-Encoding', 'gzip');
            ctx.path = ctx.path + '.gz';
        }
    }
    await next();
};