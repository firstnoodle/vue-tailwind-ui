<template>
    <section class="flex flex-col h-full">
        <header 
            class="flex items-center py-2 text-brand border-b border-brand" 
            :class="{ 'flex-0 min-h-0' : fitToViewHeight }"
            >
            <icon :value="icon" />
            <span class="ml-2 text-sm font-bold">
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
            class="mt-auto" 
            :class="{ 'flex-0 min-h-0' : fitToViewHeight }"
            >
            <div class="flex items-center justify-between py-2 border-t border-subtle">
                <slot name="footer" />
            </div>
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