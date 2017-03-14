<template>
    <div>
        <div class="apply-item margin-b-10 ui-border-b">
            <!--收货地址-->
            <div class="address-border" @click="linkAddress">
                <ul class="ui-list jin-list-link" >
                    <li class="">
                        <div class="ui-list-info">
                            <h4 class="padding-b-10  ui-nowrap font14">收货地址：</h4>
                            <p class="padding-r-15 font12 line-h-12">{{orderAddressData.province}}{{orderAddressData.address}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="store-list jin-list margin-t-5">
                <li class="ui-border-b">
                    <div class="ui-list-thumb">
                        <span :style="{backgroundImage: 'url('+ orderData.goods_img_cover+')'}"></span>
                    </div>
                    <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                        {{orderData.goods_name}}
                    </p>
                    <div class="text-right">
                        <div class="font14 ui-txt-warning">￥{{orderData.price}}</div>
                        <div class="font10 color-9b">x{{number}}</div>
                    </div>
                </li>
            </ul>
            <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
                <div class="font14 color-9b">合计</div>
                <div class="font14 ui-txt-warning">￥{{orderData.total_price}}</div>
            </div>
            <div class="store-submit-btn jin-box-end ui-whitespace bg-white">
                <div class="">合计:<span class="ui-txt-warning">￥{{orderData.total_price}}</span></div>
                <div class="order-btn margin-l-15 font14" @click="onBank">提交订单</div>
            </div>
        </div>
        <index-bank
                v-if="bank"
                v-bind:state-bank="bank"
                v-bind:state-order-id="order_id"
                @on-close="onSelectBank"
        >
        </index-bank>
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
        left: 0;
        right: 0;
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
    import indexBank from 'components/index/index-bank.vue';
    export default{
        data(){
            return{
                mod:"",
                bank:false,
                address_id:this.$route.query.addid,
                number:this.$route.query.num,
                goods_id:this.$route.query.gid,
                order_id:this.$route.query.oid,
                orderData:"",
                orderAddressData:"",
                goods_order:"",
                addressNull:true,
            }
        },
        props:['state-buy'],
        components:{
            indexBank
        },
        created: function() {
//            let _urk = 'http://heshi.kongdian.me/index/?#/index/indexOrder?num='+ this.number +'&gid=' +this.goods_id +'&addid='+this.address_id;
            let _href = location.href.split("/index");
            let _urk = _href[0] + '/index/?#/index/indexOrder?num='+ this.number +'&gid=' +this.goods_id +'&addid='+this.address_id;
            if(window.location.href.substr(0, 50) == _urk.substr(0, 50)){
                this.goodsDetail();
            }else{
//                防止同步打断刷新
                setTimeout(function () {
                    window.location.href = _urk;
                },10)
            }
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
                let _this = this;
                let address = this.address_id == "undefined" ? "0" : this.address_id;
                let bankData = {goods_id:encrypt(String(this.goods_id)), goods_number:encrypt(String(this.number)), address_id:encrypt(String(address))}
//                判断order_id是否存在，防止生成多个订单
                let isOrderId = typeof(this.order_id) == "undefined" ? "" : this.order_id;
                console.log("打印", isOrderId.length)
                 console.log("打印", isOrderId)
                if (isOrderId.length<1){
//                    判断地址
                    if (this.addressNull){
                        XHRPost('/api/Shop/commitOrder',bankData,function (response) {
                            if (response.data.status==1){
                                _this.goods_order=response.data.data;
                                _this.order_id=response.data.data;
                                _this.bank=true;
                            }
                        }.bind(this));
                    }else {
                        layer.open({
                            content: "请添加地址！",
                            btn: ['确认'],
                            yes: function () {
                                _this.$router.push({path:'/address', query:{num:_this.number, gid:_this.goods_id}})
                                layer.closeAll();
                            },
                        });
                    }
                }else {
                    _this.bank=true;
                }
            },
            onSelectBank(){
                this.bank=false;
            },
            goodsDetail(){
//                alert("测试")
                let _this = this;
                var load = layer.open({ type: 2,shadeClose: false})
//                判断第一次请求address_id为空
                let address = this.address_id == "undefined" ? "0" : this.address_id;
                let goodsData = {goods_id:encrypt(String(this.goods_id)), goods_number:encrypt(String(this.number)), address_id:encrypt(String(address))};
                XHRPost('/api/Shop/getCommitOrderData',goodsData,function (response) {
                    if (response.data.status == 1){
                        this.orderData=response.data.data;
                        this.orderAddressData=response.data.data.address_info;
                        if(response.data.data.address_info == null){
                            this.orderAddressData={
                                province:null,
                                address:"请添加地址！"
                            }
                            this.addressNull = false;
                        }else {
                            _this.address_id=response.data.data.address_info.address_id;
                            this.addressNull = true;
                        }
                        layer.close(load);
                    }else {
                        layer.open({
                            content:response.data.info,
                            btn: ['确认'],
                            shadeClose: false,
                            yes: function () {
                                if(response.data.info == "未登录"){
                                    window.location.href="/index/login_register/login.html"
                                }
                                layer.closeAll();
                            },
                        });
                    }
                }.bind(this));
            },
            //        选择收货地址
            linkAddress(){
               this.$router.push({path:'/address', query:{num:this.number, gid:this.goods_id, oid:this.order_id}})
            }
        }
    }
</script>
