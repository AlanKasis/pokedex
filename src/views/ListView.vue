<template>
    <div class="post">
        <div v-if="loading" class="loading">
            <PokeballLoader />
        </div>

        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="list" class="content">
            <div class="search-bar-container">
                <SearchIcon class="search-icon" />
                <input v-model="input" ref="input" name="" id="" class="search-bar" placeholder="Search">
            </div>
            <li v-for="pokemon in filteredList()" v-bind:key="pokemon.name" class="list__container">
                <ListItem :pokemon=pokemon :id="pokemon.id" />
            </li>
            <div class="footer">
                <div class="footer-buttons-container">
                    <button @click="toggleFavoritesOff" class="button-toggle lato-md bold"
                        v-bind:class="{ 'inactive': isFavoritesOn, 'active': !isFavoritesOn }">
                        <ListIcon class="button__inner-icon" />
                        All
                    </button>
                    <button @click="toggleFavoritesOn" class="button-toggle lato-md bold"
                        v-bind:class="{ 'inactive': !isFavoritesOn, 'active': isFavoritesOn }">
                        <StarIcon class="button__inner-icon" />
                        Favorites
                    </button>
                </div>
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
import { mapStores, mapState, mapActions } from 'pinia';
import useFavoritesStore from '@/stores/favorite.js'
import PokeballLoader from '@/components/PokeballLoader.vue';


export default {
    data() {
        return {
            loading: true,
            list: null,
            error: null,
            input: "",
            isFavoritesOn: false,
        }
    },
    components: {
    ListItem,
    SearchIcon,
    ListIcon,
    StarIcon,
    PokeballLoader
},
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                setTimeout(() => this.fetchData(), 3000)
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    computed: {
        // gives access to this.favoritesStore
        ...mapStores(useFavoritesStore),
        // gives read access to this.favorites
        ...mapState(useFavoritesStore, ['favorites']),
        selectedList() {
            return this.isFavoritesOn ? this.favorites : this.list
        }
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
        filteredList() {
            return this.selectedList.filter((pokemon) => {
                return pokemon.name.includes(this.input.toLowerCase())
            })
        },
        toggleFavoritesOn() { this.isFavoritesOn = true },
        toggleFavoritesOff() { this.isFavoritesOn = false },
        ...mapActions(useFavoritesStore, ['addFavorite']),
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

    @media (min-width: 1024px) {
        width: 275px;
    }
}

.content {
    margin: 0 0 80px 0;

    @media (min-width: 1024px) {
        min-height: calc(100vh - 80px);
        margin: 0 0 80px 0;
    }
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
    justify-content: center;
    background: #FFFFFF;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
}

.footer-buttons-container {
    height: 80px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    
    @media (min-width: 1024px) {
        max-width: 570px;
        padding: 0;
    }
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

    @media (min-width: 1024px) {
        width: 570px;
    }
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

    @media (min-width: 1024px) {
        margin: auto;
    }
}

.search-icon {
    position: absolute;
    top: calc(25px - 9px);
    margin: 0 1rem;
}
</style>