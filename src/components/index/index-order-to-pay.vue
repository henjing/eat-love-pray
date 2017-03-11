<template>
    <div>
        <div class="order-details-head jin-justify-flex ui-whitespace margin-b-10 font14">
            <div class="text">
                <div>{{detailsData.status}}</div>
            </div>
            <div class="text">
                <div class="order-details-bg"></div>
            </div>
        </div>
        <!--收货地址-->
        <div class="address-border margin-b-5">
            <ul class="ui-list">
                <li class="">
                    <div class="ui-list-info">
                        <h4 class="padding-b-15 ui-nowrap font14">收货人：{{detailsData.consignee}}  {{detailsData.mobile}}</h4>
                        <p class="padding-r-15 font12 line-h-12">{{detailsData.address}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="ui-list jin-list margin-b-15 ui-border-tb">
            <li>
                <div class="ui-list-thumb" >
                    <span :style="{backgroundImage: 'url('+ detailsData.goods_img_cover+')'}"></span>
                </div>
                <!--产品描述、类型-->
                <div class="ui-list-info">
                    <div class="line-clamp description padding-r-15">{{detailsData.goods_name}}</div>
                </div>
                <!--数量-->
                <div class="text-right ui-txt-warning">
                    <span>{{detailsData.goods_number}}</span>单
                </div>
            </li>
        </ul>
        <div class="margin-b-15 bg-white">
            <div class="ui-whitespace padding-t-15">总价: <span class="ui-txt-warning">￥{{detailsData.total_price}}</span></div>
            <div class="order-details-btn jin-justify-flex font12">
                <a @click="onPayWei">微信支付</a>
                <a @click="onPayKong">微股东支付</a>
            </div>
        </div>
        <ul class="ui-list ui-list-pure margin-b-20 ui-border-tb">
            <li class="font12 color-9b line-h-12">
                <div class="margin-b-5">订单编号：{{ detailsData.express_sn }}</div>
                <div class="">创建时间：{{ detailsData.add_time }}</div>
            </li>
        </ul>
    </div>
</template>
<style>
</style>
<script>
    import {XHRPost} from './../../js/ajax';
    export default{
        data(){
            return{
                orderId:this.$route.query.oid,
                detailsData:""
            }
        },
        created(){
            this.orderDetail()
        },
        components:{
        },
        methods:{
            orderDetail(){
                var _this = this;
                XHRPost('/api/MyOrder/orderDetail',{order_id: encrypt(String(this.orderId))},function (response) {
                    if (response.data.status == 0) {
                        layer.open({
                            content: response.data.info,
                            time: 2,
                            style: 'background-color:rgba(0,0,0,.8);color:#fff'
                        });
                    } else {
                        _this.detailsData = response.data.data;
                    }
                }.bind(this));
            },
            // 微信接口
            getWeiChat() {
                let _this = this;
                XHRPost('/api/Pay/ajaxPayInfo', {
                    order_id: encrypt(this.orderId + '')
                }, function (res) {
                    console.log('res', res);
                    layer.closeAll();
                    // alert(JSON.stringify(res));
                    if (res.data.status == 1) {
                        _this.nextWePay(res.data.data);
                    }
                })
            },
            nextWePay(jsonStr) {
                window.wePayObj = JSON.parse(jsonStr);
                // alert(JSON.stringify(jsonStr));
                this.callPay();
            },
            callPay() {
                let _this = this;
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', _this.jsApiCall, false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', _this.jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', _this.jsApiCall);
                    }
                } else {
                    _this.jsApiCall();
                }
            },
            jsApiCall() {
                let _this = this;
                // alert(JSON.stringify(window.wePayObj));
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    window.wePayObj,
                    function(res){
                        // alert(JSON.stringify(res));
                        if(res.err_msg == "get_brand_wcpay_request:ok"){
                                layer.open({
                                    title: '温馨提示'
                                    ,content: '支付成功。'
                                    ,btn: ['我知道了']
                                    ,yes : function () {
                                        window.location.href='/index/order';
                                    }
                                });
                        }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                            window.location.reload();
                        }else{
                            layer.open({
                                title: '温馨提示'
                                ,content: '支付失败，请重试。'
                                ,btn: ['我知道了']
                                ,yes : function () {
                                    window.location.reload();
                                }
                            });
                        }
                    }
                );
            },
//            payData(){
//                console.log('orderID', this.orderId);
//                XHRPost('/api/Shop/payStyleData',{order_id:encrypt(String(this.orderId))},function (response) {
//                    this.bankData=response.data.data;
//
//                }.bind(this));
//            },
            // 微股东支付
            onPayKong(){
                var _this = this;
                this.close();
                layer.open({
                    title: '请输入交易密码',
                    content: '<input type="password" id="password" style="width:100%;height:40px; border:0;border-bottom:1px solid #ddd;" placeholder="输入支付密码">',
                    shadeClose: false,
                    btn: ['确认支付', '取消'],
                    no: function () {
                        layer.closeAll()
                    },
                    yes: function () {
                        if (_this.switch) return false;
                        _this.switch = true;
                        // console.log('pay', _this);
                        const postData = {
                            order_id: encrypt(String(_this.orderId)),
                            pay_password: encrypt(String(document.getElementById('password').value))
                        };
                        XHRPost('/api/Pay/ajaxKdPay',postData,function (response) {
                              if (response.data.status == 0) {
                                    layer.open({
                                        content: response.data.info,
                                        time: 2,
                                        style: 'background-color:rgba(0,0,0,.8);color:#fff'
                                    });
                                } else {
                                  layer.closeAll();
                                  _this.$router.push({path:'/index/indexOrderDetails',query: { oid: _this.orderId}})
                                }
                            _this.switch = false;
                        }.bind(_this));
                    }
                })
            },
            onPayWei(){
                var _this = this;
                layer.open({
                    type: 1,
                    shadeClose: false
                });
                this.getWeiChat();
            }
        }
    }
</script>
