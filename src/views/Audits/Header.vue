<template>
    <view-header>
        <template #sidebar>
            <router-link :to="{ name: 'Details', params: { id: 123 } }">
                <base-button plain type="primary" icon="plus" class="w-full inline-flex">NEW AUDIT</base-button>
            </router-link>
        </template>
        <template #main>
            <div class="flex-1 flex items-center justify-between max-w-4xl m-auto">
                <div class="flex items-center">
                </div>
                <pagination :paginator="{ currentPage: 1, lastPage: 22 }" />
            </div>
        </template>
    </view-header>
</template>

<script>
import BaseButton from '~/components/BaseButton';
import Pagination from '~/components/Pagination';
import ViewHeader from '~/components/application/ViewHeader';

export default {
    name: 'Header',
    components: { BaseButton, Pagination, ViewHeader }
}
</script>