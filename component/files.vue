<template>
          <md-menu-item  @click="files()">
            <md-icon>attach_file</md-icon>Files
          </md-menu-item>
</template>


<script>
var spinalSystem;
var viewer;
import event from "./event.vue";

export default {
  name: "commentaire",

  data() {
    return {
      panel: {}
    };
  },
  components: {},
  props: ["selectedObject"], // ajoute un message à n'importe quel model
  methods: {
    files: function() {
      if (this.selectedObject.files) {
        // note existe dans le model
        console.log("note existe dans le model");
        event.$emit("openFilesPanel", this.selectedObject);
      } else {
        // note n'existe pas dans le model
        console.log("note n'existe pas dans le model");
        this.selectedObject.add_attr({ files: [] });
        event.$emit("openFilesPanel", this.selectedObject);
      }
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    // this.init();
  }
};
</script>