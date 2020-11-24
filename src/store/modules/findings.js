import crud from './crud.js';

export default {
    namespaced: true,
    actions: {
        ...crud.actions,
    },
    getters: {
        ...crud.getters,
    },
    state: {
        ...crud.state,
    },
    mutations: {
        ...crud.mutations,
    }
}