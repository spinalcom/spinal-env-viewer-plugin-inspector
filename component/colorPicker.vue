<template>
  <md-menu md-direction="bottom-end" :md-close-on-select="false">
      <md-button md-menu-trigger  :style="getColor()">
      </md-button>
    <md-menu-content>
        <md-menu-item @click="vierge">
          <chrome-picker v-model="colors"></chrome-picker>
        </md-menu-item>
    </md-menu-content>
  </md-menu>
</template>


<script>
var spinalSystem;
var viewer;
// {'background-color': colors.hex}
import Chrome from "../../node_modules/vue-color/src/components/Chrome.vue";
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
