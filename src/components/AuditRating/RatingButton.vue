<template>
    <button 
        class="z-0 flex items-center justify-center h-10 w-1/5 border-r text-white border-white bg-gray-200 last:border-none focus:outline-none focus:shadow-outline focus:z-10"
        :class="{ 'bg-action' : active }"
        @click="$emit('click')"
        >
        <icon v-if="active" value="close" />
    </button>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'RatingButton',
    components: { Icon },
    props: {
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>