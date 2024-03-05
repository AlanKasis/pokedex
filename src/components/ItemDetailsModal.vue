<template>
    <VueFinalModal class="modal-container" contentClass="modal-container">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="pokemon" class="details-content">
            <img src="/details_background.png" class="background-image" />
            <CloseIcon class="close-icon" @click="(() => vfm.close())" />
            <img v-bind:src="pokemon.sprites.front_default" class="sprite-image" />
            <ul class="attributes-list">
                <li class="lato-md"><span class="bold light-grey">Name:</span> {{ capitalize(pokemon.name) }}</li>
                <hr class="separator">
                <li class="lato-md"><span class="bold light-grey">Weight:</span> {{ pokemon.weight }}</li>
                <hr class="separator">
                <li class="lato-md"><span class="bold light-grey">Height:</span> {{ pokemon.height }}</li>
                <hr class="separator">
                <li>
                    <span class="lato-md bold light-grey">Type: </span>
                    <template v-for="(type, index) in pokemon.types" v-bind:key="type">
                        <span class="lato-md">{{ capitalize(type.type.name) }} </span>
                        <span v-if="index != pokemon.types.length - 1">, </span>
                    </template>
                </li>
                <hr class="separator">
                <div class="details-footer">
                    <UseClipboard v-slot="{ copy, copied }" :source="JSON.stringify(pokemonCopyObj)">
                        <button @click="copy()" class="button-share lato-md bold">
                            {{ copied ? 'Copied!' : 'Share with friends' }}
                        </button>
                    </UseClipboard>
                    <FavButton :pokemon="pokemonFavObj" />
                </div>
            </ul>
        </div>
    </VueFinalModal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import FavButton from './FavButton.vue'
import CloseIcon from './icons/CloseIcon.vue'
import { useVfm } from 'vue-final-modal'
import { UseClipboard } from '@vueuse/components'

export default {
    data() {
        return {
            pokemon: null,
            loading: false,
            error: null,
            styleObject: {
                background: 'red',
                fontSize: '13px'
            },
            pokemonFavObj: null,
            pokemonCopyObj: null,
            vfm: useVfm(),
        }
    },
    components: {
        VueFinalModal,
        FavButton,
        CloseIcon,
        UseClipboard
    },
    props: ['url'],
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params,
            () => {
                this.fetchDetailsData()
            },
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        capitalize(name) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);
            return capitalizedFirst + rest;
        },
        fetchDetailsData() {
            this.error = this.pokemon = null
            this.loading = true

            fetch(this.url, {
                method: "GET",
            })
                .then((response) => {
                    response.json().then((data) => {
                        this.pokemon = data;
                        this.loading = false;
                        this.pokemonFavObj = { name: this.pokemon.name, url: this.url };
                        this.pokemonCopyObj = {
                            name: this.pokemon.name,
                            weight: this.pokemon.weight,
                            height: this.pokemon.height,
                            type: this.pokemon.types
                        }
                    });
                })
                .catch((err) => {
                    this.error = err.toString()
                });
        },
    }
}

</script>

<style>
.attributes-list {
    list-style-type: none;
    padding: 0 2rem;
    margin: 1rem 0 0 0;
}

.background-image {
    transform: translate(-50%);
}

.button-share {
    padding: 11px 20px;
    border-radius: 60px;
    color: white;
    background-color: #F22539;
    text-align: center;
    margin: 1rem 0;
    width: 195px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
}

.close-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
}

.details-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.separator {
    border-top: 1px solid #e8e8e8;
    display: block;
    height: 1px;
    margin: 0.5rem 0;
}

.sprite-image {
    position: absolute;
    width: 180px;
    transform: translate(-50%, -50%);
    top: 25%;
    left: 50%;
}

.details-content {
    width: 315px;
    background: #FFFFFF;
    overflow-x: hidden;
    position: relative;
}

.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>