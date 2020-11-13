<template>
    <button
        class="inline-flex items-center justify-center text-secondary w-8 h-8 rounded bg-default hover:bg-gray-200 focus:outline-none focus:shadow-outline"
        :class="{ 'bg-gray-200 text-primary font-bold': active }"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: "TextEditorButton",
    props: {
        active: {
            type: Boolean,
            default: false
        }
    }
};
</script>