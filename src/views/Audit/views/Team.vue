<template>
    <page-section title="Audit team" icon="team">

        <div class="py-20">Content</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Auditee' }" icon="building" label="Auditee" placement="left" />
            <section-footer-link :to="{ name: 'Requirements' }" icon="index-finger-up" label="Requirements" placement="right" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Team',
    components: { PageSection, SectionFooterLink }
}
</script>