<template>
    <div>
        <!--loop start-->
            <div class="ui-panel" v-for="key in info" >
                <ul class="ui-list ui-list-text">
                    <li class="address-user line-h-12">
                        <div class="ui-list-info">
                            <h4>{{key.consignee}}</h4>
                        </div>
                        <div class="font14">{{key.mobile}}</div>
                    </li>
                    <li class="line-h-14 font14 color-9b" >
                        {{key.province}}
                    </li>
                </ul>
                <section class="ui-panel ui-panel-simple  ui-border-tb" >
                        <h2 class="k-box-align">
                            <div   v-if="key.state == 1" >
                                <label class="ui-checkbox-s red-checked margin-r-5 "   style="width: auto">
                                    <input class="chooseAll margin-r-0" type="radio" name="radio" checked  />
                                    <i class="ui-txt-warning font14">默认地址</i>
                                </label>
                            </div>
                            <div v-else>
                                 <label class="ui-checkbox-s red-checked margin-r-5 " style="width: auto">
                                    <input class="chooseAll margin-r-0" v-on:click="onChoose(key.address_id)" type="radio" name="radio" />
                                    <i class="font14">设为默认地址</i>
                                </label>
                            </div>
                                <div class="ui-panel-title-tips display-box">
                                        <div class="display-box margin-r-20">
                                                <i class="k-icon-bianji2  font18"></i>编辑
                                            </div>
                                        <div class="display-box delete" v-on:click="onDelete(key)">
                                                <i class="ui-icon-delete  font18"></i>删除
                                            </div>
                                    </div>
                            </h2>
                    </section>
            </div>
            <!--loop end-->
        <div class="mall-btn-bottom text-center container">添加新地址</div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return {
                info: [
                    {
                        address: "萨达十大所大所",
                        address_id: "30950",
                        consignee: "浪哥",
                        mobile: "18378845622",
                        province: "广西壮族自治区 南宁市 西乡塘区",
                        state: "0",
                    },
                    {
                        address: "萨达十大所大所",
                        address_id: "30951",
                        consignee: "浪哥2",
                        mobile: "18378845622",
                        province: "广西壮族自治区 南宁市 西乡塘区",
                        state: "1",
                    },
                    {
                        address: "萨达十大所大所",
                        address_id: "30952",
                        consignee: "浪哥2",
                        mobile: "18378845622",
                        province: "广西壮族自治区 南宁市 西乡塘区",
                        state: "0",
                    }
                ],
            }
        },
        components: {},
        methods: {
            onChoose: function (index) {
                this.info.map(function (v, i) {
                    v.address_id == index ? v.state = 1 : v.state = 0;
                });
                console.log(index)
            },
            onDelete: function (index) {
                var dataAll = this.info;
                layer.open({
                    content: '确定要删除该地址吗？',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function () {
                        if (index.state == '0'){
                             layer.open({content: '删除成功!', time: 1});
                            setTimeout(function(){
                                dataAll.splice(dataAll.indexOf(index), 1)
                            },1500)
                        }else {
                            layer.open({content: '不能删除默认地址!', time: 1.2});
                        }
                    },
                });
            }
        }
    }
</script>
