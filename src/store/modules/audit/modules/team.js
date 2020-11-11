import Vue from 'vue';

export default {
    namespaced: true,
    getters: {
        userUnsaved: () => user => {
            return user.id === -1; 
        },
    },
    actions: {
        cancelEditUser({commit}, item) {
            if(item.id === -1) {
                commit('DELETE_USER', item.id);
            } else if(item.edit) {
                commit('CANCEL_EDIT_USER', item.id);
            }
        },
        cancelEditUsers({state, dispatch}) {
            for(const item of state.users) {
                dispatch('cancelEditUser', item);
            }
        }
    },
    mutations: {
        CANCEL_EDIT_USER(state, id) {
            Vue.set(
                state.users.find(user => user.id === id),
                'edit',
                false
            );
        },
        ADD_USER(state) {
            state.users.push({
                edit: true,
                id: -1,
                initials: null,
                role: null,
                listId: Date.now(),
                name: null,
                selected: false
            });
        },
        DELETE_USER(state, id) {
            Vue.delete(
                state.users, 
                state.users.findIndex(user => user.id === id)
            );
        },
        SAVE_USER(state, { id, name, initials, role }) {
            const { listId } = state.users.find(user => user.edit);
            Vue.set(
                state.users,
                state.users.findIndex(user => user.edit),
                {
                    id,
                    name,
                    initials,
                    role,
                    listId,
                    selected: false,
                    edit: false
                }
            );
        },
        UPDATE_ORDER(state, value) {
            state.users = value;
        }
    },
    state: {
        users: []
    }
}