<template>
    <view-content title="Audit team" icon="team">

        <draggable 
            v-model="team" 
            v-bind="dragOptions"
            handle=".drag-handle"
            @start="drag = true"
            @end="drag = false"
            >
            <transition-group type="transition">
                <list-item 
                    v-for="item in team"
                    :key="item.listId"
                    :edit="item.edit"
                    editable
                    @edit="onItemEdit(item)"
                    :draggable="true" 
                    @delete="$store.commit(`audits/${audit_id}/team/DELETE_USER`, item.id)"
                    class="last:mb-4"
                    >
                    <div class="inline-flex w-2/3 md:w-1/2">{{ item.initials + ' (' + item.name + ')' }}</div>
                    <div class="inline-flex w-1/3 md:w-1/2">{{ item.role }}</div>

                    <template #edit>
                        <div class="flex pr-0 md:pr-16 mb-2">
                            <div class="w-2/3 md:w-1/2 mr-2">
                                <fn-select 
                                    v-model="selectedUser" 
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
                                    v-model="selectedRole" 
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
                                :disabled="computedsaveButtonDisabled"
                                :loading="posting" 
                                @click.stop.prevent="saveItem" 
                            >
                                {{ $store.getters[`audits/${audit_id}/team/userUnsaved`](item) ? 'Add team member' : 'Update team member' }}
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
            drag: false,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            posting: false,
            roleOptions: null,
            selectedRole: null,
            selectedUser: null,
            showAddNewButton: true,
            updateAfterDestroy: false,
            userSelectLoading: false,
            userOptions: null,
        }
    },
    computed: {
        computedsaveButtonDisabled() {
            if(!this.selectedRole || !this.selectedUser) return true;
            return false;
        },
        team: {
            get() {
                return this.$store.state.audits[this.audit_id].team.users;
            },
            set(value) {
                this.$store.commit(`audits/${this.audit_id}/team/UPDATE_ORDER`, value)
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
        this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditUsers`);
    },

    methods: {
        cancelEditUser(item) {
            if(!item) return;

            this.selectedRole = null;
            this.selectedUser = null;
            this.userOptions = null;
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditUser`, item);

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
            const ids = this.$store.state.audits[this.audit_id].team.users.map(o => o.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onItemEdit(item) {
            this.$store.dispatch(`audits/${this.audit_id}/team/cancelEditUsers`);
            this.showAddNewButton = false;
            item.edit = true
            this.selectedUser = {
                label: `${item.initials} (${item.name})`,
                value: {
                    id: item.id,
                    initials: item.initials,
                    name: item.name
                }
            };
            this.selectedRole = {
                label: item.role,
                value: item.role
            };
        },

        onOpenNewItem() {
            this.$store.commit(`audits/${this.audit_id}/team/ADD_USER`);
            this.showAddNewButton = false;
            this.$nextTick(() => this.$refs.userSelect[0].focus());
        },

        onSelectRole(option) {
            this.selectedRole = option;

            // focus saveButton
            if(this.$refs.saveButton.length === 1) {
                this.$nextTick(() => {
                    this.$refs.saveButton[0].$el.focus();
                });
            } else {
                console.error('[ListItemDemo] too many or few items in $refs.saveButton array. Should only contain one');
            }
        },

        onSelectUser(option) {
            this.selectedUser = option;
            if(!this.selectedRole) this.$refs.roleSelect[0].focus();
        },

        saveItem() {                
            this.posting = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.audit_id}/team/SAVE_USER`, { ...this.selectedUser.value, role: this.selectedRole.value });
                this.selectedUser = null;
                this.selectedRole = null;
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