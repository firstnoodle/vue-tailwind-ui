import Vue from 'vue';
import BasePopper from './BasePopper.vue';

export default Vue.component('pop-over', {
    components: { BasePopper },
    methods: {
        close() {
            this.$refs.popper.doClose();
        }
    },
    render(createElement) {
        const popoverAttrs = { class: `popper p-2 border border-gray-400 rounded bg-white text-xs shadow-md` };
        const popoverElement = createElement('div', { attrs: popoverAttrs }, this.$slots.popover);

        const referenceElement = createElement('span', { slot: 'reference', attrs: { class: 'cursor-default' } }, this.$slots.reference);

        const popperOptions = {
            ref: 'popper',
            props: {
                trigger: "click",
                appendToBody: true,
                visibleArrow: true,
                options: {
                    placement: 'bottom',
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

        return createElement('base-popper', popperOptions, [referenceElement, popoverElement]);
    }
});