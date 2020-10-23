<template>
    <view-content title="Conclusion" icon="conclusion">

        Content

        <template #footer>
            <view-content-footer-link :to="{ name: 'Suggestions' }" icon="message" label="Suggestions" placement="left" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Conclusion',
    components: { ViewContent, ViewContentFooterLink }
}
</script>