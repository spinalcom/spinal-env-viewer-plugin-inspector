<template>
  <md-button @click.stop="view(selectedGroup)">
    <md-icon>{{icon}}</md-icon>
    
  </md-button>
</template>


<script>
var spinalSystem;
var viewer;
import event from "./event.vue";

export default {
  name: "addGroup",

  data() {
    return {
      allActive: true,
      all: []
    };
  },
  components: {},
  props: ["selectedGroup", "item", "icon"],
  methods: {
    getEvent: function() {
      // event.$on("eicon", (icon, selectedGroup) => {});
    },
    view: function(selectedGroup) {
      if (this.item) {
        if (this.icon == "visibility_off") {
          this.icon = "visibility";
          event.$emit("colorEventList", this.item);
        } else {
          this.icon = "visibility_off";
          event.$emit("uncolorEventList", this.item);
        }
      } else {
        if (this.icon == "visibility_off") {
          this.icon = "visibility";
          event.$emit("colorEvent", selectedGroup, true);
        } else {
          this.icon = "visibility_off";
          event.$emit("colorEvent", selectedGroup, false);
        }
        event.$emit("iconEvent", this.icon, selectedGroup);
      }
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.getEvent();
  }
};
</script>