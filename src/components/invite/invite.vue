<template>
	<div>
		<div class="header jin-box-center margin-b-20">
			<img class="ver-middle" src="../../images/logo-text.png" width="114" height="35" />
			<div class="inviter-info margin-t-10">
				<div class="avatar" :style="{backgroundImage: 'url('+ avatar +')'}"></div>
				<span class="text margin-l-5">{{name}}邀请你加入和十素养</span>
			</div>
		</div>
		<div class="wrapper">
			<div class="form-item form-item-btn-r">
				<label class="jin-icon jin-icon-chongzhi font20 text-color-red-dark" style="margin-top: -16px;"></label>
				<input class="text-color-red-dark" type="tel" name="phone" v-model="phone" placeholder="手机号" />
				<span class="code-btn" @click.prevent="getCode" v-if="getCodeBtnDisable">
					{{ conut_time === 0 ? '重新获取' : '获取验证码' }}
				</span>
				<span class="code-btn" disabled v-if="getCodeBtnDisable == false">{{ conut_time }}</span>
			</div>
			<div class="form-item">
				<label class="jin-icon jin-icon-xinxi font18 text-color-red-dark"></label>
				<input class="text-color-red-dark" type="text" name="code" v-model="code" placeholder="输入验证码" />
			</div>
			<div class="form-item">
				<label class="jin-icon jin-icon-mima font18 text-color-red-dark"></label>
				<input class="text-color-red-dark" type="password" name="pwd" v-model="pwd" placeholder="设置登陆密码" />
			</div>
			<div class="padding-t-5">
				<button class="ui-btn ui-btn-lg ui-btn-primary" v-on:click="goToRegister">注册</button>
			</div>
			<!--<p class="margin-t-20 padding-t-10 text-center font14">
				<a class="under-line ui-txt-default" href="/index/login_register/login.html">已有账号，直接登陆</a>
			</p>-->
		</div>
	</div>
</template>
<style scoped>
	.header {
		height: 100px;
		background-color: #2173EC;
		background-image: linear-gradient(-180deg, #2173EC 0%, #72DEFE 100%);
	}
	
	.inviter-info {
		display: flex;
		align-items: center;
	}
	
	.inviter-info .text {
		font-size: 10px;
		color: #1B68E7;
		letter-spacing: 0;
	}
	
	.inviter-info .avatar {
		width: 20px;
		height: 20px;
		background-color: #2173EC;
		background-position: center;
		background-size: cover;
		border-radius: 50%;
	}
	
	.btn-gray {
		background-color: #DDDDDD;
	}
	
	.padding-tb-25 {
		padding-top: 25px;
		padding-bottom: 25px;
	}
	
	.invite-accept-gain {
		min-width: 40px;
	}
</style>
<script>
	import { XHRPost } from '../../js/ajax.js';
	import { countdown, getQueryString } from '../../js/tools.js';
	export default {
		props: ['userSn'],
		data() {
			return {
				phone: '',
				code: '',
				pwd: '',
				user_sn: '',
				conut_time: 60,
				getCodeBtnDisable: true,
				avatar: '',
				name: '',
			}
		},

		created: function() {
			this.user_sn = getQueryString('user_sn');

			this.getUserInfo();
		},

		methods: {
			getUserInfo() {
				XHRPost('/api/MyCenter/getUserInfoByUserSn', { user_sn: encrypt(this.user_sn) }, function(responese) {
					console.log(responese)
					if(responese.data.status === 1) {
						this.avatar = responese.data.data.wechat_avatar;
						this.name = responese.data.data.user_name;
					}
				}.bind(this));
			},

			//错误提示方法
			errorTip: function(msg) {
				layer.open({
					content: msg,
					btn: ['确定'],
					yes: function() {
						layer.closeAll();
					}
				});
			},

			//获取验证码
			getCode: function() {
				const tel = /^1(3|4|5|7|8|9)\d{9}$/.test(this.phone);
				if(!tel) {
					this.errorTip('手机号码有误！');
					return false;
				}
				this.getCodeBtnDisable = false;
				this.conut_time = '...';

				const data = {
					cellphone: encrypt(this.phone),
					exist: encrypt('0')
				}
				XHRPost('/api/registerAndLogin/sendPhoneCode', data, function(response) {
					if(response.data.status === 1) {
						const _this = this;
						countdown(60, function(time) {
							_this.conut_time = time + 's';
							if(time === 0) {
								_this.getCodeBtnDisable = true;
							}
						});
						this.errorTip(response.data.info);
					} else {
						this.errorTip(response.data.info);
						this.getCodeBtnDisable = true;
					}

				}.bind(this), function(error) {
					this.errorTip(error);
					this.getCodeBtnDisable = true;
				}.bind(this));

			},

			//提交注册资料
			goToRegister: function() {
				var config = {
					url: '/api/registerAndLogin/goRegister',
					data: {
						cellphone: encrypt(this.phone),
						verify_code: '',
						password: '',
						inviting_sn: encrypt(this.user_sn),
					},
				}

				const pwd = /^(\w){6,15}$/.test(this.pwd);
				if(this.code) {
					config.data.verify_code = encrypt(this.code);
				} else {
					this.errorTip('请输入验证码');
					return false;
				}
				if(pwd) {
					config.data.password = encrypt(this.pwd);
				} else {
					this.errorTip('密码有误，只能输入6-15个字母、数字、下划线');
					return false;
				}

				console.log(config.data)
				var load = layer.open({ type: 2, shadeClose: false })
				XHRPost(config.url, config.data, function(response) {
					console.log(response)
					layer.close(load);
					if(response.data.status === 1) {
						layer.open({
							content: response.data.info,
							time: 1.5,
							end: function() {
								XHRGet('/api/Wechat/getUserOpenId', {}, function(response) {
									layer.closeAll();
									if(response.data.status === 1) {
										window.location.href = response.data.data;
									} else {
										window.location.href = '/index/index/index.html';
									}
								}.bind(this));
							}
						});

					} else {
						this.errorTip(response.data.info);
					}
				}.bind(this));
			},
		}
	}
</script>