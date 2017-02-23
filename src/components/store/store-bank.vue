<template>
        <!--选择支付方式弹框-->
    <div class="de-actionsheet container opacity">
        <div  class="actionsheet-cnt c-up-before payment container " :class="{'c-up-move':mod}">
            <div class="bank-title text-center font12">选择支付方式</div>
            <ul class="ui-list bank-list">
                <li class="ui-border-b" @click="onPay">
                    <div class="icon-list">
                        <i class="jin-icon jin-icon-pay color-ff3 font24"></i>
                        <div class="margin-l-10 font14 color-499">钱包支付</div>
                    </div>
                    <div class="font12 color-9b">可用余额：￥100.00</div>
                </li>
                <li class="ui-border-b" @click="onPay">
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
    export default{
        data(){
            return{
                mod:false,
            }
        },
        components:{
        },
        props:['state-bank'],
        created: function() {
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
            onPay(){
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
                             layer.closeAll()
                            _this.$router.push({path:'/store/storeOrderDetails'})
                        }
                    })
            }
        }
    }
</script>
