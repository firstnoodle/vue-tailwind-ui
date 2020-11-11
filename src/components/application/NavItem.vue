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
                return (value.name !== undefined) || (value.path !== undefined);
            }
        }
    },
}
</script>

<style lang="scss" scoped>

.link {
    @apply flex items-center h-10 px-4 text-gray-600 tracking-wide rounded-lg cursor-pointer;

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