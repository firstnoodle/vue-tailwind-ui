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
        cancelEditCriteriaPeriod({commit}, {criteria, period}) {
            if(!period.id) {
                commit('DELETE_CRITERIA_PERIOD', {criteria, period});
            } else if(period.uiState.edit) {
                commit('CANCEL_EDIT_CRITERIA_PERIOD', period);
            }
        },
    },
    getters: {
        /**
         * Check if user has activities on the given date that are being edited
         * This is to hide the addActivity button for a user on a given date
         */
        showCriteriaPeriodButton: () => (criteria, period) => {
            for(const p of criteria.data.periods) {
                if(p.data.start_date === period.data.start_date && 
                    p.data.end_date === period.data.end_date && 
                    p.uiState.edit === true) {
                    return false;
                }
            }
            return true;
        }
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
        ADD_CRITERIA_PERIOD(state, criteria) {
            const index = state.criterias.findIndex(c => c.id === criteria.id);
            state.criterias[index].data.periods.push({
                id: null,
                data: {
                    start_date: null,
                    end_date: null,
                    informmation_requests: []
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
        CANCEL_EDIT_CRITERIA_PERIOD(state, period) {
            setNestedProp(
                period,
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
        DELETE_CRITERIA_PERIOD(state, {criteria, period}) {
            const criteriaIndex = state.criterias.findIndex(c => c.id === criteria.id);
            Vue.delete(
                state.criterias[criteriaIndex].data.periods,
                state.criterias[criteriaIndex].data.periods.findIndex(p => p.id === period.id)
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
                        periods: target.data.periods
                    },
                    uiState: {
                        edit: false,
                        listId: target.uiState.listId,
                        selected: false
                    }
                }
            )
        },
        SAVE_CRITERIA_PERIOD(state, {criteria, period}) {
            const criteriaIndex = state.criterias.findIndex(c => c.id === criteria.id);
            const target = state.criterias[criteriaIndex].data.periods.find(p => p.uiState.edit);
            Vue.set(
                state.criterias[criteriaIndex].data.periods,
                state.criterias[criteriaIndex].data.periods.findIndex(p => p.uiState.edit),
                {
                    id: Date.now(),
                    data: {
                        start_date: period.start_date,
                        end_date: period.end_date,
                        informmation_requests: []
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