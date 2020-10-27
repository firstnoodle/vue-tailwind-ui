<template>
    <div class="z-50 fixed w-screen h-screen top-0 left-0 p-4 md:p-8 bg-black bg-opacity-25" style="height: -webkit-fill-available" @click.self="$emit('close')">
        <div class="max-w-2xl h-full mx-auto p-8 bg-white shadow-xl rounded-lg">
            <header class="relative flex items-center justify-between w-full mb-4">
                <div class="flex items-center text-brand">
                    <icon value="index-finger-right" />
                    <span class="ml-2 text-sm font-light">Finding Q1</span>
                </div>
                <icon-button class="" value="close" @click="$emit('close')" />
            </header>
            <div class="group flex items-center justify-between">
                <div class="flex-1 font-medium text-primary group-hover:text-action">Floor drain not cleaned often enough</div>
                <icon-button value="edit" class="flex-0" />
            </div>
            <div class="text-xs text-gray-500 pb-4">
                Created 10 Sep 2020 12:23 by NSTQ (Seabstian Rønde Thielke)
            </div>
            <div class="inline-flex items-center px-2 py-1 bg-yellow-500 text-yellow-900 rounded-md" style="padding: 0.125rem 0.5rem">
                <icon value="warning" />
                <span class="ml-1 text-sm font-light">MAJOR</span>
            </div>
            <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md ml-2" style="padding: 0.125rem 0.5rem">
                <icon value="building" />
                <span class="ml-1 text-sm font-light">Department</span>
            </div>
            <div class="border border-subtle rounded-md h-64 mt-4 p-4 italic text-gray-500 text-sm font-light">Describe the finding</div>
        </div>
    </div>
</template>

<script>
import Icon from '~/components/Icon';
import IconButton from '~/components/IconButton';

export default {
    name: 'Modal',
    components: { Icon, IconButton }
}
</script>