<template>
  <div>
           <md-dialog-prompt
                      :md-active.sync="active"
                      v-model="value"
                      md-title="What's your group name?"
                      md-input-maxlength="30"
                      md-input-placeholder="Type your name..."
                      md-confirm-text="Done"
                      @md-confirm="addGroup" />
    <md-button class="md-icon-button" @click="active = true"><md-icon>add_box</md-icon></md-button>
  </div>
</template>


<script>
var spinalSystem;
var viewer;
import { group } from "../model/model";
export default {
  name: "addGroup",

  data() {
    return {
      value: "",
      active: false
    };
  },
  props: ["inspector"],
  methods: {
    addGroup: function() {
      console.log(this.inspector);
      var myNewGroup = new group();
      myNewGroup.name.set(this.value);
      if (this.inspector) {
        this.inspector.push(myNewGroup);
        this.active = false;
      }
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>