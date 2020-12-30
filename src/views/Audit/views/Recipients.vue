<template>
    <view-content title="Recipients" icon="arrow-fat-right">

        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Plan distribution date' }}
            </header>
        </div>
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Plan recipients' }}
            </header>
        </div>
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Report distribution date' }}
            </header>
        </div>
        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Report recipients' }}
            </header>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit details' }" icon="phase" label="Audit details" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit auditee' }" icon="building" label="Auditee" placement="right" />
        </template>
    </view-content>
</template>

<script>

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Recipients',
    components: { ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
        }
    },
    computed: {
    },
    methods: {
    }
}
</script>