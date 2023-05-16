const BaseController = require('server/controllers/base.js');
const _ = require("lodash");
const { yapi } = global;
const wsUsers = new Map();
yapi.users = wsUsers;

exports.useWS = () => async (ctx, next) => {
    console.log("app websocket", ctx.path);
    const PATH_STRATEGY = new Map();

    PATH_STRATEGY.set(`/ws/api/interface/solve_conflict`, async () => {
        const vm = new interfaceController(ctx);
        await vm.checkLogin(ctx);
        return await vm.solveConflict(ctx);
    });
    PATH_STRATEGY.set(`/ws`, async () => {
        /* 默认的root */
        const vm = new BaseController(ctx);
        await vm.checkLogin(ctx);
        console.log("ws", ctx.path, vm.$user);
        if (vm.$user) {
            wsUsers.set(vm.$uid, vm.$user);
            ctx.websocket.send(send({
                type: "login",
                payload: {
                    username: vm.$user.username,
                    users: Array.from(wsUsers, user => _.pick(user[1], ["_id", "username", "email"]))
                }
            }));

            function send(msg) {
                try {
                    return JSON.stringify(msg);
                } catch (error) {
                    return "{}";
                }
            }

            function reforward(data) {
                return send(data);
            }
            const handlerMap = new Map();

            handlerMap.set('connect', reforward);
            handlerMap.set('message', reforward);
            handlerMap.set('login', reforward);
            handlerMap.set('typing', reforward);
            handlerMap.set('stop-typing', reforward);
            handlerMap.set('logout', reforward);

            ctx.websocket.on('message', (paramsString) => {
                try {
                    const data = JSON.parse(paramsString);
                    const { type } = data;
                    const handler = handlerMap.get(type);
                    ctx.websocket.send(handler(data));
                } catch (error) {
                    console.error(error);
                }
            });
            ctx.websocket.on('close', async () => {
                wsUsers.delete(vm.$uid);
            });
        }
    });

    try {
        /* complatform项目使用 /ws/api前缀 */
        const controller = PATH_STRATEGY.get(ctx.path);
        if (controller) {
            return controller();
        }
        return next();
    } catch (error) {
        yapi.commons.log(error, 'error');
    }
};

