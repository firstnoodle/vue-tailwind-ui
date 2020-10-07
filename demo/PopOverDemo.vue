<template>
    <demo-wrapper title="PopOver demo">
        <pop-over ref="popover">
            <template #popover>
                <div class="w-20">
                    <div>
                        <base-button @click="onCancel" class="w-full mb-2">Cancel</base-button>
                    </div>
                    <base-button @click="onDelete" class="w-full">Delete</base-button>
                </div>
            </template>
            <template #reference>
                <icon-button value="trash" />
            </template>
        </pop-over>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import PopOver from '~/components/PopOver.js';
import BaseButton from '~/components/BaseButton';
import IconButton from '~/components/IconButton';

export default {
    name: 'ListItemDemo',
    components: { BaseButton, DemoWrapper, IconButton, PopOver },
    data() {
        return {
        }
    },
    methods: {
        onCancel() {
            console.log('cancel');
            this.$refs.popover.close();
        },
        onDelete() {
            console.log('delete');
            this.$refs.popover.close();
        }
    }
}
</script>