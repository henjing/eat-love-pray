<template>
    <div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link k-list ui-list-active">
                <li class="padding-b-10 padding-t-10">
                    <router-link to="">
                        <div class="ui-avatar k-avatar">
                            <span>
                                <img :src="user.user_avatars" alt=""/>
                            </span>
                        </div>
                        <div class="ui-list-info" style=" display: -webkit-box;">
                            <span>{{user.user_name}}</span>
                            <span class="padding-l-5 padding-r-5 vip">{{user.user_vip}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="user ui-whitespace ui-justify-flex box-align">
            <div class="asset-btn">邀请好友</div>
        </div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link k-list ui-list-active">
                <li class="ui-border-b">
                    <router-link to="">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: 0 1px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">钱包</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_wallet}}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: 0 -35px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">信息资产</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_assets}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link k-list ui-list-active">
                <li class="ui-border-b">
                    <router-link to="">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: 0 -72px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">我的订单</h4>
                        </div>
                        <span class="font14 ui-txt-info"></span>
                    </router-link>
                </li>
                <li class="ui-border-b">
                    <router-link to="">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: 0 -111px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">销售记录</h4>
                        </div>
                        <span class="font14 ui-txt-info"></span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/name">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: 0 -111px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">库存</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_inventory}}</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="k-list-group">
            <ul class="ui-list jin-list-link ui-list-active">
                <li>
                    <router-link to="">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: -99px -114px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">我的会员</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_member}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link ui-list-active">
                <li>
                    <router-link to="">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span style="background-position: -99px -114px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">收货地址</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_address}}</span>
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
    import layer from '../../js/lib/layer.js';
    import '../../js/lib/layer.css';
    import Loading from '../common/loading.vue';
    import Successing from '../common/success.vue';
    import { countdown } from '../../js/tools.js';
    import { XHRPost, XHRGet } from '../../js/ajax.js';


    export default {
        data() {
        return {
            user:{
                user_avatars: "../../images/pro-01.png",//用户头像
                user_name: "卢誉秋", //用户名字
                user_vip: "vip", //用户等级
                user_wallet: "107.68", //用户钱数
                user_assets: "325.430.211", //用户信息资产
                user_inventory: "500", //用户库存
                user_member: "120", //用户的会员个
                user_address: "0" //用户收货地址个数
            }
            }
        }
    }

</script>