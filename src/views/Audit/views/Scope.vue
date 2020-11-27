<template>
    <view-content title="Scope" icon="scope" fitToViewHeight>

        <text-editor ref="editor" expand-vertically :content="editorContent" @change="onEditorChange">
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

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit requirements' }" icon="index-finger-up" label="Requirements" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit focus areas' }" icon="crosshair" label="Focus Areas" placement="right" />
        </template>
    </view-content>
</template>

<script>
import BaseButton from '~/components/BaseButton';
import TextEditor from '~/components/TextEditor';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Scope',
    components: { BaseButton, TextEditor, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.id,
            editorContent: null,
            savedContent: null,
            saving: false,
            saved: false
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
    created() {
        this.editorContent = this.$store.state.audits[this.audit_id].scope;
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
                this.$store.commit(`audits/${this.audit_id}/UPDATE_SCOPE`, this.editorContent);
                this.savedContent = this.editorContent;
                this.saving = false;
                this.saved = true;
            }, 1000);
        }
    }
}
</script>