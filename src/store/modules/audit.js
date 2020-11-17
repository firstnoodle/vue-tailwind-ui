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
        scope: '<p>This is the default scope. It consists of three items:</p><p><ol><li>First item</li><li>Second item</li><li>Third item</li></ol></p><p>And that is it!</p>',
    },
    modules: { 
        findings,
        focusAreas: crudModule, 
        requirements: crudModule, 
        suggestions: crudModule, 
        team: crudModule 
    }
}