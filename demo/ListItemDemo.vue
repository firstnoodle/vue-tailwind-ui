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
                    :draggable="true" 
                    :selectable="true"
                    @delete="onItemDelete(item.id)"
                    >
                    {{ item.description }}
                </list-item>
            </transition-group>
        </draggable>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import ListItem from '~/components/ListItem';
import draggable from 'vuedraggable';

export default {
    name: 'ListItemDemo',
    components: { DemoWrapper, draggable, ListItem },
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
                    description: 'List of deviations/NCs (excel file)',
                },
                {
                    id: 2,
                    selected: false,
                    description: 'List of change requests (excel file)',
                },
                {
                    id: 3,
                    selected: false,
                    description: 'List of recalls and potential recalls',
                },
                {
                    id: 4,
                    selected: false,
                    description: 'List of CAPA',
                },
                {
                    id: 5,
                    selected: false,
                    description: 'Presentation and minutes of the two latest QMRs',
                },
                {
                    id: 6,
                    selected: false,
                    description: 'Site Master File incl. drawing of the buildings in scope (layout/classification plan)',
                },
                {
                    id: 7,
                    selected: false,
                    description: 'Introduction to ongoing major projects',
                },
            ]
        }
    },
    methods: {
        onItemDelete(id) {
            this.items = this.items.filter(item => item.id !== id);
        }
    }
}
</script>