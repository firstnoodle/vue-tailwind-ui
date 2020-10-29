<template>
    <demo-wrapper title="PopSelect">
        <pop-select @clear="onClear" clearSelectionText="No Focus Area" filterable>
            <template #options>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 1</div>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 2</div>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 3</div>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 4</div>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 5</div>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 6</div>
                <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 7</div>
            </template>
        </pop-select>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import PopSelect from '~/components/PopSelect';

export default {
    name: 'PopSelectDemo',
    components: { DemoWrapper, PopSelect },
    methods: {
        onClear() {
            console.log('clear selection');
        }
    }
}
</script>