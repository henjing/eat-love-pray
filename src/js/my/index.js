import Vue from 'vue';
import axios from 'axios';
import '../mock/test.js';
import layer from '../lib/layer.js';
import '../lib/layer.css';
import Index from 'components/my/index.vue';
import Main from 'components/my/main.vue';
import Name from 'components/my/name.vue';
import Phone01 from 'components/my/phone01.vue';
import Phone from 'components/my/phone.vue';
import Inviter from 'components/my/inviter.vue';
import Mima from 'components/my/mima.vue';
import Dlmima from 'components/my/dlmima.vue';
//import Zfmima from 'components/my/zfmima.vue';
//import Zfmima01 from 'components/my/zfmima01.vue';
import Zfmima02 from 'components/my/zfmima02.vue';
//import Zfmima03 from 'components/my/zfmima03.vue';
//import Zfmima04 from 'components/my/zfmima04.vue';
import Connection from 'components/connection/connection-connection-connection.vue';
import { countdown } from '../tools.js';

const routes = [
    { path: '/', component: Index},
    { path: '/main', component: Main},
    { path: '/name', component: Name},
    { path: '/phone', component: Phone},
    { path: '/inviter', component: Inviter},
    { path: '/phone01', component: Phone01},
    { path: '/mima', component: Mima},
    { path: '/dlmima', component: Dlmima},
    //{ path: '/zfmima', component: Zfmima},
    //{ path: '/zfmima01', component: Zfmima01},
    { path: '/zfmima02', component: Zfmima02},
    //{ path: '/zfmima03', component: Zfmima03},
    //{ path: '/zfmima04', component: Zfmima04},
    { path: '/connection', component: Connection}

];

const router = new VueRouter({
     //ES6缩写语法，相当于routes:routes
    routes

});
// 最后创建vue实例并挂载
const app = new Vue({
    router
}).$mount('#container');