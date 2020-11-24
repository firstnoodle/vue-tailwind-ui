<template>
    <span 
        class="inline-flex items-center rounded-md"
        :class="computedBgClass"
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
                return ['Minor', 'Major', 'Critical'].indexOf(value) !== -1;
            }
        }
    },
    computed: {
        computedBgClass() {
            if(this.severity === 'Minor') return 'bg-blue-200';
            if(this.severity === 'Major') return 'bg-yellow-400';
            if(this.severity === 'Critical') return 'bg-red-400';
            return null;
        }
    }
}
</script>