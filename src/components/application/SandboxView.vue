<template>
    <view-layout>
        <template #header>
            <desktop-view-header />
        </template>
        <template #sidebar>
            <nav class="bg-white w-56 h-full px-6 pb-6 pt-20 md:p-6 overflow-y-auto">
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
        </template>
        <template #main>
            Lorem ipsum dolor sits amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit. Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet. Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit. Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet. Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante.
        </template>

        <template #mobile>
            <mobile-app-header>
                <template #left>
                    <icon-button class="inline-flex md:hidden" value="angle-left" />
                    <icon-button class="inline-flex md:hidden" value="itenary" @click="mobilePageNavVisible = !mobilePageNavVisible" />
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

            <mobile-view-nav :visible="mobilePageNavVisible" />
        </template>
    </view-layout>
</template>

<script>
import DesktopViewHeader from '~/components/application/DesktopViewHeader';
import IconButton from '~/components/IconButton';
import MobileAppHeader from '~/components/application/MobileAppHeader';
import MobileAppNav from '~/components/application/MobileAppNav';
import MobileViewNav from '~/components/application/MobileViewNav';
import SidebarNavItem from '~/components/application/SidebarNavItem';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'SandboxView',
    components: { DesktopViewHeader, IconButton, MobileAppHeader, MobileAppNav, MobileViewNav, SidebarNavItem, ViewLayout },
    data() {
        return {
            mobileAppNavVisible: false,
            mobileNavVisible: false,
            mobilePageNavVisible: false,
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