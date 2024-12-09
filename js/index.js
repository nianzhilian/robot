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
        }
    }
    //下面一定是登录成功的逻辑

    //1、显示用户信息
    setUserInfo();
    //2、显示聊天历史记录

    async function loadHistory(){
        
    }
    function setUserInfo(){
        doms.aside.nickname.innerText = user.data.nickname;
        doms.aside.loginId.innerText = user.data.loginId
    }

    addChat({
        from: user.loginId,
        to: null,
        createdAt: Date.now(),
        content,
      });

    

    function addChat(){

    }
})();