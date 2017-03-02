<template>
    <div>
        <ul class="province ui-list text-left ui-list-active ui-border-b">
            <li class="ui-list-info ui-border-b" v-for="key in data" @click="onSelect(key)">{{key.county_name}}</li>
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
                city_id:this.propsCity
            }
        },
        components: {},
        props:['props-city'],
        created() {
            this.getCountyList();
        },
        methods: {
            getCountyList(){
                XHRPost('/api/Shop/getCountyList', {city_id:encrypt(String(this.city_id))}, function (response) {
                    this.data=response.data.data;
                }.bind(this))
            },
            onSelect(msg){
                let data = {
                    isType:this.type,
                    isData:msg
                };
                this.$emit('msg-county', data)
            }
        }
    }
</script>
