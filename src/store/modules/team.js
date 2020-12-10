import Vue from 'vue';
import crud from './crud';
import { dateIsAfter, dateIsBefore, stringifyDate } from '~/utils/time/dates';
import { timeToDecimal } from '~/utils/time/time';
import { setNestedProp } from '~/utils/vue';
import { ROLES } from '~/constants';

export default {
    namespaced: true,
    actions: {
        ...crud.actions,

        addEmptyDate({commit, getters}, date) {
            // check that dates doesn't exist already
            if(!getters.getAllDatesChronologically.find(d => d === date.data.date)) {
                commit('ADD_EMPTY_DATE') 
            }
        },

        addUserActivity({commit}, {date, user}) {
            // unedit everyone else
            const activity = {
                id: null,
                data: {
                    description: '',
                    date: date.data.date,
                    start_time: null,
                    end_time: null,
                },
                uiState: {
                    edit: true,
                    listId: Date.now()
                }
            };
            commit('ADD_USER_ACTIVITY', {user, activity})
        },

        cancelEditUserActivity({commit}, {user, activity}) {
            if(!activity.id) {
                commit('DELETE_USER_ACTIVITY', {user, activity});
            } else if(activity.uiState.edit) {
                commit('CANCEL_EDIT_USER_ACTIVITY', activity);
            }
        },

        cancelEditUserActivities({state, dispatch}) {
            state.items.forEach(user => {
                user.data.activities.forEach(activity => {
                    dispatch('cancelEditUserActivity', { user, activity });
                });
            });
        },

        cancelEditDate({commit}, date) {
            if(!date.id) {
                commit('DELETE_DATE', date);
            } else if(date.uiState.edit) {
                commit('CANCEL_EDIT_DATE', date);
            }
        },

        cancelEditDates({dispatch, getters}) {
            getters.getAllDatesChronologically.forEach(date => {
                dispatch('cancelEditDate', date);
            });
        },

        /**
         * When a date is edited in the UI, all activities within that date needs to be updated 
         */
        changeDate({commit, state}, {oldDate, newDate}) {
            state.items.forEach(user => {
                user.data.activities.forEach(activity => {
                    if(activity.data.date === oldDate) {
                        commit('UPDATE_ACTIVITY_DATE', {activity, date: newDate});
                    }
                })
            });
        },

        deleteDate({commit, state}, date) {
            let target = state.emptyDates.find(d => d.id === date.id);
            if(target) {
                commit('DELETE_EMPTY_DATE', target);
                return;
            }
            state.items.forEach(user => {
                user.data.activities.forEach(activity => {
                    if(activity.data.date === date.data.date) {
                        commit('DELETE_USER_ACTIVITY', { user, activity });
                    }
                })
            });
        },

        saveUserActivity({commit, state}, { user, activity}) {
            const dateToBeDeleted = state.emptyDates.find(date => {
                return date.data.date === activity.data.date;
            });
            if(dateToBeDeleted) {
                commit('DELETE_EMPTY_DATE', activity.data.date);
            }

            commit('SAVE_USER_ACTIVITY', {user, activity});
        },

        saveDate({commit, dispatch, getters}, date) {
            const editedDate = getters.getAllDatesChronologically.find(date => date.uiState.edit);
            if(!editedDate) {
                console.error('cant save date');
                return;
            }
            if(!editedDate.id) {
                commit('SAVE_DATE', { date: editedDate, value: date });
            } else {
                dispatch('changeDate', {
                    oldDate: editedDate.data.date,
                    newDate: date
                });
            }
        }
    },
    getters: {
        ...crud.getters,
        dateUserActivities: () => (date, user) => {
            return user.data.activities
                .filter(activity => activity.data.date === date.data.date)
                .sort((a,b) => {
                    if(!a.id) return 1;
                    if (timeToDecimal(a.data.start_time) < timeToDecimal(b.data.start_time)) return -1;
                    if (timeToDecimal(a.data.start_time) > timeToDecimal(b.data.start_time)) return 1;
                    return 0;
                });
        },
        getAllDatesChronologically: state => {
            // chronological list with combined dates from user activities and state.openDates
            // also use for disabling dates in DatePicker..
            const uniqueDates = state.emptyDates.map(date => date);
            state.items.forEach(user => {
                user.data.activities.forEach(activity => {
                    const dateString = stringifyDate(activity.data.date);
                    if(dateString && !uniqueDates.map(date => date.data.date).includes(dateString)) {
                        uniqueDates.push({
                            id: dateString,
                            data: { date: dateString },
                            uiState: {
                                edit: false,
                                listId: activity.id,
                                selected: false
                            }
                        });
                    }
                })
            })
            return uniqueDates.sort((a,b) => {
                if(!b.id) return -1;
                if (dateIsBefore(a.data.date, b.data.date)) return -1;
                if (dateIsAfter(a.data.date, b.data.date)) return 1;
                return 0;
            });
        },
        leadAuditors: state => {
            const leadAuditors = state.items
                .filter(user => user.data.role === ROLES.LEAD_AUDITOR)
                .map(leadAuditor => leadAuditor.data.initials)
            if(leadAuditors.length > 0) {
                return leadAuditors.join(', ');
            }
            return null;
        }
    },
    mutations: {
        ...crud.mutations,
        ADD_EMPTY_DATE(state) {
            state.emptyDates.push({
                id: null,
                data: {
                    date: null,
                },
                uiState: {
                    edit: true,
                    listId: Date.now(),
                    selected: false
                }
            });
        },
        ADD_USER_ACTIVITY(state, {user, activity}) {
            user.data.activities.push(activity);
        },
        CANCEL_EDIT_DATE(state, date) {
            setNestedProp(
                date,
                'uiState.edit', 
                false
            );
        },
        CANCEL_EDIT_USER_ACTIVITY(state, activity) {
            setNestedProp(
                activity,
                'uiState.edit', 
                false
            );
        },
        CLOSE_DATE(state, date) {
            Vue.set(date.uiState, 'edit', false);
        },
        DELETE_USER_ACTIVITY(state, {user, activity}) {
            const activityIndex = user.data.activities.findIndex(a => a.id === activity.id);
            Vue.delete(user.data.activities, activityIndex);
        },
        DELETE_DATE(state, date) {
            if(!date.id && !date.data.date) {
                Vue.delete(
                    state.emptyDates,
                    state.emptyDates.findIndex(d => d.uiState.edit)
                )
            }
        },
        DELETE_EMPTY_DATE(state, date) {
            const index = state.emptyDates.findIndex(d => d.data.date === date);
            Vue.delete(state.emptyDates, index);
        },
        SAVE_DATE(state, {date, value}) {
            Vue.set(date, 'id', Date.now());
            Vue.set(date.data, 'date', value);
            Vue.set(date.uiState, 'edit', false);
        },
        SAVE_USER_ACTIVITY(state, {user, activity}) {
            Vue.set(
                user.data.activities, 
                user.data.activities.findIndex(a => a.uiState.edit), 
                {
                    id: Date.now(),
                    data: activity.data,
                    uiState: {
                        edit: false,
                        listId: activity.uiState.listId,
                        selected: false
                    }
                }
            )
        },
        /**
         * Update date on single activity. 
         * Used by 'changeDate' action to set multiple activities grouped under a single date
         */
        UPDATE_ACTIVITY_DATE(state, {activity, date}) {
            setNestedProp(activity, 'data.date', date);
        },
        UPDATE_DATE_ATTRIBUTE(state, {date, attribute, value}) {
            setNestedProp(date, attribute, value);
        }
    },
    state: () => ({
        ...crud.state(),
        emptyDates: [], // emptyDates contains dates that doesn't yet have any activities
    })
};