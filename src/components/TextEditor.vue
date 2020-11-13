<template>
    <div
        class="flex-1 min-h-0 flex flex-col my-4 border border-subtle rounded focus-within:shadow-outline focus-within:border-action"
    >
        <!-- MENU -->
        <editor-menu-bar
            class="flex-0 min-h-0 p-1 bg-default rounded-t overflow-hidden border-b border-subtle focus-within:opacity-100"
            :editor="editor"
            v-slot="{ commands, isActive }"
        >
            <div class="">
                <text-editor-button>
                    <icon value="arrow-left" />
                </text-editor-button>
                <text-editor-button>
                    <icon value="arrow-right" />
                </text-editor-button>
                <text-editor-button 
                    :active="isActive.bold()" 
                    @click="commands.bold"
                    >
                    {{'B'}}
                </text-editor-button>
                <text-editor-button 
                    :active="isActive.italic()" 
                    @click="commands.italic"
                    >
                    {{'I'}}
                </text-editor-button>
                <text-editor-button 
                    :active="isActive.underline()" 
                    @click="commands.underline"
                    >
                    {{'U'}}
                </text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 1 })"
                    @click="commands.heading({ level: 1 })"
                    >
                    {{'H1'}}
                </text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 2 })"
                    @click="commands.heading({ level: 2 })"
                    >
                    {{'H2'}}
                </text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 3 })"
                    @click="commands.heading({ level: 3 })"
                    >
                    {{'H3'}}
                </text-editor-button>
                <text-editor-button
                    :active="isActive.heading({ level: 3 })"
                    @click="commands.heading({ level: 3 })"
                    >
                    {{'&#182;'}}
                </text-editor-button>
            </div>
        </editor-menu-bar>

        <!-- CONTENT -->
        <editor-content class="flex-1 overflow-y-auto rounded-b" :editor="editor" />
    </div>
</template>

<script>
import Icon from '~/components/Icon';
import TextEditorButton from "~/components/TextEditorButton";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
    Bold,
    Italic,
    Link,
    HardBreak,
    Heading,
    Underline
} from "tiptap-extensions";

export default {
    name: "TextEditor",
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
        }
    },
    data() {
        return {
            editor: new Editor({
                content: this.content,
                onUpdate: ({ getHTML }) => {
                    // get new content on update
                    this.$emit("change", getHTML());
                },
                extensions: [
                    // The editor will accept paragraphs and headline elements as part of its document schema.
                    new Bold(),
                    new Italic(),
                    new Link(),
                    new HardBreak(),
                    new Heading({
                        levels: [1, 2, 3]
                    }),
                    new Underline()
                ]
            })
        };
    },
    beforeDestroy() {
        // Always destroy your editor instance when it's no longer needed
        this.editor.destroy();
    }
};
</script>