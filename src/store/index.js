import Vue from 'vue';
import Vuex from 'vuex';

// for demo purposes only
import database from './modules/database';
import audits from './modules/audits/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        hideMobileMenu({ commit }) {
            commit('SET_MOBILE_MENU_VISIBLE', false);
        },
        hideSidebar({ commit }) {
            commit('SET_SIDEBAR_VISIBLE', false);
        },
        setMobile({ commit }, value) {
            commit('SET_MOBILE', value);
        },
        showMobileMenu({ commit }) {
            commit('SET_MOBILE_MENU_VISIBLE', true);
        },
        showSidebar({ commit }) {
            commit('SET_SIDEBAR_VISIBLE', true);
        },
        toggleSidebar({ commit, state }) {
            commit('SET_SIDEBAR_VISIBLE', !state.sidebarVisible);
        }
    },
    mutations: {
        SET_MOBILE(state, value) {
            state.isMobile = value;
        },
        SET_MOBILE_MENU_VISIBLE(state, value) {
            state.mobileMenuVisible = value;
        },
        SET_SIDEBAR_VISIBLE(state, value) {
            state.sidebarVisible = value;
        }
    },
    getters: {
        sidebarVisible(state) {
            return state.isMobile ? state.sidebarVisible : true;
        }
    },
    state: {
        isMobile: false,
        mobileMenuVisible: false,
        sidebarVisible: false,
        theme: 'theme-light',
    },
    modules: { audits, database },
});