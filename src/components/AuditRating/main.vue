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
                <rating-label>Not meeting<br>standards</rating-label>
                <rating-label>Low</rating-label>
                <rating-label>Satisfactory</rating-label>
                <rating-label>High</rating-label>
                <rating-label>Outstanding</rating-label>
            </div>
            <div class="w-full flex border-t-2 border-white">
                <rating-button v-for="option in options" :key="option" :active="selectedOption === option" @click="selectedOption = option" />
            </div>
        </div>
        <div class="flex-0 inline-block">
            <div class="flex items-center justify-center w-full h-20 bg-gray-200 text-gray-600 text-center text-sm font-bold border-b-2 border-white">
                Number and<br>severity<br>of findings
            </div>
            <div class="flex">
                <rating-label>Critical</rating-label>
                <rating-label>Major</rating-label>
                <rating-label>Minor</rating-label>
            </div>
            <div class="w-full flex border-t-2 border-white">
                <div class="flex items-center justify-center h-10 w-1/3 bg-red-700 text-sm text-white border-r border-white">1</div>
                <div class="flex items-center justify-center h-10 w-1/3 bg-yellow-500 text-sm text-secondary border-r border-white">4</div>
                <div class="flex items-center justify-center h-10 w-1/3 bg-blue-200 text-sm text-secondary border-none">2</div>
            </div>
        </div>
    </div>
</template>

<script>
import RatingButton from './RatingButton';
import RatingLabel from './RatingLabel';

export default {
    name: 'AuditRating',
    components: { RatingButton, RatingLabel },
    data() {
        return {
            options: [
                "Not meeting standards",
                "Low",
                "Satisfactory",
                "High",
                "Outstanding"
            ],
            selectedOption: null,
        }
    },
}
</script>

<style lang="scss" scoped>
.audit-rating {
    @apply flex;

    &__item {
        @apply bg-gray-200 border-r border-white relative;
        height: 115px;
        width: 54px;

        &:last-child {
            @apply border-none;
        }
    }
    &__item-label {
        @apply absolute left-0 flex items-center text-gray-600 text-sm font-light pl-2 transform origin-top-left -rotate-90;
        bottom: -54px;
        height: 54px;
        margin: 0 !important;
        width: 115px;
    }
}
</style>