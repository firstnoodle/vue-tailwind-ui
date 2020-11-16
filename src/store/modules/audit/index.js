import listModule from '~/store/modules/list/index';

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
        focusAreas: listModule, 
        requirements: listModule, 
        suggestions: listModule, 
        team: listModule 
    }
}