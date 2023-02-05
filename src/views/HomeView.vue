<script setup>
    import { ref, computed, onMounted } from 'vue'
    import pokeApi from '../services/PokeAPI'

    const pokemons = ref([])

    onMounted(async () => {
        pokemons.value = await pokeApi.getPokemons()
        console.log('nextPokemons: ', pokeApi.nextPokemons)
    })
</script>

<template>
    <main>
        <ul>
            <li v-for="pokemon in pokemons">
                <img :src="pokemon.img">
                {{ pokemon.name }}
            </li>
        </ul>
    </main>
</template>
