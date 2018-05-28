<template>
  <md-content class="container md-scrollbar" style="height: unset;">
           <md-dialog-prompt
                      :md-active.sync="active"
                      v-model="value"
                      md-title="What's your group name?"
                      md-input-maxlength="30"
                      md-input-placeholder="Type your name..."
                      md-confirm-text="Done"
                      @md-confirm="addGroup" />
  <md-toolbar style="box-sizing: border-box;">
    <md-button @click="active = true"><md-icon>add_box</md-icon></md-button>
    </md-toolbar>
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
      value: "",
      active: false
    };
  },
  props: ["inspector"],
  methods: {
    addGroup: function() {
      var myNewGroup = new group();
      myNewGroup.name.set(this.value);
      this.inspector.push(myNewGroup);
      this.active = false;
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>