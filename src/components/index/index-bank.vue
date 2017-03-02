<template>
        <!--选择支付方式弹框-->
    <div class="de-actionsheet container opacity">
        <div  class="actionsheet-cnt c-up-before payment container " :class="{'c-up-move':mod}">
            <div class="bank-title text-center font12">选择支付方式</div>
            <ul class="ui-list bank-list">
                <li class="ui-border-b" @click="onPayKong()">
                    <div class="icon-list">
                        <i class="jin-icon jin-icon-pay color-ff3 font24"></i>
                        <div class="margin-l-10 font14 color-499">钱包支付</div>
                    </div>
                    <div class="font12 color-9b">可用余额：￥{{bankData.can_use_money}}</div>
                </li>
                <li class="ui-border-b" @click="onPayWei()">
                    <div class="icon-list">
                          <i class="jin-icon jin-icon-weixinzhifu color-13B font24"></i>
                        <div class="margin-l-10 font14 color-499">微信支付</div>
                    </div>
                </li>
            </ul>
            <div class="close-bank-btn text-center color-4a" @click="close">取消</div>
        </div>
    </div>
</template>
<style scoped>
    .bank-title{
        padding: 2px 0;
        background-color: #f8f8f8;
    }
    .bank-list>li{
        width: 100%;
        display: -webkit-box;
        -webkit-box-pack: justify;
        -webkit-box-align: center;
        margin-left: 0;
        padding: 10px 15px;
    }
    @media (max-width: 320px){
        .bank-list>li{
            padding: 10px;
        }
    }
    .icon-list{
        display: -webkit-box;
        -webkit-box-flex:1;
    }
    .close-bank-btn{
        padding: 15px 0;
    }
</style>
<script>
    import {XHRPost} from './../../js/ajax';
    export default{
        data(){
            return{
                mod:false,
                goods:this.stateId,
                bankData:"",
                orderId:this.stateOrderId,
                switch:false
            }
        },
        components:{
        },
        props:['state-bank', 'state-order-id'],
        created: function() {
            this.payData();
            let _this = this;
            setTimeout(function(){
                _this.mod =_this.stateBank;
            }, 100)
        },
        methods:{
            close(){
                let _this = this;
                this.mod=false;
                setTimeout(function(){
                    _this.$emit('on-close')
                }, 300);
            },
            payData(){
                XHRPost('/api/Shop/payStyleData',{order_id:encrypt(String(this.orderId))},function (response) {
                    this.bankData=response.data.data;

                }.bind(this));
            },
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
                XHRPost('/api/Shop/wechatPay',{order_id: encrypt(String(this.orderId))},function (response) {
                    if (response.data.status == 0) {
                        layer.open({
                            content: response.data.info,
                            time: 2,
                            style: 'background-color:rgba(0,0,0,.8);color:#fff'
                        });
                    } else {
                        _this.$router.push({path:'/index/indexOrderDetails',query: { oid:_this.orderId }})
                    }
                }.bind(this));
            }
        }
    }
</script>
