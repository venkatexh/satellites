<script setup lang="ts">
defineProps({
  title: String,
  text: String
})
</script>

<template>
  <div class="my-3">
    <div class="text-xs">{{ title }}</div>
    <div class="text-md lg:text-sm font-medium">{{ text }}</div>
  </div>
</template>
