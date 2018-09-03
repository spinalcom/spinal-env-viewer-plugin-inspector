<template>
  <md-button class="md-icon-button" @click.stop="view(selectedGroup)" @dblclick.stop>
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
    getEvent: function() {
      event.$on("collaboratorIconAllEvent", icon => {
        this.icon = icon;
      });
    },
    view: function(selectedGroup) {
      this.all = [];
      if (this.icon === "visibility") {
        this.icon = "visibility_off";
        event.$emit("collaboratorColorEvent", selectedGroup, false);
      } else {
        this.icon = "visibility";
        console.log(selectedGroup);
        event.$emit("collaboratorColorEvent", selectedGroup, true);
      }

      // event.$emit("iconEvent", this.icon, selectedGroup);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.getEvent();
  }
};
</script>