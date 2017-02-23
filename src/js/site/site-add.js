import SiteAdd from 'components/site/site-add.vue';
import '../lib/layer.js';
import '../lib/layer.css';

import Vuerify from 'vuerify'
import VuerifyDirective from 'v-vuerify-next' // Vue2.0
Vue.use(Vuerify)
Vue.use(VuerifyDirective)
var V = new Vue({
	el: '#container',
	components: {
		SiteAdd
	},
});
