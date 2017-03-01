import OrderGoodsListNotPayment from 'components/order/order-goods-list-not-payment.vue';
import OrderGoodsListYetPayment from 'components/order/order-goods-list-yet-payment.vue';
import OrderGoodsListAll from 'components/order/order-goods-list-all.vue';
import OrderGoodsLogistics from 'components/order/order-goods-logistics.vue';

import '../lib/layer.js';
import '../lib/layer.css';

document.addEventListener('DOMContentLoaded', function(){
    FastClick.attach(document.body);
}, false);

const routes = [
    {path: '/order', component: OrderGoodsListAll},
    { path: '/order/notPayment', component: OrderGoodsListNotPayment},
    { path: '/order/yetPayment', component: OrderGoodsListYetPayment},
    { path: '/order/Logistics', component: OrderGoodsLogistics},
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
            console.log(to)
        }
    },
}).$mount('#container')

