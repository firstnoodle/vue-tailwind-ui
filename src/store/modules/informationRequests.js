import Vue from 'vue';
import { setNestedProp } from '~/utils/vue';

export default {
    namespaced: true,
    actions: {
        addCriteriaPeriod() {},
        addPeriodInformationRequest() {},
        cancelEditCriteria({commit}, criteria) {
            if(!criteria.id) {
                commit('DELETE_CRITERIA', criteria);
            } else if(criteria.uiState.edit) {
                commit('CANCEL_EDIT_CRITERIA', criteria);
            }
        },
    },
    getters: {
    },
    mutations: {
        ADD_CRITERIA(state) {
            state.criterias.push({
                id: null,
                data: {
                    criteria: null,
                    date: null,
                    periods: []
                },
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            })
        },
        CANCEL_EDIT_CRITERIA(state, criteria) {
            setNestedProp(
                criteria,
                'uiState.edit', 
                false
            );
        },
        DELETE_CRITERIA(state, criteria) {
            Vue.delete(
                state.criterias,
                state.criterias.findIndex(c => c.id === criteria.id)
            );
        },
        SAVE_CRITERIA(state, criteria) {
            const target = state.criterias.find(c => c.uiState.edit);
            Vue.set(
                state.criterias,
                state.criterias.findIndex(c => c.uiState.edit),
                {
                    id: Date.now(),
                    data: {
                        criteria: criteria.description,
                        date: criteria.date,
                        periods: []
                    },
                    uiState: {
                        edit: false,
                        listId: target.uiState.listId,
                        selected: false
                    }
                }
            )
        }
    },
    state: () => ({
        criterias: []
        //     {
        //         criteria: {},
        //         date: '',
        //         periods: [
        //             {
        //                 start_date: '',
        //                 end_date: '',
        //                 informmation_requests: [
        //                     {
        //                         id: 1,
        //                         description: ''
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ]
    }),
};