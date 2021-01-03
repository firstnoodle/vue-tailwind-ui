<template>
    <view-content title="Audit details" icon="phase">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit distribution' }" icon="arrow-fat-right" label="Distribution" placement="right" class="ml-auto" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Details',
    components: { ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
        }
    }
}
</script>