//营造以下格式
//var va = new Validator($('#txtLoginId'),validatorFn)
class ValidatorFn{
    constructor(textId,validatorFn){
        this.input = $('#'+textId);
        this.error = this.input.nextElementSibling;
        this.validatorFn = validatorFn;
        this.input.onblur = ()=>{
            this.validate();
        }
    }
   async validate(){
        const msg = await this.validatorFn(this.input.value);
        if(msg){
            this.error.innerText = msg;
            return false;
        }else{
            this.error.innerText = '';
            return true;
        }
    }
    //静态方法 最后提交全部验证
    static async validate(...validator){
       const arr = await Promise.all(validator.map((v) => v.validate()));
       return arr.every((v)=>v);
    }
}

