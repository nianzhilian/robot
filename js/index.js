//隔离作用域 防止污染全局作用域
;(async ()=>{
    //判断登录状态是否过期
    const user = await API.profile();
    if(!user.data){
        alert(user.msg+",请重新登录");
        location.href = './login.html';
        return;
    }

    const doms = {
        aside:{
            nickname:document.querySelector('#nickname'),
            loginId:document.querySelector('#loginId')
        },
        container:document.querySelector('.chat-container'),
        form:document.querySelector('.msg-container'),
        content:document.querySelector('#txtMsg'),
        close:document.querySelector('.close')
    }
    //下面一定是登录成功的逻辑

    //1、显示用户信息
    setUserInfo();
    //2、显示聊天历史记录
    await loadHistory();

    doms.form.onsubmit = async function(e){
        e.preventDefault();
        const content = doms.content.value;
        addChat({
            from: user.data.loginId,
            to: null,
            createdAt: Date.now(),
            content,
        });
        doms.content.value = '';
        scrollBottom();
        //发送消息
        const msg = await API.sendChat(content);
        addChat({
            from: null,
            to: user.data.loginId,
            ...msg.data
        });
        scrollBottom();
    }

    doms.close.onclick = function(){
        API.loginOut();
        location.href = './login.html';
    }

    async function loadHistory(){
        const resp = await API.getChat();
        const data = resp.data;
        for (const list of data) {
            addChat(list);
        }
        scrollBottom();
    }
    function setUserInfo(){
        doms.aside.nickname.innerText = user.data.nickname;
        doms.aside.loginId.innerText = user.data.loginId
    }

    function scrollBottom(){
        doms.container.scrollTop = doms.container.scrollHeight;
    }

    function addChat(chatInfo){
        const chatitem = document.createElement('div');
        chatitem.className = 'chat-item';
        console.log("chatInfo.from:"+chatInfo.from)
        //如果是我发的则加上me的样式
        if(chatInfo.from) chatitem.classList.add('me');
        //头像
        const chatavatar = document.createElement('img');
        chatavatar.className = "chat-avatar";
        chatavatar.src = `./asset/${chatInfo.from?'avatar.png':'robot-avatar.jpg'}`;
        //内容
        const content = document.createElement('div');
        content.className = "chat-content";
        content.innerText = chatInfo.content;
        //日期
        const chatdate = document.createElement('div');
        chatdate.className = "chat-date";
        chatdate.innerText = format(chatInfo.createdAt);
        chatitem.appendChild(chatavatar);
        chatitem.appendChild(content)
        chatitem.appendChild(chatdate);
        doms.container.appendChild(chatitem);
    }
    function format(timestamp){
       const date = new Date(timestamp);
       const year = date.getFullYear().toString();
       const month = (date.getMonth()+1).toString().padStart(2, '0');
       const day = date.getDay().toString().padStart(2, '0');
       const hours = date.getHours().toString().padStart(2, '0');
       const minute = date.getMinutes().toString().padStart(2,'0');
       const second = date.getSeconds().toString().padStart(2,'0');
       return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
    }
})();