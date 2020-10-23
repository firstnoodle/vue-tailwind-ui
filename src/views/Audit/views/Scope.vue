<template>
    <view-content title="Scope" icon="scope">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Requirements' }" icon="index-finger-up" label="Requirements" placement="left" />
            <view-content-footer-link :to="{ name: 'Focus Areas' }" icon="crosshair" label="Focus Areas" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Scope',
    components: { ViewContent, ViewContentFooterLink }
}
</script>