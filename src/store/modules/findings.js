import Vue from 'vue';
import crud from './crud.js';
import { setNestedProp } from '~/utils/vue';

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
        }
    },
    state: {
        ...crud.state(),
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
                console.error(`[ ADD_FINDING_REFERENCE ] no finding_id passed..`);
                return;
            }

            console.log('ADD_FINDING_REFERENCE', finding);
            // this push seems to happen on all findings..
            // actually no. Because even if you make a ref in a finding and then create a new finding, that reference 
            // will also be in the new finding

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
            // Vue.set(
            //     finding.data.references,
            //     finding.data.references.findIndex(item => item.uiState.edit),
            //     {
            //         data: reference,
            //         id: Date.now(),
            //         uiState: {
            //             edit: false,
            //             listId: target.uiState.listId,
            //             selected: false,
            //         }
            //     }
            // );
            
            setNestedProp(target, 'data', reference);
            setNestedProp(target, 'uiState', {
                edit: false,
                listId: target.uiState.listId,
                selected: false,
            });
            setNestedProp(target, 'id', Date.now());

            // Vue.set(
            //     finding.data.references,
            //     finding.data.references.findIndex(item => item.uiState.edit),
            //     {
            //         data: reference,
            //         id: Date.now(),
            //         uiState: {
            //             edit: false,
            //             listId: target.uiState.listId,
            //             selected: false,
            //         }
            //     }
            // );
        },
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