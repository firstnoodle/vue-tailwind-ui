<template>
    <div
        v-clickoutside="onClickOutside"
        class="flex flex-col border rounded-md focus-within:shadow-outline focus-within:border-action"
        :class="{ 
            'my-4' : !inline,
            'flex-1 min-h-0' : expandVertically, 
            'shadow-outline border-action' : softFocus, 
            'border-subtle' : !softFocus && !inline,
            'border-default shadow-inner-sm' : inline
            }"
    >
        <editor-content :class="{ 'css-text-editor--minimal' : minimal }" class="flex-1 overflow-y-auto rounded-t-md" :editor="editor" />
        <!-- MENU -->
        <editor-menu-bar
            v-if="history"
            class="flex-0 min-h-0 p-1 rounded-b-md overflow-hidden"
            :class="computedMenuClass"
            :editor="editor"
            v-slot="{ commands, isActive }"
        >
            <div class="flex items-center justify-between">
                <div>
                    <text-editor-button v-if="history" @click="onEditorMenuClick(commands.undo)">
                        <icon value="arrow-left" />
                    </text-editor-button>
                    <text-editor-button v-if="history" @click="onEditorMenuClick(commands.redo)">
                        <icon value="arrow-right" />
                    </text-editor-button>
                    <text-editor-button 
                        v-if="emphasis"
                        :active="isActive.bold()" 
                        @click="onEditorMenuClick(commands.bold)"
                        >
                        {{'B'}}
                    </text-editor-button>
                    <text-editor-button 
                        v-if="emphasis"
                        :active="isActive.italic()" 
                        @click="onEditorMenuClick(commands.italic)"
                        >
                        {{'I'}}
                    </text-editor-button>
                    <text-editor-button 
                        v-if="emphasis"
                        :active="isActive.underline()" 
                        @click="onEditorMenuClick(commands.underline)"
                        >
                        {{'U'}}
                    </text-editor-button>
                    <text-editor-button
                        v-if="heading"
                        :active="isActive.heading({ level: 1 })"
                        @click="onSpecialCommand(commands.heading({ level: 1 }))"
                        >
                        {{'H1'}}
                    </text-editor-button>
                    <text-editor-button
                        v-if="listStyles"
                        :active="isActive.bullet_list()"
                        @click="onEditorMenuClick(commands.bullet_list)"
                        >
                        <icon value="itenary" />
                    </text-editor-button>
                    <text-editor-button
                        v-if="listStyles"
                        :active="isActive.ordered_list()"
                        @click="onEditorMenuClick(commands.ordered_list)"
                        >
                        <icon value="page" />
                    </text-editor-button>
                </div>
                <div v-if="$slots.header">
                    <slot name="header" />
                </div>
            </div>
        </editor-menu-bar>
    </div>
</template>

<script>
import Clickoutside from '~/utils/click-outside';
import Icon from '~/components/Icon';
import TextEditorButton from "~/components/TextEditorButton";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
    Bold,
    BulletList,
    HardBreak,
    Heading,
    History,
    Italic,
    Link,
    ListItem,
    OrderedList,
    Underline
} from "tiptap-extensions";

export default {
    name: "TextEditor",
    directives: { Clickoutside },
    components: {
        EditorContent,
        EditorMenuBar,
        Icon,
        TextEditorButton
    },
    props: {
        content: {
            type: String,
            required: true
        },
        emphasis: {
            type: Boolean,
            default: false
        },
        expandVertically: {
            type: Boolean,
            default: false
        },
        heading: {
            type: Boolean,
            default: false
        },
        history: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        },
        listStyles: {
            type: Boolean,
            default: false
        },
        minimal: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            editor: new Editor({
                content: this.content,
                onBlur: () => {
                    this.editorFocussed = false;
                    this.$emit('blur');
                },
                onFocus: () => {
                    this.editorFocussed = true;
                    this.softFocus = true;
                    this.$emit('focus');
                },
                onUpdate: ({ getHTML }) => {
                    this.$emit("change", getHTML());
                },
                extensions: [
                    // The editor will accept paragraphs and headline elements as part of its document schema.
                    new Bold(),
                    new BulletList(),
                    new HardBreak(),
                    new Heading({
                        levels: [1]
                    }),
                    new History(),
                    new Italic(),
                    new Link(),
                    new ListItem(),
                    new OrderedList(),
                    new Underline()
                ]
            }),
            editorFocussed: false,
            softFocus: false,
        };
    },
    computed: {
        computedMenuClass() {
            return this.softFocus
                ? 'bg-gray-100 border-t border-default opacity-100'
                : 'bg-default border-t border-subtle opacity-50';
        }
    },
    beforeDestroy() {
        // Always destroy your editor instance when it's no longer needed
        this.editor.destroy();
    },
    methods: {
        focus() {
            this.editor.focus();
        },
        onClickOutside() {
            this.softFocus = false;
        },
        onEditorMenuClick(command) {
            command();
            this.softFocus = true;
        },
        onSpecialCommand() {
            this.softFocus = true;
        }
    }
};
</script>