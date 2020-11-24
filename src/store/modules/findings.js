import crud from './crud.js';

export default {
    namespaced: true,
    actions: {
        ...crud.actions,
    },
    getters: {
        ...crud.getters,
        emptyFinding: () => {
            return {
                department: null,
                description: '',
                focusArea: null,
                keyword: null,
                references: [],
                severity: null,
                title: '',
                trendCategory: null,
            }
        }
    },
    state: {
        ...crud.state(),
    },
    mutations: {
        ...crud.mutations,
    }
}