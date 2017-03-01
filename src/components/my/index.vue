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
                <div class="asset-btn" v-on:click="GetGoInviter">邀请好友</div>
        </div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link k-list ui-list-active">
                <li class="ui-border-b" onclick="location.href='/index/wallet/index.html'">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_wallet"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">钱包</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_wallet}}</span>
                </li>
                <li onclick="location.href='/index/index/index.html#/'">
                    <!--<router-link to="" class="click_a">-->
                        <!--<div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">-->
                            <!--<span class="bg-100-g hs_inventory"></span>-->
                        <!--</div>-->
                        <!--<div class="ui-list-info">-->
                            <!--<h4 class="ui-nowrap">信息资产</h4>-->
                        <!--</div>-->
                        <!--<span class="font14 ui-txt-info">{{user.user_assets}}</span>-->
                    <!--</router-link>-->
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_sales"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">我的首页</h4>
                        </div>
                        <span class="font14 ui-txt-info"></span>
                </li>
            </ul>
        </div>
        <div class="k-list-group">
            <ul class="ui-list jin-list-link k-list ui-list-active">
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
                <li class="ui-border-b" onclick="location.href='/index/order/index.html'">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g hs_address"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">我的订单</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_inventory}}</span>
                </li>
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
                <li onclick="location.href='/index/address/index.html'">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span class="bg-100-g hs_address"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">收货地址</h4>
                    </div>
                    <span class="font14 ui-txt-info">{{user.user_address}}</span>
                </li>
            </ul>
        </div>
        <!--<div class="k-list-group">-->
            <!--<ul class="ui-list jin-list-link ui-list-active">-->
                <!--<li>-->
                    <!--<router-link to="" class="click_a">-->
                        <!--<div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">-->
                            <!--<span class="bg-100-g hs_address"></span>-->
                        <!--</div>-->
                        <!--<div class="ui-list-info">-->
                            <!--<h4 class="ui-nowrap">收货地址</h4>-->
                          <!--</div>-->
                        <!--<span class="font14 ui-txt-info">{{user.user_address}}</span>-->
                    <!--</router-link>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <jin-footer :current="2"></jin-footer>
        <div class="fix" v-bind:class='{"dis_n":user.isA,"dsp_p":user.isB}'>
            <div class="margin-t-20 margin-b-10 share">
               <span class="lines"></span>
            </div>
            <div class="rel" >
                <div class="abs exit" v-on:click="Getquxiao">X</div>
                <div class="packet-user text-center">
                    <img :src="user.inviter_code" alt="" />
                    <div class="margin-b-15 packet-user-title"></div>
                    <h4 class="margin-t-10 font14 margin-b-10 txt-color-fff padding-b-15" >点击右上角立即分享</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/jsx">
    import jinFooter from '../common/footer.vue';
    import { countdown } from '../../js/tools.js';
    import { XHRPost, XHRGet } from '../../js/ajax.js';


    export default {
        data() {
        return {
            user:{
                isA: true,
                isB: false,
                user_avatars: "",//用户头像
                user_name: "", //用户名字
                user_vip: "", //用户等级
                user_wallet: "", //用户钱数
                user_assets: "", //用户信息资产
                //user_inventory: "500", //用户库存
                user_member: "", //用户的会员个
                //user_address: "0", //用户收货地址个数
                inviter_code: "" //邀请二维码
            }
            }
        },
    components: {
        jinFooter
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
        });
    },
    methods: {
        GetGoInviter:function() {
            this.user.isA = false;
            this.user.isB = true;
            const _this = this;
            XHRGet('/api/MyCenter/createInvitingQrcode',{},function(response){
                _this.user.inviter_code = response.data.data;
                console.log( _this.user.inviter_code);
            })
        },
        Getquxiao:function() {
            this.user.isA = true;
            this.user.isB = false;
        }

    }
    }

</script>