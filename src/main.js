import './css/main.scss';
import Vue from 'vue';
import App from './App.vue';
import PortalVue from 'portal-vue'

import router from '~/router/index';

Vue.use(PortalVue);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
