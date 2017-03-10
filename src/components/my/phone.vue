<template>
   <div class="jin-wrap margin-t-10">
        <!--01-->
        <div class="border-b-1 border-t-1">
            <ul class="ui-list ul-all ui-list-active" >
                <li>
                    <div class="rlt width-100">
                        <label class="ui-nowrap abs top-10">手机号</label>
                        <input type="text"  class="ui-form-item input width-100 txt-color-d6" :placeholder="info.input" style="text-align:right;" readonly="readonly" id="name"/>
                    </div>

                </li>
            </ul>
        </div>
        <!--02-->

            <div class="ui-btn-wrap">
                <router-link to="/phone01" class="click_a">
                <button  class="ui-btn-kd ui-btn-yellow" >更改手机号</button>
                </router-link>
            </div>

        <!--03-->
        <div class="font12">
            <span class="margin-l-10 txt-color-ddd">一个手机号码只能作为一个账号的登录名，请谨慎更换</span>
        </div>
   </div>
</template>
<script type="text/jsx">

    import Loading from '../common/loadingwei.vue';
    import { countdown } from '../../js/tools.js';
    import { XHRPost,XHRGet } from '../../js/ajax.js';
    export default{
        data(){
            return{
                info: {
                    input: "" //只显示的手机号
                },
                switch: false
            }
        },

        created: function () {
//            const _this = this;
//            setTimeout(function(){
//                _this._created.apply(_this)
//            },1000)
            //this.onPayKong();
            this._created.apply(this);
        },
    methods: {
        //错误提示
        errorTip: function (msg) {
            const _this = this;
            layer.open({
                content: msg,
                btn: ['确定'],
                yes: function () {
                    layer.closeAll();
                    _this. goTOnext();
                }
            });
        },
        //重复请求确定
        goTopwd:function() {
            const _this = this;
            XHRGet('/api/MyCenter/mySeting', {}, function (response) {
              if(response.data.status != 0) {
                  _this.info.input = response.data.data.cellphone;
              }else{
                  _this.goTOnext();
                  var load = layer.open({type: 2, shadeClose: false})
                  setTimeout(function () {
                      layer.close(load);
                  }, 1000);
              }
            },function(response){
                console.log(response)
            })
        },
        //定时器1秒
        goTOnext:function() {
            const _this = this;
            setTimeout( function() {
                _this.goTopwd();
            },1000);
        },
        _created(){
            const _this = this;
            XHRGet('/api/MyCenter/mySeting', {}, function (response) {
                    if(response.data.status != 0 ) {
                        _this.info.input = response.data.data.cellphone;
                    }else {
                        console.log(1585255001);
                        //_this.errorTip('请勿重复请求')
                        var load = layer.open({type: 2, shadeClose: false})
                        _this.goTOnext();
                        setTimeout(function () {
                            layer.close(load);
                        }, 1000);
                    }
                },function(response){
                console.log(response);
            })

        }

//        onPayKong(){
//            console.log(this.switch);
//            const _this = this;
//            if (this.switch) return false;
//            console.log(this.switch);
//            this.switch = true;
//            console.log(this.switch);
//            XHRGet('/api/MyCenter/mySeting', {}, function (response) {
//                _this.info.input = response.data.data.cellphone;
//                console.log(_this.switch);
//                _this.switch = false
//                console.log(_this.switch);
//            })
//
//        }
    }

    }
</script>