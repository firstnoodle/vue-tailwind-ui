import Vue from 'vue';
import Vuex from 'vuex';

import database from './modules/database';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        theme: 'light',
    },
    modules: { database },
});