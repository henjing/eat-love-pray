<template>
    <div>
            <div class="apply-item margin-b-10 ui-border-b">
        <ul class="store-list jin-list">
            <li class="ui-border-b">
                <div class="ui-list-thumb">
                    <span style="background-image:url(http://placeholder.qiniudn.com/100x100)"></span>
                </div>
                <p class="ui-list-info padding-tb-0 ui-nowrap-multi font14 line-h-14">
                    《Tiny World》青年艺术家谢雷铭限量复制画…2016 08-11 22:32青年艺术家谢雷铭限量复制画…2016 08-11 22:32青年艺术家谢雷铭限量复制画…2016 08-11 22:32
                </p>
                <div class="text-right">
                    <div class="font14 ui-txt-warning">￥100.00</div>
                    <div class="font10 color-9b">x10</div>
                </div>
            </li>
        </ul>
        <div class="jin-justify-flex ui-whitespace padding-t-10 padding-b-10 bg-white">
            <div class="font14 color-9b">合计</div>
            <div class="font14 ui-txt-warning">￥100.00</div>
        </div>
        <div class="store-submit-btn jin-box-end ui-whitespace bg-white">
            <div class="">合计:<span class="ui-txt-warning">￥100.00</span></div>
            <div class="order-btn margin-l-15 font14" @click="onBank">提交订单</div>
        </div>
    </div>
        <store-bank
                v-if="bank"
                v-bind:state-bank="bank"
                @on-close="onSelectBank"
        >
        </store-bank>
    </div>
</template>
<style>
    .store-list>li{
        position: relative;
        background-color: #fff;
        line-height: 24px;
        display: -webkit-box;
    }
    .store-submit-btn{
        position: fixed;
        bottom:0;
        display: -webkit-box;
        -webkit-box-align: center;
        width: 100%;
        padding: 15px;
        background: #FFFFFF;
        box-shadow: 0 -1px 10px 0 rgba(0,0,0,0.10);
    }
    .jin-box-end{
        display:-webkit-box;
        -webkit-box-pack:end;
    }
    .order-btn{
        padding: 3px 10px;
        color: #fff;
        background: #FF3E2A;
        border-radius: 3px;
    }
</style>
<script>
    import storeBank from 'components/store/store-bank.vue';
    export default{
        data(){
            return{
                unfold:true,
                mod:"",
                number:1,
                bank:false
            }
        },
        props:['state-buy'],
        components:{
            storeBank
        },
        created: function() {
            let _this = this;
            setTimeout(function(){
                _this.mod =_this.stateBuy;
            }, 100)
        },
        methods:{
            close(){
                let _this = this;
                 this.mod=false;
                setTimeout(function(){
                    _this.$emit('on-close')
                }, 500);
            },
            reduce(){
                if (this.number>1){
                    this.number--
                }
            },
            add(){
                this.number++
            },
//            提交订单
            onBank(){
                this.bank=true;
            },
            onSelectBank(){
                this.bank=false;
            }
        }
    }
</script>
