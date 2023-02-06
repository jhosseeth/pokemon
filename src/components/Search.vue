<script setup>
    import { ref, computed, onMounted, defineEmits } from 'vue'
    import pokeApi from '../services/PokeAPI'

    const search = ref()
    const searchInput = ref()
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
    <div class="search container row">
        <form class="col s8 offset-s2" @submit.prevent="onSearch">
            <div class="input-field col s8">
                <button type="reset" class="btn-reset btn-floating btn-small red darken-2" @click="onReset">
                    <i class="material-icons">close</i>
                </button>
                <input id="search" class="autocomplete" type="text" ref="search" autocomplete="off">
                <label for="autocomplete-input">Search</label>
            </div>
            <div class="col s4 btn-col">
                <button class="btn btn-search" type="submit">
                    <i class="material-icons left">search</i>
                    Search
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
    .search {
        margin: 5vh auto;
    }
    .btn-reset {
        width: 1.8rem !important;
        height: 1.8rem !important;
        position: absolute;
        top: 0.6rem;
        right: 1rem;
    }

    .btn-reset i {
        line-height: 26px !important;
    }

    .btn-col {
        height: 5.5rem;
        display: flex;
        align-items: center;
    }

    .btn-search {
        text-transform: none;
        padding-left: 12px;
    }

    .btn-search i {
        margin-right: 5px;
    }
</style>
