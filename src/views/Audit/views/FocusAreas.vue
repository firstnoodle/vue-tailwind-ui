<template>
    <page-section title="Focus Areas" icon="crosshair">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Scope' }" icon="scope" label="Scope" placement="left" />
            <section-footer-link :to="{ name: 'Agenda' }" icon="clock" label="Agenda" placement="right" />
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