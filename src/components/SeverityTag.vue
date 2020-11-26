<template>
    <span 
        @click="$emit('click')"
        class="inline-flex items-center text-sm rounded-md"
        :class="computedClass"
        style="padding: 0.125rem 0.5rem"
        >
        <icon value="warning" class="mr-1" />
        {{ severity }}
    </span>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: 'SeverityTag',
    components: { Icon },
    props: {
        severity: {
            type: String,
            validator: value => {
                return ['MINOR', 'MAJOR', 'CRITICAL'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        computedClass() {
            if(this.severity === 'MINOR') return 'bg-light-blue-40 text-light-blue-darker';
            if(this.severity === 'MAJOR') return 'bg-golden-sun-lighter text-default';
            if(this.severity === 'CRITICAL') return 'bg-lava-red-darker text-white';
            return null;
        },
    }
}
</script>