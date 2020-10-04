<template>
    <div class="flex items-center" @click="$emit('click')">
        <input
            v-model="checked"
            type="checkbox"
            :name="label"
            class="form-checkbox h-4 w-4 text-indigo-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        />
        <label :for="label" class="ml-2 block text-sm leading-5 text-gray-900">{{ label }}</label>
    </div>
</template>

<script>
export default {
    name: "CheckBox",
    props: {
        checked: {
            type: Boolean,
            required: true
        },
        label: {
            type: String,
            required: false
        }
    }
};
</script>