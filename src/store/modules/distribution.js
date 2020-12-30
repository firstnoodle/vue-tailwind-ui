import Vue from 'vue';

export default {
    namespaced: true,
    actions: {

    },
    getters: {

    },
    mutations: {
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
        DELETE_RECIPIENT(state, {target, recipient}) {
            if(target in state) {
                Vue.delete(
                    state[target].recipients,
                    state[target].recipients.findIndex(r => r.id === recipient.id)
                );
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