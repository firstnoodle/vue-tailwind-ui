<template>
    <button 
        class="flex items-center justify-center w-8 h-8 rounded-full text-blue-600 hover:text-blue-800 hover:bg-blue-200 focus:outline-none focus:shadow-outline" 
        @click="$emit('click')"
        >
        <icon :value="icon" />
    </button>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'NavButton',
    components: { Icon },
    props: {
        icon: {
            type: String,
            required: true,
            validator: function(value) {
                return ['angle-left', 'angle-right', 'angle-double-left', 'angle-double-right'].indexOf(value) !== -1;
            }
        }
    }
}
</script>