<template>
    <div>Test {{ message }}</div>
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