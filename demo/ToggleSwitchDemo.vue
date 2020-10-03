<template>
    <demo-wrapper title="ToggleSwitch">
        <toggle-switch :value="enabled" @toggle="enabled = !enabled" />
        <div class="mt-2">value: {{ enabled }}</div>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
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