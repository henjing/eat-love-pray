<template>
    <!--购买弹框-->
    <div class="de-actionsheet container opacity">
        <div  class="actionsheet-cnt c-up-before payment container " :class="{'c-up-move':mod}">
            <ul class="ui-list">
                <li>
                    <div class="k-avatar ui-list-thumb">
                        <span tag='goodsImg' :style="{backgroundImage: 'url('+ invQuantity.goods_img_cover+')'}"></span>
                    </div>
                    <div class="ui-list-info font14">
                        <p class="ui-nowrap ui-txt-muted padding-r-15 font14">{{invQuantity.goods_name}}</p>
                        <div >库存:<span class="ui-txt-warning font14">{{invQuantity.total_in_stock}}</span></div>
                    </div>
                    <div class="ui-txt-info padding-t-15 padding-r-10" @click="close">
                        <i class="jin-icon jin-icon-guanbi font28"></i>
                    </div>
                </li>
            </ul>

            <div class="ui-form-item ui-border-b bg-white ui-txt-info">
                <label style="color: #000" class="font14">提货数量</label>
                <div class="goods-number pull-right clearfix ui-txt-info">
                    <span class="reduce" @click="reduce"><i class="jin-icon jin-icon-jian"></i></span>
                    <input class="number padding-l-0" type="tel" v-model="number">
                    <span class="add" @click="add"><i class="jin-icon jin-icon-jia"></i></span>
                </div>
            </div>
            <div class="ui-btn-wrap ui-list" @click="onOrder()">
                <div class="ui-whitespace bottom-btn " style="position: relative;">
                    立即申请
                </div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import { XHRPost} from './../../js/ajax';
    export default{
        data(){
            return{
                mod:"",
                number:1,
                invQuantity:this.propsInvData,
            }
        },
        props:['order-unfold',"props-inv-data"],
        components:{
        },
        created: function() {
            let _this = this;
            setTimeout(function(){
                _this.mod =_this.orderUnfold;
            }, 100)
        },
        methods:{
            close(){
                let _this = this;
                 this.mod=false;
                setTimeout(function(){
                    _this.$emit('order-close')
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
//            提交申请
            onOrder(){
                let data={goods_id:encrypt(String(this.invQuantity.goods_id)), pick_number:encrypt(String(this.number))};
                XHRPost('/api/MyReserve/getConfirmPickUp',data,function (response) {
                    console.log(response)
                      if (response.data.status == 1){
                           this.$router.push({path:'/inventory/inventoryOrder',query:{num:this.number,gid:this.invQuantity.goods_id}})
                      }else {
                          layer.open({
                              content: response.data.info,
                              time: 2,
                              style: 'background-color:rgba(0,0,0,.8);color:#fff'
                          });
                      }
                }.bind(this));
            }
        }
    }
</script>
