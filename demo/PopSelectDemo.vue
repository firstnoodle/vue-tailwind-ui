<template>
    <demo-wrapper title="Icons">
        <pop-select />
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import PopSelect from '~/components/PopSelect';

export default {
    name: 'PopSelectDemo',
    components: { DemoWrapper, PopSelect }
}
</script>