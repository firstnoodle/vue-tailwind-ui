<template>
    <page-section title="Scope" icon="scope">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Requirements' }" icon="index-finger-up" label="Requirements" placement="left" />
            <section-footer-link :to="{ name: 'Focus Areas' }" icon="crosshair" label="Focus Areas" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Scope',
    components: { PageSection, SectionFooterLink }
}
</script>