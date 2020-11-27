<template>
    <view-content title="Information Requests" icon="information">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit agenda' }" icon="clock" label="Agenda" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit findings' }" icon="index-finger-right" label="Findings" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'InformationRequests',
    components: { ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.id,
        }
    }
}
</script>