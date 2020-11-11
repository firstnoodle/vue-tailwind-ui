import Vue from 'vue';

export default {
    namespaced: true,
    getters: {
        teamUserUnsaved: () => user => {
            return user.id === -1; 
        },
    },
    actions: {
        teamCancelEditUser({commit}, item) {
            if(item.id === -1) {
                commit('TEAM_DELETE_USER', item.id);
            } else if(item.edit) {
                commit('TEAM_CANCEL_EDIT_USER', item.id);
            }
        },
        teamCancelEditUsers({state, dispatch}) {
            for(const item of state.team) {
                dispatch('teamCancelEditUser', item);
            }
        }
    },
    mutations: {
        TEAM_CANCEL_EDIT_USER(state, id) {
            Vue.set(
                state.team.find(user => user.id === id),
                'edit',
                false
            );
        },
        TEAM_ADD_USER(state) {
            state.team.push({
                edit: true,
                id: -1,
                initials: null,
                role: null,
                listId: Date.now(),
                name: null,
                selected: false
            });
        },
        TEAM_DELETE_USER(state, id) {
            Vue.delete(
                state.team, 
                state.team.findIndex(user => user.id === id)
            );
        },
        TEAM_SAVE_USER(state, { id, name, initials, role }) {
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
        TEAM_UPDATE_ORDER(state, value) {
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