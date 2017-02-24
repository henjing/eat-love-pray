
<template>
	<div>
		<div class="footer container bg-white">
			<a class="ui-border-r" :class="{ current: type === 1 }" :href="indexUrl" @click="setCurrentIndex(1)">
				<span class="jin-icon jin-icon-home font20"></span>
				<div class="text font10">首页</div>
			</a>
			<a v-bind:class="{ current: type === 2 }" :href="mineUrl" @click="setCurrentIndex(2)">
				<span class="jin-icon jin-icon-user font20"></span>
				<div class="text font10">个人中心</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 1
			},
		},
		data () {
			return {
				type: '',
				indexUrl: '/index/store/index.html',
				mineUrl: '/index/my/index.html',
			}
		},
		created: function () {
			this.type = this.current;
		},
		methods: {
			setCurrentIndex: function (index) {
				this.type = index;
			},
		}
	}
</script>

<style scoped>
    .container {

    }
	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		display: -webkit-box;
		width: 100%;
		height: 50px;
		background: #F7F7F7;
		box-shadow: 0 -1px 10px 0 rgba(0,0,0,.2) 
	}
	.footer a {
		display: -webkit-box;
		width: 100%;
		height: 50px;
		-webkit-box-align: center;
		-webkit-box-pack: center;
		-webkit-box-orient: vertical;
		-webkit-box-flex: 1;
		color: #000;
		box-sizing: border-box;
		color: #9B9B9B;
		letter-spacing: 0;
	}
	.footer a .jin-icon {
		line-height: 1;
	}
	.footer a .text {
		/*margin-top: 3px;*/
		line-height: 1;
	}
	.footer a:active,
	.footer a.current {
		color: #58AEE8;
	}
</style>