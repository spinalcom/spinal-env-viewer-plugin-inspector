<template>
<div>
<md-menu md-direction="bottom-end">
      <md-button class="md-icon-button" @click.stop md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>
      <md-menu-content>
          <md-menu-item @click="active = true">
          <md-icon>delete_forever</md-icon>
          Delete
          </md-menu-item>
      </md-menu-content>
</md-menu>
  <md-content>
        <md-dialog-confirm
      :md-active.sync="active"
      md-title="Are you sure ?"
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="onConfirm" />
  </md-content>
</div>
</template>


<script>
var spinalSystem;
var viewer;

import event from "./event.vue";
export default {
  name: "addGroup",

  data() {
    return {
      active: false
    };
  },
  props: ["collaborator", "selectedApp"],
  methods: {
    onConfirm: function() {
      for (let i = 0; i < this.collaborator.length; i++) {
        if (this.collaborator[i] === this.selectedApp)
          this.collaborator.splice(i, 1);
      }
      this.active = false;
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
  }
};
</script>