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
import { SEVERITY_LEVELS } from '~/constants';
import Icon from '~/components/Icon';

export default {
    name: 'SeverityTag',
    components: { Icon },
    props: {
        severity: {
            type: String,
            validator: value => {
                return Object.values(SEVERITY_LEVELS).indexOf(value) !== -1;
            }
        }
    },
    computed: {
        computedClass() {
            if(this.severity === SEVERITY_LEVELS.MINOR) return 'bg-light-blue-40 text-light-blue-darker';
            if(this.severity === SEVERITY_LEVELS.MAJOR) return 'bg-golden-sun-lighter text-default';
            if(this.severity === SEVERITY_LEVELS.CRITICAL) return 'bg-lava-red-darker text-white';
            return null;
        },
    }
}
</script>