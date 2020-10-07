<template>
    <div class="flex justify-between items-stretch py-1 border-b border-subtle text-sm text-primary">
        
        <div v-if="draggable" class="flex-none flex items-center h-8 mr-2">
            <icon value="drag" class="text-gray-600 cursor-grab" />
        </div>

        <div v-if="selectable" class="flex-none flex items-center h-8 mr-2">
            <checkbox :value="selected" @click="selected = !selected" />
        </div>

        <div class="flex-1 flex items-start" style="margin-top: 6px">
            <slot />
        </div>

        <!-- UI controls -->
        <div class="flex-none h-full pl-2">
            <icon-button value="edit" />
            <pop-over ref="popover">
                <template #popover>
                    <div class="w-20">
                        <div>
                            <base-button plain type="primary" @click="$refs.popover.close()" class="w-full mb-2">Cancel</base-button>
                        </div>
                        <base-button plain type="error" @click="onDelete" class="w-full">Delete</base-button>
                    </div>
                </template>
                <template #reference>
                    <icon-button value="trash" />
                </template>
            </pop-over>
        </div>
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
        selectable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            selected: false
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