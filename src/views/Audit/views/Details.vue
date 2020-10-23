<template>
    <page-section title="Audit details" icon="phase">

        <div class="py-20">Test</div>

        <template #footer>
            <section-footer-link :to="{ name: 'Auditee' }" icon="building" label="Auditee" placement="right" class="ml-auto" />
        </template>
    </page-section>
</template>

<script>
import PageSection from '~/components/application/Section';
import SectionFooterLink from '~/components/application/SectionFooterLink';

export default {
    name: 'Details',
    components: { PageSection, SectionFooterLink }
}
</script>