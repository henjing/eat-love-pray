<template>
    <div class="jin-wrap margin-t-10">
        <!--01-->
        <div class="font14 margin-b-10">
            <label class="margin-l-10">当前邀请人：</label>
            <span class="">{{user.dqyqr_name}}</span>
        </div>
        <!--02-->
        <div class="possword border-b-1 border-t-1" >
            <ul class="ui-list ul-all ui-list-active">
                <li>
                    <div class= "ui-list-info rle" id="s2" >
                        <label class="ui-nowrap">手机号</label>
                        <!--<input type="text" placeholder="输入邀请人手机号" style="border:0;" id="phone"  v-on:blur="test" v-model="user.yqr_phone"/>-->
                        <input type="text" placeholder="输入邀请人手机号" style="border:0;" id="phone" v-model="yqr_phone"/>
                        <span class="abs txt-color-d6" style="right:10px;" id="app-3">{{user.yqr}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <!--03-->
        <div class="ui-btn-wrap">
            <button  class="ui-btn-kd ui-btn-yellow" v-on:click="getGenggai" >更改</button>
        </div>

        <!--04-->
        <div class="font12">
            <label class="margin-l-10 txt-color-ddd">温馨提示：</label>
            <span class="txt-color-d6">在成为微股东之前，你有一次修改的机会</span>
        </div>
        <!--05-->
        <div class="ui-dialog" v-bind:class='{"hide":isB,"show":isA}'>
            <div class="ui-dialog-cnt padding-t-10" style="">
                <div class="ui-dialog-bd">
                    <div class="text-center padding-l-20 padding-r-20" >确定要将改邀请人更改为 <span class="font16 txt-color-blue">{{user.yqr}}</span>吗？</div>
                </div>
                <div class="ui-dialog-ft" style="border:0;">
                    <button type="button" data-role="button" class="border-t-1 border-r-1" v-on:click="goQuxiao">取消</button>
                    <button type="button" data-role="button" class="border-t-1"  v-on:click="goToLogin">确定</button>
                </div>
            </div>
        </div>

        <!--06-->
        <loading v-if="loadingShow"></loading>
        <successing v-if="successingShow"></successing>

    </div>
</template>
<script type="text/jsx">
    import Loading from '../common/loading.vue'; // TODO Vue组件大驼峰风格
    import Successing from '../common/success.vue'; // TODO 测试一下
    import { countdown } from '../../js/tools.js';
    import { XHRPost, XHRGet } from '../../js/ajax.js';

    export default{
        data() {
            return {
                isA: false,
                isB: true,
                loadingShow: false,
                successingShow: false,
                yqr_phone: "", //新邀请人的号码也就是input的值
                user: {
                    dqyqr_name: "", //当前邀请人
                    yqr: "", //input内邀请人的名字
                    //mephone: "", //我的号码
                    old_yqrphone: "" //旧邀请人的号码
                 }
            }
        },
        components: {
            Loading,
            Successing
        },
        created() {
            const _this = this;
            setTimeout(function() {
                _this._created.apply(_this);
            },1000);
        },


    //监听yqr_phone的值
        watch:{
            yqr_phone(curVal) {
                const _this = this;
                 const tel = this.checkPhone(curVal);
                if (!tel) {
                    return false;
                }
                const data = {
                    cellphone: encrypt(curVal)
                };
                XHRPost('/api/MyCenter/findInvitingPeople', data, function (response) {
                    if (response.data.status === 1) {
                        //_this.errorTip(response.data.info);
                        _this.user.yqr = response.data.data.user_name;
                    }else {
                        _this.errorTip(response.data.info);
                        _this.user.yqr = "";
                    }

                })

            }
        },

        methods: {
            //正则
            checkPhone: function (phone) {
                const tel = /^1(3|4|5|7|8|9)\d{9}$/.test(phone);
                return tel;
            },
            _created: function () {
                console.log('test');
                const _this = this;
                XHRGet('/api/MyCenter/mySeting', {}, function (response) {
                    var data = response.data.data;
                    _this.user.dqyqr_name = data.inviting_name;
                    //_this.user.mephone = response.data.data.cellphone;
                    _this.user.old_yqrphone = data.inviting_cellphone;
                })
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

            //确认更改
            getGenggai: function () {
                const _this = this;
                if (this.yqr_phone === "") {
                    _this.errorTip("手机号码为空");
                }else if (/^1(3|4|5|7|8|9)\d{9}$/.test(_this.yqr_phone) === false) {
                    _this.errorTip("手机号码格式错误")
                }else if (this.yqr_phone === this.user.old_yqrphone) {
                    _this.errorTip("不能修改旧的邀请人为新的邀请人")
                }else {
                    this.isB = false;
                    this.isA = true;
                }
            },
            //调到个人设置页
            goTopwd:function() {
                this.$router.push({path:'/main'});
            },
            //定时器2秒
            goTOnext:function() {
                const _this = this;
                setInterval( function() {
                _this.goTopwd();
                },2000);
            },
            //取消事件
            goQuxiao: function () {
                this.isA = false;
                this.isB = true;
            },
            //确认修改邀请人
            goToLogin: function () {
                const data = {
                    cellphone: encrypt(this.yqr_phone)
                }
                this.isB = true;
                this.isA = false;
                const _this = this;
                _this.loadingShow = true;
                _this.successingShow = false;
                XHRPost('/api/MyCenter/editInvitingPeople', data, function (response) {
                    console.log(response);
                    if (response.data.status === 0) {
                        _this.loadingShow = false;
                        _this.errorTip(response.data.info);
                    } else {
                        _this.loadingShow = false;
                        _this.successingShow = true;
                        _this.dqyqr_name = _this.user.yqr;
                        //setInterval(" _this.$router.push({ path: '/main'})","2000");
                        //_this.$router.push({ path: '/main'});
                        _this.goTOnext();
                    }
                })

            }


        }

    }
</script>