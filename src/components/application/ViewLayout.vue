<template>
    <div class="flex flex-col w-full flex-1 min-h-0 overflow-auto">

        <header v-if="$slots.header" class="hidden md:flex relative z-10 flex-0 w-full">
            <div class="h-12 w-full bg-white shadow">
                <slot name="header" />
            </div>
        </header>

        <main class="relative z-0 flex flex-col flex-1 min-h-0 overflow-y-auto max-w-8xl mx-auto">
            <div class="w-full h-full flex bg-yellow-200">
                <aside v-if="$slots.sidebar" class="hidden md:flex bg-teal-200 flex-0 w-56">
                    <slot name="sidebar" />
                </aside>
                <main class="bg-white flex-1 overflow-x-hidden overflow-y-auto pt-12 md:pt-0">
                    <slot name="main" />
                </main>
            </div>
        </main>

        <portal to="mobile">
            <slot name="mobile" />
        </portal>
    </div>
</template>

<script>

export default {
    name: 'ViewLayout',
}
</script>