<template>
    <view-content title="Requirements" icon="index-finger-up">

        <draggable 
            v-model="requirements" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in requirements"
                    :key="item.listId"
                    :draggable="true" 
                    :edit="item.edit"
                    selectable
                    :selected="item.selected"
                    @delete="$store.commit(`audits/${audit_id}/requirements/DELETE_ITEM`, item.id)"
                    @select="onItemSelect(item.id)"
                    class="last:mb-4"
                    >
                    <div class="inline-flex w-full">{{ item.description }}</div>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <div class="w-full">
                                <fn-select 
                                    v-model="selectedRequirementOption" 
                                    filterable
                                    :focus-after-select="false"
                                    initial-text="Enter requirement text"
                                    :loading="requirementSelectLoading"
                                    loading-text="Searching.."
                                    no-match-option
                                    no-match-option-text="Create requirement"
                                    placeholder="Select requirement"
                                    ref="requirementSelect"
                                    :remoteMethod="fetchRequirements"
                                    @createNew="onCreateNewRequirement"
                                    @select="onSelectRequirement"
                                    >
                                        <fn-select-option 
                                            v-for="requirement in requirementOptions" 
                                            :key="requirement.id" 
                                            :label="requirement.label" 
                                            :value="requirement"
                                            :disabled="getRequirementDisabledState(requirement)"
                                        />
                                </fn-select>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="saveButton"
                                icon="plus"
                                type="primary"
                                :disabled="computedSaveButtonDisabled"
                                :loading="posting" 
                                @click.stop.prevent="saveItem" 
                            >
                                {{ 'Add requirement' }}
                            </base-button>
                            <base-button @click="cancelEditRequirement(item)" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </transition-group>
        </draggable>

        <!-- Add new button -->
        <div class="" v-if="showAddNewButton">
            <base-button 
                icon="plus"
                plain 
                ref="addNewButton"
                type="primary" 
                @click.stop.prevent="onOpenNewItem" 
                >
                Add requirement
            </base-button>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit team' }" icon="team" label="Audit team" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit scope' }" icon="scope" label="Scope" placement="right" />
        </template>
    </view-content>
</template>

<script>
import BaseButton from '~/components/BaseButton.js';
import draggable from 'vuedraggable';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

import requirementsTable from '~/../demo/data/requirements.js';

export default {
    name: 'Requirements',
    components: { BaseButton, draggable, FnSelect, FnSelectOption, ListItem, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: null,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            posting: false,
            selectedRequirementOption: null,
            showAddNewButton: true,
            requirementSelectLoading: false,
            requirementOptions: null,
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            if(!this.selectedRequirementOption) return true;
            return false;
        },
        requirements: {
            get() {
                return this.$store.state.audits[this.audit_id].requirements.items;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/requirements/UPDATE_ITEMS`, value)
            }
        }
    },

    created() {
        this.audit_id = this.$route.params.id; 

        const defaultRequirements = requirementsTable
            .filter(requirement => (requirement.default))
            .map(requirement => {
                return {
                    id: requirement.id,
                    listId: requirement.id,
                    description: requirement.description,
                    edit: false,
                    selected: false,
                }
            });

        this.$store.commit(`audits/${this.audit_id}/requirements/UPDATE_ITEMS`, defaultRequirements);
    },

    beforeDestroy() {
        this.$store.dispatch(`audits/${this.audit_id}/requirements/cancelEditItems`);
    },

    methods: {
        cancelEditRequirement(item) {
            if(!item) return;

            this.selectedRequirementOption = null;
            this.requirementOptions = null;
            this.$store.dispatch(`audits/${this.audit_id}/requirements/cancelEditItem`, item);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewButton = true, 20);
        },

        fakeApiCall(query) {
            this.requirementOptions = requirementsTable
                .filter(requirement => {
                    const targetName = requirement.description.toLowerCase();
                    const queryString = query.toLowerCase();
                    return targetName.includes(queryString);
                })
                .map(requirement => {
                    return { 
                        label: requirement.description,
                        value: requirement 
                    }
                });

            this.requirementSelectLoading = false;
        },

        fetchRequirements(value, charsAdded) {
            if(this.requirementOptions !== null) { // did we make an API call ?
                if(this.requirementOptions.length === 0 && charsAdded > 0) { // do we have any results ?
                    return;
                }
            }

            this.requirementSelectLoading = true;
            setTimeout(this.fakeApiCall.bind(null, value), 500);
        },

        getRequirementDisabledState(option) {
            const ids = this.$store.state.audits[this.audit_id].requirements.items.map(item => item.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onCreateNewRequirement(value) {
            this.$store.dispatch('database/addNewRequirement', value)
                .then(requirement => {
                    this.onSelectRequirement({
                        label: requirement.description,
                        value: requirement
                    });
                });
        },

        onItemSelect(id) {
            const target = this.auditRequirementsTable.find(requirement => requirement.id === id);
            target.selected = !target.selected;
        },

        onOpenNewItem() {
            this.$store.commit(
                `audits/${this.audit_id}/requirements/ADD_ITEM`,
                {
                    description: null
                }
            );
            this.showAddNewButton = false;
            this.$nextTick(() => this.$refs.requirementSelect[0].focus());
        },

        onSelectRequirement(option) {
            this.selectedRequirementOption = option;

            if(this.$refs.saveButton.length === 1) {
                this.$nextTick(() => {
                    this.$refs.saveButton[0].$el.focus();
                });
            } else {
                console.error('[ListItemDemo] too many or few items in $refs.saveButton array. Should only contain one');
            }
        },

        saveItem() {                
            this.posting = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/requirements/SAVE_ITEM`, { ...this.selectedRequirementOption.value });
                this.selectedRequirementOption = null;
                this.requirementOptions = null;
                this.posting = false;

                this.showAddNewButton = true;

                this.$nextTick(() => {
                    this.$refs.addNewButton.$el.focus();
                });
            }, 1000);
        },
    }
}
</script>