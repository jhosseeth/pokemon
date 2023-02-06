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
    <div :id="props.pokemon.id" class="" @click="onClick">
        <div class="pokemon">
            <i v-if="isFavorite" class="material-icons right red-text text-darken-2">favorite</i> 
            <div class="image" :style="{ 'background-image': `url(${props.pokemon.img})` }"></div>
            <h6>{{ props.pokemon.name }}</h6>
        </div>
    </div>
</template>

<style scoped>
    .test {
        border: 1px solid gray;
    }

    .pokemon {
        padding: 2vw 3vw;
        transition: padding .3s;
    }

    .pokemon:hover {
        padding: 2vw 1vw;
        background-color: rgba(255, 255, 255, 0.03);
        background: radial-gradient(circle, rgba(255,242,123,0.2) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%);
    }

    .pokemon .image {
        height: calc(70vw / 4);
        color: white;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }

    .pokemon h6 {
        color: white;
        text-align: center;
        text-transform: capitalize;
    }
</style>
