<script setup lang="ts">
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
  prevPage: {
    type: Function,
    required: true
  },
  nextPage: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div v-if="!loading" class="flex gap-2">
    <button @click="() => prevPage()">&lt;</button>
    <div>{{ currentPage }}</div>
    <button @click="() => nextPage()">&gt;</button>
  </div>
</template>
