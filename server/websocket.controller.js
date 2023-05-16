const BaseController = require('server/controllers/base.js');

const { yapi } = global;


function send(msg) {
    return JSON.stringify(msg);
}

exports.useWS = () => async (ctx, next) => {
    console.log("app websocket", ctx.path);
    const PATH_STRATEGY = new Map();

    PATH_STRATEGY.set(`/ws/api/interface/solve_conflict`, async () => {
        const vm = new interfaceController(ctx);
        await vm.checkLogin(ctx);
        return await vm.solveConflict(ctx);
    });

    try {
        /* complatform项目使用 /ws/api前缀 */
        const controller = PATH_STRATEGY.get(ctx.path);
        if (controller) {
            return controller();
        } else {
            /* 默认的root */
            const vm = new BaseController(ctx);
            await vm.checkLogin(ctx);
            console.log("ws", ctx.path, vm.$user);
            if (vm.$user) {
                ctx.websocket.send(send({ msg: `Hello ${vm.$user.username}`, id: vm.$uid }));
                ctx.websocket.on('message', (message) => {
                    ctx.websocket.send(JSON.stringify({ id: vm.$uid, msg: message.toString() }));
                });
                ctx.websocket.on('close', async () => {
                });
            }
        }
        return next();
    } catch (error) {
        yapi.commons.log(error, 'error');
    }
};

