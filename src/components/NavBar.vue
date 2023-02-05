<script setup>
    import { useRouter, RouterLink } from 'vue-router'

    const router = useRouter()

    function logout() {
        localStorage.setItem('isLogged', false)
        dispatchEvent(new CustomEvent('localStorageChanged'))
    }
</script>

<template>
    <header>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/favorites">Favorites</RouterLink>
        <a href="#" @click="logout">Logout</a>
    </header>
</template>

<style scoped>
</style>
