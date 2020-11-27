<template>
    <view-content title="Audit team" icon="team">

        <draggable 
            v-model="team" 
            v-bind="dragOptions"
            handle=".drag-handle"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in team"
                    :key="item.uiState.listId"
                    deletable
                    draggable
                    editable
                    :edit="item.uiState.edit"
                    @edit="onItemEdit(item)"
                    @delete="$store.commit(`audits/${audit_id}/team/DELETE_ITEM`, item.id)"
                    class="last:mb-4"
                    >
                    <div class="inline-flex w-2/3 md:w-1/2">{{ item.data.initials + ' (' + item.data.name + ')' }}</div>
                    <div class="inline-flex w-1/3 md:w-1/2">{{ item.data.role }}</div>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
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
                                <fn-select 
                                    v-model="selectedRoleOption" 
                                    ref="roleSelect"
                                    :focus-after-select="false"
                                    placeholder="Select role"
                                    @select="onSelectRole"
                                    >
                                        <fn-select-option 
                                            v-for="role in roleOptions" 
                                            :key="role.label" 
                                            :label="role.label" 
                                            :value="role"
                                        />
                                </fn-select>
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
                                {{ item.id ? 'Update team member' : 'Add team member' }}
                            </base-button>
                            <base-button @click="cancelEditUser(item)" plain type="primary">Cancel</base-button>
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
                Add team member
            </base-button>
        </div>

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit auditee' }" icon="building" label="Auditee" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit requirements' }" icon="index-finger-up" label="Requirements" placement="right" />
        </template>
    </view-content>
</template>

<script>
import BaseButton from '~/components/BaseButton.js';
import draggable from 'vuedraggable';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

import roles from '~/../demo/data/audit_user_roles.js';
import usersTable from '~/../demo/data/users.js';

export default {
    name: 'Team',
    components: { BaseButton, draggable, FnSelect, FnSelectOption, ListItem, ViewContent, ViewContentFooterLink },
    data() {
        return {
            audit_id: null,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            posting: false,
            roleOptions: null,
            selectedRoleOption: null,
            selectedUserOption: null,
            showAddNewButton: true,
            userSelectLoading: false,
            userOptions: null,
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            if(!this.selectedRoleOption || !this.selectedUserOption) return true;
            return false;
        },
        team: {
            get() {
                return this.$store.state.audits[this.audit_id].team.items;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/team/UPDATE_ITEMS`, value)
            }
        }
    },

    created() {
        this.audit_id = this.$route.params.id; 

        this.roleOptions = roles.map(role => {
            return {
                label: role,
                value: role
            }
        });
    },

    beforeDestroy() {
        this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditItems`);
    },

    methods: {
        cancelEditUser(item) {
            if(!item) return;

            this.selectedRoleOption = null;
            this.selectedUserOption = null;
            this.userOptions = null;
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditItem`, item);

            // TODO: this prevents an unwanted ui glitch - $nextTick doesn't do the job...
            setTimeout(() => this.showAddNewButton = true, 20);
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
            const ids = this.$store.state.audits[this.audit_id].team.items.map(o => o.data.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onItemEdit(item) {
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditItems`);
            this.showAddNewButton = false;
            item.uiState.edit = true
            this.selectedUserOption = {
                label: `${item.data.initials} (${item.data.name})`,
                value: {
                    id: item.data.id,
                    initials: item.data.initials,
                    name: item.data.name
                }
            };
            this.selectedRoleOption = {
                label: item.data.role,
                value: item.data.role
            };
        },

        onOpenNewItem() {
            this.$store.commit(
                `audits/${this.audit_id}/team/ADD_ITEM`,
                {
                    initials: null,
                    name: null,
                    role: null
                }
            );
            this.showAddNewButton = false;
            this.$nextTick(() => this.$refs.userSelect[0].focus());
        },

        onSelectRole(option) {
            this.selectedRoleOption = option;

            this.$nextTick(() => {
                this.$refs.saveButton[0].$el.focus();
            });
        },

        onSelectUser(option) {
            this.selectedUserOption = option;
            if(!this.selectedRoleOption) this.$refs.roleSelect[0].focus();
        },

        saveItem() {                
            this.posting = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/team/SAVE_ITEM`, { ...this.selectedUserOption.value, role: this.selectedRoleOption.value });
                this.selectedUserOption = null;
                this.selectedRoleOption = null;
                this.userOptions = null;
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