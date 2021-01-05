<template>
    <div class="w-full mt-8">
        <header class="w-full border-b border-subtle text-sm text-brand font-bold">
            {{ 'Method' }}
        </header>
        <list-item
            v-if="$store.state.audits[audit_id].method"
            editable
            singleton
            :edit="$store.state.audits[audit_id].method.uiState.edit"
            @edit="editMethod"
            >
            <span class="font-medium">
                {{ $store.state.audits[audit_id].method.data.name }}
            </span>

            <template #edit>
                <div class="flex pr-0 md:pr-16 mb-2">
                    <div class="w-2/3 md:w-1/2 mr-2">
                        <fn-select 
                            v-model="selectedOption" 
                            :focus-after-select="false"
                            initial-text="Select method"
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
                        {{ $store.state.audits[audit_id].method.data.method ? 'Update method' : 'Save method' }}
                    </base-button>
                    <base-button @click="$store.dispatch(`audits/${audit_id}/cancelEditMethod`)" plain type="primary">Cancel</base-button>
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
            @click.stop.prevent="addMethod" 
            >
            Add method
        </base-button>
    </div>
</template>

<script>
import { AUDIT_METHODS } from '~/enums';
import BaseButton from '~/components/BaseButton';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';

export default {
    name: 'AuditMethod',
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
        for(const method in AUDIT_METHODS) {
            this.options.push({
                label: AUDIT_METHODS[method],
                value: AUDIT_METHODS[method],
            })
        }
    },
    methods: {
        addMethod() {
            this.$store.commit(`audits/${this.audit_id}/ADD_METHOD`);
            this.$nextTick(() => this.$refs.select.focus());
        },
        editMethod() {
            this.selectedOption = {
                label: this.$store.state.audits[this.audit_id].method.data.name,
                value: this.$store.state.audits[this.audit_id].method.data.name,
            }
            this.$store.state.audits[this.audit_id].method.uiState.edit = true
        },
        onSelect(option) {
            this.selectedOption = option;
            this.$refs.saveButton.$el.focus();
        },
        save() {
            this.$store.commit(`audits/${this.audit_id}/SAVE_METHOD`, this.selectedOption.value);
        }
    }
}
</script>