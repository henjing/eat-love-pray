<template>
    <div class="select-actionsheet">
        <div class="ui-txt-info padding-t-10 padding-b-10 rlt text-center">
            所在地区
            <i class="jin-icon jin-icon-guanbi abs font20" style="right: 10px;top: 6px;color: #BCBCBC" @click="onFinish"></i>
        </div>
        <ul class="ui-whitespace  jin-box-align ui-border-tb">
            <li :class="{'margin-r-10':province.length>1}" @click="elCityData">{{province}} </li>
            <li :class="{'margin-r-10':city.length>1}" @click="elCountyData">{{city}} </li>
            <li :class="{'margin-r-10':county.length>1}">{{county}}</li>
            <li class="padding-t-10 padding-b-10  color-ff3" style="border-bottom: 1px solid #ff3e2a">请选择</li>
        </ul>
         <component :is="currentView" keep-alive
                    @msg-province="provinceData"
                    @msg-city="cityData"
                    @msg-county="countyData"
                     style="overflow: auto;height:calc(105vh - 128px );-webkit-overflow-scrolling: touch;"
         ></component>
    </div>
</template>
<style>
    .select-actionsheet {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: #fff;
    }
</style>
<script>
    import {XHRPost} from '../../js/ajax.js';
    import AddressSelectProvince from 'components/address/address-select-province.vue';
    import AddressSelectCity from 'components/address/address-select-city.vue';
    import AddressSelectCounty from 'components/address/address-select-county.vue';
    export default{
        data(){
            return {
                province:"",
                city:"",
                county:"",
                currentView: 'Province'
            }
        },
        components: {
            Province: AddressSelectProvince,
            City: AddressSelectCity,
            County: AddressSelectCounty
        },
        created: function () {
        },
        methods: {
//            获取数据
            provinceData(index){
                this.currentView=index.isType;
                this.province=index.isData;
            },
            cityData(index){
                this.currentView=index.isType;
                this.city=index.isData;
            },
            countyData(index){
                this.currentView=index.isType;
                this.county=index.isData;
                this.onFinish();
            },
//            清除数据
            elCityData(){
                this.currentView="Province";
                this.city=" ";
                this.county=" ";
            },
            elCountyData(){
                this.currentView="City";
                this.county=" "
            },
            onFinish(){
                let data = {
                    province:this.province,
                    city:this.city,
                    county:this.county
                };
                 this.$emit('select-data', data);
            },
        }
    }
</script>
