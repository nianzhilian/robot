(async ()=>{
    const loginIdValidator = new  ValidatorFn('txtLoginId',async function(val){
        if(!val){
            return '请输入账号';
        }
    })
    const loginPwdValidator = new ValidatorFn('txtLoginPwd',function(val){
        if(!val){
            return '请输入密码';
        }
    })
    const form = $('.user-form');
    form.onsubmit = async function(e){
        e.preventDefault();
        const res = await ValidatorFn.validate(loginIdValidator,loginPwdValidator);
        //没验证通过 不做处理
        if(!res){
            return;
        }
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData.entries());
        const lres = await API.login(formObj);
        if(lres.code === 0){
            alert('登录成功，正在跳转首页');
            location.href='./index.html';
        }else{
            loginPwdValidator.error.innerText = lres.msg;
        }
    }
})();