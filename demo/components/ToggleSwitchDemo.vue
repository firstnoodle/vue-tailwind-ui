<template>
    <demo-wrapper>
        <h1 class="mb-4 text-xl font-bold">ToggleSwitch</h1>
        <toggle-switch :value="enabled" @toggle="enabled = !enabled" />
        <div class="mt-2">value: {{ enabled }}</div>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoWrapper';
import ToggleSwitch from '~/components/ToggleSwitch';
export default {
    name: 'SwitchDemo',
    components: { DemoWrapper, ToggleSwitch },
    data() {
        return {
            enabled: true,
        }
    }
}
</script>