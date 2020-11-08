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
                    :draggable="true" 
                    @delete="$store.commit(`audits/${$route.params.id}/DELETE_ITEM`, item.id)"
                    >
                    {{ item.name }}

                    <template #edit>
                        <div class="flex mb-2">
                            <fn-select 
                                v-model="selectCurrentOption" 
                                filterable
                                :focus-after-select="false"
                                focus-on-mounted
                                :loading="selectLoading"
                                loading-text="Searching.."
                                :remoteMethod="selectFetchOptions"
                                placeholder="Select requirement"
                                @select="onSelectOption"
                                >
                                    <fn-select-option 
                                        v-for="option in selectOptions" 
                                        :key="option.id" 
                                        :label="option.label" 
                                        :value="option"
                                        :disabled="getOptionDisabledState(option)"
                                    />
                            </fn-select>
                        </div>
                        <div class="flex items-center space-x-2">
                            <base-button 
                                ref="addButton"
                                icon="plus"
                                type="primary"
                                :loading="posting" 
                                @click="saveNewItem" 
                            >
                                Add team member
                            </base-button>
                            <base-button @click="cancelAddNewItem" plain type="primary">Cancel</base-button>
                        </div>
                    </template>
                </list-item>
            </transition-group>
        </draggable>

        <!-- Add new button -->
        <div class="mt-4" v-if="!computedEditState">
            <base-button @click="openNewItem" plain type="primary" icon="plus">Add team member</base-button>
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
import IconButton from '~/components/IconButton';
import ListItem from '~/components/ListItem';
import PopOver from '~/components/PopOver';

import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

import users from '~/../demo/data/users.js';

export default {
    name: 'Team',
    components: { BaseButton, draggable, FnSelect, FnSelectOption, IconButton, ListItem, PopOver, ViewContent, ViewContentFooterLink },
    data() {
        return {
            drag: false,
            dragOptions: {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "drag-ghost"
            },
            listIdIncrementor: 0,
            posting: false,
            usersTable: null,
            selectCurrentOption: null,
            selectLoading: false,
            selectOptions: null,
        }
    },
    computed: {
        computedEditState() {
            for(const item of this.$store.state.audits[this.$route.params.id].team) {
                if(item.edit) return true;
            }
            return false;
        },
        team: {
            get() {
                return this.$store.state.audits[this.$route.params.id].team;
            },
            set(value) {
                this.$store.commit(`audits/${this.$route.params.id}/UPDATE_TEAM`, value)
            }
        }
    },
    created() {
        // The "database"
        this.usersTable = users;

        this.auditUsersTable = this.usersTable
            .map(user => {
                return {
                    id: user.id,
                    listId: ++this.listIdIncrementor,
                    name: user.name,
                    initials: user.initials,
                    edit: false,
                    selected: false,
                }
            });
    },
    methods: {
        cancelAddNewItem() {
            this.selectCurrentOption = null;
            this.selectOptions = null;
            this.$store.commit(`audits/${this.$route.params.id}/CANCEL_OPEN_ITEM`)
        },

        fakeApiCall(query) {
            this.selectOptions = this.usersTable
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

            this.selectLoading = false;
        },

        getOptionDisabledState(option) {
            const ids = this.$store.state.audits[this.$route.params.id].team.map(o => o.id);
            const result = ids.includes(option.value.id);
            return result;
        },

        onSelectOption(option) {
            this.selectCurrentOption = option;

            // focus addButton
            if(this.$refs.addButton.length === 1) {
                this.$nextTick(() => {
                    this.$refs.addButton[0].$el.focus();
                });
            } else {
                console.error('[ListItemDemo] too many or few items in $refs.addButton array. Should only contain one');
            }
        },

        openNewItem() {
            this.$store.commit(`audits/${this.$route.params.id}/OPEN_ITEM`, ++this.listIdIncrementor);
        },

        saveNewItem() {                
            this.posting = true;
            setTimeout(() => {
                this.$store.commit(`audits/${this.$route.params.id}/SAVE_ITEM`, this.selectCurrentOption.value);
                this.selectCurrentOption = null;
                this.selectOptions = null;
                this.posting = false;
            }, 1000);
        },

        selectFetchOptions(value, charsAdded) {
            if(this.selectOptions !== null) { // did we make an API call ?
                if(this.selectOptions.length === 0 && charsAdded > 0) { // do we have any results ?
                    return;
                }
            }

            this.selectLoading = true;
            setTimeout(this.fakeApiCall.bind(null, value), 500);
        },
    }
}
</script>