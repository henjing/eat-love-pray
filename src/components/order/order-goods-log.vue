<template id="temp-tab03">
    <div>
        <!--加载更多-->
        <div class="ui-loading-wrap ba-wi" v-if="data.loading">
            <p class="font14 ui-txt-info">加载中</p>
            <i class="ui-loading"></i>
        </div>
        <!--空缺状态 start -->
        <div class="jin-box-center margin-b-15 text-center" v-if="data.nullData" style="min-height: 400px">
            <img src="/static/images/null-data.png" style="width: 80%"/>
            <div class="margin-t-10 font14 ui-txt-muted">空旷到可以成为一片森林</div>
        </div>
        <!--空缺状态 end-->
        <div class="ui-loading-wrap ba-wi" v-if="data.bottom">
            <p class="font14 ui-txt-muted"><span class="no-more-data">已经到底了</span></p>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                data:this.logData
            }
        },
        props:["log-data"],
        components:{
        },
        methods:{

        }
    }
</script>
