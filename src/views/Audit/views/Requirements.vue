<template>
    <view-content title="Requirements" icon="index-finger-up">

        <div class="py-20">Test</div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Team' }" icon="team" label="Audit team" placement="left" />
            <view-content-footer-link :to="{ name: 'Scope' }" icon="scope" label="Scope" placement="right" />
        </template>
    </view-content>
</template>

<script>
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Requirements',
    components: { ViewContent, ViewContentFooterLink }
}
</script>