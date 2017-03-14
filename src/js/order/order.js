import OrderGoodsListNotPayment from 'components/order/order-goods-list-not-payment.vue';
import OrderGoodsListYetPayment from 'components/order/order-goods-list-yet-payment.vue';
import OrderGoodsListAll from 'components/order/order-goods-list-all.vue';
import OrderGoodsLogistics from 'components/order/order-goods-logistics.vue';
import StoreFooter from '../../components/common/footer.vue';
import indexHome from 'components/index/index-home.vue';
import indexOrder from 'components/index/index-order.vue';
import indexOrderDetails from 'components/index/index-order-details.vue';

// import AddressList from '../../components/address/address-list.vue';
// import AddressAdd from '../../components/address/address-add.vue';
// import AddressAlter from '../../components/address/address-alter.vue';
// import AddressSelect from '../../components/address/address-select.vue';

import '../lib/layer.js';
import '../lib/layer.css';

// 根据需求修改node_modules/vuerify.common.js
import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify-next' // Vue2.0
Vue.use(Vuerify)
Vue.use(VuerifyDirective)

document.addEventListener('DOMContentLoaded', function(){
    FastClick.attach(document.body);
}, false);

const routes = [
    { path: '/order', component: OrderGoodsListAll},
    { path: '/order/notPayment', component: OrderGoodsListNotPayment},
    { path: '/order/yetPayment', component: OrderGoodsListYetPayment},
    { path: '/order/Logistics', component: OrderGoodsLogistics},

    { path: '/index', component: indexHome},
    { path: '/index/indexOrderDetails', component: indexOrderDetails},

    // {path: '/address', component: AddressList},
    // { path: '/address/addressAdd', component: AddressAdd},
    // { path: '/address/addressAlter', component: AddressAlter},
    // { path: '/address/addressSelect', component: AddressSelect},

    {path: '*', component: OrderGoodsListAll},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    data: {
        data:[
            {
                name:'全部订单',
                tabText: "/",
                iscur:true,
            },
            {
                name:'未发货',
                tabText: "/order/notPayment",
                iscur:false,
            },
            {
                name:'已发货',
                tabText: "/order/yetPayment",
                iscur:false,
            },
        ],
    },
    components: {
        StoreFooter
    },
    methods: {
        billDetails(key){

        },
        //绑定tab的切换事件
        toggleTabs: function(index) {
            this.$router.push({path:index})
        },
    },
    router,
    watch: {
        '$route' (to, from) {

        }
    },
}).$mount('#container')

