<template>
  <md-content class="container md-scrollbar">
    <md-toolbar style="box-sizing: border-box;">
          <md-button class="md-icon-button" v-if="group != selectedGroup" @click="referentialPanel()">
            <md-icon>location_city</md-icon>
          </md-button>
          
          <add-b-i-m-object :selectedGroup="group" :referential="referential" :group="selectedGroup"></add-b-i-m-object>      

          <md-button class="md-icon-button" @click="chart(group)">
            <md-icon>insert_chart</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="restoreRef()">
            <md-icon>clear</md-icon>
          </md-button>
          <md-button class="md-icon-button" @click="onConfirm()">
            <md-icon>delete_sweep</md-icon>
          </md-button>
        <md-dialog-confirm
      :md-active.sync="active"
      md-title="You will definitly erase all your BIMObject, Are you sure ? "
      md-confirm-text="Agree"
      md-cancel-text="Disagree"
      @md-confirm="deleteRef" />
    </md-toolbar>

    <list-referential-panel :list="onModelChange()" :selectedGroup="group"></list-referential-panel>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
// Dans ce component, selectedGroup est inversé avec le group, je me suis trompé dans les nom

import model from "spinal-models-bim_forge";
import event from "./component/event.vue";
import listReferentialPanel from "./component/listReferentialPanel.vue";
import addBIMObject from "./component/addBIMObject.vue";
var chartsPanel = require("./component/chartsManager.js");

let BIMObjectList = [];
export default {
  name: "addGroup",

  data() {
    return {
      selectedGroup: "",
      active: false,
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
    referentialPanel: function() {
      event.$emit("refEvent", this.group);
    },
    chart: function(group) {
      console.log("charts in referential panel");
      console.log(group);
      let panel = chartsPanel.createPanel(group);
      event.$emit("chartsEvent", group, panel);
    },
    restoreRef: function() {
      if (this.group != this.selectedGroup) {
        for (let i = 0; i < this.selectedGroup.BIMObjects.length; i++) {
          const element = this.selectedGroup.BIMObjects[i];
          element.group.set(this.group.group[0]);
          element.color.set(this.group.group[0].color.get());
          this.group.group[0].BIMObjects.push(element);
        }
        this.selectedGroup.BIMObjects.splice(
          0,
          this.selectedGroup.BIMObjects.length
        );
      } else {
        for (let i = 0; i < this.group.group.length; i++) {
          const element = this.group.group[i];
          element.BIMObjects.splice(0, element.BIMObjects.length);
        }
        for (let i = 0; i < this.group.allObject.length; i++) {
          const element = this.group.allObject[i];
          element.group.set(this.group.group[0]);
          element.color.set(this.group.group[0].color.get());
          this.group.group[0].BIMObjects.push(element);
        }
      }
    },
    onConfirm: function() {
      this.active = true;
    },
    deleteRef: function() {
      console.log("group");
      console.log(this.group);
      console.log("selectedGroup");
      console.log(this.selectedGroup);
      if (this.group != this.selectedGroup) {
        for (let i = 0; i < this.group.allObject.length; i++) {
          const element = this.group.allObject[i];
          if (element.group.data.value == this.selectedGroup._server_id) {
            this.group.allObject.splice(i, 1);
            i--;
          }
        }
        this.selectedGroup.BIMObjects.splice(
          0,
          this.selectedGroup.BIMObjects.length
        );
      } else {
        this.group.allObject.splice(0, this.group.allObject.length);
        for (let i = 0; i < this.group.group.length; i++) {
          const element = this.group.group[i];
          element.BIMObjects.splice(0, element.BIMObjects.length);
        }
      }
      this.active = false;
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
    this.getEvent();
  }
};
</script>