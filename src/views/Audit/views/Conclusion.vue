<template>
    <view-content title="Conclusion" icon="conclusion">

        <audit-rating />

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit suggestions' }" icon="message" label="Suggestions" placement="left" />
        </template>
    </view-content>
</template>

<script>
import AuditRating from '~/components/AuditRating/main';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Conclusion',
    components: { AuditRating, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.id,
        }
    }
}
</script>