<template>
    <base-popper 
        :options="popperOptions"
        @hide="onPopperHide"
        @show="onPopperShow"
        >
        <div class="popper max-w-xs rounded-lg shadow-md bg-default border border-subtle">
            <header v-if="filterable" class="flex items-center border-b border-subtle overflow-hidden">
                <icon value="magnifying-glass" class="pl-4 pr-2 text-gray-600" />
                <input 
                    ref="input"
                    type="text" 
                    class="w-full py-2 text-sm font-light bg-default rounded-tr-lg focus:outline-none" 
                    placeholder="Search" 
                    />
            </header>
            <scrollbar
                wrap-class=""
                view-class=""
                ref="scrollbar"
                v-show="true"
                >
                <slot name="options" />
            </scrollbar>
            <button 
                v-if="clearSelectionText" 
                @click="$emit('clear')"
                class="flex items-center w-full px-4 py-2 text-sm text-action border-t border-subtle rounded-b-lg bg-default hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
                >
                <icon value="error" />
                <span class="ml-2">{{ clearSelectionText }}</span>
            </button>
        </div>

        <button 
            slot="reference" 
            :class="{ 'border-action shadow-outline' : popperVisible, 'border-subtle' : !popperVisible }"
            class="inline-flex items-center px-2 py-1 text-action border rounded-md hover:bg-blue-100 hover:border-action focus:outline-none focus:shadow-outline focus:border-action" 
            style="padding: 0.125rem 0.5rem"
            >
            <icon value="building" />
            <span class="ml-1 text-sm font-light">Department</span>
        </button>
    </base-popper>
</template>

<script>
import BasePopper from '~/components/BasePopper';
import Icon from '~/components/Icon';
import Scrollbar from '~/components/Scrollbar/main.js';

export default {
    name: 'PopSelect',
    components: { BasePopper, Icon, Scrollbar },
    props: {
        clearSelectionText: {
            type: String,
            default: null
        },
        filterable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            popperOptions: {
                placement: 'bottom-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [-1, 2]
                        },
                    }
                ]
            },
            popperVisible: false,
        }
    },
    methods: {
        onPopperHide() {
            this.popperVisible = false;
        },
        onPopperShow() {
            this.popperVisible = true;
            if(this.$refs.input) {
                this.$nextTick(() => this.$refs.input.focus());
            }
        }
    }
}
</script>