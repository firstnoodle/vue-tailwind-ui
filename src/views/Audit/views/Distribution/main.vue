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

            <draggable 
                v-model="planRecipients" 
                v-bind="dragOptions"
                handle=".drag-handle"
                >
                <transition-group type="transition">
                    <list-item
                        v-for="recipient in planRecipients"
                        :key="recipient.uiState.listId"
                        deletable
                        draggable
                        editable
                        :edit="recipient.uiState.edit"
                        @edit="editPlanRecipient(recipient)"
                        @delete="$store.dispatch(`audits/${audit_id}/distribution/deleteRecipient`, { target: 'plan', recipient })"
                        >

                        <div class="inline-flex w-2/3 md:w-1/2">{{ recipient.data.initials + ' (' + recipient.data.name + ')' }}</div>
                        <div v-if="recipient.data.copy" class="inline-flex w-1/3 md:w-1/2">{{ 'CC' }}</div>
                        
                        <template #edit>
                            <div class="flex pr-0 md:pr-16 mb-2">
                                Add Recipient UI
                            </div>
                            <div class="flex items-center space-x-2">
                                <base-button 
                                    ref="savePlanRecipientButton"
                                    icon="plus"
                                    type="primary"
                                    :disabled="computedSavePlanRecipientButtonDisabled"
                                    :loading="savingPlanRecipient" 
                                    @click.stop.prevent="savePlanRecipient(recipient)" 
                                >
                                    {{ recipient.id ? 'Update recipient' : 'Add recipient' }}
                                </base-button>
                                <base-button @click="cancelEditPlanRecipient(recipient)" plain type="primary">Cancel</base-button>
                            </div>
                        </template>
                    </list-item>
                </transition-group>
            </draggable>

            <base-button 
                v-if="showAddPlanRecipientButton"
                icon="plus"
                plain 
                ref="addPlanRecipientButton"
                type="primary" 
                class="mt-2"
                @click.stop.prevent="addRecipient('plan')" 
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
import draggable from 'vuedraggable';
import ListItem from '~/components/ListItem';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Distribution',
    components: { BaseButton, DatePicker, draggable, ListItem, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            datePickerOptions: {
                format: DATE,
                weekStart: 1,
            },
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            savingPlanDate: false,
            savingPlanRecipient: false,
            savingReportDate: false,
            selectedPlanDate: null,
            selectedReportDate: null,
            showAddPlanRecipientButton: true,
            showAddReportRecipientButton: true,
        }
    },
    computed: {
        computedSavePlanDateButtonDisabled() {
            return !this.selectedPlanDate;
        },
        computedSavePlanRecipientButtonDisabled() {
            return false;
        },
        computedSaveReportDateButtonDisabled() {
            return !this.selectedReportDate;
        },
        planRecipients: {
            get() {
                return this.$store.state.audits[this.audit_id].distribution.plan.recipients;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/distribution/UPDATE_PLAN_RECIPIENTS`, value)
            }
        }
    },
    methods: {
        addRecipient(target) {
            this.$store.commit(`audits/${this.audit_id}/distribution/ADD_RECIPIENT`, target);
            if(target === 'plan') {
                this.showAddPlanRecipientButton = false;
            } else {
                this.showAddReportRecipientButton = false;
            }
        },
        addReportRecipient() {
            console.log('new report recipient');
        },
        cancelEditPlanDate() {
            this.$store.dispatch(`audits/${this.audit_id}/distribution/cancelEditPlanDate`);
            this.selectedPlanDate = null;
        },
        cancelEditPlanRecipient(recipient) {
            this.$store.dispatch(
                `audits/${this.audit_id}/distribution/cancelEditRecipient`,
                {
                    target: 'plan',
                    recipient
                }
            );
            this.showAddPlanRecipientButton = true;
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
        savePlanRecipient(recipient) {
            console.log('save plan recipient', recipient);
        },
        saveReportDate() {
            this.$store.commit(`audits/${this.audit_id}/distribution/SAVE_REPORT_DATE`, this.selectedReportDate);
        }
    }
}
</script>