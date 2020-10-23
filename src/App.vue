<template>
    <application-layout :theme="$store.state.theme">
        <router-view />
    </application-layout>
</template>

<script>
import ApplicationLayout from '~/components/application/ApplicationLayout';

export default {
    name: 'App',
    components: { ApplicationLayout },
}
</script>
