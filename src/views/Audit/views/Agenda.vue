<template>
    <view-content title="Agenda" icon="clock">
        <div v-if="$store.state.audits[audit_id].team.items.length === 0">
            <div class="flex items-center text-sm text-default mb-2">
                <span>Add memebers to the</span>
                <router-link 
                    :to="{ name: 'Audit team', params: { audit: audit_id }}"
                    class="inline-flex items-center py-2 px-3 mx-1 space-x-2 rounded-lg text-action hover:bg-gray-100 focus:shadow-outline"
                    >
                    <icon value="team" />
                    <span class="text-sm">Audit team</span>
                </router-link>
                <span>before you can create the Agenda</span>
            </div>
        </div>
        <div v-else>
            <div
                v-for="date in $store.getters[`audits/${audit_id}/team/getAllDatesChronologically`]" 
                :key="date.uiState.listId"
                class="mb-8"
                >
                <!-- DATE -->
                <list-item
                    deletable
                    editable
                    :edit="date.uiState.edit"
                    @edit="onDateEdit(date)"
                    @delete="onDateDelete(date)"
                    >
                    <div class="flex items-center space-x-2 text-primary">
                        <icon value="calendar" />
                        <span class="font-bold">{{ date.data.date }}</span>
                    </div>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <date-picker 
                                ref="datepicker"
                                type="date"
                                :value="selectedDate" 
                                :options="options" 
                                @change="onDateChange" 
                                />
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

                <div v-if="date.id">
                    <div
                        v-for="user in $store.state.audits[audit_id].team.items" 
                        :key="user.id"
                        class="pl-4 md:pl-8 py-4 "
                        >
                        <!-- USER -->
                        <list-item>
                            <span class="font-bold">
                                <icon value="user" class="mr-2 text-secondary" />
                                {{ `${user.data.initials} (${user.data.name}) - ${user.data.role}` }}
                            </span>
                        </list-item>


                        <!-- DATE -> USER -> ACTIVITIES -->
                        <div 
                            v-for="activity in $store.getters[`audits/${audit_id}/team/dateUserActivities`](date, user)" 
                            :key="activity.uiState.listId"
                            class="flex justify-between items-stretch py-1 pl-4 md:pl-8 bg-default text-sm text-primary"
                            >
                            <list-item  
                                deletable
                                editable
                                :edit="activity.uiState.edit"
                                @edit="onActivityEdit(activity)"
                                @delete="onActivityDelete(user, activity)"
                                >
                                <div class="block md:flex items-center w-full">
                                    <div class="flex items-center w-full md:w-1/5">
                                        <icon value="clock" class="mr-2" />
                                        <span class="">{{ activity.data.start_time }}</span>
                                        <icon value="arrow-right" class="mx-1" />
                                        <span class="">{{ activity.data.end_time }}</span>
                                    </div>
                                    <div class="pl-6 md:pl-0 block md:inline-block w-full md:w-4/5" v-html="activity.data.description"></div>
                                </div>

                                <template #edit>
                                    <div class="flex w-full pr-0 md:pr-16 my-2">
                                        <time-range-input
                                            ref="timeRangeInput"
                                            :range="activityTimeRange" 
                                            @change="onTimeRangeChange"
                                            />
                                        <div class="ml-2 flex-1">
                                            <text-editor 
                                                ref="activityDescriptionEditor" 
                                                emphasis
                                                inline
                                                minimal
                                                class="w-full"
                                                :content="activityDescription" 
                                                @change="onActivityDescriptionChange" 
                                                />
                                        </div>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <base-button 
                                            ref="saveActivityButton"
                                            icon="plus"
                                            type="primary"
                                            :disabled="computedSaveActivityButtonDisabled"
                                            :loading="savingActivity" 
                                            @click.stop.prevent="saveUserActivity(date, user, activity)" 
                                        >
                                            {{ activity.id ? 'Update activity' : 'Add activity' }}
                                        </base-button>
                                        <base-button @click="cancelEditUserActivity(user, activity)" plain type="primary">Cancel</base-button>
                                    </div>
                                </template>
                            </list-item>
                        </div>

                        <div class="py-3 pl-4 md:pl-8" v-if="$store.getters[`audits/${audit_id}/team/showDateUserAddActivityButton`](date, user)">
                            <base-button 
                                icon="plus"
                                plain 
                                text
                                type="primary" 
                                @click.stop.prevent="onAddNewActivity(date, user)" 
                                >
                                Add activity
                            </base-button>
                        </div>
                    </div>
                </div>


                <!-- Add new date button -->
            </div>
            <div class="" v-if="showAddNewDateButton">
                <base-button 
                    icon="plus"
                    plain 
                    ref="addNewDateButton"
                    type="primary" 
                    @click.stop.prevent="onAddNewDate" 
                    >
                    Add date
                </base-button>
            </div>
        </div>


        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit focus areas' }" icon="crosshair" label="Focus Areas" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit information requests' }" icon="information" label="Info. Requests" placement="right" />
        </template>
    </view-content>
</template>

<script>
import { DATE } from "~/utils/input-formatting.js";
import BaseButton from '~/components/BaseButton';
import DatePicker from '~/components/DatePicker/main';
import Icon from '~/components/Icon';
import ListItem from '~/components/ListItem';
import TextEditor from '~/components/TextEditor';
import TimeRangeInput from '~/components/TimeRangeInput';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Agenda',
    components: { BaseButton, DatePicker, Icon, ListItem, TextEditor, TimeRangeInput, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            activityDescription: '',
            activityTimeRange: this.getEmptyActivityTimeRange(),
            options: {
                format: DATE,
                weekStart: 1,
            },
            savingActivity: false,
            savingDate: false,
            selectedDate: null,
            showAddNewDateButton: true,
            showAddNewActivityButton: true,
        }
    },
    computed: {
        computedSaveActivityButtonDisabled() {
            return !(this.activityTimeRange.valid && this.activityDescription.length > 0);
        },
        computedSaveDateButtonDisabled() {
            return this.selectedDate === null ? true : false;
        },
    },
    methods: {
        cancelEditDate(date) {
            if(!date) return;

            this.selectedDate = null;
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditDate`, date);

            setTimeout(() => this.showAddNewDateButton = true, 20);
        },

        cancelEditUserActivity(user, activity) {
            if(!activity) return;

            this.activityTimeRange = this.getEmptyActivityTimeRange();
            this.activityDescription = '';
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditUserActivity`, {user ,activity});

            setTimeout(() => this.showAddNewActivityButton = true, 20);
        },

        getEmptyActivityTimeRange() {
            return { from: null, to: null, valid: false };
        },

        onActivityDelete(user, activity) {
            this.$store.commit(`audits/${this.audit_id}/team/DELETE_USER_ACTIVITY`, { user, activity });
        },

        onActivityEdit(activity) {
            this.activityTimeRange = {
                from: activity.data.start_time,
                to: activity.data.end_time,
                valid: true,
            };
            this.activityDescription = activity.data.description;
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditUserActivities`);
            this.showAddNewActivityButton = false;
            activity.uiState.edit = true;
        },

        onActivityDescriptionChange(value) {
            this.activityDescription = value;   
        },

        onAddNewActivity(date, user) {
            this.showAddNewActivityButton = false;
            this.activityTimeRange = this.getEmptyActivityTimeRange();
            this.activityDescription = '';
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditUserActivities`);
            this.$store.dispatch(`audits/${this.audit_id}/team/addUserActivity`, {date, user})
            this.$nextTick(() => {
                this.$refs.timeRangeInput[0].focus();
            });
        },

        onAddNewDate() {
            this.$store.commit(
                `audits/${this.audit_id}/team/ADD_EMPTY_DATE`
            );
            this.showAddNewDateButton = false;
            this.$nextTick(() => this.$refs.datepicker[0].focus());
        },

        onDateChange(date) {
            this.selectedDate = date;
        },

        onDateDelete(date) {
            this.$store.dispatch(`audits/${this.audit_id}/team/deleteDate`, date);
        },

        onDateEdit(date) {
            this.selectedDate = date.data.date;
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditDates`);
            this.showAddNewDateButton = false;
            date.uiState.edit = true;
        },

        onTimeRangeChange(range) {
            this.activityTimeRange = range;
        },

        saveUserActivity(date, user, activity) {
            this.savingActivity = true;
            setTimeout(() => {
                this.$store.dispatch(
                    `audits/${this.audit_id}/team/saveUserActivity`, 
                    {
                        user, 
                        activity: {
                            id: activity.id,
                            data: {
                                date: date.data.date,
                                start_time: this.activityTimeRange.from,
                                end_time: this.activityTimeRange.to,
                                description: this.activityDescription
                            },
                            uiState: activity.uiState
                        }
                    }
                );
                this.activityDescription = '';
                this.activityTimeRange = this.getEmptyActivityTimeRange();
                this.savingActivity = false;
                this.showAddNewActivityButton = true;

                // this.$nextTick(() => {
                //     this.$refs.addNewDateButton.$el.focus();
                // });
            }, 1000);
        },


        saveDate() {
            this.savingDate = true;
            setTimeout(() => {
                this.$store.dispatch(`audits/${this.audit_id}/team/saveDate`, this.selectedDate);
                this.selectedDate = null;
                this.savingDate = false;
                this.showAddNewDateButton = true;

                // this.$nextTick(() => {
                //     this.$refs.addNewDateButton.$el.focus();
                // });
            }, 1000);
        }
    }
}
</script>