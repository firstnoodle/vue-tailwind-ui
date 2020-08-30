import Vue from 'vue';

const baseStyle = 'inline-flex items-center justify-center shadow-sm border focus:outline-none transition ease-in-out duration-150';

const sizes = {
    xs: ' text-xs leading-none px-2 py-2 rounded-md',
    sm: ' text-sm leading-tight px-3 py-2 rounded-md',
    md: ' text-md leading-snug px-4 py-2 rounded-lg',
    lg: ' text-lg leading-normal px-6 py-3 rounded-lg',
    xl: ' text-xl leading-relaxed px-8 py-4 rounded-lg'
};

const types = {
    plain: ' border-granite-grey-15 bg-white text-gray-700 shadow-sm hover:text-blue-500 hover:bg-gray-100 focus:outline-none focus:text-blue-500 focus:border-light-blue focus:shadow-outline',
    primary: ' bg-light-blue border-transparent text-white hover:bg-light-blue-darker focus:border-light-blue-darker focus:shadow-outline',
    error: ' bg-lava-red border-transparent text-white hover:bg-lava-red-darker focus:border-lava-red-darker focus:shadow-outline',
    warning: ' bg-golden-sun border-transparent text-white hover:bg-golden-sun-darker focus:border-golden-sun-darker focus:shadow-outline',
    success: ' bg-forest-green border-transparent text-white hover:bg-forest-green-darker focus:border-forest-green-darker focus:shadow-outline',
}

export default Vue.component('base-button', {
    props: {
        href: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
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
            default: 'plain',
            validator: function (value) {
                return ['plain', 'primary', 'error', 'success', 'warning'].indexOf(value) !== -1;
            }
        }
    },

    created() {
        console.log(this.icon !== undefined);
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
                click: event => this.$emit('click')
            }
        }
        options.class = baseStyle + sizes[this.size || 'sm'] + types[this.type || 'plain'];

        return createElement(tag, options, this.$slots.default);
    }
});