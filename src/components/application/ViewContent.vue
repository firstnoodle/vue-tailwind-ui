<template>
    <section class="flex flex-col h-full">
        <header 
            class="flex items-center py-2 text-brand border-b border-subtle" 
            :class="{ 'flex-0 min-h-0' : fitToViewHeight }"
            >
            <icon :value="icon" />
            <span class="ml-2 text-sm">
                {{ title }}
            </span>
        </header>
        <main 
            class="" 
            :class="{ 'flex-1 min-h-0 flex flex-col py-5' : fitToViewHeight, 'pt-5 pb-16' : !fitToViewHeight }"
            >
            <slot />
        </main>
        <footer 
            class="flex items-center justify-between mt-auto py-2 border-t border-subtle" 
            :class="{ 'flex-0 min-h-0' : fitToViewHeight }"
            >
            <slot name="footer" />
        </footer>
    </section>
</template>

<script>
export default {
    name: 'ViewContent',
    props: {
        fitToViewHeight: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
    }
}
</script>