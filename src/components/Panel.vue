<template>
    <!-- this component should be a child of a element with "flex flex-col" classes -->
    <div :class="computedOuterClass">
        <div :class="computedInnerClass">
            <header v-if="$slots.header" class="relative z-10 flex-0 w-full">
                <slot name="header" />
            </header>
            <main :class="computedMainContentClass">
                <slot />
                <slot name="main" />
            </main>
            <footer v-if="$slots.footer" class="flex-0 w-full">
                <slot name="footer" />
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: "Panel",
    props: {
        expandHorizontally: {
            type: Boolean,
            default: false
        },
        expandVertically: {
            type: Boolean,
            default: false
        },
        fullscreen: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        computedOuterClass() {
            let classes = "flex flex-col items-center overflow-hidden w-full";
            classes += this.expandVertically ? " flex-1 min-h-0" : " flex-0";
            classes +=
                !this.expandHorizontally && !this.fullscreen
                    ? " max-w-6xl mx-auto"
                    : "";
            classes += this.fullscreen
                ? " z-10 fixed inset-0 w-screen h-screen"
                : " z-0 shadow sm:rounded-lg border-b border-gray-200";

            return classes;
        },
        computedInnerClass() {
            let classes = "flex flex-col bg-gray-50 w-full";
            classes += this.expandVertically
                ? " flex-1 min-h-0 overflow-auto"
                : " overflow-x-auto";
            classes +=
                this.fullscreen && !this.expandVertically
                    ? " flex-1 min-h-0 overflow-auto"
                    : "";

            return classes;
        },
        computedMainContentClass() {
            let classes = "relative z-0 flex flex-col";
            classes += this.expandVertically
                ? " flex-1 min-h-0 overflow-y-auto"
                : " flex-0 overflow-x-auto";
            classes +=
                this.fullscreen && !this.expandVertically
                    ? " flex-1 min-h-0 overflow-auto"
                    : "";

            return classes;
        }
    }
};
</script>