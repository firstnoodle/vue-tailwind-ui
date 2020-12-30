import Vue from 'vue';

export default {
    namespaced: true,
    actions: {
        cancelEditPlanDate({state, commit}) {
            if(!state.plan.date.id) {
                commit('DELETE_PLAN_DATE');
            } else {
                commit('CANCEL_EDIT_PLAN_DATE');
            }
        },
        cancelEditReportDate({state, commit}) {
            if(!state.report.date.id) {
                commit('DELETE_REPORT_DATE');
            } else {
                commit('CANCEL_EDIT_REPORT_DATE');
            }
        }
    },
    getters: {},
    mutations: {
        ADD_PLAN_DATE(state) {
            state.plan.date = {
                id: null,
                data: {
                    date: null
                },
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            };
        },
        ADD_REPORT_DATE(state) {
            state.report.date = {
                id: null,
                data: {
                    date: null
                },
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            };
        },
        ADD_RECIPIENT(state, target) {
            if(target in state) {
                state[target].recipients.push({
                    id: null,
                    data: {
                        initials: null,
                    },
                    uiState: {
                        edit: true,
                        listId: Date.now(),
                        selected: false
                    }
                })
            }
        },
        CANCEL_EDIT_PLAN_DATE(state) {
            state.plan.date.uiState.edit = false;
        },
        CANCEL_EDIT_REPORT_DATE(state) {
            state.report.date.uiState.edit = false;
        },
        DELETE_PLAN_DATE(state) {
            state.plan.date = null;
        },
        DELETE_REPORT_DATE(state) {
            state.report.date = null;
        },
        DELETE_RECIPIENT(state, {target, recipient}) {
            if(target in state) {
                Vue.delete(
                    state[target].recipients,
                    state[target].recipients.findIndex(r => r.id === recipient.id)
                );
            }
        },
        EDIT_PLAN_DATE(state) {
            state.plan.date.uiState.edit = true;
        },
        EDIT_REPORT_DATE(state) {
            state.report.date.uiState.edit = true;
        },
        SAVE_PLAN_DATE(state, date) {
            state.plan.date = {
                id: state.plan.date.id || Date.now(),
                data: { date },
                uiState: {
                    edit: false,
                    listId: state.plan.date.uiState.listId,
                    selected: false
                }
            }
        },
        SAVE_REPORT_DATE(state, date) {
            state.report.date = {
                id: state.report.date.id || Date.now(),
                data: { date },
                uiState: {
                    edit: false,
                    listId: state.report.date.uiState.listId,
                    selected: false
                }
            }
        },
        SAVE_RECIPIENT(state, {target, recipient}) {
            if(target in state) {
                const recipientIndex = state[target].recipients.findIndex(r => r.uiState.edit);
                Vue.set(
                    state[target].recipients[recipientIndex],
                    {
                        id: Date.now(),
                        data: {
                            initials: recipient.data.initials,
                        },
                        uiState: {
                            edit: false,
                            listId: recipient.uiState.listId,
                            selected: false
                        }
                    }
                )
            }
        },
        UPDATE_DATE(state, { target, date }) {
            if(target in state) {
                state[target].date = date;
            }
        },
    },
    state: () => ({
        plan: {
            date: null,
            recipients: []
        },
        report: {
            date: null,
            recipients: []
        },
    }),
}