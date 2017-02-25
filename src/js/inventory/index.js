import inventoryIndex from 'components/inventory/inventory-index.vue';
import inventoryOrder from 'components/inventory/inventory-order.vue';
import inventoryOrderDetails from 'components/inventory/inventory-order-details.vue';

import '../lib/layer.js';
import '../lib/layer.css';

const routes = [
    {path: '/inventory', component: inventoryIndex},
    { path: '/inventory/inventoryOrder', component: inventoryOrder},
    { path: '/inventory/inventoryOrderDetails', component: inventoryOrderDetails},
    {path: '*', component: inventoryIndex},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    router,
    watch: {
        '$route' (to, from) {
        }
    },
}).$mount('#container')

