<script setup>
    import { ref, onMounted, defineProps } from 'vue'
    import { useRouter } from 'vue-router'

    const props = defineProps(['pokemon'])
    const router = useRouter()
    const favorites = localStorage.getItem('favorites').split(',')
    const isFavorite = ref(favorites.includes(props.pokemon.name))

    const onClick = () => router.push(`pokemon/${props.pokemon.name}`)
</script>

<template>
    <div :id="props.pokemon.id" class="col s3" @click="onClick">
        <div class="pokemon white-text">
            <i v-if="isFavorite" class="material-icons red-text text-darken-2">favorite</i>
                
            <div class="detail">
                <img :src="props.pokemon.img">
                <h6>{{ props.pokemon.name }}</h6>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .test {
        border: 1px solid gray;
    }

    .pokemon {
        margin-bottom: 2vh;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    .pokemon:hover {
        background-color: rgba(255, 255, 255, 0.03);
        background: radial-gradient(circle, rgba(255,242,123,0.2) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%);
    }

    .pokemon i {
        position: relative;
        top: 1rem;
        right: 4.5vw;
        float: right;
    }

    .detail {
        cursor: pointer;
        color: white;
        display: grid;
        justify-content: center;
    }

    .detail h6 {
        text-align: center;
        text-transform: capitalize;
        margin: 0;
    }
</style>
