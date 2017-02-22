<template>
    <div>
        <!--搜索-->
        <div class="weui-search-bar weui-search-bar_focusing">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input v-model="search" type="search"  class="weui-search-bar__input" v-focus  :placeholder="searchPlaceHolder" @input="onSearch"/>
                    <input type='text' style='display:none'/>
                    <a class="weui-icon-clear" @click="clearSearch"></a>
                </div>
            </form>
            <a class="weui-search-bar__cancel-btn search-text" @click="cancelSearch">返回</a>
        </div>
        <!--通讯录-->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" infinite-scroll-immediate-check="false" style="margin-bottom: 92px">
            <template v-for="(items, key) in peopleData.data" >
                <div class="weui-cells__title">{{key}}</div>
                <template v-for="item in items">
                    <div class="weui-cells" :key="item.user_sn">
                        <div class="weui-cell weui-cell_access my-weui-cell">
                            <div class="weui-cell__hd my-img">
                                <img class="img" :src="item.wechat_avatar" alt="">
                            </div>
                            <div class="weui-cell__bd margin-l-10">
                                <h4 class="weui-media-box__title font14 fw500">{{item.user_name}}</h4>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <div class="weui-loadmore" v-show="busy">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">正在加载</span>
            </div>
            <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot" v-show="!busy">
                <span class="weui-loadmore__tips" style="background: transparent"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="sass" scoped>
    @import '../../sass/weui.scss';
    @import '../../sass/jin-base.scss';

    .my-weui-panel {
      margin-top: 0;
    }
    .my-weui-cell:before {
      left:0 !important;
    }
    .zhiyuan {
      margin-right:10px;
      display:block;
      &:before {
        background-color: #13BF7B;
        color: white;
        border-radius: 5px;
        font-size: 19px;
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        vertical-align: middle;
        line-height: 24px;
      }
    }
    .zuzhi {
      &:before {
        background-color: #FB5561;
      }
    }
    .weui-cell {
      padding:10px;
    }
    .weui-cells__title {
      padding-left:15px;
      padding-right:15px;
      height: 18px;
      line-height:18px;
      margin: 0;
      font-size:12px;
    }
    .weui-search-bar:before {
      border-top:0;
    }
    .weui-cell__bd p {font-size: 14px}
    .weui-search-bar {
      padding-left:14px;
      padding-right:14px;}
    .img {
      height: 40px;
      width: 40px;
      display: inline-block;
      line-height: 40px;
      margin-left:3px;
    }
    .weui-media-box__desc {
      color: #9B9B9B;
    }
    .my-img {
      width: 40px;
      height: 40px;}
    .fw500 {
      font-weight:500;
    }
    .unnamed {
      display: inline-block;
      border:1px solid #DDDDDD;
      height: 16px;
      line-height:16px;
      border-radius:100px;
      width: 40px;
      text-align: center;
      /*margin-left:5px;*/
      &.b-red {
        border:1px solid #FB5561;
        color: #FB5561;
      }
    }
    .red-spot {
      position: absolute;
      left: 0;
      width: 5px;
      height: 30px;
      background-color: #FB5561;
      top: 15px;
    }
    .new-friend {
      /*margin-top:0;*/
      .weui-cell {
        height:75px;
        align-items: flex-start;
        padding: 10px;
        &:before {
          right: 10px !important;
        }
        &.active {
          background-color: #FFFCE8;
        }
      }
      .weui-cell:before {
        left: 10px !important;
      }
    }
    .mt-n-5 {
      margin-top:-3px;
    }
    .line-h-18 {
      line-height:1.8 !important;
    }
    .line-h-20 {
      line-height:2.0 !important;
    }
    .add-button {
      background-color: #13BF7B;
      font-size: 14px;
      width: 45px;
      height: 24px;
      line-height: 24px;
      padding: 0;
      position: absolute;
      right: 10px;
      top: 26px;
    }
    .gray-badge {
      color: #9B9B9B;
      background-color: transparent;
    }
    .top20 {
      top:20px !important;
    }
    .em-6 {
      width:6em !important;
    }
    .right15 {
      right: 15px !important;
    }
    .null-result .weui-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .color9b {
      color: #9b9b9b;
    }
    .normal-num {
      font-size: 24px;
      color: #000000;
      letter-spacing: 0.19px;
    }
    .normal-txt {
      font-size: 12px;
      color: #9B9B9B;
      letter-spacing: 0.09px;
    }
    .detail-group {
      flex-direction: row;
      display: flex;
      .text-center:not(:last-child) {
        margin-right:42px;
      }
      .text-center:last-child {
        margin-right:9px;
      }
    }
     /*金卡 微股东等标签 邀请人等*/
    .inviter {
      background: #FFF4D9;
      box-shadow: 0 1px 0 0 rgba(0,0,0,0.05);
    }
    .badge {
      display: inline-block;
      //width:55px;
      height: 20px;
      background: #FFC234;
      border-radius: 100px;
      font-size: 10px;
      color: #FFFFFF;
      letter-spacing: 0.07px;
      text-align: center;
      line-height: 20px;
      padding: 0 0.8em;
    }
    .weui-cells:after {
      border-bottom: 0;
    }
    .weui-cells {
      margin-top:0;
    }
    .search-text {
      font-size: 14px;
      color: #4990E2;
      letter-spacing: 0.11px;
    }
    .placeholder {
      text-align: center;
      font-size: 14px;
      color: #4A4A4A;
      letter-spacing: 0.11px;
      height: 25px;
      line-height:25px;
      border-right: 1px solid #f0f0f0;
    }
    .one-floor .placeholder {
      margin-top:20px;
    }
    .placeholder.no-border {
      border-right: 0;
    }
    .two-floor .placeholder {
      margin-top:15px;
    }
    .container {
      /*//min-height: 100vh;*/
    }
    .add-border-bottom:after {
        bottom: 0;
        border-bottom: 1px solid #d9d9d9 !important;
        transform-origin: 0 100%;
        transform: scaleY(.5);
    }
    [v-cloak]{
        display:none;
    }
</style>