<template>
    <view-header>
        <template #sidebar>
            <router-link :to="{ name: 'Audits' }">
                <base-button plain type="primary" icon="angle-left" class="w-full inline-flex">BACK</base-button>
            </router-link>
        </template>
        <template #main>
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
        </template>
    </view-header>
</template>

<script>
import BaseButton from '~/components/BaseButton';
import Icon from '~/components/Icon';
import ViewHeader from '~/components/application/ViewHeader';
export default {
    name: 'Header',
    components: { BaseButton, Icon, ViewHeader }
}
</script>