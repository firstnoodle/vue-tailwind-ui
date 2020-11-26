<template>
        <div class="flex flex-col max-w-2xl h-full mx-auto p-8 bg-white shadow-xl rounded-lg">
            <header class="flex-0 relative flex items-center justify-between w-full mb-4">
    <div class="z-10 fixed w-screen h-screen top-0 left-0 p-4 md:p-8 bg-black bg-opacity-25" style="height: -webkit-fill-available" @click.self="$emit('close')">
                <div class="flex items-center text-brand">
                    <slot name="title" />
                </div>
                <icon-button class="" value="close" @click="$emit('close')" />
            </header>
            <scrollbar
                tag="main"
                class="flex-1"
                >
                <div class="md:px-4 md:py-1">
                    <slot />
                </div>
            </scrollbar>
            <footer class="flex-0">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>

<script>
import IconButton from '~/components/IconButton';
import Scrollbar from '~/components/Scrollbar/main';

export default {
    name: 'Modal',
    components: { IconButton, Scrollbar }
}
</script>