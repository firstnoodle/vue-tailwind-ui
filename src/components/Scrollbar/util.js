// reference https://github.com/ElemeFE/element/blob/90edfcc039610cd3025ed63aab5eb824b44b96d2/packages/scrollbar/src/util.js

export const BAR_MAP = {
    vertical: {
        offset: 'offsetHeight',
        scroll: 'scrollTop',
        scrollSize: 'scrollHeight',
        size: 'height',
        key: 'vertical',
        axis: 'Y',
        client: 'clientY',
        direction: 'top'
    },
    horizontal: {
        offset: 'offsetWidth',
        scroll: 'scrollLeft',
        scrollSize: 'scrollWidth',
        size: 'width',
        key: 'horizontal',
        axis: 'X',
        client: 'clientX',
        direction: 'left'
    }
};

export const renderThumbStyle = ({ move, size, bar }) => {
    const style = {};
    const translate = `translate${bar.axis}(${ move }%)`;

    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.webkitTransform = translate;

    return style;
}