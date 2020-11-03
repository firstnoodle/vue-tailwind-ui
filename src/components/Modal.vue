<template>
    <div class="z-50 fixed w-screen h-screen top-0 left-0 p-4 md:p-8 bg-black bg-opacity-25" style="height: -webkit-fill-available" @click.self="$emit('close')">
        <div class="flex flex-col max-w-2xl h-full mx-auto p-8 bg-white shadow-xl rounded-lg">
            <header class="flex-0 relative flex items-center justify-between w-full mb-4">
                <div class="flex items-center text-brand">
                    <icon value="index-finger-right" />
                    <span class="ml-2 text-sm font-light">Finding Q1</span>
                </div>
                <icon-button class="" value="close" @click="$emit('close')" />
            </header>
            <scrollbar
                tag="main"
                class="flex-1"
                >
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
                <div class="border border-subtle rounded-md h-64 mt-4 p-4 italic text-gray-500 text-sm font-light mb-4">Describe the finding</div>
                <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md" style="padding: 0.125rem 0.5rem">
                    <icon value="tag" />
                    <span class="ml-1 text-sm font-light">Keyword</span>
                </div>
                <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md ml-2" style="padding: 0.125rem 0.5rem">
                    <icon value="crosshair" />
                    <span class="ml-1 text-sm font-light">Focus area</span>
                </div>
                <div class="inline-flex items-center px-2 py-1 text-action border border-subtle rounded-md ml-2" style="padding: 0.125rem 0.5rem">
                    <icon value="trend" />
                    <span class="ml-1 text-sm font-light">Trend category</span>
                </div>
                <div class="mt-4">
                    Lorem ipsum dolor sits amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit.
        Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet.
        Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit.
        Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet.
        Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante.
                </div>
            </scrollbar>
            <footer class="flex-0">
            </footer>
        </div>
    </div>
</template>

<script>
import Icon from '~/components/Icon';
import IconButton from '~/components/IconButton';
import Scrollbar from '~/components/Scrollbar/main';

export default {
    name: 'Modal',
    components: { Icon, IconButton, Scrollbar }
}
</script>