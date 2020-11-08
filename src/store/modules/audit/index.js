import Vue from 'vue';

export default {
    namespaced: true,
    mutations: {
        CANCEL_OPEN_ITEM(state) {
            Vue.delete(
                state.team, 
                state.team.findIndex(user => user.edit)
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
                id: null,
                initials: null,
                listId,
                name: null,
                selected: false
            });
        },
        SAVE_ITEM(state, { id, name, initials }) {
            const { listId } = state.team.find(user => user.edit);
            Vue.set(
                state.team,
                state.team.findIndex(user => user.edit),
                {
                    id,
                    name,
                    initials,
                    listId,
                    selected: false,
                    edit: false
                }
            );
        },
        SET_ID(state, value) {
            state.id = value;
        },
        UPDATE_TEAM(state, value) {
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