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
        <div class="container grid">
            <PokemonCard v-for="pokemon in pokemons" :pokemon="pokemon"/>
        </div>
        
        <p v-if="loading">Loading...</p>
    </main>
</template>

<style scoped>
    main {
        margin: 0 auto;
        overflow: auto;
        max-width: 95vw;
        max-height: calc(100vh - (14rem + 8px + 48px));
        scrollbar-color: #FFCE00 transparent;
        scrollbar-width: thin;
    }

    main::-webkit-scrollbar {
        width: 6px;
        background-color: transparent;
    }
     
    main::-webkit-scrollbar-track {
        /*box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);*/
        /*background-color: transparent;*/
    }
     
    main::-webkit-scrollbar-thumb {
        background-color: #FFCE00;
        border-radius: 3px;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>

