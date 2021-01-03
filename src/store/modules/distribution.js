import Vue from 'vue';

export default {
    namespaced: true,
    actions: {
        cancelEditDate({state, commit}, target) {
            if(target in state) {
                if(!state[target].date.id) {
                    commit('DELETE_DATE', target);
                } else {
                    commit('CANCEL_EDIT_DATE', target);
                }
            }
        },
        cancelEditRecipient({state, commit}, { target, recipient }) {
            if(target in state) {
                if(recipient.id) {
                    commit('CANCEL_EDIT_RECIPIENT', recipient);
                } else {
                    commit('DELETE_RECIPIENT', {target, recipient});
                }
            }
        },
    },
    getters: {},
    mutations: {
        ADD_DATE(state, target) {
            if(target in state) {
                state[target].date = {
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
            }
        },
        ADD_RECIPIENT(state, target) {
            if(target in state) {
                state[target].recipients.push({
                    id: null,
                    data: {
                        cc: false,
                        initials: null,
                        name: null
                    },
                    uiState: {
                        edit: true,
                        listId: Date.now(),
                        selected: false
                    }
                })
            }
        },
        CANCEL_EDIT_DATE(state, target) {
            if(target in state) {
                state[target].date.uiState.edit = false;
            }
        },
        CANCEL_EDIT_RECIPIENT(state, recipient) {
            recipient.uiState.edit = false;
        },
        DELETE_DATE(state, target) {
            if(target in state) {
                state[target].date = null;
            }
        },
        DELETE_RECIPIENT(state, {target, recipient}) {
            if(target in state) {
                Vue.delete(
                    state[target].recipients,
                    state[target].recipients.findIndex(r => r.id === recipient.id)
                );
            }
        },
        EDIT_DATE(state, target) {
            if(target in state) {
                state[target].date.uiState.edit = true;
            }
        },
        SAVE_DATE(state, {target, date}) {
            if(target in state) {
                state[target].date = {
                    id: state[target].date.id || Date.now(),
                    data: { date },
                    uiState: {
                        edit: false,
                        listId: state[target].date.uiState.listId,
                        selected: false
                    }
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
        UPDATE_RECIPIENTS(state, {target, recipients}) {
            if(target in state) {
                state[target].recipients = recipients;
            }
        }
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