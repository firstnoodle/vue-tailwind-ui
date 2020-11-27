<template>
    <view-content title="Conclusion" icon="conclusion">

        <audit-rating :rating="$store.state.audits[audit_id].rating" @rating-changed="onRatingChange" />

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
            audit_id: this.$route.params.audit,
        }
    },
    methods: {
        onRatingChange(value) {
            this.$store.commit(
                `audits/${this.audit_id}/UPDATE_RATING`, 
                value === this.$store.state.audits[this.audit_id].rating ? null : value
            );
        }
    }
}
</script>