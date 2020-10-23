<template>
    <view-content title="Audit details" icon="phase">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit auditee' }" icon="building" label="Auditee" placement="right" class="ml-auto" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Details',
    components: { ViewContent, ViewContentFooterLink }
}
</script>