<template>
    <demo-wrapper title="ListItem demo">
        <div v-if="computedSelectCount" class="">
            <base-button size="xs" icon="trash" />
        </div>
        <draggable 
            v-model="auditRequirementsTable" 
            v-bind="dragOptions"
            handle=".drag-handle"
            @start="drag = true"
            @end="drag = false"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in auditRequirementsTable"
                    :key="item.listId"
                    :edit="item.edit"
                    :draggable="true" 
                    :selectable="true"
                    :selected="item.selected"
                    @select="onItemSelect(item.id)"
                    @delete="onItemDelete(item.id)"
                    >
                    {{ item.description }}

                    <template #edit>
                        <div class="flex mb-2">
                            <fn-select 
                                v-model="selectCurrentOption" 
                                filterable
                                :focus-after-select="false"
                                focus-on-mounted
                                :loading="selectLoading"
                                loading-text="Searching.."
                                :remoteMethod="selectFetchOptions"
                                no-match-option-text="Create requirement"
                                placeholder="Select requirement"
                                @select="onSelectOption"
                                @createNew="selectCreateNew"
                                >
                                    <fn-select-option 
                                        v-for="option in selectOptions" 
                                        :key="option.id" 
                                        :label="option.label" 
                                        :value="option"
                                        :disabled="getOptionDisabledState(option)"
                                    />
                            </fn-select>
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="addButton"
                                icon="plus"
                                type="primary"
                                :loading="posting" 
                                @click="saveNewItem" 
                            >
                                Add request
                            </base-button>
                            <base-button @click="cancelAddNewItem" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </transition-group>
        </draggable>

        <!-- Add new button -->
        <div class="mt-4" v-if="!computedEditState">
            <base-button @click="openNewItem" plain type="primary" icon="plus">Add request</base-button>
        </div>
    </demo-wrapper> 
</template>

<script>
import jsonData from './data/requirements.json';
import BaseButton from '~/components/BaseButton.js';
import DemoWrapper from './DemoComponents/DemoWrapper';
import draggable from 'vuedraggable';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';

export default {
    name: 'ListItemDemo',
    components: { BaseButton, DemoWrapper, draggable, FnSelect, FnSelectOption, ListItem },
    data() {
        return {
            auditRequirementsTable: null,
            drag: false,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            listIdIncrementor: 0,
            posting: false,
            requirementsTable: null,
            selectCurrentOption: null,
            selectLoading: false,
            selectOptions: null,
        }
    },
    computed: {
        computedEditState() {
            for(const item of this.auditRequirementsTable) {
                if(item.edit) return true;
            }
            return false;
        },
        computedSelectCount() {
            let count = 0;
            for(const item of this.auditRequirementsTable) {
                if(item.selected) count++;
            }
            return count;
        }
    },
    created() {
        // The "database"
        this.requirementsTable = jsonData.requirements;

        this.auditRequirementsTable = this.requirementsTable
            .filter(requirement => (requirement.default))
            .map(requirement => {
                return {
                    id: requirement.id,
                    listId: ++this.listIdIncrementor,
                    description: requirement.description,
                    edit: false,
                    selected: false,
                }
            });

    },
    methods: {
        saveNewItem() {                
            this.posting = true;
            setTimeout(() => {
                this.auditRequirementsTable.forEach(option => {
                    if(option.edit) {
                        // TODO: id needs to be updated, but this way the ui glitches
                        // solution: created view/list id for every item
                        option.id = this.selectCurrentOption.value.id;
                        option.description = this.selectCurrentOption.value.description;
                        option.selected = false;
                        option.edit = false;
                    }
                });
                this.selectCurrentOption = null;
                this.selectOptions = null;
                this.posting = false;
            }, 1000);
        },

        cancelAddNewItem() {
            this.selectCurrentOption = null;
            this.selectOptions = null;
            this.auditRequirementsTable = this.auditRequirementsTable.filter(item => !(item.edit));
        },

        openNewItem() {
            this.auditRequirementsTable.push({
                id: null,
                listId: ++this.listIdIncrementor,
                description: null,
                edit: true,
                selected: false
            });
        },

        fakeApiCall(query) {
            this.selectOptions = this.requirementsTable
                .filter(requirement => {
                    const targetString = requirement.description.toLowerCase();
                    const queryString = query.toLowerCase();
                    return targetString.includes(queryString);
                })
                .map(requirement => {
                    return { 
                        label: requirement.description, 
                        value: requirement 
                    }
                });

            this.selectLoading = false;
        },

        getOptionDisabledState(option) {
            const ids = this.auditRequirementsTable.map(o => o.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onItemDelete(id) {
            this.auditRequirementsTable = this.auditRequirementsTable.filter(item => item.id !== id);
        },

        onItemSelect(id) {
            const target = this.auditRequirementsTable.find(requirement => requirement.id === id);
            target.selected = !target.selected;
        },

        onSelectOption(option) {
            this.selectCurrentOption = option;

            // focus addButton
            if(this.$refs.addButton.length === 1) {
                this.$nextTick(() => {
                    this.$refs.addButton[0].$el.focus();
                });
            } else {
                console.error('[ListItemDemo] too many or few items in $refs.addButton array. Should only contain one');
            }
        },

        selectCreateNew() {

        },

        selectFetchOptions(value, charsAdded) {
            if(this.selectOptions !== null) { // did we make an API call ?
                if(this.selectOptions.length === 0 && charsAdded > 0) { // do we have any results ?
                    return;
                }
            }

            this.selectLoading = true;
            setTimeout(this.fakeApiCall.bind(null, value), 500);
        },
    }
}
</script>