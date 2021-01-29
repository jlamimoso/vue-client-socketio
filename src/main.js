import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.0.141:3000'; //'http://192.168.0.141:3000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 4500;

const URI = 'https://node-server-socketio.herokuapp.com';
//const URI = 'http://192.168.0.141:3000';

const socket = io(URI, {
    withCredentials: true,
    auth: { user: store.getters.getUser, passw: '' },
    autoConnect: false
    //transports: ['websocket']
});
Vue.use(VueSocketIOExt, socket, { store });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
