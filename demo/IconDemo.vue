<template>
    <demo-wrapper title="Icons">
        <span class="p-2">
            <icon value="user" />
        </span>
        <span class="p-2">
            <icon value="envelope" />
        </span>
        <span class="p-2">
            <icon value="trend" />
        </span>
        <span class="p-2">
            <icon value="sun" />
        </span>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import Icon from '~/components/Icon';

export default {
    name: 'ButtonDemo',
    components: { DemoWrapper, Icon }
}
</script>