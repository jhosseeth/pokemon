<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter, RouterView } from 'vue-router'
    import NavBar from './components/NavBar.vue'

    if (!localStorage.getItem('isLogged')) localStorage.setItem('isLogged', false)

    const router = useRouter()

    const isLogged = ref(localStorage.getItem('isLogged') === 'true')
    if (!isLogged.value) router.push('login')

    onMounted(() => {
        addEventListener('localStorageChanged', () => {
            isLogged.value = localStorage.getItem('isLogged') === 'true'
            if (isLogged.value)
                router.push('home')
            else
                router.push('login')
        })
    })
</script>

<template>
    <NavBar v-if="isLogged"/>
    <RouterView />
</template>

<style scoped>
</style>
