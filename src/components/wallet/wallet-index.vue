<template>
    <div class="jin-wrap">
        <header class="wallet-header ui-whitespace ui-txt-white">
            <ul class="jin-justify-flex padding-t-15 padding-b-15 font14">
                <li>总资产</li>
                <li>账单</li>
            </ul>
            <ul class="jin-justify-flex margin-t-20">
                <li class="font35">66666</li>
                <li><router-link to="/wallet/walletWithdraw" class="ui-btn jin-btn-gold">提现</router-link></li>
            </ul>
        </header>
        <ul class="ui-row wallet-info bg-white  margin-b-15">
            <li class="ui-col ui-col-50">
                <ul class="ui-list">
                    <li>
                        <div class="ui-avatar-s">
                            <span style="background-position: 0 0"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="font14 padding-b-5">上月佣金</h4>
                            <div class="ui-txt-warning font18 line-h-nor">0</div>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="ui-col ui-col-50" @click="onBank">
                <ul class="ui-list">
                    <li>
                        <div class="ui-avatar-s">
                            <span style="background-position: 0 -100px"></span>
                        </div>
                        <div class="ui-list-info">
                            <h4 class="font14 padding-b-5">银行卡</h4>
                            <div class="ui-txt-muted font14 line-h-nor">1张</div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="jin-list-group">
            <ul class="ui-list jin-list">
                <li class="ui-border-b">
                    <span class="wallet-redot wallet-redot-green"></span>
                    <div class="ui-list-info ui-txt-muted">可用余额</div>
                    <span class="ui-txt-warning">666</span>
                </li>
                <li>
                    <span class="wallet-redot wallet-redot-red"></span>
                    <div class="ui-list-info ui-txt-muted">提现冻结</div>
                    <span class="ui-txt-warning">0</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
    /*钱包*/
    .jin-btn-gold {
        color: #fff;
        background: #FFC107;
        background-image: none;
        border: none;
    }
    .wallet-header {
        height: 150px;
        background-image: linear-gradient(360deg, #72DEFE 0%, #2173EC 100%);
    }
    .wallet-info>li {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        height: 100px;
        border-bottom: 1px solid #E0E0E0;
    }
    .wallet-info>li:nth-child(2n) {
        border-left: 1px solid #E0E0E0;
    }
    .wallet-redot {
        display: block;
        width: 12px;
        height: 12px;
        margin-right: 10px;
        border-radius: 50%;
    }
    .wallet-redot-green {
        background-color: #3FC691;
    }
    .wallet-redot-red {
        background-color: #F14742;
    }

    .wallet-info .ui-avatar-s span {
        /*	background-image:url(../img/home/wallet-icon.png);*/
    }
    .layui-m-layercont {
        padding: 20px 40px!important;
    }
    .layui-m-layerbtn, .layui-m-layerbtn span {
        width: 49.99%;
    }
</style>
<script>
        import { XHRGet } from './../../js/ajax';
    export default{
        data(){
            return {
            }
        },
        components: {},
        created(){
            this.onMoney()
        },
        methods: {
            onMoney() {
                var load = layer.open({ type: 2,shadeClose: false})
                XHRGet('/api/Money/index', {},function (response) {
                    console.log(response)
                    layer.close(load);
                }.bind(this));
            },
            onBank: function(index) {
                var _this = this;
                layer.open({
                    content: '使用提现功能需添加一张支持提现的储蓄卡'
                    ,btn: ['添加储蓄卡', '取消']
                    ,style:'width：250px'
                    ,yes: function(index){
                        layer.close(index);
                        _this.$router.push({path:'/wallet/addBank'})
                    }
                });
            },
        }
    }
</script>
