<template>
    <div>
        <!--搜索-->
        <div class="weui-search-bar" :class="{'weui-search-bar__focusing': enterSearch}">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input v-model="search" type="search" v-focus class="weui-search-bar__input" @input="onSearch" placeholder="搜索"/>
                    <!--如果form里只有一个input标签，就会。。。-->
                    <input type='text' style='display:none'/>
                    <a class="weui-icon-clear" @click="clearSearch"></a>
                </div>
                <label class="weui-search-bar__label" @click="enterSearchFn">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a class="weui-search-bar__cancel-btn search-text" @click="cancelSearch">返回</a>
        </div>
        <!--通讯录-->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" infinite-scroll-immediate-check="false" style="margin-bottom: 92px">
            <template v-for="(items, key) in peopleList" >
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
                search: '',
                enterSearch: false,
                peopleList: {
                    "G": [{
                        "user_sn": "06e7569efe631c38da078331e0f8fe3b",
                        "user_name": "郭银波",
                        "initial": "G",
                        "real_name": null,
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/PiajxSqBRaEIwftkQVBzicqXYOvD0Kk88Hibh33ZWakXM0copNfEfzmQwrC65YPVvPWG6XR6uqeNuAbZEeicpibciaDg\/0",
                        "level": "注册用户"
                    }],
                    "H": [{
                        "user_sn": "e5ec96108e21b165434273d2605b3c60",
                        "user_name": "黄永明",
                        "initial": "H",
                        "real_name": "黄永明",
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/thfLhcllFYpnmzS6rvR7dtE5ZxtVBoEOYEseBtWV1lbBH6wvAvbXS2jheuGMYibwxic5EgHRerFmKaG8VA1D2ibW7KCibBsBNuBq\/0",
                        "level": "注册用户"
                    }],
                    "L": [{
                        "user_sn": "f08f4e901361d2139a60560be89f5a0c",
                        "user_name": "李振威",
                        "initial": "L",
                        "real_name": null,
                        "wechat_avatar": "http:\/\/ok813a2du.bkt.clouddn.com\/avatar.jpg",
                        "level": "注册用户"
                    }, {
                        "user_sn": "e02d3900f3c4f655474cbfb06750627a",
                        "user_name": "李葆洁",
                        "initial": "L",
                        "real_name": null,
                        "wechat_avatar": "http:\/\/ok813a2du.bkt.clouddn.com\/avatar.jpg",
                        "level": "注册用户"
                    }, {
                        "user_sn": "384bec6a43d17da66678ae8c6a453de7",
                        "user_name": "梁大文",
                        "initial": "L",
                        "real_name": "梁大文",
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/7wQIvr3WYNcSjrmWB86pnT1G1Cgh2PLtsicwZ6m6VxeWV6ibceOzdHTTqbf7E239riarE5768wM8XDSvibHFS7qDHBLxRNibHibvOa\/0",
                        "level": "注册用户"
                    }, {
                        "user_sn": "7f414cdcec90b06acbdc30cfead2908e",
                        "user_name": "李永威",
                        "initial": "L",
                        "real_name": "李永威",
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/7wQIvr3WYNfxJwIyHjthdGib2Yvv7WvSqWeBTlyVQE7hqtuHHC6SLu6nlovnVyqeC8O9e3eDBFc8elX38cAgQfTvfiapBt3KuP\/0",
                        "level": "注册用户"
                    }, {
                        "user_sn": "a52fc14c501d42f01923337ac67cd61a",
                        "user_name": "罗远华",
                        "initial": "L",
                        "real_name": "罗远华",
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/q58EK0fZ5IicEKaQibexa8RMPyDDNbs1gS1W17dHGVfnV8wia7IlxibWTibJHUD1fAhyUI6fQY1y8YbrkV7fAibCtF91Hmf4RDfO7r\/0",
                        "level": "微股东"
                    }, {
                        "user_sn": "aa8e49f1008da38f948e4276ecc91765",
                        "user_name": "李康哲",
                        "initial": "L",
                        "real_name": null,
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/Q3auHgzwzM6ngySYxFvJ3ngcx4F0fZib9oL4CGrNicdptjxDKra9yrpHS7B5HevD7VicO5bibbyaEN1FKWpH5C2l3PJokmpKUKz60DCM2eYBgfI\/0",
                        "level": "注册用户"
                    }],
                    "M": [{
                        "user_sn": "641ee9f8462de369c19ca7f77e9f1e0a",
                        "user_name": "麻清华",
                        "initial": "M",
                        "real_name": null,
                        "wechat_avatar": "http:\/\/ok813a2du.bkt.clouddn.com\/avatar.jpg",
                        "level": "注册用户"
                    }, {
                        "user_sn": "105e4a9aba105b16cf25796f45aa6ba3",
                        "user_name": "莫志豪",
                        "initial": "M",
                        "real_name": null,
                        "wechat_avatar": "http:\/\/wx.qlogo.cn\/mmopen\/BogPvlSOXxkiba7aibpKQJiaRfkSNYlga1ZeW1Vic5RTbAgctV24cb5BZNyDxwufqsu7kajzLVB3qhlyUCP4ibAogoLTmibiachicUbI\/0",
                        "level": "注册用户"
                    }]
                },
                busy: false,
            }
        },
        methods: {
            onSearch() {

            },
            cancelSearch() {
                this.enterSearch = false;
            },
            clearSearch() {
                this.enterSearch = false;
            },
            enterSearchFn() {
                this.enterSearch = true;
            },
            loadMore() {

            },
        },
        directives: {
            focus: {
                inserted: function (el) {
                     console.log('inserted', arguments);
//                    el.focus();
                },
                update: function (el) {
                    console.log('update', arguments);
                    el.focus();
                },
            }
        }
    }
</script>

<style lang="sass" >
    .weui-search-bar.weui-search-bar__focusing .weui-search-bar__label {
        display: none;
    }
    .weui-search-bar.weui-search-bar__focusing .weui-search-bar__cancel-btn {
        display: inline-block;
    }
    .weui-search-bar__label {
        transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);
    }
</style>