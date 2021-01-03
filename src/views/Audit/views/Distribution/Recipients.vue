<template>
    <div class="w-full mb-8">

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
                    @delete="$store.commit(`audits/${audit_id}/distribution/DELETE_RECIPIENT`, { target, recipient })"
                    class="last:mb-2"
                    >

                    <div class="inline-flex w-2/3 md:w-1/2">{{ recipient.data.initials + ' (' + recipient.data.name + ')' }}</div>
                    <div v-if="recipient.data.cc" class="inline-flex items-center space-x-2 w-1/3 md:w-1/2">
                        <icon value="copy" />
                        <span>{{ 'Copy' }}</span>
                    </div>
                    
                    <template #edit>
                        <div class="flex items-center pr-0 md:pr-16 mb-2">
                            <div class="w-2/3 md:w-1/2 mr-2">
                                <fn-select 
                                    v-model="selectedUserOption" 
                                    filterable
                                    :focus-after-select="false"
                                    initial-text="Enter initials or name"
                                    :loading="userSelectLoading"
                                    loading-text="Searching.."
                                    placeholder="Select user"
                                    ref="userSelect"
                                    :remoteMethod="fetchUsers"
                                    @select="onSelectUser"
                                    >
                                        <fn-select-option 
                                            v-for="user in userOptions" 
                                            :key="user.id" 
                                            :label="user.label" 
                                            :value="user"
                                            :disabled="getUserDisabledState(user)"
                                        />
                                </fn-select>
                            </div>
                            <div class="w-1/3 md:w-1/2">
                                <checkbox 
                                    :value="selectedCC" 
                                    ref="checkbox"
                                    label="Copy" 
                                    button
                                    @click="onCheckboxClick"
                                    /> 
                            </div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="saveButton"
                                icon="plus"
                                type="primary"
                                :disabled="computedSaveButtonDisabled"
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
            text
            ref="addPlanRecipientButton"
            type="primary" 
            @click.stop.prevent="addRecipient" 
            >
            Add recipient
        </base-button>
    </div>
    
</template>

<script>
import BaseButton from '~/components/BaseButton';
import Checkbox from '~/components/Checkbox';
import draggable from 'vuedraggable';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import Icon from '~/components/Icon';
import ListItem from '~/components/ListItem';
import usersTable from '~/../demo/data/users.js';

export default {
    name: 'Recipients',
    components: { BaseButton, Checkbox, draggable, FnSelect, FnSelectOption, Icon, ListItem },
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
            selectedCC: false,
            selectedUserOption: null,
            showAddRecipientButton: true,
            userSelectLoading: false,
            userOptions: null,
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            return this.selectedUserOption ? false : true;
        },
        recipients: {
            get() {
                return this.$store.state.audits[this.audit_id].distribution[this.target].recipients;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/distribution/UPDATE_RECIPIENTS`, { target: this.target, recipients: value })
            }
        }
    },
    methods: {
        addRecipient() {
            this.$store.commit(`audits/${this.audit_id}/distribution/ADD_RECIPIENT`, this.target);
            this.showAddRecipientButton = false;
            this.$nextTick(() => this.$refs.userSelect[0].focus());
        },
        cancelEditRecipient(recipient) {
            this.$store.dispatch(
                `audits/${this.audit_id}/distribution/cancelEditRecipient`,
                {
                    target: this.target,
                    recipient
                }
            );
            this.selectedUserOption = null;
            this.selectedCC = false;
            this.showAddRecipientButton = true;
        },
        editRecipient(recipient) {
            this.selectedUserOption = {
                label: `${recipient.data.initials} (${recipient.data.name})`,
                value: {
                    id: recipient.data.id,
                    initials: recipient.data.initials,
                    name: recipient.data.name,
                }
            };
            this.selectedCC = recipient.data.cc;
            recipient.uiState.edit = true;
        },
        fakeApiCall(query) {
            this.userOptions = usersTable
                .filter(user => {
                    const targetName = user.name.toLowerCase();
                    const targetInitials = user.initials.toLowerCase();
                    const queryString = query.toLowerCase();
                    return targetName.includes(queryString) || targetInitials.includes(queryString);
                })
                .map(user => {
                    return { 
                        label: `${user.initials} (${user.name})`, 
                        value: user 
                    }
                });

            this.userSelectLoading = false;
        },

        fetchUsers(value, charsAdded) {
            if(this.userOptions !== null) { // did we make an API call ?
                if(this.userOptions.length === 0 && charsAdded > 0) { // do we have any results ?
                    return;
                }
            }

            this.userSelectLoading = true;
            setTimeout(this.fakeApiCall.bind(null, value), 500);
        },

        getUserDisabledState(option) {
            const ids = this.$store.state.audits[this.audit_id].distribution[this.target].recipients.map(r => r.data.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onCheckboxClick() {
            this.selectedCC = !this.selectedCC;
        },

        onSelectUser(option) {
            this.selectedUserOption = option;
            this.$nextTick(() => this.$refs.checkbox[0].focus());
        },

        saveRecipient(recipient) {
            this.savingRecipient = true;

            setTimeout(() => {
                this.$store.commit(
                    `audits/${this.audit_id}/distribution/SAVE_RECIPIENT`,
                    {
                        target: this.target,
                        recipient: {
                            id: recipient.id || Date.now(),
                            data: { 
                                cc: this.selectedCC, 
                                ...this.selectedUserOption.value 
                            },
                            uiState: {
                                edit: false,
                                listId: recipient.uiState.listId,
                                selected: false
                            }
                        }
                    }
                );
                this.savingRecipient = false;
                this.showAddRecipientButton = true;
                this.selectedUserOption = null;
                this.selectedCC = false;
            }, 500);
        },
    }
}
</script>