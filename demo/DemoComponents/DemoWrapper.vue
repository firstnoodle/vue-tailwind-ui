<template>
    <div :class="computedThemeClass" class="bg-default p-20 pb-64">
        <div class="mb-4">
            <base-button size="sm" :icon="computedThemeIcon" @click="toggleTheme">
                {{ theme }}
            </base-button>
        </div>
        <h1 class="mb-4 text-primary text-xl font-bold">{{ title }}</h1>
        <!-- demo content -->
        <slot />
    </div>
</template>

<script>
// Remember to import global css in every demo
import '~/css/main.scss';

// for theme toggling
import BaseButton from '~/components/BaseButton';

export default {
    name: 'DemoWrapper',
    components: { BaseButton },
    props: { 
        title: {
            type: String
        }
    },
    data() {
        return {
            theme: 'light'
        }
    },
    computed: {
        computedThemeClass() {
            return `theme-${this.theme}`;
        },
        computedThemeIcon() {
            return this.theme === 'light' ? 'sun' : 'moon';
        }
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        }
    }
}
</script>