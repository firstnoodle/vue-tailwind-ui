<template>
    <application-layout theme="light">
        <template #view>
            <sandbox-view />
        </template>
    </application-layout>
</template>

<script>
import ApplicationLayout from '~/components/application/ApplicationLayout';
import SandboxView from '~/components/application/SandboxView';

export default {
name: 'App',
components: { ApplicationLayout, SandboxView }
}
</script>
