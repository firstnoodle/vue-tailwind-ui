<template>
    <page-section title="Findings" icon="index-finger-right">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Information Requests' }" icon="information" label="Info. Requests" placement="left" />
            <section-footer-link :to="{ name: 'Suggestions' }" icon="message" label="Suggestions" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Findings',
    components: { PageSection, SectionFooterLink }
}
</script>