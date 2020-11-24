import crudModule from '~/store/modules/crud.js';
import findings from '~/store/modules/findings.js';

export default {
    namespaced: true,
    mutations: {
        UPDATE_SCOPE(state, value) {
            state.scope = value;
        }
    },
    state: {
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