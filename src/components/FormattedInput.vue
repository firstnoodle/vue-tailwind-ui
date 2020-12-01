<template>
    <controlled-input
        ref="input"
        slot="reference"
        :content="value"
        placeholder="2019-01-01 00:00"
        @deleteSelection="onDeleteSelection"
        @keyEvent="onInputKeyEvent"
        @paste="onInputPaste"
    />
</template>

<script>
import { inputValid, processInputValue } from "~/utils/input-formatting.js";
import ControlledInput from "~/components/ControlledInput.vue";

export default {
  name: "FormattedInput",
  components: {
    ControlledInput,
  },
  props: {
    value: {
        type: String,
        required: true,
    },
    format: {
        type: Object,
        required: true
    }
  },
  data() {
    return {
      paste: null,
    };
  },
  mounted() {
    if (!inputValid(this.value, this.format)) {
      this.$emit("change", "");
    }
  },
  methods: {
    deleteLastChar() {
      this.$emit("change", this.value.slice(0, this.value.length - 1));
    },

    onDeleteSelection(selection) {
      this.$emit("change", this.value.replace(selection, ""));
    },

    onInputKeyEvent(event) {
      if (this.paste) {
        if (inputValid(this.paste.pastedValue, this.format)) {
          this.$emit("change", this.paste.pastedValue);
        } else {
          this.$emit("change", this.paste.oldValue);
        }
        this.paste = null;
      } else {
        if (event.type === "keydown") {
          if (event.keyCode === 8) {
            this.deleteLastChar();
          } else if (event.keyCode === 13) {
            //this.$refs.input.$refs.input.blur()();
          } else {
            this.$emit(
              "change",
              processInputValue(this.value, this.format, event)
            );
          }
        } else if (event.type === "keyup") {
          if (event.keyCode === 13) {
            this.$refs.input.$refs.input.blur();
          }
        }
      }
    },

    onInputPaste(pastedValue, oldValue) {
      this.paste = { pastedValue, oldValue };
    },
  }
};
</script>
