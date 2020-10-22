<template>
    <view-header>
        <template #sidebar>
            <router-link :to="{ name: 'Audits' }">
                <base-button plain type="primary" icon="angle-left" class="w-full inline-flex">BACK</base-button>
            </router-link>
        </template>
        <template #main>
            <div class="flex-1 flex items-center justify-between max-w-4xl m-auto">
                <div class="flex items-center">
                    <div class="flex items-center mr-4 lg:mr-8">
                        <icon value="id" class="hidden lg:inline-block text-gray-600" />
                        <span class="ml-2 text-sm font-light text-gray-800 truncate">AU1001234</span>
                    </div>
                    <div class="flex items-center mr-4 lg:mr-8">
                        <icon value="calendar" class="hidden lg:inline-block text-gray-600" />
                        <span class="ml-2 text-sm font-light text-gray-800 truncate">05 Apr 2020</span>
                    </div>
                    <div class="flex items-center mr-4 lg:mr-8">
                        <icon value="authority" class="hidden lg:inline-block text-gray-600" />
                        <span class="ml-2 text-sm font-light text-gray-800 truncate">NSTQ</span>
                    </div>
                    <tooltip text="Biopharm New Haemophilia API &amp; Biopharm QA API" placement="bottom" >
                        <div class="flex items-center mr-4 lg:mr-8">
                            <icon value="building" class="hidden lg:inline-block text-gray-600" />
                            <span class="ml-2 text-sm font-light text-gray-800 truncate" style="max-width: 10rem">
                                Biopharm New Haemophilia API & Biopharm QA API
                            </span>
                        </div>
                    </tooltip>
                </div>
                <base-button plain type="primary" icon="document" class="self-end" />
            </div>
        </template>
    </view-header>
</template>

<script>
import BaseButton from '~/components/BaseButton';
import Icon from '~/components/Icon';
import Tooltip from '~/components/Tooltip';
import ViewHeader from '~/components/application/ViewHeader';
export default {
    name: 'Header',
    components: { BaseButton, Icon, Tooltip, ViewHeader }
}
</script>