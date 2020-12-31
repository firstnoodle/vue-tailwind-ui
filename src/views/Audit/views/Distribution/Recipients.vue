<template>
    <div class="w-full my-8">
        <header class="w-full border-b border-subtle text-sm text-brand">
            <span class="capitalize">{{ target }}</span>
            {{ ' recipients' }}
        </header>

        <draggable 
            v-model="recipients" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item
                    v-for="recipient in recipients"
                    :key="recipient.uiState.listId"
                    deletable
                    draggable
                    editable
                    :edit="recipient.uiState.edit"
                    @edit="editRecipient(recipient)"
                    @delete="$store.dispatch(`audits/${audit_id}/distribution/deleteRecipient`, { target, recipient })"
                    >

                    <div class="inline-flex w-2/3 md:w-1/2">{{ recipient.data.initials + ' (' + recipient.data.name + ')' }}</div>
                    <div v-if="recipient.data.copy" class="inline-flex w-1/3 md:w-1/2">{{ 'CC' }}</div>
                    
                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            Add Recipient UI
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="savePlanRecipientButton"
                                icon="plus"
                                type="primary"
                                :disabled="computedSaveRecipientButtonDisabled"
                                :loading="savingRecipient" 
                                @click.stop.prevent="saveRecipient(recipient)" 
                            >
                                {{ recipient.id ? 'Update recipient' : 'Add recipient' }}
                            </base-button>
                            <base-button @click="cancelEditRecipient(recipient)" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </transition-group>
        </draggable>

        <base-button 
            v-if="showAddRecipientButton"
            icon="plus"
            plain 
            ref="addPlanRecipientButton"
            type="primary" 
            class="mt-2"
            @click.stop.prevent="addRecipient" 
            >
            Add recipient
        </base-button>
    </div>
    
</template>

<script>
import BaseButton from '~/components/BaseButton';
import draggable from 'vuedraggable';
import ListItem from '~/components/ListItem';

export default {
    name: 'Recipients',
    components: { BaseButton, draggable, ListItem },
    props: {
        target: {
            type: String,
            required: true,
            validator: value => {
                return ['plan', 'report'].indexOf(value) !== -1;
            }
        }
    },
    data() {
        return {
            audit_id: this.$route.params.audit,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            savingRecipient: false,
            showAddRecipientButton: true,
        }
    },
    computed: {
        computedSaveRecipientButtonDisabled() {
            return false;
        },
        recipients: {
            get() {
                return this.$store.state.audits[this.audit_id].distribution[this.target].recipients;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/distribution/UPDATE_PLAN_RECIPIENTS`, value)
            }
        }
    },
    methods: {
        addRecipient() {
            this.$store.commit(`audits/${this.audit_id}/distribution/ADD_RECIPIENT`, this.target);
            this.showAddRecipientButton = false;
        },
        cancelEditRecipient(recipient) {
            this.$store.dispatch(
                `audits/${this.audit_id}/distribution/cancelEditRecipient`,
                {
                    target: this.target,
                    recipient
                }
            );
            this.showAddRecipientButton = true;
        },
        editRecipient(recipient) {
            console.log(recipient);
        },
        saveRecipient(recipient) {
            console.log('save recipient', recipient);
        },
    }
}
</script>