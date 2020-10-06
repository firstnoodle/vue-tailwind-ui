<template>
    <demo-wrapper title="IconButton demo">
        <icon-button value="edit" @click="onClick"/>
        <icon-button value="trash" @click="onClick"/>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import IconButton from '~/components/IconButton';

export default {
    name: 'ButtonDemo',
    components: { DemoWrapper, IconButton },
    methods: {
        onClick() {
            console.log('click');
        }
    }
}
</script>