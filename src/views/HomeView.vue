<script setup>
    import { ref, onMounted } from 'vue'
    import pokeApi from '../services/PokeAPI'
    import Search from '../components/Search.vue'

    const scrolls = []
    const pokemons = ref([])
    const content = ref()
    const loading = ref(false)
    const allowScroll = ref(true)

    const loadMore = async ({ target }) => {
        if (!allowScroll.value) return

        const scrollHeight = target.scrollHeight
        const scrollSum = target.scrollTop + target.clientHeight

        if (!scrolls.includes(scrollSum) && scrollSum >= scrollHeight) {
            scrolls.push(scrollSum) // To prevent repeat event
            const next = pokeApi.nextPokemons
            const results = await pokeApi.getPokemons(next)
            pokemons.value = [...pokemons.value, ...results]
        }
    }

    const updatePokemons = data => {
        allowScroll.value = !data.isSearchResult
        pokemons.value = data.pokemons
    }

    onMounted(async () => {
        pokemons.value = await pokeApi.getPokemons()
    })
</script>

<template>
    <main ref="content" @scroll="loadMore">
        <Search @updatePokemons="updatePokemons"/>

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

