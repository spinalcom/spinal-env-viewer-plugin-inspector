<template>
  <md-content class="container md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">
          <add-b-i-m-object :selectedGroup="selectedGroup" :referential="referential"></add-b-i-m-object>      

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

    <list-referential-panel :list="onModelChange()" :selectedGroup="group"></list-referential-panel>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import model from "spinal-models-bim_forge";
import event from "./component/event.vue";
import listReferentialPanel from "./component/listReferentialPanel.vue";
import addBIMObject from "./component/addBIMObject.vue";
let BIMObjectList = [];
export default {
  name: "addGroup",

  data() {
    return {
      selectedGroup: "",
      theme: false,
      group: "",
      referential: []
    };
  },
  components: {
    addBIMObject,
    listReferentialPanel
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      event.$on("refEvent", (selectedGroup, theme, group) => {
        console.log("CECI EST LE REFERENCIEL PANEL");

        if (theme) {
          this.theme = theme;
          this.referential = group.allObject;
          this.group = group;
        } else {
          this.theme = undefined;
          this.referential = selectedGroup.allObject;
          this.group = selectedGroup;
        }
        this.selectedGroup = selectedGroup;
        console.log(this.selectedGroup);
        // this.referential.unbind(this.onModelChange);
        // this.referential.bind(this.onModelChange);
      });
    },
    onModelChange: function() {
      if (this.selectedGroup) {
        BIMObjectList = [];
        if (this.theme) {
          for (let i = 0; i < this.selectedGroup.BIMObjects.length; i++) {
            BIMObjectList.push(this.selectedGroup.BIMObjects[i]);
          }
        } else {
          for (let i = 0; i < this.referential.length; i++) {
            BIMObjectList.push(this.referential[i]);
          }
        }
      }
      return BIMObjectList;
    },

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