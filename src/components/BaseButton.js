import Vue from 'vue';
import Icon from '~/components/Icon';

export default Vue.component('base-button', {
    components: { Icon },
    props: {
        href: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'sm',
            validator: function (value) {
                return ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(value) !== -1;
            }
        },
        type: {
            type: String,
            default: 'default',
            validator: function (value) {
                return ['default', 'primary', 'error', 'success', 'warning'].indexOf(value) !== -1;
            }
        }
    },

    render: function (createElement) {
        const tag = this.href ? 'a' : 'button';

        const options = {};

        if (this.href) {
            options.attrs = {
                href: this.href
            }
        }
        if (this.$listeners.click) {
            options.on = {
                click: event => this.$emit('click', event)
            }
        }

        options.class = [
            'button', 
            `size-${this.size}`, 
            `type-${this.type}`
        ].join(' ');
        options.class += this.rounded ? ' is-rounded' : '',
        options.class += this.plain ? ' is-plain' : '';

        const buttonContent = [];

        if(this.icon) {
            const iconComponent = createElement('icon', { props: { value: this.icon }});
            buttonContent.push(iconComponent);
        }
        if(this.$slots.default) {
            buttonContent.push(createElement('span', { class: 'label' }, this.$slots.default));
        }

        return createElement(tag, options, buttonContent);
    }
});