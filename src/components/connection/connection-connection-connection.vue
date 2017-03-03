<template>
    <div v-cloak>
        <!--搜索-->
        <div class="weui-search-bar" :class="{'weui-search-bar__focusing': enterSearch}">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input v-model="search" type="search" class="weui-search-bar__input" placeholder="搜索"/>
                    <!--如果form里只有一个input标签，就会。。。-->
                    <input type='text' style='display:none'/>
                    <a class="weui-icon-clear" @click="clearSearch"></a>
                </div>
                <label class="weui-search-bar__label" @click="enterSearchFn">
                    <i class="weui-icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a class="weui-search-bar__cancel-btn search-text" @click="cancelSearchPage">返回</a>
        </div>
        <!--通讯录-->
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" infinite-scroll-immediate-check="false" style="margin-bottom: 92px">
            <template v-for="(items, key) in peopleList.data" >
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
                <span class="weui-loadmore__tips" style="background: transparent;font-size: 12px;letter-spacing: 0.08em">{{ peopleList.totalRows }}位联系人</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { connectionSearchUrl as searchUrl } from '../../js/api-config';
    import * as tools from '../../js/tools';
    import Vue from 'vue';
    import axios from 'axios';
    import infiniteScroll from 'vue-infinite-scroll';
    Vue.use(infiniteScroll);

    // 启动fastclick
    if ('addEventListener' in document && FastClick) {
        document.addEventListener('DOMContentLoaded', function(){
            FastClick.attach(document.body);
        }, false);
    }
    // 搜索函数 防抖动
    let _onSearch = tools._debounce(function (self, callback) {
        let page = (parseInt(self.peopleList.page) + 1) + '';
        let search = self.search;
        console.log('page333', page, 'search', search);
        axios.post(searchUrl, {
            page: encrypt(page),
            search: encrypt(search)
        }).then(function (res) {
            if (callback) callback();
            if (res.data.status === 1) {
                tools.mergePeopleData(self.peopleList, res.data);
                self.$forceUpdate();
            }
        }).catch(function (err) {
            if (callback) callback();
        })
    }, 600);

    let getInitialState = () => {
        return {
            data: {},
            page: 0,
            totalRows: 0,
            listRows: 10,
            status: 0
        }
    };

    export default {
        data() {
            return {
                search: '',
                enterSearch: false,
                peopleList: {
                    data: {},
                    page: 0,
                    totalRows: 0,
                    listRows: 10,
                    status: 0
                },
                busy: false,
            }
        },
        created() {
            console.log('是不是每次都弄好');
            this.fetchData();
        },
        computed: {
            totalPage() {
                if (this.peopleList.status === 0) return 1;
                return Math.ceil(this.peopleList.totalRows / this.peopleList.listRows);
            }
        },
        watch: {
            search(val, oldVal) {
                this.peopleList = getInitialState();
                this.onSearch();
            }
        },
        methods: {
            onSearch(callback) {
                _onSearch(this, callback);
            },
            cancelSearchPage() {
                this.enterSearch = false;
                this.search = '';
                history.back();
            },
            clearSearch() {
                this.enterSearch = false;
            },
            enterSearchFn() {
                this.enterSearch = true;
            },
            loadMore() {
                this.busy = true;
                let self = this;
                console.log('trigger');
                this._fetchData(function () {
                    self.busy = false;
                });
            },
            _fetchData(callback) {
                let { page } = this.peopleList;
                let { totalPage } = this;
                if (parseInt(page) < parseInt(totalPage)) {
                    this.fetchData(callback);
                } else {
                    if (callback) callback();
                }
            },
            fetchData(callback){
                let self = this;

                _onSearch(self, callback);
            }
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