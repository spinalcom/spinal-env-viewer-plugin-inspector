<template>
          <md-menu-item  @click="link()">
            <md-icon>insert_link</md-icon>link
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
    link: function() {
      if (this.selectedObject.link) {
        // note existe dans le model
        console.log("note existe dans le model");
        event.$emit("openLinkPanel", this.selectedObject);
      } else {
        // note n'existe pas dans le model
        console.log("note n'existe pas dans le model");
        this.selectedObject.add_attr({ link: [] });
        event.$emit("openLinkPanel", this.selectedObject);
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