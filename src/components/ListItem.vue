<template>
    <ul class="item">
        <span>{{ name }}</span>
    </ul>
</template>

<script>
export default {
    props: ['name']
}
</script>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    border-radius: 5px;
}
</style>