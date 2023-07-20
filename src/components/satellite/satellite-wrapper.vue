<script setup lang="ts">
import SatelliteTile from './satellite-tile.vue'
import type { Satellite } from '@/types/satellite'

defineProps({
  satellites: {
    type: Array as () => Satellite[],
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 w-full mx-auto gap-6">
    <div v-for="satellite in satellites" :key="satellite.noradCatId">
      <SatelliteTile :satellite="satellite" />
    </div>
  </div>
  <hr v-if="satellites.length !== 0" class="h-[0.5px]" />
</template>
