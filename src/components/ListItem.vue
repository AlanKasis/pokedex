<template>
    <ul class="item lato-md-title dark-grey" @click="open()">
        <span>{{ capitalize(pokemon.name) }}</span>
        <div class="favbutton-container">
            <FavButton :pokemon="pokemon" />
        </div>
    </ul>
</template>

<script>
import { useModal } from 'vue-final-modal'
import ItemDetailsModal from './ItemDetailsModal.vue';
import FavButton from './FavButton.vue';

export default {
    props: ['pokemon'],
    components: {
        FavButton
    },
    methods: {
        capitalize(name) {
            const capitalizedFirst = name[0].toUpperCase();
            const rest = name.slice(1);
            return capitalizedFirst + rest;
        },
        open() {
            const modal = useModal({
                component: ItemDetailsModal,
                attrs: {
                    url: this.pokemon.url,
                },
            });
            modal.open();
        },
    }
}
</script>

<style scoped>
.favbutton-container {
    margin: 0 0.5rem;
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
    border-radius: 5px;
    width: 100%;
    height: 60px;
    padding: 0 0 0 20px;
    margin: 10px 0;
    cursor: pointer;
}
</style>