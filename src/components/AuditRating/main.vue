<template>
    <div class="flex max-w-4xl">
        <div class="flex-1 hidden md:flex flex-col border-r-2 border-white">
            <div class="flex-1 bg-gray-200 border-b-2 border-white">
            </div>
            <div class="flex-0 flex items-center justify-end px-4 h-10 bg-gray-200 text-gray-600 text-sm font-bold">
                Total evaluation of the unit
            </div>
        </div>
        <div class="flex-0 inline-block border-r-2 border-white">
            <div class="flex items-center justify-center w-full h-20 bg-gray-200 text-gray-600 text-center text-sm font-bold border-b-2 border-white">
                Overall rating
            </div>
            <div class="flex">
                <rating-label v-for="option in auditRatingOptions" :key="option">{{ option }}</rating-label>
            </div>
            <div class="w-full flex border-t-2 border-white">
                <rating-button v-for="option in auditRatingOptions" :key="option" :active="option === rating" @click="$emit('rating-changed', option)" />
            </div>
        </div>
        <div class="flex-0 inline-block border-r-2 border-white">
            <div class="flex items-center justify-center w-full h-20 bg-gray-200 text-gray-600 text-center text-sm font-bold border-b-2 border-white">
                Number and<br>severity<br>of findings
            </div>
            <div class="flex">
                <rating-label v-for="option in severityLevelOptions" :key="option">{{ option }}</rating-label>
            </div>
            <div class="w-full flex border-t-2 border-white">
                <div class="flex items-center justify-center h-10 w-1/3 bg-blue-200 text-sm text-secondary border-r border-white">
                    {{ $store.getters[`audits/${audit_id}/findings/numberOfMinorFindings`] }}
                </div>
                <div class="flex items-center justify-center h-10 w-1/3 bg-yellow-500 text-sm text-secondary border-r border-white">
                    {{ $store.getters[`audits/${audit_id}/findings/numberOfMajorFindings`] }}
                </div>
                <div class="flex items-center justify-center h-10 w-1/3 bg-red-700 text-sm text-white border-none">
                    {{ $store.getters[`audits/${audit_id}/findings/numberOfCriticalFindings`] }}
                </div>
            </div>
        </div>
        <div class="flex-0 inline-block">
            <div class="flex items-center justify-center w-full h-20 bg-gray-200 text-gray-600 text-center text-sm font-bold border-b-2 border-white"></div>
            <div class="flex">
                <rating-label>Suggestions</rating-label>
            </div>
            <div class="w-full flex border-t-2 border-white">
                <div class="flex items-center justify-center h-10 w-full bg-gray-200 text-sm text-secondary border-none">
                    {{ $store.state.audits[audit_id].suggestions.items.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { AUDIT_RATINGS, SEVERITY_LEVELS } from '~/enums';
import RatingButton from './RatingButton';
import RatingLabel from './RatingLabel';

export default {
    name: 'AuditRating',
    components: { RatingButton, RatingLabel },
    props: {
        rating: {
            type: String,
            validator: value => {
                return Object.values(AUDIT_RATINGS).indexOf(value) !== -1;
            }
        }
    },
    data() {
        return {
            audit_id: this.$route.params.audit,
            auditRatingOptions: Object.values(AUDIT_RATINGS),
            severityLevelOptions: Object.values(SEVERITY_LEVELS),
        }
    },
}
</script>