<template>
    <view-content title="Audit details" icon="phase">

        <div class="w-full mt-8">
            <header class="w-full border-b border-subtle text-sm text-brand font-bold">
                {{ 'Domain' }}
            </header>
            <main>
                {{ 'ISO/GMP' }}
            </main>
        </div>

        <novo-glow-id />
        <audit-type />
        <audit-announced />
        <audit-method />

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit distribution' }" icon="arrow-fat-right" label="Distribution" placement="right" class="ml-auto" />
        </template>
    </view-content>
</template>

<script>
import AuditAnnounced from './AuditAnnounced.vue';
import AuditMethod from './AuditMethod.vue';
import AuditType from './AuditType.vue';
import NovoGlowId from './NovoGlowId.vue';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Details',
    components: { AuditAnnounced, AuditMethod, AuditType, NovoGlowId, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
        }
    }
}
</script>