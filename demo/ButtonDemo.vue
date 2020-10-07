<template>
    <demo-wrapper title="Buttons">
        <base-button icon="plus" type="text">text button</base-button>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import BaseButton from '~/components/BaseButton';
export default {
    name: 'ButtonDemo',
    components: { BaseButton, DemoWrapper }
}
</script>