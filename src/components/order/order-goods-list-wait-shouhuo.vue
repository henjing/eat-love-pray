<template id="temp-tab02" >
    <div >
        <div v-for="key in data" class="apply-item margin-b-10 ui-border-b">
            <ul class="ui-list jin-list">
                <li class="ui-border-b">
                    <div class="ui-list-thumb">
                        <span style="background-image:url(http://placeholder.qiniudn.com/100x100)"></span>
                    </div>
                    <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                        《Tiny World》青年艺术家谢雷铭限量复制画…2016 08-11 22:32青年艺术家谢雷铭限量复制画…2016 08-11 22:32青年艺术家谢雷铭限量复制画…2016 08-11 22:32
                    </p>
                    <div class="text-right">
                        <div class="font12 ui-txt-warning">￥100.00</div>
                        <div class="font10 color-9b">x10</div>
                    </div>
                </li>
            </ul>
            <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
                <div class="font14 color-9b">待收货</div>
                <div>
                    <button class="ui-btn ui-btn-s" style="width: 80px;color: #333;" @click="onLogistics()">查看物流</button>
                    <button class="ui-btn ui-btn-s margin-l-5" style="width: 80px;color: red;border-color:red"
                            @click='onDete(key)'
                    >确认收货</button>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
        var  info=[
                     {
                        goods_num:10,
                        goods_price:100,
                        id:1
                    },
                    {
                        goods_num:2,
                        goods_price:100,
                        id:1
                    }
                ];
    export default{
        data(){
            return{
                data:[

                ],
            }
        },
        components:{
        },
        created: function() {
            this.data=info;
        },
        props:["msgName"],
        methods:{
            onDete:function (index) {
                var dataAll = this.data;
                layer.open({
                    content: '您是否已经收到该商品？'
                    ,btn: ['已收', '未收']
                    ,yes: function(){
                        layer.open({content: '收货成功!', time: 1});
                        setTimeout(function(){
                            dataAll.splice(dataAll.indexOf(index), 1)
                        },1500)

                    }
                });
            },
//            查看物流
            onLogistics(index){
                this.$router.push({path:'/order/Logistics'})
            }
        },

    }
</script>
