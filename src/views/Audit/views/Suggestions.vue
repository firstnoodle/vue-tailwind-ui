<template>
    <page-section title="Suggestions" icon="message">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Findings' }" icon="index-finger-right" label="Findings" placement="left" />
            <section-footer-link :to="{ name: 'Conclusion' }" icon="conslusion" label="Conclusion" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Suggestions',
    components: { PageSection, SectionFooterLink }
}
</script>