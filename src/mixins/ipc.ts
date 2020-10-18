import Vue from "vue";

export default Vue.extend({
  created() {
    window.ipcRenderer.on("imageFileSelected", async (event, args) => {
      await this.$store.dispatch("image/setImage", {
        image: args.contents
      });
    });
  }
});
