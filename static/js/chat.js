(function () {
    const { marked, Vue } = window;
    const { createApp, reactive, defineComponent } = Vue;
    let { host, protocol } = location;
    protocol = 'http:' === protocol ? "ws:" : "wss:";

    let state = {
        inputText: "",
        username: '',
        url: `${protocol}//${host}/ws`,
        users: [],
        messages: [],
        status: '',
        appendMessage: '',
    };
    state = reactive(state);
    const LoginBox = defineComponent({
        name: "LoginBox",
        emits: ["login"],
        data() {
            return {
                show: true,
                username: "",
            };
        },
        setup() {
            return { state };
        },
        template: `<div id="login-box" ref="root" v-if="show">
        <div>
          <h2>Login</h2>
          <input type="url" id="server-url"  v-model="state.url" />
          <input type="text" placeholder="enter username" id="username" ref="username" @keydown="onKeyDown" autofocus v-model="state.username"/>
        </div>
      </div>`,
        methods: {
            focus() {
                this.$refs.username.focus();
            },
            onKeyDown(e) {
                if (e.keyCode === 13) {
                    console.log('🚀:', 'state.username', JSON.stringify(state.username, null, 2));
                    if (state.username && state.url) {
                        this.$emit("login");
                        this.show = false;
                    }
                }
            }
        }
    });


    const UserList = defineComponent({
        name: "UserList",
        setup() {
            return { state };
        },
        template: `<aside>
        <h3>Connected Users</h3>
        <ul id="users">
            <li v-for="user in state.users">
                <div>{{user.username}}</div>
                <div>{{user.email}}</div>
            </li>
        </ul>
        <div id="user-stats">{{state.users.length}} users online.</div>
      </aside>`
    });

    const InputBar = defineComponent({
        name: "InputBar",
        setup() {
            return { state };
        },
        template: `
        <div class="input">
          <input type="text" id="text-input" ref="input" placeholder="say something..." v-model="state.inputText" @input="onInput" @keydown="onKeyDown" />
          <button id="send-btn" @click="onClick">Send</button>
        </div>`,
        methods: {
            onKeyDown(e) {
                if (e.keyCode === 13) {
                    this.send();
                }
            },
            onInput() {
                this.$emit("input", state.inputText);
            },
            onClick() {
                this.send();
            },
            send() {
                if (state.inputText) {
                    this.$emit("send", state.inputText);
                    state.inputText = "";
                }
            },
            focus() {
                this.$refs.input.focus();
            }
        }
    });

    const ChatArea = defineComponent({
        name: "ChatArea",
        setup() {
            return { state };
        },
        computed: {
            msgArray() {
                const opts = { sanitize: true };
                return state.messages.map(msg => `${marked(msg, opts)}\n`);
            }
        },
        template: `<div id="chat">
        <div id="chat-text">
            <div v-for="msg in msgArray" v-html="msg"></div>
        </div>
        <div id="chat-status-msg">{{state.status}}</div>
      </div>`
    });

    const App = defineComponent({
        components: {
            LoginBox,
            UserList,
            InputBar,
            ChatArea
        },
        setup() {
            return { state };
        },
        watch: {
            "state.appendMessage"(newMsg, oldMsg) {
                state.messages.push(newMsg);
            }
        },
        mounted() {
            this.onLogin();
        },
        methods: {
            initSocket(url) {
                state.status = 'Connecting...';
                const socket = {
                    ws: null,
                    open(url) {
                        this.ws = new WebSocket(url);
                        this.ws.addEventListener("open", (event) => {
                            this.ws.send("Hello Server!");
                        });
                        this.ws.addEventListener("message", (event) => {
                            try {
                                const data = JSON.parse(event.data);
                                const { type, payload } = data;
                                const handler = this.handlerMap.get(type);
                                handler(payload);
                                console.log("Message from server ", data);
                            } catch (error) {
                                console.error(error);
                            }
                        });
                        this.ws.addEventListener("error", (event) => {
                            console.log("error from server ", event.data);
                        });
                        this.ws.addEventListener("close", (event) => {
                            console.log("close from server ", event.data);
                        });
                    },
                    handlerMap: new Map(),
                    on(type, handler) {
                        if (!this.handlerMap.get(type)) {
                            this.handlerMap.set(type, handler);
                        }
                    },
                    emit(type, payload) {
                        this.ws.send(JSON.stringify({ type, payload }));
                    }
                };

                socket.on('connect', () => {
                    state.appendMessage = (`Connected to server ${state.url}`);
                    state.status = '';
                });
                socket.on('message', (data) => {
                    state.appendMessage = (`__${data.username}:__ ${data.text}`);
                });
                socket.on('login', (data) => {
                    state.username = data.username;
                    state.appendMessage = (`${data.username} has logged in.`);
                    state.users = data.users;
                });
                socket.on('typing', (data) => {
                    state.status = `${data.username} is typing...`;
                });
                socket.on('stop-typing', () => {
                    state.status = '';
                });
                socket.on('logout', (data) => {
                    state.appendMessage = (`${data.username} disconnected.`);
                    state.users = data.users;
                });
                socket.open(url);
                this.socket = socket;
            },
            onLogin() {
                this.initSocket(state.url);
                this.$refs.inputBar.focus();
            },
            onInput(text) {
                const username = state.username;
                if (!this.typing) {
                    this.typing = true;
                    this.socket.emit('typing', { username });
                }
                if (this.typingTimer) {
                    clearTimeout(this.typingTimer);
                    this.typingTimer = null;
                }
                this.typingTimer = setTimeout(() => {
                    this.typing = false;
                    this.socket.emit('stop-typing', { username });
                }, 1000);
            },
            onSend(text) {
                const username = state.username;
                this.socket.emit('message', { username, text });
            },
            componentDidMount() {
                this.$refs.loginBox.focus();
            }
        }
    });

    createApp(App).mount('#app');
})();