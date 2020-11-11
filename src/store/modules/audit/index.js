import Vue from 'vue';

export default {
    namespaced: true,
    actions: {
        closeOpenItems({state, commit}) {
            for(const item of state.team) {
                if(item.id === -1) {
                    commit('DELETE_ITEM', item.id);
                } else if(item.edit) {
                    commit('CLOSE_ITEM', item.id);
                }
            }
        }
    },
    mutations: {
        CLOSE_ITEM(state, id) {
            Vue.set(
                state.team.find(user => user.id === id),
                'edit',
                false
            );
        },
        DELETE_ITEM(state, id) {
            Vue.delete(
                state.team, 
                state.team.findIndex(user => user.id === id)
            );
        },
        OPEN_ITEM(state, listId) {
            state.team.push({
                edit: true,
                id: -1,
                initials: null,
                role: null,
                listId,
                name: null,
                selected: false
            });
        },
        SAVE_ITEM(state, { id, name, initials, role }) {
            const { listId } = state.team.find(user => user.edit);
            Vue.set(
                state.team,
                state.team.findIndex(user => user.edit),
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
        UPDATE_LIST(state, value) {
            state.team = value;
        }
    },
    state: {
        agendas: [],
        announced: null,
        auditee: {

        },
        created_at: null,
        domain: null,
        findings: [],
        focus_areas: [],
        id: null,
        information_requests: [],
        method: null,
        plan: {
            date: null,
            recipients: [],
            copy: []
        },
        report: {
            date: null,
            recipients: [],
            copy: []
        },
        requirements: [],
        scope: null,
        suggestions: [],
        team: [],
        type: null,
        user: null,
    },
}

const getAgendaItemTemplate = () => {
    return {
        audit_user: null,
        description: null,
        end_time: null,
        start_time: null,
    }
}

const getFindingTemplate = () => {
    return {
        created_at: null,
        department: null,
        description: null,
        focus_area: null,
        keyword: null,
        order_no: null,
        references: [],
        severity: null,
        title: null,
        trend_category: null,
        user: null,
    }
};

const getSuggetsionsTemplate = () => {
    return {
        description: null,
        order_no: null,
    }
};