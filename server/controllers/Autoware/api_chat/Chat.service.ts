async function sendAndSaveMessage(to_id, message, msg = 'ok') {
    const { app, service } = this;
    let current_user_id = this.authUser.id;

    // 拿到接受用户所在子进程
    let pid = await service.cache.get('online_' + to_id);

    if (pid) {
        // 消息推送
        app.messenger.sendTo(pid, 'send', {
            to_id, message, msg
        });
        // 存到历史记录当中
        if (msg === 'ok') {
            service.cache.setList(`chatlog_${to_id}_${message.chat_type}_${current_user_id}`, message);
        }
    } else {
        service.cache.setList('getmessage_' + to_id, {
            message,
            msg
        });
    }

    // 拿到对方的socket
    // let socket = app.ws.user[to_id];
    // 验证对方是否在线？不在线记录到待接收消息队列中；在线，消息推送，存储到对方的聊天记录中 chatlog_对方用户id_user_当前用户id
    // if (app.ws.user && app.ws.user[to_id]) {
    //     // 消息推送
    //     app.ws.user[to_id].send(JSON.stringify({
    //         msg,
    //         data: message
    //     }));
    //     // 存到历史记录当中
    //     if (msg === 'ok') {
    //         service.cache.setList(`chatlog_${to_id}_${message.chat_type}_${current_user_id}`, message);
    //     }
    // } else {
    //     service.cache.setList('getmessage_' + to_id, {
    //         message,
    //         msg
    //     });
    // }
},
