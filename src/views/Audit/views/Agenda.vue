<template>
    <view-content title="Agenda" icon="clock">

        <date-picker 
            ref="datepicker"
            type="date"
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
import { DATE } from "~/utils/input-formatting.js";
import DatePicker from '~/components/DatePicker/main';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Agenda',
    components: { DatePicker, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            date: null,
            options: {
                format: DATE,
                weekStart: 1,
            },
        }
    },
    methods: {
        onDateChange(date) {
            this.date = date;
        },
    }
}
</script>