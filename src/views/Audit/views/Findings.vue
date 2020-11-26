<template>
    <view-content title="Findings" icon="index-finger-right">

        <draggable 
            v-model="findings" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="(item, index) in findings"
                    :key="item.uiState.listId"
                    deletable
                    draggable
                    :edit="item.uiState.edit"
                    @delete="$store.commit(`audits/${audit_id}/findings/DELETE_ITEM`, item.id)"
                    class="last:mb-4"
                    >

                    <!-- Title, severity, department, open in popup -->
                    <router-link :to="{ name: 'Audit findings', params: { id: audit_id, finding: item.id }}" class="w-full">
                        <div class="w-full mb-2 text-sm text-primary font-bold">
                            <span class="font-light">{{ `Q${index+1}` }}</span> 
                            {{ item.data.title }}
                        </div>
                        <div class="pt-1 pb-2" v-if="item.data.severity">
                            <severity-tag :severity="item.data.severity" />
                        </div>
                    </router-link>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <!-- <inline-finding-editor :finding="currentFinding" /> -->
                            <div class="w-full p-2 border border-subtle foucs-within:border-action rounded-md focus-within:shadow-outline">
                                <input 
                                    v-model="findingTitle" 
                                    placeholder="Finding title - keep it short and precise" 
                                    ref="findingTitleInput" 
                                    type="text" 
                                    class="css-placeholder w-full mb-2 text-sm text-primary font-bold focus:outline-none" 
                                    />
                                <severity-select v-model="selectedSeverity" @change="onSeverityChange" />
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
                                {{ 'Add finding' }}
                            </base-button>
                            <base-button @click="cancelEditFinding(item)" plain type="primary">Cancel</base-button>
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
                Add finding
            </base-button>
        </div>

        <portal to="modal">
            <finding-modal v-if="$route.params.finding" @close="$router.push({ name: 'Audit findings', params: { id: audit_id, finding: null }})" />
        </portal>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit information requests' }" icon="information" label="Info. Requests" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit suggestions' }" icon="message" label="Suggestions" placement="right" />
        </template>
    </view-content>
</template>

<script>
import BaseButton from '~/components/BaseButton.js';
import draggable from 'vuedraggable';
import FindingModal from '~/components/FindingModal';
import ListItem from '~/components/ListItem';
import SeveritySelect from '~/components/SeveritySelect';
import SeverityTag from '~/components/SeverityTag';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Findings',
    components: { BaseButton, draggable, FindingModal, ListItem, SeveritySelect, SeverityTag, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: null,
            currentFinding: null,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            findingTitle: null,
            modalVisible: false,
            posting: false,
            selectedSeverity: null,
            severityOptions: [
                { label: 'MINOR', value: 'MINOR' },
                { label: 'MAJOR', value: 'MAJOR' },
                { label: 'CRITICAL', value: 'CRITICAL' },
            ],
            showAddNewButton: true,
        }
    },
    computed: {
        computedGroupCheck() {
            if(this.$store.getters[`audits/${this.audit_id}/findings/itemsSelectedCount`] === this.$store.state.audits[this.audit_id].findings.items.length) return 1;
            if(this.$store.getters[`audits/${this.audit_id}/findings/itemsSelectedCount`]) return 2;
            return 0;
        },
        computedSaveButtonDisabled() {
            if(!this.findingTitle) return true;
            return false;
        },
        findings: {
            get() {
                return this.$store.state.audits[this.audit_id].findings.items;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/findings/UPDATE_ITEMS`, value)
            }
        }
    },

    beforeRouteEnter (to, from, next) {
        next();
    },
    beforeRouteUpdate (to, from, next) {
        next();
    },

    created() {
        this.audit_id = this.$route.params.id; 
    },

    beforeDestroy() {
        this.$store.dispatch(`audits/${this.audit_id}/findings/cancelEditItems`);
    },

    methods: {
        cancelEditFinding(item) {
            if(!item) return;

            this.currentFinding = null;
            this.$store.dispatch(`audits/${this.audit_id}/findings/cancelEditItem`, item);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewButton = true, 20);
        },

        onItemEdit(item) {
            this.$store.dispatch(`audits/${this.audit_id}/findings/cancelEditItems`);
            this.showAddNewButton = false;
            item.uiState.edit = true
            // this.currentFinding = item;
        },

        onOpenNewItem() {
            this.$store.commit(
                `audits/${this.audit_id}/findings/ADD_ITEM`,
                this.$store.getters[`audits/${this.audit_id}/findings/emptyFinding`]
            );
            this.showAddNewButton = false;
            this.$nextTick(() => this.$refs.findingTitleInput[0].focus());
        },

        onSeverityChange(value) {
            this.selectedSeverity = value;
        },

        onSeverityClear() {
            this.selectedSeverity = null;
        },

        saveItem() {                
            this.posting = true;
            setTimeout(() => {
                const emptyFinding = this.$store.getters[`audits/${this.audit_id}/findings/emptyFinding`];
                emptyFinding.title = this.findingTitle;
                emptyFinding.severity = this.selectedSeverity;

                this.$store.commit(`audits/${this.audit_id}/findings/SAVE_ITEM`, { ...emptyFinding });
                this.selectedSeverity = null;
                this.findingTitle = null;
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


<style lang="scss" scoped>
.css-placeholder::placeholder, .css-placeholder::-webkit-input-placeholder {
    font-weight: normal;
    font-style: italic;
}
</style>