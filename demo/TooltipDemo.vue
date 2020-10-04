<template>
    <demo-wrapper title="Tooltip">
        <tooltip text="Now you know me" >
            <span>Hover me</span>
        </tooltip>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import Tooltip from '~/components/Tooltip';
export default {
    name: 'TooltipDemo',
    components: { DemoWrapper, Tooltip },
    data() {
        return {
            enabled: true,
        }
    }
}
</script>