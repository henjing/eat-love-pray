<template>
    <div>
        <div class="ui-whitespace padding-t-10 padding-b-10">
            <span class="font16">你正在为{{ phone }}重置支付密码</span>
        </div>
        <ul class="ui-list jin-list-link ui-list-active ui-border-tb">
            <li class="ui-border-t padding-t-5 padding-b-5" >
                <router-link to="/zfmima02" class="click_a">
                    <div class="ui-list-info">
                        <h4>我记得原支付密码</h4>
                    </div>
                </router-link>
            </li>
        </ul>
        <ul class="ui-list jin-list-link ui-list-active ui-border-tb margin-t-10">
            <li class="ui-border-t padding-t-5 padding-b-5"  v-on:click="goAuthentication">
                <div class="ui-list-info">
                    <h4>我忘记支付密码了</h4>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/jsx">
    import layer from '../../js/lib/layer.js';
    import '../../js/lib/layer.css';
    import { countdown } from '../../js/tools.js';
    import { XHRPost,XHRGet } from '../../js/ajax.js';


    export default {
        data() {
            return {
                disabled:true,
                phone:"",
                info: {
                    isA: true,
                    isB: false,
                    id_cart_phone: "", //身份证号
                    bank_cart_phone: "" //银行卡号
                }
            }
        },
        mounted() {
            const _this = this;
            XHRGet('/api/MyCenter/mySeting', {}, function (response) {
                _this.phone = response.data.data.cellphone;
            })
        },

        methods: {
            //错误验证
            errorTip: function (msg) {
                layer.open({
                    content: msg,
                    btn: ['确定'],
                    yes: function () {
                        window.location.href = '/xiaojin/mine/bank_cards'
                    }
                });
            },
            //忘记原支付密码事件
            goAuthentication: function() {
                XHRGet('/oriental_treasure/MySeting/forgetPayPassword', {}, function (response) {
                    if (response.data.data.real_name === null) {
                        window.location.href = '/xiaojin/information/authentication.html'
                    } else if(response.data.data.bank_list.length === 0){
                        //window.location.href = '/xiaojin/mine/bank_cards'
                        _this.$router.push({ path: '/zfmima01'});
                        this.errorTip("你还没绑定银行卡，无法操作此步骤");
                    } else {
                        _this.$router.push({ path: '/zfmima02'});
                    }

                }.bind(this))
            }
        }
    }
</script>