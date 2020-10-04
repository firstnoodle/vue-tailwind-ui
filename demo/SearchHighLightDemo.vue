<template>
    <demo-wrapper title="Search highlight demo">
        <div class="mb-4">
            <input v-model="highlight" class="border border-gray-400 rounded px-2 py-1 text-primary">
        </div>
        <search-highlight value="Testing tennis ten times" :highlight="highlight" class="text-primary" />
    </demo-wrapper> 
</template>

<script>
import DemoWrapper from './DemoComponents/DemoWrapper';
import SearchHighlight from '~/components/SearchHighlight';
export default {
    name: 'SearchHighlightDemo',
    components: { DemoWrapper, SearchHighlight },
    data() {
        return {
            highlight: 'te'
        }
    }
}
</script>