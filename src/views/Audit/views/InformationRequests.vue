<template>
    <page-section title="Information Requests" icon="information">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Agenda' }" icon="clock" label="Agenda" placement="left" />
            <section-footer-link :to="{ name: 'Findings' }" icon="index-finger-right" label="Findings" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'InformationRequests',
    components: { PageSection, SectionFooterLink }
}
</script>