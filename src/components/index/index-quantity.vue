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
            <ul class="agency ui-whitespace font12 ui-border-tb">
                <li class="agency-btn" v-for="key in agency" :class="{'agency-btn-yes':key.name == agencyName}" @click="onAgency(key)">{{key.name}}</li>
            </ul>
            <div class="ui-form-item ui-border-b bg-white ui-txt-info">
                <label style="color: #000" class="font14">购买数量</label>
                <div class="goods-number pull-right clearfix ui-txt-info">
                    <span class="reduce" @click="reduce"><i class="jin-icon jin-icon-jian"></i></span>
                    <input class="number padding-l-0" type="tel" v-model="number" :readonly="isReadOnly">
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
        overflow: hidden;
        padding: 10px;
    }
    .agency>li{
        float: left;
        padding: 4px 8px;
        border-radius: 4px;
        color: #fff;
    }
    .agency>li:nth-child(2){
          margin: 0 6%;
    }
    @media (max-width: 320px){
        .agency>li:nth-child(2){
            margin: 0 2%;
        }
    }
    .agency-btn{
        background-color: #D6D6D6;
    }
    .agency-btn-yes{
        background-color: #FDD275 !important;
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
                agencyName:"成为特约代理人",
//                3等级，处理购买为24的整倍数
                level:"",
                isReadOnly:false
            }
        },
        props:['state-buy',"state-data", "state-id"],
        components:{
        },
        created: function() {
            this.onGrade();
            let _this = this;
            setTimeout(function(){
                _this.mod =_this.stateBuy;
            }, 100)
        },
        watch:{
            number(val,oldVal){
//                等级
                let level =  this.goodsQuantity.level;
//                购买过的总数
                let total_sales1 = 10 - parseInt(this.goodsQuantity.total_sales);
                let total_sales2 = 240 - parseInt(this.goodsQuantity.total_sales);
                var _val;
                let _agency = this.agency;
                if(level == "0"){
                    _val = isNaN(parseInt(val)) ? 0 : parseInt(val);
                    if (_val < 10) {
                        _agency[0].number = _val;
                        _agency[1].number = 10;
                        _agency[2].number = 240;
                        this.onAgency(this.agency[0])
                    }
                    if (10 <= _val && _val < 240) {
                        _agency[0].number = 1;
                        _agency[1].number = _val;
                        _agency[2].number = 240;
                        this.onAgency(this.agency[1])
                    }
                    if (_val >= 240) {
                        _agency[0].number = 1;
                        _agency[1].number = 10;
                        _agency[2].number = _val;
                        this.onAgency(this.agency[2])
                    }
                }else if(level == "1"){
                    _val = parseInt(val) < total_sales1 ? 0 : parseInt(val);
                    if (total_sales1 <= _val && _val < total_sales2) {
                        _agency[0].number = _val;
                        _agency[1].number = total_sales2;
                        this.onAgency(this.agency[0])
                    }
                    if (_val >= total_sales2) {
                        _agency[0].number = total_sales1;
                        _agency[1].number = _val;
                        this.onAgency(this.agency[1])
                    }
                }else if(level == "3"){
//                    处理等级为3，购买数为24的整倍数且不能输入
                    this.isReadOnly = true;
                    this.goodsQuantity.price = 110;
                }else {
                    _val = parseInt(val) < total_sales2 ? 0 : parseInt(val);
                    if (_val >= total_sales2) {
                        this.agency[0].number = _val;
                        this.onAgency(this.agency[0])
                    }
                }
            }
        },
        methods:{
//            判断等级
            onGrade(){
//                根据等级和购买过的数量，修改默认数量和删除数组里的对象
                let level =  this.goodsQuantity.level;
                if("1" == level ){
                    this.agency.splice(0, 1);
                    this.agencyName = this.agency[0].name;
                    this.agency[0].number = 10 - parseInt(this.goodsQuantity.total_sales);
                    this.agency[1].number = 240 - parseInt(this.goodsQuantity.total_sales);
                    this.number = this.agency[0].number;

                }else if(level == "2" ){
                    this.agency.splice(0, 2);
                    this.agencyName = this.agency[0].name;
                    this.agency[0].number = 240 - parseInt(this.goodsQuantity.total_sales);
                    this.number = this.agency[0].number;
                }else if(level == "3"){
                    this.agency.splice(0, 3);
                    this.level = 3;
                    this.number = 24;
                }
            },
            close(){
                let _this = this;
                 this.mod=false;
                setTimeout(function(){
                    _this.$emit('on-close')
                }, 500);
                this.goodsQuantity.price = 181;
            },
            reduce(){
                if(this.level == "3"){
                    if (this.number > 24){
                       this.number = this.number - 24;
                    }
                }else {
                    this.number--;
                }
            },
            add(){
                if(this.level == "3"){
                    this.number = this.number + 24;
                }else {
                    this.number++
                }
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
