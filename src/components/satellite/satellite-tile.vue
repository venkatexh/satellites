<script setup lang="ts">
import SatelliteText from './satellite-text.vue'
import TextWrapper from './text-wrapper.vue'
defineProps({
  satellite: {
    type: Object,
    required: true
  },
  showDivider: {
    type: Boolean
  }
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 items-center lg:gap-6 my-6 p-1">
    <div>
      <img
        src="https://telecomtalk.info/wp-content/uploads/2023/03/will-satellite-internet-really-be-able-to.jpeg"
        :alt="satellite.name"
        class="rounded-lg"
      />
    </div>
    <TextWrapper>
      <SatelliteText title="Name" :text="satellite.name" />
      <SatelliteText title="Norad Cat Id" :text="satellite.noradCatId" />
    </TextWrapper>
    <TextWrapper>
      <SatelliteText
        title="Orbit Code"
        :text="satellite.orbitCode === null ? '-' : satellite.orbitCode"
      />
      <SatelliteText title="Object Type" :text="satellite.objectType" />
    </TextWrapper>
    <TextWrapper>
      <SatelliteText title="Country Code" :text="satellite.countryCode" />
      <SatelliteText title="Intl Des" :text="satellite.intlDes" />
    </TextWrapper>
    <div
      class="border border-white rounded-sm px-5 py-0.5 cursor-pointer hover:bg-white hover:text-black text-center"
    >
      View
    </div>
  </div>
  <hr v-if="showDivider" class="bg-white w-[95%] h-[0.5px] opacity-10 mx-auto hidden lg:block" />
</template>
