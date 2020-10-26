<template>
    <div class="h-12 w-full bg-white border-b border-subtle">
        <div class="flex items-center max-w-8xl mx-auto h-12">
            <div v-if="$slots.sidebar" class="flex-0 w-56 px-6 border-r border-subtle">
                <slot name="sidebar" />
            </div>
            <div class="relative flex-1 flex items-center px-4">
                <slot name="main" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ViewHeader'
}
</script>