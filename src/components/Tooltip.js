import Vue from 'vue';
import BasePopper from './BasePopper.vue';

export default Vue.component('tooltip', {
    components: { BasePopper },
    props: {
        text: {
            type: String,
            required: true
        },
        bgcolor: {
            type: String,
            default: 'black'
        },
        textcolor: {
            type: String,
            default: 'white'
        },
        placement: {
            type: String,
            default: 'top'
        }
    },

    render(createElement) {
        const tooltipLabelElement = createElement('span', { attrs: { class: `text-${this.textcolor}` } }, this.text);

        const tooltipAttrs = { class: `popper px-2 py-1 rounded bg-${this.bgcolor} text-${this.bgcolor} text-xs shadow-md` };
        const tooltipElement = createElement('div', { attrs: tooltipAttrs }, [tooltipLabelElement]);

        const referenceElement = createElement('span', { slot: 'reference', attrs: { class: 'cursor-default' } }, this.$slots.default);

        const popperOptions = {
            attrs: {
                class: 'tooltip'
            },
            props: {
                trigger: "hover",
                appendToBody: true,
                visibleArrow: true,
                rootClass: 'tooltip',
                options: {
                    placement: this.placement,
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 8]
                            },
                        }
                    ]
                }
            }
        };

        return createElement('base-popper', popperOptions, [referenceElement, tooltipElement]);
    }
});