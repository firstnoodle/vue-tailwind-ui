<template>
    <view-layout>
        <findings-view-header slot="desktop-view-header" />
        <findings-view-nav slot="sidebar" />

        <template #mobile-app-header-left>
            <icon-button class="inline-flex md:hidden" value="itenary" @click="$store.dispatch('toggleSidebar')" />
        </template>
        <template #mobile-app-header-center>
            Findings
        </template>
        <template #mobile-app-header-right>
            <icon-button class="inline-flex" value="options" @click="$store.dispatch('showMobileMenu')" />
        </template>

        <div slot="main" class="w-full min-h-full">
            Findings
        </div>
    </view-layout>
</template>

<script>
import FindingsViewHeader from './Header';
import FindingsViewNav from './Nav';
import IconButton from '~/components/IconButton';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Findings',
    components: { FindingsViewHeader, FindingsViewNav, IconButton, ViewLayout },
}
</script>