<template>
    <base-popper
        ref="popper"
        trigger="clickToOpen"
        :appendToBody="true"
        :options="{
            placement: 'bottom-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 2],
                    },
                }
            ]
        }"
    >
        <div class="popper">
            <renderless-calendar 
                ref="calendarView" 
                class="block w-64 p-4 text-xs bg-default border border-gray-300 rounded shadow-md"
                :value="value" 
                :options="options"
                >
                <div
                    slot="MONTH"
                    slot-scope="{ calendar, changeView, moveViewDate, viewData, viewMonth }"
                >
                    <nav class="w-56 grid grid-cols-7">
                        <nav-button icon="angle-double-left" @click="moveViewDate(-1, 'YEAR')" />
                        <nav-button icon="angle-left" @click="moveViewDate(-1, 'MONTH')" />
                        <div class="col-span-3 flex justify-center">
                            <button class="inline-flex items-center h-8 text-blue-600 mr-1" @mouseup="changeView('YEAR')">{{ viewMonth.slice(0,3) }}</button>
                            <button
                                class="inline-flex items-center h-8 text-blue-600"
                                @mouseup="changeView('DECADE')"
                            >
                                {{ calendar.dateCursor.getUTCFullYear() }}
                            </button>
                        </div>
                        <nav-button icon="angle-right" @click="moveViewDate(1, 'MONTH')" />
                        <nav-button icon="angle-double-right" @click="moveViewDate(1, 'YEAR')" />
                    </nav>
                    <header class="w-56 grid grid-cols-7">
                        <div class="flex items-center justify-center w-8 h-8 text-gray-800 select-none" v-for="day in weekdays" :key="day">{{ day.slice(0, 3) }}</div>
                    </header>
                    <main class="w-56 grid grid-cols-7">
                        <div
                            v-for="col in viewData" :key="col.date"
                            @mouseup="onDateClick(col)"
                            class="css-calendar-cell flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-gray-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
                            :class="{
                                'is-selected': col.selected,
                                'is-disabled': col.disabled,
                                'is-inactive': col.inactive,
                                'is-current': col.current,
                            }"
                        >
                            {{ col.label }}
                        </div>

                        <div v-if="type === 'datetime'">
                            <button>datetime</button>
                        </div>
                    </main>
                </div>

                <div
                    slot="YEAR"
                    slot-scope="{ calendar, moveViewDate, setViewDateAndChangeView, viewData }"
                >
                    <nav class="w-56 grid grid-cols-7">
                        <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                        <div class="col-span-5 flex justify-center items-center">{{ calendar.dateCursor.getUTCFullYear() }}</div>
                        <nav-button icon="double-right" @click="moveViewDate(1, 'YEAR')" />
                    </nav>
                    <main class="w-56 grid grid-cols-2 py-4">
                        <div
                            v-for="(month, monthIndex) in viewData"
                            :key="month.label"
                            @mouseup="setViewDateAndChangeView(monthIndex, 'month', 'MONTH')"
                            class="h-8 flex items-center justify-center cursor-pointer text-blue-600"
                            :class="{ 'is-current': month.current }"
                        >
                            {{ month.label }}
                        </div>
                    </main>
                </div>

                <div
                    slot="DECADE"
                    slot-scope="{ moveViewDate, setViewDateAndChangeView, viewData }"
                >
                    <nav class="w-56 grid grid-cols-7">
                        <nav-button icon="double-left" @click="moveViewDate(-10, 'YEAR')" />
                        <div class="col-span-5 flex items-center justify-center">{{ viewData[0].label + ' - ' + viewData[viewData.length-1].label }}</div>
                        <nav-button icon="double-right" @click="moveViewDate(10, 'YEAR')" />
                    </nav>
                    <main class="w-56 grid grid-cols-2 py-8">
                        <div
                            v-for="year in viewData"
                            :key="year.label"
                            @mouseup="setViewDateAndChangeView(year.label, 'year', 'MONTH')"
                            class="h-8 flex items-center justify-center cursor-pointer text-blue-600"
                            :class="{ 'is-current': year.current }"
                        >
                            {{ year.label }}
                        </div>
                    </main>
                </div>
            </renderless-calendar>
        </div>

        <div slot="reference" class="relative inline-flex overflow-hidden pl-3 pr-8 border border-default rounded-md shadow-inner-sm focus-within:shadow-outline focus-within:border-blue-600">
            <formatted-input 
                :value="inputContent" 
                :format="options.format"
                placeholder="2020-01-01" 
                @change="onInputChange"
            />
            <span v-show="!inputValid" class="absolute flex items-center justify-center w-8 h-full right-0 top-0 text-red-500">
                <svg class="inline" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 9.5H7.5V6.5L8.5 6.5V9.5Z"/>
                    <path d="M7.5 11.5H8.5V10.5H7.5V11.5Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49613 2.12854C7.34713 2.21546 7.22315 2.33945 7.13623 2.48845L1.00675 12.9961C0.728465 13.4732 0.889601 14.0855 1.36665 14.3638C1.51959 14.453 1.69347 14.5 1.87052 14.5H14.1295C14.6818 14.5 15.1295 14.0523 15.1295 13.5C15.1295 13.3229 15.0825 13.1491 14.9933 12.9961L8.86378 2.48845C8.60538 2.04547 8.05896 1.87489 7.60026 2.07559L7.49613 2.12854ZM1.87052 13.5L8.00001 2.993L14.1295 13.5H1.87052Z"/>
                </svg>
            </span>
        </div>
    </base-popper>
</template>

<script>
import { loopRange } from "~/utils/array.js";
import { disableWeekday, WEEKDAYS } from "~/utils/time/calendar.js";
import { dateIsValid } from "~/utils/time/dates.js";
import { DATE_TIME } from "~/utils/input-formatting.js";
import BasePopper from '~/components/BasePopper';
import RenderlessCalendar from "~/components/RenderlessCalendar.js";
import NavButton from "./NavButton";
import FormattedInput from '~/components/FormattedInput';

export default {
    name: 'Calendar',
    components: { BasePopper, FormattedInput, NavButton, RenderlessCalendar },
    props: {
        value: {
            type: String,
            required: true,
        },
        options: {
            type: Object,
            required: false
        },
        type: {
            type: String,
            default: 'date',
            validator: function(value) {
                return ['date', 'datetime'].indexOf(value) !== -1;
            }
        }
    },
    data() {
        return {
            inputContent: '2020',
            inputFormat: DATE_TIME,
            inputValid: false,
            defaultOptions: {
                weekStart: 1,
                disabledDate: disableWeekday("sunday")
            },
            popperOpen: false,
            weekdays: null,
        };
    },
    created() {
        this.weekdays = WEEKDAYS.map((day, index) => {
            return WEEKDAYS[
                loopRange(
                    index + this.options.weekStart,
                    WEEKDAYS.length
                )
            ];
        })
    },
    methods: {
        onDateClick(date) {
            if(date.disabled) return;
            const formattedDate = this.formatDate(date.date);
            this.inputValid = (dateIsValid(formattedDate) && formattedDate.length === this.options.format.format.length) || formattedDate.length === 0;
            this.inputContent = formattedDate;
            this.$emit('change', formattedDate);
            this.$refs.popper.doClose();
        },

        onInputChange(value) {
            const currentValidity = this.inputValid;
            this.inputValid = (dateIsValid(value) && value.length === this.options.format.format.length) || value.length === 0;
            this.inputContent = value;

            if(!currentValidity && this.inputValid) this.$emit('change', this.inputContent);
            else if(currentValidity && !this.inputValid) this.$emit('change', null);
        },

        formatDate(date) {
            const d = new Date(date);
            return d.toISOString().substr(0, 10).replace('T', ' ');
        }
    }
}
</script>