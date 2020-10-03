<template>
    <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->
    <span
        @click="$emit('toggle')"
        @keydown.space.prevent="$emit('toggle')"
        @keydown.enter.prevent="$emit('toggle')"
        role="checkbox"
        tabindex="0"
        aria-checked="false"
        :class="computedBackgroundClass"
        class="group relative inline-flex flex-shrink-0 h-6 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
        style="width: 2.75rem"
    >
        <!-- On: "translate-x-5", Off: "translate-x-0" -->
        <span
            aria-hidden="true"
            :class="computedKnobClass"
            class="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
        ></span>
    </span>
</template>

<script>
export default {
    name: "ToggleSwitch",
    props: {
        value: {
            type: Boolean,
            required: true
        },
        offColor: {
            type: String,
            default: "gray"
        },
        onColor: {
            type: String,
            default: "teal"
        }
    },
    computed: {
        computedKnobClass() {
            return this.value ? "translate-x-5" : "translate-x-0";
        },
        computedBackgroundClass() {
            return this.value
                ? `bg-${this.onColor}-500`
                : `bg-${this.offColor}-200`;
        }
    }
};
</script>