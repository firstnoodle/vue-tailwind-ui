<template>
    <view-content title="Distribution" icon="arrow-fat-right">
        <!-- Plan Date -->
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Plan distribution date' }}
            </header>
            <list-item
                v-if="$store.state.audits[audit_id].distribution.plan.date"
                editable
                singleton
                :edit="$store.state.audits[audit_id].distribution.plan.date.uiState.edit"
                @edit="editPlanDate"
                >

                {{ $store.state.audits[audit_id].distribution.plan.date.data.date }}

                <template #edit>
                    <div class="flex pr-0 md:pr-16 mb-2">
                        <date-picker 
                            ref="datepicker"
                            type="date"
                            :value="selectedPlanDate" 
                            :options="datePickerOptions" 
                            @change="onPlanDateChange" 
                            />
                    </div>
                    <div class="flex items-center space-x-2">
                        <base-button 
                            ref="savePlanDateButton"
                            icon="plus"
                            type="primary"
                            :disabled="computedSavePlanDateButtonDisabled"
                            :loading="savingPlanDate" 
                            @click.stop.prevent="savePlanDate" 
                        >
                            {{ $store.state.audits[audit_id].distribution.plan.date.id ? 'Update date' : 'Save date' }}
                        </base-button>
                        <base-button @click="cancelEditPlanDate" plain type="primary">Cancel</base-button>
                    </div>
                </template>
            </list-item>
            <base-button
                v-else
                icon="plus"
                plain 
                ref="addPlanDateButton"
                type="primary" 
                class="mt-2"
                @click.stop.prevent="$store.commit(`audits/${audit_id}/distribution/ADD_PLAN_DATE`)" 
                >
                Add date
            </base-button>
        </div>

        <!-- Plan Recipients -->
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Plan recipients' }}
            </header>

            <list-item
                v-for="recipient in $store.state.audits[audit_id].distribution.plan.recipients"
                :key="recipient.uiState.listId"
                deletable
                editable
                :edit="recipient.uiState.edit"
                @edit="editPlanRecipient(recipient)"
                @delete="$store.dispatch(`audits/${this.audit_id}/distribution/deletePlanRecipient`, recipient)"
                >

                <template #edit>
                    <div class="flex pr-0 md:pr-16 mb-2">
                        Add Recipient UI
                    </div>
                    <div class="flex items-center space-x-2">
                        <base-button 
                            ref="saveDateButton"
                            icon="plus"
                            type="primary"
                            :disabled="computedSaveDateButtonDisabled"
                            :loading="savingDate" 
                            @click.stop.prevent="saveDate(date)" 
                        >
                            {{ date.id ? 'Update date' : 'Add date' }}
                        </base-button>
                        <base-button @click="cancelEditDate(date)" plain type="primary">Cancel</base-button>
                    </div>
                </template>
            </list-item>

            <base-button 
                icon="plus"
                plain 
                ref="addPlanRecipientButton"
                type="primary" 
                class="mt-2"
                @click.stop.prevent="addPlanRecipient" 
                >
                Add recipient
            </base-button>
        </div>

        <!-- Report Date -->
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Report distribution date' }}
            </header>
            <list-item
                v-if="$store.state.audits[audit_id].distribution.report.date"
                editable
                singleton
                :edit="$store.state.audits[audit_id].distribution.report.date.uiState.edit"
                @edit="editReportDate"
                >

                {{ $store.state.audits[audit_id].distribution.report.date.data.date }}

                <template #edit>
                    <div class="flex pr-0 md:pr-16 mb-2">
                        <date-picker 
                            ref="datepicker"
                            type="date"
                            :value="selectedReportDate" 
                            :options="datePickerOptions" 
                            @change="onReportDateChange" 
                            />
                    </div>
                    <div class="flex items-center space-x-2">
                        <base-button 
                            ref="saveReportDateButton"
                            icon="plus"
                            type="primary"
                            :disabled="computedSaveReportDateButtonDisabled"
                            :loading="savingReportDate" 
                            @click.stop.prevent="saveReportDate" 
                        >
                            {{ $store.state.audits[audit_id].distribution.report.date.id ? 'Update date' : 'Save date' }}
                        </base-button>
                        <base-button @click="cancelEditReportDate" plain type="primary">Cancel</base-button>
                    </div>
                </template>
            </list-item>
            <base-button 
                v-else
                icon="plus"
                plain 
                ref="addReportDateButton"
                type="primary" 
                class="mt-2"
                @click.stop.prevent="$store.commit(`audits/${audit_id}/distribution/ADD_REPORT_DATE`)" 
                >
                Add date
            </base-button>
        </div>

        <!-- Report Recipients -->
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Report recipients' }}
            </header>
            <base-button 
                icon="plus"
                plain 
                ref="addReportRecipientButton"
                type="primary" 
                class="mt-2"
                @click.stop.prevent="addReportRecipient" 
                >
                Add recipient
            </base-button>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit details' }" icon="phase" label="Audit details" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit auditee' }" icon="building" label="Auditee" placement="right" />
        </template>
    </view-content>
</template>

<script>
import { DATE } from "~/utils/input-formatting.js";
import BaseButton from '~/components/BaseButton';
import DatePicker from '~/components/DatePicker/main';
import ListItem from '~/components/ListItem';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Distribution',
    components: { BaseButton, DatePicker, ListItem, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            datePickerOptions: {
                format: DATE,
                weekStart: 1,
            },
            savingPlanDate: false,
            savingReportDate: false,
            selectedPlanDate: null,
            selectedReportDate: null,
        }
    },
    computed: {
        computedSavePlanDateButtonDisabled() {
            return !this.selectedPlanDate;
        },
        computedSaveReportDateButtonDisabled() {
            return !this.selectedReportDate;
        }
    },
    methods: {
        addPlanRecipient() {
            console.log('new plan recipient');
        },
        addReportRecipient() {
            console.log('new report recipient');
        },
        cancelEditPlanDate() {
            this.$store.dispatch(`audits/${this.audit_id}/distribution/cancelEditPlanDate`);
            this.selectedPlanDate = null;
        },
        cancelEditReportDate() {
            this.$store.dispatch(`audits/${this.audit_id}/distribution/cancelEditReportDate`);
            this.selectedReportDate = null;
        },
        editPlanDate() {
            this.selectedPlanDate = this.$store.state.audits[this.audit_id].distribution.plan.date.data.date;
            this.$store.commit(`audits/${this.audit_id}/distribution/EDIT_PLAN_DATE`)
        },
        editReportDate() {
            this.selectedReportDate = this.$store.state.audits[this.audit_id].distribution.report.date.data.date;
            this.$store.commit(`audits/${this.audit_id}/distribution/EDIT_REPORT_DATE`)
        },
        editPlanRecipient(recipient) {
            console.log(recipient);
        },
        editReportRecipient(recipient) {
            console.log(recipient);
        },
        onPlanDateChange(date) {
            this.selectedPlanDate = date;
        },
        onReportDateChange(date) {
            this.selectedReportDate = date;
        },
        savePlanDate() {
            this.$store.commit(`audits/${this.audit_id}/distribution/SAVE_PLAN_DATE`, this.selectedPlanDate);
        },
        saveReportDate() {
            this.$store.commit(`audits/${this.audit_id}/distribution/SAVE_REPORT_DATE`, this.selectedReportDate);
        }
    }
}
</script>