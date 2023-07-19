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
  <div :class="`${satellites.length !== 0 && 'border-b'} border-white`">
    <div v-for="satellite in satellites" :key="satellite.noradCatId">
      <SatelliteTile :satellite="satellite" />
    </div>
  </div>
</template>
