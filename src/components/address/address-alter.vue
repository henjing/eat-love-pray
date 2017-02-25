<template>
    <div class="jin-wrap">
        <div class=" margin-t-15 margin-b-15">
            <div class="kd-address-form ui-border-t">
                <form id="address-form" method="post">
                    <div class="bg-white">
                        <div class="ui-form-item kd-form-item ui-border-b  ">
                            <label class="">收件人</label>
                            <input type="text" class="color-9b" name="consignee" placeholder="填写姓名" v-model="addressUser.consignee" >
                        </div>
                        <div class="ui-form-item kd-form-item ui-border-b  ">
                            <label class="">联系电话</label>
                            <input type="tel" class="color-9b" name="phone" placeholder="手机或固定电话" v-model="addressUser.mobile" >
                        </div>
                        <ul class="ui-list jin-list-link select-address " @click="addressSelect">
                            <li class="ui-border-b">
                                <span class="">所在地区</span>
                                <div class="ui-list-info line-h-12 site" v-if="isProvince">{{addressUser.province}}</div>
                                <div class="text-right font14 ui-txt-muted site-pl" v-else="">请选择</div>
                            </li>
                        </ul>
                        <input type="hidden" name="province"  v-model="addressUser.province" />
                        <div class="ui-form-item kd-form-item ui-form-item-textarea ui-border-b  ">
                            <label class="">详细地址</label>
                            <textarea name="address" class="color-9b" placeholder="街道门牌号" v-model="addressUser.address" ></textarea>
                        </div>
                        <div class="ui-form-item ui-border-b  ">
                            <label class="">邮政编码</label>
                            <input type="tel" name="postalcode" class="color-9b" placeholder=""  v-model="addressUser.postalcode" >
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
         <div class="submit-btn  text-center">保存</div>
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
                addressUser: "",
                isProvince:false,
                checkState: false,
                select:false,
                selectData:""
            }
        },
        created() {
            this.addressAlter();
        },
        components:{
            AddressSelect
        },
        methods:{
            addressAlter(){
                XHRPost('/api/MyAddress/editAddressPageData',{address_id:encrypt(String(this.addressId))},function (response) {

                    if (response.data.data.state ==1){
                        this.checkState=true;
                    }else {
                        this.checkState=false;
                    };
                    this.addressUser=response.data.data;
                    if (response.data.data.province.length>1){
                        this.isProvince=true;
                    }else {
                        this.isProvince=false;
                    }
                }.bind(this))
            },
            onDelete: function (index) {
                let _this = this;
                layer.open({
                    content: '确定要删除该地址吗？',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function () {
                        console.log(_this.addressId)
                        XHRPost('/api/MyAddress/delAddress',{address_id:encrypt(String(_this.addressId))},function (response) {
                            if (response.data.status == 1){
                                layer.open({content: '删除成功!', time: 1});
                                setTimeout(function(){
                                    _this.$router.push({path:'/address'})
                                },1500)
                            }else {
                                layer.open({content: response.data.info, time: 1});
                                setTimeout(function(){
                                    _this.$router.push({path:'/address'})
                                },1500)
                            }
                        }.bind(this));
                    }
                })
            },
            addressSelect(){
                this.select=true;
            },
            onSelectData(msg){
                this.isProvince = true;
                this.select = false;
                this.addressUser.province = msg.province+msg.city+msg.county;
            }
        },
    }
</script>
