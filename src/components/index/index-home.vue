<template>
	<div class="jin-wrap">
		<!--<div class="swiper-container swiper-home-hook">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">
	            <div class="slider" :style="{backgroundImage:'url(/static/images/pro-01.png)'}" @click="goToDetail('123')"></div>
	        </div>
	        <div class="swiper-slide">
	            <div class="slider" :style="{backgroundImage:'url(/static/images/pro-02.png)'}" @click="goToDetail('456')"></div>
	        </div>
	        <div class="swiper-slide">
	            <div class="slider" :style="{backgroundImage:'url(/static/images/pro-03.png)'}" @click="goToDetail('789')"></div>
	        </div>
	    </div>
	    <div class="swiper-pagination"></div>
	</div>-->
		<ul class="k-wrap margin-t-15">
		    <!--loop start-->
		    <li class="commodity-list margin-b-15" v-for="item in info">
		        <ul class="bg-white rlt" @click="goToDetail(item.goods_id)">
		            <li class="commodity-img-pa margin-b-10">
		                <div class="commodity-img" :style="{backgroundImage:'url('+ item.goods_img_cover +')'}"></div>
		            </li>
		            <li class="ui-whitespace">
		                <h3 class="ui-nowrap font14 margin-b-10">
		                    {{item.goods_name}}
		                </h3>
		                <div class="display-box padding-b-15 line-h-12">
		                    <div class="ui-txt-warning font16">￥<span>{{item.price}}</span></div>
		                    <div class="margin-l-10 ui-txt-info font12">销量:<span>{{item.sales}}</span></div>
		                    <div class="shop-icon1"></div>
		                </div>
		            </li>
		        </ul>
		    </li>
		    <!--loop end-->
		</ul>
		<store-footer :current="1"></store-footer>
		<loading v-if="loadingShow"></loading>
	</div>
</template>

<script>
	import StoreFooter from '../../components/common/footer.vue';
	import Loading from '../../components/common/loading.vue';
	import { XHRGet } from '../../js/ajax.js';
	export default {
		data() {
			return {
				info: [],
				loadingShow: true,
			}
		},
		components: {
			StoreFooter, Loading
		},
		created() {
			this.loadMore();
			this.$nextTick(function () {
				var mySwiper = new Swiper ('.swiper-home-hook', {
		            loop: true,
		            // 如果需要分页器
		            pagination: '.swiper-pagination',
		        });	
			})
		},
		methods: {
			loadMore: function () {
               	XHRGet('/api/Shop/goodsList',{},function (response) {
                    console.log(response)
               	    this.loadingShow = false;
                    const data = response.data.data;
                    console.log(data)
                    this.info = data;
               	}.bind(this))
            },
			// 查看详情
            goToDetail(id) {
                this.$router.push({path:'/index/indexDetails',query: { id: id  }})
            }
		},
	}
</script>

<style>
.slider{
    padding-top: 40%;
    background-size: cover;
    background-position: center;
}
.commodity-list{
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 3px 7px #b9b9b9;
}
.commodity-list .commodity-img-pa{
    padding: 5px;
}
.commodity-img{
    width: 100%;
    padding-top: 100%;
    background-size: cover;
    background-position: center;
}
.shop-icon1{
    position: absolute;
    right: -5px;
    bottom: 10px;
    width: 40px;
    height: 25px;
    background-size: cover;
    background-position: 0 0;
    background-repeat: no-repeat;
    background-image: url("../../images/shop-icon.png");
}
</style>