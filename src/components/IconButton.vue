<template>
    <button 
        @click="$emit('click')" 
        class="w-8 h-8 inline-flex items-center text-action hover:text-action justify-center rounded-full hover:bg-blue-100 focus:bg-blue-200 focus:outline-none cursor-pointer">
        <icon :value="value" />
    </button>
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