<template>
    <nav class="px-6 pb-6 pt-20 md:p-6">

        <router-link :to="{ name: 'Audit details' }" tag="a" class="link" exact>
            <icon value="phase" />
            <span class="ml-4 text-sm">Audit details</span>
        </router-link>
        <router-link :to="{ name: 'Audit distribution' }" tag="a" class="link" exact>
            <icon value="arrow-fat-right" />
            <span class="ml-4 text-sm">Distribution</span>
        </router-link>

        <div class="flex items-center py-2 mt-2">
            <span class="text-xs font-medium mr-2 text-gray-500">Planning</span>
            <span class="inline-block w-full border-b border-gray-400"></span>
        </div>
        <router-link :to="{ name: 'Audit auditee' }" tag="a" class="link">
            <icon value="building" />
            <span class="ml-4 text-sm">Auditee</span>
        </router-link>
        <router-link :to="{ name: 'Audit team' }" tag="a" class="link">
            <icon value="team" />
            <span class="ml-4 text-sm">Audit team</span>
        </router-link>
        <router-link :to="{ name: 'Audit requirements' }" tag="a" class="link">
            <icon value="itenary" />
            <span class="ml-4 text-sm">Requirements</span>
        </router-link>
        <router-link :to="{ name: 'Audit scope' }" tag="a" class="link">
            <icon value="scope" />
            <span class="ml-4 text-sm">Scope</span>
        </router-link>
        <router-link :to="{ name: 'Audit focus areas' }" tag="a" class="link">
            <icon value="crosshair" />
            <span class="ml-4 text-sm">Focus Areas</span>
        </router-link>
        <router-link :to="{ name: 'Audit agenda' }" tag="a" class="link">
            <icon value="clock" />
            <span class="ml-4 text-sm">Agenda</span>
        </router-link>
        <router-link :to="{ name: 'Audit information requests' }" tag="a" class="link">
            <icon value="information" />
            <span class="ml-4 text-sm">Info. Requests</span>
        </router-link>

        <div class="flex items-center py-2 mt-2">
            <span class="text-xs font-medium mr-2 text-gray-500">Reporting</span>
            <span class="inline-block w-full border-b border-gray-400"></span>
        </div>
        <router-link :to="{ name: 'Audit findings' }" tag="a" class="link">
            <icon value="index-finger-right" />
            <span class="ml-4 text-sm">Findings</span>
        </router-link>
        <router-link :to="{ name: 'Audit suggestions' }" tag="a" class="link">
            <icon value="index-finger-up" />
            <span class="ml-4 text-sm">Suggestions</span>
        </router-link>
        <router-link :to="{ name: 'Audit conclusion' }" tag="a" class="link">
            <icon value="conclusion" />
            <span class="ml-4 text-sm">Conclusion</span>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
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