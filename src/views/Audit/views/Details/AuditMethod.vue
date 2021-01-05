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
                            v-model="selectedMethodOption" 
                            :focus-after-select="false"
                            initial-text="Enter initials or name"
                            placeholder="Select method"
                            ref="methodSelect"
                            @select="onSelectMethod"
                            >
                                <fn-select-option 
                                    v-for="method in methodOptions" 
                                    :key="method.label" 
                                    :label="method.label" 
                                    :value="method"
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
                        {{ $store.state.audits[audit_id].method.data.method ? 'Update date' : 'Save date' }}
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
            methodOptions: [
                { label: 'Remote', value: 'Remote' },
                { label: 'On site', value: 'On site' },
                { label: 'Other', value: 'Other' },
            ],
            saving: false,
            selectedMethodOption: null
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            return this.selectedMethodOption ? false : true;
        },
    },
    methods: {
        addMethod() {
            this.$store.commit(`audits/${this.audit_id}/ADD_METHOD`);
            this.$nextTick(() => this.$refs.methodSelect.focus());
        },
        editMethod() {
            this.selectedMethodOption = {
                label: this.$store.state.audits[this.audit_id].method.data.name,
                value: this.$store.state.audits[this.audit_id].method.data.name,
            }
            this.$store.state.audits[this.audit_id].method.uiState.edit = true
        },
        onSelectMethod(option) {
            this.selectedMethodOption = option;
            this.$refs.saveButton.$el.focus();
        },
        save() {
            this.$store.commit(`audits/${this.audit_id}/SAVE_METHOD`, this.selectedMethodOption.value);
        }
    }
}
</script>