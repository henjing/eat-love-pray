import walletIndex from 'components/wallet/wallet-index.vue';
import walletAddBank from 'components/wallet/wallet-add-bank.vue';
import walletWithdraw from 'components/wallet/wallet-withdraw.vue';
import BankCards from '../../components/mine/mine-cashier-bankCards.vue';
import RecordList from '../../components/wallet/wallet-record-list.vue';
import '../lib/layer.js';
import '../lib/layer.css';

const routes = [
    {path: '/wallet', component: walletIndex},
    { path: '/wallet/addBank', component: walletAddBank},
    { path: '/wallet/walletWithdraw', component: walletWithdraw},
    { path: '/wallet/BankCards', component: BankCards},
    { path: '/wallet/recordList', component: RecordList},
    {path: '*', component: walletIndex},
];

const router = new VueRouter({
    routes,
});

const app = new Vue({
    router,
    watch: {
        '$route' (to, from) {
        }
    },
}).$mount('#container');

