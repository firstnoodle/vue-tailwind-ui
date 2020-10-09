<template>
    <div class="bg-yellow-200">
        <nav class="bg-gray-900">
            <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-12">
                    <!-- Logo and Nav items -->
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.28571 12C4.28571 7.73952 7.73952 4.28571 12 4.28571C16.2605 4.28571 19.7143 7.73952 19.7143 12C19.7143 16.2605 16.2605 19.7143 12 19.7143C7.73952 19.7143 4.28571 16.2605 4.28571 12ZM12 5.42857C8.3707 5.42857 5.42857 8.3707 5.42857 12C5.42857 15.6293 8.3707 18.5714 12 18.5714C15.6293 18.5714 18.5714 15.6293 18.5714 12C18.5714 11.5351 18.5231 11.0814 18.4313 10.6437C17.9588 12.412 16.3458 13.7143 14.4286 13.7143C12.1405 13.7143 10.2857 11.8595 10.2857 9.57143C10.2857 7.65423 11.588 6.04119 13.3563 5.56869C12.9186 5.47686 12.4649 5.42857 12 5.42857ZM11.4286 9.57143C11.4286 7.91457 12.7717 6.57143 14.4286 6.57143C16.0854 6.57143 17.4286 7.91457 17.4286 9.57143C17.4286 11.2283 16.0854 12.5714 14.4286 12.5714C12.7717 12.5714 11.4286 11.2283 11.4286 9.57143Z" fill="white"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C14.3629 24 16.5663 23.3171 18.4235 22.1378L20.1544 23.8687L23.993 20.0301L22.2334 18.2705C23.3539 16.4457 24 14.2983 24 12C24 5.37258 18.6274 0 12 0ZM22.8571 12C22.8571 13.981 22.3266 15.8381 21.3998 17.4369L20.7608 18.4142L22.3767 20.0301L20.1544 22.2524L18.5566 20.6546L17.5932 21.3075C15.9596 22.2913 14.0459 22.8571 12 22.8571C6.00377 22.8571 1.14286 17.9962 1.14286 12C1.14286 6.00377 6.00377 1.14286 12 1.14286C17.9962 1.14286 22.8571 6.00377 22.8571 12Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline">
                                <nav-item icon="dashboard">Dashboard</nav-item>
                                <nav-item icon="phase">Audits</nav-item>
                                <nav-item icon="team">Auditors</nav-item>
                                <nav-item icon="building">Auditees</nav-item>
                                <nav-item icon="index-finger-right">Findings</nav-item>
                            </div>
                        </div>
                    </div>
                    <!-- User -->
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <nav-item icon="user">NSTQ</nav-item>
                        </div>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="flex md:hidden">
                        <button 
                            @click="mobileNavVisible = !mobileNavVisible"
                            class="inline-flex items-center justify-center p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                            >
                            <svg v-if="mobileNavVisible" class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <svg v-else class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- MOBILE MENU -->
            <div :class="{ 'block' : mobileNavVisible, 'hidden' : !mobileNavVisible}" class="md:hidden">
                <!-- Nav -->
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <nav-item mobile icon="dashboard">Dashboard</nav-item>
                    <nav-item mobile icon="phase">Audits</nav-item>
                    <nav-item mobile icon="team">Auditors</nav-item>
                    <nav-item mobile icon="building">Auditees</nav-item>
                    <nav-item mobile icon="index-finger-right">Findings</nav-item>
                </div>
                <!-- User -->
                <div class="pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5 space-x-3 text-white">
                        <span class="font-medium">NSTQ</span>
                    </div>
                    <div class="mt-3 px-2 space-y-1">
                        <nav-item mobile icon="user">Profile</nav-item>
                        <nav-item mobile icon="cog">Settings</nav-item>
                        <nav-item mobile icon="sign-in">Sign out</nav-item>
                    </div>
                </div>
            </div>
        </nav>

        <!-- View nav -->
        <header class="bg-white shadow">
            <div class="flex items-center max-w-8xl mx-auto py-2">
                <div class="md:w-56 px-2 md:px-8 md:border-r border-gray-200">
                    <base-button plain type="primary" icon="angle-left" class="w-full hidden md:inline-flex">BACK</base-button>
                    <icon-button class="inline-flex md:hidden" value="angle-left" />
                    <icon-button class="inline-flex md:hidden" value="itenary" />
                </div>
                <div class="flex-1 flex items-center justify-between px-2">
                    <div class="flex-1 flex items-center max-w-4xl m-auto">
                        <div class="flex items-center mr-8">
                            <icon value="id" class="text-gray-600" /><span class="ml-2 text-sm font-light text-gray-800">AU1001234</span>
                        </div>
                        <div class="flex items-center mr-8">
                            <icon value="building" class="text-gray-600" /><span class="ml-2 text-sm font-light text-gray-800">CMC Bagsværd</span>
                        </div>
                        <div class="flex items-center mr-8">
                            <icon value="calendar" class="text-gray-600" /><span class="ml-2 text-sm font-light text-gray-800">05 Apr 2020</span>
                        </div>
                        <div class="flex items-center mr-8">
                            <icon value="authority" class="text-gray-600" /><span class="ml-2 text-sm font-light text-gray-800">NSTQ</span>
                        </div>
                    </div>
                    <div class="absolute right-0">
                        <base-button plain type="primary" icon="options" class="mr-2" />
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
import BaseButton from '~/components/BaseButton.js';
import Icon from '~/components/Icon';
import IconButton from '~/components/IconButton';
import NavItem from './NavItem';

export default {
    name: 'ApplicationLayout',
    components: { BaseButton, Icon, IconButton, NavItem },
    data() {
        return {
            mobileNavVisible: false,
        }
    }
}
</script>