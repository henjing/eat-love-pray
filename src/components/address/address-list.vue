<template>
    <div>
        <div class="jin-wrap">
            <!--loop start-->
            <div class="ui-panel" v-for="key in addressData" >
                <ul class="ui-list ui-list-text" @click="onPresent(key.address_id)">
                    <li class="address-user line-h-12">
                        <div class="ui-list-info">
                            <h4>{{key.consignee}}</h4>
                        </div>
                        <div class="font14">{{key.mobile}}</div>
                    </li>
                    <li class="line-h-14 font14 color-9b" >
                        {{key.province}}{{key.address}}
                    </li>
                </ul>
                <section class="ui-panel ui-panel-simple  ui-border-tb" >
                    <h2 class="jin-box-align">
                        <div   v-if="key.state == 1" >
                            <label class="ui-checkbox-s red-checked margin-r-5 "   style="width: auto">
                                <input class="chooseAll margin-r-0" type="radio" name="radio" checked  />
                                <i class="ui-txt-warning font14">默认地址</i>
                            </label>
                        </div>
                        <div v-else>
                            &nbsp;
                            <!--<label class="ui-checkbox-s red-checked margin-r-5 " style="width: auto">
                               <input class="chooseAll margin-r-0" v-on:click="onChoose(key.address_id)" type="radio" name="radio" />
                               <i class="font14">设为默认地址</i>
                           </label>-->
                        </div>
                        <div class="ui-panel-title-tips display-box">
                            <div class="display-box margin-r-20" @click="addressAlter(key.address_id)">
                                <i class="jin-icon jin-icon-bianji margin-r-5  font14"></i>编辑
                            </div>
                            <div class="display-box delete" v-on:click="onDelete(key)">
                                <i class="jin-icon jin-icon-shanchu  font14"></i>删除
                            </div>
                        </div>
                    </h2>
                </section>
            </div>
            <!--loop end-->
        </div>
        <!--空缺状态 start -->
        <div class="jin-box-center margin-b-15 text-center" v-if="addressNull" style="min-height: 400px">
            <img src="/static/images/null-data.png" style="width: 80%"/>
            <div class="margin-t-10 font14 ui-txt-muted">空旷到可以成为一片森林</div>
        </div>
        <!--空缺状态 end-->
        <div class="mall-btn-bottom text-center container" @click="addressAdd">添加新地址</div>
    </div>
</template>
<style>
    .ui-checkbox-s input:checked:before  {
        font-size: 26px !important;
        content: "\e73d" !important;
        left: 0 !important;
    }
</style>
<script>
    import {XHRPost, XHRGet } from '../../js/ajax.js';
    export default{
        data(){
            return {
                addressData: "",
                addressNull:false,
                number:this.$route.query.num,
                goods_id:this.$route.query.gid,
                order_id:this.$route.query.oid
            }
        },
        components: {},
        created() {
            this.addressList();
        },
        methods: {
            addressList(){
                XHRGet('/api/MyAddress/index',{},function (response) {
                    if(response.data.status ==1){
                        this.addressData=response.data.data;
                    }else {
                        this.addressNull=true;
                    }
                }.bind(this))
            },
            onChoose: function (index) {
                this.addressData.map(function (v, i) {
                    v.address_id == index ? v.state = 1 : v.state = 0;
                });
            },
            onDelete: function (index) {
                var dataAll = this.addressData;
                layer.open({
                    content: '确定要删除该地址吗？',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function () {
                        if (index.state == '0'){
                            XHRPost('/api/MyAddress/delAddress',{address_id:encrypt(String(index.address_id))},function (response) {
                                console.log(response)
                                if (response.data.status == 1){
                                    layer.open({content: '删除成功!', time: 1});
                                    setTimeout(function(){
                                        dataAll.splice(dataAll.indexOf(index), 1)
                                    },1500)
                                }
                            }.bind(this));
                        }else {
                            layer.open({content: '不能删除默认地址!', time: 1.2});
                        }
                    },
                })
            },
            addressAlter(id){
                this.$router.push({path:'/address/addressAlter', query: { id: id, num:this.number, gid:this.goods_id, oid:this.order_id}})
            },
            addressAdd(){
                this.$router.push({path:'/address/addressAdd', query: {num:this.number, gid:this.goods_id, oid:this.order_id}})
            },
//            确认选择收货地址
            onPresent(msg){
                this.$router.push({path:'/index/indexOrder', query:{num:this.number, gid:this.goods_id, addid:msg, oid:this.order_id}})
            }
        }
    }
</script>
