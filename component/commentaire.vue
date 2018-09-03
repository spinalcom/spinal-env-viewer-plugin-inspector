<template>
          <md-menu-item  @click="note()">
            <md-icon>border_color</md-icon>comments
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
    note: function() {
      if (this.selectedObject.note) {
        // note existe dans le model
        console.log("note existe dans le model");
        event.$emit("openCommentsPanel", this.selectedObject);
      } else {
        // note n'existe pas dans le model
        console.log("note n'existe pas dans le model");
        this.selectedObject.add_attr({ note: [] });
        event.$emit("openCommentsPanel", this.selectedObject);
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