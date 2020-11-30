<template>
    <div class="mb-8">
        <header class="flex items-center py-1 mb-2 border-b border-subtle font-medium text-sm">
            <icon value="crosshair" class="mr-2" />
            {{ focusArea }}
        </header>
        <div class="flex items-center">
            <span 
                v-for="severity in Object.values(severityLevels)" 
                :key="severity"
                class="mr-1"
                >
                <severity-tag 
                    v-if="computedFindingsByFocusArea[focusArea].filter(finding => finding.data.severity === severity).length"
                    :severity="severity" 
                    :count="computedFindingsByFocusArea[focusArea].filter(finding => finding.data.severity === severity).length" 
                    />
            </span>
        </div>
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
</template>

<script>
import { SEVERITY_LEVELS } from '~/constants';
import BaseButton from '~/components/BaseButton';
import Icon from '~/components/Icon';
import SeverityTag from '~/components/SeverityTag';
import TextEditor from '~/components/TextEditor';

export default {
    name: 'FocusAreaStatus',
    components: { BaseButton, Icon, SeverityTag, TextEditor },
    props: {
        focusArea: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            audit_id: this.$route.params.audit,
            finding_id: this.$route.params.finding,
            editConclusion: false,
            editorContent: '',
            savedContent: null,
            saving: false,
            saved: false,
            severityLevels: SEVERITY_LEVELS
        }
    },
    created() {
        this.editorContent = this.$store.state.audits[this.audit_id].findings.findingFocusAreaDescriptions[this.focusArea];
    },
    mounted() {
        this.savedContent = this.editorContent = this.$refs.editor.editor.getHTML();
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
        },
        computedFindingsByFocusArea() {
            return this.$store.getters[`audits/${this.audit_id}/findings/findingsByFocusArea`];
        },
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
                this.$store.commit(
                    `audits/${this.audit_id}/findings/UPDATE_FINDING_FOCUS_AREA_DESCRIPTION`, 
                    {
                        description: this.editorContent,
                        focusArea: this.focusArea
                    }
                );
                this.savedContent = this.editorContent;
                this.saving = false;
                this.saved = true;
            }, 1000);
        }
    }
}
</script>