<template>
    <div class="flex flex-col w-full flex-1 min-h-0 overflow-auto">

        <header v-if="$slots.header" class="hidden md:flex relative z-10 flex-0 w-full">
            <div class="h-12 w-full bg-white shadow">
                <slot name="header" />
            </div>
        </header>

        <main class="relative z-0 flex flex-col flex-1 w-full min-h-0 overflow-y-auto max-w-8xl mx-auto">
            <div class="w-full h-full flex">

                <!-- mobile overlay -->
                <transition name="fade" v-if="$slots.sidebar">
                    <div v-if="computedSidebarVisible" class="flex md:hidden fixed top-0 left-0 w-screen min-h-screen bg-black bg-opacity-25"></div>
                </transition>

                <transition name="slide" v-if="$slots.sidebar">
                    <!-- TODO: verify style -webkit-fill-available -->
                    <aside v-if="computedSidebarVisible" class="fixed top-0 left-0 md:relative flex-0 w-56 bg-white md:bg-page overflow-y-auto" style="height: -webkit-fill-available">
                        <slot name="sidebar" />
                    </aside>
                </transition>

                <main class="bg-white flex-1 overflow-x-hidden overflow-y-auto pt-12 md:pt-0">
                    <div class="max-w-4xl mx-auto">
                        <slot name="main" />
                    </div>
                </main>
            </div>
        </main>

        <portal to="mobile">
            <slot name="mobile" />
        </portal>
    </div>
</template>

<script>

export default {
    name: 'ViewLayout',
    props: {
        sidebarVisible: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        computedSidebarVisible() {
            return this.mobile ? this.sidebarVisible : true;
        }
    },
    data() {
        return {
            mobile: window.innerWidth < 768
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.mobile = window.innerWidth < 768;
        });
    }
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
    transition: transform .5s ease-out;
}

.slide-enter, .slide-leave-to {
    transform: translateX(-100%);
}

</style>