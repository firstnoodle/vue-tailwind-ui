<template>
    <view-layout>
        <audits-view-header slot="desktop-view-header" />

        <template #mobile-app-header-center>
            Dashboard
        </template>
        <template #mobile-app-header-right>
            <icon-button class="inline-flex" value="options" @click="$store.dispatch('showMobileMenu')" />
        </template>

        <div slot="main" class="w-full min-h-full">
            Dashboard
        </div>
    </view-layout>
</template>

<script>
import IconButton from '~/components/IconButton';
import AuditsViewHeader from './Header';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Dashboard',
    components: { IconButton, AuditsViewHeader, ViewLayout },
}
</script>