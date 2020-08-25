<template>
    <div class="theme-light">
        <test message="yourself!"/> 
    </div>
</template>

<script>
// Remember to import global css in every demo
import '~/css/main.css';

// Import the component we want to demo
import Test from '~/components/Test';

export default {
    name: "TestDemo",
    components: { Test } 
}
</script>