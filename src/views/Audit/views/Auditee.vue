<template>
    <view-content title="Auditee" icon="building">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit distribution' }" icon="arrow-fat-right" label="Distribution" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit team' }" icon="team" label="Audit team" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Auditee',
    components: { ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
        }
    }
}
</script>