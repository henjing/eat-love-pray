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
                            <span class="bg-100-g" style="background-position: -113px -43px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="ui-nowrap">钱包</h4>
                        </div>
                        <span class="font14 ui-txt-info">{{user.user_wallet}}</span>
                </li>
                <li>
                    <router-link to="/connection" class="click_a">
                        <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                            <span class="bg-100-g" style="background-position: -114px -192px"></span>
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
            <ul class="ui-list jin-list-link k-list ui-list-active">
                <li class="ui-border-b" onclick="location.href='/index/SellRecord/index.html'">
                    <!--<router-link to="" class="click_a">-->
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span class="bg-100-g" style="background-position: -115px -100px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">销售记录</h4>
                    </div>
                    <span class="font14 ui-txt-info"></span>
                    <!--</router-link>-->
                </li>
                <li class="ui-border-b" onclick="location.href='/index/order/index.html'">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span class="bg-100-g" style="background-position: -115px -126px"></span>
                    </div>
                    <div class="ui-list-info">
                        <h4 class="ui-nowrap">我的订单</h4>
                    </div>
                    <span class="font14 ui-txt-info">{{user.user_inventory}}</span>
                </li>
                <li onclick="location.href='/index/address/index.html'">
                    <div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">
                        <span class="bg-100-g" style="background-position: -114px -228px"></span>
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
                <!--<li onclick="location.href='/index/address/index.html'">-->
                    <!--<div class="ui-list-thumb k-list-thumb-s  k-list-thumb-bg">-->
                        <!--<span class="bg-100-g hs_address"></span>-->
                    <!--</div>-->
                    <!--<div class="ui-list-info">-->
                        <!--<h4 class="ui-nowrap">收货地址</h4>-->
                    <!--</div>-->
                    <!--<span class="font14 ui-txt-info">{{user.user_address}}</span>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
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
            <div class="rel">
                <div class="abs exit" v-on:click="Getquxiao">X</div>
                <div class="packet-user text-center">
                        <div class="weui-loadmore s1" v-if="loadingShow">
                            <i class="weui-loading"></i>
                        </div>
                        <img :src="user.inviter_code" alt="" v-else />
                    <div class="margin-b-15 packet-user-title"></div>
                    <h4 class="margin-t-10 font14 margin-b-10 txt-color-fff padding-b-15" >点击右上角立即分享</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    /*.inviter_code01{*/
        /*width:130px;*/
        /*height:130px;*/
        /*margin:10px auto;*/
    /*}*/
    .s1,.packet-user>img {
        width: 130px;
        height: 130px;
        border-radius: 0;
        padding:3% 20px 0;
    }
    .s1 > i {
        margin-top: 20px;
    }
    @media (max-width: 480px) {
        .s1 > i {
            margin-top: 50px;
        }
        .s1,.packet-user>img{
            padding: 10% 20px 0;
        }
    }
</style>

<script type="text/jsx">
    import layer from '../../js/lib/layer.js';
    import '../../js/lib/layer.css';
    import jinFooter from '../common/footer.vue';
   //     import { wx } from '../../js/lib/jweixin-1.0.0.js'
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
                inviter_code: ""//邀请二维码

            },
            appId:"",
            timestamp:"",
            nonceStr:"",
            signature:"",
            go_url:"",
            logo:"",
            user_watch:{

            },
            loadingShow:false
            }
        },
    components: {
        jinFooter
    },
    created: function () {
        const _this = this;
        XHRGet('/api/MyCenter/index', {}, function (response) {
            _this.user.user_wallet = response.data.data.can_use_money;
            _this.user.user_assets = response.data.data.info_asset;
            _this.user.user_vip = response.data.data.level;
            _this.user.user_member = response.data.data.my_children;
            _this.user.user_name = response.data.data.user_name;
            _this.user.user_avatars = response.data.data.wechat_avatar;
        });
        XHRPost('/api/Wechat/getJssdkInfo', {uri:encrypt('/index/my#/main')}, function (response) {
            var data = response.data.data;
            console.log('data',data);
            console.log(data.wechat.appId);
            _this.appId = data.wechat.appId;
            _this.timestamp = data.wechat.timestamp;
            _this.nonceStr = data.wechat.nonceStr;
            _this.signature = data.wechat.signature;
            _this.go_url = data.go_url;
            _this.logo = data.logo;
            wx.config({

                debug: false,

                appId:this.appId,

                timestamp: this.timestamp,

                nonceStr: this.nonceStr,

                signature: this.signature,

               jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 分享给朋友  分享给朋友圈

            });
            function s1(){
               console.log(_this.appId); 
            }
            s1();
            wx.ready(function(){
               // 分享到朋友

                wx.onMenuShareTimeline({

                    title: '和十素养', // 分享标题

                    imgUrl: this.logo// 分享图标
//                    success: function () {
//                       // 用户确认分享后执行的回调函数
//                        alert('成功');
//                    },
//                   cancel: function () {
//                        // 用户取消分享后执行的回调函数
//                       alert('失败');
//                    }
                });

                // 分享给朋友圈


               wx.onMenuShareAppMessage({
                    title: '和十素养', // 分享标题

                    desc: "和十素养", // 分享描述

                    link: this.go_url,

                    imgUrl: this.logo, // 分享图标

                   type: 'link'
//                    success: function () {
//                        // 用户确认分享后执行的回调函数
//                        alert('成功');
//                    },
//                    cancel: function () {
//                        // 用户取消分享后执行的回调函数
//                        alert('失败');
//                   }

               });

            });
            console.log(8888888);
        })

    },
    methods: {
        GetGoInviter:function() {
            this.user.isA = false;
            this.user.isB = true;
            this.loadingShow = true;
            const _this = this;
            XHRGet('/api/MyCenter/createInvitingQrcode',{},function(response){
                _this.user.inviter_code = response.data.data;
                if(_this.user.inviter_code = response.data.data){
                    _this.loadingShow = false
                }
            })
        },
        Getquxiao:function() {
            this.user.isA = true;
            this.user.isB = false;
        }

    }
    }

</script>