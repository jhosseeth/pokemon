<script setup>
    import { ref, onMounted, defineProps } from 'vue'
    import { useRouter } from 'vue-router'

    const props = defineProps(['pokemon'])
    const router = useRouter()

    const onClick = () => router.push(`pokemon/${props.pokemon.name}`)
</script>

<template>
    <div :id="props.pokemon.id" class="col s3 pokemon" @click="onClick">
        <div class="card">
            <img :src="props.pokemon.img">
            <p>{{ props.pokemon.name }}</p>
        </div>
    </div>
</template>

<style scoped>
    .pokemon {
        padding: 5px;
    }

    .card {
        cursor: pointer;
    }
</style>
