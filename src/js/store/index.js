import storeIndex from 'components/store/store-index.vue';
import storeOrder from 'components/store/store-order.vue';
import storeOrderDetails from 'components/store/store-order-details.vue';

import '../lib/layer.js';
import '../lib/layer.css';
import "../lib/swiper-3.3.0.min";
import "../lib/swiper-3.3.0.min.css";

const routes = [
    {path: '/store', component: storeIndex},
    { path: '/store/storeOrder', component: storeOrder},
    { path: '/store/storeOrderDetails', component: storeOrderDetails},
    {path: '*', component: storeIndex},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    mounted: function() {
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
        });
    },
    router,
    watch: {
        '$route' (to, from) {
            console.log(to)
        }
    },
}).$mount('#container')

