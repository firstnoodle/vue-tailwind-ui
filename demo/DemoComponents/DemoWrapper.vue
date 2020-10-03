<template>
    <div :class="computedThemeClass" class="h-screen p-4 bg-page">
        <div class="mb-4">
            <base-button size="sm" @click="toggleTheme">
                {{ 'theme ' + theme }}
            </base-button>
        </div>
        <h1 class="mb-4 text-xl font-bold">{{ title }}</h1>
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
        }
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
        }
    }
}
</script>