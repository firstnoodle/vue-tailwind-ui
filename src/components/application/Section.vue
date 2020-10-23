<template>
    <section class="flex flex-col h-full">
        <div class="flex items-center py-2 border-b border-brand">
            <icon :value="icon" />
            <span class="ml-2 text-sm">
                {{ title }}
            </span>
        </div>

        <slot />

        <div class="mt-auto flex items-center justify-between py-2 border-t border-brand">
            <slot name="footer" />
        </div>
    </section>
</template>

<script>
export default {
    name: 'Section',
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    }
}
</script>