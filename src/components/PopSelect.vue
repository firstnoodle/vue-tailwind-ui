<template>
    <div class="max-w-xs rounded-lg shadow-md bg-default border border-subtle">
        <header class="flex items-center border-b border-subtle overflow-hidden">
            <icon value="magnifying-glass" class="pl-4 pr-2 text-gray-600" />
            <input type="text" class="w-full py-2 text-sm font-light rounded-tr-lg focus:outline-none" placeholder="Search" />
        </header>
        <scrollbar
            wrap-class=""
            view-class=""
            ref="scrollbar"
            v-show="true"
            >
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 1</div>
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 2</div>
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 3</div>
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 4</div>
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 5</div>
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 6</div>
            <div class="w-full px-4 py-2 text-sm text-secondary font-light">Option 7</div>
        </scrollbar>
        <footer class="flex items-center px-4 py-2 text-sm text-action border-t border-subtle">
            <icon value="error" />
            <span class="ml-2">No Focus Area</span>
        </footer>
    </div>
</template>

<script>
// import BasePopper from '~/components/BasePopper';
import Icon from '~/components/Icon';
import Scrollbar from '~/components/Scrollbar/main.js';

export default {
    name: 'PopSelect',
    components: { /*BasePopper, */ Icon, Scrollbar }
}
</script>