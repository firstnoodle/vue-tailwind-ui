import Vue from 'vue';
import BaseButton from '~/components/BaseButton';
import BasePopper from '~/components/BasePopper';
import Icon from '~/components/Icon.js';
import FnSelectOption from '~/components/SelectOption';
import { loopRange } from '~/utils/array';
import { sameWidth } from '~/utils/popper-modifiers';

/**
 * PROPS:
 * load on create new   [ ]
 * outline = open       [ ]
 * multiple...          [ ]
 * no-data-text         [ ]
 * autocomplete         [ ]
 * clearable            [ ]
 * disabled             [ ]
 * arrow keys           [x]
 * filterable           [x]
 * loading              [x]
 * loading-text         [x]
 * no-match-text        [x]
 * no-match-option      [x]
 * placeholder          [x]
 * remote               [x]
 * remote-method        [x]
 * value-key            [x]
 */


export default Vue.component('InputSelect', {
    components: { BaseButton, BasePopper, Icon, FnSelectOption },
    props: {
        value: {
            default: null,
        },
        placeholder: {
            type: String,
            default: 'select'
        },
        filterable: {
            type: Boolean,
            default: false
        },
        focusAfterSelect: {
            type: Boolean,
            default: true
        },
        focusOnMounted: {
            type: Boolean,
            default: false,
        },
        initialText: {
            type: String,
            default: 'Start typing...'
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: 'Loading...'
        },
        noMatchText: {
            type: String,
            default: 'No match..'
        },
        noMatchOption: {
            type: Boolean,
            default: false
        },
        noMatchOptionText: {
            type: String,
            default: 'Create'
        },
        remoteMethod: {
            type: Function,
            required: false
        }
    },

    data() {
        return {
            currentInputValue: null,
            highlight: 'tosse',
            highlightedOption: null,
            noMatchValue: '',
            popperOpen: false,
            visibleOptions: null,
        }
    },

    computed: {
        computedCaretRotation() {
            return this.popperOpen ? 'rotate-180' : 'rotate-0';
        },
    },

    watch: {
        value(newValue) {
            if(typeof newValue === 'string') {
                this.$refs.input.value = newValue;
            }
            if(typeof newValue === 'object' && newValue) {
                this.$refs.input.value = newValue.label;
            }
        },
    },

    created() {
        this.visibleOptions = this.$slots.default;
    },

    mounted() {
        this.currentInputValue = this.$refs.input.value;

        if(this.value) {
            if(typeof this.value === 'string') {
                this.$refs.input.value = this.value;
            }
            if(typeof this.value === 'object') {
                this.$refs.input.value = this.value.label;
            }
        }

        if(this.focusOnMounted) {
            this.$nextTick(() => this.$refs.input.focus());
        }
    },

    methods: {

        focus() {
            this.onInputFocus();
        },

        getOptionsCount() {
            let count = 0;
            if(this.$slots.default) {
                this.$slots.default.forEach(vnode => {
                    if(vnode.componentOptions) {
                        if(vnode.componentOptions.tag === 'fn-select-option') {
                            count++;
                        }
                    }
                });
            }
            return count;
        },

        onClickOutside() {
            this.popperOpen = false;
        },

        onCreateNewItem() {
            this.$emit('createNew', this.$refs.input.value);
            this.popperOpen = false;
        },

        onInput(event) {
            const charsAdded = event.target.value.length - this.currentInputValue.length;

            if(this.filterable && !this.remoteMethod) {
                if(event.target.value.length) {
                    this.visibleOptions = this.$slots.default.filter(vnode => {
                        if(vnode.componentOptions) {
                            const targetString = vnode.componentOptions.propsData.label.toLowerCase();
                            const queryString = event.target.value.toLowerCase();
                            return targetString.includes(queryString);
                        }
                    });
                } else {
                    this.visibleOptions = this.$slots.default;
                }
            } else if(this.remoteMethod) {
                this.highlightedOption = null;
                this.remoteMethod(event.target.value, charsAdded);
                this.noMatchValue = this.$refs.input.value;
            }

            this.currentInputValue = this.$refs.input.value;
        },

        onInputBlur() {
            if(this.value) {
                this.$nextTick(() => {
                    this.$refs.input.value = this.value ? this.value.label : '';
                })
            }
        },

        onInputFocus() {
            this.popperOpen = true;
            this.$refs.input.focus();
            this.$refs.input.value = '';
            this.$refs.input.placeholder = this.value ? this.value.label : this.placeholder;
        },

        /**
         * Handle arrow-key navigation 
         * @param {*} event 
         */
        onKeyDown(event) {
            if(event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                this.updateHighlight(event.key === 'ArrowUp' ? -1 : 1);
                event.stopPropagation();
                event.preventDefault();
            }
        },

        /**
         * Handle selection using "enter" key
         * @param {*} event 
         */
        onKeyUp(event) {
            if(event.key === 'Enter' && this.highlightedOption !== null) {
                let values = [];
                this.$slots.default.forEach(vnode => {
                    if(vnode.componentOptions.tag === 'fn-select-option') {
                        values.push(vnode);
                    }
                });

                if(!values[this.highlightedOption].componentOptions.propsData.disabled) {
                    this.popperOpen = false;
                    this.$emit('select', values[this.highlightedOption].componentInstance.$options.propsData.value);
                    this.$refs.input.blur();
                }
            }
        },

        onReferenceClick() {
            if(!this.popperOpen) {
                this.focus();
            }
        },

        processOptions() {
            for(const [index, vnode] of this.$slots.default.entries()) {
                // only add eventlisteners to "real" vnodes - whitespace also generates vnodes 
                if(vnode.componentOptions) {
                    vnode.componentOptions.propsData.highlighted = index === this.highlightedOption;
                    // TODO: this check is done because in a future version labeled groups will be implemented
                    if(vnode.componentOptions.tag === 'fn-select-option') {
                        vnode.componentOptions.listeners = {
                            'optionClicked': value => {
                                // this.$refs.popper.doClose();
                                this.popperOpen = false;
                                this.$emit('select', value);
                                // this.$refs.input.value = value;
                                if(this.focusAfterSelect) {
                                    this.$refs.input.focus();
                                }
                            },
                            'mouseover': this.updateHighlight.bind(this, null)
                        }
                    }
                }
            }
        },

        renderBasicOptionElement(createElement, content) {
            return createElement(
                'div', 
                { class: 'bg-white px-3 py-2 focus:outline-none text-gray-500 italic cursor-default' }, 
                content
            )
        },

        renderNoMatchOptions(createElement) {
            let elements = [
                this.renderBasicOptionElement(createElement, this.noMatchText)
            ];

            if(this.noMatchOption) {
                elements.push( createElement('div', {class: 'border-b border-gray-200'}));
                elements.push(
                    createElement(
                        'div', 
                        { 
                            class: 'bg-white hover:bg-blue-100 px-3 py-2 focus:outline-none text-blue-500 cursor-pointer', 
                            on: { click: this.onCreateNewItem }
                        }, 
                        [
                            createElement('icon', { props: { value: 'plus' } }),
                            createElement('span', { attrs: { class: 'ml-1'}}, `${this.noMatchOptionText} `),
                            createElement('span', { class: 'font-bold' }, `"${this.noMatchValue}"`)
                        ]
                    )
                );
            }
            return elements;
        },

        renderPopperContent(createElement) {
            if(this.remoteMethod) {
                if(this.loading) {
                    return [ this.renderBasicOptionElement(createElement, this.loadingText) ];
                } else if(!this.$slots.default) {
                    if(this.$refs.input) { // undefined error is thrown (on first render) if we don't do this check
                        if(this.$refs.input.value) {
                            return this.renderNoMatchOptions(createElement);
                        } else {
                            return [ this.renderBasicOptionElement(createElement, this.initialText) ];
                        }
                    }
                } else {
                    this.processOptions();
                    return this.$slots.default;
                }
            } else {
                this.processOptions();
                return this.$slots.default;
            }
        },

        updateHighlight(value) {
            if(this.$slots.default) {
                if(value) {
                    let itemCount = 0;
                    this.$slots.default.forEach(vnode => {
                        if(vnode.componentOptions.tag === 'fn-select-option') {
                            itemCount++;
                        }
                    });

                    if(this.highlightedOption === null) {
                        if(value > 0) this.highlightedOption = 0;
                        else this.highlightedOption = itemCount-1;
                    } else {
                        this.highlightedOption = loopRange(this.highlightedOption + value, itemCount);
                    }
                } else {
                    this.highlightedOption = null;
                }

                // trigger re-render
                this.$slots.default.forEach((vnode, index) => {
                    if(vnode.componentOptions.tag === 'fn-select-option') {
                        vnode.componentInstance.setFocus(index === this.highlightedOption);
                    }
                });
            }
        },

    },

    render: function (createElement) {

        const popper = createElement(
            'div', 
            { 
                style: 'max-height: 160px',
                class: 'z-20 popper overflow-y-scroll block text-sm border border-default rounded shadow-lg overflow-hidden',
            }, 
            this.renderPopperContent(createElement)
        );

        const inputSuffixInner = createElement(
            'span', 
            { 
                class: 'icon icon-angle-down text-xs text-granite-grey transform transition-all duration-100 ' + this.computedCaretRotation, 
            }
        );
        const inputSuffix = createElement('div', { class: 'absolute top-0 right-0 pl-1 pr-3 h-full flex items-center rounded-lg bg-transparent cursor-pointer' }, [inputSuffixInner]);
        const inputInner = createElement(
            'input', 
            {
                ref: 'input',
                class: 'py-2 w-full text-sm leading-tight bg-transparent text-gray-700 focus:outline-none cursor-pointer',
                attrs: {
                    autocomplete: 'off',
                    placeholder: this.placeholder,
                    readonly: !(this.filterable || this.remoteMethod),
                    type: 'text',
                },
                on: {
                    'blur': this.onInputBlur,
                    'focus': this.onInputFocus,
                    'input': this.onInput,
                    'keydown': this.onKeyDown,
                    'keyup': this.onKeyUp,
                }
            }
        );

        // TODO: "focus" classes should be applied with computed function instead based on popperOpen
        const inputOuter = createElement(
            'div', 
            { 
                class: 'relative overflow-hidden inline-block w-full text-sm leading-tight pl-3 pr-8 rounded-md border border-default bg-white text-gray-700 shadow-inner-sm focus:shadow-inner hover:text-blue-500 focus:outline-none focus:text-blue-500 focus-within:border-blue-500 focus-within:shadow-outline cursor-pointer',
                slot: 'reference', 
                on: { click: this.onReferenceClick }
            }, 
            [inputInner, inputSuffix]
        );

        return createElement(
            'base-popper', 
            {
                ref: 'popper',
                on: {
                    documentClick: this.onClickOutside
                },
                props: { 
                    tagName: 'div',
                    rootClass: "w-full flex",
                    forceShow: this.popperOpen,
                    appendToBody: true,
                    trigger: 'soft', 
                    options: { 
                        placement: 'bottom-start',
                        modifiers: [
                            sameWidth,
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 2],
                                },
                            }
                        ]
                    }
                } 
            }, 
            [inputOuter, popper]
        );
    }
});