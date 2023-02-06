<script setup>
    import { ref, onMounted } from 'vue'
    import pokeApi from '@/services/PokeAPI'
    import Search from '@/components/Search.vue'
    import PokemonCard from '@/components/PokemonCard.vue'

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
    <Search @updatePokemons="updatePokemons"/>
            
    <main ref="content" @scroll="loadMore">
        <div class="container row">
            <PokemonCard v-for="pokemon in pokemons" :pokemon="pokemon"/>
        </div>
        
        <p v-if="loading">Loading...</p>
    </main>
</template>

<style scoped>
    main {
        max-height: calc(100vh - (14rem + 8px + 48px));
        overflow: auto;
    }
</style>

