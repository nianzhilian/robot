const API = (() => {
    const BASE_PATH = 'https://study.duyiedu.com';
    const TOKEN_STR = 'token';

    function get(path) {
        const headers = {};
        const token = localStorage.getItem(TOKEN_STR);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_PATH + path, { headers })
    }

    function post(path, bodyObj) {
        const headers = {
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem(TOKEN_STR);
        if (token) {
            headers.authorization = `Bearer ${token}`;
        }
        return fetch(BASE_PATH + path, {
            headers,
            method: 'post',
            body: JSON.stringify(bodyObj)
        })
    }

    //注册
    async function reg(loginInfo) {
        const resp = await post('/api/user/reg', loginInfo);
        return await resp.json()
    }
    //登录 
    async function login(loginInfo) {
        const resp = await post('/api/user/login', loginInfo);
        console.log(resp)
        const res = await resp.json();
        if (res.code === 0) {
            const token = resp.headers.get('authorization');
            console.log(token)
            localStorage.setItem(TOKEN_STR, token);
        }
        return res
    }
    //验证账号是否存在
    async function exists(loginId) {
        const resp = await get('/api/user/exists?loginId=' + loginId);
        return await resp.json();
    }
    //当前登录的用户
    async function profile() {
        const resp = await get('/api/user/profile');
        return await resp.json();
    }
    //发送消息  不带修饰符的函数 返回一个promise的效果跟 async的效果一样
    function sendChat(content) {
        return post('/api/chat', { content }).then((resp) => {
            return resp.json();
        }).then((res) => {
            return res;
        })
    }
    //获取消息
    async function getChat() {
        const resp = await get('/api/chat/history');
        return await resp.json();
    }
    function loginOut(){
        localStorage.removeItem(TOKEN_STR);
    }
    return {
        reg,
        login,
        exists,
        profile,
        sendChat,
        getChat,
        loginOut
    }
})();
