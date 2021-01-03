<template>
    <view-content title="Requirements" icon="itenary">
        <!-- Group select menu -->
        <div v-if="$store.getters[`audits/${audit_id}/requirements/savedItemsCount`] > 0" class="flex items-center pl-6 border-b border-subtle">
            <div class="flex items-center py-3 mr-2">
                <checkbox :value="computedGroupCheck" @click="$store.dispatch(`audits/${audit_id}/requirements/toggleAllItems`)" />
                <!-- <span v-if="!computedGroupCheck" class="ml-2 text-xs text-secondary">Select / deselect all</span> -->
            </div>
            <div v-if="computedGroupCheck">
                <pop-over ref="popover" :message="`Delete ${$store.getters[`audits/${audit_id}/requirements/itemsSelectedCount`]} items?`">
                    <template #popover="{ message }">
                        <div class="text-sm text-secondary mb-2 text-center">
                            {{ message }}
                        </div>
                        <div class="flex flex-row items-center">
                            <base-button plain type="primary" @click="$refs.popover.close()" class="mr-2">Cancel</base-button>
                            <base-button plain type="error" @click="$store.dispatch(`audits/${audit_id}/requirements/deleteSelectedItems`)" class="">Delete</base-button>
                        </div>
                    </template>
                    <template #reference>
                        <icon-button value="trash" />
                    </template>
                </pop-over>
            </div>
        </div>

        <draggable 
            v-model="requirements" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in requirements"
                    :key="item.uiState.listId"
                    deletable
                    draggable
                    selectable
                    :edit="item.uiState.edit"
                    :selected="item.uiState.selected"
                    @delete="$store.commit(`audits/${audit_id}/requirements/DELETE_ITEM`, item.id)"
                    @select="onItemSelect(item.id)"
                    class="last:mb-2"
                    >
                    <div class="inline-flex w-full">{{ item.data.description }}</div>

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
                                {{ item.id ? 'Update requirement' : 'Add requirement' }}
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
                text
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
import Checkbox from '~/components/Checkbox';
import draggable from 'vuedraggable';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import IconButton from '~/components/IconButton';
import ListItem from '~/components/ListItem';
import PopOver from '~/components/PopOver';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

import requirementsTable from '~/../demo/data/requirements.js';

export default {
    name: 'Requirements',
    components: { BaseButton, Checkbox, draggable, FnSelect, FnSelectOption, IconButton, ListItem, PopOver, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
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
        computedGroupCheck() {
            if(this.$store.getters[`audits/${this.audit_id}/requirements/itemsSelectedCount`] === this.$store.state.audits[this.audit_id].requirements.items.length) return 1;
            if(this.$store.getters[`audits/${this.audit_id}/requirements/itemsSelectedCount`]) return 2;
            return 0;
        },
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
            const ids = this.$store.state.audits[this.audit_id].requirements.items.map(item => item.data.id);
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
            const target = this.$store.state.audits[this.audit_id].requirements.items.find(requirement => requirement.id === id);
            target.uiState.selected = !target.uiState.selected;
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

            this.$nextTick(() => {
                this.$refs.saveButton[0].$el.focus();
            });
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