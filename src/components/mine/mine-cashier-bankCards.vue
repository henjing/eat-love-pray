<template>
    <div>
        <!--银行卡面板-->
        <div class="bank-card-dashboard rlt" v-show="visible.home">
            <div class="bank-card-overview">
                <div class="button-group clearfix">
                    <span @click="goBack" class="jin-icon-fanhui jin-icon fanhui"></span>
                    <span @click="goAddCard" class="tianjia">添加</span>
                </div>
                <h1>银行卡</h1>
                <div class="p-l-7 abs b0" v-show="visible.hasCard">
                    <span class="number">{{visible.cardNum}}</span>
                    <span class="font18">张</span>
                </div>
                <div class="p-l-7 abs notyet" v-show="!visible.hasCard">
                     <span class="jin-icon-icon jin-icon notyet-icon"></span>
                    <span class="notyet-text">尚未添加</span>
                </div>
            </div>
        </div>
        <!--单张银行卡-->
        <div class="bank-cards" v-show="visible.hasCard">
            <template v-for="card in bankCards.data">
                <div @click="selectCard(card)" class="bank-card-cell" :class="card.css" key="card.id">
                    <div class="title">
                        <img :src="card.logo" alt="" class="logo">
                        <span class="font14 p-l-38">{{ card.bank_name }}</span>
                        <span class="note font12">(用于{{ card.type }}开户)</span>
                    </div>
                    <div class="card-number font24">
                        ****&nbsp;****&nbsp;****&nbsp;<span>{{ card.bank_card_no }}</span>
                    </div>
                    <div class="card-owner font12">
                        持卡人：{{ card.real_name }}
                    </div>
                </div>
            </template>
        </div>
        <!--缺省状态-->
        <div class="card-null" v-show="visible.nullResult">
            <img src="../../images/null-data.png" alt="">
            <span>空旷到成为森林</span>
        </div>
        <!--编辑银行卡-->
        <div v-show="cardSelected.visible">
            <div class="weui-mask" id="iosMask" @click="cardSelected.visible = false;" ></div>
            <div class="weui-actionsheet weui-actionsheet_toggle my-actionsheet" id="iosActionsheet">
                <div class="weui-actionsheet__menu" style="border-radius: 5px">
                    <div class="weui-actionsheet__cell my-small-cell">您可对{{ cardSelected.bank_card_no }}尾号的{{ cardSelected.bank_name }}卡进行操作</div>
                    <div class="weui-actionsheet__cell my-delete-cell" @click="deleteCard">删除</div>
                </div>
                <div class="weui-actionsheet__action" style="border-radius: 5px">
                    <div class="weui-actionsheet__cell my-text-cell" id="iosActionsheetCancel" @click="cardSelected.visible = false;">取消</div>
                </div>
            </div>
        </div>
        <!--添加银行卡-->
        <div class="card-form" v-show="visible.addPage">
            <div class="legend">
                <span>{{ ownerInfo.real_name }}</span>
                <span>{{ ownerInfo.id_card_no }}</span>
            </div>
            <div class="weui-cells weui-cells_form my-cells">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">银行</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="cardAdding.bank_name" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">银行卡号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="cardAdding.bank_card_no" />
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="cardAdding.cellphone" />
                    </div>
                </div>
                <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__hd">
                        <label class="weui-label">验证码</label>
                    </div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" v-model="cardAdding.verify_code">
                    </div>
                    <div class="weui-cell__ft" v-show="!cardAdding.counting">
                        <button @click="getVerifyCode" class="weui-vcode-btn">获取验证码</button>
                    </div>
                    <div class="weui-cell__ft" v-show="cardAdding.counting">
                        <button class="weui-vcode-btn vcode-ing">{{ cardAdding.countingNum }}s</button>
                    </div>
                </div>
                <div class="button-panel bank-card-panel">
                    <a @click="bindCard" href="javascript:;" class="weui-btn weui-btn_primary">绑定银行卡</a>
                </div>
            </div>
        </div>
        <!--验证提示框-->
        <div class="js_dialog my-dialog" v-show="cardAdding.dialogShow">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd">
                    <!--<p>-->
                        <!--添加银行卡需验证身份-->
                    <!--</p>-->
                    <!--<span>-->
                        <!--验证码已经发送到您绑定的手机{{ cardAdding.cellphone | cellphone }}-->
                    <!--</span>-->
                    <p>
                        {{ cardAdding.message }}
                    </p>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="closeDialog">知道了</a>
                </div>
            </div>
        </div>
        <!--实名认证提示框-->
        <div class="js_dialog my-dialog" v-show="certDialog">
            <div class="weui-mask"></div>
            <div class="weui-dialog cert-dialog">
                <div class="weui-dialog__bd">
                    <div class="img-div">
                        <img class="cert-img" src="../../images/id-alert.png" alt="">
                    </div>
                    <p>
                        请先开通实名认证
                    </p>
                    <span class="cert-span">
                        您的账户未实名，无法操作此步骤，请先前往实名认证。
                    </span>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary cert ">去开通</a>
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary cert close" @click="certDialog = false;">关闭</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import * as api from '../../js/mine/api';
    import * as tools from '../../js/tools';
    // import VueRouter from 'vue-router';
    // import Vuex from 'vuex';
    // Vue.use(VueRouter);
    // Vue.use(Vuex);

//    document.addEventListener('DOMContentLoaded', function(){
//        FastClick.attach(document.body);
//    }, false);

    let _getVerifyCode = tools._debounce(fnFactory, 100);

    let app = {
        created() {
            console.log('还没进入该组件路由时会不会执行');
            let self = this;
            // 拿到银行卡列表
            this.getCard();
            // 是否实名认证
            api.isCert(function (res) {
                if (res.data.status === 1) {
                    self.isCert = true;
                    tools.assignData(self.ownerInfo, res.data.data);
                }
                api.layerOpen(res.data);
            }, () => {});
            // 路由跳转
            if (self.$route.query && self.$route.query.addCard) {
                self.goAddCard();
            }
        },
        data() {
            return {
                bankCards: {
                    data: [{
                        "id": 252784,
                        "bank_name": "吉林农村商业银行",
                        "bank_card_no": "6999",
                        "type": "吉商邮币卡",
                        "css": "mybank-card-other",
                        "logo": "http:\/\/ok813a2du.bkt.clouddn.com\/bank-other.png",
                        "real_name": "**乔"
                    }, {
                        "id": 182838,
                        "bank_name": "中国工商银行",
                        "bank_card_no": "6115",
                        "type": "深文所大盘",
                        "css": "mybank-card-gs",
                        "logo": "http:\/\/ok813a2du.bkt.clouddn.com\/bank-gs.png",
                        "real_name": "**乔"
                    }, {
                        "id": 273673,
                        "bank_name": "测试银行",
                        "bank_card_no": "8675",
                        "type": "",
                        "css": "mybank-card-other",
                        "logo": "http:\/\/ok813a2du.bkt.clouddn.com\/bank-other.png",
                        "real_name": "**乔"
                    }, {
                        "id": 135910,
                        "bank_name": "农业银行",
                        "bank_card_no": "8077",
                        "type": "川商邮币卡分中心",
                        "css": "mybank-card-ny",
                        "logo": "http:\/\/ok813a2du.bkt.clouddn.com\/bank-ny.png",
                        "real_name": "**乔"
                    }],
                    status: 0,
                    info: '这是呵呵',
                    totalRows: 4
                },
                isCert: true,
                ownerInfo: {
                    id_card_no: '',
                    real_name: ''
                },
                cardAdding: {
                    bank_name: '',
                    bank_card_no: '',
                    verify_code: '',
                    counting: false,
                    countingNum: 60,
                    cellphone: '',
                    dialogShow: false,
                    message: ''
                },
                cardSelected: {
                    visible: false,
                    bank_card_no: '',
                    bank_name: '',
                    id: ''
                },
                currentPage: 'home',
                certDialog: false
            }
        },
        computed: {
            visible() {
                let cardNum = this.bankCards.data.length;
                let home = this.currentPage === 'home';
                let addPage = this.currentPage === 'addPage';
                let hasCard = cardNum > 0 && home;
                let nullResult = cardNum === 0 && home;
                return {
                    home, addPage, cardNum, hasCard, nullResult
                }
            }
        },
        methods: {
            goBack() {
                history.back();
//                if (this.$router) {
//                    this.$router.back();
//                }
            },
            goAddCard() {
                if (this.isCert) {
//                    pageManager.go('addPage');
                    this.currentPage = 'addPage';
                } else {
                    this.certDialog = true;
                }
            },
            getVerifyCode() {
                _getVerifyCode(this);
            },
            bindCard() {
                let self = this;
                let { bank_name, bank_card_no, verify_code } = this.cardAdding;
                if ( bank_name && bank_card_no && verify_code) {
                    api.addCard({
                        bank_name: encrypt(bank_name),
                        bank_card_no: encrypt(bank_card_no),
                        verify_code: encrypt(verify_code)
                    }, function (res) {
                        if (res.data.status === 1) {
                            console.log('添加成功', res.data);
                            tools.assignData(self.cardAdding, api.getInitialCardAddingForm());
                            self.cardAdding.dialogShow = true;
                            self.cardAdding.message = res.data.info;
                            self.getCard();
//                            pageManager.go('home');
                            this.currentPage = 'home';
                        }
                        if (res.data.status === 0) {
                            console.log('添加失败', res.data);
                            self.cardAdding.dialogShow = true;
                            self.cardAdding.message = res.data.info;
                        }
                    }, function() {})
                }
            },
            getCard() {
                let self = this;
                // 拿到银行卡列表
                api.getCard(function (res) {
                    console.log('res222', res);
                    let bankCards = res.data;
                    if (bankCards.status !== 0) {
                        Object.keys(self.bankCards).forEach(function (key) {
                            self.bankCards[key] = tools.deepClone(bankCards[key]);
                        });
                    }
                    if (bankCards.status === 0) {
                        tools.assignData(self.bankCards, api.getInitialBankCardList());
                        self.bankCards.data = [];
                    }
                }, function (err) {
                    console.error('err', err);
                });
            },
            selectCard(card) {
                tools.assignData(this.cardSelected, card);
                this.cardSelected.visible = true;
            },
            deleteCard() {
                let { id } = this.cardSelected;
                let self = this;

                api.deleteCard({
                    id: encrypt(id)
                }, function (res) {
                    if (res.data.status === 1) {
                        self.cardSelected.visible = false;
                        self.getCard();
                    }
                    if (res.data.status === 0) {
                        self.cardSelected.visible = false;
                    }
                    api.layerOpen(res.data);
                }, function() {});
            },
            closeDialog() {
                this.cardAdding.dialogShow = false;
            }
        },
        filters: {
            cellphone(val) {
                return val.slice(0, 3) + '****' + val.slice(7);
            }
        },
        watch: {
            'cardAdding.counting': function (val, oldVal) {
                if (val && !oldVal) {
                    tools.countdown(60, function (num) {
                        self.cardAdding.countingNum = num;
                        if (num === 0) {
                            setTimeout(function () {
                                self.cardAdding.counting = false;
                            }, 1000);
                        }
                    })
                }
            }
        }
    };

    // 函数工厂
    function fnFactory(app) {
        let self = app;

        if((/^1(3|4|5|7|8)\d{9}$/.test(self.cardAdding.cellphone))) {
            // self.cardAdding.counting = true;

            api.getVerifyCode({
                cellphone: encrypt(self.cardAdding.cellphone),
                exist: encrypt('1')
            }, function (res) {
                if (res.data.status === 1) {
                    self.cardAdding.counting = true;
                    // self.cardAdding.dialogShow = true;
                }
            }, function() {
                self.cardAdding.counting = false;
            })
        }
    }

    export default app;
</script>

<style>

</style>