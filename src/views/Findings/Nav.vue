<template>
    <nav class="px-6 pb-6 pt-20 md:p-6">
        <div class="flex items-center text-blue-900">
            <icon value="sort-down" />
            <span class="ml-2 font-medium text-sm">Sort by</span>
        </div>
        <div class="flex items-center text-blue-900">
            <icon value="filter" />
            <span class="ml-2 font-medium text-sm">Filters</span>
        </div>
    </nav>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'Nav',
    components: { Icon }
}
</script>

<style lang="scss" scoped>

.link {
    @apply flex items-center px-3 py-2 mb-1 bg-transparent font-light text-gray-600 rounded-lg;

    &.is-active {
        @apply bg-gray-200 font-medium text-blue-900;
    }

    &:hover {
        @apply bg-gray-200;
    }
}

</style>