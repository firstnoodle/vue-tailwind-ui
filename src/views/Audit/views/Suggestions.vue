<template>
    <view-content title="Suggestions" icon="message">

        <draggable 
            v-model="suggestions" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in suggestions"
                    :key="item.uiState.listId"
                    deletable
                    draggable
                    editable
                    :edit="item.uiState.edit"
                    @edit="onItemEdit(item)"
                    @delete="$store.commit(`audits/${audit_id}/suggestions/DELETE_ITEM`, item.id)"
                    class="last:mb-4"
                    >
                    <div class="css-rich-text w-full" v-html="item.data.description"></div>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <div class="w-full">
                                <text-editor 
                                    emphasis
                                    history
                                    inline 
                                    list-styles
                                    ref="editor" 
                                    :content="editorContent" 
                                    @change="onEditorChange" 
                                    />
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="saveButton"
                                icon="plus"
                                type="primary"
                                :disabled="computedSaveButtonDisabled"
                                :loading="posting" 
                                @click.stop.prevent="saveItem" 
                            >
                                {{ item.id ? 'Update suggestion' : 'Add suggestion' }}
                            </base-button>
                            <base-button @click="cancelEditSuggestion(item)" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </transition-group>
        </draggable>

        <!-- Add new button -->
        <div class="" v-if="showAddNewButton">
            <base-button 
                icon="plus"
                plain 
                ref="addNewButton"
                type="primary" 
                @click.stop.prevent="onOpenNewItem" 
                >
                Add suggestion
            </base-button>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit findings' }" icon="index-finger-right" label="Findings" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit conclusion' }" icon="conclusion" label="Conclusion" placement="right" />
        </template>
    </view-content>
</template>

<script>
import BaseButton from '~/components/BaseButton.js';
import draggable from 'vuedraggable';
import ListItem from '~/components/ListItem';
import TextEditor from '~/components/TextEditor';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Suggestions',
    components: { BaseButton, draggable, ListItem, TextEditor, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.id,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            editorContent: '',
            posting: false,
            showAddNewButton: true,
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            if(!this.editorContent.length) return true;
            return false;
        },
        suggestions: {
            get() {
                return this.$store.state.audits[this.audit_id].suggestions.items;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/suggestions/UPDATE_ITEMS`, value)
            }
        }
    },

    beforeDestroy() {
        this.$store.dispatch(`audits/${this.audit_id}/suggestions/cancelEditItems`);
    },

    methods: {
        cancelEditSuggestion(item) {
            if(!item) return;

            this.editorContent = '';
            this.$store.dispatch(`audits/${this.audit_id}/suggestions/cancelEditItem`, item);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewButton = true, 20);
        },

        onEditorChange(value) {
            this.editorContent = value;
        },

        onItemEdit(item) {
            this.$store.dispatch(`audits/${this.audit_id}/suggestions/cancelEditItems`);
            this.showAddNewButton = false;
            item.uiState.edit = true
            this.editorContent = item.data.description;
        },

        onOpenNewItem() {
            this.$store.commit(
                `audits/${this.audit_id}/suggestions/ADD_ITEM`,
                {
                    description: null
                }
            );
            this.showAddNewButton = false;
            this.$nextTick(() => this.$refs.editor[0].focus());
        },

        saveItem() {                
            this.posting = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/suggestions/SAVE_ITEM`, { id: Date.now(), description: this.editorContent });
                this.editorContent = '';
                this.posting = false;

                this.showAddNewButton = true;

                this.$nextTick(() => {
                    this.$refs.addNewButton.$el.focus();
                });
            }, 1000);
        },
    }
}
</script>