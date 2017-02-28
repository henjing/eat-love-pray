<template>
    <div>
        <ul class="province ui-list text-left ui-list-active ui-border-b">
            <li class="ui-list-info ui-border-b" v-for="key in data" @click="onSelect(key.name)">{{key.name}}</li>
        </ul>
    </div>
</template>
<style>
</style>
<script>
    import {XHRPost} from '../../js/ajax.js';
    export default{
        data(){
            return {
              data:[
                    {
                        name:"第二页",
                    },
                    {
                        name:"第二页"
                    },
                    {
                        name:"第二页2"
                    },
                ],
                 type:"County",
            }
        },
        components: {},
        created: function () {
        },
        methods: {
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
