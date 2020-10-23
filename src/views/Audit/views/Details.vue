<template>
    <div class="flex flex-col h-full">
        <section-header icon="phase">Details</section-header>

        <div class="py-20">Content</div>

        <section-footer>
            <router-link :to="{ name: 'Auditee' }" tag="a" class="ml-auto flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="building" class="text-action mr-2" />
                <span class="text-action text-sm">Auditee</span>
                <icon value="angle-right" class="text-gray-500 ml-2" />
            </router-link>
        </section-footer>
    </div>
</template>

<script>
import SectionFooter from '~/components/application/SectionFooter';
import SectionHeader from '~/components/application/SectionHeader';

export default {
    name: 'Details',
    components: { SectionFooter, SectionHeader }
}
</script>