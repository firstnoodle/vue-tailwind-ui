import Vue from 'vue';
import crud from './crud.js';
import { setNestedProp } from '~/utils/vue';
import { SEVERITY_LEVELS } from '~/constants';

export default {
    namespaced: true,
    actions: {
        ...crud.actions,
        /**
         * The below actions are almost identical copies of cancelEditItem and cancelEditItems in crud.js
         * but are needed to handle the reference items in the nested references array
         */ 
        cancelEditFindingReference({state, commit}, { finding_id, reference_id }) {
            const finding = state.items.find(item => item.id === finding_id);
            const reference = finding.data.references.find(item => item.id === reference_id);

            if(!reference.id) {
                commit('DELETE_FINDING_REFERENCE', { finding, reference });
            } else if(reference.uiState.edit) {
                commit('CANCEL_EDIT_FINDING_REFERENCE', reference);
            }
        },
        cancelEditFindingReferences({state, dispatch}, finding_id) {
            const finding = state.items.find(item => item.id === finding_id);
            for(const reference of finding.data.references) {
                dispatch('cancelEditFindingReference', { finding_id: finding.id, reference_id: reference.id });
            }
        },
        deleteFinding: ({dispatch, commit}, finding_id) => {
            commit('DELETE_ITEM', finding_id);
            dispatch('updateFindingFocusAreas')
        },
        updateFindingFocusArea({state, commit, dispatch}, {finding_id, focusArea}) {
            commit('UPDATE_FINDING_FOCUS_AREA', {finding_id, focusArea});

            // create findingFocusAreaDescription?
            if(state.findingFocusAreaDescriptions[focusArea] === undefined) {
                commit('CREATE_FINDING_FOCUS_AREA_DESCRIPTION', focusArea);
            }

            dispatch('updateFindingFocusAreas');
        },
        updateFindingFocusAreas({state, commit, getters}) {
            const oldFindingFocusAreas = Object.keys(state.findingFocusAreaDescriptions);
            const currentFindingFocusAreas = Object.keys(getters.findingsByFocusArea);
            for(const item of oldFindingFocusAreas) {
                if(!currentFindingFocusAreas.includes(item)) {
                    commit('DELETE_FINDING_FOCUS_AREA_DESCRIPTION', item);
                }
            }

        }
    },
    getters: {
        ...crud.getters,
        emptyFinding: () => {
            return {
                department: null,
                description: '',
                focusArea: null,
                keyword: null,
                references: [],
                severity: null,
                title: '',
                trendCategory: null,
            }
        },
        findingsByFocusArea: state => {
            const focusAreas = {};
            state.items.forEach(finding => {
                const focusArea = finding.data.focusArea;
                if(focusArea) {
                    if(focusAreas[focusArea] === undefined) {
                        focusAreas[focusArea] = [];
                    }
                    focusAreas[focusArea].push(finding);
                }
            });
            return focusAreas;
        },
        numberOfMinorFindings: state => {
            return state.items.filter(item => item.data.severity === SEVERITY_LEVELS.MINOR).length;
        },
        numberOfMajorFindings: state => {
            return state.items.filter(item => item.data.severity === SEVERITY_LEVELS.MAJOR).length;
        },
        numberOfCriticalFindings: state => {
            return state.items.filter(item => item.data.severity === SEVERITY_LEVELS.CRITICAL).length;
        },
    },
    state: {
        ...crud.state(),
        findingFocusAreaDescriptions: {}
    },
    mutations: {
        ...crud.mutations,
        /**
         * The below mutations are almost identical copies of the mutations in crud.js
         * but are needed to handle the reference items in the nested references array
         */ 
        ADD_FINDING_REFERENCE(state, {finding_id, reference}) {
            const finding = state.items.find(item => item.id === finding_id);
            if(!finding) {
                console.error(`[ ADD_FINDING_REFERENCE ] no id passed..`);
                return;
            }
            finding.data.references.push({
                id: null,
                data: reference,
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            });
        },
        CANCEL_EDIT_FINDING_REFERENCE(state, reference) {
            setNestedProp(
                reference,
                'uiState.edit', 
                false
            );
        },
        CREATE_FINDING_FOCUS_AREA_DESCRIPTION(state, focusArea) {
            state.findingFocusAreaDescriptions[focusArea] = '';
        },
        DELETE_FINDING_FOCUS_AREA_DESCRIPTION(state, focusArea) {
            Vue.delete(state.findingFocusAreaDescriptions, focusArea);
        },
        DELETE_FINDING_REFERENCE(state, {finding, reference}) {
            Vue.delete(
                finding.data.references, 
                finding.data.references.findIndex(item => item.id === reference.id)
            );
        },
        SAVE_FINDING_REFERENCE(state, { finding_id, reference }) {
            const finding = state.items.find(item => item.id === finding_id);
            const target = finding.data.references.find(item => item.uiState.edit);
            // console.log('test', reference, finding, target);
            // console.log(finding.data.references.findIndex(item => item.uiState.edit));
            Vue.set(
                finding.data.references,
                finding.data.references.findIndex(item => item.uiState.edit),
                {
                    data: reference,
                    id: Date.now(),
                    uiState: {
                        edit: false,
                        listId: target.uiState.listId,
                        selected: false,
                    }
                }
            );
        UPDATE_FINDING_FOCUS_AREA(state, {finding_id, focusArea}) {
            const finding = state.items.find(item => item.id === finding_id);
            if(!finding) {
                console.error(`[ UPDATE_FINDING_REFERENCES ] no finding was found`);
                return;
            }
            finding.data.focusArea = focusArea;
        },
        UPDATE_FINDING_FOCUS_AREA_DESCRIPTION(state, {focusArea, description}) {
            state.findingFocusAreaDescriptions[focusArea] = description;
        },
        UPDATE_FINDING_REFERENCES(state, {finding_id, value}) {
            const finding = state.items.find(item => item.id === finding_id);
            if(!finding) {
                console.error(`[ UPDATE_FINDING_REFERENCES ] no finding was found`);
                return;
            }
            finding.data.references = value;
        }
    }
}