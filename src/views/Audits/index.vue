<template>
    <view-layout>
        <audits-view-header slot="desktop-view-header" />
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
            <icon-button value="document" @click="modalVisible = true" />
            <portal to="modal">
                <modal v-if="modalVisible" @close="modalVisible = false" />
            </portal>
        </div>
    </view-layout>
</template>

<script>
import auditModule from '~/store/modules/audit.js';
import AuditsViewHeader from '~/views/Audits/Header';
import AuditsViewNav from '~/views/Audits/Nav';
import IconButton from '~/components/IconButton';
import Modal from '~/components/Modal';
import ViewLayout from '~/components/application/ViewLayout';

export default {
    name: 'Audits',
    components: { AuditsViewHeader, AuditsViewNav, IconButton, Modal, ViewLayout },
    data() {
        return {
            modalVisible: false
        }
    },
    methods: {
        createAudit() {
            const id = Date.now();
            this.$store.registerModule(['audits', id.toString()], auditModule);
            this.$router.push({ name: 'Audit details',  params: { id }});
        }
    }
}
</script>