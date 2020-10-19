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
                <icon-button class="inline-flex" value="options" @click="appNavVisible = true" />
            </div>
        </header>

        <!-- ApplicationNav -->
        <div v-if="appNavVisible" class="z-10 fixed top-0 left-0 w-full bg-white" style="height: -webkit-fill-available">
            <header class="z-10 fixed w-screen top-0 left-0 flex items-center justify-end p-2">
                <icon-button class="inline-flex" value="close" @click="appNavVisible = false" />
            </header>
            <div class="flex flex-col items-center pt-16">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.28571 12C4.28571 7.73952 7.73952 4.28571 12 4.28571C16.2605 4.28571 19.7143 7.73952 19.7143 12C19.7143 16.2605 16.2605 19.7143 12 19.7143C7.73952 19.7143 4.28571 16.2605 4.28571 12ZM12 5.42857C8.3707 5.42857 5.42857 8.3707 5.42857 12C5.42857 15.6293 8.3707 18.5714 12 18.5714C15.6293 18.5714 18.5714 15.6293 18.5714 12C18.5714 11.5351 18.5231 11.0814 18.4313 10.6437C17.9588 12.412 16.3458 13.7143 14.4286 13.7143C12.1405 13.7143 10.2857 11.8595 10.2857 9.57143C10.2857 7.65423 11.588 6.04119 13.3563 5.56869C12.9186 5.47686 12.4649 5.42857 12 5.42857ZM11.4286 9.57143C11.4286 7.91457 12.7717 6.57143 14.4286 6.57143C16.0854 6.57143 17.4286 7.91457 17.4286 9.57143C17.4286 11.2283 16.0854 12.5714 14.4286 12.5714C12.7717 12.5714 11.4286 11.2283 11.4286 9.57143Z" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C14.3629 24 16.5663 23.3171 18.4235 22.1378L20.1544 23.8687L23.993 20.0301L22.2334 18.2705C23.3539 16.4457 24 14.2983 24 12C24 5.37258 18.6274 0 12 0ZM22.8571 12C22.8571 13.981 22.3266 15.8381 21.3998 17.4369L20.7608 18.4142L22.3767 20.0301L20.1544 22.2524L18.5566 20.6546L17.5932 21.3075C15.9596 22.2913 14.0459 22.8571 12 22.8571C6.00377 22.8571 1.14286 17.9962 1.14286 12C1.14286 6.00377 6.00377 1.14286 12 1.14286C17.9962 1.14286 22.8571 6.00377 22.8571 12Z" />
                </svg>
                <div class="mt-1 font-light">AuditTool</div>
            </div>
            <nav class="bg-white w-full h-full px-6 pb-6 pt-8 overflow-y-auto">
                <sidebar-nav-item href="#" icon="dashboard">Dashboard</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="phase">Audits</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="team">Auditors</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="building">Auditees</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="index-finger-right">Findings</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="cog">Settings</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="user">NSTQ</sidebar-nav-item>
                <sidebar-nav-item href="#" icon="sign-in">Sign out</sidebar-nav-item>
            </nav>
        </div>

        <!-- SidebarNav -->
        <transition name="fade">
            <div v-if="sidebarVisible" class="fixed w-screen min-h-screen bg-black bg-opacity-25" @click.native="sidebarVisible = !sidebarVisible"></div>
        </transition>
        <transition name="slide">
            <aside v-if="sidebarVisible" class="fixed w-screen" style="height: -webkit-fill-available">
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
// Remember to import global css in every demo
import '~/css/main.scss';

import IconButton from '~/components/IconButton';
import SidebarNavItem from '~/components/application/SidebarNavItem';

export default {
    name: 'ApplicationLayoutDemo',
    components: { IconButton, SidebarNavItem },
    data() {
        return {
            appNavVisible: true,
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