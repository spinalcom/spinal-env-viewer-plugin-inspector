<template>
<md-content style="height: unset;">
           <md-dialog-prompt
                      :md-active.sync="active"
                      v-model="value"
                      md-title="What's your app name?"
                      md-input-maxlength="30"
                      md-input-placeholder="Type your name..."
                      md-confirm-text="Done"
                      @md-confirm="addLink" />
  <md-toolbar style="box-sizing: border-box;">
    <md-button @click="active = true">Add Link</md-button>
    </md-toolbar>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
// import { apps } from "../model/model";

export default {
  name: "newFile",

  data() {
    return {
      value: "",
      active: false
    };
  },
  components: {},
  props: ["collaborator"],
  methods: {
    addLink: function() {
      var app = new apps();
      app.name.set(this.value);
      app.username.set(spinalSystem.getUser().username);
      app.owner.set(spinalSystem.getUser().id);
      this.collaborator.push(app);
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