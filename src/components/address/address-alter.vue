<template>
    <div class="jin-wrap">
        <div class=" margin-t-15 margin-b-15">
            <ul >
                <li  v-for="key in errors" class="verify" >{{key}}</li>
            </ul>
            <div class="kd-address-form ui-border-t" :class="{'margin-t-35':isData.length>0}">
                <form id="address-form" method="post">
                    <div class="bg-white">
                        <div class="ui-form-item kd-form-item ui-border-b  ">
                            <label class="">收件人</label>
                            <input type="text" class="color-9b" placeholder="填写姓名" v-model="addressUser.consignee" >
                        </div>
                        <div class="ui-form-item kd-form-item ui-border-b  ">
                            <label class="">联系电话</label>
                            <input type="tel" class="color-9b" placeholder="手机或固定电话" v-model="addressUser.mobile" >
                        </div>
                        <ul class="ui-list jin-list-link select-address " @click="addressSelect">
                            <li class="ui-border-b">
                                <span class="">所在地区</span>
                                <div class="ui-list-info line-h-12 site" v-if="isProvince">{{addressUser.province}}</div>
                                <div class="text-right font14 ui-txt-muted site-pl" style="webkit-box-flex: 1;" v-else="">请选择</div>
                            </li>
                        </ul>
                        <input type="hidden" name="province"  v-model="addressUser.province" />
                        <div class="ui-form-item kd-form-item ui-form-item-textarea ui-border-b  ">
                            <label class="">详细地址</label>
                            <textarea name="address" class="color-9b" placeholder="街道门牌号" v-model="addressUser.address" ></textarea>
                        </div>
                        <div class="ui-form-item ui-border-b  ">
                            <label class="">邮政编码</label>
                            <input type="tel"  class="color-9b" placeholder=""  />
                        </div>
                    </div>
                    <div class="ui-form-item ui-form-item-switch margin-t-10 ui-border-tb bg-white">
                        <p> 设为默认地址</p>
                        <label class="ui-switch">
                            <input type="checkbox" name="state" v-model="checkState"  />
                        </label>
                    </div>
                    <div class="ui-form-item  ui-txt-warning  margin-t-10 ui-border-tb bg-white" @click="onDelete">
                        删除地址
                    </div>
                </form>
            </div>
        </div>
         <div class="submit-btn  text-center" @click="selectSubmit">保存</div>
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
</style>
<script>
    import {XHRPost} from '../../js/ajax.js';
    import AddressSelect from '../../components/address/address-select.vue';
    export default{
        data(){
            return{
                addressId:this.$route.query.id,
                addressUser:  {
                    consignee: '',
                    mobile: '',
                    province: '',
                    address: '',
                },
                isProvince:false,
                checkState: "",
                select:false,
                selectData:"",
                number:this.$route.query.num,
                goods_id:this.$route.query.gid,
                order_id:this.$route.query.oid
            }
        },
        created() {
            this.addressAlter();
        },
        components:{
            AddressSelect
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
            'addressUser.consignee': 'consignee',
            'addressUser.mobile': 'mobile',
            'addressUser.province':'province',
            'addressUser.address': 'address',
        },
        methods:{
            addressAlter(){
                XHRPost('/api/MyAddress/editAddressPageData',{address_id:encrypt(String(this.addressId))},function (response) {
                    if (response.data.data.state ==1){
                        this.checkState=true;
                    }else {
                        this.checkState=false;
                    };
                    this.isProvince = true;
                    this.addressUser=response.data.data;
                }.bind(this))
            },
            onDelete: function (index) {
                let _this = this;
                layer.open({
                    content: '确定要删除该地址吗？',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function () {
                        XHRPost('/api/MyAddress/delAddress',{address_id:encrypt(String(_this.addressId))},function (response) {
                            if (response.data.status == 1){
                                layer.open({content: '删除成功!', time: 1});
                                setTimeout(function(){
                                    _this.$router.push({path:'/address', query: {num: _this.number, gid: _this.goods_id, oid:_this.order_id}})
                                },1500)
                            }else {
                                layer.open({content: response.data.info, time: 1});
                            }
                        }.bind(this));
                    }
                })
            },
            //            接收选择数据
            addressSelect(){
                this.select=true;
            },
            onSelectData(msg){
                this.isProvince = true;
                this.select = false;
                if(msg.county.county_name.length>1){
                    this.addressUser.province = msg.province.province_name+msg.city.city_name+msg.county.county_name;
                }else {
                }
            },
            selectSubmit(){
                let _this = this;
                let addData ={
                    address_id:encrypt(String(this.addressId)),
                    consignee:encrypt(String(this.addressUser.consignee)),
                    mobile: encrypt(String(this.addressUser.mobile)),
                    province: encrypt(String(this.addressUser.province)),
                    address: encrypt(String(this.addressUser.address)),
                    state: encrypt(String(this.checkState ? "1" :"0"))
                };
                if (this.$vuerify.check()) {
                    XHRPost('/api/MyAddress/editAddress', addData, function (response) {
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
                            if (response.data.info == "唯一的默认地址需要保留哦"){
                                _this.checkState = ! _this.checkState;
                            }
                        }
                    }.bind(this))
                }
            }
        },
    }
</script>
