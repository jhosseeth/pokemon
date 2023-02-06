<script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter, RouterLink } from 'vue-router'

    const tabs = ref()
    const router = useRouter()

    function logout() {
        localStorage.setItem('isLogged', false)
        dispatchEvent(new CustomEvent('localStorageChanged'))
    }

    onMounted(async () => {
        M.Tabs.init(tabs.value)
    })
</script>

<template>
    <nav>
        <div class="nav-content">
            <ul class="tabs tabs-transparent right" ref="tabs">
                <li class="tab">
                    <RouterLink to="/home">Home</RouterLink>
                </li>
                <li class="tab">
                    <RouterLink to="/favorites">Favorites</RouterLink>
                </li>
                <li>
                    <a href="#" class="btn" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>

</template>

<style scoped>
    nav {
        height: 48px;
        line-height: 48px;
    }

    .tabs {
        width: auto !important;
    }

    .tabs .tab,
    .tabs .btn {
        text-transform: none;
    }
</style>
