<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import SearchInput from '@/components/search/search-input.vue'
import DropdownInput from '@/components/dropdown/dropdown-input.vue'
import SatelliteWrapper from './components/satellite/satellite-wrapper.vue'
import LoaderComponent from '@/components/loader/loader-component.vue'
import NoData from '@/components/no-data/no-data.vue'
import PaginationComponent from '@/components/pagination/pagination-component.vue'
import { fetchSatellites } from '@/queries/fetch-satellites'
import type { Satellite } from '@/types/satellite'
import {
  countryCodeOptions,
  orbitRegimeOptions,
  objectTypeOptions
} from '@/utils/get-filter-options'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/App.vue')
    }
  ]
})

const satellitesRenderData = ref<Satellite[]>([])
const searchString = ref('')
const currentPage = ref(1)
const countryCodeFilter = ref('')
const orbitRegimeFilter = ref('')
const objectTypeFilter = ref('')
const loading = ref(false)

const uri = window.location.search
const params = new URLSearchParams(uri)

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (satellitesRenderData.value.length !== 0 && satellitesRenderData.value.length >= 10) {
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
  countryCodeFilter.value = params.get('countryCode') || ''
  orbitRegimeFilter.value = params.get('orbitRegime') || ''
  objectTypeFilter.value = params.get('objectType') || ''
  lazyLoadData()
})

watch(currentPage, () => {
  lazyLoadData()
})

watch([searchString, countryCodeFilter, orbitRegimeFilter, objectTypeFilter], () => {
  setPage(1)
  router.push({
    query: {
      countryCode: countryCodeFilter.value,
      orbitRegime: orbitRegimeFilter.value,
      objectType: objectTypeFilter.value
    }
  })
  lazyLoadData()
})
</script>

<template>
  <div class="w-[50%] mx-auto flex flex-col gap-2 my-12">
    <SearchInput placeholder="Search Satellites" v-model="searchString" />
    <div class="flex justify-between gap-2">
      <DropdownInput
        v-model="countryCodeFilter"
        :filterOptions="countryCodeOptions"
        name="countryCode"
        defaultValue="Select Country Code"
      />
      <DropdownInput
        v-model="orbitRegimeFilter"
        :filterOptions="orbitRegimeOptions"
        name="orbitRegime"
        defaultValue="Select Orbit Regime"
      />
      <DropdownInput
        v-model="objectTypeFilter"
        :filterOptions="objectTypeOptions"
        name="objectType"
        defaultValue="Select Object Type"
      />
    </div>
    <NoData v-if="satellitesRenderData.length === 0 && !loading" />
    <LoaderComponent v-if="loading" />
    <SatelliteWrapper v-else :satellites="satellitesRenderData" />
    <PaginationComponent
      :currentPage="currentPage"
      :loading="loading"
      :prevPage="prevPage"
      :nextPage="nextPage"
    />
  </div>
</template>

<style>
body {
  background-color: #000000;
  color: #ffffff;
}
</style>
