<template>
  <md-content >

  </md-content>
</template>


<script>
var spinalSystem;
var viewer;

export default {
  name: "newFile",

  data() {
    return {
      test: true
    };
  },
  components: {},
  props: [],
  methods: {},
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>