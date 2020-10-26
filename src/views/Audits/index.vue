<template>
    <view-layout>
        <audits-view-header slot="desktop-view-header" />
        <audits-view-nav slot="sidebar" />

        <template #mobile-app-header-left>
            <icon-button class="inline-flex md:hidden" value="plus" />
            <icon-button class="inline-flex md:hidden" value="itenary" @click="$store.dispatch('toggleSidebar')" />
        </template>
        <template #mobile-app-header-center>Audits</template>
        <template #mobile-app-header-right>
            <icon-button class="inline-flex" value="options" @click="$store.dispatch('showMobileMenu')" />
        </template>

        <div slot="main" class="w-full min-h-full">
            Test
        </div>
    </view-layout>
</template>

<script>
import IconButton from '~/components/IconButton';
import AuditsViewHeader from '~/views/Audits/Header';
import AuditsViewNav from '~/views/Audits/Nav';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Audits',
    components: { IconButton, AuditsViewHeader, AuditsViewNav, ViewLayout },
}
</script>