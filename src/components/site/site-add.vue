<template>
    <div class="jin-wrap">
        <div class="margin-t-15 margin-b-15">
            <ul >
                <li  v-for="key in errors" class="verify" >{{key}}</li>
            </ul>
            <div class="kd-address-form ui-border-t" :class="{'margin-t-35':isData.length>0}">
                <form method="post">
                    <div class="bg-white">
                        <div class="ui-form-item kd-form-item ui-border-b">
                            <label class="">收件人</label>
                            <input type="text" class="color-9b" name="consignee" placeholder="填写姓名" v-model="user.consignee" >
                        </div>
                        <div class="ui-form-item kd-form-item ui-border-b">
                            <label class="">联系电话</label>
                            <input type="tel" class="color-9b" name="phone" placeholder="手机或固定电话" v-model="user.phone" >
                        </div>
                        <ul class="ui-list jin-list-link select-address">
                            <li class="ui-border-b">
                                <span class="">所在地区</span>
                                <div class="ui-list-info line-h-12 site"></div>
                                <div class="text-right font14 ui-txt-muted site-pl">请选择</div>
                            </li>
                        </ul>
                        <input type="hidden" name="province"  v-model="user.province" />
                        <div class="ui-form-item kd-form-item ui-form-item-textarea ui-border-b">
                            <label class="">详细地址</label>
                            <textarea name="address" class="color-9b" placeholder="街道门牌号" v-model="user.address" ></textarea>
                        </div>
                        <div class="ui-form-item  ui-border-b">
                            <label class="">邮政编码</label>
                            <input type="tel" class="color-9b" name="postalcode" placeholder=""  v-model="user.postalcode" >
                        </div>
                    </div>

                    <div class="ui-form-item ui-form-item-switch margin-t-10 ui-border-tb bg-white">
                        <p> 设为默认地址</p>
                        <label class="ui-switch">
                            <input type="checkbox" name="state" v-model="user.checkState"  />
                        </label>
                    </div>
                </form>
            </div>
        </div>
        <div class="submit-btn  text-center">保存</div>
    </div>
</template>
<style>
   .submit-btn{
       width: 95%;
       height: 40px;
       margin: auto;
       line-height: 40px;
       color: #fff;
       background: #508CEE;
       border-radius: 5px;
   }
    .verify{
     position: absolute;
    top: 0;
    background-color: red;
    width: 100%;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
    }
    .effeckt {
    opacity: 0;
   -webkit-transition: all 1000ms;
   transition: 1000ms;
   }
    .margin-t-35{margin-top:35px}
</style>
<script>
    export default{
        data(){
            return {
                user: {
                    consignee: '',
                    phone: '',
                    province: '',
                    address: '',
                    postalcode: '',
                    checkState: true,
                },
                isData: [],
            }
        },
        components: {},
        created: function () {
        },
        watch: {

        },
        computed: {
            errors: {
                set(){

                },
                get () {
                    this.isData = Object.keys(this.$vuerify.$errors);
                    return this.$vuerify.$errors;
                },
            },
        },
        vuerify: {
            'user.consignee': 'required',
            'user.phone': 'phone',
            'user.postalcode': 'postalcode',
            'user.address': 'required',
        },
        methods: {
            onSave: function () {
                if (this.$vuerify.check()) {
                    var formData = JSON.stringify(this.user);
                    console.log(formData)
                }
            },
        }
    }
</script>
