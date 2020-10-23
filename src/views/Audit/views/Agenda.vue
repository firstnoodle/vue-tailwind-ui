<template>
    <view-content title="Agenda" icon="clock">

        <div class="py-20">Test</div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Focus Areas' }" icon="crosshair" label="Focus Areas" placement="left" />
            <view-content-footer-link :to="{ name: 'Information Requests' }" icon="information" label="Info. Requests" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Agenda',
    components: { ViewContent, ViewContentFooterLink }
}
</script>