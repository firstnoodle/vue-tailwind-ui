<template>
    <view-content title="Agenda" icon="clock">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit focus areas' }" icon="crosshair" label="Focus Areas" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit information requests' }" icon="information" label="Info. Requests" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Agenda',
    components: { ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.id,
        }
    }
}
</script>