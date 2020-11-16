<template>
    <div class="flex flex-col w-full flex-1 min-h-0 overflow-auto">

        <header v-if="$slots['desktop-view-header']" class="hidden md:flex relative z-10 flex-0 w-full">
            <slot name="desktop-view-header" />
        </header>

        <main class="relative z-0 flex flex-col flex-1 w-full min-h-0 overflow-y-auto max-w-8xl mx-auto">
            <div class="w-full h-full flex">

                <!-- mobile overlay -->
                <transition name="fade" v-if="$slots.sidebar">
                    <div v-if="$store.getters['sidebarVisible']" class="flex md:hidden fixed top-0 left-0 w-screen min-h-screen bg-black bg-opacity-25"></div>
                </transition>

                <transition name="slide" v-if="$slots.sidebar">
                    <!-- TODO: verify style -webkit-fill-available -->
                    <aside v-if="computedSidebarVisible" class="fixed top-0 left-0 md:relative flex-0 w-56 bg-default border-r border-subtle overflow-y-auto" style="height: -webkit-fill-available">
                        <slot name="sidebar" />
                    </aside>
                </transition>

                <main class="bg-default flex-1 overflow-x-hidden overflow-y-auto pt-12 md:pt-0">
                    <div class="h-full px-4 py-4 md:py-8">
                        <div class="flex h-full max-w-4xl mx-auto">
                            <slot name="main" />
                        </div>
                    </div>
                </main>
            </div>
        </main>

        <portal to="mobile">
            <header class="md:hidden z-10 fixed w-screen top-0 left-0 flex items-center justify-between bg-default p-2 shadow">
                <div class="z-0 absolute flex items-center justify-center w-full h-full top-0 left-0 bg-transparent">
                    <div class="flex items-center text-sm">
                        <slot name="mobile-app-header-center" />
                    </div>
                </div>
                <div class="z-10 space-x-2">
                    <slot name="mobile-app-header-left" />
                </div>
                <div class="z-10 space-x-2">
                    <slot name="mobile-app-header-right" />
                </div>
            </header>
        </portal>
    </div>
</template>

<script>

export default {
    name: 'ViewLayout',
    computed: {
        computedSidebarVisible() {
            return this.$store.state.isMobile ? this.$store.state.sidebarVisible : true;
        }
    },
}
</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease-out;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.slide-enter-active, .slide-leave-active {
    transition: transform .3s ease-out;
}

.slide-enter, .slide-leave-to {
    transform: translateX(-100%);
}

</style>