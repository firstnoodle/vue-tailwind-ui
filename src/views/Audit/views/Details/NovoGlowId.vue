<template>
    <div class="w-full mt-8">
        <header class="w-full border-b border-subtle text-sm text-brand font-bold">
            {{ 'NovoGlow Id' }}
        </header>
        <list-item
            v-if="$store.state.audits[audit_id].novoglowId"
            editable
            singleton
            :edit="$store.state.audits[audit_id].novoglowId.uiState.edit"
            @edit="edit"
            >
            <span class="font-medium">
                {{ $store.state.audits[audit_id].novoglowId.data.id }}
            </span>

            <template #edit>
                <div class="flex pr-0 md:pr-16 mb-2">
                    <div class="w-2/3 md:w-1/2 mr-2">
                        <div 
                            class="relative inline-flex overflow-hidden pl-3 pr-8 border border-default rounded-md focus-within:shadow-outline focus-within:border-action"
                            >
                            <input
                                type="text"
                                ref="input"
                                class="py-2 text-sm text-primary leading-tight bg-transparent focus:outline-none"
                                placeholder="eg. AU1000123"
                                :value="inputValue"
                                @input="onInput"
                                />
                            <span v-show="!inputValid" class="absolute flex items-center justify-center w-8 h-full right-0 top-0 text-red-500">
                                <tooltip placement="bottom">
                                    <icon value="warning" />
                                    <span slot="message">Invalid format.<br>Use this format<br><strong>AU100000</strong></span>
                                </tooltip>
                            </span>
                        </div>
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
                        {{ $store.state.audits[audit_id].novoglowId.data.id ? 'Update id' : 'Save id' }}
                    </base-button>
                    <base-button @click="$store.dispatch(`audits/${audit_id}/cancelEditNovoglowId`)" plain type="primary">Cancel</base-button>
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
            Add NovoGlow Id
        </base-button>
    </div>
</template>

<script>
import { NOVOGLOW_ID } from '~/utils/input-formatting';
import BaseButton from '~/components/BaseButton';
import ListItem from '~/components/ListItem';
import Tooltip from '~/components/Tooltip';

export default {
    name: 'NovoglowId',
    components: { BaseButton, ListItem, Tooltip },
    data() {
        return {
            audit_id: this.$route.params.audit,
            inputFormat: NOVOGLOW_ID,
            inputValue: '',
            inputValid: false,
            saving: false,
        }
    },
    computed: {
        computedSaveButtonDisabled() {
            return !this.inputValid;
        },
    },
    methods: {
        add() {
            this.$store.commit(`audits/${this.audit_id}/ADD_NOVOGLOW_ID`);
            this.$nextTick(() => this.$refs.input.focus());
        },
        edit() {
            this.$store.state.audits[this.audit_id].novoglowId.uiState.edit = true
        },
        onInput({target}) {
            const { value } = target;
            this.inputValid = NOVOGLOW_ID.regex.test(value) && value.length === NOVOGLOW_ID.format.length;
            this.inputValue = event.target.value;
        },
        save() {
            this.$store.commit(`audits/${this.audit_id}/SAVE_NOVOGLOW_ID`, this.inputValue);
        }
    }
}
</script>