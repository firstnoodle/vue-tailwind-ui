<template>
    <demo-wrapper title="PopSelect">
        <div>{{ selectedOption || 'none' }}</div>
        <pop-select 
            v-model="selectedOption"
            filterable
            clearSelectionText="No Department" 
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
                {value: 1, label: 'Copenhagen'},
                {value: 2, label: 'Suleymania'},
                {value: 3, label: 'Banglore'},
                {value: 4, label: 'Bogota'},
                {value: 5, label: 'Casa Blanca'},
                {value: 6, label: 'Mexico City'},
                {value: 7, label: 'Nairobi'},
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