<template>
    <div @click="$emit('click')" class="w-8 h-8 inline-flex items-center text-action hover:text-action justify-center rounded-full hover:bg-blue-100 cursor-pointer">
        <icon :value="value" />
    </div>
</template>

<script>
import Icon from './Icon';
export default {
    name: 'IconButton',
    components: { Icon },
    props: {
        value: {
            type: String,
            default: 'index-finger-up'
        }
    }
}
</script>