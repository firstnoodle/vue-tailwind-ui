<template>
    <demo-wrapper title="Button demo">
        <div class="flex mb-2">
            Standard buttons
        </div>
        <div class="flex">
            <base-button class="mr-2">Default</base-button>
            <base-button class="mr-2" type="primary">Primary</base-button>
            <base-button class="mr-2" type="success">Success</base-button>
            <base-button class="mr-2" type="warning">Warning</base-button>
            <base-button class="mr-2" type="error">Error</base-button>
        </div>
        <div class="flex mb-2 mt-8">
            Plain buttons
        </div>
        <div class="flex">
            <base-button class="mr-2" plain>Default</base-button>
            <base-button class="mr-2" plain type="primary">Primary</base-button>
            <base-button class="mr-2" plain type="success">Success</base-button>
            <base-button class="mr-2" plain type="warning">Warning</base-button>
            <base-button class="mr-2" plain type="error">Error</base-button>
        </div>
        <div class="flex mb-2 mt-8">
            Icon buttons
        </div>
        <div class="flex">
            <base-button class="mr-2" plain type="primary" icon="index-finger-up">Primary</base-button>
            <base-button class="mr-2" type="success" icon="check-outline">Success</base-button>
            <base-button class="mr-2" plain type="error" icon="trash">Error</base-button>
            <base-button class="mr-2" plain type="primary" icon="cog" />
        </div>
        <div class="flex mb-2 mt-8">
            Rounded buttons
        </div>
        <div class="flex">
            <base-button class="mr-2" rounded plain type="primary" icon="index-finger-up">Primary</base-button>
            <base-button class="mr-2" rounded type="success" icon="check-outline">Success</base-button>
            <base-button class="mr-2" rounded plain type="error" icon="trash"></base-button>
        </div>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import BaseButton from '~/components/BaseButton';
export default {
    name: 'ButtonDemo',
    components: { BaseButton, DemoWrapper }
}
</script>