<template>
    <demo-wrapper title="ListItem demo">
        <list-item>
            listing
        </list-item>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import ListItem from '~/components/ListItem';
export default {
    name: 'ListItemDemo',
    components: { DemoWrapper, ListItem },
    data() {
        return {
        }
    }
}
</script>