<template>
  <div class="flex">
    <div class="w-3/4 h-full flex flex-col">
      <div class="w-full bg-blue-100 h-10"></div>

      <div class="flex ">
        <div class="w-1/2 p-4 bg-red-100">
          <span
            class="text-sm uppercase leading-relaxed text-gray-700 font-semibold"
            >orginal</span
          >
        </div>

        <div class="w-1/2 p-4 bg-red-100">
          <span
            class="text-sm uppercase leading-relaxed text-gray-700 font-semibold"
            >modified</span
          >
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
      <div class="space-y-6">
        <span
          class="text-sm uppercase leading-relaxed text-gray-700 font-semibold"
          >Binarize</span
        >

        <div class="">
          <label
            for="methode"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Method</label
          >
          <select
            id="methode"
            class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          >
            <option>Threshold</option>
            <option>ISO DATA</option>
          </select>
        </div>

        <div class="">
          <label
            for="threshold"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Threshold</label
          >
          <input
            id="threshold"
            type="range"
            min="0"
            max="255"
            value="128"
            class="block form-range w-full py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          />
        </div>

        <div class="flex items-center">
          <input
            id="outline"
            name="outline"
            type="checkbox"
            class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <label for="outline" class="ml-3">
            <span class="block text-sm leading-5 font-medium text-gray-700"
              >Outline</span
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ViewHome",
  components: {}
});
</script>
