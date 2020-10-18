<template>
    <div class="theme-light min-h-screen w-screen">
        <header class="z-10 fixed w-screen top-0 left-0 flex items-center justify-between bg-white p-2 shadow">
            <div class="z-0 absolute flex items-center justify-center w-full h-full top-0 left-0 bg-transparent">
                <div class="flex items-center text-sm">
                    <span class="font-bold text-secondary">AU</span>
                    <span class="font-light text-primary">1001234</span>
                    <!-- <icon value="angle-down" size="xs" class="ml-1 text-gray-600" /> -->
                </div>
            </div>
            <div class="z-10 space-x-2">
                <icon-button class="inline-flex md:hidden" value="angle-left" />
                <icon-button class="inline-flex md:hidden" value="itenary" @click="sidebarVisible = !sidebarVisible" />
            </div>
            <div class="z-10 space-x-2">
                <icon-button class="inline-flex" value="arrow-up" />
                <icon-button class="inline-flex" value="options" />
            </div>
        </header>
        <transition name="fade">
            <div v-if="sidebarVisible" class="fixed w-screen min-h-screen bg-black bg-opacity-25" @click.native="sidebarVisible = !sidebarVisible"></div>
        </transition>
        <transition name="slide">
            <aside v-if="sidebarVisible" class="fixed w-screen" style="height: -webkit-fill-available">
                <nav class="bg-white w-56 h-full px-6 pb-6 pt-20 overflow-y-auto">
                    <sidebar-nav-item href="#" icon="phase">Audit</sidebar-nav-item>

                    <div class="flex items-center py-2 mt-2">
                        <span class="text-xs font-medium mr-2 text-gray-500">Planning</span>
                        <span class="inline-block w-full border-b border-gray-400"></span>
                    </div>
                    <sidebar-nav-item href="#" icon="building">Auditee</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="team">Audit team</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="index-finger-up">Criteria</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="scope">Scope</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="crosshair">Focus Areas</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="clock">Agenda</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="information">Info. Requests</sidebar-nav-item>

                    <div class="flex items-center py-2 mt-2">
                        <span class="text-xs font-medium mr-2 text-gray-500">Reporting</span>
                        <span class="inline-block w-full border-b border-gray-400"></span>
                    </div>
                    <sidebar-nav-item href="#" icon="index-finger-right">Findings</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="message">Suggestions</sidebar-nav-item>
                    <sidebar-nav-item href="#" icon="conclusion">Conclusion</sidebar-nav-item>
                </nav>
            </aside>
        </transition>
    </div>
</template>

<script>
// Remember to import global css in every demo
import '~/css/main.scss';

import IconButton from '~/components/IconButton';
import SidebarNavItem from '~/components/application/SidebarNavItem';

export default {
    name: 'ApplicationLayoutDemo',
    components: { IconButton, SidebarNavItem },
    data() {
        return {
            sidebarVisible: false,
        }
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