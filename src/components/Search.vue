<script setup>
    import { ref, onMounted } from 'vue'
    import pokeApi from '../services/PokeAPI'

    const search = ref()
    const names = ref()

    const onSearch = async () => {
        const searchValue = search.value.value
        const filteredNames = names.value.filter(name => name.includes(searchValue))
        const pokemons = await pokeApi.searchPokemons(filteredNames)
        console.log('pokemons: ', pokemons)
    }

    const getAutocompleteOptions = () => {
        const data = names.value.reduce((accumulator, value) => {
            return {...accumulator, [value]: null};
        }, {})

        return { data }
    }

    const setupAutocomplete = () => {
        const elem = search.value
        const optionsData = getAutocompleteOptions()
        M.Autocomplete.init(elem, optionsData)
    }

    onMounted(async () => {
        names.value = await pokeApi.getPokemonNames()
        setupAutocomplete()
    })
</script>

<template>
    <div class="search row">
        <form class="col s8 offset-s2" @submit.prevent="onSearch">
            <div class="input-field col s10">
                <input id="search" class="autocomplete" type="text" ref="search">
                <label for="autocomplete-input">Search</label>
            </div>
            <div class="col s2">
                <button class="btn waves-effect waves-light">Search</button>
            </div>
        </form>
    </div>
</template>
