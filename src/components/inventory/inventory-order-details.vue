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
        <div class="address-border">
            <ul class="ui-list">
                <li class="">
                    <div class="ui-list-info">
                        <h4 class="padding-b-15 ui-nowrap font14">收货人：</h4>
                        <p class="padding-r-15 font12 line-h-12">{{orderData.address}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="ui-list jin-list margin-b-15 ui-border-tb">
            <li>
                <div class="ui-list-thumb" :style="{backgroundImage: 'url('+ detailsData.goods_img_cover+')'}"></div>
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
            <div class="ui-whitespace padding-t-15">合计: <span class="ui-txt-warning">￥{{detailsData.total_price}}</span></div>
            <ul class="order-details-btn jin-justify-flex font12">
                <router-link to="">查看库存</router-link>
                <router-link to="/store">返回首页</router-link>
            </ul>
        </div>
        <ul class="ui-list ui-list-pure margin-b-20 ui-border-tb">
            <li class="font12 color-9b line-h-12">
                <div class="margin-b-5">订单编号：233202324504582234</div>
                <div class="margin-b-5">创建时间：2016-09-21 17:34:19</div>
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
                orderId:this.$route.query.id,
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
            }
        }
    }
</script>
