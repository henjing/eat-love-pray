<template>
    <!--购买弹框-->
    <div class="de-actionsheet container opacity">
        <div  class="actionsheet-cnt c-up-before payment container " :class="{'c-up-move':mod}">
            <ul class="ui-list">
                <li>
                    <div class="k-avatar ui-list-thumb">
                        <span tag='goodsImg' style="background-image:url('http://placeholder.qiniudn.com/190x284')"></span>
                    </div>
                    <div class="ui-list-info font14">
                        <p class="ui-nowrap ui-txt-muted padding-r-15 font14">这是商品的描述，很长很长的很长很长的很长很长的</p>

                        <div class="ui-txt-warning font14">￥100</div>
                    </div>
                    <div class="ui-txt-info padding-t-15 padding-r-10" @click="close">
                        <i class="jin-icon jin-icon-guanbi font28"></i>
                    </div>
                </li>
            </ul>

            <div class="ui-form-item ui-border-b bg-white ui-txt-info">
                <label>数量</label>
                <div class="goods-number pull-right clearfix ui-txt-info">
                    <span class="reduce" @click="reduce"><i class="jin-icon jin-icon-jian"></i></span>
                    <input class="number padding-l-0" type="tel" v-model="number">
                    <span class="add" @click="add"><i class="jin-icon jin-icon-jia"></i></span>
                </div>
            </div>
            <div class="ui-btn-wrap ui-list" @click="onOrder()">
                <div class="ui-whitespace bottom-btn " style="position: relative;">
                    立即购买
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return{
                unfold:true,
                mod:"",
                number:1
            }
        },
        props:['state-buy'],
        components:{
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
//            提交购买
            onOrder(){
                this.$router.push({path:'/store/storeOrder'})
            }
        }
    }
</script>
