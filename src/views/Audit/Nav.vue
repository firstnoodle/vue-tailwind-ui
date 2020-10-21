<template>
    <nav class="px-6 pb-6 pt-20 md:p-6">
        <sidebar-nav-item href="#" icon="phase">Audit details</sidebar-nav-item>

        <div class="flex items-center py-2 mt-2">
            <span class="text-xs font-medium mr-2 text-gray-500">Planning</span>
            <span class="inline-block w-full border-b border-gray-400"></span>
        </div>
        <sidebar-nav-item href="#" icon="building">Auditee</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="team">Audit team</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="index-finger-up">Criteria</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="scope">Scope</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="crosshair">Focus Areas</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="clock">Agenda</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="information">Info. Requests</sidebar-nav-item>

        <div class="flex items-center py-2 mt-2">
            <span class="text-xs font-medium mr-2 text-gray-500">Reporting</span>
            <span class="inline-block w-full border-b border-gray-400"></span>
        </div>
        <sidebar-nav-item href="#" icon="index-finger-right">Findings</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="message">Suggestions</sidebar-nav-item>
        <sidebar-nav-item href="#" icon="conclusion">Conclusion</sidebar-nav-item>
    </nav>
</template>

<script>
import SidebarNavItem from '~/components/application/SidebarNavItem';

export default {
    name: 'Nav',
    components: { SidebarNavItem }
}
</script>