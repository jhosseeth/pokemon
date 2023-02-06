<script setup>
    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import pokeApi from '@/services/PokeAPI'
    import StatBar from '@/components/StatBar.vue'

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
    <div class="detail white-text container row">
        <header class="col s10 offset-s1">
            <img :src="pokemon.img">
            <h3>{{ pokemon.name }}</h3>

            <button v-if="!isFavorite" class="btn blue darken-3 waves-effect waves-light" @click="addToFavorites">
                <i class="material-icons left">favorite</i>
                Add to favorites
            </button>

            <button v-else class="btn blue darken-3 waves-effect waves-light" @click="removeFromFavorites">
                <i class="material-icons left">favorite_border</i>
                Remove from favorites
            </button>
        </header>

        <main class="col s10 offset-s1">
            <dl class="col s6">
                <dt>Height</dt>
                <dd>{{ pokemon.height }}</dd>

                <dt>Type</dt>
                <dd v-for="type in pokemon.type">{{ type }}</dd>
            </dl>

            <dl class="col s6">
                <dt>Weight</dt>
                <dd>{{ pokemon.weight }}</dd>

                <dt>Abilities</dt>
                <dd v-for="ability in pokemon.abilities">{{ ability }}</dd>
            </dl>

            <h5 class="col s12">Stats</h5>
            <StatBar class="col s12" v-for="stat in pokemon.stats" :stat="stat"/>
        </main>

    </div>
</template>

<style scoped>
    .detail {
        margin-top: 5vh;
    }

    .detail header {
        display: grid;
        grid-template-columns: 100px 1fr 1fr;
        align-items: end;
    }

    .detail header h3 {
        text-transform: capitalize;
    }

    .detail header button {
        justify-self: end;
        margin-bottom: 25px;
        text-transform: none;
    }

    .detail main {
        margin-top: 3vh;
    }

    .detail dl dt {
        margin-top: 2vh;
        font-weight: bold;
    }

    .detail main h5 {
        margin-top: 5vh !important;
    }
</style>
