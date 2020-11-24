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
                    :key="item.listId"
                    :draggable="true" 
                    :edit="item.edit"
                    @delete="$store.commit(`audits/${audit_id}/findings/DELETE_ITEM`, item.id)"
                    class="last:mb-4"
                    >

                    <!-- Title, severity, department, open in popup -->
                    <router-link :to="{ name: 'Audit findings', params: { id: audit_id, finding: item.listId }}" class="w-full">
                        <div class="w-full mb-2 text-base text-primary font-bold focus:outline-none">
                            <span class="font-light">{{ `Q${index+1}` }}</span> 
                            {{ item.title }}
                        </div>
                        <div class="pt-1 pb-2">
                            <severity-tag :severity="item.severity" />
                        </div>
                    </router-link>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <!-- <inline-finding-editor :finding="currentFinding" /> -->
                            <div class="w-full p-2 border border-subtle foucs-within:border-action rounded-md focus-within:shadow-outline">
                                <input v-model="findingTitle" ref="findingTitleInput" type="text" class="w-full mb-2 text-base text-primary font-bold focus:outline-none" />
                                <pop-select 
                                    v-model="selectedSeverity"
                                    clearSelectionText="No Severity" 
                                    icon="warning"
                                    null-label="Severity"
                                    @change="onSeverityChange"
                                    @clear="onSeverityClear" 
                                    >
                                    <template #options>
                                        <pop-select-option 
                                            v-for="option in severityOptions" 
                                            :key="option.value"
                                            :label="option.label"
                                            :value="option.value"
                                            />
                                    </template>
                                </pop-select>
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
            <modal 
                v-if="$route.params.finding" 
                @close="$router.push({ name: 'Audit findings', params: { id: audit_id, finding: null }})"
                >
                <template #title>
                    <icon value="index-finger-right" />
                    <span class="ml-2 text-sm font-light">Finding Q1</span>
                </template>
                <template>
                    <div class="group flex items-center justify-between">
                        <div class="flex-1 font-medium text-primary group-hover:text-action">Floor drain not cleaned often enough</div>
                        <icon-button value="edit" class="flex-0" />
                    </div>
                    <div class="text-xs text-gray-500 pb-4">
                        Created 10 Sep 2020 12:23 by NSTQ (Seabstian Rønde Thielke)
                    </div>
                    <div class="inline-flex items-center px-2 py-1 bg-yellow-500 text-yellow-900 rounded-md" style="padding: 0.125rem 0.5rem">
                        <icon value="warning" />
                        <span class="ml-1 text-sm font-light">MAJOR</span>
                    </div>
                    <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md ml-2" style="padding: 0.125rem 0.5rem">
                        <icon value="building" />
                        <span class="ml-1 text-sm font-light">Department</span>
                    </div>

                    <div class="border border-subtle rounded-md h-64 mt-4 p-4 italic text-gray-500 text-sm font-light mb-4">Describe the finding</div>

                    <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md" style="padding: 0.125rem 0.5rem">
                        <icon value="tag" />
                        <span class="ml-1 text-sm font-light">Keyword</span>
                    </div>
                    <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md ml-2" style="padding: 0.125rem 0.5rem">
                        <icon value="crosshair" />
                        <span class="ml-1 text-sm font-light">Focus area</span>
                    </div>
                    <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md ml-2" style="padding: 0.125rem 0.5rem">
                        <icon value="trend" />
                        <span class="ml-1 text-sm font-light">Trend category</span>
                    </div>
                    <div class="mt-4">
                        Lorem ipsum dolor sits amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit.
            Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet.
            Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit.
            Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet.
            Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante.
                    </div>
                </template>
            </modal>
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
import Icon from '~/components/Icon';
import IconButton from '~/components/IconButton';
import ListItem from '~/components/ListItem';
import Modal from '~/components/Modal';
import PopSelect from '~/components/PopSelect/main';
import PopSelectOption from '~/components/PopSelect/option';
import SeverityTag from '~/components/SeverityTag';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Findings',
    components: { BaseButton, draggable, Icon, IconButton, ListItem, Modal, PopSelect, PopSelectOption, SeverityTag, ViewContent, ViewContentFooterLink },
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
                { label: 'Minor', value: 'Minor' },
                { label: 'Major', value: 'Major' },
                { label: 'Critical', value: 'Critical' },
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
            item.edit = true
            this.currentFinding = item;
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
            // this.$store.commit(`audits/${this.audit_id}/findings/UPDATE_ITEM_ATTRIBUTE`, 'severity', value)
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