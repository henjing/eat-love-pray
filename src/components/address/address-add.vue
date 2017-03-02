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
                            <input type="text" class="color-9b"  placeholder="填写姓名" v-model="user.consignee" >
                        </div>
                        <div class="ui-form-item kd-form-item ui-border-b">
                            <label class="">联系电话</label>
                            <input type="tel" class="color-9b" placeholder="手机或固定电话" v-model="user.mobile" >
                        </div>
                        <ul class="ui-list jin-list-link select-address" @click="addressSelect">
                            <li class="ui-border-b">
                                <span class="">所在地区</span>
                       <div class="ui-list-info line-h-12 site" v-if="isProvince">{{user.province}}</div>
                                <div class="text-right font14 ui-txt-muted site-pl" style="webkit-box-flex: 1;" v-else="">请选择</div>
                            </li>
                        </ul>
                        <input type="hidden"   v-model="user.province" />
                        <div class="ui-form-item kd-form-item ui-form-item-textarea ui-border-b">
                            <label class="">详细地址</label>
                            <textarea name="address" class="color-9b" placeholder="街道门牌号" v-model="user.address" ></textarea>
                        </div>
                        <div class="ui-form-item  ui-border-b">
                            <label class="">邮政编码</label>
                            <input type="tel" class="color-9b"  placeholder="" >
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
        <div class="submit-btn  text-center" @click="addressAdd">保存</div>
        <address-select
                v-if="select"
                @select-data="onSelectData"
        ></address-select>
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
    import {XHRPost} from '../../js/ajax.js';
    import AddressSelect from '../../components/address/address-select.vue';
    export default{
        data(){
            return {
                user: {
                    consignee: '',
                    mobile: '',
                    province: '',
                    address: '',
                    checkState: true,
                },
                select:false,
                isProvince:false,
                number:this.$route.query.num,
                goods_id:this.$route.query.gid
            }
        },
        components: {AddressSelect},
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
            'user.consignee': 'consignee',
            'user.mobile': 'mobile',
            'user.province':'province',
            'user.address': 'address',
        },
        methods: {
            addressAdd(){
                let _this = this;
                let addData ={
                    consignee:encrypt(String(this.user.consignee)),
                    mobile: encrypt(String(this.user.mobile)),
                    province: encrypt(String(this.user.province)),
                    address: encrypt(String(this.user.address)),
                    state: encrypt(String(this.user.checkState ? "1" :"0"))
                };
                if (this.$vuerify.check()) {
                    XHRPost('/api/MyAddress/addAddress', addData, function (response) {
                        if (response.data.status == 1){
                            layer.open({
                                content: response.data.info,
                                time: 2,
                                style: 'background-color:rgba(0,0,0,.8);color:#fff'
                            });
                            setTimeout(function(){
                                _this.$router.push({path: '/address', query: {num:_this.number, gid:_this.goods_id}})
                            }, 2000)
                        }else {
                            layer.open({
                                content: response.data.info,
                                time: 2,
                                style: 'background-color:rgba(0,0,0,.8);color:#fff'
                            });
                        }
                    }.bind(this))
                }
            },
             addressSelect(){
                this.select=true;
            },
            onSelectData(msg){
                this.select = false;
                if(msg.county.county_name.length>1){
                    this.isProvince = true;
                    this.user.province = msg.province.province_name+msg.city.city_name+msg.county.county_name;
                }else {
                    this.isProvince = false;
                }

            }
        }
    }
</script>
