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

    <ref-list v-if="BIMObjectList.length > 0" :list="BIMObjectList" :selectedGroup="selectedGroup"></ref-list>
  </md-content>
</template>


<script>
var spinalSystem;
var viewer;
import { group, theme, bimObject } from "./model/model";
import event from "./component/event.vue";
import refList from "./component/listReferentialPanel.vue";

export default {
  name: "addGroup",

  data() {
    return {
      selectedGroup: "",
      theme: false,
      referential: [],
      BIMObjectList: []
    };
  },
  components: {
    refList
  },
  props: ["inspector"],
  methods: {
    getEvent: function() {
      event.$on("refEvent", (selectedGroup, theme, referential) => {
        console.log("CECI EST LE REFERENCIEL PANEL");

        if (theme) {
          this.theme = theme;
          this.referential = referential;
        } else {
          this.theme = undefined;
          this.referential = selectedGroup.allObject;
        }
        this.selectedGroup = selectedGroup;
        this.selectedGroup.allObject.bind(this.onModelChange);
        // this.BIMObjectList = selectedGroup.allObject;
      });
    },
    onModelChange: function() {
      this.BIMObjectList = [];
      for (let i = 0; i < this.selectedGroup.allObject.length; i++) {
        this.BIMObjectList.push(this.selectedGroup.allObject[i]);
      }
    },
    addItem: function() {
      var items = viewer.getSelection();
      console.log("addItemInReferencial");
      console.log(items);
      if (items.length == 0) {
        alert("No model selected !");
        return;
      }
      for (let i = 0; i < items.length; i++) {
        var newBimObject = new bimObject();
        newBimObject.dbId.set(items[i]);
        newBimObject.name.set(
          viewer.model.getData().instanceTree.getNodeName(items[i])
        );
        newBimObject.group.push(this.selectedGroup.group[0]);
        this.referential.push(newBimObject);
      }
      console.log(this.referential);
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