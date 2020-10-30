<template>
    <component :is="tagName" :class="rootClass">
        <transition
            :name="transition"
            :enter-active-class="enterActiveClass"
            :leave-active-class="leaveActiveClass"
            @after-leave="doDestroy"
        >
            <span ref="popper" :class="popperClass" v-show="!disabled && showPopper">
                <slot />
            </span>
        </transition>
        <slot name="reference" />
    </component>
</template>

<script>
import { createPopper } from "@popperjs/core";
import { elementContains, on, off } from "~/utils/dom.js";

export default {
    props: {
        tagName: {
            type: String,
            default: "span"
        },
        trigger: {
            type: String,
            default: "click",
            validator: value =>
                [
                    "clickToOpen",
                    "click", // Same as clickToToggle, provided for backwards compatibility.
                    "clickToToggle",
                    "hover",
                    "focus",
                    "soft"
                ].indexOf(value) > -1
        },
        delayOnMouseOver: {
            type: Number,
            default: 10
        },
        delayOnMouseOut: {
            type: Number,
            default: 10
        },
        disabled: {
            type: Boolean,
            default: false
        },
        enterActiveClass: String,
        leaveActiveClass: String,
        boundariesSelector: String,
        reference: {},
        forceShow: {
            type: Boolean,
            default: false
        },
        dataValue: {
            default: null
        },
        appendToBody: {
            type: Boolean,
            default: false
        },
        visibleArrow: {
            type: Boolean,
            default: false
        },
        transition: {
            type: String,
            default: ""
        },
        stopPropagation: {
            type: Boolean,
            default: false
        },
        preventDefault: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        popperClass: {
            type: String,
            default: ""
        },
        rootClass: {
            type: String,
            default: ""
        }
    },

    data() {
        return {
            referenceElm: null,
            popperJS: null,
            showPopper: false,
            currentPlacement: "",
            popperOptions: {
                computeStyle: {
                    gpuAcceleration: false
                }
            }
        };
    },

    watch: {
        showPopper(value) {
            if (value) {
                this.$emit("show", this);
                if (this.popperJS) {
                    this.popperJS.setOptions({
                        modifiers: [
                            ...this.popperJS.state.options.modifiers,
                            {
                                name: "eventListeners",
                                options: {
                                    scroll: true,
                                    resize: true
                                }
                            }
                        ]
                    });
                }
                this.updatePopper();
            } else {
                if (this.popperJS) {
                    this.popperJS.setOptions({
                        modifiers: [
                            ...this.popperJS.state.options.modifiers,
                            {
                                name: "eventListeners",
                                options: {
                                    scroll: false,
                                    resize: false
                                }
                            }
                        ]
                    });
                }
                this.$emit("hide", this);
            }
        },

        forceShow: {
            handler(value) {
                this[value ? "doShow" : "doClose"]();
            },
            immediate: true
        },

        disabled(value) {
            if (value) {
                this.showPopper = false;
            }
        }
    },

    created() {
        this.appendedArrow = false;
        this.appendedToBody = false;
        this.popperOptions = Object.assign(this.popperOptions, this.options);
    },

    mounted() {
        this.referenceElm = this.reference || this.$slots.reference[0].elm;
        this.popper = this.$slots.default[0].elm;

        switch (this.trigger) {
            case "clickToOpen":
                on(this.referenceElm, "click", this.doShow);
                on(document, "click", this.handleDocumentClick);
                break;
            case "click": // Same as clickToToggle, provided for backwards compatibility.
            case "clickToToggle":
                on(this.referenceElm, "click", this.doToggle);
                on(document, "click", this.handleDocumentClick);
                break;
            case "hover":
                on(this.referenceElm, "mouseover", this.onMouseOver);
                on(this.popper, "mouseover", this.onMouseOver);
                on(this.referenceElm, "mouseout", this.onMouseOut);
                on(this.popper, "mouseout", this.onMouseOut);
                break;
            case "focus":
                on(this.referenceElm, "focus", this.onMouseOver);
                on(this.popper, "focus", this.onMouseOver);
                on(this.referenceElm, "blur", this.onMouseOut);
                on(this.popper, "blur", this.onMouseOut);
                break;
            case "soft":
                break;
        }
    },

    methods: {
        doToggle(event) {
            if (this.stopPropagation) {
                event.stopPropagation();
            }

            if (this.preventDefault) {
                event.preventDefault();
            }

            if (!this.forceShow) {
                this.showPopper = !this.showPopper;
            }
        },

        doShow() {
            this.showPopper = true;
        },

        doClose() {
            this.showPopper = false;
        },

        doDestroy() {
            if (this.showPopper) {
                return;
            }

            if (this.popperJS) {
                this.popperJS.destroy();
                this.popperJS = null;
            }

            if (this.appendedToBody) {
                this.appendedToBody = false;
                document.body.removeChild(this.popper.parentElement);
            }
        },

        createPopperInstance() {
            this.$nextTick(() => {
                if (this.visibleArrow) {
                    this.appendArrow(this.popper);
                }

                if (this.appendToBody && !this.appendedToBody) {
                    this.appendedToBody = true;
                    document.body.appendChild(this.popper.parentElement);
                }

                if (this.popperJS && this.popperJS.destroy) {
                    this.popperJS.destroy();
                }

                if (this.boundariesSelector) {
                    const boundariesElement = document.querySelector(
                        this.boundariesSelector
                    );

                    if (boundariesElement) {
                        this.popperOptions.modifiers = Object.assign(
                            {},
                            this.popperOptions.modifiers
                        );
                        this.popperOptions.modifiers.preventOverflow = Object.assign(
                            {},
                            this.popperOptions.modifiers.preventOverflow
                        );
                        this.popperOptions.modifiers.preventOverflow.boundariesElement = boundariesElement;
                    }
                }

                this.popperOptions.onCreate = () => {
                    this.$emit("created", this);
                    this.$nextTick(this.updatePopper);
                };

                this.popperJS = createPopper(
                    this.referenceElm,
                    this.popper,
                    this.popperOptions
                );
            });
        },

        destroyPopper() {
            off(this.referenceElm, "click", this.doToggle);
            off(this.referenceElm, "mouseup", this.doClose);
            off(this.referenceElm, "mousedown", this.doShow);
            off(this.referenceElm, "focus", this.doShow);
            off(this.referenceElm, "blur", this.doClose);
            off(this.referenceElm, "mouseout", this.onMouseOut);
            off(this.referenceElm, "mouseover", this.onMouseOver);
            off(document, "click", this.handleDocumentClick);

            this.showPopper = false;
            this.doDestroy();
        },

        appendArrow(element) {
            if (this.appendedArrow) {
                return;
            }

            this.appendedArrow = true;

            const arrow = document.createElement("div");
            arrow.setAttribute("data-popper-arrow", "");
            element.appendChild(arrow);
        },

        updatePopper() {
            this.popperJS
                ? this.popperJS.update()
                : this.createPopperInstance();
        },

        onMouseOver() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.showPopper = true;
            }, this.delayOnMouseOver);
        },

        onMouseOut() {
            clearTimeout(this._timer);
            this._timer = setTimeout(() => {
                this.showPopper = false;
            }, this.delayOnMouseOut);
        },

        handleDocumentClick(event) {
            if (
                !this.$el ||
                !this.referenceElm ||
                !this.popper ||
                elementContains(this.$el, event.target) ||
                elementContains(this.referenceElm, event.target) ||
                elementContains(this.popper, event.target)
            ) {
                return;
            }

            this.$emit("documentClick", this);

            if (this.forceShow) {
                return;
            }

            this.showPopper = false;
        },
    },

    destroyed() {
        this.destroyPopper();
    }
};
</script>