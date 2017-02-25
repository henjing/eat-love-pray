<template>
    <div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link k-list ui-list-active">
                <li class="padding-b-10 padding-t-10">
                    <router-link to="/main" class="click_a">
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
                    <router-link to="" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_wallet"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">钱包</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_wallet}}</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_inventory"></span>
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
                    <router-link to="" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_sales"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">我的订单</h4>
                        </div>
                        <span class="font14 ui-txt-info"></span>
                    </router-link>
                </li>
                <li class="ui-border-b" onclick="location.href='/index/SellRecord/index.html'">
                    <!--<router-link to="" class="click_a">-->
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_sales"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">销售记录</h4>
                        </div>
                        <span class="font14 ui-txt-info"></span>
                    <!--</router-link>-->
                </li>
                <li>
                    <router-link to="/name" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_address"></span>
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
                    <router-link to="/connection" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_wallet"></span>
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
                    <router-link to="" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_address"></span>
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
                user_avatars: "",//用户头像
                user_name: "", //用户名字
                user_vip: "", //用户等级
                user_wallet: "", //用户钱数
                user_assets: "", //用户信息资产
                user_inventory: "500", //用户库存
                user_member: "", //用户的会员个
                user_address: "0" //用户收货地址个数
            }
            }
        },
    mounted: function () {
        const _this = this;
        XHRGet('/api/MyCenter/index', {}, function (response) {
            _this.user.user_wallet = response.data.data.can_use_money;
            _this.user.user_assets = response.data.data.info_asset;
            _this.user.user_vip = response.data.data.level;
            _this.user.user_member = response.data.data.my_children;
            _this.user.user_name = response.data.data.user_name;
            _this.user.user_avatars = response.data.data.wechat_avatar;
        })
    }
    }

</script>