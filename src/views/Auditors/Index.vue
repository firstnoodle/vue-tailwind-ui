<template>
    <view-layout>
        <audit-view-header slot="desktop-view-header" />
        <auditors-view-nav slot="sidebar" />

        <template #mobile-app-header-left>
            <icon-button class="inline-flex md:hidden" value="itenary" @click="$store.dispatch('toggleSidebar')" />
        </template>
        <template #mobile-app-header-center>
            <span class="font-bold text-secondary">Auditors</span>
        </template>
        <template #mobile-app-header-right>
            <icon-button class="inline-flex" value="options" @click="$store.dispatch('showMobileMenu')" />
        </template>

        <div slot="main" class="w-full min-h-full">
            Auditors
        </div>
    </view-layout>
</template>

<script>
import AuditViewHeader from './Header';
import AuditorsViewNav from './Nav';
import IconButton from '~/components/IconButton';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Auditees',
    components: { AuditViewHeader, AuditorsViewNav, IconButton, ViewLayout },
}
</script>