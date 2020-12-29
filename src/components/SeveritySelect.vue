<template>
    <base-popper 
        :options="popperOptions"
        :appendToBody="true"
        :forceShow="visible"
        trigger="soft"
        v-clickoutside="handleClose"
        >
        <div ref="popper" class="z-20 popper max-w-xs rounded-lg shadow-md bg-default border border-subtle">
            <div 
                v-for="option in options" 
                :key="option.name"
                class="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                <severity-tag :severity="option.name" @click="onSelect(option)" />
            </div>
        </div>

        <button 
            slot="reference"
            :class="computedButtonClass"
            class="inline-flex items-center text-sm rounded-md shadow-sm focus:outline-none focus:shadow-outline focus:border-action"
            style="padding: 0.125rem 0.5rem"
            @click.stop="toggleMenu"
            >
            <icon value="warning" />
            <span class="mx-1 text-sm font-light">{{ value || 'Set severity' }}</span>
        </button>
    </base-popper>
</template>

<script>
import { SEVERITY_LEVELS } from '~/enums';
import Clickoutside from '~/utils/click-outside';
import BasePopper from '~/components/BasePopper';
import Icon from '~/components/Icon';
import SeverityTag from '~/components/SeverityTag';

export default {
    name: 'SeveritySelect',
    components: { BasePopper, Icon, SeverityTag },
    directives: { Clickoutside },
    props: {
        value: {
            type: String,
            validator: value => {
                return Object.values(SEVERITY_LEVELS).indexOf(value) !== -1;
            }
        },
    },
    data() {
        return {
            options: [
                { name: SEVERITY_LEVELS.MINOR, bgColor: 'bg-light-blue-40', textColor: 'text-light-blue-darker' },
                { name: SEVERITY_LEVELS.MAJOR, bgColor: 'bg-golden-sun-lighter', textColor: 'text-granite-grey-darkest' },
                { name: SEVERITY_LEVELS.CRITICAL, bgColor: 'bg-lava-red-darker', textColor: 'text-white' },
            ],
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
            visible: false,
        }
    },
    computed: {
        computedButtonClass() {
            if(this.value === SEVERITY_LEVELS.MINOR) return 'border border-blue-300 bg-light-blue-40 text-light-blue-darker';
            if(this.value === SEVERITY_LEVELS.MAJOR) return 'border border-yellow-600 bg-golden-sun-lighter text-default';
            if(this.value === SEVERITY_LEVELS.CRITICAL) return 'border border-red-800 bg-lava-red-darker text-white';
            return 'border border-action bg-white text-action';
        }
    },
    methods: {
        handleClose() {
            this.visible = false;
        },
        onSelect(value) {
            this.$emit('change', value.name);
        },
        toggleMenu() {
            this.visible = !this.visible;
        },
    }
}
</script>