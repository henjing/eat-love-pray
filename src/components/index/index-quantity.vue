<template>
    <!--购买弹框-->
    <div class="de-actionsheet container opacity">
        <div  class="actionsheet-cnt c-up-before payment container " :class="{'c-up-move':mod}">
            <ul class="ui-list">
                <li>
                    <div class="k-avatar ui-list-thumb">
                        <span tag='goodsImg' style="background-image:url('http://ok813a2du.bkt.clouddn.com/heshi20170303150643.png')"></span>
                    </div>
                    <div class="ui-list-info font14">
                        <p class="ui-nowrap ui-txt-muted padding-r-15 font14">{{goodsQuantity.goods_name}}</p>

                        <div class="ui-txt-warning font14">￥{{goodsQuantity.price}}</div>
                    </div>
                    <div class="ui-txt-info padding-t-15 padding-r-10" @click="close">
                        <i class="jin-icon jin-icon-guanbi font28"></i>
                    </div>
                </li>
            </ul>
            <ul class="jin-justify-flex agency ui-whitespace font12 ui-border-tb">
                <li class="agency-btn" v-for="key in agency" :class="{'agency-btn-yes':key.name == agencyName}" @click="onAgency(key)">{{key.name}}</li>
            </ul>
            <div class="ui-form-item ui-border-b bg-white ui-txt-info">
                <label style="color: #000" class="font14">购买数量</label>
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
    .agency{
        padding: 10px;
    }
    .agency>li{
        padding: 4px 8px;
        border-radius: 4px;
        color: #fff;
    }
    .agency-btn{
        background-color: #D6D6D6;
    }
    .agency-btn-yes{
        background-color: #13BF7B !important;
    }
    .agency-btn3{
        background-color: #FF3E2A;
    }
</style>
<script>
    import { XHRPost} from './../../js/ajax';
    export default{
        data(){
            return{
                unfold:true,
                mod:"",
                number:1,
                goodsQuantity:this.stateData,
                goods_id:this.stateId,
                agency:[
                    {number:1, name:"成为特约代理人",money: 181},
                    {number:10, name:"成为金牌经销商",money: 150},
                    {number:240, name:"成为市级总代",money: 110},
                ],
                agencyName:"成为特约代理人"
            }
        },
        props:['state-buy',"state-data", "state-id"],
        components:{
        },
        created: function() {
            this.onAgency();
            let _this = this;
            setTimeout(function(){
                _this.mod =_this.stateBuy;
            }, 100)
        },
        watch:{
            number(val,oldVal){
                let _val = isNaN(parseInt(val)) ? 0 : parseInt(val);
                if (_val < 10) {
                    this.agency[0].number = _val;
                    this.agency[1].number = 10;
                    this.agency[2].number = 240;
                    this.onAgency(this.agency[0])
                }else if (10 <= _val < 240) {
                    this.agency[0].number = 1;
                    this.agency[1].number = _val;
                    this.agency[2].number = 240;
                    this.onAgency(this.agency[1])
                }
                if(_val >= 240) {
                    this.agency[0].number = 1;
                    this.agency[1].number = 10;
                    this.agency[2].number = _val;
                    this.onAgency(this.agency[2])
                }
            }
        },
        methods:{
            close(){
                let _this = this;
                 this.mod=false;
                setTimeout(function(){
                    _this.$emit('on-close')
                }, 500);
                this.goodsQuantity.price = 181;
            },
            reduce(){
                if (this.number>1){
                    this.number--
                }
            },
            add(){
                this.number++
            },
//            获取等级
            onAgency(){
                XHRPost('/api/Shop/buyGoods',data,function (response) {
                    if (response.status = 1){

                    }else {
                        layer.open({
                            content: response.data.info,
                            time: 2,
                            style: 'background-color:rgba(0,0,0,.8);color:#fff'
                        });
                    }
                }.bind(this));
            },
//            提交购买
            onOrder(){
                let data={goods_id:encrypt(String(this.goods_id)), goods_number:encrypt(String(this.number))};
                XHRPost('/api/Shop/buyGoods',data,function (response) {
                      if (response.status = 1){
                           this.$router.push({path:'/index/indexOrder',query:{num:this.number,gid:this.goods_id}})
                      }
                }.bind(this));
            },
//            选择代理级别
            onAgency(msg){
                this.number = msg.number;
                this.agencyName = msg.name;
                this.goodsQuantity.price = msg.money;
            }
        }
    }
</script>
