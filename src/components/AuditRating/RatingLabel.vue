<template>
    <div 
        class="relative bg-gray-200 border-r border-white last:border-none"
        style="height: 115px; width: 54px;"
        >
        <span 
            class="absolute left-0 flex items-center text-gray-600 text-sm font-light pl-2 transform origin-top-left -rotate-90"
            style="bottom: -54px; height: 54px; margin: 0 !important; width: 115px;"
            >
            <slot />
        </span>
    </div>
</template>

<script>
export default {
    name: 'RatingLabel'
}
</script>