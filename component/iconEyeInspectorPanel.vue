<template>
  <md-button @click="view(selectedGroup)">
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
      allActive: false,
      all: [],
      icon: "visibility_off"
    };
  },
  components: {},
  props: ["selectedGroup"],
  methods: {
    getEvent: function() {},
    view: function(selectedGroup) {
      this.all = [];
      if (this.icon === "visibility") {
        this.icon = "visibility_off";
        event.$emit("colorEvent", selectedGroup, false);
      } else {
        this.icon = "visibility";
        console.log(selectedGroup);
        event.$emit("colorEvent", selectedGroup, true);
      }

      event.$emit("iconEvent", this.icon, selectedGroup);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
  }
};
</script>