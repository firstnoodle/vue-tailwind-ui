<template>
    <modal 
        @close="$emit('close')"
        >
        <template #title>
            <icon value="index-finger-right" />
            <span class="ml-2 text-sm font-light">Finding Q{{ $store.getters[`audits/${audit_id}/findings/getItemIndex`](finding_id)+1 }}</span>
        </template>
        <template>
            
            <!-- TITLE -->
            <div v-if="!editTitle" class="flex items-center justify-between">
                <div class="flex-1 font-bold text-primary" @click="onEditTitle">{{ computedFinding.data.title }}</div>
                <icon-button value="edit" class="flex-0" @click="onEditTitle" />
            </div>
            <div v-else class="mb-4">
                <div class="flex pr-0 md:pr-8 mb-2">
                    <div class="w-full">
                        <input 
                            v-model="findingTitle" 
                            ref="findingTitleInput" 
                            type="text" 
                            class="w-full px-2 py-1 text-base text-primary font-bold border border-subtle rounded focus:outline-none focus:shadow-outline focus:border-action" 
                            />
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <base-button 
                        ref="saveButton"
                        type="primary"
                        :disabled="computedSaveTitleButtonDisabled"
                        :loading="savingTitle" 
                        @click.stop.prevent="saveTitle" 
                    >
                        {{ 'Update title' }}
                    </base-button>
                    <base-button @click="cancelEditTitle" plain type="primary">Cancel</base-button>
                </div>
            </div>

            <!-- AUTHOR -->
            <div class="text-xs text-gray-500 mb-4">Created 10 Sep 2020 12:23 by NSTQ (Seabstian Rønde Thielke)</div>

            <!-- SEVERITY -->
            <severity-select v-model="computedFinding.data.severity" @change="onSeverityChange" />

            <div class="mt-4 space-x-2">
                <!-- DEPARTMENT linked to Auditee -->
                <div class="inline-flex items-center text-action border border-subtle rounded-md" style="padding: 0.125rem 0.5rem">
                    <icon value="building" />
                    <span class="ml-1 text-sm font-light">Department</span>
                </div>

                <!-- FOCUS AREA -->
                <!-- <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md" style="padding: 0.125rem 0.5rem">
                    <icon value="crosshair" />
                    <span class="ml-1 text-sm font-light">Focus area</span>
                </div> -->
                <pop-select
                    v-model="selectedFocusArea"
                    clearSelectionText="No Focus Area" 
                    icon="crosshair"
                    null-label="Set Focus Area"
                    @change="onFocusAreaChange"
                    @clear="onFocusAreaClear" 
                    >
                    <template #options>
                        <pop-select-option 
                            v-for="option in focusAreaOptions" 
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                            />
                    </template>
                </pop-select>

                <!-- TREND CATEGORY -->
                <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md" style="padding: 0.125rem 0.5rem">
                    <icon value="trend" />
                    <span class="ml-1 text-sm font-light">Trend category</span>
                </div>
            </div>

            <!-- DESCRIPTION -->
            <div class="w-full my-8">
                <header class="w-full border-b border-subtle font-medium text-sm text-brand">
                    {{ 'Description' }}
                </header>
                <base-button
                    v-if="!computedFinding.data.description && !editDescription"
                    plain
                    type="primary"
                    icon="plus"
                    class="my-4"
                    @click="onEditDescription"
                    >
                    {{ 'Add description' }}
                </base-button>
                <div v-else-if="!editDescription" class="w-full mt-4 mb-8">
                    <!-- <div class="text-sm text-primary" v-html="computedFinding.data.description"></div> -->
                    <list-item @edit="onEditDescription" @click.native="onEditDescription" editable singleton>
                        <span class="css-rich-text " v-html="computedFinding.data.description"></span>
                    </list-item>
                </div>
                <text-editor v-else ref="editor" :content="editorContent" @change="onEditorChange">
                    <template #header>
                        <base-button 
                            plain
                            size="xs"
                            type="primary" 
                            class="mr-2"
                            @click="editDescription = false"
                            >
                            {{ 'CANCEL' }}
                        </base-button>
                        <base-button 
                            :disabled="!computedDirtyFlag"
                            :loading="savingDescription"
                            size="xs"
                            type="primary" 
                            @click="saveDescription"
                            >
                            {{ 'SAVE' }}
                        </base-button>
                    </template>
                </text-editor>
            </div>

            <!-- REFERENCES -->
            <div class="w-full">
                <header class="w-full border-b border-subtle font-medium text-sm text-brand">
                    {{ 'References' }}
                </header>
                <main class="my-4"> 
                    <draggable 
                        v-model="computedReferencesList" 
                        v-bind="dragOptions"
                        handle=".drag-handle"
                        >
                        <transition-group type="transition">
                            <list-item 
                                v-for="item in computedFinding.data.references"
                                :key="item.uiState.listId"
                                :edit="item.uiState.edit"
                                deletable
                                draggable
                                class="last:mb-4"
                                @delete="onReferenceDelete(item)"
                                >
                                <div class="inline-flex w-full">{{ item.data.description }}</div>

                                <template #edit>
                                    <div class="flex pr-0 md:pr-16 mb-2">
                                        <div class="w-full">
                                            <fn-select 
                                                v-model="selectedReferenceOption" 
                                                filterable
                                                :focus-after-select="false"
                                                initial-text="Enter reference text"
                                                :loading="referenceSelectLoading"
                                                loading-text="Searching.."
                                                no-match-option
                                                no-match-option-text="Create reference"
                                                placeholder="Select reference"
                                                ref="referenceSelect"
                                                :remoteMethod="fetchReferences"
                                                @createNew="onCreateNewReference"
                                                @select="onSelectReference"
                                                >
                                                    <fn-select-option 
                                                        v-for="reference in referenceOptions" 
                                                        :key="reference.id" 
                                                        :label="reference.label" 
                                                        :value="reference"
                                                        :disabled="getReferenceOptionDisabledState(reference)"
                                                    />
                                            </fn-select>
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <base-button 
                                            ref="saveReferenceButton"
                                            icon="plus"
                                            type="primary"
                                            :disabled="computedReferenceSaveButtonDisabled"
                                            :loading="savingReference" 
                                            @click.stop.prevent="saveReference" 
                                        >
                                            {{ 'Add requirement' }}
                                        </base-button>
                                        <base-button @click="cancelEditReference(item)" plain type="primary">Cancel</base-button>
                                    </div>
                                </template>
                            </list-item>
                        </transition-group>
                    </draggable>
                    <!-- Add new button -->
                    <div class="" v-if="showAddNewReferenceButton">
                        <base-button 
                            icon="plus"
                            plain 
                            ref="addNewReferenceButton"
                            type="primary" 
                            @click.stop.prevent="onOpenNewReference" 
                            >
                            Add reference
                        </base-button>
                    </div>
                </main>
            </div>
        </template>
    </modal>
</template>

<script>
import focusAreaTable from '~/../demo/data/focus_areas';
import referencesTable from '~/../demo/data/references';
import draggable from 'vuedraggable';

import Icon from '~/components/Icon';
import IconButton from '~/components/IconButton';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';
import Modal from '~/components/Modal';
import PopSelect from '~/components/PopSelect/main';
import PopSelectOption from '~/components/PopSelect/option';
import SeveritySelect from '~/components/SeveritySelect';
import TextEditor from '~/components/TextEditor';

export default {
    name: 'FindingModal',
    components: { draggable, FnSelect, FnSelectOption, Icon, IconButton, ListItem, Modal, PopSelect, PopSelectOption, SeveritySelect, TextEditor },
    data() {
        return {
            audit_id: null,
            descriptionSaved: false,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            editorContent: null,
            editDescription: false,
            editTitle: false,
            finding_id: null,
            findingTitle: null,
            focusAreaOptions: null,
            referenceOptions: null,
            referenceSelectLoading: false,
            savedContent: null,
            savingDescription: false,
            savingReference: false,
            savingTitle: false,
            selectedFocusArea: null,
            selectedReferenceOption: null,
            showAddNewReferenceButton: true,
        }
    },
    computed: {
        computedDirtyFlag() {
            return this.editorContent !== this.savedContent;
        },
        computedFinding() {
            return this.$store.getters[`audits/${this.audit_id}/findings/getItemById`](this.finding_id)
        },
        computedSaveTitleButtonDisabled() {
            if(this.findingTitle.length === 0) return true;
            return false;
        },
        computedReferenceSaveButtonDisabled() {
            if(!this.selectedReferenceOption) return true;
            return false;
        },
        computedStatusMessage() {
            if(this.savingDescription) return '';
            if(this.computedDirtyFlag) return 'You have unsaved changes';
            if(!this.computedDirtyFlag && this.descriptionSaved) return 'Changes was saved!'
            return '';
        },
        computedReferencesList: {
            get() {
                return this.computedFinding.data.references;
            },
            set(value) {
                this.$store.commit(
                    `audits/${this.audit_id}/findings/UPDATE_FINDING_REFERENCES`, 
                    {
                        finding_id: this.finding_id,
                        value
                    }
                );
            }
        }
    },
    created() {
        this.audit_id = this.$route.params.id;
        this.finding_id = this.$route.params.finding;
        this.findingTitle = this.computedFinding.data.title;
        this.editorContent = this.computedFinding.data.description;

        this.focusAreaOptions = focusAreaTable
            .map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            })
    },
    mounted() {
        // this.savedContent = this.editorContent = this.$refs.editor.editor.getHTML();
    },
    methods: {
        cancelEditReference(item) {
            if(!item) return;

            this.selectedReferenceOption = null;
            this.referenceOptions = null;
            this.$store.dispatch(
                `audits/${this.audit_id}/findings/cancelEditFindingReference`, 
                { 
                    finding_id: this.finding_id,
                    reference_id: item.id
                }
            );

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewReferenceButton = true, 20);
        },

        cancelEditTitle() {
            this.editTitle = false;
            this.findingTitle = this.computedFinding.data.title;
        },

        fakeApiCall(query) {
            this.referenceOptions = referencesTable
                .filter(reference => {
                    const targetName = reference.description.toLowerCase();
                    const queryString = query.toLowerCase();
                    return targetName.includes(queryString);
                })
                .map(reference => {
                    return { 
                        label: reference.description,
                        value: reference 
                    }
                });

            this.referenceSelectLoading = false;
        },

        fetchReferences(value, charsAdded) {
            if(this.referenceOptions !== null) { // did we make an API call ?
                if(this.referenceOptions.length === 0 && charsAdded > 0) { // do we have any results ?
                    return;
                }
            }

            this.referenceSelectLoading = true;
            setTimeout(this.fakeApiCall.bind(null, value), 500);
        },

        getReferenceOptionDisabledState(option) {
            const ids = this.computedFinding.data.references.map(reference => {
                if(!reference.id) return;
                return reference.id;
            });
            const result = ids.includes(option.value.id);
            return result;
        },

        onCreateNewReference(value) {
            this.$store.dispatch('database/addNewReference', value)
                .then(reference => {
                    this.onSelectReference({
                        label: reference.description,
                        value: reference
                    });
                });
        },

        onEditTitle() {
            this.editTitle = true;
            this.$nextTick(() => {
                this.$refs.findingTitleInput.focus();
            });
        },

        onEditorChange(value) {
            this.editorContent = value;
        },

        onEditDescription() {
            this.editDescription = true
            this.$nextTick(() => this.$refs.editor.focus());
        },

        onFocusAreaChange(value) {
            this.selectedFocusArea = value;
        },

        onFocusAreaClear() {
            this.selectedFocusArea = null;
        },

        onOpenNewReference() {
            this.$store.commit(
                `audits/${this.audit_id}/findings/ADD_FINDING_REFERENCE`,
                {
                    finding_id: this.finding_id,
                    reference: { description: null }
                }
            );
            this.showAddNewReferenceButton = false;
            this.$nextTick(() => {
                this.$refs.referenceSelect[0].focus();
            });
        },

        onReferenceDelete(reference) {
            this.$store.commit(
                `audits/${this.audit_id}/findings/DELETE_FINDING_REFERENCE`, 
                { 
                    finding: this.computedFinding, 
                    reference 
                }
            );
        },

        onSelectReference(option) {
            this.selectedReferenceOption = option;

            this.$nextTick(() => {
                this.$refs.saveReferenceButton[0].$el.focus();
            });
        },

        onSeverityChange(value) {
            setTimeout(() => {
                this.$store.commit(
                    `audits/${this.audit_id}/findings/UPDATE_ITEM_ATTRIBUTE`,
                    {
                        id: this.finding_id,
                        path: 'data.severity',
                        value
                    }
                );
            }, 500);
        },

        saveDescription() {
            this.savingDescription = true;
            setTimeout(() => {
                this.$store.commit(
                    `audits/${this.audit_id}/findings/UPDATE_ITEM_ATTRIBUTE`,
                    {
                        id: this.finding_id,
                        path: 'data.description',
                        value: this.editorContent
                    }
                );
                this.editDescription = false;
                this.savedContent = this.editorContent;
                this.savingDescription = false;
                this.descriptionSaved = true;
            }, 1000);
        },

        saveReference() {                
            this.savingReference = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/findings/SAVE_FINDING_REFERENCE`, { finding_id: this.finding_id, reference: this.selectedReferenceOption.value });
                this.selectedReferenceOption = null;
                this.referenceOptions = null;
                this.savingReference = false;

                this.showAddNewReferenceButton = true;

                this.$nextTick(() => {
                    this.$refs.addNewReferenceButton.$el.focus();
                });
            }, 1000);
        },

        saveTitle() {
            this.savingTitle = true;
            setTimeout(() => {
                this.$store.commit(
                    `audits/${this.audit_id}/findings/UPDATE_ITEM_ATTRIBUTE`,
                    {
                        id: this.finding_id,
                        path: 'data.title',
                        value: this.findingTitle
                    }
                );
                this.findingTitle = this.computedFinding.data.title;
                this.editTitle = false;
                this.savingTitle = false;
            }, 1000);
        }
    }
}
</script>