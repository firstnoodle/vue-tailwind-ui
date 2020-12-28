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
        cancelEditInformationRequest({commit}, {criteria, period, informationRequest}) {
            if(!informationRequest.id) {
                commit('DELETE_INFORMATION_REQUEST', {criteria, period, informationRequest});
            } else if(informationRequest.uiState.edit) {
                commit('CANCEL_EDIT_INFORMATION_REQUEST', informationRequest);
            }
        },
    },
    getters: {
        /**
         * Check if user has activities on the given date that are being edited
         * This is to hide the addActivity button for a user on a given date
         */
        showCriteriaAddPeriodButton: () => criteria => {
            if(criteria.uiState.edit) return false;

            for(const p of criteria.data.periods) {
                if(p.uiState.edit === true) {
                    return false;
                }
            }
            return true;
        },
        showCriteriaPeriodAddInformationRequestButton: () => (criteria, period) => {
            if(period.uiState.edit) return false;

            for(const p of criteria.data.periods) {
                if(p.id === period.id) {
                    for(const ir of p.data.informationRequests) {
                        if(ir.uiState.edit) return false;
                    }
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
                    informationRequests: []
                },
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            })
        },
        ADD_INFORMATION_REQUEST(state, { criteria, period }) {
            const criteriaIndex = state.criterias.findIndex(c => c.id === criteria.id);
            const periodIndex = state.criterias[criteriaIndex].data.periods.findIndex(p => p.id === period.id);
            state.criterias[criteriaIndex].data.periods[periodIndex].data.informationRequests.push({
                id: null,
                data: {
                    description: null,
                    id: null
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
        CANCEL_EDIT_INFORMATION_REQUEST(state, informationRequest) {
            setNestedProp(
                informationRequest,
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
        DELETE_INFORMATION_REQUEST(state, {criteria, period, informationRequest}) {
            const criteriaIndex = state.criterias.findIndex(c => c.id === criteria.id);
            const periodIndex = state.criterias[criteriaIndex].data.periods.findIndex(p => p.id === period.id);
            Vue.delete(
                state.criterias[criteriaIndex].data.periods[periodIndex].data.informationRequests,
                state.criterias[criteriaIndex].data.periods[periodIndex].data.informationRequests.findIndex(ir => ir.id === informationRequest.id)
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
                        informationRequests: target.data.informationRequests
                    },
                    uiState: {
                        edit: false,
                        listId: target.uiState.listId,
                        selected: false
                    }
                }
            )
        },
        SAVE_INFORMATION_REQUEST(state, {criteria, period, informationRequest}) {
            const criteriaIndex = state.criterias.findIndex(c => c.id === criteria.id);
            const periodIndex = state.criterias[criteriaIndex].data.periods.findIndex(p => p.id === period.id);
            const target = state.criterias[criteriaIndex].data.periods[periodIndex].data.informationRequests.find(ir => ir.uiState.edit);
            Vue.set(
                state.criterias[criteriaIndex].data.periods[periodIndex].data.informationRequests,
                state.criterias[criteriaIndex].data.periods[periodIndex].data.informationRequests.findIndex(ir => ir.uiState.edit),
                {
                    id: Date.now(),
                    data: {
                        description: informationRequest.description,
                        id: informationRequest.id
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
        //                 informationRequests: [
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