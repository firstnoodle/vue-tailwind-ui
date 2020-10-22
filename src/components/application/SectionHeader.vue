<template functional>
    <div class="flex items-center py-2 border-b border-brand">
        <icon :value="props.icon" />
        <span class="ml-2 text-sm">
            <slot />
        </span>
    </div>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'SectionHeader',
    components: { Icon },
    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>