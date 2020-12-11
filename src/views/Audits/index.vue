<template>
    <view-layout>
        <audits-view-header slot="desktop-view-header" @new-audit="createAudit" />
        <audits-view-nav slot="sidebar" />

        <template #mobile-app-header-left>
            <icon-button class="inline-flex md:hidden" value="plus" @click="createAudit" />
            <icon-button class="inline-flex md:hidden" value="itenary" @click="$store.dispatch('toggleSidebar')" />
        </template>
        <template #mobile-app-header-center>Audits</template>
        <template #mobile-app-header-right>
            <icon-button class="inline-flex" value="options" @click="$store.dispatch('showMobileMenu')" />
        </template>

        <div slot="main" class="w-full min-h-full">
            <audit-list-item 
                v-for="audit in $store.state.audits" 
                :key="audit.id" 
                :audit="audit" 
                />
        </div>
    </view-layout>
</template>

<script>
import focusAreas from '~/../demo/data/focus_areas';
import requirements from '~/../demo/data/requirements';
import auditModule from '~/store/modules/audit.js';
import AuditListItem from '~/components/application/AuditListItem';
import AuditsViewHeader from '~/views/Audits/Header';
import AuditsViewNav from '~/views/Audits/Nav';
import IconButton from '~/components/IconButton';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Audits',
    components: { AuditListItem, AuditsViewHeader, AuditsViewNav, IconButton, ViewLayout },
    methods: {
        createAudit() {
            const audit_id = Date.now();
            this.$store.registerModule(['audits', audit_id], auditModule);
            this.$store.commit(`audits/${audit_id}/SET_ID`, audit_id);

            /**
             * Add default focusAreas
             */
            const defaultFocusAreas = focusAreas
                .map((focusArea, index) => {
                    return {
                        id: Date.now() + index,
                        data: focusArea,
                        uiState: {
                            edit: false,
                            listId: focusArea.id,
                            selected: false
                        }
                    }
                });
            this.$store.commit(`audits/${audit_id}/focusAreas/UPDATE_ITEMS`, defaultFocusAreas);

            /**
             * Add default requirements
             */
            const defaultRequirements = requirements
                .filter(requirement => (requirement.default))
                .map((requirement, index) => {
                    return {
                        id: Date.now() + index,
                        data: {
                            id: requirement.id,
                            description: requirement.description,
                        },
                        uiState: {
                            edit: false,
                            listId: requirement.id,
                            selected: false,
                        }
                    }
                });

            this.$store.commit(`audits/${audit_id}/requirements/UPDATE_ITEMS`, defaultRequirements);
            this.$router.push({ name: 'Audit details',  params: { audit: audit_id }});
        }
    }
}
</script>