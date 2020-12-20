<template>
    <view-content title="Information Requests" icon="information">

        <div 
            class=""
            v-for="criteria in $store.state.audits[audit_id].informationRequests.criterias" 
            :key="criteria.uiState.listId"
            >
            <list-item 
                deletable
                editable
                :edit="criteria.uiState.edit"
                @edit="onCriteriaEdit(criteria)"
                @delete="onCriteriaDelete(criteria)"
                >
                <div class="flex items-center space-x-2">
                    <icon value="page" />
                    <span class="font-bold">
                        {{ criteria.data.criteria }}
                    </span>
                    <span v-if="criteria.data.date" class="px-2 py-1 rounded-md bg-gray-200 text-primary">
                        {{ criteria.data.date }}
                    </span>
                </div>

                <template #edit>
                    <!-- Criteria -->
                    <div class="flex pr-0 md:pr-16 mb-2 space-x-2">
                        <div class="w-2/3">
                            <fn-select 
                                v-model="selectedCriteriaOption" 
                                :focus-after-select="false"
                                initial-text="Select criteria"
                                placeholder="Select criteria"
                                ref="criteriaSelect"
                                @select="onSelectCriteria"
                                >
                                    <fn-select-option 
                                        v-for="criteria in criteriaOptions" 
                                        :key="criteria.label" 
                                        :label="criteria.label" 
                                        :value="criteria"
                                    />
                            </fn-select>
                        </div>
                        <div class="w-13" v-if="computedCriteriaDatePickerVisible">
                            <date-picker 
                                ref="datepicker"
                                type="date"
                                :value="selectedCriteriaDate" 
                                :options="datePickerOptions" 
                                @change="onCriteriaDateChange" 
                                />
                        </div>
                    </div>
                    <!-- Date* -->

                    <div class="flex items-center space-x-2">
                        <base-button 
                            ref="saveButton"
                            icon="plus"
                            type="primary"
                            :disabled="computedSaveCriteriaButtonDisabled"
                            :loading="savingCriteria" 
                            @click.stop.prevent="onSaveCriteria" 
                        >
                            {{ criteria.id ? 'Update criteria' : 'Add criteria' }}
                        </base-button>
                        <base-button @click="onCancelEditCriteria(criteria)" plain type="primary">Cancel</base-button>
                    </div>
                </template>
            </list-item>
        </div>

        <div class="" v-if="showAddNewCriteriaButton">
            <base-button 
                icon="plus"
                plain 
                ref="addNewCriteriaButton"
                type="primary" 
                @click.stop.prevent="onAddNewCriteria" 
                >
                Add criteria
            </base-button>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit agenda' }" icon="clock" label="Agenda" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit findings' }" icon="index-finger-right" label="Findings" placement="right" />
        </template>
    </view-content>
</template>

<script>
import { DATE } from "~/utils/input-formatting.js";
import { INFORMATION_REQUEST_CRITERIAS } from '~/constants';
import BaseButton from '~/components/BaseButton';
import DatePicker from '~/components/DatePicker/main';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'InformationRequests',
    components: { BaseButton, DatePicker, FnSelect, FnSelectOption, ListItem, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            criteriaOptions: null,
            datePickerOptions: {
                format: DATE,
                weekStart: 1,
            },
            savingCriteria: false,
            selectedCriteria: null,
            selectedCriteriaDate: null,
            selectedCriteriaOption: null,
            showAddNewCriteriaButton: true
        }
    },
    computed: {
        computedCriteriaDatePickerVisible() {
            return this.selectedCriteriaOption ? this.selectedCriteriaOption.value.requiresDate : false;
        },
        computedSaveCriteriaButtonDisabled() {
            if(this.selectedCriteriaOption) {
                if(this.selectedCriteriaOption.value.requiresDate) {
                    if(this.selectedCriteriaDate) {
                        return false;
                    }
                    return true;
                }
                return false;
            }
            return true;
        },
    },
    created() {
        this.criteriaOptions = INFORMATION_REQUEST_CRITERIAS.map(criteria => {
            return {
                label: criteria.description,
                value: criteria
            }
        })
    },
    methods: {
        onAddNewCriteria() {
            this.$store.commit(
                `audits/${this.audit_id}/informationRequests/ADD_CRITERIA`
            );
            this.showAddNewCriteriaButton = false;
            // this.$nextTick(() => this.$refs.datepicker[0].focus());
        },
        onCancelEditCriteria(criteria) {
            if(!criteria) return;

            this.selectedCriteriaOption = null;
            this.selectedCriteriaDate = null;
            this.$store.dispatch(`audits/${this.audit_id}/informationRequests/cancelEditCriteria`, criteria);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewCriteriaButton = true, 20);
        },

        onCriteriaDelete(criteria) {
            this.$store.commit(`audits/${this.audit_id}/informationRequests/DELETE_CRITERIA`, criteria);
        },
        onCriteriaEdit(criteria) {
            this.selectedCriteriaOption = this.criteriaOptions.find(c => {
                return c.label === criteria.data.criteria;
            });
            this.selectedCriteriaDate = criteria.data.date;

            // this.$store.dispatch(`audits/${this.audit_id}/informationRequests/cancelEditCriteria`);
            this.showAddNewCriteriaButton = false;
            criteria.uiState.edit = true;
        },
        onCriteriaDateChange(date) {
            this.selectedCriteriaDate = date;
        },
        onSaveCriteria() {                
            this.savingCriteria = true;
            setTimeout(() => {
                this.$store.commit(
                    `audits/${this.audit_id}/informationRequests/SAVE_CRITERIA`, 
                    {
                        description: this.selectedCriteriaOption.value.description,
                        date: this.selectedCriteriaOption.value.requiresDate ? this.selectedCriteriaDate : null
                    }
                );
                this.selectedCriteriaOption = null;
                this.selectedCriteriaDate = null;
                this.savingCriteria = false;

                this.showAddNewCriteriaButton = true;

                // this.$nextTick(() => {
                //     this.$refs.addNewButton.$el.focus();
                // });
            }, 1000);
        },
        onSelectCriteria(criteria) {
            this.selectedCriteriaOption = criteria;
        }
    }
}
</script>