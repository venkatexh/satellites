<script setup lang="ts">
import satellitesData from './satellites.json'
import SatelliteTile from '@/components/satellite/satellite-tile.vue'
import { fetchSatellites } from '@/queries/fetch-satellites'
import type { Satellite } from '@/types/satellite'
import { onMounted, ref, watch } from 'vue'

const satellitesRenderData = ref<Satellite[]>([])
const searchString = ref('')
const currentPage = ref(1)
const countryCodeFilter = ref('')
const orbitRegimeFilter = ref('')
const objectTypeFilter = ref('')
const loading = ref(false)

const countryCodeOptions = [
  ...new Set(satellitesData.filter((obj) => obj !== null).map((obj) => obj.countryCode))
]

const orbitRegimeOptions = [
  ...new Set(satellitesData.filter((obj) => obj !== null).map((obj) => obj.orbitCode))
]

const orbitTypeOptions = [
  ...new Set(satellitesData.filter((obj) => obj !== null).map((obj) => obj.objectType))
]

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  console.log(satellitesRenderData.value.length / 10)
  if (satellitesRenderData.value.length !== 0) {
    currentPage.value++
  }
}

const setPage = (page: number) => {
  if (currentPage.value !== 1) currentPage.value = page
}

const lazyLoadData = async () => {
  loading.value = true
  const data = await fetchSatellites(
    searchString.value,
    countryCodeFilter.value,
    orbitRegimeFilter.value,
    objectTypeFilter.value,
    currentPage.value
  )
  satellitesRenderData.value = data
  loading.value = false
}

onMounted(() => {
  lazyLoadData()
})

watch(currentPage, () => {
  lazyLoadData()
})

watch([searchString, countryCodeFilter, orbitRegimeFilter, objectTypeFilter], () => {
  setPage(1)
  lazyLoadData()
})
</script>

<template>
  <Header />
  <div class="w-[50%] mx-auto flex flex-col gap-2 my-12">
    <input
      v-model="searchString"
      type="text"
      placeholder="Search by name or Norad Cat Id"
      class="border border-white bg-black rounded-md h-8 px-2"
    />
    <div class="flex justify-between gap-2">
      <select
        v-model="countryCodeFilter"
        name="countryCode"
        class="bg-black w-1/3 text-white border border-white rounded-md h-8"
      >
        <option value="">Select Country Code</option>
        <option v-for="(countryCode, idx) in countryCodeOptions" :key="idx" :value="countryCode">
          {{ countryCode }}
        </option>
      </select>
      <select
        v-model="orbitRegimeFilter"
        class="bg-black w-1/3 text-white border border-white rounded-md h-8"
      >
        <option value="">Select Orbit Regime</option>
        <option v-for="(orbitRegime, idx) in orbitRegimeOptions" :key="idx" :value="orbitRegime">
          {{ orbitRegime }}
        </option>
      </select>
      <select
        v-model="objectTypeFilter"
        class="bg-black w-1/3 text-white border border-white rounded-md h-8"
      >
        <option value="">Select Object Type</option>
        <option v-for="(orbitType, idx) in orbitTypeOptions" :key="idx" :value="orbitType">
          {{ orbitType }}
        </option>
      </select>
    </div>
    <div
      v-if="!loading && satellitesRenderData.length === 0"
      class="text-center h-96 flex items-center justify-center"
    >
      No data found
    </div>
    <div v-if="loading" class="text-center h-96 flex items-center justify-center">Loading...</div>
    <div v-else :class="`${satellitesRenderData.length !== 0 && 'border-b'} border-white`">
      <div v-for="satellite in satellitesRenderData" :key="satellite.noradCatId">
        <SatelliteTile :satellite="satellite" />
      </div>
    </div>
    <div v-if="!loading" class="flex gap-2">
      <button @click="prevPage">&lt;</button>
      <div>{{ currentPage }}</div>
      <button @click="nextPage">&gt;</button>
    </div>
  </div>
</template>

<style>
body {
  background-color: #000000;
  color: #ffffff;
}
</style>
