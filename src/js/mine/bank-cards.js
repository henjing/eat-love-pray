import Vue from 'vue';
import BankCards from '../../components/mine/mine-cashier-bankCards.vue';

window.app = new Vue({
    el: '#container',
    render: h => h(BankCards)
});
