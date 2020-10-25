<template>
    <view-content title="Suggestions" icon="message">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit findings' }" icon="index-finger-right" label="Findings" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit conclusion' }" icon="conclusion" label="Conclusion" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Suggestions',
    components: { ViewContent, ViewContentFooterLink }
}
</script>