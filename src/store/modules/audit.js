import crudModule from '~/store/modules/crud.js';
import findings from '~/store/modules/findings.js';

export default {
    namespaced: true,
    mutations: {
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
    state: {
        conclusion: '',
        rating: null,
        scope: '<p>The audit covers the Quality Management System and ISO/GMP processes applicable for:</p><p><ul><li>Dept. name, dept. no</li></ul></p>',
    },
    modules: { 
        findings,
        focusAreas: crudModule, 
        requirements: crudModule, 
        suggestions: crudModule, 
        team: crudModule 
    }
}