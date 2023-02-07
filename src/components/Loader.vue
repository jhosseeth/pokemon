<script setup>
</script>

<template>
    <div class="curtain">
        <div class="pokemon"></div>
        <p>Loading...</p>
    </div>
</template>

<style scoped>
    .curtain {
        position: absolute;
        top: 0;
        height: 100vh;
        width: 100vw;
        z-index: 100;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .curtain p {
        color: white;
        position: absolute;
        bottom: 30vh;
        font-family: 'Cairo Play';
        font-size: 2rem;
    }

    .pokemon {
        position: relative;
        height: 115px;
        width: 115px;
        background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50% );
        border-radius: 50%;
        border: 8px solid black;
        animation: spin 1s linear infinite;
    }

    .pokemon::before {
        content: '';
        position: absolute;
        height: 8px;
        width: 100px;
        background: black;
        top: 50px;
        transform: translatey(-50%);
    }

    .pokemon::after {
        content: '';
        position: absolute;
        height: 38px;
        width: 38px;
        border-radius: 50%;
        background: white;
        top: 50px;
        left: 50px;
        transform: translate(-50%, -50%);
        box-shadow: inset 0 0 0 8px black, inset 0 0 0 10px white, inset 0 0 0 12px black;
    }

    /* Spin Animation */
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>