<template>
  <md-menu md-direction="bottom-end" :md-close-on-select="false">
      <md-button class="myColor" md-menu-trigger  :style="{'background-color': colors.hex}">
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
import { group, theme, bimObject } from "../model/model";
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
