import Vue from 'vue';
import Icon from '~/components/Icon';
import LoadSpinner from '~/components/LoadSpinner';

export default Vue.component('base-button', {
    components: { Icon, LoadSpinner },
    props: {
        href: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: 'Loading'
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
        text: {
            type: Boolean,
            default: false
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
        options.class += this.rounded ? ' is-rounded' : '';
        options.class += this.text ? ' is-text' : '';
        options.class += this.plain ? ' is-plain' : '';

        const buttonContent = [];

        if(this.loading) {
            buttonContent.push(createElement('load-spinner'));
        } else if(this.icon) {
            const iconComponent = createElement('icon', { props: { value: this.icon }});
            buttonContent.push(iconComponent);
        }
        if(this.$slots.default) {
            buttonContent.push(createElement('span', { class: 'label' }, this.$slots.default));
        }

        return createElement(tag, options, buttonContent);
    }
});