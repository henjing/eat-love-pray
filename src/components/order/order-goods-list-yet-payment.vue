<template id="temp-tab02" >
    <div
            v-infinite-scroll="onYet"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
            style="overflow: auto; height: calc(100vh - 45px);-webkit-overflow-scrolling:  touch"
            class="jin-wrap"
    >
        <div class="apply-item margin-b-10 ui-border-b" v-for="key in yetData" >
            <ul class="ui-list jin-list" @click="orderDetails(key.order_id)">
                <li class="ui-border-b">
                    <div class="ui-list-thumb">
                        <span :style="{backgroundImage: 'url('+ key.goods_img_cover+')'}"></span>
                    </div>
                    <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                        {{key.goods_name}}
                    </p>
                    <div class="text-right">
                        <div class="font14 ui-txt-warning">{{key.goods_number}}单</div>
                    </div>
                </li>
            </ul>
            <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
                <div class="font14 color-9b" ref="status-hook">{{ key.status }}</div>
                <div>
                    <button class="ui-btn ui-btn-s" style="width: 80px;color: #333;" @click="onLogistics(key)">查看物流</button>
                    <button class="ui-btn ui-btn-s margin-l-5" 
	                    	style="width: 80px;color: red;border-color:red" 
	                    	@click='onDete(key)'
	                    	v-if="key.status !== '已收货'"
                    	>
                        	确认收货
                    </button>
                </div>
            </div>
        </div>
        <order-goods-log :log-data="logData"></order-goods-log>
        <store-footer :current="3"></store-footer>
    </div>
</template>
<script>
    import { XHRPost} from '../../js/ajax.js';
    import OrderGoodsLog from 'components/order/order-goods-log.vue';
    import StoreFooter from '../../components/common/footer.vue';
    export default{
        data(){
            return{
                busy:false,
                pages:1,
                yetData:[],
                logData:{
                    loading:true,
                    nullData:false,
                    bottom:false,
                },
                _switch:false,
                confirm: false,
            }
        },
        created(){
        },
        components:{
            OrderGoodsLog,StoreFooter
        },
        methods:{
        		//确认收货
        		onDete(info) {
        			const _this = this;
        			layer.open({
					content: '确定要确认收货吗？',
					btn: ['确认','取消'],
					yes: function () {
						XHRPost('/api/Shop/confirmOrder',{ order_id: encrypt(String(info.order_id)) }, function(response) {
		        				console.info(response.data)
		        				if (response.data.status === 1) {
		        					console.log('000',_this.confirm)
								layer.closeAll();
		        					layer.open({
									content: response.data.info,
									time: 2,
									end: function() {
										window.location.reload();
									}
								});
		        				} else {
		        					layer.open({
		        						content: response.data.info,
		        						btn: ['确认'],
		        						yes: function () {
		        							layer.closeAll();
		        						},
		        					});
		        				}
		        			});
					},
					no: function () {
						layer.closeAll();
					},
				});
        			
        		},
        		
            onYet(){
                if (this._switch) return false;
                this._switch = true;
                XHRPost('/api/MyOrder/index', {
                    status: encrypt("1"),
                    page: encrypt(String(this.pages))
                }, function (response) {
                    let _data = response.data;
                    if (_data.status == 1){
                        for (let i = 0; i < _data.data.length; i++) {
                            this.yetData.push(_data.data[i]);
                        }
                        ;
                        if (_data.current_page == _data.totalPage) {
                            this.busy = true;
                            this.logData.loading = false;
                            this.logData.bottom = true;
                        }
                        ;
                        if (_data.totalPage === 0) {
                            this.logData.nullData = true;
                            this.logData.loading = false;
                            this.logData.bottom = false;
                        }
                        ;
                        this.pages++;
                    }else {
                        this.logData.nullData = true;
                        this.logData.loading=false;
                        this.logData.bottom = false;
                    }
                    this._switch = false;
                }.bind(this));
            },
            //            查看物流
            onLogistics(msg){
                this.$router.push({path:'/order/Logistics', query:{oid:msg.order_id}})
            },
            //            查看订单详情
            orderDetails(msg){
                this.$router.push({path:'/index/indexOrderDetails', query:{oid:msg}})
            }
        }
    }
</script>
