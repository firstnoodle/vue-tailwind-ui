<template>
    <nav class="relative z-0 inline-flex shadow-sm">
        <!-- TODO: prev/next buttons need to work and last page button -->
        <button 
            href="#"
            rel="prev" 
            aria-label="previous page" 
            class="relative inline-flex items-center px-2 py-2 border border-default bg-default text-sm leading-tight font-medium text-primary hover:text-primary hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-action focus:shadow-outline active:bg-gray-100 active:text-primary transition ease-in-out duration-150 rounded-l-md"
            >
            <icon value="angle-left" />
        </button>
        <span class="-ml-px relative inline-flex items-center z-0 px-3 py-2 border border-default bg-default text-sm leading-tight font-light text-primary">
            {{ paginator.currentPage }} / <a href="/goto-last-page" class="ml-1 hover:text-primary-500">{{ paginator.lastPage }}</a>
        </span>
        <button 
            rel="next" 
            aria-label="next page" 
            class="relative inline-flex items-center px-2 py-2 border border-default bg-default text-sm leading-tight font-medium text-primary hover:text-primary hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-action focus:shadow-outline active:bg-gray-100 active:text-primary transition ease-in-out duration-150 -ml-px rounded-r-md"
            >
            <icon value="angle-right" />
        </button>
    </nav>
</template>

<script>
import Icon from '~/components/Icon';

export default {
    name: "Pagination",
    components: { Icon },
    props: {
        paginator: {
            type: Object,
            requred: true,
        }
    }
}
</script>