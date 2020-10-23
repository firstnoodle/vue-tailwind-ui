<template>
    <page-section title="Conclusion" icon="conclusion">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Suggestions' }" icon="message" label="Suggestions" placement="left" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Conclusion',
    components: { PageSection, SectionFooterLink }
}
</script>