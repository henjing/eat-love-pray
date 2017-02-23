<template>
    <div class="jin-wrap margin-b-10 top-display-n">
    <div class="banner">
        <div class="swiper-container">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" style="background-image: url(http://placeholder.qiniudn.com/190x284);"></li>
                <li class="swiper-slide" style="background-image: url(http://placeholder.qiniudn.com/190x284);"></li>
            </ul>
            <div class="swiper-pagination"></div>
            <div class=" twxq abs"><a href="#img" class="line-h-nor font12 twxq-yuan ui-txt-info">图文<br/>详情</a></div>
        </div>

    </div>
    <!--产品说明信息-->
    <ul class="ui-whitespace w-detail-info ui-row-flex ui-border-b">
        <li class="display-box ui-col ui-col-4 ui-txt-warning">￥<span class="font20 font-w600">100</span>/<i class="font12">件</i></li>
        <li class="ui-col text-center">
            <div class="font18 line-h-12">999</div>
            <div class="font12 ui-txt-info line-h-12">累计销量</div>
        </li>
    </ul>
    <!--产品介绍信息-->
    <div class="ui-tab detail-intro bg-white ui-border-b">
        <ul class="ui-whitespace margin-b-10">
            <li class="padding-t-15 padding-b-15">体一杯茶品人生沉浮，平常心造万千世界！</li>
            <li>
                <!--line-clamp line-clamp-4-->
                <div class=" unfold">
                    <p class="font14 ui-txt-info line-clamp" :class="{'line-clamp-4':unfold}">
                        陈皮六堡茶集合了六堡茶与新会陈皮的特殊功效： 1、六堡茶：暖胃、
                        减肥、降脂、防治动脉硬化、防治冠心病、降压、抗衰老、抗癌、降糖、抑菌消炎、减轻烟煤毒、减轻重金属毒、抗辐射、兴奋中枢神经、利尿、防龋齿、明目、助消化、抗毒、灭菌、预防便秘、解酒.
                        2、新会陈皮：理气健脾、燥湿化痰、疏肝润肺、消积化滞、健胃止咳、宜通五脏，疗酒病。皮中的胡萝卜素，维生素C、维生素P比果肉的含量还高。3、安化黑茶是中国历史最悠久的茶品之一，其起源及演变跨越1000多年，安化黑茶不仅是“茶马古道”上的绝对主角，更是“丝绸之路”上的大腕明星。哪怕从安化黑茶外观的细枝末梢上，我们都可以轻易找到那些传颂千年的典故，让我们不禁感慨古人的智慧，和安化黑茶“生命之饮”的历史价值。更为称奇的是，由古至今，安化黑茶的地位并没有因为物质生活的不断丰富而衰减，反而不断加强，其工艺流程也没有因为科技的快速发展而改变，反而要返璞归真。这就是茶中“活化石”的独特魅力，这就是被誉为“生命之饮”的安化黑茶，这也正是世界主要博物馆争相收藏安化黑茶无可辩驳的理由。我们说:“安化黑茶，喝它养生、存它升值”。
                    </p>
                </div>
            </li>
            <li>
                <h3 class="ui-txt-warning margin-t-10" @click="onUnfold">{{unfold? "展开" : "收起"}}</h3>
            </li>
        </ul>
    </div>

    <div class="ui-list" id="img">
        <div class="graphic margin-t-10">
            <img src="http://placeholder.qiniudn.com/190x284">
        </div>
    </div>
    <div class="ui-whitespace bottom-btn" @click="onBuy">
        立即购买
    </div>
        <store-quantity
                v-if="buy"
                 v-bind:state-buy="buy"
                @on-close="onSelectBuy"
        >
        </store-quantity>
</div>
</template>
<style>
</style>
<script>
    import storeQuantity from 'components/store/store-quantity.vue';
    export default{
        data(){
            return{
                unfold:true,
                buy:false
            }
        },
        components:{
            storeQuantity
        },
        methods:{
            onUnfold(){
                console.log(this.unfold)
                this.unfold = !this.unfold;
            },
            onBuy(){
                this.buy=true;
            },
            onSelectBuy(){
                this.buy=false;
            },
        }
    }
</script>
