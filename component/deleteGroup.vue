<template>
  <md-content>
        <md-dialog-confirm
      :md-active.sync="active"
      md-title="Are you sure ?"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="onConfirm" />
              
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;

import event from "./event.vue";
export default {
  name: "addGroup",

  data() {
    return {
      active: false,
      selectedGroup: null
    };
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      event.$on("deleteGroup", selectedGroup => {
        this.selectedGroup = selectedGroup;
        this.active = true;
      });
    },
    onConfirm: function() {
      for (let i = 0; i < this.inspector.length; i++) {
        if (this.inspector[i].name === this.selectedGroup.name)
          this.inspector.splice(i, 1);
      }
      this.active = false;
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.getEvent();
  }
};
</script>