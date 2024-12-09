(async ()=>{
    //IFFE 修改作用域，其核心概念是避免全局作用于污染。避免变量重名导致覆盖全局作用域中的变量
    const loginIdValidator = new  ValidatorFn('txtLoginId',async function(val){
        if(!val){
            return '请输入账号';
        }
        const resp = await API.exists(val);
    
        if(resp.data){
            return '账号已存在，请重新输入';
        }
    })
    
    const nicknameValidator = new ValidatorFn('txtNickname',function(val){
        if(!val){
            return '请输入昵称';
        }
    })
    
    const loginPwdValidator = new ValidatorFn('txtLoginPwd',function(val){
        if(!val){
            return '请输入密码';
        }
    })

    const pwdConfirmValidator = new ValidatorFn('txtLoginPwdConfirm',function(val){
        if(!val){
            return '请再次输入密码';
        }
        if(val !=loginPwdValidator.input.value){
            return '二次密码输入不一致，请重新输入';
        }
    })
    const form = $('.user-form');
    form.onsubmit = async function(e){
        e.preventDefault();
        const res = await ValidatorFn.validate(loginIdValidator,nicknameValidator,loginPwdValidator,pwdConfirmValidator);
        //没验证通过 不做处理
        if(!res){
            return;
        }
        const formData = new FormData(form);
        const formObj = Object.fromEntries(formData.entries());
        const lres = await API.reg(formObj);
        if(lres.code === 0){
            alert('注册成功，正在跳转到登录页');
            location.href='./login.html';
        }
    }
})();