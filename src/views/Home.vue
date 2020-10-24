<template>
  <div class="flex">
    <div class="w-3/4 h-full flex flex-col">
      <div class="w-full bg-blue-100 h-10"></div>

      <div class="flex ">
        <div class="w-1/2 p-4 bg-red-100">
          <VCCanvas caption="original" :img-data-type="ImageTypes.ORIGINAL" />
        </div>

        <div class="w-1/2 p-4 bg-red-100">
          <VCCanvas caption="modified" :img-data-type="ImageTypes.MODIFIED" />
        </div>
      </div>
    </div>

    <div class="w-1/4 bg-gray-200 h-screen p-4">
      <div class="h-48">
        <span
          class="text-sm uppercase leading-relaxed text-gray-700 font-semibold"
          >histogram</span
        >
      </div>
      <VCBinarize />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VCCanvas from "@/components/VCCanvas.vue";
import VCBinarize from "@/components/VCBinarize.vue";
import { ImageTypes } from "@/interfaces.ts";

export default Vue.extend({
  name: "ViewHome",
  data() {
    return {
      ImageTypes
    };
  },
  components: {
    VCCanvas,
    VCBinarize
  }
});
</script>
