// import Vue from 'vue';
import crud from './crud';

export default {
    namespaced: true,
    actions: {
        ...crud.actions,
    },
    getters: {
        ...crud.getters,
        getTest: state => {
            return state.items;
        }
    },
    mutations: {
        ...crud.mutations,
        ADD_USER_ACTIVITY(state, {user, activity}) {
            state.items[user].data.activities.push(activity);
        }
    },
    state: {
        ...crud.state(),
    }
};