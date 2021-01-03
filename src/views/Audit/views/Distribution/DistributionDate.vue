<template>
    <div class="w-full mt-8">
        <header class="w-full border-b border-subtle text-sm text-brand font-bold">
            <span class="capitalize">{{ target }}</span>
            {{ ' distribution date and recipients' }}
        </header>
        <list-item
            v-if="$store.state.audits[audit_id].distribution[target].date"
            editable
            :edit="$store.state.audits[audit_id].distribution[target].date.uiState.edit"
            @edit="editDate"
            >
            <div class="flex items-center space-x-2">
                <icon value="calendar" />
                <span class="font-medium">
                    {{ $store.state.audits[audit_id].distribution[target].date.data.date }}
                </span>
            </div>

            <template #edit>
                <div class="flex pr-0 md:pr-16 mb-2">
                    <date-picker 
                        ref="datepicker"
                        type="date"
                        :value="selectedDate" 
                        :options="datePickerOptions" 
                        @change="onDateChange" 
                        />
                </div>
                <div class="flex items-center space-x-2">
                    <base-button 
                        ref="savePlanDateButton"
                        icon="plus"
                        type="primary"
                        :disabled="computedSaveDateButtonDisabled"
                        :loading="savingDate" 
                        @click.stop.prevent="saveDate" 
                    >
                        {{ $store.state.audits[audit_id].distribution[target].date.id ? 'Update date' : 'Save date' }}
                    </base-button>
                    <base-button @click="cancelEditDate" plain type="primary">Cancel</base-button>
                </div>
            </template>
        </list-item>
        <base-button
            v-else
            icon="plus"
            plain 
            text
            ref="addPlanDateButton"
            type="primary" 
            class="mt-2"
            @click.stop.prevent="addDate" 
            >
            Add date
        </base-button>
    </div>
</template>

<script>
import { DATE } from "~/utils/input-formatting.js";
import BaseButton from '~/components/BaseButton';
import DatePicker from '~/components/DatePicker/main';
import ListItem from '~/components/ListItem';

export default {
    name: 'DistributionDate',
    components: { BaseButton, DatePicker, ListItem },
    props: {
        target: {
            type: String,
            required: true,
            validator: value => {
                return ['plan', 'report'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        computedSaveDateButtonDisabled() {
            return !this.selectedDate;
        }
    },
    data() {
        return {
            audit_id: this.$route.params.audit,
            datePickerOptions: {
                format: DATE,
                weekStart: 1,
            },
            savingDate: false,
            selectedDate: null,
        }
    },
    methods: {
        addDate() {
            this.$store.commit(`audits/${this.audit_id}/distribution/ADD_DATE`, this.target);
            this.$nextTick(() => this.$refs.datepicker.focus());
        },
        cancelEditDate() {
            this.$store.dispatch(`audits/${this.audit_id}/distribution/cancelEditDate`, this.target);
            this.selectedDate = null;
        },
        editDate() {
            this.selectedDate = this.$store.state.audits[this.audit_id].distribution[this.target].date.data.date;
            this.$store.commit(`audits/${this.audit_id}/distribution/EDIT_DATE`, this.target);
        },
        onDateChange(date) {
            this.selectedDate = date;
        },
        saveDate() {
            this.$store.commit(
                `audits/${this.audit_id}/distribution/SAVE_DATE`, 
                {
                    target: this.target,
                    date: this.selectedDate
                } 
            )
        },
    }
}
</script>