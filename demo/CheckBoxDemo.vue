<template>
    <demo-wrapper title="CheckBox">
        <!-- <check-box :checked="enabled" :label="enabled" @click="enabled = !enabled" /> -->
        <checkbox :value="enabled" @click="enabled = !enabled" />
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import Checkbox from '~/components/Checkbox';
export default {
    name: 'SwitchDemo',
    components: { DemoWrapper, Checkbox },
    data() {
        return {
            enabled: true,
        }
    }
}
</script>