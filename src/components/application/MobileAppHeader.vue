<template>
    <header class="md:hidden z-10 fixed w-screen top-0 left-0 flex items-center justify-between bg-white p-2 shadow">
        <div class="z-0 absolute flex items-center justify-center w-full h-full top-0 left-0 bg-transparent">
            <div class="flex items-center text-sm">
                <slot name="center" />
            </div>
        </div>
        <div class="z-10 space-x-2">
            <slot name="left" />
        </div>
        <div class="z-10 space-x-2">
            <slot name="right" />
        </div>
    </header>
</template>

<script>
export default {
    name: 'MobileAppHeader'
}
</script>