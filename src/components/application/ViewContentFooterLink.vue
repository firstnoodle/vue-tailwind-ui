<template>
    <router-link :to="to" tag="a" class="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100">
        <icon v-if="placement === 'left'" value="arrow-left" class="text-gray-500 mr-2" />

        <icon :value="icon" class="text-action mr-2" />
        <span class="text-action text-sm">{{ label }}</span>

        <icon v-if="placement === 'right'" value="arrow-right" class="text-gray-500 ml-2" />
    </router-link>
</template>

<script>
export default {
    name: 'ViewContentFooterLink',
    props: {
        icon: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        placement: {
            type: String,
            required: true,
            validator: value => {
                return ['left', 'right'].indexOf(value) !== -1;
            }
        },
        to: {
            type: Object,
            validator: value => {
                return value.name !== undefined;
            }
        }
    }
}
</script>