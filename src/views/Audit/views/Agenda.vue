<template>
    <page-section title="Agenda" icon="clock">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Focus Areas' }" icon="crosshair" label="Focus Areas" placement="left" />
            <section-footer-link :to="{ name: 'Information Requests' }" icon="information" label="Info. Requests" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Agenda',
    components: { PageSection, SectionFooterLink }
}
</script>