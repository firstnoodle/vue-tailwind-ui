<template>
    <div>
        <transition name="fade">
            <div v-if="visible" class="fixed top-0 left-0 w-screen min-h-screen bg-black bg-opacity-25"></div>
        </transition>
        <transition name="slide">
            <!-- TODO: verify style -webkit-fill-available -->
            <aside v-if="visible" class="fixed top-0 left-0 w-screen" style="height: -webkit-fill-available">
                <nav class="bg-white w-56 h-full px-6 pb-6 pt-20 overflow-y-auto">
                    <sidebar-nav-item href="#" icon="phase">Audit details</sidebar-nav-item>

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
import SidebarNavItem from '~/components/application/SidebarNavItem';

export default {
    name: 'MobilePageNav',
    components: { SidebarNavItem },
    props: {
        visible: {
            type: Boolean,
            default: false
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