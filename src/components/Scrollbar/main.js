// reference https://github.com/ElemeFE/element/blob/90edfcc039610cd3025ed63aab5eb824b44b96d2/packages/scrollbar/src/main.js
// ---------
// reference https://github.com/noeldelgado/gemini-scrollbar/blob/master/index.js

import { addResizeListener, removeResizeListener } from '~/utils/resize-event';
import scrollbarWidth from '~/utils/scrollbar-width';
import { toObject } from '~/utils/util';
import Bar from './bar';

/* istanbul ignore next */
export default {
    name: 'ElScrollbar',

    components: { Bar },

    props: {
        native: Boolean,
        wrapStyle: {},
        wrapClass: {},
        viewClass: {},
        viewHeight: {
            type: String,
            default: 'h-full'
        },
        viewStyle: {},
        noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
        tag: {
            type: String,
            default: 'div'
        }
    },

    data() {
        return {
            sizeWidth: '0',
            sizeHeight: '0',
            moveX: 0,
            moveY: 0
        };
    },

    computed: {
        wrap() {
            return this.$refs.wrap;
        }
    },

    render(createElement) {
        let gutter = scrollbarWidth();
        let style = this.wrapStyle;

        if (gutter) {
            const gutterWith = `-${gutter}px`;
            const gutterStyle = `margin-bottom: ${gutterWith}; margin-right: ${gutterWith};`;

            if (Array.isArray(this.wrapStyle)) {
                style = toObject(this.wrapStyle);
                style.marginRight = style.marginBottom = gutterWith;
            } else if (typeof this.wrapStyle === 'string') {
                style += gutterStyle;
            } else {
                style = gutterStyle;
            }
        }

        const view = createElement(this.tag, {
            class: ['scrollbar__view', this.viewClass],
            style: this.viewStyle,
            ref: 'resize'
        }, this.$slots.default);

        const wrap = createElement('div', {
            attrs: { 
                class: `${this.wrapClass || ''} ${this.viewHeight} scrollbar__wrap` + (gutter ? '' : ' scrollbar__wrap--hidden-default'), 
            },
            ref: 'wrap',
            style, 
            on: { scroll: this.handleScroll }
        }, [view]);

        let nodes;

        if (!this.native) {
            nodes = ([
                wrap,
                createElement('bar', { props: { move: this.moveX, size: this.sizeWidth }}),
                createElement('bar', { props: { move: this.moveY, size: this.sizeHeight, vertical: true }}),
            ]);
        } else {
            // nodes = ([
            //     <div
            //         ref="wrap"
            //         class={ [this.wrapClass, 'scrollbar__wrap'] }
            //         style={ style }>
            //         { [view] }
            //     </div>
            // ]);
        }

        return createElement('main', { class: 'scrollbar' }, nodes);
    },

    methods: {
        handleScroll() {
            const wrap = this.wrap;

            this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight);
            this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth);

        },

        update() {
            let heightPercentage, widthPercentage;
            const wrap = this.wrap;
            if (!wrap) return;

            heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight);
            widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth);

            this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : '';
            this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : '';
        }
    },

    mounted() {
        if (this.native) return;
        this.$nextTick(this.update);
        !this.noresize && addResizeListener(this.$refs.resize, this.update);
    },

    beforeDestroy() {
        if (this.native) return;
        !this.noresize && removeResizeListener(this.$refs.resize, this.update);
    }
};