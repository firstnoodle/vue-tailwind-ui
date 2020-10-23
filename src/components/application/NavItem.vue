<template>
    <router-link :to="to" tag="a" class="link" :exact="exact">
        <icon :value="icon" />
        <span class="ml-2 text-sm font-light">
            <slot />
        </span>
    </router-link>
</template>

<script>
import Icon from '~/components/Icon.js';

export default {
    name: 'NavItem',
    components: { Icon },
    props: {
        exact: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            required: true
        },
        to: {
            type: Object,
            validator: value => {
                return value.name !== undefined;
            }
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

<style lang="scss" scoped>

.link {
    @apply flex items-center h-12 px-4 text-gray-600;

    &.is-active {
        @apply bg-gray-800 font-medium text-white;

        &:hover {
            @apply bg-gray-700 font-medium text-white;
        }
    }

    &:hover {
        @apply bg-black text-white;
    }
}

</style>