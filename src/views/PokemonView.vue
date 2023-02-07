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
        <aside class="col s4">
            <img :src="pokemon.img">
        </aside>

        <section class="col s7 offset-s1">
            <header>
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

            <main>
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
        </section>
    </div>
</template>

<style scoped>
    .detail {
        margin-top: 5vh;
        font-family: 'Cairo Play';
    }

    .detail aside img {
        display: block;
        margin: 12vh auto 0;
        width: 90%;
    }

    .detail header {
        display: flex;
        justify-content: space-between;
    }

    .detail header h3 {
        margin: 0;
        text-transform: capitalize;
    }

    .detail header button {
        align-self: end;
        margin-bottom: .3rem;
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
