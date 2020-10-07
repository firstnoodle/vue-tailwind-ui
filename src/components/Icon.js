import Vue from 'vue';

export default Vue.component('icon', {
    // functional: true,
    props: {
        value: {
            type: String,
            default: 'index-finger-up'
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'base'
        }
    },
    render(createElement) {
        const size = this.size ? ` text-${this.size}` : '';
        const color = this.color ? ` text-${this.color}` : '';
        return createElement(
            'span', 
            { class: `icon icon-${this.value}${color}${size}`}
        );
    }
});