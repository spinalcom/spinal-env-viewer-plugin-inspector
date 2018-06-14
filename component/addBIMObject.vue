<template>
          <md-button class="md-icon-button" @click="addItem()">
            <md-icon>add</md-icon>
          </md-button>
</template>


<script>
var spinalSystem;
var viewer;
import model from "spinal-models-bim_forge";
import { group } from "../model/model";

export default {
  name: "addGroup",

  data() {
    return {
      value: "",
      active: false
    };
  },
  props: ["selectedGroup", "referential", "group"],
  methods: {
    addItem: function() {
      var items = viewer.getSelection();
      console.log("addItemInReferencial");
      // console.log(items);
      if (items.length == 0) {
        alert("No model selected !");
        return;
      }
      var test = true;

      for (let i = 0; i < items.length; i++) {
        // _id, _name, _group, _display, _color
        test = false;
        console.log(items[i]);
        for (let j = 0; j < this.referential.length; j++) {
          if (this.referential[j].id.get() === items[i]) {
            test = true;
          }
        }

        if (!test) {
          console.log("add de l'objet");
          console.log(this.selectedGroup);
          var newBimObject = new model.SpinalBIMObjectForge(
            items[i],
            viewer.model.getData().instanceTree.getNodeName(items[i]),
            this.selectedGroup.group[0],
            false,
            this.selectedGroup.group[0].color.get()
          );
          // newBimObject.color.set(this.selectedGroup.group[0].color.get());
          if (newBimObject) this.referential.push(newBimObject);
          console.log(this.selectedGroup);
          if (this.group != this.selectedGroup) {
            newBimObject.color.set(this.group.color.get());
            newBimObject.group.set(this.group);
            this.group.BIMObjects.push(newBimObject);
          } else {
            this.selectedGroup.group[0].BIMObjects.push(newBimObject);
          }
        }
        // console.log(newBimObject);
      }

      // console.log(this.referential);
    }
  },
  mounted() {
    viewer = window.spinal.ForgeViewer.viewer;
    spinalSystem = window.spinal.spinalSystem;
    // console.log(this.inspector);
  }
};
</script>