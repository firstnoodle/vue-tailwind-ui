<template>
    <div class="md:hidden z-10 fixed top-0 left-0 w-full bg-white" style="height: -webkit-fill-available">
        <header class="z-10 fixed w-screen top-0 left-0 flex items-center justify-end p-2">
            <icon-button class="inline-flex" value="close" @click="$emit('close')" />
        </header>
        <div class="flex flex-col items-center pt-16">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.28571 12C4.28571 7.73952 7.73952 4.28571 12 4.28571C16.2605 4.28571 19.7143 7.73952 19.7143 12C19.7143 16.2605 16.2605 19.7143 12 19.7143C7.73952 19.7143 4.28571 16.2605 4.28571 12ZM12 5.42857C8.3707 5.42857 5.42857 8.3707 5.42857 12C5.42857 15.6293 8.3707 18.5714 12 18.5714C15.6293 18.5714 18.5714 15.6293 18.5714 12C18.5714 11.5351 18.5231 11.0814 18.4313 10.6437C17.9588 12.412 16.3458 13.7143 14.4286 13.7143C12.1405 13.7143 10.2857 11.8595 10.2857 9.57143C10.2857 7.65423 11.588 6.04119 13.3563 5.56869C12.9186 5.47686 12.4649 5.42857 12 5.42857ZM11.4286 9.57143C11.4286 7.91457 12.7717 6.57143 14.4286 6.57143C16.0854 6.57143 17.4286 7.91457 17.4286 9.57143C17.4286 11.2283 16.0854 12.5714 14.4286 12.5714C12.7717 12.5714 11.4286 11.2283 11.4286 9.57143Z" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C14.3629 24 16.5663 23.3171 18.4235 22.1378L20.1544 23.8687L23.993 20.0301L22.2334 18.2705C23.3539 16.4457 24 14.2983 24 12C24 5.37258 18.6274 0 12 0ZM22.8571 12C22.8571 13.981 22.3266 15.8381 21.3998 17.4369L20.7608 18.4142L22.3767 20.0301L20.1544 22.2524L18.5566 20.6546L17.5932 21.3075C15.9596 22.2913 14.0459 22.8571 12 22.8571C6.00377 22.8571 1.14286 17.9962 1.14286 12C1.14286 6.00377 6.00377 1.14286 12 1.14286C17.9962 1.14286 22.8571 6.00377 22.8571 12Z" />
            </svg>
            <div class="mt-1 font-light">AuditTool</div>
        </div>
        <nav class="bg-white w-full h-full px-6 pb-6 pt-8 overflow-y-auto">
            <sidebar-nav-item href="#" icon="dashboard">Dashboard</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="phase">Audits</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="team">Auditors</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="building">Auditees</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="index-finger-right">Findings</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="cog">Settings</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="user">NSTQ</sidebar-nav-item>
            <sidebar-nav-item href="#" icon="sign-in">Sign out</sidebar-nav-item>
        </nav>
    </div>
</template>

<script>
import IconButton from '~/components/IconButton';
import SidebarNavItem from '~/components/application/SidebarNavItem';

export default {
    name: 'MobileAppNav',
    components: { IconButton, SidebarNavItem }
}
</script>