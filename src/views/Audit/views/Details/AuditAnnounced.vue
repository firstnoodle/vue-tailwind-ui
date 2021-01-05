<template>
    <div class="w-full mt-8">
        <header class="w-full border-b border-subtle text-sm text-brand font-bold">
            {{ 'Announced' }}
        </header>
        <list-item
            v-if="$store.state.audits[audit_id].announced"
            editable
            singleton
            :edit="$store.state.audits[audit_id].announced.uiState.edit"
            @edit="edit"
            >
            <span class="font-medium">
                {{ $store.state.audits[audit_id].announced.data.value }}
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
                        {{ $store.state.audits[audit_id].announced.data.value ? 'Update announced' : 'Save announced' }}
                    </base-button>
                    <base-button @click="$store.dispatch(`audits/${audit_id}/cancelEditAnnounced`)" plain type="primary">Cancel</base-button>
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
            @click.stop.prevent="add" 
            >
            Add announced
        </base-button>
    </div>
</template>

<script>
import BaseButton from '~/components/BaseButton';
import FnSelect from '~/components/Select.js';
import FnSelectOption from '~/components/SelectOption';
import ListItem from '~/components/ListItem';

export default {
    name: 'AuditAnnounced',
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
        for(const type of ['yes', 'no']) {
            this.options.push({
                label: type,
                value: type,
            })
        }
    },
    methods: {
        add() {
            this.$store.commit(`audits/${this.audit_id}/ADD_ANNOUNCED`);
            this.$nextTick(() => this.$refs.select.focus());
        },
        edit() {
            this.selectedOption = {
                label: this.$store.state.audits[this.audit_id].announced.data.value,
                value: this.$store.state.audits[this.audit_id].announced.data.value,
            }
            this.$store.state.audits[this.audit_id].announced.uiState.edit = true
        },
        onSelect(option) {
            this.selectedOption = option;
            this.$refs.saveButton.$el.focus();
        },
        save() {
            this.$store.commit(`audits/${this.audit_id}/SAVE_ANNOUNCED`, this.selectedOption.value);
        }
    }
}
</script>