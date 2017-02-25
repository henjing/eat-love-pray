
var strOutput;

$.post('url',{id:111},function(json){
			strOutput = json;
},'json');



function jsApiCall()
	{
		WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				strOutput,
		function(res){
			if(res.err_msg == "get_brand_wcpay_request:ok"){	
					layer.open({
						title: '温馨提示'
						,content: '支付成功。'
						,btn: ['我知道了']
						,yes : function () {
							window.location.href='url';
						}
					});
			}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
				window.location.reload();
			}else{
				layer.open({
					title: '温馨提示'
					,content: '支付失败，请重试。'
					,btn: ['我知道了']
					,yes : function () {
						window.location.reload();
					}
				});
			}
		}
	);
	}

	function callpay()
	{
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', jsApiCall);
				document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			}
		}else{
			jsApiCall();
		}
	}