<template>
    <div class="filtrate-tk">
        <div class="bg-white">
            <div class="jin-box-center padding-t-15">
            		<div class="avatar-wrap padding-b-10">
	                <div class="ui-avatar-s margin-r-10">
	                    <span :style="{backgroundImage:'url('+info.wechat_avatar+')'}"></span>
	                </div>
	                <span class="font14">{{info.user_name}}</span>
                </div>
                <div class="padding-b-5 font24 line-h-nor color-money">{{info.goods_number}}单</div>
                <div class="margin-b-20 font14 ui-txt-muted">购买产品</div>
            </div>
            <ul class=" buil-list  ui-border-t margin-b-10">
                <li class="jin-justify-flex">
                    <div class="font14">创建时间</div>
                    <div class="font12 ui-txt-muted">{{info.add_time}}</div>
                </li>
            </ul>
        </div>
        <ul class="ui-list ui-list-text ui-border-b">
            <li class="margin-l-0 ui-border-b">
                <h4 class="text-center font14">详细信息</h4>
            </li>
            <li class="ui-border-b">
                <div class="ui-list-info">商品说明</div>
                <div class="font14 ui-txt-muted">{{info.goods_name}}</div>
            </li>
            <li class="ui-border-b">
                <div class="ui-list-info">购买数量</div>
                <div class="font14">X{{info.goods_number}}</div>
            </li>
            <!--<li class="ui-border-b">
                <div class="ui-list-info">获得佣金</div>
                <div class="font14">￥{{info.profit}}</div>
            </li>-->
        </ul>
        <!--<div class="ui-whitespace padding-t-10 padding-b-10 text-right bg-white">
        		<span class="font14">合计：￥{{info.profit}}</span>
        </div>-->
        
        
        <div class="return-btm text-center font14">
        	<router-link to="/">返回</router-link >
        </div>
        <loading v-if="loadingShow"></loading>
    </div>
</template>

<script>
import Loading from '../common/loading.vue';
import { XHRPost } from '../../js/ajax.js';
    export default{
        data(){
            return{
            		info: {},
                id: this.$route.query.id,
                loadingShow: true,
                title: '销售记录详情',
            }
        },
        created: function() {
	        	document.title = this.title;
	        	this.getData();
        	
        },
        activated: function () {
        		document.title = this.title;
        },
        components:{
        		Loading
        },
        methods:{
	        	getData: function() {
	        		console.log(this.id)
				XHRPost('/api/Shop/salesDetail', {order_id: encrypt(String(this.id))} , function (response) {
					this.loadingShow = false;
					console.log(response.data)
					const data = response.data.data;
					this.info = data;
				}.bind(this));
			},
	    },
    }
</script>
<style scoped="scoped">
	.avatar-wrap {
		display: flex;
		align-items: center;
		align-content: center;
	}
	.ui-avatar-s {
		width: 30px;
		height: 30px;
		display: inline-block;
	}
    .return-btm {
        width: 45%;
        height: 40px;
	    line-height: 40px;
	    margin: 20px auto;
	    background: #FFFFFF;
	    border: 1px solid #DADADA;
	    border-radius: 100px;
    }
    .return-btm a {
    		display: block;
    }

	.buil-list >li{
	    display: -webkit-box;
	    position: relative;
	    padding: 10px 15px;
	    -webkit-box-align: center;
	}

</style>
