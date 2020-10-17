import Vue from "vue";

export default Vue.extend({
  created() {
    window.ipcRenderer.on("imageFileSelected", async () => {
      console.log("img passed through main app");
    });
  }
});
