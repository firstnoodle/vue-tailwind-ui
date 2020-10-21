<template>
    <a :href="href" class="flex items-center px-3 py-2 mb-1 bg-transparent text-gray-600 rounded-lg">
        <icon :value="icon" />
        <span class="ml-4 text-sm"><slot /></span>
    </a>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'SidebarNavItem',
    components: { Icon },
    props: {
        href: {
            type: String,
        },
        icon: {
            type: String,
        },
    }
}
</script>