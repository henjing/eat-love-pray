<template>
    <div class="ui-form ui-border-t margin-t-15">
        <form id="from">
            <div class="ui-form-item ui-border-b">
                <label>原密码</label>
                <input type="password" id="password" name="password" placeholder="请输入原登陆密码"  v-model="info.ypwd">
            </div>
            <div class="ui-form-item ui-border-b">
                <label>新密码</label>
                <input type="password" id="password1" name="password1" placeholder="请输入新登陆密码"  v-model="info.xpwd">
            </div>
            <div class="ui-form-item ui-border-b">
                <label>确认新密码</label>
                <input type="password" id="password2" name="password2" placeholder="再次确认新登陆密码"  v-model="info.xpwd1">
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
        data() {
            return {
                disabled: true,
                info: {
                    ypwd: "", //旧的支付密码
                    xpwd: "", //新的支付密码
                    xpwd1: "" //确认新的支付密码
                }
            }
        },

        computed: {
            buttonEnable() {
                return (this.info.ypwd!= ""&&this.info.xpwd!= ""&&this.info.xpwd1!= "");
            }
        },
        methods: {
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
                        XHRGet('/api/MyCenter/logOut', {}, function () {
                           window.location.href = '/index/login_register/login.html'
                           })
                        layer.closeAll();
                    }
                });
            },
            //保存事件
            goBaocun: function () {
                const data = {
                    password: encrypt(this.info.ypwd),
                    new_password: encrypt(this.info.xpwd),
                    re_password: encrypt(this.info.xpwd1)
                }
                //const _this = this;
                if(this.info.xpwd === this.info.xpwd1) {
                    XHRPost('/api/MyCenter/editLoginPassword', data, function (response) {
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