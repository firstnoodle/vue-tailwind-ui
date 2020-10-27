<template>
    <div class="relative flex flex-col w-screen h-screen bg-page" :class="$store.state.theme">
        <div class="flex flex-col items-center overflow-hidden w-full flex-1 min-h-0 z-0">
            <div class="flex flex-col w-full flex-1 min-h-0 overflow-auto">
                <desktop-app-header />
                <main class="relative z-0 flex flex-col flex-1 min-h-0 overflow-y-auto">
                    <div class="flex flex-col items-center overflow-hidden w-full flex-1 min-h-0 z-0">
                        <div class="flex flex-col w-full flex-1 min-h-0 overflow-auto">
                            <slot />
                        </div>
                    </div>
                </main> 
            </div>
        </div>

        <portal-target name="mobile" />
        <mobile-app-nav v-if="$store.state.mobileMenuVisible" @close="$store.dispatch('hideMobileMenu')" />
        <portal-target name="modal" />
    </div>
</template>

<script>
import DesktopAppHeader from '~/components/application/DesktopAppHeader';
import MobileAppNav from '~/components/application/MobileAppNav';

export default {
    name: 'ApplicationLayout',
    components: { DesktopAppHeader, MobileAppNav },
    mounted() {
        this.$store.dispatch('setMobile', window.innerWidth < 768);
        window.addEventListener('resize', () => this.$store.dispatch('setMobile', window.innerWidth < 768));
    },
}
</script>