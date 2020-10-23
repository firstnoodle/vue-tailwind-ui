<template>
    <view-content title="Audit team" icon="team">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit auditee' }" icon="building" label="Auditee" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit requirements' }" icon="index-finger-up" label="Requirements" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Team',
    components: { ViewContent, ViewContentFooterLink }
}
</script>