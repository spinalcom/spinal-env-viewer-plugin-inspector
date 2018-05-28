<template>
  <md-content class="container md-scrollbar">
        <md-dialog-prompt
                      :md-active.sync="active"
                      v-model="value"
                      md-title="What's your group name?"
                      md-input-maxlength="30"
                      md-input-placeholder="Type your name..."
                      md-confirm-text="Done"
                      @md-confirm="close()"/>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "../model/model";
import event from "./event.vue";

export default {
  name: "addGroup",

  data() {
    return {
      active: false,
      selectedGroup: null,
      value: ""
    };
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      event.$on("renameGroup", selectedGroup => {
        console.log("rename vue file : prompt dialog page");
        this.selectedGroup = selectedGroup;
        this.active = true;
      });
    },
    close: function() {
      this.selectedGroup.name.set(this.value);
      this.active = false;
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    this.getEvent();
    // console.log(this.inspector);
  }
};
</script>