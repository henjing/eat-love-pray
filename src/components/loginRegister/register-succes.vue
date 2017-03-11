<template>
    <div>
        <div class="top-img">
            <img src="./../../images/reg-suc.png" width="100%" height="auto">
        </div>
        <div class="ui-whitespace text-center">
            <p class="ui-txt-info margin-t-10">恭喜你注册成功!</p>
        </div>
        <div class="btn-img-top text-center btn-width abs">
            <button class="ui-txt-warning k-btn-lgg k-btn-red margin-b-15" @click="onSpecial" style="background-color: #13BF7B">成为特约代言人</button>
            <button class="ui-txt-warning k-btn-lgg k-btn-red margin-b-15" @click="onGold" style="background-color: rgba(251,216,96,1)">成为金牌经销商</button>
            <button class="ui-txt-warning k-btn-lgg k-btn-red" @click="onIndex">去首页看看</button>
        </div>
    </div>
</template>
<style scoped>
    /*注册成功页面*/
    .top-img{
        width: 40%;
        margin: auto;
        margin-top: 22%;

    }
    .btn-width{
        width: 60%;
        margin: auto;
        left: 0px;
        right: 0px;

    }
    .btn-img{
        width: 78px;
        height: 22px;
        margin: auto;
        left: 0px;
        right: 0px;
        top: -10px;
    }
    .btn-img-top{
        margin-top: 50px;
    }
    .k-btn-lgg{
        height: 45px;
        line-height: 45px;
        width: 100%;
        font-size: 18px;
        border-radius: 25px;
    }
    .k-btn-red{
        color: #fff;
        background-color: #ff4300;
        background-image: none;
        border: none;
    }
</style>
<script>
    export default{
        data(){
            return{

            }
        },
        components:{
        },
        methods: {
            onIndex(){
                this.$router.push({path:'/index'})
            },
            onSpecial(){
                this.$router.push({path:'/index/indexOrder', query:{num:1, gid:7}})
            },
            onGold(){
                this.$router.push({path:'/index/indexOrder', query:{num:10, gid:7}})
            }

        }
    }
</script>
