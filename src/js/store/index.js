import storeIndex from 'components/store/store-index.vue';
import storeOrder from 'components/store/store-order.vue';
import storeOrderDetails from 'components/store/store-order-details.vue';
import storeHome from 'components/store/store-home.vue';

import '../lib/layer.js';
import '../lib/layer.css';

const routes = [
    {path: '/store', component: storeHome},
    { path: '/store/storeOrder', component: storeOrder},
    { path: '/store/storeOrderDetails', component: storeOrderDetails},
    { path: '/store/storeIndex', component: storeIndex},
    {path: '*', component: storeHome},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    mounted: function() {
        
    },
    router,
    watch: {
        '$route' (to, from) {
            console.log(to)
        }
    },
}).$mount('#container')

