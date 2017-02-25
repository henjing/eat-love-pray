import indexDetails from 'components/index/index-details.vue';
import indexOrder from 'components/index/index-order.vue';
import indexOrderDetails from 'components/index/index-order-details.vue';
import indexHome from 'components/index/index-home.vue';

import '../lib/layer.js';
import '../lib/layer.css';


const routes = [
    {path: '/index', component: indexHome},
    { path: '/index/indexOrder', component: indexOrder},
    { path: '/index/indexOrderDetails', component: indexOrderDetails},
    { path: '/index/indexDetails', component: indexDetails},
    {path: '*', component: indexHome},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    router,
    watch: {
        '$route' (to, from) {
            console.log(to)
        }
    },
}).$mount('#container')

