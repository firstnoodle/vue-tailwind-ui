<template>
    <section class="flex flex-col h-full">
        <header class="flex items-center py-2 border-b border-brand">
            <icon :value="icon" />
            <span class="ml-2 text-sm">
                {{ title }}
            </span>
        </header>

        <main class="py-5">
            <slot />
        </main>

        <footer class="mt-auto flex items-center justify-between py-2 border-t border-brand">
            <slot name="footer" />
        </footer>
    </section>
</template>

<script>
export default {
    name: 'ViewContent',
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