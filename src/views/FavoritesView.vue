<script setup>
    import { ref, onMounted } from 'vue'
    import pokeApi from '../services/PokeAPI'
    import PokemonCard from '../components/PokemonCard.vue'

    const pokemons = ref([])
    const favorites = localStorage.getItem('favorites').split(',')
    
    onMounted(async () => {
        pokemons.value = await pokeApi.searchPokemons(favorites)
    })
</script>

<template>
    <div class="favorites">
        <h1>Favorites pokemons</h1>
        <div class="row">
            <PokemonCard v-for="pokemon in pokemons" :pokemon="pokemon"/>
        </div>
    </div>
</template>

<style>
</style>
