<template>
  <md-menu md-direction="bottom-end" :md-close-on-select="false">
      <md-button style="width: 40px; min-height: 20px; height: 20px; margin-top: 8px;" @dblclick.stop @click.stop  md-menu-trigger  :style="getColor()">
      </md-button>
    <md-menu-content >
        <div  @click.stop="vierge">
          <chrome-picker v-model="colors"></chrome-picker>
        </div>
    </md-menu-content>
  </md-menu>
</template>


<script>
var spinalSystem;
var viewer;
import { Chrome } from "vue-color";
// var Chrome = require("vue-color/src/Chrome.vue");
export default {
  name: "colorpicker",

  data() {
    return {
      colors: {}
    };
  },
  components: {
    "chrome-picker": Chrome
  },
  props: ["selectedGroup"],

  methods: {
    vierge: function() {
      this.selectedGroup.color.set(this.colors.hex);
      console.log(this.colors);
      console.log(this.selectedGroup.color.get());
      console.log(this.color);
      for (let i = 0; i < this.selectedGroup.BIMObjects.length; i++) {
        const element = this.selectedGroup.BIMObjects[i];
        element.color.set(this.selectedGroup.color.get());
      }
    },
    getColor: function() {
      return { "background-color": this.selectedGroup.color.get() };
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.colors = { hex: this.selectedGroup.color.get() };
  }
};
</script>

<style>
</style>
