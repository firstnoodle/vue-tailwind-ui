<template>
    <view-layout :sidebarVisible="sidebarVisible">
        <template #header>
            <audit-view-header />
        </template>
        <template #sidebar>
            <audit-view-nav />
        </template>
        <template #main>
            <div class="w-full min-h-full">
                <router-view />
            </div>
        </template>

        <template #mobile>
            <mobile-app-header>
                <template #left>
                    <icon-button class="inline-flex md:hidden" value="angle-left" />
                    <icon-button class="inline-flex md:hidden" value="itenary" @click="sidebarVisible = !sidebarVisible" />
                </template>
                <template #center>
                    <span class="font-bold text-secondary">AU</span>
                    <span class="font-light text-primary">1001234</span>
                </template>
                <template #right>
                    <icon-button class="inline-flex" value="arrow-up" />
                    <icon-button class="inline-flex" value="options" @click="mobileAppNavVisible = true" />
                </template>
            </mobile-app-header>
            <mobile-app-nav v-if="mobileAppNavVisible" @close="mobileAppNavVisible = false" />
        </template>
    </view-layout>
</template>

<script>
import IconButton from '~/components/IconButton';
import MobileAppHeader from '~/components/application/MobileAppHeader';
import MobileAppNav from '~/components/application/MobileAppNav';
import AuditViewHeader from '~/views/Audit/Header';
import AuditViewNav from '~/views/Audit/Nav';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'AuditView',
    components: { IconButton, MobileAppHeader, MobileAppNav, AuditViewHeader, AuditViewNav, ViewLayout },
    data() {
        return {
            mobileAppNavVisible: false,
            mobileNavVisible: false,
            sidebarVisible: false,
        }
    },
    watch: {
        '$route'() {
            this.sidebarVisible = false;
        }
    },
}
</script>