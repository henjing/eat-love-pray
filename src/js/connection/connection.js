import Vue from 'vue';
import Connection from '../../components/connection/connection-connection-connection.vue';

window.app = new Vue({
    el: '#container',
    render: h => h(Connection)
    //render:function(h){
    //    return h(Connection)
    //}
});