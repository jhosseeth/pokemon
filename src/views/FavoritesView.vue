<script setup>
    import { ref, onMounted } from 'vue'
    import pokeApi from '@/services/PokeAPI'
    import PokemonCard from '@/components/PokemonCard.vue'

    const pokemons = ref([])
    const favorites = localStorage.getItem('favorites').split(',')
    
    onMounted(async () => {
        pokemons.value = await pokeApi.searchPokemons(favorites)
    })
</script>

<template>
    <main class="container white-text">
        <h3>Favorites pokemons</h3>
        <div class="row">
            <PokemonCard v-for="pokemon in pokemons" :pokemon="pokemon"/>
        </div>
    </main>
</template>

<style scoped>
    .container h3 {
        text-align: center;
        margin-top: 5vh;
        margin-bottom: 3vh;
    }
</style>
