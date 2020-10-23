<template>
    <view-content title="Audit team" icon="team">

        <div class="py-20">Content</div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Auditee' }" icon="building" label="Auditee" placement="left" />
            <view-content-footer-link :to="{ name: 'Requirements' }" icon="index-finger-up" label="Requirements" placement="right" />
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