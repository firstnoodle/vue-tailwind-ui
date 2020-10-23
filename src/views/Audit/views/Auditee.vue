<template>
    <page-section title="Auditee" icon="building">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Details' }" icon="phase" label="Audit details" placement="left" />
            <section-footer-link :to="{ name: 'Team' }" icon="team" label="Audit team" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Auditee',
    components: { PageSection, SectionFooterLink }
}
</script>