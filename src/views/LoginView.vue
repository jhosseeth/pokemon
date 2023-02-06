<script setup>
    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const passwordError = ref('')
    const passwordClass = ref('')

    function login() {
        if (password.value.length < 6) {
            passwordError.value = "Must be at least 6 characters"
            passwordClass.value = 'invalid'
            return
        }

        localStorage.setItem('isLogged', true)
        dispatchEvent(new CustomEvent('localStorageChanged'))
    }
</script>

<template>
    <div class="login row">
        <form class="col s6 offset-s3" @submit.prevent="login">
            <img src="../assets/logo.png">
            <div class="input-field col s12">
                <input id="email" type="email" class="validate white-text" v-model="email" required>
                <label for="email">Email</label>
                <span class="helper-text" data-error="Invalid email"></span>
            </div>
            <div class="input-field col s12">
                <input id="password" type="password" class="validate white-text" :class="passwordClass" v-model="password" required>
                <label for="password">Password</label>
                <span class="helper-text" :data-error=[passwordError] ></span>
            </div>
            <div class="input-field col s12">
                <button class="btn btn-login blue darken-3 waves-effect waves-light" type="submit">
                    <i class="material-icons left">login</i>
                    Login
                </button>
            </div>
        </form>
    </div>
</template>

<style>
    .login {
        margin-top: 20px;
    }

    .login img {
        max-height: 12vh;
        display: block;
        margin: 5vh auto;
    }

    .btn-login {
        text-transform: none;
    }
</style>
