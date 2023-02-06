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
            <a href="#" class="brand-logo left">
                <img src="@/assets/logo.png">
            </a>
            <ul class="tabs tabs-transparent right" ref="tabs">
                <li class="tab">
                    <RouterLink to="/home">Home</RouterLink>
                </li>
                <li class="tab">
                    <RouterLink to="/favorites">Favorites</RouterLink>
                </li>
                <li>
                    <a href="#" class="btn blue darken-3 waves-effect waves-light" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>

</template>

<style scoped>
    nav {
        height: 48px;
        line-height: 48px;
        background-color: transparent;
    }

    .brand-logo img {
        margin: 10px 3vw;
        max-height: 5rem;
    }

    .tabs {
        width: auto !important;
        margin-right: 3vw;
    }

    .tabs .tab,
    .tabs .btn {
        text-transform: none;
    }

    .tabs .tab a:focus, .tabs .tab a:focus.active {
    background-color: rgba(255, 255, 255, 0.11);
    outline: none;
}
</style>
