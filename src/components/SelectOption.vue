<template>
    <div 
        tabindex="0"
        ref="root"
        class="bg-white px-3 py-2 focus:outline-none"
        :class="computedClass"
        @click="onOptionClick"
        @mouseover="$emit('mouseover')"
        >
        <template v-if="label">{{ label }}</template>
        <slot v-else />
    </div>
</template>

<script>
export default {
    name: 'SelectOption',
    props: {
        value: {
            type: Object,
            validator: value => {
                return (value.label && value.value);
            }
        },
        label: {
            type: String,
            default: null
        },
        highlighted: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            focus: false,
        }
    },
    computed: {
        computedClass() {
            let classString = this.disabled 
                ? 'cursor-not-allowed text-gray-400' 
                : 'cursor-pointer hover:bg-blue-200 focus:bg-blue-200';
            if(this.focus) classString += ' bg-blue-200';

            return classString;
        }
    },
    methods: {
        onOptionClick() {
            if(this.disabled) return;
            this.$emit('optionClicked', this.value || this.label);
        },
        setFocus(focus) {
            this.focus = focus;
            if(this.focus) {
                this.$nextTick(() => {
                    this.$refs.root.scrollIntoView({ block: 'nearest' });
                });
            }
        }
    }
}
</script>