<template>
    <page-section title="Requirements" icon="index-finger-up">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Team' }" icon="team" label="Audit team" placement="left" />
            <section-footer-link :to="{ name: 'Scope' }" icon="scope" label="Scope" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Requirements',
    components: { PageSection, SectionFooterLink }
}
</script>