<template>
    <div class="post">
        <div v-if="loading" class="loading">Loading...</div>

        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="list" class="content">
            <div class="search-bar-container">
                <SearchIcon class="search-icon" />
                <input v-model="input" ref="input" name="" id="" class="search-bar" placeholder="Search">
            </div>
            <li v-for="pokemon in filteredList()" v-bind:key="pokemon.name" class="list__container">
                <ListItem :name=capitalize(pokemon.name) />
            </li>
            <div class="footer">
                <button class="button-toggle active lato-md bold">
                    <ListIcon class="button__inner-icon"/>
                    All
                </button>
                <button class="button-toggle inactive lato-md bold">
                    <StarIcon class="button__inner-icon"/>
                    Favorites
                </button>
            </div>
            <div class="pokemon-not-found-container" v-if="input && !filteredList().length">
                <span class="lato-lg">Uh-oh!</span>
                <span>You look lost on your journey!</span>
                <button class="button-primary lato-md bold">Go back home</button>
            </div>
        </div>
    </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue'
import ListIcon from '@/components/icons/ListIcon.vue'
import StarIcon from '@/components/icons/StarIcon.vue'

export default {
    data() {
        return {
            loading: false,
            list: null,
            error: null,
            input: ""
        }
    },
    components: {
        ListItem,
        SearchIcon,
        ListIcon,
        StarIcon
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
        capitalize(name) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);
            return capitalizedFirst + rest;
        },
        filteredList() {
            return this.list.filter((pokemon) => {
                return pokemon.name.includes(this.input.toLowerCase())
            })
        }
    },
}
</script>

<style scoped>
.button-toggle {
    padding: 11px 20px;
    border-radius: 60px;
    color: white;
    text-align: center;
    margin: 1rem 0;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
}

.active {
    background: #F22539;
}

.inactive {
    background: #BFBFBF;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    padding: 0 2rem;
}

.button__inner-icon {
    margin: 0 10px 0 0;
}

.list__container {
    list-style-type: none;
}

.pokemon-not-found-container {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;

    span {
        width: 100%;
    }
}

.search-bar {
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border-radius: 5px;
    border: none;
    width: 100%;
    margin: 0 0 2.5rem 0;
    padding: 0 0 0 3rem;
    font-weight: bold;
    color: #353535;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 16px;
}

.search-bar:focus-visible {
    outline: none;
}

.search-bar::placeholder {
    font-weight: bold;
    opacity: 0.5;
    color: #BFBFBF;
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-size: 16px;
}

.search-bar-container {
    position: relative;
}

.search-icon {
    position: absolute;
    top: calc(25px - 9px);
    margin: 0 1rem;
}
</style>