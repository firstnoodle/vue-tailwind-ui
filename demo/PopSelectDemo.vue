<template>
    <demo-wrapper title="PopSelect">
        <pop-select 
            v-model="selectedOption"
            filterable
            clearSelectionText="No Trend Category" 
            icon="trend"
            null-label="Set Trend Category"
            @change="onSelectChange"
            @clear="onClear" 
            >
            <template #options>
                <pop-select-option 
                    v-for="option in options" 
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                    />
            </template>
        </pop-select>
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import PopSelect from '~/components/PopSelect/main.vue';
import PopSelectOption from '~/components/PopSelect/option.vue';

export default {
    name: 'PopSelectDemo',
    components: { DemoWrapper, PopSelect, PopSelectOption },
    data() {
        return {
            options: [
                {value: 1, label: 'Quality Management System'},
                {value: 2, label: 'Personnel'},
                {value: 3, label: 'Premises'},
                {value: 4, label: 'Documentation'},
                {value: 5, label: 'Production'},
                {value: 6, label: 'Production - Utilities'},
                {value: 7, label: 'Production - API'},
                {value: 8, label: 'Production - Wash and sterilisation'},
                {value: 9, label: 'Production - Formulation'},
                {value: 10, label: 'Production - Filling'},
                {value: 11, label: 'Production - Inspection'},
                {value: 12, label: 'Production - Packaging'},
                {value: 13, label: 'Production - Storage and handling of materials'},
                {value: 14, label: 'Quality Control'},
                {value: 15, label: 'Outsourced Activities'},
                {value: 16, label: 'Complaints and product recall'},
                {value: 17, label: 'Internal Audit / Self Inspection'},
                {value: 18, label: 'IT systems and Computerised equipment'},
                {value: 19, label: 'Regulatory Activities'},
                {value: 20, label: 'Medical Device Activities'},
            ],
            selectedOption: null,
        }
    },
    methods: {
        onClear() {
            console.log('clear selection');
        },
        onSelectChange(value) {
            this.selectedOption = value; //this.options.find(option => option.value === value);
        }
    }
}
</script>