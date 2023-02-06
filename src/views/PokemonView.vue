<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import pokeApi from '../services/PokeAPI'

    const route = useRoute()
    const pokemon = ref({})
    const { name } = route.params

    onMounted(async () => {
        pokemon.value = await pokeApi.getPokemonDetails(name)
    })
</script>

<template>
    <div class="detail">
        <h1>{{ pokemon.name }}</h1>
        <img :src="pokemon.sprites?.front_default">
    </div>
</template>

<style>
</style>
