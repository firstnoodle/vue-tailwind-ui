<template>
    <div class="flex flex-col h-full">
        <section-header icon="crosshair">Focus Areas</section-header>

        <div class="py-20">Content</div>

        <section-footer>
            <router-link :to="{ name: 'Scope' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="angle-left" class="text-gray-500 mr-2" />
                <icon value="scope" class="text-action mr-2" />
                <span class="text-action text-sm">Scope</span>
            </router-link>
            <router-link :to="{ name: 'Agenda' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="clock" class="text-action mr-2" />
                <span class="text-action text-sm">Agenda</span>
                <icon value="angle-right" class="text-gray-500 ml-2" />
            </router-link>
        </section-footer>
    </div>
</template>

<script>
import SectionFooter from '~/components/application/SectionFooter';
import SectionHeader from '~/components/application/SectionHeader';

export default {
    name: 'FocusAreas',
    components: { SectionFooter, SectionHeader }
}
</script>