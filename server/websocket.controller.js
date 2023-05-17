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
            wsUsers.set(vm.$uid, { vm, ctx });
            const users = Array.from(wsUsers, ({ vm }) => _.pick(vm.$user, ["_id", "username", "email"]));

            toAllClient({
                payload: send({
                    type: "login",
                    payload: {
                        username: vm.$user.username,
                        users
                    }
                })
            });


            ctx.websocket.on('message', (paramsString) => {
                try {
                    const data = JSON.parse(paramsString);
                    const { type } = data;
                    const handler = handlerMap.get(type);
                    handler(ctx, data);
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


function send(msg) {
    try {
        return JSON.stringify(msg);
    } catch (error) {
        return "{}";
    }
}

function toAllClient({ payload }) {
    wsUsers.forEach(({ vm, ctx }, uid) => {
        ctx.websocket.send(send(payload));
    });
}

const handlerMap = new Map();

handlerMap.set('connect', toAllClient);
handlerMap.set('message', toAllClient);
handlerMap.set('login', toAllClient);
handlerMap.set('typing', toAllClient);
handlerMap.set('stop-typing', toAllClient);
handlerMap.set('logout', toAllClient);
