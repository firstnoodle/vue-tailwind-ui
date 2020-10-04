<template>
    <demo-wrapper title="CheckBox">
        <check-box :checked="enabled" :label="enabled" @click="enabled = !enabled" />
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import CheckBox from '~/components/CheckBox';
export default {
    name: 'SwitchDemo',
    components: { DemoWrapper, CheckBox },
    data() {
        return {
            enabled: true,
        }
    }
}
</script>