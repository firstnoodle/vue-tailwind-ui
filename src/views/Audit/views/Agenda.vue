<template>
    <view-content title="Agenda" icon="clock">

        <date-picker 
            type="datetime"
            :value="date" 
            :options="options" 
            @change="onDateChange" 
            />


        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit focus areas' }" icon="crosshair" label="Focus Areas" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit information requests' }" icon="information" label="Info. Requests" placement="right" />
        </template>
    </view-content>
</template>

<script>
// import { arrowKeys } from "./utils/keyboard.js";
import { DATE/* , DATE_TIME */ } from "~/utils/input-formatting.js";
import { disableWeekday, WEEKDAYS } from "~/utils/time/calendar.js";
import { loopRange } from "~/utils/array.js";
import DatePicker from '~/components/DatePicker/main';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

/**
 * DatePicker
 *   main
 *   
 * Calendar
 *   main (renderless)
 *   calendar
 */

export default {
    name: 'Agenda',
    components: { DatePicker, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            date: "2020-11-18",
            inputContent: '2020',
            inputFormat: DATE,
            inputValid: false,
            options: {
                format: DATE,
                disabledDate: disableWeekday("sunday"),
                weekStart: 1,
            },
            weekdays: null,
        }
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
        onDateChange(date) {
            console.log(date);
            this.date = date;
        },
    }
}
</script>