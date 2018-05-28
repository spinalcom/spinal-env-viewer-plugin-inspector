<template>
  <md-content class="container md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">
          <md-button @click="addItem(group)">
            <md-icon>add</md-icon>
          </md-button>
          <md-button @click="selectRef(selectedGroup)">
            <md-icon>games</md-icon>
          </md-button>
          <md-button @click="chart(selectedGroup)">
            <md-icon>insert_chart</md-icon>
          </md-button>
          <md-button @click="restoreRef(selectedGroup)">
            <md-icon>clear</md-icon>
          </md-button>
          <md-button @click="deleteRef(selectedGroup)">
            <md-icon>delete_sweep</md-icon>
          </md-button>
    </md-toolbar>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "./model/model";
import referentialEvent from "./component/event.vue";

export default {
  name: "addGroup",

  data() {
    return {
      selectedGroup: "",
      tabPanel: []
    };
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      referentialEvent.$on("refEvent", (selectedGroup, tabPanel) => {
        console.log("CECI EST LE REFERENCIEL PANEL");
        this.tabPanel = tabPanel;
        this.selectedGroup = selectedGroup;
      });
    },
    addItem: function() {},
    selectRef: function() {},
    chart: function() {},
    restoreRef: function() {},
    deleteRef: function() {}
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.getEvent();
  }
};
</script>