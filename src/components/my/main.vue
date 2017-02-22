<template>
    <div class="jin-wrap">
        <header class="mine-header jin-box-center ">
            <div class="ui-avatar-lg rlt bor">
                <span>
                    <img src="" alt=""/>
                </span>
            </div>

            <h4 class="margin-t-5">卢誉秋</h4>
        </header>
        <ul class="ui-list jin-list-link ui-list-active">
                <li class="ui-border-b">
                    <router-link to="/name">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: -98px 1px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">常用名</h4>
                        </div>
                        <span class="font14 ui-txt-info">卢誉秋</span>
                    </router-link>
                </li>

            <li class="ui-border-b">
                <router-link to="/inviter">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span style="background-position: -98px -35px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">邀请人</h4>
                    </div>
                    <span class="font14 ui-txt-info">黄恩景</span>
                </router-link>
            </li>
            <li class="ui-border-b">
                <router-link to="/phone">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span style="background-position: -100px -76px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">手机号码</h4>
                    </div>
                    <span class="font14 ui-txt-info">152****1260</span>
                </router-link>
            </li>
            <li>
                <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                    <span style="background-position: -99px -114px"></span>
                </div>
                <div class="ui-list-info">
                    <h4 class="ui-nowrap">注册时间</h4>
                </div>
            </li>

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
        <div class="k-list-group">
            <ul class="ui-list jin-list-link ui-list-active">
                <li>
                    <router-link to="/mima">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: -99px -114px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">修改密码</h4>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    a {
        -webkit-box-align: center;
        color:#000;
        display: -webkit-box;
        width:100%;
        height:100%;
    }
</style>
<script type="text/jsx">
    import Vue from 'vue';
    import axios from 'axios';
    import layer from '../../js/lib/layer.js';
    import '../../js/lib/layer.css';
    import Loading from '../common/loading.vue';
    import { countdown } from '../../js/tools.js';
    import { XHRPost,XHRGet } from '../../js/ajax.js';

    export default{
        data() {
        return {
            user:{
                user_avatars: "../../images/pro-01.png",//用户头像
                user_name: "卢誉秋", //用户名字
                yqr_name: "黄恩景", //邀请人名字
                user_phone: "18587596820", //用户钱数
                reg_time: "2017-02-14 17:53" //用户注册时间
                }

            }
        }
    }


</script>