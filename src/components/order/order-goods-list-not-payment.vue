<template>
    <div
            v-infinite-scroll="onNot"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
            style="overflow: auto; height: calc(100vh - 45px);-webkit-overflow-scrolling:  touch"
            class="jin-wrap"
    >
        <div class="apply-item margin-b-10 ui-border-b" v-for="key in notData">
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
                <div class="font14 color-9b">{{key.status}}</div>
                <div>
                    <button class="ui-btn ui-btn-s" style="width: 80px;color: red;border-color:red" v-if="key.status == '未付款'" @click="goPayment(key)">立即付款</button>
                    <button class="ui-btn ui-btn-s" style="width: 80px;color: #333;" v-if="key.status == '已收货'" @click="onLogistics()">查看物流</button>
                    <div v-if="key.status == '已付款'">&nbsp;</div>
                </div>
            </div>
        </div>
        <index-bank
                v-if="bank"
                v-bind:state-bank="bank"
                v-bind:state-order-id="order_id"
                @on-close="onSelectBank"
        >
        </index-bank>
        <order-goods-log :log-data="logData"></order-goods-log>
        <store-footer :current="3"></store-footer>
    </div>
</template>
<style>
    .layui-m-layerbtn span[no] {
        color: #FF3E2A;
    }
    .jin-list > li {
  position: relative;
  margin-left: 0;
  line-height: 24px;
  display: -webkit-box; }
</style>
<script>
    import OrderGoodsLog from 'components/order/order-goods-log.vue';
    import { XHRPost} from '../../js/ajax.js';
    import indexBank from 'components/index/index-bank.vue';
    import StoreFooter from '../../components/common/footer.vue';
    export default{
        data(){
            return{
                busy:false,
                pages:1,
                notData:[],
                logData:{
                    loading:true,
                    nullData:false,
                    bottom:false,
                },
                _switch:false,
                address_id:"0",
                bank:false,
                order_id:""
            }
        },
        created(){
        },
        components:{
            OrderGoodsLog,indexBank,StoreFooter
        },
        methods:{
            onNot(){
                if (this._switch) return false;
                this._switch = true;
                XHRPost('/api/MyOrder/index', {status:encrypt("0"),page:encrypt(String(this.pages))},function (response) {
                    let _data = response.data;
                    if (_data.status == 1){
                        for (let i = 0; i< _data.data.length; i++){
                            this.notData.push(_data.data[i]);
                        }
                        if(_data.current_page == _data.totalPage ){
                            this.busy = true;
                            this.logData.loading=false;
                            this.logData.bottom = true;
                        }
                        if (_data.totalPage === 0) {
                            this.logData.nullData = true;
                            this.logData.loading=false;
                            this.logData.bottom = false;
                        }
                        this.pages++;
                    }else {
                        this.logData.nullData = true;
                        this.logData.loading=false;
                        this.logData.bottom = false;
                    }
                    console.log(_data)
                     this._switch = false;
                }.bind(this));
            },
            goPayment(msg){
/*
//                默认地址为0
                this.$router.push({path:'/index/indexOrder', query:{num:msg.goods_number, gid:msg.goods_id, addid:this.address_id}})

*/
                this.order_id = msg.order_id;
                 this.bank=true;
            },
            //            查看订单详情
            orderDetails(msg){
                this.$router.push({path:'/index/indexOrderDetails', query:{oid:msg}})
            },
            onSelectBank(){
                this.bank=false;
            },
        }
    }
</script>
