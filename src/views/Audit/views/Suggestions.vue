<template>
    <view-content title="Suggestions" icon="message">

        <div class="py-20">Test</div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Findings' }" icon="index-finger-right" label="Findings" placement="left" />
            <view-content-footer-link :to="{ name: 'Conclusion' }" icon="conslusion" label="Conclusion" placement="right" />
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