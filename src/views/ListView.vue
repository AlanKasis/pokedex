<script setup>
import ListItem from '@/components/ListItem.vue';
</script>

<template>
    <div class="post">
        <div v-if="loading" class="loading">Loading...</div>

        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="list" class="content">
            <li v-for="item in list" v-bind:key="item.name">
                <ListItem :name=item.name />
            </li>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            list: null,
            error: null,
        }
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchData()
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        fetchData() {
            this.error = this.list = null
            this.loading = true

            fetch('https://pokeapi.co/api/v2/pokemon', {
                method: "GET",
            })
                .then((response) => {
                    response.json().then((data) => {
                        this.list = data.results;
                        this.loading = false;
                    });
                })
                .catch((err) => {
                    this.error = err.toString()
                });
        },
    },
}
</script>

<style scoped>
</style>