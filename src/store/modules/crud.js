import Vue from 'vue';
import { setNestedProp } from '~/utils/vue';

export default {
    namespaced: true,
    getters: {
        getItemById: state => id => {
            return state.items.find(item => item.id === id);
        },
        getItemIndex: state => id => {
            return state.items.findIndex(item => item.id === id);
        },
        itemsSelectedCount: state => {
            return state.items.filter(item => item.uiState.selected).length;
        },
        itemUnsaved: () => item => {
            return !item.id; 
        },
        savedItemsCount: state => {
            return state.items.filter(item => item.id).length;
        }
    },
    actions: {
        cancelEditItem({commit}, item) {
            if(!item.id) {
                commit('DELETE_ITEM', item.id);
            } else if(item.uiState.edit) {
                commit('CANCEL_EDIT_ITEM', item.id);
            }
        },
        cancelEditItems({state, dispatch}) {
            for(const item of state.items) {
                dispatch('cancelEditItem', item);
            }
        },
        deleteSelectedItems({state, commit}) {
            commit('UPDATE_ITEMS', state.items.filter(item => !item.uiState.selected));
        },
        toggleAllItems({state, getters, commit}) {
            const selected = !getters.itemsSelectedCount;
            commit(
                'UPDATE_ITEMS',
                state.items.map(item => {
                    item.uiState.selected = selected;
                    return item;
                })
            )
        }
    },
    mutations: {
        CANCEL_EDIT_ITEM(state, id) {
            setNestedProp(
                state.items.find(item => item.id === id),
                'uiState.edit', 
                false
            );
        },
        ADD_ITEM(state, item) {
            if(item.id !== undefined) {
                console.warn('[ list module @ ADD_ITEM ] item should not have id');
                delete item.id;
            }
            state.items.push({
                data: item,
                id: null,
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            });
        },
        DELETE_ITEM(state, id) {
            Vue.delete(
                state.items, 
                state.items.findIndex(item => item.id === id)
            );
        },
        SAVE_ITEM(state, item) {
            const target = state.items.find(item => item.uiState.edit);
            Vue.set(
                state.items,
                state.items.findIndex(item => item.uiState.edit),
                {
                    data: item,
                    id: Date.now(),
                    uiState: {
                        edit: false,
                        listId: target.uiState.listId,
                        selected: false,
                    }
                }
            );
        },

        UPDATE_ITEM_ATTRIBUTE(state, {id, path, value}) {
            const item = state.items.find(item => item.id === id);
            setNestedProp(item, path, value);
        },

        UPDATE_ITEMS(state, value) {
            state.items = value;
        }
    },
    state: () => ({
        items: []
    })
}