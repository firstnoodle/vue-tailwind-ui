<template>
    <div class="theme-light min-h-screen w-screen">

        <mobile-app-header>
            <template #left>
                <icon-button class="inline-flex md:hidden" value="angle-left" />
                <icon-button class="inline-flex md:hidden" value="itenary" @click="mobilePageNavVisible = !mobilePageNavVisible" />
            </template>
            <template #center>
                <span class="font-bold text-secondary">AU</span>
                <span class="font-light text-primary">1001234</span>
            </template>
            <template #right>
                <icon-button class="inline-flex" value="arrow-up" />
                <icon-button class="inline-flex" value="options" @click="appNavVisible = true" />
            </template>
        </mobile-app-header>

        <!-- page content -->
        <main class="z-0 p-4 pt-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis gravida iaculis tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus vitae ante leo. Nunc blandit felis ut dolor laoreet, eget viverra sapien ullamcorper. Nulla facilisi. In a eros ac diam porttitor suscipit. Suspendisse rutrum, diam sed suscipit dapibus, ipsum risus laoreet est, quis pretium mauris velit eu lectus. Morbi non dolor erat. Nunc viverra fringilla pulvinar. Suspendisse mauris felis, sollicitudin vulputate neque nec, finibus pulvinar ligula. Aenean tristique lobortis sem et fermentum. Morbi nec interdum nibh. Fusce sed enim feugiat, bibendum odio sed, pellentesque velit.
Duis ultrices accumsan velit, in congue tortor bibendum sit amet. Aenean pretium velit a sem imperdiet pulvinar. Integer bibendum facilisis odio, in dignissim nisl rutrum lacinia. Cras sed nibh orci. Pellentesque tortor mi, ullamcorper iaculis placerat quis, mollis eu mi. Mauris commodo ut sem non placerat. Sed orci urna, laoreet sed posuere ut, vehicula ut orci. Etiam maximus leo erat, vitae posuere massa aliquam elementum. Donec pretium ultricies nibh in interdum. Quisque egestas hendrerit nisl, vitae pulvinar diam vulputate sit amet.
Vivamus porta odio nec mi malesuada auctor. Quisque tristique rhoncus tellus, quis auctor arcu dignissim volutpat. Phasellus vel mauris in lacus lobortis iaculis. Nullam iaculis, ex quis elementum pharetra, lacus ipsum sodales mauris, mollis sodales purus purus nec nisi. Mauris id tellus vel neque venenatis laoreet. Etiam volutpat, mauris a viverra iaculis, nunc urna lobortis sapien, id eleifend ipsum turpis vitae purus. Donec erat mi, feugiat a mi in, gravida egestas risus. Donec maximus nunc ac arcu pretium, nec semper lacus ornare. Cras laoreet lorem nec pharetra mattis. Praesent congue diam a sem consequat, non ornare sapien consequat. Curabitur malesuada risus ac libero tempor, nec tristique est condimentum. Phasellus euismod nunc eu magna placerat iaculis.
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur arcu metus, hendrerit ac lacus non, efficitur vulputate mi. Vivamus sed ligula rhoncus, aliquet lorem non, sodales est. Cras ac aliquet felis, nec pellentesque quam. Sed eu porta augue. Sed laoreet ut est bibendum pretium. Sed vulputate sit amet dolor ut pharetra. Donec non commodo ante.
        </main>

        <mobile-app-nav v-if="appNavVisible" @close="appNavVisible = false" />
        <mobile-page-nav :visible="mobilePageNavVisible" />
    </div>
</template>

<script>
// Remember to import global css in every demo
import '~/css/main.scss';

import IconButton from '~/components/IconButton';
import MobileAppHeader from '~/components/application/MobileAppHeader';
import MobileAppNav from '~/components/application/MobileAppNav';
import MobilePageNav from '~/components/application/MobilePageNav';

export default {
    name: 'ApplicationLayoutDemo',
    components: { IconButton, MobileAppHeader, MobileAppNav, MobilePageNav },
    data() {
        return {
            appNavVisible: false,
            mobilePageNavVisible: false,
        }
    }
}
</script>
