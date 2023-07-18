<script setup lang="ts">
import SatelliteText from './satellite-text.vue'
defineProps({
  satellite: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-5 items-center gap-12 my-6 p-1">
    <div>
      <img
        src="https://telecomtalk.info/wp-content/uploads/2023/03/will-satellite-internet-really-be-able-to.jpeg"
        :alt="satellite.name"
        class="rounded-lg"
      />
    </div>
    <div>
      <SatelliteText title="Name" :text="satellite.name" />
      <SatelliteText title="Norad Cat Id" :text="satellite.noradCatId" />
    </div>
    <div>
      <SatelliteText
        title="Orbit Code"
        :text="satellite.orbitCode === null ? '-' : satellite.orbitCode"
      />
      <SatelliteText title="Object Type" :text="satellite.objectType" />
    </div>
    <div>
      <SatelliteText title="Country Code" :text="satellite.countryCode" />
      <SatelliteText title="Intl Des" :text="satellite.intlDes" />
    </div>
    <div
      class="border border-white rounded-sm px-5 py-0.5 cursor-pointer hover:bg-white hover:text-black text-center"
    >
      View
    </div>
  </div>
  <hr class="bg-white w-[95%] h-[0.5px] opacity-5 mx-auto" />
</template>
