<template>
    <button class="flex items-center justify-center w-8 h-8 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus:shadow-outline" @click="$emit('click')">
        <svg v-if="icon === 'double-left'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.70711 14L8 14.7071L1.29289 8L8 1.29289L8.70711 2L2.708 8L8.70711 14Z"/>
            <path d="M13.7071 14L13 14.7071L6.29289 8L13 1.29289L13.7071 2L7.707 8L13.7071 14Z"/>
        </svg>
        <svg v-if="icon === 'single-left'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7071 14L11 14.7071L4.29289 8L11 1.29289L11.7071 2L5.707 8L11.7071 14Z"/>
        </svg>
        <svg v-if="icon === 'single-right'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.29289 14L5 14.7071L11.7071 8L5 1.29289L4.29289 2L10.293 8L4.29289 14Z"/>
        </svg>
        <svg v-if="icon === 'double-right'" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.00001 14.7071L2.29291 14L8.29201 8L2.29291 2L3.00001 1.29289L9.70712 8L3.00001 14.7071Z" />
            <path d="M8.00001 14.7071L7.29291 14L13.293 8L7.29291 2L8.00001 1.29289L14.7071 8L8.00001 14.7071Z" />
        </svg>
    </button>
</template>

<script>
export default {
    name: 'NavButton',
    props: {
        icon: {
            type: String,
            required: true,
            validator: function(value) {
                return ['single-left', 'single-right', 'double-left', 'double-right'].indexOf(value) !== -1;
            }
        }
    }
}
</script>