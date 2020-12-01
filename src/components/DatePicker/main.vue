<template>
    <base-popper
        ref="popper"
        trigger="soft"
        :appendToBody="true"
        :forceShow="visible"
        :options="popperOptions"
    >
        <div class="popper">
            <renderless-calendar 
                ref="calendarView" 
                class="block w-64 p-4 text-xs bg-default border border-gray-300 rounded shadow-md"
                :value="value" 
                :options="options"
                v-clickoutside="handleClose"
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

        <div 
            slot="reference" 
            class="relative inline-flex overflow-hidden pl-3 pr-8 border border-default rounded-md focus-within:shadow-outline focus-within:border-action"
            :class="{ 'shadow-outline border-action' : visible, 'shadow-inner-sm' : !visible }"
            @click="focus"
            >
            <formatted-input 
                ref="input"
                :value="inputContent" 
                :format="options.format"
                placeholder="eg. 2020-01-01" 
                @focus="visible = true"
                @change="onInputChange"
            />
            <span v-show="!inputValid" class="absolute flex items-center justify-center w-8 h-full right-0 top-0 text-red-500">
                <tooltip placement="bottom">
                    <icon value="warning" />
                    <span slot="message">Invalid date.<br>Use this format<br><strong>2020-12-31</strong></span>
                </tooltip>
            </span>
        </div>
    </base-popper>
</template>

<script>
import Clickoutside from '~/utils/click-outside';
import { loopRange } from "~/utils/array.js";
import { WEEKDAYS } from "~/utils/time/calendar.js";
import { dateIsValid } from "~/utils/time/dates.js";
import { DATE_TIME } from "~/utils/input-formatting.js";
import BasePopper from '~/components/BasePopper';
import Icon from '~/components/Icon';
import RenderlessCalendar from "~/components/RenderlessCalendar.js";
import NavButton from "./NavButton";
import FormattedInput from '~/components/FormattedInput';
import Tooltip from '~/components/Tooltip';

export default {
    name: 'Calendar',
    components: { BasePopper, FormattedInput, Icon, NavButton, RenderlessCalendar, Tooltip },
    directives: { Clickoutside },
    props: {
        value: {
            type: [ String, Date ],
            required: false,
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
            inputContent: null,
            inputFormat: DATE_TIME,
            inputValid: false,
            defaultOptions: {
                weekStart: 1,
            },
            popperOpen: false,
            popperOptions: {
                placement: 'bottom-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 2],
                        },
                    }
                ]
            },
            visible: false,
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
        handleClose() {
            this.visible = false;
        },

        onDateClick(date) {
            if(date.disabled) return;
            const formattedDate = this.formatDate(date.date);
            this.inputValid = (dateIsValid(formattedDate) && formattedDate.length === this.options.format.format.length) || formattedDate.length === 0;
            this.inputContent = formattedDate;
            this.$emit('change', formattedDate);
            this.visible = false;
            // this.$refs.popper.doClose();
        },

        onInputChange(value) {
            const currentValidity = this.inputValid;
            this.inputValid = (dateIsValid(value) && value.length === this.options.format.format.length) || value.length === 0;
            this.inputContent = value;

            if(!currentValidity && this.inputValid) this.$emit('change', this.inputContent);
            else if(currentValidity && !this.inputValid) this.$emit('change', null);
        },

        focus() {
            this.$refs.input.focus();
            this.visible = true;
        },

        formatDate(date) {
            const d = new Date(date);
            return d.toISOString().substr(0, 10).replace('T', ' ');
        }
    }
}
</script>