<template>
    <div class="jin-wrap margin-t-10">
        <!--01-->
        <div class="border-b-1 border-t-1">
            <ul class="ui-list ul-all ui-list-active">
                <li>
                    <div class="rlt width-100">
                        <label class="ui-nowrap abs top-10">常用名</label>
                        <input type="text" placeholder="输入新常用名" class="ui-form-item input width-100 padding-l-60" id="name" v-model="info.name"/>
                    </div>
                </li>
            </ul>
        </div>
        <!--02-->
        <div class="ui-btn-wrap">
            <button  class="ui-btn-kd ui-btn-yellow" style="border:0;" v-on:click="goToLogin">更改</button>
        </div>
        <!--04-->
        <loading v-if="loadingShow"></loading>
        <!--<successing v-if="successingShow"></successing>-->
        <!--底部-->
    </div>
</template>

<script type="text/jsx">

    import Loading from '../common/loadingwei.vue';
    import { countdown } from '../../js/tools.js';
    import { XHRPost} from '../../js/ajax.js';
    export default{
        data(){
            return{
                info:{
                    name: "", //常用名
                },
                loadingShow: false
            }
        },
        components: {
            Loading
        },
        methods: {

            goTopwd:function() {
                this.$router.push({path: '/main'});
                window.location.reload();
            },
            //定时器1秒
            goTOnext:function() {
                const _this = this;
                setTimeout( function() {
                    _this.goTopwd();
                },2000);
            },
            //错误提示
            errorTip: function (msg) {
                layer.open({
                    content: msg,
                    btn: ['确定'],
                    yes: function () {
                        layer.closeAll();
                    }
                });
            },
            goToLogin:function() {
                const data = {
                    user_name: encrypt(this.info.name)
                };
                const _this = this;
                this.loadingShow = true;
                XHRPost('/api/MyCenter/editUserName', data, function (response) {
                    _this.loadingShow = false;
                    if (response.data.status === 1) {
                        //_this.$router.push({path: '/main'});
                        _this.goTopwd();
                    } else {
                        _this.errorTip(response.data.info);
                    }
                });
            },
        }


    }
</script>