<template>
    <view-content title="Auditee" icon="building">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Details' }" icon="phase" label="Audit details" placement="left" />
            <view-content-footer-link :to="{ name: 'Team' }" icon="team" label="Audit team" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Auditee',
    components: { ViewContent, ViewContentFooterLink }
}
</script>