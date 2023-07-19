<script setup lang="ts">
defineProps({
  defaultValue: {
    type: String,
    required: true
  },
  filterOptions: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <select
    :value="modelValue"
    :name="name"
    class="bg-black w-1/3 text-white border border-white rounded-md h-8"
  >
    <option value="">{{ defaultValue }}</option>
    <option v-for="(filter, idx) in filterOptions" :key="idx" :value="filter">
      {{ filter }}
    </option>
  </select>
</template>
