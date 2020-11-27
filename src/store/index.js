import Vue from 'vue';
import Vuex from 'vuex';

// for demo purposes only
import database from './modules/database.js';
import audits from './modules/audits.js';

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
        },
        toggleTheme({state, commit}) {

            const body = document.querySelector('body');
            if(state.theme === 'theme-light') {
                body.classList.remove('theme-light');
                body.classList.add('theme-dark');
                commit('SET_THEME', 'theme-dark');
            } 
            else if(state.theme === 'theme-dark') {
                body.classList.remove('theme-dark');
                body.classList.add('theme-light');
                commit('SET_THEME', 'theme-light');
            }
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
        },
        SET_THEME(state, value) {
            state.theme = value;
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
        theme: 'theme-dark', // initial theme will be the opposite - see toggleTheme action
    },
    modules: { audits, database },
});