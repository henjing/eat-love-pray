<template>
    <div>
<!--        &lt;!&ndash;未发货&ndash;&gt;
        <template id="no" v-if="logistics">
            <ul class="ui-list jin-list margin-b-10">
                <li class="buy-panel buy-panel-no">
                    <div class="buy-icon-yes jin-icon jin-icon-waitlove-copy display-box"></div>
                    &lt;!&ndash;产品描述、类型&ndash;&gt;
                    <div class="ui-list-info line-h-14">
                        <div class="padding-r-15 font14">厂商未发货</div>
                        <div class="padding-r-15 font12">请等待厂商发货</div>
                    </div>
                    &lt;!&ndash;单价、数量&ndash;&gt;
                    <div class="buy-contact-btn font14">
                        联系厂商
                    </div>
                </li>
            </ul>
        </template>-->
        <!--已发货-->
        <template >
            <div>
                <ul class="ui-list jin-list margin-b-10">
                    <li class="buy-panel buy-panel-yes">
                        <div class="buy-icon-yes jin-icon jin-icon-fahuo display-box"></div>
                        <!--产品描述、类型-->
                        <div class="ui-list-info line-h-14">
                            <div class="padding-r-15 font14">{{detailsData.status}}</div>
                        </div>
                    </li>
                   <!-- <li class="ui-form-item-link" >
                        <div class="ui-list-info line-h-12">
                            <h4 class="font12 color-13be7b">【金华市】金华转运中心 已发出</h4>
                            <time class="font10 ui-txt-info">2016-09-22 06:33:12</time>
                        </div>
                    </li>-->
                </ul>
                <!--收货地址-->
                <div class="address-border">
                    <ul class="ui-list ">
                        <li class="">
                            <div class="ui-list-info">
                                <h4 class="padding-b-15 ui-nowrap font14">收件人：{{detailsData.consignee}}  {{detailsData.mobile}}</h4>
                                <p class="padding-r-15 font12 line-h-12">{{detailsData.address}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul class="ui-list jin-list margin-b-10">
                    <li class="ui-border-tb">
                        <div class="ui-list-thumb">
                            <span  :style="{backgroundImage: 'url('+ detailsData.goods_img_cover+')'}"> </span>
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
                <ul class="ui-list ui-list-pure margin-b-20 ui-border-tb">
                    <li class="font12 txt-color2 line-h-12">
                        <div class="margin-b-5">物流公司：{{detailsData.express_company}}</div>
                        <div class="margin-b-5">订单编号：{{detailsData.express_sn}}</div>
                        <!--<div>发货时间：2016-09-21 17:34:19</div>-->
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>
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
                    console.log("response", response)
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
