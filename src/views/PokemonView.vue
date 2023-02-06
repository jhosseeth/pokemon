<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import pokeApi from '../services/PokeAPI'

    const route = useRoute()
    const pokemon = ref({})
    const favorites = ref([])
    const { name } = route.params

    const isFavorite = computed(() => favorites.value.includes(name))

    const updateFavorites = () => {
        const favoritesStr = localStorage.getItem('favorites')
        favorites.value = favoritesStr.split(',').filter(n => n)
    }

    const addToFavorites = () => {
        localStorage.setItem('favorites', [...favorites.value, name])
        updateFavorites()
    }

    const removeFromFavorites = () => {
        const updatedFavorites = favorites.value.filter(favorite => favorite !== name)
        localStorage.setItem('favorites', updatedFavorites)
        updateFavorites()
    }

    onMounted(async () => {
        updateFavorites()
        pokemon.value = await pokeApi.getPokemonDetails(name)
    })
</script>

<template>
    <div class="detail">
        <h1>{{ pokemon.name }}</h1>
        <img :src="pokemon.sprites?.front_default">
        isFavorite: {{ isFavorite }} <br>

        <button v-if="!isFavorite" class="btn" @click="addToFavorites">
            <i class="material-icons left">favorite</i>
            Add to favorites
        </button>

        <button v-else class="btn" @click="removeFromFavorites">
            <i class="material-icons left">favorite_border</i>
            Remove from favorites
        </button>
    </div>
</template>

<style>
</style>
