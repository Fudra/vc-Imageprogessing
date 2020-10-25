<template>
  <div class="flex flex-col">
    <canvas :width="size.width" :height="size.height" ref="imageCanvas" />
    <p class="px-4 py-2 text-sm text-gray-700 uppercase font-semibold">
      {{ caption }}
    </p>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue, { PropType } from "vue";
import { ImageTypes, ModifiedImage } from "@/interfaces";

interface VCCanvasData {
  ctx: CanvasRenderingContext2D | null;
  size: {
    width: number;
    height: number;
  };
}

export default Vue.extend({
  name: "VCCanvasModified",
  data() {
    return {
      ctx: null,
      size: {
        width: 600,
        height: 600
      }
    } as VCCanvasData;
  },
  props: {
    caption: {
      type: String,
      required: true
    },
    imgDataType: {
      type: String as PropType<ImageTypes>,
      default: ImageTypes.ORIGINAL
    },
    imageData: {
      type: Object as PropType<ModifiedImage>,
      default: null
    }
  },
  methods: {
  },
  watch: {
    imageData: {
      handler(modifiedImage: ModifiedImage | null) {
        if (modifiedImage == null) return;
        if (this.ctx == null) return;
        // if (modifiedImage.type === ImageTypes.ORIGINAL) return;

        console.log("putimagedata")
        this.ctx.putImageData(modifiedImage.imageData, 0, 0);
      },
      immediate: true
    },
  },
  async mounted() {
    this.ctx = (this.$refs.imageCanvas as HTMLCanvasElement).getContext("2d");

    await  this.$nextTick();
    if(this.ctx === null) return;
    //this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    //await this.loadAndScaleImage(this.image);
  }
});
</script>
