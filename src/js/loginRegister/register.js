//import '../mock/test.js';
import '../lib/layer.js';
import '../lib/layer.css';
import { XHRPost,XHRGet } from '../ajax.js';
import { countdown } from '../tools.js';

var login = new Vue({
	el: '#register',
	data: {
		registName: '',
		phone: '',
		code: '',
		pwd: '',
		inviting_sn: '',
		conut_time: 60,
		getCodeBtnDisable: true,
	},
	
	methods: {
		getCode: function () {
			const tel = /^1(3|4|5|7|8|9)\d{9}$/.test(this.phone);
			if (!tel) {
				this.errorTip('手机号码有误！');
				return false;
			}
			this.getCodeBtnDisable = false;
			this.conut_time = '...';

			const data = {
				cellphone: encrypt(this.phone),
				exist: encrypt('0')
			}
			XHRPost('/api/registerAndLogin/sendPhoneCode', data, function (response) {
				if (response.data.status === 1) {
					const _this = this;
					countdown(60,function (time) {
						
						_this.conut_time = time + 's';
						if (time === 0) {
							_this.getCodeBtnDisable = true;
						}
					});
					this.errorTip(response.data.info);
				} else {
					this.errorTip(response.data.info);
					this.getCodeBtnDisable = true;
				}
				
			}.bind(this), function (error) {
				this.errorTip(error);
				this.getCodeBtnDisable = true;
			}.bind(this));
			
		},
		goToRegister: function () {
			var config = {
				url: '/api/registerAndLogin/goRegister',
				data: {
					uaer_name: '',
					cellphone: encrypt(this.phone),
					verify_code: '',
					password: '',
					inviting_sn: encrypt(this.inviting_sn),
				},
			}
			if (this.registName.trim() == '') {
				this.errorTip('请输入您的姓名');
				return false;
			}  else {
				config.data.user_name = encrypt(this.registName.trim());
			}
			
			
			if (this.code) {
				config.data.verify_code = encrypt(this.code);
			} else {
				//临时修改
				config.data.verify_code = encrypt(this.code);
//				this.errorTip('请输入验证码');
//				return false;
			}
			
			const pwd = /^(\w){6,15}$/.test(this.pwd);
			if (pwd) {
				config.data.password = encrypt(this.pwd);
			} else {
				this.errorTip('密码有误，只能输入6-15个字母、数字、下划线');
				return false;
			}
			
			console.log(config.data)
			var load = layer.open({ type: 2,shadeClose: false})
			XHRPost(config.url, config.data, function (response) {
				console.log(response)
				layer.close(load);
				if (response.data.status === 1) {
					layer.open({
						content: response.data.info,
						time: 1.5,
						end: function () {
							layer.open({
								type: 1,
								shadeClose: false,
								title: '长按识别二维码关注《和十素养公众号》',
								content: '<div><p class="text-center">让高贵的素养传遍世界!</p><img src="/static/images/heshi-code.jpg" width="100%"/></div>'
							})
//							XHRGet('/api/Wechat/getUserOpenId', {}, function (response) {
//								layer.closeAll();
//								if (response.data.status === 1) {
//									window.location.href = response.data.data;
//								} else {
//									window.location.href = '/index#/index/registerSucces';
//								}
//							}.bind(this));
						}
					});

				} else {
					this.errorTip(response.data.info);
				}
			}.bind(this));
		},
		//错误提示方法
		errorTip: function (msg) {
			layer.open({
				content: msg,
				btn: ['确定'],
				yes: function () {
					layer.closeAll();
				}
			});
		},
	}
});