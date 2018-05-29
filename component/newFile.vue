<template>
  <md-content class="container md-scrollbar">

  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "../model/model";
export default {
  name: "addGroup",

  data() {
    return {
      test: true
    };
  },
  components: {
    addTheme
  },
  props: ["inspector"],
  methods: {
    vierge: function() {
      console.log("vierge");
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>