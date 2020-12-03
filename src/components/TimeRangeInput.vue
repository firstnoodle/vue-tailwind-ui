<template>
    <div
        class="relative inline-flex items-center overflow-hidden pl-1 pr-8 py-1 border border-default rounded-md shadow-inner-sm focus-within:shadow-outline focus-within:border-action"
        :class="{ 'border-red-500 focus:border-red-600' : errorMessage }"
        >
        <!-- Mobile -->
        <input 
            :value="range.from"
            ref="fromInputMobile"
            type="time" 
            class="inline-block md:hidden p-1 text-sm text-primary leading-tight bg-transparent focus:outline-none" 
            @input="onInput"
            />

        <!-- Desktop -->
        <input 
            :value="range.from"
            ref="fromInputDesktop"
            type="text" 
            placeholder="07:45" 
            style="width: 6ch"
            class="hidden md:inline-block p-1 text-sm text-primary leading-tight bg-transparent rounded-md hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-inner" 
            :class="{ 'text-primary' : fromFormatValid, 'text-red-700' : !fromFormatValid }"
            @input="onKeyboardInput"
            />

        <icon 
            value="arrow-right" 
            class="mr-1 text-secondary" 
            />

        <!-- Mobile -->
        <input 
            :value="range.to"
            ref="toInputMobile"
            type="time" 
            class="inline-block md:hidden p-1 text-sm text-primary leading-tight bg-transparent focus:outline-none" 
            @input="onInput"
            />

        <!-- Desktop -->
        <input 
            :value="range.to"
            ref="toInputDesktop"
            type="text" 
            placeholder="13:05" 
            style="width: 6ch"
            class="hidden md:inline-block p-1 text-sm text-primary leading-tight bg-transparent rounded-md hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-inner" 
            :class="{ 'text-primary' : toFormatValid, 'text-red-700' : !toFormatValid }"
            @input="onKeyboardInput"
            />

        <span class="absolute flex items-center justify-center w-8 h-full right-0 top-0 text-red-500">
            <tooltip v-if="errorMessage" placement="bottom">
                <icon value="warning" />
                <div slot="message">{{ errorMessage }}</div>
            </tooltip>
            <icon v-if="valid" value="check" class="text-green-600" />
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
        },
    },
    data() {
        return {
            errorMessage: null,
            fromFormatValid: false,
            toFormatValid: false,
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
        getInputs() {
            let from, to;
            if(this.$store.state.isMobile) {
                from = this.$refs.fromInputMobile.value;
                to = this.$refs.toInputMobile.value;
            } else {
                from = this.$refs.fromInputDesktop.value;
                to = this.$refs.toInputDesktop.value;
            }
            return { from, to };
        },

        onKeyboardInput() {
            const oldFrom = this.fromFormatValid;

            this.validateFormats(this.getInputs());

            if(!oldFrom && this.fromFormatValid) {
                this.$refs.toInputDesktop.focus();
            }

            this.onInput();
        },

        onInput() {
            this.validate();
            const payload = this.getInputs();

            if(this.range.from) {
                if(this.range.from.length === 1 && payload.from.length === 2) {
                    payload.from += ':';
                } else if(this.range.from.slice(-1) === ':' && payload.from.slice(-1) === ':') {
                    payload.from = this.range.from;
                }
            }
            if(this.range.to) {
                if(this.range.to.length === 1 && payload.to.length === 2) {
                    payload.to += ':';
                }
            }

            this.$emit(
                'change', 
                {
                    ...payload,
                    valid: this.valid
                }
            );
        },

        timeToDecimal(timeString) {
            if(!timeString.includes(':')) return null;
            if(!this.validateFormat(timeString)) return;
            const [hours, minutes] = timeString.split(':');
            return parseInt(hours) + (parseInt(minutes)/60);
        },

        updateErrorMessage() {
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
            const { from, to } = this.getInputs();

            const fromInDecimals = this.timeToDecimal(from);
            const toInDecimals = this.timeToDecimal(to);

            if(!fromInDecimals || !toInDecimals) {
                this.valid = false;
                return;
            } else if(fromInDecimals >= toInDecimals) {
                this.valid = false;
                return;
            }

            this.valid = true;
        },

        validateFormat(timeString) {
            return /^([012]|[01][0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
        },

        validateFormats({from, to}) {
            this.fromFormatValid = this.validateFormat(from);
            this.toFormatValid = this.validateFormat(to);
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