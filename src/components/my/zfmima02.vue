<template>
    <div class="ui-form ui-border-t margin-t-15">
        <form id="from">
            <div class="ui-form-item ui-border-b">
                <label>原密码</label>
                <input type="password" id="password" name="password" placeholder="请输入原支付密码"  v-model="ypwd">
            </div>
            <div class="ui-form-item ui-border-b">
                <label>新密码</label>
                <input type="password" id="password1" name="password1" placeholder="请输入新支付密码"  v-model="xpwd">
            </div>
            <div class="ui-form-item ui-border-b">
                <label>确认新密码</label>
                <input type="password" id="password2" name="password2" placeholder="再次确认新支付密码" v-model="xpwd1">
            </div>
        </form>
        <div class="ui-btn-wrap">
            <button class="ui-btn-lg ui-btn-primary" id="submit" :disabled="!buttonEnable" v-on:click="goBaocun">保存</button>
        </div>
    </div>
</template>

<script type="text/jsx">

    import { countdown } from '../../js/tools.js';
    import { XHRPost,XHRGet } from '../../js/ajax.js';

    export default{
        data(){
            return{
                disabled:true,
                ypwd: "", // old password
                xpwd: "", //新的支付密码
                xpwd1: "" //确定新的支付密码
            }
        },
        watch:{

            ypwd(curVal01){
            },
            xpwd(curVal02){
            },
            xpwd1(curVal03){
            }

        },
        computed: {
            buttonEnable() {
                return (this.ypwd!= "" && this.xpwd!= "" && this.xpwd1!= "");
            }
        },

        methods: {
            //失去焦点事件
//        test:function(){
//            const _this = this;
//            if(this.info.ypwd!=""&&this.info.xpwd!=""&&this.info.xpwd1!=""){
//                _this.disabled = false;
//            }
//        },
            //错误提示方法
            errorTip: function (msg) {
                layer.open({
                    content: msg,
                    btn: ['确定'],
                    yes: function () {
                        layer.closeAll();
                    }
                });
            },
            //成功提示
            successTip: function (msg) {
                const _this = this;
                layer.open({
                    content: msg,
                    btn: ['确定'],
                    yes: function () {
                        layer.closeAll();
                        _this.$router.push({ path: '/main'});
                    }
                });
            },
            //保存事件
            goBaocun: function () {
                const data = {
                    pay_password: encrypt(this.ypwd),
                    new_pay_password: encrypt(this.xpwd),
                    re_password: encrypt(this.xpwd1)
                }
                if (this.xpwd === this.xpwd1) {
                    //const _this = this;
                    XHRPost('/api/MyCenter/editPayPassword', data, function (response) {
                        if (response.data.status === 1) {
                            this.successTip(response.data.info);
                            //this.successTip(1111);
                        } else {
                            this.errorTip(response.data.info);
                        }
                        console.log(this.errorTip);
                    }.bind(this))
                }else{
                    this.errorTip("两次密码不一致");
                }
            }

        }
    }
</script>