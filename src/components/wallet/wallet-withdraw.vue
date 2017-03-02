<template>
    <div>
        <template v-if="!executeFailure && !executePass">
            <div class="card-form">
                <div class="weui-cells weui-cells_form my-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">开户姓名</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" v-model="withdrawData.realName" />
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">开户行</label></div>
                        <div class="weui-cell__bd">
                            <select style="padding-left: 0px" class="weui-select" name="select1" v-model="withdrawData.bankName">
                                <option value="交通银行">交通银行</option>
                                <option value="招商银行">招商银行</option>
                                <option value="中国工商银行">中国工商银行</option>
                                <option value="中国光大银行">中国光大银行</option>
                                <option value="中国建设银行">中国建设银行</option>
                                <option value="中国民生银行">中国民生银行</option>
                                <option value="中国农业银行">中国农业银行</option>
                                <option value="中国银行总行">中国银行总行</option>
                                <option value="中国邮政储蓄银行">中国邮政储蓄银行</option>
                                <option value="中信银行">中信银行</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">银行卡号</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" v-model="withdrawData.bankNumber" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui-whitespace margin-b-20 bg-white">
                <div class="padding-t-15 font12 color-4a">提现金额</div>
                <div class="jin-box-align  padding-t-15 padding-b-20 line-h-nor ">
                    <div class="margin-r-10 font30 color-4a">￥</div>
                    <div class="recharge-input  font28 color-4a">
                        <input type="number"  placeholder="请输入金额" v-model="withdrawAll"  />
                    </div>
                </div>
                <div class="jin-justify-flex padding-t-10  padding-b-10 ui-border-t">
                    <div class="font12 color-9b">可用金额 {{withdrawData.balance}}元</div>
                    <div class="font12" @click="onAll"><a>全部提现</a></div>
                </div>
            </div>
            <div class="ui-whitespace padding-t-10">
                <div class="recharge-btn btn-yellow  text-center" @click="txFn">确认提现</div>
                <div class="padding-t-20">
                    <p class="margin-b-5 font14 color-4a">温馨提示：</p>
                    <p class=" font12 color-9b line-h-14">
                        申请提现后三个工作日内到账，提现金额将打到您选择的银行卡账户中，如果提现金额含有空店收益，空店收益部分将收取 1%的手续费。
                    </p>
                </div>
            </div>
        </template>

        <execute-failure  v-if="executeFailure" @failure="executeFailure=false"></execute-failure>

        <execute-pass v-if="executePass"
                      :pass-bank="withdrawData.bankName"
                      :bank-number="withdrawData.bankNumber"
                      :pass-money="withdrawAll"
        ></execute-pass>
    </div>
</template>

<style>
    .padding-t-30 {padding-top:30px}
</style>

<script>
    import BankCard from 'components/wallet/bank-card.vue';
    import ExecuteFailure from 'components/wallet/execute-failure.vue';
    import ExecutePass from 'components/wallet/execute-pass.vue';
    import { XHRGet, XHRPost } from './../../js/ajax';
    export default{
        data(){
            return{
                executeFailure: false,
                executePass: false,
                withdrawData: {
                    balance: '',
                    bankName: '',
                    bankNumber: '',
                    realName: ''
                },
                withdrawAll: '', // 提现金额
                _switch: false
            }
        },
        components:{
            BankCard,ExecutePass,ExecuteFailure
        },
        created(){
            this.onWithdraw()
        },
        computed: {
            _balance() {
                // type: Number
                return parseFloat(parseFloat(this.withdrawData.balance).toFixed(2));
            },
            _withdrawAll() {
                // type: Number
                return parseFloat(parseFloat(this.withdrawAll).toFixed(2));
            },
            _isValid() {
                return typeof this.withdrawAll === 'number' && this.withdrawAll > 0;
            }
        },
        watch: {
            withdrawAll: function (val, oldVal) {
                if (this._isValid && this._withdrawAll > this._balance) {
                    this.onAll();
                }
                if (this._isValid) {
                    this.withdrawAll = parseFloat(this.withdrawAll.toFixed(2));
                }
            }
        },
        directives: {
        },
        methods:{
            onAll(){
                var num = this.withdrawData.balance;
                this.withdrawAll = num;
            },
            onWithdraw() {
                var load = layer.open({ type: 2,shadeClose: false });
                XHRGet('/api/Withdraw/walletInfo', {}, function (response) {
                    console.log('res', response);
                    const getData = response.data;
                    if (true || getData) {
                        this.withdrawData = Object.assign({}, getData);
                        this.withdrawData.balance = this.withdrawData.balance + '';
                    } else {

                    }
                    layer.close(load);
                }.bind(this));
            },
            txFn() {
                var _this = this;
                if (!this._isValid){
                    layer.open({
                        content: '请输入正确金额!',
                        time: 2,
                        style: 'background-color:rgba(0,0,0,.8);color:#fff'
                    });
                } else {
                    layer.open({
                        title: '请输入交易密码',
                        content: '<input type="password" id="password" style="width:100%;height:40px; border:0;border-bottom:1px solid #ddd;">',
                        shadeClose: false,
                        btn: ['确认支付', '取消'],
                        no: function () {
                            layer.closeAll()
                        },
                        yes: function () {
                            if (_this._switch) return false;
                            _this._switch = true;
                            const postData = {
                                realName: encrypt(_this.withdrawData.realName),
                                bankNumber: encrypt(_this.withdrawData.bankNumber),
                                bankName: encrypt(_this.withdrawData.bankName),
                                money: encrypt(_this.withdrawAll + ''),
                                pay_password: encrypt(String(document.getElementById('password').value))
                            };
                            XHRPost('/api/Withdraw/saveWithdraw', postData, function (msg) {
                                if (msg.data.status == 0) {
                                    layer.open({
                                        content: msg.data.info,
                                        time: 2,
                                        style: 'background-color:rgba(0,0,0,.8);color:#fff'
                                    });
                                } else {
                                    layer.closeAll();
                                    _this.executePass = true;
                                }
                                _this._switch = false;
                            }.bind(_this));
                        }
                    })
                }
            }
        }
    }
</script>
