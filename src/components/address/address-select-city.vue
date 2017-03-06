<template>
    <div>
        <ul class="province ui-list text-left ui-list-active ui-border-b">
            <li class="ui-list-info ui-border-b" v-for="key in data" @click="onSelect(key)">{{key.city_name}}</li>
        </ul>
        <!--加载更多-->
        <div class="ui-loading-wrap ba-wi" v-if="data.length<1">
            <p class="font14 ui-txt-info">加载中</p>
            <i class="ui-loading"></i>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import {XHRPost} from '../../js/ajax.js';
    export default{
        data(){
            return {
                data:"",
                type:"County",
                province_id:this.propsProvince
            }
        },
        props:['props-province'],
        components: {},
        created: function () {
            this.getCityList();
        },
        methods: {
            getCityList(){
                XHRPost('/api/Shop/getCityList', {province_id:encrypt(String(this.province_id))}, function (response) {
                    this.data=response.data.data;
                }.bind(this))
            },
            onSelect(msg){
                  let data = {
                    isType:this.type,
                    isData:msg
                };
                this.$emit('msg-city', data)
            }
        }
    }
</script>
