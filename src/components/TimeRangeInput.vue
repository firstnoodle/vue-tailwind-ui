<template>
    <div
        class="relative inline-flex items-center overflow-hidden pl-3 pr-8 border border-default rounded-md shadow-inner-sm focus-within:shadow-outline focus-within:border-action"
        >
        <input 
            :value="range.from"
            ref="fromInput"
            type="time" 
            placeholder="00:00" 
            class="py-2 text-sm text-primary leading-tight bg-transparent focus:outline-none" 
            @input="onInput"
            />

        <icon 
            value="arrow-right" 
            class="px-2 text-secondary" 
            />

        <input 
            :value="range.to"
            ref="toInput"
            type="time" 
            placeholder="00:00" 
            class="py-2 text-sm text-primary leading-tight bg-transparent focus:outline-none" 
            @input="onInput"
            />

        <span v-show="errorMessage" class="absolute flex items-center justify-center w-8 h-full right-0 top-0 text-red-500">
            <tooltip placement="bottom">
                <icon value="warning" />
                <div slot="message">{{ errorMessage }}</div>
            </tooltip>
        </span>
    </div>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'TimeRangeInput',
    components: { Icon },
    props: {
        range: {
            type: Object,
            validator: value => {
                return value.from !== undefined && value.to !== undefined;
            }
        }
    },
    data() {
        return {
            errorMessage: null,
            valid: false,
        }
    },
    mounted() {
        this.errorMessage = this.updateErrorMessage();
    },
    watch: {
        range() {
            this.errorMessage = this.updateErrorMessage();
        }
    },
    methods: {
        onInput() {
            this.validate();
            this.$emit(
                'change', 
                { 
                    from: this.$refs.fromInput.value, 
                    to: this.$refs.toInput.value,
                    valid: this.valid
                }
            );
        },
        timeToDecimal(timeString) {
            if(!timeString.includes(':')) return null;
            const [hours, minutes] = timeString.split(':');
            return parseInt(hours) + (parseInt(minutes)/60);
        },
        updateErrorMessage() {
            console.log('updateErrorMessage');

            if(!this.range.from || !this.range.to) return null;

            const fromInDecimals = this.timeToDecimal(this.range.from);
            const toInDecimals = this.timeToDecimal(this.range.to);

            if(fromInDecimals && toInDecimals) {
                if(fromInDecimals > toInDecimals) {
                    return 'Start time cannot be greater than end time';
                } else if(fromInDecimals === toInDecimals) {
                    return 'Start time cannot be same as end time';
                }
            }
            return null;
        },
        validate() {
            const fromInDecimals = this.timeToDecimal(this.$refs.fromInput.value);
            const toInDecimals = this.timeToDecimal(this.$refs.toInput.value);

            if(!fromInDecimals || !toInDecimals) {
                this.valid = false;
                return;
            } else if(fromInDecimals >= toInDecimals) {
                this.valid = false;
                return;
            }

            this.valid = true;
        }
    }
}
</script>

<style lang="scss">
.mobile-input {
    font-family: sans-serif;
    font-size: 14px;
    padding: 0.5rem 0.5rem;

    &:focus {
        outline: none;
        border: 1px solid #3B97DE;
        box-shadow: 0 0 0 3px rgba(59, 151, 222, .5);
    }
}
</style>