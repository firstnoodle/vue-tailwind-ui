<template>
    <div class="w-full mt-8">
        <header class="w-full border-b border-subtle text-sm text-brand font-bold">
            {{ 'Type' }}
        </header>
        <list-item
            v-if="$store.state.audits[audit_id].type"
            editable
            singleton
            :edit="$store.state.audits[audit_id].type.uiState.edit"
            @edit="edit"
            >
            <span class="font-medium">
                {{ $store.state.audits[audit_id].type.data.name }}
            </span>

            <template #edit>
                <div class="flex pr-0 md:pr-16 mb-2">
                    <div class="w-2/3 md:w-1/2 mr-2">
                        <fn-select 
                            v-model="selectedOption" 
                            :focus-after-select="false"
                            initial-text="Enter initials or name"
                            placeholder="Select method"
                            ref="select"
                            @select="onSelect"
                            >
                                <fn-select-option 
                                    v-for="option in options" 
                                    :key="option.label" 
                                    :label="option.label" 
                                    :value="option"
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
                        :loading="saving"
                        @click.stop.prevent="save"
                    >
                        {{ $store.state.audits[audit_id].type.data.name ? 'Update type' : 'Save type' }}
                    </base-button>
                    <base-button @click="$store.dispatch(`audits/${audit_id}/cancelEditType`)" plain type="primary">Cancel</base-button>
                </div>
            </template>
        </list-item>
        <base-button
            v-else
            icon="plus"
            plain 
            text
            ref="addButton"
            type="primary" 
            class="mt-2"
            @click.stop.prevent="addType" 
            >
            Add method
        </base-button>
    </div>
</template>

<script>
import { AUDIT_TYPES } from '~/enums';
import BaseButton from '~/components/BaseButton';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';

export default {
    name: 'AuditType',
    components: { BaseButton, FnSelect, FnSelectOption, ListItem },
    data() {
        return {
            audit_id: this.$route.params.audit,
            options: [],
            saving: false,
            selectedOption: null
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            return this.selectedOption ? false : true;
        },
    },
    created() {
        for(const type in AUDIT_TYPES) {
            this.options.push({
                label: AUDIT_TYPES[type],
                value: AUDIT_TYPES[type],
            })
        }
    },
    methods: {
        addType() {
            this.$store.commit(`audits/${this.audit_id}/ADD_TYPE`);
            this.$nextTick(() => this.$refs.select.focus());
        },
        edit() {
            this.selectedOption = {
                label: this.$store.state.audits[this.audit_id].type.data.name,
                value: this.$store.state.audits[this.audit_id].type.data.name,
            }
            this.$store.state.audits[this.audit_id].type.uiState.edit = true
        },
        onSelect(option) {
            this.selectedOption = option;
            this.$refs.saveButton.$el.focus();
        },
        save() {
            this.$store.commit(`audits/${this.audit_id}/SAVE_TYPE`, this.selectedOption.value);
        }
    }
}
</script>