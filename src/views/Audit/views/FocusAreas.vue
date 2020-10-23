<template>
    <view-content title="Focus Areas" icon="crosshair">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Scope' }" icon="scope" label="Scope" placement="left" />
            <view-content-footer-link :to="{ name: 'Agenda' }" icon="clock" label="Agenda" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Findings',
    components: { ViewContent, ViewContentFooterLink }
}
</script>