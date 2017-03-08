<template>
    <div class="jin-wrap">
        <header class="mine-header jin-box-center ">
            <div class="ui-avatar-lg rlt" style="  border: 3px solid #fff;">
                <!--<span class="radius0" style="position: relative;">-->
                    <img :src="user.user_avatars" class="radius3"/>
                    <!--<i class="camera jin-icon jin-icon-xiangji font20"></i>-->
                <!--</span>-->
            </div>

            <h4 class="margin-t-5">{{user.user_name}}</h4>
        </header>
        <ul class="ui-list jin-list-link ui-list-active">
                <li class="ui-border-b">
                    <router-link to="/name" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g si" style="background-position: -39px -55px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">常用名</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_name}}</span>
                    </router-link>
                </li>

            <li class="ui-border-b" v-if="user.yqr_name!=''">
                <router-link to="/inviter" class="click_a">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span class="bg-100-g si" style="background-position: -39px -90px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">邀请人</h4>
                    </div>
                    <span class="font14 ui-txt-info">{{user.yqr_name}}</span>
                </router-link>
            </li>
            <li class="ui-border-b">
                <router-link to="/phone" class="click_a">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg" >
                        <span class="bg-100-g si" style="background-position: -38px -122px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">手机号码</h4>
                    </div>
                    <span class="font14 ui-txt-info">{{user.user_phone}}</span>
                </router-link>
            </li>
            <!--<li>-->
                <!--<div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">-->
                    <!--<span class="bg-100-g hs_time"></span>-->
                <!--</div>-->
                <!--<div class="ui-list-info">-->
                    <!--<h4 class="ui-nowrap">注册时间</h4>-->
                <!--</div>-->
                <!--<span class="font14 ui-txt-info">{{user.reg_time}}</span>-->
            <!--</li>-->

            <!--<li>
                <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                    <span style="background-position: -98px -148px"></span>
                </div>
                <div class="ui-list-info">
                    <h4 class="ui-nowrap">绑定微信</h4>
                </div>
                                        <span class="font14 ui-txt-info">未绑定</span>
            </li>-->
        </ul>
            <ul class="ui-list ui-list-active">
                <li>
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span class="bg-100-g si" style="background-position: -37px -149px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap" >注册时间</h4>
                    </div>
                    <span class="font14 ui-txt-info margin-r-20" style="line-height:48px">{{user.reg_time}}</span>
                </li>
            </ul>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link ui-list-active">
                <li>
                    <router-link to="/mima" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g si" style="background-position: -39px -182px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap" >修改密码</h4>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="goexit" v-on:click="getGoexit">
            <span class="exit-span">退出登录</span>
        </div>
    </div>
</template>
<style>
    .goexit {
        margin-top: 15px;
        margin-bottom: 15px; }

    .exit-span {
        display: block;
        background: #fff;
        width: 100%;
        height: 100%;
        text-align: center;
        padding-top: 12px;
        padding-bottom: 12px;
    }

</style>

<script type="text/jsx">

    import { countdown } from '../../js/tools.js';
    import { XHRPost,XHRGet } from '../../js/ajax.js';

    export default{
        data() {
        return {
            user:{
                user_avatars: "",//用户头像
                user_name: "", //用户名字
                yqr_name: "", //邀请人名字
                user_phone: "", //用户钱数
                reg_time: "" //用户注册时间
                }

            }
        },
    created(){
        const _this = this;
        setTimeout(function(){
            _this._created.apply(_this);
        },1000);
    },
    methods: {
        _created: function () {
            const _this = this;
            XHRGet('/api/MyCenter/mySeting', {}, function (response) {
                var data = response.data.data;
                _this.user.user_avatars = data.wechat_avatar;
                _this.user.yqr_name = data.inviting_name;
                _this.user.user_phone = data.cellphone;
                _this.user.reg_time = data.register_time;
                _this.user.user_name = data.user_name;

            })

        },

        getGoexit:function() {
            XHRGet('/api/MyCenter/logOut', {}, function () {
                window.location.href = '/index/loginRegister/login.html'
              })
            }
        }

    }



</script>