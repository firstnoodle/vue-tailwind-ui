<template>
    <div class="flex items-center">
        <button :class="{ 'border-blue-700 bg-blue-500' : value }" class="flex items-center justify-center w-4 h-4 border border-default rounded focus:border-blue-600 focus:outline-none focus:shadow-outline" @click="$emit('click')">
            <svg v-if="value" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.41166 0.5L10 2.0417L4.01353 7.5L0 3.57411L1.60557 2.04932L4.02897 4.39988L8.41166 0.5Z" fill="white"/>
            </svg>
        </button>
        <span v-if="label" class="ml-2 block text-sm leading-5 text-primary">{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: 'Checkbox',
    props: {
        label: {
            type: String,
            default: null
        },
        value: {
            type: Boolean
        }
    }
}
</script>