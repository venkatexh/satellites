<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <input
    :value="modelValue"
    type="text"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="border border-white bg-black rounded-md h-8 px-2"
  />
</template>
