<template>
    <div
            v-infinite-scroll="onNot"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
    >
        <div class="apply-item margin-b-10 ui-border-b" v-for="key in notData">
            <ul class="ui-list jin-list">
                <li class="ui-border-b">
                    <div class="ui-list-thumb">
                        <span :style="{backgroundImage: 'url('+ key.goods_img_cover+')'}"></span>
                    </div>
                    <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                        {{key.goods_name}}
                    </p>
                    <div class="text-right">
                        <div class="font12 ui-txt-warning">￥{{key.total_price}}</div>
                        <div class="font10 color-9b">x{{key.goods_number}}</div>
                    </div>
                </li>
            </ul>
            <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
                <div class="font14 color-9b">未支付</div>
                <button class="ui-btn ui-btn-s" style="width: 80px;color: red;border-color:red">去付款</button>
            </div>
        </div>
        <order-goods-log :log-data="logData"></order-goods-log>
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
                switch:false
            }
        },
        created(){
        },
        components:{
            OrderGoodsLog
        },
        methods:{
            onNot(){
                if (this.switch) return false;
                this.switch = true;
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
                     this.switch = false;
                }.bind(this));
            },
        }
    }
</script>
