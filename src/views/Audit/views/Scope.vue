<template>
    <view-content title="Scope" icon="scope" fitToViewHeight>

        <text-editor expand-vertically :content="editorContent" @change="onEditorChange" />

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit requirements' }" icon="index-finger-up" label="Requirements" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit focus areas' }" icon="crosshair" label="Focus Areas" placement="right" />
        </template>
    </view-content>
</template>

<script>
import TextEditor from '~/components/TextEditor';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Scope',
    components: { TextEditor, ViewContent, ViewContentFooterLink },
    data() {
        return {
            editorContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque risus vel pulvinar lobortis. Ut quis lobortis quam. Phasellus quis nunc id sem accumsan scelerisque vitae in tellus. Ut vulputate lorem leo, at sodales elit mollis ac. Mauris pharetra sit amet lectus vitae rhoncus. Quisque et dui ac metus consequat laoreet. Ut faucibus non neque eget efficitur. Aenean id odio vulputate, rhoncus magna nec, vehicula leo. In elit est, semper auctor mauris eu, molestie tempor est. Aenean et rhoncus nunc, nec pretium lorem. Nunc quam nisl, convallis vel purus sed, congue imperdiet turpis. Duis mi turpis, commodo non est nec, semper semper nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque risus vel pulvinar lobortis. Ut quis lobortis quam. Phasellus quis nunc id sem accumsan scelerisque vitae in tellus. Ut vulputate lorem leo, at sodales elit mollis ac. Mauris pharetra sit amet lectus vitae rhoncus. Quisque et dui ac metus consequat laoreet. Ut faucibus non neque eget efficitur. Aenean id odio vulputate, rhoncus magna nec, vehicula leo. In elit est, semper auctor mauris eu, molestie tempor est. Aenean et rhoncus nunc, nec pretium lorem. Nunc quam nisl, convallis vel purus sed, congue imperdiet turpis. Duis mi turpis, commodo non est nec, semper semper nibh.'
        }
    },
    methods: {
        onEditorChange(value) {
            console.log(value);
        },
    }
}
</script>