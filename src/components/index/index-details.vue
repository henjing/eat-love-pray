<template>
    <div class="jin-wrap margin-b-10 top-display-n">
    <div class="banner">
        <div class="swiper-container swiper-detail-hook">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" :style="{backgroundImage:'url(/static/images/pro-01.png)'}"></li>
                <li class="swiper-slide" :style="{backgroundImage:'url(/static/images/pro-02.png)'}"></li>
                 <li class="swiper-slide" :style="{backgroundImage:'url(/static/images/pro-03.png)'}"></li>
            </ul>
            <div class=" twxq abs">
                <a href="javascript:void(0)"  @click="goAnchor('#img')" class="line-h-nor font12 twxq-yuan ui-txt-info">图文<br/>详情</a>
            </div>
            <div class="swiper-pagination"></div>
        </div>

    </div>
    <!--产品说明信息-->
    <ul class="ui-whitespace w-detail-info ui-row-flex ui-border-b">
        <li class="display-box ui-col ui-col-4 ui-txt-warning">￥<span class="font20 font-w600">{{goodsData.price}}</span>/<i class="font12">件</i></li>
        <li class="ui-col text-center">
            <div class="font18 line-h-12">{{goodsData.sales}}</div>
            <div class="font12 ui-txt-info line-h-12">累计销量</div>
        </li>
    </ul>
    <!--产品介绍信息-->
    <div class="ui-tab detail-intro bg-white ui-border-b">
        <ul class="ui-whitespace margin-b-10">
            <li class="padding-t-15 padding-b-15">{{goodsData.goods_name}}</li>
            <li>
                <!--line-clamp line-clamp-4-->
                <div class=" unfold">
                    <p class="font14 ui-txt-info line-clamp" :class="{'line-clamp-4':unfold}">
                        {{goodsData.discription}}
                    </p>
                </div>
            </li>
            <li>
                <h3 class="ui-txt-warning margin-t-10" @click="onUnfold"
                v-if="goodsText">{{unfold? "展开" : "收起"}}</h3>
            </li>
        </ul>
    </div>

    <div class="ui-list">
        <div class="graphic margin-t-10"  id="img">
            <img v-for="key in goodsData.goods_img_details" v-bind:src="key">
        </div>
    </div>
    <div class="ui-whitespace bottom-btn" @click="onBuy">
        立即购买
    </div>
        <index-quantity
                v-if="buy"
                 v-bind:state-buy="buy"
                v-bind:state-data="goodsData"
                v-bind:state-id="goods_id"
                @on-close="onSelectBuy">
        </index-quantity>
</div>
</template>
<style>
</style>
<script>
    import { XHRPost, XHRGet} from './../../js/ajax';
    import indexQuantity from 'components/index/index-quantity.vue';
    export default{
        data(){
            return{
                goodsData:"",
                unfold:true,
                buy:false,
                goodsText:false,
                goods_id:this.$route.query.id,
                ss:"#img"
            }
        },
        created() {
            this.$nextTick(function () {
                var mySwiper = new Swiper ('.swiper-detail-hook', {
                    loop: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                });
			});
            this.goodsDetail()
		},
        components:{
            indexQuantity
        },
        methods:{
            onUnfold(){
                console.log(this.unfold)
                this.unfold = !this.unfold;
            },
            goAnchor(selector) {
                console.log(selector)
                var anchor = this.$el.querySelector(selector)
                document.body.scrollTop = anchor.offsetTop
            },
            onBuy(){
                this.buy=true;
            },
            onSelectBuy(){
                this.buy=false;
            },
            goodsDetail(){
                var load = layer.open({ type: 2,shadeClose: false})
                var good = encrypt(String(this.goods_id));
                XHRPost('/api/Shop/goodsDetail', {goods_id:good},function (response) {
                    console.log("999", response)
                    if (response.data.status == 1){
                        let _data = response.data.data[0];
                        this.goodsData=_data;
                        console.log(this.goodsData)
                        if (_data.discription.length>70){
                            this.goodsText = true;
                        }
                    }else {
                        layer.open({
                            content: response.data.info,
                            time: 2,
                            style: 'background-color:rgba(0,0,0,.8);color:#fff'
                        });
                    }
                    layer.close(load);
                }.bind(this));
            }
        }
    }
</script>
