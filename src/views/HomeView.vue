<script setup>
    import { ref, computed, onMounted } from 'vue'
    import pokeApi from '../services/PokeAPI'

    const pokemons = ref([])
    const loading = ref(false)
    const content = ref()

    const loadMore = async ({ target }) => {
        const scrollHeight = target.scrollHeight
        const scrollTop = target.scrollTop
        const clientHeight = target.clientHeight

        if (scrollTop + clientHeight >= scrollHeight) {
            const next = pokeApi.nextPokemons
            const results = await pokeApi.getPokemons(next)
            pokemons.value = [...pokemons.value, ...results]
        }
    }

    onMounted(async () => {
        pokemons.value = await pokeApi.getPokemons()
    })
</script>

<template>
    <main ref="content" @scroll="loadMore">
        <ul>
            <li v-for="pokemon in pokemons">
                <img :src="pokemon.img">
                {{ pokemon.name }}
            </li>
        </ul>
        <p v-if="loading">Loading...</p>
    </main>
</template>

<style scoped>
    main {
        max-height: 90vh;
        overflow: auto;
    }
</style>

