<template>
    <view-header>
        <template #sidebar>
            <router-link :to="{ name: 'Audits' }">
                <base-button plain type="primary" icon="angle-left" class="w-full inline-flex">BACK</base-button>
            </router-link>
        </template>
        <template #main>
            <div class="flex-1 flex items-center justify-between max-w-4xl m-auto">
                <div class="flex items-center">
                    <div class="flex items-center mr-4 lg:mr-8">
                        <icon value="id" class="hidden lg:inline-block text-gray-600" />
                        <span class="ml-2 text-sm font-light text-gray-800 truncate">
                            {{ $store.getters[`audits/${$route.params.audit}/novoglowId`] }}
                        </span>
                    </div>
                    <div class="flex items-center mr-4 lg:mr-8">
                        <icon value="calendar" class="hidden lg:inline-block text-gray-600" />
                        <span class="ml-2 text-sm font-light text-gray-800 truncate">{{ computedAgendaStartDate }}</span>
                    </div>
                    <div class="flex items-center mr-4 lg:mr-8">
                        <icon value="authority" class="hidden lg:inline-block text-gray-600" />
                        <span class="ml-2 text-sm font-light text-gray-800 truncate">{{ $store.getters[`audits/${audit_id}/team/leadAuditors`] }}</span>
                    </div>
                    <tooltip text="Biopharm New Haemophilia API &amp; Biopharm QA API" placement="bottom" >
                        <div class="flex items-center mr-4 lg:mr-8">
                            <icon value="building" class="hidden lg:inline-block text-gray-600" />
                            <span class="ml-2 text-sm font-light text-gray-800 truncate" style="max-width: 10rem">
                                Biopharm New Haemophilia API & Biopharm QA API
                            </span>
                        </div>
                    </tooltip>
                </div>
                <base-button plain type="primary" icon="document" class="self-end" @click="exportDocx" />
            </div>
        </template>
    </view-header>
</template>

<script>
import { exportPlan } from '~/outputs/plan';
// import html2docx from '~/utils/html2docx';
import BaseButton from '~/components/BaseButton';
import Icon from '~/components/Icon';
import Tooltip from '~/components/Tooltip';
import ViewHeader from '~/components/application/ViewHeader';

export default {
    name: 'Header',
    components: { BaseButton, Icon, Tooltip, ViewHeader },
    data() {
        return {
            audit_id: this.$route.params.audit,
        }
    },
    computed: {
        computedAgendaStartDate() {
            if(this.$store.getters[`audits/${this.audit_id}/team/getAllDatesChronologically`].length > 0) {
                return this.$store.getters[`audits/${this.audit_id}/team/getAllDatesChronologically`][0].data.date;
            }
            return 'none';
        }
    },
    methods: {
        exportDocx() {
            exportPlan();
            // html2docx(this.$store.state.audits[this.audit_id].scope);
        }
    }
}
</script>