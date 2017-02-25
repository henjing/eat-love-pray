<template>
    <div>
        <!--收货地址-->
        <div class="address-border">
            <ul class="ui-list jin-list-link">
                <li class="">
                    <div class="ui-list-info">
                        <h4 class="padding-b-15 ui-nowrap font14">收货地址：</h4>
                        <p class="padding-r-15 font12 line-h-12">{{orderData.address}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="apply-item margin-b-10 ui-border-b">
            <ul class="store-list jin-list">
                <li class="ui-border-b">
                    <div class="ui-list-thumb">
                        <span :style="{backgroundImage: 'url('+ orderData.goods_img_cover+')'}"></span>
                    </div>
                    <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                        {{orderData.goods_name}}
                    </p>
                    <div class="text-right">
                        <div class="font14 color-9b">x{{orderData.goods_number}}</div>
                    </div>
                </li>
            </ul>
            <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
                <div class="font14 color-9b">合计</div>
                <div class="font14 ui-txt-warning">{{orderData.goods_number}}单</div>
            </div>
            <div class="store-submit-btn jin-box-end ui-whitespace bg-white">
                <div class="">合计:<span class="ui-txt-warning">{{orderData.goods_number}}单</span></div>
                <div class="order-btn margin-l-15 font14" @click="onPickUp">提交订单</div>
            </div>
    </div>
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
    export default{
        data(){
            return{
                mod:"",
                bank:false,
                number:this.$route.query.num,
                orderData:"",
                goods_order:"",
                goods_id:this.$route.query.gid
            }
        },
        props:['state-buy'],
        components:{
        },
        created: function() {
            this.goodsDetail();
        },
        methods:{
            goodsDetail(){
                var load = layer.open({ type: 2,shadeClose: false})
               let data={goods_id:encrypt(String(this.goods_id)), pick_number:encrypt(String(this.number))};
                XHRPost('/api/MyReserve/getConfirmPickUp',data,function (response) {
                    console.log("dayin", response)
                    this.orderData=response.data.data;
                    layer.close(load);
                }.bind(this));
            },
//            提交订单
            onPickUp(){
                let data={goods_id:encrypt(String(this.goods_id)), pick_number:encrypt(String(this.number)), address_id:encrypt(String(this.orderData.address_id))};
                XHRPost('/api/MyReserve/pickUp',data,function (response) {
                    if (response.data.status==1){
                        this.$router.push({path:'/inventory/inventoryOrder',query:{num:this.number,gid:this.invQuantity.goods_id}})
                    }else {
                        layer.open({
                            content: response.data.info,
                            time: 2,
                            style: 'background-color:rgba(0,0,0,.8);color:#fff'
                        });
                    }
                }.bind(this));
            },
            onSelectBank(){
                this.bank=false;
            }
        }
    }
</script>
