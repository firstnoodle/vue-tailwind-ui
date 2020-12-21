<template>
    <view-content title="Information Requests" icon="information">

        <!-- Criterias -->
        <div 
            class="pb-4 mb-8 border-b border-subtle"
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
                <template #default>
                    <div class="flex items-center space-x-2">
                        <icon value="page" />
                        <span class="font-bold">
                            {{ criteria.data.criteria }}
                        </span>
                        <span v-if="criteria.data.date" class="px-2 py-1 rounded-md bg-gray-200 text-primary font-bold">
                            {{ criteria.data.date }}
                        </span>
                    </div>
                </template>
                <template #edit>
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
                                ref="criteriaDatePicker"
                                type="date"
                                :value="selectedCriteriaDate" 
                                :options="datePickerOptions" 
                                @change="onCriteriaDateChange" 
                                />
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <base-button 
                            ref="saveCriteriaButton"
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

            <!-- Periods -->
            <div
                v-for="period in criteria.data.periods"
                :key="period.uiState.listId"
                class="pl-4 md:pl-8 py-4 "
                >
                <list-item 
                    deletable
                    editable
                    :edit="period.uiState.edit"
                    @edit="onCriteriaPeriodEdit(period)"
                    @delete="onCriteriaPeriodDelete(criteria, period)"
                    >
                    <template #default>
                        <div class="flex items-center space-x-2">
                            <icon value="calendar" />
                            <span class="font-bold">{{ period.data.start_date }}</span>
                            <icon value="arrow-right" />
                            <span class="font-bold">{{ period.data.end_date }}</span>
                        </div>
                    </template>
                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2 space-x-2">
                            <date-picker 
                                ref="periodStartDatePicker"
                                type="date"
                                :value="selectedPeriodStartDate" 
                                :options="datePickerOptions" 
                                @change="onPeriodStartDateChange" 
                                />
                            <date-picker 
                                ref="periodEndDatePicker"
                                type="date"
                                :value="selectedPeriodEndDate" 
                                :options="datePickerOptions" 
                                @change="onPeriodEndDateChange" 
                                />
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="savePeriodButton"
                                icon="plus"
                                type="primary"
                                :disabled="computedSavePeriodButtonDisabled"
                                :loading="savingPeriod" 
                                @click.stop.prevent="onSaveCriteriaPeriod(criteria)" 
                            >
                                {{ period.id ? 'Update period' : 'Add period' }}
                            </base-button>
                            <base-button @click="onCancelEditCriteriaPeriod(criteria, period)" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </div>
            <div class="py-3 pl-4 md:pl-8">
                <base-button 
                    icon="plus"
                    plain 
                    ref="addNewPeriodButton"
                    type="primary" 
                    @click.stop.prevent="onAddNewCriteriaPeriod(criteria)"
                    >
                    Add period
                </base-button>
            </div>
        </div>

        <base-button 
            v-if="showAddNewCriteriaButton"
            icon="plus"
            plain 
            ref="addNewCriteriaButton"
            type="primary" 
            @click.stop.prevent="onAddNewCriteria" 
            >
            Add criteria
        </base-button>

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
            savingPeriod: false,
            selectedCriteria: null,
            selectedCriteriaDate: null,
            selectedPeriodStartDate: null,
            selectedPeriodEndDate: null,
            selectedCriteriaOption: null,
            showAddNewCriteriaButton: true,
            showAddNewPeriodButton: true
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
        computedSavePeriodButtonDisabled() {
            // TODO: check that dates are chronological
            if(this.selectedPeriodStartDate && this.selectedPeriodEndDate) {
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
            this.$nextTick(() => this.$refs.criteriaSelect[0].focus());
        },

        onAddNewCriteriaPeriod(criteria) {
            this.$store.commit(
                `audits/${this.audit_id}/informationRequests/ADD_CRITERIA_PERIOD`,
                criteria
            );
            this.showAddNewPeriodButton = false;
            // this.$nextTick(() => this.$refs.periodStartDatePciker[0].focus());
        },

        onCancelEditCriteria(criteria) {
            if(!criteria) return;

            this.selectedCriteriaOption = null;
            this.selectedCriteriaDate = null;
            this.$store.dispatch(`audits/${this.audit_id}/informationRequests/cancelEditCriteria`, criteria);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewCriteriaButton = true, 20);
        },

        onCancelEditCriteriaPeriod(criteria, period) {
            if(!period) return;

            this.selectedPeriodStartDate = null;
            this.selectedPeriodEndDate = null;
            this.$store.dispatch(`audits/${this.audit_id}/informationRequests/cancelEditCriteriaPeriod`, {criteria, period});

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewPeriodButton = true, 20);
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

        onCriteriaPeriodDelete(criteria, period) {
            this.$store.commit(`audits/${this.audit_id}/informationRequests/DELETE_CRITERIA_PERIOD`, { criteria, period });
        },

        onCriteriaPeriodEdit(period) {
            this.selectedPeriodStartDate = period.data.start_date;
            this.selectedPeriodEndDate = period.data.end_date;

            // this.$store.dispatch(`audits/${this.audit_id}/informationRequests/cancelEditCriteria`);
            this.showAddNewPeriodButton = false;
            period.uiState.edit = true;
        },

        onCriteriaDateChange(date) {
            this.selectedCriteriaDate = date;
        },

        onPeriodStartDateChange(date) {
            this.selectedPeriodStartDate = date;
        },

        onPeriodEndDateChange(date) {
            this.selectedPeriodEndDate = date;
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

        onSaveCriteriaPeriod(criteria) {
            this.savingPeriod = true;
            setTimeout(() => {
                this.$store.commit(
                    `audits/${this.audit_id}/informationRequests/SAVE_CRITERIA_PERIOD`, 
                    {
                        criteria,
                        period: {
                            start_date: this.selectedPeriodStartDate,
                            end_date: this.selectedPeriodEndDate
                        }
                    }
                );
                this.selectedPeriodStartDate = null;
                this.selectedPeriodEndDate = null;
                this.savingPeriod = false;

                this.showAddNewPeriodButton = true;

                // this.$nextTick(() => {
                //     this.$refs.addNewButton.$el.focus();
                // });
            }, 1000);
        },

        onSelectCriteria(criteria) {
            this.selectedCriteriaOption = criteria;
            this.$nextTick(() => {
                if(criteria.value.requiresDate) {
                    this.$refs.criteriaDatePicker[0].focus();
                } else {
                    this.$refs.saveCriteriaButton[0].$el.focus();
                }
            });
        }
    }
}
</script>