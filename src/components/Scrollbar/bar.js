// import { create } from 'core-js/fn/object';
// reference https://github.com/ElemeFE/element/blob/90edfcc039610cd3025ed63aab5eb824b44b96d2/packages/scrollbar/src/bar.js

import { on, off } from '~/utils/dom';
import { renderThumbStyle, BAR_MAP } from './util';

export default {
    name: 'Bar',

    props: {
        vertical: Boolean,
        size: String,
        move: Number
    },

    computed: {
        bar() {
            return BAR_MAP[this.vertical ? 'vertical' : 'horizontal'];
        },

        wrap() {
            return this.$parent.wrap;
        }
    },

    render(createElement) {
        const { size, move, bar } = this;

        // const styleObject = renderThumbStyle({ size, move, bar });
        // const styles = [];
        // for(const key in styleObject) {
        //     styles.push(`${key}: ${styleObject[key]}`);
        // }

        const thumb = createElement('div', { 
            style: renderThumbStyle({ size, move, bar }),
            // attrs: { style: styles.join(', ') },
            ref: 'thumb',
            class: 'el-scrollbar__thumb',
            on: { mousedown: this.clickThumbHandler } 
        });

        return createElement('div', { 
            attrs: {
                class: `el-scrollbar__bar is-${bar.key}`
            },
            on: {
                mousedown: this.clickTrackHandler
            }
        }, [thumb]);
    },

    methods: {
        clickThumbHandler(e) {
            // prevent click event of right button
            if (e.ctrlKey || e.button === 2) {
                return;
            }
            this.startDrag(e);
            this[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]));
        },

        clickTrackHandler(e) {
            const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
            const thumbHalf = (this.$refs.thumb[this.bar.offset] / 2);
            const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.$el[this.bar.offset]);

            this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
        },

        startDrag(e) {
            e.stopImmediatePropagation();
            this.cursorDown = true;

            on(document, 'mousemove', this.mouseMoveDocumentHandler);
            on(document, 'mouseup', this.mouseUpDocumentHandler);
            document.onselectstart = () => false;
        },

        mouseMoveDocumentHandler(e) {
            if (this.cursorDown === false) return;
            const prevPage = this[this.bar.axis];

            if (!prevPage) return;

            const offset = ((this.$el.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1);
            const thumbClickPosition = (this.$refs.thumb[this.bar.offset] - prevPage);
            const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.$el[this.bar.offset]);

            this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100);
        },

        mouseUpDocumentHandler() {
            this.cursorDown = false;
            this[this.bar.axis] = 0;
            off(document, 'mousemove', this.mouseMoveDocumentHandler);
            document.onselectstart = null;
        }
    },

    destroyed() {
        off(document, 'mouseup', this.mouseUpDocumentHandler);
    }
};