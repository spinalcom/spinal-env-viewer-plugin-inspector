<template>
  <md-content>
    <add-apps :collaborator="collaborator"></add-apps>


    <md-list style="width=300px">
      <md-list-item v-for="(app, index) in onModelChange()" :key="index" @click="select(app)" >
        <div class="md-list-item-text">
          <span>{{ app.name.get()}}</span>
          <md-tooltip>{{ app.name.get()}}</md-tooltip>
        </div>

        <context-menu-apps :collaborator="collaborator" :selected-app="app"></context-menu-apps>
      </md-list-item>
    </md-list>


  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import addApps from "./addApps.vue";
import event from "./event.vue";
import contextMenuApps from "./contextMenuApps.vue";

export default {
  name: "newFile",

  data() {
    return {};
  },
  components: { addApps, contextMenuApps },
  props: ["collaborator"],
  methods: {
    onModelChange: function() {
      var list = [];
      for (let i = 0; i < this.collaborator.length; i++) {
        list.push(this.collaborator[i]);
      }
      return list;
    },
    select: function(app) {
      event.$emit("selectedApp", app, true);
      console.log(app);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.onModelChange();
  }
};
</script>