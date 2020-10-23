<template>
    <view-layout>
        <template #header>
            <audits-view-header />
        </template>

        <template #main>
            <div class="w-full min-h-full">

                <view-content title="Agenda" icon="clock">
                    Dashboard
                    <template #footer>
                        <view-content-footer-link :to="{ name: 'Focus Areas' }" icon="crosshair" label="Focus Areas" placement="left" />
                        <view-content-footer-link :to="{ name: 'Information Requests' }" icon="information" label="Info. Requests" placement="right" />
                    </template>
                </view-content>

            </div>
        </template>

        <template #mobile>
            <mobile-app-header>
                <template #left>
                </template>
                <template #center>
                    Dashboard
                </template>
                <template #right>
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
import AuditsViewHeader from './Header';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Dashboard',
    components: { IconButton, MobileAppHeader, MobileAppNav, AuditsViewHeader, ViewLayout },
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