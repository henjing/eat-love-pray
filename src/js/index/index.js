import indexDetails from 'components/index/index-details.vue';
import indexOrder from 'components/index/index-order.vue';
import indexOrderDetails from 'components/index/index-order-details.vue';
import indexHome from 'components/index/index-home.vue';

import AddressList from '../../components/address/address-list.vue';
import AddressAdd from '../../components/address/address-add.vue';
import AddressAlter from '../../components/address/address-alter.vue';
import AddressSelect from '../../components/address/address-select.vue';
import '../lib/layer.js';
import '../lib/layer.css';

// 根据需求修改node_modules/vuerify.common.js
import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify-next' // Vue2.0
Vue.use(Vuerify)
Vue.use(VuerifyDirective)


const routes = [
    {path: '/index', component: indexHome},
    { path: '/index/indexOrder', component: indexOrder},
    { path: '/index/indexOrderDetails', component: indexOrderDetails},
    { path: '/index/indexDetails', component: indexDetails},

    {path: '/address', component: AddressList},
    { path: '/address/addressAdd', component: AddressAdd},
    { path: '/address/addressAlter', component: AddressAlter},
    { path: '/address/addressSelect', component: AddressSelect},
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

