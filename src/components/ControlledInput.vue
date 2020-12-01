<template>
    <input
        v-model="inputValue"
        ref="input"
        class="py-2 text-sm text-primary leading-tight bg-transparent focus:outline-none"
        :placeholder="placeholder"
        @focus="$emit('focus')"
        @input="onInput"
        @keydown="onKeyDown"
        @keyup="onKeyUp"
        @select="onSelect"
    >
</template>

<script>
export default {
    name: "ControlledInput",
    props: {
        content: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "Type..."
        }
    },

    data() {
        return {
            deleteRepeatCount: 0,
            inputValue: "",
            keysPressed: [],
            lastKeyPressed: null,
            selection: null
        };
    },

    created() {
        this.inputValue = this.content;
    },

    watch: {
        content(newValue) {
            this.inputValue = newValue;
        }
    },

    methods: {
        onInput() {
            // catch if user pastes value
            const slicedContent = this.content.slice(0, this.content.length - 1);
            const slicedInput = this.inputValue.slice(0, this.inputValue.length - 1);

            if (this.lastKeyPressed === 8 && slicedContent === this.inputValue) {
                //console.log("DELETE");

                // allow delete key to repeat when deleteRepeatCount > 0
                // this is to avoid delete to trigger twice when it is just
                // pressed once
                if (this.deleteRepeatCount > 0) {
                    this.$emit("keyEvent", {
                        type: "keydown",
                        keyCode: this.lastKeyPressed,
                        shiftKey: false
                    });
                }
                this.deleteRepeatCount++;
            } else if (slicedInput === this.content) {
                //console.log("KEY");
                this.deleteRepeatCount = 0;
            } else {
                //console.log("PASTE");
                this.$emit("paste", this.inputValue, this.content);
            }

            this.inputValue = this.content;
        },

        onKeyDown(event) {
            if (this.keysPressed.indexOf(event.keyCode) === -1) {
                this.keysPressed.push(event.keyCode);

                if (event.keyCode === 8 && this.selection) {
                    this.$emit("deleteSelection", this.selection);
                } else {
                    this.$emit("keyEvent", event);
                }
                this.lastKeyPressed = event.keyCode;
            }
            this.selection = null;
        },

        onKeyUp(event) {
            this.keysPressed = this.keysPressed.filter(keyCode => {
                return keyCode !== event.keyCode;
            });
            this.$emit("keyEvent", event);

            if (this.keysPressed.length > 0) {
                this.lastKeyPressed = this.keysPressed[this.keysPressed.length - 1];
            } else {
                this.lastKeyPressed = null;
                this.deleteRepeatCount = 0;
            }
        },

        onSelect(event) {
            this.selection = event.target.value.substring(
                event.target.selectionStart,
                event.target.selectionEnd
            );
            this.$emit('select');
        }
    }
};
</script>
