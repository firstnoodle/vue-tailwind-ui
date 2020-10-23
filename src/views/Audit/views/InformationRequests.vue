<template>
    <view-content title="Information Requests" icon="information">

        <div class="py-20">Test</div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Agenda' }" icon="clock" label="Agenda" placement="left" />
            <view-content-footer-link :to="{ name: 'Findings' }" icon="index-finger-right" label="Findings" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'InformationRequests',
    components: { ViewContent, ViewContentFooterLink }
}
</script>