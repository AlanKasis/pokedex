import { defineStore } from 'pinia'

const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),
  getters: {
    getFavorites(state) {
      return state.favorites
    }
  },
  actions: {
    addFavorite(pokemon) {
      if (this.favorites.some(item => item.name == pokemon.name)) {
        console.log("Entrando arriba")
        this.favorites.splice(this.favorites.indexOf(pokemon), 1)
      } else {
        console.log("Entrando abajo")
        this.favorites.push(pokemon)
      }
      console.log(this.favorites)
    }
  }
})

export default useFavoritesStore
