<template>
    <demo-wrapper title="Audit Rating">
        <audit-rating />
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import AuditRating from '~/components/AuditRating/main';

export default {
    name: 'AuditRatingDemo',
    components: { AuditRating, DemoWrapper }
}
</script>
