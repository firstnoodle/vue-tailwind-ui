<template>
    <view-content title="Conclusion" icon="conclusion">

        <audit-rating 
            :rating="$store.state.audits[audit_id].rating" 
            @rating-changed="onRatingChange" 
            />

        <div class="w-full my-8">
            <header class="w-full border-b border-subtle text-sm text-brand">
                {{ 'Conclusion text' }}
            </header>
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
        </div>

        <focus-area-status 
            v-for="focusArea in Object.keys($store.getters[`audits/${this.audit_id}/findings/findingsByFocusArea`])" 
            :key="focusArea"
            :focus-area="focusArea"
            />

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit suggestions' }" icon="message" label="Suggestions" placement="left" />
        </template>
    </view-content>
</template>

<script>
import { SEVERITY_LEVELS } from '~/enums';
import AuditRating from '~/components/AuditRating/main';
import FocusAreaStatus from '~/components/application/FocusAreaStatus';
import TextEditor from '~/components/TextEditor';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Conclusion',
    components: { AuditRating, FocusAreaStatus, TextEditor, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: this.$route.params.audit,
            editorContent: '',
            savedContent: null,
            saving: false,
            saved: false,
            severityLevels: SEVERITY_LEVELS
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
        this.editorContent = this.$store.state.audits[this.audit_id].conclusion;
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
        onRatingChange(value) {
            this.$store.commit(
                `audits/${this.audit_id}/UPDATE_RATING`, 
                value === this.$store.state.audits[this.audit_id].rating ? null : value
            );
        },
        save() {
            this.saving = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/UPDATE_CONCLUSION`, this.editorContent);
                this.savedContent = this.editorContent;
                this.saving = false;
                this.saved = true;
            }, 1000);
        }
    }
}
</script>