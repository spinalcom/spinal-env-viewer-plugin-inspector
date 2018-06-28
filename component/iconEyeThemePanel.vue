<template>
  <md-button class="md-icon-button" @click.stop="view(selectedGroup)" @dblclick.stop>
    <md-icon>{{currentIcon}}</md-icon>
    
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
      all: [],
      currentIcon: "visibility_off"
    };
  },
  watch: {
    icon: function() {
      this.currentIcon = this.icon;
    }
  },
  components: {},
  props: ["selectedGroup", "item", "icon"],
  methods: {
    getEvent: function() {
      // event.$on("eicon", (icon, selectedGroup) => {});
    },
    view: function(selectedGroup) {
      if (this.item) {
        if (this.currentIcon == "visibility_off") {
          this.currentIcon = "visibility";
          event.$emit("colorEventList", this.item);
        } else {
          this.currentIcon = "visibility_off";
          event.$emit("uncolorEventList", this.item);
        }
      } else {
        if (this.currentIcon == "visibility_off") {
          this.currentIcon = "visibility";
          event.$emit("colorEvent", selectedGroup, true);
        } else {
          this.currentIcon = "visibility_off";
          event.$emit("colorEvent", selectedGroup, false);
        }
        event.$emit("iconEvent", this.currentIcon, selectedGroup);
      }
      event.$emit("collaboratorIconAllEvent", "visibility_off");
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.getEvent();
  }
};
</script>