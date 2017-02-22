<template>
    <div>
        <!--未发货-->
        <template id="no" v-if="logistics">
            <ul class="ui-list jin-list margin-b-10">
                <li class="buy-panel buy-panel-no">
                    <div class="buy-icon-yes jin-icon jin-icon-waitlove-copy display-box"></div>
                    <!--产品描述、类型-->
                    <div class="ui-list-info line-h-14">
                        <div class="padding-r-15 font14">厂商未发货</div>
                        <div class="padding-r-15 font12">请等待厂商发货</div>
                    </div>
                    <!--单价、数量-->
                    <div class="buy-contact-btn font14">
                        联系厂商
                    </div>
                </li>
            </ul>
        </template>
        <!--已发货-->
        <template id="yes" v-if="!logistics">
            <div>
                <ul class="ui-list jin-list margin-b-10">
                    <li class="buy-panel buy-panel-yes">
                        <div class="buy-icon-yes jin-icon jin-icon-02 display-box"></div>
                        <!--产品描述、类型-->
                        <div class="ui-list-info line-h-14">
                            <div class="padding-r-15 font14">厂商已发货</div>
                            <div class="padding-r-15 font12">'+day+'</div>
                        </div>
                        <!--单价、数量-->
                        <div class="buy-contact-btn font14" data-href="tel:">
                            联系厂商
                        </div>
                    </li>
                    <li class="ui-form-item-link" >
                        <div class="ui-list-info line-h-12">
                            <h4 class="font12 color-13be7b">【金华市】金华转运中心 已发出</h4>
                            <time class="font10 ui-txt-info">2016-09-22 06:33:12</time>
                        </div>
                    </li>
                </ul>
                <!--收货地址-->
                <div class="address-border">
                    <ul class="ui-list ">
                        <li class="">
                            <div class="ui-list-info">
                                <h4 class="padding-b-15 ui-nowrap font14">收货地址：</h4>
                                <p class="padding-r-15 font12 line-h-12">广西壮族自治区南宁市青秀区金湖路金源CBD现代城 广西向前网络科技有限公司</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul class="ui-list jin-list">
                    <li class="ui-border-tb">
                        <div class="ui-list-thumb" style="background-image: url(img/0.jpg);"></div>
                        <!--产品描述、类型-->
                        <div class="ui-list-info">
                            <div class="line-clamp description padding-r-15">产品标题1</div>
                        </div>
                        <!--数量-->
                        <div class="text-right ui-txt-warning">
                            <span>100</span>单
                        </div>
                    </li>
                </ul>
                <ul class="ui-list ui-list-pure margin-b-20 ui-border-tb">
                    <li class="font12 txt-color2 line-h-12">
                        <div class="margin-b-5">订单编号：233202324504582234</div>
                        <div class="margin-b-5">创建时间：2016-09-21 17:34:19</div>
                        <div>发货时间：2016-09-21 17:34:19</div>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                logistics:false,
            }
        },
        components:{

        }
    }
</script>
