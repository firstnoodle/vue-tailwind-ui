<template>
    <a href="#" :class="classes">
        <icon :value="icon" />
        <span class="ml-2 text-sm font-light">
            <slot />
        </span>
    </a>
</template>

<script>
import Icon from '~/components/Icon.js';

export default {
    name: 'NavItem',
    components: { Icon },
    props: {
        icon: {
            type: String,
            required: true
        },
        mobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            classes: null,
        }
    },
    created() {
        this.classes = this.mobile 
            ? 'flex items-center px-3 py-2 rounded-md text-sm text-gray-300 hover:text-gray-100 hover:bg-gray-800 focus:outline-none focus:text-white focus:bg-gray-700'
            : 'flex items-center h-12 px-4 text-gray-600 hover:bg-black hover:text-white';
    }
}
</script>