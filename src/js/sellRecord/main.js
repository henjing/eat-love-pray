
import record from '../../components/sellRecord/record.vue';
import recordDetail from '../../components/sellRecord/record-detail.vue';
import '../../js/lib/layer.js';
import '../../js/lib/layer.css';
//import '../mock/test.js';

var routes = [
	{ path: '/', component: record, meta: {keepAlive: true} },
	{ path: '/recordDetail', component: recordDetail, meta: {keepAlive: false}},
];
const router = new VueRouter({
//	mode: 'history',
  	routes
});

const app = new Vue({
  	router,
  	watch: {
        '$route' (to, from) {
            console.log(to,from)
        }
    },

}).$mount('#sellRecord-app')

 