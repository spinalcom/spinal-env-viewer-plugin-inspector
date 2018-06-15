<template>
  <md-content>
    <add-apps :collaborator="collaborator"></add-apps>


    <md-list style="width=300px">
      <md-list-item class="smallList" v-for="(app, index) in onModelChange()" :key="index" @click="select(app)" >
        <div class="md-list-item-text">
          <span>{{ app.name.get()}}</span>
          <md-tooltip>{{ app.name.get()}}</md-tooltip>
        </div>

        <delete-apps :collaborator="collaborator" :selected-app="app"></delete-apps>
      </md-list-item>
    </md-list>


  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import addApps from "./addApps.vue";
import event from "./event.vue";
import deleteApps from "./deleteApps.vue";

export default {
  name: "newFile",

  data() {
    return {};
  },
  components: { addApps, deleteApps },
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