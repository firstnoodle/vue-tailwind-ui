<template>
    <div class="flex flex-col h-full">
        <section-header icon="information">Information requests</section-header>

        <div class="py-20">Content</div>

        <section-footer>
            <router-link :to="{ name: 'Agenda' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="angle-left" class="text-gray-500 mr-2" />
                <icon value="clock" class="text-action mr-2" />
                <span class="text-action text-sm">Agenda</span>
            </router-link>
            <router-link :to="{ name: 'Findings' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="index-finger-right" class="text-action mr-2" />
                <span class="text-action text-sm">Findings</span>
                <icon value="angle-right" class="text-gray-500 ml-2" />
            </router-link>
        </section-footer>
    </div>
</template>

<script>
import SectionFooter from '~/components/application/SectionFooter';
import SectionHeader from '~/components/application/SectionHeader';

export default {
    name: 'InformationRequests',
    components: { SectionFooter, SectionHeader }
}
</script>