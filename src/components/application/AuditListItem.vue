<template>
    <router-link 
        tag="div" 
        :to="{ name: 'Audit details', params: { audit: audit.id }}"
        class="flex items-center px-2 py-4 border-b border-subtle cursor-pointer hover:bg-blue-100"
        >
        <div class="flex items-center w-32 space-x-2">
            <icon value="id" />
            <span class="text-sm">{{ 'AU1001234' }}</span>
        </div>
        <div class="flex items-center w-32 space-x-2">
            <icon value="calendar" />
            <span class="text-sm">{{ computedAgendaStartDate }}</span>
        </div>
        <div class="flex items-center w-20 space-x-2">
            <icon value="authority" />
            <span class="text-sm">{{ $store.getters[`audits/${audit.id}/team/leadAuditors`] }}</span>
        </div>
        <div class="flex items-center w-1/6 space-x-2">
            <icon value="building" />
            <span class="text-sm">{{ 'no unit' }}</span>
        </div>
        <div class="flex items-center space-x-2 bg-gray-200 text-primary py-1 px-3 rounded-lg mr-2">
            <icon value="index-finger-right" />
            <span class="text-sm">{{ $store.state.audits[audit.id].findings.items.length }}</span>
        </div>
        <div class="flex items-center space-x-2 bg-gray-200 text-primary py-1 px-3 rounded-lg">
            <icon value="index-finger-up" />
            <span class="text-sm">{{ $store.state.audits[audit.id].suggestions.items.length }}</span>
        </div>
    </router-link>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'AuditListItem',
    components: { Icon },
    props: {
        audit: {
            type: Object,
            required: true
        }
    },
    computed: {
        computedAgendaStartDate() {
            if(this.$store.getters[`audits/${this.audit.id}/team/getAllDatesChronologically`].length > 0) {
                return this.$store.getters[`audits/${this.audit.id}/team/getAllDatesChronologically`][0].data.date;
            }
            return 'no date';
        }
    },
}
</script>