<template>
    <div
            v-infinite-scroll="inventory"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="90"
              style="overflow: auto;height:calc(90vh - 128px );-webkit-overflow-scrolling: touch;"
    >
        <div class="apply-item margin-b-10 ui-border-b" v-for="key in listData">
            <ul class="ui-list jin-list">
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
                <div class="font14 color-9b">未支付</div>
                <button class="ui-btn ui-btn-s" style="width: 80px;color: red;border-color:red">去付款</button>
            </div>
        </div>
        <order-goods-log :log-data="logData"></order-goods-log>
    </div>
</template>
<style>
</style>
<script>
    import { XHRGet} from '../../js/ajax.js';
    import OrderGoodsLog from 'components/order/order-goods-log.vue';
    export default{
        data(){
            return{
                busy:false,
                pages:1,
                listData:[],
                logData:{
                    loading:true,
                    nullData:false,
                    bottom:false,
                },
                switch:false
            }
        },
        components: {
            OrderGoodsLog
        },
        created: function () {
        },
        methods: {
             inventory(){
                if (this.switch) return false;
                this.switch = true;
                XHRGet('/api/MyReserve/Index', { },function (response) {
                    let _data = response.data;
                    this.$emit('total-data',_data.data.total_store);
                    if (_data.status == 1){
                        for (let i = 0; i< _data.data.list.length; i++){
                            this.listData.push(_data.data.list[i]);
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
                     this.switch = false;
                }.bind(this));
            },
        }
    }
</script>
