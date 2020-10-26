<template>
    <view-layout>
        <audit-view-header slot="desktop-view-header" />
        <audit-view-nav slot="sidebar" />

        <template #mobile-app-header-left>
            <icon-button class="inline-flex md:hidden" value="angle-left" />
            <icon-button class="inline-flex md:hidden" value="itenary" @click="$store.dispatch('toggleSidebar')" />
        </template>
        <template #mobile-app-header-center>
            <span class="font-bold text-secondary">AU</span>
            <span class="font-light text-primary">1001234</span>
        </template>
        <template #mobile-app-header-right>
            <icon-button class="inline-flex" value="arrow-up" />
            <icon-button class="inline-flex" value="options" @click="$store.dispatch('showMobileMenu')" />
        </template>

        <div slot="main" class="w-full min-h-full">
            <router-view />
        </div>
    </view-layout>
</template>

<script>
import AuditViewHeader from './Header';
import AuditViewNav from './Nav';
import IconButton from '~/components/IconButton';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Audit',
    components: { AuditViewHeader, AuditViewNav, IconButton, ViewLayout },
}
</script>