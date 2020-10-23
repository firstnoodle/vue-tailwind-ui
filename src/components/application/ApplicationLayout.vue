<template>
    <div class="relative flex flex-col w-screen h-screen bg-page" :class="computedTheme">
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
    </div>
</template>

<script>
import DesktopAppHeader from '~/components/application/DesktopAppHeader';

export default {
    name: 'ApplicationLayout',
    components: { DesktopAppHeader },
    data() {
        return {
        }
    },
    computed: {
        computedTheme() {
            return `theme-${this.$store.state.theme}`;
        }
    },
}
</script>