<template>
    <div v-if="!edit" class="flex justify-between items-stretch py-1 bg-default border-b border-subtle text-sm text-primary">
        
        <div v-if="draggable" class="flex-none flex items-center h-8 mr-2">
            <icon value="drag" class="drag-handle text-gray-600 cursor-grab" />
        </div>

        <div v-if="selectable" class="flex-none flex items-center h-8 mr-2">
            <checkbox :value="selected" @click="$emit('select')" />
        </div>

        <div class="flex-1 flex items-start" style="margin-top: 6px">
            <slot />
        </div>

        <!-- UI controls -->
        <div class="flex-none h-full pl-2">
            <icon-button v-if="this.editable" value="edit" @click="$emit('edit')" />
            <pop-over ref="popover">
                <template #popover>
                    <div class="w-20 flex flex-col">
                        <base-button plain type="primary" @click="$refs.popover.close()" class="w-full mb-2">Cancel</base-button>
                        <base-button plain type="error" @click="onDelete" class="w-full">Delete</base-button>
                    </div>
                </template>
                <template #reference>
                    <icon-button value="trash" />
                </template>
            </pop-over>
        </div>
    </div>
    <div v-else class="relative first:py-0 py-4 bg-white border-b border-subtle last:border-none text-sm text-primary">
        <slot name="edit"/>
    </div>
</template>

<script>
import BaseButton from '~/components/BaseButton';
import Checkbox from '~/components/Checkbox';
import Icon from '~/components/Icon.js';
import IconButton from '~/components/IconButton';
import PopOver from '~/components/PopOver.js';

export default {
    name: 'ListItem',
    components: { BaseButton, Checkbox, Icon, IconButton, PopOver },
    props: {
        draggable: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false,
        },
        editable: {
            type: Boolean,
            default: false
        },
        selectable: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onDelete() {
            this.$refs.popover.close();
            this.$emit('delete');
        }
    }
}
</script>