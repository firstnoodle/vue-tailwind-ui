<template>
    <div>
        <section-header icon="message">Suggestions</section-header>

        <div class="py-20">Content</div>

        <section-footer>
            <router-link :to="{ name: 'Findings' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="angle-left" class="text-gray-500 mr-2" />
                <icon value="index-finger-right" class="text-action mr-2" />
                <span class="text-action text-sm">Findings</span>
            </router-link>
            <router-link :to="{ name: 'Conclusion' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="conclusion" class="text-action mr-2" />
                <span class="text-action text-sm">Conclusion</span>
                <icon value="angle-right" class="text-gray-500 ml-2" />
            </router-link>
        </section-footer>
    </div>
</template>

<script>
import SectionFooter from '~/components/application/SectionFooter';
import SectionHeader from '~/components/application/SectionHeader';

export default {
    name: 'Suggestions',
    components: { SectionFooter, SectionHeader }
}
</script>