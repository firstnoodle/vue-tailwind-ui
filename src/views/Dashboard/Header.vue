<template>
    <view-header>
        <template #main>
            Header
        </template>
    </view-header>
</template>

<script>
import ViewHeader from '~/components/application/ViewHeader';
export default {
    name: 'Header',
    components: { ViewHeader }
}
</script>