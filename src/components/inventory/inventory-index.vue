<template>
    <div>
        <div  class="inventory-top ui-whitespace  padding-t-15 padding-b-15 inventory-bg ui-txt-white">
            <div class="jin-justify-flex margin-b-15">
                <div class="rule-btn return-btn">
                    <router-link class="display-b color-9b" to="/">
                        <i class="jin-icon jin-icon-fanhui line-h-nor  font18 ui-txt-white"></i>
                    </router-link>
                </div>
                <div class="rule-btn filtrate-btn font14">账单</div>
            </div>
            <div class="jin-box-align line-h-12 font35">
                总库存
            </div>
            <ul class="jin-justify-flex margin-t-10">
                <li ><span class="font30">{{totalScore< 1 ? '0' : totalScore}}</span>单</li>
                <li>
                    <div class="ui-btn jin-btn-gold font14" @click="getPickUpData">提货</div>
                </li>
            </ul>
        </div>
        <div >
            <inventory-list
                    @total-data="onTotal"
            ></inventory-list>
            <inventory-quantity
                    v-if="unfoldAndClose"
                    :props-inv-data="invData"
                    :order-unfold="unfoldAndClose"
                    @order-close="onQuantityClose"
            ></inventory-quantity>
        </div>
    </div>
</template>
<style>
    .inventory-bg{
        background-image: linear-gradient(0deg, #72DEFE 0%, #2173EC 100%);
    }
    .inventory-top .return-btn {
        width: 34px; }

    .inventory-top .filtrate-btn {
        width: 64px; }
    .rule-btn {
        display: block;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #fff;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 100px;
    }
    .jin-btn-gold {
        color: #fff;
        background: #FFC107;
        background-image: none;
        border: none;
    }
</style>
<script>
    import { XHRGet} from '../../js/ajax.js';
    import inventoryList from 'components/inventory/inventory-list.vue';
    import inventoryQuantity from 'components/inventory/inventory-quantity.vue';
    export default{
        data(){
            return {
                totalScore:"",
                invData:"",
                unfoldAndClose:false
            }
        },
        components: {
            inventoryList,inventoryQuantity
        },
        created(){
        },
        methods: {
//            监听子组件返回数据
            onTotal(msg){
                this.totalScore=msg;
            },
            onQuantityClose(){
                this.unfoldAndClose = false;
            },
            getPickUpData(){
                XHRGet('/api/MyReserve/getPickUpData', { },function (response) {
                    this.unfoldAndClose = true;
                    this.invData = response.data.data;
                    console.log(response.data.data)
                }.bind(this))
            }
        }
    }
</script>
