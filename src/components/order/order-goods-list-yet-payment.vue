<template id="temp-tab02" >
    <div
            v-infinite-scroll="onYet"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="100"
    >
        <div class="apply-item margin-b-10 ui-border-b" v-for="key in yetData" >
            <ul class="ui-list jin-list">
                <li class="ui-border-b">
                    <div class="ui-list-thumb">
                        <span :style="{backgroundImage: 'url('+ key.goods_img_cover+')'}"></span>
                    </div>
                    <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                        {{key.goods_name}}
                    </p>
                    <div class="text-right">
                        <div class="font14 ui-txt-warning">x{{key.goods_number}}</div>
                    </div>
                </li>
            </ul>
            <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
                <div class="font14 color-9b">{{key.status}}</div>
                <div>
                    <button class="ui-btn ui-btn-s" style="width: 80px;color: #333;" @click="onLogistics()">查看物流</button>
                    <!--    <button class="ui-btn ui-btn-s margin-l-5" style="width: 80px;color: red;border-color:red"
                                @click='onDete(key)'
                        >确认收货</button>-->

                </div>
            </div>
        </div>
         <order-goods-log :log-data="logData"></order-goods-log>
    </div>
</template>
<script>
    import { XHRPost} from '../../js/ajax.js';
    import OrderGoodsLog from 'components/order/order-goods-log.vue';
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
                _switch:false
            }
        },
        created(){
        },
        components:{
            OrderGoodsLog
        },
        methods:{
            onYet(){
                if (this._switch) return false;
                this._switch = true;
                XHRPost('/api/MyOrder/index', {
                    status: encrypt("1"),
                    page: encrypt(String(this.pages))
                }, function (response) {
                    let _data = response.data;
                    console.log("已发货", _data)
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
            onLogistics(index){
                this.$router.push({path:'/order/Logistics'})
            }
        }
    }
</script>
