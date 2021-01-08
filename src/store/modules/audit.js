import crudModule from '~/store/modules/crud.js';
import distribution from '~/store/modules/distribution.js';
import findings from '~/store/modules/findings.js';
import informationRequests from '~/store/modules/informationRequests.js';
import team from '~/store/modules/team.js';

export default {
    namespaced: true,
    actions: {
        cancelEditAnnounced({state, commit}) {
            if(state.announced.data.name) {
                commit('CANCEL_EDIT_ANNOUNCED');
            } else {
                commit('DELETE_ANNOUNCED');
            }
        },
        cancelEditMethod({state, commit}) {
            if(state.method.data.name) {
                commit('CANCEL_EDIT_METHOD');
            } else {
                commit('DELETE_METHOD');
            }
        },
        cancelEditNovoglowId({state, commit}) {
            if(state.novoglowId.data.id) {
                commit('CANCEL_EDIT_NOVOGLOW_ID');
            } else {
                commit('DELETE_NOVOGLOW_ID');
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
    getters: {
        novoglowId: (state) => {
            return state.novoglowId 
                ? state.novoglowId.data.id || 'none'
                : 'none';
        }
    },
    mutations: {
        ADD_ANNOUNCED(state) {
            state.announced = {
                data: { value: null },
                uiState: {
                    edit: true,
                    listId: null,
                    selected: false
                }
            }
        },
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
        ADD_NOVOGLOW_ID(state) {
            state.novoglowId = {
                data: { id: null },
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
        CANCEL_EDIT_ANNOUNCED(state) {
            state.announced.uiState.edit = false;
        },
        CANCEL_EDIT_METHOD(state) {
            state.method.uiState.edit = false;
        },
        CANCEL_EDIT_NOVOGLOW_ID(state) {
            state.novoglowId.uiState.edit = false;
        },
        CANCEL_EDIT_TYPE(state) {
            state.type.uiState.edit = false;
        },
        DELETE_ANNOUNCED(state) {
            state.announced = null;
        },
        DELETE_METHOD(state) {
            state.method = null;
        },
        DELETE_NOVOGLOW_ID(state) {
            state.novoglowId = null;
        },
        DELETE_TYPE(state) {
            state.type = null;
        },
        SAVE_ANNOUNCED(state, value) {
            console.log('save announced');
            state.announced = {
                data: {
                    value
                }, 
                uiState: {
                    edit: false,
                    listId: null,
                    selected: false
                }
            }
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
        SAVE_NOVOGLOW_ID(state, id) {
            state.novoglowId = {
                data: {
                    id
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
        scope: '<p>The audit covers the <strong>Quality Management System</strong> and ISO/GMP processes applicable for:</p><p><ul><li>Dept. name, dept. no</li></ul></p>',
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