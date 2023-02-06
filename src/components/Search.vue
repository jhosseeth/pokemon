<script setup>
    import { ref, onMounted, defineEmits } from 'vue'
    import pokeApi from '../services/PokeAPI'

    const search = ref()
    const names = ref()
    const emit = defineEmits(['updatePokemons'])

    const onSearch = async () => {
        const searchValue = search.value.value
        const filteredNames = names.value.filter(name => name.includes(searchValue))
        const pokemons = await pokeApi.searchPokemons(filteredNames)

        emit('updatePokemons', {
            isSearchResult: true,
            pokemons
        })
    }

    const onReset = () => {
        emit('updatePokemons', {
            isSearchResult: false,
            pokemons: pokeApi.loadedPokemons
        })
    }

    /* -------------------------------------- *\
    *               AUTOCOMPLETE
    \* -------------------------------------- */
    const getAutocompleteOptions = () => {
        const data = names.value.reduce((accumulator, value) => {
            return { ...accumulator, [value]: null }
        }, {})

        return { data }
    }

    onMounted(async () => {
        // Save all pokemon names
        names.value = await pokeApi.getPokemonNames()

        const elem = search.value
        const optionsData = getAutocompleteOptions()

        // Init Materialize autocomplete dropdown 
        M.Autocomplete.init(elem, optionsData)
    })
</script>

<template>
    <div class="search row">
        <form class="col s8 offset-s2" @submit.prevent="onSearch">
            <div class="input-field col s10">
                <input id="search" class="autocomplete" type="text" ref="search" autocomplete="off">
                <label for="autocomplete-input">Search</label>
            </div>
            <div class="col s2">
                <input type="reset" value="reset" @click="onReset">
                <input type="submit" value="submit">
            </div>
        </form>
    </div>
</template>
