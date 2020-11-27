<template>
    <view-content title="Focus Areas" icon="crosshair">

        <draggable 
            v-model="focusAreas" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in focusAreas"
                    :key="item.uiState.listId"
                    deletable
                    draggable
                    :edit="item.uiState.edit"
                    @delete="$store.commit(`audits/${audit_id}/focusAreas/DELETE_ITEM`, item.id)"
                    @select="onItemSelect(item.id)"
                    class="last:mb-4"
                    >
                    <div class="inline-flex w-full">{{ item.data.name }}</div>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <div class="w-full">
                                <fn-select 
                                    v-model="selectedFocusAreaOption" 
                                    filterable
                                    :focus-after-select="false"
                                    initial-text="Enter focus area"
                                    :loading="focusAreaSelectLoading"
                                    loading-text="Searching.."
                                    placeholder="Select focus area"
                                    ref="focusAreaSelect"
                                    @select="onSelectFocusArea"
                                    >
                                        <fn-select-option 
                                            v-for="focusArea in focusAreaOptions" 
                                            :key="focusArea.id" 
                                            :label="focusArea.label" 
                                            :value="focusArea"
                                            :disabled="getFocusAreaDisabledState(focusArea)"
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
                                {{ item.id ? 'Update focus area' : 'Add focus area' }}
                            </base-button>
                            <base-button @click="cancelEditFocusArea(item)" plain type="primary">Cancel</base-button>
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
                Add focus area
            </base-button>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit scope' }" icon="scope" label="Scope" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit agenda' }" icon="clock" label="Agenda" placement="right" />
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

import focusAreasTable from '~/../demo/data/focus_areas.js';

export default {
    name: 'FocusAreas',
    components: { BaseButton, draggable, FnSelect, FnSelectOption, ListItem, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.id,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            posting: false,
            selectedFocusAreaOption: null,
            showAddNewButton: true,
            focusAreaSelectLoading: false,
            focusAreaOptions: null,
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            if(!this.selectedFocusAreaOption) return true;
            return false;
        },
        focusAreas: {
            get() {
                return this.$store.state.audits[this.audit_id].focusAreas.items;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/focusAreas/UPDATE_ITEMS`, value)
            }
        }
    },

    created() {
        this.focusAreaOptions = focusAreasTable
            .map(focusArea => {
                return {
                    label: focusArea.name,
                    value: focusArea
                }
            });
    },

    beforeDestroy() {
        this.$store.dispatch(`audits/${this.audit_id}/focusAreas/cancelEditItems`);
    },

    methods: {
        cancelEditFocusArea(item) {
            if(!item) return;

            this.selectedFocusAreaOption = null;
            this.$store.dispatch(`audits/${this.audit_id}/focusAreas/cancelEditItem`, item);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewButton = true, 20);
        },

        getFocusAreaDisabledState(option) {
            const ids = this.$store.state.audits[this.audit_id].focusAreas.items.map(item => item.data.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onOpenNewItem() {
            this.$store.commit(
                `audits/${this.audit_id}/focusAreas/ADD_ITEM`,
                {
                    name: null,
                    description: null
                }
            );
            this.showAddNewButton = false;
            this.$nextTick(() => this.$refs.focusAreaSelect[0].focus());
        },

        onSelectFocusArea(option) {
            this.selectedFocusAreaOption = option;

            this.$nextTick(() => {
                this.$refs.saveButton[0].$el.focus();
            });
        },

        saveItem() {                
            this.posting = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/focusAreas/SAVE_ITEM`, { ...this.selectedFocusAreaOption.value });
                this.selectedFocusAreaOption = null;
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