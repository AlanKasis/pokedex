<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <img alt="Pikachu" class="logo" src="/pikachu_home.png" />

  <h1 class="lato-lg text-center dark-grey">Welcome to Pokédex</h1>
  <p class="lato-md text-center description light-grey">
    The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
  </p>
  <nav>
    <RouterLink class="button-primary lato-md bold" to="/list">Get started</RouterLink>
  </nav>
</template>

<style scoped>

.description {
  margin: 2rem 0;

  @media (min-width: 1024px) {
    max-width: 570px;
  }
}

.logo {
  display: block;
  width: 100%;
  max-width: 325px;
  margin: 3rem auto;

  @media (min-width: 1024px) {
    margin: auto;
  }
}

nav {
  display: flex;
  width: 100%;
  justify-content: center;
}

@media (min-width: 1024px) {}
</style>
