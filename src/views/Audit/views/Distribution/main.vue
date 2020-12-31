<template>
    <view-content title="Distribution" icon="arrow-fat-right">

        <distribution-date target="plan" />
        <recipients target="plan" />
        <distribution-date target="report" />
        <recipients target="report" />

        <template #footer>
            <view-content-footer-link :to="{ name: 'Audit details' }" icon="phase" label="Audit details" placement="left" />
            <view-content-footer-link :to="{ name: 'Audit auditee' }" icon="building" label="Auditee" placement="right" />
        </template>
    </view-content>
</template>

<script>
import DistributionDate from './DistributionDate';
import Recipients from './Recipients';
import ViewContent from '~/components/application/ViewContent';
import ViewContentFooterLink from '~/components/application/ViewContentFooterLink';

export default {
    name: 'Distribution',
    components: { DistributionDate, Recipients, ViewContent, ViewContentFooterLink },
}
</script>