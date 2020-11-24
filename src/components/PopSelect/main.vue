<template>
    <base-popper 
        :options="popperOptions"
        :appendToBody="true"
        @hide="onPopperHide"
        @show="onPopperShow"
        :forceShow="visible"
        trigger="soft"
        v-clickoutside="handleClose"
        >
        <div ref="popper" class="popper max-w-xs rounded-lg shadow-md bg-default border border-subtle">
            <header v-if="filterable" class="flex items-center border-b border-subtle overflow-hidden">
                <icon value="magnifying-glass" class="pl-4 pr-2 text-gray-600" />
                <input 
                    v-if="filterable"
                    v-model="query"
                    ref="input"
                    type="text" 
                    class="w-full py-2 text-sm font-light bg-default rounded-tr-lg focus:outline-none" 
                    :placeholder="currentPlaceholder" 
                    @input="debouncedQueryChange"
                    @keyup="managePlaceholder"
                    @keydown="resetInputState"
                    @keydown.down.prevent="navigateOptions('next')"
                    @keydown.up.prevent="navigateOptions('prev')"
                    @keydown.enter.prevent="selectOption"
                    @keydown.esc.stop.prevent="visible = false"
                    @keydown.tab="visible = false"
                    />
            </header>
            <scrollbar
                wrap-class=""
                view-class=""
                viewHeight="max-h-56"
                ref="scrollbar"
                v-show="true"
                >
                <slot name="options" />
            </scrollbar>
            <button 
                v-if="clearSelectionText" 
                @click="clearSelection"
                class="flex items-center w-full px-4 py-2 text-sm text-action border-t border-subtle rounded-b-lg bg-default cursor-pointer hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
                >
                <icon value="error" />
                <span class="ml-2">{{ clearSelectionText }}</span>
            </button>
        </div>

        <button 
            slot="reference"
            :class="{ 'is-visible' : visible, 'has-selection' : selected.label }"
            class="pop-select-trigger" 
            style="padding: 0.125rem 0.5rem"
            @click.stop="toggleMenu"
            >
            <icon :value="icon" />
            <span class="ml-1 text-sm font-light">{{ selected.label || nullLabel }}</span>
        </button>

    </base-popper>
</template>

<script>
import { debounce } from 'throttle-debounce';
import Emitter from '~/mixins/emitter';
import { getValueByPath, valueEquals } from '~/utils/util';
import Clickoutside from '~/utils/click-outside';
import scrollIntoView from '~/utils/scroll-into-view';
import NavigationMixin from './navigation-mixin';
import BasePopper from '~/components/BasePopper';
import Icon from '~/components/Icon';
import Scrollbar from '~/components/Scrollbar/main.js';

export default {
    name: 'PopSelect',
    componentName: 'ElSelect',
    components: { BasePopper, Icon, Scrollbar },
    directives: { Clickoutside },
    mixins: [ Emitter, NavigationMixin ],
    provide() {
        return {
            'select': this
        }
    },
    props: {
        clearSelectionText: {
            type: String,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        },
        filterMethod: {
            type: Function,
            default: null
        },
        icon: {
            type: String,
            default: 'lightning'
        },
        loading: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        nullLabel: {
            type: String,
            default: 'None'
        },
        placeholder: {
            type: String,
            default: 'search'
        },
        remote: {
            type: Boolean,
            default: false
        },
        remoteMethod: {
            type: Function,
            default: null
        },
        value: {
            required: true
        },
        valueKey: {
            type: String,
            default: 'value'
        },
    },
    data() {
        return {
            cachedPlaceholder: '',
            cachedOptions: [],
            currentPlaceholder: '',
            filteredOptionsCount: 0,
            hoverIndex: -1,
            options: [],
            optionsCount: 0,
            popperOptions: {
                placement: 'bottom-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [-1, 2]
                        },
                    }
                ]
            },
            query: '',
            previousQuery: null,
            selected: this.multiple ? [] : {},
            slotProps: "tisse",
            softFocus: false,
            visible: false,
        }
    },
    watch: {
        placeholder(val) {
            this.cachedPlaceHolder = this.currentPlaceholder = val;
        },
        value(val) {
            if (this.multiple) {
                this.resetInputHeight();
                if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
                    this.currentPlaceholder = '';
                } else {
                    this.currentPlaceholder = this.cachedPlaceHolder;
                }
                if (this.filterable && !this.reserveKeyword) {
                    this.query = '';
                    this.handleQueryChange(this.query);
                }
            }
            this.setSelected();

            // if (this.filterable && !this.multiple) {
            //     this.inputLength = 20;
            // }
            // if (!valueEquals(val, oldVal)) {
            //     this.dispatch('ElFormItem', 'el.form.change', val);
            // }
        },
    },
    created() {
        this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;

        if (this.multiple && !Array.isArray(this.value)) {
            this.$emit('input', []);
        }

        if (!this.multiple && Array.isArray(this.value)) {
            this.$emit('input', '');
        }

        this.debouncedOnInputChange = debounce(this.debounce, () => {
            this.onInputChange();
        });

        this.debouncedQueryChange = debounce(this.debounce, (e) => {
            this.handleQueryChange(e.target.value);
        });

        this.$on('handleOptionClick', this.handleOptionSelect);
        this.$on('setSelected', this.setSelected);
    },
    methods: {
        clearSelection(event) {
            event.stopPropagation();
            const value = this.multiple ? [] : '';
            this.$emit('input', value);
            this.emitChange(value);
            this.visible = false;
            this.$emit('clear');
        },

        emitChange(val) {
            if (!valueEquals(this.value, val)) {
                this.$emit('change', val);
            }
        },

        getOption(value) {
            let option;
            const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
            const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
            const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

            for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
                const cachedOption = this.cachedOptions[i];
                const isEqual = isObject
                    ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
                    : cachedOption.value === value;
                if (isEqual) {
                    option = cachedOption;
                    break;
                }
            }
            if (option) return option;

            const label = (!isObject && !isNull && !isUndefined) ? value : '';
            let newOption = {
                value: value,
                currentLabel: label
            };

            if (this.multiple) {
                newOption.hitState = false;
            }
            return newOption;
        },

        getValueIndex(arr = [], value) {
            const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
            if (!isObject) {
                return arr.indexOf(value);
            } else {
                const valueKey = this.valueKey;
                let index = -1;
                arr.some((item, i) => {
                    if (getValueByPath(item, valueKey) === getValueByPath(value, valueKey)) {
                        index = i;
                        return true;
                    }
                    return false;
                });
                return index;
            }
        },

        handleClose() {
            this.visible = false;
        },

        handleOptionSelect(option, byClick) {
            if (this.multiple) {
                const value = (this.value || []).slice();
                const optionIndex = this.getValueIndex(value, option.value);
                if (optionIndex > -1) {
                    value.splice(optionIndex, 1);
                } else if (this.multipleLimit <= 0 || value.length < this.multipleLimit) {
                    value.push(option.value);
                }
                this.$emit('input', value);
                this.emitChange(value);
                
                if (option.created) {
                    this.query = '';
                    this.handleQueryChange('');
                    this.inputLength = 20;
                }
                if (this.filterable) this.$refs.input.focus();
            } else {
                this.$emit('input', option.value);
                this.emitChange(option.value);
                this.visible = false;
            }
            this.isSilentBlur = byClick;
            this.setSoftFocus();
            if (this.visible) return;

            this.$nextTick(() => {
                this.scrollToOption(option);
            });
        },

        handleQueryChange(val) {
            if (this.previousQuery === val || this.isOnComposition) return;

            if (this.previousQuery === null && (typeof this.filterMethod === 'function' || typeof this.remoteMethod === 'function')) {
                this.previousQuery = val;
                return;
            }

            this.previousQuery = val;
            this.$nextTick(() => {
                if (this.visible) this.broadcast('ElSelectDropdown', 'updatePopper');
            });

            this.hoverIndex = -1;
            if (this.multiple && this.filterable) {
                this.$nextTick(() => {
                    const length = this.$refs.input.value.length * 15 + 20;
                    this.inputLength = this.collapseTags ? Math.min(50, length) : length;
                    this.managePlaceholder();
                    this.resetInputHeight();
                });
            }

            if (this.remote && typeof this.remoteMethod === 'function') {
                this.hoverIndex = -1;
                this.remoteMethod(val);
            } else if (typeof this.filterMethod === 'function') {
                this.filterMethod(val);
                this.broadcast('ElOptionGroup', 'queryChange');
            } else {
                this.filteredOptionsCount = this.optionsCount;
                this.broadcast('ElOption', 'queryChange', val);
                this.broadcast('ElOptionGroup', 'queryChange');
            }
            if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
                this.checkDefaultFirstOption();
            }
        },

        managePlaceholder() {
            if (this.currentPlaceholder !== '') {
                this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
            }
        },

        onOptionDestroy(index) {
            if (index > -1) {
                this.optionsCount--;
                this.filteredOptionsCount--;
                this.options.splice(index, 1);
            }
        },

        onPopperHide() {
            // console.log('hide');
        },

        onPopperShow() {
            if(this.$refs.input) {
                this.$nextTick(() => this.$refs.input.focus());
            }
        },

        setSelected() {
            if (!this.multiple) {
                let option = this.getOption(this.value);
                if (option.created) {
                    this.createdLabel = option.currentLabel;
                    this.createdSelected = true;
                } else {
                    this.createdSelected = false;
                }
                this.selectedLabel = option.currentLabel;
                this.selected = option;
                // if (this.filterable) this.query = this.selectedLabel;
                this.query = '';
                this.handleQueryChange(this.query);
                return;
            }

            let result = [];
            if (Array.isArray(this.value)) {
                this.value.forEach(value => {
                    result.push(this.getOption(value));
                });
            }
            this.selected = result;

            // this.$nextTick(() => {
            //     this.resetInputHeight();
            // });
        },

        resetInputState(e) {
            if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
            // this.inputLength = this.$refs.input.value.length * 15 + 20;
            // this.resetInputHeight();
        },

        selectOption() {
            if (!this.visible) {
                this.toggleMenu();
            } else {
                if (this.options[this.hoverIndex]) {
                    this.handleOptionSelect(this.options[this.hoverIndex]);
                }
            }
        },

        setSoftFocus() {
            this.softFocus = true;
            const input = this.$refs.input || this.$refs.reference;
            if (input) {
                input.focus();
            }
        },

        scrollToOption(option) {
            const target = Array.isArray(option) && option[0] ? option[0].$el : option.$el;
            if (this.$refs.popper && target) {
                const menu = this.$refs.popper.querySelector('.scrollbar__wrap');
                scrollIntoView(menu, target);
            }
            this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
        },

        toggleLastOptionHitState(hit) {
            if (!Array.isArray(this.selected)) return;

            const option = this.selected[this.selected.length - 1];
            if (!option) return;
            if (hit === true || hit === false) {
                option.hitState = hit;
                return hit;
            }
            option.hitState = !option.hitState;
            return option.hitState;
        },

        toggleMenu() {
            if (!this.disabled) {
                if (this.menuVisibleOnFocus) {
                    this.menuVisibleOnFocus = false;
                } else {
                    this.visible = !this.visible;
                }
                if (this.visible) {
                    if(this.$refs.input) this.$refs.input.focus();
                    if(this.$refs.reference) this.$refs.reference.focus();
                }
            }
        },
    }
}
</script>

<style lang="scss">

.pop-select-trigger {

    @apply border border-subtle text-action;
    @apply inline-flex items-center px-2 py-1 border rounded-md cursor-pointer ;

    &:hover {
        @apply bg-blue-100 border-action;
    }
    &:focus {
        @apply outline-none shadow-outline border-action;
    }

    &.has-selection {
        @apply bg-gray-300 text-gray-800 border-gray-400;

        &:hover, &:focus {
            @apply border-action;
        }
    }

    &.is-visible {
        @apply border-action shadow-outline;
    }
}

</style>