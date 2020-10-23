<template>
    <view-content title="Findings" icon="index-finger-right">

        <div class="py-20">Test</div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Information Requests' }" icon="information" label="Info. Requests" placement="left" />
            <view-content-footer-link :to="{ name: 'Suggestions' }" icon="message" label="Suggestions" placement="right" />
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