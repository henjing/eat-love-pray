<template>
    <div>
            <div class="apply-item margin-b-10 ui-border-b">
        <ul class="store-list jin-list">
            <li class="ui-border-b">
                <div class="ui-list-thumb">
                    <span style="background-image:url(http://placeholder.qiniudn.com/100x100)"></span>
                </div>
                <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                    {{orderData.goods_name}}
                </p>
                <div class="text-right">
                    <div class="font14 ui-txt-warning">￥{{orderData.price}}</div>
                    <div class="font10 color-9b">x{{number.plan}}</div>
                </div>
            </li>
        </ul>
        <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
            <div class="font14 color-9b">合计</div>
            <div class="font14 ui-txt-warning">￥{{orderData.price * number.plan}}</div>
        </div>
        <div class="store-submit-btn jin-box-end ui-whitespace bg-white">
            <div class="">合计:<span class="ui-txt-warning">￥{{orderData.price * number}}</span></div>
            <div class="order-btn margin-l-15 font14" @click="onBank">提交订单</div>
        </div>
    </div>
        <store-bank
                v-if="bank"
                v-bind:state-bank="bank"
                v-bind:state-id="goods_id"
                @on-close="onSelectBank"
        >
        </store-bank>
    </div>
</template>
<style>
    .store-list>li{
        position: relative;
        background-color: #fff;
        line-height: 24px;
        display: -webkit-box;
    }
    .store-submit-btn{
        position: fixed;
        bottom:0;
        display: -webkit-box;
        -webkit-box-align: center;
        width: 100%;
        padding: 15px;
        background: #FFFFFF;
        box-shadow: 0 -1px 10px 0 rgba(0,0,0,0.10);
    }
    .jin-box-end{
        display:-webkit-box;
        -webkit-box-pack:end;
    }
    .order-btn{
        padding: 3px 10px;
        color: #fff;
        background: #FF3E2A;
        border-radius: 3px;
    }
</style>
<script>
    import {XHRPost, XHRGet} from './../../js/ajax';
    import storeBank from 'components/store/store-bank.vue';
    export default{
        data(){
            return{
                mod:"",
                bank:false,
                number:this.$route.query,
                orderData:""
            }
        },
        props:['state-buy'],
        components:{
            storeBank
        },
        created: function() {
            this.goodsDetail();
            let _this = this;
            setTimeout(function(){
                _this.mod =_this.stateBuy;
            }, 100)
        },
        methods:{
            close(){
                let _this = this;
                 this.mod=false;
                setTimeout(function(){
                    _this.$emit('on-close')
                }, 500);
            },
//            提交订单
            onBank(){
                this.bank=true;
            },
            onSelectBank(){
                this.bank=false;
            },
            goodsDetail(){
                var load = layer.open({ type: 2,shadeClose: false})
                XHRGet('/api/Shop/getCommitOrderData',{},function (response) {
                    this.orderData=response;
                    console.log(this.orderData)
                    layer.close(load);
                }.bind(this));
            }
        }
    }
</script>
