<template>
    <div class="filtrate-tk">
        <div class="bg-white">
            <div class="jin-box-center padding-t-15">
            		<div class="avatar-wrap padding-b-10">
	                <div class="ui-avatar-s margin-r-10">
	                    <span :style="{backgroundImage:'url('+info.wechat_avatar+')'}"></span>
	                </div>
	                <span class="font14">{{info.user_name}}</span>
                </div>
                <div class="padding-b-5 font24 line-h-nor color-money">{{info.goods_number}}单</div>
                <div class="margin-b-20 font14 ui-txt-muted">购买产品</div>
            </div>
            <ul class=" buil-list  ui-border-t margin-b-10">
                <li class="jin-justify-flex">
                    <div class="font14">创建时间</div>
                    <div class="font12 ui-txt-muted">{{info.add_time}}</div>
                </li>
            </ul>
        </div>
        <ul class="ui-list ui-list-text ui-border-b">
            <li class="margin-l-0 ui-border-b">
                <h4 class="text-center font14">详细信息</h4>
            </li>
            <li class="ui-border-b">
                <div class="ui-list-info">商品说明</div>
                <div class="font14 ui-txt-muted">{{info.goods_name}}</div>
            </li>
            <li class="ui-border-b">
                <div class="ui-list-info">购买数量</div>
                <div class="font14">X{{info.goods_number}}</div>
            </li>
            <!--<li class="ui-border-b">
                <div class="ui-list-info">获得佣金</div>
                <div class="font14">￥{{info.profit}}</div>
            </li>-->
        </ul>
        <!--<div class="ui-whitespace padding-t-10 padding-b-10 text-right bg-white">
        		<span class="font14">合计：￥{{info.profit}}</span>
        </div>-->
        
        <div class="ui-whitespace text-center font14">
            <div v-if="fahuo">
                <div v-show="shipmentsYes ">
                    <div class="return-btm return-btm-color13B" v-show="guadan" @click="onGuandan">
                        挂单
                    </div>
                    <div class="return-btm return-btm-colorFF3" @click="onShipments" v-show="shipments">
                        发货
                    </div>

                    <div class="return-btm return-btm-colorABAB" v-show="!guadan" >
                        已挂单
                    </div>
                </div>
                <div class="return-btm return-btm-colorABAB" v-show="!shipmentsYes">
                    订单已完成
                </div>
            </div>
            <div class="return-btm return-btm-colorABAB" v-else="">
                已发货
            </div>
            <div class="return-btm">
                <router-link to="/">返回</router-link >
            </div>
        </div>

        <loading v-if="loadingShow"></loading>
    </div>
</template>

<script>
import Loading from '../common/loading.vue';
import { XHRPost } from '../../js/ajax.js';
    export default{
        data(){
            return{
            		info: {},
                id: this.$route.query.id,
                loadingShow: true,
                title: '销售记录详情',
                _switch:false,
                shipmentsYes:true,
                shipments:true,
                guadan: true,
                fahuo:false

            }
        },
        created: function() {
	        	document.title = this.title;
	        	this.getData();
        	
        },
        activated: function () {
        		document.title = this.title;
        },
        components:{
        		Loading
        },
        methods:{
	        	getData: function() {
	        		console.log(this.id)
				XHRPost('/api/Shop/salesDetail', {order_id: encrypt(String(this.id))} , function (response) {
				    if (response.data.data.status == "已收货") {
                        this.shipmentsYes = false;
                        this.fahuo = true;
                    }else {
				        this.fahuo = true;
                    }
                    if(response.data.data.status == "已发货"){
                        this.fahuo = false;
                    }
                    if(response.data.data.status == "已挂单"){
                        this.shipments = true;
                        this.guadan = false
                    }
					this.loadingShow = false;
					console.log(response.data)
					const data = response.data.data;
					this.info = data;
				}.bind(this));
			},
              onShipments(){
                var _this = this;
                let _div = '<div>' +
                    '<div class="padding-t-10 ui-txt-warning font12">如需自提，无需填写物流单号，物流公司名填写 "自提" 二字。</div>' +
                    '<input type="text" id="logisticsName" style="width:100%;height:40px; border:0;border-bottom:1px solid #ddd;" placeholder="物流公司名">' +
                    '<input type="tel" id="logisticsTel" style="width:100%;height:40px; border:0;border-bottom:1px solid #ddd;" placeholder="物流单号">' +
                    '</div>'
                layer.open({
                    content: _div,
                    shadeClose: false,
                    btn: ['确认发货', '取消'],
                    no: function () {
                        layer.closeAll()
                    },
                    yes: function () {
                        if (_this._switch) return false;
                        _this._switch = true;
                        console.log("_this.id", _this.id)
                        const postData = {
                            order_id: encrypt(String(_this.id)),
                            express_company: encrypt(String(document.getElementById('logisticsName').value)),
                            express_sn: encrypt(String(document.getElementById('logisticsTel').value))
                        };
                        XHRPost('/api/Shop/sendGoods',postData,function (response) {
                              if (response.data.status == 0) {
                                    layer.open({
                                        content: response.data.info,
                                        time: 2,
                                        style: 'background-color:rgba(0,0,0,.8);color:#fff'
                                    });
                                } else {
                                  layer.closeAll();
                                  _this.fahuo = false;
                                }
                            _this._switch = false;
                        }.bind(_this));
                  }
               })
            },
            onGuandan(){
                XHRPost('/api/Shop/holdOrder',{order_id: encrypt(String(this.id)),},function (response) {
                    if (response.data.status == 0) {
                        layer.open({
                            content: response.data.info,
                            time: 2,
                            style: 'background-color:rgba(0,0,0,.8);color:#fff'
                        });
                    } else {
                        this.shipments = true;
                        this.guadan = false
                    }
                }.bind(this));
            }
	    },
    }
</script>
<style scoped="scoped">
	.avatar-wrap {
		display: flex;
		align-items: center;
		align-content: center;
	}
	.ui-avatar-s {
		width: 30px;
		height: 30px;
		display: inline-block;
	}
    .return-btm {
        width: 70%;
        height: 40px;
        line-height: 40px;
        margin: 10px auto;
        color: #fff;
        background: #FFFFFF;
        border: 1px solid #DADADA;
        border-radius: 100px;
    }
    .return-btm-color13B{
        background-color: #13BF7B !important;
    }
     .return-btm-colorFF3{
        background-color: #2A93FF !important;
    }
    .return-btm-colorABAB{
        background-color: #ABABAB !important;
    }
    .return-btm a {
    		display: block;
    }

	.buil-list >li{
	    display: -webkit-box;
	    position: relative;
	    padding: 10px 15px;
	    -webkit-box-align: center;
	}

</style>
