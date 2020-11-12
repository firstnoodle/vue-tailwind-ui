import Vue from 'vue';

export default {
    namespaced: true,
    getters: {
        itemUnsaved: () => item => {
            return item.id === -1; 
        },
    },
    actions: {
        cancelEditItem({commit}, item) {
            if(item.id === -1) {
                commit('DELETE_ITEM', item.id);
            } else if(item.edit) {
                commit('CANCEL_EDIT_ITEM', item.id);
            }
        },
        cancelEditItems({state, dispatch}) {
            for(const item of state.items) {
                dispatch('cancelEditItem', item);
            }
        }
    },
    mutations: {
        CANCEL_EDIT_ITEM(state, id) {
            Vue.set(
                state.items.find(item => item.id === id),
                'edit',
                false
            );
        },
        ADD_ITEM(state, item) {
            if(item.id !== undefined) {
                console.warn('[ list module @ ADD_ITEM ] item should not have id');
                delete item.id;
            }
            state.items.push({
                ...item,
                edit: true,
                id: -1,
                listId: Date.now(),
                selected: false
            });
        },
        DELETE_ITEM(state, id) {
            Vue.delete(
                state.items, 
                state.items.findIndex(item => item.id === id)
            );
        },
        SAVE_ITEM(state, item) {
            const { listId } = state.items.find(item => item.edit);
            Vue.set(
                state.items,
                state.items.findIndex(item => item.edit),
                {
                    ...item,
                    edit: false,
                    listId,
                    selected: false,
                }
            );
        },
        UPDATE_ITEMS(state, value) {
            state.items = value;
        }
    },
    state: {
        items: []
    }
}