<script setup>
    import { defineProps } from 'vue'

    const props = defineProps(['stat'])
</script>

<template>
    <div class="stat">
        <p>
            <strong>{{ props.stat.name }}</strong>
            <span class="right">{{ props.stat.stat }}</span>
        </p>
        <div class="progress">
            <div class="determinate" :style="{ width: props.stat.stat + '%'}"></div>
        </div>
    </div>
</template>

<style scoped>
    .stat p { margin-bottom: 0; }
    .stat strong { text-transform: capitalize; }
</style>
