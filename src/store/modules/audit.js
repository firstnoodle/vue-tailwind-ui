import crudModule from '~/store/modules/crud.js';
import distribution from '~/store/modules/distribution.js';
import findings from '~/store/modules/findings.js';
import informationRequests from '~/store/modules/informationRequests.js';
import team from '~/store/modules/team.js';

export default {
    namespaced: true,
    actions: {
        cancelEditMethod({state, commit}) {
            if(state.method.data.name) {
                commit('CANCEL_EDIT_METHOD');
            } else {
                commit('DELETE_METHOD');
            }
        },
        cancelEditType({state, commit}) {
            if(state.type.data.name) {
                commit('CANCEL_EDIT_TYPE');
            } else {
                commit('DELETE_TYPE');
            }
        },
    },
    mutations: {
        ADD_METHOD(state) {
            state.method = {
                data: { name: null },
                uiState: {
                    edit: true,
                    listId: null,
                    selected: false
                }
            }
        },
        ADD_TYPE(state) {
            state.type = {
                data: { name: null },
                uiState: {
                    edit: true,
                    listId: null,
                    selected: false
                }
            }
        },
        CANCEL_EDIT_METHOD(state) {
            state.method.uiState.edit = false;
        },
        CANCEL_EDIT_TYPE(state) {
            state.type.uiState.edit = false;
        },
        DELETE_METHOD(state) {
            state.method = null;
        },
        DELETE_TYPE(state) {
            state.type = null;
        },
        SAVE_METHOD(state, method) {
            state.method = {
                data: {
                    name: method
                }, 
                uiState: {
                    edit: false,
                    listId: null,
                    selected: false
                }
            }
        }, 
        SAVE_TYPE(state, type) {
            state.type = {
                data: {
                    name: type
                }, 
                uiState: {
                    edit: false,
                    listId: null,
                    selected: false
                }
            }
        }, 
        SET_ID(state, id) {
            state.id = id;
        },
        UPDATE_CONCLUSION(state, value) {
            state.conclusion = value;
        },
        UPDATE_RATING(state, value) {
            state.rating = value;
        },
        UPDATE_SCOPE(state, value) {
            state.scope = value;
        }
    },
    state: () => ({
        announced: null,
        conclusion: '',
        domain: null,
        id: null,
        method: null,
        novoglowId: null,
        rating: null,
        scope: '<p>The audit covers the Quality Management System and ISO/GMP processes applicable for:</p><p><ul><li>Dept. name, dept. no</li></ul></p>',
        type: null,
    }),
    modules: { 
        distribution,
        findings,
        focusAreas: crudModule, 
        informationRequests,
        requirements: crudModule, 
        suggestions: crudModule, 
        team
    }
}