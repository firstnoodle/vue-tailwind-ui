<template>
    <div class="flex flex-col h-full">
        <section-header icon="team">Audit team</section-header>

        <div class="py-20">Content</div>

        <section-footer>
            <router-link :to="{ name: 'Auditee' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="angle-left" class="text-gray-500 mr-2" />
                <icon value="building" class="text-action mr-2" />
                <span class="text-action text-sm">Auditee</span>
            </router-link>
            <router-link :to="{ name: 'Requirements' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="index-finger-up" class="text-action mr-2" />
                <span class="text-action text-sm">Requirements</span>
                <icon value="angle-right" class="text-gray-500 ml-2" />
            </router-link>
        </section-footer>
    </div>
</template>

<script>
import SectionFooter from '~/components/application/SectionFooter';
import SectionHeader from '~/components/application/SectionHeader';

export default {
    name: 'Team',
    components: { SectionFooter, SectionHeader }
}
</script>