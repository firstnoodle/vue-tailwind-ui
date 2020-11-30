<template>
    <text-editor 
        ref="editor" 
        emphasis
        heading
        history
        list-styles
        :content="editorContent" 
        @change="onEditorChange" 
        >
        <template #header>
            <span class="mr-2 text-xs text-secondary">
                {{ computedStatusMessage }}
            </span>
            <base-button 
                :disabled="!computedDirtyFlag"
                :loading="saving"
                size="xs"
                type="primary" 
                @click="save"
                >
                {{ 'SAVE' }}
            </base-button>
        </template>
    </text-editor>
    
</template>

<script>
import BaseButton from '~/components/BaseButton';
import TextEditor from '~/components/TextEditor';

export default {
    name: 'ContextEditor',
    components: { BaseButton, TextEditor },
    props: {
        value: {
            type: String,
            required: true
        },
        mutation: {
            type: String,
            required: true
            // TODO: validate that mutation exists
        }
    },
    data() {
        return {
            audit_id: this.$route.params.audit,
            editorContent: '',
            savedContent: null,
            saving: false,
            saved: false,
        }
    },
    computed: {
        computedDirtyFlag() {
            return this.editorContent !== this.savedContent;
        },
        computedStatusMessage() {
            if(this.saving) return '';
            if(this.computedDirtyFlag) return 'You have unsaved changes';
            if(!this.computedDirtyFlag && this.saved) return 'Changes was saved!'
            return '';
        }
    },
    watch: {
        value(newValue) {
            this.editorContent = newValue;
        }
    },
    created() {
        this.editorContent = this.value;
    },
    mounted() {
        this.savedContent = this.editorContent = this.$refs.editor.editor.getHTML();
    },
    beforeRouteLeave (to, from, next) {
        if(this.computedDirtyFlag) {
            const answer = window.confirm('You have unsaved changes. Are you sure you want to leave?');
            if (answer) {
                next();
            } else {
                next(false);
            }
        } else {
            next();
        }
    },
    methods: {
        onEditorChange(value) {
            this.editorContent = value;
        },
        save() {
            this.saving = true;
            setTimeout(() => {
                this.$store.commit(this.mutation, this.editorContent);
                this.savedContent = this.editorContent;
                this.saving = false;
                this.saved = true;
            }, 1000);
        }
    }
}
</script>