import OrderGoodsListWaitFahuo from 'components/order/order-goods-list-wait-fahuo.vue';
import OrderGoodsListWaitShouhuo from 'components/order/order-goods-list-wait-shouhuo.vue';
import OrderGoodsListHaveShouhuo from 'components/order/order-goods-list-have-shouhuo.vue';
import OrderGoodsLogistics from 'components/order/order-goods-logistics.vue';
import '../lib/layer.js';
import '../lib/layer.css';

const routes = [
    {path: '/order', component: OrderGoodsListWaitFahuo},
    { path: '/order/waitShouhuo', component: OrderGoodsListWaitShouhuo},
    { path: '/order/haveShouhuo', component: OrderGoodsListHaveShouhuo},
    { path: '/order/Logistics', component: OrderGoodsLogistics},
    {path: '*', component: OrderGoodsListWaitFahuo},
]

const router = new VueRouter({
    routes,
})

const app = new Vue({
    data: {
        data:[
            {
                name:'待发货',
                tabText: "/",
                iscur:true,
            },
            {
                name:'待收货',
                tabText: "/order/waitShouhuo",
                iscur:false,
            },
            {
                name:'已收货',
                tabText: "/order/haveShouhuo",
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

