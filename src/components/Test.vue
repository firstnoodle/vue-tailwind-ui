<template>
    <div class="bg-page text-default">Test {{ message }}</div>
</template>

<script>
export default {
    name: "Test",
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>