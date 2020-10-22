<template>
    <div>
        <section-header icon="index-finger-right">Findings</section-header>

        <div class="py-20">Content</div>

        <section-footer>
            <router-link :to="{ name: 'Information Requests' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="angle-left" class="text-gray-500 mr-2" />
                <icon value="information" class="text-action mr-2" />
                <span class="text-action text-sm">Info. Requests</span>
            </router-link>
            <router-link :to="{ name: 'Suggestions' }" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
                <icon value="message" class="text-action mr-2" />
                <span class="text-action text-sm">Suggestions</span>
                <icon value="angle-right" class="text-gray-500 ml-2" />
            </router-link>
        </section-footer>
    </div>
</template>

<script>
import SectionFooter from '~/components/application/SectionFooter';
import SectionHeader from '~/components/application/SectionHeader';

export default {
    name: 'Findings',
    components: { SectionFooter, SectionHeader }
}
</script>