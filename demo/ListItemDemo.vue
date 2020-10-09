<template>
    <demo-wrapper title="ListItem demo">
        <draggable 
            v-model="items" 
            v-bind="dragOptions"
            handle=".drag-handle"
            @start="drag = true"
            @end="drag = false"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in items"
                    :key="item.id"
                    :edit="item.edit"
                    :draggable="true" 
                    :selectable="true"
                    @delete="onItemDelete(item.id)"
                    >
                    {{ item.description }}

                    <template #edit>
                        <div class="flex">
                            Input
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button @click="addNewItem" type="primary" icon="plus">Add request</base-button>
                            <base-button @click="cancelAddNewItem" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </transition-group>
        </draggable>

        <!-- Add new button -->
        <div class="mt-4" v-if="!computedEditState">
            <base-button @click="createNewItem" plain type="primary" icon="plus">Add request</base-button>
        </div>
    </demo-wrapper> 
</template>

<script>
import BaseButton from '~/components/BaseButton.js';
import DemoWrapper from './DemoComponents/DemoWrapper';
import draggable from 'vuedraggable';
import ListItem from '~/components/ListItem';

export default {
    name: 'ListItemDemo',
    components: { BaseButton, DemoWrapper, draggable, ListItem },
    data() {
        return {
            drag: false,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            items: [
                {
                    id: 1,
                    selected: false,
                    edit: false,
                    description: 'List of deviations/NCs (excel file)',
                },
                {
                    id: 2,
                    selected: false,
                    edit: false,
                    description: 'List of change requests (excel file)',
                },
                {
                    id: 3,
                    selected: false,
                    edit: false,
                    description: 'List of recalls and potential recalls',
                },
                {
                    id: 4,
                    selected: false,
                    edit: false,
                    description: 'List of CAPA',
                },
                {
                    id: 5,
                    selected: false,
                    edit: false,
                    description: 'Presentation and minutes of the two latest QMRs',
                },
                {
                    id: 6,
                    selected: false,
                    edit: false,
                    description: 'Site Master File incl. drawing of the buildings in scope (layout/classification plan)',
                },
                {
                    id: 7,
                    selected: false,
                    edit: false,
                    description: 'Introduction to ongoing major projects',
                },
            ]
        }
    },
    computed: {
        computedEditState() {
            for(const item of this.items) {
                if(item.edit) return true;
            }
            return false;
        }
    },
    methods: {
        addNewItem() {
            console.log('add new item');
        },

        cancelAddNewItem() {
            this.items = this.items.filter(item => !(item.edit));
        },

        createNewItem() {
            this.items.push({
                id: Date.now(),
                edit: true
            });
        },

        onItemDelete(id) {
            this.items = this.items.filter(item => item.id !== id);
        }
    }
}
</script>