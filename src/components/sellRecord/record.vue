<template>
    <div>
        <div  class="padding-t-15 padding-b-10 bg-white ui-border-b">
            <div class="ui-whitespace jin-justify-flex margin-b-15">
            	<a href="/index/my/index.html" class="back-btn  ui-txt-white">
            		<span class="jin-icon jin-icon-fanhui"></span>
            	</a>
            </div>
            <div class="ui-whitespace font35">销售记录</div>
        </div>
        <div
        	v-infinite-scroll="loadMore"
	        infinite-scroll-disabled="busy"
	        infinite-scroll-distance="10"  style="overflow: auto;height:calc(100vh - 128px );-webkit-overflow-scrolling: touch;">
	        <div class="bill-border-t ui-border-b" v-for="items in info">
	            <h4 class="time-tile ui-whitespace font14 ui-border-b">{{items.title === 'current_month' ? '当月': items.title}}</h4>
	            <ul class="ui-list bill-list-nor" v-for="item in items.content">
	                <li class="ui-border-b" >
	                    <div class="bill-list-time padding-r-10" >
	                        <div class="line-h-nor ui-txt-muted" v-if="item.add_time.length < 8">
	                            <div class="margin-b-5 font14">{{item.add_time.substring(0,2)}}</div>
	                            <div class="font12">{{item.add_time.substring(2)}}</div>
	                        </div>
	                        <div class="line-h-nor ui-txt-muted" v-else>
	                            <div class="margin-b-5 font14">{{item.add_time.substring(0,4)}}</div>
	                            <div class="font12">{{item.add_time.substring(5,10)}}</div>
	                        </div>
	                    </div>
	                    <div class="bill-list-type">
	                        <ul class="ui-list" @click="recordDetail(item.order_id)">
	                            <li class="">
	                                <div class="ui-avatar-s">
	                                    <span :style="{backgroundImage: 'url('+ item.wechat_avatar +')'}"></span>
	                                </div>
	                                <div class="ui-list-info padding-r-0">
	                                    <ul class="jin-justify-flex">
	                                        <li class="font16">{{item.user_name}}</li>
	                                        <li class="font12 ui-txt-warning">{{item.goods_number}}单</li>
	                                    </ul>
	                                    <div class="font14 ui-txt-muted line-h-nor ui-nowrap">
	                                    	购买{{item.goods_name}}
	                                    </div>
	                                </div>
	                            </li>
	                        </ul>
	                    </div>
	                </li>
	            </ul>
	        </div>
	        
	        <!--加载更多-->
	        <div class="ui-loading-wrap ba-wi" v-if="loadMoreTip">
		        <p class="font14 ui-txt-info">加载中</p>
		        <i class="ui-loading"></i>
		    </div>
		    <div class="ui-loading-wrap ba-wi" v-if="loadend">
		        <p class="font14 ui-txt-muted"><span class="no-more-data">已经到底了</span></p>
		    </div>
	        <!--空缺状态 start -->
	        <div class="margin-t-20 padding-t-20 text-center" v-if="nullData">
	            <img src="/static/images/null-data.png" width="100" height="68"/>
	            <div class="margin-t-10 font14 ui-txt-muted">暂无销售记录</div>
	        </div>
	        <!--空缺状态 end-->
	    </div>
    </div>
</template>

<script>
import { XHRPost } from '../../js/ajax.js';
    export default{
        data(){
            return{
                info: [],
                
                //控制是否执行请求方法
                busy: false,
                page: 0,
                
                //控制加载更多组件的显示隐藏
                loadMoreTip: false,
                
                //控制加载完成组件的显示隐藏
                loadend: false,
                
                //控制空数据组件的显示隐藏
                nullData: false,
                title: '销售记录',
            }
        },
        created () {
        		document.title = this.title;
        },
        activated: function () {
        		document.title = this.title;
        },
        methods:{
            loadMore: function () {
            		this.page++;
               	this.loadMoreTip = true;
               	console.log('pages',this.page)
               	XHRPost('/api/Shop/mySalesRecord',{page:encrypt(String(this.page))},function (response) {
               	    this.loadingShow = false;
               	    this.loadMoreTip = false;
                    const data = response.data.data;
                    console.log(data)
                    
                    if (this.info.length === 0) {
                    		//如果thi.info数组为空，则直接将接收到的数组赋值给它
                    		this.info = data;
                    } else {
                    		//如果thi.info数组不为空
                    		const lastItem = this.info[this.info.length - 1];
                    		data.forEach((value,index) => {
                    			
                    			//如果某项title等于this.info数组最后一项的title，则合并数组。
                    			if (value.title === lastItem.title) {
                    				lastItem.content = lastItem.content.concat(value.content)
                    			} else {
                    				this.info.push(value)
                    			}
                    		});
                    }
                    if (response.data.current_page == response.data.totalPage) {
                    		this.loadend = true;
					    	this.busy = true;
                    }
                    
                    if (response.data.status === 0) {
                    		this.nullData = true;
                    		this.loadend = false;
                    }
                    
               	}.bind(this))
            },
            // 查看详情
            recordDetail(id) {
                this.$router.push({path:'/recordDetail',query: { id: id  }})
            }
        }
    }
</script>
<style scoped>
	
	.time-tile {
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #f7f7f7;
	}
	.back-btn {
		color: #9B9B9B;
		background: #F7F7F7;
		border: 1px solid #DFDFDF;
	}
    .bill-border-t  .bill-list-nor:last-child >li{
        border-bottom: 0;
    }
    .bill-border-t:last-child {
    	border-bottom: none;
    }
    .ui-avatar-s{
	    margin: 16px 10px 16px 0 !important;
	}
	.bill-list-one{
	    border-top: #e0e0e0 1px solid;
	    border-bottom: #e0e0e0 1px solid;
	    background-color: #f7f7f7!important;
	}
	.bill-list-one > li {
	    padding-top: 0;
	    padding-bottom: 0;
	    line-height: 30px!important;
	}
	.bill-list-one .bill-list-info {
		-webkit-box-orient: horizontal
	}
	.bill-list-one h4{
	    -webkit-box-flex: 1;
	}
	.bill-list-info{
	    -webkit-box-flex: 1;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	    padding-right: 15px;
	}
	.bill-list-time{
		width: 55px;
	    display: -webkit-box;
	    -webkit-box-align: center;
	    -webkit-box-pack: center;
	}
	.bill-border-b {
	    border-bottom: 1px solid #e0e0e0;
	}
	.bill-list-type{
	    -webkit-box-flex: 1;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-box-pack: center;
	    padding-right: 15px;
	}
	.bill-list-type .ui-list {
		background: none;
	}
	.color-money-type{color: #4990E2; }
</style>